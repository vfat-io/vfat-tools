/* Fables on Robinhood Chain: direct registry, Uniswap v4 state, RPC, and EIP-1193. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { FablesPage.start().catch(FablesPage.fatal) })

const FablesPage = (function () {
  const chain = { id: '0x1237', number: 4663, rpc: 'https://rpc.mainnet.chain.robinhood.com' }
  // Fables pools, hooks, and ranges are always read from the onchain registry.
  // Only the registry root, the USDG pricing anchor, and Multicall3 are fixed.
  const address = {
    registry: '0x159A113E012593D9B3cC63ad45E30F0467e13Ef3',
    usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  // Uniswap v4 PoolManager keeps every pool's state in the `pools` mapping at
  // storage slot 6, read through extsload. The manager itself is discovered
  // from a hook rather than hard-coded.
  const poolsSlot = 6
  const secondsPerYear = 365 * 24 * 60 * 60
  const feeWindowSeconds = 7 * 24 * 60 * 60
  const blockSeconds = 0.102
  const minPrice = 1e-12
  const maxPrice = 1e12
  const maxUint128 = ethers.BigNumber.from(2).pow(128).sub(1)
  const zeroAddress = ethers.constants.AddressZero
  const sessionNames = ['open', 'closed', 'weekend']
  const depositedTopic = ethers.utils.id('Deposited(address,uint256,uint128)')
  const withdrawnTopic = ethers.utils.id('Withdrawn(address,uint256,uint128)')
  const feesTopic = ethers.utils.id('FeesCollected(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint128,uint128,uint64,uint64)')
  const transferTopic = ethers.utils.id('Transfer(address,address,address,uint256,uint256)')
  const poolKeyType = '(address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks)'
  const erc20Abi = ['function symbol() view returns(string)', 'function decimals() view returns(uint8)']
  const registryAbi = ['function activePools() view returns(tuple(tuple(address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks) key,bytes32 id,bool active)[])']
  const hookAbi = [
    'function poolManager() view returns(address)',
    'function rangeState(uint256) view returns(uint128 liquidity)',
    'function rangeKey(uint256) view returns(' + poolKeyType + ' key,int24 tickLower,int24 tickUpper,bool exists)',
    'function balanceOf(address,uint256) view returns(uint256)',
    'function userPosition(uint256,address) view returns(tuple(uint128 staked,uint128 owed0,uint128 owed1,uint256 checkpoint0X128,uint256 checkpoint1X128,uint256 stakedCheckpoint0X128,uint256 stakedCheckpoint1X128,uint256 forgone0,uint256 forgone1))',
    'function sessionAt(uint256) view returns(uint8)',
    'function openSec() view returns(uint32)',
    'function closeSec() view returns(uint32)',
    'function paused() view returns(bool)',
    'function maxFee(bytes32) view returns(uint24)',
    'function pokeFloor(bytes32) view returns(uint24)',
    'function claimFees(' + poolKeyType + ' key,int24 tickLower,int24 tickUpper,address recipient,uint16 walk)',
    'function withdraw(' + poolKeyType + ' key,int24 tickLower,int24 tickUpper,uint128 liquidity,address recipient,uint128 amount0Min,uint128 amount1Min,uint256 deadline)'
  ]
  const managerAbi = ['function extsload(bytes32,uint256) view returns(bytes32[])']
  const multiAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const erc20 = new ethers.utils.Interface(erc20Abi)
  const registry = new ethers.utils.Interface(registryAbi)
  const hook = new ethers.utils.Interface(hookAbi)
  const manager = new ethers.utils.Interface(managerAbi)
  const state = {
    rpc: null, pools: [], tokens: new Map(), prices: new Map(), confidence: new Map(),
    poolManager: null, head: null, headTime: null, feeFrom: null, feeSeconds: feeWindowSeconds,
    session: null, openSec: null, closeSec: null, positions: [], showZero: false,
    eip1193: null, account: null, walletChain: null, boundProvider: null, reownUnsubscribe: null,
    action: null, sending: false, status: '', spinner: null
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
  const bps = value => Number.isFinite(value) ? (value / 10000).toFixed(2) + '%' : '—'
  const clock = seconds => Number.isFinite(seconds) ? String(Math.floor(seconds / 3600)).padStart(2, '0') + ':' + String(Math.floor(seconds % 3600 / 60)).padStart(2, '0') : '—'
  const amountNum = (value, decimals) => { try { const number = Number(ethers.utils.formatUnits(value, decimals)); return Number.isFinite(number) ? number : NaN } catch (_) { return NaN } }
  const formatAmount = (value, decimals, places) => { try { const parts = ethers.utils.formatUnits(value, decimals).split('.'); const tail = (parts[1] || '').slice(0, places === undefined ? 5 : places).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'fables-action', disabled: disabled || state.sending }); node.addEventListener('click', function () { Promise.resolve(fn()).catch(error => setStatus(errText(error), 'error')) }); return node }
  const pause = delay => new Promise(resolve => window.setTimeout(resolve, delay))
  const tickSqrt = tick => Math.pow(1.0001, tick / 2)

  async function retryRpc (fn, attempts) {
    let lastError
    for (let attempt = 0; attempt < (attempts || 4); attempt += 1) {
      try { return await fn() } catch (error) { lastError = error; if (attempt + 1 < (attempts || 4)) await pause(250 * (2 ** attempt)) }
    }
    throw lastError
  }

  function setStatus (text, kind) { state.status = text || ''; const node = byId('fables-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (active) { const box = byId('fables-loading'); const spin = byId('fables-loading-spin'); if (!box) return; box.hidden = !active; if (active && !state.spinner) { let index = 0; state.spinner = window.setInterval(function () { spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) } if (!active && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }
  async function limited (items, count, fn) { const output = new Array(items.length); let next = 0; async function worker () { while (next < items.length) { const index = next++; output[index] = await fn(items[index], index) } } await Promise.all(Array.from({ length: Math.min(count, Math.max(1, items.length)) }, worker)); return output }

  async function batch (calls) {
    if (!calls.length) return []
    const groups = []; for (let i = 0; i < calls.length; i += 180) groups.push(calls.slice(i, i + 180))
    const multicall = new ethers.Contract(address.multicall, multiAbi, state.rpc)
    async function execute (group) {
      const encoded = group.map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }))
      const decode = function (call, raw) { try { const result = call.iface.decodeFunctionResult(call.method, raw); return call.decode ? call.decode(result) : result.length === 1 ? result[0] : result } catch (_) { return call.fallback } }
      try { const result = await retryRpc(() => multicall.aggregate3(encoded), 3); return result.map((item, index) => item.success ? decode(group[index], item.returnData) : group[index].fallback) } catch (_) {
        if (group.length > 8) { const middle = Math.ceil(group.length / 2); const halves = await Promise.all([execute(group.slice(0, middle)), execute(group.slice(middle))]); return halves[0].concat(halves[1]) }
        return limited(group, 4, async function (call, index) { try { return decode(call, await retryRpc(() => state.rpc.call({ to: call.target, data: encoded[index].callData }), 3)) } catch (_) { return call.fallback } })
      }
    }
    const values = await limited(groups, 3, execute)
    return [].concat(...values)
  }

  async function getLogs (filter) {
    return retryRpc(async function () {
      const logs = await state.rpc.send('eth_getLogs', [{
        address: filter.address, topics: filter.topics,
        fromBlock: ethers.utils.hexValue(filter.fromBlock), toBlock: ethers.utils.hexValue(filter.toBlock)
      }])
      if (!Array.isArray(logs)) throw new Error('Log read failed.')
      return logs.map(log => Object.assign({}, log, { blockNumber: Number(log.blockNumber) }))
    }, 3)
  }

  async function discover () {
    setStatus('Pools · registry')
    const head = await retryRpc(() => state.rpc.getBlock('latest'), 3)
    state.head = head.number; state.headTime = Number(head.timestamp)
    state.feeFrom = Math.max(0, state.head - Math.floor(feeWindowSeconds / blockSeconds))
    const raw = await retryRpc(() => state.rpc.call({ to: address.registry, data: registry.encodeFunctionData('activePools') }), 3)
    const entries = registry.decodeFunctionResult('activePools', raw)[0]
    state.pools = entries.filter(entry => entry.active).map(function (entry) {
      return {
        id: entry.id, key: entry.key, hook: entry.key.hooks,
        token0: entry.key.currency0, token1: entry.key.currency1,
        tickSpacing: Number(entry.key.tickSpacing),
        ranges: [], liquidity: null, sqrtPrice: NaN, tick: null,
        amounts: [NaN, NaN], tvl: NaN, fee0: 0, fee1: 0, feeUsd: NaN, apr: NaN,
        maxFee: null, floorFee: null, paused: false, rangeCount: 0, ready: false
      }
    })
    if (!state.pools.length) throw new Error('Fables registry returned no active pools.')
    render()
  }

  async function loadChainConfig () {
    const first = state.pools[0].hook
    const heads = await batch([
      { target: first, iface: hook, method: 'poolManager', fallback: null },
      { target: first, iface: hook, method: 'openSec', fallback: null },
      { target: first, iface: hook, method: 'closeSec', fallback: null },
      { target: first, iface: hook, method: 'sessionAt', args: [state.headTime], fallback: null }
    ])
    state.poolManager = heads[0]; state.openSec = heads[1] === null ? null : Number(heads[1])
    state.closeSec = heads[2] === null ? null : Number(heads[2]); state.session = heads[3] === null ? null : Number(heads[3])
    if (!state.poolManager) throw new Error('Fables pool manager unavailable.')
  }

  async function loadTokens () {
    const list = [...new Set(state.pools.flatMap(pool => [lower(pool.token0), lower(pool.token1)]))]
    const calls = []
    list.forEach(function (value) { if (value === zeroAddress) return; calls.push({ target: value, iface: erc20, method: 'symbol', fallback: null }, { target: value, iface: erc20, method: 'decimals', fallback: null }) })
    const values = await batch(calls); let cursor = 0
    list.forEach(function (value) {
      if (value === zeroAddress) { state.tokens.set(value, { address: zeroAddress, symbol: 'ETH', decimals: 18 }); return }
      const symbol = values[cursor++]; const decimals = values[cursor++]
      state.tokens.set(value, {
        address: ethers.utils.getAddress(value),
        symbol: symbol === null ? short(value) : String(symbol).replace(/[\r\n\t]/g, ' ').slice(0, 18),
        decimals: decimals === null ? null : Number(decimals)
      })
    })
  }

  async function loadPoolState () {
    setStatus('Pools · state')
    const calls = []
    state.pools.forEach(function (pool) {
      const slot = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['bytes32', 'uint256'], [pool.id, poolsSlot]))
      calls.push({ target: state.poolManager, iface: manager, method: 'extsload', args: [slot, 4], fallback: null })
      calls.push({ target: pool.hook, iface: hook, method: 'maxFee', args: [pool.id], fallback: null })
      calls.push({ target: pool.hook, iface: hook, method: 'pokeFloor', args: [pool.id], fallback: null })
      calls.push({ target: pool.hook, iface: hook, method: 'paused', fallback: false })
    })
    const values = await batch(calls); let cursor = 0
    state.pools.forEach(function (pool) {
      const slots = values[cursor++]; const maxFee = values[cursor++]; const floorFee = values[cursor++]; const paused = values[cursor++]
      pool.maxFee = maxFee === null ? null : Number(maxFee); pool.floorFee = floorFee === null ? null : Number(floorFee); pool.paused = Boolean(paused)
      if (!slots || slots.length < 4) return
      const packed = ethers.BigNumber.from(slots[0])
      let tick = packed.shr(160).mask(24).toNumber(); if (tick >= 2 ** 23) tick -= 2 ** 24
      pool.tick = tick
      pool.sqrtPrice = Number(packed.mask(160).toString()) / 2 ** 96
      pool.liquidity = ethers.BigNumber.from(slots[3])
    })
  }

  function rangeAmounts (liquidity, sqrtPrice, tickLower, tickUpper) {
    const sa = tickSqrt(tickLower); const sb = tickSqrt(tickUpper)
    if (!(liquidity > 0) || !(sqrtPrice > 0) || !(sb > sa)) return [0, 0]
    if (sqrtPrice <= sa) return [liquidity * (sb - sa) / (sa * sb), 0]
    if (sqrtPrice >= sb) return [0, liquidity * (sb - sa)]
    return [liquidity * (sb - sqrtPrice) / (sqrtPrice * sb), liquidity * (sqrtPrice - sa)]
  }

  // Every Fables range is announced by a Deposited or Withdrawn event on its
  // own pool hook, so one full-history log read per hook enumerates the pool
  // exactly. The same read carries the FeesCollected history used for the
  // realized fee window.
  async function loadPoolRanges (pool) {
    const logs = await getLogs({ address: pool.hook, fromBlock: 0, toBlock: state.head, topics: [[depositedTopic, withdrawnTopic, feesTopic]] })
    const ids = [...new Set(logs.filter(log => log.topics[0] !== feesTopic).map(log => log.topics[2]))]
    pool.rangeCount = ids.length
    const calls = []
    ids.forEach(id => calls.push({ target: pool.hook, iface: hook, method: 'rangeState', args: [id], fallback: null }, { target: pool.hook, iface: hook, method: 'rangeKey', args: [id], fallback: null, decode: value => value }))
    const values = await batch(calls)
    pool.ranges = ids.map(function (id, index) {
      const liquidity = values[index * 2]; const key = values[index * 2 + 1]
      if (!liquidity || !key || !key.exists) return null
      const range = { id, pool, tickLower: key.tickLower, tickUpper: key.tickUpper, liquidity }
      return range
    }).filter(range => range && !range.liquidity.isZero())
    const decimals0 = token(pool.token0).decimals; const decimals1 = token(pool.token1).decimals
    let amount0 = 0; let amount1 = 0
    pool.ranges.forEach(function (range) {
      const parts = rangeAmounts(Number(range.liquidity.toString()), pool.sqrtPrice, range.tickLower, range.tickUpper)
      range.amount0 = parts[0] / Math.pow(10, decimals0); range.amount1 = parts[1] / Math.pow(10, decimals1)
      amount0 += range.amount0; amount1 += range.amount1
    })
    pool.amounts = [amount0, amount1]
    let fee0 = 0; let fee1 = 0
    logs.forEach(function (log) {
      if (log.topics[0] !== feesTopic || log.blockNumber < state.feeFrom) return
      const data = log.data.slice(2)
      fee0 += Number(ethers.BigNumber.from('0x' + data.slice(0, 64)).toString()) / Math.pow(10, decimals0)
      fee1 += Number(ethers.BigNumber.from('0x' + data.slice(64, 128)).toString()) / Math.pow(10, decimals1)
    })
    pool.fee0 = fee0; pool.fee1 = fee1; pool.ready = true
  }

  async function loadRanges () {
    let done = 0
    await limited(state.pools, 3, async function (pool) {
      try { await loadPoolRanges(pool) } catch (error) { pool.ready = false; console.warn('Fables range read failed for ' + pool.id, errText(error)) }
      done += 1; setStatus('Ranges · ' + done + '/' + state.pools.length); compute(); render()
    })
    const failed = state.pools.filter(pool => !pool.ready).length
    if (failed) setStatus(failed + ' of ' + state.pools.length + ' pools could not be read.', 'error')
  }

  async function measureFeeWindow () {
    try {
      const block = await retryRpc(() => state.rpc.getBlock(state.feeFrom), 2)
      const seconds = state.headTime - Number(block.timestamp)
      if (seconds > 0) state.feeSeconds = seconds
    } catch (_) { state.feeSeconds = feeWindowSeconds }
  }

  // USDG is the only stable anchor on the chain. Every other Fables token is
  // priced from a pool it shares with an already-priced token, so the two
  // cross pools (SPY/NVDA, SPY/GLD) resolve on a later pass.
  function compute () {
    state.prices = new Map([[lower(address.usdg), 1]]); state.confidence = new Map([[lower(address.usdg), Number.MAX_VALUE]])
    for (let pass = 0; pass < 8; pass += 1) {
      let changed = false
      state.pools.forEach(function (pool) {
        const info0 = token(pool.token0); const info1 = token(pool.token1)
        if (!pool.ready || !(pool.sqrtPrice > 0) || info0.decimals === null || info1.decimals === null) return
        const spot = Math.pow(pool.sqrtPrice, 2) * Math.pow(10, info0.decimals - info1.decimals)
        if (!(spot > 0) || !Number.isFinite(spot)) return
        const key0 = lower(pool.token0); const key1 = lower(pool.token1)
        const price0 = state.prices.get(key0); const price1 = state.prices.get(key1)
        const confidence0 = state.confidence.get(key0) || 0; const confidence1 = state.confidence.get(key1) || 0
        if (finite(price0) && pool.amounts[0] > 0) { const candidate = price0 / spot; const confidence = Math.min(confidence0, pool.amounts[0] * price0 * 2); if (candidate > minPrice && candidate < maxPrice && confidence > confidence1) { state.prices.set(key1, candidate); state.confidence.set(key1, confidence); changed = true } }
        if (finite(price1) && pool.amounts[1] > 0) { const candidate = price1 * spot; const confidence = Math.min(confidence1, pool.amounts[1] * price1 * 2); if (candidate > minPrice && candidate < maxPrice && confidence > confidence0) { state.prices.set(key0, candidate); state.confidence.set(key0, confidence); changed = true } }
      })
      if (!changed) break
    }
    state.pools.forEach(function (pool) {
      const price0 = state.prices.get(lower(pool.token0)); const price1 = state.prices.get(lower(pool.token1))
      pool.price0 = price0; pool.price1 = price1
      pool.tvl = pool.ready && finite(price0) && finite(price1) ? pool.amounts[0] * price0 + pool.amounts[1] * price1 : NaN
      pool.feeUsd = pool.ready && finite(price0) && finite(price1) ? pool.fee0 * price0 + pool.fee1 * price1 : NaN
      pool.apr = finite(pool.feeUsd) && finite(pool.tvl) && pool.tvl > 0 ? pool.feeUsd * secondsPerYear / state.feeSeconds / pool.tvl * 100 : NaN
    })
    state.positions.forEach(function (position) {
      const pool = position.pool; const info0 = token(pool.token0); const info1 = token(pool.token1)
      const parts = rangeAmounts(Number(position.shares.toString()), pool.sqrtPrice, position.tickLower, position.tickUpper)
      position.amount0 = parts[0] / Math.pow(10, info0.decimals); position.amount1 = parts[1] / Math.pow(10, info1.decimals)
      position.value = finite(pool.price0) && finite(pool.price1) ? position.amount0 * pool.price0 + position.amount1 * pool.price1 : NaN
      const owed0 = amountNum(position.owed0, info0.decimals); const owed1 = amountNum(position.owed1, info1.decimals)
      position.owedUsd = finite(pool.price0) && finite(pool.price1) ? owed0 * pool.price0 + owed1 * pool.price1 : NaN
    })
  }

  function poolName (pool) { return token(pool.token0).symbol + ' / ' + token(pool.token1).symbol }
  function poolPrice (pool) {
    const info0 = token(pool.token0); const info1 = token(pool.token1)
    if (!(pool.sqrtPrice > 0) || info0.decimals === null || info1.decimals === null) return '—'
    const spot = Math.pow(pool.sqrtPrice, 2) * Math.pow(10, info0.decimals - info1.decimals)
    if (!(spot > 0)) return '—'
    return compact(1 / spot) + ' ' + info0.symbol + ' / ' + info1.symbol
  }
  function inRange (pool, range) { return pool.sqrtPrice > tickSqrt(range.tickLower) && pool.sqrtPrice < tickSqrt(range.tickUpper) }
  function addHeader (table, labels) { const head = e('thead'); const row = e('tr'); labels.forEach(label => row.appendChild(e('th', { text: label }))); head.appendChild(row); table.appendChild(head) }
  function addCell (row, text, className) { row.appendChild(e('td', { text, className })) }

  function renderSummary () {
    const node = byId('fables-summary'); if (!node) return
    const tvl = state.pools.reduce((sum, pool) => sum + (finite(pool.tvl) ? pool.tvl : 0), 0)
    const fees = state.pools.reduce((sum, pool) => sum + (finite(pool.feeUsd) ? pool.feeUsd : 0), 0)
    const ready = state.pools.filter(pool => pool.ready).length
    const session = state.session === null ? 'unknown' : sessionNames[state.session] || 'unknown'
    const window = state.openSec === null ? '' : ' · session ' + clock(state.openSec) + '–' + clock(state.closeSec) + ' ET'
    node.textContent = 'Fables TVL ' + usd(tvl) + ' · ' + ready + '/' + state.pools.length + ' pools priced · fees ' + usd(fees) + ' / ' + Math.round(state.feeSeconds / 86400) + 'd · market ' + session + window
  }

  function renderPools () {
    const host = byId('fables-pools'); if (!host) return; host.textContent = ''
    const visible = state.pools.filter(pool => pool.ready && (state.showZero || !(finite(pool.apr) && pool.apr <= 0)))
    visible.sort((a, b) => (b.tvl || 0) - (a.tvl || 0))
    if (!visible.length) return
    const table = e('table', { className: 'fables-table' })
    addHeader(table, ['Pool', 'Price', 'TVL', 'Fee APR (' + Math.round(state.feeSeconds / 86400) + 'd)', 'Fees / ' + Math.round(state.feeSeconds / 86400) + 'd', 'Liquidity', 'Ranges', 'Fee band'])
    const body = e('tbody')
    visible.forEach(function (pool) {
      const row = e('tr'); const name = e('td')
      append(name, e('span', { className: 'fables-name', text: poolName(pool) }), e('span', { className: 'fables-sub', text: short(pool.hook) + (pool.paused ? ' · paused' : '') }))
      row.appendChild(name)
      addCell(row, poolPrice(pool))
      addCell(row, usd(pool.tvl), finite(pool.tvl) ? '' : 'fables-unpriced')
      addCell(row, percent(pool.apr), finite(pool.apr) ? '' : 'fables-unpriced')
      addCell(row, usd(pool.feeUsd))
      addCell(row, compact(pool.amounts[0]) + ' ' + token(pool.token0).symbol + '\n' + compact(pool.amounts[1]) + ' ' + token(pool.token1).symbol)
      addCell(row, String(pool.ranges.length) + ' / ' + pool.rangeCount)
      addCell(row, bps(pool.floorFee) + ' – ' + bps(pool.maxFee))
      body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function renderPositions () {
    const host = byId('fables-positions'); if (!host) return; host.textContent = ''
    host.hidden = !state.account || !state.positions.length
    if (host.hidden) return
    const table = e('table', { className: 'fables-table' })
    addHeader(table, ['Pool', 'Range', 'Status', 'Shares', 'Amounts', 'Value', 'Owed fees', 'Actions'])
    const body = e('tbody')
    state.positions.forEach(function (position) {
      const pool = position.pool; const info0 = token(pool.token0); const info1 = token(pool.token1)
      const row = e('tr'); const name = e('td')
      append(name, e('span', { className: 'fables-name', text: poolName(pool) }), e('span', { className: 'fables-sub', text: short(position.id) }))
      row.appendChild(name)
      addCell(row, position.tickLower + ' — ' + position.tickUpper)
      addCell(row, inRange(pool, position) ? 'in range' : 'out of range')
      addCell(row, position.shares.toString())
      addCell(row, compact(position.amount0) + ' ' + info0.symbol + '\n' + compact(position.amount1) + ' ' + info1.symbol)
      addCell(row, usd(position.value))
      addCell(row, formatAmount(position.owed0, info0.decimals) + ' ' + info0.symbol + '\n' + formatAmount(position.owed1, info1.decimals) + ' ' + info1.symbol)
      const actions = e('td', { className: 'fables-actions' })
      actions.appendChild(button('claim fees', function () { return claimFees(position) }))
      actions.appendChild(button('withdraw', function () { return openWithdraw(position) }))
      row.appendChild(actions); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function renderWallet () {
    const node = byId('fables-wallet-status'); if (!node) return
    node.textContent = state.account ? short(state.account) + (correctChain() ? '' : ' · wrong chain') + ' ' : ''
  }

  function render () { renderWallet(); renderSummary(); renderPools(); renderPositions(); const toggle = byId('fables-zero-toggle'); if (toggle) toggle.textContent = state.showZero ? '[ hide zero APR ]' : '[ show zero APR ]' }

  // A wallet's ranges are found from its own Deposited and incoming Transfer
  // logs across every hook, so only the ranges it has touched are read back
  // rather than the whole registry.
  async function loadPositions () {
    state.positions = []
    if (!state.account || !correctChain()) { renderPositions(); return }
    setStatus('Wallet · ranges')
    const hooks = state.pools.map(pool => pool.hook)
    const account = ethers.utils.hexZeroPad(state.account, 32).toLowerCase()
    const [deposits, transfers] = await Promise.all([
      getLogs({ address: hooks, fromBlock: 0, toBlock: state.head, topics: [depositedTopic, account] }),
      getLogs({ address: hooks, fromBlock: 0, toBlock: state.head, topics: [transferTopic, null, account] })
    ])
    const byHook = new Map(state.pools.map(pool => [lower(pool.hook), pool]))
    const candidates = new Map()
    deposits.concat(transfers).forEach(function (log) {
      const pool = byHook.get(lower(log.address)); if (!pool) return
      const id = log.topics[0] === depositedTopic ? log.topics[2] : log.topics[3]
      if (id) candidates.set(lower(log.address) + ':' + id, { pool, id })
    })
    const list = [...candidates.values()]
    if (!list.length) { setStatus(''); renderPositions(); return }
    const calls = []
    list.forEach(entry => calls.push(
      { target: entry.pool.hook, iface: hook, method: 'balanceOf', args: [state.account, entry.id], fallback: null },
      { target: entry.pool.hook, iface: hook, method: 'userPosition', args: [entry.id, state.account], fallback: null },
      { target: entry.pool.hook, iface: hook, method: 'rangeKey', args: [entry.id], fallback: null, decode: value => value }
    ))
    const values = await batch(calls)
    state.positions = list.map(function (entry, index) {
      const shares = values[index * 3]; const user = values[index * 3 + 1]; const key = values[index * 3 + 2]
      if (!shares || shares.isZero() || !key || !key.exists) return null
      return {
        id: entry.id, pool: entry.pool, shares, tickLower: key.tickLower, tickUpper: key.tickUpper,
        owed0: user ? user.owed0 : ethers.constants.Zero, owed1: user ? user.owed1 : ethers.constants.Zero,
        amount0: NaN, amount1: NaN, value: NaN, owedUsd: NaN
      }
    }).filter(Boolean)
    state.positions.sort((a, b) => (b.value || 0) - (a.value || 0))
    compute(); renderPositions(); setStatus('')
  }

  function requireWallet () { if (!state.account || !state.eip1193) throw new Error('Connect wallet.'); if (!correctChain()) throw new Error('Switch to Robinhood Chain.') }
  function deadline () { return Math.floor(Date.now() / 1000) + 1200 }
  function poolKeyArgs (pool) { return [pool.key.currency0, pool.key.currency1, pool.key.fee, pool.key.tickSpacing, pool.key.hooks] }

  async function preflight (tx) {
    try { await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data, value: '0x0' }, 'latest'] }) } catch (error) { throw new Error('Preflight failed: ' + errText(error)) }
  }

  async function send (tx) {
    await preflight(tx)
    setStatus('Confirm in wallet…')
    const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data, value: '0x0' }] })
    setStatus(hash + ' · pending')
    const receipt = await state.rpc.waitForTransaction(hash, 1, 180000)
    if (!receipt || receipt.status !== 1) throw new Error('Transaction failed.')
    setStatus('')
    await refreshAfterAction()
  }

  async function claimFees (position) {
    requireWallet()
    const pool = position.pool
    await send({ to: pool.hook, data: hook.encodeFunctionData('claimFees', [poolKeyArgs(pool), position.tickLower, position.tickUpper, state.account, 0]) })
  }

  function openWithdraw (position) {
    requireWallet()
    state.action = { position, shares: position.shares.toString(), min0: '', min1: '' }
    renderAction()
    const dialog = byId('fables-action-dialog'); if (dialog && !dialog.open) dialog.showModal()
  }

  function dialogField (host, label, key, value) {
    const row = e('div', { className: 'fables-input' }); const input = e('input')
    input.type = 'text'; input.inputMode = 'decimal'; input.autocomplete = 'off'; input.value = value || ''
    input.addEventListener('input', function () { if (state.action) state.action[key] = input.value })
    append(row, e('label', { text: label }), input); host.appendChild(row); return input
  }

  function renderAction () {
    const host = byId('fables-action-content'); if (!host) return; host.textContent = ''
    const action = state.action; if (!action) return
    const position = action.position; const pool = position.pool
    const info0 = token(pool.token0); const info1 = token(pool.token1)
    host.appendChild(e('h2', { id: 'fables-action-title', text: 'Withdraw · ' + poolName(pool) }))
    host.appendChild(e('p', { text: 'Range ' + position.tickLower + ' — ' + position.tickUpper + ' · ' + position.shares.toString() + ' shares · ' + compact(position.amount0) + ' ' + info0.symbol + ' + ' + compact(position.amount1) + ' ' + info1.symbol }))
    dialogField(host, 'Shares', 'shares', action.shares)
    dialogField(host, info0.symbol + ' min', 'min0', action.min0)
    dialogField(host, info1.symbol + ' min', 'min1', action.min1)
    const row = e('div', { className: 'fables-dialog-actions' })
    row.appendChild(button('withdraw', submitWithdraw))
    host.appendChild(row)
  }

  function parseMinimum (value, info, label) {
    if (!info || info.decimals === null) throw new Error(label + ' token metadata unavailable.')
    try { const amount = ethers.utils.parseUnits(String(value || '0').trim() || '0', info.decimals); if (amount.lt(0)) throw new Error(); return amount } catch (_) { throw new Error('Enter ' + label + '.') }
  }

  async function submitWithdraw () {
    requireWallet()
    const action = state.action; const position = action.position; const pool = position.pool
    const info0 = token(pool.token0); const info1 = token(pool.token1)
    let shares
    try { shares = ethers.BigNumber.from(String(action.shares || '').trim()) } catch (_) { throw new Error('Enter shares.') }
    if (shares.lte(0) || shares.gt(position.shares)) throw new Error('Enter shares between 1 and ' + position.shares.toString() + '.')
    const min0 = parseMinimum(action.min0, info0, info0.symbol + ' minimum')
    const min1 = parseMinimum(action.min1, info1, info1.symbol + ' minimum')
    if ((min0.isZero() || min1.isZero()) && !window.confirm('A zero minimum accepts any amount out. Continue?')) throw new Error('Cancelled.')
    if (min0.gt(maxUint128) || min1.gt(maxUint128)) throw new Error('Minimum is too large.')
    state.sending = true; renderAction()
    try {
      await send({ to: pool.hook, data: hook.encodeFunctionData('withdraw', [poolKeyArgs(pool), position.tickLower, position.tickUpper, shares, state.account, min0, min1, deadline()]) })
    } finally { state.sending = false; renderAction() }
  }

  async function refreshAfterAction () {
    const dialog = byId('fables-action-dialog'); if (dialog && dialog.open) dialog.close()
    state.action = null
    await loadPoolState(); await limited(state.pools, 3, loadPoolRanges); compute(); render(); await loadPositions()
  }

  function bindProvider (provider) {
    if (!provider || state.boundProvider === provider || !provider.on) return
    state.boundProvider = provider
    provider.on('accountsChanged', function (accounts) { adopt(provider, accounts || [], state.walletChain).catch(error => setStatus(errText(error), 'error')) })
    provider.on('chainChanged', function (chainId) { adopt(provider, state.account ? [state.account] : [], chainId).catch(error => setStatus(errText(error), 'error')) })
  }

  async function adopt (provider, accounts, chainId) {
    state.eip1193 = provider
    state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
    state.walletChain = chainId
    bindProvider(provider); render()
    if (state.account && correctChain()) await loadPositions(); else { state.positions = []; renderPositions() }
  }

  async function restoreInjected () {
    const provider = injected(); if (!provider) return
    const accounts = await provider.request({ method: 'eth_accounts' })
    const chainId = await provider.request({ method: 'eth_chainId' })
    if (accounts && accounts[0]) await adopt(provider, accounts, chainId)
  }

  async function connectInjected () {
    const provider = injected(); if (!provider) { setStatus('No injected wallet.', 'error'); return }
    const accounts = await provider.request({ method: 'eth_requestAccounts' })
    const chainId = await provider.request({ method: 'eth_chainId' })
    await adopt(provider, accounts, chainId)
    if (!correctChain()) setStatus('Switch to Robinhood Chain.', 'error')
  }

  async function connectOther () {
    const reown = await import('./config.js')
    const kit = reown.createAppKitInstance(process.env.REOWN_PROJECT_ID || '3e6154a7158ff5f7509f24405fc3b551')
    if (!kit) throw new Error('Other wallet unavailable.')
    const onAccount = async function (accountState) {
      if (!accountState || !accountState.isConnected) return
      const provider = await kit.getWalletProvider()
      await adopt(provider, await provider.request({ method: 'eth_accounts' }), await provider.request({ method: 'eth_chainId' }))
      if (state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null }
    }
    if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true })
    if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error')))
    await kit.open()
  }

  async function load () {
    await discover(); await loadChainConfig(); await loadTokens(); await loadPoolState()
    await measureFeeWindow(); compute(); render(); await loadRanges(); compute(); render()
  }

  async function refresh () {
    state.pools = []; state.tokens = new Map(); render(); loading(true)
    await load(); await loadPositions(); loading(false); if (state.status.indexOf('Ranges') === 0 || state.status.indexOf('Pools') === 0) setStatus('')
  }

  function bindUi () {
    byId('fables-connect').addEventListener('click', function () { connectInjected().catch(error => setStatus(errText(error), 'error')) })
    byId('fables-other-wallet').addEventListener('click', function () { connectOther().catch(error => setStatus(errText(error), 'error')) })
    byId('fables-zero-toggle').addEventListener('click', function () { state.showZero = !state.showZero; render() })
    byId('fables-refresh').addEventListener('click', function () { refresh().catch(fatal) })
  }

  async function start () {
    state.rpc = new ethers.providers.JsonRpcProvider({ url: chain.rpc, timeout: 20000 }, { chainId: chain.number, name: 'robinhood' })
    bindUi()
    const passive = restoreInjected().catch(error => setStatus(errText(error), 'error'))
    loading(true)
    await load()
    await passive
    await loadPositions()
    loading(false)
    if (state.status.indexOf('Ranges') === 0 || state.status.indexOf('Pools') === 0 || state.status.indexOf('Wallet') === 0) setStatus('')
    render()
  }

  function fatal (error) { console.error(error); loading(false); setStatus(errText(error), 'error'); render() }

  return { start, fatal }
})()
