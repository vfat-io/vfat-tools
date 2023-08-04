$(function() {
  consoleInit(main)
  });
  
  const SPARTA_STAKING_ABI = [{"inputs":[{"internalType":"contract SpartaDexPair","name":"_lpToken","type":"address"},{"internalType":"contract IERC20","name":"_sparta","type":"address"},{"internalType":"contract IAccessControl","name":"_acl","type":"address"},{"internalType":"contract IContractsRepostiory","name":"_contractsRepository","type":"address"},{"internalType":"address","name":"_treasury","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AfterStakingFinish","type":"error"},{"inputs":[],"name":"AlreadyInitialized","type":"error"},{"inputs":[],"name":"AmountZero","type":"error"},{"inputs":[],"name":"BeforeStakingStart","type":"error"},{"inputs":[],"name":"ETHTransferFailed","type":"error"},{"inputs":[],"name":"NotInitialized","type":"error"},{"inputs":[],"name":"NotValidUnlockTimestamp","type":"error"},{"inputs":[],"name":"OnlyFeesManagerAccess","type":"error"},{"inputs":[],"name":"OnlyWithFees","type":"error"},{"inputs":[],"name":"RewardBalanceTooSmall","type":"error"},{"inputs":[],"name":"StartNotValid","type":"error"},{"inputs":[],"name":"ToEarlyToWithdrawReward","type":"error"},{"inputs":[],"name":"TooSmallAmount","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"inputs":[],"name":"ZeroAmount","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"start","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"unlockTokensTimestamp","type":"uint256"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardTaken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[],"name":"FEES_MANAGER","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"acl","outputs":[{"internalType":"contract IAccessControl","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractsRepository","outputs":[{"internalType":"contract IContractsRepostiory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"finishAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount_","type":"uint256"},{"internalType":"uint256","name":"duration_","type":"uint256"},{"internalType":"uint256","name":"start_","type":"uint256"},{"internalType":"uint256","name":"unlockTokensTimestamp_","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"start","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unlockTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unlockTokensTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updatedAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]

  const Addresses = [
    "0x0cf665a9ff61618f003ded415085738f1004be82",
  ]
  
  async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const tokens = {};
    const prices = await getArbitrumPrices();
  
    const pools = Addresses.map(a => { return {
      address: a,
      abi: SPARTA_STAKING_ABI,
      stakeTokenFunction: "stakingToken",
      rewardTokenFunction: "rewardToken"
    }})
  
    let p = await loadMultipleSpartaSynthetixPools(App, tokens, prices, pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    }
  
    hideLoading();
  }
  
async function loadMultipleSpartaSynthetixPools(App, tokens, prices, pools) {
  let totalStaked = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadSpartaSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printArbitrumSynthetixPool(App, i, "arbitrum");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x, y) => x + y, 0) / totalUserStaked;
  return { staked_tvl: totalStaked, totalUserStaked, totalApr };
}

async function loadSpartaSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
  const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

  if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
    console.log("Couldn't find stake function ", stakeTokenFunction);
  }
  const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

  const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

  var stakeToken = await getArbitrumToken(App, stakeTokenAddress, stakingAddress);

  if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
    stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
  }

  var newPriceAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(prices, x));
  var newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
    if (newPrices[key]?.usd)
      prices[key] = newPrices[key];
  }
  var newTokenAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(tokens, x));
  for (const address of newTokenAddresses) {
    tokens[address] = await getArbitrumToken(App, address, stakingAddress);
  }
  if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
    tokens[rewardTokenAddress] = await getArbitrumToken(App, rewardTokenAddress, stakingAddress);
  }
  const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

  const rewardTokenTicker = rewardToken.symbol;

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

  if (!poolPrices) {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
    return null;
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
    prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
  const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

  const calls = [STAKING_MULTI.finishAt(), STAKING_MULTI.rewardRate(),
  STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(App.YOUR_ADDRESS)]
  const [periodFinish, rewardRate, balance, earned_] = await App.ethcallProvider.all(calls);

  const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 10 ** rewardToken.decimals * 604800;

  const usdPerWeek = weeklyRewards * rewardTokenPrice;

  const staked_tvl = poolPrices.staked_tvl;

  const userStaked = balance / 10 ** stakeToken.decimals;

  const userUnstaked = stakeToken.unstaked;

  const earned = earned_ / 10 ** rewardToken.decimals;

  return {
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