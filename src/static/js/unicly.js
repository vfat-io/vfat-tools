$(function() {
consoleInit(main)
  });

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const UNIC_CHEF_ADDR = "0x4A25E4DF835B605A5848d2DB450fA600d96ee818";
    const XUNIC_VAULT_ADDR = "0x07306aCcCB482C8619e7ed119dAA2BDF2b4389D0";
    const UNIC_CHEF_ABI = [{"inputs":[{"internalType":"contract Unic","name":"_unic","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"uint256","name":"_mintRateMultiplier","type":"uint256"},{"internalType":"uint256","name":"_mintRateDivider","type":"uint256"},{"internalType":"uint256","name":"_unicPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_blocksPerTranche","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"bool","name":"withUpdate","type":"bool"}],"name":"Add","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"devaddr","type":"address"}],"name":"Dev","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[],"name":"MassUpdatePools","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"bool","name":"withUpdate","type":"bool"}],"name":"Set","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pid","type":"uint256"}],"name":"UpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"},{"internalType":"address","name":"_uToken","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"blocksPerTranche","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintRateDivider","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintRateMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingUnic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accUnicPerShare","type":"uint256"},{"internalType":"address","name":"uToken","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintRateMultiplier","type":"uint256"},{"internalType":"uint256","name":"_mintRateDivider","type":"uint256"},{"internalType":"uint256","name":"_unicPerBlock","type":"uint256"},{"internalType":"uint256","name":"_blocksPerTranche","type":"uint256"}],"name":"setMintRules","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"setStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tranche","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unic","outputs":[{"internalType":"contract Unic","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unicPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const XUNIC_VAULT_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"devaddr","type":"address"}],"name":"Dev","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"numberOfUpdatedPools","type":"uint256"}],"name":"DoHardWork","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pid","type":"uint256"}],"name":"UpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"UNIC","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNIC_MASTERCHEF","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"XUNIC","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devFeeDenominator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"doHardWork","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getxUNICRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"haveApprovedToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minBlocksToUpdatePoolInDoHardWork","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingxUNICs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"totalLPTokens","type":"uint256"},{"internalType":"uint256","name":"accXUNICPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenToWithdraw","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const XUNIC_VAULT = new ethers.Contract(XUNIC_VAULT_ADDR, XUNIC_VAULT_ABI, App.provider);
    const UNIC_CHEF = new ethers.Contract(UNIC_CHEF_ADDR, UNIC_CHEF_ABI, App.provider);
    const rewardsPerWeek = await UNIC_CHEF.unicPerBlock() / 1e18 * 604800 / 13.5;

    await loadChefContract(App, UNIC_CHEF, UNIC_CHEF_ADDR, UNIC_CHEF_ABI,
        "UNIC", "unic", null, rewardsPerWeek, "pendingUnic");

    await loadXUnicVaultContract(App, XUNIC_VAULT, XUNIC_VAULT_ADDR, XUNIC_VAULT_ABI,
        "XUNIC", "XUNIC", "pendingxUNICs", UNIC_CHEF);

    hideLoading();
  }

async function loadXUnicVaultContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, pendingRewardsFunction, unicChef,
    extraPrices, deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();

  const poolCount = 34;

  _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} vaults.\n`)

  _print(`Showing incentivized pools only.\n`);

  let tokens = {};

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
    try {
      return await getXUnicVaultInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, unicChef);
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

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "eth") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (let i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printXUnicVault(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, poolInfos[i].pendingRewardTokens)
      aprs.push(apr);
    }
  }
  let totalUserStaked=0, totalStaked=0;
  for (const a of aprs) {
    if (a && !isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a && a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
    }
  }
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`You are staking a total of $${formatMoney(totalUserStaked)}`)
  }
}

async function getXUnicVaultInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction, unicChef) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  const poolUnicInfo = await unicChef.poolInfo(poolIndex);
  const poolToken = await getToken(app, poolUnicInfo.lpToken ?? poolUnicInfo.stakingToken, chefAddress);
  poolToken.staked = poolInfo.totalLPTokens / 10 ** poolToken.decimals;
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolUnicInfo.lpToken ?? poolUnicInfo.stakingToken,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18
  };
}

function printXUnicVault(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, pendingRewardTokens, fixedDecimals, claimFunction, chain="eth") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const userStakedUsd = userStaked * poolPrices.price;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  if(userStaked > 0){
    _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${poolPrices.stakeTokenTicker} ($${formatMoney(userStaked * poolPrices.price)})`);
    poolPrices.print_contained_price(userStaked);
  }
  printUniclyChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardTokens,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    userStaked, fixedDecimals, claimFunction, rewardPrice, chain, pendingRewardsFunction);
  return{ totalStakedUsd : staked_tvl,
    userStakedUsd }
}

function printUniclyChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardTokens,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, fixedDecimals,
    claimFunction, rewardTokenPrice, chain, pendingRewardsFunction) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  const claim = async function() {
    return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}