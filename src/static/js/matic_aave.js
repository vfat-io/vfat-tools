
$(function() {
  consoleInit();
  start(main);
});

const TOKEN_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_proxyTo","internalType":"address"}]},{"type":"event","name":"ProxyOwnerUpdate","inputs":[{"type":"address","name":"_new","internalType":"address","indexed":false},{"type":"address","name":"_old","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"ProxyUpdated","inputs":[{"type":"address","name":"_new","internalType":"address","indexed":true},{"type":"address","name":"_old","internalType":"address","indexed":true}],"anonymous":false},{"type":"fallback","stateMutability":"payable"},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"implementation","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"proxyOwner","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"proxyTypeId","internalType":"uint256"}],"name":"proxyType","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferProxyOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"payable","outputs":[],"name":"updateAndCall","inputs":[{"type":"address","name":"_newProxyTo","internalType":"address"},{"type":"bytes","name":"data","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateImplementation","inputs":[{"type":"address","name":"_newProxyTo","internalType":"address"}]},{"type":"receive","stateMutability":"payable"}]

async function main() {  
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMaticPrices();

  //I need a function to show aave details
  await loadAaveDetails(App, "0x1d2a0E5EC8E5bBDCA5CB219e649B565d8e5c3360", TOKEN_ABI);
  
  hideLoading();
}

async function loadAaveDetails(App, tokenAddress, tokenAbi){
  const TOKEN_CONTRACT = await new ethers(tokenAddress, tokenAbi, App.provider);
  const symbol = TOKEN_CONTRACT.symbol();
  _print(`SYMBOL: ${symbol}`);
}