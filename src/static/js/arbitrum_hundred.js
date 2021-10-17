$(function () {
    consoleInit(main)
});

const HUNDRED_ABI = {
    comptroller: [
        {
            inputs: [],
            name: 'getAllMarkets',
            outputs: [{ internalType: 'contract PToken[]', name: '', type: 'address[]' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{"internalType":"address","name":"","type":"address"}],
            name: 'compSpeeds',
            outputs: [{"internalType":"uint256","name":"","type":"uint256"}],
            stateMutability: 'view',
            type: 'function',
        }
    ],
    pToken: [
        {
            inputs: [],
            name: 'totalReserves',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'totalSupply',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'exchangeRateStored',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'supplyRatePerBlock',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'totalBorrows',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'borrowBalanceStored',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'borrowRatePerBlock',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getCash',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'interestRateModel',
            outputs: [{ internalType: 'contract IInterestRateModel', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'underlying',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
    ],
    erc20: [
        {
            constant: true,
            inputs: [],
            name: 'symbol',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: true,
            inputs: [],
            name: 'decimals',
            outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
    ],
    oracle: [
        {
            inputs: [{ internalType: 'address', name: '_pToken', type: 'address' }],
            name: 'getUnderlyingPrice',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
    ],
    rate: [
        {
            inputs: [],
            name: 'blocksPerYear',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
    ],
}

const contracts = {
    comptroller: '0x0f390559f258eb8591c8e31cf0905e97cf36ace2',
    oracle: '0x10010069DE6bD5408A6dEd075Cf6ae2498073c73',
    gas: {
        p_address: '0x8e15a22853A0A60a0FBB0d875055A8E66cff0235',
        symbol: 'ETH',
        decimals: 18,
    },
};

async function main() {
    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const tokens = {};
    const prices = await getArbitrumPrices();

    const COMPTROLLER = new ethcall.Contract(contracts.comptroller, HUNDRED_ABI.comptroller, App.provider);

    const [allMarkets] = await App.ethcallProvider.all([COMPTROLLER.getAllMarkets()]);

    // console.log(allMarkets);

    const data = await Promise.all(allMarkets.map(token => loadData(App, token, COMPTROLLER, prices)));

    // console.log(data);

    let [totalSupply, totalBorrow, totalCash] = [0, 0, 0];

    for (const market of data) {
        totalSupply += market.totalSupply * market.underlyingPrice;
        totalBorrow += market.totalBorrows * market.underlyingPrice;
        totalCash += market.cash * market.underlyingPrice;
    }
    _print_bold(`Deposit Market Size : $${formatMoney(totalSupply)}`);
    _print_bold(`Borrow Market Size : $${formatMoney(totalBorrow)}`);
    _print_bold(`TVL : $${formatMoney(totalCash)}`);
    _print("");

    for (const market of data) {
        printData(market);
    }

    const DODO_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"address","name":"rewardToken","type":"address"}],"name":"NewRewardToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferPrepared","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardToken","type":"address"}],"name":"RemoveRewardToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"UpdateEndBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"i","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"UpdateReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"i","type":"uint256"}],"name":"WithdrawLeftOver","type":"event"},{"inputs":[],"name":"_NEW_OWNER_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_OWNER_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_TOKEN_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"rewardToken","type":"address"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"addRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimAllRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"rewardToken","type":"address"}],"name":"getIdByRewardToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getPendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"rewardToken","type":"address"}],"name":"getPendingRewardByToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardNum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getRewardTokenById","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"initOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"rewardToken","type":"address"}],"name":"removeRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokenInfos","outputs":[{"internalType":"address","name":"rewardToken","type":"address"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"endBlock","type":"uint256"},{"internalType":"address","name":"rewardVault","type":"address"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"newEndBlock","type":"uint256"}],"name":"setEndBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"newRewardPerBlock","type":"uint256"}],"name":"setReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawLeftOver","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const DODO_CHEF_ADDR = "0x06633cd8E46C3048621A517D6bb5f0A84b4919c6";
    const DODO_CHEF = new ethers.Contract(DODO_CHEF_ADDR, DODO_CHEF_ABI, App.provider);

    let p0 = await loadArbitrumDodoContract(App, tokens, prices, DODO_CHEF, DODO_CHEF_ADDR, DODO_CHEF_ABI,
        "getPendingRewardByToken");
    _print_bold(`Total Staked: $${formatMoney(p0.totalStaked)}`);
    const userYearlyEarnings = p0.totalUserStaked * p0.averageApr
    const totalUserStaked = p0.totalUserStaked;
    if (p0.totalUserStaked > 0) {
      _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(userYearlyEarnings / totalUserStaked * 100).toFixed(2)}%`)
      _print(`Estimated earnings:`
          + ` Day $${formatMoney(userYearlyEarnings/365)}`
          + ` Week $${formatMoney(userYearlyEarnings/52)}`
          + ` Year $${formatMoney(userYearlyEarnings)}\n`);
    }

    hideLoading();
}

async function loadData(App, token, comptroller, prices) {

    const PTOKEN_CONTRACT = new ethcall.Contract(token, HUNDRED_ABI.pToken, App.provider);

    const [
        totalReserves_,
        totalSupply_,
        supply_,
        exchangeRate_,
        supplyRatePerBlock_,
        totalBorrows_,
        borrowBalanceOf_,
        borrowRatePerBlock_,
        cash_,
        interestRateModel,
    ] = await App.ethcallProvider.all([
        PTOKEN_CONTRACT.totalReserves(),
        PTOKEN_CONTRACT.totalSupply(),
        PTOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS),
        PTOKEN_CONTRACT.exchangeRateStored(),
        PTOKEN_CONTRACT.supplyRatePerBlock(),
        PTOKEN_CONTRACT.totalBorrows(),
        PTOKEN_CONTRACT.borrowBalanceStored(App.YOUR_ADDRESS),
        PTOKEN_CONTRACT.borrowRatePerBlock(),
        PTOKEN_CONTRACT.getCash(),
        PTOKEN_CONTRACT.interestRateModel(),
    ]);

    let underlyingSymbol, underlyingDecimals;

    if (token.toLowerCase() === contracts.gas.p_address.toLowerCase()) {
        underlyingSymbol = contracts.gas.symbol;
        underlyingDecimals = contracts.gas.decimals;
    } else {
        const [underlying] = await App.ethcallProvider.all([PTOKEN_CONTRACT.underlying()]);
        const UNDERLYING_CONTRACT = new ethcall.Contract(underlying, HUNDRED_ABI.erc20, App.provider);
        [underlyingSymbol, underlyingDecimals] = await App.ethcallProvider.all([UNDERLYING_CONTRACT.symbol(), UNDERLYING_CONTRACT.decimals()]);
    }

    const ORACLE_CONTRACT = new ethcall.Contract(contracts.oracle, HUNDRED_ABI.oracle, App.provider);
    const [underlyingPrice_] = await App.ethcallProvider.all([ORACLE_CONTRACT.getUnderlyingPrice(token)]);
    const underlyingPrice = underlyingPrice_ / 10 ** (18 + 18 - underlyingDecimals);

    const totalReserves = totalReserves_ / 10 ** underlyingDecimals;

    const exchangeRate = exchangeRate_ / 1e18;
    const totalSupply = totalSupply_ * exchangeRate / 10 ** underlyingDecimals;
    const supply = supply_ * exchangeRate / 10 ** underlyingDecimals;
    const supplyPct = supply / totalSupply * 100;

    const totalBorrows = totalBorrows_ / 10 ** underlyingDecimals;
    const borrow = borrowBalanceOf_ / 10 ** underlyingDecimals;
    const borrowPct = borrow / totalBorrows * 100;

    const cash = cash_ / 10 ** underlyingDecimals;

    const RATE_CONTRACT = new ethcall.Contract(interestRateModel, HUNDRED_ABI.rate, App.provider);
    const [blocksPerYear] = await App.ethcallProvider.all([RATE_CONTRACT.blocksPerYear()]);

    const supplyAPY = ((1 + supplyRatePerBlock_ / 1e18) ** blocksPerYear - 1) * 100;
    const borrowAPY = ((1 + borrowRatePerBlock_ / 1e18) ** blocksPerYear - 1) * 100;

    let supplyFarmingAPY = 0;
    const [farmingRewards_] = await App.ethcallProvider.all([comptroller.compSpeeds(token)])
    const farmingRewards = farmingRewards_ / 1e18;
    const blocksPerYear_ = blocksPerYear * 1
    const tvl = totalSupply * underlyingPrice;
    const rewardPrice = getParameterCaseInsensitive(prices, "0x10010078a54396f62c96df8532dc2b4847d47ed3")?.usd;
    if(farmingRewards > 0){
      supplyFarmingAPY = farmingRewards * blocksPerYear_ * rewardPrice / tvl * 100
    }
    const borrowFarmingAPY = 0;

    const supplyNetAPY = supplyAPY + supplyFarmingAPY
    const borrowNetAPY = borrowFarmingAPY - borrowAPY

    const supplyUsdPerYear = supply * underlyingPrice * supplyNetAPY / 100;
    const supplyUsdPerWeek = supplyUsdPerYear / 52;
    const supplyUsdPerDay = supplyUsdPerYear / 365;

    const borrowUsdPerYear = borrow * underlyingPrice * borrowNetAPY / 100;
    const borrowUsdPerWeek = borrowUsdPerYear / 52;
    const borrowUsdPerDay = borrowUsdPerYear / 365;


    return {
        underlyingSymbol,
        underlyingPrice,
        totalSupply,
        totalBorrows,
        totalReserves,
        cash,
        supplyAPY,
        borrowAPY,
        supplyFarmingAPY,
        borrowFarmingAPY,
        supplyNetAPY,
        borrowNetAPY,
        supply,
        supplyUsdPerDay,
        supplyUsdPerWeek,
        supplyUsdPerYear,
        borrow,
        borrowUsdPerDay,
        borrowUsdPerWeek,
        borrowUsdPerYear,
        supplyPct,
        borrowPct
    }
}

async function printData(data) {
    _print_bold(`${data.underlyingSymbol} ($${formatMoney(data.underlyingPrice)})`);
    _print(`Supplied : ${formatMoney(data.totalSupply)} ($${formatMoney(data.totalSupply * data.underlyingPrice)}) at ${data.supplyAPY.toFixed(2)}% APY`)
    _print(`Borrowed : ${formatMoney(data.totalBorrows)} ($${formatMoney(data.totalBorrows * data.underlyingPrice)}) at ${data.borrowAPY.toFixed(2)}% APY`)
    _print(`Reserves : ${formatMoney(data.totalReserves)} ($${formatMoney(data.totalReserves * data.underlyingPrice)})`);
    _print(`Farming APR Supply ${data.supplyFarmingAPY.toFixed(2)}% Borrow ${data.borrowFarmingAPY.toFixed(2)}%`);
    _print(`Net APY Supply ${data.supplyNetAPY.toFixed(2)}% Borrow ${data.borrowNetAPY.toFixed(2)}%`);
    if (data.supply > 0) {
        _print(`You are supplying ${formatMoney(data.supply)} ${data.underlyingSymbol} ($${formatMoney(data.supply * data.underlyingPrice)}), ${(data.supplyPct).toFixed(2)}% of the pool.`)
        _print(`Estimated Supply earnings: Day ($${formatMoney(data.supplyUsdPerDay)}) Week ($${formatMoney(data.supplyUsdPerWeek)}) Year: ($${formatMoney(data.supplyUsdPerYear)})`);
    }
    if (data.borrow > 0) {
        _print(`You are borrowing ${formatMoney(data.borrow)} ${data.underlyingSymbol} ($${formatMoney(data.borrow * data.underlyingPrice)}), ${(data.borrowPct).toFixed(2)}% of the pool.`)
        _print(`Estimated Borrow earnings: Day ($${formatMoney(data.borrowUsdPerDay)}) Week ($${formatMoney(data.borrowUsdPerWeek)}) Year: ($${formatMoney(data.borrowUsdPerYear)})`);
    }
    _print("");
}

async function loadArbitrumDodoContract(App, tokens, prices, chef, chefAddress, chefAbi,
  pendingRewardsFunction, deathPoolIndices, claimFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = 1;

  _print(`<a href='https://arbiscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print("");

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getArbitrumDodoPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getArbitrumToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printDodoChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].rewardsPerWeek, poolInfos[i].rewardTokenTickers, poolInfos[i].rewardTokenAddresses,
        pendingRewardsFunction, null, claimFunction, "arbitrum", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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
    }else{
      averageApr = 0;
    }
  }
  if(totalUserStaked > 0){
    averageApr = averageApr / totalUserStaked;
  }else{
    averageApr = 0;
  }
  return { prices, totalUserStaked, totalStaked, averageApr }
}

