$(function() {
    consoleInit();
    start(main);
  });
  
  async function loadPool(App, tokens, prices, stakingAbi, stakingAddress, 
        rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
    
    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();
    
    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);
  
    if (stakeTokenAddress.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }
  
    var newPriceAddresses = stakeToken.tokens.filter(x => 
        !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        if (newPrices[key])
            prices[key] = newPrices[key];
    }
    if (stakeTokenFunction == "SUSD") {
        prices[stakeTokenAddress] = { usd : 1 }; //...
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
  
    const stakingTokenTicker = poolPrices.stakingTokenTicker;
  
    const stakeTokenPrice = 
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd; 
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  
    // Find out reward rate
    const weeklyRewards = await get_synth_weekly_rewards(STAKING_POOL);
  
    const usdPerWeek = weeklyRewards * rewardTokenPrice;
  
    const staked_tvl = poolPrices.staked_tvl;
    
    const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;
  
    const userUnstaked = stakeToken.unstaked;
  
    const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
  
    poolPrices.print_price();
    _print(`${rewardTokenTicker} Per Week: ${weeklyRewards.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
    const weeklyAPY = usdPerWeek / staked_tvl * 100;
    const dailyAPY = weeklyAPY / 7;
    const yearlyAPY = weeklyAPY * 52;
    _print(`APY: Day ${dailyAPY.toFixed(2)}% Week ${weeklyAPY.toFixed(2)}% Year ${yearlyAPY.toFixed(2)}%`);
    const userStakedUsd = userStaked * stakeTokenPrice;
    const userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`You are staking ${userStaked.toFixed(6)} ${stakingTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (userStaked > 0) {
        const userWeeklyRewards = userStakedPct * weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
    }
    const allowance = Math.min(20000 - userStaked, userUnstaked);
    const maxAllowance = 
        stakeTokenFunction == "lpt" ? null : ethers.BigNumber.from(20000).pow(stakeToken.decimals);
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(stakeTokenAddress, stakingAddress, App, maxAllowance)
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
    const revoke = async function() {
      return rewardsContract_resetApprove(stakeTokenAddress, stakingAddress, App)
    }
    _print_link(`Stake ${allowance.toFixed(6)} ${stakingTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(6)} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker}`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print(`\n`);
  }
  
  async function main() {
  
    const CONTRACTS = [      
        { address: "0x9569d4CD7AC5B010DA5697E952EFB1EC0Efb0D0a", abi : BASIS_DAIBAC_ABI, rewardToken: "basisShare", stakeToken: "lpt"},
        { address: "0x067d4D3CE63450E74F880F86b5b52ea3edF9Db0f", abi : BASIS_DAIBAC_ABI, rewardToken: "basisShare", stakeToken: "lpt"},
        { address: "0xEBd12620E29Dc6c452dB7B96E1F190F3Ee02BDE8", abi : BASIS_DAI_ABI, rewardToken: "basisCash", stakeToken: "dai"},
        { address: "0xDc42a21e38C3b8028b01A6B00D8dBC648f93305C", abi : BASIS_SUSD_ABI, rewardToken: "basisCash", stakeToken: "SUSD"},
        { address: "0x51882184b7F9BEEd6Db9c617846140DA1d429fD4", abi : BASIS_USDC_ABI, rewardToken: "basisCash", stakeToken: "usdc"},
        { address: "0x2833bdc5B31269D356BDf92d0fD8f3674E877E44", abi : BASIS_USDT_ABI, rewardToken: "basisCash", stakeToken: "usdt"},
        { address: "0xC462d8ee54953E7d7bF276612b75387Ea114c3bf", abi : BASIS_YCRV_ABI, rewardToken: "basisCash", stakeToken: "ycrv"}
    ];
  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");
  
    var tokens = {};
    var prices = {};
  
    for (const c of CONTRACTS) {
        try {
            await loadPool(App, tokens, prices, c.abi, c.address, c.rewardToken, c.stakeToken);
        }
        catch (ex) {
            console.error(ex);
        }
    }
  
    hideLoading();
  }