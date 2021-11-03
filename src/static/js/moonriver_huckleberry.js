
$(function () {
  consoleInit(main)
});

const FINN_FARM_ABI = [{ "inputs": [{ "internalType": "contract FINN", "name": "_finn", "type": "address" }, { "internalType": "address", "name": "_devaddr", "type": "address" }, { "internalType": "uint256", "name": "_finnPerSecond", "type": "uint256" }, { "internalType": "uint256", "name": "_startTime", "type": "uint256" }, { "internalType": "uint256", "name": "_allEndTime", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "EXTRA_PERCENT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USER_PERCENT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "allEndTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "devaddr", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "finn", "outputs": [{ "internalType": "contract FINN", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "finnPerSecond", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IERC20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "accRewardPerShare", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_lpToken", "type": "address" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_devaddr", "type": "address" }], "name": "dev", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const FINN_FARM_ADDR = "0x1f4b7660b6AdC3943b5038e3426B33c1c0e343E6";
  const rewardTokenTicker = "FINN";

  const customURLs =
  {
    add: "https://www.huckleberry.finance/#/add",
    remove: "https://www.huckleberry.finance/#/remove",
    swap: "https://www.huckleberry.finance/#/swap",
    info: "https://info.huckleberry.finance/pair"
  }

  const FINN_FARM = new ethers.Contract(FINN_FARM_ADDR, FINN_FARM_ABI, App.provider);

  //  const blocksPerSeconds = await getAverageBlockTime(App);
  const startBlock = 605121;//await FINN_FARM.startTime();
  const currentBlock = await App.provider.getBlockNumber();

  let rewardsPerWeek = 0
  if (currentBlock < startBlock) {
    _print(`REWARDS HAVE NOT YET STARTED!\n\tRewards start at block ${startBlock}\n`);
  } else {
    rewardsPerWeek = await FINN_FARM.finnPerSecond() / 1e18 * 604800;
  }

  const tokens = {};
  const prices = await getMoonriverPrices();

  async function loadMoonriverChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    deathPoolIndices, claimFunction) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();

    _print(`<a href='https://blockscout.moonriver.moonbeam.network/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getMoonriverToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 3

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getMoonriverPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

    await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getMoonriverToken(App, address, chefAddress);
    }));

    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
        .map(poolInfo =>
          poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "moonriver") : undefined);
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "moonriver") : undefined);


    _print("Finished reading smart contracts.\n");

    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, claimFunction, "moonriver", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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

  function printChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
    totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
    pendingRewardsFunction, fixedDecimals, claimFunction, chain = "eth", depositFee = 0, withdrawFee = 0) {
    fixedDecimals = fixedDecimals ?? 6;
    const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
    var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    _print_inline(`${poolIndex} - `);
    poolPrices.print_price(chain, 18, customURLs);
    sp?.print_price(chain);
    const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals);
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
    return apr;
  }

  function getPoolPrices(tokens, prices, pool, chain = "eth") {
    if (pool.w0 != null) return getValuePrices(tokens, prices, pool);
    if (pool.buniPoolTokens != null) return getBunicornPrices(tokens, prices, pool);
    if (pool.poolTokens != null) return getBalancerPrices(tokens, prices, pool);
    if (pool.isGelato) return getGelatoPrices(tokens, prices, pool);
    if (pool.token0 != null) return getUniPrices(tokens, prices, pool);
    if (pool.virtualPrice != null) return getCurvePrices(prices, pool); //should work for saddle too
    if (pool.token != null) return getWrapPrices(tokens, prices, pool);
    return getErc20Prices(prices, pool, chain);
  }

  function getUniPrices(tokens, prices, pool, chain = "eth") {
    var t0 = getParameterCaseInsensitive(tokens, pool.token0);
    var p0 = getParameterCaseInsensitive(prices, pool.token0)?.usd;
    var t1 = getParameterCaseInsensitive(tokens, pool.token1);
    var p1 = getParameterCaseInsensitive(prices, pool.token1)?.usd;
    if (p0 == null && p1 == null) {
      console.log(`Missing prices for tokens ${pool.token0} and ${pool.token1}.`);
      return undefined;
    }
    if (t0?.decimals == null) {
      console.log(`Missing information for token ${pool.token0}.`);
      return undefined;
    }
    if (t1?.decimals == null) {
      console.log(`Missing information for token ${pool.token1}.`);
      return undefined;
    }
    var q0 = pool.q0 / 10 ** t0.decimals;
    var q1 = pool.q1 / 10 ** t1.decimals;
    if (p0 == null) {
      p0 = q1 * p1 / q0;
      prices[pool.token0] = { usd: p0 };
    }
    if (p1 == null) {
      p1 = q0 * p0 / q1;
      prices[pool.token1] = { usd: p1 };
    }
    var tvl = q0 * p0 + q1 * p1;
    var price = tvl / pool.totalSupply;
    prices[pool.address] = { usd: price };
    var staked_tvl = pool.staked * price;
    let stakeTokenTicker = `[${t0.symbol}]-[${t1.symbol}]`;
    stakeTokenTicker += " Huckleberry LP";
    return {
      t0: t0,
      p0: p0,
      q0: q0,
      t1: t1,
      p1: p1,
      q1: q1,
      price: price,
      tvl: tvl,
      staked_tvl: staked_tvl,
      stakeTokenTicker: stakeTokenTicker,
      print_price(chain = "eth", decimals, customURLs) {
        const t0address = t0.symbol == "ETH" ? "ETH" : t0.address;
        const t1address = t1.symbol == "ETH" ? "ETH" : t1.address;
        if (customURLs) {
          const poolUrl = `${customURLs.info}/${pool.address.toLowerCase()}`
          const helperUrls = [
            `${customURLs.add}/${t0address}/${t1address}`,
            `${customURLs.remove}/${t0address}/${t1address}`,
            `${customURLs.swap}?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ]
          const helperHrefs = helperUrls.length == 0 ? "" :
            ` <a href='${helperUrls[0]}' target='_blank'>[+]</a> <a href='${helperUrls[1]}' target='_blank'>[-]</a> <a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`
          _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>${helperHrefs} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
          _print(`${t0.symbol} Price: $${displayPrice(p0)}`);
          _print(`${t1.symbol} Price: $${displayPrice(p1)}`);
          _print(`Staked: ${pool.staked.toFixed(decimals ?? 4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);

        }
      },
      pair_links(chain = "eth", decimals, customURLs) {
        const t0address = t0.symbol == "ETH" ? "ETH" : t0.address;
        const t1address = t1.symbol == "ETH" ? "ETH" : t1.address;
        if (customURLs) {
          const poolUrl = `${customURLs.info}/${pool.address.toLowerCase()}`
          const helperUrls = [
            `${customURLs.add}/${t0address}/${t1address}`,
            `${customURLs.remove}/${t0address}/${t1address}`,
            `${customURLs.swap}?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ]
          return {
            pair_link: `<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>`,
            add_liquidity_link: `<a href='${helperUrls[0]}' target='_blank'>[+]</a>`,
            remove_liquidity_link: `<a href='${helperUrls[1]}' target='_blank'>[-]</a>`,
            swap_link: `<a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`,
            token0: t0.symbol,
            price0: `$${displayPrice(p0)}`,
            token1: t1.symbol,
            price1: `$${displayPrice(p1)}`,
            total_staked: `${pool.staked.toFixed(4)}`,
            total_staked_dollars: `$${formatMoney(staked_tvl)}`,
            tvl: `$${formatMoney(tvl)}`
          }
        }
      },
      print_contained_price(userStaked) {
        var userPct = userStaked / pool.totalSupply;
        var q0user = userPct * q0;
        var q1user = userPct * q1;
        _print(`Your LP tokens comprise of ${q0user.toFixed(4)} ${t0.symbol} + ${q1user.toFixed(4)} ${t1.symbol}`);
      }
    }
  }

  function printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 6;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  const claim = async function() {
    return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  if(depositFee > 0){
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
  }else{
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  }
  if(withdrawFee > 0){
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
  }else{
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  }
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

  const chefContract_claim = async function(chefAbi, chefAddress, poolIndex, App,
    pendingRewardsFunction, claimFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    if (claimFunction) {
      CHEF_CONTRACT[claimFunction](poolIndex, 0, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
    else {
      CHEF_CONTRACT.deposit(poolIndex, 0, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
}

  await loadMoonriverChefContract(App, tokens, prices, FINN_FARM, FINN_FARM_ADDR, FINN_FARM_ABI, rewardTokenTicker,
    "finn", null, rewardsPerWeek, "pendingReward", null, "withdraw");

  hideLoading();
}
