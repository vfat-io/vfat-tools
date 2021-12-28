$(function() {
consoleInit(main)
  });

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const GOLD_CHEF_ADDR = "0x5D72df17D6437Df78D91643b090881badCEf76E8";
    const GOLD_CHEF_ABI = [{"inputs":[{"internalType":"contract IAlchemist","name":"_alchemist","type":"address"},{"internalType":"contract IERC20","name":"_goldToken","type":"address"},{"internalType":"address","name":"_feeAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_goldPerBlock","type":"uint256"},{"internalType":"uint256","name":"_goldStartBlock","type":"uint256"},{"internalType":"uint256","name":"_goldEndBlock","type":"uint256"},{"internalType":"uint256","name":"_minHodlBlocks","type":"uint256"},{"internalType":"uint256","name":"_earlyWithdrawalFeeBps","type":"uint256"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"alchemist","outputs":[{"internalType":"contract IAlchemist","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"goldToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"address","name":"stakingToken","type":"address"},{"internalType":"uint256","name":"totalStaked","type":"uint256"},{"internalType":"uint256","name":"goldPerBlock","type":"uint256"},{"internalType":"uint256","name":"goldStartBlock","type":"uint256"},{"internalType":"uint256","name":"goldEndBlock","type":"uint256"},{"internalType":"uint256","name":"accGoldPerShare_e24","type":"uint256"},{"internalType":"uint256","name":"lastUpdateBlock","type":"uint256"},{"internalType":"uint256","name":"minHodlBlocks","type":"uint256"},{"internalType":"uint256","name":"earlyWithdrawalFeeBps","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IAlchemist","name":"_alchemist","type":"address"}],"name":"setAlchemist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_goldEndBlock","type":"uint256"},{"internalType":"uint256","name":"_minHodlBlocks","type":"uint256"}],"name":"shutdownPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"staked","type":"uint256"},{"internalType":"uint256","name":"goldDebt","type":"uint256"},{"internalType":"uint256","name":"depositBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const GOLD_CHEF = new ethers.Contract(GOLD_CHEF_ADDR, GOLD_CHEF_ABI, App.provider);

    const tokens = {};
    const prices = await getBscPrices();

    await loadBagChefContract(App, tokens, prices, GOLD_CHEF, GOLD_CHEF_ADDR, GOLD_CHEF_ABI, "BGLD", "pendingReward");

    hideLoading();
  }

async function getBagPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return {
      address: poolInfo.stakingToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
      stakedToken : null,
      userLPStaked : 0,
      lastRewardBlock : poolInfo.lastRewardBlock
    };
  }
  const rewardTokenAddress = "0x336f7471a39c3ee4bdbe3a07b33724d3cbf7f4f7";
  const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
  const poolToken = await getBscToken(App, poolInfo.stakingToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
  const staked = userInfo.staked / 10 ** poolToken.decimals;
  const rewardsPerWeek =  poolInfo.goldPerBlock
    / 10 ** rewardToken.decimals * 604800 / 3
  const poolTotalStaked = poolInfo.totalStaked;
  poolToken.staked = poolTotalStaked / 10 ** poolToken.decimals;
  return {
      address: poolInfo.stakingToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      depositFee : (poolInfo.depositFeeBP ?? 0) / 10000,
      withdrawFee : (poolInfo.earlyWithdrawalFeeBps ?? 0) / 10000,
      rewardsPerWeek : rewardsPerWeek,
      rewardTokenAddress : rewardTokenAddress
  };
}

async function loadBagChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);

  _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBagPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBscToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolBagPrices(tokens, prices, poolInfo.poolToken) : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolBagPrices(tokens, prices, poolInfo.poolToken) : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printBagPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].rewardsPerWeek, rewardTokenTicker, poolInfos[i].rewardTokenAddress,
        pendingRewardsFunction)
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

function printBagPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
  rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
  pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolBagPrices(tokens, prices, poolInfo.stakedToken);
  var poolRewardsPerWeek = rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.staked ?? poolInfo.userStaked;
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

function getPoolBagPrices(tokens, prices, pool) {
  if (pool.w0 != null) return getValuePrices(tokens, prices, pool);
  if (pool.poolTokens != null) return getBalancerPrices(tokens, prices, pool);
  if (pool.token0 != null) return getUniPrices(tokens, prices, pool);
  if (pool.virtualPrice != null) return getCurvePrices(prices, pool); //should work for saddle too
  if (pool.token != null) return getWrapPrices(tokens, prices, pool);
  return getBagPrices(prices, pool);
}

function getBagPrices(prices, pool) {
  var price = getParameterCaseInsensitive(prices,pool.address)?.usd;
  var tvl = pool.totalSupply * price / 10 ** pool.decimals;
  var staked_tvl = pool.staked * price;
  let poolUrl =`https://bscscan.com/token/${pool.address}`;
  const name = `<a href='${poolUrl}' target='_blank'>${pool.symbol}</a>`;
  return {
    staked_tvl : staked_tvl,
    price : price,
    stakeTokenTicker : pool.symbol,
    print_price() {
      _print(`${name} Price: $${formatMoney(price)} Market Cap: $${formatMoney(tvl)}`);
      _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
    },
    print_contained_price() {
    }
  }
}