$(function() {
consoleInit(main)
  });

  const CONIC_POOL_ABI = [{"inputs":[{"internalType":"address","name":"_underlying","type":"address"},{"internalType":"address","name":"_controller","type":"address"},{"internalType":"address","name":"locker","type":"address"},{"internalType":"string","name":"_lpTokenName","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address","name":"_cvx","type":"address"},{"internalType":"address","name":"_crv","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"claimedCrv","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimedCvx","type":"uint256"}],"name":"ClaimedRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"curvePool_","type":"address"}],"name":"CurvePoolAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"curvePool_","type":"address"}],"name":"CurvePoolRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newThreshold","type":"uint256"}],"name":"DepegThresholdUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpReceived","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"curvePool_","type":"address"}],"name":"HandledDepeggedCurvePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"curvePool_","type":"address"},{"indexed":false,"internalType":"uint256","name":"pid_","type":"uint256"}],"name":"HandledInvalidConvexPid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMaxDeviation","type":"uint256"}],"name":"MaxDeviationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newRatio","type":"uint256"}],"name":"NewMaxIdleCurveLpRatio","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"curvePool","type":"address"},{"indexed":false,"internalType":"uint256","name":"newWeight","type":"uint256"}],"name":"NewWeight","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Shutdown","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"CNC","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CRV","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CVX","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"addCurvePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"allCurvePools","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cachedTotalUnderlying","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"computeDeviationRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"computeTotalDeviation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"contract IController","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"curvePoolsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depegThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"underlyingAmount","type":"uint256"},{"internalType":"uint256","name":"minLpReceived","type":"uint256"},{"internalType":"bool","name":"stake","type":"bool"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"underlyingAmount","type":"uint256"},{"internalType":"uint256","name":"minLpReceived","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"underlyingAmount","type":"uint256"},{"internalType":"uint256","name":"minLpReceived","type":"uint256"},{"internalType":"bool","name":"stake","type":"bool"}],"name":"depositFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"exchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllocatedUnderlying","outputs":[{"components":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct IConicPool.PoolWithAmount[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getCurvePoolAtIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"getPoolWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalAndPerPoolUnderlying","outputs":[{"internalType":"uint256","name":"totalUnderlying_","type":"uint256"},{"internalType":"uint256","name":"totalAllocated_","type":"uint256"},{"internalType":"uint256[]","name":"perPoolUnderlying_","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"curvePool","type":"address"}],"name":"getWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWeights","outputs":[{"components":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"uint256","name":"weight","type":"uint256"}],"internalType":"struct IConicPool.PoolWeight[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"curvePool_","type":"address"}],"name":"handleDepeggedCurvePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"curvePool_","type":"address"}],"name":"handleInvalidConvexPid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isBalanced","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"isRegisteredCurvePool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isShutdown","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken","outputs":[{"internalType":"contract ILpToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxDeviation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxIdleCurveLpRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rebalancingRewardActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"removeCurvePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardManager","outputs":[{"internalType":"contract IRewardManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxDeviation_","type":"uint256"}],"name":"setMaxDeviation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxIdleCurveLpRatio_","type":"uint256"}],"name":"setMaxIdleCurveLpRatio","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"shutdownPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"curvePool_","type":"address"}],"name":"totalCurveLpBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeviationAfterWeightUpdate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUnderlying","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"underlying","outputs":[{"internalType":"contract IERC20Metadata","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"conicLpAmount","type":"uint256"},{"internalType":"uint256","name":"minUnderlyingReceived","type":"uint256"}],"name":"unstakeAndWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newDepegThreshold_","type":"uint256"}],"name":"updateDepegThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"uint256","name":"weight","type":"uint256"}],"internalType":"struct IConicPool.PoolWeight[]","name":"poolWeights","type":"tuple[]"}],"name":"updateWeights","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdExchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"conicLpAmount","type":"uint256"},{"internalType":"uint256","name":"minUnderlyingReceived","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

  const REWARD_MANAGER_ABI = [{"inputs":[{"internalType":"address","name":"_controller","type":"address"},{"internalType":"address","name":"_pool","type":"address"},{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_underlying","type":"address"},{"internalType":"address","name":"cncLocker","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"claimedCrv","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimedCvx","type":"uint256"}],"name":"ClaimedRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"claimedBy","type":"address"},{"indexed":false,"internalType":"uint256","name":"cncEarned","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"crvEarned","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cvxEarned","type":"uint256"}],"name":"EarningsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"reward","type":"address"}],"name":"ExtraRewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"reward","type":"address"}],"name":"ExtraRewardRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"extraReward","type":"address"},{"indexed":false,"internalType":"address","name":"curvePool","type":"address"}],"name":"ExtraRewardsCurvePoolSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"feePercentage","type":"uint256"}],"name":"FeesEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"feePercentage","type":"uint256"}],"name":"FeesSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"targetTokenReceived","type":"uint256"}],"name":"SoldRewardTokens","type":"event"},{"inputs":[],"name":"CNC","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CNC_ETH_POOL","outputs":[{"internalType":"contract ICurvePoolV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CRV","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CVX","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_FEE_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SLIPPAGE_THRESHOLD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SUSHISWAP","outputs":[{"internalType":"contract UniswapRouter02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"accountCheckpoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_rewards","type":"address[]"}],"name":"addBatchExtraRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"reward","type":"address"}],"name":"addExtraReward","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimPoolEarningsAndSellRewardTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"claimableRewards","outputs":[{"internalType":"uint256","name":"cncRewards","type":"uint256"},{"internalType":"uint256","name":"crvRewards","type":"uint256"},{"internalType":"uint256","name":"cvxRewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"contract IController","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"extraRewardsCurvePool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feePercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"listExtraRewards","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"locker","outputs":[{"internalType":"contract ICNCLockerV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken","outputs":[{"internalType":"contract ILpToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolCheckpoint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"removeExtraReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"extraReward_","type":"address"},{"internalType":"address","name":"curvePool_","type":"address"}],"name":"setExtraRewardsCurvePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_feePercentage","type":"uint256"}],"name":"setFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"underlying","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

  const INFLIATION_MANAGER_ABI = [{"inputs":[{"internalType":"address","name":"_controller","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"PoolWeightsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":true,"internalType":"address","name":"handler","type":"address"}],"name":"RebalancingRewardHandlerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":true,"internalType":"address","name":"handler","type":"address"}],"name":"RebalancingRewardHandlerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pool","type":"address"},{"indexed":false,"internalType":"uint256","name":"cncAmount","type":"uint256"}],"name":"TokensClaimed","type":"event"},{"inputs":[],"name":"CNC","outputs":[{"internalType":"contract ICNCToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"address","name":"rebalancingRewardHandler","type":"address"}],"name":"addPoolRebalancingRewardHandler","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"}],"name":"computePoolWeight","outputs":[{"internalType":"uint256","name":"poolWeight","type":"uint256"},{"internalType":"uint256","name":"totalUSDValue","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"computePoolWeights","outputs":[{"internalType":"address[]","name":"pools","type":"address[]"},{"internalType":"uint256[]","name":"poolWeights","type":"uint256[]"},{"internalType":"uint256","name":"totalUSDValue","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"contract IController","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentInflationRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"currentPoolWeights","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"executeInflationRateUpdate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"}],"name":"getCurrentPoolInflationRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"deviationBefore","type":"uint256"},{"internalType":"uint256","name":"deviationAfter","type":"uint256"}],"name":"handleRebalancingRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"address","name":"handler","type":"address"}],"name":"hasPoolRebalancingRewardHandler","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastInflationRateDecay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"poolAddress","type":"address"}],"name":"rebalancingRewardHandlers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"address","name":"rebalancingRewardHandler","type":"address"}],"name":"removePoolRebalancingRewardHandler","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalLpInflationMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updatePoolWeights","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const pools = ["0x89dc3E9d493512F6CFb923E15369ebFddE591988",
                   "0x80a3604977270B7Ef2e637f9Eb78cE1c3FA64316",
                   "0x3367070ed152e2b715eef48D157685Cf496f3543",
                   "0x40293380F5292Bb13905608b35a936c332f07f94",
                   "0x07b577f10d4e00f3018542d08a87F255a49175A5",
                   "0xAbb735648a076d570AfF2A61D8D141099823EAe9"].map((a) => {
      return {
        address                 : a,
        abi                     : CONIC_POOL_ABI,
        lpTokenFunction         : "lpToken",
        underlyingTokenFunction : "underlying"
      }
    })

    let tokens = {}, prices = {};

    let p = await loadConicPools(App, tokens, prices, pools);
    _print_bold(`Total Staked: $${formatMoney(p.staked_tvl)}`);

    hideLoading();
  }

  async function loadConicPools(App, tokens, prices, pools) {
    let totalStaked  = 0;
    const infos = await Promise.all(pools.map(p =>
      loadConicPoolInfo(App, tokens, prices, p.abi, p.address, p.underlyingTokenFunction, p.lpTokenFunction)));
    for (const i of infos) {
      let p = await printConicPool(App, i);
      totalStaked += p.staked_tvl || 0;
    }
    return { staked_tvl : totalStaked };
  }
  
  async function loadConicPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    underlyingTokenFunction, lpTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

      const stakeTokenAddress = await STAKING_POOL.callStatic[lpTokenFunction]();
  
      const underlyingTokenAddress = await STAKING_POOL.callStatic[underlyingTokenFunction]();

      const infliation_manager_address = "0x05F494E6554fab539873dcF92A4D2F6930105B16";

      const rewardTokenAddresses = [
        "0x9aE380F0272E2162340a5bB646c354271c0F5cFC", //CNC
        "0xD533a949740bb3306d119CC777fa900bA034cd52", //CRV
        "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B"  //CVX
      ]

      let rewardTokens = [], rewardTokenTickers = [], rewardTokenPrices = [];
  
      const stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);
      const underlyingToken = await getToken(App, underlyingTokenAddress, stakingAddress);
      const totalUnderlyingTokens = await STAKING_POOL.totalUnderlying() / 10 ** underlyingToken.decimals;
      const exchangeRate = await STAKING_POOL.exchangeRate() / 1e18;
      const totalLpTokensStaked = totalUnderlyingTokens / exchangeRate;
      stakeToken.staked = totalLpTokensStaked;
  
      let _newPriceAddresses = [...rewardTokenAddresses, underlyingTokenAddress];
      let newPriceAddresses = _newPriceAddresses.filter(a => !getParameterCaseInsensitive(prices, a));
      let newPrices = await lookUpTokenPrices(newPriceAddresses);
      for (const key in newPrices) {
        if (newPrices[key]?.usd)
            prices[key] = newPrices[key];
      }

      let newTokenAddresses = [...rewardTokenAddresses, underlyingTokenAddress].filter(x =>
        !getParameterCaseInsensitive(tokens,x));

      for (const address of newTokenAddresses) {
          tokens[address] = await getToken(App, address, stakingAddress);
      }
  
      const poolPrices = getPoolPrices(tokens, prices, underlyingToken); //did that for the underlying token
  
      const stakeTokenTicker = stakeToken.symbol;
      const underlyingTokenTicker = poolPrices.stakeTokenTicker;
  
      const underlyingTokenPrice = poolPrices.price;
      const stakeTokenPrice = underlyingTokenPrice / exchangeRate;

      const REWARD_MANAGER_ADDR = await STAKING_POOL.rewardManager();

      const REWARD_MANAGER = new ethers.Contract(REWARD_MANAGER_ADDR, REWARD_MANAGER_ABI, App.provider);

      let earnings = await REWARD_MANAGER.claimableRewards(App.YOUR_ADDRESS);

      for(const rewardTokenAddress of rewardTokenAddresses){
        if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
        }

        const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
        rewardTokens.push(rewardToken);

        const rewardTokenTicker = rewardToken.symbol;
        rewardTokenTickers.push(rewardTokenTicker);

        const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
        rewardTokenPrices.push(rewardTokenPrice);

        earnings.map(e => e / 10 ** rewardToken.decimals)
      }
  
      //const staked_tvl = poolPrices.staked_tvl;
      const staked_tvl = totalUnderlyingTokens * underlyingTokenPrice;
      const staked_stake_token_tvl = staked_tvl / exchangeRate;
  
      const userUnstaked = underlyingToken.unstaked;

      const INFLIATION_MANAGER = new ethers.Contract(infliation_manager_address, INFLIATION_MANAGER_ABI, App.provider);
      const infliationRate = await INFLIATION_MANAGER.getCurrentPoolInflationRate(stakingAddress) / 1e18;
      const cncTokenPrice = getParameterCaseInsensitive(prices, "0x9aE380F0272E2162340a5bB646c354271c0F5cFC")?.usd;

      const weeklyRewards = infliationRate * 604800;
      const usdPerWeek = weeklyRewards * cncTokenPrice;
  
      return  {
        stakingAddress,
        poolPrices,
        stakeTokenAddress,
        underlyingTokenAddress,
        rewardTokenAddresses,
        stakeTokenTicker,
        underlyingTokenTicker,
        rewardTokenTickers,
        stakeTokenPrice,
        underlyingTokenPrice,
        rewardTokenPrices,
        staked_tvl,
        userUnstaked,
        earnings,
        totalUnderlyingTokens,
        totalLpTokensStaked,
        staked_stake_token_tvl,
        REWARD_MANAGER_ADDR,
        rewardTokens,
        staked_tvl,
        weeklyRewards,
        usdPerWeek
      }
  }

  async function printConicPool(App, info, chain="eth", customURLs) {
    _print(`Staked: ${info.totalUnderlyingTokens.toFixed(4)} ${info.underlyingTokenTicker} ($${formatMoney(info.staked_tvl)})`);
    _print(`For: ${info.totalLpTokensStaked.toFixed(6)} ${info.stakeTokenTicker} ($${formatMoney(info.staked_stake_token_tvl)})`);
    _print(`${'CNC'} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const claim = async function() {
      return conicContract_claim(info.REWARD_MANAGER_ADDR, App)
    }
    const exit = async function() {
      return rewardsContract_exit(info.stakingAddress, App)
    }
    _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
    //_print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.underlyingTokenTicker}`, approveTENDAndStake)
    let claimLink = ``;
    for(let i = 0; i < info.rewardTokenTickers.length; i++){
      const earned = info.earnings[i] / 10 ** info.rewardTokens[i].decimals;
      claimLink += `${earned.toFixed(6)} ${info.rewardTokenTickers[i]} ($${formatMoney(earned*info.rewardTokenPrices[i])}) `
    }
    _print_link(`Claim ${claimLink}`, claim)
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.staked_tvl
    }
}

const conicContract_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, REWARD_MANAGER_ABI, signer)

  console.log(App.YOUR_ADDRESS)
  showLoading()
  REWARD_POOL.claimEarnings({gasLimit: 250000})
    .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
}