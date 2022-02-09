
$(function() {
  consoleInit(main)
    });
  
  const SYNAPSE_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_synapse","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IERC20","name":"lpToken","type":"address"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"}],"name":"LogPoolAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"},{"indexed":false,"internalType":"bool","name":"overwrite","type":"bool"}],"name":"LogSetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"synapsePerSecond","type":"uint256"}],"name":"LogSynapsePerSecond","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint64","name":"lastRewardTime","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accSynapsePerShare","type":"uint256"}],"name":"LogUpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"SYNAPSE","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"calls","type":"bytes[]"},{"internalType":"bool","name":"revertOnFail","type":"bool"}],"name":"batch","outputs":[{"internalType":"bool[]","name":"successes","type":"bool[]"},{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingSynapse","outputs":[{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permitToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint128","name":"accSynapsePerShare","type":"uint128"},{"internalType":"uint64","name":"lastRewardTime","type":"uint64"},{"internalType":"uint64","name":"allocPoint","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"pools","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewarder","outputs":[{"internalType":"contract IRewarder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"},{"internalType":"bool","name":"overwrite","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_synapsePerSecond","type":"uint256"}],"name":"setSynapsePerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"synapsePerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"},{"internalType":"bool","name":"direct","type":"bool"},{"internalType":"bool","name":"renounce","type":"bool"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"updatePool","outputs":[{"components":[{"internalType":"uint128","name":"accSynapsePerShare","type":"uint128"},{"internalType":"uint64","name":"lastRewardTime","type":"uint64"},{"internalType":"uint64","name":"allocPoint","type":"uint64"}],"internalType":"struct MiniChefV2.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"int256","name":"rewardDebt","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdrawAndHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
  async function main() {
      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");
  
     const SYNAPSE_CHEF_ADDR = "0xd10eF2A513cEE0Db54E959eF16cAc711470B62cF";
     const SYNAPSE_CHEF = new ethers.Contract(SYNAPSE_CHEF_ADDR, SYNAPSE_CHEF_ABI, App.provider);
  
     const rewardsPerWeek = await SYNAPSE_CHEF.synapsePerSecond() /1e18
        * 604800;

      await loadSynapseChefContract(App, SYNAPSE_CHEF, SYNAPSE_CHEF_ADDR, SYNAPSE_CHEF_ABI,
        "SYNAPSE", "SYNAPSE", null, rewardsPerWeek, "pendingSynapse");
  
      hideLoading();
    }
  
  async function getSynapsePoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
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
    const poolToken = await getArbitrumToken(app, lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address : lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
        withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
    };
  }
  
  async function loadSynapseChefContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    extraPrices, deathPoolIndices, showAll) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 13.5

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
    try {
      return await getSynapsePoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, showAll);
    }
    catch (ex) {
      console.log(`Error loading pool ${x}: ${ex}`);
      return null;
    }
  }));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));
  var prices = await lookUpTokenPrices(tokenAddresses);
  if (extraPrices) {
    for (const [k,v] of Object.entries(extraPrices)) {
      if (v.usd) {
        prices[k] = v
      }
    }
  }
  //prices["0x194ebd173f6cdace046c53eacce9b953f28411d1"] = { usd : 1.22 } //"temporary" solution

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "eth") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);

  _print("Finished reading smart contracts.\n");

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