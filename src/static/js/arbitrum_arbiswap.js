
$(function() {
consoleInit(main)
  });

const ARBI_CHEF_ABI = [{"inputs":[{"internalType":"contract BEP20","name":"_arbi","type":"address"},{"internalType":"contract BEP20","name":"_whale","type":"address"},{"internalType":"uint256","name":"_arbiPerSec","type":"uint256"},{"internalType":"uint256","name":"_whalePerSec","type":"uint256"},{"internalType":"uint256","name":"_startTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_arbiAllocPoint","type":"uint256"},{"internalType":"uint256","name":"_whaleAllocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"arbi","outputs":[{"internalType":"contract BEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"arbiPerSec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"arbiTotalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingArbi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingWhale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"arbiAllocPoint","type":"uint256"},{"internalType":"uint256","name":"whaleAllocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accArbiPerShare","type":"uint256"},{"internalType":"uint256","name":"accWhalePerShare","type":"uint256"},{"internalType":"uint256","name":"totalDeposit","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_arbiAllocPoint","type":"uint256"},{"internalType":"uint256","name":"_whaleAllocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_arbiPerSec","type":"uint256"}],"name":"updateArbiPerSec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"multiplierNumber","type":"uint256"}],"name":"updateMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_whalePerSec","type":"uint256"}],"name":"updateWhalePerSec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"arbiRewardDebt","type":"uint256"},{"internalType":"uint256","name":"whaleRewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whale","outputs":[{"internalType":"contract BEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whalePerSec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whaleTotalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    _print_bold("----- Scam Project Please Remove Your funds! -----");
    _print("");

   const ARBI_CHEF_ADDR = "0x21e185462FEafCd807330B11A46D1F934D5392B4";
   const rewardArbiTokenTicker = "ARBI";
   const rewardWhaleTokenTicker = "WHALE";
   const ARBI_CHEF = new ethers.Contract(ARBI_CHEF_ADDR, ARBI_CHEF_ABI, App.provider);

   const rewardsArbiPerWeek = await ARBI_CHEF.arbiPerSec() /1e18 * 604800;
   const rewardsWhalePerWeek = await ARBI_CHEF.whalePerSec() /1e18 * 604800;

    const tokens = {};
    const prices = await getArbitrumPrices();

    await loadArbiChefContract(App, tokens, prices, ARBI_CHEF, ARBI_CHEF_ADDR, ARBI_CHEF_ABI, rewardArbiTokenTicker,
      rewardWhaleTokenTicker, "arbi", "whale", rewardsArbiPerWeek, rewardsWhalePerWeek, "pendingArbi", "pendingWhale", [2,7]);

    hideLoading();
  }

async function loadArbiChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardArbiTokenTicker,
  rewardWhaleTokenTicker, rewardArbiTokenFunction, rewardWhaleTokenFunction, rewardsArbiPerWeekFixed, rewardsWhalePerWeekFixed, pendingArbiRewardsFunction,
  pendingWhaleRewardsFunction, deathPoolIndices, claimFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const arbiTotalAllocPoints = await chefContract.arbiTotalAllocPoint();
  const whaleTotalAllocPoints = await chefContract.whaleTotalAllocPoint();

  _print(`<a href='https://arbiscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardArbiTokenAddress = await chefContract.callStatic[rewardArbiTokenFunction]();
  const rewardWhaleTokenAddress = await chefContract.callStatic[rewardWhaleTokenFunction]();

  const rewardArbiToken = await getArbitrumToken(App, rewardArbiTokenAddress, chefAddress);
  const rewardWhaleToken = await getArbitrumToken(App, rewardWhaleTokenAddress, chefAddress);

  const rewardsArbiPerWeek = rewardsArbiPerWeekFixed;
  const rewardsWhalePerWeek = rewardsWhalePerWeekFixed;

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getArbiPoolInfo(App, chefContract, chefAddress, x, pendingArbiRewardsFunction, pendingWhaleRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getArbitrumToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
      .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printArbiChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        arbiTotalAllocPoints, whaleTotalAllocPoints, rewardsArbiPerWeek, rewardsWhalePerWeek, rewardArbiTokenTicker, rewardWhaleTokenTicker, rewardArbiTokenAddress,
        rewardWhaleTokenAddress, pendingArbiRewardsFunction, pendingWhaleRewardsFunction, null, claimFunction, "arbitrum", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
      aprs.push(apr);
    }
  }
  let totalUserStaked = 0, totalStaked = 0;
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
    }
  }
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);

  return { prices, totalUserStaked, totalStaked }
}

function printArbiChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
  arbiTotalAllocPoints, whaleTotalAllocPoints, rewardsArbiPerWeek, rewardsWhalePerWeek, rewardArbiTokenTicker, rewardWhaleTokenTicker, rewardArbiTokenAddress,
  rewardWhaleTokenAddress, pendingArbiRewardsFunction, pendingWhaleRewardsFunction, fixedDecimals, claimFunction, chain = "eth", depositFee = 0, withdrawFee = 0) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);

  var poolRewardsArbiPerWeek = poolInfo.arbiAllocPoints / arbiTotalAllocPoints * rewardsArbiPerWeek;
  if (poolRewardsArbiPerWeek == 0 && rewardsArbiPerWeek != 0) return;

  var poolRewardsWhalePerWeek = poolInfo.whaleAllocPoints / whaleTotalAllocPoints * rewardsWhalePerWeek;
  //if (poolRewardsWhalePerWeek == 0 && rewardsWhalePerWeek != 0) return;

  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardArbiPrice = getParameterCaseInsensitive(prices, rewardArbiTokenAddress)?.usd;
  const rewardWhalePrice = getParameterCaseInsensitive(prices, rewardWhaleTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printArbiAPR(rewardArbiTokenTicker, rewardWhaleTokenTicker, rewardArbiPrice, rewardWhalePrice, poolRewardsArbiPerWeek, poolRewardsWhalePerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printArbiChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingArbiRewardsFunction,
    rewardArbiTokenTicker, rewardWhaleTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardArbiTokens, poolInfo.pendingRewardWhaleTokens, fixedDecimals, claimFunction, rewardArbiPrice, rewardWhalePrice, chain, depositFee, withdrawFee);
  return apr;
}

function printArbiChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
  rewardArbiTokenTicker, rewardWhaleTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardArbiTokens, pendingRewardWhaleTokens, fixedDecimals,
  claimFunction, rewardArbiPrice, rewardWhalePrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const unstake = async function () {
    return arbiswapArbitrumContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  _print_link(`Emergency Withdraw ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print("");
}

const arbiswapArbitrumContract_unstake = async function (chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    CHEF_CONTRACT.emergencyWithdraw(poolIndex, currentStakedAmount)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
      })
  }
}

