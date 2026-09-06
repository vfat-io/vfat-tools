/* 3Jane on Ethereum: direct contracts, factory discovery, and official Merkle allocations. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { ThreeJanePage.start().catch(ThreeJanePage.fatal) })

const ThreeJanePage = (function () {
  const chain = {
    id: '0x1', number: 1, name: 'Ethereum', rpc: 'https://ethereum-rpc.publicnode.com',
    explorer: 'https://etherscan.io', nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
  }
  const address = {
    usd3: '0x056B269Eb1f75477a8666ae8C7fE01b64dD55eCc',
    susd3: '0xf689555121e529Ff0463e191F9Bd9d1E496164a7',
    morphoVault: '0xe05faDf242331808f504661BEA65972594869826',
    curve: '0x7BA89Bc658c07569cfa6d7947adAA80181a24568',
    pendleUsd3: '0x4a5067c3ff1abb7449244025b0e37feaf77d8e3e',
    pendleSusd3: '0x7972DE1c2f9F11f622a188FBae8c0a943880424F',
    lccFactory: '0x95431c2Fbfe3E0f17a61EF1d7601Eb34aE6cd6ba',
    lccHelper: '0x7C3c37dF5508103Ec0E5eE4B3715f2fB58962c66',
    jane: '0x333333330522f64ee8d0b3039c460b41670e3404',
    rewards: '0xaC6985D4dBcd89CCAD71DB9bf0309eaF57F064e8',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  const zero = ethers.constants.Zero
  const zeroAddress = ethers.constants.AddressZero
  const maxUint = ethers.constants.MaxUint256
  const bps = ethers.BigNumber.from(10000)
  const oracleScale = ethers.BigNumber.from(10).pow(36)
  const convexUrl = 'https://opulent-crocodile-74.convex.cloud/api/'
  const opportunityKeys = {
    usd3: 'USD3', susd3: 'SUSD3', morpho: 'MORPHO_3JANE_ECOSYSTEM_VAULT', curve: 'CURVE_USD3_FRXUSD_LP',
    usd3Lp: 'PENDLE_LP', usd3Yt: 'PENDLE_YT', susd3Lp: 'PENDLE_SUSD3_LP', susd3Yt: 'PENDLE_SUSD3_YT'
  }
  const phaseNames = ['Normal', 'Pre-call', 'Funding', 'Closed']

  const erc20Abi = [
    'function name() view returns(string)', 'function symbol() view returns(string)', 'function decimals() view returns(uint8)',
    'function totalSupply() view returns(uint256)', 'function balanceOf(address) view returns(uint256)',
    'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)'
  ]
  const vaultAbi = erc20Abi.concat([
    'function asset() view returns(address)', 'function totalAssets() view returns(uint256)',
    'function convertToAssets(uint256) view returns(uint256)', 'function previewDeposit(uint256) view returns(uint256)',
    'function maxDeposit(address) view returns(uint256)', 'function maxWithdraw(address) view returns(uint256)',
    'function deposit(uint256,address) returns(uint256)', 'function withdraw(uint256,address,address) returns(uint256)'
  ])
  const susd3Abi = vaultAbi.concat([
    'function lockDuration() view returns(uint256)', 'function cooldownDuration() view returns(uint256)',
    'function withdrawalWindow() view returns(uint256)', 'function getCooldownStatus(address) view returns(uint256 cooldownEnd,uint256 windowEnd,uint256 shares)',
    'function startCooldown(uint256)', 'function cancelCooldown()', 'function withdraw() returns(uint256)'
  ])
  const pendleAbi = erc20Abi.concat([
    'function readTokens() view returns(address sy,address pt,address yt)', 'function expiry() view returns(uint256)',
    'function getRewardTokens() view returns(address[])', 'function redeemRewards(address) returns(uint256[])'
  ])
  const syAbi = erc20Abi.concat(['function exchangeRate() view returns(uint256)'])
  const curveAbi = erc20Abi.concat([
    'function coins(uint256) view returns(address)', 'function get_virtual_price() view returns(uint256)',
    'function calc_token_amount(uint256[],bool) view returns(uint256)',
    'function calc_withdraw_one_coin(uint256,int128) view returns(uint256)',
    'function add_liquidity(uint256[],uint256,address) returns(uint256)',
    'function remove_liquidity_one_coin(uint256,int128,uint256,address) returns(uint256)'
  ])
  const factoryAbi = ['function allVaults() view returns(address[])']
  const helperAbi = [
    'function usdc() view returns(address)', 'function aEthUSDC() view returns(address)', 'function waEthUSDC() view returns(address)',
    'function usdt() view returns(address)', 'function aEthUSDT() view returns(address)', 'function waEthUSDT() view returns(address)',
    'function depositUSDC((address vault,uint256 amountIn,uint256 minMarginShares,uint256 minCommitment,uint256 maxCommitment,bool allowPendingActivation,uint256 deadline)) returns(uint256)',
    'function depositUSDT((address vault,uint256 amountIn,uint256 minMarginShares,uint256 minCommitment,uint256 maxCommitment,bool allowPendingActivation,uint256 deadline)) returns(uint256)'
  ]
  const lccAbi = [
    'function currentEpoch() view returns(uint256)', 'function currentPhase() view returns(uint8)',
    'function phaseEndsAt(uint256,uint8) view returns(uint256)',
    'function pauseState() view returns(bool paused,uint64 pausedAt,uint64 pausedAccumulated)',
    'function assetConfig() view returns(tuple(address marginAsset,address fundingAsset,address usd3,address notificationVault,address marginOracle,address treasury))',
    'function epochConfig() view returns(tuple(uint256 startTimestamp,uint256 maxEpochs,uint256 epochLength,uint256 normalDuration,uint256 preCallDuration,uint256 fundingDuration,uint256 marginRatioBps,uint256 exitDelayEpochs,uint256 minCommitmentEpochs))',
    'function riskConfig() view returns(tuple(uint256 protocolCommitmentCap,uint256 userCommitmentCap,uint256 exitCapBps,uint256 minDepositAssets,uint256 maxAuctionAwardBps,uint256 slashFeeBps))',
    'function totals() view returns(tuple(uint128 activeMargin,uint128 activeCommitment,uint128 pendingMargin,uint128 pendingCommitment))',
    'function shutdownState() view returns(tuple(bool active,uint64 timestamp,uint64 epoch))',
    'function getAccount(address) view returns(tuple(uint256 activeMargin,uint256 activeCommitment,uint256 pendingMargin,uint256 pendingCommitment,uint256 pendingActivationEpoch,uint256 calledEpochCursor,uint256 claimableExitMargin,uint256 exitBucketMargin,uint256 exitBucketCommitment,bool exitRequested,uint256 exitMaturityEpoch,bool exitClaimed,bool exitMatured,uint256 commitmentStartEpoch))',
    'function obligationOf(uint256,address) view returns(uint256)', 'function fundedEpoch(uint256,address) view returns(bool)',
    'function deposit(uint256,address,uint256,uint256,bool,uint256) returns(uint256)',
    'function requestExit(uint256,uint256) returns(uint256)', 'function fundCall(bool) returns(uint256)',
    'function claimExitedMargin(address) returns(uint256)', 'function claimRemainingMargin(address) returns(uint256)'
  ]
  const stataAbi = vaultAbi.concat(['function aToken() view returns(address)'])
  const oracleAbi = ['function price() view returns(uint256)']
  const rewardsAbi = [
    'function epoch() view returns(uint256)', 'function merkleRoot() view returns(bytes32)', 'function claimed(address) view returns(uint256)',
    'function totalClaimed() view returns(uint256)', 'function maxClaimable() view returns(uint256)',
    'function claim(address,uint256,bytes32[])'
  ]
  const janeAbi = erc20Abi.concat(['function transferable() view returns(bool)'])
  const multiAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const erc20 = new ethers.utils.Interface(erc20Abi)
  const vault = new ethers.utils.Interface(vaultAbi)
  const susd3 = new ethers.utils.Interface(susd3Abi)
  const pendle = new ethers.utils.Interface(pendleAbi)
  const sy = new ethers.utils.Interface(syAbi)
  const curve = new ethers.utils.Interface(curveAbi)
  const helper = new ethers.utils.Interface(helperAbi)
  const lcc = new ethers.utils.Interface(lccAbi)
  const stata = new ethers.utils.Interface(stataAbi)
  const oracle = new ethers.utils.Interface(oracleAbi)
  const rewards = new ethers.utils.Interface(rewardsAbi)
  const jane = new ethers.utils.Interface(janeAbi)

  const state = {
    rpc: null, eip1193: null, account: null, walletChain: null, bound: false, reownUnsubscribe: null,
    tokens: new Map(), core: [], farms: [], pendle: [], lcc: [], curve: null, helper: null, jane: null,
    rewardData: {}, wallet: { balances: new Map(), cooldown: null, lcc: new Map(), claimed: zero, merkleClaim: null },
    block: null, loadingText: '', spinner: null, status: '', showZero: false, action: null, sending: false
  }

  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const short = value => value ? value.slice(0, 6) + '…' + value.slice(-4) : '—'
  const safe = (value, length) => String(value || '').replace(/[\r\n\t]/g, ' ').slice(0, length || 44)
  const errText = error => String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').slice(0, 420)
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.href) { node.href = o.href; node.target = '_blank'; node.rel = 'noopener noreferrer' } if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const num = value => value && value.toNumber ? value.toNumber() : Number(value || 0)
  const format = (amount, decimals, places) => { try { if (amount === null || amount === undefined || decimals === null || decimals === undefined) return '—'; const parts = ethers.utils.formatUnits(amount, decimals).split('.'); const tail = (parts[1] || '').slice(0, places === undefined ? 4 : places).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const units = (amount, decimals) => { const value = Number(format(amount, decimals, 12)); return Number.isFinite(value) ? value : NaN }
  const compact = value => { if (!Number.isFinite(value)) return '—'; const abs = Math.abs(value); if (abs >= 1e9) return (value / 1e9).toFixed(2) + 'b'; if (abs >= 1e6) return (value / 1e6).toFixed(2) + 'm'; if (abs >= 1e3) return (value / 1e3).toFixed(2) + 'k'; if (abs >= 1) return value.toFixed(2); return abs > 0 ? value.toPrecision(3) : '0' }
  const usd = value => Number.isFinite(value) ? '$' + compact(value) : '—'
  const percent = value => Number.isFinite(value) ? value.toFixed(value >= 100 ? 1 : 2) + '%' : '—'
  const token = value => state.tokens.get(lower(value)) || { address: value, symbol: short(value), decimals: null }
  const walletBalance = value => state.wallet.balances.get(lower(value)) || zero
  const correctChain = () => lower(state.walletChain) === chain.id
  const injected = () => window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null
  const explorer = value => chain.explorer + '/address/' + value
  const deadline = () => Math.floor(Date.now() / 1000) + 20 * 60

  function setStatus (text, kind) { state.status = text || ''; const node = byId('jane-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function loading (text) { state.loadingText = text || ''; const box = byId('jane-loading'); const label = byId('jane-loading-text'); const spin = byId('jane-loading-spin'); if (!box) return; box.hidden = !text; if (label) label.textContent = text || ''; if (text && !state.spinner) { let i = 0; state.spinner = window.setInterval(function () { spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][i++ % 5] }, 240) } if (!text && state.spinner) { window.clearInterval(state.spinner); state.spinner = null } }
  function button (label, click, disabled) { const node = e('button', { className: 'jane-action-button', text: '[ ' + label + ' ]', type: 'button', disabled: disabled }); node.addEventListener('click', function () { Promise.resolve(click()).catch(function (error) { setStatus(errText(error), 'error') }) }); return node }
  function link (label, href) { return e('a', { text: '[ ' + label + ' ]', href: href }) }
  function addHeader (table, labels) { const row = table.insertRow(); labels.forEach(function (label) { const cell = e('th', { text: label }); cell.scope = 'col'; row.appendChild(cell) }) }
  function addCell (row, text, className) { const cell = e('td', { text: text, className: className }); row.appendChild(cell); return cell }
  function nameCell (row, title, subtitle, href) { const cell = e('td'); const name = href ? link(title, href) : e('span', { text: title }); name.className = 'jane-name'; append(cell, name, e('span', { className: 'jane-subline', text: subtitle })); row.appendChild(cell); return cell }
  function rewardRange (key) { const data = state.rewardData[key]; if (!data) return '—'; const min = Number(data.combinedMinApr) * 100; const max = Number(data.combinedMaxApr) * 100; return Math.abs(max - min) < 0.005 ? percent(min) : percent(min) + '–' + percent(max) }
  function farmTvl (key) { const data = state.rewardData[key]; return data ? Number(data.tvl) : NaN }
  function dateTime (timestamp) { if (!timestamp || Number(timestamp) <= 0) return '—'; return new Date(Number(timestamp) * 1000).toLocaleString([], { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }) }
  function duration (seconds) { const days = Math.round(Number(seconds) / 86400); return days >= 1 ? days + 'd' : Math.round(Number(seconds) / 3600) + 'h' }

  async function limited (items, limit, fn) { const out = new Array(items.length); let next = 0; async function worker () { while (next < items.length) { const index = next++; out[index] = await fn(items[index], index) } } await Promise.all(Array.from({ length: Math.min(limit, Math.max(1, items.length)) }, worker)); return out }
  async function batch (calls) {
    if (!calls.length) return []
    const contract = new ethers.Contract(address.multicall, multiAbi, state.rpc)
    const groups = []; for (let i = 0; i < calls.length; i += 180) groups.push(calls.slice(i, i + 180))
    const output = await limited(groups, 2, async function (group) {
      const encoded = group.map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }))
      try {
        const values = await contract.aggregate3(encoded)
        return values.map(function (value, index) {
          const call = group[index]; if (!value.success) return call.fallback
          try { const decoded = call.iface.decodeFunctionResult(call.method, value.returnData); return call.decode ? call.decode(decoded) : decoded.length === 1 ? decoded[0] : decoded } catch (_) { return call.fallback }
        })
      } catch (error) {
        console.warn('3Jane Multicall3 group failed; using bounded direct reads.', errText(error))
        return limited(group, 4, async function (call) { try { const raw = await state.rpc.call({ to: call.target, data: call.iface.encodeFunctionData(call.method, call.args || []) }); const decoded = call.iface.decodeFunctionResult(call.method, raw); return call.decode ? call.decode(decoded) : decoded.length === 1 ? decoded[0] : decoded } catch (_) { return call.fallback } })
      }
    })
    return [].concat(...output)
  }
  async function keyed (calls) { const values = await batch(calls); const result = {}; calls.forEach(function (call, index) { result[call.key] = values[index] }); return result }
  async function convex (kind, path, args) { const response = await fetch(convexUrl + kind, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ path: path, args: args || {}, format: 'json' }) }); if (!response.ok) throw new Error('3Jane reward service returned HTTP ' + response.status); const body = await response.json(); if (body.status !== 'success') throw new Error(body.errorMessage || '3Jane reward service returned an error'); return body.value }

  async function readVault (entry, iface) {
    const one = ethers.BigNumber.from(10).pow(entry.shareDecimals)
    Object.assign(entry, await keyed([
      { key: 'name', target: entry.address, iface: iface, method: 'name', fallback: entry.label },
      { key: 'symbol', target: entry.address, iface: iface, method: 'symbol', fallback: entry.label },
      { key: 'asset', target: entry.address, iface: iface, method: 'asset', fallback: null },
      { key: 'totalSupply', target: entry.address, iface: iface, method: 'totalSupply', fallback: zero },
      { key: 'totalAssets', target: entry.address, iface: iface, method: 'totalAssets', fallback: zero },
      { key: 'assetsPerShare', target: entry.address, iface: iface, method: 'convertToAssets', args: [one], fallback: zero },
      { key: 'maxDeposit', target: entry.address, iface: iface, method: 'maxDeposit', args: [zeroAddress], fallback: zero }
    ]))
  }
  async function readPendle (entry) {
    Object.assign(entry, await keyed([
      { key: 'tokens', target: entry.address, iface: pendle, method: 'readTokens', fallback: null, decode: value => value },
      { key: 'expiry', target: entry.address, iface: pendle, method: 'expiry', fallback: zero },
      { key: 'lpSupply', target: entry.address, iface: pendle, method: 'totalSupply', fallback: zero },
      { key: 'rewardTokens', target: entry.address, iface: pendle, method: 'getRewardTokens', fallback: [] }
    ]))
    if (!entry.tokens) throw new Error('Pendle market ' + short(entry.address) + ' did not return SY/PT/YT.')
    entry.sy = entry.tokens[0]; entry.pt = entry.tokens[1]; entry.yt = entry.tokens[2]
    Object.assign(entry, await keyed([
      { key: 'syRate', target: entry.sy, iface: sy, method: 'exchangeRate', fallback: zero },
      { key: 'syBalance', target: entry.sy, iface: erc20, method: 'balanceOf', args: [entry.address], fallback: zero },
      { key: 'ptBalance', target: entry.pt, iface: erc20, method: 'balanceOf', args: [entry.address], fallback: zero }
    ]))
  }
  async function readLcc (vaultAddress, index) {
    const entry = { address: ethers.utils.getAddress(vaultAddress), index: index }
    Object.assign(entry, await keyed([
      { key: 'epoch', target: entry.address, iface: lcc, method: 'currentEpoch', fallback: zero },
      { key: 'phase', target: entry.address, iface: lcc, method: 'currentPhase', fallback: zero },
      { key: 'assets', target: entry.address, iface: lcc, method: 'assetConfig', fallback: null },
      { key: 'epochConfig', target: entry.address, iface: lcc, method: 'epochConfig', fallback: null },
      { key: 'risk', target: entry.address, iface: lcc, method: 'riskConfig', fallback: null },
      { key: 'totals', target: entry.address, iface: lcc, method: 'totals', fallback: null },
      { key: 'shutdown', target: entry.address, iface: lcc, method: 'shutdownState', fallback: null },
      { key: 'paused', target: entry.address, iface: lcc, method: 'pauseState', fallback: null }
    ]))
    if (!entry.assets || !entry.epochConfig || !entry.risk) throw new Error('LCC vault ' + short(entry.address) + ' did not return configuration.')
    entry.phaseEnd = await batch([{ target: entry.address, iface: lcc, method: 'phaseEndsAt', args: [entry.epoch, entry.phase], fallback: zero }]).then(values => values[0])
    return entry
  }
  async function loadTokens (addresses) {
    const list = [...new Set(addresses.filter(Boolean).map(lower))]
    const calls = []
    list.forEach(function (value) { calls.push({ target: value, iface: erc20, method: 'symbol', fallback: short(value) }, { target: value, iface: erc20, method: 'decimals', fallback: null }) })
    const values = await batch(calls)
    list.forEach(function (value, index) { state.tokens.set(value, { address: ethers.utils.getAddress(value), symbol: safe(values[index * 2] || short(value), 22), decimals: values[index * 2 + 1] === null ? null : Number(values[index * 2 + 1]) }) })
  }
  async function loadRewards () {
    const entries = Object.entries(opportunityKeys)
    const values = await Promise.all(entries.map(function (entry) { return convex('action', 'farm:getEmissions', { opportunityKey: entry[1] }).catch(function (error) { console.warn('3Jane emissions unavailable for ' + entry[1], errText(error)); return null }) }))
    entries.forEach(function (entry, index) { state.rewardData[entry[0]] = values[index] })
    const apys = await Promise.all([
      convex('action', 'onchain:getUsd3Apy', {}).catch(() => null),
      convex('action', 'onchain:getSusd3Apy', {}).catch(() => null)
    ])
    if (state.core[0]) state.core[0].baseApy = apys[0] === null ? NaN : Number(apys[0]) * 100
    if (state.core[1]) state.core[1].baseApy = apys[1] === null ? NaN : Number(apys[1]) * 100
  }
  async function discover () {
    loading('Discovering 3Jane deployment roots…')
    state.block = await state.rpc.getBlockNumber()
    const roots = await keyed([
      { key: 'lccVaults', target: address.lccFactory, iface: new ethers.utils.Interface(factoryAbi), method: 'allVaults', fallback: [] },
      { key: 'usdc', target: address.lccHelper, iface: helper, method: 'usdc', fallback: null },
      { key: 'usdt', target: address.lccHelper, iface: helper, method: 'usdt', fallback: null },
      { key: 'waUsdc', target: address.lccHelper, iface: helper, method: 'waEthUSDC', fallback: null },
      { key: 'waUsdt', target: address.lccHelper, iface: helper, method: 'waEthUSDT', fallback: null },
      { key: 'janeSupply', target: address.jane, iface: jane, method: 'totalSupply', fallback: zero },
      { key: 'janeTransferable', target: address.jane, iface: jane, method: 'transferable', fallback: false },
      { key: 'rewardEpoch', target: address.rewards, iface: rewards, method: 'epoch', fallback: zero },
      { key: 'merkleRoot', target: address.rewards, iface: rewards, method: 'merkleRoot', fallback: ethers.constants.HashZero },
      { key: 'totalClaimed', target: address.rewards, iface: rewards, method: 'totalClaimed', fallback: zero },
      { key: 'maxClaimable', target: address.rewards, iface: rewards, method: 'maxClaimable', fallback: zero }
    ])
    state.helper = { address: address.lccHelper, usdc: roots.usdc, usdt: roots.usdt, waUsdc: roots.waUsdc, waUsdt: roots.waUsdt }
    state.jane = { address: address.jane, supply: roots.janeSupply, transferable: roots.janeTransferable, epoch: roots.rewardEpoch, root: roots.merkleRoot, totalClaimed: roots.totalClaimed, maxClaimable: roots.maxClaimable }
    state.core = [
      { id: 'usd3', label: 'USD3', address: address.usd3, shareDecimals: 6, rewardKey: 'usd3', kind: 'vault' },
      { id: 'susd3', label: 'sUSD3', address: address.susd3, shareDecimals: 6, rewardKey: 'susd3', kind: 'susd3' }
    ]
    state.farms = [{ id: 'morpho', label: 'CS-USDC-3JANECO', address: address.morphoVault, shareDecimals: 18, rewardKey: 'morpho', kind: 'vault', provider: 'Morpho' }]
    state.pendle = [
      { id: 'usd3', label: 'USD3 · 17DEC2026', address: address.pendleUsd3, lpKey: 'usd3Lp', ytKey: 'usd3Yt' },
      { id: 'susd3', label: 'sUSD3 · 17DEC2026', address: address.pendleSusd3, lpKey: 'susd3Lp', ytKey: 'susd3Yt' }
    ]
    await Promise.all([readVault(state.core[0], vault), readVault(state.core[1], susd3), readVault(state.farms[0], vault), ...state.pendle.map(readPendle)])
    Object.assign(state.core[1], await keyed([
      { key: 'lockDuration', target: address.susd3, iface: susd3, method: 'lockDuration', fallback: zero },
      { key: 'cooldownDuration', target: address.susd3, iface: susd3, method: 'cooldownDuration', fallback: zero },
      { key: 'withdrawalWindow', target: address.susd3, iface: susd3, method: 'withdrawalWindow', fallback: zero }
    ]))
    state.curve = { id: 'curve', label: 'USD3 / frxUSD', address: address.curve, rewardKey: 'curve', kind: 'curve', provider: 'Curve' }
    Object.assign(state.curve, await keyed([
      { key: 'coin0', target: address.curve, iface: curve, method: 'coins', args: [0], fallback: null },
      { key: 'coin1', target: address.curve, iface: curve, method: 'coins', args: [1], fallback: null },
      { key: 'totalSupply', target: address.curve, iface: curve, method: 'totalSupply', fallback: zero },
      { key: 'virtualPrice', target: address.curve, iface: curve, method: 'get_virtual_price', fallback: zero }
    ]))
    state.lcc = await limited(roots.lccVaults || [], 3, readLcc)
    const tokens = [address.usd3, address.susd3, address.morphoVault, address.curve, address.jane, state.core[0].asset, state.core[1].asset, state.farms[0].asset, state.curve.coin0, state.curve.coin1, roots.usdc, roots.usdt, roots.waUsdc, roots.waUsdt]
    state.pendle.forEach(function (market) { tokens.push(market.address, market.sy, market.pt, market.yt); (market.rewardTokens || []).forEach(value => tokens.push(value)) })
    state.lcc.forEach(function (entry) { tokens.push(entry.assets.marginAsset, entry.assets.fundingAsset, entry.assets.notificationVault) })
    loading('Reading token metadata and reward allocations…')
    await loadTokens(tokens)
    await loadRewards()
    loading()
  }

  function coreTvl (entry) {
    const asset = token(entry.asset); const total = units(entry.totalAssets, asset.decimals)
    if (entry.id === 'susd3') return total * usd3Rate()
    return total
  }
  function usd3Rate () { const entry = state.core[0]; return entry ? units(entry.assetsPerShare, token(entry.asset).decimals) : NaN }
  function sharePrice (entry) { const asset = token(entry.asset); let result = units(entry.assetsPerShare, asset.decimals); if (entry.id === 'susd3') result *= usd3Rate(); return result }
  function walletLine (entry) {
    if (!state.account) return 'connect to inspect'
    const shares = walletBalance(entry.address); const amount = units(shares, entry.shareDecimals); const value = amount * sharePrice(entry)
    let result = compact(amount) + ' ' + safe(entry.symbol || entry.label, 18) + '\n' + usd(value)
    if (entry.id === 'susd3' && state.wallet.cooldown && !state.wallet.cooldown.shares.isZero()) result += '\ncooldown: ' + dateTime(state.wallet.cooldown.cooldownEnd) + ' → ' + dateTime(state.wallet.cooldown.windowEnd)
    return result
  }
  function actionCell (row, actions) { const cell = e('td', { className: 'jane-actions' }); actions.forEach(item => cell.appendChild(item)); row.appendChild(cell) }
  function renderOverview () {
    const lccCommitment = state.lcc.reduce(function (sum, entry) { return sum + (entry.totals ? units(entry.totals.activeCommitment, token(entry.assets.fundingAsset).decimals) : 0) }, 0)
    const lines = [
      'BLOCK    : ' + (state.block ? state.block.toLocaleString() : '—') + ' / Ethereum mainnet',
      'COVERAGE : 2 core vaults · 1 Morpho vault · ' + state.pendle.length + ' Pendle markets / 6 instruments · 1 Curve pool · ' + state.lcc.length + ' factory LCC vaults',
      'CORE TVL : ' + usd(state.core.reduce((sum, entry) => sum + coreTvl(entry), 0)) + ' / ecosystem incentive data ' + Object.values(state.rewardData).filter(Boolean).length + '/' + Object.keys(opportunityKeys).length,
      'LCC      : ' + usd(lccCommitment) + ' active callable commitment / registry ' + short(address.lccFactory),
      'WALLET   : ' + (state.account ? short(state.account) + (correctChain() ? ' / Ethereum' : ' / wrong chain') : 'not connected')
    ]
    byId('jane-overview').textContent = lines.join('\n')
    byId('jane-wallet-status').textContent = state.account ? short(state.account) : (injected() ? 'Injected wallet not connected' : 'No injected wallet found')
    byId('jane-switch').hidden = !state.account || correctChain()
  }
  function renderCore () {
    const container = byId('jane-core'); container.textContent = ''
    const table = e('table', { className: 'jane-table' }); addHeader(table, ['VAULT', 'SHARE PRICE', 'ONCHAIN TVL', 'BASE APY', 'JANE APR', 'WALLET / DIRECT ACTIONS'])
    state.core.forEach(function (entry) {
      const row = table.insertRow(); const asset = token(entry.asset); const notes = entry.id === 'susd3' ? duration(entry.cooldownDuration) + ' cooldown / ' + duration(entry.withdrawalWindow) + ' window' : (entry.maxDeposit && entry.maxDeposit.isZero() ? 'deposit cap reached' : 'ERC-4626')
      nameCell(row, entry.label, short(entry.address) + ' / ' + notes, explorer(entry.address))
      addCell(row, '$' + compact(sharePrice(entry)) + '\n' + format(entry.assetsPerShare, asset.decimals) + ' ' + asset.symbol)
      addCell(row, usd(coreTvl(entry)))
      addCell(row, percent(entry.baseApy))
      addCell(row, rewardRange(entry.rewardKey))
      const actions = [button('deposit', () => openAction(entry, 'deposit')), entry.id === 'susd3' ? button('start cooldown', () => openAction(entry, 'cooldown')) : button('withdraw', () => openAction(entry, 'withdraw'))]
      if (entry.id === 'susd3') actions.push(button('claim cooldown', () => openAction(entry, 'cooldown-claim')))
      const cell = e('td', { className: 'jane-actions' }); cell.appendChild(e('span', { className: 'jane-name', text: walletLine(entry) })); actions.forEach(item => cell.appendChild(item)); row.appendChild(cell)
    })
    container.appendChild(table)
  }
  function pendleUrl (market, view, pool) { return pool ? 'https://app.pendle.finance/trade/pools/' + market.address + '/zap/in?chain=ethereum' : 'https://app.pendle.finance/trade/markets/' + market.address + '/swap?view=' + view + '&chain=ethereum' }
  function renderFarms () {
    const container = byId('jane-farms'); container.textContent = ''
    const table = e('table', { className: 'jane-table' }); addHeader(table, ['OPPORTUNITY', 'POSITION ASSET', 'REWARD-ELIGIBLE TVL', 'RATE / MATURITY', 'JANE APR', 'WALLET / ACTIONS'])
    const morpho = state.farms[0]
    let row = table.insertRow(); nameCell(row, morpho.label, 'Morpho vault / ' + short(morpho.address), explorer(morpho.address)); addCell(row, token(morpho.asset).symbol); addCell(row, usd(farmTvl('morpho'))); addCell(row, '$' + compact(sharePrice(morpho)) + ' / share'); addCell(row, rewardRange('morpho'))
    let actions = [button('deposit', () => openAction(morpho, 'deposit')), button('withdraw', () => openAction(morpho, 'withdraw')), link('Morpho', 'https://app.morpho.org/ethereum/vault/' + morpho.address)]
    let cell = e('td', { className: 'jane-actions' }); cell.appendChild(e('span', { className: 'jane-name', text: walletLine(morpho) })); actions.forEach(item => cell.appendChild(item)); row.appendChild(cell)
    state.pendle.forEach(function (market) {
      const instruments = [
        { type: 'PT', address: market.pt, key: null, url: pendleUrl(market, 'pt', false) },
        { type: 'YT', address: market.yt, key: market.ytKey, url: pendleUrl(market, 'yt', false) },
        { type: 'LP', address: market.address, key: market.lpKey, url: pendleUrl(market, '', true) }
      ]
      instruments.forEach(function (instrument) {
        if (!state.showZero && !instrument.key) return
        const t = instrument.type === 'LP' ? { symbol: 'LP-' + market.label, decimals: token(market.address).decimals } : token(instrument.address)
        row = table.insertRow(); nameCell(row, instrument.type + ' · ' + market.label, short(instrument.address), explorer(instrument.address)); addCell(row, safe(t.symbol, 24)); addCell(row, instrument.key ? usd(farmTvl(instrument.key)) : 'market liquidity'); addCell(row, 'expires ' + new Date(num(market.expiry) * 1000).toISOString().slice(0, 10)); addCell(row, instrument.key ? rewardRange(instrument.key) : '0%')
        actions = [link(instrument.type === 'LP' ? 'liquidity' : 'trade', instrument.url)]
        if (instrument.type === 'LP') actions.push(button('claim PENDLE', () => openAction(market, 'pendle-claim')))
        cell = e('td', { className: 'jane-actions' }); cell.appendChild(e('span', { className: 'jane-name', text: state.account ? compact(units(walletBalance(instrument.address), t.decimals)) + ' ' + safe(t.symbol, 20) : 'connect to inspect' })); actions.forEach(item => cell.appendChild(item)); row.appendChild(cell)
      })
    })
    const c = state.curve; row = table.insertRow(); nameCell(row, c.label, 'Curve StableSwap-NG / ' + short(c.address), explorer(c.address)); addCell(row, token(c.address).symbol); addCell(row, usd(farmTvl('curve'))); addCell(row, 'virtual price ' + format(c.virtualPrice, 18, 6)); addCell(row, rewardRange('curve'))
    actions = [button('deposit ' + token(c.coin0).symbol, () => openAction(c, 'curve-deposit-0')), button('deposit ' + token(c.coin1).symbol, () => openAction(c, 'curve-deposit-1')), button('withdraw ' + token(c.coin0).symbol, () => openAction(c, 'curve-withdraw-0')), button('withdraw ' + token(c.coin1).symbol, () => openAction(c, 'curve-withdraw-1')), link('Curve', 'https://www.curve.finance/dex/ethereum/pools/' + lower(c.address) + '/deposit')]
    cell = e('td', { className: 'jane-actions' }); cell.appendChild(e('span', { className: 'jane-name', text: state.account ? compact(units(walletBalance(c.address), 18)) + ' LP' : 'connect to inspect' })); actions.forEach(item => cell.appendChild(item)); row.appendChild(cell)
    container.appendChild(table)
  }
  function lccWalletLine (entry) {
    if (!state.account) return 'connect to inspect'
    const position = state.wallet.lcc.get(lower(entry.address)); if (!position || !position.account) return 'unavailable'
    const margin = token(entry.assets.marginAsset); const funding = token(entry.assets.fundingAsset)
    return compact(units(position.account.activeMargin, margin.decimals)) + ' ' + margin.symbol + '\n' + compact(units(position.account.activeCommitment, funding.decimals)) + ' ' + funding.symbol + ' callable'
  }
  function renderLcc () {
    const container = byId('jane-lcc'); container.textContent = ''
    if (!state.lcc.length) { container.appendChild(e('pre', { text: 'No registered LCC vaults discovered from the factory.' })); return }
    const table = e('table', { className: 'jane-table' }); addHeader(table, ['FACILITY', 'PHASE', 'ACTIVE MARGIN', 'ACTIVE COMMITMENT', 'RISK LIMITS', 'WALLET / ACTIONS'])
    state.lcc.forEach(function (entry) {
      const margin = token(entry.assets.marginAsset); const funding = token(entry.assets.fundingAsset); const row = table.insertRow(); const paused = entry.paused && entry.paused[0]; const terminal = num(entry.epochConfig.maxEpochs) > 0 && num(entry.epoch) >= num(entry.epochConfig.maxEpochs); const shut = entry.shutdown && entry.shutdown.active
      nameCell(row, margin.symbol + ' margin', short(entry.address) + (shut ? ' / SHUTDOWN' : terminal ? ' / TERMINAL' : paused ? ' / PAUSED' : ''), explorer(entry.address))
      addCell(row, phaseNames[num(entry.phase)] + ' / epoch ' + num(entry.epoch) + '\nends ' + dateTime(entry.phaseEnd))
      addCell(row, entry.totals ? compact(units(entry.totals.activeMargin, margin.decimals)) + ' ' + margin.symbol : 'unavailable')
      addCell(row, entry.totals ? compact(units(entry.totals.activeCommitment, funding.decimals)) + ' ' + funding.symbol : 'unavailable')
      addCell(row, (10000 / num(entry.epochConfig.marginRatioBps)).toFixed(2) + 'x leverage\n' + percent(num(entry.risk.exitCapBps) / 100) + ' exit cap')
      const depositToken = lower(entry.assets.marginAsset) === lower(state.helper.waUsdc) ? token(state.helper.usdc) : token(state.helper.usdt)
      const actions = [button('deposit ' + depositToken.symbol, () => openAction(entry, 'lcc-deposit')), button('fund call', () => openAction(entry, 'lcc-fund')), button('request exit', () => openAction(entry, 'lcc-exit')), button('claim margin', () => openAction(entry, shut || terminal ? 'lcc-claim-remaining' : 'lcc-claim'))]
      const cell = e('td', { className: 'jane-actions' }); cell.appendChild(e('span', { className: 'jane-name', text: lccWalletLine(entry) })); actions.forEach(item => cell.appendChild(item)); row.appendChild(cell)
    })
    container.appendChild(table)
  }
  function stat (label, value) { return append(e('div', { className: 'jane-reward-stat' }), e('span', { className: 'jane-reward-label', text: label }), e('span', { className: 'jane-reward-value', text: value })) }
  function renderRewards () {
    const container = byId('jane-rewards'); container.textContent = ''
    const box = e('div', { className: 'jane-reward-box' }); const claim = state.wallet.merkleClaim; const claimed = state.account ? state.wallet.claimed : null; const allocation = claim && claim.amount ? ethers.BigNumber.from(claim.amount) : null; const unclaimed = allocation && claimed && allocation.gt(claimed) ? allocation.sub(claimed) : zero
    append(box,
      stat('CURRENT EPOCH', String(num(state.jane.epoch))), stat('TOTAL JANE', format(state.jane.supply, 18)),
      stat('PROGRAM CLAIMED', format(state.jane.totalClaimed, 18)), stat('YOUR ALLOCATION', state.account ? (allocation ? format(allocation, 18) : '0') : 'connect'),
      stat('YOUR UNCLAIMED', state.account ? format(unclaimed, 18) : 'connect')
    )
    container.appendChild(box)
    const actions = e('p', { className: 'jane-controls' }); append(actions, document.createTextNode('JANE is non-transferable. '), button('claim JANE', () => openAction(state.jane, 'jane-claim'), !state.account || unclaimed.isZero()), document.createTextNode(' '), link('reward contract', explorer(address.rewards))); container.appendChild(actions)
  }
  function render () { renderOverview(); renderCore(); renderFarms(); renderLcc(); renderRewards() }

  function actionAmountToken (action) {
    const entry = action.entry; const mode = action.mode
    if (mode === 'deposit' || mode === 'withdraw') return mode === 'deposit' ? token(entry.asset) : { address: entry.asset, symbol: token(entry.asset).symbol, decimals: token(entry.asset).decimals }
    if (mode === 'cooldown') return token(entry.address)
    if (mode.indexOf('curve-deposit-') === 0) return token(Number(mode.slice(-1)) === 0 ? entry.coin0 : entry.coin1)
    if (mode.indexOf('curve-withdraw-') === 0) return token(entry.address)
    if (mode === 'lcc-deposit') return token(lower(entry.assets.marginAsset) === lower(state.helper.waUsdc) ? state.helper.usdc : state.helper.usdt)
    if (mode === 'lcc-fund') return token(entry.assets.fundingAsset)
    return null
  }
  function actionTitle (action) {
    const names = { deposit: 'DEPOSIT', withdraw: 'WITHDRAW', cooldown: 'START COOLDOWN', 'cooldown-claim': 'CLAIM COOLDOWN', 'pendle-claim': 'CLAIM PENDLE REWARDS', 'lcc-deposit': 'LCC MARGIN DEPOSIT', 'lcc-fund': 'FUND CAPITAL CALL', 'lcc-exit': 'REQUEST FULL LCC EXIT', 'lcc-claim': 'CLAIM EXITED MARGIN', 'lcc-claim-remaining': 'CLAIM REMAINING MARGIN', 'jane-claim': 'CLAIM JANE' }
    return (names[action.mode] || (action.mode.indexOf('curve-deposit') === 0 ? 'CURVE DEPOSIT' : action.mode.indexOf('curve-withdraw') === 0 ? 'CURVE WITHDRAW' : action.mode.toUpperCase())) + ' / ' + safe(action.entry.label || action.entry.symbol || short(action.entry.address), 38)
  }
  function actionNeedsAmount (mode) { return ['deposit', 'withdraw', 'cooldown', 'lcc-deposit'].indexOf(mode) >= 0 || mode.indexOf('curve-') === 0 }
  function actionNeedsApproval (mode) { return mode === 'deposit' || mode === 'lcc-deposit' || mode === 'lcc-fund' || mode.indexOf('curve-deposit-') === 0 }
  function actionNote (action) {
    if (!state.account) return 'Connect an EIP-1193 wallet first. Page load itself never requests wallet permission.'
    if (!correctChain()) return 'Switch this wallet to Ethereum before preparing a transaction.'
    if (action.mode === 'lcc-deposit') return 'This posts performance-bond margin and creates leveraged callable commitment. Missing a later capital call can slash the margin. Quote bounds use the selected slippage; pending activation is opt-in.'
    if (action.mode === 'lcc-fund') { const p = state.wallet.lcc.get(lower(action.entry.address)); return 'Current all-or-nothing obligation: ' + (p ? format(p.obligation, token(action.entry.assets.fundingAsset).decimals) : '—') + ' ' + token(action.entry.assets.fundingAsset).symbol + '. Rolling keeps remaining exposure callable.' }
    if (action.mode === 'lcc-exit') return 'Exit requests are full-account and remain callable until their assigned maturity epoch. Max deferral limits how far the contract may place this exit.'
    if (action.mode === 'cooldown') return 'Cooldown applies to sUSD3 shares. The shares remain exposed until the cooldown ends and withdrawal is claimed inside the window.'
    if (action.mode.indexOf('curve-') === 0) return 'Minimum output is quoted onchain and reduced only by the editable slippage below.'
    if (action.mode === 'jane-claim') return 'The cumulative allocation and proof come from 3Jane; the exact claim is verified by the onchain Merkle root before minting.'
    return 'The exact transaction is simulated with eth_call from this wallet before it can be submitted.'
  }
  function inputRow (label, id, value, suffix, onInput) { const row = e('label', { className: 'jane-input-row' }); row.appendChild(document.createTextNode(label + ' :')); const input = e('input', { id: id }); input.type = 'text'; input.inputMode = 'decimal'; input.autocomplete = 'off'; input.value = value || ''; input.addEventListener('input', function () { onInput(input.value); const start = input.selectionStart; const end = input.selectionEnd; renderAction(); const next = byId(id); if (next) { next.focus(); try { next.setSelectionRange(start, end) } catch (_) {} } }); append(row, input, e('span', { text: suffix || '' })); return row }
  function renderAction () {
    const action = state.action; const container = byId('jane-action-content'); if (!container || !action) return
    container.textContent = ''; container.appendChild(e('h2', { id: 'jane-action-title', text: actionTitle(action) })); container.appendChild(e('p', { className: 'jane-action-note', text: actionNote(action) }))
    if (!state.account || !correctChain()) return
    const amountToken = actionAmountToken(action)
    if (actionNeedsAmount(action.mode)) {
      const balance = amountToken ? walletBalance(amountToken.address) : zero; const maximum = action.maxAmount || balance
      const showMaximum = action.maxAmount && (action.mode === 'withdraw' || maximum.lt(balance))
      container.appendChild(e('p', { className: 'jane-action-note', text: 'BALANCE : ' + format(balance, amountToken.decimals) + ' ' + amountToken.symbol + (showMaximum ? ' / ACTION MAX : ' + format(maximum, amountToken.decimals) : '') }))
      container.appendChild(inputRow('AMOUNT', 'jane-action-amount', action.amount, amountToken.symbol, value => { action.amount = value }))
      container.appendChild(button('max', function () { action.amount = format(maximum, amountToken.decimals, amountToken.decimals); renderAction() }, maximum.isZero()))
    }
    if (action.mode.indexOf('curve-') === 0 || action.mode === 'lcc-deposit') container.appendChild(inputRow('SLIPPAGE', 'jane-action-slippage', action.slippage, '%', value => { action.slippage = value }))
    if (action.mode === 'lcc-exit') container.appendChild(inputRow('MAX DEFERRAL', 'jane-action-deferral', action.maxDeferral, 'epochs', value => { action.maxDeferral = value }))
    if (action.mode === 'lcc-deposit') { const label = e('label', { className: 'jane-check-row' }); const checkbox = e('input'); checkbox.type = 'checkbox'; checkbox.checked = action.allowPending; checkbox.addEventListener('change', function () { action.allowPending = checkbox.checked }); append(label, checkbox, document.createTextNode('Allow activation in the next epoch if immediate activation is unavailable')); container.appendChild(label) }
    if (action.mode === 'lcc-fund') { const label = e('label', { className: 'jane-check-row' }); const checkbox = e('input'); checkbox.type = 'checkbox'; checkbox.checked = action.roll; checkbox.addEventListener('change', function () { action.roll = checkbox.checked }); append(label, checkbox, document.createTextNode('Roll remaining margin and commitment after funding')); container.appendChild(label) }
    const controls = e('div', { className: 'jane-dialog-actions' })
    if (actionNeedsApproval(action.mode)) controls.appendChild(button('approve exact amount', approveAction, state.sending || actionNeedsAmount(action.mode) && !action.amount))
    controls.appendChild(button('preflight + submit', submitAction, state.sending || actionNeedsAmount(action.mode) && !action.amount))
    container.appendChild(controls)
  }
  async function openAction (entry, mode) {
    state.action = { entry: entry, mode: mode, amount: '', slippage: '0.5', maxDeferral: '2', roll: false, allowPending: false }
    renderAction(); const dialog = byId('jane-action-dialog'); if (dialog && !dialog.open) dialog.showModal()
    if (state.account && correctChain() && (mode === 'deposit' || mode === 'withdraw')) {
      const contract = new ethers.Contract(entry.address, vaultAbi, state.rpc); const amountToken = actionAmountToken(state.action); const balance = walletBalance(amountToken.address)
      const limit = await contract[mode === 'deposit' ? 'maxDeposit' : 'maxWithdraw'](state.account).catch(() => zero)
      state.action.maxAmount = mode === 'deposit' && balance.lt(limit) ? balance : limit
      renderAction()
    }
  }
  function parsedAmount (tokenInfo) { const raw = String(state.action.amount || '').trim(); if (!/^\d+(\.\d+)?$/.test(raw)) throw new Error('Enter a positive decimal amount.'); const value = ethers.utils.parseUnits(raw, tokenInfo.decimals); if (value.lte(0)) throw new Error('Enter an amount greater than zero.'); return value }
  function slippageBps () { const value = Number(state.action.slippage); if (!Number.isFinite(value) || value < 0 || value > 10) throw new Error('Slippage must be between 0% and 10%.'); return Math.round(value * 100) }
  async function buildAction () {
    const action = state.action; const entry = action.entry; const mode = action.mode; const account = state.account
    if (!action || !account) throw new Error('Connect a wallet first.')
    if (mode === 'deposit' || mode === 'withdraw') { const amount = parsedAmount(token(entry.asset)); return { to: entry.address, data: vault.encodeFunctionData(mode, mode === 'deposit' ? [amount, account] : [amount, account, account]), token: mode === 'deposit' ? token(entry.asset) : null, amount: amount, spender: entry.address } }
    if (mode === 'cooldown') { const amount = parsedAmount(token(entry.address)); return { to: entry.address, data: susd3.encodeFunctionData('startCooldown', [amount]) } }
    if (mode === 'cooldown-claim') return { to: entry.address, data: susd3.encodeFunctionData('withdraw()', []) }
    if (mode === 'pendle-claim') return { to: entry.address, data: pendle.encodeFunctionData('redeemRewards', [account]) }
    if (mode.indexOf('curve-deposit-') === 0) {
      const index = Number(mode.slice(-1)); const coin = token(index === 0 ? entry.coin0 : entry.coin1); const amount = parsedAmount(coin); const amounts = [zero, zero]; amounts[index] = amount
      const contract = new ethers.Contract(entry.address, curveAbi, state.rpc); const quote = await contract.calc_token_amount(amounts, true); const minimum = quote.mul(10000 - slippageBps()).div(10000)
      return { to: entry.address, data: curve.encodeFunctionData('add_liquidity(uint256[],uint256,address)', [amounts, minimum, account]), token: coin, amount: amount, spender: entry.address, quote: quote, minimum: minimum }
    }
    if (mode.indexOf('curve-withdraw-') === 0) {
      const index = Number(mode.slice(-1)); const lp = token(entry.address); const amount = parsedAmount(lp); const contract = new ethers.Contract(entry.address, curveAbi, state.rpc); const quote = await contract.calc_withdraw_one_coin(amount, index); const minimum = quote.mul(10000 - slippageBps()).div(10000)
      return { to: entry.address, data: curve.encodeFunctionData('remove_liquidity_one_coin(uint256,int128,uint256,address)', [amount, index, minimum, account]) }
    }
    if (mode === 'lcc-deposit') {
      const input = actionAmountToken(action); const amount = parsedAmount(input); const isUsdc = lower(entry.assets.marginAsset) === lower(state.helper.waUsdc); const stataAddress = isUsdc ? state.helper.waUsdc : state.helper.waUsdt
      const stataContract = new ethers.Contract(stataAddress, stataAbi, state.rpc); const marginShares = await stataContract.previewDeposit(amount); const price = await new ethers.Contract(entry.assets.marginOracle, oracleAbi, state.rpc).price(); const commitment = marginShares.mul(price).div(oracleScale).mul(10000).div(entry.epochConfig.marginRatioBps)
      const slip = slippageBps(); const minCommitment = commitment.mul(10000 - slip).div(10000); const params = [entry.address, amount, marginShares.mul(10000 - slip).div(10000), minCommitment.isZero() ? ethers.constants.One : minCommitment, commitment.mul(10000 + slip).div(10000).add(1), action.allowPending, deadline()]
      return { to: state.helper.address, data: helper.encodeFunctionData(isUsdc ? 'depositUSDC' : 'depositUSDT', [params]), token: input, amount: amount, spender: state.helper.address }
    }
    if (mode === 'lcc-fund') { const position = state.wallet.lcc.get(lower(entry.address)); if (!position || !position.obligation || position.obligation.isZero()) throw new Error('This wallet has no current capital-call obligation.'); return { to: entry.address, data: lcc.encodeFunctionData('fundCall(bool)', [action.roll]), token: token(entry.assets.fundingAsset), amount: position.obligation, spender: entry.address } }
    if (mode === 'lcc-exit') { const deferral = String(action.maxDeferral || '').trim(); if (!/^\d+$/.test(deferral)) throw new Error('Max deferral must be a whole number of epochs.'); return { to: entry.address, data: lcc.encodeFunctionData('requestExit', [deferral, deadline()]) } }
    if (mode === 'lcc-claim') return { to: entry.address, data: lcc.encodeFunctionData('claimExitedMargin', [account]) }
    if (mode === 'lcc-claim-remaining') return { to: entry.address, data: lcc.encodeFunctionData('claimRemainingMargin', [account]) }
    if (mode === 'jane-claim') { const claim = state.wallet.merkleClaim; if (!claim || !claim.amount || !claim.proof) throw new Error('No current JANE Merkle allocation is available for this wallet.'); return { to: address.rewards, data: rewards.encodeFunctionData('claim', [account, claim.amount, claim.proof]) } }
    throw new Error('Unsupported action.')
  }
  async function buildApproval () { const tx = await buildAction(); if (!tx.token || !tx.spender || !tx.amount) throw new Error('This action does not require an ERC-20 approval.'); return { to: tx.token.address, data: erc20.encodeFunctionData('approve', [tx.spender, tx.amount]) } }
  async function preflight (tx) { try { await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data }, 'latest'] }) } catch (error) { throw new Error('Exact eth_call preflight failed: ' + errText(error)) } }
  async function send (tx, label) { await preflight(tx); setStatus('Preflight passed. Confirm ' + label + ' in the wallet...'); const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data }] }); setStatus('Submitted ' + label + ': ' + hash + '. Waiting for receipt...'); const receipt = await state.rpc.waitForTransaction(hash, 1, 180000); if (!receipt || receipt.status !== 1) throw new Error(label + ' did not confirm successfully.'); return hash }
  async function approveAction () {
    state.sending = true; renderAction()
    try {
      const actionTx = await buildAction(); if (!actionTx.token || !actionTx.spender || !actionTx.amount) throw new Error('This action does not require an ERC-20 approval.')
      const contract = new ethers.Contract(actionTx.token.address, erc20Abi, state.rpc); const current = await contract.allowance(state.account, actionTx.spender)
      if (current.gte(actionTx.amount)) { setStatus('The existing allowance already covers this exact action.', 'success'); return }
      if (!current.isZero()) await send({ to: actionTx.token.address, data: erc20.encodeFunctionData('approve', [actionTx.spender, zero]) }, 'ERC-20 allowance reset')
      await send(await buildApproval(), 'exact ERC-20 approval'); setStatus('Exact approval confirmed. Submit the action when ready.', 'success')
    } finally { state.sending = false; renderAction() }
  }
  async function submitAction () {
    state.sending = true; renderAction()
    try {
      const tx = await buildAction()
      if (tx.token && tx.spender && tx.amount) { const allowance = await new ethers.Contract(tx.token.address, erc20Abi, state.rpc).allowance(state.account, tx.spender); if (allowance.lt(tx.amount)) throw new Error('Approve the exact amount first. The page does not substitute an unlimited allowance.'); if (walletBalance(tx.token.address).lt(tx.amount)) throw new Error('The requested amount exceeds this wallet balance.') }
      await send(tx, actionTitle(state.action)); await refreshAll(); setStatus('Receipt confirmed and 3Jane state refreshed.', 'success')
    } finally { state.sending = false; renderAction() }
  }

  async function hydrateWallet () {
    state.wallet = { balances: new Map(), cooldown: null, lcc: new Map(), claimed: zero, merkleClaim: null }
    if (!state.account || !correctChain()) return
    loading('Reading wallet balances, cooldown, LCC exposure, and reward proof…')
    const tokenAddresses = [...state.tokens.values()].map(value => value.address)
    const calls = tokenAddresses.map(value => ({ target: value, iface: erc20, method: 'balanceOf', args: [state.account], fallback: zero }))
    const values = await batch(calls); tokenAddresses.forEach(function (value, index) { state.wallet.balances.set(lower(value), values[index]) })
    const walletReads = await keyed([
      { key: 'cooldown', target: address.susd3, iface: susd3, method: 'getCooldownStatus', args: [state.account], fallback: null, decode: value => value },
      { key: 'claimed', target: address.rewards, iface: rewards, method: 'claimed', args: [state.account], fallback: zero }
    ])
    state.wallet.cooldown = walletReads.cooldown; state.wallet.claimed = walletReads.claimed
    await limited(state.lcc, 3, async function (entry) {
      const values = await keyed([
        { key: 'account', target: entry.address, iface: lcc, method: 'getAccount', args: [state.account], fallback: null },
        { key: 'obligation', target: entry.address, iface: lcc, method: 'obligationOf', args: [entry.epoch, state.account], fallback: zero },
        { key: 'funded', target: entry.address, iface: lcc, method: 'fundedEpoch', args: [entry.epoch, state.account], fallback: false }
      ]); state.wallet.lcc.set(lower(entry.address), values)
    })
    state.wallet.merkleClaim = await convex('action', 'farm:getMerkleClaim', { address: state.account, merkleRoot: state.jane.root }).catch(function (error) { console.warn('JANE proof unavailable', errText(error)); return null })
    loading()
  }
  async function adopt (provider, accounts, walletChain, hydrate) { if (!provider || !accounts || !accounts[0]) return false; state.eip1193 = provider; state.account = ethers.utils.getAddress(accounts[0]); state.walletChain = lower(walletChain); if (!state.bound && provider.on) { state.bound = true; provider.on('accountsChanged', function () { restore(true).catch(fatal) }); provider.on('chainChanged', function () { restore(true).catch(fatal) }) } render(); if (hydrate !== false) { await hydrateWallet(); render() } return true }
  async function restore (hydrate) { const provider = injected(); if (!provider) { state.account = null; state.walletChain = null; render(); return false } try { const result = await Promise.all([provider.request({ method: 'eth_accounts' }), provider.request({ method: 'eth_chainId' })]); if (!result[0] || !result[0][0]) { state.account = null; state.walletChain = result[1]; render(); return false } return adopt(provider, result[0], result[1], hydrate) } catch (_) { state.account = null; render(); return false } }
  async function connectInjected () { const provider = injected(); if (!provider) return connectOther(); const accounts = await provider.request({ method: 'eth_requestAccounts' }); await adopt(provider, accounts, await provider.request({ method: 'eth_chainId' }), true) }
  async function connectOther () { const reown = await import('./config.js'); if (!reown.REOWN_PROJECT_ID) throw new Error('Optional wallet support is unavailable.'); const kit = reown.createAppKitInstance(); if (!kit) throw new Error('Optional wallet support is unavailable.'); const onAccount = async function (account) { if (!account || !account.isConnected) return; const provider = await kit.getWalletProvider(); await adopt(provider, await provider.request({ method: 'eth_accounts' }), await provider.request({ method: 'eth_chainId' }), true); if (state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null } }; if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true }); if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error'))); await kit.open() }
  async function switchChain () { if (!state.eip1193) throw new Error('Connect a wallet first.'); await state.eip1193.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] }); await restore(true) }
  async function refreshAll () { await discover(); await hydrateWallet(); render() }
  function bind () {
    byId('jane-connect').addEventListener('click', () => connectInjected().catch(error => setStatus(errText(error), 'error')))
    byId('jane-other-wallet').addEventListener('click', () => connectOther().catch(error => setStatus(errText(error), 'error')))
    byId('jane-switch').addEventListener('click', () => switchChain().catch(error => setStatus(errText(error), 'error')))
    byId('jane-refresh').addEventListener('click', () => refreshAll().then(() => setStatus('3Jane state refreshed.', 'success')).catch(error => setStatus(errText(error), 'error')))
    byId('jane-zero-toggle').addEventListener('click', function () { state.showZero = !state.showZero; byId('jane-zero-toggle').textContent = state.showZero ? '[ hide 0-JANE opportunities ]' : '[ show 0-JANE opportunities ]'; renderFarms() })
  }
  async function start () { state.rpc = new ethers.providers.StaticJsonRpcProvider(chain.rpc, { chainId: chain.number, name: 'ethereum' }); bind(); await discover(); render(); await restore(false); if (state.account) hydrateWallet().then(render).catch(error => console.warn('3Jane wallet hydration failed', errText(error))) }
  function fatal (error) { console.error('3Jane page load failed', error); loading(); setStatus(errText(error), 'error'); const target = byId('jane-core'); if (target) { target.textContent = ''; target.appendChild(e('pre', { text: errText(error) })) } }
  return { start, fatal }
})()
