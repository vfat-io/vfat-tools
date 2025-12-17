/**
 * Sickle SDK NFT Withdrawal Functions
 * 
 * - Withdraw to Underlying: Exit position and receive both underlying tokens
 * - Withdraw to Token: Exit position and swap to a single token (e.g., native token)
 */

import { OperationType, getNativeTokenSymbol, initializeWalletProvider, encodeTransactionData, simulateTransaction, sendTransaction, waitForTransaction, handleTransactionReceipt } from './utils.js'

/**
 * Native token address (ETH) - common across all EVM chains
 */
export const NATIVE_TOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

/**
 * Withdraw NFT position to underlying tokens (both tokens in the LP pair)
 * 
 * @param {Object} poolData - Pool information including stakingAddress, poolAddress
 * @param {string|number} nftId - NFT position ID
 */
export async function withdrawToUnderlying(poolData, nftId) {
  try {
    showLoading()
    
    // Initialize wallet and provider
    const { walletAddress, provider, chainId } = await initializeWalletProvider()

    console.log('💰 Withdrawing NFT #' + nftId + ' to underlying tokens')

    // Show confirmation dialog
    const confirmMessage = `Exit NFT #${nftId} to underlying?

Proceed with exit?`

    if (!confirm(confirmMessage)) {
      console.log('Withdrawal cancelled by user')
      return
    }

    // Create NftPool config - only include poolIndex if explicitly set (PancakeSwap V3 PID)
    const nftPoolConfig = {
      chainId: chainId,
      address: poolData.stakingAddress,      // MasterChef/Gauge address
      poolAddress: poolData.poolAddress,     // V3 Pool address
      nftManagerAddress: poolData.nftManagerAddress  // NFT Position Manager address
    }
    
    // Only add poolIndex for PancakeSwap V3 (has MasterChef pool IDs / PIDs)
    // Velodrome/Aerodrome use gauge contracts and should NOT have poolIndex
    if (poolData.pid !== undefined && poolData.pid !== null) {
      nftPoolConfig.poolIndex = Number(poolData.pid)
    }
    
    const nftPool = new window.Sickle.NftPool(nftPoolConfig)
    
    console.log('Creating NftPool with:', nftPoolConfig)

    // Create exit to underlying action
    const exitAction = nftPool.exit({ nftId: Number(nftId) }).toUnderlying()
    
    // Get transaction call data from SDK
    const callData = await exitAction.getCallData(walletAddress)

    // Encode transaction data
    const encodedData = encodeTransactionData(callData)

    // Simulate and send transaction
    await simulateTransaction(provider, walletAddress, callData, encodedData)
    const tx = await sendTransaction(provider, walletAddress, callData, encodedData)

    console.log(`Withdrawal transaction submitted!\n\nTx Hash: ${tx}\n\nWaiting for confirmation...`)

    // Wait for confirmation
    const receipt = await waitForTransaction(provider, tx)
    
    // Handle receipt and show messages
    handleTransactionReceipt(receipt, tx, OperationType.WITHDRAW_UNDERLYING)

  } catch (error) {
    console.error('Withdrawal failed:', error)
    alert(`Error: ${error.message}`)
  } finally {
    hideLoading()
  }
}

/**
 * Withdraw NFT position and swap to a single token (e.g., native token or stablecoin)
 * 
 * @param {Object} poolData - Pool information including stakingAddress, poolAddress
 * @param {string|number} nftId - NFT position ID
 * @param {string} tokenAddress - Target token address (defaults to NATIVE_TOKEN for ETH)
 */
export async function withdrawToToken(poolData, nftId, tokenAddress = NATIVE_TOKEN) {
  try {
    showLoading()
    
    // Initialize wallet and provider
    const { walletAddress, provider, chainId } = await initializeWalletProvider()

    console.log('💰 Withdrawing NFT #' + nftId + ' to token:', tokenAddress)

    // Show confirmation dialog
    const nativeSymbol = getNativeTokenSymbol(chainId)
    
    const confirmMessage = `Exit NFT #${nftId} to ${nativeSymbol}?

Proceed with Exit?`

    if (!confirm(confirmMessage)) {
      console.log('Withdrawal cancelled by user')
      return
    }

    // Create NftPool config - only include poolIndex if explicitly set (PancakeSwap V3 PID)
    const nftPoolConfig = {
      chainId: chainId,
      address: poolData.stakingAddress,      // MasterChef/Gauge address
      poolAddress: poolData.poolAddress,     // V3 Pool address
      nftManagerAddress: poolData.nftManagerAddress  // NFT Position Manager address
    }
    
    // Only add poolIndex for PancakeSwap V3 (has MasterChef pool IDs / PIDs)
    // Velodrome/Aerodrome use gauge contracts and should NOT have poolIndex
    if (poolData.pid !== undefined && poolData.pid !== null) {
      nftPoolConfig.poolIndex = Number(poolData.pid)
    }
    
    const nftPool = new window.Sickle.NftPool(nftPoolConfig)
    
    console.log('Creating NftPool with:', nftPoolConfig)

    // Create exit to token action (SDK will use default slippage and priceImpact values)
    const exitAction = nftPool.exit({ nftId: Number(nftId) }).toToken({
      tokenAddress: tokenAddress
    })
    
    // Get transaction call data from SDK
    const callData = await exitAction.getCallData(walletAddress)

    // Encode transaction data
    const encodedData = encodeTransactionData(callData)

    // Simulate and send transaction
    await simulateTransaction(provider, walletAddress, callData, encodedData)
    const tx = await sendTransaction(provider, walletAddress, callData, encodedData)

    console.log(`Withdrawal transaction submitted!\n\nTx Hash: ${tx}\n\nWaiting for confirmation...`)

    // Wait for confirmation
    const receipt = await waitForTransaction(provider, tx)
    
    // Handle receipt and show messages
    handleTransactionReceipt(receipt, tx, OperationType.WITHDRAW_TOKEN)

  } catch (error) {
    console.error('Withdrawal failed:', error)
    alert(`Error: ${error.message}`)
  } finally {
    hideLoading()
  }
}

export default {
  withdrawToUnderlying,
  withdrawToToken,
  NATIVE_TOKEN
}
