$(function() {
  consoleInit(main)
})

const CLAM_ISLAND_BANK_ABI = [
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'address', name: 'clamBonus', type: 'address'}],
    name: 'ClamBonusAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: false, internalType: 'address', name: 'user', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'reward', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'pearlId', type: 'uint256'},
    ],
    name: 'ClamBonusRewardAdded',
    type: 'event',
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
    inputs: [{indexed: false, internalType: 'uint256', name: 'gemPerBlock', type: 'uint256'}],
    name: 'EmissionRateUpdated',
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
      {indexed: false, internalType: 'address', name: 'user', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'reward', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'clamId', type: 'uint256'},
    ],
    name: 'PearlBonusRewardAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'address', name: 'pearlBurner', type: 'address'}],
    name: 'PearlBurnerSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'address', name: 'token', type: 'address'}],
    name: 'PearlProductionTimeReductionAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'address', name: 'token', type: 'address'}],
    name: 'PoolAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: false, internalType: 'uint256', name: 'pid', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'allocationPoint', type: 'uint256'},
    ],
    name: 'PoolAllocationSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'uint256', name: 'newPoolId', type: 'uint256'}],
    name: 'PoolIdAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'uint256', name: 'poolId', type: 'uint256'}],
    name: 'PoolIdRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: 'token', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'RewardPaid',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'uint256', name: 'pearlBurner', type: 'uint256'}],
    name: 'SecondsPerBlockSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: 'newAddress', type: 'address'},
    ],
    name: 'SetDevAddress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: 'newAddress', type: 'address'},
    ],
    name: 'SetFeeAddress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'address', name: 'token', type: 'address'}],
    name: 'SpecialTokenAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'address', name: 'token', type: 'address'}],
    name: 'SpecialTokenRemoved',
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
    inputs: [
      {internalType: 'uint256', name: '_allocPoint', type: 'uint256'},
      {internalType: 'contract IBEP20', name: '_lpToken', type: 'address'},
      {internalType: 'uint16', name: '_depositFeeBP', type: 'uint16'},
      {internalType: 'bool', name: '_withUpdate', type: 'bool'},
    ],
    name: 'add',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_user', type: 'address'},
      {internalType: 'uint256', name: '_reward', type: 'uint256'},
      {internalType: 'uint256', name: '_clamId', type: 'uint256'},
    ],
    name: 'addClamBonusReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_poolId', type: 'uint256'}],
    name: 'addNativePoolId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_user', type: 'address'},
      {internalType: 'uint256', name: '_reward', type: 'uint256'},
      {internalType: 'uint256', name: '_pearlId', type: 'uint256'},
    ],
    name: 'addPearlBonusReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'addSpecialToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bps',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'clamBonus',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
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
    inputs: [{internalType: 'address', name: '_devaddr', type: 'address'}],
    name: 'dev',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'devaddr',
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
    inputs: [],
    name: 'gem',
    outputs: [{internalType: 'contract IGemToken', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gemLocker',
    outputs: [{internalType: 'contract IGemLocker', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gemPerBlock',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_from', type: 'uint256'},
      {internalType: 'uint256', name: '_to', type: 'uint256'},
    ],
    name: 'getRewardBlocks',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTokenSupplies',
    outputs: [{internalType: 'uint256[]', name: '', type: 'uint256[]'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'contract IGemToken', name: '_gem', type: 'address'},
      {internalType: 'contract ShellToken', name: '_shell', type: 'address'},
      {internalType: 'address', name: '_devaddr', type: 'address'},
      {internalType: 'address', name: '_feeAddress', type: 'address'},
      {internalType: 'uint256', name: '_gemPerBlock', type: 'uint256'},
      {internalType: 'uint256', name: '_startBlock', type: 'uint256'},
      {internalType: 'contract IGemLocker', name: '_gemLocker', type: 'address'},
      {internalType: 'address', name: '_productionTimeReduction', type: 'address'},
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'index', type: 'uint256'}],
    name: 'liquidityProvidersAt',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liquidityProvidersLength',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lockPercentBP',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {inputs: [], name: 'massUpdatePools', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [],
    name: 'maxDepositFeeBP',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxNumberOfNativePools',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'index', type: 'uint256'}],
    name: 'nativePoolIdsAt',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nativePoolIdsLength',
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
    inputs: [],
    name: 'pearlBurner',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_pid', type: 'uint256'},
      {internalType: 'address', name: '_user', type: 'address'},
    ],
    name: 'pendingGem',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'contract IBEP20', name: '', type: 'address'}],
    name: 'poolExistence',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'poolInfo',
    outputs: [
      {internalType: 'contract IBEP20', name: 'lpToken', type: 'address'},
      {internalType: 'uint256', name: 'allocPoint', type: 'uint256'},
      {internalType: 'uint256', name: 'lastRewardBlock', type: 'uint256'},
      {internalType: 'uint256', name: 'accGemPerShare', type: 'uint256'},
      {internalType: 'uint16', name: 'depositFeeBP', type: 'uint16'},
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
    name: 'productionTimeReduction',
    outputs: [{internalType: 'contract IPearlProductionTimeReduction', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_poolId', type: 'uint256'}],
    name: 'removeNativePoolId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'removeSpecialToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [],
    name: 'secondsPerBlock',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_pid', type: 'uint256'},
      {internalType: 'uint256', name: '_allocPoint', type: 'uint256'},
      {internalType: 'uint16', name: '_depositFeeBP', type: 'uint16'},
      {internalType: 'bool', name: '_withUpdate', type: 'bool'},
    ],
    name: 'set',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_clamBonus', type: 'address'}],
    name: 'setClamBonus',
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
    inputs: [{internalType: 'address', name: '_pearlBurner', type: 'address'}],
    name: 'setPearlBurner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_productionTimeReduction', type: 'address'}],
    name: 'setPearlProductionTimeReduction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_secondsPerBlock', type: 'uint256'}],
    name: 'setSecondsPerBlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'shell',
    outputs: [{internalType: 'contract ShellToken', name: '', type: 'address'}],
    stateMutability: 'view',
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
    inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_gemPerBlock', type: 'uint256'}],
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
    inputs: [
      {internalType: 'uint256', name: '', type: 'uint256'},
      {internalType: 'address', name: '', type: 'address'},
    ],
    name: 'userInfo',
    outputs: [
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'rewardDebt', type: 'uint256'},
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

