$(function() {
  consoleInit();
  start(main);
});

const TAO_POOL_ABI = [{"inputs":[{"internalType":"address","name":"_LPToken","type":"address"},{"internalType":"address","name":"_TAOToken","type":"address"},{"internalType":"address","name":"_rewardPool","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_blocksToWait","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_blocksRewarded","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amountRewarded","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"PoolUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_rewardsClaimed","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"RewardsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_totalStaked","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"StakeCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_previous","type":"address"},{"indexed":false,"internalType":"address","name":"_next","type":"address"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"TransferredOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"WithdrawCompleted","type":"event"},{"inputs":[],"name":"LPToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TAOToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTAOPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_staker","type":"address"}],"name":"getUserBalance","outputs":[{"internalType":"uint256","name":"_amountStaked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_staker","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"setRewardPerBlock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stakeLP","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"transferOwnership","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unstakeLP","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updatePool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userDetails","outputs":[{"internalType":"uint256","name":"_LPDeposited","type":"uint256"},{"internalType":"uint256","name":"_rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"}]

async function main() {  
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {}, prices = await getBscPrices()
  const TAO_ADDR = "0x7065dda3f8ec5f6c155648bdee4420c0525d93c6"    
  const TAO_POOL_ADDR = "0xC98f066c7232C4A0b2B2885052B7fdc4438D8eF0";
  const tao = await getBscToken(App, TAO_ADDR, TAO_POOL_ADDR)
  const rewardTokenTicker = "TAO";
  const TAO_POOL = new ethers.Contract(TAO_POOL_ADDR, TAO_POOL_ABI, App.provider);
  const taoPerBlock = await TAO_POOL.rewardPerBlock();
  const lpToken = await TAO_POOL.LPToken();
  const [userBalance, userEarned] = await TAO_POOL.userDetails(App.YOUR_ADDRESS);
  const pool = await getBscToken(App, lpToken, TAO_POOL_ADDR);
  const newTokenAddresses = [...pool.tokens, TAO_ADDR]
  for (const n of newTokenAddresses)
        if (!getParameterCaseInsensitive(tokens, n))
          tokens[n] = await getBscToken(App, n, TAO_POOL_ADDR)
  const poolPrices = getPoolPrices(tokens, prices, pool);
  const rewardsPerWeek = taoPerBlock / 10 ** tao.decimals * 604800 / 3;
  poolPrices.print_price();
  const rewardPrice = getParameterCaseInsensitive(prices, TAO_ADDR).usd;
  const userStaked = userBalance / 10 ** pool.decimals;
  printAPR("TAO", rewardPrice, rewardsPerWeek, poolPrices.stakeTokenTicker, 
      poolPrices.staked_tvl, userStaked, poolPrices.price, 4);
  const approveAndStake = async function() {
      return taoPoolContract_stake(App, TAO_POOL_ABI, TAO_POOL_ADDR, lpToken)
  }      
  const unstake = async function() {
      return taoPoolContract_unstake(App, TAO_POOL_ABI, TAO_POOL_ADDR)
  }      
  const claim = async function() {
      return taoPoolContract_claim(App, TAO_POOL_ABI, TAO_POOL_ADDR)
  }
  const pendingRewardTokens = userEarned / 10 ** tao.decimals;
  _print_link(`Stake ${pool.unstaked.toFixed(4)} ${poolPrices.stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(4)} ${poolPrices.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens.toFixed(4)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardPrice)})`, claim)
  hideLoading();
}


const taoPoolContract_stake = async function(App, taoPoolAbi, taoPoolAddress, lpTokenAddress) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(lpTokenAddress, ERC20_ABI, signer)
  const TAO_POOL_CONTRACT = new ethers.Contract(taoPoolAddress, taoPoolAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, taoPoolAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1 < currentTokens / 1) {
    showLoading()
    allow = STAKING_TOKEN.approve(taoPoolAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1 > 0) {
    showLoading()
    allow
      .then(async function() {
          TAO_POOL_CONTRACT.stakeLP(currentTokens, {gasLimit: 500000})
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

const taoPoolContract_unstake = async function(App, taoPoolAbi, taoPoolAddress) {
  const signer = App.provider.getSigner()
  const TAO_POOL_CONTRACT = new ethers.Contract(taoPoolAddress, taoPoolAbi, signer)

  const currentStakedAmount = await TAO_POOL_CONTRACT.getUserBalance(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    TAO_POOL_CONTRACT.unstakeLP({gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const taoPoolContract_claim = async function(App, taoPoolAbi, taoPoolAddress) {
  const signer = App.provider.getSigner()

  const TAO_POOL_CONTRACT = new ethers.Contract(taoPoolAddress, taoPoolAbi, signer)

  const currentEarnedAmount = await TAO_POOL_CONTRACT.pendingRewards(App.YOUR_ADDRESS)

  if (currentEarnedAmount > 0) {
    showLoading()
    TAO_POOL_CONTRACT.claimRewards({gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}


const taoDaoContract_stake = async function(App, taoDaoAbi, taoDaoAddress, taoAddress) {
    const signer = App.provider.getSigner()
  
    const STAKING_TOKEN = new ethers.Contract(taoAddress, ERC20_ABI, signer)
    const TAO_DAO_CONTRACT = new ethers.Contract(taoDaoAddress, taoDaoAbi, signer)
  
    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, taoDaoAddress)
  
    let allow = Promise.resolve()
  
    if (allowedTokens / 1 < currentTokens / 1) {
      showLoading()
      allow = STAKING_TOKEN.approve(taoDaoAddress, ethers.constants.MaxUint256)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }
  
    if (currentTokens / 1 > 0) {
      showLoading()
      allow
        .then(async function() {
            TAO_DAO_CONTRACT.stakeTAO(currentTokens, {gasLimit: 500000})
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
  
  const taoDaoContract_unstake = async function(App, taoDaoAbi, taoDaoAddress) {
    const signer = App.provider.getSigner()
    const TAO_DAO_CONTRACT = new ethers.Contract(taoDaoAddress, taoDaoAbi, signer)
  
    const currentStakedAmount = await TAO_DAO_CONTRACT.getUserBalance(App.YOUR_ADDRESS)
  
    if (currentStakedAmount > 0) {
      showLoading()
      TAO_DAO_CONTRACT.unstakeTAO({gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
  
  const taoDaoContract_claim = async function(App, taoDaoAbi, taoDaoAddress) {
    const signer = App.provider.getSigner()
  
    const TAO_DAO_CONTRACT = new ethers.Contract(taoDaoAddress, taoDaoAbi, signer)
  
    const currentEarnedAmount = await TAO_DAO_CONTRACT.pendingRewards(App.YOUR_ADDRESS)
  
    if (currentEarnedAmount > 0) {
      showLoading()
      TAO_DAO_CONTRACT.claimRewards({gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }