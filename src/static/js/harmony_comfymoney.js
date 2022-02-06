$(function() {
  consoleInit(main)
})

const CSHARE_REWARD_POOL_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_cshare',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_poolStartTime',
        type: 'uint256',
      },
    ],
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
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'RewardPaid',
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
    name: 'TOTAL_REWARDS',
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
        name: '_allocPoint',
        type: 'uint256',
      },
      {
        internalType: 'contract IERC20',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_withUpdate',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_lastRewardTime',
        type: 'uint256',
      },
    ],
    name: 'add',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cSharePerSecond',
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
        internalType: 'uint256[]',
        name: '_pids',
        type: 'uint256[]',
      },
    ],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cshare',
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
    ],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_fromTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_toTime',
        type: 'uint256',
      },
    ],
    name: 'getGeneratedReward',
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
        internalType: 'contract IERC20',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'governanceRecoverUnsupported',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'massUpdatePools',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'operator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
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
    name: 'pendingShare',
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
    name: 'poolEndTime',
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
        name: '',
        type: 'uint256',
      },
    ],
    name: 'poolInfo',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: 'token',
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
        name: 'accCSharePerShare',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isStarted',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolLength',
    outputs: [
      {
        internalType: 'uint256',
        name: 'pools',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolStartTime',
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
    name: 'runningTime',
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
        name: '_pid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_allocPoint',
        type: 'uint256',
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
        internalType: 'address',
        name: '_operator',
        type: 'address',
      },
    ],
    name: 'setOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
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
    ],
    stateMutability: 'view',
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
]

const COMFY_REWARD_POOL_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_comfy',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_poolStartTime',
        type: 'uint256',
      },
    ],
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
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'RewardPaid',
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
    inputs: [
      {
        internalType: 'uint256',
        name: '_allocPoint',
        type: 'uint256',
      },
      {
        internalType: 'contract IERC20',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_withUpdate',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_lastRewardTime',
        type: 'uint256',
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
        internalType: 'uint256[]',
        name: '_pids',
        type: 'uint256[]',
      },
    ],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'comfy',
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
    ],
    name: 'emergencyWithdraw',
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
    ],
    name: 'epochComfyPerSecond',
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
        name: '',
        type: 'uint256',
      },
    ],
    name: 'epochEndTimes',
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
        name: '',
        type: 'uint256',
      },
    ],
    name: 'epochTotalRewards',
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
        name: '_fromTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_toTime',
        type: 'uint256',
      },
    ],
    name: 'getGeneratedReward',
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
        internalType: 'contract IERC20',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'governanceRecoverUnsupported',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'massUpdatePools',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'operator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
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
    name: 'pendingCOMFY',
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
        name: '',
        type: 'uint256',
      },
    ],
    name: 'poolInfo',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: 'token',
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
        name: 'accComfyPerShare',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isStarted',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolLength',
    outputs: [
      {
        internalType: 'uint256',
        name: 'pools',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolStartTime',
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
        name: '_pid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_allocPoint',
        type: 'uint256',
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
        internalType: 'address',
        name: '_operator',
        type: 'address',
      },
    ],
    name: 'setOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
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
    ],
    stateMutability: 'view',
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
]

