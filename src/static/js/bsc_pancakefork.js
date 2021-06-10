
$(function() {
consoleInit(main)
  });

  const FCKE_STAKING_POOL_ABI = [{"inputs":[{"internalType":"contract IBEP20","name":"_syrup","type":"address"},{"internalType":"contract IBEP20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"bonusEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositFeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyRewardWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestingFeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accFCKEPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stopReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"syrup","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newFee","type":"uint256"}],"name":"updateDepositFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAddress","type":"address"}],"name":"updateDepositFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newFee","type":"uint256"}],"name":"updateHarvestingFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAddress","type":"address"}],"name":"updateHarvestingFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newFee","type":"uint256"}],"name":"updateWithdrawFeeAfter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newFee","type":"uint256"}],"name":"updateWithdrawFeeBefore","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"depositTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFeeAfter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawFeeBefore","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const FCKE_CHEF_ABI = [{"inputs":[{"internalType":"contract FCKEToken","name":"_fcke","type":"address"},{"internalType":"contract FSyrupBar","name":"_fsyrup","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"uint256","name":"_fckeFarmRewardsPerBlock","type":"uint256"},{"internalType":"uint256","name":"_fckePoolRewardsPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract PancakeForkSmartChef","name":"_poolAddress","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"addStakePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"adminRewardA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminRewardB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminWalletA","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminWalletB","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositFeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_transferFrom","type":"address"}],"name":"distributeBurnAndRewardTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"enterStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fcke","outputs":[{"internalType":"contract FCKEToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fckeFarmRewardsPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fckePoolRewardsPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fsyrup","outputs":[{"internalType":"contract FSyrupBar","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestingFeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"leaveStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdateStakePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingFCKE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolAddresses","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accFCKEPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardReferral","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardVote","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardReferral","type":"address"}],"name":"setRewardReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"setStakePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakePoolAddresses","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakePoolInfo","outputs":[{"internalType":"contract PancakeForkSmartChef","name":"poolAddress","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accFCKEPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakePoolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAdminRewardA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAdminRewardB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBurnAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFarmAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPoolAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAddress","type":"address"}],"name":"updateAdminWalletA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAddress","type":"address"}],"name":"updateAdminWalletB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newFee","type":"uint256"}],"name":"updateDepositFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAddress","type":"address"}],"name":"updateDepositFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updateFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newFee","type":"uint256"}],"name":"updateHarvestingFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAddress","type":"address"}],"name":"updateHarvestingFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"multiplierNumber","type":"uint256"}],"name":"updateMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newFee","type":"uint256"}],"name":"updateWithdrawFeeAfter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newFee","type":"uint256"}],"name":"updateWithdrawFeeBefore","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"depositTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFeeAfter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawFeeBefore","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const FCKE_CHEF_ADDR = "0xd3B99bf1349b939Dd30540b9C9022a0718987Eba";
   const rewardTokenTicker = "FCKE";
   const FCKE_CHEF = new ethers.Contract(FCKE_CHEF_ADDR, FCKE_CHEF_ABI, App.provider);

   const farmRewardsPerWeek = await FCKE_CHEF.fckeFarmRewardsPerBlock() /1e18
        * 604800 / 3;

    const tokens = {};
    const prices = await getBscPrices();

    await loadFarmFCKEContract(App, tokens, prices, FCKE_CHEF, FCKE_CHEF_ADDR, FCKE_CHEF_ABI, rewardTokenTicker,
        "fcke", null, farmRewardsPerWeek, "pendingFCKE", [1]);
    await loadPoolFCKEContract(App, tokens, prices, FCKE_CHEF, FCKE_CHEF_ADDR, FCKE_CHEF_ABI, rewardTokenTicker,
        "pendingFCKE");

    hideLoading();
  }

  async function loadFarmFCKEContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    deathPoolIndices) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalFarmAllocPoint();
      
    _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)
  
    _print(`Showing incentivized pools only.\n`);
  
    var tokens = {};
  
    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ?? 
      await chefContract.callStatic[rewardsPerBlockFunction]() 
      / 10 ** rewardToken.decimals * 604800 / 3
  
    const withdrawFee = await chefContract.withdrawFeeBefore() / 1e16;
  
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
          pendingRewardsFunction, null, null, "bsc", poolInfos[i].depositFee, withdrawFee.toFixed(2))
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

  async function loadPoolFCKEContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    pendingRewardsFunction, deathPoolIndices) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = parseInt(await chefContract.stakePoolLength(), 10);
    const totalAllocPoints = await chefContract.totalPoolAllocPoint();
      
    _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)
  
    _print(`Showing incentivized pools only.\n`);
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getPoolFCKEInfo(App, chefContract, chefAddress, x)));
  
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
          totalAllocPoints, poolInfos[i].rewardsPerWeek, rewardTokenTicker, poolInfos[i].rewardTokenAddress,
          pendingRewardsFunction, null, null, "bsc", poolInfos[i].depositFee.toFixed(2), poolInfos[i].withdrawFee.toFixed(2))
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

async function getPoolFCKEInfo(App, chefContract, chefAddress, poolIndex) { 
  const stakingPool = await chefContract.stakePoolInfo(poolIndex);
  const stakingPoolAddress = stakingPool.poolAddress;
  const poolInfoContract = new ethers.Contract(stakingPoolAddress, FCKE_STAKING_POOL_ABI, App.provider);
  const poolInfo = await poolInfoContract.poolInfo(0);
  const rewardTokenAddress = await poolInfoContract.rewardToken();
  const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = await poolInfoContract.rewardPerBlock() 
        / 10 ** rewardToken.decimals * 604800 / 3
  if (poolInfo.allocPoint == 0 || poolIndex == 105) {
    return {
      address: poolInfo.lpToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
      stakedToken : null,
      userLPStaked : 0,
      lastRewardBlock : poolInfo.lastRewardBlock
    };
  }
  const poolToken = await getBscToken(App, poolInfo.lpToken, chefAddress);
  poolToken.staked = await poolInfoContract.lpSupply() / 10 ** poolToken.decimals;
  const userInfo = await poolInfoContract.userInfo(App.YOUR_ADDRESS);
  const pendingRewardTokens = await poolInfoContract.pendingReward(App.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  const depositFee = await poolInfoContract.depositFee() / 1e16;
  const withdrawFee = await poolInfoContract.withdrawFeeBefore();
  return {
      address: poolInfo.lpToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      depositFee : depositFee,
      withdrawFee : withdrawFee == 0 ? 0 : withdrawFee / 1e16,
      rewardsPerWeek : rewardsPerWeek,
      rewardTokenAddress : rewardTokenAddress
  };
}

37000000000000010
39900000000000010