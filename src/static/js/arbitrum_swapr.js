$(function() {
  consoleInit(main)
  });
  
  const SWAPR_ABI = [{"type":"event","name":"Canceled","inputs":[],"anonymous":false},{"type":"event","name":"Claimed","inputs":[{"type":"address","name":"claimer","internalType":"address","indexed":true},{"type":"uint256[]","name":"amounts","internalType":"uint256[]","indexed":false}],"anonymous":false},{"type":"event","name":"Initialized","inputs":[{"type":"address[]","name":"rewardsTokenAddresses","internalType":"address[]","indexed":false},{"type":"address","name":"stakableTokenAddress","internalType":"address","indexed":false},{"type":"uint256[]","name":"rewardsAmounts","internalType":"uint256[]","indexed":false},{"type":"uint64","name":"startingTimestamp","internalType":"uint64","indexed":false},{"type":"uint64","name":"endingTimestamp","internalType":"uint64","indexed":false},{"type":"bool","name":"locked","internalType":"bool","indexed":false},{"type":"uint256","name":"stakingCap","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"staker","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"withdrawer","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"cancel","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"canceled","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claim","inputs":[{"type":"uint256[]","name":"_amounts","internalType":"uint256[]"},{"type":"address","name":"_recipient","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimAll","inputs":[{"type":"address","name":"_recipient","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"claimableRewards","inputs":[{"type":"address","name":"_account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"earnedRewardsOf","inputs":[{"type":"address","name":"_staker","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"endingTimestamp","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[{"type":"address","name":"_recipient","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getClaimedRewards","inputs":[{"type":"address","name":"_claimer","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address[]","name":"","internalType":"address[]"}],"name":"getRewardTokens","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address[]","name":"_rewardTokenAddresses","internalType":"address[]"},{"type":"address","name":"_stakableTokenAddress","internalType":"address"},{"type":"uint256[]","name":"_rewardAmounts","internalType":"uint256[]"},{"type":"uint64","name":"_startingTimestamp","internalType":"uint64"},{"type":"uint64","name":"_endingTimestamp","internalType":"uint64"},{"type":"bool","name":"_locked","internalType":"bool"},{"type":"uint256","name":"_stakingCap","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"initialized","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"lastConsolidationTimestamp","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"locked","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverUnassignedRewards","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"recoverableUnassignedReward","inputs":[{"type":"address","name":"_rewardToken","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardAmount","inputs":[{"type":"address","name":"_rewardToken","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"perStakedToken","internalType":"uint256"},{"type":"uint256","name":"recoverableSeconds","internalType":"uint256"},{"type":"uint256","name":"claimed","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"secondsDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakableToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"stakedTokensOf","inputs":[{"type":"address","name":"_staker","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"stake","internalType":"uint256"}],"name":"stakers","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"stakingCap","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"startingTimestamp","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalStakedTokensAmount","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"_newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]}]

  SwaprStakingAddresses = [
    {
    "id": "0x126b6a51d04b56f7d8528bf8b26ade0a4b3d9b6a"
    },    {
    "id": "0x2310ae88fcf850e2d22f5432d40bf477674a3fe1"
    },    {
    "id": "0x2327484ec1ca260f9193e79640df94b8c64360fd"
    },    {
    "id": "0x2e6413ec518990baa72dff2ad0e64dfdf28e88c7"
    },    {
    "id": "0x37d38849c555e8afb52fe1e868f28a7ef90b744e"
    },    {
    "id": "0x418a639f01faee054d3a823c227c7dc179c209fa"
    },    {
    "id": "0x437c9e69a1e5061042f66bc5b9250149acb62fe8"
    },    {
    "id": "0x503c0ab69cb0d96c94de7affd2da6cb108ba63df"
    },    {
    "id": "0x556d7648b679cf9123f3f131993a50cc3fe23918"
    },    {
    "id": "0x6867ecd458a435de9ef662603fd607409784e525"
    },    {
    "id": "0x84486b7af63b12126cb8d7db61da5749cdfdd8bb"
    },    {
    "id": "0x8e1739d03c2fee646df8622371032e8523962847"
    },    {
    "id": "0x9e3370c65392a5b08e9758a3162ad03f5ef271b7"
    },    {
    "id": "0xa70d2eda44189b7482155797576d99b11003668f"
    },    {
    "id": "0xac18097fbf6b5919bef16b88848b7c3bf4f92a46"
    },
  ]
  async function main() {
    const App = await init_ethers();
  
    const tokens = {};
    const prices = await getArbitrumPrices();
  
    const pools = SwaprStakingAddresses.map(a => { return {
      address: a.id,
      abi: SWAPR_ABI,
      stakeTokenFunction: "stakableToken",
      rewardTokensFunction: "getRewardTokens"
    }})
  
    await loadSwaprSynthetixPoolInfo(App, tokens, prices, pools[3].abi, pools[3].address,
      pools[3].rewardTokensFunction, pools[3].stakeTokenFunction)
  
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
      let p = await printSwaprSynthetixPool(App, i, "arbitrum");
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
  
      let stakeToken = await getArbitrumToken(App, stakeTokenAddress, stakingAddress);
  
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
          tokens[address] = await getArbitrumToken(App, address, stakingAddress);
      }
      for(const rewardTokenAddress of rewardTokenAddresses){
        if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getArbitrumToken(App, rewardTokenAddress, stakingAddress);
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
  
      const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

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
  _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}">Explorer</a>`);
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