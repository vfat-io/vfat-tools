
$(function() {
consoleInit(main)
  });

const MOE_CHEF_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"moe","internalType":"contract IMoe"},{"type":"address","name":"veMoe","internalType":"contract IVeMoe"},{"type":"address","name":"factory","internalType":"contract IRewarderFactory"},{"type":"uint256","name":"treasuryShare","internalType":"uint256"}]},{"type":"error","name":"AddressEmptyCode","inputs":[{"type":"address","name":"target","internalType":"address"}]},{"type":"error","name":"AddressInsufficientBalance","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"error","name":"FailedInnerCall","inputs":[]},{"type":"error","name":"InvalidInitialization","inputs":[]},{"type":"error","name":"MasterChef__CannotRenounceOwnership","inputs":[]},{"type":"error","name":"MasterChef__InvalidMoePerSecond","inputs":[]},{"type":"error","name":"MasterChef__InvalidShares","inputs":[]},{"type":"error","name":"MasterChef__MintFailed","inputs":[]},{"type":"error","name":"MasterChef__NotMasterchefRewarder","inputs":[]},{"type":"error","name":"MasterChef__ZeroAddress","inputs":[]},{"type":"error","name":"Math__UnderOverflow","inputs":[]},{"type":"error","name":"NotInitializing","inputs":[]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"type":"address","name":"owner","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"error","name":"SafeERC20FailedOperation","inputs":[{"type":"address","name":"token","internalType":"address"}]},{"type":"event","name":"ExtraRewarderSet","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"address","name":"extraRewarder","internalType":"contract IMasterChefRewarder","indexed":false}],"anonymous":false},{"type":"event","name":"FarmAdded","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"address","name":"token","internalType":"contract IERC20","indexed":true}],"anonymous":false},{"type":"event","name":"Initialized","inputs":[{"type":"uint64","name":"version","internalType":"uint64","indexed":false}],"anonymous":false},{"type":"event","name":"MoePerSecondSet","inputs":[{"type":"uint256","name":"moePerSecond","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferStarted","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"PositionModified","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"int256","name":"deltaAmount","internalType":"int256","indexed":false},{"type":"uint256","name":"moeReward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TreasurySet","inputs":[{"type":"address","name":"treasury","internalType":"address","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"acceptOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"address","name":"token","internalType":"contract IERC20"},{"type":"address","name":"extraRewarder","internalType":"contract IMasterChefRewarder"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claim","inputs":[{"type":"uint256[]","name":"pids","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getDeposit","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IMasterChefRewarder"}],"name":"getExtraRewarder","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getLastUpdateTimestamp","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IMoe"}],"name":"getMoe","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMoePerSecond","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMoePerSecondForPid","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getNumberOfFarms","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"moeRewards","internalType":"uint256[]"},{"type":"address[]","name":"extraTokens","internalType":"contract IERC20[]"},{"type":"uint256[]","name":"extraRewards","internalType":"uint256[]"}],"name":"getPendingRewards","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256[]","name":"pids","internalType":"uint256[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IRewarderFactory"}],"name":"getRewarderFactory","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"getToken","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getTotalDeposit","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getTreasury","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getTreasuryShare","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IVeMoe"}],"name":"getVeMoe","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address","name":"initialOwner","internalType":"address"},{"type":"address","name":"treasury","internalType":"address"},{"type":"address","name":"futureFunding","internalType":"address"},{"type":"address","name":"team","internalType":"address"},{"type":"uint256","name":"futureFundingAmount","internalType":"uint256"},{"type":"uint256","name":"teamAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"pendingOwner","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setExtraRewarder","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"},{"type":"address","name":"extraRewarder","internalType":"contract IMasterChefRewarder"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMoePerSecond","inputs":[{"type":"uint96","name":"moePerSecond","internalType":"uint96"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTreasury","inputs":[{"type":"address","name":"treasury","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateAll","inputs":[{"type":"uint256[]","name":"pids","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"},{"type":"uint256","name":"amount","internalType":"uint256"}]}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
    _print("This may take a minute...\n");

   const MOE_CHEF_ADDR = "0xA756f7D419e1A5cbd656A438443011a7dE1955b5";
   const rewardTokenTicker = "MOE";
   const MOE_CHEF = new ethers.Contract(MOE_CHEF_ADDR, MOE_CHEF_ABI, App.provider);

    const tokens = {};
    const prices = await getMantlePrices();

    await loadMoeChefContract(App, tokens, prices, MOE_CHEF, MOE_CHEF_ADDR, MOE_CHEF_ABI, rewardTokenTicker,
        "getMoe", [], "mantle");

    hideLoading();
  }

async function loadMoeChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, deathPoolIndices, chain) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.getNumberOfFarms(), 10);

  _print(`<a href='https://explorer.mantle.xyz/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getGeneralToken(App, rewardTokenAddress, chefAddress);

  let poolInfos = []
  for(let i = 0; i < poolCount; i++){
    const poolInfo = await getMoePoolInfo(App, chefContract, chefAddress, i)
    poolInfos.push(poolInfo);
  }

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getGeneralToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, chain) : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, chain) : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printMoePool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        null, null, chain)
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

function printMoePool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       fixedDecimals, claimFunction, chain="eth") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printMoeContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain);
  return apr;
}

function printMoeContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return moeContract_unstake(chefAbi, chefAddr, poolIndex, App)
  }
  const claim = async function() {
    return moeContract_claim(chefAbi, chefAddr, poolIndex, App, claimFunction)
  }

  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const moeContract_claim = async function(chefAbi, chefAddress, poolIndex, App, claimFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  CHEF_CONTRACT.claim([poolIndex], {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
  }

const moeContract_unstake = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  const currentStakedAmount = await CHEF_CONTRACT.getDeposit(poolIndex, App.YOUR_ADDRESS) / 10 ** poolToken.decimals;

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

async function getMoePoolInfo(app, chefContract, chefAddress, poolIndex) {
  const poolTokenAddress = await chefContract.getToken(poolIndex);
  const poolToken = await getGeneralToken(app, poolTokenAddress, chefAddress);
  const staked = await chefContract.getDeposit(poolIndex, app.YOUR_ADDRESS) / 10 ** poolToken.decimals;
  const treasuryShare = await chefContract.getTreasuryShare() / 1e18;
  const _rewardsPerSecond = await chefContract.getMoePerSecondForPid(poolIndex) / 1e18
  const treasuryFee = _rewardsPerSecond * treasuryShare;
  const rewardsPerSecond = _rewardsPerSecond - treasuryFee;
  const rewardsPerWeek = rewardsPerSecond * 604800;
  const _pendingRewardTokens = await chefContract.getPendingRewards(app.YOUR_ADDRESS, [poolIndex]);
  const pendingRewardTokens = _pendingRewardTokens.moeRewards[0];
  return {
      address: poolTokenAddress,
      poolToken: poolToken,
      userStaked : staked,
      rewardsPerWeek: rewardsPerWeek,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18
  };
}