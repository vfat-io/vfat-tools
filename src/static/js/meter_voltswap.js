$(function() {
  consoleInit(main)
});

const UNISWAP_PAIRE_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"reserve0","type":"uint112"},{"internalType":"uint112","name":"reserve1","type":"uint112"},{"internalType":"uint32","name":"blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

const GEYSER_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"}],"name":"BonusTokenRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardPool","type":"address"},{"indexed":false,"internalType":"address","name":"powerSwitch","type":"address"}],"name":"GeyserCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"GeyserFunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"vault","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"vault","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"vault","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"factory","type":"address"}],"name":"VaultFactoryRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"factory","type":"address"}],"name":"VaultFactoryRemoved","type":"event"},{"inputs":[],"name":"BASE_SHARES_PER_WEI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_REWARD_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_STAKES_PER_VAULT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"unlockedRewards","type":"uint256"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"stakeDuration","type":"uint256"},{"internalType":"uint256","name":"totalStakeUnits","type":"uint256"},{"components":[{"internalType":"uint256","name":"floor","type":"uint256"},{"internalType":"uint256","name":"ceiling","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"}],"internalType":"structIGeyser.RewardScaling","name":"rewardScaling","type":"tuple"}],"name":"calculateReward","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"structIGeyser.StakeData[]","name":"stakes","type":"tuple[]"},{"internalType":"uint256","name":"unstakeAmount","type":"uint256"},{"internalType":"uint256","name":"unlockedRewards","type":"uint256"},{"internalType":"uint256","name":"totalStakeUnits","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"components":[{"internalType":"uint256","name":"floor","type":"uint256"},{"internalType":"uint256","name":"ceiling","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"}],"internalType":"structIGeyser.RewardScaling","name":"rewardScaling","type":"tuple"}],"name":"calculateRewardFromStakes","outputs":[{"components":[{"internalType":"uint256","name":"lastStakeAmount","type":"uint256"},{"internalType":"uint256","name":"newStakesCount","type":"uint256"},{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"uint256","name":"newTotalStakeUnits","type":"uint256"}],"internalType":"structIGeyser.RewardOutput","name":"out","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"name":"calculateStakeUnits","outputs":[{"internalType":"uint256","name":"stakeUnits","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"structIGeyser.StakeData[]","name":"stakes","type":"tuple[]"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"calculateTotalStakeUnits","outputs":[{"internalType":"uint256","name":"totalStakeUnits","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"}],"internalType":"structIGeyser.RewardSchedule[]","name":"rewardSchedules","type":"tuple[]"},{"internalType":"uint256","name":"rewardBalance","type":"uint256"},{"internalType":"uint256","name":"sharesOutstanding","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"calculateUnlockedRewards","outputs":[{"internalType":"uint256","name":"unlockedRewards","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"fundGeyser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getBonusTokenAtIndex","outputs":[{"internalType":"address","name":"bonusToken","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBonusTokenSetLength","outputs":[{"internalType":"uint256","name":"length","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"}],"name":"getCurrentStakeReward","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentTotalStakeUnits","outputs":[{"internalType":"uint256","name":"totalStakeUnits","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentUnlockedRewards","outputs":[{"internalType":"uint256","name":"unlockedRewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"}],"name":"getCurrentVaultReward","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"}],"name":"getCurrentVaultStakeUnits","outputs":[{"internalType":"uint256","name":"stakeUnits","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getFutureStakeReward","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getFutureTotalStakeUnits","outputs":[{"internalType":"uint256","name":"totalStakeUnits","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getFutureUnlockedRewards","outputs":[{"internalType":"uint256","name":"unlockedRewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getFutureVaultReward","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getFutureVaultStakeUnits","outputs":[{"internalType":"uint256","name":"stakeUnits","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getGeyserData","outputs":[{"components":[{"internalType":"address","name":"stakingToken","type":"address"},{"internalType":"address","name":"rewardToken","type":"address"},{"internalType":"address","name":"rewardPool","type":"address"},{"components":[{"internalType":"uint256","name":"floor","type":"uint256"},{"internalType":"uint256","name":"ceiling","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"}],"internalType":"structIGeyser.RewardScaling","name":"rewardScaling","type":"tuple"},{"internalType":"uint256","name":"rewardSharesOutstanding","type":"uint256"},{"internalType":"uint256","name":"totalStake","type":"uint256"},{"internalType":"uint256","name":"totalStakeUnits","type":"uint256"},{"internalType":"uint256","name":"lastUpdate","type":"uint256"},{"components":[{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"}],"internalType":"structIGeyser.RewardSchedule[]","name":"rewardSchedules","type":"tuple[]"}],"internalType":"structIGeyser.GeyserData","name":"geyser","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPowerController","outputs":[{"internalType":"address","name":"controller","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPowerSwitch","outputs":[{"internalType":"address","name":"powerSwitch","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"}],"name":"getVaultData","outputs":[{"components":[{"internalType":"uint256","name":"totalStake","type":"uint256"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"structIGeyser.StakeData[]","name":"stakes","type":"tuple[]"}],"internalType":"structIGeyser.VaultData","name":"vaultData","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getVaultFactoryAtIndex","outputs":[{"internalType":"address","name":"factory","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVaultFactorySetLength","outputs":[{"internalType":"uint256","name":"length","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ownerAddress","type":"address"},{"internalType":"address","name":"rewardPoolFactory","type":"address"},{"internalType":"address","name":"powerSwitchFactory","type":"address"},{"internalType":"address","name":"stakingToken","type":"address"},{"internalType":"address","name":"rewardToken","type":"address"},{"components":[{"internalType":"uint256","name":"floor","type":"uint256"},{"internalType":"uint256","name":"ceiling","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"}],"internalType":"structIGeyser.RewardScaling","name":"rewardScaling","type":"tuple"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initializeLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isOffline","outputs":[{"internalType":"bool","name":"status","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOnline","outputs":[{"internalType":"bool","name":"status","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isShutdown","outputs":[{"internalType":"bool","name":"status","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"isValidAddress","outputs":[{"internalType":"bool","name":"validity","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"isValidVault","outputs":[{"internalType":"bool","name":"validity","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rageQuit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"bonusToken","type":"address"}],"name":"registerBonusToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"factory","type":"address"}],"name":"registerVaultFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"factory","type":"address"}],"name":"removeVaultFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueTokensFromRewardPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"permission","type":"bytes"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"permission","type":"bytes"}],"name":"unstakeAndClaim","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const symbolMap = {
  // voltswap supported
  WBTC: { id: 'wrapped-bitcoin', price: 50000 },
  'WBTC.eth': { id: 'wrapped-bitcoin', price: 50000 },
  USDC: { id: 'usd-coin', price: 1 },
  'USDC.eth': { id: 'usd-coin', price: 1 },
  USDT: { id: 'tether', price: 1 },
  'USDT.eth': { id: 'tether', price: 1 },
  MTRG: { id: 'meter', price: 3 },
  MTR: { id: 'meter-stable', price: 2.5 },
  WETH: { id: 'ethereum', price: 3500 },
  'WETH.eth': { id: 'ethereum', price: 3500 },
  BUSD: { id: 'binance-usd', price: 1 },
  'BUSD.bsc': { id: 'binance-usd', price: 1 },
  BNB: { id: 'binancecoin', price: 400 },
  'BNB.bsc': { id: 'binancecoin', price: 400 },

  // pending
  VOLT: { id: '', price: 50 },
  AMPL: { id: 'ampleforth', price: 1 },

  // extended
  CRV: { id: 'curve-dao-token', price: 1 },
  YFI: { id: 'yearn-finance', price: 1 },
  LINK: { id: 'chainlink', price: 1 },
  BAL: { id: 'balancer', price: 1 },
  COMP: { id: 'compound-governance-token', price: 1 }
};

const DAY_IN_SEC = 24 * 3600;
const YEAR_IN_SEC = 12 * 30 * 24 * 3600;

const UNI_GRAPH_URI = 'https://graph.voltswap.finance/subgraphs/name/meterio/uniswap-v2-subgraph';
const GEYSER_GRAPH_URI = 'https://newgraph.voltswap.finance/subgraphs/name/meter/geyser-v2';

const GET_GEYSERS = `
  query getGeysers {
    geysers(first: 1000) {
      id
      rewardToken
      stakingToken
      totalStake
      totalStakeUnits
      scalingFloor
      scalingCeiling
      scalingTime
      unlockedReward
      rewardSchedules(first: 1000) {
        id
        duration
        start
        rewardAmount
      }
      lastUpdate
      powerSwitch {
        id
        status
      }
    }
  }
`
const GET_PAIRS = `
  query getPairs {
    pairs(first: 1000) {
      id
      token0Price
      token1Price
      reserveUSD
      totalSupply
      token0 {
        id
        symbol
        decimals
      }
      token1 {
        id
        symbol
        decimals
      }
    }
  }
`

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  const geysers = await getGeysers(GEYSER_GRAPH_URI, {
    operationName: "getGeysers",
    query: GET_GEYSERS
  })

  const pairs = await getPairs(UNI_GRAPH_URI, {
    operationName: "getPairs",
    query: GET_PAIRS
  })

  const newPairs = [ ...pairs, {
    __typename: "Pair",
    id: "0x8df95e66cb0ef38f91d2776da3c921768982fba0",
    reserveUSD: "0",
    token0: {
        __typename: "Token",
        decimals: "18",
        id: "0x8df95e66cb0ef38f91d2776da3c921768982fba0",
        symbol: "VOLT"
    },
    token0Price: "50",
    token1: {
      __typename: "Token",
      decimals: "18",
      id: "0x8df95e66cb0ef38f91d2776da3c921768982fba0",
      symbol: "VOLT"
  },
    token1Price: "50",
    totalSupply: "0"
  }]

  for (const geyserInfo of geysers) {
    const totalStake = geyserInfo.totalStake / 1e18;
    const isVoltPool = geyserInfo.id.toLowerCase() === '0xBfC69a757Dd7DB8C59e10c63aB023dc8c8cc95Dc'.toLowerCase();
    for (const tokenPair of newPairs) {
      if (tokenPair.id === geyserInfo.stakingToken) {
        _print(`-----------------------------------------------`)
        const stakingSymbol = isVoltPool ? tokenPair.token0.symbol : `${tokenPair.token0.symbol}-${tokenPair.token1.symbol}`;
        _print(`<a target="_blank" href="https://farm.voltswap.finance?farm=${stakingSymbol}">${stakingSymbol}</a> \n`);

        let uniPrice = 0;
        if (isVoltPool) {
          const mtrgPrice_st = await getPrice('MTRG');
          const mtrgVoltPair_st = new ethers.Contract('0x1071392e4cdf7c01d433b87be92beb1f8fd663a8', UNISWAP_PAIRE_ABI, App.provider);
          const { reserve0, reserve1 } = await mtrgVoltPair_st.getReserves();

          uniPrice = mtrgPrice_st * reserve0 / reserve1;
        } else {
          uniPrice = parseFloat(tokenPair.reserveUSD) / parseFloat(tokenPair.totalSupply);
        }
        _print(`Total staked value: ${(totalStake * uniPrice).toFixed(2)} USD`);

        const durationInDay = getGeyserDuration(geyserInfo) / DAY_IN_SEC;
        _print(`Ends in: ${durationInDay.toFixed(2)} Days`)

        let apy = 0;
        let voltPrice = 0;
        const rewardTokenContract = new ethers.Contract(geyserInfo.rewardToken, ERC20_ABI, App.provider);
        const rewardSymbol = await rewardTokenContract.symbol();
        if (rewardSymbol === 'VOLT') {
          const mtrgPrice = await getPrice('MTRG');
          const mtrgVoltPair = new ethers.Contract('0x1071392e4cdf7c01d433b87be92beb1f8fd663a8', UNISWAP_PAIRE_ABI, App.provider);
          const { reserve0, reserve1 } = await mtrgVoltPair.getReserves();

          voltPrice = mtrgPrice * reserve0 / reserve1;
        } else {
          voltPrice = await getPrice(rewardSymbol);
        }
        if (isVoltPool) {
          apy = await getPoolAPY(geyserInfo, uniPrice + voltPrice, 18, voltPrice, 18, App.provider);
        } else {
          apy = await getPoolAPY(geyserInfo, uniPrice, 18, voltPrice, 18, App.provider);
        }
        _print(`Estimated APY: ${(apy * 100)?.toFixed(2)} %`)

        _print(`-----------------------------------------------`)
        break;
      }
    }
  }

  hideLoading();
}

async function getPairs(url, data) {
  const res = await $.ajax({
    url,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data)
  })

  if (res.data && res.data.pairs) {
    return res.data.pairs
  }

  return []
}

async function getGeysers(url, data) {
  const res = await $.ajax({
    url,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data)
  })

  if (res.data && res.data.geysers) {
    return res.data.geysers
  }

  return []
}

function nowInSeconds() {
  return Math.round(Date.now() / 1000)
}

async function getPrice(symbol) {
  const coin = symbolMap[symbol];
  if (!coin) {
    console.log('Cant not get coin id of ', symbol);
    return;
  }
  let res = await $.ajax({
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + coin.id + '&vs_currencies=usd',
    type: 'GET',
  })
  if (res && res[coin.id]) {
    return res[coin.id].usd
  }
  return 0
}

function getGeyserDuration(geyser) {
  const now = nowInSeconds();
  const { rewardSchedules } = geyser;
  const schedulesEndTime = rewardSchedules.map(
    schedule => parseInt(schedule.start, 10) + parseInt(schedule.duration, 10)
  );
  return Math.max(...schedulesEndTime.map(endTime => endTime - now), 0);
};

const getCalcPeriod = (geyser) => {
  const { scalingTime, rewardSchedules } = geyser;
  const now = nowInSeconds();
  const schedulesEndTime = rewardSchedules.map(
    schedule => parseInt(schedule.start, 10) + parseInt(schedule.duration, 10)
  );
  const geyserDuration = Math.max(...schedulesEndTime.map(endTime => endTime - now), 0);
  return Math.max(Math.min(geyserDuration, parseInt(scalingTime, 10)), DAY_IN_SEC);
};

async function getStakeDrip(stake, duration, contract) {
  const now = nowInSeconds();
  const afterDuration = now + duration;
  const futureReward = await contract.getFutureUnlockedRewards(afterDuration);
  const currentReward = await contract.getCurrentUnlockedRewards();
  const poolDrip = futureReward - currentReward;
  const stakeUnitsFromStake = stake * duration;
  const geyserData = await contract.getGeyserData();
  const { lastUpdate, totalStake, totalStakeUnits } = geyserData;
  const durationSinceLastUpdate = Math.max(afterDuration - lastUpdate, 0);
  // console.log('duration: ', duration);
  // console.log('stake:', stake.toString());
  // console.log('total stake units:', totalStakeUnits.toString());
  // console.log('total stake:', totalStake.toString());
  // console.log('duration since last update:', durationSinceLastUpdate);
  // console.log('stake units from stake:', stakeUnitsFromStake.toString());
  const totalStakeUnitsAfterDuration = Number(totalStakeUnits) + (Number(totalStake) * durationSinceLastUpdate)
  // console.log('total stake units after duration:', totalStakeUnitsAfterDuration.toString());
  // console.log('totalStakeUnitsAfterDuration: ', totalStakeUnitsAfterDuration)
  if (totalStakeUnitsAfterDuration === 0) return 0;

  const stakeDrip = poolDrip * stakeUnitsFromStake / (totalStakeUnitsAfterDuration + stakeUnitsFromStake) / (10 ** 9)
  return stakeDrip;
};

function calculateAPY(inflow, outflow, periods) { return (outflow * YEAR_IN_SEC) / inflow / periods }

async function getPoolAPY(geyser, stakingTokenPrice, stakingTokenDecimals, rewardTokenPrice, rewardTokenDecimals, library) {
  // console.log('stakingTokenPrice: ', stakingTokenPrice)
  // console.log('rewardTokenPrice', rewardTokenPrice)
  const { scalingTime } = geyser;
  const inflow = 20000.0;
  const inflowDecimals = 10 ** stakingTokenDecimals;
  const inflowFixedPt = inflow * inflowDecimals;
  const stakeTokenPriceBigNum = Math.round(stakingTokenPrice * 1000);
  const stake = inflowFixedPt * 1000 / stakeTokenPriceBigNum;
  const calcPeriod = getCalcPeriod(geyser);
  const contract = new ethers.Contract(geyser.id, GEYSER_ABI, library);
  const stakeDripAfterPeriod = await getStakeDrip(stake, parseInt(scalingTime, 10), contract);
  // console.log('stake drip after period:', stakeDripAfterPeriod);
  if (stakeDripAfterPeriod === 0) return 0;
  const outflow = parseFloat(Math.round(stakeDripAfterPeriod) / (10 ** rewardTokenDecimals)) * rewardTokenPrice;

  return calculateAPY(inflow, outflow * 1e9, calcPeriod);
}
