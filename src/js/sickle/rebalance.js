/**
 * Sickle SDK Rebalance Integration
 * 
 * Automatically rebalances NFT positions to current price while preserving the original margin settings
 */

import { OperationType, describeError, initializeWalletProvider, encodeTransactionData, simulateTransaction, sendTransaction, waitForTransaction, handleTransactionReceipt, normalizeSicklePoolId } from './utils.js'
import { canSwapLocallyFor, buildRebalance } from './builder.js'

/**
 * Rebalance an NFT position to center it around the current price
 * while maintaining the user's original margin configuration
 * 
 * @param {Object} poolData - Pool information including stakingAddress, poolAddress, tickSpacing
 * @param {string|number} nftId - NFT position ID
 * @param {number} currentTickLower - Current position's lower tick
 * @param {number} currentTickUpper - Current position's upper tick
 * @param {number} currentTick - Current pool tick (price)
 */
export async function rebalance(poolData, nftId, currentTickLower, currentTickUpper, currentTick) {
  try {
    showLoading()
    
    // Initialize wallet and provider
    const { walletAddress, provider, chainId } = await initializeWalletProvider(false)
    const tickSpacing = poolData.tickSpacing || 1

    // Calculate the actual position width (distance between bounds)
    const positionWidthTicks = currentTickUpper - currentTickLower
    const positionWidthPercent = positionWidthTicks * 0.01
    
    // Check if position is in range
    const isInRange = currentTick >= currentTickLower && currentTick < currentTickUpper
    const rangeStatus = isInRange ? '✅ In Range' : '⚠️ Out of Range'
    
    // Calculate margin ratio based on vfat.io's nftTickBounds logic
    // This preserves the original asymmetric configuration
    const positionTickWidth = positionWidthTicks / tickSpacing
    let tickSpacesAbove, tickSpacesBelow
    
    if (isInRange) {
      // Position is in range: calculate from current tick position
      tickSpacesBelow = Math.floor((currentTick - currentTickLower) / tickSpacing)
      tickSpacesAbove = Math.ceil((currentTickUpper - currentTick) / tickSpacing)
      
    } else {
      // Position is out of range: use symmetric distribution
      tickSpacesBelow = Math.floor(positionTickWidth / 2)
      tickSpacesAbove = Math.ceil(positionTickWidth / 2)
    }
    
    const marginLowerTicks = tickSpacesBelow * tickSpacing
    const marginUpperTicks = tickSpacesAbove * tickSpacing
    
    const marginLowerPercent = marginLowerTicks * 0.01
    const marginUpperPercent = marginUpperTicks * 0.01

    // The quote API (and the local builder) puts the upper tick one spacing above the current one, so
    // without this the new range would be one spacing wider than the old one and become a `move`.
    const adjustedMaxMargin = Math.max(0, marginUpperPercent - tickSpacing * 0.01)

    console.log('🔄 Rebalancing NFT #' + nftId)
    console.log('Current position: ticks', currentTickLower, 'to', currentTickUpper)
    console.log('Current pool tick:', currentTick)
    console.log('Position width:', positionWidthPercent.toFixed(2) + '%')
    console.log('Position status:', rangeStatus)
    console.log('Original position margins: -' + marginLowerPercent.toFixed(2) + '% / +' + marginUpperPercent.toFixed(2) + '% (upper margin passed as +' + adjustedMaxMargin.toFixed(2) + '%)')
    console.log('Tick spacing:', tickSpacing)

    // Show confirmation dialog
    const confirmMessage = `Rebalance NFT #${nftId} ${rangeStatus}?
Width: ${positionWidthPercent.toFixed(2)}%
New range: -${marginLowerPercent.toFixed(2)}% / +${adjustedMaxMargin.toFixed(2)}% around the current price

Proceed with rebalance?`

    if (!confirm(confirmMessage)) {
      console.log('Rebalance cancelled by user')
      return
    }

    // The min/max represent the lower and upper margins from the current tick
    console.log('Passing margins: min:', marginLowerPercent, 'max:', adjustedMaxMargin)

    let callData
    if (canSwapLocallyFor(chainId, poolData)) {
      try {
        callData = await buildRebalance({
          chainId, poolData, nftId, provider,
          minPricePercentage: marginLowerPercent,
          maxPricePercentage: adjustedMaxMargin
        })
      } catch (error) {
        if (!window.Sickle?.NftPool) throw error
        console.warn('Local rebalance build failed, falling back to the Sickle SDK:', error)
      }
    }
    if (!callData) callData = await sdkRebalanceCallData(poolData, chainId, nftId, marginLowerPercent, adjustedMaxMargin, walletAddress)

    // Encode transaction data
    const encodedData = encodeTransactionData(callData)

    // Simulate and send transaction
    await simulateTransaction(provider, walletAddress, callData, encodedData)
    const tx = await sendTransaction(provider, walletAddress, callData, encodedData)

    console.log(`Rebalance transaction submitted!\n\nTx Hash: ${tx}\n\nWaiting for confirmation...`)

    // Wait for confirmation
    const receipt = await waitForTransaction(provider, tx)
    
    // Handle receipt and show messages
    handleTransactionReceipt(receipt, tx, OperationType.REBALANCE)

  } catch (error) {
    console.error('Rebalance failed:', error)
    alert(`Error: ${await describeError(error)}`)
  } finally {
    hideLoading()
  }
}

async function sdkRebalanceCallData(poolData, chainId, nftId, marginLowerPercent, adjustedMaxMargin, walletAddress) {
  if (!window.Sickle?.NftPool) {
    throw new Error('This action needs the Sickle SDK. Open the page with ?api=true.')
  }

  // Use NftPool fluent API - SDK needs to be updated to accept separate farm/pool addresses
  // Create NftPool instance
  // For Velodrome/Aerodrome (gauge-based): Don't pass poolIndex at all
  // For PancakeSwap V3 (MasterChef-based): Pass numeric poolIndex (PID)
  const nftPoolConfig = {
    chainId: chainId,
    address: poolData.stakingAddress,     // MasterChef/Gauge address (farm)
    poolAddress: poolData.poolAddress,    // V3 Pool address (for API call)
    nftManagerAddress: poolData.nftManagerAddress,  // NFT Position Manager address
    // Note: poolIndex intentionally omitted for Velodrome (poolData.pid is undefined)
    ...(poolData.pid !== undefined && poolData.pid !== null && { poolIndex: Number(poolData.pid) })
  }

  // Always pass a poolId value for quote API compatibility.
  // For most CL protocols: "0". For Uniswap v4: bytes32 hash.
  nftPoolConfig.poolId = normalizeSicklePoolId(poolData.poolId)

  const nftPool = new window.Sickle.NftPool(nftPoolConfig)
  
  console.log('Creating NftPool with poolData:', poolData)
  console.log('NftPool instance created:', {
    chainId: nftPool.chainId,
    address: nftPool.address,
    poolAddress: nftPool.poolAddress,
    poolIndex: nftPool.poolIndex,
    poolId: nftPool.poolId
  })

  return await nftPool
    .rebalance({
      nftId: Number(nftId),
      pricePercentageMargin: {
        min: marginLowerPercent,   // minPricePercentage
        max: adjustedMaxMargin     // maxPricePercentage
      }
    })
    .getCallData(walletAddress)
    .catch(error => {
      console.error('API call failed with error:', error)
      if (error.response) {
        console.error('API response status:', error.response.status)
        console.error('API response data:', error.response.data)
      }
      throw error
    })
}

export default {
  rebalance
}

