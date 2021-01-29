$(function() {
  consoleInit();
  start(main);
});

const Pools = [ 
  {
    address: "0x18D410f651289BB978Fc32F90D2d7E608F4f4560",
    abi: _1INCH_FARMING_ABI,
    stakeTokenFunction: "mooniswap",
    rewardTokenFunction: "gift"
  }
]

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = {};

  await loadMultipleSynthetixPools(App, tokens, prices, Pools)
  hideLoading();
}