
$(function() {
consoleInit(main)
});

const OCX_STAKING_ABI = [{"type":"event","name":"FeeBurned","inputs":[{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FeeCollected","inputs":[{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Unstaked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"changeUnstakingFeeRatio","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"checkPoints","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"feeBurn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getCheckPoints","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getRewardPerSecond","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getRewardThenStake","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"}],"name":"getTotalEmittedTokens","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"},{"type":"uint256","name":"_startingCheckPoint","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address","name":"_rewardsToken","internalType":"address"},{"type":"address","name":"_stakingToken","internalType":"address"},{"type":"uint256","name":"emissionStart","internalType":"uint256"},{"type":"uint256","name":"firstCheckPoint","internalType":"uint256"},{"type":"uint256","name":"_rewardPerSecond","internalType":"uint256"},{"type":"address","name":"admin","internalType":"address"},{"type":"bool","name":"_feeBurn","internalType":"bool"},{"type":"uint256","name":"_unstakingFeeRatio","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"initialized","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"newUnstakingFeeRatio","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"pendingOwner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerSecond","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardsToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setFeeBurn","inputs":[{"type":"bool","name":"_feeBurn","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setNewUnstakingFeeRatio","inputs":[{"type":"uint256","name":"_newUnstakingFeeRatio","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"showPendingReward","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"stakes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20Burnable"}],"name":"stakingToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startingCheckPoint","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalStake","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"},{"type":"bool","name":"direct","internalType":"bool"},{"type":"bool","name":"renounce","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferStake","inputs":[{"type":"address","name":"_recipient","internalType":"address"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unstake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"maximumFee","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"unstakingFeeDenominator","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"unstakingFeeRatio","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"unstakingFeeRatioTimelock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"unstakingFeeRatioTimelockPeriod","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateSchedule","inputs":[{"type":"uint256","name":"checkPoint","internalType":"uint256"},{"type":"uint256","name":"_rewardPerSecond","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawFee","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]

const Addresses = [
  "0x52e5ab28e0e1ae31F47E641232E555E45aA1B633",
  "0xE2a525Ac8b8d69A0Bd28fb45e9DFE52E96c85b32",
  "0x7862cb7000219b7b6EDB3f19Be6146ac71f1bfeE",
  "0x64fF2DAf1c408194997eE9667c180e3Be253E92E",
  "0xD858B37Bc72A999D761d7F02C455Af33889527e3",
  "0xd6edD59554c35B5365d6440ECe932d0B2EBEfddA",
  "0xAc6b993a6048Bda3e3D6A5B7F82aD343Fc02448a",
  "0x9c8A8D86ad3d903cE8FD064f3AfBAE3404a8D69C",
  "0x53E6A863E32F2C8d0b21e063A449E4E5071240b5",
  "0x1c2777D143f16d6D599c49333A83F49fFc9202Ae",
  "0x08DEF7C0a36d9caDF83580aa8c5a4aACCdeF2C89",
  "0x699338D863C36a06F2078d58a4b4e8795D79dfC3",
  "0xB9B5e91641eb2Ad40140F4aB4D1e919F40Ac9E70",
  "0x13a28a2516835B1b67bC04c55aC59330543c22e0",
  "0xFD3B0c0ed76A577b31254c21c6dFfB017024F8E9",
  "0x4Ba4eA12411fa62456C64AF8a2B2F7E3A35Ec258",
  "0x067395D2532BA849130a9ce96A21ED3E236e6584",
  "0x74E151B2841D9D92cE5e8aeBA1a6592239b799bc",
  "0x99a59791ec2EaB94EE10aD2fA5979B4beCD2c676",
  "0x723bfe4565bb027c04C828B5752a1420b94cacF1",
  "0x3Cef1c1e05F0F2f3504Cd09FaD5bB2c046EBf4E1",
  "0x43e2b34ebd7690e3208a0406e06BD8060D090703",
  "0xF00751d22AF56c0A20856B465c3AB5bDf7B84Ac2"
]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMilkomedaPrices();

  const pools = Addresses.map(a => { return {
    address: a,
    abi: OCX_STAKING_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardsToken"
  }})

  let p = await loadMultipleOCXSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

async function loadMultipleOCXSynthetixPools(App, tokens, prices, pools, customURLs) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadOCXSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos.filter(i => i?.poolPrices)) {
    let p = await printOCXSynthetixPool(App, i, "milkomeda", customURLs);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadOCXSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    var stakeToken = await getMilkomedaToken(App, stakeTokenAddress, stakingAddress);
    stakeToken.staked = await STAKING_POOL.totalStake() / 10 ** stakeToken.decimals;

    const rewardsPerSecond = await STAKING_POOL.getRewardPerSecond();
    const _getCheckPoints = await STAKING_POOL.getCheckPoints();
    const getCheckPoints = _getCheckPoints.map(c => c / 1);
    const _now = Date.now() / 1000
    const now = parseInt(_now.toString())

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getMilkomedaToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getMilkomedaToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "milkomeda");

    if (!poolPrices)
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    let weeklyRewards = 0;
    for(let i = 0; i < rewardsPerSecond.length; i++){
      if(now < getCheckPoints[i+1]){
        weeklyRewards = rewardsPerSecond[i] / 10 ** rewardToken.decimals * 604800;
        break;
      }else{
        weeklyRewards = 0;
      }
    }
    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = await STAKING_POOL.stakes(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = await STAKING_POOL.showPendingReward(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;

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

async function printOCXSynthetixPool(App, info, chain="eth", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
  const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
  const dailyAPR = weeklyAPR / 7;
  const yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (info.userStaked > 0) {
    info.poolPrices.print_contained_price(info.userStaked);
      const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
      const userDailyRewards = userWeeklyRewards / 7;
      const userYearlyRewards = userWeeklyRewards * 52;
      _print(`Estimated ${info.rewardTokenTicker} earnings:`
          + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
          + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
  }
  const approveTENDAndStake = async function() {
    return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function() {
    return ocxContract_unstake(info.stakingAddress, App)
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
  _print(`<a target="_blank" href="https://explorer-mainnet-cardano-evm.c1.milkomeda.com/address/${info.stakingAddress}#code">Milkomeda Explorer</a>`);
  if (info.stakeTokenAddress != "0x0000000000000000000000000000000000000000") {
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  }
  else {
    _print(`Please use the official website to stake ${info.stakeTokenTicker}.`);
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
      userStaked : userStakedUsd,
      apr : yearlyAPR
  }
}

const ocxContract_unstake = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)
  const currentStakedAmount = await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.unstake(currentStakedAmount, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}