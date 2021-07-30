
$(function() {
consoleInit(main)
});

const CHIPS_LP_CONTRACT_ABI = [{"inputs":[{"internalType":"contract ERC20","name":"_chips","type":"address"},{"internalType":"contract ERC20","name":"_chipsLP","type":"address"},{"internalType":"contract ChipsStaking","name":"_chipsStaking","type":"address"},{"internalType":"contract CookieGoverance","name":"_governance","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"cashout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"chips","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chipsLP","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chipsPerEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimYield","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositYield","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"farmer","type":"address"}],"name":"dividendsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDripTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payoutEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setWeeksRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"stakingContract","type":"address"}],"name":"upgradeChipsStaking","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const CHIPS_CONTRACT_ABI = [{"inputs":[{"internalType":"contract ERC20","name":"_chips","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"cashout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimYield","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositYield","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"distributeDivs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"farmer","type":"address"}],"name":"dividendsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"receiveApproval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const NEW_CHIPS_CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"cashout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"farmer","type":"address"}],"name":"chipsDividendsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"chipsPayoutsTo","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chipsPerEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chipsProfitPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimYield","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositYield","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"farmer","type":"address"}],"name":"dividendsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDripTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payoutEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"payoutsTo","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingchipsAlloc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"profitPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setWeeksRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minchips","type":"uint256"},{"internalType":"uint256","name":"percentBurnt","type":"uint256"}],"name":"sweepChips","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newRouter","type":"address"}],"name":"updateApeRouter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newGov","type":"address"}],"name":"updateGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newRouter","type":"address"}],"name":"updatePancakeRouter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawAfterSystemClosed","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Pool0 = {
  address : "0x9C5015Be27AdEbde60BF912AC5D4C2a18F88BAa1",
  abi : CHIPS_LP_CONTRACT_ABI,
  stakeTokenFunction : "chipsLP",
  rewardTokenFunction : "chips"
}

const Pool1 = {
  address : "0x1E822a7f027Cd8e56DA8D9220A82AADF878dD233",
  abi : CHIPS_CONTRACT_ABI,
  chipsTokenAddress : "0x1e584D356db17deCFA474Fb9669Fa7D2f181eE4E"
}

const Pool2 = {
  address : "0x19869ed8A1CB0E838B4aaf295efA30DfcC72F08b",
  abi : NEW_CHIPS_CONTRACT_ABI,
  stakeTokenAddress : "0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95",
  rewardTokenAddress : "0x1e584D356db17deCFA474Fb9669Fa7D2f181eE4E"
}

