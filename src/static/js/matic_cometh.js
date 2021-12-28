
$(function() {
  consoleInit(main)
  });
  
  const MATIC_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
  const MULTI_REWARDS_ABI = [{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[{"type":"address","name":"_rewardsDistribution","internalType":"address"},{"type":"address[]","name":"_rewardsTokens","internalType":"contract IERC20[]"},{"type":"address","name":"_stakingToken","internalType":"address"}]},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256[]","name":"reward","internalType":"uint256[]","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256[]","name":"rewards","internalType":"uint256[]","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"exit","inputs":[],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"getReward","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getRewardRates","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getRewards","inputs":[{"type":"address","name":"user","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getRewardsForDuration","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getRewardsPerTokenStored","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address[]","name":"","internalType":"contract IERC20[]"}],"name":"getRewardsTokens","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getUserRewardPerTokenPaid","inputs":[{"type":"address","name":"user","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256[]","name":"addedRewards","internalType":"uint256[]"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRates","inputs":[{"type":"uint256","name":"","internalType":"uint256"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"uint256","name":"","internalType":"uint256"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"rewardsDistribution","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsDuration","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"rewardsPerToken","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsPerTokenStored","inputs":[{"type":"uint256","name":"","internalType":"uint256"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardsTokens","inputs":[{"type":"uint256","name":"","internalType":"uint256"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"stakeWithPermit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakingToken","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"uint256","name":"","internalType":"uint256"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}],"constant":false}]

  async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const tokens = {};
    const prices = await getMaticPrices();
  
    const pools = ComethStakingContracts.map(c => { return {
      address: c.stakingRewardAddress,
      abi: MATIC_STAKING_ABI,
      stakeTokenFunction: "stakingToken",
      rewardTokenFunction: "rewardsToken"
    }})

    const PoolsMultiRewards = ComethDoubleRewardContracts.map(a => {
      return {
        address : a.stakingMultiRewardsAddress,
        abi : MULTI_REWARDS_ABI,
        stakeTokenFunction : "stakingToken"
      }
    })

    await loadComethSynthetixPoolInfo(App, tokens, prices, PoolsMultiRewards[2].abi, PoolsMultiRewards[2].address, PoolsMultiRewards[2].stakeTokenFunction)
  
    let pm = await loadMultipleComethRewardPools(App,tokens, prices, PoolsMultiRewards)
    let p = await loadMultipleMaticSynthetixPools(App, tokens, prices, pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl + pm.staked_tvl)}`);
    if (p.totalUserStaked > 0 || pm.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked+pm.totalUserStaked)} at an APR of ${(p.totalAPR + pm.totalAPR * 100).toFixed(2)}%\n`);
    }
  
    hideLoading();
  }

  async function loadMultipleComethRewardPools(App, tokens, prices, pools) {
    let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
    const infos = await Promise.all(pools.map(p => 
        loadComethSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)));
    for (const i of infos.filter(i => i?.poolPrices)) {
      let p = await printComethSynthetixPool(App, i);
      totalStaked += p.staked_tvl || 0;
      totalUserStaked += p.userStaked || 0;
      if (p.userStaked > 0) {
        individualAPRs.push(p.userStaked * p.apr / 100);
      }
    }
    let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
    return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
  }

