
$(function() {
consoleInit(main)
  });

const MGP_CHEF_ABI = [{"inputs":[],"name":"InvalidStakingToken","type":"error"},{"inputs":[],"name":"LengthMismatch","type":"error"},{"inputs":[],"name":"MGPsetAlready","type":"error"},{"inputs":[],"name":"MustBeContract","type":"error"},{"inputs":[],"name":"MustBeContractOrZero","type":"error"},{"inputs":[],"name":"OnlyActivePool","type":"error"},{"inputs":[],"name":"OnlyCompounder","type":"error"},{"inputs":[],"name":"OnlyLocker","type":"error"},{"inputs":[],"name":"OnlyPoolHelper","type":"error"},{"inputs":[],"name":"OnlyPoolManager","type":"error"},{"inputs":[],"name":"PoolExsisted","type":"error"},{"inputs":[],"name":"UnlockAmountExceedsLocked","type":"error"},{"inputs":[],"name":"WithdrawAmountExceedsStaked","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"indexed":true,"internalType":"address","name":"_stakingToken","type":"address"},{"indexed":true,"internalType":"contract IBaseRewardPool","name":"_rewarder","type":"address"}],"name":"Add","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newCompounder","type":"address"},{"indexed":false,"internalType":"address","name":"_oldCompounder","type":"address"}],"name":"CompounderUpated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":true,"internalType":"address","name":"_stakingToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":true,"internalType":"address","name":"_stakingToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"DepositNotAvailable","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":true,"internalType":"address","name":"_stakingToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_account","type":"address"},{"indexed":true,"internalType":"address","name":"_receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isLock","type":"bool"}],"name":"HarvestMGP","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_stakingToken","type":"address"},{"indexed":false,"internalType":"bool","name":"_isRewardMGP","type":"bool"}],"name":"LockFreePoolUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_mgp","type":"address"}],"name":"MGPSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_mWomSV","type":"address"},{"indexed":false,"internalType":"address","name":"_oldMWomSV","type":"address"}],"name":"MWomSVpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_account","type":"address"},{"indexed":false,"internalType":"bool","name":"_status","type":"bool"}],"name":"PoolManagerStatus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_stakingToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IBaseRewardPool","name":"_rewarder","type":"address"}],"name":"Set","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_oldMgpPerSec","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_newMgpPerSec","type":"uint256"}],"name":"UpdateEmissionRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_stakingToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"_lastRewardTimestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_accMGPPerShare","type":"uint256"}],"name":"UpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_stakingToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"_oldAllocPoint","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_newAllocPoint","type":"uint256"}],"name":"UpdatePoolAlloc","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newVlmgp","type":"address"},{"indexed":false,"internalType":"address","name":"_oldVlmgp","type":"address"}],"name":"VLMGPUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":true,"internalType":"address","name":"_stakingToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"MPGRewardPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"PoolManagers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_mgp","type":"address"},{"internalType":"uint256","name":"_mgpPerSec","type":"uint256"},{"internalType":"uint256","name":"_startTimestamp","type":"uint256"}],"name":"__MasterMagpie_init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_rewarder","type":"address"},{"internalType":"address","name":"_helper","type":"address"},{"internalType":"bool","name":"_helperNeedsHarvest","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"allPendingTokens","outputs":[{"internalType":"uint256","name":"pendingMGP","type":"uint256"},{"internalType":"address[]","name":"bonusTokenAddresses","type":"address[]"},{"internalType":"string[]","name":"bonusTokenSymbols","type":"string[]"},{"internalType":"uint256[]","name":"pendingBonusRewards","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"compounder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"mainRewardToken","type":"address"}],"name":"createRewarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_for","type":"address"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_for","type":"address"}],"name":"depositMWomSVFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_for","type":"address"}],"name":"depositVlMGPFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"getPoolInfo","outputs":[{"internalType":"uint256","name":"emission","type":"uint256"},{"internalType":"uint256","name":"allocpoint","type":"uint256"},{"internalType":"uint256","name":"sizeOfPool","type":"uint256"},{"internalType":"uint256","name":"totalPoint","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"legacyRewarder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mWomSV","outputs":[{"internalType":"contract ILocker","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mgp","outputs":[{"internalType":"contract MGP","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mgpPerSec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_stakingTokens","type":"address[]"}],"name":"multiclaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_stakingTokens","type":"address[]"},{"internalType":"address[][]","name":"_rewardTokens","type":"address[][]"},{"internalType":"address","name":"_account","type":"address"}],"name":"multiclaimFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_stakingTokens","type":"address[]"},{"internalType":"address[][]","name":"_rewardTokens","type":"address[][]"},{"internalType":"address","name":"_account","type":"address"}],"name":"multiclaimOnBehalf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_stakingTokens","type":"address[]"},{"internalType":"address[][]","name":"_rewardTokens","type":"address[][]"}],"name":"multiclaimSpec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"}],"name":"pendingTokens","outputs":[{"internalType":"uint256","name":"pendingMGP","type":"uint256"},{"internalType":"address","name":"bonusTokenAddress","type":"address"},{"internalType":"string","name":"bonusTokenSymbol","type":"string"},{"internalType":"uint256","name":"pendingBonusToken","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"referral","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"registeredToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"rewarderBonusTokenInfo","outputs":[{"internalType":"address[]","name":"bonusTokenAddresses","type":"address[]"},{"internalType":"string[]","name":"bonusTokenSymbols","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"address","name":"_helper","type":"address"},{"internalType":"address","name":"_rewarder","type":"address"},{"internalType":"bool","name":"_helperNeedsHarvest","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_compounder","type":"address"}],"name":"setCompounder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_legacyRewarder","type":"address"}],"name":"setLegacyRewarder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"bool","name":"_isLockFree","type":"bool"}],"name":"setMGPRewardPools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mWomSV","type":"address"}],"name":"setMWomSV","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mgp","type":"address"}],"name":"setMgp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"bool","name":"_allowedManager","type":"bool"}],"name":"setPoolManagerStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_referral","type":"address"}],"name":"setReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vlmgp","type":"address"}],"name":"setVlmgp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"stakingInfo","outputs":[{"internalType":"uint256","name":"stakedAmount","type":"uint256"},{"internalType":"uint256","name":"availableAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenToPoolInfo","outputs":[{"internalType":"address","name":"stakingToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTimestamp","type":"uint256"},{"internalType":"uint256","name":"accMGPPerShare","type":"uint256"},{"internalType":"address","name":"rewarder","type":"address"},{"internalType":"address","name":"helper","type":"address"},{"internalType":"bool","name":"helperNeedsHarvest","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"unClaimedMgp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mgpPerSec","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_stakingTokens","type":"address[]"},{"internalType":"uint256[]","name":"_allocPoints","type":"uint256[]"}],"name":"updatePoolsAlloc","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewarder","type":"address"},{"internalType":"address","name":"_manager","type":"address"},{"internalType":"bool","name":"_allowed","type":"bool"}],"name":"updateRewarderManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vlmgp","outputs":[{"internalType":"contract ILocker","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_for","type":"address"}],"name":"withdrawFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_for","type":"address"}],"name":"withdrawMWomSVFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_for","type":"address"}],"name":"withdrawVlMGPFor","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const MGP_CHEF_ADDR = "0x664cc2BcAe1E057EB1Ec379598c5B743Ad9Db6e7";
   const rewardTokenTicker = "MGP";
   const MGP_CHEF = new ethers.Contract(MGP_CHEF_ADDR, MGP_CHEF_ABI, App.provider);

   const rewardsPerWeek = await MGP_CHEF.mgpPerSec() / 1e18 * 604800;

    const tokens = {};
    const prices = await getArbitrumPrices();

    await loadMagpieChefContract(App, tokens, prices, MGP_CHEF, MGP_CHEF_ADDR, MGP_CHEF_ABI, rewardTokenTicker,
        "mgp", null, rewardsPerWeek, "pendingTokens");

    hideLoading();
  }

