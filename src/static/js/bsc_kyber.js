$(function() {
  consoleInit(main)
});

const TOKEN_ADDRESSES = {
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  KNC: '0xfe56d5892BDffC7BF58f2E84BE1b2C32D21C308b',
  USDT: '0x55d398326f99059fF775485246999027B3197955',
  BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  ETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  HERO: '0xE8176d414560cFE1Bf82Fd73B986823B89E4F545',
  CTR: '0xD6Cce248263ea1e2b8cB765178C944Fc16Ed0727',
  FIWA: '0x633237c6fa30fae46cc5bb22014da30e50a718cc',
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
},{
  token0: 'WBNB',
  token1: 'HERO',
  pool: '0x2D49F16C9ad4f1145bb27c9af71474F468a697c8',
  farming: '0xcCAc8DFb75120140A5469282a13E9A60B1751276',
  pid: 0,
},{
  token0: 'WBNB',
  token1: 'CTR',
  pool: '0x97dBaf4aD688aEd04817121301a005B710E6067a',
  farming: '0x829c27fd3013b944cbE76E92c3D6c45767c0C789',
  pid: 0,
},{
  token0: 'USDT',
  token1: 'FIWA',
  pool: '0xf81e106c5b44ba9a993fc1f456a4c8e54c47cf34',
  farming: '0xc49b3b43565b76E5ba7A98613263E7bFdEf1140c',
  pid: 0,
}]

const REWARDS = {
  'KNC': {
    address: '0xfe56d5892BDffC7BF58f2E84BE1b2C32D21C308b',
    price: 0,
    rewardsPerBlock: 0,
  },
  'HERO': {
    address: '0xE8176d414560cFE1Bf82Fd73B986823B89E4F545',
    price: 0,
    rewardsPerBlock: 0,
  },
  'CTR': {
    address: '0xD6Cce248263ea1e2b8cB765178C944Fc16Ed0727',
    price: 0,
    rewardsPerBlock: 0,
  },
  'FIWA': {
    address: '0x633237C6FA30FAe46Cc5bB22014DA30e50a718cC',
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
