$(function() {
    consoleInit();
    start(main);
  });

  const FRAX_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_rewardsToken0","type":"address"},{"internalType":"address","name":"_rewardsToken1","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_frax_address","type":"address"},{"internalType":"address","name":"_timelock_address","type":"address"},{"internalType":"uint256","name":"_pool_weight0","type":"uint256"},{"internalType":"uint256","name":"_pool_weight1","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"DefaultInitialization","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"multiplier","type":"uint256"}],"name":"LockedStakeMaxMultiplierUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"secs","type":"uint256"}],"name":"LockedStakeMinTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"secs","type":"uint256"}],"name":"LockedStakeTimeForMaxMultiplier","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"multiplier","type":"uint256"}],"name":"MaxCRBoostMultiplier","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"address","name":"token_address","type":"address"},{"indexed":false,"internalType":"address","name":"destination_address","type":"address"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"}],"name":"RewardsPeriodRenewed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"secs","type":"uint256"},{"indexed":false,"internalType":"address","name":"source_address","type":"address"}],"name":"StakeLocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"source_address","type":"address"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"destination_address","type":"address"}],"name":"Withdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"kek_id","type":"bytes32"},{"indexed":false,"internalType":"address","name":"destination_address","type":"address"}],"name":"WithdrawnLocked","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"migrator_address","type":"address"}],"name":"addMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"boostedBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"crBoostMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cr_boost_max_multiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"greylist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"greylistAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initializeDefault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"lockedBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"lockedStakesOf","outputs":[{"components":[{"internalType":"bytes32","name":"kek_id","type":"bytes32"},{"internalType":"uint256","name":"start_timestamp","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"ending_timestamp","type":"uint256"},{"internalType":"uint256","name":"multiplier","type":"uint256"}],"internalType":"struct StakingRewardsDualV2.LockedStake[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"locked_stake_max_multiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"locked_stake_min_time","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"locked_stake_time_for_max_multiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"migrationsOn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"staker_address","type":"address"},{"internalType":"address","name":"migrator_address","type":"address"}],"name":"migratorApprovedForStaker","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"staker_address","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"secs","type":"uint256"}],"name":"migrator_stakeLocked_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"staker_address","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"migrator_stake_for","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"staker_address","type":"address"},{"internalType":"bytes32","name":"kek_id","type":"bytes32"}],"name":"migrator_withdraw_locked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"staker_address","type":"address"}],"name":"migrator_withdraw_unlocked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner_address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool_weight0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool_weight1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"migrator_address","type":"address"}],"name":"removeMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renewIfApplicable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsCollectionPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"rewardsFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken0","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken1","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_locked_stake_time_for_max_multiplier","type":"uint256"},{"internalType":"uint256","name":"_locked_stake_min_time","type":"uint256"}],"name":"setLockedStakeTimeForMinAndMaxMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_locked_stake_max_multiplier","type":"uint256"},{"internalType":"uint256","name":"_cr_boost_max_multiplier","type":"uint256"}],"name":"setMultipliers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner_address","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_new_rate0","type":"uint256"},{"internalType":"uint256","name":"_new_rate1","type":"uint256"},{"internalType":"bool","name":"sync_too","type":"bool"}],"name":"setRewardRates","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_new_timelock","type":"address"}],"name":"setTimelock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"secs","type":"uint256"}],"name":"stakeLocked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"migrator_address","type":"address"}],"name":"stakerAllowMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"migrator_address","type":"address"}],"name":"stakerDisallowMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"staker_allowed_migrators","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakesUnlocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"secs","type":"uint256"}],"name":"stakingMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"timelock_address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"toggleMigrations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleRewardsCollection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleToken1Rewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleWithdrawals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token1_rewards_on","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBoostedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unlockStakes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"unlockedBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"valid_migrators","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"valid_migrators_array","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"kek_id","type":"bytes32"}],"name":"withdrawLocked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawalsPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
  
  async function main() {
  
    const Contracts = {
        Tokens: {
            FXS : "0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0",
            FRAX : "0x853d955acef822db058eb8505911ed77f175b99e"
        },
        Pools : {
            USDC : "0x3C2982CA260e870eee70c423818010DfeF212659",
            USDT : "0x7d3fcd3825ae54e8e8ffd3d0ce95882330d54968"
        },
        Staking : {
            FXS_WETH  : "0xDc65f3514725206Dd83A8843AAE2aC3D99771C88",
            FRAX_WETH : "0xD875628B942f8970De3CcEaf6417005F68540d4f",
            FRAX_USDC : "0xa29367a3f057F3191b62bd4055845a33411892b6",
            FRAX_FXS  : "0xda2c338350a0E59Ce71CDCED9679A3A590Dd9BEC"
        }
    }
    
    const Pool = {
      address : "0xdFb6ef63eA2753C6598fcA1b220358F17E4d137e",
      abi : FRAX_STAKING_ABI,
      stakingTokenFunction : "stakingToken",
      RewardTokenFunction0 : "rewardsToken0",
      RewardTokenFunction1 : "rewardsToken1"
    };
  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");
  
    var tokens = {};
    var prices = {};
  
    for (const [,address] of Object.entries(Contracts.Staking)) {
      await loadSynthetixPool(App, tokens, prices, FRAX_STAKING_POOL_ABI, address, "rewardsToken", "stakingToken");
    }

    let p = await loadFraxSynthetixPools(App, tokens, prices, Pool.abi, Pool.address, Pool.RewardTokenFunction0,
      Pool.RewardTokenFunction1, Pool.stakingTokenFunction)
  
    hideLoading();
  }

