import http from 'node:http'
import { URL } from 'node:url'

// NOTE: This server intentionally relies on environment variables provided via
// `process.env` (e.g. systemd EnvironmentFile=...).
// No .env parsing/loading happens in this file.

// Minimal Etherscan v2 proxy.
// - Keeps ETHERSCAN_API_KEY on the server
// - Avoids shipping it to the browser bundle
// - Validates allowed module/action to avoid becoming an open proxy

const PORT = Number(process.env.PORT || 8787)
const HOST = process.env.HOST || '127.0.0.1'

const ETHERSCAN_V2_API_URL = 'https://api.etherscan.io/v2/api'
// Snowtrace uses an Etherscan-like API for Avalanche.
// Docs link (may be behind JS/WAF): https://snowtrace.io/documentation/api/etherscan-like/accounts
// Default upstream base for the Etherscan-like endpoint:
//   https://api.snowtrace.io/api
const SNOWTRACE_API_URL = process.env.SNOWTRACE_API_URL || 'https://api.snowtrace.io/api'

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''
const SNOWTRACE_API_KEY = process.env.SNOWTRACE_API_KEY || ''

// Position lookup upstream. Configured here rather than in the page so the
// browser only ever talks to vfat.tools and the upstream stays server-side.
const POSITIONS_API_URL = process.env.POSITIONS_API_URL || ''
const POSITIONS_API_KEY = process.env.POSITIONS_API_KEY || ''

if (!ETHERSCAN_API_KEY) {
  console.warn('[proxy] ETHERSCAN_API_KEY is not set. Non-AVAX requests will fail.')
}

if (!SNOWTRACE_API_KEY) {
  console.warn('[proxy] SNOWTRACE_API_KEY is not set. AVAX (43114) requests will fail.')
}

// Alchemy NFT API, for chains the Etherscan free plan does not cover (e.g. Base).
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || ''

// chainId -> Alchemy network subdomain. Only these chains are proxied.
const ALCHEMY_NETWORKS = new Map([
  ['1', 'eth-mainnet'],
  ['10', 'opt-mainnet'],
  ['56', 'bnb-mainnet'],
  ['130', 'unichain-mainnet'],
  ['137', 'polygon-mainnet'],
  ['8453', 'base-mainnet'],
  ['42161', 'arb-mainnet'],
  ['43114', 'avax-mainnet'],
])

// Upper bound on Alchemy pages per request (100 NFTs each), so one call can't fan out.
const ALCHEMY_MAX_PAGES = 10

if (!POSITIONS_API_URL) {
  console.warn('[proxy] POSITIONS_API_URL is not set. /api/positions will report 501.')
}

if (!ALCHEMY_API_KEY) {
  console.warn('[proxy] ALCHEMY_API_KEY is not set. /api/nfts will report 501.')
}

const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/u

// KyberSwap aggregator, for Sickle swaps built in the browser (src/js/sickle/swap.js).
// chainId -> KyberSwap chain slug. Only chains whose Sickle ConnectorRegistry whitelists
// the KyberSwap router, and that KyberSwap serves, are proxied.
const KYBER_API_URL = 'https://aggregator-api.kyberswap.com'
const KYBER_CLIENT_ID = process.env.KYBER_CLIENT_ID || 'vfat-tools'
const KYBER_CHAINS = new Map([
  ['1', 'ethereum'],
  ['10', 'optimism'],
  ['56', 'bsc'],
  ['130', 'unichain'],
  ['137', 'polygon'],
  ['143', 'monad'],
  ['146', 'sonic'],
  ['999', 'hyperevm'],
  ['4663', 'robinhood'],
  ['8453', 'base'],
  ['9745', 'plasma'],
  ['42161', 'arbitrum'],
  ['42793', 'etherlink'],
  ['43114', 'avalanche'],
  ['59144', 'linea'],
])
const UINT_RE = /^[1-9][0-9]{0,76}$/u
// Slippage tolerance in basis points; the quote API uses 50 (0.5%).
const MAX_SLIPPAGE_BPS = 500

const ALLOWED = new Set([
  // What we currently need for base_uniswap_v4.js
  'account:tokennfttx',
])

function sendJson(res, statusCode, obj) {
  const body = JSON.stringify(obj)
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(body)
}

function pick(q, key, { required = false } = {}) {
  const v = q.get(key)
  if (required && (v == null || v === '')) throw new Error(`Missing required query param: ${key}`)
  return v
}

function isAvaxChainId(chainid) {
  // normalize: allow "43114" or "0xa86a" etc
  const s = String(chainid).trim().toLowerCase()
  if (s === '43114') return true
  if (s.startsWith('0x')) {
    try {
      return parseInt(s, 16) === 43114
    } catch {
      return false
    }
  }
  return false
}

