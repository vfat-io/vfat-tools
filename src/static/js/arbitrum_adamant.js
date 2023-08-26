$(function() {
  consoleInit(main)
  });
  
  const ARBY_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address[]","name":"_minters","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"rewardsToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_distributor","type":"address"}],"name":"addReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_distributor","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"approveRewardDistributor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"claimableRewards","outputs":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct MultiFeeDistribution2.RewardData[]","name":"rewards","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earnedBalances","outputs":[{"internalType":"uint256","name":"total","type":"uint256"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"unlockTime","type":"uint256"}],"internalType":"struct MultiFeeDistribution2.LockedBalance[]","name":"earningsData","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"lockedBalances","outputs":[{"internalType":"uint256","name":"total","type":"uint256"},{"internalType":"uint256","name":"unlockable","type":"uint256"},{"internalType":"uint256","name":"locked","type":"uint256"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"unlockTime","type":"uint256"}],"internalType":"struct MultiFeeDistribution2.LockedBalance[]","name":"lockData","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lockedStakeWhitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"minters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardData","outputs":[{"internalType":"uint256","name":"periodFinish","type":"uint256"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"lastUpdateTime","type":"uint256"},{"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewardDistributors","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setLockedStakeContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"ignored","type":"bool"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stakeLocked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IMintableToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"totalBalance","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"unlockedBalance","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawExpiredLocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"withdrawableBalance","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"penaltyAmount","type":"uint256"}],"stateMutability":"view","type":"function"}]
  const ARBY_STAKING_ABI1 = [{"inputs":[{"internalType":"address","name":"_strategy","type":"address"},{"internalType":"address","name":"_rewardsTokenA","type":"address"},{"internalType":"address","name":"_rewardsTokenB","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardB","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"rewardToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endingTimeStamp","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"approvedStakers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dualRewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earnedA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earnedB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getEndingTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getLastDepositTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardAForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardBForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rewardA","type":"uint256"},{"internalType":"uint256","name":"rewardB","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerTokenA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenAStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenBStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRateA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRateB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsTokenA","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsTokenB","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_staker","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovedStaker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_dualRewardsDistribution","type":"address"}],"name":"setDualRewardsDistribution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"setLockEndingDate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unlockStakes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unlockedStakes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"updatePeriodFinish","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userDepositTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenAPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenBPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  const Addresses = [
    "0x097b15dc3bcfa7d08ea246c09b6a9a778e5b007b",
  ]

  const Addresses1 = [
    "0x9d5d0cb1b1210d4bf0e0fdcc6aca1583fa48f0fd",
  ]
  
  async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const tokens = {};
    const prices = await getArbitrumPrices();
  
    const pools = Addresses.map(a => { return {
      address: a,
      abi: ARBY_STAKING_ABI,
      stakeTokenFunction: "stakingToken"
    }})

    const pools1 = Addresses.map(a => { return {
      address: a,
      abi: ARBY_STAKING_ABI1,
      stakeTokenFunction: "stakingToken"
    }})

    //getting the staking token price from its LP address
    await loadAdamantSynthetixPoolInfoPrice(App, tokens, prices, App.YOUR_ADDRESS, "0xc5fFd083B983AAF823a9b485b207F898ed2f32DC")

    let p = await loadAdamantSynthetixPools(App, tokens, prices, pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    }

    _print("");

    let p1 = await loadAdamantSynthetixPools1(App, tokens, prices, pools1)
    _print_bold(`Total staked: $${formatMoney(p1.staked_tvl)}`);
    if (p1.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p1.totalUserStaked)} at an APR of ${(p1.totalAPR * 100).toFixed(2)}%\n`);
    }
  
    hideLoading();
  }
  
async function loadAdamantSynthetixPools(App, tokens, prices, pools) {
  let totalStaked = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadAdamantSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printAdamantSynthetixPool(App, i, "arbitrum");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x, y) => x + y, 0) / totalUserStaked;
  return { staked_tvl: totalStaked, totalUserStaked, totalApr };
}

async function loadAdamantSynthetixPools1(App, tokens, prices, pools) {
  let totalStaked = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadAdamantSynthetixPoolInfo1(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printAdamantSynthetixPool(App, i, "arbitrum");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x, y) => x + y, 0) / totalUserStaked;
  return { staked_tvl: totalStaked, totalUserStaked, totalApr };
}

async function loadAdamantSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, stakeTokenFunction) {
  const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

  const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

  const calls = [STAKING_MULTI.totalBalance(App.YOUR_ADDRESS), STAKING_MULTI.claimableRewards(App.YOUR_ADDRESS)]
  const [balance, earned_] = await App.ethcallProvider.all(calls);

  let rewardTokenAddresses = [], rewardTokens = [], rewardTokenTickers = [], rewardTokenPrices = [], weeklyRewards = [], usdCoinsPerWeek = [], earnings = [];

  for(let i = 0; i < 2; i++){
    const rewardTokenAddress = await STAKING_POOL.rewardTokens(i);
    rewardTokenAddresses.push(rewardTokenAddress);

    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
      tokens[rewardTokenAddress] = await getArbitrumToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
    rewardTokens.push(rewardToken);

    const rewardTokenTicker = rewardToken.symbol;
    rewardTokenTickers.push(rewardTokenTicker);

    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    rewardTokenPrices.push(rewardTokenPrice);

    const rewardData = await STAKING_POOL.rewardData(rewardTokenAddress);

    const weeklyReward = (Date.now() / 1000 > rewardData.periodFinish) ? 0 : rewardData.rewardRate / 10 ** rewardToken.decimals * 604800;
    weeklyRewards.push(weeklyReward);

    const usdPerWeek = weeklyReward * rewardTokenPrice;
    usdCoinsPerWeek.push(usdPerWeek);

    const earned = earned_[i][1] / 10 ** rewardToken.decimals;
    earnings.push(earned);
  }

  var stakeToken = await getArbitrumToken(App, stakeTokenAddress, stakingAddress);

  var newTokenAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(tokens, x));
  for (const address of newTokenAddresses) {
    tokens[address] = await getArbitrumToken(App, address, stakingAddress);
  }

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

  if (!poolPrices) {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
    return null;
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
    prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

  const staked_tvl = poolPrices.staked_tvl;

  const userStaked = balance / 10 ** stakeToken.decimals;

  const userUnstaked = stakeToken.unstaked;

  return {
    stakingAddress,
    poolPrices,
    stakeTokenAddress,
    rewardTokenAddresses,
    stakeTokenTicker,
    rewardTokenTickers,
    stakeTokenPrice,
    rewardTokenPrices,
    weeklyRewards,
    usdCoinsPerWeek,
    staked_tvl,
    userStaked,
    userUnstaked,
    earnings
  }
}

async function loadAdamantSynthetixPoolInfo1(App, tokens, prices, stakingAbi, stakingAddress, stakeTokenFunction) {
  const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

  const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

  const earned_a = await STAKING_POOL.earnedA(App.YOUR_ADDRESS);
  const earned_b = await STAKING_POOL.earnedB(App.YOUR_ADDRESS);
  const rewardsTokenA = await STAKING_POOL.rewardsTokenA();
  const rewardsTokenB = await STAKING_POOL.rewardsTokenB();
  const rewardRateA = await STAKING_POOL.rewardRateA();
  const rewardRateB = await STAKING_POOL.rewardRateB();
  const periodFinish = await STAKING_POOL.periodFinish();
  const balance = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS);

  let rewardTokenAddresses = [], rewardTokens = [], rewardTokenTickers = [], rewardTokenPrices = [], weeklyRewards = [], usdCoinsPerWeek = [], earnings = [];

  rewardTokenAddresses.push(rewardsTokenA, rewardsTokenB);

  if (!getParameterCaseInsensitive(tokens, rewardsTokenA)) {
    tokens[rewardsTokenA] = await getArbitrumToken(App, rewardsTokenA, stakingAddress);
  }
  if (!getParameterCaseInsensitive(tokens, rewardsTokenB)) {
    tokens[rewardsTokenB] = await getArbitrumToken(App, rewardsTokenB, stakingAddress);
  }

  const rewardTokenA = getParameterCaseInsensitive(tokens, rewardsTokenA);
  const rewardTokenB = getParameterCaseInsensitive(tokens, rewardsTokenB);
  rewardTokens.push(rewardTokenA, rewardTokenB);

  const rewardTokenTickerA = rewardTokenA.symbol;
  const rewardTokenTickerB = rewardTokenB.symbol;
  rewardTokenTickers.push(rewardTokenTickerA, rewardTokenTickerB);

  const rewardTokenPriceA = getParameterCaseInsensitive(prices, rewardsTokenA)?.usd;
  const rewardTokenPriceB = getParameterCaseInsensitive(prices, rewardsTokenB)?.usd;
  rewardTokenPrices.push(rewardTokenPriceA, rewardTokenPriceB);

  const weeklyRewardA = (Date.now() / 1000 > periodFinish) ? 0 : rewardRateA / 10 ** rewardTokenA.decimals * 604800;
  const weeklyRewardB = (Date.now() / 1000 > periodFinish) ? 0 : rewardRateB / 10 ** rewardTokenB.decimals * 604800;
  weeklyRewards.push(weeklyRewardA, weeklyRewardB);

  const usdPerWeekA = weeklyRewardA * rewardTokenPriceA;
  const usdPerWeekB = weeklyRewardB * rewardTokenPriceB;
  usdCoinsPerWeek.push(usdPerWeekA, usdPerWeekB);

  const earnedA = earned_a / 10 ** rewardTokenA.decimals;
  const earnedB = earned_b / 10 ** rewardTokenB.decimals;
  earnings.push(earnedA, earnedB);

  var stakeToken = await getArbitrumToken(App, stakeTokenAddress, stakingAddress);

  var newTokenAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(tokens, x));
  for (const address of newTokenAddresses) {
    tokens[address] = await getArbitrumToken(App, address, stakingAddress);
  }

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

  if (!poolPrices) {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
    return null;
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
    prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

  const staked_tvl = poolPrices.staked_tvl;

  const userStaked = balance / 10 ** stakeToken.decimals;

  const userUnstaked = stakeToken.unstaked;

  return {
    stakingAddress,
    poolPrices,
    stakeTokenAddress,
    rewardTokenAddresses,
    stakeTokenTicker,
    rewardTokenTickers,
    stakeTokenPrice,
    rewardTokenPrices,
    weeklyRewards,
    usdCoinsPerWeek,
    staked_tvl,
    userStaked,
    userUnstaked,
    earnings
  }
}

async function printAdamantSynthetixPool(App, info, chain = "eth", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  let totalYearlyAPR = 0;
  for(let i = 0; i < info.rewardTokenTickers.length; i++){
    _print(`${info.rewardTokenTickers[i]} Per Week: ${info.weeklyRewards[i].toFixed(2)} ($${formatMoney(info.usdCoinsPerWeek[i])})`);
    const weeklyAPR = info.usdCoinsPerWeek[i] / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    totalYearlyAPR += yearlyAPR;
    _print(`APR: ${info.rewardTokenTickers[i]} Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  }
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
    `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);

  const approveTENDAndStake = async function () {
    return rewardsContractArbitrum_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function () {
    return rewardsContractArbitrum_unstake(info.stakingAddress, App)
  }
  const claim = async function () {
    return adamantContractArbitrum_claim(info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}#code">Arbitrum Explorer</a>`);
  //_print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  let claimLink = ``;
  for(let i = 0; i < info.earnings.length; i++){
    claimLink += `${info.earnings[i].toFixed(6)} ${info.rewardTokenTickers[i]} ($${formatMoney(info.earnings[i]*info.rewardTokenPrices[i])}) `
  }
  _print_link(`Claim ${claimLink}`, claim);
  _print("");

  return {
    staked_tvl: info.poolPrices.staked_tvl,
    userStaked: userStakedUsd,
    apr: totalYearlyAPR
  }
}

const adamantContractArbitrum_claim = async function (rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  showLoading()
    REWARD_POOL.getReward()
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
      })
}

async function loadAdamantSynthetixPoolInfoPrice(App, tokens, prices, stakingAddress, stakeTokenAddress) {
  var stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress);
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
      tokens[address] = await getGeneralEthcallToken(App, address, stakingAddress);
  }
  const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

  if (!poolPrices)
  {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
    return null;
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
      prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

  const staked_tvl = poolPrices.staked_tvl;

  return  {
    stakingAddress,
    poolPrices,
    stakeTokenAddress,
    stakeTokenTicker,
    stakeTokenPrice,
    staked_tvl,
  }
}