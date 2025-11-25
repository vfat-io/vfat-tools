/**
 * Calculate token amounts from a Uniswap V3 position
 * @param {string|bigint|number} currentSqrtPrice - Current pool sqrt price (sqrtPriceX96)
 * @param {Object} position - Position data
 * @param {number} position.tickLow - Lower tick bound (can be tickLower from contract)
 * @param {number} position.tickUp - Upper tick bound (can be tickUpper from contract)
 * @param {string|bigint|number} position.liquidity - Position liquidity
 * @returns {Object} { liquidity0: bigint, liquidity1: bigint }
 */

const Q96 = BigInt('79228162514264337593543950336') // 2^96
const Q192 = BigInt('6277101735386680763835789423207666416102355444464034512896') // 2^192

export function calculateUserLiquidity(currentSqrtPrice, position) {

  const liquidityBig = BigInt(position.liquidity.toString()) * Q96
  
  const tickLow = Number(position.tickLow ?? position.tickLower)
  const tickUp = Number(position.tickUp ?? position.tickUpper)
  
  const minSqrtPrice = getSqrtRatioAtTick(tickLow)
  const maxSqrtPrice = getSqrtRatioAtTick(tickUp)

  let currentSqrtQ96Price = BigInt(currentSqrtPrice.toString())
  
  if (currentSqrtQ96Price < minSqrtPrice) {
    currentSqrtQ96Price = minSqrtPrice
  } else if (currentSqrtQ96Price > maxSqrtPrice) {
    currentSqrtQ96Price = maxSqrtPrice
  }

  const liquidity0 = (liquidityBig * (maxSqrtPrice - currentSqrtQ96Price)) / (maxSqrtPrice * currentSqrtQ96Price)
  const liquidity1 = (liquidityBig * (currentSqrtQ96Price - minSqrtPrice)) / Q192

  return { liquidity0, liquidity1 }
}

export function getSqrtRatioAtTick(tick) {
  const sqrtPrice = Math.sqrt(1.0001 ** tick)
  const sqrtPriceX96 = sqrtPrice * Number(Q96)
  return BigInt(Math.floor(sqrtPriceX96))
}

export default {
  calculateUserLiquidity,
  getSqrtRatioAtTick
}
