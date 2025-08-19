$(function() {
  consoleInit(main)
})

const BLACKHOLE_GAUGE_MANAGER_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
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

const POOL_TOKEN_ABI = [
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
    name: 'symbol',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
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
]

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Loading blackhole gauges...\n')

  const BLACKHOLE_GAUGE_MANAGER_ADDRESS = '0x59aa177312Ff6Bdf39C8Af6F46dAe217bf76CBf6'
  const BLACKHOLE_GAUGE_MANAGER = new ethcall.Contract(BLACKHOLE_GAUGE_MANAGER_ADDRESS, BLACKHOLE_GAUGE_MANAGER_ABI)

  const [_length] = await App.ethcallProvider.all([BLACKHOLE_GAUGE_MANAGER.length()])
  const length = _length / 1

  const pool_calls = [...Array(length).keys()].map(i => BLACKHOLE_GAUGE_MANAGER.pools(i))
  const _blackhole_pools = await App.ethcallProvider.all(pool_calls)
  const blackhole_pools = _blackhole_pools.map(a => a.toLowerCase())

  const pools_response = await $.ajax({url: 'https://api.vfat.io/v1/farms?chainId=43114', type: 'GET'})
  const vfat_pools = pools_response.map(d => d.pool.address.toLowerCase())

  let missing_pools = [], missingTokens = []

  for (const blackhole_pool of blackhole_pools) {
    const is_in_list = vfat_pools.includes(blackhole_pool)
    if (!is_in_list) {
      missing_pools.push(blackhole_pool)
    }
  }

  const tokens_response = await $.ajax({
    url: 'https://api.vfat.io/v1/chain-tokens?chainId=43114&pageSize=999',
    type: 'GET',
  })
  const vfat_tokens = tokens_response.map(d => d.address.toLowerCase())

  for (const missing_pool of missing_pools) {
    const tokens = await formatingNewTokens(App, missing_pool, vfat_tokens)
    if(tokens.length > 0){
      missingTokens.push(tokens[0])
    }
  }

  if(missingTokens.length > 0){
    const missing_tokens_no_dublicates = remove_dublicates(missingTokens, ob => ob.symbol)
    _print(missing_tokens_no_dublicates)
  }else{
    _print("No new Tokens")
  }

  hideLoading()
}

async function formatingNewTokens(App, missing_pool, vfat_tokens) {
  const POOL_CONTRACT = new ethcall.Contract(missing_pool, POOL_TOKEN_ABI)
  const [token0, token1] = await App.ethcallProvider.all([POOL_CONTRACT.token0(), POOL_CONTRACT.token1()])

  const TOKEN_0_CONTRACT = new ethcall.Contract(token0, POOL_TOKEN_ABI)
  const TOKEN_1_CONTRACT = new ethcall.Contract(token1, POOL_TOKEN_ABI)

  const token_0_exists = vfat_tokens.includes(token0.toLowerCase())
  const token_1_exists = vfat_tokens.includes(token1.toLowerCase())

  if (!token_0_exists && !token_1_exists) {
    const [token0Symbol, token0Decimals] = await App.ethcallProvider.all([
      TOKEN_0_CONTRACT.symbol(),
      TOKEN_0_CONTRACT.decimals(),
    ])
    const [token1Symbol, token1Decimals] = await App.ethcallProvider.all([
      TOKEN_1_CONTRACT.symbol(),
      TOKEN_1_CONTRACT.decimals(),
    ])
    return [
      {
        address: token0,
        symbol: token0Symbol,
        decimals: Number(token0Decimals),
        chainId: 43114,
        logoURI: '',
      },
      {
        address: token1,
        symbol: token1Symbol,
        decimals: Number(token1Decimals),
        chainId: 43114,
        logoURI: '',
      },
    ]
  }
  if (!token_0_exists && token_1_exists) {
    const [token0Symbol, token0Decimals] = await App.ethcallProvider.all([
      TOKEN_0_CONTRACT.symbol(),
      TOKEN_0_CONTRACT.decimals(),
    ])
    return [
      {
        address: token0,
        symbol: token0Symbol,
        decimals: Number(token0Decimals),
        chainId: 43114,
        logoURI: '',
      },
    ]
  }
  if (token_0_exists && !token_1_exists) {
    const [token1Symbol, token1Decimals] = await App.ethcallProvider.all([
      TOKEN_1_CONTRACT.symbol(),
      TOKEN_1_CONTRACT.decimals(),
    ])
    return [
      {
        address: token1,
        symbol: token1Symbol,
        decimals: Number(token1Decimals),
        chainId: 43114,
        logoURI: '',
      },
    ]
  } else {
    return []
  }
}

function remove_dublicates(arr, key){
    return [
        ...new Map(
            arr.map(x => [key(x), x])
        ).values()
    ]
  }