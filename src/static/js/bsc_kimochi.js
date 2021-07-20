
$(function() {
consoleInit(main)
  });

const KIMOCHI_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_referralLPToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"stakeAmountLPLv1","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"stakeAmountLPLv2","type":"uint256"}],"name":"AmountLPStakeLevelRefer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Lock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"percentForReferLv1","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"percentForReferLv2","type":"uint256"}],"name":"PercentLPLevelRefer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"contract IERC20","name":"referralLPToken","type":"address"}],"name":"ReferralLPToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lockAmount","type":"uint256"}],"name":"SendReferralReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lockAmount","type":"uint256"}],"name":"SendReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"status","type":"bool"}],"name":"Status","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"address","name":"teamAddress","type":"address"}],"name":"TeamAddressPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"contract IERC20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_percentLockReward","type":"uint256"},{"internalType":"uint256","name":"_percentForDev","type":"uint256"},{"internalType":"uint256","name":"_percentForBurn","type":"uint256"},{"internalType":"uint256","name":"_halvingAfterBlock","type":"uint256"},{"internalType":"uint256[]","name":"_rewardMultiplier","type":"uint256[]"},{"internalType":"uint256","name":"_lockFromBlock","type":"uint256"},{"internalType":"uint256","name":"_lockToBlock","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"canUnlockAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"},{"internalType":"uint256[]","name":"_halvingAtBlock","type":"uint256[]"},{"internalType":"uint256[]","name":"_rewardMultiplier","type":"uint256[]"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getNewRewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getPoolReward","outputs":[{"internalType":"uint256","name":"forBurn","type":"uint256"},{"internalType":"uint256","name":"forDev","type":"uint256"},{"internalType":"uint256","name":"forFarmer","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"halvingAtBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"lastUnlockBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_holder","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"lockOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"percentForReferLv1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"percentForReferLv2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"contract IERC20","name":"rewardToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"percentLockReward","type":"uint256"},{"internalType":"uint256","name":"percentForDev","type":"uint256"},{"internalType":"uint256","name":"percentForBurn","type":"uint256"},{"internalType":"uint256","name":"finishBonusAtBlock","type":"uint256"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"totalLock","type":"uint256"},{"internalType":"uint256","name":"lockFromBlock","type":"uint256"},{"internalType":"uint256","name":"lockToBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"referralAmountLv1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"referralAmountLv2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"referralLPToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referrers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardMultipliers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_stakeAmountLPLv1","type":"uint256"},{"internalType":"uint256","name":"_stakeAmountLPLv2","type":"uint256"}],"name":"setAmountLPStakeLevelRefer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_percentForReferLv1","type":"uint256"},{"internalType":"uint256","name":"_percentForReferLv2","type":"uint256"}],"name":"setPercentLPLevelRefer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_referralLPToken","type":"address"}],"name":"setReferralLPToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_status","type":"bool"}],"name":"setStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_teamAddress","type":"address"}],"name":"setTeamAddressPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakeAmountLPLv1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeAmountLPLv2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"status","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"teamAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"totalAllocPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_rewardToken","type":"address"}],"name":"totalLock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"totalLockInPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"totalLocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"unlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"rewardDebtAtBlock","type":"uint256"},{"internalType":"uint256","name":"lockAmount","type":"uint256"},{"internalType":"uint256","name":"lastUnlockBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const KIMOCHI_CHEF_ADDR = "0xc88264770C43826dE89bCd48a5c8BC5073e482a5";
   const rewardTokenTicker = "KIMOCHI";
   const KIMOCHI_CHEF = new ethers.Contract(KIMOCHI_CHEF_ADDR, KIMOCHI_CHEF_ABI, App.provider);

    const tokens = {};
    const prices = await getBscPrices();

    await loadBscKimochiChefContract(App, tokens, prices, KIMOCHI_CHEF, KIMOCHI_CHEF_ADDR, KIMOCHI_CHEF_ABI, rewardTokenTicker,
        "pendingReward", [0]);

    hideLoading();
  }

  async function loadBscKimochiChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    pendingRewardsFunction, deathPoolIndices) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolLength(), 10);

    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    var tokens = {};

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getKimochiPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getBscToken(App, address, chefAddress);
    }));

    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
                       .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);


    _print("Finished reading smart contracts.\n");

    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        printKimochiPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          poolInfos[i].rewardsPerWeek, rewardTokenTicker, poolInfos[i].rewardToken.address,
          pendingRewardsFunction);
      }
    }
  }

  async function getKimochiPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    if(poolInfo.allocPoint == 0)
    {
        return {
          allocPoints: poolInfo.allocPoint ?? 1,
          address: poolInfo.lpToken,
          rewardToken: null,
          poolToken: null,
          userStaked : 0,
          pendingRewardTokens : 0,
          rewardsPerWeek : 0
      };
    }
    let epoch = 0
    const currentBlock = await app.provider.getBlockNumber();
    let epochEndBlock = await chefContract.halvingAtBlocks(poolIndex, epoch)
    while (epochEndBlock < currentBlock) {
      epoch++
      epochEndBlock = await chefContract.halvingAtBlocks(poolIndex, epoch)
    }
    const totalAllocPoints = await chefContract.totalAllocPoints(poolInfo.rewardToken);
    const allocPoint = poolInfo.allocPoint;
    const multiplier = await chefContract.rewardMultipliers(poolIndex, epoch);
    const poolToken = await getBscToken(app, poolInfo.lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const rewardToken = await getBscToken(app, poolInfo.rewardToken, app.YOUR_ADDRESS);
    const rewardsPerWeek = poolInfo.rewardPerBlock / 10 ** rewardToken.decimals * 604800 / 3 * multiplier;
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        allocPoints: allocPoint,
        address: poolInfo.lpToken,
        rewardToken: rewardToken,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        rewardsPerWeek : rewardsPerWeek * allocPoint / totalAllocPoints
    };
  }

function printKimochiPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
  var poolRewardsPerWeek = rewardsPerWeek
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain);
  return apr;
}
