$(function() {
  consoleInit(main)
})

const LITHOS_V2_FACTORY_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isPair',
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
]

const LITHOS_VOTER_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'InvalidInitialization',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotInitializing',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ReentrancyGuardReentrantCall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'weight',
        type: 'uint256',
      },
    ],
    name: 'Abstained',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'pairfactory',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'gaugefactory',
        type: 'address',
      },
    ],
    name: 'AddFactories',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'blacklister',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'Blacklisted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'gauge',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'DistributeReward',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'gauge',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'internal_bribe',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'external_bribe',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
    ],
    name: 'GaugeCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'gauge',
        type: 'address',
      },
    ],
    name: 'GaugeKilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'gauge',
        type: 'address',
      },
    ],
    name: 'GaugeRevived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'version',
        type: 'uint64',
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
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'reward',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'NotifyReward',
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
        name: 'old',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'latest',
        type: 'address',
      },
    ],
    name: 'SetBribeFactory',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'isInternal',
        type: 'bool',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'old',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'latest',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'gauge',
        type: 'address',
      },
    ],
    name: 'SetBribeFor',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'old',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'latest',
        type: 'address',
      },
    ],
    name: 'SetGaugeFactory',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'old',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'latest',
        type: 'address',
      },
    ],
    name: 'SetMinter',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'old',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'latest',
        type: 'address',
      },
    ],
    name: 'SetPairFactory',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'old',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'latest',
        type: 'address',
      },
    ],
    name: 'SetPermissionRegistry',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'old',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'latest',
        type: 'uint256',
      },
    ],
    name: 'SetVoteDelay',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'weight',
        type: 'uint256',
      },
    ],
    name: 'Voted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'whitelister',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'Whitelisted',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MAX_VOTE_DELAY',
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
    name: 'VOTE_DELAY',
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
    name: '_epochTimestamp',
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
        internalType: 'address[]',
        name: '_tokens',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: '_permissionsRegistry',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_minter',
        type: 'address',
      },
    ],
    name: '_init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: '_ve',
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
        internalType: 'address',
        name: '_pairFactory',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_gaugeFactory',
        type: 'address',
      },
    ],
    name: 'addFactory',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_token',
        type: 'address[]',
      },
    ],
    name: 'blacklist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bribefactory',
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
        internalType: 'address[]',
        name: '_bribes',
        type: 'address[]',
      },
      {
        internalType: 'address[][]',
        name: '_tokens',
        type: 'address[][]',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'claimBribes',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_bribes',
        type: 'address[]',
      },
      {
        internalType: 'address[][]',
        name: '_tokens',
        type: 'address[][]',
      },
    ],
    name: 'claimBribes',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_fees',
        type: 'address[]',
      },
      {
        internalType: 'address[][]',
        name: '_tokens',
        type: 'address[][]',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'claimFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_bribes',
        type: 'address[]',
      },
      {
        internalType: 'address[][]',
        name: '_tokens',
        type: 'address[][]',
      },
    ],
    name: 'claimFees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_gauges',
        type: 'address[]',
      },
    ],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'claimable',
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
        name: '_pool',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_gaugeType',
        type: 'uint256',
      },
    ],
    name: 'createGauge',
    outputs: [
      {
        internalType: 'address',
        name: '_gauge',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_internal_bribe',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_external_bribe',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_pool',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '_gaugeTypes',
        type: 'uint256[]',
      },
    ],
    name: 'createGauges',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_gauges',
        type: 'address[]',
      },
    ],
    name: 'distribute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'finish',
        type: 'uint256',
      },
    ],
    name: 'distribute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'distributeAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_gauges',
        type: 'address[]',
      },
    ],
    name: 'distributeFees',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'external_bribes',
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
    name: 'factories',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'factoryLength',
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
    name: 'gaugeFactories',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gaugeFactoriesLength',
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
    name: 'gauges',
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
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'gaugesDistributionTimestmap',
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
        name: '__ve',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_pairFactory',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_gaugeFactory',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_bribes',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'internal_bribes',
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
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isAlive',
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
        name: '',
        type: 'address',
      },
    ],
    name: 'isFactory',
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
        name: '',
        type: 'address',
      },
    ],
    name: 'isGauge',
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
        name: '',
        type: 'address',
      },
    ],
    name: 'isGaugeFactory',
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
        name: '',
        type: 'address',
      },
    ],
    name: 'isWhitelisted',
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
        name: '_gauge',
        type: 'address',
      },
    ],
    name: 'killGauge',
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
    name: 'lastVoted',
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
    name: 'length',
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
    name: 'minter',
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
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'notifyRewardAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
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
  },
  {
    inputs: [],
    name: 'permissionRegistry',
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
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'poke',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'poolForGauge',
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
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'poolVote',
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
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'poolVoteLength',
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
    name: 'pools',
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
        name: '_pos',
        type: 'uint256',
      },
    ],
    name: 'removeFactory',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_pairFactory',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_gaugeFactory',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_pos',
        type: 'uint256',
      },
    ],
    name: 'replaceFactory',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'reset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_gauge',
        type: 'address',
      },
    ],
    name: 'reviveGauge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_bribeFactory',
        type: 'address',
      },
    ],
    name: 'setBribeFactory',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_gauge',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_external',
        type: 'address',
      },
    ],
    name: 'setExternalBribeFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_gauge',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_internal',
        type: 'address',
      },
    ],
    name: 'setInternalBribeFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_minter',
        type: 'address',
      },
    ],
    name: 'setMinter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_gauge',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_internal',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_external',
        type: 'address',
      },
    ],
    name: 'setNewBribes',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_permissionRegistry',
        type: 'address',
      },
    ],
    name: 'setPermissionsRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_delay',
        type: 'uint256',
      },
    ],
    name: 'setVoteDelay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalWeight',
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
        name: '_time',
        type: 'uint256',
      },
    ],
    name: 'totalWeightAt',
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
    inputs: [],
    name: 've',
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
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: '_poolVote',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '_weights',
        type: 'uint256[]',
      },
    ],
    name: 'vote',
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
    name: 'votes',
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
        name: '_pool',
        type: 'address',
      },
    ],
    name: 'weights',
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
        name: '_pool',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_time',
        type: 'uint256',
      },
    ],
    name: 'weightsAt',
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
        internalType: 'address[]',
        name: '_token',
        type: 'address[]',
      },
    ],
    name: 'whitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const SICKLE_FACTORY_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
    ],
    name: 'sickles',
    outputs: [
      {
        internalType: 'address',
        name: 'sickle',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const GAUGE_V2_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_rewardToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_ve',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_distribution',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_internal_bribe',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_external_bribe',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_isForPair',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ReentrancyGuardReentrantCall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'claimed0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'claimed1',
        type: 'uint256',
      },
    ],
    name: 'ClaimFees',
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
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'gauge',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'EmergencyActivated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'gauge',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'EmergencyDeactivated',
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
    name: 'Harvest',
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
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DISTRIBUTION',
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
    name: 'DURATION',
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
    name: 'TOKEN',
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
    name: 'VE',
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
    name: 'activateEmergencyMode',
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
    inputs: [],
    name: 'claimFees',
    outputs: [
      {
        internalType: 'uint256',
        name: 'claimed0',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'claimed1',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
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
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'depositAll',
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
    inputs: [],
    name: 'emergency',
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
    name: 'emergencyWithdraw',
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
    name: 'emergencyWithdrawAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'external_bribe',
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
    name: 'gaugeRewarder',
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
    name: 'getReward',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'getReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'internal_bribe',
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
    name: 'isForPair',
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
    name: 'lastTimeRewardApplicable',
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
    name: 'lastUpdateTime',
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
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'notifyRewardAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
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
  },
  {
    inputs: [],
    name: 'periodFinish',
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
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardForDuration',
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
    name: 'rewardPerToken',
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
    name: 'rewardPerTokenStored',
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
    name: 'rewardRate',
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
    name: 'rewardToken',
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
        name: '',
        type: 'address',
      },
    ],
    name: 'rewards',
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
        name: '_distribution',
        type: 'address',
      },
    ],
    name: 'setDistribution',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_gaugeRewarder',
        type: 'address',
      },
    ],
    name: 'setGaugeRewarder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_int',
        type: 'address',
      },
    ],
    name: 'setInternalBribe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stopEmergencyMode',
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
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userRewardPerTokenPaid',
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
    name: 'withdrawAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawAllAndHarvest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const FARM_STRATEGY_ABI = [
  {
    inputs: [
      {
        internalType: 'contract SickleFactory',
        name: 'factory',
        type: 'address',
      },
      {
        internalType: 'contract ConnectorRegistry',
        name: 'connectorRegistry',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'contract ITransferLib',
            name: 'transferLib',
            type: 'address',
          },
          {
            internalType: 'contract ISwapLib',
            name: 'swapLib',
            type: 'address',
          },
          {
            internalType: 'contract IFeesLib',
            name: 'feesLib',
            type: 'address',
          },
          {
            internalType: 'contract IZapLib',
            name: 'zapLib',
            type: 'address',
          },
          {
            internalType: 'contract IPositionSettingsLib',
            name: 'positionSettingsLib',
            type: 'address',
          },
        ],
        internalType: 'struct FarmStrategy.Libraries',
        name: 'libraries',
        type: 'tuple',
      },
      {
        internalType: 'contract IPositionSettingsRegistry',
        name: '_positionSettingsRegistry',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'NotApproved',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'NotOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotRegisteredSickle',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SickleNotDeployed',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract Sickle',
        name: 'sickle',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'claimStakingContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'claimPoolIndex',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'depositStakingContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositPoolIndex',
        type: 'uint256',
      },
    ],
    name: 'SickleCompounded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract Sickle',
        name: 'sickle',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'stakingContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'poolIndex',
        type: 'uint256',
      },
    ],
    name: 'SickleDeposited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract Sickle',
        name: 'sickle',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'stakingContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'poolIndex',
        type: 'uint256',
      },
    ],
    name: 'SickleExited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract Sickle',
        name: 'sickle',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'stakingContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'poolIndex',
        type: 'uint256',
      },
    ],
    name: 'SickleHarvested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract Sickle',
        name: 'sickle',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'stakingContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'poolIndex',
        type: 'uint256',
      },
    ],
    name: 'SickleWithdrawn',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'stakingContract',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'poolIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct Farm',
            name: 'claimFarm',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'claimExtraData',
            type: 'bytes',
          },
          {
            internalType: 'address[]',
            name: 'rewardTokens',
            type: 'address[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'amountIn',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'minAmountOut',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address',
                    name: 'tokenIn',
                    type: 'address',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'lpToken',
                    type: 'address',
                  },
                  {
                    internalType: 'address[]',
                    name: 'tokens',
                    type: 'address[]',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'desiredAmounts',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'minAmounts',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct AddLiquidityParams',
                name: 'addLiquidityParams',
                type: 'tuple',
              },
            ],
            internalType: 'struct ZapIn',
            name: 'zap',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'stakingContract',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'poolIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct Farm',
            name: 'depositFarm',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'depositExtraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct CompoundParams',
        name: 'params',
        type: 'tuple',
      },
      {
        internalType: 'address[]',
        name: 'sweepTokens',
        type: 'address[]',
      },
    ],
    name: 'compound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract Sickle',
        name: 'sickle',
        type: 'address',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'stakingContract',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'poolIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct Farm',
            name: 'claimFarm',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'claimExtraData',
            type: 'bytes',
          },
          {
            internalType: 'address[]',
            name: 'rewardTokens',
            type: 'address[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'amountIn',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'minAmountOut',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address',
                    name: 'tokenIn',
                    type: 'address',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'lpToken',
                    type: 'address',
                  },
                  {
                    internalType: 'address[]',
                    name: 'tokens',
                    type: 'address[]',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'desiredAmounts',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'minAmounts',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct AddLiquidityParams',
                name: 'addLiquidityParams',
                type: 'tuple',
              },
            ],
            internalType: 'struct ZapIn',
            name: 'zap',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'stakingContract',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'poolIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct Farm',
            name: 'depositFarm',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'depositExtraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct CompoundParams',
        name: 'params',
        type: 'tuple',
      },
      {
        internalType: 'address[]',
        name: 'sweepTokens',
        type: 'address[]',
      },
    ],
    name: 'compoundFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'connectorRegistry',
    outputs: [
      {
        internalType: 'contract ConnectorRegistry',
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
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'stakingContract',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'poolIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {
            internalType: 'address[]',
            name: 'tokensIn',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amountsIn',
            type: 'uint256[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'amountIn',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'minAmountOut',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address',
                    name: 'tokenIn',
                    type: 'address',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'lpToken',
                    type: 'address',
                  },
                  {
                    internalType: 'address[]',
                    name: 'tokens',
                    type: 'address[]',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'desiredAmounts',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'minAmounts',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct AddLiquidityParams',
                name: 'addLiquidityParams',
                type: 'tuple',
              },
            ],
            internalType: 'struct ZapIn',
            name: 'zap',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct DepositParams',
        name: 'params',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'pool',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'router',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'automateRewards',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'enum RewardBehavior',
                name: 'rewardBehavior',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'harvestTokenOut',
                type: 'address',
              },
            ],
            internalType: 'struct RewardConfig',
            name: 'rewardConfig',
            type: 'tuple',
          },
          {
            internalType: 'bool',
            name: 'autoExit',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'baseTokenIndex',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quoteTokenIndex',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'triggerPriceLow',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'exitTokenOutLow',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'triggerPriceHigh',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'exitTokenOutHigh',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'triggerReservesLow',
                type: 'uint256[]',
              },
              {
                internalType: 'address[]',
                name: 'triggerReservesTokensOut',
                type: 'address[]',
              },
              {
                internalType: 'uint256',
                name: 'priceImpactBP',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'slippageBP',
                type: 'uint256',
              },
            ],
            internalType: 'struct ExitConfig',
            name: 'exitConfig',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct PositionSettings',
        name: 'positionSettings',
        type: 'tuple',
      },
      {
        internalType: 'address[]',
        name: 'sweepTokens',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'referralCode',
        type: 'bytes32',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'stakingContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'poolIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct Farm',
        name: 'farm',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'router',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amountIn',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'minAmountOut',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'tokenIn',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extraData',
                type: 'bytes',
              },
            ],
            internalType: 'struct SwapParams[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
          {
            internalType: 'address[]',
            name: 'tokensOut',
            type: 'address[]',
          },
        ],
        internalType: 'struct HarvestParams',
        name: 'harvestParams',
        type: 'tuple',
      },
      {
        internalType: 'address[]',
        name: 'harvestSweepTokens',
        type: 'address[]',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'lpToken',
                    type: 'address',
                  },
                  {
                    internalType: 'address[]',
                    name: 'tokens',
                    type: 'address[]',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lpAmountIn',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'minAmountsOut',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct RemoveLiquidityParams',
                name: 'removeLiquidityParams',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'amountIn',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'minAmountOut',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address',
                    name: 'tokenIn',
                    type: 'address',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct ZapOut',
            name: 'zap',
            type: 'tuple',
          },
          {
            internalType: 'address[]',
            name: 'tokensOut',
            type: 'address[]',
          },
        ],
        internalType: 'struct WithdrawParams',
        name: 'withdrawParams',
        type: 'tuple',
      },
      {
        internalType: 'address[]',
        name: 'withdrawSweepTokens',
        type: 'address[]',
      },
    ],
    name: 'exit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract Sickle',
        name: 'sickle',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'stakingContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'poolIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct Farm',
        name: 'farm',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'router',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amountIn',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'minAmountOut',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'tokenIn',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extraData',
                type: 'bytes',
              },
            ],
            internalType: 'struct SwapParams[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
          {
            internalType: 'address[]',
            name: 'tokensOut',
            type: 'address[]',
          },
        ],
        internalType: 'struct HarvestParams',
        name: 'harvestParams',
        type: 'tuple',
      },
      {
        internalType: 'address[]',
        name: 'harvestSweepTokens',
        type: 'address[]',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'lpToken',
                    type: 'address',
                  },
                  {
                    internalType: 'address[]',
                    name: 'tokens',
                    type: 'address[]',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lpAmountIn',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'minAmountsOut',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct RemoveLiquidityParams',
                name: 'removeLiquidityParams',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'amountIn',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'minAmountOut',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address',
                    name: 'tokenIn',
                    type: 'address',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct ZapOut',
            name: 'zap',
            type: 'tuple',
          },
          {
            internalType: 'address[]',
            name: 'tokensOut',
            type: 'address[]',
          },
        ],
        internalType: 'struct WithdrawParams',
        name: 'withdrawParams',
        type: 'tuple',
      },
      {
        internalType: 'address[]',
        name: 'withdrawSweepTokens',
        type: 'address[]',
      },
    ],
    name: 'exitFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [
      {
        internalType: 'contract SickleFactory',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feesLib',
    outputs: [
      {
        internalType: 'contract IFeesLib',
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
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'referralCode',
        type: 'bytes32',
      },
    ],
    name: 'getOrDeploySickle',
    outputs: [
      {
        internalType: 'contract Sickle',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'getSickle',
    outputs: [
      {
        internalType: 'contract Sickle',
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
        components: [
          {
            internalType: 'address',
            name: 'stakingContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'poolIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct Farm',
        name: 'farm',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'router',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amountIn',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'minAmountOut',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'tokenIn',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extraData',
                type: 'bytes',
              },
            ],
            internalType: 'struct SwapParams[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
          {
            internalType: 'address[]',
            name: 'tokensOut',
            type: 'address[]',
          },
        ],
        internalType: 'struct HarvestParams',
        name: 'params',
        type: 'tuple',
      },
      {
        internalType: 'address[]',
        name: 'sweepTokens',
        type: 'address[]',
      },
    ],
    name: 'harvest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract Sickle',
        name: 'sickle',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'stakingContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'poolIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct Farm',
        name: 'farm',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'router',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amountIn',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'minAmountOut',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'tokenIn',
                type: 'address',
              },
              {
                internalType: 'bytes',
                name: 'extraData',
                type: 'bytes',
              },
            ],
            internalType: 'struct SwapParams[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
          {
            internalType: 'address[]',
            name: 'tokensOut',
            type: 'address[]',
          },
        ],
        internalType: 'struct HarvestParams',
        name: 'params',
        type: 'tuple',
      },
      {
        internalType: 'address[]',
        name: 'sweepTokens',
        type: 'address[]',
      },
    ],
    name: 'harvestFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'stakingContract',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'poolIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {
            internalType: 'address[]',
            name: 'tokensIn',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amountsIn',
            type: 'uint256[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'amountIn',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'minAmountOut',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address',
                    name: 'tokenIn',
                    type: 'address',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'lpToken',
                    type: 'address',
                  },
                  {
                    internalType: 'address[]',
                    name: 'tokens',
                    type: 'address[]',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'desiredAmounts',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'minAmounts',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct AddLiquidityParams',
                name: 'addLiquidityParams',
                type: 'tuple',
              },
            ],
            internalType: 'struct ZapIn',
            name: 'zap',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct DepositParams',
        name: 'params',
        type: 'tuple',
      },
      {
        internalType: 'address[]',
        name: 'sweepTokens',
        type: 'address[]',
      },
    ],
    name: 'increase',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'positionSettingsLib',
    outputs: [
      {
        internalType: 'contract IPositionSettingsLib',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'positionSettingsRegistry',
    outputs: [
      {
        internalType: 'contract IPositionSettingsRegistry',
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
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'stakingContract',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'poolIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'lpToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amountIn',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct SimpleDepositParams',
        name: 'params',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'pool',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'router',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'automateRewards',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'enum RewardBehavior',
                name: 'rewardBehavior',
                type: 'uint8',
              },
              {
                internalType: 'address',
                name: 'harvestTokenOut',
                type: 'address',
              },
            ],
            internalType: 'struct RewardConfig',
            name: 'rewardConfig',
            type: 'tuple',
          },
          {
            internalType: 'bool',
            name: 'autoExit',
            type: 'bool',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'baseTokenIndex',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'quoteTokenIndex',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'triggerPriceLow',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'exitTokenOutLow',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'triggerPriceHigh',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'exitTokenOutHigh',
                type: 'address',
              },
              {
                internalType: 'uint256[]',
                name: 'triggerReservesLow',
                type: 'uint256[]',
              },
              {
                internalType: 'address[]',
                name: 'triggerReservesTokensOut',
                type: 'address[]',
              },
              {
                internalType: 'uint256',
                name: 'priceImpactBP',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'slippageBP',
                type: 'uint256',
              },
            ],
            internalType: 'struct ExitConfig',
            name: 'exitConfig',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct PositionSettings',
        name: 'positionSettings',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'referralCode',
        type: 'bytes32',
      },
    ],
    name: 'simpleDeposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'stakingContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'poolIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct Farm',
        name: 'farm',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address[]',
            name: 'rewardTokens',
            type: 'address[]',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct SimpleHarvestParams',
        name: 'harvestParams',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'lpToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amountOut',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct SimpleWithdrawParams',
        name: 'withdrawParams',
        type: 'tuple',
      },
    ],
    name: 'simpleExit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'stakingContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'poolIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct Farm',
        name: 'farm',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address[]',
            name: 'rewardTokens',
            type: 'address[]',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct SimpleHarvestParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'simpleHarvest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'stakingContract',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'poolIndex',
                type: 'uint256',
              },
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'lpToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amountIn',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct SimpleDepositParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'simpleIncrease',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'stakingContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'poolIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct Farm',
        name: 'farm',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'lpToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amountOut',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
        ],
        internalType: 'struct SimpleWithdrawParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'simpleWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'strategyAddress',
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
    name: 'swapLib',
    outputs: [
      {
        internalType: 'contract ISwapLib',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'transferLib',
    outputs: [
      {
        internalType: 'contract ITransferLib',
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
        components: [
          {
            internalType: 'address',
            name: 'stakingContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'poolIndex',
            type: 'uint256',
          },
        ],
        internalType: 'struct Farm',
        name: 'farm',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'extraData',
            type: 'bytes',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'address',
                    name: 'lpToken',
                    type: 'address',
                  },
                  {
                    internalType: 'address[]',
                    name: 'tokens',
                    type: 'address[]',
                  },
                  {
                    internalType: 'uint256',
                    name: 'lpAmountIn',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256[]',
                    name: 'minAmountsOut',
                    type: 'uint256[]',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct RemoveLiquidityParams',
                name: 'removeLiquidityParams',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'router',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'amountIn',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'minAmountOut',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address',
                    name: 'tokenIn',
                    type: 'address',
                  },
                  {
                    internalType: 'bytes',
                    name: 'extraData',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct ZapOut',
            name: 'zap',
            type: 'tuple',
          },
          {
            internalType: 'address[]',
            name: 'tokensOut',
            type: 'address[]',
          },
        ],
        internalType: 'struct WithdrawParams',
        name: 'params',
        type: 'tuple',
      },
      {
        internalType: 'address[]',
        name: 'sweepTokens',
        type: 'address[]',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'zapLib',
    outputs: [
      {
        internalType: 'contract IZapLib',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const FARM_STRATEGY_ADDRESS = '0x85378fA1d0707897D948Ba322B5EB43254e4d7c2'

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const prices = await getPlasmaPrices()
  const tokens = {}

  const sickle_factory_address = '0x233D9067677dCf1a161954D45B4C965B9d567168'
  const sickle_factory = new ethcall.Contract(sickle_factory_address, SICKLE_FACTORY_ABI)

  let has_sickle = false
  const [sickle_address] = await App.ethcallProvider.all([sickle_factory.sickles(App.YOUR_ADDRESS)])
  sickle_address === '0x0000000000000000000000000000000000000000' ? (has_sickle = false) : (has_sickle = true)
  const users_address = App.YOUR_ADDRESS

  has_sickle ? (App.YOUR_ADDRESS = sickle_address) : (App.YOUR_ADDRESS = users_address)

  const lithos_voter_address = '0x2AF460a511849A7aA37Ac964074475b0E6249c69'
  const lithos_voter = new ethcall.Contract(lithos_voter_address, LITHOS_VOTER_ABI)

  const lithos_factory_v2_address = '0x71a870D1c935C2146b87644DF3B5316e8756aE18'
  const lithos_factory_v2 = new ethcall.Contract(lithos_factory_v2_address, LITHOS_V2_FACTORY_ABI)

  const [pool_length_] = await App.ethcallProvider.all([lithos_voter.length()])
  const pool_length = pool_length_ / 1

  const pool_calls = [...Array(pool_length).keys()].map(i => lithos_voter.pools(i))
  const pools = await App.ethcallProvider.all(pool_calls)

  const is_v2_pool_calls = pools.map(p => lithos_factory_v2.isPair(p))
  const is_v2_pools = await App.ethcallProvider.all(is_v2_pool_calls)

  let pools_v2 = [],
    users_v2_gauges = []

  for (let i = 0; i < pools.length; i++) {
    if (is_v2_pools[i] == true) {
      pools_v2.push(pools[i])
    }
  }

  const gauge_v2_calls = pools_v2.map(pv2 => lithos_voter.gauges(pv2))
  const gauges_v2 = await App.ethcallProvider.all(gauge_v2_calls)

  const gauges_contracts = gauges_v2.map(g => new ethcall.Contract(g, GAUGE_V2_ABI))
  const users_values_calls = gauges_contracts.map(c => c.balanceOf(App.YOUR_ADDRESS))
  const users_values = await App.ethcallProvider.all(users_values_calls)

  for (let i = 0; i < gauges_v2.length; i++) {
    if (users_values[i] > 0) {
      users_v2_gauges.push(gauges_v2[i])
    }
  }

  if (has_sickle) {
    _print_bold(`You have connected with your sickle account: ${sickle_address}`)
  }

  await loadLithosSynthetixPools(App, tokens, prices, users_v2_gauges, has_sickle, users_address)

  hideLoading()
}

async function loadLithosSynthetixPools(App, tokens, prices, gauges, has_sickle, users_address, customURLs) {
  const infos = await Promise.all(
    gauges.map(g => loadLithosSynthetixPoolInfo(App, tokens, prices, g, has_sickle, users_address))
  )
  for (const i of infos.filter(i => i?.poolPrices)) {
    await printLithosPool(App, i, 'plasma', customURLs)
  }
}

async function loadLithosSynthetixPoolInfo(App, tokens, prices, gauge, has_sickle, users_address) {
  const STAKING_POOL = new ethcall.Contract(gauge, GAUGE_V2_ABI)

  const rewardTokenAddress = '0xAbB48792A3161E81B47cA084c0b7A22a50324A44'

  let stakeTokenAddress, periodFinish, rewardRate, _userStaked, _earned
  try {
    ;[stakeTokenAddress, periodFinish, rewardRate, _userStaked, _earned] = await App.ethcallProvider.all([
      STAKING_POOL.TOKEN(),
      STAKING_POOL.periodFinish(),
      STAKING_POOL.rewardRate(),
      STAKING_POOL.balanceOf(App.YOUR_ADDRESS),
      STAKING_POOL.earned(App.YOUR_ADDRESS),
    ])
  } catch {
    return {
      gauge: '',
      poolPrices: '',
      stakeTokenAddress: '',
      rewardTokenAddress: '',
      stakeTokenTicker: '',
      rewardTokenTicker: '',
      stakeTokenPrice: 0,
      rewardTokenPrice: 0,
      weeklyRewards: 0,
      usdPerWeek: 0,
      staked_tvl: 0,
      userStaked: 0,
      userUnstaked: 0,
      earned: 0,
      has_sickle: false,
    }
  }

  var stakeToken = await getGeneralToken(App, stakeTokenAddress, gauge)

  var newTokenAddresses = stakeToken.tokens.filter(x => !getParameterCaseInsensitive(tokens, x))
  for (const address of newTokenAddresses) {
    tokens[address] = await getGeneralToken(App, address, gauge)
  }
  if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
    tokens[rewardTokenAddress] = await getGeneralToken(App, rewardTokenAddress, gauge)
  }
  const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress)

  const rewardTokenTicker = rewardToken.symbol

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, 'plasma')

  if (!poolPrices) {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`)
    return null
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker

  const stakeTokenPrice = prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd
  const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd

  const weeklyRewards = Date.now() / 1000 > periodFinish ? 0 : (rewardRate / 1e18) * 604800

  const usdPerWeek = weeklyRewards * rewardTokenPrice

  const staked_tvl = poolPrices.staked_tvl

  const userStaked = _userStaked / 10 ** stakeToken.decimals

  const userUnstaked = stakeToken.unstaked

  const earned = _earned / 10 ** rewardToken.decimals

  return {
    gauge,
    poolPrices,
    stakeTokenAddress,
    rewardTokenAddress,
    stakeTokenTicker,
    rewardTokenTicker,
    stakeTokenPrice,
    rewardTokenPrice,
    weeklyRewards,
    usdPerWeek,
    staked_tvl,
    userStaked,
    userUnstaked,
    earned,
    has_sickle,
    _userStaked,
  }
}

async function printLithosPool(App, info, chain = 'eth', customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs)
  const userStakedUsd = info.userStaked * info.stakeTokenPrice
  const userStakedPct = (userStakedUsd / info.staked_tvl) * 100
  _print(
    `You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
      `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`
  )
  const unstake = async function() {
    return rewardsContract_unstake(info.gauge, App)
  }
  const claim = async function() {
    return lithosContract_claim(info.gauge, App)
  }
  const sickle_lithos_unstake = async function() {
    return sickle_lithosContract_unstake(info.gauge, info.stakeTokenAddress, info._userStaked, App)
  }
  const sickle_lithos_claim = async function() {
    return sickle_lithosContract_claim(info.gauge, App)
  }
  _print(`<a target="_blank" href="https://plasmascan.to/address/${info.gauge}">Plasma Scan</a>`)
  if (info.has_sickle) {
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, sickle_lithos_unstake)
  } else {
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  }
  if (info.has_sickle) {
    _print_link(
      `Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(
        info.earned * info.rewardTokenPrice
      )})`,
      sickle_lithos_claim
    )
  } else {
    _print_link(
      `Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(
        info.earned * info.rewardTokenPrice
      )})`,
      claim
    )
  }
  _print('')
}

