$(function () {
    consoleInit(main)
});

const HNYAN_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_rewardToken","type":"address"},{"internalType":"contract IERC20","name":"_stakedToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"reward","type":"uint128"},{"internalType":"uint64","name":"duration","type":"uint64"}],"name":"setRewardParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"stake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"forWhom","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"stakeFor","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"stakedToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewards","outputs":[{"internalType":"uint128","name":"userRewardPerTokenPaid","type":"uint128"},{"internalType":"uint128","name":"rewards","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawReward","outputs":[],"stateMutability":"nonpayable","type":"function"}]


const Pools = [
    "0x71caD6216F1A770a2B8F6A25FCBA3Ed7A4b6428b", // nyan-eth
    "0x047fC866Be0b812E4f4A7236F4D026bE931872F3", // eth
    "0xd5Fe5aB56cE866D68e54690fBAac7044759f6F14",  // nyan
].map(a => ({
    address: a,
    abi: HNYAN_ABI,
    stakeTokenFunction: "stakedToken",
    rewardTokenFunction: "rewardToken"
}))

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
    // _print(await App.provider.getBalance(App.YOUR_ADDRESS) / 1e18)

    var tokens = {};
    const prices = await getHarmonyPrices();

    await loadHarmonySynthetixPoolInfo(App, tokens, prices, Pools[0].abi, Pools[0].address, Pools[0].rewardTokenFunction, Pools[0].stakeTokenFunction)
    prices["0x0000000000000000000000000000000000000000"] = prices["0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a"];

    let p = await loadMultipleHarmonySynthetixPools(App, tokens, prices, Pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
    }

hideLoading();

}