$(function() {
    consoleInit();
    start(main);
});

const BADGER_WBTC_UNI_V2_ADDRESS = "0xcd7989894bc033581532d2cd88da5db0a4b12859"
const B_BADGER_WBTC_UNI_V2_ADDRESS = "0x235c9e24D3FB2FAFd58a2E49D454Fdcd2DBf7FF1"
const BADGER_GEYSER_ADDRESS = "0xA207D69Ea6Fb967E54baA8639c408c31767Ba62D"

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

async function main() {  
    var tokens = {};
    var prices = {};

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    const BADGER_WBTC_UNI_V2 = new ethers.Contract(BADGER_WBTC_UNI_V2_ADDRESS, UNI_ABI, App.provider);
    const userTotallyUnstaked = await BADGER_WBTC_UNI_V2.balanceOf(App.YOUR_ADDRESS) / 1e18;
    _print(`You have ${userTotallyUnstaked} UNI-V2`);

    const uniV2token = await getToken(App, BADGER_WBTC_UNI_V2_ADDRESS, B_BADGER_WBTC_UNI_V2_ADDRESS);
  
    var newPriceAddresses = uniV2token.tokens.filter(x => 
        !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        if (newPrices[key])
            prices[key] = newPrices[key];
    }
    var newTokenAddresses = uniV2token.tokens.filter(x => 
        !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, BADGER_WBTC_UNI_V2_ADDRESS);
    }

    const poolPrices = getPoolPrices(tokens, prices, uniV2token);

    const stakeTokenPrice = poolPrices.price;
    prices[B_BADGER_WBTC_UNI_V2_ADDRESS] = stakeTokenPrice;

    const B_BADGER_WBTC_UNI_V2 = new ethers.Contract(B_BADGER_WBTC_UNI_V2_ADDRESS, BADGER_UNI_ABI, App.provider);
    const userUnstaked = await B_BADGER_WBTC_UNI_V2.balanceOf(App.YOUR_ADDRESS) / 1e18;
    _print(`You have ${userUnstaked} bUNI-V2 unstaked`);

    const BADGER_GEYSER = new ethers.Contract(BADGER_GEYSER_ADDRESS, BADGER_GEYSER_ABI, App.provider);

    const totalStaked = await BADGER_GEYSER.totalStaked() ;
    const totalUniInBUni = await B_BADGER_WBTC_UNI_V2.balance();
    const ratio = totalUniInBUni / totalStaked;
    const userStaked = await BADGER_GEYSER.totalStakedFor(App.YOUR_ADDRESS) / 1e18 * ratio;

    const rewardTokenAddress = (await BADGER_GEYSER.getDistributionTokens())[0];

    const rewardTokenPrice =  getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const weeklyRewards = 150000;
  
    const usdPerWeek = weeklyRewards * rewardTokenPrice;
  
    const staked_tvl = totalStaked / 1e18 * ratio * poolPrices.price;

    
    poolPrices.print_price();
    _print(`Staked in Geyser: $${formatMoney(staked_tvl)}`);
    _print(`BADGER Per Week: ${weeklyRewards.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
    const weeklyAPY = usdPerWeek / staked_tvl * 100;
    const dailyAPY = weeklyAPY / 7;
    const yearlyAPY = weeklyAPY * 52;
    _print(`APY: Day ${dailyAPY.toFixed(2)}% Week ${weeklyAPY.toFixed(2)}% Year ${yearlyAPY.toFixed(2)}%`);
    const userStakedUsd = userStaked * stakeTokenPrice;
    const userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`You are staking ${userStaked.toFixed(6)} bUNI-V2 ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (userStaked > 0) {
        poolPrices.print_contained_price(userStaked);
        const userWeeklyRewards = userStakedPct * weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated BADGER earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
    }
    const approveUNIAndStake = async function() {
        return bUniContract_stake(BADGER_WBTC_UNI_V2_ADDRESS, B_BADGER_WBTC_UNI_V2_ADDRESS, App)
    }
    const unstakeUNI = async function() {
        return bUniContract_unstake(B_BADGER_WBTC_UNI_V2_ADDRESS, App)
    }
    const approveTENDAndStake = async function() {
        return geyserContract_stake(B_BADGER_WBTC_UNI_V2_ADDRESS, BADGER_GEYSER_ADDRESS, App)
    }
    const unstake = async function() {
        return geyserContract_unstake(BADGER_GEYSER_ADDRESS, App)
    }
    const revoke = async function() {
        return rewardsContract_resetApprove(B_BADGER_WBTC_UNI_V2_ADDRESS, BADGER_GEYSER_ADDRESS, App)
    }
    _print_link(`Stake ${userTotallyUnstaked.toFixed(6)} UNI-V2`, approveUNIAndStake)
    _print_link(`Unstake ${userUnstaked.toFixed(6)} UNI-V2`, unstakeUNI)
    _print_link(`Stake ${userUnstaked.toFixed(6)} bUNI-V2`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(6)} bUNI-V2`, unstake)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print(`\n`);
    hideLoading();
}
