$(function() {
  consoleInit(main)
})

const THENA_V2_FACTORY_ABI = [
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

const THENA_VOTER_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'gaugeForPool',
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
    name: 'pools',
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
      {internalType: 'address[]', name: '_rewardtokens', type: 'address[]'},
      {internalType: 'address', name: '_token', type: 'address'},
      {internalType: 'address', name: '_distribution', type: 'address'},
      {internalType: 'address', name: '_feeVault', type: 'address'},
      {internalType: 'address', name: '_votingIncentives', type: 'address'},
      {internalType: 'address', name: '_claimer', type: 'address'},
      {internalType: 'bool', name: '_isWeighted', type: 'bool'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {anonymous: false, inputs: [], name: 'ActivateEmergencyMode', type: 'event'},
  {
    anonymous: false,
    inputs: [{indexed: true, internalType: 'address', name: 'token', type: 'address'}],
    name: 'AddRewardToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'claimed0', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'claimed1', type: 'uint256'},
    ],
    name: 'ClaimFees',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'token', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'claimed', type: 'uint256'},
    ],
    name: 'ClaimFees',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'address', name: 'token', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'reward', type: 'uint256'},
    ],
    name: 'Harvest',
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
    inputs: [{indexed: false, internalType: 'address', name: 'account', type: 'address'}],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: true, internalType: 'address', name: 'token', type: 'address'}],
    name: 'RemoveRewardToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'token', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'reward', type: 'uint256'},
    ],
    name: 'RewardAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: true, internalType: 'address', name: 'claimer', type: 'address'}],
    name: 'SetClaimer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: true, internalType: 'address', name: 'distribution', type: 'address'}],
    name: 'SetDistribution',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: true, internalType: 'address', name: 'feeVault', type: 'address'}],
    name: 'SetFeeVault',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: true, internalType: 'address', name: 'vi', type: 'address'}],
    name: 'SetVotingIncentives',
    type: 'event',
  },
  {anonymous: false, inputs: [], name: 'StopEmergencyMode', type: 'event'},
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'address', name: 'account', type: 'address'}],
    name: 'Unpaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DISTRIBUTION',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DURATION',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'TOKEN',
    outputs: [{internalType: 'contract IERC20', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {inputs: [], name: 'activateEmergencyMode', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'addRewardToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'account', type: 'address'}],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimFees',
    outputs: [
      {internalType: 'uint256', name: 'claimed0', type: 'uint256'},
      {internalType: 'uint256', name: 'claimed1', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimer',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {inputs: [], name: 'depositAll', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [
      {internalType: 'address', name: '_account', type: 'address'},
      {internalType: 'address', name: '_token', type: 'address'},
    ],
    name: 'earned',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_account', type: 'address'}],
    name: 'earnedAll',
    outputs: [{internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emergency',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {inputs: [], name: 'emergencyWithdraw', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
    name: 'emergencyWithdrawAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeVault',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {inputs: [], name: 'getReward', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'getReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'user', type: 'address'}],
    name: 'getRewardFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'isRewardToken',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_token', type: 'address'},
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
    ],
    name: 'notifyRewardAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_token', type: 'address'},
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
    ],
    name: 'notifyRewardAmountTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [{internalType: 'bool', name: 'status', type: 'bool'}],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'periodFinish',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'removeRewardToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'rewardForDuration',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'rewardPerToken',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'rewardRate',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'rewardTokens',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardTokensLength',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_claimer', type: 'address'}],
    name: 'setClaimer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_distribution', type: 'address'}],
    name: 'setDistribution',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_feeVault', type: 'address'}],
    name: 'setFeeVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_vi', type: 'address'}],
    name: 'setVotingIncentives',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {inputs: [], name: 'stopEmergencyMode', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [],
    name: 'totalSupply',
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
    inputs: [],
    name: 'votingIncentives',
    outputs: [{internalType: 'contract IVotingIncentives', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {inputs: [], name: 'withdrawAll', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {inputs: [], name: 'withdrawAllAndHarvest', outputs: [], stateMutability: 'nonpayable', type: 'function'},
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

const FARM_STRATEGY_ADDRESS = '0xAfCB6b953db124A279b2aF6fAE92A68ae6a12Bd4'

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const prices = await getBscPrices()
  const tokens = {}

  const sickle_factory_address = '0x53d9780DbD3831E3A797Fd215be4131636cD5FDf'
  const sickle_factory = new ethcall.Contract(sickle_factory_address, SICKLE_FACTORY_ABI)

  let has_sickle = false
  const [sickle_address] = await App.ethcallProvider.all([sickle_factory.sickles(App.YOUR_ADDRESS)])
  sickle_address === '0x0000000000000000000000000000000000000000' ? (has_sickle = false) : (has_sickle = true)
  const users_address = App.YOUR_ADDRESS

  has_sickle ? (App.YOUR_ADDRESS = sickle_address) : (App.YOUR_ADDRESS = users_address)

  const thena_voter_address = '0x8FBB1ECEbb9E9839bC0dE00b9c4C585CabDD0462'
  const thena_voter = new ethcall.Contract(thena_voter_address, THENA_VOTER_ABI)

  const thena_factory_v2_address = '0xAFD89d21BdB66d00817d4153E055830B1c2B3970'
  const thena_factory_v2 = new ethcall.Contract(thena_factory_v2_address, THENA_V2_FACTORY_ABI)

  const _pools = await App.ethcallProvider.all([thena_voter.pools()])
  const pools = _pools.flat()

  const is_v2_pool_calls = pools.map(p => thena_factory_v2.isPair(p))
  const is_v2_pools = await App.ethcallProvider.all(is_v2_pool_calls)

  let pools_v2 = [],
    users_v2_gauges = []

  for (let i = 0; i < pools.length; i++) {
    if (is_v2_pools[i] == true) {
      pools_v2.push(pools[i])
    }
  }

  const gauge_v2_calls = pools_v2.map(pv2 => thena_voter.gaugeForPool(pv2))
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
    _print_bold(``)
  }

  await loadThenaSynthetixPools(App, tokens, prices, users_v2_gauges, has_sickle, users_address)

  hideLoading()
}

async function loadThenaSynthetixPools(App, tokens, prices, gauges, has_sickle, users_address, customURLs) {
  const infos = await Promise.all(
    gauges.map(g => loadThenaSynthetixPoolInfo(App, tokens, prices, g, has_sickle, users_address))
  )
  for (const i of infos.filter(i => i?.poolPrices)) {
    await printThenaPool(App, i, 'bsc', customURLs)
  }
}

async function loadThenaSynthetixPoolInfo(App, tokens, prices, gauge, has_sickle, users_address) {
  const STAKING_POOL = new ethcall.Contract(gauge, GAUGE_V2_ABI)

  const rewardTokenAddress = '0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a11'

  let stakeTokenAddress, periodFinish, rewardRate, _userStaked, _earned
  try {
    ;[stakeTokenAddress, periodFinish, rewardRate, _userStaked, _earned] = await App.ethcallProvider.all([
      STAKING_POOL.TOKEN(),
      STAKING_POOL.periodFinish(rewardTokenAddress),
      STAKING_POOL.rewardRate(rewardTokenAddress),
      STAKING_POOL.balanceOf(App.YOUR_ADDRESS),
      STAKING_POOL.earned(App.YOUR_ADDRESS, rewardTokenAddress),
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

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, 'bsc')

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

async function printThenaPool(App, info, chain = 'eth', customURLs) {
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
    return thenaContract_claim(info.gauge, App)
  }
  const sickle_thena_unstake = async function() {
    return sickle_thenaContract_unstake(info.gauge, info.stakeTokenAddress, info._userStaked, App)
  }
  const sickle_thena_claim = async function() {
    return sickle_thenaContract_claim(info.gauge, App)
  }
  _print(`<a target="_blank" href="https://bscscan.com/address/${info.gauge}#code">BSC Scan</a>`)
  if (info.has_sickle) {
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, sickle_thena_unstake)
  } else {
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  }
  if (info.has_sickle) {
    _print_link(
      `Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(
        info.earned * info.rewardTokenPrice
      )})`,
      sickle_thena_claim
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

const sickle_thenaContract_unstake = async function(rewardPoolAddr, lpToken, userStaked, App) {
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

const sickle_thenaContract_claim = async function(rewardPoolAddr, App) {
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

const thenaContract_claim = async function(rewardPoolAddr, App) {
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
