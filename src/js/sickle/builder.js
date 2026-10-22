/**
 * Local Sickle calldata builder
 *
 * Builds the same ContractCallData the SDK gets from quote.vfat.io
 * ({ chainId, address, abi, functionName, args, value }), from on-chain reads only.
 * Ported from vfat-api core NftFarmStrategyV5 (simpleExit / exit / simpleHarvest).
 *
 * Covers the Uniswap V3 family: an unstaked NFT held by the Sickle, where the farm is the NFT
 * manager itself (UniswapV3Connector, poolIndex 0). Swaps are routed by an aggregator through
 * our proxy (swap.js), as the quote API's FarmRouteWorkflows plan them.
 */

import { createPublicClient, custom, encodeFunctionData, zeroAddress } from 'viem'
import { NFT_FARM_STRATEGY_ABI, NFT_SETTINGS_REGISTRY_ABI } from './nft-farm-strategy-abi.js'
import { getSickleChain } from './chains.js'
import { NATIVE_TOKEN, DEFAULT_SLIPPAGE_BPS, canSwapLocally, quoteSwap, swapParams } from './swap.js'

const MAX_UINT128 = (1n << 128n) - 1n

// The quote API skips swapping harvest claims worth less than this (MIN_HARVEST_SWAP_VALUE_USD).
const MIN_HARVEST_SWAP_VALUE_USD = 0.1

// Swap inputs are taken 0.1% below the position's amounts, so the swaps can't overspend.
const WITHDRAW_MARGIN_PER_MILLE = 999n

// Fee the strategy charges on harvested fees that are compounded or swept (harvestFee 0.9%), in 1/10000.
const HARVEST_FEE_BP = 90n

// Rebalance fee on the withdrawn liquidity, by the pool's fee tier (rebalanceFee: 0.01% / 0.03% / 0.05%), in 1/10000.
const rebalanceFeeBp = fee => fee <= 500 ? 1n : fee <= 3000 ? 3n : 5n

// Dust the liquidity add may leave unspent, in percent of the added value (the quote API's addSlippage default).
const DEFAULT_ADD_SLIPPAGE_PCT = 10

// A zap-in swap worth less than this share of the inputs (1/10000) is skipped, as long as the add stays two-sided.
const MIN_ZAP_SWAP_SHARE_BP = 1n

// The zap-in sizes its swap from the pool price, then re-sizes it from the quoted rate until it changes less than this.
const ZAP_SWAP_TOLERANCE_BP = 10n
const MAX_ZAP_QUOTES = 4

// A zap-in swap that moves the pool's price by more than this (1/10000) is sized against the moved price.
const POOL_IMPACT_THRESHOLD_BP = 1n
const POOL_IMPACT_BISECTIONS = 12
const MAX_IMPACT_QUOTES = 3
const ZAP_IMPACT_TOLERANCE_PER_MILLE = 5n

const Q192 = 1n << 192n

// When an exit's swaps fail, the quote API retries with smaller swap inputs (protectedNftWithdrawalQuote).
const SWAP_INPUT_RETRY_SCALES_BPS = [9700, 9500, 9000]
const ONE_TICK_SWAP_INPUT_SCALE_BPS = 9000

/**
 * NFT managers whose Sickle-held positions use the Uniswap V3 farm connector, per chain.
 * Only list a manager after comparing the builder's output with quote.vfat.io for it.
 */
const UNIV3_NFT_MANAGERS = {
  42161: ['0xc36442b4a4522e871399cd717abdd847ab11fe88'], // Uniswap V3
}

/**
 * Uniswap QuoterV2 per chain: it prices a swap against the position's pool, so a zap-in into a thin pool can
 * account for the price its own swap moves.
 */
const UNIV3_QUOTERS = {
  42161: '0x61ffe014ba17989e743c5f6cb21bf9697530b21e',
}

const QUOTER_ABI = [{
  name: 'quoteExactInputSingle',
  type: 'function',
  stateMutability: 'nonpayable',
  inputs: [{
    name: 'params',
    type: 'tuple',
    components: [
      { name: 'tokenIn', type: 'address' },
      { name: 'tokenOut', type: 'address' },
      { name: 'amountIn', type: 'uint256' },
      { name: 'fee', type: 'uint24' },
      { name: 'sqrtPriceLimitX96', type: 'uint160' },
    ],
  }],
  outputs: [
    { name: 'amountOut', type: 'uint256' },
    { name: 'sqrtPriceX96After', type: 'uint160' },
    { name: 'initializedTicksCrossed', type: 'uint32' },
    { name: 'gasEstimate', type: 'uint256' },
  ],
}]

const NFT_MANAGER_ABI = [{
  name: 'positions',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'tokenId', type: 'uint256' }],
  outputs: [
    { name: 'nonce', type: 'uint96' },
    { name: 'operator', type: 'address' },
    { name: 'token0', type: 'address' },
    { name: 'token1', type: 'address' },
    { name: 'fee', type: 'uint24' },
    { name: 'tickLower', type: 'int24' },
    { name: 'tickUpper', type: 'int24' },
    { name: 'liquidity', type: 'uint128' },
    { name: 'feeGrowthInside0LastX128', type: 'uint256' },
    { name: 'feeGrowthInside1LastX128', type: 'uint256' },
    { name: 'tokensOwed0', type: 'uint128' },
    { name: 'tokensOwed1', type: 'uint128' },
  ],
}, {
  name: 'ownerOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'tokenId', type: 'uint256' }],
  outputs: [{ name: '', type: 'address' }],
}, {
  name: 'collect',
  type: 'function',
  stateMutability: 'payable',
  inputs: [{
    name: 'params',
    type: 'tuple',
    components: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'recipient', type: 'address' },
      { name: 'amount0Max', type: 'uint128' },
      { name: 'amount1Max', type: 'uint128' },
    ],
  }],
  outputs: [{ name: 'amount0', type: 'uint256' }, { name: 'amount1', type: 'uint256' }],
}]

