$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const MARK_FAUCET_ADDR = "0x6544b1cd2d28c6c53b52a1ffb8e547740e426b33";

    await loadChefContractSecondAttempt(App, null, MARK_FAUCET_ADDR, MARK_FAUCET_ABI, "MARK",
        "MARK", "markPerBlock", null, "pendingMark");

    hideLoading();  
  }