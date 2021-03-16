$(function() {
    consoleInit();
    start(main);
  });

async function main() {  
  const App = await init_ethers();
  const tokens = {}

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const USF_POOL_ADDRESS = "0x1fbf001792e8cc747a5cb4aedf8c26b7421147e7";
  const USF_ADDRESS = "0xe0e05c43c097b0982db6c9d626c4eb9e95c3b9ce";
  const lpToken = await getToken(App, USF_POOL_ADDRESS, "0x0000000000000000000000000000000000000000")
  
  var prices = await lookUpTokenPrices(lpToken.tokens);

  await Promise.all(lpToken.tokens.map(async (address) => {
      tokens[address] = await getToken(App, address, "0x0000000000000000000000000000000000000000");
  }));

  const poolPrices = getPoolPrices(tokens, prices, lpToken, "eth")
  const usfPrice = getParameterCaseInsensitive(prices, USF_ADDRESS).usd;

  _print("Finished reading smart contracts.\n");
  
  poolPrices.print_price();
  var userPct = lpToken.unstaked / lpToken.totalSupply;
  var q0user = userPct * lpToken.q0 / 1e18;
  var q1user = userPct * lpToken.q1 / 1e18;
  _print(`Your LP tokens comprise of ${q0user.toFixed(2)} ${poolPrices.t0.symbol} + ${q1user.toFixed(2)} ${poolPrices.t1.symbol}`);

  const USF_PER_BLOCK = 2.2
  const rewardsPerWeek = USF_PER_BLOCK * SecondsPerDay * 7 / 13.5;

  printAPR("USF", usfPrice, rewardsPerWeek, "USF-ETH LP", poolPrices.tvl, lpToken.unstaked,
    poolPrices.price, 2);
  
  hideLoading();  
}