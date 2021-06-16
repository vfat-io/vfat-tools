$(function() {
  consoleInit(main)
    });
  
  async function getRulerBscPoolInfo(App, pool, lpAddress) {
    const poolInfo = await pool.getPool(lpAddress);
    const userInfo = await pool.getUser(lpAddress, App.YOUR_ADDRESS);
    const rewards = await pool.viewRewards(lpAddress, App.YOUR_ADDRESS);
    const poolToken = await getToken(App, lpAddress, pool.address);
    return {
      poolToken,
      rewardsPerWeek : poolInfo.bonuses.map(b => b.weeklyRewards / 1e18),
      rewardTokenAddresses : poolInfo.bonuses.map(b => b.bonusTokenAddr),
      totalDeposited : poolToken.staked,
      userStaked : userInfo[0].amount / 1e18,
      userUnclaimed : rewards.map(r =>  r / 1e18)
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
  
  async function main() {
    const App = await init_ethers();

    const RULER_POOL_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"old","type":"bool"},{"indexed":false,"internalType":"bool","name":"_new","type":"bool"}],"name":"PausedStatusUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint48","name":"_startTime","type":"uint48"},{"internalType":"uint256","name":"_weeklyRewards","type":"uint256"},{"internalType":"uint256","name":"_transferAmount","type":"uint256"}],"name":"addBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"},{"internalType":"address[]","name":"_bonusTokenAddrs","type":"address[]"},{"internalType":"address[]","name":"_authorizers","type":"address[]"}],"name":"addPoolsAndAllowBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"}],"name":"claimRewardsForPools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_poolBonusId","type":"uint256"}],"name":"collectDust","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_poolBonusId","type":"uint256"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint256","name":"_transferAmount","type":"uint256"}],"name":"extendBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"}],"name":"getAuthorizers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"}],"name":"getPool","outputs":[{"components":[{"components":[{"internalType":"address","name":"bonusTokenAddr","type":"address"},{"internalType":"uint48","name":"startTime","type":"uint48"},{"internalType":"uint48","name":"endTime","type":"uint48"},{"internalType":"uint256","name":"weeklyRewards","type":"uint256"},{"internalType":"uint256","name":"accRewardsPerToken","type":"uint256"},{"internalType":"uint256","name":"remBonus","type":"uint256"}],"internalType":"struct IBonusRewards.Bonus[]","name":"bonuses","type":"tuple[]"},{"internalType":"uint256","name":"lastUpdatedAt","type":"uint256"}],"internalType":"struct IBonusRewards.Pool","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPoolList","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getResponders","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_account","type":"address"}],"name":"getUser","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"rewardsWriteoffs","type":"uint256[]"}],"internalType":"struct IBonusRewards.User","name":"","type":"tuple"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_responders","type":"address[]"}],"name":"setResponders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint256","name":"_weeklyRewards","type":"uint256"},{"internalType":"uint48","name":"_startTime","type":"uint48"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"viewRewards","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const tokens = {};
    const prices = await getBscPrices();
  
    const RULER_POOL_ADDRESS = "0xD64Ba3500098f4a1FfB2aAc023C6B33F074D4754";
    const RULER_POOL = new ethers.Contract(RULER_POOL_ADDRESS, RULER_POOL_ABI, App.provider);
    const lpAddresses = await RULER_POOL.getPoolList();
  
    const poolInfos = [];
    for(lpAddress of lpAddresses){
      let poolInfo = await getRulerBscPoolInfo(App, RULER_POOL, lpAddress);
      poolInfos.push(poolInfo);
    }
    /*const poolInfos = await Promise.all(lpAddresses.map(async (x) => {
      try {
        return await getRulerBscPoolInfo(App, RULER_POOL, x)
      }
      catch (ex) {
        console.log(`Error loading pool ${x}, ${ex}`);
        return null;
      }
    }));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x =>
      x.poolToken.tokens.concat(x.rewardTokenAddresses)));
    await getNewPricesAndTokens(App, tokens, prices, tokenAddresses, RULER_POOL_ADDRESS);*/
  
    const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : null);
  
    _print("Finished reading smart contracts.\n");
  
    for (i = 1; i < poolPrices.length; i++) {
      if (poolPrices[i]) {
        printRulerPool(App, RULER_POOL_ABI, RULER_POOL_ADDRESS, tokens, prices,
          poolInfos[i], lpAddresses[i], poolPrices[i]);
      }
    }
  
    hideLoading();
  }

    /*const rulerContract_deposit = async function(rulerAbi, rulerAddress, lpAddress, stakeTokenAddr, App) {
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
  }*/