$(function() {
  consoleInit(main)
})

const SING_CHEF_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'EmergencyWithdraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ApeRouter',
    outputs: [
      {
        internalType: 'contract IUniswapV2Router02',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'WL_earn',
    outputs: [
      {
        internalType: 'contract IBEP20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'WL_master',
    outputs: [
      {
        internalType: 'contract IChef',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'devaddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'poolInfo',
    outputs: [
      {
        internalType: 'contract IBEP20',
        name: 'lpToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'allocPoint',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastRewardTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'accSingPerShare',
        type: 'uint256',
      },
      {
        internalType: 'uint16',
        name: 'depositFeeBP',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'totalcap',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isStrat',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'stratId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'earned',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'earnfee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'accEarnPerShare',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sing',
    outputs: [
      {
        internalType: 'contract SingToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'singPerSec',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'startTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'totalAllocPoint',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
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
      {
        internalType: 'uint256',
        name: 'earnedDebt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'poolLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'contract SingToken',
        name: '_sing',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_devaddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_feeAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_singPerSec',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_startTime',
        type: 'uint256',
      },
    ],
    name: 'initiate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_allocPoint',
        type: 'uint256',
      },
      {
        internalType: 'contract IBEP20',
        name: '_lpToken',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: '_depositFeeBP',
        type: 'uint16',
      },
      {
        internalType: 'bool',
        name: '_isStrat',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_stratId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_earnfee',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_withUpdate',
        type: 'bool',
      },
    ],
    name: 'add',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_pid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_allocPoint',
        type: 'uint256',
      },
      {
        internalType: 'uint16',
        name: '_depositFeeBP',
        type: 'uint16',
      },
      {
        internalType: 'bool',
        name: '_isStrat',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_stratId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_earnfee',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_withUpdate',
        type: 'bool',
      },
    ],
    name: 'set',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_pid',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'pendingSing',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_pid',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'pendingEarned',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'massUpdatePools',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_pid',
        type: 'uint256',
      },
    ],
    name: 'updatePool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_pid',
        type: 'uint256',
      },
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
    inputs: [
      {
        internalType: 'uint256',
        name: '_pid',
        type: 'uint256',
      },
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
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_pid',
        type: 'uint256',
      },
    ],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_devaddr',
        type: 'address',
      },
    ],
    name: 'dev',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_feeAddress',
        type: 'address',
      },
    ],
    name: 'setFeeAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_singPerSec',
        type: 'uint256',
      },
    ],
    name: 'updateEmissionRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const SING_CHEF_ADDR = '0xF2599B0c7cA1e3c050209f3619F09b6daE002857'
  const rewardTokenTicker = 'SING'

  const SING_CHEF = new ethers.Contract(SING_CHEF_ADDR, SING_CHEF_ABI, App.provider)

  const rewardsPerWeek0 = ((await SING_CHEF.singPerSec()) / 1e18) * 604800

  const tokens = {}
  const prices = await getAvaxPrices()

  await loadAvaxSingChefContract(
    App,
    tokens,
    prices,
    SING_CHEF,
    SING_CHEF_ADDR,
    SING_CHEF_ABI,
    rewardTokenTicker,
    'sing',
    null,
    rewardsPerWeek0,
    'pendingSing'
  )

  hideLoading()
}

async function loadAvaxSingChefContract(
  App,
  tokens,
  prices,
  chef,
  chefAddress,
  chefAbi,
  rewardTokenTicker,
  rewardTokenFunction,
  rewardsPerBlockFunction,
  rewardsPerWeekFixed,
  pendingRewardsFunction
) {
  console.log({
    App,
    tokens,
    prices,
    chef,
    chefAddress,
    chefAbi,
    rewardTokenTicker,
    rewardTokenFunction,
    rewardsPerBlockFunction,
    rewardsPerWeekFixed,
    pendingRewardsFunction,
  })

  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider)

  const poolCount = parseInt(await chefContract.poolLength(), 10)

  console.log('poolCount', poolCount)

  const totalAllocPoints = await chefContract.totalAllocPoint()

  console.log('totalAllocPoints ', totalAllocPoints)

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`)

  var tokens = {}

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]()

  console.log('rewardTokenAddress', rewardTokenAddress)

  const rewardToken = await getAvaxToken(App, rewardTokenAddress, chefAddress)

  console.log('rewardToken', rewardToken)

  const rewardsPerWeek =
    rewardsPerWeekFixed ??
    (((await chefContract.callStatic[rewardsPerBlockFunction]()) / 10 ** rewardToken.decimals) * 604800) / 3

  console.log('rewardsPerWeek', rewardsPerWeek)

  const poolInfos = await Promise.all(
    [...Array(poolCount).keys()].map(
      async x => await getAvaxPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)
    )
  )

  console.log('poolInfos', poolInfos)

  var tokenAddresses = [].concat.apply(
    [],
    poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens)
  )

  await Promise.all(
    tokenAddresses.map(async address => {
      tokens[address] = await getAvaxToken(App, address, chefAddress)
    })
  )

  const poolPrices = poolInfos.map(poolInfo =>
    poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'avax') : undefined
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
        null,
        'avax',
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

  return {prices, totalUserStaked, totalStaked, averageApr}
}

async function getAvaxSingPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex)

  if (poolInfo.allocPoint == 0) {
    return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked: 0,
      pendingRewardTokens: 0,
    }
  }

  const poolToken = await getAvaxToken(app, poolInfo.lpToken, chefAddress)

  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS)
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS)
  const staked = userInfo.amount / 10 ** poolToken.decimals
  return {
    address: poolInfo.stakingToken,
    allocPoints: poolInfo.allocPoint ?? 1,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewardTokens: pendingRewardTokens / 10 ** 18,
    depositFee: (poolInfo.depositFeeBP ?? 0) / 100,
    withdrawFee: (poolInfo.withdrawFeeBP ?? 0) / 100,
  }
}
