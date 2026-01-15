// Shared Uniswap v4 helpers used by multiple chain pages.
//
// This module is bundled via `src/js/index.js` and exposed on:
//   window.Sickle.protocols.uniswapV4
//
// The chain page scripts under `src/static/js/*_uniswap_v4.js` are not ES modules,
// so they consume these helpers via `window`.

import { ethers } from 'ethers'
import * as ethcall from 'ethcall'

export function isLocalhostHostname(hostname) {
  const h = String(hostname || '').toLowerCase()
  return h === 'localhost' || h === '127.0.0.1' || h === '0.0.0.0'
}

export function defaultProxyBases() {
  // In prod, the proxy is reverse-proxied at /api/etherscan-v2.
  // In local dev, we *prefer* a locally-running proxy, but fall back to vfat.tools
  // so devs can still test without running the proxy.
  const hostname = (typeof window !== 'undefined' && window?.location?.hostname) || ''
  if (isLocalhostHostname(hostname)) {
    return ['http://127.0.0.1:8787/api/etherscan-v2', 'https://vfat.tools/api/etherscan-v2']
  }
  return ['/api/etherscan-v2']
}

export function defaultMoralisProxyBases() {
  // In prod, the proxy is reverse-proxied at /api/moralis/wallet-nfts.
  // In local dev, we *prefer* a locally-running proxy, but fall back to vfat.tools.
  const hostname = (typeof window !== 'undefined' && window?.location?.hostname) || ''
  if (isLocalhostHostname(hostname)) {
    return ['http://127.0.0.1:8787/api/moralis/wallet-nfts', 'https://vfat.tools/api/moralis/wallet-nfts']
  }
  return ['/api/moralis/wallet-nfts']
}

function chainIdToInt(chainId) {
  if (chainId == null) return NaN
  if (typeof chainId === 'number') return chainId
  const s = String(chainId).trim().toLowerCase()
  if (!s) return NaN
  if (s.startsWith('0x')) {
    const n = parseInt(s, 16)
    return Number.isFinite(n) ? n : NaN
  }
  const n = Number(s)
  return Number.isFinite(n) ? n : NaN
}

export async function fetchEtherscanV2ViaProxy(params, opts = {}, retry = 0) {
  const bases = Array.isArray(opts.bases) && opts.bases.length > 0 ? opts.bases : defaultProxyBases()

  const search = new URLSearchParams()
  for (const [k, v] of Object.entries(params || {})) {
    if (v === undefined || v === null || v === '') continue
    search.set(k, String(v))
  }
  console.log('fetchProxy', params)
  let lastErr = null
  for (const base of bases) {
    const url = `${String(base).replace(/\?$/u, '')}?${search.toString()}`
    try {
      const resp = await fetch(url, { method: 'GET' })
      if (!resp.ok) throw new Error(`Proxy request failed (${resp.status})`)
        const res = await resp.json()
    console.log('fetchProxy result', res)
        if (res?.result.length > 0)
            return res
        if( retry < 3 ) {
            console.log("retrying...", retry + 1)
            return await fetchEtherscanV2ViaProxy(params, opts, retry + 1)
        }
    } catch (e) {
      lastErr = e
    }
  }

  throw new Error(`Proxy request failed: ${lastErr?.message || lastErr}`)
}

export async function fetchMoralisWalletNftsViaProxy(params, opts = {}, retry = 0) {
  const bases = Array.isArray(opts.bases) && opts.bases.length > 0 ? opts.bases : defaultMoralisProxyBases()

  const search = new URLSearchParams()
  for (const [k, v] of Object.entries(params || {})) {
    if (v === undefined || v === null || v === '') continue
    if (Array.isArray(v)) {
      for (const item of v) {
        if (item === undefined || item === null || item === '') continue
        search.append(k, String(item))
      }
      continue
    }
    search.set(k, String(v))
  }

  let lastErr = null
  for (const base of bases) {
    const url = `${String(base).replace(/\?$/u, '')}?${search.toString()}`
    try {
      const resp = await fetch(url, { method: 'GET' })
      if (!resp.ok) throw new Error(`Proxy request failed (${resp.status})`)

      const res = await resp.json()
      return res
    } catch (e) {
      lastErr = e
    }
  }

  if (retry < 2) {
    return await fetchMoralisWalletNftsViaProxy(params, opts, retry + 1)
  }

  throw new Error(`Proxy request failed: ${lastErr?.message || lastErr}`)
}

export function normalizeAddress(a) {
  return (a || '').toLowerCase()
}

export function parseTokenIdFromNftTxRow(row) {
  // Etherscan-like fields vary slightly across endpoints/versions.
  const v = row?.tokenID ?? row?.tokenId ?? row?.tokenid ?? row?.tokenIDHex ?? row?.tokenIDhex
  if (v == null) return null
  try {
    return BigInt(String(v))
  } catch {
    return null
  }
}

