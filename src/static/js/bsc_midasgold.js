
$(function() {
    consoleInit();
    start(main);
  });

const MIDASGOLD_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"executor","type":"address"},{"indexed":false,"internalType":"uint256","name":"at","type":"uint256"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BLOCKS_PER_DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BLOCKS_PER_WEEK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"_lastRewardBlock","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bcash","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bcashPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getRewardBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mdg","type":"address"},{"internalType":"address","name":"_mdo","type":"address"},{"internalType":"address","name":"_bcash","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_lockUntilBlock","type":"uint256"},{"internalType":"address","name":"_mdgLocker","type":"address"},{"internalType":"address","name":"_reserveFund","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockUntilBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mdg","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mdo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mdoPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract ILiquidityMigrator","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextHalvingBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBcash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingMdo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accMdgPerShare","type":"uint256"},{"internalType":"uint256","name":"accMdoPerShare","type":"uint256"},{"internalType":"uint256","name":"accBcashPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"},{"internalType":"bool","name":"isStarted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserveFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reservePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bcashPerBlock","type":"uint256"}],"name":"setBcashPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mdoPerBlock","type":"uint256"}],"name":"setMdoPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ILiquidityMigrator","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_reserveFund","type":"address"}],"name":"setReserveFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"setRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"mdoDebt","type":"uint256"},{"internalType":"uint256","name":"bcashDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const MIDASGOLD_CHEF_ADDR = "0x8f0A813D39F019a2A98958eDbf5150d3a06Cd20f";
   const rewardTokenTickers = ["MDG", "BCASH", "MDO"]
   const rewardTokenFunctions = ["bcash", "mdg", "mdo"]
   const pendingRewardsFunctions = ["pendingBcash", "pendingMdo", "pendingReward"]
   const MIDASGOLD_CHEF = new ethers.Contract(MIDASGOLD_CHEF_ADDR, MIDASGOLD_CHEF_ABI, App.provider);

   const rewardsPerWeek = [await MIDASGOLD_CHEF.bcashPerBlock() /1e18 * 604800 / 3,
                           await MIDASGOLD_CHEF.mdoPerBlock() /1e18 * 604800 / 3,
                           await MIDASGOLD_CHEF.rewardPerBlock() /1e18 * 604800 / 3 ]

    const tokens = {};
    const prices = await getBscPrices();

    await loadBscMidasgoldContract(App, tokens, prices, MIDASGOLD_CHEF, MIDASGOLD_CHEF_ADDR, MIDASGOLD_CHEF_ABI, rewardTokenTickers,
      rewardTokenFunctions, null, rewardsPerWeek, pendingRewardsFunctions);

    hideLoading();  
  }

async function loadBscMidasgoldContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
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
    
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, "bsc");
    }
  }
}