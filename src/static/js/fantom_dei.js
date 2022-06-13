
$(function() {
consoleInit(main)
  });

const DEUS_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_deus","type":"address"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"},{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[],"name":"LogInit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IERC20","name":"lpToken","type":"address"}],"name":"LogPoolAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"LogSetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldValue","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"LogSetTokenPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accTokensPerShare","type":"uint256"}],"name":"LogUpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DEUS","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingTokens","outputs":[{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint128","name":"accTokensPerShare","type":"uint128"},{"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"internalType":"uint64","name":"allocPoint","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"pools","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewarder","outputs":[{"internalType":"contract IRewarder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IRewarder","name":"_rewarder","type":"address"}],"name":"setRewarder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"}],"name":"setTokenPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"updatePool","outputs":[{"components":[{"internalType":"uint128","name":"accTokensPerShare","type":"uint128"},{"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"internalType":"uint64","name":"allocPoint","type":"uint64"}],"internalType":"struct MasterChefV2.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"int256","name":"rewardDebt","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdrawAndHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const LP_TOKEN_DATA_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"invariant","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint8","name":"tokenIndex","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"protocolFee","type":"uint256"}],"name":"FlashLoan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newAdminFee","type":"uint256"}],"name":"NewAdminFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newSwapFee","type":"uint256"}],"name":"NewSwapFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newWithdrawFee","type":"uint256"}],"name":"NewWithdrawFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"initialTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"futureTime","type":"uint256"}],"name":"RampA","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"invariant","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"}],"name":"RemoveLiquidityImbalance","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"lpTokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokenSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"boughtId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensBought","type":"uint256"}],"name":"RemoveLiquidityOne","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"currentA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"StopRampA","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokensSold","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensBought","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"soldId","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"boughtId","type":"uint128"}],"name":"TokenSwap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"MAX_BPS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256","name":"minToMint","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"calculateRemoveLiquidity","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint8","name":"tokenIndex","type":"uint8"}],"name":"calculateRemoveLiquidityOneToken","outputs":[{"internalType":"uint256","name":"availableTokenAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"tokenIndexFrom","type":"uint8"},{"internalType":"uint8","name":"tokenIndexTo","type":"uint8"},{"internalType":"uint256","name":"dx","type":"uint256"}],"name":"calculateSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bool","name":"deposit","type":"bool"}],"name":"calculateTokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"contract IERC20Upgradeable","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"params","type":"bytes"}],"name":"flashLoan","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"flashLoanFeeBPS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAPrecise","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getAdminBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getToken","outputs":[{"internalType":"contract IERC20Upgradeable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"getTokenIndex","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVirtualPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20Upgradeable[]","name":"_pooledTokens","type":"address[]"},{"internalType":"uint8[]","name":"decimals","type":"uint8[]"},{"internalType":"string","name":"lpTokenName","type":"string"},{"internalType":"string","name":"lpTokenSymbol","type":"string"},{"internalType":"uint256","name":"_a","type":"uint256"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"uint256","name":"_adminFee","type":"uint256"},{"internalType":"address","name":"lpTokenTargetAddress","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolFeeShareBPS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"futureA","type":"uint256"},{"internalType":"uint256","name":"futureTime","type":"uint256"}],"name":"rampA","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"minAmounts","type":"uint256[]"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256","name":"maxBurnAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityImbalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint8","name":"tokenIndex","type":"uint8"},{"internalType":"uint256","name":"minAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityOneToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newAdminFee","type":"uint256"}],"name":"setAdminFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFlashLoanFeeBPS","type":"uint256"},{"internalType":"uint256","name":"newProtocolFeeShareBPS","type":"uint256"}],"name":"setFlashLoanFees","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newSwapFee","type":"uint256"}],"name":"setSwapFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"stopRampA","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint8","name":"tokenIndexFrom","type":"uint8"},{"internalType":"uint8","name":"tokenIndexTo","type":"uint8"},{"internalType":"uint256","name":"dx","type":"uint256"},{"internalType":"uint256","name":"minDy","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"swapStorage","outputs":[{"internalType":"uint256","name":"initialA","type":"uint256"},{"internalType":"uint256","name":"futureA","type":"uint256"},{"internalType":"uint256","name":"initialATime","type":"uint256"},{"internalType":"uint256","name":"futureATime","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"},{"internalType":"uint256","name":"adminFee","type":"uint256"},{"internalType":"contract LPToken","name":"lpToken","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAdminFees","outputs":[],"stateMutability":"payable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const DEUS_CHEF_ADDR = "0x67932809213AFd6bac5ECD2e4e214Fe18209c419";
   const LP_TOKEN_DATA_ADDR = "0x9caC3CE5D8327aa5AF54b1b4e99785F991885Bf3"

   const rewardTokenTicker = "DEUS";
   const DEUS_CHEF = new ethers.Contract(DEUS_CHEF_ADDR, DEUS_CHEF_ABI, App.provider);

   const LP_TOKEN_DATA = new ethers.Contract(LP_TOKEN_DATA_ADDR, LP_TOKEN_DATA_ABI, App.provider);

   const rewardsPerWeek = await DEUS_CHEF.tokenPerBlock() / 1e18 * 604800;

    const tokens = {};
    const prices = await getFantomPrices();

    const virtualPrice = await LP_TOKEN_DATA.getVirtualPrice() / 1e18;
    const deiPrice = getParameterCaseInsensitive(prices, "0xde12c7959e1a72bbe8a5f7a1dc8f8eef9ab011b3")?.usd;
    const lpTokenPrice = deiPrice * virtualPrice;

    prices["0xDce9EC1eB454829B6fe0f54F504FEF3c3C0642Fc"] = { usd : lpTokenPrice }

    await loadDeusChefContract(App, tokens, prices, DEUS_CHEF, DEUS_CHEF_ADDR, DEUS_CHEF_ABI, rewardTokenTicker,
      "DEUS", null, rewardsPerWeek, "pendingTokens", [1]);

    hideLoading();
  }

async function getDeusPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  const lpToken = await chefContract.lpToken(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return {
      address: lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  const poolToken = await getFantomToken(app, lpToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address : lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      depositFee : (poolInfo.depositFeeBP ?? poolInfo.depositFee ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? poolInfo.withdrawalFee ?? 0) / 100
  };
}

async function loadDeusChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices, claimFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://ftmscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getFantomToken(App, rewardTokenAddress, chefAddress);

  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getDeusPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getFantomToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "fantom") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "fantom") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, claimFunction, "fantom", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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