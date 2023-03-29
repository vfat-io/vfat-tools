
$(function() {
    consoleInit(main)
      });
    
    const SHDW_CHEF_ABI = [{"inputs":[{"name":"_SHDW","internalType":"contract IBEP20","type":"address"},{"name":"_burnAdmin","internalType":"address","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"indexed":true,"name":"pid","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"allocPoint","internalType":"uint256","type":"uint256"},{"indexed":true,"name":"lpToken","internalType":"contract IBEP20","type":"address"},{"indexed":false,"name":"isRegular","internalType":"bool","type":"bool"}],"name":"AddPool","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"user","internalType":"address","type":"address"},{"indexed":true,"name":"pid","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"amount","internalType":"uint256","type":"uint256"}],"name":"Deposit","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"user","internalType":"address","type":"address"},{"indexed":true,"name":"pid","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"amount","internalType":"uint256","type":"uint256"}],"name":"EmergencyWithdraw","anonymous":false,"type":"event"},{"inputs":[{"indexed":false,"name":"burnRate","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"regularFarmRate","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"specialFarmRate","internalType":"uint256","type":"uint256"}],"name":"EventUpdateShdwRate","anonymous":false,"type":"event"},{"inputs":[],"name":"Init","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"previousOwner","internalType":"address","type":"address"},{"indexed":true,"name":"newOwner","internalType":"address","type":"address"}],"name":"OwnershipTransferred","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"pid","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"allocPoint","internalType":"uint256","type":"uint256"}],"name":"SetPool","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"boostContract","internalType":"address","type":"address"}],"name":"UpdateBoostContract","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"user","internalType":"address","type":"address"},{"indexed":false,"name":"pid","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"oldMultiplier","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"newMultiplier","internalType":"uint256","type":"uint256"}],"name":"UpdateBoostMultiplier","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"oldAdmin","internalType":"address","type":"address"},{"indexed":true,"name":"newAdmin","internalType":"address","type":"address"}],"name":"UpdateBurnAdmin","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"pid","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"lastRewardBlock","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"lpSupply","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"accShdwPerShare","internalType":"uint256","type":"uint256"}],"name":"UpdatePool","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"user","internalType":"address","type":"address"},{"indexed":false,"name":"isValid","internalType":"bool","type":"bool"}],"name":"UpdateWhiteList","anonymous":false,"type":"event"},{"inputs":[{"indexed":true,"name":"user","internalType":"address","type":"address"},{"indexed":true,"name":"pid","internalType":"uint256","type":"uint256"},{"indexed":false,"name":"amount","internalType":"uint256","type":"uint256"}],"name":"Withdraw","anonymous":false,"type":"event"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"ACC_SHDW_PRECISION","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"BOOST_PRECISION","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"MASTERCHEF_SHDW_PER_BLOCK","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"MAX_BOOST_PRECISION","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"contract IBEP20","type":"address"}],"inputs":[],"name":"SHDW","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"SHDW_RATE_TOTAL_PRECISION","stateMutability":"view","type":"function"},{"outputs":[],"inputs":[{"name":"_allocPoint","internalType":"uint256","type":"uint256"},{"name":"_lpToken","internalType":"contract IBEP20","type":"address"},{"name":"_isRegular","internalType":"bool","type":"bool"},{"name":"_withUpdate","internalType":"bool","type":"bool"}],"name":"add","stateMutability":"nonpayable","type":"function"},{"outputs":[{"name":"","internalType":"address","type":"address"}],"inputs":[],"name":"boostContract","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"address","type":"address"}],"inputs":[],"name":"burnAdmin","stateMutability":"view","type":"function"},{"outputs":[],"inputs":[{"name":"_withUpdate","internalType":"bool","type":"bool"}],"name":"burnShdw","stateMutability":"nonpayable","type":"function"},{"outputs":[],"inputs":[{"name":"_pid","internalType":"uint256","type":"uint256"},{"name":"_amount","internalType":"uint256","type":"uint256"}],"name":"deposit","stateMutability":"nonpayable","type":"function"},{"outputs":[],"inputs":[{"name":"_pid","internalType":"uint256","type":"uint256"}],"name":"emergencyWithdraw","stateMutability":"nonpayable","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[{"name":"_user","internalType":"address","type":"address"},{"name":"_pid","internalType":"uint256","type":"uint256"}],"name":"getBoostMultiplier","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"lastBurnedBlock","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"contract IBEP20","type":"address"}],"inputs":[{"name":"","internalType":"uint256","type":"uint256"}],"name":"lpToken","stateMutability":"view","type":"function"},{"outputs":[],"inputs":[],"name":"massUpdatePools","stateMutability":"nonpayable","type":"function"},{"outputs":[{"name":"","internalType":"address","type":"address"}],"inputs":[],"name":"owner","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[{"name":"_pid","internalType":"uint256","type":"uint256"},{"name":"_user","internalType":"address","type":"address"}],"name":"pendingShdw","stateMutability":"view","type":"function"},{"outputs":[{"name":"accShdwPerShare","internalType":"uint256","type":"uint256"},{"name":"lastRewardBlock","internalType":"uint256","type":"uint256"},{"name":"allocPoint","internalType":"uint256","type":"uint256"},{"name":"totalBoostedShare","internalType":"uint256","type":"uint256"},{"name":"isRegular","internalType":"bool","type":"bool"}],"inputs":[{"name":"","internalType":"uint256","type":"uint256"}],"name":"poolInfo","stateMutability":"view","type":"function"},{"outputs":[{"name":"pools","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"poolLength","stateMutability":"view","type":"function"},{"outputs":[],"inputs":[],"name":"renounceOwnership","stateMutability":"nonpayable","type":"function"},{"outputs":[],"inputs":[{"name":"_pid","internalType":"uint256","type":"uint256"},{"name":"_allocPoint","internalType":"uint256","type":"uint256"},{"name":"_withUpdate","internalType":"bool","type":"bool"}],"name":"set","stateMutability":"nonpayable","type":"function"},{"outputs":[{"name":"amount","internalType":"uint256","type":"uint256"}],"inputs":[{"name":"_isRegular","internalType":"bool","type":"bool"}],"name":"shdwPerBlock","stateMutability":"view","type":"function"},{"outputs":[{"name":"amount","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"shdwPerBlockToBurn","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"shdwRateToBurn","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"shdwRateToRegularFarm","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"shdwRateToSpecialFarm","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"totalRegularAllocPoint","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"uint256","type":"uint256"}],"inputs":[],"name":"totalSpecialAllocPoint","stateMutability":"view","type":"function"},{"outputs":[],"inputs":[{"name":"newOwner","internalType":"address","type":"address"}],"name":"transferOwnership","stateMutability":"nonpayable","type":"function"},{"outputs":[],"inputs":[{"name":"_newBoostContract","internalType":"address","type":"address"}],"name":"updateBoostContract","stateMutability":"nonpayable","type":"function"},{"outputs":[],"inputs":[{"name":"_user","internalType":"address","type":"address"},{"name":"_pid","internalType":"uint256","type":"uint256"},{"name":"_newMultiplier","internalType":"uint256","type":"uint256"}],"name":"updateBoostMultiplier","stateMutability":"nonpayable","type":"function"},{"outputs":[],"inputs":[{"name":"_newAdmin","internalType":"address","type":"address"}],"name":"updateBurnAdmin","stateMutability":"nonpayable","type":"function"},{"outputs":[{"components":[{"name":"accShdwPerShare","internalType":"uint256","type":"uint256"},{"name":"lastRewardBlock","internalType":"uint256","type":"uint256"},{"name":"allocPoint","internalType":"uint256","type":"uint256"},{"name":"totalBoostedShare","internalType":"uint256","type":"uint256"},{"name":"isRegular","internalType":"bool","type":"bool"}],"name":"pool","internalType":"struct ShadowChefV2.PoolInfo","type":"tuple"}],"inputs":[{"name":"_pid","internalType":"uint256","type":"uint256"}],"name":"updatePool","stateMutability":"nonpayable","type":"function"},{"outputs":[],"inputs":[{"name":"_burnRate","internalType":"uint256","type":"uint256"},{"name":"_regularFarmRate","internalType":"uint256","type":"uint256"},{"name":"_specialFarmRate","internalType":"uint256","type":"uint256"},{"name":"_withUpdate","internalType":"bool","type":"bool"}],"name":"updateShdwRate","stateMutability":"nonpayable","type":"function"},{"outputs":[],"inputs":[{"name":"_user","internalType":"address","type":"address"},{"name":"_isValid","internalType":"bool","type":"bool"}],"name":"updateWhiteList","stateMutability":"nonpayable","type":"function"},{"outputs":[{"name":"amount","internalType":"uint256","type":"uint256"},{"name":"rewardDebt","internalType":"uint256","type":"uint256"},{"name":"boostMultiplier","internalType":"uint256","type":"uint256"}],"inputs":[{"name":"","internalType":"uint256","type":"uint256"},{"name":"","internalType":"address","type":"address"}],"name":"userInfo","stateMutability":"view","type":"function"},{"outputs":[{"name":"","internalType":"bool","type":"bool"}],"inputs":[{"name":"","internalType":"address","type":"address"}],"name":"whiteList","stateMutability":"view","type":"function"},{"outputs":[],"inputs":[{"name":"_pid","internalType":"uint256","type":"uint256"},{"name":"_amount","internalType":"uint256","type":"uint256"}],"name":"withdraw","stateMutability":"nonpayable","type":"function"}]

    async function main() {
        const App = await init_ethers();
    
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts...\n");
    
       const SHDW_CHEF_ADDR = "0xc7887af5f95cdee2b7bbff47554104e8631751df";
    
       const rewardTokenTicker = "SHDW";
       const SHDW_CHEF = new ethers.Contract(SHDW_CHEF_ADDR, SHDW_CHEF_ABI, App.provider);

       const blocksPerSeconds = await getAverageBlockTime(App);
    
       const rewardsPerWeek = await SHDW_CHEF.MASTERCHEF_SHDW_PER_BLOCK() /1e18 * 604800 / blocksPerSeconds;
    
        const tokens = {};
        const prices = await getCorePrices();
    
        await loadShdwChefContract(App, tokens, prices, SHDW_CHEF, SHDW_CHEF_ADDR, SHDW_CHEF_ABI, rewardTokenTicker,
          "SHDW", null, rewardsPerWeek, "pendingShdw", [1,3,6], "core");
    
        hideLoading();
      }
    
async function loadShdwChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices, chain) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  _print(`<a href='https://scan.coredao.org/address/${chefAddress}' target='_blank'>Staking Contract</a>`);

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getGeneralToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getShdwPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getGeneralToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, chain) : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, chain) : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, chain, poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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

async function getShdwPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  const lpToken = await chefContract.lpToken(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return {
      address: lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  let totalAllocPoints = 0;
  const isRegular = poolInfo.isRegular;
  isRegular ? totalAllocPoints = await chefContract.totalRegularAllocPoint() 
    : totalAllocPoints = await chefContract.totalSpecialAllocPoint();
  const poolToken = await getGeneralToken(app, lpToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      totalAllocPoints: totalAllocPoints,
      depositFee : (poolInfo.depositFeeBP ?? poolInfo.depositFee ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}