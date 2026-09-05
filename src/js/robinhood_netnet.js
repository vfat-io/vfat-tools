/* NetNet Capital on Robinhood Chain: official RPC reads and direct EIP-1193 writes only.
 *
 * NET is a reserve-backed token in the OlympusDAO v1 lineage: a Treasury holding
 * USDG, a rebasing staked token (sNET), a Distributor that sets the per-epoch
 * dividend from the market premium over NAV, a BondDepository selling NET at a
 * discount to TWAP but never below NAV, and an InverseBond that bids for NET at
 * NAV less a spread.
 *
 * There is no price API and no router here. Every figure is read from Robinhood
 * Chain and denominated in USDG, which the fund itself treats as its unit of
 * account. Where a value cannot be read the page says so instead of showing 0.
 */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { NetNet.start().catch(NetNet.fatal) })

const NetNet = (function () {
  const chain = { id: '0x1237', number: 4663, name: 'Robinhood Chain', rpc: 'https://rpc.mainnet.chain.robinhood.com' }
  // Deployment roots published by NetNet Capital. Every one of these was
  // confirmed against the others onchain: the Treasury, BondDepository and
  // PairOracle each report the same NET, USDG and canonical pair addresses.
  // Bond markets are enumerated from marketCount(), never hard-coded.
  const addresses = {
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11',
    net: '0xCA9c78Dd337A67F6e0077F65F5E9218719d30eDf',
    sNet: '0xb773ec2C326B7f98a5a83fc098825492F020a4c7',
    staking: '0xB078cc304A0B264C5F3680DC0488954ACcd02E87',
    treasury: '0x04822Ea321A0DEE6F40656172F29312104855d66',
    bondDepository: '0xff32a969A0c567129eECD926D04657728E1980C1',
    distributor: '0x79e71F8a8a2912E40687a8820b2dC0fdd2f686b3',
    pairOracle: '0x929631b33F4070D6f54477fba3FD27566567dAca',
    inverseBond: '0x92166e94Eea5B7799b761653881692f881dFC4C9',
    pair: '0x59F95461E68e0c77605299791E1449f175165B54',
    usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168'
  }
  const erc20Abi = [
    'function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function totalSupply() view returns(uint256)',
    'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)'
  ]
  const netAbi = erc20Abi.concat([
    'function taxTotalBps() view returns(uint256)', 'function taxEnabled() view returns(bool)', 'function isTaxExempt(address) view returns(bool)', 'function isTaxedPair(address) view returns(bool)'
  ])
  const sNetAbi = erc20Abi.concat(['function index() view returns(uint256)'])
  const stakingAbi = [
    // epoch() returns (length, number, end, distribute). The tuple is read
    // positionally: an ethers Result is array-like, so a member named "length"
    // would resolve to the array's own length rather than the epoch duration.
    'function enabled() view returns(bool)', 'function epoch() view returns(uint64,uint64,uint64,uint256)',
    'function totalStaked() view returns(uint256)', 'function warmupEpochs() view returns(uint256)',
    'function stake(address,uint256) returns(uint256)', 'function unstake(address,uint256) returns(uint256)', 'function rebase()'
  ]
  const treasuryAbi = [
    'function backingPerToken() view returns(uint256)', 'function rfv() view returns(uint256)', 'function liquidUsdg() view returns(uint256)',
    'function morphoAssets() view returns(uint256)', 'function morphoCapBps() view returns(uint256)'
  ]
  const distributorAbi = [
    'function currentRateWad() view returns(uint256)', 'function kWad() view returns(uint256)', 'function rMaxWad() view returns(uint256)',
    'function premium() view returns(uint256)', 'function nextReward() view returns(uint256)'
  ]
  const oracleAbi = ['function twapNetUsdg() view returns(uint256)', 'function twapMinWindow() view returns(uint256)', 'function twapMaxWindow() view returns(uint256)']
  const bondAbi = [
    'function enabled() view returns(bool)', 'function marketCount() view returns(uint256)', 'function bondPrice(uint256) view returns(uint256)', 'function quoteToken(uint256) view returns(address)',
    'function startTime() view returns(uint64)', 'function payoutInEpoch(uint256) view returns(uint256)', 'function noteCount(address) view returns(uint256)',
    'function notes(address,uint256) view returns(uint256 payout,uint256 claimed,uint64 start,uint64 end)', 'function pendingFor(address) view returns(uint256 totalPending,uint256 claimableNow)',
    'function deposit(uint256,uint256,uint256,address) returns(uint256 noteId,uint256 payout)', 'function redeem(address) returns(uint256 paid)'
  ]
  const inverseAbi = [
    'function active() view returns(bool)', 'function capacityRemaining() view returns(uint256)', 'function price() view returns(uint256)',
    'function spreadBps() view returns(uint256)', 'function swap(uint256,uint256) returns(uint256)'
  ]
  const pairAbi = erc20Abi.concat(['function getReserves() view returns(uint112,uint112,uint32)', 'function token0() view returns(address)'])
  const multicallAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']

  const iface = function (abi) { return new ethers.utils.Interface(abi) }
  const erc20Interface = iface(erc20Abi); const netInterface = iface(netAbi); const sNetInterface = iface(sNetAbi); const stakingInterface = iface(stakingAbi)
  const treasuryInterface = iface(treasuryAbi); const distributorInterface = iface(distributorAbi); const oracleInterface = iface(oracleAbi)
  const bondInterface = iface(bondAbi); const inverseInterface = iface(inverseAbi); const pairInterface = iface(pairAbi)

  const wad = ethers.constants.WeiPerEther
  const zeroBn = ethers.constants.Zero
  // The Distributor's published dividend curve: rate = rMax * clamp((P-1)/(K-1), 0, 1),
  // where P is the market price over NAV. rMax and K are read from the contract.
  // The BondDepository caps NET payout per epoch at this fraction of total supply;
  // payoutInEpoch() is onchain, the cap fraction is the fund's published parameter.
  const bondEpochCapFraction = 0.0025
  const defaultBondSlippage = '2'
  const defaultSellSlippage = '1'

  const state = {
    rpc: null, eip1193: null, walletSource: null, account: null, walletChain: null, walletListenerCleanup: [], reownUnsubscribe: null,
    fund: null, growth: null, tokens: new Map(), markets: [], notes: [], buyback: null, wallet: null,
    loading: false, status: '', statusType: '', walletLoading: false, sending: false
  }

  const byId = function (id) { return document.getElementById(id) }
  const lower = function (address) { return String(address || '').toLowerCase() }
  const short = function (address) { return address ? address.slice(0, 6) + '…' + address.slice(-4) : '—' }
  const nowSeconds = function () { return Math.floor(Date.now() / 1000) }
  const clean = function (value, length) { return String(value || '—').replace(/[\r\n|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, length || 24) || '—' }
  const injectedWallet = function () { return window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null }

  // Custom errors raised by the NetNet contracts, keyed by selector so a
  // simulated revert reads as a sentence instead of four opaque bytes.
  const revertReasons = {}
  ;[
    ['EpochCapExceeded()', 'this bond would exceed the payout cap for the current epoch; try a smaller amount or wait for the next epoch'],
    ['PriceAboveMax()', 'the bond price moved above the tolerance set for this order; raise it or retry'],
    ['InvalidMarket()', 'that bond market does not exist'],
    ['NotEnabled()', 'the bond depository is not enabled'],
    ['NotWired()', 'the bond depository is not wired to its genesis bond yet'],
    ['ZeroAmount()', 'the amount is zero'],
    ['ZeroAddress()', 'the recipient address is empty'],
    ['TransferFailed()', 'a token transfer failed'],
    ['MulDivOverflow()', 'the amount is too large for the depository to price'],
    ['InsufficientAllowance()', 'approve the token for this contract first'],
    ['NotDeployer()', 'only the deployer can call this']
  ].forEach(function (entry) { revertReasons[ethers.utils.id(entry[0]).slice(0, 10)] = entry[0].replace(/\(.*$/, '') + ': ' + entry[1] })
  const revertData = function (error) {
    const candidates = [error && error.data, error && error.data && error.data.data, error && error.data && error.data.originalError && error.data.originalError.data, error && error.error && error.error.data, error && error.info && error.info.error && error.info.error.data]
    for (let i = 0; i < candidates.length; i += 1) if (typeof candidates[i] === 'string' && /^0x[0-9a-fA-F]{8}/.test(candidates[i])) return candidates[i].slice(0, 10).toLowerCase()
    return null
  }
  const errText = function (error) {
    const selector = revertData(error); if (selector && revertReasons[selector]) return revertReasons[selector]
    return String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').slice(0, 500)
  }
  const asNumber = function (amount, decimals) {
    if (amount === undefined || amount === null || decimals === undefined || decimals === null) return NaN
    const value = Number(ethers.utils.formatUnits(amount, decimals))
    return Number.isFinite(value) ? value : NaN
  }
  const formatAmount = function (amount, decimals, digits) {
    if (amount === undefined || amount === null) return '—'
    const parts = ethers.utils.formatUnits(amount, decimals).split('.')
    const width = digits === undefined ? 4 : digits
    const raw = parts[1] || ''
    let fraction = raw.slice(0, width).replace(/0+$/, '')
    // The NET/USDG LP token is minted as sqrt(x*y) over 6- and 9-decimal legs,
    // so the entire pool is worth ~2.7e-7 when read at the pair's nominal 18
    // decimals. A real holder's balance is all leading zeros at four places.
    // Widen to the first significant digits rather than reporting nothing held.
    if (!fraction && parts[0] === '0') {
      const lead = raw.search(/[1-9]/)
      if (lead >= 0) fraction = raw.slice(0, lead + width).replace(/0+$/, '')
    }
    return fraction ? parts[0] + '.' + fraction : parts[0]
  }
  const compact = function (value, digits) {
    if (!Number.isFinite(value)) return '—'
    const places = digits === undefined ? 2 : digits
    const sign = value < 0 ? '-' : ''; const size = Math.abs(value)
    if (size >= 1e9) return sign + (size / 1e9).toFixed(places) + 'b'
    if (size >= 1e6) return sign + (size / 1e6).toFixed(places) + 'm'
    if (size >= 1e3) return sign + (size / 1e3).toFixed(places) + 'k'
    if (size >= 1) return sign + size.toFixed(places)
    return size > 0 ? sign + size.toPrecision(3) : '0'
  }
  // Every dollar figure on this page is USDG read from the fund's own contracts.
  const usd = function (value) { if (!Number.isFinite(value)) return '—'; if (value === 0) return '$0'; return Math.abs(value) < 0.01 ? '<$0.01' : '$' + compact(value) }
  const price = function (value) { return Number.isFinite(value) ? compact(value, value >= 1 ? 2 : 4) + ' USDG' : '—' }
  const percent = function (value, digits) { return Number.isFinite(value) ? compact(value, digits === undefined ? 2 : digits) + '%' : '—' }
  const multiple = function (value) { return Number.isFinite(value) ? compact(value, 3) + '×' : '—' }
  const duration = function (seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) return 'now'
    const days = Math.floor(seconds / 86400); const hours = Math.floor((seconds % 86400) / 3600); const minutes = Math.floor((seconds % 3600) / 60)
    return days ? days + 'd ' + hours + 'h' : hours ? hours + 'h ' + minutes + 'm' : minutes + 'm'
  }
  const dateText = function (seconds) { return Number.isFinite(seconds) && seconds > 0 ? new Date(seconds * 1000).toISOString().slice(0, 16).replace('T', ' ') : '—' }

  const e = function (tag, options) {
    const node = document.createElement(tag); const config = options || {}
    if (config.text !== undefined) node.textContent = config.text
    if (config.className) node.className = config.className
    if (config.id) node.id = config.id
    if (config.type) node.type = config.type
    if (config.hidden) node.hidden = true
    if (config.disabled) node.disabled = true
    return node
  }
  const add = function (parent) { for (let i = 1; i < arguments.length; i += 1) parent.appendChild(arguments[i]); return parent }
  const button = function (text, handler, disabled) { const node = e('button', { text: text, className: 'netnet-action-button', type: 'button', disabled: disabled }); node.addEventListener('click', handler); return node }
  const input = function (value, placeholder) { const node = e('input'); node.type = 'text'; node.inputMode = 'decimal'; node.autocomplete = 'off'; node.value = value || ''; node.placeholder = placeholder || '0.0'; return node }

  function setStatus (text, type) { state.status = text || ''; state.statusType = type || ''; const node = byId('netnet-status'); if (node) { node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = state.statusType } }
  function setLoading (text) { state.loading = !!text; const node = byId('netnet-loading'); const label = byId('netnet-loading-text'); if (node) node.hidden = !text; if (label && text) label.textContent = text }
  function token (address) { return state.tokens.get(lower(address)) || { address: address, symbol: short(address), decimals: 18 } }

  // Independent reads go through the canonical Multicall3 in one round trip.
  // A single failing optional call falls back to its own default instead of
  // blanking the page.
  async function batch (calls) {
    if (!calls.length) return []
    const results = []
    const deduped = new Map()
    calls.forEach(function (call, index) {
      const data = call.iface.encodeFunctionData(call.method, call.args || [])
      const id = lower(call.target) + ':' + data
      if (!deduped.has(id)) deduped.set(id, { call: call, data: data, indexes: [] })
      deduped.get(id).indexes.push(index)
    })
    const entries = Array.from(deduped.values())
    for (let cursor = 0; cursor < entries.length; cursor += 160) {
      const slice = entries.slice(cursor, cursor + 160)
      const decoded = await aggregateSlice(slice)
      decoded.forEach(function (reply, offset) {
        const entry = slice[offset]; let value = entry.call.fallback
        if (reply.success) {
          try { value = entry.call.iface.decodeFunctionResult(entry.call.method, reply.returnData) } catch (_) {}
        }
        entry.indexes.forEach(function (index) { results[index] = value })
      })
    }
    return results
  }
  async function aggregateSlice (slice) {
    const multicallInterface = iface(multicallAbi)
    const data = multicallInterface.encodeFunctionData('aggregate3', [slice.map(function (entry) { return { target: entry.call.target, allowFailure: true, callData: entry.data } })])
    let lastError
    // The Robinhood RPC occasionally closes a large eth_call response. Retry the
    // exact payload, then split it, rather than falling back to per-call reads.
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await state.rpc.call({ to: addresses.multicall, data: data })
        return multicallInterface.decodeFunctionResult('aggregate3', response)[0]
      } catch (error) { lastError = error; await new Promise(function (resolve) { window.setTimeout(resolve, 250 * (attempt + 1)) }) }
    }
    if (slice.length === 1) throw lastError
    const midpoint = Math.ceil(slice.length / 2)
    const left = await aggregateSlice(slice.slice(0, midpoint))
    const right = await aggregateSlice(slice.slice(midpoint))
    return left.concat(right)
  }

  function clearProviderListeners () { state.walletListenerCleanup.forEach(function (cleanup) { cleanup() }); state.walletListenerCleanup = [] }
  function clearReownSubscription () { if (state.reownUnsubscribe) state.reownUnsubscribe(); state.reownUnsubscribe = null }
  function clearWalletEvents () { clearProviderListeners(); clearReownSubscription() }
  function bindProviderEvents (provider) {
    clearProviderListeners()
    if (!provider || typeof provider.on !== 'function') return
    const accountsChanged = function (accounts) {
      if (state.eip1193 !== provider) return
      state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
      if (!state.account) { clearWalletState(); render(); return }
      refreshWallet().catch(fatal)
    }
    const chainChanged = function (walletChain) {
      if (state.eip1193 !== provider) return
      state.walletChain = walletChain
      refreshWallet().catch(fatal)
    }
    provider.on('accountsChanged', accountsChanged); provider.on('chainChanged', chainChanged)
    const remove = typeof provider.removeListener === 'function' ? provider.removeListener.bind(provider) : typeof provider.off === 'function' ? provider.off.bind(provider) : null
    if (remove) {
      state.walletListenerCleanup.push(function () { remove('accountsChanged', accountsChanged) })
      state.walletListenerCleanup.push(function () { remove('chainChanged', chainChanged) })
    }
  }
  function clearWalletState () { state.wallet = null; state.notes = [] }
  async function adoptWallet (provider, accounts, source, walletChain) {
    if (!provider || !accounts || !accounts[0]) return false
    state.eip1193 = provider; state.walletSource = source; state.walletChain = walletChain
    state.account = ethers.utils.getAddress(accounts[0]); bindProviderEvents(provider); render()
    return true
  }
  async function passiveWallet () {
    const injected = injectedWallet()
    if (!injected) return false
    try {
      // Startup only ever performs the injected provider's passive account and
      // chain reads. Reown is neither imported nor probed on this path.
      const values = await Promise.all([injected.request({ method: 'eth_accounts' }), injected.request({ method: 'eth_chainId' })])
      return adoptWallet(injected, values[0], 'injected', values[1])
    } catch (error) { console.warn('Passive injected-wallet read failed', error); return false }
  }
  async function connectWallet () {
    const injected = injectedWallet()
    if (!injected) throw new Error('No injected EIP-1193 wallet was found in this browser. Use Other wallet for WalletConnect.')
    const accounts = await injected.request({ method: 'eth_requestAccounts' }); let walletChain = await injected.request({ method: 'eth_chainId' })
    if (walletChain !== chain.id) {
      await injected.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
      walletChain = await injected.request({ method: 'eth_chainId' })
    }
    if (walletChain !== chain.id) throw new Error('Switch the wallet to Robinhood Chain before sending a transaction.')
    if (!await adoptWallet(injected, accounts, 'injected', walletChain)) throw new Error('The wallet did not return an account.')
    clearReownSubscription(); await refreshWallet()
  }
  async function adoptReownWallet (appKit, address) {
    const provider = await appKit.getWalletProvider()
    if (!provider || typeof provider.request !== 'function') throw new Error('WalletConnect did not provide an EIP-1193 wallet.')
    const values = await Promise.all([provider.request({ method: 'eth_accounts' }), provider.request({ method: 'eth_chainId' })])
    const accounts = values[0] && values[0].length ? values[0] : address ? [address] : []
    const adopted = await adoptWallet(provider, accounts, 'reown', values[1])
    if (adopted) { clearReownSubscription(); await refreshWallet() }
    return adopted
  }
  async function connectReown () {
    // This dynamic import is the only path that loads AppKit and WalletConnect.
    // It is never part of the first-load waterfall.
    const reown = await import('./config.js')
    if (!reown.REOWN_PROJECT_ID) throw new Error('Optional wallet support is unavailable.')
    const appKit = reown.createAppKitInstance()
    if (!appKit) throw new Error('WalletConnect is unavailable in this browser.')
    const address = appKit.getAddress && appKit.getAddress()
    if (address && await adoptReownWallet(appKit, address)) return true
    if (!state.reownUnsubscribe && appKit.subscribeAccount) {
      state.reownUnsubscribe = appKit.subscribeAccount(function (accountState) {
        if (!accountState || !accountState.isConnected || !accountState.address) return
        adoptReownWallet(appKit, accountState.address).catch(function (error) { setStatus(errText(error), 'error') })
      })
    }
    await appKit.open(); return false
  }

  async function loadTokens () {
    const list = [addresses.net, addresses.sNet, addresses.usdg, addresses.pair]
    const calls = []
    list.forEach(function (address) {
      calls.push({ target: address, iface: erc20Interface, method: 'symbol', fallback: ['TOKEN'] })
      calls.push({ target: address, iface: erc20Interface, method: 'decimals', fallback: [18] })
    })
    const values = await batch(calls); let cursor = 0
    list.forEach(function (address) {
      const symbol = clean(values[cursor++][0], 20); const decimals = Number(values[cursor++][0])
      state.tokens.set(lower(address), { address: ethers.utils.getAddress(address), symbol: symbol, decimals: Number.isInteger(decimals) ? decimals : 18 })
    })
  }

  async function loadFund () {
    setLoading('Reading the NetNet treasury, staking, and oracle…'); render()
    await loadTokens()
    const netToken = token(addresses.net); const usdgToken = token(addresses.usdg)
    const values = await batch([
      { target: addresses.treasury, iface: treasuryInterface, method: 'backingPerToken', fallback: null },
      { target: addresses.treasury, iface: treasuryInterface, method: 'rfv', fallback: null },
      { target: addresses.treasury, iface: treasuryInterface, method: 'liquidUsdg', fallback: null },
      { target: addresses.treasury, iface: treasuryInterface, method: 'morphoAssets', fallback: null },
      { target: addresses.treasury, iface: treasuryInterface, method: 'morphoCapBps', fallback: null },
      { target: addresses.pairOracle, iface: oracleInterface, method: 'twapNetUsdg', fallback: null },
      { target: addresses.pairOracle, iface: oracleInterface, method: 'twapMinWindow', fallback: null },
      { target: addresses.pairOracle, iface: oracleInterface, method: 'twapMaxWindow', fallback: null },
      { target: addresses.distributor, iface: distributorInterface, method: 'currentRateWad', fallback: null },
      { target: addresses.distributor, iface: distributorInterface, method: 'kWad', fallback: null },
      { target: addresses.distributor, iface: distributorInterface, method: 'rMaxWad', fallback: null },
      { target: addresses.distributor, iface: distributorInterface, method: 'premium', fallback: null },
      { target: addresses.distributor, iface: distributorInterface, method: 'nextReward', fallback: null },
      { target: addresses.staking, iface: stakingInterface, method: 'epoch', fallback: null },
      { target: addresses.staking, iface: stakingInterface, method: 'totalStaked', fallback: null },
      { target: addresses.staking, iface: stakingInterface, method: 'warmupEpochs', fallback: [zeroBn] },
      { target: addresses.staking, iface: stakingInterface, method: 'enabled', fallback: [false] },
      { target: addresses.net, iface: netInterface, method: 'totalSupply', fallback: null },
      { target: addresses.sNet, iface: sNetInterface, method: 'index', fallback: null },
      { target: addresses.net, iface: netInterface, method: 'taxTotalBps', fallback: null },
      { target: addresses.net, iface: netInterface, method: 'taxEnabled', fallback: [false] },
      { target: addresses.net, iface: netInterface, method: 'isTaxExempt', args: [addresses.staking], fallback: [false] },
      { target: addresses.net, iface: netInterface, method: 'isTaxExempt', args: [addresses.bondDepository], fallback: [false] },
      { target: addresses.net, iface: netInterface, method: 'isTaxExempt', args: [addresses.inverseBond], fallback: [false] },
      { target: addresses.pair, iface: pairInterface, method: 'getReserves', fallback: null },
      { target: addresses.pair, iface: pairInterface, method: 'token0', fallback: null },
      { target: addresses.pair, iface: pairInterface, method: 'totalSupply', fallback: null }
    ])
    let cursor = 0
    const first = function () { const value = values[cursor++]; return value ? value[0] : null }
    const fund = {
      nav: first(), rfv: first(), liquidUsdg: first(), morphoAssets: first(), morphoCapBps: first(),
      twap: first(), twapMinWindow: first(), twapMaxWindow: first(),
      rateWad: first(), kWad: first(), rMaxWad: first(), premiumWad: first(), nextReward: first()
    }
    const epoch = values[cursor++]
    fund.epochLength = epoch ? epoch[0].toNumber() : 0
    fund.epochNumber = epoch ? epoch[1].toString() : null
    fund.epochEnd = epoch ? epoch[2].toNumber() : 0
    fund.epochDistribute = epoch ? epoch[3] : null
    fund.totalStaked = first(); fund.warmupEpochs = Number(first() || 0); fund.stakingEnabled = Boolean(first())
    fund.netSupply = first(); fund.index = first()
    fund.taxTotalBps = first(); fund.taxEnabled = Boolean(first())
    fund.stakingExempt = Boolean(first()); fund.bondExempt = Boolean(first()); fund.inverseExempt = Boolean(first())
    const reserves = values[cursor++]; const token0 = values[cursor++]; fund.lpSupply = first()
    if (reserves && token0) {
      const usdgIsToken0 = lower(token0[0]) === lower(addresses.usdg)
      fund.reserveUsdg = usdgIsToken0 ? reserves[0] : reserves[1]
      fund.reserveNet = usdgIsToken0 ? reserves[1] : reserves[0]
    }

    // Derived views. Each guards on the reads it needs so an unavailable
    // upstream value produces an unavailable figure, never a zero.
    fund.navUsdg = asNumber(fund.nav, 18)
    fund.twapUsdg = asNumber(fund.twap, 18)
    fund.premium = asNumber(fund.premiumWad, 18)
    fund.rate = asNumber(fund.rateWad, 18)
    fund.k = asNumber(fund.kWad, 18)
    fund.rMax = asNumber(fund.rMaxWad, 18)
    fund.rfvUsdg = asNumber(fund.rfv, 18)
    fund.liquidUsdgValue = asNumber(fund.liquidUsdg, 18)
    fund.morphoUsdgValue = asNumber(fund.morphoAssets, 18)
    fund.supply = asNumber(fund.netSupply, netToken.decimals)
    fund.staked = asNumber(fund.totalStaked, netToken.decimals)
    fund.stakedShare = Number.isFinite(fund.supply) && fund.supply > 0 && Number.isFinite(fund.staked) ? fund.staked / fund.supply * 100 : NaN
    fund.marketCap = Number.isFinite(fund.supply) && Number.isFinite(fund.twapUsdg) ? fund.supply * fund.twapUsdg : NaN
    // The rebase is a real per-epoch compounding of sNET balances, so the
    // annualized figure is a genuine APY rather than a restated APR.
    fund.epochsPerYear = fund.epochLength > 0 ? 31536000 / fund.epochLength : NaN
    fund.apy = Number.isFinite(fund.rate) && Number.isFinite(fund.epochsPerYear) ? (Math.pow(1 + fund.rate, fund.epochsPerYear) - 1) * 100 : NaN
    fund.spotUsdg = fund.reserveUsdg && fund.reserveNet && !fund.reserveNet.isZero()
      ? asNumber(fund.reserveUsdg, usdgToken.decimals) / asNumber(fund.reserveNet, netToken.decimals) : NaN
    fund.poolUsdg = Number.isFinite(asNumber(fund.reserveUsdg, usdgToken.decimals)) && Number.isFinite(fund.spotUsdg)
      ? asNumber(fund.reserveUsdg, usdgToken.decimals) * 2 : NaN
    // Backing only moves on an epoch boundary, and the chain's public RPC keeps
    // under ten minutes of state, so a growth rate cannot be read onchain here.
    // It comes from the recorded series instead. Failure is not fatal: the page
    // has always worked without it and simply omits the line.
    state.growth = await loadGrowth().catch(function (error) {
      console.warn('NetNet growth unavailable', errText(error))
      return null
    })

    state.fund = fund
    await loadMarkets()
    await loadBuyback()
    setLoading(); setStatus(''); render()
  }

  async function loadMarkets () {
    const counts = await batch([
      { target: addresses.bondDepository, iface: bondInterface, method: 'marketCount', fallback: [zeroBn] },
      { target: addresses.bondDepository, iface: bondInterface, method: 'enabled', fallback: [false] },
      { target: addresses.bondDepository, iface: bondInterface, method: 'startTime', fallback: [zeroBn] }
    ])
    const marketCount = counts[0][0].toNumber()
    state.bondsEnabled = Boolean(counts[1][0])
    const bondStart = counts[2][0].toNumber()
    // Bond payout capacity is metered in epochs counted from the depository's
    // own start time, which is independent of the staking epoch counter.
    const epochLength = state.fund && state.fund.epochLength > 0 ? state.fund.epochLength : 28800
    const bondEpoch = bondStart > 0 ? Math.floor((nowSeconds() - bondStart) / epochLength) : null
    const calls = []
    for (let id = 0; id < marketCount; id += 1) {
      calls.push({ target: addresses.bondDepository, iface: bondInterface, method: 'quoteToken', args: [id], fallback: null })
      calls.push({ target: addresses.bondDepository, iface: bondInterface, method: 'bondPrice', args: [id], fallback: null })
    }
    if (bondEpoch !== null) calls.push({ target: addresses.bondDepository, iface: bondInterface, method: 'payoutInEpoch', args: [bondEpoch], fallback: null })
    const values = await batch(calls); let cursor = 0
    const markets = []
    for (let id = 0; id < marketCount; id += 1) {
      const quote = values[cursor++]; const bondPrice = values[cursor++]
      markets.push({ id: id, quote: quote ? quote[0] : null, priceWad: bondPrice ? bondPrice[0] : null })
    }
    const paid = bondEpoch !== null ? values[cursor++] : null
    state.bondEpoch = bondEpoch
    state.bondPaidThisEpoch = paid ? paid[0] : null

    // Quote-token metadata is read rather than assumed: market 0 quotes in USDG
    // and market 1 in the canonical NET/USDG LP, but both come from quoteToken().
    const unknown = markets.map(function (market) { return market.quote }).filter(function (address) { return address && !state.tokens.has(lower(address)) })
    if (unknown.length) {
      const metaCalls = []
      unknown.forEach(function (address) {
        metaCalls.push({ target: address, iface: erc20Interface, method: 'symbol', fallback: ['TOKEN'] })
        metaCalls.push({ target: address, iface: erc20Interface, method: 'decimals', fallback: [18] })
      })
      const meta = await batch(metaCalls); let metaCursor = 0
      unknown.forEach(function (address) {
        const symbol = clean(meta[metaCursor++][0], 20); const decimals = Number(meta[metaCursor++][0])
        state.tokens.set(lower(address), { address: ethers.utils.getAddress(address), symbol: symbol, decimals: Number.isInteger(decimals) ? decimals : 18 })
      })
    }
    const fund = state.fund
    markets.forEach(function (market) {
      market.priceUsdg = asNumber(market.priceWad, 18)
      market.isLp = !!market.quote && lower(market.quote) === lower(addresses.pair)
      market.label = market.isLp ? 'NET/USDG liquidity' : token(market.quote).symbol + ' reserve'
      market.discount = fund && Number.isFinite(fund.twapUsdg) && fund.twapUsdg > 0 && Number.isFinite(market.priceUsdg)
        ? (1 - market.priceUsdg / fund.twapUsdg) * 100 : NaN
      // price = max(TWAP * (1 - discount), NAV); when the NAV floor binds, the
      // quoted price sits on NAV rather than under the market.
      market.atFloor = fund && Number.isFinite(fund.navUsdg) && Number.isFinite(market.priceUsdg) && market.priceUsdg <= fund.navUsdg * 1.0001
    })
    state.markets = markets
  }

  async function loadBuyback () {
    const values = await batch([
      { target: addresses.inverseBond, iface: inverseInterface, method: 'active', fallback: [false] },
      { target: addresses.inverseBond, iface: inverseInterface, method: 'price', fallback: null },
      { target: addresses.inverseBond, iface: inverseInterface, method: 'spreadBps', fallback: null },
      { target: addresses.inverseBond, iface: inverseInterface, method: 'capacityRemaining', fallback: null }
    ])
    const priceWad = values[1] ? values[1][0] : null
    state.buyback = {
      active: Boolean(values[0][0]), priceWad: priceWad, priceUsdg: asNumber(priceWad, 18),
      spreadBps: values[2] ? values[2][0].toNumber() : NaN,
      capacityWad: values[3] ? values[3][0] : null, capacityUsdg: asNumber(values[3] ? values[3][0] : null, 18)
    }
  }

  async function refreshWallet () {
    const status = byId('netnet-wallet-status')
    if (!state.account || !state.eip1193 || state.walletChain !== chain.id || !state.fund) {
      if (status) status.textContent = state.account ? 'Switch wallet to Robinhood Chain' : ''
      clearWalletState(); render(); return
    }
    state.walletLoading = true; setLoading('Reading wallet balances, allowances, and bond notes…'); if (status) status.textContent = short(state.account); render()
    try {
      const quoteTokens = state.markets.map(function (market) { return market.quote }).filter(Boolean)
      const calls = [
        { target: addresses.net, iface: netInterface, method: 'balanceOf', args: [state.account], fallback: [zeroBn] },
        { target: addresses.sNet, iface: sNetInterface, method: 'balanceOf', args: [state.account], fallback: [zeroBn] },
        { target: addresses.usdg, iface: erc20Interface, method: 'balanceOf', args: [state.account], fallback: [zeroBn] },
        { target: addresses.net, iface: netInterface, method: 'allowance', args: [state.account, addresses.staking], fallback: [zeroBn] },
        { target: addresses.sNet, iface: sNetInterface, method: 'allowance', args: [state.account, addresses.staking], fallback: [zeroBn] },
        { target: addresses.net, iface: netInterface, method: 'allowance', args: [state.account, addresses.inverseBond], fallback: [zeroBn] },
        { target: addresses.bondDepository, iface: bondInterface, method: 'pendingFor', args: [state.account], fallback: null },
        { target: addresses.bondDepository, iface: bondInterface, method: 'noteCount', args: [state.account], fallback: [zeroBn] }
      ]
      quoteTokens.forEach(function (address) {
        calls.push({ target: address, iface: erc20Interface, method: 'balanceOf', args: [state.account], fallback: [zeroBn] })
        calls.push({ target: address, iface: erc20Interface, method: 'allowance', args: [state.account, addresses.bondDepository], fallback: [zeroBn] })
      })
      const values = await batch(calls); let cursor = 0
      const wallet = {
        net: values[cursor++][0], sNet: values[cursor++][0], usdg: values[cursor++][0],
        netToStaking: values[cursor++][0], sNetToStaking: values[cursor++][0], netToInverse: values[cursor++][0],
        pendingTotal: null, claimableNow: null, quotes: new Map()
      }
      const pending = values[cursor++]
      if (pending) { wallet.pendingTotal = pending.totalPending; wallet.claimableNow = pending.claimableNow }
      const noteCount = values[cursor++][0].toNumber()
      quoteTokens.forEach(function (address) {
        wallet.quotes.set(lower(address), { balance: values[cursor++][0], allowance: values[cursor++][0] })
      })
      state.wallet = wallet
      render()
      // Notes are read in bounded chunks so a wallet with a long bonding
      // history still renders progressively.
      state.notes = []
      for (let offset = 0; offset < noteCount; offset += 64) {
        const width = Math.min(64, noteCount - offset); const noteCalls = []
        for (let index = 0; index < width; index += 1) noteCalls.push({ target: addresses.bondDepository, iface: bondInterface, method: 'notes', args: [state.account, offset + index], fallback: null })
        const decoded = await batch(noteCalls)
        decoded.forEach(function (note, index) {
          if (!note) return
          state.notes.push({ id: offset + index, payout: note.payout, claimed: note.claimed, start: note.start.toNumber(), end: note.end.toNumber() })
        })
        render()
      }
    } finally { state.walletLoading = false; setLoading(); render() }
  }

  function showDialog (title, description) {
    const dialog = byId('netnet-action-dialog'); const content = byId('netnet-action-content'); content.textContent = ''
    content.appendChild(e('h2', { id: 'netnet-action-title', text: title })); if (description) content.appendChild(e('p', { text: description }))
    if (dialog.open) dialog.close(); dialog.showModal(); return content
  }
  function dialogNote (content) { const note = e('pre', { className: 'netnet-action-note', text: '' }); content.appendChild(note); return note }
  function label (content, text) { content.appendChild(e('label', { className: 'netnet-form-label', text: text })) }
  function amountRow (content, text, available, decimals) {
    label(content, text + (available !== undefined ? ' (available ' + formatAmount(available, decimals) + ')' : ''))
    const row = e('div', { className: 'netnet-input-row' }); const field = input('', '0.0')
    if (available !== undefined) add(row, field, button('[ max ]', function () { field.value = formatAmount(available || zeroBn, decimals, 18); field.dispatchEvent(new Event('input')) }))
    else row.appendChild(field)
    content.appendChild(row); return field
  }
  function parseAmount (field, decimals) {
    const value = String(field.value || '').trim()
    if (!value || !/^\d+(\.\d+)?$/.test(value)) throw new Error('Enter a valid positive amount.')
    const parsed = ethers.utils.parseUnits(value, decimals)
    if (parsed.lte(0)) throw new Error('Enter an amount greater than zero.')
    return parsed
  }
  function parseSlippage (field) {
    const value = Number(String(field.value || '').trim())
    if (!Number.isFinite(value) || value < 0 || value > 50) throw new Error('Enter a tolerance between 0 and 50 percent.')
    return Math.round(value * 100)
  }
  function requireWallet () {
    if (!state.account || !state.eip1193) throw new Error('Connect a wallet first.')
    if (state.walletChain !== chain.id) throw new Error('Switch the wallet to Robinhood Chain before sending a transaction.')
  }
  async function waitForReceipt (hash) {
    for (let attempt = 0; attempt < 120; attempt += 1) {
      const receipt = await state.eip1193.request({ method: 'eth_getTransactionReceipt', params: [hash] })
      if (receipt) return receipt
      await new Promise(function (resolve) { window.setTimeout(resolve, 1000) })
    }
    throw new Error('Timed out waiting for the transaction receipt.')
  }
  // Every write is simulated with its exact calldata, sent through the connected
  // EIP-1193 provider, and only called confirmed once a mined receipt succeeds.
  async function sendExact (title, target, contractInterface, method, args) {
    requireWallet(); if (state.sending) throw new Error('Wait for the pending transaction to finish first.')
    const transaction = { from: state.account, to: target, data: contractInterface.encodeFunctionData(method, args || []) }
    state.sending = true; setStatus('Simulating ' + title + ' with exact calldata…'); render()
    try {
      await state.eip1193.request({ method: 'eth_call', params: [transaction, 'latest'] })
      setStatus('Submitting ' + title + '…'); render()
      const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [transaction] })
      const receipt = await waitForReceipt(hash)
      if (lower(receipt.status) !== '0x1') throw new Error(title + ' reverted on Robinhood Chain.')
      setStatus(title + ' confirmed. Refreshing direct RPC and wallet state…', 'success'); return receipt
    } catch (error) { setStatus(title + ' failed: ' + errText(error), 'error'); throw error } finally { state.sending = false; render() }
  }
  async function ensureApproval (asset, spender, amount, current) {
    if (current && current.gte(amount)) return
    const data = token(asset)
    await sendExact('approval of ' + formatAmount(amount, data.decimals) + ' ' + data.symbol, asset, erc20Interface, 'approve', [spender, amount])
  }
  async function afterTransaction () { await loadFund(); if (state.account) await refreshWallet() }
  function run (note, work) {
    return work().then(function (text) { if (text) note.textContent = text; return afterTransaction() }).catch(function (error) { note.textContent = errText(error) })
  }

  function openStake () {
    const netToken = token(addresses.net); const sNetToken = token(addresses.sNet)
    const wallet = state.wallet || {}
    const fund = state.fund
    const warmup = fund && fund.warmupEpochs > 0 ? ' Staked NET waits ' + fund.warmupEpochs + ' epoch' + (fund.warmupEpochs === 1 ? '' : 's') + ' before it earns.' : ' There is no warmup: sNET starts earning at the next rebase.'
    const content = showDialog('Stake and unstake NET', 'Staking mints sNET one-for-one. sNET rebases every epoch, so its balance grows in place.' + warmup)
    const note = dialogNote(content)
    content.appendChild(e('p', { className: 'netnet-dialog-heading', text: 'Stake NET → sNET' }))
    const stakeAmount = amountRow(content, netToken.symbol + ' to stake', wallet.net, netToken.decimals)
    const stakeActions = e('div', { className: 'netnet-dialog-actions' })
    stakeActions.appendChild(button('[ stake ]', function () {
      run(note, async function () {
        if (fund && !fund.stakingEnabled) throw new Error('Staking is not enabled on the staking contract.')
        const value = parseAmount(stakeAmount, netToken.decimals)
        await ensureApproval(addresses.net, addresses.staking, value, wallet.netToStaking)
        await sendExact('NET stake', addresses.staking, stakingInterface, 'stake', [state.account, value])
        return 'Staked ' + formatAmount(value, netToken.decimals) + ' NET.'
      })
    }))
    content.appendChild(stakeActions)
    content.appendChild(e('p', { className: 'netnet-dialog-heading', text: 'Unstake sNET → NET' }))
    const unstakeAmount = amountRow(content, sNetToken.symbol + ' to unstake', wallet.sNet, sNetToken.decimals)
    const unstakeActions = e('div', { className: 'netnet-dialog-actions' })
    unstakeActions.appendChild(button('[ unstake ]', function () {
      run(note, async function () {
        const value = parseAmount(unstakeAmount, sNetToken.decimals)
        await ensureApproval(addresses.sNet, addresses.staking, value, wallet.sNetToStaking)
        await sendExact('sNET unstake', addresses.staking, stakingInterface, 'unstake', [state.account, value])
        return 'Unstaked ' + formatAmount(value, sNetToken.decimals) + ' sNET.'
      })
    }))
    content.appendChild(unstakeActions)
  }

  // The estimate mirrors the depository's own pricing: payout = quote value in
  // USDG divided by the quoted bond price, where an LP quote is valued exactly
  // as the depository values it rather than at market. The contract's
  // maxPriceWad guard remains the binding check.
  function estimatePayout (market, amount) {
    const fund = state.fund; if (!fund || !Number.isFinite(market.priceUsdg) || market.priceUsdg <= 0) return NaN
    const quoteToken = token(market.quote)
    if (!market.isLp) return asNumber(amount, quoteToken.decimals) / market.priceUsdg
    if (!fund.lpSupply || fund.lpSupply.isZero() || !fund.reserveUsdg || !fund.reserveNet) return NaN
    const share = asNumber(amount, quoteToken.decimals) / asNumber(fund.lpSupply, quoteToken.decimals)
    const usdgSide = asNumber(fund.reserveUsdg, token(addresses.usdg).decimals)
    const netSide = asNumber(fund.reserveNet, token(addresses.net).decimals)
    // The depository values LP the way its own _lpValueWad does: the geometric
    // mean of the two legs, 2*sqrt(usdg * net), with the NET leg held at its
    // 1 USDG floor rather than at market. Valuing that leg at TWAP would
    // overstate an LP bond by more than an order of magnitude, and the floor is
    // also what makes an LP bond accretive to backing in the first place.
    const poolValue = 2 * Math.sqrt(usdgSide * netSide)
    return Number.isFinite(poolValue) ? share * poolValue / market.priceUsdg : NaN
  }

  function openBond (market) {
    const netToken = token(addresses.net); const quoteToken = token(market.quote)
    const wallet = state.wallet || { quotes: new Map() }
    const held = wallet.quotes && wallet.quotes.get(lower(market.quote))
    const floorNote = market.atFloor ? ' This market is priced at the NAV floor, so it carries no discount to market right now.' : ''
    const content = showDialog('Bond ' + quoteToken.symbol + ' for NET', 'Bonds sell NET at max(TWAP − discount, NAV) and vest over a fixed window. Payout is claimed with redeem once it matures.' + floorNote)
    const note = dialogNote(content)
    const amount = amountRow(content, quoteToken.symbol + ' to bond', held ? held.balance : undefined, quoteToken.decimals)
    label(content, 'Max price tolerance % above the quoted bond price')
    const slippage = input(defaultBondSlippage, defaultBondSlippage); content.appendChild(add(e('div', { className: 'netnet-input-row' }), slippage))
    const quoteLine = e('p', { className: 'netnet-quote', text: 'Bond price ' + price(market.priceUsdg) + ' per NET. Enter an amount to estimate the payout.' })
    content.appendChild(quoteLine)
    amount.addEventListener('input', function () {
      try {
        const value = parseAmount(amount, quoteToken.decimals)
        const payout = estimatePayout(market, value)
        quoteLine.textContent = Number.isFinite(payout)
          ? 'Estimated payout about ' + compact(payout, 4) + ' NET at ' + price(market.priceUsdg) + ' per NET. The exact amount is set by the contract at execution.'
          : 'Bond price ' + price(market.priceUsdg) + ' per NET.'
      } catch (_) { quoteLine.textContent = 'Bond price ' + price(market.priceUsdg) + ' per NET.' }
    })
    const actions = e('div', { className: 'netnet-dialog-actions' })
    actions.appendChild(button('[ bond ]', function () {
      run(note, async function () {
        if (!state.bondsEnabled) throw new Error('The bond depository is not enabled.')
        const value = parseAmount(amount, quoteToken.decimals)
        const basisPoints = parseSlippage(slippage)
        // Re-read the price immediately before signing so the ceiling is set
        // against the live quote rather than the last render.
        const fresh = await batch([{ target: addresses.bondDepository, iface: bondInterface, method: 'bondPrice', args: [market.id], fallback: null }])
        if (!fresh[0]) throw new Error('The depository could not quote this market.')
        const maxPriceWad = fresh[0][0].mul(10000 + basisPoints).div(10000)
        await ensureApproval(market.quote, addresses.bondDepository, value, held ? held.allowance : null)
        await sendExact('bond of ' + formatAmount(value, quoteToken.decimals) + ' ' + quoteToken.symbol, addresses.bondDepository, bondInterface, 'deposit', [market.id, value, maxPriceWad, state.account])
        return 'Bond bought. The payout vests and is claimed with redeem.'
      })
    }))
    actions.appendChild(button('[ redeem matured ]', function () {
      run(note, async function () {
        if (state.wallet && state.wallet.claimableNow && state.wallet.claimableNow.isZero()) throw new Error('No matured bond payout to redeem.')
        await sendExact('bond redemption', addresses.bondDepository, bondInterface, 'redeem', [state.account])
        return 'Matured NET redeemed to the wallet.'
      })
    }))
    content.appendChild(actions)
    content.appendChild(e('p', { className: 'netnet-dialog-heading', text: 'Wallet ' + formatAmount(held ? held.balance : zeroBn, quoteToken.decimals) + ' ' + quoteToken.symbol + ' · pending ' + formatAmount(wallet.pendingTotal, netToken.decimals) + ' NET · claimable ' + formatAmount(wallet.claimableNow, netToken.decimals) + ' NET' }))
  }

  function openSell () {
    const netToken = token(addresses.net); const usdgToken = token(addresses.usdg)
    const wallet = state.wallet || {}; const buyback = state.buyback
    const content = showDialog('Sell NET to the buyback', 'The inverse bond bids for NET at NAV less its spread and burns what it buys. It fills only while the epoch has capacity left.')
    const note = dialogNote(content)
    const amount = amountRow(content, 'NET to sell', wallet.net, netToken.decimals)
    label(content, 'Slippage % below the quoted bid')
    const slippage = input(defaultSellSlippage, defaultSellSlippage); content.appendChild(add(e('div', { className: 'netnet-input-row' }), slippage))
    const quoteLine = e('p', { className: 'netnet-quote', text: 'Bid ' + price(buyback ? buyback.priceUsdg : NaN) + ' per NET. Enter an amount to estimate proceeds.' })
    content.appendChild(quoteLine)
    amount.addEventListener('input', function () {
      try {
        const value = parseAmount(amount, netToken.decimals)
        const proceeds = asNumber(value, netToken.decimals) * (buyback ? buyback.priceUsdg : NaN)
        quoteLine.textContent = Number.isFinite(proceeds) ? 'Estimated proceeds about ' + usd(proceeds) + ' USDG before slippage.' : 'Bid unavailable.'
      } catch (_) { quoteLine.textContent = 'Bid ' + price(buyback ? buyback.priceUsdg : NaN) + ' per NET.' }
    })
    const actions = e('div', { className: 'netnet-dialog-actions' })
    actions.appendChild(button('[ sell to buyback ]', function () {
      run(note, async function () {
        if (!buyback || !buyback.active) throw new Error('The inverse bond is not active.')
        const value = parseAmount(amount, netToken.decimals)
        const basisPoints = parseSlippage(slippage)
        const fresh = await batch([{ target: addresses.inverseBond, iface: inverseInterface, method: 'price', fallback: null }])
        if (!fresh[0]) throw new Error('The inverse bond could not quote a bid.')
        // Proceeds in USDG raw units: netRaw * priceWad * 10^usdgDecimals
        // divided by 10^netDecimals and by one WAD, then reduced by tolerance.
        const scale = ethers.BigNumber.from(10).pow(usdgToken.decimals)
        const netScale = ethers.BigNumber.from(10).pow(netToken.decimals)
        const expected = value.mul(fresh[0][0]).mul(scale).div(netScale).div(wad)
        const minOut = expected.mul(10000 - basisPoints).div(10000)
        if (minOut.lte(0)) throw new Error('The amount is too small to quote a minimum payout.')
        await ensureApproval(addresses.net, addresses.inverseBond, value, wallet.netToInverse)
        await sendExact('buyback sale of ' + formatAmount(value, netToken.decimals) + ' NET', addresses.inverseBond, inverseInterface, 'swap', [value, minOut])
        return 'Sold to the buyback for at least ' + formatAmount(minOut, usdgToken.decimals) + ' USDG.'
      })
    }))
    content.appendChild(actions)
  }

  function renderWallet () {
    const node = byId('netnet-wallet-status'); const connect = byId('netnet-connect'); const other = byId('netnet-other-wallet'); const rebase = byId('netnet-rebase')
    if (!node || !connect || !other) return
    const injected = injectedWallet()
    connect.disabled = state.sending || state.walletLoading || !injected
    other.disabled = state.sending || state.walletLoading
    if (rebase) {
      // rebase() is permissionless; it only does anything once the epoch ends.
      const due = state.fund && state.fund.epochEnd > 0 && nowSeconds() >= state.fund.epochEnd
      rebase.hidden = !state.account
      rebase.disabled = state.sending || state.walletLoading || !due
      rebase.textContent = due ? '[ trigger rebase ]' : '[ rebase not due ]'
    }
    node.textContent = !state.account ? '' : state.walletChain === chain.id ? short(state.account) : short(state.account) + ' · wrong chain'
  }

  function renderOverview () {
    const node = byId('netnet-overview'); const fund = state.fund; if (!node || !fund) return
    const parts = []
    parts.push('NET ' + price(fund.twapUsdg))
    parts.push('NAV ' + price(fund.navUsdg))
    parts.push('premium ' + multiple(fund.premium))
    parts.push('dividend ' + percent(fund.rate * 100, 3) + '/epoch')
    parts.push('APY ' + percent(fund.apy, 2))
    parts.push('staked ' + percent(fund.stakedShare))
    if (fund.epochEnd > 0) parts.push('epoch ' + (fund.epochNumber === null ? '' : fund.epochNumber + ' ') + 'ends in ' + duration(fund.epochEnd - nowSeconds()))
    node.hidden = false; node.textContent = parts.join(' · ')
  }

  // Reference point for the growth rate. Amounts arrive as exact decimal
  // strings; percentages as numbers. A horizon without enough history yet is
  // null rather than zero, and the array is empty until the series is populated.
  async function loadGrowth () {
    // Plain AbortController rather than AbortSignal.timeout: babel transpiles
    // syntax, not runtime APIs, and this page should not need a modern browser
    // to render a number.
    const controller = new AbortController()
    const timer = window.setTimeout(function () { controller.abort() }, 12000)
    let rows
    try {
      const response = await fetch('https://api.vfat.io/v4/netnet-treasury?chainId=' + chain.number, { signal: controller.signal })
      if (!response.ok) throw new Error('History unavailable (' + response.status + ')')
      rows = await response.json()
    } finally {
      window.clearTimeout(timer)
    }
    const row = Array.isArray(rows)
      ? rows.find(function (entry) { return lower(entry.stakingAddress) === lower(addresses.staking) }) || rows[0]
      : null
    const horizon = row && row.changes ? row.changes['24h'] : null
    if (!horizon || !horizon.backingPerToken) return null
    const reference = Number(horizon.backingPerToken.reference)
    const since = Date.parse(horizon.referenceTimestamp)
    if (!Number.isFinite(reference) || reference <= 0 || !Number.isFinite(since)) return null
    return { reference: reference, since: since, epoch: horizon.referenceEpoch }
  }

  // Measured against the page's own live reading rather than the stored pair, so
  // the number is as current as everything else on the page. The window is
  // reported as measured: the fund moves on 8h epochs, so the newest point at or
  // before 24h ago can be several hours older than 24h, and claiming "24h" for a
  // 26h window would be a small lie in a figure people size positions on.
  function backingGrowth (fund) {
    const growth = state.growth
    if (!growth || !Number.isFinite(fund.navUsdg) || fund.navUsdg <= 0) return ''
    const elapsed = (Date.now() - growth.since) / 1000
    // The fund only moves on an 8h boundary, so the newest point at or before
    // 24h ago is legitimately up to ~32h old. Much beyond that means the series
    // has stalled, and a multi-day change presented next to a daily figure
    // misleads more than showing nothing does.
    if (!(elapsed > 0) || elapsed > 48 * 3600) return ''
    const change = (fund.navUsdg / growth.reference - 1) * 100
    const sign = change > 0 ? '+' : ''
    return sign + percent(change, 2) + ' over ' + duration(elapsed) +
      (growth.epoch === undefined || growth.epoch === null ? '' : ', since epoch ' + growth.epoch)
  }

  function metricRow (body, name, value, detail) {
    const row = e('tr')
    row.appendChild(e('td', { text: name }))
    row.appendChild(e('td', { text: value }))
    row.appendChild(e('td', { className: 'netnet-detail', text: detail || '' }))
    body.appendChild(row)
  }
  function renderFund () {
    const host = byId('netnet-fund'); const fund = state.fund; if (!host) return
    host.textContent = ''
    if (!fund) { if (!state.loading) host.appendChild(e('pre', { text: 'The fund state could not be read.' })); return }
    const netToken = token(addresses.net)
    const table = e('table', { className: 'netnet-table netnet-metric-table' })
    const head = e('thead'); const header = e('tr');
    ['Fund', 'Value', 'Basis'].forEach(function (name) { header.appendChild(e('th', { text: name })) })
    head.appendChild(header); table.appendChild(head)
    const body = e('tbody')
    metricRow(body, 'NET price (TWAP)', price(fund.twapUsdg), 'oracle over the NET/USDG pair, ' + duration(asNumber(fund.twapMinWindow, 0)) + '–' + duration(asNumber(fund.twapMaxWindow, 0)) + ' window')
    metricRow(body, 'NET price (spot)', price(fund.spotUsdg), 'live reserves of the canonical pair')
    const navGrowth = backingGrowth(fund)
    metricRow(body, 'Backing per NET (NAV)', price(fund.navUsdg),
      navGrowth ? 'treasury RFV divided by NET supply · ' + navGrowth : 'treasury RFV divided by NET supply')
    metricRow(body, 'Premium to NAV', multiple(fund.premium), Number.isFinite(fund.k) ? 'dividend reaches its maximum at ' + multiple(fund.k) : '')
    metricRow(body, 'Dividend rate', percent(fund.rate * 100, 3) + ' per epoch', Number.isFinite(fund.rMax) ? 'maximum ' + percent(fund.rMax * 100, 3) + ' per epoch' : '')
    metricRow(body, 'Annualized (APY)', percent(fund.apy, 2), Number.isFinite(fund.epochsPerYear) ? 'compounding ' + Math.round(fund.epochsPerYear) + ' rebases a year' : '')
    metricRow(body, 'Next distribution', formatAmount(fund.nextReward, netToken.decimals) + ' NET', fund.epochEnd > 0 ? 'epoch ' + (fund.epochNumber || '—') + ' ends ' + dateText(fund.epochEnd) : '')
    metricRow(body, 'sNET index', formatAmount(fund.index, netToken.decimals), 'cumulative rebase growth since launch')
    metricRow(body, 'NET supply', compact(fund.supply) + ' NET', 'market cap ' + usd(fund.marketCap))
    metricRow(body, 'Staked', compact(fund.staked) + ' NET', percent(fund.stakedShare) + ' of supply')
    metricRow(body, 'Treasury RFV', usd(fund.rfvUsdg), 'risk-free value backing NET')
    metricRow(body, 'Liquid USDG', usd(fund.liquidUsdgValue), 'held directly by the treasury')
    metricRow(body, 'Morpho USDG', usd(fund.morphoUsdgValue), Number.isFinite(asNumber(fund.morphoCapBps, 0)) ? 'deployed to Morpho, cap ' + percent(asNumber(fund.morphoCapBps, 0) / 100) + ' of reserves' : '')
    metricRow(body, 'Pair liquidity', usd(fund.poolUsdg), 'canonical NET/USDG pair, both sides')
    if (fund.taxEnabled && Number.isFinite(asNumber(fund.taxTotalBps, 0))) {
      const exempt = [fund.stakingExempt ? 'staking' : null, fund.bondExempt ? 'bonding' : null, fund.inverseExempt ? 'buyback' : null].filter(Boolean)
      metricRow(body, 'Transfer tax', percent(asNumber(fund.taxTotalBps, 0) / 100), 'charged on the canonical pair' + (exempt.length ? '; ' + exempt.join(', ') + ' exempt' : ''))
    }
    table.appendChild(body); host.appendChild(table)
  }

  function renderStaking () {
    const host = byId('netnet-staking'); if (!host) return
    host.textContent = ''
    const fund = state.fund; const netToken = token(addresses.net); const sNetToken = token(addresses.sNet)
    if (!state.account) { host.appendChild(e('pre', { text: 'Connect a wallet to stake NET, bond, or sell to the buyback.' })); return }
    if (state.walletChain !== chain.id) { host.appendChild(e('pre', { text: 'Switch the wallet to Robinhood Chain to see balances and act.' })); return }
    const wallet = state.wallet
    if (!wallet) { host.appendChild(e('pre', { text: state.walletLoading ? 'Reading wallet balances…' : 'No wallet balances were read.' })); return }
    const table = e('table', { className: 'netnet-table netnet-wallet-table' })
    const head = e('thead'); const header = e('tr');
    ['Your position', 'Amount', 'Value', 'Actions'].forEach(function (name) { header.appendChild(e('th', { text: name })) })
    head.appendChild(header); table.appendChild(head)
    const body = e('tbody')
    const marketValue = function (amount, decimals) { return fund && Number.isFinite(fund.twapUsdg) ? asNumber(amount, decimals) * fund.twapUsdg : NaN }
    const rows = [
      { name: 'NET', amount: wallet.net, decimals: netToken.decimals, value: marketValue(wallet.net, netToken.decimals) },
      { name: 'sNET (staked)', amount: wallet.sNet, decimals: sNetToken.decimals, value: marketValue(wallet.sNet, sNetToken.decimals) },
      { name: 'USDG', amount: wallet.usdg, decimals: token(addresses.usdg).decimals, value: asNumber(wallet.usdg, token(addresses.usdg).decimals) }
    ]
    rows.forEach(function (entry) {
      const row = e('tr')
      row.appendChild(e('td', { text: entry.name }))
      row.appendChild(e('td', { text: formatAmount(entry.amount, entry.decimals) }))
      row.appendChild(e('td', { text: usd(entry.value) }))
      const actionCell = e('td', { className: 'netnet-actions' })
      if (entry.name === 'NET') {
        actionCell.appendChild(button('[ stake ]', function () { try { requireWallet(); openStake() } catch (error) { setStatus(errText(error), 'error') } }, state.sending))
        actionCell.appendChild(button('[ sell ]', function () { try { requireWallet(); openSell() } catch (error) { setStatus(errText(error), 'error') } }, state.sending || !state.buyback || !state.buyback.active))
      } else if (entry.name === 'sNET (staked)') {
        actionCell.appendChild(button('[ unstake ]', function () { try { requireWallet(); openStake() } catch (error) { setStatus(errText(error), 'error') } }, state.sending))
      }
      row.appendChild(actionCell); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function renderBonds () {
    const host = byId('netnet-bonds'); if (!host) return
    host.textContent = ''
    const fund = state.fund; const netToken = token(addresses.net)
    if (!state.markets.length) { if (!state.loading) host.appendChild(e('pre', { text: 'The depository reports no bond markets.' })); return }
    const table = e('table', { className: 'netnet-table netnet-bond-table' })
    const head = e('thead'); const header = e('tr');
    ['Series', 'Quote', 'Bond price', 'Discount', 'Actions'].forEach(function (name) { header.appendChild(e('th', { text: name })) })
    head.appendChild(header); table.appendChild(head)
    const body = e('tbody')
    // Payout is metered per epoch against a cap set as a fraction of supply.
    const cap = fund && Number.isFinite(fund.supply) ? fund.supply * bondEpochCapFraction : NaN
    const paid = asNumber(state.bondPaidThisEpoch, netToken.decimals)
    const remaining = Number.isFinite(cap) && Number.isFinite(paid) ? Math.max(0, cap - paid) : NaN
    state.markets.forEach(function (market) {
      const quoteToken = token(market.quote)
      const row = e('tr')
      const seriesCell = e('td')
      add(seriesCell, e('span', { className: 'netnet-name', text: market.label }), e('span', { className: 'netnet-kind', text: market.atFloor ? 'at NAV floor' : '' }))
      row.appendChild(seriesCell)
      row.appendChild(e('td', { text: quoteToken.symbol }))
      row.appendChild(e('td', { text: price(market.priceUsdg) }))
      row.appendChild(e('td', { text: market.atFloor ? '—' : percent(market.discount) }))
      const actionCell = e('td', { className: 'netnet-actions' })
      actionCell.appendChild(button('[ bond ]', function () { try { requireWallet(); openBond(market) } catch (error) { setStatus(errText(error), 'error') } }, state.sending || !state.bondsEnabled))
      row.appendChild(actionCell); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
    const capNote = e('p', { className: 'netnet-note' })
    capNote.textContent = Number.isFinite(cap)
      ? 'Payout across all series is capped at ' + compact(cap, 2) + ' NET per epoch (' + percent(bondEpochCapFraction * 100, 2) + ' of supply). '
        + (Number.isFinite(paid) ? compact(paid, 2) + ' NET paid so far this epoch, ' + compact(remaining, 2) + ' NET left.' : 'The amount already paid this epoch could not be read.')
      : 'Bond payout is metered per epoch by the depository.'
    host.appendChild(capNote)
  }

  function renderNotes () {
    const section = byId('netnet-notes-section'); const host = byId('netnet-notes'); if (!section || !host) return
    section.hidden = !state.account || state.walletChain !== chain.id
    host.textContent = ''
    if (section.hidden) return
    const netToken = token(addresses.net); const wallet = state.wallet
    const open = state.notes.filter(function (note) { return note.payout.gt(note.claimed) })
    const summary = e('p', { className: 'netnet-note' })
    summary.textContent = wallet && wallet.pendingTotal
      ? 'Pending ' + formatAmount(wallet.pendingTotal, netToken.decimals) + ' NET · claimable now ' + formatAmount(wallet.claimableNow, netToken.decimals) + ' NET'
      : 'No bond notes were read for this wallet.'
    host.appendChild(summary)
    if (!open.length) {
      host.appendChild(e('pre', { text: state.walletLoading ? 'Reading bond notes…' : 'No open bond notes in this wallet.' }))
      return
    }
    const table = e('table', { className: 'netnet-table netnet-note-table' })
    const head = e('thead'); const header = e('tr');
    ['Note', 'Payout', 'Claimed', 'Vests', 'Actions'].forEach(function (name) { header.appendChild(e('th', { text: name })) })
    head.appendChild(header); table.appendChild(head)
    const body = e('tbody'); const now = nowSeconds()
    open.forEach(function (note) {
      const row = e('tr')
      row.appendChild(e('td', { text: '#' + note.id }))
      row.appendChild(e('td', { text: formatAmount(note.payout, netToken.decimals) + ' NET' }))
      row.appendChild(e('td', { text: formatAmount(note.claimed, netToken.decimals) + ' NET' }))
      row.appendChild(e('td', { text: note.end <= now ? 'fully vested' : 'until ' + dateText(note.end) + ' (' + duration(note.end - now) + ')' }))
      const actionCell = e('td', { className: 'netnet-actions' })
      // redeem() pays every matured note at once, so the row action is the
      // same call regardless of which note it sits on.
      actionCell.appendChild(button('[ redeem ]', function () {
        redeemAll().catch(function (error) { setStatus(errText(error), 'error') })
      }, state.sending || !wallet || !wallet.claimableNow || wallet.claimableNow.isZero()))
      row.appendChild(actionCell); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }
  async function redeemAll () {
    requireWallet()
    if (state.wallet && state.wallet.claimableNow && state.wallet.claimableNow.isZero()) throw new Error('No matured bond payout to redeem.')
    await sendExact('bond redemption', addresses.bondDepository, bondInterface, 'redeem', [state.account])
    await afterTransaction()
  }

  function renderBuyback () {
    const host = byId('netnet-buyback'); const buyback = state.buyback; if (!host) return
    host.textContent = ''
    if (!buyback) { if (!state.loading) host.appendChild(e('pre', { text: 'The inverse bond state could not be read.' })); return }
    const fund = state.fund
    const table = e('table', { className: 'netnet-table netnet-metric-table' })
    const head = e('thead'); const header = e('tr');
    ['Buyback', 'Value', 'Basis'].forEach(function (name) { header.appendChild(e('th', { text: name })) })
    head.appendChild(header); table.appendChild(head)
    const body = e('tbody')
    metricRow(body, 'Status', buyback.active ? 'active' : 'inactive', 'the inverse bond burns the NET it buys')
    metricRow(body, 'Bid per NET', price(buyback.priceUsdg), Number.isFinite(buyback.spreadBps) ? 'NAV less a ' + percent(buyback.spreadBps / 100) + ' spread' : '')
    metricRow(body, 'Capacity left', usd(buyback.capacityUsdg), 'USDG the buyback can still spend this epoch')
    if (fund && Number.isFinite(fund.twapUsdg) && Number.isFinite(buyback.priceUsdg)) {
      metricRow(body, 'Bid versus market', percent((buyback.priceUsdg / fund.twapUsdg - 1) * 100), buyback.priceUsdg < fund.twapUsdg ? 'the market pays more than the buyback' : 'the buyback bids above the market')
    }
    table.appendChild(body); host.appendChild(table)
  }

  function bindEvents () {
    const connect = byId('netnet-connect'); const other = byId('netnet-other-wallet'); const rebase = byId('netnet-rebase')
    if (connect) connect.addEventListener('click', function () { connectWallet().catch(function (error) { setStatus(errText(error), 'error') }) })
    if (other) other.addEventListener('click', function () { connectReown().catch(function (error) { setStatus(errText(error), 'error') }) })
    if (rebase) {
      rebase.addEventListener('click', function () {
        sendExact('epoch rebase', addresses.staking, stakingInterface, 'rebase', [])
          .then(afterTransaction)
          .catch(function (error) { setStatus(errText(error), 'error') })
      })
    }
  }
  function render () { renderWallet(); renderOverview(); renderFund(); renderStaking(); renderBonds(); renderNotes(); renderBuyback() }
  async function start () {
    state.rpc = new ethers.providers.StaticJsonRpcProvider(chain.rpc, { chainId: chain.number, name: 'robinhood' })
    bindEvents(); window.addEventListener('pagehide', clearWalletEvents, { once: true }); render()
    const wallet = passiveWallet()
    await loadFund()
    await wallet
    if (state.account) await refreshWallet()
  }
  function fatal (error) { console.error(error); setLoading(); setStatus(errText(error), 'error'); render() }
  return { start: start, fatal: fatal }
})()
