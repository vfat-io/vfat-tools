
$(function() {
    consoleInit();
    start(main);
  });

const MIDASGOLD_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"executor","type":"address"},{"indexed":false,"internalType":"uint256","name":"at","type":"uint256"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BLOCKS_PER_DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BLOCKS_PER_WEEK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"_lastRewardBlock","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bcash","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bcashPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getRewardBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mdg","type":"address"},{"internalType":"address","name":"_mdo","type":"address"},{"internalType":"address","name":"_bcash","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_lockUntilBlock","type":"uint256"},{"internalType":"address","name":"_mdgLocker","type":"address"},{"internalType":"address","name":"_reserveFund","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockUntilBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mdg","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mdo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mdoPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract ILiquidityMigrator","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextHalvingBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBcash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingMdo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accMdgPerShare","type":"uint256"},{"internalType":"uint256","name":"accMdoPerShare","type":"uint256"},{"internalType":"uint256","name":"accBcashPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"},{"internalType":"bool","name":"isStarted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserveFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reservePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bcashPerBlock","type":"uint256"}],"name":"setBcashPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mdoPerBlock","type":"uint256"}],"name":"setMdoPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ILiquidityMigrator","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_reserveFund","type":"address"}],"name":"setReserveFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"setRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"mdoDebt","type":"uint256"},{"internalType":"uint256","name":"bcashDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const MDG2_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"executor","type":"address"},{"indexed":false,"internalType":"uint256","name":"at","type":"uint256"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BLOCKS_PER_DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BLOCKS_PER_WEEK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"_lastRewardBlock","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getRewardBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"halvingChecked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestAllRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvestAndRestake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_layerId","type":"uint256"},{"internalType":"address","name":"_mdg","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_lockUntilBlock","type":"uint256"},{"internalType":"address","name":"_layeredMdgLocker","type":"address"},{"internalType":"address","name":"_reserveFund","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"layerId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockUntilBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mdg","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mdgPoolId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract ILiquidityMigrator","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextHalvingBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accMdgPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"},{"internalType":"bool","name":"isStarted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserveFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reservePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardHalvingRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_halvingChecked","type":"bool"}],"name":"setHalvingChecked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mdgPoolId","type":"uint256"}],"name":"setMdgPoolId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ILiquidityMigrator","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_reservePercent","type":"uint256"},{"internalType":"uint256","name":"_lockPercent","type":"uint256"},{"internalType":"uint256","name":"_rewardHalvingRate","type":"uint256"}],"name":"setRates","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_reserveFund","type":"address"}],"name":"setReserveFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"setRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_lockUntilBlock","type":"uint256"}],"name":"setStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const MIDASGOLD_CHEF_ADDR = "0x8f0A813D39F019a2A98958eDbf5150d3a06Cd20f";
   const MDG2_CHEF_ADDR = "0x8f0A813D39F019a2A98958eDbf5150d3a06Cd20f";
   const rewardTokenTicker = "MDG2";
   const rewardTokenTickers = ["MDG", "BCASH", "MDO"]
   const rewardTokenFunctions = ["mdg", "bcash", "mdo"]
   const pendingRewardFunctions = ["pendingReward", "pendingBcash", "pendingMdo"]
   const pendingRewardFunction = "pendingReward"
   const MIDASGOLD_CHEF = new ethers.Contract(MIDASGOLD_CHEF_ADDR, MIDASGOLD_CHEF_ABI, App.provider);
   const MDG2_CHEF = new ethers.Contract(MDG2_CHEF_ADDR, MDG2_CHEF_ABI, App.provider);
   
   const rewardsPerWeekMDG2 = await MDG2_CHEF.rewardPerBlock() / 1e18 * 604800 / 3;
   const rewardsPerWeek = [await MIDASGOLD_CHEF.rewardPerBlock() /1e18 * 604800 / 3 ,
                           await MIDASGOLD_CHEF.bcashPerBlock() /1e18 * 604800 / 3,
                           await MIDASGOLD_CHEF.mdoPerBlock() /1e18 * 604800 / 3]

    const tokens = {};
    const prices = await getBscPrices();
    prices["0x3F6ad3c13E3a6bB5655F09A95cA05B6FF4c3DCd6"] = { usd : 1 } //vDOLLAR

    await loadBscMidasgoldContract(App, tokens, prices, MIDASGOLD_CHEF, MIDASGOLD_CHEF_ADDR, MIDASGOLD_CHEF_ABI, rewardTokenTickers,
      rewardTokenFunctions, rewardsPerWeek, pendingRewardFunctions);

    await loadMDG2ChefContract(App, tokens, prices, MDG2_CHEF, MDG2_CHEF_ADDR, MDG2_CHEF_ABI, rewardTokenTicker,
        "mdg", null, rewardsPerWeekMDG2, "pendingReward");

    hideLoading();  
  }

async function loadBscMidasgoldContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTickers,
  rewardTokenFunctions, rewardsPerWeekFixed, pendingRewardFunctions,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = 21;
  const totalAllocPoints = await chefContract.totalAllocPoint();
    
  _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);
  
  let rewardTokenAddresses = [];
  let rewardTokens = [];

  for(rewardTokenFunction of rewardTokenFunctions)
  {
    let tokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    rewardTokenAddresses.push(tokenAddress);
    let rewardToken = await getBscToken(App, tokenAddress, chefAddress);
    rewardTokens.push(rewardToken);
  }

  const rewardsPerWeek = rewardsPerWeekFixed;

  let poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getMidasGoldPoolInfo(App, chefContract, chefAddress, x, pendingRewardFunctions)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBscToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo => 
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);


  _print("Finished reading smart contracts.\n");
    
  for (let i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      printMidasGoldPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTickers, rewardTokenAddresses,
        pendingRewardFunctions, "bsc");
    }
  }
}

