$(function() {
consoleInit(main)
});

const CYC_CHEF_ABI = [{"inputs":[{"internalType":"contract IMintableToken","name":"_cycToken","type":"address"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"address","name":"_router","type":"address"},{"internalType":"contract IERC20","name":"_wrappedCoin","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isBlockReward","type":"bool"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"constant":true,"inputs":[],"name":"accCYCPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cycToken","outputs":[{"internalType":"contract IMintableToken","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"emergencyWithdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"entranceFeeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lpToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardToDistribute","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"router","outputs":[{"internalType":"contract IRouter","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_entranceFeeRate","type":"uint256"}],"name":"setEntranceFeeRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"setRewardPerBlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"updateBlockReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wrappedCoin","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const CYC_CHEF_ADDR = "0xdc71bc29D12960a3EE5452FAC6F033A1B8E756FB";
  const rewardTokenTicker = "CYC";
  const CYC_CHEF = new ethers.Contract(CYC_CHEF_ADDR, CYC_CHEF_ABI, App.provider);
  const rewardsPerWeek = await CYC_CHEF.rewardPerBlock() / 1e18
      * 604800 / 13.5;

  await loadCycloneContract(App, CYC_CHEF, CYC_CHEF_ADDR, CYC_CHEF_ABI, rewardTokenTicker,
      "cycToken", null, rewardsPerWeek, "pendingReward");

  hideLoading();
}

async function loadCycloneContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  extraPrices, showAll) {
const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

const poolCount = 1;

_print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);

_print(`Showing incentivized pools only.\n`);

var tokens = {};

const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
const rewardsPerWeek = rewardsPerWeekFixed ??
  await chefContract.callStatic[rewardsPerBlockFunction]()
  / 10 ** rewardToken.decimals * 604800 / 13.5

const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
  await getCyclonePoolInfo(App, chefContract, chefAddress, pendingRewardsFunction, showAll)));

var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
var prices = await lookUpTokenPrices(tokenAddresses);
if (extraPrices) {
  for (const [k,v] of Object.entries(extraPrices)) {
    if (v.usd) {
      prices[k] = v
    }
  }
}

await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getToken(App, address, chefAddress);
}));

const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);

_print("Finished reading smart contracts.\n");

let aprs = []
for (let i = 0; i < poolCount; i++) {
  if (poolPrices[i]) {
    const apr = printCyclonePool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
      rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
      pendingRewardsFunction)
    aprs.push(apr);
  }
}
let totalUserStaked=0, totalStaked=0, averageApr=0;
for (const a of aprs) {
  if (a && !isNaN(a.totalStakedUsd)) {
    totalStaked += a.totalStakedUsd;
  }
  if (a && a.userStakedUsd > 0) {
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

async function getCyclonePoolInfo(app, chefContract, chefAddress, pendingRewardsFunction, showAll=false) {
const lpTokenAddress = await chefContract.lpToken();
const lastRewardBlock = await chefContract.lastRewardBlock();
const poolToken = await getToken(app, lpTokenAddress, chefAddress);
const userInfo = await chefContract.userInfo(app.YOUR_ADDRESS);
const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](app.YOUR_ADDRESS);
const staked = userInfo.amount / 10 ** poolToken.decimals;
return {
    address: lpTokenAddress,
    poolToken: poolToken,
    userStaked : staked,
    pendingRewardTokens : pendingRewardTokens / 10 ** 18,
    lastRewardBlock : lastRewardBlock
};
}

function printCyclonePool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
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
