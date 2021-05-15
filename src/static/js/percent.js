$(function() {
consoleInit(main)
});

async function loadPool(App, tokens, prices, stakingAddress, rewardTokenTicker, rewardTokenAddress) {
  const STAKING_POOL = new ethers.Contract(stakingAddress, PCT_POOL_ABI, App.provider);

  const stakeToken = await STAKING_POOL.stakeToken();

  const BPT = new ethers.Contract(stakeToken, BALANCER_POOL_ABI, App.provider);

  const poolTokens = await BPT.getCurrentTokens();

  const totalBPTAmount = await BPT.totalSupply() / 1e18;
  const totalStakedBPTAmount = await BPT.balanceOf(stakingAddress) / 1e18;
  const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 1e18;
  const userUnstaked = await BPT.balanceOf(App.YOUR_ADDRESS) / 1e18;
  const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 1e18;

  // Find out reward rate
  const weeklyRewards = await get_synth_weekly_rewards(STAKING_POOL);

  var newPriceAddresses = poolTokens.filter(x => prices[x] == null);
  var newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
      prices[key] = newPrices[key];
  }
  var newTokenAddresses = poolTokens.filter(x => tokens[x] == null);
  for (const address of newTokenAddresses) {
      tokens[address] = await getToken(App, address, stakeToken);
  }
  const token0 = getParameterCaseInsensitive(tokens, poolTokens[0]);
  const token1 = getParameterCaseInsensitive(tokens, poolTokens[1]);
  const token0Amount = await token0.contract.balanceOf(stakeToken) / 10 ** token0.decimals;
  const token1Amount = await token1.contract.balanceOf(stakeToken) / 10 ** token1.decimals;

  const token0Price = getParameterCaseInsensitive(prices, token0.address)?.usd;
  const token1Price = getParameterCaseInsensitive(prices, token1.address)?.usd;

  const token0PerBPT = token0Amount / totalBPTAmount;
  const token1PerBPT = token1Amount / totalBPTAmount;

  const BPTPrice = token0PerBPT * token0Price + token1PerBPT * token1Price;

  const tvl = totalBPTAmount * BPTPrice;
  const staked_tvl = totalStakedBPTAmount * BPTPrice;

  // Finished. Start printing
  const poolUrl = `https://pools.balancer.exchange/#/pool/${stakeToken}/`;
  const stakingTokenTicker = `[${token0.symbol}]-[${token1.symbol}]`;

  const rewardTokenPrice = prices[rewardTokenAddress].usd;
  const usdPerWeek = weeklyRewards * rewardTokenPrice;

  _print(`<a href='${poolUrl}' target='_blank'>${stakingTokenTicker}</a> BPT Price: $${formatMoney(BPTPrice)} TVL: $${formatMoney(tvl)}`);
  _print(`1 BPT  = [${token0PerBPT} ${token0.symbol}, ${token1PerBPT} ${token1.symbol}]`);
  _print(`${token0.symbol} Price: $${formatMoney(token0Price)}`)
  _print(`${token1.symbol} Price: $${formatMoney(token1Price)}`)
  _print(`Staked: $${formatMoney(staked_tvl)}`);
  _print(`${rewardTokenTicker} Per Week: ${weeklyRewards.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPR = usdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * BPTPrice;
  var userStakedPct = userStaked / totalStakedBPTAmount * 100;
  _print(`You are staking ${userStaked.toFixed(2)} ${stakingTokenTicker} ` +
         `(${(token0PerBPT * userStaked).toFixed(2)} ${token0.symbol}, ${(token1PerBPT * userStaked).toFixed(2)} ${token1.symbol}), ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (userStaked > 0) {
      var userWeeklyRewards = userStakedPct * weeklyRewards / 100;
      var userDailyRewards = userWeeklyRewards / 7;
      var userYearlyRewards = userWeeklyRewards * 52;
      _print(`Estimated ${rewardTokenTicker} earnings:`
          + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
          + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
  }
  const approveTENDAndStake = async function() {
    return rewardsContract_stake(stakeToken, stakingAddress, App)
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
  _print_link(`Stake ${userUnstaked.toFixed(2)} ${stakingTokenTicker}`, approveTENDAndStake)
  _print_link(`Unstake ${userStaked.toFixed(2)} ${stakingTokenTicker}`, unstake)
  _print_link(`Claim ${earned.toFixed(2)} ${rewardTokenTicker}`, claim)
  _print_link(`Exit`, exit)
  _print(`\n`);
}

async function main() {
  const CONTRACTS = [
    "0x23b53026187626Ed8488e119767ACB2Fe5F8de4e",
    "0xfAe0ADb2d30E2a63730AC927E4e15e96D69B4aDd",
    "0xed41F2b444D72648647d6f5a124Ad15574963706",
    "0xa40d04a73d6E00049d8A72623Ef8b75879059F70",
    "0x5859D111210dd9FE6F11502b65C1BF26a46018d2",
    "0xf49A20407b92332704B5FE4942c95D7d134b843b",
    "0x8124502fB129eB1B0052725CfD126e8EB0975ab1",
    "0x0190bF688fF57B935e99487AaceBAccf450C5D4f"
  ];

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = {};

  const rewardTokenTicker = "PCT";
  const rewardTokenAddress = "0xbc16da9df0a22f01a16bc0620a27e7d6d6488550";

  for (const c of CONTRACTS) {
    await loadPool(App, tokens, prices, c, rewardTokenTicker, rewardTokenAddress);
  }

  await _print24HourPrice("percent", "PCT");

  hideLoading();
}
