$(function() {
    consoleInit(main)
      });
  
    const MASTER_GARDNER_ABI = [{"type":"constructor","inputs":[{"type":"address","name":"_govToken","internalType":"contract GilToken"},{"type":"address","name":"_devaddr","internalType":"address"},{"type":"address","name":"_liquidityaddr","internalType":"address"},{"type":"address","name":"_comfundaddr","internalType":"address"},{"type":"address","name":"_founderaddr","internalType":"address"},{"type":"uint256","name":"_rewardPerBlock","internalType":"uint256"},{"type":"uint256","name":"_startBlock","internalType":"uint256"},{"type":"uint256","name":"_halvingAfterBlock","internalType":"uint256"},{"type":"uint256","name":"_userDepFee","internalType":"uint256"},{"type":"uint256","name":"_devDepFee","internalType":"uint256"},{"type":"uint256[]","name":"_rewardMultiplier","internalType":"uint256[]"},{"type":"uint256[]","name":"_blockDeltaStartStage","internalType":"uint256[]"},{"type":"uint256[]","name":"_blockDeltaEndStage","internalType":"uint256[]"},{"type":"uint256[]","name":"_userFeeStage","internalType":"uint256[]"},{"type":"uint256[]","name":"_devFeeStage","internalType":"uint256[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"FINISH_BONUS_AT_BLOCK","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"HALVING_AT_BLOCK","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PERCENT_FOR_COM","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PERCENT_FOR_DEV","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PERCENT_FOR_FOUNDERS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PERCENT_FOR_LP","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PERCENT_LOCK_BONUS_REWARD","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"REWARD_MULTIPLIER","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"REWARD_PER_BLOCK","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"START_BLOCK","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IERC20"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addAuthorized","inputs":[{"type":"address","name":"_toAdd","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"authorized","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"blockDeltaEndStage","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"blockDeltaStartStage","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"bonusFinishUpdate","inputs":[{"type":"uint256","name":"_newFinish","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimReward","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimRewards","inputs":[{"type":"uint256[]","name":"_pids","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"comUpdate","inputs":[{"type":"address","name":"_newCom","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"comfundaddr","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"},{"type":"address","name":"_ref","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"dev","inputs":[{"type":"address","name":"_devaddr","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"devDepFee","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"devFeeStage","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devaddr","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"founderUpdate","inputs":[{"type":"address","name":"_newFounder","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"founderaddr","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getGlobalAmount","inputs":[{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getGlobalRefAmount","inputs":[{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getLockPercentage","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getNewRewardPerBlock","inputs":[{"type":"uint256","name":"pid1","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"forDev","internalType":"uint256"},{"type":"uint256","name":"forFarmer","internalType":"uint256"},{"type":"uint256","name":"forLP","internalType":"uint256"},{"type":"uint256","name":"forCom","internalType":"uint256"},{"type":"uint256","name":"forFounders","internalType":"uint256"}],"name":"getPoolReward","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRefValueOf","inputs":[{"type":"address","name":"_user","internalType":"address"},{"type":"address","name":"_user2","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getTotalRefs","inputs":[{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract GilToken"}],"name":"govToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"halvingUpdate","inputs":[{"type":"uint256[]","name":"_newHalving","internalType":"uint256[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"liquidityaddr","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"lockUpdate","inputs":[{"type":"uint256[]","name":"_newlock","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"lockcomUpdate","inputs":[{"type":"uint256","name":"_newcomlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"lockdevUpdate","inputs":[{"type":"uint256","name":"_newdevlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"lockfounderUpdate","inputs":[{"type":"uint256","name":"_newfounderlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"locklpUpdate","inputs":[{"type":"uint256","name":"_newlplock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"lpUpdate","inputs":[{"type":"address","name":"_newLP","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingReward","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"poolExistence","inputs":[{"type":"address","name":"","internalType":"contract IERC20"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolId1","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"accGovTokenPerShare","internalType":"uint256"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reclaimTokenOwnership","inputs":[{"type":"address","name":"_newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeAuthorized","inputs":[{"type":"address","name":"_toRemove","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reviseDeposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"},{"type":"uint256","name":"_block","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reviseWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"},{"type":"uint256","name":"_block","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"rewardMulUpdate","inputs":[{"type":"uint256[]","name":"_newMulReward","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"rewardUpdate","inputs":[{"type":"uint256","name":"_newReward","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setDevDepFee","inputs":[{"type":"uint256","name":"_devDepFees","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setDevFeeStage","inputs":[{"type":"uint256[]","name":"_devFees","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setStageEnds","inputs":[{"type":"uint256[]","name":"_blockEnds","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setStageStarts","inputs":[{"type":"uint256[]","name":"_blockStarts","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setUserDepFee","inputs":[{"type":"uint256","name":"_usrDepFees","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setUserFeeStage","inputs":[{"type":"uint256[]","name":"_userFees","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"starblockUpdate","inputs":[{"type":"uint256","name":"_newstarblock","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"usdOracle","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userDelta","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userDepFee","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userFeeStage","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"globalAmount","internalType":"uint256"},{"type":"uint256","name":"totalReferals","internalType":"uint256"},{"type":"uint256","name":"globalRefAmount","internalType":"uint256"}],"name":"userGlobalInfo","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"},{"type":"uint256","name":"rewardDebtAtBlock","internalType":"uint256"},{"type":"uint256","name":"lastWithdrawBlock","internalType":"uint256"},{"type":"uint256","name":"firstDepositBlock","internalType":"uint256"},{"type":"uint256","name":"blockdelta","internalType":"uint256"},{"type":"uint256","name":"lastDepositBlock","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"},{"type":"address","name":"_ref","internalType":"address"}]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","indexed":true},{"type":"uint256","name":"pid","indexed":true},{"type":"uint256","name":"amount","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","indexed":true},{"type":"uint256","name":"pid","indexed":true},{"type":"uint256","name":"amount","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","indexed":true},{"type":"address","name":"newOwner","indexed":true}],"anonymous":false},{"type":"event","name":"SendGovernanceTokenReward","inputs":[{"type":"address","name":"user","indexed":true},{"type":"uint256","name":"pid","indexed":true},{"type":"uint256","name":"amount","indexed":false},{"type":"uint256","name":"lockAmount","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","indexed":true},{"type":"uint256","name":"pid","indexed":true},{"type":"uint256","name":"amount","indexed":false}],"anonymous":false}]
    const SNAKE_TREASURY_ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"contract IERC20","name":"_govToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"enter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"govToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"leave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
    
    const GIL_ADDRESS = "0x106E6a2D54332247441c1Cdf4E3e24a0696a46d0";
    const MASTER_GARDNER_ADDRESS = "0x950c1Da7beA5E98ed069375e25622AA170E6a208";
    const SNAKE_TREASURY_ADDRESS = "0x4F9FB906008b6404e17a627F168D686e949af64A";
    const REWARD_TOKEN_TICKER = "GIL";
    
    
    async function main() {
      const App = await init_ethers();
    
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");
    
      const MASTER_GARDNER = new ethers.Contract(MASTER_GARDNER_ADDRESS, MASTER_GARDNER_ABI, App.provider);
    
      const blockNumber = await App.provider.getBlockNumber();
      const multiplier = await MASTER_GARDNER.getMultiplier(blockNumber, blockNumber+1);
      const rewardPerBlock = await MASTER_GARDNER.REWARD_PER_BLOCK();
      const rewardsPerWeek = rewardPerBlock / 1e18 * multiplier * 604800 / 6.7
    
      const tokens = {};
      const dogePrices = await await getDogePrices();
    
      const { prices, totalUserStaked, totalStaked, averageApr } = await loadDogLandsChefContract(
        App,
        tokens,
        dogePrices,
        MASTER_GARDNER,
        MASTER_GARDNER_ADDRESS,
        MASTER_GARDNER_ABI,
        REWARD_TOKEN_TICKER,
        "govToken",
        null,
        rewardsPerWeek,
        "pendingReward",
        [],
        true
      );
    
      const GIL_TOKEN = new ethers.Contract(GIL_ADDRESS, ERC20_ABI, App.provider.getSigner());
      const SNAKE_TREASURY = new ethers.Contract(SNAKE_TREASURY_ADDRESS, SNAKE_TREASURY_ABI, App.provider.getSigner());
      const SNAKE_TREASURY_DATA = await doglandsSnakeTreasuryData(GIL_TOKEN, SNAKE_TREASURY, App, prices);

      const totalStakedInSnakeTreasury = totalStaked + SNAKE_TREASURY_DATA.totalBalanceUSD
    
      _print_bold(`Total Staked: $${formatMoney(totalStakedInSnakeTreasury)}`);
      if (totalUserStaked > 0) {
        _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}% in LP staking pools.`);
        _print(`Estimated earnings:`
            + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
            + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
            + ` Year $${formatMoney(totalUserStaked*averageApr)}`);
      }
    
      if (SNAKE_TREASURY_DATA.userBalanceUSD > 0) {
        _print(`You are staking a total of $${formatMoney(SNAKE_TREASURY_DATA.userBalanceUSD)} in the Snake Treasury single staking pool.`);
      }
    
      hideLoading();
    }
    
    async function loadDogLandsChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
      rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
      deathPoolIndices, hideFooter) {
      const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
    
      const poolCount = parseInt(await chefContract.poolLength(), 10);
      const totalAllocPoints = await chefContract.totalAllocPoint();
    
      _print(`Found ${poolCount} pools.\n`)
    
      _print(`Showing incentivized pools only.\n`);
    
      var tokens = {};
    
      const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
      const rewardToken = await getGeneralEthcallToken(App, rewardTokenAddress, chefAddress);
      const rewardsPerWeek = rewardsPerWeekFixed ??
        await chefContract.callStatic[rewardsPerBlockFunction]()
        / 10 ** rewardToken.decimals * 604800 / 6
  
      const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
        await getGeneralEthcallPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
    
      var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
    
      await Promise.all(tokenAddresses.map(async (address) => {
          tokens[address] = await getGeneralEthcallToken(App, address, chefAddress);
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
          const apr = printDoglandsChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
            totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
            pendingRewardsFunction, null, null, "doge")
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
    
      if (!hideFooter) {
        _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
        if (totalUserStaked > 0) {
          _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
          _print(`Estimated earnings:`
              + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
              + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
              + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
        }
      }
    
      return { prices, totalUserStaked, totalStaked, averageApr }
    }
    
    
    function printDoglandsChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                                totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                                pendingRewardsFunction, fixedDecimals, claimFunction, chain="bsc", depositFee=0, withdrawFee=0) {
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
      const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals);
      if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
      if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
      printDogLandsChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
      return apr;
    }
    
    function printDogLandsChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
                                         rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
                                         claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
      fixedDecimals = fixedDecimals ?? 2;
      const approveAndStake = async function() {
        return doglandsContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
      }
      const unstake = async function() {
        return doglandsContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
      }
      const claim = async function() {
        return doglandsContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
      }
      if(depositFee > 0){
        _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
      }else{
        _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
      }
      if(withdrawFee > 0){
        _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
      }else{
        _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
      }
      _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
      _print(`Staking or unstaking also claims rewards.`)
      _print("");
    }
    
    const doglandsContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
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
              CHEF_CONTRACT.deposit(poolIndex, currentTokens, "0x0000000000000000000000000000000000000000", {gasLimit: 500000})
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
    
    const doglandsContract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
      const signer = App.provider.getSigner()
      const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
    
      const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
      const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18
    
      if (earnedTokenAmount > 0) {
        showLoading()
        CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, "0x0000000000000000000000000000000000000000", {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
      }
    }
    
    const doglandsContract_claim = async function(chefAbi, chefAddress, poolIndex, App,
        pendingRewardsFunction, claimFunction) {
      const signer = App.provider.getSigner()
    
      const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
    
      const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18
    
      if (earnedTokenAmount > 0) {
        CHEF_CONTRACT.claimReward(poolIndex, {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
      }
    }
    
    async function doglandsSnakeTreasuryData(GIL_TOKEN, SNAKE_TREASURY, App, prices) {
      const snakeTreasuryTotalBalance = await GIL_TOKEN.balanceOf(SNAKE_TREASURY_ADDRESS) / 1e18;
      const snakeTreasuryTotalSupply = await SNAKE_TREASURY.totalSupply() / 1e18;
      const xGilRatio = snakeTreasuryTotalBalance / snakeTreasuryTotalSupply;
    
      const snakeTreasuryUserBalanceBigNum = await SNAKE_TREASURY.balanceOf(App.YOUR_ADDRESS);
      const snakeTreasuryUserBalance = (snakeTreasuryUserBalanceBigNum / 1e18) * xGilRatio;
      const snakeTreasuryShare = snakeTreasuryUserBalance / snakeTreasuryTotalBalance;
      const gilBalanceBigNum = await GIL_TOKEN.balanceOf(App.YOUR_ADDRESS);
      const gilBalance = gilBalanceBigNum / 1e18;
    
      const gilPrice = prices[GIL_ADDRESS];
    
      let snakeTreasuryTotalBalanceUSD;
      let snakeTreasuryUserBalanceUSD;
    
      if (gilPrice && gilPrice.usd) {
        snakeTreasuryTotalBalanceUSD = snakeTreasuryTotalBalance * gilPrice.usd;
        snakeTreasuryUserBalanceUSD = snakeTreasuryUserBalance * gilPrice.usd;
    
        _print(`Snake Treasury TVL: $${formatMoney(snakeTreasuryTotalBalanceUSD)}`);
        _print(`${REWARD_TOKEN_TICKER} Price: $${formatMoney(gilPrice.usd)}`);
        _print(`Staked: ${(snakeTreasuryTotalBalance).toFixed(2)} ${REWARD_TOKEN_TICKER} ($${formatMoney(snakeTreasuryTotalBalanceUSD)})`);
        _print(`You are staking ${(snakeTreasuryUserBalance).toFixed(2)} ${REWARD_TOKEN_TICKER} ($${formatMoney(snakeTreasuryUserBalanceUSD)}), ${(snakeTreasuryShare * 100).toFixed(2)}% of the pool.`);
    
        const approveAndEnter = async function() {
          return snakeTreasuryApproveAndEnter(GIL_TOKEN, SNAKE_TREASURY, gilBalanceBigNum, App);
        }
    
        const leave = async function() {
          return snakeTreasuryLeave(SNAKE_TREASURY, snakeTreasuryUserBalanceBigNum, App);
        }
    
        _print_link(`Stake ${(gilBalance).toFixed(2)} ${REWARD_TOKEN_TICKER}`, approveAndEnter);
    
        if (snakeTreasuryUserBalance > 0) {
          _print_link(`Unstake ${snakeTreasuryUserBalance.toFixed(2)} ${REWARD_TOKEN_TICKER}`, leave);
        }
    
        _print(`Snake Treasury rewards are visible after unstaking / exiting the pool.`)
        _print('');
      }
    
      hideLoading()
    
      return {
        totalBalance: snakeTreasuryTotalBalance,
        totalBalanceUSD: snakeTreasuryTotalBalanceUSD,
        userBalance: snakeTreasuryUserBalance,
        userBalanceUSD: snakeTreasuryUserBalanceUSD
      }
    }
    
    async function snakeTreasuryApproveAndEnter(GIL_TOKEN, SNAKE_TREASURY, currentTokens, App) {
      const allowedTokens = await GIL_TOKEN.allowance(App.YOUR_ADDRESS, SNAKE_TREASURY_ADDRESS)
      let allow = Promise.resolve()
    
      if (allowedTokens / 1e18 < currentTokens / 1e18) {
        showLoading()
        allow = GIL_TOKEN.approve(SNAKE_TREASURY_ADDRESS, ethers.constants.MaxUint256)
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
            SNAKE_TREASURY.enter(currentTokens, {gasLimit: 500000})
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
    
    async function snakeTreasuryLeave(SNAKE_TREASURY, currentStakedAmount, App) {
      showLoading()
      SNAKE_TREASURY.leave(currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        App.provider.waitForTransaction(t.hash).then(function() {
          hideLoading()
        })
      })
      .catch(function() {
        hideLoading()
      })
    }
    
  