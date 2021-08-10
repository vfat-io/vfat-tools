
$(function() {
consoleInit(main)
  });

const CHEF_ABI = [{"inputs":[{"internalType":"contract PolyZeroDawn","name":"_tokenDark","type":"address"},{"internalType":"contract PolyZeroDawn","name":"_tokenSpark","type":"address"},{"internalType":"contract PolyZeroDawn","name":"_tokenGlow","type":"address"},{"internalType":"uint256","name":"_startBlockDark","type":"uint256"},{"internalType":"uint256","name":"_startBlockSpark","type":"uint256"},{"internalType":"uint256","name":"_startBlockGlow","type":"uint256"},{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startHarvestBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newAmount","type":"uint256"}],"name":"EmissionRateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOperator","type":"address"},{"indexed":true,"internalType":"address","name":"newOperator","type":"address"}],"name":"OperatorshipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountLockedUp","type":"uint256"}],"name":"RewardLockedUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAXIMUM_HARVEST_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"canHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingTokenDark","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingTokenGlow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingTokenSpark","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlockDark","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlockSpark","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlockGlow","type":"uint256"},{"internalType":"uint256","name":"accTokenPerShareDark","type":"uint256"},{"internalType":"uint256","name":"accTokenPerShareSpark","type":"uint256"},{"internalType":"uint256","name":"accTokenPerShareGlow","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"harvestInterval","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devAddress","type":"address"}],"name":"setDevAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlockDark","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlockGlow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlockSpark","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startHarvestBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenDark","outputs":[{"internalType":"contract PolyZeroDawn","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenGlow","outputs":[{"internalType":"contract PolyZeroDawn","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenSpark","outputs":[{"internalType":"contract PolyZeroDawn","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOperator","type":"address"}],"name":"transferOperatorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebtDark","type":"uint256"},{"internalType":"uint256","name":"rewardDebtSpark","type":"uint256"},{"internalType":"uint256","name":"rewardDebtGlow","type":"uint256"},{"internalType":"uint256","name":"rewardLockedUpDark","type":"uint256"},{"internalType":"uint256","name":"rewardLockedUpSpark","type":"uint256"},{"internalType":"uint256","name":"rewardLockedUpGlow","type":"uint256"},{"internalType":"uint256","name":"nextHarvestUntil","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
async function main() {
   const App = await init_ethers();
   
   _print(`Initialized ${App.YOUR_ADDRESS}\n`); 

   const CHEF_ADDR = "0x7D5a4a79E371F95aa8053e5602491685a29329DB";
   const rewardTokenTickerDark = "Dark";
   const rewardTokenTickerSpark = "Spark";
   const rewardTokenTickerGlow = "Glow";
   const CHEF = new ethers.Contract(CHEF_ADDR, CHEF_ABI, App.provider);

   const rewardsPerWeek = await CHEF.tokenPerBlock() / 1e18 * 604800 / 2;

    const tokens = {};
    const prices = await getMaticPrices();

    await loadMaticTrzChefContract(App, 
                                  tokens, 
                                  prices, 
                                  CHEF, 
                                  CHEF_ADDR, 
                                  CHEF_ABI, 
                                  rewardTokenTickerDark, 
                                  rewardTokenTickerSpark,
                                  rewardTokenTickerGlow,
                                  "tokenDark", 
                                  "tokenSpark", 
                                  "tokenGlow", 
                                  null, 
                                  rewardsPerWeek, 
                                  "pendingToken",
                                  "pendingTokenDark",
                                  "pendingTokenSpark",
                                  "pendingTokenGlow"
                                  );

    hideLoading();
  }

async function loadMaticTrzChefContract(
                                  App, 
                                  tokens, 
                                  prices, 
                                  chef, 
                                  chefAddress, 
                                  chefAbi, 
                                  rewardTokenTickerDark,
                                  rewardTokenTickerSpark,
                                  rewardTokenTickerGlow,
                                  rewardTokenFunctionDark, 
                                  rewardTokenFunctionSpark, 
                                  rewardTokenFunctionGlow, 
                                  rewardsPerBlockFunction, 
                                  rewardsPerWeekFixed, 
                                  pendingRewardsFunction,
                                  pendingRewardsFunctionDark,
                                  pendingRewardsFunctionSpark,
                                  pendingRewardsFunctionGlow
) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider); 
  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();
  
  _print("\n");
  _print("                               FARM                                ");
  _print("\n");
  _print(`Found ${poolCount} pools.\n`)

  var tokens = {};

  const rewardTokenAddressDark = await chefContract.callStatic[rewardTokenFunctionDark]();
  const rewardTokenAddressSpark = await chefContract.callStatic[rewardTokenFunctionSpark]();
  const rewardTokenAddressGlow = await chefContract.callStatic[rewardTokenFunctionGlow]();
  const rewardTokenDark = await getMaticToken(App, rewardTokenAddressDark, chefAddress);
  const rewardTokenSpark = await getMaticToken(App, rewardTokenAddressSpark, chefAddress);
  const rewardTokenGlow = await getMaticToken(App, rewardTokenAddressGlow, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? await chefContract.callStatic[rewardsPerBlockFunction]() / 10 ** rewardTokenDark.decimals * 604800 / 2;

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => await getMaticTrzPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunctionDark, pendingRewardsFunctionSpark, pendingRewardsFunctionGlow)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => { tokens[address] = await getMaticToken(App, address, chefAddress); }));

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printTrzPool(
                                App, 
                                chefAbi, 
                                chefAddress, 
                                prices, 
                                tokens, 
                                poolInfos[i], 
                                i, 
                                poolPrices[i],
                                totalAllocPoints, 
                                rewardsPerWeek, 
                                rewardTokenTickerDark, 
                                rewardTokenAddressDark,
                                rewardTokenTickerSpark, 
                                rewardTokenAddressSpark,
                                rewardTokenTickerGlow, 
                                rewardTokenAddressGlow,
                                pendingRewardsFunction,
                                8, 
                                null, 
                                "matic", 
                                poolInfos[i].depositFee, 
                                poolInfos[i].withdrawFee
                    );
                  

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

async function getMaticTrzPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunctionDark, pendingRewardsFunctionSpark, pendingRewardsFunctionGlow) {  
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokensDark : 0,
      pendingRewardTokensSpark : 0,
      pendingRewardTokensGlow : 0
    };
  }
  const poolToken = await getMaticToken(app, poolInfo.lpToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokensDark = await chefContract.callStatic[pendingRewardsFunctionDark](poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokensSpark = await chefContract.callStatic[pendingRewardsFunctionSpark](poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokensGlow = await chefContract.callStatic[pendingRewardsFunctionGlow](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokensDark : pendingRewardTokensDark / 10 ** 18,
      pendingRewardTokensSpark : pendingRewardTokensSpark / 10 ** 18,
      pendingRewardTokensGlow : pendingRewardTokensGlow / 10 ** 18,
      depositFee : (poolInfo.depositFeeBP ?? 0) / 10
  };
}

function printTrzPool(
                      App, 
                      chefAbi, 
                      chefAddr, 
                      prices, 
                      tokens, 
                      poolInfo, 
                      poolIndex,
                      poolPrices,
                      totalAllocPoints, 
                      rewardsPerWeek, 
                      rewardTokenTickerDark, 
                      rewardTokenAddressDark,
                      rewardTokenTickerSpark, 
                      rewardTokenAddressSpark,
                      rewardTokenTickerGlow, 
                      rewardTokenAddressGlow,
                      pendingRewardsFunction, 
                      fixedDecimals, 
                      claimFunction, 
                      chain="eth", 
                      depositFee=0, 
                      withdrawFee=0
              ) {

  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;

  const rewardPriceDark = getParameterCaseInsensitive(prices, rewardTokenAddressDark)?.usd;
  const rewardPriceSpark = getParameterCaseInsensitive(prices, rewardTokenAddressSpark)?.usd;
  const rewardPriceGlow = getParameterCaseInsensitive(prices, rewardTokenAddressGlow)?.usd;


  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);

  const apr = printTrzAPR(
                          rewardTokenTickerDark, 
                          rewardPriceDark, 
                          rewardTokenTickerSpark, 
                          rewardPriceSpark, 
                          rewardTokenTickerGlow, 
                          rewardPriceGlow, 
                          poolRewardsPerWeek, 
                          poolPrices.stakeTokenTicker,
                          staked_tvl, 
                          userStaked, 
                          poolPrices.price, 
                          fixedDecimals
                        );

  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);

  printTrzContractLinks(
                        App, 
                        chefAbi, 
                        chefAddr, 
                        poolIndex, 
                        poolInfo.address, 
                        pendingRewardsFunction,
                        rewardTokenTickerDark, 
                        rewardTokenTickerSpark, 
                        rewardTokenTickerGlow, 
                        poolPrices.stakeTokenTicker, 
                        poolInfo.poolToken.unstaked,
                        poolInfo.userStaked, 
                        poolInfo.pendingRewardTokensDark, 
                        poolInfo.pendingRewardTokensSpark, 
                        poolInfo.pendingRewardTokensGlow, 
                        fixedDecimals, 
                        claimFunction, 
                        rewardPriceDark, 
                        rewardPriceSpark, 
                        rewardPriceGlow, 
                        chain, 
                        depositFee, 
                        withdrawFee
                        );



  return apr;
}

