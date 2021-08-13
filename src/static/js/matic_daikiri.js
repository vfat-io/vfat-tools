
$(function () {
    consoleInit(main)
});

const DAIKI_CHEF_ABI = [{ "inputs": [{ "internalType": "contract DaikiToken", "name": "_rewardToken", "type": "address" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" }, { "internalType": "address", "name": "_daoAddress", "type": "address" }, { "internalType": "address", "name": "_feeAddress", "type": "address" }, { "internalType": "address", "name": "_vaultAddress", "type": "address" }, { "internalType": "uint256", "name": "_rewardTokenPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_miningReward", "type": "uint256" }, { "internalType": "uint256", "name": "_maxEmissionRate", "type": "uint256" }, { "internalType": "uint256", "name": "_maxMiningReward", "type": "uint256" }, { "internalType": "contract IReferral", "name": "_referral", "type": "address" }, { "internalType": "contract IERC20", "name": "_collateralToken", "type": "address" }, { "internalType": "uint256", "name": "_requiredCollateralAmount", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "stakingToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "depositFeeBP", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "harvestInterval", "type": "uint256" }], "name": "Add", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "epochCount", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "newChallengeNumber", "type": "bytes32" }], "name": "Mined", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "rewardToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "newMiningReward", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "oldMiningReward", "type": "uint256" }], "name": "MiningRewardChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "referrer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "commissionAmount", "type": "uint256" }], "name": "ReferralCommissionPaid", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "collateralToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "newRequiredCollateral", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "oldRequiredCollateral", "type": "uint256" }], "name": "RequiredCollateralChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountLockedUp", "type": "uint256" }], "name": "RewardLockedUp", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "depositFeeBP", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "harvestInterval", "type": "uint256" }], "name": "Set", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "oldDaoAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newDaoAddress", "type": "address" }], "name": "SetDaoAddress", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "oldFeeAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newFeeAddress", "type": "address" }], "name": "SetFeeAddress", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "oldVaultAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newVaultAddress", "type": "address" }], "name": "SetVaultAddress", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "rewardTokenPerBlock", "type": "uint256" }], "name": "UpdateEmissionRate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "startBlock", "type": "uint256" }], "name": "UpdateStartBlock", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "MAXIMUM_DEPOSIT_FEE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAXIMUM_HARVEST_INTERVAL", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAXIMUM_REFERRAL_COMMISSION_RATE", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_EMISSION_RATE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_MINING_REWARD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PRECISION_FACTOR", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_BLOCKS_PER_READJUSTMENT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_MAXIMUM_TARGET", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_MINIMUM_TARGET", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_stakingToken", "type": "address" }, { "internalType": "uint256", "name": "_depositFeeBP", "type": "uint256" }, { "internalType": "uint256", "name": "_harvestInterval", "type": "uint256" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "canHarvest", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "challengeNumber", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_miningReward", "type": "uint256" }], "name": "changeMiningReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newCollateralAmount", "type": "uint256" }], "name": "changeRequiredCollateralAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes32", "name": "challenge_digest", "type": "bytes32" }, { "internalType": "bytes32", "name": "challenge_number", "type": "bytes32" }, { "internalType": "uint256", "name": "testTarget", "type": "uint256" }], "name": "checkMintSolution", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "collateralToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "address", "name": "_referrer", "type": "address" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "epochCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feeAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getChallengeNumber", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMiningDifficulty", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMiningReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMiningTarget", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes32", "name": "challenge_digest", "type": "bytes32" }, { "internalType": "bytes32", "name": "challenge_number", "type": "bytes32" }], "name": "getMintDigest", "outputs": [{ "internalType": "bytes32", "name": "digesttest", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "lastRewardAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastRewardEthBlockNumber", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastRewardTo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestDifficultyPeriodStarted", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "miningReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "miningTarget", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "bytes32", "name": "challenge_digest", "type": "bytes32" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingRewardToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "name": "poolExistence", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IERC20", "name": "stakingToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accRewardTokenPerShare", "type": "uint256" }, { "internalType": "uint256", "name": "depositFeeBP", "type": "uint256" }, { "internalType": "uint256", "name": "harvestInterval", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "referral", "outputs": [{ "internalType": "contract IReferral", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "referralCommissionRate", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "requiredCollateralAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardToken", "outputs": [{ "internalType": "contract DaikiToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardTokenPerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "_depositFeeBP", "type": "uint256" }, { "internalType": "uint256", "name": "_harvestInterval", "type": "uint256" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_daoAddress", "type": "address" }], "name": "setDaoAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_feeAddress", "type": "address" }], "name": "setFeeAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "_referralCommissionRate", "type": "uint16" }], "name": "setReferralCommissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_vaultAddress", "type": "address" }], "name": "setVaultAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tokensMined", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalLockedUpRewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_rewardTokenPerBlock", "type": "uint256" }], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_startBlock", "type": "uint256" }], "name": "updateStartBlock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }, { "internalType": "uint256", "name": "rewardLockedUp", "type": "uint256" }, { "internalType": "uint256", "name": "nextHarvestUntil", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "vaultAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DAIKI_CHEF_ADDR = "0xc92D3c902a70a439911f2910907e5c1cfA72B51c";
    const rewardTokenTicker = "DAIKI";
    const DAIKI_CHEF = new ethers.Contract(DAIKI_CHEF_ADDR, DAIKI_CHEF_ABI, App.provider);


    const blockNumber = await App.provider.getBlockNumber();
    const multiplier = await DAIKI_CHEF.getMultiplier(blockNumber, blockNumber + 1);
    const rewardPerBlock = await DAIKI_CHEF.rewardTokenPerBlock();
    const rewardsPerWeek = rewardPerBlock / 1e18 * multiplier * 604800 / 2

    const tokens = {};
    const prices = await getMaticPrices();

    await loadMaticDAIKIChefContract(App, tokens, prices, DAIKI_CHEF, DAIKI_CHEF_ADDR, DAIKI_CHEF_ABI, rewardTokenTicker,
        "rewardToken", null, rewardsPerWeek, "pendingRewardToken", [0, 1, 2, 3, 4]);

    hideLoading();
}


async function loadMaticDAIKIChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
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
        await getMaticDAIKIPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

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
            const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
                totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                pendingRewardsFunction, null, null, "matic", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
            aprs.push(apr);
        }
    }
    let totalUserStaked = 0, totalStaked = 0, averageApr = 0;
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
            + ` Day $${formatMoney(totalUserStaked * averageApr / 365)}`
            + ` Week $${formatMoney(totalUserStaked * averageApr / 52)}`
            + ` Year $${formatMoney(totalUserStaked * averageApr)}\n`);
    }
    return { prices, totalUserStaked, totalStaked, averageApr }
}

async function getMaticDAIKIPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    if (poolInfo.allocPoint == 0) {
        return {
            address: poolInfo.lpToken ?? poolInfo[0],
            allocPoints: poolInfo.allocPoint ?? 1,
            poolToken: null,
            userStaked: 0,
            pendingRewardTokens: 0,
        };
    }
    const poolToken = await getMaticToken(app, poolInfo.lpToken ?? poolInfo[0], chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: poolInfo.lpToken ?? poolInfo[0],
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked: staked,
        pendingRewardTokens: pendingRewardTokens / 10 ** 18,
        depositFee: (poolInfo.depositFeeBP ?? 0) / 100,
        withdrawFee: (poolInfo.withdrawFeeBP ?? 0) / 100
    };
}