async function loadFraxSynthetixPools(App, tokens, prices, abi, address) {
    const info = await loadFraxSynthetixPoolsInfo(App, tokens, prices, abi, address);
    return await printFraxSynthetixPool(App, info);
}

async function loadFraxSynthetixPoolsInfo(App, tokens, prices, stakingAbi, stakingAddress) {
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    const calls = [STAKING_MULTI.stakingToken(), STAKING_MULTI.rewardsToken0(),
                   STAKING_MULTI.rewardsToken1(), STAKING_MULTI.periodFinish(),
                   STAKING_MULTI.rewardRate0(), STAKING_MULTI.rewardRate1(),
                   STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), 
                   STAKING_MULTI.rewards0(App.YOUR_ADDRESS), STAKING_MULTI.rewards1(App.YOUR_ADDRESS)]
    const [stakeTokenAddress, rewardTokenAddress0, rewardTokenAddress1,
           periodFinish, rewardRate0, rewardRate1, balance,
           earned_0, earned_1] = await App.ethcallProvider.all(calls)

    let stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

      let newPriceAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(prices, x)).concat([rewardTokenAddress0, rewardTokenAddress1])
    let newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    let newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }

    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress0)) {
        tokens[rewardTokenAddress0] = await getToken(App, rewardTokenAddress0, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress1)) {
        tokens[rewardTokenAddress1] = await getToken(App, rewardTokenAddress1, stakingAddress);
    }

    const rewardToken0 = getParameterCaseInsensitive(tokens, rewardTokenAddress0);
    const rewardToken1 = getParameterCaseInsensitive(tokens, rewardTokenAddress1);

    const rewardTokenTicker0 = rewardToken0.symbol;
    const rewardTokenTicker1 = rewardToken1.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice = poolPrices.price;

    const rewardTokenPrice0 = getParameterCaseInsensitive(prices, rewardTokenAddress0)?.usd;
    const rewardTokenPrice1 = getParameterCaseInsensitive(prices, rewardTokenAddress1)?.usd;

    const weeklyRewards0 = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate0 / 1e18 * 604800;
    const weeklyRewards1 = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate1 / 1e18 * 604800;

    const usdPerWeek0 = weeklyRewards0 * rewardTokenPrice0;
    const usdPerWeek1 = weeklyRewards1 * rewardTokenPrice1;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned0 = earned_0 / 10 ** rewardToken0.decimals;
    const earned1 = earned_1 / 10 ** rewardToken1.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress0,
      rewardTokenAddress1,
      stakeTokenTicker,
      rewardTokenTicker0,
      rewardTokenTicker1,
      stakeTokenPrice,
      rewardTokenPrice0,
      rewardTokenPrice1,
      weeklyRewards0,
      weeklyRewards1,
      usdPerWeek0,
      usdPerWeek1,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned0,
      earned1
    }
}