const ZENDEN_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'executor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'at',
        type: 'uint256',
      },
    ],
    name: 'Initialized',
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
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'RewardAdded',
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
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'RewardPaid',
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
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Staked',
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
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdrawn',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'allocateSeigniorage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
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
        name: 'enjoyer',
        type: 'address',
      },
    ],
    name: 'canClaimReward',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'enjoyer',
        type: 'address',
      },
    ],
    name: 'canWithdraw',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'comfy',
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
    inputs: [
      {
        internalType: 'address',
        name: 'enjoyer',
        type: 'address',
      },
    ],
    name: 'earned',
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
    name: 'enjoyers',
    outputs: [
      {
        internalType: 'uint256',
        name: 'lastSnapshotIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewardEarned',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'epochTimerStart',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'epoch',
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
    name: 'exit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getComfyPrice',
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
        name: 'enjoyer',
        type: 'address',
      },
    ],
    name: 'getLastSnapshotIndexOf',
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
        internalType: 'contract IERC20',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
    ],
    name: 'governanceRecoverUnsupported',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_comfy',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: '_share',
        type: 'address',
      },
      {
        internalType: 'contract ITreasury',
        name: '_treasury',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initialized',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestSnapshotIndex',
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
    name: 'nextEpochPoint',
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
    name: 'operator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardLockupEpochs',
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
    name: 'rewardPerShare',
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
        name: '_withdrawLockupEpochs',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_rewardLockupEpochs',
        type: 'uint256',
      },
    ],
    name: 'setLockUp',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_operator',
        type: 'address',
      },
    ],
    name: 'setOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'share',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
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
    name: 'treasury',
    outputs: [
      {
        internalType: 'contract ITreasury',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawLockupEpochs',
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
        name: '',
        type: 'uint256',
      },
    ],
    name: 'zenDenHistory',
    outputs: [
      {
        internalType: 'uint256',
        name: 'time',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewardReceived',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewardPerShare',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const CSHARE_REWARD_POOL_ADDR = '0x53efc025d19270b899eBf89DD89a1F58CE1CD66f'
const COMFY_REWARD_POOL_ADDR = '0x893F07c9E10932349b01Db7A3833Fe756C2D59A8'
const GENESIS_REWARD_POOL_ADDR = '0xeF231B88209A869cf2dE235781Ce727AD07D0a1B'
const COMFY_ADDR = '0x702f78E81Cf3DfaE89648b5a9e2e1aa8db1De546'
const CSHARE_ADDR = '0x3CB98cacd44Ee77eb35E99EB74Ace91bF550c964'

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const comfyRewardPoolContract = new ethers.Contract(COMFY_REWARD_POOL_ADDR, COMFY_REWARD_POOL_ABI, App.provider)

  const cshareRewardPoolContract = new ethers.Contract(CSHARE_REWARD_POOL_ADDR, CSHARE_REWARD_POOL_ABI, App.provider)

  const tokens = {}
  const prices = await getHarmonyPrices()

  const comfyStartTime = await comfyRewardPoolContract.poolStartTime()
  const cshareStartTime = await cshareRewardPoolContract.poolStartTime()

  const currentTime = Date.now() / 1000

  const ZENDEN_ADDR = '0x108426718E67da46e09E841bC4e8430A824BDaFc'
  const ORACLE_ADDR = '0x2a944e33CC7EB7e3Fb6b90a88993a6C10DEfbde9'
  const zenDenRewardTicker = 'COMFY'
  const zenDenStakeTicker = 'CSHARE'
  const lpAddress = '0xF2d9E493a280545699E3C07aEe22eaE9EF24DDb7' // COMFY-WONE-LP
  const epochsPerDay = 4
  const maxSupplyIncrease = await getExpansion(App)
  const decimals = 18
  const ratio = 0.8
  const targetMantissa = 12

  const rewardTokenTicker = 'CSHARE'
  const rewardsPerWeek = ((await cshareRewardPoolContract.cSharePerSecond()) / 1e18) * 604800

  const zenDen = await loadZenDen(
    App,
    prices,
    ZENDEN_ADDR,
    ORACLE_ADDR,
    lpAddress,
    COMFY_ADDR,
    zenDenStakeTicker,
    zenDenRewardTicker,
    epochsPerDay,
    maxSupplyIncrease,
    decimals,
    ratio,
    targetMantissa
  )

  _print('-------------------------------------------------')
  _print('')
  _print('CShare Reward Pool')
  _print('')
  const cshareRewardPool = await loadRewardPoolContract(
    App,
    tokens,
    prices,
    cshareRewardPoolContract,
    CSHARE_REWARD_POOL_ADDR,
    CSHARE_REWARD_POOL_ABI,
    'CSHARE',
    'cshare',
    'pendingShare',
    2,
    cshareStartTime,
    currentTime
  )

  _print('')
  _print_bold(`Total Staked: $${formatMoney(cshareRewardPool.totalStaked + zenDen.staked_tvl)}`)

  _print('')
  _print('')
  _print('-------------------------------------------------')
  _print('')
  _print('Comfy Reward Pool')
  _print_bold('The below pool is now closed and there are no more rewards to be received. Please ensure you unstake.')
  _print('')
  const comfyRewardPool = await loadRewardPoolContract(
    App,
    tokens,
    prices,
    comfyRewardPoolContract,
    COMFY_REWARD_POOL_ADDR,
    COMFY_REWARD_POOL_ABI,
    'COMFY',
    'comfy',
    'pendingCOMFY',
    1,
    comfyStartTime,
    currentTime
  )

  hideLoading()
}

async function loadRewardPoolContract(
  App,
  tokens,
  prices,
  contract,
  contractAddress,
  contractAbi,
  rewardTokenTicker,
  rewardTokenFunction,
  pendingRewardsFunction,
  poolCount,
  startTime,
  currentTime
) {
  const poolContract = contract ?? new ethers.Contract(contractAddress, contractAbi)

  _print(`<a href='https://explorer.harmony.one/address/${poolContract.address}' target='_blank'>Staking Contract</a>`)
  _print('')

  const totalAllocPoints = await poolContract.totalAllocPoint()

  const rewardTokenAddress = await poolContract.callStatic[rewardTokenFunction]()

  const rewardToken = await getHarmonyToken(App, rewardTokenAddress, contractAddress)

  let rewardsPerWeek = 0
  if (currentTime < startTime) {
    _print(`Rewards have not started yet\n`)
  } else {
    rewardsPerWeek = ((await getTokenRewardPerSecond(poolContract)) / 10 ** rewardToken.decimals) * 604800
  }

  const poolInfos = await Promise.all(
    [...Array(poolCount).keys()].map(
      async x => await getComfyRewardPoolInfo(App, poolContract, contractAddress, x, pendingRewardsFunction)
    )
  )

  var tokenAddresses = [].concat.apply(
    [],
    poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens)
  )

  await Promise.all(
    tokenAddresses.map(async address => {
      tokens[address] = await getHarmonyToken(App, address, contractAddress)
    })
  )

  const poolPrices = poolInfos.map(pInfo =>
    pInfo.poolToken ? getPoolPrices(tokens, prices, pInfo.poolToken, 'harmony') : undefined
  )

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    const apr = printComfyPool(
      App,
      COMFY_REWARD_POOL_ABI,
      contractAddress,
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
      'harmony'
    )
    aprs.push(apr)
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
  return {prices, totalUserStaked, totalStaked, averageApr}
}

