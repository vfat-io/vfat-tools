/* Aero Slipstream on Arc: factory registry, Swap-log fee APRs, Merkl incentives, and EIP-1193. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { AeroPage.start().catch(AeroPage.fatal) })

const AeroPage = (function () {
  const chain = { id: '0x13b2', number: 5042, name: 'Arc', rpc: 'https://rpc.mainnet.arc.io', explorer: 'https://explorer.arc.io', nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 18 } }
  const address = {
    usdc: '0x3600000000000000000000000000000000000000',
    factory: '0xb89df768af2cfe637ceb352c587fe8edaf491d03',
    manager: '0xc84bb45d43cd25d02b83b4c085eaa4e08da8f473',
    distributor: '0x3Ef3D8bA38EBe18DB133cEc108f4D14CE00Dd9Ae',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  const merkl = {
    opportunities: 'https://api.merkl.xyz/v4/opportunities?chainId=5042&status=LIVE&items=100',
    rewards: account => 'https://api.merkl.xyz/v4/users/' + account + '/rewards?chainId=5042'
  }
  const secondsPerYear = 365 * 24 * 60 * 60
  // About 12 hours at Arc's ~0.5s blocks; the RPC keeps historical state for this range.
  const feeWindowBlocks = 86400
  const logRange = 9000
  const minPrice = 1e-12
  // Merkl reports five-figure APRs on near-empty pools; below this TVL the rate is not meaningful.
  const minIncentiveTvl = 1000
  const maxPrice = 1e12
  const q96 = 2 ** 96
  const maxUint128 = ethers.BigNumber.from(2).pow(128).sub(1)
  const swapTopic = ethers.utils.id('Swap(address,address,int256,int256,uint160,uint128,int24)')
  const swapEvent = new ethers.utils.Interface(['event Swap(address indexed sender,address indexed recipient,int256 amount0,int256 amount1,uint160 sqrtPriceX96,uint128 liquidity,int24 tick)'])
  const erc20 = new ethers.utils.Interface(['function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)'])
  const factory = new ethers.utils.Interface(['function allPoolsLength() view returns(uint256)', 'function allPools(uint256) view returns(address)'])
  const clPool = new ethers.utils.Interface(['function token0() view returns(address)', 'function token1() view returns(address)', 'function tickSpacing() view returns(int24)', 'function fee() view returns(uint24)', 'function liquidity() view returns(uint128)', 'function feeGrowthGlobal0X128() view returns(uint256)', 'function feeGrowthGlobal1X128() view returns(uint256)', 'function slot0() view returns(uint160 sqrtPriceX96,int24 tick,uint16,uint16,uint16,bool)'])
  const manager = new ethers.utils.Interface([
    'function balanceOf(address) view returns(uint256)', 'function tokenOfOwnerByIndex(address,uint256) view returns(uint256)',
    'function positions(uint256) view returns(uint96 nonce,address operator,address token0,address token1,int24 tickSpacing,int24 tickLower,int24 tickUpper,uint128 liquidity,uint256 feeGrowthInside0LastX128,uint256 feeGrowthInside1LastX128,uint128 tokensOwed0,uint128 tokensOwed1)',
    'function mint((address token0,address token1,int24 tickSpacing,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline,uint160 sqrtPriceX96)) payable returns(uint256,uint128,uint256,uint256)',
    'function increaseLiquidity((uint256 tokenId,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns(uint128,uint256,uint256)',
    'function decreaseLiquidity((uint256 tokenId,uint128 liquidity,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns(uint256,uint256)',
    'function collect((uint256 tokenId,address recipient,uint128 amount0Max,uint128 amount1Max)) payable returns(uint256,uint256)',
    'function multicall(bytes[] data) payable returns(bytes[])'
  ])
  const distributor = new ethers.utils.Interface(['function claim(address[] users,address[] tokens,uint256[] amounts,bytes32[][] proofs)'])
  const multicall = new ethers.utils.Interface(['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)'])
  const state = {
    pools: [], tokens: new Map(), prices: new Map(), confidence: new Map(), poolCount: null,
    head: null, feeSeconds: null, feesReady: false, feeFailed: false, showZero: false,
    incentives: new Map(), incentivesReady: false, incentivesFailed: false,
    eip1193: null, account: null, walletChain: null, boundProvider: null, reownUnsubscribe: null,
    action: null, actionInfo: null, positions: [], positionsLoading: false, positionsFailed: false, merklRewards: [], sending: false, status: '', spinner: null
  }
  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const short = value => value ? value.slice(0, 6) + '…' + value.slice(-4) : '—'
  const finite = value => Number.isFinite(value) && value >= 0
  const correctChain = () => lower(state.walletChain) === chain.id
  const injected = () => window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null
  const token = value => state.tokens.get(lower(value)) || { address: value, symbol: short(value), decimals: null }
  const errText = error => String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').replace(/\s+/g, ' ').slice(0, 360)
  const compact = value => { if (!finite(value)) return '—'; if (value >= 1e9) return (value / 1e9).toFixed(2) + 'b'; if (value >= 1e6) return (value / 1e6).toFixed(2) + 'm'; if (value >= 1e3) return (value / 1e3).toFixed(2) + 'k'; if (value >= 1) return value.toFixed(2); return value > 0 ? value.toPrecision(3) : '0' }
  const usd = value => finite(value) ? '$' + compact(value) : '—'
  const percent = value => finite(value) ? compact(value) + '%' : '—'
  const amountNum = (value, decimals) => { try { const number = Number(ethers.utils.formatUnits(value, decimals)); return Number.isFinite(number) ? number : NaN } catch (_) { return NaN } }
  const formatAmount = (value, decimals) => { try { const parts = ethers.utils.formatUnits(value, decimals).split('.'); const tail = (parts[1] || '').slice(0, 6).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const formatNum = value => { if (!Number.isFinite(value)) return '—'; if (value === 0) return '0'; const abs = Math.abs(value); if (abs >= 1e6) return compact(value); if (abs >= 1) return value.toFixed(abs >= 1000 ? 2 : 4).replace(/\.?0+$/, ''); return value.toPrecision(4) }
  const feeText = fee => (fee / 10000).toFixed(4).replace(/0+$/, '').replace(/\.$/, '') + '%'
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'aero-action', disabled: disabled || state.sending }); node.addEventListener('click', function () { Promise.resolve(fn()).catch(error => setStatus(errText(error), 'error')) }); return node }
  /* Arc's own RPC first; the rest are public fallbacks for when it is unreachable. ?rpc=<url> overrides them. */
  const rpcEndpoints = (function () {
    const list = ['https://rpc.mainnet.arc.io', 'https://rpc.blockdaemon.mainnet.arc.io', 'https://rpc.arc-scan.org', 'https://arc-mainnet.drpc.org']
    try {
      const custom = new URLSearchParams(window.location.search).get('rpc')
      if (custom && /^https:\/\//i.test(custom)) return [custom].concat(list)
    } catch (_) {}
    return list
  })()
  let rpcIndex = 0
  const currentRpc = () => rpcEndpoints[rpcIndex % rpcEndpoints.length]
  const nextRpc = () => { rpcIndex += 1 }
  const isTransport = error => Boolean(error && error.transport)
  const pause = delay => new Promise(resolve => window.setTimeout(resolve, delay))

  function setStatus (text, kind) { state.status = text || ''; const node = byId('aero-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (active) { const box = byId('aero-loading'); const spin = byId('aero-loading-spin'); if (!box) return; box.hidden = !active; if (active && !state.spinner) { let index = 0; state.spinner = window.setInterval(function () { spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) } if (!active && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }

  const logSpacing = 450
  const maxLogAddresses = 20
  /* eth_getLogs has a tighter rate limit than eth_call, so log queries start at least logSpacing ms apart. */
  let nextLogsAt = 0
  async function logsTurn () { const now = Date.now(); const at = Math.max(now, nextLogsAt); nextLogsAt = at + logSpacing; if (at > now) await pause(at - now) }
  // The Arc RPC answers rate limits with a JSON-RPC error body, so retry on
  // that as well as on transport failures.
  async function rpcBatch (calls, options) {
    const o = options || {}; const attempts = o.attempts || 10; let lastError
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const controller = new window.AbortController(); const timer = window.setTimeout(function () { controller.abort() }, o.timeout || 20000)
      try {
        const body = calls.map((call, index) => ({ jsonrpc: '2.0', id: index + 1, method: call.method, params: call.params }))
        let response
        try { response = await window.fetch(currentRpc(), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body.length === 1 ? body[0] : body), signal: controller.signal }) } catch (error) { error.transport = true; throw error }
        let values = await response.json(); if (!Array.isArray(values)) values = [values]
        if (!response.ok && !values.length) throw new Error('RPC unavailable.')
        const map = new Map(values.map(value => [value.id, value]))
        const results = body.map(value => map.get(value.id) || { error: { message: 'Missing RPC response.' } })
        if (results.some(value => value.error && (value.error.code === -32005 || /rate limit/i.test(value.error.message || '')))) throw new Error('RPC rate limit.')
        return results
      } catch (error) { lastError = error; if (isTransport(error)) nextRpc(); if (attempt + 1 < attempts) await pause(Math.min(8000, 400 * (2 ** attempt))) } finally { window.clearTimeout(timer) }
    }
    throw lastError
  }
  async function rpc (method, params, options) { const value = (await rpcBatch([{ method, params }], options))[0]; if (value.error) { const error = new Error(value.error.message || 'RPC error.'); error.data = value.error.data; throw error } return value.result }

  async function batch (calls) {
    if (!calls.length) return []
    const decode = function (call, raw) { try { const result = call.iface.decodeFunctionResult(call.method, raw); return call.whole ? result : result.length === 1 ? result[0] : result } catch (_) { return call.fallback } }
    const output = []
    for (let start = 0; start < calls.length; start += 150) {
      const group = calls.slice(start, start + 150)
      const data = multicall.encodeFunctionData('aggregate3', [group.map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }))])
      const raw = await rpc('eth_call', [{ to: address.multicall, data }, 'latest'])
      const result = multicall.decodeFunctionResult('aggregate3', raw)[0]
      result.forEach((item, index) => output.push(item.success ? decode(group[index], item.returnData) : group[index].fallback))
    }
    return output
  }

  async function discover () {
    state.head = Number(await rpc('eth_blockNumber', []))
    const count = Number((await batch([{ target: address.factory, iface: factory, method: 'allPoolsLength', fallback: ethers.constants.Zero }]))[0]); state.poolCount = count
    const addresses = await batch(Array.from({ length: count }, (_, index) => ({ target: address.factory, iface: factory, method: 'allPools', args: [index], fallback: null })))
    state.pools = addresses.filter(Boolean).map((value, index) => ({ address: ethers.utils.getAddress(value), index, ready: false, fee0: ethers.constants.Zero, fee1: ethers.constants.Zero }))
    await hydratePools()
  }

  async function hydratePools () {
    const calls = []
    state.pools.forEach(pool => calls.push(
      { target: pool.address, iface: clPool, method: 'token0', fallback: null }, { target: pool.address, iface: clPool, method: 'token1', fallback: null },
      { target: pool.address, iface: clPool, method: 'tickSpacing', fallback: null }, { target: pool.address, iface: clPool, method: 'fee', fallback: null },
      { target: pool.address, iface: clPool, method: 'slot0', fallback: null, whole: true }, { target: pool.address, iface: clPool, method: 'liquidity', fallback: null }
    ))
    const values = await batch(calls); let cursor = 0
    state.pools.forEach(function (pool) { pool.token0 = values[cursor++]; pool.token1 = values[cursor++]; const spacing = values[cursor++]; const fee = values[cursor++]; pool.slot0 = values[cursor++]; pool.liquidity = values[cursor++]; pool.tickSpacing = spacing === null ? null : Number(spacing); pool.swapFee = fee === null ? null : Number(fee) })
    await loadTokens([].concat(...state.pools.map(pool => [pool.token0, pool.token1])).filter(Boolean))
    const balances = []
    state.pools.forEach(pool => balances.push({ target: pool.token0 || address.usdc, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null }, { target: pool.token1 || address.usdc, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null }))
    const reserves = await batch(balances)
    state.pools.forEach(function (pool, index) { pool.reserve0 = reserves[index * 2]; pool.reserve1 = reserves[index * 2 + 1]; pool.ready = Boolean(pool.token0 && pool.token1 && pool.slot0 && pool.tickSpacing !== null && pool.swapFee !== null && pool.reserve0 !== null && pool.reserve1 !== null) })
    compute(); render()
  }

  async function loadTokens (values) {
    const list = [...new Set(values.map(lower))].filter(value => value && !state.tokens.has(value))
    if (!list.length) return
    const calls = []; list.forEach(value => calls.push({ target: value, iface: erc20, method: 'symbol', fallback: null }, { target: value, iface: erc20, method: 'decimals', fallback: null }))
    const results = await batch(calls)
    list.forEach(function (value, index) { const raw = results[index * 2]; const symbol = raw === null ? short(value) : String(raw).replace(/[\r\n\t]/g, ' ').slice(0, 18); const decimals = results[index * 2 + 1]; state.tokens.set(value, { address: ethers.utils.getAddress(value), symbol, decimals: decimals === null ? null : Number(decimals) }) })
  }

  function sqrtPrice (pool) { const value = pool.slot0 && Number(pool.slot0.sqrtPriceX96.toString()) / q96; return Number.isFinite(value) && value > 0 ? value : NaN }
  // token1 per token0, decimal-adjusted.
  function poolSpot (pool) { const t0 = token(pool.token0); const t1 = token(pool.token1); if (t0.decimals === null || t1.decimals === null) return NaN; const value = sqrtPrice(pool) ** 2 * (10 ** (t0.decimals - t1.decimals)); return Number.isFinite(value) && value > 0 ? value : NaN }
  function tickPrice (pool, tick) { const t0 = token(pool.token0); const t1 = token(pool.token1); return Math.pow(1.0001, tick) * (10 ** (t0.decimals - t1.decimals)) }

  function compute () {
    state.prices = new Map([[lower(address.usdc), 1]]); state.confidence = new Map([[lower(address.usdc), Number.MAX_VALUE]])
    state.pools.forEach(function (pool) { if (!pool.ready) return; const t0 = token(pool.token0); const t1 = token(pool.token1); pool.amounts = t0.decimals === null || t1.decimals === null ? [NaN, NaN] : [amountNum(pool.reserve0, t0.decimals), amountNum(pool.reserve1, t1.decimals)]; pool.spot = poolSpot(pool) })
    for (let pass = 0; pass < 8; pass += 1) {
      let changed = false
      state.pools.forEach(function (pool) {
        if (!pool.ready || !finite(pool.spot) || !pool.amounts || pool.liquidity === null || pool.liquidity.isZero()) return
        const key0 = lower(pool.token0); const key1 = lower(pool.token1); const price0 = state.prices.get(key0); const price1 = state.prices.get(key1); const confidence0 = state.confidence.get(key0) || 0; const confidence1 = state.confidence.get(key1) || 0
        if (finite(price0) && pool.amounts[0] > 0) { const candidate = price0 / pool.spot; const confidence = Math.min(confidence0, pool.amounts[0] * price0 * 2); if (candidate > minPrice && candidate < maxPrice && confidence > confidence1) { state.prices.set(key1, candidate); state.confidence.set(key1, confidence); changed = true } }
        if (finite(price1) && pool.amounts[1] > 0) { const candidate = price1 * pool.spot; const confidence = Math.min(confidence1, pool.amounts[1] * price1 * 2); if (candidate > minPrice && candidate < maxPrice && confidence > confidence0) { state.prices.set(key0, candidate); state.confidence.set(key0, confidence); changed = true } }
      })
      if (!changed) break
    }
    state.pools.forEach(function (pool) {
      if (!pool.ready) return
      const price0 = state.prices.get(lower(pool.token0)); const price1 = state.prices.get(lower(pool.token1))
      pool.tvl = pool.amounts && finite(price0) && finite(price1) ? pool.amounts[0] * price0 + pool.amounts[1] * price1 : NaN
      const t0 = token(pool.token0); const t1 = token(pool.token1); const fee0 = amountNum(pool.fee0, t0.decimals); const fee1 = amountNum(pool.fee1, t1.decimals)
      pool.feeUsd = !state.feesReady || !pool.feeCovered || (fee0 > 0 && !finite(price0)) || (fee1 > 0 && !finite(price1)) ? NaN : (fee0 || 0) * (price0 || 0) + (fee1 || 0) * (price1 || 0)
      const hasTvl = finite(pool.tvl) && pool.tvl >= 1
      pool.apr = finite(pool.feeUsd) && finite(state.feeSeconds) && hasTvl ? pool.feeUsd * secondsPerYear / state.feeSeconds / pool.tvl * 100 : pool.feeUsd === 0 ? 0 : NaN
      const incentive = state.incentives.get(lower(pool.address))
      pool.incentiveDaily = NaN; pool.incentiveApr = NaN
      if (state.incentivesReady) {
        if (!incentive) { pool.incentiveDaily = 0; pool.incentiveApr = 0 } else {
          let daily = 0
          incentive.rewards.forEach(function (reward) { const price = state.prices.get(lower(reward.token)); daily = finite(price) && finite(reward.amount) ? daily + reward.amount * price : NaN })
          pool.incentiveDaily = daily
          pool.incentiveApr = finite(daily) && hasTvl && incentive.tvl >= minIncentiveTvl && pool.tvl >= minIncentiveTvl && pool.liquidity && !pool.liquidity.isZero() ? daily * 365 / pool.tvl * 100 : daily === 0 ? 0 : NaN
        }
      }
      const parts = [pool.apr, pool.incentiveApr].filter(finite); pool.totalApr = parts.length ? parts.reduce((sum, value) => sum + value, 0) : NaN
      pool.live = parts.some(value => value > 0)
    })
  }

  async function feeWindow () {
    const from = Math.max(0, state.head - feeWindowBlocks)
    const blocks = await rpcBatch([{ method: 'eth_getBlockByNumber', params: [ethers.utils.hexValue(state.head), false] }, { method: 'eth_getBlockByNumber', params: [ethers.utils.hexValue(from), false] }], { timeout: 12000 })
    if (!blocks[0].result || !blocks[1].result) throw new Error('Fee window unavailable.')
    state.feeFrom = from; state.feeSeconds = Math.max(1, Number(blocks[0].result.timestamp) - Number(blocks[1].result.timestamp))
  }

  // Arc RPCs cap eth_getLogs below 10,000 blocks and at 20 addresses per filter, so split the window and the pool list.
  async function loadSwapLogs (addresses) {
    const ranges = []; for (let to = state.head; to > state.feeFrom; to -= logRange) ranges.push([Math.max(state.feeFrom + 1, to - logRange + 1), to])
    const groups = []; for (let start = 0; start < addresses.length; start += maxLogAddresses) groups.push(addresses.slice(start, start + maxLogAddresses))
    const logs = []
    for (const group of groups) {
      for (const range of ranges) {
        await logsTurn()
        const results = await rpcBatch([{ method: 'eth_getLogs', params: [{ address: group, topics: [swapTopic], fromBlock: ethers.utils.hexValue(range[0]), toBlock: ethers.utils.hexValue(range[1]) }] }], { timeout: 30000, attempts: 8 })
        results.forEach(function (result) { if (!Array.isArray(result.result)) throw new Error(result.error && result.error.message || 'Swap logs unavailable.'); logs.push(...result.result) })
      }
    }
    return logs
  }

  async function feeGrowthAt (pools, block) {
    const calls = []; pools.forEach(pool => calls.push({ target: pool.address, iface: clPool, method: 'feeGrowthGlobal0X128', fallback: null }, { target: pool.address, iface: clPool, method: 'feeGrowthGlobal1X128', fallback: null }))
    const data = multicall.encodeFunctionData('aggregate3', [calls.map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method) }))])
    const raw = await rpc('eth_call', [{ to: address.multicall, data }, ethers.utils.hexValue(block)], { attempts: 8 })
    const result = multicall.decodeFunctionResult('aggregate3', raw)[0]
    return pools.map((pool, index) => [0, 1].map(function (side) { const item = result[index * 2 + side]; try { return item.success ? clPool.decodeFunctionResult(calls[index * 2 + side].method, item.returnData)[0] : null } catch (_) { return null } }))
  }

  // Slipstream fees on Arc are dynamic and change without events. Swap logs give the
  // input amounts and active liquidity; the feeGrowthGlobal delta over the same blocks
  // gives the effective rate those swaps paid. The current fee is the fallback.
  function effectiveFee (growthDelta, weighted, input, pool) {
    if (!(input > 0)) return 0
    const rate = growthDelta !== null && weighted > 0 ? growthDelta / weighted : NaN
    return (Number.isFinite(rate) && rate >= 0 && rate <= 0.1 ? rate : (pool.swapFee || 0) / 1000000) * input
  }

  async function loadFees () {
    state.feesReady = false; state.feeFailed = false
    const pools = state.pools.filter(pool => pool.ready)
    pools.forEach(pool => { pool.fee0 = ethers.constants.Zero; pool.fee1 = ethers.constants.Zero; pool.feeCovered = false })
    try {
      await feeWindow()
      const [logs, startGrowth, endGrowth] = await Promise.all([
        loadSwapLogs(pools.map(pool => pool.address)),
        feeGrowthAt(pools, state.feeFrom).catch(() => pools.map(() => [null, null])),
        feeGrowthAt(pools, state.head).catch(() => pools.map(() => [null, null]))
      ])
      const map = new Map(pools.map((pool, index) => [lower(pool.address), { pool, input: [0, 0], weighted: [0, 0], index }]))
      logs.forEach(function (log) {
        const entry = map.get(lower(log.address)); if (!entry) return
        try {
          const value = swapEvent.parseLog(log).args; const liquidity = Number(value.liquidity.toString())
          ;[value.amount0, value.amount1].forEach(function (amount, side) { if (!amount.gt(0)) return; const input = Number(amount.toString()); entry.input[side] += input; if (liquidity > 0) entry.weighted[side] += input / liquidity })
        } catch (_) {}
      })
      map.forEach(function (entry) {
        const fees = [0, 1].map(function (side) {
          const before = startGrowth[entry.index][side]; const after = endGrowth[entry.index][side]
          const delta = before !== null && after !== null && after.gte(before) ? Number(after.sub(before).toString()) / (2 ** 128) : null
          return effectiveFee(delta, entry.weighted[side], entry.input[side], entry.pool)
        })
        entry.pool.fee0 = ethers.BigNumber.from(BigInt(Math.floor(fees[0])).toString()); entry.pool.fee1 = ethers.BigNumber.from(BigInt(Math.floor(fees[1])).toString()); entry.pool.feeCovered = true
      })
    } catch (error) { state.feeFailed = true; console.error(error) }
    state.feesReady = true; compute(); render()
  }

  async function loadIncentives () {
    state.incentivesReady = false; state.incentivesFailed = false
    try {
      const controller = new window.AbortController(); const timer = window.setTimeout(function () { controller.abort() }, 15000)
      let values
      try { const response = await window.fetch(merkl.opportunities, { signal: controller.signal }); if (!response.ok) throw new Error('Merkl unavailable.'); values = await response.json() } finally { window.clearTimeout(timer) }
      const incentives = new Map()
      ;(Array.isArray(values) ? values : []).forEach(function (item) {
        if (!item || item.chainId !== chain.number || item.status !== 'LIVE' || !ethers.utils.isAddress(item.identifier || '')) return
        const breakdowns = item.rewardsRecord && Array.isArray(item.rewardsRecord.breakdowns) ? item.rewardsRecord.breakdowns : []
        const rewards = breakdowns.map(function (breakdown) { const info = breakdown.token || {}; return { token: info.address, symbol: info.symbol, amount: amountNum(breakdown.amount || '0', Number(info.decimals)) } }).filter(reward => ethers.utils.isAddress(reward.token || ''))
        if (rewards.length) incentives.set(lower(item.identifier), { rewards, tvl: Number(item.tvl) })
      })
      state.incentives = incentives
    } catch (error) { state.incentivesFailed = true; console.error(error) }
    state.incentivesReady = !state.incentivesFailed; compute(); render()
  }

  function poolName (pool) { return token(pool.token0).symbol + ' / ' + token(pool.token1).symbol }
  function poolType (pool) { return 'CL' + pool.tickSpacing + ' · ' + feeText(pool.swapFee || 0) }
  function incentiveLabel () { const symbols = new Set(); state.pools.forEach(pool => { const incentive = state.incentives.get(lower(pool.address)); if (incentive) incentive.rewards.forEach(reward => symbols.add(reward.symbol)) }); return symbols.size === 1 ? [...symbols][0] + ' APR' : 'Incentive APR' }
  function addHeader (table, labels) { const head = e('thead'); const row = e('tr'); labels.forEach(label => row.appendChild(e('th', { text: label }))); head.appendChild(row); table.appendChild(head) }
  function addCell (row, text, className) { const cell = e('td', { text, className }); row.appendChild(cell); return cell }

  function isVisible (pool) {
    if (!pool.ready) return false
    if (state.showZero) return true
    if (!state.feesReady || state.feeFailed || !(state.incentivesReady || state.incentivesFailed)) return true
    if (pool.live) return true
    // Keep rows whose APR cannot be priced; drop rows that earned no fees and carry no incentive.
    return !(pool.apr === 0 && !(pool.incentiveApr > 0))
  }

  function renderPools () {
    const host = byId('aero-pools'); if (!host) return; host.textContent = ''
    const visible = state.pools.filter(isVisible)
    visible.sort((a, b) => (b.totalApr || 0) - (a.totalApr || 0) || (b.tvl || 0) - (a.tvl || 0))
    if (!state.pools.some(pool => pool.ready)) return
    if (!visible.length) { const empty = e('p', { className: 'aero-summary', text: 'No live Aero pools. ' }); empty.appendChild(button('show 0 APR pools', toggleZero)); host.appendChild(empty); return }
    const table = e('table', { className: 'aero-table aero-pool-table' })
    addHeader(table, ['Pool', 'TVL', 'Fee APR (12h)', incentiveLabel(), 'Fees / 12h', 'Type', 'Actions'])
    const body = e('tbody')
    visible.forEach(function (pool) {
      const row = e('tr'); const name = e('td'); append(name, e('span', { className: 'aero-name', text: poolName(pool) }), e('span', { className: 'aero-sub', text: short(pool.address) })); row.appendChild(name)
      addCell(row, usd(pool.tvl), finite(pool.tvl) ? '' : 'aero-unpriced')
      addCell(row, state.feesReady ? percent(pool.apr) : '…', finite(pool.apr) ? '' : 'aero-unpriced')
      addCell(row, state.incentivesReady ? percent(pool.incentiveApr) : state.incentivesFailed ? '—' : '…', finite(pool.incentiveApr) ? '' : 'aero-unpriced')
      addCell(row, state.feesReady ? usd(pool.feeUsd) : '…'); addCell(row, poolType(pool))
      const actions = e('td', { className: 'aero-actions' }); actions.appendChild(button('add', function () { return openPoolAction(pool) })); row.appendChild(actions)
      body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function renderSummary () {
    const node = byId('aero-summary'); if (!node) return
    const ready = state.pools.filter(pool => pool.ready); const priced = ready.filter(pool => finite(pool.tvl))
    const tvl = priced.reduce((sum, pool) => sum + pool.tvl, 0)
    if (!ready.length) { node.textContent = 'Aero —'; return }
    node.textContent = 'Aero TVL ' + usd(tvl) + ' · ' + priced.length + '/' + ready.length + ' priced'
  }

  function renderWallet () {
    const node = byId('aero-wallet-status'); if (node) node.textContent = state.account ? short(state.account) + (correctChain() ? '' : ' · wrong network') + ' ' : ''
    const switcher = byId('aero-switch'); if (switcher) switcher.hidden = !state.account || correctChain()
  }

  function positionAmounts (position) {
    const pool = position.pool; const t0 = token(pool.token0); const t1 = token(pool.token1); const liquidity = Number(position.liquidity.toString()); const sp = sqrtPrice(pool)
    const sa = Math.pow(1.0001, position.tickLower / 2); const sb = Math.pow(1.0001, position.tickUpper / 2)
    let raw0 = 0; let raw1 = 0
    if (sp <= sa) raw0 = liquidity * (sb - sa) / (sa * sb)
    else if (sp < sb) { raw0 = liquidity * (sb - sp) / (sp * sb); raw1 = liquidity * (sp - sa) } else raw1 = liquidity * (sb - sa)
    return [raw0 / (10 ** t0.decimals), raw1 / (10 ** t1.decimals)]
  }

  function renderPositions () {
    const host = byId('aero-positions'); if (!host) return; host.textContent = ''
    host.hidden = !state.account || !correctChain(); if (host.hidden) return
    const claimable = state.merklRewards.filter(reward => reward.claimable.gt(0))
    if (claimable.length) {
      const line = e('p', { className: 'aero-summary', text: 'MERKL : ' + claimable.map(reward => formatAmount(reward.claimable, reward.decimals) + ' ' + reward.symbol).join(' · ') + ' claimable ' })
      line.appendChild(button('claim', claimMerkl)); host.appendChild(line)
    }
    if (state.positionsLoading) return
    if (state.positionsFailed) { host.appendChild(e('p', { className: 'aero-summary', text: 'Wallet CL NFTs unavailable.' })); return }
    if (!state.positions.length) { host.appendChild(e('p', { className: 'aero-summary', text: 'No wallet CL NFTs.' })); return }
    const table = e('table', { className: 'aero-table aero-position-table' }); addHeader(table, ['Position', 'Value', 'Range', 'Fees', 'Type', 'Actions']); const body = e('tbody')
    state.positions.forEach(function (position) {
      const pool = position.pool; const t0 = token(pool.token0); const t1 = token(pool.token1); const price0 = state.prices.get(lower(pool.token0)); const price1 = state.prices.get(lower(pool.token1))
      const row = e('tr'); const name = e('td'); append(name, e('span', { className: 'aero-name', text: poolName(pool) }), e('span', { className: 'aero-sub', text: '#' + position.id.toString() })); row.appendChild(name)
      const amounts = position.liquidity.isZero() ? [0, 0] : positionAmounts(position); const value = finite(price0) && finite(price1) ? amounts[0] * price0 + amounts[1] * price1 : NaN
      addCell(row, usd(value) + '\n' + formatNum(amounts[0]) + ' ' + t0.symbol + '\n' + formatNum(amounts[1]) + ' ' + t1.symbol)
      const tick = Number(pool.slot0.tick); const inRange = tick >= position.tickLower && tick < position.tickUpper
      addCell(row, formatNum(tickPrice(pool, position.tickLower)) + ' — ' + formatNum(tickPrice(pool, position.tickUpper)) + ' ' + t1.symbol + '/' + t0.symbol + '\n' + (position.liquidity.isZero() ? 'closed' : inRange ? 'in range' : 'out of range'))
      const fees0 = amountNum(position.fees0, t0.decimals); const fees1 = amountNum(position.fees1, t1.decimals); const feeValue = finite(price0) && finite(price1) ? fees0 * price0 + fees1 * price1 : NaN
      addCell(row, usd(feeValue) + '\n' + formatAmount(position.fees0, t0.decimals) + ' ' + t0.symbol + '\n' + formatAmount(position.fees1, t1.decimals) + ' ' + t1.symbol)
      addCell(row, poolType(pool))
      const actions = e('td', { className: 'aero-actions' })
      actions.appendChild(button('add', function () { return openPositionAction(position, 'increase') }))
      actions.appendChild(button('remove', function () { return openPositionAction(position, 'decrease') }, position.liquidity.isZero()))
      actions.appendChild(button('collect', function () { return collectPosition(position) }, position.fees0.isZero() && position.fees1.isZero()))
      row.appendChild(actions); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function render () {
    renderWallet(); renderSummary(); renderPools(); renderPositions()
    const toggle = byId('aero-zero-toggle'); if (toggle) toggle.textContent = state.showZero ? '[ hide 0 APR pools ]' : '[ show 0 APR pools ]'
    if (state.action) renderAction()
  }

  function toggleZero () { state.showZero = !state.showZero; render() }

  function requireWallet () { if (!state.account || !state.eip1193) throw new Error('Connect wallet.'); if (!correctChain()) throw new Error('Switch to Arc.') }
  function deadline () { return Math.floor(Date.now() / 1000) + 1200 }
  function parseAmount (value, info, label, allowZero) { if (!info || info.decimals === null) throw new Error(label + ' token metadata unavailable.'); const text = String(value || '').trim() || (allowZero ? '0' : ''); try { const amount = ethers.utils.parseUnits(text, info.decimals); if (amount.lt(0) || (!allowZero && amount.isZero())) throw new Error(); return amount } catch (_) { throw new Error('Enter ' + label + '.') } }
  function toUnits (value, decimals) { if (!(value > 0) || !Number.isFinite(value)) return ethers.constants.Zero; const text = value.toFixed(Math.min(decimals, 18)); try { return ethers.utils.parseUnits(text, decimals) } catch (_) { return ethers.constants.Zero } }
  function dialogField (host, label, key, value, onInput) { const row = e('div', { className: 'aero-input' }); const input = e('input'); input.type = 'text'; input.inputMode = 'decimal'; input.autocomplete = 'off'; input.value = value || ''; input.dataset.key = key; input.addEventListener('input', function () { if (!state.action) return; state.action[key] = input.value; if (onInput) onInput(input.value) }); append(row, e('label', { text: label }), input); host.appendChild(row); return input }
  function dialogButtonRow (host, buttons) { const row = e('div', { className: 'aero-dialog-actions' }); buttons.forEach(item => row.appendChild(button(item[0], item[1], item[2]))); host.appendChild(row) }
  function showDialog () { const dialog = byId('aero-action-dialog'); if (dialog && !dialog.open) dialog.showModal() }
  function setInput (key, value) { const node = document.querySelector('#aero-action-content input[data-key="' + key + '"]'); if (node) node.value = value }

  // Raw-unit sqrt prices for a range, used for both the paired-amount helper and the minimums.
  function rangeSqrt (action) { return [Math.pow(1.0001, Number(action.tickLower) / 2), Math.pow(1.0001, Number(action.tickUpper) / 2)] }
  function liquidityFor (pool, action, raw0, raw1) {
    const sp = sqrtPrice(pool); const [sa, sb] = rangeSqrt(action)
    if (sp <= sa) return raw0 * sa * sb / (sb - sa)
    if (sp >= sb) return raw1 / (sb - sa)
    const l0 = raw0 > 0 ? raw0 * sp * sb / (sb - sp) : Infinity; const l1 = raw1 > 0 ? raw1 / (sp - sa) : Infinity; return Math.min(l0, l1)
  }
  function amountsFor (pool, action, liquidity) {
    const sp = sqrtPrice(pool); const [sa, sb] = rangeSqrt(action)
    if (sp <= sa) return [liquidity * (sb - sa) / (sa * sb), 0]
    if (sp >= sb) return [0, liquidity * (sb - sa)]
    return [liquidity * (sb - sp) / (sp * sb), liquidity * (sp - sa)]
  }
  function validRange (action) { const lowerTick = Number(action.tickLower); const upperTick = Number(action.tickUpper); const spacing = action.pool.tickSpacing; return Number.isInteger(lowerTick) && Number.isInteger(upperTick) && lowerTick < upperTick && lowerTick % spacing === 0 && upperTick % spacing === 0 && lowerTick >= -887272 && upperTick <= 887272 }
  function pairAmount (side) {
    const action = state.action; if (!action || !validRange(action)) return; const pool = action.pool; const t0 = token(pool.token0); const t1 = token(pool.token1)
    const value = Number(side === 0 ? action.amount0 : action.amount1); if (!(value > 0)) return
    const sp = sqrtPrice(pool); const [sa, sb] = rangeSqrt(action)
    if (sp <= sa || sp >= sb) { if (side === 0 && sp >= sb) { action.amount0 = ''; setInput('amount0', '') } if (side === 1 && sp <= sa) { action.amount1 = ''; setInput('amount1', '') } return }
    if (side === 0) { const liquidity = value * (10 ** t0.decimals) * sp * sb / (sb - sp); const other = liquidity * (sp - sa) / (10 ** t1.decimals); action.amount1 = trimDecimal(other, t1.decimals); setInput('amount1', action.amount1) } else { const liquidity = value * (10 ** t1.decimals) / (sp - sa); const other = liquidity * (sb - sp) / (sp * sb) / (10 ** t0.decimals); action.amount0 = trimDecimal(other, t0.decimals); setInput('amount0', action.amount0) }
    renderPreview()
  }
  function trimDecimal (value, decimals) { if (!Number.isFinite(value) || value <= 0) return ''; return value.toFixed(Math.min(decimals, 8)).replace(/\.?0+$/, '') }

  async function loadActionInfo () {
    if (!state.action || !state.account || !correctChain()) { state.actionInfo = null; renderAction(); return }
    const pool = state.action.pool
    const values = await batch([
      { target: pool.token0, iface: erc20, method: 'balanceOf', args: [state.account], fallback: null }, { target: pool.token1, iface: erc20, method: 'balanceOf', args: [state.account], fallback: null },
      { target: pool.token0, iface: erc20, method: 'allowance', args: [state.account, address.manager], fallback: null }, { target: pool.token1, iface: erc20, method: 'allowance', args: [state.account, address.manager], fallback: null }
    ])
    state.actionInfo = { balance0: values[0], balance1: values[1], allowance0: values[2], allowance1: values[3] }; renderAction()
  }

  function defaultRange (pool) {
    const spacing = pool.tickSpacing; const tick = Number(pool.slot0.tick); const half = spacing === 1 ? 50 : Math.max(spacing * 2, Math.round(500 / spacing) * spacing)
    const base = Math.floor(tick / spacing) * spacing
    return [base - half, base + half + spacing]
  }

  async function openPoolAction (pool) {
    requireWallet(); const range = defaultRange(pool)
    state.action = { kind: 'mint', pool, amount0: '', amount1: '', slippage: '1', tickLower: String(range[0]), tickUpper: String(range[1]) }; state.actionInfo = null; renderAction(); showDialog(); await loadActionInfo()
  }

  async function openPositionAction (position, mode) {
    requireWallet()
    state.action = { kind: mode, pool: position.pool, position, amount0: '', amount1: '', slippage: '1', percent: '100', tickLower: String(position.tickLower), tickUpper: String(position.tickUpper) }; state.actionInfo = null; renderAction(); showDialog(); await loadActionInfo()
  }

  function renderPreview () {
    const node = byId('aero-preview'); if (!node || !state.action) return
    try { const plan = planAction(false); node.textContent = plan.preview } catch (error) { node.textContent = errText(error) }
  }

  function renderAction () {
    const host = byId('aero-action-content'); if (!host) return; const action = state.action; if (!action) { host.textContent = ''; return }
    const active = document.activeElement && host.contains(document.activeElement) && document.activeElement.dataset ? document.activeElement.dataset.key : null
    host.textContent = ''
    const pool = action.pool; const t0 = token(pool.token0); const t1 = token(pool.token1)
    const title = action.kind === 'mint' ? 'Add · ' : action.kind === 'increase' ? 'Add #' + action.position.id + ' · ' : 'Remove #' + action.position.id + ' · '
    host.appendChild(e('h2', { id: 'aero-action-title', text: title + poolName(pool) + ' · ' + poolType(pool) }))
    host.appendChild(e('p', { text: 'PRICE : ' + formatNum(poolSpot(pool)) + ' ' + t1.symbol + '/' + t0.symbol }))
    if (state.actionInfo) host.appendChild(e('p', { text: 'WALLET : ' + formatAmount(state.actionInfo.balance0 || 0, t0.decimals) + ' ' + t0.symbol + ' · ' + formatAmount(state.actionInfo.balance1 || 0, t1.decimals) + ' ' + t1.symbol }))
    if (action.kind === 'decrease') {
      dialogField(host, 'Remove %', 'percent', action.percent, renderPreview); dialogField(host, 'Slippage %', 'slippage', action.slippage, renderPreview)
      host.appendChild(e('p', { id: 'aero-preview', className: 'aero-preview' })); renderPreview()
      dialogButtonRow(host, [['remove', submitAction]])
    } else {
      if (action.kind === 'mint') {
        const onRange = function () { renderRangeText(); pairAmount(0) }
        dialogField(host, 'Tick lower', 'tickLower', action.tickLower, onRange); dialogField(host, 'Tick upper', 'tickUpper', action.tickUpper, onRange)
        host.appendChild(e('p', { id: 'aero-range', className: 'aero-preview' })); renderRangeText()
      } else host.appendChild(e('p', { text: 'RANGE : ' + formatNum(tickPrice(pool, action.position.tickLower)) + ' — ' + formatNum(tickPrice(pool, action.position.tickUpper)) + ' ' + t1.symbol + '/' + t0.symbol }))
      dialogField(host, t0.symbol, 'amount0', action.amount0, function () { pairAmount(0) }); dialogField(host, t1.symbol, 'amount1', action.amount1, function () { pairAmount(1) }); dialogField(host, 'Slippage %', 'slippage', action.slippage, renderPreview)
      host.appendChild(e('p', { id: 'aero-preview', className: 'aero-preview' })); renderPreview()
      const buttons = []
      let needs0 = false; let needs1 = false
      try { const amount0 = parseAmount(action.amount0, t0, t0.symbol, true); needs0 = amount0.gt(0) && (!state.actionInfo || !state.actionInfo.allowance0 || state.actionInfo.allowance0.lt(amount0)) } catch (_) {}
      try { const amount1 = parseAmount(action.amount1, t1, t1.symbol, true); needs1 = amount1.gt(0) && (!state.actionInfo || !state.actionInfo.allowance1 || state.actionInfo.allowance1.lt(amount1)) } catch (_) {}
      buttons.push(['approve ' + t0.symbol, function () { return approveFor(0) }, !needs0], ['approve ' + t1.symbol, function () { return approveFor(1) }, !needs1], ['add', submitAction])
      dialogButtonRow(host, buttons)
    }
    if (active) { const node = host.querySelector('input[data-key="' + active + '"]'); if (node) { node.focus(); const end = node.value.length; try { node.setSelectionRange(end, end) } catch (_) {} } }
  }

  function renderRangeText () {
    const node = byId('aero-range'); const action = state.action; if (!node || !action) return; const pool = action.pool; const t0 = token(pool.token0); const t1 = token(pool.token1)
    node.textContent = validRange(action) ? 'RANGE : ' + formatNum(tickPrice(pool, Number(action.tickLower))) + ' — ' + formatNum(tickPrice(pool, Number(action.tickUpper))) + ' ' + t1.symbol + '/' + t0.symbol : 'Ticks must be multiples of ' + pool.tickSpacing + '.'
  }

  function slippageBps (action) { const value = Number(action.slippage); if (!Number.isFinite(value) || value < 0 || value > 50) throw new Error('Enter slippage between 0 and 50.'); return Math.round(value * 100) }
  function applySlippage (amount, bps) { return amount.mul(10000 - bps).div(10000) }

  function planAction (strict) {
    const action = state.action; const pool = action.pool; const t0 = token(pool.token0); const t1 = token(pool.token1); const bps = slippageBps(action)
    if (action.kind === 'decrease') {
      const pct = Number(action.percent); if (!(pct > 0 && pct <= 100)) throw new Error('Enter remove % between 0 and 100.')
      const position = action.position; const liquidity = pct === 100 ? position.liquidity : position.liquidity.mul(Math.round(pct * 100)).div(10000); if (liquidity.isZero()) throw new Error('Nothing to remove.')
      const expected = amountsFor(pool, action, Number(liquidity.toString())); const expected0 = toUnits(expected[0] * 0.999999 / (10 ** t0.decimals), t0.decimals); const expected1 = toUnits(expected[1] * 0.999999 / (10 ** t1.decimals), t1.decimals)
      const min0 = applySlippage(expected0, bps); const min1 = applySlippage(expected1, bps)
      const calls = [manager.encodeFunctionData('decreaseLiquidity', [[position.id, liquidity, min0, min1, deadline()]]), manager.encodeFunctionData('collect', [[position.id, state.account, maxUint128, maxUint128]])]
      return { tx: { to: address.manager, data: manager.encodeFunctionData('multicall', [calls]) }, min0, min1, preview: 'RECEIVE : ' + formatAmount(expected0, t0.decimals) + ' ' + t0.symbol + ' · ' + formatAmount(expected1, t1.decimals) + ' ' + t1.symbol + ' + fees\nMIN     : ' + formatAmount(min0, t0.decimals) + ' ' + t0.symbol + ' · ' + formatAmount(min1, t1.decimals) + ' ' + t1.symbol }
    }
    if (!validRange(action)) throw new Error('Ticks must be multiples of ' + pool.tickSpacing + '.')
    const amount0 = parseAmount(action.amount0, t0, t0.symbol + ' amount', true); const amount1 = parseAmount(action.amount1, t1, t1.symbol + ' amount', true)
    if (amount0.isZero() && amount1.isZero()) throw new Error('Enter an amount.')
    const liquidity = liquidityFor(pool, action, Number(amount0.toString()), Number(amount1.toString()))
    if (!(liquidity > 0) || !Number.isFinite(liquidity)) throw new Error('Amounts do not fit this range.')
    const expected = amountsFor(pool, action, liquidity * 0.999999)
    const min0 = applySlippage(ethers.BigNumber.from(BigInt(Math.floor(Math.min(expected[0], Number(amount0.toString())))).toString()), bps)
    const min1 = applySlippage(ethers.BigNumber.from(BigInt(Math.floor(Math.min(expected[1], Number(amount1.toString())))).toString()), bps)
    const preview = 'MIN : ' + formatAmount(min0, t0.decimals) + ' ' + t0.symbol + ' · ' + formatAmount(min1, t1.decimals) + ' ' + t1.symbol
    if (action.kind === 'increase') return { tx: { to: address.manager, data: manager.encodeFunctionData('increaseLiquidity', [[action.position.id, amount0, amount1, min0, min1, deadline()]]) }, amount0, amount1, min0, min1, preview }
    return { tx: { to: address.manager, data: manager.encodeFunctionData('mint', [[pool.token0, pool.token1, pool.tickSpacing, Number(action.tickLower), Number(action.tickUpper), amount0, amount1, min0, min1, state.account, deadline(), 0]]) }, amount0, amount1, min0, min1, preview }
  }

  async function preflight (tx) {
    try { await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data, value: '0x0' }, 'latest'] }) } catch (error) {
      try { await rpc('eth_call', [{ from: state.account, to: tx.to, data: tx.data, value: '0x0' }, 'latest'], { attempts: 3 }) } catch (rpcError) { throw new Error('Simulation failed: ' + errText(rpcError)) }
      throw new Error('Simulation failed: ' + errText(error))
    }
  }

  async function waitReceipt (hash) {
    const started = Date.now()
    while (Date.now() - started < 300000) {
      try { const receipt = await rpc('eth_getTransactionReceipt', [hash], { attempts: 2 }); if (receipt) return receipt } catch (_) {}
      await pause(1500)
    }
    throw new Error('Transaction not confirmed yet: ' + hash)
  }

  async function send (tx, pending) {
    await preflight(tx); setStatus('Confirm in wallet…')
    const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data, value: '0x0' }] })
    setStatus((pending || 'Transaction') + ' pending · ' + short(hash))
    const receipt = await waitReceipt(hash); if (Number(receipt.status) !== 1) throw new Error('Transaction reverted: ' + hash)
    return receipt
  }

  async function approveFor (side) {
    requireWallet(); const plan = planAction(true); const pool = state.action.pool; const tokenAddress = side === 0 ? pool.token0 : pool.token1; const amount = side === 0 ? plan.amount0 : plan.amount1; const info = token(tokenAddress)
    state.sending = true; renderAction()
    try { await send({ to: tokenAddress, data: erc20.encodeFunctionData('approve', [address.manager, amount]) }, 'Approve ' + info.symbol); setStatus('Approved ' + info.symbol + '.', 'success'); await loadActionInfo() } finally { state.sending = false; renderAction() }
  }

  async function submitAction () {
    requireWallet(); const plan = planAction(true); const action = state.action
    if (plan.min0 && plan.min1 && plan.min0.isZero() && plan.min1.isZero() && !window.confirm('Both minimums are zero, so any execution price is accepted. Continue?')) return
    state.sending = true; renderAction()
    try { await send(plan.tx, action.kind === 'decrease' ? 'Remove' : 'Add'); closeDialog(); setStatus(action.kind === 'decrease' ? 'Removed.' : 'Added.', 'success'); await refreshAfterAction() } finally { state.sending = false; render() }
  }

  async function collectPosition (position) {
    requireWallet(); state.sending = true; render()
    try { await send({ to: address.manager, data: manager.encodeFunctionData('collect', [[position.id, state.account, maxUint128, maxUint128]]) }, 'Collect'); setStatus('Collected.', 'success'); await refreshAfterAction() } finally { state.sending = false; render() }
  }

  async function claimMerkl () {
    requireWallet(); const rewards = state.merklRewards.filter(reward => reward.claimable.gt(0) && reward.proofs.length); if (!rewards.length) throw new Error('Nothing to claim.')
    state.sending = true; render()
    try {
      const data = distributor.encodeFunctionData('claim', [rewards.map(() => state.account), rewards.map(reward => reward.token), rewards.map(reward => reward.amount), rewards.map(reward => reward.proofs)])
      await send({ to: address.distributor, data }, 'Claim'); setStatus('Claimed.', 'success'); await loadMerklRewards()
    } finally { state.sending = false; render() }
  }

  function closeDialog () { const dialog = byId('aero-action-dialog'); if (dialog && dialog.open) dialog.close(); state.action = null; state.actionInfo = null }

  async function loadPositions () {
    if (!state.account || !correctChain()) { state.positions = []; renderPositions(); return }
    const account = state.account; state.positionsLoading = true; state.positionsFailed = false; renderPositions()
    try {
      const total = Number((await batch([{ target: address.manager, iface: manager, method: 'balanceOf', args: [account], fallback: ethers.constants.Zero }]))[0])
      const ids = total ? (await batch(Array.from({ length: total }, (_, index) => ({ target: address.manager, iface: manager, method: 'tokenOfOwnerByIndex', args: [account, index], fallback: null })))).filter(Boolean) : []
      const values = await batch(ids.map(id => ({ target: address.manager, iface: manager, method: 'positions', args: [id], fallback: null, whole: true })))
      const poolMap = new Map(state.pools.filter(pool => pool.ready).map(pool => [lower(pool.token0) + ':' + lower(pool.token1) + ':' + pool.tickSpacing, pool]))
      const positions = values.map(function (value, index) {
        if (!value) return null; const pool = poolMap.get(lower(value.token0) + ':' + lower(value.token1) + ':' + Number(value.tickSpacing)); if (!pool) return null
        return { id: ids[index], pool, tickLower: Number(value.tickLower), tickUpper: Number(value.tickUpper), liquidity: value.liquidity, fees0: value.tokensOwed0, fees1: value.tokensOwed1 }
      }).filter(Boolean)
      // Uncollected fees include growth since the last poke; a static collect from the owner returns the full amount.
      if (positions.length) {
        const calls = positions.map(position => ({ method: 'eth_call', params: [{ from: account, to: address.manager, data: manager.encodeFunctionData('collect', [[position.id, account, maxUint128, maxUint128]]) }, 'latest'] }))
        for (let start = 0; start < calls.length; start += 20) {
          const results = await rpcBatch(calls.slice(start, start + 20)).catch(() => [])
          results.forEach(function (result, offset) { if (!result || !result.result) return; try { const decoded = manager.decodeFunctionResult('collect', result.result); positions[start + offset].fees0 = decoded[0]; positions[start + offset].fees1 = decoded[1] } catch (_) {} })
        }
      }
      if (state.account === account) { positions.sort((a, b) => Number(b.liquidity.gt(0)) - Number(a.liquidity.gt(0)) || Number(b.id.sub(a.id).isNegative() ? -1 : 1)); state.positions = positions }
    } catch (error) { console.error(error); if (state.account === account) { state.positions = []; state.positionsFailed = true } } finally { state.positionsLoading = false; renderPositions() }
  }

  async function loadMerklRewards () {
    const account = state.account; if (!account) { state.merklRewards = []; return }
    try {
      const response = await window.fetch(merkl.rewards(account)); if (!response.ok) throw new Error('Merkl rewards unavailable.')
      const values = await response.json(); const rewards = []
      ;(Array.isArray(values) ? values : []).forEach(function (entry) {
        if (!entry || !entry.chain || entry.chain.id !== chain.number || !Array.isArray(entry.rewards)) return
        entry.rewards.forEach(function (reward) {
          try {
            const info = reward.token || {}; if (!ethers.utils.isAddress(info.address || '')) return
            const amount = ethers.BigNumber.from(reward.amount || '0'); const claimed = ethers.BigNumber.from(reward.claimed || '0')
            rewards.push({ token: info.address, symbol: String(info.symbol || short(info.address)).slice(0, 18), decimals: Number(info.decimals), amount, claimable: amount.gt(claimed) ? amount.sub(claimed) : ethers.constants.Zero, proofs: Array.isArray(reward.proofs) ? reward.proofs : [] })
          } catch (_) {}
        })
      })
      if (state.account === account) state.merklRewards = rewards
    } catch (error) { console.error(error); if (state.account === account) state.merklRewards = [] }
    renderPositions()
  }

  async function refreshAfterAction () { await hydratePools(); await Promise.all([loadPositions(), loadActionInfo()]) }

  function bindProvider (provider) {
    if (!provider || state.boundProvider === provider || !provider.on) return; state.boundProvider = provider
    provider.on('accountsChanged', function (accounts) { adopt(provider, accounts || [], state.walletChain).catch(error => setStatus(errText(error), 'error')) })
    provider.on('chainChanged', function (chainId) { adopt(provider, state.account ? [state.account] : [], chainId).catch(error => setStatus(errText(error), 'error')) })
  }

  async function adopt (provider, accounts, chainId) {
    state.eip1193 = provider; state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null; state.walletChain = chainId ? ethers.utils.hexValue(ethers.BigNumber.from(chainId)) : null; bindProvider(provider)
    if (!state.account) { state.positions = []; state.merklRewards = []; closeDialog() }
    render()
    if (state.account && correctChain()) { await Promise.all([loadPositions(), loadMerklRewards()]) }
  }

  async function restoreInjected () {
    const provider = injected(); if (!provider) return
    const accounts = await provider.request({ method: 'eth_accounts' }); if (!accounts || !accounts[0]) return
    await adopt(provider, accounts, await provider.request({ method: 'eth_chainId' }))
  }

  async function connectInjected () {
    const provider = injected(); if (!provider) return connectOther()
    const accounts = await provider.request({ method: 'eth_requestAccounts' }); await adopt(provider, accounts, await provider.request({ method: 'eth_chainId' }))
    if (!correctChain()) setStatus('Switch to Arc.', 'error')
  }

  async function connectOther () {
    const reown = await import('./config.js'); if (!reown.REOWN_PROJECT_ID) throw new Error('Other wallet unavailable.'); const kit = reown.createAppKitInstance(); if (!kit) throw new Error('Other wallet unavailable.')
    const onAccount = async function (accountState) { if (!accountState || !accountState.isConnected) return; const provider = await kit.getWalletProvider(); await adopt(provider, await provider.request({ method: 'eth_accounts' }), await provider.request({ method: 'eth_chainId' })); if (state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null } }
    if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true })
    if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error')))
    await kit.open()
  }

  async function switchNetwork () {
    if (!state.eip1193) throw new Error('Connect wallet.')
    try { await state.eip1193.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] }) } catch (error) {
      if (error.code !== 4902 && !(error.data && error.data.originalError && error.data.originalError.code === 4902)) throw error
      await state.eip1193.request({ method: 'wallet_addEthereumChain', params: [{ chainId: chain.id, chainName: chain.name, nativeCurrency: chain.nativeCurrency, rpcUrls: [currentRpc()], blockExplorerUrls: [chain.explorer] }] })
    }
    await adopt(state.eip1193, state.account ? [state.account] : [], await state.eip1193.request({ method: 'eth_chainId' }))
    setStatus('')
  }

  async function refresh () {
    loading(true); setStatus('')
    try { await hydratePools(); await Promise.all([loadFees(), loadIncentives(), state.account && correctChain() ? Promise.all([loadPositions(), loadMerklRewards()]) : null]) } finally { loading(false) }
  }

  function bindUi () {
    byId('aero-connect').addEventListener('click', function () { connectInjected().catch(error => setStatus(errText(error), 'error')) })
    byId('aero-other-wallet').addEventListener('click', function () { connectOther().catch(error => setStatus(errText(error), 'error')) })
    byId('aero-switch').addEventListener('click', function () { switchNetwork().catch(error => setStatus(errText(error), 'error')) })
    byId('aero-zero-toggle').addEventListener('click', toggleZero)
    byId('aero-refresh').addEventListener('click', function () { refresh().catch(fatal) })
    byId('aero-action-dialog').addEventListener('close', function () { state.action = null; state.actionInfo = null })
  }

  async function start () {
    bindUi(); loading(true)
    const passive = restoreInjected().catch(error => setStatus(errText(error), 'error'))
    const incentives = loadIncentives()
    await discover()
    await Promise.all([loadFees(), incentives, passive])
    if (state.account && correctChain() && !state.positions.length) await loadPositions()
    loading(false); render()
  }

  function fatal (error) { console.error(error); loading(false); setStatus(errText(error), 'error'); render() }

  return { start, fatal }
})()
