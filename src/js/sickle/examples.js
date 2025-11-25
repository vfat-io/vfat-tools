/**
 * Sickle SDK Usage Examples
 * 
 * Example code showing how to use the Sickle SDK integration in vfat-tools
 */

import { sickle, getSupportedChains, deploySickleContract } from './index'
import {
  depositLP,
  depositTokenToLP,
  harvestLP,
  compoundLP,
  withdrawLP,
  exitLPToToken,
  depositNFT,
  depositTokenToNFT,
  harvestNFT,
  compoundNFT,
  rebalanceNFT,
  buildPositionSettings,
  buildNFTSettings,
} from './helpers'
import {
  CHAIN_IDS,
  NATIVE_TOKEN_ADDRESS,
  DEFAULT_SLIPPAGE,
  DEFAULT_ADD_SLIPPAGE,
  PRICE_RANGE,
} from './constants'

/**
 * Example 1: Get Supported Chains
 */
export async function exampleGetChains() {
  console.log('=== Getting Supported Chains ===')
  
  try {
    const chains = await getSupportedChains()
    console.log(`Found ${chains.length} supported chains`)
    
    // Find Base chain info
    const baseChain = chains.find(c => c.chainId === CHAIN_IDS.BASE)
    if (baseChain) {
      console.log('Base Chain Info:', {
        name: baseChain.chainName,
        nativeCurrency: baseChain.nativeCurrency.symbol,
        rpcUrls: baseChain.rpcUrls[0],
      })
    }
    
    return chains
  } catch (error) {
    console.error('Failed to get chains:', error)
  }
}

/**
 * Example 2: Deploy a Sickle Contract
 */
export async function exampleDeploySickle(walletAddress) {
  console.log('=== Deploying Sickle Contract ===')
  
  try {
    const chainId = CHAIN_IDS.BASE
    const factoryAddress = '0x...' // Replace with actual factory address
    
    const txData = await deploySickleContract(
      chainId,
      factoryAddress,
      null, // No automation
      'vfat-tools' // Referral code
    )
    
    console.log('Deploy transaction ready:', txData)
    console.log('To:', txData.address)
    console.log('Data:', txData.data)
    console.log('Estimated Gas:', txData.gas)
    
    // Execute with your wallet integration
    // const receipt = await executeTransaction(txData, wallet)
    
    return txData
  } catch (error) {
    console.error('Failed to deploy Sickle:', error)
  }
}

/**
 * Example 3: Deposit LP Tokens with Auto-Compound
 */
export async function exampleDepositLP(walletAddress, poolInfo) {
  console.log('=== Depositing LP Tokens ===')
  
  try {
    const positionSettings = buildPositionSettings({
      pool: poolInfo.poolAddress,
      router: poolInfo.routerAddress,
      automateRewards: true,
      autoCompound: true, // Auto-compound rewards
      harvestTokenOut: NATIVE_TOKEN_ADDRESS,
    })
    
    const params = {
      chainId: CHAIN_IDS.BASE,
      walletAddress: walletAddress,
      farmAddress: poolInfo.farmAddress,
      poolAddress: poolInfo.poolAddress,
      poolId: poolInfo.poolId || '0',
      amount: BigInt('1000000000000000000'), // 1 LP token
      positionSettings: positionSettings,
    }
    
    const txData = await depositLP(params)
    console.log('Deposit transaction ready:', txData)
    
    return txData
  } catch (error) {
    console.error('Failed to deposit LP:', error)
  }
}

/**
 * Example 4: Zap Single Token into LP Position
 */
export async function exampleZapToLP(walletAddress, poolInfo, tokenAddress, amount) {
  console.log('=== Zapping Token to LP ===')
  
  try {
    const positionSettings = buildPositionSettings({
      pool: poolInfo.poolAddress,
      router: poolInfo.routerAddress,
      automateRewards: true,
      autoCompound: true,
      harvestTokenOut: NATIVE_TOKEN_ADDRESS,
    })
    
    const params = {
      chainId: CHAIN_IDS.BASE,
      walletAddress: walletAddress,
      farmAddress: poolInfo.farmAddress,
      poolAddress: poolInfo.poolAddress,
      tokenAddress: tokenAddress || NATIVE_TOKEN_ADDRESS, // ETH or token
      poolId: poolInfo.poolId || '0',
      amount: BigInt(amount),
      slippage: DEFAULT_SLIPPAGE,
      addSlippage: DEFAULT_ADD_SLIPPAGE,
      positionSettings: positionSettings,
    }
    
    const txData = await depositTokenToLP(params)
    console.log('Zap transaction ready:', txData)
    
    return txData
  } catch (error) {
    console.error('Failed to zap to LP:', error)
  }
}

