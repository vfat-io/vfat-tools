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
        decimals: decimals
    };
  }

  async function getPoolInfo(app, chefContract, chefAddress, poolIndex) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    const uniPool = await getUniPool(app, poolInfo.lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    return {
        allocPoints: await poolInfo.allocPoint,
        uniPool: uniPool,
        userStaked : userInfo.amount / 10 ** uniPool.decimals
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
    }
    if (price1 == null)
    {
        price1 = q0 * price0 / q1;
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
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const YAX_ETH_UNI_ADDR = "0x1107b6081231d7f256269ad014bf92e041cb08df";
    const YAXIS_CHEF_ADDR = "0xc330e7e73717cd13fb6ba068ee871584cf8a194f";
    const YAXIS_ABI = [{"inputs":[{"internalType":"contract YaxisToken","name":"_yax","type":"address"},{"internalType":"address","name":"_tresuryaddr","type":"address"},{"internalType":"uint256","name":"_yaxPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BLOCKS_PER_WEEK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"},{"internalType":"uint256","name":"_lastRewardBlock","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"epochEndBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"epochRewardMultiplers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract IMigratorChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingYaxis","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accYaxPerShare","type":"uint256"},{"internalType":"bool","name":"isStarted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_index","type":"uint8"},{"internalType":"uint256","name":"_epochEndBlock","type":"uint256"}],"name":"setEpochEndBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_index","type":"uint8"},{"internalType":"uint256","name":"_epochRewardMultipler","type":"uint256"}],"name":"setEpochRewardMultipler","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMigratorChef","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_yaxPerBlock","type":"uint256"}],"name":"setYaxPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tresuryaddr","type":"address"}],"name":"tresury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tresuryaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"accumulatedStakingPower","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"yax","outputs":[{"internalType":"contract YaxisToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"yaxPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

    const YAXIS_CHEF = new ethers.Contract(YAXIS_CHEF_ADDR, YAXIS_ABI, App.provider);

    const poolCount = await YAXIS_CHEF.poolLength();
    const totalAllocPoints = await YAXIS_CHEF.totalAllocPoint();

    _print(`Found ${poolCount} pools.\n`)

    var poolInfos = [];
    var uniPools = [];

    for (i = 0; i < poolCount; i++) {
        const poolInfo = await getPoolInfo(App, YAXIS_CHEF, YAXIS_CHEF_ADDR, i);
        poolInfos.push(poolInfo);
        uniPools.push(poolInfo.uniPool);
    }

    const yaxEthUni = await getUniPool(App, YAX_ETH_UNI_ADDR, YAXIS_CHEF_ADDR);
    uniPools.push(yaxEthUni);

    var tokenAddresses = [...new Set(uniPools.map(pi => 
        [pi.token0, pi.token1]).flat())];

    var tokens = {};
    for (const address of tokenAddresses) {
        tokens[address] = await getToken(App, address);
    }

    var prices = await lookUpTokenPrices(tokenAddresses);

    const ye = getPoolPrices(tokens,prices,yaxEthUni);
    const yaxPrice = ye.p0;

    _print(`[${ye.t0.symbol}] Price: $${formatMoney(yaxPrice)}\n\n`);

    const yaxPerWeek = 200000 * 0.9; //10% Treasury

    poolInfos.forEach(p => {
        var pp = getPoolPrices(tokens, prices, p.uniPool);
        _print(`[${pp.t0.symbol}] - [${pp.t1.symbol}] UNI: $${formatMoney(pp.uni_price)} TVL: $${formatMoney(pp.tvl)}`);
        _print(`Staked: $${formatMoney(pp.staked_tvl)}`);
        var poolYaxPerWeek = p.allocPoints / totalAllocPoints * yaxPerWeek;
        var usdPerWeek = poolYaxPerWeek * yaxPrice;
        _print(`YAX Per Week: ${poolYaxPerWeek} ($${formatMoney(usdPerWeek)})`);
        var weeklyAPY = usdPerWeek / pp.tvl * 100;
        var dailyAPY = weeklyAPY / 7;
        var yearlyAPY = weeklyAPY * 52;
        _print(`APY: Day ${dailyAPY.toFixed(2)}% Week ${weeklyAPY.toFixed(2)}% Year ${yearlyAPY.toFixed(2)}%`);
        var userStakedPct = p.userStaked / p.uniPool.staked * 100;
        var userStakedUsd = p.userStaked * pp.uni_price;
        _print(`You are staking ${p.userStaked} UNI-V2 ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
        if (p.userStaked > 0) {
            var userWeeklyYax = userStakedPct * poolYaxPerWeek / 100;
            var userDailyYax = userWeeklyYax / 7;
            var userYearlyYax = userWeeklyYax * 52;
            _print(`Estimated YAX earnings:`
                 + ` Day ${userDailyYax.toFixed(2)} ($${formatMoney(userDailyYax*yaxPrice)})`
                 + ` Week ${userWeeklyYax.toFixed(2)} ($${formatMoney(userWeeklyYax*yaxPrice)})`
                 + ` Year ${userYearlyYax.toFixed(2)} ($${formatMoney(userYearlyYax*yaxPrice)})`);
        }
        _print(`\n`);
    });
  
    hideLoading();  
  }