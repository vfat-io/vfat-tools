/* Uniswap v4 on Arc: PoolManager state, tick liquidity, swap-fee logs, PositionManager, RPC, and EIP-1193. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { UniswapV4Page.start().catch(UniswapV4Page.fatal) })

const UniswapV4Page = (function () {
  const chain = { id: '0x13b2', number: 5042, name: 'Arc', rpc: 'https://rpc.mainnet.arc.io', nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 18 } }
  const address = {
    usdc: '0x3600000000000000000000000000000000000000',
    poolManager: '0x8366a39cc670b4001a1121b8f6a443a643e40951',
    positionManager: '0x6049c9a0e26405c0985f9e3685c87d0ae917f82b',
    stateView: '0xf3334192d15450cdd385c8b70e03f9a6bd9e673b',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  const zeroAddress = ethers.constants.AddressZero
  const positionManagerBlock = 16031167
  /* Pool keys are hashed back to their PoolId on load; state, liquidity and fees are all read live. */
  const seedTokens = [
    '0x3600000000000000000000000000000000000000', '0xBc43CE8DEc648EA298C4275559b81D6261c90b67', '0x6505506540dC99f7366316B10E9CF1A584cbD42a',
    '0x2ba0f44BDfC17FbA30edA9cdBeCB908cA45B043B', '0xeCe5cA8bf9220718E5727754026757512212cb3c', '0x5FEF42634ac7E13C12eD9D0894eF58d52A5FC581',
    '0x07704B06981eA962b87296362a1281484d160000', '0xbEf5f6d51CB62b58e6A8f77868681825C6fe21c1', '0x171A4217b86A807A64eB94757Db6849fb4bDbAA0',
    '0xAC7896A01a4efD2a647Fb1C94a6F1fFef8901488', '0x0c3282e55885bb1e8341F8C36DA7B16E4F559993', '0x2164bB17a2D38c1b5170E987b2c0416DF1EFc752',
    '0x4d1Efa7f5629f89FBDd7950b5eF73403A350Ad59', '0xe0e0F32b188198dD6Bc49f7091fe6b52aeF9F20f', '0xe6a2476f33Ec1566288AA32Ec3319A6B77DD1E3B',
    '0x41B386E03928c70D635606C210717C19DCfC984d', '0x58E3e461D32ef2Ea48270BD8D9AC80c3062428F5', '0x3b26421EB41F42119b021eadfBe3fF687fF7Ebd8',
    '0x8bcb94279FC2c984EC34e0C1f2192df8c69EA4F0', '0x128cC466B61f542da60c70e3aA11c10e19B84EDB', '0xD02D2b38d9CCF08044f0A493350A2339FE8D708b',
    '0x1D1bcA89b79a2d6a7757E86F8A39ae0f51bB652b', '0xEb64987643db71c76b2a2BE7E723DECC995E5b37', '0xbE0CaD585Ea2D13DE2f4E36376be755C0AfD8B97',
    '0x0056eD10eA5a504a2Cc9BeC93aA5Fa8258bBa0C7', '0x3EAd4E80e9e5bC0e01682D7Ee74C4881b040D3EA', '0x1EA1e4f9A9975F1f6e9c0a9f6e8Ada7a66E6de52',
    '0xF3715bF5C2De299F08B81180ffb739A8372a175f'
  ]
  const seedPools = [
    [0,1,49000,490], [0,2,8500,85], [3,0,300000,3100], [0,1,500000,5000], [0,4,38810,388], [0,1,700000,7000],
    [0,1,2500,25], [0,5,10000,200], [0,4,9810,98], [6,0,450000,200], [0,7,500,10], [0,4,400000,4000],
    [8,0,9000,90], [0,1,50000,500], [0,9,100000,1000], [10,0,9000,90], [0,4,36986,370], [0,7,770000,7700],
    [0,7,800000,8000], [8,0,800000,8000], [6,0,20000,200], [0,1,90000,900], [11,0,200000,1], [0,12,90000,900],
    [0,13,90000,900], [0,7,900000,9000], [0,7,700000,7000], [0,14,91230,912], [0,4,35000,350], [11,0,700000,7000],
    [0,15,100000,1000], [0,16,180000,1800], [3,0,1700,17], [0,17,50000,500], [0,18,40000,400], [10,0,330000,3300],
    [19,0,75,1], [0,20,700000,7000], [0,13,50000,500], [0,5,30000,300], [0,1,9900,99], [6,0,200000,2000],
    [21,0,10000,200], [0,7,760000,7600], [0,22,901200,9012], [0,4,9850,99], [0,23,902000,9020], [11,0,35000,350],
    [24,0,50000,500], [0,15,40000,400], [0,22,880000,8800], [24,0,100000,1000], [8,7,900000,9000], [11,0,880000,8800],
    [19,0,2500,25], [3,0,700000,7000], [0,22,43000,430], [0,2,50000,500], [8,0,3000,30], [8,0,300000,3000],
    [1,4,100000,1000], [0,1,880000,8800], [11,0,35566,356], [0,4,100000,1000], [0,20,100000,200], [0,7,880000,8800],
    [0,2,2500,25], [0,14,450000,4500], [3,0,10000,100], [19,0,500000,5000], [0,4,20000,200], [0,18,20000,200],
    [0,12,50000,500], [0,4,750000,7500], [0,7,851000,8510], [0,4,40000,200], [8,4,2500,25], [0,4,41000,410],
    [25,4,50000,500], [0,20,250000,200], [0,4,888000,8880], [8,0,880000,8800], [3,0,800000,8000], [8,0,2500,25],
    [26,0,880000,8800], [19,8,10000,100], [10,0,40000,400], [3,0,100000,200], [0,22,700000,7000], [6,0,40000,400],
    [1,4,2500,25], [3,0,500000,5100], [11,0,49000,490], [0,16,50000,500], [6,0,902000,9020], [0,1,41400,414],
    [11,3,9000,90], [0,27,40000,400], [3,0,5000,50], [8,0,75,1], [0,4,38800,388], [0,22,10000,100],
    [0,4,36689,367], [0,22,31100,311], [24,0,20000,200], [0,4,36989,370], [8,0,500000,5000], [3,0,20000,200]
  ]
  const secondsPerYear = 365 * 24 * 60 * 60
  const feeTargetSeconds = 4 * 60 * 60
  const logSpan = 9999
  const minConfidence = 25
  const minPrice = 1e-12
  const maxPrice = 1e12
  const minTick = -887272
  const maxTick = 887272
  const dynamicFeeFlag = 0x800000
  const poolsSlot = 6n
  const Q96 = 1n << 96n
  const U256 = 1n << 256n
  const max128 = (1n << 128n) - 1n
  const actions = { INCREASE_LIQUIDITY: 0x00, DECREASE_LIQUIDITY: 0x01, MINT_POSITION: 0x02, BURN_POSITION: 0x03, SETTLE_PAIR: 0x0d, TAKE_PAIR: 0x11, CLOSE_CURRENCY: 0x12, SWEEP: 0x14 }
  const swapTopic = ethers.utils.id('Swap(bytes32,address,int128,int128,uint160,uint128,int24,uint24)')
  const transferTopic = ethers.utils.id('Transfer(address,address,uint256)')
  const keyType = 'tuple(address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks)'
  const erc20 = new ethers.utils.Interface(['function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)'])
  const manager = new ethers.utils.Interface(['function extsload(bytes32[]) view returns(bytes32[])'])
  const positions = new ethers.utils.Interface([
    'function permit2() view returns(address)', 'function poolKeys(bytes25) view returns(' + keyType + ')', 'function balanceOf(address) view returns(uint256)', 'function ownerOf(uint256) view returns(address)',
    'function getPoolAndPositionInfo(uint256) view returns(' + keyType + ',uint256)', 'function getPositionLiquidity(uint256) view returns(uint128)',
    'function modifyLiquidities(bytes unlockData,uint256 deadline) payable'
  ])
  const stateView = new ethers.utils.Interface(['function getPositionInfo(bytes32,address,int24,int24,bytes32) view returns(uint128,uint256,uint256)', 'function getFeeGrowthInside(bytes32,int24,int24) view returns(uint256,uint256)'])
  const permit2 = new ethers.utils.Interface(['function allowance(address,address,address) view returns(uint160,uint48,uint48)', 'function approve(address,address,uint160,uint48)'])
  const multicall = new ethers.utils.Interface(['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)'])
  const coder = ethers.utils.defaultAbiCoder
  const state = {
    pools: [], poolMap: new Map(), tokens: new Map(), prices: new Map(), confidence: new Map(),
    head: null, headTime: null, blockSeconds: 0.5, feeFrom: null, feeSeconds: 0, feesReady: false, feeFailures: 0, showZero: false, permit2: null,
    eip1193: null, account: null, walletChain: null, boundProvider: null, reownUnsubscribe: null,
    positions: [], nftCount: null, nftScan: null, action: null, actionInfo: null, sending: false, status: '', spinner: null,
    active: 0, waiting: [], generation: 0, walletGeneration: 0
  }
  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const short = value => value ? value.slice(0, 6) + '…' + value.slice(-4) : '—'
  const finite = value => Number.isFinite(value) && value >= 0
  const correctChain = () => lower(state.walletChain) === chain.id
  const injected = () => window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null
  const isNative = value => lower(value) === zeroAddress
  const token = value => state.tokens.get(lower(value)) || { address: value, symbol: short(value), decimals: null }
  const errText = error => String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').replace(/\s+/g, ' ').slice(0, 360)
  const compact = value => { if (!finite(value)) return '—'; if (value >= 1e9) return (value / 1e9).toFixed(2) + 'b'; if (value >= 1e6) return (value / 1e6).toFixed(2) + 'm'; if (value >= 1e3) return (value / 1e3).toFixed(2) + 'k'; if (value >= 1) return value.toFixed(2); return value > 0 ? value.toPrecision(3) : '0' }
  const usd = value => finite(value) ? '$' + compact(value) : '—'
  const percent = value => finite(value) ? compact(value) + '%' : '—'
  const priceText = value => { if (!Number.isFinite(value) || value <= 0) return '—'; if (value >= 1e15) return '∞'; if (value >= 1e6) return compact(value); return String(Number(value.toPrecision(5))) }
  const feeText = pips => (pips / 10000).toFixed(pips % 100 ? 4 : 2).replace(/0+$/, '').replace(/\.$/, '') + '%'
  const rawNumber = (value, decimals) => decimals === null ? NaN : Number(value) / (10 ** decimals)
  const formatAmount = (value, decimals) => { try { const parts = ethers.utils.formatUnits(ethers.BigNumber.from(String(value)), decimals).split('.'); const tail = (parts[1] || '').slice(0, 6).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const signed24 = value => value >= 0x800000 ? value - 0x1000000 : value
  const slotHex = value => ethers.utils.hexZeroPad('0x' + value.toString(16), 32)
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'arcv4-action', disabled: disabled || state.sending }); node.addEventListener('click', function () { Promise.resolve(fn()).catch(error => setStatus(errText(error), 'error')) }); return node }
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

  function setStatus (text, kind) { state.status = text || ''; const node = byId('arcv4-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (active) { const box = byId('arcv4-loading'); const spin = byId('arcv4-loading-spin'); if (!box) return; box.hidden = !active; if (active && !state.spinner) { let index = 0; state.spinner = window.setInterval(function () { spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) } if (!active && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }
  async function limited (items, count, fn) { const output = new Array(items.length); let next = 0; async function worker () { while (next < items.length) { const index = next++; output[index] = await fn(items[index], index) } } await Promise.all(Array.from({ length: Math.min(count, Math.max(1, items.length)) }, worker)); return output }

  const logSpacing = 450
  /* eth_getLogs has a tighter rate limit than eth_call, so log queries start at least logSpacing ms apart. */
  let nextLogsAt = 0
  async function logsTurn () { const now = Date.now(); const at = Math.max(now, nextLogsAt); nextLogsAt = at + logSpacing; if (at > now) await pause(at - now) }
  /* The RPC rate-limits bursts, so every request goes through one small queue. */
  async function slot () { if (state.active < 3) { state.active += 1; return } await new Promise(resolve => state.waiting.push(resolve)) }
  function release () { const next = state.waiting.shift(); if (next) next(); else state.active -= 1 }
  async function rpc (method, params, timeout) {
    let lastError
    for (let attempt = 0; attempt < 8; attempt += 1) {
      if (method === 'eth_getLogs') await logsTurn()
      await slot()
      let limitedRate = false
      try {
        const controller = new window.AbortController(); const timer = window.setTimeout(function () { controller.abort() }, timeout || 30000)
        try {
          let response
          try { response = await window.fetch(currentRpc(), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }), signal: controller.signal }) } catch (error) { error.transport = true; throw error }
          const text = await response.text(); let body = null; try { body = JSON.parse(text) } catch (_) {}
          if (response.status === 429 || body && body.error && (body.error.code === -32005 || /rate limit/i.test(body.error.message || ''))) { limitedRate = true; throw new Error('RPC busy.') }
          if (!body) throw new Error('RPC unavailable.')
          if (body.error) { const error = new Error(body.error.message || 'RPC error.'); error.rpc = true; error.data = body.error.data; throw error }
          return body.result
        } finally { window.clearTimeout(timer) }
      } catch (error) {
        lastError = error; if (error.rpc) throw error
        if (isTransport(error)) nextRpc()
      } finally { release() }
      await pause((limitedRate ? 700 : 300) * (2 ** Math.min(attempt, 5)))
    }
    throw lastError
  }

  async function batch (calls, groupSize) {
    if (!calls.length) return []
    const size = groupSize || 250
    const groups = []; for (let i = 0; i < calls.length; i += size) groups.push(calls.slice(i, i + size))
    const decode = function (call, raw) { try { const result = call.iface.decodeFunctionResult(call.method, raw); return call.decode ? call.decode(result) : result.length === 1 ? result[0] : result } catch (_) { return call.fallback } }
    async function execute (group) {
      const encoded = group.map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }))
      try {
        const raw = await rpc('eth_call', [{ to: address.multicall, data: multicall.encodeFunctionData('aggregate3', [encoded]) }, 'latest'])
        const result = multicall.decodeFunctionResult('aggregate3', raw)[0]
        return result.map((item, index) => item.success ? decode(group[index], item.returnData) : group[index].fallback)
      } catch (_) {
        if (group.length > 1) { const middle = Math.ceil(group.length / 2); const first = await execute(group.slice(0, middle)); const second = await execute(group.slice(middle)); return first.concat(second) }
        try { return [decode(group[0], await rpc('eth_call', [{ to: group[0].target, data: encoded[0].callData }, 'latest']))] } catch (_) { return [group[0].fallback] }
      }
    }
    const values = await limited(groups, 2, execute)
    return [].concat(...values)
  }

  /* extsload requests are grouped by slot count so a wide bitmap never makes one oversized call. */
  async function extsloadMany (requests, maxSlots) {
    const limit = maxSlots || 4000; const calls = []; const owners = []
    requests.forEach(function (slots, index) { for (let start = 0; start < slots.length; start += limit) { calls.push(slots.slice(start, start + limit)); owners.push(index) } })
    const groups = []; let current = []; let count = 0
    calls.forEach(function (slots, index) { if (current.length && count + slots.length > limit) { groups.push(current); current = []; count = 0 } current.push(index); count += slots.length })
    if (current.length) groups.push(current)
    const results = requests.map(() => [])
    const parts = new Array(calls.length)
    await limited(groups, 2, async function (group) {
      const values = await batch(group.map(index => ({ target: address.poolManager, iface: manager, method: 'extsload', args: [calls[index]], fallback: null })), group.length)
      group.forEach(function (index, position) { parts[index] = values[position] })
    })
    let failed = false
    parts.forEach(function (values, index) { if (!values) { failed = true; return } results[owners[index]].push(...values) })
    requests.forEach(function (slots, index) { if (results[index].length !== slots.length) results[index] = null })
    return { results, failed }
  }

  /* TickMath and LiquidityAmounts, exact in BigInt. */
  const tickFactors = [
    [0x2n, 0xfff97272373d413259a46990580e213an], [0x4n, 0xfff2e50f5f656932ef12357cf3c7fdccn], [0x8n, 0xffe5caca7e10e4e61c3624eaa0941cd0n],
    [0x10n, 0xffcb9843d60f6159c9db58835c926644n], [0x20n, 0xff973b41fa98c081472e6896dfb254c0n], [0x40n, 0xff2ea16466c96a3843ec78b326b52861n],
    [0x80n, 0xfe5dee046a99a2a811c461f1969c3053n], [0x100n, 0xfcbe86c7900a88aedcffc83b479aa3a4n], [0x200n, 0xf987a7253ac413176f2b074cf7815e54n],
    [0x400n, 0xf3392b0822b70005940c7a398e4b70f3n], [0x800n, 0xe7159475a2c29b7443b29c7fa6e889d9n], [0x1000n, 0xd097f3bdfd2022b8845ad8f792aa5825n],
    [0x2000n, 0xa9f746462d870fdf8a65dc1f90e061e5n], [0x4000n, 0x70d869a156d2a1b890bb3df62baf32f7n], [0x8000n, 0x31be135f97d08fd981231505542fcfa6n],
    [0x10000n, 0x9aa508b5b7a84e1c677de54f3e99bc9n], [0x20000n, 0x5d6af8dedb81196699c329225ee604n], [0x40000n, 0x2216e584f5fa1ea926041bedfe98n],
    [0x80000n, 0x48a170391f7dc42444e8fa2n]
  ]
  function sqrtAtTick (tick) {
    const abs = BigInt(Math.abs(tick))
    let ratio = abs & 1n ? 0xfffcb933bd6fad37aa2d162d1a594001n : 1n << 128n
    tickFactors.forEach(function (pair) { if (abs & pair[0]) ratio = (ratio * pair[1]) >> 128n })
    if (tick > 0) ratio = (U256 - 1n) / ratio
    return (ratio >> 32n) + (ratio % (1n << 32n) === 0n ? 0n : 1n)
  }
  function liquidityFor0 (a, b, amount) { return amount * (a * b / Q96) / (b - a) }
  function liquidityFor1 (a, b, amount) { return amount * Q96 / (b - a) }
  function liquidityForAmounts (price, a, b, amount0, amount1) {
    if (price <= a) return liquidityFor0(a, b, amount0)
    if (price < b) { const l0 = liquidityFor0(price, b, amount0); const l1 = liquidityFor1(a, price, amount1); return l0 < l1 ? l0 : l1 }
    return liquidityFor1(a, b, amount1)
  }
  function amountsForLiquidity (price, a, b, liquidity) {
    const amount0 = (lo, hi) => (liquidity << 96n) * (hi - lo) / hi / lo
    const amount1 = (lo, hi) => liquidity * (hi - lo) / Q96
    if (price <= a) return [amount0(a, b), 0n]
    if (price < b) return [amount0(price, b), amount1(a, price)]
    return [0n, amount1(a, b)]
  }

  function poolId (key) { return ethers.utils.keccak256(coder.encode(['address', 'address', 'uint24', 'int24', 'address'], [key.currency0, key.currency1, key.fee, key.tickSpacing, key.hooks])) }
  function poolBase (pool) { return BigInt(ethers.utils.keccak256(coder.encode(['bytes32', 'uint256'], [pool.id, poolsSlot]))) }

  function makePool (key, seeded) {
    const normalized = { currency0: ethers.utils.getAddress(key.currency0), currency1: ethers.utils.getAddress(key.currency1), fee: Number(key.fee), tickSpacing: Number(key.tickSpacing), hooks: ethers.utils.getAddress(key.hooks) }
    const pool = { key: normalized, token0: normalized.currency0, token1: normalized.currency1, seeded, ready: false, liquidityReady: false, sqrtPriceX96: 0n, tick: null, lpFee: null, protocolFee: 0, activeLiquidity: 0n, amounts: [NaN, NaN], tvl: NaN, fee0: 0, fee1: 0, feeUsd: NaN, apr: NaN, swaps: 0 }
    pool.id = poolId(normalized); pool.base = poolBase(pool)
    return pool
  }

  function seedRegistry () {
    state.pools = seedPools.map(value => makePool({ currency0: seedTokens[value[0]], currency1: seedTokens[value[1]], fee: value[2], tickSpacing: value[3], hooks: zeroAddress }, true))
    storedCustomKeys().forEach(function (key) { try { const pool = makePool(key, true); if (!state.pools.some(item => item.id === pool.id)) { pool.custom = true; state.pools.push(pool) } } catch (_) {} })
    state.poolMap = new Map(state.pools.map(pool => [pool.id, pool]))
  }

  const customPoolsKey = 'arc-uniswap-v4-custom-pools'
  function storedCustomKeys () { try { const value = JSON.parse(window.localStorage.getItem(customPoolsKey) || '[]'); return Array.isArray(value) ? value : [] } catch (_) { return [] } }
  function storeCustomKeys () { try { window.localStorage.setItem(customPoolsKey, JSON.stringify(state.pools.filter(pool => pool.custom).map(pool => pool.key))) } catch (_) {} }

  /* A pool id resolves through the PositionManager's poolKeys; the key must hash back to the id and the pool must be initialized. */
  async function addCustomPool () {
    const input = byId('arcv4-custom-pool'); const value = lower(input ? input.value.trim() : '')
    if (!/^0x[0-9a-f]{64}$/.test(value)) throw new Error('Enter a pool id.')
    const existing = state.poolMap.get(value)
    if (existing && state.pools.includes(existing)) { existing.custom = true; storeCustomKeys(); if (input) input.value = ''; render(); return }
    setStatus('Checking pool…')
    const raw = (await batch([{ target: address.positionManager, iface: positions, method: 'poolKeys', args: [ethers.utils.hexDataSlice(value, 0, 25)], fallback: null, decode: result => result[0] }]))[0]
    const key = raw && { currency0: raw[0], currency1: raw[1], fee: Number(raw[2]), tickSpacing: Number(raw[3]), hooks: raw[4] }
    if (!key || Number(key.tickSpacing) === 0 || poolId(key) !== value) throw new Error('Not a Uniswap v4 pool on Arc.')
    const pool = existing || makePool(key, true); pool.custom = true; pool.seeded = true
    await loadTokens([pool.token0, pool.token1]); await loadPoolState([pool])
    if (!pool.ready) throw new Error('Not a Uniswap v4 pool on Arc.')
    state.pools.push(pool); state.poolMap.set(pool.id, pool); storeCustomKeys(); if (input) input.value = ''
    setStatus(''); compute(); render()
    await loadLiquidity([pool]); compute(); render()
    if (state.feesReady) await loadFees(state.generation, [pool])
  }
  function removeCustomPool (pool) {
    pool.custom = false; storeCustomKeys()
    if (!seedPools.some(value => poolId({ currency0: seedTokens[value[0]], currency1: seedTokens[value[1]], fee: value[2], tickSpacing: value[3], hooks: zeroAddress }) === pool.id)) state.pools = state.pools.filter(item => item !== pool)
    render()
  }

  async function loadTokens (values, extra) {
    const list = [...new Set(values.map(lower))].filter(value => value && !state.tokens.has(value))
    if (list.includes(zeroAddress)) state.tokens.set(zeroAddress, { address: zeroAddress, symbol: chain.nativeCurrency.symbol, decimals: chain.nativeCurrency.decimals })
    const erc = list.filter(value => value !== zeroAddress); if (!erc.length && !extra) return
    const calls = (extra || []).slice(); erc.forEach(value => calls.push({ target: value, iface: erc20, method: 'symbol', fallback: null }, { target: value, iface: erc20, method: 'decimals', fallback: null }))
    const results = (await batch(calls)).slice((extra || []).length)
    erc.forEach(function (value, index) { const raw = results[index * 2]; const decimals = results[index * 2 + 1]; state.tokens.set(value, { address: ethers.utils.getAddress(value), symbol: raw === null ? short(value) : String(raw).replace(/[\r\n\t]/g, ' ').slice(0, 18), decimals: decimals === null ? null : Number(decimals) }) })
  }

  /* Pool.State: slot0, feeGrowthGlobal0, feeGrowthGlobal1, liquidity, ticks, tickBitmap, positions. */
  async function loadPoolState (pools) {
    const read = await extsloadMany(pools.map(pool => [pool.base, pool.base + 3n].map(slotHex)))
    pools.forEach(function (pool, index) {
      const values = read.results[index]; if (!values) return
      const packed = BigInt(values[0])
      pool.sqrtPriceX96 = packed & ((1n << 160n) - 1n)
      pool.tick = signed24(Number((packed >> 160n) & 0xffffffn))
      pool.protocolFee = Number((packed >> 184n) & 0xffffffn)
      pool.lpFee = Number((packed >> 208n) & 0xffffffn)
      pool.activeLiquidity = BigInt(values[1])
      pool.ready = pool.sqrtPriceX96 > 0n
    })
  }

  /* Walk every initialized tick from the bitmap so TVL is what sits in the pool's ranges, not only active liquidity. */
  async function loadLiquidity (pools) {
    const ready = pools.filter(pool => pool.ready)
    const words = ready.map(function (pool) {
      const spacing = pool.key.tickSpacing; const low = Math.floor(Math.floor(minTick / spacing) / 256); const high = Math.floor(Math.floor(maxTick / spacing) / 256)
      const bitmapBase = slotHex(pool.base + 5n); const list = []
      for (let word = low; word <= high; word += 1) list.push(ethers.utils.keccak256(coder.encode(['int16', 'bytes32'], [word, bitmapBase])))
      pool.wordLow = low
      return list
    })
    const bitmaps = await extsloadMany(words)
    const tickLists = ready.map(function (pool, index) {
      const values = bitmaps.results[index]; if (!values) return null
      const ticks = []
      values.forEach(function (raw, offset) {
        let bits = BigInt(raw); if (!bits) return
        const word = pool.wordLow + offset
        for (let bit = 0; bits; bit += 1, bits >>= 1n) if (bits & 1n) ticks.push((word * 256 + bit) * pool.key.tickSpacing)
      })
      return ticks
    })
    const tickSlots = ready.map(function (pool, index) { const ticks = tickLists[index]; if (!ticks) return []; const ticksBase = slotHex(pool.base + 4n); return ticks.map(tick => ethers.utils.keccak256(coder.encode(['int24', 'bytes32'], [tick, ticksBase]))) })
    const infos = await extsloadMany(tickSlots)
    ready.forEach(function (pool, index) {
      const ticks = tickLists[index]; const values = infos.results[index]
      if (!ticks || !values) return
      pool.ticks = ticks.map((tick, position) => ({ tick, net: BigInt.asIntN(128, BigInt(values[position]) >> 128n) })).sort((a, b) => a.tick - b.tick)
      const price = Number(pool.sqrtPriceX96) / 2 ** 96; let liquidity = 0n; let amount0 = 0; let amount1 = 0
      for (let i = 0; i < pool.ticks.length - 1; i += 1) {
        liquidity += pool.ticks[i].net
        if (liquidity <= 0n) continue
        const l = Number(liquidity); const a = Math.pow(1.0001, pool.ticks[i].tick / 2); const b = Math.pow(1.0001, pool.ticks[i + 1].tick / 2)
        if (price <= a) amount0 += l * (b - a) / (a * b)
        else if (price >= b) amount1 += l * (b - a)
        else { amount0 += l * (b - price) / (price * b); amount1 += l * (price - a) }
      }
      const d0 = token(pool.token0).decimals; const d1 = token(pool.token1).decimals
      pool.amounts = d0 === null || d1 === null ? [NaN, NaN] : [amount0 / (10 ** d0), amount1 / (10 ** d1)]
      pool.liquidityReady = true
    })
  }

  function spot (pool) {
    const d0 = token(pool.token0).decimals; const d1 = token(pool.token1).decimals
    if (!pool.ready || d0 === null || d1 === null) return NaN
    const value = (Number(pool.sqrtPriceX96) / 2 ** 96) ** 2 * (10 ** (d0 - d1))
    return Number.isFinite(value) && value > 0 ? value : NaN
  }

  function compute () {
    state.prices = new Map([[lower(address.usdc), 1], [zeroAddress, 1]]); state.confidence = new Map([[lower(address.usdc), Number.MAX_VALUE], [zeroAddress, Number.MAX_VALUE]])
    state.pools.forEach(pool => { pool.spot = spot(pool) })
    for (let pass = 0; pass < 12; pass += 1) {
      let changed = false
      state.pools.forEach(function (pool) {
        if (!pool.liquidityReady || !finite(pool.spot)) return
        const key0 = lower(pool.token0); const key1 = lower(pool.token1); const price0 = state.prices.get(key0); const price1 = state.prices.get(key1); const confidence0 = state.confidence.get(key0) || 0; const confidence1 = state.confidence.get(key1) || 0
        if (finite(price0) && pool.amounts[0] > 0) { const candidate = price0 / pool.spot; const confidence = Math.min(confidence0, pool.amounts[0] * price0); if (confidence >= minConfidence && candidate > minPrice && candidate < maxPrice && confidence > confidence1) { state.prices.set(key1, candidate); state.confidence.set(key1, confidence); changed = true } }
        if (finite(price1) && pool.amounts[1] > 0) { const candidate = price1 * pool.spot; const confidence = Math.min(confidence1, pool.amounts[1] * price1); if (confidence >= minConfidence && candidate > minPrice && candidate < maxPrice && confidence > confidence0) { state.prices.set(key0, candidate); state.confidence.set(key0, confidence); changed = true } }
      })
      if (!changed) break
    }
    state.pools.forEach(function (pool) {
      const price0 = state.prices.get(lower(pool.token0)); const price1 = state.prices.get(lower(pool.token1))
      pool.price0 = price0; pool.price1 = price1
      pool.tvl = pool.liquidityReady && finite(price0) && finite(price1) ? pool.amounts[0] * price0 + pool.amounts[1] * price1 : NaN
      if (!state.feeSeconds) { pool.feeUsd = NaN; pool.apr = NaN; return }
      const feesPriced = (pool.fee0 === 0 || finite(price0)) && (pool.fee1 === 0 || finite(price1))
      pool.feeUsd = feesPriced ? pool.fee0 * (price0 || 0) + pool.fee1 * (price1 || 0) : NaN
      if (pool.feeUsd === 0) pool.apr = 0
      else pool.apr = finite(pool.feeUsd) && finite(pool.tvl) && pool.tvl > 0 ? pool.feeUsd * secondsPerYear / state.feeSeconds / pool.tvl * 100 : NaN
    })
    state.positions.forEach(computePosition)
  }

  async function measureBlocks () {
    const head = await rpc('eth_getBlockByNumber', ['latest', false])
    state.head = Number(head.number); state.headTime = Number(head.timestamp)
    const probe = Math.max(positionManagerBlock, state.head - 20000)
    try { const past = await rpc('eth_getBlockByNumber', [ethers.utils.hexValue(probe), false]); const seconds = state.headTime - Number(past.timestamp); if (seconds > 0) state.blockSeconds = seconds / (state.head - probe) } catch (_) {}
  }

  /* The RPC caps both block span and result count; a capped range is split and retried. */
  async function getLogs (filter, from, to) {
    try {
      const logs = await rpc('eth_getLogs', [{ address: filter.address, topics: filter.topics, fromBlock: ethers.utils.hexValue(from), toBlock: ethers.utils.hexValue(to) }], 45000)
      if (!Array.isArray(logs)) throw new Error('Log read failed.')
      return logs
    } catch (error) {
      if (to > from && /range|max results|too large|limit/i.test(errText(error))) { const middle = Math.floor((from + to) / 2); const first = await getLogs(filter, from, middle); const second = await getLogs(filter, middle + 1, to); return first.concat(second) }
      throw error
    }
  }

  function applySwap (pool, log) {
    const data = log.data.slice(2); if (data.length < 64 * 6) return
    const amount0 = BigInt.asIntN(128, BigInt('0x' + data.slice(0, 64))); const amount1 = BigInt.asIntN(128, BigInt('0x' + data.slice(64, 128))); const fee = BigInt('0x' + data.slice(64 * 5, 64 * 6))
    const zeroForOne = amount0 < 0n; const input = zeroForOne ? -amount0 : -amount1; if (input <= 0n) return
    const protocol = BigInt(zeroForOne ? pool.protocolFee & 0xfff : pool.protocolFee >> 12)
    const lpShare = fee > protocol ? fee - protocol : 0n
    const lpFee = input * lpShare / 1000000n
    const decimals = token(zeroForOne ? pool.token0 : pool.token1).decimals; if (decimals === null) return
    if (zeroForOne) pool.fee0 += rawNumber(lpFee, decimals); else pool.fee1 += rawNumber(lpFee, decimals)
    pool.swaps += 1
  }

  async function loadFees (generation, subset) {
    const pools = subset || state.pools
    const blocks = Math.ceil(feeTargetSeconds / state.blockSeconds); const floor = Math.max(positionManagerBlock, state.head - blocks)
    const ranges = []; for (let to = state.head; to >= floor; to -= logSpan + 1) ranges.push([Math.max(floor, to - logSpan), to])
    pools.forEach(pool => { pool.fee0 = 0; pool.fee1 = 0; pool.swaps = 0 })
    const ids = pools.filter(pool => pool.ready).map(pool => pool.id)
    let covered = state.head + 1; state.feeFailures = 0
    for (let index = 0; index < ranges.length; index += 1) {
      if (generation !== state.generation) return
      if (!subset) setStatus('Fees · ' + (index + 1) + '/' + ranges.length)
      let logs
      for (let attempt = 0; attempt < 3 && !logs; attempt += 1) {
        try { logs = await getLogs({ address: address.poolManager, topics: [swapTopic, ids] }, ranges[index][0], ranges[index][1]) } catch (_) { if (attempt < 2) await pause(5000 * (attempt + 1)) }
      }
      if (!logs) { state.feeFailures += 1; break }
      logs.forEach(function (log) { const pool = state.poolMap.get(lower(log.topics[1])); if (pool && pools.includes(pool)) applySwap(pool, log) })
      covered = ranges[index][0]
      state.feeSeconds = Math.max(1, (state.head - covered + 1) * state.blockSeconds)
      compute(); render()
    }
    state.feesReady = true; compute(); render()
  }

  function poolName (pool) { return token(pool.token0).symbol + ' / ' + token(pool.token1).symbol }
  function feeLabel (pool) { return pool.key.fee === dynamicFeeFlag ? 'dynamic ' + (pool.lpFee === null ? '—' : feeText(pool.lpFee)) : feeText(pool.key.fee) }
  function hooked (pool) { return lower(pool.key.hooks) !== zeroAddress }
  function poolPrice (pool) {
    if (!finite(pool.spot)) return '—'
    const anchor0 = state.confidence.get(lower(pool.token0)) === Number.MAX_VALUE; const info0 = token(pool.token0); const info1 = token(pool.token1)
    return anchor0 ? '1 ' + info1.symbol + ' = ' + priceText(1 / pool.spot) + ' ' + info0.symbol : '1 ' + info0.symbol + ' = ' + priceText(pool.spot) + ' ' + info1.symbol
  }
  function windowLabel () { const hours = state.feeSeconds / 3600; return hours >= 1 ? Math.round(hours) + 'h' : Math.max(1, Math.round(state.feeSeconds / 60)) + 'm' }
  function addHeader (table, labels) { const head = e('thead'); const row = e('tr'); labels.forEach(label => row.appendChild(e('th', { text: label }))); head.appendChild(row); table.appendChild(head) }
  function addCell (row, text, className) { row.appendChild(e('td', { text, className })) }
  function nameCell (row, title, sub, flag) { const cell = e('td'); append(cell, e('span', { className: 'arcv4-name', text: title }), e('span', { className: 'arcv4-sub', text: sub })); if (flag) cell.appendChild(e('span', { className: 'arcv4-sub arcv4-hook', text: flag })); row.appendChild(cell) }

  function renderPools () {
    const host = byId('arcv4-pools'); if (!host) return; host.textContent = ''
    const visible = state.pools.filter(pool => pool.ready && (pool.custom || state.showZero || !state.feesReady || !(pool.apr === 0)))
    visible.sort((a, b) => (Boolean(b.custom) - Boolean(a.custom)) || (finite(b.tvl) ? b.tvl : -1) - (finite(a.tvl) ? a.tvl : -1) || (b.apr || 0) - (a.apr || 0))
    if (!visible.length) {
      if (state.feesReady) { const empty = e('p', { className: 'arcv4-summary', text: 'No pools with fees in the last ' + windowLabel() + '. ' }); empty.appendChild(button('show 0 APR pools', toggleZero)); host.appendChild(empty) }
      return
    }
    const label = state.feeSeconds ? windowLabel() : '—'
    const table = e('table', { className: 'arcv4-table' }); addHeader(table, ['Pool', 'Price', 'TVL', 'Fee APR (' + label + ')', 'Fees / ' + label, 'Liquidity', 'Actions']); const body = e('tbody')
    visible.forEach(function (pool) {
      const row = e('tr')
      nameCell(row, poolName(pool), feeLabel(pool) + ' · tick ' + pool.key.tickSpacing + ' · ' + pool.id.slice(0, 10), hooked(pool) ? 'hooks ' + short(pool.key.hooks) : '')
      addCell(row, poolPrice(pool))
      addCell(row, pool.liquidityReady || pool.liquidityFailed ? usd(pool.tvl) : '…', finite(pool.tvl) ? '' : 'arcv4-unpriced')
      addCell(row, state.feeSeconds ? percent(pool.apr) : '…', finite(pool.apr) ? '' : 'arcv4-unpriced')
      addCell(row, state.feeSeconds ? usd(pool.feeUsd) + (pool.swaps ? '\n' + pool.swaps + ' swaps' : '') : '…')
      addCell(row, pool.liquidityFailed ? '—' : pool.liquidityReady ? compact(pool.amounts[0]) + ' ' + token(pool.token0).symbol + '\n' + compact(pool.amounts[1]) + ' ' + token(pool.token1).symbol : '…')
      const actions = e('td', { className: 'arcv4-actions' }); actions.appendChild(button('add', function () { return openMint(pool) }, !pool.ready)); if (pool.custom) actions.appendChild(button('remove pool', function () { removeCustomPool(pool) })); row.appendChild(actions)
      body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function renderSummary () {
    const node = byId('arcv4-summary'); if (!node) return
    const ready = state.pools.filter(pool => pool.liquidityReady)
    const tvl = ready.reduce((sum, pool) => sum + (finite(pool.tvl) ? pool.tvl : 0), 0)
    const priced = ready.filter(pool => finite(pool.tvl)).length
    const fees = state.pools.reduce((sum, pool) => sum + (finite(pool.feeUsd) ? pool.feeUsd : 0), 0)
    let text = 'Uniswap v4 TVL ' + usd(tvl) + ' · ' + priced + '/' + state.pools.length + ' priced'
    if (state.feeSeconds) text += ' · fees ' + usd(fees) + ' / ' + windowLabel()
    if (state.feesReady && state.feeFailures) text += ' · fee window incomplete'
    node.textContent = text
  }

  function renderWallet () {
    const node = byId('arcv4-wallet-status'); if (node) node.textContent = state.account ? short(state.account) + (correctChain() ? '' : ' · wrong chain') + ' ' : ''
    const switcher = byId('arcv4-switch'); if (switcher) switcher.hidden = !state.account || correctChain()
    const toggle = byId('arcv4-zero-toggle'); if (toggle) toggle.textContent = state.showZero ? '[ hide 0 APR pools ]' : '[ show 0 APR pools ]'
  }

  function inRange (position) { const pool = position.pool; return pool.tick !== null && pool.tick >= position.tickLower && pool.tick < position.tickUpper }
  function tickPrice (pool, tick) { const d0 = token(pool.token0).decimals; const d1 = token(pool.token1).decimals; if (d0 === null || d1 === null) return NaN; return Math.pow(1.0001, tick) * (10 ** (d0 - d1)) }
  function rangeText (pool, lowerTick, upperTick) {
    const anchor0 = state.confidence.get(lower(pool.token0)) === Number.MAX_VALUE
    const low = tickPrice(pool, lowerTick); const high = tickPrice(pool, upperTick)
    if (anchor0) return priceText(1 / high) + ' – ' + priceText(1 / low) + ' ' + token(pool.token0).symbol + ' per ' + token(pool.token1).symbol
    return priceText(low) + ' – ' + priceText(high) + ' ' + token(pool.token1).symbol + ' per ' + token(pool.token0).symbol
  }

  function computePosition (position) {
    const pool = position.pool; const info0 = token(pool.token0); const info1 = token(pool.token1)
    if (!pool.ready) return
    const amounts = amountsForLiquidity(pool.sqrtPriceX96, sqrtAtTick(position.tickLower), sqrtAtTick(position.tickUpper), position.liquidity)
    position.raw0 = amounts[0]; position.raw1 = amounts[1]
    position.amount0 = rawNumber(amounts[0], info0.decimals); position.amount1 = rawNumber(amounts[1], info1.decimals)
    position.owed0Number = rawNumber(position.owed0, info0.decimals); position.owed1Number = rawNumber(position.owed1, info1.decimals)
    const price0 = state.prices.get(lower(pool.token0)); const price1 = state.prices.get(lower(pool.token1))
    position.value = finite(price0) && finite(price1) ? position.amount0 * price0 + position.amount1 * price1 : NaN
    position.owedUsd = finite(price0) && finite(price1) ? position.owed0Number * price0 + position.owed1Number * price1 : NaN
  }

  function renderPositions () {
    const host = byId('arcv4-positions'); if (!host) return; host.textContent = ''
    host.hidden = !state.account || !correctChain() || !state.nftCount
    if (host.hidden) return
    const head = e('p', { className: 'arcv4-summary', text: 'Positions · ' + state.positions.length + ' ' })
    head.appendChild(button('add by id', addById)); host.appendChild(head)
    if (!state.positions.length) return
    const table = e('table', { className: 'arcv4-table' }); addHeader(table, ['Position', 'Range', 'Amounts', 'Value', 'Unclaimed fees', 'Actions']); const body = e('tbody')
    state.positions.forEach(function (position) {
      const pool = position.pool; const info0 = token(pool.token0); const info1 = token(pool.token1); const row = e('tr')
      if (!pool.ready || info0.decimals === null || info1.decimals === null) { nameCell(row, '#' + position.id, '…'); ['…', '…', '…', '…', ''].forEach(text => addCell(row, text)); body.appendChild(row); return }
      const status = position.liquidity === 0n ? 'empty' : inRange(position) ? 'in range' : 'out of range'
      nameCell(row, poolName(pool), '#' + position.id + ' · ' + feeLabel(pool) + ' · ' + status, hooked(pool) ? 'hooks ' + short(pool.key.hooks) : '')
      addCell(row, rangeText(pool, position.tickLower, position.tickUpper))
      addCell(row, formatAmount(position.raw0 || 0n, info0.decimals) + ' ' + info0.symbol + '\n' + formatAmount(position.raw1 || 0n, info1.decimals) + ' ' + info1.symbol)
      addCell(row, usd(position.value), finite(position.value) ? '' : 'arcv4-unpriced')
      addCell(row, formatAmount(position.owed0, info0.decimals) + ' ' + info0.symbol + '\n' + formatAmount(position.owed1, info1.decimals) + ' ' + info1.symbol + '\n' + usd(position.owedUsd))
      const actions = e('td', { className: 'arcv4-actions' })
      actions.appendChild(button('add', function () { return openIncrease(position) }, !pool.ready))
      if (position.liquidity > 0n) actions.appendChild(button('remove', function () { return openDecrease(position) }))
      if (position.owed0 > 0n || position.owed1 > 0n) actions.appendChild(button('collect', function () { return collect(position) }))
      if (position.liquidity === 0n) actions.appendChild(button('burn', function () { return burn(position) }))
      row.appendChild(actions); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function render () { renderWallet(); renderSummary(); renderPositions(); renderPools() }

  /* Wallet NFTs: incoming Transfer logs name candidate ids, newest first, until every owned NFT is accounted for. */
  function storageKey () { return 'arcv4-ids-' + lower(state.account) }
  function rememberedIds () { try { return JSON.parse(window.localStorage.getItem(storageKey()) || '[]').filter(value => /^\d+$/.test(value)) } catch (_) { return [] } }
  function rememberIds (ids) { try { window.localStorage.setItem(storageKey(), JSON.stringify(ids)) } catch (_) {} }

  async function readPositions (ids) {
    const calls = []
    ids.forEach(id => calls.push(
      { target: address.positionManager, iface: positions, method: 'ownerOf', args: [id], fallback: null },
      { target: address.positionManager, iface: positions, method: 'getPoolAndPositionInfo', args: [id], fallback: null, decode: value => value },
      { target: address.positionManager, iface: positions, method: 'getPositionLiquidity', args: [id], fallback: null }
    ))
    const values = await batch(calls)
    const found = []
    ids.forEach(function (id, index) {
      const owner = values[index * 3]; const info = values[index * 3 + 1]; const liquidity = values[index * 3 + 2]
      if (!owner || lower(owner) !== lower(state.account) || !info || liquidity === null) return
      const packed = BigInt(info[1].toString())
      found.push({ id: String(id), key: info[0], tickLower: signed24(Number((packed >> 8n) & 0xffffffn)), tickUpper: signed24(Number((packed >> 32n) & 0xffffffn)), liquidity: BigInt(liquidity.toString()), owed0: 0n, owed1: 0n })
    })
    const extra = []
    found.forEach(function (position) {
      const id = poolId(position.key); let pool = state.poolMap.get(id)
      if (!pool) { pool = makePool(position.key, false); state.poolMap.set(id, pool); extra.push(pool) }
      position.pool = pool
    })
    if (extra.length) { await loadTokens(extra.flatMap(pool => [pool.token0, pool.token1])); await loadPoolState(extra) }
    await loadOwed(found)
    return found
  }

  async function loadOwed (list) {
    if (!list.length) return
    const calls = []
    list.forEach(position => calls.push(
      { target: address.stateView, iface: stateView, method: 'getPositionInfo', args: [position.pool.id, address.positionManager, position.tickLower, position.tickUpper, ethers.utils.hexZeroPad(ethers.BigNumber.from(position.id).toHexString(), 32)], fallback: null, decode: value => value },
      { target: address.stateView, iface: stateView, method: 'getFeeGrowthInside', args: [position.pool.id, position.tickLower, position.tickUpper], fallback: null, decode: value => value }
    ))
    const values = await batch(calls)
    list.forEach(function (position, index) {
      const info = values[index * 2]; const inside = values[index * 2 + 1]; if (!info || !inside) return
      const liquidity = BigInt(info[0].toString())
      const owed = (now, last) => ((BigInt(now.toString()) - BigInt(last.toString()) + U256) % U256) * liquidity >> 128n
      position.owed0 = owed(inside[0], info[1]); position.owed1 = owed(inside[1], info[2])
    })
  }

  function mergePositions (found) {
    const map = new Map(state.positions.map(position => [position.id, position]))
    found.forEach(position => map.set(position.id, position))
    state.positions = [...map.values()].sort((a, b) => (b.value || 0) - (a.value || 0) || Number(b.id) - Number(a.id))
    rememberIds(state.positions.map(position => position.id))
    compute()
  }

  async function loadPositions () {
    const generation = ++state.walletGeneration
    state.positions = []; state.nftCount = null; state.nftScan = null
    if (!state.account || !correctChain()) { renderPositions(); return }
    const account = state.account
    const count = (await batch([{ target: address.positionManager, iface: positions, method: 'balanceOf', args: [account], fallback: null }]))[0]
    if (generation !== state.walletGeneration) return
    state.nftCount = count === null ? 0 : Number(count); renderPositions()
    if (!state.nftCount) return
    const seen = new Set()
    const remembered = rememberedIds(); remembered.forEach(id => seen.add(id))
    if (remembered.length) { const found = await readPositions(remembered); if (generation !== state.walletGeneration) return; mergePositions(found); render() }
    if (!state.head) await measureBlocks()
    const topic = ethers.utils.hexZeroPad(account, 32).toLowerCase()
    let to = state.head
    while (state.positions.length < state.nftCount && to >= positionManagerBlock) {
      if (generation !== state.walletGeneration) return
      const from = Math.max(positionManagerBlock, to - logSpan)
      state.nftScan = 'block ' + from.toLocaleString('en-US'); renderPositions()
      let logs
      try { logs = await getLogs({ address: address.positionManager, topics: [transferTopic, null, topic] }, from, to) } catch (error) { state.nftScan = 'scan stopped'; renderPositions(); return }
      const ids = [...new Set(logs.map(log => BigInt(log.topics[3]).toString()))].filter(id => !seen.has(id))
      ids.forEach(id => seen.add(id))
      if (ids.length) { const found = await readPositions(ids); if (generation !== state.walletGeneration) return; mergePositions(found); render() }
      to = from - 1
    }
    state.nftScan = null; renderPositions()
  }

  async function addById () {
    requireWallet()
    const value = String(window.prompt('Position id') || '').trim(); if (!value) return
    if (!/^\d+$/.test(value)) throw new Error('Enter a position id.')
    const found = await readPositions([value])
    if (!found.length) throw new Error('#' + value + ' is not held by this wallet.')
    mergePositions(found); render()
  }

  function requireWallet () { if (!state.account || !state.eip1193) throw new Error('Connect wallet.'); if (!correctChain()) throw new Error('Switch to Arc.') }
  function deadline () { return Math.floor(Date.now() / 1000) + 1200 }
  function showDialog () { const dialog = byId('arcv4-action-dialog'); if (dialog && !dialog.open) dialog.showModal() }
  function parseUnits (value, decimals, label, allowZero) {
    if (decimals === null) throw new Error(label + ' metadata unavailable.')
    const text = String(value || '').trim() || (allowZero ? '0' : '')
    try { const amount = BigInt(ethers.utils.parseUnits(text, decimals).toString()); if (amount < 0n || (!allowZero && amount === 0n)) throw new Error(); return amount } catch (_) { throw new Error('Enter ' + label + '.') }
  }
  function slippageBps (action) { const value = Number(String(action.slippage || '').trim()); if (!Number.isFinite(value) || value < 0 || value > 50) throw new Error('Enter slippage between 0 and 50%.'); return BigInt(Math.round(value * 100)) }
  function alignTick (tick, spacing, up) { const aligned = (up ? Math.ceil(tick / spacing) : Math.floor(tick / spacing)) * spacing; return Math.max(Math.ceil(minTick / spacing) * spacing, Math.min(Math.floor(maxTick / spacing) * spacing, aligned)) }
  function inputText (raw, decimals) { if (decimals === null) return ''; const text = ethers.utils.formatUnits(ethers.BigNumber.from(raw.toString()), decimals); const parts = text.split('.'); const tail = (parts[1] || '').slice(0, 8).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] }

  function dialogField (host, label, key, value, onInput) {
    const row = e('div', { className: 'arcv4-input' }); const input = e('input')
    input.type = 'text'; input.inputMode = 'decimal'; input.autocomplete = 'off'; input.value = value || ''; input.dataset.key = key
    input.addEventListener('input', function () { if (!state.action) return; state.action[key] = input.value; if (onInput) onInput(key) })
    append(row, e('label', { text: label }), input); host.appendChild(row); return input
  }
  function dialogButtons (host, list) { const row = e('div', { className: 'arcv4-dialog-actions' }); list.forEach(item => row.appendChild(button(item[0], item[1], item[2]))); host.appendChild(row) }
  function setField (key, value) { const input = document.querySelector('#arcv4-action-content input[data-key="' + key + '"]'); if (input) input.value = value; if (state.action) state.action[key] = value }

  function openMint (pool) {
    requireWallet(); if (!pool.ready) throw new Error('Pool state unavailable.')
    const spacing = pool.key.tickSpacing; const width = Math.max(spacing, Math.round(953 / spacing) * spacing)
    state.action = { mode: 'mint', pool, amount0: '', amount1: '', tickLower: String(alignTick(pool.tick - width, spacing, false)), tickUpper: String(alignTick(pool.tick + width + 1, spacing, true)), slippage: '0.5', last: 'amount0' }
    if (Number(state.action.tickLower) >= Number(state.action.tickUpper)) state.action.tickUpper = String(Number(state.action.tickLower) + spacing)
    state.actionInfo = null; renderAction(); showDialog(); return loadActionInfo()
  }
  function openIncrease (position) { requireWallet(); state.action = { mode: 'increase', pool: position.pool, position, amount0: '', amount1: '', slippage: '0.5', last: 'amount0' }; state.actionInfo = null; renderAction(); showDialog(); return loadActionInfo() }
  function openDecrease (position) { requireWallet(); state.action = { mode: 'decrease', pool: position.pool, position, percent: '100', slippage: '0.5' }; state.actionInfo = null; renderAction(); showDialog() }

  function actionRange (action) {
    if (action.position) return [action.position.tickLower, action.position.tickUpper]
    const spacing = action.pool.key.tickSpacing; const low = Number(action.tickLower); const high = Number(action.tickUpper)
    if (!Number.isInteger(low) || !Number.isInteger(high) || low >= high || low % spacing || high % spacing || low < minTick || high > maxTick) throw new Error('Ticks must be aligned to ' + spacing + ' and ordered.')
    return [low, high]
  }

  /* Filling one side derives the other from the range and the pool's current price. */
  function syncAmounts (changed) {
    const action = state.action; if (!action || !['amount0', 'amount1', 'tickLower', 'tickUpper'].includes(changed)) return
    if (changed === 'amount0' || changed === 'amount1') action.last = changed
    const pool = action.pool; const info0 = token(pool.token0); const info1 = token(pool.token1)
    let range; try { range = actionRange(action) } catch (_) { renderPreview(); return }
    const a = sqrtAtTick(range[0]); const b = sqrtAtTick(range[1]); const price = pool.sqrtPriceX96
    try {
      if (action.last === 'amount0') {
        const amount = parseUnits(action.amount0, info0.decimals, info0.symbol, true)
        if (price < b) { const liquidity = liquidityFor0(price > a ? price : a, b, amount); const amounts = amountsForLiquidity(price, a, b, liquidity); setField('amount1', inputText(amounts[1], info1.decimals)) }
      } else {
        const amount = parseUnits(action.amount1, info1.decimals, info1.symbol, true)
        if (price > a) { const liquidity = liquidityFor1(a, price < b ? price : b, amount); const amounts = amountsForLiquidity(price, a, b, liquidity); setField('amount0', inputText(amounts[0], info0.decimals)) }
      }
    } catch (_) {}
    renderPreview(); renderAddButtons()
  }

  function renderPreview () {
    const node = byId('arcv4-preview'); const action = state.action; if (!node || !action) return
    try {
      const range = actionRange(action); const pool = action.pool
      const status = pool.tick >= range[0] && pool.tick < range[1] ? 'in range' : 'out of range'
      node.textContent = rangeText(pool, range[0], range[1]) + ' · ' + status
    } catch (error) { node.textContent = errText(error) }
  }

  async function loadActionInfo () {
    const action = state.action; if (!action || !state.account || !correctChain() || action.mode === 'decrease') return
    if (!state.permit2) state.permit2 = (await batch([{ target: address.positionManager, iface: positions, method: 'permit2', fallback: null }]))[0]
    if (!state.permit2) throw new Error('Permit2 unavailable.')
    const pool = action.pool; const calls = []
    ;[pool.token0, pool.token1].forEach(function (currency) {
      if (isNative(currency)) return
      calls.push({ target: currency, iface: erc20, method: 'balanceOf', args: [state.account], fallback: null }, { target: currency, iface: erc20, method: 'allowance', args: [state.account, state.permit2], fallback: null }, { target: state.permit2, iface: permit2, method: 'allowance', args: [state.account, currency, address.positionManager], fallback: null, decode: value => value })
    })
    const values = calls.length ? await batch(calls) : []
    let native = null
    if (isNative(pool.token0) || isNative(pool.token1)) { try { native = BigInt(await rpc('eth_getBalance', [state.account, 'latest'])) } catch (_) {} }
    if (state.action !== action) return
    const info = {}; let cursor = 0
    ;[pool.token0, pool.token1].forEach(function (currency, index) {
      if (isNative(currency)) { info[index] = { native: true, balance: native }; return }
      const balance = values[cursor++]; const erc20Allowance = values[cursor++]; const permit = values[cursor++]
      info[index] = { balance: balance === null ? null : BigInt(balance.toString()), erc20Allowance: erc20Allowance === null ? null : BigInt(erc20Allowance.toString()), permitAmount: permit ? BigInt(permit[0].toString()) : null, permitExpiry: permit ? Number(permit[1]) : 0 }
    })
    state.actionInfo = info; renderAction()
  }

  function renderAction () {
    const host = byId('arcv4-action-content'); if (!host) return; host.textContent = ''
    const action = state.action; if (!action) return
    const pool = action.pool; const info0 = token(pool.token0); const info1 = token(pool.token1)
    const title = action.mode === 'mint' ? 'Add liquidity · ' : action.mode === 'increase' ? 'Add to #' + action.position.id + ' · ' : 'Remove from #' + action.position.id + ' · '
    host.appendChild(e('h2', { id: 'arcv4-action-title', text: title + poolName(pool) + ' · ' + feeLabel(pool) }))
    if (hooked(pool)) host.appendChild(e('p', { className: 'arcv4-hook', text: 'Hooks ' + pool.key.hooks }))
    if (action.mode === 'decrease') {
      const position = action.position
      host.appendChild(e('p', { text: formatAmount(position.raw0 || 0n, info0.decimals) + ' ' + info0.symbol + ' · ' + formatAmount(position.raw1 || 0n, info1.decimals) + ' ' + info1.symbol + ' · fees ' + formatAmount(position.owed0, info0.decimals) + ' ' + info0.symbol + ' + ' + formatAmount(position.owed1, info1.decimals) + ' ' + info1.symbol }))
      dialogField(host, 'Percent', 'percent', action.percent); dialogField(host, 'Slippage %', 'slippage', action.slippage)
      dialogButtons(host, [['remove', submitDecrease]])
      return
    }
    const balances = state.actionInfo
    if (balances) host.appendChild(e('p', { text: 'Wallet ' + (balances[0].balance === null ? '—' : formatAmount(balances[0].balance, info0.decimals)) + ' ' + info0.symbol + ' · ' + (balances[1].balance === null ? '—' : formatAmount(balances[1].balance, info1.decimals)) + ' ' + info1.symbol }))
    if (action.mode === 'mint') {
      host.appendChild(e('p', { id: 'arcv4-preview' }))
      dialogField(host, 'Tick lower', 'tickLower', action.tickLower, syncAmounts); dialogField(host, 'Tick upper', 'tickUpper', action.tickUpper, syncAmounts)
    } else host.appendChild(e('p', { text: rangeText(pool, action.position.tickLower, action.position.tickUpper) + ' · ' + (inRange(action.position) ? 'in range' : 'out of range') }))
    dialogField(host, info0.symbol, 'amount0', action.amount0, syncAmounts); dialogField(host, info1.symbol, 'amount1', action.amount1, syncAmounts); dialogField(host, 'Slippage %', 'slippage', action.slippage, renderAddButtons)
    host.appendChild(e('div', { id: 'arcv4-add-buttons' }))
    renderAddButtons()
    if (action.mode === 'mint') renderPreview()
  }

  function renderAddButtons () {
    const host = byId('arcv4-add-buttons'); const action = state.action; if (!host || !action || action.mode === 'decrease') return; host.textContent = ''
    const pool = action.pool; const info0 = token(pool.token0); const info1 = token(pool.token1); const balances = state.actionInfo
    const list = []
    ;[0, 1].forEach(function (index) {
      const info = balances && balances[index]; const symbol = index ? info1.symbol : info0.symbol
      if (!info || info.native) return
      let needed = 0n; try { needed = requiredAmounts(action)[index] } catch (_) {}
      const erc20Ready = info.erc20Allowance !== null && needed > 0n && info.erc20Allowance >= needed
      const permitReady = info.permitAmount !== null && needed > 0n && info.permitAmount >= needed && info.permitExpiry > Math.floor(Date.now() / 1000) + 300
      if (needed > 0n && !erc20Ready) list.push(['approve ' + symbol, function () { return approveToken(index) }])
      if (needed > 0n && !permitReady) list.push(['permit ' + symbol, function () { return approvePermit(index) }, !erc20Ready])
    })
    list.push(['add', submitAdd])
    dialogButtons(host, list)
  }

  function requiredAmounts (action) {
    const pool = action.pool; const info0 = token(pool.token0); const info1 = token(pool.token1); const slip = slippageBps(action)
    const amount0 = parseUnits(action.amount0, info0.decimals, info0.symbol + ' amount', true); const amount1 = parseUnits(action.amount1, info1.decimals, info1.symbol + ' amount', true)
    if (amount0 === 0n && amount1 === 0n) throw new Error('Enter an amount.')
    return [amount0 * (10000n + slip) / 10000n, amount1 * (10000n + slip) / 10000n, amount0, amount1]
  }

  async function preflight (tx) {
    try { await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data, value: tx.value || '0x0' }, 'latest'] }) } catch (error) { throw new Error('Would revert: ' + errText(error)) }
  }

  async function send (tx, after) {
    if (state.sending) throw new Error('A transaction is already pending.')
    state.sending = true; renderAction(); renderPositions()
    try {
      await preflight(tx)
      setStatus('Confirm in wallet…')
      const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data, value: tx.value || '0x0' }] })
      setStatus(short(hash) + ' · pending')
      let receipt = null
      for (let attempt = 0; attempt < 180 && !receipt; attempt += 1) { await pause(1000); try { receipt = await rpc('eth_getTransactionReceipt', [hash]) } catch (_) {} }
      if (!receipt) throw new Error('Receipt not found for ' + hash + '.')
      if (Number(receipt.status) !== 1) throw new Error('Transaction reverted: ' + hash)
      setStatus('Confirmed · ' + short(hash), 'success')
    } finally { state.sending = false; renderAction(); renderPositions() }
    await after()
  }

  async function approveToken (index) {
    requireWallet(); const action = state.action; const pool = action.pool; const currency = index ? pool.token1 : pool.token0
    const needed = requiredAmounts(action)[index]
    await send({ to: currency, data: erc20.encodeFunctionData('approve', [state.permit2, needed.toString()]) }, loadActionInfo)
  }

  async function approvePermit (index) {
    requireWallet(); const action = state.action; const pool = action.pool; const currency = index ? pool.token1 : pool.token0
    const needed = requiredAmounts(action)[index]; if (needed >= (1n << 160n)) throw new Error('Amount too large.')
    const expiry = Math.floor(Date.now() / 1000) + 3600
    await send({ to: state.permit2, data: permit2.encodeFunctionData('approve', [currency, address.positionManager, needed.toString(), expiry]) }, loadActionInfo)
  }

  function encodeActions (list) {
    const bytes = '0x' + list.map(item => item[0].toString(16).padStart(2, '0')).join('')
    const params = list.map(item => coder.encode(item[1], item[2]))
    return positions.encodeFunctionData('modifyLiquidities', [coder.encode(['bytes', 'bytes[]'], [bytes, params]), deadline()])
  }
  function keyTuple (pool) { return [pool.key.currency0, pool.key.currency1, pool.key.fee, pool.key.tickSpacing, pool.key.hooks] }

  async function submitAdd () {
    requireWallet(); const action = state.action; const pool = action.pool; const info0 = token(pool.token0); const info1 = token(pool.token1)
    const range = actionRange(action); const required = requiredAmounts(action)
    const a = sqrtAtTick(range[0]); const b = sqrtAtTick(range[1])
    const liquidity = liquidityForAmounts(pool.sqrtPriceX96, a, b, required[2], required[3])
    if (liquidity <= 0n) throw new Error('Amounts are too small for this range.')
    const max0 = required[0]; const max1 = required[1]
    if (max0 > max128 || max1 > max128) throw new Error('Amount too large.')
    const balances = state.actionInfo
    if (balances) {
      if (balances[0].balance !== null && balances[0].balance < required[2]) throw new Error('Not enough ' + info0.symbol + '.')
      if (balances[1].balance !== null && balances[1].balance < required[3]) throw new Error('Not enough ' + info1.symbol + '.')
    }
    const native = isNative(pool.token0)
    const list = []
    if (action.mode === 'mint') {
      list.push([actions.MINT_POSITION, [keyType, 'int24', 'int24', 'uint256', 'uint128', 'uint128', 'address', 'bytes'], [keyTuple(pool), range[0], range[1], liquidity.toString(), max0.toString(), max1.toString(), state.account, '0x']])
      list.push([actions.SETTLE_PAIR, ['address', 'address'], [pool.token0, pool.token1]])
    } else {
      list.push([actions.INCREASE_LIQUIDITY, ['uint256', 'uint256', 'uint128', 'uint128', 'bytes'], [action.position.id, liquidity.toString(), max0.toString(), max1.toString(), '0x']])
      list.push([actions.CLOSE_CURRENCY, ['address'], [pool.token0]], [actions.CLOSE_CURRENCY, ['address'], [pool.token1]])
    }
    if (native) list.push([actions.SWEEP, ['address', 'address'], [zeroAddress, state.account]])
    const value = native ? ethers.utils.hexValue(ethers.BigNumber.from(max0.toString())) : '0x0'
    await send({ to: address.positionManager, data: encodeActions(list), value }, refreshAfterAction)
  }

  async function submitDecrease () {
    requireWallet(); const action = state.action; const position = action.position; const pool = position.pool
    const pct = Number(String(action.percent || '').trim()); if (!Number.isFinite(pct) || pct <= 0 || pct > 100) throw new Error('Enter a percent between 0 and 100.')
    const slip = slippageBps(action)
    const liquidity = pct === 100 ? position.liquidity : position.liquidity * BigInt(Math.round(pct * 100)) / 10000n
    if (liquidity <= 0n) throw new Error('Liquidity too small.')
    const expected = amountsForLiquidity(pool.sqrtPriceX96, sqrtAtTick(position.tickLower), sqrtAtTick(position.tickUpper), liquidity)
    const min0 = expected[0] * (10000n - slip) / 10000n; const min1 = expected[1] * (10000n - slip) / 10000n
    const list = [
      [actions.DECREASE_LIQUIDITY, ['uint256', 'uint256', 'uint128', 'uint128', 'bytes'], [position.id, liquidity.toString(), min0.toString(), min1.toString(), '0x']],
      [actions.TAKE_PAIR, ['address', 'address', 'address'], [pool.token0, pool.token1, state.account]]
    ]
    await send({ to: address.positionManager, data: encodeActions(list) }, refreshAfterAction)
  }

  async function collect (position) {
    requireWallet(); const pool = position.pool
    const list = [
      [actions.DECREASE_LIQUIDITY, ['uint256', 'uint256', 'uint128', 'uint128', 'bytes'], [position.id, 0, 0, 0, '0x']],
      [actions.TAKE_PAIR, ['address', 'address', 'address'], [pool.token0, pool.token1, state.account]]
    ]
    await send({ to: address.positionManager, data: encodeActions(list) }, refreshAfterAction)
  }

  async function burn (position) {
    requireWallet(); const pool = position.pool
    if (position.liquidity !== 0n) throw new Error('Remove liquidity first.')
    if (!window.confirm('Burn position #' + position.id + '?')) return
    const list = [
      [actions.BURN_POSITION, ['uint256', 'uint128', 'uint128', 'bytes'], [position.id, 0, 0, '0x']],
      [actions.TAKE_PAIR, ['address', 'address', 'address'], [pool.token0, pool.token1, state.account]]
    ]
    await send({ to: address.positionManager, data: encodeActions(list) }, refreshAfterAction)
  }

  async function refreshAfterAction () {
    const action = state.action; const dialog = byId('arcv4-action-dialog'); if (dialog && dialog.open) dialog.close()
    state.action = null; state.actionInfo = null
    const pools = action && action.pool ? [action.pool] : [...new Set(state.positions.map(position => position.pool))]
    await loadPoolState(pools); await loadLiquidity(pools.filter(pool => pool.seeded)); compute(); render()
    await loadPositions()
  }

  function bindProvider (provider) {
    if (!provider || state.boundProvider === provider || !provider.on) return; state.boundProvider = provider
    provider.on('accountsChanged', function (accounts) { adopt(provider, accounts || [], state.walletChain).catch(error => setStatus(errText(error), 'error')) })
    provider.on('chainChanged', function (chainId) { adopt(provider, state.account ? [state.account] : [], chainId).catch(error => setStatus(errText(error), 'error')) })
  }

  async function adopt (provider, accounts, chainId) {
    state.eip1193 = provider; state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null; state.walletChain = chainId; bindProvider(provider); render()
    if (state.account && correctChain()) await loadPositions(); else { state.walletGeneration += 1; state.positions = []; state.nftCount = null; renderPositions() }
  }

  async function restoreInjected () {
    const provider = injected(); if (!provider) return
    const accounts = await provider.request({ method: 'eth_accounts' }); const chainId = await provider.request({ method: 'eth_chainId' })
    if (accounts && accounts[0]) await adopt(provider, accounts, chainId)
  }

  async function connectInjected () {
    const provider = injected(); if (!provider) return connectOther()
    const accounts = await provider.request({ method: 'eth_requestAccounts' }); const chainId = await provider.request({ method: 'eth_chainId' })
    await adopt(provider, accounts, chainId); if (!correctChain()) setStatus('Switch to Arc.', 'error')
  }

  async function connectOther () {
    const reown = await import('./config.js'); if (!reown.REOWN_PROJECT_ID) throw new Error('Other wallet unavailable.')
    const kit = reown.createAppKitInstance(); if (!kit) throw new Error('Other wallet unavailable.')
    const onAccount = async function (accountState) { if (!accountState || !accountState.isConnected) return; const provider = await kit.getWalletProvider(); await adopt(provider, await provider.request({ method: 'eth_accounts' }), await provider.request({ method: 'eth_chainId' })); if (state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null } }
    if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true })
    if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error')))
    await kit.open()
  }

  async function switchNetwork () {
    const provider = state.eip1193; if (!provider) throw new Error('Connect wallet.')
    try {
      await provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
    } catch (error) {
      if (!error || (error.code !== 4902 && !(error.data && error.data.originalError && error.data.originalError.code === 4902))) throw error
      await provider.request({ method: 'wallet_addEthereumChain', params: [{ chainId: chain.id, chainName: chain.name, nativeCurrency: chain.nativeCurrency, rpcUrls: [currentRpc()] }] })
      await provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
    }
    await adopt(provider, state.account ? [state.account] : [], await provider.request({ method: 'eth_chainId' }))
    if (correctChain()) setStatus('')
  }

  function toggleZero () { state.showZero = !state.showZero; render() }

  async function load () {
    const generation = ++state.generation
    state.feesReady = false; state.feeSeconds = 0; seedRegistry(); state.tokens = new Map(); state.prices = new Map(); state.confidence = new Map(); render(); loading(true)
    setStatus('Pools')
    const blocks = measureBlocks()
    await loadTokens(state.pools.flatMap(pool => [pool.token0, pool.token1]), [{ target: address.positionManager, iface: positions, method: 'permit2', fallback: null, decode: value => { state.permit2 = value[0] } }])
    await blocks
    await loadPoolState(state.pools); if (generation !== state.generation) return
    compute(); render()
    setStatus('Liquidity')
    await loadLiquidity(state.pools); if (generation !== state.generation) return
    compute(); render()
    const missing = state.pools.filter(pool => pool.ready && !pool.liquidityReady)
    if (missing.length) { await pause(2000); await loadLiquidity(missing); if (generation !== state.generation) return; missing.forEach(pool => { pool.liquidityFailed = !pool.liquidityReady }); compute(); render() }
    await loadFees(generation)
    if (generation !== state.generation) return
    loading(false)
    if (state.status === 'Pools' || state.status === 'Liquidity' || state.status.indexOf('Fees') === 0) setStatus('')
  }

  function bindUi () {
    byId('arcv4-connect').addEventListener('click', function () { connectInjected().catch(error => setStatus(errText(error), 'error')) })
    byId('arcv4-other-wallet').addEventListener('click', function () { connectOther().catch(error => setStatus(errText(error), 'error')) })
    byId('arcv4-switch').addEventListener('click', function () { switchNetwork().catch(error => setStatus(errText(error), 'error')) })
    byId('arcv4-zero-toggle').addEventListener('click', toggleZero)
    byId('arcv4-custom-add').addEventListener('click', function () { addCustomPool().catch(error => setStatus(errText(error), 'error')) })
    byId('arcv4-custom-pool').addEventListener('keydown', function (event) { if (event.key === 'Enter') addCustomPool().catch(error => setStatus(errText(error), 'error')) })
    byId('arcv4-refresh').addEventListener('click', function () { load().then(() => loadPositions()).catch(fatal) })
    const dialog = byId('arcv4-action-dialog'); if (dialog) dialog.addEventListener('close', function () { if (!state.sending) { state.action = null; state.actionInfo = null } })
  }

  async function start () {
    bindUi()
    const passive = restoreInjected().catch(error => setStatus(errText(error), 'error'))
    await load()
    await passive
    render()
  }

  function fatal (error) { console.error(error); loading(false); setStatus(errText(error), 'error'); render() }

  return { start, fatal }
})()