const server = http.createServer(async (req, res) => {
  try {
    // Basic CORS for same-origin setups; adjust if you need cross-origin.
    res.setHeader('access-control-allow-origin', '*')
    res.setHeader('access-control-allow-methods', 'GET, OPTIONS')
    res.setHeader('access-control-allow-headers', 'content-type')

    if (req.method === 'OPTIONS') {
      res.writeHead(204)
      res.end()
      return
    }

    if (req.method !== 'GET') {
      sendJson(res, 405, { error: 'Method not allowed' })
      return
    }

    const url = new URL(req.url, `http://${req.headers.host}`)

    // Health check
    if (url.pathname === '/healthz') {
      sendJson(res, 200, { ok: true })
      return
    }

    // Position lookup, used as the last automatic tier of the v4 NFT lookup on
    // chains the Etherscan plan does not cover.
    // Example:
    //   /api/positions?address=0x...
    if (url.pathname === '/api/positions') {
      if (!POSITIONS_API_URL) {
        sendJson(res, 501, { error: 'Position lookup is not configured on this proxy' })
        return
      }

      // Missing and malformed are both the caller's fault, so answer 400 rather
      // than letting a thrown required-param error surface as a 500.
      const address = url.searchParams.get('address') || ''
      if (!/^0x[0-9a-fA-F]{40}$/u.test(address)) {
        sendJson(res, 400, { error: 'address must be a 0x-prefixed 20-byte address' })
        return
      }

      const upstream = new URL(POSITIONS_API_URL)
      upstream.searchParams.set('addresses', address)

      const headers = { accept: 'application/json' }
      if (POSITIONS_API_KEY) headers.authorization = `Bearer ${POSITIONS_API_KEY}`

      const upstreamResp = await fetch(upstream.toString(), { method: 'GET', headers })
      const text = await upstreamResp.text()

      res.writeHead(upstreamResp.status, {
        'content-type': upstreamResp.headers.get('content-type') || 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      })
      res.end(text)
      return
    }

    // NFT ids an owner holds in one collection, via Alchemy's NFT API.
    // Used as the first tier of the v4 NFT lookup.
    // Example:
    //   /api/nfts?chainid=8453&owner=0x...&contract=0x...
    // Response: { ids: ["123", ...] }
    if (url.pathname === '/api/nfts') {
      if (!ALCHEMY_API_KEY) {
        sendJson(res, 501, { error: 'NFT lookup is not configured on this proxy' })
        return
      }

      const chainid = String(url.searchParams.get('chainid') || '').trim()
      const network = ALCHEMY_NETWORKS.get(chainid)
      if (!network) {
        sendJson(res, 400, { error: `Unsupported chainid: ${chainid}` })
        return
      }

      const owner = url.searchParams.get('owner') || ''
      const contract = url.searchParams.get('contract') || ''
      if (!ADDRESS_RE.test(owner) || !ADDRESS_RE.test(contract)) {
        sendJson(res, 400, { error: 'owner and contract must be 0x-prefixed 20-byte addresses' })
        return
      }

      const ids = []
      let pageKey = null
      for (let page = 0; page < ALCHEMY_MAX_PAGES; page++) {
        const upstream = new URL(`https://${network}.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner`)
        upstream.searchParams.set('owner', owner)
        upstream.searchParams.append('contractAddresses[]', contract)
        upstream.searchParams.set('withMetadata', 'false')
        upstream.searchParams.set('pageSize', '100')
        if (pageKey) upstream.searchParams.set('pageKey', pageKey)

        const upstreamResp = await fetch(upstream.toString(), { headers: { accept: 'application/json' } })
        if (!upstreamResp.ok) {
          // Never echo the upstream URL: it carries the key.
          sendJson(res, 502, { error: `NFT upstream failed (${upstreamResp.status})` })
          return
        }

        const data = await upstreamResp.json()
        for (const nft of data?.ownedNfts || []) {
          if (nft?.tokenId != null) ids.push(String(nft.tokenId))
        }

        pageKey = data?.pageKey
        if (!pageKey) break
      }

      sendJson(res, 200, { ids })
      return
    }

    // Swap route + calldata for one Sickle swap, via KyberSwap (routes, then route/build).
    // The swap runs from the Sickle, so it is both sender and recipient.
    // Example:
    //   /api/swap-quote?chainid=42161&tokenIn=0x...&tokenOut=0x...&amountIn=1000&sender=0x...&slippageBps=50
    // Response: { aggregator, router, tokenIn, tokenOut, amountIn, amountOut, minAmountOut,
    //             amountInUsd, amountOutUsd, data }
    if (url.pathname === '/api/swap-quote') {
      const q = url.searchParams
      const chainid = String(q.get('chainid') || '').trim()
      const slug = KYBER_CHAINS.get(chainid)
      if (!slug) {
        sendJson(res, 400, { error: `Unsupported chainid: ${chainid}` })
        return
      }

      const tokenIn = q.get('tokenIn') || ''
      const tokenOut = q.get('tokenOut') || ''
      const sender = q.get('sender') || ''
      if (![tokenIn, tokenOut, sender].every(a => ADDRESS_RE.test(a)) || tokenIn.toLowerCase() === tokenOut.toLowerCase()) {
        sendJson(res, 400, { error: 'tokenIn, tokenOut and sender must be distinct 0x-prefixed 20-byte addresses' })
        return
      }

      const amountIn = q.get('amountIn') || ''
      if (!UINT_RE.test(amountIn)) {
        sendJson(res, 400, { error: 'amountIn must be a positive integer (raw token units)' })
        return
      }

      const slippageBps = Number(q.get('slippageBps') || 50)
      if (!Number.isInteger(slippageBps) || slippageBps < 1 || slippageBps > MAX_SLIPPAGE_BPS) {
        sendJson(res, 400, { error: `slippageBps must be an integer from 1 to ${MAX_SLIPPAGE_BPS}` })
        return
      }

      const headers = { accept: 'application/json', 'x-client-id': KYBER_CLIENT_ID }
      // A route can go stale between routes and route/build ("quoted amount is smaller than estimated"),
      // so a failed build re-fetches the routes and builds again, up to 2 extra attempts.
      const routes = new URL(`${KYBER_API_URL}/${slug}/api/v1/routes`)
      routes.searchParams.set('tokenIn', tokenIn)
      routes.searchParams.set('tokenOut', tokenOut)
      routes.searchParams.set('amountIn', amountIn)
      let routeSummary
      let built
      for (let attempt = 0; attempt < 3; attempt++) {
        const routesResp = await fetch(routes.toString(), { headers })
        const routesJson = await routesResp.json().catch(() => null)
        routeSummary = routesJson?.data?.routeSummary
        if (!routesResp.ok || !routeSummary) {
          sendJson(res, 502, { error: `No swap route (${routesJson?.message || routesResp.status})` })
          return
        }

        const buildResp = await fetch(`${KYBER_API_URL}/${slug}/api/v1/route/build`, {
          method: 'POST',
          headers: { ...headers, 'content-type': 'application/json' },
          body: JSON.stringify({ routeSummary, sender, recipient: sender, slippageTolerance: slippageBps }),
        })
        const buildJson = await buildResp.json().catch(() => null)
        built = buildJson?.data
        if (buildResp.ok && built?.data && built?.routerAddress) break
        if (attempt === 2) {
          sendJson(res, 502, { error: `Swap build failed (${buildJson?.message || buildResp.status})` })
          return
        }
      }

      const amountOut = BigInt(routeSummary.amountOut)
      sendJson(res, 200, {
        aggregator: 'kyber',
        router: built.routerAddress,
        tokenIn: routeSummary.tokenIn,
        tokenOut: routeSummary.tokenOut,
        amountIn: routeSummary.amountIn,
        amountOut: amountOut.toString(),
        minAmountOut: ((amountOut * BigInt(10000 - slippageBps)) / 10000n).toString(),
        amountInUsd: Number(routeSummary.amountInUsd) || null,
        amountOutUsd: Number(routeSummary.amountOutUsd) || null,
        data: built.data,
      })
      return
    }

    // Main proxy endpoint
    // Example:
    //   /api/etherscan-v2?chainid=8453&module=account&action=tokennfttx&address=...&contractaddress=...
    if (url.pathname !== '/api/etherscan-v2') {
      sendJson(res, 404, { error: 'Not found' })
      return
    }

    const q = url.searchParams

    const chainid = pick(q, 'chainid', { required: true })
    const module = pick(q, 'module', { required: true })
    const action = pick(q, 'action', { required: true })

    const key = `${module}:${action}`
    if (!ALLOWED.has(key)) {
      sendJson(res, 400, { error: `Unsupported Etherscan call: ${key}` })
      return
    }

    const useSnowtrace = isAvaxChainId(chainid)

    // Rebuild URL to upstream and inject server-side key.
    // - AVAX (43114): Snowtrace Etherscan-like
    // - other chains: Etherscan v2
    const upstream = new URL(useSnowtrace ? SNOWTRACE_API_URL : ETHERSCAN_V2_API_URL)

    // Copy through only the params we expect.
    // (This prevents someone using your endpoint as a general-purpose proxy.)
    if (!useSnowtrace) {
      upstream.searchParams.set('chainid', chainid)
    }
    upstream.searchParams.set('module', module)
    upstream.searchParams.set('action', action)

    // Optional params for tokennfttx
    for (const k of [
      'contractaddress',
      'address',
      'page',
      'offset',
      'startblock',
      'endblock',
      'sort',
    ]) {
      const v = q.get(k)
      if (v != null && v !== '') upstream.searchParams.set(k, v)
    }

    upstream.searchParams.set('apikey', useSnowtrace ? SNOWTRACE_API_KEY : ETHERSCAN_API_KEY)

    const upstreamResp = await fetch(upstream.toString(), { method: 'GET' })
    const text = await upstreamResp.text()

    res.writeHead(upstreamResp.status, {
      'content-type': upstreamResp.headers.get('content-type') || 'application/json; charset=utf-8',
      // You can tune caching here. For now: no-store.
      'cache-control': 'no-store',
    })
    res.end(text)
  } catch (e) {
    sendJson(res, 500, { error: String(e?.message || e) })
  }
})

server.listen(PORT, HOST, () => {
  console.log(`[proxy] listening on http://${HOST}:${PORT}`)
})
