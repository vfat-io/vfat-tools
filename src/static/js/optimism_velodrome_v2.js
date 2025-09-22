$(function() {
  consoleInit(main)
})

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

const VELO_V2_FACTORY_ABI = [
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

const VELO_VOTER_ABI = [
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

const GAUGE_V2_ABI = [
  {
    inputs: [
      {internalType: 'address', name: '_forwarder', type: 'address'},
      {internalType: 'address', name: '_stakingToken', type: 'address'},
      {internalType: 'address', name: '_feesVotingReward', type: 'address'},
      {internalType: 'address', name: '_rewardToken', type: 'address'},
      {internalType: 'address', name: '_voter', type: 'address'},
      {internalType: 'bool', name: '_isPool', type: 'bool'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {inputs: [], name: 'NotAlive', type: 'error'},
  {inputs: [], name: 'NotAuthorized', type: 'error'},
  {inputs: [], name: 'NotVoter', type: 'error'},
  {inputs: [], name: 'RewardRateTooHigh', type: 'error'},
  {inputs: [], name: 'ZeroAmount', type: 'error'},
  {inputs: [], name: 'ZeroRewardRate', type: 'error'},
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
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'ClaimRewards',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'NotifyReward',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
      {internalType: 'address', name: '_recipient', type: 'address'},
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_account', type: 'address'}],
    name: 'earned',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fees0',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fees1',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feesVotingReward',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_account', type: 'address'}],
    name: 'getReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isPool',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'forwarder', type: 'address'}],
    name: 'isTrustedForwarder',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastTimeRewardApplicable',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastUpdateTime',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'left',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
    name: 'notifyRewardAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'periodFinish',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardRate',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'rewardRateByEpoch',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardToken',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'rewards',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakingToken',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'userRewardPerTokenPaid',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'voter',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const FARM_STRATEGY_ADDRESS = '0x5266E1C3d727A5Ee8fDddBc08E01050725E4e6B8'
const REWARD_TOKEN_ADDRESS = '0x9560e827af36c94d2ac33a39bce1fe78631088db'

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print(`Connected to RPC: ${App.rpcProvider.connection.url}\n`)
  _print('Reading smart contracts...\n')
  _print('This may take few minutes, please be patient...\n')

  const tokens = {}
  try {
    prices = await getOptimisticPrices()
  } catch (e) {
    prices = await getOptimismPrices2()
  }

  const SICKLE_FACTORY_ADDR = '0xB4C31b0f0B76b351395D4aCC94A54dD4e6fbA1E8'
  const SICKLE_FACTORY = new ethcall.Contract(SICKLE_FACTORY_ADDR, SICKLE_FACTORY_ABI)

  const [sickle_account_address] = await App.ethcallProvider.all([SICKLE_FACTORY.sickles(App.YOUR_ADDRESS)])
  const has_sickle_account = sickle_account_address === '0x0000000000000000000000000000000000000000' ? false : true

  const VELO_FACTORY_ADDRESS_V2 = '0xF1046053aa5682b4F9a81b5481394DA16BE5FF5a'
  const VELO_FACTORY_V2 = new ethcall.Contract(VELO_FACTORY_ADDRESS_V2, VELO_V2_FACTORY_ABI)

  const VELO_VOTER_ADDRESS = '0x41C914ee0c7E1A5edCD0295623e6dC557B5aBf3C'
  const VELO_VOTER = new ethcall.Contract(VELO_VOTER_ADDRESS, VELO_VOTER_ABI)

  const _length = await App.ethcallProvider.all([VELO_VOTER.length()])
  const length = _length / 1

  const pool_calls = [...Array(length).keys()].map(i => VELO_VOTER.pools(i))
  const pools = await App.ethcallProvider.all(pool_calls)

  const is_v2_pool_calls = pools.map(p => VELO_FACTORY_V2.isPair(p))
  const is_v2_pools = await App.ethcallProvider.all(is_v2_pool_calls)

  let pools_v2 = [],
    users_v2_gauges = []

  for (let i = 0; i < pools.length; i++) {
    if (is_v2_pools[i] == true) {
      pools_v2.push(pools[i])
    }
  }

  const gauge_v2_calls = pools_v2.map(pv2 => VELO_VOTER.gauges(pv2))
  const gauges_v2 = await App.ethcallProvider.all(gauge_v2_calls)

  const gauges_contracts = gauges_v2.map(g => new ethcall.Contract(g, GAUGE_V2_ABI))
  const users_values_calls = gauges_contracts.map(c => c.balanceOf(sickle_account_address))
  const users_values = await App.ethcallProvider.all(users_values_calls)

  for (let i = 0; i < gauges_v2.length; i++) {
    if (users_values[i] > 0) {
      users_v2_gauges.push(gauges_v2[i])
    }
  }

  const gauges = users_v2_gauges.map(a => {
    return {
      address: a,
      abi: GAUGE_V2_ABI,
      stakeTokenFunction: 'stakingToken',
    }
  })

  if (has_sickle_account) {
    _print_bold(`You have connected with your sickle account: ${sickle_account_address}`)
    _print('Your positions are')
    _print('')

    await loadVelodroneV2SynthetixPools(App, tokens, prices, gauges, has_sickle_account, sickle_account_address)

    hideLoading()
  } else {
    await loadVelodroneV2SynthetixPools(App, tokens, prices, gauges, has_sickle_account, sickle_account_address)

    hideLoading()
  }
}

async function loadVelodroneV2SynthetixPools(
  App,
  tokens,
  prices,
  pools,
  has_sickle_account,
  sickle_account_address,
  customURLs
) {
  const infos = await Promise.all(
    pools.map(p =>
      loadVelodromeV2SynthetixPoolInfo(
        App,
        tokens,
        prices,
        p.abi,
        p.address,
        p.stakeTokenFunction,
        has_sickle_account,
        sickle_account_address
      )
    )
  )
  for (const i of infos.filter(i => i?.poolPrices)) {
    await printVelodromeV2Pool(App, i, 'optimism', customURLs)
  }
}

async function loadVelodromeV2SynthetixPoolInfo(
  App,
  tokens,
  prices,
  stakingAbi,
  stakingAddress,
  stakeTokenFunction,
  has_sickle_account,
  sickle_account_address
) {
  const STAKING_POOL = new ethcall.Contract(stakingAddress, stakingAbi)

  let stakeTokenAddress, periodFinish, rewardRate, _userStaked, _earned
  try {
    ;[stakeTokenAddress, periodFinish, rewardRate, _userStaked, _earned] = await App.ethcallProvider.all([
      STAKING_POOL.stakingToken(),
      STAKING_POOL.periodFinish(),
      STAKING_POOL.rewardRate(),
      STAKING_POOL.balanceOf(sickle_account_address),
      STAKING_POOL.earned(sickle_account_address),
    ])
  } catch {
    return {
      stakingAddress: '',
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
      has_sickle_account: false,
    }
  }

  const rewardTokenAddress = '0x9560e827af36c94d2ac33a39bce1fe78631088db'

  var stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress)

  var newTokenAddresses = stakeToken.tokens.filter(x => !getParameterCaseInsensitive(tokens, x))
  for (const address of newTokenAddresses) {
    tokens[address] = await getGeneralToken(App, address, stakingAddress)
  }
  if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
    tokens[rewardTokenAddress] = await getGeneralToken(App, rewardTokenAddress, stakingAddress)
  }
  const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress)

  const rewardTokenTicker = rewardToken.symbol

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, 'optimism')

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
    stakingAddress,
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
    has_sickle_account,
    _userStaked,
  }
}

