
$(function() {
  consoleInit(main)
})

const SWEEP_ABI = [
  {
    inputs: [
      {internalType: 'address[]', name: 'tokens', type: 'address[]'},
      {internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]'},
    ],
    name: 'sweepErc721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const SICKLE_FACTORY_ABI = [
  {
    inputs: [{internalType: 'address', name: 'admin', type: 'address'}],
    name: 'sickles',
    outputs: [{internalType: 'address', name: 'sickle', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
]

const UNISWAP_POSITION_MANAGER_V4 = [
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'getPositionLiquidity',
    outputs: [{internalType: 'uint128', name: 'liquidity', type: 'uint128'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'getPoolAndPositionInfo',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'currency0', type: 'address' },
          { internalType: 'address', name: 'currency1', type: 'address' },
          { internalType: 'uint24', name: 'fee', type: 'uint24' },
          { internalType: 'int24', name: 'tickSpacing', type: 'int24' },
          { internalType: 'address', name: 'hooks', type: 'address' },
        ],
        internalType: 'struct PoolKey',
        name: 'poolKey',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'info', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const UNISWAP_STATE_VIEW_V4 = [
  {
    inputs: [
      { internalType: 'bytes32', name: 'poolId', type: 'bytes32' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'int24', name: 'tickLower', type: 'int24' },
      { internalType: 'int24', name: 'tickUpper', type: 'int24' },
      { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
    ],
    name: 'getPositionInfo',
    outputs: [
      { internalType: 'uint128', name: 'liquidity', type: 'uint128' },
      { internalType: 'uint256', name: 'feeGrowthInside0LastX128', type: 'uint256' },
      { internalType: 'uint256', name: 'feeGrowthInside1LastX128', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'poolId', type: 'bytes32' },
      { internalType: 'int24', name: 'tickLower', type: 'int24' },
      { internalType: 'int24', name: 'tickUpper', type: 'int24' },
    ],
    name: 'getFeeGrowthInside',
    outputs: [
      { internalType: 'uint256', name: 'feeGrowthInside0X128', type: 'uint256' },
      { internalType: 'uint256', name: 'feeGrowthInside1X128', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const nft_manager_address_v4 = '0x7C5f5A4bBd8fD63184577525326123B519429bDc'
const pool_manager_address_v4 = '0x498581fF718922c3f8e6A244956aF099B2652b2b'
// Uniswap v4 Base deployments (8453): https://docs.uniswap.org/contracts/v4/deployments
// Reading current tick/sqrtPrice is done via StateView, not PoolManager.
const state_view_address_v4 = '0xa3c0c9b65bad0b08107aa264b0f3db444b867a71'
const sickle_factory_address = '0x71D234A3e1dfC161cc1d081E6496e76627baAc31'
const sweep_address = '0xF8818D5D3c9Ac1F80Bd14664202DBe5bed872a72'

// Base providers frequently limit eth_getLogs range/size; use Basescan (Etherscan v2) via our server proxy.
// The proxy is expected at /api/etherscan-v2 (reverse-proxied in prod). In local dev you can run the proxy on 127.0.0.1:8787.
const BASE_CHAIN_ID = 8453

async function fetchEtherscanV2ViaProxy(params) {
  const search = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue
    search.set(k, String(v))
  }

  let path = ''
  const isLocalhost =
    window?.location?.hostname === 'localhost' ||
    window?.location?.hostname === '127.0.0.1' ||
    window?.location?.hostname === '0.0.0.0'

    isLocalhost ? path = `https://vfat.tools/api/etherscan-v2?${search.toString()}` : path = `/api/etherscan-v2?${search.toString()}`

    console.log('Fetching via proxy:', path)
  
    try {
      const resp = await fetch(path, { method: 'GET' })
      if (!resp.ok) throw new Error(`Proxy request failed (${resp.status})`)
      return await resp.json()
    } catch (e) {
      throw new Error(`Proxy request failed: ${e?.message || e}`)
    }
}

function normalizeAddress(a) {
  return (a || '').toLowerCase()
}

function parseTokenIdFromNftTxRow(row) {
  // Etherscan/Basescan fields vary slightly across endpoints/versions.
  const v = row?.tokenID ?? row?.tokenId ?? row?.tokenid ?? row?.tokenIDHex ?? row?.tokenIDhex
  if (v == null) return null
  try {
    return BigInt(String(v))
  } catch {
    return null
  }
}

function decodeSignedIntN(unsigned, bits) {
  const u = BigInt(unsigned)
  const b = BigInt(bits)
  const signBit = 1n << (b - 1n)
  const mask = (1n << b) - 1n
  const v = u & mask
  return (v & signBit) !== 0n ? -((~v & mask) + 1n) : v
}

function normalizePoolKey(poolKey) {
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

function decodePositionInfo(infoU256) {
  // Verified packing (high -> low bits):
  // 200 bits poolId | 24 bits tickUpper | 24 bits tickLower | 8 bits hasSubscriber
  const info = BigInt(infoU256.toString())
  const tickLowerU = (info >> 8n) & ((1n << 24n) - 1n)
  const tickUpperU = (info >> (8n + 24n)) & ((1n << 24n) - 1n)

  const tickLower = Number(decodeSignedIntN(tickLowerU, 24))
  const tickUpper = Number(decodeSignedIntN(tickUpperU, 24))

  return { tickLower, tickUpper }
}

function computeV4PoolIdBytes32(poolKey) {
  // Uniswap v4 poolId is keccak256(abi.encode(PoolKey))
  // PoolKey = (address currency0, address currency1, uint24 fee, int24 tickSpacing, address hooks)
  const coder = ethers.utils.defaultAbiCoder
  const encoded = coder.encode(
    ['tuple(address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks)'],
    [[poolKey.currency0, poolKey.currency1, poolKey.fee, poolKey.tickSpacing, poolKey.hooks]]
  )
  return ethers.utils.keccak256(encoded)
}

function truncateDecimalString(valueStr, displayDecimals) {
  if (typeof valueStr !== 'string') return 'N/A'
  const s = valueStr.trim()
  if (!s) return 'N/A'

  if (displayDecimals <= 0) {
    return s.split('.')[0]
  }

  const [i, f = ''] = s.split('.')
  const frac = f.slice(0, displayDecimals)
  if (!frac) return i
  // Trim trailing zeros and an optional trailing decimal point
  return `${i}.${frac}`.replace(/(\.\d*?[1-9])0+$/u, '$1').replace(/\.0+$/u, '')
}

function toBigIntSafe(v) {
  if (v == null) return 0n
  if (typeof v === 'bigint') return v
  if (typeof v === 'number') return BigInt(Math.trunc(v))
  // ethers BigNumber
  if (typeof v === 'object' && typeof v.toString === 'function') {
    return BigInt(v.toString())
  }
  return BigInt(String(v))
}

function computeUnclaimedFeesFromGrowth({
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

  // Clamp deltas defensively (should normally always be >= 0)
  const d0 = cur0 >= last0 ? cur0 - last0 : 0n
  const d1 = cur1 >= last1 ? cur1 - last1 : 0n

  const Q128 = 1n << 128n
  return {
    fees0Raw: (d0 * liq) / Q128,
    fees1Raw: (d1 * liq) / Q128,
  }
}

function formatTokenAmountHtmlFromRaw(rawAmount, tokenDecimals) {
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
    // Example: 0.00004204 -> 0.0<sub>4</sub>204  (shows next 3 significant digits)
    const [i, f = ''] = String(full || '0').split('.')
    if (i === '0') {
      let z = 0
      while (z < f.length && f[z] === '0') z++
      const rest = f.slice(z)
      if (!rest) return '0'

      // Only use the compact style when there are at least 2 leading zeros
      // (prevents odd-looking output for values like 0.04...)
      if (z >= 2) {
        const sig = rest.slice(0, 3)
        return `0.0<sub>${z}</sub>${sig}`
      }
    }

    // Heuristic: for tokens with <= 6 decimals (often stables), show fixed 3 decimals.
    // (Symbol-based detection is intentionally avoided.)
    // NOTE: this comes *after* compact-small handling so tiny values don't round to 0.000.
    if (Number.isFinite(dec) && dec <= 6) {
      return formatFixedDecimals(full, 3)
    }

    // Default: truncate to 4 decimals, trimmed
    return truncateDecimalString(full, 4)
  } catch {
    return 'N/A'
  }
}

async function getErc20MetaCached(App, cache, tokenAddress, chainId) {
  const a = (tokenAddress || '').toLowerCase()
  if (!a) return { symbol: '?', decimals: 18 }
  if (cache.has(a)) return cache.get(a)

  // Uniswap v4 currency may be native. Best-effort handling.
  if (a === '0x0000000000000000000000000000000000000000') {
    const meta = { symbol: 'ETH', decimals: 18 }
    cache.set(a, meta)
    return meta
  }

  const abi = (typeof ERC20_ABI !== 'undefined' && ERC20_ABI) || [
    { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' },
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

async function getV4PoolSlot0(App, poolIdBytes32) {
  // Base Uniswap v4 uses a separate StateView contract for reading pool state.
  try {
    const stateView = new ethers.Contract(
      state_view_address_v4,
      [
        'function getSlot0(bytes32) view returns (uint160 sqrtPriceX96, int24 tick, uint24 protocolFee, uint24 lpFee)',
        'function getSlot0(bytes32) view returns (uint160 sqrtPriceX96, int24 tick)',
      ],
      App.provider
    )

    // Prefer the full signature; ethers will pick the matching overload.
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

async function getOwnedErc721TokenIdsViaProxy({ chainId, contractAddress, ownerAddress }) {
  const owner = normalizeAddress(ownerAddress)
  const owned = new Set()

  // We "want all positions"; Etherscan-style APIs are paginated.
  // We fetch all pages internally so the UI/user doesn't deal with pagination.
  const offset = 10000
  let page = 1

  while (true) {
    const data = await fetchEtherscanV2ViaProxy({
      chainid: chainId,
      module: 'account',
      action: 'tokennfttx',
      address: ownerAddress,
      contractaddress: contractAddress,
      page,
      offset,
      sort: 'asc',
    })

    // Typical shape: { status: '1'|'0', message: 'OK'|'No transactions found', result: [...] }
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

  // Return sorted for stable output.
  return Array.from(owned)
    .map(x => BigInt(x))
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
}

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const sickle_factory = new ethcall.Contract(sickle_factory_address, SICKLE_FACTORY_ABI)
  const nft_manager_v4 = new ethcall.Contract(nft_manager_address_v4, UNISWAP_POSITION_MANAGER_V4)

  const [sickleAddress] = await App.ethcallProvider.all([sickle_factory.sickles(App.YOUR_ADDRESS)])
  if (sickleAddress === '0x0000000000000000000000000000000000000000') {
    _print_bold('You dont have a sickle account')
  } else {
    _print_bold(`Your Sickle Address: ${sickleAddress}`)
    _print('')

    try {
      await withdraw_nfts(App, nft_manager_v4, nft_manager_address_v4, sickleAddress)
    } catch (err) {
      //await fallback_withdraw(App, nft_manager_address_v4, sickleAddress)
      _print('Error fetching NFTs via proxy, please use fallback method')
      console.log(err)
    }
  }

  hideLoading()
}

const withdraw_nfts = async function(App, nft_manager_v4, nft_manager_address_v4, sickleAddress, retry = 0) {
      // Prefer the Sickle address because that's where positions usually live.
      // If needed later, we can also try App.YOUR_ADDRESS and union the results.
      const nft_ids = await getOwnedErc721TokenIdsViaProxy({
        chainId: BASE_CHAIN_ID,
        contractAddress: nft_manager_address_v4,
        ownerAddress: sickleAddress,
      })

      let active_nfts = []

      if (nft_ids.length === 0) {
        if (retry < 3) {
          // Retry once in case of transient proxy/fetch issues.
          return await withdraw_nfts(App, nft_manager_v4, nft_manager_address_v4, sickleAddress, retry + 1)
        }
        _print('No NFTs found via proxy')
        return
      }

      const liquidity_calls = nft_ids.map(nft => nft_manager_v4.getPositionLiquidity(nft))
      const liquidities = await App.ethcallProvider.all(liquidity_calls)

      for (let i = 0; i < nft_ids.length; i++) {
        if (liquidities[i] > 0) {
          active_nfts.push(nft_ids[i])
        }
      }

      if (active_nfts.length > 0) {
        let token_ids = ''

        let nft_manager_addresses = []
        for (let i = 0; i < active_nfts.length; i++) {
          nft_manager_addresses.push(nft_manager_address_v4)
        }

        const sweepErc721 = async function() {
          return sweep_nfts_721(App, active_nfts, nft_manager_addresses)
        }

        _print_bold('Uniswap-V4 nfts')
        _print('')

        // Build map tokenId -> liquidity
        const tokenIdToLiquidity = new Map()
        for (let i = 0; i < nft_ids.length; i++) {
          tokenIdToLiquidity.set(nft_ids[i].toString(), liquidities[i])
        }

        // Fetch poolKey + packed info for each active NFT.
        // If multicall fails for any reason, fall back to sequential calls.
        let poolAndInfo = []
        try {
          const calls = active_nfts.map(nft => nft_manager_v4.getPoolAndPositionInfo(nft))
          poolAndInfo = await App.ethcallProvider.all(calls)
        } catch (e) {
          const contract = new ethers.Contract(nft_manager_address_v4, UNISWAP_POSITION_MANAGER_V4, App.provider)
          poolAndInfo = []
          for (const nft of active_nfts) {
            poolAndInfo.push(await contract.getPoolAndPositionInfo(nft))
          }
        }

        // Derive per-position info
        const tokenMetaCache = new Map()
        const poolCache = new Map() // poolId32 -> { slot0, poolKey, token0Meta, token1Meta }
        const positions = []

        for (let i = 0; i < active_nfts.length; i++) {
          const nft = active_nfts[i]
          const liq = tokenIdToLiquidity.get(nft.toString())
          const raw = poolAndInfo[i]
          const poolKey = normalizePoolKey(raw?.poolKey ?? raw?.[0])
          const info = raw?.info ?? raw?.[1]
          if (!poolKey || info == null) continue

          const decoded = decodePositionInfo(info)
          const poolId32 = computeV4PoolIdBytes32(poolKey)

          const salt = ethers.utils.hexZeroPad(
            ethers.utils.hexlify(ethers.BigNumber.from(nft.toString())),
            32
          )

          positions.push({
            nftId: nft,
            liquidity: liq,
            poolKey,
            poolId32,
            tickLower: decoded.tickLower,
            tickUpper: decoded.tickUpper,
            salt,
          })
        }

        if (positions.length === 0) {
          _print('No active NFTs')
          return
        }

        // Fetch slot0 per distinct pool and token metadata.
        for (const p of positions) {
          if (poolCache.has(p.poolId32)) continue

          const slot0 = await getV4PoolSlot0(App, p.poolId32)

          const token0Meta = await getErc20MetaCached(App, tokenMetaCache, p.poolKey.currency0, BASE_CHAIN_ID)
          const token1Meta = await getErc20MetaCached(App, tokenMetaCache, p.poolKey.currency1, BASE_CHAIN_ID)

          poolCache.set(p.poolId32, {
            slot0,
            poolKey: p.poolKey,
            token0Meta,
            token1Meta,
          })
        }

        // Compute per-position earned fees (unclaimed) to show next to Compound.
        // Uniswap v4 positions are owned in PoolManager by the PositionManager contract itself, with salt = tokenId.
        // We can reconstruct fees owed off-chain from fee growth values.
        const earnedFeesByTokenId = new Map() // tokenId(string) -> { fees0Raw, fees1Raw }
        try {
          const stateView = new ethcall.Contract(state_view_address_v4, UNISWAP_STATE_VIEW_V4)

          const posInfoCalls = positions.map(p =>
            stateView.getPositionInfo(p.poolId32, nft_manager_address_v4, p.tickLower, p.tickUpper, p.salt)
          )
          const feeGrowthCalls = positions.map(p => stateView.getFeeGrowthInside(p.poolId32, p.tickLower, p.tickUpper))

          const posInfos = await App.ethcallProvider.all(posInfoCalls)
          const feeGrowthInsides = await App.ethcallProvider.all(feeGrowthCalls)

          for (let i = 0; i < positions.length; i++) {
            const p = positions[i]
            const pi = posInfos[i]
            const fg = feeGrowthInsides[i]

            const liquidity = pi?.liquidity ?? pi?.[0]
            const feeGrowthInside0LastX128 = pi?.feeGrowthInside0LastX128 ?? pi?.[1]
            const feeGrowthInside1LastX128 = pi?.feeGrowthInside1LastX128 ?? pi?.[2]
            const feeGrowthInside0X128 = fg?.feeGrowthInside0X128 ?? fg?.[0]
            const feeGrowthInside1X128 = fg?.feeGrowthInside1X128 ?? fg?.[1]

            const { fees0Raw, fees1Raw } = computeUnclaimedFeesFromGrowth({
              liquidity,
              feeGrowthInside0X128,
              feeGrowthInside1X128,
              feeGrowthInside0LastX128,
              feeGrowthInside1LastX128,
            })

            earnedFeesByTokenId.set(p.nftId.toString(), { fees0Raw, fees1Raw })
          }
        } catch (e) {
          console.log('Failed to compute earned fees for v4 positions:', e)
        }

        // Group by poolId32
        const groups = new Map()
        for (const p of positions) {
          const key = p.poolId32
          if (!groups.has(key)) groups.set(key, [])
          groups.get(key).push(p)
        }

        // Print grouped output like bsc_uniswap
        for (const [poolId32, infos] of groups.entries()) {
          const poolInfo = poolCache.get(poolId32)
          const t0 = poolInfo?.token0Meta
          const t1 = poolInfo?.token1Meta
          const pk = poolInfo?.poolKey

          const tickSpacingNum = pk?.tickSpacing != null ? Number(pk.tickSpacing) : null
          const label = `${t0?.symbol || '?'} - ${t1?.symbol || '?'}`
          _print(`Pool: ${label}`)

          for (const [idx, info] of infos.entries()) {
            const slot0 = poolInfo?.slot0
            const currentTick = slot0?.tick

            let amount0Raw = null
            let amount1Raw = null
            if (slot0?.sqrtPriceX96 != null && info?.liquidity != null && window.UniswapV3?.calculateUserLiquidity) {
              try {
                const { liquidity0, liquidity1 } = window.UniswapV3.calculateUserLiquidity(slot0.sqrtPriceX96, {
                  tickLow: info.tickLower,
                  tickUp: info.tickUpper,
                  liquidity: info.liquidity,
                })

                amount0Raw = liquidity0
                amount1Raw = liquidity1
              } catch (e) {
                console.log('Error calculating token amounts:', e)
              }
            }

            const isInRange = typeof currentTick === 'number' ? currentTick >= info.tickLower && currentTick < info.tickUpper : null
            const rangeStatus = isInRange === null ? '' : isInRange ? '✅ In Range' : '⚠️ Out of Range'

            const singleSweepErc721 = async function() {
              return single_sweep_nfts_721(App, info.nftId, nft_manager_address_v4)
            }

            const poolData = {
              stakingAddress: pool_manager_address_v4,
              poolAddress: pool_manager_address_v4,
              nftManagerAddress: nft_manager_address_v4,
              poolId: poolId32,
              tickSpacing: tickSpacingNum != null && !Number.isNaN(tickSpacingNum) ? tickSpacingNum : 1,
            }

            const exitToUnderlying = async function() {
              return window.Sickle.withdraw.withdrawToUnderlying(poolData, info.nftId)
            }

            const exitToEth = async function() {
              return window.Sickle.withdraw.withdrawToToken(poolData, info.nftId)
            }

            const rebalance = async function() {
              if (typeof currentTick !== 'number') {
                alert('Unable to read current pool tick for this v4 pool; cannot rebalance.')
                return
              }
              return window.Sickle.rebalance.rebalance(poolData, info.nftId, info.tickLower, info.tickUpper, currentTick)
            }

            const compound = async function() {
              return window.Sickle.compound.compound(poolData, info.nftId)
            }

            _print(`|    `)

            const a0 = formatTokenAmountHtmlFromRaw(amount0Raw, t0?.decimals)
            const a1 = formatTokenAmountHtmlFromRaw(amount1Raw, t1?.decimals)
            _print(`|-Nft ID: ${info.nftId} (${a0} ${t0?.symbol || '?'} + ${a1} ${t1?.symbol || '?'})`)

            const earned = earnedFeesByTokenId.get(info.nftId.toString())

            // Keep a simple in-range indicator but do not print tick bounds/range.

            idx < infos.length -1 ? _print_inline(`|    `) : _print_inline(`     `)
            _print_link(`Withdraw NFT`, singleSweepErc721)

            idx < infos.length -1 ? _print_inline(`|    `) : _print_inline(`     `)
            _print_link(`Exit to Underlying`, exitToUnderlying)

            idx < infos.length -1 ? _print_inline(`|    `) : _print_inline(`     `)
            _print_link(`Exit to ETH`, exitToEth)

            idx < infos.length -1 ? _print_inline(`|    `) : _print_inline(`     `)
            _print_link(`Rebalance ${rangeStatus}`, rebalance)

            if(earned && (earned.fees0Raw > 0n || earned.fees1Raw > 0n)){
              const e0 = formatTokenAmountHtmlFromRaw(earned.fees0Raw, t0?.decimals)
              const e1 = formatTokenAmountHtmlFromRaw(earned.fees1Raw, t1?.decimals)
              idx < infos.length -1 ? _print_inline(`|    `) : _print_inline(`     `)
              _print_link(`Compound (${e0} ${t0?.symbol || '?'} + ${e1} ${t1?.symbol || '?'})`, compound)
            }
          }

          _print('')
        }

        for (const nft of active_nfts) {
          token_ids += `${nft} - `
        }

        _print_link(`Withdraw all Uniswap erc721 tokens: ${token_ids}`, sweepErc721)
        _print('')
      } else {
        _print('No active NFTs')
      }
}

const fallback_withdraw = async function(App, nft_manager_address_v4, sickleAddress) {
  _print_bold('Please enter the NFT-ID that you want to withdraw')
  _print('')
  _print('You could check your nfts on the nft position manager contract below')
  _print(
    `<a target="_blank" href="https://basescan.org/token/${nft_manager_address_v4}?a=${sickleAddress}#inventory">Nft Position Manager</a>`
  )
  _print('')
  let log = document.getElementById('log')

  let nft_input = document.createElement('input')
  nft_input.setAttribute('id', 'nft_id')
  nft_input.setAttribute('type', 'text')
  nft_input.setAttribute('size', '22')
  log.appendChild(nft_input)

  let nft_btn = document.createElement('button')
  nft_btn.innerHTML = 'Withdraw'
  nft_btn.setAttribute('id', 'nft_withdraw_click')
  log.appendChild(nft_btn)

  nft_btn.addEventListener('click', async () => {
    const nft_id_input = document.getElementById('nft_id').value
    const nft_id = BigInt(nft_id_input)

    try {
      await single_sweep_nfts_721(App, nft_id, nft_manager_address_v4)
    } catch (err) {
      _print('error ocured')
    }
  })
}

const sweep_nfts_721 = async function(App, nfts, tokens) {
  const signer = App.provider.getSigner()
  const SWEEP = new ethers.Contract(sweep_address, SWEEP_ABI, signer)

  showLoading()
  SWEEP.sweepErc721(tokens, nfts)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {})
  hideLoading()
}

const single_sweep_nfts_721 = async function(App, nft, token) {
  const signer = App.provider.getSigner()
  const SWEEP = new ethers.Contract(sweep_address, SWEEP_ABI, signer)

  showLoading()
  SWEEP.sweepErc721([token], [nft])
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {
      _print('invalid input')
    })
  hideLoading()
}
