$(function() {
    consoleInit(main)
  })

  const MINI_CHEF_ABI = [{type:"constructor",stateMutability:"nonpayable",inputs:[{type:"address",name:"_reward",internalType:"contract IERC20"}]},{type:"event",name:"Deposit",inputs:[{type:"address",name:"user",internalType:"address",indexed:!0},{type:"uint256",name:"pid",internalType:"uint256",indexed:!0},{type:"uint256",name:"amount",internalType:"uint256",indexed:!1},{type:"address",name:"to",internalType:"address",indexed:!0}],anonymous:!1},{type:"event",name:"EmergencyWithdraw",inputs:[{type:"address",name:"user",internalType:"address",indexed:!0},{type:"uint256",name:"pid",internalType:"uint256",indexed:!0},{type:"uint256",name:"amount",internalType:"uint256",indexed:!1},{type:"address",name:"to",internalType:"address",indexed:!0}],anonymous:!1},{type:"event",name:"Harvest",inputs:[{type:"address",name:"user",internalType:"address",indexed:!0},{type:"uint256",name:"pid",internalType:"uint256",indexed:!0},{type:"uint256",name:"amount",internalType:"uint256",indexed:!1}],anonymous:!1},{type:"event",name:"LogPoolAddition",inputs:[{type:"uint256",name:"pid",internalType:"uint256",indexed:!0},{type:"uint256",name:"allocPoint",internalType:"uint256",indexed:!1},{type:"address",name:"lpToken",internalType:"contract IERC20",indexed:!0},{type:"address",name:"rewarder",internalType:"contract IRewarder",indexed:!0}],anonymous:!1},{type:"event",name:"LogRewardPerSecond",inputs:[{type:"uint256",name:"rewardPerSecond",internalType:"uint256",indexed:!1}],anonymous:!1},{type:"event",name:"LogSetPool",inputs:[{type:"uint256",name:"pid",internalType:"uint256",indexed:!0},{type:"uint256",name:"allocPoint",internalType:"uint256",indexed:!1},{type:"address",name:"rewarder",internalType:"contract IRewarder",indexed:!0},{type:"bool",name:"overwrite",internalType:"bool",indexed:!1}],anonymous:!1},{type:"event",name:"LogUpdatePool",inputs:[{type:"uint256",name:"pid",internalType:"uint256",indexed:!0},{type:"uint256",name:"lastRewardTime",internalType:"uint256",indexed:!1},{type:"uint256",name:"lpSupply",internalType:"uint256",indexed:!1},{type:"uint256",name:"accRewardPerShare",internalType:"uint256",indexed:!1}],anonymous:!1},{type:"event",name:"OwnershipTransferred",inputs:[{type:"address",name:"previousOwner",internalType:"address",indexed:!0},{type:"address",name:"newOwner",internalType:"address",indexed:!0}],anonymous:!1},{type:"event",name:"Withdraw",inputs:[{type:"address",name:"user",internalType:"address",indexed:!0},{type:"uint256",name:"pid",internalType:"uint256",indexed:!0},{type:"uint256",name:"amount",internalType:"uint256",indexed:!1},{type:"address",name:"to",internalType:"address",indexed:!0}],anonymous:!1},{type:"function",stateMutability:"nonpayable",outputs:[],name:"add",inputs:[{type:"uint256",name:"allocPoint",internalType:"uint256"},{type:"address",name:"_lpToken",internalType:"contract IERC20"},{type:"address",name:"_rewarder",internalType:"contract IRewarder"}]},{type:"function",stateMutability:"nonpayable",outputs:[],name:"deposit",inputs:[{type:"uint256",name:"pid",internalType:"uint256"},{type:"uint256",name:"amount",internalType:"uint256"},{type:"address",name:"to",internalType:"address"}]},{type:"function",stateMutability:"nonpayable",outputs:[],name:"emergencyWithdraw",inputs:[{type:"uint256",name:"pid",internalType:"uint256"},{type:"address",name:"to",internalType:"address"}]},{type:"function",stateMutability:"nonpayable",outputs:[],name:"harvest",inputs:[{type:"uint256",name:"pid",internalType:"uint256"},{type:"address",name:"to",internalType:"address"}]},{type:"function",stateMutability:"nonpayable",outputs:[],name:"harvestAllRewards",inputs:[{type:"address",name:"to",internalType:"address"}]},{type:"function",stateMutability:"view",outputs:[{type:"address",name:"",internalType:"contract IERC20"}],name:"lpToken",inputs:[{type:"uint256",name:"",internalType:"uint256"}]},{type:"function",stateMutability:"nonpayable",outputs:[],name:"massUpdatePools",inputs:[{type:"uint256[]",name:"pids",internalType:"uint256[]"}]},{type:"function",stateMutability:"view",outputs:[{type:"address",name:"",internalType:"address"}],name:"owner",inputs:[]},{type:"function",stateMutability:"view",outputs:[{type:"uint256",name:"pending",internalType:"uint256"}],name:"pendingReward",inputs:[{type:"uint256",name:"_pid",internalType:"uint256"},{type:"address",name:"_user",internalType:"address"}]},{type:"function",stateMutability:"view",outputs:[{type:"uint256",name:"accRewardPerShare",internalType:"uint256"},{type:"uint256",name:"lastRewardTime",internalType:"uint256"},{type:"uint256",name:"allocPoint",internalType:"uint256"}],name:"poolInfo",inputs:[{type:"uint256",name:"",internalType:"uint256"}]},{type:"function",stateMutability:"view",outputs:[{type:"uint256",name:"pools",internalType:"uint256"}],name:"poolLength",inputs:[]},{type:"function",stateMutability:"nonpayable",outputs:[],name:"renounceOwnership",inputs:[]},{type:"function",stateMutability:"view",outputs:[{type:"address",name:"",internalType:"contract IERC20"}],name:"reward",inputs:[]},{type:"function",stateMutability:"view",outputs:[{type:"uint256",name:"",internalType:"uint256"}],name:"rewardPerSecond",inputs:[]},{type:"function",stateMutability:"view",outputs:[{type:"address",name:"",internalType:"contract IRewarder"}],name:"rewarder",inputs:[{type:"uint256",name:"",internalType:"uint256"}]},{type:"function",stateMutability:"nonpayable",outputs:[],name:"set",inputs:[{type:"uint256",name:"_pid",internalType:"uint256"},{type:"uint256",name:"_allocPoint",internalType:"uint256"},{type:"address",name:"_rewarder",internalType:"contract IRewarder"},{type:"bool",name:"overwrite",internalType:"bool"}]},{type:"function",stateMutability:"nonpayable",outputs:[],name:"setRewardPerSecond",inputs:[{type:"uint256",name:"_rewardPerSecond",internalType:"uint256"}]},{type:"function",stateMutability:"view",outputs:[{type:"uint256",name:"",internalType:"uint256"}],name:"totalAllocPoint",inputs:[]},{type:"function",stateMutability:"nonpayable",outputs:[],name:"transferOwnership",inputs:[{type:"address",name:"newOwner",internalType:"address"}]},{type:"function",stateMutability:"nonpayable",outputs:[{type:"tuple",name:"pool",internalType:"struct OneSwapChef.PoolInfo",components:[{type:"uint256",name:"accRewardPerShare",internalType:"uint256"},{type:"uint256",name:"lastRewardTime",internalType:"uint256"},{type:"uint256",name:"allocPoint",internalType:"uint256"}]}],name:"updatePool",inputs:[{type:"uint256",name:"pid",internalType:"uint256"}]},{type:"function",stateMutability:"view",outputs:[{type:"uint256",name:"amount",internalType:"uint256"},{type:"int256",name:"rewardDebt",internalType:"int256"}],name:"userInfo",inputs:[{type:"uint256",name:"",internalType:"uint256"},{type:"address",name:"",internalType:"address"}]},{type:"function",stateMutability:"nonpayable",outputs:[],name:"withdraw",inputs:[{type:"uint256",name:"pid",internalType:"uint256"},{type:"uint256",name:"amount",internalType:"uint256"},{type:"address",name:"to",internalType:"address"}]},{type:"function",stateMutability:"nonpayable",outputs:[],name:"withdrawAndHarvest",inputs:[{type:"uint256",name:"pid",internalType:"uint256"},{type:"uint256",name:"amount",internalType:"uint256"},{type:"address",name:"to",internalType:"address"}]}];

  async function main() {
    const App = await init_ethers()

    _print(`Initialized ${App.YOUR_ADDRESS}\n`)
    _print('Reading smart contracts...\n')

    const MINI_CHEF_ADDR = '0x7aeE1FF33E1b7F6D874D488fb2533a79419ca240'
    const REWARD_TOKEN_SYMBOL = 'FSM'
    const REWARD_TOKEN_ADDRESS = '0xaa621D2002b5a6275EF62d7a065A865167914801'
    const MINI_CHEF = new ethers.Contract(MINI_CHEF_ADDR, MINI_CHEF_ABI, App.provider)

    let rewardsPerWeek = ((await MINI_CHEF.rewardPerSecond()) / 1e18) * 604800

    const tokens = {}
    const prices = await getFantomPrices()

    const customURLs =
    {
      add: "https://spookyswap.finance/add",
      remove: "https://spookyswap.finance/pool",
      swap: "https://spookyswap.finance/swap",
      info: "https://info.spookyswap.finance/"
    }

    const chefStakeFunction = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
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
            CHEF_CONTRACT.deposit(poolIndex, currentTokens, App.YOUR_ADDRESS, {gasLimit: 500000})
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

    const chefUnstakeFunction = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
      const signer = App.provider.getSigner()
      const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

      const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
      const earnedTokenAmount =
        (await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS)) / 1e18

      if (earnedTokenAmount > 0) {
        showLoading()
        CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, App.YOUR_ADDRESS, {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
      }
    }

    const chefClaimFunction = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction, claimFunction) {
      const signer = App.provider.getSigner()

      const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

      const earnedTokenAmount =
        (await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS)) / 1e18

      if (earnedTokenAmount > 0) {
        showLoading()
        CHEF_CONTRACT.harvest(poolIndex, App.YOUR_ADDRESS, {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
      }
    }

    function printChefContractLinks(
      App,
      chefAbi,
      chefAddr,
      poolIndex,
      poolAddress,
      pendingRewardsFunction,
      rewardTokenTicker,
      stakeTokenTicker,
      unstaked,
      userStaked,
      pendingRewardTokens,
      fixedDecimals,
      claimFunction,
      rewardTokenPrice,
      chain,
      depositFee,
      withdrawFee
    ) {
      fixedDecimals = fixedDecimals ?? 2

      const approveAndStake = async function() {
        return chefStakeFunction(chefAbi, chefAddr, poolIndex, poolAddress, App)
      }
      const unstake = async function() {
        return chefUnstakeFunction(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
      }
      const claim = async function() {
        return chefClaimFunction(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
      }
      if (depositFee > 0) {
        _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
      } else {
        _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
      }
      if (withdrawFee > 0) {
        _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
      } else {
        _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
      }
      _print_link(
        `Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(
          pendingRewardTokens * rewardTokenPrice
        )})`,
        claim
      )
      _print(`Staking or unstaking also claims rewards.`)
      _print(`Rewards will be vesting for 8 weeks | <a href="https://fantasm.finance/staking" target="_blank">Claim with penalty now</a`)
      _print('')
    }

    function printChefPool(
      App,
      chefAbi,
      chefAddr,
      prices,
      tokens,
      poolInfo,
      poolIndex,
      poolPrices,
      totalAllocPoints,
      rewardsPerWeek,
      rewardTokenTicker,
      rewardTokenAddress,
      pendingRewardsFunction,
      fixedDecimals,
      claimFunction,
      chain = 'eth',
      depositFee = 0,
      withdrawFee = 0
    ) {
      fixedDecimals = fixedDecimals ?? 2
      const sp = poolInfo.stakedToken == null ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain)
      var poolRewardsPerWeek = (poolInfo.allocPoints / totalAllocPoints) * rewardsPerWeek
      if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return
      const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked
      const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd
      const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl
      _print_inline(`${poolIndex} - `)
      poolPrices.print_price(chain, 18, customURLs)
      sp?.print_price(chain)
      const apr = printAPR(
        rewardTokenTicker,
        rewardPrice,
        poolRewardsPerWeek,
        poolPrices.stakeTokenTicker,
        staked_tvl,
        userStaked,
        poolPrices.price,
        fixedDecimals
      )
      if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked)
      if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked)
      printChefContractLinks(
        App,
        chefAbi,
        chefAddr,
        poolIndex,
        poolInfo.address,
        pendingRewardsFunction,
        rewardTokenTicker,
        poolPrices.stakeTokenTicker,
        poolInfo.poolToken.unstaked,
        poolInfo.userStaked,
        poolInfo.pendingRewardTokens,
        fixedDecimals,
        claimFunction,
        rewardPrice,
        chain,
        depositFee,
        withdrawFee
      )
      return apr
    }

    async function getPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
      const poolInfo = await chefContract.poolInfo(poolIndex)
      const lpToken = await chefContract.lpToken(poolIndex)
      if (poolInfo.allocPoint == 0) {
        return {
          address: lpToken,
          allocPoints: poolInfo.allocPoint ?? 1,
          poolToken: null,
          userStaked: 0,
          pendingRewardTokens: 0,
        }
      }
      const poolToken = await getFantomToken(app, lpToken ?? poolInfo.token ?? poolInfo.stakingToken, chefAddress)
      const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS)
      const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS)
      const staked = userInfo.amount / 10 ** poolToken.decimals
      return {
        address: lpToken ?? poolInfo.token ?? poolInfo.stakingToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked: staked,
        pendingRewardTokens: pendingRewardTokens / 10 ** 18,
        depositFee: (poolInfo.depositFeeBP ?? 0) / 100,
        withdrawFee: (poolInfo.withdrawFeeBP ?? 0) / 100,
      }
    }

    async function loadChefContract(
      App,
      tokens,
      prices,
      chef,
      chefAddress,
      chefAbi,
      rewardTokenTicker,
      rewardTokenAddress,
      rewardsPerBlockFunction,
      rewardsPerWeekFixed,
      pendingRewardsFunction,
      deathPoolIndices,
      claimFunction
    ) {
      const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider)

      const poolCount = parseInt(await chefContract.poolLength(), 10)
      const totalAllocPoints = await chefContract.totalAllocPoint()

      _print(
        `<a href='https://ftmscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`
      )
      _print(`Found ${poolCount} pools.\n`)

      _print(`Showing incentivized pools only.\n`)

      const rewardToken = await getFantomToken(App, rewardTokenAddress, chefAddress)
      const rewardsPerWeek =
        rewardsPerWeekFixed ??
        (((await chefContract.callStatic[rewardsPerBlockFunction]()) / 10 ** rewardToken.decimals) * 604800) / 3

      const poolInfos = await Promise.all(
        [...Array(poolCount).keys()].map(
          async x => await getPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)
        )
      )

      var tokenAddresses = [].concat.apply(
        [],
        poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens)
      )

      await Promise.all(
        tokenAddresses.map(async address => {
          tokens[address] = await getFantomToken(App, address, chefAddress)
        })
      )

      if (deathPoolIndices) {
        //load prices for the deathpool assets
        deathPoolIndices
          .map(i => poolInfos[i])
          .map(poolInfo =>
            poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'fantom') : undefined
          )
      }

      const poolPrices = poolInfos.map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'fantom') : undefined
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
            claimFunction,
            'fantom',
            poolInfos[i].depositFee,
            poolInfos[i].withdrawFee
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
      return {prices, totalUserStaked, totalStaked, averageApr}
    }

    await loadChefContract(
      App,
      tokens,
      prices,
      MINI_CHEF,
      MINI_CHEF_ADDR,
      MINI_CHEF_ABI,
      REWARD_TOKEN_SYMBOL,
      REWARD_TOKEN_ADDRESS,
      null,
      rewardsPerWeek,
      'pendingReward',
      null
    )

    hideLoading()
  }
