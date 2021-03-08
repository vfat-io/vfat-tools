
$(function() {
    consoleInit();
    start(main);
  });

const BVAULTS_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"target","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"string","name":"signature","type":"string"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"ExecuteTransaction","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"executor","type":"address"},{"indexed":false,"internalType":"uint256","name":"at","type":"uint256"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"rewardPid","type":"uint256"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_want","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"},{"internalType":"address","name":"_strategy","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"addRewardPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_wantAmt","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"string","name":"signature","type":"string"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"executeTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"inCaseTokensGetStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"address","name":"_bfi","type":"address"},{"internalType":"uint256","name":"_bfiRewardRate","type":"uint256"},{"internalType":"address","name":"_bdo","type":"address"},{"internalType":"uint256","name":"_bdoRewardRate","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_rewardPid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"want","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"address","name":"strategy","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardPoolInfo","outputs":[{"internalType":"address","name":"rewardToken","type":"address"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"totalPaidRewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPoolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_timelock","type":"address"}],"name":"setTimelock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_unstakingFrozenTime","type":"uint256"}],"name":"setUnstakingFrozenTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"bool","name":"_whitelisted","type":"bool"}],"name":"setWhitelisted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"stakedWantTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timelock","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_account","type":"address"}],"name":"unfrozenStakeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unstakingFrozenTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPid","type":"uint256"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"updateRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_strategy","type":"address"}],"name":"updateStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"lastStakeTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_wantAmt","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const BVAULTS_STRATEGY_ABI = [{"inputs":[{"internalType":"address","name":"_bvaultsBankAddress","type":"address"},{"internalType":"bool","name":"_isCAKEStaking","type":"bool"},{"internalType":"bool","name":"_isAutoComp","type":"bool"},{"internalType":"address","name":"_farmContractAddress","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_wantAddress","type":"address"},{"internalType":"address","name":"_token0Address","type":"address"},{"internalType":"address","name":"_token1Address","type":"address"},{"internalType":"address","name":"_earnedAddress","type":"address"},{"internalType":"address","name":"_uniRouterAddress","type":"address"},{"internalType":"address","name":"_buyBackToken1","type":"address"},{"internalType":"address","name":"_buyBackAddress1","type":"address"},{"internalType":"address","name":"_buyBackToken2","type":"address"},{"internalType":"address","name":"_buyBackAddress2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"earnedAddress","type":"address"},{"indexed":false,"internalType":"address","name":"buyBackToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"earnedAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"buyBackAmt","type":"uint256"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"}],"name":"BuyBack","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token0Address","type":"address"},{"indexed":false,"internalType":"uint256","name":"token0Amt","type":"uint256"},{"indexed":false,"internalType":"address","name":"token1Address","type":"address"},{"indexed":false,"internalType":"uint256","name":"token1Amt","type":"uint256"}],"name":"Compound","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"address","name":"earnedAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmt","type":"uint256"}],"name":"ConvertDustToEarned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"earnedAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"}],"name":"DistributeFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"earnedAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"earnedAmt","type":"uint256"}],"name":"Earned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"target","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"string","name":"signature","type":"string"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"ExecuteTransaction","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Farm","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"}],"name":"InCaseTokensGetStuck","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"busdAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackAddress1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackAddress2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackRate1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackRate2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackRateMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackRateUL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackToken1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackToken2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bvaultsBankAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controllerFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controllerFeeMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controllerFeeUL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"convertDustToEarned","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"_wantAmt","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earnedAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"earnedToBusdPath","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"earnedToBuyBackToken1Path","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"earnedToBuyBackToken2Path","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"earnedToToken0Path","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"earnedToToken1Path","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"entranceFeeFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"entranceFeeFactorLL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"entranceFeeFactorMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"string","name":"signature","type":"string"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"executeTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"farm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"farmContractAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"inCaseTokensGetStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAuthorised","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isAutoComp","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isCAKEStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEarnBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"notPublic","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingHarvest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingHarvestDollarValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_buyBackAddress1","type":"address"}],"name":"setBuyBackAddress1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_buyBackAddress2","type":"address"}],"name":"setBuyBackAddress2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_buyBackRate1","type":"uint256"}],"name":"setBuyBackRate1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_buyBackRate2","type":"uint256"}],"name":"setBuyBackRate2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_controllerFee","type":"uint256"}],"name":"setControllerFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_path","type":"address[]"}],"name":"setEarnedToBusdPath","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_path","type":"address[]"}],"name":"setEarnedToBuyBackToken1Path","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_path","type":"address[]"}],"name":"setEarnedToBuyBackToken2Path","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_path","type":"address[]"}],"name":"setEarnedToToken0Path","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_path","type":"address[]"}],"name":"setEarnedToToken1Path","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_entranceFeeFactor","type":"uint256"}],"name":"setEntranceFeeFactor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_notPublic","type":"bool"}],"name":"setNotPublic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strategist","type":"address"}],"name":"setStrategist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_timelock","type":"address"}],"name":"setTimelock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_path","type":"address[]"}],"name":"setToken0ToEarnedPath","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_path","type":"address[]"}],"name":"setToken1ToEarnedPath","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sharesTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timelock","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0Address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"token0ToEarnedPath","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1Address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"token1ToEarnedPath","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenAmount","type":"uint256"},{"internalType":"address[]","name":"_path","type":"address[]"}],"name":"uniExchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniRouterAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wantAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wantLockedTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbnbAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"_wantAmt","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]

