$(function() {
  consoleInit();
  start(main);
});

async function loadPool(App, tokens, prices, stakingAddress) {
  const STAKING_POOL = new ethers.Contract(stakingAddress, HYPE_ABI, App.provider);

  const stakeTokenAddress = await STAKING_POOL.lpt();
  
  const rewardTokenAddress = await STAKING_POOL.rewardToken();
  
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
    "0xc0baeacc6ed67aff27ec55b238fc2fc2b5fa50d0",
    "0x6d9438cd0df10a78de373f5d9b5b5e7227e3822d",
    "0xA451C734F29711aDA1CFc3b4D71eA803737bc7e7",
    
    "0x97da5d4B52D2596cFFf78372ECb7084088140779",
    "0x21AB213d86aAaC5E6C2dbae5BfA2Fd1247dda356",
    "0x35343813769C146E900afBf6106fF1b1e7C10905",
    "0x8aa177e9f38e76d161b8a09F12BC0112104D7fFE",
    "0xd1b013Cd7386e6eBA235104e1aa492A2b2A5D081",

    "0x859a9d0d8bBF57C390A0BD8Fb4f5DE617e1De535",
    "0xfd15657341492d1918E3A8B7421e9627d52056E9"
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