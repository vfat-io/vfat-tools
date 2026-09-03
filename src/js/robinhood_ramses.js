/* Ramses on Robinhood Chain: direct factories, fee logs, RPC, and EIP-1193. */
const { ethers } = require('ethers')
const v3Registry = require('./robinhood_ramses_registry.js')

document.addEventListener('DOMContentLoaded', function () { RamsesPage.start().catch(RamsesPage.fatal) })

const RamsesPage = (function () {
  const chain = { id: '0x1237', number: 4663, rpc: 'https://rpc.mainnet.chain.robinhood.com' }
  const address = {
    usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168',
    v2Factory: '0x43B2Bf9f33036a02fC7A00935571c2A6b0108e66',
    v2Router: '0x33D3CDD45E4D64Ea762574789A2DB4842EC8262E',
    v3Factory: '0xE0c4ceb92d08CA985bB70fe0a22fEb121A9854A8',
    v3Manager: '0x2eBd7B85a4E08D5B508b04BA147976C94afE6590',
    dlmmFactory: '0xdcD5F77697914E27f56FD263EF82923C8524AbAc',
    dlmmRouter: '0xd0019e86edB35E1fedaaB03aED5c3c60f115d28b',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  const secondsPerYear = 365 * 24 * 60 * 60
  const minPrice = 1e-12
  const maxPrice = 1e12
  const v3CreatedTopic = ethers.utils.id('PoolCreated(address,address,uint24,int24,address)')
  const swapTopics = {
    v2: ethers.utils.id('Swap(address,uint256,uint256,uint256,uint256,address)'),
    v3: ethers.utils.id('Swap(address,address,int256,int256,uint160,uint128,int24)'),
    dlmm: ethers.utils.id('Swap(address,address,uint24,bytes32,bytes32,uint24,bytes32,bytes32)')
  }
  const swapInterfaces = {
    v2: new ethers.utils.Interface(['event Swap(address indexed sender,uint256 amount0In,uint256 amount1In,uint256 amount0Out,uint256 amount1Out,address indexed to)']),
    v3: new ethers.utils.Interface(['event Swap(address indexed sender,address indexed recipient,int256 amount0,int256 amount1,uint160 sqrtPriceX96,uint128 liquidity,int24 tick)']),
    dlmm: new ethers.utils.Interface(['event Swap(address indexed sender,address indexed to,uint24 id,bytes32 amountsIn,bytes32 amountsOut,uint24 volatilityAccumulator,bytes32 totalFees,bytes32 protocolFees)'])
  }
  const mask128 = ethers.BigNumber.from(2).pow(128).sub(1)
  const erc20Abi = ['function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)']
  const v2FactoryAbi = ['function allPairsLength() view returns(uint256)', 'function allPairs(uint256) view returns(address)', 'function pairFee(address) view returns(uint256)']
  const v2PairAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function stable() view returns(bool)', 'function getReserves() view returns(uint256,uint256,uint256)', 'function totalSupply() view returns(uint256)', 'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)']
  const v2RouterAbi = ['function addLiquidity(address,address,bool,uint256,uint256,uint256,uint256,address,uint256) returns(uint256,uint256,uint256)', 'function removeLiquidity(address,address,bool,uint256,uint256,uint256,address,uint256) returns(uint256,uint256)']
  const v3FactoryAbi = ['function poolFeeProtocol(address) view returns(uint24)']
  const v3PoolAbi = ['function fee() view returns(uint24)', 'function slot0() view returns(uint160,int24,uint16,uint16,uint16,uint8,bool)']
  const v3ManagerAbi = [
    'function balanceOf(address) view returns(uint256)', 'function tokenOfOwnerByIndex(address,uint256) view returns(uint256)',
    'function positions(uint256) view returns(address,address,int24,int24,int24,uint128,uint256,uint256,uint128,uint128)',
    'function mint((address token0,address token1,int24 tickSpacing,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline)) payable returns(uint256,uint128,uint256,uint256)',
    'function increaseLiquidity((uint256 tokenId,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns(uint128,uint256,uint256)',
    'function decreaseLiquidity((uint256 tokenId,uint128 liquidity,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns(uint256,uint256)',
    'function collect((uint256 tokenId,address recipient,uint128 amount0Max,uint128 amount1Max)) payable returns(uint256,uint256)'
  ]
  const dlmmFactoryAbi = ['function getNumberOfLBPairs() view returns(uint256)', 'function getLBPairAtIndex(uint256) view returns(address)']
  const dlmmPairAbi = [
    'function getTokenX() view returns(address)', 'function getTokenY() view returns(address)',
    'function getReserves() view returns(uint128,uint128)', 'function getActiveId() view returns(uint24)', 'function getBinStep() view returns(uint16)',
    'function getStaticFeeParameters() view returns(uint16,uint16,uint16,uint16,uint24,uint16,uint24)'
  ]
  const dlmmRouterAbi = ['function addLiquidity((address tokenX,address tokenY,uint256 binStep,uint256 amountX,uint256 amountY,uint256 amountXMin,uint256 amountYMin,uint256 activeIdDesired,uint256 idSlippage,int256[] deltaIds,uint256[] distributionX,uint256[] distributionY,address to,address refundTo,uint256 deadline)) returns(uint256,uint256,uint256,uint256,uint256[],uint256[])']
  const multiAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const erc20 = new ethers.utils.Interface(erc20Abi)
  const v2Factory = new ethers.utils.Interface(v2FactoryAbi)
  const v2Pair = new ethers.utils.Interface(v2PairAbi)
  const v2Router = new ethers.utils.Interface(v2RouterAbi)
  const v3Factory = new ethers.utils.Interface(v3FactoryAbi)
  const v3Pool = new ethers.utils.Interface(v3PoolAbi)
  const v3Manager = new ethers.utils.Interface(v3ManagerAbi)
  const dlmmFactory = new ethers.utils.Interface(dlmmFactoryAbi)
  const dlmmPair = new ethers.utils.Interface(dlmmPairAbi)
  const dlmmRouter = new ethers.utils.Interface(dlmmRouterAbi)
  const state = {
    rpc: null, pools: [], tokens: new Map(), tokenPending: new Set(), prices: new Map(), confidence: new Map(),
    head: null, feeFrom: null, feeSeconds: 60 * 60, feeHours: 1, feesReady: false, showZero: false,
    eip1193: null, account: null, walletChain: null, walletSource: null, boundProvider: null, reownUnsubscribe: null,
    action: null, actionInfo: null, v3Positions: [], sending: false, status: '', spinner: null, warmPromise: null
  }
  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const short = value => value ? value.slice(0, 6) + '…' + value.slice(-4) : '—'
  const finite = value => Number.isFinite(value) && value >= 0
  const correctChain = () => state.walletChain === chain.id
  const injected = () => window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null
  const token = value => state.tokens.get(lower(value)) || { address: value, symbol: short(value), decimals: null }
  const errText = error => String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').replace(/\s+/g, ' ').slice(0, 360)
  const compact = value => { if (!finite(value)) return '—'; if (value >= 1e9) return (value / 1e9).toFixed(2) + 'b'; if (value >= 1e6) return (value / 1e6).toFixed(2) + 'm'; if (value >= 1e3) return (value / 1e3).toFixed(2) + 'k'; if (value >= 1) return value.toFixed(2); return value > 0 ? value.toPrecision(3) : '0' }
  const usd = value => finite(value) ? '$' + compact(value) : '—'
  const percent = value => finite(value) ? compact(value) + '%' : '—'
  const amountNum = (value, decimals) => { try { const number = Number(ethers.utils.formatUnits(value, decimals)); return Number.isFinite(number) ? number : NaN } catch (_) { return NaN } }
  const formatAmount = (value, decimals) => { try { const parts = ethers.utils.formatUnits(value, decimals).split('.'); const tail = (parts[1] || '').slice(0, 5).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'ramses-action', disabled: disabled || state.sending }); node.addEventListener('click', function () { Promise.resolve(fn()).catch(error => setStatus(errText(error), 'error')) }); return node }
  const pause = delay => new Promise(resolve => window.setTimeout(resolve, delay))

  async function retryRpc (fn, attempts) {
    let lastError
    for (let attempt = 0; attempt < (attempts || 5); attempt += 1) {
      try { return await fn() } catch (error) { lastError = error; if (attempt + 1 < (attempts || 5)) await pause(250 * (2 ** attempt)) }
    }
    throw lastError
  }

  function setStatus (text, kind) { state.status = text || ''; const node = byId('ramses-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (active) { const box = byId('ramses-loading'); const spin = byId('ramses-loading-spin'); if (!box) return; box.hidden = !active; if (active && !state.spinner) { let index = 0; state.spinner = window.setInterval(function () { spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) } if (!active && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }
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
        const body = calls.map((call, index) => ({ jsonrpc: '2.0', id: index + 1, method: call.method, params: call.params })); const response = await window.fetch(chain.rpc, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: controller.signal }); const values = await response.json(); if (!response.ok || !Array.isArray(values)) throw new Error('RPC batch failed.'); const byId = new Map(values.map(value => [value.id, value])); return body.map(value => byId.get(value.id) || { error: { message: 'Missing RPC response.' } })
      } finally { window.clearTimeout(timer) }
    }, attempts || 5)
  }

  async function getLogs (filter) {
    const response = (await rpcJsonBatch([{ method: 'eth_getLogs', params: [{ address: filter.address, topics: filter.topics, fromBlock: ethers.utils.hexValue(filter.fromBlock), toBlock: ethers.utils.hexValue(filter.toBlock) }] }], 12000))[0]; if (!response || !Array.isArray(response.result)) throw new Error(response && response.error && response.error.message || 'Registry tail unavailable.'); const raw = response.result
    return raw.map(log => Object.assign({}, log, { blockNumber: Number(log.blockNumber) }))
  }

  async function discover () {
    loading(true); const head = (await rpcJsonBatch([{ method: 'eth_blockNumber', params: [] }], 12000))[0]; if (!head || !head.result) throw new Error(head && head.error && head.error.message || 'Block height unavailable.'); state.head = Number(head.result); setStatus('Pools · counts')
    const counts = await batch([
      { target: address.v2Factory, iface: v2Factory, method: 'allPairsLength', fallback: ethers.constants.Zero },
      { target: address.dlmmFactory, iface: dlmmFactory, method: 'getNumberOfLBPairs', fallback: ethers.constants.Zero }
    ])
    const v2Count = Number(counts[0]); const dlmmCount = Number(counts[1]); const registryCalls = []; setStatus('Pools · registry')
    const seededV2 = v3Registry.v2.slice(0, v2Count); const seededDlmm = v3Registry.dlmm.slice(0, dlmmCount)
    for (let i = seededV2.length; i < v2Count; i += 1) registryCalls.push({ target: address.v2Factory, iface: v2Factory, method: 'allPairs', args: [i], fallback: null })
    const v2TailCount = registryCalls.length
    for (let i = seededDlmm.length; i < dlmmCount; i += 1) registryCalls.push({ target: address.dlmmFactory, iface: dlmmFactory, method: 'getLBPairAtIndex', args: [i], fallback: null })
    const registry = await batch(registryCalls); setStatus('Pools · done')
    const pools = new Map()
    seededV2.concat(registry.slice(0, v2TailCount)).filter(Boolean).forEach((value, index) => pools.set(lower(value), { type: 'v2', address: ethers.utils.getAddress(value), index, ready: false, fee0: ethers.constants.Zero, fee1: ethers.constants.Zero }))
    seededDlmm.concat(registry.slice(v2TailCount)).filter(Boolean).forEach((value, index) => pools.set(lower(value), { type: 'dlmm', address: ethers.utils.getAddress(value), index, ready: false, fee0: ethers.constants.Zero, fee1: ethers.constants.Zero }))
    state.pools = [...pools.values()]
    render()
  }

  async function discoverV3 () {
    const pools = new Map(state.pools.map(pool => [lower(pool.address), pool]))
    const created = new ethers.utils.Interface(['event PoolCreated(address indexed token0,address indexed token1,uint24 indexed fee,int24 tickSpacing,address pool)'])
    v3Registry.rows.filter(value => value[5] <= state.head).forEach(function (value) {
      pools.set(value[0], { type: 'v3', address: ethers.utils.getAddress(value[0]), token0: ethers.utils.getAddress(value[1]), token1: ethers.utils.getAddress(value[2]), initialFee: value[3], tickSpacing: value[4], created: value[5], ready: false, fee0: ethers.constants.Zero, fee1: ethers.constants.Zero })
    })
    state.pools = [...pools.values()]
    render()
    const ranges = []
    for (let from = v3Registry.checkpoint + 1; from <= state.head; from += 1000000) ranges.push([from, Math.min(state.head, from + 999999)])
    const v3LogGroups = await limited(ranges, 3, range => getLogs({ address: address.v3Factory, topics: [v3CreatedTopic], fromBlock: range[0], toBlock: range[1] }))
    ;[].concat(...v3LogGroups).forEach(function (log) { try { const value = created.parseLog(log).args; pools.set(lower(value.pool), { type: 'v3', address: ethers.utils.getAddress(value.pool), token0: value.token0, token1: value.token1, initialFee: Number(value.fee), tickSpacing: Number(value.tickSpacing), created: log.blockNumber, ready: false, fee0: ethers.constants.Zero, fee1: ethers.constants.Zero }) } catch (_) {} })
    state.pools = [...pools.values()]
    render()
  }

  async function loadTokens (values) {
    const list = [...new Set(values.map(lower))].filter(value => value && !state.tokens.has(value) && !state.tokenPending.has(value))
    if (!list.length) return
    list.forEach(value => state.tokenPending.add(value))
    const calls = []; list.forEach(value => calls.push({ target: value, iface: erc20, method: 'symbol', fallback: null }, { target: value, iface: erc20, method: 'decimals', fallback: null }))
    const results = await batch(calls)
    list.forEach(function (value, index) { const raw = results[index * 2]; const symbol = raw === null ? short(value) : String(raw).replace(/[\r\n\t]/g, ' ').slice(0, 18); const decimals = results[index * 2 + 1]; state.tokens.set(value, { address: ethers.utils.getAddress(value), symbol, decimals: decimals === null ? null : Number(decimals) }); state.tokenPending.delete(value) })
  }

  async function hydratePools (force, activeOnly, only, limit) {
    let pending = state.pools.filter(pool => (force || !pool.ready) && (!activeOnly || pool.recent) && (!only || only(pool)))
    pending.sort(function (a, b) { const anchorA = lower(a.token0) === lower(address.usdg) || lower(a.token1) === lower(address.usdg) ? 1 : 0; const anchorB = lower(b.token0) === lower(address.usdg) || lower(b.token1) === lower(address.usdg) ? 1 : 0; return anchorB - anchorA || (b.swapCount || 0) - (a.swapCount || 0) })
    if (limit) pending = pending.slice(0, limit)
    const groups = []; for (let start = 0; start < pending.length; start += 40) groups.push(pending.slice(start, start + 40))
    let completed = 0
    await limited(groups, 3, async function (group) {
      const calls = []
      group.forEach(function (pool) {
        if (pool.type === 'v2') calls.push(
          { target: pool.address, iface: v2Pair, method: 'token0', fallback: null }, { target: pool.address, iface: v2Pair, method: 'token1', fallback: null },
          { target: pool.address, iface: v2Pair, method: 'stable', fallback: false }, { target: pool.address, iface: v2Pair, method: 'getReserves', fallback: null, decode: value => value },
          { target: address.v2Factory, iface: v2Factory, method: 'pairFee', args: [pool.address], fallback: null }
        )
        else if (pool.type === 'v3') calls.push(
          { target: pool.address, iface: v3Pool, method: 'fee', fallback: pool.initialFee }, { target: pool.address, iface: v3Pool, method: 'slot0', fallback: null, decode: value => value },
          { target: pool.token0, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null }, { target: pool.token1, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null },
          { target: address.v3Factory, iface: v3Factory, method: 'poolFeeProtocol', args: [pool.address], fallback: 50000 }
        )
        else calls.push(
          { target: pool.address, iface: dlmmPair, method: 'getTokenX', fallback: null }, { target: pool.address, iface: dlmmPair, method: 'getTokenY', fallback: null },
          { target: pool.address, iface: dlmmPair, method: 'getReserves', fallback: null, decode: value => value }, { target: pool.address, iface: dlmmPair, method: 'getActiveId', fallback: null },
          { target: pool.address, iface: dlmmPair, method: 'getBinStep', fallback: null }
        )
      })
      const values = await batch(calls); let cursor = 0; const tokenAddresses = []
      group.forEach(function (pool) {
        if (pool.type === 'v2') { pool.token0 = values[cursor++]; pool.token1 = values[cursor++]; pool.stable = Boolean(values[cursor++]); pool.reserves = values[cursor++]; pool.swapFee = values[cursor++] === null ? null : Number(values[cursor - 1]); pool.ready = Boolean(pool.token0 && pool.token1 && pool.reserves) }
        else if (pool.type === 'v3') { pool.swapFee = Number(values[cursor++]); pool.slot0 = values[cursor++]; pool.reserve0 = values[cursor++]; pool.reserve1 = values[cursor++]; pool.protocolShare = Number(values[cursor++]); pool.ready = Boolean(pool.slot0 && pool.reserve0 !== null && pool.reserve1 !== null) }
        else { pool.token0 = values[cursor++]; pool.token1 = values[cursor++]; pool.reserves = values[cursor++]; pool.activeId = values[cursor++] === null ? null : Number(values[cursor - 1]); pool.binStep = values[cursor++] === null ? null : Number(values[cursor - 1]); pool.ready = Boolean(pool.token0 && pool.token1 && pool.reserves && pool.activeId !== null && pool.binStep !== null) }
        if (pool.token0) tokenAddresses.push(pool.token0); if (pool.token1) tokenAddresses.push(pool.token1)
      })
      await loadTokens(tokenAddresses)
      if (state.feesReady) group.forEach(calculatePoolFees)
      compute(); render()
      completed += 1; if (activeOnly) setStatus('Fees · pools ' + completed + '/' + groups.length)
    })
  }

  function poolAmounts (pool) {
    const t0 = token(pool.token0); const t1 = token(pool.token1); if (t0.decimals === null || t1.decimals === null) return [NaN, NaN]
    if (pool.type === 'v3') return [amountNum(pool.reserve0, t0.decimals), amountNum(pool.reserve1, t1.decimals)]
    return pool.reserves ? [amountNum(pool.reserves[0], t0.decimals), amountNum(pool.reserves[1], t1.decimals)] : [NaN, NaN]
  }

  function poolSpot (pool) {
    const amounts = poolAmounts(pool); if (!(amounts[0] > 0) || !(amounts[1] > 0)) return NaN
    if (pool.type === 'v2') return amounts[1] / amounts[0]
    if (pool.type === 'v3') { const sqrt = Number(pool.slot0 && pool.slot0[0] && pool.slot0[0].toString()); const t0 = token(pool.token0); const t1 = token(pool.token1); const value = (sqrt / (2 ** 96)) ** 2 * (10 ** (t0.decimals - t1.decimals)); return Number.isFinite(value) && value > 0 ? value : NaN }
    const t0 = token(pool.token0); const t1 = token(pool.token1); const value = Math.pow(1 + pool.binStep / 10000, pool.activeId - 8388608) * (10 ** (t0.decimals - t1.decimals)); return Number.isFinite(value) && value > 0 ? value : NaN
  }

  function calculatePoolFees (pool) {
    pool.fee0 = ethers.constants.Zero; pool.fee1 = ethers.constants.Zero
    ;(pool.rawFeeLogs || []).forEach(function (log) {
      try {
        const value = swapInterfaces[pool.type].parseLog(log).args
        if (pool.type === 'v2') {
          const scalar = Math.round((pool.swapFee || 0) / 1000000 * 0.95 * 1e9)
          pool.fee0 = pool.fee0.add(ethers.BigNumber.from(value.amount0In).mul(scalar).div(1e9)); pool.fee1 = pool.fee1.add(ethers.BigNumber.from(value.amount1In).mul(scalar).div(1e9))
        } else if (pool.type === 'v3') {
          const scalar = Math.round((pool.swapFee || 0) / 1000000 * Math.max(0, 1 - (pool.protocolShare || 0) / 1000000) * 1e9)
          if (value.amount0.gt(0)) pool.fee0 = pool.fee0.add(value.amount0.mul(scalar).div(1e9)); if (value.amount1.gt(0)) pool.fee1 = pool.fee1.add(value.amount1.mul(scalar).div(1e9))
        } else {
          const total = ethers.BigNumber.from(value.totalFees); const protocol = ethers.BigNumber.from(value.protocolFees); const total0 = total.and(mask128); const total1 = total.shr(128); const protocol0 = protocol.and(mask128); const protocol1 = protocol.shr(128)
          pool.fee0 = pool.fee0.add(total0.gte(protocol0) ? total0.sub(protocol0) : 0); pool.fee1 = pool.fee1.add(total1.gte(protocol1) ? total1.sub(protocol1) : 0)
        }
      } catch (_) {}
    })
  }

  function compute () {
    state.prices = new Map([[lower(address.usdg), 1]]); state.confidence = new Map([[lower(address.usdg), Number.MAX_VALUE]])
    state.pools.forEach(function (pool) { if (pool.ready) { pool.amounts = poolAmounts(pool); pool.spot = poolSpot(pool) } })
    for (let pass = 0; pass < 16; pass += 1) {
      let changed = false
      state.pools.forEach(function (pool) {
        if (!pool.ready || !finite(pool.spot) || !pool.amounts) return
        const key0 = lower(pool.token0); const key1 = lower(pool.token1); const price0 = state.prices.get(key0); const price1 = state.prices.get(key1); const confidence0 = state.confidence.get(key0) || 0; const confidence1 = state.confidence.get(key1) || 0
        if (finite(price0) && pool.amounts[0] > 0) { const candidate = price0 / pool.spot; const confidence = Math.min(confidence0, pool.amounts[0] * price0 * 2); if (candidate > minPrice && candidate < maxPrice && confidence > confidence1) { state.prices.set(key1, candidate); state.confidence.set(key1, confidence); changed = true } }
        if (finite(price1) && pool.amounts[1] > 0) { const candidate = price1 * pool.spot; const confidence = Math.min(confidence1, pool.amounts[1] * price1 * 2); if (candidate > minPrice && candidate < maxPrice && confidence > confidence0) { state.prices.set(key0, candidate); state.confidence.set(key0, confidence); changed = true } }
      })
      if (!changed) break
    }
    state.pools.forEach(function (pool) {
      const price0 = state.prices.get(lower(pool.token0)); const price1 = state.prices.get(lower(pool.token1)); pool.tvl = pool.amounts && finite(price0) && finite(price1) ? pool.amounts[0] * price0 + pool.amounts[1] * price1 : NaN
      const token0 = token(pool.token0); const token1 = token(pool.token1); const fee0 = amountNum(pool.fee0, token0.decimals); const fee1 = amountNum(pool.fee1, token1.decimals)
      pool.feeUsd = !pool.feeCovered || ((fee0 > 0 && !finite(price0)) || (fee1 > 0 && !finite(price1))) ? NaN : (fee0 || 0) * (price0 || 0) + (fee1 || 0) * (price1 || 0)
      pool.apr = finite(pool.feeUsd) && pool.feeUsd > 0 && finite(pool.tvl) && pool.tvl > 0 ? pool.feeUsd * secondsPerYear / state.feeSeconds / pool.tvl * 100 : pool.feeUsd === 0 ? 0 : NaN
    })
  }

  async function feeWindow () {
    state.feeFrom = Math.max(0, state.head - 36000)
    const blocks = await rpcJsonBatch([
      { method: 'eth_getBlockByNumber', params: [ethers.utils.hexValue(state.head), false] },
      { method: 'eth_getBlockByNumber', params: [ethers.utils.hexValue(state.feeFrom), false] }
    ], 12000)
    if (!blocks[0] || !blocks[0].result || !blocks[1] || !blocks[1].result) throw new Error('Fee window unavailable.')
    state.feeSeconds = Math.max(1, Number(blocks[0].result.timestamp) - Number(blocks[1].result.timestamp))
  }

  async function scanAddressJob (job, attempt) {
    let response
    try {
      response = (await rpcJsonBatch([{ method: 'eth_getLogs', params: [{ address: job.addresses, topics: [swapTopics[job.type]], fromBlock: ethers.utils.hexValue(state.feeFrom), toBlock: ethers.utils.hexValue(state.head) }] }], 22000, 1))[0]
    } catch (_) {}
    if (response && Array.isArray(response.result)) return [{ type: job.type, addresses: job.addresses, covered: job.addresses, logs: response.result }]
    if ((attempt || 0) < 2) { await pause(750 * ((attempt || 0) + 1)); return scanAddressJob(job, (attempt || 0) + 1) }
    if (job.addresses.length <= 8) return [{ type: job.type, addresses: job.addresses, covered: [], logs: [] }]
    const middle = Math.ceil(job.addresses.length / 2)
    const first = await scanAddressJob({ type: job.type, addresses: job.addresses.slice(0, middle) }, 0); await pause(250)
    const second = await scanAddressJob({ type: job.type, addresses: job.addresses.slice(middle) }, 0)
    return first.concat(second)
  }

  async function scanAddressJobs (jobs) {
    const parts = []
    for (let index = 0; index < jobs.length; index += 1) {
      setStatus('Fees · logs ' + (index + 1) + '/' + jobs.length)
      parts.push(...await scanAddressJob(jobs[index], 0))
      if (index + 1 < jobs.length) await pause(250)
    }
    return parts
  }

  async function loadFeeLogs () {
    setStatus('Fees · window'); await feeWindow(); state.pools.forEach(function (pool) { pool.fee0 = ethers.constants.Zero; pool.fee1 = ethers.constants.Zero; pool.feeExpected = 1; pool.feeCompleted = 0; pool.feeCovered = false; pool.rawFeeLogs = []; pool.swapCount = 0 }); setStatus('Fees · logs')
    const jobs = []
    ;['v2', 'v3', 'dlmm'].forEach(function (type) { const values = state.pools.filter(pool => pool.type === type).map(pool => pool.address); for (let start = 0; start < values.length; start += 96) jobs.push({ type, addresses: values.slice(start, start + 96) }) })
    const parts = await scanAddressJobs(jobs)
    const groups = ['v2', 'v3', 'dlmm'].map(function (type) { const values = parts.filter(part => part.type === type); return { type, logs: [].concat(...values.map(value => value.logs)) } })
    const poolMap = new Map(state.pools.map(pool => [lower(pool.address), pool]))
    groups.forEach(function (group) { group.logs.forEach(log => { const pool = poolMap.get(lower(log.address)); if (pool) { pool.recent = true; pool.swapCount += 1; pool.rawFeeLogs.push(log) } }) })
    parts.forEach(part => part.covered.forEach(value => { const pool = poolMap.get(lower(value)); if (pool) pool.feeCompleted = 1 }))
    state.pools.forEach(pool => { pool.feeCovered = pool.feeExpected > 0 && pool.feeCompleted === pool.feeExpected }); const failures = parts.reduce((sum, part) => sum + part.addresses.length - part.covered.length, 0)
    state.feesReady = true; state.pools.filter(pool => pool.ready).forEach(calculatePoolFees); compute(); render(); setStatus('Fees · pools'); await hydratePools(false, true); setStatus('Fees · totals'); compute(); render(); if (failures) setStatus('Fee reads incomplete.', 'error')
  }

  function poolName (pool) { return token(pool.token0).symbol + ' / ' + token(pool.token1).symbol }
  function poolType (pool) { if (pool.type === 'v2') return 'V2 · ' + (pool.stable ? 'stable' : 'volatile') + ' · ' + ((pool.swapFee || 0) / 10000).toFixed(2) + '%'; if (pool.type === 'v3') return 'V3 · ' + ((pool.swapFee || 0) / 10000).toFixed(2) + '% · tick ' + pool.tickSpacing; return 'DLMM · ' + (pool.binStep || 0) + ' bps' }
  function addHeader (table, labels) { const head = e('thead'); const row = e('tr'); labels.forEach(label => row.appendChild(e('th', { text: label }))); head.appendChild(row); table.appendChild(head) }
  function addCell (row, text, className) { row.appendChild(e('td', { text, className })) }

  function renderPools () {
    const host = byId('ramses-pools'); if (!host) return; host.textContent = ''
    let visible = state.pools.filter(pool => pool.ready && (state.showZero || !state.feesReady || (finite(pool.apr) && pool.apr > 0)))
    visible.sort(function (a, b) { if (!state.feesReady) return (b.tvl || 0) - (a.tvl || 0); return (b.apr || 0) - (a.apr || 0) || (b.feeUsd || 0) - (a.feeUsd || 0) })
    if (!state.feesReady && !state.showZero) visible = visible.slice(0, 20)
    const table = e('table', { className: 'ramses-table' }); addHeader(table, ['Pool', 'TVL', 'Fee APR (' + state.feeHours + 'h)', 'Fees / ' + state.feeHours + 'h', 'Type', 'Actions']); const body = e('tbody')
    visible.forEach(function (pool) {
      const row = e('tr'); const name = e('td'); append(name, e('span', { className: 'ramses-name', text: poolName(pool) }), e('span', { className: 'ramses-sub', text: short(pool.address) })); row.appendChild(name)
      addCell(row, usd(pool.tvl), finite(pool.tvl) ? '' : 'ramses-unpriced'); addCell(row, state.feesReady ? percent(pool.apr) : '…', finite(pool.apr) ? '' : 'ramses-unpriced'); addCell(row, state.feesReady ? usd(pool.feeUsd) : '…'); addCell(row, poolType(pool))
      const actions = e('td', { className: 'ramses-actions' }); actions.appendChild(button('add', function () { return openPoolAction(pool, 'add') }, !pool.ready)); if (pool.type === 'v2') actions.appendChild(button('remove', function () { return openPoolAction(pool, 'remove') }, !state.account)); row.appendChild(actions); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function renderSummary () {
    const node = byId('ramses-summary'); if (!node) return; const tvl = state.pools.reduce((sum, pool) => sum + (finite(pool.tvl) && (!state.feesReady || finite(pool.apr) && pool.apr > 0) ? pool.tvl : 0), 0)
    node.textContent = 'Ramses TVL ' + usd(tvl)
  }

  function renderWallet () {
    const node = byId('ramses-wallet-status'); if (!node) return; node.textContent = state.account ? short(state.account) + (correctChain() ? '' : ' · wrong chain') + ' ' : ''
  }

  function renderPositions () {
    const host = byId('ramses-positions'); if (!host) return; host.textContent = ''; host.hidden = !state.account || !state.v3Positions.length; if (host.hidden) return
    const table = e('table', { className: 'ramses-table' }); addHeader(table, ['Position', 'Liquidity', 'Range', 'Owed', 'Type', 'Actions']); const body = e('tbody')
    state.v3Positions.forEach(function (position) {
      const row = e('tr'); const name = e('td'); append(name, e('span', { className: 'ramses-name', text: token(position.token0).symbol + ' / ' + token(position.token1).symbol }), e('span', { className: 'ramses-sub', text: '#' + position.id })); row.appendChild(name)
      addCell(row, position.liquidity.toString()); addCell(row, position.tickLower + ' — ' + position.tickUpper); addCell(row, formatAmount(position.owed0, token(position.token0).decimals) + ' / ' + formatAmount(position.owed1, token(position.token1).decimals)); addCell(row, 'V3')
      const actions = e('td', { className: 'ramses-actions' }); actions.appendChild(button('add', function () { return openPositionAction(position, 'increase') })); actions.appendChild(button('remove', function () { return openPositionAction(position, 'decrease') })); actions.appendChild(button('collect', function () { return collectPosition(position) })); row.appendChild(actions); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function render () { renderWallet(); renderSummary(); renderPools(); renderPositions(); const toggle = byId('ramses-zero-toggle'); if (toggle) toggle.textContent = state.showZero ? '[ hide inactive ]' : '[ show inactive ]' }

  function requireWallet () { if (!state.account || !state.eip1193) throw new Error('Connect wallet.'); if (!correctChain()) throw new Error('Switch to Robinhood Chain.') }
  function deadline () { return Math.floor(Date.now() / 1000) + 1200 }
  function parseAmount (value, info, label) { if (!info || info.decimals === null) throw new Error(label + ' token metadata unavailable.'); try { const amount = ethers.utils.parseUnits(String(value || '').trim(), info.decimals); if (amount.lte(0)) throw new Error(); return amount } catch (_) { throw new Error('Enter ' + label + '.') } }
  function parseMinimum (value, info, label) { if (!info || info.decimals === null) throw new Error(label + ' token metadata unavailable.'); try { const amount = ethers.utils.parseUnits(String(value || '').trim(), info.decimals); if (amount.lt(0)) throw new Error(); return amount } catch (_) { throw new Error('Enter ' + label + '.') } }
  function dialogField (host, label, key, value) { const row = e('div', { className: 'ramses-input' }); const input = e('input'); input.type = 'text'; input.inputMode = 'decimal'; input.autocomplete = 'off'; input.value = value || ''; input.addEventListener('input', function () { if (state.action) state.action[key] = input.value }); append(row, e('label', { text: label }), input); host.appendChild(row); return input }
  function dialogButtonRow (host, buttons) { const row = e('div', { className: 'ramses-dialog-actions' }); buttons.forEach(item => row.appendChild(button(item[0], item[1], item[2]))); host.appendChild(row) }
  function showDialog () { const dialog = byId('ramses-action-dialog'); if (dialog && !dialog.open) dialog.showModal() }

  async function loadActionInfo () {
    if (!state.action || !state.account || !correctChain()) { state.actionInfo = null; renderAction(); return }
    const action = state.action; const pool = action.pool || action.position && action.position.pool; if (!pool) return
    const spender = pool.type === 'v2' ? address.v2Router : pool.type === 'v3' ? address.v3Manager : address.dlmmRouter
    const calls = [
      { target: pool.token0, iface: erc20, method: 'balanceOf', args: [state.account], fallback: null }, { target: pool.token1, iface: erc20, method: 'balanceOf', args: [state.account], fallback: null },
      { target: pool.token0, iface: erc20, method: 'allowance', args: [state.account, spender], fallback: null }, { target: pool.token1, iface: erc20, method: 'allowance', args: [state.account, spender], fallback: null }
    ]
    if (pool.type === 'v2') calls.push({ target: pool.address, iface: v2Pair, method: 'balanceOf', args: [state.account], fallback: null }, { target: pool.address, iface: v2Pair, method: 'allowance', args: [state.account, address.v2Router], fallback: null })
    const values = await batch(calls); state.actionInfo = { balance0: values[0], balance1: values[1], allowance0: values[2], allowance1: values[3], lpBalance: values[4], lpAllowance: values[5] }; renderAction()
  }

  async function openPoolAction (pool, mode) {
    requireWallet(); const center = pool.type === 'v3' && pool.slot0 ? Number(pool.slot0[1]) : 0; const spacing = pool.tickSpacing || 1; const aligned = Math.floor(center / spacing) * spacing
    state.action = { kind: 'pool', pool, mode, amount0: '', amount1: '', min0: '', min1: '', lp: '', tickLower: String(aligned - spacing * 100), tickUpper: String(aligned + spacing * 100), idSlippage: '2' }; state.actionInfo = null; renderAction(); showDialog(); await loadActionInfo()
  }

  async function openPositionAction (position, mode) {
    requireWallet(); state.action = { kind: 'position', pool: position.pool, position, mode, amount0: '', amount1: '', min0: '', min1: '', liquidity: mode === 'decrease' ? position.liquidity.toString() : '' }; state.actionInfo = null; renderAction(); showDialog(); await loadActionInfo()
  }

  function renderAction () {
    const host = byId('ramses-action-content'); if (!host) return; host.textContent = ''; const action = state.action; if (!action) return
    const pool = action.pool; const info0 = token(pool.token0); const info1 = token(pool.token1); host.appendChild(e('h2', { id: 'ramses-action-title', text: poolName(pool) }))
    if (state.actionInfo) host.appendChild(e('p', { text: formatAmount(state.actionInfo.balance0, info0.decimals) + ' ' + info0.symbol + ' · ' + formatAmount(state.actionInfo.balance1, info1.decimals) + ' ' + info1.symbol + (pool.type === 'v2' ? ' · ' + formatAmount(state.actionInfo.lpBalance, 18) + ' LP' : '') }))
    if (action.mode === 'remove' && pool.type === 'v2') {
      dialogField(host, 'LP', 'lp', action.lp); dialogField(host, info0.symbol + ' min', 'min0', action.min0); dialogField(host, info1.symbol + ' min', 'min1', action.min1)
      dialogButtonRow(host, [['approve LP', function () { return approveFor('lp') }], ['remove', submitAction]])
      return
    }
    if (action.mode === 'decrease') {
      dialogField(host, 'Liquidity', 'liquidity', action.liquidity); dialogField(host, info0.symbol + ' min', 'min0', action.min0); dialogField(host, info1.symbol + ' min', 'min1', action.min1); dialogButtonRow(host, [['remove', submitAction]]); return
    }
    dialogField(host, info0.symbol, 'amount0', action.amount0); dialogField(host, info1.symbol, 'amount1', action.amount1); dialogField(host, info0.symbol + ' min', 'min0', action.min0); dialogField(host, info1.symbol + ' min', 'min1', action.min1)
    if (pool.type === 'v3' && action.kind === 'pool') { dialogField(host, 'Tick lower', 'tickLower', action.tickLower); dialogField(host, 'Tick upper', 'tickUpper', action.tickUpper) }
    if (pool.type === 'dlmm') dialogField(host, 'Id slippage', 'idSlippage', action.idSlippage)
    dialogButtonRow(host, [['approve ' + info0.symbol, function () { return approveFor('token0') }], ['approve ' + info1.symbol, function () { return approveFor('token1') }], [action.mode === 'increase' ? 'add' : 'add', submitAction]])
  }

  function approvalAmount (side) {
    const action = state.action; const pool = action.pool
    if (side === 'lp') return { token: pool.address, info: { symbol: 'LP', decimals: 18 }, amount: parseAmount(action.lp, { decimals: 18 }, 'LP amount'), spender: address.v2Router }
    const first = side === 'token0'; const info = token(first ? pool.token0 : pool.token1); const amount = parseAmount(first ? action.amount0 : action.amount1, info, info.symbol + ' amount'); const spender = pool.type === 'v2' ? address.v2Router : pool.type === 'v3' ? address.v3Manager : address.dlmmRouter
    return { token: first ? pool.token0 : pool.token1, info, amount, spender }
  }

  async function preflight (tx) { try { await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data, value: tx.value || '0x0' }, 'latest'] }) } catch (error) { throw new Error('Preflight failed: ' + errText(error)) } }
  async function send (tx, approvalOnly) { await preflight(tx); setStatus('Confirm in wallet…'); const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data, value: tx.value || '0x0' }] }); setStatus(hash + ' · pending'); const receipt = await state.rpc.waitForTransaction(hash, 1, 180000); if (!receipt || receipt.status !== 1) throw new Error('Transaction failed.'); setStatus(''); if (approvalOnly) await loadActionInfo(); else await refreshAfterAction() }

  async function approveFor (side) {
    requireWallet(); const approval = approvalAmount(side)
    state.sending = true; renderAction()
    try { await send({ to: approval.token, data: erc20.encodeFunctionData('approve', [approval.spender, approval.amount]) }, true) } finally { state.sending = false; renderAction() }
  }

  function requireZeroMinimumConfirmation (min0, min1) { if ((min0.isZero() || min1.isZero()) && !window.confirm('A zero minimum allows any execution price. Continue?')) throw new Error('Cancelled.') }

  function buildAction () {
    requireWallet(); const action = state.action; const pool = action.pool; const info0 = token(pool.token0); const info1 = token(pool.token1); const min0 = parseMinimum(action.min0, info0, info0.symbol + ' minimum'); const min1 = parseMinimum(action.min1, info1, info1.symbol + ' minimum'); requireZeroMinimumConfirmation(min0, min1)
    if (pool.type === 'v2') {
      if (action.mode === 'remove') { const lp = parseAmount(action.lp, { decimals: 18 }, 'LP amount'); return { to: address.v2Router, data: v2Router.encodeFunctionData('removeLiquidity', [pool.token0, pool.token1, pool.stable, lp, min0, min1, state.account, deadline()]) } }
      const amount0 = parseAmount(action.amount0, info0, info0.symbol + ' amount'); const amount1 = parseAmount(action.amount1, info1, info1.symbol + ' amount'); return { to: address.v2Router, data: v2Router.encodeFunctionData('addLiquidity', [pool.token0, pool.token1, pool.stable, amount0, amount1, min0, min1, state.account, deadline()]) }
    }
    if (pool.type === 'v3') {
      if (action.kind === 'position' && action.mode === 'increase') { const amount0 = parseAmount(action.amount0, info0, info0.symbol + ' amount'); const amount1 = parseAmount(action.amount1, info1, info1.symbol + ' amount'); return { to: address.v3Manager, data: v3Manager.encodeFunctionData('increaseLiquidity', [[action.position.id, amount0, amount1, min0, min1, deadline()]]) } }
      if (action.kind === 'position' && action.mode === 'decrease') { const liquidity = ethers.BigNumber.from(String(action.liquidity || '').trim()); if (liquidity.lte(0) || liquidity.gt(action.position.liquidity)) throw new Error('Enter liquidity.'); return { to: address.v3Manager, data: v3Manager.encodeFunctionData('decreaseLiquidity', [[action.position.id, liquidity, min0, min1, deadline()]]) } }
      const amount0 = parseAmount(action.amount0, info0, info0.symbol + ' amount'); const amount1 = parseAmount(action.amount1, info1, info1.symbol + ' amount'); const lowerTick = Number(action.tickLower); const upperTick = Number(action.tickUpper); if (!Number.isInteger(lowerTick) || !Number.isInteger(upperTick) || lowerTick >= upperTick || lowerTick % pool.tickSpacing || upperTick % pool.tickSpacing) throw new Error('Ticks must be aligned to ' + pool.tickSpacing + '.'); return { to: address.v3Manager, data: v3Manager.encodeFunctionData('mint', [[pool.token0, pool.token1, pool.tickSpacing, lowerTick, upperTick, amount0, amount1, min0, min1, state.account, deadline()]]) }
    }
    const amount0 = parseAmount(action.amount0, info0, info0.symbol + ' amount'); const amount1 = parseAmount(action.amount1, info1, info1.symbol + ' amount'); const idSlippage = Number(action.idSlippage); if (!Number.isInteger(idSlippage) || idSlippage < 0 || idSlippage > 1000) throw new Error('Enter id slippage.'); const one = ethers.constants.WeiPerEther; const distribution0 = amount0.isZero() ? ethers.constants.Zero : one; const distribution1 = amount1.isZero() ? ethers.constants.Zero : one
    return { to: address.dlmmRouter, data: dlmmRouter.encodeFunctionData('addLiquidity', [[pool.token0, pool.token1, pool.binStep, amount0, amount1, min0, min1, pool.activeId, idSlippage, [0], [distribution0], [distribution1], state.account, state.account, deadline()]]) }
  }

  async function submitAction () { state.sending = true; renderAction(); try { await send(buildAction()) } finally { state.sending = false; renderAction() } }
  async function collectPosition (position) { requireWallet(); const max = ethers.BigNumber.from(2).pow(128).sub(1)
    state.sending = true; render()
    try { await send({ to: address.v3Manager, data: v3Manager.encodeFunctionData('collect', [[position.id, state.account, max, max]]) }) } finally { state.sending = false; render() } }

  async function loadV3Positions () {
    state.v3Positions = []; if (!state.account || !correctChain()) { renderPositions(); return }
    const count = (await batch([{ target: address.v3Manager, iface: v3Manager, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero }]))[0]; const total = Number(count); if (!total) { renderPositions(); return }
    const ids = await batch(Array.from({ length: total }, (_, index) => ({ target: address.v3Manager, iface: v3Manager, method: 'tokenOfOwnerByIndex', args: [state.account, index], fallback: null })))
    const ownedIds = ids.filter(value => value !== null)
    const values = await batch(ownedIds.map(id => ({ target: address.v3Manager, iface: v3Manager, method: 'positions', args: [id], fallback: null, decode: value => value })))
    const poolMap = new Map(state.pools.filter(pool => pool.type === 'v3').map(pool => [lower(pool.token0) + ':' + lower(pool.token1) + ':' + pool.tickSpacing, pool]))
    state.v3Positions = values.map(function (value, index) { if (!value) return null; const pool = poolMap.get(lower(value[0]) + ':' + lower(value[1]) + ':' + Number(value[2])); return pool && { id: ownedIds[index], pool, token0: value[0], token1: value[1], tickSpacing: Number(value[2]), tickLower: Number(value[3]), tickUpper: Number(value[4]), liquidity: value[5], owed0: value[8], owed1: value[9] } }).filter(Boolean); renderPositions()
  }

  async function refreshAfterAction () { const dialog = byId('ramses-action-dialog'); if (dialog && dialog.open) dialog.close(); state.action = null; state.actionInfo = null; await Promise.all([hydratePools(true, true), loadV3Positions()]); await loadFeeLogs() }

  function bindProvider (provider) {
    if (!provider || state.boundProvider === provider || !provider.on) return; state.boundProvider = provider
    provider.on('accountsChanged', function (accounts) { adopt(provider, accounts || [], state.walletChain, state.walletSource).catch(error => setStatus(errText(error), 'error')) })
    provider.on('chainChanged', function (chainId) { adopt(provider, state.account ? [state.account] : [], chainId, state.walletSource).catch(error => setStatus(errText(error), 'error')) })
  }

  async function adopt (provider, accounts, chainId, source) {
    state.eip1193 = provider; state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null; state.walletChain = chainId; state.walletSource = source || 'wallet'; bindProvider(provider); render()
    if (state.account && correctChain()) await loadV3Positions(); else { state.v3Positions = []; renderPositions() }
  }

  async function restoreInjected () {
    const provider = injected(); if (!provider) return; const accounts = await provider.request({ method: 'eth_accounts' }); const chainId = await provider.request({ method: 'eth_chainId' }); if (accounts && accounts[0]) await adopt(provider, accounts, chainId, 'injected')
  }

  async function connectInjected () {
    const provider = injected(); if (!provider) { setStatus('No injected wallet.', 'error'); return } const accounts = await provider.request({ method: 'eth_requestAccounts' }); const chainId = await provider.request({ method: 'eth_chainId' }); await adopt(provider, accounts, chainId, 'injected'); if (!correctChain()) setStatus('Switch to Robinhood Chain.', 'error')
  }

  async function connectOther () {
    const reown = await import('./config.js'); if (!reown.REOWN_PROJECT_ID) throw new Error('Other wallet unavailable.'); const kit = reown.createAppKitInstance(); if (!kit) throw new Error('Other wallet unavailable.')
    const onAccount = async function (accountState) { if (!accountState || !accountState.isConnected) return; const provider = await kit.getWalletProvider(); await adopt(provider, await provider.request({ method: 'eth_accounts' }), await provider.request({ method: 'eth_chainId' }), 'other wallet'); if (state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null } }
    if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true }); if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error'))); await kit.open()
  }

  async function refresh () {
    state.feesReady = false; state.pools = []; state.tokens = new Map(); state.tokenPending = new Set(); state.prices = new Map(); state.confidence = new Map(); render(); loading(true); await discover(); await discoverV3().catch(function () { setStatus('V3 registry unavailable.', 'error') }); await loadFeeLogs(); await loadV3Positions(); loading(false)
  }

  function bindUi () {
    byId('ramses-connect').addEventListener('click', function () { connectInjected().catch(error => setStatus(errText(error), 'error')) })
    byId('ramses-other-wallet').addEventListener('click', function () { connectOther().catch(error => setStatus(errText(error), 'error')) })
    byId('ramses-zero-toggle').addEventListener('click', function () { state.showZero = !state.showZero; render(); if (state.showZero) { loading(true); hydratePools(false, false).then(function () { loading(false); render() }).catch(fatal) } })
    byId('ramses-refresh').addEventListener('click', function () { refresh().catch(fatal) })
  }

  async function start () {
    state.rpc = new ethers.providers.JsonRpcProvider({ url: chain.rpc, timeout: 12000 }, { chainId: chain.number, name: 'robinhood' }); bindUi(); const passive = restoreInjected().catch(error => setStatus(errText(error), 'error')); setStatus('Pools'); await discover(); setStatus('V3'); await discoverV3().catch(function () { setStatus('V3 registry unavailable.', 'error') }); setStatus('Fees'); await loadFeeLogs(); await passive; await loadV3Positions(); loading(false); if (!state.status || ['Pools', 'V3'].includes(state.status) || state.status.indexOf('Fees') === 0) setStatus(''); render()
  }

  function fatal (error) { console.error(error); loading(false); setStatus(errText(error), 'error'); render() }

  return { start, fatal }
})()
