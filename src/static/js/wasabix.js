$(function() {
consoleInit(main)
  });

const WASABIX_POOL_ABI = [{"inputs":[{"internalType":"contract IMintableERC20","name":"_reward","type":"address"},{"internalType":"address","name":"_governance","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"governance","type":"address"}],"name":"GovernanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pendingGovernance","type":"address"}],"name":"PendingGovernanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"}],"name":"PoolCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardWeight","type":"uint256"}],"name":"PoolRewardWeightUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardRate","type":"uint256"}],"name":"RewardRateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensDeposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensWithdrawn","type":"event"},{"inputs":[],"name":"acceptGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"}],"name":"createPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_depositAmount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getPoolRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getPoolRewardWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getPoolToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getPoolTotalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getStakeTotalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getStakeTotalUnclaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingGovernance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reward","outputs":[{"internalType":"contract IMintableERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pendingGovernance","type":"address"}],"name":"setPendingGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardRate","type":"uint256"}],"name":"setRewardRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_rewardWeights","type":"uint256[]"}],"name":"setRewardWeights","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"tokenPoolIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_withdrawAmount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function getWasabixPoolInfo(App, pool, poolIndex) {
  const [token, rewardRate, totalDeposited, userStaked, userUnclaimed] =
    await App.ethcallProvider.all([
      pool.getPoolToken(poolIndex), pool.getPoolRewardRate(poolIndex),
      pool.getPoolTotalDeposited(poolIndex), pool.getStakeTotalDeposited(App.YOUR_ADDRESS, poolIndex),
      pool.getStakeTotalUnclaimed(App.YOUR_ADDRESS, poolIndex)
    ]);
    const poolToken = await getToken(App, token, pool.address);
    return {
      poolToken,
      rewardsPerWeek : rewardRate / 1e18 * 604800 / 13.5,
      totalDeposited : totalDeposited / 1e18,
      userStaked : userStaked / 1e18,
      userUnclaimed : userUnclaimed / 1e18
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
  const etherscanUrl = `<a href='https://etherscan.io/address/${poolAddress}' target='_blank'>Staking Token Contract</a>`;
  _print(etherscanUrl);
  _print_link(`Deposit ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndDeposit)
  _print_link(`Withdraw ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, withdraw)
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print(`\n`);
}

function printWasabixPool(App, wasabixAbi, wasabixAddr, prices, poolInfo, poolIndex, poolPrices,
                       rewardTokenTicker, rewardTokenAddress) {
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  poolPrices.print_price();
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolInfo.rewardsPerWeek, poolPrices.stakeTokenTicker,
    poolPrices.staked_tvl, poolInfo.userStaked, poolPrices.price, 2);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(poolInfo.userStaked);
  printWasabixContractLinks(App, wasabixAbi, wasabixAddr, poolIndex, poolInfo.poolToken.address,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.userUnclaimed, rewardPrice);
  return apr;
}

async function main() {
  const App = await init_ethers();
  const tokens = {}

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const WASABIX_POOL_ADDRESS = "0x0EdA8090E9A86668484915e5E1856E83480FA010"; //StakingPools
  const rewardTokenTicker = "WASABI";
  const rewardTokenAddress = "0x896e145568624a498c5a909187363AE947631503"; //WASABI
  const WASABIX_POOL = new ethcall.Contract(WASABIX_POOL_ADDRESS, WASABIX_POOL_ABI);
  const [poolCount] = await App.ethcallProvider.all([WASABIX_POOL.poolCount()]);

  const poolInfos = await Promise.all([...Array(poolCount / 1).keys()].map(async (x) =>
    await getWasabixPoolInfo(App, WASABIX_POOL, x)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  // var prices = await lookUpTokenPrices(tokenAddresses);
  // getParameterCaseInsensitive(prices, "0xc2db4c131ADaF01c15a1DB654c040c8578929D55").usd = 1 //waUSD

  var prices = await lookUpTokenPrices(["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"]); //WETH
  var wbtcPrice = await lookUpTokenPrices(["0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"]); //WBTC

  const UNI_POOL_ADDRESS = "0x8f9ef75cd6e610dd8acf8611c344573032fb9c3d";
  const uni = await getToken(App, UNI_POOL_ADDRESS, App.YOUR_ADDRESS);
  for (const address of uni.tokens) {
      tokens[address] = await getToken(App, address, UNI_POOL_ADDRESS);
  }
  const pp = getPoolPrices(tokens, prices, uni);

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, WASABIX_POOL_ADDRESS);
  }));

  prices["0xc2db4c131ADaF01c15a1DB654c040c8578929D55"] = {};
  prices["0xc2db4c131ADaF01c15a1DB654c040c8578929D55"]["usd"] = 1; //waUSD

  prices["0xfd8e70e83e399307db3978d3f34b060a06792c36"] = {};
  prices["0xfd8e70e83e399307db3978d3f34b060a06792c36"]["usd"] = wbtcPrice["0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"]["usd"];

  prices["0xcbf335Bb8eE86A5A88bEbCda4506a665aA8d7022"] = {};
  prices["0xcbf335Bb8eE86A5A88bEbCda4506a665aA8d7022"]["usd"] = 1; //waLUSD

  prices["0x6a1fbefdF67445C7F531b4F3e04Ffb37b7b13794"] = {};
  prices["0x6a1fbefdF67445C7F531b4F3e04Ffb37b7b13794"]["usd"] = prices["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"]["usd"];; //waLUSD

  const poolPrices = poolInfos.map(poolInfo => getPoolPrices(tokens, prices, poolInfo.poolToken));

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (i != 2 && i != 3 && i != 6) {
      const apr = printWasabixPool(App, WASABIX_POOL_ABI, WASABIX_POOL_ADDRESS, prices,
        poolInfos[i], i, poolPrices[i], rewardTokenTicker, rewardTokenAddress);
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

  hideLoading();
}
