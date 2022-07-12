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

const LPContractAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
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
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
    ],
    name: 'Burn',
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
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
    ],
    name: 'Mint',
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
        indexed: false,
        internalType: 'uint256',
        name: 'amount0In',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1In',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0Out',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1Out',
        type: 'uint256',
      },
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
    ],
    name: 'Swap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint112',
        name: 'reserve0',
        type: 'uint112',
      },
      {
        indexed: false,
        internalType: 'uint112',
        name: 'reserve1',
        type: 'uint112',
      },
    ],
    name: 'Sync',
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
    constant: true,
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'MINIMUM_LIQUIDITY',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {internalType: 'address', name: '', type: 'address'},
      {internalType: 'address', name: '', type: 'address'},
    ],
    name: 'allowance',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'approve',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{internalType: 'address', name: 'to', type: 'address'}],
    name: 'burn',
    outputs: [
      {internalType: 'uint256', name: 'amount0', type: 'uint256'},
      {internalType: 'uint256', name: 'amount1', type: 'uint256'},
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'factory',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getReserves',
    outputs: [
      {internalType: 'uint112', name: '_reserve0', type: 'uint112'},
      {internalType: 'uint112', name: '_reserve1', type: 'uint112'},
      {internalType: 'uint32', name: '_blockTimestampLast', type: 'uint32'},
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {internalType: 'address', name: '_token0', type: 'address'},
      {internalType: 'address', name: '_token1', type: 'address'},
    ],
    name: 'initialize',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'kLast',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{internalType: 'address', name: 'to', type: 'address'}],
    name: 'mint',
    outputs: [{internalType: 'uint256', name: 'liquidity', type: 'uint256'}],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'nonces',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'address', name: 'spender', type: 'address'},
      {internalType: 'uint256', name: 'value', type: 'uint256'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
      {internalType: 'uint8', name: 'v', type: 'uint8'},
      {internalType: 'bytes32', name: 'r', type: 'bytes32'},
      {internalType: 'bytes32', name: 's', type: 'bytes32'},
    ],
    name: 'permit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'price0CumulativeLast',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'price1CumulativeLast',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{internalType: 'address', name: 'to', type: 'address'}],
    name: 'skim',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {internalType: 'uint256', name: 'amount0Out', type: 'uint256'},
      {internalType: 'uint256', name: 'amount1Out', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'bytes', name: 'data', type: 'bytes'},
    ],
    name: 'swap',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'sync',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'token0',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'token1',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'transfer',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'transferFrom',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const bondCalcContractAbi = [
  {
    inputs: [{internalType: 'address', name: '_OHM', type: 'address'}],
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
    inputs: [{internalType: 'address', name: '_pair', type: 'address'}],
    name: 'getKValue',
    outputs: [{internalType: 'uint256', name: 'k_', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_pair', type: 'address'}],
    name: 'getTotalValue',
    outputs: [{internalType: 'uint256', name: '_value', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_pair', type: 'address'}],
    name: 'markdown',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_pair', type: 'address'},
      {internalType: 'uint256', name: 'amount_', type: 'uint256'},
    ],
    name: 'valuation',
    outputs: [{internalType: 'uint256', name: '_value', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
]

const POOLS_CONTRACT = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
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
        name: 'operator',
        type: 'address',
      },
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
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
    ],
    name: 'TransferBatch',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
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
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'TransferSingle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
      {indexed: true, internalType: 'uint256', name: 'id', type: 'uint256'},
    ],
    name: 'URI',
    type: 'event',
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'admin',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'account', type: 'address'},
      {internalType: 'uint256', name: 'id', type: 'uint256'},
    ],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address[]', name: 'accounts', type: 'address[]'},
      {internalType: 'uint256[]', name: 'ids', type: 'uint256[]'},
    ],
    name: 'balanceOfBatch',
    outputs: [{internalType: 'uint256[]', name: '', type: 'uint256[]'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'account', type: 'address'},
      {internalType: 'uint256', name: 'id', type: 'uint256'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'createdAt',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
    name: 'depositWETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_WETH', type: 'address'}],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'account', type: 'address'},
      {internalType: 'address', name: 'operator', type: 'address'},
    ],
    name: 'isApprovedForAll',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'isUnofficial',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'pid', type: 'uint256'},
      {internalType: 'address', name: 'account', type: 'address'},
    ],
    name: 'liquidityLastAddedOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'account', type: 'address'},
      {internalType: 'uint256', name: 'id', type: 'uint256'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'account', type: 'address'},
      {internalType: 'uint256', name: 'id', type: 'uint256'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'bool', name: '_isUnofficial', type: 'bool'},
    ],
    name: 'mintLp',
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
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'router',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256[]', name: 'ids', type: 'uint256[]'},
      {internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'},
      {internalType: 'bytes', name: 'data', type: 'bytes'},
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'token', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'safeTransferERC20Token',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'safeTransferETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'id', type: 'uint256'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
      {internalType: 'bytes', name: 'data', type: 'bytes'},
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_admin', type: 'address'}],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [{internalType: 'address', name: '_router', type: 'address'}],
    name: 'setRouter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'string', name: 'uri', type: 'string'}],
    name: 'setURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_whitelist', type: 'address'},
      {internalType: 'bool', name: '_isWhitelist', type: 'bool'},
    ],
    name: 'setWhitelist',
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
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'topHolder',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'pid', type: 'uint256'}],
    name: 'topLPHolderOf',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'totalSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'pid', type: 'uint256'}],
    name: 'totalSupplyOf',
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
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'uri',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
    name: 'withdrawWETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {stateMutability: 'payable', type: 'receive'},
]

const STAKE_CONTRACT = [
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
        internalType: 'address',
        name: 'devAddr',
        type: 'address',
      },
    ],
    name: 'SetDev',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'monoPerPeriod',
        type: 'uint256',
      },
    ],
    name: 'SetMonoPerPeriod',
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
        internalType: 'contract IERC1155',
        name: '_lpToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_lpTokenId',
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
    name: 'blockPerPeriod',
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
        name: '_fromBlock',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_toBlock',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_ratio',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_allocPoint',
        type: 'uint256',
      },
    ],
    name: 'calcReward',
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
    name: 'config',
    outputs: [
      {
        internalType: 'uint256',
        name: '_decay',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_blockPerPeriod',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_monoPerPeriod',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentPeriod',
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
    name: 'decay',
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
    inputs: [],
    name: 'devaddr',
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
        name: '_from',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_to',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_ratio',
        type: 'uint256',
      },
    ],
    name: 'getMultiplier',
    outputs: [
      {
        internalType: 'uint256',
        name: 'multiplier',
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
        name: '_from',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_to',
        type: 'uint256',
      },
    ],
    name: 'getPeriods',
    outputs: [
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
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract MonoToken',
        name: '_mono',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_monoPerPeriod',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_blockPerPeriod',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_decay',
        type: 'uint256',
      },
    ],
    name: 'initialize',
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
    inputs: [
      {
        internalType: 'uint256',
        name: '_oldPid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_newPid',
        type: 'uint256',
      },
    ],
    name: 'migratePool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mono',
    outputs: [
      {
        internalType: 'contract MonoToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'monoPerBlock',
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
    name: 'monoPerPeriod',
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
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
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
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
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
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
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
    name: 'pendingMono',
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
        internalType: 'contract IERC1155',
        name: 'lpToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'lpTokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'stakedAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'allocPoint',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastRewardBlock',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'accMonoPerShare',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'usersLen',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'bActive',
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
    name: 'ratios',
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
        name: '_devaddr',
        type: 'address',
      },
    ],
    name: 'setDev',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_monoPerPeriod',
        type: 'uint256',
      },
    ],
    name: 'setMonoPerPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startBlock',
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
    name: 'stopPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
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
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    name: 'updateRatios',
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
      {
        internalType: 'uint256',
        name: 'lastRewardBlock',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'oldReward',
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
        name: 'pid',
        type: 'uint256',
      },
    ],
    name: 'usersOfPool',
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

