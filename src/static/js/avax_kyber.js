$(function() {
  consoleInit(main)
});
  
const TOKEN_ADDRESSES = {
  WAVAX: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  WETH: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  USDT: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
  USDC: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
  DAI: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
  DYP: '0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17',
  APEIN: '0x938fe3788222a74924e062120e7bfac829c719fb',
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
  pool: '0x0f0FC5a5029E3d155708356b422D22Cc29f8b3D4',
  farming: '0x98910F7f13496fcDE2ade93648F05b4854Fc99D9',
  pid: 1,
},{
  token0: 'DYP',
  token1: 'WAVAX',
  pool: '0x44d1b2974b3b8CE93B261f6D15DcE5ad57f8933B',
  farming: '0x3133C5C35947dBcA7A76Ee05f106a7c63BFD5C3F',
  pid: 0,
},{
  token0: 'APEIN',
  token1: 'WAVAX',
  pool: '0x535a99a079D64b8C3f4cc264eba70D82992B224B',
  farming: '0x854Cf246b09c7366AEe5abce92fA167bfE7f3E75',
  pid: 0,
}]

const REWARDS = {
  'AVAX': {
    address: '0x0000000000000000000000000000000000000000',
    price: 0,
    rewardsPerBlock: 0,
  },
  'DYP': {
    address: '0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17',
    price: 0,
    rewardsPerBlock: 0,
  },
  'APEIN': {
    address: '0x938FE3788222A74924E062120E7BFac829c719Fb',
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
  