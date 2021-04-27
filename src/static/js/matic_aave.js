
$(function() {
  consoleInit();
  start(main);
});

const TOKEN_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"childChainManager","internalType":"address"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"MetaTransactionExecuted","inputs":[{"type":"address","name":"userAddress","internalType":"address","indexed":false},{"type":"address","name":"relayerAddress","internalType":"address payable","indexed":false},{"type":"bytes","name":"functionSignature","internalType":"bytes","indexed":false}],"anonymous":false},{"type":"event","name":"RoleAdminChanged","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32","indexed":true},{"type":"bytes32","name":"previousAdminRole","internalType":"bytes32","indexed":true},{"type":"bytes32","name":"newAdminRole","internalType":"bytes32","indexed":true}],"anonymous":false},{"type":"event","name":"RoleGranted","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32","indexed":true},{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"address","name":"sender","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"RoleRevoked","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32","indexed":true},{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"address","name":"sender","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"CHILD_CHAIN_ID","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes","name":"","internalType":"bytes"}],"name":"CHILD_CHAIN_ID_BYTES","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DEFAULT_ADMIN_ROLE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DEPOSITOR_ROLE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"ERC712_VERSION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"ROOT_CHAIN_ID","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes","name":"","internalType":"bytes"}],"name":"ROOT_CHAIN_ID_BYTES","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"address","name":"user","internalType":"address"},{"type":"bytes","name":"depositData","internalType":"bytes"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"bytes","name":"","internalType":"bytes"}],"name":"executeMetaTransaction","inputs":[{"type":"address","name":"userAddress","internalType":"address"},{"type":"bytes","name":"functionSignature","internalType":"bytes"},{"type":"bytes32","name":"sigR","internalType":"bytes32"},{"type":"bytes32","name":"sigS","internalType":"bytes32"},{"type":"uint8","name":"sigV","internalType":"uint8"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getChainId","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"getDomainSeperator","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"nonce","internalType":"uint256"}],"name":"getNonce","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"getRoleAdmin","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getRoleMember","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"uint256","name":"index","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRoleMemberCount","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"grantRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"hasRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]

const ATokenAddresses = [
  "0x27F8D03b3a2196956ED754baDc28D73be8830A6e", //DAI
  "0x1a13F4Ca1d028320A707D99520AbFefca3998b7F", //USDC  6 decimals
  "0x60D55F02A771d515e077c9C2403a1ef324885CeC", //USDT  6 decimals
  "0x5c2ed810328349100A66B82b78a1791B101C9D61", //WBTC  8 decimals
  "0x28424507fefb6f7f8E9D3860F56504E4e5f5f390", //WETH
  "0x8dF3aad3a84da6b69A4DA8aeC3eA40d9091B2Ac4", //WMATIC
  "0x1d2a0E5EC8E5bBDCA5CB219e649B565d8e5c3360"  //AAVE
]

const BorrowedTokenAddresses = [
  "0x75c4d1Fb84429023170086f06E682DcbBF537b7d", //DAI
  "0x248960A9d75EdFa3de94F7193eae3161Eb349a12", //USDC  6 decimals
  "0x8038857FD47108A07d1f6Bf652ef1cBeC279A2f3", //USDT  6 decimals
  "0xF664F50631A6f0D72ecdaa0e49b0c019Fa72a8dC", //WBTC  8 decimals
  "0xeDe17e9d79fc6f9fF9250D9EEfbdB88Cc18038b5", //WETH
  "0x59e8E9100cbfCBCBAdf86b9279fa61526bBB8765", //WMATIC
  "0x1c313e9d0d826662F5CE692134D938656F681350"  //AAVE
]

async function main() {  
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMaticPrices();

  for(let i = 0; i < ATokenAddresses.length; i++){
    await loadAaveDetails(App, ATokenAddresses[i], BorrowedTokenAddresses[i], TOKEN_ABI);
  }
  
  hideLoading();
}

async function loadAaveDetails(App, aTokenAddress, borrowedTokenAddress, tokenAbi){
  const ATOKEN_CONTRACT = new ethers.Contract(aTokenAddress, tokenAbi, App.provider);
  const BTOKEN_CONTRACT = new ethers.Contract(borrowedTokenAddress, tokenAbi, App.provider);
  const aSymbol = await ATOKEN_CONTRACT.symbol();
  const aDecimals = await ATOKEN_CONTRACT.decimals();
  const aTotalSupply = await ATOKEN_CONTRACT.totalSupply() / 10 ** aDecimals;
  const aBalanceOf = await ATOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS) / 10 ** aDecimals;
  const aPct = aBalanceOf / aTotalSupply * 100;
  const bSymbol = await BTOKEN_CONTRACT.symbol();
  const bDecimals = await BTOKEN_CONTRACT.decimals();
  const bTotalSupply = await BTOKEN_CONTRACT.totalSupply() / 10 ** bDecimals;
  const bBalanceOf = await BTOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS) / 10 ** bDecimals;
  const bPct = bBalanceOf / bTotalSupply * 100;
  _print(`${aSymbol} - ${bSymbol}`);
  _print(`There is a total of ${formatMoney(aTotalSupply)} ${aSymbol} supplied.`);
  _print(`You are supplying ${formatMoney(aBalanceOf)} ${aSymbol}, ${aPct.toFixed(2)}% of the pool.`)
  _print(`There is a total of ${formatMoney(bTotalSupply)} ${bSymbol} borrowed.`);
  _print(`You are borrowing ${formatMoney(bBalanceOf)} ${bSymbol}, ${bPct.toFixed(2)}% of the pool.\n`)
}