
$(function() {
    consoleInit(main)
      });
    
    const GOON_CHEF_ABI = [{"inputs":[{"internalType":"contract PolyGoonToken","name":"_goon","type":"address"},{"internalType":"contract ITreasurer","name":"_treasurer","type":"address"},{"internalType":"address","name":"_dev","type":"address"},{"internalType":"address","name":"_feeCollector","type":"address"},{"internalType":"uint256","name":"_initGoonPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_farmingDuration","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"allocPoints","type":"uint256"}],"name":"CategoryCreate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoints","type":"uint256"}],"name":"CategoryEdit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"uint256","name":"catId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoints","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"depositFeeBP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestInterval","type":"uint256"}],"name":"PoolCreate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"uint256","name":"catId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoints","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"depositFeeBP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"harvestInterval","type":"uint256"}],"name":"PoolEdit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"MAX_DEPOSIT_FEE_BP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_GOON_PER_BLOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_HARVEST_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"canHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"catInfo","outputs":[{"internalType":"uint256","name":"allocPoints","type":"uint256"},{"internalType":"uint256","name":"totalPoolAllocPoints","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"catPools","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"categoriesLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_allocPoints","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"createCategory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_catId","type":"uint256"},{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"_allocPoints","type":"uint256"},{"internalType":"uint256","name":"_depositFeeBP","type":"uint256"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"createPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dev","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devGoonPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_catId","type":"uint256"},{"internalType":"uint256","name":"_allocPoints","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"editCategory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_allocPoints","type":"uint256"},{"internalType":"uint256","name":"_depositFeeBP","type":"uint256"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"editPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmingDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeCollector","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"goon","outputs":[{"internalType":"contract PolyGoonToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"goonPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"catId","type":"uint256"},{"internalType":"uint256","name":"allocPoints","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accGoonPerShare","type":"uint256"},{"internalType":"uint256","name":"depositFeeBP","type":"uint256"},{"internalType":"uint256","name":"harvestInterval","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_catId","type":"uint256"}],"name":"poolsInCategory","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardGoonPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokensAdded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCatAllocPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasurer","outputs":[{"internalType":"contract ITreasurer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newDev","type":"address"}],"name":"updateDev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newFeeCollector","type":"address"}],"name":"updateFeeCollector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newGoonPerBlock","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"updateGoonPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newStartBlock","type":"uint256"}],"name":"updateStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"nextHarvestTime","type":"uint256"},{"internalType":"uint256","name":"lockedReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

    async function main() {
        const App = await init_ethers();
    
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts...\n");
    
       const GOON_CHEF_ADDR = "0x703Fb4891C5c180ef7d07F50d1FE89b3Ae88B7B0";
       const rewardTokenTicker = "GOON";
       const GOON_CHEF = new ethers.Contract(GOON_CHEF_ADDR, GOON_CHEF_ABI, App.provider);
    
       const startBlock = await GOON_CHEF.startBlock();
       const currentBlock = await App.provider.getBlockNumber();
    
       const multiplier = await GOON_CHEF.getMultiplier(currentBlock, currentBlock + 1);
    
       let rewardsPerWeek = 0
       if(currentBlock < startBlock){
         _print(`Rewards start at block <a href="https://polygonscan.com/block/countdown/${startBlock}" target="_blank">${startBlock}</a>\n`);
       }else{
        rewardsPerWeek = await GOON_CHEF.rewardGoonPerBlock() /1e18
          * 604800 * multiplier / 2.1;
       }
    
        const tokens = {};
        const prices = await getMaticPrices();
    
        await loadMaticPolygoonContract(App, tokens, prices, GOON_CHEF, GOON_CHEF_ADDR, GOON_CHEF_ABI, rewardTokenTicker,
            "goon", null, rewardsPerWeek, "pendingReward");
    
        hideLoading();
}
    
async function loadMaticPolygoonContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
  const catCount = parseInt(await chefContract.categoriesLength(), 10);
  const totalCatAllocPoints = await chefContract.totalCatAllocPoints();

  const poolCount = parseInt(await chefContract.poolsLength(), 10);
  // Settung a target totalAllocPoints
  const totalAllocPoints = 1e9

  _print(`Found ${poolCount} pools among ${catCount} categories.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getMaticToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 3

  const catInfos = await Promise.all([...Array(catCount).keys()].map(async (x) =>
    await getMaticPolygoonCatInfo(chefContract, x, totalCatAllocPoints, totalAllocPoints)));
  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getMaticPolygoonPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, catInfos)));

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

async function getMaticPolygoonCatInfo(chefContract, catIndex, totalCatAllocPoints, targetTotalAllocPoints) {
  const catInfo = await chefContract.catInfo(catIndex);
  return {
    allocPoints: catInfo.allocPoints ?? 1,
    // Used to convert PolyGoon's allocation system to a classic masterchef's one
    targetTotalPoolAllocPoints: (catInfo.allocPoints ?? 1) / totalCatAllocPoints * targetTotalAllocPoints,
    totalPoolAllocPoints: catInfo.totalPoolAllocPoints ?? 1,
    name: catInfo.name,
  }
}

async function getMaticPolygoonPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction, catInfos) {  
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoints == 0) {
    return {
      address: poolInfo.token,
      catId: poolInfo.catId,
      allocPoints: poolInfo.allocPoints ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  const poolToken = await getMaticToken(app, poolInfo.token, chefAddress);
  const poolCategory = catInfos[poolInfo.catId]
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolInfo.token,
      // Converting pool alloc points to a classic masterchef's one
      allocPoints: (poolInfo.allocPoints ?? 1) / poolCategory.totalPoolAllocPoints * poolCategory.targetTotalPoolAllocPoints,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}