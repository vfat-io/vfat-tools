$(function () {
  consoleInit(main)
});

const THALES_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"secondReward","type":"uint256"}],"name":"BothRewardsAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"SecondRewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"SecondRewardTokenPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"SecondRewardsTokenChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"uint256","name":"secondReward","type":"uint256"}],"name":"addBothRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"addReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"addSecondReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"earnedFirstToken","type":"uint256"},{"internalType":"uint256","name":"earnedSecondToken","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSecondRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"initNonReentrant","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_secondRewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"uint256","name":"secondReward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerSecondTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"uint256","name":"secondReward","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"secondRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"secondRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"secondRewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"setSecondRewardsToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"proxyAddress","type":"address"}],"name":"transferOwnershipAtInit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerSecondTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const Pools = [
  "0x31a20e5b7b1b067705419d57ab4f72e81cc1f6bf", //WETH-THALES

].map(a => ({
      address: a,
      abi: THALES_ABI,
      stakeTokenFunction: "stakingToken",
      rewardTokenFunction: "rewardsToken"
  }))

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  const prices = await getOptimisticPrices();

  let p = await loadMultipleThalesSynthetixPools(App, tokens, prices, Pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
  _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();

}

async function loadMultipleThalesSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadThalesSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printThalesSynthetixPool(App, i, "optimism");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalApr };
}

async function loadThalesSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();
    const secondRewardTokenAddress = await STAKING_POOL.secondRewardsToken();

    var stakeToken = await getOptimisticToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getOptimisticToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getOptimisticToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    if (!getParameterCaseInsensitive(tokens, secondRewardTokenAddress)) {
        tokens[secondRewardTokenAddress] = await getOptimisticToken(App, secondRewardTokenAddress, stakingAddress);
    }
    const secondRewardToken = getParameterCaseInsensitive(tokens, secondRewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;
    const secondRewardTokenTicker = secondRewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "optimistic");

    if (!poolPrices)
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const secondRewardTokenPrice = getParameterCaseInsensitive(prices, secondRewardTokenAddress)?.usd;

    const calls = [STAKING_MULTI.periodFinish(), STAKING_MULTI.rewardRate(), STAKING_MULTI.secondRewardRate(),
      STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(App.YOUR_ADDRESS)]
    const [periodFinish, rewardRate, secondRewardRate, balance, earned_] = await App.ethcallProvider.all(calls);

    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 10 ** rewardToken.decimals * 604800;
    const secondWeeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : secondRewardRate / 10 ** secondRewardToken.decimals * 604800;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;
    const secondUsdPerWeek = secondWeeklyRewards * secondRewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = earned_.earnedFirstToken / 10 ** rewardToken.decimals;
    const earnedSecond = earned_.earnedSecondToken / 10 ** secondRewardToken.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      secondRewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      secondRewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      secondRewardTokenPrice,
      weeklyRewards,
      secondWeeklyRewards,
      usdPerWeek,
      secondUsdPerWeek,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned,
      earnedSecond
    }
}

async function printThalesSynthetixPool(App, info, chain="eth", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
  _print(`${info.secondRewardTokenTicker} Per Week: ${info.secondWeeklyRewards.toFixed(2)} ($${formatMoney(info.secondUsdPerWeek)})`);
  const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
  const secondWeeklyAPR = info.secondUsdPerWeek / info.staked_tvl * 100;
  const dailyAPR = weeklyAPR / 7;
  const secondDailyAPR = secondWeeklyAPR / 7;
  const yearlyAPR = weeklyAPR * 52;
  const secondYearlyAPR = secondWeeklyAPR * 52;
  const totalDailyAPR = dailyAPR + secondDailyAPR;
  const totalWeeklyAPR = weeklyAPR + secondWeeklyAPR;
  const totalYearlyyAPR = yearlyAPR + secondYearlyAPR;
  _print(`APR ${info.rewardTokenTicker}: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  _print(`APR ${info.secondRewardTokenTicker}: Day ${secondDailyAPR.toFixed(2)}% Week ${secondWeeklyAPR.toFixed(2)}% Year ${secondYearlyAPR.toFixed(2)}%`);
  _print(`Total APR: Day ${totalDailyAPR.toFixed(2)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyyAPR.toFixed(2)}%`);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (info.userStaked > 0) {
    info.poolPrices.print_contained_price(info.userStaked);
    const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
    const userDailyRewards = userWeeklyRewards / 7;
    const userYearlyRewards = userWeeklyRewards * 52;
    const userSecondWeeklyRewards = userStakedPct * info.secondWeeklyRewards / 100;
    const userSecondDailyRewards = userSecondWeeklyRewards / 7;
    const userSecondYearlyRewards = userSecondWeeklyRewards * 52;
      _print(`Estimated ${info.rewardTokenTicker} + ${info.secondRewardTokenTicker} earnings:`
          + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)}) + ${userSecondDailyRewards.toFixed(2)} ($${formatMoney(userSecondDailyRewards*info.secondRewardTokenPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)}) + ${userSecondWeeklyRewards.toFixed(2)} ($${formatMoney(userSecondWeeklyRewards*info.secondRewardTokenPrice)})`
          + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)}) + ${userSecondYearlyRewards.toFixed(2)} ($${formatMoney(userSecondYearlyRewards*info.secondRewardTokenPrice)})`);
  }
  const approveTENDAndStake = async function() {
    return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function() {
    return rewardsContract_unstake(info.stakingAddress, App)
  }
  const claim = async function() {
    return rewardsContract_claim(info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://optimistic.etherscan.io/address/${info.stakingAddress}#code">Optimism</a>`);
  if (info.stakeTokenAddress != "0x0000000000000000000000000000000000000000") {
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  }
  else {
    _print(`Please use the official website to stake ${info.stakeTokenTicker}.`);
  }
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)}) + ${info.earnedSecond.toFixed(6)} ${info.secondRewardTokenTicker} ($${formatMoney(info.earnedSecond*info.secondRewardTokenPrice)})`, claim)
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Revoke (set approval to 0)`, revoke)
  }
  _print_link(`Exit`, exit)
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd,
      apr : yearlyAPR
  }
}