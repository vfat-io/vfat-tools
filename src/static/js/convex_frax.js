$(function() {
consoleInit(main)
  });

  const POOL_REGISTRY_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"poolid","type":"uint256"}],"name":"AddUserVault","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"OperatorChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolid","type":"uint256"},{"indexed":true,"internalType":"address","name":"implementation","type":"address"},{"indexed":false,"internalType":"address","name":"stakingAddress","type":"address"},{"indexed":false,"internalType":"address","name":"stakingToken","type":"address"}],"name":"PoolCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolid","type":"uint256"}],"name":"PoolDeactivated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"value","type":"bool"}],"name":"RewardActiveOnCreationChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"RewardImplementationChanged","type":"event"},{"inputs":[{"internalType":"address","name":"_implementation","type":"address"},{"internalType":"address","name":"_stakingAddress","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"addUserVault","outputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address","name":"stakingAddress","type":"address"},{"internalType":"address","name":"stakingToken","type":"address"},{"internalType":"address","name":"rewards","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"createNewPoolRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"deactivatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"address","name":"stakingAddress","type":"address"},{"internalType":"address","name":"stakingToken","type":"address"},{"internalType":"address","name":"rewardsAddress","type":"address"},{"internalType":"uint8","name":"active","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"poolVaultLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolVaultList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxyFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardImplementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsStartActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_op","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_active","type":"bool"}],"name":"setRewardActiveOnCreation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_imp","type":"address"}],"name":"setRewardImplementation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"vaultMap","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
  
  const STAKING_CONVEX_FRAX_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address[]","name":"_rewardTokens","type":"address[]"},{"internalType":"address[]","name":"_rewardManagers","type":"address[]"},{"internalType":"uint256[]","name":"_rewardRates","type":"uint256[]"},{"internalType":"address[]","name":"_gaugeControllers","type":"address[]"},{"internalType":"address[]","name":"_rewardDistributors","type":"address[]"},{"internalType":"address","name":"_stakingToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"secs","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"kek_id","type":"bytes32"},{"indexed":false,"internalType":"address","name":"source_address","type":"address"}],"name":"StakeLocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"kek_id","type":"bytes32"},{"indexed":false,"internalType":"address","name":"destination_address","type":"address"}],"name":"WithdrawLocked","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"calcCurCombinedWeight","outputs":[{"internalType":"uint256","name":"old_combined_weight","type":"uint256"},{"internalType":"uint256","name":"new_vefxs_multiplier","type":"uint256"},{"internalType":"uint256","name":"new_combined_weight","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"reward_token_address","type":"address"},{"internalType":"address","name":"new_manager_address","type":"address"}],"name":"changeTokenManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"combinedWeightOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256[]","name":"new_earned","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fraxPerLPToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllRewardTokens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"destination_address","type":"address"}],"name":"getReward","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256[]","name":"rewards_per_duration_arr","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"caller_addr","type":"address"},{"internalType":"address","name":"reward_token_addr","type":"address"}],"name":"isTokenManagerFor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"kek_id","type":"bytes32"},{"internalType":"uint256","name":"addl_liq","type":"uint256"}],"name":"lockAdditional","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"secs","type":"uint256"}],"name":"lockMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lock_max_multiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lock_time_for_max_multiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lock_time_min","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"lockedLiquidityOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockedStakes","outputs":[{"internalType":"bytes32","name":"kek_id","type":"bytes32"},{"internalType":"uint256","name":"start_timestamp","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"ending_timestamp","type":"uint256"},{"internalType":"uint256","name":"lock_multiplier","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"lockedStakesOf","outputs":[{"components":[{"internalType":"bytes32","name":"kek_id","type":"bytes32"},{"internalType":"uint256","name":"start_timestamp","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"ending_timestamp","type":"uint256"},{"internalType":"uint256","name":"lock_multiplier","type":"uint256"}],"internalType":"struct FraxUnifiedFarm_ERC20.LockedStake[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"lockedStakesOfLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"maxLPForMaxBoost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"staker_address","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"secs","type":"uint256"},{"internalType":"uint256","name":"start_timestamp","type":"uint256"}],"name":"migrator_stakeLocked_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"staker_address","type":"address"},{"internalType":"bytes32","name":"kek_id","type":"bytes32"}],"name":"migrator_withdraw_locked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"minVeFXSForMaxBoost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"proxy_address","type":"address"}],"name":"minVeFXSForMaxBoostProxy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"proxy_address","type":"address"}],"name":"proxyStakedFrax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"staker_address","type":"address"}],"name":"proxyToggleStaker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"proxy_lp_balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardManagers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"token_idx","type":"uint256"}],"name":"rewardRates","outputs":[{"internalType":"uint256","name":"rwd_rate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardTokenAddrToIdx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsPerToken","outputs":[{"internalType":"uint256[]","name":"newRewardsPerTokenStored","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[6]","name":"_misc_lets","type":"uint256[6]"}],"name":"setMiscletiables","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_stakingPaused","type":"bool"},{"internalType":"bool","name":"_withdrawalsPaused","type":"bool"},{"internalType":"bool","name":"_rewardsCollectionPaused","type":"bool"}],"name":"setPauses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"reward_token_address","type":"address"},{"internalType":"uint256","name":"_new_rate","type":"uint256"},{"internalType":"address","name":"_gauge_controller_address","type":"address"},{"internalType":"address","name":"_rewards_distributor_address","type":"address"}],"name":"setRewardlets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"secs","type":"uint256"}],"name":"stakeLocked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"proxy_address","type":"address"}],"name":"stakerSetVeFXSProxy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"migrator_address","type":"address"}],"name":"stakerToggleMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"staker_designated_proxies","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakesUnlocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IVPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"force_update","type":"bool"}],"name":"sync_gauge_weights","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleMigrations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"migrator_address","type":"address"}],"name":"toggleMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_proxy_addr","type":"address"}],"name":"toggleValidVeFXSProxy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalCombinedWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLiquidityLocked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unlockStakes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"userStakedFrax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"veFXSMultiplier","outputs":[{"internalType":"uint256","name":"vefxs_multiplier","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vefxs_boost_scale_factor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vefxs_max_multiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vefxs_per_frax_for_max_boost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"kek_id","type":"bytes32"},{"internalType":"address","name":"destination_address","type":"address"}],"name":"withdrawLocked","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  async function main() {

    const App = await init_ethers();

    const poolRegistryAddress = "0x41a5881c17185383e19Df6FA4EC158a6F4851A69";
    const poolRegistry = new ethcall.Contract(poolRegistryAddress, POOL_REGISTRY_ABI);

    const [_poolCount] = await App.ethcallProvider.all([poolRegistry.poolLength()])
    const poolCount = _poolCount / 1;
    const calls = [...Array(poolCount).keys()].map(i => poolRegistry.poolInfo(i));
    const poolInfos = await App.ethcallProvider.all(calls)

    const Pools = poolInfos.map(p => p.stakingAddress).map(a => {
      return {
        address: a,
        abi: STAKING_CONVEX_FRAX_ABI,
        stakeTokenFunction: "stakingToken",
        rewardTokenFunction: "getAllRewardTokens"
      }
    })

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    let tokens = {};
    let prices = {};

    _print("Please use the official site in order to stake or unstake your funds!\n");

    let p = await loadCvxFrxSynthetixPools(App, tokens, prices, Pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    }

  hideLoading();
}

