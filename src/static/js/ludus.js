$(function() {
  consoleInit();
  start(main);
});

const LUDUS_CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"stakeToken_","type":"address"},{"internalType":"address","name":"rewardToken_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"RoundReset","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FARMING_END_TIMESTAMP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FARMING_START_TIMESTAMP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_ALLOCATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account_","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"farmingStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account_","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IMintable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakeToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdrawAndClaim","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Pools = [
  "0x9494b87a5bc8D7Be31f88821E5081Dc5aB029EB2",
  "0x055c2E794c6e1308B7a1B4c7b80aAf5Ed757c2F6"
].map(a => { 
  return {
    address: a,
    abi: LUDUS_CONTRACT_ABI,
    stakeTokenFunction: "stakeToken",
    rewardTokenFunction: "rewardToken"
  }; }
)

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = {};

  let p = await loadMultipleLudusSynthetixPools(App, tokens, prices, Pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

async function loadMultipleLudusSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  let infos = [];
  for(const pool of pools){
    let info = await loadLudusPoolInfo(App, tokens, prices, pool.abi, pool.address, pool.rewardTokenFunction,
      pool.stakeTokenFunction);
    infos.push(info);
  }
  for (const i of infos) {
    let p = await printSynthetixPool(App, i);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadLudusPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await STAKING_POOL.totalValue() / 10 ** stakeToken.decimals;
    }

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      x.toLowerCase() !=  "0xb34ab2f65c6e4f764ffe740ab83f982021faed6d" && //BSG can't be retrieved from Coingecko
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const calls = [STAKING_MULTI.FARMING_END_TIMESTAMP(), STAKING_MULTI.rewardRate(), 
      STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.pendingReward(App.YOUR_ADDRESS)]
    const [periodFinish, rewardRate, balance, earned_] = await App.ethcallProvider.all(calls);
    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = earned_ / 10 ** rewardToken.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      weeklyRewards,
      usdPerWeek,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned
    }
}