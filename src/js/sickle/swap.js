/**
 * Swap routes for locally built Sickle actions
 *
 * Quotes come from the KyberSwap aggregator through our proxy (server/proxy.mjs /api/swap-quote),
 * never from quote.vfat.io. Sickle only executes swaps through routers its ConnectorRegistry
 * whitelists, so a route is rejected unless it targets the whitelisted KyberSwap router.
 */

import { encodeAbiParameters, zeroAddress } from 'viem'

export const NATIVE_TOKEN = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

/** Slippage the quote API uses for these actions (0.5%). */
export const DEFAULT_SLIPPAGE_BPS = 50

// The quote API's default price impact limit (DEFAULT_PRICE_IMPACT_LIMIT_PCT).
const MAX_PRICE_IMPACT_PCT = 90

// KyberSwap MetaAggregationRouterV2, the same address on every chain.
const KYBER_ROUTER = '0x6131b5fae19ea4f9d964eac0408e4408b66337b5'

/**
 * Chains whose Sickle ConnectorRegistry whitelists the KyberSwap router (hasConnector, checked
 * 2026-10-21) and that KyberSwap serves. Must match KYBER_CHAINS in server/proxy.mjs.
 */
const KYBER_CHAINS = new Set([1, 10, 56, 130, 137, 143, 146, 999, 4663, 8453, 9745, 42161, 42793, 43114, 59144])

const AGGREGATOR_EXTRA_DATA_ABI = [{ type: 'tuple', components: [{ name: 'data', type: 'bytes' }] }]

/**
 * Whether swaps can be routed without the quote API on this chain
 * @param {number} chainId - Chain ID
 * @returns {boolean}
 */
export function canSwapLocally(chainId) {
  return KYBER_CHAINS.has(Number(chainId))
}

/**
 * Quote one swap executed by the Sickle (sender and recipient)
 * @param {Object} params - { chainId, tokenIn, tokenOut, amountIn (bigint), sender, slippageBps }
 * @returns {Promise<Object>} { router, tokenIn, tokenOut, amountIn, amountOut, minAmountOut (bigints), amountInUsd, amountOutUsd, data }
 */
export async function quoteSwap({ chainId, tokenIn, tokenOut, amountIn, sender, slippageBps = DEFAULT_SLIPPAGE_BPS }) {
  if (!canSwapLocally(chainId)) throw new Error(`No whitelisted swap aggregator for chain ${chainId}`)

  const query = new URLSearchParams({
    chainid: String(Number(chainId)),
    tokenIn,
    tokenOut,
    amountIn: amountIn.toString(),
    sender,
    slippageBps: String(slippageBps),
  })
  const quote = await fetchFromProxy(query)

  const route = {
    router: String(quote.router).toLowerCase(),
    tokenIn: String(quote.tokenIn).toLowerCase(),
    tokenOut: String(quote.tokenOut).toLowerCase(),
    amountIn: BigInt(quote.amountIn),
    amountOut: BigInt(quote.amountOut),
    minAmountOut: BigInt(quote.minAmountOut),
    amountInUsd: quote.amountInUsd,
    amountOutUsd: quote.amountOutUsd,
    data: quote.data,
  }

  if (route.router !== KYBER_ROUTER) throw new Error(`Swap route uses a router Sickle does not whitelist: ${route.router}`)
  if (route.tokenIn !== tokenIn.toLowerCase() || route.tokenOut !== tokenOut.toLowerCase() || route.amountIn !== BigInt(amountIn)) {
    throw new Error('Swap route does not match the requested swap')
  }
  if (route.amountInUsd > 0 && route.amountOutUsd !== null
    && (route.amountInUsd - route.amountOutUsd) / route.amountInUsd * 100 > MAX_PRICE_IMPACT_PCT) {
    throw new Error(`Swap price impact too high: $${route.amountInUsd} in, $${route.amountOutUsd} out`)
  }
  return route
}

/**
 * NftFarmStrategy SwapParams for a quoted route. The AggregatorConnector forwards extraData.data to the router.
 * @param {Object} route - From quoteSwap
 * @returns {Object} SwapParams
 */
export function swapParams(route) {
  return {
    tokenApproval: route.router,
    router: route.router,
    amountIn: route.amountIn,
    desiredAmountOut: route.amountOut,
    minAmountOut: route.minAmountOut,
    tokenIn: route.tokenIn === NATIVE_TOKEN ? zeroAddress : route.tokenIn,
    tokenOut: route.tokenOut === NATIVE_TOKEN ? zeroAddress : route.tokenOut,
    extraData: encodeAbiParameters(AGGREGATOR_EXTRA_DATA_ABI, [{ data: route.data }]),
  }
}

// Same shape as the other proxy routes: in local dev prefer a locally running proxy, then vfat.tools.
function proxyBases() {
  const hostname = (typeof window !== 'undefined' && window?.location?.hostname) || ''
  if (['localhost', '127.0.0.1', '0.0.0.0'].includes(hostname.toLowerCase())) {
    const protocol = window.location.protocol || 'http:'
    return [`${protocol}//${hostname}:8787/api/swap-quote`, 'https://vfat.tools/api/swap-quote']
  }
  return ['/api/swap-quote']
}

async function fetchFromProxy(query) {
  let lastError
  for (const base of proxyBases()) {
    try {
      const resp = await fetch(`${base}?${query}`, { headers: { accept: 'application/json' } })
      const body = await resp.json().catch(() => null)
      if (resp.ok && body?.data) return body
      // A 4xx/502 answer is the proxy's verdict on this swap; another base would give the same.
      if (body?.error) throw Object.assign(new Error(`Swap quote failed: ${body.error}`), { final: true })
      lastError = new Error(`Swap quote failed (${resp.status})`)
    } catch (e) {
      if (e.final) throw e
      lastError = e
    }
  }
  throw lastError
}
