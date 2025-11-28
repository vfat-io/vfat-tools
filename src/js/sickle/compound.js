/**
 * Sickle SDK NFT Compound Function
 * 
 * Compounds rewards back into the NFT position to increase liquidity
 */

import { OperationType, initializeWalletProvider, encodeTransactionData, simulateTransaction, sendTransaction, waitForTransaction, handleTransactionReceipt } from './utils.js'

/**
 * Compound NFT position rewards back into the position
 * 
 * @param {Object} poolData - Pool information including stakingAddress, poolAddress, pid (optional for Velodrome)
 * @param {string|number} nftId - NFT position ID
 * @param {BigNumber} amount - Raw pending rewards amount (as BigNumber) - optional, will use 0 if not provided
 */
export async function compound(poolData, nftId, amount) {
  try {
    showLoading()
    
    // Initialize wallet and provider
    const { walletAddress, provider, chainId } = await initializeWalletProvider()

    console.log('🔄 Compounding NFT #' + nftId)

    // Show confirmation dialog
    const confirmMessage = `Compound NFT #${nftId}?

This will claim and reinvest rewards into the position.

Proceed with compound?`

    if (!confirm(confirmMessage)) {
      console.log('Compound cancelled by user')
      return
    }

    // Create NftPool instance
    const nftPool = new window.Sickle.NftPool({
      chainId: chainId,
      address: poolData.stakingAddress,
      poolAddress: poolData.poolAddress,
      poolId: poolData.pid ? String(poolData.pid) : '0'
    })
    
    console.log('Creating NftPool with:', {
      chainId,
      address: poolData.stakingAddress,
      poolAddress: poolData.poolAddress,
      poolId: poolData.pid ? String(poolData.pid) : '0'
    })
    
    // If amount not provided (Velodrome case), use 0
    // The SDK/contract will query the actual pending amount
    const compoundAmount = amount ? BigInt(amount.toString()) : BigInt(0)
    
    console.log('Amount received:', amount)
    console.log('Amount type:', typeof amount)
    console.log('Compound amount (bigint):', compoundAmount.toString())

    // Create compound action with the pending rewards amount
    const compoundAction = nftPool.compound({ 
      nftId: Number(nftId),
      amount: compoundAmount
    })
    
    console.log('Compound action created, getting call data...')
    
    // Get transaction call data from SDK
    const callData = await compoundAction.getCallData(walletAddress)
    
    console.log('CallData received:', {
      address: callData.address,
      functionName: callData.functionName,
      hasArgs: !!callData.args
    })

    // Encode transaction data
    const encodedData = encodeTransactionData(callData)

    // Simulate and send transaction
    await simulateTransaction(provider, walletAddress, callData, encodedData)
    const tx = await sendTransaction(provider, walletAddress, callData, encodedData)

    console.log(`Compound transaction submitted!\n\nTx Hash: ${tx}\n\nWaiting for confirmation...`)

    // Wait for confirmation
    const receipt = await waitForTransaction(provider, tx)
    
    // Handle receipt and show messages
    handleTransactionReceipt(receipt, tx, OperationType.COMPOUND)

  } catch (error) {
    console.error('Compound failed:', error)
    alert(`Error: ${error.message}`)
  } finally {
    hideLoading()
  }
}

export default {
  compound
}
