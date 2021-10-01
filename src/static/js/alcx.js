
$(function() {
  consoleInit(main)
    });
  
  const ALCX_POOL_ABI = [{"inputs":[{"internalType":"contract IMintableERC20","name":"_reward","type":"address"},{"internalType":"address","name":"_governance","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"governance","type":"address"}],"name":"GovernanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pendingGovernance","type":"address"}],"name":"PendingGovernanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"}],"name":"PoolCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardWeight","type":"uint256"}],"name":"PoolRewardWeightUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardRate","type":"uint256"}],"name":"RewardRateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensDeposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensWithdrawn","type":"event"},{"inputs":[],"name":"acceptGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"}],"name":"createPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_depositAmount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getPoolRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getPoolRewardWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getPoolToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getPoolTotalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getStakeTotalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getStakeTotalUnclaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingGovernance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reward","outputs":[{"internalType":"contract IMintableERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pendingGovernance","type":"address"}],"name":"setPendingGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardRate","type":"uint256"}],"name":"setRewardRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_rewardWeights","type":"uint256[]"}],"name":"setRewardWeights","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"tokenPoolIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_withdrawAmount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
  async function getAlcxPoolInfo(App, pool, poolIndex) {
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
  
  const alcxContract_deposit = async function(alcxAbi, alcxAddress, poolIndex, stakeTokenAddr, App) {
    const signer = App.provider.getSigner()
  
    const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
    const ALCX_CONTRACT = new ethers.Contract(alcxAddress, alcxAbi, signer)
  
    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, alcxAddress)
  
    let allow = Promise.resolve()
  
    if (allowedTokens / 1e18 < currentTokens / 1e18) {
      showLoading()
      allow = STAKING_TOKEN.approve(alcxAddress, ethers.constants.MaxUint256)
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
            ALCX_CONTRACT.deposit(poolIndex, currentTokens, {gasLimit: 500000})
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
  
  const alcxContract_withdraw = async function(alcxAbi, alcxAddress, poolIndex, App) {
    const signer = App.provider.getSigner()
    const ALCX_CONTRACT = new ethers.Contract(alcxAddress, alcxAbi, signer)
  
    const currentStakedAmount = await ALCX_CONTRACT.getStakeTotalDeposited(App.YOUR_ADDRESS, poolIndex)
  
    if (currentStakedAmount / 1e18 > 0) {
      showLoading()
      const t = await ALCX_CONTRACT.withdraw(poolIndex, currentStakedAmount, {gasLimit: 500000});
      return App.provider.waitForTransaction(t.hash);
    }
  }
  
  const alcxContract_claim = async function(alcxAbi, alcxAddress, poolIndex, App) {
    const signer = App.provider.getSigner()
  
    const ALCX_CONTRACT = new ethers.Contract(alcxAddress, alcxAbi, signer)
  
    const earnedTokenAmount = await ALCX_CONTRACT.getStakeTotalUnclaimed(App.YOUR_ADDRESS, poolIndex) / 1e18
  
    if (earnedTokenAmount > 0) {
      showLoading()
      const t = await ALCX_CONTRACT.claim(poolIndex, {gasLimit: 500000});
      return App.provider.waitForTransaction(t.hash);
    }
  }
  
  function printAlcxContractLinks(App, alcxAbi, alcxAddr, poolIndex, poolAddress,
      rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, rewardTokenPrice) {
    let fixedDecimals = 2;
    const approveAndDeposit = async function() {
      return alcxContract_deposit(alcxAbi, alcxAddr, poolIndex, poolAddress, App)
    }
    const withdraw = async function() {
      return alcxContract_withdraw(alcxAbi, alcxAddr, poolIndex, App)
    }
    const claim = async function() {
      return alcxContract_claim(alcxAbi, alcxAddr, poolIndex, App)
    }
    const etherscanUrl = `<a href='https://etherscan.io/address/${poolAddress}' target='_blank'>Staking Contract</a>`;
    _print(etherscanUrl);
    _print_link(`Deposit ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndDeposit)
    _print_link(`Withdraw ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, withdraw)
    _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
    _print(`Staking or unstaking also claims rewards.`)
    _print(`\n`);
  }
  
  function printAlcxPool(App, alcxAbi, alcxAddr, prices, poolInfo, poolIndex, poolPrices,
                         rewardTokenTicker, rewardTokenAddress) {
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    poolPrices.print_price();
    const apr = printAPR(rewardTokenTicker, rewardPrice, poolInfo.rewardsPerWeek, poolPrices.stakeTokenTicker,
      poolPrices.staked_tvl, poolInfo.userStaked, poolPrices.price, 2);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(poolInfo.userStaked);
    printAlcxContractLinks(App, alcxAbi, alcxAddr, poolIndex, poolInfo.poolToken.address,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.userUnclaimed, rewardPrice);
    return apr;
  }
  
  async function main() {
    const App = await init_ethers();
    const tokens = {}
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const ALCX_POOL_ADDRESS = "0xab8e74017a8cc7c15ffccd726603790d26d7deca";
    const rewardTokenTicker = "ALCX";
    const rewardTokenAddress = "0xdbdb4d16eda451d0503b854cf79d55697f90c8df";
    const ALCX_POOL = new ethcall.Contract(ALCX_POOL_ADDRESS, ALCX_POOL_ABI);
    const [poolCount] = await App.ethcallProvider.all([ALCX_POOL.poolCount()]);
  
    const poolInfos = await Promise.all([...Array(poolCount / 1).keys()].map(async (x) =>
      await getAlcxPoolInfo(App, ALCX_POOL, x)));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens.filter(t => t != 
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" && t != "0xC4C319E2D4d66CcA4464C0c2B32c9Bd23ebe784e")));
    var prices = await lookUpTokenPrices(tokenAddresses);
    getParameterCaseInsensitive(prices, "0xBC6DA0FE9aD5f3b0d58160288917AA56653660E9").usd = 1
  
    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getToken(App, address, ALCX_POOL_ADDRESS);
    }));
  
    const poolPrices = poolInfos.filter(poolInfo => poolInfo.poolToken.address != "0xC4C319E2D4d66CcA4464C0c2B32c9Bd23ebe784e").map(poolInfo =>
       getPoolPrices(tokens, prices, poolInfo.poolToken));
  
    _print("Finished reading smart contracts.\n");
  
    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (i != 3) { //TIME pool
        if(i == 7){
          i++
        }else{
          const apr = printAlcxPool(App, ALCX_POOL_ABI, ALCX_POOL_ADDRESS, prices,
            poolInfos[i], i, poolPrices[i], rewardTokenTicker, rewardTokenAddress);
          aprs.push(apr);
        }
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
  
    const NEW_ALCX_CHEF_ABI = [{"inputs":[{"internalType":"contract IMasterChef","name":"_MASTER_CHEF","type":"address"},{"internalType":"contract IERC20","name":"_sushi","type":"address"},{"internalType":"uint256","name":"_MASTER_PID","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[],"name":"LogInit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IERC20","name":"lpToken","type":"address"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"}],"name":"LogPoolAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"},{"indexed":false,"internalType":"bool","name":"overwrite","type":"bool"}],"name":"LogSetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accSushiPerShare","type":"uint256"}],"name":"LogUpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"MASTER_CHEF","outputs":[{"internalType":"contract IMasterChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MASTER_PID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SUSHI","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"calls","type":"bytes[]"},{"internalType":"bool","name":"revertOnFail","type":"bool"}],"name":"batch","outputs":[{"internalType":"bool[]","name":"successes","type":"bool[]"},{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvestFromMasterChef","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"dummyToken","type":"address"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract IMigratorChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingSushi","outputs":[{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permitToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint128","name":"accSushiPerShare","type":"uint128"},{"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"internalType":"uint64","name":"allocPoint","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"pools","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewarder","outputs":[{"internalType":"contract IRewarder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"},{"internalType":"bool","name":"overwrite","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMigratorChef","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sushiPerBlock","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"},{"internalType":"bool","name":"direct","type":"bool"},{"internalType":"bool","name":"renounce","type":"bool"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"updatePool","outputs":[{"components":[{"internalType":"uint128","name":"accSushiPerShare","type":"uint128"},{"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"internalType":"uint64","name":"allocPoint","type":"uint64"}],"internalType":"struct MasterChefV2.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"int256","name":"rewardDebt","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdrawAndHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const NEW_ALCX_CHEF_ADDR = "0xEF0881eC094552b2e128Cf945EF17a6752B4Ec5d"
    const NEW_ALCX_CHEF = new ethers.Contract(NEW_ALCX_CHEF_ADDR, NEW_ALCX_CHEF_ABI, App.provider);
    const rewardsSushiPerBlock = await NEW_ALCX_CHEF.sushiPerBlock() /1e18
        * 604800 / 13.5;
  
  
    await loadAlcxSushiContract(App, NEW_ALCX_CHEF, NEW_ALCX_CHEF_ADDR, NEW_ALCX_CHEF_ABI, 
      "SUSHI", rewardsSushiPerBlock, "pendingSushi")
  
    hideLoading();
  }
  
  async function loadAlcxSushiContract(App, chef, chefAddress, chefAbi, rewardTokenFunction, rewardsPerWeekFixed, pendingRewardsFunction,
      extraPrices, deathPoolIndices, showAll) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const alcxChefAbi = [{"inputs":[{"internalType":"contract IERC20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"},{"internalType":"address","name":"_MASTERCHEF_V2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"LogInit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"LogOnReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"LogPoolAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"LogSetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accSushiPerShare","type":"uint256"}],"name":"LogUpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldRate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newRate","type":"uint256"}],"name":"RewardRateUpdated","type":"event"},{"inputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"lpToken","type":"uint256"}],"name":"onSushiReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingToken","outputs":[{"internalType":"uint256","name":"pending","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"pendingTokens","outputs":[{"internalType":"contract IERC20[]","name":"rewardTokens","type":"address[]"},{"internalType":"uint256[]","name":"rewardAmounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint128","name":"accSushiPerShare","type":"uint128"},{"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"internalType":"uint64","name":"allocPoint","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"pools","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"},{"internalType":"uint256[]","name":"_pids","type":"uint256[]"}],"name":"setRewardRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"},{"internalType":"bool","name":"direct","type":"bool"},{"internalType":"bool","name":"renounce","type":"bool"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"updatePool","outputs":[{"components":[{"internalType":"uint128","name":"accSushiPerShare","type":"uint128"},{"internalType":"uint64","name":"lastRewardBlock","type":"uint64"},{"internalType":"uint64","name":"allocPoint","type":"uint64"}],"internalType":"struct ALCXRewarder.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"}]
    const alcxChefAddr = "0x7519C93fC5073E15d89131fD38118D73A72370F8"
    const alcxChef = new ethers.Contract(alcxChefAddr, alcxChefAbi, App.provider);
  
    const poolCount = 1;
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)
  
    _print(`Showing incentivized pools only.\n`);
  
    let tokens = {};
  
    let rewardTokenAddresses = []
    const rewardSushiTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardAlcxTokenAddress = "0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF";
    rewardTokenAddresses.push(rewardAlcxTokenAddress)
    rewardTokenAddresses.push(rewardSushiTokenAddress)

    let rewardTokens = []
    for(rewardTokenAddress of rewardTokenAddresses){
      const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
      rewardTokens.push(rewardToken)
    }

    let rewardsPerWeek = []
    const rewardsSushiPerWeek = rewardsPerWeekFixed
    const rewardsAlcxPerWeek = await alcxChef.tokenPerBlock() /1e18
        * 604800 / 13.5;
    rewardsPerWeek.push(rewardsAlcxPerWeek)
    rewardsPerWeek.push(rewardsSushiPerWeek)

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
      try {
        return await getAlcxSushiPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, showAll);
      }
      catch (ex) {
        console.log(`Error loading pool ${x}: ${ex}`);
        return null;
      }
    }));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens.filter(t => t != 
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" && t != "0xC4C319E2D4d66CcA4464C0c2B32c9Bd23ebe784e")));
    var prices = await lookUpTokenPrices(tokenAddresses.concat([rewardTokenAddresses]));
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
  
    const poolPrices = poolInfos.filter(poolInfo => poolInfo.poolToken.address != "0xC4C319E2D4d66CcA4464C0c2B32c9Bd23ebe784e").map(poolInfo =>
      getPoolPrices(tokens, prices, poolInfo.poolToken));

    const rewardTokenTickers = ["ALCX", "SUSHI"];
    let pendingRewardTokens = [];
    const pendingAlcxRewardTokens = await alcxChef.pendingToken(0, App.YOUR_ADDRESS) / 10 ** 18;
    pendingRewardTokens.push(pendingAlcxRewardTokens)

    _print("Finished reading smart contracts.\n");
  
    let aprs = []
    for (let i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        pendingRewardTokens.push(poolInfos[i].pendingSusiRewardTokens)
        const apr = printAlcxSushiPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTickers, rewardTokenAddresses,
          pendingRewardTokens)
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
  
  async function getAlcxSushiPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction, showAll=false) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    const lpToken = chefContract.lpToken(poolIndex);
    if (poolInfo.allocPoint == 0 && !showAll) {
      return {
        address: lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
        stakedToken : null,
        userLPStaked : 0,
        lastRewardBlock : poolInfo.lastRewardBlock
      };
    }
    const poolToken = await getToken(app, lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
  
    return {
        address: lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingSusiRewardTokens : pendingRewardTokens / 10 ** 18,
        lastRewardBlock : poolInfo.lastRewardBlock
    };
  }

  function printAlcxSushiPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTickers, rewardTokenAddresses,
                       pendingRewards, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  const alcxRewardsPerWeek = rewardsPerWeek[0];
  const sushiRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek[1];
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  let rewardPrices = [];
  for(rewardTokenAddress of rewardTokenAddresses){
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    rewardPrices.push(rewardPrice)
  }
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printAlcxSushiAPR(rewardPrices, alcxRewardsPerWeek, sushiRewardsPerWeek,
    poolPrices.stakeTokenTicker, staked_tvl, userStaked, poolPrices.price, fixedDecimals, rewardTokenTickers);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printAlcxSushiContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, rewardTokenTickers, 
    poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, pendingRewards, fixedDecimals, claimFunction, rewardPrices, chain);
  return apr;
}

function printAlcxSushiAPR(rewardPrices, alcxRewardsPerWeek, sushiRewardsPerWeek,
                  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals, rewardTokenTickers) {
  const usdAlcxPerWeek = alcxRewardsPerWeek * rewardPrices[0]
  const usdSushiPerWeek = sushiRewardsPerWeek * rewardPrices[1]
  const totalUsdPerWeek = usdAlcxPerWeek + usdSushiPerWeek
  fixedDecimals = fixedDecimals ?? 2;
  var weeklyAlcxAPR = usdAlcxPerWeek / staked_tvl * 100;
  var dailyAlcxAPR = weeklyAlcxAPR / 7;
  var yearlyAlcxAPR = weeklyAlcxAPR * 52;
  var weeklySushiAPR = usdSushiPerWeek / staked_tvl * 100;
  var dailySushiAPR = weeklySushiAPR / 7;
  var yearlySushiAPR = weeklySushiAPR * 52;
  const totalWeeklyAPR = weeklyAlcxAPR + weeklySushiAPR
  const totalDailyAPR = dailyAlcxAPR + dailySushiAPR
  const totalYearlyAPR = yearlyAlcxAPR + yearlySushiAPR
  _print(`${rewardTokenTickers[0]} Per Week: ${alcxRewardsPerWeek.toFixed(2)} ($${formatMoney(usdAlcxPerWeek)}) APR: Year ${yearlyAlcxAPR.toFixed(2)}%`);
  _print(`${rewardTokenTickers[1]} Per Week: ${sushiRewardsPerWeek.toFixed(2)} ($${formatMoney(usdSushiPerWeek)}) APR: Year ${yearlySushiAPR.toFixed(2)}%`);
  _print(`Total Per Week: $${formatMoney(totalUsdPerWeek)}`);
  _print(`Total APR: Day ${totalDailyAPR.toFixed(2)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  let userAlcxWeeklyRewards = userStakedPct * alcxRewardsPerWeek / 100;
  let userAlcxDailyRewards = userAlcxWeeklyRewards / 7;
  let userAlcxYearlyRewards = userAlcxWeeklyRewards * 52;

  let userSushiWeeklyRewards = userStakedPct * sushiRewardsPerWeek / 100;
  let userSushiDailyRewards = userSushiWeeklyRewards / 7;
  let userSushiYearlyRewards = userSushiWeeklyRewards * 52;

  let totalusdCoinsPerDay = userAlcxDailyRewards + userSushiDailyRewards
  let totalusdCoinsPerWeek = userAlcxWeeklyRewards + userSushiWeeklyRewards
  let totalusdCoinsPerYear = userAlcxYearlyRewards + userSushiYearlyRewards
  if (userStaked > 0) {
    _print(`Total Earnings: Day ${totalusdCoinsPerDay.toFixed(4)}% Week ${totalusdCoinsPerWeek.toFixed(2)}% Year ${totalusdCoinsPerYear.toFixed(2)}%`);
  }
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
    totalYearlyAPR,
    userYearlyUsd : totalUsdPerWeek * 52
  }
}

function printAlcxSushiContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress,
    rewardTokenTickers, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrices) {
  fixedDecimals = fixedDecimals ?? 2;
  const unstake = async function() {
    return alcxSushiContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardTokens)
  }
  const claim = async function() {
    return alcxSushiContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardTokens, claimFunction)
  }
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens[0].toFixed(fixedDecimals)} ${rewardTokenTickers[0]} ($${formatMoney(pendingRewardTokens[0]*rewardTokenPrices[0])}) + ${pendingRewardTokens[1].toFixed(fixedDecimals)} ${rewardTokenTickers[1]} ($${formatMoney(pendingRewardTokens[1]*rewardTokenPrices[1])})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const alcxSushiContract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    CHEF_CONTRACT.withdrawAndHarvest(poolIndex, currentStakedAmount, App.YOUR_ADDRESS, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const alcxSushiContract_claim = async function(chefAbi, chefAddress, poolIndex, App,
  pendingRewardTokens, claimFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = pendingRewardTokens

  if (earnedTokenAmount > 0) {
    showLoading()
    if (claimFunction) {
      claimFunction(poolIndex, App.YOUR_ADDRESS, {gasLimit: 500000})
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