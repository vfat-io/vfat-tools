$(function() {
  consoleInit(main)
});

const Address = [
  '0xe0e112e8f33d3f437d1f895cbb1a456836125952',
  '0x60daec2fc9d2e0de0577a5c708bcadba1458a833',
  '0xffbd695bf246c514110f5dae3fa88b8c2f42c411',
  '0xb0be5d911e3bd4ee2a8706cf1fac8d767a550497',
  '0x7571cc9895d8e997853b1e0a1521ebd8481aa186',
  '0xeb5f29afaaa3f44eca8559c3e8173003060e919f'
]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const prices = await getOptimisticPrices();
  const tokens = {};
  const poolInfos = await Promise.all(Address.map(a => loadRubiconPoolInfo(App, tokens, prices, a)));
  let tvl = 0;
  for(const p of poolInfos.filter(p => p))
  {
    printRubiconContract(p);
    if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
  }
  _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);

  hideLoading();
}

async function loadRubiconPoolInfo(App, tokens, prices, contractAddress) {
  try {
    const vault = await getOptimisticToken(App, contractAddress, App.YOUR_ADDRESS);
    var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
      tokens[address] = await getOptimisticToken(App, address, contractAddress);
    }
    const poolPrices = getPoolPrices(tokens, prices, vault, "optimistic");
    return { vault, poolPrices }
  }
  catch (err) {
    console.log(err)
  }
}

async function printRubiconContract(poolInfo) {
  const poolPrices = poolInfo.poolPrices;
  _print(`${poolPrices.name} `);
  var userStakedUsd = poolInfo.vault.unstaked * poolPrices.price;
  var userStakedPct = userStakedUsd / poolPrices.tvl * 100;
  const totalUnderlyingStaked = poolInfo.vault.staked
  const totalSupply = poolInfo.vault.totalSupply / 10 ** poolInfo.vault.token.decimals;
  _print(`Total Staked: ${totalSupply.toFixed(4)} ${poolInfo.vault.symbol} (${totalUnderlyingStaked.toFixed(4)} ${poolInfo.vault.token.symbol}), $${formatMoney(poolPrices.tvl)}`);
  _print(`You are staking ${poolInfo.vault.unstaked.toFixed(4)} ${poolPrices.name} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  _print("");
}