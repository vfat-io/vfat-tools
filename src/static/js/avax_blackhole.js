$(function() {
  consoleInit(main)
})

const BLACKHOLE_V2_FACTORY_ABI = [
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

const BLACKHOLE_GAUGE_MANAGER_ABI = [
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
      {
        internalType: 'address',
        name: '_genesisManager',
        type: 'address',
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
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'DepositsForGenesis',
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
        name: '_tokenOwner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_timestamp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_totalAmount',
        type: 'uint256',
      },
    ],
    name: 'depositsForGenesis',
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
    name: 'genesisManager',
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
    name: 'genesisPool',
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
        name: '',
        type: 'address',
      },
    ],
    name: 'maturityTime',
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
        name: '_genesisPool',
        type: 'address',
      },
    ],
    name: 'setGenesisPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_genesisPoolManager',
        type: 'address',
      },
    ],
    name: 'setGenesisPoolManager',
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

const FARM_STRATEGY_ADDRESS = '0xdeD5C1fCF79f762094EEc6e6ed5E6104E6ED9938'

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const prices = await getAvaxPrices()
  const tokens = {}

  const sickle_factory_address = '0x53d9780DbD3831E3A797Fd215be4131636cD5FDf'
  const sickle_factory = new ethcall.Contract(sickle_factory_address, SICKLE_FACTORY_ABI)

  let has_sickle = false
  const [sickle_address] = await App.ethcallProvider.all([sickle_factory.sickles(App.YOUR_ADDRESS)])
  sickle_address === '0x0000000000000000000000000000000000000000' ? (has_sickle = false) : (has_sickle = true)
  const users_address = App.YOUR_ADDRESS

  has_sickle ? (App.YOUR_ADDRESS = sickle_address) : (App.YOUR_ADDRESS = users_address)

  const blackhole_gauge_manager_address = '0x59aa177312Ff6Bdf39C8Af6F46dAe217bf76CBf6'
  const blackhole_gauge_manager = new ethcall.Contract(blackhole_gauge_manager_address, BLACKHOLE_GAUGE_MANAGER_ABI)

  const blackhole_factory_v2_address = '0xfE926062Fb99CA5653080d6C14fE945Ad68c265C'
  const blackhole_factory_v2 = new ethcall.Contract(blackhole_factory_v2_address, BLACKHOLE_V2_FACTORY_ABI)

  const [pool_length_] = await App.ethcallProvider.all([blackhole_gauge_manager.length()])
  const pool_length = pool_length_ / 1

  const pool_calls = [...Array(pool_length).keys()].map(i => blackhole_gauge_manager.pools(i))
  const pools = await App.ethcallProvider.all(pool_calls)

  const is_v2_pool_calls = pools.map(p => blackhole_factory_v2.isPair(p))
  const is_v2_pools = await App.ethcallProvider.all(is_v2_pool_calls)

  let pools_v2 = [],
    users_v2_gauges = []

  for (let i = 0; i < pools.length; i++) {
    if (is_v2_pools[i] == true) {
      pools_v2.push(pools[i])
    }
  }

  const gauge_v2_calls = pools_v2.map(pv2 => blackhole_gauge_manager.gauges(pv2))
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

  await loadBlackholeSynthetixPools(App, tokens, prices, users_v2_gauges, has_sickle, users_address)

  hideLoading()
}

async function loadBlackholeSynthetixPools(App, tokens, prices, gauges, has_sickle, users_address, customURLs) {
  const infos = await Promise.all(
    gauges.map(g => loadBlackholeSynthetixPoolInfo(App, tokens, prices, g, has_sickle, users_address))
  )
  for (const i of infos.filter(i => i?.poolPrices)) {
    await printBlackholePool(App, i, 'avax', customURLs)
  }
}

async function loadBlackholeSynthetixPoolInfo(App, tokens, prices, gauge, has_sickle, users_address) {
  const STAKING_POOL = new ethcall.Contract(gauge, GAUGE_V2_ABI)

  const rewardTokenAddress = '0xcd94a87696FAC69Edae3a70fE5725307Ae1c43f6'

  let stakeTokenAddress, periodFinish, rewardRate, _userStaked, _earned
  try {
    ;[stakeTokenAddress, periodFinish, rewardRate, _userStaked, _earned] = await App.ethcallProvider.all([
      STAKING_POOL.TOKEN(),
      STAKING_POOL.periodFinish(),
      STAKING_POOL.rewardRate(rewardTokenAddress),
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

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, 'avax')

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

async function printBlackholePool(App, info, chain = 'eth', customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs)
  _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`)
  const weeklyAPR = (info.usdPerWeek / info.staked_tvl) * 100
  const dailyAPR = weeklyAPR / 7
  const yearlyAPR = weeklyAPR * 52
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`)
  const userStakedUsd = info.userStaked * info.stakeTokenPrice
  const userStakedPct = (userStakedUsd / info.staked_tvl) * 100
  _print(
    `You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
      `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`
  )
  if (info.userStaked > 0) {
    info.poolPrices.print_contained_price(info.userStaked)
    const userWeeklyRewards = (userStakedPct * info.weeklyRewards) / 100
    const userDailyRewards = userWeeklyRewards / 7
    const userYearlyRewards = userWeeklyRewards * 52
    _print(
      `Estimated ${info.rewardTokenTicker} earnings:` +
        ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards * info.rewardTokenPrice)})` +
        ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards * info.rewardTokenPrice)})` +
        ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards * info.rewardTokenPrice)})`
    )
  }
  const unstake = async function() {
    return rewardsContract_unstake(info.gauge, App)
  }
  const claim = async function() {
    return blackContract_claim(info.gauge, App)
  }
  const sickle_black_unstake = async function() {
    return sickle_blackContract_unstake(info.gauge, info.stakeTokenAddress, info._userStaked, App)
  }
  const sickle_black_claim = async function() {
    return sickle_blackContract_claim(info.gauge, App)
  }
  _print(`<a target="_blank" href="https://snowtrace.io/address/${info.gauge}#code">Avax Scan</a>`)
  if (info.has_sickle) {
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, sickle_black_unstake)
  } else {
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  }
  if (info.has_sickle) {
    _print_link(
      `Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(
        info.earned * info.rewardTokenPrice
      )})`,
      sickle_black_claim
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

const sickle_blackContract_unstake = async function(rewardPoolAddr, lpToken, userStaked, App) {
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

const sickle_blackContract_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const farm = {
    stakingContract: rewardPoolAddr,
    poolIndex: 0,
  }

  const params = {
    rewardTokens: [REWARD_TOKEN_ADDRESS],
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

const blackContract_claim = async function(rewardPoolAddr, App) {
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
