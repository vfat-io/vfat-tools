$(function() {
    consoleInit(main)
});
const BUNI_CHEF_ABI = [{inputs:[{internalType:"contract BuniToken",name:"_buni",type:"address"},{internalType:"contract IERC721",name:"_vBuni",type:"address"},{internalType:"address",name:"_devaddr",type:"address"},{internalType:"uint256",name:"_buniPerBlock",type:"uint256"},{internalType:"uint256",name:"_startBlock",type:"uint256"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!0,internalType:"uint256",name:"pid",type:"uint256"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"Deposit",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!0,internalType:"uint256",name:"pid",type:"uint256"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"EmergencyWithdraw",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!0,internalType:"uint256",name:"pid",type:"uint256"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"Harvest",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!0,internalType:"uint256",name:"pid",type:"uint256"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"},{indexed:!1,internalType:"uint256",name:"endInvestAt",type:"uint256"}],name:"Vesting",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!0,internalType:"uint256",name:"pid",type:"uint256"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"Withdraw",type:"event"},{inputs:[],name:"BONUS_MULTIPLIER",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"MAX_MINT",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_allocPoint",type:"uint256"},{internalType:"contract IBEP20",name:"_lpToken",type:"address"},{internalType:"bool",name:"_withUpdate",type:"bool"}],name:"add",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"buni",outputs:[{internalType:"contract BuniToken",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"buniPerBlock",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"deposit",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_devaddr",type:"address"}],name:"dev",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"devaddr",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"emergencyWithdraw",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_from",type:"uint256"},{internalType:"uint256",name:"_to",type:"uint256"}],name:"getMultiplier",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_amount",type:"uint256"}],name:"getWithdrawFee",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"}],name:"harvest",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"massUpdatePools",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"}],name:"migrate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"migrator",outputs:[{internalType:"contract IMigratorChef",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"penaltyTime",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"address",name:"_user",type:"address"}],name:"pendingBuni",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"platformFeeRate",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"poolInfo",outputs:[{internalType:"contract IBEP20",name:"lpToken",type:"address"},{internalType:"uint256",name:"allocPoint",type:"uint256"},{internalType:"uint256",name:"lastRewardBlock",type:"uint256"},{internalType:"uint256",name:"accBuniPerShare",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"poolLength",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256[]",name:"_tokenIds",type:"uint256[]"}],name:"redeemBatchBuni",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_tokenId",type:"uint256"}],name:"redeemBuni",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"uint256",name:"_allocPoint",type:"uint256"},{internalType:"bool",name:"_withUpdate",type:"bool"}],name:"set",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_buniPerBlock",type:"uint256"}],name:"setBuniPerBlock",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_maxMint",type:"uint256"}],name:"setMaxMint",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"contract IMigratorChef",name:"_migrator",type:"address"}],name:"setMigrator",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_newPenalty",type:"uint256"}],name:"setPenaltyFee",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_penaltyIn",type:"uint256"}],name:"setPenaltyTime",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_lockedIn",type:"uint256"}],name:"setTimeLock",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_treasury",type:"address"}],name:"setTreasury",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"startBlock",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalAllocPoint",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalMint",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"treasury",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"multiplierNumber",type:"uint256"}],name:"updateMultiplier",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"}],name:"updatePool",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"},{internalType:"address",name:"",type:"address"}],name:"userInfo",outputs:[{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"uint256",name:"rewardDebt",type:"uint256"},{internalType:"uint256",name:"lastDeposit",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"vBuni",outputs:[{internalType:"contract IERC721",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"vestTimeLock",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"withdraw",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"withdrawDecimals",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}];

async function main() {
  const App = await init_ethers();

  const BUNI_CHEF_ADDR = "0xA12c974fE40ea825E66615bA0Dc4Fd19be4D7d24";
  const rewardTokenTicker = "BUNI";
  const BUNI_CHEF = new ethers.Contract(BUNI_CHEF_ADDR, BUNI_CHEF_ABI, App.provider);
  const rewardsPerWeek = await BUNI_CHEF.buniPerBlock() /1e18
  * 604800 / 3;
  var tokens = {};
  var prices = await getBscPrices();

  _print_bold('NFT FARMS\n');
  await loadBscChefContract(App, tokens, prices, BUNI_CHEF, BUNI_CHEF_ADDR, BUNI_CHEF_ABI, rewardTokenTicker,
    "buni", null, rewardsPerWeek, "pendingBuni");
  hideLoading();
}
  function printChefPool(
    App,
    chefAbi,
    chefAddr,
    prices,
    tokens,
    poolInfo,
    poolIndex,
    poolPrices,
    totalAllocPoints,
    rewardsPerWeek,
    rewardTokenTicker,
    rewardTokenAddress,
    pendingRewardsFunction,
    fixedDecimals,
    claimFunction,
    chain = "eth",
    depositFee = 0,
    withdrawFee = 0
  ) {
    fixedDecimals = fixedDecimals ?? 2;
    const sp =
      poolInfo.stakedToken == null
        ? null
        : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
    var poolRewardsPerWeek =
      (poolInfo.allocPoints / totalAllocPoints) * rewardsPerWeek;
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice =
      getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd || 0.11365833;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    _print_inline(`${poolIndex} - `);
    poolPrices.print_price(chain);
    sp?.print_price(chain);
    const apr = printAPR(
      rewardTokenTicker,
      rewardPrice,
      poolRewardsPerWeek,
      poolPrices.stakeTokenTicker,
      staked_tvl,
      userStaked,
      poolPrices.price,
      fixedDecimals
    );
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printChefContractLinks(
      App,
      chefAbi,
      chefAddr,
      poolIndex,
      poolInfo.address,
      pendingRewardsFunction,
      rewardTokenTicker,
      poolPrices.stakeTokenTicker,
      poolInfo.poolToken.unstaked,
      poolInfo.userStaked,
      poolInfo.pendingRewardTokens,
      fixedDecimals,
      claimFunction,
      rewardPrice,
      chain,
      depositFee,
      withdrawFee
    );
    return apr;
  }

  function printAPR(
    rewardTokenTicker,
    rewardPrice,
    poolRewardsPerWeek,
    stakeTokenTicker,
    staked_tvl,
    userStaked,
    poolTokenPrice,
    fixedDecimals
  ) {
    var usdPerWeek = poolRewardsPerWeek * rewardPrice;
    fixedDecimals = fixedDecimals ?? 2;
    _print(
      `${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(
        fixedDecimals
      )} ($${formatMoney(usdPerWeek)})`
    );
    var weeklyAPR = 0;
    var userStakedPct = 0;
    if (staked_tvl) {
      weeklyAPR = (usdPerWeek / staked_tvl) * 100;
    }
    var dailyAPR = weeklyAPR / 7;
    var yearlyAPR = weeklyAPR * 52;
    _print(
      `APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(
        2
      )}% Year ${yearlyAPR.toFixed(2)}%`
    );
    var userStakedUsd = userStaked * poolTokenPrice;
    if (staked_tvl) {
      userStakedPct = (userStakedUsd / staked_tvl) * 100;
    }

    _print(
      `You are staking ${userStaked.toFixed(
        fixedDecimals
      )} ${stakeTokenTicker} ($${formatMoney(
        userStakedUsd
      )}), ${userStakedPct.toFixed(2)}% of the pool.`
    );
    var userWeeklyRewards = (userStakedPct * poolRewardsPerWeek) / 100;
    var userDailyRewards = userWeeklyRewards / 7;
    var userYearlyRewards = userWeeklyRewards * 52;
    if (userStaked > 0) {
      _print(
        `Estimated ${rewardTokenTicker} earnings:` +
          ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(
            userDailyRewards * rewardPrice
          )})` +
          ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(
            userWeeklyRewards * rewardPrice
          )})` +
          ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(
            userYearlyRewards * rewardPrice
          )})`
      );
    }
    return {
      userStakedUsd,
      totalStakedUsd: staked_tvl,
      userStakedPct,
      yearlyAPR,
      userYearlyUsd: userYearlyRewards * rewardPrice,
    };
  }
  function printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
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
  _print_link(`Harvest NFT ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print_link(`<a href='https://bunicorn.exchange/#/vesting' target='_blank'>Show My NFT</a>`)
  _print(`Staking or unstaking also harvest rewards.`)
  _print("");
}
