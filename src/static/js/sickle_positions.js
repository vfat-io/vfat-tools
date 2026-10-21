// Shared helpers for the generic <chain>/sickle pages: list the CL position NFTs
// held by a Sickle, resolve each one's pool and print the per-NFT Sickle actions.
//
// Families (both use the UniV3 positions() layout; word 4 is fee or tickSpacing):
//   univ3      - Uniswap V3 and forks (Pancake, Sushi, BaseSwap, ...): factory.getPool(t0, t1, fee)
//   slipstream - Aerodrome/Velodrome Slipstream: factory.getPool(t0, t1, tickSpacing)

const SICKLE_POSITIONS_JSON_ABI = (fragments) =>
  JSON.parse(new ethers.utils.Interface(fragments).format(ethers.utils.FormatTypes.json))

const SICKLE_POSITIONS_NFT_MANAGER_ABI = SICKLE_POSITIONS_JSON_ABI([
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  'function factory() view returns (address)',
  'function positions(uint256 tokenId) view returns (uint96 nonce, address operator, address token0, address token1, int24 feeOrTickSpacing, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)'
])

const SICKLE_POSITIONS_FACTORY_ABI = {
  univ3: SICKLE_POSITIONS_JSON_ABI(['function getPool(address, address, uint24) view returns (address)']),
  slipstream: SICKLE_POSITIONS_JSON_ABI(['function getPool(address, address, int24) view returns (address)'])
}

// slot0 is truncated to the fields every family shares; ticks() differs (Slipstream adds stakedLiquidityNet).
const SICKLE_POSITIONS_POOL_COMMON = [
  'function slot0() view returns (uint160 sqrtPriceX96, int24 tick)',
  'function tickSpacing() view returns (int24)',
  'function feeGrowthGlobal0X128() view returns (uint256)',
  'function feeGrowthGlobal1X128() view returns (uint256)'
]
const SICKLE_POSITIONS_POOL_ABI = {
  univ3: SICKLE_POSITIONS_JSON_ABI([...SICKLE_POSITIONS_POOL_COMMON,
    'function ticks(int24) view returns (uint128 liquidityGross, int128 liquidityNet, uint256 feeGrowthOutside0X128, uint256 feeGrowthOutside1X128)']),
  slipstream: SICKLE_POSITIONS_JSON_ABI([...SICKLE_POSITIONS_POOL_COMMON,
    'function ticks(int24) view returns (uint128 liquidityGross, int128 liquidityNet, int128 stakedLiquidityNet, uint256 feeGrowthOutside0X128, uint256 feeGrowthOutside1X128)'])
}

const SICKLE_POSITIONS_ERC20_ABI = SICKLE_POSITIONS_JSON_ABI([
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)'
])

// Prices for tokens missing from the chain's price list, from DefiLlama ("<llamaChain>:<address>").
async function sicklePositionsMissingPrices(llamaChain, addresses, prices) {
  const missing = addresses.filter(a => !getParameterCaseInsensitive(prices || {}, a)?.usd)
  if (!llamaChain || missing.length === 0) return {}
  try {
    const res = await fetch('https://coins.llama.fi/prices/current/' + missing.map(a => `${llamaChain}:${a}`).join(','))
    const { coins } = await res.json()
    const found = {}
    for (const [key, v] of Object.entries(coins || {})) {
      if (v.price) found[key.split(':')[1]] = { usd: v.price }
    }
    return found
  } catch (e) {
    console.log('DefiLlama price lookup failed:', e)
    return {}
  }
}

