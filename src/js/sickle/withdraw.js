/**
 * Sickle SDK NFT Withdrawal Functions
 * 
 * - Withdraw NFT: Send the NFT back to the wallet, collecting its fees
 * - Withdraw to Underlying: Exit position and receive both underlying tokens
 * - Withdraw to Token: Exit position and swap to a single token (e.g., native token)
 *
 * The actions are built locally (builder.js) where supported, without the quote API.
 */

import { OperationType, describeError, getNativeTokenSymbol, initializeWalletProvider, encodeTransactionData, simulateTransaction, sendTransaction, waitForTransaction, handleTransactionReceipt, normalizeSicklePoolId } from './utils.js'
import { canBuildLocally, canSwapLocallyFor, buildWithdrawNft, buildExitToUnderlying, buildExitToToken } from './builder.js'

/**
 * Native token address (ETH) - common across all EVM chains
 */
export const NATIVE_TOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

/**
 * Build the SDK NftPool for a quote API action
 *
 * @param {Object} poolData - Pool information including stakingAddress, poolAddress
 * @param {number} chainId - Chain ID
 */
function createNftPool(poolData, chainId) {
  if (!window.Sickle?.NftPool) {
    throw new Error('This action needs the Sickle SDK. Open the page with ?api=true.')
  }

  // Create NftPool config - only include poolIndex if explicitly set (PancakeSwap V3 PID)
  const nftPoolConfig = {
    chainId: chainId,
    address: poolData.stakingAddress,      // MasterChef/Gauge address
    poolAddress: poolData.poolAddress,     // V3 Pool address
    nftManagerAddress: poolData.nftManagerAddress  // NFT Position Manager address
  }

  // Always pass a poolId value for quote API compatibility.
  // For most CL protocols: "0". For Uniswap v4: bytes32 hash.
  nftPoolConfig.poolId = normalizeSicklePoolId(poolData.poolId)

  // Only add poolIndex for PancakeSwap V3 (has MasterChef pool IDs / PIDs)
  // Velodrome/Aerodrome use gauge contracts and should NOT have poolIndex
  if (poolData.pid !== undefined && poolData.pid !== null) {
    nftPoolConfig.poolIndex = Number(poolData.pid)
  }

  console.log('Creating NftPool with:', nftPoolConfig)
  return new window.Sickle.NftPool(nftPoolConfig)
}

/**
 * Withdraw the NFT itself back to the wallet, collecting its fees (NftFarmStrategy.simpleExit)
 *
 * @param {Object} poolData - Pool information including stakingAddress, poolAddress
 * @param {string|number} nftId - NFT position ID
 */
export async function withdrawNft(poolData, nftId) {
  try {
    showLoading()

    const { walletAddress, provider, chainId } = await initializeWalletProvider(false)

    console.log('💰 Withdrawing NFT #' + nftId + ' to wallet')

    if (!confirm(`Withdraw NFT #${nftId} to your wallet?\n\nUnclaimed fees are collected too.\n\nProceed?`)) {
      console.log('Withdrawal cancelled by user')
      return
    }

    let callData
    if (canBuildLocally(chainId, poolData)) {
      try {
        callData = await buildWithdrawNft({ chainId, poolData, nftId, provider })
      } catch (error) {
        if (!window.Sickle?.NftPool) throw error
        console.warn('Local withdraw build failed, falling back to the Sickle SDK:', error)
      }
    }
    if (!callData) callData = await createNftPool(poolData, chainId).exit({ nftId: Number(nftId) }).toNft().getCallData(walletAddress)

    const encodedData = encodeTransactionData(callData)

    await simulateTransaction(provider, walletAddress, callData, encodedData)
    const tx = await sendTransaction(provider, walletAddress, callData, encodedData)

    console.log(`Withdrawal transaction submitted!\n\nTx Hash: ${tx}\n\nWaiting for confirmation...`)

    const receipt = await waitForTransaction(provider, tx)

    handleTransactionReceipt(receipt, tx, OperationType.WITHDRAW_NFT)

  } catch (error) {
    console.error('Withdrawal failed:', error)
    alert(`Error: ${await describeError(error)}`)
  } finally {
    hideLoading()
  }
}

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
    const { walletAddress, provider, chainId } = await initializeWalletProvider(false)

    console.log('💰 Withdrawing NFT #' + nftId + ' to underlying tokens')

    // Show confirmation dialog
    const confirmMessage = `Exit NFT #${nftId} to underlying?

Proceed with exit?`

    if (!confirm(confirmMessage)) {
      console.log('Withdrawal cancelled by user')
      return
    }

    // Get transaction call data, built locally when supported, else from the SDK (quote API)
    let callData
    if (canBuildLocally(chainId, poolData)) {
      try {
        callData = await buildExitToUnderlying({ chainId, poolData, nftId, provider })
      } catch (error) {
        if (!window.Sickle?.NftPool) throw error
        console.warn('Local exit build failed, falling back to the Sickle SDK:', error)
      }
    }
    if (!callData) callData = await createNftPool(poolData, chainId).exit({ nftId: Number(nftId) }).toUnderlying().getCallData(walletAddress)

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
    alert(`Error: ${await describeError(error)}`)
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
    const { walletAddress, provider, chainId } = await initializeWalletProvider(false)

    console.log('💰 Withdrawing NFT #' + nftId + ' to token:', tokenAddress)

    // Show confirmation dialog
    const nativeSymbol = getNativeTokenSymbol(chainId)
    
    const confirmMessage = `Exit NFT #${nftId} to ${nativeSymbol}?

Proceed with Exit?`

    if (!confirm(confirmMessage)) {
      console.log('Withdrawal cancelled by user')
      return
    }

    // Get transaction call data, built locally when supported, else from the SDK (quote API)
    let callData
    if (canSwapLocallyFor(chainId, poolData)) {
      try {
        callData = await buildExitToToken({ chainId, poolData, nftId, provider, tokenOut: tokenAddress, account: walletAddress })
      } catch (error) {
        if (!window.Sickle?.NftPool) throw error
        console.warn('Local exit build failed, falling back to the Sickle SDK:', error)
      }
    }
    if (!callData) callData = await createNftPool(poolData, chainId).exit({ nftId: Number(nftId) }).toToken({ tokenAddress: tokenAddress }).getCallData(walletAddress)

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
    alert(`Error: ${await describeError(error)}`)
  } finally {
    hideLoading()
  }
}

export default {
  withdrawNft,
  withdrawToUnderlying,
  withdrawToToken,
  NATIVE_TOKEN
}
