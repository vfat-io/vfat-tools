$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const MARK_FAUCET_ADDR = "0x5D9972dD3Ba5602574ABeA6bF9E1713568D49903";

    await loadChefContract(App, null, MARK_FAUCET_ADDR, MARK_FAUCET_ABI, "MARK",
        "MARK", "markPerBlock", null, "pendingMark");

    hideLoading();  
  }