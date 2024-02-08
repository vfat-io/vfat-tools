$(function() {
consoleInit(main)
  });

  const MOR_STAKING_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"uniqueId","type":"bytes"}],"name":"OverplusBridged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"components":[{"internalType":"uint128","name":"payoutStart","type":"uint128"},{"internalType":"uint128","name":"decreaseInterval","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriod","type":"uint128"},{"internalType":"uint128","name":"claimLockPeriod","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriodAfterStake","type":"uint128"},{"internalType":"uint256","name":"initialReward","type":"uint256"},{"internalType":"uint256","name":"rewardDecrease","type":"uint256"},{"internalType":"uint256","name":"minimalStake","type":"uint256"},{"internalType":"bool","name":"isPublic","type":"bool"}],"indexed":false,"internalType":"struct IDistribution.Pool","name":"pool","type":"tuple"}],"name":"PoolCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"components":[{"internalType":"uint128","name":"payoutStart","type":"uint128"},{"internalType":"uint128","name":"decreaseInterval","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriod","type":"uint128"},{"internalType":"uint128","name":"claimLockPeriod","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriodAfterStake","type":"uint128"},{"internalType":"uint256","name":"initialReward","type":"uint256"},{"internalType":"uint256","name":"rewardDecrease","type":"uint256"},{"internalType":"uint256","name":"minimalStake","type":"uint256"},{"internalType":"bool","name":"isPublic","type":"bool"}],"indexed":false,"internalType":"struct IDistribution.Pool","name":"pool","type":"tuple"}],"name":"PoolEdited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UserClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UserStaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"poolId","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"UserWithdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"depositToken_","type":"address"},{"internalType":"address","name":"l1Sender_","type":"address"},{"components":[{"internalType":"uint128","name":"payoutStart","type":"uint128"},{"internalType":"uint128","name":"decreaseInterval","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriod","type":"uint128"},{"internalType":"uint128","name":"claimLockPeriod","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriodAfterStake","type":"uint128"},{"internalType":"uint256","name":"initialReward","type":"uint256"},{"internalType":"uint256","name":"rewardDecrease","type":"uint256"},{"internalType":"uint256","name":"minimalStake","type":"uint256"},{"internalType":"bool","name":"isPublic","type":"bool"}],"internalType":"struct IDistribution.Pool[]","name":"poolsInfo_","type":"tuple[]"}],"name":"Distribution_init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gasLimit_","type":"uint256"},{"internalType":"uint256","name":"maxFeePerGas_","type":"uint256"},{"internalType":"uint256","name":"maxSubmissionCost_","type":"uint256"}],"name":"bridgeOverplus","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId_","type":"uint256"},{"internalType":"address","name":"receiver_","type":"address"}],"name":"claim","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint128","name":"payoutStart","type":"uint128"},{"internalType":"uint128","name":"decreaseInterval","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriod","type":"uint128"},{"internalType":"uint128","name":"claimLockPeriod","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriodAfterStake","type":"uint128"},{"internalType":"uint256","name":"initialReward","type":"uint256"},{"internalType":"uint256","name":"rewardDecrease","type":"uint256"},{"internalType":"uint256","name":"minimalStake","type":"uint256"},{"internalType":"bool","name":"isPublic","type":"bool"}],"internalType":"struct IDistribution.Pool","name":"pool_","type":"tuple"}],"name":"createPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId_","type":"uint256"},{"components":[{"internalType":"uint128","name":"payoutStart","type":"uint128"},{"internalType":"uint128","name":"decreaseInterval","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriod","type":"uint128"},{"internalType":"uint128","name":"claimLockPeriod","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriodAfterStake","type":"uint128"},{"internalType":"uint256","name":"initialReward","type":"uint256"},{"internalType":"uint256","name":"rewardDecrease","type":"uint256"},{"internalType":"uint256","name":"minimalStake","type":"uint256"},{"internalType":"bool","name":"isPublic","type":"bool"}],"internalType":"struct IDistribution.Pool","name":"pool_","type":"tuple"}],"name":"editPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId_","type":"uint256"},{"internalType":"address","name":"user_","type":"address"}],"name":"getCurrentUserReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId_","type":"uint256"},{"internalType":"uint128","name":"startTime_","type":"uint128"},{"internalType":"uint128","name":"endTime_","type":"uint128"}],"name":"getPeriodReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isNotUpgradeable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"l1Sender","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId_","type":"uint256"},{"internalType":"address[]","name":"users_","type":"address[]"},{"internalType":"uint256[]","name":"amounts_","type":"uint256[]"}],"name":"manageUsersInPrivatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"overplus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pools","outputs":[{"internalType":"uint128","name":"payoutStart","type":"uint128"},{"internalType":"uint128","name":"decreaseInterval","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriod","type":"uint128"},{"internalType":"uint128","name":"claimLockPeriod","type":"uint128"},{"internalType":"uint128","name":"withdrawLockPeriodAfterStake","type":"uint128"},{"internalType":"uint256","name":"initialReward","type":"uint256"},{"internalType":"uint256","name":"rewardDecrease","type":"uint256"},{"internalType":"uint256","name":"minimalStake","type":"uint256"},{"internalType":"bool","name":"isPublic","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolsData","outputs":[{"internalType":"uint128","name":"lastUpdate","type":"uint128"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"totalDeposited","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"removeUpgradeability","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId_","type":"uint256"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalDepositedInPublicPools","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"usersData","outputs":[{"internalType":"uint128","name":"lastStake","type":"uint128"},{"internalType":"uint256","name":"deposited","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"pendingRewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolId_","type":"uint256"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  async function main() {

    const Pool0 = {
      address : "0x47176B2Af9885dC6C4575d4eFd63895f7Aaa4790",
      abi : MOR_STAKING_ABI
    };

    const App = await init_ethers();

    _print("There is a locking period of one week\n")
    _print("MOR tokens can be claimed after 91 days\n")
    _print("MOR tokens are rewarded on arbitrum\n")

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};

    await loadMorheusPool(App, tokens, prices, Pool0.abi, Pool0.address);

  hideLoading();
}

