$(function() {
    consoleInit(main)
});

const FRENSFI_VAULT = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_controller","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"reserve","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"max","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"min","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_controller","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const vaults = [
    {
        "name": "[WFTM]-[USDC] Spooky LP",
        "want": "0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c",
        "vault": "0xbaDc0De21194478a78581e319d053ffe4a479947",
        "strategy": "0xbADC0De10627fcf0090f8996F9669CD9201751b7",
        "coins": [
            "fantom",
            "usd-coin"
        ]
    },
    {
        "name": "[WFTM]-[SCREAM] Spooky LP",
        "want": "0x30872e4fc4edbFD7a352bFC2463eb4fAe9C09086",
        "vault": "0xbadc0dE67579D383d993c2138b6fDF99355d40DD",
        "strategy": "0xbADC0dEe94f6dC40ac4B396B567D416CF06EE6CD",
        "coins": [
            "fantom",
            "scream"
        ]
    },
    {
        "name": "[WFTM]-[BOO] Spooky LP",
        "want": "0xEc7178F4C41f346b2721907F5cF7628E388A7a58",
        "vault": "0xBADC0DEd70004e5c11D1589320043519134b46b3",
        "strategy": "0xbADc0dEB6Aff0C9FDdcC63Da566c34bF91236a0a",
        "coins": [
            "fantom",
            "spookyswap"
        ]
    }
];

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    let coins = [];
    vaults.forEach(vault => {
        vault.coins.forEach(coin => {
            if (!coins.includes(coin)) coins.push(coin);
        });
    });
    let prices = await lookUpPrices(coins);
    let vaultInfo = await Promise.all(vaults.map(v => loadFrensVault(App, v, prices)));
    for(const v of vaultInfo.filter(v => v)) {
        printFrensVault(v);
    }
    hideLoading();
}

async function loadFrensVault(App, vault, prices) {
    const want = await new ethers.Contract(vault.want, ERC20_ABI, App.provider);
    const vaultContract = await new ethers.Contract(vault.vault, FRENSFI_VAULT, App.provider);
    const wantDec = await want.decimals();
    const vaultDec = await vaultContract.decimals();
    let userWantBal = await want.balanceOf(App.YOUR_ADDRESS) / 10**wantDec;
    let userStakedBal = await vaultContract.balanceOf(App.YOUR_ADDRESS) / 10**vaultDec;
    let totalStaked = await vaultContract.balance() / 10**vaultDec;
    let share = ((userStakedBal / totalStaked) * 100).toFixed(3);
    if(isNaN(share)) share = 0;
    userWantBal = toNormalForm(userWantBal);
    userStakedBal = toNormalForm(userStakedBal);
    let coinPrices = {};
    vault.coins.forEach(coin => {
        coinPrices[coin] = prices[coin];
    });
    return { name: vault.name, userWantBal, userStakedBal, share, coinPrices };
}

function printFrensVault(vault) {
    _print_bold(`${vault.name}`);
    for (let [key, value] of Object.entries(vault.coinPrices)) {
        _print(`${key.toUpperCase()}: $${formatAmount(value.usd)}`);
    }
    _print(`Balance: ${vault.userWantBal} ${vault.name}`);
    _print(`Staking: ${vault.userStakedBal} ${vault.name}, ${vault.share}% of the pool`);
    _print("");
}

function toNormalForm(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var ex = parseInt(x.toString().split('+')[1]);
      if (ex > 20) {
          ex -= 20;
          x /= Math.pow(10,ex);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
}

function formatAmount(amount) {
    if(!amount || isNaN(amount)) return;
    return amount.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}