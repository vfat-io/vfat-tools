$(function() {
  consoleInit(main)
});

const Address = [
  '0x7864BA11676B8cc286a7367b3cfd504968920B3a',
  '0xf285108D3aa4DC9041364b64297979979a7Ec7B9',
  '0x1C3e7f51A9D24e813fA7C2614713b727a4DA1a56',
  '0xee589bc5e65e7e43199e9b0701768ada3cef8bce',
  '0xbde8b37161a87ca84da6c06874aa1e8f7ae05703',
  '0x47a156668F1Ecc659Efbbf4910508Ace1b46a49b',
  '0xdc2d66044E894d0726570BDc03d2123ab8F2Cd51'
]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const prices = await getArbitrumPrices();
  const tokens = {};
  const poolInfos = await Promise.all(Address.map(a => loadARBISPoolInfo(App, tokens, prices, a)));
  let tvl = 0, userTvl = 0
  for(const p of poolInfos.filter(p => p))
  {
    printARBISContract(p);
    if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
    if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
  }
  _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
  if (userTvl > 0) {
    _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
  }

  hideLoading();
}

async function loadARBISPoolInfo(App, tokens, prices, contractAddress) {
  try {
    const contract = await new ethers.Contract(contractAddress, ARBIS_VAULT_UNDERLYING_ABI, App.provider);
    const vault = await getArbitrumToken(App, contractAddress, App.YOUR_ADDRESS);
    var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
      tokens[address] = await getArbitrumToken(App, address, contractAddress);
    }
    const totalSupply = await contract.totalSupply() / 1e18;
    const totalDeposits = await contract.totalDeposits() / 1e18;
    const ppfs = totalDeposits / totalSupply;
    const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const poolPrices = getPoolPrices(tokens, prices, vault, "arbitrum");
    return { vault, poolPrices, userStaked, ppfs, totalSupply, totalDeposits }
  }
  catch (err) {
    const contract = await new ethers.Contract(contractAddress, ARBIS_VAULT_UNDERLYING_ABI2, App.provider);
    const vault = await getArbitrumToken(App, contractAddress, App.YOUR_ADDRESS);
    var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
      tokens[address] = await getArbitrumToken(App, address, contractAddress);
    }
    const totalSupply = await contract.totalSupply() / 1e18;
    const totalDeposits = await contract.totalDeposits() / 1e18;
    const ppfs = totalDeposits / totalSupply;
    const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const poolPrices = getPoolPrices(tokens, prices, vault, "arbitrum");
    return { vault, poolPrices, userStaked, ppfs, totalSupply, totalDeposits }
  }
}

async function printARBISContract(poolInfo) {
  const poolPrices = poolInfo.poolPrices;
  _print(`${poolPrices.name} Price: $${formatMoney(poolPrices.price)} TVL: $${formatMoney(poolPrices.tvl)}`);
  var userStakedUsd = poolInfo.userStaked * poolPrices.price;
  var userStakedPct = userStakedUsd / poolPrices.tvl * 100;
  let underlyingDepositTokensUSD = poolInfo.totalDeposits * poolPrices.price;
  _print(`Total Staked: ${poolInfo.totalSupply.toFixed(4)} ${poolInfo.vault.name} (${poolInfo.totalDeposits.toFixed(4)} ${poolPrices.name}), $${formatMoney(underlyingDepositTokensUSD)}`);
  _print(`You are staking ${poolInfo.userStaked.toFixed(4)} ${poolPrices.name} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  if (poolInfo.userStaked > 0) {
    _print(`Your stake comprises of ${poolInfo.userStaked * poolInfo.ppfs} ${poolInfo.vault.token.symbol}.`)
  }
  _print("");
}