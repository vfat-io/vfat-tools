$(function() {
    consoleInit();
    start(main);
  });

  async function getIchiPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction,
      rewardTokenDecimals) {  
    const lpToken = await chefContract.getPoolToken(poolIndex);
    const allocPoint = await chefContract.getAllocPoint(poolIndex);
    const lastRewardBlock = await chefContract.lastRewardsBlock(poolIndex);
    const poolToken = await getToken(app, lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    var stakedToken;
    var userLPStaked;
    return {
        address: lpToken,
        allocPoints: allocPoint,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** rewardTokenDecimals,
        stakedToken : stakedToken,
        userLPStaked : userLPStaked,
        lastRewardBlock : lastRewardBlock
    };
  }

  async function loadIchiContract(App,  chefAddress, chefAbi, rewardTokenTicker,
      rewardTokenFunction, rewardsPerBlockFunction, pendingRewardsFunction) {
    const chefContract = new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    _print(`Found ${poolCount} pools.\n`)
  
    var tokens = {};
  
    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardsPerWeek = await chefContract.callStatic[rewardsPerBlockFunction]() * 604800 / 13.5
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getIchiPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, 9)));
    
    var tokenAddresses = [].concat.apply([], poolInfos.map(x => x.poolToken.tokens));
    var prices = await lookUpTokenPrices(tokenAddresses);
    
    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getToken(App, address, chefAddress);
    }));
  
    const poolPrices = poolInfos.map(poolInfo => getPoolPrices(tokens, prices, poolInfo.poolToken));
  
    _print("Finished reading smart contracts.\n");
      
    for (i = 0; i < poolCount; i++) {
      printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, 10);
    }
  }
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const ICHI_FARM_ADDR = "0xcc50953a743b9ce382f423e37b07efa6f9d9b000";

    await loadIchiContract(App, ICHI_FARM_ADDR, ICHI_FARM_ABI, "ICHI", "ichi", "ichiPerBlock", "pendingIchi");
  
    hideLoading();  
  }