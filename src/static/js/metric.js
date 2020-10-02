$(function() {
    consoleInit();
    start(main);
  });

  async function loadPool(App, stakingPool, stakingAddress, rewardTokenTicker, rewardTokenAddress, tokens, prices) {     
    const lpt = await stakingPool.lpt();
    const poolToken = await getToken(App, lpt, stakingAddress);
    var newPriceAddresses = poolToken.tokens.filter(x => prices[x] == null);
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        prices[key] = newPrices[key];
    }
    var newTokenAddresses = poolToken.tokens.filter(x => tokens[x] == null);
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    const pp = getPoolPrices(tokens, prices, poolToken);
    pp.print_price();
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const poolRewardsPerWeek = await get_synth_weekly_rewards(stakingPool);
    var usdPerWeek = poolRewardsPerWeek * rewardPrice;
    _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
    var weeklyAPY = usdPerWeek / pp.staked_tvl * 100;
    var dailyAPY = weeklyAPY / 7;
    var yearlyAPY = weeklyAPY * 52;
    _print(`APY: Day ${dailyAPY.toFixed(2)}% Week ${weeklyAPY.toFixed(2)}% Year ${yearlyAPY.toFixed(2)}%`);
    var userStaked = await stakingPool.balanceOf(App.YOUR_ADDRESS) / 1e18;
    var userStakedUsd = userStaked * pp.price;
    var userStakedPct = userStaked / poolToken.staked * 100;
    _print(`You are staking ${userStaked.toFixed(2)} ${pp.stakingTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    if (userStaked > 0) {
        var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
        var userDailyRewards = userWeeklyRewards / 7;
        var userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
    }
    const approveAndStake = async function() {
      return rewardsContract_stake(lpt, stakingAddress, App)
    }      
    const unstake = async function() {
      return rewardsContract_unstake(stakingAddress, App)
    }      
    const claim = async function() {
      return rewardsContract_claim(stakingAddress, App)
    }      
    const exit = async function() {
      return rewardsContract_exit(stakingAddress, App)
    }      
    const pendingRewardTokens = await stakingPool.earned(App.YOUR_ADDRESS) / 1e18;
    _print_link(`Stake ${poolToken.unstaked.toFixed(4)} ${pp.stakingTokenTicker}`, approveAndStake)
    _print_link(`Unstake ${userStaked.toFixed(4)} ${pp.stakingTokenTicker}`, unstake)
    _print_link(`Claim ${pendingRewardTokens.toFixed(4)} ${rewardTokenTicker}`, claim)
    _print_link(`Exit`, exit)
    _print(`\n`);
  }
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...");
    
    const rewardTokenTicker = "METRIC";
    const rewardTokenAddress = "0xefc1c73a3d8728dc4cf2a18ac5705fe93e5914ac";
    const BUILD_POOL_ADDR = "0xb4D78f3a0fA97d42Bff0f7f9CeDFE2FE23eECA05";
    const METRIC_POOL_ADDR = "0xea322a8Ab474c2c27581b8aEaa5c594141Aa5Dfb";
    const BUILD_POOL = new ethers.Contract(BUILD_POOL_ADDR, STAKING_ABI, App.provider);
    const METRIC_POOL = new ethers.Contract(METRIC_POOL_ADDR, STAKING_ABI, App.provider);
    var tokens = {};
    var prices = {};
    
    await loadPool(App, METRIC_POOL, METRIC_POOL_ADDR, rewardTokenTicker, rewardTokenAddress, tokens, prices);
    await loadPool(App, BUILD_POOL, BUILD_POOL_ADDR, rewardTokenTicker, rewardTokenAddress, tokens, prices);
    hideLoading();
  }
  