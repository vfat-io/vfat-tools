$(function() {
  consoleInit(main)
})

const NAOS_ADDR = '0x4a615bb7166210cce20e6642a6f8fb5d4d044496'
const CHEF_ADDR = '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd'
const NAOS_POOL_ID = 255
const NAOS_SLP_ADDR = '0x82EbCD936C9E938704b65027850E42393F8BC4d4'
const UNI_LP_ADDR = '0x9b577e849b128ee1a69144b218e809b8bb98c35d'
const STAKING_POOL_ADDR = '0x99E4eA9eF6bf396C49B35FF9478EbB8890aEF581'
const POOL_IDS = {
  naos: 0,
  lp: 1,
  nusd3crv: 3,
}

async function printNaosPoolInfo(App, tokens, prices, poolId) {
  // Display staking info
  const STAKING_POOL = new ethers.Contract(STAKING_POOL_ADDR, NAOS_STAKING_POOL_ABI, App.provider)
  const STAKING_MULTI = new ethcall.Contract(STAKING_POOL_ADDR, NAOS_STAKING_POOL_ABI)

  const stakeTokenAddress = await STAKING_POOL.getPoolToken(poolId)
  const stakeToken = await getToken(App, stakeTokenAddress, STAKING_POOL_ADDR)
  const rewardTokenAddress = NAOS_ADDR
  const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress)
  const poolPrices = getPoolPrices(tokens, prices, stakeToken)

  if (stakeToken.token0) {
    const token0 = getParameterCaseInsensitive(tokens, stakeToken.token0)
    const token1 = getParameterCaseInsensitive(tokens, stakeToken.token1)
    _print(`${poolId} - ${token0.symbol}-${token1.symbol} UNI_V2 LP Pool`)

    _print(
      `<a href="https://etherscan.io/token/${stakeTokenAddress}" target="_blank">${
        stakeToken.symbol
      }</a> Price: $${displayPrice(poolPrices.price)} <a href="https://app.uniswap.org/#/add/v2/${stakeToken.token0}/${
        stakeToken.token1
      }" target="_blank">[+]</a> <a href="https://app.uniswap.org/#/remove/v2/${stakeToken.token0}/${
        stakeToken.token1
      }" target="_blank">[-]</a> <a href="https://app.uniswap.org/#/swap?inputCurrency=${
        stakeToken.token0
      }&outputCurrency=${stakeToken.token1}" target="_blank">[<=>]</a>`
    )
  } else if (stakeToken.token) {
    _print(`${poolId} - ${stakeToken.name} Pool`)
    _print(
      `<a href="https://etherscan.io/token/${stakeTokenAddress}" target="_blank">${
        stakeToken.symbol
      }</a> Price: $${displayPrice(poolPrices.price)} <a href="https://crv.to/pool" target="_blank">[+]</a>`
    )
  } else {
    _print(`${poolId} - ${stakeToken.name} Pool`)
    _print(
      `<a href="https://etherscan.io/token/${stakeTokenAddress}" target="_blank">${
        stakeToken.symbol
      }</a> Price: $${displayPrice(poolPrices.price)}`
    )
  }

  _print(
    `Current Staked: ${stakeToken.staked.toFixed(4)} ${stakeToken.symbol} ($${formatMoney(poolPrices.staked_tvl)})`
  )

  // Display link to intreraction
  const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd
  const calls = [
    STAKING_MULTI.getPoolRewardRate(poolId),
    STAKING_MULTI.getStakeTotalDeposited(App.YOUR_ADDRESS, poolId),
    STAKING_MULTI.getStakeTotalUnclaimed(App.YOUR_ADDRESS, poolId),
  ]
  const [rewardRate, staked, earned] = await App.ethcallProvider.all(calls)
  const weeklyRewards = ((rewardRate / 1e18) * 604800) / 13.5
  const usdPerWeek = weeklyRewards * rewardTokenPrice
  const userStaked = staked / 10 ** stakeToken.decimals
  const userEarned = earned / 10 ** rewardToken.decimals

  _print(`Rewards: ${weeklyRewards} ${rewardToken.symbol} ($${usdPerWeek}) Per Week`)
  _print(`APR: ${((usdPerWeek * 52 * 100) / poolPrices.staked_tvl).toFixed(2)}%`)
  _print('')
  _print(`You are staking ${userStaked.toFixed(2)} ${stakeToken.symbol}`)
  _print_link(`Stake ${stakeToken.unstaked.toFixed(2)} ${stakeToken.symbol}`, () => {
    chefContract_stake(NAOS_STAKING_POOL_ABI, STAKING_POOL_ADDR, poolId, stakeTokenAddress, App)
  })
  _print_link(`Unstake ${userStaked.toFixed(2)} ${stakeToken.symbol}`, async () => {
    const signer = App.provider.getSigner()
    const contract = new ethers.Contract(STAKING_POOL_ADDR, NAOS_STAKING_POOL_ABI, signer)
    showLoading()
    contract
      .withdraw(poolId, staked)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  })
  _print_link(`Claim ${userEarned.toFixed(2)} ${rewardToken.symbol}`, async () => {
    const signer = App.provider.getSigner()
    const contract = new ethers.Contract(STAKING_POOL_ADDR, NAOS_STAKING_POOL_ABI, signer)
    showLoading()
    contract
      .claim(poolId)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  })
  _print('')
}

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}`)
  _print('')

  // Initialize tokens and prices
  const chefContract = new ethers.Contract(CHEF_ADDR, MASTERCHEF_ABI, App.provider)
  const sushipoolInfo = await getPoolInfo(App, chefContract, CHEF_ADDR, NAOS_POOL_ID, 'pendingSushi')
  const sushiRewardsAddr = await chefContract.sushi()
  const tokenAddresses = [
    ...sushipoolInfo.poolToken.tokens,
    sushiRewardsAddr,
    '0x67d9eAe741944D4402eB0D1cB3bC3a168EC1764c',
  ] // [NAOS, ETH, SUSHI, nUSD(STABLE_SWAP_ABI)]

  const tokens = {}
  for (const address of tokenAddresses) {
    tokens[address] = await getToken(App, address, CHEF_ADDR)
  }
  const prices = await lookUpTokenPrices(tokenAddresses)

  // NAOS Rewards Pool
  _print('--- Earn NAOS Rewards ---')
  await printNaosPoolInfo(App, tokens, prices, POOL_IDS.naos)
  await printNaosPoolInfo(App, tokens, prices, POOL_IDS.lp)
  await printNaosPoolInfo(App, tokens, prices, POOL_IDS.nusd3crv)

  _print()

  // SUSHI Rewards Pool
  _print('--- Earn SUSHI Rewards ---')
  const totalAllocPoints = await chefContract.totalAllocPoint()
  const rewardsPerBlock = await chefContract.sushiPerBlock()
  const rewardsPerWeek = (rewardsPerBlock * 604800) / 13.5 / 10 ** 18
  const sushipoolPrices = getPoolPrices(tokens, prices, sushipoolInfo.poolToken)
  printChefPool(
    App,
    MASTERCHEF_ABI,
    CHEF_ADDR,
    prices,
    tokens,
    sushipoolInfo,
    NAOS_POOL_ID,
    sushipoolPrices,
    totalAllocPoints,
    rewardsPerWeek,
    'SUSHI',
    sushiRewardsAddr,
    'pendingSushi'
  )

  hideLoading()
}
