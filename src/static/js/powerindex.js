$(function() {
    consoleInit();
    start(main);
  });

  async function getPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {  
    const poolInfo = await chefContract.pools(poolIndex);
    const poolToken = await getToken(app, poolInfo.lpToken, chefAddress);
    const userInfo = await chefContract.users(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.lptAmount / 10 ** poolToken.decimals;
    return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoint,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        stakedToken : null,
        userLPStaked : null,
        lastRewardBlock : null
    };
  }

  async function loadCvpContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
      rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();

    _print(`Found ${poolCount} pools.\n`);

    _print(`Showing incentivized pools only.\n`);

    _print(`*** Important ***`);
    _print(`Rewards are vested over 10 weeks.`);
    _print(`The claim numbers below are not correct, they are showing the full unvested amount. You will receive up to 99% less when claiming.\n`);

    var tokens = {};

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ?? 
      await chefContract.callStatic[rewardsPerBlockFunction]() 
      / 10 ** rewardToken.decimals * 604800 / 13.5

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
    
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
        pendingRewardsFunction);
    }
  }
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const CVP_CHEF_ADDR = "0xf09232320ebeac33fae61b24bb8d7ca192e58507";
    const rewardTokenTicker = "CVP";

    await loadCvpContract(App, null, CVP_CHEF_ADDR, CVP_CHEF_ABI, rewardTokenTicker,
        "cvp", "cvpPerBlock", null, "pendingCvp");

    hideLoading();  
  }