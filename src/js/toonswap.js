/* ToonSwap on Ethereum: factory pairs, MasterChef farms, direct EIP-1193. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { ToonPage.start().catch(ToonPage.fatal) })

const ToonPage = (function () {
  const chain = {
    id: '0x1', number: 1, name: 'Ethereum', rpc: 'https://ethereum-rpc.publicnode.com',
    explorer: 'https://etherscan.io', nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
  }
  // Published ToonSwap deployments. Pool and farm rows come from the factory and MasterChef.
  const address = {
    chef: '0x882A0f0BCe7b703DfE06D142A69f4920EB954465',
    factory: '0xE71205b53e2D48d8972b2e259028D83e24AE2a6B',
    router: '0x7481313e8A71437B67d9Dd03ae38c5aB1531E0Ae',
    toon: '0x12605027AF4A482BE2799dD8F38F095Aa093CCC4',
    supra: '0xDC7404100A092c898E93708EF73F3322A7acc213',
    usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  // updatePool accrues 74.79% of cakeReward to stakers. pendingCake() accrues 100%
  // and overstates what deposit and withdraw actually pay.
  const stakerBps = 7479
  const maxSupply = ethers.utils.parseUnits('16868000', 18)
  const minUsdAnchor = 1000
  const minUsdPrice = 1e-12
  const maxUsdPrice = 1e9
  const secondsPerYear = 365 * 24 * 60 * 60
  const secondsPerWeek = 7 * 24 * 60 * 60
  const scale12 = ethers.BigNumber.from(10).pow(12)
  const erc20Abi = ['function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function balanceOf(address) view returns(uint256)', 'function totalSupply() view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)']
  const pairAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function getReserves() view returns(uint112,uint112,uint32)', 'function totalSupply() view returns(uint256)']
  const chefAbi = ['function poolLength() view returns(uint256)', 'function totalAllocPoint() view returns(uint256)', 'function cakePerSecond() view returns(uint256)', 'function startTime() view returns(uint256)', 'function BONUS_MULTIPLIER() view returns(uint256)', 'function poolInfo(uint256) view returns(address,uint256,uint256,uint256)', 'function userInfo(uint256,address) view returns(uint256,uint256)', 'function deposit(uint256,uint256)', 'function withdraw(uint256,uint256)', 'function emergencyWithdraw(uint256)']
  const factoryAbi = ['function allPairsLength() view returns(uint256)', 'function allPairs(uint256) view returns(address)']
  const routerAbi = ['function addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256) returns(uint256,uint256,uint256)', 'function removeLiquidity(address,address,uint256,uint256,uint256,address,uint256) returns(uint256,uint256)']
  const multiAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const erc20 = new ethers.utils.Interface(erc20Abi)
  const pair = new ethers.utils.Interface(pairAbi)
  const chef = new ethers.utils.Interface(chefAbi)
  const factory = new ethers.utils.Interface(factoryAbi)
  const router = new ethers.utils.Interface(routerAbi)
  const state = {
    rpc: null, eip1193: null, account: null, walletChain: null,
    tokens: new Map(), pairs: [], farms: [], prices: new Map(), block: null, now: 0,
    totalAlloc: ethers.constants.Zero, cakePerSecond: ethers.constants.Zero, bonus: ethers.constants.One,
    supply: ethers.constants.Zero, startTime: 0, showZero: false, action: null, sending: false, status: '', spinner: null, reownUnsubscribe: null,
    boundProvider: null, accountListener: null, chainListener: null
  }
  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const short = value => value ? value.slice(0, 6) + '…' + value.slice(-4) : '—'
  const isStable = value => [address.usdc, address.usdt, address.dai].some(item => lower(item) === lower(value))
  const compact = (value, digits) => { if (!Number.isFinite(value) || value < 0) return '—'; if (value >= 1e9) return (value / 1e9).toFixed(digits === undefined ? 2 : digits) + 'b'; if (value >= 1e6) return (value / 1e6).toFixed(digits === undefined ? 2 : digits) + 'm'; if (value >= 1e3) return (value / 1e3).toFixed(digits === undefined ? 2 : digits) + 'k'; if (value >= 1) return value.toFixed(digits === undefined ? 2 : digits); return value > 0 ? value.toPrecision(3) : '0' }
  const percent = value => Number.isFinite(value) && value >= 0 ? compact(value, 2) + '%' : '—'
  const usd = value => Number.isFinite(value) && value >= 0 ? '$' + compact(value) : '—'
  const priceText = value => { if (!Number.isFinite(value) || value <= 0) return '—'; if (value >= 1000) return '$' + compact(value); if (value >= 1) return '$' + value.toFixed(2); if (value >= 0.01) return '$' + value.toFixed(4); return '$' + value.toPrecision(4) }
  const errText = error => String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').slice(0, 360)
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const format = (amount, decimals, places) => { try { if (amount === null || amount === undefined || decimals === null || decimals === undefined) return '—'; const parts = ethers.utils.formatUnits(amount, decimals).split('.'); const tail = (parts[1] || '').slice(0, places === undefined ? 5 : places).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const units = (amount, decimals) => { try { const value = Number(ethers.utils.formatUnits(amount, decimals)); return Number.isFinite(value) ? value : NaN } catch (_) { return NaN } }
  const token = value => state.tokens.get(lower(value)) || { address: value, symbol: short(value), decimals: null }
  const hexChain = value => '0x' + Number(value).toString(16)
  const correctChain = () => state.walletChain === chain.id
  const injected = () => window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null

  function setStatus (text, kind) { state.status = text || ''; const node = byId('toon-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (text) { const box = byId('toon-loading'); const label = byId('toon-loading-text'); const spin = byId('toon-loading-spin'); if (!box) return; box.hidden = !text; if (text && label) label.textContent = text; if (text && !state.spinner) { let index = 0; state.spinner = window.setInterval(() => { spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) } if (!text && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }
  async function limited (items, n, fn) { const out = new Array(items.length); let next = 0; async function worker () { while (next < items.length) { const i = next++; out[i] = await fn(items[i], i) } } await Promise.all(Array.from({ length: Math.min(n, Math.max(1, items.length)) }, worker)); return out }
  async function batch (calls, blockTag) {
    if (!calls.length) return []
    const chunks = []; for (let i = 0; i < calls.length; i += 80) chunks.push(calls.slice(i, i + 80))
    const mc = new ethers.Contract(address.multicall, multiAbi, state.rpc)
    async function readGroup (group) {
      const encoded = group.map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }))
      const decode = (call, raw) => { try { const value = call.iface.decodeFunctionResult(call.method, raw); return call.decode ? call.decode(value) : value.length === 1 ? value[0] : value } catch (_) { return call.fallback } }
      let lastError
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try { const values = await mc.aggregate3(encoded, blockTag === undefined ? {} : { blockTag }); return values.map((value, i) => value.success ? decode(group[i], value.returnData) : group[i].fallback) } catch (error) { lastError = error; if (attempt < 2) await new Promise(resolve => window.setTimeout(resolve, 400 * (attempt + 1))) }
      }
      if (group.length > 8) { const middle = Math.ceil(group.length / 2); const halves = await Promise.all([readGroup(group.slice(0, middle)), readGroup(group.slice(middle))]); return halves[0].concat(halves[1]) }
      return limited(group, 3, async (call, i) => { try { return decode(call, await state.rpc.call({ to: call.target, data: encoded[i].callData }, blockTag)) } catch (_) { return call.fallback } })
    }
    const results = await limited(chunks, 2, readGroup)
    return [].concat(...results)
  }

  async function discover () {
    loading('Reading ToonSwap farms…')
    const block = await state.rpc.getBlock('latest')
    state.block = block.number
    state.now = block.timestamp
    const heads = await batch([
      { target: address.chef, iface: chef, method: 'poolLength', fallback: null },
      { target: address.chef, iface: chef, method: 'totalAllocPoint', fallback: ethers.constants.Zero },
      { target: address.chef, iface: chef, method: 'cakePerSecond', fallback: ethers.constants.Zero },
      { target: address.chef, iface: chef, method: 'startTime', fallback: ethers.constants.Zero },
      { target: address.chef, iface: chef, method: 'BONUS_MULTIPLIER', fallback: ethers.constants.One },
      { target: address.toon, iface: erc20, method: 'totalSupply', fallback: ethers.constants.Zero },
      { target: address.factory, iface: factory, method: 'allPairsLength', fallback: null }
    ])
    if (heads[0] === null || heads[6] === null) throw new Error('ToonSwap farms did not answer.')
    state.totalAlloc = heads[1]
    state.cakePerSecond = heads[2]
    state.startTime = heads[3].toNumber()
    state.bonus = heads[4].isZero() ? ethers.constants.One : heads[4]
    state.supply = heads[5]
    const farmCount = heads[0].toNumber()
    const pairCount = heads[6].toNumber()
    if (!Number.isSafeInteger(farmCount) || farmCount < 0 || farmCount > 200) throw new Error('Unexpected farm count.')
    if (!Number.isSafeInteger(pairCount) || pairCount < 0 || pairCount > 500) throw new Error('Unexpected pair count.')
    const farmInfos = await batch(Array.from({ length: farmCount }, (_, pid) => ({ target: address.chef, iface: chef, method: 'poolInfo', args: [pid], fallback: null, decode: value => value })))
    const pairAddresses = await batch(Array.from({ length: pairCount }, (_, index) => ({ target: address.factory, iface: factory, method: 'allPairs', args: [index], fallback: null })))
    const drafted = farmInfos.map((info, pid) => info && ({ pid, lp: info[0], alloc: info[1], lastRewardTime: info[2], acc: info[3], staked: ethers.constants.Zero, user: null })).filter(farm => farm && lower(farm.lp) !== lower(ethers.constants.AddressZero))
    const seen = new Set()
    const lpList = []
    pairAddresses.forEach(value => { if (value && !seen.has(lower(value))) { seen.add(lower(value)); lpList.push(ethers.utils.getAddress(value)) } })
    drafted.forEach(farm => { if (!seen.has(lower(farm.lp))) { seen.add(lower(farm.lp)); lpList.push(ethers.utils.getAddress(farm.lp)) } })
    const poolCalls = []
    lpList.forEach(value => poolCalls.push(
      { target: value, iface: pair, method: 'token0', fallback: null },
      { target: value, iface: pair, method: 'token1', fallback: null },
      { target: value, iface: pair, method: 'getReserves', fallback: null, decode: value => value },
      { target: value, iface: pair, method: 'totalSupply', fallback: null },
      { target: value, iface: erc20, method: 'balanceOf', args: [address.chef], fallback: ethers.constants.Zero }
    ))
    const poolValues = await batch(poolCalls)
    const pools = new Map()
    lpList.forEach((value, i) => {
      const token0 = poolValues[i * 5]
      const token1 = poolValues[i * 5 + 1]
      const reserves = poolValues[i * 5 + 2]
      const totalSupply = poolValues[i * 5 + 3]
      const chefBalance = poolValues[i * 5 + 4] || ethers.constants.Zero
      if (token0 && token1 && reserves && totalSupply && lower(token0) !== lower(ethers.constants.AddressZero)) pools.set(lower(value), { address: ethers.utils.getAddress(value), token0, token1, reserves, totalSupply, chefBalance, tvl: NaN })
    })
    state.pairs = [...pools.values()]
    state.farms = drafted.map(farm => {
      const pool = pools.get(lower(farm.lp))
      return Object.assign(farm, { pool: pool || null, staked: pool ? pool.chefBalance : ethers.constants.Zero, single: !pool })
    })
    const singles = state.farms.filter(farm => farm.single).map(farm => farm.lp)
    if (singles.length) {
      const balances = await batch(singles.map(value => ({ target: value, iface: erc20, method: 'balanceOf', args: [address.chef], fallback: ethers.constants.Zero })))
      singles.forEach((value, i) => { const farm = state.farms.find(item => lower(item.lp) === lower(value)); if (farm) farm.staked = balances[i] || ethers.constants.Zero })
    }
  }

  async function loadTokens () {
    loading('Reading tokens…')
    const addresses = new Set([address.toon, address.supra, address.usdc, address.usdt, address.dai].map(lower))
    state.pairs.forEach(pool => { addresses.add(lower(pool.address)); addresses.add(lower(pool.token0)); addresses.add(lower(pool.token1)) })
    state.farms.forEach(farm => addresses.add(lower(farm.lp)))
    const list = [...addresses]
    const calls = []
    list.forEach(value => calls.push({ target: value, iface: erc20, method: 'symbol', fallback: null }, { target: value, iface: erc20, method: 'decimals', fallback: null }))
    const values = await batch(calls)
    list.forEach((value, i) => {
      const symbol = values[i * 2] || short(value)
      state.tokens.set(lower(value), { address: ethers.utils.getAddress(value), symbol: String(symbol).replace(/[\r\n]/g, ' ').slice(0, 18), decimals: values[i * 2 + 1] === null ? null : Number(values[i * 2 + 1]) })
    })
  }

  function humanReserves (pool) {
    const a = token(pool.token0); const b = token(pool.token1)
    if (a.decimals === null || b.decimals === null || !pool.reserves) return [NaN, NaN]
    return [units(pool.reserves[0], a.decimals), units(pool.reserves[1], b.decimals)]
  }
  function pricePools () {
    state.prices = new Map([[lower(address.usdc), 1], [lower(address.usdt), 1], [lower(address.dai), 1]])
    const consider = (key, price, depth, bucket) => {
      if (!key || isStable(key) || state.prices.has(key)) return
      if (!Number.isFinite(price) || price < minUsdPrice || price > maxUsdPrice) return
      if (!Number.isFinite(depth) || depth < minUsdAnchor) return
      if (!bucket.has(key) || bucket.get(key).depth < depth) bucket.set(key, { price, depth })
    }
    const direct = new Map()
    state.pairs.forEach(pool => {
      const ratio = (() => { const [x, y] = humanReserves(pool); return x > 0 && Number.isFinite(y) ? y / x : NaN })()
      const [amount0, amount1] = humanReserves(pool)
      if (!Number.isFinite(ratio) || ratio <= 0) return
      if (isStable(pool.token0)) consider(lower(pool.token1), 1 / ratio, amount0, direct)
      if (isStable(pool.token1)) consider(lower(pool.token0), ratio, amount1, direct)
    })
    direct.forEach((value, key) => state.prices.set(key, value.price))
    for (let pass = 0; pass < 3; pass += 1) {
      const updates = new Map()
      state.pairs.forEach(pool => {
        const [amount0, amount1] = humanReserves(pool)
        const ratio = amount0 > 0 && Number.isFinite(amount1) ? amount1 / amount0 : NaN
        if (!Number.isFinite(ratio) || ratio <= 0) return
        const key0 = lower(pool.token0); const key1 = lower(pool.token1)
        const price0 = state.prices.get(key0); const price1 = state.prices.get(key1)
        if (Number.isFinite(price0) && !state.prices.has(key1)) consider(key1, price0 / ratio, amount0 * price0, updates)
        if (Number.isFinite(price1) && !state.prices.has(key0)) consider(key0, ratio * price1, amount1 * price1, updates)
      })
      if (!updates.size) break
      updates.forEach((value, key) => state.prices.set(key, value.price))
    }
    state.pairs.forEach(pool => {
      const [amount0, amount1] = humanReserves(pool)
      const price0 = state.prices.get(lower(pool.token0)); const price1 = state.prices.get(lower(pool.token1))
      pool.tvl = Number.isFinite(amount0) && Number.isFinite(amount1) && Number.isFinite(price0) && Number.isFinite(price1) ? amount0 * price0 + amount1 * price1 : NaN
    })
  }
  function rateWei (alloc) {
    if (!alloc || alloc.isZero() || state.totalAlloc.isZero() || state.cakePerSecond.isZero()) return ethers.constants.Zero
    if (state.supply.gte(maxSupply) || state.now < state.startTime) return ethers.constants.Zero
    return state.cakePerSecond.mul(state.bonus).mul(alloc).mul(stakerBps).div(state.totalAlloc).div(10000)
  }
  function farmRate (farm) { return units(rateWei(farm.alloc), token(address.toon).decimals) }
  function shareOf (amount, supply) { if (!amount || !supply || supply.isZero()) return NaN; const share = Number(amount.mul(1000000).div(supply)) / 1000000; return Number.isFinite(share) ? share : NaN }
  function farmTvl (farm) {
    if (farm.pool) { const share = shareOf(farm.staked, farm.pool.totalSupply); return Number.isFinite(farm.pool.tvl) && Number.isFinite(share) ? farm.pool.tvl * share : NaN }
    const price = state.prices.get(lower(farm.lp)); const amount = units(farm.staked, token(farm.lp).decimals)
    return Number.isFinite(price) && Number.isFinite(amount) ? amount * price : NaN
  }
  function farmApr (farm) {
    const price = state.prices.get(lower(address.toon)); const tvl = farmTvl(farm); const rate = farmRate(farm)
    return Number.isFinite(rate) && rate > 0 && Number.isFinite(price) && Number.isFinite(tvl) && tvl > 0 ? rate * secondsPerYear * price / tvl * 100 : NaN
  }
  function accrued (farm) {
    if (farm.lastRewardTime.gte(state.now) || !farm.staked || farm.staked.isZero() || state.totalAlloc.isZero() || state.supply.gte(maxSupply)) return farm.acc
    const elapsed = ethers.BigNumber.from(state.now).sub(farm.lastRewardTime)
    const cakeReward = elapsed.mul(state.bonus).mul(state.cakePerSecond).mul(farm.alloc).div(state.totalAlloc)
    return farm.acc.add(cakeReward.mul(stakerBps).mul(scale12).div(10000).div(farm.staked))
  }
  function pendingOf (farm) {
    if (!farm.user) return null
    const gross = farm.user.amount.mul(accrued(farm)).div(scale12)
    return gross.lt(farm.user.rewardDebt) ? ethers.constants.Zero : gross.sub(farm.user.rewardDebt)
  }
  function pairLabel (pool) { return token(pool.token0).symbol + ' / ' + token(pool.token1).symbol }
  function farmLabel (farm) { return farm.pool ? pairLabel(farm.pool) : token(farm.lp).symbol }
  function liveFarms () { return state.farms.filter(farm => state.showZero || farmRate(farm) > 0) }

  function walletLabel () { if (!state.account) return ''; return short(state.account) + (correctChain() ? '' : ' · wrong chain') }
  function renderOverview () {
    const node = byId('toon-overview'); if (!node) return
    const live = state.farms.filter(farm => farmRate(farm) > 0)
    const priced = live.filter(farm => Number.isFinite(farmApr(farm))).length
    const reward = live.reduce((sum, farm) => sum + farmRate(farm), 0)
    const farms = live.length ? live.length + ' live · ' + priced + '/' + live.length + ' priced' : 'none live'
    const lines = [
      'BLOCK    : ' + (state.block ? state.block.toLocaleString('en-US') : '—'),
      'TOON     : ' + priceText(state.prices.get(lower(address.toon))),
      'SUPRA    : ' + priceText(state.prices.get(lower(address.supra))),
      'REWARDS  : ' + (live.length && Number.isFinite(reward) ? compact(reward, 4) + ' TOON/s' : '0 TOON/s'),
      'FARMS    : ' + farms
    ]
    node.textContent = lines.join('\n')
  }
  function renderSummary () {
    const wallet = byId('toon-wallet-status'); if (wallet) wallet.textContent = walletLabel()
    const switcher = byId('toon-switch'); if (switcher) switcher.hidden = !state.account || correctChain()
  }
  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'toon-action', disabled: disabled || state.sending }); node.addEventListener('click', () => fn().catch(error => setStatus(errText(error), 'error'))); return node }
  function addHeader (table, labels) { const row = table.insertRow(); labels.forEach(label => row.appendChild(e('th', { text: label }))) }
  function addCell (row, text, className) { row.appendChild(e('td', { text, className })) }
  function nameCell (title, line) { const cell = e('td'); cell.appendChild(e('span', { text: title, className: 'toon-name' })); if (line) cell.appendChild(e('span', { text: line, className: 'toon-sub' })); return cell }
  function renderFarms () {
    const target = byId('toon-farms'); if (!target) return; target.textContent = ''
    const list = liveFarms().slice().sort((a, b) => (farmApr(b) || 0) - (farmApr(a) || 0) || farmRate(b) - farmRate(a))
    if (!list.length) { target.appendChild(e('p', { text: state.farms.length ? 'No live TOON farms.' : 'No TOON farms.' })); return }
    const table = e('table', { className: 'toon-table' })
    addHeader(table, ['Farm', 'Staked', 'Unstaked', 'APR', 'Rewards / week', 'Actions'])
    list.forEach(farm => {
      const row = table.insertRow()
      row.appendChild(nameCell(farmLabel(farm) + ' #' + farm.pid))
      const staked = farmTvl(farm)
      const poolTvl = farm.pool ? farm.pool.tvl : NaN
      const unstaked = Number.isFinite(staked) && Number.isFinite(poolTvl) ? Math.max(0, poolTvl - staked) : NaN
      addCell(row, Number.isFinite(staked) ? usd(staked) : '—', Number.isFinite(staked) ? '' : 'toon-unpriced')
      addCell(row, Number.isFinite(unstaked) ? usd(unstaked) : '—', Number.isFinite(unstaked) ? '' : 'toon-unpriced')
      const apr = farmApr(farm); const rate = farmRate(farm)
      addCell(row, rate === 0 ? '0.00%' : Number.isFinite(apr) ? percent(apr) : '—', Number.isFinite(apr) || rate === 0 ? '' : 'toon-unpriced')
      const weekly = Number.isFinite(rate) ? rate * secondsPerWeek : NaN
      const weeklyUsd = weekly * state.prices.get(lower(address.toon))
      addCell(row, Number.isFinite(weekly) ? compact(weekly, 4) + ' TOON\n' + usd(weeklyUsd) : '—', Number.isFinite(weeklyUsd) ? '' : 'toon-unpriced')
      const actions = e('td', { className: 'toon-actions' })
      if (farm.pool) append(actions, button('add', () => openAction('add', farm)), button('remove', () => openAction('remove', farm)))
      append(actions, button('stake', () => openAction('stake', farm)), button('unstake', () => openAction('unstake', farm)), button('claim', () => openAction('claim', farm)))
      row.appendChild(actions)
    })
    target.appendChild(table)
  }
  function renderPositions () {
    const target = byId('toon-positions'); if (!target) return; target.textContent = ''
    const rows = state.farms.filter(farm => farm.user && (!farm.user.amount.isZero() || (pendingOf(farm) && !pendingOf(farm).isZero())))
    target.hidden = !state.account || !rows.length
    if (target.hidden) return
    const table = e('table', { className: 'toon-table' }); addHeader(table, ['Position', 'Amount / rewards', 'Actions'])
    rows.forEach(farm => {
      const row = table.insertRow()
      const lp = token(farm.pool ? farm.pool.address : farm.lp)
      row.appendChild(nameCell(farmLabel(farm) + ' #' + farm.pid))
      addCell(row, 'staked ' + format(farm.user.amount, lp.decimals) + '\npending ' + format(pendingOf(farm), token(address.toon).decimals) + ' TOON')
      const actions = e('td', { className: 'toon-actions' })
      append(actions, button('stake', () => openAction('stake', farm)), button('unstake', () => openAction('unstake', farm)), button('claim', () => openAction('claim', farm)), button('exit', () => openAction('exit', farm)))
      row.appendChild(actions)
    })
    target.appendChild(table)
  }
  function render () { renderSummary(); renderOverview(); renderFarms(); renderPositions(); if (state.action) renderAction() }

  function actionTitle (kind, farm) { const names = { add: 'Add liquidity', remove: 'Remove liquidity', stake: 'Stake', unstake: 'Unstake', claim: 'Claim', exit: 'Exit' }; return (names[kind] || kind) + ' · ' + farmLabel(farm) + ' #' + farm.pid }
  function actionAssets (kind, farm) {
    if (kind === 'add') return [token(farm.pool.token0), token(farm.pool.token1)]
    if (kind === 'remove' || kind === 'stake' || kind === 'unstake') return [token(farm.pool ? farm.pool.address : farm.lp)]
    return []
  }
  function spender (kind) { if (kind === 'add' || kind === 'remove') return address.router; if (kind === 'stake') return address.chef; return null }
  function needsApproval (kind) { return ['add', 'remove', 'stake'].includes(kind) }
  function parseAmount (value, asset) { if (!/^\d+(\.\d+)?$/.test(String(value || '').trim())) throw new Error('Enter a positive exact decimal amount.'); if (asset.decimals === null) throw new Error(asset.symbol + ' has no usable decimals.'); const amount = ethers.utils.parseUnits(String(value).trim(), asset.decimals); if (amount.lte(0)) throw new Error('Enter an amount greater than zero.'); return amount }
  function parseMinimum (value, asset) { if (!/^\d+(\.\d+)?$/.test(String(value || '').trim())) throw new Error('Enter an exact minimum amount.'); if (asset.decimals === null) throw new Error(asset.symbol + ' has no usable decimals.'); return ethers.utils.parseUnits(String(value).trim(), asset.decimals) }
  async function openAction (kind, farm) {
    state.action = { kind, farm, amounts: needsApproval(kind) || kind === 'unstake' ? (kind === 'add' ? ['', ''] : ['']) : [], minimums: kind === 'add' || kind === 'remove' ? ['0', '0'] : [] }
    const dialog = byId('toon-action-dialog'); if (!dialog.open) dialog.showModal(); renderAction()
    if (state.account && correctChain()) { await refreshActionInfo(); renderAction() }
  }
  async function refreshActionInfo () {
    const action = state.action; if (!action || !state.account) return
    const assets = actionAssets(action.kind, action.farm)
    const approve = needsApproval(action.kind)
    const wantsUser = action.kind === 'unstake' || action.kind === 'claim' || action.kind === 'exit'
    const calls = []
    if (approve) assets.forEach(asset => calls.push(
      { target: asset.address, iface: erc20, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero },
      { target: asset.address, iface: erc20, method: 'allowance', args: [state.account, spender(action.kind)], fallback: ethers.constants.Zero }
    ))
    if (wantsUser) calls.push({ target: address.chef, iface: chef, method: 'userInfo', args: [action.farm.pid, state.account], fallback: null, decode: value => ({ amount: value[0], rewardDebt: value[1] }) })
    const values = await batch(calls)
    let cursor = 0
    const infoAssets = assets.map(asset => {
      if (!approve) return { asset, balance: ethers.constants.Zero, allowance: null }
      return { asset, balance: values[cursor++], allowance: values[cursor++] }
    })
    const user = wantsUser ? values[cursor] : null
    if (action.kind === 'unstake' && user) infoAssets.forEach(item => { item.balance = user.amount })
    action.info = { assets: infoAssets, user }
  }
  function buildAction () {
    const action = state.action; const account = state.account
    if (!action || !account) throw new Error('Connect a wallet first.')
    const deadline = Math.floor(Date.now() / 1000) + 20 * 60
    const farm = action.farm
    if (action.kind === 'add') {
      const assets = actionAssets('add', farm)
      const amounts = [parseAmount(action.amounts[0], assets[0]), parseAmount(action.amounts[1], assets[1])]
      const minimums = [parseMinimum(action.minimums[0], assets[0]), parseMinimum(action.minimums[1], assets[1])]
      return { to: address.router, data: router.encodeFunctionData('addLiquidity', [farm.pool.token0, farm.pool.token1, amounts[0], amounts[1], minimums[0], minimums[1], account, deadline]), amounts, assets, minimums }
    }
    if (action.kind === 'remove') {
      const asset = actionAssets('remove', farm)[0]
      const amount = parseAmount(action.amounts[0], asset)
      const assets = [token(farm.pool.token0), token(farm.pool.token1)]
      const minimums = [parseMinimum(action.minimums[0], assets[0]), parseMinimum(action.minimums[1], assets[1])]
      return { to: address.router, data: router.encodeFunctionData('removeLiquidity', [farm.pool.token0, farm.pool.token1, amount, minimums[0], minimums[1], account, deadline]), amounts: [amount], assets: [asset], minimums }
    }
    if (action.kind === 'stake') { const asset = actionAssets('stake', farm)[0]; const amount = parseAmount(action.amounts[0], asset); return { to: address.chef, data: chef.encodeFunctionData('deposit', [farm.pid, amount]), amounts: [amount], assets: [asset] } }
    if (action.kind === 'unstake') { const asset = actionAssets('unstake', farm)[0]; const amount = parseAmount(action.amounts[0], asset); return { to: address.chef, data: chef.encodeFunctionData('withdraw', [farm.pid, amount]), amounts: [], assets: [] } }
    if (action.kind === 'claim') return { to: address.chef, data: chef.encodeFunctionData('deposit', [farm.pid, 0]), amounts: [], assets: [] }
    if (action.kind === 'exit') return { to: address.chef, data: chef.encodeFunctionData('emergencyWithdraw', [farm.pid]), amounts: [], assets: [] }
    throw new Error('Unsupported action.')
  }
  function buildApproval (index) { const tx = buildAction(); const item = tx.assets[index]; if (!item) throw new Error('Nothing to approve.'); return { to: item.address, data: erc20.encodeFunctionData('approve', [tx.to, tx.amounts[index]]) } }
  async function preflight (tx) { try { await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data }, 'latest'] }) } catch (error) { throw new Error(errText(error) || 'Transaction would fail.') } }
  async function send (tx) { await preflight(tx); setStatus('Confirm in wallet…'); const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data }] }); setStatus(hash + ' · pending'); const receipt = await state.rpc.waitForTransaction(hash, 1, 180000); if (!receipt || receipt.status !== 1) throw new Error('Transaction failed.') }
  async function approve (index) { state.sending = true; renderAction(); try { await send(buildApproval(index)); await refreshActionInfo(); setStatus('Approved.', 'success') } finally { state.sending = false; renderAction() } }
  async function submit () {
    state.sending = true; renderAction()
    try {
      const action = state.action
      if (action.kind === 'exit' && !window.confirm('Exit forfeits pending TOON.')) throw new Error('Cancelled.')
      const tx = buildAction()
      if (tx.minimums && tx.minimums.some(value => value.isZero()) && !window.confirm('Minimum is zero. Continue?')) throw new Error('Cancelled.')
      if (needsApproval(action.kind)) tx.assets.forEach((asset, i) => { if (!action.info || !action.info.assets[i] || action.info.assets[i].allowance.lt(tx.amounts[i])) throw new Error('Approve ' + asset.symbol + ' first.'); if (action.info.assets[i].balance.lt(tx.amounts[i])) throw new Error('Insufficient ' + asset.symbol + '.') })
      await send(tx); await refreshAll(false); setStatus('Confirmed.', 'success')
    } finally { state.sending = false; render() }
  }
  function renderAction () {
    const dialog = byId('toon-action-dialog'); const box = byId('toon-action-content'); const action = state.action
    if (!action || !dialog || !box) return
    box.textContent = ''
    box.appendChild(e('h2', { id: 'toon-action-title', text: actionTitle(action.kind, action.farm) }))
    if (!state.account) { box.appendChild(e('p', { text: 'Connect a wallet first.' })); return }
    if (!correctChain()) { box.appendChild(e('p', { text: 'Switch to Ethereum.' })); return }
    const assets = actionAssets(action.kind, action.farm)
    assets.forEach((asset, i) => {
      if (action.amounts[i] === undefined) return
      const row = e('label', { className: 'toon-input' })
      row.appendChild(document.createTextNode((action.kind === 'add' || action.farm.single ? asset.symbol : 'LP') + ' : '))
      const input = e('input'); input.value = action.amounts[i] || ''; input.inputMode = 'decimal'; input.placeholder = '0.0'
      input.addEventListener('input', () => { action.amounts[i] = input.value; const start = input.selectionStart; const end = input.selectionEnd; renderAction(); const next = box.querySelectorAll('.toon-input input')[i]; if (next) { next.focus(); try { next.setSelectionRange(start, end) } catch (_) {} } })
      row.appendChild(input)
      if (action.info && action.info.assets[i]) row.appendChild(button('max', () => { action.amounts[i] = format(action.info.assets[i].balance, asset.decimals, asset.decimals); renderAction() }))
      box.appendChild(row)
      if (action.kind !== 'unstake' && action.info && action.info.assets[i]) box.appendChild(e('p', { text: asset.symbol + ' ' + format(action.info.assets[i].balance, asset.decimals) }))
    })
    if (action.minimums.length && action.farm.pool) {
      ;[token(action.farm.pool.token0), token(action.farm.pool.token1)].forEach((asset, i) => {
        const row = e('label', { className: 'toon-input' }); row.appendChild(document.createTextNode(asset.symbol + ' min : '))
        const input = e('input'); input.value = action.minimums[i]; input.inputMode = 'decimal'
        input.addEventListener('input', () => { action.minimums[i] = input.value }); row.appendChild(input); box.appendChild(row)
      })
    }
    if (action.kind === 'exit') box.appendChild(e('p', { text: 'Exit forfeits pending TOON.' }))
    if ((action.kind === 'unstake' || action.kind === 'claim' || action.kind === 'exit') && action.info && action.info.user) {
      const lp = token(action.farm.pool ? action.farm.pool.address : action.farm.lp)
      box.appendChild(e('p', { text: 'staked ' + format(action.info.user.amount, lp.decimals) }))
    }
    const actions = e('div', { className: 'toon-dialog-actions' })
    if (needsApproval(action.kind)) assets.forEach((asset, i) => actions.appendChild(button('approve ' + asset.symbol, () => approve(i), !action.info || !action.amounts[i])))
    if (action.kind === 'claim' || action.kind === 'exit' || action.amounts.length) actions.appendChild(button(action.kind === 'claim' ? 'claim' : action.kind === 'exit' ? 'exit' : 'submit', submit, state.sending))
    box.appendChild(actions)
  }

  async function hydrateWallet (blockTag) {
    if (!state.account || !state.farms.length) { state.farms.forEach(farm => { farm.user = null }); return }
    const values = await batch(state.farms.map(farm => ({ target: address.chef, iface: chef, method: 'userInfo', args: [farm.pid, state.account], fallback: null, decode: value => ({ amount: value[0], rewardDebt: value[1] }) })), blockTag)
    state.farms.forEach((farm, i) => { farm.user = values[i] })
  }
  function unbindProvider () {
    const provider = state.boundProvider
    if (provider && provider.removeListener) {
      if (state.accountListener) provider.removeListener('accountsChanged', state.accountListener)
      if (state.chainListener) provider.removeListener('chainChanged', state.chainListener)
    }
    state.boundProvider = null
    state.accountListener = null
    state.chainListener = null
  }
  function bindProvider (provider) {
    if (!provider || !provider.on || state.boundProvider === provider) return
    unbindProvider()
    state.accountListener = function (accounts) {
      if (state.eip1193 !== provider) return
      adopt(provider, accounts || [], state.walletChain).catch(error => setStatus(errText(error), 'error'))
    }
    state.chainListener = function (chainId) {
      if (state.eip1193 !== provider) return
      adopt(provider, state.account ? [state.account] : [], chainId).catch(error => setStatus(errText(error), 'error'))
    }
    provider.on('accountsChanged', state.accountListener)
    provider.on('chainChanged', state.chainListener)
    state.boundProvider = provider
  }
  async function adopt (provider, accounts, walletChain) {
    if (!provider) return false
    state.eip1193 = provider
    state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
    state.walletChain = walletChain === undefined || walletChain === null ? null : hexChain(walletChain)
    bindProvider(provider)
    render()
    if (state.account) await hydrateWallet()
    else state.farms.forEach(farm => { farm.user = null })
    render()
    return !!state.account
  }
  async function restore () {
    const provider = injected(); if (!provider) { render(); return false }
    try {
      const result = await Promise.all([provider.request({ method: 'eth_accounts' }), provider.request({ method: 'eth_chainId' })])
      if (!result[0] || !result[0][0]) { state.account = null; state.walletChain = result[1] ? hexChain(result[1]) : null; render(); return false }
      return adopt(provider, result[0], result[1])
    } catch (_) { state.account = null; render(); return false }
  }
  async function connectInjected () {
    const provider = injected(); if (!provider) { setStatus('No injected wallet.', 'error'); return }
    const accounts = await provider.request({ method: 'eth_requestAccounts' })
    const walletChain = await provider.request({ method: 'eth_chainId' })
    await adopt(provider, accounts, walletChain)
    setStatus(correctChain() ? '' : 'Switch to Ethereum.', correctChain() ? '' : 'error')
  }
  async function switchChain () {
    const provider = state.eip1193 || injected(); if (!provider) { setStatus('No injected wallet.', 'error'); return }
    try { await provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] }) }
    catch (error) {
      const code = error && (error.code || error.data && error.data.originalError && error.data.originalError.code)
      if (code !== 4902) throw error
      await provider.request({ method: 'wallet_addEthereumChain', params: [{ chainId: chain.id, chainName: chain.name, nativeCurrency: chain.nativeCurrency, rpcUrls: [chain.rpc], blockExplorerUrls: [chain.explorer] }] })
    }
    state.walletChain = hexChain(await provider.request({ method: 'eth_chainId' })); render(); setStatus(correctChain() ? '' : 'Switch to Ethereum.', correctChain() ? '' : 'error')
  }
  async function connectOther () {
    const reown = await import('./config.js')
    if (!reown.REOWN_PROJECT_ID) throw new Error('Optional wallet support is unavailable.')
    const kit = reown.createAppKitInstance(); if (!kit) throw new Error('Optional wallet support is unavailable.')
    const onAccount = async account => { if (!account || !account.isConnected) return; const provider = await kit.getWalletProvider(); await adopt(provider, await provider.request({ method: 'eth_accounts' }), await provider.request({ method: 'eth_chainId' })); if (state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null } }
    if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true })
    if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error')))
    await kit.open()
  }
  async function refreshAll (withDiscovery) {
    loading('Reading ToonSwap farms…')
    if (withDiscovery) { await discover(); await loadTokens() }
    else {
      const block = await state.rpc.getBlock('latest'); state.block = block.number; state.now = block.timestamp
      const calls = []
      state.farms.forEach(farm => {
        calls.push({ target: farm.pool ? farm.pool.address : farm.lp, iface: erc20, method: 'balanceOf', args: [address.chef], fallback: ethers.constants.Zero })
        calls.push({ target: address.chef, iface: chef, method: 'poolInfo', args: [farm.pid], fallback: null, decode: value => value })
      })
      state.pairs.forEach(pool => {
        calls.push({ target: pool.address, iface: pair, method: 'getReserves', fallback: null, decode: value => value })
        calls.push({ target: pool.address, iface: pair, method: 'totalSupply', fallback: null })
        calls.push({ target: pool.address, iface: erc20, method: 'balanceOf', args: [address.chef], fallback: ethers.constants.Zero })
      })
      const values = await batch(calls, block.number)
      let cursor = 0
      state.farms.forEach(farm => {
        farm.staked = values[cursor++] || ethers.constants.Zero
        if (farm.pool) farm.pool.chefBalance = farm.staked
        const info = values[cursor++]
        if (info) { farm.alloc = info[1]; farm.lastRewardTime = info[2]; farm.acc = info[3] }
      })
      state.pairs.forEach(pool => {
        const reserves = values[cursor++]
        const supply = values[cursor++]
        const chefBalance = values[cursor++] || ethers.constants.Zero
        if (reserves) pool.reserves = reserves
        if (supply) pool.totalSupply = supply
        pool.chefBalance = chefBalance
        const farm = state.farms.find(item => item.pool && lower(item.pool.address) === lower(pool.address))
        if (farm) { farm.staked = chefBalance; if (farm.pool) farm.pool.chefBalance = chefBalance }
      })
      await hydrateWallet(block.number)
    }
    if (withDiscovery) await hydrateWallet()
    pricePools(); loading(); render()
  }
  function bind () {
    byId('toon-connect').addEventListener('click', () => connectInjected().catch(error => setStatus(errText(error), 'error')))
    byId('toon-other-wallet').addEventListener('click', () => connectOther().catch(error => setStatus(errText(error), 'error')))
    byId('toon-switch').addEventListener('click', () => switchChain().catch(error => setStatus(errText(error), 'error')))
    byId('toon-zero-toggle').addEventListener('click', () => { state.showZero = !state.showZero; byId('toon-zero-toggle').textContent = state.showZero ? '[ hide inactive ]' : '[ show inactive ]'; renderFarms() })
    byId('toon-refresh').addEventListener('click', () => refreshAll(true).then(() => setStatus('')).catch(error => { loading(); setStatus(errText(error), 'error') }))
  }
  async function start () {
    state.rpc = new ethers.providers.StaticJsonRpcProvider({ url: chain.rpc, throttleLimit: 1 }, { chainId: chain.number, name: 'ethereum' })
    bind(); render(); await discover(); await loadTokens(); pricePools(); loading(); render(); setStatus(''); await restore()
  }
  function fatal (error) { console.error(error); loading(); setStatus(errText(error), 'error'); const target = byId('toon-farms'); if (target && !target.textContent) target.appendChild(e('p', { text: errText(error) })) }
  return { start, fatal }
})()
