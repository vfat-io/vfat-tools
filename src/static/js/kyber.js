$(function() {
  consoleInit(main)
});

const TOKEN_ADDRESSES = {
  KNC: '0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
}

const POOLS = [{
  token0: 'USDC',
  token1: 'USDT',
  pool: '0x306121f1344ac5F84760998484c0176d7BFB7134',
  farming: '0x31De05f28568e3d3D612BFA6A78B356676367470',
  pid: 0,
}, {
  token0: 'WETH',
  token1: 'USDT',
  pool: '0xcE9874C42DcE7fffbE5E48B026Ff1182733266Cb',
  farming: '0x31De05f28568e3d3D612BFA6A78B356676367470',
  pid: 1,
}, {
  token0: 'WBTC',
  token1: 'USDT',
  pool: '0xD343d5dba2FBa55EEF58189619c05e33CAB95cA1',
  farming: '0x31De05f28568e3d3D612BFA6A78B356676367470',
  pid: 2,
}, {
  token0: 'WBTC',
  token1: 'WETH',
  pool: '0x1cf68Bbc2b6D3C6CfE1BD3590CF0E10b06a05F17',
  farming: '0x31De05f28568e3d3D612BFA6A78B356676367470',
  pid: 3,
}, {
  token0: 'WETH',
  token1: 'KNC',
  pool: '0x61639D6eC06C13a96B5eB9560b359D7c648C7759',
  farming: '0x31De05f28568e3d3D612BFA6A78B356676367470',
  pid: 4,
}]

const REWARDS = {
  'KNC': {
    address: '0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202',
    price: 0,
    rewardsPerBlock: 0,
  },
}

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");
  _print(
    `NOTE: Once rewards are harvested, they vest for 30 days before they can be claimable.\n` +
    `      Each time you harvest, that amount harvested starts vesting for 30 days.\n`
  )

  const blockTime = 13
  const explorer = {
    url: 'etherscan.io',
    name: 'Etherscan',
    info: 'info',
  }
  const KyberRewardLocker = '0xfab5186A194588F5AD5074Bd52659302906B4522'
  for (let key of Object.keys(REWARDS)) {
    REWARDS[key].price = await getCoinGeckoPrice(COINGECKO_IDS[key])
  }

  let info
  for (let pool of POOLS) {
    info = await loadLiquidityMiningInfo(App, pool, blockTime, KyberRewardLocker, TOKEN_ADDRESSES, POOLS, REWARDS)
    printLiquidityMiningInfo(App, info, blockTime, explorer, TOKEN_ADDRESSES, REWARDS)

    _print("")
  }

  hideLoading();
}
