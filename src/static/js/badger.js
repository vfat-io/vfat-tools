$(function() {
    consoleInit();
    start(main);
});

const bUniContract_stake = async function (stakingTokenAddr, rewardPoolAddr, App, maxAllowance) {
    const signer = App.provider.getSigner()
  
    const TEND_TOKEN = new ethers.Contract(stakingTokenAddr, ERC20_ABI, signer)
    const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, BADGER_UNI_ABI, signer)
  
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
          WEEBTEND_V2_TOKEN.deposit(currentTEND, {gasLimit: 500000})
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
  
  const bUniContract_unstake = async function(rewardPoolAddr, App) {
    const signer = App.provider.getSigner()
  
    const REWARD_POOL = new ethers.Contract(rewardPoolAddr, BADGER_UNI_ABI, signer)
    const currentStakedAmount = await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)
    if (currentStakedAmount > 0) {
      showLoading()
      REWARD_POOL.withdraw(currentStakedAmount, {gasLimit: 250000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }else {
        alert('You have no tokens to unstake!!')
      }
  }
  

const geyserContract_stake = async function(stakingTokenAddr, rewardPoolAddr, App, maxAllowance) {
    const signer = App.provider.getSigner()
  
    const TEND_TOKEN = new ethers.Contract(stakingTokenAddr, ERC20_ABI, signer)
    const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, BADGER_GEYSER_ABI, signer)
  
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
          WEEBTEND_V2_TOKEN.stake(currentTEND, "0x00", {gasLimit: 500000})
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
  
  const geyserContract_unstake = async function(rewardPoolAddr, App) {
    const signer = App.provider.getSigner()
  
    const REWARD_POOL = new ethers.Contract(rewardPoolAddr, BADGER_GEYSER_ABI, signer)
    const currentStakedAmount = await REWARD_POOL.totalStakedFor(App.YOUR_ADDRESS)
    if (currentStakedAmount > 0) {
      showLoading()
      REWARD_POOL.unstake(currentStakedAmount, "0x00", {gasLimit: 250000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }else {
        alert('You have no tokens to unstake!!')
      }
  }

async function printPool(App, tokens, prices, pool) {
  const tokenUrl = `<a href='https://etherscan.io/address/${pool.tokenAddress}' target='_blank'>Underlying</a>`;
  const settUrl = `<a href='https://etherscan.io/address/${pool.settAddress}' target='_blank'>Sett</a>`;
  const geyserUrl = `<a href='https://etherscan.io/address/${pool.geyserAddress}' target='_blank'>Geyser</a>`;
  _print(`${pool.name} - ${tokenUrl} - ${settUrl} - ${geyserUrl}`);
  const tokenAddress = pool.tokenAddress;
  const settAddress = pool.settAddress;
  const geyserAddress = pool.geyserAddress;

  const TOKEN_CONTRACT = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
  const userTotallyUnstaked = await TOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS) / 1e18;

  const lpToken = await getToken(App, tokenAddress, settAddress);
  _print(`You have ${userTotallyUnstaked} ${lpToken.symbol}`);

  var newPriceAddresses = lpToken.tokens.filter(x => 
      !getParameterCaseInsensitive(prices, x));
  var newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
      if (newPrices[key])
          prices[key] = newPrices[key];
  }
  var newTokenAddresses = lpToken.tokens.filter(x => 
      !getParameterCaseInsensitive(tokens,x));
  for (const address of newTokenAddresses) {
      tokens[address] = await getToken(App, address, tokenAddress);
  }

  const SETT_CONTRACT = new ethers.Contract(settAddress, BADGER_UNI_ABI, App.provider);
  const userUnstaked = await SETT_CONTRACT.balanceOf(App.YOUR_ADDRESS) / 1e18;
  const settToken = await getToken(App, settAddress, geyserAddress);
  _print(`You have ${userUnstaked} ${settToken.symbol}`);

  let poolPrices = getPoolPrices(tokens, prices, lpToken);

  if (!poolPrices.price) {
    const swapContract = new ethers.Contract(pool.swapAddress, CURVE_SWAP_ABI, App.provider);
    const virtualPrice = await swapContract.get_virtual_price() / 1e18;
    const underlyingPrice = getParameterCaseInsensitive(prices, pool.baseToken).usd;
    const poolPrice = underlyingPrice * virtualPrice; 
    const pool_tvl = lpToken.balance / 1e18 * poolPrice;
    const pool_staked_tvl = lpToken.staked * poolPrice;
    poolPrices.price = poolPrice;
    _print(`${pool.symbol} Price: $${formatMoney(poolPrice)} TVL: $${formatMoney(pool_tvl)}`);
    _print(`Staked: $${formatMoney(pool_staked_tvl)}`);
  } 
  else {
    poolPrices.print_price();
  }

  const BADGER_GEYSER = new ethers.Contract(geyserAddress, BADGER_GEYSER_ABI, App.provider);

  const totalStaked = await BADGER_GEYSER.totalStaked();
  const ratio = await SETT_CONTRACT.getPricePerFullShare() / 1e18;
  const userStaked = await BADGER_GEYSER.totalStakedFor(App.YOUR_ADDRESS) / 1e18;
  const userUnderlyingStaked = userStaked * ratio;

  const stakeTokenPrice = poolPrices.price * ratio;
  prices[settAddress] = stakeTokenPrice;

  const rewardTokenAddress = (await BADGER_GEYSER.getDistributionTokens())[0];

  const rewardTokenPrice =  getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

  const weeklyRewards = pool.badgerPerWeek;

  const usdPerWeek = weeklyRewards * rewardTokenPrice;

  const staked_tvl = totalStaked / 1e18 * ratio * poolPrices.price;

  
  _print(`Staked in Geyser: $${formatMoney(staked_tvl)}`);
  _print(`BADGER Per Week: ${weeklyRewards.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
  const weeklyAPY = usdPerWeek / staked_tvl * 100;
  const dailyAPY = weeklyAPY / 7;
  const yearlyAPY = weeklyAPY * 52;
  _print(`APY: Day ${dailyAPY.toFixed(2)}% Week ${weeklyAPY.toFixed(2)}% Year ${yearlyAPY.toFixed(2)}%`);
  const userStakedUsd = userStaked * stakeTokenPrice;
  const userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(8)} ${settToken.symbol} (${userUnderlyingStaked.toFixed(8)} ${lpToken.symbol}) ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (userStaked > 0) {
      poolPrices.print_contained_price(userStaked * ratio);
      const userWeeklyRewards = userStakedPct * weeklyRewards / 100;
      const userDailyRewards = userWeeklyRewards / 7;
      const userYearlyRewards = userWeeklyRewards * 52;
      _print(`Estimated BADGER earnings:`
          + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
          + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
  }
  const approveUNIAndStake = async function() {
      return bUniContract_stake(tokenAddress, settAddress, App)
  }
  const unstakeUNI = async function() {
      return bUniContract_unstake(settAddress, App)
  }
  const approveTENDAndStake = async function() {
      return geyserContract_stake(settAddress, geyserAddress, App)
  }
  const unstake = async function() {
      return geyserContract_unstake(geyserAddress, App)
  }
  const revoke = async function() {
      return rewardsContract_resetApprove(settAddress, geyserAddress, App)
  }
  _print_link(`Stake ${userTotallyUnstaked.toFixed(8)} ${lpToken.symbol}`, approveUNIAndStake)
  _print_link(`Unstake ${userUnstaked.toFixed(8)} ${lpToken.symbol}`, unstakeUNI)
  _print_link(`Stake ${userUnstaked.toFixed(8)} ${settToken.symbol}`, approveTENDAndStake)
  _print_link(`Unstake ${userStaked.toFixed(8)} ${settToken.symbol}`, unstake)
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print(`\n`);
}

const pools = [ 
  {
    name : "Badger/wBTC Sushi-LP",
    tokenAddress : "0x110492b31c59716ac47337e616804e3e3adc0b4a",
    settAddress : "0x1862A18181346EBd9EdAf800804f89190DeF24a5",
    geyserAddress : "0xB5b654efBA23596Ed49FAdE44F7e67E23D6712e7",
    badgerPerWeek : 70000
  },
  {
    name : "ETH/wBTC Sushi-LP",
    tokenAddress : "0xceff51756c56ceffca006cd410b03ffc46dd3a58",
    settAddress : "0x758a43ee2bff8230eeb784879cdcff4828f2544d",
    geyserAddress : "0x612f681BCd12A0b284518D42D2DBcC73B146eb65",
    badgerPerWeek : 80000
  },
  {
    name : "Badger/wBTC Uni-LP",
    tokenAddress : "0xcd7989894bc033581532d2cd88da5db0a4b12859",
    settAddress : "0x235c9e24D3FB2FAFd58a2E49D454Fdcd2DBf7FF1",
    geyserAddress : "0xA207D69Ea6Fb967E54baA8639c408c31767Ba62D",
    badgerPerWeek : 90000
  },
  {
    name : "Badger",
    tokenAddress : "0x3472A5A71965499acd81997a54BBA8D852C6E53d",
    settAddress : "0x19D97D8fA813EE2f51aD4B4e04EA08bAf4DFfC28",
    geyserAddress : "0xa9429271a28F8543eFFfa136994c0839E7d7bF77",
    badgerPerWeek : 50000
  },
  {
    name : "curve.fi / renBTC",
    tokenAddress : "0x49849c98ae39fff122806c06791fa73784fb3675",
    settAddress : "0x6dEf55d2e18486B9dDfaA075bc4e4EE0B28c1545",
    geyserAddress : "0x2296f174374508278DC12b806A7f27c87D53Ca15",
    badgerPerWeek :  83437.5 
  },
  {
    name : "curve.fi / sBTC",
    tokenAddress : "0x075b1bb99792c9e1041ba13afef80c91a1e70fb3",
    settAddress : "0xd04c48A53c111300aD41190D63681ed3dAd998eC",
    geyserAddress : "0x10fC82867013fCe1bD624FafC719Bb92Df3172FC",
    badgerPerWeek :  83437.5 
  },
  {
    name : "curve.fi / tBTC",
    tokenAddress : "0x64eda51d3ad40d56b9dfc5554e06f94e1dd786fd",
    settAddress : "0xb9D076fDe463dbc9f915E5392F807315Bf940334",
    geyserAddress : "0x085A9340ff7692Ab6703F17aB5FfC917B580a6FD",
    badgerPerWeek :  83437.5,
    swapAddress : "c25099792e9349c7dd09759744ea681c7de2cb66",
    baseToken : "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599" //wBTC
  },
  {
    name : "harvest.finance / renBTC",
    tokenAddress : "0x49849c98ae39fff122806c06791fa73784fb3675",
    settAddress : "0xAf5A1DECfa95BAF63E0084a35c62592B774A2A87",
    geyserAddress : "0xeD0B7f5d9F6286d00763b0FFCbA886D8f9d56d5e",
    badgerPerWeek :  83437.5 
  },
];

async function main() {  
    var tokens = {};
    var prices = {};

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    for (const p of pools)
      await printPool(App, tokens, prices, p);

    hideLoading();
}