async function loadComethSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
      const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
      let rewardTokenAddresses = []
      for(let i = 0; i < 2; i++){
        const rewardTokenAddress = await STAKING_POOL.rewardsTokens(i);
        rewardTokenAddresses.push(rewardTokenAddress);
      }
  
      var stakeToken = await getMaticToken(App, stakeTokenAddress, stakingAddress);
  
      var newTokenAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(tokens,x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getMaticToken(App, address, stakingAddress);
      }
      
      for(let rewardTokenAddress of rewardTokenAddresses){
        if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getMaticToken(App, rewardTokenAddress, stakingAddress);
        }
      }

      let rewardTokens = [];
      for(let rewardTokenAddress of rewardTokenAddresses){
        const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
        rewardTokens.push(rewardToken);
      }
  
      let rewardTokenTickers = [];
      for(let rewardToken of rewardTokens){
        const rewardTokenTicker = rewardToken.symbol;
        rewardTokenTickers.push(rewardTokenTicker);
      }
  
      const poolPrices = getPoolPrices(tokens, prices, stakeToken, "matic");

      if (!poolPrices) 
      {
        console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
        return null;
      }
  
      const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
      const stakeTokenPrice =
          prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
      
      let rewardTokenPrices = [];
      for(let rewardTokenAddress of rewardTokenAddresses){
        const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
        rewardTokenPrices.push(rewardTokenPrice);
      }
  
      const periodFinish = await STAKING_POOL.periodFinish();

      let rewardRates = [];
      for(let i = 0; i < 2; i++){
        const rewardRate = await STAKING_POOL.rewardRates(i);
        rewardRates.push(rewardRate);
      }

      let weeklyRewards = [];
      for(let rewardRate of rewardRates){
        const weeklyReward = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;
        weeklyRewards.push(weeklyReward);
      }

      let usdCoinsPerWeek = [];
      for(let i = 0; i < 2; i++ ){
        const usdPerWeek = weeklyRewards[i] * rewardTokenPrices[i];
        usdCoinsPerWeek.push(usdPerWeek);
      }
  
      const staked_tvl = poolPrices.staked_tvl;
  
      const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;
  
      const userUnstaked = stakeToken.unstaked;
  
      const earnings = await STAKING_POOL.earned(App.YOUR_ADDRESS);
      const earned0 = earnings[0] / 10 ** rewardTokens[0].decimals;
      const earned1 = earnings[1] / 10 ** rewardTokens[1].decimals;
  
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
        earned0,
        earned1
      }
}

