/**
 * Sickle SDK Rebalance Integration
 * 
 * Automatically rebalances NFT positions to current price while preserving the original margin settings
 */

import { OperationType, initializeWalletProvider, encodeTransactionData, simulateTransaction, sendTransaction, waitForTransaction, handleTransactionReceipt } from './utils.js'

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
    const { walletAddress, provider, chainId } = await initializeWalletProvider()
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

    console.log('🔄 Rebalancing NFT #' + nftId)
    console.log('Current position: ticks', currentTickLower, 'to', currentTickUpper)
    console.log('Current pool tick:', currentTick)
    console.log('Position width:', positionWidthPercent.toFixed(2) + '%')
    console.log('Position status:', rangeStatus)
    console.log('Original position margins: -' + marginLowerPercent.toFixed(2) + '% / +' + marginUpperPercent.toFixed(2) + '%')
    console.log('Tick spacing:', tickSpacing)

    // Show confirmation dialog
    const confirmMessage = `Rebalance NFT #${nftId} ${rangeStatus}?
Width: ${positionWidthPercent.toFixed(2)}%
Margins: -${marginLowerPercent.toFixed(2)}% / +${marginUpperPercent.toFixed(2)}%

Proceed with rebalance?`

    if (!confirm(confirmMessage)) {
      console.log('Rebalance cancelled by user')
      return
    }

    // Note: SDK may add internal adjustments, but we pass the raw calculated margins
    // The min/max represent the lower and upper margins from current tick
    const adjustedMaxMargin = marginUpperPercent
    
    console.log('Calculated margins: -' + marginLowerPercent.toFixed(2) + '% / +' + marginUpperPercent.toFixed(2) + '%')
    console.log('Passing to SDK: min:', marginLowerPercent, 'max:', adjustedMaxMargin)

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

    // Uniswap v4: pass bytes32 poolId hash (SDK uses this for quotes)
    if (poolData.poolId) {
      nftPoolConfig.poolId = String(poolData.poolId)
    }

    const nftPool = new window.Sickle.NftPool(nftPoolConfig)
    
    console.log('Creating NftPool with poolData:', poolData)
    console.log('NftPool instance created:', {
      chainId: nftPool.chainId,
      address: nftPool.address,
      poolAddress: nftPool.poolAddress,
      poolIndex: nftPool.poolIndex,
      poolId: nftPool.poolId
    })

    const callData = await nftPool
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
    alert(`Error: ${error.message}`)
  } finally {
    hideLoading()
  }
}

export default {
  rebalance
}

