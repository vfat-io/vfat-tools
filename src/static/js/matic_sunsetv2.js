$(function () {
    consoleInit(main)
  });
  
  const SUNV2_CHEF_ABI = [{"inputs":[{"internalType":"contract SUNSET","name":"_SUNSET","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"address","name":"_devAddress","type":"address"},{"internalType":"address","name":"_feeAddress1","type":"address"},{"internalType":"address","name":"_feeAddress2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"SetDevAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"SetFeeAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"SetVaultAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"SUNSETPerBlock","type":"uint256"}],"name":"UpdateEmissionRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"SUNSETPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SUNSETToken","outputs":[{"internalType":"contract SUNSET","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"_exclude","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_bool","type":"bool"}],"name":"_updateSwapAndLiquifyEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeAddress2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingSUNSET","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"poolExistence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accSUNSETPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devAddress","type":"address"}],"name":"setDevAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress1","type":"address"}],"name":"setFeeAddress1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_SUNSETPerBlock","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"updateStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const UNILP_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
  const TOKEN_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]
  
  async function main() {
    const App = await init_ethers()
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`)
    _print('Reading smart contracts...\n')
  
    const SUNV2_CHEF_ADDR = '0x31A000c3989cEc1a4bdC5fCD39BB7A7A65240056'
    const rewardTokenTicker = 'SUNSET'
    const SUNV2_CHEF = new ethers.Contract(SUNV2_CHEF_ADDR, SUNV2_CHEF_ABI, App.provider)
  
    const startBlock = await SUNV2_CHEF.startBlock();
    const currentBlock = await App.provider.getBlockNumber();

    if (currentBlock < startBlock) {
      _print(`Rewards start at block <a href="https://polygonscan.com/block/countdown/${startBlock}" target="_blank">${startBlock}</a>\n`);
    }
  
    const tokens = {}
    const prices = await getMaticPrices()
  
    await loadCustomMaticChefContract(
      App,
      tokens,
      prices,
      SUNV2_CHEF,
      SUNV2_CHEF_ADDR,
      SUNV2_CHEF_ABI,
      rewardTokenTicker,
      'SUNSETToken',
      'SUNSETPerBlock',
      null,
      'pendingSUNSET'
    )
  
    hideLoading()
  }
  
  async function loadCustomMaticChefContract(
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
    pendingRewardsFunction
  ) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider)
    const poolCount = parseInt(await chefContract.poolLength(), 10)
    const totalAllocPoints = await chefContract.totalAllocPoint()
    _print(`Found ${poolCount} pools.\n`)
  
    var tokens = {}
  
    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]()
    const rewardToken = await getMaticToken(App, rewardTokenAddress, chefAddress)
    const rewardsPerWeek =
      rewardsPerWeekFixed ??
      (((await chefContract.callStatic[rewardsPerBlockFunction]()) / 10 ** rewardToken.decimals) * 604800) / 2.3
  
    const poolInfos = await Promise.all(
      [...Array(poolCount).keys()].map(
        async x => await getMaticPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)
      )
    )
  
    var tokenAddresses = [].concat.apply(
      [],
      poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens)
    )
  
    await Promise.all(
      tokenAddresses.map(async address => {
        tokens[address] = await getMaticToken(App, address, chefAddress)
      })
    )

    const poolPrices = poolInfos.map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, 'matic') : undefined
    )
  
    let aprs = []
    let foundTokenData;
    for (i = 0; i < poolCount; i++) {
      if (i === 11) {
        // WMATIC-UTOPIA -> UTOPIA
        foundTokenData = await getCustomPair(App, "0x636f1543c0aeb5f3669fe2a92457e5e5faae673f", UNILP_ABI, chefAddress);
      } else if (i === 12) {
        // USDC-ELYSM -> ELYSM (DFYN)
        foundTokenData = await getCustomPair(App, "0xd52bf3ac296f9ed1171e48e5ef248fb217fbfcfd", UNILP_ABI, chefAddress);
      } else if (i === 13) {
        // WMATIC-XUSD -> XUSD
        foundTokenData = await getCustomPair(App, "0xc2fec6e52a2e4622eb91e5ae4f23f0ea73c47aa2", UNILP_ABI, chefAddress);
      } else if (i === 15) {
        // WMATIC-SUNSET -> SUNSET
        foundTokenData = await getCustomPair(App, "0xd06ca9f8862c01e24af530829039312905876bb3", UNILP_ABI, chefAddress);
      } else if (i === 16) {
        // WMATIC-RGEM -> RGEM
        foundTokenData = await getCustomPair(App, "0x42b703654fe90df0a92916ddb331b5363da38af3", UNILP_ABI, chefAddress);
      }

      if (poolPrices[i]) {
        const apr = printCustomChefPool(
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
          8,
          null,
          'matic',
          poolInfos[i].depositFee,
          poolInfos[i].withdrawFee,
          foundTokenData
        )
        aprs.push(apr)
        foundTokenData = null
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
        `\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(
          2
        )}%`
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
  
  function printCustomChefPool(
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
    withdrawFee = 0,
    foundTokenData
  ) {
    fixedDecimals = fixedDecimals ?? 2
    const sp = poolInfo.stakedToken == null ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain)
    var poolRewardsPerWeek = (poolInfo.allocPoints / totalAllocPoints) * rewardsPerWeek
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd
    const staked_tvl = !foundTokenData ? sp?.staked_tvl || poolPrices.staked_tvl : foundTokenData[1].staked_tvl
    const token_price = !foundTokenData ? poolPrices.price : foundTokenData[1].price;
    
    _print_inline(`${poolIndex} - `)
    if (foundTokenData) {
      foundTokenData[1].print_price()
    } else {
      poolPrices.print_price(chain)
      sp?.print_price(chain)
    }
    
    const apr = printCustomAPR(
      rewardTokenTicker,
      rewardPrice,
      poolRewardsPerWeek,
      poolPrices.stakeTokenTicker,
      Number(staked_tvl),
      Number(userStaked),
      token_price,
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
  
  function printCustomAPR(
    rewardTokenTicker,
    rewardPrice,
    poolRewardsPerWeek,
    stakeTokenTicker,
    staked_tvl,
    userStaked,
    poolTokenPrice,
    fixedDecimals
  ) {
    var usdPerWeek = poolRewardsPerWeek * rewardPrice
    fixedDecimals = fixedDecimals ?? 2
    _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`)
    // try to estimate yields before emissions/staking starts
    var weeklyAPR = staked_tvl >= 1 ? (usdPerWeek / staked_tvl) * 100 : (usdPerWeek / 1) * 100
    var dailyAPR = weeklyAPR / 7
    var yearlyAPR = weeklyAPR * 52
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`)
    var userStakedUsd = Number(userStaked * poolTokenPrice)
    var userStakedPct = staked_tvl >= 1 ? (userStakedUsd / staked_tvl) * 100 : (userStakedUsd / 1) * 100
    _print(
      `You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(
        userStakedUsd
      )}), ${userStakedPct.toFixed(2)}% of the pool.`
    )
    var userWeeklyRewards = (userStakedPct * poolRewardsPerWeek) / 100
    var userDailyRewards = userWeeklyRewards / 7
    var userYearlyRewards = userWeeklyRewards * 52
    if (userStaked > 0) {
      _print(
        `Estimated ${rewardTokenTicker} earnings:` +
          ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards * rewardPrice)})` +
          ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards * rewardPrice)})` +
          ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards * rewardPrice)})`
      )
    }
    return {
      userStakedUsd,
      totalStakedUsd: staked_tvl,
      userStakedPct,
      yearlyAPR,
      userYearlyUsd: userYearlyRewards * rewardPrice,
    }
  }
  
  function getDexguruTokenlink(address) {
    return `<a href="https://dex.guru/token/${address}-polygon">[%]</a>`
  }
  
  function getTokenTrackerLink(symbol, address) {
    return `<a href="https://polygonscan.com/address/${address}">${symbol}</a>`
  }
  
  async function lookupKnownTokenPrice(address) {
    for (let i = 0; i < maticTokens.length; i++) {
      const token = maticTokens[i];
      const tokenAddr = token.contract;
      const tokenId = token.id;
      if (tokenAddr === address) {
        const price = await lookUpPrices([tokenId]);
        return price ? {
          symbol: token.symbol,
          id: token.id,
          price
        } : 0;
      }
    }
    return 0
  }
  
  async function getCustomPair(App, lpAddress, lpAbi, mcAddress) {
    // takes an LP contract + ABI and returns resolved token data
    // this method will only work for paired tokens VFAT knows about (not dual natives!)
    const lpContract = await new ethers.Contract(lpAddress, lpAbi, App.provider)
    const reserves = await lpContract.getReserves()
    const token0Addr = await lpContract.token0()
    const token1Addr = await lpContract.token1()
  
    const fromWei = token0Addr.toLowerCase() === "0x2791bca1f2de4661ed88a30c99a7a9449aa84174" && 10**12;
    const token01Price = fromWei ? reserves._reserve0 / reserves._reserve1 * fromWei : reserves._reserve0 / reserves._reserve1;
    const token0Lookup = await lookupKnownTokenPrice(token0Addr)
    const token0Price = token0Lookup && token0Lookup.price[token0Lookup.id].usd;
    if (!token0Price) return null
  
    const token1Price = token0Price * token01Price
    const token0Contract = await new ethers.Contract(token0Addr, TOKEN_ABI, App.provider)
    const token1Contract = await new ethers.Contract(token1Addr, TOKEN_ABI, App.provider)
    const token1Name = await token1Contract.name()
    const token1Symbol = await token1Contract.symbol()
    
    const _token0Supply = await token0Contract.totalSupply()
    let token0Supply = fromWei ? ethers.FixedNumber.from(_token0Supply) / fromWei : ethers.FixedNumber.from(_token0Supply);
    const token0MCap = token0Supply * token0Price
    
    const _token1Supply = await token1Contract.totalSupply()
    const token1Supply = ethers.FixedNumber.from(_token1Supply) / 10**18
    const token1MCap = token1Supply * token1Price
  
    const _token1Staked = await token1Contract.balanceOf(mcAddress)
    const token1Staked = ethers.FixedNumber.from(_token1Staked) / 10**18
    const token1TVL = (token1Price * token1Staked).toFixed(12)
  
    return [
      {
        name: await token0Contract.name(),
        symbol: await token0Contract.symbol(),
        price: token0Price,
        supply: token0Supply,
        marketcap: token0MCap,
        contract: token0Contract,
        address: token0Addr,
      },
      {
        name: token1Name,
        symbol: token1Symbol,
        price: token1Price,
        supply: token1Supply,
        marketcap: token1MCap,
        contract: token1Contract,
        address: token1Addr,
        staked: token1Staked,
        staked_tvl: token1TVL,
        print_price() {
          _print(`${getTokenTrackerLink(token1Symbol, token1Addr)} Price: $${displayPrice(token1Price)} Market Cap: $${formatMoney(token1MCap)} ${getDexguruTokenlink(token1Addr)}`);
          _print(`Staked: ${token1Staked.toFixed(4)} ${token1Symbol} ($${formatMoney(token1TVL)})`);
        }
      },
    ]
  }
  