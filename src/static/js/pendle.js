$(function() {
  consoleInit(main)
});

const PENDLE_LIQUIDITY_MINING_ABI = [{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[{"internalType":"address","name":"newLpHoldingContractAddress","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const PENDLE_SINGLE_STAKING_ABI = [{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"enter","outputs":[{"internalType":"uint256","name":"sharesToMint","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"leave","outputs":[{"internalType":"uint256","name":"rewards","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]

const PENDLE_POOLS_READ_WRAPPER_ABI = [{"inputs":[{"internalType":"contract PendleLiquidityRewardsProxy","name":"_rewardsProxy","type":"address"},{"internalType":"address","name":"_liqMiningContract","type":"address"},{"internalType":"uint256[]","name":"_expiries","type":"uint256[]"},{"internalType":"address","name":"_user","type":"address"}],"name":"claim","outputs":[{"internalType":"uint256","name":"rewards","type":"uint256"},{"internalType":"uint256[]","name":"pendingRewards","type":"uint256[]"},{"internalType":"uint256","name":"currentEpoch","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_poolOrMarket","type":"address"},{"internalType":"contract PendleLiquidityMining","name":"_staking","type":"address"},{"internalType":"enum PendlePoolsReadWrapper.Type","name":"_type","type":"uint8"}],"name":"getLiquidityMiningInfo","outputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"string","name":"marketSymbol","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"uint256","name":"lpTotalSupply","type":"uint256"},{"internalType":"uint256","name":"totalStakeLP","type":"uint256"},{"internalType":"uint256","name":"totalRewards","type":"uint256"},{"internalType":"uint8","name":"tokenDecimals","type":"uint8"},{"internalType":"uint8","name":"xytDecimals","type":"uint8"},{"components":[{"internalType":"uint256","name":"ytotBalance","type":"uint256"},{"internalType":"uint256","name":"ytotWeight","type":"uint256"},{"internalType":"uint256","name":"tokenBalance","type":"uint256"},{"internalType":"uint256","name":"tokenWeight","type":"uint256"}],"internalType":"struct PendlePoolsReadWrapper.Reserves","name":"reserves","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract PendleSingleStaking","name":"_staking","type":"address"},{"internalType":"contract PendleSingleStakingManager","name":"_manager","type":"address"},{"internalType":"contract IERC20","name":"_pendle","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"getSingleStakingInfo","outputs":[{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"userAvailableToStake","type":"uint256"},{"internalType":"uint256","name":"userAllowance","type":"uint256"},{"internalType":"uint256","name":"userShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract PendleYieldToken","name":"_pool","type":"address"},{"internalType":"contract PendleLiquidityMining","name":"_staking","type":"address"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"enum PendlePoolsReadWrapper.Type","name":"_type","type":"uint8"}],"name":"getStakingInfo","outputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"numberOfEpochs","type":"uint256"},{"internalType":"uint256","name":"epochDuration","type":"uint256"},{"internalType":"uint256","name":"userStaked","type":"uint256"},{"internalType":"uint256","name":"userAvailableToStake","type":"uint256"},{"internalType":"uint256","name":"userAllowance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"address","name":"_staking","type":"address"},{"internalType":"uint256","name":"_allowance","type":"uint256"}],"name":"tokenApprove","outputs":[],"stateMutability":"nonpayable","type":"function"}]

COINGECKO_IDS = {
  PENDLE: 'pendle',
  USDC: 'usd-coin',
}

const YT_FARMS = [{
  st: 'YT-PE-29DEC2022',
  token: 'PENDLE',
  market: '0x685d32f394a5F03e78a1A0F6A91B4E2bf6F52cfE',
  staking: '0x0F3BCcBfEF1dC227f33A11d7a51cD02DEaD208c8',
}, {
  st: 'YT-ETHUSDC-29DEC2022',
  token: 'USDC',
  market: '0x79c05Da47dC20ff9376B2f7DbF8ae0c994C3A0D0',
  staking: '0xA78029ab5235B9A83EC45eD036042Db26c6E4300',
}, {
  st: 'YT-aUSDC-30DEC2021',
  token: 'USDC',
  market: '0x9e382E5f78B06631E4109b5d48151f2b3f326df0',
  staking: '0x6f40A68E99645C60F14b497E75aE024777d61726',
}, {
  st: 'YT-aUSDC-29DEC2022',
  token: 'USDC',
  market: '0x8315BcBC2c5C1Ef09B71731ab3827b0808A2D6bD',
  staking: '0x6f40A68E99645C60F14b497E75aE024777d61726',
}, {
  st: 'YT-cDAI-30DEC2021',
  token: 'USDC',
  market: '0x944d1727d0b656f497e74044ff589871c330334f',
  staking: '0x5B1C59Eb6872f88a92469751a034B9B5ADA9A73F',
}, {
  st: 'YT-cDAI-29DEC2022',
  token: 'USDC',
  market: '0xB26C86330FC7F97533051F2F8cD0a90C2E82b5EE',
  staking: '0x5B1C59Eb6872f88a92469751a034B9B5ADA9A73F',
}]

const OT_FARMS = [{
  st: 'OT-PE-29DEC2022',
  token: 'PENDLE',
  market: '0xb124c4e18a282143d362a066736fd60d22393ef4',
  staking: '0x309d8Cf8f7C3340b50ff0ef457075A3c5792203f',
}, {
  st: 'OT-ETHUSDC-29DEC2022',
  token: 'USDC',
  market: '0x72972b21ce425cfd67935e07c68e84300ce3f40f',
  staking: '0x529c513DDE7968E19E79e38Ff94D36e4C3c21Eb7',
}, {
  st: 'OT-aUSDC-30DEC2021',
  token: 'USDC',
  market: '0x8B758d7fD0fC58FCA8caA5e53AF2c7Da5F5F8De1',
  staking: '0x07C87cfE096c417212eAB4152d365F0F7dC6FCe4',
}, {
  st: 'OT-aUSDC-29DEC2022',
  token: 'USDC',
  market: '0x0d8a21f2ea15269b7470c347083ee1f85e6a723b',
  staking: '0xFb0e378b3eD6D7F8b73230644D945E28fd7F7b03',
}, {
  st: 'OT-cDAI-30DEC2021',
  token: 'USDC',
  market: '0x2C80D72af9AB0bb9D98F607C817c6F512dd647e6',
  staking: '0x071dc669Be57C1b3053F746Db20cb3Bf54383aeA',
}, {
  st: 'OT-cDAI-29DEC2022',
  token: 'USDC',
  market: '0x4556C4488CC16D5e9552cC1a99a529c1392E4fe9',
  staking: '0xa660c9aAa46b696Df01768E1D2d88CE2d5293778',
}]

const SINGLE_SIDED = {
  staking: '0x07282F2CEEbD7a65451Fcd268b364300D9e6D7f5',
  manager: '0x747fc744837DEDa8D1c568d8e90839e5D4495255',
}

const TOKEN_ADDRESSES = {
  'YT-PE-29DEC2022': '0x49c8aC20dE6409c7e0B8f9867cffD1481D8206c6',
  'YT-ETHUSDC-29DEC2022': '0x311FCB5dB45A3a5876975f8108237F20525Fa7e0',
  'YT-aUSDC-30DEC2021': '0xFfAf22DB1ff7e4983b57Ca9632f796f68EdedeF9',
  'YT-aUSDC-29DEC2022': '0xcDb5b940E95C8632dEcDc806B90dD3fC44E699fE',
  'YT-cDAI-30DEC2021': '0x31654eb46a3a450265c6dfc4fc4fbbfe371e26fe',
  'YT-cDAI-29DEC2022': '0xb7deFe73528942793649c0A950Ec528f66159047',
  'OT-PE-29DEC2022': '0xbF682bd31a615123D28d611b38b0aE3d2b675C2C',
  'OT-ETHUSDC-29DEC2022': '0x322D6c69048330247165231EB7848A5C80a48878',
  'OT-aUSDC-30DEC2021': '0x010a0288af52ed61e32674d82bbc7ddbfa9a1324',
  'OT-aUSDC-29DEC2022': '0x8fcb1783bF4b71A51F702aF0c266729C4592204a',
  'OT-cDAI-30DEC2021': '0xe55e3b62005a2035d48ac0c41a5a9c799f04892c',
  'OT-cDAI-29DEC2022': '0x3D4e7F52efaFb9E0C70179B688FC3965a75BCfEa',
  'USDC': '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  'PENDLE': '0x808507121B80c02388fAd14726482e061B8da827',
}

async function getTokenPrice(symbol) {
  let raw = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + symbol + '&vs_currencies=usd')
  let json = await raw.text()

  return JSON.parse(json)[symbol]['usd']
}

async function print_contained_price(farm, userPoolOwnership, ytPoolBalance, tokenPoolBalance) {
  const yts = userPoolOwnership * ytPoolBalance / 100
  const tokens = userPoolOwnership * tokenPoolBalance / 100
  _print(`Your LP tokens comprise of ${yts.toFixed(4)} ${farm.st} + ${tokens.toFixed(4)} ${farm.token}`)
}

async function loadLiquidityMiningInfo(App, type, farm, rewardTokenPrice, rewardsProxy, wrapper) {
  const WRAPPER = new ethers.Contract(wrapper, PENDLE_POOLS_READ_WRAPPER_ABI, App.provider)
  const mainInfo = await WRAPPER.getLiquidityMiningInfo(farm.market, farm.staking, type)
  const epochInfo = await WRAPPER.getStakingInfo(farm.market, farm.staking, App.YOUR_ADDRESS, type);

  const expiry = mainInfo.expiry
  const marketSymbol = mainInfo.marketSymbol
  const ticker = `[${farm.st}]-[${farm.token}] ${marketSymbol}`
  const epochDuration = epochInfo.epochDuration
  const reserves = mainInfo.reserves
  const ytPoolBalance = reserves[0] / 10**mainInfo.xytDecimals
  const ytWeight = reserves[1]
  const tokenPoolBalance = reserves[2] / 10**mainInfo.tokenDecimals
  const tokenWeight = reserves[3]
  const lpTotalSupply = mainInfo.lpTotalSupply / 1e18

  const tokenPrice = await getTokenPrice(COINGECKO_IDS[mainInfo.tokenSymbol])
  const tvl = (tokenPoolBalance * tokenPrice) / (tokenWeight / 2**40)
  const lpPrice = tvl / lpTotalSupply / 10**(18-mainInfo.tokenDecimals)  
  const ytPrice = (tokenPoolBalance / (tokenWeight / 2**40)) / (ytPoolBalance / (ytWeight / 2**40))
  const lpStaked = mainInfo.totalStakeLP
  const lpStakedPrice = lpStaked * (lpPrice / 10**mainInfo.tokenDecimals)

  const rewardsAllocated = mainInfo.totalRewards
  const rewardsAllocatedUSD = (rewardsAllocated / 1e18) * rewardTokenPrice
  const rewardsPerEpochPerLP = rewardsAllocated / lpStaked
  const apr = (rewardsPerEpochPerLP * rewardTokenPrice / epochDuration * 31536000 / (lpPrice * 10**(18-mainInfo.tokenDecimals))) * 100

  const userStaked = epochInfo.userStaked / 1e18
  const userStakedUSD = userStaked * (lpPrice * 10**(18-mainInfo.tokenDecimals))
  const userPoolOwnership = (userStaked / lpTotalSupply) * 100
  const userAvailableToStake = epochInfo.userAvailableToStake / 1e18

  let liquidityRewards = 0;
  let pendingRewards = 0;
  try {
    liquidityRewards = await WRAPPER.callStatic.claim(rewardsProxy, farm.staking, [expiry], App.YOUR_ADDRESS)

    for (let i = 0; i < liquidityRewards.pendingRewards.length; i++) {
      pendingRewards += parseInt(liquidityRewards.pendingRewards[i])
    }

    liquidityRewards = liquidityRewards.rewards
  } catch {}  
  const userClaimableRewards = liquidityRewards / 1e18
  const userPendingRewards = pendingRewards / 1e18
  const userAllowance = epochInfo.userAllowance / 1e18

  return  {
    farm,
    expiry,
    marketSymbol,
    ticker,
    tvl,
    lpPrice,
    ytPrice,
    tokenPrice,
    tokenPrice,
    lpStaked,
    lpStakedPrice,
    rewardsAllocated,
    rewardsAllocatedUSD,
    apr,
    epochInfo,
    userStaked,
    userStakedUSD,
    userPoolOwnership,
    userAvailableToStake,
    userClaimableRewards,
    userPendingRewards,
    userAllowance,
    ytPoolBalance,
    tokenPoolBalance,
    epochDuration,
  }
}

async function printLiquidityMiningInfo(App, info, type, rewardTokenTicker, rewardTokenPrice, rewardsProxy, wrapper) {
  if (type === 0) {
    _print(
      `<a href='https://app.pendle.finance/trade?t=liquidity' target='_blank'>${info.ticker}</a> ` +
      `<a href='https://app.pendle.finance/trade?t=swap' target='_blank'>[<=>]</a> ` +
      `LP Price: $${formatMoney(info.lpPrice)} TVL: $${formatMoney(info.tvl)}`
    )
  } else {
    _print(
      `<a href='https://app.sushi.com/swap?outputCurrency=${TOKEN_ADDRESSES[info.farm.st]}' target='_blank'>${info.ticker}</a> ` +
      `<a href='https://app.sushi.com/add/${TOKEN_ADDRESSES[info.farm.st]}/${TOKEN_ADDRESSES[info.farm.token]}' target='_blank'>[+]</a> ` +
      `<a href='https://app.sushi.com/remove/${TOKEN_ADDRESSES[info.farm.st]}/${TOKEN_ADDRESSES[info.farm.token]}' target='_blank'>[-]</a> ` +
      `<a href='https://app.sushi.com/swap?outputCurrency=${TOKEN_ADDRESSES[info.farm.st]}' target='_blank'>[<=>]</a> ` +
      `LP Price: $${formatMoney(info.lpPrice)} TVL: $${formatMoney(info.tvl)}`
    )
  }
  
  _print(`${info.farm.st} Price: $${displayPrice(info.ytPrice)}`)
  _print(`${info.farm.token} Price: $${displayPrice(info.tokenPrice)}`)
  _print(`${rewardTokenTicker} Price: $${displayPrice(rewardTokenPrice)}`)
  _print(`${rewardTokenTicker} Per Epoch: ${formatMoney(info.rewardsAllocated / 1e18)} ($${formatMoney(info.rewardsAllocatedUSD)})`)

  const weeklyAPR = info.apr / 365 * 7
  const dailyAPR = weeklyAPR / 7

  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${info.apr.toFixed(2)}%`)
  _print(`Total Staked: ${(info.lpStaked / 1e18).toFixed(18)} ${info.marketSymbol} ($${formatMoney(info.lpStakedPrice)})`)
  _print(
    `You are staking ${info.userStaked.toFixed(18)} ${info.marketSymbol} ` +
      `$${formatMoney(info.userStakedUSD)} (${info.userPoolOwnership.toFixed(2)}% of the pool).`
  )

  if (info.userStaked > 0) {
    print_contained_price(info.farm, info.userPoolOwnership, info.ytPoolBalance, info.tokenPoolBalance)
    const userWeeklyRewards = (info.userPoolOwnership / 100) * (info.rewardsAllocated / 1e18 / info.epochDuration * 604800)
    const userDailyRewards = userWeeklyRewards / 7
    const userYearlyRewards = userWeeklyRewards * 52
    _print(
      `Estimated ${rewardTokenTicker} earnings:` +
        ` Day ${formatMoney(userDailyRewards)} ($${formatMoney(userDailyRewards * rewardTokenPrice)})` +
        ` Week ${formatMoney(userWeeklyRewards)} ($${formatMoney(userWeeklyRewards * rewardTokenPrice)})` +
        ` Year ${formatMoney(userYearlyRewards)} ($${formatMoney(userYearlyRewards * rewardTokenPrice)})`
    )
  }

  _print(
    `Accrued rewards: ${(info.userClaimableRewards + info.userPendingRewards).toFixed(3)} ${rewardTokenTicker} ` +
    `($${formatMoney((info.userClaimableRewards + info.userPendingRewards) * rewardTokenPrice)}) ` +
    `[Claimable: ${info.userClaimableRewards.toFixed(3)} ${rewardTokenTicker} ($${formatMoney(info.userClaimableRewards * rewardTokenPrice)})]`
  )

  const approveAndStake = async function() {
    const signer = App.provider.getSigner()
    const WRAPPER = new ethers.Contract(wrapper, PENDLE_POOLS_READ_WRAPPER_ABI, signer)
    const STAKING = new ethers.Contract(info.farm.staking, PENDLE_LIQUIDITY_MINING_ABI, signer)

    const maxAllowance = ethers.constants.MaxUint256
    const balance = info.epochInfo.userAvailableToStake
    const current = balance / 1e18
    const allowed = info.userAllowance

    let allow = Promise.resolve()

    if (allowed < current) {
      showLoading()

      allow = WRAPPER.tokenApprove(info.farm.market, info.farm.staking, maxAllowance)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }

    if (current > 0) {
      showLoading()

      allow
        .then(async function() {
          STAKING.stake(info.expiry, balance)
            .then(function(t) {
              App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
              })
            })
            .catch(x => {
              hideLoading()
              console.log(x)
              _print('Something went wrong.')
            })
        })
        .catch(x => {
          hideLoading()
          console.log(x)
          _print('Something went wrong.')
        })
    } else {
      alert('You have no tokens to stake!!')
    }
  }

  const withdraw = async function() {
    const signer = App.provider.getSigner()
    const STAKING = new ethers.Contract(info.farm.staking, PENDLE_LIQUIDITY_MINING_ABI, signer)

    const balance = info.epochInfo.userStaked
    if (parseInt(balance) > 0) {
      showLoading()

      STAKING.withdraw(info.expiry, balance)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const claim = async function() {
    const signer = App.provider.getSigner()
    const WRAPPER = new ethers.Contract(wrapper, PENDLE_POOLS_READ_WRAPPER_ABI, signer)
  
    if (info.userClaimableRewards > 0) {
      showLoading()

      WRAPPER.claim(rewardsProxy, info.farm.staking, [info.expiry], App.YOUR_ADDRESS)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const revoke = async function() {
    const signer = App.provider.getSigner()
    const WRAPPER = new ethers.Contract(wrapper, PENDLE_POOLS_READ_WRAPPER_ABI, signer)

    showLoading()

    WRAPPER.tokenApprove(info.farm.market, info.farm.staking, 0)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }

  _print(`<a target="_blank" href="https://etherscan.io/address/${info.farm.staking}#code">Etherscan</a>`)
  _print_link(`Stake ${info.userAvailableToStake.toFixed(18)} ${info.marketSymbol}`, approveAndStake)
  _print_link(`Withdraw ${info.userStaked.toFixed(18)} ${info.marketSymbol}`, withdraw)
  _print_link(
    `Claim ${info.userClaimableRewards.toFixed(3)} ${rewardTokenTicker} ($${formatMoney(info.userClaimableRewards * rewardTokenPrice)})`,
    claim
  )
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print('')
}

async function loadSingleSidedInfo(App, pool, rewardTokenAddress, rewardTokenPrice, wrapper) {
  const WRAPPER = new ethers.Contract(wrapper, PENDLE_POOLS_READ_WRAPPER_ABI, App.provider)
  const stakingInfo = await WRAPPER.getSingleStakingInfo(pool.staking, pool.manager, rewardTokenAddress, App.YOUR_ADDRESS)

  const pendleStaked = stakingInfo.totalSupply / 1e18
  const tvl = pendleStaked * rewardTokenPrice
  const rewardPerBlock = stakingInfo.rewardPerBlock
  const rewardPerBlockUSD = rewardPerBlock / 1e18 * rewardTokenPrice
  const userAvailableToStake = stakingInfo.userAvailableToStake
  const userAllowance = stakingInfo.userAllowance / 1e18
  const userShare = stakingInfo.userShare
  const userShareUSD = userShare / 1e18 * rewardTokenPrice
  const userPoolOwnership = (userShare / 1e18) / pendleStaked * 100

  return {
    pool,
    pendleStaked,
    tvl,
    rewardPerBlock,
    rewardPerBlockUSD,
    userAvailableToStake,
    userShare,
    userShareUSD,
    userPoolOwnership,
  }
}

async function printSingleSidedInfo(App, info, rewardTokenTicker, rewardTokenAddress, rewardTokenPrice, wrapper) {
  _print(
    `<a href='https://app.pendle.finance/farm' target='_blank'>${rewardTokenTicker} SINGLE STAKING POOL</a> TVL: $${formatMoney(info.tvl)}`
  )
  _print(`${rewardTokenTicker} Price: $${displayPrice(rewardTokenPrice)}`)
  _print(`${rewardTokenTicker} Per Block: ${info.rewardPerBlock / 1e18} ($${formatMoney(info.rewardPerBlockUSD)})`)

  const yearlyAPR = ((info.rewardPerBlock / 1e18) * 365 * 86400 / 13.1) / info.pendleStaked * 100 // avg 13.1 seconds block time
  const weeklyAPR = yearlyAPR / 52
  const dailyAPR = yearlyAPR / 365

  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`)
  _print(`Total Staked: ${formatMoney(info.pendleStaked)} ${rewardTokenTicker} ($${formatMoney(info.tvl)})`)
  _print(
    `You are staking ${formatMoney(info.userShare / 1e18)} ${rewardTokenTicker} ` +
      `$${formatMoney(info.userShareUSD)} (${info.userPoolOwnership.toFixed(5)}% of the pool).`
  )

  if (info.userShare > 0) {
    const userYearlyRewards = (info.userPoolOwnership / 100) * ((info.rewardPerBlock / 1e18) * 365 * 86400 / 13.1)
    const userWeeklyRewards = userYearlyRewards / 52
    const userDailyRewards = userYearlyRewards / 365
    _print(
      `Estimated ${rewardTokenTicker} earnings:` +
        ` Day ${formatMoney(userDailyRewards)} ($${formatMoney(userDailyRewards * rewardTokenPrice)})` +
        ` Week ${formatMoney(userWeeklyRewards)} ($${formatMoney(userWeeklyRewards * rewardTokenPrice)})` +
        ` Year ${formatMoney(userYearlyRewards)} ($${formatMoney(userYearlyRewards * rewardTokenPrice)})`
    )
  }

  const approveAndStake = async function() {
    const signer = App.provider.getSigner()
    const WRAPPER = new ethers.Contract(wrapper, PENDLE_POOLS_READ_WRAPPER_ABI, signer)
    const POOL = new ethers.Contract(info.pool.staking, PENDLE_SINGLE_STAKING_ABI, signer)

    const maxAllowance = ethers.constants.MaxUint256
    const current =  info.userAvailableToStake / 1e18
    const allowed = info.allowance

    let allow = Promise.resolve()

    if (allowed < current) {
      showLoading()

      allow = WRAPPER.tokenApprove(rewardTokenAddress, info.pool.staking, maxAllowance)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }

    if (current > 0) {
      showLoading()

      allow
        .then(async function() {
          POOL.enter(info.userAvailableToStake)
            .then(function(t) {
              App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
              })
            })
            .catch(x => {
              hideLoading()
              console.log(x)
              _print('Something went wrong.')
            })
        })
        .catch(x => {
          hideLoading()
          console.log(x)
          _print('Something went wrong.')
        })
    } else {
      alert('You have no tokens to stake!!')
    }
  }

  const unstake = async function() {
    const signer = App.provider.getSigner()
    const POOL = new ethers.Contract(info.pool.staking, PENDLE_SINGLE_STAKING_ABI, signer)

    if (info.userShare > 0) {
      showLoading()

      POOL.leave(info.userShare)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const revoke = async function() {
    const signer = App.provider.getSigner()
    const WRAPPER = new ethers.Contract(wrapper, PENDLE_POOLS_READ_WRAPPER_ABI, signer)

    showLoading()

    WRAPPER.tokenApprove(rewardTokenAddress, info.pool.staking, 0)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }

  _print(`<a target="_blank" href="https://etherscan.io/address/${info.pool.staking}#code">Etherscan</a>`)
  _print_link(`Stake ${formatMoney(info.userAvailableToStake / 1e18)} ${rewardTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${formatMoney(info.userShare / 1e18)} ${rewardTokenTicker}`, unstake)
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print('')
}

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}`)
  _print('Reading smart contracts...\n')

  const rewardTokenTicker = 'PENDLE'
  const rewardTokenAddress = '0x808507121B80c02388fAd14726482e061B8da827'
  const rewardTokenPrice = await getTokenPrice(COINGECKO_IDS[rewardTokenTicker])
  const rewardsProxy = '0x246Bc457768b96003349C367E42021ef47DF1640'
  const wrapper = '0xdf227f1B1a409B4aBc77526fae379F707C8563f7'

  _print('=========================== PENDLE MARKET POOLS ===========================\n')

  _print('*** Note ***')
  _print('- Liquidity Mining contracts can support multiple expiries.')
  _print('- As all PendleMarket LPs are 18 decimals, the LP price shown would be')
  _print('  equivalent to LP / 10^BASE_TOKEN_DECIMALS, or e.g. every')
  _print('  0.000001 LP for the YT-aUSDC-USDC pool as USDC is 6 decimals.')
  _print(`- Accrued ${rewardTokenTicker} rewards linearly vests over 5 epochs.\n`)

  let info
  for (i in YT_FARMS) {
    info = await loadLiquidityMiningInfo(App, 0, YT_FARMS[i], rewardTokenPrice, rewardsProxy, wrapper)
    printLiquidityMiningInfo(App, info, 0, rewardTokenTicker, rewardTokenPrice, rewardsProxy, wrapper)

    _print("")
  }
  for (i in OT_FARMS) {
    info = await loadLiquidityMiningInfo(App, 1, OT_FARMS[i], rewardTokenPrice, rewardsProxy, wrapper)
    printLiquidityMiningInfo(App, info, 1, rewardTokenTicker, rewardTokenPrice, rewardsProxy, wrapper)

    _print("")
  }

  _print('========================== SINGLE SIDED STAKING POOL =========================\n')

  info = await loadSingleSidedInfo(App, SINGLE_SIDED, rewardTokenAddress, rewardTokenPrice, wrapper)
  printSingleSidedInfo(App, info, rewardTokenTicker, rewardTokenAddress, rewardTokenPrice, wrapper)

  // _print('============================= SUSHISWAP POOLS =============================\n')

  hideLoading()
}
