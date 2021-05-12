$(function() {
consoleInit(main)
});

const OHM_POOL_ABI = [{"inputs":[{"internalType":"address","name":"_LPToken","type":"address"},{"internalType":"address","name":"_OHMToken","type":"address"},{"internalType":"address","name":"_rewardPool","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_blocksToWait","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_blocksRewarded","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amountRewarded","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"PoolUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_rewardsClaimed","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"RewardsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_totalStaked","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"StakeCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_previous","type":"address"},{"indexed":false,"internalType":"address","name":"_next","type":"address"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"TransferredOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"WithdrawCompleted","type":"event"},{"inputs":[],"name":"LPToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OHMToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accOHMPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_staker","type":"address"}],"name":"getUserBalance","outputs":[{"internalType":"uint256","name":"_amountStaked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_staker","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"setRewardPerBlock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stakeLP","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"transferOwnership","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unstakeLP","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updatePool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userDetails","outputs":[{"internalType":"uint256","name":"_LPDeposited","type":"uint256"},{"internalType":"uint256","name":"_rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const tokens = {}, prices = {}
    const OHM_ADDR = "0x383518188c0c6d7730d91b2c03a03c837814a899"
    const OHM_POOL_ADDR = "0xf11f0f078bfaf05a28eac345bb84fcb2a3722223";
    const ohm = await getToken(App, OHM_ADDR, OHM_POOL_ADDR)
    const rewardTokenTicker = "OHM";
    const OHM_POOL = new ethcall.Contract(OHM_POOL_ADDR, OHM_POOL_ABI);
    const [ohmPerBlock, lpToken, [userBalance, userEarned]] =
        await App.ethcallProvider.all([OHM_POOL.rewardPerBlock(), OHM_POOL.LPToken(),
        OHM_POOL.userDetails(App.YOUR_ADDRESS), OHM_POOL.totalStaked()]);
    const pool = await getToken(App, lpToken, OHM_POOL_ADDR);
    const newTokenAddresses = [...pool.tokens, OHM_ADDR]
    await getNewPricesAndTokens(App, tokens, prices, newTokenAddresses, OHM_POOL_ADDR);
    const poolPrices = getPoolPrices(tokens, prices, pool);
    const rewardsPerWeek = ohmPerBlock / 10 ** ohm.decimals * 604800 / 13.5;
    poolPrices.print_price();
    const rewardPrice = getParameterCaseInsensitive(prices, OHM_ADDR).usd;
    const userStaked = userBalance / 10 ** pool.decimals;
    printAPR("OHM", rewardPrice, rewardsPerWeek, poolPrices.stakeTokenTicker,
        poolPrices.staked_tvl, userStaked, poolPrices.price, 4);
    const approveAndStake = async function() {
        return ohmPoolContract_stake(App, OHM_POOL_ABI, OHM_POOL_ADDR, lpToken)
    }
    const unstake = async function() {
        return ohmPoolContract_unstake(App, OHM_POOL_ABI, OHM_POOL_ADDR)
    }
    const claim = async function() {
        return ohmPoolContract_claim(App, OHM_POOL_ABI, OHM_POOL_ADDR)
    }
    const pendingRewardTokens = userEarned / 10 ** ohm.decimals;
    _print_link(`Stake ${pool.unstaked.toFixed(4)} ${poolPrices.stakeTokenTicker}`, approveAndStake)
    _print_link(`Unstake ${userStaked.toFixed(4)} ${poolPrices.stakeTokenTicker}`, unstake)
    _print_link(`Claim ${pendingRewardTokens.toFixed(4)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardPrice)})`, claim)
    hideLoading();
  }


const ohmPoolContract_stake = async function(App, ohmPoolAbi, ohmPoolAddress, lpTokenAddress) {
    const signer = App.provider.getSigner()

    const STAKING_TOKEN = new ethers.Contract(lpTokenAddress, ERC20_ABI, signer)
    const OHM_POOL_CONTRACT = new ethers.Contract(ohmPoolAddress, ohmPoolAbi, signer)

    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, ohmPoolAddress)

    let allow = Promise.resolve()

    if (allowedTokens / 1 < currentTokens / 1) {
      showLoading()
      allow = STAKING_TOKEN.approve(ohmPoolAddress, ethers.constants.MaxUint256)
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
            OHM_POOL_CONTRACT.stakeLP(currentTokens, {gasLimit: 500000})
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

  const ohmPoolContract_unstake = async function(App, ohmPoolAbi, ohmPoolAddress) {
    const signer = App.provider.getSigner()
    const OHM_POOL_CONTRACT = new ethers.Contract(ohmPoolAddress, ohmPoolAbi, signer)

    const currentStakedAmount = await OHM_POOL_CONTRACT.getUserBalance(App.YOUR_ADDRESS)

    if (currentStakedAmount > 0) {
      showLoading()
      OHM_POOL_CONTRACT.unstakeLP({gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const ohmPoolContract_claim = async function(App, ohmPoolAbi, ohmPoolAddress) {
    const signer = App.provider.getSigner()

    const OHM_POOL_CONTRACT = new ethers.Contract(ohmPoolAddress, ohmPoolAbi, signer)

    const currentEarnedAmount = await OHM_POOL_CONTRACT.pendingRewards(App.YOUR_ADDRESS)

    if (currentEarnedAmount > 0) {
      showLoading()
      OHM_POOL_CONTRACT.claimRewards({gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }


  const ohmDaoContract_stake = async function(App, ohmDaoAbi, ohmDaoAddress, ohmAddress) {
      const signer = App.provider.getSigner()

      const STAKING_TOKEN = new ethers.Contract(ohmAddress, ERC20_ABI, signer)
      const OHM_DAO_CONTRACT = new ethers.Contract(ohmDaoAddress, ohmDaoAbi, signer)

      const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
      const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, ohmDaoAddress)

      let allow = Promise.resolve()

      if (allowedTokens / 1 < currentTokens / 1) {
        showLoading()
        allow = STAKING_TOKEN.approve(ohmDaoAddress, ethers.constants.MaxUint256)
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
              OHM_DAO_CONTRACT.stakeOHM(currentTokens, {gasLimit: 500000})
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

    const ohmDaoContract_unstake = async function(App, ohmDaoAbi, ohmDaoAddress) {
      const signer = App.provider.getSigner()
      const OHM_DAO_CONTRACT = new ethers.Contract(ohmDaoAddress, ohmDaoAbi, signer)

      const currentStakedAmount = await OHM_DAO_CONTRACT.getUserBalance(App.YOUR_ADDRESS)

      if (currentStakedAmount > 0) {
        showLoading()
        OHM_DAO_CONTRACT.unstakeOHM({gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
      }
    }

    const ohmDaoContract_claim = async function(App, ohmDaoAbi, ohmDaoAddress) {
      const signer = App.provider.getSigner()

      const OHM_DAO_CONTRACT = new ethers.Contract(ohmDaoAddress, ohmDaoAbi, signer)

      const currentEarnedAmount = await OHM_DAO_CONTRACT.pendingRewards(App.YOUR_ADDRESS)

      if (currentEarnedAmount > 0) {
        showLoading()
        OHM_DAO_CONTRACT.claimRewards({gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
      }
    }
