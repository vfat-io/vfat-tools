/**
 * Sickle SDK Helper Functions
 * 
 * Utility functions for common Sickle operations integrated with vfat-tools
 */

import { sickle } from '@vfat-io/sickle-sdk'

/**
 * LP Position Management
 */

/**
 * Deposit LP tokens to a farm
 * @param {Object} params - Deposit parameters
 * @param {number} params.chainId - Chain ID
 * @param {string} params.walletAddress - User wallet address
 * @param {string} params.farmAddress - Farm contract address
 * @param {string} params.poolAddress - Pool contract address
 * @param {string} params.poolId - Pool ID
 * @param {bigint} params.amount - Amount of LP tokens
 * @param {Object} params.positionSettings - Position configuration
 * @returns {Promise<Object>} Transaction data
 */
export async function depositLP(params) {
  try {
    const txData = await sickle.lp.deposit(params)
    return txData
  } catch (error) {
    console.error('Failed to deposit LP tokens:', error)
    throw error
  }
}

/**
 * Deposit single token and convert to LP
 * @param {Object} params - Deposit parameters
 * @param {number} params.chainId - Chain ID
 * @param {string} params.walletAddress - User wallet address
 * @param {string} params.farmAddress - Farm contract address
 * @param {string} params.poolAddress - Pool contract address
 * @param {string} params.tokenAddress - Token to deposit
 * @param {string} params.poolId - Pool ID
 * @param {bigint} params.amount - Amount of tokens
 * @param {number} params.slippage - Slippage tolerance (e.g., 0.5 for 0.5%)
 * @param {number} params.addSlippage - Additional slippage (e.g., 90 for 0.9%)
 * @param {Object} params.positionSettings - Position configuration
 * @returns {Promise<Object>} Transaction data
 */
export async function depositTokenToLP(params) {
  try {
    const txData = await sickle.lp.depositToken(params)
    return txData
  } catch (error) {
    console.error('Failed to deposit token to LP:', error)
    throw error
  }
}

/**
 * Harvest LP rewards
 * @param {Object} params - Harvest parameters
 * @param {number} params.chainId - Chain ID
 * @param {string} params.walletAddress - User wallet address
 * @param {string} params.farmAddress - Farm contract address
 * @param {string} params.poolAddress - Pool contract address
 * @param {string} params.poolId - Pool ID
 * @param {string} params.tokenAddress - Token to harvest to
 * @param {string} params.amount - Expected reward amount
 * @param {number} params.slippage - Slippage tolerance
 * @returns {Promise<Object>} Transaction data
 */
export async function harvestLP(params) {
  try {
    const txData = await sickle.lp.harvest(params)
    return txData
  } catch (error) {
    console.error('Failed to harvest LP rewards:', error)
    throw error
  }
}

/**
 * Compound LP rewards back into the position
 * @param {Object} params - Compound parameters
 * @param {number} params.chainId - Chain ID
 * @param {string} params.walletAddress - User wallet address
 * @param {string} params.farmAddress - Farm contract address
 * @param {string} params.poolAddress - Pool contract address
 * @param {string} params.poolId - Pool ID
 * @param {string} params.amount - Amount to compound
 * @param {number} params.slippage - Slippage tolerance
 * @param {number} params.addSlippage - Additional slippage
 * @returns {Promise<Object>} Transaction data
 */
export async function compoundLP(params) {
  try {
    const txData = await sickle.lp.compound(params)
    return txData
  } catch (error) {
    console.error('Failed to compound LP rewards:', error)
    throw error
  }
}

/**
 * Withdraw LP tokens from farm
 * @param {Object} params - Withdraw parameters
 * @param {number} params.chainId - Chain ID
 * @param {string} params.walletAddress - User wallet address
 * @param {string} params.farmAddress - Farm contract address
 * @param {string} params.poolAddress - Pool contract address
 * @param {string} params.poolId - Pool ID
 * @param {bigint} params.amount - Amount to withdraw
 * @returns {Promise<Object>} Transaction data
 */
export async function withdrawLP(params) {
  try {
    const txData = await sickle.lp.withdraw(params)
    return txData
  } catch (error) {
    console.error('Failed to withdraw LP:', error)
    throw error
  }
}