const UNIV3_POOL_ABI = [{
  name: 'tickSpacing',
  type: 'function',
  stateMutability: 'view',
  inputs: [],
  outputs: [{ name: '', type: 'int24' }],
}, {
  name: 'slot0',
  type: 'function',
  stateMutability: 'view',
  inputs: [],
  outputs: [
    { name: 'sqrtPriceX96', type: 'uint160' },
    { name: 'tick', type: 'int24' },
    { name: 'observationIndex', type: 'uint16' },
    { name: 'observationCardinality', type: 'uint16' },
    { name: 'observationCardinalityNext', type: 'uint16' },
    { name: 'feeProtocol', type: 'uint8' },
    { name: 'unlocked', type: 'bool' },
  ],
}]

const SICKLE_APPROVED_ABI = [{
  name: 'approved',
  type: 'function',
  stateMutability: 'view',
  inputs: [],
  outputs: [{ name: '', type: 'address' }],
}]

/**
 * Whether the no-swap actions for this position can be built locally.
 * @param {number} chainId - Chain ID
 * @param {Object} poolData - Pool information (stakingAddress, poolAddress, nftManagerAddress, pid)
 * @returns {boolean}
 */
export function canBuildLocally(chainId, poolData) {
  const manager = poolData?.nftManagerAddress?.toLowerCase()
  if (!getSickleChain(chainId) || !(UNIV3_NFT_MANAGERS[chainId] || []).includes(manager)) return false
  // Unstaked NFTs: pages pass the pool as the staking address. Gauges and MasterChefs are other families.
  return poolData.stakingAddress?.toLowerCase() === poolData.poolAddress?.toLowerCase()
    && (poolData.pid === undefined || poolData.pid === null)
}

/**
 * Withdraw the NFT to the wallet, collecting its fees: NftFarmStrategy.simpleExit
 * @param {Object} params - { chainId, poolData, nftId, provider } (provider: EIP-1193)
 * @returns {Promise<Object>} ContractCallData
 */
export async function buildWithdrawNft({ chainId, poolData, nftId, provider }) {
  const ctx = await loadPosition(chainId, poolData, nftId, provider)
  return callData(ctx, 'simpleExit', [nftPosition(ctx), simpleHarvest(ctx), '0x'])
}

/**
 * Remove all liquidity and send both tokens plus fees to the wallet: NftFarmStrategy.exit
 * @param {Object} params - { chainId, poolData, nftId, provider } (provider: EIP-1193)
 * @returns {Promise<Object>} ContractCallData
 */
export async function buildExitToUnderlying({ chainId, poolData, nftId, provider }) {
  const ctx = await loadPosition(chainId, poolData, nftId, provider)
  if (ctx.liquidity === 0n) throw new Error(`NFT #${nftId} has no liquidity to exit. Use Withdraw NFT instead.`)

  // As in the quote API, the harvest outputs are the tokens with uncollected fees. The strategy
  // charges its harvest fee on outputTokens, then sweeps them.
  const fees = await uncollectedFees(ctx)
  const feeTokens = transferable(ctx, ctx.tokens.filter((_, i) => fees[i] > 0n))
  const harvestParams = {
    harvest: simpleHarvest(ctx),
    swaps: [],
    outputTokens: feeTokens,
    sweepTokens: feeTokens,
  }
  const withdrawParams = {
    zap: {
      removeLiquidityParams: {
        nft: ctx.nftManager,
        tokenId: ctx.tokenId,
        liquidity: ctx.liquidity,
        amount0Min: 0n,
        amount1Min: 0n,
        amount0Max: MAX_UINT128,
        amount1Max: MAX_UINT128,
        extraData: '0x',
      },
      swaps: [],
    },
    tokensOut: [],
    extraData: '0x',
  }
  return callData(ctx, 'exit', [nftPosition(ctx), harvestParams, withdrawParams, transferable(ctx, ctx.tokens)])
}

/**
 * Collect the fees as-is (no swap) to the wallet: NftFarmStrategy.simpleHarvest
 * @param {Object} params - { chainId, poolData, nftId, provider } (provider: EIP-1193)
 * @returns {Promise<Object>} ContractCallData
 */
export async function buildClaimToUnderlying({ chainId, poolData, nftId, provider }) {
  const ctx = await loadPosition(chainId, poolData, nftId, provider)
  const fees = await uncollectedFees(ctx)
  if (fees.every(f => f === 0n)) throw new Error(`NFT #${nftId} has no fees to claim.`)
  return callData(ctx, 'simpleHarvest', [nftPosition(ctx), simpleHarvest(ctx)])
}

/**
 * Whether the swap actions (exit/claim to a token) for this position can be built locally.
 * @param {number} chainId - Chain ID
 * @param {Object} poolData - Pool information (stakingAddress, poolAddress, nftManagerAddress, pid)
 * @returns {boolean}
 */
export function canSwapLocallyFor(chainId, poolData) {
  return canBuildLocally(chainId, poolData) && canSwapLocally(chainId)
}

/**
 * Collect the fees and swap them to one token (the native token by default): NftFarmStrategy.harvest
 * @param {Object} params - { chainId, poolData, nftId, provider (EIP-1193), tokenOut, slippageBps }
 * @returns {Promise<Object>} ContractCallData
 */
export async function buildHarvestToToken({ chainId, poolData, nftId, provider, tokenOut = NATIVE_TOKEN, slippageBps = DEFAULT_SLIPPAGE_BPS }) {
  const ctx = await loadPosition(chainId, poolData, nftId, provider)
  const fees = await uncollectedFees(ctx)
  if (fees.every(f => f === 0n)) throw new Error(`NFT #${nftId} has no fees to claim.`)

  const harvestParams = await planHarvest(ctx, fees, tokenOut.toLowerCase(), slippageBps)
  return callData(ctx, 'harvest', [nftPosition(ctx), harvestParams])
}