function printTrzAPR(
                    rewardTokenTickerDark, 
                    rewardPriceDark, 
                    rewardTokenTickerSpark, 
                    rewardPriceSpark, 
                    rewardTokenTickerGlow, 
                    rewardPriceGlow, 
                    poolRewardsPerWeek,
                    stakeTokenTicker, 
                    staked_tvl, 
                    userStaked, 
                    poolTokenPrice,  
                    fixedDecimals
                  ) {

  var usdPerWeekDark = poolRewardsPerWeek * rewardPriceDark;
  var usdPerWeekSpark = poolRewardsPerWeek * rewardPriceSpark;
  var usdPerWeekGlow = poolRewardsPerWeek * rewardPriceGlow;
  fixedDecimals = fixedDecimals ?? 2;

  //_print(`${rewardTokenTickerDark} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeekDark)})`);
  //_print(`${rewardTokenTickerSpark} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeekSpark)})`); 
  //_print(`${rewardTokenTickerGlow} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeekGlow)})`);                   

  var weeklyAPRTotal;
  var dailyAPRTotal;
  var yearlyAPRTotal;

  var weeklyAPR = usdPerWeekDark / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  weeklyAPRTotal += weeklyAPR;
  dailyAPRTotal += dailyAPRTotal;
  yearlyAPRTotal+= yearlyAPRTotal;
  var darkAPRString = `\t${rewardTokenTickerDark} APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`;
  weeklyAPR = usdPerWeekSpark / staked_tvl * 100;
  dailyAPR = weeklyAPR / 7;
  yearlyAPR = weeklyAPR * 52;
  weeklyAPRTotal += weeklyAPR;
  dailyAPRTotal += dailyAPRTotal;
  yearlyAPRTotal+= yearlyAPRTotal;
  var sparkAPRString = `\t${rewardTokenTickerSpark} APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`;
  weeklyAPR = usdPerWeekGlow / staked_tvl * 100;
  dailyAPR = weeklyAPR / 7;
  yearlyAPR = weeklyAPR * 52;
  weeklyAPRTotal += weeklyAPR;
  dailyAPRTotal += dailyAPRTotal;
  yearlyAPRTotal+= yearlyAPRTotal;
  var glowAPRString = `\t${rewardTokenTickerGlow} APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`;
  _print_bold(`Total APR: Day ${dailyAPRTotal.toFixed(2)}% Week ${weeklyAPRTotal.toFixed(2)}% Year ${yearlyAPRTotal.toFixed(2)}%`);               
  _print(darkAPRString);
  _print(sparkAPRString);
  _print(glowAPRString);
  


  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);


  var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
  var userDailyRewards = userWeeklyRewards / 7;
  var userYearlyRewards = userWeeklyRewards * 52;

  /*
  if (userStaked > 0) {
    _print(`Estimated ${rewardTokenTickerDark} earnings:`
        + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPriceDark)})`
        + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPriceDark)})`
        + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPriceDark)})`);
    
    _print(`Estimated ${rewardTokenTickerSpark} earnings:`
    + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPriceSpark)})`
    + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPriceSpark)})`
    + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPriceSpark)})`);

    _print(`Estimated ${rewardTokenTickerGlow} earnings:`
    + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPriceGlow)})`
    + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPriceGlow)})`
    + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPriceGlow)})`);
  }
  */

  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
    yearlyAPR,
    userYearlyUsd : userYearlyRewards * rewardPriceDark + userYearlyRewards * rewardPriceSpark + userYearlyRewards * rewardPriceGlow
  }
}

