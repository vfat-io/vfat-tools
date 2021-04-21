
$(function() {
  consoleInit();
  start(main);
});

async function main() {  
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMaticPrices();

  //I need a function to show aave details
  
  hideLoading();
}
