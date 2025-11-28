/**
 * Sickle SDK Integration
 * 
 * Provides access to Sickle protocol's DeFi position management features:
 * - NFT position management (concentrated liquidity)
 * - Automated rebalancing (see rebalance.js)
 */

import { sickle, NftPool, QuoteAPI } from '@vfat-io/sickle-sdk'
import * as SickleUtils from './utils.js'

/**
 * Export SDK components and utilities
 */
export { sickle, NftPool, QuoteAPI, SickleUtils }
