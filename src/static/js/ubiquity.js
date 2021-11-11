$(function() {
  consoleInit(main)
})

const contracts = UBIQUITY_CONTRACTS

const ADDRESS = {
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  TREASURY: '0xefC0e701A824943b469a694aC564Aa1efF7Ab7dd',
}

const formatMwei = (n, round = 2) => {
  return formatMoney(+ethers.utils.formatUnits(n, 'mwei'), round)
}

const formatEther = (n, round = 2) => {
  return formatMoney(+ethers.utils.formatEther(n), round)
}

const toEtherNum = n => +n.toString() / 1e18
const toNum = n => +n.toString()

async function main() {
  print_warning()

  const App = await init_ethers()

  function queryStringAddress() {
    const m = document.location.search.match(/address=([^&]*)/)
    return m && m[1]
  }

  const ACCOUNT = queryStringAddress() || App.YOUR_ADDRESS
  const SIGNER = App.provider.getSigner()
  const CURRENT_BLOCK = await App.provider.getBlockNumber()

  _print(`Initialized ${ACCOUNT}`)
  _print('Reading smart contracts...\n')

  function loadContract(address, abi) {
    return new ethers.Contract(address, abi, SIGNER)
  }

  const manager = loadContract(
    contracts.UbiquityAlgorithmicDollarManager.address,
    contracts.UbiquityAlgorithmicDollarManager.abi
  )

  const sushiSwapPool = loadContract(await manager.sushiSwapPoolAddress(), contracts.SushiSwapPool.abi)

  const C = {
    // Third party contracts
    dai: loadContract(DAI_TOKEN_ADDR, ERC20_ABI),
    curvePool: loadContract(contracts.CurvePool.address, contracts.CurvePool.abi),
    crv3: loadContract(await manager.curve3PoolTokenAddress(), ERC20_ABI),

    // Ubiquity Contracts
    manager,
    uad: loadContract(await manager.dollarTokenAddress(), contracts.UbiquityAlgorithmicDollar.abi),
    uar: loadContract(await manager.autoRedeemTokenAddress(), contracts.UbiquityAutoRedeem.abi),
    ugov: loadContract(await manager.governanceTokenAddress(), contracts.UbiquityGovernance.abi),
    twap: loadContract(await manager.twapOracleAddress(), contracts.TWAPOracle.abi),
    metaPool: loadContract(await manager.stableSwapMetaPoolAddress(), contracts.IMetaPool.abi),
    bondingShare: loadContract(await manager.bondingShareAddress(), contracts.BondingShareV2.abi),
    masterChef: loadContract(await manager.masterChefAddress(), contracts.MasterChefV2.abi),
    bonding: loadContract(await manager.bondingContractAddress(), contracts.BondingV2.abi),
    formulas: loadContract(await manager.formulasAddress(), contracts.UbiquityFormulas.abi),
    sushiSwapPool,
    ugovUadPair: loadContract(await sushiSwapPool.pair(), contracts.UniswapV2Pair.abi),
  }

  // Prices & Balances
  const twapPrice = await C.twap.consult(await C.manager.dollarTokenAddress())
  const [uadIndex, daiIndex] = await C.curvePool.get_coin_indices(C.metaPool.address, C.uad.address, ADDRESS.DAI)
  const uadDai = await C.metaPool['get_dy_underlying(int128,int128,uint256)'](
    uadIndex,
    daiIndex,
    ethers.utils.parseEther('1')
  )
  const reserves = await C.ugovUadPair.getReserves()
  const ubqReserve = +reserves.reserve0.toString()
  const uadReserve = +reserves.reserve1.toString()
  const ubqPrice = ubqReserve / uadReserve

  const balances = {
    uad: await C.uad.balanceOf(ACCOUNT),
    uar: await C.uar.balanceOf(ACCOUNT),
    ubq: await C.ugov.balanceOf(ACCOUNT),
    uad3crv: await C.metaPool.balanceOf(ACCOUNT),
    crv3: await C.crv3.balanceOf(ACCOUNT),
  }

  // const treasuryBalances = {
  //   uad: await uad.balanceOf(ADDRESS.TREASURY),
  //   ubq: await ugov.balanceOf(ADDRESS.TREASURY),
  //   uad3crv: await metaPool.balanceOf(ADDRESS.TREASURY),
  //   dai: await dai.balanceOf(ADDRESS.TREASURY),
  // }

  _print('Finished reading smart contracts...')

  _print('\n========== PRICES ==========')
  _print(`uAD TWAP ${formatEther(twapPrice, 5)}`)
  _print(
    `1 uAD = ${formatEther(
      uadDai,
      5
    )} DAI | Pool: <a target="_blank" href="https://crv.to/">SWAP</a> <a target="_blank" href="https://crv.to/pool">DEPOSIT</a>`
  )
  _print_inline(`1 uAD = ${formatMoney(1 / ubqPrice, 5)} UBQ | Pool: `)
  _print(
    `<a target="_blank" href="https://app.sushi.com/swap?inputCurrency=${C.ugov.address}&outputCurrency=${C.uad.address}">SWAP</a> <a target="_blank" href="https://app.sushi.com/add/${C.ugov.address}/${C.uad.address}">DEPOSIT</a>`
  )

  _print('\n========== YOUR ASSETS ==========')
  _print(`uAD ${formatEther(balances.uad)}`)
  _print(`uAR ${formatEther(balances.uar)}`)
  // _print(`uDEBT 0`)
  _print(`UBQ ${formatEther(balances.ubq)}`)
  _print(`3CRV ${formatEther(balances.crv3)}`)
  _print(`uAD3CRV-f ${formatEther(balances.uad3crv)}`)

  // _print('\n========== Ubiquity DAO Treasury ==========')
  // _print(`uAD ${formatEther(treasuryBalances.uad)}`)
  // _print(`UBQ ${formatEther(treasuryBalances.ubq)}`)
  // _print(`Curve uAD3CRV-f ${formatEther(treasuryBalances.uad3crv)}`)
  // _print(`DAI ${formatEther(treasuryBalances.dai)}`)
  // _print(`SushiSwap SLP 3.161`)

  // _print('\n========== uAD SWAP ==========')

  // _print('Curve SWAP uAD-DAI/USDT/USDC')
  // _print('Curve DEPOSIT uAD-DAI/USDT/USDC and get uAD3CRV-f')
  // _print('Curve REMOVE uAD3CRV-f liquidity')
  // _print('You have 300 uAD3CRV-f and own 1.42% of the pool')
  // _print('Claimable rewards: 40 - CLAIM?')

  // _print('\n========== UBQ SWAP ==========')

  // _print('17.257 UBQ per uAD')
  // _print('Sushi SWAP UBQ-uAD >')
  // _print('Sushi DEPOSIT UBQ-uAD and get UBQ-uAD >')
  // _print('Sushi REMOVE UBQ-uAD liquidity >')
  // _print('Claimable rewards: 100 - CLAIM?')
  // _print('You own 1.12% of the pool / 500 UBQ and 29 uAD')

  function logGas(result) {
    console.log(
      `approveWaiting gas used with 100 gwei / gas:${ethers.utils.formatEther(
        result.gasUsed.mul(ethers.utils.parseUnits('100', 'gwei'))
      )}`
    )
  }

  async function performTransaction(transaction) {
    try {
      const tx = await transaction
      const txR = await tx.wait()
      logGas(txR)
      return true
    } catch (e) {
      console.error('Transaction error', e)
      alert(`Transaction error`)
    }
    return false
  }

  async function stakeDialog() {
    let lpTokens = prompt('How many LP tokens? (leave empty for all)')
    if (!lpTokens) {
      lpTokens = balances.uad3crv
    } else {
      lpTokens = ethers.utils.parseEther(lpTokens)
    }

    const weeks = parseInt(prompt('How many weeks?'))
    if (weeks >= 1 && weeks <= 208) {
      const bigWeeks = ethers.BigNumber.from(weeks)
    } else {
      alert('Must be a number from 1 to 208')
      return
    }

    console.log('LPTokens', lpTokens)

    const allowance = await C.metaPool.allowance(ACCOUNT, C.bonding.address)
    console.log('Allowance', allowance)
    if (allowance.lt(lpTokens)) {
      await performTransaction(C.metaPool.approve(C.bonding.address, lpTokens))
      const allowance2 = await C.metaPool.allowance(ACCOUNT, C.bonding.address)
      console.log('allowance2', formatEther(allowance2))
    }

    const depositWaiting = await C.bonding.deposit(lpTokens, weeks)
    await depositWaiting.wait()
    document.location.reload()
  }

  const blockCountInAWeek = await C.bonding.blockCountInAWeek()
  let userTotalLP = 0

  const pr = (text, num) => text.padRight(num, ' ')

  async function printStake(id) {
    const ugov = await C.masterChef.pendingUGOV(id)
    const bond = await C.bondingShare.getBond(id)

    if (bond.lpAmount.gt(0) || ugov.gt(0)) {
      const endBlock = +bond.endBlock.toString()
      const blocksLeft = endBlock - CURRENT_BLOCK
      const weeksLeft = Math.round((blocksLeft / blockCountInAWeek) * 100) / 100
      const LP_TO_USD = 1 / 0.75

      userTotalLP += bond.lpAmount
      const amountUsd = formatMoney(+ethers.utils.formatEther(bond.lpAmount) * LP_TO_USD, 2)
      const canWithdraw = weeksLeft <= 0

      const depositText = pr(`${formatEther(bond.lpAmount)} LP (~$${amountUsd})}`, 30)
      const rewardText = pr(`${formatEther(ugov, 5)} UBQ`, 16)
      const weeksText = pr(canWithdraw ? 'READY' : `${weeksLeft} weeks`, 13)
      _print_inline(`${depositText}${rewardText}${weeksText}`)
      if (canWithdraw) {
        _print_link(`Claim reward &amp withdraw`, async () => {
          await withdraw(id, bond.lpAmount)
        })
      } else {
        _print_link(`Claim reward`, async () => {
          await redeem(id)
        })
      }
    }
  }

  async function redeem(id) {
    console.log('Redeemeng bonding share ', id)
    await performTransaction(C.masterChef.getRewards(id))
    document.location.reload()
  }

  async function withdraw(id, allLpAmount) {
    const isAllowed = await C.bondingShare.isApprovedForAll(ACCOUNT, C.bonding.address)
    if (!isAllowed) {
      if (!(await performTransaction(C.bondingShare.setApprovalForAll(C.bonding.address, true)))) {
        return
      }
    }
    await performTransaction(C.bonding.removeLiquidity(allLpAmount, ethers.BigNumber.from(id)))
    document.location.reload()
  }

  _print('\n========== LIQUIDITY TOKENS STAKING ==========')
  _print_link(
    `Stake up to ${formatEther(balances.uad3crv)} uAD3CRV-f for 1 to 208 weeks and get UBQ rewards`,
    stakeDialog
  )

  await printApy()
  await printDeposits()

  _print('')
  _print(`<a href="https://uad.ubq.fi/" target="_blank">Official Ubiquity dashboard &raquo;</a>`)

  async function printApy() {
    const ubqPerBlock = await C.masterChef.uGOVPerBlock()
    const ubqMultiplier = await C.masterChef.uGOVmultiplier()
    const ugovDivider = toNum(await C.masterChef.uGOVDivider())
    const actualUbqPerBlock = toEtherNum(ubqPerBlock.mul(ubqMultiplier).div(`${1e18}`))
    const blockCountInAWeek = toNum(await C.bonding.blockCountInAWeek())
    const ubqPerWeek = actualUbqPerBlock * blockCountInAWeek

    const DAYS_IN_A_YEAR = 365.2422
    const totalShares = toEtherNum(await C.masterChef.totalShares())

    const usdPerWeek = ubqPerWeek * ubqPrice
    const usdAsLp = 0.75 // TODO: Calculate more precise value
    const bigNumberOneUsdAsLp = ethers.utils.parseEther(usdAsLp.toString())

    const bondingDiscountMultiplier = await C.bonding.bondingDiscountMultiplier()
    const sharesResults = await Promise.all(
      [1, 50, 100, 208].map(async i => {
        const weeks = ethers.BigNumber.from(i.toString())
        const shares = toEtherNum(
          await C.formulas.durationMultiply(bigNumberOneUsdAsLp, weeks, bondingDiscountMultiplier)
        )
        return [i, shares]
      })
    )
    _print('')
    _print(`<strong>${pr('Staking time', 18)}</strong><strong>${pr('APY', 10)}</strong>`)
    sharesResults.forEach(([weeks, shares]) => {
      const rewardsPerWeek = (shares / totalShares) * usdPerWeek
      const yearlyYield = (rewardsPerWeek / 7) * DAYS_IN_A_YEAR * 100
      const weeksText = pr(`${weeks} ${weeks === 1 ? 'week' : 'weeks'}`, 18)
      const apyText = pr(`${yearlyYield.toPrecision(4)}%`, 10)
      _print(`${weeksText}${apyText}`)
    })

    _print('')
    _print(`UBQ per 1 uAD = ${formatMoney(1 / ubqPrice, 2)}`)
    _print(`UBQ Minted per week = ${formatMoney(ubqPerWeek, 0)} (~$${formatMoney(ubqPerWeek * ubqPrice, 0)})`)
    _print(`Total pool shares = ${formatMoney(totalShares, 2)}`)
  }

  async function printDeposits() {
    const bondingShareIds = await C.bondingShare.holderTokens(ACCOUNT)
    _print('')
    _print(`<strong>${pr('Deposit (APPROX.)', 30)}${pr('Pending reward', 16)}${pr('Unlock time', 13)}Action</strong>`)
    await Promise.all(bondingShareIds.map(printStake))
    _print('')

    const totalShares = await C.masterChef.totalShares()

    const totalUserShares = (await Promise.all(bondingShareIds.map(id => C.masterChef.getBondingShareInfo(id))))
      .map(s => s[0])
      .reduce((sum, val) => {
        return sum.add(val)
      }, ethers.BigNumber.from('0x0'))

    const poolPercentage =
      Math.round(
        +ethers.utils.formatEther(totalUserShares.mul(ethers.utils.parseEther('100')).div(totalShares)) * 10000
      ) / 10000

    _print(`With ${formatEther(totalUserShares, 2)} shares you own ${poolPercentage}% of LP staking pool`)
  }

  hideLoading()
}
