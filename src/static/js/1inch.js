$(function() {
  consoleInit();
  start(main);
});

async function loadPool(App, tokens, prices, stakingAddress) {
  const STAKING_POOL = new ethers.Contract(stakingAddress, _1INCH_FARMING_ABI, App.provider);

  const stakeTokenAddress = await STAKING_POOL.mooniswap();
  
  const rewardTokenAddress = await STAKING_POOL.gift();
  
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
  let rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  
  if (!rewardToken) {
      newPrices = await lookUpTokenPrices([rewardTokenAddress])
      for (const key in newPrices) {
          prices[key] = newPrices[key]
      }
      tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
      rewardToken = tokens[rewardTokenAddress];
  }

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
    /*{
    token1: "1INCH",
    token2: "ETH",
    poolAddress: "0x812b40c2ca7fabbac756475593fc8b1c313434fa",
    farmingAddress: "0x2ec255797fef7669fa243509b7a599121148ffba"
},*/ {
    token1: "1INCH",
    token2: "DAI",
    poolAddress: "0x2c6264619d2f598a003d1c857e46edb95b22c75c",
    farmingAddress: "0x94bc2a1c732bcad7343b25af48385fe76e08734f"
}, {
    token1: "1INCH",
    token2: "wBTC",
    poolAddress: "0xcaa6361e4ad457b8f2e78a44662b0de3df646fd3",
    farmingAddress: "0xa218543cc21ee9388fa1e509f950fd127ca82155"
}, {
    token1: "1INCH",
    token2: "USDC",
    poolAddress: "0xa09d1afae21bda81c06fd6de9bbd7c7ed7b6dfb1",
    farmingAddress: "0x302a6eda4e2b2c563a80cc17bd80a1251b986677"
}, {
    token1: "1INCH",
    token2: "USDT",
    poolAddress: "0xb11773ea2c7b9586d9efa1438ce95aba22595a7e",
    farmingAddress: "0xd7936052d1e096d48c81ef3918f9fd6384108480"
}, {
    token1: "1INCH",
    token2: "YFI",
    poolAddress: "0x29305f0e37e65c4d5d36466826237a59b5baf2e3",
    farmingAddress: "0x13927a60c7bf4d3d00e3c1593e0ec713e35d2106"
}]

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = {};

  _print("1INCH-ETH pool will be added after the pool contracts get verified on Etherscan.\n")

  for (const c of CONTRACTS) {
    await loadPool(App, tokens, prices, c.farmingAddress);
  }

  hideLoading();
}