async function loadMagpieChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices, claimFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://arbiscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getArbitrumToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 13.5

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getMagpiePoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getArbitrumToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
      .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printMagpieChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, claimFunction, "arbitrum", poolInfos[i].depositFee, poolInfos[i].withdrawFee, poolInfos[i].stakingTokenAddress)
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

function printMagpieChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
  totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
  pendingRewardsFunction, fixedDecimals, claimFunction, chain = "eth", depositFee = 0, withdrawFee = 0, stakingTokenAddress) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printMagpieChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee, stakingTokenAddress);
  return apr;
}

function printMagpieChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
  rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
  claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee, stakingTokenAddress) {
  fixedDecimals = fixedDecimals ?? 2;
  const unstake = async function () {
    return chefMagpieContract_unstake(chefAbi, chefAddr, poolIndex, App, stakingTokenAddress)
  }
  const claim = async function () {
    return chefArbitrumContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  if (withdrawFee > 0) {
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
  } else {
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  }
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens * rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const chefMagpieContract_unstake = async function (chefAbi, chefAddress, poolIndex, App, stakingTokenAddress) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.stakingInfo(stakingTokenAddress, App.YOUR_ADDRESS)).stakedAmount

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    CHEF_CONTRACT.withdraw(stakingTokenAddress, currentStakedAmount)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
      })
  }
}

async function getMagpiePoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const stakingTokenAddr = await chefContract.registeredToken(poolIndex);
  const poolInfo = await chefContract.getPoolInfo(stakingTokenAddr);
  if (poolInfo.allocPoint == 0) {
    return {
      address: stakingTokenAddr,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked: 0,
      pendingRewardTokens: 0,
    };
  }
  const poolToken = await getArbitrumToken(app, stakingTokenAddr, chefAddress);
  const userInfo = await chefContract.stakingInfo(stakingTokenAddr, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](stakingTokenAddr, app.YOUR_ADDRESS, "0xa61f74247455a40b01b0559ff6274441fafa22a3");
  const staked = userInfo.stakedAmount / 10 ** poolToken.decimals;
  return {
    address: stakingTokenAddr,
    allocPoints: poolInfo.allocPoint ?? 1,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewardTokens: pendingRewardTokens / 10 ** 18,
    depositFee: (poolInfo.depositFeeBP ?? 0) / 100,
    withdrawFee: (poolInfo.withdrawFeeBP ?? 0) / 100,
    stakingTokenAddress: stakingTokenAddr
  };
}