/**
 * Example 5: Harvest LP Rewards
 */
export async function exampleHarvestLP(walletAddress, poolInfo, expectedReward) {
  console.log('=== Harvesting LP Rewards ===')
  
  try {
    const params = {
      chainId: CHAIN_IDS.BASE,
      walletAddress: walletAddress,
      farmAddress: poolInfo.farmAddress,
      poolAddress: poolInfo.poolAddress,
      poolId: poolInfo.poolId || '0',
      tokenAddress: NATIVE_TOKEN_ADDRESS, // Harvest to ETH
      amount: expectedReward || '100000000000000000', // Expected reward
      slippage: DEFAULT_SLIPPAGE,
    }
    
    const txData = await harvestLP(params)
    console.log('Harvest transaction ready:', txData)
    
    return txData
  } catch (error) {
    console.error('Failed to harvest LP:', error)
  }
}

/**
 * Example 6: Compound LP Rewards
 */
export async function exampleCompoundLP(walletAddress, poolInfo) {
  console.log('=== Compounding LP Rewards ===')
  
  try {
    const params = {
      chainId: CHAIN_IDS.BASE,
      walletAddress: walletAddress,
      farmAddress: poolInfo.farmAddress,
      poolAddress: poolInfo.poolAddress,
      poolId: poolInfo.poolId || '0',
      amount: '100000000000000000', // Reward amount
      slippage: DEFAULT_SLIPPAGE,
      addSlippage: DEFAULT_ADD_SLIPPAGE,
    }
    
    const txData = await compoundLP(params)
    console.log('Compound transaction ready:', txData)
    
    return txData
  } catch (error) {
    console.error('Failed to compound LP:', error)
  }
}

/**
 * Example 7: Create NFT Position (Concentrated Liquidity)
 */
export async function exampleCreateNFTPosition(walletAddress, poolInfo, tokenAddress, amount) {
  console.log('=== Creating NFT Position ===')
  
  try {
    const nftSettings = buildNFTSettings({
      pool: poolInfo.poolAddress,
      poolId: poolInfo.poolId || '0x0000000000000000000000000000000000000000000000000000000000000000',
      autoRebalance: true, // Enable auto-rebalancing
      automateRewards: true,
      autoCompound: true,
      harvestTokenOut: NATIVE_TOKEN_ADDRESS,
    })
    
    const params = {
      chainId: CHAIN_IDS.BASE,
      walletAddress: walletAddress,
      farmAddress: poolInfo.farmAddress,
      poolAddress: poolInfo.poolAddress,
      tokenAddress: tokenAddress || NATIVE_TOKEN_ADDRESS,
      poolId: poolInfo.poolId || '0',
      amount: BigInt(amount),
      slippage: DEFAULT_SLIPPAGE,
      addSlippage: DEFAULT_ADD_SLIPPAGE,
      minPricePercentage: PRICE_RANGE.MEDIUM.minPricePercentage,
      maxPricePercentage: PRICE_RANGE.MEDIUM.maxPricePercentage,
      nftSettings: nftSettings,
    }
    
    const txData = await depositTokenToNFT(params)
    console.log('NFT position creation transaction ready:', txData)
    
    return txData
  } catch (error) {
    console.error('Failed to create NFT position:', error)
  }
}

/**
 * Example 8: Harvest NFT Position Rewards
 */
export async function exampleHarvestNFT(walletAddress, poolInfo, nftId) {
  console.log('=== Harvesting NFT Rewards ===')
  
  try {
    const params = {
      chainId: CHAIN_IDS.BASE,
      walletAddress: walletAddress,
      farmAddress: poolInfo.farmAddress,
      poolAddress: poolInfo.poolAddress,
      poolIdHash: poolInfo.poolIdHash || '0x...',
      poolId: poolInfo.poolId || '0',
      tokenAddress: NATIVE_TOKEN_ADDRESS,
      slippage: DEFAULT_SLIPPAGE,
      nftId: nftId.toString(),
    }
    
    const txData = await harvestNFT(params)
    console.log('NFT harvest transaction ready:', txData)
    
    return txData
  } catch (error) {
    console.error('Failed to harvest NFT:', error)
  }
}