async function loadMorheusPool(App, tokens, prices, abi, address){
  const STAKING_POOL = new ethers.Contract(address, abi, App.provider);

  const stakingTokenAddress = await STAKING_POOL.depositToken();

  let stakeToken = await getToken(App, stakingTokenAddress, address);

  await getNewPricesAndTokens(App, tokens, prices, stakeToken.tokens, address);
  const stakingTokenPrice = getParameterCaseInsensitive(prices, stakingTokenAddress)?.usd;

  const poolsData = await STAKING_POOL.poolsData(0);
  const totalStaked = poolsData.totalDeposited / 10 ** stakeToken.decimals;
  stakeToken.staked = totalStaked;

  const usersData = await STAKING_POOL.usersData(App.YOUR_ADDRESS, 0);
  const pendingRewards = await STAKING_POOL.getCurrentUserReward(0, App.YOUR_ADDRESS) / 1e18;
  const userStaked = usersData.deposited / 10 ** stakeToken.decimals;
  const userStakedPct = ((userStaked * stakingTokenPrice) / (totalStaked * stakingTokenPrice)) * 100;
  const userUnstaked = stakeToken.unstaked;

  const poolInfo = await STAKING_POOL.pools(0);
  const withdrawLockPeriod = poolInfo.withdrawLockPeriod / 1;
  const usersLastStake = usersData.lastStake / 1;

  _print(`<a href='https://etherscan.io/address/${stakingTokenAddress}' target='_blank'>${stakeToken.symbol}</a> Price: $${formatMoney(stakingTokenPrice)}`);
  _print(`Staked: ${totalStaked.toFixed(4)} ${stakeToken.symbol} ($${formatMoney(totalStaked * stakingTokenPrice)})`);
  _print(`You are staking ${userStaked.toFixed(6)} ${stakeToken.symbol} ` +
           `$${formatMoney(userStaked * stakingTokenPrice)} (${userStakedPct.toFixed(2)}% of the pool).`);
  _print(`Earnings: MOR ${pendingRewards.toFixed(4)}`);
  const approveTENDAndStake = async function() {
    return morContract_stake(stakingTokenAddress, address, App)
  }
  const unstake = async function() {
    return morContract_unstake(address, usersData.deposited, App)
  }
  _print(`<a target="_blank" href="https://etherscan.io/address/${address}#code">Etherscan</a>`);

  if(userUnstaked > 0.011){
    _print_link(`Stake ${userUnstaked.toFixed(6)} ${stakeToken.symbol}`, approveTENDAndStake)
  }else{
    _print(`minimum deposit 0.011 ${stakeToken.symbol}`);
  }

  if(usersLastStake > withdrawLockPeriod){
    _print_link(`Unstake ${userStaked.toFixed(6)} ${stakeToken.symbol}`, unstake)
  }
}

const morContract_unstake = async function(rewardPoolAddr, userDeposited, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, MOR_STAKING_ABI, signer)

  if (userDeposited > 0) {
    showLoading()
    REWARD_POOL.withdraw(0, userDeposited, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const morContract_stake = async function(stakeTokenAddr, rewardPoolAddr, App, maxAllowance) {
  const signer = App.provider.getSigner()

  const TEND_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, MOR_STAKING_ABI, signer)

  const balanceOf = await TEND_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentTEND =  maxAllowance ? (maxAllowance / 1e18 < balanceOf / 1e18
    ? maxAllowance : balanceOf) : balanceOf
  const allowedTEND = await TEND_TOKEN.allowance(App.YOUR_ADDRESS, rewardPoolAddr)

  let allow = Promise.resolve()

  if (allowedTEND / 1e18 < currentTEND / 1e18) {
    showLoading()
    allow = TEND_TOKEN.approve(rewardPoolAddr, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTEND / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
        WEEBTEND_V2_TOKEN.stake(0, currentTEND, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(x => {
            hideLoading()
            console.log(x);
            _print('Something went wrong.')
          })
      })
      .catch(x => {
        hideLoading()
        console.log(x);
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}