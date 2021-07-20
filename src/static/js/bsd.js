$(function () {
consoleInit(main)
});

async function loadStablePools(App, chef, chefAddress, chefAbi, rewardTokenTicker,
                               rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = await chefContract.poolLength() / 1;

    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    var tokens = {};

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
        await chefContract.callStatic[rewardsPerBlockFunction]()
        / 10 ** rewardToken.decimals * 604800 / 13.5

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
        await getPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

    var tokenAddresses = [].concat.apply([], poolInfos.map(x => x.poolToken.tokens));
    var prices = await lookUpTokenPrices(tokenAddresses);

    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getToken(App, address, chefAddress);
    }));

    const poolPrices = poolInfos.map(poolInfo => getPoolPrices(tokens, prices, poolInfo.poolToken));

    _print("Finished reading smart contracts.\n");

    const BSDS_DAI_BALANCER_POOL = "0xdD82e4227BaeC1Fc40a72ef9895f38f2C1Df4F42";

    const BSD_USDC_BALANCER_POOL = "0xCDD2bD61D07b8d42843175dd097A4858A8f764e7";

    for (const balPoolAddress of [BSDS_DAI_BALANCER_POOL, BSD_USDC_BALANCER_POOL]) {
        const balPool = await getToken(App, balPoolAddress, chefAddress);
        var newTokenAddresses = balPool.tokens.filter(x => tokens[x] == null);
        for (const address of newTokenAddresses) {
            tokens[address] = await getToken(App, address, balPoolAddress);
        }
        getPoolPrices(tokens, prices, balPool);
    }

    for (i = 0; i < poolCount; i++) {
        printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
            poolCount, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
            pendingRewardsFunction);
    }
}

const FASS_POOL_ABI = [{
    "inputs": [{"internalType": "uint8", "name": "_pid", "type": "uint8"}, {
        "internalType": "address",
        "name": "_account",
        "type": "address"
    }],
    "name": "getUserInfo",
    "outputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "rewardDebt",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "accumulatedEarned", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "lockReward",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "lockRewardReleased", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint8", "name": "_pid", "type": "uint8"}, {
        "internalType": "address",
        "name": "_account",
        "type": "address"
    }],
    "name": "pendingReward",
    "outputs": [{"internalType": "uint256", "name": "_pending", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "rewardPoolInfo",
    "outputs": [{
        "internalType": "contract IERC20",
        "name": "rewardToken",
        "type": "address"
    }, {"internalType": "uint256", "name": "lastRewardBlock", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "endRewardBlock",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "rewardPerBlock", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "accRewardPerShare",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "lockRewardPercent", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "startVestingBlock",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "endVestingBlock", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "numOfVestingBlocks",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "totalPaidRewards", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
},]


async function getFaasPoolInfo(app, faasContract, chefAddress, poolIndex) {
    const poolInfo = await faasContract.rewardPoolInfo(poolIndex);
    const poolToken = await getToken(app, chefAddress, chefAddress);
    const userInfo = await faasContract.getUserInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await faasContract.callStatic['pendingReward'](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        rewardToken: poolInfo.rewardToken,
        rewardPerBlock: poolInfo.rewardPerBlock,
        address: chefAddress,
        totalAllocPoints: 1000,
        allocPoints: 1000,
        poolToken: poolToken,
        userStaked: staked,
        pendingRewardTokens: pendingRewardTokens / 10 ** 18,
        stakedToken: null,
        userLPStaked: null,
        lastRewardBlock: null
    };
}

function getParameterCaseInsensitive(object, key) {
    return object[Object.keys(object)
        .find(k => k.toLowerCase() === key.toLowerCase())
        ];
}

async function loadFaasPools(App, faasAddresses) {
    var tokens = {};
    const BSDS = '0xe7c9c188138f7d70945d420d75f8ca7d8ab9c700';
    for (let {address, poolLength} of faasAddresses) {

        const faasContract = new ethers.Contract(address, FASS_POOL_ABI, App.provider);
        const poolInfos = await Promise.all([...Array(poolLength).keys()].map(async (x) =>
            await getFaasPoolInfo(App, faasContract, address, x)));
        var tokenAddresses = [].concat.apply([], poolInfos.map(x => x.poolToken.tokens));
        tokenAddresses.push(BSDS);
        var prices = await lookUpTokenPrices(tokenAddresses);
        await Promise.all(tokenAddresses.map(async (address) => {
            tokens[address] = await getToken(App, address, address);
        }));
        const poolPrices = poolInfos.map(poolInfo => getPoolPrices(tokens, prices, poolInfo.poolToken));
        for (i = 0; i < poolLength; i++) {
            const rewardPoolInfo = poolInfos[i]
            const rewardTokenAddress = rewardPoolInfo.rewardToken;
            const totalAllocPoints = rewardPoolInfo.totalAllocPoints;
            const rewardToken = await getToken(App, rewardTokenAddress, address);
            const rewardsPerWeek = rewardPoolInfo.rewardPerBlock / 10 ** rewardToken.decimals * 604800 / 13.5;
            printChefPool(App, FASS_POOL_ABI, address, prices, tokens, poolInfos[i], i, poolPrices[i],
                totalAllocPoints, rewardsPerWeek, rewardToken.name, rewardTokenAddress,
                'pendingReward');
        }
    }
}

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const STABLES_POOL_ADDR = "0xa249ee8255dF0AA00A15262b16BCA3eFD66c3E4C";
    const rewardTokenTicker = "BSD";
    const rewardsPerWeek = 200000;

    await loadStablePools(App, null, STABLES_POOL_ADDR, STABLES_POOL_ABI, rewardTokenTicker,
        "bsd", null, rewardsPerWeek, "pendingBasisDollar");
    const BSD_DAI_BALANCER_POOL = "0xc1b6296e55b6cA1882a9cefD72Ac246ACdE91414";
    const BSD_USDC_BALANCER_POOL = "0xCDD2bD61D07b8d42843175dd097A4858A8f764e7";
    const BSDS_USDC_BALANCER_POOL = "0x8438d64Da58772E9F7FCeAa1506bA300F935ABBd";
    const BSDS_DAI_BALANCER_POOL = "0xdD82e4227BaeC1Fc40a72ef9895f38f2C1Df4F42";
    _print("Reading share bank smart contracts...\n");
    const tokens = await loadFaasPools(App,
        [
            {address: BSD_USDC_BALANCER_POOL, poolLength: 1},
            {address: BSD_DAI_BALANCER_POOL, poolLength: 1},
            {address: BSDS_DAI_BALANCER_POOL, poolLength: 1},
            {address: BSDS_USDC_BALANCER_POOL, poolLength: 1},
        ]);
    hideLoading();
}
