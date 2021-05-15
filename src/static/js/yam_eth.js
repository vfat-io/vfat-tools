$(function() {
    consoleInit(main)
  })

  async function main() {
    print_warning()

    const stakingTokenAddr = '0x0f82e57804d0b1f6fab2370a43dcfad3c7cb239c'
    const stakingTokenTicker = 'SLP'
    const rewardPoolAddr = '0xD67c05523D8ec1c60760Fd017Ef006b9F6e496D0'
    const rewardTokenAddr = YAM_TOKEN_ADDR
    const rewardTokenTicker = 'YAM'
    const masterchefAddr = '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd';

    const App = await init_ethers()

    _print(`Initialized ${App.YOUR_ADDRESS}`)
    _print('Reading smart contracts...\n')
    _print(`${rewardTokenTicker} Address: ${rewardTokenAddr}`)
    _print(`Reward Pool Address: ${rewardPoolAddr}\n`)

    const YAM_INCENTIVIZER = new ethers.Contract(rewardPoolAddr, YAM_INCENTIVIZER_ABI, App.provider)
    const STAKING_TOKEN = new ethers.Contract(stakingTokenAddr, ERC20_ABI, App.provider)

    const WETH_TOKEN = new ethers.Contract(WETH_TOKEN_ADDR, ERC20_ABI, App.provider)
    const YAM_TOKEN = new ethers.Contract(YAM_TOKEN_ADDR, YAM_TOKEN_ABI, App.provider)

    const MASTERCHEF = new ethers.Contract(masterchefAddr, MASTERCHEF_ABI, App.provider)

    const scaling_factor = await YAM_TOKEN.yamsScalingFactor() / 1e18

    const stakedYAmount = (await YAM_INCENTIVIZER.balanceOf(App.YOUR_ADDRESS)) / 1e18
    const earnedYFFI = (await YAM_INCENTIVIZER.earned(App.YOUR_ADDRESS)) * scaling_factor / 1e18
    const totalSupplyOfStakingToken = (await STAKING_TOKEN.totalSupply()) / 1e18
    const pid = await YAM_INCENTIVIZER.pid();
    const totalStakedYAmount = (await MASTERCHEF.userInfo(pid, rewardPoolAddr)).amount / 1e18

    // Find out reward rate
    const weekly_reward = await get_synth_weekly_rewards(YAM_INCENTIVIZER) * scaling_factor
    const nextHalving = await getPeriodFinishForReward(YAM_INCENTIVIZER)

    const rewardPerToken = weekly_reward / totalStakedYAmount

    // Find out underlying assets of Y
    // const YVirtualPrice = await CURVE_Y_POOL.get_virtual_price() / 1e18;
    const unstakedY = (await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)) / 1e18

    const yamAmount = (await YAM_TOKEN.balanceOf(stakingTokenAddr)) / 1e18
    const wETHAmount = (await WETH_TOKEN.balanceOf(stakingTokenAddr)) / 1e18
    const totalUNIV2Amount = (await STAKING_TOKEN.totalSupply()) / 1e18

    _print('Finished reading smart contracts... Looking up prices... \n')

    // Look up prices
    // const prices = await lookUpPrices(["yearn-finance"]);
    // const YFIPrice = prices["yearn-finance"].usd;
    const prices = await lookUpPrices(['yam-2', 'ethereum'])
    const stakingTokenPrice =
      (prices['yam-2'].usd * yamAmount + prices['ethereum'].usd * wETHAmount) / totalUNIV2Amount

    // const rewardTokenPrice = (await YFFI_DAI_BALANCER_POOL.getSpotPrice(LINK_TOKEN_ADDR, rewardTokenAddr) / 1e18) * stakingTokenPrice;
    const rewardTokenPrice = prices['yam-2'].usd

    // Finished. Start printing

    _print('========== PRICES ==========')
    _print(`1 ${rewardTokenTicker}    = $${rewardTokenPrice}`)
    _print(`1 ${stakingTokenTicker}  = $${stakingTokenPrice}\n`)

    _print('========== STAKING =========')
    _print(`There are total   : ${toFixed(totalSupplyOfStakingToken, 8)} ${stakingTokenTicker}.`)
    _print(
      `There are total   : ${toFixed(totalStakedYAmount, 8)} ${stakingTokenTicker} staked in ${rewardTokenTicker}'s ${stakingTokenTicker} staking pool.`
    )
    _print(`                  = ${toDollar(totalStakedYAmount * stakingTokenPrice)}\n`)
    _print(
      `You are staking   : ${toFixed(stakedYAmount, 8)} ${stakingTokenTicker} (${toFixed(
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
    _print(`APR (unstable)    : ${toFixed(YFIWeeklyROI * 52, 4)}% \n`)

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

    hideLoading()
  }
