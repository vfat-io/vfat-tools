
$(function() {
    consoleInit(main)
      });
    
    const SUGAR_CHEF_ABI = [{"inputs":[{"internalType":"contract ISUGAR","name":"_sugar","type":"address"},{"internalType":"contract IStake","name":"_stake","type":"address"},{"internalType":"address","name":"_devAddr","type":"address"},{"internalType":"address","name":"_refAddr","type":"address"},{"internalType":"uint256","name":"_sugarPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":true,"internalType":"address","name":"caller","type":"address"}],"name":"AddStakeTokenCallerContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"funder","type":"address"},{"indexed":true,"internalType":"address","name":"fundee","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"funder","type":"address"},{"indexed":true,"internalType":"address","name":"fundee","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":true,"internalType":"address","name":"caller","type":"address"}],"name":"RemoveStakeTokenCallerContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"devAddress","type":"address"}],"name":"SetDevAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"devBps","type":"uint256"}],"name":"SetDevBps","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"refAddress","type":"address"}],"name":"SetRefAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"refBps","type":"uint256"}],"name":"SetRefBps","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"bool","name":"isAllowed","type":"bool"}],"name":"SetStakeTokenCallerAllowancePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"prevSugarPerBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"currentSugarPerBlock","type":"uint256"}],"name":"SetSugarPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"bonusMultiplier","type":"uint256"}],"name":"UpdateMultiplier","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"funder","type":"address"},{"indexed":true,"internalType":"address","name":"fundee","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint256","name":"_depositFee","type":"uint256"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_caller","type":"address"}],"name":"addStakeTokenCallerContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bonusMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositSugar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devBps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address[]","name":"_stakeTokens","type":"address[]"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mintExtraReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingSugar","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accSugarPerShare","type":"uint256"},{"internalType":"uint256","name":"depositFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pools","outputs":[{"internalType":"uint256","name":"llSize","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refBps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"removePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_caller","type":"address"}],"name":"removeStakeTokenCallerContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devAddr","type":"address"}],"name":"setDevAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_devBps","type":"uint256"}],"name":"setDevBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint256","name":"_depositFee","type":"uint256"}],"name":"setPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_refAddr","type":"address"}],"name":"setRefAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_refBps","type":"uint256"}],"name":"setRefBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"bool","name":"_isAllowed","type":"bool"}],"name":"setStakeTokenCallerAllowancePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_sugarPerBlock","type":"uint256"}],"name":"setSugarPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stake","outputs":[{"internalType":"contract IStake","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeTokenCallerAllowancePool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeTokenCallerContracts","outputs":[{"internalType":"uint256","name":"llSize","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sugar","outputs":[{"internalType":"contract ISUGAR","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sugarPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bonusMultiplier","type":"uint256"}],"name":"updateMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"address","name":"fundedBy","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawSugar","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    
    async function main() {
        const App = await init_ethers();
    
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts...\n");
    
       const SUGAR_CHEF_ADDR = "0x45eecdada0b58b0e78f94549f65fdaf447b35c17";
       const rewardTokenTicker = "SUGAR";
       const SUGAR_CHEF = new ethers.Contract(SUGAR_CHEF_ADDR, SUGAR_CHEF_ABI, App.provider);

       const pools = [
        "0xD184aAbFc9De6B56994D1283ed4C132B70A73a14",
        "0x4EF3d10be7c34e96dfb0D2E3bf39367BeaEFD6d7",
        "0xad9DDC741003beA4914c323269Fbd0eaf051B653",
        "0x1d55c8a1806F58ACD25c8C92639803DB56200892",
        "0x61Bb3b44690BBb285Bb699a6589C9987bd671bCb",
        "0xcA9b7dc3495e8d1e8f3B78517612AA89A2edFf58",
        "0xd923B85E9DaF90799d0C4BB99abde746e199Aa52",
        "0x82d00644Ed629738aE1d47b6d3d3CC7AC2B33B9B",
        "0x2d5F0975f880eBb64d8D2742571FEc2A5bdfe65f",
        "0x34e71E22b5C0dBa6F8c2337B0526C4F7a42A2C4D",
        "0xca0d72dc8A90Cf375BF4b6C4619006E4E4FA675F",
        "0x8cb4Da109B65BC4F3c3B029E017d2609fBD99a31",
        "0x5dB0a90847398066d1f7749Fa57Fe867f96C4930",
        "0xd3ccBF3867FF0204730173eB4cad3C4B5fd07c69", //SUGAR???
        "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"  //WETH???
       ]
    
       let rewardsPerWeek = await SUGAR_CHEF.sugarPerBlock() /1e18
          * 604800 / 13.5;
    
        const tokens = {};
        const prices = await getArbitrumPrices();
    
        await loadArbitrumSugarContract(App, tokens, prices, SUGAR_CHEF, SUGAR_CHEF_ADDR, SUGAR_CHEF_ABI, rewardTokenTicker,
            "sugar", null, rewardsPerWeek, "pendingSugar", pools, [0]);
    
        hideLoading();
      }
    