function printTrzContractLinks(
                              App, 
                              chefAbi, 
                              chefAddr, 
                              poolIndex, 
                              poolAddress, 
                              pendingRewardsFunction,
                              rewardTokenTickerDark, 
                              rewardTokenTickerSpark, 
                              rewardTokenTickerGlow, 
                              stakeTokenTicker, 
                              unstaked, 
                              userStaked, 
                              pendingRewardTokensDark, 
                              pendingRewardTokensSpark, 
                              pendingRewardTokensGlow, 
                              fixedDecimals,
                              claimFunction, 
                              rewardTokenPriceDark, 
                              rewardTokenPriceSpark, 
                              rewardTokenPriceGlow, 
                              chain, 
                              depositFee, 
                              withdrawFee
                            ) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return trzContract_unstake(chefAbi, chefAddr, poolIndex, App)
  }
  const claim = async function() {
    return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  if(depositFee > 0){
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee/10}%`, approveAndStake)
  }else{
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  }
  if(withdrawFee > 0){
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
  }else{
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  }

  _print_link(
          `Claim All ${pendingRewardTokensDark.toFixed(fixedDecimals)} ${rewardTokenTickerDark} ($${formatMoney(pendingRewardTokensDark*rewardTokenPriceDark)})`
          + ` & ${pendingRewardTokensSpark.toFixed(fixedDecimals)} ${rewardTokenTickerSpark} ($${formatMoney(pendingRewardTokensSpark*rewardTokenPriceSpark)})`
          + ` & ${pendingRewardTokensGlow.toFixed(fixedDecimals)} ${rewardTokenTickerGlow} ($${formatMoney(pendingRewardTokensGlow*rewardTokenPriceGlow)})`
          , claim
        );
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const trzContract_unstake = async function(chefAbi, chefAddress, poolIndex, App) {
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