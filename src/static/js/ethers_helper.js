async function init_ethers() {
  const App = {}

  const ETHEREUM_NODE_URL = 'aHR0cHM6Ly9tYWlubmV0LmluZnVyYS5pby92My9hNmYzNmI4OWM0OGM0ZmE4YjE0NjYwNWY2ZDdhNWI2Zg=='
  
  let isMetaMaskInstalled = true

  // Modern dapp browsers...
  if (window.ethereum) {
    App.web3Provider = window.ethereum
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      App.YOUR_ADDRESS = accounts[0];
    } catch (error) {
      // User denied account access...
      console.error('User denied account access')
    }
    App.provider = new ethers.providers.Web3Provider(window.ethereum)
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    App.provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
  }
  // If no injected web3 instance is detected, fall back to backup node
  else {
    App.provider = new ethers.providers.JsonRpcProvider(atob(ETHEREUM_NODE_URL))
    isMetaMaskInstalled = false
    _print(
      "You don't have MetaMask installed! Falling back to backup node...\n (will likely to fail. Please install MetaMask extension).\n"
    )
    sleep(10)
  }
  App.ethcallProvider = new ethcall.Provider();
  await App.ethcallProvider.init(App.provider);

  let addr = getUrlParameter('addr')

  //resolve ENS domain if possible
  if(typeof addr !== "undefined" && addr.includes('.eth')) 
  {
    addr = await App.provider.resolveName(addr)
    if(addr == null)
    {
      _print(
      "Could not initialize your ENS domain.\n"
      )
    }
    App.YOUR_ADDRESS = addr
  }

  // Could not load URL parameter
  if (!App.YOUR_ADDRESS) {
    if (!isMetaMaskInstalled) {
      if (localStorage.hasOwnProperty('addr')) {
        App.YOUR_ADDRESS = localStorage.getItem('addr')
      } else {
        App.YOUR_ADDRESS = window.prompt('Enter your eth address.')
      }
    } else {
      let accounts = await App.provider.listAccounts()
      App.YOUR_ADDRESS = accounts[0]
    }
  }

  if (!App.YOUR_ADDRESS || !ethers.utils.isAddress(App.YOUR_ADDRESS)) {
    throw 'Could not initialize your address. Make sure your address is checksum valid.'
  }

  localStorage.setItem('addr', App.YOUR_ADDRESS)
  return App
}

const getUrlParameter = function(sParam) {
  let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=')

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1])
    }
  }
}

const toFixed = function(num, fixed) {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
  const arr = num.toString().match(re)
  if (arr && arr.length > 0) {
    return arr[0]
  } else {
    return '0'
  }
}

const start = function(f) {
  f().catch(e => {
    _print(e)
    console.error(e)
    _print('Oops something went wrong. Try refreshing the page.')
  })
}

let logger

const consoleInit = function() {
  logger = document.getElementById('log')
  _print(new Date().toString())
  _print('')
}

const _print = function(message) {
  if (!logger) {
    logger = document.getElementById('log')
  }

  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] == 'object') {
      logger.innerHTML +=
        (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />'
    } else {
      logger.innerHTML += arguments[i] + '<br />'
    }
  }
}

const _print_bold = function(message) {
  if (!logger) {
    logger = document.getElementById('log')
  }

  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] == 'object') {
      logger.innerHTML +=
        '<b>' + (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '</b><br />'
    } else {
      logger.innerHTML += '<b>' + arguments[i] + '</b><br />'
    }
  }
}

const _print_link = function(message, onclickFunction) {
  if (!logger) {
    logger = document.getElementById('log')
  }

  const uuid = ID()

  logger.innerHTML += '<a href="#" id=' + uuid + '>' + message + '</a><br />'

  $(document).on('click', '#' + uuid, function() {
    console.log('clicked')
    onclickFunction()
    return false
  })
}

const _print_href = function(message, href) {
  if (!logger) {
    logger = document.getElementById('log')
  }

  const uuid = ID()

  logger.innerHTML += `<a href="${href}" target="_blank" id="${uuid}">${message}</a><br />`
}

const sleep = function(milliseconds) {
  const date = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : []

const lookUpPrices = async function(id_array) {
  const prices = {}
  for (const id_chunk of chunk(id_array, 50)) {
    let ids = id_chunk.join('%2C')
    let res = await $.ajax({
      url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd',
      type: 'GET',
    })
    for (const [key, v] of Object.entries(res)) {
      if (v.usd) prices[key] = v;
    }
  }
  return prices
}

const lookUpTokenPrices = async function(id_array) {
  const prices = {}
  for (const id_chunk of chunk(id_array, 50)) {
    let ids = id_chunk.join('%2C')
    let res = await $.ajax({
      url: 'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + ids + '&vs_currencies=usd',
      type: 'GET',
    })
    for (const [key, v] of Object.entries(res)) {
      if (v.usd) prices[key] = v;
    }
  }
  return prices
}

const lookUpPricesHistorical = async function(id, from, to) {
  return $.ajax({
    url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
    type: 'GET',
  })
}

const getBlockNumberFromTimestamp = async function(timestamp) {
    const res = await $.ajax({
        url: `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=XRFWK1IDBR545CXNJ6NQSYAVINUQB7IDV1`,
        type: 'GET',
    })

    return res.result;
}

const getSourceCode = async function(address) {
    return $.ajax({
        url: `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=XRFWK1IDBR545CXNJ6NQSYAVINUQB7IDV1`,
        type: 'GET',
    })
}

const lookUpPricesSevenDays = async function(id) {
  const to = Date.now() / 1000
  const from = to - 604800
  return await lookUpPricesHistorical(id, from, to)
}

const getPricesSevenDaysStripped = async function(id) {
  const prices = await lookUpPricesSevenDays(id)
  return prices.prices.map(x => x[1])
}

const getHistoricalPricesStripped = async function(id, from, to) {
  const prices = await lookUpPricesHistorical(id, from, to)
  return prices.prices.map(x => x[1])
}

const getPrices24HoursStripped = async function(id) {
  const to = Date.now() / 1000
  const from = to - 24 * 60 * 60
  const prices = (await lookUpPricesHistorical(id, from, to)).prices

  let skipEveryTwo = 0

  const reducedArr = []

  for (let i = 0; i < prices.length; i++) {
    if (skipEveryTwo === 0) {
      reducedArr.push(prices[i][1])
    }
    skipEveryTwo++
    if (skipEveryTwo > 1) {
      skipEveryTwo = 0
    }
  }

  return reducedArr
}

const _print24HourPrice = async function(id, ticker) {
  _print('')
  try {
    const historicalPrices = await getPrices24HoursStripped(id)
    console.log(historicalPrices)
    const config = {
      height: 20, // any height you want,
    }

    const plotString = asciichart.plot(historicalPrices, config)
    _print(plotString)

    let i = 0
    while (plotString[i] !== '\n') {
      i++
    }

    const msg = `${ticker} chart past 24 hours`
    const space = i - msg.length > 0 ? (i - msg.length) / 2 : 0
    let leftSpacing = ''

    for (let i = 0; i < space; i++) {
      leftSpacing += ' '
    }

    _print(`${leftSpacing}${msg}\n`)
  } catch (e) {
    _print('Could not load historical price.')
    console.log(e)
  }
}

const getBlockTime = function() {
  _print('Fetching current block time...')
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://etherchain.org/api/basic_stats',
      type: 'GET',
      success: function(data, text) {
        if (data['currentStats'] && data['currentStats']['block_time']) {
          resolve(data['currentStats']['block_time'])
          return
        }

        _print(`Etherchain basic stats is invalid. ${data}`)
        _print('Using backup data...')
        resolve(BLOCK_TIME)
      },
      error: function(request, status, error) {
        _print('Could not get etherchain basic stats.')
        _print(request.responseText)
        _print('Using backup data...')
        resolve(BLOCK_TIME)
      },
    })
  })
}

const printBALRewards = async function(synthStakingPoolAddr, BALPrice, percentageOfBalancerPool) {}

const getLatestTotalBALAmount = async function(addr) {
  const bal_earnings = await getBALEarnings(addr, BAL_DISTRIBUTION_WEEK - 1)
  return bal_earnings[0]
}

const safeParseFloat = function(str) {
  let res = parseFloat(str)
  return res ? res : 0
}

const getBALEarnings = async function(addr, startWeek) {
  // SNX-usdc Redirect
  if (addr.toLowerCase() === '0xfbaedde70732540ce2b11a8ac58eb2dc0d69de10') {
    addr = '0xEb3107117FEAd7de89Cd14D463D340A2E6917769'
  }

  const bal_earnings = []

  for (let i = startWeek; i < BAL_DISTRIBUTION_WEEK; i++) {
    const data = await $.getJSON(`../../js/bal_rewards/week${i + 1}.json`)
    const earning_checksum = safeParseFloat(data[addr])

    if (earning_checksum === 0) {
      const earning = safeParseFloat(data[addr.toLowerCase()]) + earning_checksum
      bal_earnings.push(earning)
    } else {
      bal_earnings.push(earning_checksum)
    }
  }

  return bal_earnings
}

const get_synth_weekly_rewards = async function(synth_contract_instance) {
  if (await isRewardPeriodOver(synth_contract_instance)) {
    return 0
  }

  const rewardRate = await synth_contract_instance.rewardRate()
  return rewardRate / 1e18 * 604800;
}

const isRewardPeriodOver = async function(reward_contract_instance) {
  const now = Date.now() / 1000
  const periodFinish = await getPeriodFinishForReward(reward_contract_instance)
  return periodFinish < now
}

const getPeriodFinishForReward = async function(reward_contract_instance) {
  return await reward_contract_instance.periodFinish()
}

const ID = function() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

function sleep_async(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

/**
 * Translates seconds into human readable format of seconds, minutes, hours, days, and years
 *
 * @param  {number} seconds The number of seconds to be processed
 * @return {string}         The phrase describing the the amount of time
 */
const forHumans = function(seconds) {
  const levels = [
    [Math.floor(seconds / 31536000), 'years'],
    [Math.floor((seconds % 31536000) / 86400), 'days'],
    [Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) % 60), 'seconds'],
  ]
  let returntext = ''

  for (var i = 0, max = levels.length; i < max; i++) {
    if (levels[i][0] === 0) continue
    returntext +=
      ' ' + levels[i][0] + ' ' + (levels[i][0] === 1 ? levels[i][1].substr(0, levels[i][1].length - 1) : levels[i][1])
  }

  return returntext.trim()
}

const showLoading = function() {
  $('.loader--1')
    .eq(0)
    .show()
}

const hideLoading = function() {
  $('.loader--1')
    .eq(0)
    .hide()
}

const toDollar = formatter.format

const rewardsContract_resetApprove = async function(stakeTokenAddr, rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)

  showLoading()

  STAKING_TOKEN.approve(rewardPoolAddr, 0)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {
      hideLoading()
    })
}

const trimOrFillTo = function(str, n) {
  str = str + ''

  if (str.length < n) {
    str = str.padEnd(n, ' ')
  } else {
    str = str.substr(0, n - 4).padEnd(n, '.')
  }

  return str
}

const dao_deposit = async (App, DAO, DOLLAR) => {
  const signer = App.provider.getSigner();
  const balance = await DOLLAR.balanceOf(App.YOUR_ADDRESS);
  const allowed = await DOLLAR.allowance(App.YOUR_ADDRESS, DAO.address);
  if (allowed < balance) {
    showLoading();
    const tx = await DOLLAR.connect(signer).approve(DAO.address, ethers.constants.MaxUint256);
    await tx.wait();
  }
  if (balance > 0) {
    try {
      await DAO.connect(signer).deposit(balance, {gasLimit: 500000});
      hideLoading();
    }
    catch (ex) {
      hideLoading();
      console.log(ex);
      _print('Something went wrong.');
    }
  } else {
    alaert(`You have no tokens to deposit!`);
  }
}

const rewardsContract_stake = async function(stakeTokenAddr, rewardPoolAddr, App, maxAllowance) {
  const signer = App.provider.getSigner()

  const TEND_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, YFFI_REWARD_CONTRACT_ABI, signer)

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
        WEEBTEND_V2_TOKEN.stake(currentTEND, {gasLimit: 500000})
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

const rewardsContract_unstake = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)
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
  }
}