const sickle_lithosContract_unstake = async function(rewardPoolAddr, lpToken, userStaked, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(FARM_STRATEGY_ADDRESS, FARM_STRATEGY_ABI, signer)

  const farm = {
    stakingContract: rewardPoolAddr,
    poolIndex: 0,
  }

  const params = {
    lpToken: lpToken,
    amountOut: userStaked,
    extraData: '0x00',
  }

  showLoading()
  REWARD_POOL.simpleWithdraw(farm, params)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {
      hideLoading()
    })
}

const sickle_lithosContract_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const farm = {
    stakingContract: rewardPoolAddr,
    poolIndex: 0,
  }

  const params = {
    rewardTokens: ["0xAbB48792A3161E81B47cA084c0b7A22a50324A44"],
    extraData: '0x00',
  }

  const FARM_STRATEGY = new ethers.Contract(FARM_STRATEGY_ADDRESS, FARM_STRATEGY_ABI, signer)
  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, GAUGE_V2_ABI, signer)

  showLoading()
  REWARD_POOL.claimFees()
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function(t) {
      console.log(t)
      hideLoading()
    })

  showLoading()
  FARM_STRATEGY.simpleHarvest(farm, params)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {
      hideLoading()
    })
}

const lithosContract_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, GAUGE_V2_ABI, signer)

  showLoading()
  REWARD_POOL.claimFees()
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function(t) {
      console.log(t)
      hideLoading()
    })

  showLoading()
  REWARD_POOL.getReward(App.YOUR_ADDRESS)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {
      hideLoading()
    })
}