async function printFraxSynthetixPool(App, info, chain="eth") {
  info.poolPrices.print_price(chain);
  _print(`${info.rewardTokenTicker0} Per Week: ${info.weeklyRewards0.toFixed(2)} ($${formatMoney(info.usdPerWeek0)})`);
  const weeklyAPR0 = info.usdPerWeek0 / info.staked_tvl * 100;
  const dailyAPR0 = weeklyAPR0 / 7;
  const yearlyAPR0 = weeklyAPR0 * 52;
  _print(`${info.rewardTokenTicker0} APR: Day ${dailyAPR0.toFixed(2)}% Week ${weeklyAPR0.toFixed(2)}% Year ${yearlyAPR0.toFixed(2)}%`);
  _print(`${info.rewardTokenTicker1} Per Week: ${info.weeklyRewards1.toFixed(2)} ($${formatMoney(info.usdPerWeek1)})`);
  const weeklyAPR1 = info.usdPerWeek1 / info.staked_tvl * 100;
  const dailyAPR1 = weeklyAPR1 / 7;
  const yearlyAPR1 = weeklyAPR1 * 52;
  _print(`${info.rewardTokenTicker1} APR: Day ${dailyAPR1.toFixed(2)}% Week ${weeklyAPR1.toFixed(2)}% Year ${yearlyAPR1.toFixed(2)}%`);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (info.userStaked > 0) {
    info.poolPrices.print_contained_price(info.userStaked);
      const userWeeklyRewards0 = userStakedPct * info.weeklyRewards0 / 100;
      const userWeeklyRewards1 = userStakedPct * info.weeklyRewards1 / 100;
      const userDailyRewards0 = userWeeklyRewards0 / 7;
      const userDailyRewards1 = userWeeklyRewards1 / 7;
      const userYearlyRewards0 = userWeeklyRewards0 * 52;
      const userYearlyRewards1 = userWeeklyRewards1 * 52;
      _print(`Estimated ${info.rewardTokenTicker0} earnings:`
          + ` Day ${userDailyRewards0.toFixed(2)} ($${formatMoney(userDailyRewards0*info.rewardTokenPrice0)})`
          + ` Week ${userWeeklyRewards0.toFixed(2)} ($${formatMoney(userWeeklyRewards0*info.rewardTokenPrice0)})`
          + ` Year ${userYearlyRewards0.toFixed(2)} ($${formatMoney(userYearlyRewards0*info.rewardTokenPrice0)})`);
      _print(`Estimated ${info.rewardTokenTicker1} earnings:`
          + ` Day ${userDailyRewards1.toFixed(2)} ($${formatMoney(userDailyRewards1*info.rewardTokenPrice1)})`
          + ` Week ${userWeeklyRewards1.toFixed(2)} ($${formatMoney(userWeeklyRewards1*info.rewardTokenPrice1)})`
          + ` Year ${userYearlyRewards1.toFixed(2)} ($${formatMoney(userYearlyRewards1*info.rewardTokenPrice1)})`);
  }
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
  switch (chain) {
    case "eth":
      _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
      break;
    case "avax":
      _print(`<a target="_blank" href="https://cchain.explorer.avax.network/address/${info.stakingAddress}#code">Explorer</a>`);
      break;
    case "bsc":
      _print(`<a target="_blank" href="https://bscscan.com/address/${info.stakingAddress}#code">BSC Scan</a>`);
      break;
    case "heco":
      _print(`<a target="_blank" href="https://scan.hecochain.com/address/${info.stakingAddress}#code">Heco Scan</a>`);
      break;
    case "matic":
      _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Matic Explorer</a>`);
      break;
  }
  _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${info.earned0.toFixed(6)} ${info.rewardTokenTicker0} ($${formatMoney(info.earned0*info.rewardTokenPrice0)})`, claim)
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print_link(`Exit`, exit)
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd,
      apr : (yearlyAPR0 + yearlyAPR1)
  }
}