async function printVelodromeV2Pool(App, info, chain = 'eth', customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs)
  const userStakedUsd = info.userStaked * info.stakeTokenPrice
  const userStakedPct = (userStakedUsd / info.staked_tvl) * 100
  _print(
    `You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
      `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`
  )
  const unstake = async function() {
    return rewardsContract_unstake(info.stakingAddress, App)
  }
  const claim = async function() {
    return optimismContract_claim(info.stakingAddress, App)
  }
  const sickle_optimism_unstake = async function() {
    return sickle_optimismContract_unstake(info.stakingAddress, info.stakeTokenAddress, info._userStaked, App)
  }
  const sickle_optimism_claim = async function() {
    return sickle_optimismContract_claim(info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://optimistic.etherscan.io/address/${info.stakingAddress}#code">Optimism</a>`)
  if (info.has_sickle_account) {
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, sickle_optimism_unstake)
  } else {
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  }
  if (info.has_sickle_account) {
    _print_link(
      `Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(
        info.earned * info.rewardTokenPrice
      )})`,
      sickle_optimism_claim
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

const sickle_optimismContract_unstake = async function(rewardPoolAddr, lpToken, userStaked, App) {
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
      console.log(t)
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function(t) {
      console.log(t)
      hideLoading()
    })
}

const sickle_optimismContract_claim = async function(rewardPoolAddr, App) {
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

  showLoading()
  FARM_STRATEGY.simpleHarvest(farm, params)
    .then(function(t) {
      console.log(t)
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function(t) {
      console.log(t)
      hideLoading()
    })
}

async function getOptimismPrices2() {
  const OptTokenContracts = optimisticTokens.map(x => x.contract.toLowerCase())
  const idPrices = await lookUpPrices2(OptTokenContracts)
  const prices = {}
  for (const bt of optimisticTokens) if (idPrices[bt.contract]) prices[bt.contract] = {usd: idPrices[bt.contract]}
  return prices
}

const lookUpPrices2 = async function(id_array) {
  const prices = {}
  let ids = id_array.join('%2C')
  let res = await $.ajax({
    url: 'https://api.vfat.io/v1/token?chainId=10&address=' + ids,
    type: 'GET',
  })
  for (const [key, v] of Object.entries(res)) {
    if (v.price) prices[v.address] = v.price
  }
  return prices
}
