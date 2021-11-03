$(function() {
  consoleInit(main)
})

const OPENX_CHEF_ABI = [{"inputs":[{"internalType":"contract OpenSwapToken","name":"_sushi","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"uint256","name":"_sushiPerBlock","type":"uint256"},{"internalType":"uint256","name":"_sushiPerSecond","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"},{"internalType":"uint256","name":"_currentBlocktime","type":"uint256"},{"internalType":"uint256","name":"_lastBlocktime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"currentAmount","type":"uint8"}],"name":"DevFundLowered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"OpenSwapPerBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"Blocktime","type":"uint256"}],"name":"RewardChange","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OpenSwap","outputs":[{"internalType":"contract OpenSwapToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OpenSwapPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OpenSwapPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentBlocktime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devDivisor","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isUserRegisty","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastBlocktime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpDepositor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"poolExistence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accOpenSwapPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardCollector","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"},{"internalType":"bool","name":"direct","type":"bool"},{"internalType":"bool","name":"renounce","type":"bool"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updateBlockIssuanceWithBlocktime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_currentBlocktime","type":"uint256"}],"name":"changeBlocktime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingOpenSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"amountStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"extDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"extWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collectAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lowerDevFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_collectoraddr","type":"address"}],"name":"collector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_depositoraddr","type":"address"}],"name":"depositor","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  const OPENX_CHEF_ADDR = '0xb2E9B85FB43082F3148B0D13450E8BEB5C9B63f2'
  const rewardTokenTicker = 'OpenX'
  const OPENX_CHEF = new ethers.Contract(OPENX_CHEF_ADDR, OPENX_CHEF_ABI, App.provider)

  const blockNumber = await App.provider.getBlockNumber()
  const multiplier = await OPENX_CHEF.getMultiplier(blockNumber, blockNumber + 1)
  const rewardPerBlock = await OPENX_CHEF.OpenSwapPerBlock()
  const rewardsPerWeek = ((rewardPerBlock / 1e18) * multiplier * 604800) / 2

  const tokens = {}
  const prices = await getHarmonyPrices()

  await loadHarmonyOpenxContracts(
    App,
    tokens,
    prices,
    OPENX_CHEF,
    OPENX_CHEF_ADDR,
    OPENX_CHEF_ABI,
    rewardTokenTicker,
    'OpenSwap',
    null,
    rewardsPerWeek,
    'pendingOpenSwap',
    [0, 1, 2, 3, 4, 5, 6], // need to specify to prevent ~0 staked tokens from getting omitted,
    false
  )

  hideLoading()
}

async function loadHarmonyOpenxContracts(
  App,
  tokens,
  prices,
  chef,
  chefAddress,
  chefAbi,
  rewardTokenTicker,
  rewardTokenFunction,
  rewardsPerBlockFunction,
  rewardsPerWeekFixed,
  pendingRewardsFunction,
  deathPoolIndices,
  hideFooter
) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider)

  const poolCount = parseInt(await chefContract.poolLength(), 10)
  const totalAllocPoints = await chefContract.totalAllocPoint()

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`)

  var tokens = {}

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]()
  const rewardToken = await getHarmonyToken(App, rewardTokenAddress, chefAddress)
  const rewardsPerWeek =
    rewardsPerWeekFixed ??
    (((await chefContract.callStatic[rewardsPerBlockFunction]()) / 10 ** rewardToken.decimals) * 604800) / 3

  const poolInfos = await Promise.all(
    [...Array(poolCount).keys()].map(
      async x => await getHarmonyPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)
    )
  )

  var tokenAddresses = [].concat.apply(
    [],
    poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens)
  )

  await Promise.all(
    tokenAddresses.map(async address => {
      tokens[address] = await getHarmonyToken(App, address, chefAddress)
      const token = tokens[address]
      tokens[address] ={...token, symbol: checkPrefixes(address,token.symbol)} 
    })
  )
  if (deathPoolIndices) {
    //load prices for the deathpool assets
    deathPoolIndices
      .map(i => poolInfos[i])
      .map(poolInfo => (poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'Harmony') : undefined))
  }

  const poolPrices = poolInfos.map(poolInfo =>
    poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'Harmony') : undefined
  )

  _print('Finished reading smart contracts.\n')

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(
        App,
        chefAbi,
        chefAddress,
        prices,
        tokens,
        poolInfos[i],
        i,
        poolPrices[i],
        totalAllocPoints,
        rewardsPerWeek,
        rewardTokenTicker,
        rewardTokenAddress,
        pendingRewardsFunction,
        null,
        null,
        'bsc'
      )
      aprs.push(apr)
    }
  }
  let totalUserStaked = 0,
    totalStaked = 0,
    averageApr = 0
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd
    }
    if (a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd
      averageApr += (a.userStakedUsd * a.yearlyAPR) / 100
    }
  }
  averageApr = averageApr / totalUserStaked

  if (!hideFooter) {
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`)
    if (totalUserStaked > 0) {
      _print_bold(
        `\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(
          averageApr * 100
        ).toFixed(2)}%`
      )
      _print(
        `Estimated earnings:` +
          ` Day $${formatMoney((totalUserStaked * averageApr) / 365)}` +
          ` Week $${formatMoney((totalUserStaked * averageApr) / 52)}` +
          ` Year $${formatMoney(totalUserStaked * averageApr)}\n`
      )
    }
  }

  return {prices, totalUserStaked, totalStaked, averageApr}
}
function checkPrefixes(address, symbol) {
  if (address == '0xE176EBE47d621b984a73036B9DA5d834411ef734') {
    return 'eBUSD'
  } else {
    return transformPrefix(symbol)
  }
}
function transformPrefix(symbol) {
  if (symbol[0] === '1') {
    const ethPrefix = 'e'
    const newSymbol = symbol.slice(1)
    return ethPrefix.concat(newSymbol)
  } else {
    if (symbol.slice(0, 3) === 'bsc') {
      const binancePrefix = 'b'
      const newSymbol = symbol.slice(3)
      return binancePrefix.concat(newSymbol)
    } else {
      return symbol
    }
  }
}
