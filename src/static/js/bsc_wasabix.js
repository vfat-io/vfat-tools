$(function() {
consoleInit(main)
  });

const WASABIX_POOL_ABI = [{"inputs":[{"internalType":"address","name":"_governance","type":"address"},{"internalType":"address","name":"_sentinel","type":"address"},{"internalType":"address","name":"_withdrawFeeCollector","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"governance","type":"address"}],"name":"GovernanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"status","type":"bool"}],"name":"PauseUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pendingGovernance","type":"address"}],"name":"PendingGovernanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"}],"name":"PoolCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardRate","type":"uint256"}],"name":"RewardRateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IRewardVesting","name":"rewardVesting","type":"address"}],"name":"RewardVestingUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sentinel","type":"address"}],"name":"SentinelUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"withdrawFeeCollector","type":"address"}],"name":"WithdrawFeeCollectorUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newWorkingAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newWorkingSupply","type":"uint256"}],"name":"WorkingAmountUpdate","type":"event"},{"inputs":[],"name":"acceptGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"accumulatedPower","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_needVesting","type":"bool"},{"internalType":"uint256","name":"_earlyWithdrawFee","type":"uint256"},{"internalType":"uint256","name":"_withdrawLock","type":"uint256"},{"internalType":"bool","name":"_veBoostEnabled","type":"bool"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"discountTable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"feeLevel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getBlockReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getDepositedAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_userIndex","type":"uint256"}],"name":"getPoolUser","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IMintableERC20","name":"_rewardToken","type":"address"},{"internalType":"contract IVotingEscrow","name":"_veWasabi","type":"address"},{"internalType":"contract IRewardVesting","name":"_rewardVesting","type":"address"},{"internalType":"bool","name":"_mintWasabi","type":"bool"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintWasabi","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nextUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingGovernance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"workingSupply","type":"uint256"},{"internalType":"uint256","name":"totalDeposited","type":"uint256"},{"internalType":"bool","name":"needVesting","type":"bool"},{"internalType":"uint256","name":"earlyWithdrawFee","type":"uint256"},{"internalType":"uint256","name":"withdrawLock","type":"uint256"},{"internalType":"bool","name":"veBoostEnabled","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reward","outputs":[{"internalType":"contract IMintableERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardVesting","outputs":[{"internalType":"contract IRewardVesting","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sentinel","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_discountTable","type":"uint256[]"}],"name":"setDiscountTable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_feeLevel","type":"uint256[]"}],"name":"setFeeLevel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_pause","type":"bool"}],"name":"setPause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pendingGovernance","type":"address"}],"name":"setPendingGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardRate","type":"uint256"}],"name":"setRewardRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IRewardVesting","name":"_rewardVesting","type":"address"}],"name":"setRewardVesting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sentinel","type":"address"}],"name":"setSentinel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawFee","type":"uint256"}],"name":"setWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newWithdrawFeeCollector","type":"address"}],"name":"setWithdrawFeeCollector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userIsKnown","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"veWasabi","outputs":[{"internalType":"contract IVotingEscrow","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawFeeCollector","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

async function getWasabixPoolInfo(App, pool, poolIndex) {

  const poolInfo = await pool.poolInfo(poolIndex);

  const token = poolInfo[0];
  const allocPt = poolInfo[1];
  const totalWorkingSupply = poolInfo[4];
  const totalDeposited = poolInfo[5];

  const overAllRewardRate = await pool.rewardRate();
  const overAllAllocPt = await pool.totalAllocPoint();
  const rewardRate = overAllRewardRate * allocPt / overAllAllocPt;

  const userInfo = await pool.getUserInfo(App.YOUR_ADDRESS, poolIndex);

  const userStaked = userInfo[0];
  const userWorkingAmount = userInfo[1];
  const userUnclaimed = await pool.pendingReward(poolIndex, App.YOUR_ADDRESS);

  const poolToken = await getBscToken(App, token, pool.address);
  return {
    poolToken,
    rewardsPerWeek : rewardRate / 1e18 * 86400 / 3 * 7,
    totalDeposited : totalDeposited / 1e18,
    totalWorkingSupply : totalWorkingSupply / 1e18,
    userStaked : userStaked / 1e18,
    userUnclaimed : userUnclaimed / 1e18,
    userWorkingAmount : userWorkingAmount / 1e18,
  }
}

const wasabixContract_deposit = async function(wasabixAbi, wasabixAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const WASABIX_CONTRACT = new ethers.Contract(wasabixAddress, wasabixAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, wasabixAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(wasabixAddress, ethers.constants.MaxUint256)
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
          WASABIX_CONTRACT.deposit(poolIndex, currentTokens, {gasLimit: 500000})
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

const wasabixContract_withdraw = async function(wasabixAbi, wasabixAddress, poolIndex, App) {
  const signer = App.provider.getSigner()
  const WASABIX_CONTRACT = new ethers.Contract(wasabixAddress, wasabixAbi, signer)

  const currentStakedAmount = await WASABIX_CONTRACT.getStakeTotalDeposited(App.YOUR_ADDRESS, poolIndex)

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    const t = await WASABIX_CONTRACT.withdraw(poolIndex, currentStakedAmount, {gasLimit: 500000});
    return App.provider.waitForTransaction(t.hash);
  }
}

const wasabixContract_claim = async function(wasabixAbi, wasabixAddress, poolIndex, App) {
  const signer = App.provider.getSigner()

  const WASABIX_CONTRACT = new ethers.Contract(wasabixAddress, wasabixAbi, signer)

  const earnedTokenAmount = await WASABIX_CONTRACT.getStakeTotalUnclaimed(App.YOUR_ADDRESS, poolIndex) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    const t = await WASABIX_CONTRACT.claim(poolIndex, {gasLimit: 500000});
    return App.provider.waitForTransaction(t.hash);
  }
}

function printBoostedAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
                  stakeTokenTicker, staked_tvl, userStaked, workingSupply, userWorkingAmount, poolTokenPrice,
                  fixedDecimals) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPR = usdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userWorkingAmount / workingSupply * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)})`);
  _print(`After considering veWASABI boosting (Boost factor ${isNaN(parseFloat(userWorkingAmount/userStaked/0.4).toFixed(2))?'-':parseFloat(userWorkingAmount/userStaked/0.4).toFixed(2)}x), you own ${userStakedPct.toFixed(2)}% of the pool.`) ;
  var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
  var userDailyRewards = userWeeklyRewards / 7;
  var userYearlyRewards = userWeeklyRewards * 52;
  if (userStaked > 0) {
    _print(`Estimated ${rewardTokenTicker} earnings:`
        + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrice)})`
        + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
        + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
  }
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
    yearlyAPR,
    userYearlyUsd : userYearlyRewards * rewardPrice
  }
}