async function printComethSynthetixPool(App, info) {
  info.poolPrices.print_price("matic");
  let totalUSDPerWeek = 0;
  for(let i = 0; i < 2; i++){
    totalUSDPerWeek += info.usdCoinsPerWeek[i];
    _print(`${info.rewardTokenTickers[i]} Per Week: ${info.weeklyRewards[i].toFixed(2)} ($${formatMoney(info.usdCoinsPerWeek[i])})`);
  }
  let totalYearlyAPR = 0;
  _print(`Total Per Week: $${formatMoney(totalUSDPerWeek)}`);
  for(let i = 0; i < 2; i++){
    const weeklyAPR = info.usdCoinsPerWeek[i] / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: ${info.rewardTokenTickers[i]} Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    totalYearlyAPR += yearlyAPR;
  }
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (info.userStaked > 0) {
    for(let i = 0; i < 2; i++){
      info.poolPrices.print_contained_price(info.userStaked);
      const userWeeklyRewards = userStakedPct * info.weeklyRewards[i] / 100;
      const userDailyRewards = userWeeklyRewards / 7;
      const userYearlyRewards = userWeeklyRewards * 52;
      _print(`Estimated ${info.rewardTokenTicker} earnings:`
          + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrices[i])})`
          + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrices[i])})`
          + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrices[i])})`);
    }
  }
  const approveTENDAndStake = async function() {
    return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function() {
    return rewardsContract_unstake(info.stakingAddress, App)
  }
  const claim = async function() {
    return rewardsContract_claim(info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Polygon Explorer</a>`);
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${info.earned0.toFixed(6)} ${info.rewardTokenTickers[0]} + ${info.earned1.toFixed(6)} ${info.rewardTokenTickers[1]} ($${formatMoney(info.earned0*info.rewardTokenPrices[0] + info.earned1*info.rewardTokenPrices[1])})`, claim)
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Revoke (set approval to 0)`, revoke)
  }
  _print_link(`Exit`, exit)
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd,
      apr : totalYearlyAPR
  }
}
  
  const ComethDoubleRewardContracts = [
    {
      //tokens: [Ze, gt],
      //rewards: [Se, ze],
      stakingMultiRewardsAddress: "0xBbDC1681e43549d3871CF1953D1dD9afF320feF0"
  }, {
      //tokens: [Ze, Se],
      //rewards: [Se, ze],
      stakingMultiRewardsAddress: "0x2146baC214D9BF2Da56c3d4A69b9149e457F9d8c"
  }, {
      //tokens: [ze, Se],
      //rewards: [Se, ze],
      stakingMultiRewardsAddress: "0xc0a1dFb85734E465C5dadc5683DE58358C906598"
  }, {
      //tokens: [ze, gt],
      //rewards: [Se, ze],
      stakingMultiRewardsAddress: "0x69Cb6f98E45c13A230d292bE0a6aF93a6521c39B"
  }, {
      //tokens: [gt, Me],
      //rewards: [Se, Me],
      stakingMultiRewardsAddress: "0x7C991dF9CDaFB1F62BefD5D6502fF81a7D85227b"
  }, {
      //tokens: [it, Se],
      //rewards: [Se, it],
      stakingMultiRewardsAddress: "0x2F434bC10D44Db5161934FAaa58A462C8F1cBE52"
  }, {
      //tokens: [ct, Se],
      //rewards: [Se, it],
      stakingMultiRewardsAddress: "0xa964B2ef4C0326e5c0701b513d43d7f7f254E4C1"
  }, {
      //tokens: [lt, Se],
      //rewards: [Se, it],
      stakingMultiRewardsAddress: "0x066E267ff61F23d733538695da066ADA72a6fac3"
  }, {
      //tokens: [ut, Se],
      //rewards: [Se, ut],
      stakingMultiRewardsAddress: "0x3a68F45a3Bc648365a80AbafA2528cd3277eEB96"
  }, {
      //tokens: [nt, gt],
      //rewards: [Se, nt],
      stakingMultiRewardsAddress: "0xAB4292c600ddF1845D41c00b374DbBA5062e0810"
  }, {
      //tokens: [nt, Se],
      //rewards: [Se, nt],
      stakingMultiRewardsAddress: "0xcA9c316760AAAF865163b0DC5066cdb89A9562Ac"
  }, {
      //tokens: [vt, gt],
      //rewards: [Se, vt],
      stakingMultiRewardsAddress: "0xe3AE080d6a4F1aC5AbABf514F871428342135877"
  }, {
      //tokens: [vt, Se],
      //rewards: [Se, vt],
      stakingMultiRewardsAddress: "0xe29544a8145978a2355E44fBAC61F4748f0EcCA6"
  }, {
      //tokens: [Et, Se],
      //rewards: [Se, Et],
      stakingMultiRewardsAddress: "0xdd90B544Db1d1d1c59c6d3608de5d7C694eEbE23"
  }, {
      //tokens: [Re, jt],
      //rewards: [Se, jt],
      stakingMultiRewardsAddress: "0xAE4985c56647970870beB871864184ceCf5A60Bb"
  }, {
      //tokens: [gt, Tt],
      //rewards: [Se, Tt],
      stakingMultiRewardsAddress: "0xEA98BC930D0f6c71aFE7D717A940170cCbd6a8CE"
  }, {
      //tokens: [gt, ft],
      //rewards: [Se, ft],
      stakingMultiRewardsAddress: "0x4e2114F7FA11Dc0765ddD51Ad98B6624C3bf1908"
  }, {
      //tokens: [St, Re],
      //rewards: [Se, St],
      stakingMultiRewardsAddress: "0x9Dc2b914172Beb78dBD077800f088AdDa4051c8c"
  }, {
      //tokens: [St, Se],
      //rewards: [Se, St],
      stakingMultiRewardsAddress: "0xC2A20288904b4886d82FA08F4277e662fD24D82d"
  }, {
      //tokens: [Rt, Re],
      //rewards: [Se, Rt],
      stakingMultiRewardsAddress: "0x1D85b838667471a1D1FFB0b91AeD019840e9bDd6"
  }, {
      //tokens: [Rt, Se],
      //rewards: [Se, Rt],
      stakingMultiRewardsAddress: "0x3408C63BD09927651e9755B0E86d263e8a7B64A7"
    }
  ]
  
  const ComethStakingContracts =  [
    {
      //tokens: [WMATIC, MATIC_WETH],
      stakingRewardAddress: '0x5A25c4f43d0bfcCc07Aa86f7e8a1a1A3bFd9b15d'
    },
    {
      //tokens: [LADZ, MATIC_WETH],
      stakingRewardAddress: '0x88030CC48CaC2a7Fa3e88De3ad7826AC29903114'
    },
    {
      //tokens: [LADZ, MUST],
      stakingRewardAddress: '0xbbdeC9fe85342f45ab42f817931a261BFE0c9199'
    },
    {
      //tokens: [pBTC, MUST],
      stakingRewardAddress: '0x5dE870843eA74F3f6A9A5253323788C2Ab94D9C5'
    },
    {
      //tokens: [pBTC, WBTC],
      stakingRewardAddress: '0xa03aE369f89993fFC5E5d5e338387b62EaD557a6'
    },
    {
      //tokens: [BND, MATIC_WETH],
      stakingRewardAddress: '0x87c23d32469FA9ddef7797Bf1d4018cf61C8b3e8'
    },
    {
      //tokens: [MATIC_USDC, pBTC],
      stakingRewardAddress: '0x3F59e87d1414B8e9a7683FAD9bD4d66b441F5247'
    },
    {
      //tokens: [BND, MUST],
      stakingRewardAddress: '0xdA39652B724b149324D47A2bAe3aD3F323eD4685'
    },
    {
      //tokens: [KIF, MUST],
      stakingRewardAddress: '0x868Fc3c5e007a49308bf86168E3fd9D5DBC8ca30'
    },
    {
      //tokens: [DAI, USDT],
      stakingRewardAddress: '0x9F8e609E5C1a73938739F63E2eB231a185df31b3'
    },
    {
      //tokens: [DAI, MATIC_USDC],
      stakingRewardAddress: '0x9C9e24C8fe20ec9E3518524818e06504370cd400'
    },
    {
      //tokens: [USDT, MATIC_USDC],
      stakingRewardAddress: '0x296A8b9F19d8b6282Bbc474847D8a005B4cA09e1'
    },
    {
      //tokens: [PICKLE, MUST],
      stakingRewardAddress: '0x52f68A09AEe9503367bc0cda0748C4D81807Ae9a'
    },
    {
      //tokens: [MATIC_WETH, WBTC],
      stakingRewardAddress: '0xd6161AdBf80602f0ecf74F92ce0271556ddbf98B'
    },
    {
      //tokens: [BBADGER, MUST],
      stakingRewardAddress: '0x363d359B3B165E9cBF85088cB6C4EfF4d4338B73'
    },
    {
      //tokens: [BDIGG, MUST],
      stakingRewardAddress: '0x3268BD010Ec504e6CFfB349009Ec1AFCA868d292'
    },
    {
      //tokens: [XSDT, MUST],
      stakingRewardAddress: '0x67659dF49823f026E98afB2e9703C4D616EDB168'
    },
    {
      //tokens: [XSDT, SDT],
      stakingRewardAddress: '0xfb23843D3561a3bC73BB14855286Bd4b0b3E15C6'
    },
    {
      //tokens: [SD3CRV, XSDT],
      stakingRewardAddress: '0xd3753dD9686549Ca458C5AFA7079C7Cf834396FE'
    },
    {
      //tokens: [SDCRVRENWSBTC, XSDT],
      stakingRewardAddress: '0xf5d2E95D90bf8959cdEF08628bafA0D7d0bfc8F7'
    },
    {
      //tokens: [MATIC_USDC, MUST],
      stakingRewardAddress: '0x1C678EA856B368CC361A3389734fe451fEC8CEea'
    },
    {
      //tokens: [WBTC, MUST],
      stakingRewardAddress: '0x449A45A2Db94Fb4cD14f7Af4FD2322649492225A'
    },
    {
      //tokens: [JULIEN, MUST],
      stakingRewardAddress: '0x83bb796fBc69E013726129f768069e456CaDeA2b'
    },
    {
      //tokens: [SDT, MUST],
      stakingRewardAddress: '0x8e0dc90E432c3F234d24aa2CB47dD31cF2Ad8429'
    },
    {
      //tokens: [SDCRVRENWSBTC, WBTC],
      stakingRewardAddress: '0x90261B5B1Bf708EA264A60556e31d6b4eA481E48'
    },
    {
      //tokens: [MAUSDC, MUST],
      stakingRewardAddress: '0x31a8fCe4d069191900E91B4Ba4bF3F3E7d1c7338'
    },
    {
      //tokens: [GHST, MUST],
      stakingRewardAddress: '0x03A2C998A05B544B236fd51A44EFe6505eb33a9a'
    },
    {
      //tokens: [AAVE, MUST],
      stakingRewardAddress: '0x642A056F790af3eDa4F5639aDc54083285186D90'
    },
    {
      //tokens: [SUSHI, MUST],
      stakingRewardAddress: '0xFAd897402C0A70440e79A9Da6aAfb8a19D94D5eA'
    },
    {
      //tokens: [MATIC_WETH, MATIC_USDC],
      stakingRewardAddress: '0x1c30Cfe08506BA215c02bc2723C6D310671BAb62'
    },
    {
      //tokens: [MATIC_WETH, MUST],
      stakingRewardAddress: '0x2cc6a7A06B32E0796D8f9225E2e33ae51C93d715'
    },
    {
      //tokens: [WMATIC, MUST],
      stakingRewardAddress: '0x2328c83431a29613b1780706E0Af3679E3D04afd'
    }
  ]
  