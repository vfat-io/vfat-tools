/**
 * Simple test to verify Sickle SDK integration
 * Run this in your browser console to test the SDK
 */

import { getSupportedChains, isSickleAvailable } from './index'
import { CHAIN_IDS } from './constants'

/**
 * Test basic SDK availability
 */
export async function testSDKAvailable() {
  console.log('Testing SDK availability...')
  const available = isSickleAvailable()
  console.log('SDK Available:', available)
  return available
}

/**
 * Test fetching supported chains
 */
export async function testGetChains() {
  console.log('Testing chain fetching...')
  try {
    const chains = await getSupportedChains()
    console.log(`✓ Found ${chains.length} supported chains`)
    
    // Test finding Base chain
    const baseChain = chains.find(c => c.chainId === CHAIN_IDS.BASE)
    if (baseChain) {
      console.log('✓ Base chain found:', baseChain.chainName)
    } else {
      console.warn('✗ Base chain not found')
    }
    
    return { success: true, chainCount: chains.length }
  } catch (error) {
    console.error('✗ Failed to fetch chains:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Run all tests
 */
export async function runAllTests() {
  console.log('=== Running Sickle SDK Integration Tests ===\n')
  
  const results = []
  
  // Test 1: SDK Availability
  const sdkTest = await testSDKAvailable()
  results.push({ test: 'SDK Availability', passed: sdkTest })
  
  // Test 2: Fetch Chains
  const chainsTest = await testGetChains()
  results.push({ test: 'Fetch Chains', passed: chainsTest.success })
  
  console.log('\n=== Test Results ===')
  results.forEach(r => {
    console.log(`${r.passed ? '✓' : '✗'} ${r.test}`)
  })
  
  const allPassed = results.every(r => r.passed)
  console.log(`\n${allPassed ? '✓ All tests passed!' : '✗ Some tests failed'}`)
  
  return results
}

// Export for use in console
export default {
  testSDKAvailable,
  testGetChains,
  runAllTests,
}
