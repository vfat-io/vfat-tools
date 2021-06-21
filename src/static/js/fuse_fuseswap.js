$(function() {
consoleInit(main)
});

async function main() {

  const FUSE_ABI = [{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"withdrawInterest","inputs":[],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"withdrawStakeAndInterest","inputs":[{"type":"uint256","name":"_amount"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"updateGlobalYield","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"globalTotalStaked"},{"type":"uint256","name":"globalYieldPerToken"},{"type":"uint256","name":"lastUpdated"}],"name":"interestData","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":""}],"name":"vaultAddress","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":""}],"name":"getStakeToken","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":""}],"name":"getRewardToken","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"stakingStartTime","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"totalReward","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""},{"type":"uint256","name":""}],"name":"getYieldData","inputs":[{"type":"address","name":"_staker"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"_amount"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"stakingPeriod","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""},{"type":"uint256","name":""}],"name":"getStakerData","inputs":[{"type":"address","name":"_staker"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"calculateInterest","inputs":[{"type":"address","name":"_staker"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""},{"type":"uint256","name":""},{"type":"uint256","name":""},{"type":"uint256","name":""},{"type":"uint256","name":""}],"name":"getStatsData","inputs":[{"type":"address","name":"_staker"}],"constant":true},{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[{"type":"address","name":"_stakeToken"},{"type":"address","name":"_rewardToken"},{"type":"uint256","name":"_stakingPeriod"},{"type":"uint256","name":"_totalRewardToBeDistributed"},{"type":"uint256","name":"_stakingStart"},{"type":"address","name":"_vaultAdd"}]},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"staker","indexed":true},{"type":"uint256","name":"value","indexed":false},{"type":"uint256","name":"_globalYieldPerToken","indexed":false}],"anonymous":false},{"type":"event","name":"StakeWithdrawn","inputs":[{"type":"address","name":"staker","indexed":true},{"type":"uint256","name":"value","indexed":false},{"type":"uint256","name":"_globalYieldPerToken","indexed":false}],"anonymous":false},{"type":"event","name":"InterestCollected","inputs":[{"type":"address","name":"staker","indexed":true},{"type":"uint256","name":"_value","indexed":false},{"type":"uint256","name":"_globalYieldPerToken","indexed":false}],"anonymous":false}]
  
  const Pools = [
    "0x04Ee5DE43332aF99eeC2D40de19962AA1cC583EC",
    "0xf14D745a4D264255F758B541BB1F61EbC589EA25",
    "0xAAb4FB30aD9c20EFFDA712c0fFC24f77b1B5439d",
    "0x65995B106988E9aCd15998a5DF95aDe89b6511c8"
  ].map(a => {
    return {
      address: a,
      abi: FUSE_ABI,
      stakeTokenFunction: "getStakeToken",
      rewardTokenFunction: "getRewardToken"
    }
  })

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  let tokens = {};
  let prices = await getFusePrices();

  let p = await loadFusePools(App, tokens, prices, Pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

async function loadFusePools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadFusePoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printSynthetixPool(App, i, "fuse");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadFusePoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    let stakeToken = await getFuseToken(App, stakeTokenAddress, stakingAddress);

    let newPriceAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(prices, x));
    let newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    let newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getFuseToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getFuseToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "fuse");

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const stakingPeriod = await STAKING_POOL.stakingPeriod(); //seconds
    const totalRewards = await STAKING_POOL.totalReward();
    const rewardsPerSeconds = totalRewards / stakingPeriod;
    const weeklyRewards = rewardsPerSeconds / 10 ** rewardToken.decimals * 604800;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const usersInfo = await STAKING_POOL.getStakerData(App.YOUR_ADDRESS)
    const userStaked = usersInfo[1] / 10 ** stakeToken.decimals;

    const statsData = await STAKING_POOL.getStatsData(App.YOUR_ADDRESS);
    const earned = statsData[4] / 10 ** rewardToken.decimals;

    const userUnstaked = stakeToken.unstaked;

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
