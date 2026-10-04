/* StonkPress (stonk.press) Genesis and oPLATE farms on Robinhood Chain. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { StonkPressPage.start().catch(StonkPressPage.fatal) })

const StonkPressPage = (function () {
  const chain = { id: '0x1237', number: 4663, rpc: 'https://rpc.mainnet.chain.robinhood.com' }
  const address = {
    genesis: '0x935661973d9379b792bcb110d1eebd05034b838f',
    farm: '0x55d8c2eb48cdcc1835dd38568f22feb6a0893d35',
    paper: '0x008dd62dd934f3ffdc0986ba5316c78ae51cb1c9',
    plate: '0x5b00c30098216a00905ee3fb5bda413006418bb6',
    oplate: '0x34d537f53ea0a1333a5d7621e7f023ee6cfcb787',
    paperLp: '0x6178406c433c70b006e2f81a79a5d98bf5b0af85',
    plateLp: '0x73c4aae208080d94e97a0abe80f140a140846cc8',
    spy: '0x117cc2133c37B721F49dE2A7a74833232B3B4C0C',
    usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168',
    weth: '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73',
    refV2Factory: '0x43B2Bf9f33036a02fC7A00935571c2A6b0108e66',
    refV3Factory: '0xE0c4ceb92d08CA985bB70fe0a22fEb121A9854A8',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  // Reference venues used only to carry a USDG price onto SPY, WETH and other staked tokens.
  const refSpacings = [1, 5, 10, 50, 100, 200, 2000]
  const secondsPerYear = 365 * 24 * 60 * 60
  const secondsPerWeek = 7 * 24 * 60 * 60
  const minUsdAnchor = 500
  const minPrice = 1e-12
  const maxPrice = 1e12
  const minSqrtRatio = 4295128739
  const maxSqrtRatio = ethers.BigNumber.from('1461446703485210103287273052203988822378723970342')

  const erc20Abi = ['function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)']
  const chefAbi = [
    'function poolLength() view returns(uint256)', 'function poolStartTime() view returns(uint256)', 'function poolEndTime() view returns(uint256)',
    'function userInfo(uint256,address) view returns(uint256,uint256)', 'function pendingRewards(uint256,address) view returns(uint256)',
    'function deposit(uint256,uint256)', 'function withdraw(uint256,uint256)'
  ]
  const genesisAbi = chefAbi.concat([
    'function paper() view returns(address)', 'function paperPerSecond() view returns(uint256)', 'function pendingPAPER(uint256,address) view returns(uint256)', 'function harvest(uint256)',
    'function poolInfo(uint256) view returns(address token,uint256 depFee,uint256 allocPoint,uint256 lastRewardTime,uint256 acc,bool isStarted,uint256 totalStaked,(bool,address,address[]) gauge,uint256 perSecond)'
  ])
  const farmAbi = chefAbi.concat([
    'function plate() view returns(address)', 'function sharePerSecond() view returns(uint256)', 'function pendingShareAndPendingRewards(uint256,address) view returns(uint256)', 'function harvest(uint256) payable',
    'function minClaimThreshold() view returns(uint256)', 'function pegStabilityModuleFeeEnabled() view returns(bool)',
    'function poolInfo(uint256) view returns(address token,uint256 depFee,uint256 allocPoint,uint256 lastRewardTime,uint256 acc,bool isStarted,uint256 totalStaked,(bool,address,uint8) gauge,uint256 perSecond)'
  ])
  const optionAbi = ['function liquidPayBps() view returns(uint256)']
  const pairAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function getReserves() view returns(uint112,uint112,uint32)', 'function totalSupply() view returns(uint256)']
  const refV2FactoryAbi = ['function getPair(address,address,bool) view returns(address)']
  const refV3FactoryAbi = ['function getPool(address,address,int24) view returns(address)']
  const refV3PoolAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function slot0() view returns(uint160,int24,uint16,uint16,uint16,uint8,bool)']
  const multiAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']

  const erc20 = new ethers.utils.Interface(erc20Abi)
  const option = new ethers.utils.Interface(optionAbi)
  const pair = new ethers.utils.Interface(pairAbi)
  const refV2Factory = new ethers.utils.Interface(refV2FactoryAbi)
  const refV3Factory = new ethers.utils.Interface(refV3FactoryAbi)
  const refV3Pool = new ethers.utils.Interface(refV3PoolAbi)

  // Genesis pays PAPER for a fixed window. The farm pays oPLATE; its withdraw keeps rewards pending.
  const chefs = [
    { key: 'genesis', label: 'Genesis', address: address.genesis, iface: new ethers.utils.Interface(genesisAbi), rewardMethod: 'paper', rateMethod: 'paperPerSecond', pending: ['pendingPAPER', 'pendingRewards'] },
    { key: 'farm', label: 'Farm', address: address.farm, iface: new ethers.utils.Interface(farmAbi), rewardMethod: 'plate', rateMethod: 'sharePerSecond', pending: ['pendingShareAndPendingRewards'] }
  ]

  const state = {
    rpc: null, eip1193: null, account: null, walletChain: null, walletSource: null, boundProvider: null, reownUnsubscribe: null,
    headTime: null, pools: [], tokens: new Map(), prices: new Map(), lpUsd: new Map(), liquidPayBps: null, showZero: false,
    action: null, actionInfo: null, sending: false, status: '', spinner: null
  }

  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const short = value => value ? value.slice(0, 6) + '…' + value.slice(-4) : '—'
  const isZero = value => !value || lower(value) === lower(ethers.constants.AddressZero)
  const correctChain = () => state.walletChain === chain.id
  const requireWallet = () => { if (!state.account || !state.eip1193) throw new Error('Connect wallet.'); if (!correctChain()) throw new Error('Switch to Robinhood Chain.') }
  const injected = () => window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null
  const token = value => state.tokens.get(lower(value)) || { address: value, symbol: short(value), decimals: null }
  const errText = error => String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').replace(/\s+/g, ' ').slice(0, 360)
  const finite = value => Number.isFinite(value) && value >= 0
  const compact = (value, digits) => { if (!finite(value)) return '—'; if (value >= 1e9) return (value / 1e9).toFixed(digits === undefined ? 2 : digits) + 'b'; if (value >= 1e6) return (value / 1e6).toFixed(digits === undefined ? 2 : digits) + 'm'; if (value >= 1e3) return (value / 1e3).toFixed(digits === undefined ? 2 : digits) + 'k'; if (value >= 1) return value.toFixed(digits === undefined ? 2 : digits); return value > 0 ? value.toPrecision(3) : '0' }
  const usd = value => finite(value) ? '$' + compact(value) : '—'
  const percent = value => finite(value) ? compact(value, 2) + '%' : '—'
  const format = (amount, decimals, places) => { try { if (amount === undefined || amount === null || decimals === null) return '—'; const parts = ethers.utils.formatUnits(amount, decimals).split('.'); const tail = (parts[1] || '').slice(0, places === undefined ? 5 : places).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const num = (amount, decimals) => { const value = Number(format(amount, decimals, 14)); return Number.isFinite(value) ? value : NaN }
  const utc = seconds => new Date(seconds * 1000).toUTCString().replace(':00 GMT', ' UTC').replace(/^\w+, /, '')
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const poolName = pool => lower(pool.token) === lower(address.paperLp) ? 'PAPER/SPY LP' : lower(pool.token) === lower(address.plateLp) ? 'PLATE/SPY LP' : token(pool.token).symbol

  function setStatus (text, kind) { state.status = text || ''; const node = byId('stonk-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (text) { const box = byId('stonk-loading'); const spin = byId('stonk-loading-spin'); if (!box) return; box.hidden = !text; if (text && spin) spin.textContent = '[....]'; if (text && !state.spinner) { let index = 0; state.spinner = window.setInterval(() => { if (spin) spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) } if (!text && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }
  async function limited (items, n, fn) { const out = new Array(items.length); let next = 0; async function worker () { while (next < items.length) { const i = next++; out[i] = await fn(items[i], i) } } await Promise.all(Array.from({ length: Math.min(n, Math.max(1, items.length)) }, worker)); return out }

  async function batch (calls) {
    if (!calls.length) return []
    const chunks = []; for (let i = 0; i < calls.length; i += 200) chunks.push(calls.slice(i, i + 200))
    const mc = new ethers.Contract(address.multicall, multiAbi, state.rpc)
    async function readGroup (group) {
      const encoded = group.map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }))
      const decode = (call, raw) => { try { const value = call.iface.decodeFunctionResult(call.method, raw); return call.decode ? call.decode(value) : value.length === 1 ? value[0] : value } catch (_) { return call.fallback } }
      try { const values = await mc.aggregate3(encoded); return values.map((value, i) => value.success ? decode(group[i], value.returnData) : group[i].fallback) } catch (_) {
        return limited(group, 4, async (call, i) => { try { return decode(call, await state.rpc.call({ to: call.target, data: encoded[i].callData })) } catch (_) { return call.fallback } })
      }
    }
    const results = await limited(chunks, 2, readGroup)
    return [].concat(...results)
  }

  function phase (chef) {
    const now = state.headTime
    if (!chef.start || !now) return '—'
    if (now < chef.start) return 'starts ' + utc(chef.start)
    if (now < chef.end) return 'live until ' + utc(chef.end)
    return 'ended'
  }
  const live = chef => state.headTime && chef.start && state.headTime >= chef.start && state.headTime < chef.end

  async function discover () {
    const block = await state.rpc.getBlock('latest'); state.headTime = block ? Number(block.timestamp) : Math.floor(Date.now() / 1000)
    const calls = []
    chefs.forEach(chef => calls.push(
      { target: chef.address, iface: chef.iface, method: 'poolLength', fallback: ethers.constants.Zero },
      { target: chef.address, iface: chef.iface, method: 'poolStartTime', fallback: null },
      { target: chef.address, iface: chef.iface, method: 'poolEndTime', fallback: null },
      { target: chef.address, iface: chef.iface, method: chef.rewardMethod, fallback: null },
      { target: chef.address, iface: chef.iface, method: chef.rateMethod, fallback: ethers.constants.Zero }
    ))
    const farmChef = chefs[1]
    calls.push(
      { target: farmChef.address, iface: farmChef.iface, method: 'minClaimThreshold', fallback: ethers.constants.Zero },
      { target: farmChef.address, iface: farmChef.iface, method: 'pegStabilityModuleFeeEnabled', fallback: false },
      { target: address.oplate, iface: option, method: 'liquidPayBps', fallback: null }
    )
    const heads = await batch(calls)
    chefs.forEach((chef, i) => {
      const at = i * 5
      chef.poolCount = Number(heads[at]); chef.start = heads[at + 1] ? heads[at + 1].toNumber() : null; chef.end = heads[at + 2] ? heads[at + 2].toNumber() : null
      chef.rewardToken = heads[at + 3] || (chef.key === 'genesis' ? address.paper : address.oplate); chef.rewardPerSecond = heads[at + 4]
    })
    farmChef.minClaim = heads[chefs.length * 5]; farmChef.claimFeeOn = Boolean(heads[chefs.length * 5 + 1])
    state.liquidPayBps = heads[chefs.length * 5 + 2] ? Number(heads[chefs.length * 5 + 2].toString()) : null
    const infoCalls = []
    chefs.forEach(chef => { for (let pid = 0; pid < chef.poolCount; pid++) infoCalls.push({ chef, pid, target: chef.address, iface: chef.iface, method: 'poolInfo', args: [pid], fallback: null, decode: value => value }) })
    const infos = await batch(infoCalls)
    state.pools = infos.map((info, i) => info && ({
      chef: infoCalls[i].chef, pid: infoCalls[i].pid, token: info.token, depositFeeBps: Number(info.depFee.toString()), started: Boolean(info.isStarted),
      totalStaked: info.totalStaked, perSecond: info.perSecond, tvlUsd: NaN, rate: NaN, rateUsd: NaN, apr: NaN, user: null, pending: null
    })).filter(Boolean)
  }

  async function loadTokens () {
    const list = [...new Set([address.usdg, address.weth, address.spy, address.paper, address.plate, address.oplate].concat(state.pools.map(p => p.token)).map(lower))]
    const calls = []; list.forEach(value => calls.push({ target: value, iface: erc20, method: 'symbol', fallback: null }, { target: value, iface: erc20, method: 'decimals', fallback: null }))
    const values = await batch(calls)
    list.forEach((value, i) => {
      const symbol = values[i * 2] || short(value)
      state.tokens.set(lower(value), { address: ethers.utils.getAddress(value), symbol: String(symbol).replace(/[\r\n]/g, ' ').slice(0, 18), decimals: values[i * 2 + 1] === null ? null : Number(values[i * 2 + 1]) })
    })
  }

  // Price of token1 in token0 units, from a Q64.96 sqrt ratio.
  function priceFromSqrt (sqrtX96, decimals0, decimals1) {
    if (sqrtX96 === null || sqrtX96 === undefined) return NaN
    const raw = ethers.BigNumber.from(sqrtX96)
    if (raw.lte(minSqrtRatio) || raw.gte(maxSqrtRatio)) return NaN
    const ratio = Number(raw.toString()) / 2 ** 96
    const price = ratio * ratio * 10 ** (decimals0 - decimals1)
    return price > minPrice && price < maxPrice ? price : NaN
  }

  async function referenceEdges (wanted) {
    const quotes = [address.usdg, address.weth]
    const lookups = []
    wanted.forEach(value => quotes.forEach(quote => {
      if (lower(value) === lower(quote)) return
      refSpacings.forEach(spacing => lookups.push({ kind: 'v3', call: { target: address.refV3Factory, iface: refV3Factory, method: 'getPool', args: [value, quote, spacing], fallback: null } }))
      ;[false, true].forEach(stable => lookups.push({ kind: 'v2', call: { target: address.refV2Factory, iface: refV2Factory, method: 'getPair', args: [value, quote, stable], fallback: null } }))
    }))
    const found = await batch(lookups.map(item => item.call))
    const venues = []
    found.forEach((value, index) => { if (!isZero(value) && !venues.some(venue => lower(venue.address) === lower(value))) venues.push({ address: value, kind: lookups[index].kind }) })
    if (!venues.length) return []
    const detail = await batch([].concat(...venues.map(venue => {
      const iface = venue.kind === 'v3' ? refV3Pool : pair
      return [
        { target: venue.address, iface, method: 'token0', fallback: null },
        { target: venue.address, iface, method: 'token1', fallback: null },
        { target: venue.address, iface, method: venue.kind === 'v3' ? 'slot0' : 'getReserves', fallback: null, decode: value => value }
      ]
    })))
    const balanceCalls = []
    venues.forEach((venue, index) => {
      venue.token0 = detail[index * 3]; venue.token1 = detail[index * 3 + 1]; venue.slot = detail[index * 3 + 2]
      if (venue.kind === 'v3' && venue.token0 && venue.token1 && venue.slot) balanceCalls.push({ target: venue.token0, iface: erc20, method: 'balanceOf', args: [venue.address], fallback: null }, { target: venue.token1, iface: erc20, method: 'balanceOf', args: [venue.address], fallback: null })
    })
    const balances = await batch(balanceCalls)
    let cursor = 0
    const edges = []
    venues.forEach(venue => {
      if (!venue.token0 || !venue.token1 || !venue.slot) return
      const d0 = token(venue.token0).decimals; const d1 = token(venue.token1).decimals
      if (venue.kind === 'v3') {
        const b0 = balances[cursor++]; const b1 = balances[cursor++]
        if (d0 === null || d1 === null) return
        edges.push({ token0: venue.token0, token1: venue.token1, price: priceFromSqrt(venue.slot[0], d0, d1), amount0: num(b0, d0), amount1: num(b1, d1) })
      } else {
        if (d0 === null || d1 === null) return
        const amount0 = num(venue.slot[0], d0); const amount1 = num(venue.slot[1], d1)
        edges.push({ token0: venue.token0, token1: venue.token1, price: amount0 > 0 ? amount1 / amount0 : NaN, amount0, amount1 })
      }
    })
    return edges.filter(edge => Number.isFinite(edge.price) && edge.price > 0)
  }

  async function loadPrices () {
    state.prices = new Map([[lower(address.usdg), 1]]); state.lpUsd = new Map()
    const ours = [address.paper, address.plate, address.oplate, address.paperLp, address.plateLp].map(lower)
    const wanted = [...new Set([address.spy, address.weth].concat(state.pools.map(p => p.token)).map(lower))].filter(value => value !== lower(address.usdg) && !ours.includes(value))
    const edges = await referenceEdges(wanted)
    // Carry USDG outward; a price is kept only when the venue holds enough of the priced side.
    const depth = new Map([[lower(address.usdg), Number.MAX_VALUE]])
    for (let round = 0; round < 6; round++) {
      let changed = false
      edges.forEach(edge => {
        const k0 = lower(edge.token0); const k1 = lower(edge.token1); const p0 = state.prices.get(k0); const p1 = state.prices.get(k1)
        if (finite(p0) && edge.amount0 > 0) { const candidate = p0 / edge.price; const d = Math.min(depth.get(k0) || 0, edge.amount0 * p0); if (d >= minUsdAnchor && d > (depth.get(k1) || 0) && candidate > minPrice && candidate < maxPrice) { state.prices.set(k1, candidate); depth.set(k1, d); changed = true } }
        if (finite(p1) && edge.amount1 > 0) { const candidate = edge.price * p1; const d = Math.min(depth.get(k1) || 0, edge.amount1 * p1); if (d >= minUsdAnchor && d > (depth.get(k0) || 0) && candidate > minPrice && candidate < maxPrice) { state.prices.set(k0, candidate); depth.set(k0, d); changed = true } }
      })
      if (!changed) break
    }
    // PAPER and PLATE come from their own SPY pairs; each LP is valued at twice its SPY side.
    const spyUsd = state.prices.get(lower(address.spy))
    const pairs = [{ lp: address.paperLp, other: address.paper }, { lp: address.plateLp, other: address.plate }]
    const values = await batch([].concat(...pairs.map(p => [
      { target: p.lp, iface: pair, method: 'token0', fallback: null },
      { target: p.lp, iface: pair, method: 'getReserves', fallback: null, decode: value => value },
      { target: p.lp, iface: pair, method: 'totalSupply', fallback: null }
    ])))
    pairs.forEach((p, i) => {
      const token0 = values[i * 3]; const reserves = values[i * 3 + 1]; const supply = values[i * 3 + 2]
      if (!token0 || !reserves || !supply || supply.isZero() || !finite(spyUsd)) return
      const spyFirst = lower(token0) === lower(address.spy)
      const spyAmount = num(spyFirst ? reserves[0] : reserves[1], token(address.spy).decimals)
      const otherAmount = num(spyFirst ? reserves[1] : reserves[0], token(p.other).decimals)
      if (!(spyAmount * spyUsd >= minUsdAnchor) || !(otherAmount > 0)) return
      state.prices.set(lower(p.other), spyAmount * spyUsd / otherAmount)
      state.lpUsd.set(lower(p.lp), spyAmount * spyUsd * 2 / num(supply, 18))
    })
    // oPLATE is worth PLATE less the SPY paid to exercise it at the liquid rate.
    const plateUsd = state.prices.get(lower(address.plate))
    if (finite(plateUsd) && state.liquidPayBps !== null) state.prices.set(lower(address.oplate), plateUsd * Math.max(0, 1 - state.liquidPayBps / 10000))
  }

  function applyRates () {
    state.pools.forEach(pool => {
      const chef = pool.chef; const reward = token(chef.rewardToken); const rewardPrice = state.prices.get(lower(chef.rewardToken))
      pool.rate = live(chef) || state.headTime < chef.start ? num(pool.perSecond, reward.decimals) : 0
      pool.rateUsd = finite(pool.rate) && finite(rewardPrice) ? pool.rate * rewardPrice : NaN
      const asset = token(pool.token); const unit = state.lpUsd.get(lower(pool.token)) ?? state.prices.get(lower(pool.token))
      const staked = num(pool.totalStaked, asset.decimals)
      pool.tvlUsd = finite(staked) && finite(unit) ? staked * unit : NaN
      pool.apr = finite(pool.rateUsd) && finite(pool.tvlUsd) && pool.tvlUsd > 0 ? pool.rateUsd * secondsPerYear / pool.tvlUsd * 100 : NaN
    })
  }

  function renderSummary () {
    const node = byId('stonk-summary'); const wallet = byId('stonk-wallet-status'); if (wallet) wallet.textContent = state.account ? short(state.account) + (correctChain() ? '' : ' · wrong chain') : ''
    if (!node || !chefs[0].start) return
    const spy = state.prices.get(lower(address.spy)); const paper = state.prices.get(lower(address.paper)); const plate = state.prices.get(lower(address.plate))
    const lines = chefs.map(chef => chef.label + ' · ' + chef.poolCount + ' pools · ' + phase(chef) + ' · pays ' + token(chef.rewardToken).symbol)
    lines.push('SPY ' + usd(spy) + ' · PAPER ' + usd(paper) + (finite(spy) && finite(paper) ? ' (' + (paper / spy * 10000).toFixed(3) + '× target)' : '') + ' · PLATE ' + usd(plate))
    if (state.liquidPayBps !== null) lines.push('oPLATE exercise costs ' + (state.liquidPayBps / 100).toFixed(0) + '% of the PLATE TWAP in SPY; APR values oPLATE at PLATE less that cost.')
    node.textContent = lines.join('\n')
  }

  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'stonk-action', disabled: disabled || state.sending }); node.addEventListener('click', () => fn().catch(error => setStatus(errText(error), 'error'))); return node }
  function addHeader (table, labels) { const row = table.insertRow(); labels.forEach(label => row.appendChild(e('th', { text: label }))) }
  function addCell (row, text, className) { row.appendChild(e('td', { text, className })) }
  function nameCell (title, line) { const cell = e('td'); cell.appendChild(e('span', { text: title, className: 'stonk-name' })); if (line) cell.appendChild(e('span', { text: line, className: 'stonk-sub' })); return cell }
  const actionsCell = pool => append(e('td', { className: 'stonk-actions' }), button('deposit', () => openAction('deposit', pool)), button('withdraw', () => openAction('withdraw', pool)), button('claim', () => openAction('claim', pool)))

  function renderFarms () {
    const target = byId('stonk-farms'); if (!target) return; target.textContent = ''
    const list = state.pools.filter(p => state.showZero || (finite(p.rate) && p.rate > 0))
    const table = e('table', { className: 'stonk-table' })
    addHeader(table, ['Pool', 'TVL', 'Fee', 'APR', 'Rewards / week', 'Actions'])
    list.forEach(pool => {
      const asset = token(pool.token); const reward = token(pool.chef.rewardToken)
      const row = table.insertRow()
      row.appendChild(nameCell(pool.chef.label + ' #' + pool.pid + ' · ' + poolName(pool), live(pool.chef) ? '' : phase(pool.chef)))
      addCell(row, finite(pool.tvlUsd) ? usd(pool.tvlUsd) : format(pool.totalStaked, asset.decimals) + ' ' + asset.symbol, finite(pool.tvlUsd) ? '' : 'stonk-unpriced')
      addCell(row, (pool.depositFeeBps / 100).toFixed(2) + '%')
      addCell(row, finite(pool.apr) ? percent(pool.apr) : '—', finite(pool.apr) ? '' : 'stonk-unpriced')
      const weekly = finite(pool.rate) ? pool.rate * secondsPerWeek : NaN
      addCell(row, finite(weekly) ? compact(weekly, 2) + ' ' + reward.symbol + (finite(pool.rateUsd) ? '\n' + usd(pool.rateUsd * secondsPerWeek) : '') : '—', finite(pool.rateUsd) ? '' : 'stonk-unpriced')
      row.appendChild(actionsCell(pool))
    })
    target.appendChild(table)
  }

  function renderPositions () {
    const target = byId('stonk-positions'); if (!target) return; target.textContent = ''
    const rows = state.pools.filter(p => p.user && (!p.user[0].isZero() || (p.pending && !p.pending.isZero())))
    target.hidden = !state.account || !rows.length; if (target.hidden) return
    const table = e('table', { className: 'stonk-table' }); addHeader(table, ['Position', 'Staked / pending', 'Actions'])
    rows.forEach(pool => {
      const asset = token(pool.token); const reward = token(pool.chef.rewardToken)
      const row = table.insertRow()
      row.appendChild(nameCell(pool.chef.label + ' #' + pool.pid + ' · ' + poolName(pool)))
      addCell(row, 'staked ' + format(pool.user[0], asset.decimals) + ' ' + asset.symbol + '\npending ' + format(pool.pending, reward.decimals) + ' ' + reward.symbol)
      row.appendChild(actionsCell(pool))
    })
    target.appendChild(table)
  }

  function render () { renderSummary(); renderFarms(); renderPositions(); if (state.action) renderAction() }

  async function openAction (kind, pool) { state.action = { kind, pool, amount: kind === 'claim' ? '' : '0' }; state.actionInfo = null; const dialog = byId('stonk-action-dialog'); if (dialog && !dialog.open) dialog.showModal(); renderAction(); if (state.account && correctChain()) { await refreshActionInfo(); renderAction() } }
  async function pendingOf (pool, account) {
    const chef = pool.chef
    const values = await batch(chef.pending.map(method => ({ target: chef.address, iface: chef.iface, method, args: [pool.pid, account], fallback: ethers.constants.Zero })))
    return values.reduce((sum, value) => sum.add(value), ethers.constants.Zero)
  }
  async function refreshActionInfo () {
    const a = state.action; if (!a || !state.account) return
    const chef = a.pool.chef; const asset = token(a.pool.token)
    const values = await batch([
      { target: asset.address, iface: erc20, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero },
      { target: asset.address, iface: erc20, method: 'allowance', args: [state.account, chef.address], fallback: ethers.constants.Zero },
      { target: chef.address, iface: chef.iface, method: 'userInfo', args: [a.pool.pid, state.account], fallback: null, decode: value => value }
    ])
    state.actionInfo = { balance: values[0], allowance: values[1], staked: values[2] ? values[2][0] : ethers.constants.Zero, pending: await pendingOf(a.pool, state.account) }
  }

  function parseAmount (value, asset) {
    if (!/^\d+(\.\d+)?$/.test(String(value || '').trim())) throw new Error('Enter a positive decimal amount.')
    if (asset.decimals === null) throw new Error('Token decimals unavailable.')
    const amount = ethers.utils.parseUnits(String(value).trim(), asset.decimals)
    if (amount.lte(0)) throw new Error('Amount must be greater than zero.')
    return amount
  }

  function buildAction () {
    const a = state.action
    if (!a || !state.account) throw new Error('Connect a wallet first.')
    const chef = a.pool.chef; const asset = token(a.pool.token)
    if (a.kind === 'deposit') { const amount = parseAmount(a.amount, asset); return { to: chef.address, data: chef.iface.encodeFunctionData('deposit', [a.pool.pid, amount]), amount, asset } }
    if (a.kind === 'withdraw') return { to: chef.address, data: chef.iface.encodeFunctionData('withdraw', [a.pool.pid, parseAmount(a.amount, asset)]) }
    if (a.kind === 'claim') {
      if (chef.claimFeeOn) throw new Error('A claim fee is on; claim on stonk.press.')
      if (state.actionInfo && chef.minClaim && state.actionInfo.pending.lt(chef.minClaim)) throw new Error('Nothing to claim yet.')
      return { to: chef.address, data: chef.iface.encodeFunctionData('harvest', [a.pool.pid]) }
    }
    throw new Error('Unsupported action.')
  }

  async function preflight (tx) { try { await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data }, 'latest'] }) } catch (error) { throw new Error(errText(error)) } }
  async function send (tx) {
    requireWallet()
    await preflight(tx)
    setStatus('Confirm in wallet…')
    const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data }] })
    setStatus(hash + ' · pending')
    const receipt = await state.rpc.waitForTransaction(hash, 1, 180000)
    if (!receipt || receipt.status !== 1) throw new Error('Transaction failed.')
  }

  async function approve () {
    requireWallet()
    const tx = buildAction(); if (!tx.amount) throw new Error('Nothing to approve.')
    state.sending = true; renderAction()
    try {
      await send({ to: tx.asset.address, data: erc20.encodeFunctionData('approve', [state.action.pool.chef.address, tx.amount]) })
      await refreshActionInfo(); setStatus('Approved.', 'success')
    } finally { state.sending = false; renderAction() }
  }

  async function submit () {
    requireWallet()
    state.sending = true; renderAction()
    try {
      const tx = buildAction()
      if (tx.amount && state.actionInfo) {
        if (state.actionInfo.allowance.lt(tx.amount)) throw new Error('Approve ' + token(state.action.pool.token).symbol + ' first.')
        if (state.actionInfo.balance.lt(tx.amount)) throw new Error('Insufficient balance.')
      }
      await send(tx)
      await discover(); await hydrateWallet(); applyRates()
      if (state.action) { state.action.pool = state.pools.find(p => p.chef === state.action.pool.chef && p.pid === state.action.pool.pid) || state.action.pool; await refreshActionInfo() }
      setStatus('Confirmed.', 'success')
    } finally { state.sending = false; render() }
  }

  function renderAction () {
    const box = byId('stonk-action-content'); const a = state.action
    if (!box || !a) return
    box.textContent = ''
    const asset = token(a.pool.token); const reward = token(a.pool.chef.rewardToken)
    box.appendChild(e('h2', { id: 'stonk-action-title', text: a.kind + ' · ' + a.pool.chef.label + ' #' + a.pool.pid + ' · ' + poolName(a.pool) }))
    if (!state.account) { box.appendChild(e('p', { text: 'Connect wallet.' })); return }
    if (!correctChain()) { box.appendChild(e('p', { text: 'Switch to Robinhood Chain.' })); return }
    if (a.kind !== 'claim') {
      const row = e('label', { className: 'stonk-input' })
      row.appendChild(document.createTextNode(asset.symbol + ' : '))
      const input = e('input'); input.value = a.amount; input.inputMode = 'decimal'
      input.addEventListener('input', () => { a.amount = input.value })
      row.appendChild(input)
      if (state.actionInfo) row.appendChild(button('max', () => { a.amount = format(a.kind === 'withdraw' ? state.actionInfo.staked : state.actionInfo.balance, asset.decimals, asset.decimals); renderAction() }))
      box.appendChild(row)
      if (state.actionInfo) box.appendChild(e('p', { text: 'wallet ' + format(state.actionInfo.balance, asset.decimals) + ' · staked ' + format(state.actionInfo.staked, asset.decimals) }))
      if (a.kind === 'deposit' && a.pool.depositFeeBps) box.appendChild(e('p', { text: 'Deposit fee ' + (a.pool.depositFeeBps / 100).toFixed(2) + '% taken from the amount.' }))
      if (a.kind === 'withdraw' && a.pool.chef.key === 'farm') box.appendChild(e('p', { text: 'Rewards stay pending after a withdraw; claim them separately.' }))
    } else if (state.actionInfo) box.appendChild(e('p', { text: 'Pending ' + format(state.actionInfo.pending, reward.decimals) + ' ' + reward.symbol }))
    const actions = e('div', { className: 'stonk-dialog-actions' })
    if (a.kind === 'deposit') actions.appendChild(button('approve', approve, state.sending))
    actions.appendChild(button(a.kind === 'claim' ? 'claim' : 'submit', submit, state.sending))
    box.appendChild(actions)
  }

  async function hydrateWallet () {
    if (!state.account) return
    const calls = []
    state.pools.forEach(p => {
      calls.push({ target: p.chef.address, iface: p.chef.iface, method: 'userInfo', args: [p.pid, state.account], fallback: null, decode: value => value })
      p.chef.pending.forEach(method => calls.push({ target: p.chef.address, iface: p.chef.iface, method, args: [p.pid, state.account], fallback: ethers.constants.Zero }))
    })
    const values = await batch(calls)
    let cursor = 0
    state.pools.forEach(p => {
      p.user = values[cursor++]
      p.pending = p.chef.pending.reduce(sum => sum.add(values[cursor++]), ethers.constants.Zero)
    })
  }

  function bindProvider (provider) {
    if (!provider || state.boundProvider === provider || !provider.on) return
    state.boundProvider = provider
    provider.on('accountsChanged', function (accounts) { adopt(provider, accounts || [], state.walletChain, state.walletSource).catch(error => setStatus(errText(error), 'error')) })
    provider.on('chainChanged', function (chainId) { adopt(provider, state.account ? [state.account] : [], chainId, state.walletSource).catch(error => setStatus(errText(error), 'error')) })
  }

  async function adopt (provider, accounts, chainId, source, withWallet) {
    state.eip1193 = provider
    state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
    state.walletChain = chainId
    state.walletSource = source || 'wallet'
    bindProvider(provider)
    render()
    if (withWallet !== false && state.account && correctChain()) await hydrateWallet()
    render()
    return !!state.account
  }

  async function restoreInjected (withWallet) {
    const provider = injected(); if (!provider) return
    try {
      const accounts = await provider.request({ method: 'eth_accounts' })
      const chainId = await provider.request({ method: 'eth_chainId' })
      if (accounts && accounts[0]) await adopt(provider, accounts, chainId, 'injected', withWallet)
      else { state.account = null; state.walletChain = chainId; render() }
    } catch (_) { state.account = null; render() }
  }

  async function connectInjected () {
    const provider = injected(); if (!provider) { setStatus('No injected wallet.', 'error'); return }
    const accounts = await provider.request({ method: 'eth_requestAccounts' })
    const chainId = await provider.request({ method: 'eth_chainId' })
    await adopt(provider, accounts, chainId, 'injected')
    setStatus(correctChain() ? '' : 'Switch to Robinhood Chain.', correctChain() ? '' : 'error')
  }

  async function connectOther () {
    const reown = await import('./config.js')
    if (!reown.REOWN_PROJECT_ID) throw new Error('Optional wallet support is unavailable.')
    const kit = reown.createAppKitInstance(); if (!kit) throw new Error('Optional wallet support is unavailable.')
    const onAccount = async account => {
      if (!account || !account.isConnected) return
      const provider = await kit.getWalletProvider()
      await adopt(provider, await provider.request({ method: 'eth_accounts' }), await provider.request({ method: 'eth_chainId' }), 'other wallet')
      if (state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null }
    }
    if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true })
    if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error')))
    await kit.open()
  }

  async function refreshAll () {
    loading('Reading StonkPress farms…')
    await discover(); await loadTokens(); await loadPrices(); applyRates()
    await hydrateWallet(); loading(); render()
  }

  function bind () {
    byId('stonk-connect').addEventListener('click', () => connectInjected().catch(error => setStatus(errText(error), 'error')))
    byId('stonk-other-wallet').addEventListener('click', () => connectOther().catch(error => setStatus(errText(error), 'error')))
    byId('stonk-zero-toggle').addEventListener('click', () => { state.showZero = !state.showZero; byId('stonk-zero-toggle').textContent = state.showZero ? '[ hide ended ]' : '[ show ended ]'; renderFarms() })
    byId('stonk-refresh').addEventListener('click', () => refreshAll().then(() => setStatus('')).catch(error => { loading(); setStatus(errText(error), 'error') }))
  }

  async function start () {
    state.rpc = new ethers.providers.StaticJsonRpcProvider(chain.rpc, { chainId: chain.number, name: 'robinhood' })
    bind(); render()
    await refreshAll(); setStatus('')
    await restoreInjected(false)
    if (state.account) hydrateWallet().then(render).catch(() => {})
  }

  function fatal (error) {
    console.error('StonkPress page load failed', error)
    loading()
    setStatus(errText(error), 'error')
    const target = byId('stonk-farms')
    if (target) { target.textContent = ''; target.appendChild(e('pre', { text: errText(error) })) }
  }

  return { start, fatal }
})()
