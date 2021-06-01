
$(function() {
consoleInit(main)
  });

  const XDEX_CHEF_ABI = [{"inputs":[{"internalType":"contract XDEX","name":"_xdex","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"address","name":"_safu","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":true,"internalType":"uint256","name":"lpType","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpFactor","type":"uint256"}],"name":"AddLP","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":true,"internalType":"uint256","name":"lpType","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpFactor","type":"uint256"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_core","type":"address"},{"indexed":true,"internalType":"address","name":"_coreNew","type":"address"}],"name":"SetCore","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"safu","type":"address"},{"indexed":true,"internalType":"address","name":"_safu","type":"address"}],"name":"SetSafu","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_stream","type":"address"},{"indexed":true,"internalType":"address","name":"_streamNew","type":"address"}],"name":"SetStream","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"SetVotingPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"lpFactor","type":"uint256"}],"name":"UpdateFactor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_lpTokenType","type":"uint256"},{"internalType":"uint256","name":"_lpFactor","type":"uint256"}],"name":"addLpTokenToPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_lpTokenType","type":"uint256"},{"internalType":"uint256","name":"_lpFactor","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"addPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"batchCollectReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bonusEndBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bonusFirstDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claimRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimableTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"core","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCurRewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getLpTokenInfosByPoolId","outputs":[{"internalType":"address[]","name":"lpTokens","type":"address[]"},{"internalType":"uint256[]","name":"lpTokenTypes","type":"uint256[]"},{"internalType":"uint256[]","name":"lpFactors","type":"uint256[]"},{"internalType":"uint256[]","name":"lpAccPerShares","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"getUserLpAmounts","outputs":[{"internalType":"address[]","name":"lpTokens","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getXCountToReward","outputs":[{"internalType":"uint256","name":"_totalReward","type":"uint256"},{"internalType":"uint256","name":"_stageFrom","type":"uint256"},{"internalType":"uint256","name":"_stageTo","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"massUpdatePools","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingXDEX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"poolFactor","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"safu","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_core","type":"address"}],"name":"setCore","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_lpFactor","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"setLpFactor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_safu","type":"address"}],"name":"setSafu","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_stream","type":"address"}],"name":"setStream","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"setVotingPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stream","outputs":[{"internalType":"contract XdexStream","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokensPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalXFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"bool","name":"claimable","type":"bool"}],"name":"updateClaimableTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"votingPoolId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"xdex","outputs":[{"internalType":"contract XDEX","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const XDEX_CHEF_ADDR = "0x7f478b6c313cAE4d36c1A6c0FB7c366b441BDE58";
    const rewardTokenTicker = "XDEX";
    const XDEX_CHEF = new ethers.Contract(XDEX_CHEF_ADDR, XDEX_CHEF_ABI, App.provider);
    let startBlock = await XDEX_CHEF.startBlock();
    const currentBlock = await App.provider.getBlockNumber();
    let epoch = 0;
    let bonusEndBlock0 = startBlock + 60000
    let bonusEndBlock1 = startBlock + 180000
    let bonusEndBlock2 = startBlock + 420000
    let bonusEndBlock3 = startBlock + 900000
    if(bonusEndBlock0 >= currentBlock){
      epoch = 0;
    }else if(bonusEndBlock1 > currentBlock){
      epoch = 1;
    }else if(bonusEndBlock2 >= currentBlock){
      epoch = 2;
    }else if(bonusEndBlock3 >= currentBlock){
      epoch = 3;
    }else{
      epoch = 4;
    }

    const rewardsPerWeek = await XDEX_CHEF.tokensPerBlock(epoch) / 1e18
        * 604800 / 13.5;

    await loadXdefiContract(App, XDEX_CHEF, XDEX_CHEF_ADDR, XDEX_CHEF_ABI, rewardTokenTicker,
        "xdex", null, rewardsPerWeek, "pendingXDEX");

    hideLoading();
  }

  async function loadXdefiContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction, extraPrices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalXFactor() / 1e18;

  _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 13.5

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
    try {
      return await getXdefiPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)
    }
    catch (ex) {
      console.log(`Error loading pool ${x}: ${ex}`);
      return null;
    }
  }));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));
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

  const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (let i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
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

async function getXdefiPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.getLpTokenInfosByPoolId(poolIndex);
  if(poolInfo.lpTokens.length > 1){
    console.log(poolIndex, poolInfo);
  }
  const lpToken = poolInfo.lpTokens;
  const allocPoint = poolInfo.lpFactors;
  const poolToken = await getToken(app, lpToken[0], chefAddress);
  const userInfo = await chefContract.getUserLpAmounts(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amounts[0] / 10 ** poolToken.decimals;
  return {
      address: lpToken[0],
      allocPoints: allocPoint[0] / 1e18 ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      lastRewardBlock : poolInfo.lastRewardBlock
  };
}
