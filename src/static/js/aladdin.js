$(function() {
consoleInit(main)
  });

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const ACRV_CHEF_ADDR = "0xc8ff37f7d057df1bb9ad681b53fa4726f268e0e8";
    const ACRV_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_convexPid","type":"uint256"},{"indexed":false,"internalType":"address[]","name":"_rewardTokens","type":"address[]"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_reward","type":"uint256"},{"indexed":false,"internalType":"enum IAladdinConvexVault.ClaimOption","name":"_option","type":"uint8"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":true,"internalType":"address","name":"_sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"bool","name":"_status","type":"bool"}],"name":"PausePoolDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"bool","name":"_status","type":"bool"}],"name":"PausePoolWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_percentage","type":"uint256"}],"name":"UpdateHarvestBountyPercentage","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_platform","type":"address"}],"name":"UpdatePlatform","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_feePercentage","type":"uint256"}],"name":"UpdatePlatformFeePercentage","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"address[]","name":"_rewardTokens","type":"address[]"}],"name":"UpdatePoolRewardTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_feePercentage","type":"uint256"}],"name":"UpdateWithdrawalFeePercentage","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_zap","type":"address"}],"name":"UpdateZap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":true,"internalType":"address","name":"_sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_convexPid","type":"uint256"},{"internalType":"address[]","name":"_rewardTokens","type":"address[]"},{"internalType":"uint256","name":"_withdrawFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_platformFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_harvestBountyPercentage","type":"uint256"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"aladdinCRV","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_minOut","type":"uint256"},{"internalType":"enum IAladdinConvexVault.ClaimOption","name":"_option","type":"uint8"}],"name":"claim","outputs":[{"internalType":"uint256","name":"claimed","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minOut","type":"uint256"},{"internalType":"enum IAladdinConvexVault.ClaimOption","name":"_option","type":"uint8"}],"name":"claimAll","outputs":[{"internalType":"uint256","name":"claimed","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"share","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"depositAll","outputs":[{"internalType":"uint256","name":"share","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_minimumOut","type":"uint256"}],"name":"harvest","outputs":[{"internalType":"uint256","name":"harvested","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_aladdinCRV","type":"address"},{"internalType":"address","name":"_zap","type":"address"},{"internalType":"address","name":"_platform","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"bool","name":"_status","type":"bool"}],"name":"pausePoolDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"bool","name":"_status","type":"bool"}],"name":"pausePoolWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_account","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"pendingRewardAll","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"platform","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint128","name":"totalUnderlying","type":"uint128"},{"internalType":"uint128","name":"totalShare","type":"uint128"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"convexPoolId","type":"uint256"},{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"address","name":"crvRewards","type":"address"},{"internalType":"uint256","name":"withdrawFeePercentage","type":"uint256"},{"internalType":"uint256","name":"platformFeePercentage","type":"uint256"},{"internalType":"uint256","name":"harvestBountyPercentage","type":"uint256"},{"internalType":"bool","name":"pauseDeposit","type":"bool"},{"internalType":"bool","name":"pauseWithdraw","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"pools","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_percentage","type":"uint256"}],"name":"updateHarvestBountyPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_platform","type":"address"}],"name":"updatePlatform","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_feePercentage","type":"uint256"}],"name":"updatePlatformFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address[]","name":"_rewardTokens","type":"address[]"}],"name":"updatePoolRewardTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_feePercentage","type":"uint256"}],"name":"updateWithdrawFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_zap","type":"address"}],"name":"updateZap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint128","name":"shares","type":"uint128"},{"internalType":"uint128","name":"rewards","type":"uint128"},{"internalType":"uint256","name":"rewardPerSharePaid","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_minOut","type":"uint256"},{"internalType":"enum IAladdinConvexVault.ClaimOption","name":"_option","type":"uint8"}],"name":"withdrawAllAndClaim","outputs":[{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"claimed","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_shares","type":"uint256"},{"internalType":"uint256","name":"_minOut","type":"uint256"},{"internalType":"enum IAladdinConvexVault.ClaimOption","name":"_option","type":"uint8"}],"name":"withdrawAndClaim","outputs":[{"internalType":"uint256","name":"withdrawn","type":"uint256"},{"internalType":"uint256","name":"claimed","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"zap","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
    const ACRV_CHEF = new ethers.Contract(ACRV_CHEF_ADDR, ACRV_CHEF_ABI, App.provider);

    _print("Please use the official site in order to withdraw or claim your rewards\n");

    await loadAlladinContract(App, ACRV_CHEF, ACRV_CHEF_ADDR, ACRV_CHEF_ABI, "pendingReward");

    hideLoading();
  }

async function getAlladinPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  const poolToken = await getToken(app, poolInfo.lpToken, chefAddress);
  poolToken.staked = poolInfo.totalShare / 10 ** poolToken.decimals;
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.shares / 10 ** poolToken.decimals;
  return {
      address: poolInfo.lpToken,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      withdrawFee : poolInfo.withdrawFeePercentage / 1e9  // The withdraw fee percentage, with 1e9 precision.
  };
}

async function loadAlladinContract(App, chef, chefAddress, chefAbi, pendingRewardsFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);

  _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  var tokens = {};

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
    try {
      return await getAlladinPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction);
    }
    catch (ex) {
      console.log(`Error loading pool ${x}: ${ex}`);
      return null;
    }
  }));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));
  tokenAddresses.push("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
  var prices = await lookUpTokenPrices(tokenAddresses);

  prices["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"] = getParameterCaseInsensitive(prices,  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, chefAddress);
  }));

  const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (let i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printAlladinPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        pendingRewardsFunction, "eth", 0, poolInfos[i].withdrawFee)
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
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)}`)
  }
  return { prices, totalUserStaked, totalStaked }
}

function printAlladinPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       pendingRewardsFunction, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals =  2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printAlladinAPR(poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printAladdinContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, chain, depositFee, withdrawFee);
  return apr;
}

function printAladdinContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  _print("");
}

function printAlladinAPR(stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  fixedDecimals = fixedDecimals ?? 2;
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct
  }
}