const PANCAKE_ROUTER_ABI = [
  {
    inputs: [
      {internalType: 'address', name: '_factory', type: 'address'},
      {internalType: 'address', name: '_WETH', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'tokenA', type: 'address'},
      {internalType: 'address', name: 'tokenB', type: 'address'},
      {internalType: 'uint256', name: 'amountADesired', type: 'uint256'},
      {internalType: 'uint256', name: 'amountBDesired', type: 'uint256'},
      {internalType: 'uint256', name: 'amountAMin', type: 'uint256'},
      {internalType: 'uint256', name: 'amountBMin', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'addLiquidity',
    outputs: [
      {internalType: 'uint256', name: 'amountA', type: 'uint256'},
      {internalType: 'uint256', name: 'amountB', type: 'uint256'},
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'token', type: 'address'},
      {internalType: 'uint256', name: 'amountTokenDesired', type: 'uint256'},
      {internalType: 'uint256', name: 'amountTokenMin', type: 'uint256'},
      {internalType: 'uint256', name: 'amountETHMin', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'addLiquidityETH',
    outputs: [
      {internalType: 'uint256', name: 'amountToken', type: 'uint256'},
      {internalType: 'uint256', name: 'amountETH', type: 'uint256'},
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountOut', type: 'uint256'},
      {internalType: 'uint256', name: 'reserveIn', type: 'uint256'},
      {internalType: 'uint256', name: 'reserveOut', type: 'uint256'},
    ],
    name: 'getAmountIn',
    outputs: [{internalType: 'uint256', name: 'amountIn', type: 'uint256'}],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
      {internalType: 'uint256', name: 'reserveIn', type: 'uint256'},
      {internalType: 'uint256', name: 'reserveOut', type: 'uint256'},
    ],
    name: 'getAmountOut',
    outputs: [{internalType: 'uint256', name: 'amountOut', type: 'uint256'}],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountOut', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
    ],
    name: 'getAmountsIn',
    outputs: [{internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
    ],
    name: 'getAmountsOut',
    outputs: [{internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountA', type: 'uint256'},
      {internalType: 'uint256', name: 'reserveA', type: 'uint256'},
      {internalType: 'uint256', name: 'reserveB', type: 'uint256'},
    ],
    name: 'quote',
    outputs: [{internalType: 'uint256', name: 'amountB', type: 'uint256'}],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'tokenA', type: 'address'},
      {internalType: 'address', name: 'tokenB', type: 'address'},
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
      {internalType: 'uint256', name: 'amountAMin', type: 'uint256'},
      {internalType: 'uint256', name: 'amountBMin', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'removeLiquidity',
    outputs: [
      {internalType: 'uint256', name: 'amountA', type: 'uint256'},
      {internalType: 'uint256', name: 'amountB', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'token', type: 'address'},
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
      {internalType: 'uint256', name: 'amountTokenMin', type: 'uint256'},
      {internalType: 'uint256', name: 'amountETHMin', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'removeLiquidityETH',
    outputs: [
      {internalType: 'uint256', name: 'amountToken', type: 'uint256'},
      {internalType: 'uint256', name: 'amountETH', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'token', type: 'address'},
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
      {internalType: 'uint256', name: 'amountTokenMin', type: 'uint256'},
      {internalType: 'uint256', name: 'amountETHMin', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'removeLiquidityETHSupportingFeeOnTransferTokens',
    outputs: [{internalType: 'uint256', name: 'amountETH', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'token', type: 'address'},
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
      {internalType: 'uint256', name: 'amountTokenMin', type: 'uint256'},
      {internalType: 'uint256', name: 'amountETHMin', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
      {internalType: 'bool', name: 'approveMax', type: 'bool'},
      {internalType: 'uint8', name: 'v', type: 'uint8'},
      {internalType: 'bytes32', name: 'r', type: 'bytes32'},
      {internalType: 'bytes32', name: 's', type: 'bytes32'},
    ],
    name: 'removeLiquidityETHWithPermit',
    outputs: [
      {internalType: 'uint256', name: 'amountToken', type: 'uint256'},
      {internalType: 'uint256', name: 'amountETH', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'token', type: 'address'},
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
      {internalType: 'uint256', name: 'amountTokenMin', type: 'uint256'},
      {internalType: 'uint256', name: 'amountETHMin', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
      {internalType: 'bool', name: 'approveMax', type: 'bool'},
      {internalType: 'uint8', name: 'v', type: 'uint8'},
      {internalType: 'bytes32', name: 'r', type: 'bytes32'},
      {internalType: 'bytes32', name: 's', type: 'bytes32'},
    ],
    name: 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
    outputs: [{internalType: 'uint256', name: 'amountETH', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'tokenA', type: 'address'},
      {internalType: 'address', name: 'tokenB', type: 'address'},
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
      {internalType: 'uint256', name: 'amountAMin', type: 'uint256'},
      {internalType: 'uint256', name: 'amountBMin', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
      {internalType: 'bool', name: 'approveMax', type: 'bool'},
      {internalType: 'uint8', name: 'v', type: 'uint8'},
      {internalType: 'bytes32', name: 'r', type: 'bytes32'},
      {internalType: 'bytes32', name: 's', type: 'bytes32'},
    ],
    name: 'removeLiquidityWithPermit',
    outputs: [
      {internalType: 'uint256', name: 'amountA', type: 'uint256'},
      {internalType: 'uint256', name: 'amountB', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountOut', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapETHForExactTokens',
    outputs: [{internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'}],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountOutMin', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapExactETHForTokens',
    outputs: [{internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'}],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountOutMin', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
      {internalType: 'uint256', name: 'amountOutMin', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapExactTokensForETH',
    outputs: [{internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
      {internalType: 'uint256', name: 'amountOutMin', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
      {internalType: 'uint256', name: 'amountOutMin', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapExactTokensForTokens',
    outputs: [{internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
      {internalType: 'uint256', name: 'amountOutMin', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountOut', type: 'uint256'},
      {internalType: 'uint256', name: 'amountInMax', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapTokensForExactETH',
    outputs: [{internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountOut', type: 'uint256'},
      {internalType: 'uint256', name: 'amountInMax', type: 'uint256'},
      {internalType: 'address[]', name: 'path', type: 'address[]'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapTokensForExactTokens',
    outputs: [{internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {stateMutability: 'payable', type: 'receive'},
]

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  async function showPools() {
    const rewardTokenTicker = 'GEM'
    const ONE = ethers.utils.parseEther('1')
    const CLAM_ISLAND_BANK_ADDR = '0x1cB9Abaf22cB2D41808c998BbC07EE9e773a007A'
    const PANCAKE_ROUTER_ADDR = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
    const BUSD_ADDR = '0xe9e7cea3dedca5984780bafc599bd69add087d56'
    const WBNB_ADDR = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
    const GEM_ADDR = '0x9fb4DEF63f8caEC83Cb3EBcC22Ba0795258C988a'
    const SHELL_ADDR = '0x01c16da6E041Cf203959624Ade1F39652973D0EB'
    const CLAM_ISLAND_BANK = new ethers.Contract(CLAM_ISLAND_BANK_ADDR, CLAM_ISLAND_BANK_ABI, App.provider)
    const PANCAKE_ROUTER = new ethers.Contract(PANCAKE_ROUTER_ADDR, PANCAKE_ROUTER_ABI, App.provider)
    const [, , gemPrice] = await PANCAKE_ROUTER.getAmountsOut(ONE, [GEM_ADDR, WBNB_ADDR, BUSD_ADDR])
    const [, , shellPrice] = await PANCAKE_ROUTER.getAmountsOut(ONE, [SHELL_ADDR, WBNB_ADDR, BUSD_ADDR])

    const prices = await getBscPrices()

    prices[GEM_ADDR] = {usd: +ethers.utils.formatEther(gemPrice)}
    prices[SHELL_ADDR] = {usd: +ethers.utils.formatEther(shellPrice)}

    const poolCount = parseInt(await CLAM_ISLAND_BANK.poolLength(), 10)
    const totalAllocPoints = await CLAM_ISLAND_BANK.totalAllocPoint()

    _print(`<a href='https://bscscan.com/address/${CLAM_ISLAND_BANK_ADDR}' target='_blank'>Staking Contract</a>`)
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`)

    const tokens = {}

    const rewardsPerWeek = (((await CLAM_ISLAND_BANK.gemPerBlock()) / 1e18) * 604800) / 3

    const poolInfos = await Promise.all(
      [...Array(poolCount).keys()].map(
        async x => await getBscPoolInfo(App, CLAM_ISLAND_BANK, CLAM_ISLAND_BANK_ADDR, x, 'pendingGem')
      )
    )

    var tokenAddresses = [].concat.apply(
      [],
      poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens)
    )

    await Promise.all(
      tokenAddresses.map(async address => {
        tokens[address] = await getBscToken(App, address, CLAM_ISLAND_BANK_ADDR)
      })
    )

    const poolPrices = poolInfos.map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'bsc') : undefined
    )

    _print('Finished reading smart contracts.\n')

    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printChefPool(
          App,
          CLAM_ISLAND_BANK_ABI,
          CLAM_ISLAND_BANK_ADDR,
          prices,
          tokens,
          poolInfos[i],
          i,
          poolPrices[i],
          totalAllocPoints,
          rewardsPerWeek,
          rewardTokenTicker,
          GEM_ADDR,
          'pendingGem',
          null,
          null,
          'bsc',
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

  await showPools()

  hideLoading()
}