const rewardsContract_exit = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)
  const currentStakedAmount = (await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)) / 1e18

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.exit({gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const rewardsContract_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  const earnedYFFI = (await REWARD_POOL.earned(App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
    showLoading()
    REWARD_POOL.getReward({gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const boardroom_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, BOARDROOM_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  const earnedYFFI = (await REWARD_POOL.earned(App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
    showLoading()
    REWARD_POOL.claimReward({gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const print_warning = function() {
  _print_bold('WARNING: DO NOT USE STAKE IN THIS POOL UNLESS YOU HAVE REVIEWED THE CONTRACTS.')
  _print_bold('         YOU ARE RESPONSIBLE FOR ANY FUNDS THAT YOU LOSE BY INTERACTING WITH THIS CONTRACT.\n')
}

 

const chefContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
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
          CHEF_CONTRACT.deposit(poolIndex, currentTokens, {gasLimit: 500000})
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

const chefContract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const chefContract_claim = async function(chefAbi, chefAddress, poolIndex, App, 
    pendingRewardsFunction, claimFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    if (claimFunction) {
      claimFunction(poolIndex, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
    }
    else {
      CHEF_CONTRACT.deposit(poolIndex, 0, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
}

const chefContract_emergencyWithdraw = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount > 0) {
    showLoading()
    CHEF_CONTRACT.emergencyWithdraw(poolIndex, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

async function getUniPool(app, pool, poolAddress, stakingAddress) {
  const calls = [
    pool.decimals(), pool.token0(), pool.token1(), pool.symbol(), pool.name(),
    pool.totalSupply(), pool.balanceOf(stakingAddress), pool.balanceOf(app.YOUR_ADDRESS)
  ];
  const [decimals, token0, token1, symbol, name, totalSupply, staked, unstaked] 
    = await app.ethcallProvider.all(calls);
  let q0, q1, is1inch;
  try {
    const [reserves] = await app.ethcallProvider.all([pool.getReserves()]);
    q0 = reserves._reserve0;
    q1 = reserves._reserve1;
    is1inch = false;
  }
  catch { //for 1inch
    if (token0 == "0x0000000000000000000000000000000000000000") {
      q0 = await app.provider.getBalance(poolAddress);
    }
    else {
      const c0 = new ethers.Contract(token0, ERC20_ABI, app.provider);
      q0 = await c0.balanceOf(poolAddress);
    }
    if (token1 == "0x0000000000000000000000000000000000000000") {
      q1 = await app.provider.getBalance(poolAddress);
    }
    else {
      const c1 = new ethers.Contract(token1, ERC20_ABI, app.provider);
      q1 = await c1.balanceOf(poolAddress);
    }
    is1inch = true;
  }
  return { 
      symbol,
      name,
      address: poolAddress,
      token0: token0,
      q0,
      token1: token1,
      q1,
      totalSupply: totalSupply / 10 ** decimals,
      stakingAddress: stakingAddress,
      staked: staked / 10 ** decimals,
      decimals: decimals,
      unstaked: unstaked / 10 ** decimals,
      contract: pool,
      tokens : [token0, token1],
      is1inch
  };
}

async function getBalancerPool(app, pool, poolAddress, stakingAddress, tokens, smartToken) {
  const tokenCalls = tokens.map(t => [pool.getNormalizedWeight(t), pool.getBalance(t)]).flat();
  const calls = [pool.decimals(), pool.symbol(), pool.name(), pool.totalSupply(),
    pool.balanceOf(stakingAddress), pool.balanceOf(app.YOUR_ADDRESS)].concat(tokenCalls);
  const results = await app.ethcallProvider.all(calls);
  let [decimals, symbol, name, totalSupply, staked, unstaked, ] = results
  let poolTokens = [];
  let j = 0;
  for (i = 6; i < results.length; i+=2) {
    poolTokens.push({
      address : tokens[j],
      weight: results[i] / 1e18,
      balance : results[i+1]
    })
    j++;
  };
  if (smartToken) {
    [totalSupply, staked, unstaked] = await app.ethcallProvider.all([smartToken.totalSupply(), 
      smartToken.balanceOf(stakingAddress), smartToken.balanceOf(app.YOUR_ADDRESS)]);
  }
  return { 
      symbol,
      name,
      address: poolAddress,
      poolTokens, //address, weight and balance
      totalSupply: totalSupply / 10 ** decimals,
      stakingAddress,
      staked: staked / 10 ** decimals,
      decimals: decimals,
      unstaked: unstaked / 10 ** decimals,
      contract: pool,
      tokens
  };
}

async function getJar(app, jar, address, stakingAddress) {
  const calls = [jar.decimals(), jar.token(), jar.name(), jar.symbol(), jar.totalSupply(),
    jar.balanceOf(stakingAddress), jar.balanceOf(app.YOUR_ADDRESS), jar.balance()];
  const [decimals, token_, name, symbol, totalSupply, staked, unstaked, balance] =
    await app.ethcallProvider.all(calls);
  const token = await getToken(app, token_, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals : decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance : balance,
    contract: jar,
    tokens : [address].concat(token.tokens)
  }
}

async function getCurveToken(app, curve, address, stakingAddress, minterAddress) {
  const minter = new ethcall.Contract(minterAddress, MINTER_ABI)
  const [virtualPrice, coin0] = await app.ethcallProvider.all([minter.get_virtual_price(), minter.coins(0)]);
  const token = await getToken(app, coin0, address);
  const calls = [curve.decimals(), curve.balanceOf(stakingAddress), curve.balanceOf(app.YOUR_ADDRESS),
    curve.name(), curve.symbol(), curve.totalSupply()];
  const [decimals, staked, unstaked, name, symbol, totalSupply] = await app.ethcallProvider.all(calls);
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals : decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: curve,
      tokens : [address, coin0],
      token,
      virtualPrice : virtualPrice / 1e18
  };
}

async function getStableswapToken(app, stable, address, stakingAddress) {
  const calls = [stable.decimals(), stable.balanceOf(stakingAddress), stable.balanceOf(app.YOUR_ADDRESS),
    stable.name(), stable.symbol(), stable.totalSupply(), stable.get_virtual_price(), stable.coins(0)];
  const [decimals, staked, unstaked, name, symbol, totalSupply, virtualPrice, coin0] 
    = await app.ethcallProvider.all(calls);
  const token = await getToken(app, coin0, address);
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals : decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: stable,
      tokens : [address, coin0],
      token,
      virtualPrice : virtualPrice / 1e18
  };
}

async function getErc20(app, token, address, stakingAddress) {
  if (address == "0x0000000000000000000000000000000000000000") {
    return {
      address,
      name : "Ethereum",
      symbol : "ETH",
      totalSupply: 1e8,
      decimals: 18,
      staked: 0,
      unstaked: 0,
      contract: null,
      tokens:[address]
    }
  }
  const calls = [token.decimals(), token.balanceOf(stakingAddress), token.balanceOf(app.YOUR_ADDRESS),
    token.name(), token.symbol(), token.totalSupply()];
  const [decimals, staked, unstaked, name, symbol, totalSupply] = await app.ethcallProvider.all(calls);
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals : decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: token,
      tokens : [address]
  };
}

async function getDSToken(app, token, address, stakingAddress) {
  const calls = [token.decimals(), token.balanceOf(stakingAddress), token.balanceOf(app.YOUR_ADDRESS),
    token.name(), token.symbol(), token.totalSupply()];
  const [decimals, staked, unstaked, name, symbol, totalSupply] =
    await app.ethcallProvider.all(calls);
  return {
    address,
    name : hex_to_ascii(name),
    symbol : hex_to_ascii(symbol),
    totalSupply : totalSupply,
    decimals : decimals,
    staked:  staked / 10 ** decimals,
    unstaked: unstaked  / 10 ** decimals,
    contract: token,
    tokens : [address]
  };
}

async function getVault(app, vault, address, stakingAddress) {
  const calls = [vault.decimals(), vault.underlying(), vault.name(), vault.symbol(),
    vault.totalSupply(), vault.balanceOf(stakingAddress), vault.balanceOf(app.YOUR_ADDRESS),
    vault.underlyingBalanceWithInvestment()];
  const [ decimals, underlying, name, symbol, totalSupply, staked, unstaked, balance] =
    await app.ethcallProvider.all(calls);
  const token = await getToken(app, underlying, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance,
    contract: vault,
    tokens : token.tokens
  }
}

async function getCToken(app, cToken, address, stakingAddress) {
  const calls = [cToken.decimals(), cToken.underlying(), cToken.totalSupply(),
    cToken.name(), cToken.symbol(), cToken.balanceOf(stakingAddress),
    CToken.balanceOf(app.YOUR_ADDRESS), cToken.exchangeRateStored()];
  const [decimals, underlying, totalSupply, name, symbol, staked, unstaked, exchangeRate] =
    await app.ethcallProvider.all(calls);
  const token = await getToken(app, underlying, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance: totalSupply * (exchangeRate / 1e18),
    contract: cToken,
    tokens : [address].concat(token.tokens)
  }
}

function hex_to_ascii(str1)
{
 var hex  = str1.toString();
 var str = '';
 for (var n = 0; n < hex.length; n += 2) {
   str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
 }
 return str;
}

async function getStoredToken(app, tokenAddress, stakingAddress, type) {
  switch (type) {
    case "uniswap": 
      const pool = new ethcall.Contract(tokenAddress, UNI_ABI);
      return await getUniPool(app, pool, tokenAddress, stakingAddress);
    case "balancer": 
      const bal = new ethcall.Contract(tokenAddress, BALANCER_POOL_ABI);
      const [tokens] = await app.ethcallProvider.all([bal.getFinalTokens()]);
      return await getBalancerPool(app, bal, tokenAddress, stakingAddress, tokens);
    case "balancerSmart":
      const sbal = new ethcall.Contract(tokenAddress, BPOOL_TOKEN_ABI);
      const [bPool] = await app.ethcallProvider.all([sbal.bPool()]);
      const bal2 = new ethcall.Contract(bPool, BPOOL_ABI);
      const [tokens2] = await app.ethcallProvider.all([bal2.getCurrentTokens()]);
      return await getBalancerPool(app, bal2, tokenAddress, stakingAddress, tokens2, sbal);
    case "jar": 
      const jar = new ethcall.Contract(tokenAddress, JAR_ABI);
      return await getJar(app, jar, tokenAddress, stakingAddress);
    case "cToken": 
      const cToken = new ethcall.Contract(tokenAddress, CTOKEN_ABI);
      return await getCToken(app, cToken, tokenAddress, stakingAddress);
    case "vault":
      const vault = new ethcall.Contract(tokenAddress, HARVEST_VAULT_ABI);
      return await getVault(app, vault, tokenAddress, stakingAddress);
    case "erc20":
      const erc20 = new ethcall.Contract(tokenAddress, ERC20_ABI);
      return await getErc20(app, erc20, tokenAddress, stakingAddress);
    case "dsToken":
      const dsToken = new ethcall.Contract(tokenAddress, DSTOKEN_ABI);
      return await getDSToken(app, dsToken, tokenAddress, stakingAddress);
    case "curve":
      const crv = new ethcall.Contract(tokenAddress, CURVE_ABI);
      if (tokenAddress.toLowerCase() == "0x88E11412BB21d137C217fd8b73982Dc0ED3665d7".toLowerCase()) {
        const minter = "0x3333333ACdEdBbC9Ad7bda0876e60714195681c5";
        return await getCurveToken(app, crv, tokenAddress, stakingAddress, minter);
      }
      const [minter] = await app.ethcallProvider.all([crv.minter()]);
      return await getCurveToken(app, crv, tokenAddress, stakingAddress, minter);
    case "stableswap":
      const stable = new ethcall.Contract(tokenAddress, STABLESWAP_ABI);
      return await getStableswapToken(app, stable, tokenAddress, stakingAddress);
  }
}

async function getToken(app, tokenAddress, stakingAddress) {
  if (tokenAddress == "0x0000000000000000000000000000000000000000") {
    return getErc20(app, null, tokenAddress, "")
  }
  const type = window.localStorage.getItem(tokenAddress);
  //getTokenWeights
  if (type) return getStoredToken(app, tokenAddress, stakingAddress, type);
  try {
    const pool = new ethcall.Contract(tokenAddress, UNI_ABI);
    const _token0 = await app.ethcallProvider.all([pool.token0()]);
    const uniPool = await getUniPool(app, pool, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "uniswap");
    return uniPool;
  }
  catch(err) {
  }
  try {
    const bal = new ethcall.Contract(tokenAddress, BALANCER_POOL_ABI);
    const [tokens] = await app.ethcallProvider.all([bal.getFinalTokens()]);
    const balPool = await getBalancerPool(app, bal, tokenAddress, stakingAddress, tokens);
    window.localStorage.setItem(tokenAddress, "balancer");
    return balPool;
  }
  catch(err) {
  }
  try {
    const sbal = new ethcall.Contract(tokenAddress, BPOOL_TOKEN_ABI);
    const [bPool] = await app.ethcallProvider.all([sbal.bPool(), sbal.totalSupply()]);
    const bal = new ethcall.Contract(bPool, BPOOL_ABI);
    const [tokens] = await app.ethcallProvider.all([bal.getCurrentTokens()]);
    const balPool = await getBalancerPool(app, bal, tokenAddress, stakingAddress, tokens, sbal);
    window.localStorage.setItem(tokenAddress, "balancerSmart");
    return balPool;
  }
  catch(err) {
  }
  try {
    const jar = new ethcall.Contract(tokenAddress, JAR_ABI);
    const _token = await app.ethcallProvider.all([jar.token()]);
    const res = await getJar(app, jar, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "jar");
    return res;
  }
  catch(err) {
    console.log(err);
  }
  try {
    const cToken = new ethcall.Contract(tokenAddress, CTOKEN_ABI);
    const _token = await app.ethcallProvider.all([cToken.underlying()]);
    const res = await getCToken(app, cToken, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "cToken");
    return res;
  }
  catch(err) {
  }
  try {
    const vault = new ethcall.Contract(tokenAddress, HARVEST_VAULT_ABI);
    const _token = await app.ethcallProvider.all([vault.underlying()]);
    const res = await getVault(app, vault, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "vault");
    return res;
  }
  catch(err) {
    console.log(err);
  }
  try {
    const crv = new ethcall.Contract(tokenAddress, CURVE_ABI);
    if (tokenAddress.toLowerCase() == "0x88E11412BB21d137C217fd8b73982Dc0ED3665d7".toLowerCase()) {
      const minter = "0x3333333ACdEdBbC9Ad7bda0876e60714195681c5";
      const res = await getCurveToken(app, crv, tokenAddress, stakingAddress, minter);
      window.localStorage.setItem(tokenAddress, "curve");
      return res;
    }
    const [minter] = await app.ethcallProvider.all([crv.minter()]);
    const res = await getCurveToken(app, crv, tokenAddress, stakingAddress, minter);
    window.localStorage.setItem(tokenAddress, "curve");
    return res;
  }
  catch(err) {
  }
  try {
    const stable = new ethcall.Contract(tokenAddress, STABLESWAP_ABI);
    const _coin0 = await app.ethcallProvider.all([stable.coins(0)]);
    window.localStorage.setItem(tokenAddress, "stableswap");
    return await getStableswapToken(app, stable, tokenAddress, stakingAddress);
  }
  catch (err) {
  }
  try {
    const erc20 = new ethcall.Contract(tokenAddress, ERC20_ABI);
    const _name = await app.ethcallProvider.all([erc20.name()]);
    const erc20tok = await getErc20(app, erc20, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "erc20");
    return erc20tok;
  }
  catch(err) {
  }
  try {
    const dsToken = new ethcall.Contract(tokenAddress, DSTOKEN_ABI);
    const res = await getDSToken(app, dsToken, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "dsToken");
    return res;
  }
  catch(err) {
    console.log(`Couldn't match ${tokenAddress} to any known token type.`);
  }
}

function getParameterCaseInsensitive(object, key) {
  return object[Object.keys(object)
    .find(k => k.toLowerCase() === key.toLowerCase())
  ];
}

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
}

function getUniPrices(tokens, prices, pool)
{
  var t0 = getParameterCaseInsensitive(tokens,pool.token0);
  var p0 = getParameterCaseInsensitive(prices,pool.token0)?.usd;
  var t1 = getParameterCaseInsensitive(tokens,pool.token1);
  var p1 = getParameterCaseInsensitive(prices,pool.token1)?.usd;
  if (p0 == null && p1 == null) {
      return undefined;
  }
  var q0 = pool.q0 / 10 ** t0.decimals;
  var q1 = pool.q1 / 10 ** t1.decimals;
  if (p0 == null)
  {
      p0 = q1 * p1 / q0;
      prices[pool.token0] = { usd : p0 };
  }
  if (p1 == null)
  {
      p1 = q0 * p0 / q1;
      prices[pool.token1] = { usd : p1 };
  }
  var tvl = q0 * p0 + q1 * p1;
  var price = tvl / pool.totalSupply;
  prices[pool.address] = { usd : price };
  var staked_tvl = pool.staked * price;
  let stakeTokenTicker = `[${t0.symbol}]-[${t1.symbol}]`;
  if (pool.is1inch) stakeTokenTicker += " 1INCH LP";
  else if (pool.symbol.includes("LSLP")) stakeTokenTicker += " LSLP";
  else if (pool.symbol.includes("SLP")) stakeTokenTicker += " SLP";
  else if (pool.symbol.includes("Cake")) stakeTokenTicker += " Cake LP";
  else if (pool.name.includes("Value LP")) stakeTokenTicker += " Value LP";
  else if (pool.symbol.includes("PGL")) stakeTokenTicker += " PGL"
  else stakeTokenTicker += " Uni LP";
  return {
      t0: t0,
      p0: p0,
      q0  : q0,
      t1: t1,
      p1: p1,
      q1  : q1,
      price: price,
      tvl : tvl,
      staked_tvl : staked_tvl,
      stakeTokenTicker : stakeTokenTicker,
      print_price(chain="eth") {
        const poolUrl = pool.is1inch ? "https://1inch.exchange/#/dao/pools" :
        pool.symbol.includes("LSLP") ? `https://info.linkswap.app/pair/${pool.address}` :
          pool.symbol.includes("SLP") ?  `http://sushiswap.fi/pair/${pool.address}` :
            pool.symbol.includes("Cake") ?  `https://pancakeswap.info/pair/${pool.address}` :  
            pool.symbol.includes("PGL") ?  `https://info.pangolin.exchange/#/pair/${pool.address}` :  
            pool.name.includes("Value LP") ?  `https://info.vswap.fi/pool/${pool.address}` :  
            chain == "matic" ? `https://info.quickswap.exchange/pair/${pool.address}` :
          `http://uniswap.info/pair/${pool.address}`;
        const t0address = t0.symbol == "ETH" ? "ETH" : t0.address;
        const t1address = t1.symbol == "ETH" ? "ETH" : t1.address;
        const helperUrls = pool.is1inch ? [] :
        pool.symbol.includes("LSLP") ? [
          `https://linkswap.app/#/add/${t0address}/${t1address}`,
          `https://linkswap.app/#/remove/${t0address}/${t1address}`,
          `https://linkswap.app/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
        ] :
        pool.symbol.includes("Cake") ? [
          `https://exchange.pancakeswap.finance/#/add/${t0address}/${t1address}`, 
          `https://exchange.pancakeswap.finance/#/remove/${t0address}/${t1address}`, 
          `https://exchange.pancakeswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}` 
        ] :
        pool.name.includes("Value LP") ? [
          `https://bsc.valuedefi.io/#/add/${t0address}/${t1address}`, 
          `https://bsc.valuedefi.io/#/remove/${t0address}/${t1address}`, 
          `https://bsc.valuedefi.io/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}` 
        ] :
        pool.symbol.includes("PGL") ? [
          `https://app.pangolin.exchange/#/add/${t0address}/${t1address}`, 
          `https://app.pangolin.exchange/#/remove/${t0address}/${t1address}`, 
          `https://app.pangolin.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}` 
        ] :
        pool.symbol.includes("SLP") ? [ 
          `https://exchange.sushiswapclassic.org/#/add/${t0address}/${t1address}`,
          `https://exchange.sushiswapclassic.org/#/remove/${t0address}/${t1address}`,
          `https://exchange.sushiswapclassic.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}` 
        ] :
        [ `https://app.uniswap.org/#/add/${t0address}/${t1address}`,
          `https://app.uniswap.org/#/remove/${t0address}/${t1address}`,
          `https://app.uniswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}` ]
        const helperHrefs = helperUrls.length == 0 ? "" :
          ` <a href='${helperUrls[0]}' target='_blank'>[+]</a> <a href='${helperUrls[1]}' target='_blank'>[-]</a> <a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`
        _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>${helperHrefs} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`${t0.symbol} Price: $${formatMoney(p0)}`)
        _print(`${t1.symbol} Price: $${formatMoney(p1)}`)
        _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
      },
      print_contained_price(userStaked) {
        var userPct = userStaked / pool.totalSupply;
        var q0user = userPct * q0;
        var q1user = userPct * q1;
        _print(`Your LP tokens comprise of ${q0user.toFixed(4)} ${t0.symbol} + ${q1user.toFixed(4)} ${t1.symbol}`);
      }
  }
}

function getValuePrices(tokens, prices, pool)
{
  var t0 = getParameterCaseInsensitive(tokens,pool.token0);
  var p0 = getParameterCaseInsensitive(prices,pool.token0)?.usd;
  var t1 = getParameterCaseInsensitive(tokens,pool.token1);
  var p1 = getParameterCaseInsensitive(prices,pool.token1)?.usd;
  if (p0 == null && p1 == null) {
      return undefined;
  }
  var q0 = pool.q0 / 10 ** t0.decimals;
  var q1 = pool.q1 / 10 ** t1.decimals;
  if (p0 == null)
  {
      p0 = q1 * p1 / pool.w1 / q0 * pool.w0;
      prices[pool.token0] = { usd : p0 };
  }
  if (p1 == null)
  {
      p1 = q0 * p0 / pool.w0 / q1 * pool.w1;
      prices[pool.token1] = { usd : p1 };
  }
  var tvl = q0 * p0 + q1 * p1;
  var price = tvl / pool.totalSupply;
  prices[pool.address] = { usd : price };
  var staked_tvl = pool.staked * price;
  let stakeTokenTicker = `[${t0.symbol} ${pool.w0}%]-[${t1.symbol} ${pool.w1}%] Value-LP`;
  return {
      t0, p0, q0, w0 : pool.w0,
      t1, p1, q1, w1 : pool.w1,
      price: price,
      tvl : tvl,
      staked_tvl : staked_tvl,
      stakeTokenTicker : stakeTokenTicker,
      print_price() {
        const poolUrl = `https://info.vswap.fi/pool/${pool.address}` 
        const t0address = t0.address;
        const t1address =  t1.address;
        const helperUrls = [
          `https://bsc.valuedefi.io/#/add/${pool.address}`, 
          `https://bsc.valuedefi.io/#/remove/${pool.address}`, 
          `https://bsc.valuedefi.io/#/vswap?inputCurrency=${t0address}&outputCurrency=${t1address}` 
        ]
        const helperHrefs = helperUrls.length == 0 ? "" :
          ` <a href='${helperUrls[0]}' target='_blank'>[+]</a> <a href='${helperUrls[1]}' target='_blank'>[-]</a> <a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`
        _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>${helperHrefs} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`${t0.symbol} Price: $${formatMoney(p0)}`)
        _print(`${t1.symbol} Price: $${formatMoney(p1)}`)
        _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
      },
      print_contained_price(userStaked) {
        var userPct = userStaked / pool.totalSupply;
        var q0user = userPct * q0;
        var q1user = userPct * q1;
        _print(`Your LP tokens comprise of ${q0user.toFixed(4)} ${t0.symbol} + ${q1user.toFixed(4)} ${t1.symbol}`);
      }
  }
}

function getBalancerPrices(tokens, prices, pool)
{
  var poolTokens = pool.poolTokens.map(t => getParameterCaseInsensitive(tokens, t.address));
  var poolPrices = pool.poolTokens.map(t => getParameterCaseInsensitive(prices, t.address)?.usd);
  var quantities = poolTokens.map((t, i) => pool.poolTokens[i].balance / 10 ** t.decimals);
  var missing = poolPrices.filter(x => !x);
  if (missing.length == poolPrices.length) {
    throw 'Every price is missing';
  }
  var notMissing = poolPrices.findIndex(p => p);
  const getMissingPrice = (missingQuantity, missingWeight) =>
    quantities[notMissing] * poolPrices[notMissing] * missingWeight
     / pool.poolTokens[notMissing].weight / missingQuantity;
  missing.map((_, i) => {
    const newPrice = getMissingPrice(quantities[i], pool.poolTokens[i].weight);
    poolPrices[i] = newPrice;
    prices[poolTokens[i].address] = { usd : newPrice };
  });
  
  var tvl = poolPrices.map((p, i) => p * quantities[i]).reduce((x,y)=>x+y, 0);
  var price = tvl / pool.totalSupply;
  prices[pool.address] = { usd : price };
  var staked_tvl = pool.staked * price;
  var tickers = pool.poolTokens.map((pt, i) => `[${poolTokens[i].symbol} ${pt.weight*100}%]`)
  const stakeTokenTicker = tickers.join('-');
  return {
      tokens : poolTokens,
      prices : poolPrices,
      quantities : quantities,
      price: price,
      tvl : tvl,
      staked_tvl : staked_tvl,
      stakeTokenTicker : stakeTokenTicker,
      print_price() {
        const poolUrl = `http://pools.balancer.exchange/#/pool/${pool.address}`;
        _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a> BPT Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        poolPrices.forEach((p, i) => 
          _print(`${poolTokens[i].symbol} Price: $${formatMoney(p)}`)
        );
        _print(`Staked: ${pool.staked.toFixed(4)} ${stakeTokenTicker} ($${formatMoney(staked_tvl)})`);
      },
      print_contained_price(userStaked) {
        var userPct = userStaked / pool.totalSupply;
        var userQs = quantities.map((q, i) => `${(q * userPct).toFixed(4)} ${poolTokens[i].symbol}`);
        _print(`Your LP tokens comprise of ${userQs.join(' + ')}`);
      }
  }
}

function getWrapPrices(tokens, prices, pool)
{
  const wrappedToken = pool.token;
  if (wrappedToken.token0 != null) { //Uniswap
    const uniPrices = getUniPrices(tokens, prices, wrappedToken);
    const poolUrl = pool.is1inch ? "https://1inch.exchange/#/dao/pools" :
    pool.symbol.includes("SLP") ?  `http://sushiswap.fi/pair/${wrappedToken.address}` :
    (pool.symbol.includes("Cake") || pool.symbol.includes("Pancake")) ?  `http://pancakeswap.info/pair/${wrappedToken.address}`
      : `http://uniswap.info/pair/${wrappedToken.address}`;
    const name = `Wrapped <a href='${poolUrl}' target='_blank'>${uniPrices.stakeTokenTicker}</a>`;
    const price = (pool.balance / 10 ** wrappedToken.decimals) * uniPrices.price / (pool.totalSupply / 10 ** pool.decimals);
    const tvl = pool.balance / 10 ** wrappedToken.decimals * price;
    const staked_tvl = pool.staked * price;
    
    prices[pool.address] = { usd : price };
    return {
      name : name,
      tvl : tvl,
      staked_tvl : staked_tvl,
      price : price,
      stakeTokenTicker : pool.symbol,
      print_price() {
        _print(`${name} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
      },
      print_contained_price(_) {
      }
    }
  }
  else {
    let tokenPrice = 0;
    if (wrappedToken.token != null) { //e.g. stakedao crv token vault
      const pp = getPoolPrices(tokens, prices, wrappedToken.token)
      tokenPrice = pp.price;
    }
    else {
      tokenPrice = getParameterCaseInsensitive(prices, wrappedToken.address)?.usd;
    }
    const price = (pool.balance / 10 ** wrappedToken.decimals) * tokenPrice / (pool.totalSupply / 10 ** pool.decimals);
    const tvl = pool.balance / 10 ** wrappedToken.decimals * price;
    const staked_tvl = pool.staked * price;
    prices[pool.address] = { usd : price };
    return {
      name: pool.symbol,
      tvl : tvl,
      staked_tvl : staked_tvl,
      price : price,
      stakeTokenTicker : pool.symbol,
      print_price() {
        _print(`${pool.symbol} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
      },
      print_contained_price(_) {
      }
    }
  }
}

function getErc20Prices(prices, pool, chain="eth") {  
  var price = getParameterCaseInsensitive(prices,pool.address)?.usd;
  var tvl = pool.totalSupply * price / 10 ** pool.decimals;
  var staked_tvl = pool.staked * price;
  let poolUrl;
  switch (chain) {
    case "eth": 
      poolUrl=`https://etherscan.io/token/${pool.address}`;
      break;
    case "bsc":
      poolUrl=`https://bscscan.com/token/${pool.address}`;
      break;
    case "heco":
      poolUrl=`https://scan.hecochain.com/token/${pool.address}`;
      break;
    case "matic":
      poolUrl=`https://explorer-mainnet.maticvigil.com/address/${pool.address}`;
      break;
    case "avax":
      poolUrl=`https://cchain.explorer.avax.network/address/${pool.address}`;
      break;
  }
  const name = `<a href='${poolUrl}' target='_blank'>${pool.symbol}</a>`;
  return {
    staked_tvl : staked_tvl,
    price : price,
    stakeTokenTicker : pool.symbol,
    print_price() {
      _print(`${name} Price: $${formatMoney(price)} Market Cap: $${formatMoney(tvl)}`);
      _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
    },
    print_contained_price() {
    }
  }
}

function getCurvePrices(prices, pool) {  
  var price = getParameterCaseInsensitive(prices,pool.token.address)?.usd * pool.virtualPrice;
  var tvl = pool.totalSupply * price / 10 ** pool.decimals;
  var staked_tvl = pool.staked * price;
  const poolUrl = `https://etherscan.io/token/${pool.address}`;
  const name = `<a href='${poolUrl}' target='_blank'>${pool.symbol}</a>`;
  return {
    staked_tvl : staked_tvl,
    price : price,
    stakeTokenTicker : pool.symbol,
    print_price() {
      _print(`${name} Price: $${formatMoney(price)} Market Cap: $${formatMoney(tvl)}`);
      _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
    },
    print_contained_price() {
    }
  }
}

function getPoolPrices(tokens, prices, pool, chain = "eth") {
  if (pool.w0 != null) return getValuePrices(tokens, prices, pool);
  if (pool.poolTokens != null) return getBalancerPrices(tokens, prices, pool);
  if (pool.token0 != null) return getUniPrices(tokens, prices, pool);
  if (pool.virtualPrice != null) return getCurvePrices(prices, pool);
  if (pool.token != null) return getWrapPrices(tokens, prices, pool);
  return getErc20Prices(prices, pool, chain);
}

async function getPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {  
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
      stakedToken : null,
      userLPStaked : 0,
      lastRewardBlock : poolInfo.lastRewardBlock
    };
  }
  const poolToken = await getToken(app, poolInfo.lpToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  var stakedToken;
  var userLPStaked;
  if (poolInfo.stakedHoldableToken != null && 
    poolInfo.stakedHoldableToken != "0x0000000000000000000000000000000000000000") {
    stakedToken = await getToken(app, poolInfo.stakedHoldableToken, chefAddress);
    userLPStaked = userInfo.stakedLPAmount / 10 ** poolToken.decimals
  }
  return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      stakedToken : stakedToken,
      userLPStaked : userLPStaked,
      lastRewardBlock : poolInfo.lastRewardBlock
  };
}

function printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, 
                  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPR = usdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
  var userDailyRewards = userWeeklyRewards / 7;
  var userYearlyRewards = userWeeklyRewards * 52;
  if (userStaked > 0) {
    _print(`Estimated ${rewardTokenTicker} earnings:`
        + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrice)})`
        + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
        + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
  }
  return { 
    userStakedUsd, 
    totalStakedUsd : staked_tvl, 
    userStakedPct, 
    yearlyAPR, 
    userYearlyUsd : userYearlyRewards * rewardPrice 
  }
}

function printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrice) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }      
  const unstake = async function() {
    return chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }      
  const claim = async function() {
    return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  if  (chefAddr == "0x0De845955E2bF089012F682fE9bC81dD5f11B372") {
    const emergencyWithdraw = async function() {
      return chefContract_emergencyWithdraw(chefAbi, chefAddr, poolIndex, App)
    }      
    _print('***')
    _print_link(`EMERGENCY WITHDRAW ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, emergencyWithdraw)  
    _print('This will forfeit your rewards but retrieve your capital')
    _print('***')
  }
  _print(`\n`);
}

function printChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices, 
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth") {  
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek == 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  poolPrices.print_price();
  sp?.print_price();
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker, 
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked, 
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain);
  return apr;
}

async function loadChefContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction, extraPrices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 13.5

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
  
  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  var prices = await lookUpTokenPrices(tokenAddresses);
  if (extraPrices) {
    for (const [k,v] of Object.entries(extraPrices)) {
      if (v.usd) {
        prices[k] = v
      }
    }
  }
  //prices["0x194ebd173f6cdace046c53eacce9b953f28411d1"] = { usd : 1.22 } //"temporary" solution
  
  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, chefAddress);
  }));

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);

  _print("Finished reading smart contracts.\n");
    
  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction)
      aprs.push(apr);
    }
  }
  let totalUserStaked=0, totalStaked=0, averageApr=0;
  for (const a of aprs) {
    if (a && !isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a && a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
      averageApr += a.userStakedUsd * a.yearlyAPR / 100;
    }
  }
  averageApr = averageApr / totalUserStaked;
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
    _print(`Estimated earnings:`
        + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
        + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
        + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
  }
  return { prices, totalUserStaked, totalStaked, averageApr }
}