/**
 * Remove all liquidity, swap it and the fees to one token, and send it to the wallet: NftFarmStrategy.exit
 *
 * With `account` (the wallet), the call is simulated and, if it reverts, rebuilt with smaller swap
 * inputs, as the quote API does.
 * @param {Object} params - { chainId, poolData, nftId, provider (EIP-1193), tokenOut, slippageBps, account }
 * @returns {Promise<Object>} ContractCallData
 */
export async function buildExitToToken({ chainId, poolData, nftId, provider, tokenOut = NATIVE_TOKEN, slippageBps = DEFAULT_SLIPPAGE_BPS, account }) {
  const ctx = await loadPosition(chainId, poolData, nftId, provider)
  if (ctx.liquidity === 0n) throw new Error(`NFT #${nftId} has no liquidity to exit. Use Withdraw NFT instead.`)

  const out = tokenOut.toLowerCase()
  const fees = await uncollectedFees(ctx)
  const [harvestParams, sqrtPriceX96] = await Promise.all([
    planHarvest(ctx, fees, out, slippageBps),
    ctx.client.readContract({ address: ctx.pool, abi: UNIV3_POOL_ABI, functionName: 'slot0' }).then(s => s[0]),
  ])

  const build = async swapInputScaleBps => {
    const withdraw = await planWithdraw(ctx, sqrtPriceX96, out, slippageBps, swapInputScaleBps)
    const sweepTokens = transferable(ctx, [...withdraw.outTokens, ...ctx.tokens, ...fees.flatMap((f, i) => f > 0n ? [ctx.tokens[i]] : [])])
      .filter((t, _, all) => !(all.includes(NATIVE_TOKEN) && t === ctx.chain.wrappedNative))
    return { withdraw, data: callData(ctx, 'exit', [nftPosition(ctx), harvestParams, withdraw.params, sweepTokens]) }
  }

  if (ctx.tickUpper - ctx.tickLower === 1) return (await build(ONE_TICK_SWAP_INPUT_SCALE_BPS)).data

  const primary = await build()
  if (!account || primary.withdraw.params.zap.swaps.length === 0 || await succeeds(ctx, account, primary.data)) return primary.data

  for (const scale of SWAP_INPUT_RETRY_SCALES_BPS) {
    console.log(`Exit simulation failed; retrying with swap inputs at ${scale / 100}%`)
    const candidate = await build(scale)
    if (await succeeds(ctx, account, candidate.data)) return candidate.data
  }
  return primary.data
}

/**
 * Claim the fees and add them back to the position, swapping to its token ratio: NftFarmStrategy.compound
 * @param {Object} params - { chainId, poolData, nftId, provider (EIP-1193), slippageBps, addSlippagePct }
 * @returns {Promise<Object>} ContractCallData
 */
export async function buildCompound({ chainId, poolData, nftId, provider, slippageBps = DEFAULT_SLIPPAGE_BPS, addSlippagePct = DEFAULT_ADD_SLIPPAGE_PCT }) {
  const ctx = await loadPosition(chainId, poolData, nftId, provider)
  const fees = await uncollectedFees(ctx)
  if (fees.every(f => f === 0n)) throw new Error(`NFT #${nftId} has no fees to compound.`)

  // The harvest fee is charged on the claims; what is left is zapped back into the position's own range.
  const inputs = fees.map(f => f - f * HARVEST_FEE_BP / 10000n)
  const state = await poolState(ctx)
  const zap = await planZapIn(ctx, state, inputs, ctx.tickLower, ctx.tickUpper, slippageBps, addSlippagePct)

  const params = { harvest: simpleHarvest(ctx), zap: zapInParams(ctx, zap, ctx.tokenId, ctx.tickLower, ctx.tickUpper) }
  // The Uniswap V3 farm compounds in place (the position stays where it is); every pool token is swept.
  return callData(ctx, 'compound', [nftPosition(ctx), params, true, transferable(ctx, ctx.tokens)])
}

/**
 * Remove all liquidity, claim the fees and mint a new position around the current price: NftFarmStrategy.rebalance,
 * or .move when the new range has another width or the position's automation must follow it.
 *
 * The range is the pool tick (rounded down to the tick spacing) minus/plus the min/max percent margins, as the
 * quote API computes it (newNftPositionInfo): the upper tick sits one spacing above the current one.
 * @param {Object} params - { chainId, poolData, nftId, provider (EIP-1193), minPricePercentage, maxPricePercentage, slippageBps, addSlippagePct }
 * @returns {Promise<Object>} ContractCallData
 */
