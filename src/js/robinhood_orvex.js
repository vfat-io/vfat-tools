/* Orvex on Robinhood Chain: CL pool manager state, liquidity history, and swap-fee logs over the official RPC. Read-only. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { OrvexPage.start().catch(OrvexPage.fatal) })

const OrvexPage = (function () {
  const rpcUrl = 'https://rpc.mainnet.chain.robinhood.com'
  // Every Orvex market lives in one PancakeSwap-Infinity-style CL pool
  // manager. Pools, ranges, and fees are discovered from its logs and state;
  // only these deployment identifiers are fixed.
  const address = {
    poolManager: '0xd01C774d4A66408326Bc65728Ac5Ae5aAf004032',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11',
    usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168',
    weth: '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73',
    feeHook: '0x51854e4BAA4A7c9653B52e42021F1B2B35D31651'
  }
  const firstPoolBlock = 4489039 // first Initialize on the pool manager
  const appUrl = 'https://www.orvex.fi/markets'
  // The RPC caps one eth_getLogs at 10,000,000 blocks and 10,000 results.
  const logSpan = 10000000
  // ponytail: ~3k swaps per 4h today; a longer window needs paging past the 10k-log cap.
  const feeWindowSeconds = 4 * 60 * 60
  // Stock markets are often mostly single-sided, so the floor is low; the
  // deepest pool still wins when a token has several.
  const minPricingDepthUsd = 100
  const idleTvlUsd = 10
  const secondsPerYear = 365 * 24 * 60 * 60
  const dynamicFeeFlag = 0x800000
  const zeroAddress = ethers.constants.AddressZero
  const topics = {
    modifyLiquidity: ethers.utils.id('ModifyLiquidity(bytes32,address,int24,int24,int256,bytes32)'),
    swap: ethers.utils.id('Swap(bytes32,address,int128,int128,uint160,uint128,int24,uint24,uint16)')
  }
  const coder = ethers.utils.defaultAbiCoder
  const manager = new ethers.utils.Interface([
    'function poolIdToPoolKey(bytes32) view returns(address currency0,address currency1,address hooks,address poolManager,uint24 fee,bytes32 parameters)',
    'function getSlot0(bytes32) view returns(uint160 sqrtPriceX96,int24 tick,uint24 protocolFee,uint24 lpFee)'
  ])
  const erc20 = new ethers.utils.Interface(['function symbol() view returns(string)', 'function decimals() view returns(uint8)'])
  const multicall = new ethers.utils.Interface(['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)'])
  const state = { pools: [], tokens: new Map(), prices: new Map(), feeSeconds: 0, showIdle: false, loading: false }

  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const hex = value => '0x' + value.toString(16)
  const short = value => value.slice(0, 6) + '…' + value.slice(-4)
  const finite = Number.isFinite
  const e = (tag, text, className) => { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node }
  const usd = v => !finite(v) ? '—' : v >= 1e6 ? '$' + (v / 1e6).toFixed(2) + 'm' : v >= 1000 ? '$' + Math.round(v).toLocaleString('en-US') : v >= 1 ? '$' + v.toFixed(2) : v > 0 ? '$' + v.toPrecision(2) : '$0'
  const percent = v => !finite(v) ? '—' : (v >= 1000 ? Math.round(v).toLocaleString('en-US') : v.toFixed(2)) + '%'
  const amount = v => !finite(v) ? '—' : v >= 1000 ? v.toLocaleString('en-US', { maximumFractionDigits: 2 }) : v >= 1 ? v.toFixed(4) : v.toPrecision(4)
  const feeText = pips => (pips / 10000).toFixed(4).replace(/\.?0+$/, '') + '%'
  const token = value => state.tokens.get(lower(value)) || { symbol: short(value), decimals: null }
  const price = value => state.prices.get(lower(value))

  let rpcId = 0
  async function rpc (method, params) {
    for (let attempt = 0; ; attempt += 1) {
      const controller = new window.AbortController()
      const timer = window.setTimeout(() => controller.abort(), 45000)
      try {
        const response = await window.fetch(rpcUrl, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: ++rpcId, method, params }), signal: controller.signal })
        const body = await response.json()
        if (body.error) { const error = new Error(body.error.message || 'RPC error'); error.rpc = true; throw error }
        return body.result
      } catch (error) {
        // An RPC-level refusal (range or result cap) is for the caller to split.
        // Transport errors are retried: the official RPC sometimes answers with a
        // duplicated Access-Control-Allow-Origin header, which the browser rejects.
        if (error.rpc || attempt >= 4) throw error
      } finally { window.clearTimeout(timer) }
      await new Promise(resolve => window.setTimeout(resolve, 500 * Math.pow(2, attempt)))
    }
  }

  async function getLogs (topic, from, to) {
    try {
      return await rpc('eth_getLogs', [{ address: address.poolManager, topics: [topic], fromBlock: hex(from), toBlock: hex(to) }])
    } catch (error) {
      if (!error.rpc || to <= from || !/limit|narrow|timed out/i.test(error.message)) throw error
      const mid = Math.floor((from + to) / 2)
      return (await getLogs(topic, from, mid)).concat(await getLogs(topic, mid + 1, to))
    }
  }

  async function scanLogs (topic, from, to) {
    const spans = []
    for (let start = from; start <= to; start += logSpan) spans.push([start, Math.min(to, start + logSpan - 1)])
    const parts = []
    for (let i = 0; i < spans.length; i += 3) parts.push(...await Promise.all(spans.slice(i, i + 3).map(span => getLogs(topic, span[0], span[1]))))
    return [].concat(...parts)
  }

  async function batch (calls) {
    const out = []
    for (let i = 0; i < calls.length; i += 400) {
      const chunk = calls.slice(i, i + 400)
      const data = multicall.encodeFunctionData('aggregate3', [chunk.map(c => ({ target: c.target, allowFailure: true, callData: c.iface.encodeFunctionData(c.method, c.args || []) }))])
      const [results] = multicall.decodeFunctionResult('aggregate3', await rpc('eth_call', [{ to: address.multicall, data }, 'latest']))
      results.forEach((result, j) => {
        let value = null
        if (result.success) { try { value = chunk[j].iface.decodeFunctionResult(chunk[j].method, result.returnData) } catch (_) {} }
        out.push(value)
      })
    }
    return out
  }

  // Each pool's open ranges are the sum of every ModifyLiquidity it has seen,
  // so TVL is what LPs could withdraw now, before uncollected fees.
  function collectRanges (logs) {
    const pools = new Map()
    logs.forEach(log => {
      const [tickLower, tickUpper, delta] = coder.decode(['int24', 'int24', 'int256'], log.data)
      const id = lower(log.topics[1])
      if (!pools.has(id)) pools.set(id, new Map())
      const ranges = pools.get(id)
      const key = tickLower + ':' + tickUpper
      const current = ranges.get(key) || { tickLower, tickUpper, liquidity: ethers.BigNumber.from(0) }
      current.liquidity = current.liquidity.add(delta)
      ranges.set(key, current)
    })
    return pools
  }

  function rangeAmounts (pool) {
    const sqrtPrice = Number(pool.sqrtPriceX96.toString()) / Math.pow(2, 96)
    let raw0 = 0; let raw1 = 0
    pool.ranges.forEach(range => {
      if (range.liquidity.lte(0)) return
      const liquidity = Number(range.liquidity.toString())
      const lowerSqrt = Math.pow(1.0001, range.tickLower / 2)
      const upperSqrt = Math.pow(1.0001, range.tickUpper / 2)
      const current = Math.min(Math.max(sqrtPrice, lowerSqrt), upperSqrt)
      raw0 += liquidity * (1 / current - 1 / upperSqrt)
      raw1 += liquidity * (current - lowerSqrt)
    })
    return [raw0 / Math.pow(10, token(pool.token0).decimals), raw1 / Math.pow(10, token(pool.token1).decimals)]
  }

  // USDG anchors every price. A token takes its price from the deepest pool
  // that pairs it with an already priced token, which keeps dust pools from
  // setting prices. Native ETH and WETH share one price.
  function priceTokens () {
    state.prices = new Map([[lower(address.usdg), 1]])
    const link = () => {
      const weth = price(address.weth); const eth = price(zeroAddress)
      if (finite(weth) && !finite(eth)) state.prices.set(zeroAddress, weth)
      if (finite(eth) && !finite(weth)) state.prices.set(lower(address.weth), eth)
    }
    for (let round = 0; round < 6; round += 1) {
      const best = new Map()
      state.pools.forEach(pool => {
        if (!pool.ready) return
        [0, 1].forEach(side => {
          const known = side ? pool.token1 : pool.token0
          const other = side ? pool.token0 : pool.token1
          if (!finite(price(known)) || finite(price(other))) return
          const depth = pool.amounts[side] * price(known)
          if (!(depth >= minPricingDepthUsd)) return
          const value = side ? price(known) * pool.spot : price(known) / pool.spot
          const current = best.get(lower(other))
          if (finite(value) && value > 0 && (!current || depth > current.depth)) best.set(lower(other), { depth, value })
        })
      })
      if (!best.size) break
      best.forEach((entry, key) => state.prices.set(key, entry.value))
      link()
    }
    link()
  }

  function applySwaps (logs) {
    const byPool = new Map(state.pools.map(pool => [pool.id, pool]))
    logs.forEach(log => {
      const pool = byPool.get(lower(log.topics[1]))
      if (!pool) return
      const [amount0, amount1, , , , fee, protocolFee] = coder.decode(['int128', 'int128', 'uint160', 'uint128', 'int24', 'uint24', 'uint16'], log.data)
      // Negative is what the swapper paid in. The LP share of the input is
      // (fee - protocolFee) / 1e6, which matches feeGrowthGlobal deltas.
      const zeroIn = amount0.lt(0)
      const tokenIn = zeroIn ? pool.token0 : pool.token1
      const paid = Number(ethers.utils.formatUnits((zeroIn ? amount0 : amount1).abs(), token(tokenIn).decimals))
      const value = paid * price(tokenIn)
      pool.volumeUsd += value
      pool.feeUsd += value * (fee - protocolFee) / 1e6
      pool.lastLpFee = fee - protocolFee
    })
  }

  async function blockAt (number) { const block = await rpc('eth_getBlockByNumber', [number === 'latest' ? number : hex(number), false]); return { number: parseInt(block.number, 16), timestamp: parseInt(block.timestamp, 16) } }

  async function swapWindow () {
    const latest = await blockAt('latest')
    const sample = await blockAt(Math.max(firstPoolBlock, latest.number - 1000000))
    const secondsPerBlock = (latest.timestamp - sample.timestamp) / (latest.number - sample.number)
    const from = await blockAt(Math.max(firstPoolBlock, latest.number - Math.round(feeWindowSeconds / secondsPerBlock)))
    const logs = await getLogs(topics.swap, from.number, latest.number)
    return { latest, logs, seconds: latest.timestamp - from.timestamp }
  }

  async function load () {
    state.loading = true; render()
    const [window_, liquidityLogs] = await Promise.all([swapWindow(), blockAt('latest').then(latest => scanLogs(topics.modifyLiquidity, firstPoolBlock, latest.number))])
    const ranges = collectRanges(liquidityLogs)
    const ids = Array.from(ranges.keys())
    const results = await batch(ids.flatMap(id => ['poolIdToPoolKey', 'getSlot0'].map(method => ({ target: address.poolManager, iface: manager, method, args: [id] }))))
    const pools = ids.map((id, index) => {
      const key = results[index * 2]; const slot0 = results[index * 2 + 1]
      if (!key || !slot0 || slot0.sqrtPriceX96.isZero()) return null
      return {
        id, token0: lower(key.currency0), token1: lower(key.currency1), hooks: lower(key.hooks), fee: key.fee,
        sqrtPriceX96: slot0.sqrtPriceX96, ranges: Array.from(ranges.get(id).values()),
        amounts: [NaN, NaN], spot: NaN, tvl: NaN, volumeUsd: 0, feeUsd: 0, apr: NaN, lastLpFee: null, ready: false
      }
    }).filter(Boolean)
    const tokenAddresses = Array.from(new Set(pools.flatMap(pool => [pool.token0, pool.token1]))).filter(value => value !== zeroAddress)
    const meta = await batch(tokenAddresses.flatMap(value => ['symbol', 'decimals'].map(method => ({ target: value, iface: erc20, method }))))
    state.tokens = new Map([[zeroAddress, { symbol: 'ETH', decimals: 18 }]])
    tokenAddresses.forEach((value, index) => {
      const symbol = meta[index * 2]; const decimals = meta[index * 2 + 1]
      state.tokens.set(value, { symbol: symbol ? String(symbol[0]).replace(/\s+/g, ' ').trim().slice(0, 16) || short(value) : short(value), decimals: decimals ? Number(decimals[0]) : null })
    })
    pools.forEach(pool => {
      const d0 = token(pool.token0).decimals; const d1 = token(pool.token1).decimals
      if (d0 === null || d1 === null) return
      pool.amounts = rangeAmounts(pool)
      pool.spot = Math.pow(Number(pool.sqrtPriceX96.toString()) / Math.pow(2, 96), 2) * Math.pow(10, d0 - d1)
      pool.ready = finite(pool.amounts[0]) && finite(pool.amounts[1]) && finite(pool.spot) && pool.spot > 0
    })
    state.pools = pools
    priceTokens()
    applySwaps(window_.logs)
    state.feeSeconds = window_.seconds
    pools.forEach(pool => {
      const p0 = price(pool.token0); const p1 = price(pool.token1)
      pool.tvl = pool.ready && finite(p0) && finite(p1) ? pool.amounts[0] * p0 + pool.amounts[1] * p1 : NaN
      pool.apr = finite(pool.tvl) && pool.tvl > 0 && state.feeSeconds > 0 ? pool.feeUsd / pool.tvl * secondsPerYear / state.feeSeconds * 100 : NaN
    })
    state.loading = false; render()
  }

  function windowLabel () { const hours = state.feeSeconds / 3600; return hours >= 1 ? Math.round(hours) + 'h' : Math.max(1, Math.round(state.feeSeconds / 60)) + 'm' }
  function priceText (pool) {
    if (!pool.ready) return '—'
    // Quote in USDG (or the pool's second token) so stock and ETH prices read naturally.
    const invert = pool.token0 === lower(address.usdg)
    const base = token(invert ? pool.token1 : pool.token0).symbol; const quote = token(invert ? pool.token0 : pool.token1).symbol
    return '1 ' + base + ' = ' + amount(invert ? 1 / pool.spot : pool.spot) + ' ' + quote
  }
  function feeLabel (pool) { return pool.fee === dynamicFeeFlag ? 'dynamic' + (pool.lastLpFee === null ? '' : ' ' + feeText(pool.lastLpFee)) : feeText(pool.fee) }
  function hookLabel (pool) { return pool.hooks === zeroAddress ? 'no hook' : pool.hooks === lower(address.feeHook) ? 'dynamic-fee hook' : 'hook ' + short(pool.hooks) }

  function renderPools () {
    const root = byId('orvex-pools')
    root.textContent = ''
    if (!state.pools.length) return
    const visible = state.pools.filter(pool => state.showIdle || (finite(pool.tvl) && pool.tvl >= idleTvlUsd)).sort((a, b) => (finite(b.tvl) ? b.tvl : -1) - (finite(a.tvl) ? a.tvl : -1))
    const table = e('table', undefined, 'orvex-table')
    const head = e('tr')
    ;['Market', 'Price', 'TVL', 'Volume / ' + windowLabel(), 'LP fees / ' + windowLabel(), 'Fee APR (' + windowLabel() + ')', 'LP fee', 'Liquidity'].forEach(label => head.appendChild(e('th', label)))
    table.appendChild(e('thead')).appendChild(head)
    const body = table.appendChild(e('tbody'))
    visible.forEach(pool => {
      const row = body.appendChild(e('tr'))
      const name = row.appendChild(e('td'))
      name.appendChild(e('span', token(pool.token0).symbol + ' / ' + token(pool.token1).symbol, 'orvex-name'))
      name.appendChild(e('span', hookLabel(pool) + ' · ' + short(pool.id), 'orvex-sub'))
      ;[priceText(pool), usd(pool.tvl), usd(pool.volumeUsd), usd(pool.feeUsd), percent(pool.apr), feeLabel(pool)].forEach(text => row.appendChild(e('td', text)))
      const link = e('a', '[ add liquidity ]')
      link.href = appUrl; link.target = '_blank'; link.rel = 'noopener noreferrer'
      row.appendChild(e('td')).appendChild(link)
    })
    root.appendChild(table)
  }

  function render () {
    byId('orvex-loading').hidden = !state.loading
    byId('orvex-refresh').disabled = state.loading
    byId('orvex-idle-toggle').textContent = state.showIdle ? '[ hide idle markets ]' : '[ show idle markets ]'
    if (!state.loading && state.pools.length) {
      const sum = key => state.pools.reduce((total, pool) => total + (finite(pool[key]) ? pool[key] : 0), 0)
      const priced = state.pools.filter(pool => finite(pool.tvl)).length
      byId('orvex-summary').textContent = 'Orvex TVL ' + usd(sum('tvl')) + ' · ' + priced + '/' + state.pools.length + ' markets priced · volume ' + usd(sum('volumeUsd')) + ' / ' + windowLabel() + ' · LP fees ' + usd(sum('feeUsd')) + ' / ' + windowLabel()
    }
    renderPools()
  }

  function setStatus (text) { const node = byId('orvex-status'); node.hidden = !text; node.textContent = text || '' }

  async function refresh () {
    setStatus('')
    try { await load() } catch (error) { state.loading = false; render(); setStatus('Could not load Orvex markets: ' + String(error && error.message || error).slice(0, 300)) }
  }

  async function start () {
    byId('orvex-refresh').addEventListener('click', refresh)
    byId('orvex-idle-toggle').addEventListener('click', () => { state.showIdle = !state.showIdle; render() })
    await refresh()
  }

  function fatal (error) { setStatus('Orvex page failed to start: ' + String(error && error.message || error)) }

  return { start, fatal }
})()
