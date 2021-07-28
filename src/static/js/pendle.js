$(function() {
  consoleInit(main)
});

const PENDLE_LIQUIDITY_MINING_ABI = [{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[{"internalType":"address","name":"newLpHoldingContractAddress","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const PENDLE_SINGLE_STAKING_ABI = [{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"enter","outputs":[{"internalType":"uint256","name":"sharesToMint","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"leave","outputs":[{"internalType":"uint256","name":"rewards","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]

const PENDLE_POOLS_READ_WRAPPER_ABI = [{"inputs":[{"internalType":"contract PendleLiquidityRewardsProxy","name":"_rewardsProxy","type":"address"},{"internalType":"address","name":"_liqMiningContract","type":"address"},{"internalType":"uint256[]","name":"_expiries","type":"uint256[]"},{"internalType":"address","name":"_user","type":"address"}],"name":"claim","outputs":[{"internalType":"uint256","name":"rewards","type":"uint256"},{"internalType":"uint256[]","name":"pendingRewards","type":"uint256[]"},{"internalType":"uint256","name":"currentEpoch","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract PendleMarket","name":"_market","type":"address"},{"internalType":"contract PendleLiquidityMining","name":"_staking","type":"address"}],"name":"getLiquidityMiningInfo","outputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"string","name":"marketSymbol","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"uint256","name":"lpTotalSupply","type":"uint256"},{"internalType":"uint256","name":"totalStakeLP","type":"uint256"},{"internalType":"uint256","name":"latestSettingId","type":"uint256"},{"internalType":"uint256","name":"allocationSettings","type":"uint256"},{"internalType":"uint8","name":"tokenDecimals","type":"uint8"},{"internalType":"uint8","name":"xytDecimals","type":"uint8"},{"components":[{"internalType":"uint256","name":"xytBalance","type":"uint256"},{"internalType":"uint256","name":"xytWeight","type":"uint256"},{"internalType":"uint256","name":"tokenBalance","type":"uint256"},{"internalType":"uint256","name":"tokenWeight","type":"uint256"}],"internalType":"struct PendlePoolsReadWrapper.Reserves","name":"reserves","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract PendleMarket","name":"_market","type":"address"},{"internalType":"contract PendleLiquidityMining","name":"_staking","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"getRewardsPerEpoch","outputs":[{"internalType":"uint256","name":"epochDuration","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"rewardsPerEpoch","type":"uint256"},{"internalType":"uint256","name":"userStaked","type":"uint256"},{"internalType":"uint256","name":"userAvailableToStake","type":"uint256"},{"internalType":"uint256","name":"userAllowance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract PendleSingleStaking","name":"_staking","type":"address"},{"internalType":"contract PendleSingleStakingManager","name":"_manager","type":"address"},{"internalType":"contract IERC20","name":"_pendle","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"getSingleStakingInfo","outputs":[{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"userAvailableToStake","type":"uint256"},{"internalType":"uint256","name":"userAllowance","type":"uint256"},{"internalType":"uint256","name":"userShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract PendleMarket","name":"_market","type":"address"},{"internalType":"address","name":"_staking","type":"address"},{"internalType":"uint256","name":"_allowance","type":"uint256"}],"name":"marketApprove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract PendleSingleStaking","name":"_staking","type":"address"},{"internalType":"uint256","name":"_balance","type":"uint256"}],"name":"singleStakingEnter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract PendleSingleStaking","name":"_staking","type":"address"},{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"singleStakingLeave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract PendleLiquidityMining","name":"_staking","type":"address"},{"internalType":"uint256","name":"_expiry","type":"uint256"},{"internalType":"uint256","name":"_balance","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"address","name":"_staking","type":"address"},{"internalType":"uint256","name":"_allowance","type":"uint256"}],"name":"tokenApprove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract PendleLiquidityMining","name":"_staking","type":"address"},{"internalType":"uint256","name":"_expiry","type":"uint256"},{"internalType":"uint256","name":"_balance","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

COINGECKO_IDS = {
  PENDLE: "pendle",
  USDC: "usd-coin",
}

const FARMS = [{
  yt: "YT-aUSDC-30DEC2021",
  token: "USDC",
  market: "0x9e382E5f78B06631E4109b5d48151f2b3f326df0",
  staking: "0x6f40A68E99645C60F14b497E75aE024777d61726",
}, {
  yt: "YT-aUSDC-29DEC2022",
  token: "USDC",
  market: "0x8315BcBC2c5C1Ef09B71731ab3827b0808A2D6bD",
  staking: "0x6f40A68E99645C60F14b497E75aE024777d61726",
}, {
  yt: "YT-cDAI-30DEC2021",
  token: "USDC",
  market: "0x944d1727d0b656f497e74044ff589871c330334f",
  staking: "0x5B1C59Eb6872f88a92469751a034B9B5ADA9A73F",
}, {
  yt: "YT-cDAI-29DEC2022",
  token: "USDC",
  market: "0xB26C86330FC7F97533051F2F8cD0a90C2E82b5EE",
  staking: "0x5B1C59Eb6872f88a92469751a034B9B5ADA9A73F",
}]

const SINGLE_SIDED = {
  staking: '0x07282F2CEEbD7a65451Fcd268b364300D9e6D7f5',
  manager: '0x747fc744837DEDa8D1c568d8e90839e5D4495255',
}

async function getTokenPrice(symbol) {
  let raw = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + symbol + '&vs_currencies=usd')
  let json = await raw.text()

  return JSON.parse(json)[symbol]['usd']
}

async function print_contained_price(farm, userPoolOwnership, ytPoolBalance, tokenPoolBalance) {
  const yts = userPoolOwnership * ytPoolBalance / 100
  const tokens = userPoolOwnership * tokenPoolBalance / 100
  _print(`Your LP tokens comprise of ${yts.toFixed(4)} ${farm.yt} + ${tokens.toFixed(4)} ${farm.token}`)
}

async function loadLiquidityMiningInfo(App, farm, rewardTokenPrice, wrapper) {
  const WRAPPER = new ethers.Contract(wrapper, PENDLE_POOLS_READ_WRAPPER_ABI, App.provider)
  const mainInfo = await WRAPPER.getLiquidityMiningInfo(farm.market, farm.staking)
  const epochInfo = await WRAPPER.getRewardsPerEpoch(farm.market, farm.staking, App.YOUR_ADDRESS);

  const expiry = mainInfo.expiry
  const marketSymbol = mainInfo.marketSymbol
  const ticker = `[${farm.yt}]-[${farm.token}] ${marketSymbol}`
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

  const rewardsPerEpoch =  epochInfo.rewardsPerEpoch
  const rewardsPerEpochUSD = (rewardsPerEpoch / 1e18) * rewardTokenPrice
  const rewardsAllocated = mainInfo.allocationSettings ? (mainInfo.allocationSettings * rewardsPerEpoch) / 1e9 : 0
  const rewardsPerEpochPerLP = rewardsAllocated / lpStaked
  const apr = (rewardsPerEpochPerLP * rewardTokenPrice / epochDuration * 31536000 / (lpPrice * 10**(18-mainInfo.tokenDecimals))) * 100

  const userStaked = epochInfo.userStaked / 1e18
  const userStakedUSD = userStaked * (lpPrice * 10**(18-mainInfo.tokenDecimals))
  const userPoolOwnership = (userStaked / lpTotalSupply) * 100
  const userAvailableToStake = epochInfo.userAvailableToStake / 1e18

  let liquidityRewards = 0;
  let pendingRewards = 0;
  try {
    liquidityRewards = await REWARDS_PROXY.callStatic.redeemLiquidityRewards(farm.staking, [expiry], App.YOUR_ADDRESS)

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
    rewardsPerEpoch,
    rewardsPerEpochUSD,
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

async function printLiquidityMiningInfo(App, info, rewardTokenTicker, rewardTokenPrice, rewardsProxy, wrapper) {
  _print(
    `<a href='https://app.pendle.finance/trade?t=liquidity' target='_blank'>${info.ticker}</a> <a href='https://app.pendle.finance/trade?t=swap' target='_blank'>[<=>]</a> Price: $${formatMoney(info.lpPrice)} TVL: $${formatMoney(
      info.tvl
    )}`
  )
  _print(`${info.farm.yt} Price: $${displayPrice(info.ytPrice)}`)
  _print(`${info.farm.token} Price: $${displayPrice(info.tokenPrice)}`)
  _print(`${rewardTokenTicker} Price: $${displayPrice(rewardTokenPrice)}`)
  _print(`${rewardTokenTicker} Per Epoch: ${formatMoney(info.rewardsPerEpoch / 1e18)} ($${formatMoney(info.rewardsPerEpochUSD)})`)

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
    const userWeeklyRewards = (info.userPoolOwnership / 100) * (info.rewardsPerEpoch / 1e18 / info.epochDuration * 604800)
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

      allow = WRAPPER.marketApprove(info.farm.market, info.farm.staking, maxAllowance)
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

    WRAPPER.marketApprove(info.farm.market, info.farm.staking, 0)
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
  const wrapper = '0xfD6481F9cC5B44765c3E6A0eE8794d68956b1c7F'

  _print('=========================== PENDLE MARKET POOLS ===========================\n')

  _print('*** Note ***')
  _print('- Liquidity Mining contracts can support multiple expiries.')
  _print('- As all PendleMarket LPs are 18 decimals, the LP price shown would be')
  _print('  equivalent to LP / 10^BASE_TOKEN_DECIMALS, or e.g. every')
  _print('  0.000001 LP for the YT-aUSDC-USDC pool as USDC is 6 decimals.')
  _print(`- Accrued ${rewardTokenTicker} rewards linearly vests over 5 epochs.\n`)

  let info
  for (i in FARMS) {
    info = await loadLiquidityMiningInfo(App, FARMS[i], rewardTokenPrice, wrapper)
    printLiquidityMiningInfo(App, info, rewardTokenTicker, rewardTokenPrice, rewardsProxy, wrapper)

    _print("")
  }

  _print('========================== SINGLE SIDED STAKING POOL =========================\n')

  info = await loadSingleSidedInfo(App, SINGLE_SIDED, rewardTokenAddress, rewardTokenPrice, wrapper)
  printSingleSidedInfo(App, info, rewardTokenTicker, rewardTokenAddress, rewardTokenPrice, wrapper)

  // _print('============================= SUSHISWAP POOLS =============================\n')

  hideLoading()
}