async function getMidasGoldPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardFunctions) {  
  const poolInfo = await chefContract.poolInfo(poolIndex);
  const poolToken = await getBscToken(app, poolInfo.lpToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  let pendingRewardTokensArray = await Promise.all(pendingRewardFunctions.map(f => 
    chefContract.callStatic[f](poolIndex, app.YOUR_ADDRESS)));
  let claimableRewards = pendingRewardTokensArray.map(rt => rt / 1e18);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      claimableRewards : claimableRewards
  };
}

function printMidasGoldPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices, 
  totalAllocPoints, rewardsPerWeek, rewardTokenTickers, rewardTokenAddresses,
  pendingRewardFunctions, fixedDecimals, claimFunction, chain="eth") {  
    fixedDecimals = fixedDecimals ?? 2;
    let poolRewardsPerWeek = rewardsPerWeek.map(rpw => poolInfo.allocPoints / totalAllocPoints * rpw);
    if (poolRewardsPerWeek == 0) return;
    const userStaked = poolInfo.userStaked;
    let rewardPrices = rewardTokenAddresses.map(a => getParameterCaseInsensitive(prices, a)?.usd);
    const staked_tvl = poolPrices.staked_tvl;
    poolPrices.print_price();

    printMidasGoldApr(rewardTokenTickers, rewardPrices, poolRewardsPerWeek, poolPrices.stakeTokenTicker, 
      staked_tvl, userStaked, poolPrices.price, fixedDecimals);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);

    printMidasgoldContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardFunctions,
      rewardTokenTickers, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked, 
      poolInfo.userStaked, poolInfo.claimableRewards, fixedDecimals, claimFunction, rewardPrices, chain);
}

function printMidasGoldApr(rewardTokenTickers, rewardPrices, poolRewardsPerWeek, 
  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
  fixedDecimals) {
  fixedDecimals = fixedDecimals ?? 2;
  let totalUsdPerWeek = 0;
  let totalDailyRewards = 0;
  let totalWeeklyRewards = 0;
  let totalYearlyRewards = 0;
  for(let i = 0; i < poolRewardsPerWeek.length; i++){
    let usdPerWeek = poolRewardsPerWeek[i] * rewardPrices[i]
    _print(`${rewardTokenTickers[i]} Per Week: ${poolRewardsPerWeek[i].toFixed(2)} ($${formatMoney(usdPerWeek)})`);
    totalUsdPerWeek += usdPerWeek;
  }
  var weeklyAPR = totalUsdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(2)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  if (userStaked > 0) {
    for(let i = 0; i < rewardTokenTickers.length; i++){
      var userWeeklyRewards = userStakedPct * poolRewardsPerWeek[i] / 100;
      var userDailyRewards = userWeeklyRewards / 7;
      var userYearlyRewards = userWeeklyRewards * 52;
      _print(`Estimated ${rewardTokenTickers[i]} earnings:`
  + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardPrices[i])})`
  + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardPrices[i])})`
  + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardPrices[i])})`);
      totalDailyRewards += userDailyRewards * rewardPrices[i];
      totalWeeklyRewards += userWeeklyRewards * rewardPrices[i];
      totalYearlyRewards += userYearlyRewards * rewardPrices[i];
    }
    _print(`Estimated total earnings:`
    + `Day $${formatMoney(totalDailyRewards)}`
    + `Week $${formatMoney(totalWeeklyRewards)}`
    + `Year $${formatMoney(totalYearlyRewards)}`);
  }
}

function printMidasgoldContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardFunctions,
  rewardTokenTickers, stakeTokenTicker, unstaked, userStaked, claimableRewards, fixedDecimals,
  claimFunction, rewardTokenPrices) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
  return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }      
  const unstake = async function() {
  return midasgoldContract_unstake(chefAbi, chefAddr, poolIndex, App)
  }      
  const claim = async function() {
  return midasgoldContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardFunctions, claimFunction)
  }
  let rewards = "";
  let totalRewardUsd = 0
  for(let i = 0; i < claimableRewards.length; i++){
    const rewardPrice = claimableRewards[i];
    const rewardUsd = rewardTokenPrices[i] * rewardPrice;
    totalRewardUsd += rewardUsd;
    rewards += `${claimableRewards[i].toFixed(4)} ${rewardTokenTickers[i]} ($${formatMoney(rewardUsd)}) `;
  }
  totalToClaim = `- Total $${formatMoney(totalRewardUsd)}`
  _print_link(`Claim ${rewards} ${totalToClaim}`, claim)
  _print_link(`Stake ${unstaked.toFixed(2)} ${stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(2)} ${stakeTokenTicker}`, unstake)
  _print(`Staking or unstaking also claims rewards.`)
  _print(`\n`);
}

const midasgoldContract_unstake = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount > 0) {
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

const midasgoldContract_claim = async function(chefAbi, chefAddress, poolIndex, App, 
  pendingRewardsFunctions) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  let earnedTokenAmounts = await Promise.all(pendingRewardsFunctions.map(pf => 
    CHEF_CONTRACT.callStatic[pf](poolIndex, app.YOUR_ADDRESS)));

    if (earnedTokenAmounts.some(amount => amount > 0)) {
      CHEF_CONTRACT.deposit(poolIndex, 0, {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
    }
}

async function loadMDG2ChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = 13;
  const totalAllocPoints = await chefContract.totalAllocPoint();
    
  _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBscPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBscToken(App, address, chefAddress);
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
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, "bsc")
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