export async function buildRebalance({ chainId, poolData, nftId, provider, minPricePercentage, maxPricePercentage, slippageBps = DEFAULT_SLIPPAGE_BPS, addSlippagePct = DEFAULT_ADD_SLIPPAGE_PCT }) {
  const ctx = await loadPosition(chainId, poolData, nftId, provider)
  if (ctx.liquidity === 0n) throw new Error(`NFT #${nftId} has no liquidity to rebalance.`)

  const [fees, state] = await Promise.all([uncollectedFees(ctx), poolState(ctx)])
  const target = targetRange(state, minPricePercentage, maxPricePercentage)

  // Fees are claimed and sent to the wallet as-is (outstandingRewards 'harvest'); the liquidity is zapped in.
  const feeTokens = transferable(ctx, ctx.tokens.filter((_, i) => fees[i] > 0n))
  const harvestParams = { harvest: simpleHarvest(ctx), swaps: [], outputTokens: feeTokens, sweepTokens: feeTokens }

  // What the withdrawal returns (with the usual 0.1% margin for an in-range position), less the rebalance fee.
  const base = positionAmounts(state.sqrtPriceX96, ctx.tickLower, ctx.tickUpper, ctx.liquidity)
  const inRange = base[0] !== 0n && base[1] !== 0n
  const amounts = base.map(amount => inRange ? amount * WITHDRAW_MARGIN_PER_MILLE / 1000n : amount)
  const rebalanceFee = rebalanceFeeBp(ctx.fee)
  const withdrawOut = amounts.map(amount => amount - amount * rebalanceFee / 10000n)
  const withdraw = {
    zap: {
      removeLiquidityParams: {
        nft: ctx.nftManager,
        tokenId: ctx.tokenId,
        liquidity: ctx.liquidity,
        amount0Min: 0n,
        amount1Min: 0n,
        amount0Max: MAX_UINT128,
        amount1Max: MAX_UINT128,
        extraData: '0x',
      },
      swaps: [],
    },
    tokensOut: transferable(ctx, ctx.tokens),
    extraData: '0x',
  }

  const zap = await planZapIn(ctx, state, withdrawOut, target.tickLower, target.tickUpper, slippageBps, addSlippagePct)
  const increase = { tokensIn: [], amountsIn: [], zap: zapInParams(ctx, zap, 0n, target.tickLower, target.tickUpper), extraData: '0x' }
  const sweepTokens = transferable(ctx, ctx.tokens)

  const settings = await resolveRebalanceSettings(ctx, state, target)
  const common = { pool: ctx.pool, position: nftPosition(ctx), harvest: harvestParams, withdraw }
  if (!settings.useMove) return callData(ctx, 'rebalance', [{ ...common, increase }, sweepTokens])
  return callData(ctx, 'move', [{ ...common, deposit: { farm: nftPosition(ctx).farm, nft: ctx.nftManager, increase } }, settings.nftSettings, sweepTokens])
}

// NftHarvest for a claim to `out`: claims in `out`, non-transferrable or worth < $0.10 are kept
// as-is, the rest are swapped. Ported from the quote API's planHarvest / buildHarvestRoute.
async function planHarvest(ctx, fees, out, slippageBps) {
  const wrappedOut = wrapped(ctx, out)
  const sickle = await holder(ctx)
  const blocked = (ctx.chain.nonTransferrableTokens || []).map(t => t.toLowerCase())
  const claims = ctx.tokens.map((token, i) => ({ token, amount: fees[i] })).filter(c => c.amount > 0n)

  const planned = await Promise.all(claims.map(async claim => {
    if (sameToken(ctx, claim.token, wrappedOut) || blocked.includes(claim.token)) return { keep: claim }
    const route = await quoteSwap({ chainId: ctx.chainId, tokenIn: claim.token, tokenOut: wrappedOut, amountIn: claim.amount, sender: sickle, slippageBps })
    const tiny = route.amountInUsd > 0 && route.amountInUsd < MIN_HARVEST_SWAP_VALUE_USD
    return tiny ? { keep: claim } : { route }
  }))
  const routes = planned.filter(p => p.route).map(p => p.route)

  const outTokens = mergeTokens([...planned.filter(p => p.keep).map(p => p.keep), ...routes.map(r => ({ token: r.tokenOut, amount: r.amountOut }))])
    .filter(t => t.amount !== 0n)
    .map(t => t.token)
  const unwrap = out === NATIVE_TOKEN && outTokens.includes(wrappedOut)
  const outputTokens = outTokens.map(t => unwrap && t === wrappedOut ? NATIVE_TOKEN : t)

  return {
    harvest: simpleHarvest(ctx),
    swaps: routes.map(swapParams),
    // The quote API lists the native token first here (but not in sweepTokens).
    outputTokens: transferable(ctx, unwrap ? [NATIVE_TOKEN, ...outputTokens] : outputTokens),
    sweepTokens: transferable(ctx, [...outputTokens, ...claims.map(c => c.token)]),
  }
}

// NftWithdraw removing all liquidity and swapping both tokens to `out`. Ported from the quote API's
// planLiquidityRemoval / planOptimalWithdraw / buildWithdrawRoute.
async function planWithdraw(ctx, sqrtPriceX96, out, slippageBps, swapInputScaleBps) {
  const sickle = await holder(ctx)
  const wrappedOut = wrapped(ctx, out)
  const base = positionAmounts(sqrtPriceX96, ctx.tickLower, ctx.tickUpper, ctx.liquidity)
  const inRange = base[0] !== 0n && base[1] !== 0n
  const amounts = base.map(amount => {
    const scaled = swapInputScaleBps === undefined ? amount : amount * BigInt(swapInputScaleBps) / 10000n
    return swapInputScaleBps !== undefined || inRange ? scaled * WITHDRAW_MARGIN_PER_MILLE / 1000n : amount
  })

  const routes = (await Promise.all(ctx.tokens.map((token, i) =>
    sameToken(ctx, token, wrappedOut) || amounts[i] <= 0n
      ? null
      : quoteSwap({ chainId: ctx.chainId, tokenIn: token, tokenOut: wrappedOut, amountIn: amounts[i], sender: sickle, slippageBps }),
  ))).filter(Boolean)

  // What the withdrawal leaves: `out`, plus each pool token's unswapped remainder.
  const direct = ctx.tokens.reduce((sum, token, i) => sameToken(ctx, token, out) ? sum + base[i] : sum, 0n)
  const outAmounts = [
    { token: out, amount: direct + routes.reduce((sum, r) => sum + r.amountOut, 0n) },
    ...ctx.tokens.map((token, i) => ({ token, amount: sameToken(ctx, token, out) ? 0n : base[i] - amounts[i] })),
  ].filter(t => t.amount > 0n)
  const outTokens = outAmounts.map(t => t.token)

  return {
    outTokens,
    params: {
      zap: {
        removeLiquidityParams: {
          nft: ctx.nftManager,
          tokenId: ctx.tokenId,
          liquidity: ctx.liquidity,
          amount0Min: 0n,
          amount1Min: 0n,
          amount0Max: MAX_UINT128,
          amount1Max: MAX_UINT128,
          extraData: '0x',
        },
        swaps: routes.map(swapParams),
      },
      // As in the quote API, tokensOut (the fee basis) is only set when the withdrawal swaps.
      tokensOut: routes.length > 0 ? transferable(ctx, outTokens) : [],
      extraData: '0x',
    },
  }
}

