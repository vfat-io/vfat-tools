$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const YAXIS_CHEF_ADDR = "0xc330e7e73717cd13fb6ba068ee871584cf8a194f";
    const rewardTokenTicker = "YAX";
    const rewardsPerWeek = 4000 * 0.9;

    await loadChefContractSecondAttempt(App, null, YAXIS_CHEF_ADDR, YAXIS_CHEF_ABI, rewardTokenTicker,
        "yax", null, rewardsPerWeek, "pendingYaxis");

    hideLoading();  
  }