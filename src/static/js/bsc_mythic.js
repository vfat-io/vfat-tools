
$(function() {
  consoleInit();
  start(main);
});

const MAGIC_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"magic","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"magicPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accMagicPerShare","type":"uint256"},{"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"internalType":"uint256","name":"rewardsAmount","type":"uint256"},{"internalType":"uint256","name":"lockupDuration","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_magicPerBlock","type":"uint256"}],"name":"setMagicPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_magic","type":"address"}],"name":"setMagicToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startBlock","type":"uint256"}],"name":"startStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"pendingRewards","type":"uint256"},{"internalType":"uint256","name":"lastClaim","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const MYTHIC_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"liquidityMining","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accMythicPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mythic","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mythicPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_mythic","type":"address"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"}],"name":"setMythicTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mythicPerBlock","type":"uint256"}],"name":"setmythicPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startBlock","type":"uint256"}],"name":"startMining","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"pendingRewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {  
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

 const MAGIC_ADDR = "0x016c4DE5d33C88EeC2339D914C30AAdC6D82f1Ea";
 const MYTHIC_ADDR0 = "0x46B46A9B0D29895E4e784C13b8F8f23Cd40E10C0";
 const MYTHIC_ADDR1 = "0x4B668E8acF7Bc56dBA246a9bf4604eF1F49227e5";
 const rewardTokenTicker = "MAGIC";
 const MAGIC_CONTRACT = new ethers.Contract(MAGIC_ADDR, MAGIC_ABI, App.provider);
 const MYTHIC_CONTRACT0 = new ethers.Contract(MYTHIC_ADDR0, MYTHIC_ABI, App.provider);
 const MYTHIC_CONTRACT1 = new ethers.Contract(MYTHIC_ADDR1, MYTHIC_ABI, App.provider);

 const rewardsMagicPerWeek = await MAGIC_CONTRACT.magicPerBlock() /1e18
      * 604800 / 3;
  
  const rewardsMythicPerWeek0 = await MYTHIC_CONTRACT0.mythicPerBlock() /1e18
      * 604800 / 3;

  const rewardsMythicPerWeek1 = await MYTHIC_CONTRACT1.mythicPerBlock() /1e18
      * 604800 / 3;

  const tokens = {};
  const prices = await getBscPrices();

  await loadMagicContract(App, tokens, prices, MAGIC_CONTRACT, MAGIC_ADDR, MAGIC_ABI, rewardTokenTicker,
      "magic", null, rewardsMagicPerWeek, "pendingRewards");

  await loadMythicContract(App, tokens, prices, MYTHIC_CONTRACT0, MYTHIC_ADDR0, MYTHIC_ABI, rewardTokenTicker,
      "mythic", null, rewardsMythicPerWeek0, "pendingRewards");

  await loadMythicContract(App, tokens, prices, MYTHIC_CONTRACT1, MYTHIC_ADDR1, MYTHIC_ABI, rewardTokenTicker,
      "mythic", null, rewardsMythicPerWeek1, "pendingRewards");

  hideLoading();  
}

async function loadMagicContract(App, tokens, prices, contract, contractAddress, abi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = contract ?? new ethers.Contract(contractAddress, abi, App.provider);

  const poolCount = 3;
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getBscToken(App, rewardTokenAddress, contractAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolMagicInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBscMagicPoolInfo(App, chefContract, contractAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolMagicInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBscToken(App, address, contractAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolMagicInfos[i])
                     .map(poolInfo => 
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);
  }

  const poolPrices = poolMagicInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);
  
  _print("Finished reading smart contracts.\n");
    
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      printChefPool(App, abi, contractAddress, prices, tokens, poolMagicInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction);
    }
  }
}

async function loadMythicContract(App, tokens, prices, contract, contractAddress, abi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction, deathPoolIndices) {
  const chefContract = contract ?? new ethers.Contract(contractAddress, abi, App.provider);

  const totalAllocPoints = 1000;  //thelei diorthwsi

  _print(`Found 2 pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getBscToken(App, rewardTokenAddress, contractAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 3

  const mythicInfo = await getBscMythicPoolInfo(App, chefContract, contractAddress, pendingRewardsFunction);

  var tokenAddresses = [].concat.apply([], mythicInfo.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBscToken(App, address, contractAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => mythicInfos[i])
                     .map(poolInfo => 
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);
  }

  const poolPrices = getPoolPrices(tokens, prices, poolInfo.poolToken);
  
  _print("Finished reading smart contracts.\n");

  printChefPool(App, abi, contractAddress, prices, tokens, mythicInfo, poolPrices,
    totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
    pendingRewardsFunction);
  }

  async function getBscMagicPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {  
    const poolInfo = await chefContract.poolInfo(poolIndex);
    const lpToken = await chefContract.magic();
    if (poolInfo.allocPoint == 0) {
      return {
        address: lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
        stakedToken : null,
        userLPStaked : 0,
        lastRewardBlock : poolInfo.lastRewardBlock
      };
    }
    const poolToken = await getBscToken(app, lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    var stakedToken;
    var userLPStaked;
    if (poolInfo.stakedHoldableToken != null && 
      poolInfo.stakedHoldableToken != "0x0000000000000000000000000000000000000000") {
      stakedToken = await getBscToken(app, poolInfo.stakedHoldableToken, chefAddress);
      userLPStaked = userInfo.stakedLPAmount / 10 ** poolToken.decimals
    }
    return {
        address: lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        stakedToken : stakedToken,
        userLPStaked : userLPStaked,
        lastRewardBlock : poolInfo.lastRewardBlock
    };
  }
  
  async function getBscMythicPoolInfo(app, chefContract, chefAddress, pendingRewardsFunction) {  
    const poolInfo = await chefContract.liquidityMining();
    const poolToken = await getBscToken(app, poolInfo.lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    var stakedToken;
    var userLPStaked;
    if (poolInfo.stakedHoldableToken != null && 
      poolInfo.stakedHoldableToken != "0x0000000000000000000000000000000000000000") {
      stakedToken = await getBscToken(app, poolInfo.stakedHoldableToken, chefAddress);
      userLPStaked = userInfo.stakedLPAmount / 10 ** poolToken.decimals
    }
    return {
        address: poolInfo.lpToken,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        stakedToken : stakedToken,
        userLPStaked : userLPStaked,
        lastRewardBlock : poolInfo.lastRewardBlock
    };
  }