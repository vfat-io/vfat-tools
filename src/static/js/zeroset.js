$(function() {
consoleInit(main)
});

/*
Parameters : {
    BootstrappingPeriod : 126,
    BootstrappingPrice = 1.32,
    EpochPeriod = 14400,
    DaoLockupPeriods = 24,
    PoolLockupPeriods = 9,
    PoolRatio = 0.3,
    DaoRatio = 0.7
            SupplyChangeLimit = 0.06,
            SupplyChangeDivisor = 9
}
*/

async function main() {
    const params = Contracts.ZSD.Parameters;
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DAO = new ethers.Contract(Contracts.ZSD.DAO.address,
        Contracts.ZSD.DAO.abi, App.provider);
    const DOLLAR = new ethers.Contract(Contracts.ZSD.Dollar.address,
        ERC20_ABI, App.provider);
    var prices = {};
    var tokens = {};

    const [epoch, uniPrices, totalBonded] = await loadDAO(App, DAO, DOLLAR, Contracts.ZSD.UniswapLP.address,
        Contracts.ZSD.LPIncentivizationPool.address, tokens, prices, params.DaoLockupPeriods);

    const LP = new ethers.Contract(Contracts.ZSD.LPIncentivizationPool.address,
        Contracts.ZSD.LPIncentivizationPool.abi, App.provider);
    await loadEmptySetLP(App, LP, Contracts.ZSD.UniswapLP.address,
        "ZSD-USDC LP", params.PoolLockupPeriods, epoch, "ZSD", uniPrices);

    const dollarPrice = getParameterCaseInsensitive(prices, DOLLAR.address).usd;

    const calcPrice = twap => Math.min((twap - 1) / params.SupplyChangeDivisor, params.SupplyChangeLimit);

    if (epoch < params.BootstrappingPeriod) { //bootstrapping
        const twap = params.BootstrappingPrice;
        await calculateDollarAPR(DAO, params, twap, dollarPrice, uniPrices, totalBonded, calcPrice);
    }
    else {
        const resp = await fetch('https://api.vfat.tools/twap/' + Contracts.ZSD.UniswapLP.address);
        const text = await resp.text();
        const array = text.split("\n");
        if (array.length > 0) {
            const [oldPrice0, , oldTimestamp] = array[array.length - 2].split(' ') //last line is blank
            const [price0, , timestamp] = await getCurrentPriceAndTimestamp(App, Contracts.ZSD.UniswapLP.address);
            const twap = await calculateTwap(oldPrice0, oldTimestamp, price0, timestamp, 12);
            _print(`TWAP: ${twap}\n`);

            if (twap > 1.05) {
                await calculateDollarAPR(DAO, Contracts.ZSD.Parameters, twap, dollarPrice, uniPrices, calcPrice);
            }
            else {
                _print(`DAO APY: Day 0% Week 0% Year 0%`)
                _print(`LP APR: Day 0% Week 0% Year 0%`)
            }
        }
    }
    _print(`\nDAO Unbonds`)
    await printDaoUnbonds(App.provider, DAO, epoch + 1, params.DaoLockupPeriods, params.EpochPeriod);
    _print(`\LP Unbonds`)
    await printLPUnbonds(App.provider, LP, epoch + 1, params.PoolLockupPeriods, params.EpochPeriod);
    hideLoading();
}