async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const BVAULTS_CHEF_ADDR = "0xB390B07fcF76678089cb12d8E615d5Fe494b01Fb";
   const BVAULTS_CHEF = new ethers.Contract(BVAULTS_CHEF_ADDR, BVAULTS_CHEF_ABI, App.provider);

    const tokens = {};
    const prices = await getBscPrices();

    await loadBscBvaultsContract(App, tokens, prices, BVAULTS_CHEF, BVAULTS_CHEF_ADDR, BVAULTS_CHEF_ABI);

    hideLoading();  
  }

async function getRewardPoolInfo(App, chef, i) {
  const rewardPool = await chef.rewardPoolInfo(i)
  const rewardToken = await getBscToken(App, rewardPool.rewardToken, chef.address);
  const rewardsPerWeek = rewardPool.rewardPerBlock / 10 ** rewardToken.decimals * 604800 / 3;
  return {
    rewardToken,
    rewardsPerWeek
  }
}
async function loadBscBvaultsContract(App, tokens, prices, chef, chefAddress, chefAbi) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();
    
  _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};
  const rewardPoolLength = await chef.rewardPoolLength() / 1;
  const rewardPools = await Promise.all([...Array(rewardPoolLength).keys()].map(i =>
    getRewardPoolInfo(App, chef, i)))

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (i) =>
    await getBvaultsPoolInfo(App, chefContract, chefAddress, i, rewardPools)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBscToken(App, address, chefAddress);
  }));

  const poolPrices = poolInfos.map(poolInfo => getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc"));


  _print("Finished reading smart contracts.\n");
    
  for (let i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      printBvaultsPool(App, chefAbi, chefAddress, prices, poolInfos[i], i, poolPrices[i], rewardPools, totalAllocPoints);
    }
  }
}

async function getBvaultsPoolInfo(App, chefContract, chefAddress, poolIndex, rewardPools) {  
  const poolInfo = await chefContract.poolInfo(poolIndex);
  const STRATEGY = new ethers.Contract(poolInfo.strategy, BVAULTS_STRATEGY_ABI, App.provider)
  const poolToken = await getBscToken(App, poolInfo.want, chefAddress);
  const pendingRewards = 
    await Promise.all(rewardPools.map(async (v, i) => { 
      const pendingReward = await chefContract.pendingReward(poolIndex, i, App.YOUR_ADDRESS) / 1e18
      return { token : v.rewardToken, pendingReward }
    }));
  const userStaked =  await chefContract.stakedWantTokens(poolIndex, App.YOUR_ADDRESS) / 10 ** poolToken.decimals;
  const totalStaked = await STRATEGY.wantLockedTotal() / 10 ** poolToken.decimals;
  poolToken.staked = totalStaked;
  return {
      address: poolInfo.want,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked,
      totalStaked,
      pendingRewards
  };
}

function printBVaultsAPR(rewardPools, prices, stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice, poolRewardRatio) {
  let totalUsdPerWeek = 0;
  let totalDailyRewards = 0;
  let totalWeeklyRewards = 0;
  let totalYearlyRewards = 0;
  const rewardPrices = rewardPools.map(rp => getParameterCaseInsensitive(prices, rp.rewardToken.address).usd)
  for (let i = 0; i < rewardPools.length; i++) {
    let rewardsPerWeek = rewardPools[i].rewardsPerWeek * poolRewardRatio;
    let usdPerWeek =  rewardsPerWeek * rewardPrices[i]
    _print(`${rewardPools[i].rewardToken.symbol} Per Week: ${rewardsPerWeek.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
    totalUsdPerWeek += usdPerWeek;
  }
  var weeklyAPR = totalUsdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(2)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  if (userStaked > 0) {
    for (let i = 0; i < rewardPools.length; i++) {
      var userWeeklyRewards = userStakedPct * rewardPools[i].rewardsPerWeek * poolRewardRatio / 100;
      var userDailyRewards = userWeeklyRewards / 7;
      var userYearlyRewards = userWeeklyRewards * 52;
      _print(`Estimated ${rewardPools[i].rewardToken.symbol} earnings:`
  + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardPrices[i])})`
  + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardPrices[i])})`
  + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardPrices[i])})`);
      totalDailyRewards += userDailyRewards * rewardPrices[i];
      totalWeeklyRewards += userWeeklyRewards * rewardPrices[i];
      totalYearlyRewards += userYearlyRewards * rewardPrices[i];
    }
    _print(`Estimated total earnings:`
    + ` Day $${formatMoney(totalDailyRewards)}`
    + ` Week $${formatMoney(totalWeeklyRewards)}`
    + ` Year $${formatMoney(totalYearlyRewards)}`);
  }
}
function printBvaultsPool(App, chefAbi, chefAddr, prices, poolInfo, poolIndex, poolPrices, rewardPools, totalAllocPoints) {  
  const staked_tvl = poolInfo.totalStaked * poolPrices.price;
  poolPrices.print_price("bsc");
  const poolRatio = poolInfo.allocPoints / totalAllocPoints
  printBVaultsAPR(rewardPools, prices, poolPrices.stakeTokenTicker, staked_tvl, poolInfo.userStaked, poolPrices.price, poolRatio);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(poolInfo.userStaked);
  printBvaultsContractLinks(App, chefAbi, chefAddr, poolInfo, poolIndex, poolInfo.address,
    poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked, 
    poolInfo.userStaked, prices);
}

function printBvaultsContractLinks(App, chefAbi, chefAddr, poolInfo, poolIndex, poolAddress,
   stakeTokenTicker, unstaked, userStaked, prices) {
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }      
  const unstake = async function() {
    return bvaultsContract_unstake(chefAbi, chefAddr, poolIndex, App)
  }      
  const claim = async function() {
    return bvaultsContract_claim(chefAbi, chefAddr, poolIndex, App)
  }
  _print_link(`Stake ${unstaked.toFixed(2)} ${stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(2)} ${stakeTokenTicker}`, unstake)
  let tokensToClaim = "", totalRewardUsd = 0
  for (const pr of poolInfo.pendingRewards) {
    const rewardPrice = getParameterCaseInsensitive(prices, pr.token.address).usd;
    const rewardUsd = rewardPrice * pr.pendingReward
    tokensToClaim += `${pr.pendingReward.toFixed(4)} ${pr.token.symbol} ($${formatMoney(rewardUsd)}) `;    
    totalRewardUsd += rewardUsd;
  }
  tokensToClaim += `- Total $${formatMoney(totalRewardUsd)}`
  _print_link(`Claim ${tokensToClaim}`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print(`\n`);
}

const bvaultsContract_unstake = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const stakedWantTokens = await CHEF_CONTRACT.stakedWantTokens(poolIndex, App.YOUR_ADDRESS) / 1e18

  if (stakedWantTokens > 0) {
    showLoading()
    CHEF_CONTRACT.withdraw(poolIndex, stakedWantTokens, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const bvaultsContract_claim = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const stakedWantTokens = await CHEF_CONTRACT.stakedWantTokens(poolIndex, App.YOUR_ADDRESS) / 1e18

  if (stakedWantTokens > 0) {
    showLoading()
    CHEF_CONTRACT.deposit(poolIndex, 0, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}