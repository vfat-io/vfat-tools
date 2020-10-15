$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const MASTER_VAMPIRE_ADDR = "0xD12d68Fd52b54908547ebC2Cd77Ec6EbbEfd3099";
    const rewardTokenTicker = "DRC";
    const rewardsPerWeek = 150000 * 0.9;

    await loadChefContractSecondAttempt(App, null, YAXIS_CHEF_ADDR, YAXIS_CHEF_ABI, rewardTokenTicker,
        "yax", null, rewardsPerWeek, "pendingYaxis");

    hideLoading();  
  }