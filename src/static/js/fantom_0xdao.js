$(function() {
consoleInit(main)
  });

const OXD_CHEF_ABI = [{"inputs":[{"internalType":"contract OXD","name":"_oxd","type":"address"},{"internalType":"uint256","name":"_oxdPerSecond","type":"uint256"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_endTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"MaxAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oxd","outputs":[{"internalType":"contract OXD","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oxdPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingOXD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accOXDPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const OXDAO_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"rewardsToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_rewardsDistributor","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"addReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardData","outputs":[{"internalType":"address","name":"rewardsDistributor","type":"address"},{"internalType":"uint256","name":"rewardsDuration","type":"uint256"},{"internalType":"uint256","name":"periodFinish","type":"uint256"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"lastUpdateTime","type":"uint256"},{"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_rewardsDistributor","type":"address"}],"name":"setRewardsDistributor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stakeFor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const OXD_CHEF_ADDR = "0xa7821C3e9fC1bF961e280510c471031120716c3d";

   const rewardTokenTicker = "OXD";
   const OXD_CHEF = new ethers.Contract(OXD_CHEF_ADDR, OXD_CHEF_ABI, App.provider);

   const rewardsPerWeek = await OXD_CHEF.oxdPerSecond() /1e18 * 604800;

    const tokens = {};
    const prices = await getFantomPrices();

    prices["0xa48d959AE2E88f1dAA7D5F611E01908106dE7598"] = prices["0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE"] //xBOO
    prices["0xfcef8a994209d6916EB2C86cDD2AFD60Aa6F54b1"] = prices["0xf24bcf4d1e507740041c9cfd2dddb29585adce1e"] //fBEETS
    prices["0x74D1D2A851e339B8cB953716445Be7E8aBdf92F4"] = prices["0xc5e2b037d30a390e62180970b3aa4e91868764cd"] //xTAROT
    prices["0xd9e28749e80D867d5d14217416BFf0e668C10645"] = prices["0x77128dfdd0ac859b33f44050c6fa272f34872b5e"] //xCREDIT
    prices["0xe3D17C7e840ec140a7A51ACA351a482231760824"] = prices["0xe0654c8e6fd4d733349ac7e09f6f23da256bf475"] //xSCREAM

    const pools = StakingContracts.map(c => { return {
      address: c,
      abi: OXDAO_STAKING_ABI,
      stakeTokenFunction: "stakingToken"
    }})

    await loadload0xdaoPrice(App, tokens, prices, "0xcB6eAB779780c7FD6d014ab90d8b10e97A1227E2")

    let p = await loadMultiple0xdaoSynthetixPools(App, tokens, prices, pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
    }

    _print("");

    await loadFantomChefContract(App, tokens, prices, OXD_CHEF, OXD_CHEF_ADDR, OXD_CHEF_ABI, rewardTokenTicker,
      "oxd", null, rewardsPerWeek, "pendingOXD", [1]);

    hideLoading();
  }

async function loadMultiple0xdaoSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadload0xdaoPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printload0xdaoPool(App, i, "fantom");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalApr };
}
  
  async function loadload0xdaoPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
      stakeTokenFunction) {
        const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
        if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
          console.log("Couldn't find stake function ", stakeTokenFunction);
        }
        const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
        const rewardTokensLength = await STAKING_POOL.rewardTokensLength();
  
        let rewardTokenAddresses = []
        for(let i = 0; i < rewardTokensLength; i++){
          const rewardTokenAddress = await STAKING_POOL.rewardTokens(i);
          rewardTokenAddresses.push(rewardTokenAddress);
        }
  
        var stakeToken = await getFantomToken(App, stakeTokenAddress, stakingAddress);
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
  
        var newTokenAddresses = stakeToken.tokens.filter(x =>
          !getParameterCaseInsensitive(tokens,x));
        for (const address of newTokenAddresses) {
            tokens[address] = await getFantomToken(App, address, stakingAddress);
        }
        for(const rewardTokenAddress of rewardTokenAddresses){
          if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
            tokens[rewardTokenAddress] = await getFantomToken(App, rewardTokenAddress, stakingAddress);
          }
        }
        let rewardTokens = [], rewardTokenTickers = [], rewardTokenPrices = [], weeklyRewards = [], usdCoinsPerWeek = [], earnings = [];
        for(const rewardTokenAddress of rewardTokenAddresses){
          const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
          const rewardTokenTicker = rewardToken.symbol;
          const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
          rewardTokens.push(rewardToken);
          rewardTokenTickers.push(rewardTokenTicker);
          rewardTokenPrices.push(rewardTokenPrice);
          const rewardData = await STAKING_POOL.rewardData(rewardTokenAddress);
          const periodFinish = rewardData.periodFinish;
          const rewardRate = rewardData.rewardRate / 10 ** rewardToken.decimals
          const weeklyReward = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate * 604800;
          const usdPerWeek = weeklyReward * rewardTokenPrice;
          weeklyRewards.push(weeklyReward);
          usdCoinsPerWeek.push(usdPerWeek);
          const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS, rewardTokenAddress) / 10 ** rewardToken.decimals;
          earnings.push(earned);
        }
  
        const poolPrices = getPoolPrices(tokens, prices, stakeToken, "fantom");
  
        if (!poolPrices)
        {
          console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
          return null;
        }
  
        const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
        const stakeTokenPrice =
            prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
  
        const staked_tvl = poolPrices.staked_tvl;
  
        const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;
  
        const userUnstaked = stakeToken.unstaked;
  
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

  async function printload0xdaoPool(App, info, chain="fantom", customURLs) {
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
    let claimLink = "";
    for(let i = 0; i < info.earnings.length; i++){
      claimLink += `${info.earnings[i].toFixed(6)} ${info.rewardTokenTickers[i]} ($${formatMoney(info.earnings[i]*info.rewardTokenPrices[i])}) `
    }
    _print_link(`Claim ${claimLink}`, claim)
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

const StakingContracts = [
  "0x7819BFd3008A2F3Cfb6878F3B36eCf6c28A0547b",
  "0x203ee93C1173661cB462C687e81991A457caD549",
  "0x0Aa67783666aaF04db827e2D8B2E3d124c3BD67a",
  "0x69a693329AC7a2c416B18Fed8FE85F276A3DA82D",
  "0xc4eFa3632EeAD5bF28C95859ee80DA9D880D1569",
  "0xE3BE7a4FF1E7Cd586C0DE17CB928716079bc0d16",
  "0x8918a4812cd8E2Fdc856F62d8134cA71c533f6c5",
  "0xA8b093D1B878646dD2b6F957bF4B0b6eee46a4E6",
  "0x44c1C6292Eba47fc73E44aD586DBe7925970c82c",
  "0x1D99f4778fFc63cedE9AC8ADA31dc55CF9c72350",
  "0x4956173F273DaFF728c69B9f94249C5c1F4b0B19",
  "0xb87B7BeDcd27E74fE9DBBC98fcb2bf3a3a10d250",
  "0x3a55bb1f88B3823273a1A17761c167c2274f19b4",
  "0x4C6e554c37c8a15095FA407bd83eE7d0497aaEE5",
  "0x16c03F86fC4127ac8753470C526E0f0E0bE74e6A",
  "0x7FB1b9e1d8923Ef046B469f9de34bBE6Be81Ff43",
  "0x7b44Fec85895B138255e7490c62C323e458386FB",
  "0x2EA26a743F3EcBD65910ae0370c15059f38127DB",
  "0x06e19Eab30C1e0c3fe8C6f8c8BCE401d26eD60B0",
  "0x77831Ced767f0e24Cc69EcFc137ba45305ebC415",
  "0x234F69918F43B30eF2aDF5f743cD729E40e14ecD",
  "0x49D4214877A78ebb3123da5af55eF2B91584D4B1",
  "0xe0A25297fD593877207C918a541158591B7FB6C2",
  "0xd56456859AED63CA9D409871974337fF1dEE460F",
  "0x664bd7c702AD17B3Ed1041B3C187c050468C2CA3",
  "0x803cE1f790371C80050005ba33e87C487c0F62fA",
  "0x9c056D8C85A185c1ef469a3e09f65021a5052C6d",
  "0x51f284DCB9e92F174504E968518d6f737E4908Ce",
  "0x31DaC6591435D411017727c1CDA83355c85aB0cF",
  "0xE28Ad06576546c1d5953AB2871F22CC6C13285Fb",
  "0xB4FC94e6420b6E421A023eb30C46d2DFA3304942",
  "0xf09D4a95ce6eCe4B01d7eD9e585dB3721Ba44052",
  "0x10C0e812b8cEd20956fDA0b80708795F86EaC50E",
  "0x6Bdf089cd34CaCe7c578ed189F945240a3B75e79",
  "0x8a88732ca17dB0EB549f80FA716AF53885960f18",
  "0xe7449Ed23bcFBe857E9c981e94Ab331A5CFEDbEB",
  "0x8ffC1d30aB1318a045C22BEC7536Af1dfaf47E5c",
  "0x8a304728ee52FE1c9D1b962cf48A547d86FC6E60",
  "0x7AB6f7848658363A2d771aE67e5BF31Cf4C55655",
  "0x8f452F6a75cCAb109C43414457c41BD922592971",
  "0x045649c51ec74Ff2f0fc8180b725009E3A2B4011",
  "0x3d1eA1cE6b6BA0552f42e1DaA9FB7e4489b6c897",
  "0xeC7b538606C12Cb42300C464EcCb6f21fA239E76",
  "0x442E494456B5eF80F65521cfb9242919F087BB27",
  "0x5A5b100a0C4E73587b7a38A4397be9c033Ac415A",
  "0xb5166dFf888BA474A4736a43BC5A7414aeF53516",
  "0x52996A81Bf1f515bDFD4EE1D7d309555915e17bD",
  "0x9D364cea01ae01B0eFaAf3691aF49A55Ae86011f",
  "0xc48878da7f4beA415B8b6f93BA7ecF6Afc8D61Bf",
  "0x9a36Cc426DCa1BFC9f3e3F5a349cBC6d983EF625",
  "0xECb80de61dEe37b0D16c29ca010bFFbb5985bB3c",
  "0x306247B9847680DcD29799Cf81f78B9b9e4d782F",
  "0xdbf102137B2E817F671827864bA6E6267B0Da69f",
  "0xB296489115bE44a09fA110F241eaf6e856Fd748c",
  "0x93E8b648243fda63F08A8c49a26b8081B1F98e21",
  "0xe9247FFd4fd55E1Fb14747ECFb278a0420F3e141",
  "0xe42FBEB1E0A11B5ABA34Fc64A2Ff6152646C31fB",
  "0xFa4CFC9A347A097D43A59F592B84C42FE2Bdf9A3",
  "0xf1Da24d3979a94E8BC0851DE4f8b508B808fF894",
  "0xdB3723A524aBf8eb00f6727304aC91F2981991d4",
  "0x76b255063d793073363Ced4c511814D30A61815D",
  "0x2F58d399357b59b1fd5C3EA2b28491be1443BD91",
  "0xC4987F5bcAd350B81B471D61Cc64bc78bCFa4757",
  "0x4D229388D7775c2ACAd6E1205A267B0A412c711b",
  "0x3a53c1C35141c5bf6C181bAbeaD1282A9B20178e",
  "0x77831Ced767f0e24Cc69EcFc137ba45305ebC415",
  "0x9658d3a38b997f7a540591b312DF03Ae751D9E86",
  "0x83608774944320A94e2013F593D33d8e8CB3CD73",
  "0x44A60D53dc8A594e04CEceF05c83F2897e5a3513",
  "0x094d8F7F6715E40899dE5aa8410E0eb6798C55d8",
  "0xda490eF04Ecc1B5b2b419a98E201c4faeF2e0085",
  "0x9E0fD855988A6aacA17b83383A3d95f10b0Ef25e",
  "0x645d6073be8B14337e3ddCef08059775237480DD",
  "0x7AeF9d0Fa7cBD11a8A78AC004881ed0B14732A14",
  "0x010b264f029707878f69115735420dcE97bb68bE",
  "0xda1134388DF61d5512663132C3EC6575dB696620",
  "0x99ce3367918d73409152F44FC04CE0C885B45185",
  "0x896bB3412eaF2a258b29B0963909878A945F9A64",
  "0x1A2EFebD8d56Bd5FD734F5f172c515be07e747F0",
  "0xe95b428735861e11C63747Dd8383400703fed296",
  "0xD0f1a936303C9997A9bc2C0bBc78A2D4e76Bc5db",
  "0x1266AB9dE476e578AB178B04d026d088a12C4375",
  "0xaDf51699539A3f37a7fcd213a4fBB1817D3D2A13",
  "0x03dC3e08508795C59FE6A77FdAa3903BD4e748bD",
  "0xD362FfD8c18ab6569a24b8A1Bd111A7B6789190d",
  "0x2e21D83FF3e59468c5FED4d90cD4a03Eca07Ba1D",
  "0x4Eb299D8EF2D3F08a797Ae97aA8Af41A2c5274A2",
  "0x2799e089550979D5E268559bEbca3990dCbeD18b",
  "0x63378ED6d07091EC18bB80b450241A09851cc559",
  "0xA4Ab1391b84A3D46c50d560D7315c57Ce6ad83f8",
  "0x3f6696B06F9479C9e538351F260e0dee109F4490",
  "0x6Ff7FbC62D2F0Cbb8ee597f8bA3fA23ddfCE3900",
  "0xeb8F4A0a41BAcF4440906dc2f66C6ab922C31c24",
  "0x3A9D7C4C663d5Bb8955e540467103A674A02b614",
  "0xc32dFb36b07754133226C09A42b1c37CB2C0B0Cd",
  "0x54C9Eb772B0a2f6C61b88894d8DBEfA32D6d45a0",
  "0xa02107186a7975462be9929f7a14604901687495",
  "0x31B7f0b29d81C4923B94C61A4195F6adb4556280",
  "0xF8b805e28f07f46d1f5bc6933fA058a200253548",
  "0x359953D28104917cCED338ca2603dD1f08e05F7B",
  "0x8f868B7837004e8c4CFfDFa9330594E7C02113b6",
  "0x9d07d172E902a75a76019d21d255ED3bF79f6C62",
  "0x028a71ED166157E89Fb2c2A186703938c2189ae4",
  "0x19241A4b9106b6f29aD376f479A0EB6Dc24cc731",
  "0xEb2609e9d8278DdBA08A2Aafe1c8fA122f27FE6C",
  "0x08b5C9f304cd98044117D7022a3b814b14436a09",
  "0x78E9504FEa153b3cc2AA2F9fC2a3DFF0aA61aaC2",
  "0x4345d7DbEdfb13D14aFc534eEDd2e879c61e5af5",
  "0x3be8218528f3A35689D3a0E9653bAB6e7cfE4115",
  "0x52414f1bE2dA2BA0f8919D9F49633D48574bCa3B",
  "0x1E4E6039703a3b780d1bA1Bc6E1d99afd04593Ea",
  "0xFC5f40Bf9C07CbAbeE6F8A6e2dFA40509f689A94",
  "0x9111dC84bA1b387eB5C5A3302259d6a3F44cd07B",
  "0x62FA399210d647216028f7625cfaF9aB7619a04d",
  "0x7e85cB8aD12FF9116544Ad546e312aaB38db85d8",
  "0xCF8e24a412c1c25526c5D2a8d4b350d91fE018c7",
  "0x38B7501bCbb28591B220e4e17DD5138f7150690E",
  "0x6030C1A2B1f16e439D90fd554D3f923b0e05d78D",
  "0xD6BE317E34A2BF10e16Fa029A845Fc5BeE76d66f",
  "0xeE802F3d1F99c5e1aDD9Bdb64Ad1Fa1A07d16156",
  "0x4ce6f0174602aCD45A6E7B2B242eFACF7A2c15cF",
  "0x413e8bCb492474F66a816a4f5fB6413A3EF18c56",
  "0x94ffFD83cac67BfADF46b32aD2a7f4fd4Bd42Ff6",
  "0xD177267Aa0c09eA31A6dA53911d191fa05DE984f",
  "0xdaaD610A5145B8AF82b38A5e3035463BcbfF0237",
  "0x260c3FD3B89aeBD7584eec07b5ee1cE58ae715E1",
  "0xa26DA4Bf51741e4bc18223bBC247cc461C232a0d",
  "0x9128598dbD9921b9886f82EbF5B686a0A23cD7e4",
  "0x7591FB82421ec9Ae0d4FCe140373Ba15752b5892",
  "0x77AbfD435E9E34eC42C08B10D9fC42393B3D20FB",
  "0x0D25515f8FCE369abb265a53D0E6F1B810576991",
  "0x833955cE0bf63A1C688BeefD84224250D3ba9960",
  "0xAb7238ED8B64aDeFfe719d1FA3B8F179852e092e",
  "0xDaAb1398d3bD906cA48B4c43d43093174153c75F",
  "0xE5CAf98f41D5123AC8906b01a83531c8c6227509",
  "0xfD6290872506f861819a839fC0221309ed265884",
  "0xCA9956d73a98Df2D1654DDAcC556cE2e70E3b63b",
  "0xCc2b62A35D0ACa681aFbB3394FF0E41f1A92f867",
  "0xd7c6Ff04C2De9Bd91A89A7C913474a69674cDA60",
  "0x5177532D59271c2B3630f8ECaAc3C5A692ef4638",
  "0x46327fC019D4783429656F2d87742f6373058675",
  "0x794a63ad2A55572D4b47ae04988f6BAA805FF982",
  "0x64767527b8dcAD27739ae1c7Ee863379C1ceafe5",
  "0xfCB3Ea7Fdc7819c4853e9A1CafA3e7393012F052",
  "0x6b854eEd02eb5A2dfC6bea6F63738107af5d2214",
  "0x2aC69ac6CAdB024608E36D5C3d5Dc32ec72Cab76",
  "0x6E5F9f2bF74d5438803fA753547cfaB764a4ec98",
  "0xBe3aF0eEdE19921A6f385f2d8eF0959646060125",
  "0xd382759F9b6e87a89383a84A6667f5B5d7203238",
  "0x531680F63276fbA79D8361aB8E5D18042dE4818c",
  "0xD6e666EC745990Ec678342936446265198D5DF62",
  "0x6796a1D3d39eD528DCDcADB7edd21E2d91DFd745",
  "0x8362ceCE7d6C4fDCb2c4080883755478ca5C255A"
]

async function loadload0xdaoPrice(App, tokens, prices, stakeTokenAddress) {
    var stakeToken = await getFantomToken(App, stakeTokenAddress, App.YOUR_ADDRESS);
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getFantomToken(App, address, App.YOUR_ADDRESS);
    }
    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "fantom");
    const stakeTokenTicker = poolPrices.stakeTokenTicker;
    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const staked_tvl = poolPrices.staked_tvl;
    return  {
      poolPrices,
      stakeTokenAddress,
      stakeTokenTicker,
      stakeTokenPrice,
      staked_tvl,
    }
}