async function loadZenDen(
  App,
  prices,
  zenDenAddress,
  oracleAddress,
  lpAddress,
  rewardTokenAddress,
  stakeTicker,
  rewardTicker,
  epochsPerDay,
  maxSupplyIncrease,
  decimals,
  ratio,
  targetMantissa
) {
  _print(`<a href='https://explorer.harmony.one/address/${zenDenAddress}' target='_blank'>Zen Den Contract</a>`)
  _print('')
  const ZENDEN = new ethers.Contract(zenDenAddress, ZENDEN_ABI, App.provider)
  const ORACLE = new ethers.Contract(oracleAddress, BASIS_ORACLE_ABI, App.provider)
  const share = await ZENDEN.share()
  const SHARE = new ethers.Contract(share, ERC20_ABI, App.provider)
  const userUnstaked = (await SHARE.balanceOf(App.YOUR_ADDRESS)) / 1e18
  const sharePrice = getParameterCaseInsensitive(prices, share)?.usd
  const comfyPrice = getParameterCaseInsensitive(prices, COMFY_ADDR)?.usd
  const userStaked = (await ZENDEN.balanceOf(App.YOUR_ADDRESS)) / 1e18
  const userStakedUsd = userStaked * sharePrice
  const totalStaked = (await ZENDEN.totalSupply()) / 1e18
  const totalStakedUsd = totalStaked * sharePrice
  const userPct = (userStaked / totalStaked) * 100
  const earned = (await ZENDEN.earned(App.YOUR_ADDRESS)) / 1e18
  _print(`Zen Den`)
  _print(
    `There is a total of ${totalStaked.toFixed(2)} ${stakeTicker} ($${formatMoney(
      totalStakedUsd
    )}) staked in the Zen Den.`
  )
  _print(
    `You are staking ${userStaked} ${stakeTicker} ($${formatMoney(userStakedUsd)}), ${userPct.toFixed(
      2
    )}% of the Zen Den.`
  )

  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd
  const oldTimestamp = await ORACLE.blockTimestampLast()
  const token0 = await ORACLE.token0()
  const token1 = await ORACLE.token1()
  let twap
  if (token0.toLowerCase() == rewardTokenAddress.toLowerCase()) {
    const oldPrice0 = await ORACLE.price0CumulativeLast()
    const [price0, , timestamp] = await getCurrentPriceAndTimestamp(App, lpAddress)
    twap = await calculateTwap(oldPrice0, oldTimestamp, price0, timestamp, targetMantissa)
  } else if (token1.toLowerCase() == rewardTokenAddress.toLowerCase()) {
    const oldPrice1 = await ORACLE.price1CumulativeLast()
    const [, price1, timestamp] = await getCurrentPriceAndTimestamp(App, lpAddress)
    twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, targetMantissa)
  }
  if (twap > 1) {
    const circulatingSupply = await getCirculatingSupply(App)

    const newTokens = circulatingSupply * Math.min(twap - 1, maxSupplyIncrease) * ratio
    _print(
      `There will be ${newTokens.toFixed(decimals)} ${rewardTicker} ($${comfyPrice *
        newTokens}) issued at next expansion.`
    )
    const zenDenReturn = (newTokens * rewardPrice * 100 * epochsPerDay) / totalStakedUsd
    _print(
      `Zen Den APR: Day ${zenDenReturn.toFixed(2)}% / Week ${(zenDenReturn * 7).toFixed(2)}% / Year ${(
        zenDenReturn * 365
      ).toFixed(2)}%`
    )
  }

  const canClaim = ZENDEN.canClaimReward(App.YOUR_ADDRESS)
  console.log(canClaim)

  const approveTENDAndStake = async () => rewardsContract_stake(share, zenDenAddress, App)
  const unstake = async () => rewardsContract_unstake(zenDenAddress, App)
  const claim = async () => boardroom_claim(zenDenAddress, App)
  const exit = async () => rewardsContract_exit(zenDenAddress, App)
  const revoke = async () => rewardsContract_resetApprove(share, zenDenAddress, App)
  _print('')
  _print_link(`Stake ${userUnstaked.toFixed(decimals)} ${stakeTicker}`, approveTENDAndStake)
  _print_link(`Unstake ${userStaked.toFixed(decimals)} ${stakeTicker}`, unstake)
  if (canClaim && earned > 0)
    _print_link(`Claim ${earned.toFixed(decimals)} ${rewardTicker} ($${formatMoney(earned * rewardPrice)})`, claim)
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print_link(`Exit`, exit)
  _print(`\n`)

  return {staked_tvl: totalStakedUsd}
}

