
$(function() {
    consoleInit(main)
      });
    
    const KIWI_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_kiwi","type":"address"},{"internalType":"address","name":"_feeAddress","type":"address"},{"internalType":"uint256","name":"_kiwiPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint16","name":"depositFeeBP","type":"uint16"}],"name":"AddedPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"uint16","name":"depositFeeBP","type":"uint16"}],"name":"AlteredPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newEmissionRate","type":"uint256"}],"name":"EmissionRateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newFeeAddress","type":"address"}],"name":"FeeAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"address","name":"giver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReferralPayment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"newReferralStatus","type":"bool"}],"name":"ReferralStatusToggled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"MAX_EMISSION_RATE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"referral","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"kiwi","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"kiwiPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxDepositFee","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingKiwi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolExistence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accKiwiPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"lpSupply","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"referralStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"toggleReferrals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_kiwiPerBlock","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"referral","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

    async function main() {
        const App = await init_ethers();
    
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts...\n");
    
       const KIWI_CHEF_ADDR = "0x807d01bc880fB28F4a161b7E8F42621705BC0924";
       const rewardTokenTicker = "KIWI";
       const KIWI_CHEF = new ethers.Contract(KIWI_CHEF_ADDR, KIWI_CHEF_ABI, App.provider);
    
       const startBlock = await KIWI_CHEF.startBlock();
       const currentBlock = await App.provider.getBlockNumber();
    
       let rewardsPerWeek = 0
       if(currentBlock < startBlock){
         _print(`Rewards start at block ${startBlock}\n`);
       }else{
        rewardsPerWeek = await KIWI_CHEF.kiwiPerBlock() /1e18
          * 604800 / 2.1;
       }
    
        const tokens = {};
        const prices = await getMaticPrices();
    
        await loadKiwiContract(App, tokens, prices, KIWI_CHEF, KIWI_CHEF_ADDR, KIWI_CHEF_ABI, rewardTokenTicker,
            "kiwi", null, rewardsPerWeek, "pendingKiwi", []);
    
        hideLoading();
      }
    
    async function loadKiwiContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
      rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
      deathPoolIndices) {
      const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
    
      const poolCount = parseInt(await chefContract.poolLength(), 10);
      const totalAllocPoints = await chefContract.totalAllocPoint();
    
      _print(`Found ${poolCount} pools.\n`)
    
      _print(`Showing incentivized pools only.\n`);
    
      var tokens = {};
    
      const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
      const rewardToken = await getMaticToken(App, rewardTokenAddress, chefAddress);
      const rewardsPerWeek = rewardsPerWeekFixed ?? 
        await chefContract.callStatic[rewardsPerBlockFunction]() 
        / 10 ** rewardToken.decimals * 604800 / 3
    
      const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
        await getMaticPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
    
      var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
    
      await Promise.all(tokenAddresses.map(async (address) => {
          tokens[address] = await getMaticToken(App, address, chefAddress);
      }));
    
      if (deathPoolIndices) {   //load prices for the deathpool assets
        deathPoolIndices.map(i => poolInfos[i])
                         .map(poolInfo => 
          poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);
      }
    
      const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);
    
    
      _print("Finished reading smart contracts.\n");
      
      let aprs = []
      for (i = 0; i < poolCount; i++) {
        if (poolPrices[i]) {
          const apr = printKiwiPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
            totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
            pendingRewardsFunction, null, null, "matic", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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
    
    function printKiwiPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                           totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                           pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
      fixedDecimals = fixedDecimals ?? 2;
      const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
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
      printKiwiContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
        rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
        poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
      return apr;
    }

    function printKiwiContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
        rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
        claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
      fixedDecimals = fixedDecimals ?? 2;
      const approveAndStake = async function() {
        return kiwiContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
      }
      const unstake = async function() {
        return kiwiContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
      }
      const claim = async function() {
        console.log('cleem')
        return kiwiContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
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
    
    const kiwiContract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
        const signer = App.provider.getSigner()
        const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
      
        const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
        const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

        const refAddress = "0x0000000000000000000000000000000000000000"
      
        if (earnedTokenAmount > 0) {
          showLoading()
          CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, refAddress, {gasLimit: 500000})
            .then(function(t) {
              return App.provider.waitForTransaction(t.hash)
            })
            .catch(function() {
              hideLoading()
            })
        }
      }

    const kiwiContract_claim = async function(chefAbi, chefAddress, poolIndex, App,
        pendingRewardsFunction, claimFunction) {
      const signer = App.provider.getSigner()
    
      const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
    
      const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

      const refAddress = "0x0000000000000000000000000000000000000000"
    /*
      if (earnedTokenAmount > 0) {
        showLoading()
        if (claimFunction) {
          claimFunction(poolIndex, {gasLimit: 500000})
            .then(function(t) {
              return App.provider.waitForTransaction(t.hash)
            })
        }
        else { */
          CHEF_CONTRACT.deposit(poolIndex, 0, refAddress, {gasLimit: 500000})
            .then(function(t) {
              return App.provider.waitForTransaction(t.hash)
            })
            .catch(function() {
              hideLoading()
            })
       /* }
      }*/
    }
    

    const kiwiContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
      const signer = App.provider.getSigner()
    
      const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
      const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
    
      const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
      const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
    
      const refAddress = "0x0000000000000000000000000000000000000000"
    
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
              CHEF_CONTRACT.deposit(poolIndex, currentTokens, refAddress, {gasLimit: 500000})
              .then(function(t) {
                App.provider.waitForTransaction(t.hash).then(function() {
                  hideLoading()
                })
              })
              .catch(function() {C
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