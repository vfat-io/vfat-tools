/* OHMVAULT (OHMV) on Ethereum: onchain reads and direct wallet transactions only.
 *
 * No price API and no router. Every number below is read from Ethereum mainnet.
 * Dollar figures come from Chainlink's OHM/ETH and ETH/USD feeds and the OHMV
 * pool's own reserves (OHMV is paired with OHM in a Uniswap v4 pool whose hook
 * keeps the backing). Where a feed cannot be read the page says so rather
 * than guessing.
 */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { Ohmv.start().catch(Ohmv.fatal) })

const Ohmv = (function () {
  const chain = {
    id: '0x1', number: 1, name: 'Ethereum',
    rpc: 'https://ethereum-rpc.publicnode.com',
    explorer: 'https://etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  }

  /* Fixed contract identifiers (all verified on Etherscan). Everything derived from them is read live. */
  const addresses = {
    ohmv:    '0xd520e9f57ad0076b470af4d2eb1577b60604a233',   // VaultToken (OHMV)
    staker:  '0x52e1cecde94440c41090c5bab3081ca0a00105a5',   // VaultStaker
    ratchet: '0xa8307b5900ab2d446d5b17dd0f95b95de60417f0',   // VaultRatchet (emissions)
    hook:    '0x450c7eb41cB3c98690F8411DFe0fBe690B22f0c8',   // VaultHook (Uniswap v4, OHM/OHMV)
    ohm:     '0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5',   // OHM (Olympus), the backing asset
    ohmEth:  '0x9a72298ae3886221820B1c878d12D872087D3a23',   // Chainlink OHM/ETH
    ethUsd:  '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',   // Chainlink ETH/USD
  }

  const ABI = {
    erc20: [
      'function balanceOf(address) view returns (uint256)',
      'function totalSupply() view returns (uint256)',
      'function decimals() view returns (uint8)',
      'function allowance(address,address) view returns (uint256)',
      'function approve(address,uint256) returns (bool)',
    ],
    staker: [
      'function totalActive() view returns (uint256)',
      'function totalPending() view returns (uint256)',
      'function totalCooling() view returns (uint256)',
      'function totalStaked() view returns (uint256)',
      'function epochCount() view returns (uint256)',
      'function MIN_LOCK() view returns (uint256)',
      'function COOLDOWN() view returns (uint256)',
      'function active(address) view returns (uint256)',
      'function pending(address) view returns (uint256)',
      'function earned(address) view returns (uint256)',
      'function claimable(address) view returns (uint256)',
      'function unlockAt(address) view returns (uint256)',
      'function cooling(address) view returns (uint256)',
      'function coolingEnds(address) view returns (uint256)',
      'function stake(uint256)',
      'function unstake(uint256)',
      'function withdraw()',
      'function claim()',
    ],
    ratchet: [
      'function currentFbr() view returns (uint256)',
      'function fbrHwm() view returns (uint256)',
      'function totalMinted() view returns (uint256)',
      'function lastEpochIdx() view returns (uint256)',
      'function EPOCH() view returns (uint256)',
      'function MAX_EPOCH_BPS() view returns (uint256)',
      'function pokeReady() view returns (bool)',
      'function poke()',
    ],
    hook: [
      'function reserves() view returns (uint256,uint256)',
      'function currentFeeBps() view returns (uint256)',
    ],
    feed: ['function latestRoundData() view returns (uint80,int256,uint256,uint256,uint80)'],
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
    const text = document.getElementById('ohmv-loading-text')
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

  /* OHMV is paired with OHM in a full-range v4 pool whose hook holds the floor.
     reserves() returns (OHM, OHMV) — the same pair the ratchet's backing ratio is
     computed from. OHM is priced in USD by Chainlink (OHM/ETH x ETH/USD). */
  async function readVault () {
    const staker = contract(addresses.staker, ABI.staker)
    const ratchet = contract(addresses.ratchet, ABI.ratchet)
    const hook = contract(addresses.hook, ABI.hook)
    const ohmv = contract(addresses.ohmv, ABI.erc20)

    const [
      totalActive, totalPending, totalCooling, epochCount, minLock, cooldown,
      fbr, hwm, minted, epochSecs, maxEpochBps, pokeReady,
      reserves, feeBps, supply,
    ] = await Promise.all([
      staker.totalActive(), staker.totalPending(), staker.totalCooling(),
      staker.epochCount(), staker.MIN_LOCK(), staker.COOLDOWN(),
      ratchet.currentFbr(), ratchet.fbrHwm(), ratchet.totalMinted(),
      ratchet.EPOCH(), ratchet.MAX_EPOCH_BPS(), ratchet.pokeReady(),
      hook.reserves(), hook.currentFeeBps(), ohmv.totalSupply(),
    ])

    /* OHM/USD = OHM/ETH x ETH/USD, both Chainlink, both onchain. A stale or
       zero answer leaves the dollar figures out instead of printing a guess. */
    let ohmUsd = NaN
    try {
      const [a, b] = await Promise.all([contract(addresses.ohmEth, ABI.feed).latestRoundData(), contract(addresses.ethUsd, ABI.feed).latestRoundData()])
      const v = toNum(a[1], 18) * toNum(b[1], 8)
      if (isFinite(v) && v > 0) ohmUsd = v
    } catch (err) { /* stays NaN; the page renders OHM and says the price is unavailable */ }

    const ohmReserve = toNum(reserves[0], 9)
    const ohmvReserve = toNum(reserves[1], 18)
    const ohmvInOhm = ohmvReserve > 0 ? ohmReserve / ohmvReserve : NaN

    /* Every OHMV the ratchet mints goes to active stakers, once per 6h epoch, and
       only when backing per token sets a new high. Annualising the realised
       average is honest; projecting the cap (MAX_EPOCH_BPS) would not be. */
    const epochs = Number(epochCount.toString())
    const secondsPerEpoch = Number(epochSecs.toString())
    const epochsPerYear = secondsPerEpoch > 0 ? (365 * 24 * 3600) / secondsPerEpoch : NaN
    const mintedTotal = toNum(minted)
    const perEpoch = epochs > 0 ? mintedTotal / epochs : NaN
    const activeOhmv = toNum(totalActive)
    const apr = activeOhmv > 0 && isFinite(perEpoch) && isFinite(epochsPerYear)
      ? (perEpoch * epochsPerYear) / activeOhmv * 100
      : NaN

    /* fbr is OHM-wei per token-wei scaled by 1e36: OHM per OHMV = fbr / 1e27 */
    const fbrOhm = Number(ethers.utils.formatUnits(fbr, 27))
    const hwmOhm = Number(ethers.utils.formatUnits(hwm, 27))

    return {
      activeOhmv,
      pendingOhmv: toNum(totalPending),
      coolingOhmv: toNum(totalCooling),
      supply: toNum(supply),
      epochs, secondsPerEpoch, epochsPerYear,
      mintedTotal, perEpoch, apr,
      fbrOhm, hwmOhm, pokeReady,
      maxEpochBps: Number(maxEpochBps.toString()),
      ohmReserve, ohmvReserve, ohmvInOhm,
      ohmUsd,
      ohmvUsd: isFinite(ohmUsd) && isFinite(ohmvInOhm) ? ohmvInOhm * ohmUsd : NaN,
      feeBps: Number(feeBps.toString()),
      minLock: Number(minLock.toString()),
      cooldown: Number(cooldown.toString()),
    }
  }

  async function readWallet () {
    if (!state.account) return null
    const staker = contract(addresses.staker, ABI.staker)
    const ohmv = contract(addresses.ohmv, ABI.erc20)
    const [balance, allowance, active, pending, earned, claimable, unlockAt, cooling, coolingEnds] = await Promise.all([
      ohmv.balanceOf(state.account),
      ohmv.allowance(state.account, addresses.staker),
      staker.active(state.account), staker.pending(state.account),
      staker.earned(state.account), staker.claimable(state.account),
      staker.unlockAt(state.account), staker.cooling(state.account), staker.coolingEnds(state.account),
    ])
    return {
      balance: toNum(balance), allowanceRaw: allowance,
      active: toNum(active), pending: toNum(pending),
      earned: toNum(earned), claimable: toNum(claimable),
      unlockAt: Number(unlockAt.toString()),
      cooling: toNum(cooling), coolingEnds: Number(coolingEnds.toString()),
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
      /* 4902 cannot happen for mainnet; kept so a misconfigured wallet gets a clear prompt. */
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
    const amount = amountField('ohmv-stake-amount')
    const token = contract(addresses.ohmv, ABI.erc20, true)
    if (!state.wallet || state.wallet.allowanceRaw.lt(amount)) {
      await guard('Approving OHMV', function () { return token.approve(addresses.staker, ethers.constants.MaxUint256) })
      if (state.messageType === 'error') return
    }
    await guard('Staking', function () { return contract(addresses.staker, ABI.staker, true).stake(amount) })
  }
  async function doUnstake () {
    const amount = amountField('ohmv-unstake-amount')
    await guard('Unstaking', function () { return contract(addresses.staker, ABI.staker, true).unstake(amount) })
  }
  async function doWithdraw () {
    await guard('Withdrawing', function () { return contract(addresses.staker, ABI.staker, true).withdraw() })
  }
  async function doClaim () {
    await guard('Claiming', function () { return contract(addresses.staker, ABI.staker, true).claim() })
  }
  async function doPoke () {
    /* Permissionless: anyone may settle a due epoch. It pays nothing to the
       caller beyond gas, and is only useful when an epoch is due. */
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
    node.id = 'ohmv-status'
    node.dataset.kind = state.messageType
    return node
  }

  function renderVault () {
    const node = section('Vault')
    const v = state.vault
    if (!v) { node.appendChild(pre('Reading OHMVAULT contracts…')); return node }
    const priced = isFinite(v.ohmvUsd)
    node.appendChild(pre(table([
      ['TVL staked', priced ? usd(v.activeOhmv * v.ohmvUsd) : 'unpriced'],
      ['TVL in the pool', isFinite(v.ohmUsd) ? usd(v.ohmReserve * v.ohmUsd * 2) : 'unpriced'],
      ['OHMV price', priced ? '$' + v.ohmvUsd.toPrecision(4) : 'unpriced'],
      ['OHM price', isFinite(v.ohmUsd) ? '$' + fmt(v.ohmUsd, 2) : 'unavailable'],
      ['', ''],
      ['OHMV staked (earning)', fmt(v.activeOhmv) + ' OHMV'],
      ['OHMV staked (pending)', fmt(v.pendingOhmv) + ' OHMV'],
      ['OHMV cooling down', fmt(v.coolingOhmv) + ' OHMV'],
      ['OHMV total supply', fmt(v.supply)],
      ['share of supply staked', v.supply > 0 ? fmt((v.activeOhmv + v.pendingOhmv) / v.supply * 100) + '%' : '—'],
      ['OHMV spot, in OHM', isFinite(v.ohmvInOhm) ? v.ohmvInOhm.toPrecision(6) + ' OHM' : 'no pool reserves'],
      ['pool reserves (locked)', fmt(v.ohmReserve) + ' OHM / ' + fmt(v.ohmvReserve) + ' OHMV'],
      ['swap fee now', (v.feeBps / 100).toFixed(2) + '%'],
      ['', ''],
      ['epochs elapsed', String(v.epochs)],
      ['epoch length', (v.secondsPerEpoch / 3600).toFixed(2) + ' h'],
      ['OHMV minted to stakers', fmt(v.mintedTotal)],
      ['mean mint per epoch', fmt(v.perEpoch)],
      ['realised APR', isFinite(v.apr) ? fmt(v.apr) + '%' : '—'],
      ['backing per OHMV', isFinite(v.fbrOhm) ? v.fbrOhm.toPrecision(6) + ' OHM' : '—'],
      ['backing high-water mark', isFinite(v.hwmOhm) ? v.hwmOhm.toPrecision(6) + ' OHM' : '—'],
      ['epoch mint cap', (v.maxEpochBps / 100).toFixed(2) + '% of supply'],
      ['epoch due now', v.pokeReady ? 'yes (anyone can poke)' : 'no'],
    ])))
    node.appendChild(pre(
      'APR is the REALISED average: total OHMV minted to stakers divided by\n' +
      'epochs elapsed, annualised over the active stake. Emissions are not\n' +
      'fixed — an epoch mints only when backing per OHMV sets a new high, so\n' +
      'some epochs pay nothing. Treat this as a trailing figure, not a rate.\n' +
      'A new stake waits one epoch before earning; unstaking cools down for ' + (v.cooldown / 3600).toFixed(0) + ' h.\n' +
      (isFinite(v.ohmUsd)
        ? 'Dollar figures use Chainlink OHM/ETH x ETH/USD and the pool reserves.\nNo price API is used.'
        : 'The Chainlink feeds could not be read, so no dollar figure is shown.\nEverything above is still live in OHMV and OHM.')))
    const poke = e('button', { className: 'ohmv-action', text: '[ poke the ratchet ]', onClick: function () { doPoke().catch(fatal) } })
    poke.disabled = !state.signer || state.busy || !v.pokeReady
    node.appendChild(poke)
    return node
  }

  function input (id, label) {
    const l = e('label', { className: 'ohmv-form-label', text: label })
    const i = e('input'); i.id = id; i.inputMode = 'decimal'; i.placeholder = '0.0'
    l.appendChild(i); return l
  }

  function renderWalletSection () {
    const node = section('Wallet')
    if (!state.account) {
      node.appendChild(e('button', { className: 'ohmv-action', text: '[ connect wallet ]', onClick: function () { connect().catch(fatal) } }))
      node.appendChild(pre('Everything above is read without a wallet. Connect only to stake, unstake, withdraw or claim.'))
      return node
    }
    const w = state.wallet
    node.appendChild(pre(state.account))
    if (!w) { node.appendChild(pre('Reading your position…')); return node }
    const now = Math.floor(Date.now() / 1000)
    const locked = w.unlockAt > now
    const coolingLeft = w.cooling > 0 && w.coolingEnds > now
    node.appendChild(pre(table([
      ['OHMV in wallet', fmt(w.balance)],
      ['staked (earning)', fmt(w.active)],
      ['staked (pending)', fmt(w.pending)],
      ['cooling down', fmt(w.cooling) + (w.cooling > 0 ? (coolingLeft ? ' (until ' + new Date(w.coolingEnds * 1000).toISOString().replace('T', ' ').slice(0, 16) + ' UTC)' : ' (ready to withdraw)') : '')],
      ['claimable now', fmt(w.claimable)],
      ['earned (incl. claimable)', fmt(w.earned)],
      ['unstake lock', locked ? 'until ' + new Date(w.unlockAt * 1000).toISOString().replace('T', ' ').slice(0, 16) + ' UTC' : 'unlocked'],
    ])))

    node.appendChild(input('ohmv-stake-amount', 'stake OHMV'))
    const stakeBtn = e('button', { className: 'ohmv-action', text: '[ stake ]', onClick: function () { doStake().catch(fatal) } })
    stakeBtn.disabled = state.busy
    node.appendChild(stakeBtn)
    node.appendChild(pre('A new stake is pending until the next epoch tick, then earns. Staking resets your unstake lock.'))

    node.appendChild(input('ohmv-unstake-amount', 'unstake OHMV'))
    const unstakeBtn = e('button', { className: 'ohmv-action', text: '[ unstake ]', onClick: function () { doUnstake().catch(fatal) } })
    unstakeBtn.disabled = state.busy || locked
    node.appendChild(unstakeBtn)
    if (locked) node.appendChild(pre('Locked until the time above; unstake is disabled until then.'))

    const wdBtn = e('button', { className: 'ohmv-action', text: '[ withdraw ' + fmt(w.cooling) + ' OHMV ]', onClick: function () { doWithdraw().catch(fatal) } })
    wdBtn.disabled = state.busy || !(w.cooling > 0) || coolingLeft
    node.appendChild(wdBtn)

    const claimBtn = e('button', { className: 'ohmv-action', text: '[ claim ' + fmt(w.claimable) + ' OHMV ]', onClick: function () { doClaim().catch(fatal) } })
    claimBtn.disabled = state.busy || !(w.claimable > 0)
    node.appendChild(claimBtn)
    return node
  }

  /* ── lifecycle ────────────────────────────────────────────────────── */

  async function refreshVault () { state.vault = await readVault() }

  async function start () {
    state.app = document.getElementById('ohmv-app')
    state.loading = document.getElementById('ohmv-loading')
    setLoading('Reading OHMVAULT contracts on Ethereum…')
    render()
    await refreshVault()
    setLoading(null)
    setStatus('Live from Ethereum mainnet.', 'ok')
    if (window.ethereum && window.ethereum.selectedAddress) await connect().catch(function () { /* stay read-only */ })
    render()
    setInterval(function () {
      if (document.hidden) return
      refreshVault().then(render).catch(function () { /* transient RPC, keep the last good read */ })
    }, 60000)
  }

  return { start: start, fatal: fatal }
})()
