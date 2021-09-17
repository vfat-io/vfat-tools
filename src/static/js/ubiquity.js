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

  // Third party contracts
  const dai = loadContract(DAI_TOKEN_ADDR, ERC20_ABI)
  const curvePool = loadContract(contracts.CurvePool.address, contracts.CurvePool.abi)
  const crv3 = loadContract(await manager.curve3PoolTokenAddress(), ERC20_ABI)

  // Ubiquity Contracts

  const uad = loadContract(await manager.dollarTokenAddress(), contracts.UbiquityAlgorithmicDollar.abi)
  const uar = loadContract(await manager.autoRedeemTokenAddress(), contracts.UbiquityAutoRedeem.abi)
  const ugov = loadContract(await manager.governanceTokenAddress(), contracts.UbiquityGovernance.abi)
  const twap = loadContract(await manager.twapOracleAddress(), contracts.TWAPOracle.abi)
  const metaPool = loadContract(await manager.stableSwapMetaPoolAddress(), contracts.IMetaPool.abi)
  const bondingShare = loadContract(await manager.bondingShareAddress(), contracts.BondingShareV2.abi)
  const masterChef = loadContract(await manager.masterChefAddress(), contracts.MasterChefV2.abi)
  const bonding = loadContract(await manager.bondingContractAddress(), contracts.BondingV2.abi)
  const formulas = loadContract(await manager.formulasAddress(), contracts.UbiquityFormulas.abi)

  // Prices & Balances
  const twapPrice = await twap.consult(await manager.dollarTokenAddress())
  const [uadIndex, daiIndex] = await curvePool.get_coin_indices(metaPool.address, uad.address, ADDRESS.DAI)
  const uadDai = await metaPool['get_dy_underlying(int128,int128,uint256)'](
    uadIndex,
    daiIndex,
    ethers.utils.parseEther('1')
  )

  const balances = {
    uad: await uad.balanceOf(ACCOUNT),
    uar: await uar.balanceOf(ACCOUNT),
    ubq: await ugov.balanceOf(ACCOUNT),
    uad3crv: await metaPool.balanceOf(ACCOUNT),
    crv3: await crv3.balanceOf(ACCOUNT),
  }

  const treasuryBalances = {
    uad: await uad.balanceOf(ADDRESS.TREASURY),
    ubq: await ugov.balanceOf(ADDRESS.TREASURY),
    uad3crv: await metaPool.balanceOf(ADDRESS.TREASURY),
    dai: await dai.balanceOf(ADDRESS.TREASURY),
  }

  _print('Finished reading smart contracts...')

  _print('\n========== PRICES ==========')
  _print(`uAD TWAP ${formatEther(twapPrice, 5)}`)
  _print(`1 uAD = ${formatEther(uadDai, 5)} DAI`)
  // _print(`17.257 UBQ per uAD`)

  _print('\n========== YOUR ASSETS ==========')
  _print(`uAD ${formatEther(balances.uad)}`)
  _print(`uAR ${formatEther(balances.uar)}`)
  // _print(`uDEBT 0`)
  _print(`UBQ ${formatEther(balances.ubq)}`)
  _print(`3CRV ${formatEther(balances.crv3)}`)
  _print(`uAD3CRV-f ${formatEther(balances.uad3crv)}`)

  _print('\n========== Ubiquity DAO Treasury ==========')
  _print(`uAD ${formatEther(treasuryBalances.uad)}`)
  _print(`UBQ ${formatEther(treasuryBalances.ubq)}`)
  _print(`Curve uAD3CRV-f ${formatEther(treasuryBalances.uad3crv)}`)
  _print(`DAI ${formatEther(treasuryBalances.dai)}`)
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

  function logTransactionResult(result) {
    console.log(
      `approveWaiting gas used with 100 gwei / gas:${ethers.utils.formatEther(
        result.gasUsed.mul(ethers.utils.parseUnits('100', 'gwei'))
      )}`
    )
  }

  async function stakeDialog() {
    const allowance = await metaPool.allowance(ACCOUNT, bonding.address)
    console.log('Allowance', allowance)
    let lpTokens = prompt('How many LP tokens? (leave empty for all)')
    if (!lpTokens) {
      lpTokens = balances.uad3crv
    } else {
      lpTokens = ethers.utils.parseEther(lpTokens)
    }

    const weeks = parseInt(prompt('How many weeks?'))
    if (weeks >= 4 && weeks <= 208) {
      const bigWeeks = ethers.BigNumber.from(weeks)

      console.log('Staking!', weeks, bigWeeks, allowance)
    } else {
      alert('Must be a number from 4 to 208')
      return
    }

    console.log('LPTokens', lpTokens)
    if (allowance.lt(lpTokens)) {
      transaction = await metaPool.approve(bonding.address, lpTokens)
      logTransactionResult(await transaction.wait())
      const allowance2 = await metaPool.allowance(account.address, bonding.address)
      console.log('allowance2', formatEther(allowance2))
    }

    const depositWaiting = await bonding.deposit(lpTokens, weeks)
    await depositWaiting.wait()
  }

  const blockCountInAWeek = await bonding.blockCountInAWeek()
  let userTotalLP = 0
  async function printStake(id) {
    const ugov = await masterChef.pendingUGOV(id)
    const bond = await bondingShare.getBond(id)

    const endBlock = +bond.endBlock.toString()
    const blocksLeft = endBlock - CURRENT_BLOCK
    const weeksLeft = Math.round((blocksLeft / blockCountInAWeek) * 100) / 100

    userTotalLP += bond.lpAmount
    _print_inline(
      `  * <strong>${formatEther(bond.lpAmount)} LP</strong> Staked - ${weeksLeft} weeks left (${blocksLeft} blocks) - `
    )
    _print_link(`Claim <strong>${formatEther(ugov)} UBQ</strong> Reward`, async () => {
      await redeem(id)
    })
  }

  async function redeem(id) {
    console.log('Redeemeng bonding share ', id)
    const transaction = await masterChef.getRewards(id)
    logTransactionResult(await transaction.wait())
  }

  _print('\n========== Ubiquity Farming ==========')
  _print(`<a href="https://uad.ubq.fi/" target="_blank">Staking dashboard &raquo;</a>`)
  _print_link(`Stake up to ${formatEther(balances.uad3crv)} uAD3CRV-f for 4 to 208 weeks`, stakeDialog)

  const bondingShareIds = await bondingShare.holderTokens(ACCOUNT)
  await Promise.all(bondingShareIds.map(printStake))
  const totalLP = await bondingShare.totalLP()
  const poolOwnership = Math.round((userTotalLP / totalLP) * 10000) / 100
  _print(`${poolOwnership}% of LP tokens stake pool ownership (total pool is ${formatEther(totalLP)})`)
  _print(`Current block: ${CURRENT_BLOCK} | Blocks in a week: ${blockCountInAWeek} seconds`)

  const multiplier = await bonding.bondingDiscountMultiplier()
  async function printRewardPrediction(lpTokens, weeks) {
    const shares = await formulas.durationMultiply(
      ethers.BigNumber.from(lpTokens),
      ethers.BigNumber.from(weeks),
      multiplier
    )
    _print(`  ${lpTokens} LP tokens for ${weeks} weeks  = ${shares} UBQ`)
  }

  _print(`Reward estimation`)
  await printRewardPrediction(100, 4)
  await printRewardPrediction(100, 10)
  await printRewardPrediction(100, 50)
  await printRewardPrediction(100, 100)
  await printRewardPrediction(100, 200)
  await printRewardPrediction(100, 208)
  hideLoading()
}
