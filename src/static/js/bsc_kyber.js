$(function() {
  consoleInit(main)
});

const TOKEN_ADDRESSES = {
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  KNC: '0xfe56d5892BDffC7BF58f2E84BE1b2C32D21C308b',
  USDT: '0x55d398326f99059fF775485246999027B3197955',
  BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  ETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
}

const POOLS = [{
  token0: 'WBNB',
  token1: 'KNC',
  pool: '0x6170B6d96167346896169b35e1E9585feAB873bb',
  farming: '0x31De05f28568e3d3D612BFA6A78B356676367470',
  pid: 0,
}, {
  token0: 'USDT',
  token1: 'WBNB',
  pool: '0xec303cE1eDbEbF7e71fc7B350341bB6A6A7a6381',
  farming: '0x31De05f28568e3d3D612BFA6A78B356676367470',
  pid: 1,
}, {
  token0: 'USDT',
  token1: 'BUSD',
  pool: '0xc3daC2049616326E7D596cE52062789d96373b55',
  farming: '0x31De05f28568e3d3D612BFA6A78B356676367470',
  pid: 2,
}, {
  token0: 'ETH',
  token1: 'WBNB',
  pool: '0xd26fa4D47Ab61C03259F0CBC9054890DF5C3B7aD',
  farming: '0x31De05f28568e3d3D612BFA6A78B356676367470',
  pid: 3,
}]

const REWARDS = {
  'KNC': {
    address: '0xfe56d5892BDffC7BF58f2E84BE1b2C32D21C308b',
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

  const blockTime = 3
  const explorer = {
    url: 'bscscan.com',
    name: 'BSCScan',
    info: 'bsc-info',
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
