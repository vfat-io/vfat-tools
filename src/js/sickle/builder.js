/**
 * Local Sickle calldata builder
 *
 * Builds the same ContractCallData the SDK gets from quote.vfat.io
 * ({ chainId, address, abi, functionName, args, value }), from on-chain reads only.
 * Ported from vfat-api core NftFarmStrategyV5 (simpleExit / exit / simpleHarvest).
 *
 * Covers the actions that need no swaps, for the Uniswap V3 family: an unstaked NFT held by
 * the Sickle, where the farm is the NFT manager itself (UniswapV3Connector, poolIndex 0).
 * Swap actions still go through the SDK/quote API until a swap source is plugged in.
 */

import { createPublicClient, custom, zeroAddress } from 'viem'
import { NFT_FARM_STRATEGY_ABI } from './nft-farm-strategy-abi.js'
import { getSickleChain } from './chains.js'

const MAX_UINT128 = (1n << 128n) - 1n

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

async function loadPosition(chainId, poolData, nftId, provider) {
  if (!canBuildLocally(chainId, poolData)) throw new Error('Local Sickle builder does not support this pool')
  const chain = getSickleChain(chainId)
  const nftManager = poolData.nftManagerAddress.toLowerCase()
  const tokenId = BigInt(nftId)

  const client = createPublicClient({ transport: custom(provider) })
  const position = await client.readContract({ address: nftManager, abi: NFT_MANAGER_ABI, functionName: 'positions', args: [tokenId] })
  const [, , token0, token1, , , , liquidity, , , tokensOwed0, tokensOwed1] = position

  return {
    chainId: Number(chainId), chain, client, nftManager, tokenId, liquidity,
    tokensOwed: [tokensOwed0, tokensOwed1],
    tokens: [token0.toLowerCase(), token1.toLowerCase()],
  }
}

// Fees a collect() from the NFT's holder (the Sickle) would return, including fees not yet
// credited to tokensOwed.
async function uncollectedFees(ctx) {
  try {
    const owner = await ctx.client.readContract({ address: ctx.nftManager, abi: NFT_MANAGER_ABI, functionName: 'ownerOf', args: [ctx.tokenId] })
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
