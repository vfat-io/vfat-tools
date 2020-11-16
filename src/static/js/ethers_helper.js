async function init_ethers() {
  const App = {}

  const ETHEREUM_NODE_URL = 'aHR0cHM6Ly9tYWlubmV0LmluZnVyYS5pby92My9hNmYzNmI4OWM0OGM0ZmE4YjE0NjYwNWY2ZDdhNWI2Zg=='
  
  let isMetaMaskInstalled = true

  // Modern dapp browsers...
  if (window.ethereum) {
    App.web3Provider = window.ethereum
    try {
      // Request account access
      await window.ethereum.enable()
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
  }
  App.YOUR_ADDRESS = addr

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

const lookUpPrices = async function(id_array) {
  let ids = id_array.join('%2C')
  return $.ajax({
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd',
    type: 'GET',
  })
}

const lookUpTokenPrices = async function(id_array) {
  let ids = id_array.join('%2C')
  return $.ajax({
    url: 'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + ids + '&vs_currencies=usd',
    type: 'GET',
  })
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
  return Math.round((rewardRate / 1e18) * 604800)
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

const rewardsContract_resetApprove = async function(stakingTokenAddr, rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakingTokenAddr, ERC20_ABI, signer)

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

const rewardsContract_stake = async function(stakingTokenAddr, rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const TEND_TOKEN = new ethers.Contract(stakingTokenAddr, ERC20_ABI, signer)
  const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, YFFI_REWARD_CONTRACT_ABI, signer)

  const currentTEND = await TEND_TOKEN.balanceOf(App.YOUR_ADDRESS)
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

const rewardsContract_unstake = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)
  const currentStakedAmount = await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)
  const earnedTokenAmount = (await REWARD_POOL.earned(App.YOUR_ADDRESS)) / 1e18

  if (earnedTokenAmount > 0) {
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

const print_warning = function() {
  _print_bold('WARNING: DO NOT USE STAKE IN THIS POOL UNLESS YOU HAVE REVIEWED THE CONTRACTS.')
  _print_bold('         YOU ARE RESPONSIBLE FOR ANY FUNDS THAT YOU LOSE BY INTERACTING WITH THIS CONTRACT.\n')
}

 

const chefContract_stake = async function(chefAbi, chefAddress, poolIndex, stakingTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakingTokenAddr, ERC20_ABI, signer)
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
          CHEF_CONTRACT.deposit(poolIndex, currentTokens, {gasLimit: 250000})
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
    CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const chefContract_claim = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    CHEF_CONTRACT.deposit(poolIndex, 0, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

async function getUniPool(app, pool, poolAddress, stakingAddress) {
  const reserves = await pool.getReserves();
  const decimals = await pool.decimals();
  const token0 = await pool.token0();
  const token1 = await pool.token1();
  return { 
      address: poolAddress,
      token0: token0,
      q0    : reserves._reserve0,
      token1: token1,
      q1    : reserves._reserve1,
      totalSupply: await pool.totalSupply() / 10 ** decimals,
      stakingAddress: stakingAddress,
      staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
      decimals: decimals,
      unstaked: await pool.balanceOf(app.YOUR_ADDRESS) / 10 ** decimals,
      contract: pool,
      tokens : [token0, token1]
  };
}

async function getBalancerPool(app, pool, poolAddress, stakingAddress, tokens) {
  const decimals = await pool.decimals();
  const poolTokens = await Promise.all(tokens.map(async (t) => { return {
    address : t,
    weight : await pool.getDenormalizedWeight(t) / 1e18,
    balance : await pool.getBalance(t)
  };}));
  return { 
      address: poolAddress,
      poolTokens: poolTokens, //address, weight and balance
      totalSupply: await pool.totalSupply() / 10 ** decimals,
      stakingAddress: stakingAddress,
      staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
      decimals: decimals,
      unstaked: await pool.balanceOf(app.YOUR_ADDRESS) / 10 ** decimals,
      contract: pool,
      tokens : tokens //just the token addresses to conform with the other pool types
  };
}

async function getJar(app, jar, address, stakingAddress) {
    const decimals = await jar.decimals();
    const token = await getToken(app, await jar.token(), address);
    return {
      address: address,
      name : await jar.name(),
      symbol : await jar.symbol(),
      totalSupply :  await jar.totalSupply(),
      decimals : decimals,
      staked: await jar.balanceOf(stakingAddress) / 10 ** decimals,
      unstaked: await jar.balanceOf(app.YOUR_ADDRESS) / 10 ** decimals,
      token: token,
      balance : await jar.balance(),
      contract: jar,
      tokens : token.tokens
    }
}

async function getErc20(app, token, address, stakingAddress) {
    const decimals = await token.decimals();
    const staked = await token.balanceOf(stakingAddress);
    const unstaked = await token.balanceOf(app.YOUR_ADDRESS);
    const ret = {
        address: address,
        name : await token.name(),
        symbol : await token.symbol(),
        totalSupply :  await token.totalSupply(),
        decimals : decimals,
        staked:  staked / 10 ** decimals,
        unstaked: unstaked  / 10 ** decimals,
        contract: token,
        tokens : [address]
    };
    return ret;
}

async function getDSToken(app, token, address, stakingAddress) {
    const decimals = await token.decimals();
    const staked = await token.balanceOf(stakingAddress);
    const unstaked = await token.balanceOf(app.YOUR_ADDRESS);
    const ret = {
        address: address,
        name : hex_to_ascii(await token.name()),
        symbol : hex_to_ascii(await token.symbol()),
        totalSupply :  await token.totalSupply(),
        decimals : decimals,
        staked:  staked / 10 ** decimals,
        unstaked: unstaked  / 10 ** decimals,
        contract: token,
        tokens : [address]
    };
    return ret;
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

async function getToken(app, tokenAddress, stakingAddress) {
  try {
    const pool = new ethers.Contract(tokenAddress, UNI_ABI, app.provider);
    const _token0 = await pool.token0();
    const uniPool = await getUniPool(app, pool, tokenAddress, stakingAddress);
    return uniPool;
  }
  catch(err) {
  }
  try {
    const bal = new ethers.Contract(tokenAddress, BALANCER_POOL_ABI, app.provider);
    const tokens = await bal.getFinalTokens();
    const balPool = await getBalancerPool(app, bal, tokenAddress, stakingAddress, tokens);
    return balPool;
  }
  catch(err) {
  }
  try {
    const jar = new ethers.Contract(tokenAddress, JAR_ABI, app.provider);
    const _token = await jar.token();
    return await getJar(app, jar, tokenAddress, stakingAddress);
  }
  catch(err) {
  }
  try {
    const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, app.provider);
    const _name = await erc20.name();
    const erc20tok = await getErc20(app, erc20, tokenAddress, stakingAddress);
    return erc20tok;
  }
  catch(err) {
  }
  const dsToken = new ethers.Contract(tokenAddress, DSTOKEN_ABI, app.provider);
  return await getDSToken(app, dsToken, tokenAddress, stakingAddress);
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
  const stakingTokenTicker = `[${t0.symbol}]-[${t1.symbol}]`;
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
      stakingTokenTicker : stakingTokenTicker,
      print_price() {
        const poolUrl = `http://uniswap.info/pair/${pool.address}`;
        _print(`<a href='${poolUrl}' target='_blank'>${stakingTokenTicker}</a> UNI Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`${t0.symbol} Price: $${formatMoney(p0)}`)
        _print(`${t1.symbol} Price: $${formatMoney(p1)}`)
        _print(`Staked: $${formatMoney(staked_tvl)}`);
      },
      print_contained_price(userStaked) {
        var userPct = userStaked / pool.totalSupply;
        var q0user = userPct * q0;
        var q1user = userPct * q1;
        _print(`Your LP tokens comprise of ${q0user.toFixed(2)} ${t0.symbol} + ${q1user.toFixed(2)} ${t1.symbol}`);
      }
  }
}

function getBalancerPrices(tokens, prices, pool)
{
  if (pool.poolTokens.length > 2) {
    throw 'Currently only works with 2 poolTokens';
  }
  var pt0 = pool.poolTokens[0];
  var pt1 = pool.poolTokens[1];
  var t0 = getParameterCaseInsensitive(tokens,pt0.address);
  var p0 = getParameterCaseInsensitive(prices,pt0.address)?.usd;
  var t1 = getParameterCaseInsensitive(tokens,pt1.address);
  var p1 = getParameterCaseInsensitive(prices,pt1.address)?.usd;
  if (p0 == null && p1 == null) {
      return undefined;
  }
  var q0 = pt0.balance / 10 ** t0.decimals;
  var q1 = pt1.balance / 10 ** t1.decimals;
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
  const stakingTokenTicker = `[${t0.symbol}]-[${t1.symbol}]`;
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
      stakingTokenTicker : stakingTokenTicker,
      print_price() {
        const poolUrl = `http://pools.balancer.exchange/#/pool/${pool.address}`;
        _print(`<a href='${poolUrl}' target='_blank'>${stakingTokenTicker}</a> BPT Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`${t0.symbol} Price: $${formatMoney(p0)}`)
        _print(`${t1.symbol} Price: $${formatMoney(p1)}`)
        _print(`Staked: $${formatMoney(staked_tvl)}`);
      },
      print_contained_price(userStaked) {
        var userPct = userStaked / pool.totalSupply;
        var q0user = userPct * q0;
        var q1user = userPct * q1;
        _print(`Your LP tokens comprise of ${q0user.toFixed(2)} ${t0.symbol} + ${q1user.toFixed(2)} ${t1.symbol}`);
      }
  }
}

function getWrapPrices(tokens, prices, pool)
{
  const wrappedToken = pool.token;
  if (wrappedToken.token0 != null) { //Uniswap
    const uniPrices = getUniPrices(tokens, prices, wrappedToken);
    const poolUrl = `http://uniswap.info/pair/${wrappedToken.address}`;
    const name = `Wrapped UNI <a href='${poolUrl}' target='_blank'>${uniPrices.stakingTokenTicker}</a>`;
    const price = (pool.balance / 10 ** wrappedToken.decimals) * uniPrices.price / (pool.totalSupply / 10 ** pool.decimals);
    const tvl = pool.balance / 1e18 * price;
    const staked_tvl = pool.staked * price;
    
    return {
      tvl : tvl,
      staked_tvl : staked_tvl,
      price : price,
      stakingTokenTicker : pool.symbol,
      print_price() {
        _print(`${name} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`Staked: $${formatMoney(staked_tvl)}`);
      },
      print_contained_price(_) {
      }
    }
  }
  else {
    const tokenPrice = getParameterCaseInsensitive(prices, wrappedToken.address)?.usd;
    const price = (pool.balance / 10 ** wrappedToken.decimals) * tokenPrice / (pool.totalSupply / 10 ** pool.decimals);
    const tvl = pool.balance / 1e18 * price;
    const staked_tvl = pool.staked * price;
    
    return {
      tvl : tvl,
      staked_tvl : staked_tvl,
      price : price,
      stakingTokenTicker : pool.symbol,
      print_price() {
        _print(`${pool.symbol} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`Staked: $${formatMoney(staked_tvl)}`);
      },
      print_contained_price(_) {
      }
    }
  }
}

function getErc20Prices(prices, pool) {  
  var price = getParameterCaseInsensitive(prices,pool.address)?.usd;
  var tvl = pool.totalSupply * price / 10 ** pool.decimals;
  var staked_tvl = pool.staked * price;
  return {
    staked_tvl : staked_tvl,
    price : price,
    stakingTokenTicker : pool.symbol,
    print_price() {
      _print(`${pool.symbol}</a> Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
      _print(`Staked: $${formatMoney(staked_tvl)}`);
    },
    print_contained_price() {
    }
  }
}

function getPoolPrices(tokens, prices, pool) {
  if (pool.poolTokens != null) return getBalancerPrices(tokens, prices, pool);
  if (pool.token0 != null) return getUniPrices(tokens, prices, pool);
  if (pool.token != null) return getWrapPrices(tokens, prices, pool);
  return getErc20Prices(prices, pool);
}

async function getPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {  
  const poolInfo = await chefContract.poolInfo(poolIndex);
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
      allocPoints: poolInfo.allocPoint,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      stakedToken : stakedToken,
      userLPStaked : userLPStaked,
      lastRewardBlock : poolInfo.lastRewardBlock
  };
}

function printApy(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, 
                  stakingTokenTicker, stakedTvl, userStaked, poolTokenPrice) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPY = usdPerWeek / stakedTvl * 100;
  var dailyAPY = weeklyAPY / 7;
  var yearlyAPY = weeklyAPY * 52;
  _print(`APY: Day ${dailyAPY.toFixed(2)}% Week ${weeklyAPY.toFixed(2)}% Year ${yearlyAPY.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / stakedTvl * 100;
  _print(`You are staking ${userStaked.toFixed(2)} ${stakingTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
  var userDailyRewards = userWeeklyRewards / 7;
  var userYearlyRewards = userWeeklyRewards * 52;
  if (userStaked > 0) {
    _print(`Estimated ${rewardTokenTicker} earnings:`
        + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardPrice)})`
        + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
        + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
  }
}

function printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTicker, stakingTokenTicker, unstaked, userStaked, pendingRewardTokens) {
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }      
  const unstake = async function() {
    return chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }      
  const claim = async function() {
    return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }    
  _print_link(`Stake ${unstaked.toFixed(2)} ${stakingTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(2)} ${stakingTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens.toFixed(2)} ${rewardTokenTicker}`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print(`\n`);
}

function printChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices, 
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction) {  
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const stakedTvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  poolPrices.print_price();
  sp?.print_price();
  printApy(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakingTokenTicker, stakedTvl, userStaked, poolPrices.price);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakingTokenTicker, poolInfo.poolToken.unstaked, 
    poolInfo.userStaked, poolInfo.pendingRewardTokens);
}

async function loadChefPool(App, prices, tokens, poolIndex, 
                            chefAbi, chefContract, chefAddr, totalAllocPoints, 
                            rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, 
                            pendingRewardsFunction) {  
  const poolInfo = await getPoolInfo(App, chefContract, chefAddr, poolIndex, pendingRewardsFunction);
  var newPriceAddresses = poolInfo.poolToken.tokens.filter(x => prices[x] == null);
  var newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
      prices[key] = newPrices[key];
  }
  var newTokenAddresses = poolInfo.poolToken.tokens.filter(x => tokens[x] == null);
  await Promise.all(newTokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, chefAddr);
  }));

  const poolPrices = getPoolPrices(tokens, prices, poolInfo);

  printChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
   totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
   pendingRewardsFunction);
}

async function loadChefPools(App, prices, tokens, rewardTokenPoolIndex, 
    chefAbi, chefContract, chefAddress, totalAllocPoints, 
    rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewardsFunction, poolCount) {
  //Loading the pool with the reward token first allows calculating the APY for the remaining ones
  await loadChefPool(App, prices, tokens, rewardTokenPoolIndex, 
    chefAbi, chefContract, chefAddress, totalAllocPoints, 
    rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewardsFunction);
  
  for (i = 0; i < poolCount; i++) {
    if (i != rewardTokenPoolIndex) {
        await loadChefPool(App, prices, tokens, i,
          chefAbi, chefContract, chefAddress, totalAllocPoints, 
          rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewardsFunction);
    }
  }
}

async function loadChefContract(App, chefAddress, chefAbi, rewardTokenPoolIndex, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, pendingRewardsFunction) {    
  const chefContract = new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = await chefContract.poolLength();
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`Found ${poolCount} pools.\n`)

  var prices = {};
  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardsPerWeek = await chefContract.callStatic[rewardsPerBlockFunction]() / 1e18 * 604800 / 13.5

  await loadChefPools(App, prices, tokens, rewardTokenPoolIndex, chefAbi, chefContract, chefAddress,
    totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewardsFunction, poolCount);
}

async function loadChefContractSecondAttempt(App, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`Found ${poolCount} pools.\n`)

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() / 1e18 * 604800 / 13.5

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
  
  var tokenAddresses = [].concat.apply([], poolInfos.map(x => x.poolToken.tokens));
  var prices = await lookUpTokenPrices(tokenAddresses);
  
  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, chefAddress);
  }));

  const poolPrices = poolInfos.map(poolInfo => getPoolPrices(tokens, prices, poolInfo.poolToken));

  _print("Finished reading smart contracts.\n");
    
  for (i = 0; i < poolCount; i++) {
    printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
      totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
      pendingRewardsFunction);
  }
}