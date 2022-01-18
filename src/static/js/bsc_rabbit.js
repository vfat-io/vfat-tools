
$(function() {
    consoleInit(main)
});

const RABBIT_CHEF_ABI = [{"inputs":[{"internalType":"address","name":"_rabbit","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"uint256","name":"_rabbitPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ManualMint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"devAddr","type":"address"}],"name":"SetDevAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"rabbitPerBlock","type":"uint256"}],"name":"SetRabbitPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bonusEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"_currentBlock","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"isDuplicatedPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"manualMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingRabbit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"address","name":"stakeToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRabbitPerShare","type":"uint256"},{"internalType":"uint256","name":"accRabbitPerShareTilBonusEnd","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rabbit","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rabbitPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bonusMultiplier","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"}],"name":"setBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"setDev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"setPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rabbitPerBlock","type":"uint256"}],"name":"setRabbitPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"bonusDebt","type":"uint256"},{"internalType":"address","name":"fundedBy","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const RABBIT_CHEF_ADDR = "0x81C1e8A6f8eB226aA7458744c5e12Fc338746571";
    const rewardTokenTicker = "RABBIT";
    const RABBIT_CHEF = new ethers.Contract(RABBIT_CHEF_ADDR, RABBIT_CHEF_ABI, App.provider);
    let rewardsPerWeek = await RABBIT_CHEF.rabbitPerBlock() /1e18
        * 604800  / 3;

    const tokens = {};
    const prices = await getBscPrices();
    prices["0x45b887D3569cACa67E10662075241F972D337850"] = prices["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"] //ibBNB-wBNB
    prices["0xE0d1130Def49C29A4793De52eac680880Fc7cB70"] = {usd: 1} //ibBUSD
    prices["0xFE1622F9F594A113cd3C1A93F7F6B0d3C0588781"] = {usd: 1} //ibUSDT
    prices["0xe124118Cf775D320C11319458A9836a092E24307"] = prices["0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"] //ibBTCB
    prices["0x44945c51ed156cE2BF4b845Ab1F243e45b459D75"] = prices["0x250632378e573c6be1ac2f97fcdf00515d0aa91b"] //ibETH
    prices["0xfBB64012E6bF2722CaeaCA457Ee4050Fc2BA03e6"] = {usd: 1}; //debtPancakeBUSD-USDT
    prices["0x310EACBCd165D282e2BEA5B2394B6463355B6d9E"] = {usd: 1}; //debtMdexBUSD-USDT
    prices["0x6C02018633b40B5A41622de0c242b74Fe7C2ecdf"] = prices["0x9C65AB58d8d978DB963e63f2bfB7121627e3a739"] //ibMDX
    prices["0xf33c4Df340b4173f1cBF19FECFB5DCBd9D3E04e7"] = prices["0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"] //ibCAKE
    prices["0xcEC8a4efB208B53b126FD88e2EE632e949D97F0C"] = prices["0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd"] //ibLink
    prices["0x5732713b9C47f65E5EF517b81Aa590Bb59A88B75"] = prices["0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63"] //ibXVS
    prices["0xBA72427400F8AB8336a60F2Bd92c7e3CbEF1D5Ae"] = prices["0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402"] //ibDOT
    prices["0xC9C9C1dD1d45028f4a4b8BDfCd4dc144B5141660"] = prices["0xBf5140A22578168FD562DCcF235E5D43A02ce9B1"] //ibUNI
    prices["0xaBd428CeB1C5e38B0dCAAC4b937AA41ac70e9219"] = prices["0x4338665cbb7b2485a8855a139b75d5e34ab0db94"] //ibLTC
    prices["0xF25be4ddFd5a100c9bFb3cCDf01A5c511d158675"] = prices["0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153"] //ibFIL
    prices["0x2961C86bfA17D50212987b4A4682054C7674590e"] = prices["0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47"] //ibADA
    prices["0x7f22045eeF9aBdA4C1574C96234418c172C19DAB"] = {usd:1} //debtPancakeUSDT-USDC
    prices["0x703a15aA37EEFfaaCb81e5050c119526F3E32379"] = {usd:1} //debtPancakeBUSD-USDC
    prices["0x57897096176f90fF6C335c44428BaD4112d52DA5"] = {usd:1} //debtPancakeDAI-BUSD
    prices["0x0AF45AE58cdb1aeAeeb2E2c4Af53158513B89206"] = prices["0x95a1199eba84ac5f19546519e287d43d2f0e1b41"] //veRabbit
    prices["0x04Ffb93127D8af3144FEB3412Ad6c646214C6744"] = prices["0x95a1199eba84ac5f19546519e287d43d2f0e1b41"] //ibRabbit
    prices["0x2A6d1eF801fb59Be8E3f0FD3aB288ef1Fbe652BE"] = {usd:1} //debtPancakeTUSD-BUSD
    prices["0x2CC264BA011436f0EA7E7048205ba81756dE3816"] = {usd:1} //debtPancakeUST-BUSD
    prices["0x65E734EEa6DfAa628b7a3C7A0e50d9780fa0f8b9"] = {usd:1} //debtPancakeVAI-BUSD

    //missing the flat-busd pool
    const stakingTokens = ["0x45b887D3569cACa67E10662075241F972D337850",  //ibBNB
        "0xE0d1130Def49C29A4793De52eac680880Fc7cB70",  //ibBUSD
        "0xFE1622F9F594A113cd3C1A93F7F6B0d3C0588781",  //ibUSDT
        "0xe124118Cf775D320C11319458A9836a092E24307",  //ibBTCB
        "0x44945c51ed156cE2BF4b845Ab1F243e45b459D75",  //ibETH
        "0xfBB64012E6bF2722CaeaCA457Ee4050Fc2BA03e6",  //debtPancakeBUSD-USDT
        "0x34A7eb3393634f29e3415F16d75eaF38E39E72df",  //debtPancakeBNB-BUSD
        "0x2ae7Fb7134C769a46cb22BcAE6861D4FfeAF254c",  //debtPancakeUSDT-BNB
        "0x50d665e6b2ba753dEa17F3d6662C075825b8ed1e",  //debtPancakeETH-BNB
        "0xD0E03252bc84C18354E6e58E593e021a61CF71Fb",  //debtPancakeBTCB-BUSD
        "0x310EACBCd165D282e2BEA5B2394B6463355B6d9E",  //debtMdexBUSD-USDT
        "0x842eaF5eFEAf3AfA12363d658ACeFCaDfbFAf51e",  //debtMdexBNB-BUSD
        "0x4F31bb79Bc3316af644Eb636005D9c28f2Fb5d24",  //debtMdexUSDT-BNB
        "0x2E77F22e6F357bC7522161b57F3D20EAC27a9151",  //debtMdexBTCB-BUSD
        "0x38B7944eD59b408660f3fC9D1eccB5Be7Ac3fA9a",  //debtMdexETH-BNB
        "0x0025D20D85788C2cAE2FEB9C298bdaFc93bF08Ce",  //MDEX LP
        "0x04Ffb93127D8af3144FEB3412Ad6c646214C6744",  //ibRABBIT
        "0x6C02018633b40B5A41622de0c242b74Fe7C2ecdf",//ibMDX
        "0xf33c4Df340b4173f1cBF19FECFB5DCBd9D3E04e7",//ibCAKE
        "0x2CfAE4988970B02e3aF89f53f9F9AE301e42C85b",//debtPancakeBTCB-BNB
        "0xdACfd73882216e55C31D3B935Fa3F1E3D96d62a8",//debtPancakeCAKE-BNB
        "0x4A481296fd9FA078844aDa9b9B3a61625af12796",//debtMdexBTCB-BNB
        "0x1EB5d5d23B7A977EFEA4aCFF16057FF81C09EAc9",//debtMdexMDX-BNB
        "0x0dEc1f42B37d821185E9981C0eA7d82CDdD0c57E",//debtMdexBTCB-USDT
        "0x6614A679D71635A10920cB222a2B17F976afbA3e",//debtMdexETH-USDT
        "0x9208aB03D7EbC76aA6cbc281b874208456DbBBF7",//debtMdexETH-BTCB
        "0xcEC8a4efB208B53b126FD88e2EE632e949D97F0C",//ibLINK
        "0x5732713b9C47f65E5EF517b81Aa590Bb59A88B75",//ibXVS
        "0xBA72427400F8AB8336a60F2Bd92c7e3CbEF1D5Ae",//ibDOT
        "0xC9C9C1dD1d45028f4a4b8BDfCd4dc144B5141660",//ibUNI
        "0xaBd428CeB1C5e38B0dCAAC4b937AA41ac70e9219",//ibLTC
        "0xF25be4ddFd5a100c9bFb3cCDf01A5c511d158675",//ibFIL
        "0x2961C86bfA17D50212987b4A4682054C7674590e",//ibADA
        "0xaE6664543A64c072C5f16641CF240dB6eA7Aa7dE",//debtPancakeLINK-BNB
        "0xDe6Bb0E0c0530b9e383B5185244E6fa0D71Aee21",//debtPancakeXVS-BNB
        "0x00e9D2c04A9A038825bC8Ec927cC7c6a168135A5",//debtPancakeDOT-BNB
        "0x7089B82bA7fA7ceCB92233601097b06B2A48Be76",//debtPancakeADA-BNB
        "0x71345fe12BF9ac613588E2E9ffF7D1E34158eAcD",//debtPancakeUNI-BNB
        "0xB171c51763af91AE4956aa27975841aF162A86A6",//debtPancakeCAKE-BUSD
        "0x13741aA3aF1B1E122f4C0F8d5Eb215441593657b",//debtMdexCAKE-BNB
        "0x5839e16CC9Cc5CE3C2C029604F439E71D1c74A6e",//debtMdexLTC-USDT
        "0x5A55196bCD954eB284FDf697e3E12AD859c1d8C8",//debtMdexMDX-BUSD
        "0x2862Ab9515859b8700711707669C299360b3380A",//debtMdexADA-USDT
        "0xd35f0A7E376058a6B43c7689428fec8C7394Cf6f",//debtMdexFIL-USDT
        "0x9b07d4Aa2e2ddAB503dDD2A97779df3f1A59E71f",//debtMdexDOT-USDT
        "0xFa3De14B75832dF680D6cae6C2555d7ff5F80C00",//MDEX LP Token
        "0xd846539104Ee20bEe6229F83C97Bdcb70dC3048C",//debtPancakeRabbit-BNB
        "0x44948940F8473889C43d50c61d578cAcAAd1f9B6",//debtMdexRabbit-BUSD
        "0x7f22045eeF9aBdA4C1574C96234418c172C19DAB",//debtPancakeUSDT-USDC
        "0x57897096176f90fF6C335c44428BaD4112d52DA5",//debtPancakeDAI-BUSD
        "0x0AF45AE58cdb1aeAeeb2E2c4Af53158513B89206",//veRabbit
        "0x2A6d1eF801fb59Be8E3f0FD3aB288ef1Fbe652BE",//debtPancakeTUSD-BUSD
        "0x2CC264BA011436f0EA7E7048205ba81756dE3816",//debtPancakeUST-BUSD
        "0x65E734EEa6DfAa628b7a3C7A0e50d9780fa0f8b9",//debtPancakeVAI-BUSD
        "0x4efb463e1940F8679e6a0FF76A135820549A6583",//debtLeverageBiswapBTCB-USDT
        "0x17973a1bC59d93dBa313AF0a326Afc1DA636Ca6F",//debtLeverageBiswapETH-USDT
        "0x667CdF771787147cAcCA3e87a1DcB97a89ba0433",//debtLeverageBiswapBNB-USDT

    ] //ibCAKE

    await loadRabbitBscChefContract(App, tokens, prices, RABBIT_CHEF, RABBIT_CHEF_ADDR, RABBIT_CHEF_ABI, rewardTokenTicker,
        "rabbit", "rabbitPerBlock", rewardsPerWeek, "pendingRabbit");

    hideLoading();
}

async function loadRabbitBscChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
                                      rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
                                      deathPoolIndices){
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();

    _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
        await chefContract.callStatic[rewardsPerBlockFunction]()
        / 10 ** rewardToken.decimals * 604800 / 3

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
        await getRabbitPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getBscToken(App, address, chefAddress);
    }));

    if (deathPoolIndices) {   //load prices for the deathpool assets
        deathPoolIndices.map(i => poolInfos[i])
            .map(poolInfo =>
                poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
    }

    poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);


    _print("Finished reading smart contracts.\n");

    let aprs = []
    for (i = 0; i < poolCount; i++) {
        if (poolPrices[i]) {
            const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
                totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
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



async function getRabbitPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    const poolToken = await getBscToken(App, poolInfo.stakeToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: poolInfo.stakeToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        lastRewardBlock : poolInfo.lastRewardBlock
    };
}