/**
 * Exit LP position and convert to single token
 * @param {Object} params - Exit parameters
 * @param {number} params.chainId - Chain ID
 * @param {string} params.walletAddress - User wallet address
 * @param {string} params.farmAddress - Farm contract address
 * @param {string} params.poolAddress - Pool contract address
 * @param {string} params.tokenAddress - Token to exit to
 * @param {string} params.poolId - Pool ID
 * @param {bigint} params.amount - Amount to exit
 * @param {number} params.slippage - Slippage tolerance
 * @returns {Promise<Object>} Transaction data
 */
export async function exitLPToToken(params) {
  try {
    const txData = await sickle.lp.exit.toToken(params)
    return txData
  } catch (error) {
    console.error('Failed to exit LP to token:', error)
    throw error
  }
}

/**
 * NFT Position Management (Concentrated Liquidity)
 */

/**
 * Deposit existing NFT position to farm
 * @param {Object} params - Deposit parameters
 * @param {number} params.chainId - Chain ID
 * @param {string} params.walletAddress - User wallet address
 * @param {string} params.farmAddress - Farm contract address
 * @param {string} params.poolAddress - Pool contract address
 * @param {string} params.poolId - Pool ID
 * @param {bigint} params.nftId - NFT token ID
 * @param {Object} params.nftSettings - NFT position settings
 * @returns {Promise<Object>} Transaction data
 */
export async function depositNFT(params) {
  try {
    const txData = await sickle.nft.deposit(params)
    return txData
  } catch (error) {
    console.error('Failed to deposit NFT:', error)
    throw error
  }
}

/**
 * Create new NFT position from token
 * @param {Object} params - Deposit parameters
 * @param {number} params.chainId - Chain ID
 * @param {string} params.walletAddress - User wallet address
 * @param {string} params.farmAddress - Farm contract address
 * @param {string} params.poolAddress - Pool contract address
 * @param {string} params.tokenAddress - Token to deposit
 * @param {string} params.poolId - Pool ID
 * @param {bigint} params.amount - Amount of tokens
 * @param {number} params.slippage - Slippage tolerance
 * @param {number} params.addSlippage - Additional slippage
 * @param {number} params.minPricePercentage - Minimum price for range (0 for full range)
 * @param {number} params.maxPricePercentage - Maximum price for range (0 for full range)
 * @param {Object} params.nftSettings - NFT position settings
 * @returns {Promise<Object>} Transaction data
 */
export async function depositTokenToNFT(params) {
  try {
    const txData = await sickle.nft.depositToken(params)
    return txData
  } catch (error) {
    console.error('Failed to deposit token to NFT:', error)
    throw error
  }
}

/**
 * Harvest NFT position rewards
 * @param {Object} params - Harvest parameters
 * @param {number} params.chainId - Chain ID
 * @param {string} params.walletAddress - User wallet address
 * @param {string} params.farmAddress - Farm contract address
 * @param {string} params.poolAddress - Pool contract address
 * @param {string} params.poolIdHash - Pool ID hash
 * @param {string} params.poolId - Pool ID
 * @param {string} params.tokenAddress - Token to harvest to
 * @param {number} params.slippage - Slippage tolerance
 * @param {string} params.nftId - NFT token ID
 * @returns {Promise<Object>} Transaction data
 */
export async function harvestNFT(params) {
  try {
    const txData = await sickle.nft.harvest(params)
    return txData
  } catch (error) {
    console.error('Failed to harvest NFT rewards:', error)
    throw error
  }
}

/**
 * Compound NFT position rewards
 * @param {Object} params - Compound parameters
 * @param {number} params.chainId - Chain ID
 * @param {string} params.walletAddress - User wallet address
 * @param {string} params.farmAddress - Farm contract address
 * @param {string} params.poolAddress - Pool contract address
 * @param {string} params.poolIdHash - Pool ID hash
 * @param {string} params.poolId - Pool ID
 * @param {number} params.slippage - Slippage tolerance
 * @param {number} params.addSlippage - Additional slippage
 * @param {string} params.nftId - NFT token ID
 * @returns {Promise<Object>} Transaction data
 */
export async function compoundNFT(params) {
  try {
    const txData = await sickle.nft.compound(params)
    return txData
  } catch (error) {
    console.error('Failed to compound NFT rewards:', error)
    throw error
  }
}

