$(function() {
  consoleInit();
  start(main);
});

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = {};

  const rewardTokenTicker = "PCT";
  const rewardTokenAddress = "0xbc16da9df0a22f01a16bc0620a27e7d6d6488550";
  
  for (const c of CONTRACTS) {
    await loadPool(App, tokens, prices, c, rewardTokenTicker, rewardTokenAddress);
  }

  await _print24HourPrice("percent", "PCT");

  hideLoading();
}