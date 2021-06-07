$(function () {
consoleInit(main)
});
    
const TITAN_CHEF_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_rewardToken","internalType":"contract IERC20"},{"type":"address","name":"_masterChefFund","internalType":"address"},{"type":"uint256","name":"_rewardPerBlock","internalType":"uint256"},{"type":"uint256","name":"_startBlock","internalType":"uint256"}]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BONUS_MULTIPLIER","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IERC20"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"masterChefFund","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingReward","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"accRewardPerShare","internalType":"uint256"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMasterChefFund","inputs":[{"type":"address","name":"_masterChefFund","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardPerBlock","inputs":[{"type":"uint256","name":"_rewardPerBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const TITAN_CHEF_ADDR0 = "0x65430393358e55A658BcdE6FF69AB28cF1CbB77a";
    const TITAN_CHEF_ADDR1 = "0xb444d596273C66Ac269C33c30Fbb245F4ba8A79d";
    const TITAN_CHEF_ADDR2 = "0xa37DD1f62661EB18c338f18Cf797cff8b5102d8e";
    const rewardTokenTicker0 = "TITAN";
    const rewardTokenTicker1 = "USDC";
    const TITAN_CHEF0 = new ethers.Contract(TITAN_CHEF_ADDR0, TITAN_CHEF_ABI, App.provider);
    const TITAN_CHEF1 = new ethers.Contract(TITAN_CHEF_ADDR1, TITAN_CHEF_ABI, App.provider);
    const TITAN_CHEF2 = new ethers.Contract(TITAN_CHEF_ADDR2, TITAN_CHEF_ABI, App.provider);

    const rewardsPerWeek0 = await TITAN_CHEF0.rewardPerBlock() / 1e18 *
        604800 / 2.0;
    const rewardsPerWeek1 = await TITAN_CHEF1.rewardPerBlock() / 1e18 *
        604800 / 2.0;
    const rewardsPerWeek2 = await TITAN_CHEF2.rewardPerBlock() / 1e18 *
        604800 / 2.0;   //usdc reward token

    const tokens = {};
    const prices = await getMaticPrices();

    let p0 = await loadMaticIronContract(App, tokens, prices, TITAN_CHEF0, TITAN_CHEF_ADDR0, TITAN_CHEF_ABI, rewardTokenTicker0,
        "rewardToken", null, rewardsPerWeek0, "pendingReward");
    let p1 = await loadMaticIronContract(App, tokens, prices, TITAN_CHEF1, TITAN_CHEF_ADDR1, TITAN_CHEF_ABI, rewardTokenTicker0,
        "rewardToken", null, rewardsPerWeek1, "pendingReward");
    let p2 = await loadMaticIronContract(App, tokens, prices, TITAN_CHEF2, TITAN_CHEF_ADDR2, TITAN_CHEF_ABI, rewardTokenTicker1,
        "rewardToken", null, rewardsPerWeek2, "pendingReward");

    _print_bold(`Total Staked: $${formatMoney(p0.totalStaked+p1.totalStaked+p2.totalStaked)}`);
    if (p0.totalUserStaked > 0 || p1.totalUserStaked > 0 || p2.totalUserStaked > 0) {
        _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
        _print(`Estimated earnings:`
            + ` Day $${formatMoney(p0.totalUserStaked*p0.averageApr/365 + p1.totalUserStaked*p1.averageApr/365 + p2.totalUserStaked*p2.averageApr/365)}`
            + ` Week $${formatMoney(p0.totalUserStaked*p0.averageApr/52 + p1.totalUserStaked*p1.averageApr/52 + p2.totalUserStaked*p2.averageApr/52)}`
            + ` Year $${formatMoney(p0.totalUserStaked*p0.averageApr + p1.totalUserStaked*p1.averageApr + p2.totalUserStaked*p2.averageApr)}\n`);
    }

    hideLoading();
}

async function loadMaticIronContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`Found ${poolCount} pools.\n`)

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getMaticToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getMaticPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getMaticToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo => 
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);
  
  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, "matic", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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
  return { prices, totalUserStaked, totalStaked, averageApr }
}