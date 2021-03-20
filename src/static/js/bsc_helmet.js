
$(function() {
    consoleInit();
    start(main);
  });

const HELMET_CHEF_ABI0 = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousGovernor","type":"address"},{"indexed":true,"internalType":"address","name":"newGovernor","type":"address"}],"name":"GovernorshipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward2","type":"uint256"}],"name":"RewardPaid2","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"begin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"}],"name":"getConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"}],"name":"getConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDoubleReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"},{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_stakingPool2","type":"address"},{"internalType":"address","name":"_rewardsToken2","type":"address"},{"internalType":"uint256","name":"_pid2","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"governor_","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lep","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lep","type":"uint256"},{"internalType":"uint256","name":"_period","type":"uint256"},{"internalType":"uint256","name":"_span","type":"uint256"},{"internalType":"uint256","name":"_begin","type":"uint256"}],"name":"notifyRewardBegin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"period","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pid2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardDelta","outputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken2","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingPool2","outputs":[{"internalType":"contract IMasterChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newGovernor","type":"address"}],"name":"transferGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {  
    const App = await init_ethers();

    const Pool0 = {
      address : "0xb22425206D40605E9bE5a5460786DBaB5aBA9485",
      abi : HELMET_CHEF_ABI0,
      stakingTokenFunction : "stakingToken",
      RewardTokenFunction0 : "rewardsToken",
      RewardTokenFunction1 : "rewardsToken2"
    };
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const tokens = {};
    const prices = await getBscPrices();

    let p0 = await loadHelmetSynthetixPools(App, tokens, prices, Pool0.abi, Pool0.address, Pool0.RewardTokenFunction0,
      Pool0.RewardTokenFunction1, Pool0.stakingTokenFunction)

    hideLoading();  
  }

async function loadHelmetSynthetixPools(App, tokens, prices, abi, address) {
    const info = await loadHelmetSynthetixPoolsInfo(App, tokens, prices, abi, address);
    return await printHelmetSynthetixPool(App, info);
}

async function loadHelmetSynthetixPoolsInfo(App, tokens, prices, stakingAbi, stakingAddress) {
  const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

  const calls = [STAKING_MULTI.stakingToken(), STAKING_MULTI.rewardsToken(),
                 STAKING_MULTI.rewardsToken2(), STAKING_MULTI.periodFinish(),
                 STAKING_MULTI.rewardPerToken(), STAKING_MULTI.rewardPerToken2(),
                 STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), 
                 STAKING_MULTI.earned(App.YOUR_ADDRESS), STAKING_MULTI.earned2(App.YOUR_ADDRESS)]
  const [stakeTokenAddress, rewardTokenAddress0, rewardTokenAddress1,
         periodFinish, rewardRate0, rewardRate1, balance,
         earned_0, earned_1] = await App.ethcallProvider.all(calls)

  let stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    let newPriceAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(prices, x)).concat([rewardTokenAddress0, rewardTokenAddress1])
  let newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
    if (newPrices[key]?.usd)
        prices[key] = newPrices[key];
  }
  let newTokenAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(tokens,x));
  for (const address of newTokenAddresses) {
      tokens[address] = await getToken(App, address, stakingAddress);
  }

  if (!getParameterCaseInsensitive(tokens, rewardTokenAddress0)) {
      tokens[rewardTokenAddress0] = await getToken(App, rewardTokenAddress0, stakingAddress);
  }
  if (!getParameterCaseInsensitive(tokens, rewardTokenAddress1)) {
      tokens[rewardTokenAddress1] = await getToken(App, rewardTokenAddress1, stakingAddress);
  }

  const rewardToken0 = getParameterCaseInsensitive(tokens, rewardTokenAddress0);
  const rewardToken1 = getParameterCaseInsensitive(tokens, rewardTokenAddress1);

  const rewardTokenTicker0 = rewardToken0.symbol;
  const rewardTokenTicker1 = rewardToken1.symbol;

  const poolPrices = getPoolPrices(tokens, prices, stakeToken);

  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice = poolPrices.price;

  const rewardTokenPrice0 = getParameterCaseInsensitive(prices, rewardTokenAddress0)?.usd;
  const rewardTokenPrice1 = getParameterCaseInsensitive(prices, rewardTokenAddress1)?.usd;

  const weeklyRewards0 = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate0 / 1e18 * 604800;
  const weeklyRewards1 = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate1 / 1e18 * 604800;

  const usdPerWeek0 = weeklyRewards0 * rewardTokenPrice0;
  const usdPerWeek1 = weeklyRewards1 * rewardTokenPrice1;

  const staked_tvl = poolPrices.staked_tvl;

  const userStaked = balance / 10 ** stakeToken.decimals;

  const userUnstaked = stakeToken.unstaked;

  const earned0 = earned_0 / 10 ** rewardToken0.decimals;
  const earned1 = earned_1 / 10 ** rewardToken1.decimals;

  return  {
    stakingAddress,
    poolPrices,
    stakeTokenAddress,
    rewardTokenAddress0,
    rewardTokenAddress1,
    stakeTokenTicker,
    rewardTokenTicker0,
    rewardTokenTicker1,
    stakeTokenPrice,
    rewardTokenPrice0,
    rewardTokenPrice1,
    weeklyRewards0,
    weeklyRewards1,
    usdPerWeek0,
    usdPerWeek1,
    staked_tvl,
    userStaked,
    userUnstaked,
    earned0,
    earned1
  }
}

