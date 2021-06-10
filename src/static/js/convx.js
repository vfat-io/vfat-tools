$(function() {
consoleInit(main)
  });

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const CONV_CHEF_ADDR = "0x37c7C2ae51E968CEfB82cFF2102727256D36D6eE";
  const CONV_CHEF_ABI = [{"inputs":[{"internalType":"uint256","name":"_migratorSetterDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newMigrator","type":"address"}],"name":"MigratorChangeProposed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldMigrator","type":"address"},{"indexed":false,"internalType":"address","name":"newMigrator","type":"address"}],"name":"MigratorChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"migrationBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"PoolCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"oldEndBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newEndBlock","type":"uint256"}],"name":"PoolEndBlockExtended","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"address","name":"oldToken","type":"address"},{"indexed":false,"internalType":"address","name":"newToken","type":"address"}],"name":"PoolMigrated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"oldMigrationBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newMigrationBlock","type":"uint256"}],"name":"PoolMigrationBlockExtended","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"oldRewardPerBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newRewardPerBlock","type":"uint256"}],"name":"PoolRewardRateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"address","name":"rewarder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardRedeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldRewarder","type":"address"},{"indexed":false,"internalType":"address","name":"newRewarder","type":"address"}],"name":"RewarderChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"endBlock","type":"uint256"},{"internalType":"uint256","name":"migrationBlock","type":"uint256"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"createPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId","type":"uint256"}],"name":"emergencyUnstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"executeMigratorChange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId","type":"uint256"},{"internalType":"uint256","name":"newEndBlock","type":"uint256"}],"name":"extendEndBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId","type":"uint256"},{"internalType":"uint256","name":"newMigrationBlock","type":"uint256"}],"name":"extendMigrationBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId","type":"uint256"},{"internalType":"address","name":"staker","type":"address"}],"name":"getReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPoolId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId","type":"uint256"}],"name":"migratePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract IStakingPoolMigrator","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"migratorSetterDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingMigrator","outputs":[{"internalType":"uint64","name":"proposeTime","type":"uint64"},{"internalType":"address","name":"newMigrator","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolData","outputs":[{"internalType":"uint256","name":"totalStakeAmount","type":"uint256"},{"internalType":"uint256","name":"accuRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"accuRewardLastUpdateBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfos","outputs":[{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"endBlock","type":"uint256"},{"internalType":"uint256","name":"migrationBlock","type":"uint256"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"address","name":"poolToken","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newMigrator","type":"address"}],"name":"proposeMigratorChange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId","type":"uint256"}],"name":"redeemRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewarder","outputs":[{"internalType":"contract IStakingPoolRewarder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId","type":"uint256"},{"internalType":"uint256","name":"newRewardPerBlock","type":"uint256"}],"name":"setPoolReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newRewarder","type":"address"}],"name":"setRewarder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userData","outputs":[{"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"internalType":"uint256","name":"pendingReward","type":"uint256"},{"internalType":"uint256","name":"entryAccuRewardPerShare","type":"uint256"}],"stateMutability":"view","type":"function"}]
  const CONV_CHEF = new ethers.Contract(CONV_CHEF_ADDR, CONV_CHEF_ABI, App.provider);
  const rewardTokenAddress = "0xc834Fa996fA3BeC7aAD3693af486ae53D8aA8B50";

  await loadCONVContract(App, CONV_CHEF, CONV_CHEF_ADDR, CONV_CHEF_ABI,
      "CONV", rewardTokenAddress);

  hideLoading();
}

async function loadCONVContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenAddress, extraPrices, deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = 5;  //there is no pool lenght function, added manually

  _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
    try {
      return await getCONVPoolInfo(App, chefContract, chefAddress, x, rewardTokenAddress);
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
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].weeklyRewards, rewardTokenTicker, rewardTokenAddress)
      aprs.push(apr);
    }
  }
  let totalUserStaked=0, totalStaked=0, averageApr=0;
  for (const a of aprs) {
    if (a && !isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a && a.userStakedUsd > 0) {
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

async function getCONVPoolInfo(app, chefContract, chefAddress, poolIndex, rewardTokenAddress) {
  if(poolIndex == 0 || poolIndex == 5){
    return {
      address: poolInfo.poolToken,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
      weeklyRewards : 0
    };
  }
  const poolInfo = await chefContract.poolInfos(poolIndex);
  const rewardToken = await getToken(app, rewardTokenAddress, chefAddress);
  const weeklyRewards = await poolInfo.rewardPerBlock / 10 ** rewardToken.decimals * 604800 / 13.5
  const poolToken = await getToken(app, poolInfo.poolToken, chefAddress);
  const userInfo = await chefContract.userData(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = userInfo.pendingReward;
  const staked = userInfo.stakeAmount / 10 ** poolToken.decimals;
  return {
      address             : poolInfo.poolToken,
      poolToken           : poolToken,
      userStaked          : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      weeklyRewards       : weeklyRewards
  };
}

function printChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  let poolRewardsPerWeek = rewardsPerWeek;
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
  printCONVContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}

function printCONVContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return convContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardTokens)
  }
  const claim = async function() {
    return convContract_claim(chefAbi, chefAddr, poolIndex, App, claimFunction, pendingRewardTokens)
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
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const convContract_unstake = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
  const earnedTokenAmount = pendingRewardTokens

  if (earnedTokenAmount > 0) {
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

const convContract_claim = async function(chefAbi, chefAddress, poolIndex, App,
    claimFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = pendingRewardTokens

  if (earnedTokenAmount > 0) {
    showLoading()
    if (claimFunction) {
      claimFunction(poolIndex, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
    }
    else {
      CHEF_CONTRACT.deposit(poolIndex, 0, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
}