function printWasabixContractLinks(App, wasabixAbi, wasabixAddr, poolIndex, poolAddress,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, rewardTokenPrice) {
  let fixedDecimals = 2;
  const approveAndDeposit = async function() {
    return wasabixContract_deposit(wasabixAbi, wasabixAddr, poolIndex, poolAddress, App)
  }
  const withdraw = async function() {
    return wasabixContract_withdraw(wasabixAbi, wasabixAddr, poolIndex, App)
  }
  const claim = async function() {
    return wasabixContract_claim(wasabixAbi, wasabixAddr, poolIndex, App)
  }
  const bscscanUrl = `<a href='https://bscscan.com/address/${poolAddress}' target='_blank'>Staking Token Contract</a>`;
  _print(bscscanUrl);
  _print_link(`Deposit ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndDeposit)
  _print_link(`Withdraw ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, withdraw)
  _print(`\n`);
}

function printWasabixPool(App, wasabixAbi, wasabixAddr, prices, poolInfo, poolIndex, poolPrices,
                       rewardTokenTicker, rewardTokenAddress) {
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  poolPrices.print_price();

  const apr = printBoostedAPR(rewardTokenTicker, rewardPrice, poolInfo.rewardsPerWeek, poolPrices.stakeTokenTicker,
    poolPrices.staked_tvl, poolInfo.userStaked,poolInfo.totalWorkingSupply, poolInfo.userWorkingAmount,poolPrices.price, 2);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(poolInfo.userStaked);
  printWasabixContractLinks(App, wasabixAbi, wasabixAddr, poolIndex, poolInfo.poolToken.address,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.userUnclaimed, rewardPrice);
  return apr;
}

async function loadBscWasabixStakingPoolsContract(App, tokens, prices, stakingPoolAddress, stakingPoolAbi, rewardTokenTicker, rewardTokenAddress) {
  const stakingPoolContract = new ethers.Contract(stakingPoolAddress, stakingPoolAbi, App.provider);
  const poolCount = parseInt(await stakingPoolContract.poolLength(), 10);

  const poolInfos = await Promise.all([...Array(poolCount / 1).keys()].map(async (x) =>{
    return await getWasabixPoolInfo(App, stakingPoolContract, x);
  }));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getBscToken(App, address, stakingPoolAddress);
  }));

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {

    const apr = printWasabixPool(App, stakingPoolAbi, stakingPoolAddress, prices,
      poolInfos[i], i, poolPrices[i], rewardTokenTicker, rewardTokenAddress);
    aprs.push(apr);

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
}

const lookUpTokenPrice = async function(address) {
  let price;
  let res = await $.ajax({
    url: 'https://api.pancakeswap.info/api/v2/tokens/' + address,
    type: 'GET',
  });
  if (res.data) {
    price = res.data.price;
  }
  return price;
}

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const WASABIX_POOL_ADDRESS = "0x894CcdBED28E294482fECf10eAC5962148bf4E15"; //StakingPools
  const rewardTokenTicker = "WASABI";
  const rewardTokenAddress = "0x86e73212002f80C57070EfAd4765FF0117dE5aEa"; //WASABI

  const tokens = {};
  const prices = await getBscPrices();

  const wasabiPrice = await lookUpTokenPrice("0x86e73212002f80C57070EfAd4765FF0117dE5aEa"); //get wasabi price from pancakeswap instead of coingecko

  prices["0x86e73212002f80C57070EfAd4765FF0117dE5aEa"] = {};
  prices["0x6D897D9C0902aC9399fFF708d1c201396342c80C"] = {};
  prices["0x86e73212002f80C57070EfAd4765FF0117dE5aEa"]["usd"] = wasabiPrice;
  prices["0x6D897D9C0902aC9399fFF708d1c201396342c80C"]["usd"] = 1;

  await loadBscWasabixStakingPoolsContract(App, tokens, prices, WASABIX_POOL_ADDRESS, WASABIX_POOL_ABI, rewardTokenTicker, rewardTokenAddress);

  hideLoading();
}
