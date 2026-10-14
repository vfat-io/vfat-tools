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

/**
 * Compute real unclaimed fees of a Uniswap V3 position (tokensOwed + pending fee growth)
 * All inputs may be ethers BigNumber / string / number / bigint.
 * @returns {Object} { fees0Raw: bigint, fees1Raw: bigint }
 */
const Q128 = 1n << 128n
const MOD256 = 1n << 256n

export function computeUnclaimedFees({
  currentTick, tickLower, tickUpper, liquidity,
  feeGrowthGlobal0X128, feeGrowthGlobal1X128,
  lower, upper,
  feeGrowthInside0LastX128, feeGrowthInside1LastX128,
  tokensOwed0, tokensOwed1
}) {
  const big = (x) => BigInt(x.toString())
  const sub = (a, b) => (((a - b) % MOD256) + MOD256) % MOD256
  const ct = Number(currentTick), tl = Number(tickLower), tu = Number(tickUpper)
  const liq = big(liquidity)

  const fees = (global, lowerOutside, upperOutside, insideLast, owed) => {
    const g = big(global)
    const below = ct >= tl ? big(lowerOutside) : sub(g, big(lowerOutside))
    const above = ct < tu ? big(upperOutside) : sub(g, big(upperOutside))
    const inside = sub(sub(g, below), above)
    return big(owed) + (liq * sub(inside, big(insideLast))) / Q128
  }

  return {
    fees0Raw: fees(feeGrowthGlobal0X128, lower.feeGrowthOutside0X128, upper.feeGrowthOutside0X128, feeGrowthInside0LastX128, tokensOwed0),
    fees1Raw: fees(feeGrowthGlobal1X128, lower.feeGrowthOutside1X128, upper.feeGrowthOutside1X128, feeGrowthInside1LastX128, tokensOwed1)
  }
}

/**
 * Format a token amount for labels. Amounts below 0.01 use the same compact
 * leading-zero subscript as the Uniswap v4 pages (0.000214 -> 0.0<sub>3</sub>214),
 * so small fees on high-value tokens (e.g. BTC) don't round to 0.0000.
 * @returns {string} HTML
 */
export function formatTokenAmount(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return 'N/A'
  if (n === 0) return '0'
  if (n >= 0.01) return n.toFixed(4)

  // toExponential rounds to 3 significant digits: 0.0072 -> "7.20e-3"
  const [mantissa, exp] = n.toExponential(2).split('e')
  if (Number(exp) >= -2) return n.toFixed(4) // rounded up to 0.01
  const zeros = -Number(exp) - 1
  return `0.0<sub>${zeros}</sub>${mantissa.replace('.', '')}`
}

export default {
  calculateUserLiquidity,
  getSqrtRatioAtTick,
  computeUnclaimedFees,
  formatTokenAmount
}
