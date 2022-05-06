$(function() {
  consoleInit(main)
})

function precise(value, digit, fixedDigit) {
  if (!parseFloat(value) || !isFinite(parseFloat(value))) {
    return 0
  }
  const sign = Math.sign(parseFloat(value))
  if (parseFloat(Math.abs(value)) >= 1) {
    return fixedDigit
      ? parseFloat(Math.abs(value))
          .toFixed(digit)
          .match(/^0*(\d+(?:\.(?:(?!0+$)\d)+)?)/)
          .input.replace(/(\.0+|0+)$/, '')
      : sign *
          parseFloat(Math.abs(value))
            .toFixed(digit)
            .match(/^0*(\d+(?:\.(?:(?!0+$)\d)+)?)/)[1]
  } else if (parseFloat(Math.abs(value)) >= 0) {
    const zeroCount = -Math.floor(Math.log10(parseFloat(Math.abs(value))) + 1)
    if (zeroCount >= 17) return 0
    return fixedDigit
      ? parseFloat(Math.abs(value))
          .toFixed(zeroCount >= digit ? zeroCount + 1 : digit)
          .match(/^0*(\d+(?:\.(?:(?!0+$)\d)+)?)/)
          .input.replace(/(\.0+|0+)$/, '')
      : sign *
          parseFloat(Math.abs(value))
            .toFixed(digit + zeroCount > 18 ? 18 : digit + zeroCount)
            .match(/^0*(\d+(?:\.(?:(?!0+$)\d)+)?)/)[1]
  }
}

const calculateApy = (roi, n) => {
  let apy
  if (roi > 0) {
    apy = precise(((1 + roi / 100) ** (365 / n) - 1) * 100, 2)
  } else {
    apy = precise(((1 + roi / 100) ** (365 / n) - 1) * 100, 2)
  }
  return apy > 0 ? apy + '%' : '0%'
}

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

