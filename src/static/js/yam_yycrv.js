$(function() {
    consoleInit()
    start(main)
  })
  
  async function main() {
    print_warning()
    
    const stakingTokenAddr = '0xb93cc05334093c6b3b8bfd29933bb8d5c031cabc'
    const stakingTokenTicker = 'UNIV2'
    const rewardPoolAddr = '0x5b0501f7041120d36bc8c6dc3faea0b74b32a0ed'
    const rewardTokenAddr = YAM_TOKEN_ADDR
    const rewardTokenTicker = 'YAM'
  
    const App = await init_ethers()
  
    _print(`Initialized ${App.YOUR_ADDRESS}`)
    _print('Reading smart contracts...\n')
    _print(`${rewardTokenTicker} Address: ${rewardTokenAddr}`)
    _print(`Reward Pool Address: ${rewardPoolAddr}\n`)
  
    const Y_STAKING_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, App.provider)
    const STAKING_TOKEN = new ethers.Contract(stakingTokenAddr, ERC20_ABI, App.provider)
  
    const YYCRV_TOKEN = new ethers.Contract(YYCRV_TOKEN_ADDR, ERC20_ABI, App.provider)
    const YAM_TOKEN = new ethers.Contract(YAM_TOKEN_ADDR, YAM_TOKEN_ABI, App.provider)
  
    const scaling_factor = await YAM_TOKEN.yamsScalingFactor() / 1e18
  
    const stakedYAmount = (await Y_STAKING_POOL.balanceOf(App.YOUR_ADDRESS)) / 1e18
    const earnedYFFI = (await Y_STAKING_POOL.earned(App.YOUR_ADDRESS)) * scaling_factor / 1e18
    const totalSupplyOfStakingToken = (await STAKING_TOKEN.totalSupply()) / 1e18
    const totalStakedYAmount = (await STAKING_TOKEN.balanceOf(rewardPoolAddr)) / 1e18
  
    // Find out reward rate
    const weekly_reward = await get_synth_weekly_rewards(Y_STAKING_POOL) * scaling_factor
    const nextHalving = await getPeriodFinishForReward(Y_STAKING_POOL)
  
    const rewardPerToken = weekly_reward / totalStakedYAmount
  
    // Find out underlying assets of Y
    // const YVirtualPrice = await CURVE_Y_POOL.get_virtual_price() / 1e18;
    const unstakedY = (await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)) / 1e18
  
    const yamAmount = (await YAM_TOKEN.balanceOf(stakingTokenAddr)) / 1e18
    const YYCRVAmount = (await YYCRV_TOKEN.balanceOf(stakingTokenAddr)) / 1e18
    const totalUNIV2Amount = (await STAKING_TOKEN.totalSupply()) / 1e18
  
    _print('Finished reading smart contracts... Looking up prices... \n')
  
    // Look up prices
    // const prices = await lookUpPrices(["yearn-finance"]);
    // const YFIPrice = prices["yearn-finance"].usd;
    const prices = await lookUpPrices(['yam-2', 'yvault-lp-ycurve'])
    const stakingTokenPrice =
      (prices['yam-2'].usd * yamAmount + prices['yvault-lp-ycurve'].usd * YYCRVAmount) / totalUNIV2Amount
  
    // const rewardTokenPrice = (await YFFI_DAI_BALANCER_POOL.getSpotPrice(LINK_TOKEN_ADDR, rewardTokenAddr) / 1e18) * stakingTokenPrice;
    const rewardTokenPrice = prices['yam-2'].usd
  
    // Finished. Start printing
  
    _print('========== PRICES ==========')
    _print(`1 ${rewardTokenTicker}    = $${rewardTokenPrice}`)
    _print(`1 ${stakingTokenTicker}  = $${stakingTokenPrice}\n`)
  
    _print('========== STAKING =========')
    _print(`There are total   : ${totalSupplyOfStakingToken} ${stakingTokenTicker}.`)
    _print(
      `There are total   : ${totalStakedYAmount} ${stakingTokenTicker} staked in ${rewardTokenTicker}'s ${stakingTokenTicker} staking pool.`
    )
    _print(`                  = ${toDollar(totalStakedYAmount * stakingTokenPrice)}\n`)
    _print(
      `You are staking   : ${stakedYAmount} ${stakingTokenTicker} (${toFixed(
        (stakedYAmount * 100) / totalStakedYAmount,
        3
      )}% of the pool)`
    )
    _print(`                  = ${toDollar(stakedYAmount * stakingTokenPrice)}\n`)
  
    // YFII REWARDS
    _print(`======== ${rewardTokenTicker} REWARDS ========`)
    // _print(" (Temporarily paused until further emission model is voted by the community) ");
    _print(
      `Claimable Rewards : ${toFixed(earnedYFFI, 4)} ${rewardTokenTicker} = $${toFixed(earnedYFFI * rewardTokenPrice, 2)}`
    )
    const YFFIWeeklyEstimate = rewardPerToken * stakedYAmount
  
    _print(
      `Hourly estimate   : ${toFixed(YFFIWeeklyEstimate / (24 * 7), 4)} ${rewardTokenTicker} = ${toDollar(
        (YFFIWeeklyEstimate / (24 * 7)) * rewardTokenPrice
      )} (out of total ${toFixed(weekly_reward / (7 * 24), 2)} ${rewardTokenTicker})`
    )
    _print(
      `Daily estimate    : ${toFixed(YFFIWeeklyEstimate / 7, 2)} ${rewardTokenTicker} = ${toDollar(
        (YFFIWeeklyEstimate / 7) * rewardTokenPrice
      )} (out of total ${toFixed(weekly_reward / 7, 2)} ${rewardTokenTicker})`
    )
    _print(
      `Weekly estimate   : ${toFixed(YFFIWeeklyEstimate, 2)} ${rewardTokenTicker} = ${toDollar(
        YFFIWeeklyEstimate * rewardTokenPrice
      )} (out of total ${weekly_reward} ${rewardTokenTicker})`
    )
    const YFIWeeklyROI = (rewardPerToken * rewardTokenPrice * 100) / stakingTokenPrice
  
    _print(`\nHourly ROI in USD : ${toFixed(YFIWeeklyROI / 7 / 24, 4)}%`)
    _print(`Daily ROI in USD  : ${toFixed(YFIWeeklyROI / 7, 4)}%`)
    _print(`Weekly ROI in USD : ${toFixed(YFIWeeklyROI, 4)}%`)
    _print(`APY (unstable)    : ${toFixed(YFIWeeklyROI * 52, 4)}% \n`)
  
    const timeTilHalving = nextHalving - Date.now() / 1000
  
    _print(`Period ending     : in ${forHumans(timeTilHalving)} \n`)
  
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(stakingTokenAddr, rewardPoolAddr, App)
    }
  
    const unstake = async function() {
      return rewardsContract_unstake(rewardPoolAddr, App)
    }
  
    const claim = async function() {
      return rewardsContract_claim(rewardPoolAddr, App)
    }
  
    const exit = async function() {
      return rewardsContract_exit(rewardPoolAddr, App)
    }
  
    _print_link(`Stake ${unstakedY} ${stakingTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${stakedYAmount} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${earnedYFFI} ${rewardTokenTicker}`, claim)
    _print_link(`Exit`, exit)
  
    await _print24HourPrice('build-finance', rewardTokenTicker)
  
    hideLoading()
  }
  