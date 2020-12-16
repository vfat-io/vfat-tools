$(function() {
    consoleInit();
    start(main);
});

async function main() {  
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DAO = new ethers.Contract(Contracts.DSD.DAO.address, 
        Contracts.DSD.DAO.abi, App.provider);
    const DOLLAR = new ethers.Contract(Contracts.DSD.DSD.address,
        ERC20_ABI, App.provider);
    const unstaked = await DOLLAR.balanceOf(App.YOUR_ADDRESS) / 1e18;

    const bonded = await DAO.balanceOfBonded(App.YOUR_ADDRESS) / 1e18;
    const staged = await DAO.balanceOfStaged(App.YOUR_ADDRESS) / 1e18;
    const status = await DAO.statusOf(App.YOUR_ADDRESS) ? "Fluid" : "Frozen";
    const epoch = await DAO.epoch();
    _print(`Current Epoch: ${epoch}\n`);
    
    _print(`Your DAO status is ${status}`);
    _print(`You have ${unstaked.toFixed(2)} unstaked DSD`);
    _print(`You have ${staged.toFixed(2)} staged DSD`);
    _print(`You have ${bonded.toFixed(2)} bonded DSD`);
    if (status == "Fluid") await loadFluidStatus(App, DAO, 36, epoch);
    const approveAndDeposit = async function() {
      return rewardsContract_stake(Contracts.DSD.DSD.address, Contracts.DSD.DAO.address, App)
    }
    const withdraw = async () => esd_withdraw(DAO, App); 
    const bond = async () => esd_bond(DAO, App); 
    const unbond = async () => esd_unbond(DAO, App); 

    _print_link(`Deposit ${unstaked.toFixed(2)} DSD`, approveAndDeposit)
    _print_link(`Withdraw ${staged.toFixed(2)} DSD`, withdraw);
    _print_link(`Bond ${staged.toFixed(2)} DSD`, bond);
    _print_link(`Unbond ${bonded.toFixed(2)} DSD`, unbond);
    _print(''); 

    const LP = new ethers.Contract(Contracts.DSD.LPIncentivizationPool.address,
        Contracts.DSD.LPIncentivizationPool.abi, App.provider);
    await loadEmptySetLP(App, LP, Contracts.DSD.Uniswap_USDC_DSD.address, 
        "USDC-DSD LP",5, epoch, "DSD", "USDC-DSD");

    const couponFilter = DAO.filters.CouponPurchase(App.YOUR_ADDRESS);
    const coupons = await DAO.queryFilter(couponFilter);
    for (const c of coupons) {
        const dollarAmount = c.args.dollarAmount / 1e18;
        const couponCount = c.args.couponAmount / 1e18;
        const couponEpoch = c.args.epoch / 1;
        _print(`You purchased ${couponCount} coupons worth $${dollarAmount} at epoch ${couponEpoch}`)
    }
    _print('');

    const resp = await fetch('https://api.vfat.tools/twap/' + Contracts.DSD.Uniswap_USDC_DSD.address);
    const text = await resp.text();
    const array = text.split("\n");
    if (array.length > 0 && array[0][0] != '<') {
        const [, oldPrice1, oldTimestamp] = array[array.length - 2].split(' ') //last line is blank
        const [, price1, timestamp] = await getCurrentPriceAndTimestamp(App, Contracts.DSD.Uniswap_USDC_DSD.address);
        const twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp);
        _print(`TWAP: ${twap}\n`);

        const totalCoupons = await DAO.totalCoupons() / 1e18;
        const totalRedeemable = await DAO.totalRedeemable() / 1e18;
        const totalNet = await DAO.totalNet() / 1e18;
        const totalBonded = await DAO.totalBonded() / 1e18;

        const lpReward = 0.2
        const daoReward = 0.775
        // Get price
        const calcPrice = calculateChange(twap, totalCoupons, totalRedeemable)
    
        // Calulcate the outstanding commitments so we can remove it from the rewards
        const totalOutstanding = totalCoupons - totalRedeemable
        const percentOutstanding = totalOutstanding / totalNet
    
        // Calculate the total reward emission then take the outstanding debt&coupons
        const totalRewards = totalNet * (calcPrice - percentOutstanding)
    
        // Calculate bonded return per epoch
        const bondedRewards = totalRewards * daoReward
        const bondedReturn = bondedRewards / totalBonded * 100;

        _print(`DAO APR: Day ${(bondedReturn * 3).toFixed(2)}% Week ${(bondedReturn * 3 * 7).toFixed(2)}% Year ${(bondedReturn * 3 * 365).toFixed(2)}%`)
    
        // Calculate total rewards allocated to LP
        var prices = {};
        var tokens = {};
        const uniPool = await getToken(App,Contracts.DSD.Uniswap_DSD_USDC.address, Contracts.DSD.LPIncentivizationPool.address);  
        var newPrices = await lookUpTokenPrices(uniPool.tokens);
        for (const key in newPrices) {
            prices[key] = newPrices[key];
        }
        await Promise.all(uniPool.tokens.map(async (address) => {
            tokens[address] = await getToken(App, address, uniPool.address);
        }));
        const uniPrices = getPoolPrices(tokens, prices, uniPool);
        const lpRewards = totalRewards * lpReward
        const price = getParameterCaseInsensitive(prices, DOLLAR.address).usd;
        const lpReturn = lpRewards * price / uniPrices.staked_tvl * 100

        _print(`LP  APR: Day ${(lpReturn * 3).toFixed(2)}% Week ${(lpReturn * 3 * 7).toFixed(2)}% Year ${(lpReturn * 3 * 365).toFixed(2)}%`)
    
        hideLoading();
    }
}