// managers: [{ name, address, family }]; llamaChain: DefiLlama chain key (e.g. "base") for unlisted tokens.
// Returns one info object per NFT held by the Sickle.
async function loadSicklePositions(App, sickleAddress, managers, prices, llamaChain) {
  const nftManagers = managers.map(m => new ethcall.Contract(m.address, SICKLE_POSITIONS_NFT_MANAGER_ABI))
  const balances = await App.ethcallProvider.all(nftManagers.map(c => c.balanceOf(sickleAddress)))

  const held = []
  managers.forEach((manager, i) => {
    for (let j = 0; j < Number(balances[i]); j++) held.push({ manager, contract: nftManagers[i], index: j })
  })
  if (held.length === 0) return []

  const nftIds = await App.ethcallProvider.all(held.map(h => h.contract.tokenOfOwnerByIndex(sickleAddress, h.index)))
  const positions = await App.ethcallProvider.all(held.map((h, i) => h.contract.positions(nftIds[i])))

  const usedManagers = [...new Set(held.map(h => h.manager))]
  const factories = await App.ethcallProvider.all(usedManagers.map(m => nftManagers[managers.indexOf(m)].factory()))
  const factoryOf = new Map(usedManagers.map((m, i) => [m, factories[i]]))

  const pools = await App.ethcallProvider.all(held.map((h, i) =>
    new ethcall.Contract(factoryOf.get(h.manager), SICKLE_POSITIONS_FACTORY_ABI[h.manager.family])
      .getPool(positions[i].token0, positions[i].token1, positions[i].feeOrTickSpacing)))

  const tokenAddresses = [...new Set(positions.flatMap(p => [p.token0, p.token1]))]
  const tokenCalls = tokenAddresses.flatMap(t => {
    const c = new ethcall.Contract(t, SICKLE_POSITIONS_ERC20_ABI)
    return [c.symbol(), c.decimals()]
  })
  const tokenData = await App.ethcallProvider.all(tokenCalls)
  const tokenInfo = new Map(tokenAddresses.map((t, i) => [t, { symbol: tokenData[2 * i], decimals: Number(tokenData[2 * i + 1]) }]))

  const infos = await Promise.all(held.map(async (h, i) => {
    const pos = positions[i]
    const poolAddress = pools[i]
    const t0 = tokenInfo.get(pos.token0)
    const t1 = tokenInfo.get(pos.token1)
    const info = {
      managerName: h.manager.name,
      nftManagerAddress: h.manager.address,
      family: h.manager.family,
      nftId: nftIds[i].toString(),
      poolAddress,
      token0Address: pos.token0,
      token1Address: pos.token1,
      token0Symbol: t0.symbol,
      token1Symbol: t1.symbol,
      token0Decimals: t0.decimals,
      token1Decimals: t1.decimals,
      tickLower: Number(pos.tickLower),
      tickUpper: Number(pos.tickUpper),
      liquidity: pos.liquidity,
      amount0Raw: 0n,
      amount1Raw: 0n,
      fees0Raw: 0n,
      fees1Raw: 0n
    }
    if (poolAddress === ethers.constants.AddressZero) return info

    try {
      const pool = new ethcall.Contract(poolAddress, SICKLE_POSITIONS_POOL_ABI[h.manager.family])
      const [slot0, tickSpacing, g0, g1, lower, upper] = await App.ethcallProvider.all([
        pool.slot0(), pool.tickSpacing(), pool.feeGrowthGlobal0X128(), pool.feeGrowthGlobal1X128(),
        pool.ticks(pos.tickLower), pool.ticks(pos.tickUpper)
      ])
      info.currentTick = Number(slot0.tick)
      info.tickSpacing = Number(tickSpacing)

      if (BigInt(pos.liquidity.toString()) > 0n) {
        const { liquidity0, liquidity1 } = window.UniswapV3.calculateUserLiquidity(slot0.sqrtPriceX96, {
          tickLower: pos.tickLower, tickUpper: pos.tickUpper, liquidity: pos.liquidity
        })
        info.amount0Raw = liquidity0
        info.amount1Raw = liquidity1
      }

      const { fees0Raw, fees1Raw } = window.UniswapV3.computeUnclaimedFees({
        currentTick: slot0.tick,
        tickLower: pos.tickLower,
        tickUpper: pos.tickUpper,
        liquidity: pos.liquidity,
        feeGrowthGlobal0X128: g0,
        feeGrowthGlobal1X128: g1,
        lower: { feeGrowthOutside0X128: lower.feeGrowthOutside0X128, feeGrowthOutside1X128: lower.feeGrowthOutside1X128 },
        upper: { feeGrowthOutside0X128: upper.feeGrowthOutside0X128, feeGrowthOutside1X128: upper.feeGrowthOutside1X128 },
        feeGrowthInside0LastX128: pos.feeGrowthInside0LastX128,
        feeGrowthInside1LastX128: pos.feeGrowthInside1LastX128,
        tokensOwed0: pos.tokensOwed0,
        tokensOwed1: pos.tokensOwed1
      })
      info.fees0Raw = fees0Raw
      info.fees1Raw = fees1Raw
    } catch (e) {
      console.log(`Error reading pool ${poolAddress} for NFT ${info.nftId}:`, e)
    }
    return info
  }))

  const allPrices = { ...prices, ...await sicklePositionsMissingPrices(llamaChain, tokenAddresses, prices) }
  const price = (address) => getParameterCaseInsensitive(allPrices, address)?.usd
  for (const info of infos) {
    // null when a non-zero amount has no price, so labels never show a partial total
    const usd = (raw0, raw1) => {
      const p0 = price(info.token0Address), p1 = price(info.token1Address)
      if ((BigInt(raw0) > 0n && !p0) || (BigInt(raw1) > 0n && !p1)) return null
      return Number(raw0) / 10 ** info.token0Decimals * (p0 || 0) + Number(raw1) / 10 ** info.token1Decimals * (p1 || 0)
    }
    info.positionUsd = usd(info.amount0Raw, info.amount1Raw)
    info.feesUsd = usd(info.fees0Raw, info.fees1Raw)
  }
  return infos
}

