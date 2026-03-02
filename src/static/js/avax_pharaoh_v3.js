$(function() {
  consoleInit(main)
})

// -----------------------------
// Minimal ABIs
// -----------------------------

const SICKLE_FACTORY_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'admin', type: 'address' }],
    name: 'sickles',
    outputs: [{ internalType: 'address', name: 'sickle', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
]

const SWEEP_ABI = [
  {
    inputs: [
      { internalType: 'address[]', name: 'tokens', type: 'address[]' },
      { internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]' },
    ],
    name: 'sweepErc721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const AVAX_PHARAOH_V3_GAUGE_ABI = [
  { inputs: [], name: 'nfpManager', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'pool', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getRewardTokens', outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'earned',
    outputs: [{ internalType: 'uint256', name: 'reward', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]

const AVAX_PHARAOH_V3_POOL_ABI = [
  { inputs: [], name: 'factory', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [],
    name: 'slot0',
    outputs: [
      { internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160' },
      { internalType: 'int24', name: 'tick', type: 'int24' },
      { internalType: 'uint16', name: 'observationIndex', type: 'uint16' },
      { internalType: 'uint16', name: 'observationCardinality', type: 'uint16' },
      { internalType: 'uint16', name: 'observationCardinalityNext', type: 'uint16' },
      { internalType: 'uint8', name: 'feeProtocol', type: 'uint8' },
      { internalType: 'bool', name: 'unlocked', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'tickSpacing', outputs: [{ internalType: 'int24', name: '', type: 'int24' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'token0', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'token1', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
]

const AVAX_PHARAOH_V3_ERC20_ABI = [
  { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
]

const AVAX_PHARAOH_V3_NFP_MANAGER_ABI = [
  { inputs: [{ internalType: 'address', name: 'owner', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'factory', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'positions',
    outputs: [
      { internalType: 'uint96', name: 'nonce', type: 'uint96' },
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'address', name: 'token0', type: 'address' },
      { internalType: 'address', name: 'token1', type: 'address' },
      { internalType: 'int24', name: 'tickSpacing', type: 'int24' },
      { internalType: 'int24', name: 'tickLower', type: 'int24' },
      { internalType: 'int24', name: 'tickUpper', type: 'int24' },
      { internalType: 'uint128', name: 'liquidity', type: 'uint128' },
      { internalType: 'uint256', name: 'feeGrowthInside0LastX128', type: 'uint256' },
      { internalType: 'uint256', name: 'feeGrowthInside1LastX128', type: 'uint256' },
      { internalType: 'uint128', name: 'tokensOwed0', type: 'uint128' },
      { internalType: 'uint128', name: 'tokensOwed1', type: 'uint128' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

// -----------------------------
// Constants (Avalanche)
// -----------------------------

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const SICKLE_FACTORY_ADDR = '0x53d9780DbD3831E3A797Fd215be4131636cD5FDf'
const SWEEP_ADDR = '0x0f592f2Ee1779Fa7d81a8482f4CC6D216a0FE04f'

// Pharaoh reward token.
const PHAR_TOKEN_ADDRESS = '0xaaab9d12a30504559b0c5a9a5977fee4a6081c6b'

// Pharaoh V3 gauge (Ramses/Slipstream style) on Avalanche.
const PHARAOH_V3_GAUGE_ADDRESS = '0x4543922018006b46fe7dab001669f38d4e22c728'

// Sickle v5 lens (vfat-api parity) for reliable tick/liquidity/fees.
const AVAX_SICKLE_V5_CONNECTOR_REGISTRY = '0x114f84dc0a203832d23c4f497ce91fa7dc8b8f16'
const AVAX_SICKLE_V5_CONNECTOR_LENS = '0xace729eeaef6bb911d2227053260645cfb8fc17b'
// Pharaoh V3 pool factory (fallback).
const AVAX_PHARAOH_V3_POOL_FACTORY = '0xaaa32926fce6be95ea2c51cb4fcb60836d320c42'

const AVAX_SICKLE_V5_CONNECTOR_LENS_ABI = [
  {
    inputs: [
      { internalType: 'contract ConnectorRegistry', name: 'registry', type: 'address' },
      { internalType: 'address', name: 'poolFactory', type: 'address' },
      { internalType: 'address', name: 'user', type: 'address' },
      {
        components: [
          {
            components: [
              { internalType: 'address', name: 'stakingContract', type: 'address' },
              { internalType: 'uint256', name: 'poolIndex', type: 'uint256' },
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          { internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      { internalType: 'address[]', name: 'rewardTokens', type: 'address[]' },
    ],
    name: 'getPositionInfo',
    outputs: [
      {
        components: [
          { internalType: 'uint128', name: 'liquidity', type: 'uint128' },
          { internalType: 'int24', name: 'tickLower', type: 'int24' },
          { internalType: 'int24', name: 'tickUpper', type: 'int24' },
          { internalType: 'bool', name: 'isStaked', type: 'bool' },
          { internalType: 'uint256', name: 'fees0', type: 'uint256' },
          { internalType: 'uint256', name: 'fees1', type: 'uint256' },
          { internalType: 'uint256[]', name: 'tokenRewards', type: 'uint256[]' },
        ],
        internalType: 'struct NftPositionInfo',
        name: '',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'address', name: 'poolAddress', type: 'address' },
          { internalType: 'bytes32', name: 'poolId', type: 'bytes32' },
        ],
        internalType: 'struct NftPoolKey',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

// -----------------------------
// Formatting helpers
// -----------------------------

function avaxPharaohV3_truncDecimals(str, maxDecimals = 6) {
  if (typeof str !== 'string') return String(str)
  if (!str.includes('.')) return str
  const [i, f] = str.split('.')
  return `${i}.${(f || '').slice(0, maxDecimals)}`
}

function avaxPharaohV3_formatUnitsBigInt(amountBigInt, decimals, maxDecimals = 6) {
  try {
    const s = ethers.utils.formatUnits(amountBigInt.toString(), decimals)
    return avaxPharaohV3_truncDecimals(s, maxDecimals)
  } catch (e) {
    console.warn('formatUnits failed', e)
    return amountBigInt.toString()
  }
}

function avaxPharaohV3_getTupleField(tupleOrObj, name, index) {
  if (tupleOrObj && typeof tupleOrObj === 'object' && tupleOrObj[name] !== undefined) return tupleOrObj[name]
  return tupleOrObj?.[index]
}

function avaxPharaohV3_normalizeAddress(addr) {
  try {
    return ethers.utils.getAddress(addr)
  } catch (e) {
    return (addr || '').toLowerCase()
  }
}

function avaxPharaohV3_sameAddress(a, b) {
  return avaxPharaohV3_normalizeAddress(a) === avaxPharaohV3_normalizeAddress(b)
}

function avaxPharaohV3_withTimeout(promise, ms, label = 'timeout') {
  let t
  const timeout = new Promise((_, reject) => {
    t = setTimeout(() => reject(new Error(label)), ms)
  })
  return Promise.race([promise, timeout]).finally(() => clearTimeout(t))
}

function avaxPharaohV3_hexTopicAddress(addr) {
  try {
    return ethers.utils.hexZeroPad(avaxPharaohV3_normalizeAddress(addr), 32)
  } catch (e) {
    return null
  }
}

async function avaxPharaohV3_getErc20Meta(App, tokenAddress) {
  const token = new ethers.Contract(tokenAddress, AVAX_PHARAOH_V3_ERC20_ABI, App.provider)
  let symbol = 'TOKEN'
  let decimals = 18
  try {
    symbol = await token.symbol()
  } catch (e) {
    // ignore
  }
  try {
    decimals = Number(await token.decimals())
  } catch (e) {
    // ignore
  }
  return { symbol, decimals }
}

// -----------------------------
// Position fetchers
// -----------------------------

async function avaxPharaohV3_fetchNfpPositionViaLens(
  App,
  connectorLensAddress,
  connectorRegistryAddress,
  poolFactory,
  userAddress,
  stakingContract,
  nftManager,
  nftId,
  rewardTokens,
) {
  const lens = new ethers.Contract(connectorLensAddress, AVAX_SICKLE_V5_CONNECTOR_LENS_ABI, App.provider)
  const rt = Array.isArray(rewardTokens) ? rewardTokens : []

  let positionInfo
  let poolKey
  try {
    ;[positionInfo, poolKey] = await lens.getPositionInfo(
      connectorRegistryAddress,
      poolFactory,
      userAddress,
      {
        farm: { stakingContract: stakingContract, poolIndex: 0 },
        nft: nftManager,
        tokenId: nftId,
      },
      rt,
    )
  } catch (e) {
    if (rt.length > 0) {
      ;[positionInfo, poolKey] = await lens.getPositionInfo(
        connectorRegistryAddress,
        poolFactory,
        userAddress,
        {
          farm: { stakingContract: stakingContract, poolIndex: 0 },
          nft: nftManager,
          tokenId: nftId,
        },
        [],
      )
    } else {
      throw e
    }
  }

  const tickLower = Number(positionInfo.tickLower)
  const tickUpper = Number(positionInfo.tickUpper)
  const liquidity = positionInfo.liquidity
  const fees0 = positionInfo.fees0
  const fees1 = positionInfo.fees1
  const tokenRewards = positionInfo.tokenRewards
  const poolAddressFromLens = poolKey?.poolAddress

  return {
    tickLower,
    tickUpper,
    liquidity,
    fees0,
    fees1,
    tokenRewards,
    poolAddressFromLens,
    source: 'lens',
  }
}

async function avaxPharaohV3_fetchNfpPositionViaPositions(App, ethcallNfpManager, nftId) {
  // Minimal fallback: use positions() from the NFT manager (Slipstream/Ramses style).
  // If it fails, return null so we don't display garbage.
  try {
    const res = await App.ethcallProvider.all([ethcallNfpManager.positions(nftId)])
    const pos = res?.[0]
    if (!pos) return null

    const tickLower = Number(pos.tickLower ?? pos[5])
    const tickUpper = Number(pos.tickUpper ?? pos[6])
    const liquidity = pos.liquidity ?? pos[7]
    const tokensOwed0 = pos.tokensOwed0 ?? pos[10] ?? 0
    const tokensOwed1 = pos.tokensOwed1 ?? pos[11] ?? 0

    return { tickLower, tickUpper, liquidity, tokensOwed0, tokensOwed1, source: 'positions' }
  } catch (e) {
    return null
  }
}

// -----------------------------
// Main
// -----------------------------

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  try {
    const sickle_factory = new ethcall.Contract(SICKLE_FACTORY_ADDR, SICKLE_FACTORY_ABI)
    const [sickleAddress] = await App.ethcallProvider.all([sickle_factory.sickles(App.YOUR_ADDRESS)])

    if (!sickleAddress || avaxPharaohV3_sameAddress(sickleAddress, ZERO_ADDRESS)) {
      _print_bold('You dont have a sickle account')
      return
    }

    _print_bold(`Your Sickle Address: ${sickleAddress}`)
    _print('')

    const GAUGE = new ethcall.Contract(PHARAOH_V3_GAUGE_ADDRESS, AVAX_PHARAOH_V3_GAUGE_ABI)
    const [poolAddress, nfpManagerAddress] = await App.ethcallProvider.all([GAUGE.pool(), GAUGE.nfpManager()])

    if (!poolAddress || avaxPharaohV3_sameAddress(poolAddress, ZERO_ADDRESS)) {
      _print_bold('Gauge pool address not found')
      return
    }
    if (!nfpManagerAddress || avaxPharaohV3_sameAddress(nfpManagerAddress, ZERO_ADDRESS)) {
      _print_bold('Gauge NFT manager address not found')
      return
    }

    const POOL = new ethcall.Contract(poolAddress, AVAX_PHARAOH_V3_POOL_ABI)
    const NFP = new ethcall.Contract(nfpManagerAddress, AVAX_PHARAOH_V3_NFP_MANAGER_ABI)

    const [token0Addr, token1Addr, slot0, poolTickSpacing] = await App.ethcallProvider.all([
      POOL.token0(),
      POOL.token1(),
      POOL.slot0(),
      POOL.tickSpacing(),
    ])

    let poolFactoryFromPool = null
    try {
      const [f] = await App.ethcallProvider.all([POOL.factory()])
      poolFactoryFromPool = f
    } catch (e) {
      // ignore
    }

    let nfpManagerFactory = null
    try {
      const [f] = await App.ethcallProvider.all([NFP.factory()])
      nfpManagerFactory = f
    } catch (e) {
      // ignore
    }

    // Known mapping fallback when factory() calls are unavailable.
    const poolFactoryByNfp = (() => {
      const a = (nfpManagerAddress || '').toLowerCase()
      if (a === '0x0b4478e810d48b5882d4019d435a2f864bab4f39') return '0xae6e5c62328ade73ceefd42228528b70c8157d0d'
      if (a === '0xaaa78e8c4241990b4ce159e105da08129345946a') return '0xaaa32926fce6be95ea2c51cb4fcb60836d320c42'
      return null
    })()

    const isNonZeroAddress = (x) => typeof x === 'string' && x !== ZERO_ADDRESS
    const poolFactoryForLens =
      (isNonZeroAddress(poolFactoryFromPool) ? poolFactoryFromPool : null) ||
      (isNonZeroAddress(nfpManagerFactory) ? nfpManagerFactory : null) ||
      poolFactoryByNfp ||
      AVAX_PHARAOH_V3_POOL_FACTORY

    const token0 = new ethcall.Contract(token0Addr, AVAX_PHARAOH_V3_ERC20_ABI)
    const token1 = new ethcall.Contract(token1Addr, AVAX_PHARAOH_V3_ERC20_ABI)
    const [dec0, sym0, dec1, sym1] = await App.ethcallProvider.all([token0.decimals(), token0.symbol(), token1.decimals(), token1.symbol()])

    const sqrtPriceX96 = avaxPharaohV3_getTupleField(slot0, 'sqrtPriceX96', 0)
    const currentTick = Number(avaxPharaohV3_getTupleField(slot0, 'tick', 1))
    _print(`Pool: ${sym0} - ${sym1}`)

    // Find NFTs owned by the user's Sickle account.
    const [balanceBn] = await App.ethcallProvider.all([NFP.balanceOf(sickleAddress)])
    const balance = Number(balanceBn.toString())
    if (!balance || balance <= 0) {
      _print_bold('No Pharaoh V3 NFTs found in your Sickle account.')
      return
    }

    const indexCalls = [...Array(balance).keys()].map((i) => NFP.tokenOfOwnerByIndex(sickleAddress, i))
    const nftIds = []
    while (indexCalls.length > 0) {
      const batch = indexCalls.splice(0, 200)
      const res = await App.ethcallProvider.all(batch)
      for (const id of res) nftIds.push(id.toString())
    }

    // Reward token discovery: use gauge's list when available to avoid lens/gauge reverts.
    let rewardTokensForLens = null
    try {
      const [gaugeRewardTokens] = await App.ethcallProvider.all([GAUGE.getRewardTokens()])
      if (Array.isArray(gaugeRewardTokens) && gaugeRewardTokens.length > 0) {
        const cleaned = gaugeRewardTokens
          .filter((t) => typeof t === 'string' && t.length > 0)
          .filter((t) => !avaxPharaohV3_sameAddress(t, ZERO_ADDRESS))
        rewardTokensForLens = [...new Set(cleaned.map((t) => avaxPharaohV3_normalizeAddress(t)))]
      }
    } catch (e) {
      // ignore
    }

    if (!Array.isArray(rewardTokensForLens) || rewardTokensForLens.length === 0) {
      // If we can't discover the gauge's reward tokens, fall back to PHAR.
      rewardTokensForLens = [PHAR_TOKEN_ADDRESS]
    }

    const rewardTokenMetaByAddr = new Map()
    async function avaxPharaohV3_getRewardTokenMetaCached(addr) {
      const key = avaxPharaohV3_normalizeAddress(addr)
      if (rewardTokenMetaByAddr.has(key)) return rewardTokenMetaByAddr.get(key)
      const m = await avaxPharaohV3_getErc20Meta(App, key)
      rewardTokenMetaByAddr.set(key, m)
      return m
    }

    const nonFeeRewardTokens = rewardTokensForLens.filter(
      (t) => !avaxPharaohV3_sameAddress(t, token0Addr) && !avaxPharaohV3_sameAddress(t, token1Addr),
    )

    const preferredRewardTokenOrder = (() => {
      const out = []
      const add = (a) => {
        if (!a) return
        const n = avaxPharaohV3_normalizeAddress(a)
        if (!out.some((x) => avaxPharaohV3_sameAddress(x, n))) out.push(n)
      }
      // Prefer PHAR if present.
      if (rewardTokensForLens.some((t) => avaxPharaohV3_sameAddress(t, PHAR_TOKEN_ADDRESS))) add(PHAR_TOKEN_ADDRESS)
      // Then non-fee tokens.
      for (const t of nonFeeRewardTokens) add(t)
      // Then everything else.
      for (const t of rewardTokensForLens) add(t)
      return out
    })()

    // Optional fallback: fetch earned(rewardToken, ..., tokenId) directly from gauge.
    // NOTE: ethcall doesn't reliably support overloaded function names. Use ethers with signature probing.
    const fallbackBestRewardByNftId = new Map()
    try {
      const gaugeEthers = new ethers.Contract(
        PHARAOH_V3_GAUGE_ADDRESS,
        [
          'function earned(address token,uint256 tokenId) view returns (uint256)',
          'function earned(address token,address nfpManagerAddress,uint256 tokenId) view returns (uint256)',
          'function earned(uint256 tokenId,address token) view returns (uint256)',
          'function earned(uint256 tokenId) view returns (uint256)',
        ],
        App.provider,
      )

      const setBest = (tokenIdStr, tokenAddr, amountBnLike) => {
        const amt = BigInt(amountBnLike.toString())
        if (amt <= 0n) return
        const prev = fallbackBestRewardByNftId.get(tokenIdStr)
        if (!prev || amt > prev.amount) {
          fallbackBestRewardByNftId.set(tokenIdStr, { token: avaxPharaohV3_normalizeAddress(tokenAddr), amount: amt })
        }
      }

      // Detect which earned() signature is implemented.
      let earnedMode = null
      let earned1TokenForDisplay = rewardTokensForLens[0]
      if (nftIds.length > 0 && preferredRewardTokenOrder.length > 0) {
        const sid = nftIds[0]
        for (const tokenAddr of preferredRewardTokenOrder) {
          try {
            await gaugeEthers['earned(address,address,uint256)'](tokenAddr, nfpManagerAddress, sid)
            earnedMode = 'earned3'
            break
          } catch (e) {
            // ignore
          }
          try {
            await gaugeEthers['earned(address,uint256)'](tokenAddr, sid)
            earnedMode = 'earned2'
            break
          } catch (e) {
            // ignore
          }
          try {
            await gaugeEthers['earned(uint256,address)'](sid, tokenAddr)
            earnedMode = 'earned2rev'
            break
          } catch (e) {
            // ignore
          }
        }
        if (!earnedMode) {
          try {
            await gaugeEthers['earned(uint256)'](sid)
            earnedMode = 'earned1'
            earned1TokenForDisplay = preferredRewardTokenOrder[0] || rewardTokensForLens[0]
          } catch (e) {
            // ignore
          }
        }
      }

      if (earnedMode) {
        if (earnedMode === 'earned1') {
          const ids = [...nftIds]
          while (ids.length > 0) {
            const batchIds = ids.splice(0, 40)
            const res = await Promise.all(batchIds.map((id) => gaugeEthers['earned(uint256)'](id)))
            for (let i = 0; i < batchIds.length; i++) {
              setBest(batchIds[i], earned1TokenForDisplay, res[i])
            }
          }
        } else {
          // Fetch earned for all known reward tokens and keep the best per NFT.
          for (const tokenAddr of rewardTokensForLens) {
            const ids = [...nftIds]
            while (ids.length > 0) {
              const batchIds = ids.splice(0, 40)
              const res = await Promise.all(
                batchIds.map((id) => {
                  if (earnedMode === 'earned3') return gaugeEthers['earned(address,address,uint256)'](tokenAddr, nfpManagerAddress, id)
                  if (earnedMode === 'earned2') return gaugeEthers['earned(address,uint256)'](tokenAddr, id)
                  return gaugeEthers['earned(uint256,address)'](id, tokenAddr)
                }),
              )
              for (let i = 0; i < batchIds.length; i++) {
                setBest(batchIds[i], tokenAddr, res[i])
              }
            }
          }
        }
      }
    } catch (e) {
      // ignore
    }

    // NOTE: Claimed rewards (historical) require scanning logs, which can be slow and can block page rendering.
    // We compute claimable rewards (earned) inline, and (optionally) compute a *bounded* claimed summary after NFTs render.

    const tokensForSweep = nftIds.map(() => nfpManagerAddress)

    for (let i = 0; i < nftIds.length; i++) {
      const nftId = nftIds[i]

      let tickLower = 0
      let tickUpper = 0
      let liquidity = 0n
      let fees0Raw = 0n
      let fees1Raw = 0n
      let rewardRaw = 0n
      let rewardTokenAddress = null
      let rewardKnown = false

      // 1) Lens-first (vfat-api parity)
      try {
        const userCandidates = [sickleAddress, App.YOUR_ADDRESS].filter(Boolean)
        const stakingCandidates = [PHARAOH_V3_GAUGE_ADDRESS, poolAddress, nfpManagerAddress].filter(Boolean)
        const expectedPoolAddr = poolAddress

        let lensPos = null
        let lastLensErr = null
        for (const userAddr of userCandidates) {
          for (const stakingAddr of stakingCandidates) {
            try {
              const p = await avaxPharaohV3_fetchNfpPositionViaLens(
                App,
                AVAX_SICKLE_V5_CONNECTOR_LENS,
                AVAX_SICKLE_V5_CONNECTOR_REGISTRY,
                poolFactoryForLens,
                userAddr,
                stakingAddr,
                nfpManagerAddress,
                nftId,
                rewardTokensForLens,
              )

              if (p.poolAddressFromLens && expectedPoolAddr && !avaxPharaohV3_sameAddress(p.poolAddressFromLens, expectedPoolAddr)) {
                continue
              }

              lensPos = p
              break
            } catch (eLens) {
              lastLensErr = eLens
            }
          }
          if (lensPos) break
        }

        if (!lensPos) throw lastLensErr || new Error('Lens lookup failed')

        tickLower = lensPos.tickLower
        tickUpper = lensPos.tickUpper
        liquidity = BigInt(lensPos.liquidity.toString())
        fees0Raw = lensPos.fees0 != null ? BigInt(lensPos.fees0.toString()) : 0n
        fees1Raw = lensPos.fees1 != null ? BigInt(lensPos.fees1.toString()) : 0n

        // Rewards are returned in the same order as `rewardTokens`.
        if (Array.isArray(lensPos.tokenRewards) && lensPos.tokenRewards.length > 0) {
          let bestAmt = 0n
          let bestToken = null
          const n = Math.min(lensPos.tokenRewards.length, rewardTokensForLens.length)
          for (let ri = 0; ri < n; ri++) {
            const v = lensPos.tokenRewards[ri]
            if (v === undefined) continue
            const amt = BigInt(v.toString())
            if (amt > bestAmt) {
              bestAmt = amt
              bestToken = rewardTokensForLens[ri]
            }
          }
          if (bestToken && bestAmt >= 0n) {
            rewardRaw = bestAmt
            rewardTokenAddress = bestToken
            rewardKnown = true
          }
        }
      } catch (e) {
        // 2) Fallback: NFP.positions()
        const pos = await avaxPharaohV3_fetchNfpPositionViaPositions(App, NFP, nftId)
        if (!pos) {
          _print(`|-Nft ID: ${nftId} (failed to load position)`) 
          continue
        }

        tickLower = pos.tickLower
        tickUpper = pos.tickUpper
        liquidity = BigInt(pos.liquidity.toString())
        fees0Raw = pos.tokensOwed0 != null ? BigInt(pos.tokensOwed0.toString()) : 0n
        fees1Raw = pos.tokensOwed1 != null ? BigInt(pos.tokensOwed1.toString()) : 0n
      }

      // If gauge fallback has a value, prefer it over lens (lens can return 0 when called with a mismatched `user`).
      if (fallbackBestRewardByNftId.has(nftId)) {
        const fb = fallbackBestRewardByNftId.get(nftId)
        if (fb && (!rewardKnown || fb.amount > rewardRaw)) {
          rewardRaw = fb.amount
          rewardTokenAddress = fb.token
          rewardKnown = true
        }
      }

      let liquidity0 = 0n
      let liquidity1 = 0n
      try {
        const amounts = window.UniswapV3.calculateUserLiquidity(sqrtPriceX96, { tickLower, tickUpper, liquidity })
        liquidity0 = amounts.liquidity0
        liquidity1 = amounts.liquidity1
      } catch (e) {
        console.warn(`Failed to calculate amounts for NFT #${nftId}`, e)
      }

      const total0Raw = liquidity0 + fees0Raw
      const total1Raw = liquidity1 + fees1Raw
      const a0 = avaxPharaohV3_formatUnitsBigInt(total0Raw, Number(dec0), 6)
      const a1 = avaxPharaohV3_formatUnitsBigInt(total1Raw, Number(dec1), 6)

      const isInRange = Number.isFinite(currentTick) ? currentTick >= tickLower && currentTick < tickUpper : null
      const rangeStatus = isInRange === null ? '' : isInRange ? '✅ In Range' : '⚠️ Out of Range'

      _print(`|    `)
      _print(`|-Nft ID: ${nftId} (${a0} ${sym0} + ${a1} ${sym1})`)

      const poolData = {
        stakingAddress: PHARAOH_V3_GAUGE_ADDRESS,
        poolAddress: poolAddress,
        nftManagerAddress: nfpManagerAddress,
        tickSpacing: Number(poolTickSpacing),
      }

      let compoundLabel = 'Compound'
      if (rewardKnown && rewardTokenAddress && rewardRaw > 0n) {
        const meta = await avaxPharaohV3_getRewardTokenMetaCached(rewardTokenAddress)
        const earned = avaxPharaohV3_formatUnitsBigInt(rewardRaw, meta.decimals, 6)
        compoundLabel = `Compound (${earned} ${meta.symbol})`
      }

      i < nftIds.length - 1 ? _print_inline(`|    `) : _print_inline(`     `)
      _print_link('Withdraw NFT', async () => single_sweep_nfts_721(App, nftId, nfpManagerAddress))
      if(window.Sickle){
        i < nftIds.length - 1 ? _print_inline(`|    `) : _print_inline(`     `)
        _print_link('Exit to Underlying', async () => window.Sickle.withdraw.withdrawToUnderlying(poolData, nftId))
        
        i < nftIds.length - 1 ? _print_inline(`|    `) : _print_inline(`     `)
        _print_link('Exit to AVAX', async () => window.Sickle.withdraw.withdrawToToken(poolData, nftId))
        
        i < nftIds.length - 1 ? _print_inline(`|    `) : _print_inline(`     `)
        _print_link(`Rebalance ${rangeStatus}`, async () => window.Sickle.rebalance.rebalance(poolData, nftId, tickLower, tickUpper, currentTick))
        
        i < nftIds.length - 1 ? _print_inline(`|    `) : _print_inline(`     `)
        _print_link(compoundLabel, async () => window.Sickle.compound.compound(poolData, nftId))
    }
      }

    // Best-effort (bounded) claimed summary: scan recent blocks only so we never block the page.
    try {
      const claimedToken = rewardTokensForLens.some((t) => avaxPharaohV3_sameAddress(t, PHAR_TOKEN_ADDRESS)) ? PHAR_TOKEN_ADDRESS : rewardTokensForLens[0]
      if (claimedToken) {
        const transferTopic0 = ethers.utils.id('Transfer(address,address,uint256)')
        const fromTopic = avaxPharaohV3_hexTopicAddress(PHARAOH_V3_GAUGE_ADDRESS)
        const toTopic = avaxPharaohV3_hexTopicAddress(sickleAddress)

        if (fromTopic && toTopic) {
          const latest = await avaxPharaohV3_withTimeout(App.provider.getBlockNumber(), 6000, 'getBlockNumber timeout')
          const lookback = 600000 // ~recent history; avoids hanging on large scans
          const fromBlock = Math.max(0, latest - lookback)
          const step = 50000

          let sum = 0n
          for (let start = fromBlock; start <= latest; start += step) {
            const end = Math.min(latest, start + step - 1)
            const logs = await avaxPharaohV3_withTimeout(
              App.provider.getLogs({
                address: claimedToken,
                fromBlock: start,
                toBlock: end,
                topics: [transferTopic0, fromTopic, toTopic],
              }),
              8000,
              'getLogs timeout',
            )

            for (const l of logs) {
              try {
                sum += BigInt(l.data)
              } catch (e) {
                // ignore
              }
            }
          }

          if (sum > 0n) {
            const meta = await avaxPharaohV3_getRewardTokenMetaCached(claimedToken)
            const claimed = avaxPharaohV3_formatUnitsBigInt(sum, meta.decimals, 6)
            _print('')
            _print_bold(`Claimed (recent): ${claimed} ${meta.symbol}`)
          }
        }
      }
    } catch (e) {
      // ignore
    }

    _print('')
    _print_link(`Withdraw all PHARAOH-V3 erc721 tokens: ${nftIds.join(', ')}`, async () => sweep_nfts_721(App, nftIds, tokensForSweep))
    _print('')
  } finally {
    hideLoading()
  }
}

// -----------------------------
// Sweep helpers
// -----------------------------

async function sweep_nfts_721(App, nfts, tokens) {
  const signer = App.provider.getSigner()
  const SWEEP = new ethers.Contract(SWEEP_ADDR, SWEEP_ABI, signer)

  showLoading()
  try {
    const tx = await SWEEP.sweepErc721(tokens, nfts)
    await App.provider.waitForTransaction(tx.hash)
  } finally {
    hideLoading()
  }
}

async function single_sweep_nfts_721(App, nft, token) {
  return sweep_nfts_721(App, [nft], [token])
}