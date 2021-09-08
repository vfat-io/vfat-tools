$(function() {
  consoleInit(main)
    });
  
  const DREGG_CHEF_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_DREGG","internalType":"contract DREGGToken"},{"type":"address","name":"_devaddr","internalType":"address"},{"type":"address","name":"_feeAddress","internalType":"address"},{"type":"uint256","name":"_DREGGPerBlock","internalType":"uint256"},{"type":"uint256","name":"_startBlock","internalType":"uint256"}]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"SetDevAddress","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"address","name":"newAddress","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"SetFeeAddress","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"address","name":"newAddress","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"UpdateEmissionRate","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"DREGGPerBlock","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BONUS_MULTIPLIER","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract DREGGToken"}],"name":"DREGG","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DREGGPerBlock","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IERC20"},{"type":"uint16","name":"_withdrawFeeBP","internalType":"uint16"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"dev","inputs":[{"type":"address","name":"_devaddr","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devaddr","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"feeAddress","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingDREGG","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"poolExistence","inputs":[{"type":"address","name":"","internalType":"contract IERC20"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"accDREGGPerShare","internalType":"uint256"},{"type":"uint16","name":"withdrawFeeBP","internalType":"uint16"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"uint16","name":"_withdrawFeeBP","internalType":"uint16"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setFeeAddress","inputs":[{"type":"address","name":"_feeAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateEmissionRate","inputs":[{"type":"uint256","name":"_DREGGPerBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}];
  
  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DREGG_CHEF_ADDR = "0xC0F19836931F5Ab43f279D4DD5Ab3089846Db264";
    const rewardTokenTicker = "DREGG";
    const DREGG_CHEF = new ethers.Contract(DREGG_CHEF_ADDR, DREGG_CHEF_ABI, App.provider);
  
    const tokens = {};
    const prices = await getAvaxPrices();

    await loadCustomAvaxChefContract(App, tokens, prices, DREGG_CHEF, DREGG_CHEF_ADDR, DREGG_CHEF_ABI, rewardTokenTicker,
        "DREGG", "DREGGPerBlock", null, "pendingDREGG", [8]);

    hideLoading();
  }

  // use a customized loader to show APRs and details before emissions start
  async function loadCustomAvaxChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    deathPoolIndices, ignoredPools) {
      const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

      const poolCount = parseInt(await chefContract.poolLength(), 10);
      const totalAllocPoints = await chefContract.totalAllocPoint();

      _print(`Found ${poolCount} pools.\n`)

      _print(`Showing incentivized pools only.\n`);

      var tokens = {};

      const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
      const rewardToken = await getAvaxToken(App, rewardTokenAddress, chefAddress);
      const rewardsPerWeek = rewardsPerWeekFixed ?? 
        await chefContract.callStatic[rewardsPerBlockFunction]() 
        / 10 ** rewardToken.decimals * 604800;

      const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
        ignoredPools?.includes(x) ? null :
        await getAvaxPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

      var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));

      await Promise.all(tokenAddresses.map(async (address) => {
          tokens[address] = await getAvaxToken(App, address, chefAddress);
      }));

      if (deathPoolIndices) {   //load prices for the deathpool assets
        deathPoolIndices.map(i => poolInfos[i])
                          .map(poolInfo => 
          poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "avax") : undefined);
      }

      const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "avax") : undefined);


      _print("Finished reading smart contracts.\n");
        
      let aprs = []
      for (i = 0; i < poolCount; i++) {
        if (poolPrices[i]) {
          const apr = printCustomChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
            totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
            pendingRewardsFunction, 8, null, "avax", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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

  function printCustomChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
    totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
    pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
      fixedDecimals = fixedDecimals ?? 2;
      const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
      var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
      if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
      const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
      const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
      _print_inline(`${poolIndex} - `);
      poolPrices.print_price(chain);
      sp?.print_price(chain);
      const apr = printCustomAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals);
      if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
      if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
      printCustomChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
      return apr;
  }

  function printCustomAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
    stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
    fixedDecimals) {
      var usdPerWeek = poolRewardsPerWeek * rewardPrice;
      fixedDecimals = fixedDecimals ?? 6;
      var timePerBlock = 1.5;
      _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
      var weeklyAPR = staked_tvl >= 1 ? usdPerWeek / staked_tvl * 100 / timePerBlock : usdPerWeek / 1 * 100 / timePerBlock;
      var dailyAPR = weeklyAPR / 7;
      var yearlyAPR = weeklyAPR * 52;
      _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
      var userStakedUsd = userStaked * poolTokenPrice;
      var userStakedPct = staked_tvl >= 1 ? userStakedUsd / staked_tvl * 100 : userStakedUsd / 1 * 100;
      _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(4)}% of the pool.`);
      var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
      var userDailyRewards = userWeeklyRewards / 7;
      var userYearlyRewards = userWeeklyRewards * 52;
      if (userStaked > 0) {
      _print(`Estimated ${rewardTokenTicker} earnings:`
      + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrice)})`
      + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
      + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
      }
      return {
      userStakedUsd,
      totalStakedUsd : staked_tvl,
      userStakedPct,
      yearlyAPR,
      userYearlyUsd : userYearlyRewards * rewardPrice
      }
}

function printCustomChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
  rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
  claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
    fixedDecimals = fixedDecimals ?? 6;
    const approveAndStake = async function() {
      return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
    }
    const unstake = async function() {
      return chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
    }
    const claim = async function() {
      return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
    }
    if(depositFee > 0){
      _print_link(`Stake ${unstaked.toString(fixedDecimals)} ${stakeTokenTicker} - Withdrawal Fee ${depositFee}%`, approveAndStake)
    }else{
      _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
    }
    if(withdrawFee > 0){
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Withdrawal Fee ${withdrawFee}%`, unstake)
    }else{
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
    }
    _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
    _print(`Staking or unstaking also claims rewards.`)
    _print("");
}