export function parseTokenIdFromMoralisNftRow(row) {
  const v = row?.token_id ?? row?.tokenId ?? row?.tokenID
  if (v == null) return null
  try {
    return BigInt(String(v))
  } catch {
    return null
  }
}

export async function getOwnedErc721TokenIdsViaProxy({ chainId, contractAddress, ownerAddress, bases }) {
  // BSC (56): use Moralis-backed proxy because free-tier Etherscan v2 does not cover BSC.
  const chainIdInt = chainIdToInt(chainId)
  if (chainIdInt === 56) {
    const owned = new Set()
    let cursor = null

    while (true) {
      const data = await fetchMoralisWalletNftsViaProxy(
        {
          address: ownerAddress,
          chain: 'bsc',
          token_addresses: [contractAddress],
          cursor: cursor || undefined,
          limit: 100,
          exclude_spam: true,
        },
        { bases }
      )

      const rows = Array.isArray(data?.result) ? data.result : []
      for (const row of rows) {
        // Defensive: Moralis should already filter by token_addresses.
        if (normalizeAddress(row?.token_address) !== normalizeAddress(contractAddress)) continue
        const tokenId = parseTokenIdFromMoralisNftRow(row)
        if (tokenId === null) continue
        owned.add(tokenId.toString())
      }

      const nextCursor = data?.cursor
      if (!nextCursor || rows.length === 0) break
      cursor = nextCursor
    }

    return Array.from(owned)
      .map(x => BigInt(x))
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  }

  const owner = normalizeAddress(ownerAddress)
  const owned = new Set()

  const offset = 10000
  let page = 1

  while (true) {
    const data = await fetchEtherscanV2ViaProxy(
      {
        chainid: chainId,
        module: 'account',
        action: 'tokennfttx',
        address: ownerAddress,
        contractaddress: contractAddress,
        page,
        offset,
        sort: 'asc',
      },
      { bases }
    )

    const rows = Array.isArray(data?.result) ? data.result : []
    if (rows.length === 0) break

    for (const row of rows) {
      const from = normalizeAddress(row?.from)
      const to = normalizeAddress(row?.to)
      const tokenId = parseTokenIdFromNftTxRow(row)
      if (tokenId === null) continue

      if (to === owner) owned.add(tokenId.toString())
      if (from === owner) owned.delete(tokenId.toString())
    }

    if (rows.length < offset) break
    page++
  }

  return Array.from(owned)
    .map(x => BigInt(x))
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
}

export function decodeSignedIntN(unsigned, bits) {
  const u = BigInt(unsigned)
  const b = BigInt(bits)
  const signBit = 1n << (b - 1n)
  const mask = (1n << b) - 1n
  const v = u & mask
  return (v & signBit) !== 0n ? -((~v & mask) + 1n) : v
}

export function normalizePoolKey(poolKey) {
  if (!poolKey) return null
  // ethcall may return tuple as array-like or object-like.
  return {
    currency0: poolKey.currency0 ?? poolKey[0],
    currency1: poolKey.currency1 ?? poolKey[1],
    fee: poolKey.fee ?? poolKey[2],
    tickSpacing: poolKey.tickSpacing ?? poolKey[3],
    hooks: poolKey.hooks ?? poolKey[4],
  }
}

export function decodePositionInfo(infoU256) {
  // Verified packing (high -> low bits):
  // 200 bits poolId | 24 bits tickUpper | 24 bits tickLower | 8 bits hasSubscriber
  const info = BigInt(infoU256.toString())
  const tickLowerU = (info >> 8n) & ((1n << 24n) - 1n)
  const tickUpperU = (info >> (8n + 24n)) & ((1n << 24n) - 1n)

  const tickLower = Number(decodeSignedIntN(tickLowerU, 24))
  const tickUpper = Number(decodeSignedIntN(tickUpperU, 24))

  return { tickLower, tickUpper }
}

export function computeV4PoolIdBytes32(poolKey) {
  // Uniswap v4 poolId is keccak256(abi.encode(PoolKey))
  // PoolKey = (address currency0, address currency1, uint24 fee, int24 tickSpacing, address hooks)
  const coder = ethers.utils.defaultAbiCoder
  const encoded = coder.encode(
    ['tuple(address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks)'],
    [[poolKey.currency0, poolKey.currency1, poolKey.fee, poolKey.tickSpacing, poolKey.hooks]]
  )
  return ethers.utils.keccak256(encoded)
}

export function truncateDecimalString(valueStr, displayDecimals) {
  if (typeof valueStr !== 'string') return 'N/A'
  const s = valueStr.trim()
  if (!s) return 'N/A'

  if (displayDecimals <= 0) {
    return s.split('.')[0]
  }

  const [i, f = ''] = s.split('.')
  const frac = f.slice(0, displayDecimals)
  if (!frac) return i
  return `${i}.${frac}`.replace(/(\.\d*?[1-9])0+$/u, '$1').replace(/\.0+$/u, '')
}

