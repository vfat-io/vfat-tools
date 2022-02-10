
$(function() {
consoleInit(main)
  });

const WAIFU_CHEF_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_treasuryAddress","internalType":"address"},{"type":"address","name":"_devAddress","internalType":"address"},{"type":"address","name":"_investorAddress","internalType":"address"}]},{"type":"event","name":"Add","inputs":[{"type":"uint256","name":"allocPoint","internalType":"uint256","indexed":false},{"type":"address","name":"lpToken","internalType":"address","indexed":false},{"type":"bool","name":"withUpdate","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Set","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":false},{"type":"uint256","name":"allocPoint","internalType":"uint256","indexed":false},{"type":"bool","name":"withUpdate","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateEmissionRate","inputs":[{"type":"uint256","name":"_waifuPerBlock","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdatePool","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BONUS_MULTIPLIER","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IERC20"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"bonusEndBlock","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devAddress","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"investorAddress","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingWaifu","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"accWaifuPerShare","internalType":"uint256"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"startFarm","inputs":[{"type":"uint256","name":"_startBlock","internalType":"uint256"},{"type":"uint256","name":"_bonusEndBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"treasuryAddress","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateDistributionAddresses","inputs":[{"type":"address","name":"_treasuryAddress","internalType":"address"},{"type":"address","name":"_devAddress","internalType":"address"},{"type":"address","name":"_investorAddress","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateEmissionRate","inputs":[{"type":"uint256","name":"_waifuPerBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract WaifuToken"}],"name":"waifu","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"waifuPerBlock","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]
const WAIFU_LIBRARY_ABI = [{"inputs":[{"internalType":"contract IMasterSimp","name":"_MasterSimp","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"MasterSimp","outputs":[{"internalType":"contract IMasterSimp","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingWaifu","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingWaifuOld","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

async function loadMasterSimpContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction, waifuLibrary,
  deathPoolIndices, claimFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://blockexplorer.boba.network/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getBobaToken(App, rewardTokenAddress, chefAddress);

  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 3

  var poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBobaPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  const pendingWaifus = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
  await waifuLibrary.callStatic[pendingRewardsFunction](x, App.YOUR_ADDRESS)));
  for(var i = 0 ; i < poolInfos.length; i++){
    if(pendingWaifus[i]){
      poolInfos[i].pendingRewardTokens = pendingWaifus[i] / 10 ** 18;
    } else {
      poolInfos[i].pendingRewardTokens = 0;
    }
  }

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBobaToken(App, address, chefAddress);
  }));
  
  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "boba") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "boba") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, claimFunction, "boba", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const WAIFU_CHEF_ADDR = "0x1a41Ff0df89B8331bE144B10f4769b95Ed4068B8";
   const rewardTokenTicker = "WAIFU";
   const WAIFU_CHEF = new ethers.Contract(WAIFU_CHEF_ADDR, WAIFU_CHEF_ABI, App.provider);
   
   const currentBlock = await App.provider.getBlockNumber();

   const multiplier = await WAIFU_CHEF.getMultiplier(currentBlock, currentBlock+1);

   const rewardsPerWeek = await WAIFU_CHEF.waifuPerBlock() / 1e18 * 604800 * multiplier / 4.8;

    const tokens = {};
    const prices = await getBobaPrices();

    const WAIFU_LIBRARY_ADDR = "0x59cfe4794B76aA5B969f1BC57CfBCC09d8381995";
    const WAIFU_LIBRARY = new ethers.Contract(WAIFU_LIBRARY_ADDR, WAIFU_LIBRARY_ABI, App.provider);
    
    await loadMasterSimpContract(App, tokens, prices, WAIFU_CHEF, WAIFU_CHEF_ADDR, WAIFU_CHEF_ABI, rewardTokenTicker,
        "waifu", null, rewardsPerWeek, "pendingWaifu", WAIFU_LIBRARY);
 
    hideLoading();
  }