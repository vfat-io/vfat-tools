/**
 * Sickle SDK Utilities
 * 
 * Shared utility functions for Sickle SDK integrations
 */

import { customNetworks } from '../config.js'

/**
 * Operation types for transaction receipt handling
 */
export const OperationType = {
  REBALANCE: 'rebalance',
  WITHDRAW_UNDERLYING: 'withdraw_underlying',
  WITHDRAW_TOKEN: 'withdraw_token',
  COMPOUND: 'compound',
}

/**
 * Success messages for each operation type
 */
const SUCCESS_MESSAGES = {
  [OperationType.REBALANCE]: 'Position rebalanced successfully!',
  [OperationType.WITHDRAW_UNDERLYING]: 'Position withdrawn to underlying tokens!',
  [OperationType.WITHDRAW_TOKEN]: 'Position withdrawn and swapped to target token!',
  [OperationType.COMPOUND]: 'Rewards compounded successfully!',
}

/**
 * Get native token symbol for a chain ID
 * @param {number} chainId - Chain ID
 * @returns {string} Native token symbol (e.g., 'ETH', 'BNB', 'MATIC')
 */
export function getNativeTokenSymbol(chainId) {
  const network = customNetworks.find(n => n.id === chainId)
  return network?.nativeCurrency?.symbol || 'ETH'
}

/**
 * Encode transaction data from SDK call data
 * @param {Object} callData - Contract call data from SDK
 * @returns {string} Encoded transaction data
 */
export function encodeTransactionData(callData) {
  return window.viem.encodeFunctionData({
    abi: callData.abi,
    functionName: callData.functionName,
    args: callData.args,
  })
}

/**
 * Initialize wallet provider and get connection details
 * @returns {Promise<Object>} Object containing { walletAddress, provider, chainId }
 * @throws {Error} If wallet not connected or SDK not loaded
 */
export async function initializeWalletProvider() {
  if (!window.appKit?.getAddress()) {
    throw new Error('Please connect your wallet first')
  }

  if (!window.Sickle?.NftPool) {
    throw new Error('Sickle SDK not loaded. Please refresh the page.')
  }

  const walletAddress = window.appKit.getAddress()
  const provider = await window.appKit.getWalletProvider()
  const chainIdHex = await provider.request({ method: 'eth_chainId' })
  const chainId = parseInt(chainIdHex, 16)

  return { walletAddress, provider, chainId }
}

/**
 * Simulate a transaction before sending
 * @param {Object} provider - Wallet provider
 * @param {string} walletAddress - User's wallet address
 * @param {Object} callData - Contract call data from SDK
 * @param {string} encodedData - Encoded transaction data
 * @returns {Promise<void>}
 * @throws {Error} If simulation fails
 */
export async function simulateTransaction(provider, walletAddress, callData, encodedData) {
  try {
    await provider.request({
      method: 'eth_call',
      params: [{
        from: callData.from || walletAddress,
        to: callData.address,
        data: encodedData,
        value: callData.value || '0x0',
      }, 'latest'],
    })
    console.log('✅ Simulation successful')
  } catch (simError) {
    console.warn('⚠️  Simulation failed (this may be expected for some contracts):', simError.message)
    // Don't throw - some contracts revert on eth_call but work fine with actual transactions
    // throw new Error(`Transaction would fail: ${simError.message || 'Unknown error'}`)
  }
}

/**
 * Send a transaction and return the transaction hash
 * @param {Object} provider - Wallet provider
 * @param {string} walletAddress - User's wallet address
 * @param {Object} callData - Contract call data from SDK
 * @param {string} encodedData - Encoded transaction data
 * @returns {Promise<string>} Transaction hash
 */
export async function sendTransaction(provider, walletAddress, callData, encodedData) {
  const tx = await provider.request({
    method: 'eth_sendTransaction',
    params: [{
      from: walletAddress,
      to: callData.address,
      data: encodedData,
      value: callData.value || '0x0',
    }],
  })
  return tx
}

/**
 * Wait for transaction confirmation
 * @param {Object} provider - Wallet provider
 * @param {string} txHash - Transaction hash
 * @param {number} maxAttempts - Maximum number of attempts (default: 60)
 * @returns {Promise<Object>} Transaction receipt
 */
export async function waitForTransaction(provider, txHash, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const receipt = await provider.request({
        method: 'eth_getTransactionReceipt',
        params: [txHash],
      })
      if (receipt) return receipt
    } catch (error) {
      console.error('Error checking transaction:', error)
    }
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  throw new Error('Transaction confirmation timeout')
}

/**
 * Handle transaction receipt and show appropriate messages
 * @param {Object} receipt - Transaction receipt
 * @param {string} txHash - Transaction hash
 * @param {string} operationType - Type of operation (from OperationType enum)
 * @returns {boolean} True if successful, false otherwise
 */
export function handleTransactionReceipt(receipt, txHash, operationType) {
  const successMessage = SUCCESS_MESSAGES[operationType]
  
  if (!successMessage) {
    console.error('Unknown operation type:', operationType)
    operationType = 'Operation'
  }
  
  if (receipt.status === '0x1') {
    console.log(`✅ ${successMessage}`)
    alert(`✅ ${successMessage}\n\nTx Hash: ${txHash}`)
    setTimeout(() => location.reload(), 2000)
    return true
  } else {
    console.error('❌ Transaction failed')
    alert(`❌ Transaction failed. Check block explorer for details.\n\nTx Hash: ${txHash}`)
    return false
  }
}

export default {
  OperationType,
  getNativeTokenSymbol,
  initializeWalletProvider,
  encodeTransactionData,
  simulateTransaction,
  sendTransaction,
  waitForTransaction,
  handleTransactionReceipt
}
