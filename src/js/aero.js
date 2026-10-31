/* Aero pools across FactoryRegistry deployments: V2 and CL discovery, onchain prices, EIP-1193. */
const { ethers } = require('ethers')
import { resolveAeroRewardToken, clRewards } from './aero_rewards.mjs'
import { getSickleChain } from './sickle/chains.js'

document.addEventListener('DOMContentLoaded', function () { AeroPage.start().catch(AeroPage.fatal) })

const AeroPage = (function () {
  const multicallAddress = '0xcA11bde05977b3631167028862bE2a173976CA11'
  const secondsPerYear = 365 * 24 * 60 * 60
  const feeHours = 12
  const logRange = 9000
  const logSpacing = 450
  const maxLogAddresses = 15
  const rpcConcurrency = 6
  const minStakeWindow = 3600
  const q96 = 2 ** 96
  const minPrice = 1e-12
  const maxPrice = 1e12
  const maxUint128 = ethers.BigNumber.from(2).pow(128).sub(1)
  const zeroAddress = '0x0000000000000000000000000000000000000000'

  const chains = {
    ethereum: {
      id: '0x1', number: 1, name: 'Ethereum', explorer: 'https://etherscan.io',
      registry: '0xdd1705e23762F4D6e44D8C31BD8Ea80c54612239',
      addRpc: 'https://cloudflare-eth.com',
      rpcs: ['https://ethereum.publicnode.com', 'https://cloudflare-eth.com'],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      anchors: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', '0xdAC17F958D2ee523a2206206994597C13D831ec7', '0x6B175474E89094C44Da98b954EedeAC495271d0F']
    },
    optimism: {
      id: '0xa', number: 10, name: 'Optimism', explorer: 'https://optimistic.etherscan.io',
      registry: '0xb6F9705A631CC1C0E8570FFde48882C95E2Df408',
      addRpc: 'https://mainnet.optimism.io',
      rpcs: ['https://mainnet.optimism.io', 'https://optimism.drpc.org'],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      anchors: ['0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', '0x7F5c764cBc14f9669B88837ca1490cCa17c31607']
    },
    ink: {
      id: '0xdef1', number: 57073, name: 'Ink', explorer: 'https://explorer.inkonchain.com',
      registry: '0xdd1705e23762F4D6e44D8C31BD8Ea80c54612239',
      addRpc: 'https://rpc-qnd.inkonchain.com',
      rpcs: ['https://rpc-qnd.inkonchain.com'],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      anchors: []
    },
    robinhood: {
      id: '0x1237', number: 4663, name: 'Robinhood Chain', explorer: 'https://robinhoodchain.blockscout.com',
      registry: '0xdd1705e23762F4D6e44D8C31BD8Ea80c54612239',
      addRpc: 'https://rpc.mainnet.chain.robinhood.com',
      rpcs: ['https://rpc.mainnet.chain.robinhood.com'],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      anchors: []
    },
    base: {
      id: '0x2105', number: 8453, name: 'Base', explorer: 'https://basescan.org',
      registry: '0x7b2A2c12dC5Ea2a31455952a05031C3E4BB28F3E',
      addRpc: 'https://mainnet.base.org',
      rpcs: ['https://mainnet.base.org'],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      anchors: ['0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913']
    },
    arbitrum: {
      id: '0xa4b1', number: 42161, name: 'Arbitrum', explorer: 'https://arbiscan.io',
      registry: '0x9E635b2c689fC52201DF7eF1C9FA607c2F58f666',
      addRpc: 'https://arb1.arbitrum.io/rpc',
      rpcs: ['https://arb1.arbitrum.io/rpc'],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      anchors: ['0xaf88d065e77c8cC2239327C5EDb3A432268e5831', '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8']
    },
    arc: {
      id: '0x13b2', number: 5042, name: 'Arc', explorer: 'https://explorer.arc.io',
      registry: '0xCe44907DC45D3BFa3f5f6035B0e6E8B22D780A42',
      addRpc: 'https://rpc.mainnet.arc.io',
      rpcs: ['https://rpc.mainnet.arc.io', 'https://rpc.blockdaemon.mainnet.arc.io', 'https://rpc.arc-scan.org', 'https://arc-mainnet.drpc.org'],
      nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 18 },
      anchors: ['0x3600000000000000000000000000000000000000']
    }
  }

  const registry = new ethers.utils.Interface([
    'function targetFactories() view returns (address[])',
    'function gaugeFactories() view returns (address[])',
    'function factoryToGauges(address) view returns (address[])',
    'function factoryToGaugesLength(address) view returns (uint256)',
    'function factoryToGaugesAt(address,uint256) view returns (address)',
    'function targetToGauge(address) view returns (address)',
    'function gaugeToTarget(address) view returns (address)',
    'function gaugeToFactory(address) view returns (address)',
    'function leafVoter() view returns (address)'
  ])
  const factoryAbi = new ethers.utils.Interface([
    'function allPoolsLength() view returns (uint256)',
    'function allPools(uint256) view returns (address)',
    'function positionManager() view returns (address)',
    'function defaultFee() view returns (uint256)',
    'function getBaseFee(address,address,uint256,uint256,uint256,uint256) view returns (uint256)'
  ])
  const erc20 = new ethers.utils.Interface([
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function balanceOf(address) view returns (uint256)',
    'function allowance(address,address) view returns (uint256)',
    'function approve(address,uint256) returns (bool)'
  ])
  const erc20Bytes = new ethers.utils.Interface(['function symbol() view returns (bytes32)'])
  const v2Pool = new ethers.utils.Interface([
    'function token0() view returns (address)',
    'function token1() view returns (address)',
    'function factory() view returns (address)',
    'function POOL_TYPE() view returns (bytes32)',
    'function getReserves() view returns (uint256,uint256,uint256)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint256)',
    'function getAmountOut(uint256,address) view returns (uint256)',
    'function pendingFees(address) view returns (uint256,uint256)',
    'function mint(address) returns (uint256)',
    'function burn(address) returns (uint256,uint256)',
    'function claimFees(address) returns (uint256,uint256)',
    'event Swap(address indexed sender, address indexed to, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out)'
  ])
  const clPool = new ethers.utils.Interface([
    'function token0() view returns (address)',
    'function token1() view returns (address)',
    'function factory() view returns (address)',
    'function POOL_TYPE() view returns (bytes32)',
    'function tickSpacing() view returns (int24)',
    'function fee() view returns (uint24)',
    'function liquidity() view returns (uint128)',
    'function stakedLiquidity() view returns (uint128)',
    'function slot0() view returns (uint160 sqrtPriceX96,int24 tick,uint16,uint16,uint16,bool)',
    'function feeGrowthGlobal0X128() view returns (uint256)',
    'function feeGrowthGlobal1X128() view returns (uint256)',
    'event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)'
  ])
  const gaugeAbi = new ethers.utils.Interface([
    'function deposit(uint256)',
    'function withdraw(uint256)',
    'function claimEmissions(address,address)',
    'function earned(address) view returns (uint256)',
    'function balanceOf(address) view returns (uint256)',
    'function totalSupply() view returns (uint256)',
    'function stakingToken() view returns (address)',
    'function stakedValues(address) view returns (uint256[])',
    'function nft() view returns (address)',
    'function lastCumulativeRewardShare() view returns (uint256)'
  ])
  const voterAbi = new ethers.utils.Interface([
    'function RECEIPT_TOKEN() view returns (address)',
    'function projectedCumulativeRewardShare(address) view returns (uint256)',
    'function gaugeStates(address) view returns (uint128 ceiling,uint128 claimed,uint48 lastSettlement,bool isRegistered,bool isActivated,uint128 surplus,uint256 lastIndex,uint256 lastTimeIndex,(int128 bias,int128 slope,uint48 ts,uint128 permanentStakeBalance) point)'
  ])
  const managerAbi = new ethers.utils.Interface([
    'function balanceOf(address) view returns (uint256)',
    'function tokenOfOwnerByIndex(address,uint256) view returns (uint256)',
    'function ownerOf(uint256) view returns (address)',
    'function getApproved(uint256) view returns (address)',
    'function approve(address,uint256)',
    'function positions(uint256) view returns (uint96 nonce,address operator,address token0,address token1,int24 tickSpacing,int24 tickLower,int24 tickUpper,uint128 liquidity,uint256 feeGrowthInside0LastX128,uint256 feeGrowthInside1LastX128,uint128 tokensOwed0,uint128 tokensOwed1)',
    'function mint((address token0,address token1,int24 tickSpacing,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline,uint160 sqrtPriceX96)) payable returns (uint256,uint128,uint256,uint256)',
    'function increaseLiquidity((uint256 tokenId,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns (uint128,uint256,uint256)',
    'function decreaseLiquidity((uint256 tokenId,uint128 liquidity,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns (uint256,uint256)',
    'function collect((uint256 tokenId,address recipient,uint128 amount0Max,uint128 amount1Max)) payable returns (uint256,uint256)',
    'function burn(uint256) payable',
    'function multicall(bytes[]) payable returns (bytes[])'
  ])
  const sickleFactoryAbi = new ethers.utils.Interface(['function sickles(address) view returns (address)'])
  const nftPositionTuple = '((address stakingContract,uint256 poolIndex) farm,address nft,uint256 tokenId)'
  const nftHarvestTuple = '(address[] rewardTokens,uint128 amount0Max,uint128 amount1Max,bytes extraData)'
  const swapTuple = '(address tokenApproval,address router,uint256 amountIn,uint256 desiredAmountOut,uint256 minAmountOut,address tokenIn,address tokenOut,bytes extraData)'
  const nftStrategyAbi = new ethers.utils.Interface([
    'function simpleHarvest(' + nftPositionTuple + ' position,' + nftHarvestTuple + ' params)',
    'function simpleExit(' + nftPositionTuple + ' position,' + nftHarvestTuple + ' harvestParams,bytes withdrawExtraData)',
    'function exit(' + nftPositionTuple + ' position,(' + nftHarvestTuple + ' harvest,' + swapTuple + '[] swaps,address[] outputTokens,address[] sweepTokens) harvestParams,(((address nft,uint256 tokenId,uint128 liquidity,uint256 amount0Min,uint256 amount1Min,uint128 amount0Max,uint128 amount1Max,bytes extraData) removeLiquidityParams,' + swapTuple + '[] swaps) zap,address[] tokensOut,bytes extraData) withdrawParams,address[] sweepTokens)'
  ])
  const farmStrategyAbi = new ethers.utils.Interface([
    'function simpleHarvest((address stakingContract,uint256 poolIndex) farm,(address[] rewardTokens,bytes extraData) params)',
    'function simpleExit((address stakingContract,uint256 poolIndex) farm,(address[] rewardTokens,bytes extraData) harvestParams,(address lpToken,uint256 amountOut,bytes extraData) withdrawParams)'
  ])
  const multicall = new ethers.utils.Interface([
    'function aggregate3((address target,bool allowFailure,bytes callData)[] calls) payable returns ((bool success,bytes returnData)[])'
  ])
  const v2SwapTopic = ethers.utils.id('Swap(address,address,uint256,uint256,uint256,uint256)')
  const clSwapTopic = ethers.utils.id('Swap(address,address,int256,int256,uint160,uint128,int24)')

  const chain = (function () {
    const parts = window.location.pathname.split('/').filter(Boolean)
    if (parts[parts.length - 1] === 'index.html') parts.pop()
    const last = parts[parts.length - 1]
    const key = last === 'aero' ? (parts.length >= 2 ? parts[parts.length - 2] : 'ethereum') : ''
    return chains[key] || null
  })()
  const sickleChain = chain ? getSickleChain(chain.number) : null

  const state = {
    pools: [], tokens: new Map(), prices: new Map(), confidence: new Map(), factories: [],
    head: null, headTime: null, feeFrom: null, feeSeconds: null, feesReady: false, feeFailed: false,
    showZero: false, ready: false, voter: null, receipt: null, rewardToken: null, nftNote: '',
    eip1193: null, account: null, walletChain: null, boundProvider: null, reownUnsubscribe: null,
    action: null, actionInfo: null, positions: [], positionsLoading: false, positionsFailed: false,
    sending: false, status: '', spinner: null
  }

  const byId = id => document.getElementById(id)
  const lower = value => String(value || '').toLowerCase()
  const short = value => value ? String(value).slice(0, 6) + '…' + String(value).slice(-4) : '—'
  const finite = value => Number.isFinite(value) && value >= 0
  const correctChain = () => chain && lower(state.walletChain) === chain.id
  const injected = () => window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null
  const token = value => state.tokens.get(lower(value)) || { address: value, symbol: short(value), decimals: null }
  const anchorSet = new Set((chain ? chain.anchors : []).map(lower))
  const errText = error => String(error && (error.reason || (error.data && error.data.message) || error.message) || error).replace(/^Error: /, '').replace(/\s+/g, ' ').slice(0, 360)
  const compact = value => { if (!finite(value)) return '—'; if (value >= 1e9) return (value / 1e9).toFixed(2) + 'b'; if (value >= 1e6) return (value / 1e6).toFixed(2) + 'm'; if (value >= 1e3) return (value / 1e3).toFixed(2) + 'k'; if (value >= 1) return value.toFixed(2); return value > 0 ? value.toPrecision(3) : '0' }
  const usd = value => finite(value) ? '$' + compact(value) : '—'
  const percent = value => finite(value) ? compact(value) + '%' : '—'
  const grouped = value => finite(value) ? Math.round(value).toLocaleString('en-US') : '—'
  const amountNum = (value, decimals) => { try { const number = Number(ethers.utils.formatUnits(value, decimals)); return Number.isFinite(number) ? number : NaN } catch (_) { return NaN } }
  const formatAmount = (value, decimals) => { try { const parts = ethers.utils.formatUnits(value || 0, decimals == null ? 18 : decimals).split('.'); const tail = (parts[1] || '').slice(0, 6).replace(/0+$/, ''); return tail ? parts[0] + '.' + tail : parts[0] } catch (_) { return '—' } }
  const formatNum = value => { if (!Number.isFinite(value)) return '—'; if (value === 0) return '0'; const abs = Math.abs(value); if (abs >= 1e6) return compact(value); if (abs >= 1) return value.toFixed(abs >= 1000 ? 2 : 4).replace(/\.?0+$/, ''); return value.toPrecision(4) }
  const feeText = fee => (fee / 10000).toFixed(4).replace(/0+$/, '').replace(/\.$/, '') + '%'
  const bipsText = bips => (bips / 100).toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + '%'
  const e = (tag, options) => { const node = document.createElement(tag); const o = options || {}; if (o.text !== undefined) node.textContent = o.text; if (o.className) node.className = o.className; if (o.id) node.id = o.id; if (o.type) node.type = o.type; if (o.disabled) node.disabled = true; return node }
  const append = (parent, ...children) => { children.forEach(child => parent.appendChild(child)); return parent }
  const button = (label, fn, disabled) => { const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'aero-action', disabled: disabled || state.sending }); node.addEventListener('click', function () { Promise.resolve(fn()).catch(error => setStatus(errText(error), 'error')) }); return node }
  const pause = delay => new Promise(resolve => window.setTimeout(resolve, delay))
  const isAddress = value => { try { return ethers.utils.isAddress(value) } catch (_) { return false } }
  const asAddress = value => { try { return value && isAddress(value) && lower(value) !== zeroAddress ? ethers.utils.getAddress(value) : null } catch (_) { return null } }
  const asList = value => Array.isArray(value) ? value.map(asAddress).filter(Boolean) : []
  const bytesText = value => { try { return ethers.utils.parseBytes32String(value).replace(/\u0000/g, '').trim() } catch (_) { return '' } }

  const rpcEndpoints = (function () {
    const list = chain ? chain.rpcs.slice() : []
    try {
      const custom = new URLSearchParams(window.location.search).get('rpc')
      if (custom && /^https:\/\//i.test(custom)) return [custom].concat(list)
    } catch (_) {}
    return list
  })()
  let rpcIndex = 0
  const currentRpc = () => rpcEndpoints[rpcIndex % Math.max(rpcEndpoints.length, 1)]
  const nextRpc = () => { rpcIndex += 1 }
  const isTransport = error => Boolean(error && error.transport)
  const unreachableError = () => { const error = new Error('Network unavailable.'); error.transport = true; return error }
  let nextLogsAt = 0
  async function logsTurn () { const now = Date.now(); const at = Math.max(now, nextLogsAt); nextLogsAt = at + logSpacing; if (at > now) await pause(at - now) }

  function setStatus (text, kind) { state.status = text || ''; const node = byId('aero-status'); if (!node) return; node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = kind || '' }
  function setLoadingText (text) { const node = byId('aero-loading-text'); if (node && text) node.textContent = text }
  function loading (active) {
    const box = byId('aero-loading'); const spin = byId('aero-loading-spin')
    if (!box) return
    box.hidden = !active
    if (active && !state.spinner && spin) { let index = 0; state.spinner = window.setInterval(function () { spin.textContent = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]'][index++ % 5] }, 260) }
    if (!active && state.spinner) { window.clearInterval(state.spinner); state.spinner = null }
  }

  async function rpcBatch (calls, options) {
    const o = options || {}; const attempts = o.attempts || 8; let lastError
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const controller = new window.AbortController(); const timer = window.setTimeout(function () { controller.abort() }, o.timeout || 20000)
      try {
        const body = calls.map((call, index) => ({ jsonrpc: '2.0', id: index + 1, method: call.method, params: call.params }))
        let response
        try { response = await window.fetch(currentRpc(), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body.length === 1 ? body[0] : body), signal: controller.signal }) } catch (error) { if (error && error.name !== 'AbortError') error.transport = true; throw error }
        const text = await response.text(); let values = null; try { values = JSON.parse(text) } catch (_) {}
        if (values && !Array.isArray(values)) values = [values]
        if (response.status === 429) throw new Error('RPC rate limit.')
        if (!response.ok || !values) throw unreachableError()
        const map = new Map(values.map(value => [value.id, value]))
        const results = body.map(value => map.get(value.id) || { error: { message: 'Missing RPC response.' } })
        if (results.some(value => value.error && (value.error.code === -32005 || /rate limit/i.test(value.error.message || '')))) throw new Error('RPC rate limit.')
        return results
      } catch (error) { lastError = error; if (isTransport(error)) nextRpc(); if (attempt + 1 < attempts) await pause(Math.min(8000, 400 * (2 ** attempt))) } finally { window.clearTimeout(timer) }
    }
    throw lastError
  }
  async function rpc (method, params, options) { const value = (await rpcBatch([{ method, params }], options))[0]; if (value.error) { const error = new Error(value.error.message || 'RPC error.'); error.data = value.error.data; throw error } return value.result }

  function callOk (item) {
    if (!item) return { ok: false, data: '0x' }
    if (item.success !== undefined) return { ok: Boolean(item.success), data: item.returnData }
    return { ok: Boolean(item[0]), data: item[1] }
  }
  function decodeCall (call, raw) {
    try {
      const result = call.iface.decodeFunctionResult(call.method, raw)
      return call.whole ? result : result.length === 1 ? result[0] : result
    } catch (_) { return call.fallback }
  }
  // Multicall chunks are independent, so send up to rpcConcurrency at once and keep rows in call order.
  async function multicallRows (calls, size, block, options) {
    const groups = []
    for (let start = 0; start < calls.length; start += size) groups.push(calls.slice(start, start + size))
    const results = new Array(groups.length); let next = 0
    async function worker () {
      while (next < groups.length) {
        const index = next++
        const data = multicall.encodeFunctionData('aggregate3', [groups[index].map(call => ({ target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }))])
        const raw = await rpc('eth_call', [{ to: multicallAddress, data }, block], options)
        results[index] = multicall.decodeFunctionResult('aggregate3', raw)[0].map(callOk)
      }
    }
    await Promise.all(Array.from({ length: Math.min(rpcConcurrency, groups.length) }, worker))
    return [].concat(...results)
  }
  async function batch (calls) {
    if (!calls.length) return []
    const rows = await multicallRows(calls, 120, 'latest')
    return rows.map((row, index) => row.ok ? decodeCall(calls[index], row.data) : calls[index].fallback)
  }

  function readSymbol (raw) {
    if (!raw || raw === '0x') return null
    try {
      const size = ethers.utils.arrayify(raw).length
      if (size === 32) { const text = ethers.utils.parseBytes32String(raw).replace(/\u0000/g, '').trim(); return text || null }
    } catch (_) {}
    try { const text = erc20.decodeFunctionResult('symbol', raw)[0]; return text ? String(text) : null } catch (_) { return null }
  }

  async function loadTokens (values) {
    const list = [...new Set(values.map(lower))].filter(value => isAddress(value) && value !== zeroAddress && !state.tokens.has(value))
    if (!list.length) return
    const calls = []; list.forEach(value => calls.push({ target: value, iface: erc20, method: 'symbol', fallback: null }, { target: value, iface: erc20, method: 'decimals', fallback: null }))
    const encoded = await multicallRows(calls, 120, 'latest')
    const retry = []
    list.forEach(function (value, index) {
      const symbolRow = encoded[index * 2]; const decimalRow = encoded[index * 2 + 1]
      let symbol = symbolRow && symbolRow.ok ? readSymbol(symbolRow.data) : null
      if (!symbol) retry.push(value)
      const decimals = decimalRow && decimalRow.ok ? decodeCall({ iface: erc20, method: 'decimals', fallback: null }, decimalRow.data) : null
      state.tokens.set(value, { address: ethers.utils.getAddress(value), symbol: symbol ? String(symbol).replace(/[\r\n\t]/g, ' ').slice(0, 18) : null, decimals: decimals == null ? null : Number(decimals), pending: !symbol })
    })
    if (retry.length) {
      const rows = await batch(retry.map(value => ({ target: value, iface: erc20Bytes, method: 'symbol', fallback: null })))
      retry.forEach(function (value, index) {
        const info = state.tokens.get(value); if (!info) return
        const raw = rows[index]
        if (raw) { try { const text = ethers.utils.parseBytes32String(raw).replace(/\u0000/g, '').trim(); if (text) info.symbol = text.slice(0, 18) } catch (_) {} }
        if (!info.symbol) info.symbol = short(value)
        info.pending = false
      })
    }
    list.forEach(function (value) { const info = state.tokens.get(value); if (info && !info.symbol) info.symbol = short(value) })
  }

  async function enumerateFactories () {
    const found = await batch([
      { target: chain.registry, iface: registry, method: 'targetFactories', fallback: [] },
      { target: chain.registry, iface: registry, method: 'gaugeFactories', fallback: [] },
      { target: chain.registry, iface: registry, method: 'leafVoter', fallback: null }
    ])
    const targets = asList(found[0])
    const gaugeFactories = asList(found[1])
    state.voter = asAddress(found[2])
    state.receipt = null; state.rewardToken = null
    if (state.voter) {
      const receipt = await batch([{ target: state.voter, iface: voterAbi, method: 'RECEIPT_TOKEN', fallback: null }])
      state.receipt = asAddress(receipt[0])
      state.rewardToken = await resolveAeroRewardToken(batch, chain.number, state.voter, state.receipt)
    }
    const meta = []
    targets.forEach(address => meta.push(
      { target: address, iface: factoryAbi, method: 'allPoolsLength', fallback: null },
      { target: address, iface: factoryAbi, method: 'positionManager', fallback: null },
      { target: address, iface: factoryAbi, method: 'defaultFee', fallback: null }
    ))
    const rows = await batch(meta)
    const factories = targets.map(function (address, index) {
      const length = rows[index * 3]
      const manager = asAddress(rows[index * 3 + 1])
      const fee = rows[index * 3 + 2]
      return { address, length: length == null ? 0 : Number(length), manager, feeBips: fee == null ? null : Number(fee), kind: manager ? 'cl' : (fee == null ? null : 'v2') }
    }).filter(factory => factory.length >= 0)
    for (const factory of factories) {
      if (!factory.length) continue
      const sample = await batch([
        { target: factory.address, iface: factoryAbi, method: 'allPools', args: [0], fallback: null },
      ])
      const pool = asAddress(sample[0]); if (!pool) continue
      const typed = await batch([{ target: pool, iface: v2Pool, method: 'POOL_TYPE', fallback: null }])
      const label = typed[0] ? bytesText(typed[0]) : ''
      if (label.indexOf('CL') === 0) factory.kind = 'cl'
      else if (label.indexOf('V2') === 0) factory.kind = 'v2'
    }
    state.factories = factories.filter(factory => factory.kind)
    return gaugeFactories
  }

  async function listPools () {
    const pools = []
    for (const factory of state.factories) {
      if (!factory.length) continue
      setLoadingText('Reading Aero pools… ' + pools.length)
      const addresses = await batch(Array.from({ length: factory.length }, (_, index) => ({ target: factory.address, iface: factoryAbi, method: 'allPools', args: [index], fallback: null })))
      addresses.forEach(function (value) {
        const address = asAddress(value); if (!address) return
        pools.push({
          address, factory: factory.address, kind: factory.kind, manager: factory.manager, feeBips: factory.feeBips,
          stable: factory.kind === 'v2' && factory.feeBips === 5, ready: false, empty: true, gauge: null,
          reserve0: ethers.constants.Zero, reserve1: ethers.constants.Zero, totalSupply: ethers.constants.Zero,
          liquidity: ethers.constants.Zero, stakedLiquidity: ethers.constants.Zero, fee0: 0, fee1: 0, feeCovered: false
        })
      })
    }
    state.pools = pools
  }

  async function linkGauges (gaugeFactories) {
    const byPool = new Map(state.pools.map(pool => [lower(pool.address), pool]))
    const approved = new Set(state.factories.map(factory => lower(factory.address)))
    for (const gaugeFactory of gaugeFactories) {
      let gauges = asList((await batch([{ target: chain.registry, iface: registry, method: 'factoryToGauges', args: [gaugeFactory], fallback: null }]))[0])
      if (!gauges.length) {
        const length = (await batch([{ target: chain.registry, iface: registry, method: 'factoryToGaugesLength', args: [gaugeFactory], fallback: null }]))[0]
        const count = length == null ? 0 : Number(length)
        if (count) gauges = (await batch(Array.from({ length: count }, (_, index) => ({ target: chain.registry, iface: registry, method: 'factoryToGaugesAt', args: [gaugeFactory, index], fallback: null })))).map(asAddress).filter(Boolean)
      }
      if (!gauges.length) continue
      const targets = await batch(gauges.map(gauge => ({ target: chain.registry, iface: registry, method: 'gaugeToTarget', args: [gauge], fallback: null })))
      const backs = await batch(targets.map(target => ({ target: chain.registry, iface: registry, method: 'targetToGauge', args: [asAddress(target) || zeroAddress], fallback: null })))
      const homes = await batch(gauges.map(gauge => ({ target: chain.registry, iface: registry, method: 'gaugeToFactory', args: [gauge], fallback: null })))
      const accepted = []
      gauges.forEach(function (gauge, index) {
        const target = asAddress(targets[index]); const back = asAddress(backs[index]); const home = asAddress(homes[index])
        if (!target || !back || lower(back) !== lower(gauge) || !home || lower(home) !== lower(gaugeFactory)) return
        accepted.push({ gauge, target })
      })
      const missing = accepted.filter(item => !byPool.has(lower(item.target)))
      if (missing.length) {
        const factories = await batch(missing.map(item => ({ target: item.target, iface: v2Pool, method: 'factory', fallback: null })))
        missing.forEach(function (item, index) {
          const factory = asAddress(factories[index]); if (!factory || !approved.has(lower(factory))) return
          const known = state.factories.find(entry => lower(entry.address) === lower(factory))
          const pool = { address: item.target, factory, kind: known ? known.kind : null, manager: known ? known.manager : null, feeBips: known ? known.feeBips : null, stable: false, ready: false, empty: true, gauge: null, reserve0: ethers.constants.Zero, reserve1: ethers.constants.Zero, totalSupply: ethers.constants.Zero, liquidity: ethers.constants.Zero, stakedLiquidity: ethers.constants.Zero, fee0: 0, fee1: 0, feeCovered: false }
          state.pools.push(pool); byPool.set(lower(pool.address), pool)
        })
      }
      accepted.forEach(function (item) { const pool = byPool.get(lower(item.target)); if (pool) pool.gauge = item.gauge })
    }
    const needManager = state.factories.filter(factory => factory.kind === 'cl' && !factory.manager)
    for (const factory of needManager) {
      const pool = state.pools.find(item => lower(item.factory) === lower(factory.address) && item.gauge)
      if (!pool) continue
      const nft = asAddress((await batch([{ target: pool.gauge, iface: gaugeAbi, method: 'nft', fallback: null }]))[0])
      if (nft) { factory.manager = nft; state.pools.forEach(item => { if (lower(item.factory) === lower(factory.address)) item.manager = nft }) }
    }
  }

  async function hydratePools () {
    const calls = []
    state.pools.forEach(function (pool) {
      calls.push(
        { target: pool.address, iface: v2Pool, method: 'token0', fallback: null },
        { target: pool.address, iface: v2Pool, method: 'token1', fallback: null },
        { target: pool.address, iface: v2Pool, method: 'POOL_TYPE', fallback: null }
      )
      if (pool.kind === 'cl') {
        calls.push(
          { target: pool.address, iface: clPool, method: 'tickSpacing', fallback: null },
          { target: pool.address, iface: clPool, method: 'fee', fallback: null },
          { target: pool.address, iface: clPool, method: 'slot0', fallback: null, whole: true },
          { target: pool.address, iface: clPool, method: 'liquidity', fallback: null },
          { target: pool.address, iface: clPool, method: 'stakedLiquidity', fallback: null }
        )
      } else {
        calls.push(
          { target: pool.address, iface: v2Pool, method: 'getReserves', fallback: null, whole: true },
          { target: pool.address, iface: v2Pool, method: 'totalSupply', fallback: null }
        )
      }
    })
    const values = await batch(calls)
    let cursor = 0
    state.pools.forEach(function (pool) {
      pool.token0 = asAddress(values[cursor++]); pool.token1 = asAddress(values[cursor++])
      const label = values[cursor++] ? bytesText(values[cursor - 1]) : ''
      if (label.indexOf('CL') === 0) pool.kind = 'cl'
      if (label.indexOf('V2') === 0) pool.kind = 'v2'
      if (label.indexOf('STABLE') >= 0) pool.stable = true
      else if (label.indexOf('VOLATILE') >= 0) pool.stable = false
      if (pool.kind === 'cl') {
        const spacing = values[cursor++]; const fee = values[cursor++]; pool.slot0 = values[cursor++]; pool.liquidity = values[cursor++] || ethers.constants.Zero; pool.stakedLiquidity = values[cursor++] || ethers.constants.Zero
        pool.tickSpacing = spacing == null ? null : Number(spacing)
        pool.swapFee = fee == null ? null : Number(fee)
      } else {
        const reserves = values[cursor++]
        pool.reserve0 = reserves ? reserves[0] : ethers.constants.Zero
        pool.reserve1 = reserves ? reserves[1] : ethers.constants.Zero
        pool.totalSupply = values[cursor++] || ethers.constants.Zero
      }
    })
    const tokenList = []
    state.pools.forEach(function (pool) { if (pool.token0) tokenList.push(pool.token0); if (pool.token1) tokenList.push(pool.token1) })
    if (state.rewardToken) tokenList.push(state.rewardToken)
    await loadTokens(tokenList)
    const balances = []
    state.pools.forEach(function (pool) {
      if (pool.kind !== 'cl' || !pool.token0 || !pool.token1) return
      balances.push({ target: pool.token0, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null }, { target: pool.token1, iface: erc20, method: 'balanceOf', args: [pool.address], fallback: null })
    })
    const reserveRows = await batch(balances)
    let balanceCursor = 0
    const stableCalls = []
    state.pools.forEach(function (pool) {
      if (pool.kind === 'cl' && pool.token0 && pool.token1) { pool.reserve0 = reserveRows[balanceCursor++] || ethers.constants.Zero; pool.reserve1 = reserveRows[balanceCursor++] || ethers.constants.Zero }
      const info = token(pool.token0)
      if (pool.kind === 'v2' && pool.stable && pool.token0 && info.decimals != null && pool.reserve0 && !pool.reserve0.isZero() && pool.reserve1 && !pool.reserve1.isZero()) stableCalls.push({ pool, call: { target: pool.address, iface: v2Pool, method: 'getAmountOut', args: [ethers.BigNumber.from(10).pow(info.decimals), pool.token0], fallback: null } })
    })
    const spots = await batch(stableCalls.map(item => item.call))
    stableCalls.forEach(function (item, index) { item.pool.stableOut = spots[index] })
    const feeCalls = []
    state.pools.forEach(function (pool) {
      if (pool.kind !== 'v2') return
      feeCalls.push({ pool, call: { target: pool.factory, iface: factoryAbi, method: 'getBaseFee', args: [pool.address, zeroAddress, 0, 0, pool.reserve0 || 0, pool.reserve1 || 0], fallback: null } })
    })
    const fees = await batch(feeCalls.map(item => item.call))
    feeCalls.forEach(function (item, index) { if (fees[index] != null) item.pool.feeBips = Number(fees[index]) })
    const gaugeCalls = []
    state.pools.forEach(function (pool) {
      if (!pool.gauge) return
      gaugeCalls.push({ pool, supply: pool.kind === 'v2', call: pool.kind === 'v2'
        ? { target: pool.gauge, iface: gaugeAbi, method: 'totalSupply', fallback: null }
        : { target: pool.address, iface: clPool, method: 'stakedLiquidity', fallback: null } })
      gaugeCalls.push({ pool, share: true, call: { target: pool.gauge, iface: gaugeAbi, method: 'lastCumulativeRewardShare', fallback: null } })
      if (state.voter) gaugeCalls.push({ pool, projected: true, call: { target: state.voter, iface: voterAbi, method: 'projectedCumulativeRewardShare', args: [pool.gauge], fallback: null } }, { pool, settled: true, call: { target: state.voter, iface: voterAbi, method: 'gaugeStates', args: [pool.gauge], fallback: null, whole: true } })
    })
    const gaugeRows = await batch(gaugeCalls.map(item => item.call))
    gaugeCalls.forEach(function (item, index) {
      const value = gaugeRows[index]
      if (item.supply && item.pool.kind === 'v2') item.pool.gaugeSupply = value || ethers.constants.Zero
      if (item.supply && item.pool.kind === 'cl' && value) item.pool.stakedLiquidity = value
      if (item.share) item.pool.lastShare = value
      if (item.projected) item.pool.projectedShare = value
      if (item.settled && value) item.pool.lastSettlement = Number(value.lastSettlement != null ? value.lastSettlement : value[2])
    })
    state.pools.forEach(function (pool) {
      const pricedTokens = pool.token0 && pool.token1 && token(pool.token0).decimals != null && token(pool.token1).decimals != null
      if (pool.kind === 'cl') pool.empty = (!pool.liquidity || pool.liquidity.isZero()) && (!pool.reserve0 || pool.reserve0.isZero()) && (!pool.reserve1 || pool.reserve1.isZero())
      else pool.empty = (!pool.totalSupply || pool.totalSupply.isZero()) && (!pool.reserve0 || pool.reserve0.isZero()) && (!pool.reserve1 || pool.reserve1.isZero())
      pool.ready = Boolean(pool.token0 && pool.token1 && pricedTokens && (pool.kind === 'cl' ? pool.slot0 && pool.tickSpacing != null && pool.swapFee != null : pool.reserve0 && pool.reserve1 && pool.totalSupply))
    })
  }

  function sqrtPrice (pool) { const value = pool.slot0 && Number(pool.slot0.sqrtPriceX96 != null ? pool.slot0.sqrtPriceX96.toString() : pool.slot0[0].toString()) / q96; return Number.isFinite(value) && value > 0 ? value : NaN }
  function poolSpot (pool) {
    const t0 = token(pool.token0); const t1 = token(pool.token1)
    if (t0.decimals == null || t1.decimals == null) return NaN
    if (pool.kind === 'cl') { const value = sqrtPrice(pool) ** 2 * (10 ** (t0.decimals - t1.decimals)); return Number.isFinite(value) && value > 0 ? value : NaN }
    if (pool.stable) {
      if (!pool.stableOut || !pool.reserve0 || pool.reserve0.isZero()) return NaN
      const out = amountNum(pool.stableOut, t1.decimals)
      return out > 0 ? out : NaN
    }
    if (!pool.reserve0 || pool.reserve0.isZero() || !pool.reserve1 || pool.reserve1.isZero()) return NaN
    const value = amountNum(pool.reserve1, t1.decimals) / amountNum(pool.reserve0, t0.decimals)
    return Number.isFinite(value) && value > 0 ? value : NaN
  }
  function tickPrice (pool, tick) { const t0 = token(pool.token0); const t1 = token(pool.token1); return Math.pow(1.0001, tick) * (10 ** (t0.decimals - t1.decimals)) }
  function sideValue (amount, price) { if (!(amount > 0)) return 0; return finite(price) ? amount * price : NaN }

  function compute () {
    state.prices = new Map(); state.confidence = new Map()
    anchorSet.forEach(function (key) { state.prices.set(key, 1); state.confidence.set(key, Number.MAX_VALUE) })
    state.pools.forEach(function (pool) {
      if (!pool.ready) return
      const t0 = token(pool.token0); const t1 = token(pool.token1)
      pool.amounts = [amountNum(pool.reserve0 || 0, t0.decimals), amountNum(pool.reserve1 || 0, t1.decimals)]
      pool.spot = pool.empty ? NaN : poolSpot(pool)
    })
    for (let pass = 0; pass < 8; pass += 1) {
      let changed = false
      state.pools.forEach(function (pool) {
        if (!pool.ready || pool.empty || !finite(pool.spot) || !pool.amounts) return
        if (pool.kind === 'v2' && (!pool.totalSupply || pool.totalSupply.isZero())) return
        if (pool.kind === 'cl' && (!pool.liquidity || pool.liquidity.isZero())) return
        const key0 = lower(pool.token0); const key1 = lower(pool.token1)
        const price0 = state.prices.get(key0); const price1 = state.prices.get(key1)
        const confidence0 = state.confidence.get(key0) || 0; const confidence1 = state.confidence.get(key1) || 0
        if (finite(price0) && pool.amounts[0] > 0) { const candidate = price0 / pool.spot; const confidence = Math.min(confidence0, pool.amounts[0] * price0 * 2); if (candidate > minPrice && candidate < maxPrice && confidence > confidence1) { state.prices.set(key1, candidate); state.confidence.set(key1, confidence); changed = true } }
        if (finite(price1) && pool.amounts[1] > 0) { const candidate = price1 * pool.spot; const confidence = Math.min(confidence1, pool.amounts[1] * price1 * 2); if (candidate > minPrice && candidate < maxPrice && confidence > confidence0) { state.prices.set(key0, candidate); state.confidence.set(key0, confidence); changed = true } }
      })
      if (!changed) break
    }
    state.pools.forEach(function (pool) {
      if (!pool.ready) return
      const price0 = state.prices.get(lower(pool.token0)); const price1 = state.prices.get(lower(pool.token1))
      const left = sideValue(pool.amounts[0], price0); const right = sideValue(pool.amounts[1], price1)
      pool.tvl = pool.empty ? 0 : (finite(left) && finite(right) ? left + right : NaN)
      pool.feeApr = pool.empty ? 0 : NaN
      pool.emApr = pool.empty || !pool.gauge ? 0 : NaN
      if (!pool.empty && pool.feeCovered) {
        const t0 = token(pool.token0); const t1 = token(pool.token1)
        const fee0 = pool.fee0 / (10 ** t0.decimals); const fee1 = pool.fee1 / (10 ** t1.decimals)
        const feeUsd = sideValue(fee0, price0) + sideValue(fee1, price1)
        pool.feeUsd = finite(feeUsd) ? feeUsd : NaN
        pool.feeApr = finite(pool.feeUsd) && finite(pool.tvl) && pool.tvl > 0 && finite(state.feeSeconds) ? pool.feeUsd * secondsPerYear / state.feeSeconds / pool.tvl * 100 : (pool.feeUsd === 0 ? 0 : NaN)
      } else if (pool.empty) pool.feeUsd = 0
      else pool.feeUsd = NaN
      if (pool.gauge && !pool.empty) {
        const projected = pool.projectedShare
        const last = pool.lastShare
        const known = projected != null && last != null
        const delta = known && projected.gte(last) ? projected.sub(last) : null
        const window = state.headTime && pool.lastSettlement ? state.headTime - pool.lastSettlement : 0
        const reward = state.rewardToken ? token(state.rewardToken) : null
        const price = state.rewardToken ? state.prices.get(lower(state.rewardToken)) : NaN
        let stakedTvl = NaN
        if (finite(pool.tvl) && pool.tvl > 0) {
          if (pool.kind === 'v2' && pool.gaugeSupply && pool.totalSupply && !pool.totalSupply.isZero()) stakedTvl = pool.tvl * Number(pool.gaugeSupply.toString()) / Number(pool.totalSupply.toString())
          if (pool.kind === 'cl' && pool.liquidity && !pool.liquidity.isZero() && pool.stakedLiquidity) stakedTvl = pool.tvl * Number(pool.stakedLiquidity.toString()) / Number(pool.liquidity.toString())
        }
        if (!known || delta == null) pool.emApr = NaN
        else if (delta.isZero()) pool.emApr = 0
        else if (window >= minStakeWindow && reward && reward.decimals != null && finite(price) && finite(stakedTvl) && stakedTvl > 0) {
          const tokens = amountNum(delta, reward.decimals)
          pool.emApr = tokens * price * secondsPerYear / window / stakedTvl * 100
        } else pool.emApr = NaN
      }
      const parts = [pool.feeApr, pool.emApr].filter(value => finite(value) && value > 0)
      pool.sortApr = parts.length ? parts.reduce((sum, value) => sum + value, 0) : (finite(pool.feeApr) || finite(pool.emApr) ? 0 : -1)
    })
  }

  async function feeWindow () {
    const headBlock = await rpc('eth_getBlockByNumber', [ethers.utils.hexValue(state.head), false])
    const headTime = Number(headBlock.timestamp)
    const probe = Math.max(0, state.head - 2000)
    const old = await rpc('eth_getBlockByNumber', [ethers.utils.hexValue(probe), false])
    const elapsed = Math.max(1, headTime - Number(old.timestamp))
    const blocks = Math.min(250000, Math.max(2000, Math.round(feeHours * 3600 * (state.head - probe) / elapsed)))
    const from = Math.max(0, state.head - blocks)
    const fromBlock = await rpc('eth_getBlockByNumber', [ethers.utils.hexValue(from), false])
    state.feeFrom = from
    state.feeSeconds = Math.max(1, headTime - Number(fromBlock.timestamp))
    state.headTime = headTime
  }

  async function loadSwapLogs (addresses, topic) {
    if (!addresses.length) return []
    const ranges = []
    for (let to = state.head; to > state.feeFrom; to -= logRange) ranges.push([Math.max(state.feeFrom + 1, to - logRange + 1), to])
    const groups = []
    for (let start = 0; start < addresses.length; start += maxLogAddresses) groups.push(addresses.slice(start, start + maxLogAddresses))
    const logs = []
    for (const group of groups) {
      for (const range of ranges) {
        await logsTurn()
        const results = await rpcBatch([{ method: 'eth_getLogs', params: [{ address: group, topics: [topic], fromBlock: ethers.utils.hexValue(range[0]), toBlock: ethers.utils.hexValue(range[1]) }] }], { timeout: 30000, attempts: 6 })
        results.forEach(function (result) { if (!Array.isArray(result.result)) throw new Error((result.error && result.error.message) || 'Swap logs unavailable.'); logs.push(...result.result) })
      }
    }
    return logs
  }

  async function feeGrowthAt (pools, block) {
    const calls = []
    pools.forEach(pool => calls.push({ target: pool.address, iface: clPool, method: 'feeGrowthGlobal0X128' }, { target: pool.address, iface: clPool, method: 'feeGrowthGlobal1X128' }))
    const rows = await multicallRows(calls, 80, ethers.utils.hexValue(block), { attempts: 4, timeout: 20000 })
    const output = rows.map(function (row) { try { return row.ok ? clPool.decodeFunctionResult('feeGrowthGlobal0X128', row.data)[0] : null } catch (_) { return null } })
    return pools.map((_, index) => [output[index * 2], output[index * 2 + 1]])
  }

  function effectiveFee (growthDelta, weighted, input, pool) {
    if (!(input > 0)) return 0
    const rate = growthDelta != null && weighted > 0 ? growthDelta / weighted : NaN
    return (Number.isFinite(rate) && rate >= 0 && rate <= 0.1 ? rate : (pool.swapFee || 0) / 1000000) * input
  }

  async function loadFees () {
    state.feesReady = false; state.feeFailed = false
    const live = state.pools.filter(pool => pool.ready && !pool.empty)
    live.forEach(pool => { pool.fee0 = 0; pool.fee1 = 0; pool.feeCovered = false })
    if (!live.length) { state.feesReady = true; compute(); render(); return }
    try {
      await feeWindow()
      const cl = live.filter(pool => pool.kind === 'cl')
      const v2 = live.filter(pool => pool.kind === 'v2')
      const growth = await Promise.all([
        cl.length ? feeGrowthAt(cl, state.feeFrom).catch(() => null) : null,
        cl.length ? feeGrowthAt(cl, state.head).catch(() => null) : null
      ])
      const logs = await loadSwapLogs(cl.map(pool => pool.address), clSwapTopic)
      const v2logs = await loadSwapLogs(v2.map(pool => pool.address), v2SwapTopic)
      const map = new Map(cl.map((pool, index) => [lower(pool.address), { pool, input: [0, 0], weighted: [0, 0], index }]))
      logs.forEach(function (log) {
        const entry = map.get(lower(log.address)); if (!entry) return
        try {
          const value = clPool.parseLog(log).args; const liquidity = Number((value.liquidity || value[5]).toString())
          ;[value.amount0, value.amount1].forEach(function (amount, side) { if (!amount || !amount.gt(0)) return; const input = Number(amount.toString()); entry.input[side] += input; if (liquidity > 0) entry.weighted[side] += input / liquidity })
        } catch (_) {}
      })
      map.forEach(function (entry) {
        const fees = [0, 1].map(function (side) {
          const before = growth[0] && growth[0][entry.index] ? growth[0][entry.index][side] : null
          const after = growth[1] && growth[1][entry.index] ? growth[1][entry.index][side] : null
          const delta = before != null && after != null && after.gte(before) ? Number(after.sub(before).toString()) / (2 ** 128) : null
          return effectiveFee(delta, entry.weighted[side], entry.input[side], entry.pool)
        })
        entry.pool.fee0 = fees[0]; entry.pool.fee1 = fees[1]; entry.pool.feeCovered = true
      })
      const v2map = new Map(v2.map(pool => [lower(pool.address), pool]))
      v2logs.forEach(function (log) {
        const pool = v2map.get(lower(log.address)); if (!pool || pool.feeBips == null) return
        try {
          const value = v2Pool.parseLog(log).args
          const in0 = Number((value.amount0In || value[2]).toString()); const in1 = Number((value.amount1In || value[3]).toString())
          pool.fee0 += in0 * pool.feeBips / 10000; pool.fee1 += in1 * pool.feeBips / 10000; pool.feeCovered = true
        } catch (_) {}
      })
      v2.forEach(pool => { pool.feeCovered = true })
    } catch (error) { state.feeFailed = true; console.error(error) }
    state.feesReady = true; compute(); render()
  }

  function poolName (pool) { return token(pool.token0).symbol + ' / ' + token(pool.token1).symbol }
  function poolType (pool) {
    if (pool.kind === 'cl') return 'CL' + pool.tickSpacing + ' · ' + feeText(pool.swapFee || 0)
    return (pool.stable ? 'V2 stable · ' : 'V2 · ') + (pool.feeBips == null ? '—' : bipsText(pool.feeBips))
  }
  function isVisible (pool) {
    if (!pool.ready) return false
    if (state.showZero) return true
    if (pool.empty) return false
    if (!finite(pool.tvl)) return true
    if (!state.feesReady && !state.feeFailed) return true
    if (pool.feeApr > 0 || pool.emApr > 0) return true
    if (!finite(pool.feeApr) || !finite(pool.emApr)) return true
    return false
  }
  function addHeader (table, labels) { const head = e('thead'); const row = e('tr'); labels.forEach(label => row.appendChild(e('th', { text: label }))); head.appendChild(row); table.appendChild(head) }
  function addCell (row, text, className) { const cell = e('td', { text, className }); row.appendChild(cell); return cell }

  function renderPools () {
    const host = byId('aero-pools'); if (!host) return
    host.textContent = ''
    const visible = state.pools.filter(isVisible)
    visible.sort((a, b) => (b.sortApr || 0) - (a.sortApr || 0) || (b.tvl || 0) - (a.tvl || 0) || poolName(a).localeCompare(poolName(b)))
    if (!state.pools.some(pool => pool.ready)) return
    if (!visible.length) { const empty = e('p', { className: 'aero-summary', text: 'No live Aero pools. ' }); empty.appendChild(button('show 0 APR pools', toggleZero)); host.appendChild(empty); return }
    const table = e('table', { className: 'aero-table aero-pool-table' })
    addHeader(table, ['Pool', 'TVL', 'Fee APR', 'Emissions', 'Type', 'Actions'])
    const body = e('tbody')
    visible.forEach(function (pool) {
      const row = e('tr'); const name = e('td')
      append(name, e('span', { className: 'aero-name', text: poolName(pool) }), e('span', { className: 'aero-sub', text: short(pool.address) + (pool.gauge ? ' · gauge' : '') }))
      row.appendChild(name)
      addCell(row, usd(pool.tvl), finite(pool.tvl) ? '' : 'aero-unpriced')
      addCell(row, state.feesReady || pool.empty ? percent(pool.feeApr) : '…', finite(pool.feeApr) ? '' : 'aero-unpriced')
      addCell(row, percent(pool.emApr), finite(pool.emApr) ? '' : 'aero-unpriced')
      addCell(row, poolType(pool))
      const actions = e('td', { className: 'aero-actions' })
      if (pool.kind === 'cl') actions.appendChild(button('add', function () { return openAdd(pool) }, !pool.manager))
      row.appendChild(actions); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }

  function renderSummary () {
    const node = byId('aero-summary'); if (!node) return
    const ready = state.pools.filter(pool => pool.ready)
    if (!ready.length) { node.textContent = state.ready ? 'BLOCK : ' + grouped(state.head) + ' · POOLS : 0' : 'Aero —'; return }
    const priced = ready.filter(pool => finite(pool.tvl))
    const tvl = priced.reduce((sum, pool) => sum + pool.tvl, 0)
    const v2 = ready.filter(pool => pool.kind === 'v2').length
    const cl = ready.filter(pool => pool.kind === 'cl').length
    node.textContent = 'BLOCK : ' + grouped(state.head) + ' · POOLS : ' + v2 + ' V2 · ' + cl + ' CL · PRICED : ' + priced.length + '/' + ready.length + ' · TVL : ' + usd(tvl)
  }

  function renderWallet () {
    const node = byId('aero-wallet-status'); if (node) node.textContent = state.account ? short(state.account) + (correctChain() ? '' : ' · wrong network') + ' ' : ''
    const switcher = byId('aero-switch'); if (switcher) { switcher.hidden = !state.account || correctChain(); switcher.textContent = '[ switch to ' + chain.name + ' ]' }
  }

  function positionAmounts (position) {
    const pool = position.pool; const t0 = token(pool.token0); const t1 = token(pool.token1)
    const liquidity = Number(position.liquidity.toString()); const sp = sqrtPrice(pool)
    const sa = Math.pow(1.0001, position.tickLower / 2); const sb = Math.pow(1.0001, position.tickUpper / 2)
    let raw0 = 0; let raw1 = 0
    if (sp <= sa) raw0 = liquidity * (sb - sa) / (sa * sb)
    else if (sp < sb) { raw0 = liquidity * (sb - sp) / (sp * sb); raw1 = liquidity * (sp - sa) } else raw1 = liquidity * (sb - sa)
    return [raw0 / (10 ** t0.decimals), raw1 / (10 ** t1.decimals)]
  }

  function renderPositions () {
    const host = byId('aero-positions'); if (!host) return
    host.textContent = ''; host.hidden = !state.account || !correctChain()
    if (host.hidden) return
    if (state.positionsLoading) { host.appendChild(e('p', { className: 'aero-summary', text: 'Reading positions…' })); return }
    if (state.positionsFailed) { host.appendChild(e('p', { className: 'aero-summary', text: 'Wallet positions unavailable.' })); return }
    if (state.nftNote) host.appendChild(e('p', { className: 'aero-summary', text: state.nftNote }))
    if (!state.positions.length) { host.appendChild(e('p', { className: 'aero-summary', text: 'No wallet positions.' })); return }
    const table = e('table', { className: 'aero-table aero-position-table' }); addHeader(table, ['Position', 'Amount', 'Rewards', 'Actions']); const body = e('tbody')
    state.positions.forEach(function (position) {
      const pool = position.pool; const t0 = token(pool.token0); const t1 = token(pool.token1)
      const price0 = state.prices.get(lower(pool.token0)); const price1 = state.prices.get(lower(pool.token1))
      const row = e('tr'); const name = e('td')
      const label = position.deferred ? 'emissions' : position.kind === 'cl' ? '#' + position.id.toString() : 'LP'
      const where = position.deferred || position.claimOnly ? 'claimable' : position.kind === 'cl' ? (position.staked ? 'staked' : 'wallet') : ((position.staked && !position.staked.isZero() ? 'staked ' + formatAmount(position.staked, 18) : 'wallet'))
      append(name, e('span', { className: 'aero-name', text: poolName(pool) }), e('span', { className: 'aero-sub', text: label + ' · ' + (position.sickle ? 'sickle ' + short(position.sickle) + ' · ' : '') + where }))
      row.appendChild(name)
      let amountText = '—'
      if (position.deferred || position.claimOnly) amountText = '—'
      else if (position.kind === 'cl') {
        const amounts = position.liquidity.isZero() ? [0, 0] : positionAmounts(position)
        const value = finite(price0) && finite(price1) ? amounts[0] * price0 + amounts[1] * price1 : NaN
        const tick = pool.slot0 ? Number(pool.slot0.tick != null ? pool.slot0.tick : pool.slot0[1]) : NaN
        const inRange = tick >= position.tickLower && tick < position.tickUpper
        amountText = usd(value) + '\n' + formatNum(amounts[0]) + ' ' + t0.symbol + '\n' + formatNum(amounts[1]) + ' ' + t1.symbol + '\n' + (position.liquidity.isZero() ? 'closed' : inRange ? 'in range' : 'out of range')
      } else {
        const supply = pool.totalSupply && !pool.totalSupply.isZero() ? pool.totalSupply : null
        const wallet = position.wallet || ethers.constants.Zero
        const share = supply ? Number(wallet.add(position.staked || 0).toString()) / Number(supply.toString()) : 0
        const value = finite(pool.tvl) ? pool.tvl * share : NaN
        amountText = usd(value) + '\n' + formatAmount(wallet, 18) + ' LP\n' + formatAmount(position.staked || 0, 18) + ' staked'
      }
      addCell(row, amountText)
      const rewardLines = []
      if (position.kind === 'cl' && !position.deferred) rewardLines.push(formatAmount(position.fees0 || 0, t0.decimals) + ' ' + t0.symbol, formatAmount(position.fees1 || 0, t1.decimals) + ' ' + t1.symbol)
      else if (position.fees0 || position.fees1) rewardLines.push(formatAmount(position.fees0 || 0, t0.decimals) + ' ' + t0.symbol, formatAmount(position.fees1 || 0, t1.decimals) + ' ' + t1.symbol)
      const reward = state.rewardToken ? token(state.rewardToken) : null
      if (position.earned && !position.earned.isZero() && reward) rewardLines.push(formatAmount(position.earned, reward.decimals) + ' ' + reward.symbol)
      addCell(row, rewardLines.length ? rewardLines.join('\n') : '—')
      const actions = e('td', { className: 'aero-actions' })
      if (position.sickle) {
        const noRewards = !position.earned || position.earned.isZero() || !state.rewardToken
        if (sickleChain && pool.gauge && position.kind === 'cl' && !position.deferred) {
          if (position.staked) actions.appendChild(button('claim', function () { return sickleClaim(position) }, noRewards))
          actions.appendChild(button('withdraw NFT', function () { return sickleWithdrawNft(position) }))
          actions.appendChild(button('exit', function () { return sickleExit(position) }, position.liquidity.isZero()))
        } else if (sickleChain && pool.gauge && position.kind === 'v2' && position.staked && !position.staked.isZero()) {
          actions.appendChild(button('claim', function () { return sickleClaim(position) }, noRewards))
          actions.appendChild(button('unstake', function () { return sickleUnstakeV2(position) }))
        }
        const link = e('a', { text: '[ vfat.io ]' }); link.href = 'https://vfat.io/'; link.target = '_blank'; link.rel = 'noopener noreferrer'
        actions.appendChild(link); row.appendChild(actions); body.appendChild(row); return
      }
      if (position.deferred || position.claimOnly) {
        if (position.kind === 'v2') actions.appendChild(button('claim fees', function () { return sendTx(pool.address, v2Pool.encodeFunctionData('claimFees', [state.account]), 'Claim fees') }, (!position.fees0 || position.fees0.isZero()) && (!position.fees1 || position.fees1.isZero())))
        if (pool.gauge) actions.appendChild(button('claim', function () { return sendGauge(pool.gauge, gaugeAbi.encodeFunctionData('claimEmissions', [state.account, state.account]), 'Claim') }, !position.earned || position.earned.isZero()))
        if (position.claimOnly) actions.appendChild(button('exit', function () { return exitPosition(position) }))
        row.appendChild(actions); body.appendChild(row); return
      }
      if (position.kind === 'cl') {
        if (!position.staked) actions.appendChild(button('add', function () { return openPosition(position, 'increase') }))
        if (!position.staked) actions.appendChild(button('stake', function () { return stakeCl(position) }, !pool.gauge))
        if (position.staked) actions.appendChild(button('unstake', function () { return sendGauge(pool.gauge, gaugeAbi.encodeFunctionData('withdraw', [position.id]), 'Unstake') }))
        if (!position.staked) actions.appendChild(button('remove', function () { return openPosition(position, 'decrease') }, position.liquidity.isZero()))
        if (!position.staked) actions.appendChild(button('collect', function () { return collectCl(position) }))
      } else {
        actions.appendChild(button('stake', function () { return openV2Stake(position) }, !pool.gauge || !position.wallet || position.wallet.isZero()))
        actions.appendChild(button('unstake', function () { return sendGauge(pool.gauge, gaugeAbi.encodeFunctionData('withdraw', [position.staked]), 'Unstake') }, !position.staked || position.staked.isZero()))
        actions.appendChild(button('claim fees', function () { return sendTx(pool.address, v2Pool.encodeFunctionData('claimFees', [state.account]), 'Claim fees') }, (!position.fees0 || position.fees0.isZero()) && (!position.fees1 || position.fees1.isZero())))
      }
      if (pool.gauge) actions.appendChild(button('claim', function () { return sendGauge(pool.gauge, gaugeAbi.encodeFunctionData('claimEmissions', [state.account, state.account]), 'Claim') }, !position.earned || position.earned.isZero()))
      actions.appendChild(button('exit', function () { return exitPosition(position) }))
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

  function requireWallet () { if (!state.account || !state.eip1193) throw new Error('Connect wallet.'); if (!correctChain()) throw new Error('Switch to ' + chain.name + '.') }
  function deadline () { return Math.floor(Date.now() / 1000) + 1200 }
  function parseAmount (value, info, label, allowZero) { if (!info || info.decimals == null) throw new Error(label + ' metadata unavailable.'); const text = String(value || '').trim() || (allowZero ? '0' : ''); try { const amount = ethers.utils.parseUnits(text, info.decimals); if (amount.lt(0) || (!allowZero && amount.isZero())) throw new Error(); return amount } catch (_) { throw new Error('Enter ' + label + '.') } }
  function trimDecimal (value, decimals) { if (!Number.isFinite(value) || value <= 0) return ''; return value.toFixed(Math.min(decimals, 8)).replace(/\.?0+$/, '') }
  function slippageBps (action) { const value = Number(action.slippage); if (!Number.isFinite(value) || value < 0 || value > 50) throw new Error('Enter slippage between 0 and 50.'); return Math.round(value * 100) }
  function applySlippage (amount, bps) { return amount.mul(10000 - bps).div(10000) }
  function dialogField (host, label, key, value, onInput) { const row = e('div', { className: 'aero-input' }); const input = e('input'); input.type = 'text'; input.inputMode = 'decimal'; input.autocomplete = 'off'; input.value = value || ''; input.dataset.key = key; input.addEventListener('input', function () { if (!state.action) return; state.action[key] = input.value; if (onInput) onInput(input.value); refreshApprovals() }); append(row, e('label', { text: label }), input); host.appendChild(row); return input }
  function dialogButtonRow (host, buttons) { const row = e('div', { className: 'aero-dialog-actions' }); buttons.forEach(item => row.appendChild(button(item[0], item[1], item[2]))); host.appendChild(row) }
  function showDialog () { const dialog = byId('aero-action-dialog'); if (dialog && !dialog.open) dialog.showModal() }
  function closeDialog () { const dialog = byId('aero-action-dialog'); if (dialog && dialog.open) dialog.close(); state.action = null; state.actionInfo = null }
  function setInput (key, value) { const node = document.querySelector('#aero-action-content input[data-key="' + key + '"]'); if (node) node.value = value }

  function rangeSqrt (action) { return [Math.pow(1.0001, Number(action.tickLower) / 2), Math.pow(1.0001, Number(action.tickUpper) / 2)] }
  function liquidityFor (pool, action, raw0, raw1) {
    const sp = sqrtPrice(pool); const [sa, sb] = rangeSqrt(action)
    if (!(sb > sa)) return NaN
    if (sp <= sa) return raw0 * sa * sb / (sb - sa)
    if (sp >= sb) return raw1 / (sb - sa)
    const l0 = raw0 > 0 ? raw0 * sp * sb / (sb - sp) : Infinity
    const l1 = raw1 > 0 ? raw1 / (sp - sa) : Infinity
    return Math.min(l0, l1)
  }
  function amountsFor (pool, action, liquidity) {
    const sp = sqrtPrice(pool); const [sa, sb] = rangeSqrt(action)
    if (sp <= sa) return [liquidity * (sb - sa) / (sa * sb), 0]
    if (sp >= sb) return [0, liquidity * (sb - sa)]
    return [liquidity * (sb - sp) / (sp * sb), liquidity * (sp - sa)]
  }
  function validRange (action) { const lowerTick = Number(action.tickLower); const upperTick = Number(action.tickUpper); const spacing = action.pool.tickSpacing; return Number.isInteger(lowerTick) && Number.isInteger(upperTick) && lowerTick < upperTick && lowerTick % spacing === 0 && upperTick % spacing === 0 && lowerTick >= -887272 && upperTick <= 887272 }
  function defaultRange (pool) {
    const spacing = pool.tickSpacing; const tick = Number(pool.slot0.tick != null ? pool.slot0.tick : pool.slot0[1])
    const half = spacing === 1 ? 50 : Math.max(spacing * 2, Math.round(500 / spacing) * spacing)
    const base = Math.floor(tick / spacing) * spacing
    return [base - half, base + half + spacing]
  }
  function pairCl (side) {
    const action = state.action; if (!action || !validRange(action)) return
    const pool = action.pool; const t0 = token(pool.token0); const t1 = token(pool.token1)
    const value = Number(side === 0 ? action.amount0 : action.amount1); if (!(value > 0)) return
    const sp = sqrtPrice(pool); const [sa, sb] = rangeSqrt(action)
    if (sp <= sa || sp >= sb) { if (side === 0 && sp >= sb) { action.amount0 = ''; setInput('amount0', '') } if (side === 1 && sp <= sa) { action.amount1 = ''; setInput('amount1', '') } return }
    if (side === 0) { const liquidity = value * (10 ** t0.decimals) * sp * sb / (sb - sp); action.amount1 = trimDecimal(liquidity * (sp - sa) / (10 ** t1.decimals), t1.decimals); setInput('amount1', action.amount1) }
    else { const liquidity = value * (10 ** t1.decimals) / (sp - sa); action.amount0 = trimDecimal(liquidity * (sb - sp) / (sp * sb) / (10 ** t0.decimals), t0.decimals); setInput('amount0', action.amount0) }
    renderPreview()
  }
  function positionManager (position) {
    const manager = (position && position.manager) || (position && position.pool && position.pool.manager)
    if (!manager) throw new Error('Position manager unavailable.')
    return manager
  }
  function writeManager (action) {
    const manager = (action.position && action.position.manager) || (action.pool && action.pool.manager)
    if (!manager) throw new Error('Position manager unavailable.')
    return manager
  }

  async function openAdd (pool) {
    requireWallet()
    if (pool.kind !== 'cl') throw new Error('This pool has no router for mint or burn.')
    if (!pool.manager) throw new Error('Position manager unavailable.')
    const range = defaultRange(pool)
    state.action = { kind: 'mint', pool, amount0: '', amount1: '', slippage: '0.5', tickLower: String(range[0]), tickUpper: String(range[1]) }
    state.actionInfo = null; renderAction(); showDialog(); await loadActionInfo()
  }
  async function openPosition (position, mode) {
    requireWallet()
    state.action = { kind: mode, pool: position.pool, position, amount0: '', amount1: '', slippage: '0.5', percent: '100', tickLower: String(position.tickLower), tickUpper: String(position.tickUpper) }
    state.actionInfo = null; renderAction(); showDialog(); await loadActionInfo()
  }
  async function openV2Stake (position) {
    requireWallet(); if (!position.pool.gauge) throw new Error('No gauge.')
    state.action = { kind: 'v2-stake', pool: position.pool, position, amount: formatAmount(position.wallet, 18), slippage: '0.5' }
    state.actionInfo = null; renderAction(); showDialog(); await loadActionInfo()
  }
  async function loadActionInfo () {
    if (!state.action || !state.account || !correctChain()) { state.actionInfo = null; renderAction(); return }
    const pool = state.action.pool
    const spender = pool.kind === 'cl' ? pool.manager : null
    if (!spender) { state.actionInfo = {}; renderAction(); return }
    const values = await batch([
      { target: pool.token0, iface: erc20, method: 'balanceOf', args: [state.account], fallback: null },
      { target: pool.token1, iface: erc20, method: 'balanceOf', args: [state.account], fallback: null },
      { target: pool.token0, iface: erc20, method: 'allowance', args: [state.account, spender], fallback: null },
      { target: pool.token1, iface: erc20, method: 'allowance', args: [state.account, spender], fallback: null }
    ])
    state.actionInfo = { balance0: values[0], balance1: values[1], allowance0: values[2], allowance1: values[3] }
    renderAction()
  }

  function renderPreview () { const node = byId('aero-preview'); if (!node || !state.action) return; try { node.textContent = planAction().preview } catch (error) { node.textContent = errText(error) } }
  function renderRangeText () {
    const node = byId('aero-range'); const action = state.action; if (!node || !action) return
    const pool = action.pool; const t0 = token(pool.token0); const t1 = token(pool.token1)
    node.textContent = validRange(action) ? 'RANGE : ' + formatNum(tickPrice(pool, Number(action.tickLower))) + ' — ' + formatNum(tickPrice(pool, Number(action.tickUpper))) + ' ' + t1.symbol + '/' + t0.symbol : 'Ticks must be multiples of ' + pool.tickSpacing + '.'
  }

  function planAction () {
    const action = state.action; const pool = action.pool; const t0 = token(pool.token0); const t1 = token(pool.token1); const bps = slippageBps(action)
    if (action.kind === 'decrease') {
      const pct = Number(action.percent); if (!(pct > 0 && pct <= 100)) throw new Error('Enter remove % between 0 and 100.')
      const liquidity = pct === 100 ? action.position.liquidity : action.position.liquidity.mul(Math.round(pct * 100)).div(10000)
      if (liquidity.isZero()) throw new Error('Nothing to remove.')
      const expected = amountsFor(pool, action, Number(liquidity.toString()))
      const expected0 = ethers.BigNumber.from(BigInt(Math.floor(expected[0] * 0.999999)).toString())
      const expected1 = ethers.BigNumber.from(BigInt(Math.floor(expected[1] * 0.999999)).toString())
      const min0 = applySlippage(expected0, bps); const min1 = applySlippage(expected1, bps)
      const calls = [managerAbi.encodeFunctionData('decreaseLiquidity', [[action.position.id, liquidity, min0, min1, deadline()]]), managerAbi.encodeFunctionData('collect', [[action.position.id, state.account, maxUint128, maxUint128]])]
      return { tx: { to: writeManager(action), data: managerAbi.encodeFunctionData('multicall', [calls]) }, min0, min1, preview: 'MIN : ' + formatAmount(min0, t0.decimals) + ' ' + t0.symbol + ' · ' + formatAmount(min1, t1.decimals) + ' ' + t1.symbol }
    }
    if (action.kind === 'v2-stake') {
      const amount = parseAmount(action.amount, { decimals: 18 }, 'LP amount', false)
      return { amount, preview: 'STAKE : ' + formatAmount(amount, 18) + ' LP' }
    }
    if (action.kind !== 'mint' && action.kind !== 'increase') throw new Error('Action unavailable.')
    if (!validRange(action)) throw new Error('Ticks must be multiples of ' + pool.tickSpacing + '.')
    const amount0 = parseAmount(action.amount0, t0, t0.symbol, true); const amount1 = parseAmount(action.amount1, t1, t1.symbol, true)
    if (amount0.isZero() && amount1.isZero()) throw new Error('Enter an amount.')
    const liquidity = liquidityFor(pool, action, Number(amount0.toString()), Number(amount1.toString()))
    if (!(liquidity > 0) || !Number.isFinite(liquidity)) throw new Error('Amounts do not fit this range.')
    const expected = amountsFor(pool, action, liquidity * 0.999999)
    const min0 = applySlippage(ethers.BigNumber.from(BigInt(Math.floor(Math.min(expected[0], Number(amount0.toString())))).toString()), bps)
    const min1 = applySlippage(ethers.BigNumber.from(BigInt(Math.floor(Math.min(expected[1], Number(amount1.toString())))).toString()), bps)
    const preview = 'MIN : ' + formatAmount(min0, t0.decimals) + ' ' + t0.symbol + ' · ' + formatAmount(min1, t1.decimals) + ' ' + t1.symbol
    const manager = writeManager(action)
    if (action.kind === 'increase') return { tx: { to: manager, data: managerAbi.encodeFunctionData('increaseLiquidity', [[action.position.id, amount0, amount1, min0, min1, deadline()]]) }, amount0, amount1, min0, min1, preview }
    return { tx: { to: manager, data: managerAbi.encodeFunctionData('mint', [[pool.token0, pool.token1, pool.tickSpacing, Number(action.tickLower), Number(action.tickUpper), amount0, amount1, min0, min1, state.account, deadline(), 0]]) }, amount0, amount1, min0, min1, preview }
  }

  function renderAction () {
    const host = byId('aero-action-content'); if (!host) return
    const action = state.action; if (!action) { host.textContent = ''; return }
    const active = document.activeElement && host.contains(document.activeElement) && document.activeElement.dataset ? document.activeElement.dataset.key : null
    host.textContent = ''
    const pool = action.pool; const t0 = token(pool.token0); const t1 = token(pool.token1)
    const title = action.kind === 'mint' ? 'Add · ' : action.kind === 'increase' ? 'Add #' + action.position.id + ' · ' : action.kind === 'decrease' ? 'Remove #' + action.position.id + ' · ' : action.kind === 'v2-stake' ? 'Stake · ' : 'Remove · '
    host.appendChild(e('h2', { id: 'aero-action-title', text: title + poolName(pool) + ' · ' + poolType(pool) }))
    if (pool.kind === 'cl') host.appendChild(e('p', { text: 'PRICE : ' + formatNum(poolSpot(pool)) + ' ' + t1.symbol + '/' + t0.symbol }))
    if (state.actionInfo && state.actionInfo.balance0) host.appendChild(e('p', { text: 'WALLET : ' + formatAmount(state.actionInfo.balance0, t0.decimals) + ' ' + t0.symbol + ' · ' + formatAmount(state.actionInfo.balance1 || 0, t1.decimals) + ' ' + t1.symbol }))
    if (action.kind === 'decrease') {
      dialogField(host, 'Remove %', 'percent', action.percent, renderPreview); dialogField(host, 'Slippage %', 'slippage', action.slippage, renderPreview)
      host.appendChild(e('p', { id: 'aero-preview' })); renderPreview(); dialogButtonRow(host, [['remove', submitAction]])
    } else if (action.kind === 'v2-stake') {
      dialogField(host, 'LP', 'amount', action.amount, renderPreview); host.appendChild(e('p', { id: 'aero-preview' })); renderPreview(); dialogButtonRow(host, [['stake', submitAction]])
    } else {
      if (action.kind === 'mint') { dialogField(host, 'Tick lower', 'tickLower', action.tickLower, function () { renderRangeText(); pairCl(0) }); dialogField(host, 'Tick upper', 'tickUpper', action.tickUpper, function () { renderRangeText(); pairCl(0) }); host.appendChild(e('p', { id: 'aero-range' })); renderRangeText() }
      else if (action.kind === 'increase') host.appendChild(e('p', { text: 'RANGE : ' + formatNum(tickPrice(pool, action.position.tickLower)) + ' — ' + formatNum(tickPrice(pool, action.position.tickUpper)) + ' ' + t1.symbol + '/' + t0.symbol }))
      dialogField(host, t0.symbol, 'amount0', action.amount0, function () { pairCl(0) }); dialogField(host, t1.symbol, 'amount1', action.amount1, function () { pairCl(1) }); dialogField(host, 'Slippage %', 'slippage', action.slippage, renderPreview)
      host.appendChild(e('p', { id: 'aero-preview' })); renderPreview()
      dialogButtonRow(host, [['approve ' + t0.symbol, function () { return approveToken(0) }, !approvalNeed(0)], ['approve ' + t1.symbol, function () { return approveToken(1) }, !approvalNeed(1)], ['add', submitAction]])
    }
    if (active) { const node = host.querySelector('input[data-key="' + active + '"]'); if (node) { node.focus(); try { node.setSelectionRange(node.value.length, node.value.length) } catch (_) {} } }
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
  async function sendTx (to, data, label) { requireWallet(); state.sending = true; render(); try { await send({ to, data }, label); setStatus(label + '.', 'success'); await refreshAfterAction() } finally { state.sending = false; render() } }
  async function sendGauge (gauge, data, label) { if (!gauge) throw new Error('No gauge.'); return sendTx(gauge, data, label) }

  function approvalNeed (side) {
    const action = state.action
    if (!action || action.pool.kind !== 'cl' || (action.kind !== 'mint' && action.kind !== 'increase')) return false
    const pool = action.pool
    const info = token(side === 0 ? pool.token0 : pool.token1)
    const allowance = state.actionInfo && (side === 0 ? state.actionInfo.allowance0 : state.actionInfo.allowance1)
    try {
      const amount = parseAmount(side === 0 ? action.amount0 : action.amount1, info, info.symbol, true)
      return amount.gt(0) && (!allowance || allowance.lt(amount))
    } catch (_) { return false }
  }
  function refreshApprovals () {
    const row = document.querySelector('#aero-action-content .aero-dialog-actions')
    if (!row || !state.action || state.action.pool.kind !== 'cl') return
    const pool = state.action.pool
    const labels = ['[ approve ' + token(pool.token0).symbol + ' ]', '[ approve ' + token(pool.token1).symbol + ' ]']
    row.querySelectorAll('button').forEach(function (node) {
      const index = labels.indexOf(node.textContent || '')
      if (index >= 0) node.disabled = Boolean(state.sending) || !approvalNeed(index)
    })
  }

  async function approveToken (side) {
    requireWallet(); const plan = planAction(); const pool = state.action.pool
    if (pool.kind !== 'cl' || !pool.manager) throw new Error('Approval unavailable.')
    const tokenAddress = side === 0 ? pool.token0 : pool.token1
    const amount = side === 0 ? plan.amount0 : plan.amount1
    state.sending = true; renderAction()
    try { await send({ to: tokenAddress, data: erc20.encodeFunctionData('approve', [pool.manager, amount]) }, 'Approve ' + token(tokenAddress).symbol); setStatus('Approved ' + token(tokenAddress).symbol + '.', 'success'); await loadActionInfo() } finally { state.sending = false; renderAction() }
  }

  async function submitAction () {
    requireWallet(); const plan = planAction(); const action = state.action
    if (plan.min0 && plan.min1 && plan.min0.isZero() && plan.min1.isZero() && !window.confirm('Minimum is zero. Continue?')) return
    state.sending = true; renderAction()
    try {
      if (action.kind === 'v2-stake') {
        const allowance = (await batch([{ target: action.pool.address, iface: erc20, method: 'allowance', args: [state.account, action.pool.gauge], fallback: ethers.constants.Zero }]))[0] || ethers.constants.Zero
        if (allowance.lt(plan.amount)) await send({ to: action.pool.address, data: erc20.encodeFunctionData('approve', [action.pool.gauge, plan.amount]) }, 'Approve LP')
        await send({ to: action.pool.gauge, data: gaugeAbi.encodeFunctionData('deposit', [plan.amount]) }, 'Stake')
      } else await send(plan.tx, action.kind === 'decrease' ? 'Remove' : 'Add')
      closeDialog(); setStatus(action.kind === 'decrease' ? 'Removed.' : action.kind === 'v2-stake' ? 'Staked.' : 'Added.', 'success'); await refreshAfterAction()
    } finally { state.sending = false; render() }
  }

  async function collectCl (position) {
    return sendTx(positionManager(position), managerAbi.encodeFunctionData('collect', [[position.id, state.account, maxUint128, maxUint128]]), 'Collect')
  }
  async function stakeCl (position) {
    requireWallet(); if (!position.pool.gauge) throw new Error('No gauge.')
    const manager = positionManager(position)
    const approved = asAddress((await batch([{ target: manager, iface: managerAbi, method: 'getApproved', args: [position.id], fallback: null }]))[0])
    state.sending = true; render()
    try {
      if (!approved || lower(approved) !== lower(position.pool.gauge)) await send({ to: manager, data: managerAbi.encodeFunctionData('approve', [position.pool.gauge, position.id]) }, 'Approve NFT')
      await send({ to: position.pool.gauge, data: gaugeAbi.encodeFunctionData('deposit', [position.id]) }, 'Stake')
      setStatus('Staked.', 'success'); await refreshAfterAction()
    } finally { state.sending = false; render() }
  }

  /* Sickle-held positions: the wallet calls the Sickle strategies, which act through the user's Sickle. */
  function sickleNft (position) { return { farm: { stakingContract: position.pool.gauge, poolIndex: 0 }, nft: position.manager, tokenId: position.id } }
  function sickleRewards () { if (!state.rewardToken) throw new Error('Reward token unknown.'); return [state.rewardToken] }
  function sickleNftHarvest () { return { rewardTokens: sickleRewards(), amount0Max: maxUint128, amount1Max: maxUint128, extraData: '0x' } }
  async function sickleClaim (position) {
    const rewards = sickleRewards()
    if (position.kind === 'cl') return sendTx(sickleChain.nftStrategy, nftStrategyAbi.encodeFunctionData('simpleHarvest', [sickleNft(position), sickleNftHarvest()]), 'Claim')
    return sendTx(sickleChain.strategy, farmStrategyAbi.encodeFunctionData('simpleHarvest', [{ stakingContract: position.pool.gauge, poolIndex: 0 }, { rewardTokens: rewards, extraData: '0x' }]), 'Claim')
  }
  async function sickleWithdrawNft (position) {
    if (!window.confirm('Claim rewards and move NFT #' + position.id + ' from the Sickle to your wallet?')) return
    return sendTx(sickleChain.nftStrategy, nftStrategyAbi.encodeFunctionData('simpleExit', [sickleNft(position), sickleNftHarvest(), '0x']), 'Withdraw NFT')
  }
  async function sickleUnstakeV2 (position) {
    const farm = { stakingContract: position.pool.gauge, poolIndex: 0 }
    const rewards = sickleRewards()
    return sendTx(sickleChain.strategy, farmStrategyAbi.encodeFunctionData('simpleExit', [farm, { rewardTokens: rewards, extraData: '0x' }, { lpToken: position.pool.address, amountOut: position.staked, extraData: '0x' }]), 'Unstake')
  }
  async function sickleExit (position) {
    const pool = position.pool; const t0 = token(pool.token0); const t1 = token(pool.token1)
    const [current, slot0] = await batch([{ target: position.manager, iface: managerAbi, method: 'positions', args: [position.id], fallback: null, whole: true }, { target: pool.address, iface: clPool, method: 'slot0', fallback: null, whole: true }])
    const liquidity = current && current.liquidity ? current.liquidity : position.liquidity
    if (!liquidity || liquidity.isZero()) throw new Error('Nothing to remove.')
    if (slot0) pool.slot0 = slot0
    const expected = amountsFor(pool, position, Number(liquidity.toString()))
    const bps = 50
    const min0 = applySlippage(ethers.BigNumber.from(BigInt(Math.floor(expected[0] * 0.999999)).toString()), bps)
    const min1 = applySlippage(ethers.BigNumber.from(BigInt(Math.floor(expected[1] * 0.999999)).toString()), bps)
    if (!window.confirm('Exit NFT #' + position.id + ' to ' + t0.symbol + ' + ' + t1.symbol + ' in your wallet?\nMIN : ' + formatAmount(min0, t0.decimals) + ' ' + t0.symbol + ' · ' + formatAmount(min1, t1.decimals) + ' ' + t1.symbol + ' (0.5% slippage)')) return
    const rewards = sickleRewards()
    const harvest = { harvest: sickleNftHarvest(), swaps: [], outputTokens: rewards, sweepTokens: rewards }
    const withdraw = { zap: { removeLiquidityParams: { nft: position.manager, tokenId: position.id, liquidity, amount0Min: min0, amount1Min: min1, amount0Max: maxUint128, amount1Max: maxUint128, extraData: '0x' }, swaps: [] }, tokensOut: [], extraData: '0x' }
    return sendTx(sickleChain.nftStrategy, nftStrategyAbi.encodeFunctionData('exit', [sickleNft(position), harvest, withdraw, [pool.token0, pool.token1]]), 'Exit')
  }

  async function exitPosition (position) {
    requireWallet(); const pool = position.pool
    state.sending = true; render()
    try {
      if (position.kind === 'cl' && position.staked) await send({ to: pool.gauge, data: gaugeAbi.encodeFunctionData('withdraw', [position.id]) }, 'Unstake')
      if (position.kind === 'v2' && position.staked && !position.staked.isZero()) await send({ to: pool.gauge, data: gaugeAbi.encodeFunctionData('withdraw', [position.staked]) }, 'Unstake')
      if (pool.gauge) {
        const earnedNow = (await batch([{ target: pool.gauge, iface: gaugeAbi, method: 'earned', args: [state.account], fallback: ethers.constants.Zero }]))[0] || ethers.constants.Zero
        if (!earnedNow.isZero()) await send({ to: pool.gauge, data: gaugeAbi.encodeFunctionData('claimEmissions', [state.account, state.account]) }, 'Claim')
      }
      if (position.deferred) { setStatus('Claimed.', 'success'); await refreshAfterAction(); return }
      if (position.kind === 'cl') {
        const manager = positionManager(position)
        const current = position.staked ? (await batch([{ target: manager, iface: managerAbi, method: 'positions', args: [position.id], fallback: null, whole: true }]))[0] : position
        const liquidity = current && current.liquidity ? current.liquidity : position.liquidity
        if (liquidity && !liquidity.isZero()) {
          state.action = { kind: 'decrease', pool, position: { id: position.id, manager, liquidity, tickLower: position.tickLower, tickUpper: position.tickUpper }, percent: '100', slippage: '0.5', tickLower: String(position.tickLower), tickUpper: String(position.tickUpper) }
          const plan = planAction()
          if (plan.min0.isZero() && plan.min1.isZero() && !window.confirm('Minimum is zero. Continue?')) return
          await send(plan.tx, 'Remove')
        } else await send({ to: manager, data: managerAbi.encodeFunctionData('collect', [[position.id, state.account, maxUint128, maxUint128]]) }, 'Collect')
        await send({ to: manager, data: managerAbi.encodeFunctionData('burn', [position.id]) }, 'Burn')
        setStatus('Exited.', 'success')
      } else {
        const fees = (await batch([{ target: pool.address, iface: v2Pool, method: 'pendingFees', args: [state.account], fallback: null, whole: true }]))[0]
        if (fees && (fees[0].gt(0) || fees[1].gt(0))) await send({ to: pool.address, data: v2Pool.encodeFunctionData('claimFees', [state.account]) }, 'Claim fees')
        const wallet = (await batch([{ target: pool.address, iface: erc20, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero }]))[0] || ethers.constants.Zero
        setStatus(wallet.isZero() ? (position.claimOnly ? 'Claimed.' : 'Exited.') : 'LP remains in the wallet.', 'success')
      }
      await refreshAfterAction()
    } finally { state.action = null; state.sending = false; render() }
  }

  async function loadPositions () {
    if (!state.account || !correctChain() || !state.ready) { state.positions = []; renderPositions(); return }
    const account = state.account; state.positionsLoading = true; state.positionsFailed = false; renderPositions()
    try {
      const own = await readPositions(account)
      const sickle = sickleChain ? asAddress((await batch([{ target: sickleChain.factory, iface: sickleFactoryAbi, method: 'sickles', args: [account], fallback: null }]))[0]) : null
      const held = sickle ? await readPositions(sickle) : { positions: [], nftShown: 0, nftTotal: 0 }
      held.positions.forEach(position => { position.sickle = sickle })
      const nftTotal = own.nftTotal + held.nftTotal; const nftShown = own.nftShown + held.nftShown
      if (state.account === account) { state.positions = own.positions.concat(held.positions); state.nftNote = nftTotal > nftShown ? 'CL NFTs : ' + nftShown + ' of ' + nftTotal : '' }
    } catch (error) { console.error(error); if (state.account === account) { state.positions = []; state.nftNote = ''; state.positionsFailed = true } } finally { state.positionsLoading = false; renderPositions() }
  }

  async function readPositions (owner) {
    const positions = []
    const v2 = state.pools.filter(pool => pool.ready && pool.kind === 'v2')
    if (v2.length) {
      const calls = []
      v2.forEach(pool => calls.push({ target: pool.address, iface: erc20, method: 'balanceOf', args: [owner], fallback: ethers.constants.Zero }, { target: pool.gauge || pool.address, iface: pool.gauge ? gaugeAbi : erc20, method: 'balanceOf', args: [owner], fallback: ethers.constants.Zero }))
      const rows = await batch(calls)
      const held = []
      const idle = []
      v2.forEach(function (pool, index) {
        const walletLp = rows[index * 2] || ethers.constants.Zero
        const staked = pool.gauge ? (rows[index * 2 + 1] || ethers.constants.Zero) : ethers.constants.Zero
        if (walletLp.isZero() && staked.isZero()) idle.push(pool)
        else held.push({ pool, wallet: walletLp, staked })
      })
      if (held.length) {
        const extra = await batch([].concat(...held.map(item => [{ target: item.pool.address, iface: v2Pool, method: 'pendingFees', args: [owner], fallback: null, whole: true }, { target: item.pool.gauge || item.pool.address, iface: gaugeAbi, method: 'earned', args: [owner], fallback: ethers.constants.Zero }])))
        held.forEach(function (item, index) {
          const fees = extra[index * 2]; const earned = item.pool.gauge ? extra[index * 2 + 1] : ethers.constants.Zero
          positions.push({ kind: 'v2', pool: item.pool, wallet: item.wallet, staked: item.staked, fees0: fees ? fees[0] : ethers.constants.Zero, fees1: fees ? fees[1] : ethers.constants.Zero, earned: earned || ethers.constants.Zero })
        })
      }
      if (idle.length) {
        const calls = []
        idle.forEach(function (pool) {
          calls.push({ target: pool.address, iface: v2Pool, method: 'pendingFees', args: [owner], fallback: null, whole: true })
          if (pool.gauge) calls.push({ target: pool.gauge, iface: gaugeAbi, method: 'earned', args: [owner], fallback: null })
        })
        const extra = await batch(calls)
        let cursor = 0
        idle.forEach(function (pool) {
          const fees = extra[cursor++]
          const earned = pool.gauge ? extra[cursor++] : null
          const fees0 = fees && fees[0] ? fees[0] : ethers.constants.Zero
          const fees1 = fees && fees[1] ? fees[1] : ethers.constants.Zero
          const earnedValue = earned && earned.gt ? earned : ethers.constants.Zero
          if ((!fees || (fees0.isZero() && fees1.isZero())) && earnedValue.isZero()) return
          positions.push({ kind: 'v2', claimOnly: true, pool, wallet: ethers.constants.Zero, staked: ethers.constants.Zero, fees0: fees ? fees0 : ethers.constants.Zero, fees1: fees ? fees1 : ethers.constants.Zero, earned: earnedValue })
        })
      }
    }
    const managers = [...new Set(state.pools.filter(pool => pool.kind === 'cl' && pool.manager).map(pool => lower(pool.manager)))]
    let nftShown = 0
    let nftTotal = 0
    for (const manager of managers) {
      const total = Number((await batch([{ target: manager, iface: managerAbi, method: 'balanceOf', args: [owner], fallback: ethers.constants.Zero }]))[0] || 0)
      const count = Math.min(total, 120)
      nftTotal += total
      nftShown += count
      if (!count) continue
      const ids = (await batch(Array.from({ length: count }, (_, index) => ({ target: manager, iface: managerAbi, method: 'tokenOfOwnerByIndex', args: [owner, index], fallback: null })))).filter(id => id != null)
      const values = await batch(ids.map(id => ({ target: manager, iface: managerAbi, method: 'positions', args: [id], fallback: null, whole: true })))
      values.forEach(function (value, index) {
        if (!value) return
        const pool = state.pools.find(item => item.ready && item.kind === 'cl' && item.manager && lower(item.manager) === manager && lower(item.token0) === lower(value.token0) && lower(item.token1) === lower(value.token1) && item.tickSpacing === Number(value.tickSpacing))
        if (!pool) return
        positions.push({ kind: 'cl', id: ids[index], pool, manager: pool.manager, staked: false, tickLower: Number(value.tickLower), tickUpper: Number(value.tickUpper), liquidity: value.liquidity, fees0: value.tokensOwed0, fees1: value.tokensOwed1, earned: ethers.constants.Zero })
      })
    }
    const clGauges = state.pools.filter(pool => pool.kind === 'cl' && pool.gauge)
    if (clGauges.length) {
      const staked = await batch(clGauges.map(pool => ({ target: pool.gauge, iface: gaugeAbi, method: 'stakedValues', args: [owner], fallback: [] })))
      const flat = []
      clGauges.forEach(function (pool, index) {
        const ids = staked[index]
        const count = ids && ids.length ? ids.length : 0
        for (let i = 0; i < count; i += 1) { try { flat.push({ pool, id: ethers.BigNumber.from(ids[i]) }) } catch (_) {} }
      })
      if (flat.length) {
        const values = await batch(flat.map(item => ({ target: item.pool.manager, iface: managerAbi, method: 'positions', args: [item.id], fallback: null, whole: true })))
        const earned = await batch(flat.map(item => ({ target: item.pool.gauge, iface: clRewards, method: 'earned', args: [owner, [item.id]], fallback: ethers.constants.Zero })))
        flat.forEach(function (item, index) {
          const value = values[index]; if (!value || !item.pool.manager) return
          positions.push({ kind: 'cl', id: item.id, pool: item.pool, manager: item.pool.manager, staked: true, tickLower: Number(value.tickLower), tickUpper: Number(value.tickUpper), liquidity: value.liquidity, fees0: value.tokensOwed0, fees1: value.tokensOwed1, earned: earned[index] || ethers.constants.Zero })
        })
      }
    }
    const earnedGauges = new Set(positions.filter(position => position.kind === 'cl' && position.staked).map(position => lower(position.pool.gauge)))
    const idleGauges = clGauges.filter(pool => !earnedGauges.has(lower(pool.gauge)))
    if (idleGauges.length) {
      const earned = await batch(idleGauges.map(pool => ({ target: pool.gauge, iface: gaugeAbi, method: 'earned', args: [owner], fallback: ethers.constants.Zero })))
      idleGauges.forEach(function (pool, index) {
        const value = earned[index] || ethers.constants.Zero
        if (!value || value.isZero()) return
        positions.push({ kind: 'cl', id: null, pool, staked: false, deferred: true, tickLower: 0, tickUpper: 0, liquidity: ethers.constants.Zero, fees0: ethers.constants.Zero, fees1: ethers.constants.Zero, earned: value })
      })
    }
    const owned = positions.filter(position => position.kind === 'cl' && !position.staked && !position.deferred)
    if (owned.length) {
      for (let start = 0; start < owned.length; start += 20) {
        const group = owned.slice(start, start + 20)
        const results = await rpcBatch(group.map(position => ({ method: 'eth_call', params: [{ from: owner, to: position.manager, data: managerAbi.encodeFunctionData('collect', [[position.id, owner, maxUint128, maxUint128]]) }, 'latest'] }))).catch(() => [])
        results.forEach(function (result, offset) { if (!result || !result.result) return; try { const decoded = managerAbi.decodeFunctionResult('collect', result.result); group[offset].fees0 = decoded[0]; group[offset].fees1 = decoded[1] } catch (_) {} })
      }
    }
    return { positions, nftShown, nftTotal }
  }

  async function refreshAfterAction () { await hydratePools(); compute(); if (state.account && correctChain()) await loadPositions(); render() }

  function bindProvider (provider) {
    if (!provider || state.boundProvider === provider || !provider.on) return
    state.boundProvider = provider
    provider.on('accountsChanged', function (accounts) { adopt(provider, accounts || [], state.walletChain).catch(error => setStatus(errText(error), 'error')) })
    provider.on('chainChanged', function (chainId) { adopt(provider, state.account ? [state.account] : [], chainId).catch(error => setStatus(errText(error), 'error')) })
  }
  async function adopt (provider, accounts, chainId) {
    state.eip1193 = provider
    state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
    state.walletChain = chainId ? ethers.utils.hexValue(ethers.BigNumber.from(chainId)) : null
    bindProvider(provider)
    if (!state.account) { state.positions = []; closeDialog() }
    render()
    if (state.ready && state.account && correctChain()) await loadPositions()
  }
  async function restoreInjected () {
    const provider = injected(); if (!provider) return
    const accounts = await provider.request({ method: 'eth_accounts' }); if (!accounts || !accounts[0]) return
    await adopt(provider, accounts, await provider.request({ method: 'eth_chainId' }))
  }
  async function connectInjected () {
    const provider = injected(); if (!provider) return connectOther()
    const accounts = await provider.request({ method: 'eth_requestAccounts' })
    await adopt(provider, accounts, await provider.request({ method: 'eth_chainId' }))
    if (!correctChain()) setStatus('Switch to ' + chain.name + '.', 'error')
  }
  async function connectOther () {
    const reown = await import('./config.js')
    if (!reown.REOWN_PROJECT_ID) throw new Error('Other wallet unavailable.')
    const kit = reown.createAppKitInstance(); if (!kit) throw new Error('Other wallet unavailable.')
    const onAccount = async function (accountState) { if (!accountState || !accountState.isConnected) return; const provider = await kit.getWalletProvider(); await adopt(provider, await provider.request({ method: 'eth_accounts' }), await provider.request({ method: 'eth_chainId' })); if (state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null } }
    if (kit.getAddress && kit.getAddress()) return onAccount({ isConnected: true })
    if (!state.reownUnsubscribe && kit.subscribeAccount) state.reownUnsubscribe = kit.subscribeAccount(value => onAccount(value).catch(error => setStatus(errText(error), 'error')))
    await kit.open()
  }
  async function switchNetwork () {
    if (!state.eip1193) throw new Error('Connect wallet.')
    try { await state.eip1193.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] }) } catch (error) {
      if (error.code !== 4902 && !(error.data && error.data.originalError && error.data.originalError.code === 4902)) throw error
      await state.eip1193.request({ method: 'wallet_addEthereumChain', params: [{ chainId: chain.id, chainName: chain.name, nativeCurrency: chain.nativeCurrency, rpcUrls: [chain.addRpc], blockExplorerUrls: [chain.explorer] }] })
    }
    await adopt(state.eip1193, state.account ? [state.account] : [], await state.eip1193.request({ method: 'eth_chainId' }))
    setStatus('')
  }

  async function discover () {
    state.ready = false; state.feesReady = false; state.pools = []; setLoadingText('Reading Aero pools…')
    state.head = Number(await rpc('eth_blockNumber', []))
    const headBlock = await rpc('eth_getBlockByNumber', [ethers.utils.hexValue(state.head), false])
    state.headTime = Number(headBlock.timestamp)
    const gaugeFactories = await enumerateFactories()
    await listPools()
    await linkGauges(gaugeFactories)
    setLoadingText('Reading Aero pools… ' + state.pools.length)
    await hydratePools()
    compute(); state.ready = true; render()
  }

  async function refresh () {
    loading(true); setStatus('')
    try { await discover(); await loadFees(); if (state.account && correctChain()) await loadPositions() } finally { loading(false); render() }
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
    if (!chain) return
    bindUi(); loading(true)
    const passive = restoreInjected().catch(error => setStatus(errText(error), 'error'))
    await discover()
    await passive
    loading(false)
    const fees = loadFees()
    if (state.account && correctChain()) await loadPositions()
    await fees
    render()
  }
  function fatal (error) { console.error(error); loading(false); setStatus(errText(error), 'error'); render() }
  return { start, fatal }
})()
