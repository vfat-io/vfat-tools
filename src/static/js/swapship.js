$(function() {
    consoleInit();
    start(main);
  });

  async function loadPool(App, prices, tokens, poolIndex, 
                          chefAbi, chefContract, chefAddr, totalAllocPoints, 
                          rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, 
                          pendingRewardsFunctionName,) {  
    const poolInfo = await getPoolInfo(App, chefContract, chefAddr, poolIndex, pendingRewardsFunctionName);
    var newPriceAddresses = poolInfo.poolToken.tokens.filter(x => prices[x] == null);
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        prices[key] = newPrices[key];
    }
    var newTokenAddresses = poolInfo.poolToken.tokens.filter(x => tokens[x] == null);
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, chefAddr);
    }
    if (poolInfo.stakedToken != null) {
      printStakedLPPrice(App, prices, tokens, poolInfo, chefAbi, chefAddr, totalAllocPoints,
        rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewardsFunctionName, poolIndex);
    }
    else {
      const pp = getPoolPrices(tokens, prices, poolInfo.poolToken);
      pp.print_price();
      const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
      var usdPerWeek = poolRewardsPerWeek * rewardPrice;
      _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
      var weeklyAPY = usdPerWeek / pp.staked_tvl * 100;
      var dailyAPY = weeklyAPY / 7;
      var yearlyAPY = weeklyAPY * 52;
      _print(`APY: Day ${dailyAPY.toFixed(6)}% Week ${weeklyAPY.toFixed(6)}% Year ${yearlyAPY.toFixed(6)}%`);
      _print(`RTC APY: Day ${(dailyAPY*10000).toFixed(2)}% Week ${(weeklyAPY*10000).toFixed(2)}% Year ${(yearlyAPY*10000).toFixed(2)}%`);
      var userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
      var userStakedUsd = userStaked * pp.price;
      var userStakedPct = userStaked / (poolInfo.stakedToken ?? poolInfo.poolToken).staked * 100;
      _print(`You are staking ${userStaked.toFixed(8)} ${pp.stakingTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
      if (poolInfo.userStaked > 0) {
          var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
          var userDailyRewards = userWeeklyRewards / 7;
          var userYearlyRewards = userWeeklyRewards * 52;
          _print(`Estimated ${rewardTokenTicker} earnings:`
              + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardPrice)})`
              + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
              + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
          var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
          var userDailyRewards = userWeeklyRewards / 7;
          var userYearlyRewards = userWeeklyRewards * 52;
              _print(`Estimated RTC earnings:`
                  + ` Day $${formatMoney(userDailyRewards*rewardPrice*10000)}`
                  + ` Week $${formatMoney(userWeeklyRewards*rewardPrice*10000)}`
                  + ` Year $${formatMoney(userYearlyRewards*rewardPrice*10000)}`);
      }
      const approveAndStake = async function() {
        return chefContract_stake(chefAbi, chefAddr, poolIndex, poolInfo.address, App)
      }      
      const unstake = async function() {
        return chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunctionName)
      }      
      const claim = async function() {
        return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunctionName)
      }      
      const exit = async function() {
        return chefContract_exit(chefAbi, chefAddr, poolIndex, App)
      }      
      _print_link(`Stake ${poolInfo.poolToken.unstaked.toFixed(8)} ${pp.stakingTokenTicker}`, approveAndStake)
      _print_link(`Unstake ${poolInfo.userStaked.toFixed(8)} ${pp.stakingTokenTicker}`, unstake)
      _print_link(`Claim ${poolInfo.pendingRewardTokens.toFixed(8)} ${rewardTokenTicker}`, claim)
      _print_link(`Exit`, exit)
      _print(`\n`);
    }
  }
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const CAPTAIN_COOK_ADDR = "0xf8bfd0cf1c6f948339d5bd78444bebd78e43ae26";
    const CAPTAIN_COOK = new ethers.Contract(CAPTAIN_COOK_ADDR, CAPTAIN_COOK_ABI, App.provider);

    const poolCount = await CAPTAIN_COOK.poolLength();
    const totalAllocPoints = await CAPTAIN_COOK.totalAllocPoint();

    _print(`Found ${poolCount} pools.\n`)

    var prices = {};
    var tokens = {};

    const rewardTokenPoolIndex = 10;
    const rewardTokenTicker = "SWSH";
    const rewardTokenAddress = await CAPTAIN_COOK.swapship();
    const rewardsPerWeek = await CAPTAIN_COOK.swapshipPerBlock() / 1e18 * 604800 / 13.5;
    const blockNumber = await App.provider.getBlockNumber();

    _print(`*** There is an RTC airdrop valued at 10000 times your claimed SWSH from the pool ***\n`);
    _print(`*** Please remember to claim your SWSH in order to be eligible for each airdrop.  ***\n`);

    await loadPool(App, prices, tokens, rewardTokenPoolIndex, 
             CAPTAIN_COOK_ABI, CAPTAIN_COOK, CAPTAIN_COOK_ADDR, totalAllocPoints, 
             rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, "pendingSwapShip",
             blockNumber);

    for (i = 0; i < poolCount; i++) {
        if (i != rewardTokenPoolIndex) {
            await loadPool(App, prices, tokens, i,
                CAPTAIN_COOK_ABI, CAPTAIN_COOK, CAPTAIN_COOK_ADDR, totalAllocPoints, 
                rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, "pendingSwapShip",
                blockNumber);
        }
    }
  
    hideLoading();  
  }