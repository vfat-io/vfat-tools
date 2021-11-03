$(function() {
  consoleInit(main)
})

var POOL_V2_ABI = [
  {
    inputs: [],
    name: 'REWARD_TOKEN',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'STAKE_TOKEN',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'endBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'compound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositBurnFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'pendingReward',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardPerBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalStaked',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewardDebt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

var POOL_DUAL_REWARDS_V1_ABI = [
  {
    inputs: [],
    name: 'REWARD_TOKEN0',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'REWARD_TOKEN1',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'STAKE_TOKEN',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'endBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositBurnFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'pendingReward',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'reward0PerBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'reward1PerBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalStaked',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'reward0Debt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'reward1Debt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

async function getGasStationMaticPoolInfo(app, poolContract, poolAddress, rewardTokenAddresses, rewardTokens) {
  var stakeToken = await poolContract.STAKE_TOKEN()
  var depositFee = await poolContract.depositFee()
  var burnFee = await poolContract.depositBurnFee()
  var withdrawFee = 0

  try {
    withdrawFee = await poolContract.withdrawFee()
  } catch (err) {}

  var poolToken = await getMaticToken(app, stakeToken, poolAddress)
  var userInfo = await poolContract.userInfo(app.YOUR_ADDRESS)
  var pendingRewards = {}

  try {
    var pendingReward = await poolContract.pendingReward(app.YOUR_ADDRESS)

    if (rewardTokenAddresses.length == 1) {
      pendingRewards[rewardTokenAddresses[0]] = pendingReward / 10 ** rewardTokens[rewardTokenAddresses[0]].decimals
    } else {
      var [pendingReward0, pendingReward1] = pendingReward

      pendingRewards[rewardTokenAddresses[0]] = pendingReward0 / 10 ** rewardTokens[rewardTokenAddresses[0]].decimals
      pendingRewards[rewardTokenAddresses[1]] = pendingReward1 / 10 ** rewardTokens[rewardTokenAddresses[1]].decimals
    }
  } catch (err) {}

  var staked = userInfo.amount / 10 ** poolToken.decimals
  return {
    address: stakeToken,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewardTokens: pendingRewards,
    depositFee: (depositFee ?? 0) / 100,
    burnFee: (burnFee ?? 0) / 100,
    withdrawFee: (withdrawFee ?? 0) / 100,
  }
}

var poolContract_GasStation_stake = async function(poolAbi, poolAddress, stakeTokenAddr, App) {
  var signer = App.provider.getSigner()

  var STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  var POOL_CONTRACT = new ethers.Contract(poolAddress, poolAbi, signer)

  var currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  var allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, poolAddress)

  var allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(poolAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash).then(function() {
          hideLoading()
        })
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
        POOL_CONTRACT.deposit(currentTokens)
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

var poolContract_GasStation_unstake = async function(poolAbi, poolAddress, App) {
  var signer = App.provider.getSigner()
  var POOL_CONTRACT = new ethers.Contract(poolAddress, poolAbi, signer)

  var currentStakedAmount = (await POOL_CONTRACT.userInfo(App.YOUR_ADDRESS)).amount
  var earnedTokenAmount = (await POOL_CONTRACT.pendingReward(App.YOUR_ADDRESS)) / 1e18

  if (currentStakedAmount > 0) {
    showLoading()
    POOL_CONTRACT.withdraw(currentStakedAmount)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash).then(function() {
          hideLoading()
        })
      })
      .catch(function() {
        hideLoading()
      })
  }
}

var poolContract_GasStation_claim = async function(poolAbi, poolAddress, App) {
  var signer = App.provider.getSigner()

  var POOL_CONTRACT = new ethers.Contract(poolAddress, poolAbi, signer)

  var pendingRewards = await POOL_CONTRACT.pendingReward(App.YOUR_ADDRESS)

  var earnedTokenAmount = 0

  if (Array.isArray(pendingRewards)) {
    earnedTokenAmount += pendingRewards[0] / 1e18
    earnedTokenAmount += pendingRewards[1] / 1e18
  } else {
    earnedTokenAmount += pendingRewards / 1e18
  }

  if (earnedTokenAmount > 0) {
    showLoading()

    POOL_CONTRACT.deposit(0)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash).then(function() {
          hideLoading()
        })
      })
      .catch(function() {
        hideLoading()
      })
  }
}

