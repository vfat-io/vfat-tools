/* Alandale on Robinhood Chain: official RPC reads and direct EIP-1193 writes only. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { Alandale.start().catch(Alandale.fatal) })

const Alandale = (function () {
  const chain = { id: '0x1237', number: 4663, name: 'Robinhood Chain', rpc: 'https://rpc.mainnet.chain.robinhood.com' }
  // Canonical Robinhood deployment identifiers taken from the official
  // Alandale app. Everything displayed below is read afresh over the official
  // RPC; these values are never used as an app API or a static farm list.
  const addresses = {
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11',
    voter: '0x4cF1c47B95031cD2bb1d102021D8Ede60392971C',
    pairFactory: '0xe0799417eff30A12249b8c30941BC2d7c52A0339',
    routerV2: '0xB90b0E114a32a3dA7b61D5eaae7D35Af9B1B5582',
    algebraFactory: '0x16494A80E08Bcb9285D87b67149d7b01774D82F8',
    positionManager: '0xe62a5F67516dBDBA2Aa28b1512C8Ff44E42cB5c3',
    lute: '0xD1e861CC5Eee7eA88649206b74504D78CCD7AEeA',
    usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168'
  }
  const voterAbi = [
    'function poolsCounts() view returns(uint256 totalCount,uint256 v2PoolsCount,uint256 v3PoolsCount)', 'function pools(uint256) view returns(address)',
    'function poolToGauge(address) view returns(address)', 'function getGaugeState(address) view returns(bool isGauge,bool isAlive,address internalBribe,address externalBribe,address pool,uint256 claimable,uint256 index,uint256 lastDistributionTimestamp)',
    'function claimRewards(address[])'
  ]
  const factoryAbi = ['function allPairsLength() view returns(uint256)', 'function allPairs(uint256) view returns(address)']
  const erc20Abi = ['function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)']
  const v2PairAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function stable() view returns(bool)', 'function getReserves() view returns(uint112,uint112,uint32)', 'function totalSupply() view returns(uint256)']
  const v2RouterAbi = [
    'function addLiquidity(address tokenA,address tokenB,bool stable,uint256 amountADesired,uint256 amountBDesired,uint256 amountAMin,uint256 amountBMin,address to,uint256 deadline) returns(uint256,uint256,uint256)',
    'function removeLiquidity(address tokenA,address tokenB,bool stable,uint256 liquidity,uint256 amountAMin,uint256 amountBMin,address to,uint256 deadline) returns(uint256,uint256)'
  ]
  const v3PoolAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function globalState() view returns(uint160 price,int24 tick,uint16 lastFee,uint8 pluginConfig,uint16 communityFee,bool unlocked)', 'function tickSpacing() view returns(int24)']
  const gaugeAbi = ['function deposit(uint256)', 'function withdraw(uint256)', 'function getReward(address)', 'function balanceOf(address) view returns(uint256)', 'function totalSupply() view returns(uint256)', 'function earned(address) view returns(uint256)', 'function rewardRate() view returns(uint256)']
  const managerAbi = [
    'function balanceOf(address) view returns(uint256)', 'function tokenOfOwnerByIndex(address,uint256) view returns(uint256)', 'function getApproved(uint256) view returns(address)', 'function isApprovedForAll(address,address) view returns(bool)', 'function approve(address,uint256)',
    'function positions(uint256) view returns(uint88 nonce,address operator,address token0,address token1,int24 tickLower,int24 tickUpper,uint128 liquidity,uint256 feeGrowthInside0LastX128,uint256 feeGrowthInside1LastX128,uint128 tokensOwed0,uint128 tokensOwed1)',
    'function mint((address token0,address token1,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline)) payable returns(uint256 tokenId,uint128 liquidity,uint256 amount0,uint256 amount1)',
    'function increaseLiquidity((uint256 tokenId,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns(uint128 liquidity,uint256 amount0,uint256 amount1)',
    'function decreaseLiquidity((uint256 tokenId,uint128 liquidity,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns(uint256 amount0,uint256 amount1)',
    'function collect((uint256 tokenId,address recipient,uint128 amount0Max,uint128 amount1Max)) payable returns(uint256 amount0,uint256 amount1)', 'function burn(uint256) payable'
  ]
  const multicallAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const zero = ethers.constants.AddressZero.toLowerCase()
  const max128 = ethers.BigNumber.from(2).pow(128).sub(1)
  const Q96 = Math.pow(2, 96)
  const secondsPerWeek = 7 * 24 * 60 * 60
  // The existing vfat.io AppKit project is intentionally referenced only by
  // connectReown(), whose config module is dynamically imported after intent.
  const reownProjectId = process.env.REOWN_PROJECT_ID || '3e6154a7158ff5f7509f24405fc3b551'
  const state = {
    rpc: null, eip1193: null, walletSource: null, account: null, walletChain: null, walletListenerCleanup: [], reownUnsubscribe: null, farms: [], farmByPool: new Map(), farmByGauge: new Map(), tokens: new Map(), prices: new Map(),
    voterCounts: null, factoryPairs: [], factoryOnlyPairs: [],
    showZeroApr: false, loading: false, loadingText: '', status: '', statusType: '', walletLoading: false, sending: false, positions: [], walletTokenBalances: new Map(), action: null
  }

  const byId = function (id) { return document.getElementById(id) }
  const lower = function (address) { return String(address || '').toLowerCase() }
  const same = function (left, right) { return lower(left) === lower(right) }
  const clean = function (value, length) { return String(value || '—').replace(/[\r\n|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, length || 44) || '—' }
  const short = function (address) { return address ? address.slice(0, 6) + '…' + address.slice(-4) : '—' }
  const isZero = function (address) { return !address || lower(address) === zero }
  const injectedWallet = function () { return window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null }
  const deadline = function () { return Math.floor(Date.now() / 1000) + 1200 }
  const errText = function (error) { return String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').slice(0, 500) }
  const asNumber = function (amount, decimals) {
    if (amount === undefined || amount === null || decimals === undefined || decimals === null) return NaN
    const value = Number(ethers.utils.formatUnits(amount, decimals))
    return Number.isFinite(value) ? value : NaN
  }
  const formatAmount = function (amount, decimals, digits) {
    if (amount === undefined || amount === null) return '—'
    const parts = ethers.utils.formatUnits(amount, decimals).split('.')
    const fraction = (parts[1] || '').slice(0, digits === undefined ? 5 : digits).replace(/0+$/, '')
    return fraction ? parts[0] + '.' + fraction : parts[0]
  }
  const usd = function (value) {
    if (!Number.isFinite(value) || value < 0) return '—'
    if (value >= 1000000) return '$' + (value / 1000000).toFixed(2) + 'm'
    if (value >= 1000) return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 })
    if (value >= 1) return '$' + value.toFixed(2)
    if (value > 0) return '$' + value.toPrecision(3)
    return '$0.00'
  }
  const compact = function (value) { if (!Number.isFinite(value) || value < 0) return '—'; if (value >= 1000000000) return (value / 1000000000).toFixed(2) + 'b'; if (value >= 1000000) return (value / 1000000).toFixed(2) + 'm'; if (value >= 1000) return (value / 1000).toFixed(2) + 'k'; if (value >= 1) return value.toFixed(2); return value > 0 ? value.toPrecision(3) : '0' }
  const percent = function (value) { return Number.isFinite(value) && value >= 0 ? value.toFixed(value >= 1000 ? 0 : 2) + '%' : '—' }
  const iface = function (abi) { return new ethers.utils.Interface(abi) }
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
  const button = function (text, handler, disabled) { const node = e('button', { text: text, className: 'alandale-action-button', type: 'button', disabled: disabled }); node.addEventListener('click', handler); return node }
  const input = function (value, placeholder) { const node = e('input'); node.type = 'text'; node.inputMode = 'decimal'; node.autocomplete = 'off'; node.value = value || ''; node.placeholder = placeholder || '0.0'; return node }

  function setStatus (text, type) { state.status = text || ''; state.statusType = type || ''; const node = byId('alandale-status'); if (node) { node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = state.statusType } }
  function setLoading (text) { state.loading = !!text; state.loadingText = text || ''; const node = byId('alandale-loading'); const label = byId('alandale-loading-text'); if (node) node.hidden = !text; if (label && text) label.textContent = text }
  function token (address) { return state.tokens.get(lower(address)) || { address: address, symbol: short(address), decimals: 18 } }
  function price (address) { return state.prices.get(lower(address)) }
  function tokenValue (amount, address) { const data = token(address); const current = price(address); const number = asNumber(amount, data.decimals); return Number.isFinite(number) && Number.isFinite(current) ? number * current : NaN }

  // The page never performs one HTTP request per card. Every independent
  // phase is deduplicated, chunked below the RPC payload limit, and read from
  // the canonical Multicall3 contract. Failure is local to one optional call.
  async function batch (calls) {
    const results = []
    const deduped = new Map()
    calls.forEach(function (call, index) {
      const callIface = call.iface || iface(call.abi)
      const data = callIface.encodeFunctionData(call.method, call.args || [])
      const id = lower(call.target) + ':' + data
      if (!deduped.has(id)) deduped.set(id, { call: Object.assign({}, call, { iface: callIface }), indexes: [] })
      deduped.get(id).indexes.push(index)
    })
    const entries = Array.from(deduped.values())
    for (let cursor = 0; cursor < entries.length; cursor += 320) {
      const slices = [entries.slice(cursor, cursor + 160), entries.slice(cursor + 160, cursor + 320)].filter(function (slice) { return slice.length })
      const groups = await Promise.all(slices.map(aggregateSlice))
      groups.forEach(function (decoded, groupIndex) {
        const slice = slices[groupIndex]
        decoded.forEach(function (reply, offset) {
          const entry = slice[offset]; let value = entry.call.fallback
          if (reply.success) {
            try { value = entry.call.iface.decodeFunctionResult(entry.call.method, reply.returnData) } catch (_) {}
          }
          entry.indexes.forEach(function (index) { results[index] = value })
        })
      })
    }
    return results
  }

  async function aggregateSlice (slice) {
    const multicallInterface = iface(multicallAbi)
    const data = multicallInterface.encodeFunctionData('aggregate3', [slice.map(function (entry) { return { target: entry.call.target, allowFailure: true, callData: entry.call.iface.encodeFunctionData(entry.call.method, entry.call.args || []) } })])
    let lastError
    // The Robinhood RPC occasionally closes a large eth_call response. Retry
    // the exact Multicall payload first, then make progress with two smaller
    // Multicall calls. No direct per-contract fallback is used.
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

  function clearProviderListeners () {
    state.walletListenerCleanup.forEach(function (cleanup) { cleanup() })
    state.walletListenerCleanup = []
  }
  function clearReownSubscription () {
    if (state.reownUnsubscribe) state.reownUnsubscribe()
    state.reownUnsubscribe = null
  }
  function clearWalletEvents () { clearProviderListeners(); clearReownSubscription() }
  function bindProviderEvents (provider) {
    clearProviderListeners()
    if (!provider || typeof provider.on !== 'function') return
    const accountsChanged = function (accounts) {
      if (state.eip1193 !== provider) return
      state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
      if (!state.account) { state.positions = []; state.walletTokenBalances = new Map(); render(); return }
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
      // Startup is intentionally limited to the injected provider's passive
      // account and chain reads. Reown is neither imported nor probed here.
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
    // This dynamic import is the only path that loads the established AppKit
    // and WalletConnect code. It is never present in the first-load waterfall.
    const reown = await import('./config.js')
    const appKit = reown.createAppKitInstance(reownProjectId)
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

  async function loadRegistry () {
    setLoading('Reading Alandale farms…'); render()
    const voterInterface = iface(voterAbi); const factoryInterface = iface(factoryAbi)
    const overview = await batch([
      { target: addresses.voter, iface: voterInterface, method: 'poolsCounts', fallback: [ethers.constants.Zero, ethers.constants.Zero, ethers.constants.Zero] },
      { target: addresses.pairFactory, iface: factoryInterface, method: 'allPairsLength', fallback: [ethers.constants.Zero] }
    ])
    state.voterCounts = overview[0]; const voterLength = overview[0][0].toNumber(); const pairLength = overview[1][0].toNumber()
    setLoading('Enumerating all ' + voterLength + ' voter pools and all ' + pairLength + ' V2 factory pairs…'); render()
    const registryCalls = []
    for (let index = 0; index < voterLength; index += 1) registryCalls.push({ target: addresses.voter, iface: voterInterface, method: 'pools', args: [index], fallback: [ethers.constants.AddressZero] })
    for (let index = 0; index < pairLength; index += 1) registryCalls.push({ target: addresses.pairFactory, iface: factoryInterface, method: 'allPairs', args: [index], fallback: [ethers.constants.AddressZero] })
    const registry = await batch(registryCalls)
    const voterPools = registry.slice(0, voterLength).map(function (result) { return result[0] }).filter(function (address) { return !isZero(address) })
    state.factoryPairs = registry.slice(voterLength).map(function (result) { return result[0] }).filter(function (address) { return !isZero(address) })
    const voterSet = new Set(voterPools.map(lower)); state.factoryOnlyPairs = state.factoryPairs.filter(function (address) { return !voterSet.has(lower(address)) })
    state.farms = voterPools.map(function (pool, index) { return { pool: pool, registryIndex: index, gauge: null, kind: '…', alive: false, isGauge: false, positions: [], gaugeNftCount: 0 } })
    state.farmByPool = new Map(state.farms.map(function (farm) { return [lower(farm.pool), farm] }))
    await hydrateFarms()
  }

  async function hydrateFarms () {
    setLoading('Reading pool, gauge, balance, and reward state…'); render()
    const voterInterface = iface(voterAbi); const pairInterface = iface(v2PairAbi); const algebraInterface = iface(v3PoolAbi); const gaugeInterface = iface(gaugeAbi); const erc20Interface = iface(erc20Abi)
    const calls = []
    state.farms.forEach(function (farm) {
      calls.push({ target: addresses.voter, iface: voterInterface, method: 'poolToGauge', args: [farm.pool], fallback: [ethers.constants.AddressZero] })
      calls.push({ target: farm.pool, iface: pairInterface, method: 'token0', fallback: [ethers.constants.AddressZero] })
      calls.push({ target: farm.pool, iface: pairInterface, method: 'token1', fallback: [ethers.constants.AddressZero] })
      calls.push({ target: farm.pool, iface: pairInterface, method: 'stable', fallback: [false] })
      calls.push({ target: farm.pool, iface: pairInterface, method: 'getReserves', fallback: null })
      calls.push({ target: farm.pool, iface: pairInterface, method: 'totalSupply', fallback: [ethers.constants.Zero] })
      calls.push({ target: farm.pool, iface: algebraInterface, method: 'globalState', fallback: null })
      calls.push({ target: farm.pool, iface: algebraInterface, method: 'tickSpacing', fallback: [ethers.constants.Zero] })
    })
    const initial = await batch(calls); let cursor = 0
    state.farms.forEach(function (farm) {
      farm.gauge = initial[cursor++][0]; farm.token0 = initial[cursor++][0]; farm.token1 = initial[cursor++][0]; farm.stable = Boolean(initial[cursor++][0]); farm.reserves = initial[cursor++]; farm.lpSupply = initial[cursor++][0]; farm.globalState = initial[cursor++]; farm.tickSpacing = initial[cursor++][0]
      farm.kind = farm.reserves ? 'V2 LP' : farm.globalState ? 'CL / V3' : 'Unknown'
    })
    state.farmByGauge = new Map(state.farms.map(function (farm) { return [lower(farm.gauge), farm] }))
    const detailCalls = []
    state.farms.forEach(function (farm) {
      detailCalls.push({ target: addresses.voter, iface: voterInterface, method: 'getGaugeState', args: [farm.gauge], fallback: null })
      detailCalls.push({ target: farm.token0, iface: erc20Interface, method: 'balanceOf', args: [farm.pool], fallback: [ethers.constants.Zero] })
      detailCalls.push({ target: farm.token1, iface: erc20Interface, method: 'balanceOf', args: [farm.pool], fallback: [ethers.constants.Zero] })
      detailCalls.push({ target: farm.pool, iface: erc20Interface, method: 'balanceOf', args: [farm.gauge], fallback: [ethers.constants.Zero] })
      detailCalls.push({ target: farm.gauge, iface: gaugeInterface, method: 'totalSupply', fallback: [ethers.constants.Zero] })
      detailCalls.push({ target: farm.gauge, iface: gaugeInterface, method: 'rewardRate', fallback: [ethers.constants.Zero] })
    })
    const details = await batch(detailCalls); cursor = 0
    state.farms.forEach(function (farm) {
      farm.gaugeState = details[cursor++]; farm.poolBalance0 = details[cursor++][0]; farm.poolBalance1 = details[cursor++][0]; farm.gaugeLpBalance = details[cursor++][0]; farm.gaugeSupply = details[cursor++][0]; farm.gaugeRewardRate = details[cursor++][0]
      farm.isGauge = !!(farm.gaugeState && farm.gaugeState[0]); farm.alive = !!(farm.gaugeState && farm.gaugeState[1]); farm.claimable = farm.gaugeState ? farm.gaugeState[5] : ethers.constants.Zero
    })
    await hydrateTokens()
    resolvePrices(); revalueFarms(); render()
    // Gauge-held NFTs are only read after the usable table is visible. The
    // count phase and every page of position reads remain bounded.
    loadGaugePositions().catch(function (error) { console.warn('Gauge position valuation failed', error) })
    setLoading(); setStatus(''); render()
  }

  async function hydrateTokens () {
    const addressesToRead = new Set([lower(addresses.lute), lower(addresses.usdg)])
    state.farms.forEach(function (farm) { addressesToRead.add(lower(farm.token0)); addressesToRead.add(lower(farm.token1)) })
    const erc20Interface = iface(erc20Abi); const calls = []
    Array.from(addressesToRead).forEach(function (address) {
      calls.push({ target: address, iface: erc20Interface, method: 'symbol', fallback: ['TOKEN'] })
      calls.push({ target: address, iface: erc20Interface, method: 'decimals', fallback: [18] })
    })
    const values = await batch(calls); let cursor = 0
    Array.from(addressesToRead).forEach(function (address) {
      const symbol = clean(values[cursor++][0], 20); const decimals = Number(values[cursor++][0])
      state.tokens.set(lower(address), { address: ethers.utils.getAddress(address), symbol: symbol, decimals: Number.isInteger(decimals) ? decimals : 18 })
    })
  }

  function priceRatio (farm) {
    const zeroToken = token(farm.token0); const oneToken = token(farm.token1)
    if (farm.reserves) {
      const reserve0 = asNumber(farm.reserves[0], zeroToken.decimals); const reserve1 = asNumber(farm.reserves[1], oneToken.decimals)
      return reserve0 > 0 && reserve1 >= 0 ? reserve1 / reserve0 : NaN
    }
    if (!farm.globalState) return NaN
    const sqrt = Number(farm.globalState[0].toString()) / Q96
    const ratio = sqrt * sqrt * Math.pow(10, zeroToken.decimals - oneToken.decimals)
    return Number.isFinite(ratio) && ratio > 0 ? ratio : NaN
  }

  function poolBalances (farm) {
    return farm.reserves ? [farm.reserves[0], farm.reserves[1]] : [farm.poolBalance0, farm.poolBalance1]
  }

  function resolvePrices () {
    state.prices = new Map([[lower(addresses.usdg), 1]])
    const bestDepth = new Map([[lower(addresses.usdg), Number.MAX_SAFE_INTEGER]])
    for (let round = 0; round < 18; round += 1) {
      let changed = false
      state.farms.forEach(function (farm) {
        const ratio = priceRatio(farm); if (!Number.isFinite(ratio) || ratio <= 0) return
        const left = lower(farm.token0); const right = lower(farm.token1); const leftPrice = state.prices.get(left); const rightPrice = state.prices.get(right)
        const balances = poolBalances(farm); const leftAmount = asNumber(balances[0], token(farm.token0).decimals); const rightAmount = asNumber(balances[1], token(farm.token1).decimals)
        const depth = Math.max(0, (Number.isFinite(leftPrice) ? leftAmount * leftPrice : 0) + (Number.isFinite(rightPrice) ? rightAmount * rightPrice : 0))
        if (Number.isFinite(leftPrice) && !Number.isFinite(rightPrice)) {
          const candidate = leftPrice / ratio
          if (Number.isFinite(candidate) && candidate > 0 && depth >= (bestDepth.get(right) || 0)) { state.prices.set(right, candidate); bestDepth.set(right, depth); changed = true }
        }
        if (Number.isFinite(rightPrice) && !Number.isFinite(leftPrice)) {
          const candidate = rightPrice * ratio
          if (Number.isFinite(candidate) && candidate > 0 && depth >= (bestDepth.get(left) || 0)) { state.prices.set(left, candidate); bestDepth.set(left, depth); changed = true }
        }
      })
      if (!changed) break
    }
  }

  function positionValue (farm, position) {
    if (!farm.globalState || !position) return NaN
    const liquidity = Number(position[6].toString()); const current = Number(farm.globalState[0].toString()) / Q96
    const lowerTick = Number(position[4]); const upperTick = Number(position[5]); const lowerSqrt = Math.pow(1.0001, lowerTick / 2); const upperSqrt = Math.pow(1.0001, upperTick / 2)
    if (!Number.isFinite(liquidity) || !Number.isFinite(current) || liquidity < 0 || lowerSqrt <= 0 || upperSqrt <= lowerSqrt) return NaN
    let amount0 = 0; let amount1 = 0
    if (current <= lowerSqrt) amount0 = liquidity * (upperSqrt - lowerSqrt) / (lowerSqrt * upperSqrt)
    else if (current >= upperSqrt) amount1 = liquidity * (upperSqrt - lowerSqrt)
    else { amount0 = liquidity * (upperSqrt - current) / (current * upperSqrt); amount1 = liquidity * (current - lowerSqrt) }
    const value0 = amount0 / Math.pow(10, token(farm.token0).decimals) * price(farm.token0)
    const value1 = amount1 / Math.pow(10, token(farm.token1).decimals) * price(farm.token1)
    return Number.isFinite(value0) && Number.isFinite(value1) ? value0 + value1 : NaN
  }

  function revalueFarms () {
    state.farms.forEach(function (farm) {
      const balances = poolBalances(farm); const value0 = tokenValue(balances[0], farm.token0); const value1 = tokenValue(balances[1], farm.token1)
      farm.poolTvl = Number.isFinite(value0) && Number.isFinite(value1) ? value0 + value1 : NaN
      if (farm.kind === 'V2 LP' && !farm.lpSupply.isZero()) farm.gaugeTvl = Number.isFinite(farm.poolTvl) ? farm.poolTvl * asNumber(farm.gaugeLpBalance, 18) / asNumber(farm.lpSupply, 18) : NaN
      else if (farm.kind === 'CL / V3') farm.gaugeTvl = farm.positions.reduce(function (total, position) { const value = positionValue(farm, position.data); return Number.isFinite(value) ? total + value : total }, 0)
      else farm.gaugeTvl = NaN
      farm.emission = farm.isGauge && farm.alive ? farm.gaugeRewardRate.mul(secondsPerWeek) : ethers.constants.Zero
      farm.emissionUsd = tokenValue(farm.emission, addresses.lute); farm.apr = Number.isFinite(farm.emissionUsd) && Number.isFinite(farm.gaugeTvl) && farm.gaugeTvl > 0 ? farm.emissionUsd * 52.142857 / farm.gaugeTvl * 100 : NaN
    })
  }

  async function loadGaugePositions () {
    const managerInterface = iface(managerAbi); const calls = state.farms.filter(function (farm) { return farm.kind === 'CL / V3' }).map(function (farm) { return { target: addresses.positionManager, iface: managerInterface, method: 'balanceOf', args: [farm.gauge], fallback: [ethers.constants.Zero] } })
    const counts = await batch(calls); let cursor = 0
    state.farms.filter(function (farm) { return farm.kind === 'CL / V3' }).forEach(function (farm) { farm.gaugeNftCount = counts[cursor++][0].toNumber() })
    const targets = state.farms.filter(function (farm) { return farm.kind === 'CL / V3' && farm.gaugeNftCount > 0 })
    let completed = 0
    for (let index = 0; index < targets.length; index += 1) {
      const farm = targets[index]; setLoading('Valuing gauge-held position NFTs ' + (index + 1) + '/' + targets.length + '…'); render()
      // A malicious or unusual gauge cannot force an unbounded request. Read
      // ownership in pages; each successful page is rendered before the next.
      for (let offset = 0; offset < farm.gaugeNftCount; offset += 24) {
        const width = Math.min(24, farm.gaugeNftCount - offset); const idCalls = []
        for (let inner = 0; inner < width; inner += 1) idCalls.push({ target: addresses.positionManager, iface: managerInterface, method: 'tokenOfOwnerByIndex', args: [farm.gauge, offset + inner], fallback: [ethers.constants.Zero] })
        const ids = await batch(idCalls); const positionCalls = ids.map(function (entry) { return { target: addresses.positionManager, iface: managerInterface, method: 'positions', args: [entry[0]], fallback: null } })
        const positions = await batch(positionCalls)
        positions.forEach(function (data, positionIndex) { if (data && same(data[2], farm.token0) && same(data[3], farm.token1)) farm.positions.push({ id: ids[positionIndex][0], data: data }) })
        revalueFarms(); render()
      }
      completed += 1
    }
    if (completed) { setLoading(); setStatus(''); render() }
  }

  async function refreshWallet () {
    const status = byId('alandale-wallet-status')
    if (!state.account || !state.eip1193 || state.walletChain !== chain.id || !state.farms.length) {
      if (status) status.textContent = state.account ? 'Switch wallet to Robinhood Chain' : 'Wallet not connected'
      state.positions = []; render(); return
    }
    state.walletLoading = true; setLoading('Reading wallet balances, allowances, positions, stakes, and earned LUTE…'); if (status) status.textContent = short(state.account); render()
    try {
      const erc20Interface = iface(erc20Abi); const gaugeInterface = iface(gaugeAbi); const managerInterface = iface(managerAbi); const calls = []
      const knownTokens = Array.from(state.tokens.values())
      knownTokens.forEach(function (data) { calls.push({ target: data.address, iface: erc20Interface, method: 'balanceOf', args: [state.account], fallback: [ethers.constants.Zero] }) })
      state.farms.forEach(function (farm) {
        if (farm.kind === 'V2 LP') {
          calls.push({ target: farm.pool, iface: erc20Interface, method: 'balanceOf', args: [state.account], fallback: [ethers.constants.Zero] })
          calls.push({ target: farm.pool, iface: erc20Interface, method: 'allowance', args: [state.account, farm.gauge], fallback: [ethers.constants.Zero] })
          calls.push({ target: farm.gauge, iface: gaugeInterface, method: 'balanceOf', args: [state.account], fallback: [ethers.constants.Zero] })
        }
        calls.push({ target: farm.gauge, iface: gaugeInterface, method: 'earned', args: [state.account], fallback: [ethers.constants.Zero] })
      })
      calls.push({ target: addresses.positionManager, iface: managerInterface, method: 'balanceOf', args: [state.account], fallback: [ethers.constants.Zero] })
      const values = await batch(calls); let cursor = 0; state.walletTokenBalances = new Map()
      knownTokens.forEach(function (data) { state.walletTokenBalances.set(lower(data.address), values[cursor++][0]) })
      state.farms.forEach(function (farm) {
        if (farm.kind === 'V2 LP') { farm.walletLp = values[cursor++][0]; farm.walletAllowance = values[cursor++][0]; farm.walletGauge = values[cursor++][0] }
        farm.walletEarned = values[cursor++][0]
      })
      const count = values[cursor][0].toNumber(); state.positions = []
      for (let offset = 0; offset < count; offset += 32) {
        const width = Math.min(32, count - offset); const idCalls = []
        for (let index = 0; index < width; index += 1) idCalls.push({ target: addresses.positionManager, iface: managerInterface, method: 'tokenOfOwnerByIndex', args: [state.account, offset + index], fallback: [ethers.constants.Zero] })
        const ids = await batch(idCalls); const detailCalls = []
        ids.forEach(function (entry) { detailCalls.push({ target: addresses.positionManager, iface: managerInterface, method: 'positions', args: [entry[0]], fallback: null }); detailCalls.push({ target: addresses.positionManager, iface: managerInterface, method: 'getApproved', args: [entry[0]], fallback: [ethers.constants.AddressZero] }) })
        const details = await batch(detailCalls); let detailCursor = 0
        ids.forEach(function (entry) { const data = details[detailCursor++]; const approved = details[detailCursor++][0]; if (data) { const farm = state.farmByPool.get(lower(data[2])); if (farm && same(data[3], farm.token1)) state.positions.push({ id: entry[0], data: data, approved: approved, farm: farm }) } })
        render()
      }
      revalueFarms()
    } finally { state.walletLoading = false; setLoading(); render() }
  }

  function showDialog (title, description) {
    const dialog = byId('alandale-action-dialog'); const content = byId('alandale-action-content'); content.textContent = ''
    content.appendChild(e('h2', { id: 'alandale-action-title', text: title })); if (description) content.appendChild(e('p', { text: description }))
    if (dialog.open) dialog.close(); dialog.showModal(); return content
  }
  function dialogNote (content) { const note = e('pre', { className: 'alandale-action-note', text: '' }); content.appendChild(note); return note }
  function amountRow (content, label, available, decimals) {
    content.appendChild(e('label', { className: 'alandale-form-label', text: label })); const row = e('div', { className: 'alandale-input-row' }); const field = input('', '0.0'); const max = button('[ max ]', function () { field.value = formatAmount(available || ethers.constants.Zero, decimals, 18) }); add(row, field, max); content.appendChild(row); return field
  }
  function parseAmount (field, decimals) { const value = String(field.value || '').trim(); if (!value || !/^\d+(\.\d+)?$/.test(value)) throw new Error('Enter a valid positive amount.'); const parsed = ethers.utils.parseUnits(value, decimals); if (parsed.lte(0)) throw new Error('Enter an amount greater than zero.'); return parsed }
  function minimumRow (content, label) { content.appendChild(e('label', { className: 'alandale-form-label', text: label })); const field = input('0', '0.0'); content.appendChild(add(e('div', { className: 'alandale-input-row' }), field)); return field }
  function parseMinimum (field, decimals) { const value = String(field.value || '').trim(); if (!/^\d+(\.\d+)?$/.test(value)) throw new Error('Enter a valid minimum amount.'); return ethers.utils.parseUnits(value, decimals) }
  function confirmZeroMinimum (minimum0, minimum1) { if ((minimum0.isZero() || minimum1.isZero()) && !window.confirm('A zero minimum has no slippage protection. Continue?')) throw new Error('Cancelled.') }
  function requireWallet () { if (!state.account || !state.eip1193) throw new Error('Connect an injected wallet first.'); if (state.walletChain !== chain.id) throw new Error('Switch the wallet to Robinhood Chain before sending a transaction.') }
  async function waitForReceipt (hash) {
    for (let attempt = 0; attempt < 120; attempt += 1) { const receipt = await state.eip1193.request({ method: 'eth_getTransactionReceipt', params: [hash] }); if (receipt) return receipt; await new Promise(function (resolve) { window.setTimeout(resolve, 1000) }) }
    throw new Error('Timed out waiting for the transaction receipt.')
  }
  async function sendExact (label, target, abi, method, args) {
    requireWallet(); const contractInterface = iface(abi); const transaction = { from: state.account, to: target, data: contractInterface.encodeFunctionData(method, args || []) }
    state.sending = true; setStatus('Simulating ' + label + ' with exact calldata…'); render()
    try {
      await state.eip1193.request({ method: 'eth_call', params: [transaction, 'latest'] })
      setStatus('Submitting ' + label + '…'); render()
      const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [transaction] }); const receipt = await waitForReceipt(hash)
      if (lower(receipt.status) !== '0x1') throw new Error(label + ' reverted on Robinhood Chain.')
      setStatus(label + ' confirmed. Refreshing direct RPC and wallet state…', 'success'); await refreshWallet(); return receipt
    } finally { state.sending = false; render() }
  }
  async function ensureApproval (asset, spender, amount) {
    const erc20Interface = iface(erc20Abi); const allowance = await batch([{ target: asset, iface: erc20Interface, method: 'allowance', args: [state.account, spender], fallback: [ethers.constants.Zero] }])
    if (allowance[0][0].lt(amount)) await sendExact('approval for ' + token(asset).symbol, asset, erc20Abi, 'approve', [spender, amount])
  }
  async function claimFarm (farm) { await sendExact('LUTE reward claim', addresses.voter, voterAbi, 'claimRewards', [[farm.gauge]]) }

  function openV2Actions (farm) {
    const content = showDialog(token(farm.token0).symbol + ' / ' + token(farm.token1).symbol + ' V2 LP')
    const balance0 = state.walletTokenBalances.get(lower(farm.token0)) || ethers.constants.Zero; const balance1 = state.walletTokenBalances.get(lower(farm.token1)) || ethers.constants.Zero
    const amount0 = amountRow(content, token(farm.token0).symbol, balance0, token(farm.token0).decimals); const amount1 = amountRow(content, token(farm.token1).symbol, balance1, token(farm.token1).decimals)
    const minimum0 = minimumRow(content, token(farm.token0).symbol + ' minimum'); const minimum1 = minimumRow(content, token(farm.token1).symbol + ' minimum')
    const note = dialogNote(content); const actions = e('div', { className: 'alandale-dialog-actions' })
    actions.appendChild(button('[ add LP ]', async function () {
      try { const value0 = parseAmount(amount0, token(farm.token0).decimals); const value1 = parseAmount(amount1, token(farm.token1).decimals); const min0 = parseMinimum(minimum0, token(farm.token0).decimals); const min1 = parseMinimum(minimum1, token(farm.token1).decimals); confirmZeroMinimum(min0, min1); await ensureApproval(farm.token0, addresses.routerV2, value0); await ensureApproval(farm.token1, addresses.routerV2, value1); await sendExact('V2 liquidity add', addresses.routerV2, v2RouterAbi, 'addLiquidity', [farm.token0, farm.token1, farm.stable, value0, value1, min0, min1, state.account, deadline()]); note.textContent = 'LP minted.' } catch (error) { note.textContent = errText(error) } }))
    actions.appendChild(button('[ claim LUTE ]', async function () { try { await claimFarm(farm); note.textContent = 'Claim complete.' } catch (error) { note.textContent = errText(error) } }))
    content.appendChild(actions)
    const stakeAmount = amountRow(content, 'LP amount', farm.walletLp || ethers.constants.Zero, 18); const stakeActions = e('div', { className: 'alandale-dialog-actions' })
    stakeActions.appendChild(button('[ stake ]', async function () { try { const value = parseAmount(stakeAmount, 18); await ensureApproval(farm.pool, farm.gauge, value); await sendExact('V2 LP stake', farm.gauge, gaugeAbi, 'deposit', [value]); note.textContent = 'LP staked.' } catch (error) { note.textContent = errText(error) } }))
    stakeActions.appendChild(button('[ unstake ]', async function () { try { const value = parseAmount(stakeAmount, 18); await sendExact('V2 LP unstake', farm.gauge, gaugeAbi, 'withdraw', [value]); note.textContent = 'LP unstaked.' } catch (error) { note.textContent = errText(error) } }))
    stakeActions.appendChild(button('[ remove LP ]', async function () { try { const value = parseAmount(stakeAmount, 18); const min0 = parseMinimum(minimum0, token(farm.token0).decimals); const min1 = parseMinimum(minimum1, token(farm.token1).decimals); confirmZeroMinimum(min0, min1); await ensureApproval(farm.pool, addresses.routerV2, value); await sendExact('V2 liquidity remove', addresses.routerV2, v2RouterAbi, 'removeLiquidity', [farm.token0, farm.token1, farm.stable, value, min0, min1, state.account, deadline()]); note.textContent = 'LP removed.' } catch (error) { note.textContent = errText(error) } }))
    content.appendChild(stakeActions)
  }

  function openV3Liquidity (farm, position) {
    const title = token(farm.token0).symbol + ' / ' + token(farm.token1).symbol + (position ? ' position #' + position.id.toString() : ' new position')
    const content = showDialog(title)
    const balance0 = state.walletTokenBalances.get(lower(farm.token0)) || ethers.constants.Zero; const balance1 = state.walletTokenBalances.get(lower(farm.token1)) || ethers.constants.Zero
    const amount0 = amountRow(content, token(farm.token0).symbol + ' desired', balance0, token(farm.token0).decimals); const amount1 = amountRow(content, token(farm.token1).symbol + ' desired', balance1, token(farm.token1).decimals)
    const minimum0 = minimumRow(content, token(farm.token0).symbol + ' minimum'); const minimum1 = minimumRow(content, token(farm.token1).symbol + ' minimum')
    let lowerTick; let upperTick
    if (!position) {
      const spacing = Math.max(1, Math.abs(Number(farm.tickSpacing || 1))); const current = Number(farm.globalState ? farm.globalState[1] : 0); lowerTick = input(String(Math.floor((current - spacing * 100) / spacing) * spacing), 'lower tick'); upperTick = input(String(Math.ceil((current + spacing * 100) / spacing) * spacing), 'upper tick')
      content.appendChild(e('label', { className: 'alandale-form-label', text: 'Lower tick' })); content.appendChild(add(e('div', { className: 'alandale-input-row' }), lowerTick)); content.appendChild(e('label', { className: 'alandale-form-label', text: 'Upper tick' })); content.appendChild(add(e('div', { className: 'alandale-input-row' }), upperTick))
    }
    const note = dialogNote(content); const actions = e('div', { className: 'alandale-dialog-actions' })
    actions.appendChild(button(position ? '[ increase liquidity ]' : '[ mint position ]', async function () {
      try {
        const value0 = parseAmount(amount0, token(farm.token0).decimals); const value1 = parseAmount(amount1, token(farm.token1).decimals); const min0 = parseMinimum(minimum0, token(farm.token0).decimals); const min1 = parseMinimum(minimum1, token(farm.token1).decimals); confirmZeroMinimum(min0, min1); await ensureApproval(farm.token0, addresses.positionManager, value0); await ensureApproval(farm.token1, addresses.positionManager, value1)
        if (position) await sendExact('concentrated-liquidity increase', addresses.positionManager, managerAbi, 'increaseLiquidity', [{ tokenId: position.id, amount0Desired: value0, amount1Desired: value1, amount0Min: min0, amount1Min: min1, deadline: deadline() }])
        else {
          const lowerValue = Number(lowerTick.value); const upperValue = Number(upperTick.value); const spacing = Math.max(1, Math.abs(Number(farm.tickSpacing || 1)))
          if (!Number.isInteger(lowerValue) || !Number.isInteger(upperValue) || lowerValue >= upperValue || lowerValue % spacing || upperValue % spacing) throw new Error('Ticks must be whole, ordered, and divisible by the pool tick spacing (' + spacing + ').')
          await sendExact('concentrated-liquidity mint', addresses.positionManager, managerAbi, 'mint', [{ token0: farm.token0, token1: farm.token1, tickLower: lowerValue, tickUpper: upperValue, amount0Desired: value0, amount1Desired: value1, amount0Min: min0, amount1Min: min1, recipient: state.account, deadline: deadline() }])
        }
        note.textContent = position ? 'Liquidity increased.' : 'Position minted.'
      } catch (error) { note.textContent = errText(error) }
    }))
    content.appendChild(actions)
  }

  function openPositionActions (position) {
    const farm = position.farm; const content = showDialog('Position #' + position.id.toString())
    const note = dialogNote(content); const actions = e('div', { className: 'alandale-dialog-actions' })
    actions.appendChild(button('[ increase ]', function () { openV3Liquidity(farm, position) }))
    actions.appendChild(button('[ stake ]', async function () { try { const approved = same(position.approved, farm.gauge); if (!approved) await sendExact('position NFT approval', addresses.positionManager, managerAbi, 'approve', [farm.gauge, position.id]); await sendExact('position NFT stake', farm.gauge, gaugeAbi, 'deposit', [position.id]); note.textContent = 'Position staked.' } catch (error) { note.textContent = errText(error) } }))
    actions.appendChild(button('[ collect ]', async function () { try { await sendExact('position fee collect', addresses.positionManager, managerAbi, 'collect', [{ tokenId: position.id, recipient: state.account, amount0Max: max128, amount1Max: max128 }]); note.textContent = 'Fees collected.' } catch (error) { note.textContent = errText(error) } }))
    content.appendChild(actions)
    const liquidity = position.data[6]; const fraction = amountRow(content, 'Liquidity', liquidity, 0); const minimum0 = minimumRow(content, token(farm.token0).symbol + ' minimum'); const minimum1 = minimumRow(content, token(farm.token1).symbol + ' minimum'); const exitActions = e('div', { className: 'alandale-dialog-actions' })
    exitActions.appendChild(button('[ decrease + collect ]', async function () { try { const value = parseAmount(fraction, 0); if (value.gt(liquidity)) throw new Error('Cannot decrease more than the position liquidity.'); const min0 = parseMinimum(minimum0, token(farm.token0).decimals); const min1 = parseMinimum(minimum1, token(farm.token1).decimals); confirmZeroMinimum(min0, min1); await sendExact('liquidity decrease', addresses.positionManager, managerAbi, 'decreaseLiquidity', [{ tokenId: position.id, liquidity: value, amount0Min: min0, amount1Min: min1, deadline: deadline() }]); await sendExact('post-decrease collect', addresses.positionManager, managerAbi, 'collect', [{ tokenId: position.id, recipient: state.account, amount0Max: max128, amount1Max: max128 }]); note.textContent = 'Liquidity decreased and collected.' } catch (error) { note.textContent = errText(error) } }))
    exitActions.appendChild(button('[ exit all ]', async function () { try { const min0 = parseMinimum(minimum0, token(farm.token0).decimals); const min1 = parseMinimum(minimum1, token(farm.token1).decimals); confirmZeroMinimum(min0, min1); await sendExact('full liquidity decrease', addresses.positionManager, managerAbi, 'decreaseLiquidity', [{ tokenId: position.id, liquidity: liquidity, amount0Min: min0, amount1Min: min1, deadline: deadline() }]); await sendExact('full-exit collect', addresses.positionManager, managerAbi, 'collect', [{ tokenId: position.id, recipient: state.account, amount0Max: max128, amount1Max: max128 }]); await sendExact('empty NFT burn', addresses.positionManager, managerAbi, 'burn', [position.id]); note.textContent = 'Position exited.' } catch (error) { note.textContent = errText(error) } }))
    content.appendChild(exitActions)
  }

  function openV3FarmActions (farm) {
    const content = showDialog(token(farm.token0).symbol + ' / ' + token(farm.token1).symbol + ' CL farm')
    const actions = e('div', { className: 'alandale-dialog-actions' }); const note = dialogNote(content)
    actions.appendChild(button('[ mint LP ]', function () { openV3Liquidity(farm, null) }))
    actions.appendChild(button('[ claim LUTE ]', async function () { try { await claimFarm(farm); note.textContent = 'Claim complete.' } catch (error) { note.textContent = errText(error) } }))
    const tokenId = input('', 'staked NFT id'); content.appendChild(e('label', { className: 'alandale-form-label', text: 'NFT' })); content.appendChild(add(e('div', { className: 'alandale-input-row' }), tokenId)); actions.appendChild(button('[ unstake ]', async function () { try { if (!/^\d+$/.test(tokenId.value)) throw new Error('Enter a numeric NFT token ID.'); await sendExact('position NFT unstake', farm.gauge, gaugeAbi, 'withdraw', [tokenId.value]); note.textContent = 'Position unstaked.' } catch (error) { note.textContent = errText(error) } }))
    content.appendChild(actions)
  }

  function renderWallet () {
    const node = byId('alandale-wallet-status'); const connect = byId('alandale-connect'); const other = byId('alandale-other-wallet'); if (!node || !connect || !other) return
    const injected = injectedWallet(); connect.textContent = '[ connect ]'; other.textContent = '[ other wallet ]'
    connect.disabled = state.sending || state.walletLoading || !injected; other.disabled = state.sending || state.walletLoading
    connect.hidden = false; other.hidden = false
    if (!state.account) { node.textContent = ''; return }
    node.textContent = state.walletChain === chain.id ? short(state.account) : short(state.account) + ' · wrong chain'
  }
  function renderOverview () {
    const node = byId('alandale-overview'); if (!node || !state.voterCounts) return
    const priceLute = price(addresses.lute); const pricedPoolTvl = state.farms.reduce(function (sum, farm) { return sum + (Number.isFinite(farm.poolTvl) ? farm.poolTvl : 0) }, 0)
    node.hidden = false; node.textContent = 'LUTE ' + usd(priceLute) + ' · ' + usd(pricedPoolTvl)
  }
  function visibleFarms () { return state.farms.filter(function (farm) { return state.showZeroApr || !(farm.emission || ethers.constants.Zero).isZero() }) }
  function renderFarms () {
    const host = byId('alandale-farms'); const toggle = byId('alandale-zero-apr-toggle'); if (!host) return
    if (toggle) toggle.textContent = state.showZeroApr ? '[ hide inactive ]' : '[ show inactive ]'
    host.textContent = ''; const farms = visibleFarms().slice().sort(function (left, right) { return (right.gaugeTvl || 0) - (left.gaugeTvl || 0) || left.registryIndex - right.registryIndex })
    if (!farms.length) { if (!state.loading) host.appendChild(e('pre', { text: 'No live farms.' })); return }
    const table = e('table', { className: 'alandale-farm-table' }); const head = e('thead'); const header = e('tr'); ['Farm', 'Staked', 'Unstaked', 'APR', 'Rewards / week', 'Actions'].forEach(function (name) { header.appendChild(e('th', { text: name })) }); head.appendChild(header); table.appendChild(head); const body = e('tbody')
    farms.forEach(function (farm) {
      const row = e('tr'); const pair = token(farm.token0).symbol + ' / ' + token(farm.token1).symbol; const unstaked = Number.isFinite(farm.poolTvl) && Number.isFinite(farm.gaugeTvl) ? Math.max(0, farm.poolTvl - farm.gaugeTvl) : NaN
      const farmCell = e('td'); add(farmCell, e('span', { className: 'alandale-pair', text: pair + ' · ' + (farm.kind === 'V2 LP' ? 'V2' : 'CL') + ' #' + (farm.registryIndex + 1) }), e('span', { className: 'alandale-kind', text: farm.alive ? '' : 'inactive' })); row.appendChild(farmCell)
      row.appendChild(e('td', { text: usd(farm.gaugeTvl) }))
      row.appendChild(e('td', { text: usd(unstaked) }))
      row.appendChild(e('td', { text: percent(farm.apr) }))
      const emissionCell = e('td', { className: 'alandale-values' }); emissionCell.appendChild(e('span', { text: compact(asNumber(farm.emission, token(addresses.lute).decimals)) + ' LUTE' })); emissionCell.appendChild(e('span', { text: usd(farm.emissionUsd) })); row.appendChild(emissionCell)
      const actionCell = e('td', { className: 'alandale-actions' }); actionCell.appendChild(button('[ manage ]', function () { try { requireWallet(); farm.kind === 'V2 LP' ? openV2Actions(farm) : openV3FarmActions(farm) } catch (error) { setStatus(errText(error), 'error') } }, state.sending)); actionCell.appendChild(button('[ claim ]', function () { claimFarm(farm).catch(function (error) { setStatus(errText(error), 'error') }) }, state.sending || !state.account)); row.appendChild(actionCell); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }
  function renderPositions () {
    const section = byId('alandale-positions-section'); const host = byId('alandale-positions'); if (!section || !host) return
    section.hidden = !state.account; host.textContent = ''; if (!state.account) return
    if (!state.positions.length) { host.appendChild(e('pre', { text: 'No wallet CL NFTs.' })); return }
    const table = e('table', { className: 'alandale-farm-table' }); const head = e('thead'); const header = e('tr'); ['Position', 'Pool', 'Liquidity', 'Range', 'Estimated value', 'Actions'].forEach(function (name) { header.appendChild(e('th', { text: name })) }); head.appendChild(header); table.appendChild(head); const body = e('tbody')
    state.positions.forEach(function (position) { const row = e('tr'); row.appendChild(e('td', { text: '#' + position.id.toString() })); row.appendChild(e('td', { text: token(position.farm.token0).symbol + ' / ' + token(position.farm.token1).symbol })); row.appendChild(e('td', { text: position.data[6].toString() })); row.appendChild(e('td', { text: position.data[4].toString() + ' → ' + position.data[5].toString() })); row.appendChild(e('td', { text: usd(positionValue(position.farm, position.data)) })); const action = e('td', { className: 'alandale-actions' }); action.appendChild(button('[ manage ]', function () { openPositionActions(position) }, state.sending)); row.appendChild(action); body.appendChild(row) })
    table.appendChild(body); host.appendChild(table)
  }
  function bindEvents () {
    const connect = byId('alandale-connect'); const other = byId('alandale-other-wallet'); const toggle = byId('alandale-zero-apr-toggle')
    if (connect) connect.addEventListener('click', function () { connectWallet().catch(function (error) { setStatus(errText(error), 'error') }) })
    if (other) other.addEventListener('click', function () { connectReown().catch(function (error) { setStatus(errText(error), 'error') }) })
    if (toggle) toggle.addEventListener('click', function () { state.showZeroApr = !state.showZeroApr; renderFarms() })
  }
  function render () { renderWallet(); renderOverview(); renderFarms(); renderPositions() }
  async function start () { state.rpc = new ethers.providers.JsonRpcProvider(chain.rpc, chain.number); bindEvents(); window.addEventListener('pagehide', clearWalletEvents, { once: true }); render(); const wallet = passiveWallet(); await loadRegistry(); await wallet; if (state.account) await refreshWallet() }
  function fatal (error) { console.error(error); setLoading(); setStatus(errText(error), 'error'); render() }
  return { start: start, fatal: fatal }
})()
