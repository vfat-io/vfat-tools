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

if (!ETHERSCAN_API_KEY) {
  console.warn('[proxy] ETHERSCAN_API_KEY is not set. Non-AVAX requests will fail.')
}

if (!SNOWTRACE_API_KEY) {
  console.warn('[proxy] SNOWTRACE_API_KEY is not set. AVAX (43114) requests will fail.')
}

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
