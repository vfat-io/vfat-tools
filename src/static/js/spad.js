$(function() {
    consoleInit();
    start(main);
});

/*
Parameters : {
            BootstrappingPeriod : 180,
            BootstrappingPrice : 1.10,
            BootstrappingSupplyChangeLimit : 0.1,
            EpochPeriod : 14400,
            DaoLockupPeriods : 30,
            PoolLockupPeriods : 10,
            PoolRatio : 0.2,
            DaoRatio : 0.755,
            SupplyChangeLimit : 0.03,
            CouponSupplyChangeLimit : 0.06,
            GrowthThreshold : 1.0
}
*/

const calculateChange = (params, totalCoupons, totalRedeemable, price) => {
    if (price > 1 + params.CouponSupplychangeLimit && totalCoupons > totalRedeemable) {
        return params.CouponSupplychangeLimit
    } else if (
        1 + params.CouponSupplychangeLimit >= price &&
        price > 1 + params.SupplyChangeLimit &&
        totalCoupons > totalRedeemable
    ) {
        return Math.abs(price - 1)
    } else if (price > 1 + params.SupplyChangeLimit) {
        return params.SupplyChangeLimit
    } else if (price < 1 - params.SupplyChangeLimit) {
        return params.SupplyChangeLimit
    } else {
        return Math.abs(price - 1)
    }
}

async function main() {  
    const params = Contracts.SPAD.Parameters;
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DAO = new ethers.Contract(Contracts.SPAD.DAO.address, 
        Contracts.SPAD.DAO.abi, App.provider);
    const DOLLAR = new ethers.Contract(Contracts.SPAD.Dollar.address,
        ERC20_ABI, App.provider);
    var prices = {};
    var tokens = {};

    const [epoch, uniPrices, totalBonded] = await loadDAO(App, DAO, DOLLAR, Contracts.SPAD.UniswapLP.address,
        Contracts.SPAD.LPIncentivizationPool.address, tokens, prices, params.DaoLockupPeriods);

    const LP = new ethers.Contract(Contracts.SPAD.LPIncentivizationPool.address,
        Contracts.SPAD.LPIncentivizationPool.abi, App.provider);
    await loadEmptySetLP(App, LP, Contracts.SPAD.UniswapLP.address, 
        "SPAD-USDC LP", params.PoolLockupPeriods, epoch, "SPAD", uniPrices);
    
    const dollarPrice = getParameterCaseInsensitive(prices, DOLLAR.address).usd;

    const totalCoupons = await DAO.totalCoupons();
    const totalRedeemable = await DAO.totalRedeemable
    const calcPrice = twap => calculateChange(params, totalCoupons, totalRedeemable, twap)

    if (epoch < params.BootstrappingPeriod) { //bootstrapping
        const twap = params.BootstrappingPrice;      
        await calculateDollarAPR(DAO, params, twap, dollarPrice, uniPrices, totalBonded, calcPrice);
    }
    else {
        const resp = await fetch('https://api.vfat.tools/twap/' + Contracts.SPAD.UniswapLP.address);
        const text = await resp.text();
        const array = text.split("\n");
        if (array.length > 0) {
            const [, oldPrice1, oldTimestamp] = array[array.length - 2].split(' ') //last line is blank
            const [, price1, timestamp] = await getCurrentPriceAndTimestamp(App, Contracts.SPAD.UniswapLP.address);
            const twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, 12);
            _print(`TWAP: ${twap}\n`);

            if (twap > 1 + params.GrowthThreshold) {
                await calculateDollarAPR(DAO, params, twap, dollarPrice, uniPrices, calcPrice);
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