$(function() {
consoleInit(main)
});

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DAO = new ethers.Contract(Contracts.PSD.DAO.address,
        Contracts.PSD.DAO.abi, App.provider);
    const DOLLAR = new ethers.Contract(Contracts.PSD.PSD.address,
        ERC20_ABI, App.provider);
    var prices = {};
    var tokens = {};

    const [epoch, uniPrices, totalBonded] = await loadDAO(App, DAO, DOLLAR, Contracts.PSD.Uniswap_USDC_PSD.address,
        Contracts.PSD.LPIncentivizationPool.address, tokens, prices, 15);

    const LP = new ethers.Contract(Contracts.PSD.LPIncentivizationPool.address,
        Contracts.PSD.LPIncentivizationPool.abi, App.provider);
    await loadEmptySetLP(App, LP, Contracts.PSD.Uniswap_USDC_PSD.address,
        "PSD-USDC LP",12, epoch, "PSD", uniPrices);

    const totalCoupons = await DAO.totalCoupons() / 1e18;
    const totalRedeemable = await DAO.totalRedeemable() / 1e18;
    const totalNet = await DAO.totalNet() / 1e18;

    const lpReward = 0.45
    const daoReward = 0.55
    const daoExitPeriods = 24;
    const lpExitPeriods = 8;
    const epochsPerDay = 8;
    const periodLengthSec = 3 * 60 * 60;

    if (epoch < 41) { //Bootstrapping
        const calcPrice = 0.05


        // Calulcate the outstanding commitments so we can remove it from the rewards
        const totalOutstanding = totalCoupons - totalRedeemable

        const maxRewards = totalNet * calcPrice * daoReward;

        const daoRewards = maxRewards - totalOutstanding

        if (daoRewards > 0) {
            const bondedReturn = daoRewards * epochsPerDay / totalBonded * 100;

            _print(`DAO APY: Day ${(bondedReturn).toFixed(2)}% Week ${(bondedReturn * 7).toFixed(2)}% Year ${(bondedReturn * 365).toFixed(2)}%`)

        } else {
            _print(`DAO APY: Day 0% Week 0% Year 0%`)
        }
        // Calculate total rewards allocated to LP
        const lpRewards = totalNet * calcPrice * lpReward
        const price = getParameterCaseInsensitive(prices, DOLLAR.address).usd;
        const lpReturn = lpRewards * price * epochsPerDay/ uniPrices.staked_tvl * 100

        _print(`LP  APR: Day ${(lpReturn).toFixed(2)}% Week ${(lpReturn * 7).toFixed(2)}% Year ${(lpReturn * 365).toFixed(2)}%`)

    }
    const resp = await fetch('https://api.vfat.tools/twap/' + Contracts.PSD.Uniswap_USDC_PSD.address);
    const text = await resp.text();
    const array = text.split("\n");
    if (array.length > 0 && array[0][0] != '<') {
        const [, oldPrice1, oldTimestamp] = array[array.length - 2].split(' ') //last line is blank
        const [, price1, timestamp] = await getCurrentPriceAndTimestamp(App, Contracts.PSD.Uniswap_USDC_PSD.address);
        const twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, 12);
        _print(`TWAP: ${twap}\n`);
        if (twap > 1) {
            // Get price
            const calcPrice = Math.min((twap - 1) / 8, 0.15)

            // Calulcate the outstanding commitments so we can remove it from the rewards
            const totalOutstanding = totalCoupons - totalRedeemable

            const maxRewards = totalNet * calcPrice * daoReward;

            const daoRewards = maxRewards - totalOutstanding

            if (daoRewards > 0) {
                const bondedReturn = daoRewards * epochsPerDay / totalBonded * 100;

                _print(`DAO APY: Day ${(bondedReturn).toFixed(2)}% Week ${(bondedReturn * 7).toFixed(2)}% Year ${(bondedReturn * 365).toFixed(2)}%`)

            } else {
                _print(`DAO APY: Day 0% Week 0% Year 0%`)
            }
            // Calculate total rewards allocated to LP
            const lpRewards = totalNet * calcPrice * lpReward
            const price = getParameterCaseInsensitive(prices, DOLLAR.address).usd;
            const lpReturn = lpRewards * price * epochsPerDay/ uniPrices.staked_tvl * 100

            _print(`LP  APR: Day ${(lpReturn).toFixed(2)}% Week ${(lpReturn * 7).toFixed(2)}% Year ${(lpReturn * 365).toFixed(2)}%`)

        }
        else {
            _print(`DAO APY: Day 0% Week 0% Year 0%`)
            _print(`LP APR: Day 0% Week 0% Year 0%`)
        }
    }
    _print(`\nDAO Unbonds`)
    await printDaoUnbonds(App.provider, DAO, epoch + 1, daoExitPeriods, periodLengthSec);
    _print(`\LP Unbonds`)
    await printLPUnbonds(App.provider, LP, epoch + 1, lpExitPeriods, periodLengthSec);

    hideLoading();
}
