$(function() {
  consoleInit(main)
})

const LIZARD_CHEF_ABI = [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    inputs: [
      {type: 'address', name: '_lizard', internalType: 'address'},
      {type: 'address', name: '_teamAddr', internalType: 'address'},
      {type: 'address', name: '_marketingAddr', internalType: 'address'},
      {type: 'address', name: '_investorAddr', internalType: 'address'},
      {type: 'uint256', name: '_startTime', internalType: 'uint256'},
    ],
  },
  {
    type: 'event',
    name: 'Deposit',
    inputs: [
      {type: 'address', name: 'user', internalType: 'address', indexed: true},
      {type: 'uint256', name: 'pid', internalType: 'uint256', indexed: true},
      {type: 'uint256', name: 'amount', internalType: 'uint256', indexed: false},
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'EmergencyWithdraw',
    inputs: [
      {type: 'address', name: 'user', internalType: 'address', indexed: true},
      {type: 'uint256', name: 'pid', internalType: 'uint256', indexed: true},
      {type: 'uint256', name: 'amount', internalType: 'uint256', indexed: false},
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'EmissionRateUpdated',
    inputs: [
      {type: 'address', name: 'caller', internalType: 'address', indexed: true},
      {type: 'uint256', name: 'previousAmount', internalType: 'uint256', indexed: false},
      {type: 'uint256', name: 'newAmount', internalType: 'uint256', indexed: false},
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {type: 'address', name: 'previousOwner', internalType: 'address', indexed: true},
      {type: 'address', name: 'newOwner', internalType: 'address', indexed: true},
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetInvestorAddress',
    inputs: [
      {type: 'address', name: 'user', internalType: 'address', indexed: true},
      {type: 'address', name: '_investorAddress', internalType: 'address', indexed: true},
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetMarketingAddress',
    inputs: [
      {type: 'address', name: 'user', internalType: 'address', indexed: true},
      {type: 'address', name: '_marketingAddress', internalType: 'address', indexed: true},
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetTeamAddress',
    inputs: [
      {type: 'address', name: 'user', internalType: 'address', indexed: true},
      {type: 'address', name: '_teamAddress', internalType: 'address', indexed: true},
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Withdraw',
    inputs: [
      {type: 'address', name: 'user', internalType: 'address', indexed: true},
      {type: 'uint256', name: 'pid', internalType: 'uint256', indexed: true},
      {type: 'uint256', name: 'amount', internalType: 'uint256', indexed: false},
    ],
    anonymous: false,
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'INITIAL_EMISSION_RATE',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'bool', name: '', internalType: 'bool'}],
    name: '_depositorContractWhitelisted',
    inputs: [{type: 'address', name: '', internalType: 'contract IERC20'}],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'addDepositorContract',
    inputs: [{type: 'address', name: '_yieldBearingToken', internalType: 'contract IERC20'}],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'addLizardLP',
    inputs: [{type: 'address', name: '_LP', internalType: 'address'}],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'addNewPool',
    inputs: [
      {type: 'uint256', name: '_allocPoint', internalType: 'uint256'},
      {type: 'address', name: '_lpToken', internalType: 'contract IERC20'},
      {type: 'uint16', name: '_depositFeeBP', internalType: 'uint16'},
      {type: 'bool', name: '_withUpdate', internalType: 'bool'},
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'deposit',
    inputs: [
      {type: 'uint256', name: '_pid', internalType: 'uint256'},
      {type: 'uint256', name: '_amount', internalType: 'uint256'},
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'depositFromWhitelistedContract',
    inputs: [
      {type: 'uint256', name: '_pid', internalType: 'uint256'},
      {type: 'uint256', name: '_amount', internalType: 'uint256'},
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'emergencyWithdraw',
    inputs: [{type: 'uint256', name: '_pid', internalType: 'uint256'}],
  },
  {
    type: 'function',
    stateMutability: 'pure',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'getMultiplier',
    inputs: [
      {type: 'uint256', name: '_from', internalType: 'uint256'},
      {type: 'uint256', name: '_to', internalType: 'uint256'},
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'getPoolIdForLpToken',
    inputs: [{type: 'address', name: '_lpToken', internalType: 'contract IERC20'}],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'address', name: '', internalType: 'address'}],
    name: 'investorAddr',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'investorPercent',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'address', name: '', internalType: 'address'}],
    name: 'lizard',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'lizardPerTime',
    inputs: [],
  },
  {type: 'function', stateMutability: 'nonpayable', outputs: [], name: 'lizardSnapshot', inputs: []},
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'address', name: '', internalType: 'address'}],
    name: 'marketingAddr',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'marketingPercent',
    inputs: [],
  },
  {type: 'function', stateMutability: 'nonpayable', outputs: [], name: 'massUpdatePools', inputs: []},
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'address', name: '', internalType: 'address'}],
    name: 'owner',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'pendingLizard',
    inputs: [
      {type: 'uint256', name: '_pid', internalType: 'uint256'},
      {type: 'address', name: '_user', internalType: 'address'},
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'bool', name: '', internalType: 'bool'}],
    name: 'poolExistence',
    inputs: [{type: 'address', name: '', internalType: 'contract IERC20'}],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'poolIdForLpAddress',
    inputs: [{type: 'address', name: '', internalType: 'contract IERC20'}],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {type: 'address', name: 'lpToken', internalType: 'contract IERC20'},
      {type: 'uint256', name: 'allocPoint', internalType: 'uint256'},
      {type: 'uint256', name: 'lastRewardTime', internalType: 'uint256'},
      {type: 'uint256', name: 'accLizardPerShare', internalType: 'uint256'},
      {type: 'uint16', name: 'depositFeeBP', internalType: 'uint16'},
      {type: 'uint256', name: 'totalDeposit', internalType: 'uint256'},
    ],
    name: 'poolInfo',
    inputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'poolLength',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'removeDepositorContract',
    inputs: [{type: 'address', name: '_yieldBearingToken', internalType: 'contract IERC20'}],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'removeLizardLP',
    inputs: [{type: 'address', name: '_LP', internalType: 'address'}],
  },
  {type: 'function', stateMutability: 'nonpayable', outputs: [], name: 'renounceOwnership', inputs: []},
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'set',
    inputs: [
      {type: 'uint256', name: '_pid', internalType: 'uint256'},
      {type: 'uint256', name: '_allocPoint', internalType: 'uint256'},
      {type: 'uint16', name: '_depositFeeBP', internalType: 'uint16'},
      {type: 'bool', name: '_withUpdate', internalType: 'bool'},
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setInvestorAddr',
    inputs: [{type: 'address', name: '_investorAddr', internalType: 'address'}],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setInvestorPercent',
    inputs: [{type: 'uint256', name: '_newInvestorPercent', internalType: 'uint256'}],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setMarketingAddr',
    inputs: [{type: 'address', name: '_marketingAddr', internalType: 'address'}],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setMarketingPercent',
    inputs: [{type: 'uint256', name: '_newMarketingPercent', internalType: 'uint256'}],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setTeamAddress',
    inputs: [{type: 'address', name: '_teamAddr', internalType: 'address'}],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setTeamPercent',
    inputs: [{type: 'uint256', name: '_newTeamPercent', internalType: 'uint256'}],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'startTime',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'address', name: '', internalType: 'address'}],
    name: 'teamAddr',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'teamPercent',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{type: 'uint256', name: '', internalType: 'uint256'}],
    name: 'totalAllocPoint',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'transferOwnership',
    inputs: [{type: 'address', name: 'newOwner', internalType: 'address'}],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'updateEmissionRate',
    inputs: [{type: 'uint256', name: '_lizardPerTime', internalType: 'uint256'}],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'updatePool',
    inputs: [{type: 'uint256', name: '_pid', internalType: 'uint256'}],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {type: 'uint256', name: 'amount', internalType: 'uint256'},
      {type: 'uint256', name: 'rewardDebt', internalType: 'uint256'},
    ],
    name: 'userInfo',
    inputs: [
      {type: 'uint256', name: '', internalType: 'uint256'},
      {type: 'address', name: '', internalType: 'address'},
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'withdraw',
    inputs: [
      {type: 'uint256', name: '_pid', internalType: 'uint256'},
      {type: 'uint256', name: '_amount', internalType: 'uint256'},
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'withdrawFromWhitelistedContract',
    inputs: [
      {type: 'uint256', name: '_pid', internalType: 'uint256'},
      {type: 'uint256', name: '_amount', internalType: 'uint256'},
    ],
  },
]
async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const LIZARD_CHEF_ADDR = '0x177FA2e64Ec14d8a845Af1B19B6b9E40053d0F72'

  const rewardTokenTicker = 'LIZ'
  const LIZARD_CHEF = new ethers.Contract(LIZARD_CHEF_ADDR, LIZARD_CHEF_ABI, App.provider)
  const currentBlocknumber = await App.provider.getBlockNumber()
  const currentBlock = await App.provider.getBlock(currentBlocknumber)
  const lastrewardblock = await LIZARD_CHEF.poolInfo(0).lastRewardTime
  const startTime = await LIZARD_CHEF.startTime()
  let rewardsPerWeek = 0
  // const multiplier = await LIZARD_CHEF.getMultiplier(lastrewardblock,currentBlock.timestamp);

  if (new Date(Date.now()).getTime() < startTime) {
    _print(`Rewards start at time ${startTime}\n`)
  } else {
    rewardsPerWeek = ((await LIZARD_CHEF.lizardPerTime())/ 1e18)  * 604800
  }

  const tokens = {}
  const prices = await getEmeraldPrices()

  await loadEmeraldChefContract(
    App,
    tokens,
    prices,
    LIZARD_CHEF,
    LIZARD_CHEF_ADDR,
    LIZARD_CHEF_ABI,
    rewardTokenTicker,
    'lizard',
    null,
    rewardsPerWeek,
    'pendingLizard'
  )

  hideLoading()
}


async function loadEmeraldChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    deathPoolIndices, claimFunction) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();

    _print(`<a href='https://explorer.emerald.oasis.dev/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getEmeraldToken(App, rewardTokenAddress, chefAddress);

    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 11.6

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getEmeraldPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
    //console.log(poolInfos);
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getEmeraldToken(App, address, chefAddress);
    }));

    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
                       .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "emerald") : undefined);
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "emerald") : undefined);


    _print("Finished reading smart contracts.\n");

    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, claimFunction, "emerald", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
        aprs.push(apr);
      }
    }

    let totalUserStaked=0, totalStaked=0, averageApr=0;
    for (const a of aprs) {
      if (!isNaN(a.totalStakedUsd)) {
        totalStaked += a.totalStakedUsd;
      }
      if (a.userStakedUsd > 0) {
        totalUserStaked += a.userStakedUsd;
        averageApr += a.userStakedUsd * a.yearlyAPR / 100;
      }
    }
    averageApr = averageApr / totalUserStaked;
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    if (totalUserStaked > 0) {
      _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
      _print(`Estimated earnings:`
          + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
          + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
          + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
    }
    return { prices, totalUserStaked, totalStaked, averageApr }
  }
