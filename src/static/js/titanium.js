$(function() {
consoleInit(main)
});

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DAO = new ethers.Contract(Dollars.T.DAO.address,
        Dollars.T.DAO.abi, App.provider);
    const DOLLAR = new ethers.Contract(Dollars.T.Dollar.address,
        ERC20_ABI, App.provider);

    var prices = {};
    var tokens = {};

    const [epoch, uniPrices, totalBonded] = await loadTitaniumDAO(App, DAO, DOLLAR, Dollars.T.CurveLP.address,
        Dollars.T.Pool.address, tokens, prices, 240, true);

    const LP = new ethers.Contract(Dollars.T.Pool.address,
        Dollars.T.Pool.abi, App.provider);
    await loadEmptySetLP(App, LP, Dollars.T.CurveLP.address,
        "T3CRV-f",144, epoch, "T", uniPrices);

    /*const resp = await fetch('https://api.vfat.tools/twap/' + Dollars.T.CurveLP.address);
    const text = await resp.text();
    const array = text.split("\n");
    if (array.length > 0 && array[0][0] != '<') {
        const [, oldPrice1, oldTimestamp] = array[array.length - 2].split(' ') //last line is blank
        const [, price1, timestamp] = await getCurrentPriceAndTimestamp(App, Dollars.T.CurveLP.address);
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
    }*/

    const tPrice = getParameterCaseInsensitive(prices, "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490").usd;

    _print(`\nDAO Unbonds`)
    await printDaoUnbonds(App.provider, DAO, epoch + 1, 240, 30 * 60, tPrice);
    _print(`\LP Unbonds`)
    await printLPUnbonds(App.provider, LP, epoch + 1, 144, 30 * 60, tPrice, "T");

    hideLoading();
}

const loadTitaniumDAO = async (App, DAO, DOLLAR, uniswapAddress, liquidityPoolAddress, tokens, prices, fluidEpochs,
  isBuggyDAO, displayDecimals, epochSec, stakingPoolAddress) => {
    const unstaked = await DOLLAR.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const totalSupply = await DOLLAR.totalSupply() / 1e18;
    const dollar = await DOLLAR.symbol();

    const curveMinterToken = new ethcall.Contract("0xA77d09743F77052950C4eb4e6547E9665299BecD", CURVE_WITH_MINTER_ABI);

    const uniPool = await getCurveTitaniumToken(App, curveMinterToken, uniswapAddress, liquidityPoolAddress ?? stakingPoolAddress);  
    var newPrices = await lookUpTokenPrices(uniPool.tokens.filter(t => 
      t.toLowerCase() != "0x5cf9242493be1411b93d064ca2e468961bbb5924"
      && t.toLowerCase() != "0xf0e3543744afced8042131582f2a19b6aeb82794")); //Exceptions for ESG and VTD due to coingecko bug
    for (const key in newPrices) {
        prices[key] = newPrices[key];
    }
    await Promise.all(uniPool.tokens.map(async (address) => {
        tokens[address] = await getToken(App, address, uniPool.address);
    }));
    const uniPrices = getPoolPrices(tokens, prices, uniPool);

    //const tPrice = getParameterCaseInsensitive(prices, DOLLAR.address).usd;   //there is no 0x6967299e9F3d5312740Aa61dEe6E9ea658958e31
    const tPrice = getParameterCaseInsensitive(prices, "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490").usd;

    const decimals = displayDecimals ?? 2;

    const totalBonded = await DAO.totalBonded() / 1e18;
    const totalStaged = await DAO.totalStaged() / 1e18;
    const bonded = await DAO.balanceOfBonded(App.YOUR_ADDRESS) / 1e18;
    const staged = await DAO.balanceOfStaged(App.YOUR_ADDRESS) / 1e18;
    const status = await DAO.statusOf(App.YOUR_ADDRESS) ? "Fluid" : "Frozen";
    const epoch = await DAO.epoch() / 1;
    _print(`Current Epoch: ${epoch}`);
    if (epochSec) {
      _print(`Epoch Period: ${new Date(epochSec * 1000).toISOString().substr(11, 8)}`)
    } 
    if (DAO.callStatic["nextEpochStart"]) _print(`Next Epoch at: ${new Date(await DAO.nextEpochStart() * 1000).toString()}`);
    _print(`${dollar} Price: $${formatMoney(tPrice)}\n`);
    
    _print(`${dollar} Total Supply: ${totalSupply.toFixed(decimals)}, $${formatMoney(totalSupply * tPrice)}`);
    _print(`${dollar} Total Staged: ${totalStaged.toFixed(decimals)}, $${formatMoney(totalStaged * tPrice)}`);
    _print(`${dollar} Total Bonded: ${totalBonded.toFixed(decimals)}, $${formatMoney(totalBonded * tPrice)}`);
    _print(`Your DAO status is ${status}`);
    _print(`You have ${unstaked.toFixed(decimals)} unstaked ${dollar}, $${formatMoney(unstaked*tPrice)}`);
    _print(`You have ${staged.toFixed(decimals)} staged ${dollar}, $${formatMoney(staged*tPrice)}, ${(staged/totalStaged*100).toFixed(4)}% of the pool`);
    _print(`You have ${bonded.toFixed(decimals)} bonded ${dollar}, $${formatMoney(bonded*tPrice)}, ${(bonded/totalBonded*100).toFixed(4)}% of the pool`);
    if (status == "Fluid") await loadFluidStatus(App, DAO, fluidEpochs, epoch);
    
    const approveAndDeposit = async () => dao_deposit(App, DAO, DOLLAR);
    const withdraw = async () => esd_withdraw(DAO, App); 
    const bond = async () => esd_bond(DAO, App); 
    const unbond = async () => isBuggyDAO ? buggy_dao_unbond(DAO,App) : esd_unbond(DAO, App); 

    _print_link(`Deposit ${unstaked.toFixed(decimals)} ${dollar}`, approveAndDeposit)
    _print_link(`Withdraw ${staged.toFixed(decimals)} ${dollar}`, withdraw);
    _print_link(`Bond ${staged.toFixed(decimals)} ${dollar}`, bond);
    _print_link(`Unbond ${bonded.toFixed(decimals)} ${dollar}`, unbond);
    _print(''); 

    if (DAO.filters.CouponPurchase) {
      const couponFilter = DAO.filters.CouponPurchase(App.YOUR_ADDRESS);
      const coupons = await DAO.queryFilter(couponFilter);
      for (const c of coupons) {
          const dollarAmount = c.args.dollarAmount / 1e18;
          const couponCount = c.args.couponAmount / 1e18;
          const couponEpoch = c.args.epoch / 1;
          _print(`You purchased ${couponCount} coupons worth $${dollarAmount} at epoch ${couponEpoch}`)
      }
    }
    _print('');

    return [epoch, uniPrices, totalBonded];
}

async function getCurveTitaniumToken(app, curve, address, stakingAddress) {
  const calls = [curve.get_virtual_price(), curve.coins(1), curve.decimals(), curve.balanceOf(stakingAddress),
                 curve.balanceOf(app.YOUR_ADDRESS), curve.name(), curve.symbol(), curve.totalSupply()];
  const [virtualPrice, coin0, decimals_, staked, unstaked, name, symbol, totalSupply] = await app.ethcallProvider.all(calls);
  const token = await getToken(app, coin0, address);
  const decimals =  decimals_ / 1;
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: curve,
      tokens : [address, coin0],
      token,
      virtualPrice : virtualPrice / 1e18
  };
}