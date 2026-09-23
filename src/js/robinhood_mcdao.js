/* Meridian Capital (mcdao.io) Genesis Farm on Robinhood Chain. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { McDaoPage.start().catch(McDaoPage.fatal) })

const McDaoPage = (function () {
  const chain = { id: '0x1237', number: 4663, rpc: 'https://rpc.mainnet.chain.robinhood.com' }
  const address = {
    farm: '0xE5BffCF30D18c27Dac29b2EDF8a608b2E2BB52F7',
    gmcd: '0x296182D54dc5cBe6d960b9cFe3882dD5c87d51fd',
    usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168',
    weth: '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73',
    gigaFactory: '0x6Fdf38f92eAd1adFc04B73aaa947ab254f6c0916',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  const secondsPerYear = 365 * 24 * 60 * 60
  const secondsPerWeek = 7 * 24 * 60 * 60
  const minUsdAnchor = 500
  const minUsdPrice = 1e-9
  const maxUsdPrice = 1e9

  const erc20Abi = ['function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)']
  const farmAbi = [
    'function poolLength() view returns(uint256)', 'function totalAllocPoint() view returns(uint256)', 'function rewardPerSecond() view returns(uint256)', 'function rewardToken() view returns(address)',
    'function poolStartTime() view returns(uint256)', 'function poolEndTime() view returns(uint256)', 'function runningTime() view returns(uint256)', 'function totalRewards() view returns(uint256)',
    'function convertible() view returns(address)', 'function CONVERT_WINDOW() view returns(uint256)',
    'function poolInfo(uint256) view returns(address,uint256,uint256,uint256,bool,uint16)',
    'function userInfo(uint256,address) view returns(uint256,uint256)', 'function pendingReward(uint256,address) view returns(uint256)',
    'function deposit(uint256,uint256)', 'function withdraw(uint256,uint256)', 'function harvest(uint256[])', 'function emergencyWithdraw(uint256)', 'function convert(uint256,uint256) returns(uint256)'
  ]
  const pairFactoryAbi = ['function getPair(address,address,bool) view returns(address)']
  const pairAbi = ['function token0() view returns(address)', 'function token1() view returns(address)', 'function getReserves() view returns(uint256,uint256,uint256)', 'function stable() view returns(bool)']
  const multiAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']

  const erc20 = new ethers.utils.Interface(erc20Abi)
  const farm = new ethers.utils.Interface(farmAbi)
  const pairFactory = new ethers.utils.Interface(pairFactoryAbi)
  const pair = new ethers.utils.Interface(pairAbi)

  const state = {
    rpc: null, eip1193: null, account: null, walletChain: null, walletSource: null, boundProvider: null, reownUnsubscribe: null,
    headTime: null, meta: null, farms: [], tokens: new Map(), prices: new Map(), showZero: false,
    action: null, actionInfo: null, sending: false, status: '', spinner: null
  }

  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const short = value => value ? value.slice(0, 6) + '…' + value.slice(-4) : '—'
  const isUsdG = value => lower(value) === lower(address.usdg)
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
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }

  function setStatus (text, kind) { state.status = text || ''; const node = byId('mcdao-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (text) { const box = byId('mcdao-loading'); const spin = byId('mcdao-loading-spin'); if (!box) return; box.hidden = !text; if (text && spin) spin.textContent = '[....]'; if (text && !state.spinner) { let index = 0; state.spinner = window.setInterval(() => { if (spin) spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) } if (!text && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }
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

  function campaignPhase () {
    const meta = state.meta; const now = state.headTime
    if (!meta || !now) return '—'
    if (now < meta.poolStartTime) return 'starts ' + new Date(meta.poolStartTime * 1000).toUTCString().replace(' GMT', ' UTC')
    if (now < meta.poolEndTime) return 'live'
    if (!isZero(meta.convertible) && meta.convertEnd && now < meta.convertEnd) return 'convert window'
    return 'ended'
  }

  async function discover () {
    const block = await state.rpc.getBlock('latest'); state.headTime = block ? Number(block.timestamp) : Math.floor(Date.now() / 1000)
    const heads = await batch([
      { target: address.farm, iface: farm, method: 'poolLength', fallback: ethers.constants.Zero },
      { target: address.farm, iface: farm, method: 'totalAllocPoint', fallback: ethers.constants.Zero },
      { target: address.farm, iface: farm, method: 'rewardPerSecond', fallback: ethers.constants.Zero },
      { target: address.farm, iface: farm, method: 'rewardToken', fallback: address.gmcd },
      { target: address.farm, iface: farm, method: 'poolStartTime', fallback: null },
      { target: address.farm, iface: farm, method: 'poolEndTime', fallback: null },
      { target: address.farm, iface: farm, method: 'runningTime', fallback: null },
      { target: address.farm, iface: farm, method: 'totalRewards', fallback: null },
      { target: address.farm, iface: farm, method: 'convertible', fallback: ethers.constants.AddressZero },
      { target: address.farm, iface: farm, method: 'CONVERT_WINDOW', fallback: ethers.constants.Zero }
    ])
    const poolCount = Number(heads[0]); const convertWindow = Number(heads[9].toString())
    state.meta = {
      poolCount, totalAlloc: heads[1], rewardPerSecond: heads[2], rewardToken: heads[3],
      poolStartTime: heads[4] ? heads[4].toNumber() : null, poolEndTime: heads[5] ? heads[5].toNumber() : null,
      runningTime: heads[6] ? heads[6].toNumber() : null, totalRewards: heads[7], convertible: heads[8],
      convertEnd: heads[5] ? heads[5].toNumber() + convertWindow : null
    }
    const infos = await batch(Array.from({ length: poolCount }, (_, pid) => ({ target: address.farm, iface: farm, method: 'poolInfo', args: [pid], fallback: null, decode: value => value })))
    state.farms = infos.map((info, pid) => info && ({
      pid, token: info[0], allocPoint: info[1], lastRewardTime: info[2], accRewardPerShare: info[3], started: Boolean(info[4]), depositFeeBps: Number(info[5]),
      tvl: NaN, tvlUsd: NaN, rate: NaN, rateUsd: NaN, apr: NaN, user: null, pending: null
    })).filter(Boolean)
  }

  async function loadTokens () {
    const list = [...new Set([lower(address.usdg), lower(address.weth), lower(address.gmcd)].concat(state.farms.map(f => lower(f.token))))]
    const calls = []; list.forEach(value => calls.push({ target: value, iface: erc20, method: 'symbol', fallback: null }, { target: value, iface: erc20, method: 'decimals', fallback: null }))
    const values = await batch(calls)
    list.forEach((value, i) => {
      const symbol = values[i * 2] || short(value)
      state.tokens.set(lower(value), { address: ethers.utils.getAddress(value), symbol: String(symbol).replace(/[\r\n]/g, ' ').slice(0, 18), decimals: values[i * 2 + 1] === null ? null : Number(values[i * 2 + 1]) })
    })
  }

  async function loadTvls () {
    const calls = state.farms.map(f => ({ target: f.token, iface: erc20, method: 'balanceOf', args: [address.farm], fallback: ethers.constants.Zero }))
    const balances = await batch(calls)
    state.farms.forEach((farm, i) => { farm.tvl = balances[i] })
  }

  async function seedWethUsd () {
    const wethPair = await batch([
      { target: address.gigaFactory, iface: pairFactory, method: 'getPair', args: [address.weth, address.usdg, false], fallback: ethers.constants.AddressZero },
      { target: address.gigaFactory, iface: pairFactory, method: 'getPair', args: [address.weth, address.usdg, true], fallback: ethers.constants.AddressZero }
    ])
    let bestWeth = { price: NaN, depth: 0 }
    for (const pairAddress of wethPair) {
      if (isZero(pairAddress)) continue
      const values = await batch([
        { target: pairAddress, iface: pair, method: 'token0', fallback: null },
        { target: pairAddress, iface: pair, method: 'token1', fallback: null },
        { target: pairAddress, iface: pair, method: 'getReserves', fallback: null, decode: value => value }
      ])
      const dec0 = token(values[0]).decimals; const dec1 = token(values[1]).decimals; const reserves = values[2]
      if (!reserves || dec0 === null || dec1 === null) continue
      const r0 = num(reserves[0], dec0); const r1 = num(reserves[1], dec1)
      let price = NaN; let depth = NaN
      if (isUsdG(values[1]) && finite(r0) && finite(r1) && r0 > 0) { price = r1 / r0; depth = r1 }
      if (isUsdG(values[0]) && finite(r0) && finite(r1) && r1 > 0) { price = r0 / r1; depth = r0 }
      if (!finite(price) || price < minUsdPrice || price > maxUsdPrice || !finite(depth) || depth < minUsdAnchor) continue
      if (depth > bestWeth.depth) bestWeth = { price, depth }
    }
    if (finite(bestWeth.price)) state.prices.set(lower(address.weth), bestWeth.price)
  }

  async function loadPrices () {
    state.prices = new Map([[lower(address.usdg), 1]])
    await seedWethUsd()
    const anchors = [address.gmcd]
    state.farms.forEach(f => { if (!isUsdG(f.token)) anchors.push(f.token) })
    const unique = [...new Set(anchors.map(lower))]
    const pairCalls = []
    unique.forEach(token => {
      pairCalls.push({ token, stable: false, target: address.gigaFactory, iface: pairFactory, method: 'getPair', args: [token, address.usdg, false], fallback: ethers.constants.AddressZero })
      pairCalls.push({ token, stable: true, target: address.gigaFactory, iface: pairFactory, method: 'getPair', args: [token, address.usdg, true], fallback: ethers.constants.AddressZero })
      pairCalls.push({ token, weth: true, target: address.gigaFactory, iface: pairFactory, method: 'getPair', args: [token, address.weth, false], fallback: ethers.constants.AddressZero })
    })
    const pairs = await batch(pairCalls)
    const reserveCalls = []
    const pairMeta = []
    pairs.forEach((pairAddress, index) => {
      if (isZero(pairAddress)) return
      pairMeta.push({ token: pairCalls[index].token, pair: pairAddress, weth: pairCalls[index].weth })
      reserveCalls.push({ target: pairAddress, iface: pair, method: 'token0', fallback: null }, { target: pairAddress, iface: pair, method: 'token1', fallback: null }, { target: pairAddress, iface: pair, method: 'getReserves', fallback: null, decode: value => value })
    })
    const reserveValues = await batch(reserveCalls)
    let cursor = 0
    const bestDepth = new Map()
    pairMeta.forEach(meta => {
      const token0 = reserveValues[cursor++]; const token1 = reserveValues[cursor++]; const reserves = reserveValues[cursor++]
      if (!reserves) return
      const a = token(meta.token); const dec0 = token(token0).decimals; const dec1 = token(token1).decimals
      if (dec0 === null || dec1 === null) return
      const r0 = num(reserves[0], dec0); const r1 = num(reserves[1], dec1)
      let price = NaN; let depth = NaN
      if (isUsdG(token1) && finite(r0) && finite(r1) && r0 > 0) { price = r1 / r0; depth = r1 }
      if (isUsdG(token0) && finite(r0) && finite(r1) && r1 > 0) { price = r0 / r1; depth = r0 }
      if (meta.weth && lower(token1) === lower(address.weth) && finite(r0) && finite(r1) && r0 > 0) {
        const wethUsd = state.prices.get(lower(address.weth))
        if (finite(wethUsd)) { price = (r1 / r0) * wethUsd; depth = r1 * wethUsd }
      }
      if (meta.weth && lower(token0) === lower(address.weth) && finite(r0) && finite(r1) && r1 > 0) {
        const wethUsd = state.prices.get(lower(address.weth))
        if (finite(wethUsd)) { price = (r0 / r1) * wethUsd; depth = r0 * wethUsd }
      }
      const key = lower(meta.token)
      if (!finite(price) || price < minUsdPrice || price > maxUsdPrice || !finite(depth) || depth < minUsdAnchor) return
      if (meta.weth && state.prices.has(key)) return
      const prev = bestDepth.get(key) || 0
      if (depth >= prev) { bestDepth.set(key, depth); state.prices.set(key, price) }
    })
  }

  function applyRates () {
    const meta = state.meta; if (!meta || meta.totalAlloc.isZero()) return
    const gmcd = token(meta.rewardToken); const gmcdPrice = state.prices.get(lower(meta.rewardToken))
    state.farms.forEach(farm => {
      const share = ethers.BigNumber.from(farm.allocPoint)
      const rateWei = meta.rewardPerSecond.mul(share).div(meta.totalAlloc)
      farm.rate = num(rateWei, gmcd.decimals)
      farm.rateUsd = finite(farm.rate) && finite(gmcdPrice) ? farm.rate * gmcdPrice : NaN
      const asset = token(farm.token); const price = state.prices.get(lower(farm.token))
      const tvlNum = num(farm.tvl, asset.decimals)
      farm.tvlUsd = finite(tvlNum) && finite(price) ? tvlNum * price : NaN
      farm.apr = finite(farm.rateUsd) && finite(farm.tvlUsd) && farm.tvlUsd > 0 ? farm.rateUsd * secondsPerYear / farm.tvlUsd * 100 : NaN
      farm.gmcdPerStakeYear = finite(farm.rate) && finite(tvlNum) && tvlNum > 0 ? farm.rate * secondsPerYear / tvlNum : NaN
    })
  }

  function pricedCount () { return state.farms.filter(f => finite(f.tvlUsd)).length }

  function renderSummary () {
    const node = byId('mcdao-summary'); const wallet = byId('mcdao-wallet-status'); if (wallet) wallet.textContent = state.account ? short(state.account) + (correctChain() ? '' : ' · wrong chain') : ''
    if (!node || !state.meta) return
    const gmcd = token(state.meta.rewardToken)
    const totalRate = num(state.meta.rewardPerSecond, gmcd.decimals)
    const priced = pricedCount()
    node.textContent = 'Genesis · ' + state.farms.length + ' pools · ' + priced + '/' + state.farms.length + ' priced · ' + campaignPhase() + ' · ' + (finite(totalRate) ? compact(totalRate, 4) + ' gMCD/s' : '—')
  }

  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'mcdao-action', disabled: disabled || state.sending }); node.addEventListener('click', () => fn().catch(error => setStatus(errText(error), 'error'))); return node }
  function addHeader (table, labels) { const row = table.insertRow(); labels.forEach(label => row.appendChild(e('th', { text: label }))) }
  function addCell (row, text, className) { row.appendChild(e('td', { text, className })) }
  function nameCell (title, line) { const cell = e('td'); cell.appendChild(e('span', { text: title, className: 'mcdao-name' })); if (line) cell.appendChild(e('span', { text: line, className: 'mcdao-sub' })); return cell }

  function renderFarms () {
    const target = byId('mcdao-farms'); if (!target) return; target.textContent = ''
    const list = state.farms.filter(f => state.showZero || finite(f.apr) || finite(f.gmcdPerStakeYear) || (finite(f.rate) && f.rate > 0))
    const table = e('table', { className: 'mcdao-table' })
    addHeader(table, ['Pool', 'TVL', 'Fee', 'APR', 'gMCD / week', 'Actions'])
    list.forEach(farm => {
      const asset = token(farm.token)
      const row = table.insertRow()
      row.appendChild(nameCell('# ' + farm.pid + ' · ' + asset.symbol, farm.started ? '' : 'not started'))
      addCell(row, finite(farm.tvlUsd) ? usd(farm.tvlUsd) : format(farm.tvl, asset.decimals) + ' ' + asset.symbol, finite(farm.tvlUsd) ? '' : 'mcdao-unpriced')
      addCell(row, (farm.depositFeeBps / 100).toFixed(2) + '%')
      const apr = farm.apr
      const gmcdYield = farm.gmcdPerStakeYear
      const weekly = finite(farm.rate) ? farm.rate * secondsPerWeek : NaN
      let aprText = '0.00%'
      if (finite(apr)) aprText = percent(apr)
      else if (finite(gmcdYield)) aprText = compact(gmcdYield, 4) + ' gMCD/' + asset.symbol + '/yr'
      else if (finite(farm.rate) && farm.rate > 0) aprText = '—'
      addCell(row, aprText, finite(apr) ? '' : (finite(gmcdYield) ? 'mcdao-unpriced' : (finite(farm.rate) && farm.rate > 0 ? 'mcdao-unpriced' : '')))
      addCell(row, finite(weekly) ? compact(weekly, 4) + ' gMCD' + (finite(farm.rateUsd) ? '\n' + usd(weekly * (farm.rateUsd / farm.rate)) : '') : '—', finite(farm.rateUsd) ? '' : 'mcdao-unpriced')
      const actions = e('td', { className: 'mcdao-actions' })
      append(actions, button('deposit', () => openAction('deposit', farm)), button('withdraw', () => openAction('withdraw', farm)), button('claim', () => openAction('claim', farm)))
      row.appendChild(actions)
    })
    target.appendChild(table)
  }

  function renderPositions () {
    const target = byId('mcdao-positions'); if (!target) return; target.textContent = ''
    const rows = state.farms.filter(f => f.user && (!f.user[0].isZero() || (f.pending && !f.pending.isZero())))
    target.hidden = !state.account || !rows.length; if (target.hidden) return
    const gmcd = token(state.meta.rewardToken)
    const table = e('table', { className: 'mcdao-table' }); addHeader(table, ['Position', 'Staked / pending', 'Actions'])
    rows.forEach(farm => {
      const asset = token(farm.token)
      const row = table.insertRow()
      row.appendChild(nameCell('# ' + farm.pid + ' · ' + asset.symbol))
      addCell(row, 'staked ' + format(farm.user[0], asset.decimals) + ' ' + asset.symbol + '\npending ' + format(farm.pending, gmcd.decimals) + ' gMCD')
      const actions = e('td', { className: 'mcdao-actions' })
      append(actions, button('deposit', () => openAction('deposit', farm)), button('withdraw', () => openAction('withdraw', farm)), button('claim', () => openAction('claim', farm)))
      row.appendChild(actions)
    })
    target.appendChild(table)
  }

  function render () { renderSummary(); renderFarms(); renderPositions(); if (state.action) renderAction() }

  async function openAction (kind, farm) { state.action = { kind, farm, amount: kind === 'claim' ? '' : '0' }; state.actionInfo = null; const dialog = byId('mcdao-action-dialog'); if (dialog && !dialog.open) dialog.showModal(); renderAction(); if (state.account && correctChain()) { await refreshActionInfo(); renderAction() } }
  async function refreshActionInfo () {
    const a = state.action; if (!a || !state.account) return
    const asset = token(a.farm.token)
    const values = await batch([
      { target: asset.address, iface: erc20, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero },
      { target: asset.address, iface: erc20, method: 'allowance', args: [state.account, address.farm], fallback: ethers.constants.Zero },
      { target: address.farm, iface: farm, method: 'userInfo', args: [a.farm.pid, state.account], fallback: null, decode: value => value },
      { target: address.farm, iface: farm, method: 'pendingReward', args: [a.farm.pid, state.account], fallback: ethers.constants.Zero }
    ])
    state.actionInfo = { balance: values[0], allowance: values[1], staked: values[2] ? values[2][0] : ethers.constants.Zero, pending: values[3] }
  }

  function parseAmount (value, asset) {
    if (!/^\d+(\.\d+)?$/.test(String(value || '').trim())) throw new Error('Enter a positive decimal amount.')
    if (asset.decimals === null) throw new Error('Token decimals unavailable.')
    const amount = ethers.utils.parseUnits(String(value).trim(), asset.decimals)
    if (amount.lte(0)) throw new Error('Amount must be greater than zero.')
    return amount
  }

  function buildAction () {
    const a = state.action; const account = state.account
    if (!a || !account) throw new Error('Connect a wallet first.')
    if (a.kind === 'deposit') {
      const asset = token(a.farm.token); const amount = parseAmount(a.amount, asset)
      return { to: address.farm, data: farm.encodeFunctionData('deposit', [a.farm.pid, amount]), amount, asset }
    }
    if (a.kind === 'withdraw') {
      const asset = token(a.farm.token); const amount = parseAmount(a.amount, asset)
      return { to: address.farm, data: farm.encodeFunctionData('withdraw', [a.farm.pid, amount]) }
    }
    if (a.kind === 'claim') return { to: address.farm, data: farm.encodeFunctionData('harvest', [[a.farm.pid]]) }
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
      await send({ to: tx.asset.address, data: erc20.encodeFunctionData('approve', [address.farm, tx.amount]) })
      await refreshActionInfo(); setStatus('Approved.', 'success')
    } finally { state.sending = false; renderAction() }
  }

  async function submit () {
    requireWallet()
    state.sending = true; renderAction()
    try {
      const tx = buildAction()
      if (tx.amount && state.actionInfo) {
        if (state.actionInfo.allowance.lt(tx.amount)) throw new Error('Approve ' + token(state.action.farm.token).symbol + ' first.')
        if (state.actionInfo.balance.lt(tx.amount)) throw new Error('Insufficient balance.')
      }
      await send(tx)
      await hydrateWallet(); await loadTvls(); applyRates()
      if (state.action) await refreshActionInfo()
      setStatus('Confirmed.', 'success')
    } finally { state.sending = false; render() }
  }

  function renderAction () {
    const box = byId('mcdao-action-content'); const a = state.action
    if (!box || !a) return
    box.textContent = ''
    const asset = token(a.farm.token)
    box.appendChild(e('h2', { id: 'mcdao-action-title', text: a.kind + ' · #' + a.farm.pid + ' · ' + asset.symbol }))
    if (!state.account) { box.appendChild(e('p', { text: 'Connect wallet.' })); return }
    if (!correctChain()) { box.appendChild(e('p', { text: 'Switch to Robinhood Chain.' })); return }
    if (a.kind !== 'claim') {
      const row = e('label', { className: 'mcdao-input' })
      row.appendChild(document.createTextNode(asset.symbol + ' : '))
      const input = e('input'); input.value = a.amount; input.inputMode = 'decimal'
      input.addEventListener('input', () => { a.amount = input.value })
      row.appendChild(input)
      if (state.actionInfo) row.appendChild(button('max', () => { a.amount = a.kind === 'withdraw' ? format(state.actionInfo.staked, asset.decimals) : format(state.actionInfo.balance, asset.decimals); renderAction() }))
      box.appendChild(row)
      if (state.actionInfo) box.appendChild(e('p', { text: 'wallet ' + format(state.actionInfo.balance, asset.decimals) + ' · staked ' + format(state.actionInfo.staked, asset.decimals) }))
      if (a.kind === 'deposit' && a.farm.depositFeeBps) box.appendChild(e('p', { text: 'Deposit fee ' + (a.farm.depositFeeBps / 100).toFixed(2) + '% taken from the amount.' }))
    } else if (state.actionInfo) box.appendChild(e('p', { text: 'Pending ' + format(state.actionInfo.pending, token(state.meta.rewardToken).decimals) + ' gMCD' }))
    const actions = e('div', { className: 'mcdao-dialog-actions' })
    if (a.kind === 'deposit') actions.appendChild(button('approve', approve, state.sending))
    actions.appendChild(button(a.kind === 'claim' ? 'claim' : 'submit', submit, state.sending))
    box.appendChild(actions)
  }

  async function hydrateWallet () {
    if (!state.account) return
    const calls = []
    state.farms.forEach(f => calls.push(
      { target: address.farm, iface: farm, method: 'userInfo', args: [f.pid, state.account], fallback: null, decode: value => value },
      { target: address.farm, iface: farm, method: 'pendingReward', args: [f.pid, state.account], fallback: ethers.constants.Zero }
    ))
    const values = await batch(calls)
    state.farms.forEach((f, i) => { f.user = values[i * 2]; f.pending = values[i * 2 + 1] })
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
    loading('Reading Genesis farms…')
    await discover(); await loadTokens(); await loadTvls(); await loadPrices(); applyRates()
    await hydrateWallet(); loading(); render()
  }

  function bind () {
    byId('mcdao-connect').addEventListener('click', () => connectInjected().catch(error => setStatus(errText(error), 'error')))
    byId('mcdao-other-wallet').addEventListener('click', () => connectOther().catch(error => setStatus(errText(error), 'error')))
    byId('mcdao-zero-toggle').addEventListener('click', () => { state.showZero = !state.showZero; byId('mcdao-zero-toggle').textContent = state.showZero ? '[ hide zero apr ]' : '[ show zero apr ]'; renderFarms() })
    byId('mcdao-refresh').addEventListener('click', () => refreshAll().then(() => setStatus('')).catch(error => { loading(); setStatus(errText(error), 'error') }))
  }

  async function start () {
    state.rpc = new ethers.providers.StaticJsonRpcProvider(chain.rpc, { chainId: chain.number, name: 'robinhood' })
    bind(); render()
    await refreshAll(); setStatus('')
    await restoreInjected(false)
    if (state.account) hydrateWallet().then(render).catch(() => {})
  }

  function fatal (error) {
    console.error('McDAO page load failed', error)
    loading()
    setStatus(errText(error), 'error')
    const target = byId('mcdao-farms')
    if (target) { target.textContent = ''; target.appendChild(e('pre', { text: errText(error) })) }
  }

  return { start, fatal }
})()
