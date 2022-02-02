$(function() {
consoleInit(main)
  });

  const LOOKS_STAKING_ABI1 = [{"inputs":[{"internalType":"address","name":"_stakedToken","type":"address"},{"internalType":"address","name":"_looksRareToken","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AdminRewardWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestedAmount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"harvestedAmount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"NewRewardPerBlockAndEndBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestedAmount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"PRECISION_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"START_BLOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTokenPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"adminRewardWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"calculatePendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"looksRareToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakedToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newRewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"newEndBlock","type":"uint256"}],"name":"updateRewardPerBlockAndEndBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const LOOKS_STAKING_ABI2 = [{"inputs":[{"internalType":"address","name":"_looksRareToken","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_tokenDistributor","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestedAmount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"harvestedAmount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"numberBlocks","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"NewRewardPeriod","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestedAmount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"PRECISION_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"calculatePendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"calculateSharePriceInLOOKS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"calculateSharesValueInLOOKS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"claimRewardToken","type":"bool"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastRewardAdjustment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"looksRareToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDistributor","outputs":[{"internalType":"contract TokenDistributor","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"uint256","name":"rewardDurationInBlocks","type":"uint256"}],"name":"updateRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"userRewardPerTokenPaid","type":"uint256"},{"internalType":"uint256","name":"rewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"bool","name":"claimRewardToken","type":"bool"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"claimRewardToken","type":"bool"}],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  async function main() {

    const Pool = {
      address : "0x2a70e7f51f6cd40c3e9956aa964137668cbfadc5",
      abi : LOOKS_STAKING_ABI1,
      stakeTokenFunction : "stakedToken",
      rewardTokenFunction : "looksRareToken"
    };

    const Pool2 = {
      address : "0xBcD7254A1D759EFA08eC7c3291B2E85c5dCC12ce",
      abi : LOOKS_STAKING_ABI2,
      stakeTokenFunction : "looksRareToken",
      rewardTokenFunction : "rewardToken"
    };

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};

    let p = await loadLooksSynthetixPool1(App, tokens, prices, Pool.abi, Pool.address, Pool.rewardTokenFunction, Pool.stakeTokenFunction);
    let p2 = await loadLooksSynthetixPool2(App, tokens, prices, Pool2.abi, Pool2.address, Pool2.rewardTokenFunction, Pool2.stakeTokenFunction);
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl+p2.staked_tvl)}`);
    if (p.totalUserStaked > 0 || p2.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked+p2.totalUserStaked)} at an APR of ${(p.totalAPR + p2.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

async function loadLooksSynthetixPool1(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
  const info = await loadLooksSynthetixPoolInfo1(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
  return await printSynthetixPool(App, info);
}

async function loadLooksSynthetixPool2(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
  const info = await loadLooksSynthetixPoolInfo2(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
  return await printLooksSynthetixPool2(App, info);
}

async function loadLooksSynthetixPoolInfo1(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      x.toLowerCase() !=  "0xb34ab2f65c6e4f764ffe740ab83f982021faed6d" && //BSG can't be retrieved from Coingecko
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
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

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const calls = [STAKING_MULTI.rewardPerBlock(),
      STAKING_MULTI.userInfo(App.YOUR_ADDRESS), STAKING_MULTI.calculatePendingRewards(App.YOUR_ADDRESS)]
    const [rewardsPerBlock, balance, earned_] = await App.ethcallProvider.all(calls);
    const weeklyRewards = rewardsPerBlock / 1e18 * 604800 / 13.5;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance.amount / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = earned_ / 10 ** rewardToken.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      weeklyRewards,
      usdPerWeek,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned
    }
}

async function loadLooksSynthetixPoolInfo2(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    let rewardTokenAddresses = [];
    const rewardTokenAddress1 = await STAKING_POOL.callStatic[stakeTokenFunction]();
    const rewardTokenAddress2 = await STAKING_POOL.callStatic[rewardTokenFunction]();
    rewardTokenAddresses.push(rewardTokenAddress1)
    rewardTokenAddresses.push(rewardTokenAddress2)

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      x.toLowerCase() !=  "0xb34ab2f65c6e4f764ffe740ab83f982021faed6d" && //BSG can't be retrieved from Coingecko
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    for(const rewardTokenAddress of rewardTokenAddresses){
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
      }
    }
    let rewardTokens = [];
    let rewardTokenTickers = [];
    for(const rewardTokenAddress of rewardTokenAddresses){
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
      const rewardTokenTicker = rewardToken.symbol;
      rewardTokens.push(rewardToken)
      rewardTokenTickers.push(rewardTokenTicker)
      }

    const calls = [STAKING_MULTI.currentRewardPerBlock(), STAKING_MULTI.totalShares(), STAKING_MULTI.calculateSharePriceInLOOKS(),
      STAKING_MULTI.calculateSharesValueInLOOKS(App.YOUR_ADDRESS), STAKING_MULTI.calculatePendingRewards(App.YOUR_ADDRESS)]
    const [rewardsPerBlock2, totalShares_, sharePriceInLooks_, balance, earned_] = await App.ethcallProvider.all(calls);

    const STAKING_MULTI_REWARDS_ABI = [{"inputs":[{"internalType":"address","name":"_looksRareToken","type":"address"},{"internalType":"address","name":"_tokenSplitter","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256[]","name":"_rewardsPerBlockForStaking","type":"uint256[]"},{"internalType":"uint256[]","name":"_rewardsPerBlockForOthers","type":"uint256[]"},{"internalType":"uint256[]","name":"_periodLengthesInBlocks","type":"uint256[]"},{"internalType":"uint256","name":"_numberPeriods","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"harvestedAmount","type":"uint256"}],"name":"Compound","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestedAmount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"currentPhase","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardPerBlockForStaking","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardPerBlockForOthers","type":"uint256"}],"name":"NewRewardsPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestedAmount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"NUMBER_PERIODS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRECISION_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"START_BLOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTokenPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"calculatePendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentPhase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestAndCompound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"looksRareToken","outputs":[{"internalType":"contract ILooksRareToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlockForOthers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlockForStaking","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakingPeriod","outputs":[{"internalType":"uint256","name":"rewardPerBlockForStaking","type":"uint256"},{"internalType":"uint256","name":"rewardPerBlockForOthers","type":"uint256"},{"internalType":"uint256","name":"periodLengthInBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenSplitter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAmountStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const STAKING_MULTI_REWARDS = new ethcall.Contract("0x465a790b428268196865a3ae2648481ad7e0d3b1", STAKING_MULTI_REWARDS_ABI);
    const rewardCalls = [STAKING_MULTI_REWARDS.rewardPerBlockForStaking()];
    const [rewardsPerBlock1] = await App.ethcallProvider.all(rewardCalls);
    let weeklyRewards = [];
    weeklyRewards.push(rewardsPerBlock1 / 1e18 * 604800 / 13.5)
    weeklyRewards.push(rewardsPerBlock2 / 1e18 * 604800 / 13.5)

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    let rewardTokenPrices = [];
    for(const rewardTokenAddress of rewardTokenAddresses){
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      rewardTokenPrices.push(rewardTokenPrice);
    }

    const totalShares = totalShares_ / 1e18;
    const sharePriceInLooks = sharePriceInLooks_ / 1e18;
    const totalStaked = totalShares * sharePriceInLooks;
    stakeToken.staked = totalStaked;
    let usdCoinsPerWeek = [];
    for(let i = 0; i < rewardTokenAddresses.length; i++){
      const usdPerWeek = weeklyRewards[i] * rewardTokenPrices[i];  //this needs update
      usdCoinsPerWeek.push(usdPerWeek);
    }

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = earned_ / 1e18

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
      earned
    }
}

async function printLooksSynthetixPool2(App, info, chain="eth", customURLs) {
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
  const approveTENDAndStake = async function() {
    return looksContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function() {
    return looksContract_unstake(info.stakingAddress, App)
  }
  const claim = async function() {
    return looksContract_claim(info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}">Explorer</a>`);
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  }
  else {
    _print("Please use the official website to stake ETH.");
  }
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTickers[1]} ($${formatMoney(info.earned*info.rewardTokenPrices[1])})`, claim)
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

const looksContract_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  const earnedYFFI = (await REWARD_POOL.earned(App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
    showLoading()
    REWARD_POOL.harvest({gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const looksContract_stake = async function(stakeTokenAddr, rewardPoolAddr, App, maxAllowance) {
  const signer = App.provider.getSigner()

  const TEND_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, YFFI_REWARD_CONTRACT_ABI, signer)

  const balanceOf = await TEND_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentTEND =  maxAllowance ? (maxAllowance / 1e18 < balanceOf / 1e18
    ? maxAllowance : balanceOf) : balanceOf
  const allowedTEND = await TEND_TOKEN.allowance(App.YOUR_ADDRESS, rewardPoolAddr)

  let allow = Promise.resolve()

  if (allowedTEND / 1e18 < currentTEND / 1e18) {
    showLoading()
    allow = TEND_TOKEN.approve(rewardPoolAddr, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTEND / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
        WEEBTEND_V2_TOKEN.deposit(currentTEND, true, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(x => {
            hideLoading()
            console.log(x);
            _print('Something went wrong.')
          })
      })
      .catch(x => {
        hideLoading()
        console.log(x);
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const looksContract_unstake = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)
  const currentStakedAmount = await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.withdraw(currentStakedAmount, true, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}