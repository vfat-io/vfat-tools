const polisTokens = [
    { "id": "polis","symbol": "POLIS","contract": "0x6FC851B8D66116627Fb1137b9D5FE4E2e1BeA978" },
    { "id": "dai","symbol": "DAI","contract": "0x247123e806a27Ea322bFd93e0273D04602dC942D" },
]

async function getPolisPrices() {
    const idPrices = await lookUpPrices(polisTokens.map(x => x.id));
    const prices = {}
    for (const bt of polisTokens)
        if (idPrices[bt.id])
            prices[bt.contract] = idPrices[bt.id];
    return prices;
}

async function loadPolisChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
                                    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
                                    deathPoolIndices) {

    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();

    _print(`<a href='https://explorer.polis.tech/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    var tokens = {};

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getPolisToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
        await chefContract.callStatic[rewardsPerBlockFunction]()
        / 10 ** rewardToken.decimals * 604800 / 5

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
        await getPolisPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getPolisToken(App, address, chefAddress);
    }));

    if (deathPoolIndices) {   //load prices for the deathpool assets
        deathPoolIndices.map(i => poolInfos[i])
            .map(poolInfo =>
                poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "polis") : undefined);
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "polis") : undefined);


    _print("Finished reading smart contracts.\n");

    let aprs = []
    for (i = 0; i < poolCount; i++) {
        if (poolPrices[i]) {
            const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
                totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                pendingRewardsFunction, "polis");
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

async function getPolisStoredToken(App, tokenAddress, stakingAddress, type) {
    switch (type) {
        case "uniswap":
            const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
            return await getPolisUniPool(App, pool, tokenAddress, stakingAddress);
        case "polis20":
            const polis20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
            return await getPolis20(App, polis20, tokenAddress, stakingAddress);
    }
}

async function getPolisUniPool(App, pool, poolAddress, stakingAddress) {
    let q0, q1;
    const reserves = await pool.getReserves();
    q0 = reserves._reserve0;
    q1 = reserves._reserve1;
    const decimals = await pool.decimals();
    const token0 = await pool.token0();
    const token1 = await pool.token1();
    return {
        symbol : await pool.symbol(),
        name : await pool.name(),
        address: poolAddress,
        token0,
        q0,
        token1,
        q1,
        totalSupply: await pool.totalSupply() / 10 ** decimals,
        stakingAddress: stakingAddress,
        staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
        decimals: decimals,
        unstaked: await pool.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
        contract: pool,
        tokens : [token0, token1],
        is1inch : false
    };
}

async function getPolisToken(App, tokenAddress, stakingAddress) {
    if (tokenAddress == "0x0000000000000000000000000000000000000000") {
        return getPolis20(App, null, tokenAddress, "")
    }
    const type = window.localStorage.getItem(tokenAddress);
    if (type) return getPolisStoredToken(App, tokenAddress, stakingAddress, type);
    try {
        const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
        const _token0 = await pool.token0();
        const uniPool = await getPolisUniPool(App, pool, tokenAddress, stakingAddress);
        window.localStorage.setItem(tokenAddress, "uniswap");
        return uniPool;
    }
    catch(err) {
        console.log(err);
    }
    try {
        const polis20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
        const _name = await polis20.name();
        const polis20tok = await getPolis20(App, polis20, tokenAddress, stakingAddress);
        window.localStorage.setItem(tokenAddress, "polis20");
        return polis20tok;
    }
    catch(err) {
        console.log(err);
        console.log(`Couldn't match ${tokenAddress} to any known token type.`);
    }
}

async function getPolis20(App, token, address, stakingAddress) {
    if (address == "0x0000000000000000000000000000000000000000") {
        return {
            address,
            name : "Polis",
            symbol : "POLIS",
            totalSupply: 1e8,
            decimals: 18,
            staked: 0,
            unstaked: 0,
            contract: null,
            tokens:[address]
        }
    }
    const decimals = await token.decimals()
    return {
        address,
        name : await token.name(),
        symbol : await token.symbol(),
        totalSupply : await token.totalSupply(),
        decimals : decimals,
        staked:  await token.balanceOf(stakingAddress) / 10 ** decimals,
        unstaked: await token.balanceOf(App.YOUR_ADDRESS)  / 10 ** decimals,
        contract: token,
        tokens : [address]
    };
}

async function getPolisPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
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
    const poolToken = await getPolisToken(app, poolInfo.lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
    };
}
