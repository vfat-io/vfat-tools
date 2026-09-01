/* SemiVault on Robinhood Chain: official RPC reads and direct wallet transactions only.
 *
 * No price API and no router. Every number below is read from Robinhood Chain
 * and, where a dollar figure is shown, anchored to USDG — the chain's
 * dollar-denominated settlement asset — read from the Uniswap v4 PoolManager.
 * Where an anchor cannot be established the page says so rather than guessing.
 */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { Semi.start().catch(Semi.fatal) })

const Semi = (function () {
  const chain = {
    id: '0x1237', number: 4663, name: 'Robinhood',
    rpc: 'https://rpc.mainnet.chain.robinhood.com',
    explorer: 'https://robinhoodchain.blockscout.com',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  }

  /* Fixed contract identifiers. Everything derived from them is read live. */
  const addresses = {
    semi:    '0x5f038759f6de38fd3a85c0440daff1240238bac8',   // SemiToken
    staker:  '0x1a79b304872d3ed8b50c22721bc5561694b0927f',   // SemiStaker
    ratchet: '0xf0883c397a18bfd469af4f66a05406e9940190f7',   // SemiRatchet
    hook:    '0x7b89c56Da91425F35D07290eCFEcF4E58dc13088',   // SemiHook (v4)
    mu:      '0xfF080c8ce2E5feadaCa0Da81314Ae59D232d4afD',   // pool quote asset
    usdg:    '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168',   // the $1 anchor
    poolManager: '0x8366a39CC670B4001A1121B8F6A443A643e40951',
    multicall:   '0xca11bde05977b3631167028862be2a173976ca11',
  }

  /* Storage slot of slot0 for the USDG/MU v4 pool inside the PoolManager.
     Reading it through extsload gives a live MU price with no external index:
     USDG is the chain's dollar-denominated settlement asset, so it is the $1
     anchor. If this read fails the page shows MU and says so — it never falls
     back to a constant, because a stale dollar figure with no marker is worse
     than no dollar figure. */
  const USDG_MU_SLOT0 = '0x18d150baa861e96f4da38bd89d0a356ce079d03d02d170a91b3e6dd86434c9c1'
  const Q96 = ethers.BigNumber.from(2).pow(96)

  const ABI = {
    erc20: [
      'function balanceOf(address) view returns (uint256)',
      'function totalSupply() view returns (uint256)',
      'function decimals() view returns (uint8)',
      'function symbol() view returns (string)',
      'function allowance(address,address) view returns (uint256)',
      'function approve(address,uint256) returns (bool)',
    ],
    staker: [
      'function totalActive() view returns (uint256)',
      'function totalPending() view returns (uint256)',
      'function totalStaked() view returns (uint256)',
      'function epochCount() view returns (uint256)',
      'function MIN_LOCK() view returns (uint256)',
      'function active(address) view returns (uint256)',
      'function pending(address) view returns (uint256)',
      'function earned(address) view returns (uint256)',
      'function claimable(address) view returns (uint256)',
      'function unlockAt(address) view returns (uint256)',
      'function stake(uint256)',
      'function unstake(uint256)',
      'function claim()',
    ],
    ratchet: [
      'function currentFbr() view returns (uint256)',
      'function fbrHwm() view returns (uint256)',
      'function totalMinted() view returns (uint256)',
      'function lastEpoch() view returns (uint256)',
      'function EPOCH() view returns (uint256)',
      'function MAX_EPOCH_BPS() view returns (uint256)',
      'function poke()',
    ],
    hook: [
      'function reserves() view returns (uint256,uint256)',
      'function muReserve() view returns (uint256)',
      'function currentFeeBps() view returns (uint256)',
      'function epochMin() view returns (uint256)',
    ],
    poolManager: ['function extsload(bytes32) view returns (bytes32)'],
  }

  const state = {
    app: null, loading: null, message: '', messageType: 'info',
    provider: null, signer: null, account: null,
    vault: null, wallet: null, busy: false,
  }

  /* ── plumbing ─────────────────────────────────────────────────────── */

  function e (tag, opts) {
    const node = document.createElement(tag)
    if (!opts) return node
    if (opts.id) node.id = opts.id
    if (opts.className) node.className = opts.className
    if (opts.text != null) node.textContent = opts.text
    if (opts.onClick) node.addEventListener('click', opts.onClick)
    return node
  }
  function section (title) {
    const node = e('section')
    node.appendChild(e('h2', { text: title }))
    return node
  }
  function fatal (err) {
    setLoading(null)
    setStatus((err && err.message) || String(err), 'error')
    render()
  }
  function setStatus (msg, kind) { state.message = msg; state.messageType = kind || 'info'; render() }
  function setLoading (msg) {
    if (!state.loading) return
    state.loading.hidden = !msg
    const text = document.getElementById('semi-loading-text')
    if (msg && text) text.textContent = msg
  }

  /* Read-only provider. The page must be fully useful with no wallet at all. */
  function reader () {
    if (!state.provider) state.provider = new ethers.providers.JsonRpcProvider(chain.rpc, chain.number)
    return state.provider
  }
  function contract (address, abi, withSigner) {
    return new ethers.Contract(address, abi, withSigner && state.signer ? state.signer : reader())
  }

  const ONE = ethers.BigNumber.from('1000000000000000000')
  function toNum (bn, decimals) {
    if (bn == null) return NaN
    return Number(ethers.utils.formatUnits(bn, decimals == null ? 18 : decimals))
  }
  function fmt (n, dp) {
    if (!isFinite(n)) return '—'
    return n.toLocaleString(undefined, { maximumFractionDigits: dp == null ? 2 : dp })
  }
  function usd (n) { return isFinite(n) ? '$' + fmt(n, 0) : 'unpriced' }

  /* ── reads ────────────────────────────────────────────────────────── */

  /* SEMI is quoted in MU by the protocol's own pool accounting, so the spot
     price does not depend on any external index. reserves() returns the pair
     the hook itself uses to mint against, which is the same number the
     ratchet's backing ratio is computed from. */
  async function readVault () {
    const staker = contract(addresses.staker, ABI.staker)
    const ratchet = contract(addresses.ratchet, ABI.ratchet)
    const hook = contract(addresses.hook, ABI.hook)
    const semi = contract(addresses.semi, ABI.erc20)

    const pm = contract(addresses.poolManager, ABI.poolManager)
    const mu = contract(addresses.mu, ABI.erc20)
    const usdg = contract(addresses.usdg, ABI.erc20)

    const [
      totalActive, totalPending, totalStaked, epochCount, minLock,
      fbr, hwm, minted, lastEpoch, epochSecs, maxEpochBps,
      reserves, feeBps, supply,
    ] = await Promise.all([
      staker.totalActive(), staker.totalPending(), staker.totalStaked(),
      staker.epochCount(), staker.MIN_LOCK(),
      ratchet.currentFbr(), ratchet.fbrHwm(), ratchet.totalMinted(),
      ratchet.lastEpoch(), ratchet.EPOCH(), ratchet.MAX_EPOCH_BPS(),
      hook.reserves(), hook.currentFeeBps(), semi.totalSupply(),
    ])

    /* MU/USD from the USDG/MU pool, then SEMI/USD through the pool reserves.
       Both hops are onchain; neither touches a price API. */
    let muUsd = NaN
    try {
      const [slot0, muDec, usdgDec] = await Promise.all([
        pm.extsload(USDG_MU_SLOT0), mu.decimals(), usdg.decimals(),
      ])
      const sqrtP = ethers.BigNumber.from(slot0).mask(160)
      if (!sqrtP.isZero()) {
        const ratio = Number(sqrtP.toString()) / Number(Q96.toString())
        const muPerUsdg = ratio * ratio * Math.pow(10, usdgDec - muDec)
        /* Reject a nonsense read rather than printing it. */
        if (isFinite(muPerUsdg) && muPerUsdg > 0) muUsd = 1 / muPerUsdg
      }
    } catch (err) { /* stays NaN; the page renders MU and says the price is unavailable */ }

    const semiReserve = toNum(reserves[0])
    const muReserve = toNum(reserves[1])
    const semiInMu = semiReserve > 0 ? muReserve / semiReserve : NaN

    /* Emissions are minted per epoch by the ratchet, and every minted SEMI
       goes to active stakers. Annualising the realised average is honest;
       projecting the cap (MAX_EPOCH_BPS) would not be, because an epoch only
       pays when the backing ratio sets a new high. */
    const epochs = Number(epochCount.toString())
    const secondsPerEpoch = Number(epochSecs.toString())
    const epochsPerYear = secondsPerEpoch > 0 ? (365 * 24 * 3600) / secondsPerEpoch : NaN
    const mintedTotal = toNum(minted)
    const perEpoch = epochs > 0 ? mintedTotal / epochs : NaN
    const activeSemi = toNum(totalActive)
    const apr = activeSemi > 0 && isFinite(perEpoch) && isFinite(epochsPerYear)
      ? (perEpoch * epochsPerYear) / activeSemi * 100
      : NaN

    return {
      activeSemi,
      pendingSemi: toNum(totalPending),
      stakedSemi: toNum(totalStaked),
      supply: toNum(supply),
      epochs, secondsPerEpoch, epochsPerYear,
      mintedTotal, perEpoch, apr,
      fbr: toNum(fbr), hwm: toNum(hwm),
      lastEpoch: Number(lastEpoch.toString()),
      maxEpochBps: Number(maxEpochBps.toString()),
      semiReserve, muReserve, semiInMu,
      muUsd,
      semiUsd: isFinite(muUsd) && isFinite(semiInMu) ? semiInMu * muUsd : NaN,
      feeBps: Number(feeBps.toString()),
      minLock: Number(minLock.toString()),
    }
  }

  async function readWallet () {
    if (!state.account) return null
    const staker = contract(addresses.staker, ABI.staker)
    const semi = contract(addresses.semi, ABI.erc20)
    const [balance, allowance, active, pending, earned, claimable, unlockAt] = await Promise.all([
      semi.balanceOf(state.account),
      semi.allowance(state.account, addresses.staker),
      staker.active(state.account), staker.pending(state.account),
      staker.earned(state.account), staker.claimable(state.account),
      staker.unlockAt(state.account),
    ])
    return {
      balance: toNum(balance), allowanceRaw: allowance,
      active: toNum(active), pending: toNum(pending),
      earned: toNum(earned), claimable: toNum(claimable),
      unlockAt: Number(unlockAt.toString()),
    }
  }

  /* ── wallet ───────────────────────────────────────────────────────── */

  async function connect () {
    if (!window.ethereum) throw new Error('No injected wallet found in this browser.')
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const current = await window.ethereum.request({ method: 'eth_chainId' })
    if (current !== chain.id) await switchNetwork()
    const web3 = new ethers.providers.Web3Provider(window.ethereum, 'any')
    state.signer = web3.getSigner()
    state.account = ethers.utils.getAddress(accounts[0])
    window.ethereum.removeListener && window.ethereum.removeListener('accountsChanged', onAccounts)
    window.ethereum.on && window.ethereum.on('accountsChanged', onAccounts)
    window.ethereum.on && window.ethereum.on('chainChanged', function () { location.reload() })
    await refreshWallet()
  }
  function onAccounts (accounts) {
    state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
    if (!state.account) { state.signer = null; state.wallet = null; render(); return }
    refreshWallet().catch(fatal)
  }
  async function switchNetwork () {
    try {
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
    } catch (err) {
      /* 4902: the wallet has never seen Robinhood Chain. Offer to add it
         rather than failing silently, which is what leaves people stuck. */
      if (err && err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: chain.id, chainName: chain.name,
            rpcUrls: [chain.rpc], blockExplorerUrls: [chain.explorer],
            nativeCurrency: chain.nativeCurrency,
          }],
        })
        return
      }
      throw err
    }
  }
  async function refreshWallet () { state.wallet = await readWallet(); render() }

  /* ── actions ──────────────────────────────────────────────────────── */

  function amountField (id) {
    const node = document.getElementById(id)
    const raw = node && node.value ? node.value.trim() : ''
    if (!raw) throw new Error('Enter an amount first.')
    let parsed
    try { parsed = ethers.utils.parseUnits(raw, 18) } catch (err) { throw new Error('That is not a valid amount.') }
    if (parsed.lte(0)) throw new Error('Amount must be greater than zero.')
    return parsed
  }
  async function guard (label, fn) {
    if (state.busy) return
    state.busy = true
    try {
      setStatus(label + '…', 'info')
      const tx = await fn()
      if (tx && tx.wait) { setStatus('Waiting for confirmation…', 'info'); await tx.wait() }
      setStatus(label + ' confirmed.', 'ok')
      await Promise.all([refreshVault(), refreshWallet()])
    } catch (err) {
      setStatus((err && (err.data && err.data.message || err.reason || err.message)) || String(err), 'error')
    } finally { state.busy = false; render() }
  }
  async function doStake () {
    const amount = amountField('semi-stake-amount')
    const semi = contract(addresses.semi, ABI.erc20, true)
    if (!state.wallet || state.wallet.allowanceRaw.lt(amount)) {
      await guard('Approving SEMI', function () { return semi.approve(addresses.staker, ethers.constants.MaxUint256) })
      if (state.messageType === 'error') return
    }
    /* Staking resets the lock, so say so before it happens rather than after. */
    await guard('Staking', function () { return contract(addresses.staker, ABI.staker, true).stake(amount) })
  }
  async function doUnstake () {
    const amount = amountField('semi-unstake-amount')
    await guard('Unstaking', function () { return contract(addresses.staker, ABI.staker, true).unstake(amount) })
  }
  async function doClaim () {
    await guard('Claiming', function () { return contract(addresses.staker, ABI.staker, true).claim() })
  }
  async function doPoke () {
    /* Permissionless: anyone may advance the epoch. It pays nothing to the
       caller beyond gas, and is only useful when an epoch is overdue. */
    await guard('Poking the ratchet', function () { return contract(addresses.ratchet, ABI.ratchet, true).poke() })
  }

  /* ── render ───────────────────────────────────────────────────────── */

  function table (rows) {
    const width = rows.reduce(function (w, r) { return Math.max(w, r[0].length) }, 0)
    return rows.map(function (r) { return r[0].padEnd(width + 2, ' ') + r[1] }).join('\n')
  }
  function pre (text, className) {
    const node = e('pre', { text: text })
    if (className) node.className = className
    return node
  }

  function render () {
    if (!state.app) return
    state.app.textContent = ''
    state.app.appendChild(renderStatus())
    state.app.appendChild(renderVault())
    state.app.appendChild(renderWalletSection())
  }
  function renderStatus () {
    const node = pre(state.message || '')
    node.id = 'semi-status'
    node.dataset.kind = state.messageType
    return node
  }

  function renderVault () {
    const node = section('Vault')
    const v = state.vault
    if (!v) { node.appendChild(pre('Reading SemiVault contracts…')); return node }
    const lockHours = v.minLock / 3600
    node.appendChild(pre(table([
      ['TVL staked', isFinite(v.semiUsd) ? usd(v.activeSemi * v.semiUsd) : 'unpriced'],
      ['TVL in the pool', isFinite(v.muUsd) ? usd(v.muReserve * v.muUsd * 2) : 'unpriced'],
      ['SEMI price', isFinite(v.semiUsd) ? '$' + v.semiUsd.toPrecision(4) : 'unpriced'],
      ['MU price', isFinite(v.muUsd) ? usd(v.muUsd) : 'unavailable'],
      ['', ''],
      ['SEMI staked (earning)', fmt(v.activeSemi) + ' SEMI'],
      ['SEMI staked (pending)', fmt(v.pendingSemi) + ' SEMI'],
      ['SEMI total supply', fmt(v.supply)],
      ['share of supply staked', v.supply > 0 ? fmt(v.stakedSemi / v.supply * 100) + '%' : '—'],
      ['SEMI spot, in MU', isFinite(v.semiInMu) ? v.semiInMu.toPrecision(6) + ' MU' : 'no pool reserves'],
      ['pool reserves', fmt(v.semiReserve) + ' SEMI / ' + fmt(v.muReserve) + ' MU'],
      ['swap fee now', (v.feeBps / 100).toFixed(2) + '%'],
      ['', ''],
      ['epochs elapsed', String(v.epochs)],
      ['epoch length', (v.secondsPerEpoch / 3600).toFixed(2) + ' h'],
      ['SEMI minted to stakers', fmt(v.mintedTotal)],
      ['mean mint per epoch', fmt(v.perEpoch)],
      ['realised APR', isFinite(v.apr) ? fmt(v.apr) + '%' : '—'],
      ['backing ratio (fbr)', v.fbr.toPrecision(6)],
      ['backing high-water mark', v.hwm.toPrecision(6)],
      ['epoch mint cap', (v.maxEpochBps / 100).toFixed(2) + '% of supply'],
    ])))
    node.appendChild(pre(
      'APR is the REALISED average: total SEMI minted to stakers divided by\n' +
      'epochs elapsed, annualised over the active stake. Emissions are not\n' +
      'fixed — an epoch mints only when the backing ratio sets a new high, so\n' +
      'some epochs pay nothing. Treat this as a trailing figure, not a rate.\n' +
      'Minimum lock after staking: ' + lockHours.toFixed(0) + ' hours.\n' +
      (isFinite(v.muUsd)
        ? 'Dollar figures are anchored to USDG through the onchain USDG/MU pool.\nNo price API is used.'
        : 'The USDG/MU pool could not be read, so no dollar figure is shown.\nEverything above is still live in SEMI and MU.')))
    const poke = e('button', { className: 'semi-action', text: '[ poke the ratchet ]', onClick: function () { doPoke().catch(fatal) } })
    poke.disabled = !state.signer || state.busy
    node.appendChild(poke)
    return node
  }

  function renderWalletSection () {
    const node = section('Wallet')
    if (!state.account) {
      const button = e('button', { className: 'semi-action', text: '[ connect wallet ]', onClick: function () { connect().catch(fatal) } })
      node.appendChild(button)
      node.appendChild(pre('Everything above is read without a wallet. Connect only to stake, unstake or claim.'))
      return node
    }
    const w = state.wallet
    node.appendChild(pre(state.account))
    if (!w) { node.appendChild(pre('Reading your position…')); return node }
    const now = Math.floor(Date.now() / 1000)
    const locked = w.unlockAt > now
    node.appendChild(pre(table([
      ['SEMI in wallet', fmt(w.balance)],
      ['staked (earning)', fmt(w.active)],
      ['staked (pending)', fmt(w.pending)],
      ['claimable now', fmt(w.claimable)],
      ['earned lifetime', fmt(w.earned)],
      ['lock', locked ? 'until ' + new Date(w.unlockAt * 1000).toISOString().replace('T', ' ').slice(0, 16) + ' UTC' : 'unlocked'],
    ])))

    const stakeLabel = e('label', { className: 'semi-form-label', text: 'stake SEMI' })
    const stakeInput = e('input'); stakeInput.id = 'semi-stake-amount'; stakeInput.inputMode = 'decimal'; stakeInput.placeholder = '0.0'
    stakeLabel.appendChild(stakeInput)
    node.appendChild(stakeLabel)
    const stakeBtn = e('button', { className: 'semi-action', text: '[ stake ]', onClick: function () { doStake().catch(fatal) } })
    stakeBtn.disabled = state.busy
    node.appendChild(stakeBtn)
    node.appendChild(pre('Staking resets your ' + (state.vault ? (state.vault.minLock / 3600).toFixed(0) : '—') + '-hour lock, including on a top-up.'))

    const unstakeLabel = e('label', { className: 'semi-form-label', text: 'unstake SEMI' })
    const unstakeInput = e('input'); unstakeInput.id = 'semi-unstake-amount'; unstakeInput.inputMode = 'decimal'; unstakeInput.placeholder = '0.0'
    unstakeLabel.appendChild(unstakeInput)
    node.appendChild(unstakeLabel)
    const unstakeBtn = e('button', { className: 'semi-action', text: '[ unstake ]', onClick: function () { doUnstake().catch(fatal) } })
    unstakeBtn.disabled = state.busy || locked
    node.appendChild(unstakeBtn)
    if (locked) node.appendChild(pre('Locked until the time above; unstake is disabled until then.'))

    const claimBtn = e('button', { className: 'semi-action', text: '[ claim ' + fmt(w.claimable) + ' SEMI ]', onClick: function () { doClaim().catch(fatal) } })
    claimBtn.disabled = state.busy || !(w.claimable > 0)
    node.appendChild(claimBtn)
    return node
  }

  /* ── lifecycle ────────────────────────────────────────────────────── */

  async function refreshVault () { state.vault = await readVault() }

  async function start () {
    state.app = document.getElementById('semi-app')
    state.loading = document.getElementById('semi-loading')
    setLoading('Reading SemiVault contracts on Robinhood Chain…')
    render()
    await refreshVault()
    setLoading(null)
    setStatus('Live from Robinhood Chain (' + chain.number + ').', 'ok')
    if (window.ethereum && window.ethereum.selectedAddress) await connect().catch(function () { /* stay read-only */ })
    render()
    setInterval(function () {
      if (document.hidden) return
      refreshVault().then(render).catch(function () { /* transient RPC, keep the last good read */ })
    }, 60000)
  }

  return { start: start, fatal: fatal }
})()