async function printHelmetSynthetixPool(App, info, chain="bsc") {
  info.poolPrices.print_price(chain);
  _print(`${info.rewardTokenTicker0} Per Week: ${info.weeklyRewards0.toFixed(2)} ($${formatMoney(info.usdPerWeek0)})`);
  const weeklyAPR0 = info.usdPerWeek0 / info.staked_tvl * 100;
  const dailyAPR0 = weeklyAPR0 / 7;
  const yearlyAPR0 = weeklyAPR0 * 52;
  _print(`${info.rewardTokenTicker0} APR: Day ${dailyAPR0.toFixed(2)}% Week ${weeklyAPR0.toFixed(2)}% Year ${yearlyAPR0.toFixed(2)}%`);
  _print(`${info.rewardTokenTicker1} Per Week: ${info.weeklyRewards1.toFixed(2)} ($${formatMoney(info.usdPerWeek1)})`);
  const weeklyAPR1 = info.usdPerWeek1 / info.staked_tvl * 100;
  const dailyAPR1 = weeklyAPR1 / 7;
  const yearlyAPR1 = weeklyAPR1 * 52;
  _print(`${info.rewardTokenTicker1} APR: Day ${dailyAPR1.toFixed(2)}% Week ${weeklyAPR1.toFixed(2)}% Year ${yearlyAPR1.toFixed(2)}%`);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (info.userStaked > 0) {
    info.poolPrices.print_contained_price(info.userStaked);
      const userWeeklyRewards0 = userStakedPct * info.weeklyRewards0 / 100;
      const userWeeklyRewards1 = userStakedPct * info.weeklyRewards1 / 100;
      const userDailyRewards0 = userWeeklyRewards0 / 7;
      const userDailyRewards1 = userWeeklyRewards1 / 7;
      const userYearlyRewards0 = userWeeklyRewards0 * 52;
      const userYearlyRewards1 = userWeeklyRewards1 * 52;
      _print(`Estimated ${info.rewardTokenTicker0} earnings:`
          + ` Day ${userDailyRewards0.toFixed(2)} ($${formatMoney(userDailyRewards0*info.rewardTokenPrice0)})`
          + ` Week ${userWeeklyRewards0.toFixed(2)} ($${formatMoney(userWeeklyRewards0*info.rewardTokenPrice0)})`
          + ` Year ${userYearlyRewards0.toFixed(2)} ($${formatMoney(userYearlyRewards0*info.rewardTokenPrice0)})`);
      _print(`Estimated ${info.rewardTokenTicker1} earnings:`
          + ` Day ${userDailyRewards1.toFixed(2)} ($${formatMoney(userDailyRewards1*info.rewardTokenPrice1)})`
          + ` Week ${userWeeklyRewards1.toFixed(2)} ($${formatMoney(userWeeklyRewards1*info.rewardTokenPrice1)})`
          + ` Year ${userYearlyRewards1.toFixed(2)} ($${formatMoney(userYearlyRewards1*info.rewardTokenPrice1)})`);
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
  switch (chain) {
    case "eth":
      _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
      break;
    case "avax":
      _print(`<a target="_blank" href="https://cchain.explorer.avax.network/address/${info.stakingAddress}#code">Explorer</a>`);
      break;
    case "bsc":
      _print(`<a target="_blank" href="https://bscscan.com/address/${info.stakingAddress}#code">BSC Scan</a>`);
      break;
    case "heco":
      _print(`<a target="_blank" href="https://scan.hecochain.com/address/${info.stakingAddress}#code">Heco Scan</a>`);
      break;
    case "matic":
      _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Matic Explorer</a>`);
      break;
  }
  _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${info.earned0.toFixed(6)} ${info.rewardTokenTicker0} ($${formatMoney(info.earned0*info.rewardTokenPrice0)})`, claim)
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print_link(`Exit`, exit)
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd,
      apr : (yearlyAPR0 + yearlyAPR1)
  }
}