// Pool price and tick spacing, the inputs of every range computation.
async function poolState(ctx) {
  const [slot0, tickSpacing] = await Promise.all([
    ctx.client.readContract({ address: ctx.pool, abi: UNIV3_POOL_ABI, functionName: 'slot0' }),
    ctx.client.readContract({ address: ctx.pool, abi: UNIV3_POOL_ABI, functionName: 'tickSpacing' }),
  ])
  return { sqrtPriceX96: slot0[0], tick: slot0[1], tickSpacing: Number(tickSpacing) }
}

// The range the quote API mints on a rebalance (FarmStrategy.newNftPositionInfo): the margins in percent
// (0.01% per tick of spacing 1) are rounded up to whole tick spacings around the current tick rounded
// down to the spacing, with the upper tick one extra spacing above it.
function targetRange(state, minPricePercentage, maxPricePercentage) {
  const { tick, tickSpacing } = state
  const priceDiffPerTick = 0.01 * tickSpacing
  const current = Math.floor(tick / tickSpacing) * tickSpacing
  const tickLower = current - ceilTickSpaces(minPricePercentage, priceDiffPerTick) * tickSpacing
  const tickUpper = current + tickSpacing + ceilTickSpaces(maxPricePercentage, priceDiffPerTick) * tickSpacing

  const usableMin = Math.ceil(MIN_TICK / tickSpacing) * tickSpacing
  const usableMax = Math.floor(MAX_TICK / tickSpacing) * tickSpacing
  if (tickLower < usableMin || tickUpper > usableMax) {
    throw new Error('Cannot build the requested NFT target range inside the pool tick bounds')
  }
  return { tickLower, tickUpper, current }
}

const MIN_TICK = -887272
const MAX_TICK = 887272

// Whole tick spacings covering a price margin, tolerating float noise (ceilTickSpaces).
function ceilTickSpaces(pricePercentage, priceDiffPerTick) {
  const tickSpaces = pricePercentage / priceDiffPerTick
  const nearest = Math.round(tickSpaces)
  return Math.abs(tickSpaces - nearest) <= 1e-9 ? nearest : Math.ceil(tickSpaces)
}

// Whether the rebalance can use NftFarmStrategy.rebalance, or needs .move, and the settings that go with it
// (resolveRebalanceSettings): the position's automation settings move with it, and a width change or
// a changed auto-rebalance shape can only be expressed by move.
async function resolveRebalanceSettings(ctx, state, target) {
  const nftSettings = cloneSettings(await readNftSettings(ctx))
  const { tickSpacing, tick } = state
  const width = (lower, upper) => (upper - lower) / tickSpacing - 1
  const current = Math.floor(tick / tickSpacing) * tickSpacing
  const newWidth = width(target.tickLower, target.tickUpper)

  const before = { below: nftSettings.rebalanceConfig.tickSpacesBelow, above: nftSettings.rebalanceConfig.tickSpacesAbove }
  if (nftSettings.autoRebalance) {
    let below = (current - target.tickLower) / tickSpacing
    let above = (target.tickUpper - (current + tickSpacing)) / tickSpacing
    if (below < 0 || above < 0) {
      below = Math.ceil(newWidth / 2)
      above = Math.floor(newWidth / 2)
    }
    nftSettings.rebalanceConfig.tickSpacesBelow = below
    nftSettings.rebalanceConfig.tickSpacesAbove = above
  }
  const sameShape = !nftSettings.autoRebalance
    || (before.below === nftSettings.rebalanceConfig.tickSpacesBelow && before.above === nftSettings.rebalanceConfig.tickSpacesAbove)
  return {
    nftSettings,
    useMove: width(ctx.tickLower, ctx.tickUpper) !== newWidth || !sameShape,
  }
}

function cloneSettings(settings) {
  return {
    ...settings,
    autoDeposit: settings.autoDeposit ?? false,
    rebalanceConfig: { ...settings.rebalanceConfig, rewardConfig: { ...settings.rebalanceConfig.rewardConfig } },
    rewardConfig: { ...settings.rewardConfig },
    exitConfig: { ...settings.exitConfig },
  }
}

// The position's automation settings. Like the quote API, they only exist while the Sickle has approved an
// automation strategy (any: older strategy versions are still approved on some Sickles); otherwise the defaults apply.
async function readNftSettings(ctx) {
  const { nftSettingsRegistry } = ctx.chain
  if (!nftSettingsRegistry) return DEFAULT_NFT_SETTINGS
  const sickle = await holder(ctx)
  const approved = await ctx.client.readContract({ address: sickle, abi: SICKLE_APPROVED_ABI, functionName: 'approved' })
  if (approved === zeroAddress) return DEFAULT_NFT_SETTINGS

  return ctx.client.readContract({
    address: nftSettingsRegistry,
    abi: NFT_SETTINGS_REGISTRY_ABI,
    functionName: 'getNftSettings',
    args: [{ sickle, nftManager: ctx.nftManager, tokenId: ctx.tokenId }],
  })
}

