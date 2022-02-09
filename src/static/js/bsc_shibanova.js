
$(function() {
    consoleInit(main)
      });
    
    const Nova_CHEF_ABI = [{"inputs":[{"internalType":"contract ShibaBEP20","name":"_Nova","type":"address"},{"internalType":"contract ShibaBEP20","name":"_sNova","type":"address"},{"internalType":"contract ShibaBonusAggregator","name":"_bonusAggregator","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"address","name":"_feeAddress","type":"address"},{"internalType":"uint256","name":"_NovaPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newAmount","type":"uint256"}],"name":"EmissionRateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"Nova","outputs":[{"internalType":"contract ShibaBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NovaPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_depositFeeBP","type":"uint256"},{"internalType":"bool","name":"_isSNovaRewards","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bonusAggregator","outputs":[{"internalType":"contract ShibaBonusAggregator","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emissionReductionPeriodBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emissionReductionRatePerPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getPoolInfo","outputs":[{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accNovaPerShare","type":"uint256"},{"internalType":"uint256","name":"depositFeeBP","type":"uint256"},{"internalType":"bool","name":"isSNovaRewards","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialEmissionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastReductionPeriodIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minimumEmissionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingNova","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"lpSupply","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accNovaPerShare","type":"uint256"},{"internalType":"uint256","name":"depositFeeBP","type":"uint256"},{"internalType":"bool","name":"isSNovaRewards","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sNova","outputs":[{"internalType":"contract ShibaBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint256","name":"_depositFeeBP","type":"uint256"},{"internalType":"bool","name":"_isSNovaRewards","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minimumEmissionRate","type":"uint256"}],"name":"updateMinimumEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"}],"name":"updateUserBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"userBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"amountWithBonus","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

    
    async function main() {
        const App = await init_ethers();
    
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts...\n");
    
       const Nova_CHEF_ADDR = "0x8A4f4c7F4804D30c718a76B3fde75f2e0cFd8712";
       const Nova_CHEF = new ethers.Contract(Nova_CHEF_ADDR, Nova_CHEF_ABI, App.provider);
    
        const tokens = {};
        const prices = await getBscPrices();
    
        await loadShibaNovaChefContract(App, tokens, prices, Nova_CHEF, Nova_CHEF_ADDR, Nova_CHEF_ABI, "pendingNova", [1]);
    
        hideLoading();
      }
    
    async function loadShibaNovaChefContract(App, tokens, prices, chef, chefAddress, chefAbi,
      pendingRewardsFunction, deathPoolIndices) {
      const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
    
      const poolCount = parseInt(await chefContract.poolLength(), 10);
      const totalAllocPoints = await chefContract.totalAllocPoint();
    
      _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
      _print(`Found ${poolCount} pools.\n`)
    
      _print(`Showing incentivized pools only.\n`);
    
      const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
        await getShibaNovaPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
    
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
            totalAllocPoints, poolInfos[i].rewardsPerWeek, poolInfos[i].rewardTokenTicker, poolInfos[i].rewardTokenAddress,
            pendingRewardsFunction, null, null, "bsc")
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
    
    async function getShibaNovaPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
      const poolInfo = await chefContract.poolInfo(poolIndex);
      let rewardTokenAddress = await chefContract.Nova();
      let rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
      const poolToken = await getBscToken(App, poolInfo.lpToken, chefAddress);
      const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
      const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
      const staked = userInfo.amount / 10 ** poolToken.decimals;
      const rewardsPerWeek = await chefContract.NovaPerBlock()
        / 10 ** rewardToken.decimals * 604800 / 3
      if(poolInfo.isSNovaRewards == false){
        rewardTokenAddress = await chefContract.sNova();
        rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
        return{
          address: poolInfo.lpToken,
          allocPoints: poolInfo.allocPoint ?? 1,
          poolToken: poolToken,
          userStaked : staked,
          pendingRewardTokens : pendingRewardTokens / 10 ** 18,
          rewardTokenTicker : "Nova",
          rewardTokenAddress : rewardTokenAddress,
          rewardToken : rewardToken,
          rewardsPerWeek : rewardsPerWeek
        };
      }
      return{
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        rewardTokenTicker : "sNova",
        rewardTokenAddress : rewardTokenAddress,
        rewardToken : rewardToken,
        rewardsPerWeek : rewardsPerWeek
      };
    }
    