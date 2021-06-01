$(function() {
consoleInit(main)
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
      rewardsPerWeek : poolInfo.bonuses.map(b => b.weeklyRewards / 1e18),
      rewardTokenAddresses : poolInfo.bonuses.map(b => b.bonusTokenAddr),
      totalDeposited : poolToken.staked,
      userStaked : userInfo.amount / 1e18,
      userUnclaimed : rewards.map(r =>  r / 1e18)
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

const xRuler_deposit = async function(xRulerAbi, xRulerAddress, rulerAddress, App) {
  const signer = App.provider.getSigner()

  const RULER = new ethers.Contract(rulerAddress, ERC20_ABI, signer)
  const XRULER = new ethers.Contract(xRulerAddress, xRulerAbi, signer)

  const currentTokens = await RULER.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await RULER.allowance(App.YOUR_ADDRESS, xRulerAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = RULER.approve(xRulerAddress, ethers.constants.MaxUint256)
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
        XRULER.deposit(currentTokens, {gasLimit: 500000})
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

const xRuler_withdraw = async function(xRulerAbi, xRulerAddress, App) {
  const signer = App.provider.getSigner()
  const XRULER = new ethers.Contract(xRulerAddress, xRulerAbi, signer)

  const balance = await XRULER.balanceOf(App.YOUR_ADDRESS)

  if (balance / 1e18 > 0) {
    showLoading()
    const t = await XRULER.withdraw(balance, {gasLimit: 500000});
    return App.provider.waitForTransaction(t.hash);
  }
}

function printRulerContractLinks(App, rulerAbi, rulerAddr, lpAddress, lpAddress,
    rewardTokenTickers, stakeTokenTicker, unstaked, userStaked,
    earnedTokens, rewardTokenPrices) {
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
  let claimText = "";
  for (let i = 0; i < rewardTokenTickers.length; i++) {
    claimText += `${earnedTokens[i].toFixed(fixedDecimals)} ${rewardTokenTickers[i]} ($${formatMoney(earnedTokens[i]*rewardTokenPrices[i])}) `
  }
  _print_link(`Claim ${claimText}`, claim);
  _print(`Staking or unstaking also claims rewards.`)
  _print(`\n`);
}

function printRulerPool(App, rulerAbi, rulerAddr, tokens, prices, poolInfo, lpAddress, poolPrices) {
  const rewardPrices = poolInfo.rewardTokenAddresses.map(a => getParameterCaseInsensitive(prices, a)?.usd);
  const rewardTokenTickers = poolInfo.rewardTokenAddresses.map( a => getParameterCaseInsensitive(tokens, a).symbol);
  poolPrices.print_price();
  for (let i = 0; i < rewardTokenTickers.length; i++) {
    printAPR(rewardTokenTickers[i], rewardPrices[i], poolInfo.rewardsPerWeek[i], poolPrices.stakeTokenTicker,
      poolPrices.staked_tvl, poolInfo.userStaked, poolPrices.price, 2);
  }
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(poolInfo.userStaked);
  printRulerContractLinks(App, rulerAbi, rulerAddr, lpAddress, poolInfo.poolToken.address,
    rewardTokenTickers, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.userUnclaimed, rewardPrices);
}

async function loadXRuler(App, tokens, prices) {
  const XRULER_ADDRESS = "0x01F7Fd324b366380D2145Dfa6C7A76fdb75f17B9"
  const XRULER_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_ruler","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_ruler","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint256","name":"_shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_ruler","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"}],"name":"collect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"internalType":"struct IxRULER.Permit","name":"permit","type":"tuple"}],"name":"depositWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getShareValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ruler","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const XRULER = new ethcall.Contract(XRULER_ADDRESS, XRULER_ABI);
  const [rulerAddress, userBalance] = await App.ethcallProvider.all([
    XRULER.ruler(), XRULER.balanceOf(App.YOUR_ADDRESS)
  ])
  const ruler = await getToken(App, rulerAddress, XRULER_ADDRESS);
  const poolPrices = getPoolPrices(tokens, prices, ruler);
  const weeklyRewards =  100 * 7 //40 RULER per day
  const rulerPrice = getParameterCaseInsensitive(prices, rulerAddress).usd
  poolPrices.print_price();
  const userStaked = userBalance / 10 ** ruler.decimals
  printAPR("RULER", rulerPrice, weeklyRewards, "RULER", poolPrices.staked_tvl, userStaked, poolPrices.price, 2);
  const etherscanUrl = `<a href='https://etherscan.io/address/${XRULER_ADDRESS}' target='_blank'>xRULER Contract</a>`;
  _print(etherscanUrl);
  const approveAndDeposit = async function() {
    return xRuler_deposit(XRULER_ABI, XRULER_ADDRESS, rulerAddress, App);
  }
  const withdraw = async function() {
    return xRuler_withdraw(XRULER_ABI, XRULER_ADDRESS, App)
  }
  _print_link(`Deposit ${ruler.unstaked.toFixed(2)} RULER`, approveAndDeposit)
  _print_link(`Withdraw ${(userBalance / 1e18).toFixed(2)} xRULER`, withdraw)
  _print(`\n`);
}

async function main() {
  const App = await init_ethers();
  const tokens = {};
  const prices = {};

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const RULER_POOL_ADDRESS = "0x3423c8Af3a95D9FEE7Ec06c4e0E905D4fd559F89";
  const RULER_POOL = new ethcall.Contract(RULER_POOL_ADDRESS, RULER_POOL_ABI);
  const [lpAddresses] = await App.ethcallProvider.all([RULER_POOL.getPoolList()]);

  const poolInfos = await Promise.all(lpAddresses.map(async (x) => {
    try {
      return await getRulerPoolInfo(App, RULER_POOL, x)
    }
    catch (ex) {
      console.log(`Error loading pool ${x}, ${ex}`);
      return null;
    }
  }));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x =>
    x.poolToken.tokens.concat(x.rewardTokenAddresses)));
  await getNewPricesAndTokens(App, tokens, prices, tokenAddresses, RULER_POOL_ADDRESS);

  const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : null);

  _print("Finished reading smart contracts.\n");

  for (i = 0; i < poolPrices.length; i++) {
    if (poolPrices[i]) {
      printRulerPool(App, RULER_POOL_ABI, RULER_POOL_ADDRESS, tokens, prices,
        poolInfos[i], lpAddresses[i], poolPrices[i]);
    }
  }

  await loadXRuler(App, tokens, prices);

  hideLoading();
}