const DEFAULT_NFT_SETTINGS = {
  pool: zeroAddress,
  poolId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  autoRebalance: false,
  rebalanceConfig: {
    tickSpacesBelow: 0,
    tickSpacesAbove: 0,
    bufferTicksBelow: 0,
    bufferTicksAbove: 0,
    dustBP: 0n,
    priceImpactBP: 0n,
    slippageBP: 0n,
    cutoffTickLow: 0,
    cutoffTickHigh: 0,
    delayMin: 0,
    rewardConfig: { rewardBehavior: 0, harvestTokenOut: zeroAddress },
  },
  automateRewards: false,
  rewardConfig: { rewardBehavior: 0, harvestTokenOut: zeroAddress },
  autoExit: false,
  exitConfig: {
    triggerTickLow: 0,
    triggerTickHigh: 0,
    exitTokenOutLow: zeroAddress,
    exitTokenOutHigh: zeroAddress,
    priceImpactBP: 0n,
    slippageBP: 0n,
  },
  extraData: '0x',
  autoDeposit: false,
}

// NftZapIn: the zap-in's swaps, then a mint/increase at the Sickle's balances (amountDesired 0 = all of it).
function zapInParams(ctx, zap, tokenId, tickLower, tickUpper) {
  return {
    swaps: zap.routes.map(swapParams),
    addLiquidityParams: {
      nft: ctx.nftManager,
      tokenId,
      pool: { token0: ctx.tokens[0], token1: ctx.tokens[1], fee: ctx.fee },
      tickLower,
      tickUpper,
      amount0Desired: 0n,
      amount1Desired: 0n,
      amount0Min: zap.minAmounts[0],
      amount1Min: zap.minAmounts[1],
      extraData: '0x',
    },
  }
}

// Swap part of the two pool-token inputs so they match the token ratio of [tickLower, tickUpper] at the pool
// price, and size the add's minimums. The quote API gets this from vfat's own router (/v4/zap-in), which we
// can't use, so the ratio is solved here (pool-liquidity-math: univ3UnitAmountsRatio / splitAmountByRatio) and the
// swap is re-sized from the aggregator's real rate. The minimums follow RouterZapInRouteFinalizer.
async function planZapIn(ctx, state, inputs, tickLower, tickUpper, slippageBps, addSlippagePct) {
  const sender = await holder(ctx)
  const sa = getSqrtRatioAtTick(tickLower)
  const sb = getSqrtRatioAtTick(tickUpper)
  const sc = state.sqrtPriceX96
  const [a0, a1] = inputs

  // Amounts of token1 per token0 the range needs is R = rn/rd; sell the surplus token.
  const rn = (sc - sa) * sc * sb
  const rd = (sb - sc) * Q192
  let sellIndex, sizeFor
  if (state.tick < tickLower) {
    sellIndex = 1
    sizeFor = () => a1
  } else if (state.tick >= tickUpper) {
    sellIndex = 0
    sizeFor = () => a0
  } else if (a1 * rd > rn * a0) {
    sellIndex = 1
    // Selling token1 at rate q' (token0 per token1) = qn/qd: s = (a1 rd - rn a0) qd / (rd qd + rn qn)
    sizeFor = (qn, qd) => (a1 * rd - rn * a0) * qd / (rd * qd + rn * qn)
  } else {
    sellIndex = 0
    // Selling token0 at rate q (token1 per token0) = qn/qd: s = (rn a0 - a1 rd) qd / (qn rd + rn qd)
    sizeFor = (qn, qd) => (rn * a0 - a1 * rd) * qd / (qn * rd + rn * qd)
  }
  const available = inputs[sellIndex]
  const tokenIn = ctx.tokens[sellIndex]
  const tokenOut = ctx.tokens[1 - sellIndex]
  // The pool price as the swap rate to start from.
  const rate = sellIndex === 0 ? [sc * sc, Q192] : [Q192, sc * sc]

  const inRange = state.tick >= tickLower && state.tick < tickUpper
  let amount = inRange ? sizeFor(...rate) : available
  if (amount > available) amount = available

  const other = inputs[1 - sellIndex]
  const total = a0 * sc * sc / Q192 + a1
  const valueOf = x => sellIndex === 0 ? x * sc * sc / Q192 : x
  const isTiny = x => x <= 0n || (other > 0n && valueOf(x) * 10000n < total * MIN_ZAP_SWAP_SHARE_BP)
  const quote = amountIn => quoteSwap({ chainId: ctx.chainId, tokenIn, tokenOut, amountIn, sender, slippageBps })

  const routes = []
  if (!isTiny(amount)) {
    // Selling into the position's own pool moves the price the add is made at; thin pools need a smaller swap.
    let route = inRange ? await quoteWithPoolImpact(ctx, state, { sellIndex, inputs, sa, sb, amount, quote }) : null
    if (!route) {
      for (let i = 0; i < MAX_ZAP_QUOTES; i++) {
        route = await quote(amount)
        if (amount === available) break
        let next = sizeFor(route.amountOut, route.amountIn)
        if (next > available) next = available
        const diff = next > amount ? next - amount : amount - next
        if (diff * 10000n <= amount * ZAP_SWAP_TOLERANCE_BP) break
        amount = next
      }
    }
    routes.push(route)
  }

  // The inventory each leg is minted from: what is kept, plus the swap's guaranteed minimum output.
  const basis = [...inputs]
  for (const r of routes) {
    basis[sellIndex] -= r.amountIn
    basis[1 - sellIndex] += r.minAmountOut
  }
  if (basis[0] <= 0n && basis[1] <= 0n) throw new Error('Nothing to add to the position after swapping')
  if ((basis[0] <= 0n) !== (basis[1] <= 0n)) {
    const wanted = state.tick < tickLower ? 0 : state.tick >= tickUpper ? 1 : undefined
    if (wanted === undefined || basis[wanted] <= 0n) throw new Error('The swap would leave one token that the target range cannot take')
  }
  return { routes, minAmounts: minAddAmounts(basis, sc, slippageBps, addSlippagePct) }
}

