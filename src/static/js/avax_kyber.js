$(function() {
  consoleInit(main)
});
  
const TOKEN_ADDRESSES = {
  WAVAX: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  WETH: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  USDT: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
  USDC: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
  DAI: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
}

const POOLS = [{
  token0: 'USDC',
  token1: 'USDT',
  pool: '0xe1dAd9E06380bC8962e259dDd6a5257A4f56d525',
  farming: '0x98910F7f13496fcDE2ade93648F05b4854Fc99D9',
  pid: 0,
}, {
  token0: 'WETH',
  token1: 'WAVAX',
  pool: '0x0f0fc5a5029e3d155708356b422d22cc29f8b3d4',
  farming: '0x98910F7f13496fcDE2ade93648F05b4854Fc99D9',
  pid: 1,
}]

const REWARDS = {
  'AVAX': {
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
    `NOTE: Once rewards are harvested, they vest for 14 days before they can be claimable.\n` +
    `      Each time you harvest, that amount harvested starts vesting for 14 days.\n`
  )

  const blockTime = 1.2
  const explorer = {
    url: 'https://cchain.explorer.avax.network/',
    name: 'CChain Avalanche Explorer',
    info: 'avax-info',
  }
  const KyberRewardLocker = '0xf530a090EF6481cfB33F98c63532E7745abab58A'
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
  