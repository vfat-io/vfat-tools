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
  const secondsPerYear = 365 * 24 * 60 * 60
  const secondsPerWeek = 7 * 24 * 60 * 60
  const erc20Abi = ['function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)']
  const pairAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function stable() view returns(bool)', 'function getReserves() view returns(uint256,uint256,uint256)', 'function totalSupply() view returns(uint256)']
  const clAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function fee() view returns(uint24)', 'function liquidity() view returns(uint128)', 'function slot0() view returns(uint160,int24,uint16,uint16,uint16,uint8,bool)']
  const chefAbi = ['function poolLength() view returns(uint256)', 'function totalAllocPoint() view returns(uint256)', 'function rewardToken() view returns(address)', 'function REWARD_PRECISION() view returns(uint256)', 'function poolInfo(uint256) view returns(address,uint256,uint256,uint256,uint256)', 'function userInfo(uint256,address) view returns(uint256,uint256)', 'function pendingReward(uint256,address) view returns(uint256)', 'function deposit(uint256,uint256)', 'function withdraw(uint256,uint256)']
  const clChefAbi = ['function poolLength() view returns(uint256)', 'function totalAllocPoint() view returns(uint256)', 'function rewardToken() view returns(address)', 'function poolInfo(uint256) view returns(uint256,address,address,address,uint256,uint256)', 'function userPositionInfos(uint256) view returns(uint128,int24,int24,uint256,uint256,address,uint256,uint256)', 'function pendingReward(uint256) view returns(uint256)', 'function harvest(uint256,address)', 'function withdraw(uint256)']
  const controllerAbi = ['function totalAllocPoint() view returns(uint256)', 'function latestPeriodRewardPerSecond() view returns(uint256)', 'function latestPeriodStartTime() view returns(uint256)', 'function latestPeriodEndTime() view returns(uint256)']
  const routerAbi = ['function addLiquidity((address tokenA,address tokenB,bool stable,uint256 amountADesired,uint256 amountBDesired,uint256 amountAMin,uint256 amountBMin,address to,uint256 deadline)) returns(uint256,uint256,uint256)', 'function removeLiquidity((address tokenA,address tokenB,bool stable,uint256 liquidity,uint256 amountAMin,uint256 amountBMin,address to,uint256 deadline)) returns(uint256,uint256)']
  const positionsAbi = ['function balanceOf(address) view returns(uint256)', 'function tokenOfOwnerByIndex(address,uint256) view returns(uint256)', 'function positions(uint256) view returns(uint96,address,address,address,uint24,int24,int24,uint128,uint256,uint256,uint128,uint128)', 'function collect((uint256 tokenId,address recipient,uint128 amount0Max,uint128 amount1Max)) returns(uint256,uint256)']
  const multiAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const erc20 = new ethers.utils.Interface(erc20Abi); const pair = new ethers.utils.Interface(pairAbi); const cl = new ethers.utils.Interface(clAbi)
  const chef = new ethers.utils.Interface(chefAbi); const clChef = new ethers.utils.Interface(clChefAbi); const controller = new ethers.utils.Interface(controllerAbi); const router = new ethers.utils.Interface(routerAbi); const positions = new ethers.utils.Interface(positionsAbi)
  const state = { rpc: null, eip1193: null, account: null, walletChain: null, bound: false, tokens: new Map(), classic: [], cl: [], classicFarms: [], clFarms: [], clStakeState: null, giga: null, prices: new Map(), block: null, showZero: false, action: null, actionInfo: null, sending: false, status: '', spinner: null, reownUnsubscribe: null, walletPositions: [] }
  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const short = value => value ? value.slice(0, 6) + '…' + value.slice(-4) : '—'
  const isUsdG = value => lower(value) === lower(address.usdg)
  const compact = (value, digits) => { if (!Number.isFinite(value) || value < 0) return '—'; if (value >= 1e9) return (value / 1e9).toFixed(digits === undefined ? 2 : digits) + 'b'; if (value >= 1e6) return (value / 1e6).toFixed(digits === undefined ? 2 : digits) + 'm'; if (value >= 1e3) return (value / 1e3).toFixed(digits === undefined ? 2 : digits) + 'k'; if (value >= 1) return value.toFixed(digits === undefined ? 2 : digits); return value > 0 ? value.toPrecision(3) : '0' }
  const percent = value => Number.isFinite(value) && value >= 0 ? compact(value, 2) + '%' : '—'
  const usd = value => Number.isFinite(value) && value >= 0 ? '$' + compact(value) : '—'
  const errText = error => String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').slice(0, 360)
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const format = (amount, decimals, places) => { try { if (amount === null || amount === undefined || decimals === null || decimals === undefined) return '—'; const parts = ethers.utils.formatUnits(amount, decimals).split('.'); const tail = (parts[1] || '').slice(0, places === undefined ? 5 : places).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const num = (amount, decimals) => { const value = Number(format(amount, decimals, 14)); return Number.isFinite(value) ? value : NaN }
  const unitsNum = (amount, decimals) => { try { const value = Number(ethers.utils.formatUnits(amount, decimals)); return Number.isFinite(value) ? value : NaN } catch (_) { return NaN } }
  const token = value => state.tokens.get(lower(value)) || { address: value, symbol: short(value), name: short(value), decimals: null }
  const correctChain = () => state.walletChain === chain.id
  const injected = () => window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null

  function setStatus (text, kind) { state.status = text || ''; const node = byId('giga-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (text) { const box = byId('giga-loading'); const label = byId('giga-loading-text'); const spin = byId('giga-loading-spin'); if (!box) return; box.hidden = !text; if (text && label) label.textContent = text; if (text && !state.spinner) { let index = 0; state.spinner = window.setInterval(() => { spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) } if (!text && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }
  async function limited (items, n, fn) { const out = new Array(items.length); let next = 0; async function worker () { while (next < items.length) { const i = next++; out[i] = await fn(items[i], i) } } await Promise.all(Array.from({ length: Math.min(n, Math.max(1, items.length)) }, worker)); return out }
  async function batch (calls, blockTag) {
    if (!calls.length) return []
    const chunks = []; for (let i = 0; i < calls.length; i += 200) chunks.push(calls.slice(i, i + 200))
    const mc = new ethers.Contract(address.multicall, multiAbi, state.rpc)
    async function readGroup (group) {
      const encoded = group.map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }))
      const decode = (call, raw) => { try { const value = call.iface.decodeFunctionResult(call.method, raw); return call.decode ? call.decode(value) : value.length === 1 ? value[0] : value } catch (_) { return call.fallback } }
      let lastError
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try { const values = await mc.aggregate3(encoded, blockTag === undefined ? {} : { blockTag }); return values.map((value, i) => value.success ? decode(group[i], value.returnData) : group[i].fallback) } catch (error) { lastError = error; if (attempt < 2) await new Promise(resolve => window.setTimeout(resolve, 400 * (attempt + 1))) }
      }
      if (group.length > 16) { const middle = Math.ceil(group.length / 2); const halves = await Promise.all([readGroup(group.slice(0, middle)), readGroup(group.slice(middle))]); return halves[0].concat(halves[1]) }
      console.warn('GIGA Multicall3 group failed; bounded direct fallback.', errText(lastError))
      return limited(group, 4, async (call, i) => { try { return decode(call, await state.rpc.call({ to: call.target, data: encoded[i].callData }, blockTag)) } catch (_) { return call.fallback } })
    }
    const results = await limited(chunks, 2, readGroup)
    return [].concat(...results)
  }
  async function discover () {
    loading('Reading GIGA farms…'); state.clStakeState = null
    const heads = await batch([{ target: address.classicChef, iface: chef, method: 'poolLength', fallback: ethers.constants.Zero }, { target: address.classicChef, iface: chef, method: 'totalAllocPoint', fallback: ethers.constants.Zero }, { target: address.classicChef, iface: chef, method: 'rewardToken', fallback: null }, { target: address.clChef, iface: clChef, method: 'poolLength', fallback: ethers.constants.Zero }, { target: address.clChef, iface: clChef, method: 'totalAllocPoint', fallback: ethers.constants.Zero }, { target: address.clChef, iface: clChef, method: 'rewardToken', fallback: null }, { target: address.controller, iface: controller, method: 'totalAllocPoint', fallback: ethers.constants.Zero }, { target: address.controller, iface: controller, method: 'latestPeriodRewardPerSecond', fallback: ethers.constants.Zero }, { target: address.controller, iface: controller, method: 'latestPeriodStartTime', fallback: ethers.constants.Zero }, { target: address.controller, iface: controller, method: 'latestPeriodEndTime', fallback: ethers.constants.Zero }, { target: address.classicChef, iface: chef, method: 'REWARD_PRECISION', fallback: ethers.constants.Zero }])
    state.giga = heads[2] || heads[5]
    const classicCount = Number(heads[0]); const clCount = Number(heads[3]); const farmCalls = []
    for (let pid = 0; pid < classicCount; pid += 1) farmCalls.push({ target: address.classicChef, iface: chef, method: 'poolInfo', args: [pid], fallback: null, decode: value => value })
    const clCalls = []; for (let pid = 0; pid < clCount; pid += 1) clCalls.push({ target: address.clChef, iface: clChef, method: 'poolInfo', args: [pid], fallback: null, decode: value => value })
    const infos = await batch(farmCalls.concat(clCalls)); const classicInfos = infos.slice(0, classicCount); const clInfos = infos.slice(classicCount)
    const now = Math.floor(Date.now() / 1000); const activePeriod = now >= heads[8].toNumber() && now < heads[9].toNumber(); const rewardWei = activePeriod && !heads[10].isZero() ? heads[7].div(heads[10]) : ethers.constants.Zero; const totalAlloc = heads[6]
    const rateWei = alloc => !totalAlloc.isZero() ? rewardWei.mul(alloc).div(totalAlloc) : ethers.constants.Zero
    state.classicFarms = classicInfos.map((info, pid) => info && ({ type: 'classic', pid, lp: info[0], alloc: info[1], totalStaked: info[4], totalAlloc: heads[1], pending: null, user: null, rateWei: rateWei(info[1]), rate: null })) .filter(Boolean)
    state.clFarms = clInfos.map((info, pid) => info && ({ type: 'cl', pid, alloc: info[0], pool: info[1], token0: info[2], token1: info[3], fee: info[4], accounting: info[5], totalAlloc: heads[4], pending: null, gaugeTvl: NaN, rateWei: rateWei(info[0]), rate: null, rateCoverage: null })).filter(farm => farm && [farm.pool, farm.token0, farm.token1].every(value => lower(value) !== lower(ethers.constants.AddressZero)))
    const pools = new Map(); state.clFarms.forEach(farm => pools.set(lower(farm.pool), { address: farm.pool, token0: farm.token0, token1: farm.token1, fee: Number(farm.fee) })); state.cl = [...pools.values()]
    const classicAddresses = [...new Set(state.classicFarms.map(farm => lower(farm.lp)))]; const poolCalls = []
    classicAddresses.forEach(value => poolCalls.push({ target: value, iface: pair, method: 'token0', fallback: null }, { target: value, iface: pair, method: 'token1', fallback: null }, { target: value, iface: pair, method: 'stable', fallback: null }, { target: value, iface: pair, method: 'getReserves', fallback: null, decode: value => value }, { target: value, iface: pair, method: 'totalSupply', fallback: null }))
    state.cl.forEach(pool => poolCalls.push({ target: pool.address, iface: cl, method: 'liquidity', fallback: null }, { target: pool.address, iface: cl, method: 'slot0', fallback: null, decode: value => value }, { target: pool.token0, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null }, { target: pool.token1, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null }))
    const poolValues = await batch(poolCalls); let cursor = 0; state.classic = classicAddresses.map(value => { const token0 = poolValues[cursor++]; const token1 = poolValues[cursor++]; const stable = poolValues[cursor++]; const reserves = poolValues[cursor++]; const totalSupply = poolValues[cursor++]; return token0 && token1 && stable !== null ? { address: ethers.utils.getAddress(value), token0, token1, stable: Boolean(stable), reserves, totalSupply } : null }).filter(Boolean)
    state.cl.forEach(pool => { pool.liquidity = poolValues[cursor++]; pool.slot0 = poolValues[cursor++]; pool.balance0 = poolValues[cursor++]; pool.balance1 = poolValues[cursor++] })
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
    for (let pass = 0; pass < 3; pass += 1) {
      const updates = new Map()
      pools.forEach(pool => {
        const ratio = poolRatio(pool); const [amount0, amount1] = poolAmounts(pool); const key0 = lower(pool.token0); const key1 = lower(pool.token1); const price0 = state.prices.get(key0); const price1 = state.prices.get(key1)
        let key; let price; let depth
        if (Number.isFinite(price0) && !state.prices.has(key1)) { key = key1; price = price0 / ratio; depth = amount0 * price0 }
        if (Number.isFinite(price1) && !state.prices.has(key0)) { key = key0; price = ratio * price1; depth = amount1 * price1 }
        if (key && Number.isFinite(price) && price >= minUsdPrice && price <= maxUsdPrice && Number.isFinite(depth) && depth >= minUsdAnchor && (!updates.has(key) || updates.get(key).depth < depth)) updates.set(key, { price, depth })
      })
      if (!updates.size) break
      updates.forEach((value, key) => state.prices.set(key, value.price))
    }
    pools.forEach(pool => { const [a, b] = poolAmounts(pool); const pa = state.prices.get(lower(pool.token0)); const pb = state.prices.get(lower(pool.token1)); pool.tvl = Number.isFinite(a) && Number.isFinite(b) && Number.isFinite(pa) && Number.isFinite(pb) ? a * pa + b * pb : NaN })
  }
  function farmTvl (farm) { if (farm.type === 'cl') return farm.gaugeTvl; const pool = state.classic.find(value => lower(value.address) === lower(farm.lp)); if (!pool || !Number.isFinite(pool.tvl) || !pool.totalSupply || !farm.totalStaked) return NaN; const share = Number(farm.totalStaked.toString()) / Number(pool.totalSupply.toString()); return Number.isFinite(share) ? pool.tvl * share : NaN }
  function farmPool (farm) { return farm.type === 'classic' ? state.classic.find(value => lower(value.address) === lower(farm.lp)) : state.cl.find(value => lower(value.address) === lower(farm.pool)) }
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
  async function stakedClIds () {
    const countValue = await batch([{ target: address.positions, iface: positions, method: 'balanceOf', args: [address.clChef], fallback: ethers.constants.Zero }]); const count = Number(countValue[0])
    if (!Number.isSafeInteger(count) || count < 0 || count > 5000) throw new Error('Invalid CL Chef NFT balance.')
    const ids = await batch(Array.from({ length: count }, (_, index) => ({ target: address.positions, iface: positions, method: 'tokenOfOwnerByIndex', args: [address.clChef, index], fallback: null })))
    return ids.filter(value => value !== null).map(value => value.toString()).sort((a, b) => ethers.BigNumber.from(a).lt(b) ? -1 : 1)
  }
  async function activeClStakes () {
    const ids = await stakedClIds(); const calls = []
    ids.forEach(id => calls.push({ target: address.clChef, iface: clChef, method: 'userPositionInfos', args: [id], fallback: null, decode: value => value }, { target: address.positions, iface: positions, method: 'positions', args: [id], fallback: null, decode: value => value }))
    const values = await batch(calls); const known = new Set(state.clFarms.map(farm => farm.pid)); const stakes = []
    ids.forEach((id, i) => { const info = values[i * 2]; const position = values[i * 2 + 1]; const pid = info ? Number(info[6]) : NaN; if (position && known.has(pid)) stakes.push({ id, pid, position, info }) })
    return { ids, stakes, retired: ids.length - stakes.length }
  }
  function applyFarmRates () { const decimals = token(state.giga).decimals; state.classicFarms.concat(state.clFarms).forEach(farm => { farm.rate = unitsNum(farm.rateWei, decimals) }) }
  function applyClFarmTvls (clState) {
    state.clStakeState = clState
    state.clFarms.forEach(farm => { const members = clState.stakes.filter(stake => stake.pid === farm.pid); const values = members.map(stake => clPositionValue(stake.position, farm)); farm.gaugeTvl = values.length === 0 ? 0 : values.every(Number.isFinite) ? values.reduce((sum, value) => sum + value, 0) : NaN; farm.rateCoverage = members.length })
  }

  function walletLabel () { if (state.account) return short(state.account) + (correctChain() ? '' : ' · wrong chain'); return '' }
  function renderSummary () {
    const wallet = byId('giga-wallet-status'); if (wallet) wallet.textContent = walletLabel()
  }
  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'giga-action', disabled: disabled || state.sending }); node.addEventListener('click', () => fn().catch(error => setStatus(errText(error), 'error'))); return node }
  function addHeader (table, labels) { const row = table.insertRow(); labels.forEach(label => row.appendChild(e('th', { text: label }))) }
  function addCell (row, text, className) { row.appendChild(e('td', { text, className })) }
  function nameCell (title, line) { const cell = e('td'); cell.appendChild(e('span', { text: title, className: 'giga-name' })); if (line) cell.appendChild(e('span', { text: line, className: 'giga-sub' })); return cell }
  function poolLabel (pool) { const a = token(pool.token0); const b = token(pool.token1); return a.symbol + ' / ' + b.symbol + (pool.stable !== undefined ? (pool.stable ? ' · stable' : ' · volatile') : ' · CL ' + (pool.fee / 10000) + '%') }
  function renderFarms () {
    const target = byId('giga-farms'); target.textContent = ''
    const list = state.classicFarms.concat(state.clFarms).filter(farm => state.showZero || Number.isFinite(farmApr(farm)))
    const table = e('table', { className: 'giga-table' })
    addHeader(table, ['Farm', 'Staked', 'Unstaked', 'APR', 'Rewards / week', 'Actions'])
    list.forEach(farm => {
      const pool = farmPool(farm)
      const title = (pool ? poolLabel(pool) : short(farm.type === 'classic' ? farm.lp : farm.pool)) + ' · ' + (farm.type === 'classic' ? 'V2' : 'CL') + ' #' + farm.pid
      const row = table.insertRow()
      row.appendChild(nameCell(title))
      const staked = farmTvl(farm)
      const poolTvl = pool && pool.tvl
      const unstaked = Number.isFinite(staked) && Number.isFinite(poolTvl) ? Math.max(0, poolTvl - staked) : NaN
      addCell(row, Number.isFinite(staked) ? usd(staked) : '—', Number.isFinite(staked) ? '' : 'giga-unpriced')
      addCell(row, Number.isFinite(unstaked) ? usd(unstaked) : '—', Number.isFinite(unstaked) ? '' : 'giga-unpriced')
      const apr = farmApr(farm)
      addCell(row, farm.rate === 0 ? '0.00%' : Number.isFinite(apr) ? percent(apr) : Number.isFinite(farm.rate) ? '—' : '…', Number.isFinite(apr) || farm.rate === 0 ? '' : 'giga-unpriced')
      const weekly = Number.isFinite(farm.rate) ? farm.rate * secondsPerWeek : NaN; const gigaPrice = state.giga && state.prices.get(lower(state.giga)); const weeklyUsd = weekly * gigaPrice
      addCell(row, Number.isFinite(weekly) ? compact(weekly, 5) + ' GIGA\n' + usd(weeklyUsd) : '—', Number.isFinite(weeklyUsd) ? '' : 'giga-unpriced')
      const actions = e('td', { className: 'giga-actions' })
      if (farm.type === 'classic') { if (pool) append(actions, button('add', () => openAction('add', pool)), button('remove', () => openAction('remove', pool))); append(actions, button('stake', () => openAction('stake', farm)), button('unstake', () => openAction('unstake', farm)), button('claim', () => openAction('claim', farm))) }
      else append(actions, button('claim', () => openAction('clHarvest', farm)), button('unstake', () => openAction('clWithdraw', farm)))
      row.appendChild(actions)
    })
    target.appendChild(table)
  }
  function renderPositions () {
    const target = byId('giga-positions'); target.textContent = ''
    const classic = state.classicFarms.filter(farm => farm.user && ((!farm.user[0].isZero()) || (farm.pending && !farm.pending.isZero())))
    target.hidden = !state.account || (!classic.length && !state.walletPositions.length); if (target.hidden) return
    const table = e('table', { className: 'giga-table' }); addHeader(table, ['Position', 'Amount / rewards', 'Actions'])
    classic.forEach(farm => { const pool = state.classic.find(value => lower(value.address) === lower(farm.lp)); const lp = token(farm.lp); const row = table.insertRow(); row.appendChild(nameCell('V2 #' + farm.pid, pool ? poolLabel(pool) : short(farm.lp))); addCell(row, 'staked ' + format(farm.user[0], lp.decimals) + ' ' + lp.symbol + '\npending ' + format(farm.pending, token(state.giga).decimals) + ' GIGA'); const actions = e('td', { className: 'giga-actions' }); append(actions, button('stake', () => openAction('stake', farm)), button('unstake', () => openAction('unstake', farm)), button('claim', () => openAction('claim', farm))); row.appendChild(actions) })
    state.walletPositions.forEach(position => { const row = table.insertRow(); row.appendChild(nameCell((position.staked ? 'staked NFT #' : 'NFT #') + position.id, token(position.token0).symbol + ' / ' + token(position.token1).symbol + ' · ' + position.fee)); addCell(row, format(position.liquidity, 0) + (position.staked ? '\n' + format(position.pending, token(state.giga).decimals) + ' GIGA' : '')); const actions = e('td', { className: 'giga-actions' }); if (position.staked) append(actions, button('claim', () => openAction('clHarvest', position)), button('unstake', () => openAction('clWithdraw', position))); else actions.appendChild(button('collect', () => openAction('collect', position))); row.appendChild(actions) })
    target.appendChild(table)
  }
  function renderPrice () { const node = byId('giga-price'); if (!node) return; const price = state.giga && state.prices.get(lower(state.giga)); const v2 = state.classic.find(pool => (lower(pool.token0) === lower(state.giga) && isUsdG(pool.token1)) || (lower(pool.token1) === lower(state.giga) && isUsdG(pool.token0))); node.textContent = Number.isFinite(price) ? 'GIGA ' + usd(price) + (v2 && Number.isFinite(v2.tvl) ? ' · ' + usd(v2.tvl) : '') : 'GIGA —' }
  function render () { renderSummary(); renderPrice(); renderFarms(); renderPositions(); if (state.action) renderAction() }

  function actionTitle () { const a = state.action; if (!a) return ''; const names = { add: 'Add liquidity', remove: 'Remove liquidity', stake: 'Stake', unstake: 'Unstake', claim: 'Claim', clHarvest: 'Claim', clWithdraw: 'Unstake', collect: 'Collect' }; return (names[a.kind] || a.kind) + ' · ' + (a.entry.pid !== undefined ? '#' + a.entry.pid : poolLabel(a.entry)) }
  function actionAssets () { const a = state.action; if (!a) return []; if (a.kind === 'add') return [token(a.entry.token0), token(a.entry.token1)]; if (a.kind === 'remove' || a.kind === 'stake' || a.kind === 'unstake') return [token(a.kind === 'remove' ? a.entry.address : a.entry.lp)]; return [] }
  function spender () { const a = state.action; if (!a) return null; if (a.kind === 'add' || a.kind === 'remove') return address.classicRouter; if (a.kind === 'stake' || a.kind === 'unstake') return address.classicChef; return null }
  function inputLabel (index) { const a = state.action; if (a.kind === 'add') return actionAssets()[index].symbol; if (a.kind === 'remove' || a.kind === 'stake' || a.kind === 'unstake') return 'LP'; if (a.kind === 'clHarvest' || a.kind === 'clWithdraw') return 'NFT'; return '' }
  function needsApproval () { return ['add', 'remove', 'stake'].includes(state.action && state.action.kind) }
  function parseAmount (value, asset) { if (!/^\d+(\.\d+)?$/.test(String(value || '').trim())) throw new Error('Enter a positive exact decimal amount.'); if (asset.decimals === null) throw new Error('This token has no usable onchain decimals.'); const amount = ethers.utils.parseUnits(String(value).trim(), asset.decimals); if (amount.lte(0)) throw new Error('Enter an amount greater than zero.'); return amount }
  function parseMinimum (value, asset) { if (!/^\d+(\.\d+)?$/.test(String(value || '').trim())) throw new Error('Enter an exact minimum amount.'); if (asset.decimals === null) throw new Error('This token has no usable onchain decimals.'); return ethers.utils.parseUnits(String(value).trim(), asset.decimals) }
  async function openAction (kind, entry) { state.action = { kind, entry, amounts: kind === 'claim' || kind === 'collect' ? [] : [''], minimums: kind === 'add' || kind === 'remove' ? ['0', '0'] : [], tokenId: kind === 'collect' ? String(entry.id) : '' }; state.actionInfo = null; const dialog = byId('giga-action-dialog'); if (!dialog.open) dialog.showModal(); renderAction(); if (state.account && correctChain()) { await refreshActionInfo(); renderAction() } }
  async function refreshActionInfo () { const a = state.action; if (!a || !state.account) return; const assets = actionAssets(); const calls = []; assets.forEach(asset => calls.push({ target: asset.address, iface: erc20, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero }, { target: asset.address, iface: erc20, method: 'allowance', args: [state.account, spender()], fallback: ethers.constants.Zero })); if (a.kind === 'unstake' || a.kind === 'claim') calls.push({ target: address.classicChef, iface: chef, method: 'userInfo', args: [a.entry.pid, state.account], fallback: null, decode: value => value }); const values = await batch(calls); a.info = { assets: assets.map((asset, i) => ({ asset, balance: values[i * 2], allowance: values[i * 2 + 1] })), user: ['unstake', 'claim'].includes(a.kind) ? values[assets.length * 2] : null }; state.actionInfo = a.info }
  function buildAction () { const a = state.action; const account = state.account; if (!a || !account) throw new Error('Connect a wallet first.'); const deadline = Math.floor(Date.now() / 1000) + 20 * 60; if (a.kind === 'add') { const assets = actionAssets(); const x = parseAmount(a.amounts[0], assets[0]); const y = parseAmount(a.amounts[1], assets[1]); const min0 = parseMinimum(a.minimums[0], assets[0]); const min1 = parseMinimum(a.minimums[1], assets[1]); return { to: address.classicRouter, data: router.encodeFunctionData('addLiquidity', [[a.entry.token0, a.entry.token1, a.entry.stable, x, y, min0, min1, account, deadline]]), amounts: [x, y], assets, minimums: [min0, min1] } } if (a.kind === 'remove') { const amount = parseAmount(a.amounts[0], token(a.entry.address)); const assets = [token(a.entry.token0), token(a.entry.token1)]; const min0 = parseMinimum(a.minimums[0], assets[0]); const min1 = parseMinimum(a.minimums[1], assets[1]); return { to: address.classicRouter, data: router.encodeFunctionData('removeLiquidity', [[a.entry.token0, a.entry.token1, a.entry.stable, amount, min0, min1, account, deadline]]), amounts: [amount], assets: actionAssets(), minimums: [min0, min1] } } if (a.kind === 'stake') { const amount = parseAmount(a.amounts[0], token(a.entry.lp)); return { to: address.classicChef, data: chef.encodeFunctionData('deposit', [a.entry.pid, amount]), amounts: [amount], assets: actionAssets() } } if (a.kind === 'unstake') { const amount = parseAmount(a.amounts[0], token(a.entry.lp)); return { to: address.classicChef, data: chef.encodeFunctionData('withdraw', [a.entry.pid, amount]), amounts: [], assets: [] } } if (a.kind === 'claim') return { to: address.classicChef, data: chef.encodeFunctionData('deposit', [a.entry.pid, 0]), amounts: [], assets: [] }; if (a.kind === 'clHarvest') { const id = ethers.BigNumber.from(a.tokenId); return { to: address.clChef, data: clChef.encodeFunctionData('harvest', [id, account]), amounts: [], assets: [] } } if (a.kind === 'clWithdraw') { const id = ethers.BigNumber.from(a.tokenId); return { to: address.clChef, data: clChef.encodeFunctionData('withdraw', [id]), amounts: [], assets: [] } } if (a.kind === 'collect') return { to: address.positions, data: positions.encodeFunctionData('collect', [[ethers.BigNumber.from(a.tokenId), account, ethers.constants.MaxUint256.mask(128), ethers.constants.MaxUint256.mask(128)]]), amounts: [], assets: [] }; throw new Error('Unsupported direct GIGA action.') }
  function buildApproval (index) { const tx = buildAction(); const item = tx.assets[index]; if (!item) throw new Error('This direct action does not require an ERC-20 approval.'); return { to: item.address, data: erc20.encodeFunctionData('approve', [tx.to, tx.amounts[index]]), label: 'exact ' + item.symbol + ' approval' } }
  async function preflight (tx) { try { await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data }, 'latest'] }) } catch (error) { throw new Error('Exact eth_call preflight failed: ' + errText(error)) } }
  async function send (tx, label) { await preflight(tx); setStatus('Confirm in wallet…'); const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data }] }); setStatus(hash + ' · pending'); const receipt = await state.rpc.waitForTransaction(hash, 1, 180000); if (!receipt || receipt.status !== 1) throw new Error(label + ' failed.') }
  async function approve (index) { state.sending = true; renderAction(); try { await send(buildApproval(index), 'Approval'); await refreshActionInfo(); setStatus('Approved.', 'success') } finally { state.sending = false; renderAction() } }
  async function submit () { state.sending = true; renderAction(); try { const tx = buildAction(); if (tx.minimums && tx.minimums.some(value => value.isZero()) && !window.confirm('A zero minimum has no slippage protection. Continue?')) throw new Error('Cancelled.'); if (needsApproval()) tx.assets.forEach((asset, i) => { if (!state.actionInfo.assets[i].allowance.gte(tx.amounts[i])) throw new Error('Approve ' + asset.symbol + ' first.'); if (state.actionInfo.assets[i].balance.lt(tx.amounts[i])) throw new Error('Insufficient ' + asset.symbol + '.') }); await send(tx, actionTitle()); await hydrateWallet(); await refreshAll(false); setStatus('Confirmed.', 'success') } finally { state.sending = false; render() } }
  function renderAction () { const dialog = byId('giga-action-dialog'); const box = byId('giga-action-content'); if (!state.action || !dialog || !box) return; const a = state.action; box.textContent = ''; box.appendChild(e('h2', { id: 'giga-action-title', text: actionTitle() })); if (!state.account) { box.appendChild(e('p', { text: 'Connect wallet.' })); return } if (!correctChain()) { box.appendChild(e('p', { text: 'Switch to Robinhood Chain.' })); return } if (a.kind === 'clHarvest' || a.kind === 'clWithdraw') { const row = e('label', { className: 'giga-input' }); row.appendChild(document.createTextNode('NFT : ')); const input = e('input'); input.value = a.tokenId; input.inputMode = 'numeric'; input.addEventListener('input', () => { a.tokenId = input.value }); row.appendChild(input); box.appendChild(row) } else { actionAssets().forEach((asset, i) => { const row = e('label', { className: 'giga-input' }); row.appendChild(document.createTextNode(inputLabel(i) + ' : ')); const input = e('input'); input.value = a.amounts[i] || ''; input.inputMode = 'decimal'; input.placeholder = '0.0'; input.addEventListener('input', () => { a.amounts[i] = input.value }); row.appendChild(input); if (state.actionInfo && state.actionInfo.assets[i]) { const max = button('max', () => { a.amounts[i] = format(state.actionInfo.assets[i].balance, asset.decimals, asset.decimals); renderAction(); }); row.appendChild(max) } box.appendChild(row); if (state.actionInfo && state.actionInfo.assets[i]) box.appendChild(e('p', { text: asset.symbol + ' ' + format(state.actionInfo.assets[i].balance, asset.decimals) })) }); if (a.minimums && a.minimums.length) { const assets = [token(a.entry.token0), token(a.entry.token1)]; assets.forEach((asset, i) => { const row = e('label', { className: 'giga-input' }); row.appendChild(document.createTextNode(asset.symbol + ' min : ')); const input = e('input'); input.value = a.minimums[i]; input.inputMode = 'decimal'; input.addEventListener('input', () => { a.minimums[i] = input.value }); row.appendChild(input); box.appendChild(row) }) } if (a.kind === 'unstake' && state.actionInfo && state.actionInfo.user) box.appendChild(e('p', { text: token(a.entry.lp).symbol + ' ' + format(state.actionInfo.user[0], token(a.entry.lp).decimals) })) }
    const actions = e('div', { className: 'giga-dialog-actions' }); if (needsApproval()) actionAssets().forEach((asset, i) => actions.appendChild(button('approve ' + asset.symbol, () => approve(i), !state.actionInfo || !a.amounts[i]))); actions.appendChild(button('submit', submit, state.sending)); box.appendChild(actions) }

  async function hydrateWallet () {
    if (!state.account) return
    const calls = []; state.classicFarms.forEach(farm => calls.push({ target: address.classicChef, iface: chef, method: 'userInfo', args: [farm.pid, state.account], fallback: null, decode: value => value }, { target: address.classicChef, iface: chef, method: 'pendingReward', args: [farm.pid, state.account], fallback: ethers.constants.Zero }))
    const values = await batch(calls); state.classicFarms.forEach((farm, i) => { farm.user = values[i * 2]; farm.pending = values[i * 2 + 1] })
    try {
      const [balanceValue, clState] = await Promise.all([batch([{ target: address.positions, iface: positions, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero }]), state.clStakeState ? Promise.resolve(state.clStakeState) : activeClStakes()]); const ownedCount = Number(balanceValue[0])
      if (!Number.isSafeInteger(ownedCount) || ownedCount < 0 || ownedCount > 5000) throw new Error('Invalid wallet NFT balance.')
      const ownedIds = (await batch(Array.from({ length: ownedCount }, (_, index) => ({ target: address.positions, iface: positions, method: 'tokenOfOwnerByIndex', args: [state.account, index], fallback: null })))).filter(value => value !== null).map(value => value.toString()).slice(0, 80)
      const staked = clState.stakes.filter(stake => stake.info && lower(stake.info[5]) === lower(state.account)).slice(0, 80); const positionCalls = ownedIds.map(id => ({ target: address.positions, iface: positions, method: 'positions', args: [id], fallback: null, decode: value => value })).concat(staked.map(stake => ({ target: address.clChef, iface: clChef, method: 'pendingReward', args: [stake.id], fallback: ethers.constants.Zero })))
      const decoded = await batch(positionCalls); const direct = ownedIds.map((id, index) => { const value = decoded[index]; return value && ({ id, token0: value[2], token1: value[3], fee: value[4].toString(), liquidity: value[7], staked: false, pending: null }) }).filter(Boolean)
      const deposited = staked.map((stake, index) => ({ id: stake.id, token0: stake.position[2], token1: stake.position[3], fee: stake.position[4].toString(), liquidity: stake.position[7], staked: true, pending: decoded[ownedIds.length + index] })); state.walletPositions = direct.concat(deposited)
    } catch (error) { console.warn('Direct CL position read unavailable', errText(error)); state.walletPositions = [] }
  }
  async function adopt (provider, accounts, walletChain, withWallet) { if (!provider || !accounts || !accounts[0]) return false; state.eip1193 = provider; state.account = ethers.utils.getAddress(accounts[0]); state.walletChain = walletChain; if (!state.bound && provider.on) { state.bound = true; provider.on('accountsChanged', () => restore().catch(fatal)); provider.on('chainChanged', () => restore().catch(fatal)) } render(); if (withWallet !== false) { await hydrateWallet(); render() } return true }
  async function restore (withWallet) { const provider = injected(); if (!provider) { state.account = null; state.walletChain = null; render(); return false } try { const result = await Promise.all([provider.request({ method: 'eth_accounts' }), provider.request({ method: 'eth_chainId' })]); if (!result[0] || !result[0][0]) { state.account = null; state.walletChain = result[1]; render(); return false } return adopt(provider, result[0], result[1], withWallet) } catch (error) { state.account = null; render(); return false } }
  async function connectInjected () { const provider = injected(); if (!provider) { setStatus('No injected wallet.', 'error'); return } const accounts = await provider.request({ method: 'eth_requestAccounts' }); const walletChain = await provider.request({ method: 'eth_chainId' }); await adopt(provider, accounts, walletChain); setStatus(correctChain() ? '' : 'Switch to Robinhood Chain.', correctChain() ? '' : 'error') }
  async function connectOther () { const reown = await import('./config.js'); const kit = reown.createAppKitInstance(process.env.REOWN_PROJECT_ID || '3e6154a7158ff5f7509f24405fc3b551'); if (!kit) throw new Error('Optional wallet support is unavailable.'); const onAccount = async account => { if (!account || !account.isConnected) return; const provider = await kit.getWalletProvider(); await adopt(provider, await provider.request({ method: 'eth_accounts' }), await provider.request({ method: 'eth_chainId' })); if (state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null } }; if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true }); if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error'))); await kit.open() }
  async function refreshAll (withDiscovery) { loading('refresh'); if (withDiscovery) { await discover(); await loadTokens(); pricePools(); applyFarmRates() } else await hydratePools(); applyClFarmTvls(await activeClStakes()); await hydrateWallet(); loading(); render() }
  function bind () { byId('giga-connect').addEventListener('click', () => connectInjected().catch(error => setStatus(errText(error), 'error'))); byId('giga-other-wallet').addEventListener('click', () => connectOther().catch(error => setStatus(errText(error), 'error'))); byId('giga-zero-toggle').addEventListener('click', () => { state.showZero = !state.showZero; byId('giga-zero-toggle').textContent = state.showZero ? '[ hide inactive ]' : '[ show inactive ]'; renderFarms(); renderSummary() }); byId('giga-refresh').addEventListener('click', () => refreshAll(true).then(() => setStatus('')).catch(error => setStatus(errText(error), 'error'))) }
  async function start () { state.rpc = new ethers.providers.StaticJsonRpcProvider(chain.rpc, { chainId: chain.number, name: 'robinhood' }); bind(); render(); await discover(); const clStakes = activeClStakes(); loading('metadata'); await loadTokens(); pricePools(); applyFarmRates(); render(); applyClFarmTvls(await clStakes); loading(); render(); setStatus(''); await restore(false); if (state.account) hydrateWallet().then(render).catch(error => console.warn('GIGA wallet hydration failed', errText(error))) }
  function fatal (error) { console.error('GIGA page load failed', error); loading(); setStatus(errText(error), 'error'); const target = byId('giga-farms'); if (target) { target.textContent = ''; target.appendChild(e('pre', { text: errText(error) })) } }
  return { start, fatal }
})()
