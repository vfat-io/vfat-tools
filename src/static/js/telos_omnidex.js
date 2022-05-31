
$(function() {
  consoleInit(main)
    });
  
  const OMNIDEX_ZEN_ABI = [{"inputs": [{"internalType": "contract CharmToken","name": "_charm","type": "address"},{"internalType": "contract SpellBar","name": "_xcharm","type": "address"},{"internalType": "address","name": "_devaddr","type": "address"},{"internalType": "uint256","name": "_charmPerBlock","type": "uint256"},{"internalType": "uint256","name": "_startBlock","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": true,"internalType": "uint256","name": "pid","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Deposit","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": true,"internalType": "uint256","name": "pid","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "EmergencyWithdraw","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "user","type": "address"},{"indexed": true,"internalType": "uint256","name": "pid","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Withdraw","type": "event"},{"inputs": [],"name": "BONUS_MULTIPLIER","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_allocPoint","type": "uint256"},{"internalType": "contract IBEP20","name": "_lpToken","type": "address"},{"internalType": "bool","name": "_withUpdate","type": "bool"}],"name": "add","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "charm","outputs": [{"internalType": "contract CharmToken","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "charmPerBlock","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"},{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "deposit","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_devaddr","type": "address"}],"name": "dev","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "devaddr","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"}],"name": "emergencyWithdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "enterStaking","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_from","type": "uint256"},{"internalType": "uint256","name": "_to","type": "uint256"}],"name": "getMultiplier","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "leaveStaking","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "massUpdatePools","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"}],"name": "migrate","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "migrator","outputs": [{"internalType": "contract IMigratorMaster","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"},{"internalType": "address","name": "_user","type": "address"}],"name": "pendingCharm","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "poolInfo","outputs": [{"internalType": "contract IBEP20","name": "lpToken","type": "address"},{"internalType": "uint256","name": "allocPoint","type": "uint256"},{"internalType": "uint256","name": "lastRewardBlock","type": "uint256"},{"internalType": "uint256","name": "accCharmPerShare","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "poolLength","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"},{"internalType": "uint256","name": "_allocPoint","type": "uint256"},{"internalType": "bool","name": "_withUpdate","type": "bool"}],"name": "set","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IMigratorMaster","name": "_migrator","type": "address"}],"name": "setMigrator","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "startBlock","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalAllocPoint","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "multiplierNumber","type": "uint256"}],"name": "updateMultiplier","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"}],"name": "updatePool","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "address","name": "","type": "address"}],"name": "userInfo","outputs": [{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "uint256","name": "rewardDebt","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_pid","type": "uint256"},{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "withdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "xcharm","outputs": [{"internalType": "contract SpellBar","name": "","type": "address"}],"stateMutability": "view","type": "function"}]
  const OMNIDEX_VAULT_ABI = [{"inputs": [{"internalType": "contract IERC20","name": "_token","type": "address"},{"internalType": "contract IERC20","name": "_receiptToken","type": "address"},{"internalType": "contract IZenMaster","name": "_zenmaster","type": "address"},{"internalType": "address","name": "_admin","type": "address"},{"internalType": "address","name": "_treasury","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "sender","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shares","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "lastDepositedTime","type": "uint256"}],"name": "Deposit","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "sender","type": "address"},{"indexed": false,"internalType": "uint256","name": "performanceFee","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "callFee","type": "uint256"}],"name": "Harvest","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [],"name": "Pause","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "account","type": "address"}],"name": "Paused","type": "event"},{"anonymous": false,"inputs": [],"name": "Unpause","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "account","type": "address"}],"name": "Unpaused","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "sender","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shares","type": "uint256"}],"name": "Withdraw","type": "event"},{"inputs": [],"name": "MAX_CALL_FEE","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "MAX_PERFORMANCE_FEE","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "MAX_WITHDRAW_FEE","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "MAX_WITHDRAW_FEE_PERIOD","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "available","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "calculateHarvestCharmRewards","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "calculateTotalPendingCharmRewards","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "callFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "deposit","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "emergencyWithdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getPricePerFullShare","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "harvest","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_token","type": "address"}],"name": "inCaseTokensGetStuck","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "lastHarvestedTime","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "pause","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "paused","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "performanceFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "receiptToken","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"}],"name": "setAdmin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_callFee","type": "uint256"}],"name": "setCallFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_performanceFee","type": "uint256"}],"name": "setPerformanceFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_treasury","type": "address"}],"name": "setTreasury","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_withdrawFee","type": "uint256"}],"name": "setWithdrawFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_withdrawFeePeriod","type": "uint256"}],"name": "setWithdrawFeePeriod","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "token","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalShares","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "treasury","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "unpause","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "userInfo","outputs": [{"internalType": "uint256","name": "shares","type": "uint256"},{"internalType": "uint256","name": "lastDepositedTime","type": "uint256"},{"internalType": "uint256","name": "charmAtLastUserAction","type": "uint256"},{"internalType": "uint256","name": "lastUserActionTime","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_shares","type": "uint256"}],"name": "withdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdrawAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdrawFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "withdrawFeePeriod","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "zenmaster","outputs": [{"internalType": "contract IZenMaster","name": "","type": "address"}],"stateMutability": "view","type": "function"}]
  
  const Addresses = [
    "0x1482117c5F3F6962429C40068e22Cf4120bae94b"
  ]
  
  async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const OMNIDEX_ZEN_ADDR = "0x79f5A8BD0d6a00A41EA62cdA426CEf0115117a61";
    const rewardTokenTicker = "CHARM";
    const OMNIDEX_ZEN = new ethers.Contract(OMNIDEX_ZEN_ADDR, OMNIDEX_ZEN_ABI, App.provider);
    
    const tokens = {};
    const prices = await getTelosPrices();
    
    const charmToken = await getTelosToken(App, "0xd2504a02fABd7E546e41aD39597c377cA8B0E1Df", OMNIDEX_ZEN_ADDR);
    const dougeToken = await getTelosToken(App, "0xc6BC7A8dfA0f57Fe7746Ac434c01cD39679b372c", OMNIDEX_ZEN_ADDR);
    const usdcToken = await getTelosToken(App, "0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b", OMNIDEX_ZEN_ADDR);
    const karmaToken = await getTelosToken(App, "0x730d2Fa7dC7642E041bcE231E85b39e9bF4a6a64", OMNIDEX_ZEN_ADDR);
    const charmUsdcPool = await getTelosPoolInfo(App, OMNIDEX_ZEN, OMNIDEX_ZEN_ADDR, 7, "pendingCharm");
    const charmDougePool = await getTelosPoolInfo(App, OMNIDEX_ZEN, OMNIDEX_ZEN_ADDR, 6, "pendingCharm");
    const charmKarmaPool = await getTelosPoolInfo(App, OMNIDEX_ZEN, OMNIDEX_ZEN_ADDR, 25, "pendingCharm");
    
    var usdcAmountInCharmUsdcPool = charmUsdcPool.poolToken.q0 / 10 ** usdcToken.decimals;
    var charmAmountInCharmUsdcPool = charmUsdcPool.poolToken.q1 / 10 ** charmToken.decimals;
    
    var dougeAmountInCharmDougePool = charmDougePool.poolToken.q0 / 10 ** dougeToken.decimals;
    var charmAmountInCharmDougePool = charmDougePool.poolToken.q1 / 10 ** charmToken.decimals;
    
    var karmaAmountInCharmKarmaPool = charmKarmaPool.poolToken.q0 / 10 ** karmaToken.decimals;
    var charmAmountInCharmKarmaPool = charmKarmaPool.poolToken.q1 / 10 ** charmToken.decimals;
    
    var charmUsdPrice = usdcAmountInCharmUsdcPool / charmAmountInCharmUsdcPool;
    var dougeUsdPrice = charmUsdPrice / (dougeAmountInCharmDougePool / charmAmountInCharmDougePool);
    var karmaUsdPrice = charmUsdPrice / (karmaAmountInCharmKarmaPool / charmAmountInCharmKarmaPool);
    
    prices["0xd2504a02fABd7E546e41aD39597c377cA8B0E1Df"].usd = charmUsdPrice;
    prices["0x65a5f4636233B7B4c4B134BA414c6EaB9fF79594"].usd = charmUsdPrice;
    prices["0xc6BC7A8dfA0f57Fe7746Ac434c01cD39679b372c"] = { usd: dougeUsdPrice };
    prices["0x730d2Fa7dC7642E041bcE231E85b39e9bF4a6a64"] = { usd: karmaUsdPrice };
    
    await loadOmniChefContract(App, tokens, prices, OMNIDEX_ZEN, OMNIDEX_ZEN_ADDR, OMNIDEX_ZEN_ABI, rewardTokenTicker,
        "charm", "charmPerBlock", null, "pendingCharm");
  
    hideLoading();
  }

async function getTelosPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);  
  const poolToken = await getTelosToken(App, poolInfo.lpToken ?? poolInfo.token, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolInfo.lpToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}

async function loadOmniChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://www.teloscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getTelosToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 * 2; // Telos block time: 0.5s = 2 blocks/s

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getTelosPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getTelosToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "telos") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "telos") : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    
    if(poolInfos[i].address == "0x389A833f83aAF096C6D3a550624C26151AaddcDC" || poolInfos[i].address == "0x4942fc8b88dF31349d384Bb24455C1Ba42c5B1d7") {
      continue;
    }
    
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, "telos", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
      aprs.push(apr);
    }
  }
  
  let totalUserStaked=0, totalStaked=0, averageApr=0;
  for (const a of aprs) {
    if(a == undefined) {
      continue;
    }
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