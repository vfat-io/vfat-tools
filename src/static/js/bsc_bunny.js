$(function () {
    consoleInit(main)
});

const BUNNY_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"vault","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BunnyRewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"vault","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyDeposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"vault","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"BUNNY","outputs":[{"internalType":"contract BunnyToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"addVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bulkUpdateRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bunnyPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_bunnyPerBlock","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minter","outputs":[{"internalType":"contract IBunnyMinterV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"notifyDeposited","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"notifyWithdrawn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"pendingBunny","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"recoverToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"safeBunnyTransfer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bunnyPerBlock","type":"uint256"}],"name":"setBunnyPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_minter","type":"address"}],"name":"setMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"from","type":"uint256"},{"internalType":"uint256","name":"to","type":"uint256"}],"name":"timeMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"}],"name":"tokenSupplyOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"}],"name":"updateRewardsOf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"updateVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"}],"name":"vaultInfoOf","outputs":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accBunnyPerShare","type":"uint256"}],"internalType":"struct IBunnyChef.VaultInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"vaultUserInfoOf","outputs":[{"components":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"pending","type":"uint256"},{"internalType":"uint256","name":"rewardPaid","type":"uint256"}],"internalType":"struct IBunnyChef.UserInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}]
const BUNNY_STAKING_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"apy","outputs":[{"internalType":"uint256","name":"_usd","type":"uint256"},{"internalType":"uint256","name":"_bunny","type":"uint256"},{"internalType":"uint256","name":"_bnb","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"helper","outputs":[{"internalType":"contract IStrategyHelper","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"info","outputs":[{"components":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"principal","type":"uint256"},{"internalType":"uint256","name":"available","type":"uint256"},{"components":[{"internalType":"uint256","name":"usd","type":"uint256"},{"internalType":"uint256","name":"bunny","type":"uint256"},{"internalType":"uint256","name":"bnb","type":"uint256"}],"internalType":"struct Profit","name":"profit","type":"tuple"},{"internalType":"uint256","name":"poolTVL","type":"uint256"},{"components":[{"internalType":"uint256","name":"usd","type":"uint256"},{"internalType":"uint256","name":"bunny","type":"uint256"},{"internalType":"uint256","name":"bnb","type":"uint256"}],"internalType":"struct APY","name":"poolAPY","type":"tuple"}],"internalType":"struct UserInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"presaleBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"principalOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"profitOf","outputs":[{"internalType":"uint256","name":"_usd","type":"uint256"},{"internalType":"uint256","name":"_bunny","type":"uint256"},{"internalType":"uint256","name":"_bnb","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverBEP20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IStrategyHelper","name":"_helper","type":"address"}],"name":"setHelper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"}],"name":"setRewardsDistribution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"setRewardsToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"bool","name":"permission","type":"bool"}],"name":"setStakePermission","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"stakeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tvl","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"withdrawableBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const Vaults = [
    "0xa6C29a422D1612293669156a34f2793526783622", //BUNNY-BNB FLIP Boost
    "0xb037581cF0cE10b04C4735443d95e0C93db5d940", //BUNNY Boost
    "0xEDfcB78e73f7bA6aD2D829bf5D462a0924da28eD", //CAKE
    "0x7eaaEaF2aB59C2c85a17BEB15B110F81b192e98a", //CAKE-BNB FLIP
    "0x3f139386406b0924eF115BAFF71D0d30CC090Bd5", //CAKE-BNB FLIP CAKE Maximizer
    "0x0137d886e832842a3B11c568d5992Ae73f7A792e", //BTCB-BNB FLIP
    "0xCBd4472cbeB7229278F841b2a81F1c0DF1AD0058", //BTCB-BNB FLIP CAKE Maximizer
    "0xE02BCFa3D0072AD2F52eD917a7b125e257c26032", //ETH-BNB FLIP
    "0x41dF17D1De8D4E43d5493eb96e01100908FCcc4f", //ETH-BNB FLIP CAKE Maximizer
    "0x1b6e3d394f1D809769407DEA84711cF57e507B99", //BUSD-BNB FLIP
    "0x92a0f75a0f07C90a7EcB65eDD549Fa6a45a4975C", //BUSD-BNB FLIP CAKE Maximizer
    "0xC1aAE51746bEA1a1Ec6f17A4f75b422F8a656ee6", //USDT-BNB FLIP
    "0xE07BdaAc4573a00208D148bD5b3e5d2Ae4Ebd0Cc", //USDT-BNB FLIP CAKE Maximizer
    "0xa59EFEf41040e258191a4096DC202583765a43E7", //VAI-BUSD FLIP
    "0xa5B8cdd3787832AdEdFe5a04bF4A307051538FF2", //VAI-BUSD FLIP CAKE Maximizer
    "0xC0314BbE19D4D5b048D3A3B974f0cA1B2cEE5eF3", //USDT-BUSD FLIP
    "0x866FD0028eb7fc7eeD02deF330B05aB503e199d4", //USDT-BUSD FLIP CAKE Maximizer
    "0x52cFa188A1468A521A98eaa798E715Fbb9eb38a3", //BNB
    "0x22af73683dee5D266B0c36c37D0Fd62c402Fd250", //ETH
    "0x549d2e2B4fA19179CA5020A981600571C2954F6a", //BTCB
    "0x0Ba950F0f099229828c10a9B307280a450133FFc", //USDT
    "0x0243A20B20ECa78ddEDF6b8ddb43a0286438A67A"  //BUSD
]

const Pools = [
    "0xCADc8CB26c8C7cB46500E61171b5F27e9bd7889D"  //BUNNY
].map(a => {
    return {
        address: a,
        abi: BUNNY_STAKING_ABI,
        rewardTokenFunction: "rewardsToken",
        stakeTokenFunction: "stakingToken"
    }
})

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const BUNNY_CHEF_ADDR = "0x5022301097B896A49de6c38F825b8C31D11E9247";
    const BUNNY_CHEF = new ethers.Contract(BUNNY_CHEF_ADDR, BUNNY_CHEF_ABI, App.provider);


    const BUNNY_CHEF_POOL_ADDR = "0xCADc8CB26c8C7cB46500E61171b5F27e9bd7889D";
    const BUNNY_CHEF_POOL = new ethers.Contract(BUNNY_CHEF_POOL_ADDR, BUNNY_STAKING_ABI, App.provider);


    const startBlock = await BUNNY_CHEF.startBlock();
    const currentBlock = await App.provider.getBlockNumber();
    const rewardTokenTicker = "BUNNY"

    let rewardsPerWeek = 0
    if (currentBlock < startBlock) {
        _print(`Rewards start at block <a href="https://bscscan.com/block/countdown/${startBlock}" target="_blank">${startBlock}</a>\n`)
    } else {
        rewardsPerWeek = await BUNNY_CHEF.bunnyPerBlock() / 1e18
            * 604800 / 3;
    }


    const tokens = {};
    const prices = await getBscPrices();

    await loadBunnyChefContract(App, tokens, prices, BUNNY_CHEF, BUNNY_CHEF_ADDR, BUNNY_CHEF_ABI,BUNNY_CHEF_POOL,BUNNY_CHEF_POOL_ADDR,BUNNY_STAKING_ABI, rewardTokenTicker, "BUNNY", "bunnyPerBlock", rewardsPerWeek, "pendingBunny", Vaults);
    _print("");

    let p = await loadMultipleBscSynthetixPools(App, tokens, prices, Pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    }

    hideLoading();
}

async function loadBunnyChefContract(App, tokens, prices, chef, chefAddress, chefAbi,
                                     vaultChef,vaultAddress,vaultAbi,
                                     rewardTokenTicker,
                                     rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
                                     vaults) {
    const chefContract = await new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = vaults.length;
    const totalAllocPoints = await chefContract.totalAllocPoint();

    _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    var tokens = {};

    // const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    // const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
    // const rewardsPerWeek = rewardsPerWeekFixed
    //
    //
    // const PoolChefContract =await new ethers.Contract(vaultAddress, vaultAbi, App.provider);
    // const poolInfos = await Promise.all(Vaults.map(x => getBunnyPoolInfo(App ,tokens,vaultAddress ,x, pendingRewardsFunction)));
    //
    // var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
    //
    // await Promise.all(tokenAddresses.map(async (address) => {
    //     tokens[address] = await getBscToken(App, address, chefAddress);
    // }));
    //
    // poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
    // const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
    //
    //
    // _print("Finished reading smart contracts.\n");
    //
    // let aprs = []
    // for (i = 0; i < poolCount; i++) {
    //     if (poolPrices[i]) {
    //         const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
    //             totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
    //             pendingRewardsFunction, null, null, "bsc", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
    //         aprs.push(apr);
    //     }
    // }
    // let totalUserStaked = 0, totalStaked = 0, averageApr = 0;
    // for (const a of aprs) {
    //     if (!isNaN(a.totalStakedUsd)) {
    //         totalStaked += a.totalStakedUsd;
    //     }
    //     if (a.userStakedUsd > 0) {
    //         totalUserStaked += a.userStakedUsd;
    //         averageApr += a.userStakedUsd * a.yearlyAPR / 100;
    //     }
    // }
    // averageApr = averageApr / totalUserStaked;
    // _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    // if (totalUserStaked > 0) {
    //     _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
    //     _print(`Estimated earnings:`
    //         + ` Day $${formatMoney(totalUserStaked * averageApr / 365)}`
    //         + ` Week $${formatMoney(totalUserStaked * averageApr / 52)}`
    //         + ` Year $${formatMoney(totalUserStaked * averageApr)}\n`);
    // }
    // return {prices, totalUserStaked, totalStaked, averageApr}

}

async function getBunnyPoolInfo(App, tokens, chefAddress,itemAddress, pendingRewardsFunction) {
    const contract = await new ethers.Contract(itemAddress, BUNNY_STAKING_ABI, App.provider);
    const poolToken = await getBscToken(App, itemAddress, chefAddress);
    const staked = await contract.balanceOf(App.YOUR_ADDRESS)/ 1e18;
    const pendingRewardTokens = await contract.callStatic[pendingRewardsFunction](App.YOUR_ADDRESS);
    const depositFee =await contract.deposit;
    const withdraw =await  contract.withdraw;
    return {
        address: contract.stakingToken(),
        poolToken: poolToken,
        userStaked: staked,
        pendingRewardTokens: pendingRewardTokens / 10 ** 18,
        depositFee: depositFee,
        withdrawFee: withdraw,
        totalSupply:contract.totalSupply() / 1e18

    };

}
