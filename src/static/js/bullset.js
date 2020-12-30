$(function() {
    consoleInit();
    start(main);
});

const calculateChange = (price, totalCoupons, totalRedeemable) => {
    if (price > 1.06 && totalCoupons > totalRedeemable) {
        return 0.06
    } else if (
        1.06 >= price &&
        price > 1.03 &&
        totalCoupons > totalRedeemable
    ) {
        return Math.abs(price - 1)
    } else if (price > 1.03) {
        return 0.03
    } else if (price < 0.97) {
        return 0.03
    } else {
        return Math.abs(price - 1)
    }
}

async function main() {  
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DAO = new ethers.Contract(Contracts.BSD.DAO.address, 
        Contracts.BSD.DAO.abi, App.provider);
    const DOLLAR = new ethers.Contract(Contracts.BSD.BSD.address,
        ERC20_ABI, App.provider);
    var prices = {};
    var tokens = {};

    const [epoch, uniPrices, totalBonded] = await loadDAO(App, DAO, DOLLAR, Contracts.BSD.Uniswap_BSD_USDC.address,
        Contracts.BSD.LPIncentivizationPool.address, tokens, prices, 72);

    const LP = new ethers.Contract(Contracts.BSD.LPIncentivizationPool.address,
        Contracts.BSD.LPIncentivizationPool.abi, App.provider);
    await loadEmptySetLP(App, LP, Contracts.BSD.Uniswap_BSD_USDC.address, 
        "BSD-USDC LP", 24, epoch, "BSD", uniPrices);

    if (epoch < 301) { //bootstrapping
        const twap = 1.30;

        const totalCoupons = await DAO.totalCoupons() / 1e18;
        const totalRedeemable = await DAO.totalRedeemable() / 1e18;
        const totalNet = await DAO.totalNet() / 1e18;

        const lpReward = 0.4
        const daoReward = 0.585
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
        const price = getParameterCaseInsensitive(prices, DOLLAR.address).usd;
        const lpReturn = lpRewards * price / uniPrices.staked_tvl * 100 * 24;

        _print(`LP  APR: Day ${lpReturn.toFixed(2)}% Week ${(lpReturn * 7).toFixed(2)}% Year ${(lpReturn * 365).toFixed(2)}%`)        

    }
    else {
        const resp = await fetch('https://api.vfat.tools/twap/' + Contracts.BSD.Uniswap_BSD_USDC.address);
        const text = await resp.text();
        const array = text.split("\n");
        if (array.length > 0) {
            const [oldPrice0, , oldTimestamp] = array[array.length - 2].split(' ') //last line is blank
            const [price0, , timestamp] = await getCurrentPriceAndTimestamp(App, Contracts.BSD.Uniswap_BSD_USDC.address);
            const twap = await calculateTwap(oldPrice0, oldTimestamp, price0, timestamp, 12);
            _print(`TWAP: ${twap}\n`);

            if (twap > 1.05) {
                const totalCoupons = await DAO.totalCoupons() / 1e18;
                const totalRedeemable = await DAO.totalRedeemable() / 1e18;
                const totalNet = await DAO.totalNet() / 1e18;

                const lpReward = 0.2
                const daoReward = 0.775
                // Get price
                const calcPrice = calculateChange(twap, totalCoupons, totalRedeemable)
        
                // Calulcate the outstanding commitments so we can remove it from the rewards
                const totalOutstanding = totalCoupons - totalRedeemable

                const maxRewards = totalNet * calcPrice * daoReward;

                const daoRewards = maxRewards - totalOutstanding

                if (daoRewards > 0) {
                    const bondedReturn = daoRewards / totalBonded * 100 * 3;

                    _print(`DAO APR: Day ${bondedReturn.toFixed(2)}% Week ${(bondedReturn * 7).toFixed(2)}% Year ${(bondedReturn * 365).toFixed(2)}%`)

                } else {
                    _print(`DAO APR: Day 0% Week 0% Year 0%`)
                }
                // Calculate total rewards allocated to LP
                const lpRewards = totalNet * calcPrice * lpReward
                const price = getParameterCaseInsensitive(prices, DOLLAR.address).usd;
                const lpReturn = lpRewards * price / uniPrices.staked_tvl * 100

                _print(`LP  APR: Day ${(lpReturn * 3).toFixed(2)}% Week ${(lpReturn * 3 * 7).toFixed(2)}% Year ${(lpReturn * 3 * 365).toFixed(2)}%`)        
            }
            else {
                _print(`DAO APR: Day 0% Week 0% Year 0%`)
                _print(`LP APR: Day 0% Week 0% Year 0%`)
            }        
        }
    }
    _print(`\nDAO Unbonds`)
    await printDaoUnbonds(App.provider, DAO, epoch + 1, 72, 60 * 60);
    _print(`\LP Unbonds`)
    await printLPUnbonds(App.provider, LP, epoch + 1, 24, 60 * 60);
    hideLoading();  
}