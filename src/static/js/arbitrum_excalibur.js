
$(function() {
consoleInit(main)
  });

const GRAIL_CHEF_ABI = [{"inputs":[{"internalType":"contract IGrailTokenV2","name":"grailToken_","type":"address"},{"internalType":"uint256","name":"startTime_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"PoolAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"PoolSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"reserve","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastRewardTime","type":"uint256"}],"name":"PoolUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"emergencyUnlock","type":"bool"}],"name":"SetEmergencyUnlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousYieldBooster","type":"address"},{"indexed":false,"internalType":"address","name":"newYieldBooster","type":"address"}],"name":"SetYieldBooster","type":"event"},{"inputs":[],"name":"activePoolsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract INFTPool","name":"nftPool","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"bool","name":"withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[{"internalType":"uint256","name":"rewardsAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyUnlock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emissionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getActivePoolAddressByIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getPoolAddressByIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"poolAddress_","type":"address"}],"name":"getPoolInfo","outputs":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"reserve","type":"uint256"},{"internalType":"uint256","name":"poolEmissionRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"grailToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"bool","name":"withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"emergencyUnlock_","type":"bool"}],"name":"setEmergencyUnlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IYieldBooster","name":"yieldBooster_","type":"address"}],"name":"setYieldBooster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftPool","type":"address"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"yieldBooster","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

const GRAIL_POOL_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AddToPosition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"CreatePosition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"pending","type":"uint256"}],"name":"HarvestPosition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"LockPosition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"MergePositions","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accRewardsPerShare","type":"uint256"}],"name":"PoolUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"boostPoints","type":"uint256"}],"name":"SetBoost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"maxGlobalMultiplier","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maxBoostMultiplier","type":"uint256"}],"name":"SetBoostMultiplierSettings","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"emergencyUnlock","type":"bool"}],"name":"SetEmergencyUnlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"maxLockDuration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maxLockMultiplier","type":"uint256"}],"name":"SetLockMultiplierSettings","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"}],"name":"SetOperator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"isAdded","type":"bool"}],"name":"SetUnlockOperator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"xGrailRewardsShare","type":"uint256"}],"name":"SetXGrailRewardsShare","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"splitAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newTokenId","type":"uint256"}],"name":"SplitPosition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromPosition","type":"event"},{"inputs":[],"name":"MAX_BOOST_MULTIPLIER_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_GLOBAL_MULTIPLIER_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_LOCK_MULTIPLIER_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amountToAdd","type":"uint256"}],"name":"addToPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"boost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"createPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyUnlock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"exists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"boostPoints","type":"uint256"}],"name":"getMultiplierByBoostPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"getMultiplierByLockDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMultiplierSettings","outputs":[{"internalType":"uint256","name":"maxGlobalMultiplier","type":"uint256"},{"internalType":"uint256","name":"maxLockDuration","type":"uint256"},{"internalType":"uint256","name":"maxLockMultiplier","type":"uint256"},{"internalType":"uint256","name":"maxBoostMultiplier","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPoolInfo","outputs":[{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"address","name":"grailToken","type":"address"},{"internalType":"address","name":"xGrailToken","type":"address"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accRewardsPerShare","type":"uint256"},{"internalType":"uint256","name":"lpSupply","type":"uint256"},{"internalType":"uint256","name":"lpSupplyWithMultiplier","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getStakingPosition","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"amountWithMultiplier","type":"uint256"},{"internalType":"uint256","name":"startLockTime","type":"uint256"},{"internalType":"uint256","name":"lockDuration","type":"uint256"},{"internalType":"uint256","name":"lockMultiplier","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"boostPoints","type":"uint256"},{"internalType":"uint256","name":"totalMultiplier","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"harvestPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"harvestPositionTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"address","name":"to","type":"address"}],"name":"harvestPositionsTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hasDeposits","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ICamelotMaster","name":"master_","type":"address"},{"internalType":"contract IERC20","name":"grailToken","type":"address"},{"internalType":"contract IXGrailToken","name":"xGrailToken","type":"address"},{"internalType":"contract IERC20","name":"lpToken","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"isUnlockOperator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isUnlocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"lockPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"master","outputs":[{"internalType":"contract ICamelotMaster","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"mergePositions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"renewLockPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxGlobalMultiplier","type":"uint256"},{"internalType":"uint256","name":"maxBoostMultiplier","type":"uint256"}],"name":"setBoostMultiplierSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"emergencyUnlock_","type":"bool"}],"name":"setEmergencyUnlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxLockDuration","type":"uint256"},{"internalType":"uint256","name":"maxLockMultiplier","type":"uint256"}],"name":"setLockMultiplierSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator_","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"add","type":"bool"}],"name":"setUnlockOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"xGrailRewardsShare_","type":"uint256"}],"name":"setXGrailRewardsShare","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"splitAmount","type":"uint256"}],"name":"splitPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unboost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"unlockOperator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unlockOperatorsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"}],"name":"withdrawFromPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"xGrailRewardsShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"yieldBooster","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
    _print("This may take some time\n");

   const GRAIL_CHEF_ADDR = "0x55401A4F396b3655f66bf6948A1A4DC61Dfc21f4";
   const rewardTokenTicker = "GRAIL";
   const GRAIL_CHEF = new ethers.Contract(GRAIL_CHEF_ADDR, GRAIL_CHEF_ABI, App.provider);

   const poolCount = parseInt(await GRAIL_CHEF.poolsLength(), 10);

   let poolInfos = [];

   for(let i = 0; i < poolCount; i++){
    const poolAddress = await GRAIL_CHEF.getPoolAddressByIndex(i);
    const poolInfo = await GRAIL_CHEF.getPoolInfo(poolAddress);
    poolInfos.push(poolInfo);
   }

    const tokens = {};
    const prices = await getArbitrumPrices();

    const grailTokenAddress = "0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8";

    await loadGrailContract(App, tokens, prices, poolInfos, rewardTokenTicker, grailTokenAddress);

    hideLoading();
  }

