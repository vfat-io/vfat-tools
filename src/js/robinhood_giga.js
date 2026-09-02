/* GIGA on Robinhood Chain: direct registries, direct RPC, direct EIP-1193. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { GigaPage.start().catch(GigaPage.fatal) })

const GigaPage = (function () {
  const chain = { id: '0x1237', number: 4663, rpc: 'https://rpc.mainnet.chain.robinhood.com' }
  // Official GIGA documentation identifies these deployment roots. Pool and
  // farm lists themselves are always read from their onchain registries.
  const address = {
    controller: '0x4a9cEF841098A0D84E5A8D5882AA1E120e89163D', emission: '0xbfc240b3eb8C700508447b62fD793Bf4dB364783',
    classicFactory: '0x6Fdf38f92eAd1adFc04B73aaa947ab254f6c0916', classicRouter: '0x5F1Bf5b11D1ab3BCe240ea4bC5faAf84c275Ea1F', classicChef: '0xCA4E6055811264C185c7b3851f775Aa0933CD8d9',
    clFactory: '0xEce6eCd61177336ea6Fb9b17937AC439D85EE20B', positions: '0xA79F5775b0B49E51202c48DDF03F380FaA96f641', clChef: '0x60380925A8b1007F70f60A6A42bffE391374B09a',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11', usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168'
  }
  const minUsdAnchor = 1000
  const minUsdPrice = 1e-9
  const maxUsdPrice = 1e9
  const pairCreated = ethers.utils.id('PairCreated(address,address,bool,address,uint256)')
  const poolCreated = ethers.utils.id('PoolCreated(address,address,uint24,int24,address)')
  const transferTopic = ethers.utils.id('Transfer(address,address,uint256)')
  const depositTopic = ethers.utils.id('Deposit(address,uint256,uint256)')
  const secondsPerYear = 365 * 24 * 60 * 60
  const erc20Abi = ['function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)']
  const pairAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function stable() view returns(bool)', 'function getReserves() view returns(uint256,uint256,uint256)', 'function totalSupply() view returns(uint256)']
  const clAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function fee() view returns(uint24)', 'function liquidity() view returns(uint128)', 'function slot0() view returns(uint160,int24,uint16,uint16,uint16,uint8,bool)']
  const chefAbi = ['function poolLength() view returns(uint256)', 'function totalAllocPoint() view returns(uint256)', 'function rewardToken() view returns(address)', 'function poolInfo(uint256) view returns(address,uint256,uint256,uint256,uint256)', 'function userInfo(uint256,address) view returns(uint256,uint256)', 'function pendingReward(uint256,address) view returns(uint256)', 'function deposit(uint256,uint256)', 'function withdraw(uint256,uint256)']
  const clChefAbi = ['function poolLength() view returns(uint256)', 'function totalAllocPoint() view returns(uint256)', 'function rewardToken() view returns(address)', 'function poolInfo(uint256) view returns(uint256,address,address,address,uint256,uint256)', 'function userPositionInfos(uint256) view returns(uint128,int24,int24,uint256,uint256,address,uint256,uint256)', 'function pendingReward(uint256) view returns(uint256)', 'function harvest(uint256,address)', 'function withdraw(uint256)']
  const routerAbi = ['function addLiquidity((address tokenA,address tokenB,bool stable,uint256 amountADesired,uint256 amountBDesired,uint256 amountAMin,uint256 amountBMin,address to,uint256 deadline)) returns(uint256,uint256,uint256)', 'function removeLiquidity((address tokenA,address tokenB,bool stable,uint256 liquidity,uint256 amountAMin,uint256 amountBMin,address to,uint256 deadline)) returns(uint256,uint256)']
  const positionsAbi = ['function positions(uint256) view returns(uint96,address,address,address,uint24,int24,int24,uint128,uint256,uint256,uint128,uint128)', 'function collect((uint256 tokenId,address recipient,uint128 amount0Max,uint128 amount1Max)) returns(uint256,uint256)']
  const multiAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const erc20 = new ethers.utils.Interface(erc20Abi); const pair = new ethers.utils.Interface(pairAbi); const cl = new ethers.utils.Interface(clAbi)
  const chef = new ethers.utils.Interface(chefAbi); const clChef = new ethers.utils.Interface(clChefAbi); const router = new ethers.utils.Interface(routerAbi); const positions = new ethers.utils.Interface(positionsAbi)
  const state = { rpc: null, eip1193: null, account: null, walletChain: null, bound: false, tokens: new Map(), classic: [], cl: [], classicFarms: [], clFarms: [], giga: null, prices: new Map(), block: null, showZero: false, action: null, actionInfo: null, sending: false, status: '', spinner: null, reownUnsubscribe: null, walletPositions: [], rateSampling: false, rateSample: 'waiting for a direct Chef delta', rateEpoch: 0 }
  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const short = value => value ? value.slice(0, 6) + '…' + value.slice(-4) : '—'
  const isUsdG = value => lower(value) === lower(address.usdg)
  const compact = (value, digits) => { if (!Number.isFinite(value) || value < 0) return '—'; if (value >= 1e9) return (value / 1e9).toFixed(digits === undefined ? 2 : digits) + 'b'; if (value >= 1e6) return (value / 1e6).toFixed(digits === undefined ? 2 : digits) + 'm'; if (value >= 1e3) return (value / 1e3).toFixed(digits === undefined ? 2 : digits) + 'k'; if (value >= 1) return value.toFixed(digits === undefined ? 2 : digits); return value > 0 ? value.toPrecision(3) : '0' }
  const percent = value => Number.isFinite(value) && value >= 0 ? compact(value, 2) + '%' : '—'
  const usd = value => Number.isFinite(value) && value >= 0 ? '$' + compact(value) : 'unpriced'
  const errText = error => String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').slice(0, 360)
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const format = (amount, decimals, places) => { try { if (amount === null || amount === undefined || decimals === null || decimals === undefined) return '—'; const parts = ethers.utils.formatUnits(amount, decimals).split('.'); const tail = (parts[1] || '').slice(0, places === undefined ? 5 : places).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const num = (amount, decimals) => { const value = Number(format(amount, decimals, 14)); return Number.isFinite(value) ? value : NaN }
  const unitsNum = (amount, decimals) => { try { const value = Number(ethers.utils.formatUnits(amount, decimals)); return Number.isFinite(value) ? value : NaN } catch (_) { return NaN } }
  const token = value => state.tokens.get(lower(value)) || { address: value, symbol: short(value), name: short(value), decimals: null }
  const correctChain = () => state.walletChain === chain.id
  const injected = () => window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null
  const topicAddress = value => '0x' + '0'.repeat(24) + lower(value).replace(/^0x/, '')
  const word = (data, index) => data.slice(2 + index * 64, 2 + (index + 1) * 64)
  const wordAddress = (data, index) => ethers.utils.getAddress('0x' + word(data, index).slice(24))
  const wordNumber = (data, index) => ethers.BigNumber.from('0x' + word(data, index))

  function setStatus (text, kind) { state.status = text || ''; const node = byId('giga-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (text) { const box = byId('giga-loading'); const label = byId('giga-loading-text'); const spin = byId('giga-loading-spin'); if (!box) return; box.hidden = !text; if (text && label) label.textContent = text; if (text && !state.spinner) { let index = 0; state.spinner = window.setInterval(() => { spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) } if (!text && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }
  async function limited (items, n, fn) { const out = new Array(items.length); let next = 0; async function worker () { while (next < items.length) { const i = next++; out[i] = await fn(items[i], i) } } await Promise.all(Array.from({ length: Math.min(n, Math.max(1, items.length)) }, worker)); return out }
  async function batch (calls) {
    if (!calls.length) return []
    const chunks = []; for (let i = 0; i < calls.length; i += 80) chunks.push(calls.slice(i, i + 80))
    const mc = new ethers.Contract(address.multicall, multiAbi, state.rpc)
    const results = await limited(chunks, 2, async group => {
      const encoded = group.map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }))
      const decode = (call, raw) => { try { const value = call.iface.decodeFunctionResult(call.method, raw); return call.decode ? call.decode(value) : value.length === 1 ? value[0] : value } catch (_) { return call.fallback } }
      try { const values = await mc.aggregate3(encoded); return values.map((value, i) => value.success ? decode(group[i], value.returnData) : group[i].fallback) } catch (error) {
        console.warn('GIGA Multicall3 group failed; bounded direct fallback.', errText(error))
        return limited(group, 4, async (call, i) => { try { return decode(call, await state.rpc.call({ to: call.target, data: encoded[i].callData })) } catch (_) { return call.fallback } })
      }
    })
    return [].concat(...results)
  }
  async function registryLogs (filter, label) {
    let lastError
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try { return await state.rpc.getLogs(filter) } catch (error) {
        lastError = error
        console.warn('Direct ' + label + ' registry read failed (attempt ' + (attempt + 1) + '/3).', errText(error))
        if (attempt < 2) await new Promise(resolve => window.setTimeout(resolve, 500 * (attempt + 1)))
      }
    }
    throw lastError
  }

  async function discover () {
    state.rateEpoch += 1; state.rateSampling = false; loading('Reading GIGA V2 + CL registries…'); state.block = await state.rpc.getBlockNumber()
    const classicLogs = await registryLogs({ address: address.classicFactory, topics: [pairCreated], fromBlock: 0, toBlock: 'latest' }, 'classic PairCreated')
    const clLogs = await registryLogs({ address: address.clFactory, topics: [poolCreated], fromBlock: 0, toBlock: 'latest' }, 'CL PoolCreated')
    const pairs = new Map(); classicLogs.forEach(log => { if (log.topics.length < 4 || log.data.length < 130) return; const pairAddress = wordAddress(log.data, 0); pairs.set(lower(pairAddress), { address: pairAddress, token0: ethers.utils.getAddress('0x' + log.topics[1].slice(-40)), token1: ethers.utils.getAddress('0x' + log.topics[2].slice(-40)), stable: !ethers.BigNumber.from(log.topics[3]).isZero(), created: log.blockNumber }) })
    const pools = new Map(); clLogs.forEach(log => { if (log.topics.length < 4 || log.data.length < 130) return; const pool = wordAddress(log.data, 1); pools.set(lower(pool), { address: pool, token0: ethers.utils.getAddress('0x' + log.topics[1].slice(-40)), token1: ethers.utils.getAddress('0x' + log.topics[2].slice(-40)), fee: Number(ethers.BigNumber.from(log.topics[3])), created: log.blockNumber }) })
    state.classic = [...pairs.values()]; state.cl = [...pools.values()]
    const heads = await batch([{ target: address.classicChef, iface: chef, method: 'poolLength', fallback: ethers.constants.Zero }, { target: address.classicChef, iface: chef, method: 'totalAllocPoint', fallback: ethers.constants.Zero }, { target: address.classicChef, iface: chef, method: 'rewardToken', fallback: null }, { target: address.clChef, iface: clChef, method: 'poolLength', fallback: ethers.constants.Zero }, { target: address.clChef, iface: clChef, method: 'totalAllocPoint', fallback: ethers.constants.Zero }, { target: address.clChef, iface: clChef, method: 'rewardToken', fallback: null }])
    state.giga = heads[2] || heads[5]
    const classicCount = Number(heads[0]); const clCount = Number(heads[3]); const farmCalls = []
    for (let pid = 0; pid < classicCount; pid += 1) farmCalls.push({ target: address.classicChef, iface: chef, method: 'poolInfo', args: [pid], fallback: null, decode: value => value })
    const classicInfos = await batch(farmCalls); state.classicFarms = classicInfos.map((info, pid) => info && ({ type: 'classic', pid, lp: info[0], alloc: info[1], totalStaked: info[4], totalAlloc: heads[1], pending: null, user: null, rate: null, rateStatus: 'waiting for direct pending-reward sample' })) .filter(Boolean)
    const clCalls = []; for (let pid = 0; pid < clCount; pid += 1) clCalls.push({ target: address.clChef, iface: clChef, method: 'poolInfo', args: [pid], fallback: null, decode: value => value })
    const clInfos = await batch(clCalls); state.clFarms = clInfos.map((info, pid) => info && ({ type: 'cl', pid, alloc: info[0], pool: info[1], token0: info[2], token1: info[3], fee: info[4], accounting: info[5], totalAlloc: heads[4], pending: null, gaugeTvl: NaN, rate: null, rateStatus: 'waiting for direct pending-reward sample', rateCoverage: null })) .filter(Boolean)
  }
  async function loadTokens () {
    const addresses = new Set([address.usdg]); state.classic.forEach(pool => { addresses.add(lower(pool.address)); addresses.add(lower(pool.token0)); addresses.add(lower(pool.token1)) }); state.cl.forEach(pool => { addresses.add(lower(pool.token0)); addresses.add(lower(pool.token1)) }); state.classicFarms.forEach(farm => addresses.add(lower(farm.lp))); state.clFarms.forEach(farm => { addresses.add(lower(farm.token0)); addresses.add(lower(farm.token1)) }); if (state.giga) addresses.add(lower(state.giga))
    const list = [...addresses]; const calls = []; list.forEach(value => calls.push({ target: value, iface: erc20, method: 'symbol', fallback: null }, { target: value, iface: erc20, method: 'decimals', fallback: null }))
    const values = await batch(calls); list.forEach((value, i) => { const symbol = values[i * 2] || short(value); state.tokens.set(lower(value), { address: ethers.utils.getAddress(value), symbol: String(symbol).replace(/[\r\n]/g, ' ').slice(0, 18), name: String(symbol).replace(/[\r\n]/g, ' ').slice(0, 44), decimals: values[i * 2 + 1] === null ? null : Number(values[i * 2 + 1]) }) })
  }
  async function hydratePools () {
    const all = state.classic.concat(state.cl); for (let start = 0; start < all.length; start += 24) {
      const group = all.slice(start, start + 24); loading('Reading direct GIGA pool state ' + Math.min(start + group.length, all.length) + '/' + all.length + '…'); const calls = []
      group.forEach(pool => { if (pool.stable !== undefined) calls.push({ target: pool.address, iface: pair, method: 'getReserves', fallback: null, decode: value => value }, { target: pool.address, iface: pair, method: 'totalSupply', fallback: null }); else calls.push({ target: pool.address, iface: cl, method: 'liquidity', fallback: null }, { target: pool.address, iface: cl, method: 'slot0', fallback: null, decode: value => value }, { target: pool.token0, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null }, { target: pool.token1, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null }) })
      const values = await batch(calls); let cursor = 0; group.forEach(pool => { if (pool.stable !== undefined) { pool.reserves = values[cursor++]; pool.totalSupply = values[cursor++] } else { pool.liquidity = values[cursor++]; pool.slot0 = values[cursor++]; pool.balance0 = values[cursor++]; pool.balance1 = values[cursor++] } }); pricePools(); render()
    }
  }
  function poolRatio (pool) {
    const a = token(pool.token0); const b = token(pool.token1); if (a.decimals === null || b.decimals === null) return NaN
    if (pool.stable !== undefined && pool.reserves) { const x = num(pool.reserves[0], a.decimals); const y = num(pool.reserves[1], b.decimals); return x > 0 && Number.isFinite(y) ? y / x : NaN }
    if (pool.slot0) { const sqrt = Number(pool.slot0[0].toString()); return Number.isFinite(sqrt) ? Math.pow(sqrt / Math.pow(2, 96), 2) * Math.pow(10, a.decimals - b.decimals) : NaN }
    return NaN
  }
  function poolAmounts (pool) { const a = token(pool.token0); const b = token(pool.token1); if (pool.stable !== undefined && pool.reserves) return [num(pool.reserves[0], a.decimals), num(pool.reserves[1], b.decimals)]; return [num(pool.balance0, a.decimals), num(pool.balance1, b.decimals)] }
  function pricePools () {
    const pools = state.classic.concat(state.cl); const anchors = new Map()
    pools.forEach(pool => {
      const ratio = poolRatio(pool); const [amount0, amount1] = poolAmounts(pool)
      if (!Number.isFinite(ratio) || ratio <= 0) return
      let tokenAddress; let price; let depth
      if (isUsdG(pool.token0) && Number.isFinite(amount0)) { tokenAddress = lower(pool.token1); price = 1 / ratio; depth = amount0 }
      if (isUsdG(pool.token1) && Number.isFinite(amount1)) { tokenAddress = lower(pool.token0); price = ratio; depth = amount1 }
      if (tokenAddress && Number.isFinite(price) && price >= minUsdPrice && price <= maxUsdPrice && Number.isFinite(depth) && depth >= minUsdAnchor && (!anchors.has(tokenAddress) || anchors.get(tokenAddress).depth < depth)) anchors.set(tokenAddress, { price, depth })
    })
    state.prices = new Map([[lower(address.usdg), 1]]); anchors.forEach((value, key) => state.prices.set(key, value.price))
    pools.forEach(pool => { const [a, b] = poolAmounts(pool); const pa = state.prices.get(lower(pool.token0)); const pb = state.prices.get(lower(pool.token1)); pool.tvl = Number.isFinite(a) && Number.isFinite(b) && Number.isFinite(pa) && Number.isFinite(pb) ? a * pa + b * pb : NaN })
  }
  function farmTvl (farm) { if (farm.type === 'cl') return farm.gaugeTvl; const pool = state.classic.find(value => lower(value.address) === lower(farm.lp)); if (!pool || !Number.isFinite(pool.tvl) || !pool.totalSupply || !farm.totalStaked) return NaN; const share = Number(farm.totalStaked.toString()) / Number(pool.totalSupply.toString()); return Number.isFinite(share) ? pool.tvl * share : NaN }
  function farmPool (farm) { return farm.type === 'classic' ? state.classic.find(value => lower(value.address) === lower(farm.lp)) : state.cl.find(value => lower(value.address) === lower(farm.pool)) }
  function hasZeroRate (farm) { return Number.isFinite(farm.rate) && farm.rate === 0 }
  function farmApr (farm) { const price = state.giga && state.prices.get(lower(state.giga)); const tvl = farmTvl(farm); return Number.isFinite(farm.rate) && farm.rate > 0 && Number.isFinite(price) && Number.isFinite(tvl) && tvl > 0 ? farm.rate * secondsPerYear * price / tvl * 100 : NaN }
  function clPositionValue (position, farm) {
    const pool = farmPool(farm); if (!pool || !pool.slot0) return NaN
    const a = token(position[2]); const b = token(position[3]); const pa = state.prices.get(lower(position[2])); const pb = state.prices.get(lower(position[3]))
    const current = Number(pool.slot0[0].toString()) / Math.pow(2, 96); const lowerTick = Number(position[5]); const upperTick = Number(position[6]); const liquidity = Number(position[7].toString())
    const lowerSqrt = Math.pow(1.0001, lowerTick / 2); const upperSqrt = Math.pow(1.0001, upperTick / 2)
    if (![current, lowerSqrt, upperSqrt, liquidity, pa, pb].every(Number.isFinite) || !a.decimals || !b.decimals || lowerSqrt <= 0 || upperSqrt <= lowerSqrt || liquidity < 0) return NaN
    let amount0 = 0; let amount1 = 0
    if (current <= lowerSqrt) amount0 = liquidity * (upperSqrt - lowerSqrt) / (lowerSqrt * upperSqrt)
    else if (current < upperSqrt) { amount0 = liquidity * (upperSqrt - current) / (current * upperSqrt); amount1 = liquidity * (current - lowerSqrt) }
    else amount1 = liquidity * (upperSqrt - lowerSqrt)
    const value = amount0 / Math.pow(10, a.decimals) * pa + amount1 / Math.pow(10, b.decimals) * pb
    return Number.isFinite(value) && value >= 0 ? value : NaN
  }
  const sameIds = (a, b) => a.length === b.length && a.every((value, index) => value === b[index])
  async function stakedClIds () {
    const [inbound, outbound] = await Promise.all([registryLogs({ address: address.positions, topics: [transferTopic, null, topicAddress(address.clChef)], fromBlock: 0, toBlock: 'latest' }, 'CL Chef inbound Transfer'), registryLogs({ address: address.positions, topics: [transferTopic, topicAddress(address.clChef)], fromBlock: 0, toBlock: 'latest' }, 'CL Chef outbound Transfer')])
    const staked = new Set(); inbound.concat(outbound).sort((a, b) => a.blockNumber - b.blockNumber || a.transactionIndex - b.transactionIndex || a.logIndex - b.logIndex).forEach(log => { const id = ethers.BigNumber.from(log.topics[3]).toString(); if (lower('0x' + log.topics[2].slice(-40)) === lower(address.clChef)) staked.add(id); else if (lower('0x' + log.topics[1].slice(-40)) === lower(address.clChef)) staked.delete(id) })
    return [...staked].sort((a, b) => ethers.BigNumber.from(a).lt(b) ? -1 : 1)
  }
  async function activeClStakes () {
    const ids = await stakedClIds(); const calls = []
    ids.forEach(id => calls.push({ target: address.clChef, iface: clChef, method: 'userPositionInfos', args: [id], fallback: null, decode: value => value }, { target: address.positions, iface: positions, method: 'positions', args: [id], fallback: null, decode: value => value }))
    const values = await batch(calls); const known = new Set(state.clFarms.map(farm => farm.pid)); const stakes = []
    ids.forEach((id, i) => { const info = values[i * 2]; const position = values[i * 2 + 1]; const pid = info ? Number(info[6]) : NaN; if (position && known.has(pid)) stakes.push({ id, pid, position }) })
    return { ids, stakes, retired: ids.length - stakes.length }
  }
  async function classicObservers () {
    const logs = await registryLogs({ address: address.classicChef, topics: [depositTopic], fromBlock: 0, toBlock: 'latest' }, 'classic MasterChef Deposit')
    const candidates = new Map(); logs.forEach(log => { if (log.topics.length < 3) return; const pid = Number(ethers.BigNumber.from(log.topics[2])); const user = ethers.utils.getAddress('0x' + log.topics[1].slice(-40)); const key = pid + ':' + lower(user); if (!candidates.has(key)) candidates.set(key, { pid, user }) })
    const list = [...candidates.values()]; const values = await batch(list.map(value => ({ target: address.classicChef, iface: chef, method: 'userInfo', args: [value.pid, value.user], fallback: null, decode: value => value }))); const observers = new Map()
    list.forEach((entry, index) => { const info = values[index]; if (!info || info[0].isZero()) return; const previous = observers.get(entry.pid); if (!previous || info[0].gt(previous.stake)) observers.set(entry.pid, { pid: entry.pid, user: entry.user, stake: info[0] }) })
    return observers
  }
  async function classicRateSnapshot (observers) {
    const list = [...observers.values()]; const calls = []
    list.forEach(entry => calls.push({ target: address.classicChef, iface: chef, method: 'userInfo', args: [entry.pid, entry.user], fallback: null, decode: value => value }, { target: address.classicChef, iface: chef, method: 'poolInfo', args: [entry.pid], fallback: null, decode: value => value }, { target: address.classicChef, iface: chef, method: 'pendingReward', args: [entry.pid, entry.user], fallback: null }))
    const values = await batch(calls); const block = await state.rpc.getBlock('latest'); return { block, rows: list.map((entry, index) => ({ entry, user: values[index * 3], pool: values[index * 3 + 1], pending: values[index * 3 + 2] })) }
  }
  async function clRateSnapshot (stakes) { const values = await batch(stakes.map(stake => ({ target: address.clChef, iface: clChef, method: 'pendingReward', args: [stake.id], fallback: null }))); const block = await state.rpc.getBlock('latest'); return { block, values } }
  function applyClassicRates (observers, first, last) {
    const seconds = last.block.timestamp - first.block.timestamp; const decimals = token(state.giga).decimals
    state.classicFarms.forEach(farm => {
      const a = first.rows.find(row => row.entry.pid === farm.pid); const b = last.rows.find(row => row.entry.pid === farm.pid)
      if (!a || !b) { farm.rate = farm.totalStaked && farm.totalStaked.isZero() ? 0 : null; farm.rateStatus = farm.rate === 0 ? 'no staked LP' : 'no live staker found in canonical Deposit events'; return }
      if (!a.user || !b.user || !a.pool || !b.pool || !a.pending || !b.pending || seconds <= 0 || a.user[0].isZero() || !a.user[0].eq(b.user[0]) || !a.pool[4].eq(b.pool[4]) || b.pending.lt(a.pending)) { farm.rate = null; farm.rateStatus = 'unstable direct pending-reward sample'; return }
      farm.totalStaked = b.pool[4]; const emitted = b.pending.sub(a.pending).mul(a.pool[4]).div(a.user[0]); const rate = unitsNum(emitted, decimals) / seconds
      farm.rate = Number.isFinite(rate) ? rate : null; farm.rateStatus = farm.rate === null ? 'GIGA decimals unavailable' : 'direct pending-reward delta · ' + seconds + 's'
    })
  }
  function applyClRates (stakes, first, last) {
    const seconds = last.block.timestamp - first.block.timestamp; const decimals = token(state.giga).decimals
    state.clFarms.forEach(farm => {
      const members = stakes.filter(stake => stake.pid === farm.pid); const values = members.map(stake => clPositionValue(stake.position, farm)); farm.gaugeTvl = values.length === 0 ? 0 : values.every(Number.isFinite) ? values.reduce((sum, value) => sum + value, 0) : NaN
      farm.rateCoverage = members.length
      if (!members.length) { farm.rate = 0; farm.rateStatus = 'no active Chef position NFTs'; return }
      const total = members.reduce((sum, stake) => { const i = stakes.indexOf(stake); const a = first.values[i]; const b = last.values[i]; return !a || !b || b.lt(a) ? null : sum === null ? null : sum.add(b.sub(a)) }, ethers.constants.Zero)
      if (!total || seconds <= 0) { farm.rate = null; farm.rateStatus = 'incomplete or unstable direct pending-reward coverage'; return }
      const rate = unitsNum(total, decimals) / seconds; farm.rate = Number.isFinite(rate) ? rate : null; farm.rateStatus = farm.rate === null ? 'GIGA decimals unavailable' : 'direct aggregate pending-reward delta · ' + seconds + 's · ' + members.length + ' NFT(s)'
    })
  }
  async function sampleFarmRates () {
    if (state.rateSampling) return
    const epoch = ++state.rateEpoch; state.rateSampling = true; state.rateSample = 'sampling two direct MasterChef pending-reward reads (about 16 seconds)'; state.classicFarms.concat(state.clFarms).forEach(farm => { farm.rateStatus = 'sampling direct pending-reward delta' }); render()
    try {
      const [observers, clState] = await Promise.all([classicObservers(), activeClStakes()]); const [classicFirst, clFirst] = await Promise.all([classicRateSnapshot(observers), clRateSnapshot(clState.stakes)])
      await new Promise(resolve => window.setTimeout(resolve, 16000))
      const [classicLast, clLast, endIds] = await Promise.all([classicRateSnapshot(observers), clRateSnapshot(clState.stakes), stakedClIds()])
      if (!sameIds(clState.ids, endIds)) throw new Error('CL Chef NFT membership changed during the live sample; retry to obtain complete coverage.')
      if (epoch !== state.rateEpoch) return
      applyClassicRates(observers, classicFirst, classicLast); applyClRates(clState.stakes, clFirst, clLast); state.block = clLast.block.number; const duration = clLast.block.timestamp - clFirst.block.timestamp; const ended = new Date(clLast.block.timestamp * 1000).toISOString().replace('.000Z', 'Z'); state.rateSample = 'direct ' + duration + 's pending-reward delta ending ' + ended + ' · ' + clState.stakes.length + ' active Chef NFTs / ' + clState.ids.length + ' total; ' + clState.retired + ' retired pool #8 NFT(s) excluded'
    } catch (error) {
      if (epoch === state.rateEpoch) { state.rateSample = 'direct rate sample unavailable: ' + errText(error); state.classicFarms.concat(state.clFarms).forEach(farm => { if (farm.rate === null) farm.rateStatus = 'direct sample unavailable' }) }
      console.warn('GIGA direct farm-rate sample unavailable', errText(error))
    } finally { if (epoch === state.rateEpoch) { state.rateSampling = false; render() } }
  }

  function walletLabel () { if (state.account) return short(state.account) + (correctChain() ? ' · Robinhood Chain' : ' · switch to Robinhood Chain'); return injected() ? 'No injected account authorized for this page' : 'No injected EIP-1193 wallet found' }
  function renderSummary () {
    const node = byId('giga-summary'); if (!node) return
    const farms = state.classicFarms.concat(state.clFarms); const live = farms.filter(farm => Number.isFinite(farm.rate) && farm.rate > 0).length; const sampled = farms.filter(farm => Number.isFinite(farm.rate)).length; const aprs = farms.filter(farm => Number.isFinite(farmApr(farm))).length
    node.textContent = [
      'V2 PAIRS  : ' + state.classic.length + ' · CL POOLS: ' + state.cl.length,
      'FARMS     : ' + state.classicFarms.length + ' V2 + ' + state.clFarms.length + ' CL · ' + live + ' live rates',
      'GIGA      : ' + (state.prices.has(lower(state.giga)) ? usd(state.prices.get(lower(state.giga))) : 'unpriced') + ' · ' + state.prices.size + ' USDG-priced tokens',
      'RATE/APR  : ' + sampled + '/' + farms.length + ' sampled · ' + aprs + ' priced · ' + state.rateSample,
      'DISPLAY   : ' + (state.showZero ? 'all farms' : 'nonzero rates') + ' · ' + walletLabel(),
      'BLOCK     : ' + (state.block || '—')
    ].join('\n'); byId('giga-wallet-status').textContent = walletLabel()
  }
  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'giga-action', disabled: disabled || state.sending }); node.addEventListener('click', () => fn().catch(error => setStatus(errText(error), 'error'))); return node }
  function addHeader (table, labels) { const row = table.insertRow(); labels.forEach(label => row.appendChild(e('th', { text: label }))) }
  function addCell (row, text, className) { row.appendChild(e('td', { text, className })) }
  function nameCell (title, line) { const cell = e('td'); append(cell, e('span', { text: title, className: 'giga-name' }), e('span', { text: line, className: 'giga-sub' })); return cell }
  function poolLabel (pool) { const a = token(pool.token0); const b = token(pool.token1); return a.symbol + ' / ' + b.symbol + (pool.stable !== undefined ? (pool.stable ? ' · stable' : ' · volatile') : ' · CL ' + (pool.fee / 10000) + '%') }
  function tvlLabel (pool) { const [a, b] = poolAmounts(pool); const labels = compact(a, 5) + ' ' + token(pool.token0).symbol + ' + ' + compact(b, 5) + ' ' + token(pool.token1).symbol; return Number.isFinite(pool.tvl) ? labels + ' · ' + usd(pool.tvl) : labels + ' · unpriced' }
  function renderPools (id, list, v2) { const target = byId(id); target.textContent = ''; const table = e('table', { className: 'giga-table' }); addHeader(table, ['POOL', 'ONCHAIN LIQUIDITY', v2 ? 'V2 LP SUPPLY' : 'ACTIVE LIQUIDITY', 'POOL-IMPLIED PRICE', 'DIRECT WALLET']); list.slice().sort((a, b) => (b.tvl || 0) - (a.tvl || 0)).forEach(pool => { const row = table.insertRow(); row.appendChild(nameCell(poolLabel(pool), short(pool.address) + ' · block ' + pool.created)); addCell(row, tvlLabel(pool), Number.isFinite(pool.tvl) ? '' : 'giga-unpriced'); addCell(row, v2 ? format(pool.totalSupply, token(pool.address).decimals) : format(pool.liquidity, 0)); const ratio = poolRatio(pool); addCell(row, Number.isFinite(ratio) ? '1 ' + token(pool.token0).symbol + ' = ' + compact(ratio, 6) + ' ' + token(pool.token1).symbol : '—', Number.isFinite(ratio) ? '' : 'giga-unpriced'); const actions = e('td', { className: 'giga-actions' }); if (v2) append(actions, button('add V2 LP', () => openAction('add', pool)), button('remove / exit', () => openAction('remove', pool))); else actions.textContent = 'CL NFT actions below'; row.appendChild(actions) }); target.appendChild(table) }
  function renderFarms () {
    const target = byId('giga-farms'); target.textContent = ''
    const list = state.classicFarms.concat(state.clFarms).filter(farm => state.showZero || !hasZeroRate(farm))
    const table = e('table', { className: 'giga-table' })
    addHeader(table, ['FARM', 'STAKED', 'UNSTAKED', 'APR', 'GIGA REWARDS', 'ACTIONS'])
    list.forEach(farm => {
      const pool = farmPool(farm)
      const title = (pool ? poolLabel(pool) : short(farm.type === 'classic' ? farm.lp : farm.pool)) + ' · ' + (farm.type === 'classic' ? 'V2' : 'CL') + ' #' + farm.pid
      const row = table.insertRow()
      row.appendChild(nameCell(title, farm.type === 'classic' ? 'MasterChef V2' : 'MasterChef CL'))
      const staked = farmTvl(farm)
      const poolTvl = pool && pool.tvl
      const unstaked = Number.isFinite(staked) && Number.isFinite(poolTvl) ? Math.max(0, poolTvl - staked) : NaN
      addCell(row, Number.isFinite(staked) ? usd(staked) : 'unpriced', Number.isFinite(staked) ? '' : 'giga-unpriced')
      addCell(row, Number.isFinite(unstaked) ? usd(unstaked) : 'unpriced', Number.isFinite(unstaked) ? '' : 'giga-unpriced')
      const apr = farmApr(farm)
      addCell(row, farm.rate === 0 ? '0.00%' : Number.isFinite(apr) ? percent(apr) : Number.isFinite(farm.rate) ? 'unpriced' : 'sampling…', Number.isFinite(apr) || farm.rate === 0 ? '' : 'giga-unpriced')
      const allocation = farm.totalAlloc && !farm.totalAlloc.isZero() ? Number(farm.alloc.toString()) / Number(farm.totalAlloc.toString()) * 100 : NaN
      const emission = Number.isFinite(farm.rate) ? (farm.rate === 0 ? '0 GIGA / sec' : compact(farm.rate, 7) + ' GIGA / sec\n' + compact(farm.rate * secondsPerYear, 5) + ' GIGA / year') : 'alloc ' + percent(allocation) + '\nrate sampling…'
      addCell(row, emission, Number.isFinite(farm.rate) ? '' : 'giga-unpriced')
      const actions = e('td', { className: 'giga-actions' })
      if (farm.type === 'classic') append(actions, button('stake', () => openAction('stake', farm)), button('unstake / exit', () => openAction('unstake', farm)), button('claim', () => openAction('claim', farm)))
      else append(actions, button('harvest ID', () => openAction('clHarvest', farm)), button('unstake ID', () => openAction('clWithdraw', farm)))
      row.appendChild(actions)
    })
    if (!list.length) target.appendChild(e('pre', { text: 'No live farm rates. [ show zero-rate farms ]' }))
    else target.appendChild(table)
  }
  function renderPositions () { const target = byId('giga-positions'); target.textContent = ''; if (!state.account) { target.appendChild(e('pre', { text: 'Connect wallet to read positions.' })); return } const table = e('table', { className: 'giga-table' }); addHeader(table, ['POSITION', 'ONCHAIN AMOUNT / REWARD', 'DIRECT WALLET']); state.classicFarms.forEach(farm => { const pool = state.classic.find(value => lower(value.address) === lower(farm.lp)); const lp = token(farm.lp); const row = table.insertRow(); row.appendChild(nameCell('V2 FARM #' + farm.pid, pool ? poolLabel(pool) : short(farm.lp))); const user = farm.user; addCell(row, user ? 'staked ' + format(user[0], lp.decimals) + ' ' + lp.symbol + '\npending ' + format(farm.pending, token(state.giga).decimals) + ' GIGA' : 'unavailable', user ? '' : 'giga-unpriced'); const actions = e('td', { className: 'giga-actions' }); append(actions, button('stake', () => openAction('stake', farm)), button('unstake', () => openAction('unstake', farm)), button('claim', () => openAction('claim', farm))); row.appendChild(actions) }); state.walletPositions.forEach(position => { const row = table.insertRow(); row.appendChild(nameCell((position.staked ? 'CL STAKED NFT #' : 'CL NFT #') + position.id, token(position.token0).symbol + ' / ' + token(position.token1).symbol + ' · fee ' + position.fee)); addCell(row, 'liquidity ' + format(position.liquidity, 0) + (position.staked ? '\npending ' + format(position.pending, token(state.giga).decimals) + ' GIGA' : '\ncollectable contract-side')); const actions = e('td', { className: 'giga-actions' }); if (position.staked) append(actions, button('harvest', () => openAction('clHarvest', position)), button('unstake', () => openAction('clWithdraw', position))); else actions.appendChild(button('collect fees', () => openAction('collect', position))); row.appendChild(actions) }); target.appendChild(table) }
  function renderPrice () { const node = byId('giga-price'); if (!node) return; const price = state.giga && state.prices.get(lower(state.giga)); const v2 = state.classic.find(pool => (lower(pool.token0) === lower(state.giga) && isUsdG(pool.token1)) || (lower(pool.token1) === lower(state.giga) && isUsdG(pool.token0))); node.textContent = Number.isFinite(price) ? 'GIGA: ' + usd(price) + ' · V2 GIGA / USDG: ' + (v2 && Number.isFinite(v2.tvl) ? usd(v2.tvl) + ' TVL' : 'unpriced') : 'GIGA: unpriced' }
  function render () { renderSummary(); renderPrice(); renderPools('giga-classic', state.classic, true); renderPools('giga-cl', state.cl, false); renderFarms(); renderPositions(); if (state.action) renderAction() }

  function actionTitle () { const a = state.action; if (!a) return ''; const names = { add: 'ADD V2 LP', remove: 'REMOVE V2 LP / EXIT', stake: 'STAKE V2 LP', unstake: 'UNSTAKE V2 LP', claim: 'CLAIM V2 GIGA', clHarvest: 'HARVEST CL GIGA', clWithdraw: 'UNSTAKE CL NFT', collect: 'COLLECT CL FEES' }; return (names[a.kind] || a.kind) + ' · ' + (a.entry.pid !== undefined ? 'farm #' + a.entry.pid : poolLabel(a.entry)) }
  function actionAssets () { const a = state.action; if (!a) return []; if (a.kind === 'add') return [token(a.entry.token0), token(a.entry.token1)]; if (a.kind === 'remove' || a.kind === 'stake' || a.kind === 'unstake') return [token(a.kind === 'remove' ? a.entry.address : a.entry.lp)]; return [] }
  function spender () { const a = state.action; if (!a) return null; if (a.kind === 'add' || a.kind === 'remove') return address.classicRouter; if (a.kind === 'stake' || a.kind === 'unstake') return address.classicChef; return null }
  function inputLabel (index) { const a = state.action; if (a.kind === 'add') return 'Amount ' + actionAssets()[index].symbol; if (a.kind === 'remove') return 'LP amount'; if (a.kind === 'stake' || a.kind === 'unstake') return 'LP amount'; if (a.kind === 'clHarvest' || a.kind === 'clWithdraw') return 'CL token ID'; return '' }
  function needsApproval () { return ['add', 'remove', 'stake'].includes(state.action && state.action.kind) }
  function parseAmount (value, asset) { if (!/^\d+(\.\d+)?$/.test(String(value || '').trim())) throw new Error('Enter a positive exact decimal amount.'); if (asset.decimals === null) throw new Error('This token has no usable onchain decimals.'); const amount = ethers.utils.parseUnits(String(value).trim(), asset.decimals); if (amount.lte(0)) throw new Error('Enter an amount greater than zero.'); return amount }
  async function openAction (kind, entry) { state.action = { kind, entry, amounts: kind === 'claim' || kind === 'collect' ? [] : [''], tokenId: kind === 'collect' ? String(entry.id) : '' }; state.actionInfo = null; const dialog = byId('giga-action-dialog'); if (!dialog.open) dialog.showModal(); renderAction(); if (state.account && correctChain()) { await refreshActionInfo(); renderAction() } }
  async function refreshActionInfo () { const a = state.action; if (!a || !state.account) return; const assets = actionAssets(); const calls = []; assets.forEach(asset => calls.push({ target: asset.address, iface: erc20, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero }, { target: asset.address, iface: erc20, method: 'allowance', args: [state.account, spender()], fallback: ethers.constants.Zero })); if (a.kind === 'unstake' || a.kind === 'claim') calls.push({ target: address.classicChef, iface: chef, method: 'userInfo', args: [a.entry.pid, state.account], fallback: null, decode: value => value }); const values = await batch(calls); a.info = { assets: assets.map((asset, i) => ({ asset, balance: values[i * 2], allowance: values[i * 2 + 1] })), user: ['unstake', 'claim'].includes(a.kind) ? values[assets.length * 2] : null }; state.actionInfo = a.info }
  function buildAction () { const a = state.action; const account = state.account; if (!a || !account) throw new Error('Connect a wallet first.'); const deadline = Math.floor(Date.now() / 1000) + 20 * 60; if (a.kind === 'add') { const assets = actionAssets(); const x = parseAmount(a.amounts[0], assets[0]); const y = parseAmount(a.amounts[1], assets[1]); return { to: address.classicRouter, data: router.encodeFunctionData('addLiquidity', [[a.entry.token0, a.entry.token1, a.entry.stable, x, y, 0, 0, account, deadline]]), amounts: [x, y], assets } } if (a.kind === 'remove') { const amount = parseAmount(a.amounts[0], token(a.entry.address)); return { to: address.classicRouter, data: router.encodeFunctionData('removeLiquidity', [[a.entry.token0, a.entry.token1, a.entry.stable, amount, 0, 0, account, deadline]]), amounts: [amount], assets: actionAssets() } } if (a.kind === 'stake') { const amount = parseAmount(a.amounts[0], token(a.entry.lp)); return { to: address.classicChef, data: chef.encodeFunctionData('deposit', [a.entry.pid, amount]), amounts: [amount], assets: actionAssets() } } if (a.kind === 'unstake') { const amount = parseAmount(a.amounts[0], token(a.entry.lp)); return { to: address.classicChef, data: chef.encodeFunctionData('withdraw', [a.entry.pid, amount]), amounts: [], assets: [] } } if (a.kind === 'claim') return { to: address.classicChef, data: chef.encodeFunctionData('deposit', [a.entry.pid, 0]), amounts: [], assets: [] }; if (a.kind === 'clHarvest') { const id = ethers.BigNumber.from(a.tokenId); return { to: address.clChef, data: clChef.encodeFunctionData('harvest', [id, account]), amounts: [], assets: [] } } if (a.kind === 'clWithdraw') { const id = ethers.BigNumber.from(a.tokenId); return { to: address.clChef, data: clChef.encodeFunctionData('withdraw', [id]), amounts: [], assets: [] } } if (a.kind === 'collect') return { to: address.positions, data: positions.encodeFunctionData('collect', [[ethers.BigNumber.from(a.tokenId), account, ethers.constants.MaxUint256.mask(128), ethers.constants.MaxUint256.mask(128)]]), amounts: [], assets: [] }; throw new Error('Unsupported direct GIGA action.') }
  function buildApproval (index) { const tx = buildAction(); const item = tx.assets[index]; if (!item) throw new Error('This direct action does not require an ERC-20 approval.'); return { to: item.address, data: erc20.encodeFunctionData('approve', [tx.to, tx.amounts[index]]), label: 'exact ' + item.symbol + ' approval' } }
  async function preflight (tx) { try { await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data }, 'latest'] }) } catch (error) { throw new Error('Exact eth_call preflight failed: ' + errText(error)) } }
  async function send (tx, label) { await preflight(tx); setStatus('Preflight passed. Confirm ' + label + ' in the wallet…'); const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data }] }); setStatus('Submitted ' + hash + '. Waiting for direct receipt…'); const receipt = await state.rpc.waitForTransaction(hash, 1, 180000); if (!receipt || receipt.status !== 1) throw new Error(label + ' did not confirm successfully.') }
  async function approve (index) { state.sending = true; renderAction(); try { await send(buildApproval(index), 'approval'); await refreshActionInfo(); setStatus('Approval confirmed. The requested action still receives its own exact preflight.', 'success') } finally { state.sending = false; renderAction() } }
  async function submit () { state.sending = true; renderAction(); try { const tx = buildAction(); if (needsApproval()) tx.assets.forEach((asset, i) => { if (!state.actionInfo.assets[i].allowance.gte(tx.amounts[i])) throw new Error('Approve the exact ' + asset.symbol + ' amount first. Unlimited approvals are never substituted.'); if (state.actionInfo.assets[i].balance.lt(tx.amounts[i])) throw new Error('The requested ' + asset.symbol + ' amount exceeds this wallet balance.') }); await send(tx, actionTitle()); await hydrateWallet(); await refreshAll(false); setStatus('Receipt confirmed and the affected direct onchain state was refreshed.', 'success') } finally { state.sending = false; render() } }
  function renderAction () { const dialog = byId('giga-action-dialog'); const box = byId('giga-action-content'); if (!state.action || !dialog || !box) return; const a = state.action; box.textContent = ''; box.appendChild(e('h2', { id: 'giga-action-title', text: actionTitle() })); if (!state.account) { box.appendChild(e('p', { text: 'Connect an EIP-1193 wallet first. Public GIGA data never requests wallet permissions.' })); return } if (!correctChain()) { box.appendChild(e('p', { text: 'Switch the connected wallet to Robinhood Chain (4663) before preparing a transaction.' })); return } box.appendChild(e('p', { text: needsApproval() ? 'Approvals are exact typed amounts only. Every approval and action is eth_call preflighted before sending.' : 'Every submit performs an eth_call of the exact direct transaction before it can be sent.' })); if (!state.actionInfo && !['clHarvest', 'clWithdraw', 'collect'].includes(a.kind)) box.appendChild(e('p', { text: 'Reading direct balances, allowances, and farm position…' })); if (a.kind === 'clHarvest' || a.kind === 'clWithdraw') { const row = e('label', { className: 'giga-input' }); row.appendChild(document.createTextNode('CL token ID : ')); const input = e('input'); input.value = a.tokenId; input.inputMode = 'numeric'; input.addEventListener('input', () => { a.tokenId = input.value }); row.appendChild(input); box.appendChild(row) } else { actionAssets().forEach((asset, i) => { const row = e('label', { className: 'giga-input' }); row.appendChild(document.createTextNode(inputLabel(i) + ' : ')); const input = e('input'); input.value = a.amounts[i] || ''; input.inputMode = 'decimal'; input.placeholder = '0.0'; input.addEventListener('input', () => { a.amounts[i] = input.value }); row.appendChild(input); if (state.actionInfo && state.actionInfo.assets[i]) { const max = button('max', () => { a.amounts[i] = format(state.actionInfo.assets[i].balance, asset.decimals, asset.decimals); renderAction(); }); row.appendChild(max) } box.appendChild(row); if (state.actionInfo && state.actionInfo.assets[i]) box.appendChild(e('p', { text: 'Wallet ' + asset.symbol + ': ' + format(state.actionInfo.assets[i].balance, asset.decimals) })) }); if (a.kind === 'unstake' && state.actionInfo && state.actionInfo.user) box.appendChild(e('p', { text: 'Direct staked balance: ' + format(state.actionInfo.user[0], token(a.entry.lp).decimals) + ' ' + token(a.entry.lp).symbol })) }
    const actions = e('div', { className: 'giga-dialog-actions' }); if (needsApproval()) actionAssets().forEach((asset, i) => actions.appendChild(button('approve exact ' + asset.symbol, () => approve(i), !state.actionInfo || !a.amounts[i]))); actions.appendChild(button('preflight + submit', submit, state.sending)); box.appendChild(actions) }

  async function hydrateWallet () {
    if (!state.account) return
    const calls = []; state.classicFarms.forEach(farm => calls.push({ target: address.classicChef, iface: chef, method: 'userInfo', args: [farm.pid, state.account], fallback: null, decode: value => value }, { target: address.classicChef, iface: chef, method: 'pendingReward', args: [farm.pid, state.account], fallback: ethers.constants.Zero }))
    const values = await batch(calls); state.classicFarms.forEach((farm, i) => { farm.user = values[i * 2]; farm.pending = values[i * 2 + 1] })
    try { const inbound = await state.rpc.getLogs({ address: address.positions, topics: [transferTopic, null, topicAddress(state.account)], fromBlock: 0, toBlock: 'latest' }); const outbound = await state.rpc.getLogs({ address: address.positions, topics: [transferTopic, topicAddress(state.account)], fromBlock: 0, toBlock: 'latest' }); const owned = new Set(); const staked = new Set(); inbound.concat(outbound).sort((a, b) => a.blockNumber - b.blockNumber || a.transactionIndex - b.transactionIndex || a.logIndex - b.logIndex).forEach(log => { const id = ethers.BigNumber.from(log.topics[3]).toString(); const from = lower('0x' + log.topics[1].slice(-40)); const to = lower('0x' + log.topics[2].slice(-40)); if (to === lower(state.account)) { owned.add(id); staked.delete(id) } else if (from === lower(state.account) && to === lower(address.clChef)) { owned.delete(id); staked.add(id) } else if (from === lower(state.account)) { owned.delete(id); staked.delete(id) } }); const ids = [...new Set([...owned, ...staked])].slice(0, 80); const positionCalls = []; ids.forEach(id => { positionCalls.push({ target: address.positions, iface: positions, method: 'positions', args: [id], fallback: null, decode: value => value }); if (staked.has(id)) positionCalls.push({ target: address.clChef, iface: clChef, method: 'pendingReward', args: [id], fallback: ethers.constants.Zero }) }); const decoded = await batch(positionCalls); let cursor = 0; state.walletPositions = ids.map(id => { const value = decoded[cursor++]; const pending = staked.has(id) ? decoded[cursor++] : null; return value && ({ id, token0: value[2], token1: value[3], fee: value[4].toString(), liquidity: value[7], staked: staked.has(id), pending }) }).filter(Boolean) } catch (error) { console.warn('Direct CL position event scan unavailable', errText(error)); state.walletPositions = [] }
  }
  async function adopt (provider, accounts, walletChain) { if (!provider || !accounts || !accounts[0]) return false; state.eip1193 = provider; state.account = ethers.utils.getAddress(accounts[0]); state.walletChain = walletChain; if (!state.bound && provider.on) { state.bound = true; provider.on('accountsChanged', () => restore().catch(fatal)); provider.on('chainChanged', () => restore().catch(fatal)) } await hydrateWallet(); render(); return true }
  async function restore () { const provider = injected(); if (!provider) { state.account = null; state.walletChain = null; render(); return false } try { const result = await Promise.all([provider.request({ method: 'eth_accounts' }), provider.request({ method: 'eth_chainId' })]); if (!result[0] || !result[0][0]) { state.account = null; state.walletChain = result[1]; render(); return false } return adopt(provider, result[0], result[1]) } catch (error) { state.account = null; render(); return false } }
  async function connectInjected () { const provider = injected(); if (!provider) { setStatus('No injected EIP-1193 wallet was found. Choose [ other wallet ] to load optional wallet support.', 'error'); return } const accounts = await provider.request({ method: 'eth_requestAccounts' }); const walletChain = await provider.request({ method: 'eth_chainId' }); await adopt(provider, accounts, walletChain); setStatus(correctChain() ? 'Injected wallet connected directly.' : 'Wallet connected on a different chain. Switch it to Robinhood Chain before actions.', correctChain() ? 'success' : 'error') }
  async function connectOther () { const reown = await import('./config.js'); const kit = reown.createAppKitInstance(process.env.REOWN_PROJECT_ID || '3e6154a7158ff5f7509f24405fc3b551'); if (!kit) throw new Error('Optional wallet support is unavailable.'); const onAccount = async account => { if (!account || !account.isConnected) return; const provider = await kit.getWalletProvider(); await adopt(provider, await provider.request({ method: 'eth_accounts' }), await provider.request({ method: 'eth_chainId' })); if (state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null } }; if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true }); if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error'))); await kit.open() }
  async function refreshAll (withDiscovery) { loading(withDiscovery ? 'Refreshing GIGA registries…' : 'Refreshing GIGA state…'); state.block = await state.rpc.getBlockNumber(); if (withDiscovery) { await discover(); await loadTokens() } await hydratePools(); await hydrateWallet(); loading(); render(); sampleFarmRates().catch(error => console.warn('GIGA rate refresh failed', errText(error))) }
  function bind () { byId('giga-connect').addEventListener('click', () => connectInjected().catch(error => setStatus(errText(error), 'error'))); byId('giga-other-wallet').addEventListener('click', () => connectOther().catch(error => setStatus(errText(error), 'error'))); byId('giga-zero-toggle').addEventListener('click', () => { state.showZero = !state.showZero; byId('giga-zero-toggle').textContent = state.showZero ? '[ hide zero-rate farms ]' : '[ show zero-rate farms ]'; renderFarms(); renderSummary() }); byId('giga-refresh').addEventListener('click', () => refreshAll(true).then(() => setStatus('Refreshed GIGA state.', 'success')).catch(error => setStatus(errText(error), 'error'))) }
  async function start () { state.rpc = new ethers.providers.JsonRpcProvider(chain.rpc, chain.number); bind(); render(); const passive = restore(); await discover(); loading('Reading GIGA token metadata…'); await loadTokens(); await hydratePools(); await passive; await hydrateWallet(); loading(); render(); setStatus('Loaded GIGA pools and farms. Sampling live reward rates…', 'success'); sampleFarmRates().catch(error => console.warn('GIGA initial rate sample failed', errText(error))) }
  function fatal (error) { console.error('GIGA page load failed', error); loading(); setStatus(errText(error), 'error'); const target = byId('giga-classic'); if (target) { target.textContent = ''; target.appendChild(e('pre', { text: 'GIGA COULD NOT LOAD\n' + errText(error) + '\nOnly the official Robinhood RPC is used. Retry when it is reachable.' })) } }
  return { start, fatal }
})()
