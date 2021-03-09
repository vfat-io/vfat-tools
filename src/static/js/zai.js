$(function() {
    consoleInit();
    start(main);
});

async function main() {  
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DAO = new ethers.Contract(Contracts.ZAI.DAO.address, 
        Contracts.ZAI.DAO.abi, App.provider);
    const DOLLAR = new ethers.Contract(Contracts.ZAI.ZAI.address,
        ERC20_ABI, App.provider);

    var prices = {};
    var tokens = {};

    const [epoch, uniPrices, totalBonded] = await loadDAO(App, DAO, DOLLAR, Contracts.ZAI.Uniswap_DAI_ZAI.address,
        Contracts.ZAI.LPIncentivizationPool.address, tokens, prices, 240, true);

    const LP = new ethers.Contract(Contracts.ZAI.LPIncentivizationPool.address,
        Contracts.ZAI.LPIncentivizationPool.abi, App.provider);
    await loadEmptySetLP(App, LP, Contracts.ZAI.Uniswap_DAI_ZAI.address, 
        "DAI-ZAI LP",144, epoch, "ZAI", uniPrices);

    const resp = await fetch('https://api.vfat.tools/twap/' + Contracts.ZAI.Uniswap_DAI_ZAI.address);
    const text = await resp.text();
    const array = text.split("\n");
    if (array.length > 0 && array[0][0] != '<') {
        const [, oldPrice1, oldTimestamp] = array[array.length - 2].split(' ') //last line is blank
        const [, price1, timestamp] = await getCurrentPriceAndTimestamp(App, Contracts.ZAI.Uniswap_DAI_ZAI.address);
        const twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, 0);
        _print(`TWAP: ${twap}\n`);
        if (twap > 1) {
            const totalCoupons = await DAO.totalCoupons() / 1e18;
            const totalRedeemable = await DAO.totalRedeemable() / 1e18;
            const totalNet = await DAO.totalNet() / 1e18;
    
            const lpReward = 0.5
            const daoReward = 0.5
            // Get price
            const calcPrice = Math.min((twap - 1) / 12, 0.01)
    
    
            // Calulcate the outstanding commitments so we can remove it from the rewards
            const totalOutstanding = totalCoupons - totalRedeemable

            const maxRewards = totalNet * calcPrice * daoReward;

            const daoRewards = maxRewards - totalOutstanding

            const epochsPerDay = 48;

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
        _print(`\nDAO Unbonds`)
        await printDaoUnbonds(App.provider, DAO, epoch + 1, 240, 30 * 60,);
        _print(`\LP Unbonds`)
        await printLPUnbonds(App.provider, LP, epoch + 1, 144, 30 * 60);
        hideLoading();
    }
}