$(function() {
consoleInit(main)
  });

  const ASSET_VAULT_ABI = [{"inputs":[{"internalType":"contract ERC20","name":"_asset","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address","name":"_aggregateVault","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"assets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"DepositsPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"DepositsUnpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"assets","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"WithdrawalsPaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"WithdrawalsUnpaused","type":"event"},{"inputs":[],"name":"AUTH","outputs":[{"internalType":"contract Auth","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aggregateVault","outputs":[{"internalType":"contract AggregateVault","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"asset","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_burnAmount","type":"uint256"}],"name":"burnShares","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"key","type":"uint256"}],"name":"cancelRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"convertToAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"convertToShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"},{"internalType":"uint256","name":"minOutAfterFees","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"depositPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"},{"internalType":"uint256","name":"minOutAfterFees","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"callback","type":"address"}],"name":"depositWithCallback","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_assetAmount","type":"uint256"},{"internalType":"address","name":"feeReciever","type":"address"},{"internalType":"uint256","name":"_depositFees","type":"uint256"}],"name":"lodgeAssets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"maxDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"maxMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"maxRedeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"maxWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"},{"internalType":"address","name":"_toAddress","type":"address"}],"name":"mintTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauseDepositWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pauseDeposits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pauseWithdrawals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pps","outputs":[{"internalType":"uint256","name":"pricePerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"previewDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"size","type":"uint256"}],"name":"previewDepositFee","outputs":[{"internalType":"uint256","name":"totalDepositFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"previewMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"}],"name":"previewRedeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"previewVaultCap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"name":"previewWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"size","type":"uint256"}],"name":"previewWithdrawalFee","outputs":[{"internalType":"uint256","name":"totalWithdrawalFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"minOutAfterFees","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"minOutAfterFees","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"callback","type":"address"}],"name":"redeemWithCallback","outputs":[{"internalType":"uint256","name":"assets","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amt","type":"uint256"}],"name":"returnAssets","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amt","type":"uint256"}],"name":"returnShares","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAssets","outputs":[{"internalType":"uint256","name":"totalValueLocked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpauseDepositWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpauseDeposits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpauseWithdrawals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract AggregateVault","name":"_newAggregateVault","type":"address"}],"name":"updateAggregateVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawalPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
  
  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const vaults = ["0x959f3807f0aa7921e18c78b00b2819ba91e52fef",
                    "0x4bca8d73561aaeee2d3a584b9f4665310de1dd69",].map((a) => {
      return {
        address                 : a,
        abi                     : ASSET_VAULT_ABI,
        assetTokenFunction      : "asset"
      }
    })

    let tokens = {};
    const prices = await getArbitrumPrices();

    let p = await loadUmamiPools(App, tokens, prices, vaults);
    _print_bold(`Total Staked: $${formatMoney(p.staked_tvl)}`);

    hideLoading();
  }

  async function loadUmamiPools(App, tokens, prices, vaults) {
    let totalStaked  = 0;
    const infos = await Promise.all(vaults.map(p =>
      loadUmamiPoolInfo(App, tokens, prices, p.abi, p.address, p.assetTokenFunction)));
    for (const i of infos) {
      let p = await printUmamiPool(App, i);
      totalStaked += p.staked_tvl || 0;
    }
    return { staked_tvl : totalStaked };
  }
  
  async function loadUmamiPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, assetTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

      const assetTokenAddress = await STAKING_POOL.callStatic[assetTokenFunction]();
  
      const vaultTokenAddress = stakingAddress;
      const assetToken = await getToken(App, assetTokenAddress, stakingAddress);
      const vaultToken = await getToken(App, stakingAddress, stakingAddress);
      const totalVaultTokens = await STAKING_POOL.totalSupply() / 10 ** vaultToken.decimals;
      const totalAssetTokens = await STAKING_POOL.totalAssets() / 10 ** assetToken.decimals;
  
      const assetTokenTicker = assetToken.symbol;
      const vaultTokenTicker = vaultToken.symbol;

      const pps = await STAKING_POOL.pps() / 10 ** vaultToken.decimals; //price per share
  
      const assetTokenPrice = getParameterCaseInsensitive(prices, assetTokenAddress)?.usd;
      const vaultTokenPrice = assetTokenPrice * pps;
  
      const staked_tvl = totalAssetTokens * assetTokenPrice;
      const staked_vault_token_tvl = totalVaultTokens * vaultTokenPrice;

      const _userStakedVaultTokens = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS);
      const userStakedVaultTokens = _userStakedVaultTokens / 10 ** vaultToken.decimals;
      const _userStakedAssetsTokens = await STAKING_POOL.convertToShares(_userStakedVaultTokens);
      const userStakedAssetsTokens = _userStakedAssetsTokens / 10 ** assetToken.decimals;
  
      const userUnstaked = assetToken.unstaked;
  
      return  {
        stakingAddress,
        assetTokenAddress,
        vaultTokenAddress,
        assetTokenTicker,
        vaultTokenTicker,
        assetTokenPrice,
        vaultTokenPrice,
        userUnstaked,
        totalVaultTokens,
        totalAssetTokens,
        staked_vault_token_tvl,
        staked_tvl,
        userStakedVaultTokens,
        userStakedAssetsTokens,
      }
  }

  async function printUmamiPool(App, info, chain="eth", customURLs) {
    _print(`Staked: ${info.totalAssetTokens.toFixed(4)} ${info.assetTokenTicker} ($${formatMoney(info.staked_tvl)})`);
    _print(`For: ${info.totalVaultTokens.toFixed(6)} ${info.vaultTokenTicker} ($${formatMoney(info.staked_vault_token_tvl)})`);
    _print(`You are staking: ${info.userStakedAssetsTokens.toFixed(4)} ${info.assetTokenTicker} ($${formatMoney(info.userStakedAssetsTokens * info.assetTokenPrice)})`);
    _print(`For: ${info.userStakedVaultTokens.toFixed(6)} ${info.vaultTokenTicker} ($${formatMoney(info.userStakedVaultTokens * info.vaultTokenPrice)})`);
    _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}#code">Arbiscan</a>`);
    _print("");
    return {
        staked_tvl: info.staked_tvl
    }
}