$(function() {
    consoleInit();
    start(main);
  });
  
  async function loadPool(App, tokens, prices, stakingAddress) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, KITTEN_201_ABI, App.provider);
  
    const stakeTokenAddress = await STAKING_POOL.LP_TOKEN();
    
    const rewardTokenAddress = await STAKING_POOL.REWARD_TOKEN();
    
    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }
  
    var newPriceAddresses = stakeToken.tokens.filter(x => prices[x] == null);
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x => tokens[x] == null);
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
    const rewardTokenTicker = rewardToken.symbol;
    
    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakingTokenTicker = poolPrices.stakingTokenTicker;

    const stakeTokenPrice =  getParameterCaseInsensitive(prices, stakeTokenAddress).usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress).usd;
  
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
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(stakeTokenAddress, stakingAddress, App)
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
    _print_link(`Stake ${userUnstaked.toFixed(6)} ${stakingTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(6)} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker}`, claim)
    _print_link(`Exit`, exit)
    _print(`\n`);
  }
  
  async function main() {
    const CONTRACTS = [
      "0x26Ec7cfcdd57c0d27122349d8740B42E8E24bB0b",
      "0xF06E97f30Ead2FCeeA67e344F71AA882C9126F07",
      "0xFEEab154863a0F0095a6a3C5a07CA10d1f629D78",
      "0x8A20Af65E3Caef30072DBd6b48aAAd10FD4a9eD7",
      "0x522c926f681126828DB07CBA012Fe1108aebf051",
      "0x7B724fB188295E10BcDFf007305aF22eC586743A",
    ];
  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");
  
    var tokens = {};
    var prices = {};
  
    for (const c of CONTRACTS) {
      await loadPool(App, tokens, prices, c);
    }
  
    hideLoading();
  }