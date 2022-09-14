
$(function() {
consoleInit(main)
  });

const STEAK_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"WITHDRAW_COOLDOWN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"uint256","name":"_minimum","type":"uint256"},{"internalType":"uint256","name":"_type","type":"uint256"}],"name":"addOrUpdateDiscountToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"}],"name":"calculateSteakBuy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"}],"name":"calculateSteakBuySimple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"meats","type":"uint256"}],"name":"calculateSteakSell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eatSteak","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDevFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInvestorCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMyMiners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMySteak","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getSteakSinceLastHatch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"grillSteak","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"reGrill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"removeDiscountToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"seedMarket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"steakRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const STEAK_CRO_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"beanRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"}],"name":"calculateSteakBuy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"}],"name":"calculateSteakBuySimple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eggs","type":"uint256"}],"name":"calculateSteakSell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eatSteak","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMyMiners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMySteak","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getSteakSinceLastHatch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"grillSteak","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"reGrill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"seedMarket","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const Addresses = [
    "0x64468fa3b842082eBC844Bd74D16FEb093a12C45", //USDC
    "0xE56Bb7b50FA602c42C90Cd0162e21D45aaDe61a4", //MMF
    "0x240b039f58C8516e670602b058aDc395dC48DdfD", //SVN
    "0xD505a0533069848ae316DCdEACe9ADAca3C2C825" //THUNDER
   ]

    const tokens = {};
    const prices = await getCronosPrices();

    let p = await loadMultipleSteakPools(App, tokens, prices, Addresses, STEAK_ABI, "cronos")
    let p2 = await loadCroSteakPool(App, tokens, prices, "0xd3c053dE4fF3d3fA734fCc74f7269c1227C170df", STEAK_CRO_ABI, "cronos")
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl + p2.staked_tvl)}`);
    if (p.totalUserStaked > 0 || p2.userStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked + p2.userStaked)}\n`);
    }

    hideLoading();
  }

async function loadCroSteakPool(App, tokens, prices, address, abi, chain) {
    const info = await loadCroSteakPoolInfo(App, tokens, prices, address, abi, chain);
    if (!info) return null;
    return await printCroSteakPool(App, info, chain);
}

async function loadMultipleSteakPools(App, tokens, prices, pools, abi, chain) {
  let totalStaked  = 0, totalUserStaked = 0;
  const infos = await Promise.all(pools.map(address =>
    loadSteakPoolInfo(App, tokens, prices, address, abi, chain)));
  for (const i of infos) {
    let p = await printSteakPool(App, i, chain);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
  }
  return { staked_tvl : totalStaked, totalUserStaked };
}

async function loadCroSteakPoolInfo(App, tokens, prices, stakingAddress, stakingAbi, chain) {
  const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

  const stakeTokenAddress = "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23"; //WCRO

  const calls = [STAKING_MULTI.getBalance(), STAKING_MULTI.getMySteak(App.YOUR_ADDRESS)]
  const [totalStaked, balance] = await App.ethcallProvider.all(calls);

  var stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress);
  stakeToken.staked = totalStaked / 10 ** stakeToken.decimals;

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, chain);

  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
      prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

  const staked_tvl = poolPrices.staked_tvl;

  const userStaked = balance / 10 ** stakeToken.decimals;

  const userUnstaked = stakeToken.unstaked;

  return  {
    stakingAddress,
    poolPrices,
    stakeTokenAddress,
    stakeTokenTicker,
    stakeTokenPrice,
    staked_tvl,
    userStaked,
    userUnstaked
  }
}

async function printCroSteakPool(App, info, chain="eth", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  _print(`<a target="_blank" href="https://cronoscan.com/address/${info.stakingAddress}#code">Cronos Scan</a>`);
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd
  }
}

async function loadSteakPoolInfo(App, tokens, prices, stakingAddress, stakingAbi, chain) {
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    let stakeTokenAddress = "";

    switch(stakingAddress){
      case "0x64468fa3b842082eBC844Bd74D16FEb093a12C45" : 
        stakeTokenAddress = "0xc21223249CA28397B4B6541dfFaEcC539BfF0c59";  //USDC
        break;
      case "0xE56Bb7b50FA602c42C90Cd0162e21D45aaDe61a4" : 
        stakeTokenAddress = "0x97749c9b61f878a880dfe312d2594ae07aed7656";  //MMF
        break;
      case "0x240b039f58C8516e670602b058aDc395dC48DdfD" : 
        stakeTokenAddress = "0x654bac3ec77d6db497892478f854cf6e8245dca9";  //SVN
        break;
      case "0xD505a0533069848ae316DCdEACe9ADAca3C2C825" : 
        stakeTokenAddress = "0xe71d72436f290cd98cc29c9ef0e15c88ce57b359";  //THUNDER there is no in coingecko
        break;
    }

    const calls = [STAKING_MULTI.WITHDRAW_COOLDOWN(), STAKING_MULTI.getDevFee(), STAKING_MULTI.getBalance(),
      STAKING_MULTI.getMySteak(App.YOUR_ADDRESS)]
    const [_withdrawCooldown, devFee, totalStaked, balance] = await App.ethcallProvider.all(calls);

    var stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress);
    stakeToken.staked = totalStaked / 10 ** stakeToken.decimals;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, chain);

    if (!poolPrices)
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const withdrawCooldown = _withdrawCooldown / 60 / 60 / 24;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      stakeTokenTicker,
      stakeTokenPrice,
      staked_tvl,
      userStaked,
      userUnstaked,
      withdrawCooldown,
      devFee
    }
}

async function printSteakPool(App, info, chain="eth", customURLs) {
  _print(`Withdraw Cooldown : ${info.withdrawCooldown} days\n`)
  _print(`Fee : ${info.devFee} %\n`)
  info.poolPrices.print_price(chain, 4, customURLs);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  _print(`<a target="_blank" href="https://cronoscan.com/address/${info.stakingAddress}#code">Cronos Scan</a>`);
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd
  }
}