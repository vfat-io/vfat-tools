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

    // SDK adds +1 tick internally to upper bound, so we subtract 1 tick to compensate
    const adjustedMaxMargin = Math.max(0, marginUpperPercent - tickSpacing * 0.01)
    
    console.log('Calculated margins: -' + marginLowerPercent.toFixed(2) + '% / +' + marginUpperPercent.toFixed(2) + '%')
    console.log('Passing to SDK: min:', marginLowerPercent, 'max:', adjustedMaxMargin, '(adjusted -' + (tickSpacing * 0.01).toFixed(2) + '% for SDK)')

    // Use NftPool fluent API - SDK needs to be updated to accept separate farm/pool addresses
    const nftPool = new window.Sickle.NftPool({
      chainId: chainId,
      address: poolData.stakingAddress,     // MasterChef/Gauge address (farm)
      poolAddress: poolData.poolAddress,    // V3 Pool address (for API call)
      poolId: poolData.pid ? String(poolData.pid) : '0'  // Pool ID (or 0 for Velodrome)
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

