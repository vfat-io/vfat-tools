$(function() {
    consoleInit();
    start(main);
  });

  async function getUniPool(app, poolAddress, stakingAddress) {
    const pool = new ethers.Contract(poolAddress, UNI_ABI, app.provider);
    const reserves = await pool.getReserves();
    const decimals = await pool.decimals();
    return { 
        token0: await pool.token0(),
        q0    : reserves._reserve0,
        token1: await pool.token1(),
        q1    : reserves._reserve1,
        totalSupply: await pool.totalSupply() / 10 ** decimals,
        stakingAddress: stakingAddress,
        staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
        decimals: decimals,
        unstaked: await pool.balanceOf(app.YOUR_ADDRESS) / 10 ** decimals
    };
  }

  async function getPoolInfo(app, chefContract, chefAddress, poolIndex) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    const uniPool = await getUniPool(app, poolInfo.lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingYaxis = await chefContract.pendingYaxis(poolIndex, app.YOUR_ADDRESS);
    return {
        address: poolInfo.lpToken,
        allocPoints: await poolInfo.allocPoint,
        uniPool: uniPool,
        userStaked : userInfo.amount / 10 ** uniPool.decimals,
        pendingYaxis : pendingYaxis / 10 ** 18
    };
  }

  async function getToken(app, address) {
      const token = new ethers.Contract(address, ERC20_ABI, app.provider);
      return {
          name : await token.name(),
          symbol : await token.symbol(),
          totalSupply :  await token.totalSupply(),
          decimals : await token.decimals()
      }
  }

  function getParameterCaseInsensitive(object, key) {
    return object[Object.keys(object)
      .find(k => k.toLowerCase() === key.toLowerCase())
    ];
  }

  function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  }

  function getPoolPrices(tokens, prices, pool)
  {
    var token0 = getParameterCaseInsensitive(tokens,pool.token0);
    var price0 = getParameterCaseInsensitive(prices,pool.token0)?.usd;
    var token1 = getParameterCaseInsensitive(tokens,pool.token1);
    var price1 = getParameterCaseInsensitive(prices,pool.token1)?.usd;
    if (price0 == null && price1 == null) {
        return undefined;
    }
    var q0 = pool.q0 / 10 ** token0.decimals;
    var q1 = pool.q1 / 10 ** token1.decimals;
    if (price0 == null)
    {
        price0 = q1 * price1 / q0;
        prices[pool.token0] = { usd : price0 };
    }
    if (price1 == null)
    {
        price1 = q0 * price0 / q1;
        prices[pool.token1] = { usd : price1 };
    }
    var tvl = q0 * price0 + q1 * price1;
    var price = tvl / pool.totalSupply;
    return {
        t0: token0,
        p0: price0,
        q0  : q0,
        t1: token1,
        p1: price1,
        q1  : q1,
        uni_price: price,
        tvl : tvl,
        staked_tvl : pool.staked * price
    }
 } 

 async function loadPool(App, prices, tokens, poolIndex, chefContract, chefAddr, totalAllocPoints, 
                         rewardsPerWeek, rewardTokenTicker, rewardTokenAddress) {  
    const poolInfo = await getPoolInfo(App, chefContract, chefAddr, poolIndex);
    const poolTokens = [ poolInfo.uniPool.token0, poolInfo.uniPool.token1 ];
    var newPriceAddresses = poolTokens.filter(x => prices[x] == null);
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        prices[key] = newPrices[key];
    }
    var newTokenAddresses = poolTokens.filter(x => tokens[x] == null);
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address);
    }
    const pp = getPoolPrices(tokens, prices, poolInfo.uniPool);
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const poolUrl = `http://uniswap.info/pair/${poolInfo.address}`;
    const stakingTokenTicker = `[${pp.t0.symbol}]-[${pp.t1.symbol}]`;
    _print(`<a href='${poolUrl}' target='_blank'>${stakingTokenTicker}</a> UNI Price: $${formatMoney(pp.uni_price)} TVL: $${formatMoney(pp.tvl)}`);
    _print(`${pp.t0.symbol} Price: $${formatMoney(pp.p0)}`)
    _print(`${pp.t1.symbol} Price: $${formatMoney(pp.p1)}`)
    _print(`Staked: $${formatMoney(pp.staked_tvl)}`);
    var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
    var usdPerWeek = poolRewardsPerWeek * rewardPrice;
    _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek} ($${formatMoney(usdPerWeek)})`);
    var weeklyAPY = usdPerWeek / pp.staked_tvl * 100;
    var dailyAPY = weeklyAPY / 7;
    var yearlyAPY = weeklyAPY * 52;
    _print(`APY: Day ${dailyAPY.toFixed(2)}% Week ${weeklyAPY.toFixed(2)}% Year ${yearlyAPY.toFixed(2)}%`);
    var userStakedPct = poolInfo.userStaked / poolInfo.uniPool.staked * 100;
    var userStakedUsd = poolInfo.userStaked * pp.uni_price;
    _print(`You are staking ${poolInfo.userStaked.toFixed(2)} UNI-V2 ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    if (poolInfo.userStaked > 0) {
        var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
        var userDailyRewards = userWeeklyRewards / 7;
        var userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${rewardTokenTicker} earnings:`
             + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardPrice)})`
             + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
             + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
    }
    const approveAndStake = async function() {
      return chefContract_stake(chefAddr, poolIndex, poolInfo.address, App)
    }      
    const unstake = async function() {
      return chefContract_unstake(chefAddr, poolIndex, App)
    }      
    const claim = async function() {
      return chefContract_claim(chefAddr, poolIndex, App)
    }      
    const exit = async function() {
      return chefContract_exit(chefAddr, poolIndex, App)
    }      
    _print_link(`Stake ${poolInfo.uniPool.unstaked.toFixed(2)} ${stakingTokenTicker}`, approveAndStake)
    _print_link(`Unstake ${poolInfo.userStaked.toFixed(2)} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${poolInfo.pendingYaxis.toFixed(2)} ${rewardTokenTicker}`, claim)
    _print_link(`Exit`, exit)
    _print(`\n`);
 }
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const YAXIS_CHEF_ADDR = "0xc330e7e73717cd13fb6ba068ee871584cf8a194f";
    const YAXIS_CHEF = new ethers.Contract(YAXIS_CHEF_ADDR, CHEF_ABI, App.provider);

    const poolCount = await YAXIS_CHEF.poolLength();
    const totalAllocPoints = await YAXIS_CHEF.totalAllocPoint();

    _print(`Found ${poolCount} pools.\n`)

    var prices = {};
    var tokens = {};

    const rewardTokenPoolIndex = 6;
    const rewardTokenTicker = "YAX";
    const rewardTokenAddress = "0xb1dc9124c395c1e97773ab855d66e879f053a289"
    const rewardsPerWeek = 200000 * 0.9;

    await loadPool(App, prices, tokens, rewardTokenPoolIndex, YAXIS_CHEF, YAXIS_CHEF_ADDR, totalAllocPoints, 
             rewardsPerWeek, rewardTokenTicker, rewardTokenAddress);

    for (i = 0; i < poolCount; i++) {
        if (i != rewardTokenPoolIndex) {
            await loadPool(App, prices, tokens, i, YAXIS_CHEF, YAXIS_CHEF_ADDR, totalAllocPoints, 
                rewardsPerWeek, rewardTokenTicker, rewardTokenAddress);
        }
    }
  
    hideLoading();  
  }