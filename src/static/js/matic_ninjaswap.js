$(function() {
  consoleInit(main)
})

const NINJA_CHEF_ABI = [
  {
    inputs: [
      {internalType: 'contract NinjaSwap', name: '_ninja', type: 'address'},
      {internalType: 'address', name: '_devAddr', type: 'address'},
      {internalType: 'address', name: '_feeAddress', type: 'address'},
      {internalType: 'uint256', name: '_startBlock', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'EmergencyWithdraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'previousOwner', type: 'address'},
      {indexed: true, internalType: 'address', name: 'newOwner', type: 'address'},
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: '_referrer', type: 'address'},
      {indexed: true, internalType: 'address', name: '_user', type: 'address'},
    ],
    name: 'Referral',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: false, internalType: 'uint256', name: '_oldBp', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: '_newBp', type: 'uint256'},
    ],
    name: 'ReferralBonusBpChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: '_user', type: 'address'},
      {indexed: true, internalType: 'address', name: '_userTo', type: 'address'},
      {indexed: false, internalType: 'uint256', name: '_reward', type: 'uint256'},
    ],
    name: 'ReferralPaid',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'amountLockedUp', type: 'uint256'},
    ],
    name: 'RewardLockedUp',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: '_feeAddress', type: 'address'},
    ],
    name: 'SetDevAddress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: '_devAddress', type: 'address'},
    ],
    name: 'SetFeeAddress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'uint256', name: '_ninjaPerBlock', type: 'uint256'},
    ],
    name: 'UpdateEmissionRate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: 'INITIAL_EMISSION_RATE',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAXIMUM_DEPOSIT_FEE_BP',
    outputs: [{internalType: 'uint16', name: '', type: 'uint16'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAXIMUM_HARVEST_INTERVAL',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAXIMUM_REFERRAL_BP',
    outputs: [{internalType: 'uint16', name: '', type: 'uint16'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_SUPPLY_CAP',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_allocPoint', type: 'uint256'},
      {internalType: 'contract IERC20', name: '_lpToken', type: 'address'},
      {internalType: 'uint16', name: '_depositFeeBP', type: 'uint16'},
      {internalType: 'uint256', name: '_harvestInterval', type: 'uint256'},
      {internalType: 'bool', name: '_withUpdate', type: 'bool'},
    ],
    name: 'add',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_pid', type: 'uint256'},
      {internalType: 'address', name: '_user', type: 'address'},
    ],
    name: 'canHarvest',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_pid', type: 'uint256'},
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
      {internalType: 'address', name: '_referrer', type: 'address'},
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_pid', type: 'uint256'},
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'devAddr',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_pid', type: 'uint256'}],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeAddress',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_pid', type: 'uint256'},
      {internalType: 'address', name: '_user', type: 'address'},
    ],
    name: 'getHarvestUntil',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_from', type: 'uint256'},
      {internalType: 'uint256', name: '_to', type: 'uint256'},
    ],
    name: 'getMultiplier',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'contract IERC20', name: '_lpToken', type: 'address'}],
    name: 'getPoolIdForLpToken',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_user', type: 'address'}],
    name: 'getReferral',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {inputs: [], name: 'massUpdatePools', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [],
    name: 'ninja',
    outputs: [{internalType: 'contract NinjaSwap', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ninjaPerBlock',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_pid', type: 'uint256'},
      {internalType: 'address', name: '_user', type: 'address'},
    ],
    name: 'pendingNinja',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'contract IERC20', name: '', type: 'address'}],
    name: 'poolExistence',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'contract IERC20', name: '', type: 'address'}],
    name: 'poolIdForLpAddress',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'poolInfo',
    outputs: [
      {internalType: 'contract IERC20', name: 'lpToken', type: 'address'},
      {internalType: 'uint256', name: 'allocPoint', type: 'uint256'},
      {internalType: 'uint256', name: 'lastRewardBlock', type: 'uint256'},
      {internalType: 'uint256', name: 'accNinjaPerShare', type: 'uint256'},
      {internalType: 'uint16', name: 'depositFeeBP', type: 'uint16'},
      {internalType: 'uint256', name: 'harvestInterval', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolLength',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'refBonusBP',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'referredCount',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'referrers',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [
      {internalType: 'uint256', name: '_pid', type: 'uint256'},
      {internalType: 'uint256', name: '_allocPoint', type: 'uint256'},
      {internalType: 'uint16', name: '_depositFeeBP', type: 'uint16'},
      {internalType: 'uint256', name: '_harvestInterval', type: 'uint256'},
      {internalType: 'bool', name: '_withUpdate', type: 'bool'},
    ],
    name: 'set',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_devaddr', type: 'address'}],
    name: 'setDevAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_feeAddress', type: 'address'}],
    name: 'setFeeAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startBlock',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalAllocPoint',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalLockedUpRewards',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_ninjaPerBlock', type: 'uint256'}],
    name: 'updateEmissionRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_pid', type: 'uint256'}],
    name: 'updatePool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_newRefBonusBp', type: 'uint256'}],
    name: 'updateReferralBonusBp',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_startBlock', type: 'uint256'}],
    name: 'updateStartBlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '', type: 'uint256'},
      {internalType: 'address', name: '', type: 'address'},
    ],
    name: 'userInfo',
    outputs: [
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'rewardDebt', type: 'uint256'},
      {internalType: 'uint256', name: 'rewardLockedUp', type: 'uint256'},
      {internalType: 'uint256', name: 'nextHarvestUntil', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_pid', type: 'uint256'},
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const NINJA_CHEF_ADDR = '0x7A07c67A3b9B6aB30A2Ac5cF3a0DbFF284613a32'
  const rewardTokenTicker = 'NINJA'
  const NINJA_CHEF = new ethers.Contract(NINJA_CHEF_ADDR, NINJA_CHEF_ABI, App.provider)

  const startBlock = await NINJA_CHEF.startBlock()
  const currentBlock = await App.provider.getBlockNumber()

  let rewardsPerWeek = 0
  if (currentBlock < startBlock) {
    _print(`Rewards start at block ${startBlock}\n`)
  }

  rewardsPerWeek = (((await NINJA_CHEF.ninjaPerBlock()) / 1e18) * 604800) / 2.1

  const tokens = {}
  let prices = await getMaticPrices()
  prices['0x1F1b5ce5fEDb6F27Db51C4d5e885d952f8371257'] = await loadMaticChefContract(
    App,
    tokens,
    prices,
    NINJA_CHEF,
    NINJA_CHEF_ADDR,
    NINJA_CHEF_ABI,
    rewardTokenTicker,
    'ninja',
    'ninjaPerBlock',
    rewardsPerWeek,
    'pendingNinja',
    [0, 1, 2]
  )

  hideLoading()
}
