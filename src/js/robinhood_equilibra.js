/* Equilibra on Robinhood Chain: factory registry, pool oracle state, LP value growth, and EIP-1193. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { EquilibraPage.start().catch(EquilibraPage.fatal) })

const EquilibraPage = (function () {
  const chain = { id: '0x1237', number: 4663, rpc: 'https://rpc.mainnet.chain.robinhood.com' }
  const address = {
    factory: '0x7228b8110d9A85BD6740bE03677Eb6deDe0546a8',
    router: '0x07AdCfee4CfBCC6c949fDf366F423D67084c5d8a',
    weth: '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73',
    usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168',
    refV2Factory: '0x43B2Bf9f33036a02fC7A00935571c2A6b0108e66',
    refV3Factory: '0xE0c4ceb92d08CA985bB70fe0a22fEb121A9854A8',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  // Reference venues used only to carry a USDG price onto the pool tokens.
  const refSpacings = [1, 5, 10, 50, 100, 200, 2000]
  const secondsPerYear = 365 * 24 * 60 * 60
  const minPrice = 1e-12
  const maxPrice = 1e12
  const wad = 1e18
  const bps = 10000
  const minSqrtRatio = 4295128739
  const maxSqrtRatio = ethers.BigNumber.from('1461446703485210103287273052203988822378723970342')

  const multiAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const factoryAbi = [
    'function allPoolsLength() view returns(uint256)',
    'function allPools(uint256) view returns(address)',
    'function protocolFee() view returns(uint8)',
    'function getPoolBoost(address) view returns(address)',
    'function isPrivatePool(address) view returns(bool)',
    'event PoolCreated(address indexed token0,address indexed token1,address indexed pool,address creator,uint32 pairPoolIndex,uint256 poolCount,(uint64 aWad,uint64 lambdaWad,uint16 baseFee,uint32 emaPeriod,uint256 repegStepWad,uint256 repegThresholdToken1UpWad,uint256 repegThresholdToken1DownWad,uint16 feeRampBps,uint16 feeFloorBps,uint16 repegShareBps) config)'
  ]
  const poolAbi = [
    'function getPoolMetadata() view returns((address token0,address token1,address factory,uint32 pairPoolIndex))',
    'function getReserves() view returns(uint256,uint256)',
    'function getFeeConfig() view returns((uint16 baseFee,uint16 feeRampBps,uint16 feeFloorBps,uint16 repegShareBps,uint8 protocolFeePercent,uint32 emaPeriod,uint256 repegStepWad,uint256 repegThresholdToken1UpWad,uint256 repegThresholdToken1DownWad,uint8 parachuteBandMult))',
    'function getCurveParams() view returns((uint256 aWad,uint256 lambdaWad))',
    'function getOracleState() view returns((uint256 priceScaleWad,uint256 emaPriceWad,uint256 pMargWad,uint160 sqrtPriceX96))',
    'function getLpValueState() view returns((uint256 unitValueWad,uint256 genesisWad,uint256 growthWad))',
    'function totalSupply() view returns(uint256)',
    'function symbol() view returns(string)',
    'function paused() view returns(bool)',
    'function balanceOf(address) view returns(uint256)',
    'function allowance(address,address) view returns(uint256)',
    'function approve(address,uint256) returns(bool)',
    'function removeLiquidity(uint256 shares,uint256 minAmount0,uint256 minAmount1,address recipient) returns(uint256,uint256)'
  ]
  const routerAbi = [
    'function addLiquidity((address tokenA,address tokenB,uint32 poolIndex,address recipient,uint256 amountADesired,uint256 amountBDesired,uint256 minShares,uint256 deadline) params) payable returns(uint256 sharesOut)',
    'function zapInSingleSided((address tokenIn,address tokenOut,uint32 poolIndex,address recipient,uint256 amountIn,uint256 minLiquidity,uint256 deadline) params) payable returns(uint256 liquidity)',
    'function zapOutSingleSided((address tokenA,address tokenB,uint32 poolIndex,address tokenOut,address recipient,uint256 liquidity,uint256 minAmountOut,uint256 deadline) params) payable returns(uint256 amountOut)',
    'function previewZapIn(address tokenIn,address tokenOut,uint32 poolIndex,uint256 amountIn) view returns(uint256 liquidity,uint256 swapAmount)',
    'function previewZapOut(address tokenA,address tokenB,uint32 poolIndex,uint256 liquidity,address tokenOut) view returns(uint256 amountOut)'
  ]
  const erc20Abi = [
    'function symbol() view returns(string)', 'function decimals() view returns(uint8)',
    'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)',
    'function approve(address,uint256) returns(bool)'
  ]
  const refV2FactoryAbi = ['function getPair(address,address,bool) view returns(address)']
  const refV2PairAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function getReserves() view returns(uint256,uint256,uint256)']
  const refV3FactoryAbi = ['function getPool(address,address,int24) view returns(address)']
  const refV3PoolAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function slot0() view returns(uint160,int24,uint16,uint16,uint16,uint8,bool)']

  const factory = new ethers.utils.Interface(factoryAbi)
  const pool = new ethers.utils.Interface(poolAbi)
  const router = new ethers.utils.Interface(routerAbi)
  const erc20 = new ethers.utils.Interface(erc20Abi)
  const refV2Factory = new ethers.utils.Interface(refV2FactoryAbi)
  const refV2Pair = new ethers.utils.Interface(refV2PairAbi)
  const refV3Factory = new ethers.utils.Interface(refV3FactoryAbi)
  const refV3Pool = new ethers.utils.Interface(refV3PoolAbi)

  const state = {
    rpc: null, pools: [], tokens: new Map(), prices: new Map(), confidence: new Map(),
    head: null, now: null, protocolFee: null, showZero: false,
    eip1193: null, account: null, walletChain: null, walletSource: null, boundProvider: null, reownUnsubscribe: null,
    action: null, actionInfo: null, positions: [], sending: false, status: '', spinner: null
  }

  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const short = value => value ? value.slice(0, 6) + '…' + value.slice(-4) : '—'
  const finite = value => Number.isFinite(value) && value >= 0
  const correctChain = () => state.walletChain === chain.id
  const injected = () => window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null
  const token = value => state.tokens.get(lower(value)) || { address: value, symbol: short(value), decimals: null }
  const priceOf = value => state.prices.get(lower(value))
  const errText = error => String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').replace(/\s+/g, ' ').slice(0, 360)
  const compact = value => { if (!finite(value)) return '—'; if (value >= 1e9) return (value / 1e9).toFixed(2) + 'b'; if (value >= 1e6) return (value / 1e6).toFixed(2) + 'm'; if (value >= 1e3) return (value / 1e3).toFixed(2) + 'k'; if (value >= 1) return value.toFixed(2); return value > 0 ? value.toPrecision(3) : '0' }
  const usd = value => finite(value) ? '$' + compact(value) : '—'
  const percent = value => finite(value) ? compact(value) + '%' : '—'
  const signedPercent = value => Number.isFinite(value) ? (value >= 0 ? '+' : '-') + compact(Math.abs(value)) + '%' : '—'
  const rate = value => Number.isFinite(value) ? (value * 100).toFixed(2) + '%' : '—'
  const amountNum = (value, decimals) => { try { const number = Number(ethers.utils.formatUnits(value, decimals)); return Number.isFinite(number) ? number : NaN } catch (_) { return NaN } }
  const formatAmount = (value, decimals) => { try { const parts = ethers.utils.formatUnits(value, decimals).split('.'); const tail = (parts[1] || '').slice(0, 5).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'equilibra-action', disabled: disabled || state.sending }); node.addEventListener('click', function () { Promise.resolve(fn()).catch(error => setStatus(errText(error), 'error')) }); return node }
  const pause = delay => new Promise(resolve => window.setTimeout(resolve, delay))

  async function retryRpc (fn, attempts) {
    let lastError
    for (let attempt = 0; attempt < (attempts || 5); attempt += 1) {
      try { return await fn() } catch (error) { lastError = error; if (attempt + 1 < (attempts || 5)) await pause(250 * (2 ** attempt)) }
    }
    throw lastError
  }

  function setStatus (text, kind) { state.status = text || ''; const node = byId('equilibra-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (active) { const box = byId('equilibra-loading'); const spin = byId('equilibra-loading-spin'); if (!box) return; box.hidden = !active; if (active && !state.spinner) { let index = 0; state.spinner = window.setInterval(function () { spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) } if (!active && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }
  async function limited (items, count, fn) { const output = new Array(items.length); let next = 0; async function worker () { while (next < items.length) { const index = next++; output[index] = await fn(items[index], index) } } await Promise.all(Array.from({ length: Math.min(count, Math.max(1, items.length)) }, worker)); return output }

  async function batch (calls) {
    if (!calls.length) return []
    const groups = []; for (let i = 0; i < calls.length; i += 200) groups.push(calls.slice(i, i + 200))
    const multicall = new ethers.Contract(address.multicall, multiAbi, state.rpc)
    async function execute (group) {
      const encoded = group.map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }))
      const decode = function (call, raw) { try { const result = call.iface.decodeFunctionResult(call.method, raw); return call.decode ? call.decode(result) : result.length === 1 ? result[0] : result } catch (_) { return call.fallback } }
      try { const result = await retryRpc(() => multicall.aggregate3(encoded), 4); return result.map((item, index) => item.success ? decode(group[index], item.returnData) : group[index].fallback) } catch (_) {
        if (group.length > 8) { const middle = Math.ceil(group.length / 2); const halves = await Promise.all([execute(group.slice(0, middle)), execute(group.slice(middle))]); return halves[0].concat(halves[1]) }
        return limited(group, 4, async function (call, index) { try { return decode(call, await retryRpc(() => state.rpc.call({ to: call.target, data: encoded[index].callData }), 3)) } catch (_) { return call.fallback } })
      }
    }
    const values = await limited(groups, 3, execute)
    return [].concat(...values)
  }

  async function rpcJsonBatch (calls, timeout, attempts) {
    return retryRpc(async function () {
      const controller = new window.AbortController(); const timer = window.setTimeout(function () { controller.abort() }, timeout || 20000)
      try {
        const body = calls.map((call, index) => ({ jsonrpc: '2.0', id: index + 1, method: call.method, params: call.params })); const response = await window.fetch(chain.rpc, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: controller.signal }); const values = await response.json(); if (!response.ok || !Array.isArray(values)) throw new Error('RPC batch failed.'); const index = new Map(values.map(value => [value.id, value])); return body.map(value => index.get(value.id) || { error: { message: 'Missing RPC response.' } })
      } finally { window.clearTimeout(timer) }
    }, attempts || 5)
  }

  async function blockTimestamps (numbers) {
    if (!numbers.length) return new Map()
    const responses = await rpcJsonBatch(numbers.map(number => ({ method: 'eth_getBlockByNumber', params: [ethers.utils.hexValue(number), false] })), 15000)
    const stamps = new Map()
    responses.forEach(function (response, index) { const block = response && response.result; if (block && block.timestamp) stamps.set(numbers[index], Number(block.timestamp)) })
    return stamps
  }

  // Price of token1 in token0 units, from a Q64.96 sqrt ratio. Equilibra pools
  // project the same encoding as the reference V3 venues, so one path serves both.
  function priceFromSqrt (sqrtX96, decimals0, decimals1) {
    if (sqrtX96 === null || sqrtX96 === undefined) return NaN
    const raw = ethers.BigNumber.from(sqrtX96)
    if (raw.lte(minSqrtRatio) || raw.gte(maxSqrtRatio)) return NaN
    if (!Number.isFinite(decimals0) || !Number.isFinite(decimals1)) return NaN
    const ratio = Number(raw.toString()) / 2 ** 96
    const price = ratio * ratio * 10 ** (decimals0 - decimals1)
    return price > minPrice && price < maxPrice ? price : NaN
  }

  async function discover () {
    setStatus('Pools')
    const head = await retryRpc(() => state.rpc.getBlockNumber(), 4); state.head = head
    const globals = await batch([
      { target: address.factory, iface: factory, method: 'allPoolsLength', fallback: null },
      { target: address.factory, iface: factory, method: 'protocolFee', fallback: null }
    ])
    if (globals[0] === null) throw new Error('Equilibra factory unavailable.')
    state.protocolFee = globals[1] === null ? null : Number(globals[1])
    const count = Number(globals[0])
    const addresses = await batch(Array.from({ length: count }, (_, index) => ({ target: address.factory, iface: factory, method: 'allPools', args: [index], fallback: null })))
    const list = addresses.filter(Boolean)
    state.pools = list.map(value => ({ address: value, ready: false }))
    await loadGenesis()
    await hydratePools()
    await loadPrices()
  }

  // PoolCreated carries every pool's genesis block, which dates the LP unit-value
  // growth each pool reports. The factory emits few events, so one range covers it.
  async function loadGenesis () {
    const topic = factory.getEventTopic('PoolCreated')
    let logs = []
    try {
      const response = (await rpcJsonBatch([{ method: 'eth_getLogs', params: [{ address: address.factory, topics: [topic], fromBlock: '0x0', toBlock: ethers.utils.hexValue(state.head) }] }], 20000, 2))[0]
      if (response && Array.isArray(response.result)) logs = response.result
    } catch (_) { logs = [] }
    const blocks = new Map()
    logs.forEach(function (log) {
      try { const parsed = factory.parseLog(log); blocks.set(lower(parsed.args.pool), Number(log.blockNumber)) } catch (_) { /* skip */ }
    })
    const wanted = []
    state.pools.forEach(function (item) { const block = blocks.get(lower(item.address)); if (block !== undefined) { item.genesisBlock = block; if (!wanted.includes(block)) wanted.push(block) } })
    const stamps = await blockTimestamps(wanted.concat([state.head])).catch(() => new Map())
    state.now = stamps.get(state.head) || Math.floor(Date.now() / 1000)
    state.pools.forEach(function (item) { if (item.genesisBlock !== undefined) item.genesisAt = stamps.get(item.genesisBlock) || null })
  }

  async function hydratePools () {
    if (!state.pools.length) return
    const calls = []
    state.pools.forEach(function (item) {
      calls.push(
        { target: item.address, iface: pool, method: 'getPoolMetadata', fallback: null, decode: value => value[0] },
        { target: item.address, iface: pool, method: 'getReserves', fallback: null, decode: value => value },
        { target: item.address, iface: pool, method: 'getFeeConfig', fallback: null, decode: value => value[0] },
        { target: item.address, iface: pool, method: 'getOracleState', fallback: null, decode: value => value[0] },
        { target: item.address, iface: pool, method: 'getLpValueState', fallback: null, decode: value => value[0] },
        { target: item.address, iface: pool, method: 'getCurveParams', fallback: null, decode: value => value[0] },
        { target: item.address, iface: pool, method: 'totalSupply', fallback: null },
        { target: item.address, iface: pool, method: 'symbol', fallback: null },
        { target: item.address, iface: pool, method: 'paused', fallback: false },
        { target: address.factory, iface: factory, method: 'isPrivatePool', args: [item.address], fallback: false },
        { target: address.factory, iface: factory, method: 'getPoolBoost', args: [item.address], fallback: null }
      )
    })
    const values = await batch(calls)
    state.pools.forEach(function (item, index) {
      let cursor = index * 11
      item.meta = values[cursor++]; item.reserves = values[cursor++]; item.fee = values[cursor++]
      item.oracle = values[cursor++]; item.lpValue = values[cursor++]; item.curve = values[cursor++]
      item.supply = values[cursor++]; item.lpSymbol = values[cursor++]; item.paused = Boolean(values[cursor++])
      item.private = Boolean(values[cursor++]); const boost = values[cursor++]
      item.boost = boost && boost !== ethers.constants.AddressZero ? boost : null
      item.token0 = item.meta ? item.meta.token0 : null; item.token1 = item.meta ? item.meta.token1 : null
      item.poolIndex = item.meta ? Number(item.meta.pairPoolIndex) : 0
      item.ready = Boolean(item.token0 && item.token1 && item.reserves)
    })
    await loadTokens()
    state.pools.forEach(function (item) {
      if (!item.ready) return
      const info0 = token(item.token0); const info1 = token(item.token1)
      item.amounts = [amountNum(item.reserves[0], info0.decimals), amountNum(item.reserves[1], info1.decimals)]
      item.spot = item.oracle ? priceFromSqrt(item.oracle.sqrtPriceX96, info0.decimals, info1.decimals) : NaN
    })
  }

  async function loadTokens () {
    const wanted = []
    state.pools.forEach(function (item) { [item.token0, item.token1].forEach(function (value) { if (value && !state.tokens.has(lower(value)) && !wanted.includes(lower(value))) wanted.push(lower(value)) }) })
    if (!wanted.includes(lower(address.usdg))) wanted.push(lower(address.usdg))
    if (!wanted.includes(lower(address.weth))) wanted.push(lower(address.weth))
    if (!wanted.length) return
    const values = await batch([].concat(...wanted.map(value => [
      { target: value, iface: erc20, method: 'symbol', fallback: null },
      { target: value, iface: erc20, method: 'decimals', fallback: null }
    ])))
    wanted.forEach(function (value, index) {
      const symbol = values[index * 2]; const decimals = values[index * 2 + 1]
      state.tokens.set(value, { address: value, symbol: symbol || short(value), decimals: decimals === null ? null : Number(decimals) })
    })
  }

  // USDG anchors the graph. Reference venues carry it onto the pool tokens; the
  // Equilibra pools themselves then price whatever those venues do not reach.
  async function loadPrices () {
    setStatus('Prices')
    state.prices = new Map([[lower(address.usdg), 1]]); state.confidence = new Map([[lower(address.usdg), Number.MAX_VALUE]])
    const edges = await referenceEdges()
    state.pools.forEach(function (item) {
      if (!item.ready || !Number.isFinite(item.spot)) return
      edges.push({ token0: item.token0, token1: item.token1, price: item.spot, amount0: item.amounts[0], amount1: item.amounts[1] })
    })
    for (let round = 0; round < 8; round += 1) {
      let changed = false
      edges.forEach(function (edge) {
        const key0 = lower(edge.token0); const key1 = lower(edge.token1)
        const price0 = state.prices.get(key0); const price1 = state.prices.get(key1)
        const confidence0 = state.confidence.get(key0) || 0; const confidence1 = state.confidence.get(key1) || 0
        if (finite(price0) && edge.amount0 > 0) {
          const candidate = price0 / edge.price; const confidence = Math.min(confidence0, edge.amount0 * price0 * 2)
          if (candidate > minPrice && candidate < maxPrice && confidence > confidence1) { state.prices.set(key1, candidate); state.confidence.set(key1, confidence); changed = true }
        }
        if (finite(price1) && edge.amount1 > 0) {
          const candidate = edge.price * price1; const confidence = Math.min(confidence1, edge.amount1 * price1 * 2)
          if (candidate > minPrice && candidate < maxPrice && confidence > confidence0) { state.prices.set(key0, candidate); state.confidence.set(key0, confidence); changed = true }
        }
      })
      if (!changed) break
    }
    measurePools()
  }

  async function referenceEdges () {
    const wanted = []
    state.pools.forEach(function (item) { [item.token0, item.token1].forEach(function (value) { if (value && lower(value) !== lower(address.usdg) && !wanted.includes(lower(value))) wanted.push(lower(value)) }) })
    if (!wanted.includes(lower(address.weth))) wanted.push(lower(address.weth))
    const quotes = [address.usdg, address.weth]
    const lookups = []
    wanted.forEach(function (value) {
      quotes.forEach(function (quote) {
        if (lower(value) === lower(quote)) return
        refSpacings.forEach(spacing => lookups.push({ kind: 'v3', call: { target: address.refV3Factory, iface: refV3Factory, method: 'getPool', args: [value, quote, spacing], fallback: null } }))
        ;[false, true].forEach(stable => lookups.push({ kind: 'v2', call: { target: address.refV2Factory, iface: refV2Factory, method: 'getPair', args: [value, quote, stable], fallback: null } }))
      })
    })
    const found = await batch(lookups.map(item => item.call))
    const venues = []
    found.forEach(function (value, index) {
      if (!value || value === ethers.constants.AddressZero) return
      if (venues.some(venue => lower(venue.address) === lower(value))) return
      venues.push({ address: value, kind: lookups[index].kind })
    })
    if (!venues.length) return []
    const detail = await batch([].concat(...venues.map(function (venue) {
      const iface = venue.kind === 'v3' ? refV3Pool : refV2Pair
      return [
        { target: venue.address, iface, method: 'token0', fallback: null },
        { target: venue.address, iface, method: 'token1', fallback: null },
        venue.kind === 'v3'
          ? { target: venue.address, iface, method: 'slot0', fallback: null, decode: value => value }
          : { target: venue.address, iface, method: 'getReserves', fallback: null, decode: value => value }
      ]
    })))
    const edges = []
    const balanceCalls = []
    venues.forEach(function (venue, index) {
      venue.token0 = detail[index * 3]; venue.token1 = detail[index * 3 + 1]; venue.slot = detail[index * 3 + 2]
      if (!venue.token0 || !venue.token1 || !venue.slot) return
      if (venue.kind === 'v3') balanceCalls.push(
        { target: venue.token0, iface: erc20, method: 'balanceOf', args: [venue.address], fallback: null },
        { target: venue.token1, iface: erc20, method: 'balanceOf', args: [venue.address], fallback: null }
      )
    })
    const balances = await batch(balanceCalls)
    let balanceCursor = 0
    venues.forEach(function (venue) {
      if (!venue.token0 || !venue.token1 || !venue.slot) return
      const info0 = token(venue.token0); const info1 = token(venue.token1)
      if (info0.decimals === null || info1.decimals === null) return
      let price = NaN; let amount0 = NaN; let amount1 = NaN
      if (venue.kind === 'v3') {
        price = priceFromSqrt(venue.slot[0], info0.decimals, info1.decimals)
        amount0 = amountNum(balances[balanceCursor++], info0.decimals); amount1 = amountNum(balances[balanceCursor++], info1.decimals)
      } else {
        amount0 = amountNum(venue.slot[0], info0.decimals); amount1 = amountNum(venue.slot[1], info1.decimals)
        price = amount0 > 0 ? amount1 / amount0 : NaN
      }
      if (!Number.isFinite(price) || price <= 0) return
      edges.push({ token0: venue.token0, token1: venue.token1, price, amount0, amount1 })
    })
    return edges
  }

  function measurePools () {
    state.pools.forEach(function (item) {
      if (!item.ready) { item.tvl = NaN; item.apr = NaN; return }
      const price0 = priceOf(item.token0); const price1 = priceOf(item.token1)
      item.tvl = finite(price0) && finite(price1) ? item.amounts[0] * price0 + item.amounts[1] * price1 : NaN
      const growth = item.lpValue ? Number(ethers.utils.formatUnits(item.lpValue.growthWad, 18)) : NaN
      const genesis = item.lpValue ? Number(ethers.utils.formatUnits(item.lpValue.genesisWad, 18)) : NaN
      item.growthRatio = Number.isFinite(growth) && genesis > 0 ? growth / genesis : NaN
      item.ageSeconds = item.genesisAt && state.now && state.now > item.genesisAt ? state.now - item.genesisAt : NaN
      item.apr = Number.isFinite(item.growthRatio) && Number.isFinite(item.ageSeconds) ? item.growthRatio * secondsPerYear / item.ageSeconds * 100 : NaN
      const scale = item.oracle ? Number(ethers.utils.formatUnits(item.oracle.priceScaleWad, 18)) : NaN
      const ema = item.oracle ? Number(ethers.utils.formatUnits(item.oracle.emaPriceWad, 18)) : NaN
      item.drift = Number.isFinite(scale) && scale > 0 && Number.isFinite(ema) ? (ema / scale - 1) * 100 : NaN
      const up = item.fee ? Number(ethers.utils.formatUnits(item.fee.repegThresholdToken1UpWad, 18)) : NaN
      const down = item.fee ? Number(ethers.utils.formatUnits(item.fee.repegThresholdToken1DownWad, 18)) : NaN
      item.band = Number.isFinite(up) && Number.isFinite(down) ? (item.drift >= 0 ? up : down) * 100 : NaN
      item.step = item.fee ? Number(ethers.utils.formatUnits(item.fee.repegStepWad, 18)) * 100 : NaN
    })
  }

  function poolName (item) { return token(item.token0).symbol + ' / ' + token(item.token1).symbol }
  function poolTvl () { return state.pools.reduce((total, item) => total + (finite(item.tvl) ? item.tvl : 0), 0) }
  function pricedCount () { const wanted = new Set(); state.pools.forEach(function (item) { if (item.token0) wanted.add(lower(item.token0)); if (item.token1) wanted.add(lower(item.token1)) }); let priced = 0; wanted.forEach(function (value) { if (finite(state.prices.get(value))) priced += 1 }); return { priced, total: wanted.size } }

  function addHeader (table, labels) { const head = e('thead'); const row = e('tr'); labels.forEach(label => row.appendChild(e('th', { text: label }))); head.appendChild(row); table.appendChild(head) }
  function addCell (row, text, className) { const cell = e('td', { text }); if (className) cell.className = className; row.appendChild(cell); return cell }

  function renderSummary () {
    const node = byId('equilibra-summary'); if (!node) return
    const coverage = pricedCount()
    const live = state.pools.filter(item => item.ready).length
    node.textContent = 'Equilibra ' + usd(poolTvl()) + ' TVL · ' + live + ' pools · ' + coverage.priced + '/' + coverage.total + ' priced'
  }

  function renderPools () {
    const host = byId('equilibra-pools'); if (!host) return; host.textContent = ''
    const visible = state.pools.filter(item => item.ready && (state.showZero || finite(item.apr) && item.apr > 0 || finite(item.tvl) && item.tvl > 0))
    if (!visible.length) { const empty = e('p', { className: 'equilibra-summary' }); empty.textContent = state.pools.length ? 'No live pools. ' : 'No pools.'; if (state.pools.length) empty.appendChild(button(state.showZero ? 'hide idle pools' : 'show idle pools', function () { state.showZero = !state.showZero; render() })); host.appendChild(empty); return }
    visible.sort((a, b) => (b.tvl || 0) - (a.tvl || 0) || (b.apr || 0) - (a.apr || 0))
    const table = e('table', { className: 'equilibra-table' })
    addHeader(table, ['Pool', 'TVL', 'Fee', 'LP APR', 'Anchor drift', 'Actions'])
    const body = e('tbody')
    visible.forEach(function (item) {
      const info0 = token(item.token0); const info1 = token(item.token1)
      const row = e('tr')
      const name = e('td')
      append(name, e('span', { className: 'equilibra-name', text: poolName(item) }), e('span', { className: 'equilibra-sub', text: formatAmount(item.reserves[0], info0.decimals) + ' ' + info0.symbol + ' · ' + formatAmount(item.reserves[1], info1.decimals) + ' ' + info1.symbol + (item.paused ? ' · paused' : '') + (item.private ? ' · private' : '') }))
      row.appendChild(name)
      addCell(row, usd(item.tvl), finite(item.tvl) ? '' : 'equilibra-unpriced')
      const fee = addCell(row, item.fee ? (item.fee.feeFloorBps / bps * 100).toFixed(2) + '% — ' + (item.fee.baseFee / bps * 100).toFixed(2) + '%' : '—')
      if (item.fee) fee.appendChild(e('span', { className: 'equilibra-sub', text: 'ramp ' + (item.fee.feeRampBps / bps * 100).toFixed(0) + '% · protocol ' + item.fee.protocolFeePercent + '%' }))
      const apr = addCell(row, percent(item.apr), finite(item.apr) ? '' : 'equilibra-unpriced')
      if (Number.isFinite(item.ageSeconds)) apr.appendChild(e('span', { className: 'equilibra-sub', text: (item.ageSeconds / 86400).toFixed(1) + 'd realized' }))
      const drift = addCell(row, signedPercent(item.drift))
      if (Number.isFinite(item.band)) drift.appendChild(e('span', { className: 'equilibra-sub', text: 'band ' + item.band.toFixed(2) + '% · step ' + item.step.toFixed(2) + '%' }))
      const actions = e('td', { className: 'equilibra-actions' })
      append(actions,
        button('add', function () { return openAction(item, 'add') }),
        button('zap in', function () { return openAction(item, 'zapIn') }),
        button('remove', function () { return openAction(item, 'remove') }),
        button('zap out', function () { return openAction(item, 'zapOut') }))
      row.appendChild(actions)
      body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function renderPositions () {
    const host = byId('equilibra-positions'); if (!host) return; host.textContent = ''
    host.hidden = !state.account || !state.positions.length
    if (host.hidden) return
    const table = e('table', { className: 'equilibra-table' })
    addHeader(table, ['Position', 'LP', 'Value', 'Share', 'Actions'])
    const body = e('tbody')
    state.positions.forEach(function (position) {
      const item = position.pool; const row = e('tr')
      const name = e('td')
      append(name, e('span', { className: 'equilibra-name', text: poolName(item) }), e('span', { className: 'equilibra-sub', text: item.lpSymbol || '#' + item.poolIndex }))
      row.appendChild(name)
      addCell(row, formatAmount(position.balance, 18))
      addCell(row, usd(position.value), finite(position.value) ? '' : 'equilibra-unpriced')
      addCell(row, percent(position.share))
      const actions = e('td', { className: 'equilibra-actions' })
      append(actions,
        button('add', function () { return openAction(item, 'add') }),
        button('remove', function () { return openAction(item, 'remove') }),
        button('zap out', function () { return openAction(item, 'zapOut') }))
      row.appendChild(actions)
      body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function renderWallet () { const node = byId('equilibra-wallet-status'); if (!node) return; node.textContent = state.account ? short(state.account) + (correctChain() ? '' : ' · wrong chain') + ' ' : '' }
  function render () { renderWallet(); renderSummary(); renderPools(); renderPositions(); const toggle = byId('equilibra-zero-toggle'); if (toggle) toggle.textContent = state.showZero ? '[ hide idle pools ]' : '[ show idle pools ]' }

  async function loadPositions () {
    if (!state.account || !correctChain() || !state.pools.length) { state.positions = []; renderPositions(); return }
    const live = state.pools.filter(item => item.ready)
    const balances = await batch(live.map(item => ({ target: item.address, iface: pool, method: 'balanceOf', args: [state.account], fallback: null })))
    state.positions = []
    live.forEach(function (item, index) {
      const balance = balances[index]
      if (!balance || balance.isZero()) return
      const units = amountNum(balance, 18); const supply = amountNum(item.supply, 18)
      const share = supply > 0 ? units / supply * 100 : NaN
      const value = finite(item.tvl) && supply > 0 ? item.tvl * units / supply : NaN
      state.positions.push({ pool: item, balance, share, value })
    })
    renderPositions()
  }

  function requireWallet () { if (!state.account || !state.eip1193) throw new Error('Connect wallet.'); if (!correctChain()) throw new Error('Switch to Robinhood Chain.') }
  function deadline () { return Math.floor(Date.now() / 1000) + 1200 }
  function parseAmount (value, info, label) { if (!info || info.decimals === null) throw new Error(label + ' token metadata unavailable.'); try { const amount = ethers.utils.parseUnits(String(value || '').trim(), info.decimals); if (amount.lte(0)) throw new Error(); return amount } catch (_) { throw new Error('Enter ' + label + '.') } }
  function parseMinimum (value, info, label) { if (!info || info.decimals === null) throw new Error(label + ' token metadata unavailable.'); try { const amount = ethers.utils.parseUnits(String(value || '').trim(), info.decimals); if (amount.lt(0)) throw new Error(); return amount } catch (_) { throw new Error('Enter ' + label + '.') } }
  function dialogField (host, label, key, value) { const row = e('div', { className: 'equilibra-input' }); const input = e('input'); input.type = 'text'; input.inputMode = 'decimal'; input.autocomplete = 'off'; input.value = value || ''; input.addEventListener('input', function () { if (state.action) state.action[key] = input.value }); append(row, e('label', { text: label }), input); host.appendChild(row); return input }
  function dialogButtonRow (host, buttons) { const row = e('div', { className: 'equilibra-dialog-actions' }); buttons.forEach(item => row.appendChild(button(item[0], item[1], item[2]))); host.appendChild(row) }
  function showDialog () { const dialog = byId('equilibra-action-dialog'); if (dialog && !dialog.open) dialog.showModal() }

  function zapIn (action) { return action.mode === 'zapIn' }
  function zapSide (action) { const item = action.pool; return action.side === 1 ? { inToken: item.token1, outToken: item.token0 } : { inToken: item.token0, outToken: item.token1 } }

  async function openAction (item, mode) {
    requireWallet()
    state.action = { pool: item, mode, side: 0, amount0: '', amount1: '', minShares: '0', shares: '', min0: '0', min1: '0', amountIn: '', minLiquidity: '0', minOut: '0' }
    state.actionInfo = null; renderAction(); showDialog(); await loadActionInfo()
  }

  async function loadActionInfo () {
    if (!state.action || !state.account || !correctChain()) { state.actionInfo = null; renderAction(); return }
    const item = state.action.pool
    const values = await batch([
      { target: item.token0, iface: erc20, method: 'balanceOf', args: [state.account], fallback: null },
      { target: item.token1, iface: erc20, method: 'balanceOf', args: [state.account], fallback: null },
      { target: item.token0, iface: erc20, method: 'allowance', args: [state.account, address.router], fallback: null },
      { target: item.token1, iface: erc20, method: 'allowance', args: [state.account, address.router], fallback: null },
      { target: item.address, iface: pool, method: 'balanceOf', args: [state.account], fallback: null },
      { target: item.address, iface: pool, method: 'allowance', args: [state.account, address.router], fallback: null }
    ])
    state.actionInfo = { balance0: values[0], balance1: values[1], allowance0: values[2], allowance1: values[3], lpBalance: values[4], lpAllowance: values[5] }
    renderAction()
  }

  function renderAction () {
    const host = byId('equilibra-action-content'); if (!host) return; host.textContent = ''
    const action = state.action; if (!action) return
    const item = action.pool; const info0 = token(item.token0); const info1 = token(item.token1)
    host.appendChild(e('h2', { id: 'equilibra-action-title', text: poolName(item) }))
    if (state.actionInfo) host.appendChild(e('p', { text: formatAmount(state.actionInfo.balance0, info0.decimals) + ' ' + info0.symbol + ' · ' + formatAmount(state.actionInfo.balance1, info1.decimals) + ' ' + info1.symbol + ' · ' + formatAmount(state.actionInfo.lpBalance, 18) + ' LP' }))
    if (action.mode === 'add') {
      dialogField(host, info0.symbol, 'amount0', action.amount0); dialogField(host, info1.symbol, 'amount1', action.amount1); dialogField(host, 'LP min', 'minShares', action.minShares)
      dialogButtonRow(host, [['approve ' + info0.symbol, function () { return approveFor('token0') }], ['approve ' + info1.symbol, function () { return approveFor('token1') }], ['add', submitAction]])
      return
    }
    if (action.mode === 'remove') {
      dialogField(host, 'LP', 'shares', action.shares); dialogField(host, info0.symbol + ' min', 'min0', action.min0); dialogField(host, info1.symbol + ' min', 'min1', action.min1)
      dialogButtonRow(host, [['remove', submitAction]])
      return
    }
    if (action.mode === 'zapIn') {
      const side = zapSide(action); const inInfo = token(side.inToken)
      dialogField(host, inInfo.symbol, 'amountIn', action.amountIn); dialogField(host, 'LP min', 'minLiquidity', action.minLiquidity)
      dialogButtonRow(host, [['use ' + token(action.side === 1 ? item.token0 : item.token1).symbol, function () { action.side = action.side === 1 ? 0 : 1; action.amountIn = ''; action.minLiquidity = '0'; renderAction() }], ['quote', quoteAction], ['approve ' + inInfo.symbol, function () { return approveFor('zapIn') }], ['zap in', submitAction]])
      return
    }
    const outInfo = token(action.side === 1 ? item.token1 : item.token0)
    dialogField(host, 'LP', 'shares', action.shares); dialogField(host, outInfo.symbol + ' min', 'minOut', action.minOut)
    dialogButtonRow(host, [['take ' + token(action.side === 1 ? item.token0 : item.token1).symbol, function () { action.side = action.side === 1 ? 0 : 1; action.minOut = '0'; renderAction() }], ['quote', quoteAction], ['approve LP', function () { return approveFor('lp') }], ['zap out', submitAction]])
  }

  async function quoteAction () {
    requireWallet(); const action = state.action; const item = action.pool
    const contract = new ethers.Contract(address.router, routerAbi, state.rpc)
    if (zapIn(action)) {
      const side = zapSide(action); const inInfo = token(side.inToken)
      const amountIn = parseAmount(action.amountIn, inInfo, inInfo.symbol + ' amount')
      const preview = await contract.previewZapIn(side.inToken, side.outToken, item.poolIndex, amountIn)
      action.minLiquidity = formatAmount(preview.liquidity.mul(995).div(1000), 18)
      setStatus(formatAmount(preview.liquidity, 18) + ' LP · swap ' + formatAmount(preview.swapAmount, inInfo.decimals) + ' ' + inInfo.symbol)
    } else {
      const outToken = action.side === 1 ? item.token1 : item.token0; const outInfo = token(outToken)
      const shares = parseAmount(action.shares, { decimals: 18 }, 'LP amount')
      const amountOut = await contract.previewZapOut(item.token0, item.token1, item.poolIndex, shares, outToken)
      action.minOut = formatAmount(amountOut.mul(995).div(1000), outInfo.decimals)
      setStatus(formatAmount(amountOut, outInfo.decimals) + ' ' + outInfo.symbol)
    }
    renderAction()
  }

  function approvalAmount (side) {
    const action = state.action; const item = action.pool
    if (side === 'lp') return { token: item.address, info: { symbol: 'LP', decimals: 18 }, amount: parseAmount(action.shares, { decimals: 18 }, 'LP amount') }
    if (side === 'zapIn') { const zap = zapSide(action); const info = token(zap.inToken); return { token: zap.inToken, info, amount: parseAmount(action.amountIn, info, info.symbol + ' amount') } }
    const first = side === 'token0'; const info = token(first ? item.token0 : item.token1)
    return { token: first ? item.token0 : item.token1, info, amount: parseAmount(first ? action.amount0 : action.amount1, info, info.symbol + ' amount') }
  }

  async function preflight (tx) { try { await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data, value: tx.value || '0x0' }, 'latest'] }) } catch (error) { throw new Error('Preflight failed: ' + errText(error)) } }
  async function send (tx, approvalOnly) {
    await preflight(tx); setStatus('Confirm in wallet…')
    const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data, value: tx.value || '0x0' }] })
    setStatus(hash + ' · pending')
    const receipt = await state.rpc.waitForTransaction(hash, 1, 180000)
    if (!receipt || receipt.status !== 1) throw new Error('Transaction failed.')
    setStatus('')
    if (approvalOnly) await loadActionInfo(); else await refreshAfterAction()
  }

  async function approveFor (side) {
    requireWallet(); const approval = approvalAmount(side)
    state.sending = true; renderAction()
    try { await send({ to: approval.token, data: erc20.encodeFunctionData('approve', [address.router, approval.amount]) }, true) } finally { state.sending = false; renderAction() }
  }

  function requireZeroMinimumConfirmation (minimums) { if (minimums.some(value => value.isZero()) && !window.confirm('A zero minimum allows any execution price. Continue?')) throw new Error('Cancelled.') }

  function buildAction () {
    requireWallet(); const action = state.action; const item = action.pool
    const info0 = token(item.token0); const info1 = token(item.token1)
    if (action.mode === 'add') {
      const amount0 = parseAmount(action.amount0, info0, info0.symbol + ' amount'); const amount1 = parseAmount(action.amount1, info1, info1.symbol + ' amount')
      const minShares = parseMinimum(action.minShares, { decimals: 18 }, 'LP minimum'); requireZeroMinimumConfirmation([minShares])
      return { to: address.router, data: router.encodeFunctionData('addLiquidity', [[item.token0, item.token1, item.poolIndex, state.account, amount0, amount1, minShares, deadline()]]) }
    }
    if (action.mode === 'remove') {
      const shares = parseAmount(action.shares, { decimals: 18 }, 'LP amount')
      const min0 = parseMinimum(action.min0, info0, info0.symbol + ' minimum'); const min1 = parseMinimum(action.min1, info1, info1.symbol + ' minimum')
      requireZeroMinimumConfirmation([min0, min1])
      // The pool burns the caller's own shares, so withdrawal needs no approval.
      return { to: item.address, data: pool.encodeFunctionData('removeLiquidity', [shares, min0, min1, state.account]) }
    }
    if (action.mode === 'zapIn') {
      const side = zapSide(action); const inInfo = token(side.inToken)
      const amountIn = parseAmount(action.amountIn, inInfo, inInfo.symbol + ' amount')
      const minLiquidity = parseMinimum(action.minLiquidity, { decimals: 18 }, 'LP minimum'); requireZeroMinimumConfirmation([minLiquidity])
      return { to: address.router, data: router.encodeFunctionData('zapInSingleSided', [[side.inToken, side.outToken, item.poolIndex, state.account, amountIn, minLiquidity, deadline()]]) }
    }
    const outToken = action.side === 1 ? item.token1 : item.token0; const outInfo = token(outToken)
    const shares = parseAmount(action.shares, { decimals: 18 }, 'LP amount')
    const minOut = parseMinimum(action.minOut, outInfo, outInfo.symbol + ' minimum'); requireZeroMinimumConfirmation([minOut])
    return { to: address.router, data: router.encodeFunctionData('zapOutSingleSided', [[item.token0, item.token1, item.poolIndex, outToken, state.account, shares, minOut, deadline()]]) }
  }

  async function submitAction () { state.sending = true; renderAction(); try { await send(buildAction()) } finally { state.sending = false; renderAction() } }

  async function refreshAfterAction () {
    const dialog = byId('equilibra-action-dialog'); if (dialog && dialog.open) dialog.close()
    state.action = null; state.actionInfo = null
    await hydratePools(); await loadPrices(); await loadPositions(); render()
  }

  function bindProvider (provider) {
    if (!provider || state.boundProvider === provider || !provider.on) return; state.boundProvider = provider
    provider.on('accountsChanged', function (accounts) { adopt(provider, accounts || [], state.walletChain, state.walletSource).catch(error => setStatus(errText(error), 'error')) })
    provider.on('chainChanged', function (chainId) { adopt(provider, state.account ? [state.account] : [], chainId, state.walletSource).catch(error => setStatus(errText(error), 'error')) })
  }

  async function adopt (provider, accounts, chainId, source) {
    state.eip1193 = provider; state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
    state.walletChain = chainId; state.walletSource = source || 'wallet'; bindProvider(provider); render()
    if (state.account && correctChain()) await loadPositions(); else { state.positions = []; renderPositions() }
  }

  async function restoreInjected () {
    const provider = injected(); if (!provider) return
    const accounts = await provider.request({ method: 'eth_accounts' }); const chainId = await provider.request({ method: 'eth_chainId' })
    if (accounts && accounts[0]) await adopt(provider, accounts, chainId, 'injected')
  }

  async function connectInjected () {
    const provider = injected(); if (!provider) { setStatus('No injected wallet.', 'error'); return }
    const accounts = await provider.request({ method: 'eth_requestAccounts' }); const chainId = await provider.request({ method: 'eth_chainId' })
    await adopt(provider, accounts, chainId, 'injected'); if (!correctChain()) setStatus('Switch to Robinhood Chain.', 'error')
  }

  async function connectOther () {
    const reown = await import('./config.js'); if (!reown.REOWN_PROJECT_ID) throw new Error('Other wallet unavailable.')
    const kit = reown.createAppKitInstance(); if (!kit) throw new Error('Other wallet unavailable.')
    const onAccount = async function (accountState) { if (!accountState || !accountState.isConnected) return; const provider = await kit.getWalletProvider(); await adopt(provider, await provider.request({ method: 'eth_accounts' }), await provider.request({ method: 'eth_chainId' }), 'other wallet'); if (state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null } }
    if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true })
    if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error')))
    await kit.open()
  }

  async function refresh () {
    state.pools = []; state.tokens = new Map(); state.prices = new Map(); state.confidence = new Map(); state.positions = []
    render(); loading(true)
    try { await discover(); await loadPositions() } finally { loading(false) }
    setStatus(''); render()
  }

  function bindUi () {
    byId('equilibra-connect').addEventListener('click', function () { connectInjected().catch(error => setStatus(errText(error), 'error')) })
    byId('equilibra-other-wallet').addEventListener('click', function () { connectOther().catch(error => setStatus(errText(error), 'error')) })
    byId('equilibra-zero-toggle').addEventListener('click', function () { state.showZero = !state.showZero; render() })
    byId('equilibra-refresh').addEventListener('click', function () { refresh().catch(fatal) })
  }

  async function start () {
    state.rpc = new ethers.providers.StaticJsonRpcProvider({ url: chain.rpc, timeout: 12000 }, { chainId: chain.number, name: 'robinhood' })
    bindUi()
    const passive = restoreInjected().catch(error => setStatus(errText(error), 'error'))
    await discover()
    await passive
    await loadPositions()
    loading(false)
    if (['Pools', 'Prices'].includes(state.status)) setStatus('')
    render()
  }

  function fatal (error) { console.error(error); loading(false); setStatus(errText(error), 'error'); render() }

  return { start, fatal }
})()