async function loadArbitrumSugarContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction, pools,
  deathPoolIndices, claimFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = pools.length;
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://arbiscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getArbitrumToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 13.5

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getSugarPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, pools[x])));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getArbitrumToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
      .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printSugarChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, claimFunction, "arbitrum", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
      aprs.push(apr);
    }
  }
  let totalUserStaked = 0, totalStaked = 0, averageApr = 0;
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
      + ` Day $${formatMoney(totalUserStaked * averageApr / 365)}`
      + ` Week $${formatMoney(totalUserStaked * averageApr / 52)}`
      + ` Year $${formatMoney(totalUserStaked * averageApr)}\n`);
  }
  return { prices, totalUserStaked, totalStaked, averageApr }
}

async function getSugarPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction, poolAddress) {
  const poolInfo = await chefContract.poolInfo(poolAddress);
  if (poolInfo.allocPoint == 0) {
    return {
      address: poolAddress,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked: 0,
      pendingRewardTokens: 0,
    };
  }
  const poolToken = await getArbitrumToken(app, poolAddress, chefAddress);
  const userInfo = await chefContract.userInfo(poolAddress, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolAddress, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
    address: poolAddress,
    allocPoints: poolInfo.allocPoint ?? 1,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewardTokens: pendingRewardTokens / 10 ** 18,
    depositFee: (poolInfo.depositFee ?? 0) / 100,
    withdrawFee: (poolInfo.withdrawFee ?? 0) / 100
  };
}

function printSugarChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
  totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
  pendingRewardsFunction, fixedDecimals, claimFunction, chain = "eth", depositFee = 0, withdrawFee = 0) {
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
  printSugarChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}

function printSugarChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
  rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
  claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function () {
    return chefSugarContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function () {
    return chefSugarContract_unstake(chefAbi, chefAddr, poolAddress, App, pendingRewardsFunction)
  }
  const claim = async function () {
    return chefSugarContract_claim(chefAbi, chefAddr, poolAddress, App, pendingRewardsFunction, claimFunction)
  }
  if (depositFee > 0) {
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
  } else {
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  }
  if (withdrawFee > 0) {
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
  } else {
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  }
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens * rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const chefSugarContract_stake = async function (chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function () {
        CHEF_CONTRACT.deposit(App.YOUR_ADDRESS, stakeTokenAddr, currentTokens)
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading()
            })
          })
          .catch(function () {
            hideLoading()
            _print('Something went wrong.')
          })
      })
      .catch(function () {
        hideLoading()
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const chefSugarContract_claim = async function (chefAbi, chefAddress, poolAddress, App,
  pendingRewardsFunction, claimFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolAddress, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    if (claimFunction) {
      claimFunction(poolAddress)
        .then(function (t) {
          return App.provider.waitForTransaction(t.hash)
        })
    }
    else {
      CHEF_CONTRACT.harvest(App.YOUR_ADDRESS, poolAddress)
        .then(function (t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function () {
          hideLoading()
        })
    }
  }
}

const chefSugarContract_unstake = async function (chefAbi, chefAddress, poolAddress, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolAddress, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    CHEF_CONTRACT.withdraw(App.YOUR_ADDRESS, poolAddress, currentStakedAmount)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
      })
  }
}