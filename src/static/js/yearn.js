
$(function() {
  consoleInit(main)
  });

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    /* 
      https://www.coingecko.com/en/coins/interest-bearing-bitcoin
      opote, to yearn vault exei underlying to wrapped ibBTC, to wrapped ibBTC exei underlying to ibBTC, to opoio exei price coingecko kanonika
      to provlima ara einai oti otan fortwnoume to wrapped ibBTC den to ypologizoume swsta san vault pou einai

      na vrw giati den vriskw price gia auta edw
      https://etherscan.io/token/0x5e69e8b51B71C8596817fD442849BD44219bb095
      https://etherscan.io/token/0x8b9C0c24307344B6D7941ab654b2Aeee25347473 this is not in coingecko in order to receive its price
      https://etherscan.io/token/0x595a68a8c9D5C230001848B69b1947ee2A607164
      https://etherscan.io/token/0x528D50dC9a333f01544177a924893FA1F5b9F748
      https://etherscan.io/token/0x28a5b95C101df3Ded0C0d9074DB80C438774B6a9
    */

    const ASSETS_CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"_registryAddress","type":"address"},{"internalType":"address","name":"_managementListAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"assetDeprecated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"assetsAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"assetsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"generatorInfo","outputs":[{"components":[{"internalType":"address","name":"id","type":"address"},{"internalType":"string","name":"typeId","type":"string"},{"internalType":"string","name":"categoryId","type":"string"}],"internalType":"struct AddressesGenerator_VAULT_V2.GeneratorInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPositionSpenderAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"managementList","outputs":[{"internalType":"contract ManagementList","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numberOfDeprecatedAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"positionSpenderAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract IV2Registry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"assetAddress","type":"address"},{"internalType":"bool","name":"newDeprecationStatus","type":"bool"}],"name":"setAssetDeprecated","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"}],"name":"setPositionSpenderAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const ASSETS_ADDRESS = "0x437758D475F70249e03EDa6bE23684aD1FC375F0"
    const ASSETS_CONTRACT = new ethcall.Contract(ASSETS_ADDRESS, ASSETS_CONTRACT_ABI);

    //const [vaultAddresses] = await App.ethcallProvider.all([ASSETS_CONTRACT.assetsAddresses()]);
    const vaultAddresses = ["0x5e69e8b51B71C8596817fD442849BD44219bb095", 
                            "0x8b9C0c24307344B6D7941ab654b2Aeee25347473", 
                            "0x595a68a8c9D5C230001848B69b1947ee2A607164",
                            "0x528D50dC9a333f01544177a924893FA1F5b9F748",
                            "0x28a5b95C101df3Ded0C0d9074DB80C438774B6a9"]

    const tokens = {};
    let prices = {}
    const vaults = await Promise.all(vaultAddresses.map(a => getToken(App, a, App.YOUR_ADDRESS)));
    const newTokens = vaults.map(v => v.tokens).flat().concat(["0xc4e15973e6ff2a35cc804c2cf9d2a1b817a8b40f"]);
    await getNewPricesAndTokens(App, tokens, prices, newTokens, App.YOUR_ADDRESS);
    prices["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"] = getParameterCaseInsensitive(prices, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
    const poolPrices = vaults.map(v => tryGetPoolPrices(tokens, prices, v, "eth"));

    let staked_tvl = 0, userTvl = 0
    for(let i = 0; i < vaults.length; i++){
      if(!poolPrices[i]){
        continue;
      }
      else{
       await printYearnContract(vaults[i], poolPrices[i]); 
      }
      if (!isNaN(poolPrices[i].staked_tvl)) staked_tvl += poolPrices[i].staked_tvl;
      if (!isNaN(vaults[i].userStaked * poolPrices[i].price)) userTvl += vaults[i].userStaked * poolPrices[i].price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(staked_tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }

    hideLoading();
  }

  async function printYearnContract(vault, poolPrice) {
    poolPrice.print_price();
    var userStakedUsd = vault.staked * poolPrice.price;
    var userStakedPct = userStakedUsd / poolPrice.tvl * 100;
    _print(`You are staking ${vault.staked.toFixed(4)} ${poolPrice.stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    if (vault.staked > 0) {
      _print(`Your stake comprises of ${vault.staked * vault.ppfs} ${vault.token.symbol}.`)
    }
    _print("");
  }

function tryGetPoolPrices(tokens, prices, pool, chain = "eth"){
  try {
    const poolPrice = getPoolPrices(tokens, prices, pool, chain = "eth")
    return poolPrice;
  }catch(err){
    console.log(pool.address, err);
    return null;
  }
}