async function loadCvxFrxSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadCvxFrxSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printCvxFrxSynthetixPool(App, i);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadCvxFrxSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddresses = await STAKING_POOL.callStatic[rewardTokenFunction]();
    let rewardTokenPrices = [], rewardTokens = [], weeklyRewards = [], usdCoinsPerWeek = [], rewardTokenTickers = [], earnings = [];

    let stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);
    stakeToken.staked = await STAKING_POOL.totalLiquidityLocked() / 10 ** stakeToken.decimals;

    let newPriceAddresses = stakeToken.tokens.filter(x =>
      x.toLowerCase() !=  "0xb34ab2f65c6e4f764ffe740ab83f982021faed6d" && //BSG can't be retrieved from Coingecko
      !getParameterCaseInsensitive(prices, x));
    for(const rewardTokenAddress of rewardTokenAddresses){
      newPriceAddresses.push(rewardTokenAddress)
      newPriceAddresses.push("0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9");
    }
    let newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    let newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for(const rewardTokenAddress of rewardTokenAddresses){
      newTokenAddresses.push(rewardTokenAddress)
    }
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    for(const rewardTokenAddress of rewardTokenAddresses){
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
      }
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
      const rewardTokenTicker = rewardToken.symbol;
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      rewardTokenPrices.push(rewardTokenPrice);
      rewardTokens.push(rewardToken);
      rewardTokenTickers.push(rewardTokenTicker);
    }

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

    const calls = [STAKING_MULTI.periodFinish(), STAKING_MULTI.userStakedFrax(App.YOUR_ADDRESS), STAKING_MULTI.earned(App.YOUR_ADDRESS)]
    const [periodFinish, balance, earnings_] = await App.ethcallProvider.all(calls);
    for(let i = 0; i < rewardTokenAddresses.length; i++){
      const rewardRate = await App.ethcallProvider.all([STAKING_MULTI.rewardRates(i)]);
      const weeklyReward = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;
      const usdPerWeek = weeklyReward * rewardTokenPrices[i];
      weeklyRewards.push(weeklyReward);
      usdCoinsPerWeek.push(usdPerWeek);
    }

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    for(let i = 0; i < rewardTokenAddresses.length; i++){
      const earned = earnings_[i] / 10 ** rewardTokens[i].decimals;
      earnings.push(earned);
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

async function printCvxFrxSynthetixPool(App, info, chain="eth", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  for(let i = 0; i < info.rewardTokenTickers; i++){
    _print(`${info.rewardTokenTickers[i]} Per Week: ${info.weeklyRewards[i].toFixed(2)} ($${formatMoney(info.usdCoinsPerWeek[i])})`);
  }
  let totalYearlyAPR = 0;
  let totalWeeklyAPR = 0;
  let totalDailyAPR = 0;
  let totalusdCoinsPerDay = 0;
  let totalusdCoinsPerWeek = 0;
  let totalusdCoinsPerYear = 0;
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
  _print(`Total Per Week: $${formatMoney(totalUSDPerWeek)}`);
  _print(`Total APR: Day ${totalDailyAPR.toFixed(4)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (info.userStaked > 0) {
    info.poolPrices.print_contained_price(info.userStaked);
    for(let i = 0; i < info.rewardTokenTickers.length; i++){
      let userWeeklyRewards = userStakedPct * info.weeklyRewards[i] / 100;
      let userDailyRewards = userWeeklyRewards / 7;
      let userYearlyRewards = userWeeklyRewards * 52;

      totalusdCoinsPerDay += userDailyRewards;
      totalusdCoinsPerWeek += userWeeklyRewards;
      totalusdCoinsPerYear += userYearlyRewards;
    }
    _print(`Total Earnings: Day ${totalusdCoinsPerDay.toFixed(4)}% Week ${totalusdCoinsPerWeek.toFixed(2)}% Year ${totalusdCoinsPerYear.toFixed(2)}%`);
  }
  const claim = async function() {
    return cvxFrxContract_claim(info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}">Explorer</a>`);
  let claimLink = "";
  for(let i = 0; i < info.rewardTokenTickers.length; i++){
    claimLink+= `${info.earnings[i].toFixed(6)} ${info.rewardTokenTickers[i]} ($${formatMoney(info.earnings[i]*info.rewardTokenPrices[i])})`
  }
  //_print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTickers[1]} ($${formatMoney(info.earned*info.rewardTokenPrices[1])})`, claim)
  _print_link(`Claim `+ claimLink, claim)
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

const cvxFrxContract_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)

  console.log(App.YOUR_ADDRESS)
  showLoading()
    REWARD_POOL.getReward(App.YOUR_ADDRESS, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
}