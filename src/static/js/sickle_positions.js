// Shared helpers for the generic <chain>/sickle pages: list the CL position NFTs
// held by a Sickle, resolve each one's pool and print the per-NFT Sickle actions.
//
// Each family describes its NFT manager positions() and pool ticks() layouts as word
// indexes (both are decoded as raw 32-byte words), how to find the pool, and which
// pool getters hold the price and fee growth.
//   univ3           - Uniswap V3 and forks (Pancake, Sushi, ...): getPool(t0, t1, fee)
//   ramsesV2        - Ramses V2 / "CL NFP" forks (Pharaoh, Nile, Cleopatra): as univ3, ticks() adds boosted liquidity words
//   slipstream      - Aerodrome/Velodrome Slipstream and forks: getPool(t0, t1, tickSpacing)
//   ramsesV3        - Ramses V3 / Shadow / Pharaoh V3 / Etherex: factory from deployer(), getPool(t0, t1, tickSpacing)
//   algebraV1       - Algebra 1.x (Camelot, QuickSwap, ...): poolByPair(t0, t1)
//   algebraIntegral - Algebra Integral (Thena, Blackhole, Kittenswap, ...): poolByPair / customPoolByPair(deployer, t0, t1)
//   algebraIntegralNoDeployer - Integral pools behind an older manager without the deployer field (SwapX, Nest)

const SICKLE_POSITIONS_JSON_ABI = (fragments) =>
  JSON.parse(new ethers.utils.Interface(fragments).format(ethers.utils.FormatTypes.json))

const SICKLE_POSITIONS_WORDS_ABI = (name, inputs, count) => SICKLE_POSITIONS_JSON_ABI([
  `function ${name}(${inputs}) view returns (${Array.from({ length: count }, (_, i) => `uint256 w${i}`).join(', ')})`
])

const SICKLE_POSITIONS_UNISWAP_POOL = { state: 'slot0', feeGrowth0: 'feeGrowthGlobal0X128', feeGrowth1: 'feeGrowthGlobal1X128' }
const SICKLE_POSITIONS_ALGEBRA_POOL = { state: 'globalState', feeGrowth0: 'totalFeeGrowth0Token', feeGrowth1: 'totalFeeGrowth1Token' }
const SICKLE_POSITIONS_V3_LAYOUT = { words: 12, token0: 2, token1: 3, key: 4, tickLower: 5, tickUpper: 6, liquidity: 7, feeInside0: 8, feeInside1: 9, owed0: 10, owed1: 11 }

const SICKLE_POSITIONS_FAMILIES = {
  univ3: { position: SICKLE_POSITIONS_V3_LAYOUT, pool: SICKLE_POSITIONS_UNISWAP_POOL, tickFeeOutside0: 2, getPool: 'function getPool(address, address, uint24) view returns (address)' },
  ramsesV2: { position: SICKLE_POSITIONS_V3_LAYOUT, pool: SICKLE_POSITIONS_UNISWAP_POOL, tickFeeOutside0: 4, getPool: 'function getPool(address, address, uint24) view returns (address)' },
  slipstream: { position: SICKLE_POSITIONS_V3_LAYOUT, pool: SICKLE_POSITIONS_UNISWAP_POOL, tickFeeOutside0: 3, getPool: 'function getPool(address, address, int24) view returns (address)' },
  ramsesV3: {
    position: { words: 10, token0: 0, token1: 1, key: 2, tickLower: 3, tickUpper: 4, liquidity: 5, feeInside0: 6, feeInside1: 7, owed0: 8, owed1: 9 },
    pool: SICKLE_POSITIONS_UNISWAP_POOL, tickFeeOutside0: 2, factoryFromDeployer: true, getPool: 'function getPool(address, address, int24) view returns (address)'
  },
  algebraV1: {
    position: { words: 11, token0: 2, token1: 3, tickLower: 4, tickUpper: 5, liquidity: 6, feeInside0: 7, feeInside1: 8, owed0: 9, owed1: 10 },
    pool: SICKLE_POSITIONS_ALGEBRA_POOL, tickFeeOutside0: 2, getPool: 'function poolByPair(address, address) view returns (address)'
  },
  algebraIntegralNoDeployer: {
    position: { words: 11, token0: 2, token1: 3, tickLower: 4, tickUpper: 5, liquidity: 6, feeInside0: 7, feeInside1: 8, owed0: 9, owed1: 10 },
    pool: SICKLE_POSITIONS_ALGEBRA_POOL, tickFeeOutside0: 4, getPool: 'function poolByPair(address, address) view returns (address)'
  },
  algebraIntegral: {
    position: { ...SICKLE_POSITIONS_V3_LAYOUT, key: undefined, deployer: 4 },
    pool: SICKLE_POSITIONS_ALGEBRA_POOL, tickFeeOutside0: 4, getPool: 'function poolByPair(address, address) view returns (address)',
    getCustomPool: 'function customPoolByPair(address, address, address) view returns (address)'
  }
}

