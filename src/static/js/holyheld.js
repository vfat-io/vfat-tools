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
    _print(`3-5  weeks: 3.125x`);
    _print(`6-8  weeks: 3.75x`);
    _print(`9-11 weeks: 4.375x`);
    _print(`12   weeks: 5x\n`);
    _print(`Stake before October 27 to get the full 5x bonus! Program ends approximately January 19.\n`)

    await loadChefContractSecondAttempt(App, null, HOLY_KNIGHT_ADDR, HOLY_KNIGHT_ABI, "HOLY", "holytoken", "holyPerBlock", null, "pendingHoly");
  
    hideLoading();  
  }