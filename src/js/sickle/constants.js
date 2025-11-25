/**
 * Sickle SDK Constants
 * 
 * Shared constants and configuration for Sickle integration
 */

/**
 * Special token addresses
 */
export const NATIVE_TOKEN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

/**
 * Reward behaviors
 */
export const REWARD_BEHAVIOR = {
  NONE: 0,
  HARVEST: 0,
  COMPOUND: 1,
}

/**
 * Default slippage settings (in percentage)
 */
export const DEFAULT_SLIPPAGE = 0.5 // 0.5%
export const DEFAULT_ADD_SLIPPAGE = 90 // 0.9% additional slippage

/**
 * Price range settings for NFT positions
 */
export const PRICE_RANGE = {
  FULL_RANGE: {
    minPricePercentage: 0,
    maxPricePercentage: 0,
  },
  NARROW: {
    minPricePercentage: 90, // 90% of current price
    maxPricePercentage: 110, // 110% of current price
  },
  MEDIUM: {
    minPricePercentage: 80,
    maxPricePercentage: 120,
  },
  WIDE: {
    minPricePercentage: 70,
    maxPricePercentage: 130,
  },
}

/**
 * Default rebalance config for NFT positions
 */
export const DEFAULT_REBALANCE_CONFIG = {
  tickSpacesBelow: 10,
  tickSpacesAbove: 10,
  bufferTicksBelow: 5,
  bufferTicksAbove: 5,
  dustBP: '100', // 1%
  priceImpactBP: '300', // 3%
  slippageBP: '100', // 1%
  cutoffTickLow: -887220,
  cutoffTickHigh: 887220,
  delayMin: 300, // 5 minutes between rebalances
}

/**
 * Default exit config for positions
 */
export const DEFAULT_EXIT_CONFIG_LP = {
  baseTokenIndex: 0n,
  quoteTokenIndex: 1n,
  triggerPriceLow: 0n,
  exitTokenOutLow: ZERO_ADDRESS,
  triggerPriceHigh: 0n,
  exitTokenOutHigh: ZERO_ADDRESS,
  triggerReservesLow: [],
  triggerReservesTokensOut: [],
  priceImpactBP: 0n,
  slippageBP: 0n,
}

export const DEFAULT_EXIT_CONFIG_NFT = {
  triggerTickLow: 0,
  triggerTickHigh: 0,
  exitTokenOutLow: ZERO_ADDRESS,
  exitTokenOutHigh: ZERO_ADDRESS,
  priceImpactBP: 500n, // 5%
  slippageBP: 100n, // 1%
}

/**
 * Supported chain IDs (common ones)
 * Refer to SDK's getSupportedChains() for complete list
 */
export const CHAIN_IDS = {
  ETHEREUM: 1,
  GOERLI: 5,
  OPTIMISM: 10,
  CRONOS: 25,
  BSC: 56,
  GNOSIS: 100,
  POLYGON: 137,
  SONIC: 146,
  FANTOM: 250,
  BOBA: 288,
  ZKSYNC: 324,
  METIS: 1088,
  POLYGON_ZKEVM: 1101,
  CORE: 1116,
  MOONBEAM: 1284,
  MOONRIVER: 1285,
  KAVA: 2222,
  FRAXTAL: 4460,
  MANTLE: 5000,
  CANTO: 7700,
  BASE: 8453,
  ARBITRUM: 42161,
  ARBITRUM_NOVA: 42170,
  CELO: 42220,
  AVALANCHE: 43114,
  LINEA: 59144,
  BLAST: 81457,
  SCROLL: 534352,
  AURORA: 1313161554,
  HARMONY_S0: 1666600000,
}

/**
 * Gas estimation buffer multiplier
 */
export const GAS_BUFFER_MULTIPLIER = 1.5 // 150% of estimated gas

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  SDK_NOT_AVAILABLE: 'Sickle SDK is not available',
  INVALID_CHAIN: 'Invalid or unsupported chain ID',
  INVALID_ADDRESS: 'Invalid wallet or contract address',
  INSUFFICIENT_BALANCE: 'Insufficient balance for transaction',
  SLIPPAGE_TOO_HIGH: 'Slippage tolerance exceeded',
  TRANSACTION_FAILED: 'Transaction execution failed',
  API_ERROR: 'API call failed',
}

/**
 * Transaction status
 */
export const TX_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  FAILED: 'failed',
}

/**
 * Position types
 */
export const POSITION_TYPE = {
  LP: 'lp',
  NFT: 'nft',
}

/**
 * Operation types
 */
export const OPERATION_TYPE = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
  HARVEST: 'harvest',
  COMPOUND: 'compound',
  INCREASE: 'increase',
  DECREASE: 'decrease',
  REBALANCE: 'rebalance',
  EXIT: 'exit',
}
