$(function() {
    consoleInit(main)
    });
  
  const STAKINGREWARDS_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsTokenDPX","type":"address"},{"internalType":"address","name":"_rewardsTokenRDPX","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"},{"internalType":"uint256","name":"_boostedTimePeriod","type":"uint256"},{"internalType":"uint256","name":"_boost","type":"uint256"},{"internalType":"uint256","name":"_id","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardDPX","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardRDPX","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardDPX","type":"uint256"}],"name":"RewardCompounded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardDPX","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardRDPX","type":"uint256"}],"name":"RewardUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"boost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"boostedFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"boostedTimePeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"compound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"DPXtokensEarned","type":"uint256"},{"internalType":"uint256","name":"RDPXtokensEarned","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"rewardsTokenID","type":"uint256"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"id","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rewardDPX","type":"uint256"},{"internalType":"uint256","name":"rewardRDPX","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStoredDPX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStoredRDPX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRateDPX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRateRDPX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsDPX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsRDPX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsTokenDPX","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsTokenRDPX","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userDPXRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRDPXRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountDPX","type":"uint256"},{"internalType":"uint256","name":"amountRDPX","type":"uint256"}],"name":"withdrawRewardTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}];
  const NEW_STAKINGREWARDS_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"rewardsToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_rewardsDistributor","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"addReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardData","outputs":[{"internalType":"address","name":"rewardsDistributor","type":"address"},{"internalType":"uint256","name":"rewardsDuration","type":"uint256"},{"internalType":"uint256","name":"periodFinish","type":"uint256"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"lastUpdateTime","type":"uint256"},{"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_rewardsDistributor","type":"address"}],"name":"setRewardsDistributor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

  async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    //const pools = ["0xc6D714170fE766691670f12c2b45C1f34405AAb6", "0x96B0d9c85415C69F4b2FAC6ee9e9CE37717335B4", "0x03ac1Aa1ff470cf376e6b7cD3A3389Ad6D922A74", "0x8d481245801907b45823fb032e6848d0d3c29ae5"]
    const pools = ["0xc6d714170fe766691670f12c2b45c1f34405aab6", "0x96b0d9c85415c69f4b2fac6ee9e9ce37717335b4", "0x03ac1aa1ff470cf376e6b7cd3a3389ad6d922a74", "0x125cc7cce81a809c825c945e5aa874e60cccb6bb"]

    const NewPools = [
      "0xd9c79b111D2737013f1af210f6687a9Fa7852b49"
    ].map(a => ({
          address: a,
          abi: NEW_STAKINGREWARDS_ABI,
          stakeTokenFunction: "stakingToken",
          rewardTokenAddress: "0x912CE59144191C1204E64559FE8253a0e49E6548"
      }))
  
    let tokens = {};
    let prices = await getArbitrumPrices();

    prices["0xc15b9db0ee5b1b7fb8800a644457207f482e260d"] = getParameterCaseInsensitive(prices,  "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1");

    let p = await loadMultipleNewDopexPools(App, tokens, prices, NewPools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    }

    _print("");
    _print_bold("Old Pools");
    _print("");
  
    pools.forEach(async (pool) => {
      await loadDopexSynthetixPools(App, tokens, prices, STAKINGREWARDS_ABI, pool);
    });
  
    hideLoading();
  }

  async function loadMultipleNewDopexPools(App, tokens, prices, pools) {
    let totalStaked = 0, totalUserStaked = 0, individualAPRs = [];
    const infos = await Promise.all(pools.map(p =>
      loadNewDopexPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenAddress, p.stakeTokenFunction)));
    for (const i of infos) {
      let p = await printArbitrumSynthetixPool(App, i, "arbitrum");
      totalStaked += p.staked_tvl || 0;
      totalUserStaked += p.userStaked || 0;
      if (p.userStaked > 0) {
        individualAPRs.push(p.userStaked * p.apr / 100);
      }
    }
    let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x, y) => x + y, 0) / totalUserStaked;
    return { staked_tvl: totalStaked, totalUserStaked, totalApr };
  }

  async function loadNewDopexPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    rewardTokenAddress, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);
  
    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
    var stakeToken = await getArbitrumToken(App, stakeTokenAddress, stakingAddress);
  
    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }
  
    var newPriceAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
        prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
      tokens[address] = await getArbitrumToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
      tokens[rewardTokenAddress] = await getArbitrumToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  
    const rewardTokenTicker = rewardToken.symbol;
  
    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");
  
    if (!poolPrices) {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }
  
    const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
    const stakeTokenPrice =
      prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  
    const calls = [STAKING_MULTI.rewardData(rewardTokenAddress),
    STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(rewardTokenAddress, App.YOUR_ADDRESS)]
    const [rewardData, balance, earned_] = await App.ethcallProvider.all(calls);
  
    const weeklyRewards = (Date.now() / 1000 > rewardData.periodFinish) ? 0 : rewardData.rewardRate / 10 ** rewardToken.decimals * 604800;
  
    const usdPerWeek = weeklyRewards * rewardTokenPrice;
  
    const staked_tvl = poolPrices.staked_tvl;
  
    const userStaked = balance / 10 ** stakeToken.decimals;
  
    const userUnstaked = stakeToken.unstaked;
  
    const earned = earned_ / 10 ** rewardToken.decimals;
  
    return {
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
  
  async function loadDopexSynthetixPools(App, tokens, prices, abi, address) {
    const info = await loadDopexSynthetixPoolsInfo(App, tokens, prices, abi, address);
    return await printDopexSynthetixPool(App, info);
  }
  
  async function loadDopexSynthetixPoolsInfo(App, tokens, prices, stakingAbi, stakingAddress) {
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);
  
    const calls = [STAKING_MULTI.stakingToken(), STAKING_MULTI.rewardsTokenDPX(),
                   STAKING_MULTI.rewardsTokenRDPX(), STAKING_MULTI.periodFinish(),
                   STAKING_MULTI.rewardRateDPX(), STAKING_MULTI.rewardRateRDPX(),
                   STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(App.YOUR_ADDRESS), 
                   STAKING_MULTI.boost(), STAKING_MULTI.boostedFinish()]
    const [stakeTokenAddress, rewardTokenAddress0, rewardTokenAddress1,
           periodFinish, rewardRate0, rewardRate1, balance,
           earned_, boost, boostedFinish] = await App.ethcallProvider.all(calls)
    const [earned_0, earned_1] = earned_;
  
  
    let stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);
  
      let newPriceAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(prices, x)).concat([rewardTokenAddress0, rewardTokenAddress1])
    // let newPrices = await lookUpTokenPrices(newPriceAddresses);
    // for (const key in newPrices) {
    //   if (newPrices[key]?.usd)
    //       prices[key] = newPrices[key];
    // }
    let newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
  
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress0)) {
        tokens[rewardTokenAddress0] = await getToken(App, rewardTokenAddress0, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress1)) {
        tokens[rewardTokenAddress1] = await getToken(App, rewardTokenAddress1, stakingAddress);
    }
  
    const rewardToken0 = getParameterCaseInsensitive(tokens, rewardTokenAddress0);
    const rewardToken1 = getParameterCaseInsensitive(tokens, rewardTokenAddress1);
  
    const rewardTokenTicker0 = rewardToken0.symbol;
    const rewardTokenTicker1 = rewardToken1.symbol;
  
    const poolPrices = getPoolPrices(tokens, prices, stakeToken);
  
    const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
    const stakeTokenPrice = poolPrices.price;
  
    const rewardTokenPrice0 = getParameterCaseInsensitive(prices, rewardTokenAddress0)?.usd;
    const rewardTokenPrice1 = getParameterCaseInsensitive(prices, rewardTokenAddress1)?.usd;
  
    const weeklyRewards0 = (Date.now() / 1000 > periodFinish) ? 0 : ((Date.now() / 1000 > boostedFinish) ? rewardRate0 : rewardRate0 * boost) / 1e18 * 604800;
    const weeklyRewards1 = (Date.now() / 1000 > periodFinish) ? 0 : ((Date.now() / 1000 > boostedFinish) ? rewardRate1 : rewardRate1 * boost) / 1e18 * 604800;
  
    const usdPerWeek0 = weeklyRewards0 * rewardTokenPrice0;
    const usdPerWeek1 = weeklyRewards1 * rewardTokenPrice1;
  
    const staked_tvl = poolPrices.staked_tvl;
  
    const userStaked = balance / 10 ** stakeToken.decimals;
  
    const userUnstaked = stakeToken.unstaked;
  
    const earned0 = earned_0 / 10 ** rewardToken0.decimals;
    const earned1 = earned_1 / 10 ** rewardToken1.decimals;
  
    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress0,
      rewardTokenAddress1,
      stakeTokenTicker,
      rewardTokenTicker0,
      rewardTokenTicker1,
      stakeTokenPrice,
      rewardTokenPrice0,
      rewardTokenPrice1,
      weeklyRewards0,
      weeklyRewards1,
      usdPerWeek0,
      usdPerWeek1,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned0,
      earned1
    }
  }
  
  async function printDopexSynthetixPool(App, info, chain="eth") {
  info.poolPrices.print_price(chain);
  _print(`${info.rewardTokenTicker0} Per Week: ${info.weeklyRewards0.toFixed(2)} ($${formatMoney(info.usdPerWeek0)})`);
  const weeklyAPR0 = info.usdPerWeek0 / info.staked_tvl * 100;
  const dailyAPR0 = weeklyAPR0 / 7;
  const yearlyAPR0 = weeklyAPR0 * 52;
  _print(`${info.rewardTokenTicker0} APR: Day ${dailyAPR0.toFixed(2)}% Week ${weeklyAPR0.toFixed(2)}% Year ${yearlyAPR0.toFixed(2)}%`);
  _print(`${info.rewardTokenTicker1} Per Week: ${info.weeklyRewards1.toFixed(2)} ($${formatMoney(info.usdPerWeek1)})`);
  const weeklyAPR1 = info.usdPerWeek1 / info.staked_tvl * 100;
  const dailyAPR1 = weeklyAPR1 / 7;
  const yearlyAPR1 = weeklyAPR1 * 52;
  _print(`${info.rewardTokenTicker1} APR: Day ${dailyAPR1.toFixed(2)}% Week ${weeklyAPR1.toFixed(2)}% Year ${yearlyAPR1.toFixed(2)}%`);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (info.userStaked > 0) {
    info.poolPrices.print_contained_price(info.userStaked);
      const userWeeklyRewards0 = userStakedPct * info.weeklyRewards0 / 100;
      const userWeeklyRewards1 = userStakedPct * info.weeklyRewards1 / 100;
      const userDailyRewards0 = userWeeklyRewards0 / 7;
      const userDailyRewards1 = userWeeklyRewards1 / 7;
      const userYearlyRewards0 = userWeeklyRewards0 * 52;
      const userYearlyRewards1 = userWeeklyRewards1 * 52;
      _print(`Estimated ${info.rewardTokenTicker0} earnings:`
          + ` Day ${userDailyRewards0.toFixed(2)} ($${formatMoney(userDailyRewards0*info.rewardTokenPrice0)})`
          + ` Week ${userWeeklyRewards0.toFixed(2)} ($${formatMoney(userWeeklyRewards0*info.rewardTokenPrice0)})`
          + ` Year ${userYearlyRewards0.toFixed(2)} ($${formatMoney(userYearlyRewards0*info.rewardTokenPrice0)})`);
      _print(`Estimated ${info.rewardTokenTicker1} earnings:`
          + ` Day ${userDailyRewards1.toFixed(2)} ($${formatMoney(userDailyRewards1*info.rewardTokenPrice1)})`
          + ` Week ${userWeeklyRewards1.toFixed(2)} ($${formatMoney(userWeeklyRewards1*info.rewardTokenPrice1)})`
          + ` Year ${userYearlyRewards1.toFixed(2)} ($${formatMoney(userYearlyRewards1*info.rewardTokenPrice1)})`);
  }
  const approveTENDAndStake = async function() {
    return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function() {
    return rewardsContract_unstake(info.stakingAddress, App)
  }
  const claim = async function() {
    return rewardsContractDopex_claim(info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  switch (chain) {
    case "eth":
      _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
      break;
    case "avax":
      _print(`<a target="_blank" href="https://cchain.explorer.avax.network/address/${info.stakingAddress}#code">Explorer</a>`);
      break;
    case "bsc":
      _print(`<a target="_blank" href="https://bscscan.com/address/${info.stakingAddress}#code">BSC Scan</a>`);
      break;
    case "heco":
      _print(`<a target="_blank" href="https://scan.hecochain.com/address/${info.stakingAddress}#code">Heco Scan</a>`);
      break;
    case "matic":
      _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Matic Explorer</a>`);
      break;
  }
  _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${info.earned0.toFixed(6)} ${info.rewardTokenTicker0} ($${formatMoney(info.earned0*info.rewardTokenPrice0)}), ${info.earned1.toFixed(6)} ${info.rewardTokenTicker1} ($${formatMoney(info.earned1*info.rewardTokenPrice1)})`, claim)
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print_link(`Exit`, exit)
  _print("");
  
  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd,
      apr : (yearlyAPR0 + yearlyAPR1)
  }
  }
  
  const rewardsContractDopex_claim = async function(rewardPoolAddr, App) {
    const signer = App.provider.getSigner()
  
    const REWARD_POOL = new ethers.Contract(rewardPoolAddr, STAKINGREWARDS_ABI, signer)
  
    console.log(App.YOUR_ADDRESS)
  
    const earned_ = await REWARD_POOL.earned(App.YOUR_ADDRESS);
    const earnedDPX = earned_[0] / 1e18
    const earnedRDPX = earned_[1] / 1e18
  
    if (earnedDPX > 0 || earnedRDPX > 0) {
      showLoading()
      REWARD_POOL.getReward(2)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
  
