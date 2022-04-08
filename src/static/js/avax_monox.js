$(function() {
  consoleInit(main)
})

const VUNIT_STAKE_ABI = [
  {
    inputs: [
      {internalType: 'address', name: '_OHM', type: 'address'},
      {internalType: 'address', name: '_sOHM', type: 'address'},
      {internalType: 'uint256', name: '_epochLength', type: 'uint256'},
      {
        internalType: 'uint256',
        name: '_firstEpochNumber',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_firstEpochBlock',
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
    name: 'OwnershipPulled',
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
    name: 'OwnershipPushed',
    type: 'event',
  },
  {
    inputs: [],
    name: 'OHM',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_recipient', type: 'address'}],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractBalance',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'distributor',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'epoch',
    outputs: [
      {internalType: 'uint256', name: 'length', type: 'uint256'},
      {internalType: 'uint256', name: 'number', type: 'uint256'},
      {internalType: 'uint256', name: 'endBlock', type: 'uint256'},
      {internalType: 'uint256', name: 'distribute', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forfeit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
    name: 'giveLockBonus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'index',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'locker',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pullManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'newOwner_', type: 'address'}],
    name: 'pushManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rebase',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
    name: 'returnLockBonus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sOHM',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum OlympusStaking.CONTRACTS',
        name: '_contract',
        type: 'uint8',
      },
      {internalType: 'address', name: '_address', type: 'address'},
    ],
    name: 'setContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_warmupPeriod', type: 'uint256'}],
    name: 'setWarmup',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
      {internalType: 'address', name: '_recipient', type: 'address'},
    ],
    name: 'stake',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'toggleDepositLock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalBonus',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
      {internalType: 'bool', name: '_trigger', type: 'bool'},
    ],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'warmupContract',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'warmupInfo',
    outputs: [
      {internalType: 'uint256', name: 'deposit', type: 'uint256'},
      {internalType: 'uint256', name: 'gons', type: 'uint256'},
      {internalType: 'uint256', name: 'expiry', type: 'uint256'},
      {internalType: 'bool', name: 'lock', type: 'bool'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'warmupPeriod',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
]

const sVUNIT_ABI = [
  {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epoch',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rebase',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'LogRebase',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'stakingContract',
        type: 'address',
      },
    ],
    name: 'LogStakingContractUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epoch',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalSupply',
        type: 'uint256',
      },
    ],
    name: 'LogSupply',
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
    name: 'OwnershipPulled',
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
    name: 'OwnershipPushed',
    type: 'event',
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
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
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
    name: 'INDEX',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
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
    inputs: [
      {internalType: 'address', name: 'owner_', type: 'address'},
      {internalType: 'address', name: 'spender', type: 'address'},
    ],
    name: 'allowance',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'approve',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'gons', type: 'uint256'}],
    name: 'balanceForGons',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'who', type: 'address'}],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'circulatingSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
    name: 'gonsForBalance',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
    ],
    name: 'increaseAllowance',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'index',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'stakingContract_',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initializer',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
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
    inputs: [{internalType: 'address', name: 'owner', type: 'address'}],
    name: 'nonces',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
      {internalType: 'uint8', name: 'v', type: 'uint8'},
      {internalType: 'bytes32', name: 'r', type: 'bytes32'},
      {internalType: 'bytes32', name: 's', type: 'bytes32'},
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pullManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'newOwner_', type: 'address'}],
    name: 'pushManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'profit_', type: 'uint256'},
      {internalType: 'uint256', name: 'epoch_', type: 'uint256'},
    ],
    name: 'rebase',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'rebases',
    outputs: [
      {internalType: 'uint256', name: 'epoch', type: 'uint256'},
      {internalType: 'uint256', name: 'rebase', type: 'uint256'},
      {
        internalType: 'uint256',
        name: 'totalStakedBefore',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalStakedAfter',
        type: 'uint256',
      },
      {internalType: 'uint256', name: 'amountRebased', type: 'uint256'},
      {internalType: 'uint256', name: 'index', type: 'uint256'},
      {
        internalType: 'uint256',
        name: 'blockNumberOccured',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_INDEX', type: 'uint256'}],
    name: 'setIndex',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakingContract',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
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
    inputs: [],
    name: 'totalSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'transfer',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'transferFrom',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const VUNIT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
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
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
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
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
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
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
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
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
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
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
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
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
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
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
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
]

const BOND_STAKE_HELPER_ABI = [
  {
    inputs: [
      {internalType: 'address', name: '_staking', type: 'address'},
      {internalType: 'address', name: '_OHM', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'OHM',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'staking',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
]

const wETHBondContractAbi = [
  {
    inputs: [
      {internalType: 'address', name: '_OHM', type: 'address'},
      {internalType: 'address', name: '_principle', type: 'address'},
      {internalType: 'address', name: '_treasury', type: 'address'},
      {internalType: 'address', name: '_DAO', type: 'address'},
      {internalType: 'address', name: '_feed', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deposit',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'payout',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'expires',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'priceInUSD',
        type: 'uint256',
      },
    ],
    name: 'BondCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'priceInUSD',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'internalPrice',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'debtRatio',
        type: 'uint256',
      },
    ],
    name: 'BondPriceChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'payout',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'remaining',
        type: 'uint256',
      },
    ],
    name: 'BondRedeemed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'initialBCV',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newBCV',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'adjustment',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'addition',
        type: 'bool',
      },
    ],
    name: 'ControlVariableAdjustment',
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
    name: 'OwnershipPulled',
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
    name: 'OwnershipPushed',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DAO',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'OHM',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'adjustment',
    outputs: [
      {internalType: 'bool', name: 'add', type: 'bool'},
      {internalType: 'uint256', name: 'rate', type: 'uint256'},
      {internalType: 'uint256', name: 'target', type: 'uint256'},
      {internalType: 'uint256', name: 'buffer', type: 'uint256'},
      {internalType: 'uint256', name: 'lastBlock', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'assetPrice',
    outputs: [{internalType: 'int256', name: '', type: 'int256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'bondInfo',
    outputs: [
      {internalType: 'uint256', name: 'payout', type: 'uint256'},
      {internalType: 'uint256', name: 'vesting', type: 'uint256'},
      {internalType: 'uint256', name: 'lastBlock', type: 'uint256'},
      {internalType: 'uint256', name: 'pricePaid', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bondPrice',
    outputs: [{internalType: 'uint256', name: 'price_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bondPriceInUSD',
    outputs: [{internalType: 'uint256', name: 'price_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentDebt',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'debtDecay',
    outputs: [{internalType: 'uint256', name: 'decay_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'debtRatio',
    outputs: [{internalType: 'uint256', name: 'debtRatio_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
      {internalType: 'uint256', name: '_maxPrice', type: 'uint256'},
      {internalType: 'address', name: '_depositor', type: 'address'},
    ],
    name: 'deposit',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_controlVariable', type: 'uint256'},
      {internalType: 'uint256', name: '_vestingTerm', type: 'uint256'},
      {internalType: 'uint256', name: '_minimumPrice', type: 'uint256'},
      {internalType: 'uint256', name: '_maxPayout', type: 'uint256'},
      {internalType: 'uint256', name: '_maxDebt', type: 'uint256'},
      {internalType: 'uint256', name: '_initialDebt', type: 'uint256'},
    ],
    name: 'initializeBondTerms',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastDecay',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxPayout',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_value', type: 'uint256'}],
    name: 'payoutFor',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_depositor', type: 'address'}],
    name: 'pendingPayoutFor',
    outputs: [{internalType: 'uint256', name: 'pendingPayout_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_depositor', type: 'address'}],
    name: 'percentVestedFor',
    outputs: [{internalType: 'uint256', name: 'percentVested_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'policy',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'principle',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pullManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'newOwner_', type: 'address'}],
    name: 'pushManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'recoverLostToken',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_recipient', type: 'address'},
      {internalType: 'bool', name: '_stake', type: 'bool'},
    ],
    name: 'redeem',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'bool', name: '_addition', type: 'bool'},
      {internalType: 'uint256', name: '_increment', type: 'uint256'},
      {internalType: 'uint256', name: '_target', type: 'uint256'},
      {internalType: 'uint256', name: '_buffer', type: 'uint256'},
    ],
    name: 'setAdjustment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum wETHBondDepository.PARAMETER',
        name: '_parameter',
        type: 'uint8',
      },
      {internalType: 'uint256', name: '_input', type: 'uint256'},
    ],
    name: 'setBondTerms',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_staking', type: 'address'},
      {internalType: 'bool', name: '_helper', type: 'bool'},
    ],
    name: 'setStaking',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'staking',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakingHelper',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'standardizedDebtRatio',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'terms',
    outputs: [
      {internalType: 'uint256', name: 'controlVariable', type: 'uint256'},
      {internalType: 'uint256', name: 'vestingTerm', type: 'uint256'},
      {internalType: 'uint256', name: 'minimumPrice', type: 'uint256'},
      {internalType: 'uint256', name: 'maxPayout', type: 'uint256'},
      {internalType: 'uint256', name: 'maxDebt', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalDebt',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'useHelper',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
]

const BondContractAbi = [
  {
    inputs: [
      {internalType: 'address', name: '_OHM', type: 'address'},
      {internalType: 'address', name: '_principle', type: 'address'},
      {internalType: 'address', name: '_treasury', type: 'address'},
      {internalType: 'address', name: '_DAO', type: 'address'},
      {internalType: 'address', name: '_bondCalculator', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deposit',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'payout',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'expires',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'priceInUSD',
        type: 'uint256',
      },
    ],
    name: 'BondCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'priceInUSD',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'internalPrice',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'debtRatio',
        type: 'uint256',
      },
    ],
    name: 'BondPriceChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'payout',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'remaining',
        type: 'uint256',
      },
    ],
    name: 'BondRedeemed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'initialBCV',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newBCV',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'adjustment',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'addition',
        type: 'bool',
      },
    ],
    name: 'ControlVariableAdjustment',
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
    name: 'OwnershipPulled',
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
    name: 'OwnershipPushed',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DAO',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'OHM',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'adjustment',
    outputs: [
      {internalType: 'bool', name: 'add', type: 'bool'},
      {internalType: 'uint256', name: 'rate', type: 'uint256'},
      {internalType: 'uint256', name: 'target', type: 'uint256'},
      {internalType: 'uint256', name: 'buffer', type: 'uint256'},
      {internalType: 'uint256', name: 'lastBlock', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bondCalculator',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'bondInfo',
    outputs: [
      {internalType: 'uint256', name: 'payout', type: 'uint256'},
      {internalType: 'uint256', name: 'vesting', type: 'uint256'},
      {internalType: 'uint256', name: 'lastBlock', type: 'uint256'},
      {internalType: 'uint256', name: 'pricePaid', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bondPrice',
    outputs: [{internalType: 'uint256', name: 'price_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bondPriceInUSD',
    outputs: [{internalType: 'uint256', name: 'price_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentDebt',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'debtDecay',
    outputs: [{internalType: 'uint256', name: 'decay_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'debtRatio',
    outputs: [{internalType: 'uint256', name: 'debtRatio_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
      {internalType: 'uint256', name: '_maxPrice', type: 'uint256'},
      {internalType: 'address', name: '_depositor', type: 'address'},
    ],
    name: 'deposit',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: '_controlVariable', type: 'uint256'},
      {internalType: 'uint256', name: '_vestingTerm', type: 'uint256'},
      {internalType: 'uint256', name: '_minimumPrice', type: 'uint256'},
      {internalType: 'uint256', name: '_maxPayout', type: 'uint256'},
      {internalType: 'uint256', name: '_fee', type: 'uint256'},
      {internalType: 'uint256', name: '_maxDebt', type: 'uint256'},
      {internalType: 'uint256', name: '_initialDebt', type: 'uint256'},
    ],
    name: 'initializeBondTerms',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isLiquidityBond',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastDecay',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxPayout',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '_value', type: 'uint256'}],
    name: 'payoutFor',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_depositor', type: 'address'}],
    name: 'pendingPayoutFor',
    outputs: [{internalType: 'uint256', name: 'pendingPayout_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_depositor', type: 'address'}],
    name: 'percentVestedFor',
    outputs: [{internalType: 'uint256', name: 'percentVested_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'policy',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'principle',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pullManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'newOwner_', type: 'address'}],
    name: 'pushManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'recoverLostToken',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_recipient', type: 'address'},
      {internalType: 'bool', name: '_stake', type: 'bool'},
    ],
    name: 'redeem',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceManagement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'bool', name: '_addition', type: 'bool'},
      {internalType: 'uint256', name: '_increment', type: 'uint256'},
      {internalType: 'uint256', name: '_target', type: 'uint256'},
      {internalType: 'uint256', name: '_buffer', type: 'uint256'},
    ],
    name: 'setAdjustment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum OlympusBondDepository.PARAMETER',
        name: '_parameter',
        type: 'uint8',
      },
      {internalType: 'uint256', name: '_input', type: 'uint256'},
    ],
    name: 'setBondTerms',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_staking', type: 'address'},
      {internalType: 'bool', name: '_helper', type: 'bool'},
    ],
    name: 'setStaking',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'staking',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakingHelper',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'standardizedDebtRatio',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'terms',
    outputs: [
      {internalType: 'uint256', name: 'controlVariable', type: 'uint256'},
      {internalType: 'uint256', name: 'vestingTerm', type: 'uint256'},
      {internalType: 'uint256', name: 'minimumPrice', type: 'uint256'},
      {internalType: 'uint256', name: 'maxPayout', type: 'uint256'},
      {internalType: 'uint256', name: 'fee', type: 'uint256'},
      {internalType: 'uint256', name: 'maxDebt', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalDebt',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'useHelper',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
]

const iERC20ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
]

const VUNIT_ADDRESS = '0x94695C9942b1F306bC9A6dC38563EC02312446Ff'
const DISTRIBUTOR_ADDRESS = '0x3e9fA143E63D6e163212335931c2Dd8EA2406beb'
const sVUNIT_ADDRESS = '0x82f6fa2457C203E1756F038a9bb00a253d609866'
const STAKING_ADDRESS = '0x451e567Bad74F29C9E520100064D7539281b3289'

const networkId = 43114
const bondList = [
  {
    token1: {
      name: 'Tether USD',
      symbol: 'USDT',
      chainId: networkId,
      address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
      decimals: 6,
    },
    token2: {},
    bondABI: BondContractAbi,
    bondAddress: '0x140ceD0c04e03eFFC3Ada0f71C27d815E21835C6',
    reserveAddress: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    bondRoute: 'usdt',
    bondName: 'USDT',
  },
  {
    token1: {
      name: 'USD Coin',
      symbol: 'USDC',
      chainId: networkId,
      address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
      decimals: 6,
    },
    token2: {},
    bondABI: BondContractAbi,
    bondAddress: '0x228444d71CEb2069C3a0F9eF7F92d224d0cfE24C',
    reserveAddress: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    bondRoute: 'usdc',
    bondName: 'USDC',
  },
  {
    token1: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      chainId: networkId,
      address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
      decimals: 18,
    },
    token2: {},
    isWethBond: true,
    bondABI: wETHBondContractAbi,
    bondAddress: '0xe7c0460bE1025d1749449c07E8d159ddD109C089',
    reserveAddress: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    bondRoute: 'weth',
    bondName: 'WETH',
  },
]

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const VUNIT_CONTRACT = new ethers.Contract(VUNIT_ADDRESS, VUNIT_ABI, App.provider)
  const STAKING_VUNIT_CONTRACT = new ethers.Contract(STAKING_ADDRESS, VUNIT_STAKE_ABI, App.provider)
  const sVUNIT_CONTRACT = new ethers.Contract(sVUNIT_ADDRESS, sVUNIT_ABI, App.provider)
  const vUnitTotalSupply = await VUNIT_CONTRACT.totalSupply()
  const vUnitDecimals = await VUNIT_CONTRACT.decimals()
  const distributorBalance = await VUNIT_CONTRACT.balanceOf(DISTRIBUTOR_ADDRESS)
  const VUNIT_PRICE = await getVUnitPrice()

  const bondDataList = await fetchBondDataList(VUNIT_PRICE, App.provider)
  let userVUnitBalance = await VUNIT_CONTRACT.balanceOf(App.YOUR_ADDRESS)
  let userStakingBalance = await sVUNIT_CONTRACT.balanceOf(App.YOUR_ADDRESS)
  let totalStakingBalance = await VUNIT_CONTRACT.balanceOf(STAKING_ADDRESS)

  userVUnitBalance = userVUnitBalance / 10 ** 18
  userStakingBalance = userStakingBalance / 10 ** 18
  totalStakingBalance = totalStakingBalance / 10 ** 18

  const vUnitCircSupply = (vUnitTotalSupply - distributorBalance) / 10 ** vUnitDecimals

  const rewardTokenTicker = 'vUNIT'

  const prices = await getAvaxPrices()
  const userBalance = await sVUNIT_CONTRACT.balanceOf(App.YOUR_ADDRESS)
  const rewardPrice = getParameterCaseInsensitive(prices, VUNIT_ADDRESS)?.usd
  const userStaked = userBalance / 10 ** 18
  const userUnstaked = userVUnitBalance / 10 ** 18

  let sVUnitCircSupply = await sVUNIT_CONTRACT.circulatingSupply()
  let _stakingReward = await STAKING_VUNIT_CONTRACT.epoch()
  let stakingReward = _stakingReward.distribute
  let stakingRebase = stakingReward / sVUnitCircSupply

  let nextEpochRewards = userStakingBalance * stakingRebase
  let dayRate = (Math.pow(1 + stakingRebase, 1 * 3) - 1) * 100
  let weekRate = (Math.pow(1 + stakingRebase, 7 * 3) - 1) * 100
  let stakingAPY = (Math.pow(1 + stakingRebase, 365 * 3) - 1) * 100

  const approveAndStakeVUNIT = async function() {
    return vUnitContract_stake(App, VUNIT_STAKE_ABI, STAKING_ADDRESS, VUNIT_ADDRESS)
  }
  const unstakeVUNIT = async function() {
    return vUnitContract_unstake(App, VUNIT_STAKE_ABI, STAKING_ADDRESS)
  }

  const usdVUnitStaking = userStakingBalance * rewardPrice
  const apyDay = parseFloat(dayRate.toString()).toFixed(2)
  const apyWeek = parseFloat(weekRate.toString()).toFixed(2)
  const apyYear = parseFloat(stakingAPY.toString()).toFixed(2)
  const amountVUnitDay = (userStakingBalance * (dayRate / 100)).toFixed(4)
  const amountVUnitWeek = (userStakingBalance * (weekRate / 100)).toFixed(4)
  const amountVUnitYear = (userStakingBalance * (stakingAPY / 100)).toFixed(4)
  const dexguruTokenlink = `<a href='https://dex.guru/token/${VUNIT_ADDRESS.toLowerCase()}-bsc' rel='noopener' target='_blank'>[%]</a>`
  _print(
    `<a href='https://arbiscan.io/address/${VUNIT_ADDRESS}' target='_blank'>${rewardTokenTicker}</a> Price: $${formatMoney(
      VUNIT_PRICE
    )} Circulating Market Cap: $${formatMoney(VUNIT_PRICE * vUnitCircSupply)} ${dexguruTokenlink}`
  )
  _print(
    `Staked: ${parseFloat(totalStakingBalance.toString()).toFixed(4)} ${rewardTokenTicker} ($${formatMoney(
      totalStakingBalance * VUNIT_PRICE
    )})`
  )
  _print(
    `You are staking ${parseFloat(userStakingBalance.toString()).toFixed(4)} ${rewardTokenTicker} ($${formatMoney(
      usdVUnitStaking
    )})`
  )
  _print(
    `APR: Day ${apyDay}% (${amountVUnitDay} vUNIT) Week ${apyWeek}% (${amountVUnitWeek} vUNIT) Year ${apyYear}% (${amountVUnitYear} vUNIT)`
  )

  console.log(bondDataList)
  bondDataList?.map(bondData => {
    _print(`${bondData.bondName}($${formatMoney(bondData.bondPrice)},${formatMoney(bondData.bondDiscount)} ROI)`)
  })
  _print_link(`Stake ${parseFloat(userVUnitBalance.toString()).toFixed(4)} ${rewardTokenTicker}`, approveAndStakeVUNIT)
  _print_link(`Unstake ${parseFloat(userStakingBalance.toString()).toFixed(4)} ${rewardTokenTicker}`, unstakeVUNIT)
  _print(`\n`)

  hideLoading()
}

const vUnitContract_stake = async function(App, stackingAbi, stackingAddress, vUnitAddress) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(vUnitAddress, sVUNIT_ABI, signer)
  const STACKING_CONTRACT = new ethers.Contract(stackingAddress, stackingAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, stackingAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1 < currentTokens / 1) {
    showLoading()
    allow = STAKING_TOKEN.approve(stackingAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1 > 0) {
    showLoading()
    allow
      .then(async function() {
        STACKING_CONTRACT.stake(currentTokens, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const vUnitContract_unstake = async function(App, stackingAbi, vUnitAddress) {
  const signer = App.provider.getSigner()

  const STACKING_CONTRACT = new ethers.Contract(vUnitAddress, stackingAbi, signer)
  const sVUNIT_CONTRACT = new ethers.Contract(sVUNIT_ADDRESS, sVUNIT_ABI, signer)

  const currentStakedAmount = await sVUNIT_CONTRACT.balanceOf(App.YOUR_ADDRESS)

  if (parseFloat(currentStakedAmount.toString()) > 0) {
    showLoading()
    STACKING_CONTRACT.unstake(currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const getVUnitPrice = async () => {
  try {
    const res = await fetch('https://api.monox.finance/avalanche/vcash/usdc/price')
    const data = await res.json()
    return data.response.price
  } catch (error) {
    return 0
  }
}

const fetchBondDataList = async (vcashPrice, provider) => {
  let totalTreasuryBalance = 0
  if (networkId !== bondList?.[0]?.token1?.chainId) {
    return
  }
  const bondListData = await Promise.all(
    bondList?.map(async item => {
      try {
        const bondContract = new ethers.Contract(item.bondAddress, item.bondABI, provider)
        const bondReserveContract = new ethers.Contract(item.reserveAddress, iERC20ABI, provider)
        const {token1: currency, token2: currency2, isWethBond, isLP, isvUnitBond, reserveAddress} = item
        const LPTokenContract = isLP ? getLPToken(account ? ethereum : provider, reserveAddress) : null
        const [bondPrice, totalValue, token0, reserves, vUnitBondReceiveBig] = await Promise.all([
          !isLP ? bondContract.bondPriceInUSD() : bondContract.bondPrice(),
          isLP ? bondCalcContract.getTotalValue(reserveAddress).call() : 1,
          isLP ? LPTokenContract?.methods.token0().call() : 1,
          isLP ? LPTokenContract?.methods.getReserves().call() : {},
          isvUnitBond ? bondContract?.methods.payoutFor(new BigNumber(10 ** 18).toFixed(0)).call() : 1,
        ])
        const {_reserve0, _reserve1} = reserves
        const stableReserve = token0 === VUNIT_ADDRESS ? _reserve1 : _reserve0
        const bondPriceInUSD = isLP
          ? (2 * ethers.utils.formatEther(stableReserve) * Number(bondPrice)) /
            (100 * currency2?.decimals) /
            ethers.utils.formatEther(totalValue)
          : ethers.utils.formatEther(bondPrice, currency?.decimals)
        let ethPrice = isWethBond ? await bondContract?.assetPrice() : 1
        ethPrice = Number(ethPrice?.toString()) / Math.pow(10, 8)
        const bondDiscount = isvUnitBond
          ? ethers.utils.formatEther(vUnitBondReceiveBig) - 1
          : ((vcashPrice - bondPriceInUSD) / bondPriceInUSD) * 100
        return {
          ...item,
          bondPrice: isvUnitBond ? bondPriceInUSD * vcashPrice : bondPriceInUSD,
          bondDiscount,
        }
      } catch (err) {
        return item
      }
    })
  )
  return bondListData
}
