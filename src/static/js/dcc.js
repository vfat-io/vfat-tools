$(function() {
consoleInit(main)
});

async function loadPool(App, tokens, prices, stakingAbi, stakingAddress,
        rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }

    var newPriceAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        if (newPrices[key])
            prices[key] = newPrices[key];
    }
    if (stakeTokenFunction == "SUSD") {
        prices[stakeTokenAddress] = { usd : 1 }; //...
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakingTokenTicker = poolPrices.stakingTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    // Find out reward rate
    const weeklyRewards = await get_synth_weekly_rewards(STAKING_POOL);

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;

    poolPrices.print_price();
    _print(`${rewardTokenTicker} Per Week: ${weeklyRewards.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
    const weeklyAPR = usdPerWeek / staked_tvl * 100;
    const usdtlyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${usdtlyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = userStaked * stakeTokenPrice;
    const userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`You are staking ${userStaked.toFixed(6)} ${stakingTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (userStaked > 0) {
        poolPrices.print_contained_price(userStaked);
        const userWeeklyRewards = userStakedPct * weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
    }
    const tokenMax = stakingTokenTicker == "WETH" ? 50 : 25000;
    const allowance =
        stakeTokenFunction == "lpt" ? userUnstaked : Math.min(tokenMax - userStaked, userUnstaked);
    const maxAllowance =
        stakeTokenFunction == "lpt" ? null : ethers.BigNumber.from(tokenMax).mul(ethers.BigNumber.from("10").pow(stakeToken.decimals));
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(stakeTokenAddress, stakingAddress, App, maxAllowance)
    }
    const unstake = async function() {
      return rewardsContract_unstake(stakingAddress, App)
    }
    const claim = async function() {
      return rewardsContract_claim(stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(stakeTokenAddress, stakingAddress, App)
    }
    _print_link(`Stake ${allowance.toFixed(6)} ${stakingTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(6)} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker}`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print(`\n`);

    return {
        staked_tvl: poolPrices.staked_tvl,
    }
}

async function main() {

    const CONTRACTS = [
        { address: Contracts.DCC.DCSUSDT, abi : Contracts.DCC.STAKING_LPT_ABI, rewardToken: "decentralizeShare", stakeToken: "lpt"},
        { address: Contracts.DCC.DCCUSDT, abi : Contracts.DCC.STAKING_LPT_ABI, rewardToken: "decentralizeShare", stakeToken: "lpt"},
        { address: Contracts.DCC.USDT, abi : Contracts.DCC.STAKING_ABI, rewardToken: "decentralizeCash", stakeToken: "stakeToken"},
        { address: Contracts.DCC.USDC, abi : Contracts.DCC.STAKING_ABI, rewardToken: "decentralizeCash", stakeToken: "stakeToken"},
        { address: Contracts.DCC.DAI,  abi : Contracts.DCC.STAKING_ABI, rewardToken: "decentralizeCash", stakeToken: "stakeToken"},
        { address: Contracts.DCC.BUSD, abi : Contracts.DCC.STAKING_ABI, rewardToken: "decentralizeCash", stakeToken: "stakeToken"},
        { address: Contracts.DCC.ESD,  abi : Contracts.DCC.STAKING_ABI, rewardToken: "decentralizeCash", stakeToken: "stakeToken"},
        { address: Contracts.DCC.MIC,  abi : Contracts.DCC.STAKING_ABI, rewardToken: "decentralizeCash", stakeToken: "stakeToken"},
        { address: Contracts.DCC.BAC,  abi : Contracts.DCC.STAKING_ABI, rewardToken: "decentralizeCash", stakeToken: "stakeToken"},
        { address: Contracts.DCC.FRAX, abi : Contracts.DCC.STAKING_ABI, rewardToken: "decentralizeCash", stakeToken: "stakeToken"},
        { address: Contracts.DCC.WETH, abi : Contracts.DCC.STAKING_ABI, rewardToken: "decentralizeCash", stakeToken: "stakeToken"}
    ];

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};
    var totalStaked = 0;

    for (const c of CONTRACTS) {
        try {
            const { staked_tvl } = await loadPool(App, tokens, prices, c.abi, c.address, c.rewardToken, c.stakeToken);
            totalStaked += staked_tvl;
        }
        catch (ex) {
            console.error(ex);
        }
    }

    _print_bold(`Total staked: $${formatMoney(totalStaked)}`)

    hideLoading();
  }
