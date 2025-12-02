/**
 * Sickle SDK Integration
 * 
 * Provides access to Sickle protocol's DeFi position management features:
 * - NFT position management (concentrated liquidity) - NftPool
 * - LP position management (regular liquidity pools) - Pool
 * - Automated rebalancing (see rebalance.js)
 */

import { sickle, NftPool, Pool, QuoteAPI } from '@vfat-io/sickle-sdk'
import * as SickleUtils from './utils.js'
import * as lpWithdraw from './lp-withdraw.js'
import * as lpCompound from './lp-compound.js'

/**
 * Export SDK components and utilities
 */
export { sickle, NftPool, Pool, QuoteAPI, SickleUtils, lpWithdraw, lpCompound }
