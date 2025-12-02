/**
 * Sickle SDK LP Pool Withdrawal Functions
 * 
 * Handles withdrawals from regular LP pools (not NFT-based)
 */

import { OperationType, initializeWalletProvider, encodeTransactionData, simulateTransaction, sendTransaction, waitForTransaction, handleTransactionReceipt } from './utils.js'

/**
 * Exit LP position to a specific token
 * 
 * @param {Object} poolData - Pool information including poolAddress
 * @param {BigNumber} amount - Amount of LP tokens to withdraw (as BigNumber)
 * @param {string} tokenAddress - Address of token to receive (use '0x0000000000000000000000000000000000000000' for native)
 */
export async function withdrawLPToToken(poolData, amount, tokenAddress) {
  try {
    showLoading()
    
    // Initialize wallet and provider
    const { walletAddress, provider, chainId } = await initializeWalletProvider()

    console.log('💰 Withdrawing LP to token:', tokenAddress)

    // Show confirmation dialog
    const isNative = tokenAddress === '0x0000000000000000000000000000000000000000'
    const nativeSymbol = window.Sickle?.SickleUtils?.getNativeTokenSymbol?.(chainId) || 'ETH'
    const tokenName = isNative ? nativeSymbol : 'token'
    
    const confirmMessage = `Exit LP position to ${tokenName}?

This will remove liquidity and swap to ${tokenName}.

Proceed?`

    if (!confirm(confirmMessage)) {
      console.log('Withdrawal cancelled by user')
      return
    }

    // Create Pool instance
    const pool = new window.Sickle.Pool({
      chainId: chainId,
      address: poolData.poolAddress
    })
    
    console.log('Creating Pool with:', {
      chainId,
      address: poolData.poolAddress
    })
    
    // Convert amount to bigint
    const withdrawAmount = BigInt(amount.toString())
    
    console.log('Withdraw amount (bigint):', withdrawAmount.toString())

    // Create exit action
    const exitAction = pool.exit({ amount: withdrawAmount })
      .toToken({ tokenAddress })
    
    console.log('Exit action created, getting call data...')
    
    // Get transaction call data from SDK
    const callData = await exitAction.getCallData(walletAddress)
    
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

    console.log(`Exit transaction submitted!\n\nTx Hash: ${tx}\n\nWaiting for confirmation...`)

    // Wait for confirmation
    const receipt = await waitForTransaction(provider, tx)
    
    // Handle receipt and show messages
    handleTransactionReceipt(receipt, tx, OperationType.WITHDRAW)

  } catch (error) {
    console.error('Withdrawal failed:', error)
    alert(`Error: ${error.message}`)
  } finally {
    hideLoading()
  }
}

/**
 * Exit LP position to underlying tokens (both tokens in the pair)
 * 
 * @param {Object} poolData - Pool information including poolAddress
 * @param {BigNumber} amount - Amount of LP tokens to withdraw (as BigNumber)
 */
export async function withdrawLPToUnderlying(poolData, amount) {
  try {
    showLoading()
    
    // Initialize wallet and provider
    const { walletAddress, provider, chainId } = await initializeWalletProvider()

    console.log('💰 Withdrawing LP to underlying tokens')

    // Show confirmation dialog
    const confirmMessage = `Exit LP position to underlying tokens?

This will remove liquidity and return both tokens.

Proceed?`

    if (!confirm(confirmMessage)) {
      console.log('Withdrawal cancelled by user')
      return
    }

    // Create Pool instance
    const pool = new window.Sickle.Pool({
      chainId: chainId,
      address: poolData.poolAddress
    })
    
    console.log('Creating Pool with:', {
      chainId,
      address: poolData.poolAddress
    })
    
    // Convert amount to bigint
    const withdrawAmount = BigInt(amount.toString())
    
    console.log('Withdraw amount (bigint):', withdrawAmount.toString())

    // Create withdraw action (withdraw returns underlying tokens)
    const withdrawAction = pool.withdraw({ amount: withdrawAmount })
    
    console.log('Withdraw action created, getting call data...')
    
    // Get transaction call data from SDK
    const callData = await withdrawAction.getCallData(walletAddress)
    
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

    console.log(`Withdraw transaction submitted!\n\nTx Hash: ${tx}\n\nWaiting for confirmation...`)

    // Wait for confirmation
    const receipt = await waitForTransaction(provider, tx)
    
    // Handle receipt and show messages
    handleTransactionReceipt(receipt, tx, OperationType.WITHDRAW)

  } catch (error) {
    console.error('Withdrawal failed:', error)
    alert(`Error: ${error.message}`)
  } finally {
    hideLoading()
  }
}

export default {
  withdrawLPToToken,
  withdrawLPToUnderlying
}
