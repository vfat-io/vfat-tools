
$(function() {
    consoleInit();
    start(main);
  });
  
const STRUDEL_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devFundDivRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"granularity","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token_","type":"address"},{"internalType":"uint256","name":"windowSize_","type":"uint256"},{"internalType":"uint8","name":"granularity_","type":"uint8"}],"name":"initVariance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strudel","type":"address"},{"internalType":"uint256","name":"_strudelPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_lastBlockHeight","type":"uint256"},{"internalType":"uint256","name":"_windowSize","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastBlockHeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestPos","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"observations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingStrudel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accStrudelPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_devFundDivRate","type":"uint256"}],"name":"setDevFundDivRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_strudelPerBlock","type":"uint256"}],"name":"setStrudelPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strudelPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateVariance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"windowSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {  
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const STRUDEL_CHEF_ADDR = "0x517b091FdB87A42c879BbB849444E76A324D53c8";
  const STRUDEL_CHEF = new ethers.Contract(STRUDEL_CHEF_ADDR, STRUDEL_CHEF_ABI, App.provider);

  const rewardTokenTicker = "$TRDL";

  await loadStrudelChefContract(App, STRUDEL_CHEF_ADDR, STRUDEL_CHEF_ABI, STRUDEL_CHEF, [1], rewardTokenTicker,
    "0x297D33e17e61C2Ddd812389C2105193f8348188a", "strudelPerBlock", "pendingStrudel")
  
  hideLoading();  
}

async function loadStrudelChefContract(App, chefAddress, chefAbi, chefContract, rewardTokenPoolIndex, rewardTokenTicker,
    tokenAddress, rewardsPerBlockFunction, pendingRewardsFunction) {

  const poolCount = await chefContract.poolLength();
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`Found ${poolCount} pools.\n`)

  var prices = {};
  var tokens = {};

  const rewardTokenAddress = tokenAddress;
  const rewardsPerWeek = await chefContract.callStatic[rewardsPerBlockFunction]() / 1e18 * 604800 / 13.5

  await loadStrudelChefPools(App, prices, tokens, rewardTokenPoolIndex, chefAbi, chefContract, chefAddress,
    totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewardsFunction, poolCount);
}

async function loadStrudelChefPools(App, prices, tokens, rewardTokenPoolIndex, 
  chefAbi, chefContract, chefAddress, totalAllocPoints, 
  rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewardsFunction, poolCount) {
//Loading the pool with the reward token first allows calculating the APY for the remaining ones
await loadStrudelChefPool(App, prices, tokens, rewardTokenPoolIndex, 
  chefAbi, chefContract, chefAddress, totalAllocPoints, 
  rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewardsFunction);

for (i = 0; i < poolCount; i++) {
  if (i != rewardTokenPoolIndex) {
      await loadStrudelChefPool(App, prices, tokens, i,
        chefAbi, chefContract, chefAddress, totalAllocPoints, 
        rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewardsFunction);
  }
}
}

async function loadStrudelChefPool(App, prices, tokens, poolIndex, 
  chefAbi, chefContract, chefAddr, totalAllocPoints, 
  rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, 
  pendingRewardsFunction) {  
const poolInfo = await getStrudlePoolInfo(App, chefContract, chefAddr, poolIndex, pendingRewardsFunction);
if(!poolInfo)
{
  return;
}
var newPriceAddresses = poolInfo.poolToken.tokens.filter(x => prices[x] == null);
var newPrices = await lookUpTokenPrices(newPriceAddresses);
for (const key in newPrices) {
prices[key] = newPrices[key];
}
var newTokenAddresses = poolInfo.poolToken.tokens.filter(x => tokens[x] == null);
await Promise.all(newTokenAddresses.map(async (address) => {
tokens[address] = await getToken(App, address, chefAddr);
}));

const poolPrices = getPoolPrices(tokens, prices, poolInfo.poolToken);

printChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
pendingRewardsFunction);
}

async function getStrudlePoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {  
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return null;
  }
  const poolToken = await getToken(app, poolInfo.lpToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  var stakedToken;
  var userLPStaked;
  if (poolInfo.stakedHoldableToken != null && 
    poolInfo.stakedHoldableToken != "0x0000000000000000000000000000000000000000") {
    stakedToken = await getToken(app, poolInfo.stakedHoldableToken, chefAddress);
    userLPStaked = userInfo.stakedLPAmount / 10 ** poolToken.decimals
  }
  return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      stakedToken : stakedToken,
      userLPStaked : userLPStaked,
      lastRewardBlock : poolInfo.lastRewardBlock
  };
}