/**
 * Sickle SDK NFT Harvest Function
 * 
 * Claims accrued fees from an NFT position, as-is or swapped to a target token
 */

import { OperationType, describeError, initializeWalletProvider, encodeTransactionData, simulateTransaction, sendTransaction, waitForTransaction, handleTransactionReceipt, normalizeSicklePoolId } from './utils.js'
import { canBuildLocally, buildClaimToUnderlying } from './builder.js'

export const NATIVE_TOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

/**
 * Out token meaning "no swap": the quote API then claims the fees as-is (simpleHarvest)
 */
export const UNDERLYING = '0x0000000000000000000000000000000000000000'

/**
 * Claim NFT position fees as the underlying tokens, without swapping
 *
 * @param {Object} poolData - Pool information including stakingAddress, poolAddress
 * @param {string|number} nftId - NFT position ID
 */
export function harvestToUnderlying(poolData, nftId) {
  return harvest(poolData, nftId, UNDERLYING)
}

/**
 * Harvest NFT position fees to a target token
 * 
 * @param {Object} poolData - Pool information including stakingAddress, poolAddress
 * @param {string|number} nftId - NFT position ID
 * @param {string} tokenAddress - Token to receive rewards in (defaults to native token; UNDERLYING for no swap)
 */
export async function harvest(poolData, nftId, tokenAddress) {
  try {
    showLoading()
    
    const { walletAddress, provider, chainId } = await initializeWalletProvider()

    console.log('💰 Harvesting NFT #' + nftId)

    const toUnderlying = tokenAddress === UNDERLYING
    const confirmMessage = `Claim rewards for NFT #${nftId}?

${toUnderlying ? 'Fees will be sent as-is, without swapping.' : 'Fees will be swapped to the native token.'}

Proceed?`

    if (!confirm(confirmMessage)) {
      console.log('Harvest cancelled by user')
      return
    }

    const callData = toUnderlying && canBuildLocally(chainId, poolData)
      ? await buildClaimToUnderlying({ chainId, poolData, nftId, provider })
      : await sdkHarvestCallData(poolData, chainId, nftId, tokenAddress, walletAddress)
    
    console.log('CallData received:', {
      address: callData.address,
      functionName: callData.functionName,
      hasArgs: !!callData.args
    })

    const encodedData = encodeTransactionData(callData)

    await simulateTransaction(provider, walletAddress, callData, encodedData)
    const tx = await sendTransaction(provider, walletAddress, callData, encodedData)

    console.log(`Harvest transaction submitted!\n\nTx Hash: ${tx}\n\nWaiting for confirmation...`)

    const receipt = await waitForTransaction(provider, tx)
    
    handleTransactionReceipt(receipt, tx, OperationType.HARVEST)

  } catch (error) {
    console.error('Harvest failed:', error)
    alert(`Error: ${await describeError(error)}`)
  } finally {
    hideLoading()
  }
}

async function sdkHarvestCallData(poolData, chainId, nftId, tokenAddress, walletAddress) {
  const nftPoolConfig = {
    chainId: chainId,
    address: poolData.stakingAddress,
    poolAddress: poolData.poolAddress,
    nftManagerAddress: poolData.nftManagerAddress
  }

  nftPoolConfig.poolId = normalizeSicklePoolId(poolData.poolId)
  
  if (poolData.pid !== undefined && poolData.pid !== null) {
    nftPoolConfig.poolIndex = Number(poolData.pid)
  }
  
  const nftPool = new window.Sickle.NftPool(nftPoolConfig)
  
  console.log('Creating NftPool with:', nftPoolConfig)

  const harvestAction = nftPool.harvest({ nftId: Number(nftId) }).toToken({
    tokenAddress: tokenAddress || NATIVE_TOKEN,
  })
  
  return await harvestAction.getCallData(walletAddress)
}

export default {
  harvest,
  harvestToUnderlying,
  NATIVE_TOKEN,
  UNDERLYING
}
