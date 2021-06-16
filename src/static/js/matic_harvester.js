$(function () {
consoleInit(main)
});
    
const CROP_CHEF_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_crop","internalType":"contract Crop"},{"type":"address","name":"_treasury","internalType":"address"},{"type":"uint256","name":"_cropXBlock","internalType":"uint256"},{"type":"uint256","name":"_startBlock","internalType":"uint256"},{"type":"address","name":"_router","internalType":"contract IUniswapV2Router02"},{"type":"address","name":"_pairDenomination","internalType":"contract IERC20"}]},{"type":"error","name":"BiggerSeedRequired","inputs":[{"type":"uint256","name":"seed","internalType":"uint256"}]},{"type":"error","name":"DuplicateFarm","inputs":[{"type":"address","name":"token","internalType":"address"}]},{"type":"error","name":"InvalidFarmFees","inputs":[{"type":"uint16","name":"sowFee","internalType":"uint16"},{"type":"uint256","name":"reapFee","internalType":"uint256"}]},{"type":"error","name":"Timelocked","inputs":[{"type":"uint8","name":"_lock","internalType":"enum Harvester.Lock"}]},{"type":"event","name":"CropGrowthAltered","inputs":[{"type":"uint256","name":"prevCropXBlock","internalType":"uint256","indexed":false},{"type":"uint256","name":"cropXBlock","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"DDTSprayed","inputs":[{"type":"address","name":"farmer","internalType":"address","indexed":true},{"type":"uint256","name":"fid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FarmAdded","inputs":[{"type":"address","name":"token","internalType":"address","indexed":true},{"type":"uint256","name":"allocPoints","internalType":"uint256","indexed":false},{"type":"uint16","name":"sowFee","internalType":"uint16","indexed":false},{"type":"uint16","name":"reapFee","internalType":"uint16","indexed":false}],"anonymous":false},{"type":"event","name":"FarmUpdated","inputs":[{"type":"address","name":"token","internalType":"address","indexed":true},{"type":"uint256","name":"allocPoints","internalType":"uint256","indexed":false},{"type":"uint16","name":"sowFee","internalType":"uint16","indexed":false},{"type":"uint16","name":"reapFee","internalType":"uint16","indexed":false}],"anonymous":false},{"type":"event","name":"FeeRotationChanged","inputs":[{"type":"uint256","name":"fid","internalType":"uint256","indexed":false},{"type":"bool","name":"rotation","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Reap","inputs":[{"type":"address","name":"farmer","internalType":"address","indexed":true},{"type":"uint256","name":"fid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Sow","inputs":[{"type":"address","name":"farmer","internalType":"address","indexed":true},{"type":"uint256","name":"fid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TimeUnlocked","inputs":[{"type":"uint8","name":"lock","internalType":"enum Harvester.Lock","indexed":false},{"type":"uint256","name":"when","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"DDT","inputs":[{"type":"uint256","name":"_fid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IUniswapV2Pair"}],"name":"UNI_V2_CROP_PAIR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IUniswapV2Router02"}],"name":"UNI_V2_ROUTER_LIKE","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addFarm","inputs":[{"type":"address","name":"_lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"_allocPoints","internalType":"uint256"},{"type":"uint16","name":"_sowFee","internalType":"uint16"},{"type":"uint16","name":"_reapFee","internalType":"uint16"},{"type":"bool","name":"_feeRotation","internalType":"bool"},{"type":"bool","name":"_sync","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allPendingCrops","inputs":[{"type":"address","name":"_farmer","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"alterCropGrowth","inputs":[{"type":"uint256","name":"_cropXBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract Crop"}],"name":"crop","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"cropXBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"farmId","inputs":[{"type":"address","name":"","internalType":"contract IERC20"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"},{"type":"uint256","name":"lastSeed","internalType":"uint256"}],"name":"farmers","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoints","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"accCropXShare","internalType":"uint256"},{"type":"uint16","name":"sowFee","internalType":"uint16"},{"type":"uint16","name":"reapFee","internalType":"uint16"}],"name":"farms","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"farmsCount","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"feeRotation","inputs":[{"type":"address","name":"","internalType":"contract IERC20"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getBlockMultiplier","inputs":[{"type":"uint256","name":"_fromBlock","internalType":"uint256"},{"type":"uint256","name":"_toBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isFarm","inputs":[{"type":"address","name":"","internalType":"contract IERC20"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"locks","inputs":[{"type":"uint8","name":"","internalType":"enum Harvester.Lock"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massSyncFarm","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingCrops","inputs":[{"type":"uint256","name":"_fid","internalType":"uint256"},{"type":"address","name":"_farmer","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reap","inputs":[{"type":"uint256","name":"_fid","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setFarm","inputs":[{"type":"uint256","name":"_fid","internalType":"uint256"},{"type":"uint256","name":"_allocPoints","internalType":"uint256"},{"type":"uint16","name":"_sowFee","internalType":"uint16"},{"type":"uint16","name":"_reapFee","internalType":"uint16"},{"type":"bool","name":"_sync","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setFeeRotation","inputs":[{"type":"uint256","name":"_fid","internalType":"uint256"},{"type":"bool","name":"_feeRotation","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"sow","inputs":[{"type":"uint256","name":"_fid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"treasury","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unlock","inputs":[{"type":"uint8","name":"_lock","internalType":"enum Harvester.Lock"}]}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const CROP_CHEF_ADDR = "0xC8da18EE7Bbd40FaC6803EAeDDb77d05580f769C";
    const rewardTokenTicker = "CROP";
    const CROP_CHEF = new ethers.Contract(CROP_CHEF_ADDR, CROP_CHEF_ABI, App.provider);

    const startBlock = await CROP_CHEF.startBlock();
    const currentBlock = await App.provider.getBlockNumber();

    let rewardsPerWeek = 0
    if (currentBlock < startBlock) {
        _print(`Rewards start at block ${startBlock}\n`);
    } else {
        rewardsPerWeek = await CROP_CHEF.cropXBlock() / 1e18 *
            604800 / 2.1;
    }

    const tokens = {};
    const prices = await getMaticPrices();

    await loadHarvesterChefContract(App, tokens, prices, CROP_CHEF, CROP_CHEF_ADDR, CROP_CHEF_ABI, rewardTokenTicker,
        "crop", null, rewardsPerWeek, "pendingCrops");

    hideLoading();
}

async function loadHarvesterChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.farmsCount(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getMaticToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getHarvesterPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

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


  _print("Finished reading smart contracts.\n");
  
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

async function getHarvesterPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {  
    const poolInfo = await chefContract.farms(poolIndex);
    if (poolInfo.allocPoints == 0) {
      return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoints ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
      };
    }
    const poolToken = await getMaticToken(app, poolInfo.lpToken, chefAddress);
    const userInfo = await chefContract.farmers(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoints ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        depositFee : (poolInfo.sowFee ?? 0) / 100,
        withdrawFee : (poolInfo.reapFee ?? 0) / 100
    };
  }