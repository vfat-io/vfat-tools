$(function() {
  consoleInit(main)
})

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

const VELO_FACTORY_V3_ABI = [
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

const VELO_FACTORY_V2_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isPool',
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

const GAUGE_V3_ABI = [
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
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: true, internalType: 'uint128', name: 'liquidityToStake', type: 'uint128'},
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
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: true, internalType: 'uint128', name: 'liquidityToStake', type: 'uint128'},
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'account', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
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
    inputs: [],
    name: 'gaugeFactory',
    outputs: [{internalType: 'contract ICLGaugeFactory', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'getReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'account', type: 'address'}],
    name: 'getReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_pool', type: 'address'},
      {internalType: 'address', name: '_feesVotingReward', type: 'address'},
      {internalType: 'address', name: '_rewardToken', type: 'address'},
      {internalType: 'address', name: '_voter', type: 'address'},
      {internalType: 'address', name: '_nft', type: 'address'},
      {internalType: 'address', name: '_token0', type: 'address'},
      {internalType: 'address', name: '_token1', type: 'address'},
      {internalType: 'int24', name: '_tickSpacing', type: 'int24'},
      {internalType: 'bool', name: '_isPool', type: 'bool'},
    ],
    name: 'initialize',
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
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
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
    inputs: [],
    name: 'nft',
    outputs: [{internalType: 'contract INonfungiblePositionManager', name: '', type: 'address'}],
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
    inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
    name: 'notifyRewardWithoutClaim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '', type: 'address'},
      {internalType: 'address', name: '', type: 'address'},
      {internalType: 'uint256', name: '', type: 'uint256'},
      {internalType: 'bytes', name: '', type: 'bytes'},
    ],
    name: 'onERC721Received',
    outputs: [{internalType: 'bytes4', name: '', type: 'bytes4'}],
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
    name: 'pool',
    outputs: [{internalType: 'contract ICLPool', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'rewardGrowthInside',
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
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'rewards',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'depositor', type: 'address'},
      {internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'stakedByIndex',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'depositor', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'stakedContains',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'depositor', type: 'address'}],
    name: 'stakedLength',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'depositor', type: 'address'}],
    name: 'stakedValues',
    outputs: [{internalType: 'uint256[]', name: 'staked', type: 'uint256[]'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tickSpacing',
    outputs: [{internalType: 'int24', name: '', type: 'int24'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token0',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token1',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'voter',
    outputs: [{internalType: 'contract IVoter', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const CL_TOKEN_ABI = [
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {indexed: true, internalType: 'int24', name: 'tickLower', type: 'int24'},
      {indexed: true, internalType: 'int24', name: 'tickUpper', type: 'int24'},
      {indexed: false, internalType: 'uint128', name: 'amount', type: 'uint128'},
      {indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    name: 'Burn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {indexed: false, internalType: 'address', name: 'recipient', type: 'address'},
      {indexed: true, internalType: 'int24', name: 'tickLower', type: 'int24'},
      {indexed: true, internalType: 'int24', name: 'tickUpper', type: 'int24'},
      {indexed: false, internalType: 'uint128', name: 'amount0', type: 'uint128'},
      {indexed: false, internalType: 'uint128', name: 'amount1', type: 'uint128'},
    ],
    name: 'Collect',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'recipient', type: 'address'},
      {indexed: false, internalType: 'uint128', name: 'amount0', type: 'uint128'},
      {indexed: false, internalType: 'uint128', name: 'amount1', type: 'uint128'},
    ],
    name: 'CollectFees',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'sender', type: 'address'},
      {indexed: true, internalType: 'address', name: 'recipient', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'paid0', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'paid1', type: 'uint256'},
    ],
    name: 'Flash',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: false, internalType: 'uint16', name: 'observationCardinalityNextOld', type: 'uint16'},
      {indexed: false, internalType: 'uint16', name: 'observationCardinalityNextNew', type: 'uint16'},
    ],
    name: 'IncreaseObservationCardinalityNext',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: false, internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160'},
      {indexed: false, internalType: 'int24', name: 'tick', type: 'int24'},
    ],
    name: 'Initialize',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: false, internalType: 'address', name: 'sender', type: 'address'},
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {indexed: true, internalType: 'int24', name: 'tickLower', type: 'int24'},
      {indexed: true, internalType: 'int24', name: 'tickUpper', type: 'int24'},
      {indexed: false, internalType: 'uint128', name: 'amount', type: 'uint128'},
      {indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: false, internalType: 'uint8', name: 'feeProtocol0Old', type: 'uint8'},
      {indexed: false, internalType: 'uint8', name: 'feeProtocol1Old', type: 'uint8'},
      {indexed: false, internalType: 'uint8', name: 'feeProtocol0New', type: 'uint8'},
      {indexed: false, internalType: 'uint8', name: 'feeProtocol1New', type: 'uint8'},
    ],
    name: 'SetFeeProtocol',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'sender', type: 'address'},
      {indexed: true, internalType: 'address', name: 'recipient', type: 'address'},
      {indexed: false, internalType: 'int256', name: 'amount0', type: 'int256'},
      {indexed: false, internalType: 'int256', name: 'amount1', type: 'int256'},
      {indexed: false, internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160'},
      {indexed: false, internalType: 'uint128', name: 'liquidity', type: 'uint128'},
      {indexed: false, internalType: 'int24', name: 'tick', type: 'int24'},
    ],
    name: 'Swap',
    type: 'event',
  },
  {
    inputs: [
      {internalType: 'int24', name: 'tickLower', type: 'int24'},
      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
      {internalType: 'uint128', name: 'amount', type: 'uint128'},
      {internalType: 'address', name: 'owner', type: 'address'},
    ],
    name: 'burn',
    outputs: [
      {internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'int24', name: 'tickLower', type: 'int24'},
      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
      {internalType: 'uint128', name: 'amount', type: 'uint128'},
    ],
    name: 'burn',
    outputs: [
      {internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'int24', name: 'tickLower', type: 'int24'},
      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
      {internalType: 'uint128', name: 'amount0Requested', type: 'uint128'},
      {internalType: 'uint128', name: 'amount1Requested', type: 'uint128'},
      {internalType: 'address', name: 'owner', type: 'address'},
    ],
    name: 'collect',
    outputs: [
      {internalType: 'uint128', name: 'amount0', type: 'uint128'},
      {internalType: 'uint128', name: 'amount1', type: 'uint128'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'int24', name: 'tickLower', type: 'int24'},
      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
      {internalType: 'uint128', name: 'amount0Requested', type: 'uint128'},
      {internalType: 'uint128', name: 'amount1Requested', type: 'uint128'},
    ],
    name: 'collect',
    outputs: [
      {internalType: 'uint128', name: 'amount0', type: 'uint128'},
      {internalType: 'uint128', name: 'amount1', type: 'uint128'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'collectFees',
    outputs: [
      {internalType: 'uint128', name: 'amount0', type: 'uint128'},
      {internalType: 'uint128', name: 'amount1', type: 'uint128'},
    ],
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'factoryRegistry',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fee',
    outputs: [{internalType: 'uint24', name: '', type: 'uint24'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeGrowthGlobal0X128',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeGrowthGlobal1X128',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {internalType: 'uint256', name: 'amount1', type: 'uint256'},
      {internalType: 'bytes', name: 'data', type: 'bytes'},
    ],
    name: 'flash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gauge',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gaugeFees',
    outputs: [
      {internalType: 'uint128', name: 'token0', type: 'uint128'},
      {internalType: 'uint128', name: 'token1', type: 'uint128'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'int24', name: 'tickLower', type: 'int24'},
      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
      {internalType: 'uint256', name: '_rewardGrowthGlobalX128', type: 'uint256'},
    ],
    name: 'getRewardGrowthInside',
    outputs: [{internalType: 'uint256', name: 'rewardGrowthInside', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint16', name: 'observationCardinalityNext', type: 'uint16'}],
    name: 'increaseObservationCardinalityNext',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_factory', type: 'address'},
      {internalType: 'address', name: '_token0', type: 'address'},
      {internalType: 'address', name: '_token1', type: 'address'},
      {internalType: 'int24', name: '_tickSpacing', type: 'int24'},
      {internalType: 'address', name: '_factoryRegistry', type: 'address'},
      {internalType: 'uint160', name: '_sqrtPriceX96', type: 'uint160'},
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastUpdated',
    outputs: [{internalType: 'uint32', name: '', type: 'uint32'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liquidity',
    outputs: [{internalType: 'uint128', name: '', type: 'uint128'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxLiquidityPerTick',
    outputs: [{internalType: 'uint128', name: '', type: 'uint128'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'int24', name: 'tickLower', type: 'int24'},
      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
      {internalType: 'uint128', name: 'amount', type: 'uint128'},
      {internalType: 'bytes', name: 'data', type: 'bytes'},
    ],
    name: 'mint',
    outputs: [
      {internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nft',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'observations',
    outputs: [
      {internalType: 'uint32', name: 'blockTimestamp', type: 'uint32'},
      {internalType: 'int56', name: 'tickCumulative', type: 'int56'},
      {internalType: 'uint160', name: 'secondsPerLiquidityCumulativeX128', type: 'uint160'},
      {internalType: 'bool', name: 'initialized', type: 'bool'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint32[]', name: 'secondsAgos', type: 'uint32[]'}],
    name: 'observe',
    outputs: [
      {internalType: 'int56[]', name: 'tickCumulatives', type: 'int56[]'},
      {internalType: 'uint160[]', name: 'secondsPerLiquidityCumulativeX128s', type: 'uint160[]'},
    ],
    stateMutability: 'view',
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
    inputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    name: 'positions',
    outputs: [
      {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
      {internalType: 'uint256', name: 'feeGrowthInside0LastX128', type: 'uint256'},
      {internalType: 'uint256', name: 'feeGrowthInside1LastX128', type: 'uint256'},
      {internalType: 'uint128', name: 'tokensOwed0', type: 'uint128'},
      {internalType: 'uint128', name: 'tokensOwed1', type: 'uint128'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardGrowthGlobalX128',
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
    inputs: [],
    name: 'rewardReserve',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rollover',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_gauge', type: 'address'},
      {internalType: 'address', name: '_nft', type: 'address'},
    ],
    name: 'setGaugeAndPositionManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slot0',
    outputs: [
      {internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160'},
      {internalType: 'int24', name: 'tick', type: 'int24'},
      {internalType: 'uint16', name: 'observationIndex', type: 'uint16'},
      {internalType: 'uint16', name: 'observationCardinality', type: 'uint16'},
      {internalType: 'uint16', name: 'observationCardinalityNext', type: 'uint16'},
      {internalType: 'bool', name: 'unlocked', type: 'bool'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'int24', name: 'tickLower', type: 'int24'},
      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
    ],
    name: 'snapshotCumulativesInside',
    outputs: [
      {internalType: 'int56', name: 'tickCumulativeInside', type: 'int56'},
      {internalType: 'uint160', name: 'secondsPerLiquidityInsideX128', type: 'uint160'},
      {internalType: 'uint32', name: 'secondsInside', type: 'uint32'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'int128', name: 'stakedLiquidityDelta', type: 'int128'},
      {internalType: 'int24', name: 'tickLower', type: 'int24'},
      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
      {internalType: 'bool', name: 'positionUpdate', type: 'bool'},
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakedLiquidity',
    outputs: [{internalType: 'uint128', name: '', type: 'uint128'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'bool', name: 'zeroForOne', type: 'bool'},
      {internalType: 'int256', name: 'amountSpecified', type: 'int256'},
      {internalType: 'uint160', name: 'sqrtPriceLimitX96', type: 'uint160'},
      {internalType: 'bytes', name: 'data', type: 'bytes'},
    ],
    name: 'swap',
    outputs: [
      {internalType: 'int256', name: 'amount0', type: 'int256'},
      {internalType: 'int256', name: 'amount1', type: 'int256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_rewardRate', type: 'uint256'},
      {internalType: 'uint256', name: '_rewardReserve', type: 'uint256'},
      {internalType: 'uint256', name: '_periodFinish', type: 'uint256'},
    ],
    name: 'syncReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'int16', name: '', type: 'int16'}],
    name: 'tickBitmap',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tickSpacing',
    outputs: [{internalType: 'int24', name: '', type: 'int24'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'int24', name: '', type: 'int24'}],
    name: 'ticks',
    outputs: [
      {internalType: 'uint128', name: 'liquidityGross', type: 'uint128'},
      {internalType: 'int128', name: 'liquidityNet', type: 'int128'},
      {internalType: 'int128', name: 'stakedLiquidityNet', type: 'int128'},
      {internalType: 'uint256', name: 'feeGrowthOutside0X128', type: 'uint256'},
      {internalType: 'uint256', name: 'feeGrowthOutside1X128', type: 'uint256'},
      {internalType: 'uint256', name: 'rewardGrowthOutsideX128', type: 'uint256'},
      {internalType: 'int56', name: 'tickCumulativeOutside', type: 'int56'},
      {internalType: 'uint160', name: 'secondsPerLiquidityOutsideX128', type: 'uint160'},
      {internalType: 'uint32', name: 'secondsOutside', type: 'uint32'},
      {internalType: 'bool', name: 'initialized', type: 'bool'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token0',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token1',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unstakedFee',
    outputs: [{internalType: 'uint24', name: '', type: 'uint24'}],
    stateMutability: 'view',
    type: 'function',
  },
  {inputs: [], name: 'updateRewardsGrowthGlobal', outputs: [], stateMutability: 'nonpayable', type: 'function'},
]

const NFT_POSITION_MANAGER_ABI = [
  {
    inputs: [
      {internalType: 'address', name: '_factory', type: 'address'},
      {internalType: 'address', name: '_WETH9', type: 'address'},
      {internalType: 'address', name: '_tokenDescriptor', type: 'address'},
      {internalType: 'string', name: 'name', type: 'string'},
      {internalType: 'string', name: 'symbol', type: 'string'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {indexed: true, internalType: 'address', name: 'approved', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {indexed: true, internalType: 'address', name: 'operator', type: 'address'},
      {indexed: false, internalType: 'bool', name: 'approved', type: 'bool'},
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: false, internalType: 'uint256', name: '_fromTokenId', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: '_toTokenId', type: 'uint256'},
    ],
    name: 'BatchMetadataUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'recipient', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    name: 'Collect',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: false, internalType: 'uint128', name: 'liquidity', type: 'uint128'},
      {indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    name: 'DecreaseLiquidity',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: false, internalType: 'uint128', name: 'liquidity', type: 'uint128'},
      {indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    name: 'IncreaseLiquidity',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'uint256', name: '_tokenId', type: 'uint256'}],
    name: 'MetadataUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: true, internalType: 'address', name: 'tokenDescriptor', type: 'address'}],
    name: 'TokenDescriptorChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: true, internalType: 'address', name: 'owner', type: 'address'}],
    name: 'TransferOwnership',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'WETH9',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'owner', type: 'address'}],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseURI',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'burn',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
          {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
        ],
        internalType: 'struct INonfungiblePositionManager.CollectParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'collect',
    outputs: [
      {internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
          {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
          {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
          {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
          {internalType: 'uint256', name: 'deadline', type: 'uint256'},
        ],
        internalType: 'struct INonfungiblePositionManager.DecreaseLiquidityParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'decreaseLiquidity',
    outputs: [
      {internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {internalType: 'uint256', name: 'amount1', type: 'uint256'},
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
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'getApproved',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
          {internalType: 'uint256', name: 'amount0Desired', type: 'uint256'},
          {internalType: 'uint256', name: 'amount1Desired', type: 'uint256'},
          {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
          {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
          {internalType: 'uint256', name: 'deadline', type: 'uint256'},
        ],
        internalType: 'struct INonfungiblePositionManager.IncreaseLiquidityParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'increaseLiquidity',
    outputs: [
      {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
      {internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'address', name: 'operator', type: 'address'},
    ],
    name: 'isApprovedForAll',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {internalType: 'address', name: 'token0', type: 'address'},
          {internalType: 'address', name: 'token1', type: 'address'},
          {internalType: 'int24', name: 'tickSpacing', type: 'int24'},
          {internalType: 'int24', name: 'tickLower', type: 'int24'},
          {internalType: 'int24', name: 'tickUpper', type: 'int24'},
          {internalType: 'uint256', name: 'amount0Desired', type: 'uint256'},
          {internalType: 'uint256', name: 'amount1Desired', type: 'uint256'},
          {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
          {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'deadline', type: 'uint256'},
          {internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160'},
        ],
        internalType: 'struct INonfungiblePositionManager.MintParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'mint',
    outputs: [
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
      {internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'bytes[]', name: 'data', type: 'bytes[]'}],
    name: 'multicall',
    outputs: [{internalType: 'bytes[]', name: 'results', type: 'bytes[]'}],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
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
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'ownerOf',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
      {internalType: 'uint8', name: 'v', type: 'uint8'},
      {internalType: 'bytes32', name: 'r', type: 'bytes32'},
      {internalType: 'bytes32', name: 's', type: 'bytes32'},
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'positions',
    outputs: [
      {internalType: 'uint96', name: 'nonce', type: 'uint96'},
      {internalType: 'address', name: 'operator', type: 'address'},
      {internalType: 'address', name: 'token0', type: 'address'},
      {internalType: 'address', name: 'token1', type: 'address'},
      {internalType: 'int24', name: 'tickSpacing', type: 'int24'},
      {internalType: 'int24', name: 'tickLower', type: 'int24'},
      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
      {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
      {internalType: 'uint256', name: 'feeGrowthInside0LastX128', type: 'uint256'},
      {internalType: 'uint256', name: 'feeGrowthInside1LastX128', type: 'uint256'},
      {internalType: 'uint128', name: 'tokensOwed0', type: 'uint128'},
      {internalType: 'uint128', name: 'tokensOwed1', type: 'uint128'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {inputs: [], name: 'refundETH', outputs: [], stateMutability: 'payable', type: 'function'},
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {internalType: 'bytes', name: '_data', type: 'bytes'},
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'token', type: 'address'},
      {internalType: 'uint256', name: 'value', type: 'uint256'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
      {internalType: 'uint8', name: 'v', type: 'uint8'},
      {internalType: 'bytes32', name: 'r', type: 'bytes32'},
      {internalType: 'bytes32', name: 's', type: 'bytes32'},
    ],
    name: 'selfPermit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'token', type: 'address'},
      {internalType: 'uint256', name: 'nonce', type: 'uint256'},
      {internalType: 'uint256', name: 'expiry', type: 'uint256'},
      {internalType: 'uint8', name: 'v', type: 'uint8'},
      {internalType: 'bytes32', name: 'r', type: 'bytes32'},
      {internalType: 'bytes32', name: 's', type: 'bytes32'},
    ],
    name: 'selfPermitAllowed',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'token', type: 'address'},
      {internalType: 'uint256', name: 'nonce', type: 'uint256'},
      {internalType: 'uint256', name: 'expiry', type: 'uint256'},
      {internalType: 'uint8', name: 'v', type: 'uint8'},
      {internalType: 'bytes32', name: 'r', type: 'bytes32'},
      {internalType: 'bytes32', name: 's', type: 'bytes32'},
    ],
    name: 'selfPermitAllowedIfNecessary',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'token', type: 'address'},
      {internalType: 'uint256', name: 'value', type: 'uint256'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
      {internalType: 'uint8', name: 'v', type: 'uint8'},
      {internalType: 'bytes32', name: 'r', type: 'bytes32'},
      {internalType: 'bytes32', name: 's', type: 'bytes32'},
    ],
    name: 'selfPermitIfNecessary',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'operator', type: 'address'},
      {internalType: 'bool', name: 'approved', type: 'bool'},
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_owner', type: 'address'}],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_tokenDescriptor', type: 'address'}],
    name: 'setTokenDescriptor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'bytes4', name: 'interfaceId', type: 'bytes4'}],
    name: 'supportsInterface',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'token', type: 'address'},
      {internalType: 'uint256', name: 'amountMinimum', type: 'uint256'},
      {internalType: 'address', name: 'recipient', type: 'address'},
    ],
    name: 'sweepToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'index', type: 'uint256'}],
    name: 'tokenByIndex',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenDescriptor',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'uint256', name: 'index', type: 'uint256'},
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'tokenURI',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
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
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amount0Owed', type: 'uint256'},
      {internalType: 'uint256', name: 'amount1Owed', type: 'uint256'},
      {internalType: 'bytes', name: 'data', type: 'bytes'},
    ],
    name: 'uniswapV3MintCallback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'amountMinimum', type: 'uint256'},
      {internalType: 'address', name: 'recipient', type: 'address'},
    ],
    name: 'unwrapWETH9',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {stateMutability: 'payable', type: 'receive'},
]

const NFT_FARM_STRATEGY_ABI = [
  {
    inputs: [
      {internalType: 'contract SickleFactory', name: 'factory', type: 'address'},
      {internalType: 'contract ConnectorRegistry', name: 'connectorRegistry', type: 'address'},
      {internalType: 'contract INftSettingsRegistry', name: 'nftSettingsRegistry_', type: 'address'},
      {
        components: [
          {internalType: 'contract INftTransferLib', name: 'nftTransferLib', type: 'address'},
          {internalType: 'contract ITransferLib', name: 'transferLib', type: 'address'},
          {internalType: 'contract ISwapLib', name: 'swapLib', type: 'address'},
          {internalType: 'contract IFeesLib', name: 'feesLib', type: 'address'},
          {internalType: 'contract INftZapLib', name: 'nftZapLib', type: 'address'},
          {internalType: 'contract INftSettingsLib', name: 'nftSettingsLib', type: 'address'},
        ],
        internalType: 'struct NftFarmStrategy.Libraries',
        name: 'libraries',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {inputs: [], name: 'NftSupplyChanged', type: 'error'},
  {inputs: [], name: 'NftSupplyDidntIncrease', type: 'error'},
  {inputs: [], name: 'NotApproved', type: 'error'},
  {inputs: [{internalType: 'address', name: 'sender', type: 'address'}], name: 'NotOwner', type: 'error'},
  {inputs: [], name: 'NotRegisteredSickle', type: 'error'},
  {inputs: [], name: 'PleaseUseDeposit', type: 'error'},
  {inputs: [], name: 'PleaseUseIncrease', type: 'error'},
  {inputs: [], name: 'SickleNotDeployed', type: 'error'},
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {indexed: true, internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'stakingContract', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
    ],
    name: 'SickleCompoundedNft',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {indexed: true, internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'stakingContract', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
    ],
    name: 'SickleDecreasedNft',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {indexed: true, internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'stakingContract', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
    ],
    name: 'SickleDepositedNft',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {indexed: true, internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'stakingContract', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
    ],
    name: 'SickleExitedNft',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {indexed: true, internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'stakingContract', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
    ],
    name: 'SickleHarvestedNft',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {indexed: true, internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'stakingContract', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
    ],
    name: 'SickleIncreasedNft',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {indexed: true, internalType: 'contract INonfungiblePositionManager', name: 'fromNft', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'fromTokenId', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'fromStakingContract', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'fromPoolIndex', type: 'uint256'},
      {indexed: false, internalType: 'contract INonfungiblePositionManager', name: 'toNft', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'toTokenId', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'toStakingContract', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'toPoolIndex', type: 'uint256'},
    ],
    name: 'SickleMovedNft',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {indexed: true, internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'stakingContract', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
    ],
    name: 'SickleRebalancedNft',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {indexed: true, internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {indexed: false, internalType: 'address', name: 'stakingContract', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
    ],
    name: 'SickleWithdrewNft',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
              {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
              {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SimpleNftHarvest',
            name: 'harvest',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {internalType: 'address', name: 'tokenApproval', type: 'address'},
                  {internalType: 'address', name: 'router', type: 'address'},
                  {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                  {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                  {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                  {internalType: 'address', name: 'tokenIn', type: 'address'},
                  {internalType: 'address', name: 'tokenOut', type: 'address'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
              {
                components: [
                  {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                  {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                  {
                    components: [
                      {internalType: 'address', name: 'token0', type: 'address'},
                      {internalType: 'address', name: 'token1', type: 'address'},
                      {internalType: 'uint24', name: 'fee', type: 'uint24'},
                    ],
                    internalType: 'struct Pool',
                    name: 'pool',
                    type: 'tuple',
                  },
                  {internalType: 'int24', name: 'tickLower', type: 'int24'},
                  {internalType: 'int24', name: 'tickUpper', type: 'int24'},
                  {internalType: 'uint256', name: 'amount0Desired', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount1Desired', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct NftAddLiquidity',
                name: 'addLiquidityParams',
                type: 'tuple',
              },
            ],
            internalType: 'struct NftZapIn',
            name: 'zap',
            type: 'tuple',
          },
        ],
        internalType: 'struct NftCompound',
        name: 'params',
        type: 'tuple',
      },
      {internalType: 'bool', name: 'inPlace', type: 'bool'},
      {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
    ],
    name: 'compound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {
        components: [
          {
            components: [
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
              {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
              {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SimpleNftHarvest',
            name: 'harvest',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {internalType: 'address', name: 'tokenApproval', type: 'address'},
                  {internalType: 'address', name: 'router', type: 'address'},
                  {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                  {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                  {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                  {internalType: 'address', name: 'tokenIn', type: 'address'},
                  {internalType: 'address', name: 'tokenOut', type: 'address'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
              {
                components: [
                  {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                  {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                  {
                    components: [
                      {internalType: 'address', name: 'token0', type: 'address'},
                      {internalType: 'address', name: 'token1', type: 'address'},
                      {internalType: 'uint24', name: 'fee', type: 'uint24'},
                    ],
                    internalType: 'struct Pool',
                    name: 'pool',
                    type: 'tuple',
                  },
                  {internalType: 'int24', name: 'tickLower', type: 'int24'},
                  {internalType: 'int24', name: 'tickUpper', type: 'int24'},
                  {internalType: 'uint256', name: 'amount0Desired', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount1Desired', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct NftAddLiquidity',
                name: 'addLiquidityParams',
                type: 'tuple',
              },
            ],
            internalType: 'struct NftZapIn',
            name: 'zap',
            type: 'tuple',
          },
        ],
        internalType: 'struct NftCompound',
        name: 'params',
        type: 'tuple',
      },
      {internalType: 'bool', name: 'inPlace', type: 'bool'},
      {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
    ],
    name: 'compoundFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'connectorRegistry',
    outputs: [{internalType: 'contract ConnectorRegistry', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
              {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
              {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SimpleNftHarvest',
            name: 'harvest',
            type: 'tuple',
          },
          {
            components: [
              {internalType: 'address', name: 'tokenApproval', type: 'address'},
              {internalType: 'address', name: 'router', type: 'address'},
              {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
              {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
              {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
              {internalType: 'address', name: 'tokenIn', type: 'address'},
              {internalType: 'address', name: 'tokenOut', type: 'address'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SwapParams[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          {internalType: 'address[]', name: 'outputTokens', type: 'address[]'},
          {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
        ],
        internalType: 'struct NftHarvest',
        name: 'harvestParams',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                  {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                  {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
                  {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                  {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
                  {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct NftRemoveLiquidity',
                name: 'removeLiquidityParams',
                type: 'tuple',
              },
              {
                components: [
                  {internalType: 'address', name: 'tokenApproval', type: 'address'},
                  {internalType: 'address', name: 'router', type: 'address'},
                  {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                  {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                  {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                  {internalType: 'address', name: 'tokenIn', type: 'address'},
                  {internalType: 'address', name: 'tokenOut', type: 'address'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct NftZapOut',
            name: 'zap',
            type: 'tuple',
          },
          {internalType: 'address[]', name: 'tokensOut', type: 'address[]'},
          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
        ],
        internalType: 'struct NftWithdraw',
        name: 'withdrawParams',
        type: 'tuple',
      },
      {internalType: 'bool', name: 'inPlace', type: 'bool'},
      {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
    ],
    name: 'decrease',
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
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {
            components: [
              {internalType: 'address[]', name: 'tokensIn', type: 'address[]'},
              {internalType: 'uint256[]', name: 'amountsIn', type: 'uint256[]'},
              {
                components: [
                  {
                    components: [
                      {internalType: 'address', name: 'tokenApproval', type: 'address'},
                      {internalType: 'address', name: 'router', type: 'address'},
                      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                      {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                      {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                      {internalType: 'address', name: 'tokenIn', type: 'address'},
                      {internalType: 'address', name: 'tokenOut', type: 'address'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct SwapParams[]',
                    name: 'swaps',
                    type: 'tuple[]',
                  },
                  {
                    components: [
                      {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                      {
                        components: [
                          {internalType: 'address', name: 'token0', type: 'address'},
                          {internalType: 'address', name: 'token1', type: 'address'},
                          {internalType: 'uint24', name: 'fee', type: 'uint24'},
                        ],
                        internalType: 'struct Pool',
                        name: 'pool',
                        type: 'tuple',
                      },
                      {internalType: 'int24', name: 'tickLower', type: 'int24'},
                      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
                      {internalType: 'uint256', name: 'amount0Desired', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount1Desired', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct NftAddLiquidity',
                    name: 'addLiquidityParams',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct NftZapIn',
                name: 'zap',
                type: 'tuple',
              },
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct NftIncrease',
            name: 'increase',
            type: 'tuple',
          },
        ],
        internalType: 'struct NftDeposit',
        name: 'params',
        type: 'tuple',
      },
      {
        components: [
          {internalType: 'contract IUniswapV3Pool', name: 'pool', type: 'address'},
          {internalType: 'bytes32', name: 'poolId', type: 'bytes32'},
          {internalType: 'bool', name: 'autoRebalance', type: 'bool'},
          {
            components: [
              {internalType: 'uint24', name: 'tickSpacesBelow', type: 'uint24'},
              {internalType: 'uint24', name: 'tickSpacesAbove', type: 'uint24'},
              {internalType: 'int24', name: 'bufferTicksBelow', type: 'int24'},
              {internalType: 'int24', name: 'bufferTicksAbove', type: 'int24'},
              {internalType: 'uint256', name: 'dustBP', type: 'uint256'},
              {internalType: 'uint256', name: 'priceImpactBP', type: 'uint256'},
              {internalType: 'uint256', name: 'slippageBP', type: 'uint256'},
              {internalType: 'int24', name: 'cutoffTickLow', type: 'int24'},
              {internalType: 'int24', name: 'cutoffTickHigh', type: 'int24'},
              {internalType: 'uint8', name: 'delayMin', type: 'uint8'},
              {
                components: [
                  {internalType: 'enum RewardBehavior', name: 'rewardBehavior', type: 'uint8'},
                  {internalType: 'address', name: 'harvestTokenOut', type: 'address'},
                ],
                internalType: 'struct RewardConfig',
                name: 'rewardConfig',
                type: 'tuple',
              },
            ],
            internalType: 'struct RebalanceConfig',
            name: 'rebalanceConfig',
            type: 'tuple',
          },
          {internalType: 'bool', name: 'automateRewards', type: 'bool'},
          {
            components: [
              {internalType: 'enum RewardBehavior', name: 'rewardBehavior', type: 'uint8'},
              {internalType: 'address', name: 'harvestTokenOut', type: 'address'},
            ],
            internalType: 'struct RewardConfig',
            name: 'rewardConfig',
            type: 'tuple',
          },
          {internalType: 'bool', name: 'autoExit', type: 'bool'},
          {
            components: [
              {internalType: 'int24', name: 'triggerTickLow', type: 'int24'},
              {internalType: 'int24', name: 'triggerTickHigh', type: 'int24'},
              {internalType: 'address', name: 'exitTokenOutLow', type: 'address'},
              {internalType: 'address', name: 'exitTokenOutHigh', type: 'address'},
              {internalType: 'uint256', name: 'priceImpactBP', type: 'uint256'},
              {internalType: 'uint256', name: 'slippageBP', type: 'uint256'},
            ],
            internalType: 'struct ExitConfig',
            name: 'exitConfig',
            type: 'tuple',
          },
          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
        ],
        internalType: 'struct NftSettings',
        name: 'settings',
        type: 'tuple',
      },
      {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
      {internalType: 'address', name: 'approved', type: 'address'},
      {internalType: 'bytes32', name: 'referralCode', type: 'bytes32'},
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
            components: [
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
              {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
              {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SimpleNftHarvest',
            name: 'harvest',
            type: 'tuple',
          },
          {
            components: [
              {internalType: 'address', name: 'tokenApproval', type: 'address'},
              {internalType: 'address', name: 'router', type: 'address'},
              {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
              {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
              {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
              {internalType: 'address', name: 'tokenIn', type: 'address'},
              {internalType: 'address', name: 'tokenOut', type: 'address'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SwapParams[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          {internalType: 'address[]', name: 'outputTokens', type: 'address[]'},
          {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
        ],
        internalType: 'struct NftHarvest',
        name: 'harvestParams',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                  {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                  {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
                  {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                  {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
                  {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct NftRemoveLiquidity',
                name: 'removeLiquidityParams',
                type: 'tuple',
              },
              {
                components: [
                  {internalType: 'address', name: 'tokenApproval', type: 'address'},
                  {internalType: 'address', name: 'router', type: 'address'},
                  {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                  {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                  {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                  {internalType: 'address', name: 'tokenIn', type: 'address'},
                  {internalType: 'address', name: 'tokenOut', type: 'address'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct NftZapOut',
            name: 'zap',
            type: 'tuple',
          },
          {internalType: 'address[]', name: 'tokensOut', type: 'address[]'},
          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
        ],
        internalType: 'struct NftWithdraw',
        name: 'withdrawParams',
        type: 'tuple',
      },
      {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
    ],
    name: 'exit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {
        components: [
          {
            components: [
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
              {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
              {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SimpleNftHarvest',
            name: 'harvest',
            type: 'tuple',
          },
          {
            components: [
              {internalType: 'address', name: 'tokenApproval', type: 'address'},
              {internalType: 'address', name: 'router', type: 'address'},
              {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
              {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
              {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
              {internalType: 'address', name: 'tokenIn', type: 'address'},
              {internalType: 'address', name: 'tokenOut', type: 'address'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SwapParams[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          {internalType: 'address[]', name: 'outputTokens', type: 'address[]'},
          {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
        ],
        internalType: 'struct NftHarvest',
        name: 'harvestParams',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                  {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                  {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
                  {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                  {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
                  {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct NftRemoveLiquidity',
                name: 'removeLiquidityParams',
                type: 'tuple',
              },
              {
                components: [
                  {internalType: 'address', name: 'tokenApproval', type: 'address'},
                  {internalType: 'address', name: 'router', type: 'address'},
                  {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                  {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                  {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                  {internalType: 'address', name: 'tokenIn', type: 'address'},
                  {internalType: 'address', name: 'tokenOut', type: 'address'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct NftZapOut',
            name: 'zap',
            type: 'tuple',
          },
          {internalType: 'address[]', name: 'tokensOut', type: 'address[]'},
          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
        ],
        internalType: 'struct NftWithdraw',
        name: 'withdrawParams',
        type: 'tuple',
      },
      {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
    ],
    name: 'exitFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [{internalType: 'contract SickleFactory', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feesLib',
    outputs: [{internalType: 'contract IFeesLib', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'address', name: 'approved', type: 'address'},
      {internalType: 'bytes32', name: 'referralCode', type: 'bytes32'},
    ],
    name: 'getOrDeploySickle',
    outputs: [{internalType: 'contract Sickle', name: '', type: 'address'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'owner', type: 'address'}],
    name: 'getSickle',
    outputs: [{internalType: 'contract Sickle', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
              {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
              {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SimpleNftHarvest',
            name: 'harvest',
            type: 'tuple',
          },
          {
            components: [
              {internalType: 'address', name: 'tokenApproval', type: 'address'},
              {internalType: 'address', name: 'router', type: 'address'},
              {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
              {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
              {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
              {internalType: 'address', name: 'tokenIn', type: 'address'},
              {internalType: 'address', name: 'tokenOut', type: 'address'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SwapParams[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          {internalType: 'address[]', name: 'outputTokens', type: 'address[]'},
          {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
        ],
        internalType: 'struct NftHarvest',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'harvest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {
        components: [
          {
            components: [
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
              {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
              {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SimpleNftHarvest',
            name: 'harvest',
            type: 'tuple',
          },
          {
            components: [
              {internalType: 'address', name: 'tokenApproval', type: 'address'},
              {internalType: 'address', name: 'router', type: 'address'},
              {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
              {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
              {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
              {internalType: 'address', name: 'tokenIn', type: 'address'},
              {internalType: 'address', name: 'tokenOut', type: 'address'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SwapParams[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          {internalType: 'address[]', name: 'outputTokens', type: 'address[]'},
          {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
        ],
        internalType: 'struct NftHarvest',
        name: 'params',
        type: 'tuple',
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
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
              {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
              {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SimpleNftHarvest',
            name: 'harvest',
            type: 'tuple',
          },
          {
            components: [
              {internalType: 'address', name: 'tokenApproval', type: 'address'},
              {internalType: 'address', name: 'router', type: 'address'},
              {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
              {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
              {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
              {internalType: 'address', name: 'tokenIn', type: 'address'},
              {internalType: 'address', name: 'tokenOut', type: 'address'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct SwapParams[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          {internalType: 'address[]', name: 'outputTokens', type: 'address[]'},
          {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
        ],
        internalType: 'struct NftHarvest',
        name: 'harvestParams',
        type: 'tuple',
      },
      {
        components: [
          {internalType: 'address[]', name: 'tokensIn', type: 'address[]'},
          {internalType: 'uint256[]', name: 'amountsIn', type: 'uint256[]'},
          {
            components: [
              {
                components: [
                  {internalType: 'address', name: 'tokenApproval', type: 'address'},
                  {internalType: 'address', name: 'router', type: 'address'},
                  {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                  {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                  {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                  {internalType: 'address', name: 'tokenIn', type: 'address'},
                  {internalType: 'address', name: 'tokenOut', type: 'address'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
              {
                components: [
                  {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                  {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                  {
                    components: [
                      {internalType: 'address', name: 'token0', type: 'address'},
                      {internalType: 'address', name: 'token1', type: 'address'},
                      {internalType: 'uint24', name: 'fee', type: 'uint24'},
                    ],
                    internalType: 'struct Pool',
                    name: 'pool',
                    type: 'tuple',
                  },
                  {internalType: 'int24', name: 'tickLower', type: 'int24'},
                  {internalType: 'int24', name: 'tickUpper', type: 'int24'},
                  {internalType: 'uint256', name: 'amount0Desired', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount1Desired', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct NftAddLiquidity',
                name: 'addLiquidityParams',
                type: 'tuple',
              },
            ],
            internalType: 'struct NftZapIn',
            name: 'zap',
            type: 'tuple',
          },
          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
        ],
        internalType: 'struct NftIncrease',
        name: 'increaseParams',
        type: 'tuple',
      },
      {internalType: 'bool', name: 'inPlace', type: 'bool'},
      {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
    ],
    name: 'increase',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {internalType: 'contract IUniswapV3Pool', name: 'pool', type: 'address'},
          {
            components: [
              {
                components: [
                  {internalType: 'address', name: 'stakingContract', type: 'address'},
                  {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
                ],
                internalType: 'struct Farm',
                name: 'farm',
                type: 'tuple',
              },
              {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
              {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
            ],
            internalType: 'struct NftPosition',
            name: 'position',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
                  {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
                  {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SimpleNftHarvest',
                name: 'harvest',
                type: 'tuple',
              },
              {
                components: [
                  {internalType: 'address', name: 'tokenApproval', type: 'address'},
                  {internalType: 'address', name: 'router', type: 'address'},
                  {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                  {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                  {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                  {internalType: 'address', name: 'tokenIn', type: 'address'},
                  {internalType: 'address', name: 'tokenOut', type: 'address'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
              {internalType: 'address[]', name: 'outputTokens', type: 'address[]'},
              {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
            ],
            internalType: 'struct NftHarvest',
            name: 'harvest',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    components: [
                      {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                      {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
                      {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                      {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
                      {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct NftRemoveLiquidity',
                    name: 'removeLiquidityParams',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {internalType: 'address', name: 'tokenApproval', type: 'address'},
                      {internalType: 'address', name: 'router', type: 'address'},
                      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                      {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                      {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                      {internalType: 'address', name: 'tokenIn', type: 'address'},
                      {internalType: 'address', name: 'tokenOut', type: 'address'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct SwapParams[]',
                    name: 'swaps',
                    type: 'tuple[]',
                  },
                ],
                internalType: 'struct NftZapOut',
                name: 'zap',
                type: 'tuple',
              },
              {internalType: 'address[]', name: 'tokensOut', type: 'address[]'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct NftWithdraw',
            name: 'withdraw',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {internalType: 'address', name: 'stakingContract', type: 'address'},
                  {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
                ],
                internalType: 'struct Farm',
                name: 'farm',
                type: 'tuple',
              },
              {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
              {
                components: [
                  {internalType: 'address[]', name: 'tokensIn', type: 'address[]'},
                  {internalType: 'uint256[]', name: 'amountsIn', type: 'uint256[]'},
                  {
                    components: [
                      {
                        components: [
                          {internalType: 'address', name: 'tokenApproval', type: 'address'},
                          {internalType: 'address', name: 'router', type: 'address'},
                          {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                          {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                          {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                          {internalType: 'address', name: 'tokenIn', type: 'address'},
                          {internalType: 'address', name: 'tokenOut', type: 'address'},
                          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                        ],
                        internalType: 'struct SwapParams[]',
                        name: 'swaps',
                        type: 'tuple[]',
                      },
                      {
                        components: [
                          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                          {
                            components: [
                              {internalType: 'address', name: 'token0', type: 'address'},
                              {internalType: 'address', name: 'token1', type: 'address'},
                              {internalType: 'uint24', name: 'fee', type: 'uint24'},
                            ],
                            internalType: 'struct Pool',
                            name: 'pool',
                            type: 'tuple',
                          },
                          {internalType: 'int24', name: 'tickLower', type: 'int24'},
                          {internalType: 'int24', name: 'tickUpper', type: 'int24'},
                          {internalType: 'uint256', name: 'amount0Desired', type: 'uint256'},
                          {internalType: 'uint256', name: 'amount1Desired', type: 'uint256'},
                          {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                          {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                        ],
                        internalType: 'struct NftAddLiquidity',
                        name: 'addLiquidityParams',
                        type: 'tuple',
                      },
                    ],
                    internalType: 'struct NftZapIn',
                    name: 'zap',
                    type: 'tuple',
                  },
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct NftIncrease',
                name: 'increase',
                type: 'tuple',
              },
            ],
            internalType: 'struct NftDeposit',
            name: 'deposit',
            type: 'tuple',
          },
        ],
        internalType: 'struct NftMove',
        name: 'params',
        type: 'tuple',
      },
      {
        components: [
          {internalType: 'contract IUniswapV3Pool', name: 'pool', type: 'address'},
          {internalType: 'bytes32', name: 'poolId', type: 'bytes32'},
          {internalType: 'bool', name: 'autoRebalance', type: 'bool'},
          {
            components: [
              {internalType: 'uint24', name: 'tickSpacesBelow', type: 'uint24'},
              {internalType: 'uint24', name: 'tickSpacesAbove', type: 'uint24'},
              {internalType: 'int24', name: 'bufferTicksBelow', type: 'int24'},
              {internalType: 'int24', name: 'bufferTicksAbove', type: 'int24'},
              {internalType: 'uint256', name: 'dustBP', type: 'uint256'},
              {internalType: 'uint256', name: 'priceImpactBP', type: 'uint256'},
              {internalType: 'uint256', name: 'slippageBP', type: 'uint256'},
              {internalType: 'int24', name: 'cutoffTickLow', type: 'int24'},
              {internalType: 'int24', name: 'cutoffTickHigh', type: 'int24'},
              {internalType: 'uint8', name: 'delayMin', type: 'uint8'},
              {
                components: [
                  {internalType: 'enum RewardBehavior', name: 'rewardBehavior', type: 'uint8'},
                  {internalType: 'address', name: 'harvestTokenOut', type: 'address'},
                ],
                internalType: 'struct RewardConfig',
                name: 'rewardConfig',
                type: 'tuple',
              },
            ],
            internalType: 'struct RebalanceConfig',
            name: 'rebalanceConfig',
            type: 'tuple',
          },
          {internalType: 'bool', name: 'automateRewards', type: 'bool'},
          {
            components: [
              {internalType: 'enum RewardBehavior', name: 'rewardBehavior', type: 'uint8'},
              {internalType: 'address', name: 'harvestTokenOut', type: 'address'},
            ],
            internalType: 'struct RewardConfig',
            name: 'rewardConfig',
            type: 'tuple',
          },
          {internalType: 'bool', name: 'autoExit', type: 'bool'},
          {
            components: [
              {internalType: 'int24', name: 'triggerTickLow', type: 'int24'},
              {internalType: 'int24', name: 'triggerTickHigh', type: 'int24'},
              {internalType: 'address', name: 'exitTokenOutLow', type: 'address'},
              {internalType: 'address', name: 'exitTokenOutHigh', type: 'address'},
              {internalType: 'uint256', name: 'priceImpactBP', type: 'uint256'},
              {internalType: 'uint256', name: 'slippageBP', type: 'uint256'},
            ],
            internalType: 'struct ExitConfig',
            name: 'exitConfig',
            type: 'tuple',
          },
          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
        ],
        internalType: 'struct NftSettings',
        name: 'settings',
        type: 'tuple',
      },
      {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
    ],
    name: 'move',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nftSettingsLib',
    outputs: [{internalType: 'contract INftSettingsLib', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nftSettingsRegistry',
    outputs: [{internalType: 'contract INftSettingsRegistry', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nftTransferLib',
    outputs: [{internalType: 'contract INftTransferLib', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nftZapLib',
    outputs: [{internalType: 'contract INftZapLib', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {internalType: 'contract IUniswapV3Pool', name: 'pool', type: 'address'},
          {
            components: [
              {
                components: [
                  {internalType: 'address', name: 'stakingContract', type: 'address'},
                  {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
                ],
                internalType: 'struct Farm',
                name: 'farm',
                type: 'tuple',
              },
              {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
              {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
            ],
            internalType: 'struct NftPosition',
            name: 'position',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
                  {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
                  {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SimpleNftHarvest',
                name: 'harvest',
                type: 'tuple',
              },
              {
                components: [
                  {internalType: 'address', name: 'tokenApproval', type: 'address'},
                  {internalType: 'address', name: 'router', type: 'address'},
                  {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                  {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                  {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                  {internalType: 'address', name: 'tokenIn', type: 'address'},
                  {internalType: 'address', name: 'tokenOut', type: 'address'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
              {internalType: 'address[]', name: 'outputTokens', type: 'address[]'},
              {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
            ],
            internalType: 'struct NftHarvest',
            name: 'harvest',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    components: [
                      {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                      {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
                      {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                      {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
                      {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct NftRemoveLiquidity',
                    name: 'removeLiquidityParams',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {internalType: 'address', name: 'tokenApproval', type: 'address'},
                      {internalType: 'address', name: 'router', type: 'address'},
                      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                      {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                      {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                      {internalType: 'address', name: 'tokenIn', type: 'address'},
                      {internalType: 'address', name: 'tokenOut', type: 'address'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct SwapParams[]',
                    name: 'swaps',
                    type: 'tuple[]',
                  },
                ],
                internalType: 'struct NftZapOut',
                name: 'zap',
                type: 'tuple',
              },
              {internalType: 'address[]', name: 'tokensOut', type: 'address[]'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct NftWithdraw',
            name: 'withdraw',
            type: 'tuple',
          },
          {
            components: [
              {internalType: 'address[]', name: 'tokensIn', type: 'address[]'},
              {internalType: 'uint256[]', name: 'amountsIn', type: 'uint256[]'},
              {
                components: [
                  {
                    components: [
                      {internalType: 'address', name: 'tokenApproval', type: 'address'},
                      {internalType: 'address', name: 'router', type: 'address'},
                      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                      {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                      {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                      {internalType: 'address', name: 'tokenIn', type: 'address'},
                      {internalType: 'address', name: 'tokenOut', type: 'address'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct SwapParams[]',
                    name: 'swaps',
                    type: 'tuple[]',
                  },
                  {
                    components: [
                      {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                      {
                        components: [
                          {internalType: 'address', name: 'token0', type: 'address'},
                          {internalType: 'address', name: 'token1', type: 'address'},
                          {internalType: 'uint24', name: 'fee', type: 'uint24'},
                        ],
                        internalType: 'struct Pool',
                        name: 'pool',
                        type: 'tuple',
                      },
                      {internalType: 'int24', name: 'tickLower', type: 'int24'},
                      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
                      {internalType: 'uint256', name: 'amount0Desired', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount1Desired', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct NftAddLiquidity',
                    name: 'addLiquidityParams',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct NftZapIn',
                name: 'zap',
                type: 'tuple',
              },
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct NftIncrease',
            name: 'increase',
            type: 'tuple',
          },
        ],
        internalType: 'struct NftRebalance',
        name: 'params',
        type: 'tuple',
      },
      {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
    ],
    name: 'rebalance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'contract Sickle', name: 'sickle', type: 'address'},
      {
        components: [
          {internalType: 'contract IUniswapV3Pool', name: 'pool', type: 'address'},
          {
            components: [
              {
                components: [
                  {internalType: 'address', name: 'stakingContract', type: 'address'},
                  {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
                ],
                internalType: 'struct Farm',
                name: 'farm',
                type: 'tuple',
              },
              {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
              {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
            ],
            internalType: 'struct NftPosition',
            name: 'position',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
                  {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
                  {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SimpleNftHarvest',
                name: 'harvest',
                type: 'tuple',
              },
              {
                components: [
                  {internalType: 'address', name: 'tokenApproval', type: 'address'},
                  {internalType: 'address', name: 'router', type: 'address'},
                  {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                  {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                  {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                  {internalType: 'address', name: 'tokenIn', type: 'address'},
                  {internalType: 'address', name: 'tokenOut', type: 'address'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
              {internalType: 'address[]', name: 'outputTokens', type: 'address[]'},
              {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
            ],
            internalType: 'struct NftHarvest',
            name: 'harvest',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    components: [
                      {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                      {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
                      {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                      {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
                      {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct NftRemoveLiquidity',
                    name: 'removeLiquidityParams',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {internalType: 'address', name: 'tokenApproval', type: 'address'},
                      {internalType: 'address', name: 'router', type: 'address'},
                      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                      {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                      {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                      {internalType: 'address', name: 'tokenIn', type: 'address'},
                      {internalType: 'address', name: 'tokenOut', type: 'address'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct SwapParams[]',
                    name: 'swaps',
                    type: 'tuple[]',
                  },
                ],
                internalType: 'struct NftZapOut',
                name: 'zap',
                type: 'tuple',
              },
              {internalType: 'address[]', name: 'tokensOut', type: 'address[]'},
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct NftWithdraw',
            name: 'withdraw',
            type: 'tuple',
          },
          {
            components: [
              {internalType: 'address[]', name: 'tokensIn', type: 'address[]'},
              {internalType: 'uint256[]', name: 'amountsIn', type: 'uint256[]'},
              {
                components: [
                  {
                    components: [
                      {internalType: 'address', name: 'tokenApproval', type: 'address'},
                      {internalType: 'address', name: 'router', type: 'address'},
                      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                      {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                      {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                      {internalType: 'address', name: 'tokenIn', type: 'address'},
                      {internalType: 'address', name: 'tokenOut', type: 'address'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct SwapParams[]',
                    name: 'swaps',
                    type: 'tuple[]',
                  },
                  {
                    components: [
                      {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                      {
                        components: [
                          {internalType: 'address', name: 'token0', type: 'address'},
                          {internalType: 'address', name: 'token1', type: 'address'},
                          {internalType: 'uint24', name: 'fee', type: 'uint24'},
                        ],
                        internalType: 'struct Pool',
                        name: 'pool',
                        type: 'tuple',
                      },
                      {internalType: 'int24', name: 'tickLower', type: 'int24'},
                      {internalType: 'int24', name: 'tickUpper', type: 'int24'},
                      {internalType: 'uint256', name: 'amount0Desired', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount1Desired', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                      {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                    ],
                    internalType: 'struct NftAddLiquidity',
                    name: 'addLiquidityParams',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct NftZapIn',
                name: 'zap',
                type: 'tuple',
              },
              {internalType: 'bytes', name: 'extraData', type: 'bytes'},
            ],
            internalType: 'struct NftIncrease',
            name: 'increase',
            type: 'tuple',
          },
        ],
        internalType: 'struct NftRebalance',
        name: 'params',
        type: 'tuple',
      },
      {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
    ],
    name: 'rebalanceFor',
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
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
      {
        components: [
          {internalType: 'contract IUniswapV3Pool', name: 'pool', type: 'address'},
          {internalType: 'bytes32', name: 'poolId', type: 'bytes32'},
          {internalType: 'bool', name: 'autoRebalance', type: 'bool'},
          {
            components: [
              {internalType: 'uint24', name: 'tickSpacesBelow', type: 'uint24'},
              {internalType: 'uint24', name: 'tickSpacesAbove', type: 'uint24'},
              {internalType: 'int24', name: 'bufferTicksBelow', type: 'int24'},
              {internalType: 'int24', name: 'bufferTicksAbove', type: 'int24'},
              {internalType: 'uint256', name: 'dustBP', type: 'uint256'},
              {internalType: 'uint256', name: 'priceImpactBP', type: 'uint256'},
              {internalType: 'uint256', name: 'slippageBP', type: 'uint256'},
              {internalType: 'int24', name: 'cutoffTickLow', type: 'int24'},
              {internalType: 'int24', name: 'cutoffTickHigh', type: 'int24'},
              {internalType: 'uint8', name: 'delayMin', type: 'uint8'},
              {
                components: [
                  {internalType: 'enum RewardBehavior', name: 'rewardBehavior', type: 'uint8'},
                  {internalType: 'address', name: 'harvestTokenOut', type: 'address'},
                ],
                internalType: 'struct RewardConfig',
                name: 'rewardConfig',
                type: 'tuple',
              },
            ],
            internalType: 'struct RebalanceConfig',
            name: 'rebalanceConfig',
            type: 'tuple',
          },
          {internalType: 'bool', name: 'automateRewards', type: 'bool'},
          {
            components: [
              {internalType: 'enum RewardBehavior', name: 'rewardBehavior', type: 'uint8'},
              {internalType: 'address', name: 'harvestTokenOut', type: 'address'},
            ],
            internalType: 'struct RewardConfig',
            name: 'rewardConfig',
            type: 'tuple',
          },
          {internalType: 'bool', name: 'autoExit', type: 'bool'},
          {
            components: [
              {internalType: 'int24', name: 'triggerTickLow', type: 'int24'},
              {internalType: 'int24', name: 'triggerTickHigh', type: 'int24'},
              {internalType: 'address', name: 'exitTokenOutLow', type: 'address'},
              {internalType: 'address', name: 'exitTokenOutHigh', type: 'address'},
              {internalType: 'uint256', name: 'priceImpactBP', type: 'uint256'},
              {internalType: 'uint256', name: 'slippageBP', type: 'uint256'},
            ],
            internalType: 'struct ExitConfig',
            name: 'exitConfig',
            type: 'tuple',
          },
          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
        ],
        internalType: 'struct NftSettings',
        name: 'settings',
        type: 'tuple',
      },
      {internalType: 'address', name: 'approved', type: 'address'},
      {internalType: 'bytes32', name: 'referralCode', type: 'bytes32'},
    ],
    name: 'simpleDeposit',
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
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {
        components: [
          {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
          {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
          {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
        ],
        internalType: 'struct SimpleNftHarvest',
        name: 'harvestParams',
        type: 'tuple',
      },
      {internalType: 'bytes', name: 'withdrawExtraData', type: 'bytes'},
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
            components: [
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {
        components: [
          {internalType: 'address[]', name: 'rewardTokens', type: 'address[]'},
          {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
          {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
        ],
        internalType: 'struct SimpleNftHarvest',
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
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {internalType: 'bytes', name: 'extraData', type: 'bytes'},
    ],
    name: 'simpleWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'strategyAddress',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'swapLib',
    outputs: [{internalType: 'contract ISwapLib', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'transferLib',
    outputs: [{internalType: 'contract ITransferLib', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {internalType: 'address', name: 'stakingContract', type: 'address'},
              {internalType: 'uint256', name: 'poolIndex', type: 'uint256'},
            ],
            internalType: 'struct Farm',
            name: 'farm',
            type: 'tuple',
          },
          {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
          {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
        ],
        internalType: 'struct NftPosition',
        name: 'position',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {internalType: 'contract INonfungiblePositionManager', name: 'nft', type: 'address'},
                  {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
                  {internalType: 'uint128', name: 'liquidity', type: 'uint128'},
                  {internalType: 'uint256', name: 'amount0Min', type: 'uint256'},
                  {internalType: 'uint256', name: 'amount1Min', type: 'uint256'},
                  {internalType: 'uint128', name: 'amount0Max', type: 'uint128'},
                  {internalType: 'uint128', name: 'amount1Max', type: 'uint128'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct NftRemoveLiquidity',
                name: 'removeLiquidityParams',
                type: 'tuple',
              },
              {
                components: [
                  {internalType: 'address', name: 'tokenApproval', type: 'address'},
                  {internalType: 'address', name: 'router', type: 'address'},
                  {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
                  {internalType: 'uint256', name: 'desiredAmountOut', type: 'uint256'},
                  {internalType: 'uint256', name: 'minAmountOut', type: 'uint256'},
                  {internalType: 'address', name: 'tokenIn', type: 'address'},
                  {internalType: 'address', name: 'tokenOut', type: 'address'},
                  {internalType: 'bytes', name: 'extraData', type: 'bytes'},
                ],
                internalType: 'struct SwapParams[]',
                name: 'swaps',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct NftZapOut',
            name: 'zap',
            type: 'tuple',
          },
          {internalType: 'address[]', name: 'tokensOut', type: 'address[]'},
          {internalType: 'bytes', name: 'extraData', type: 'bytes'},
        ],
        internalType: 'struct NftWithdraw',
        name: 'params',
        type: 'tuple',
      },
      {internalType: 'address[]', name: 'sweepTokens', type: 'address[]'},
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
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

const REWARD_TOKEN_ADDRESS = '0x7f9adfbd38b669f03d1d11000bc76b9aaea28a81'
const NFT_POSITION_MANAGER_ADDRESS = '0x991d5546C4B442B4c5fdc4c8B8b8d131DEB24702'
const NFT_FARM_STRATEGY_ADDRESS = '0x7671CbA63CF2B2766aB12d42b93fBE166a692171'
const FARM_STRATEGY_ADDRESS = '0x52897097F0318B88c60BF82601EA620654cd7AD7'

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print(`Connected to RPC: ${App.rpcProvider.connection.url}\n`)
  _print('Reading smart contracts...\n')
  _print('This may take few minutes, please be patient...\n')

  const tokens = {}
  const prices = await getFraxtalPrices()

  const SICKLE_FACTORY_ADDR = '0x53d9780DbD3831E3A797Fd215be4131636cD5FDf'
  const SICKLE_FACTORY = new ethcall.Contract(SICKLE_FACTORY_ADDR, SICKLE_FACTORY_ABI)

  const [sickle_account_address] = await App.ethcallProvider.all([SICKLE_FACTORY.sickles(App.YOUR_ADDRESS)])
  const has_sickle_account = sickle_account_address === '0x0000000000000000000000000000000000000000' ? false : true
  const owner_sickle_address = App.YOUR_ADDRESS

  if (has_sickle_account) {
    App.YOUR_ADDRESS = sickle_account_address
  }

  const VELO_VOTER_ADDRESS = '0x97cDBCe21B6fd0585d29E539B1B99dAd328a1123'
  const VELO_VOTER = new ethcall.Contract(VELO_VOTER_ADDRESS, VELO_VOTER_ABI)

  const length = 18

  const pool_calls = [...Array(length).keys()].map(i => VELO_VOTER.pools(i))
  const pools = await App.ethcallProvider.all(pool_calls)

  const VELO_FACTORY_ADDRESS_V3 = '0x04625B046C69577EfC40e6c0Bb83CDBAfab5a55F'
  const VELO_FACTORY_V3 = new ethcall.Contract(VELO_FACTORY_ADDRESS_V3, VELO_FACTORY_V3_ABI)

  const VELO_FACTORY_ADDRESS_V2 = '0x31832f2a97Fd20664D76Cc421207669b55CE4BC0'
  const VELO_FACTORY_V2 = new ethcall.Contract(VELO_FACTORY_ADDRESS_V2, VELO_FACTORY_V2_ABI)

  const is_v3_pool_calls = pools.map(p => VELO_FACTORY_V3.isPair(p))
  const is_v3_pools = await App.ethcallProvider.all(is_v3_pool_calls)

  let pools_v3 = [],
    users_v3_gauges = []

  for (let i = 0; i < pools.length; i++) {
    if (is_v3_pools[i] == true) {
      pools_v3.push(pools[i])
    }
  }

  const gauge_v3_calls = pools_v3.map(pv3 => VELO_VOTER.gauges(pv3))
  const gauges_v3 = await App.ethcallProvider.all(gauge_v3_calls)

  const gauges_contracts = gauges_v3.map(g => new ethcall.Contract(g, GAUGE_V3_ABI))
  const users_values_calls = gauges_contracts.map(c => c.stakedLength(sickle_account_address))
  const users_values = await App.ethcallProvider.all(users_values_calls)

  for (let i = 0; i < gauges_v3.length; i++) {
    if (users_values[i] > 0) {
      users_v3_gauges.push(gauges_v3[i])
    }
  }

  const gauges = users_v3_gauges.map(a => {
    return {
      address: a,
      abi: GAUGE_V3_ABI,
      stakeTokenFunction: 'pool',
    }
  })

  const is_v2_pool_calls = pools.map(p => VELO_FACTORY_V2.isPool(p))
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

  const gauges_v2_contracts = gauges_v2.map(g => new ethcall.Contract(g, GAUGE_V2_ABI))
  const users_v2_values_calls = gauges_v2_contracts.map(c => c.balanceOf(sickle_account_address))
  const users_v2_values = await App.ethcallProvider.all(users_v2_values_calls)

  for (let i = 0; i < gauges_v2.length; i++) {
    if (users_v2_values[i] > 0) {
      users_v2_gauges.push(gauges_v2[i])
    }
  }

  const gaugesV2 = users_v2_gauges.map(a => {
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
    App.YOUR_ADDRESS = sickle_account_address

    await loadVelodroneSynthetixPools(App, tokens, prices, gauges, has_sickle_account, owner_sickle_address)
    _print('')
    await loadVelodroneV2SynthetixPools(App, tokens, prices, gaugesV2, has_sickle_account, sickle_account_address)

    hideLoading()
  } else {
    await loadVelodroneSynthetixPools(App, tokens, prices, gauges, has_sickle_account)
    _print('')
    await loadVelodroneV2SynthetixPools(App, tokens, prices, gaugesV2, has_sickle_account, sickle_account_address)

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
    await printVelodromeV2Pool(App, i, 'fraxtal', customURLs)
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

  const rewardTokenAddress = '0x7f9adfbd38b669f03d1d11000bc76b9aaea28a81'

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

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, 'fraxtal')

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
    return fraxtalContract_claim(info.stakingAddress, App)
  }
  const sickle_fraxtal_unstake = async function() {
    return sickle_fraxtalContract_unstake(info.stakingAddress, info.stakeTokenAddress, info._userStaked, App)
  }
  const sickle_fraxtal_claim = async function() {
    return sickle_fraxtalContract_claim(info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://fraxscan.com/address/${info.stakingAddress}#code">Fraxtal Scan</a>`)
  if (info.has_sickle_account) {
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, sickle_fraxtal_unstake)
  } else {
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  }
  if (info.has_sickle_account) {
    _print_link(
      `Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(
        info.earned * info.rewardTokenPrice
      )})`,
      sickle_fraxtal_claim
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

const sickle_fraxtalContract_unstake = async function(rewardPoolAddr, lpToken, userStaked, App) {
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

const sickle_fraxtalContract_claim = async function(rewardPoolAddr, App) {
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

async function loadVelodroneSynthetixPools(
  App,
  tokens,
  prices,
  pools,
  has_sickle_account,
  owner_sickle_address,
  customURLs
) {
  const infos = await Promise.all(
    pools.map(p =>
      loadVelodromeSynthetixPoolInfo(
        App,
        tokens,
        prices,
        p.abi,
        p.address,
        p.stakeTokenFunction,
        has_sickle_account,
        owner_sickle_address
      )
    )
  )
  for (const i of infos) {
    await printVelodromePool(App, i, 'fraxtal', customURLs)
  }
}

async function loadVelodromeSynthetixPoolInfo(
  App,
  tokens,
  prices,
  stakingAbi,
  stakingAddress,
  stakeTokenFunction,
  has_sickle_account,
  owner_sickle_address
) {
  const STAKING_POOL = new ethcall.Contract(stakingAddress, stakingAbi)

  let stakeTokenAddress, periodFinish, rewardRate, userStakedNfts
  try {
    ;[stakeTokenAddress, periodFinish, rewardRate, userStakedNfts] = await App.ethcallProvider.all([
      STAKING_POOL.pool(),
      STAKING_POOL.periodFinish(),
      STAKING_POOL.rewardRate(),
      STAKING_POOL.stakedValues(App.YOUR_ADDRESS),
    ])
  } catch {
    return {
      stakingAddress: '',
      stakeTokenAddress: '',
      rewardTokenAddress: '',
      stakeTokenTicker: '',
      rewardTokenTicker: '',
      rewardTokenPrice: 0,
      weeklyRewards: 0,
      usdPerWeek: 0,
      userStaked: 0,
      earnings: 0,
      has_sickle_account: false,
    }
  }

  const clPool = new ethcall.Contract(stakeTokenAddress, CL_TOKEN_ABI)
  const nftContract = new ethcall.Contract(NFT_POSITION_MANAGER_ADDRESS, NFT_POSITION_MANAGER_ABI)

  const [tokenAddress0, tokenAddress1] = await App.ethcallProvider.all([clPool.token0(), clPool.token1()])

  const token0 = new ethcall.Contract(tokenAddress0, ERC20_ABI)
  const token1 = new ethcall.Contract(tokenAddress1, ERC20_ABI)

  const stakeToken = await getClToken(App, token0, token1, stakingAddress)

  const rewardTokenAddress = '0x7f9adfbd38b669f03d1d11000bc76b9aaea28a81'

  const rewardToken = await getGeneralToken(App, rewardTokenAddress, stakingAddress)

  const stakeTokenTicker = stakeToken.symbol0 + '-' + stakeToken.symbol1
  const rewardTokenTicker = rewardToken.symbol

  const rewardTokenPrice = prices[rewardTokenAddress]?.usd

  const weeklyRewards = Date.now() / 1000 > periodFinish ? 0 : (rewardRate / 1e18) * 604800

  const usdPerWeek = weeklyRewards * rewardTokenPrice

  const userStaked = userStakedNfts.length

  let earnings = []

  for (const userNft of userStakedNfts) {
    const [_earned] = await App.ethcallProvider.all([STAKING_POOL.earned(App.YOUR_ADDRESS, userNft)])
    const earned = _earned / 10 ** rewardToken.decimals
    earnings.push(earned)
  }

  return {
    stakingAddress,
    stakeTokenAddress,
    rewardTokenAddress,
    stakeTokenTicker,
    rewardTokenTicker,
    rewardTokenPrice,
    weeklyRewards,
    usdPerWeek,
    userStaked,
    earnings,
    userStakedNfts,
    has_sickle_account,
  }
}

async function printVelodromePool(App, info, chain = 'eth', customURLs) {
  _print(`Pool - ${info.stakeTokenTicker}`)
  _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`)
  _print(`You are staking ${info.userStaked} ${info.stakeTokenTicker}`)
  for (userStakedNft of info.userStakedNfts) {
    _print(`Nft ID: ${userStakedNft}`)
  }
  const unstake = async function(nftId) {
    return clContract_withdraw(info.stakingAddress, nftId, App)
  }
  const claim = async function(nftId) {
    return clContract_claim(info.stakingAddress, nftId, App)
  }
  const sickle_unstake = async function(nftId) {
    return sickle_clContract_withdraw(info.stakingAddress, nftId, App)
  }
  const sickle_claim = async function(nftId) {
    return sickle_clContract_claim(info.stakingAddress, nftId, App)
  }
  _print(`<a target="_blank" href="https://fraxscan.com/address/${info.stakingAddress}#code">Fraxtal Scan</a>`)
  for (const userStakedNft of info.userStakedNfts) {
    if (info.has_sickle_account) {
      _print_link(`Withdraw NFT ID: ${userStakedNft}`, () => sickle_unstake(userStakedNft))
    } else {
      _print_link(`Withdraw NFT ID: ${userStakedNft}`, () => unstake(userStakedNft))
    }
  }
  for (let i = 0; i < info.userStakedNfts.length; i++) {
    if (info.has_sickle_account) {
      _print_link(
        `Claim rewards, NFT ID: ${info.userStakedNfts[i]} ${info.earnings[i].toFixed(6)} ($${formatMoney(
          info.earnings[i] * info.rewardTokenPrice
        )})`,
        () => sickle_claim(info.userStakedNfts[i])
      )
    } else {
      _print_link(
        `Claim rewards, NFT ID: ${info.userStakedNfts[i]} ${info.earnings[i].toFixed(6)} ($${formatMoney(
          info.earnings[i] * info.rewardTokenPrice
        )})`,
        () => claim(info.userStakedNfts[i])
      )
    }
  }
  _print('')
}

const sickle_clContract_withdraw = async function(rewardPoolAddr, nftId, App) {
  const signer = App.provider.getSigner()

  const farm = {
    stakingContract: rewardPoolAddr,
    poolIndex: 0,
  }

  const position = {
    farm: farm,
    nft: NFT_POSITION_MANAGER_ADDRESS,
    tokenId: nftId,
  }

  const extraData = '0x00'

  const REWARD_POOL = new ethers.Contract(NFT_FARM_STRATEGY_ADDRESS, NFT_FARM_STRATEGY_ABI, signer)

  showLoading()
  REWARD_POOL.simpleWithdraw(position, extraData)
    .then(function(t) {
      console.log(t)
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function(t) {
      console.log(t)
      hideLoading()
    })
}

const sickle_clContract_claim = async function(rewardPoolAddr, nftId, App) {
  const signer = App.provider.getSigner()

  const farm = {
    stakingContract: rewardPoolAddr,
    poolIndex: 0,
  }

  const position = {
    farm: farm,
    nft: NFT_POSITION_MANAGER_ADDRESS,
    tokenId: nftId,
  }

  const params = {
    rewardTokens: [REWARD_TOKEN_ADDRESS],
    amount0Max: 0,
    amount1Max: 0,
    extraData: '0x00',
  }

  const REWARD_POOL = new ethers.Contract(NFT_FARM_STRATEGY_ADDRESS, NFT_FARM_STRATEGY_ABI, signer)

  showLoading()
  REWARD_POOL.simpleHarvest(position, params)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function(t) {
      console.log(t)
      hideLoading()
    })
}

async function getClToken(App, contract0, contract1, address) {
  const [name0, symbol0] = await App.ethcallProvider.all([contract0.name(), contract0.symbol()])
  const [name1, symbol1] = await App.ethcallProvider.all([contract1.name(), contract1.symbol()])
  return {
    address,
    name0,
    name1,
    symbol0,
    symbol1,
  }
}
