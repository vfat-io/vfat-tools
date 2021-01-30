$(function() {
  consoleInit();
  start(main);
});

const Pools = [ 
  "0x18D410f651289BB978Fc32F90D2d7E608F4f4560", //ETH-OPIUM farm
  "0x9070832CF729A5150BB26825c2927e7D343EabD9", //ETH-1INCH farm  
  "0xA83fCeA9229C7f1e02Acb46ABe8D6889259339e8", //ETH-USDT farm  
  "0x4dab1Ba9609C1546A0A69a76F00eD935b0b9C45e", //ETH-DAI farm  
  "0x0DA1b305d7101359434d71eCEAab71E1fF5437e6", //ETH-USDC farm  
  "0x98484d4259A70B73af58180521f2eB71a3F00Ae6", //ETH-WBTC farm
].map(a => { 
  return {
    address: a,
    abi: _1INCH_FARMING_ABI,
    stakeTokenFunction: "mooniswap",
    rewardTokenFunction: "gift"
  }; })

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = {};

  await loadMultipleSynthetixPools(App, tokens, prices, Pools)
  hideLoading();
}