
$(function() {
consoleInit(main)
});

const STR_GAUGE_ABI = [{"inputs":[{"internalType":"address","name":"_stake","type":"address"},{"internalType":"address","name":"_bribe","type":"address"},{"internalType":"address","name":"_ve","type":"address"},{"internalType":"address","name":"_voter","type":"address"},{"internalType":"address[]","name":"_allowedRewardTokens","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"recepient","type":"address"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"VeTokenLocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"VeTokenUnlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"maxRuns","type":"uint256"}],"name":"batchUpdateRewardPerToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bribe","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"checkpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimFees","outputs":[{"internalType":"uint256","name":"claimed0","type":"uint256"},{"internalType":"uint256","name":"claimed1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"derivedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"derivedBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"derivedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorBalanceIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorRewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorSupplyIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isRewardToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"lastEarn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"registerRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"removeRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardPerTokenCheckpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardPerTokenNumCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"supplyCheckpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supplyNumCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"underlying","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
  const App = await init_ethers();

  let clicked = false;

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");
  _print("This may take few minutes...\n");

  const tokens = {};
  const prices = await getArbitrumPrices();

  const gauges = ["0x3135559269C61B5d91103aD3c98CEE84f4aFc3ff",
                  "0xfF20d4F408C0163aEB73bc666fb0583DcdCC6fB4",
                  "0x4ac87e9A7B4f43766a08C879c068273ea05AcA1c",
                  "0xEc2e4a5E42C2b582b30612cd21f8D911BE6F58C8",
                  "0x67F12687b9f97b000b84E76c3f47B275a72f2c86"].map(a => {
    return {
      address: a,
      abi: STR_GAUGE_ABI,
      stakeTokenFunction: "underlying"
    }
  });

  //STR/USDC to receive the price
  //await loadStrSynthetixPoolInfoPrice(App, tokens, prices, App.YOUR_ADDRESS, "0xb30d2814fada91c97c2ffbb27c9187a099617e3f")

  let p = await loadStrSynthetixPools(App, tokens, prices, gauges, clicked)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}\n`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
    _print(`Estimated HERMES earnings:`
            + ` Day ${p.totalUserDailyRewards.toFixed(2)} ($${formatMoney(p.totalUserDailyRewardsUSD)})`
            + ` Week ${p.totalUserWeeklyRewards.toFixed(2)} ($${formatMoney(p.totalUserWeeklyRewardsUSD)})`
            + ` Year ${p.totalUserYearlyRewards.toFixed(2)} ($${formatMoney(p.totalUserYearlyRewardsUSD)})`);
    _print("");
  }

  const reload = async function(){
    _print("Reading smart contracts...\n");
    _print("This may take few minutes...\n");
    const App = await init_ethers();
    return reloadFun(App, p.tokens, p.prices, p.pools, p.clicked);
  }

  _print_link(`\nClick here to see just your staked pools`, reload);
  _print("");

  hideLoading();
}

const reloadFun = async function (App, tokens, prices, pools, clicked){
  if(clicked == false){
    clicked = true;
    let p = await loadStrSynthetixPools(App, tokens, prices, pools, clicked)
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)}\n`);
      _print("");
    }
  }else{
    clicked = false;
    let p = await loadStrSynthetixPools(App, tokens, prices, pools, clicked)
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)}\n`);
      _print("");
    }
  }
}

async function loadStrSynthetixPools(App, tokens, prices, pools, clicked) {
  let totalStaked  = 0, totalUserStaked = 0;
  let gaugeAddresses = [], earnings = 0, earningsUSD = 0;
  const infos = await Promise.all(pools.map(p =>
      loadStrSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printStrSynthetixPool(App, i, "arbitrum", clicked);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      gaugeAddresses.push(p.stakingAddress);
      earnings += p.earned;
      earningsUSD += p.earningsUSD;
    }
  }
  return { staked_tvl : totalStaked, totalUserStaked, gaugeAddresses, earnings, earningsUSD, tokens, prices, pools, clicked};
}

async function loadStrSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    let rewardTokenAddresses = [], rewardTokens = [], rewardTokenTickers = [], rewardTokenPrices = [], weeklyRewards = [], earnings = [], usdCoinsPerWeek = [];
    //Added with manually reward
    const rewardTokenAddress = "0x5DB7b150c5F38c5F5db11dCBDB885028fcC51D68";
    rewardTokenAddresses.push(rewardTokenAddress);
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
      tokens[rewardTokenAddress] = await getGeneralEthcallToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
    const rewardTokenTicker = rewardToken.symbol;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const periodFinish = await STAKING_POOL.periodFinish(rewardTokenAddress)
    const rewardRate = await STAKING_POOL.rewardRate(rewardTokenAddress)
    const earned_ = await STAKING_POOL.earned(rewardTokenAddress, App.YOUR_ADDRESS)
    const weeklyReward = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 10 ** rewardToken.decimals * 604800;
    const usdPerWeek = weeklyReward * rewardTokenPrice;
    const earned = earned_ / 10 ** rewardToken.decimals;
    rewardTokens.push(rewardToken);
    rewardTokenTickers.push(rewardTokenTicker);
    rewardTokenPrices.push(rewardTokenPrice);
    weeklyRewards.push(weeklyReward);
    earnings.push(earned);
    usdCoinsPerWeek.push(usdPerWeek);

    var stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress);

    const balance = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS)
    const derivedSupply_ = await STAKING_POOL.derivedSupply()
    const derivedBalance_ = await STAKING_POOL.derivedBalance(App.YOUR_ADDRESS)
    const derivedSupply = derivedSupply_ / 10 ** stakeToken.decimals
    const derivedBalance = derivedBalance_ / 10 ** stakeToken.decimals

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getGeneralEthcallToken(App, address, stakingAddress);
    }

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      stakeTokenTicker,
      stakeTokenPrice,
      staked_tvl,
      userStaked,
      userUnstaked,
      earnings,
      derivedSupply,
      derivedBalance,
      rewardTokenPrices,
      rewardTokenAddresses,
      rewardTokens,
      rewardTokenTickers
    }
}

async function printStrSynthetixPool(App, info, chain="eth", clicked, customURLs) {
  if(clicked == true && info.userStaked == 0){
    return {
      staked_tvl: 0,
      userStaked : 0,
      apr : 0,
      userDailyRewards : 0,
      userWeeklyRewards : 0,
      userYearlyRewards : 0,
      userDailyRewardsUSD : 0,
      userWeeklyRewardsUSD : 0,
      userYearlyRewardsUSD : 0,
      stakingAddress : info.stakingAddress,
      rewardTokenAddress : info.rewardTokenAddresses[0],
      earned : info.earnings[0],
      earningsUSD : 0
    }
  }
  info.poolPrices.print_price(chain, 4, customURLs);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  const earningsUSD = info.earnings[0]*info.rewardTokenPrices[0];
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
    }
  const claim = async function() {
    return strContract_claim(info.rewardTokenAddresses[0], info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}#code">Arbitrum Scan</a>`);
  let claimLink = "";
  for(let i = 0; i < info.earnings.length; i++){
    claimLink += `${info.earnings[i].toFixed(6)} ${info.rewardTokenTickers[i]} ($${formatMoney(info.earnings[i]*info.rewardTokenPrices[i])}) `
  }
  _print_link(`Claim ${claimLink}`, claim);
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Revoke (set approval to 0)`, revoke)
  }
  _print_link(`Exit`, exit)
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd,
      stakingAddress : info.stakingAddress,
      rewardTokenAddress : info.rewardTokenAddresses[0],
      earned : info.earnings[0],
      earningsUSD : earningsUSD
  }
}

const strContract_claim = async function(rewardTokenAddress, rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, STR_GAUGE_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  const earnedYFFI = (await REWARD_POOL.earned(rewardTokenAddress, App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
    showLoading()
    REWARD_POOL.getReward(App.YOUR_ADDRESS, [rewardTokenAddress], {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

async function loadStrSynthetixPoolInfoPrice(App, tokens, prices, stakingAddress, stakeTokenAddress) {
  var stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress);
  var newPriceAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(prices, x));
  var newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
    if (newPrices[key]?.usd)
        prices[key] = newPrices[key];
  }
  var newTokenAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(tokens,x));
  for (const address of newTokenAddresses) {
      tokens[address] = await getGeneralEthcallToken(App, address, stakingAddress);
  }
  const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

  if (!poolPrices)
  {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
    return null;
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
      prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

  const staked_tvl = poolPrices.staked_tvl;

  return  {
    stakingAddress,
    poolPrices,
    stakeTokenAddress,
    stakeTokenTicker,
    stakeTokenPrice,
    staked_tvl,
  }
}