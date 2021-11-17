$(function() {
  consoleInit(main)
})

const GRAIN_CHEF_ABI = [
  {
    inputs: [
      {internalType: 'address', name: '_PCSRouter', type: 'address'},
      {internalType: 'address', name: '_uffToken', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {indexed: true, internalType: 'address', name: 'spender', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'previousLpToken', type: 'address'},
      {indexed: true, internalType: 'address', name: 'newLpToken', type: 'address'},
    ],
    name: 'LPTokenTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'operator', type: 'address'},
      {indexed: false, internalType: 'bool', name: 'enabled', type: 'bool'},
    ],
    name: 'MaxHoldingEnableUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'operator', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'previousRate', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'newRate', type: 'uint256'},
    ],
    name: 'MaxHoldingRateUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'previousOperator', type: 'address'},
      {indexed: true, internalType: 'address', name: 'newOperator', type: 'address'},
    ],
    name: 'OperatorTransferred',
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
      {indexed: true, internalType: 'address', name: 'oldPCSRouter', type: 'address'},
      {indexed: true, internalType: 'address', name: 'newPCSRouter', type: 'address'},
    ],
    name: 'PCSRouterTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: false, internalType: 'uint256', name: 'tokensSwapped', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'ethReceived', type: 'uint256'},
      {indexed: false, internalType: 'uint256', name: 'tokensIntoLiqudity', type: 'uint256'},
    ],
    name: 'SwapAndLiquify',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'operator', type: 'address'},
      {indexed: false, internalType: 'bool', name: 'enabled', type: 'bool'},
    ],
    name: 'SwapAndLiquifyEnabledUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'value', type: 'uint256'},
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'BURN_ADDRESS',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
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
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'approve',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
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
    name: 'cap',
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
      {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
    ],
    name: 'decreaseAllowance',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOwner',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'grainSupply',
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
    inputs: [{internalType: 'address', name: '_account', type: 'address'}],
    name: 'isExcludedFromAntiWhale',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lpToken',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxHolding',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxHoldingRate',
    outputs: [{internalType: 'uint16', name: '', type: 'uint16'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minAmountToLiquify',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: '_to', type: 'address'},
      {internalType: 'uint256', name: '_amount', type: 'uint256'},
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
    name: 'mint',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {inputs: [], name: 'openTrading', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [],
    name: 'operator',
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
  {inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [{internalType: 'address', name: '_account', type: 'address'}],
    name: 'setExcludeFromFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '_account', type: 'address'}],
    name: 'setExcludedFromAntiWhale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'swapAndLiquifyEnabled',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
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
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'transfer',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'sender', type: 'address'},
      {internalType: 'address', name: 'recipient', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'transferFrom',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'newLpToken', type: 'address'}],
    name: 'transferLpToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'newOperator', type: 'address'}],
    name: 'transferOperator',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'transferTaxRate',
    outputs: [{internalType: 'uint16', name: '', type: 'uint16'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'uffToken',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'bool', name: '_enabled', type: 'bool'}],
    name: 'updateSwapAndLiquifyEnabled',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {stateMutability: 'payable', type: 'receive'},
]

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const GRAIN_CHEF_ADDR = '0x5791d128a77d0b834E24dCF2A886A482d97f891f'
  const rewardTokenTicker = 'GRAIN'
  const GRAIN_CHEF = new ethers.Contract(GRAIN_CHEF_ADDR, GRAIN_CHEF_ABI, App.provider)

  const startBlock = await GRAIN_CHEF.startBlock()
  const currentBlock = await App.provider.getBlockNumber()

  const multiplier = await GRAIN_CHEF.getMultiplier(currentBlock, currentBlock + 1)

  let rewardsPerWeek = 0
  if (currentBlock < startBlock) {
    _print(
      `Rewards start at block <a href="https://bscscan.com/block/countdown/${startBlock}" target="_blank">${startBlock}</a>\n`
    )
  } else {
    rewardsPerWeek = (((await GRAIN_CHEF.uffPerBlock()) / 1e18) * 604800 * multiplier) / 3
  }

  const tokens = {}
  const prices = await getBscPrices()

  await loadBscChefContract(
    App,
    tokens,
    prices,
    GRAIN_CHEF,
    GRAIN_CHEF_ADDR,
    GRAIN_CHEF_ABI,
    rewardTokenTicker,
    'grain',
    null,
    rewardsPerWeek,
    'pendingGrain',
    [1]
  )

  hideLoading()
}
