$(function() {
consoleInit(main)
  });

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const ICE_CHEF_ADDR0 = "0x07aB4886566B7aB782a9d627E8554dB66fb06357";
  const ICE_CHEF_ADDR1 = "0x2ccE22c7A4A9f66ee589464D883e85D91F35DD6b";
  const ICE_CHEF_ADDR2 = "0xbf513aCe2AbDc69D38eE847EFFDaa1901808c31c";
  const ICE_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_ice","type":"address"},{"internalType":"uint256","name":"_icePerSecond","type":"uint256"},{"internalType":"uint32","name":"_startTime","type":"uint32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint16","name":"_allocPoint","type":"uint16"},{"internalType":"contract IERC20","name":"_stakingToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"addSeconds","type":"uint32"}],"name":"changeEndTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endTime","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ice","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"icePerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingIce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"stakingToken","type":"address"},{"internalType":"uint256","name":"stakingTokenTotalAmount","type":"uint256"},{"internalType":"uint256","name":"accIcePerShare","type":"uint256"},{"internalType":"uint32","name":"lastRewardTime","type":"uint32"},{"internalType":"uint16","name":"allocPoint","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint16","name":"_allocPoint","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_icePerSecond","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"setIcePerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"remainingIceTokenReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const ICE_CHEF0 = new ethers.Contract(ICE_CHEF_ADDR0, ICE_CHEF_ABI, App.provider);
  const ICE_CHEF1 = new ethers.Contract(ICE_CHEF_ADDR1, ICE_CHEF_ABI, App.provider);
  const ICE_CHEF2 = new ethers.Contract(ICE_CHEF_ADDR2, ICE_CHEF_ABI, App.provider);
  const rewardsPerWeek0 = await ICE_CHEF0.icePerSecond() / 1e18 * 604800;
  const rewardsPerWeek1 = await ICE_CHEF1.icePerSecond() / 1e18 * 604800;
  const rewardsPerWeek2 = await ICE_CHEF2.icePerSecond() / 1e18 * 604800;

  
  let p2 = await loadPopsicleChefContract(App, ICE_CHEF2, ICE_CHEF_ADDR2, ICE_CHEF_ABI,
    "ICE", "ice", null, rewardsPerWeek1, "pendingIce");
  
  _print_bold("The following farms have been DISCONTINUED. You can unstake at any time.\n")

  let p0 = await loadPopsicleChefContract(App, ICE_CHEF0, ICE_CHEF_ADDR0, ICE_CHEF_ABI,
    "ICE", "ice", null, rewardsPerWeek0, "pendingIce");
  let p1 = await loadPopsicleChefContract(App, ICE_CHEF1, ICE_CHEF_ADDR1, ICE_CHEF_ABI,
    "ICE", "ice", null, rewardsPerWeek1, "pendingIce");

  _print_bold(`Total Staked: $${formatMoney(p0.totalStaked + p1.totalStaked + p2.totalStaked)}`);
  if (p0.totalUserStaked > 0 || p1.totalUserStaked > 0 || p2.totalUserStaked > 0) {
    let totalUserStaked = p0.totalUserStaked + p1.totalUserStaked + p2.totalUserStaked;
    let averageApr = p2.totalUserStaked * p2.averageApr / totalUserStaked * 100;
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr).toFixed(2)}%`)
    _print(`Estimated earnings:`
        + ` Day $${formatMoney(p2.totalUserStaked*p2.averageApr/365)}`
        + ` Week $${formatMoney(p2.totalUserStaked*p2.averageApr/52)}`
        + ` Year $${formatMoney(p2.totalUserStaked*p2.averageApr)}\n`);
  }

  hideLoading();
}

async function loadPopsicleChefContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction, extraPrices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 13.5

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getPopsiclePoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  var prices = await lookUpTokenPrices(tokenAddresses);
  if (extraPrices) {
    for (const [k,v] of Object.entries(extraPrices)) {
      if (v.usd) {
        prices[k] = v
      }
    }
  }

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, chefAddress);
  }));

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);

  let aprs = []
  for (let i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction)
      aprs.push(apr);
    }
  }
  let totalUserStaked=0, totalStaked=0, averageApr=0;
  for (const a of aprs) {
    if (a && !isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a && a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
      averageApr += a.userStakedUsd * a.yearlyAPR / 100;
    }
  }
  averageApr = averageApr / totalUserStaked;
  return { prices, totalUserStaked, totalStaked, averageApr }
}

async function getPopsiclePoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  const poolToken = await getToken(app, poolInfo.stakingToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolInfo.stakingToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      lastRewardBlock : poolInfo.lastRewardBlock
  };
}