const uniswapTokens = {
  name: 'Uniswap Default List',
  timestamp: '2020-09-17T00:12:46.685Z',
  version: {major: 1, minor: 5, patch: 0},
  tags: {},
  logoURI: 'ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir',
  keywords: ['uniswap', 'default'],
  tokens: [
    {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
      chainId: 42,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
      chainId: 5,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: '0xBitcoin Token',
      address: '0xB6eD7644C69416d67B522e20bC294A9a9B405B31',
      symbol: '0xBTC',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB6eD7644C69416d67B522e20bC294A9a9B405B31/logo.png',
    },
    {
      name: 'Aave Interest bearing DAI',
      address: '0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d',
      symbol: 'aDAI',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d/logo.png',
    },
    {
      name: 'Amon',
      address: '0x737F98AC8cA59f2C68aD658E3C3d8C8963E40a4c',
      symbol: 'AMN',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x737F98AC8cA59f2C68aD658E3C3d8C8963E40a4c/logo.png',
    },
    {
      name: 'Ampleforth',
      address: '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
      symbol: 'AMPL',
      decimals: 9,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD46bA6D942050d489DBd938a2C909A5d5039A161/logo.png',
    },
    {
      name: 'Aragon Network Juror',
      address: '0xcD62b1C403fa761BAadFC74C525ce2B51780b184',
      symbol: 'ANJ',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xcD62b1C403fa761BAadFC74C525ce2B51780b184/logo.png',
    },
    {
      name: 'Aragon Network Token',
      address: '0x960b236A07cf122663c4303350609A66A7B288C0',
      symbol: 'ANT',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x960b236A07cf122663c4303350609A66A7B288C0/logo.png',
    },
    {
      name: 'AirSwap Token',
      address: '0x27054b13b1B798B345b591a4d22e6562d47eA75a',
      symbol: 'AST',
      decimals: 4,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x27054b13b1B798B345b591a4d22e6562d47eA75a/logo.png',
    },
    {
      name: 'Balancer',
      address: '0xba100000625a3754423978a60c9317c58a424e3D',
      symbol: 'BAL',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png',
    },
    {
      name: 'BandToken',
      address: '0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55',
      symbol: 'BAND',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55/logo.png',
    },
    {
      name: 'Basic Attention Token',
      address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
      symbol: 'BAT',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0D8775F648430679A709E98d2b0Cb6250d2887EF/logo.png',
    },
    {
      name: 'Bloom Token',
      address: '0x107c4504cd79C5d2696Ea0030a8dD4e92601B82e',
      symbol: 'BLT',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x107c4504cd79C5d2696Ea0030a8dD4e92601B82e/logo.png',
    },
    {
      name: 'Bancor Network Token',
      address: '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C',
      symbol: 'BNT',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C/logo.png',
    },
    {
      name: 'PieDAO BTC++',
      address: '0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd',
      symbol: 'BTC++',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0327112423F3A68efdF1fcF402F6c5CB9f7C33fd/logo.png',
    },
    {
      name: 'bZx Protocol Token',
      address: '0x56d811088235F11C8920698a204A5010a788f4b3',
      symbol: 'BZRX',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x56d811088235F11C8920698a204A5010a788f4b3/logo.png',
    },
    {
      name: 'Compound Dai',
      address: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
      symbol: 'cDAI',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643/logo.png',
    },
    {
      name: 'Celsius',
      address: '0xaaAEBE6Fe48E54f431b0C390CfaF0b017d09D42d',
      symbol: 'CEL',
      decimals: 4,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xaaAEBE6Fe48E54f431b0C390CfaF0b017d09D42d/logo.png',
    },
    {
      name: 'CelerToken',
      address: '0x4F9254C83EB525f9FCf346490bbb3ed28a81C667',
      symbol: 'CELR',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4F9254C83EB525f9FCf346490bbb3ed28a81C667/logo.png',
    },
    {
      name: 'Chai',
      address: '0x06AF07097C9Eeb7fD685c692751D5C66dB49c215',
      symbol: 'CHAI',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x06AF07097C9Eeb7fD685c692751D5C66dB49c215/logo.png',
    },
    {
      name: 'Compound',
      address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
      symbol: 'COMP',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png',
    },
    {
      name: 'Curve DAO Token',
      address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
      symbol: 'CRV',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png',
    },
    {
      name: 'Compound Dai v1.0 SAI',
      address: '0xF5DCe57282A584D2746FaF1593d3121Fcac444dC',
      symbol: 'cSAI',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xF5DCe57282A584D2746FaF1593d3121Fcac444dC/logo.png',
    },
    {
      name: 'Compound USD Coin',
      address: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
      symbol: 'cUSDC',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x39AA39c021dfbaE8faC545936693aC917d5E7563/logo.png',
    },
    {
      name: 'Dai Stablecoin',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      symbol: 'DAI',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    },
    {
      name: 'Streamr DATAcoin',
      address: '0x0Cf0Ee63788A0849fE5297F3407f701E122cC023',
      symbol: 'DATA',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0Cf0Ee63788A0849fE5297F3407f701E122cC023/logo.png',
    },
    {
      name: 'DigixDAO',
      address: '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A',
      symbol: 'DGD',
      decimals: 9,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A/logo.png',
    },
    {
      name: 'Digix Gold Token',
      address: '0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF',
      symbol: 'DGX',
      decimals: 9,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF/logo.png',
    },
    {
      name: 'Decentralized Insurance Protocol',
      address: '0xc719d010B63E5bbF2C0551872CD5316ED26AcD83',
      symbol: 'DIP',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc719d010B63E5bbF2C0551872CD5316ED26AcD83/logo.png',
    },
    {
      name: 'Donut',
      address: '0xC0F9bD5Fa5698B6505F643900FFA515Ea5dF54A9',
      symbol: 'DONUT',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC0F9bD5Fa5698B6505F643900FFA515Ea5dF54A9/logo.png',
    },
    {
      name: 'EURBASE Stablecoin',
      address: '0x86FADb80d8D2cff3C3680819E4da99C10232Ba0F',
      symbol: 'EBASE',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x86FADb80d8D2cff3C3680819E4da99C10232Ba0F/logo.png',
    },
    {
      name: 'Enjin Coin',
      address: '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c',
      symbol: 'ENJ',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c/logo.png',
    },
    {
      name: 'SAINT FAME Genesis Shirt',
      address: '0x06f65b8CfCb13a9FE37d836fE9708dA38Ecb29B2',
      symbol: 'FAME',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x06f65b8CfCb13a9FE37d836fE9708dA38Ecb29B2/logo.png',
    },
    {
      name: 'FOAM Token',
      address: '0x4946Fcea7C692606e8908002e55A582af44AC121',
      symbol: 'FOAM',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4946Fcea7C692606e8908002e55A582af44AC121/logo.png',
    },
    {
      name: 'FunFair',
      address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      symbol: 'FUN',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b/logo.png',
    },
    {
      name: 'Flexacoin',
      address: '0x4a57E687b9126435a9B19E4A802113e266AdeBde',
      symbol: 'FXC',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4a57E687b9126435a9B19E4A802113e266AdeBde/logo.png',
    },
    {
      name: 'DAOstack',
      address: '0x543Ff227F64Aa17eA132Bf9886cAb5DB55DCAddf',
      symbol: 'GEN',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x543Ff227F64Aa17eA132Bf9886cAb5DB55DCAddf/logo.png',
    },
    {
      name: 'Gnosis Token',
      address: '0x6810e776880C02933D47DB1b9fc05908e5386b96',
      symbol: 'GNO',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6810e776880C02933D47DB1b9fc05908e5386b96/logo.png',
    },
    {
      name: 'GRID Token',
      address: '0x12B19D3e2ccc14Da04FAe33e63652ce469b3F2FD',
      symbol: 'GRID',
      decimals: 12,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x12B19D3e2ccc14Da04FAe33e63652ce469b3F2FD/logo.png',
    },
    {
      name: 'Gastoken.io',
      address: '0x0000000000b3F879cb30FE243b4Dfee438691c04',
      symbol: 'GST2',
      decimals: 2,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000b3F879cb30FE243b4Dfee438691c04/logo.png',
    },
    {
      name: 'HedgeTrade',
      address: '0xF1290473E210b2108A85237fbCd7b6eb42Cc654F',
      symbol: 'HEDG',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xF1290473E210b2108A85237fbCd7b6eb42Cc654F/logo.png',
    },
    {
      name: 'HoloToken',
      address: '0x6c6EE5e31d828De241282B9606C8e98Ea48526E2',
      symbol: 'HOT',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6c6EE5e31d828De241282B9606C8e98Ea48526E2/logo.png',
    },
    {
      name: 'HUSD',
      address: '0xdF574c24545E5FfEcb9a659c229253D4111d87e1',
      symbol: 'HUSD',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdF574c24545E5FfEcb9a659c229253D4111d87e1/logo.png',
    },
    {
      name: 'Fulcrum DAI iToken',
      address: '0x493C57C4763932315A328269E1ADaD09653B9081',
      symbol: 'iDAI',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x493C57C4763932315A328269E1ADaD09653B9081/logo.png',
    },
    {
      name: 'IoTeX Network',
      address: '0x6fB3e0A217407EFFf7Ca062D46c26E5d60a14d69',
      symbol: 'IOTX',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6fB3e0A217407EFFf7Ca062D46c26E5d60a14d69/logo.png',
    },
    {
      name: 'Fulcrum SAI iToken ',
      address: '0x14094949152EDDBFcd073717200DA82fEd8dC960',
      symbol: 'iSAI',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x14094949152EDDBFcd073717200DA82fEd8dC960/logo.png',
    },
    {
      name: 'KEY',
      address: '0x4Cd988AfBad37289BAAf53C13e98E2BD46aAEa8c',
      symbol: 'KEY',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4Cd988AfBad37289BAAf53C13e98E2BD46aAEa8c/logo.png',
    },
    {
      name: 'Kyber Network Crystal',
      address: '0xdd974D5C2e2928deA5F71b9825b8b646686BD200',
      symbol: 'KNC',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdd974D5C2e2928deA5F71b9825b8b646686BD200/logo.png',
    },
    {
      name: 'EthLend Token',
      address: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
      symbol: 'LEND',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x80fB784B7eD66730e8b1DBd9820aFD29931aab03/logo.png',
    },
    {
      name: 'ChainLink Token',
      address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      symbol: 'LINK',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png',
    },
    {
      name: 'LoomToken',
      address: '0xA4e8C3Ec456107eA67d3075bF9e3DF3A75823DB0',
      symbol: 'LOOM',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA4e8C3Ec456107eA67d3075bF9e3DF3A75823DB0/logo.png',
    },
    {
      name: 'Livepeer Token',
      address: '0x58b6A8A3302369DAEc383334672404Ee733aB239',
      symbol: 'LPT',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x58b6A8A3302369DAEc383334672404Ee733aB239/logo.png',
    },
    {
      name: 'Liquidity.Network Token',
      address: '0xD29F0b5b3F50b07Fe9a9511F7d86F4f4bAc3f8c4',
      symbol: 'LQD',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD29F0b5b3F50b07Fe9a9511F7d86F4f4bAc3f8c4/logo.png',
    },
    {
      name: 'LoopringCoin V2',
      address: '0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD',
      symbol: 'LRC',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD/logo.png',
    },
    {
      name: 'Decentraland MANA',
      address: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942',
      symbol: 'MANA',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0F5D2fB29fb7d3CFeE444a200298f468908cC942/logo.png',
    },
    {
      name: 'Matic Token',
      address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
      symbol: 'MATIC',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    },
    {
      name: 'Marblecoin',
      address: '0x8888889213DD4dA823EbDD1e235b09590633C150',
      symbol: 'MBC',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x8888889213DD4dA823EbDD1e235b09590633C150/logo.png',
    },
    {
      name: 'MachiX Token',
      address: '0xd15eCDCF5Ea68e3995b2D0527A0aE0a3258302F8',
      symbol: 'MCX',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xd15eCDCF5Ea68e3995b2D0527A0aE0a3258302F8/logo.png',
    },
    {
      name: 'Metronome',
      address: '0xa3d58c4E56fedCae3a7c43A725aeE9A71F0ece4e',
      symbol: 'MET',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xa3d58c4E56fedCae3a7c43A725aeE9A71F0ece4e/logo.png',
    },
    {
      name: 'Magnolia Token',
      address: '0x80f222a749a2e18Eb7f676D371F19ad7EFEEe3b7',
      symbol: 'MGN',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x80f222a749a2e18Eb7f676D371F19ad7EFEEe3b7/logo.png',
    },
    {
      name: 'Maker',
      address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
      symbol: 'MKR',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png',
    },
    {
      name: 'Melon Token',
      address: '0xec67005c4E498Ec7f55E092bd1d35cbC47C91892',
      symbol: 'MLN',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xec67005c4E498Ec7f55E092bd1d35cbC47C91892/logo.png',
    },
    {
      name: 'Modum Token',
      address: '0x957c30aB0426e0C93CD8241E2c60392d08c6aC8e',
      symbol: 'MOD',
      decimals: 0,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x957c30aB0426e0C93CD8241E2c60392d08c6aC8e/logo.png',
    },
    {
      name: 'Meta',
      address: '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2',
      symbol: 'MTA',
      chainId: 1,
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2/logo.png',
    },
    {
      name: 'mStable USD',
      address: '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
      symbol: 'mUSD',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xe2f2a5C287993345a840Db3B0845fbC70f5935a5/logo.png',
    },
    {
      name: 'Nexo',
      address: '0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206',
      symbol: 'NEXO',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206/logo.png',
    },
    {
      name: 'Numeraire',
      address: '0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671',
      symbol: 'NMR',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671/logo.png',
    },
    {
      name: 'Ocean Token',
      address: '0x7AFeBBB46fDb47ed17b22ed075Cde2447694fB9e',
      symbol: 'OCEAN',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7AFeBBB46fDb47ed17b22ed075Cde2447694fB9e/logo.png',
    },
    {
      name: 'Orchid',
      address: '0x4575f41308EC1483f3d399aa9a2826d74Da13Deb',
      symbol: 'OXT',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4575f41308EC1483f3d399aa9a2826d74Da13Deb/logo.png',
    },
    {
      name: 'Panvala pan',
      address: '0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44',
      symbol: 'PAN',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44/logo.png',
    },
    {
      name: 'PAX',
      address: '0x8E870D67F660D95d5be530380D0eC0bd388289E1',
      symbol: 'PAX',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x8E870D67F660D95d5be530380D0eC0bd388289E1/logo.png',
    },
    {
      name: 'Paxos Gold',
      address: '0x45804880De22913dAFE09f4980848ECE6EcbAf78',
      symbol: 'PAXG',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x45804880De22913dAFE09f4980848ECE6EcbAf78/logo.png',
    },
    {
      name: 'Pinakion',
      address: '0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d',
      symbol: 'PNK',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d/logo.png',
    },
    {
      name: 'POA ERC20 on Foundation',
      address: '0x6758B7d441a9739b98552B373703d8d3d14f9e62',
      symbol: 'POA20',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6758B7d441a9739b98552B373703d8d3d14f9e62/logo.png',
    },
    {
      name: 'QChi',
      address: '0x687BfC3E73f6af55F0CccA8450114D107E781a0e',
      symbol: 'QCH',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x687BfC3E73f6af55F0CccA8450114D107E781a0e/logo.png',
    },
    {
      name: 'Quant',
      address: '0x4a220E6096B25EADb88358cb44068A3248254675',
      symbol: 'QNT',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4a220E6096B25EADb88358cb44068A3248254675/logo.png',
    },
    {
      name: 'Quantstamp Token',
      address: '0x99ea4dB9EE77ACD40B119BD1dC4E33e1C070b80d',
      symbol: 'QSP',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x99ea4dB9EE77ACD40B119BD1dC4E33e1C070b80d/logo.png',
    },
    {
      name: 'Ripio Credit Network Token',
      address: '0xF970b8E36e23F7fC3FD752EeA86f8Be8D83375A6',
      symbol: 'RCN',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xF970b8E36e23F7fC3FD752EeA86f8Be8D83375A6/logo.png',
    },
    {
      name: 'Raiden Token',
      address: '0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6',
      symbol: 'RDN',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x255Aa6DF07540Cb5d3d297f0D0D4D84cb52bc8e6/logo.png',
    },
    {
      name: 'Republic Token',
      address: '0x408e41876cCCDC0F92210600ef50372656052a38',
      symbol: 'REN',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x408e41876cCCDC0F92210600ef50372656052a38/logo.png',
    },
    {
      name: 'renBCH',
      address: '0x459086F2376525BdCebA5bDDA135e4E9d3FeF5bf',
      symbol: 'renBCH',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x459086F2376525BdCebA5bDDA135e4E9d3FeF5bf/logo.png',
    },
    {
      name: 'renBTC',
      address: '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
      symbol: 'renBTC',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D/logo.png',
    },
    {
      name: 'renZEC',
      address: '0x1C5db575E2Ff833E46a2E9864C22F4B22E0B37C2',
      symbol: 'renZEC',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1C5db575E2Ff833E46a2E9864C22F4B22E0B37C2/logo.png',
    },
    {
      name: 'Reputation Augur v1',
      address: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
      symbol: 'REP',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1985365e9f78359a9B6AD760e32412f4a445E862/logo.png',
    },
    {
      name: 'Reputation Augur v2',
      address: '0x221657776846890989a759BA2973e427DfF5C9bB',
      symbol: 'REPv2',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x221657776846890989a759BA2973e427DfF5C9bB/logo.png',
    },
    {
      name: 'Darwinia Network Native Token',
      address: '0x9469D013805bFfB7D3DEBe5E7839237e535ec483',
      symbol: 'RING',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9469D013805bFfB7D3DEBe5E7839237e535ec483/logo.png',
    },
    {
      name: 'iEx.ec Network Token',
      address: '0x607F4C5BB672230e8672085532f7e901544a7375',
      symbol: 'RLC',
      decimals: 9,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x607F4C5BB672230e8672085532f7e901544a7375/logo.png',
    },
    {
      name: 'Rocket Pool',
      address: '0xB4EFd85c19999D84251304bDA99E90B92300Bd93',
      symbol: 'RPL',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB4EFd85c19999D84251304bDA99E90B92300Bd93/logo.png',
    },
    {
      name: 'Dai Stablecoin v1.0 SAI',
      address: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
      symbol: 'SAI',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359/logo.png',
    },
    {
      name: 'Salt',
      address: '0x4156D3342D5c385a87D264F90653733592000581',
      symbol: 'SALT',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4156D3342D5c385a87D264F90653733592000581/logo.png',
    },
    {
      name: 'SANtiment network token',
      address: '0x7C5A0CE9267ED19B22F8cae653F198e3E8daf098',
      symbol: 'SAN',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7C5A0CE9267ED19B22F8cae653F198e3E8daf098/logo.png',
    },
    {
      name: 'Synth sETH',
      address: '0x5e74C9036fb86BD7eCdcb084a0673EFc32eA31cb',
      symbol: 'sETH',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x5e74C9036fb86BD7eCdcb084a0673EFc32eA31cb/logo.png',
    },
    {
      name: 'Shuffle.Monster V3',
      address: '0x3A9FfF453d50D4Ac52A6890647b823379ba36B9E',
      symbol: 'SHUF',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x3A9FfF453d50D4Ac52A6890647b823379ba36B9E/logo.png',
    },
    {
      name: 'Status Network Token',
      address: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
      symbol: 'SNT',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x744d70FDBE2Ba4CF95131626614a1763DF805B9E/logo.png',
    },
    {
      name: 'Synthetix Network Token',
      address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
      symbol: 'SNX',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png',
    },
    {
      name: 'Unisocks Edition 0',
      address: '0x23B608675a2B2fB1890d3ABBd85c5775c51691d5',
      symbol: 'SOCKS',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x23B608675a2B2fB1890d3ABBd85c5775c51691d5/logo.png',
    },
    {
      name: 'SPANK',
      address: '0x42d6622deCe394b54999Fbd73D108123806f6a18',
      symbol: 'SPANK',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x42d6622deCe394b54999Fbd73D108123806f6a18/logo.png',
    },
    {
      name: 'Serum',
      address: '0x476c5E26a75bd202a9683ffD34359C0CC15be0fF',
      symbol: 'SRM',
      chainId: 1,
      decimals: 6,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x476c5E26a75bd202a9683ffD34359C0CC15be0fF/logo.png',
    },
    {
      name: 'STAKE',
      address: '0x0Ae055097C6d159879521C384F1D2123D1f195e6',
      symbol: 'STAKE',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0Ae055097C6d159879521C384F1D2123D1f195e6/logo.png',
    },
    {
      name: 'StorjToken',
      address: '0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC',
      symbol: 'STORJ',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC/logo.png',
    },
    {
      name: 'Synth sUSD',
      address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
      symbol: 'sUSD',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x57Ab1ec28D129707052df4dF418D58a2D46d5f51/logo.png',
    },
    {
      name: 'Synth sXAU',
      address: '0x261EfCdD24CeA98652B9700800a13DfBca4103fF',
      symbol: 'sXAU',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x261EfCdD24CeA98652B9700800a13DfBca4103fF/logo.png',
    },
    {
      name: 'Swipe',
      address: '0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9',
      symbol: 'SXP',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9/logo.png',
    },
    {
      name: 'TrueAUD',
      address: '0x00006100F7090010005F1bd7aE6122c3C2CF0090',
      symbol: 'TAUD',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x00006100F7090010005F1bd7aE6122c3C2CF0090/logo.png',
    },
    {
      name: 'TrueCAD',
      address: '0x00000100F2A2bd000715001920eB70D229700085',
      symbol: 'TCAD',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x00000100F2A2bd000715001920eB70D229700085/logo.png',
    },
    {
      name: 'TrueGBP',
      address: '0x00000000441378008EA67F4284A57932B1c000a5',
      symbol: 'TGBP',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x00000000441378008EA67F4284A57932B1c000a5/logo.png',
    },
    {
      name: 'TrueHKD',
      address: '0x0000852600CEB001E08e00bC008be620d60031F2',
      symbol: 'THKD',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000852600CEB001E08e00bC008be620d60031F2/logo.png',
    },
    {
      name: 'Monolith TKN',
      address: '0xaAAf91D9b90dF800Df4F55c205fd6989c977E73a',
      symbol: 'TKN',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xaAAf91D9b90dF800Df4F55c205fd6989c977E73a/logo.png',
    },
    {
      name: 'Tellor Tributes',
      address: '0x0Ba45A8b5d5575935B8158a88C631E9F9C95a2e5',
      symbol: 'TRB',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0Ba45A8b5d5575935B8158a88C631E9F9C95a2e5/logo.png',
    },
    {
      name: 'Trustcoin',
      address: '0xCb94be6f13A1182E4A4B6140cb7bf2025d28e41B',
      symbol: 'TRST',
      decimals: 6,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xCb94be6f13A1182E4A4B6140cb7bf2025d28e41B/logo.png',
    },
    {
      name: 'BiLira',
      address: '0x2C537E5624e4af88A7ae4060C022609376C8D0EB',
      symbol: 'TRYB',
      decimals: 6,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2C537E5624e4af88A7ae4060C022609376C8D0EB/logo.png',
    },
    {
      name: 'TrueUSD',
      address: '0x0000000000085d4780B73119b644AE5ecd22b376',
      symbol: 'TUSD',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/logo.png',
    },
    {
      name: 'UniBright',
      address: '0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e',
      symbol: 'UBT',
      decimals: 8,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x8400D94A5cb0fa0D041a3788e395285d61c9ee5e/logo.png',
    },
    {
      name: 'UMA Voting Token v1',
      address: '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828',
      symbol: 'UMA',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828/logo.png',
    },
    {
      name: 'Uniswap',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      symbol: 'UNI',
      decimals: 18,
      chainId: 1,
      logoURI: 'https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/',
    },
    {
      name: 'PieDAO USD++',
      address: '0x9A48BD0EC040ea4f1D3147C025cd4076A2e71e3e',
      symbol: 'USD++',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9A48BD0EC040ea4f1D3147C025cd4076A2e71e3e/logo.png',
    },
    {
      name: 'USDCoin',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      symbol: 'USDC',
      decimals: 6,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    },
    {
      name: 'StableUSD',
      address: '0xA4Bdb11dc0a2bEC88d24A3aa1E6Bb17201112eBe',
      symbol: 'USDS',
      decimals: 6,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA4Bdb11dc0a2bEC88d24A3aa1E6Bb17201112eBe/logo.png',
    },
    {
      name: 'Tether USD',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      symbol: 'USDT',
      decimals: 6,
      chainId: 1,
      logoURI: 'https://user-images.githubusercontent.com/57688920/138106845-a2ffe655-72bc-4158-a4cd-54acca86b62e.png',
    },
    {
      name: 'dForce',
      address: '0xeb269732ab75A6fD61Ea60b06fE994cD32a83549',
      symbol: 'USDx',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xeb269732ab75A6fD61Ea60b06fE994cD32a83549/logo.png',
    },
    {
      name: 'Veritaseum',
      address: '0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374',
      symbol: 'VERI',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374/logo.png',
    },
    {
      name: 'Wrapped BTC',
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      symbol: 'WBTC',
      decimals: 8,
      chainId: 1,
      logoURI: 'https://user-images.githubusercontent.com/57688920/138107064-9d6be667-eef8-489d-816f-9c47c7c09fd6.png',
    },
    {
      name: 'Wrapped CryptoKitties',
      address: '0x09fE5f0236F0Ea5D930197DCE254d77B04128075',
      symbol: 'WCK',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x09fE5f0236F0Ea5D930197DCE254d77B04128075/logo.png',
    },
    {
      name: 'Wrapped Ether',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      symbol: 'WETH',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'CryptoFranc',
      address: '0xB4272071eCAdd69d933AdcD19cA99fe80664fc08',
      symbol: 'XCHF',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB4272071eCAdd69d933AdcD19cA99fe80664fc08/logo.png',
    },
    {
      name: 'XIO Network',
      address: '0x0f7F961648aE6Db43C75663aC7E5414Eb79b5704',
      symbol: 'XIO',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0f7F961648aE6Db43C75663aC7E5414Eb79b5704/logo.png',
    },
    {
      name: '0x Protocol Token',
      address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
      symbol: 'ZRX',
      decimals: 18,
      chainId: 1,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xE41d2489571d322189246DaFA5ebDe1F4699F498/logo.png',
    },
    {
      name: 'Wrapped Ether',
      address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      symbol: 'WETH',
      decimals: 18,
      chainId: 3,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'Dai Stablecoin',
      address: '0xaD6D458402F60fD3Bd25163575031ACDce07538D',
      symbol: 'DAI',
      decimals: 18,
      chainId: 3,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    },
    {
      name: 'Uniswap',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      symbol: 'UNI',
      decimals: 18,
      chainId: 3,
      logoURI: 'https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/',
    },
    {
      name: 'YouBet',
      symbol: 'UBET',
      address: '0x98cf308ff848e00b79d9fdea49e0101fecee8223',
      decimals: 18,
      chainId: 3,
      logoURI:
        'https://firebasestorage.googleapis.com/v0/b/monoxd.appspot.com/o/tokens%2Fubet.png?alt=media&token=78f6010c-d43b-4c99-9ff6-d55bf2975350',
    },
    {
      name: 'Dai Stablecoin',
      address: '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
      symbol: 'DAI',
      decimals: 18,
      chainId: 4,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735/logo.png',
    },
    {
      name: 'Maker',
      address: '0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85',
      symbol: 'MKR',
      decimals: 18,
      chainId: 4,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85/logo.png',
    },
    {
      name: 'Uniswap',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      symbol: 'UNI',
      decimals: 18,
      chainId: 4,
      logoURI: 'https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/',
    },
    {
      name: 'Wrapped Ether',
      address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      symbol: 'WETH',
      decimals: 18,
      chainId: 4,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'Uniswap',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      symbol: 'UNI',
      decimals: 18,
      chainId: 5,
      logoURI: 'https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/',
    },
    {
      name: 'Wrapped Ether',
      address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      symbol: 'WETH',
      decimals: 18,
      chainId: 5,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'Wrapped Ether',
      address: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
      symbol: 'WETH',
      decimals: 18,
      chainId: 42,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'Dai Stablecoin',
      address: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
      symbol: 'DAI',
      decimals: 18,
      chainId: 42,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    },
    {
      name: 'Uniswap',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      symbol: 'UNI',
      decimals: 18,
      chainId: 42,
      logoURI: 'https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/',
    },
    {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
      chainId: 80001,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    },
    {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    },
    {
      name: 'Avax',
      symbol: 'AVAX',
      decimals: 18,
      chainId: 43113,
      logoURI:
        'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    },
    {
      name: 'AnRKey X',
      address: '0x554f074d9cCda8F483d1812d4874cBebD682644E',
      symbol: '$ANRX',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/13415/small/anrkey.jpg?1608311301',
    },
    {
      name: 'decentral.games',
      address: '0x2a93172c8DCCbfBC60a39d56183B7279a2F647b4',
      symbol: '$DG',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/sameepsi/quickswap-default-token-list/master/assets/dg.jpg',
    },
    {
      name: 'Aave',
      address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
      symbol: 'AAVE',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://user-images.githubusercontent.com/87996012/140970805-1bd78949-fe05-4b10-a70a-4f73918e0596.png',
    },
    {
      name: 'Adamant',
      address: '0xc3FdbadC7c795EF1D6Ba111e06fF8F16A20Ea539',
      symbol: 'ADDY',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://adamant.finance/img/adamant.png',
    },
    {
      name: 'Adshares',
      address: '0x598e49f01bEfeB1753737934a5b11fea9119C796',
      symbol: 'ADS',
      decimals: 11,
      chainId: 137,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1883.png',
    },
    {
      name: 'AGA Token',
      address: '0x033d942A6b495C4071083f4CDe1f17e986FE856c',
      symbol: 'AGA',
      decimals: 4,
      chainId: 137,
      logoURI: 'https://i.imgur.com/R0aQlym.png',
    },
    {
      name: 'AGA Rewards',
      address: '0xF84BD51eab957c2e7B7D646A3427C5A50848281D',
      symbol: 'AGAr',
      decimals: 8,
      chainId: 137,
      logoURI: 'https://i.imgur.com/06BkcTT.png',
    },
    {
      name: 'Akash Network',
      address: '0xf14fbC6B30e2c4BC05A1D4fbE34bf9f14313309D',
      symbol: 'AKT',
      decimals: 6,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/12785/small/akash-logo.png?1615447676',
    },
    {
      name: 'Aluna',
      address: '0xa8fcEe762642f156b5D757b6FabC36E06b6d4A1A',
      symbol: 'ALN',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14379/small/uaLoLU8c_400x400_%281%29.png?1627873106',
    },
    {
      name: 'Angel',
      address: '0x0B6afe834dab840335F87d99b45C2a4bd81A93c7',
      symbol: 'ANGEL',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/17739/small/Polylauncher_-_200_x_200.png?1629121147',
    },
    {
      name: 'Anyswap',
      address: '0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8',
      symbol: 'ANY',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/anyswap/Brand-assets/master/logo/c-128-white.svg',
    },
    {
      name: 'ARIANEE',
      address: '0x46F48FbdedAa6F5500993BEDE9539ef85F4BeE8e',
      symbol: 'ARIA20',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://aria.fyi/images/Aria_Logo_256.png',
    },
    {
      name: 'Cosmos',
      address: '0xac51C4c48Dc3116487eD4BC16542e27B5694Da1b',
      symbol: 'ATOM',
      decimals: 6,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png?1555657960',
    },
    {
      name: 'Avalanche Token',
      address: '0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b',
      symbol: 'AVAX',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818',
    },
    {
      name: 'BABYQUICK',
      address: '0x9a05D1FF699ea187Dc8523E333eD63503f0d82db',
      symbol: 'BABYQUICK',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://pbs.twimg.com/profile_images/1428328610444742660/4fa6uMzp_400x400.jpg',
    },
    {
      name: 'Bella',
      address: '0x28C388FB1F4fa9F9eB445f0579666849EE5eeb42',
      symbol: 'BEL',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/12478/small/Bella.png?1602230054',
    },
    {
      name: 'beefy.finance',
      address: '0xFbdd194376de19a88118e84E279b977f165d01b8',
      symbol: 'BIFI',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/beefyfinance/beefy-app/prod/src/images/single-assets/BIFI.png',
    },
    {
      name: 'BLOK',
      address: '0x229b1b6C23ff8953D663C4cBB519717e323a0a84',
      symbol: 'BLOK',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://user-images.githubusercontent.com/87996012/142901971-10d22b41-4229-4d15-be53-0b485a11cfd9.jpg',
    },
    {
      name: 'Binance Token',
      address: '0x5c4b7CCBF908E64F32e12c6650ec0C96d717f03F',
      symbol: 'BNB',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615',
    },
    {
      name: 'Celsius',
      address: '0xD85d1e945766Fea5Eda9103F918Bd915FbCa63E6',
      symbol: 'CEL',
      decimals: 4,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/3263/small/CEL_logo.png?1609598753',
    },
    {
      name: 'ChainGuardians Governance Token',
      address: '0x2Ab4f9aC80F33071211729e45Cfc346C1f8446d5',
      symbol: 'CGG',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14326/small/cgg_logo.png?1615429976',
    },
    {
      name: 'loserchick',
      address: '0x9e725Cf7265D12fd5f59499AFf1258CA92CAc74d',
      symbol: 'CHICK',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.loli.net/2021/07/28/K83jnTJzG9bq7Xt.png',
    },
    {
      name: 'Crosschain IOTX',
      address: '0x300211Def2a644b036A9bdd3e58159bb2074d388',
      symbol: 'CIOTX',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/iotexproject/iotex-token-metadata/master/images/io1nxetpma4de3wx6tqcgxdtj5wc64a24t64dc76s.png',
    },
    {
      name: 'Centaur Token',
      address: '0xdae89dA41a96956e9e70320Ac9c0dd077070D3a5',
      symbol: 'CNTR',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/12743/small/logo_%2898%29.png?1602630445',
    },
    {
      name: 'Furucombo',
      address: '0x6DdB31002abC64e1479Fc439692F7eA061e78165',
      symbol: 'COMBO',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/13629/small/COMBO_token_ol.png?1610701537',
    },
    {
      name: 'Compound',
      address: '0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c',
      symbol: 'COMP',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png',
    },
    {
      name: 'CRV',
      address: '0x172370d5Cd63279eFa6d502DAB29171933a610AF',
      symbol: 'CRV',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/12124/small/Curve.png?1597369484',
    },
    {
      name: 'DeFi11',
      address: '0xc58158c14D4757EF36Ce25e493758F2fcEEDec5D',
      symbol: 'D11',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11147.png',
    },
    {
      name: 'Dai Stablecoin',
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      symbol: 'DAI',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    },
    {
      name: 'DEGEN Index',
      address: '0x8a2870fb69A90000D6439b7aDfB01d4bA383A415',
      symbol: 'DEGEN',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/sameepsi/quickswap-default-token-list/master/assets/DEGEN_LOGO.png',
    },
    {
      name: 'DeHive.finance',
      address: '0x5fCB9de282Af6122ce3518CDe28B7089c9F97b26',
      symbol: 'DHV',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14926/small/logo_200x200.png?1626181831',
    },
    {
      name: 'DinoSwap',
      address: '0xAa9654BECca45B5BDFA5ac646c939C62b527D394',
      symbol: 'DINO',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/17103/small/DINO.png?1626244014',
    },
    {
      name: 'Dark Matter Token',
      address: '0xd28449BB9bB659725aCcAd52947677ccE3719fD7',
      symbol: 'DMT',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://darkmatter.finance/i/favicon/512x512.png',
    },
    {
      name: 'DinoX Coin',
      address: '0xcaF5191fc480F43e4DF80106c7695ECA56E48B18',
      symbol: 'DNXC',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://dinox.io/images/asset_icon_dnx.png',
    },
    {
      name: 'DSLA',
      address: '0xa0E390e9ceA0D0e8cd40048ced9fA9EA10D71639',
      symbol: 'DSLA',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://storage.googleapis.com/stacktical-public/dsla.png',
    },
    {
      name: 'LoserchickEgg',
      address: '0x245e5ddb65eFea6522Fa913229dF1f4957fB2e21',
      symbol: 'EGG',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.loli.net/2021/07/28/bGfpAaC6idUZVNP.png',
    },
    {
      name: 'Eleven.finance',
      address: '0xAcD7B3D9c10e97d0efA418903C0c7669E702E4C0',
      symbol: 'ELE',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14541/small/eleven_finance_logo.png?1616895791',
    },
    {
      name: 'Elementeum',
      address: '0x07738Eb4ce8932CA961c815Cb12C9d4ab5Bd0Da4',
      symbol: 'ELET',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://etherlegends.com/ELET.png',
    },
    {
      name: 'EthermonToken',
      address: '0xd6A5aB46ead26f49b03bBB1F9EB1Ad5c1767974a',
      symbol: 'EMON',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/9651.png',
    },
    {
      name: 'Ethernity Chain',
      address: '0x0E50BEA95Fe001A370A4F1C220C49AEdCB982DeC',
      symbol: 'ERN',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14238/small/ethernity_logo.png?1615189750',
    },
    {
      name: 'SifChain',
      address: '0xa7051C5a22d963b81D71C2BA64D46a877fBc1821',
      symbol: 'EROWAN',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14044/small/EROWAN.png?1614656300',
    },
    {
      name: 'Wrapped Ether',
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      symbol: 'WETH',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'ETHA',
      address: '0x59E9261255644c411AfDd00bD89162d09D862e38',
      symbol: 'ETHA',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14141/small/etha_logo200x200.png?1614646986',
    },
    {
      name: 'EASY V2',
      address: '0x34C1b299A74588D6Abdc1b85A53345A48428a521',
      symbol: 'EZ',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://user-images.githubusercontent.com/87996012/140980066-b99b55c5-f858-49d2-8bb5-6dcf79afdb3c.png',
    },
    {
      name: 'Fear NFTs',
      address: '0xa2CA40DBe72028D3Ac78B5250a8CB8c404e7Fb8C',
      symbol: 'FEAR',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/15825/small/fear-logo-400-400.png?1625552865',
    },
    {
      name: 'Future of Finance Fund',
      address: '0x9aCeB6f749396d1930aBc9e263eFc449E5e82c13',
      symbol: 'FFF',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/15761/small/xg1NFl0.png?1621825451',
    },
    {
      name: 'Fish',
      address: '0x3a3Df212b7AA91Aa0402B9035b098891d276572B',
      symbol: 'FISH',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.imgur.com/ncleoTN.png',
    },
    {
      name: 'The Force Token',
      address: '0x546b4c391520E6652897c65153074088BFC0A909',
      symbol: 'FOR',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/8242/small/for.png?1606195375',
    },
    {
      name: 'Frax',
      address: '0x104592a158490a9228070E0A8e5343B499e125D0',
      symbol: 'FRAX',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://avatars.githubusercontent.com/u/56005256?s=200&v=4',
    },
    {
      name: 'FalconSwap Token',
      address: '0xad5dc12E88C6534Eea8cFe2265851D9d4A1472AD',
      symbol: 'FSW',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://falconswap.com/assets/img/logo/logo.png',
    },
    {
      name: 'Frax Share',
      address: '0x3e121107F6F22DA4911079845a470757aF4e1A1b',
      symbol: 'FXS',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://avatars.githubusercontent.com/u/56005256?s=200&v=4',
    },
    {
      name: 'GAME Credits',
      address: '0x8d1566569d5b695d44a9a234540f68D393cDC40D',
      symbol: 'GAME',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.imgur.com/IIUglm9.png?1',
    },
    {
      name: 'GemBites',
      address: '0xbe9512e2754cb938dd69Bbb96c8a09Cb28a02D6D',
      symbol: 'GBTS',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.ibb.co/D7nDtJK/Gem-Bites32x32.png',
    },
    {
      name: 'Gains V2',
      address: '0x7075cAB6bCCA06613e2d071bd918D1a0241379E2',
      symbol: 'GFARM2',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://user-images.githubusercontent.com/87996012/140980740-3247c13f-3726-4b1e-8989-a7d1592268b0.png',
    },
    {
      name: 'Aavegotchi GHST Token',
      address: '0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7',
      symbol: 'GHST',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://aavegotchi.com/images/ghsttoken.svg',
    },
    {
      name: 'GAMEE',
      address: '0xcf32822ff397Ef82425153a9dcb726E5fF61DCA7',
      symbol: 'GMEE',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14716/small/gmee-200x200.png?1621827468',
    },
    {
      name: 'Gnosis Token',
      address: '0x5FFD62D3C3eE2E81C00A7b9079FB248e7dF024A8',
      symbol: 'GNO',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6810e776880C02933D47DB1b9fc05908e5386b96/logo.png',
    },
    {
      name: 'Helmet.insure on Polygon',
      address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      symbol: 'Guard',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.imgur.com/VtDIzy7.png',
    },
    {
      name: 'HEXX',
      address: '0x23D29D30e35C5e8D321e1dc9A8a61BFD846D4C5C',
      symbol: 'HEX',
      decimals: 8,
      chainId: 137,
      logoURI: 'https://hex.com/favicon.png',
    },
    {
      name: 'HONOR',
      address: '0xb82A20B4522680951F11c94c54B8800c1C237693',
      symbol: 'HONOR',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/10620.png',
    },
    {
      name: 'Huobi Token',
      address: '0xA731349fa468614c1698fc46ebf06Da6F380239e',
      symbol: 'HT',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/2822/small/huobi-token-logo.png?1547036992',
    },
    {
      name: 'iFARM',
      address: '0xab0b2ddB9C7e440fAc8E140A89c0dbCBf2d7Bbff',
      symbol: 'iFARM',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/harvestfi/assets/main/farm-logo.png',
    },
    {
      name: 'IG Gold',
      address: '0xe6FC6C7CB6d2c31b359A49A33eF08aB87F4dE7CE',
      symbol: 'IGG',
      decimals: 6,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/7697/small/N7aEdYrY_400x400.png?1561587437',
    },
    {
      name: 'Impermax',
      address: '0x60bB3D364B765C497C8cE50AE0Ae3f0882c5bD05',
      symbol: 'IMX',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://polygon.impermax.finance/build/assets/icons/0x60bb3d364b765c497c8ce50ae0ae3f0882c5bd05.png',
    },
    {
      name: 'IOI Token',
      address: '0xAF24765F631C8830B5528B57002241eE7eef1C14',
      symbol: 'IOI',
      decimals: 6,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/15952/small/IOI.jpg?1622514420',
    },
    {
      name: 'IRISnet',
      address: '0x3dc6052a693E4a2fc28Eb2Ea12fe0CfD3BD221D1',
      symbol: 'IRIS',
      decimals: 6,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/5135/small/IRIS.png?1557999365',
    },
    {
      name: 'Jarvis Reward Token',
      address: '0x596eBE76e2DB4470966ea395B0d063aC6197A8C5',
      symbol: 'JRT',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/b8086dbc7040582d1412effe7a951914d4a96eef/blockchains/ethereum/assets/0x8A9C67fee641579dEbA04928c4BC45F66e26343A/logo.png',
    },
    {
      name: 'Forest Knight',
      address: '0x4455eF8B4B4A007a93DaA12DE63a47EEAC700D9D',
      symbol: 'KNIGHT',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/18441/small/Coin_Forest_Knight_200x200.png?1632480031',
    },
    {
      name: 'kogecoin.io',
      address: '0x13748d548D95D78a3c83fe3F32604B4796CFfa23',
      symbol: 'KOGECOIN',
      decimals: 9,
      chainId: 137,
      logoURI: 'https://kogefarm.io/koge-logo-01.png',
    },
    {
      name: 'Kommunitas',
      address: '0xC004e2318722EA2b15499D6375905d75Ee5390B8',
      symbol: 'KOM',
      decimals: 8,
      chainId: 137,
      logoURI: 'https://i.imgur.com/KTS2F7I.png',
    },
    {
      name: 'Krill',
      address: '0x05089C9EBFFa4F0AcA269e32056b1b36B37ED71b',
      symbol: 'Krill',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.imgur.com/REyP9yh.jpg',
    },
    {
      name: 'ChainLink Token',
      address: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
      symbol: 'LINK',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png',
    },
    {
      name: 'Wrapped LUNA Token',
      address: '0x24834BBEc7E39ef42f4a75EAF8E5B6486d3F0e57',
      symbol: 'LUNA',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/8284/small/luna1557227471663.png?1567147072',
    },
    {
      name: 'Matic Aave interest bearing AAVE',
      address: '0x823CD4264C1b951C9209aD0DeAea9988fE8429bF',
      symbol: 'maAAVE',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://aavegotchi.com/images/matokens/maAAVE.svg',
    },
    {
      name: 'Matic Aave interest bearing DAI',
      address: '0xE0b22E0037B130A9F56bBb537684E6fA18192341',
      symbol: 'maDAI',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://aavegotchi.com/images/matokens/maDAI.svg',
    },
    {
      name: 'MAI',
      address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
      symbol: 'MAI',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/0xlaozi/qidao/main/images/mimatic-red.png',
    },
    {
      name: 'Matic Aave interest bearing LINK',
      address: '0x98ea609569bD25119707451eF982b90E3eb719cD',
      symbol: 'maLINK',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://aavegotchi.com/images/matokens/maLINK.svg',
    },
    {
      name: 'Decentraland MANA',
      address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
      symbol: 'MANA',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0F5D2fB29fb7d3CFeE444a200298f468908cC942/logo.png',
    },
    {
      name: 'Mask Network',
      address: '0x2B9E7ccDF0F4e5B24757c1E1a80e311E34Cb10c7',
      symbol: 'MASK',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14051/small/Mask_Network.jpg?1614050316',
    },
    {
      name: 'Matic Aave interest bearing TUSD',
      address: '0xF4b8888427b00d7caf21654408B7CBA2eCf4EbD9',
      symbol: 'maTUSD',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://aavegotchi.com/images/matokens/maTUSD.svg',
    },
    {
      name: 'Matic Aave interest bearing UNI',
      address: '0x8c8bdBe9CeE455732525086264a4Bf9Cf821C498',
      symbol: 'maUNI',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://aavegotchi.com/images/matokens/maUNI.svg',
    },
    {
      name: 'Matic Aave interest bearing USDC',
      address: '0x9719d867A500Ef117cC201206B8ab51e794d3F82',
      symbol: 'maUSDC',
      decimals: 6,
      chainId: 137,
      logoURI: 'https://aavegotchi.com/images/matokens/maUSDC.svg',
    },
    {
      name: 'Matic Aave interest bearing USDT',
      address: '0xDAE5F1590db13E3B40423B5b5c5fbf175515910b',
      symbol: 'maUSDT',
      decimals: 6,
      chainId: 137,
      logoURI: 'https://aavegotchi.com/images/matokens/maUSDT.svg',
    },
    {
      name: 'Matic Aave interest bearing WETH',
      address: '0x20D3922b4a1A8560E1aC99FBA4faDe0c849e2142',
      symbol: 'maWETH',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://aavegotchi.com/images/matokens/maWETH.svg',
    },
    {
      name: 'Matic Aave interest bearing YFI',
      address: '0xe20f7d1f0eC39C4d5DB01f53554F2EF54c71f613',
      symbol: 'maYFI',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://aavegotchi.com/images/matokens/maYFI.svg',
    },
    {
      name: 'Bytom minted',
      address: '0xA16EbA3b7562FC92597579A80Fe53a92DCab7122',
      symbol: 'mBTM',
      decimals: 8,
      chainId: 137,
      logoURI: 'https://i.imgur.com/q0LZUrw.png',
    },
    {
      name: 'Monsoon Finance',
      address: '0xa25610a77077390A75aD9072A084c5FbC7d43A0d',
      symbol: 'MCASH',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/18632/small/DdcZZeP_%282%29.png?1632716316',
    },
    {
      name: 'MeebMaster.com Token',
      address: '0x64aFDF9e28946419E325d801Fb3053d8B8FFdC23',
      symbol: 'MEEB',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.imgur.com/tmPoZ1D.png',
    },
    {
      name: 'Memecoin',
      address: '0x42dbBd5ae373FEA2FC320F62d44C058522Bb3758',
      symbol: 'MEM',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://media.discordapp.net/attachments/846293892785242143/852874003928449054/mem_gold_with_white_5.png',
    },
    {
      name: 'Morpheus Infrastructure Token',
      address: '0x31042A4E66eDa0d12143ffc8cC1552D611dA4cbA',
      symbol: 'MITx',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/3164/small/mitx.png?1604888269',
    },
    {
      name: 'Ocean Token',
      address: '0x282d8efCe846A88B159800bd4130ad77443Fa1A1',
      symbol: 'mOCEAN',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://oceanprotocol.com/static/4ad704a150d436a1f32d495413fc47cd/favicon-white.png',
    },
    {
      name: 'MODEFI',
      address: '0x8346Ab8d5EA7A9Db0209aEd2d1806AFA0E2c4C21',
      symbol: 'MOD',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://modefi.io/images/modefi256.png',
    },
    {
      name: 'Monavale',
      address: '0x6968105460f67c3BF751bE7C15f92F5286Fd0CE5',
      symbol: 'MONA',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.imgur.com/FR12tmm.jpg',
    },
    {
      name: 'Polywolf',
      address: '0xc56d17dD519e5eB43a19C9759b5D5372115220BD',
      symbol: 'MOON',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.postimg.cc/CxvzF5bJ/moon-black.png',
    },
    {
      name: 'MoonEdge',
      address: '0x7E4c577ca35913af564ee2a24d882a4946Ec492B',
      symbol: 'MOONED',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/17393/small/ME_logo_200_200.png?1627526275',
    },
    {
      name: 'Mobius Token',
      address: '0x2db0Db271a10661e7090b6758350E18F6798a49D',
      symbol: 'MOT',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/18144/small/11322.png?1630668459',
    },
    {
      name: 'MaticVerse',
      address: '0xFEb090FcD433dE479396E82DB8B83a470dbAD3c9',
      symbol: 'Mverse',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://assets.coingecko.com/coins/images/18403/small/A0782-F05-535-C-45-C8-BE4-F-FEBB4-B8-B5933.jpg?1631792934',
    },
    {
      name: 'Nexo',
      address: '0x41b3966B4FF7b427969ddf5da3627d6AEAE9a48E',
      symbol: 'NEXO',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2694.png',
    },
    {
      name: 'NASDEX Token',
      address: '0xE8d17b127BA8b9899a160D9a07b69bCa8E08bfc6',
      symbol: 'NSDX',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/18634/small/nadex.PNG?1632727863',
    },
    {
      name: 'O3 Swap Token',
      address: '0xEe9801669C6138E84bD50dEB500827b776777d28',
      symbol: 'O3',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/15460/small/o3.png?1620904316',
    },
    {
      name: 'OddzToken',
      address: '0x4e830F67Ec499E69930867f9017AEb5B3f629c73',
      symbol: 'ODDZ',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14421/small/img_circle_200x200.png?1617345151',
    },
    {
      name: 'OM',
      address: '0xC3Ec80343D2bae2F8E680FDADDe7C17E71E114ea',
      symbol: 'OM',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://etherscan.io/token/images/mantradao_32.png',
    },
    {
      name: 'Augury Finance',
      address: '0x76e63a3E7Ba1e2E61D3DA86a87479f983dE89a7E',
      symbol: 'OMEN',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://augury.finance/_nuxt/img/omen.b433161.png',
    },
    {
      name: 'OpenOcean',
      address: '0x9d5565dA88e596730522CbC5a918d2A89dbC16d9',
      symbol: 'OOE',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://cloudstorage.openocean.finance/image/ooe_log.png',
    },
    {
      name: 'Orbs',
      address: '0x614389EaAE0A6821DC49062D56BDA3d9d45Fa2ff',
      symbol: 'ORBS',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/4630/small/Orbs.jpg?1547039896',
    },
    {
      name: 'Orbit Bridge Polygon AUTOv2',
      address: '0x7f426F6Dc648e50464a0392E60E1BB465a67E9cf',
      symbol: 'PAUTO',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/13751/small/autofarm_icon_200x200.png?1611494288',
    },
    {
      name: 'Orbit Bridge Polygon Binance Coin',
      address: '0x7e9928aFe96FefB820b85B4CE6597B8F660Fe4F4',
      symbol: 'PBNB',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615',
    },
    {
      name: 'PolkaBridge',
      address: '0x0D6ae2a429df13e44A07Cd2969E085e4833f64A0',
      symbol: 'PBR',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/13744/small/symbol-whitebg200x200.png?1611377553',
    },
    {
      name: 'PERA',
      address: '0xe95fD76CF16008c12FF3b3a937CB16Cd9Cc20284',
      symbol: 'PERA',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/16185/small/Pera.jpg?1623238387',
    },
    {
      name: 'Phoenix Token',
      address: '0x9C6BfEdc14b5C23E3900889436Edca7805170f01',
      symbol: 'PHX',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/17675/small/phx_logo.png?1628832432',
    },
    {
      name: 'PLOT',
      address: '0xe82808eaA78339b06a691fd92E1Be79671cAd8D3',
      symbol: 'PLOT',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.imgur.com/nQDG9AQ.png',
    },
    {
      name: 'PILLAR',
      address: '0xa6b37fC85d870711C56FbcB8afe2f8dB049AE774',
      symbol: 'PLR',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/809/small/v2logo-1.png?1624906282',
    },
    {
      name: 'Polygon BUNNY Token',
      address: '0x4C16f69302CcB511c5Fac682c7626B9eF0Dc126a',
      symbol: 'polyBUNNY',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/PancakeBunny-finance/PolygonBUNNY/main/assets/token-bunny_32x32.png',
    },
    {
      name: 'PolyDoge',
      address: '0x8A953CfE442c5E8855cc6c61b1293FA648BAE472',
      symbol: 'PolyDoge',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://polydoge.com/doge-webpage_files/doge.png',
    },
    {
      name: 'PoolTogether',
      address: '0x25788a1a171ec66Da6502f9975a15B609fF54CF6',
      symbol: 'POOL',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14003/small/PoolTogether.png?1613585632',
    },
    {
      name: 'pSwampy',
      address: '0x5f1657896B38c4761dbc5484473c7A7C845910b6',
      symbol: 'pSwamp',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://swamp.finance/static/frontend/img/symbols/pswamp.svg',
    },
    {
      name: 'PUSD',
      address: '0x9aF3b7DC29D3C4B1A5731408B6A9656fA7aC3b72',
      symbol: 'PUSD',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/16762/small/PUSD-purple-200.png?1624937879',
    },
    {
      name: 'PYR Token',
      address: '0x348e62131fce2F4e0d5ead3Fe1719Bc039B380A9',
      symbol: 'PYR',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14770/small/1617088937196.png?1619414736',
    },
    {
      name: 'Qi Dao',
      address: '0x580A84C73811E1839F75d86d75d88cCa0c241fF4',
      symbol: 'QI',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/0xlaozi/qidao/main/images/qi.png',
    },
    {
      name: 'Quickswap',
      address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
      symbol: 'QUICK',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://user-images.githubusercontent.com/57688920/138870928-8cd677f8-520a-455f-b638-bb986866c924.png',
    },
    {
      name: 'QuickChart',
      address: '0x0Af77B096cbDF53B5c39c2fcff8F14C5E3a36356',
      symbol: 'QuickChart',
      decimals: 9,
      chainId: 137,
      logoURI: 'https://i.imgur.com/jv5A0eX.png',
    },
    {
      name: 'RAMP',
      address: '0xaECeBfcF604AD245Eaf0D5BD68459C3a7A6399c2',
      symbol: 'RAMP',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/12837/small/RAMP-Logo-v2-1000pxsq.png?1617952606',
    },
    {
      name: 'Regen Network',
      address: '0xEc482De9569a5EA3Dd9779039b79e53F15791fDE',
      symbol: 'REGEN',
      decimals: 6,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/16733/small/REGEN.png?1624861317',
    },
    {
      name: 'Zerogoki Token',
      address: '0xB9f9e37c2CdbaFF928C3Da730b02F06fE09aE70E',
      symbol: 'REI',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/17015/small/iconZerogoki.png?1626618921',
    },
    {
      name: 'Relay Token',
      address: '0x904371845Bc56dCbBcf0225ef84a669b2fD6bd0d',
      symbol: 'RELAY',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://starter.xyz/Relay.png',
    },
    {
      name: 'renBTC',
      address: '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501',
      symbol: 'renBTC',
      decimals: 8,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/11370/small/Bitcoin.jpg?1628072791',
    },
    {
      name: 'renDGB',
      address: '0x2628568509E87c4429fBb5c664Ed11391BE1BD29',
      symbol: 'renDGB',
      decimals: 8,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/sameepsi/quickswap-default-token-list/master/assets/renDGB.svg',
    },
    {
      name: 'renDOGE',
      address: '0xcE829A89d4A55a63418bcC43F00145adef0eDB8E',
      symbol: 'renDOGE',
      decimals: 8,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/13796/small/renDOGE.png?1611897869',
    },
    {
      name: 'REVV',
      address: '0x70c006878a5A50Ed185ac4C87d837633923De296',
      symbol: 'REVV',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/12373/small/REVV_TOKEN_Refined_2021_%281%29.png?1627652390',
    },
    {
      name: 'Darwinia',
      address: '0x9C1C23E60B72Bc88a043bf64aFdb16A02540Ae8f',
      symbol: 'Ring',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/9443/small/RING.png?1615271827',
    },
    {
      name: 'rUSD',
      address: '0xfC40a4F89b410a1b855b5e205064a38fC29F5eb5',
      symbol: 'rUSD',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/16184/small/rUSD-Logo-200.png?1623231145',
    },
    {
      name: 'PolyShield',
      address: '0xF239E69ce434c7Fb408b05a0Da416b14917d934e',
      symbol: 'SHI3LD',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/17641/small/QRE5xI0.png?1628741510',
    },
    {
      name: 'Snook',
      address: '0x689f8e5913C158fFB5Ac5aeb83b3C875F5d20309',
      symbol: 'SNK',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/18197/small/snk.png?1630979321',
    },
    {
      name: 'SOL',
      address: '0x7DfF46370e9eA5f0Bad3C4E29711aD50062EA7A4',
      symbol: 'SOL',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/4128/small/coinmarketcap-solana-200.png?1616489452',
    },
    {
      name: 'BSCstarter',
      address: '0x6Ccf12B480A99C54b23647c995f4525D544A7E72',
      symbol: 'START',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://starter.xyz/logo_poly_sym.png',
    },
    {
      name: 'SuperFarm',
      address: '0xa1428174F516F527fafdD146b883bB4428682737',
      symbol: 'SUPER',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14040/small/6YPdWn6.png?1613975899',
    },
    {
      name: 'TrustSwap Token',
      address: '0x3809dcDd5dDe24B37AbE64A5a339784c3323c44F',
      symbol: 'SWAP',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.imgur.com/vZnU36G.png',
    },
    {
      name: 'SportX',
      address: '0x840195888Db4D6A99ED9F73FcD3B225Bb3cB1A79',
      symbol: 'SX',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/sameepsi/quickswap-default-token-list/master/assets/sx.jpg',
    },
    {
      name: 'The Crypto Prophecies',
      address: '0x032F85b8FbF8540a92B986d953e4C3A61C76d39E',
      symbol: 'TCP',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/15054/small/tcp.PNG?1619579195',
    },
    {
      name: 'Cryptomeda',
      address: '0x6286A9e6f7e745A6D884561D88F94542d6715698',
      symbol: 'TECH',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/17983/small/Profile_picture_white.jpg?1630149169',
    },
    {
      name: 'Telcoin',
      address: '0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32',
      symbol: 'TEL',
      decimals: 2,
      chainId: 137,
      logoURI: 'https://user-images.githubusercontent.com/87996012/140971041-2faad369-4b09-495b-86bb-5498502b8e57.jpg',
    },
    {
      name: 'Polytrade',
      address: '0x692AC1e363ae34b6B489148152b12e2785a3d8d6',
      symbol: 'TRADE',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://polygonscan.com/token/images/polytrade_32.png',
    },
    {
      name: 'Unibright',
      address: '0x7FBc10850caE055B27039aF31bD258430e714c62',
      symbol: 'UBT',
      decimals: 8,
      chainId: 137,
      logoURI:
        'https://assets.coingecko.com/coins/images/2707/small/UnibrightLogo_colorful_500x500_preview.png?1547036916',
    },
    {
      name: 'UnirisToken',
      address: '0x3C720206bFaCB2d16fA3ac0ed87D2048Dbc401Fc',
      symbol: 'UCO',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/12330/small/e353ZVj.png?1599112996',
    },
    {
      name: 'UniLend Finance Token',
      address: '0x5B4CF2C120A9702225814E18543ee658c5f8631e',
      symbol: 'UFT',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/12819/small/UniLend_Finance_logo_PNG.png?1602748658',
    },
    {
      name: 'Unreal Governance Token',
      address: '0xBa4c54Ea2d66b904C82847A7d2357d22B857E812',
      symbol: 'UGT',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/200x200/11292.png',
    },
    {
      name: 'Uniswap',
      address: '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
      symbol: 'UNI',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/',
    },
    {
      name: 'USD Coin',
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      symbol: 'USDC',
      decimals: 6,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    },
    {
      name: 'Tether USD',
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      symbol: 'USDT',
      decimals: 6,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    },
    {
      name: 'Wrapped UST Token',
      address: '0x692597b009d13C4049a947CAB2239b7d6517875F',
      symbol: 'UST',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/12681/small/UST.png?1601612407',
    },
    {
      name: 'Vision Token',
      address: '0x034b2090b579228482520c589dbD397c53Fc51cC',
      symbol: 'VISION',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://s3-us-west-2.amazonaws.com/acf-uploads/apyvisionlogo200circle.png',
    },
    {
      name: 'yieldwatch',
      address: '0x09211Dc67f9fe98Fb7bBB91Be0ef05f4a12FA2b2',
      symbol: 'WATCH',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14186/small/WATCH1.png?1614825718',
    },
    {
      name: 'Wrapped BTC',
      address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
      symbol: 'WBTC',
      decimals: 8,
      chainId: 137,
      logoURI: 'https://user-images.githubusercontent.com/57688920/138107064-9d6be667-eef8-489d-816f-9c47c7c09fd6.png',
    },
    {
      name: 'Wrapped BUSD',
      address: '0x87ff96aba480f1813aF5c780387d8De7cf7D8261',
      symbol: 'WBUSD',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/9576/small/BUSD.png?1568947766',
    },
    {
      name: 'Wise Token',
      address: '0xB77e62709e39aD1cbeEBE77cF493745AeC0F453a',
      symbol: 'WISE',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://etherscan.io/token/images/wisetoken_32.png',
    },
    {
      name: 'Wrapped Matic',
      address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      symbol: 'WMATIC',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    },
    {
      name: 'moonwolf.io',
      address: '0x8f18dC399594b451EdA8c5da02d0563c0b2d0f16',
      symbol: 'WOLF',
      decimals: 9,
      chainId: 137,
      logoURI: 'https://i.postimg.cc/PfLb0ssB/wolf-black.png',
    },
    {
      name: 'Wootrade Network',
      address: '0x1B815d120B3eF02039Ee11dC2d33DE7aA4a8C603',
      symbol: 'WOO',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/sameepsi/quickswap-default-token-list/master/assets/wootrade_w.svg',
    },
    {
      name: 'WOWswap',
      address: '0x855D4248672a1fCE482165e8DBE1207b94b1968a',
      symbol: 'WOW',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14101/small/Group-423.png?1614317472',
    },
    {
      name: 'WazirX',
      address: '0x72d6066F486bd0052eefB9114B66ae40e0A6031a',
      symbol: 'WRX',
      decimals: 8,
      chainId: 137,
      logoURI: 'https://etherscan.io/token/images/binance-wrx_32.png',
    },
    {
      name: 'XCAD Token',
      address: '0xA55870278d6389ec5B524553D03C04F5677c061E',
      symbol: 'XCAD',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.imgur.com/jykuRwK.png',
    },
    {
      name: 'X-Cash',
      address: '0x03678f2c2c762DC63c2Bb738c3a837D366eDa560',
      symbol: 'XCash',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://assets.coingecko.com/coins/images/6331/small/5fbb9e5b8f27d74dd8bcb912_xcash_coingecko_logo.png?1606133752',
    },
    {
      name: 'Exeedme',
      address: '0x2fe8733dcb25BFbbA79292294347415417510067',
      symbol: 'XED',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.imgur.com/Kte7hVj.jpg',
    },
    {
      name: 'Persistence',
      address: '0xb3b9c016AD1E9f7EFdAE451b04EF696e05658b32',
      symbol: 'XPRT',
      decimals: 6,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/14582/small/512_Light.png?1617149658',
    },
    {
      name: 'YAMP.FINANCE',
      address: '0x87f654c4b347230C60CAD8d7ea9cF0D7238bcc79',
      symbol: 'YAMP',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://yamp.finance/img/yamp_logo.svg',
    },
    {
      name: 'YAYO Coin',
      address: '0xf7058856f405542cd660e8ce4751248F2d037f2B',
      symbol: 'YAYO',
      decimals: 4,
      chainId: 137,
      logoURI: 'https://raw.githubusercontent.com/YayoCorp/yayo-assets/master/avatar.png',
    },
    {
      name: 'YEL Token',
      address: '0xD3b71117E6C1558c1553305b44988cd944e97300',
      symbol: 'YEL',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://i.imgur.com/cwfndaf.png',
    },
    {
      name: 'YfDAI.finance',
      address: '0x7E7fF932FAb08A0af569f93Ce65e7b8b23698Ad8',
      symbol: 'Yf-DAI',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/12385/small/1619048513068.png?1622193581',
    },
    {
      name: 'yearn.finance',
      address: '0xDA537104D6A5edd53c6fBba9A898708E465260b6',
      symbol: 'YFI',
      decimals: 18,
      chainId: 137,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png',
    },
    {
      name: 'ZeroSwapToken',
      address: '0xfd4959c06FbCc02250952DAEbf8e0Fb38cF9FD8C',
      symbol: 'ZEE',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://user-images.githubusercontent.com/59371077/140568943-8927b275-5068-477e-bd04-1000cc6108c2.png',
    },
    {
      name: 'Zerogoki USD',
      address: '0x5668F6d40E15188045a1dE6295054103C13ffAc1',
      symbol: 'zUSD',
      decimals: 18,
      chainId: 137,
      logoURI: 'https://assets.coingecko.com/coins/images/17028/small/iconUSD.png?1626619046',
    },
    {
      name: 'Dai Stablecoin',
      address: '0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1',
      symbol: 'DAI',
      decimals: 18,
      chainId: 80001,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
    },
    {
      name: 'Ether',
      address: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
      symbol: 'ETH',
      decimals: 18,
      chainId: 80001,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
    {
      name: 'Tether USD',
      address: '0x3813e82e6f7098b9583FC0F33a962D02018B6803',
      symbol: 'USDT',
      decimals: 6,
      chainId: 80001,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
    },
    {
      name: 'Wrapped Matic',
      address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      symbol: 'WMATIC',
      decimals: 18,
      chainId: 80001,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
    },
    {
      name: 'Wrapped Avax',
      address: '0x1d308089a2d1ced3f1ce36b1fcaf815b07217be3',
      symbol: 'WAVAX',
      decimals: 18,
      chainId: 43113,
      logoURI:
        'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
    },
  ],
}

const SWAP_ROUTER_ABI = [
  {
    inputs: [{internalType: 'address', name: '_core', type: 'address'}],
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
    name: 'OwnershipTransferred',
    type: 'event',
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
      {internalType: 'address', name: 'user', type: 'address'},
      {internalType: 'address', name: '_token', type: 'address'},
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
    ],
    name: '_removeLiquidity',
    outputs: [
      {internalType: 'uint256', name: 'poolValue', type: 'uint256'},
      {internalType: 'uint256', name: 'liquidityIn', type: 'uint256'},
      {internalType: 'uint256', name: 'vcashOut', type: 'uint256'},
      {internalType: 'uint256', name: 'tokenOut', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_token', type: 'address'},
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
    ],
    name: 'addLiquidity',
    outputs: [{internalType: 'uint256', name: 'liquidity', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'to', type: 'address'}],
    name: 'addLiquidityETH',
    outputs: [{internalType: 'uint256', name: 'liquidity', type: 'uint256'}],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_token', type: 'address'},
      {internalType: 'uint256', name: 'vcashAmount', type: 'uint256'},
      {internalType: 'uint256', name: 'tokenAmount', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
    ],
    name: 'addLiquidityPair',
    outputs: [{internalType: 'uint256', name: 'liquidity', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'core',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'tokenIn', type: 'address'},
      {internalType: 'address', name: 'tokenOut', type: 'address'},
      {internalType: 'uint256', name: 'amountOut', type: 'uint256'},
    ],
    name: 'getAmountIn',
    outputs: [
      {internalType: 'uint256', name: 'tokenInPrice', type: 'uint256'},
      {internalType: 'uint256', name: 'tokenOutPrice', type: 'uint256'},
      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
      {internalType: 'uint256', name: 'tradeVcashValue', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'tokenIn', type: 'address'},
      {internalType: 'address', name: 'tokenOut', type: 'address'},
      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
    ],
    name: 'getAmountOut',
    outputs: [
      {internalType: 'uint256', name: 'tokenInPrice', type: 'uint256'},
      {internalType: 'uint256', name: 'tokenOutPrice', type: 'uint256'},
      {internalType: 'uint256', name: 'amountOut', type: 'uint256'},
      {internalType: 'uint256', name: 'tradeVcashValue', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'getPool',
    outputs: [
      {internalType: 'uint256', name: 'poolValue', type: 'uint256'},
      {
        internalType: 'uint256',
        name: 'tokenBalanceVcashValue',
        type: 'uint256',
      },
      {internalType: 'uint256', name: 'vcashCredit', type: 'uint256'},
      {internalType: 'uint256', name: 'vcashDebt', type: 'uint256'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_token', type: 'address'},
      {internalType: 'uint256', name: '_price', type: 'uint256'},
      {internalType: 'uint256', name: 'vcashAmount', type: 'uint256'},
      {internalType: 'uint256', name: 'tokenAmount', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
    ],
    name: 'listNewToken',
    outputs: [
      {internalType: 'uint256', name: '_pid', type: 'uint256'},
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'monoXPool',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
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
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'pools',
    outputs: [
      {
        components: [
          {internalType: 'uint256', name: 'pid', type: 'uint256'},
          {internalType: 'uint256', name: 'lastPoolValue', type: 'uint256'},
          {internalType: 'address', name: 'token', type: 'address'},
          {
            internalType: 'enum IMonoswap.PoolStatus',
            name: 'status',
            type: 'uint8',
          },
          {internalType: 'uint112', name: 'vcashDebt', type: 'uint112'},
          {internalType: 'uint112', name: 'vcashCredit', type: 'uint112'},
          {internalType: 'uint112', name: 'tokenBalance', type: 'uint112'},
          {internalType: 'uint256', name: 'price', type: 'uint256'},
          {internalType: 'uint256', name: 'createdAt', type: 'uint256'},
        ],
        internalType: 'struct IMonoswap.PoolInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_token', type: 'address'},
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'minVcashOut', type: 'uint256'},
      {internalType: 'uint256', name: 'minTokenOut', type: 'uint256'},
    ],
    name: 'removeLiquidity',
    outputs: [
      {internalType: 'uint256', name: 'vcashOut', type: 'uint256'},
      {internalType: 'uint256', name: 'tokenOut', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'liquidity', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'minVcashOut', type: 'uint256'},
      {internalType: 'uint256', name: 'minTokenOut', type: 'uint256'},
    ],
    name: 'removeLiquidityETH',
    outputs: [
      {internalType: 'uint256', name: 'vcashOut', type: 'uint256'},
      {internalType: 'uint256', name: 'tokenOut', type: 'uint256'},
    ],
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
    inputs: [{internalType: 'address', name: '_core', type: 'address'}],
    name: 'setCore',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'tokenOut', type: 'address'},
      {internalType: 'uint256', name: 'amountInMax', type: 'uint256'},
      {internalType: 'uint256', name: 'amountOut', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapETHForExactToken',
    outputs: [{internalType: 'uint256', name: 'amountIn', type: 'uint256'}],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'tokenOut', type: 'address'},
      {internalType: 'uint256', name: 'amountOutMin', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapExactETHForToken',
    outputs: [{internalType: 'uint256', name: 'amountOut', type: 'uint256'}],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'tokenIn', type: 'address'},
      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
      {internalType: 'uint256', name: 'amountOutMin', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapExactTokenForETH',
    outputs: [{internalType: 'uint256', name: 'amountOut', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'tokenIn', type: 'address'},
      {internalType: 'address', name: 'tokenOut', type: 'address'},
      {internalType: 'uint256', name: 'amountIn', type: 'uint256'},
      {internalType: 'uint256', name: 'amountOutMin', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapExactTokenForToken',
    outputs: [{internalType: 'uint256', name: 'amountOut', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'tokenIn', type: 'address'},
      {internalType: 'uint256', name: 'amountInMax', type: 'uint256'},
      {internalType: 'uint256', name: 'amountOut', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapTokenForExactETH',
    outputs: [{internalType: 'uint256', name: 'amountIn', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'tokenIn', type: 'address'},
      {internalType: 'address', name: 'tokenOut', type: 'address'},
      {internalType: 'uint256', name: 'amountInMax', type: 'uint256'},
      {internalType: 'uint256', name: 'amountOut', type: 'uint256'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'deadline', type: 'uint256'},
    ],
    name: 'swapTokenForExactToken',
    outputs: [{internalType: 'uint256', name: 'amountIn', type: 'uint256'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_token', type: 'address'}],
    name: 'tokenInsurance',
    outputs: [{internalType: 'uint256', name: 'coverage', type: 'uint256'}],
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
]

const ERC20Abi = [
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

const VUNIT_ADDRESS = '0x632fbF85F77978437073a8CE5CEEC29e3209514c'
const POOL_ADDRESS = '0xE37d8F265d3Dd3234C947300bD86681F8587e61b'
const DISTRIBUTOR_ADDRESS = '0x78c5B52a59729c4b0Ab646c4902dF1ec959E7fE1'
const sVUNIT_ADDRESS = '0xA1d476d66867e6692aFB46887Bbae84180E2b871'
const STAKING_ADDRESS = '0x79D13d36d90AD54d4734313252b7eAc56784B231'
const STAKE_ADDRESS = '0xa1dB2EedB8A247B94f5DD0654fb3ebd5490AfBA6'
const BOND_CALCULATOR_ADDRESS = '0x266aC667206820058EFb02DE646F159057f7a321'
const MONO_ADDRESS = '0x05323017c00874198Cf1b0832922074BeEA0db83'
const SWAP_ADDRESS = '0x67b746E7bCef1341017A9400Ac33eceD1778f0C9'
const SWAP_ROUTER_ADDRESS = '0x9Bd0254B0a400aa6b56C022D76f00FDe66FB48Aa'
const networkId = 137

const poolsInfo = [
  {
    pid: 2,
    lastPoolValue: '10812921961297365716609',
    token: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    status: 2,
    vcashDebt: '0',
    vcashCredit: '101690764284879646732',
    tokenBalance: '10204640756',
    price: '1059625546126285477259264314934',
  },
  {
    pid: 4,
    lastPoolValue: '710991351226527590038',
    token: '0x05323017c00874198Cf1b0832922074BeEA0db83',
    status: 1,
    vcashDebt: '0',
    vcashCredit: '75152445418712985817',
    tokenBalance: '1635982715002667779977',
    price: '434657141725444496',
  },
  {
    pid: 3,
    lastPoolValue: '12303679525288351162791',
    token: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    status: 2,
    vcashDebt: '0',
    vcashCredit: '344202265085659104438',
    tokenBalance: '10819525432634435575',
    price: '1130620585146552234027',
  },
  {
    pid: 1,
    lastPoolValue: '17056936641145084971340',
    token: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    status: 2,
    vcashDebt: '643219940432',
    vcashCredit: '0',
    tokenBalance: '16096494501',
    price: '1059667782990180696100142451983',
  },
  {
    pid: 0,
    lastPoolValue: '1150028237065965208593',
    token: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    status: 2,
    vcashDebt: '0',
    vcashCredit: '18593653654097659855',
    tokenBalance: '2352124165765024577446',
    price: '488931772312249675',
  },
]

const VCASH = {
  name: 'Virtual Unit',
  symbol: 'vUNIT',
  decimals: 18,
  chainId: networkId,
  address: '0x632fbF85F77978437073a8CE5CEEC29e3209514c',
}

const bondList = [
  {
    token1: {
      name: 'USD Coin',
      symbol: 'USDC',
      chainId: networkId,
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      decimals: 6,
    },
    token2: {},
    bondABI: BondContractAbi,
    bondAddress: '0x1FC976Bdb9dCA3d5125687656F40C9f16Be5E7d6',
    reserveAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    bondRoute: '7day-usdc',
    bondName: 'USDC 7-day',
    period: 7,
  },
  {
    token1: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      chainId: networkId,
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      decimals: 18,
    },
    token2: {},
    isWethBond: true,
    bondABI: wETHBondContractAbi,
    bondAddress: '0x2535833B07cECfd67d7a12aA4552cB7bbCf20bE3',
    reserveAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    bondRoute: '7day-weth',
    bondName: 'WETH 7-day',
    period: 7,
  },
  {
    token1: {
      name: 'Tether USD',
      symbol: 'USDT',
      chainId: networkId,
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      decimals: 6,
    },
    token2: {},
    bondABI: BondContractAbi,
    bondAddress: '0xF91e189ee81afa32ff6FB2Ba0070594042d0f73B',
    reserveAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    bondRoute: '7day-usdt',
    bondName: 'USDT 7-day',
    period: 7,
  },
  {
    token1: VCASH,
    token2: {
      name: 'USD Coin',
      symbol: 'USDC',
      chainId: networkId,
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      decimals: 6,
    },
    isLP: true,
    bondABI: VUSDTLPBondContractAbi,
    bondAddress: '0xfbF656d2b7ec0C0385e080326FE9EA4Efcbe1B0d',
    reserveAddress: '0xae67289a092387184f6286788a6c8c6d8a8abe79',
    bondRoute: '7day-vunit-usdc-lp',
    bondName: 'vUnit-USDC Sushi LP 7-day',
    period: 7,
  },
  {
    token1: VCASH,
    token2: {
      name: 'USD Coin',
      symbol: 'USDC',
      chainId: networkId,
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      decimals: 6,
    },
    isLP: true,
    bondABI: VUSDTLPBondContractAbi,
    bondAddress: '0x008E2aA55e3f93B10454be0a59c8C2826828C2f0',
    reserveAddress: '0xae67289a092387184f6286788a6c8c6d8a8abe79',
    bondRoute: '30day-vunit-usdc-lp-30day',
    bondName: 'vUnit-USDC Sushi LP 30-day',
    period: 30,
  },
  {
    token1: VCASH,
    token2: {
      name: 'USD Coin',
      symbol: 'USDC',
      chainId: networkId,
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      decimals: 6,
    },
    isLP: true,
    bondABI: VUSDTLPBondContractAbi,
    bondAddress: '0x260D4bd384718F93402dB522552577B8225C7497',
    reserveAddress: '0xae67289a092387184f6286788a6c8c6d8a8abe79',
    bondRoute: '1year-vunit-usdc-lp',
    bondName: 'vUnit-USDC Sushi LP 1-year',
    period: 365,
  },
  {
    token1: VCASH,
    token2: {},
    isWethBond: true,
    isvUnitBond: true,
    bondABI: wETHBondContractAbi,
    bondAddress: '0x30934326F797B95ce71400846551C1b47a4e956c',
    reserveAddress: VCASH.address,
    bondRoute: '30day-vunit',
    bondName: 'vUNIT 30-day Staking',
    period: 30,
  },
  {
    token1: VCASH,
    token2: {},
    isWethBond: true,
    isvUnitBond: true,
    bondABI: wETHBondContractAbi,
    bondAddress: '0x0fB12a9C344287704d7A4247C61387Bf3E22d90F',
    reserveAddress: VCASH,
    bondRoute: '1year-vunit',
    bondName: 'vUNIT 1-year Staking',
    period: 365,
  },
]

const MAINNNET_BACKEND_URL = 'https://api.monox.finance/'
const network = 'polygon'

const MAIN_CURRENCY = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
  chainId: networkId,
  status: 2,
  // logoURI: IMAGEURL?.WMATIC,
}
const MONOData = {
  name: 'Mono',
  symbol: 'MONO',
  address: '0x05323017c00874198Cf1b0832922074BeEA0db83',
  decimals: 18,
  chainId: networkId,
  // logoURI: IMAGEURL?.MONO,
}
const vCASHData = {
  name: 'Virtual Unit',
  symbol: 'vUNIT',
  decimals: 18,
  chainId: networkId,
  // logoURI: IMAGEURL?.VUNIT,
  address: '0x632fbF85F77978437073a8CE5CEEC29e3209514c',
}

const WSS_URL = 'wss://rpc.ankr.com/polygon/ws/67aae01450ddfae267cecaf7a021a2aebbf6be570816d9aabf19d3c735132ebe'

async function get(path, chainId = DEFAULT_NETWORK_ID, params = {}) {
  const endPoint = MAINNNET_BACKEND_URL

  const response = await axios({
    method: 'get',
    url: `${endPoint}/${path}`,
    params,
    responseType: 'json',
  })
    .then(res => res.data)
    .catch(e => {
      return {
        hasError: true,
        ...e,
      }
    })
  return response
}

async function main() {
  const App = await init_ethers()
  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const poolsContract = new ethers.Contract(POOL_ADDRESS, POOLS_CONTRACT, App.provider)
  const stakeContract = new ethers.Contract(STAKE_ADDRESS, STAKE_CONTRACT, App.provider)
  const swapRouterContract = new ethers.Contract(SWAP_ROUTER_ADDRESS, SWAP_ROUTER_ABI, App.provider)
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

  const prices = await getMaticPrices()
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
    `<a href='https://bscscan.com/address/${VUNIT_ADDRESS}' target='_blank'>${rewardTokenTicker}</a> Price: $${formatMoney(
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
        `${
          bondData.bondName === 'WETH 7-day'
            ? formatMoney(bondData.bondDiscount * 100)
            : formatMoney(bondData.bondDiscount)
        }% ROI`,
        bondData.bondName === 'WETH 7-day'
          ? calculateApy(formatMoney(bondData.bondDiscount * 100), bondData.period)
          : calculateApy(formatMoney(bondData.bondDiscount), bondData.period),
      ]
    }),
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'

  _print_link(`Stake ${parseFloat(userVUnitBalance.toString()).toFixed(4)} ${rewardTokenTicker}`, approveAndStakeVUNIT)
  _print_link(`Unstake ${parseFloat(userStakingBalance.toString()).toFixed(4)} ${rewardTokenTicker}`, unstakeVUNIT)
  _print(`\n`)

  hideLoading()
  const tokenList = lodash.uniqBy(uniswapTokens.tokens, 'address')
  const tokensListWithStatus = []
  const filteredTokenList = lodash.uniqBy(
    uniswapTokens.tokens.filter(t => t.chainId === (networkId || chainId)),
    'address'
  )
  const poolList = await getPoolList()
  const filteredTokens = filteredTokenList

  const getERC20Token = address => {
    const signer = App.provider.getSigner()
    const contract = new ethers.Contract(address, ERC20Abi, signer)
    return contract
  }

  const getToken = (ERC20TokenAddress, isVault = false) => {
    // swapRouterContract?.pools(ERC20TokenAddress).then(poolsData => {
    // })
    return getERC20Token(ERC20TokenAddress)
  }

  const onGetToken = async (address, onlySearchTokenList) => {
    const isAddressSearch = isAddress(address)
    const userTokens = Object.values({})
    const data = tokensListWithStatus.length
      ? tokensListWithStatus
      : [...filteredTokens, ...userTokens, MAIN_CURRENCY, vCASHData, MONOData]

    poolList?.forEach(async pool => {
      const index = data.findIndex(token => token?.address === pool?.token)
      if (index === -1 && pool?.token !== MONOData?.address) {
        if (pool?.name && pool?.symbol) {
          data.push({
            name: pool?.name,
            symbol: pool?.symbol,
            status: pool?.status,
            logoURI: pool?.logoURI,
            notInList: true,
            chainId: networkId || chainId,
            address: pool?.token,
            decimals: parseInt(pool?.length),
          })
        }
      } else {
        const searchedToken = getToken(pool?.token)
        const searchedTokenName = await searchedToken?.name()
        const searchedTokenSymbol = await searchedToken?.symbol()
        const searchedTokenDecimals = await searchedToken?.decimals()
        const details = {
          name: searchedTokenName,
          symbol: searchedTokenSymbol,
          logoURI: undefined,
          address: searchedToken?._address,
          notInList: true,
          chainId: networkId || chainId,
          status: 1,
          decimals: searchedTokenDecimals,
        }
        data.push(details)
      }
    })

    const keys = isAddressSearch ? ['address', 'symbol', 'name'] : ['symbol', 'name']
    const existedData = matchSorter(data, address, {
      keys,
    })

    if (existedData && existedData.length > 0) {
      return lodash.uniqBy(existedData, 'address')
    }
    if (onlySearchTokenList) {
      return []
    }

    try {
      // if (!isAddressSearch) return []
      const searchedToken = getToken(address)
      if (searchedToken) {
        // const fromList = [...filteredTokenList, vCASHData, MONOData].find(token => token?.address === address)
        // if (fromList) {
        //   return []
        // }
        const searchedTokenName = await searchedToken?.name()
        const searchedTokenSymbol = await searchedToken?.symbol()
        const searchedTokenDecimals = await searchedToken?.decimals()
        return [
          {
            name: searchedTokenName,
            symbol: searchedTokenSymbol,
            decimals: searchedTokenDecimals,
            address: searchedToken?._address,
            notInList: true,
            status: 1,
            chainId: networkId || chainId,
            showWarning: true,
          },
        ]
      }
      return []
    } catch (err) {
      return {
        isInvalidToken: true,
        message: 'Invalid token address in this network',
      }
    }
  }

  // const poolsInfo = await swapRouterContract?.pools(ERC20TokenAddress)
  const getFullPoolList = async (loading = true, status = {aborted: false}) => {
    if (poolsContract && stakeContract) {
      try {
        const poolLength = await stakeContract?.poolLength()
        const pools = []

        for (let i = 0; i < parseInt(poolLength.toString()); i += 1) {
          const [stakePool, stakeUserInfo, totalAllocPoint] = await Promise.all([
            stakeContract?.poolInfo(i),
            stakeContract?.userInfo(i, App.YOUR_ADDRESS),
            stakeContract?.totalAllocPoint(),
          ])
          if (!stakePool?.bActive) continue
          const pool = poolsInfo?.find(p => Number(stakePool?.lpTokenId) === p?.pid && !!p.status)
          const poolData = await swapRouterContract?.pools(pool.token)
          const [tokenData, isApproved] = await Promise.all([
            onGetToken(poolData?.token),
            poolsContract?.isApprovedForAll(App.YOUR_ADDRESS, STAKE_ADDRESS),
          ])
          const balance = await poolsContract?.balanceOf(App.YOUR_ADDRESS, poolData?.pid)
          pools.push({
            ...stakePool,
            ...poolData,
            ...tokenData?.[0],
            ...stakeUserInfo,
            totalAllocPoint,
            balance,
            allowance: isApproved,
            stakePoolId: i,
          })
        }
        if (!status.aborted) {
          return pools
        }
      } catch (err) {
        if (!status.aborted) {
          console.log(err)
        }
      }
    }
  }
  const pools = await getFullPoolList()

  const getStakedLpInPool = async lpTokenId => {
    const allStakedLpInPool = await poolsContract.balanceOf(STAKE_ADDRESS, lpTokenId)
    const stakedLpInPool = weiToEthNum(allStakedLpInPool)
    return stakedLpInPool
  }

  const calculateTotalSupply = async pid => {
    try {
      const totalSupply = await poolsContract?.totalSupply(pid)
      return weiToEthNum(totalSupply)
    } catch (err) {
      console.log(err)
      return 0
    }
  }

  const getStakeData = async () => {
    try {
      const [currentPeriod, config] = await Promise.all([stakeContract?.currentPeriod(), stakeContract?.config()])
      const [monoPool, ratiosData] = await Promise.all([
        swapRouterContract?.pools(MONO_ADDRESS),
        stakeContract?.ratios(currentPeriod),
      ])

      return {
        monoPrice: parseFloat(ethers.utils.formatEther(monoPool?.price)),
        currentPeriod,
        monoPerPeriod: parseFloat(ethers.utils.formatEther(config._monoPerPeriod)),
        ratios: parseFloat(ethers.utils.formatEther(ratiosData, 12)),
        decay: parseFloat(ethers.utils.formatEther(config._decay, 12)),
        blockPerPeriod: config._blockPerPeriod,
        monoToken: MONO_ADDRESS,
        periodsPerDay: 1,
      }
    } catch (err) {
      console.log(err)
    }
  }
  function poolValue(vcashBalance, tokenBalance, price) {
    return vcashBalance + tokenBalance * price
  }

  const stakeContractData = await getStakeData()

  // console.log('pools ->', pools)
  const farmDataList = await Promise.all(
    pools.map(async pool => {
      const {
        pid,
        price: priceData,
        lpTokenId,
        stakedAmount,
        totalAllocPoint,
        allocPoint,
        tokenBalance,
        vcashCredit,
        vcashDebt,
        name,
        symbol,
      } = pool

      const stakedLpInPool = await getStakedLpInPool(lpTokenId)
      const lpTotalSupply = await calculateTotalSupply(pid)
      const {monoPerPeriod, ratios, decay, monoPrice, periodsPerDay} = stakeContractData
      const currentMonoPerPeriod = monoPerPeriod * ratios

      const decayValue = decay * Math.pow(10, 6)
      const dailyMONOs =
        decayValue !== 1
          ? (currentMonoPerPeriod * (1 - Math.pow(decayValue, periodsPerDay))) / (1 - decayValue)
          : currentMonoPerPeriod

      const dailyMONOsPerPool =
        (dailyMONOs * Math.pow(10, 6) * parseFloat(allocPoint.toString())) / parseFloat(totalAllocPoint.toString())

      const yieldMONOPerDayLP = stakedLpInPool ? dailyMONOsPerPool / stakedLpInPool : 0
      // console.log(name, stakedLpInPool, dailyMONOs, allocPoint.toString(), totalAllocPoint.toString())

      const tokenPrice = weiToEthNum(priceData)
      const tokenValue = weiToEthNum(tokenBalance)
      const vcashValue = weiToEthNum(vcashCredit) - weiToEthNum(vcashDebt)
      const poolBalance = poolValue(vcashValue, tokenValue, tokenPrice)
      const valuePerLp = poolBalance / lpTotalSupply

      const yieldMonoPerDayPerDollar = yieldMONOPerDayLP / valuePerLp
      // console.log(name, yieldMonoPerDayPerDollar, dailyMONOs)
      const dailyROI = yieldMonoPerDayPerDollar * monoPrice * 100
      // console.log(name, decayValue)
      const monthFactor = decayValue !== 1 ? (1 - Math.pow(decayValue, 30)) / (1 - decayValue) : 1
      const yearFactor = decayValue !== 1 ? (1 - Math.pow(decayValue, 365)) / (1 - decayValue) : 1
      const monthROI = dailyROI * monthFactor
      const yearROI = dailyROI * yearFactor
      // console.log(name, dailyROI, monthROI, yearROI)
      return {
        name,
        symbol,
        dailyROI,
        monthROI,
        yearROI,
      }
    })
  )

  let farmTableData = {
    title: 'Farm Details',
    heading: ['Farm', 'Symbol', 'Yearly / Monthly / Daily ROI'],
    rows: farmDataList?.map(farmData => {
      const {yearROI, monthROI, dailyROI} = farmData
      return [
        farmData.name,
        farmData.symbol,
        `${new Intl.NumberFormat().format(precise(yearROI, 2))}%(1y),${new Intl.NumberFormat().format(
          precise(monthROI, 2)
        )}%(1m),${new Intl.NumberFormat().format(precise(dailyROI, 2))}%(1d)`,
      ]
    }),
  }
  let farmTable = new AsciiTable().fromJSON(farmTableData)
  document.getElementById('log').innerHTML += farmTable + '<br />'
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
    const res = await fetch('https://api.monox.finance/polygon/vcash/usdc/price')
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
        let isLP = item.isLP
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
        if (item.bondName.includes('LP')) {
          isLP = true
        }
        const {_reserve0, _reserve1} = reserves
        const stableReserve = token0 === VUNIT_ADDRESS ? _reserve1 : _reserve0
        let bondPriceInUSD = isLP
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
        if (item.bondName.includes('USDT 7-day') || (item.bondName.includes('USDC 7-day') && !isLP)) {
          bondPriceInUSD *= Math.pow(10, 12)
        }
        if (isLP) {
          bondPriceInUSD *= Math.pow(10, 12)
        }

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

const getVaultContract = (address, ABI = DVaultAbi) => {
  const contract = new ethers.Contract(address, ABI, App.provider)
  return contract
}

function getChecksumAddress() {
  if (!isHexString(address, 20)) {
    //logger.throwArgumentError('invalid address', 'address', address)
  }

  address = address.toLowerCase()

  const chars = address.substring(2).split('')

  const expanded = new Uint8Array(40)
  for (let i = 0; i < 40; i++) {
    expanded[i] = chars[i].charCodeAt(0)
  }

  const hashed = arrayify(keccak256(expanded))

  for (let i = 0; i < 40; i += 2) {
    if (hashed[i >> 1] >> 4 >= 8) {
      chars[i] = chars[i].toUpperCase()
    }
    if ((hashed[i >> 1] & 0x0f) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase()
    }
  }

  return '0x' + chars.join('')
}

// Shims for environments that are missing some required constants and functions
const MAX_SAFE_INTEGER = 0x1fffffffffffff

function log10(x) {
  if (Math.log10) {
    return Math.log10(x)
  }
  return Math.log(x) / Math.LN10
}

// See: https://en.wikipedia.org/wiki/International_Bank_Account_Number

// Create lookup table
const ibanLookup = {}
for (let i = 0; i < 10; i++) {
  ibanLookup[String(i)] = String(i)
}
for (let i = 0; i < 26; i++) {
  ibanLookup[String.fromCharCode(65 + i)] = String(10 + i)
}

// How many decimal digits can we process? (for 64-bit float, this is 15)
const safeDigits = Math.floor(log10(MAX_SAFE_INTEGER))

function ibanChecksum(address) {
  address = address.toUpperCase()
  address = address.substring(4) + address.substring(0, 2) + '00'

  let expanded = address
    .split('')
    .map(c => {
      return ibanLookup[c]
    })
    .join('')

  // Javascript can handle integers safely up to 15 (decimal) digits
  while (expanded.length >= safeDigits) {
    let block = expanded.substring(0, safeDigits)
    expanded = (parseInt(block, 10) % 97) + expanded.substring(block.length)
  }

  let checksum = String(98 - (parseInt(expanded, 10) % 97))
  while (checksum.length < 2) {
    checksum = '0' + checksum
  }

  return checksum
}

function getAddress(address) {
  let result = null

  if (typeof address !== 'string') {
    //logger.throwArgumentError('invalid address', 'address', address)
  }

  if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    // Missing the 0x prefix
    if (address.substring(0, 2) !== '0x') {
      address = '0x' + address
    }

    result = getChecksumAddress(address)

    // It is a checksummed address with a bad checksum
    if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
      //logger.throwArgumentError('bad address checksum', 'address', address)
    }

    // Maybe ICAP? (we only support direct mode)
  } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    // It is an ICAP address with a bad checksum
    if (address.substring(2, 4) !== ibanChecksum(address)) {
      //logger.throwArgumentError('bad icap checksum', 'address', address)
    }

    result = _base36To16(address.substring(4))
    while (result.length < 40) {
      result = '0' + result
    }
    result = getChecksumAddress('0x' + result)
  } else {
    //logger.throwArgumentError('invalid address', 'address', address)
  }

  return result
}

function isAddress(address) {
  try {
    getAddress(address)
    return true
  } catch (error) {}
  return false
}

function getIcapAddress(address) {
  let base36 = _base16To36(getAddress(address).substring(2)).toUpperCase()
  while (base36.length < 30) {
    base36 = '0' + base36
  }
  return 'XE' + ibanChecksum('XE00' + base36) + base36
}

// http://ethereum.stackexchange.com/questions/760/how-is-the-address-of-an-ethereum-contract-computed
function getContractAddress(transaction) {
  let from = null
  try {
    from = getAddress(transaction.from)
  } catch (error) {
    //logger.throwArgumentError('missing from address', 'transaction', transaction)
  }

  const nonce = stripZeros(arrayify(BigNumber.from(transaction.nonce).toHexString()))

  return getAddress(hexDataSlice(keccak256(encode([from, nonce])), 12))
}

function getCreate2Address(from, salt, initCodeHash) {
  if (hexDataLength(salt) !== 32) {
    //logger.throwArgumentError('salt must be 32 bytes', 'salt', salt)
  }
  if (hexDataLength(initCodeHash) !== 32) {
    //logger.throwArgumentError('initCodeHash must be 32 bytes', 'initCodeHash', initCodeHash)
  }
  return getAddress(hexDataSlice(keccak256(concat(['0xff', getAddress(from), salt, initCodeHash])), 12))
}

const getPoolList = async () => {
  try {
    const res = await fetch('https://api.monox.finance/polygon/pools')
    const poolData = await res.json()
    return poolData.response
  } catch (error) {
    return {
      status: false,
    }
  }
}
const weiToEthNum = balance => {
  const displayBalance = ethers.utils.formatEther(balance)
  return parseFloat(displayBalance)
}
