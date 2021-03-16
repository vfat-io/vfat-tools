$(function() {
    consoleInit();
    start(main);
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
  printAPR(rewardTokenTicker, rewardPrice, poolInfo.rewardsPerWeek, poolPrices.stakeTokenTicker, 
    poolPrices.staked_tvl, poolInfo.userStaked, poolPrices.price, 2);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(poolInfo.userStaked);
  printAlcxContractLinks(App, alcxAbi, alcxAddr, poolIndex, poolInfo.poolToken.address,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked, 
    poolInfo.userStaked, poolInfo.userUnclaimed, rewardPrice);
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
  
  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  var prices = await lookUpTokenPrices(tokenAddresses);
  prices["0xBC6DA0FE9aD5f3b0d58160288917AA56653660E9"] = { usd : 1 } //temporary of course

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, ALCX_POOL_ADDRESS);
  }));

  const poolPrices = poolInfos.map(poolInfo => getPoolPrices(tokens, prices, poolInfo.poolToken));

  _print("Finished reading smart contracts.\n");
    
  for (i = 0; i < poolCount; i++) {
    if (i != 3) { //TIME pool
      printAlcxPool(App, ALCX_POOL_ABI, ALCX_POOL_ADDRESS, prices, 
        poolInfos[i], i, poolPrices[i], rewardTokenTicker, rewardTokenAddress);
    }
  }
  
  hideLoading();  
}