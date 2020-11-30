$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const HOLY_KNIGHT_ADDR = "0x5D33dE3E540b289f9340D059907ED648c9E7AaDD";

    _print(`Staking bonus for long-term holders (multiply by the below APY)\n`);
    _print(`3-5  weeks: 3.125x (Stake before Dec 29)`);
    _print(`6-8  weeks: 3.75x  (Stake before Dec  8)`);
    _print(`<s>9-11 weeks: 4.375x (Stake before Nov 17)</s>`);
    _print(`<s>12   weeks: 5x     (Stake before Oct 31)</s>\n`);
    _print(`Program ends approximately January 19.\n`)

    await loadChefContractSecondAttempt(App, null, HOLY_KNIGHT_ADDR, HOLY_KNIGHT_ABI, "HOLY", "holytoken", "holyPerBlock", null, "pendingHoly");
  
    hideLoading();  
  }