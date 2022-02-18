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
  const startTime = await LIZARD_CHEF.startTime()
  let rewardsPerWeek = 0
  // const multiplier = await LIZARD_CHEF.getMultiplier(lastrewardblock,currentBlock.timestamp);

  if (new Date(Date.now()).getTime() < startTime) {
    _print(`Rewards start at time ${startTime}\n`)
  } else {
    rewardsPerWeek = ((await LIZARD_CHEF.lizardPerTime())/ 1e18)/2  * 604800
  }

  const tokens = {}
  const prices = await getEmeraldAndLizardPrices()
  
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

const EmeraldAndLizardTokens = [
  { "id": "tether", "symbol": "USDT", "contract": "0xdC19A122e268128B5eE20366299fc7b5b199C8e3"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0xE8A638b3B7565Ee7c5eb9755E58552aFc87b94DD"},
  { "id": "oasis-network", "symbol": "ROSE", "contract": "0x5C78A65AD6D0eC6618788b6E8e211F31729111Ca"},
  { "id": "weth", "symbol": "WETH", "contract": "0x3223f17957Ba502cbe71401D55A0DB26E5F7c68F"},
  { "id": "wrapped-bitcoin", "symbol": "WBTC", "contract": "0xd43ce0aa2a29DCb75bDb83085703dc589DE6C7eb"},
  { "id": "oasis-network", "symbol": "WROSE", "contract": "0x21c718c22d52d0f3a789b752d4c2fd5908a8a733"},
  { "id": "lizard", "symbol": "LIZ", "contract": "0x6a977d5f48d57ef125c98469d511ef4e0ce44e10"},
];

async function getEmeraldAndLizardPrices() {
    const idPrices = await lookUpLizardPrices(EmeraldAndLizardTokens.map(x => x.id));
    const prices = {}
    for (const bt of EmeraldAndLizardTokens)
        if (idPrices[bt.id])
            prices[bt.contract] = idPrices[bt.id];
    return prices;
}

const lookUpLizardPrices = async function(id_array) {
  const prices = {}
  for (const id_chunk of chunk(id_array, 50)) {
    let ids = id_chunk.join('%2C')
    let res = await $.ajax({
      url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd',
      type: 'GET',
    })
    for (const [key, v] of Object.entries(res)) {
      if (v.usd) prices[key] = v;
    }
    if(ids.includes('lizard')){
      let res = await $.ajax({
        url: 'https://api.lizardexchange.com/tokens/0x6a977d5f48d57ef125c98469d511ef4e0ce44e10',
        type: 'GET',
      })
      prices['lizard'] = {
        usd: res.currentPrice,
      };
    }
  }
  return prices
}