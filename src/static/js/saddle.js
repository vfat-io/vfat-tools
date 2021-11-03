$(function() {
consoleInit(main)
  });

  const SADDLE_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"string[]","name":"_rewardSymbols","type":"string[]"},{"internalType":"address[]","name":"_rewardTokens","type":"address[]"},{"internalType":"address[]","name":"_rewardManagers","type":"address[]"},{"internalType":"uint256[]","name":"_rewardRates","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"DefaultInitialization","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"multiplier","type":"uint256"}],"name":"LockedStakeMaxMultiplierUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"secs","type":"uint256"}],"name":"LockedStakeMinTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"secs","type":"uint256"}],"name":"LockedStakeTimeForMaxMultiplier","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"destination_address","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"address","name":"token_address","type":"address"},{"indexed":false,"internalType":"address","name":"destination_address","type":"address"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"}],"name":"RewardsPeriodRenewed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"secs","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"kek_id","type":"bytes32"},{"indexed":false,"internalType":"address","name":"source_address","type":"address"}],"name":"StakeLocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"kek_id","type":"bytes32"},{"indexed":false,"internalType":"address","name":"destination_address","type":"address"}],"name":"WithdrawLocked","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"calcCurCombinedWeight","outputs":[{"internalType":"uint256","name":"old_combined_weight","type":"uint256"},{"internalType":"uint256","name":"new_combined_weight","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"reward_token_address","type":"address"},{"internalType":"address","name":"new_manager_address","type":"address"}],"name":"changeTokenManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"combinedWeightOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256[]","name":"new_earned","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllRewardTokens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256[]","name":"rewards_per_duration_arr","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardSymbols","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"greylist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"greylistAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initializeDefault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"caller_addr","type":"address"},{"internalType":"address","name":"reward_token_addr","type":"address"}],"name":"isTokenManagerFor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"secs","type":"uint256"}],"name":"lockMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lock_max_multiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lock_time_for_max_multiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lock_time_min","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"lockedLiquidityOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"lockedStakesOf","outputs":[{"components":[{"internalType":"bytes32","name":"kek_id","type":"bytes32"},{"internalType":"uint256","name":"start_timestamp","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"ending_timestamp","type":"uint256"},{"internalType":"uint256","name":"lock_multiplier","type":"uint256"}],"internalType":"struct CommunalFarm.LockedStake[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardManagers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardRates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardSymbols","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardTokenAddrToIdx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsCollectionPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsPerToken","outputs":[{"internalType":"uint256[]","name":"newRewardsPerTokenStored","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lock_time_for_max_multiplier","type":"uint256"},{"internalType":"uint256","name":"_lock_time_min","type":"uint256"}],"name":"setLockedStakeTimeForMinAndMaxMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lock_max_multiplier","type":"uint256"}],"name":"setMultipliers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"reward_token_address","type":"address"},{"internalType":"uint256","name":"new_rate","type":"uint256"},{"internalType":"bool","name":"sync_too","type":"bool"}],"name":"setRewardRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"secs","type":"uint256"}],"name":"stakeLocked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakesUnlocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleRewardsCollection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleWithdrawals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalCombinedWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLiquidityLocked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unlockStakes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"kek_id","type":"bytes32"}],"name":"withdrawLocked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawalsPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]

  async function main() {

    const Pool = {
      address              : "0x0639076265e9f88542C91DCdEda65127974A5CA5",
      abi                  : SADDLE_STAKING_ABI,
      stakeTokenAddress    : "0xd48cF4D7FB0824CC8bAe055dF3092584d0a1726A",
      rewardTokensFunction : "getAllRewardTokens"
    };

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};

    let p = await loadSaddlePool(App, tokens, prices, Pool.abi, Pool.address, Pool.rewardTokensFunction, Pool.stakeTokenAddress);
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

async function loadSaddlePool(App, tokens, prices, abi, address, rewardTokensFunction, stakeTokenAddress) {
  const info = await loadSaddlePoolInfo(App, tokens, prices, abi, address, rewardTokensFunction, stakeTokenAddress);
  return await printSaddleSynthetixPool(App, info);
}

