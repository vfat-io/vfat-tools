$(function() {
consoleInit(main)
  });

  async function getWeeklyRewards(App, stakingPool, rewardTokenDecimals) {
      const distributorAddress = await stakingPool.trueDistributor();
      const distributor = new ethers.Contract(distributorAddress, TRUEFI_DISTRIBUTOR_ABI, App.provider);
      const duration = await distributor.duration();
      const totalAmount = await distributor.totalAmount();
      return totalAmount / duration * 604800 / 10 ** rewardTokenDecimals;
  }

  const ichiRewardsContract_unstake = async function(ichiPool, App) {
    const signer = App.provider.getSigner()

    const currentStakedAmount = await ichiPool.staked(App.YOUR_ADDRESS)
    const earnedTokenAmount = (await ichiPool.claimable(App.YOUR_ADDRESS)) / 1e18

    if (earnedTokenAmount > 0) {
      showLoading()
      ichiPool.connect(signer).unstake(currentStakedAmount, {gasLimit: 250000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const ichiRewardsContract_exit = async function(ichiPool, App) {
    const signer = App.provider.getSigner()

    const currentStakedAmount = (await ichiPool.staked(App.YOUR_ADDRESS))

    if (currentStakedAmount / 1e18 > 0) {
      showLoading()
      ichiPool.connect(signer).exit(currentStakedAmount, {gasLimit: 250000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const ichiRewardsContract_claim = async function(ichiPool, App) {
    const signer = App.provider.getSigner()

    console.log(App.YOUR_ADDRESS)

    const earnedYFFI = (await ichiPool.claimable(App.YOUR_ADDRESS)) / 1e18

    if (earnedYFFI > 0) {
      showLoading()
      ichiPool.connect(signer).claim({gasLimit: 250000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  async function loadPool(App, tokens, prices, stakingAddress) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, TRUE_FARM_ABI, App.provider);

    const stakeTokenAddress = await STAKING_POOL.stakingToken();

    const rewardTokenAddress = await STAKING_POOL.trustToken();

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalStaked() / 10 ** stakeToken.decimals;
    }

    var newPriceAddresses = stakeToken.tokens.filter(x => prices[x] == null);
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x => tokens[x] == null);
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakingTokenTicker = poolPrices.stakingTokenTicker;

    const stakeTokenPrice =  getParameterCaseInsensitive(prices, stakeTokenAddress).usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress).usd;

    // Find out reward rate
    const weeklyRewards = await getWeeklyRewards(App, STAKING_POOL, rewardToken.decimals);

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = await STAKING_POOL.staked(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = await STAKING_POOL.claimable(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;

    poolPrices.print_price();
    _print(`${rewardTokenTicker} Per Week: ${weeklyRewards.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
    const weeklyAPR = usdPerWeek / staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = userStaked * stakeTokenPrice;
    const userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`You are staking ${userStaked.toFixed(6)} ${stakingTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (poolPrices.print_contained_price) poolPrices.print_contained_price(userStaked);
    if (userStaked > 0) {
        const userWeeklyRewards = userStakedPct * weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
    }
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(stakeTokenAddress, stakingAddress, App)
    }
    const unstake = async function() {
      return ichiRewardsContract_unstake(STAKING_POOL, App)
    }
    const claim = async function() {
      return ichiRewardsContract_claim(STAKING_POOL, App)
    }
    const exit = async function() {
      return ichiRewardsContract_exit(STAKING_POOL, App)
    }
    _print_link(`Stake ${userUnstaked.toFixed(6)} ${stakingTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(6)} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker}`, claim)
    _print_link(`Exit`, exit)
    _print(`\n`);
  }

  async function main() {

    const CONTRACTS = [
        "0xED45Cf4895C110f464cE857eBE5f270949eC2ff4",
        "0x493945574d9D41c1b553a3E5b71090eFc99Bf929",
        "0xf8F14Fbb93fa0cEFe35Acf7e004fD4Ef92d8315a",
        "0x8FD832757F58F71BAC53196270A4a55c8E1a29D9"
    ];

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};

    for (const c of CONTRACTS) {
      await loadPool(App, tokens, prices, c);
    }

    hideLoading();
  }