function sicklePositionsAmountLabel(info, raw0, raw1, usd) {
  const fmt = (raw, decimals) => window.UniswapV3.formatTokenAmount(Number(raw) / 10 ** decimals)
  const usdSuffix = usd ? ` ≈ $${formatMoney(usd)}` : ''
  return `${fmt(raw0, info.token0Decimals)} ${info.token0Symbol} + ${fmt(raw1, info.token1Decimals)} ${info.token1Symbol}${usdSuffix}`
}

// options: { nativeSymbol, onWithdraw(info) }  — onWithdraw sweeps the NFT back to the wallet.
function printSicklePositions(infos, options) {
  const { nativeSymbol, onWithdraw } = options
  const byManager = new Map()
  for (const info of infos) {
    if (!byManager.has(info.managerName)) byManager.set(info.managerName, [])
    byManager.get(info.managerName).push(info)
  }

  for (const [managerName, managerInfos] of byManager) {
    _print_bold(`${managerName} positions`)
    for (const [idx, info] of managerInfos.entries()) {
      const indent = () => idx < managerInfos.length - 1 ? _print_inline(`|    `) : _print_inline(`     `)
      const hasLiquidity = BigInt(info.liquidity.toString()) > 0n
      const hasFees = info.fees0Raw > 0n || info.fees1Raw > 0n

      _print(`|`)
      _print(`|-Nft ID: ${info.nftId} ${info.token0Symbol}-${info.token1Symbol} (${sicklePositionsAmountLabel(info, info.amount0Raw, info.amount1Raw, info.positionUsd)})`)

      indent()
      _print_link(`Withdraw NFT`, () => onWithdraw(info))

      if (!window.Sickle || info.poolAddress === ethers.constants.AddressZero) continue

      const poolData = {
        stakingAddress: info.poolAddress,
        poolAddress: info.poolAddress,
        nftManagerAddress: info.nftManagerAddress,
        poolId: '0',
        tickSpacing: info.tickSpacing
      }

      if (hasLiquidity) {
        // Exiting also collects the unclaimed fees, so the label shows position + fees.
        indent()
        _print_link(`Exit to Underlying (${sicklePositionsAmountLabel(info, info.amount0Raw + info.fees0Raw, info.amount1Raw + info.fees1Raw, info.positionUsd === null || info.feesUsd === null ? null : info.positionUsd + info.feesUsd)})`,
          () => window.Sickle.withdraw.withdrawToUnderlying(poolData, info.nftId))
        indent()
        _print_link(`Exit to ${nativeSymbol}`, () => window.Sickle.withdraw.withdrawToToken(poolData, info.nftId))
      }

      if (hasFees) {
        indent()
        _print_link(`Claim Rewards to ${nativeSymbol} (${sicklePositionsAmountLabel(info, info.fees0Raw, info.fees1Raw, info.feesUsd)})`,
          () => window.Sickle.harvest.harvest(poolData, info.nftId))
      }

      if (hasLiquidity && info.currentTick !== undefined) {
        const inRange = info.currentTick >= info.tickLower && info.currentTick < info.tickUpper
        indent()
        _print_link(`Rebalance (${inRange ? '✅ In Range' : '⚠️ Out of Range'})`,
          () => window.Sickle.rebalance.rebalance(poolData, info.nftId, info.tickLower, info.tickUpper, info.currentTick))
      }

      if (hasLiquidity && hasFees) {
        indent()
        _print_link(`Compound (${sicklePositionsAmountLabel(info, info.fees0Raw, info.fees1Raw, info.feesUsd)})`,
          () => window.Sickle.compound.compound(poolData, info.nftId))
      }
    }
    _print(``)
  }
}
