
$(function() {
consoleInit(main)
  });

const XWIN_CHEF_ABI = [{"inputs":[{"internalType":"uint256","name":"_platformFeeBps","type":"uint256"},{"internalType":"address","name":"_platformWallet","type":"address"},{"internalType":"address","name":"_xwinBenefitPool","type":"address"},{"internalType":"address","name":"_stakeAddress","type":"address"},{"internalType":"address","name":"_xWinToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"Received","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"toFund","type":"address"},{"indexed":false,"internalType":"address[]","name":"newTargets","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"newWeight","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"txnTime","type":"uint256"}],"name":"_CreateTarget","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"_DepositFarm","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"fundaddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"_EmergencyRedeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"toFund","type":"address"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"swapOutput","type":"uint256"}],"name":"_MoveNonIndexNameToBaseEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"toFund","type":"address"},{"indexed":false,"internalType":"uint256","name":"baseBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"txnTime","type":"uint256"}],"name":"_RebalanceAllInOne","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"toFund","type":"address"},{"indexed":false,"internalType":"uint256","name":"redeemUnit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardQty","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"redeemratio","type":"uint256"}],"name":"_Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardQty","type":"uint256"}],"name":"_StakeMyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"toFund","type":"address"},{"indexed":false,"internalType":"uint256","name":"subsAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"mintQty","type":"uint256"}],"name":"_Subscribe","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"_WithdrawFarm","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardQty","type":"uint256"}],"name":"_WithdrawReward","type":"event"},{"inputs":[{"internalType":"address[]","name":"_toAddresses","type":"address[]"},{"internalType":"uint256[]","name":"_targetWeight","type":"uint256[]"},{"internalType":"address","name":"xFundAddress","type":"address"}],"name":"CreateTarget","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"DepositFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"fromAddress","type":"address"}],"name":"GetEstimateReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenBal","type":"uint256"},{"internalType":"address","name":"targetToken","type":"address"}],"name":"GetQuotes","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"amountA","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"xFundAddress","type":"address"},{"internalType":"address","name":"_tokenaddress","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"priceImpactTolerance","type":"uint256"}],"name":"MoveNonIndexNameToBase","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_newProtocol","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ProtocolTransfer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"xFundAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"priceImpactTolerance","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"returnInBase","type":"bool"},{"internalType":"address","name":"referral","type":"address"}],"internalType":"struct xWinLib.TradeParams","name":"_tradeParams","type":"tuple"},{"internalType":"address[]","name":"_toAddresses","type":"address[]"},{"internalType":"uint256[]","name":"_targetWeight","type":"uint256[]"}],"name":"RebalanceAllInOne","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"xFundAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"priceImpactTolerance","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"returnInBase","type":"bool"},{"internalType":"address","name":"referral","type":"address"}],"internalType":"struct xWinLib.TradeParams","name":"_tradeParams","type":"tuple"}],"name":"Redeem","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"StakeMyReward","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"xFundAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"priceImpactTolerance","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"returnInBase","type":"bool"},{"internalType":"address","name":"referral","type":"address"}],"internalType":"struct xWinLib.TradeParams","name":"_tradeParams","type":"tuple"}],"name":"Subscribe","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"WithdrawFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"WithdrawReward","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_rewardperblock","type":"uint256"},{"internalType":"uint256","name":"_multiplier","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_fundaddress","type":"address[]"},{"internalType":"bool[]","name":"_isxwinFund","type":"bool[]"}],"name":"addxwinFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyOn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_redeemAmount","type":"uint256"},{"internalType":"address","name":"_fundaddress","type":"address"}],"name":"emergencyRedeem","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_fundaddress","type":"address"}],"name":"emergencyRemoveFromFarm","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getAllPendingXwin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlatformAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlatformFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gexWinBenefitPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isxwinFund","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingXwin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"uint256","name":"rewardperblock","type":"uint256"},{"internalType":"uint256","name":"multiplier","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardRemaining","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startblock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"updateEmergencyState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_rewardperblock","type":"uint256"},{"internalType":"uint256","name":"_multiplier","type":"uint256"}],"name":"updateFarmPoolInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_managerRewardperunit","type":"uint256"}],"name":"updateManagerRewardPerUnit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPlatformFee","type":"uint256"}],"name":"updatePlatformFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_fundaddress","type":"address"},{"internalType":"address","name":"_newProtocol","type":"address"}],"name":"updateProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_referralperunit","type":"uint256"}],"name":"updateReferralRewardPerUnit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardperblock","type":"uint256"}],"name":"updateRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newRemaining","type":"uint256"}],"name":"updateRewardRemaining","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newStakeProtocol","type":"address"}],"name":"updateStakeProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_xwinBenefitPool","type":"address"}],"name":"updateXwinBenefitPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"blockstart","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"xWinReferral","outputs":[{"internalType":"address","name":"referral","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"xWinRewards","outputs":[{"internalType":"uint256","name":"blockstart","type":"uint256"},{"internalType":"uint256","name":"accBasetoken","type":"uint256"},{"internalType":"uint256","name":"accMinttoken","type":"uint256"},{"internalType":"uint256","name":"previousRealizedQty","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"xWinToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"xwinBenefitPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const XWIN_CHEF_ADDR = "0x1Bf7fe7568211ecfF68B6bC7CCAd31eCd8fe8092";
   const rewardTokenTicker = "XWIN";
   const XWIN_CHEF = new ethers.Contract(XWIN_CHEF_ADDR, XWIN_CHEF_ABI, App.provider);

    const tokens = {};
    const prices = await getBscPrices();

    const currentBlock = await App.provider.getBlockNumber();

    const blockMultiplier = multiplier(currentBlock);

    await loadXwinChefContract(App, tokens, prices, XWIN_CHEF, XWIN_CHEF_ADDR, XWIN_CHEF_ABI, rewardTokenTicker,
        "xWinToken", null, "pendingXwin", blockMultiplier, [7]);

    hideLoading();
  }

async function loadXwinChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, pendingRewardsFunction, blockMultiplier,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);

  _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBscXwinPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, rewardToken, blockMultiplier)));

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
      const apr = printXwinChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
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

async function getBscXwinPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction, rewardToken, blockMultiplier) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  /*const rewardsPerWeek = poolInfo.rewardperblock / 10 ** rewardToken.decimals * 604800 / 3
    * blockMultiplier;*/
   const rewardsPerWeek = 0;
  const poolToken = await getBscToken(App, poolInfo.lpToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolInfo.lpToken,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      rewardsPerWeek : rewardsPerWeek
  };
}

function printXwinChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
  var poolRewardsPerWeek = rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  poolPrices.print_price();
  sp?.print_price();
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain);
  return apr;
}

function multiplier(currentBlock) {
  const startBlock = 4902105;
  const blockdiff = currentBlock - startBlock;
  if(blockdiff < 5256000){
    return 50000; //first 6 months, 5x
  }else if(blockdiff >= 5256000 && blockdiff <= 10512000){
    return 25000; //then following 6 months
  }else if(blockdiff >= 10512000 && blockdiff <= 15768000){
    return 12500; //then following 6 months
  }else if(blockdiff > 15768000){
    return 10000;
  }
}
