$(function() {
consoleInit(main)
});

const DIGG_STRATEGY_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"harvested","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalDigg","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalShares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalScaledShares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"diggIncrease","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sharesIncrease","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"scaledSharesIncrease","type":"uint256"}],"name":"HarvestState","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"controller","type":"address"}],"name":"SetController","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"governance","type":"address"}],"name":"SetGovernance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"performanceFeeGovernance","type":"uint256"}],"name":"SetPerformanceFeeGovernance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"performanceFeeStrategist","type":"uint256"}],"name":"SetPerformanceFeeStrategist","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"strategist","type":"address"}],"name":"SetStrategist","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"withdrawalFee","type":"uint256"}],"name":"SetWithdrawalFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tended","type":"uint256"}],"name":"Tend","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"}],"name":"WithdrawAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawOther","type":"event"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_governance","type":"address"},{"internalType":"address","name":"_strategist","type":"address"},{"internalType":"address","name":"_controller","type":"address"},{"internalType":"address","name":"_keeper","type":"address"},{"internalType":"address","name":"_guardian","type":"address"}],"name":"__BaseStrategy_init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfWant","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseStrategyVersion","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"diggFaucet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getProtectedTokens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"guardian","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[{"components":[{"internalType":"uint256","name":"totalDigg","type":"uint256"},{"internalType":"uint256","name":"totalShares","type":"uint256"},{"internalType":"uint256","name":"totalScaledShares","type":"uint256"},{"internalType":"uint256","name":"diggIncrease","type":"uint256"},{"internalType":"uint256","name":"sharesIncrease","type":"uint256"},{"internalType":"uint256","name":"scaledSharesIncrease","type":"uint256"}],"internalType":"struct StrategyDiggRewards.HarvestData","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governance","type":"address"},{"internalType":"address","name":"_strategist","type":"address"},{"internalType":"address","name":"_controller","type":"address"},{"internalType":"address","name":"_keeper","type":"address"},{"internalType":"address","name":"_guardian","type":"address"},{"internalType":"address[2]","name":"_wantConfig","type":"address[2]"},{"internalType":"uint256[3]","name":"_feeConfig","type":"uint256[3]"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isTendable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keeper","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"performanceFeeGovernance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"performanceFeeStrategist","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_controller","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_guardian","type":"address"}],"name":"setGuardian","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_keeper","type":"address"}],"name":"setKeeper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_performanceFeeGovernance","type":"uint256"}],"name":"setPerformanceFeeGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_performanceFeeStrategist","type":"uint256"}],"name":"setPerformanceFeeStrategist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strategist","type":"address"}],"name":"setStrategist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawalFee","type":"uint256"}],"name":"setWithdrawalFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_threshold","type":"uint256"}],"name":"setWithdrawalMaxDeviationThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sharesOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sharesOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sharesOfWant","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswap","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_asset","type":"address"}],"name":"withdrawOther","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawalMaxDeviationThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

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

async function printNonGeyserPool(App, tokens, prices, pool, sharesPerFragment) {
  const tokenUrl = `<a href='https://etherscan.io/address/${pool.tokenAddress}' target='_blank'>Underlying</a>`;
  const settUrl = `<a href='https://etherscan.io/address/${pool.settAddress}' target='_blank'>Sett</a>`;
  _print(`${pool.name} - ${tokenUrl} - ${settUrl}`);
  const tokenAddress = pool.tokenAddress;
  const settAddress = pool.settAddress;
  const strategyAddress = pool.strategyAddress;

  const TOKEN_CONTRACT = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
  const userTotallyUnstaked = await TOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS) / 1e18;

  const lpToken = await getToken(App, tokenAddress, strategyAddress);
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
  const settToken = await getToken(App, settAddress, strategyAddress);
  _print(`You have ${userUnstaked} ${settToken.symbol}`);

  let poolPrices = getPoolPrices(tokens, prices, lpToken);

  poolPrices.print_price();

  const ratio = await SETT_CONTRACT.getPricePerFullShare() / 1e18;

  const stakeTokenPrice = poolPrices.price * ratio;
  prices[settAddress] = stakeTokenPrice;

  if (userUnstaked > 0) poolPrices.print_contained_price(userUnstaked * ratio);

  const approveUNIAndStake = async () => bUniContract_stake(tokenAddress, settAddress, App);
  const unstakeUNI = async () => bUniContract_unstake(settAddress, App);

  _print_link(`Stake ${userTotallyUnstaked.toFixed(12)} ${lpToken.symbol}`, approveUNIAndStake)
  _print_link(`Unstake ${userUnstaked.toFixed(12)} ${lpToken.symbol}`, unstakeUNI)
  _print(`\n`);
}


async function printPool(App, tokens, prices, pool, sharesPerFragment) {
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
      x.toLowerCase() !== "0x075b1bb99792c9e1041ba13afef80c91a1e70fb3" && //curve sBTC
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
    const pool_tvl = lpToken.totalSupply / 1e18 * poolPrice;
    const pool_staked_tvl = lpToken.staked * poolPrice;
    poolPrices.price = poolPrice;
    _print(`${lpToken.symbol} Price: $${formatMoney(poolPrice)} TVL: $${formatMoney(pool_tvl)}`);
    _print(`Staked: $${formatMoney(pool_staked_tvl)}`);
  }
  else {
    poolPrices.print_price();
  }

  const BADGER_GEYSER = new ethers.Contract(geyserAddress, BADGER_GEYSER_ABI, App.provider);

  const totalStaked = await BADGER_GEYSER.totalStaked();
  const ratio = await SETT_CONTRACT.getPricePerFullShare() / 1e18;
  const userStaked = await BADGER_GEYSER.totalStakedFor(App.YOUR_ADDRESS) / 1e18;

  const stakeTokenPrice = poolPrices.price * ratio;
  prices[settAddress] = stakeTokenPrice;

  const rewardTokens = await BADGER_GEYSER.getDistributionTokens();

  if (userStaked > 0) poolPrices.print_contained_price(userStaked * ratio);
  let index = 0;
  for (const r of rewardTokens) {
    const res = await getRewards(BADGER_GEYSER, r, prices, poolPrices, totalStaked, ratio,
      userStaked, stakeTokenPrice, settToken, lpToken, sharesPerFragment, index)
    if (res) index++;
  }

  const approveUNIAndStake = async () => bUniContract_stake(tokenAddress, settAddress, App);
  const unstakeUNI = async () => bUniContract_unstake(settAddress, App);
  const approveTENDAndStake = async () => geyserContract_stake(settAddress, geyserAddress, App);
  const unstake = async () => geyserContract_unstake(geyserAddress, App);
  const revoke = async () => rewardsContract_resetApprove(settAddress, geyserAddress, App);

  _print_link(`Stake ${userTotallyUnstaked.toFixed(12)} ${lpToken.symbol}`, approveUNIAndStake)
  _print_link(`Unstake ${userUnstaked.toFixed(12)} ${lpToken.symbol}`, unstakeUNI)
  _print_link(`Stake ${userUnstaked.toFixed(12)} ${settToken.symbol}`, approveTENDAndStake)
  _print_link(`Unstake ${userStaked.toFixed(12)} ${settToken.symbol}`, unstake)
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print(`\n`);
}