// Size and quote a zap-in swap whose own price impact on the position's pool matters: the ratio the range needs
// is taken at the price after the swap, which the aggregator's route moves through the volume it sends to this
// pool (QuoterV2 prices that). Returns the quoted route, or null when the swap barely moves the pool (or it
// can't be priced), so the plain rate-based sizing applies.
async function quoteWithPoolImpact(ctx, state, { sellIndex, inputs, sa, sb, amount, quote }) {
  const quoter = UNIV3_QUOTERS[ctx.chainId]
  if (!quoter) return null
  const sc = state.sqrtPriceX96
  const tokenIn = ctx.tokens[sellIndex]
  const priced = async volume => {
    if (volume <= 0n) return { out: 0n, sqrtAfter: sc }
    try {
      const { result } = await ctx.client.simulateContract({
        address: quoter,
        abi: QUOTER_ABI,
        functionName: 'quoteExactInputSingle',
        args: [{ tokenIn, tokenOut: ctx.tokens[1 - sellIndex], amountIn: volume, fee: ctx.fee, sqrtPriceLimitX96: 0n }],
      })
      return { out: result[0], sqrtAfter: result[1] }
    } catch (e) {
      throw Object.assign(e, { pricingFailed: true })
    }
  }

  try {
    const atFull = await priced(amount)
    const moved = atFull.sqrtAfter > sc ? atFull.sqrtAfter - sc : sc - atFull.sqrtAfter
    if (moved * 10000n <= sc * POOL_IMPACT_THRESHOLD_BP) return null

    // The swap's model: all of it through this pool until a real route says otherwise.
    let share = [1n, 1n]
    let rate
    // > 0: too much token1 for the price after selling `s`; < 0: too little.
    const surplus1 = async s => {
      const q = await priced(s * share[0] / share[1])
      const out = rate ? s * rate[0] / rate[1] : q.out
      if (q.sqrtAfter >= sb) return -1n
      if (q.sqrtAfter <= sa) return 1n
      const h = [...inputs]
      h[sellIndex] -= s
      h[1 - sellIndex] += out
      return h[1] * (sb - q.sqrtAfter) * Q192 - (q.sqrtAfter - sa) * q.sqrtAfter * sb * h[0]
    }
    // Selling token0 adds token1, so more of it raises the surplus; selling token1 lowers it.
    const oversold = d => sellIndex === 0 ? d > 0n : d < 0n
    // The balanced size is at most `amount` (the size that ignores the swap's own impact).
    const balanced = async () => {
      if (!oversold(await surplus1(amount))) return amount
      let lo = 0n
      let hi = amount
      for (let i = 0; i < POOL_IMPACT_BISECTIONS; i++) {
        const mid = (lo + hi) / 2n
        if (oversold(await surplus1(mid))) hi = mid
        else lo = mid
      }
      return (lo + hi) / 2n
    }

    let size = await balanced()
    let route
    for (let i = 0; i < MAX_IMPACT_QUOTES; i++) {
      route = await quote(size)
      // Re-size with this route's real rate and the share of it that runs through the position's pool.
      const poolVolume = route.hops.filter(h => h.pool === ctx.pool && h.tokenIn === tokenIn).reduce((sum, h) => sum + h.swapAmount, 0n)
      share = [route.hops.length > 0 ? poolVolume : route.amountIn, route.amountIn]
      rate = [route.amountOut, route.amountIn]
      if (i === MAX_IMPACT_QUOTES - 1) break
      const next = await balanced()
      const diff = next > size ? next - size : size - next
      if (diff * 1000n <= size * ZAP_IMPACT_TOLERANCE_PER_MILLE) break
      size = next
    }
    return route
  } catch (e) {
    if (!e.pricingFailed) throw e
    console.warn('Could not model the swap price impact, sizing at the pool price:', e.shortMessage || e.message)
    return null
  }
}

// The add's minimum per token: the inventory less the swap slippage, then less a dust allowance spread over the
// two tokens by value (RouterZapInRouteFinalizer.addWithFinalMinAmounts / minAddAmountsByTotalDust). Values use
// the pool price, which only matters relative to each other.
function minAddAmounts(basis, sqrtPriceX96, slippageBps, addSlippagePct) {
  const afterSlippage = basis.map(b => b * BigInt(10000 - slippageBps) / 10000n)
  const price = (Number(sqrtPriceX96) / 2 ** 96) ** 2
  const value0 = Number(afterSlippage[0]) * price
  const value1 = Number(afterSlippage[1])
  if (!Number.isFinite(value0) || !Number.isFinite(value1) || value0 <= 0 || value1 <= 0) {
    return afterSlippage.map(m => applySlippagePct(m, addSlippagePct))
  }
  const totalValue = value0 + value1
  return [value0, value1].map((value, i) => applySlippagePct(afterSlippage[i], Math.min(100, addSlippagePct * totalValue / value)))
}

function applySlippagePct(amount, pct) {
  return amount * BigInt(Math.floor(10000 - pct * 100)) / 10000n
}

async function succeeds(ctx, account, data) {
  try {
    await ctx.client.call({ account, to: data.address, data: encodeFunctionData(data), value: data.value })
    return true
  } catch (e) {
    console.warn('Simulation reverted:', e.shortMessage || e.message)
    return false
  }
}

async function loadPosition(chainId, poolData, nftId, provider) {
  if (!canBuildLocally(chainId, poolData)) throw new Error('Local Sickle builder does not support this pool')
  const chain = getSickleChain(chainId)
  const nftManager = poolData.nftManagerAddress.toLowerCase()
  const tokenId = BigInt(nftId)

  const client = createPublicClient({ transport: custom(provider) })
  const position = await client.readContract({ address: nftManager, abi: NFT_MANAGER_ABI, functionName: 'positions', args: [tokenId] })
  const [, , token0, token1, fee, tickLower, tickUpper, liquidity, , , tokensOwed0, tokensOwed1] = position

  return {
    chainId: Number(chainId), chain, client, nftManager, tokenId, fee, liquidity, tickLower, tickUpper,
    pool: poolData.poolAddress.toLowerCase(),
    tokensOwed: [tokensOwed0, tokensOwed1],
    tokens: [token0.toLowerCase(), token1.toLowerCase()],
  }
}

