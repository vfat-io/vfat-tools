
$(function() {
consoleInit(main)
});

const ENTERDAO_STAKING_ABI = [{"inputs":[{"internalType":"uint256","name":"_epoch1Start","type":"uint256"},{"internalType":"uint256","name":"_epochDuration","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"uint128","name":"epochId","type":"uint128"},{"indexed":false,"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"ManualEpochInit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"prevBalance","type":"uint256"},{"internalType":"uint128","name":"prevMultiplier","type":"uint128"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint128","name":"currentMultiplier","type":"uint128"}],"name":"computeNewMultiplier","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"currentEpochMultiplier","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"epoch1Start","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"epochDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint128","name":"epochId","type":"uint128"}],"name":"epochIsInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentEpoch","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint128","name":"epochId","type":"uint128"}],"name":"getEpochPoolSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint128","name":"epochId","type":"uint128"}],"name":"getEpochUserBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"},{"internalType":"uint128","name":"epochId","type":"uint128"}],"name":"manualEpochInit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const ENTR_STAKING_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Delegate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"to_newDelegatedPower","type":"uint256"}],"name":"DelegatedPowerDecreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"to_newDelegatedPower","type":"uint256"}],"name":"DelegatedPowerIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Lock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountWithdrew","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountLeft","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"MAX_LOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"balanceAtTs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"delegatedPower","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"delegatedPowerAtTs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"depositAndLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"entrStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"entrStakedAtTs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_entr","type":"address"},{"internalType":"address","name":"_rewards","type":"address"}],"name":"initKernel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"lock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"multiplierAtTs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"multiplierOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"stakeAtTs","outputs":[{"components":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"expiryTimestamp","type":"uint256"},{"internalType":"address","name":"delegatedTo","type":"address"}],"internalType":"struct LibKernelStorage.Stake","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stopDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"userDelegatedTo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"userLockedUntil","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"votingPower","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"votingPowerAtTs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const StakingTokens = [
  "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2", //SUSHI 50,000 per epoch(WEEK)
  "0x618679df9efcd19694bb1daa8d00718eacfa2883", //XYZ 50,000 per epoch(WEEK)
  "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b", //AXS 50,000 per epoch(WEEK)
  "0x3845badade8e6dff049820680d1f14bd3903a5d0", //SAND 50,000 per epoch(WEEK)
  "0x0f5d2fb29fb7d3cfee444a200298f468908cc942", //MANA 50,000 per epoch(WEEK)
  "0x767fe9edc9e0df98e07454847909b5e959d7ca0e", //ILV 50,000 per epoch(WEEK)
  "0x0391d2021f89dc339f60fff84546ea23e337750f", //BOND 50,000 per epoch(WEEK)
  "0x83b546e10917432a722444672504f0d459472171"  //LP-USDC_ENTR 130,000 per epoch()
]

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  let tokens = {};
  let prices = {};


  const ENTERDAO_STAKING_ADDR = "0x3F148612315AaE2514AC630D6FAf0D94B8Cd8E33";
  const ENTR_STAKING_ADDR = "0xD2c83AB0bee469ab5853c1e60bf8B663094EDca5";
  const ENTERDAO_STAKING_CONTRACT = new ethers.Contract(ENTERDAO_STAKING_ADDR, ENTERDAO_STAKING_ABI, App.provider);
  
  let totalStaked  = 0, totalUserStaked = 0, totalAPR = 0, individualAPRs = [];

  const infos = await Promise.all(StakingTokens.map(a => 
    loadEnterdaoPools(App, ENTERDAO_STAKING_ADDR, a, ENTERDAO_STAKING_CONTRACT, tokens, prices)))

  for(const info of infos){
    let p = await printEnterdaoPool(App, info);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }

  totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  
  let p = await loadEntrPool(App, ENTR_STAKING_ADDR, ENTR_STAKING_ABI, tokens, prices);

  _print_bold(`Total staked: $${formatMoney(totalStaked + p.totalStaked)}`);
  if (totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(totalUserStaked)} at an APR of ${(totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

async function loadEnterdaoPools(App, stakingAddress, stakingToken, stakingContract, tokens, prices){
  const rewardTokenAddress = "0xd779eea9936b4e323cddff2529eb6f13d0a4d66e";
  const stakeToken = await getToken(App, stakingToken, stakingAddress);
  let newAddresses = stakeToken.tokens.filter(x => !getParameterCaseInsensitive(prices, x));
  newAddresses.push(rewardTokenAddress);
  await getNewPricesAndTokens(App, tokens, prices, newAddresses, stakingAddress)

  const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  const rewardTokenTicker = rewardToken.symbol;

  const poolPrices = getPoolPrices(tokens, prices, stakeToken);
  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
        prices[stakingToken]?.usd ?? getParameterCaseInsensitive(prices, stakingToken)?.usd;
  const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

  const balance = await stakingContract.balanceOf(App.YOUR_ADDRESS, stakingToken);
  const userStaked = balance / 10 ** stakeToken.decimals;

  let weeklyRewards = 0;
  if(stakingToken == "0x83b546e10917432a722444672504f0d459472171"){
    weeklyRewards = 130000;
  }else{
    weeklyRewards = 50000;
  }

  const usdPerWeek = weeklyRewards * rewardTokenPrice;
  const userUnstaked = stakeToken.unstaked;
  const staked_tvl = poolPrices.staked_tvl;

  return  {
    stakingAddress,
    poolPrices,
    stakingToken,
    rewardTokenAddress,
    stakeTokenTicker,
    rewardTokenTicker,
    stakeTokenPrice,
    rewardTokenPrice,
    weeklyRewards,
    usdPerWeek,
    staked_tvl,
    userStaked,
    userUnstaked
  }
}

async function printEnterdaoPool(App, info, chain="eth", customURLs) {
    info.poolPrices.print_price(chain, 4, customURLs);
    _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
        const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${info.rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
    }
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(info.stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    }
    else {
      _print("Please use the official website to stake ETH.");
    }
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
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

async function loadEntrPool(App, stakingAddress, stakingAbi, tokens, prices){
  const stakingContract = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  const stakeTokenAddress = "0xd779eea9936b4e323cddff2529eb6f13d0a4d66e";
  const stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);
  let newAddresses = stakeToken.tokens.filter(x => !getParameterCaseInsensitive(prices, x));
  await getNewPricesAndTokens(App, tokens, prices, newAddresses, stakingAddress)
  const poolPrices = getPoolPrices(tokens, prices, stakeToken);
  const stakeTokenTicker = poolPrices.stakeTokenTicker;
  const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
  const balance = await stakingContract.balanceOf(App.YOUR_ADDRESS);
  const userStaked = balance / 10 ** stakeToken.decimals;
  const userStakedUsd = userStaked * stakeTokenPrice;
  const userStakedPct = userStakedUsd / poolPrices.staked_tvl * 100;
  
  poolPrices.print_price("eth", 4, null);
  _print(`You are staking ${userStaked.toFixed(6)} ${stakeTokenTicker} ` + `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  _print("");

  return { totalStaked : poolPrices.staked_tvl }
}