function printArbiAPR(rewardArbiTokenTicker, rewardWhaleTokenTicker, rewardArbiPrice, rewardWhalePrice, poolRewardsArbiPerWeek,
  poolRewardsWhalePerWeek, stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  var usdArbiPerWeek = poolRewardsArbiPerWeek * rewardArbiPrice;
  var usdWhalePerWeek = poolRewardsWhalePerWeek * rewardWhalePrice;
  fixedDecimals = fixedDecimals ?? 2;
  // _print(`${rewardArbiTokenTicker} Per Week: ${poolRewardsArbiPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdArbiPerWeek)})`);
  // _print(`${rewardWhaleTokenTicker} Per Week: ${poolRewardsWhalePerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdWhalePerWeek)})`);

  // var weeklyArbiAPR = usdArbiPerWeek / staked_tvl * 100;
  // var dailyArbiAPR = weeklyArbiAPR / 7;
  // var yearlyArbiAPR = weeklyArbiAPR * 52;

  // var weeklyWhaleAPR = usdWhalePerWeek / staked_tvl * 100;
  // var dailyWhaleAPR = weeklyWhaleAPR / 7;
  // var yearlyWhaleAPR = weeklyWhaleAPR * 52;

  // _print(`APR ARBI: Day ${dailyArbiAPR.toFixed(2)}% Week ${weeklyArbiAPR.toFixed(2)}% Year ${yearlyArbiAPR.toFixed(2)}%`);
  // _print(`APR WHALE: Day ${dailyWhaleAPR.toFixed(2)}% Week ${weeklyWhaleAPR.toFixed(2)}% Year ${yearlyWhaleAPR.toFixed(2)}%`);

  // const totalDailyAPR = dailyArbiAPR + dailyWhaleAPR;
  // const totalWeeklyAPR = weeklyArbiAPR + weeklyWhaleAPR;
  // const totalYearlyAPR = yearlyArbiAPR + yearlyWhaleAPR;
  // _print(`Total APR: Day ${totalDailyAPR.toFixed(4)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);

  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;

  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);

  // var userArbiWeeklyRewards = userStakedPct * poolRewardsArbiPerWeek / 100;
  // var userArbiDailyRewards = userArbiWeeklyRewards / 7;
  // var userArbiYearlyRewards = userArbiWeeklyRewards * 52;

  // var userWhaleWeeklyRewards = userStakedPct * poolRewardsWhalePerWeek / 100;
  // var userWhaleDailyRewards = userWhaleWeeklyRewards / 7;
  // var userWhaleYearlyRewards = userWhaleWeeklyRewards * 52;

  // if (userStaked > 0) {
  //   _print(`Estimated ${rewardArbiTokenTicker} earnings:`
  //       + ` Day ${userArbiDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userArbiDailyRewards*rewardArbiPrice)} + ${userWhaleDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWhaleDailyRewards*rewardWhalePrice)})`
  //       + ` Week ${userArbiWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userArbiWeeklyRewards*rewardArbiPrice)} + ${userWhaleWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWhaleWeeklyRewards*rewardWhalePrice)})`
  //       + ` Year ${userArbiYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userArbiYearlyRewards*rewardArbiPrice)} + ${userWhaleYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWhaleYearlyRewards*rewardWhalePrice)})`);
  // }
  //  const userYearlyUsd = userArbiYearlyRewards * rewardArbiPrice + userWhaleYearlyRewards * rewardWhalePrice;
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
    // yearlyAPR : totalYearlyAPR,
    // userYearlyUsd : userYearlyUsd
  }
}

async function getArbiPoolInfo(app, chefContract, chefAddress, poolIndex, pendingArbiRewardsFunction, pendingWhaleRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.arbiAllocPoint == 0 && poolInfo.whaleAllocPoint == 0) {
    return {
      address: poolInfo.lpToken,
      arbiAllocPoints: poolInfo.arbiAllocPoint ?? 1,
      whaleAllocPoints: poolInfo.whaleAllocPoint ?? 1,
      poolToken: null,
      userStaked: 0,
      pendingRewardArbiTokens: 0,
    };
  }
  const poolToken = await getArbitrumToken(app, poolInfo.lpToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardArbiTokens = await chefContract.callStatic[pendingArbiRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const pendingRewardWhaleTokens = await chefContract.callStatic[pendingWhaleRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
    address: poolInfo.lpToken,
    arbiAllocPoints: poolInfo.arbiAllocPoint ?? 1,
    whaleAllocPoints: poolInfo.whaleAllocPoint ?? 1,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewardArbiTokens: pendingRewardArbiTokens / 10 ** 18,
    pendingRewardWhaleTokens: pendingRewardWhaleTokens / 10 ** 18,
    depositFee: (poolInfo.depositFeeBP ?? 0) / 100,
    withdrawFee: (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}