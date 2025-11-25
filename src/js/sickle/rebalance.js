/**
 * Sickle SDK Rebalance Integration
 * 
 * Automatically rebalances NFT positions to current price while preserving the original margin settings
 */

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
    
    if (!window.appKit?.getAddress()) {
      alert('Please connect your wallet first')
      return
    }

    if (!window.Sickle?.NftPool) {
      alert('Sickle SDK not loaded. Please refresh the page.')
      return
    }

    const walletAddress = window.appKit.getAddress()
    const provider = await window.appKit.getWalletProvider()
    const chainIdHex = await provider.request({ method: 'eth_chainId' })
    const chainId = parseInt(chainIdHex, 16)
    const tickSpacing = poolData.tickSpacing || 1

    // Calculate the actual position width (distance between bounds)
    const positionWidthTicks = currentTickUpper - currentTickLower
    const positionWidthPercent = positionWidthTicks * 0.01
    
    // Check if position is in range
    const isInRange = currentTick >= currentTickLower && currentTick < currentTickUpper
    const rangeStatus = isInRange ? '✅ In Range' : '⚠️ Out of Range'
    
    // Calculate margin ratio based on vfat.io's nftTickBounds logic
    // This preserves the original asymmetric configuration
    const positionTickWidth = positionWidthTicks / tickSpacing - 1
    let tickSpacesAbove, tickSpacesBelow
    
    if (isInRange) {
      // Position is in range: calculate from current tick position
      tickSpacesAbove = (currentTickUpper - (currentTick + tickSpacing)) / tickSpacing
      tickSpacesBelow = (currentTick - currentTickLower) / tickSpacing
    } else {
      // Position is out of range: use symmetric distribution
      tickSpacesAbove = Math.floor(positionTickWidth / 2)
      tickSpacesBelow = Math.ceil(positionTickWidth / 2)
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
    const confirmMessage = `Rebalance NFT Position #${nftId} (${rangeStatus})

Current Position:
• Ticks: ${currentTickLower} to ${currentTickUpper}
• Current Tick: ${currentTick}
• Position Width: ${positionWidthPercent.toFixed(2)}%

New Position:
• Position width: ${positionWidthPercent.toFixed(2)}%
• Margins: -${marginLowerPercent.toFixed(2)}% / +${marginUpperPercent.toFixed(2)}%

Proceed with rebalance?`

    if (!confirm(confirmMessage)) {
      console.log('Rebalance cancelled by user')
      return
    }

    // Create NftPool instance
    // The constructor expects an object with { chainId, address, poolId }
    const nftPool = new window.Sickle.NftPool({
      chainId: chainId,
      address: poolData.stakingAddress,
      poolId: poolData.stakingAddress
    })
    
    console.log('Creating NftPool with:', {
      chainId,
      address: poolData.stakingAddress,
      poolId: poolData.stakingAddress
    })

    // SDK expects upper margin to be 1 tick less (it adds +1 internally)
    const adjustedMaxMargin = Math.max(0, marginUpperPercent - tickSpacing * 0.01)
    
    console.log('Calculated margins: -' + marginLowerPercent.toFixed(2) + '% / +' + marginUpperPercent.toFixed(2) + '%')
    console.log('Passing to SDK: min:', marginLowerPercent, 'max:', adjustedMaxMargin, '(adjusted -' + (tickSpacing * 0.01).toFixed(2) + '% for SDK)')

    // Create rebalance action with adjusted margins
    const rebalanceAction = nftPool.rebalance({
      nftId: Number(nftId),
      pricePercentageMargin: { 
        min: marginLowerPercent,  // Distance below current tick
        max: adjustedMaxMargin    // Distance above current tick (adjusted -1 tick for SDK)
      },
    })    // Get transaction call data from SDK
    const callData = await rebalanceAction.getCallData(walletAddress)

    // Encode transaction data
    const encodedData = window.viem.encodeFunctionData({
      abi: callData.abi,
      functionName: callData.functionName,
      args: callData.args,
    })

    // Simulate transaction before sending
    try {
      await provider.request({
        method: 'eth_call',
        params: [{
          from: walletAddress,
          to: callData.address,
          data: encodedData,
          value: callData.value || '0x0',
        }, 'latest'],
      })
    } catch (simError) {
      console.error('❌ Simulation failed:', simError)
      alert(`❌ Transaction would fail: ${simError.message || 'Unknown error'}\n\nCheck console for details.`)
      return
    }

    // Send transaction
    const tx = await provider.request({
      method: 'eth_sendTransaction',
      params: [{
        from: walletAddress,
        to: callData.address,
        data: encodedData,
        value: callData.value || '0x0',
      }],
    })

    console.log(`Rebalance transaction submitted!\n\nTx Hash: ${tx}\n\nWaiting for confirmation...`)

    // Wait for confirmation
    const receipt = await waitForTransaction(provider, tx)
    
    if (receipt.status === '0x1') {
      console.log('✅ Rebalance successful!')
      alert(`✅ Position rebalanced successfully!\n\nTx Hash: ${tx}`)
      setTimeout(() => location.reload(), 2000)
    } else {
      console.error('❌ Transaction failed')
      alert(`❌ Transaction failed. Check block explorer for details.\n\nTx Hash: ${tx}`)
    }

  } catch (error) {
    console.error('Rebalance failed:', error)
    alert(`Error: ${error.message}`)
  } finally {
    hideLoading()
  }
}

/**
 * Wait for transaction confirmation
 */
async function waitForTransaction(provider, txHash, maxAttempts = 60) {
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

export default {
  rebalance
}
