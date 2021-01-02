$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const PICKLE_CHEF_ADDR = "0xD12d68Fd52b54908547ebC2Cd77Ec6EbbEfd3099";
    const rewardTokenTicker = "PICKLE";
    const PICKLE_CHEF = new ethers.Contract(PICKLE_CHEF_ADDR, PICKLE_CHEF_ABI, App.provider);
    const rewardsPerWeek = await PICKLE_CHEF.picklePerBlock() / 1e18
        * 604800 / 13.5;

    await loadChefContractSecondAttempt(App, PICKLE_CHEF, PICKLE_CHEF_ADDR, PICKLE_CHEF_ABI, rewardTokenTicker,
        "pickle", null, rewardsPerWeek, "pendingPickle");

    hideLoading();  
  }