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
  let tvl = 0, userTvl = 0
  for(const p of poolInfos.filter(p => p))
  {
    printRubiconContract(p);
    if (!isNaN(p.underlyingDepositTokensUSD)) tvl += p.underlyingDepositTokensUSD;
    if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
  }
  //_print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
  if (userTvl > 0) {
    _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
  }

  hideLoading();
}

async function loadRubiconPoolInfo(App, tokens, prices, contractAddress) {
  try {
    const contract = await new ethers.Contract(contractAddress, RUBICON_VAULT_ABI, App.provider);
    const vault = await getOptimisticToken(App, contractAddress, App.YOUR_ADDRESS);
    const underlyingAddress = await contract.underlying();
    const underlyingToken = await getOptimisticToken(App, underlyingAddress, App.YOUR_ADDRESS);
    var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
      tokens[address] = await getOptimisticToken(App, address, contractAddress);
    }
    const totalSupply = await contract.totalSupply() / 10 ** underlyingToken.decimals;/// 10 ** vault.decimals;
    const totalDeposits = await contract.underlyingBalance() / 10 ** underlyingToken.decimals;
    const ppfs = totalDeposits / totalSupply;
    const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 10 ** vault.decimals;
    const poolPrices = getPoolPrices(tokens, prices, vault, "optimistic");
    const underlyingDepositTokensUSD = totalDeposits * poolPrices.price;
    return { vault, poolPrices, userStaked, ppfs, totalSupply, totalDeposits, underlyingDepositTokensUSD }
  }
  catch (err) {
    console.log(err)
  }
}

async function printRubiconContract(poolInfo) {
  const poolPrices = poolInfo.poolPrices;
  _print(`${poolPrices.name} Price: $${formatMoney(poolPrices.price)} TVL: $${formatMoney(poolPrices.tvl)}`);
  var userStakedUsd = poolInfo.userStaked * poolPrices.price;
  var userStakedPct = userStakedUsd / poolPrices.tvl * 100;
  let underlyingDepositTokensUSD = poolInfo.totalDeposits * poolPrices.price;
  _print(`Total Staked: ${poolInfo.totalSupply.toFixed(4)} ${poolInfo.vault.symbol} (${poolInfo.totalDeposits.toFixed(4)} ${poolInfo.vault.token.symbol}), $${formatMoney(underlyingDepositTokensUSD)}`);
  _print(`You are staking ${poolInfo.userStaked.toFixed(4)} ${poolPrices.name} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  if (poolInfo.userStaked > 0) {
    _print(`Your stake comprises of ${poolInfo.userStaked * poolInfo.ppfs} ${poolInfo.vault.token.symbol}.`)
  }
  _print("");
}