export function toBigIntSafe(v) {
  if (v == null) return 0n
  if (typeof v === 'bigint') return v
  if (typeof v === 'number') return BigInt(Math.trunc(v))
  if (typeof v === 'object' && typeof v.toString === 'function') {
    return BigInt(v.toString())
  }
  return BigInt(String(v))
}

export function computeUnclaimedFeesFromGrowth({
  liquidity,
  feeGrowthInside0X128,
  feeGrowthInside1X128,
  feeGrowthInside0LastX128,
  feeGrowthInside1LastX128,
}) {
  const liq = toBigIntSafe(liquidity)
  if (liq <= 0n) return { fees0Raw: 0n, fees1Raw: 0n }

  const cur0 = toBigIntSafe(feeGrowthInside0X128)
  const cur1 = toBigIntSafe(feeGrowthInside1X128)
  const last0 = toBigIntSafe(feeGrowthInside0LastX128)
  const last1 = toBigIntSafe(feeGrowthInside1LastX128)

  const d0 = cur0 >= last0 ? cur0 - last0 : 0n
  const d1 = cur1 >= last1 ? cur1 - last1 : 0n

  const Q128 = 1n << 128n
  return {
    fees0Raw: (d0 * liq) / Q128,
    fees1Raw: (d1 * liq) / Q128,
  }
}

export function formatTokenAmountHtmlFromRaw(rawAmount, tokenDecimals) {
  if (rawAmount == null) return 'N/A'

  const formatFixedDecimals = (full, decimals) => {
    const [i, f = ''] = String(full || '0').split('.')
    if (decimals <= 0) return i
    const frac = f.padEnd(decimals, '0').slice(0, decimals)
    return `${i}.${frac}`
  }

  try {
    const dec = Number(tokenDecimals ?? 18)
    const full = ethers.utils.formatUnits(rawAmount.toString(), dec)

    // Compact small-number display with leading-zero subscript.
    const [i, f = ''] = String(full || '0').split('.')
    if (i === '0') {
      let z = 0
      while (z < f.length && f[z] === '0') z++
      const rest = f.slice(z)
      if (!rest) return '0'

      if (z >= 2) {
        const sig = rest.slice(0, 3)
        return `0.0<sub>${z}</sub>${sig}`
      }
    }

    if (Number.isFinite(dec) && dec <= 6) {
      return formatFixedDecimals(full, 3)
    }

    return truncateDecimalString(full, 4)
  } catch {
    return 'N/A'
  }
}

export async function getErc20MetaCached(
  App,
  cache,
  tokenAddress,
  _chainId,
  opts = {}
) {
  const nativeSymbol = opts.nativeSymbol || 'ETH'
  const nativeDecimals = Number(opts.nativeDecimals ?? 18)

  const a = (tokenAddress || '').toLowerCase()
  if (!a) return { symbol: '?', decimals: 18 }
  if (cache.has(a)) return cache.get(a)

  if (a === '0x0000000000000000000000000000000000000000') {
    const meta = { symbol: nativeSymbol, decimals: nativeDecimals }
    cache.set(a, meta)
    return meta
  }

  const abi = (typeof window !== 'undefined' && window?.ERC20_ABI) || [
    {
      inputs: [],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'decimals',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      stateMutability: 'view',
      type: 'function',
    },
  ]

  const c = new ethcall.Contract(tokenAddress, abi)
  try {
    const [symbol, decimals] = await App.ethcallProvider.all([c.symbol(), c.decimals()])
    const meta = { symbol, decimals: Number(decimals) }
    cache.set(a, meta)
    return meta
  } catch {
    const meta = { symbol: a.slice(0, 6) + '…' + a.slice(-4), decimals: 18 }
    cache.set(a, meta)
    return meta
  }
}

export async function getV4PoolSlot0(App, poolIdBytes32, stateViewAddress) {
  try {
    const stateView = new ethers.Contract(
      stateViewAddress,
      [
        'function getSlot0(bytes32) view returns (uint160 sqrtPriceX96, int24 tick, uint24 protocolFee, uint24 lpFee)',
        'function getSlot0(bytes32) view returns (uint160 sqrtPriceX96, int24 tick)',
      ],
      App.provider
    )

    const res = await stateView.getSlot0(poolIdBytes32)
    const sqrtPriceX96 = res?.sqrtPriceX96 ?? res?.[0]
    const tick = res?.tick ?? res?.[1]
    if (sqrtPriceX96 != null && tick != null) {
      return { sqrtPriceX96: BigInt(sqrtPriceX96.toString()), tick: Number(tick) }
    }
  } catch {
    return null
  }
}