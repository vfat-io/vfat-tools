$(function() {
  consoleInit(main)
  });
  
  const SWAPR_ABI = [{"type":"event","name":"Canceled","inputs":[],"anonymous":false},{"type":"event","name":"Claimed","inputs":[{"type":"address","name":"claimer","internalType":"address","indexed":true},{"type":"uint256[]","name":"amounts","internalType":"uint256[]","indexed":false}],"anonymous":false},{"type":"event","name":"Initialized","inputs":[{"type":"address[]","name":"rewardsTokenAddresses","internalType":"address[]","indexed":false},{"type":"address","name":"stakableTokenAddress","internalType":"address","indexed":false},{"type":"uint256[]","name":"rewardsAmounts","internalType":"uint256[]","indexed":false},{"type":"uint64","name":"startingTimestamp","internalType":"uint64","indexed":false},{"type":"uint64","name":"endingTimestamp","internalType":"uint64","indexed":false},{"type":"bool","name":"locked","internalType":"bool","indexed":false},{"type":"uint256","name":"stakingCap","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"staker","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"withdrawer","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"cancel","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"canceled","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claim","inputs":[{"type":"uint256[]","name":"_amounts","internalType":"uint256[]"},{"type":"address","name":"_recipient","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimAll","inputs":[{"type":"address","name":"_recipient","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"claimableRewards","inputs":[{"type":"address","name":"_account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"earnedRewardsOf","inputs":[{"type":"address","name":"_staker","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"endingTimestamp","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[{"type":"address","name":"_recipient","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getClaimedRewards","inputs":[{"type":"address","name":"_claimer","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address[]","name":"","internalType":"address[]"}],"name":"getRewardTokens","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address[]","name":"_rewardTokenAddresses","internalType":"address[]"},{"type":"address","name":"_stakableTokenAddress","internalType":"address"},{"type":"uint256[]","name":"_rewardAmounts","internalType":"uint256[]"},{"type":"uint64","name":"_startingTimestamp","internalType":"uint64"},{"type":"uint64","name":"_endingTimestamp","internalType":"uint64"},{"type":"bool","name":"_locked","internalType":"bool"},{"type":"uint256","name":"_stakingCap","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"initialized","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"lastConsolidationTimestamp","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"locked","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverUnassignedRewards","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"recoverableUnassignedReward","inputs":[{"type":"address","name":"_rewardToken","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardAmount","inputs":[{"type":"address","name":"_rewardToken","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"perStakedToken","internalType":"uint256"},{"type":"uint256","name":"recoverableSeconds","internalType":"uint256"},{"type":"uint256","name":"claimed","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"secondsDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakableToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"stakedTokensOf","inputs":[{"type":"address","name":"_staker","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"stake","internalType":"uint256"}],"name":"stakers","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"stakingCap","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"startingTimestamp","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalStakedTokensAmount","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"_newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]}]

  SwaprStakingAddresses = [
    {
    "id": "0x060b50b5686f09ed87a1e42eebbd14d289530459"
    },    {
    "id": "0x12cce3dde34b4c2e86136ad35e9d8a5ae32b8a3a"
    },    {
    "id": "0x20f94f9deee309175fd2fc4eb6b641929e004c0e"
    },    {
    "id": "0x353cf37178101ffb7a1dfb835bf8a605c76ca2f2"
    },    {
    "id": "0x426025387dc8409d17e5edd4b9d0dc48dc16dd5a"
    },    {
    "id": "0x55c2a8b2870548507e9a5089487684d5d5ac248e"
    },    {
    "id": "0x795af0b98d1e87f5042ee2a1d4ff7ccbdfe6703b"
    },    {
    "id": "0x7e8cfc46a41dbfd3cc8956ecff74d14e8fe80218"
    },    {
    "id": "0x8e8c7c029527731075ae404daf49518d1064e552"
    },    {
    "id": "0x98236e9faccca1740f22a46187b3e062f88d3720"
    },    {
    "id": "0x9edacc52a9bb7e32ddd12308b817d8e65621bfab"
    },    {
    "id": "0xae16c58658a38660d606048ee9f8f7c341265054"
    },    {
    "id": "0xbc217036a149ca04e583f6e301749b8e9164a2f9"
    },    {
    "id": "0xbde739025ee81371891e9fd994a2a36e20f19c53"
    },    {
    "id": "0xc0ef25b17ac4012c2961f6c5e16919b994b2d982"
    },    {
    "id": "0xc4fbfb24983f5ee8314e9f01b0c4b6093e6978aa"
    },    {
    "id": "0xcfb3c713dd07d2464d538fde811aed32ec1494ee"
    },    {
    "id": "0xfdd43efb428f07f2c9ee7f0a3d05cc5026016950"
    }
  ]
  async function main() {
    const App = await init_ethers();
  
    const tokens = {};
    const prices = await getXdaiPrices();
  
    const pools = SwaprStakingAddresses.map(a => { return {
      address: a.id,
      abi: SWAPR_ABI,
      stakeTokenFunction: "stakableToken",
      rewardTokensFunction: "getRewardTokens"
    }})
  
    await loadSwaprSynthetixPoolInfo(App, tokens, prices, pools[0].abi, pools[0].address,
      pools[0].rewardTokensFunction, pools[0].stakeTokenFunction)
  
    let p = await loadMultipleSwaprSynthetixPools(App, tokens, prices, pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    }
  
    hideLoading();
  }

  async function loadMultipleSwaprSynthetixPools(App, tokens, prices, pools) {
    let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
    const infos = await Promise.all(pools.map(p => 
        loadSwaprSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokensFunction, p.stakeTokenFunction)));
    for (const i of infos) {
      let p = await printSwaprSynthetixPool(App, i, "xdai");
      totalStaked += p.staked_tvl || 0;
      totalUserStaked += p.userStaked || 0;
      if (p.userStaked > 0) {
        individualAPRs.push(p.userStaked * p.apr / 100);
      }
    }
    let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
    return { staked_tvl : totalStaked, totalUserStaked, totalApr };
  }

  async function loadSwaprSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    rewardTokensFunction, stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
      const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
      const rewardTokenAddresses = await STAKING_POOL.callStatic[rewardTokensFunction]();
  
      let stakeToken = await getXdaiToken(App, stakeTokenAddress, stakingAddress);
  
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
          tokens[address] = await getXdaiToken(App, address, stakingAddress);
      }
      for(const rewardTokenAddress of rewardTokenAddresses){
        if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getXdaiToken(App, rewardTokenAddress, stakingAddress);
        }
      }
      let rewardTokens = [];
      for(const rewardTokenAddress of rewardTokenAddresses){
        const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
        rewardTokens.push(rewardToken);
      }
  
      let rewardTokenTickers = [];
      for(const rewardToken of rewardTokens){
        const rewardTokenTicker = rewardToken.symbol;
        rewardTokenTickers.push(rewardTokenTicker);
      }
  
      const poolPrices = getPoolPrices(tokens, prices, stakeToken, "xdai");

      if (!poolPrices) 
      {
        console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
        return null;
      }
  
      const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
      const stakeTokenPrice =
          prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
      let rewardTokenPrices = [];
      for(const rewardTokenAddress of rewardTokenAddresses){
        const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
        rewardTokenPrices.push(rewardTokenPrice);
      }
  
      const periodFinish = await STAKING_POOL.endingTimestamp();
      const secondsDuration = await STAKING_POOL.secondsDuration();
      let weeklyRewards = [];
      for(const rewardTokenAddress of rewardTokenAddresses){
        const rewardAmount = await STAKING_POOL.rewardAmount(rewardTokenAddress);
        const rewardRate = rewardAmount / secondsDuration;
        const weeklyReward = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;
        weeklyRewards.push(weeklyReward)
      }
  
      let usdCoinsPerWeek = [];
      for(let i = 0; i < weeklyRewards.length; i++){
        const usdPerWeek = weeklyRewards[i] * rewardTokenPrices[i];
        usdCoinsPerWeek.push(usdPerWeek);
      }
  
      const staked_tvl = poolPrices.staked_tvl;
  
      const userStaked = await STAKING_POOL.stakedTokensOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;
  
      const userUnstaked = stakeToken.unstaked;
  
      let earnings = [];
      let earnedRewards = await STAKING_POOL.earnedRewardsOf(App.YOUR_ADDRESS) /// 10 ** rewardToken.decimals;
      for(let i = 0; i < earnedRewards.length; i++){
        const earned = earnedRewards[i] / 10 ** rewardTokens[i].decimals;
        earnings.push(earned);
      }
  
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
        earnings
      }
}

async function printSwaprSynthetixPool(App, info, chain="eth", customURLs) {
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
  _print(`<a target="_blank" href="https://blockscout.com/xdai/mainnet/address/${info.stakingAddress}/contracts">Explorer</a>`);
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  }
  else {
    _print("Please use the official website to stake ETH.");
  }
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  for(let i = 0; i < info.earnings.length; i++){
    _print_link(`Claim ${info.earnings[i].toFixed(6)} ${info.rewardTokenTickers[i]} ($${formatMoney(info.earnings[i]*info.rewardTokenPrices[i])})`, claim)
  }
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