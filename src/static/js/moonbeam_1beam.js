$(function() {
  consoleInit(main)
})

const MINI_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IERC20","name":"lpToken","type":"address"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"}],"name":"LogPoolAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerSecond","type":"uint256"}],"name":"LogRewardPerSecond","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"},{"indexed":false,"internalType":"bool","name":"overwrite","type":"bool"}],"name":"LogSetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accRewardPerShare","type":"uint256"}],"name":"LogUpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"harvestAllRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"pools","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardMinter","outputs":[{"internalType":"contract IMultiFeeDistribution","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewarder","outputs":[{"internalType":"contract IRewarder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"},{"internalType":"bool","name":"overwrite","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMultiFeeDistribution","name":"_rewardMinter","type":"address"}],"name":"setMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerSecond","type":"uint256"}],"name":"setRewardPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"updatePool","outputs":[{"components":[{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"internalType":"struct OneBeamChef.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"int256","name":"rewardDebt","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdrawAndHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const MINI_CHEF_ADDR = '0x265f223011521a6cb222b1f828b04889a6bf50b3'
  const rewardTokenTicker = '1BEAM'
  const rewardTokenAddress = '0x19d2f0CF1FC41DE2b8fd4A98065AB9284E05Cf29'
  const MINI_CHEF = new ethers.Contract(MINI_CHEF_ADDR, MINI_CHEF_ABI, App.provider)

  let rewardsPerWeek = ((await MINI_CHEF.rewardPerSecond()) / 1e18) * 604800

  const tokens = {}
  const prices = await getMoonbeamPrices()
  prices['0xE7a7dFB89F84A0cf850BCd399D0Ec906Ab232E9d'] = {usd: 1} // OB3USD
  prices['0x81f8e465b27BCE60e43DdBfdB2E88B35c2B4F578'] = {usd: 1} // anyBUSD/OB3USD

  const customURLs = {
    add: 'https://app.stellaswap.com/exchange/add',
    remove: 'https://app.stellaswap.com/exchange/remove',
    swap: 'https://app.stellaswap.com/exchange/swap',
    info: 'https://app.stellaswap.com',
  }

  const chef1beam_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
    const signer = App.provider.getSigner()

    const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

    let allow = Promise.resolve()

    if (allowedTokens / 1e18 < currentTokens / 1e18) {
      showLoading()
      allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }

    if (currentTokens / 1e18 > 0) {
      showLoading()
      allow
        .then(async function() {
          CHEF_CONTRACT.deposit(poolIndex, currentTokens, App.YOUR_ADDRESS, {gasLimit: 500000})
            .then(function(t) {
              App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
              })
            })
            .catch(function() {
              hideLoading()
              _print('Something went wrong.')
            })
        })
        .catch(function() {
          hideLoading()
          _print('Something went wrong.')
        })
    } else {
      alert('You have no tokens to stake!!')
    }
  }

  const chef1beam_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
    const signer = App.provider.getSigner()
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

    const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
    const earnedTokenAmount =
      (await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS)) / 1e18

    if (earnedTokenAmount > 0) {
      showLoading()
      CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, App.YOUR_ADDRESS, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const chef1beam_claim = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction, claimFunction) {
    const signer = App.provider.getSigner()

    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

    const earnedTokenAmount =
      (await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS)) / 1e18

    if (earnedTokenAmount > 0) {
      showLoading()
      CHEF_CONTRACT.harvest(poolIndex, App.YOUR_ADDRESS, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  function printChefContractLinks(
    App,
    chefAbi,
    chefAddr,
    poolIndex,
    poolAddress,
    pendingRewardsFunction,
    rewardTokenTicker,
    stakeTokenTicker,
    unstaked,
    userStaked,
    pendingRewardTokens,
    fixedDecimals,
    claimFunction,
    rewardTokenPrice,
    chain,
    depositFee,
    withdrawFee
  ) {
    fixedDecimals = fixedDecimals ?? 2

    const approveAndStake = async function() {
      return chef1beam_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
    }
    const unstake = async function() {
      return chef1beam_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
    }
    const claim = async function() {
      return chef1beam_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
    }
    if (depositFee > 0) {
      _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
    } else {
      _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
    }
    if (withdrawFee > 0) {
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
    } else {
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
    }
    _print_link(
      `Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(
        pendingRewardTokens * rewardTokenPrice
      )})`,
      claim
    )
    _print(`Staking or unstaking also claims rewards.`)
    _print('')
  }

  function printChefPool(
    App,
    chefAbi,
    chefAddr,
    prices,
    tokens,
    poolInfo,
    poolIndex,
    poolPrices,
    totalAllocPoints,
    rewardsPerWeek,
    rewardTokenTicker,
    rewardTokenAddress,
    pendingRewardsFunction,
    fixedDecimals,
    claimFunction,
    chain = 'eth',
    depositFee = 0,
    withdrawFee = 0
  ) {
    fixedDecimals = fixedDecimals ?? 2
    const sp = poolInfo.stakedToken == null ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain)
    var poolRewardsPerWeek = (poolInfo.allocPoints / totalAllocPoints) * rewardsPerWeek
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl
    _print_inline(`${poolIndex} - `)
    poolPrices.print_price(chain, 18, customURLs)
    sp?.print_price(chain)
    const apr = printAPR(
      rewardTokenTicker,
      rewardPrice,
      poolRewardsPerWeek,
      poolPrices.stakeTokenTicker,
      staked_tvl,
      userStaked,
      poolPrices.price,
      fixedDecimals
    )
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked)
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked)
    printChefContractLinks(
      App,
      chefAbi,
      chefAddr,
      poolIndex,
      poolInfo.address,
      pendingRewardsFunction,
      rewardTokenTicker,
      poolPrices.stakeTokenTicker,
      poolInfo.poolToken.unstaked,
      poolInfo.userStaked,
      poolInfo.pendingRewardTokens,
      fixedDecimals,
      claimFunction,
      rewardPrice,
      chain,
      depositFee,
      withdrawFee
    )
    return apr
  }

  async function get1beamPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(poolIndex)
    const lpToken = await chefContract.lpToken(poolIndex)
    if (poolInfo.allocPoint == 0) {
      return {
        address: lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: null,
        userStaked: 0,
        pendingRewardTokens: 0,
      }
    }
    const poolToken = await getMoonbeamToken(app, lpToken ?? poolInfo.token ?? poolInfo.stakingToken, chefAddress)
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS)
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS)
    const staked = userInfo.amount / 10 ** poolToken.decimals
    return {
      address: lpToken ?? poolInfo.token ?? poolInfo.stakingToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked: staked,
      pendingRewardTokens: pendingRewardTokens / 10 ** 18,
      depositFee: (poolInfo.depositFeeBP ?? 0) / 100,
      withdrawFee: (poolInfo.withdrawFeeBP ?? 0) / 100,
    }
  }

  async function load1beamChefContract(
    App,
    tokens,
    prices,
    chef,
    chefAddress,
    chefAbi,
    rewardTokenTicker,
    rewardTokenAddress,
    rewardsPerBlockFunction,
    rewardsPerWeekFixed,
    pendingRewardsFunction,
    deathPoolIndices,
    claimFunction
  ) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider)

    const poolCount = parseInt(await chefContract.poolLength(), 10)
    const totalAllocPoints = await chefContract.totalAllocPoint()

    _print(`<a href='https://moonscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`)
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`)

    const rewardToken = await getMoonbeamToken(App, rewardTokenAddress, chefAddress)
    const rewardsPerWeek =
      rewardsPerWeekFixed ??
      (((await chefContract.callStatic[rewardsPerBlockFunction]()) / 10 ** rewardToken.decimals) * 604800) / 3

    const poolInfos = await Promise.all(
      [...Array(poolCount).keys()].map(
        async x => await get1beamPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)
      )
    )

    var tokenAddresses = [].concat.apply(
      [],
      poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens)
    )

    await Promise.all(
      tokenAddresses.map(async address => {
        tokens[address] = await getMoonbeamToken(App, address, chefAddress)
      })
    )

    if (deathPoolIndices) {
      //load prices for the deathpool assets
      deathPoolIndices
        .map(i => poolInfos[i])
        .map(poolInfo =>
          poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'moonbeam') : undefined
        )
    }

    const poolPrices = poolInfos.map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'moonbeam') : undefined
    )

    _print('Finished reading smart contracts.\n')

    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printChefPool(
          App,
          chefAbi,
          chefAddress,
          prices,
          tokens,
          poolInfos[i],
          i,
          poolPrices[i],
          totalAllocPoints,
          rewardsPerWeek,
          rewardTokenTicker,
          rewardTokenAddress,
          pendingRewardsFunction,
          null,
          claimFunction,
          'moonbeam',
          poolInfos[i].depositFee,
          poolInfos[i].withdrawFee
        )
        aprs.push(apr)
      }
    }
    let totalUserStaked = 0,
      totalStaked = 0,
      averageApr = 0
    for (const a of aprs) {
      if (!isNaN(a.totalStakedUsd)) {
        totalStaked += a.totalStakedUsd
      }
      if (a.userStakedUsd > 0) {
        totalUserStaked += a.userStakedUsd
        averageApr += (a.userStakedUsd * a.yearlyAPR) / 100
      }
    }
    averageApr = averageApr / totalUserStaked
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`)
    if (totalUserStaked > 0) {
      _print_bold(
        `\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(
          averageApr * 100
        ).toFixed(2)}%`
      )
      _print(
        `Estimated earnings:` +
          ` Day $${formatMoney((totalUserStaked * averageApr) / 365)}` +
          ` Week $${formatMoney((totalUserStaked * averageApr) / 52)}` +
          ` Year $${formatMoney(totalUserStaked * averageApr)}\n`
      )
    }
    return {prices, totalUserStaked, totalStaked, averageApr}
  }

  await load1beamChefContract(
    App,
    tokens,
    prices,
    MINI_CHEF,
    MINI_CHEF_ADDR,
    MINI_CHEF_ABI,
    rewardTokenTicker,
    rewardTokenAddress,
    null,
    rewardsPerWeek,
    'pendingReward',
    null
  )

  hideLoading()
}
