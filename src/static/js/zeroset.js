$(function() {
    consoleInit();
    start(main);
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

function calcPrice(twap) {
    return Math.min((twap - 1) / 12, 0.06)
}

async function calculateAPR(DAO, parameters, twap, dollarPrice, uniPrices, totalBonded, calculateChange) {
    const totalCoupons = await DAO.totalCoupons() / 1e18;
    const totalRedeemable = await DAO.totalRedeemable() / 1e18;
    const totalNet = await DAO.totalNet() / 1e18;

    const lpReward = parameters.PoolRatio;
    const daoReward = parameters.DaoRatio;
    // Get price
    const calcPrice = calculateChange(twap, totalCoupons, totalRedeemable)

    // Calulcate the outstanding commitments so we can remove it from the rewards
    const totalOutstanding = totalCoupons - totalRedeemable

    const maxRewards = totalNet * calcPrice * daoReward;

    const daoRewards = maxRewards - totalOutstanding

    if (daoRewards > 0) {
        const bondedReturn = daoRewards / totalBonded * 100 * 24; //24 epochs per day

        _print(`DAO APR: Day ${bondedReturn.toFixed(2)}% Week ${(bondedReturn * 7).toFixed(2)}% Year ${(bondedReturn * 365).toFixed(2)}%`)

    } else {
        _print(`DAO APR: Day 0% Week 0% Year 0%`)
    }
    // Calculate total rewards allocated to LP
    const lpRewards = totalNet * calcPrice * lpReward
    const lpReturn = lpRewards * dollarPrice / uniPrices.staked_tvl * 100 * 24;

    _print(`LP  APR: Day ${lpReturn.toFixed(2)}% Week ${(lpReturn * 7).toFixed(2)}% Year ${(lpReturn * 365).toFixed(2)}%`)  
}

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
        await calculateAPR(DAO, params, twap, dollarPrice, uniPrices, totalBonded, calcPrice);
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
                await calculateAPR(DAO, Contracts.ZSD.Parameters, twap, dollarPrice, uniPrices, calcPrice);
            }
            else {
                _print(`DAO APR: Day 0% Week 0% Year 0%`)
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