const LPContractAbi = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" }
    ],
    "name": "Burn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "name": "Mint",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0In",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1In",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0Out",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1Out",
        "type": "uint256"
      },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" }
    ],
    "name": "Swap",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint112",
        "name": "reserve0",
        "type": "uint112"
      },
      {
        "indexed": false,
        "internalType": "uint112",
        "name": "reserve1",
        "type": "uint112"
      }
    ],
    "name": "Sync",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "DOMAIN_SEPARATOR",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "MINIMUM_LIQUIDITY",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "PERMIT_TYPEHASH",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
    "name": "burn",
    "outputs": [
      { "internalType": "uint256", "name": "amount0", "type": "uint256" },
      { "internalType": "uint256", "name": "amount1", "type": "uint256" }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "factory",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getReserves",
    "outputs": [
      { "internalType": "uint112", "name": "_reserve0", "type": "uint112" },
      { "internalType": "uint112", "name": "_reserve1", "type": "uint112" },
      { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "address", "name": "_token0", "type": "address" },
      { "internalType": "address", "name": "_token1", "type": "address" }
    ],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "kLast",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
    "name": "mint",
    "outputs": [
      { "internalType": "uint256", "name": "liquidity", "type": "uint256" }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "nonces",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" },
      { "internalType": "uint256", "name": "deadline", "type": "uint256" },
      { "internalType": "uint8", "name": "v", "type": "uint8" },
      { "internalType": "bytes32", "name": "r", "type": "bytes32" },
      { "internalType": "bytes32", "name": "s", "type": "bytes32" }
    ],
    "name": "permit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "price0CumulativeLast",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "price1CumulativeLast",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
    "name": "skim",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "uint256", "name": "amount0Out", "type": "uint256" },
      { "internalType": "uint256", "name": "amount1Out", "type": "uint256" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "bytes", "name": "data", "type": "bytes" }
    ],
    "name": "swap",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "sync",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "token0",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "token1",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const bondCalcContractAbi = [
  {
    "inputs": [{ "internalType": "address", "name": "_OHM", "type": "address" }],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "OHM",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }],
    "name": "getKValue",
    "outputs": [{ "internalType": "uint256", "name": "k_", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }],
    "name": "getTotalValue",
    "outputs": [{ "internalType": "uint256", "name": "_value", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }],
    "name": "markdown",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_pair", "type": "address" },
      { "internalType": "uint256", "name": "amount_", "type": "uint256" }
    ],
    "name": "valuation",
    "outputs": [{ "internalType": "uint256", "name": "_value", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
]

const VUSDTLPBondContractAbi = [
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

const VUNIT_ADDRESS = '0x2f4862f141eA85ebED8e28285A932A98A510c337'
const DISTRIBUTOR_ADDRESS = '0xA1d476d66867e6692aFB46887Bbae84180E2b871'
const sVUNIT_ADDRESS = '0x543cA905FDC27F1b86494B5868f1f6C63Bd70232'
const STAKING_ADDRESS = '0xF48bb507362096323C46FAc1640b2872B712E906'
const BOND_CALCULATOR_ADDRESS = '0x266aC667206820058EFb02DE646F159057f7a321'
const networkId = 42161

const bondList = [
  {
    token1: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      chainId: networkId,
      address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      decimals: 18,
    },
    token2: {},
    isWethBond: true,
    bondABI: wETHBondContractAbi,
    bondAddress: '0xe9b111f9f4D3a748c6CE817aC7a7E72EFB147F94',
    reserveAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    bondRoute: 'weth',
    bondName: 'WETH',
    period: 7,
  },
  {
    token1: {
      name: 'USD Coin',
      symbol: 'USDC',
      chainId: networkId,
      address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      decimals: 6,
    },
    token2: {},
    bondABI: BondContractAbi,
    bondAddress: '0x77c9349fE4b2dcc6C17570B802FB2298714C30Fe',
    reserveAddress: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    bondRoute: 'usdc',
    bondName: 'USDC',
    period: 7,
  },
  {
    token1: {
      name: 'Tether USD',
      symbol: 'USDT',
      chainId: networkId,
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      decimals: 6,
    },
    token2: {},
    bondABI: BondContractAbi,
    bondAddress: '0x374a3d831b3c57cD958411A087B1BDb4f93Be59E',
    reserveAddress: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    bondRoute: 'usdt',
    bondName: 'USDT',
    period: 7,
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

  const prices = await getArbitrumPrices()
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

  let tableData = {
    title: 'Bond Details',
    heading: ['Bond Name', 'Bond Price', 'Bond ROI', 'Bond APY'],
    rows: bondDataList?.map(bondData => {
      return [
        bondData.bondName,
        bondData.bondName === 'USDC' || bondData.bondName === 'USDT'
          ? parseFloat(bondData.bondPrice * 10 ** 12).toFixed(2)
          : formatMoney(bondData.bondPrice),
        `${formatMoney(bondData.bondDiscount)}% ROI`,
          calculateApy(precise(bondData.bondDiscount * 100, 2), bondData.period)
      ]
    }),
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'

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
    const res = await fetch('https://api.monox.finance/arbitrum/vcash/usdc/price')
    const data = await res.json()
    return data.response.price
  } catch (error) {
    return 0
  }
}

const fetchBondDataList = async (vcashPrice, provider) => {
  if (networkId !== bondList?.[0]?.token1?.chainId) {
    return
  }
  const bondListData = await Promise.all(
    bondList?.map(async item => {
      try {
        const bondContract = new ethers.Contract(item.bondAddress, item.bondABI, provider)
        const bondCalcContract = new ethers.Contract(BOND_CALCULATOR_ADDRESS, bondCalcContractAbi, provider)
        const isLP = item.isLP
        const isvUnitBond = item.isvUnitBond
        const {token1: currency, token2: currency2, isWethBond, reserveAddress} = item
        const LPTokenContract = isLP ? new ethers.Contract(reserveAddress, LPContractAbi, provider) : null

        const [bondPrice, totalValue, token0, reserves, vUnitBondReceiveBig] = await Promise.all([
          !isLP ? bondContract.bondPriceInUSD() : bondContract.bondPrice(),
          isLP ? bondCalcContract.getTotalValue(reserveAddress) : 1,
          isLP ? LPTokenContract?.token0() : 1,
          isLP ? LPTokenContract?.getReserves() : {},
          isvUnitBond ? bondContract?.payoutFor(ethers.BigNumber.from(10).pow(18)) : 1,
        ])
        const {_reserve0, _reserve1} = reserves
        const stableReserve = token0 === VUNIT_ADDRESS ? _reserve1 : _reserve0
        const bondPriceInUSD = isLP
          ? (2 * ethers.utils.formatEther(stableReserve) * Number(bondPrice)) /
            100 /
            ethers.utils.formatEther(totalValue)
          : ethers.utils.formatEther(bondPrice)
        let ethPrice = isWethBond ? await bondContract?.assetPrice() : 1
        ethPrice = Number(ethPrice?.toString()) / Math.pow(10, 8)
        const bondDiscount = isvUnitBond
          ? (ethers.utils.formatEther(vUnitBondReceiveBig) - 1) * 100
          : item.bondName.includes('USDT') || item.bondName.includes('USDC')
          ? ((vcashPrice - bondPriceInUSD * 10 ** 12) / (bondPriceInUSD * 10 ** 12)) * 100
          : (vcashPrice - bondPriceInUSD) / bondPriceInUSD
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
