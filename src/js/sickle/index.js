/**
 * Sickle SDK Integration
 * 
 * Provides access to Sickle protocol's DeFi position management features:
 * - LP position management (deposit, harvest, compound, withdraw)
 * - NFT position management (concentrated liquidity)
 * - Automated strategies and rebalancing
 */

import { sickle, fetchChains, fetchFarms, Pool, NftPool } from '@vfat-io/sickle-sdk'

/**
 * Export the Sickle SDK components
 */
export { sickle, fetchChains, fetchFarms, Pool, NftPool }

/**
 * Get all supported chains from Sickle SDK
 * @returns {Promise<Array>} List of supported chains with their configuration
 */
export async function getSupportedChains() {
  try {
    const chains = await fetchChains()
    return chains
  } catch (error) {
    console.error('Failed to fetch supported chains:', error)
    throw error
  }
}

/**
 * Deploy a new Sickle contract for a wallet
 * @param {number} chainId - Chain ID to deploy on
 * @param {string} factoryAddress - Sickle factory contract address
 * @param {string} approvedAutomationAddress - Optional automation bot address
 * @param {string} referralCode - Optional referral code
 * @returns {Promise<Object>} Transaction data for deployment
 */
export async function deploySickleContract(
  chainId,
  factoryAddress,
  approvedAutomationAddress = null,
  referralCode = ''
) {
  try {
    const deployTx = await sickle.deploySickle(
      chainId,
      factoryAddress,
      approvedAutomationAddress,
      referralCode
    )
    return deployTx
  } catch (error) {
    console.error('Failed to deploy Sickle:', error)
    throw error
  }
}

/**
 * Get Sickle factory address for a chain
 * @param {number} chainId - Chain ID
 * @returns {Promise<string|undefined>} Factory address if available
 */
export async function getSickleFactory(chainId) {
  try {
    const factoryAddress = await sickle.getSickleFactory(chainId)
    return factoryAddress
  } catch (error) {
    console.error('Failed to get Sickle factory:', error)
    throw error
  }
}

/**
 * Check if Sickle SDK is available and working
 * @returns {boolean} True if SDK is properly initialized
 */
export function isSickleAvailable() {
  return typeof sickle !== 'undefined' && sickle !== null
}

export default { sickle, getSupportedChains, deploySickleContract, getSickleFactory, isSickleAvailable, Pool, NftPool }