async function getComfyRewardPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex)
  if (poolInfo.allocPoint == 0) {
    return {
      address: poolInfo.token,
      stakedToken: poolToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked: 0,
      pendingRewardTokens: 0,
    }
  }

  const poolToken = await getHarmonyToken(app, poolInfo.token, chefAddress)
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS)
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS)
  const staked = userInfo.amount / 10 ** poolToken.decimals
  return {
    address: poolInfo.token,
    stakedToken: poolToken,
    allocPoints: poolInfo.allocPoint ?? 1,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewardTokens: pendingRewardTokens / 10 ** 18,
  }
}

async function getTokenRewardPerSecond(poolContract) {
  if (poolContract.address == COMFY_REWARD_POOL_ADDR) {
    const poolStartTime = await poolContract.poolStartTime()
    const startDateTime = new Date(poolStartTime.toNumber() * 1000)
    const FOUR_DAYS = 4 * 24 * 60 * 60 * 1000
    if (Date.now() - startDateTime.getTime() > FOUR_DAYS) {
      return await poolContract.epochComfyPerSecond(1)
    }
    return await poolContract.epochComfyPerSecond(0)
  } else {
    return await poolContract.cSharePerSecond()
  }
}

async function getCirculatingSupply(App) {
  const comfyContract = new ethers.Contract(COMFY_ADDR, ERC20_ABI, App.provider)
  const totalSupply = await comfyContract.totalSupply()
  const genesisBalanceOf = await comfyContract.balanceOf(GENESIS_REWARD_POOL_ADDR)
  const comfyRewardPoolBalanceOf = await comfyContract.balanceOf(COMFY_REWARD_POOL_ADDR)
  return totalSupply / 1e18 - genesisBalanceOf / 1e18 - comfyRewardPoolBalanceOf / 1e18
}

async function getExpansion(App) {
  const circulatingSupply = await getCirculatingSupply(App)
  if (circulatingSupply >= 50000000) {
    return 0.01
  } else if (circulatingSupply > 20000000) {
    return 0.0125
  } else if (circulatingSupply > 10000000) {
    return 0.015
  } else if (circulatingSupply > 5000000) {
    return 0.02
  } else if (circulatingSupply > 2000000) {
    return 0.025
  } else if (circulatingSupply > 1500000) {
    return 0.03
  } else if (circulatingSupply > 1000000) {
    return 0.035
  } else if (circulatingSupply > 500000) {
    return 0.04
  } else {
    return 0.045
  }
}

function printComfyPool(
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
  const poolRewardsPerWeek = (poolInfo.allocPoints / totalAllocPoints) * rewardsPerWeek
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd
  const staked_tvl = poolPrices.staked_tvl
  _print_inline(`${poolIndex} - `)
  poolPrices.print_price(chain)
  const apr = printAPR(
    rewardTokenTicker,
    rewardPrice,
    poolRewardsPerWeek,
    poolPrices.stakeTokenTicker,
    staked_tvl,
    userStaked,
    poolPrices.price,
    2
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
    2,
    claimFunction,
    rewardPrice,
    chain,
    depositFee,
    withdrawFee
  )
  return apr
}
