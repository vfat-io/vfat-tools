
$(function() {
consoleInit(main)
  });

const BABYDOGE_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenRecovered","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AdminTokenRecovery","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewards","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"earlyWithdrawalFee","type":"uint256"}],"name":"NewEarlyWithdrawalFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"NewFeeReceiver","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minimumLockTime","type":"uint256"}],"name":"NewMinimumLockTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"","type":"bool"}],"name":"NewReflectionOnDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"NewRewardPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"}],"name":"NewStartBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"userStakeLimit","type":"uint256"}],"name":"NewUserStakeLimit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewards","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"PRECISION_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTokenPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"defaultStakePPS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"account","type":"address"}],"name":"depositOnBehalf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earlyWithdrawalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFinalBlockNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_userStakeLimit","type":"uint256"},{"internalType":"uint256","name":"_minimumLockTime","type":"uint256"},{"internalType":"uint256","name":"_earlyWithdrawalFee","type":"uint256"},{"internalType":"address","name":"_feeReceiver","type":"address"},{"internalType":"bool","name":"_keepReflectionOnDeposit","type":"bool"},{"internalType":"address","name":"contractOwner","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"keepReflectionOnDeposit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minimumLockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pricePerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_earlyWithdrawalFee","type":"uint256"}],"name":"setEarlyWithdrawalFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_userStakeLimit","type":"uint256"},{"internalType":"uint256","name":"_earlyWithdrawalFee","type":"uint256"},{"internalType":"uint256","name":"_minimumLockTime","type":"uint256"},{"internalType":"bool","name":"_keepReflectionOnDeposit","type":"bool"},{"internalType":"address","name":"_feeReceiver","type":"address"}],"name":"setFarmValues","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeReceiver","type":"address"}],"name":"setFeeReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minimumLockTime","type":"uint256"}],"name":"setMinimumLockTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_keepReflectionOnDeposit","type":"bool"}],"name":"setReflectionOnDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"setRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"setStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_userStakeLimit","type":"uint256"}],"name":"setUserStakeLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakeToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeTotalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"depositBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"userStakeLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const Pools = [
      "0x12afe3f3bdc7dc171cc1db8dd47917bda3f813a0",
      "0x332404fd2ddf1f1ff35a7eee95375cc1323fb2df",
      "0x3fdbaf9ee8ad48d2bd9204210234afb4ad651fb0",
      "0x4aa6f6778d48f2c30b712a7ce47b073afada806b",
      "0x9ccb41a29811608e633a030f9ad6a2aee34fcd10",
      "0xeAEF88568265D54c5cB1e213BdD35a4028B8FB84",
      "0xF0AB4371857487c41f042BC63ee7c96091A9e99c",
      "0x3fa07befa17245cbf8dbbeecf94813b856d44157",
      "0x4066589193db01c82b3ad3f24894d40a457fb4c8",
      "0x4E6394a669C4B6ac643194Ca257301910E210f06",
      "0xB151d0259049b2F8f93095948EF18110A44e3C19",
      "0xf2745F68dBea07A998CcCF19De255d492417b627"
    ]
    const rewardTokenTicker = "BabyDoge";

    const tokens = {};
    const prices = await getBscPrices();

    await loadBabyDogeContract(App, tokens, prices, Pools, BABYDOGE_CHEF_ABI, rewardTokenTicker, "pendingReward");

    hideLoading();
}

async function getBabyDogePoolInfo(App, chefAbi, chefAddress, poolIndex, pendingRewardsFunction) {
  const stakingContract = new ethers.Contract(chefAddress, chefAbi, App.provider);
  const stakeTokenAddress = await stakingContract.stakeToken();
  const poolToken = await getBscToken(App, stakeTokenAddress, chefAddress);
  const rewardTokenAddress = await stakingContract.rewardToken();
  const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
  const userInfo = await stakingContract.userInfo(App.YOUR_ADDRESS);
  const pendingRewardTokens = await stakingContract.callStatic[pendingRewardsFunction](App.YOUR_ADDRESS);
  const staked = userInfo.shares / 10 ** poolToken.decimals;
  const endedBlock = await stakingContract.getFinalBlockNumber();
  const currentBlock = await App.provider.getBlockNumber();
  const rewardsPerWeek = endedBlock > currentBlock ? await stakingContract.rewardPerBlock() / 10 ** rewardToken.decimals * 604800 / 3 : 0;
  const withdrawFee = await stakingContract.earlyWithdrawalFee() / 100;
  return {
      chefAddress : chefAddress,
      address: stakeTokenAddress,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      rewardsPerWeek : rewardsPerWeek,
      withdrawFee : withdrawFee,
      rewardTokenAddress : rewardTokenAddress
  };
}

async function loadBabyDogeContract(App, tokens, prices, pools, chefAbi, rewardTokenTicker, pendingRewardsFunction, deathPoolIndices) {

  const poolCount = pools.length;

  _print(`Found ${poolCount} pools.\n`)

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBabyDogePoolInfo(App, chefAbi, pools[x], x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBscToken(App, address, App.YOUR_ADDRESS);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printBabyDogePool(App, chefAbi, poolInfos[i].chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].rewardsPerWeek, rewardTokenTicker, poolInfos[i].rewardTokenAddress,
        pendingRewardsFunction, null, null, "bsc", poolInfos[i].withdrawFee)
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

function printBabyDogePool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}