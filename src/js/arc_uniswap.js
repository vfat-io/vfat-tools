/* Uniswap v3 on Arc: listed pools, wallet and custom pools, fee logs, pool-graph prices, RPC, and EIP-1193. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { UniswapPage.start().catch(UniswapPage.fatal) })

const UniswapPage = (function () {
  const chain = { id: '0x13b2', number: 5042, name: 'Arc', rpc: 'https://rpc.mainnet.arc.io', nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 18 } }
  const address = {
    usdc: '0x3600000000000000000000000000000000000000',
    factory: '0xf0db7b58379503491d857db50ac9ece64c653918',
    manager: '0x39654a85a4c05127f5fd6ed22caec077a0fb1377',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  const secondsPerYear = 365 * 24 * 60 * 60
  const feeBlocks = 7200
  const logSpan = 10000
  const minConfidence = 10
  const maxPositions = 200
  const minTick = -887272
  const maxTick = 887272
  const swapTopic = ethers.utils.id('Swap(address,address,int256,int256,uint160,uint128,int24)')
  const swapEvent = new ethers.utils.Interface(['event Swap(address indexed sender,address indexed recipient,int256 amount0,int256 amount1,uint160 sqrtPriceX96,uint128 liquidity,int24 tick)'])
  const max128 = ethers.BigNumber.from(2).pow(128).sub(1)
  const erc20 = new ethers.utils.Interface(['function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)'])
  const factory = new ethers.utils.Interface(['function getPool(address,address,uint24) view returns(address)'])
  const v3Pool = new ethers.utils.Interface(['function slot0() view returns(uint160,int24,uint16,uint16,uint16,uint8,bool)', 'function liquidity() view returns(uint128)', 'function token0() view returns(address)', 'function token1() view returns(address)', 'function fee() view returns(uint24)', 'function tickSpacing() view returns(int24)'])
  const manager = new ethers.utils.Interface([
    'function balanceOf(address) view returns(uint256)', 'function tokenOfOwnerByIndex(address,uint256) view returns(uint256)',
    'function positions(uint256) view returns(uint96,address,address,address,uint24,int24,int24,uint128,uint256,uint256,uint128,uint128)',
    'function mint((address token0,address token1,uint24 fee,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline)) payable returns(uint256,uint128,uint256,uint256)',
    'function increaseLiquidity((uint256 tokenId,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns(uint128,uint256,uint256)',
    'function decreaseLiquidity((uint256 tokenId,uint128 liquidity,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns(uint256,uint256)',
    'function collect((uint256 tokenId,address recipient,uint128 amount0Max,uint128 amount1Max)) payable returns(uint256,uint256)',
    'function multicall(bytes[]) payable returns(bytes[])'
  ])
  /* Pool address, token0, token1, fee, tickSpacing: the Uniswap v3 pools listed on vfat.io for Arc. */
  const listedPools = [
    ["0x82916bee18fcef517b26c72d7cb5f13694e1db41", "0x171a4217b86a807a64eb94757db6849fb4bdbaa0", "0x3600000000000000000000000000000000000000", 100, 1], // cirBTC/USDC
    ["0x6a3bacaa6493734c1ac221ebf42cf530a96c1e02", "0x3600000000000000000000000000000000000000", "0xece5ca8bf9220718e5727754026757512212cb3c", 10000, 200], // USDC/ARGUS
    ["0x162df51c504e7b8321e07387932f333d9be16a72", "0x3600000000000000000000000000000000000000", "0xbc43ce8dec648ea298c4275559b81d6261c90b67", 10000, 200], // USDC/TOLLY
    ["0xda9f3d166497ddfddf37c93cacfd8aa39b71e493", "0x2164bb17a2d38c1b5170e987b2c0416df1efc752", "0x3600000000000000000000000000000000000000", 10000, 200], // LONG/USDC
    ["0x40732e01ba7a829dea44f51a10e7c58cd9f37765", "0x3600000000000000000000000000000000000000", "0xeb64987643db71c76b2a2be7e723decc995e5b37", 10000, 200], // USDC/COOL
    ["0x4f1930bf327337208b49fdd4e7b5bdf3bd83029c", "0x2164bb17a2d38c1b5170e987b2c0416df1efc752", "0x2ba0f44bdfc17fba30eda9cdbecb908ca45b043b", 10000, 200], // LONG/CRCL
    ["0x2e8180fa3967caf9abf57bbaeab9ae9063bcd7ba", "0x2ba0f44bdfc17fba30eda9cdbecb908ca45b043b", "0x3600000000000000000000000000000000000000", 10000, 200], // CRCL/USDC
    ["0x64d77c65a5cbd728d891140fd5c30e07d21ee65b", "0x2ba0f44bdfc17fba30eda9cdbecb908ca45b043b", "0x3600000000000000000000000000000000000000", 3000, 60], // CRCL/USDC
    ["0xf89005ccf237a59eeee1521e74b15c7d8d022ab7", "0x1ea1e4f9a9975f1f6e9c0a9f6e8ada7a66e6de52", "0x3600000000000000000000000000000000000000", 10000, 200], // ARCT/USDC
    ["0x0069cb6f70e2f848405f4483f232274c720ce6f9", "0x3600000000000000000000000000000000000000", "0x8bcb94279fc2c984ec34e0c1f2192df8c69ea4f0", 10000, 200], // USDC/Architects
    ["0x9673b01178e483c9ea427a76567ed6383e6ca72f", "0x3600000000000000000000000000000000000000", "0xe6a2476f33ec1566288aa32ec3319a6b77dd1e3b", 10000, 200], // USDC/DUKE
    ["0x7dbcec05f12b14e21a79a0dc15ea9859322a4ab2", "0x0bffa97f774824e9da843699aedd2835cb1b8022", "0x3600000000000000000000000000000000000000", 10000, 200], // ARCASH/USDC
    ["0x6d8db35396b5eb98dee495e32b8cca992682316d", "0x3600000000000000000000000000000000000000", "0xf3715bf5c2de299f08b81180ffb739a8372a175f", 10000, 200], // USDC/ARCANINE
    ["0xc7cf0c94850c912a5045f2a0f2d70ca18085b829", "0x3600000000000000000000000000000000000000", "0x5042419b1f2498959787bc23be1f484ed1306650", 10000, 200], // USDC/ARCH
    ["0x482a249eb473b7de0ca8357b5496ccb7c55dfb72", "0x3600000000000000000000000000000000000000", "0xbe0cad585ea2d13de2f4e36376be755c0afd8b97", 10000, 200], // USDC/ARCBAT
    ["0x1f7f6a5e2ba06e9b3644afa8db8e1c606b5a5abb", "0x3600000000000000000000000000000000000000", "0x41c8a71f630c636294009fa4fb0cc4c3bbe674fe", 10000, 200], // USDC/BEANCAT
    ["0xc0bf5f39ac2010ea38e040d85719b14d390e87c4", "0x3600000000000000000000000000000000000000", "0x6505506540dc99f7366316b10e9cf1a584cbd42a", 3000, 60], // USDC/NVDA
    ["0xe59c7fada87c866cffc9261c4e7cb19848f0f3db", "0x3600000000000000000000000000000000000000", "0x3ead4e80e9e5bc0e01682d7ee74c4881b040d3ea", 10000, 200], // USDC/KAIRO
    ["0x7284a37ce09652233804ec5457f6989f3a560982", "0x3600000000000000000000000000000000000000", "0xc55a4468a3e1c2dfe58dddad0188c71d5dffd740", 10000, 200], // USDC/BANCOR
    ["0xb071ae6fbd78157bb2d9e55bdae37b2b2ca8bdfa", "0x2ba0f44bdfc17fba30eda9cdbecb908ca45b043b", "0x4c2800b81d66f2a4e2da6de00d45b9d64f1ca51e", 10000, 200], // CRCL/PEG
    ["0x01be77f0a364bddafd34521892ea4745ebf9b5a2", "0x3600000000000000000000000000000000000000", "0x4cb8382b9daf7992d3b27d32f7db650c57881daa", 10000, 200], // USDC/BUILDOG
    ["0xa4b5318c06447b64203c98ebb9547c4bae2babcd", "0x19209e55049bc613c5cc8b66b7df7824096e78cf", "0x3600000000000000000000000000000000000000", 10000, 200], // EVE/USDC
    ["0x6fd5f2fb831940dcd61a98c5b3acb7d8c6f3bfc1", "0x3600000000000000000000000000000000000000", "0xbef5f6d51cb62b58e6a8f77868681825c6fe21c1", 500, 10], // USDC/EURC
    ["0x4268ad801dc449b12341add14d61119d470959f0", "0x3600000000000000000000000000000000000000", "0x6505506540dc99f7366316b10e9cf1a584cbd42a", 10000, 200], // USDC/NVDA
    ["0x88f97e21c423261244d6d661fbd569b2bd69539f", "0x3600000000000000000000000000000000000000", "0xbef5f6d51cb62b58e6a8f77868681825c6fe21c1", 3000, 60], // USDC/EURC
    ["0x250c442b80b255707ca01ca12203e3badf3b1db5", "0x3600000000000000000000000000000000000000", "0x41b386e03928c70d635606c210717c19dcfc984d", 10000, 200], // USDC/GME
    ["0xdbfc109cb18bdc2701b23134757ae283db074764", "0x0056ed10ea5a504a2cc9bec93aa5fa8258bba0c7", "0x3600000000000000000000000000000000000000", 10000, 200], // AMC/USDC
    ["0xdbc62a14c40365829fff1130cb2a721ae3daa8d8", "0x3600000000000000000000000000000000000000", "0xe0e0f32b188198dd6bc49f7091fe6b52aef9f20f", 10000, 200], // USDC/SPCX
    ["0x8ae2629c4363c48f51e99a0fe6ac18c63764ecbe", "0x3600000000000000000000000000000000000000", "0xac7896a01a4efd2a647fb1c94a6f1ffef8901488", 10000, 200], // USDC/AAPL
    ["0x7881e4c00b11f16ab1532b806be45c1fd7466e19", "0x07704b06981ea962b87296362a1281484d160000", "0x3600000000000000000000000000000000000000", 10000, 200], // ARCAT/USDC
    ["0xecd988913031a292bcf0e4e07ccd5815c8969a48", "0x171a4217b86a807a64eb94757db6849fb4bdbaa0", "0x3600000000000000000000000000000000000000", 3000, 60], // cirBTC/USDC
    ["0xc4bb8f51e1732e80d16929180e2a9387e8a0c4e1", "0x1d1bca89b79a2d6a7757e86f8a39ae0f51bb652b", "0x3600000000000000000000000000000000000000", 10000, 200], // bGLD/USDC
    ["0x7a5de3edaab5780dbcc9a84a3dd9a25a5f4b5d8c", "0x3600000000000000000000000000000000000000", "0xd02d2b38d9ccf08044f0a493350a2339fe8d708b", 10000, 200], // USDC/WETH
    ["0x2522eefe0d34d22a21f8db7952db81d0095eea8b", "0xbc43ce8dec648ea298c4275559b81d6261c90b67", "0xece5ca8bf9220718e5727754026757512212cb3c", 10000, 200], // TOLLY/ARGUS
    ["0xe8804652bfbd03a7c1d378ec85160c36c0f7aada", "0x3600000000000000000000000000000000000000", "0x58e3e461d32ef2ea48270bd8d9ac80c3062428f5", 10000, 200], // USDC/SNAP
    ["0xaeb5681789318bb84408b534cd9324d0b0b70998", "0x3600000000000000000000000000000000000000", "0x4d1efa7f5629f89fbdd7950b5ef73403a350ad59", 10000, 200], // USDC/TSLA
    ["0x505bffb2c1730e8cbd38a5672d47e030e00b58a1", "0x3600000000000000000000000000000000000000", "0x3b26421eb41f42119b021eadfbe3ff687ff7ebd8", 10000, 200], // USDC/HIMS
    ["0x46ea4646de574a33b5428ce8316d65aaaafacdce", "0x3600000000000000000000000000000000000000", "0xece5ca8bf9220718e5727754026757512212cb3c", 100, 1], // USDC/ARGUS
    ["0xd6e1734af9b7e715c6e6d03254d5860f4d7ca3d7", "0x0c3282e55885bb1e8341f8c36da7b16e4f559993", "0x3600000000000000000000000000000000000000", 10000, 200], // SPY/USDC
  ]
  const customPoolsKey = 'arc-uniswap-custom-pools'
  const multicall = new ethers.utils.Interface(['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)'])
  const state = {
    pools: [], poolMap: new Map(), tokens: new Map(), prices: new Map(), confidence: new Map(),
    head: null, feeFrom: null, feeSeconds: 3600, feesReady: false, showZero: false,
    eip1193: null, account: null, walletChain: null, boundProvider: null, reownUnsubscribe: null,
    action: null, actionInfo: null, positions: [], sending: false, status: '', spinner: null, active: 0, waiting: [], generation: 0
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
  const priceText = value => { if (!Number.isFinite(value) || value <= 0) return '—'; if (value >= 1e15) return '∞'; if (value >= 1e6) return compact(value); return String(Number(value.toPrecision(5))) }
  const amountNum = (value, decimals) => { try { const number = Number(ethers.utils.formatUnits(value, decimals)); return Number.isFinite(number) ? number : NaN } catch (_) { return NaN } }
  const formatAmount = (value, decimals) => { try { const parts = ethers.utils.formatUnits(value, decimals).split('.'); const tail = (parts[1] || '').slice(0, 5).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const floatAmount = (raw, decimals) => { if (!Number.isFinite(raw) || raw <= 0 || decimals === null) return ''; const value = raw / (10 ** decimals); return String(Number(value.toPrecision(8))) }
  const bigFloor = value => ethers.BigNumber.from(BigInt(Math.floor(Math.max(0, value))).toString())
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'arcuni-action', disabled: disabled || state.sending }); node.addEventListener('click', function () { Promise.resolve(fn()).catch(error => setStatus(errText(error), 'error')) }); return node }
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

  function setStatus (text, kind) { state.status = text || ''; const node = byId('arcuni-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (active) { const box = byId('arcuni-loading'); const spin = byId('arcuni-loading-spin'); if (!box) return; box.hidden = !active; if (active && !state.spinner) { let index = 0; state.spinner = window.setInterval(function () { spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) } if (!active && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }
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
    for (let attempt = 0; attempt < 7; attempt += 1) {
      if (method === 'eth_getLogs') await logsTurn()
      await slot()
      let limitedRate = false
      try {
        const controller = new window.AbortController(); const timer = window.setTimeout(function () { controller.abort() }, timeout || 25000)
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
      await pause((limitedRate ? 600 : 300) * (2 ** attempt))
    }
    throw lastError
  }

  async function batch (calls) {
    if (!calls.length) return []
    const groups = []; for (let i = 0; i < calls.length; i += 300) groups.push(calls.slice(i, i + 300))
    const decode = function (call, raw) { try { const result = call.iface.decodeFunctionResult(call.method, raw); return call.decode ? call.decode(result) : result.length === 1 ? result[0] : result } catch (_) { return call.fallback } }
    async function execute (group) {
      const encoded = group.map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }))
      try {
        const raw = await rpc('eth_call', [{ to: address.multicall, data: multicall.encodeFunctionData('aggregate3', [encoded]) }, 'latest'])
        const result = multicall.decodeFunctionResult('aggregate3', raw)[0]
        return result.map((item, index) => item.success ? decode(group[index], item.returnData) : group[index].fallback)
      } catch (error) {
        if (!error.rpc) return group.map(call => call.fallback)
        if (group.length > 8) { const middle = Math.ceil(group.length / 2); const halves = await Promise.all([execute(group.slice(0, middle)), execute(group.slice(middle))]); return halves[0].concat(halves[1]) }
        return limited(group, 2, async function (call, index) { try { return decode(call, await rpc('eth_call', [{ to: call.target, data: encoded[index].callData }, 'latest'])) } catch (_) { return call.fallback } })
      }
    }
    const values = await limited(groups, 3, execute)
    return [].concat(...values)
  }

  /* eth_getLogs is capped by block span and result count; split on either. */
  async function getLogs (filter, from, to) {
    try {
      const logs = await rpc('eth_getLogs', [{ address: filter.address, topics: filter.topics, fromBlock: ethers.utils.hexValue(from), toBlock: ethers.utils.hexValue(to) }], 30000)
      return Array.isArray(logs) ? logs : []
    } catch (error) {
      if (!error.rpc || to <= from) throw error
      const hint = /retry with the range (\d+)-(\d+)/.exec(error.message || '')
      const middle = hint && Number(hint[2]) >= from && Number(hint[2]) < to ? Number(hint[2]) : Math.floor((from + to) / 2)
      const first = await getLogs(filter, from, middle)
      return first.concat(await getLogs(filter, middle + 1, to))
    }
  }

  function addPool (value) {
    const key = lower(value.address); if (state.poolMap.has(key)) return state.poolMap.get(key)
    const pool = Object.assign({ ready: false, fee0: ethers.constants.Zero, fee1: ethers.constants.Zero, rawFeeLogs: [], feeCovered: false }, value, { address: ethers.utils.getAddress(value.address) })
    state.poolMap.set(key, pool); state.pools.push(pool); return pool
  }

  function seedPools () {
    listedPools.forEach(row => addPool({ address: row[0], token0: row[1], token1: row[2], fee: row[3], tickSpacing: row[4] }))
  }

  function storedCustomPools () {
    try { const value = JSON.parse(window.localStorage.getItem(customPoolsKey) || '[]'); return Array.isArray(value) ? value.filter(item => ethers.utils.isAddress(item)) : [] } catch (_) { return [] }
  }
  function storeCustomPools () {
    try { window.localStorage.setItem(customPoolsKey, JSON.stringify(state.pools.filter(pool => pool.custom).map(pool => pool.address))) } catch (_) {}
  }

  /* A pool outside the list is accepted only if the Uniswap v3 factory maps its tokens and fee back to it. */
  async function addPoolsByAddress (values, flags) {
    const list = [...new Set(values.map(lower))].filter(value => ethers.utils.isAddress(value))
    const known = list.map(value => state.poolMap.get(value)).filter(Boolean)
    known.forEach(pool => Object.assign(pool, flags))
    const fresh = list.filter(value => !state.poolMap.has(value))
    if (!fresh.length) return known
    const calls = []; fresh.forEach(value => ['token0', 'token1', 'fee', 'tickSpacing'].forEach(method => calls.push({ target: value, iface: v3Pool, method, fallback: null })))
    const values0 = await batch(calls)
    const candidates = fresh.map((value, index) => { const row = values0.slice(index * 4, index * 4 + 4); return row.every(item => item !== null) ? { address: value, token0: row[0], token1: row[1], fee: Number(row[2]), tickSpacing: Number(row[3]) } : null }).filter(Boolean)
    const checks = await batch(candidates.map(row => ({ target: address.factory, iface: factory, method: 'getPool', args: [row.token0, row.token1, row.fee], fallback: null })))
    const added = candidates.filter((row, index) => checks[index] && lower(checks[index]) === lower(row.address)).map(row => addPool(Object.assign(row, flags)))
    if (added.length) { await hydratePools(added); if (state.swapLogsKey) await loadFees(added) }
    return known.concat(added)
  }

  async function addCustomPool () {
    const input = byId('arcuni-custom-pool'); const value = input ? input.value.trim() : ''
    if (!ethers.utils.isAddress(value)) throw new Error('Enter a pool address.')
    setStatus('Checking pool…')
    const added = await addPoolsByAddress([value], { custom: true })
    if (!added.length) throw new Error('Not a Uniswap v3 pool on Arc.')
    storeCustomPools(); if (input) input.value = ''
    setStatus(''); compute(); render()
  }
  function removeCustomPool (pool) {
    pool.custom = false; storeCustomPools()
    if (!pool.wallet && !listedPools.some(row => lower(row[0]) === lower(pool.address))) { state.poolMap.delete(lower(pool.address)); state.pools = state.pools.filter(item => item !== pool) }
    render()
  }

  async function loadTokens (values) {
    const list = [...new Set(values.map(lower))].filter(value => value && !state.tokens.has(value))
    if (!list.length) return
    const calls = []; list.forEach(value => calls.push({ target: value, iface: erc20, method: 'symbol', fallback: null }, { target: value, iface: erc20, method: 'decimals', fallback: null }))
    const results = await batch(calls)
    list.forEach(function (value, index) { const raw = results[index * 2]; const symbol = raw === null ? short(value) : String(raw).replace(/[\r\n\t]/g, ' ').slice(0, 18); const decimals = results[index * 2 + 1]; state.tokens.set(value, { address: ethers.utils.getAddress(value), symbol, decimals: decimals === null ? null : Number(decimals) }) })
  }

  async function hydratePools (pools) {
    const groups = []; for (let start = 0; start < pools.length; start += 100) groups.push(pools.slice(start, start + 100))
    await limited(groups, 3, async function (group) {
      const calls = []
      group.forEach(pool => calls.push(
        { target: pool.address, iface: v3Pool, method: 'slot0', fallback: null, decode: value => value },
        { target: pool.token0, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null },
        { target: pool.token1, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null }
      ))
      const values = await batch(calls); let cursor = 0
      group.forEach(function (pool) { pool.slot0 = values[cursor++]; pool.reserve0 = values[cursor++]; pool.reserve1 = values[cursor++]; pool.ready = Boolean(pool.slot0 && pool.reserve0 !== null && pool.reserve1 !== null) })
      await loadTokens([].concat(...group.map(pool => [pool.token0, pool.token1])))
      if (state.feesReady) group.forEach(calculatePoolFees)
      compute(); render()
    })
  }

  function poolAmounts (pool) {
    const t0 = token(pool.token0); const t1 = token(pool.token1); if (t0.decimals === null || t1.decimals === null) return null
    return [amountNum(pool.reserve0, t0.decimals), amountNum(pool.reserve1, t1.decimals)]
  }
  function sqrtRaw (pool) { return pool.slot0 ? Number(pool.slot0[0].toString()) / (2 ** 96) : NaN }
  function poolSpot (pool) { const t0 = token(pool.token0); const t1 = token(pool.token1); const sqrt = sqrtRaw(pool); const value = sqrt * sqrt * (10 ** (t0.decimals - t1.decimals)); return Number.isFinite(value) && value > 0 ? value : NaN }

  function calculatePoolFees (pool) {
    pool.fee0 = ethers.constants.Zero; pool.fee1 = ethers.constants.Zero
    const protocol = pool.slot0 ? Number(pool.slot0[5]) : 0; const share0 = protocol % 16 ? 1 - 1 / (protocol % 16) : 1; const share1 = protocol >> 4 ? 1 - 1 / (protocol >> 4) : 1
    const scalar0 = Math.round(pool.fee / 1000000 * share0 * 1e9); const scalar1 = Math.round(pool.fee / 1000000 * share1 * 1e9)
    pool.rawFeeLogs.forEach(function (log) {
      try {
        const value = swapEvent.parseLog(log).args
        if (value.amount0.gt(0)) pool.fee0 = pool.fee0.add(value.amount0.mul(scalar0).div(1e9)); if (value.amount1.gt(0)) pool.fee1 = pool.fee1.add(value.amount1.mul(scalar1).div(1e9))
      } catch (_) {}
    })
  }

  function compute () {
    const anchor = lower(address.usdc)
    state.prices = new Map([[anchor, 1]]); state.confidence = new Map([[anchor, Number.MAX_VALUE]])
    state.pools.forEach(function (pool) { if (pool.ready) { pool.amounts = poolAmounts(pool); pool.spot = pool.amounts ? poolSpot(pool) : NaN } })
    for (let pass = 0; pass < 16; pass += 1) {
      let changed = false
      state.pools.forEach(function (pool) {
        if (!pool.ready || !finite(pool.spot) || !pool.amounts) return
        const key0 = lower(pool.token0); const key1 = lower(pool.token1); const price0 = state.prices.get(key0); const price1 = state.prices.get(key1); const confidence0 = state.confidence.get(key0) || 0; const confidence1 = state.confidence.get(key1) || 0
        if (finite(price0) && pool.amounts[0] > 0) { const candidate = price0 / pool.spot; const confidence = Math.min(confidence0, pool.amounts[0] * price0 * 2); if (candidate > 1e-18 && candidate < 1e12 && confidence >= minConfidence && confidence > confidence1) { state.prices.set(key1, candidate); state.confidence.set(key1, confidence); changed = true } }
        if (finite(price1) && pool.amounts[1] > 0) { const candidate = price1 * pool.spot; const confidence = Math.min(confidence1, pool.amounts[1] * price1 * 2); if (candidate > 1e-18 && candidate < 1e12 && confidence >= minConfidence && confidence > confidence0) { state.prices.set(key0, candidate); state.confidence.set(key0, confidence); changed = true } }
      })
      if (!changed) break
    }
    state.pools.forEach(function (pool) {
      if (!pool.ready || !pool.amounts) { pool.tvl = NaN; pool.apr = NaN; pool.feeUsd = NaN; return }
      const key0 = lower(pool.token0); const key1 = lower(pool.token1); const price0 = state.prices.get(key0); const price1 = state.prices.get(key1)
      const side = (amount, price, key) => amount === 0 ? 0 : finite(price) ? Math.min(amount * price, state.confidence.get(key)) : NaN
      pool.tvl = side(pool.amounts[0], price0, key0) + side(pool.amounts[1], price1, key1)
      const fee0 = amountNum(pool.fee0, token(pool.token0).decimals); const fee1 = amountNum(pool.fee1, token(pool.token1).decimals)
      pool.feeUsd = !pool.feeCovered || (fee0 > 0 && !finite(price0)) || (fee1 > 0 && !finite(price1)) ? NaN : (fee0 > 0 ? fee0 * price0 : 0) + (fee1 > 0 ? fee1 * price1 : 0)
      pool.apr = finite(pool.feeUsd) && pool.feeUsd > 0 && finite(pool.tvl) && pool.tvl > 0 ? pool.feeUsd * secondsPerYear / state.feeSeconds / pool.tvl * 100 : pool.feeUsd === 0 ? 0 : NaN
    })
  }

  async function feeWindow () {
    state.feeFrom = Math.max(0, state.head - feeBlocks)
    const blocks = await Promise.all([rpc('eth_getBlockByNumber', [ethers.utils.hexValue(state.head), false]), rpc('eth_getBlockByNumber', [ethers.utils.hexValue(state.feeFrom), false])])
    if (!blocks[0] || !blocks[1]) throw new Error('Fee window unavailable.')
    state.feeSeconds = Math.max(1, Number(blocks[0].timestamp) - Number(blocks[1].timestamp))
  }

  /* The public RPC rejects log filters with more than 20 addresses, so read every Swap in the window and keep the known pools. */
  async function loadFees (pools) {
    const list = pools.filter(pool => !pool.feeCovered)
    if (!list.length) return 0
    const ranges = []; for (let from = state.feeFrom + 1; from <= state.head; from += logSpan) ranges.push([from, Math.min(state.head, from + logSpan - 1)])
    let failures = 0
    try {
      const key = state.feeFrom + ':' + state.head
      if (state.swapLogsKey !== key) { state.swapLogs = [].concat(...await limited(ranges, 1, range => getLogs({ topics: [swapTopic] }, range[0], range[1]))); state.swapLogsKey = key }
      const logs = state.swapLogs
      const wanted = new Map(list.map(pool => [lower(pool.address), pool]))
      list.forEach(pool => { pool.rawFeeLogs = []; pool.swapCount = 0 })
      logs.forEach(log => { const pool = wanted.get(lower(log.address)); if (pool) { pool.rawFeeLogs.push(log); pool.swapCount += 1 } })
      list.forEach(pool => { pool.feeCovered = true; pool.feeFailed = false; calculatePoolFees(pool) })
    } catch (_) { failures = list.length; list.forEach(pool => { pool.feeFailed = true }) }
    state.feesReady = true; compute(); render()
    return failures
  }

  function symbolOf (value) { const info = token(value); const anchor = state.tokens.get(lower(address.usdc)); return anchor && info.symbol === anchor.symbol && lower(value) !== lower(address.usdc) ? info.symbol + ' ' + short(info.address) : info.symbol }
  function poolName (pool) { return symbolOf(pool.token0) + ' / ' + symbolOf(pool.token1) }
  function feeTier (pool) { return (pool.fee / 10000).toFixed(pool.fee % 100 ? 3 : 2) + '%' }
  function addHeader (table, labels) { const head = e('thead'); const row = e('tr'); labels.forEach(label => row.appendChild(e('th', { text: label }))); head.appendChild(row); table.appendChild(head) }
  function addCell (row, text, className) { row.appendChild(e('td', { text, className })) }
  function windowLabel () { const hours = state.feeSeconds / 3600; return hours >= 0.95 ? Math.round(hours) + 'h' : Math.max(1, Math.round(state.feeSeconds / 60)) + 'm' }
  function visiblePools () { return state.pools.filter(pool => pool.ready && (pool.custom || pool.wallet || state.showZero || !state.feesReady || pool.feeFailed || (finite(pool.apr) && pool.apr > 0))) }

  function renderPools () {
    const host = byId('arcuni-pools'); if (!host) return; host.textContent = ''
    let visible = visiblePools()
    visible.sort(function (a, b) { if (Boolean(a.custom) !== Boolean(b.custom)) return a.custom ? -1 : 1; if (!state.feesReady || state.showZero) return (b.tvl || 0) - (a.tvl || 0) || (b.apr || 0) - (a.apr || 0); return (b.feeUsd || 0) - (a.feeUsd || 0) || (b.apr || 0) - (a.apr || 0) })
    if (state.feesReady && !visible.length) { const empty = e('p', { className: 'arcuni-summary', text: 'No live Uniswap v3 pools. ' }); empty.appendChild(button('show 0 APR pools', toggleZero)); host.appendChild(empty); return }
    const label = windowLabel()
    const table = e('table', { className: 'arcuni-table' }); addHeader(table, ['Pool', 'TVL', 'Fee APR (' + label + ')', 'Fees / ' + label, 'Fee tier', 'Actions']); const body = e('tbody')
    visible.forEach(function (pool) {
      const row = e('tr'); const name = e('td'); append(name, e('span', { className: 'arcuni-name', text: poolName(pool) }), e('span', { className: 'arcuni-sub', text: short(pool.address) })); row.appendChild(name)
      addCell(row, usd(pool.tvl), finite(pool.tvl) ? '' : 'arcuni-unpriced'); addCell(row, pool.feeCovered ? percent(pool.apr) : '…', finite(pool.apr) ? '' : 'arcuni-unpriced'); addCell(row, pool.feeCovered ? usd(pool.feeUsd) : '…'); addCell(row, feeTier(pool))
      const actions = e('td', { className: 'arcuni-actions' }); actions.appendChild(button('add', function () { return openMint(pool) }, !pool.ready)); if (pool.custom) actions.appendChild(button('remove pool', function () { removeCustomPool(pool) })); row.appendChild(actions); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function renderSummary () {
    const node = byId('arcuni-summary'); if (!node) return
    const visible = visiblePools(); const priced = visible.filter(pool => finite(pool.tvl)); const tvl = priced.reduce((sum, pool) => sum + pool.tvl, 0)
    node.textContent = visible.length ? 'Uniswap v3 TVL ' + usd(tvl) + ' · ' + priced.length + '/' + visible.length + ' priced' : 'Uniswap v3 —'
  }

  function renderWallet () {
    const node = byId('arcuni-wallet-status'); if (node) node.textContent = state.account ? short(state.account) + (correctChain() ? '' : ' · wrong chain') + ' ' : ''
    const switcher = byId('arcuni-switch'); if (switcher) switcher.hidden = !state.account || correctChain()
  }

  function tickPrice (pool, tick) { const t0 = token(pool.token0); const t1 = token(pool.token1); return Math.pow(1.0001, tick) * (10 ** (t0.decimals - t1.decimals)) }
  function inverted (pool) { return lower(pool.token0) === lower(address.usdc) }
  function quoteLabel (pool) { const t0 = token(pool.token0).symbol; const t1 = token(pool.token1).symbol; return inverted(pool) ? t0 + ' per ' + t1 : t1 + ' per ' + t0 }
  function shownPrice (pool, raw) { return inverted(pool) ? 1 / raw : raw }

  function positionAmounts (liquidity, sqrtP, tickLower, tickUpper) {
    const sa = Math.pow(1.0001, tickLower / 2); const sb = Math.pow(1.0001, tickUpper / 2)
    if (sqrtP <= sa) return [liquidity * (sb - sa) / (sa * sb), 0]
    if (sqrtP < sb) return [liquidity * (sb - sqrtP) / (sqrtP * sb), liquidity * (sqrtP - sa)]
    return [0, liquidity * (sb - sa)]
  }
  function liquidityFor (sqrtP, tickLower, tickUpper, raw0, raw1) {
    const sa = Math.pow(1.0001, tickLower / 2); const sb = Math.pow(1.0001, tickUpper / 2)
    const from0 = sp => raw0 * sp * sb / (sb - sp); const from1 = sp => raw1 / (sp - sa)
    if (sqrtP <= sa) return from0(sa)
    if (sqrtP < sb) return Math.min(raw0 > 0 ? from0(sqrtP) : Infinity, raw1 > 0 ? from1(sqrtP) : Infinity)
    return raw1 / (sb - sa)
  }

  function renderPositions () {
    const host = byId('arcuni-positions'); if (!host) return; host.textContent = ''; host.hidden = !state.account || !state.positions.length; if (host.hidden) return
    const table = e('table', { className: 'arcuni-table' }); addHeader(table, ['Position', 'Value', 'Range', 'Unclaimed', 'Fee tier', 'Actions']); const body = e('tbody')
    state.positions.forEach(function (position) {
      const pool = position.pool; const t0 = token(pool.token0); const t1 = token(pool.token1); const price0 = state.prices.get(lower(pool.token0)); const price1 = state.prices.get(lower(pool.token1))
      const raw = pool.slot0 ? positionAmounts(Number(position.liquidity.toString()), sqrtRaw(pool), position.tickLower, position.tickUpper) : [NaN, NaN]
      const amount0 = raw[0] / (10 ** t0.decimals); const amount1 = raw[1] / (10 ** t1.decimals)
      const value = finite(amount0) && finite(amount1) && (amount0 === 0 || finite(price0)) && (amount1 === 0 || finite(price1)) ? (amount0 ? amount0 * price0 : 0) + (amount1 ? amount1 * price1 : 0) : NaN
      const row = e('tr'); const name = e('td'); append(name, e('span', { className: 'arcuni-name', text: poolName(pool) }), e('span', { className: 'arcuni-sub', text: '#' + position.id })); row.appendChild(name)
      addCell(row, usd(value) + '\n' + compact(amount0) + ' ' + t0.symbol + ' · ' + compact(amount1) + ' ' + t1.symbol)
      const a = shownPrice(pool, tickPrice(pool, position.tickLower)); const b = shownPrice(pool, tickPrice(pool, position.tickUpper)); const tick = pool.slot0 ? Number(pool.slot0[1]) : null
      addCell(row, priceText(Math.min(a, b)) + ' – ' + priceText(Math.max(a, b)) + '\n' + quoteLabel(pool) + '\n' + (tick === null ? '—' : tick >= position.tickLower && tick < position.tickUpper ? 'in range' : 'out of range'))
      const owed0 = position.unclaimed ? amountNum(position.unclaimed[0], t0.decimals) : NaN; const owed1 = position.unclaimed ? amountNum(position.unclaimed[1], t1.decimals) : NaN
      const owedUsd = finite(owed0) && finite(owed1) && (owed0 === 0 || finite(price0)) && (owed1 === 0 || finite(price1)) ? (owed0 ? owed0 * price0 : 0) + (owed1 ? owed1 * price1 : 0) : NaN
      addCell(row, position.unclaimed ? usd(owedUsd) + '\n' + compact(owed0) + ' ' + t0.symbol + ' · ' + compact(owed1) + ' ' + t1.symbol : '—')
      addCell(row, feeTier(pool))
      const actions = e('td', { className: 'arcuni-actions' }); actions.appendChild(button('add', function () { return openPosition(position, 'increase') })); actions.appendChild(button('remove', function () { return openPosition(position, 'decrease') }, position.liquidity.isZero())); actions.appendChild(button('collect', function () { return collectPosition(position) })); row.appendChild(actions); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function render () { renderWallet(); renderSummary(); renderPools(); renderPositions(); const toggle = byId('arcuni-zero-toggle'); if (toggle) toggle.textContent = state.showZero ? '[ hide 0 APR pools ]' : '[ show 0 APR pools ]' }
  function toggleZero () { state.showZero = !state.showZero; render() }

  function requireWallet () { if (!state.account || !state.eip1193) throw new Error('Connect wallet.'); if (!correctChain()) throw new Error('Switch to Arc.') }
  function deadline () { return Math.floor(Date.now() / 1000) + 1200 }
  function parseAmount (value, info, label, allowZero) { if (!info || info.decimals === null) throw new Error(label + ' metadata unavailable.'); try { const amount = ethers.utils.parseUnits(String(value || '0').trim() || '0', info.decimals); if (amount.lt(0) || (!allowZero && amount.isZero())) throw new Error(); return amount } catch (_) { throw new Error('Enter ' + label + '.') } }
  function showDialog () { const dialog = byId('arcuni-action-dialog'); if (dialog && !dialog.open) dialog.showModal() }
  function dialogField (host, label, key, onInput) { const row = e('div', { className: 'arcuni-input' }); const input = e('input'); input.type = 'text'; input.inputMode = 'decimal'; input.autocomplete = 'off'; input.value = state.action[key] || ''; input.dataset.key = key; input.addEventListener('input', function () { if (!state.action) return; state.action[key] = input.value; if (onInput) onInput(key) }); append(row, e('label', { text: label }), input); host.appendChild(row); return input }
  function dialogButtonRow (host, buttons) { const row = e('div', { className: 'arcuni-dialog-actions' }); buttons.forEach(item => row.appendChild(button(item[0], item[1], item[2]))); host.appendChild(row) }
  function setField (key, value) { state.action[key] = value; const input = document.querySelector('#arcuni-action-content input[data-key="' + key + '"]'); if (input) input.value = value }

  function actionRange () {
    const action = state.action; const pool = action.pool
    if (action.position) return [action.position.tickLower, action.position.tickUpper]
    const a = Number(action.priceLow); const b = Number(action.priceHigh); if (!(a > 0) || !(b > 0) || a >= b) return null
    const toTick = shown => { const raw = inverted(pool) ? 1 / shown : shown; return Math.log(raw / (10 ** (token(pool.token0).decimals - token(pool.token1).decimals))) / Math.log(1.0001) }
    const ticks = [toTick(a), toTick(b)]; const s = pool.tickSpacing
    let low = Math.floor(Math.min(...ticks) / s) * s; let high = Math.ceil(Math.max(...ticks) / s) * s
    low = Math.max(low, Math.ceil(minTick / s) * s); high = Math.min(high, Math.floor(maxTick / s) * s); if (low >= high) high = low + s
    return [low, high]
  }

  function autofill (key) {
    const action = state.action; const pool = action.pool; const range = actionRange(); if (!range || !pool.slot0) return
    const t0 = token(pool.token0); const t1 = token(pool.token1); const sqrtP = sqrtRaw(pool)
    if (key === 'amount0' || key === 'amount1' || key === 'priceLow' || key === 'priceHigh') {
      const source = key === 'amount1' ? 'amount1' : 'amount0'; const value = Number(action[source]); if (!(value > 0)) return
      const raw = source === 'amount0' ? value * (10 ** t0.decimals) : value * (10 ** t1.decimals)
      const liquidity = source === 'amount0' ? liquidityFor(sqrtP, range[0], range[1], raw, 0) : liquidityFor(sqrtP, range[0], range[1], 0, raw)
      if (!Number.isFinite(liquidity) || liquidity <= 0) { setField(source === 'amount0' ? 'amount1' : 'amount0', source === 'amount0' ? (sqrtP >= Math.pow(1.0001, range[1] / 2) ? '' : '0') : (sqrtP <= Math.pow(1.0001, range[0] / 2) ? '' : '0')); return }
      const amounts = positionAmounts(liquidity, sqrtP, range[0], range[1])
      if (source === 'amount0') setField('amount1', floatAmount(amounts[1], t1.decimals) || '0'); else setField('amount0', floatAmount(amounts[0], t0.decimals) || '0')
    }
    renderRangeNote()
  }

  function renderRangeNote () {
    const node = byId('arcuni-range-note'); if (!node || !state.action) return; const pool = state.action.pool; const range = actionRange()
    if (!range) { node.textContent = '—'; return }
    const a = shownPrice(pool, tickPrice(pool, range[0])); const b = shownPrice(pool, tickPrice(pool, range[1]))
    node.textContent = 'Range ' + priceText(Math.min(a, b)) + ' – ' + priceText(Math.max(a, b)) + ' · ticks ' + range[0] + ' / ' + range[1]
  }

  async function loadActionInfo () {
    if (!state.action || !state.account || !correctChain()) { state.actionInfo = null; renderAction(); return }
    const action = state.action; const pool = action.pool
    const values = await batch([
      { target: pool.token0, iface: erc20, method: 'balanceOf', args: [state.account], fallback: null }, { target: pool.token1, iface: erc20, method: 'balanceOf', args: [state.account], fallback: null },
      { target: pool.token0, iface: erc20, method: 'allowance', args: [state.account, address.manager], fallback: null }, { target: pool.token1, iface: erc20, method: 'allowance', args: [state.account, address.manager], fallback: null }
    ])
    if (state.action !== action) return
    state.actionInfo = { balance0: values[0], balance1: values[1], allowance0: values[2], allowance1: values[3] }; renderBalances()
  }

  async function openMint (pool) {
    requireWallet()
    const current = shownPrice(pool, poolSpot(pool))
    state.action = { mode: 'mint', pool, amount0: '', amount1: '', slippage: '1', priceLow: finite(current) ? String(Number((current * 0.9).toPrecision(6))) : '', priceHigh: finite(current) ? String(Number((current * 1.1).toPrecision(6))) : '' }
    state.actionInfo = null; renderAction(); showDialog(); await loadActionInfo()
  }

  async function openPosition (position, mode) {
    requireWallet(); state.action = { mode, pool: position.pool, position, amount0: '', amount1: '', slippage: '1', percent: '100' }; state.actionInfo = null; renderAction(); showDialog(); await loadActionInfo()
  }

  function renderBalances () {
    const node = byId('arcuni-balances'); if (!node || !state.action) return; const pool = state.action.pool; const info0 = token(pool.token0); const info1 = token(pool.token1)
    node.textContent = state.actionInfo ? 'Wallet ' + formatAmount(state.actionInfo.balance0 || 0, info0.decimals) + ' ' + info0.symbol + ' · ' + formatAmount(state.actionInfo.balance1 || 0, info1.decimals) + ' ' + info1.symbol : 'Wallet …'
  }

  function renderAction () {
    const host = byId('arcuni-action-content'); if (!host) return; host.textContent = ''; const action = state.action; if (!action) return
    const pool = action.pool; const info0 = token(pool.token0); const info1 = token(pool.token1)
    host.appendChild(e('h2', { id: 'arcuni-action-title', text: poolName(pool) + ' · ' + feeTier(pool) + (action.position ? ' · #' + action.position.id : '') }))
    host.appendChild(e('p', { id: 'arcuni-balances' })); renderBalances()
    const spot = poolSpot(pool); host.appendChild(e('p', { text: 'Price ' + priceText(shownPrice(pool, spot)) + ' ' + quoteLabel(pool) }))
    if (action.mode === 'decrease') {
      dialogField(host, 'Remove %', 'percent'); dialogField(host, 'Slippage %', 'slippage')
      dialogButtonRow(host, [['remove', submitAction]]); return
    }
    if (action.mode === 'mint') { dialogField(host, 'Min price', 'priceLow', autofill); dialogField(host, 'Max price', 'priceHigh', autofill) }
    host.appendChild(e('p', { id: 'arcuni-range-note', className: 'arcuni-note' })); renderRangeNote()
    dialogField(host, info0.symbol, 'amount0', autofill); dialogField(host, info1.symbol, 'amount1', autofill); dialogField(host, 'Slippage %', 'slippage')
    dialogButtonRow(host, [['approve ' + info0.symbol, function () { return approveFor(0) }], ['approve ' + info1.symbol, function () { return approveFor(1) }], ['add', submitAction]])
  }

  async function preflight (tx) { try { return await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data, value: '0x0' }, 'latest'] }) } catch (error) { throw new Error('Transaction would revert: ' + errText(error)) } }
  async function waitReceipt (hash) {
    const started = Date.now()
    while (Date.now() - started < 180000) {
      let receipt = null; try { receipt = await rpc('eth_getTransactionReceipt', [hash]) } catch (_) {}
      if (receipt && receipt.blockNumber) return receipt
      await pause(1500)
    }
    throw new Error(hash + ' · not mined yet')
  }
  async function send (tx, approvalOnly) {
    await preflight(tx); setStatus('Confirm in wallet…')
    const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data, value: '0x0' }] })
    setStatus(hash + ' · pending'); const receipt = await waitReceipt(hash)
    if (Number(receipt.status) !== 1) throw new Error('Transaction reverted.')
    setStatus('Confirmed.', 'success'); if (approvalOnly) await loadActionInfo(); else await refreshAfterAction(state.action ? state.action.pool : null)
  }

  async function approveFor (side) {
    requireWallet(); const action = state.action; const pool = action.pool; const tokenAddress = side ? pool.token1 : pool.token0; const info = token(tokenAddress)
    const amount = parseAmount(side ? action.amount1 : action.amount0, info, info.symbol + ' amount')
    if (!state.actionInfo) await loadActionInfo()
    const allowance = state.actionInfo && (side ? state.actionInfo.allowance1 : state.actionInfo.allowance0)
    if (allowance && allowance.gte(amount)) { setStatus(info.symbol + ' approved.', 'success'); return }
    state.sending = true; renderAction()
    try { await send({ to: tokenAddress, data: erc20.encodeFunctionData('approve', [address.manager, amount]) }, true) } finally { state.sending = false; renderAction() }
  }

  function slippageFactor () { const value = Number(state.action.slippage); if (!Number.isFinite(value) || value < 0 || value > 100) throw new Error('Enter slippage.'); return 1 - value / 100 }
  function confirmZero (min0, min1, expected0, expected1) { if (((expected0 > 0 && min0.isZero()) || (expected1 > 0 && min1.isZero())) && !window.confirm('A zero minimum accepts any execution price. Continue?')) throw new Error('Cancelled.') }

  function buildAction () {
    requireWallet(); const action = state.action; const pool = action.pool; const info0 = token(pool.token0); const info1 = token(pool.token1); const factor = slippageFactor(); const sqrtP = sqrtRaw(pool)
    if (!pool.slot0) throw new Error('Pool state unavailable.')
    if (action.mode === 'decrease') {
      const pct = Number(action.percent); if (!(pct > 0) || pct > 100) throw new Error('Enter remove %.')
      const liquidity = pct === 100 ? action.position.liquidity : action.position.liquidity.mul(Math.round(pct * 100)).div(10000); if (liquidity.lte(0)) throw new Error('Enter remove %.')
      const expected = positionAmounts(Number(liquidity.toString()), sqrtP, action.position.tickLower, action.position.tickUpper)
      const min0 = bigFloor(expected[0] * factor * 0.999999); const min1 = bigFloor(expected[1] * factor * 0.999999); confirmZero(min0, min1, expected[0], expected[1])
      const calls = [manager.encodeFunctionData('decreaseLiquidity', [[action.position.id, liquidity, min0, min1, deadline()]]), manager.encodeFunctionData('collect', [[action.position.id, state.account, max128, max128]])]
      return { to: address.manager, data: manager.encodeFunctionData('multicall', [calls]) }
    }
    const range = actionRange(); if (!range) throw new Error('Enter price range.')
    const amount0 = parseAmount(action.amount0, info0, info0.symbol + ' amount', true); const amount1 = parseAmount(action.amount1, info1, info1.symbol + ' amount', true)
    if (amount0.isZero() && amount1.isZero()) throw new Error('Enter amounts.')
    if (state.actionInfo) {
      if (state.actionInfo.balance0 && state.actionInfo.balance0.lt(amount0)) throw new Error('Insufficient ' + info0.symbol + '.')
      if (state.actionInfo.balance1 && state.actionInfo.balance1.lt(amount1)) throw new Error('Insufficient ' + info1.symbol + '.')
      if (state.actionInfo.allowance0 && state.actionInfo.allowance0.lt(amount0)) throw new Error('Approve ' + info0.symbol + ' first.')
      if (state.actionInfo.allowance1 && state.actionInfo.allowance1.lt(amount1)) throw new Error('Approve ' + info1.symbol + ' first.')
    }
    const liquidity = liquidityFor(sqrtP, range[0], range[1], Number(amount0.toString()), Number(amount1.toString()))
    const expected = Number.isFinite(liquidity) && liquidity > 0 ? positionAmounts(liquidity, sqrtP, range[0], range[1]) : [0, 0]
    const min0 = bigFloor(Math.min(expected[0], Number(amount0.toString())) * factor * 0.999999); const min1 = bigFloor(Math.min(expected[1], Number(amount1.toString())) * factor * 0.999999)
    confirmZero(min0, min1, expected[0], expected[1])
    if (action.mode === 'increase') return { to: address.manager, data: manager.encodeFunctionData('increaseLiquidity', [[action.position.id, amount0, amount1, min0, min1, deadline()]]) }
    return { to: address.manager, data: manager.encodeFunctionData('mint', [[pool.token0, pool.token1, pool.fee, range[0], range[1], amount0, amount1, min0, min1, state.account, deadline()]]) }
  }

  async function submitAction () { const tx = buildAction(); state.sending = true; renderAction(); try { await send(tx) } finally { state.sending = false; renderAction() } }
  async function collectPosition (position) {
    requireWallet(); state.sending = true; render()
    try { await send({ to: address.manager, data: manager.encodeFunctionData('collect', [[position.id, state.account, max128, max128]]) }) } finally { state.sending = false; render() }
  }

  async function loadPositions () {
    if (!state.account || !correctChain()) { state.positions = []; renderPositions(); return }
    const account = state.account
    const count = Number((await batch([{ target: address.manager, iface: manager, method: 'balanceOf', args: [account], fallback: ethers.constants.Zero }]))[0])
    if (!count) { state.positions = []; renderPositions(); return }
    if (count > maxPositions) setStatus('Newest ' + maxPositions + ' of ' + count + ' NFTs.')
    const ids = (await batch(Array.from({ length: Math.min(count, maxPositions) }, (_, index) => ({ target: address.manager, iface: manager, method: 'tokenOfOwnerByIndex', args: [account, count - 1 - index], fallback: null })))).filter(value => value !== null)
    const values = await batch(ids.map(id => ({ target: address.manager, iface: manager, method: 'positions', args: [id], fallback: null, decode: value => value })))
    const rows = values.map((value, index) => value && { id: ids[index], token0: value[2], token1: value[3], fee: Number(value[4]), tickLower: Number(value[5]), tickUpper: Number(value[6]), liquidity: value[7], owed0: value[10], owed1: value[11] }).filter(row => row && (row.liquidity.gt(0) || row.owed0.gt(0) || row.owed1.gt(0)))
    const byKey = new Map(state.pools.map(pool => [lower(pool.token0) + ':' + lower(pool.token1) + ':' + pool.fee, pool]))
    const missing = [...new Map(rows.filter(row => !byKey.has(lower(row.token0) + ':' + lower(row.token1) + ':' + row.fee)).map(row => [lower(row.token0) + ':' + lower(row.token1) + ':' + row.fee, row])).values()]
    if (missing.length) {
      const found = await batch(missing.map(row => ({ target: address.factory, iface: factory, method: 'getPool', args: [row.token0, row.token1, row.fee], fallback: null })))
      const added = await addPoolsByAddress(found.filter(value => value && value !== ethers.constants.AddressZero), { wallet: true })
      added.forEach(pool => byKey.set(lower(pool.token0) + ':' + lower(pool.token1) + ':' + pool.fee, pool))
    }
    rows.forEach(row => { const pool = byKey.get(lower(row.token0) + ':' + lower(row.token1) + ':' + row.fee); if (pool) pool.wallet = true })
    const positions = rows.map(row => Object.assign(row, { pool: byKey.get(lower(row.token0) + ':' + lower(row.token1) + ':' + row.fee) })).filter(row => row.pool)
    await limited(positions, 2, async function (position) {
      try { const raw = await rpc('eth_call', [{ from: account, to: address.manager, data: manager.encodeFunctionData('collect', [[position.id, account, max128, max128]]) }, 'latest']); position.unclaimed = manager.decodeFunctionResult('collect', raw) } catch (_) { position.unclaimed = [position.owed0, position.owed1] }
    })
    if (state.account !== account) return
    state.positions = positions; compute(); renderPositions()
  }

  async function refreshAfterAction (pool) {
    const dialog = byId('arcuni-action-dialog'); if (dialog && dialog.open) dialog.close(); state.action = null; state.actionInfo = null
    if (pool) await hydratePools([pool])
    await loadPositions(); render()
  }

  function bindProvider (provider) {
    if (!provider || state.boundProvider === provider || !provider.on) return; state.boundProvider = provider
    provider.on('accountsChanged', function (accounts) { adopt(provider, accounts || [], state.walletChain).catch(error => setStatus(errText(error), 'error')) })
    provider.on('chainChanged', function (chainId) { adopt(provider, state.account ? [state.account] : [], chainId).catch(error => setStatus(errText(error), 'error')) })
  }

  async function adopt (provider, accounts, chainId) {
    state.eip1193 = provider; state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null; state.walletChain = chainId; bindProvider(provider); render()
    if (state.account && correctChain() && state.pools.length) await loadPositions(); else { state.positions = []; renderPositions() }
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
    if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true }); if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error'))); await kit.open()
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

  async function load () {
    const generation = ++state.generation
    state.feesReady = false; state.pools = []; state.poolMap = new Map(); state.prices = new Map(); state.confidence = new Map(); state.swapLogsKey = null; state.swapLogs = []; render(); loading(true)
    setStatus('Pools'); state.head = Number(await rpc('eth_blockNumber', [])); seedPools()
    await hydratePools(state.pools.slice()); if (generation !== state.generation) return
    const custom = storedCustomPools(); if (custom.length) await addPoolsByAddress(custom, { custom: true }).catch(() => [])
    if (state.account && correctChain()) loadPositions().catch(error => setStatus(errText(error), 'error'))
    setStatus('Fees'); await feeWindow()
    const failures = await loadFees(state.pools.slice()); if (generation !== state.generation) return
    compute(); render(); loading(false)
    setStatus(failures ? 'Fee reads incomplete.' : '', failures ? 'error' : '')
    if (state.account && correctChain()) await loadPositions()
  }

  function bindUi () {
    byId('arcuni-connect').addEventListener('click', function () { connectInjected().catch(error => setStatus(errText(error), 'error')) })
    byId('arcuni-other-wallet').addEventListener('click', function () { connectOther().catch(error => setStatus(errText(error), 'error')) })
    byId('arcuni-switch').addEventListener('click', function () { switchNetwork().catch(error => setStatus(errText(error), 'error')) })
    byId('arcuni-zero-toggle').addEventListener('click', toggleZero)
    byId('arcuni-refresh').addEventListener('click', function () { load().catch(fatal) })
    byId('arcuni-custom-add').addEventListener('click', function () { addCustomPool().catch(error => setStatus(errText(error), 'error')) })
    byId('arcuni-custom-pool').addEventListener('keydown', function (event) { if (event.key === 'Enter') addCustomPool().catch(error => setStatus(errText(error), 'error')) })
  }

  async function start () {
    bindUi(); render()
    restoreInjected().catch(error => setStatus(errText(error), 'error'))
    await load()
  }

  function fatal (error) { console.error(error); loading(false); setStatus(errText(error), 'error'); render() }

  return { start, fatal }
})()