const getRewards = async (geyser, rewardTokenAddress, prices, poolPrices, totalStaked,
                          ratio, userStaked, stakeTokenPrice, settToken, lpToken, sharesPerFragment,
                          index) => {
  let unlockSchedules = await geyser.getUnlockSchedulesFor(rewardTokenAddress)
  if (unlockSchedules.length == 0) {
    return false;
  }
  let [amount, , period, ] = unlockSchedules[unlockSchedules.length - 1];

  let rewardTokenTicker, displayDecimals;
  if (rewardTokenAddress.toLowerCase() == "0x798d1be841a82a273720ce31c822c61a67a601c3") {
    amount = amount.div(sharesPerFragment) / 1e9
    rewardTokenTicker = "DIGG"
    displayDecimals = 4
  }
  else {
    amount = amount / 1e18
    rewardTokenTicker = "BADGER"
    displayDecimals = 2
  }

  const weeklyRewards = amount / period * 604800;

  const rewardTokenPrice =  getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

  const usdPerWeek = weeklyRewards * rewardTokenPrice;

  const staked_tvl = totalStaked / 1e18 * ratio * poolPrices.price;
  const userUnderlyingStaked = userStaked * ratio;

  if (index == 0) {
    _print(`Staked in Geyser: $${formatMoney(staked_tvl)}`);
  }
  _print(`${rewardTokenTicker} Per Week: ${weeklyRewards.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
  const weeklyAPR = usdPerWeek / staked_tvl * 100;
  const dailyAPR = weeklyAPR / 7;
  const yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  const userStakedUsd = userStaked * stakeTokenPrice;
  const userStakedPct = userStakedUsd / staked_tvl * 100;
  if (userStaked > 0) {
    if (index == 0) {
      _print(`You are staking ${userStaked.toFixed(12)} ${settToken.symbol} (${userUnderlyingStaked.toFixed(12)} ${lpToken.symbol}) ` +
       `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    }
    const userWeeklyRewards = userStakedPct * weeklyRewards / 100;
    const userDailyRewards = userWeeklyRewards / 7;
    const userYearlyRewards = userWeeklyRewards * 52;
    _print(`Estimated ${rewardTokenTicker} earnings:`
        + ` Day ${userDailyRewards.toFixed(displayDecimals)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
        + ` Week ${userWeeklyRewards.toFixed(displayDecimals)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
        + ` Year ${userYearlyRewards.toFixed(displayDecimals)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
  }
  return true;
}

const pools = [
  {
    name : "Badger/wBTC Sushi-LP",
    tokenAddress : "0x110492b31c59716ac47337e616804e3e3adc0b4a",
    settAddress : "0x1862A18181346EBd9EdAf800804f89190DeF24a5",
    geyserAddress : "0xB5b654efBA23596Ed49FAdE44F7e67E23D6712e7"
  },
  {
    name : "Badger/wBTC Uni-LP",
    tokenAddress : "0xcd7989894bc033581532d2cd88da5db0a4b12859",
    settAddress : "0x235c9e24D3FB2FAFd58a2E49D454Fdcd2DBf7FF1",
    geyserAddress : "0xA207D69Ea6Fb967E54baA8639c408c31767Ba62D"
  },
  {
    name : "DIGG/wBTC Uni-LP",
    tokenAddress : "0xe86204c4eddd2f70ee00ead6805f917671f56c52",
    settAddress : "0xC17078FDd324CC473F8175Dc5290fae5f2E84714",
    geyserAddress : "0x0194B5fe9aB7e0C43a08aCbb771516fc057402e7"
  },
  {
    name : "DIGG/wBTC Sushi-LP",
    tokenAddress : "0x9a13867048e01c663ce8ce2fe0cdae69ff9f35e3",
    settAddress : "0x88128580ACdD9c04Ce47AFcE196875747bF2A9f6",
    geyserAddress : "0x7f6fe274e172ac7d096a7b214c78584d99ca988b"
  },
  {
    name : "Badger",
    tokenAddress : "0x3472A5A71965499acd81997a54BBA8D852C6E53d",
    settAddress : "0x19D97D8fA813EE2f51aD4B4e04EA08bAf4DFfC28",
    geyserAddress : "0xa9429271a28F8543eFFfa136994c0839E7d7bF77"
  },
  {
    name : "DIGG",
    tokenAddress : "0x798D1bE841a82a273720CE31c822C61a67a601C3",
    settAddress : "0x7e7E112A68d8D2E221E11047a72fFC1065c38e1a",
    strategyAddress : "0x4a8651f2edd68850b944ad93f2c67af817f39f62"
  },
  {
    name : "ETH/wBTC Sushi-LP",
    tokenAddress : "0xceff51756c56ceffca006cd410b03ffc46dd3a58",
    settAddress : "0x758a43ee2bff8230eeb784879cdcff4828f2544d",
    geyserAddress : "0x612f681BCd12A0b284518D42D2DBcC73B146eb65"
  },
  {
    name : "curve.fi / renBTC",
    tokenAddress : "0x49849c98ae39fff122806c06791fa73784fb3675",
    settAddress : "0x6dEf55d2e18486B9dDfaA075bc4e4EE0B28c1545",
    geyserAddress : "0x2296f174374508278DC12b806A7f27c87D53Ca15"
  },
  {
    name : "curve.fi / sBTC",
    tokenAddress : "0x075b1bb99792c9e1041ba13afef80c91a1e70fb3",
    settAddress : "0xd04c48A53c111300aD41190D63681ed3dAd998eC",
    geyserAddress : "0x10fC82867013fCe1bD624FafC719Bb92Df3172FC",
    swapAddress : "0x7fc77b5c7614e1533320ea6ddc2eb61fa00a9714",
    baseToken : "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599" //wBTC
  },
  {
    name : "curve.fi / tBTC",
    tokenAddress : "0x64eda51d3ad40d56b9dfc5554e06f94e1dd786fd",
    settAddress : "0xb9D076fDe463dbc9f915E5392F807315Bf940334",
    geyserAddress : "0x085A9340ff7692Ab6703F17aB5FfC917B580a6FD",
    swapAddress : "c25099792e9349c7dd09759744ea681c7de2cb66",
    baseToken : "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599" //wBTC
  },
  {
    name : "harvest.finance / renBTC",
    tokenAddress : "0x49849c98ae39fff122806c06791fa73784fb3675",
    settAddress : "0xAf5A1DECfa95BAF63E0084a35c62592B774A2A87",
    geyserAddress : "0xeD0B7f5d9F6286d00763b0FFCbA886D8f9d56d5e",
  }
];

async function main() {
    var tokens = {};
    var prices = {};

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    const DIGG_ADDRESS = "0x798d1be841a82a273720ce31c822c61a67a601c3"
    const DIGG_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"fragments","type":"uint256"}],"name":"fragmentsToShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"shares","type":"uint256"}],"name":"sharesToFragments","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_sharesPerFragment","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"shares","type":"uint256"}],"name":"sharesToScaledShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"epoch","type":"uint256"},{"name":"supplyDelta","type":"int256"}],"name":"rebase","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"monetaryPolicy_","type":"address"}],"name":"setMonetaryPolicy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"monetaryPolicy","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rebaseStartTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_initialSharesPerFragment","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner_","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"sharesOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"fragments","type":"uint256"}],"name":"scaledSharesToShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"epoch","type":"uint256"},{"indexed":false,"name":"totalSupply","type":"uint256"}],"name":"LogRebase","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"monetaryPolicy","type":"address"}],"name":"LogMonetaryPolicyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
    const DIGG = new ethers.Contract(DIGG_ADDRESS, DIGG_ABI, App.provider);
    const sharesPerFragment = await DIGG._sharesPerFragment();

    const newPrices = await lookUpTokenPrices([DIGG_ADDRESS]);
    for (const key in newPrices) {
        prices[key] = newPrices[key];
    }
    for (const p of pools) {
      if (p.geyserAddress) {
        await printPool(App, tokens, prices, p, sharesPerFragment);
      }
      else {
        await printNonGeyserPool(App, tokens, prices, p, sharesPerFragment);
      }
    }
    hideLoading();
}