/**
 * Example 9: Compound NFT Position Rewards
 */
export async function exampleCompoundNFT(walletAddress, poolInfo, nftId) {
  console.log('=== Compounding NFT Rewards ===')
  
  try {
    const params = {
      chainId: CHAIN_IDS.BASE,
      walletAddress: walletAddress,
      farmAddress: poolInfo.farmAddress,
      poolAddress: poolInfo.poolAddress,
      poolIdHash: poolInfo.poolIdHash || '0x...',
      poolId: poolInfo.poolId || '0',
      slippage: DEFAULT_SLIPPAGE,
      addSlippage: DEFAULT_ADD_SLIPPAGE,
      nftId: nftId.toString(),
    }
    
    const txData = await compoundNFT(params)
    console.log('NFT compound transaction ready:', txData)
    
    return txData
  } catch (error) {
    console.error('Failed to compound NFT:', error)
  }
}

/**
 * Example 10: Integration with vfat-tools Pool Info
 * 
 * This example shows how you might integrate Sickle SDK
 * with existing vfat-tools pool data structures
 */
export async function exampleIntegrationWithVfatPool(App, poolData) {
  console.log('=== Integration with vfat-tools ===')
  
  try {
    // Assuming poolData has the structure from vfat-tools
    const walletAddress = App.YOUR_ADDRESS
    const chainId = poolData.chainId || CHAIN_IDS.BASE
    
    // Example: Add "Deposit with Sickle" button functionality
    const depositWithSickle = async (amount) => {
      const positionSettings = buildPositionSettings({
        pool: poolData.address,
        router: poolData.router || '0x...', // Get from pool data
        automateRewards: true,
        autoCompound: true,
        harvestTokenOut: NATIVE_TOKEN_ADDRESS,
      })
      
      const params = {
        chainId: chainId,
        walletAddress: walletAddress,
        farmAddress: poolData.stakingAddress || poolData.address,
        poolAddress: poolData.address,
        tokenAddress: poolData.token0.address || NATIVE_TOKEN_ADDRESS,
        poolId: poolData.poolId || '0',
        amount: BigInt(amount),
        slippage: DEFAULT_SLIPPAGE,
        addSlippage: DEFAULT_ADD_SLIPPAGE,
        positionSettings: positionSettings,
      }
      
      return await depositTokenToLP(params)
    }
    
    // Example: Add "Harvest with Sickle" button functionality
    const harvestWithSickle = async () => {
      const params = {
        chainId: chainId,
        walletAddress: walletAddress,
        farmAddress: poolData.stakingAddress || poolData.address,
        poolAddress: poolData.address,
        poolId: poolData.poolId || '0',
        tokenAddress: NATIVE_TOKEN_ADDRESS,
        amount: poolData.earned || '0', // Use earned amount from pool data
        slippage: DEFAULT_SLIPPAGE,
      }
      
      return await harvestLP(params)
    }
    
    return {
      depositWithSickle,
      harvestWithSickle,
    }
  } catch (error) {
    console.error('Integration error:', error)
  }
}

/**
 * Example Usage in Console:
 * 
 * // Import the examples
 * import * as SickleExamples from './sickle/examples'
 * 
 * // Get supported chains
 * const chains = await SickleExamples.exampleGetChains()
 * 
 * // Deploy Sickle contract
 * const deployTx = await SickleExamples.exampleDeploySickle('0xYourAddress')
 * 
 * // Deposit to LP
 * const depositTx = await SickleExamples.exampleDepositLP('0xYourAddress', poolInfo)
 * 
 * // Harvest rewards
 * const harvestTx = await SickleExamples.exampleHarvestLP('0xYourAddress', poolInfo)
 */

export default {
  exampleGetChains,
  exampleDeploySickle,
  exampleDepositLP,
  exampleZapToLP,
  exampleHarvestLP,
  exampleCompoundLP,
  exampleCreateNFTPosition,
  exampleHarvestNFT,
  exampleCompoundNFT,
  exampleIntegrationWithVfatPool,
}
