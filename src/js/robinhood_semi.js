/* SemiVault on Robinhood Chain: official RPC reads and direct wallet transactions only.
 *
 * No price API and no router. Every number below is read from Robinhood Chain
 * and, where a dollar figure is shown, anchored to USDG through the onchain
 * USDG/MU Uniswap v4 pool. If that anchor cannot be read, the page says so.
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

  const addresses = {
    semi:    '0x5f038759f6de38fd3a85c0440daff1240238bac8',
    staker:  '0x1a79b304872d3ed8b50c22721bc5561694b0927f',
    ratchet: '0xf0883c397a18bfd469af4f66a05406e9940190f7',
    hook:    '0x7b89c56Da91425F35D07290eCFEcF4E58dc13088',
    mu:      '0xfF080c8ce2E5feadaCa0Da81314Ae59D232d4afD',
    usdg:    '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168',
    poolManager: '0x8366a39CC670B4001A1121B8F6A443A643e40951',
  }

  /* slot0 for the USDG/MU v4 pool inside PoolManager. USDG is currency0. */
  const USDG_MU_SLOT0 = '0x18d150baa861e96f4da38bd89d0a356ce079d03d02d170a91b3e6dd86434c9c1'
  const Q96 = ethers.BigNumber.from(2).pow(96)

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
      'function epochCount() view returns (uint256)',
      'function MIN_LOCK() view returns (uint256)',
      'function active(address) view returns (uint256)',
      'function pending(address) view returns (uint256)',
      'function pendingEpoch(address) view returns (uint256)',
      'function earned(address) view returns (uint256)',
      'function unlockAt(address) view returns (uint256)',
      'function stake(uint256)',
      'function unstake(uint256)',
      'function claim()',
    ],
    ratchet: [
      'function currentFbr() view returns (uint256)',
      'function fbrHwm() view returns (uint256)',
      'function totalMinted() view returns (uint256)',
      'function EPOCH() view returns (uint256)',
      'function MAX_EPOCH_BPS() view returns (uint256)',
      'function poke()',
    ],
    hook: [
      'function reserves() view returns (uint256,uint256)',
      'function currentFeeBps() view returns (uint256)',
    ],
    poolManager: ['function extsload(bytes32) view returns (bytes32)'],
  }

  const state = {
    app: null, loading: null, rpc: null,
    wallet: null, eip1193: null,
    account: null, walletChain: null, eventProvider: null, eventHandlers: null,
    reownUnsubscribe: null,
    vault: null, position: null, busy: false,
    message: '', messageType: 'info', draft: { stake: '', unstake: '' },
    spinnerTimer: null, spinnerIndex: 0,
  }

  /* ── plumbing ─────────────────────────────────────────────────────── */

  function byId (id) { return document.getElementById(id) }
  function e (tag, opts) {
    const node = document.createElement(tag)
    const config = opts || {}
    if (config.id) node.id = config.id
    if (config.className) node.className = config.className
    if (config.text != null) node.textContent = config.text
    if (config.type) node.type = config.type
    if (config.onClick) node.addEventListener('click', config.onClick)
    return node
  }
  function section (title) {
    const node = e('section')
    node.appendChild(e('h2', { text: title }))
    return node
  }
  function errText (err) {
    return String(err && (err.reason || err.data && err.data.message || err.message) || err)
      .replace(/^Error: /, '').slice(0, 500)
  }
  function setStatus (msg, kind) {
    state.message = msg || ''
    state.messageType = kind || 'info'
    const node = byId('semi-status')
    if (node) { node.textContent = state.message; node.dataset.kind = state.messageType }
  }
  function fatal (err) {
    setLoading()
    setStatus(errText(err), 'error')
    render()
  }
  function setLoading (msg) {
    if (!state.loading) return
    state.loading.hidden = !msg
    const text = byId('semi-loading-text')
    const spinner = byId('semi-loading-spinner')
    if (msg && text) text.textContent = msg
    if (msg && spinner && !state.spinnerTimer) {
      const frames = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]']
      const advance = function () {
        spinner.textContent = frames[state.spinnerIndex % frames.length]
        state.spinnerIndex += 1
      }
      state.spinnerIndex = 0
      advance()
      state.spinnerTimer = window.setInterval(advance, 300)
    } else if (!msg && state.spinnerTimer) {
      window.clearInterval(state.spinnerTimer)
      state.spinnerTimer = null
    }
  }
  function reader () {
    if (!state.rpc) state.rpc = new ethers.providers.JsonRpcProvider(chain.rpc, chain.number)
    return state.rpc
  }
  function contract (address, abi, provider) {
    return new ethers.Contract(address, abi, provider || reader())
  }
  function toNum (bn, decimals) {
    if (bn == null) return NaN
    return Number(ethers.utils.formatUnits(bn, decimals == null ? 18 : decimals))
  }
  function fmt (n, dp) {
    if (!isFinite(n)) return '—'
    return n.toLocaleString(undefined, { maximumFractionDigits: dp == null ? 2 : dp })
  }
  function usd (n) { return isFinite(n) ? '$' + fmt(n, 0) : 'unpriced' }
  function injectedWallet () {
    return window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null
  }
  function activeWallet () { return state.eip1193 }
  function onRobinhood () { return String(state.walletChain || '').toLowerCase() === chain.id }

  /* ── reads ────────────────────────────────────────────────────────── */

  async function readVault () {
    const staker = contract(addresses.staker, ABI.staker)
    const ratchet = contract(addresses.ratchet, ABI.ratchet)
    const hook = contract(addresses.hook, ABI.hook)
    const semi = contract(addresses.semi, ABI.erc20)
    const pm = contract(addresses.poolManager, ABI.poolManager)
    const mu = contract(addresses.mu, ABI.erc20)
    const usdg = contract(addresses.usdg, ABI.erc20)

    const [
      totalActive, totalPending, epochCount, minLock,
      fbr, hwm, minted, epochSecs, maxEpochBps,
      reserves, feeBps, supply,
    ] = await Promise.all([
      staker.totalActive(), staker.totalPending(), staker.epochCount(), staker.MIN_LOCK(),
      ratchet.currentFbr(), ratchet.fbrHwm(), ratchet.totalMinted(),
      ratchet.EPOCH(), ratchet.MAX_EPOCH_BPS(),
      hook.reserves(), hook.currentFeeBps(), semi.totalSupply(),
    ])

    let muUsd = NaN
    try {
      const [slot0, muDec, usdgDec] = await Promise.all([
        pm.extsload(USDG_MU_SLOT0), mu.decimals(), usdg.decimals(),
      ])
      const sqrtP = ethers.BigNumber.from(slot0).mask(160)
      if (!sqrtP.isZero()) {
        const ratio = Number(sqrtP.toString()) / Number(Q96.toString())
        const muPerUsdg = ratio * ratio * Math.pow(10, usdgDec - muDec)
        if (isFinite(muPerUsdg) && muPerUsdg > 0) muUsd = 1 / muPerUsdg
      }
    } catch (err) { /* keep dollar values explicitly unavailable */ }

    const semiReserve = toNum(reserves[0])
    const muReserve = toNum(reserves[1])
    const semiInMu = semiReserve > 0 ? muReserve / semiReserve : NaN
    const activeSemi = toNum(totalActive)
    const pendingSemi = toNum(totalPending)
    const epochs = Number(epochCount.toString())
    const mintedTotal = toNum(minted)

    return {
      activeSemi,
      pendingSemi,
      stakedSemi: activeSemi + pendingSemi,
      supply: toNum(supply),
      epochs,
      secondsPerEpoch: Number(epochSecs.toString()),
      mintedTotal,
      perEpoch: epochs > 0 ? mintedTotal / epochs : NaN,
      fbr: toNum(fbr), hwm: toNum(hwm),
      maxEpochBps: Number(maxEpochBps.toString()),
      semiReserve, muReserve, semiInMu, muUsd,
      semiUsd: isFinite(muUsd) && isFinite(semiInMu) ? semiInMu * muUsd : NaN,
      feeBps: Number(feeBps.toString()),
      minLock: Number(minLock.toString()),
    }
  }

  async function readPosition () {
    if (!state.account) return null
    const staker = contract(addresses.staker, ABI.staker)
    const semi = contract(addresses.semi, ABI.erc20)
    const [balance, allowance, active, pending, pendingEpoch, earned, unlockAt] = await Promise.all([
      semi.balanceOf(state.account),
      semi.allowance(state.account, addresses.staker),
      staker.active(state.account), staker.pending(state.account),
      staker.pendingEpoch(state.account), staker.earned(state.account),
      staker.unlockAt(state.account),
    ])
    return {
      balance: toNum(balance), allowanceRaw: allowance,
      active: toNum(active), pending: toNum(pending),
      pendingEpoch: Number(pendingEpoch.toString()),
      earned: toNum(earned), unlockAt: Number(unlockAt.toString()),
    }
  }

  async function refreshData () {
    const values = await Promise.all([readVault(), state.account ? readPosition() : Promise.resolve(null)])
    state.vault = values[0]
    state.position = values[1]
  }

  /* ── wallet ───────────────────────────────────────────────────────── */

  function unbindEvents () {
    const provider = state.eventProvider
    const handlers = state.eventHandlers
    if (provider && handlers && provider.removeListener) {
      provider.removeListener('accountsChanged', handlers.accounts)
      provider.removeListener('chainChanged', handlers.chain)
    }
    state.eventProvider = null
    state.eventHandlers = null
  }
  function bindEvents (provider) {
    if (!provider || !provider.on || state.eventProvider === provider) return
    unbindEvents()
    const accounts = function (next) { refreshWallet(next).catch(fatal) }
    const network = function () { refreshWallet().catch(fatal) }
    provider.on('accountsChanged', accounts)
    provider.on('chainChanged', network)
    state.eventProvider = provider
    state.eventHandlers = { accounts: accounts, chain: network }
  }
  async function adoptWallet (provider, accounts) {
    if (!provider || !accounts || !accounts[0]) return false
    state.eip1193 = provider
    state.wallet = new ethers.providers.Web3Provider(provider, 'any')
    state.account = ethers.utils.getAddress(accounts[0])
    state.walletChain = await provider.request({ method: 'eth_chainId' })
    bindEvents(provider)
    state.position = await readPosition()
    render()
    return true
  }
  async function restoreInjectedWallet () {
    const injected = injectedWallet()
    if (!injected) return false
    try {
      const accounts = await injected.request({ method: 'eth_accounts' })
      return adoptWallet(injected, accounts)
    } catch (err) {
      console.warn('Passive injected-wallet restore failed', err)
      return false
    }
  }
  async function adoptReownWallet (appKit, address) {
    const provider = await appKit.getWalletProvider()
    if (!provider || typeof provider.request !== 'function') {
      throw new Error('WalletConnect did not provide an EIP-1193 wallet.')
    }
    const accounts = await provider.request({ method: 'eth_accounts' })
    const adopted = await adoptWallet(provider, accounts && accounts.length ? accounts : address ? [address] : [])
    if (adopted && state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null }
    return adopted
  }
  async function connectReown () {
    const reown = await import('./config.js')
    if (!reown.REOWN_PROJECT_ID) throw new Error('Other wallet is unavailable.')
    const appKit = reown.createAppKitInstance()
    if (!appKit) throw new Error('WalletConnect is unavailable in this browser.')
    const address = appKit.getAddress && appKit.getAddress()
    if (address && await adoptReownWallet(appKit, address)) return true
    if (!state.reownUnsubscribe && appKit.subscribeAccount) {
      state.reownUnsubscribe = appKit.subscribeAccount(function (accountState) {
        if (!accountState || !accountState.isConnected || !accountState.address) return
        adoptReownWallet(appKit, accountState.address).catch(fatal)
      })
    }
    await appKit.open()
    return false
  }
  async function connect () {
    const injected = injectedWallet()
    if (!injected) return connectReown()
    const accounts = await injected.request({ method: 'eth_requestAccounts' })
    if (!accounts || !accounts[0]) throw new Error('No browser-wallet account was selected.')
    await adoptWallet(injected, accounts)
    setStatus(onRobinhood()
      ? 'Wallet connected on Robinhood Chain.'
      : 'Wallet connected. Transactions are disabled until the wallet switches to Robinhood Chain.', onRobinhood() ? 'ok' : 'error')
    render()
    return true
  }
  async function switchNetwork () {
    const provider = activeWallet()
    if (!provider) throw new Error('Connect a wallet first.')
    try {
      await provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
    } catch (err) {
      if (!err || err.code !== 4902) throw err
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: chain.id, chainName: chain.name,
          rpcUrls: [chain.rpc], blockExplorerUrls: [chain.explorer],
          nativeCurrency: chain.nativeCurrency,
        }],
      })
      await provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
    }
    await refreshWallet()
    if (!onRobinhood()) throw new Error('The wallet did not switch to Robinhood Chain.')
    setStatus('Wallet switched to Robinhood Chain.', 'ok')
    render()
  }
  async function refreshWallet (knownAccounts) {
    const provider = activeWallet()
    if (!provider || !state.wallet) return
    const accounts = knownAccounts || await provider.request({ method: 'eth_accounts' })
    state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
    state.walletChain = await provider.request({ method: 'eth_chainId' })
    state.position = state.account ? await readPosition() : null
    render()
  }

  /* ── actions ──────────────────────────────────────────────────────── */

  function needWallet () {
    if (!state.account || !state.wallet || !activeWallet()) throw new Error('Connect a wallet first.')
    if (!onRobinhood()) throw new Error('Switch the wallet to Robinhood Chain first.')
    if (state.busy) throw new Error('Wait for the pending transaction.')
  }
  function amountField (id) {
    const node = byId(id)
    const raw = node && node.value ? node.value.trim() : ''
    if (!raw) throw new Error('Enter an amount first.')
    let parsed
    try { parsed = ethers.utils.parseUnits(raw, 18) } catch (err) { throw new Error('That is not a valid amount.') }
    if (parsed.lte(0)) throw new Error('Amount must be greater than zero.')
    return parsed
  }
  async function send (instance, method, args, label) {
    needWallet()
    state.busy = true
    render()
    try {
      state.walletChain = await activeWallet().request({ method: 'eth_chainId' })
      if (!onRobinhood()) throw new Error('Switch the wallet to Robinhood Chain first.')
      setStatus('Simulating ' + label + ' against Robinhood Chain before sending…')
      const signer = state.wallet.getSigner()
      const connected = instance.connect(signer)
      const request = await connected.populateTransaction[method].apply(connected.populateTransaction, args)
      request.from = state.account
      await state.wallet.call(request)
      setStatus('Wallet confirmation requested for ' + label + '…')
      const tx = await signer.sendTransaction(request)
      setStatus(label + ' sent: ' + tx.hash + '. Waiting for confirmation…')
      await state.wallet.waitForTransaction(tx.hash)
      await refreshData()
      setStatus(label + ' confirmed: ' + tx.hash, 'ok')
      return tx
    } finally {
      state.busy = false
      render()
    }
  }
  async function doStake () {
    needWallet()
    const amount = amountField('semi-stake-amount')
    if (!state.position || state.position.allowanceRaw.lt(amount)) {
      await send(contract(addresses.semi, ABI.erc20, state.wallet), 'approve', [addresses.staker, amount], 'Approve the entered SEMI amount')
    }
    await send(contract(addresses.staker, ABI.staker, state.wallet), 'stake', [amount], 'Stake SEMI')
    state.draft.stake = ''
    render()
  }
  async function doUnstake () {
    needWallet()
    const amount = amountField('semi-unstake-amount')
    await send(contract(addresses.staker, ABI.staker, state.wallet), 'unstake', [amount], 'Unstake SEMI')
    state.draft.unstake = ''
    render()
  }
  function doClaim () {
    return send(contract(addresses.staker, ABI.staker, state.wallet), 'claim', [], 'Claim rewards and activate eligible pending stake')
  }
  function doPoke () {
    return send(contract(addresses.ratchet, ABI.ratchet, state.wallet), 'poke', [], 'Poke the ratchet')
  }
  function runAction (fn) {
    fn().catch(function (err) { console.error('SemiVault action failed', err); setStatus(errText(err), 'error'); render() })
  }

  /* ── render ───────────────────────────────────────────────────────── */

  function table (rows) {
    const width = rows.reduce(function (w, row) { return Math.max(w, row[0].length) }, 0)
    return rows.map(function (row) { return row[0].padEnd(width + 2, ' ') + row[1] }).join('\n')
  }
  function pre (text, className) { return e('pre', { text: text, className: className }) }
  function input (label, id, draftKey) {
    const field = e('label', { className: 'semi-form-label', text: label + ' ' })
    const node = e('input', { id: id, type: 'text' })
    node.inputMode = 'decimal'
    node.autocomplete = 'off'
    node.placeholder = '0.0'
    node.value = state.draft[draftKey] || ''
    node.addEventListener('input', function () { state.draft[draftKey] = node.value })
    field.appendChild(node)
    return field
  }
  function action (label, fn, disabled) {
    const node = e('button', {
      className: 'semi-action', type: 'button', text: '[ ' + label + ' ]',
      onClick: function () { runAction(fn) },
    })
    node.disabled = Boolean(disabled || state.busy)
    return node
  }
  function render () {
    if (!state.app) return
    const active = document.activeElement
    const focus = active && (active.id === 'semi-stake-amount' || active.id === 'semi-unstake-amount')
      ? { id: active.id, start: active.selectionStart, end: active.selectionEnd }
      : null
    state.app.textContent = ''
    state.app.appendChild(renderStatus())
    state.app.appendChild(renderVault())
    state.app.appendChild(renderWalletSection())
    if (focus) {
      const restored = byId(focus.id)
      if (restored) {
        restored.focus({ preventScroll: true })
        if (focus.start != null && focus.end != null) restored.setSelectionRange(focus.start, focus.end)
      }
    }
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
      ['TVL staked', isFinite(v.semiUsd) ? usd(v.stakedSemi * v.semiUsd) : 'unpriced'],
      ['TVL in the pool', isFinite(v.muUsd) ? usd(v.muReserve * v.muUsd * 2) : 'unpriced'],
      ['SEMI price', isFinite(v.semiUsd) ? '$' + v.semiUsd.toPrecision(4) : 'unpriced'],
      ['MU price', isFinite(v.muUsd) ? usd(v.muUsd) : 'unavailable'],
      ['', ''],
      ['SEMI staked (earning)', fmt(v.activeSemi) + ' SEMI'],
      ['SEMI staked (pending)', fmt(v.pendingSemi) + ' SEMI'],
      ['SEMI total staked', fmt(v.stakedSemi) + ' SEMI'],
      ['SEMI total supply', fmt(v.supply)],
      ['share of supply staked', v.supply > 0 ? fmt(v.stakedSemi / v.supply * 100) + '%' : '—'],
      ['SEMI spot, in MU', isFinite(v.semiInMu) ? v.semiInMu.toPrecision(6) + ' MU' : 'no pool reserves'],
      ['pool reserves', fmt(v.semiReserve) + ' SEMI / ' + fmt(v.muReserve) + ' MU'],
      ['swap fee now', (v.feeBps / 100).toFixed(2) + '%'],
      ['', ''],
      ['epochs elapsed', String(v.epochs)],
      ['epoch length', (v.secondsPerEpoch / 3600).toFixed(2) + ' h'],
      ['SEMI minted to stakers', fmt(v.mintedTotal)],
      ['lifetime mean mint / epoch', fmt(v.perEpoch)],
      ['backing ratio (fbr)', isFinite(v.fbr) ? v.fbr.toPrecision(6) : '—'],
      ['backing high-water mark', isFinite(v.hwm) ? v.hwm.toPrecision(6) : '—'],
      ['epoch mint cap', (v.maxEpochBps / 100).toFixed(2) + '% of supply'],
    ]), 'semi-market-table'))
    node.appendChild(pre(
      'Emissions are conditional: an epoch mints only when the backing ratio\n' +
      'sets a new high, and some epochs pay nothing. The historical mint total\n' +
      'and mean above are not a forward rate, so no APR is shown.\n' +
      'TVL and supply share include both earning and pending stake.\n' +
      'Minimum lock after staking: ' + lockHours.toFixed(0) + ' hours.\n' +
      (isFinite(v.muUsd)
        ? 'Dollar figures are anchored to USDG through the onchain USDG/MU pool.\nNo price API is used.'
        : 'The USDG/MU pool could not be read, so no dollar figure is shown.\nEverything above is still live in SEMI and MU.')))
    node.appendChild(action('poke the ratchet', doPoke, !state.account || !onRobinhood()))
    return node
  }
  function renderWalletSection () {
    const node = section('Wallet')
    if (!state.account) {
      node.appendChild(action('connect wallet', connect, false))
      if (injectedWallet()) {
        node.appendChild(document.createTextNode(' '))
        node.appendChild(action('other wallet', connectReown, false))
      }
      node.appendChild(pre('Everything above is read without a wallet. Connect only to stake, unstake or claim.'))
      return node
    }

    node.appendChild(pre(state.account))
    if (!onRobinhood()) {
      node.appendChild(pre('This wallet is on another network. Transactions are disabled until it switches to Robinhood Chain.'))
      node.appendChild(action('switch to Robinhood Chain', switchNetwork, false))
    }
    const w = state.position
    if (!w) { node.appendChild(pre('Reading your position…')); return node }
    const now = Math.floor(Date.now() / 1000)
    const locked = w.unlockAt > now
    const promotable = w.pending > 0 && state.vault && w.pendingEpoch < state.vault.epochs
    const canClaim = w.earned > 0 || promotable
    node.appendChild(pre(table([
      ['SEMI in wallet', fmt(w.balance)],
      ['staked (earning)', fmt(w.active)],
      ['staked (pending)', fmt(w.pending)],
      ['unclaimed rewards', fmt(w.earned)],
      ['lock', locked ? 'until ' + new Date(w.unlockAt * 1000).toISOString().replace('T', ' ').slice(0, 16) + ' UTC' : 'unlocked'],
    ]), 'semi-market-table'))

    node.appendChild(input('stake SEMI', 'semi-stake-amount', 'stake'))
    node.appendChild(action('stake', doStake, !onRobinhood()))
    node.appendChild(pre('Staking resets your ' + (state.vault ? (state.vault.minLock / 3600).toFixed(0) : '—') + '-hour lock, including on a top-up. Approval is limited to the entered amount.'))

    node.appendChild(input('unstake SEMI', 'semi-unstake-amount', 'unstake'))
    node.appendChild(action('unstake', doUnstake, !onRobinhood() || locked))
    if (locked) node.appendChild(pre('Locked until the time above; unstake is disabled until then.'))

    let claimLabel = 'nothing to claim'
    if (w.earned > 0 && promotable) claimLabel = 'claim ' + fmt(w.earned) + ' SEMI + activate pending stake'
    else if (w.earned > 0) claimLabel = 'claim ' + fmt(w.earned) + ' SEMI'
    else if (promotable) claimLabel = 'activate pending stake'
    node.appendChild(document.createTextNode(' '))
    node.appendChild(action(claimLabel, doClaim, !onRobinhood() || !canClaim))
    if (w.pending > 0 && state.vault && !promotable) node.appendChild(pre('Pending stake becomes eligible for activation after the next epoch.'))
    else if (promotable) node.appendChild(pre('Your pending stake is eligible; claim also activates it before settling rewards.'))
    return node
  }

  /* ── lifecycle ────────────────────────────────────────────────────── */

  async function start () {
    state.app = byId('semi-app')
    state.loading = byId('semi-loading')
    state.rpc = new ethers.providers.JsonRpcProvider(chain.rpc, chain.number)
    setLoading('Reading SemiVault contracts on Robinhood Chain…')
    render()
    const passiveWallet = restoreInjectedWallet()
    await Promise.all([refreshData(), passiveWallet])
    if (state.account) state.position = await readPosition()
    setLoading()
    setStatus('Live from Robinhood Chain (' + chain.number + ').', 'ok')
    render()
    window.setInterval(function () {
      if (document.hidden) return
      refreshData().then(render).catch(function () { /* keep the last good read after a transient RPC failure */ })
    }, 60000)
  }

  return { start: start, fatal: fatal }
})()
