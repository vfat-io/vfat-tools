$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const PICKLE_CHEF_ADDR = "0xbD17B1ce622d73bD438b9E658acA5996dc394b0d";

    await loadChefContract(App, PICKLE_CHEF_ADDR, PICKLE_CHEF_ABI, 0, "PICKLE", "pickle", "picklePerBlock", "pendingPickle");
  }