//ratio is used for multi-boardroom setups
async function loadBoardroom(App, prices, boardroomAddress, oracleAddress, lptAddress, rewardTokenAddress, stakeTicker, rewardTicker,
        epochsPerDay, maxSupplyIncrease, decimals, ratio, targetMantissa) {
    const BOARDROOM = new ethers.Contract(boardroomAddress, BOARDROOM_ABI, App.provider);
    const ORACLE = new ethers.Contract(oracleAddress, BASIS_ORACLE_ABI, App.provider);
    const share = await BOARDROOM.share();
    const SHARE = new ethers.Contract(share, ERC20_ABI, App.provider);
    const userUnstaked = await SHARE.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const sharePrice = getParameterCaseInsensitive(prices, share)?.usd;
    const userStaked = await BOARDROOM.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const userStakedUsd = userStaked * sharePrice;
    const totalStaked = await BOARDROOM.totalSupply() / 1e18;
    const totalStakedUsd = totalStaked * sharePrice;
    const userPct = userStaked / totalStaked * 100;
    const earned = await BOARDROOM.earned(App.YOUR_ADDRESS) / 1e18;
    _print(`Boardroom`);
    _print(`There is a total ${totalStaked.toFixed(2)} ${stakeTicker} ($${formatMoney(totalStakedUsd)}) staked in the Boardroom.`)
    _print(`You are staking ${userStaked} ${stakeTicker} ($${formatMoney(userStakedUsd)}), ${userPct.toFixed(2)}% of the pool.`);

    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress).usd;
    const oldTimestamp = await ORACLE.blockTimestampLast();
    const token0 = await ORACLE.token0();
    const token1 = await ORACLE.token1();
    let twap;
    if (token0.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        const oldPrice0 = await ORACLE.price0CumulativeLast();
        const [price0, , timestamp] = await getCurrentPriceAndTimestamp(App, lptAddress);
        twap = await calculateTwap(oldPrice0, oldTimestamp, price0, timestamp, targetMantissa);
    } 
    else if (token1.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        const oldPrice1 = await ORACLE.price1CumulativeLast();
        const [, price1, timestamp] = await getCurrentPriceAndTimestamp(App, lptAddress);
        twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, targetMantissa);
    }
    if (twap > 1) {
        const REWARD_TOKEN = new ethers.Contract(rewardTokenAddress, ERC20_ABI, App.provider);
        const totalSupply = await REWARD_TOKEN.totalSupply() / (10 ** await REWARD_TOKEN.decimals());
        const newTokens = totalSupply *  Math.min(twap - 1, maxSupplyIncrease)  * ratio;
        _print(`There will be ${newTokens.toFixed(decimals)} ${rewardTicker} issued at next expansion.`);
        const boardReturn = newTokens * rewardPrice / totalStakedUsd * 100 * epochsPerDay;
        _print(`Boardroom APR: Day ${(boardReturn).toFixed(2)}% Week ${(boardReturn * 7).toFixed(2)}% Year ${(boardReturn * 365).toFixed(2)}%`)
    }

    const approveTENDAndStake = async () => rewardsContract_stake(share, boardroomAddress, App);
    const unstake = async () => rewardsContract_unstake(boardroomAddress, App);
    const claim = async () => boardroom_claim(boardroomAddress, App);
    const exit = async () =>  rewardsContract_exit(boardroomAddress, App);
    const revoke = async () => rewardsContract_resetApprove(share, boardroomAddress, App);

    _print_link(`Stake ${userUnstaked.toFixed(decimals)} ${stakeTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(decimals)} ${stakeTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(decimals)} ${rewardTicker} ($${formatMoney(earned*rewardPrice)})`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print(`\n`);

    return { staked_tvl : totalStakedUsd };
}

