
$(function() {
consoleInit(main)
  });

const PLS_CHEF_ABI = [{"inputs":[{"internalType":"address","name":"_pls","type":"address"},{"internalType":"address","name":"_gov","type":"address"},{"internalType":"uint256","name":"_initialEmission","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":false,"internalType":"uint256","name":"newAmount","type":"uint256"}],"name":"UpdateEmissionRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"MONTH_IN_SECONDS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PLS","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingPls","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"plsPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardSecond","type":"uint256"},{"internalType":"uint256","name":"accPlsPerShare","type":"uint256"},{"internalType":"uint256","name":"lpSupply","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_plsPerSecond","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const PLS_CHEF_MULTI_REWARDS_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsDistro","type":"address"},{"internalType":"address","name":"_plsJones","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"DEPOSIT_ERROR","type":"error"},{"inputs":[],"name":"UNAUTHORIZED","type":"error"},{"inputs":[],"name":"WITHDRAW_ERROR","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accJonesPerShare","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accPlsDpxPerShare","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accPlsJonesPerShare","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accPlsPerShare","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint96","name":"_amount","type":"uint96"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint88","name":"_amount","type":"uint88"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"harvestFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastRewardSecond","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"_pendingPls","type":"uint256"},{"internalType":"uint256","name":"_pendingPlsDpx","type":"uint256"},{"internalType":"uint256","name":"_pendingPlsJones","type":"uint256"},{"internalType":"uint256","name":"_pendingJones","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"plsJones","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint80","name":"_rewardRatePerSecond","type":"uint80"}],"name":"rewardPerShare","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDistro","outputs":[{"internalType":"contract IRewardsDistro","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_startTime","type":"uint32"}],"name":"setStartTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_whitelist","type":"address"}],"name":"setWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateShares","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint96","name":"amount","type":"uint96"},{"internalType":"int128","name":"plsRewardDebt","type":"int128"},{"internalType":"int128","name":"plsDpxRewardDebt","type":"int128"},{"internalType":"int128","name":"plsJonesRewardDebt","type":"int128"},{"internalType":"int128","name":"jonesRewardDebt","type":"int128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whitelist","outputs":[{"internalType":"contract IWhitelist","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint96","name":"_amount","type":"uint96"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint88","name":"_amount","type":"uint88"}],"name":"withdrawFor","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const DISTRO_REWARDS_ABI = [{"inputs":[{"internalType":"address","name":"_pendingRewards","type":"address"},{"internalType":"address","name":"_staker","type":"address"},{"internalType":"address","name":"_pls","type":"address"},{"internalType":"address","name":"_plsDpx","type":"address"},{"internalType":"address","name":"_plsJones","type":"address"},{"internalType":"address","name":"_jones","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"UNAUTHORIZED","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"getEmissions","outputs":[{"internalType":"uint80","name":"pls_","type":"uint80"},{"internalType":"uint80","name":"plsDpx_","type":"uint80"},{"internalType":"uint80","name":"plsJones_","type":"uint80"},{"internalType":"uint80","name":"jones_","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestFromUnderlyingFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"jones","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingRewards","outputs":[{"internalType":"contract IPendingRewards","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pls","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"plsDpx","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"plsDpxPerSecond","outputs":[{"internalType":"uint80","name":"","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"plsJones","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"plsJonesPerSecond","outputs":[{"internalType":"uint80","name":"","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"plsPerSecond","outputs":[{"internalType":"uint80","name":"","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"plutusChef","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"}],"name":"retrieve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardsController","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint128","name":"_plsAmt","type":"uint128"},{"internalType":"uint128","name":"_plsDpxAmt","type":"uint128"},{"internalType":"uint128","name":"_plsJonesAmt","type":"uint128"},{"internalType":"uint128","name":"_jonesAmt","type":"uint128"}],"name":"sendRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newPlutusChef","type":"address"}],"name":"setPlutusChef","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newController","type":"address"}],"name":"setRewardsController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"staker","outputs":[{"internalType":"contract IJonesStaker","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateInfo","outputs":[{"internalType":"uint80","name":"pls_","type":"uint80"},{"internalType":"uint80","name":"plsDpx_","type":"uint80"},{"internalType":"uint80","name":"plsJones_","type":"uint80"},{"internalType":"uint80","name":"pendingJonesLessFee_","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_newPlsDpxRate","type":"uint80"}],"name":"updatePlsDpxEmissions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint80","name":"_newPlsRate","type":"uint80"}],"name":"updatePlsEmission","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint80","name":"_newPlsJonesRate","type":"uint80"}],"name":"updatePlsJonesEmissions","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const PLS_CHEF_ADDR = "0x5593473e318f0314eb2518239c474e183c4cbed5";
   const PLS_CHEF_ADDR2 = "0x23b87748b615096d1a0f48870daee203a720723d";
   const PLS_CHEF_ADDR3 = "0x20df4953ba19c74b2a46b6873803f28bf640c1b5";
   const rewardTokenTicker = "PLS";
   const PLS_CHEF = new ethers.Contract(PLS_CHEF_ADDR, PLS_CHEF_ABI, App.provider);
   const PLS_CHEF2 = new ethers.Contract(PLS_CHEF_ADDR2, PLS_CHEF_MULTI_REWARDS_ABI, App.provider);
   const PLS_CHEF3 = new ethers.Contract(PLS_CHEF_ADDR3, PLS_CHEF_MULTI_REWARDS_ABI, App.provider);

   const rewardsPerWeek = await PLS_CHEF.plsPerSecond() /1e18 * 604800;

    const tokens = {};
    const prices = await getArbitrumPrices();
    //prices["0xe7f6c3c1f0018e4c08acc52965e5cbff99e34a44"] = prices["0x10393c20975cF177a3513071bC110f7962CD67da"] //JONES may be differents between plsJONES and JONES
    prices["0xf236ea74b515ef96a9898f5a4ed4aa591f253ce1"] = prices["0x6C2C06790b3E3E3c38e12Ee22F8183b37a13EE55"] //DPX

    

    await loadArbitrumChefContract(App, tokens, prices, PLS_CHEF, PLS_CHEF_ADDR, PLS_CHEF_ABI, rewardTokenTicker,
        "PLS", null, rewardsPerWeek, "pendingPls");

    _print_bold("\nMultiple Reward Pools\n")

    await loadPlutusChefContract(App, tokens, prices, PLS_CHEF2, PLS_CHEF_ADDR2, PLS_CHEF_MULTI_REWARDS_ABI, rewardTokenTicker,
      "0x51318b7d00db7acc4026c88c3952b66278b6a67f", null, rewardsPerWeek, "pendingRewards");

    _print("")

    await loadPlutusChefContract(App, tokens, prices, PLS_CHEF3, PLS_CHEF_ADDR3, PLS_CHEF_MULTI_REWARDS_ABI, rewardTokenTicker,
      "0x51318b7d00db7acc4026c88c3952b66278b6a67f", null, rewardsPerWeek, "pendingRewards");
    hideLoading();
  }

async function getPlutusPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction, rewardToken) {
  const poolInfoAddress = await chefContract.rewardsDistro();
  const poolInfo = new ethers.Contract(poolInfoAddress, DISTRO_REWARDS_ABI, app.provider);
  let stakingTokenAddress = "";
  if(chefAddress.toLowerCase() === "0x20df4953ba19c74b2a46b6873803f28bf640c1b5".toLowerCase()){
    //STAKING TOKEN plsDPX
    stakingTokenAddress = "0xf236ea74b515ef96a9898f5a4ed4aa591f253ce1";
  }else{
    //STAKING TOKEN plsJONES
    stakingTokenAddress = "0xe7f6c3c1f0018e4c08acc52965e5cbff99e34a44";
  }
  const poolToken = await getArbitrumToken(app, stakingTokenAddress, chefAddress);
  const userInfo = await chefContract.userInfo(app.YOUR_ADDRESS);
  const _pendingRewardTokens = await chefContract.pendingRewards(app.YOUR_ADDRESS);
  const pendingRewardTokens = _pendingRewardTokens.map(r => r / 10 ** 18);
  const rewardsPerWeek = await poolInfo.plsPerSecond() / 10 ** rewardToken.decimals * 604800 / 13.5
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
    address: stakingTokenAddress,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewardTokens: pendingRewardTokens,
    rewardsPerWeek: rewardsPerWeek
  };
}

async function loadPlutusChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenAddress, pendingRewardsFunction, claimFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = 1

  _print(`<a href='https://arbiscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);

  const rewardToken = await getArbitrumToken(App, rewardTokenAddress, chefAddress);

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getPlutusPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, rewardToken)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  tokenAddresses.push("0x10393c20975cf177a3513071bc110f7962cd67da")

  await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getArbitrumToken(App, address, chefAddress);
  }));

  const jonesSlp = await getArbitrumToken(App, "0xe8ee01ae5959d3231506fcdef2d5f3e85987a39c", "0xb94d1959084081c5a11c460012ab522f5a0fd756");
  const plsJONES = getParameterCaseInsensitive(tokens, "0xe7f6C3c1F0018E4C08aCC52965e5cbfF99e34A44");
  const jonesSlpPrice = getPoolPrices(tokens, prices, jonesSlp, "arbitrum")
  const calc = jonesSlp.staked * jonesSlpPrice.price;
  const plsJonesTotalSupply = plsJONES.totalSupply / 1e18;
  const plsJonesPrice = calc / plsJonesTotalSupply;
  prices["0xe7f6c3c1f0018e4c08acc52965e5cbff99e34a44"] = { usd : plsJonesPrice };

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printPlutusChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, claimFunction, "arbitrum")
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

function printPlutusChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
  rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
  pendingRewardsFunction, fixedDecimals, claimFunction, chain = "eth") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = rewardsPerWeek;
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
  printPlutusChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain);
  return apr;
}

function printPlutusChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
  rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
  claimFunction, rewardTokenPrice, chain) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function () {
    return plutusArbitrumContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function () {
    return plutusArbitrumContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  const claim = async function () {
    return plutusArbitrumContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens[0].toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens[0] * rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const plutusArbitrumContract_stake = async function (chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function () {
        CHEF_CONTRACT.deposit(currentTokens)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading()
            })
          })
          .catch(function () {
            hideLoading()
            _print('Something went wrong.')
          })
      })
      .catch(function () {
        hideLoading()
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const plutusArbitrumContract_unstake = async function (chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    CHEF_CONTRACT.withdraw(currentStakedAmount)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
      })
  }
}

const plutusArbitrumContract_claim = async function (chefAbi, chefAddress, poolIndex, App,
  pendingRewardsFunction, claimFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  CHEF_CONTRACT.harvest()
        .then(function (t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function () {
          hideLoading()
        })
}