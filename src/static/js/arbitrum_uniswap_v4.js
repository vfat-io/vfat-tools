$(function() {
  consoleInit(main)
})

const SWEEP_ABI = [
  {
    inputs: [
      {internalType: 'contract SickleFactory', name: 'factory', type: 'address'},
      {internalType: 'contract NftTransferLib', name: 'nftTransferLib_', type: 'address'},
      {internalType: 'contract TransferLib', name: 'transferLib_', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {inputs: [], name: 'InvalidInputLength', type: 'error'},
  {inputs: [], name: 'NotApproved', type: 'error'},
  {inputs: [{internalType: 'address', name: 'sender', type: 'address'}], name: 'NotOwner', type: 'error'},
  {inputs: [], name: 'NotRegisteredSickle', type: 'error'},
  {inputs: [], name: 'SickleNotDeployed', type: 'error'},
  {
    inputs: [],
    name: 'connectorRegistry',
    outputs: [{internalType: 'contract ConnectorRegistry', name: '', type: 'address'}],
    stateMutability: 'view',
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
    inputs: [],
    name: 'nftTransferLib',
    outputs: [{internalType: 'contract NftTransferLib', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'contract IERC1155[]', name: 'tokens', type: 'address[]'},
      {internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]'},
      {internalType: 'uint256[]', name: 'amounts', type: 'uint256[]'},
    ],
    name: 'sweepErc1155',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'contract IERC721[]', name: 'tokens', type: 'address[]'},
      {internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]'},
    ],
    name: 'sweepErc721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address[]', name: 'tokens', type: 'address[]'}],
    name: 'sweepTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'transferLib',
    outputs: [{internalType: 'contract TransferLib', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
]

const SICKLE_FACTORY_ABI = [
  {
    inputs: [{internalType: 'address', name: 'admin', type: 'address'}],
    name: 'sickles',
    outputs: [{internalType: 'address', name: 'sickle', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
]

const UNISWAP_POSITION_MANAGER_V4 = [
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'getPositionLiquidity',
    outputs: [{internalType: 'uint128', name: 'liquidity', type: 'uint128'}],
    stateMutability: 'view',
    type: 'function',
  },
]

const nft_manager_address_v4 = '0xd88F38F930b7952f2DB2432Cb002E7abbF3dD869'
const sickle_factory_address = '0x53d9780DbD3831E3A797Fd215be4131636cD5FDf'
const sweep_address = '0xf5090D2d52E9b390A562783B651D1A7480d56FBa'

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const sickle_factory = new ethcall.Contract(sickle_factory_address, SICKLE_FACTORY_ABI)
  const nft_manager_v4 = new ethcall.Contract(nft_manager_address_v4, UNISWAP_POSITION_MANAGER_V4)

  const [sickleAddress] = await App.ethcallProvider.all([sickle_factory.sickles(App.YOUR_ADDRESS)])
  if (sickleAddress === '0x0000000000000000000000000000000000000000') {
    _print_bold('You dont have a sickle account')
  } else {
    _print_bold(`Your Sickle Address: ${sickleAddress}`)
    _print('')

    const current_block = await App.provider.getBlockNumber()
    const from_block = current_block - 90000000

    const filtered_users_address = sickleAddress.toLowerCase().slice(2)

    const filter = {
      address: nft_manager_address_v4,
      fromBlock: from_block,
      toBlock: current_block,
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // topic0 (signature)
        null, //topic1 (from address)
        `0x000000000000000000000000${filtered_users_address}`, // topic2 (to address)
        null, // topic3
      ],
    }

    const logs = await App.provider.getLogs(filter)

    let nft_ids = [],
      active_nfts = []

    for (const log of logs) {
      nft_ids.push(BigInt(log.topics[3]))
    }

    const liquidity_calls = nft_ids.map(nft => nft_manager_v4.getPositionLiquidity(nft))
    const liquidities = await App.ethcallProvider.all(liquidity_calls)

    for (let i = 0; i < nft_ids.length; i++) {
      if (liquidities[i] > 0) {
        active_nfts.push(nft_ids[i])
      }
    }

    if (active_nfts.length > 0) {
      let token_ids = ''

      let nft_manager_addresses = []
      for (let i = 0; i < active_nfts.length; i++) {
        nft_manager_addresses.push(nft_manager_address_v4)
      }

      const sweepErc721 = async function() {
        return sweep_nfts_721(App, active_nfts, nft_manager_addresses)
      }

      _print_bold('Uniswap-V4 nfts')

      for (const nft of active_nfts) {
        token_ids += `${nft} - `
      }

      for (const nft of active_nfts) {
        const singleSweepErc721 = async function() {
          return single_sweep_nfts_721(App, nft, nft_manager_address_v4)
        }

        _print_link(`Withdraw Uniswap erc721 token: ${nft}`, singleSweepErc721)
      }

      _print_link(`Withdraw all Uniswap erc721 tokens: ${token_ids}`, sweepErc721)
      _print('')
    } else {
      _print('No active NFTs')
    }
  }

  hideLoading()
}

const sweep_nfts_721 = async function(App, nfts, tokens) {
  const signer = App.provider.getSigner()
  const SWEEP = new ethers.Contract(sweep_address, SWEEP_ABI, signer)

  showLoading()
  SWEEP.sweepErc721(tokens, nfts)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {})
  hideLoading()
}

const single_sweep_nfts_721 = async function(App, nft, token) {
  const signer = App.provider.getSigner()
  const SWEEP = new ethers.Contract(sweep_address, SWEEP_ABI, signer)

  showLoading()
  SWEEP.sweepErc721([token], [nft])
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {})
  hideLoading()
}
