$(function() {
  consoleInit(main)
});

const TOKEN_ADDRESSES = {
  WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  KNC: '0x1C954E8fe737F99f68Fa1CCda3e51ebDB291948C',
  USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  XUSD:'0x3A3e7650f8B9f667dA98F236010fBf44Ee4B2975',
  XDO: '0x3Dc7B06dD0B1f08ef9AcBbD2564f8605b4868EEA',
}

const POOLS = [{
  token0: 'WMATIC',
  token1: 'DAI',
  pool: '0x45963db838a070cF7BE8e7046fD63e23d376c665',
  farming: '0x829c27fd3013b944cbE76E92c3D6c45767c0C789',
  pid: 0,
}, {
  token0: 'WMATIC',
  token1: 'KNC',
  pool: '0x37e6449B0e99BeFD2A708eA048d970F4FF4dC65d',
  farming: '0x829c27fd3013b944cbE76E92c3D6c45767c0C789',
  pid: 1,
}, {
  token0: 'USDC',
  token1: 'USDT',
  pool: '0x3904aC366D348636694CB6720aa1540e76441b1B',
  farming: '0x3aDd3034Fcf921F20c74c6149FB44921709595B1',
  pid: 0,
}, {
  token0: 'USDC',
  token1: 'DAI',
  pool: '0x7018C0bd73255C8966d0B26634E0BC0c7595D255',
  farming: '0x3aDd3034Fcf921F20c74c6149FB44921709595B1',
  pid: 1,
}, {
  token0: 'USDC',
  token1: 'WETH',
  pool: '0x95D708e9eE04b0136b98579141624d19c89B9d68',
  farming: '0x3aDd3034Fcf921F20c74c6149FB44921709595B1',
  pid: 2,
}, {
  token0: 'KNC',
  token1: 'WETH',
  pool: '0xd8B9E9444fCBF26BEA4BAdd6142dD6a962BCA86A',
  farming: '0x3aDd3034Fcf921F20c74c6149FB44921709595B1',
  pid: 3,
}, {
  token0: 'USDC',
  token1: 'XUSD',
  pool: '0x2616f7285bDCb9C3D0422745b1C8A5751e0EA204',
  farming: '0xc0601973451d9369252Aee01397c0270CD2Ecd60',
  pid: 0,
}]

const REWARDS = {
  'KNC': {
    address: '0x1C954E8fe737F99f68Fa1CCda3e51ebDB291948C',
    price: 0,
    rewardsPerBlock: 0,
  },
  'XDO': {
    address: '0x3Dc7B06dD0B1f08ef9AcBbD2564f8605b4868EEA',
    price: 0,
    rewardsPerBlock: 0,
  },
  'MATIC': {
    address: '0x0000000000000000000000000000000000000000',
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

  const blockTime = 2
  const explorer = {
    url: 'polygonscan.com',
    name: 'Polygonscan',
    info: 'polygon-info',
  }
  const KyberRewardLocker = '0x063DD8b5a42AaE93a014ce5FAbB5B70474667961'
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