async function loadGrailContract(App, tokens, prices, pools, rewardTokenTicker, rewardTokenAddress) {

  _print(`<a href='https://arbiscan.io/address/0x55401A4F396b3655f66bf6948A1A4DC61Dfc21f4' target='_blank'>Staking Contract</a>`);
  _print(`Found ${pools.length} pools.\n`)

  const poolInfos = await Promise.all([...Array(pools.length).keys()].map(async (x) =>
    await getGrailPoolInfo(App, pools[x])));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getArbitrumToken(App, address, App.YOUR_ADDRESS);
  }));

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolInfos.length; i++) {
    if (poolPrices[i]) {
      const apr = printGrailPool(App, prices, tokens, poolInfos[i], poolPrices[i],
        poolInfos[i].rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, null, "arbitrum")
      aprs.push(apr);
    }
  }
  let totalUserStaked = 0, totalStaked = 0, averageApr = 0;
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
      + ` Day $${formatMoney(totalUserStaked * averageApr / 365)}`
      + ` Week $${formatMoney(totalUserStaked * averageApr / 52)}`
      + ` Year $${formatMoney(totalUserStaked * averageApr)}\n`);
  }
  return { prices, totalUserStaked, totalStaked, averageApr }
}

function printGrailPool(App, prices, tokens, poolInfo, poolPrices,
  rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
  fixedDecimals, chain = "eth") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = rewardsPerWeek;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printGrailAPR(poolInfo.userStakingDetails, rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, poolPrices.price, fixedDecimals, poolInfo.poolToken, poolPrices);
  printGrailContractLinks(App, poolInfo.poolAddress, poolInfo.address, rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked, fixedDecimals, rewardPrice, chain, poolInfo.userStakingDetails, poolInfo.poolToken);
  _print("");
  return apr;
}

function printGrailContractLinks(App, poolAddress, poolTokenAddress, rewardTokenTicker, stakeTokenTicker, unstaked, fixedDecimals,
  rewardTokenPrice, chain, userStakingDetails, stakedToken) {
  fixedDecimals = fixedDecimals ?? 2;
  // const approveAndStake = async function () {
  //   return chefArbitrumContract_stake(GRAIL_POOL_ABI, poolAddress, poolIndex, poolTokenAddress, App)
  // }
  let unstakes = [], claims = [];
  for(const userStakingDetail of userStakingDetails){
    const currentStakedAmount = userStakingDetail.details.amount;
    const tokenID = userStakingDetail.nftID;
    const unstake = async function () {
      return grailContract_unstake(GRAIL_POOL_ABI, poolAddress, tokenID, App, currentStakedAmount)
    }
    const claim = async function () {
      return grailContract_claim(GRAIL_POOL_ABI, poolAddress, tokenID, App)
    }
    unstakes.push(unstake);
    claims.push(claim);
  }
  // _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  for(let i = 0; i < userStakingDetails.length; i++){
    const userStaked = userStakingDetails[i].details.amount / 10 ** stakedToken.decimals;
    const tokenID = userStakingDetails[i].nftID / 1;
    _print_link(`Unstake for position with NFT ID : ${tokenID} - ${userStaked.toFixed(5)} ${stakeTokenTicker}`, unstakes[i])
  }
  for(let i = 0; i < userStakingDetails.length; i++){
    const pendingRewardTokens = userStakingDetails[i].details.rewardDebt / 1e18;
    const tokenID = userStakingDetails[i].nftID / 1;
    _print_link(`Claim for position with NFT ID : ${tokenID} - ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens * rewardTokenPrice)})`, claims[i]);
    _print("");
  }
}

