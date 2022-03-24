
$(function() {
consoleInit(main)
});

const GNS_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_tradingStorage","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"address","name":"a","type":"address"}],"name":"AddressUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[5]","name":"","type":"uint256[5]"}],"name":"BoostsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"a","type":"address"},{"indexed":false,"internalType":"bool","name":"allowed","type":"bool"}],"name":"ContractAllowed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"NumberUpdated","type":"event"},{"inputs":[],"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accQuickPerLp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTokensPerLp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"c","type":"address"}],"name":"addAllowedContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowedContracts","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"boostsP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"govFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"increaseAccTokensPerLp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lp","outputs":[{"internalType":"contract LpInterfaceV5","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxNftsStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nfts","outputs":[{"internalType":"contract NftInterfaceV5[5]","name":"","type":"address[5]"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"pendingRewardQuick","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingRewardToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"quick","outputs":[{"internalType":"contract TokenInterfaceV5","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"quickStakingContract","outputs":[{"internalType":"contract QuickStakingContractInterfaceV5","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"referralP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"c","type":"address"}],"name":"removeAllowedContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reservesLp","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsQuick","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bronze","type":"uint256"},{"internalType":"uint256","name":"_silver","type":"uint256"},{"internalType":"uint256","name":"_gold","type":"uint256"},{"internalType":"uint256","name":"_platinum","type":"uint256"},{"internalType":"uint256","name":"_diamond","type":"uint256"}],"name":"setBoostsP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gov","type":"address"}],"name":"setGovFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract LpInterfaceV5","name":"_lp","type":"address"}],"name":"setLp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxNftsStaked","type":"uint256"}],"name":"setMaxNftsStaked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract QuickStakingContractInterfaceV5","name":"_quickStaking","type":"address"}],"name":"setQuickStakingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_referralP","type":"uint256"}],"name":"setReferralP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract TokenInterfaceV5","name":"_token","type":"address"}],"name":"setToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"referral","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftType","type":"uint256"},{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"stakeNft","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract TokenInterfaceV5","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tvl","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tvlWithBoosts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftIndex","type":"uint256"}],"name":"unstakeNft","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userNfts","outputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"nftType","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"provided","type":"uint256"},{"internalType":"uint256","name":"debtToken","type":"uint256"},{"internalType":"uint256","name":"debtQuick","type":"uint256"},{"internalType":"uint256","name":"stakedNftsCount","type":"uint256"},{"internalType":"uint256","name":"totalBoost","type":"uint256"},{"internalType":"address","name":"referral","type":"address"},{"internalType":"uint256","name":"referralRewardsToken","type":"uint256"}],"stateMutability":"view","type":"function"}]

const Addresses = [
  "0x151757c2e830c467b28fe6c09c3174b6c76aa0c5"
]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMaticPrices();

  const pools = Addresses.map(a => { return {
    address: a,
    abi: GNS_STAKING_ABI,
    stakeTokenFunction: "lp",
    rewardTokenFunction1: "token",
    rewardTokenFunction2: "quick"
  }})

  let p = await loadMultipleGnsSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

async function loadMultipleGnsSynthetixPools(App, tokens, prices, pools, customURLs) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadGnsSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction1, p.rewardTokenFunction2, p.stakeTokenFunction)));
  for (const i of infos.filter(i => i?.poolPrices)) {
    let p = await printGnsPool(App, i, "matic", customURLs);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadGnsSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction1, rewardTokenFunction2, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
    let rewardTokenAddresses = [], rewardTokens = [], rewardTokenTickers = [], rewardTokenPrices = [], weeklyRewards = [], usdCoinsPerWeek = [];
    const rewardTokenAddress1 = await STAKING_POOL.callStatic[rewardTokenFunction1]();
    const rewardTokenAddress2 = await STAKING_POOL.callStatic[rewardTokenFunction2]();
    rewardTokenAddresses.push(rewardTokenAddress1);
    rewardTokenAddresses.push(rewardTokenAddress2);

    const lpBalance = await STAKING_POOL.lpBalance();
    var stakeToken = await getMaticToken(App, stakeTokenAddress, stakingAddress);
    stakeToken.staked = lpBalance / 1e18

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getMaticToken(App, address, stakingAddress);
    }
    for(const rewardTokenAddress of rewardTokenAddresses){
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getMaticToken(App, rewardTokenAddress, stakingAddress);
      }
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
      const rewardTokenTicker = rewardToken.symbol;
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      rewardTokens.push(rewardToken);
      rewardTokenTickers.push(rewardTokenTicker);
      rewardTokenPrices.push(rewardTokenPrice);
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

    const rewardRateGns = await STAKING_POOL.rewardsToken();
    const rewardRateQuick = await STAKING_POOL.rewardsQuick();
    const weeklyRewardGns = rewardRateGns / 1e18 * 604800;
    const weeklyRewardQuick = rewardRateQuick / 1e18 * 604800;
    weeklyRewards.push(weeklyRewardGns);
    weeklyRewards.push(weeklyRewardQuick);
    for(let i = 0; i < weeklyRewards.length; i++){
      const usdPerWeek = weeklyRewards[i] * rewardTokenPrices[i];
      usdCoinsPerWeek.push(usdPerWeek);
    }
    const staked_tvl = poolPrices.staked_tvl;
    const userUnstaked = stakeToken.unstaked;
    const userInfo = await STAKING_POOL.users(App.YOUR_ADDRESS)
    const gnsEarnings = userInfo.debtToken / 10 ** rewardTokens[0].decimals;
    const quickEarnings = userInfo.debtQuick / 10 ** rewardTokens[1].decimals;
    const userStaked = userInfo.provided / 10 ** stakeToken.decimals;

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
      gnsEarnings,
      quickEarnings
    }
}

async function printGnsPool(App, info, chain="fantom", customURLs) {
  _print("The TVL of the staked tokens is the sum of the staked tokens plus the boost amount of the users.\n")
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
      return rewardsContract_unstake(info.stakingAddress,info.userStakedWei, App)
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
    _print(`<a target="_blank" href="https://ftmscan.com/address/${info.stakingAddress}#code">Fantom Explorer</a>`);
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    }
    else {
      _print("Please use the official website to stake ETH.");
    }
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    _print_link(`Claim ${info.gnsEarnings.toFixed(6)} ${info.rewardTokenTickers[0]} ($${formatMoney(info.gnsEarnings*info.rewardTokenPrices[0])}) + ${info.quickEarnings.toFixed(6)} ${info.rewardTokenTickers[1]} ($${formatMoney(info.quickEarnings*info.rewardTokenPrices[1])})`, claim)
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