async function loadSaddlePoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokensFunction, stakeTokenAddress) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    const rewardTokenAddresses = await STAKING_POOL.callStatic[rewardTokensFunction]();

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

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

    prices["0xd48cF4D7FB0824CC8bAe055dF3092584d0a1726A"] = { usd : 1 };

    await getNewPricesAndTokens(App, tokens, prices, rewardTokenAddresses, stakingAddress);

    for(const rewardTokenAddress of rewardTokenAddresses){
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
      }
    }

    let rewardTokens = [];
    for(const rewardTokenAddress of rewardTokenAddresses){
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
      rewardTokens.push(rewardToken);
    }

    let rewardTokenTickers = [];
    for(const rewardToken of rewardTokens){
      const rewardTokenTicker = rewardToken.symbol;
      rewardTokenTickers.push(rewardTokenTicker);
    }

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

    let rewardTokenPrices = [];
    for(const rewardTokenAddress of rewardTokenAddresses){
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      rewardTokenPrices.push(rewardTokenPrice);
    }

    const totalCombinedWeight = await STAKING_POOL.totalCombinedWeight() / 1e18;
    const periodFinish = await STAKING_POOL.periodFinish();
    const balance = await STAKING_POOL.lockedLiquidityOf(App.YOUR_ADDRESS);
    const _earnings = await STAKING_POOL.earned(App.YOUR_ADDRESS);
    const userStaked = balance / 10 ** stakeToken.decimals;
    const lockedStakesOf = await STAKING_POOL.lockedStakesOf(App.YOUR_ADDRESS);

    if(lockedStakesOf.length > 0){
      const lockMultiplier = lockedStakesOf[0].lock_multiplier / 1e18;
      const endingLockPeriod = lockedStakesOf[0].ending_timestamp;
      const multiplier = stakeToken.staked * lockMultiplier / totalCombinedWeight;
      const lockingDays = (endingLockPeriod - Date.now() / 1000) / 24 / 60 / 60;
      let rewardRates = [];
    for(let i = 0; i < rewardTokenAddresses.length; i++){
      const rewardRate = await STAKING_POOL.rewardRates(i);
      rewardRates.push(rewardRate);
    }

    let weeklyRewards = [];
    let userWeeklyRewards = [];
    for(const rewardRate of rewardRates){
      const weeklyReward = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;
      const userWeeklyReward = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800 * multiplier;
      weeklyRewards.push(weeklyReward);
      userWeeklyRewards.push(userWeeklyReward);
    }

    let usdCoinsPerWeek = [];
    let userUsdCoinsPerWeek = [];
    for(let i = 0; i < weeklyRewards.length; i++){
      const usdPerWeek = weeklyRewards[i] * rewardTokenPrices[i];
      const userUsdPerWeek = userWeeklyRewards[i] * rewardTokenPrices[i];
      usdCoinsPerWeek.push(usdPerWeek);
      userUsdCoinsPerWeek.push(userUsdPerWeek);
    }

    const staked_tvl = poolPrices.staked_tvl;

    const userUnstaked = stakeToken.unstaked;

    let earnings = [];
    for(let i = 0; i < _earnings.length; i++){
      const earnedCalculated = _earnings[i] / 10 ** rewardTokens[i].decimals;
      earnings.push(earnedCalculated);
    }

    return  {
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
      earnings,
      userWeeklyRewards,
      userUsdCoinsPerWeek,
      multiplier,
      lockingDays
    }
  }

    let rewardRates = [];
    for(let i = 0; i < rewardTokenAddresses.length; i++){
      const rewardRate = await STAKING_POOL.rewardRates(i);
      rewardRates.push(rewardRate);
    }

    let weeklyRewards = [];
    for(const rewardRate of rewardRates){
      const weeklyReward = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;
      weeklyRewards.push(weeklyReward);
    }

    let usdCoinsPerWeek = [];
    for(let i = 0; i < weeklyRewards.length; i++){
      const usdPerWeek = weeklyRewards[i] * rewardTokenPrices[i];
      usdCoinsPerWeek.push(usdPerWeek);
    }

    const staked_tvl = poolPrices.staked_tvl;

    const userUnstaked = stakeToken.unstaked;

    let earnings = [];
    for(let i = 0; i < _earnings.length; i++){
      const earnedCalculated = _earnings[i] / 10 ** rewardTokens[i].decimals;
      earnings.push(earnedCalculated);
    }

    return  {
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

async function printSaddleSynthetixPool(App, info, chain="eth", customURLs) {
    info.poolPrices.print_price(chain, 4, customURLs);
    for(let i = 0; i < info.rewardTokenTickers; i++){
      _print(`${info.rewardTokenTickers[i]} Per Week: ${info.weeklyRewards[i].toFixed(2)} ($${formatMoney(info.usdCoinsPerWeek[i])})`);
    }
    let totalYearlyAPR = 0;
    let totalWeeklyAPR = 0;
    let totalDailyAPR = 0;
    let totalUSDPerWeek = 0;
    for(let i = 0; i < info.rewardTokenTickers.length; i++){
      let weeklyAPR = info.usdCoinsPerWeek[i] / info.staked_tvl * 100;
      let dailyAPR = weeklyAPR / 7;
      yearlyAPR = weeklyAPR * 52;
      totalYearlyAPR += yearlyAPR;
      totalWeeklyAPR += weeklyAPR;
      totalDailyAPR += dailyAPR;
      totalUSDPerWeek += info.usdCoinsPerWeek[i];
      _print(`${info.rewardTokenTickers[i]} Per Week: ${info.weeklyRewards[i].toFixed(2)} ($${formatMoney(info.usdCoinsPerWeek[i])}) APR: Year ${yearlyAPR.toFixed(2)}%`);
    }
    _print(`Pool Total Per Week: $${formatMoney(totalUSDPerWeek)}`);
    _print(`Pool Total APR: Day ${totalDailyAPR.toFixed(4)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    let totalUserYearlyAPR = 0;
    let totalUserWeeklyAPR = 0;
    let totalUserDailyAPR = 0;
    let totalUserusdCoinsPerDay = 0;
    let totalUserusdCoinsPerWeek = 0;
    let totalUserusdCoinsPerYear = 0;
    let totalUserUSDPerWeek = 0;
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
      for(let i = 0; i < info.rewardTokenTickers.length; i++){
        let weeklyUserAPR = info.userUsdCoinsPerWeek[i] / info.staked_tvl * 100;
        let dailyUserAPR = weeklyUserAPR / 7;
        let yearlyUserAPR = weeklyUserAPR * 52;
        totalUserYearlyAPR += yearlyUserAPR;
        totalUserWeeklyAPR += weeklyUserAPR;
        totalUserDailyAPR += dailyUserAPR;
        totalUserUSDPerWeek += info.userUsdCoinsPerWeek[i];
        let userWeeklyRewards = userStakedPct * info.userWeeklyRewards[i] / 100 * info.multiplier;
        let userDailyRewards = userWeeklyRewards / 7;
        let userYearlyRewards = userWeeklyRewards * 52;
  
        totalUserusdCoinsPerDay += userDailyRewards;
        totalUserusdCoinsPerWeek += userWeeklyRewards;
        totalUserusdCoinsPerYear += userYearlyRewards;
      }
      _print(`User Total APR: Day ${totalUserDailyAPR.toFixed(2)}% Week ${totalUserWeeklyAPR.toFixed(2)}% Year ${totalUserYearlyAPR.toFixed(2)}%`);
      _print(`User Total Earnings: Day $${totalUserusdCoinsPerDay.toFixed(2)} Week $${totalUserusdCoinsPerWeek.toFixed(2)} Year $${totalUserusdCoinsPerYear.toFixed(2)}`);
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
    _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    }
    else {
      _print("Please use the official website to stake ETH.");
    }
    if(info.lockingDays > 0){
      _print(`You can unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} in ${info.lockingDays.toFixed(0)} days`)
    }else{
      _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    }
    let totalUsdValueToCalim = 0;
    let printRewardTickers = ""
    for(let i = 0; i < info.earnings.length; i++){
      totalUsdValueToCalim += info.earnings[i]*info.rewardTokenPrices[i]
      printRewardTickers += `${info.rewardTokenTickers[i]} - `
    }
    _print_link(`Claim ${printRewardTickers} ($${formatMoney(totalUsdValueToCalim)})`, claim)
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