const SICKLE_POSITIONS_NFT_MANAGER_ABI = SICKLE_POSITIONS_JSON_ABI([
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  'function factory() view returns (address)',
  'function deployer() view returns (address)'
])

const SICKLE_POSITIONS_DEPLOYER_ABI = SICKLE_POSITIONS_JSON_ABI(['function RamsesV3Factory() view returns (address)'])

const SICKLE_POSITIONS_ERC20_ABI = SICKLE_POSITIONS_JSON_ABI([
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)'
])

const sicklePositionsAddress = (word) => ethers.utils.getAddress('0x' + ethers.BigNumber.from(word).toHexString().slice(2).padStart(40, '0').slice(-40))
const sicklePositionsInt = (word) => ethers.BigNumber.from(word).fromTwos(256).toNumber()
const sicklePositionsBig = (word) => BigInt(word.toString())

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

// managers: [{ name, address, family, actions? }] (actions: false = quote API has no strategy, Withdraw only); llamaChain: DefiLlama chain key (e.g. "base") for unlisted tokens.
// Returns one info object per NFT held by the Sickle.
async function loadSicklePositions(App, sickleAddress, managers, prices, llamaChain) {
  const nftManagers = managers.map(m => new ethcall.Contract(m.address, SICKLE_POSITIONS_NFT_MANAGER_ABI))
  const balances = await App.ethcallProvider.all(nftManagers.map(c => c.balanceOf(sickleAddress)))

  const held = []
  managers.forEach((manager, i) => {
    for (let j = 0; j < Number(balances[i]); j++) held.push({ manager, index: j, contract: nftManagers[i] })
  })
  if (held.length === 0) return []

  const nftIds = await App.ethcallProvider.all(held.map(h => h.contract.tokenOfOwnerByIndex(sickleAddress, h.index)))
  return loadSicklePositionsByIds(App, held.map((h, i) => ({ manager: h.manager, nftId: nftIds[i] })), prices, llamaChain)
}

