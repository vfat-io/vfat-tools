/**
 * Sickle SDK NFT Harvest Function
 * 
 * Claims accrued fees from an NFT position and swaps to a target token
 */

import { OperationType, initializeWalletProvider, encodeTransactionData, simulateTransaction, sendTransaction, waitForTransaction, handleTransactionReceipt, normalizeSicklePoolId } from './utils.js'

export const NATIVE_TOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

/**
 * Harvest NFT position fees to a target token
 * 
 * @param {Object} poolData - Pool information including stakingAddress, poolAddress
 * @param {string|number} nftId - NFT position ID
 * @param {string} tokenAddress - Token to receive rewards in (defaults to native token)
 */
export async function harvest(poolData, nftId, tokenAddress) {
  try {
    showLoading()
    
    const { walletAddress, provider, chainId } = await initializeWalletProvider()

    console.log('💰 Harvesting NFT #' + nftId)

    const confirmMessage = `Claim rewards for NFT #${nftId}?

Fees will be swapped to the native token.

Proceed?`

    if (!confirm(confirmMessage)) {
      console.log('Harvest cancelled by user')
      return
    }

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
    
    const callData = await harvestAction.getCallData(walletAddress)
    
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
    alert(`Error: ${error.message}`)
  } finally {
    hideLoading()
  }
}

export default {
  harvest,
  NATIVE_TOKEN
}
