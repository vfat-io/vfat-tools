$(function () {
consoleInit(main)
});
    
const CROP_CHEF_ABI = [{"inputs":[{"internalType":"contract Crop","name":"_crop","type":"address"},{"internalType":"address","name":"_treasury","type":"address"},{"internalType":"uint256","name":"_cropPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"contract IUniswapV2Router02","name":"_router","type":"address"},{"internalType":"contract IERC20","name":"_denomination","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"seed","type":"uint256"}],"name":"BiggerSeedRequired","type":"error"},{"inputs":[{"internalType":"uint16","name":"sowFee","type":"uint16"},{"internalType":"uint256","name":"reapFee","type":"uint256"}],"name":"InvalidFarmFees","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldCropPerBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newCropPerBlock","type":"uint256"}],"name":"CropGrowthAltered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"farmer","type":"address"},{"indexed":true,"internalType":"uint256","name":"fid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"seeds","type":"uint256"}],"name":"DDTSprayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"seed","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocPoints","type":"uint256"},{"indexed":false,"internalType":"uint16","name":"sowFee","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"reapFee","type":"uint16"},{"indexed":false,"internalType":"bool","name":"feeRotation","type":"bool"}],"name":"FarmAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"seed","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocPoints","type":"uint256"},{"indexed":false,"internalType":"uint16","name":"sowFee","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"reapFee","type":"uint16"},{"indexed":false,"internalType":"bool","name":"feeRotation","type":"bool"}],"name":"FarmUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"oldRotation","type":"bool"},{"indexed":false,"internalType":"bool","name":"newRotation","type":"bool"}],"name":"FeeRotationToggled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"formerGov","type":"address"},{"indexed":true,"internalType":"address","name":"newGov","type":"address"}],"name":"GovernanceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"farmer","type":"address"},{"indexed":true,"internalType":"uint256","name":"fid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"seeds","type":"uint256"}],"name":"Reap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldStartBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newStartBlock","type":"uint256"}],"name":"RewardsStartDelayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"farmer","type":"address"},{"indexed":true,"internalType":"uint256","name":"fid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"seeds","type":"uint256"}],"name":"Sow","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldTreasury","type":"address"},{"indexed":true,"internalType":"address","name":"newTreasury","type":"address"}],"name":"TreasuryChanged","type":"event"},{"inputs":[{"internalType":"uint256","name":"_fid","type":"uint256"}],"name":"DDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"PAIR_DENOMINATION","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNI_V2_CROP_PAIR","outputs":[{"internalType":"contract IUniswapV2Pair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNI_V2_ROUTER_LIKE","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"acceptGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_seed","type":"address"},{"internalType":"uint256","name":"_allocPoints","type":"uint256"},{"internalType":"uint16","name":"_sowFee","type":"uint16"},{"internalType":"uint16","name":"_reapFee","type":"uint16"},{"internalType":"bool","name":"_feeRotation","type":"bool"},{"internalType":"bool","name":"_sync","type":"bool"}],"name":"addFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newCropPerBlock","type":"uint256"}],"name":"alterCropGrowth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newGov","type":"address"}],"name":"changeGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newTreasury","type":"address"}],"name":"changeTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"crop","outputs":[{"internalType":"contract Crop","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cropPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newStartBlock","type":"uint256"}],"name":"delayStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"farmId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"farmers","outputs":[{"internalType":"uint256","name":"seeds","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"lastSeed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farms","outputs":[{"internalType":"contract IERC20","name":"seed","type":"address"},{"internalType":"uint256","name":"seeds","type":"uint256"},{"internalType":"uint256","name":"allocPoints","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accCropsPerShare","type":"uint256"},{"internalType":"uint16","name":"sowFee","type":"uint16"},{"internalType":"uint16","name":"reapFee","type":"uint16"},{"internalType":"bool","name":"feeRotation","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hasFeeRotation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"isFarm","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fid","type":"uint256"},{"internalType":"address","name":"_farmer","type":"address"}],"name":"pendingCrops","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingGovernance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fid","type":"uint256"}],"name":"reap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"removeGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fid","type":"uint256"},{"internalType":"uint256","name":"_allocPoints","type":"uint256"},{"internalType":"uint16","name":"_sowFee","type":"uint16"},{"internalType":"uint16","name":"_reapFee","type":"uint16"},{"internalType":"bool","name":"_feeRotation","type":"bool"}],"name":"setFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fid","type":"uint256"},{"internalType":"uint256","name":"_seed","type":"uint256"}],"name":"sow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"toggleFeeRotation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAllocPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const CROP_CHEF_ADDR = "0xb49036Fb35b4E1572509f301e1b0fd0113771ffa";
    const rewardTokenTicker = "🌾";
    const CROP_CHEF = new ethers.Contract(CROP_CHEF_ADDR, CROP_CHEF_ABI, App.provider);

    const startBlock = await CROP_CHEF.startBlock();
    const currentBlock = await App.provider.getBlockNumber();

    let rewardsPerWeek = 0
    if (currentBlock < startBlock) {
        _print(`Rewards start at block ${startBlock}\n`);
    } else {
        rewardsPerWeek = await CROP_CHEF.cropPerBlock() / 1e18 *
            604800 / 2.1;
    }

    const tokens = {};
    const prices = await getMaticPrices();

    await loadHarvesterChefContract(App, tokens, prices, CROP_CHEF, CROP_CHEF_ADDR, CROP_CHEF_ABI, rewardTokenTicker,
        "crop", null, rewardsPerWeek, "pendingCrops");

    hideLoading();
}

async function loadHarvesterChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.farmsCount(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoints();

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getMaticToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getHarvesterPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getMaticToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo => 
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);


  _print("Finished reading smart contracts.\n");
  
  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printHarvesterChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, "matic", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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

async function getHarvesterPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {  
    const poolInfo = await chefContract.farms(poolIndex);
    if (poolInfo.allocPoints == 0) {
      return {
        address: poolInfo.seed,
        allocPoints: poolInfo.allocPoints ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
      };
    }
    const poolToken = await getMaticToken(app, poolInfo.seed, chefAddress);
    poolToken.staked = poolInfo.seeds / 10 ** poolToken.decimals;
    const userInfo = await chefContract.farmers(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.seeds / 10 ** poolToken.decimals;
    return {
        address: poolInfo.seed,
        allocPoints: poolInfo.allocPoints ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        depositFee : (poolInfo.sowFee ?? 0) / 100,
        withdrawFee : (poolInfo.reapFee ?? 0) / 100
    };
  }

  function printHarvesterChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
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
  printHarvesterContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}

function printHarvesterContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return harvesterContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return harvesterContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  if(depositFee > 0){
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
  }else{
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  }
  if(withdrawFee > 0){
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} & Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)}) - Fee ${withdrawFee}%`, unstake)
  }else{
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} & Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, unstake)
  }
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const harvesterContract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    CHEF_CONTRACT.reap(poolIndex, currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const harvesterContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
          CHEF_CONTRACT.sow(poolIndex, currentTokens, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}