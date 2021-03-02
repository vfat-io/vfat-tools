$(function() {
    consoleInit();
    start(main);
});
  
async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const MM_CHEF_ADDR = "0xf8873a6080e8dbF41ADa900498DE0951074af577";
    const rewardTokenTicker = "MM";
    const MM_CHEF = new ethers.Contract(MM_CHEF_ADDR, MM_CHEF_ABI, App.provider);
    const rewardsPerWeek = await MM_CHEF.mmPerBlock() / 1e18 * 604800 / 13.5;

    await loadChefContract(App, MM_CHEF, MM_CHEF_ADDR, MM_CHEF_ABI, rewardTokenTicker, "mm", null, rewardsPerWeek, "pendingMM");

    hideLoading();  
}