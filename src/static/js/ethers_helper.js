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

const rewardsContract_stake = async function(stakingTokenAddr, rewardPoolAddr, App, maxAllowance) {
  const signer = App.provider.getSigner()

  const TEND_TOKEN = new ethers.Contract(stakingTokenAddr, ERC20_ABI, signer)
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

async function getUniPool(app, pool, poolAddress, stakingAddress) {
  const decimals = await pool.decimals();
  const token0 = await pool.token0();
  const token1 = await pool.token1();
  let q0, q1, is1inch;
  try {
    const reserves = await pool.getReserves();
    q0 = reserves._reserve0;
    q1 = reserves._reserve1;
    is1inch = false;
  }
  catch { //for 1inch
    const c0 = new ethers.Contract(token0, ERC20_ABI, app.provider);
    const c1 = new ethers.Contract(token1, ERC20_ABI, app.provider);
    q0 = await c0.balanceOf(poolAddress);
    q1 = await c1.balanceOf(poolAddress);
    is1inch = true;
  }
  return { 
      symbol : await pool.symbol(),
      name : await pool.name(),
      address: poolAddress,
      token0: token0,
      q0,
      token1: token1,
      q1,
      totalSupply: await pool.totalSupply() / 10 ** decimals,
      stakingAddress: stakingAddress,
      staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
      decimals: decimals,
      unstaked: await pool.balanceOf(app.YOUR_ADDRESS) / 10 ** decimals,
      contract: pool,
      tokens : [token0, token1],
      is1inch
  };
}

async function getBalancerPool(app, pool, poolAddress, stakingAddress, tokens) {
  const decimals = await pool.decimals();
  const poolTokens = await Promise.all(tokens.map(async (t) => { return {
    address : t,
    weight : await pool.getNormalizedWeight(t) / 1e18,
    balance : await pool.getBalance(t)
  };}));
  return { 
      symbol : await pool.symbol(),
      name : await pool.name(),
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
        const poolUrl = pool.is1inch ? "https://1inch.exchange/#/dao/pools" :
          pool.symbol.includes("SLP") ?  `http://sushiswap.vision/pair/${pool.address}`
            : `http://uniswap.info/pair/${pool.address}`;
        const t0address = t0.symbol == "ETH" ? "ETH" : t0.address;
        const t1address = t1.symbol == "ETH" ? "ETH" : t1.address;
        const helperUrls = pool.is1inch ? [] :
          pool.symbol.includes("SLP") ? 
          [ `https://exchange.sushiswapclassic.org/#/add/${t0address}/${t1address}`,
            `https://exchange.sushiswapclassic.org/#/remove/${t0address}/${t1address}`,
            `https://exchange.sushiswapclassic.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}` ] :
          [ `https://app.uniswap.org/#/add/${t0address}/${t1address}`,
            `https://app.uniswap.org/#/remove/${t0address}/${t1address}`,
            `https://app.uniswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}` ]
        const helperHrefs = helperUrls.length == 0 ? "" :
          ` <a href='${helperUrls[0]}' target='_blank'>[+]</a> <a href='${helperUrls[1]}' target='_blank'>[-]</a> <a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`
        _print(`<a href='${poolUrl}' target='_blank'>${stakingTokenTicker}</a>${helperHrefs} LP Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`${t0.symbol} Price: $${formatMoney(p0)}`)
        _print(`${t1.symbol} Price: $${formatMoney(p1)}`)
        _print(`Staked: $${formatMoney(staked_tvl)}`);
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
  const stakingTokenTicker = tickers.join('-');
  return {
      tokens : poolTokens,
      prices : poolPrices,
      quantities : quantities,
      price: price,
      tvl : tvl,
      staked_tvl : staked_tvl,
      stakingTokenTicker : stakingTokenTicker,
      print_price() {
        const poolUrl = `http://pools.balancer.exchange/#/pool/${pool.address}`;
        _print(`<a href='${poolUrl}' target='_blank'>${stakingTokenTicker}</a> BPT Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        poolPrices.forEach((p, i) => 
          _print(`${poolTokens[i].symbol} Price: $${formatMoney(p)}`)
        );
        _print(`Staked: $${formatMoney(staked_tvl)}`);
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
  const poolUrl = `https://etherscan.io/token/${pool.address}`;
  const name = `<a href='${poolUrl}' target='_blank'>${pool.symbol}</a>`;
  return {
    staked_tvl : staked_tvl,
    price : price,
    stakingTokenTicker : pool.symbol,
    print_price() {
      _print(`${name} Price: $${formatMoney(price)} Market Cap: $${formatMoney(tvl)}`);
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
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      stakedToken : stakedToken,
      userLPStaked : userLPStaked,
      lastRewardBlock : poolInfo.lastRewardBlock
  };
}

function printApy(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, 
                  stakingTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPY = usdPerWeek / staked_tvl * 100;
  var dailyAPY = weeklyAPY / 7;
  var yearlyAPY = weeklyAPY * 52;
  _print(`APY: Day ${dailyAPY.toFixed(2)}% Week ${weeklyAPY.toFixed(2)}% Year ${yearlyAPY.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakingTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
  var userDailyRewards = userWeeklyRewards / 7;
  var userYearlyRewards = userWeeklyRewards * 52;
  if (userStaked > 0) {
    _print(`Estimated ${rewardTokenTicker} earnings:`
        + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrice)})`
        + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
        + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
  }
}

function printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTicker, stakingTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction) {
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
  const etherscanUrl = `<a href='https://etherscan.io/address/${poolAddress}' target='_blank'>Staking Contract</a>`;
  _print(etherscanUrl);
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakingTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakingTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker}`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print(`\n`);
}

function printChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices, 
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction) {  
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek == 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  poolPrices.print_price();
  sp?.print_price();
  printApy(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakingTokenTicker, 
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakingTokenTicker, poolInfo.poolToken.unstaked, 
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction);
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

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 13.5

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

async function loadFluidStatus(App, LP, fluidEpochs, epoch) {  
  const unbondFilter = LP.filters.Unbond(App.YOUR_ADDRESS);
  const unbonds = await LP.queryFilter(unbondFilter);
  const bondFilter = LP.filters.Bond(App.YOUR_ADDRESS);
  const bonds = await LP.queryFilter(bondFilter);
  if (unbonds.length + bonds.length > 0) {
      const lastUnbond = Math.max(...unbonds.map(u => u.args.start / 1));
      const lastBond = Math.max(...bonds.map(d => d.args.start / 1));
      const fluidEpoch = Math.max(lastUnbond, lastBond);
      _print(`You last bonded or unbonded at epoch ${fluidEpoch}.`)
      _print(`You will become Frozen in ${fluidEpoch + fluidEpochs - epoch} epochs.`);
  }
}

const loadDAO = async (App, DAO, DOLLAR, uniswapAddress, liquidityPoolAddress, tokens, prices, fluidEpochs,
  isBuggyDAO, displayDecimals, epochSec) => {
    const unstaked = await DOLLAR.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const totalSupply = await DOLLAR.totalSupply() / 1e18;
    const dollar = await DOLLAR.symbol();

    const uniPool = await getToken(App, uniswapAddress, liquidityPoolAddress);  
    var newPrices = await lookUpTokenPrices(uniPool.tokens.filter(t => 
      t.toLowerCase() != "0x5cf9242493be1411b93d064ca2e468961bbb5924")); //Exception for ESG due to coingecko bug
    for (const key in newPrices) {
        prices[key] = newPrices[key];
    }
    await Promise.all(uniPool.tokens.map(async (address) => {
        tokens[address] = await getToken(App, address, uniPool.address);
    }));
    const uniPrices = getPoolPrices(tokens, prices, uniPool);

    const zaiPrice = getParameterCaseInsensitive(prices, DOLLAR.address).usd;

    const decimals = displayDecimals ?? 2;

    const totalBonded = await DAO.totalBonded() / 1e18;
    const totalStaged = await DAO.totalStaged() / 1e18;
    const bonded = await DAO.balanceOfBonded(App.YOUR_ADDRESS) / 1e18;
    const staged = await DAO.balanceOfStaged(App.YOUR_ADDRESS) / 1e18;
    const status = await DAO.statusOf(App.YOUR_ADDRESS) ? "Fluid" : "Frozen";
    const epoch = await DAO.epoch() / 1;
    _print(`Current Epoch: ${epoch}`);
    if (epochSec) _print(`Epoch Period: ${new Date(epochSec * 1000).toISOString().substr(11, 8)}`)
    _print(`${dollar} Price: $${formatMoney(zaiPrice)}\n`);
    
    _print(`${dollar} Total Supply: ${totalSupply.toFixed(decimals)}, $${formatMoney(totalSupply * zaiPrice)}`);
    _print(`${dollar} Total Staged: ${totalStaged.toFixed(decimals)}, $${formatMoney(totalStaged * zaiPrice)}`);
    _print(`${dollar} Total Bonded: ${totalBonded.toFixed(decimals)}, $${formatMoney(totalBonded * zaiPrice)}`);
    _print(`Your DAO status is ${status}`);
    _print(`You have ${unstaked.toFixed(decimals)} unstaked ${dollar}, $${formatMoney(unstaked*zaiPrice)}`);
    _print(`You have ${staged.toFixed(decimals)} staged ${dollar}, $${formatMoney(staged*zaiPrice)}, ${(staged/totalStaged*100).toFixed(4)}% of the pool`);
    _print(`You have ${bonded.toFixed(decimals)} bonded ${dollar}, $${formatMoney(bonded*zaiPrice)}, ${(bonded/totalBonded*100).toFixed(4)}% of the pool`);
    if (status == "Fluid") await loadFluidStatus(App, DAO, fluidEpochs, epoch);
    
    const approveAndDeposit = async () => dao_deposit(App, DAO, DOLLAR);
    const withdraw = async () => esd_withdraw(DAO, App); 
    const bond = async () => esd_bond(DAO, App); 
    const unbond = async () => isBuggyDAO ? buggy_dao_unbond(DAO,App) : esd_unbond(DAO, App); 

    _print_link(`Deposit ${unstaked.toFixed(decimals)} ${dollar}`, approveAndDeposit)
    _print_link(`Withdraw ${staged.toFixed(decimals)} ${dollar}`, withdraw);
    _print_link(`Bond ${staged.toFixed(decimals)} ${dollar}`, bond);
    _print_link(`Unbond ${bonded.toFixed(decimals)} ${dollar}`, unbond);
    _print(''); 

    const couponFilter = DAO.filters.CouponPurchase(App.YOUR_ADDRESS);
    const coupons = await DAO.queryFilter(couponFilter);
    for (const c of coupons) {
        const dollarAmount = c.args.dollarAmount / 1e18;
        const couponCount = c.args.couponAmount / 1e18;
        const couponEpoch = c.args.epoch / 1;
        _print(`You purchased ${couponCount} coupons worth $${dollarAmount} at epoch ${couponEpoch}`)
    }
    _print('');

    return [epoch, uniPrices, totalBonded];
}

async function loadEmptySetLP(App, LP, stakeTokenAddress, stakeTokenTicker, fluidEpochs, epoch, rewardTicker, uniPrices,
    displayDecimals) {
  const stakeToken = new ethers.Contract(stakeTokenAddress, ERC20_ABI, App.provider);
  const unstaked = await stakeToken.balanceOf(App.YOUR_ADDRESS) / 1e18;

  const totalBonded = await LP.totalBonded() / 1e18;
  const totalStaged = await LP.totalStaged() / 1e18;

  const staged = await LP.balanceOfStaged(App.YOUR_ADDRESS) / 1e18;
  const bonded = await LP.balanceOfBonded(App.YOUR_ADDRESS) / 1e18;
  const claimable = await LP.balanceOfClaimable(App.YOUR_ADDRESS) / 1e18;
  const rewarded = 
    (rewardTicker == "ESG" 
      ? await LP.balanceOfRewarded(App.YOUR_ADDRESS, Contracts.ESG.Dollar.address)
      : await LP.balanceOfRewarded(App.YOUR_ADDRESS))
     / 1e18;
  const status =
    (rewardTicker == "ESG" 
      ? await LP.statusOf(App.YOUR_ADDRESS, epoch) 
      : await LP.statusOf(App.YOUR_ADDRESS)) 
        ? "Fluid" : "Frozen";
  
  const lpPrice = uniPrices.price;
  uniPrices.print_price();    
  //_print(`${stakeTokenTicker} Total Supply: ${uniPrices.totalSupply.toFixed(2)}, $${formatMoney(uniPrices.totalSupply * zaiPrice)}`);
  _print(`${stakeTokenTicker} Total Staged: ${totalStaged.toFixed(2)}, $${formatMoney(totalStaged * lpPrice)}`);
  _print(`${stakeTokenTicker} Total Bonded: ${totalBonded.toFixed(2)}, $${formatMoney(totalBonded * lpPrice)}`);
  _print(`Your LP status is ${status}`);
  _print(`You have ${unstaked.toFixed(8)} unstaked ${stakeTokenTicker}, $${formatMoney(unstaked * lpPrice)}`);
  if (unstaked > 0) uniPrices.print_contained_price(unstaked);
  _print(`You have ${staged.toFixed(8)} staged ${stakeTokenTicker}, $${formatMoney(staged * lpPrice)}, ${(staged/totalStaged*100).toFixed(4)}% of the pool`);
  if (staged > 0) uniPrices.print_contained_price(staged);
  _print(`You have ${bonded.toFixed(8)} bonded ${stakeTokenTicker}, $${formatMoney(bonded * lpPrice)}, ${(bonded/totalBonded*100).toFixed(4)}% of the pool`);
  if (bonded > 0) uniPrices.print_contained_price(bonded);

  const decimals = displayDecimals ?? 2;
  _print(`You have ${rewarded.toFixed(decimals)} rewarded ${rewardTicker}`);
  _print(`You have ${claimable.toFixed(decimals)} claimable ${rewardTicker}`);
  
  if (status == "Fluid") await loadFluidStatus(App, LP, fluidEpochs, epoch);
  const approveAndDeposit = async () => dao_deposit(App, LP, stakeToken);
  const withdraw = async () => esd_withdraw(LP, App); 
  const bond = async () => esd_bond(LP, App); 
  const unbond = async () => esd_unbond_pool(LP, App); 
  const claim = async () => esd_claim(LP, App);

  _print_link(`Deposit ${unstaked.toFixed(6)} ${stakeTokenTicker}`, approveAndDeposit)
  _print_link(`Withdraw ${staged.toFixed(6)} ${stakeTokenTicker}`, withdraw);
  _print_link(`Bond ${staged.toFixed(6)} ${stakeTokenTicker}`, bond);
  _print_link(`Unbond ${bonded.toFixed(6)} ${stakeTokenTicker}`, unbond);
  _print_link(`Claim ${claimable.toFixed(6)} ${rewardTicker}`, claim);
  _print('');   
}

const esd_withdraw = async function(DAO, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = DAO.connect(signer);
  const currentStakedAmount = await REWARD_POOL.balanceOfStaged(App.YOUR_ADDRESS)

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

const esd_claim = async function(LP, App) {
  const signer = App.provider.getSigner()

  const claimable = await LP.balanceOfClaimable(App.YOUR_ADDRESS)

  if (claimable > 0) {
    showLoading()
    LP.connect(signer).claim(claimable, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const esd_unbond = async function(DAO, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = DAO.connect(signer);
  const currentStakedAmount = await REWARD_POOL.balanceOfBonded(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.unbondUnderlying(currentStakedAmount, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const esd_unbond_pool = async function(DAO, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = DAO.connect(signer);
  const currentStakedAmount = await REWARD_POOL.balanceOfBonded(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.unbond(currentStakedAmount, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const esd_bond = async function(DAO, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = DAO.connect(signer);
  const currentStakedAmount = await REWARD_POOL.balanceOfStaged(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.bond(currentStakedAmount, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const buggy_dao_unbond = async function(DAO, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = DAO.connect(signer);
  const currentStakedAmount = await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.unbond(currentStakedAmount, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

///targetMantissa should be 12 for USDC based, 0 for DAI based
const calculateTwap = async (oldPrice0, oldTimestamp, price0, timestamp, targetMantissa) => {
    // Convert Prices to BN
    const price0CumulativeLast = ethers.BigNumber.from(oldPrice0)
    let price0Cumulative = ethers.BigNumber.from(price0)
  
    // Convert timestamps to BN
    const latest = ethers.BigNumber.from(timestamp) // Current Uniswap contract timestamp
    const blockTimestamp = latest.mod(ethers.BigNumber.from(2).pow(32))
    const blockTimestampLast = ethers.BigNumber.from(oldTimestamp) // Saved Uniswap timestamp
  
    // Sub the timestamps to get distance
    const timeElapsed = blockTimestamp.sub(blockTimestampLast)
  
    // If subbing timestamps equals 0: no new trades have happened so use the Spot Price
    // Returning 0 here so it can be handled else where
    if (timeElapsed.toNumber() === 0) return 0
  
    // Do the TWAP calc
    const price0Average = price0Cumulative
      .sub(price0CumulativeLast)
      .div(timeElapsed)
  
    // Shifting the base to match the right numbers
    // Adjust the number of 0s as necessary.
    const exchangeRate0 = price0Average
    .mul(ethers.BigNumber.from(10).pow(18))
    .mul(ethers.BigNumber.from(10).pow(targetMantissa))
    .div(ethers.BigNumber.from(2).pow(112))

    // Returnthe Float of the TWAP 
    return exchangeRate0 / 1e18;
}

const getCurrentPriceAndTimestamp = async (App, address) => {
    const UNI = new ethers.Contract(address, UNI_ABI, App.provider);
    const price0 = await UNI.price0CumulativeLast();
    const price1 = await UNI.price1CumulativeLast();
    const { _blockTimestampLast } = await UNI.getReserves()
    const token0 = await UNI.token0();
    return [ price0, price1, _blockTimestampLast, token0 ]
}

const getBasisCurrentPriceAndTimestamp = async (App, address) => {
    const ORACLE = new ethers.Contract(address, BASIS_ORACLE_ABI, App.provider);
    const price0 = await ORACLE.price0CumulativeLast();
    const price1 = await ORACLE.price1CumulativeLast();
    const blockTimestampLast = await ORACLE.blockTimestampLast()
    return [ price0, price1, blockTimestampLast ]
}

async function printDaoUnbonds(provider, DAO, epoch, fluidEpochs, epochTimeSec) {
    const fluidBlocks = fluidEpochs * epochTimeSec / 13.5 * 1.1; //10% leeway
    const blockNumber = await provider.getBlockNumber();
    const unbonds = await DAO.queryFilter(DAO.filters.Unbond(), blockNumber-fluidBlocks, blockNumber);
    for (let i = 0; i < fluidEpochs; i++) {
        let filtered = unbonds.filter(u => epoch + i + 1 - fluidEpochs == u.args?.start / 1);
        let unbonding = filtered.map(u => u.args?.valueUnderlying / 1e18).reduce((x, y) => x+y,0);
        _print(`Unbonding at epoch ${epoch+i}: ${formatMoney(unbonding)}`)
    }
}

async function printLPUnbonds(provider, DAO, epoch, fluidEpochs, epochTimeSec) {
    const fluidBlocks = Math.round(fluidEpochs * epochTimeSec / 13.5 * 1.1); //10% leeway
    const blockNumber = await provider.getBlockNumber();
    const unbonds = await DAO.queryFilter(DAO.filters.Unbond(), blockNumber-fluidBlocks, blockNumber);
    for (let i = 0; i < fluidEpochs; i++) {
        let filtered = unbonds.filter(u => epoch + i + 1 - fluidEpochs == u.args?.start / 1);
        let unbonding = filtered.map(u => u.args?.value / 1e18).reduce((x, y) => x+y,0);
        let claimable = filtered.map(u => u.args?.newClaimable / 1e18).reduce((x, y) => x+y,0);
        _print(`Unbonding at epoch ${epoch+i}: ${unbonding.toFixed(8)} - Claimable: ${formatMoney(claimable)}`);
    }
}

const SecondsPerDay = 86400;

async function calculateDollarAPR(DAO, parameters, twap, dollarPrice, uniPrices, totalBonded, calculateChange) {
    const totalCoupons = await DAO.totalCoupons() / 1e18;
    const totalRedeemable = await DAO.totalRedeemable() / 1e18;
    const totalNet = await DAO.totalNet() / 1e18;

    const lpReward = parameters.PoolRatio;
    const daoReward = parameters.DaoRatio;
    // Get price
    const calcPrice = calculateChange(twap, totalCoupons, totalRedeemable)

    // Calulcate the outstanding commitments so we can remove it from the rewards
    const totalOutstanding = totalCoupons - totalRedeemable

    const maxRewards = totalNet * calcPrice * daoReward;

    const daoRewards = maxRewards - totalOutstanding

    if (daoRewards > 0) {
        const bondedReturn = daoRewards / totalBonded * 100 * SecondsPerDay / parameters.EpochPeriod;

        _print(`DAO APR: Day ${bondedReturn.toFixed(2)}% Week ${(bondedReturn * 7).toFixed(2)}% Year ${(bondedReturn * 365).toFixed(2)}%`)

    } else {
        _print(`DAO APR: Day 0% Week 0% Year 0%`)
    }
    // Calculate total rewards allocated to LP
    const lpRewards = totalNet * calcPrice * lpReward
    const lpReturn = lpRewards * dollarPrice / uniPrices.staked_tvl * 100 * SecondsPerDay / parameters.EpochPeriod;

    _print(`LP  APR: Day ${lpReturn.toFixed(2)}% Week ${(lpReturn * 7).toFixed(2)}% Year ${(lpReturn * 365).toFixed(2)}%`)  
}

async function getTWAP(App, lpAddress, dollarAddress, baseTokenDecimals) {  
  const resp = await fetch('https://api.vfat.tools/twap/' + lpAddress);
  const text = await resp.text();
  const array = text.split("\n");
  let twap;
  if (array.length > 0) {
      const [oldPrice0, oldPrice1, oldTimestamp] = array[array.length - 2].split(' ') //last line is blank
      const [price0, price1, timestamp, token0] = await getCurrentPriceAndTimestamp(App, lpAddress);
      const targetMantissa = 18 - (baseTokenDecimals ?? 6); //default USDC
      if (token0.toLowerCase() == dollarAddress.toLowerCase()) {
        twap = await calculateTwap(oldPrice0, oldTimestamp, price0, timestamp, targetMantissa);
      }
      else {
        twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, targetMantissa);
      }
  }
  return twap;
}

async function loadDollar(contractInfo, calcPrice) {
  const params = contractInfo.Parameters;
  
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const DAO = new ethers.Contract(contractInfo.DAO.address, contractInfo.DAO.abi, App.provider);
  const DOLLAR = new ethers.Contract(contractInfo.Dollar.address, ERC20_ABI, App.provider);
  var prices = {};
  var tokens = {};

  const poolInfo = contractInfo.LPIncentivizationPool ?? contractInfo.Pool;

  const [epoch, uniPrices, totalBonded] = await loadDAO(App, DAO, DOLLAR, contractInfo.UniswapLP.address,
    poolInfo.address, tokens, prices, params.DaoLockupPeriods, false,
      contractInfo.Dollar.displayDecimals, params.EpochPeriod);

  const LP = new ethers.Contract(poolInfo.address, poolInfo.abi, App.provider);
  await loadEmptySetLP(App, LP, contractInfo.UniswapLP.address, 
      poolInfo.ticker ?? contractInfo.UniswapLP.ticker, 
      params.PoolLockupPeriods, 
      epoch, contractInfo.Dollar.ticker, uniPrices, contractInfo.Dollar.displayDecimals);
  
  const dollarPrice = getParameterCaseInsensitive(prices, DOLLAR.address).usd;

  if (epoch < params.BootstrappingPeriod) { //bootstrapping
      const twap = params.BootstrappingPrice;      
      await calculateDollarAPR(DAO, params, twap, dollarPrice, uniPrices, totalBonded, calcPrice);
  }
  else {
      const resp = await fetch('https://api.vfat.tools/twap/' + contractInfo.UniswapLP.address);
      const text = await resp.text();
      const array = text.split("\n");
      let twap = getTwap(App, contractInfo.UniswapLP.address, DOLLAR.address, params.BaseTokenDecimals);
      if (twap) {
          _print(`TWAP (using vfat oracle): ${twap}\n`);

          if (twap > params.GrowthThreshold ?? 1) {
              await calculateDollarAPR(DAO, contractInfo.Parameters, twap, dollarPrice, uniPrices, totalBonded, calcPrice);
          }
          else {
              _print(`DAO APR: Day 0% Week 0% Year 0%`)
              _print(`LP APR: Day 0% Week 0% Year 0%`)
          }        
      }
  }
  _print(`\nDAO Unbonds`)
  await printDaoUnbonds(App.provider, DAO, epoch + 1, params.DaoLockupPeriods, params.EpochPeriod);
  _print(`\LP Unbonds`)
  await printLPUnbonds(App.provider, LP, epoch + 1, params.PoolLockupPeriods, params.EpochPeriod);
  hideLoading();  
}

const calculateEmptySetChange = (params, totalCoupons, totalRedeemable, price) => {
  if (price > 1 + params.CouponSupplychangeLimit && totalCoupons > totalRedeemable) {
      return params.CouponSupplychangeLimit
  } else if (
      1 + params.CouponSupplychangeLimit >= price &&
      price > 1 + params.SupplyChangeLimit &&
      totalCoupons > totalRedeemable
  ) {
      return Math.abs(price - 1)
  } else if (price > 1 + params.SupplyChangeLimit) {
      return params.SupplyChangeLimit
  } else if (price < 1 - params.SupplyChangeLimit) {
      return params.SupplyChangeLimit
  } else {
      return Math.abs(price - 1)
  }
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
        const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress).usd;
        const boardReturn = newTokens * rewardPrice / totalStakedUsd * 100 * epochsPerDay;
        _print(`Boardroom APR: Day ${(boardReturn).toFixed(2)}% Week ${(boardReturn * 7).toFixed(2)}% Year ${(boardReturn * 365).toFixed(2)}%`)
    }

    const approveTENDAndStake = async () => rewardsContract_stake(share, boardroomAddress, App);
    const unstake = async () => rewardsContract_unstake(boardroomAddress, App);
    const claim = async () => rewardsContract_claim(boardroomAddress, App);
    const exit = async () =>  rewardsContract_exit(boardroomAddress, App);
    const revoke = async () => rewardsContract_resetApprove(share, boardroomAddress, App);

    _print_link(`Stake ${userUnstaked.toFixed(decimals)} ${stakeTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(decimals)} ${stakeTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(decimals)} ${rewardTicker}`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print(`\n`);

    return { staked_tvl : totalStakedUsd };
}

async function loadSynthetixPool(App, tokens, prices, stakingAbi, stakingAddress,
        rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }

    var newPriceAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        if (newPrices[key])
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

    const stakingTokenTicker = poolPrices.stakingTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    // Find out reward rate
    const weeklyRewards = await get_synth_weekly_rewards(STAKING_POOL);

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;

    poolPrices.print_price();
    _print(`${rewardTokenTicker} Per Week: ${weeklyRewards.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
    const weeklyAPY = usdPerWeek / staked_tvl * 100;
    const dailyAPY = weeklyAPY / 7;
    const yearlyAPY = weeklyAPY * 52;
    _print(`APY: Day ${dailyAPY.toFixed(2)}% Week ${weeklyAPY.toFixed(2)}% Year ${yearlyAPY.toFixed(2)}%`);
    const userStakedUsd = userStaked * stakeTokenPrice;
    const userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`You are staking ${userStaked.toFixed(6)} ${stakingTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (userStaked > 0) {
        const userWeeklyRewards = userStakedPct * weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
    }
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(stakeTokenAddress, stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(stakingAddress, App)
    }
    const claim = async function() {
      return rewardsContract_claim(stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(stakeTokenAddress, stakingAddress, App)
    }
    if (stakeTokenFunction !== "mith") {
        _print_link(`Stake ${userUnstaked.toFixed(6)} ${stakingTokenTicker}`, approveTENDAndStake)
    }
    _print_link(`Unstake ${userStaked.toFixed(6)} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker}`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print(`\n`);

    return {
        staked_tvl: poolPrices.staked_tvl,
    }
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

    let p2 = await loadSynthetixPool(App, tokens, prices, data.PoolABI, 
        data.CashPool.address, data.CashPool.rewardToken, data.CashPool.stakeToken);
    totalStaked += p2.staked_tvl;

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

    _print_bold(`Total staked: $${formatMoney(totalStaked)}`)

    hideLoading();
}