const grailContract_claim = async function (chefAbi, chefAddress, tokenID, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  showLoading()
  CHEF_CONTRACT.harvestPosition(tokenID)
        .then(function (t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function () {
          hideLoading()
        })
}

const grailContract_unstake = async function (chefAbi, chefAddress, tokenID, App, currentStakedAmount) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    CHEF_CONTRACT.withdrawFromPosition(tokenID, currentStakedAmount)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
      })
  }
}

function printGrailAPR(userStakingDetails, rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
                  stakeTokenTicker, staked_tvl, poolTokenPrice, fixedDecimals, stakedToken, poolPrices) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPR = usdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  let totalUserStaked = 0, totalUserStakedUsd = 0, totalUserStakedPct = 0, totalUserYearlyRewards = 0;
  for(const userStakingDetail of userStakingDetails){
    const userStaked = userStakingDetail.details.amount / 10 ** stakedToken.decimals;
    const userStakedUsd = userStaked * poolTokenPrice;
    const userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`Owned NFT ID: ${userStakingDetail.nftID}`)
    _print(`You are staking ${userStaked.toFixed(5)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    const lockSeconds = userStakingDetail.details.lockDuration / 1;
    const startLockingTimestamp = userStakingDetail.details.startLockTime / 1;
    const endLockingTimestamp = startLockingTimestamp + lockSeconds;
    const _unlockingDate = new Date(endLockingTimestamp * 1000);
    const unlockingDate = _unlockingDate.toLocaleString();
    _print(`Your NFT will be unlocked on : ${unlockingDate}`);
    var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
    var userDailyRewards = userWeeklyRewards / 7;
    var userYearlyRewards = userWeeklyRewards * 52;
    if (userStaked > 0) {
      _print(`Estimated ${rewardTokenTicker} earnings:`
          + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
          + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
    }
    totalUserStaked += userStaked;
    totalUserStakedUsd += userStakedUsd;
    totalUserStakedPct += userStakedPct;
    totalUserYearlyRewards += userYearlyRewards;
  }
  if (totalUserStaked > 0) poolPrices.print_contained_price(totalUserStaked);
  return {
    userStakedUsd : totalUserStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct: totalUserStakedPct,
    yearlyAPR,
    userYearlyUsd : totalUserYearlyRewards * rewardPrice
  }
}

async function getGrailPoolInfo(app, pool) {
  const poolAddress = pool.poolAddress;
  const rewardRate = pool.poolEmissionRate;
  const poolContract = new ethers.Contract(poolAddress, GRAIL_POOL_ABI, app.provider);
  const poolInfo = await poolContract.getPoolInfo();
  const poolToken = await getArbitrumToken(app, poolInfo.lpToken, poolAddress);
  poolToken.staked = poolInfo.lpSupply / 10 ** poolToken.decimals;
  const nftOwned = await poolContract.balanceOf(app.YOUR_ADDRESS) / 1;
  let userStakingDetails = [];
  for(let i = 0; i < nftOwned; i++){
    const tokenID = await poolContract.tokenOfOwnerByIndex(app.YOUR_ADDRESS, i);
    const _userStakingDetail = await poolContract.getStakingPosition(tokenID);
    const userStakingDetail = {
      details : _userStakingDetail,
      nftID : tokenID
    }
    userStakingDetails.push(userStakingDetail);
  }
  const rewardsPerWeek = rewardRate / 1e18 * 604800;
  return {
    address: poolInfo.lpToken,
    poolAddress: poolAddress,
    poolToken: poolToken,
    userStakingDetails: userStakingDetails,
    rewardsPerWeek: rewardsPerWeek
  };
}