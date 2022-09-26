$(function () {		
    consoleInit(main)		
    });		
  
    const MILK_CHEF_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_milk","internalType":"address"},{"type":"uint256","name":"_poolStartTime","internalType":"uint256"}]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"TOTAL_REWARDS","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_token","internalType":"contract IERC20"},{"type":"bool","name":"_withUpdate","internalType":"bool"},{"type":"uint256","name":"_lastRewardTime","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getGeneratedReward","inputs":[{"type":"uint256","name":"_fromTime","internalType":"uint256"},{"type":"uint256","name":"_toTime","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"governanceRecoverUnsupported","inputs":[{"type":"address","name":"_token","internalType":"contract IERC20"},{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"milk","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"milkPerSecond","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"operator","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingShare","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolEndTime","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"token","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardTime","internalType":"uint256"},{"type":"uint256","name":"accMilkPerShare","internalType":"uint256"},{"type":"bool","name":"isStarted","internalType":"bool"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolStartTime","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"runningTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setOperator","inputs":[{"type":"address","name":"_operator","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]
    const COWAII_STAKING_ABI = [{"type":"event","name":"Initialized","inputs":[{"type":"address","name":"executor","internalType":"address","indexed":true},{"type":"uint256","name":"at","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardAdded","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"allocateSeigniorage","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"time","internalType":"uint256"},{"type":"uint256","name":"rewardReceived","internalType":"uint256"},{"type":"uint256","name":"rewardPerShare","internalType":"uint256"}],"name":"boardroomHistory","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"canClaimReward","inputs":[{"type":"address","name":"member","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"canWithdraw","inputs":[{"type":"address","name":"member","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"cowaii","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"member","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"epoch","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCowaiiPrice","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getLastSnapshotIndexOf","inputs":[{"type":"address","name":"member","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"governanceRecoverUnsupported","inputs":[{"type":"address","name":"_token","internalType":"contract IERC20"},{"type":"uint256","name":"_amount","internalType":"uint256"},{"type":"address","name":"_to","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address","name":"_cowaii","internalType":"contract IERC20"},{"type":"address","name":"_share","internalType":"contract IERC20"},{"type":"address","name":"_treasury","internalType":"contract ITreasury"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"initialized","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"latestSnapshotIndex","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"lastSnapshotIndex","internalType":"uint256"},{"type":"uint256","name":"rewardEarned","internalType":"uint256"},{"type":"uint256","name":"epochTimerStart","internalType":"uint256"}],"name":"members","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nextEpochPoint","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"operator","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardLockupEpochs","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerShare","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setLockUp","inputs":[{"type":"uint256","name":"_withdrawLockupEpochs","internalType":"uint256"},{"type":"uint256","name":"_rewardLockupEpochs","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setOperator","inputs":[{"type":"address","name":"_operator","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"share","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ITreasury"}],"name":"treasury","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"withdrawLockupEpochs","inputs":[]}]

    async function main() {		
        const App = await init_ethers();		
        
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts...\n");
  
        const StakingPool = {
          address : "0x0eD8cFA5Bd631263CFAb290E12e2559af1252Ed6",
          abi : COWAII_STAKING_ABI,
          stakeTokenFunction : "share",
          rewardTokenAddresses : "cowaii"
        }
        
        const MILK_CHEF_ADDR = "0xb015d1D4F846D44A699F5648071496D1eC99C4C5";
        const rewardTokenTicker = "MILK";
        const MILK_CHEF = new ethers.Contract(MILK_CHEF_ADDR, MILK_CHEF_ABI, App.provider);
  
        const rewardsPerWeek = await MILK_CHEF.milkPerSecond() / 1e18 * 604800;
            
        const tokens = {};
        const prices = await getDogePrices();
        
        await loadDogeMILKContract(App, tokens, prices, MILK_CHEF, MILK_CHEF_ADDR, MILK_CHEF_ABI, rewardTokenTicker,		
            "milk", null, rewardsPerWeek, "pendingShare");
        _print("");
        _print("The dairy does not print Cowaii when below 1.01 TWAP, staking here below 1.01 TWAP will not generate rewards.")
        _print("Staked MILK can only be withdrawn every 4 epochs (24hrs) & rewards claimed every 2 epochs (12hrs). Staking or claiming resets this timer.\n")
        const p0 = await loadDogeCOWAIISynthetixPool(App, tokens, prices, StakingPool.abi, 
                                                                          StakingPool.address, 
                                                                          StakingPool.rewardTokenAddresses, 
                                                                          StakingPool.stakeTokenFunction);
        _print_bold(`Total staked: $${formatMoney(p0.staked_tvl)}`);
        if (p0.totalUserStaked > 0) {
          _print(`You are staking a total of $${formatMoney(p0.totalUserStaked)}\n`);
        }
        
        hideLoading();		
    }
  
  async function loadDogeCOWAIISynthetixPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
    const info = await loadDogeCOWAIISynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
    if (!info) return null;
    return await printCOWAIISynthetixPool(App, info, "doge");
  }
  
  async function loadDogeCOWAIISynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();
  
    var stakeToken = await getGeneralToken(App, stakeTokenAddress, stakingAddress);
  
    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }
  
    var newPriceAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getGeneralToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getGeneralToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  
    const rewardTokenTicker = rewardToken.symbol;
  
    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "doge");
  
    if (!poolPrices)
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }
  
    const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const balance = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS)
    const earned_ = await STAKING_POOL.earned(App.YOUR_ADDRESS)
    const canClaim = await STAKING_POOL.canClaimReward(App.YOUR_ADDRESS)
    const canWithdraw = await STAKING_POOL.canWithdraw(App.YOUR_ADDRESS)
  
    const staked_tvl = poolPrices.staked_tvl;
  
    const userStaked = balance / 10 ** stakeToken.decimals;
  
    const userUnstaked = stakeToken.unstaked;
  
    const earned = earned_ / 10 ** rewardToken.decimals;
  
    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned,
      canClaim,
      canWithdraw
    }
  }
  
  async function printCOWAIISynthetixPool(App, info, chain="eth", customURLs) {
    info.poolPrices.print_price(chain, 4, customURLs);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
          `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(info.stakingAddress, App)
    }
    const claim = async function() {
      return rewardsContract_claim(info.stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    _print(`<a target="_blank" href="https://ftmscan.com/address/${info.stakingAddress}#code">FTM Scan</a>`);
    if (info.stakeTokenAddress != "0x0000000000000000000000000000000000000000") {
      _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    }
    else {
      _print(`Please use the official website to stake ${info.stakeTokenTicker}.`);
    }
    if(info.canWithdraw){
      _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    }
    if(info.canClaim){
      _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`, claim)
    }
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Revoke (set approval to 0)`, revoke)
    }
    _print_link(`Exit`, exit)
    _print("");
  
    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
    }
  }
  
  async function loadDogeMILKContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    deathPoolIndices, claimFunction) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = 4;
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    _print(`<a href='https://explorer.dogechain.dog/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  
    _print(`Showing incentivized pools only.\n`);
  
    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getGeneralToken(App, rewardTokenAddress, chefAddress);
  
    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 3
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getMILKPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  
    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getGeneralToken(App, address, chefAddress);
    }));
  
    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
                      .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "doge") : undefined);
    }
  
    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "doge") : undefined);
  
  
    _print("Finished reading smart contracts.\n");
  
    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, claimFunction, "doge", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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
  
async function getMILKPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  const poolToken = await getGeneralToken(app, poolInfo.lpToken ?? poolInfo.token ?? poolInfo.stakingToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  //const withdrawFee = await chefContract.getWithdrawFeeOf(poolIndex, app.YOUR_ADDRESS) / 100;
  return {
      address : poolInfo.lpToken ?? poolInfo.token ?? poolInfo.stakingToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      //depositFee : poolInfo.depositFeePct / 100,
      //withdrawFee : withdrawFee
  };
}