$(function() {
  consoleInit(main)
  });

const Address = [
    "0xD3D13a578a53685B4ac36A1Bab31912D2B2A2F36",
    "0x04bDA0CF6Ad025948Af830E75228ED420b0e860d",
    "0x8858A739eA1dd3D80FE577EF4e0D03E88561FaA3",
    "0x1b429e75369EA5cD84421C1cc182cee5f3192fd3",
    "0xa760e26aA76747020171fCF8BdA108dFdE8Eb930"
  ]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    _print("");

    const tokens = {};
    const poolInfos = await Promise.all(Address.map(a => loadTokemakPoolInfo(App, tokens, a)));
    let tvl = 0, userTvl = 0
    for(const p of poolInfos.filter(p => p))
    {
      printTokemakContract(p);
      if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
      if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
    }
    _print_bold(`Total Value Locked: $${formatMoney(tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }

    hideLoading();
  }

  async function loadTokemakPoolInfo(App, tokens, contractAddress) {
    try {
      const contract = await new ethers.Contract(contractAddress, TOKEMAK_VAULT_ABI, App.provider);
      const vault = await getToken(App, contractAddress, App.YOUR_ADDRESS);
      var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
      var prices = await lookUpTokenPrices(newTokenAddresses);
      for (const address of newTokenAddresses) {
          tokens[address] = await getToken(App, address, contractAddress);
      }
      const totalSupply = await contract.totalSupply() / 1e18;
      const balance = await contract.withheldLiquidity() / 1e18;
      const ppfs = balance / totalSupply;
      const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
      const poolPrices = getPoolPrices(tokens, prices, vault, "eth");
      return { vault, poolPrices, userStaked, ppfs, totalSupply }
    }
    catch (err) {
      console.log(contractAddress, err);
      return null;
    }
  }

  async function printTokemakContract(poolInfo) {
    const poolPrices = poolInfo.poolPrices;
    _print(`${poolPrices.name} Price: $${formatMoney(poolPrices.price)} TVL: $${formatMoney(poolPrices.tvl)}`);
    var userStakedUsd = poolInfo.userStaked * poolPrices.price;
    var userStakedPct = userStakedUsd / poolPrices.tvl * 100;
    _print(`You are staking ${poolInfo.userStaked.toFixed(4)} ${poolPrices.name} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    if (poolInfo.userStaked > 0) {
      _print(`Your stake comprises of ${poolInfo.userStaked * poolInfo.ppfs} ${poolInfo.vault.token.symbol}.`)
    }
    _print("");
  }
