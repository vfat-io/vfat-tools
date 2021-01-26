$(function() {
    consoleInit();
    start(main);
});

const ARMOR_STAKING_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"contract FarmController","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_controller","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakeToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Pools =  [
    { name : "ARMOR:ETH Uniswap", address: "0xf991f1e1b8acd657661c89b5cd452d86de76a8c1" },
    { name : "ARMOR:DAI Uniswap", address: "0xa659e66E116D354e779D8dbb35319AF67171ffb4" },
    { name : "ARMOR:WBTC Uniswap", address: "0x01Acad2228F18598CD2b8611aCD37992BF27313C" },
    { name : "ARMOR:ETH Sushiswap", address: "0x1b39d7f818aaf0318f6d0a66cd388c20c15fea94" },
    { name : "ARMOR:DAI Sushiswap", address: "0x4529AAA39DE655c8B4715DEa8b1dACEbbA255C74" },
    { name : "ARMOR:WBTC Sushiswap", address: "0x88aACE19997656F4eB1b8D3729226A4F97Ca6b2c" },
    { name : "ARMOR:ETH 1inch", address: "0xfDF5709D44b26A7DD112556Dd1B1cE53c0eAF454" },
    { name : "ARMOR:DAI 1inch", address: "0xD7b8Ef47C08F824ceA3d837afA61484e81d14BfB" },
    { name : "ARMOR:WBTC Balancer", address: "0x8C7442Bd71A1464f50efb216407B59584a2bcfF5" },
    { name : "ARMOR:DAI Balancer", address: "0x148ac62a238a71D7fb8A5bA093B8BADF4DCc7DCC" },
    { name : "arNXM:ETH Uniswap", address: "0x24ae7bdf4a9dee4d409503ffcfd5bc694e2c8a12" },
    { name : "arNXM:ETH Sushiswap", address: "0xcd1f8cda8be6a8c306a5b0ee759bad46a6f60cad" },
    { name : "arNXM:ETH 1inch", address: "0x07aFD11985bFcAA8016eEb9b00534c0B3A70CCaC" },
    { name : "arNXM:ETH Balancer", address: "0x008F3DDE2Ed44BdC72800108d8309D16d55d6dD5" }
].map(p => { return { name : p.name, address : p.address, abi : ARMOR_STAKING_ABI,
                      stakeTokenFunction : "stakeToken", rewardTokenFunction : "rewardToken" }})

async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");
  
    var tokens = {};
    var prices = {};
  
    const p1 = await loadSynthetixPool(App, tokens, prices, Pools[0].abi, Pools[0].address,
        Pools[0].rewardTokenFunction, Pools[0].stakeTokenFunction);
    const p = await loadMultipleSynthetixPools(App, tokens, prices, Pools.slice(1));

    _print_bold(`Total staked: $${formatMoney(p.staked_tvl + p1.staked_tvl)}`)
  
    hideLoading();
}