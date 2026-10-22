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
import { NFT_FARM_STRATEGY_ABI } from './nft-farm-strategy-abi.js'
import { getSickleChain } from './chains.js'
import { NATIVE_TOKEN, DEFAULT_SLIPPAGE_BPS, canSwapLocally, quoteSwap, swapParams } from './swap.js'

const MAX_UINT128 = (1n << 128n) - 1n

// The quote API skips swapping harvest claims worth less than this (MIN_HARVEST_SWAP_VALUE_USD).
const MIN_HARVEST_SWAP_VALUE_USD = 0.1

// Swap inputs are taken 0.1% below the position's amounts, so the swaps can't overspend.
const WITHDRAW_MARGIN_PER_MILLE = 999n

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
  const [, , token0, token1, , tickLower, tickUpper, liquidity, , , tokensOwed0, tokensOwed1] = position

  return {
    chainId: Number(chainId), chain, client, nftManager, tokenId, liquidity, tickLower, tickUpper,
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
