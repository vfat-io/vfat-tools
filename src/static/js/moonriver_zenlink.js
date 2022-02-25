$(function () {
  consoleInit(main)
});

const ZEN_FARM_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldAdmin","type":"address"},{"indexed":true,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAdmin","type":"address"}],"name":"Candidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"address[]","name":"rewards","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"Charged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"address[]","name":"rewards","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"farmingToken","type":"address"}],"name":"PoolAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"address[]","name":"rewards","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"WithdrawRewards","type":"event"},{"inputs":[{"internalType":"address","name":"_farmingToken","type":"address"},{"internalType":"address[]","name":"_rewardTokens","type":"address[]"},{"internalType":"uint256[]","name":"_rewardPerBlock","type":"uint256[]"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_claimableInterval","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminCandidate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"candidateConfirm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"charge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getPeriodsSinceStart","outputs":[{"internalType":"uint256","name":"periods","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getPoolInfo","outputs":[{"internalType":"address","name":"farmingToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address[]","name":"rewardTokens","type":"address[]"},{"internalType":"uint256[]","name":"rewardPerBlock","type":"uint256[]"},{"internalType":"uint256[]","name":"accRewardPerShare","type":"uint256[]"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"claimableInterval","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getRemaingRewards","outputs":[{"internalType":"uint256[]","name":"remainingRewards","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"pending","type":"uint256[]"},{"internalType":"uint256[]","name":"rewardDebt","type":"uint256[]"},{"internalType":"uint256","name":"nextClaimableBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256[]","name":"rewards","type":"uint256[]"},{"internalType":"uint256","name":"nextClaimableBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_farmingToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256[]","name":"_rewardPerBlock","type":"uint256[]"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_candidate","type":"address"}],"name":"setAdminCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_farmingToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"withdrawRewards","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const ZEN_FARM_ADDR = "0xAfaFf19679ab6baF75eD8098227Be189BA47ba0F";
  const tokens = {};
  const prices = await getMoonriverPrices();

  _print(`\nPlease use the official site in order to unstake your funds\n`)

  await loadZenContract(App, tokens, prices, ZEN_FARM_ADDR, ZEN_FARM_ABI, [1]);

  hideLoading();
}

async function getZenPoolInfo(app, chefContract, chefAddress, poolIndex) {
  const blocksPerSeconds = await getAverageBlockTime(app)
  const poolInfo = await chefContract.getPoolInfo(poolIndex);
  const poolToken = await getMoonriverToken(app, poolInfo.farmingToken, chefAddress);
  //poolToken.staked = poolInfo.amount / 10 ** poolToken.decimals;
  const userInfo = await chefContract.getUserInfo(poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  let rewardsPerWeek = [], rewardTokenTickers = [], pendingRewardTokens = [], rewardTokens = []
  const rewardTokenAddresses = poolInfo.rewardTokens;
  for(const rewardTokenAddress of rewardTokenAddresses){
    const rewardToken = await getMoonriverToken(app, rewardTokenAddress, chefAddress)
    const rewardTokenTicker = rewardToken.symbol;
    rewardTokens.push(rewardToken);
    rewardTokenTickers.push(rewardTokenTicker);
  }
  const _pendingRewardTokens = userInfo.pending
  for(const _pendingRewardToken of _pendingRewardTokens){
    const pendingRewardToken = _pendingRewardToken /1e18
    pendingRewardTokens.push(pendingRewardToken);
  }
  const rewardsPerBlock = poolInfo.rewardPerBlock;
  for(let i = 0; i < rewardsPerBlock.length; i++){
    const _rewardsPerWeek = rewardsPerBlock[i] / 10 ** rewardTokens[i].decimals * 604800 / blocksPerSeconds;
    rewardsPerWeek.push(_rewardsPerWeek);
  }
  if (rewardsPerWeek[0] <= 0) {
    return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  return {
      address : poolInfo.farmingToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens,
      depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100,
      rewardsPerWeek : rewardsPerWeek,
      rewardTokenTickers : rewardTokenTickers,
      rewardTokenAddresses : rewardTokenAddresses,
      rewardTokens : rewardTokens
  };
}

async function loadZenContract(App, tokens, prices, chefAddress, chefAbi, deathPoolIndices) {
  const chefContract = new ethers.Contract(chefAddress, chefAbi, App.provider);
  const poolCount = parseInt(await chefContract.poolLength(), 10);

  _print(`<a href='https://moonriver.moonscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)
  _print(`Showing incentivized pools only.\n`);

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getZenPoolInfo(App, chefContract, chefAddress, x)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getMoonriverToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "moonriver") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "moonriver") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printZenPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].rewardsPerWeek, poolInfos[i].rewardTokenTickers, poolInfos[i].rewardTokenAddresses,
        poolInfos[i].pendingRewardTokens, null, "moonriver", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
      aprs.push(apr);
    }
  }
  let totalUserStaked=0, totalStaked=0, averageApr=0;
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
      averageApr += a.userStakedUsd * a.yearlyAPR / 100;
    }
  }
  averageApr = averageApr / totalUserStaked;
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
    _print(`Estimated earnings:`
        + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
        + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
        + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
  }
  return { prices, totalUserStaked, totalStaked, averageApr }
}

function printZenPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       rewardsPerWeek, rewardTokenTickers, rewardTokenAddresses,
                       pendingRewards, fixedDecimals, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  let rewardPrices = []
  for(const rewardTokenAddress of rewardTokenAddresses){
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    rewardPrices.push(rewardPrice);
  }
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printZenAPR(rewardTokenTickers, rewardPrices, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printZenContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewards,
    rewardTokenTickers, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, fixedDecimals, rewardPrices, chain, depositFee, withdrawFee);
  return apr;
}

function printZenAPR(rewardTokenTickers, rewardPrices, poolRewardsPerWeek,
                  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  let usdCoinsPerWeek = []
  for(let i = 0; i < poolRewardsPerWeek.length; i++){
    const usdPerWeek = poolRewardsPerWeek[i] * rewardPrices[i];
    usdCoinsPerWeek.push(usdPerWeek);
  }
  fixedDecimals = fixedDecimals ?? 2;
  let totalDailyAPR = 0, totalWeeklyAPR = 0, totalYearlyAPR = 0;
  for(let i = 0; i < rewardTokenTickers.length; i++){
    _print(`${rewardTokenTickers[i]} Per Week: ${poolRewardsPerWeek[i].toFixed(fixedDecimals)} ($${formatMoney(usdCoinsPerWeek[i])})`);
    var weeklyAPR = usdCoinsPerWeek[i] / staked_tvl * 100;
    var dailyAPR = weeklyAPR / 7;
    var yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    totalDailyAPR+=dailyAPR
    totalWeeklyAPR+=weeklyAPR
    totalYearlyAPR+=yearlyAPR
  }
  _print(`Total APR: Day ${totalDailyAPR.toFixed(2)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  let userYearlyUsds = []
  let totalUserWeeklyRewards = 0, totalUserDailyRewards = 0, totalUserYearlyRewards = 0;
  let totalUserWeeklyRewardsUsd = 0, totalUserDailyRewardsUsd = 0, totalUserYearlyRewardsUsd = 0;
  for(let i = 0; i < poolRewardsPerWeek.length; i++){
    var userWeeklyRewards = userStakedPct * poolRewardsPerWeek[i] / 100;
    var userDailyRewards = userWeeklyRewards / 7;
    var userYearlyRewards = userWeeklyRewards * 52;
    const userYearlyUsd = userYearlyRewards * rewardPrices[i];
    userYearlyUsds.push(userYearlyUsd);
    totalUserWeeklyRewards+=userWeeklyRewards;
    totalUserDailyRewards+=userDailyRewards;
    totalUserYearlyRewards+=userYearlyRewards;
    totalUserWeeklyRewardsUsd+=userWeeklyRewards*rewardPrices[i]
    totalUserDailyRewardsUsd+=userDailyRewards*rewardPrices[i]
    totalUserYearlyRewardsUsd+=userYearlyRewards*rewardPrices[i]
    if (userStaked > 0) {
      _print(`Estimated ${rewardTokenTickers[i]} earnings:`
          + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrices[i])})`
          + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrices[i])})`
          + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrices[i])})`);
    }
  }
  if (userStaked > 0) {
    _print(`Estimated Total Earnings :`
        + ` Day ($${formatMoney(totalUserDailyRewardsUsd)})`
        + ` Week ($${formatMoney(totalUserWeeklyRewardsUsd)})`
        + ` Year ($${formatMoney(totalUserYearlyRewardsUsd)})`);
  }
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
    yearlyAPR : totalYearlyAPR,
    userYearlyUsds : userYearlyUsds
  }
}

function printZenContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardTokens,
    rewardTokenTickers, stakeTokenTicker, unstaked, userStaked, fixedDecimals,
    rewardTokenPrices, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return zenContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return zenContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  const claim = async function() {
    return zenContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  if(depositFee > 0){
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
  }else{
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  }
  if(withdrawFee > 0){
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
  }else{
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  }
  if(pendingRewardTokens[0]){
    _print_link(`Claim ${pendingRewardTokens[0].toFixed(fixedDecimals)} ${rewardTokenTickers[0]} ($${formatMoney(pendingRewardTokens[0]*rewardTokenPrices[0])})`, claim)
  }else{
    _print_link(`Claim 0.00 ${rewardTokenTickers[0]} ($${formatMoney(0.00)})`, claim)
  }
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const zenContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
          CHEF_CONTRACT.stake(poolIndex, stakeTokenAddr, currentTokens, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const zenContract_claim = async function(chefAbi, chefAddress, poolIndex, App,
    pendingRewardsFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    CHEF_CONTRACT.claim(poolIndex, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
  }
}

const zenContract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}