var poolContract_GasStation_emergencyWithdraw = async function(poolAbi, poolAddress, App) {
  var signer = App.provider.getSigner()

  var POOL_CONTRACT = new ethers.Contract(poolAddress, poolAbi, signer)

  var currentStakedAmount = (await POOL_CONTRACT.userInfo(App.YOUR_ADDRESS)).amount

  if (currentStakedAmount > 0) {
    showLoading()

    POOL_CONTRACT.emergencyWithdraw()
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash).then(function() {
          hideLoading()
        })
      })
      .catch(function() {
        hideLoading()
      })
  }
}

function printGasStationAPR(
  rewardTokens,
  rewardPrices,
  poolRewardsPerWeek,
  rewardTokenAddresses,
  stakeTokenTicker,
  staked_tvl,
  userStaked,
  poolTokenPrice,
  fixedDecimals
) {
  var rewardYearlyAprs = 0

  Object.keys(poolRewardsPerWeek).forEach(token => {
    var usdPerWeek = poolRewardsPerWeek[token] * rewardPrices[token]
    fixedDecimals = fixedDecimals ?? 2
    _print(
      `${rewardTokens[token].symbol} Per Week: ${poolRewardsPerWeek[token].toFixed(fixedDecimals)} ($${formatMoney(
        usdPerWeek
      )})`
    )
    var weeklyAPR = (usdPerWeek / staked_tvl) * 100
    var dailyAPR = weeklyAPR / 7
    var yearlyAPR = weeklyAPR * 52

    _print(
      `${rewardTokens[token].symbol} APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(
        2
      )}% Year ${yearlyAPR.toFixed(2)}%`
    )

    rewardYearlyAprs = rewardYearlyAprs + yearlyAPR
  })

  var userStakedUsd = userStaked * poolTokenPrice
  var userStakedPct = (userStakedUsd / staked_tvl) * 100
  _print(
    `You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(
      userStakedUsd
    )}), ${userStakedPct.toFixed(2)}% of the pool.`
  )

  var userYearlyRewardsTotal = 0

  Object.keys(poolRewardsPerWeek).forEach(token => {
    var userWeeklyRewards = (userStakedPct * poolRewardsPerWeek[token]) / 100
    var userDailyRewards = userWeeklyRewards / 7
    var userYearlyRewards = userWeeklyRewards * 52
    if (userStaked > 0) {
      _print(
        `Estimated ${rewardTokens[token].symbol} earnings:` +
          ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards * rewardPrices[token])})` +
          ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(
            userWeeklyRewards * rewardPrices[token]
          )})` +
          ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards * rewardPrices[token])})`
      )
    }

    userYearlyRewardsTotal = userYearlyRewardsTotal + userYearlyRewards * rewardPrices[token]
  })

  return {
    userStakedUsd,
    totalStakedUsd: staked_tvl,
    userStakedPct,
    yearlyAPR: rewardYearlyAprs,
    userYearlyUsd: userYearlyRewardsTotal,
  }
}

function printGasStationMaticPoolLinks(
  App,
  poolAbi,
  poolAddr,
  poolAddress,
  rewardTokens,
  rewardTokenAddresses,
  stakeTokenTicker,
  unstaked,
  userStaked,
  pendingRewardTokens,
  fixedDecimals,
  rewardTokenPrices,
  depositFee,
  burnFee,
  withdrawFee,
  currentBlock,
  startBlock,
  endBlock
) {
  fixedDecimals = fixedDecimals ?? 2
  var approveAndStake = async function() {
    return poolContract_GasStation_stake(poolAbi, poolAddr, poolAddress, App)
  }
  var unstake = async function() {
    return poolContract_GasStation_unstake(poolAbi, poolAddr, App)
  }
  var claim = async function() {
    return poolContract_GasStation_claim(poolAbi, poolAddr, App)
  }
  if (depositFee > 0 || burnFee > 0) {
    _print_link(
      `Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} -${
        depositFee > 0 ? ' Deposit Fee ' + depositFee + '%' : ''
      }${burnFee > 0 ? ' Burn Fee ' + burnFee + '%' : ''}`,
      approveAndStake
    )
  } else {
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  }
  if (withdrawFee > 0) {
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
  } else {
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  }
  if (rewardTokenAddresses.length == 1) {
    _print_link(
      `Claim ${pendingRewardTokens[rewardTokenAddresses[0]].toFixed(fixedDecimals)} ${
        rewardTokens[rewardTokenAddresses[0]].symbol
      } ($${formatMoney(pendingRewardTokens[rewardTokenAddresses[0]] * rewardTokenPrices[rewardTokenAddresses[0]])})`,
      claim
    )
  } else {
    _print_link(
      `Claim ${pendingRewardTokens[rewardTokenAddresses[0]].toFixed(fixedDecimals)} ${
        rewardTokens[rewardTokenAddresses[0]].symbol
      }+${rewardTokens[rewardTokenAddresses[1]].symbol} ($${formatMoney(
        pendingRewardTokens[rewardTokenAddresses[0]] * rewardTokenPrices[rewardTokenAddresses[0]]
      ) + formatMoney(pendingRewardTokens[rewardTokenAddresses[1]] * rewardTokenPrices[rewardTokenAddresses[1]])})`,
      claim
    )
  }

  if (currentBlock < startBlock) {
    _print(
      `Fuel Tank starts in <a href='https://polygonscan.com/block/countdown/${startBlock}' target='_blank'>${startBlock}</a>`
    )
  } else if (currentBlock < endBlock) {
    _print(
      `Fuel Tank finishes in <a href='https://polygonscan.com/block/countdown/${endBlock}' target='_blank'>${endBlock}</a>`
    )
  } else {
    _print('Fuel Tank Finished!!!')
  }

  _print(`Staking or unstaking also claims rewards.`)
  _print('')
}

function printGasStationMaticPool(
  App,
  poolAbi,
  poolAddr,
  prices,
  tokens,
  poolInfo,
  poolPrices,
  rewardsPerWeek,
  rewardTokens,
  rewardTokenAddresses,
  fixedDecimals,
  depositFee = 0,
  burnFee = 0,
  withdrawFee = 0,
  currentBlock,
  startBlock,
  endBlock
) {
  fixedDecimals = fixedDecimals ?? 2
  var sp = poolInfo.stakedToken == null ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, 'matic')

  var userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked
  var rewardPrices = {}

  for (var rewardTokenAddress of rewardTokenAddresses) {
    rewardPrices[rewardTokenAddress] = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd
  }
  var staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl

  // _print_inline(`${poolIndex} - `);
  poolPrices.print_price('matic')
  sp?.print_price('matic')

  var apr = printGasStationAPR(
    rewardTokens,
    rewardPrices,
    rewardsPerWeek,
    rewardTokenAddresses,
    poolPrices.stakeTokenTicker,
    staked_tvl,
    userStaked,
    poolPrices.price,
    fixedDecimals
  )

  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked)
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked)

  printGasStationMaticPoolLinks(
    App,
    poolAbi,
    poolAddr,
    poolInfo.address,
    rewardTokens,
    rewardTokenAddresses,
    poolPrices.stakeTokenTicker,
    poolInfo.poolToken.unstaked,
    poolInfo.userStaked,
    poolInfo.pendingRewardTokens,
    fixedDecimals,
    rewardPrices,
    depositFee,
    burnFee,
    withdrawFee,
    currentBlock,
    startBlock,
    endBlock
  )
  return apr
}

async function main() {
  var App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Loading Pools...\n')

  var currentBlock = await App.provider.getBlockNumber()

  var poolsResponse = await fetch(`https://www.gasstationcrypto.com/pools.json`)

  var pools = await poolsResponse.json()

  _print(`${pools['polygon'].length} Pools Found...\n`)
  _print('Reading smart contracts...\n')

  var aprs = []
  var tokens = {}
  var prices = await getMaticPrices()

  var lpToken = await getMaticToken(
    App,
    '0x2637cE16E98fCc66F2CCdD36087DEFdCf955b68A',
    '0x0000000000000000000000000000000000000000'
  )
  await Promise.all(
    lpToken.tokens.map(async address => {
      tokens[address] = await getMaticToken(App, address, '0x0000000000000000000000000000000000000000')
    })
  )
  getPoolPrices(tokens, prices, lpToken, 'matic')

  for (var pool of pools['polygon']) {
    _print('=========================================================\n')

    _print(`Reading: ${pool.name ?? pool.address}...`)
    if (pool.name) _print(`Contract: ${pool.address}`)

    _print(' ')

    var poolAbi
    var poolContract

    var rewardTokenAddresses = []
    var rewardTokens = {}
    var rewardsPerWeek = {}

    try {
      poolAbi = POOL_V2_ABI
      poolContract = new ethers.Contract(pool.address, poolAbi, App.provider)
      var rewardTokenAddress = await poolContract.REWARD_TOKEN()

      rewardTokenAddresses.push(rewardTokenAddress)

      rewardTokens[rewardTokenAddress] = await getMaticToken(App, rewardTokenAddress, pool.address)
      rewardsPerWeek[rewardTokenAddress] =
        (((await poolContract.rewardPerBlock()) / 10 ** rewardTokens[rewardTokenAddress].decimals) * 604800) / 2
    } catch (err) {
      poolAbi = POOL_DUAL_REWARDS_V1_ABI
      poolContract = new ethers.Contract(pool.address, poolAbi, App.provider)

      var rewardToken0Address = await poolContract.REWARD_TOKEN0()
      var rewardToken1Address = await poolContract.REWARD_TOKEN1()

      rewardTokenAddresses.push(rewardToken0Address, rewardToken1Address)

      rewardTokens[rewardToken0Address] = await getMaticToken(App, rewardToken0Address, pool.address)
      rewardsPerWeek[rewardToken0Address] =
        (((await poolContract.reward0PerBlock()) / 10 ** rewardTokens[rewardToken0Address].decimals) * 604800) / 2

      rewardTokens[rewardToken1Address] = await getMaticToken(App, rewardToken1Address, pool.address)
      rewardsPerWeek[rewardToken1Address] =
        (((await poolContract.reward1PerBlock()) / 10 ** rewardTokens[rewardToken1Address].decimals) * 604800) / 2
    }

    var poolInfo = await getGasStationMaticPoolInfo(App, poolContract, pool.address, rewardTokenAddresses, rewardTokens)

    await Promise.all(
      poolInfo.poolToken.tokens.map(async address => {
        tokens[address] = await getMaticToken(App, address, pool.address)
      })
    )

    var poolPrice = getPoolPrices(tokens, prices, poolInfo.poolToken, 'matic')

    var startBlock = (await poolContract.startBlock()).toNumber()
    var endBlock = (await poolContract.endBlock()).toNumber()

    var apr = printGasStationMaticPool(
      App,
      poolAbi,
      pool.address,
      prices,
      tokens,
      poolInfo,
      poolPrice,
      rewardsPerWeek,
      rewardTokens,
      rewardTokenAddresses,
      null,
      poolInfo.depositFee,
      poolInfo.burnFee,
      poolInfo.withdrawFee,
      currentBlock,
      startBlock,
      endBlock
    )
    aprs.push(apr)
  }

  _print('=========================================================\n')

  var totalUserStaked = 0,
    totalStaked = 0,
    averageApr = 0
  for (var a of aprs) {
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
      `\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(
        2
      )}%`
    )
    _print(
      `Estimated earnings:` +
        ` Day $${formatMoney((totalUserStaked * averageApr) / 365)}` +
        ` Week $${formatMoney((totalUserStaked * averageApr) / 52)}` +
        ` Year $${formatMoney(totalUserStaked * averageApr)}\n`
    )
  }

  hideLoading()
}
