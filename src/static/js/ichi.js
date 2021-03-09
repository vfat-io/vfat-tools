$(function() {
    consoleInit();
    start(main);
  });

  async function getIchiPoolInfo(app, chefAbi, chefAddress, poolIndex, rewardTokenDecimals) {  
    const chef = new ethcall.Contract(chefAddress, chefAbi);
    const calls = 
        [ chef.getPoolToken(poolIndex), chef.getAllocPoint(poolIndex), chef.lastRewardsBlock(poolIndex),
          chef.getBonusToRealRatio(poolIndex), chef.userInfo(poolIndex, app.YOUR_ADDRESS),
          chef.pendingIchi(poolIndex, app.YOUR_ADDRESS)]
    const [ lpToken, allocPoint, lastRewardBlock, bonusToRealRatio, userInfo, pendingRewardTokens ] =
          await app.ethcallProvider.all(calls);
    const poolToken = await getToken(app, lpToken, chefAddress);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    var stakedToken;
    var userLPStaked;
    const pendingRewards = pendingRewardTokens / 10 ** rewardTokenDecimals * (1 - bonusToRealRatio / 100);
    return {
        address: lpToken,
        allocPoints: allocPoint,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewards,
        stakedToken : stakedToken,
        userLPStaked : userLPStaked,
        lastRewardBlock : lastRewardBlock,
        bonusToRealRatio : bonusToRealRatio
    };
  }

  function printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, 
                    stakingTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                    fixedDecimals) {
    var usdPerWeek = poolRewardsPerWeek * rewardPrice;
    fixedDecimals = fixedDecimals ?? 2;
    _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
    var weeklyAPR = usdPerWeek / staked_tvl * 100;
    var dailyAPR = weeklyAPR / 7;
    var yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    var userStakedUsd = userStaked * poolTokenPrice;
    var userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakingTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
    var userDailyRewards = userWeeklyRewards / 7;
    var userYearlyRewards = userWeeklyRewards * 52;
    if (userStaked > 0) {
      _print(`Estimated ${rewardTokenTicker} earnings:`
          + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
          + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
    }
  }
  
  function printIchiContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
      rewardTokenTicker, stakingTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
      claimFunction) {
        fixedDecimals = fixedDecimals ?? 2;
    const approveAndStake = async function() {
      return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
    }      
    const unstake = async function() {
      return chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
    }      
    const claim = async function() {
      return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
    }    
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakingTokenTicker}`, approveAndStake)
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker}`, claim)
    _print(`Staking or unstaking also claims rewards.`)
    _print(`\n`);
  }
  
  function printIchiPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices, 
                         totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                         pendingRewardsFunction, fixedDecimals, claimFunction) {  
    fixedDecimals = fixedDecimals ?? 2;
    const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
    const ratio = 1 - poolInfo.bonusToRealRatio / 100;
    var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek * ratio;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    poolPrices.print_price();
    sp?.print_price();
    printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakingTokenTicker, 
      staked_tvl, userStaked, poolPrices.price, fixedDecimals);
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printIchiContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakingTokenTicker, poolInfo.poolToken.unstaked, 
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction);
  }

  async function loadIchiContract(App,  chefAddress, chefAbi, rewardTokenTicker,
      rewardTokenFunction, rewardsPerBlockFunction, pendingRewardsFunction) {
    const signer = App.provider.getSigner()
    const chefContract = new ethers.Contract(chefAddress, chefAbi, signer);
  
    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    _print(`Found ${poolCount} pools.\n`)
  
    var tokens = {};
  
    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardsPerWeek = await chefContract.callStatic[rewardsPerBlockFunction]() * 604800 / 13.5
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getIchiPoolInfo(App, chefAbi, chefAddress, x, 9)));
    
    var tokenAddresses = [].concat.apply([], poolInfos.map(x => x.poolToken.tokens));
    var prices = await lookUpTokenPrices(tokenAddresses);
    
    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getToken(App, address, chefAddress);
    }));
  
    const poolPrices = poolInfos.map(poolInfo => getPoolPrices(tokens, prices, poolInfo.poolToken));
  
    _print("Finished reading smart contracts.\n");
      
    for (i = 0; i < poolCount; i++) {
      if (i != 6) {
        printIchiPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, 10, chefContract.claimRewards);
      }
    }
  }
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const ICHI_FARM_ADDR = "0xcc50953a743b9ce382f423e37b07efa6f9d9b000";

    await loadIchiContract(App, ICHI_FARM_ADDR, ICHI_FARM_ABI, "ICHI", "ichi", "ichiPerBlock", "pendingIchi");
  
    hideLoading();  
  }