/**
 * Rebalance NFT position to new price range
 * @param {Object} params - Rebalance parameters
 * @returns {Promise<Object>} Transaction data
 */
export async function rebalanceNFT(params) {
  try {
    const txData = await sickle.nft.rebalance(params)
    return txData
  } catch (error) {
    console.error('Failed to rebalance NFT position:', error)
    throw error
  }
}

/**
 * Utility Functions
 */

/**
 * Build position settings object for LP positions
 * @param {Object} config - Position configuration
 * @param {string} config.pool - Pool address
 * @param {string} config.router - Router address
 * @param {boolean} config.automateRewards - Enable auto rewards
 * @param {boolean} config.autoCompound - Enable auto compound (true) or harvest (false)
 * @param {string} config.harvestTokenOut - Token to harvest to (if not compounding)
 * @returns {Object} Position settings object
 */
export function buildPositionSettings(config) {
  return {
    pool: config.pool,
    router: config.router,
    automateRewards: config.automateRewards || false,
    rewardConfig: {
      rewardBehavior: config.autoCompound ? 1 : 0, // 0=harvest, 1=compound
      harvestTokenOut: config.harvestTokenOut || '0x0000000000000000000000000000000000000000',
    },
    autoExit: false,
    exitConfig: {
      baseTokenIndex: 0n,
      quoteTokenIndex: 1n,
      triggerPriceLow: 0n,
      exitTokenOutLow: '0x0000000000000000000000000000000000000000',
      triggerPriceHigh: 0n,
      exitTokenOutHigh: '0x0000000000000000000000000000000000000000',
      triggerReservesLow: [],
      triggerReservesTokensOut: [],
      priceImpactBP: 0n,
      slippageBP: 0n,
    },
    extraData: '0x',
  }
}

/**
 * Build NFT settings object for concentrated liquidity positions
 * @param {Object} config - NFT position configuration
 * @param {string} config.pool - Pool address
 * @param {string} config.poolId - Pool ID
 * @param {boolean} config.autoRebalance - Enable auto rebalancing
 * @param {boolean} config.automateRewards - Enable auto rewards
 * @param {boolean} config.autoCompound - Enable auto compound
 * @param {string} config.harvestTokenOut - Token to harvest to
 * @returns {Object} NFT settings object
 */
export function buildNFTSettings(config) {
  return {
    pool: config.pool,
    poolId: config.poolId || '0x0000000000000000000000000000000000000000000000000000000000000000',
    autoRebalance: config.autoRebalance || false,
    rebalanceConfig: {
      tickSpacesBelow: 10,
      tickSpacesAbove: 10,
      bufferTicksBelow: 5,
      bufferTicksAbove: 5,
      dustBP: '100', // 1%
      priceImpactBP: '300', // 3%
      slippageBP: '100', // 1%
      cutoffTickLow: -887220,
      cutoffTickHigh: 887220,
      delayMin: 300, // 5 minutes
      rewardConfig: {
        rewardBehavior: config.autoCompound ? 1 : 0,
        harvestTokenOut: config.harvestTokenOut || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      },
    },
    automateRewards: config.automateRewards || false,
    rewardConfig: {
      rewardBehavior: config.autoCompound ? 1 : 0,
      harvestTokenOut: config.harvestTokenOut || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    },
    autoExit: false,
    exitConfig: {
      triggerTickLow: 0,
      triggerTickHigh: 0,
      exitTokenOutLow: '0x0000000000000000000000000000000000000000',
      exitTokenOutHigh: '0x0000000000000000000000000000000000000000',
      priceImpactBP: 500n,
      slippageBP: 100n,
    },
    extraData: '0x',
  }
}

/**
 * Execute transaction using wallet
 * @param {Object} txData - Transaction data from SDK
 * @param {Object} wallet - Wallet instance (ethers or viem)
 * @returns {Promise<Object>} Transaction receipt
 */
export async function executeTransaction(txData, wallet) {
  // This is a placeholder - implement based on your wallet integration
  // For ethers.js:
  // const tx = await wallet.sendTransaction({
  //   to: txData.to,
  //   data: txData.data,
  //   value: txData.value,
  //   gasLimit: txData.gas
  // })
  // return await tx.wait()
  
  console.warn('executeTransaction needs to be implemented with your wallet integration')
  return null
}
