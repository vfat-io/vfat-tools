$(function () {
    consoleInit();
    start(main);
});

async function loadPool(App, tokens, prices, stakingAddress) {
    console.log("Loading Pool...")
    const STAKING_POOL = new ethers.Contract(stakingAddress, XUSD_STAKING_POOL_ABI, App.provider);

    const stakeTokenAddress = await STAKING_POOL.stakingToken();

    const rewardTokenAddress = await STAKING_POOL.rewardsToken();

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
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

    const stakeTokenPrice = getParameterCaseInsensitive(prices, stakeTokenAddress).usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress).usd;

    // Find out reward rate
    const weeklyRewards = await get_synth_weekly_rewards(STAKING_POOL);

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;

    poolPrices.print_price();
    _print(`${rewardTokenTicker} Per Week: ${weeklyRewards.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
    const weeklyAPY = usdPerWeek / staked_tvl * 100;
    const dailyAPY = weeklyAPY / 7;
    const yearlyAPY = weeklyAPY * 52;
    _print(`APY: Day ${dailyAPY.toFixed(2)}% Week ${weeklyAPY.toFixed(2)}% Year ${yearlyAPY.toFixed(2)}%`);
    const userStakedUsd = userStaked * stakeTokenPrice;
    const userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`You are staking ${userStaked.toFixed(6)} ${stakingTokenTicker} ` +
        `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (userStaked > 0) {
        const userWeeklyRewards = userStakedPct * weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards * rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards * rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards * rewardTokenPrice)})`);
    }
    const approveTENDAndStake = async function () {
        return rewardsContract_stake(stakeTokenAddress, stakingAddress, App)
    }
    const unstake = async function () {
        return rewardsContract_unstake(stakingAddress, App)
    }
    const claim = async function () {
        return rewardsContract_claim(stakingAddress, App)
    }
    const exit = async function () {
        return rewardsContract_exit(stakingAddress, App)
    }
    _print_link(`Stake ${userUnstaked.toFixed(6)} ${stakingTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(6)} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker}`, claim)
    _print_link(`Exit`, exit)
    _print(`\n`);
}

async function main() {

    const Contracts = {
        Tokens: {
            XUS: "0x875650dD46b60c592d5a69a6719e4e4187A3ca81",
            XUSD: "0x1c9BA9144505aaBa12f4b126Fda9807150b88f80"
        },
        Pools: {
            WETH: "0x7E9320C98389CB43B957Ff2399eA315Bce72fdb4",
            DAI: "0xf13a49Eb6b2F6918500ee5cf8b39bb15a38F5b32", 
            USDC: "0x3C2982CA260e870eee70c423818010DfeF212659",
            USDT: "0x7d3fcd3825ae54e8e8ffd3d0ce95882330d54968"
        },
        Staking: {
            XUS_ETH: "0x39d8189306a254120EF88e0A465808BB6532d63B",
            XUS_XUSD: "0x608D8b1511Cb3eB7dbcCb5c626922EBfE7A62583",
            XUSD_DAI: "0x7b24E729aa3a39c0555509A486eA7a415b4Df934"
        }
    }

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};

    for (const [, address] of Object.entries(Contracts.Staking)) {
        await loadPool(App, tokens, prices, address);
    }

    hideLoading();
}