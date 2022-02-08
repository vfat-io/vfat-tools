$(function() {
    consoleInit(main)
    });
  
  const STAKINGREWARDS_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsTokenJONES","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"},{"internalType":"uint256","name":"_boostedTimePeriod","type":"uint256"},{"internalType":"uint256","name":"_boost","type":"uint256"},{"internalType":"uint256","name":"_id","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_contract","type":"address"}],"name":"AddToContractWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_contract","type":"address"}],"name":"RemoveFromContractWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardJONES","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardJONES","type":"uint256"}],"name":"RewardCompounded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardJONES","type":"uint256"}],"name":"RewardUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"boost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"boostedFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"boostedTimePeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"id","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerTokenStoredJONES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRateJONES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardsJONES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsTokenJONES","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userJONESRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistedContracts","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"isContract","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"JONEStokensEarned","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountJONES","type":"uint256"}],"name":"withdrawRewardTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"compound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardJONES","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_contract","type":"address"}],"name":"addToContractWhitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_contract","type":"address"}],"name":"removeFromContractWhitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
  
  async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const pools = ["0xf1a26Cf6309a59794da29B5b2E6fABD3070d470f","0x360a766F30F0Ba57d2865eFb32502FB800b14dD3","0x13f6A63867046107780Bc3fEBdeE90E7AfCdfd99","0xBAc58e8b57935A0B60D5Cb4cd9F6C21049595F04", "0x7eCe38dBE9D61D0d9Bf2D804A87A7d21b5937a56"]
    let tokens = {};
    let prices = await getArbitrumPrices();
  
    pools.forEach(async (pool) => {
      const info = await loadPool(App, tokens, prices, STAKINGREWARDS_ABI, pool);
      return printPool(App, info)
    });
  
    hideLoading();
    }

    async function loadPool(App, tokens, prices, stakingAbi, stakingAddress) {
        const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);
        const calls = [STAKING_MULTI.stakingToken(), STAKING_MULTI.rewardsTokenJONES(),
            STAKING_MULTI.periodFinish(), STAKING_MULTI.rewardRateJONES(),
            STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(App.YOUR_ADDRESS), 
            STAKING_MULTI.boost(), STAKING_MULTI.boostedFinish()]
        const [stakeTokenAddress, rewardTokenAddress, periodFinish, rewardRate, balance, earned_, boost, boostedFinish] = await App.ethcallProvider.all(calls)
        let stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);
        
        /* Get farming tokens */
        for (const address of stakeToken.tokens) {
              tokens[address] = await getToken(App, address, stakingAddress);
        }

        /* Get reward token */ 
        if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
            tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
        }
      
        const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
      
        const rewardTokenTicker = rewardToken.symbol;
      
        const poolPrices = getPoolPrices(tokens, prices, stakeToken);
      
        const stakeTokenTicker = poolPrices.stakeTokenTicker;
      
        const stakeTokenPrice = poolPrices.price;
      
        const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      
        const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : ((Date.now() / 1000 > boostedFinish) ? rewardRate : rewardRate * boost) / 1e18 * 604800;
      
        const usdPerWeek = weeklyRewards * rewardTokenPrice;
      
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
            weeklyRewards,
            usdPerWeek,
            staked_tvl,
            userStaked,
            userUnstaked,
            earned,
          }

    }

    async function printPool(App, info, chain="eth") {
        info.poolPrices.print_price(chain);
        
        _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
        const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
        const dailyAPR  = weeklyAPR / 7;
        const yearlyAPR = weeklyAPR * 52;
        _print(`${info.rewardTokenTicker} APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);

        const userStakedUsd = info.userStaked * info.stakeTokenPrice;
        const userStakedPct = userStakedUsd / info.staked_tvl * 100;
        _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
               `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
        if (info.userStaked > 0) {

          info.poolPrices.print_contained_price(info.userStaked);
            const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
            const userDailyRewards = userWeeklyRewards / 7;
            const userYearlyRewards = userWeeklyRewards * 52;

            _print(`Estimated ${info.rewardTokenTicker} earnings:`
                + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
                + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
                + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
        }
        const approveTENDAndStake = async function() {
          return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
        }
        const unstake = async function() {
          return rewardsContract_unstake(info.stakingAddress, App)
        }
        const claim = async function() {
          return rewardsContractDopex_claim(info.stakingAddress, App)
        }
        const exit = async function() {
          return rewardsContract_exit(info.stakingAddress, App)
        }
        const revoke = async function() {
          return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
        }
        switch (chain) {
          case "arb":
            _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}#code">Arbiscan</a>`);
            break;
        }
        _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
        _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
        _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`, claim)
        _print_link(`Revoke (set approval to 0)`, revoke)
        _print_link(`Exit`, exit)
        _print("");
        
        return {
            staked_tvl: info.poolPrices.staked_tvl,
            userStaked : userStakedUsd,
            apr : yearlyAPR 
        }
    }