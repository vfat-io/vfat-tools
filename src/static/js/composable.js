$(function () {
    consoleInit(main);
});

async function main() {

    const strategies = [
        { address: "0x4A03ea61E543eC7141a3f90128B0c0c9514F8737", name: "L1 Ethereum - DAI", link: "https://app.composable.finance/strategies/daiharvest?action=deposit" },
        { address: "0xF12dA8470E2643cCb39a157e8577D9AA586a488f", name: "L1 Ethereum - USDC", link: "https://app.composable.finance/strategies/usdcharvest?action=deposit" },
        { address: "0x1941441d31809e9E1828Da0cE6d44175F657E215", name: "L1 Ethereum - USDT", link: "https://app.composable.finance/strategies/usdtharvest?action=deposit" }];



    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");


    _print(`\n`);

    _print(`------------------ Strategies ------------------`);
    _print(`<a target="_blank" href="https://app.composable.finance/portfolio">Portfolio</a>`);
    _print(`<a target="_blank" href="https://docs.composable.finance/">Docs</a>`);
    _print(`\n`);

    for (const strategy of strategies) {
        await load(App, strategy.address, strategy.name, strategy.link);
    }


    hideLoading();
}

async function load(App, stakingAddress, name, link) {
    _print(`<a target="_blank" href="${link}">${name}</a>`);

    const strategy = new ethers.Contract(stakingAddress, COMPOSABLE_ABI, App.provider);

    const pATAddress = await strategy.receiptToken();
    const stakeTokenAddress = await strategy.token();
    var underlyingToken = await getToken(App, stakeTokenAddress, stakingAddress);
    var underlyingTokenDecimals = underlyingToken.decimals;
    var underlyingTokenName = underlyingToken.name;
    var underlyingTokenSymbol = underlyingToken.symbol;

    var receiptToken = await getToken(App, pATAddress, stakingAddress);
    var receiptTokenSymbol = receiptToken.symbol;

    const userInfo = await strategy.userInfo(App.YOUR_ADDRESS);
    console.log(`userInfo: ${userInfo}`);
    var stakedAmount = userInfo.amountToken / (10 ** underlyingTokenDecimals);
    var treasuryEth = userInfo.userTreasuryEth / (10 ** 18);
    var collectedFees = userInfo.userCollectedFees / (10 ** 18);

    _print(`Staking token: ${stakeTokenAddress} (${underlyingTokenName})`);
    _print(`Parachain Auction Token: ${pATAddress} (${receiptTokenSymbol})`);
    _print(`Staked amount: ${stakedAmount} (${underlyingTokenSymbol})`);
    _print(`Sent to treasury so far: ${treasuryEth} (ETH)`);
    _print(`Collected fees so far: ${collectedFees} (ETH)`);
    _print(`<a target="_blank" href="${link}">  ---> Deposit/Withdraw</a>`);


    _print(`\n`);
}