const Pool3 = {
  address : "0xaBB9BA9d019BDA0823F605241aFdD07dE2f2CCBD",
  abi : NEW_CHIPS_CONTRACT_ABI,
  stakeTokenAddress : "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
  rewardTokenAddress : "0x1e584D356db17deCFA474Fb9669Fa7D2f181eE4E"
}

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getBscPrices();

  let p0 = await loadChipsSynthetixPool0(App, tokens, prices, Pool0.abi, Pool0.address, Pool0.rewardTokenFunction, Pool0.stakeTokenFunction);
  let p1 = await loadChipsSynthetixPool1(App, tokens, prices, Pool1.abi, Pool1.address, Pool1.chipsTokenAddress);
  let p2 = await loadNewChipsSynthetixPool(App, tokens, prices, Pool2.abi, Pool2.address, Pool2.rewardTokenAddress, Pool2.stakeTokenAddress);
  let p3 = await loadNewChipsSynthetixPool(App, tokens, prices, Pool3.abi, Pool3.address, Pool3.rewardTokenAddress, Pool3.stakeTokenAddress);

  _print_bold(`Total staked: $${formatMoney(p0.staked_tvl+p1.staked_tvl+p2.staked_tvl+p3.staked_tvl)}`);
  if (p0.totalUserStaked > 0 || p1.totalUserStaked > 0 || p2.totalUserStaked > 0 || p3.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p0.totalUserStaked+p1.totalUserStaked+p2.totalUserStaked+p3.totalUserStaked)}`);
  }

  hideLoading();
}

async function loadChipsSynthetixPool0(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
  const info = await loadChipsSynthetixPoolInfo0(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
  return await printSynthetixPool(App, info, "bsc");
}

async function loadChipsSynthetixPool1(App, tokens, prices, abi, address, tokenAddress) {
  const info = await loadChipsSynthetixPoolInfo1(App, tokens, prices, abi, address, tokenAddress);
  return await printChipsSynthetixPool(App, info, "bsc");
}

async function loadNewChipsSynthetixPool(App, tokens, prices, abi, address, rewardTokenAddress, stakeTokenAddress) {
  const info = await loadnewChipsSynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenAddress, stakeTokenAddress);
  return await printSynthetixPool(App, info, "bsc");
}

async function loadChipsSynthetixPoolInfo1(App, tokens, prices, stakingAbi, stakingAddress, tokenAddress) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    const stakeTokenAddress = tokenAddress;

    const rewardTokenAddress = tokenAddress;

    let stakeToken = await getBscToken(App, stakeTokenAddress, stakingAddress);
    stakeToken.staked = await STAKING_POOL.totalDeposits() / 10 ** stakeToken.decimals;

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      x.toLowerCase() !=  "0xb34ab2f65c6e4f764ffe740ab83f982021faed6d" && //BSG can't be retrieved from Coingecko
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getBscToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getBscToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "bsc");

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = await STAKING_POOL.balances(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = await STAKING_POOL.dividendsOf(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned
    }
}

async function loadChipsSynthetixPoolInfo0(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    let stakeToken = await getBscToken(App, stakeTokenAddress, stakingAddress);
    stakeToken.staked = await STAKING_POOL.totalDeposits() / 10 ** stakeToken.decimals;

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      x.toLowerCase() !=  "0xb34ab2f65c6e4f764ffe740ab83f982021faed6d" && //BSG can't be retrieved from Coingecko
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getBscToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getBscToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "bsc");

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const periodFinish = await STAKING_POOL.payoutEndTime();
    const rewardsPerWeek = await STAKING_POOL.chipsPerEpoch();
    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardsPerWeek * 604800 / 10 ** rewardToken.decimals;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = await STAKING_POOL.balances(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = await STAKING_POOL.dividendsOf(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      weeklyRewards,
      usdPerWeek,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned
    }
}

async function loadnewChipsSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenAddress, stakeTokenAddress) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenAddress]) {
      console.log("Couldn't find stake function ", stakeTokenAddress);
    }

    let stakeToken = await getBscToken(App, stakeTokenAddress, stakingAddress);
    stakeToken.staked = await STAKING_POOL.totalDeposits() / 10 ** stakeToken.decimals;

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      x.toLowerCase() !=  "0xb34ab2f65c6e4f764ffe740ab83f982021faed6d" && //BSG can't be retrieved from Coingecko
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getBscToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getBscToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "bsc");

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const periodFinish = await STAKING_POOL.payoutEndTime();
    const rewardsPerWeek = await STAKING_POOL.chipsPerEpoch();
    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardsPerWeek * 604800 / 10 ** rewardToken.decimals;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = await STAKING_POOL.balances(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = await STAKING_POOL.dividendsOf(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      weeklyRewards,
      usdPerWeek,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned
    }
}

async function printChipsSynthetixPool(App, info, chain="eth", customURLs) {
    info.poolPrices.print_price(chain, 4, customURLs);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
    }
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(info.stakingAddress, App)
    }
    const claim = async function() {
      return rewardsContract_claim(info.stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    _print(`<a target="_blank" href="https://bscscan.com/address/${info.stakingAddress}#code">BSC Scan</a>`);
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    }
    else {
      _print("Please use the official website to stake ETH.");
    }
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`, claim)
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Revoke (set approval to 0)`, revoke)
    }
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd
    }
}