// entries: [{ manager, nftId }]
async function loadSicklePositionsByIds(App, entries, prices, llamaChain) {
  const familyOf = (manager) => SICKLE_POSITIONS_FAMILIES[manager.family]

  const positions = (await App.ethcallProvider.all(entries.map(e => {
    const layout = familyOf(e.manager).position
    return new ethcall.Contract(e.manager.address, SICKLE_POSITIONS_WORDS_ABI('positions', 'uint256', layout.words)).positions(e.nftId)
  }))).map((words, i) => {
    const layout = familyOf(entries[i].manager).position
    return {
      token0: sicklePositionsAddress(words[layout.token0]),
      token1: sicklePositionsAddress(words[layout.token1]),
      key: layout.key !== undefined ? sicklePositionsInt(words[layout.key]) : undefined,
      deployer: layout.deployer !== undefined ? sicklePositionsAddress(words[layout.deployer]) : undefined,
      tickLower: sicklePositionsInt(words[layout.tickLower]),
      tickUpper: sicklePositionsInt(words[layout.tickUpper]),
      liquidity: sicklePositionsBig(words[layout.liquidity]),
      feeInside0: words[layout.feeInside0],
      feeInside1: words[layout.feeInside1],
      owed0: words[layout.owed0],
      owed1: words[layout.owed1]
    }
  })

  // Pool factory per manager: factory(), or deployer().RamsesV3Factory() for Ramses V3.
  const usedManagers = [...new Set(entries.map(e => e.manager))]
  const factoryOf = new Map()
  const managerFactories = await App.ethcallProvider.all(usedManagers.map(m => {
    const c = new ethcall.Contract(m.address, SICKLE_POSITIONS_NFT_MANAGER_ABI)
    return familyOf(m).factoryFromDeployer ? c.deployer() : c.factory()
  }))
  const deployerManagers = usedManagers.filter(m => familyOf(m).factoryFromDeployer)
  const deployerFactories = await App.ethcallProvider.all(deployerManagers.map(m =>
    new ethcall.Contract(managerFactories[usedManagers.indexOf(m)], SICKLE_POSITIONS_DEPLOYER_ABI).RamsesV3Factory()))
  usedManagers.forEach((m, i) => factoryOf.set(m, managerFactories[i]))
  deployerManagers.forEach((m, i) => factoryOf.set(m, deployerFactories[i]))

  const pools = await App.ethcallProvider.all(entries.map((e, i) => {
    const family = familyOf(e.manager)
    const pos = positions[i]
    if (pos.deployer && pos.deployer !== ethers.constants.AddressZero) {
      return new ethcall.Contract(factoryOf.get(e.manager), SICKLE_POSITIONS_JSON_ABI([family.getCustomPool])).customPoolByPair(pos.deployer, pos.token0, pos.token1)
    }
    const factory = new ethcall.Contract(factoryOf.get(e.manager), SICKLE_POSITIONS_JSON_ABI([family.getPool]))
    return pos.key !== undefined ? factory.getPool(pos.token0, pos.token1, pos.key) : factory.poolByPair(pos.token0, pos.token1)
  }))

  const tokenAddresses = [...new Set(positions.flatMap(p => [p.token0, p.token1]))]
  const tokenCalls = tokenAddresses.flatMap(t => {
    const c = new ethcall.Contract(t, SICKLE_POSITIONS_ERC20_ABI)
    return [c.symbol(), c.decimals()]
  })
  const tokenData = await App.ethcallProvider.all(tokenCalls)
  const tokenInfo = new Map(tokenAddresses.map((t, i) => [t, { symbol: tokenData[2 * i], decimals: Number(tokenData[2 * i + 1]) }]))

  const infos = await Promise.all(entries.map(async (e, i) => {
    const family = familyOf(e.manager)
    const pos = positions[i]
    const poolAddress = pools[i]
    const t0 = tokenInfo.get(pos.token0)
    const t1 = tokenInfo.get(pos.token1)
    const info = {
      managerName: e.manager.name,
      nftManagerAddress: e.manager.address,
      family: e.manager.family,
      sickleActions: e.manager.actions !== false,
      nftId: e.nftId.toString(),
      poolAddress,
      token0Address: pos.token0,
      token1Address: pos.token1,
      token0Symbol: t0.symbol,
      token1Symbol: t1.symbol,
      token0Decimals: t0.decimals,
      token1Decimals: t1.decimals,
      tickLower: pos.tickLower,
      tickUpper: pos.tickUpper,
      liquidity: pos.liquidity,
      amount0Raw: 0n,
      amount1Raw: 0n,
      fees0Raw: 0n,
      fees1Raw: 0n
    }
    if (poolAddress === ethers.constants.AddressZero) return info

    try {
      const tickWords = family.tickFeeOutside0 + 2
      const pool = new ethcall.Contract(poolAddress, [
        ...SICKLE_POSITIONS_WORDS_ABI(family.pool.state, '', 2),
        ...SICKLE_POSITIONS_JSON_ABI([
          'function tickSpacing() view returns (int24)',
          `function ${family.pool.feeGrowth0}() view returns (uint256)`,
          `function ${family.pool.feeGrowth1}() view returns (uint256)`
        ]),
        ...SICKLE_POSITIONS_WORDS_ABI('ticks', 'int24', tickWords)
      ])
      const [state, tickSpacing, g0, g1, lower, upper] = await App.ethcallProvider.all([
        pool[family.pool.state](), pool.tickSpacing(), pool[family.pool.feeGrowth0](), pool[family.pool.feeGrowth1](),
        pool.ticks(pos.tickLower), pool.ticks(pos.tickUpper)
      ])
      const sqrtPriceX96 = state[0]
      info.currentTick = sicklePositionsInt(state[1])
      info.tickSpacing = Number(tickSpacing)

      if (pos.liquidity > 0n) {
        const { liquidity0, liquidity1 } = window.UniswapV3.calculateUserLiquidity(sqrtPriceX96, {
          tickLower: pos.tickLower, tickUpper: pos.tickUpper, liquidity: pos.liquidity
        })
        info.amount0Raw = liquidity0
        info.amount1Raw = liquidity1
      }

      const outside = (tick) => ({
        feeGrowthOutside0X128: tick[family.tickFeeOutside0],
        feeGrowthOutside1X128: tick[family.tickFeeOutside0 + 1]
      })
      const { fees0Raw, fees1Raw } = window.UniswapV3.computeUnclaimedFees({
        currentTick: info.currentTick,
        tickLower: pos.tickLower,
        tickUpper: pos.tickUpper,
        liquidity: pos.liquidity,
        feeGrowthGlobal0X128: g0,
        feeGrowthGlobal1X128: g1,
        lower: outside(lower),
        upper: outside(upper),
        feeGrowthInside0LastX128: pos.feeInside0,
        feeGrowthInside1LastX128: pos.feeInside1,
        tokensOwed0: pos.owed0,
        tokensOwed1: pos.owed1
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
  // Labels are HTML, so "<" is escaped
  const usdSuffix = !usd ? '' : usd < 0.01 ? ' &lt; $0.01' : ` ≈ $${formatMoney(usd)}`
  return `${fmt(raw0, info.token0Decimals)} ${info.token0Symbol} + ${fmt(raw1, info.token1Decimals)} ${info.token1Symbol}${usdSuffix}`
}

// Exit removes the position plus its uncollected fees.
function sicklePositionsExitLabel(info, target) {
  const usd = info.positionUsd === null || info.feesUsd === null ? null : info.positionUsd + info.feesUsd
  return `Exit to ${target} (${sicklePositionsAmountLabel(info, info.amount0Raw + info.fees0Raw, info.amount1Raw + info.fees1Raw, usd)})`
}

// Rebalance claims the fees to the wallet and re-mints only the position's own amounts.
function sicklePositionsRebalanceLabel(info, inRange) {
  return `Rebalance ${inRange ? '✅ In Range' : '⚠️ Out of Range'} (${sicklePositionsAmountLabel(info, info.amount0Raw, info.amount1Raw, info.positionUsd)})`
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

      const hasActions = info.sickleActions && info.poolAddress !== ethers.constants.AddressZero
      const poolData = {
        stakingAddress: info.poolAddress,
        poolAddress: info.poolAddress,
        nftManagerAddress: info.nftManagerAddress,
        poolId: '0',
        tickSpacing: info.tickSpacing
      }
      const buildsLocally = hasActions && !window.Sickle && window.SickleLocal?.canBuildLocally(parseInt(pageNetwork().chainId, 16), poolData)

      indent()
      _print_link(`Withdraw NFT`, () => buildsLocally ? window.SickleLocal.withdraw.withdrawNft(poolData, info.nftId) : onWithdraw(info))

      if (!hasActions) continue

      // Without ?api=true, offer only the actions built locally (no quote API).
      if (!window.Sickle) {
        const localChainId = parseInt(pageNetwork().chainId, 16)
        if (!window.SickleLocal?.canBuildLocally(localChainId, poolData)) continue
        const canSwap = window.SickleLocal.canSwapLocallyFor(localChainId, poolData)
        if (hasLiquidity) {
          indent()
          _print_link(sicklePositionsExitLabel(info, 'Underlying'),
            () => window.SickleLocal.withdraw.withdrawToUnderlying(poolData, info.nftId))
          if (canSwap) {
            indent()
            _print_link(sicklePositionsExitLabel(info, nativeSymbol), () => window.SickleLocal.withdraw.withdrawToToken(poolData, info.nftId))
          }
        }
        if (hasFees) {
          indent()
          _print_link(`Claim Rewards to Underlying (${sicklePositionsAmountLabel(info, info.fees0Raw, info.fees1Raw, info.feesUsd)})`,
            () => window.SickleLocal.harvest.harvestToUnderlying(poolData, info.nftId))
          if (canSwap) {
            indent()
            _print_link(`Claim Rewards to ${nativeSymbol} (${sicklePositionsAmountLabel(info, info.fees0Raw, info.fees1Raw, info.feesUsd)})`,
              () => window.SickleLocal.harvest.harvestToNative(poolData, info.nftId))
          }
        }
        if (canSwap && hasLiquidity && info.currentTick !== undefined) {
          const inRange = info.currentTick >= info.tickLower && info.currentTick < info.tickUpper
          indent()
          _print_link(sicklePositionsRebalanceLabel(info, inRange),
            () => window.SickleLocal.rebalance.rebalance(poolData, info.nftId, info.tickLower, info.tickUpper, info.currentTick))
        }
        if (canSwap && hasLiquidity && hasFees) {
          indent()
          _print_link(`Compound (${sicklePositionsAmountLabel(info, info.fees0Raw, info.fees1Raw, info.feesUsd)})`,
            () => window.SickleLocal.compound.compound(poolData, info.nftId))
        }
        continue
      }

      if (hasLiquidity) {
        // Exiting also collects the unclaimed fees, so the label shows position + fees.
        indent()
        _print_link(sicklePositionsExitLabel(info, 'Underlying'),
          () => window.Sickle.withdraw.withdrawToUnderlying(poolData, info.nftId))
        indent()
        _print_link(sicklePositionsExitLabel(info, nativeSymbol), () => window.Sickle.withdraw.withdrawToToken(poolData, info.nftId))
      }

      if (hasFees) {
        indent()
        _print_link(`Claim Rewards to Underlying (${sicklePositionsAmountLabel(info, info.fees0Raw, info.fees1Raw, info.feesUsd)})`,
          () => window.Sickle.harvest.harvestToUnderlying(poolData, info.nftId))
        indent()
        _print_link(`Claim Rewards to ${nativeSymbol} (${sicklePositionsAmountLabel(info, info.fees0Raw, info.fees1Raw, info.feesUsd)})`,
          () => window.Sickle.harvest.harvest(poolData, info.nftId))
      }

      if (hasLiquidity && info.currentTick !== undefined) {
        const inRange = info.currentTick >= info.tickLower && info.currentTick < info.tickUpper
        indent()
        _print_link(sicklePositionsRebalanceLabel(info, inRange),
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
