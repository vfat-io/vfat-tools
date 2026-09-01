/* Catnip on Robinhood Chain: direct RPC reads and direct EIP-1193 writes only. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { Catnip.start().catch(Catnip.fatal) })

const Catnip = (function () {
  const chain = {
    id: '0x1237', number: 4663, name: 'Robinhood Chain', rpc: 'https://rpc.mainnet.chain.robinhood.com',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  }
  // These five addresses are the current Catnip contracts published in the
  // Catnip protocol guide. Price discovery below only reads contract state.
  const addresses = {
    nip: '0xb06f3BE6d2b2D04e6e9276d99b3F134F5429934b',
    weth: '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73',
    usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168',
    factory: '0x002EC9782d70f4e79396c58964D4691cA648FB49',
    router: '0x0bcA9Ce83f72C22f9fc5eEa86A19676b0e0559f5',
    prowl: '0x8F5a1A4305256bBc9a055cDCE4a47d92C4F77c90',
    cache: '0x5d00D31C9A464d51679A88d0F073401aA6Fc5d6B',
    multicall: '0xca11bde05977b3631167028862be2a173976ca11',
    // This is a read-only price-reference registry, not a quote API. It is
    // discovered through its onchain length()/pools() mapping every load.
    priceVoter: '0x7F749fDD351C1Ceed82d76d7699CB631Eb8332a7',
  }
  const erc20Abi = [
    'function name() view returns(string)', 'function symbol() view returns(string)', 'function decimals() view returns(uint8)',
    'function balanceOf(address) view returns(uint256)', 'function totalSupply() view returns(uint256)',
    'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)',
  ]
  const factoryAbi = ['function allPairsLength() view returns(uint256)', 'function allPairs(uint256) view returns(address)', 'function feeTo() view returns(address)']
  const pairAbi = [
    'function token0() view returns(address)', 'function token1() view returns(address)',
    'function getReserves() view returns(uint112 reserve0,uint112 reserve1,uint32 blockTimestampLast)', 'function totalSupply() view returns(uint256)',
  ]
  const routerAbi = [
    'function addLiquidity(address tokenA,address tokenB,uint256 amountADesired,uint256 amountBDesired,uint256 amountAMin,uint256 amountBMin,address to,uint256 deadline) returns(uint256 amountA,uint256 amountB,uint256 liquidity)',
    'function removeLiquidity(address tokenA,address tokenB,uint256 liquidity,uint256 amountAMin,uint256 amountBMin,address to,uint256 deadline) returns(uint256 amountA,uint256 amountB)',
  ]
  const prowlAbi = [
    'function userInfo(uint256,address) view returns(uint256 amount,uint256 rewardDebt,uint256 rewardDebtAtBlock,uint256 lastWithdrawBlock,uint256 firstDepositBlock,uint256 blockdelta,uint256 lastDepositBlock,uint256 bonusRewardDebt)',
    'function pendingReward(uint256,address) view returns(uint256)', 'function deposit(uint256,uint256,address)', 'function withdraw(uint256,uint256,address)', 'function claimReward(uint256)',
    'function userDepFee() view returns(uint256)', 'function totalAllocPoint() view returns(uint256)',
    'function poolInfo(uint256) view returns(address lpToken,uint256 allocPoint,uint256 lastRewardBlock,uint256 accNipPerShare,uint256 accBonusNipPerShare)',
    'function poolLength() view returns(uint256)', 'function currentRewardPerDay(uint256) view returns(uint256)', 'function userDelta(uint256) view returns(uint256)',
    'function START_TIMESTAMP() view returns(uint256)', 'function PHASE_ONE_END_TIMESTAMP() view returns(uint256)', 'function PHASE_TWO_END_TIMESTAMP() view returns(uint256)', 'function EMISSION_END_TIMESTAMP() view returns(uint256)',
  ]
  const nipAbi = [
    ...erc20Abi, 'function cap() view returns(uint256)', 'function lockOf(address) view returns(uint256)', 'function canUnlockAmount(address) view returns(uint256)', 'function unlock()',
  ]
  const cacheAbi = ['function balanceOf(address) view returns(uint256)', 'function totalSupply() view returns(uint256)', 'function enter(uint256)', 'function leave(uint256)']
  const voterAbi = ['function length() view returns(uint256)', 'function pools(uint256) view returns(address)']
  const v3PoolAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function slot0() view returns(uint160 sqrtPriceX96,int24 tick,uint16 observationIndex,uint16 observationCardinality,uint16 observationCardinalityNext,bool unlocked)', 'function liquidity() view returns(uint128)']
  const multicallAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[])']
  const zero = ethers.constants.AddressZero
  const reownProjectId = process.env.REOWN_PROJECT_ID || '3e6154a7158ff5f7509f24405fc3b551'
  const state = {
    app: null, rpc: null, wallet: null, eip1193: null, walletSource: null, account: null, walletChain: null,
    pairs: [], farms: [], pricePools: [], tokens: new Map(), prices: new Map(), priceConfidence: new Map(),
    factoryTotal: null, farmTotal: null, pricePoolTotal: null, priceReferenceDone: false, feeBps: null, schedule: null,
    selectedPair: null, selectedFarm: null, showZero: false, draft: {},
    loadingRegistry: false, loadingMarket: false, loadingWallet: false, sending: false, message: '', messageType: '',
    spinnerTimer: null, spinnerIndex: 0, eventsBound: false, reownUnsubscribe: null,
    walletPairs: new Map(), walletFarms: new Map(), walletState: null,
  }

  const byId = function (id) { return document.getElementById(id) }
  const short = function (address) { return address ? address.slice(0, 6) + '…' + address.slice(-4) : '—' }
  const lower = function (address) { return String(address || '').toLowerCase() }
  const isZero = function (address) { return !address || lower(address) === lower(zero) }
  const numeric = function (value) { try { return ethers.BigNumber.from(value).toNumber() } catch (_) { return Number(value) } }
  const finite = function (value) { return Number.isFinite(value) && value >= 0 }
  const onChain = function () { return state.walletChain === chain.id }
  const injectedWallet = function () { return window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null }
  const activeWallet = function () { return state.eip1193 }
  const iface = function (abi) { return new ethers.utils.Interface(abi) }
  const deadline = function () { return Math.floor(Date.now() / 1000) + 1200 }
  const errorText = function (error) { return String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').replace(/\s+/g, ' ').slice(0, 420) }
  const amountNumber = function (value, decimals) { try { const number = Number(ethers.utils.formatUnits(value, decimals)); return Number.isFinite(number) ? number : NaN } catch (_) { return NaN } }
  const format = function (value, decimals, digits) {
    if (value === undefined || value === null) return '—'
    try {
      const parts = ethers.utils.formatUnits(value, decimals === undefined ? 18 : decimals).split('.')
      const fraction = (parts[1] || '').slice(0, digits === undefined ? 5 : digits).replace(/0+$/, '')
      return fraction ? parts[0] + '.' + fraction : parts[0]
    } catch (_) { return '—' }
  }
  const money = function (value) {
    if (!finite(value)) return '—'
    if (value >= 1000000) return '$' + (value / 1000000).toFixed(2) + 'm'
    if (value >= 1000) return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 })
    if (value >= 1) return '$' + value.toFixed(2)
    if (value > 0) return '$' + value.toPrecision(3)
    return '$0.00'
  }
  const percent = function (value) { return finite(value) ? value.toFixed(value >= 1000 ? 0 : 2) + '%' : '—' }
  const token = function (address) { return state.tokens.get(lower(address)) || { address: address, symbol: short(address), decimals: 18 } }
  const pairName = function (pair) { return pair && pair.token0 ? token(pair.token0).symbol + ' / ' + token(pair.token1).symbol : short(pair && pair.address) }

  const e = function (tag, options) {
    const node = document.createElement(tag); const config = options || {}
    if (config.id) node.id = config.id
    if (config.className) node.className = config.className
    if (config.text !== undefined) node.textContent = config.text
    if (config.type) node.type = config.type
    if (config.hidden) node.hidden = true
    return node
  }
  const append = function (parent) { for (let i = 1; i < arguments.length; i += 1) parent.appendChild(arguments[i]); return parent }
  const section = function (title) { const node = e('section'); node.appendChild(e('pre', { text: '\n============== ' + title.toUpperCase() + ' ==============\n' })); return node }
  const action = function (label, callback, disabled) {
    const node = e('button', { type: 'button', className: 'catnip-action', text: '[ ' + label.toUpperCase() + ' ]' })
    node.disabled = Boolean(disabled || state.sending)
    node.addEventListener('click', function () { callback().catch(function (error) { message(errorText(error), 'error'); render() }) })
    return node
  }
  const field = function (label, key, suffix) {
    const node = e('label', { className: 'catnip-field' }); const input = e('input', { type: 'text' })
    input.inputMode = 'decimal'; input.placeholder = '0.00'; input.value = state.draft[key] || ''
    input.addEventListener('input', function () { state.draft[key] = input.value })
    append(node, document.createTextNode(label + ' '), input, document.createTextNode(' ' + (suffix || '')))
    return node
  }
  function message (text, type) { state.message = text || ''; state.messageType = type || '' }
  function setLoading (text) {
    const node = byId('catnip-loading'); const label = byId('catnip-loading-text'); const spinner = byId('catnip-spinner')
    if (!node) return
    node.hidden = !text
    if (text && label) label.textContent = text
    if (text && !state.spinnerTimer) {
      const frames = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]']
      state.spinnerIndex = 0
      state.spinnerTimer = window.setInterval(function () { if (spinner) spinner.textContent = frames[state.spinnerIndex++ % frames.length] }, 300)
      if (spinner) spinner.textContent = frames[0]
    } else if (!text && state.spinnerTimer) { window.clearInterval(state.spinnerTimer); state.spinnerTimer = null }
  }
  async function limited (items, limit, callback) {
    const output = new Array(items.length); let next = 0
    async function worker () { while (next < items.length) { const index = next++; output[index] = await callback(items[index], index) } }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
    return output
  }
  async function batch (calls) {
    if (!calls.length) return []
    const groups = []
    for (let start = 0; start < calls.length; start += 96) groups.push(calls.slice(start, start + 96))
    const multicall = new ethers.Contract(addresses.multicall, multicallAbi, state.rpc)
    const result = await limited(groups, 3, async function (group) {
      const answers = await multicall.aggregate3(group.map(function (call) {
        return { target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }
      }))
      return answers.map(function (answer, index) {
        const call = group[index]
        if (!answer.success) return call.fallback === undefined ? null : call.fallback
        try {
          const decoded = call.iface.decodeFunctionResult(call.method, answer.returnData)
          return call.decode ? call.decode(decoded) : decoded[0]
        } catch (_) { return call.fallback === undefined ? null : call.fallback }
      })
    })
    return [].concat.apply([], result)
  }

  async function loadTokenMetadata (addressesToLoad) {
    const unknown = Array.from(new Set(addressesToLoad.filter(Boolean).map(lower))).filter(function (address) { return !state.tokens.has(address) })
    if (!unknown.length) return
    const tokenInterface = iface(erc20Abi); const calls = []
    unknown.forEach(function (address) {
      calls.push({ target: address, iface: tokenInterface, method: 'symbol', fallback: short(address) }, { target: address, iface: tokenInterface, method: 'decimals', fallback: 18 })
    })
    const values = await batch(calls)
    unknown.forEach(function (address, index) {
      const symbol = String(values[index * 2] || short(address)).replace(/[\r\n|]/g, ' ').trim().slice(0, 18) || short(address)
      const decimals = numeric(values[index * 2 + 1]); state.tokens.set(address, { address: address, symbol: symbol, decimals: Number.isInteger(decimals) && decimals >= 0 && decimals <= 255 ? decimals : 18 })
    })
  }

  async function loadRegistry () {
    state.loadingRegistry = true; setLoading('Discovering the complete Alley and MasterProwl registries…'); render()
    try {
      const factoryInterface = iface(factoryAbi); const prowlInterface = iface(prowlAbi)
      const core = await batch([
        { target: addresses.factory, iface: factoryInterface, method: 'allPairsLength', fallback: null },
        { target: addresses.factory, iface: factoryInterface, method: 'feeTo', fallback: zero },
        { target: addresses.prowl, iface: prowlInterface, method: 'poolLength', fallback: null },
        { target: addresses.prowl, iface: prowlInterface, method: 'userDepFee', fallback: null },
        { target: addresses.prowl, iface: prowlInterface, method: 'START_TIMESTAMP', fallback: null },
        { target: addresses.prowl, iface: prowlInterface, method: 'PHASE_ONE_END_TIMESTAMP', fallback: null },
        { target: addresses.prowl, iface: prowlInterface, method: 'PHASE_TWO_END_TIMESTAMP', fallback: null },
        { target: addresses.prowl, iface: prowlInterface, method: 'EMISSION_END_TIMESTAMP', fallback: null },
      ])
      if (core[0] === null || core[2] === null) throw new Error('Catnip factory or MasterProwl did not expose its authoritative length() registry.')
      state.factoryTotal = numeric(core[0]); state.farmTotal = numeric(core[2]); state.feeBps = core[3]
      state.schedule = { start: core[4], phaseOneEnd: core[5], phaseTwoEnd: core[6], end: core[7] }
      if (state.factoryTotal > 512 || state.farmTotal > 512) throw new Error('Registry exceeds this page’s bounded onchain safety limit.')
      const pairCalls = Array.from({ length: state.factoryTotal }, function (_, index) { return { target: addresses.factory, iface: factoryInterface, method: 'allPairs', args: [index], fallback: zero } })
      const farmCalls = Array.from({ length: state.farmTotal }, function (_, index) { return { target: addresses.prowl, iface: prowlInterface, method: 'poolInfo', args: [index], fallback: null, decode: function (value) { return value } } })
      const values = await Promise.all([batch(pairCalls), batch(farmCalls)])
      state.pairs = values[0].filter(function (address) { return !isZero(address) }).map(function (address, index) { return { address: address, index: index, ready: false } })
      state.farms = values[1].map(function (info, pid) {
        if (!info || isZero(info[0])) return { pid: pid, invalid: true, ready: false }
        return { pid: pid, lpToken: info[0], allocPoint: info[1], lastReward: info[2], ready: false }
      }).filter(function (farm) { return !farm.invalid })
      state.selectedPair = state.pairs.find(function (pair) { return lower(pair.address) === lower(state.farms[0] && state.farms[0].lpToken) }) || state.pairs[0] || null
      state.selectedFarm = state.farms.find(function (farm) { return state.selectedPair && lower(farm.lpToken) === lower(state.selectedPair.address) }) || state.farms[0] || null
      message('Discovered ' + state.pairs.length + '/' + state.factoryTotal + ' Alley pairs and ' + state.farms.length + '/' + state.farmTotal + ' MasterProwl farms directly onchain.', 'success')
      render()
      setLoading('Hydrating pair reserves, MasterProwl deposits, emissions, and token metadata…')
      await Promise.all([hydratePairs(state.pairs), hydrateFarmMetrics(state.farms), loadPriceReference()])
      computeMarket()
      if (state.account && onChain()) await loadWalletState()
      message('All Catnip registries are loaded from Robinhood Chain contract state.', 'success')
    } finally { state.loadingRegistry = false; if (!state.loadingMarket && !state.loadingWallet) setLoading(); render() }
  }

  async function hydratePairs (pairs) {
    const pending = pairs.filter(function (pair) { return !pair.ready })
    const groups = []
    for (let start = 0; start < pending.length; start += 8) groups.push(pending.slice(start, start + 8))
    const pairInterface = iface(pairAbi)
    await limited(groups, 3, async function (group) {
      const calls = []
      group.forEach(function (pair) {
        calls.push(
          { target: pair.address, iface: pairInterface, method: 'token0', fallback: zero },
          { target: pair.address, iface: pairInterface, method: 'token1', fallback: zero },
          { target: pair.address, iface: pairInterface, method: 'getReserves', fallback: null, decode: function (value) { return value } },
          { target: pair.address, iface: pairInterface, method: 'totalSupply', fallback: null },
        )
      })
      const values = await batch(calls); const tokenAddresses = []
      group.forEach(function (pair, index) {
        const offset = index * 4; pair.token0 = values[offset]; pair.token1 = values[offset + 1]; pair.reserves = values[offset + 2]; pair.supply = values[offset + 3]
        pair.ready = !isZero(pair.token0) && !isZero(pair.token1) && pair.reserves && pair.supply !== null
        if (pair.ready) tokenAddresses.push(pair.token0, pair.token1)
      })
      await loadTokenMetadata(tokenAddresses)
      computeMarket(); render()
    })
  }

  async function hydrateFarmMetrics (farms) {
    if (!farms.length) return
    const prowlInterface = iface(prowlAbi); const lpInterface = iface(erc20Abi)
    const groups = []
    for (let start = 0; start < farms.length; start += 12) groups.push(farms.slice(start, start + 12))
    await limited(groups, 3, async function (group) {
      const calls = []
      group.forEach(function (farm) {
        calls.push(
          { target: farm.lpToken, iface: lpInterface, method: 'balanceOf', args: [addresses.prowl], fallback: null },
          { target: addresses.prowl, iface: prowlInterface, method: 'currentRewardPerDay', args: [farm.pid + 1], fallback: null },
          { target: addresses.prowl, iface: prowlInterface, method: 'userDelta', args: [farm.pid], fallback: null },
        )
      })
      const values = await batch(calls)
      group.forEach(function (farm, index) { const offset = index * 3; farm.deposited = values[offset]; farm.rewardPerDay = values[offset + 1]; farm.exitDelta = values[offset + 2]; farm.ready = true })
      computeMarket(); render()
    })
  }

  async function loadPriceReference () {
    // Price edges are read from every pool in the reference voter. This gives
    // a complete, reproducible USDG discovery path; no fixed pair list, API,
    // indexer, token list, or quote router is used.
    try {
      const voterInterface = iface(voterAbi); const poolInterface = iface(v3PoolAbi)
      state.priceReferenceDone = false
      const length = (await batch([{ target: addresses.priceVoter, iface: voterInterface, method: 'length', fallback: null }]))[0]
      if (length === null) throw new Error('USDG price-reference registry unavailable')
      state.pricePoolTotal = numeric(length)
      if (state.pricePoolTotal > 256) throw new Error('USDG price-reference registry exceeds bounded safety limit')
      const poolAddresses = await batch(Array.from({ length: state.pricePoolTotal }, function (_, index) { return { target: addresses.priceVoter, iface: voterInterface, method: 'pools', args: [index], fallback: zero } }))
      const candidates = poolAddresses.filter(function (address) { return !isZero(address) }).map(function (address) { return { address: address, ready: false } })
      const groups = []
      for (let start = 0; start < candidates.length; start += 10) groups.push(candidates.slice(start, start + 10))
      await limited(groups, 3, async function (group) {
        const calls = []
        group.forEach(function (pool) {
          calls.push(
            { target: pool.address, iface: poolInterface, method: 'token0', fallback: zero },
            { target: pool.address, iface: poolInterface, method: 'token1', fallback: zero },
            { target: pool.address, iface: poolInterface, method: 'slot0', fallback: null, decode: function (value) { return value } },
            { target: pool.address, iface: poolInterface, method: 'liquidity', fallback: null },
          )
        })
        const values = await batch(calls); const tokenAddresses = []
        group.forEach(function (pool, index) {
          const offset = index * 4; pool.token0 = values[offset]; pool.token1 = values[offset + 1]; pool.slot0 = values[offset + 2]; pool.liquidity = values[offset + 3]
          pool.ready = !isZero(pool.token0) && !isZero(pool.token1) && pool.slot0 && pool.liquidity && !ethers.BigNumber.from(pool.liquidity).isZero()
          if (pool.ready) tokenAddresses.push(pool.token0, pool.token1)
        })
        await loadTokenMetadata(tokenAddresses)
        const balanceCalls = []
        group.filter(function (pool) { return pool.ready }).forEach(function (pool) {
          balanceCalls.push({ target: pool.token0, iface: iface(erc20Abi), method: 'balanceOf', args: [pool.address], fallback: null }, { target: pool.token1, iface: iface(erc20Abi), method: 'balanceOf', args: [pool.address], fallback: null })
        })
        const balances = await batch(balanceCalls); let cursor = 0
        group.forEach(function (pool) { if (pool.ready) { pool.balance0 = balances[cursor++]; pool.balance1 = balances[cursor++] } })
        state.pricePools = state.pricePools.concat(group.filter(function (pool) { return pool.ready }))
        computeMarket(); render()
      })
      state.priceReferenceDone = true
    } catch (error) {
      state.priceError = errorText(error)
      // The farm table remains useful even when the optional dollar anchor is
      // temporarily unavailable. Metrics stay unavailable rather than zero.
    }
  }

  function v2Spot (pair) {
    if (!pair || !pair.ready) return NaN
    const token0 = token(pair.token0); const token1 = token(pair.token1)
    const reserve0 = amountNumber(pair.reserves[0], token0.decimals); const reserve1 = amountNumber(pair.reserves[1], token1.decimals)
    return reserve0 > 0 && reserve1 > 0 ? reserve1 / reserve0 : NaN
  }
  function v3Spot (pool) {
    if (!pool || !pool.ready) return NaN
    const token0 = token(pool.token0); const token1 = token(pool.token1); const sqrt = Number((pool.slot0.sqrtPriceX96 || pool.slot0[0]).toString())
    const ratio = (sqrt / (2 ** 96)) ** 2 * (10 ** (token0.decimals - token1.decimals))
    return Number.isFinite(ratio) && ratio > 0 ? ratio : NaN
  }
  function edgeLiquidity (edge, knownToken, knownPrice) {
    const isZeroSide = lower(knownToken) === lower(edge.token0)
    const reserve = isZeroSide ? edge.balance0 : edge.balance1
    const info = token(knownToken); const units = amountNumber(reserve, info.decimals)
    return finite(units) && units > 0 && finite(knownPrice) ? units * knownPrice * 2 : 0
  }
  function putPrice (address, value, confidence) {
    if (!finite(value) || value <= 0 || !finite(confidence) || confidence <= 0) return false
    const key = lower(address); const previous = state.priceConfidence.get(key) || 0
    if (state.prices.has(key) && previous >= confidence) return false
    state.prices.set(key, value); state.priceConfidence.set(key, confidence); return true
  }
  function computeMarket () {
    state.prices = new Map([[lower(addresses.usdg), 1]]); state.priceConfidence = new Map([[lower(addresses.usdg), Number.MAX_VALUE]])
    const referenceEdges = state.pricePools.map(function (pool) { return { token0: pool.token0, token1: pool.token1, spot: v3Spot(pool), balance0: pool.balance0, balance1: pool.balance1 } }).filter(function (edge) { return finite(edge.spot) })
    const catnipEdges = state.pairs.filter(function (pair) { return pair.ready }).map(function (pair) { return { token0: pair.token0, token1: pair.token1, spot: v2Spot(pair), balance0: pair.reserves[0], balance1: pair.reserves[1] } }).filter(function (edge) { return finite(edge.spot) })
    const edges = referenceEdges.concat(catnipEdges)
    for (let pass = 0; pass < edges.length + 2; pass += 1) {
      let changed = false
      edges.forEach(function (edge) {
        const price0 = state.prices.get(lower(edge.token0)); const price1 = state.prices.get(lower(edge.token1))
        if (finite(price0) && !finite(price1)) changed = putPrice(edge.token1, price0 / edge.spot, edgeLiquidity(edge, edge.token0, price0)) || changed
        else if (finite(price1) && !finite(price0)) changed = putPrice(edge.token0, price1 * edge.spot, edgeLiquidity(edge, edge.token1, price1)) || changed
      })
      if (!changed) break
    }
    state.pairs.forEach(function (pair) {
      if (!pair.ready) return
      const value0 = amountNumber(pair.reserves[0], token(pair.token0).decimals); const value1 = amountNumber(pair.reserves[1], token(pair.token1).decimals)
      pair.price0 = state.prices.get(lower(pair.token0)); pair.price1 = state.prices.get(lower(pair.token1))
      pair.tvlUsd = finite(pair.price0) && finite(pair.price1) && finite(value0) && finite(value1) ? value0 * pair.price0 + value1 * pair.price1 : NaN
    })
    state.farms.forEach(function (farm) {
      const pair = state.pairs.find(function (candidate) { return lower(candidate.address) === lower(farm.lpToken) })
      farm.pair = pair || null; farm.rewardUnitsPerDay = amountNumber(farm.rewardPerDay, token(addresses.nip).decimals)
      if (pair && pair.ready && farm.deposited !== null && pair.supply && !ethers.BigNumber.from(pair.supply).isZero() && finite(pair.tvlUsd)) {
        farm.tvlUsd = pair.tvlUsd * amountNumber(farm.deposited, 18) / amountNumber(pair.supply, 18)
      } else farm.tvlUsd = NaN
      const nipUsd = state.prices.get(lower(addresses.nip))
      farm.apr = finite(farm.rewardUnitsPerDay) && farm.rewardUnitsPerDay > 0 && finite(nipUsd) && finite(farm.tvlUsd) && farm.tvlUsd > 0 ? farm.rewardUnitsPerDay * nipUsd * 365 / farm.tvlUsd * 100 : farm.rewardPerDay && ethers.BigNumber.from(farm.rewardPerDay).isZero() ? 0 : NaN
      farm.zeroYield = Boolean(farm.allocPoint && ethers.BigNumber.from(farm.allocPoint).isZero()) || (farm.rewardPerDay && ethers.BigNumber.from(farm.rewardPerDay).isZero())
    })
  }

  function bindWalletEvents (provider) {
    if (state.eventsBound || !provider || !provider.on) return
    state.eventsBound = true
    provider.on('accountsChanged', function () { refreshWallet(false).catch(function (error) { message(errorText(error), 'error'); render() }) })
    provider.on('chainChanged', function () { refreshWallet(false).catch(function (error) { message(errorText(error), 'error'); render() }) })
  }
  async function adoptWallet (provider, accounts, chainId, source) {
    if (!provider || !accounts || !accounts[0]) return false
    state.eip1193 = provider; state.wallet = new ethers.providers.Web3Provider(provider, 'any'); state.walletSource = source; state.account = ethers.utils.getAddress(accounts[0]); state.walletChain = chainId
    bindWalletEvents(provider); render()
    if (state.pairs.length && onChain()) await loadWalletState()
    return true
  }
  async function restoreInjectedWallet () {
    const provider = injectedWallet(); if (!provider) return false
    try {
      // Passive startup deliberately asks an injected wallet for nothing but
      // already-authorized accounts and its current chain id.
      const values = await Promise.all([provider.request({ method: 'eth_accounts' }), provider.request({ method: 'eth_chainId' })])
      return adoptWallet(provider, values[0], values[1], 'injected')
    } catch (_) { return false }
  }
  async function connectInjected () {
    const provider = injectedWallet(); if (!provider) throw new Error('No injected EIP-1193 wallet was found. Choose Other wallet to open WalletConnect.')
    const accounts = await provider.request({ method: 'eth_requestAccounts' }); const walletChain = await provider.request({ method: 'eth_chainId' })
    if (!accounts || !accounts[0]) throw new Error('No wallet account was selected.')
    await adoptWallet(provider, accounts, walletChain, 'injected'); message('Wallet connected. Reading direct Catnip balances and positions…', 'success')
  }
  async function connectOtherWallet () {
    // This dynamic import is intentionally the first time any Reown code can
    // load. It is never part of page startup or the primary wallet path.
    const reown = await import('./config.js'); const appKit = reown.createAppKitInstance(reownProjectId)
    if (!appKit) throw new Error('Other-wallet support is unavailable in this browser.')
    const provider = await appKit.getWalletProvider()
    if (provider && typeof provider.request === 'function') {
      const values = await Promise.all([provider.request({ method: 'eth_accounts' }), provider.request({ method: 'eth_chainId' })])
      if (values[0] && values[0][0]) return adoptWallet(provider, values[0], values[1], 'reown')
    }
    if (!state.reownUnsubscribe && appKit.subscribeAccount) state.reownUnsubscribe = appKit.subscribeAccount(function (account) {
      if (!account || !account.isConnected || !account.address) return
      appKit.getWalletProvider().then(async function (wallet) {
        const network = await wallet.request({ method: 'eth_chainId' }); await adoptWallet(wallet, [account.address], network, 'reown')
      }).catch(function (error) { message(errorText(error), 'error'); render() })
    })
    await appKit.open(); return false
  }
  async function switchNetwork () {
    const provider = activeWallet(); if (!provider) throw new Error('Connect a wallet first.')
    try { await provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] }) } catch (error) {
      if (error.code !== 4902) throw error
      await provider.request({ method: 'wallet_addEthereumChain', params: [{ chainId: chain.id, chainName: chain.name, nativeCurrency: chain.nativeCurrency, rpcUrls: [chain.rpc] }] })
    }
    await refreshWallet(true)
  }
  async function refreshWallet (announce) {
    const provider = activeWallet(); if (!provider) return
    state.loadingWallet = true; setLoading('Reading wallet LP balances, Prowl stakes, NIP locks, and approvals…'); render()
    try {
      const values = await Promise.all([provider.request({ method: 'eth_accounts' }), provider.request({ method: 'eth_chainId' })])
      state.account = values[0] && values[0][0] ? ethers.utils.getAddress(values[0][0]) : null; state.walletChain = values[1]
      if (state.account && onChain()) { await loadWalletState(); if (announce) message('Wallet state refreshed directly from Catnip contracts.', 'success') }
      else if (state.account && announce) message('Switch the wallet to Robinhood Chain before signing.', 'error')
    } finally { state.loadingWallet = false; if (!state.loadingRegistry && !state.loadingMarket) setLoading(); render() }
  }
  async function loadWalletState () {
    if (!state.account || !onChain()) return
    const selected = state.selectedPair; const selectedFarm = state.selectedFarm
    const ercInterface = iface(erc20Abi); const prowlInterface = iface(prowlAbi); const nipInterface = iface(nipAbi); const cacheInterface = iface(cacheAbi)
    const calls = []
    state.pairs.filter(function (pair) { return pair.ready }).forEach(function (pair) { calls.push({ target: pair.address, iface: ercInterface, method: 'balanceOf', args: [state.account], fallback: null }) })
    state.farms.forEach(function (farm) {
      calls.push({ target: addresses.prowl, iface: prowlInterface, method: 'userInfo', args: [farm.pid, state.account], fallback: null, decode: function (value) { return value } }, { target: addresses.prowl, iface: prowlInterface, method: 'pendingReward', args: [farm.pid, state.account], fallback: null })
    })
    calls.push(
      { target: addresses.nip, iface: nipInterface, method: 'balanceOf', args: [state.account], fallback: null },
      { target: addresses.nip, iface: nipInterface, method: 'lockOf', args: [state.account], fallback: null },
      { target: addresses.nip, iface: nipInterface, method: 'canUnlockAmount', args: [state.account], fallback: null },
      { target: addresses.cache, iface: cacheInterface, method: 'balanceOf', args: [state.account], fallback: null },
      { target: addresses.nip, iface: ercInterface, method: 'balanceOf', args: [addresses.cache], fallback: null },
      { target: addresses.cache, iface: cacheInterface, method: 'totalSupply', fallback: null },
      { target: addresses.nip, iface: ercInterface, method: 'allowance', args: [state.account, addresses.cache], fallback: null },
    )
    if (selected && selected.ready) {
      calls.push(
        { target: selected.token0, iface: ercInterface, method: 'balanceOf', args: [state.account], fallback: null },
        { target: selected.token1, iface: ercInterface, method: 'balanceOf', args: [state.account], fallback: null },
        { target: selected.token0, iface: ercInterface, method: 'allowance', args: [state.account, addresses.router], fallback: null },
        { target: selected.token1, iface: ercInterface, method: 'allowance', args: [state.account, addresses.router], fallback: null },
        { target: selected.address, iface: ercInterface, method: 'allowance', args: [state.account, addresses.router], fallback: null },
        { target: selected.address, iface: ercInterface, method: 'allowance', args: [state.account, addresses.prowl], fallback: null },
      )
    }
    const values = await batch(calls); let cursor = 0; state.walletPairs = new Map()
    state.pairs.filter(function (pair) { return pair.ready }).forEach(function (pair) { state.walletPairs.set(lower(pair.address), values[cursor++]) })
    state.walletFarms = new Map()
    state.farms.forEach(function (farm) { const info = values[cursor++]; const pending = values[cursor++]; state.walletFarms.set(farm.pid, { info: info, staked: info ? info[0] : null, pending: pending }) })
    state.walletState = { nip: values[cursor++], locked: values[cursor++], unlockable: values[cursor++], cacheShares: values[cursor++], cacheNip: values[cursor++], cacheSupply: values[cursor++], cacheAllowance: values[cursor++] }
    if (selected && selected.ready) state.walletState.selected = { balance0: values[cursor++], balance1: values[cursor++], allowance0: values[cursor++], allowance1: values[cursor++], allowanceRouterLp: values[cursor++], allowanceProwlLp: values[cursor++], farm: selectedFarm ? state.walletFarms.get(selectedFarm.pid) : null }
  }

  function needWallet () { if (!state.account) throw new Error('Connect a wallet first.'); if (!onChain()) throw new Error('Switch the wallet to Robinhood Chain first.'); if (state.sending) throw new Error('Wait for the pending transaction.') }
  async function send (to, contractInterface, method, args, label) {
    needWallet(); state.sending = true; render()
    try {
      const data = contractInterface.encodeFunctionData(method, args); const request = { to: to, data: data, from: state.account }
      message('Simulating ' + label + ' with eth_call before requesting a wallet signature…')
      await state.wallet.call(request)
      message('Wallet confirmation requested for ' + label + '…')
      const tx = await state.wallet.getSigner().sendTransaction({ to: to, data: data })
      message(label + ' sent: ' + tx.hash + '. Waiting for receipt…')
      await state.wallet.waitForTransaction(tx.hash)
      message(label + ' confirmed: ' + tx.hash, 'success')
      await narrowRefresh()
      return tx
    } finally { state.sending = false; render() }
  }
  async function narrowRefresh () {
    const pair = state.selectedPair; const farm = state.selectedFarm
    if (pair) { pair.ready = false; await hydratePairs([pair]) }
    if (farm) await hydrateFarmMetrics([farm])
    computeMarket(); await loadWalletState()
  }
  function parseDraft (key, info, label, allowZero) {
    const raw = String(state.draft[key] || '').trim()
    if (!raw) throw new Error(label + ' is required.')
    let parsed
    try { parsed = ethers.utils.parseUnits(raw, info.decimals) } catch (_) { throw new Error(label + ' must be a valid ' + info.symbol + ' amount.') }
    if (!allowZero && parsed.lte(0)) throw new Error(label + ' must be greater than zero.')
    return parsed
  }
  function enough (available, required) {
    try { return available !== undefined && available !== null && ethers.BigNumber.from(available).gte(required) } catch (_) { return false }
  }
  function needBalance (available, required, info, purpose) {
    if (!enough(available, required)) throw new Error('Insufficient ' + info.symbol + ' balance for ' + purpose + '.')
  }
  function needAllowance (available, required, info, purpose) {
    if (!enough(available, required)) throw new Error('Approve the exact typed ' + info.symbol + ' amount for ' + purpose + ' first.')
  }
  function needApproval (available, required, info, purpose) {
    if (enough(available, required)) throw new Error('Current ' + info.symbol + ' allowance already covers the typed ' + purpose + ' amount.')
  }
  function selectedWallet () {
    const wallet = state.walletState && state.walletState.selected
    if (!wallet) throw new Error('Wallet balances and allowances are still loading. Refresh the wallet and retry.')
    return wallet
  }
  async function approveExact (asset, spender, amount, info, purpose) {
    return send(asset, iface(erc20Abi), 'approve', [spender, amount], 'approve exactly ' + format(amount, info.decimals) + ' ' + info.symbol + ' for ' + purpose)
  }
  async function approveAddToken (side) {
    const pair = state.selectedPair; if (!pair || !pair.ready) throw new Error('Choose a loaded Alley pair first.')
    const wallet = selectedWallet(); const info = token(side === 0 ? pair.token0 : pair.token1); const key = side === 0 ? 'add0' : 'add1'
    const amount = parseDraft(key, info, info.symbol + ' desired')
    needBalance(side === 0 ? wallet.balance0 : wallet.balance1, amount, info, 'add liquidity')
    needApproval(side === 0 ? wallet.allowance0 : wallet.allowance1, amount, info, 'add-liquidity')
    return approveExact(side === 0 ? pair.token0 : pair.token1, addresses.router, amount, info, 'Alley Router add liquidity')
  }
  async function approveRemoveLp () {
    const pair = state.selectedPair; if (!pair || !pair.ready) throw new Error('Choose a loaded Alley pair first.')
    const wallet = selectedWallet(); const info = { symbol: 'LP', decimals: 18 }; const amount = parseDraft('removeLp', info, 'LP amount')
    needBalance(state.walletPairs.get(lower(pair.address)), amount, info, 'remove liquidity'); needApproval(wallet.allowanceRouterLp, amount, info, 'remove-liquidity')
    return approveExact(pair.address, addresses.router, amount, info, 'Alley Router remove liquidity')
  }
  async function approveStakeLp () {
    const pair = state.selectedPair; const farm = state.selectedFarm
    if (!pair || !pair.ready || !farm || lower(farm.lpToken) !== lower(pair.address)) throw new Error('Choose a MasterProwl Alley pair first.')
    const wallet = selectedWallet(); const info = { symbol: 'LP', decimals: 18 }; const amount = parseDraft('stakeLp', info, 'LP deposit')
    needBalance(state.walletPairs.get(lower(pair.address)), amount, info, 'stake LP'); needApproval(wallet.allowanceProwlLp, amount, info, 'LP-stake')
    return approveExact(pair.address, addresses.prowl, amount, info, 'MasterProwl stake')
  }
  async function approveCacheNip () {
    const info = token(addresses.nip); const wallet = state.walletState || {}; const amount = parseDraft('cacheNip', info, 'NIP to stake')
    needBalance(wallet.nip, amount, info, 'Cache stake'); needApproval(wallet.cacheAllowance, amount, info, 'Cache-stake')
    return approveExact(addresses.nip, addresses.cache, amount, info, 'Cache stake')
  }
  async function addLiquidity () {
    const pair = state.selectedPair; if (!pair || !pair.ready) throw new Error('Choose a loaded Alley pair first.')
    const wallet = selectedWallet(); const token0 = token(pair.token0); const token1 = token(pair.token1)
    const amount0 = parseDraft('add0', token0, token0.symbol + ' desired'); const amount1 = parseDraft('add1', token1, token1.symbol + ' desired')
    const minimum0 = String(state.draft.min0 || '').trim() ? parseDraft('min0', token0, token0.symbol + ' minimum', true) : ethers.constants.Zero
    const minimum1 = String(state.draft.min1 || '').trim() ? parseDraft('min1', token1, token1.symbol + ' minimum', true) : ethers.constants.Zero
    needBalance(wallet.balance0, amount0, token0, 'add liquidity'); needBalance(wallet.balance1, amount1, token1, 'add liquidity')
    needAllowance(wallet.allowance0, amount0, token0, 'add liquidity'); needAllowance(wallet.allowance1, amount1, token1, 'add liquidity')
    await send(addresses.router, iface(routerAbi), 'addLiquidity', [pair.token0, pair.token1, amount0, amount1, minimum0, minimum1, state.account, deadline()], 'add liquidity')
  }
  async function removeLiquidity () {
    const pair = state.selectedPair; if (!pair || !pair.ready) throw new Error('Choose a loaded Alley pair first.')
    const wallet = selectedWallet(); const token0 = token(pair.token0); const token1 = token(pair.token1); const lp = { symbol: 'LP', decimals: 18 }; const liquidity = parseDraft('removeLp', lp, 'LP amount')
    const minimum0 = String(state.draft.removeMin0 || '').trim() ? parseDraft('removeMin0', token0, token0.symbol + ' minimum', true) : ethers.constants.Zero
    const minimum1 = String(state.draft.removeMin1 || '').trim() ? parseDraft('removeMin1', token1, token1.symbol + ' minimum', true) : ethers.constants.Zero
    needBalance(state.walletPairs.get(lower(pair.address)), liquidity, lp, 'remove liquidity'); needAllowance(wallet.allowanceRouterLp, liquidity, lp, 'remove liquidity')
    await send(addresses.router, iface(routerAbi), 'removeLiquidity', [pair.token0, pair.token1, liquidity, minimum0, minimum1, state.account, deadline()], 'remove liquidity')
  }
  async function stake () {
    const pair = state.selectedPair; const farm = state.selectedFarm; if (!pair || !farm || lower(farm.lpToken) !== lower(pair.address)) throw new Error('The selected pair is not a MasterProwl farm.')
    const wallet = selectedWallet(); const lp = { symbol: 'LP', decimals: 18 }; const amount = parseDraft('stakeLp', lp, 'LP deposit')
    needBalance(state.walletPairs.get(lower(pair.address)), amount, lp, 'stake LP'); needAllowance(wallet.allowanceProwlLp, amount, lp, 'stake LP')
    await send(addresses.prowl, iface(prowlAbi), 'deposit', [farm.pid, amount, zero], 'stake LP')
  }
  async function withdraw () {
    const farm = state.selectedFarm; if (!farm) throw new Error('The selected pair is not a MasterProwl farm.')
    const lp = { symbol: 'LP', decimals: 18 }; const amount = parseDraft('withdrawLp', lp, 'LP withdrawal'); const wallet = state.walletFarms.get(farm.pid)
    needBalance(wallet && wallet.staked, amount, lp, 'withdraw LP'); await send(addresses.prowl, iface(prowlAbi), 'withdraw', [farm.pid, amount, zero], 'withdraw LP')
  }
  async function claim () { const farm = state.selectedFarm; if (!farm) throw new Error('Choose a farm to claim.'); await send(addresses.prowl, iface(prowlAbi), 'claimReward', [farm.pid], 'claim NIP rewards') }
  async function cacheEnter () {
    const info = token(addresses.nip); const wallet = state.walletState || {}; const amount = parseDraft('cacheNip', info, 'NIP to stake')
    needBalance(wallet.nip, amount, info, 'Cache stake'); needAllowance(wallet.cacheAllowance, amount, info, 'Cache stake')
    await send(addresses.cache, iface(cacheAbi), 'enter', [amount], 'stake NIP in Cache')
  }
  async function cacheLeave () {
    const info = { symbol: 'xNIP', decimals: 18 }; const amount = parseDraft('cacheShares', info, 'xNIP to unstake'); const wallet = state.walletState || {}
    needBalance(wallet.cacheShares, amount, info, 'unstake Cache'); await send(addresses.cache, iface(cacheAbi), 'leave', [amount], 'unstake Cache shares')
  }
  async function unlock () { await send(addresses.nip, iface(nipAbi), 'unlock', [], 'unlock NIP rewards') }

  function selectPair (pair) {
    state.selectedPair = pair; state.selectedFarm = state.farms.find(function (farm) { return lower(farm.lpToken) === lower(pair.address) }) || null
    if (state.account && onChain()) loadWalletState().then(render).catch(function (error) { message(errorText(error), 'error'); render() })
    render()
  }
  function renderWallet () {
    const node = section('Wallet')
    if (!state.account) {
      node.appendChild(e('pre', { text: injectedWallet() ? 'No authorized injected-wallet account. Public onchain farm reads are already running.' : 'No injected wallet found. Public onchain farm reads are already running.' }))
      append(node, action('Connect wallet', connectInjected), document.createTextNode(' '), action('Other wallet', connectOtherWallet))
      return node
    }
    node.appendChild(e('pre', { text: short(state.account) + ' via ' + state.walletSource + ' · ' + (onChain() ? 'Robinhood Chain ready.' : 'wallet is on ' + (state.walletChain || 'an unknown chain') + '.') }))
    append(node, action('Refresh wallet', function () { return refreshWallet(true) }), document.createTextNode(' ')); if (!onChain()) node.appendChild(action('Switch to Robinhood', switchNetwork))
    return node
  }
  function renderCoverage () {
    const node = section('Coverage')
    const readyPairs = state.pairs.filter(function (pair) { return pair.ready }).length; const readyFarms = state.farms.filter(function (farm) { return farm.ready }).length
    const pricedPairs = state.pairs.filter(function (pair) { return finite(pair.tvlUsd) }).length; const pricedFarms = state.farms.filter(function (farm) { return finite(farm.tvlUsd) }).length; const aprFarms = state.farms.filter(function (farm) { return finite(farm.apr) }).length
    const source = state.pricePoolTotal === null
      ? 'discovering USDG reference pools'
      : state.priceReferenceDone
        ? state.pricePoolTotal + '/' + state.pricePoolTotal + ' registry entries checked; ' + state.pricePools.length + ' liquid direct USDG-reference pools'
        : state.pricePools.length + '/' + state.pricePoolTotal + ' liquid direct USDG-reference pools hydrated'
    const nipUsd = state.prices.get(lower(addresses.nip)); const nipEdgeLiquidity = state.priceConfidence.get(lower(addresses.nip))
    node.appendChild(e('pre', { text: 'ALLEYS : ' + readyPairs + '/' + (state.factoryTotal === null ? '—' : state.factoryTotal) + ' factory pairs hydrated\nPROWLS : ' + readyFarms + '/' + (state.farmTotal === null ? '—' : state.farmTotal) + ' MasterProwl entries hydrated\nPRICING: ' + pricedPairs + '/' + readyPairs + ' AMM TVLs · ' + pricedFarms + '/' + readyFarms + ' farm TVLs · ' + aprFarms + '/' + readyFarms + ' APRs\nNIP/USDG: ' + money(nipUsd) + ' · strongest onchain reserve edge ' + money(nipEdgeLiquidity) + '\nANCHOR : USDG = $1; ' + source + (state.priceError ? '\nANCHOR : unavailable — ' + state.priceError : '') + '\nRULE   : unavailable values render as —, never as $0 or 0%.\n' }))
    return node
  }
  function renderFarms () {
    const node = section('MasterProwl farms')
    const active = state.farms.filter(function (farm) { return !farm.zeroYield }); const visible = state.showZero ? state.farms : active
    const toggle = action(state.showZero ? 'Hide zero-yield rows' : 'Show zero-yield rows', async function () { state.showZero = !state.showZero; render() })
    node.appendChild(e('pre', { text: 'DISCOVERY: MasterProwl poolLength() → poolInfo(pid) for every pid.\nVISIBLE  : ' + visible.length + '/' + state.farms.length + (state.showZero ? ' (including zero-yield)' : ' (zero-yield hidden)') + '\n' })); node.appendChild(toggle)
    const table = e('div', { className: 'catnip-table' })
    if (!visible.length) table.appendChild(e('pre', { text: '\nNo MasterProwl farms match this filter.\n' }))
    visible.forEach(function (farm) {
      const pair = farm.pair; const wallet = state.walletFarms.get(farm.pid); const row = e('article', { className: 'catnip-row' })
      const emission = format(farm.rewardPerDay, token(addresses.nip).decimals); const status = farm.zeroYield ? 'RETIRED / ZERO EMISSION' : farm.rewardPerDay === null ? 'EMISSION UNAVAILABLE' : 'LIVE EMISSION'
      const text = 'FARM ' + String(farm.pid).padStart(2, '0') + '  ' + (pair ? pairName(pair) : short(farm.lpToken)) + '  ' + status + '\n' +
        'TVL ' + money(farm.tvlUsd) + '  APR ' + percent(farm.apr) + '  REWARD ' + emission + ' NIP/day  ALLOC ' + format(farm.allocPoint, 0) + '\n' +
        'LP STAKED ' + format(farm.deposited, 18) + '  YOU ' + format(wallet && wallet.staked, 18) + ' LP  EARNED ' + format(wallet && wallet.pending, token(addresses.nip).decimals) + ' NIP'
      row.appendChild(e('pre', { text: text })); row.appendChild(action('Manage', async function () { if (pair) selectPair(pair) }, !pair)); table.appendChild(row)
    })
    node.appendChild(table); return node
  }
  function renderPairs () {
    const node = section('Alley AMM liquidity')
    node.appendChild(e('pre', { text: 'DISCOVERY: Alley Factory allPairsLength() → allPairs(index). Reserves are the pair’s current getReserves() state.\n' }))
    const table = e('div', { className: 'catnip-table' })
    state.pairs.forEach(function (pair) {
      const row = e('article', { className: 'catnip-row' }); const walletLp = state.walletPairs.get(lower(pair.address))
      const text = pair.ready ? ('POOL ' + String(pair.index).padStart(2, '0') + '  ' + pairName(pair) + (state.selectedPair === pair ? '  < SELECTED' : '') + '\nTVL ' + money(pair.tvlUsd) + '  RESERVES ' + format(pair.reserves[0], token(pair.token0).decimals) + ' ' + token(pair.token0).symbol + ' / ' + format(pair.reserves[1], token(pair.token1).decimals) + ' ' + token(pair.token1).symbol + '\nYOUR LP ' + format(walletLp, 18) + '  ' + short(pair.address)) : ('POOL ' + String(pair.index).padStart(2, '0') + '  ' + short(pair.address) + '  hydrating…')
      row.appendChild(e('pre', { text: text })); row.appendChild(action('Manage liquidity', async function () { selectPair(pair) }, !pair.ready)); table.appendChild(row)
    })
    node.appendChild(table); return node
  }
  function renderManager () {
    const pair = state.selectedPair; const node = section('Direct wallet actions')
    if (!pair || !pair.ready) { node.appendChild(e('pre', { text: 'Choose an Alley pair after discovery finishes.' })); return node }
    const token0 = token(pair.token0); const token1 = token(pair.token1); const wallet = state.walletState && state.walletState.selected; const farm = state.selectedFarm; const farmWallet = farm && state.walletFarms.get(farm.pid)
    node.appendChild(e('pre', { text: pairName(pair) + '\nPAIR  : ' + pair.address + '\nROUTER: ' + addresses.router + '\n' + (farm ? 'FARM  : MasterProwl #' + farm.pid + ' · deposit fee ' + (state.feeBps === null ? '—' : format(state.feeBps, 0) + ' bps') + '\n' : 'FARM  : This authoritative Alley pair is not in MasterProwl.\n') + 'APPROVAL: every approval sets only the current typed amount; no unlimited approvals.\nPRE-FLIGHT: every write is first simulated with the exact eth_call transaction, then receipt-confirmed and refreshed.\n' }))
    const liquidity = e('div')
    liquidity.appendChild(e('pre', { text: 'ADD / INCREASE (uses wrapped WETH where the pair contains WETH; no hidden swap or router quote)\n' }))
    append(liquidity, field(token0.symbol + ' desired', 'add0', token0.symbol), field(token1.symbol + ' desired', 'add1', token1.symbol), field(token0.symbol + ' min', 'min0', token0.symbol), field(token1.symbol + ' min', 'min1', token1.symbol))
    append(liquidity, e('pre', { text: 'Wallet: ' + format(wallet && wallet.balance0, token0.decimals) + ' ' + token0.symbol + ' · ' + format(wallet && wallet.balance1, token1.decimals) + ' ' + token1.symbol + '\n' }), action('Approve typed ' + token0.symbol, function () { return approveAddToken(0) }, !state.account || !onChain()), document.createTextNode(' '), action('Approve typed ' + token1.symbol, function () { return approveAddToken(1) }, !state.account || !onChain()), document.createTextNode(' '), action('Add liquidity', addLiquidity, !state.account || !onChain()))
    liquidity.appendChild(e('pre', { text: '\nREMOVE / EXIT\n' })); append(liquidity, field('LP amount', 'removeLp', 'LP'), field(token0.symbol + ' min', 'removeMin0', token0.symbol), field(token1.symbol + ' min', 'removeMin1', token1.symbol))
    append(liquidity, e('pre', { text: 'Wallet LP: ' + format(state.walletPairs.get(lower(pair.address)), 18) + ' · Router allowance: ' + format(wallet && wallet.allowanceRouterLp, 18) + '\n' }), action('Approve typed LP for router', approveRemoveLp, !state.account || !onChain()), document.createTextNode(' '), action('Remove liquidity', removeLiquidity, !state.account || !onChain()))
    node.appendChild(liquidity)
    if (farm) {
      const prowl = e('div'); prowl.appendChild(e('pre', { text: '\nMASTERPROWL / FARM\n' })); append(prowl, field('Deposit LP', 'stakeLp', 'LP'), field('Withdraw LP', 'withdrawLp', 'LP'))
      append(prowl, e('pre', { text: 'Your stake: ' + format(farmWallet && farmWallet.staked, 18) + ' LP · Earned: ' + format(farmWallet && farmWallet.pending, token(addresses.nip).decimals) + ' NIP · Prowl allowance: ' + format(wallet && wallet.allowanceProwlLp, 18) + '\n' }), action('Approve typed LP for Prowl', approveStakeLp, !state.account || !onChain()), document.createTextNode(' '), action('Stake LP', stake, !state.account || !onChain()), document.createTextNode(' '), action('Withdraw LP', withdraw, !state.account || !onChain()), document.createTextNode(' '), action('Claim NIP', claim, !state.account || !onChain()))
      node.appendChild(prowl)
    }
    const cache = e('div'); const walletState = state.walletState || {}
    cache.appendChild(e('pre', { text: '\nNIP LOCKS + CACHE\nWallet NIP: ' + format(walletState.nip, 18) + ' · Locked rewards: ' + format(walletState.locked, 18) + ' · Unlockable now: ' + format(walletState.unlockable, 18) + '\nCache: ' + format(walletState.cacheShares, 18) + ' xNIP shares backed by ' + format(walletState.cacheNip, 18) + ' NIP\n' }))
    append(cache, field('Stake NIP', 'cacheNip', 'NIP'), field('Unstake xNIP', 'cacheShares', 'xNIP'), action('Approve typed NIP for Cache', approveCacheNip, !state.account || !onChain()), document.createTextNode(' '), action('Stake in Cache', cacheEnter, !state.account || !onChain()), document.createTextNode(' '), action('Unstake Cache', cacheLeave, !state.account || !onChain()), document.createTextNode(' '), action('Unlock NIP', unlock, !state.account || !onChain()))
    node.appendChild(cache); return node
  }
  function render () {
    const app = state.app || byId('catnip-app'); if (!app) return
    state.app = app; app.textContent = ''
    if (state.message) { const status = e('pre', { text: 'STATUS : ' + state.message }); status.dataset.kind = state.messageType; app.appendChild(status) }
    app.appendChild(renderWallet()); app.appendChild(renderCoverage())
    if (state.loadingRegistry && !state.pairs.length) { app.appendChild(e('pre', { text: 'READING: Factory allPairsLength() and MasterProwl poolLength() directly on Robinhood RPC…' })); return }
    app.appendChild(renderFarms()); app.appendChild(renderPairs()); app.appendChild(renderManager())
    const note = e('p', { className: 'catnip-note', text: 'USD values are derived only when a live direct USDG path can be reconstructed from current onchain pool state. Catnip has no native WETH/USDG Alley pair, so the page reads the complete onchain reference-pool registry to anchor WETH, then Catnip reserves to value NIP and related LPs. No token, price, explorer, app, vfat, router, or indexer API is used.' })
    app.appendChild(note)
  }
  async function start () {
    state.app = byId('catnip-app'); state.rpc = new ethers.providers.JsonRpcProvider(chain.rpc, chain.number)
    setLoading('Reading Catnip’s complete onchain registries…'); render()
    const passiveWallet = restoreInjectedWallet(); await loadRegistry(); await passiveWallet
    if (state.account && onChain()) await loadWalletState(); render()
  }
  function fatal (error) {
    setLoading(); const app = byId('catnip-app'); if (!app) return
    app.textContent = ''; app.appendChild(e('pre', { text: 'CATNIP COULD NOT LOAD\n' + errorText(error) + '\nThis page only reads Robinhood’s official RPC. Check the connection and retry.' }))
  }
  return { start: start, fatal: fatal }
})()
