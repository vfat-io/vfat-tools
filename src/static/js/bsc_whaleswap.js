
$(function() {
  consoleInit(main)
    });

  const VAULT_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"contract IERC20","name":"_receiptToken","type":"address"},{"internalType":"contract IMasterChef","name":"_masterchef","type":"address"},{"internalType":"address","name":"_admin","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastDepositedTime","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"performanceFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"callFee","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"MAX_CALL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PERFORMANCE_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_WITHDRAW_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_WITHDRAW_FEE_PERIOD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"calculateHarvestPodRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"calculateTotalPendingPodRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"callFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"inCaseTokensGetStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastHarvestedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterchef","outputs":[{"internalType":"contract IMasterChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"performanceFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"receiptToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_callFee","type":"uint256"}],"name":"setCallFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_performanceFee","type":"uint256"}],"name":"setPerformanceFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawFee","type":"uint256"}],"name":"setWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawFeePeriod","type":"uint256"}],"name":"setWithdrawFeePeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"lastDepositedTime","type":"uint256"},{"internalType":"uint256","name":"podAtLastUserAction","type":"uint256"},{"internalType":"uint256","name":"lastUserActionTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawFeePeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
  const POD_MASTER_ABI = [{"inputs":[{"internalType":"contract IMasterChef","name":"_MASTER_CHEF","type":"address"},{"internalType":"contract IBEP20","name":"_CAKE","type":"address"},{"internalType":"uint256","name":"_MASTER_PID","type":"uint256"},{"internalType":"address","name":"_burnAdmin","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"indexed":false,"internalType":"bool","name":"isRegular","type":"bool"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[],"name":"Init","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"SetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"boostContract","type":"address"}],"name":"UpdateBoostContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"oldMultiplier","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newMultiplier","type":"uint256"}],"name":"UpdateBoostMultiplier","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldAdmin","type":"address"},{"indexed":true,"internalType":"address","name":"newAdmin","type":"address"}],"name":"UpdateBurnAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"burnRate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"regularFarmRate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"specialFarmRate","type":"uint256"}],"name":"UpdatePodRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accPodPerShare","type":"uint256"}],"name":"UpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"isValid","type":"bool"}],"name":"UpdateWhiteList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"ACC_CAKE_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BOOST_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CAKE","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CAKE_RATE_TOTAL_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MASTERCHEF_CAKE_PER_BLOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MASTER_CHEF","outputs":[{"internalType":"contract IMasterChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MASTER_PID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_BOOST_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_isRegular","type":"bool"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"boostContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"burnPod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_isRegular","type":"bool"}],"name":"podPerBlock","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"podPerBlockToBurn","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"podRateToBurn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"podRateToRegularFarm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"podRateToSpecialFarm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getBoostMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestFromMasterChef","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IBEP20","name":"dummyToken","type":"address"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastBurnedBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingPod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"accPodPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"totalBoostedShare","type":"uint256"},{"internalType":"bool","name":"isRegular","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"pools","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalRegularAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSpecialAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newBoostContract","type":"address"}],"name":"updateBoostContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_newMultiplier","type":"uint256"}],"name":"updateBoostMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAdmin","type":"address"}],"name":"updateBurnAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_burnRate","type":"uint256"},{"internalType":"uint256","name":"_regularFarmRate","type":"uint256"},{"internalType":"uint256","name":"_specialFarmRate","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"updatePodRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[{"components":[{"internalType":"uint256","name":"accPodPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"totalBoostedShare","type":"uint256"},{"internalType":"bool","name":"isRegular","type":"bool"}],"internalType":"struct MasterChefV2.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"bool","name":"_isValid","type":"bool"}],"name":"updateWhiteList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"boostMultiplier","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whiteList","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  const Addresses = [
    "0xdc8715aCFB63cd0BD01a2C3e7De514845FdbcDF7" // POD Pool
  ]

  async function main() {
      const App = await init_ethers();

      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");

     const POD_MASTER_ADDR = "0xdEe627eaaB378ec57ECfB94b389B718ef3687c0D";
     const rewardTokenTicker = "POD";
     const POD_MASTER = new ethers.Contract(POD_MASTER_ADDR, POD_MASTER_ABI, App.provider);

      const tokens = {};
      const prices = await getBscPrices();

      await loadBscChefContract(App, tokens, prices, POD_MASTER, POD_MASTER_ADDR, POD_MASTER_ABI, rewardTokenTicker,
          "POD", "pendingPod");

      _print("")
      _print("Loading whaleswap vaults\n")
      _print("Please check the site for withdrawal fees\n")

      const poolInfos = await Promise.all(Addresses.map(a => loadPoolInfo(App, tokens, prices, a)));
      let tvl = 0, userTvl = 0
      for(const p of poolInfos.filter(p => p))
      {
        printContract(p);
        if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
        if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
      }
      _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
      if (userTvl > 0) {
        _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
      }

      hideLoading();
    }

  async function loadBscChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, pendingRewardsFunction, deathPoolIndices) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolLength(), 10);

    _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getBscPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getBscToken(App, address, chefAddress);
    }));

    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
                       .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);


    _print("Finished reading smart contracts.\n");

    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          poolInfos[i].totalAllocPoints, poolInfos[i].rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, null, "bsc", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
        aprs.push(apr);
      }
    }
    let totalUserStaked=0, totalStaked=0, averageApr=0;
    for (const a of aprs) {
      if (!isNaN(a.totalStakedUsd)) {
        totalStaked += a.totalStakedUsd;
      }
      if (a.userStakedUsd > 0) {
        totalUserStaked += a.userStakedUsd;
        averageApr += a.userStakedUsd * a.yearlyAPR / 100;
      }
    }
    averageApr = averageApr / totalUserStaked;
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    if (totalUserStaked > 0) {
      _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
      _print(`Estimated earnings:`
          + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
          + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
          + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
    }
    return { prices, totalUserStaked, totalStaked, averageApr }
  }

  async function getBscPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    const lpToken = await chefContract.lpToken(poolIndex)
    if (poolInfo.allocPoint == 0 || poolIndex == 105) {
      return {
        address: lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
        stakedToken : null,
        userLPStaked : 0,
        lastRewardBlock : poolInfo.lastRewardBlock
      };
    }
    const poolToken = await getBscToken(App, lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    const isRegular = poolInfo.isRegular;
    const rewardsPerWeekNew = await chefContract.podPerBlock(isRegular) /1e18 * 604800 / 3;
    let totalAllocPoints;
    if(isRegular){
      totalAllocPoints = await chefContract.totalRegularAllocPoint();
    }else{
      totalAllocPoints = await chefContract.totalSpecialAllocPoint();
    }
    return {
        address: lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
        withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100,
        rewardsPerWeek : rewardsPerWeekNew,
        totalAllocPoints : totalAllocPoints
    };
  }

  async function loadPoolInfo(App, tokens, prices, contractAddress) {
        try {
          const contract = await new ethers.Contract(contractAddress, VAULT_ABI, App.provider);
          const tokenAddress = await contract.token();
          const token = await getBscToken(App, tokenAddress, App.YOUR_ADDRESS);
          var newTokenAddresses = token.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
          for (const address of newTokenAddresses) {
              tokens[address] = await getBscToken(App, address, contractAddress);
          }
          token.staked = await contract.balanceOf() / 10 ** token.decimals;
          const ppfs = await contract.getPricePerFullShare() / 1e18;
          const _userStaked = await contract.userInfo(App.YOUR_ADDRESS);
          const userStaked = _userStaked.shares / 10 ** token.decimals;
          const poolPrices = getPoolPrices(tokens, prices, token, "bsc");
          return { token, poolPrices, userStaked, ppfs, contractAddress }
        }
        catch (err) {
          console.log(contractAddress, err);
          return null;
        }
    }

  async function printContract(poolInfo) {
        const poolPrices = poolInfo.poolPrices;
        poolPrices.print_price();
        var userStakedUsd = poolInfo.userStaked * poolPrices.price;
        var userStakedPct = userStakedUsd / poolPrices.tvl * 100;
        _print(`You are staking ${poolInfo.userStaked.toFixed(4)} ${poolInfo.token.name} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
        if (poolInfo.userStaked > 0) {
          _print(`Your stake comprises of ${poolInfo.userStaked * poolInfo.ppfs} ${poolInfo.token.symbol}.`)
        }
        const deposit = async function() {
          return vaultDeposit(App, poolInfo.token, poolInfo.contractAddress)
        }
        const withdraw = async function() {
          return vaultWithdraw(App, poolInfo.contractAddress)
        }
        _print_link(`Deposit ${poolInfo.token.unstaked.toFixed(6)} ${poolInfo.token.symbol}`, deposit);
        _print_link(`Withdraw ${poolInfo.userStaked.toFixed(6)} ${poolInfo.token.symbol}`, withdraw)
        _print("");
    }

  async function vaultDeposit(App, token, stakingAddress){
    const signer = await App.provider.getSigner();

    const STAKING_TOKEN = new ethers.Contract(token.address, ERC20_ABI, signer)
    const VAULT_CONTRACT = new ethers.Contract(stakingAddress, VAULT_ABI, signer)

    const balanceToStake = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, vaultToken.token.address)

    const decimals = await STAKING_TOKEN.decimals();
    let allow = Promise.resolve()

    if (allowedTokens / 10 ** decimals < balanceToStake / 10 ** decimals) {
      showLoading()
      allow = STAKING_TOKEN.approve(vaultToken.token.address, ethers.constants.MaxUint256)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }

    if (balanceToStake / 10 ** decimals > 0) {
      showLoading()
      allow
        .then(async function() {
          VAULT_CONTRACT["deposit(uint256)"](balanceToStake, {gasLimit: 500000})
            .then(function(t) {
              App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
              })
            })
            .catch(function() {
              hideLoading()
              _print('Something went wrong.\n')
            })
        })
        .catch(function(ex) {
          hideLoading()
          _print('Something went wrong.')
          _print(ex)
        })
    } else {
      alert('You have no tokens to stake!!')
    }
  }

  async function vaultWithdraw(App, stakingAddress){
    const signer = App.provider.getSigner()
    const VAULT_CONTRACT = new ethers.Contract(stakingAddress, VAULT_ABI, signer)

    const currentStakedAmount = await VAULT_CONTRACT.userInfo(App.YOUR_ADDRESS).shares

    if (currentStakedAmount / 1e18 > 0) {
      showLoading()
      VAULT_CONTRACT["withdraw(uint256)"](currentStakedAmount, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