// The NFT's holder: the Sickle, which collects the fees and runs the swaps.
async function holder(ctx) {
  if (!ctx.holder) ctx.holder = ctx.client.readContract({ address: ctx.nftManager, abi: NFT_MANAGER_ABI, functionName: 'ownerOf', args: [ctx.tokenId] })
  return ctx.holder
}

// Fees a collect() from the NFT's holder (the Sickle) would return, including fees not yet
// credited to tokensOwed.
async function uncollectedFees(ctx) {
  try {
    const owner = await holder(ctx)
    const { result } = await ctx.client.simulateContract({
      address: ctx.nftManager,
      abi: NFT_MANAGER_ABI,
      functionName: 'collect',
      args: [{ tokenId: ctx.tokenId, recipient: owner, amount0Max: MAX_UINT128, amount1Max: MAX_UINT128 }],
      account: owner,
    })
    return result
  } catch (e) {
    console.warn('Could not simulate fee collection, using tokensOwed:', e)
    return ctx.tokensOwed
  }
}

function nftPosition(ctx) {
  return { farm: { stakingContract: ctx.nftManager, poolIndex: 0n }, nft: ctx.nftManager, tokenId: ctx.tokenId }
}

// Fees are claimed for both pool tokens; non-transferrable ones are dropped, as the quote API does.
function simpleHarvest(ctx) {
  return { rewardTokens: transferable(ctx, ctx.tokens), amount0Max: MAX_UINT128, amount1Max: MAX_UINT128, extraData: '0x' }
}

function transferable(ctx, tokens) {
  const blocked = (ctx.chain.nonTransferrableTokens || []).map(t => t.toLowerCase())
  return [...new Set(tokens)].filter(t => t !== zeroAddress && !blocked.includes(t))
}

// Swaps to the native token go to the wrapped native token (UniV3 pools never hold native ETH).
function wrapped(ctx, token) {
  return token === NATIVE_TOKEN ? ctx.chain.wrappedNative.toLowerCase() : token
}

function sameToken(ctx, a, b) {
  const wrappedNative = ctx.chain.wrappedNative.toLowerCase()
  return a === b || (a === wrappedNative && b === NATIVE_TOKEN) || (b === wrappedNative && a === NATIVE_TOKEN)
}

// Sum amounts per token, keeping first-seen order.
function mergeTokens(amounts) {
  const merged = new Map()
  for (const { token, amount } of amounts) merged.set(token, (merged.get(token) || 0n) + amount)
  return [...merged].map(([token, amount]) => ({ token, amount }))
}

// Token amounts of a position at the pool price, rounded as the quote API's calculateUserLiquidity.
function positionAmounts(sqrtPriceX96, tickLower, tickUpper, liquidity) {
  const minSqrtPrice = getSqrtRatioAtTick(Math.min(tickLower, tickUpper))
  const maxSqrtPrice = getSqrtRatioAtTick(Math.max(tickLower, tickUpper))
  const price = sqrtPriceX96 < minSqrtPrice ? minSqrtPrice : sqrtPriceX96 > maxSqrtPrice ? maxSqrtPrice : sqrtPriceX96
  const scaledLiquidity = liquidity << 96n
  return [
    (scaledLiquidity * (maxSqrtPrice - price)) / (maxSqrtPrice * price),
    (scaledLiquidity * (price - minSqrtPrice)) >> 192n,
  ]
}

// Uniswap V3 TickMath.getSqrtRatioAtTick, exact (src/js/uniswap's version is a float approximation).
const TICK_RATIOS = [
  0xfff97272373d413259a46990580e213an, 0xfff2e50f5f656932ef12357cf3c7fdccn, 0xffe5caca7e10e4e61c3624eaa0941cd0n,
  0xffcb9843d60f6159c9db58835c926644n, 0xff973b41fa98c081472e6896dfb254c0n, 0xff2ea16466c96a3843ec78b326b52861n,
  0xfe5dee046a99a2a811c461f1969c3053n, 0xfcbe86c7900a88aedcffc83b479aa3a4n, 0xf987a7253ac413176f2b074cf7815e54n,
  0xf3392b0822b70005940c7a398e4b70f3n, 0xe7159475a2c29b7443b29c7fa6e889d9n, 0xd097f3bdfd2022b8845ad8f792aa5825n,
  0xa9f746462d870fdf8a65dc1f90e061e5n, 0x70d869a156d2a1b890bb3df62baf32f7n, 0x31be135f97d08fd981231505542fcfa6n,
  0x9aa508b5b7a84e1c677de54f3e99bc9n, 0x5d6af8dedb81196699c329225ee604n, 0x2216e584f5fa1ea926041bedfe98n,
  0x48a170391f7dc42444e8fa2n,
]
const MAX_UINT256 = (1n << 256n) - 1n

function getSqrtRatioAtTick(tick) {
  const absTick = Math.abs(tick)
  let ratio = absTick & 1 ? 0xfffcb933bd6fad37aa2d162d1a594001n : 1n << 128n
  TICK_RATIOS.forEach((r, i) => {
    if (absTick & (2 << i)) ratio = (ratio * r) >> 128n
  })
  if (tick > 0) ratio = MAX_UINT256 / ratio
  return (ratio >> 32n) + (ratio % (1n << 32n) > 0n ? 1n : 0n)
}

function callData(ctx, functionName, args) {
  return {
    chainId: ctx.chainId,
    address: ctx.chain.nftStrategy,
    abi: NFT_FARM_STRATEGY_ABI,
    functionName,
    args,
    value: 0n,
  }
}
