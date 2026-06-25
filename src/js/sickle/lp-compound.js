/**
 * Sickle SDK LP Pool Compound Function
 * 
 * Compounds rewards back into LP position (for regular LP pools, not NFT-based)
 */

import { OperationType, initializeWalletProvider, encodeTransactionData, simulateTransaction, sendTransaction, waitForTransaction, handleTransactionReceipt } from './utils.js'

/**
 * Compound LP pool rewards back into the position
 * 
 * @param {Object} poolData - Pool information including poolAddress
 * @param {BigNumber} amount - Raw pending rewards amount (as BigNumber)
 */
export async function compoundLP(poolData, amount) {
  try {
    showLoading()
    
    // Initialize wallet and provider
    const { walletAddress, provider, chainId } = await initializeWalletProvider()

    console.log('🔄 Compounding LP pool:', poolData.poolAddress)

    // Show confirmation dialog
    const confirmMessage = `Compound LP position?

This will claim and reinvest rewards into the position.

Proceed with compound?`

    if (!confirm(confirmMessage)) {
      console.log('Compound cancelled by user')
      return
    }

    // Create Pool instance (for regular LP pools)
    const pool = new window.Sickle.Pool({
      chainId: chainId,
      address: poolData.poolAddress
    })
    
    console.log('Creating Pool with:', {
      chainId,
      address: poolData.poolAddress
    })
    
    // Convert amount to bigint
    const compoundAmount = amount ? BigInt(amount.toString()) : BigInt(0)
    
    console.log('Compound amount (bigint):', compoundAmount.toString())

    // Create compound action with the pending rewards amount
    const compoundAction = pool.compound({ 
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
  compoundLP
}
