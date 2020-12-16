$(function() {
    consoleInit();
    start(main);
  });
  
async function loadStablePools(App, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = await chefContract.poolLength() / 1;

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

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

  const BSDS_DAI_BALANCER_POOL = "0xdD82e4227BaeC1Fc40a72ef9895f38f2C1Df4F42";

  const BSD_USDC_BALANCER_POOL = "0xCDD2bD61D07b8d42843175dd097A4858A8f764e7";
  
  for (const balPoolAddress of [ BSDS_DAI_BALANCER_POOL, BSD_USDC_BALANCER_POOL]) {
    const balPool = await getToken(App, balPoolAddress, chefAddress);
    var newTokenAddresses = balPool.tokens.filter(x => tokens[x] == null);
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, balPoolAddress);
    }
    const balPoolPrices = getPoolPrices(tokens, prices, balPool);
    balPoolPrices.print_price();
    _print('');
  }
    
  for (i = 0; i < poolCount; i++) {
    printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
      poolCount, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
      pendingRewardsFunction);
  }
}

  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const STABLES_POOL_ADDR = "0xa249ee8255dF0AA00A15262b16BCA3eFD66c3E4C";
    const rewardTokenTicker = "BSD";
    const rewardsPerWeek = 200000;

    await loadStablePools(App, null, STABLES_POOL_ADDR, STABLES_POOL_ABI, rewardTokenTicker,
        "bsd", null, rewardsPerWeek, "pendingBasisDollar");

    hideLoading();  
  }