async function loadSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      x.toLowerCase() !=  "0xb34ab2f65c6e4f764ffe740ab83f982021faed6d" && //BSG can't be retrieved from Coingecko
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const calls = [STAKING_MULTI.periodFinish(), STAKING_MULTI.rewardRate(), 
      STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(App.YOUR_ADDRESS)]
    const [periodFinish, rewardRate, balance, earned_] = await App.ethcallProvider.all(calls);
    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = earned_ / 10 ** rewardToken.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      weeklyRewards,
      usdPerWeek,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned
    }
}

async function printSynthetixPool(App, info, chain="eth") {
    info.poolPrices.print_price(chain);
    _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
        const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${info.rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
    }
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(info.stakingAddress, App)
    }
    const claim = async function() {
      return rewardsContract_claim(info.stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    switch (chain) {
      case "eth":
        _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
        break;
      case "avax":
        _print(`<a target="_blank" href="https://cchain.explorer.avax.network/address/${info.stakingAddress}#code">Explorer</a>`);
        break;
      case "bsc":
        _print(`<a target="_blank" href="https://bscscan.com/address/${info.stakingAddress}#code">BSC Scan</a>`);
        break;
      case "heco":
        _print(`<a target="_blank" href="https://scan.hecochain.com/address/${info.stakingAddress}#code">Heco Scan</a>`);
        break;
      case "matic":
        _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Matic Explorer</a>`);
        break;
    }
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : yearlyAPR
    }
}

async function loadSynthetixPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
  const info = await loadSynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
  return await printSynthetixPool(App, info);
}

async function loadMultipleSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p => 
    loadSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printSynthetixPool(App, i);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadBasisFork(data) {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};
    var totalStaked = 0;
    
    let p1 = await loadSynthetixPool(App, tokens, prices, data.PoolABI, 
        data.SharePool.address, data.SharePool.rewardToken, data.SharePool.stakeToken);
    totalStaked += p1.staked_tvl;
    
    if (data.SharePool2) {
      let p3 = await loadSynthetixPool(App, tokens, prices, data.PoolABI, 
          data.SharePool2.address, data.SharePool2.rewardToken, data.SharePool2.stakeToken);
      totalStaked += p3.staked_tvl;
    }

    let p2 = await loadSynthetixPool(App, tokens, prices, data.PoolABI, 
        data.CashPool.address, data.CashPool.rewardToken, data.CashPool.stakeToken);
    totalStaked += p2.staked_tvl;

    if (data.SeedBanks) {
      let p = await loadMultipleSynthetixPools(App, tokens, prices, data.SeedBanks)
      totalStaked += p.staked_tvl;
      if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
      }
    }

    if (!data.SeedBanks)
    {
      if (data.Boardrooms) {
        for (const boardroom of data.Boardrooms) {
          let br = await loadBoardroom(App, prices, boardroom.address, data.Oracle, data.UniswapLP, data.Cash,
              data.ShareTicker, data.CashTicker, data.ExpansionsPerDay, data.MaximumExpansion, 
              data.Decimals, boardroom.ratio, data.TargetMantissa);
          totalStaked += br.staked_tvl;
        }
      }
      else {
        let br = await loadBoardroom(App, prices, data.Boardroom, data.Oracle, data.UniswapLP, data.Cash,
            data.ShareTicker, data.CashTicker, data.ExpansionsPerDay, data.MaximumExpansion, 
            data.Decimals, 1, data.TargetMantissa);
        totalStaked += br.staked_tvl;
      }
    } 

    _print_bold(`Total staked: $${formatMoney(totalStaked)}`)

    hideLoading();
}