async function getArbitrumDodoPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const rewardTokensNum = await chefContract.getRewardNum();
  let poolInfos = []
  let rewardTokenAddresses = []
  let pendingRewardTokens = []
  let rewardsPerWeek = []
  let rewardTokenTickers = []

  for(let i = 0; i < rewardTokensNum; i++){
    const poolInfo = await chefContract.rewardTokenInfos(i);
    poolInfos.push(poolInfo);
  }

  for(poolInfo of poolInfos){
    const rewardTokenAddress = poolInfo.rewardToken;
    const rewardToken = await getArbitrumToken(app, rewardTokenAddress, chefAddress);
    const rewardPerWeek = poolInfo.rewardPerBlock / 10 ** rewardToken.decimals * 604800 / 13.5;
    const pendingRewardsToken = await chefContract.callStatic[pendingRewardsFunction](app.YOUR_ADDRESS, rewardTokenAddress) / 10 ** rewardToken.decimals;
    const rewardTokenTicker = rewardToken.symbol;
    rewardsPerWeek.push(rewardPerWeek);
    rewardTokenAddresses.push(rewardTokenAddress);
    pendingRewardTokens.push(pendingRewardsToken);
    rewardTokenTickers.push(rewardTokenTicker)
  }

  const lpToken = await chefContract._TOKEN_();
  const poolToken = await getArbitrumToken(app, lpToken, chefAddress);
  const staked = await chefContract.balanceOf(app.YOUR_ADDRESS) / 10 ** poolToken.decimals;
  return {
      address : lpToken,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens,
      rewardsPerWeek : rewardsPerWeek,
      rewardTokenAddresses : rewardTokenAddresses,
      rewardTokenTickers : rewardTokenTickers,
      depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}

function printDodoChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       rewardsPerWeek, rewardTokenTickers, rewardTokenAddresses,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals = fixedDecimals ?? 4;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  let poolRewardsPerWeek = rewardsPerWeek;
  const userStaked = poolInfo.userStaked;
  let rewardPrices = []
  for(rewardTokenAddress of rewardTokenAddresses){
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    rewardPrices.push(rewardPrice);
  }
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printDodoAPR(rewardTokenTickers, rewardPrices, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printDodoChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTickers, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrices, chain, depositFee, withdrawFee);
  return apr;
}

function printDodoAPR(rewardTokenTickers, rewardPrices, poolRewardsPerWeek,
                  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  let usdCoinsPerWeek = []
  for(let i = 0; i < poolRewardsPerWeek.length; i++){
    const usdPerWeek = poolRewardsPerWeek[i] * rewardPrices[i];
    usdCoinsPerWeek.push(usdPerWeek);
  }
  fixedDecimals = fixedDecimals ?? 2;
  let totalDailyAPR = 0, totalWeeklyAPR = 0, totalYearlyAPR = 0;
  for(let i = 0; i < rewardTokenTickers.length; i++){
    _print(`${rewardTokenTickers[i]} Per Week: ${poolRewardsPerWeek[i].toFixed(fixedDecimals)} ($${formatMoney(usdCoinsPerWeek[i])})`);
    var weeklyAPR = usdCoinsPerWeek[i] / staked_tvl * 100;
    var dailyAPR = weeklyAPR / 7;
    var yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    totalDailyAPR+=dailyAPR
    totalWeeklyAPR+=weeklyAPR
    totalYearlyAPR+=yearlyAPR
  }
  _print(`Total APR: Day ${totalDailyAPR.toFixed(2)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  let userYearlyUsds = []
  let totalUserWeeklyRewards = 0, totalUserDailyRewards = 0, totalUserYearlyRewards = 0;
  let totalUserWeeklyRewardsUsd = 0, totalUserDailyRewardsUsd = 0, totalUserYearlyRewardsUsd = 0;
  for(let i = 0; i < poolRewardsPerWeek.length; i++){
    var userWeeklyRewards = userStakedPct * poolRewardsPerWeek[i] / 100;
    var userDailyRewards = userWeeklyRewards / 7;
    var userYearlyRewards = userWeeklyRewards * 52;
    const userYearlyUsd = userYearlyRewards * rewardPrices[i];
    userYearlyUsds.push(userYearlyUsd);
    totalUserWeeklyRewards+=userWeeklyRewards;
    totalUserDailyRewards+=userDailyRewards;
    totalUserYearlyRewards+=userYearlyRewards;
    totalUserWeeklyRewardsUsd+=userWeeklyRewards*rewardPrices[i]
    totalUserDailyRewardsUsd+=userDailyRewards*rewardPrices[i]
    totalUserYearlyRewardsUsd+=userYearlyRewards*rewardPrices[i]
    if (userStaked > 0) {
      _print(`Estimated ${rewardTokenTickers[i]} earnings:`
          + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrices[i])})`
          + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrices[i])})`
          + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrices[i])})`);
    }
  }
  if (userStaked > 0) {
    _print(`Estimated Total Earnings :`
        + ` Day ($${formatMoney(totalUserDailyRewardsUsd)})`
        + ` Week ($${formatMoney(totalUserWeeklyRewardsUsd)})`
        + ` Year ($${formatMoney(totalUserYearlyRewardsUsd)})`);
  }
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
    yearlyAPR : totalYearlyAPR,
    userYearlyUsds : userYearlyUsds
  }
}

function printDodoChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTickers, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrices, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return dodoArbitrumContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return dodoArbitrumContract_unstake(chefAbi, chefAddr, App)
  }
  const claim = async function() {
    return dodoArbitrumContract_claim(chefAbi, chefAddr, App)
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
  _print_link(`Claim ${pendingRewardTokens[0].toFixed(fixedDecimals)} ${rewardTokenTickers[0]} ($${formatMoney(pendingRewardTokens[0]*rewardTokenPrices[0])}) + ${pendingRewardTokens[1].toFixed(fixedDecimals)} ${rewardTokenTickers[1]} ($${formatMoney(pendingRewardTokens[1]*rewardTokenPrices[1])})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const dodoArbitrumContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
          CHEF_CONTRACT.deposit(currentTokens)
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

async function dodoArbitrumContract_unstake(chefAbi, chefAddress, App) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const userStaked = await CHEF_CONTRACT.balanceOf(App.YOUR_ADDRESS)
  const earnedTokenAmount = await CHEF_CONTRACT.getPendingRewardByToken(App.YOUR_ADDRESS, "0x10010078a54396f62c96df8532dc2b4847d47ed3") / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    CHEF_CONTRACT.withdraw(userStaked)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function(ex) {
        console.log(ex)
        hideLoading()
      })
  }
}

async function dodoArbitrumContract_claim(chefAbi, chefAddress, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = await CHEF_CONTRACT.getPendingRewardByToken(App.YOUR_ADDRESS, "0x10010078a54396f62c96df8532dc2b4847d47ed3") / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
      CHEF_CONTRACT.claimAllRewards()
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
  }
}