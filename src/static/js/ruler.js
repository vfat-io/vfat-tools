$(function() {
    consoleInit();
    start(main);
  });
  
const RULER_POOL_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"old","type":"bool"},{"indexed":false,"internalType":"bool","name":"_new","type":"bool"}],"name":"PausedStatusUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint48","name":"_startTime","type":"uint48"},{"internalType":"uint256","name":"_weeklyRewards","type":"uint256"},{"internalType":"uint256","name":"_transferAmount","type":"uint256"}],"name":"addBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"},{"internalType":"address[]","name":"_bonusTokenAddrs","type":"address[]"},{"internalType":"address[]","name":"_authorizers","type":"address[]"}],"name":"addPoolsAndAllowBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"}],"name":"claimRewardsForPools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_poolBonusId","type":"uint256"}],"name":"collectDust","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_poolBonusId","type":"uint256"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint256","name":"_transferAmount","type":"uint256"}],"name":"extendBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"}],"name":"getAuthorizers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"}],"name":"getPool","outputs":[{"components":[{"components":[{"internalType":"address","name":"bonusTokenAddr","type":"address"},{"internalType":"uint48","name":"startTime","type":"uint48"},{"internalType":"uint48","name":"endTime","type":"uint48"},{"internalType":"uint256","name":"weeklyRewards","type":"uint256"},{"internalType":"uint256","name":"accRewardsPerToken","type":"uint256"},{"internalType":"uint256","name":"remBonus","type":"uint256"}],"internalType":"struct IBonusRewards.Bonus[]","name":"bonuses","type":"tuple[]"},{"internalType":"uint256","name":"lastUpdatedAt","type":"uint256"}],"internalType":"struct IBonusRewards.Pool","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPoolList","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getResponders","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_account","type":"address"}],"name":"getUser","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"rewardsWriteoffs","type":"uint256[]"}],"internalType":"struct IBonusRewards.User","name":"","type":"tuple"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_responders","type":"address[]"}],"name":"setResponders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint256","name":"_weeklyRewards","type":"uint256"},{"internalType":"uint48","name":"_startTime","type":"uint48"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"viewRewards","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function getRulerPoolInfo(App, pool, lpAddress) {
  const [poolInfo, [userInfo, rewards]] =
    await App.ethcallProvider.all([
      pool.getPool(lpAddress), pool.getUser(lpAddress, App.YOUR_ADDRESS),
      pool.viewRewards(lpAddress, App.YOUR_ADDRESS)
    ]);
    const poolToken = await getToken(App, lpAddress, pool.address);
    return { 
      poolToken, 
      rewardsPerWeek : poolInfo.bonuses[0].weeklyRewards / 1e18, 
      totalDeposited : poolToken.staked, 
      userStaked : userInfo.amount / 1e18, 
      userUnclaimed : rewards[0] / 1e18
    }
}

const rulerContract_deposit = async function(rulerAbi, rulerAddress, lpAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const RULER_CONTRACT = new ethers.Contract(rulerAddress, rulerAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, rulerAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(rulerAddress, ethers.constants.MaxUint256)
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
          RULER_CONTRACT.deposit(lpAddress, currentTokens, {gasLimit: 500000})
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

const rulerContract_withdraw = async function(rulerAbi, rulerAddress, lpAddress, App) {
  const signer = App.provider.getSigner()
  const RULER_CONTRACT = new ethers.Contract(rulerAddress, rulerAbi, signer)

  const [userInfo] = await RULER_CONTRACT.getUser(lpAddress, App.YOUR_ADDRESS)

  if (userInfo.amount / 1e18 > 0) {
    showLoading()
    const t = await RULER_CONTRACT.withdraw(lpAddress, userInfo.amount, {gasLimit: 500000});
    return App.provider.waitForTransaction(t.hash);
  }
}

const rulerContract_claim = async function(rulerAbi, rulerAddress, lpAddress, App) {
  const signer = App.provider.getSigner()

  const RULER_CONTRACT = new ethers.Contract(rulerAddress, rulerAbi, signer)

  const earnedTokenAmount = (await RULER_CONTRACT.viewRewards(lpAddress, App.YOUR_ADDRESS))[0] / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    const t = await RULER_CONTRACT.claimRewardsForPools([lpAddress], {gasLimit: 500000});
    return App.provider.waitForTransaction(t.hash);
  }
}

function printRulerContractLinks(App, rulerAbi, rulerAddr, lpAddress, lpAddress,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, rewardTokenPrice) {
  let fixedDecimals = 2;
  const approveAndDeposit = async function() {
    return rulerContract_deposit(rulerAbi, rulerAddr, lpAddress, lpAddress, App)
  }      
  const withdraw = async function() {
    return rulerContract_withdraw(rulerAbi, rulerAddr, lpAddress, App)
  }      
  const claim = async function() {
    return rulerContract_claim(rulerAbi, rulerAddr, lpAddress, App)
  }    
  const etherscanUrl = `<a href='https://etherscan.io/address/${lpAddress}' target='_blank'>Staking Contract</a>`;
  _print(etherscanUrl);
  _print_link(`Deposit ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndDeposit)
  _print_link(`Withdraw ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, withdraw)
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print(`\n`);
}

function printRulerPool(App, rulerAbi, rulerAddr, prices, poolInfo, lpAddress, poolPrices, 
                       rewardTokenTicker, rewardTokenAddress) { 
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  poolPrices.print_price();
  printApy(rewardTokenTicker, rewardPrice, poolInfo.rewardsPerWeek, poolPrices.stakeTokenTicker, 
    poolPrices.staked_tvl, poolInfo.userStaked, poolPrices.price, 2);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(poolInfo.userStaked);
  printRulerContractLinks(App, rulerAbi, rulerAddr, lpAddress, poolInfo.poolToken.address,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked, 
    poolInfo.userStaked, poolInfo.userUnclaimed, rewardPrice);
}

async function main() {  
  const App = await init_ethers();
  const tokens = {}

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const RULER_POOL_ADDRESS = "0x3423c8Af3a95D9FEE7Ec06c4e0E905D4fd559F89";
  const rewardTokenTicker = "RULER";
  const rewardTokenAddress = "0x2aECCB42482cc64E087b6D2e5Da39f5A7A7001f8";
  const RULER_POOL = new ethcall.Contract(RULER_POOL_ADDRESS, RULER_POOL_ABI);
  const [lpAddresses] = await App.ethcallProvider.all([RULER_POOL.getPoolList()]);

  const poolInfos = await Promise.all(lpAddresses.map(async (x) =>
    await getRulerPoolInfo(App, RULER_POOL, x)));
  
  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  var prices = await lookUpTokenPrices(tokenAddresses);

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, RULER_POOL_ADDRESS);
  }));

  const poolPrices = poolInfos.map(poolInfo => getPoolPrices(tokens, prices, poolInfo.poolToken));

  _print("Finished reading smart contracts.\n");
    
  for (i = 0; i < poolPrices.length; i++) {
      printRulerPool(App, RULER_POOL_ABI, RULER_POOL_ADDRESS, prices, 
        poolInfos[i], lpAddresses[i], poolPrices[i], 
        rewardTokenTicker, rewardTokenAddress);
  }
  
  hideLoading();  
}