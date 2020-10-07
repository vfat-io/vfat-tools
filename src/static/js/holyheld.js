$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const HOLY_KNIGHT_ADDR = "0x5D33dE3E540b289f9340D059907ED648c9E7AaDD";

    _print(`Staking bonus for long-term holders (multiply by the below APY)`);
    _print(`3-5  weeks: 1.25x`);
    _print(`6-8  weeks: 1.5x`);
    _print(`9-11 weeks: 1.75x`);
    _print(`12   weeks: 2x\n`);

    await loadChefContractSecondAttempt(App, null, HOLY_KNIGHT_ADDR, HOLY_KNIGHT_ABI, "HOLY", "holytoken", "holyPerBlock", null, "pendingHoly");
  
    hideLoading();  
  }