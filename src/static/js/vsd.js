$(function () {
consoleInit(main)
});

const loadVSDDAO = async (App, DAO, DOLLAR) => {
    let [unstaked, totalSupply, totalCollateral, vsdPrice] = await Promise.all([
        DOLLAR.balanceOf(App.YOUR_ADDRESS),
        DOLLAR.totalSupply(),
        getTotalCollateral(App, DAO),
        getSpotPrice(App),

    ]);
    unstaked /= 1e18;
    totalSupply /= 1e18;
    const collateralRatio = (totalCollateral / totalSupply * 100).toFixed(2);
    const dollar = "VSD";
    const decimals = 2;


    const totalBonded = (await Promise.all(Contracts.VSD.Pools.map(async pool => {
        return await DAO.totalBonded(pool.address) / 1e18
    }))).reduce((t, a) => t + a, 0);
    const totalStaged = (await Promise.all(Contracts.VSD.Pools.map(async pool => {
        return await DAO.totalStaged(pool.address) / 1e18
    }))).reduce((t, a) => t + a, 0);
    const bonded = (await Promise.all(Contracts.VSD.Pools.map(async pool => {
        return await DAO.balanceOfBonded(pool.address, App.YOUR_ADDRESS) / 1e18
    }))).reduce((t, a) => t + a, 0);
    const staged = (await Promise.all(Contracts.VSD.Pools.map(async pool => {
        return await DAO.balanceOfStaged(pool.address, App.YOUR_ADDRESS) / 1e18
    }))).reduce((t, a) => t + a, 0);

    const epoch = await DAO.epoch() / 1;
    _print(`Current Epoch: ${epoch}`);
    _print(`${dollar} Price: $${formatMoney(vsdPrice)}`);
    _print(`Collateral Ratio: ${collateralRatio}%\n`);

    _print(`${dollar} Total Supply: ${totalSupply.toFixed(decimals)}, $${formatMoney(totalSupply * vsdPrice)}`);
    _print(`${dollar} Total Staged: ${totalStaged.toFixed(decimals)}, $${formatMoney(totalStaged * vsdPrice)}`);
    _print(`${dollar} Total Bonded: ${totalBonded.toFixed(decimals)}, $${formatMoney(totalBonded * vsdPrice)}`);

    _print(`You have ${unstaked.toFixed(decimals)} unstaked ${dollar}, $${formatMoney(unstaked * vsdPrice)}`);
    _print(`You have ${staged.toFixed(decimals)} staged ${dollar}, $${formatMoney(staged * vsdPrice)}, ${totalStaged > 0 ? (staged / totalStaged * 100).toFixed(4) : "0"}% of the pool`);
    _print(`You have ${bonded.toFixed(decimals)} bonded ${dollar}, $${formatMoney(bonded * vsdPrice)}, ${(bonded / totalBonded * 100).toFixed(4)}% of the pool`);

    const approveAndRedeem = async () => vsd_redeem(DAO, App, DOLLAR);
    _print_link(`Redeem ${unstaked.toFixed(decimals)} ${dollar}`, approveAndRedeem);
    _print('');

    if (DAO.filters.CouponPurchase) {
        const couponFilter = DAO.filters.CouponPurchase(App.YOUR_ADDRESS);
        const coupons = await DAO.queryFilter(couponFilter);
        for (const c of coupons) {
            const dollarAmount = c.args.dollarAmount / 1e18;
            const couponCount = c.args.couponAmount / 1e18;
            const couponEpoch = c.args.epochExpire / 1;
            _print(`You purchased ${couponCount} coupons worth $${dollarAmount} which will expire at epoch ${couponEpoch}`)
        }
    }
    _print('');

    return [epoch, totalBonded, vsdPrice];
}

async function loadValueSetLP(App, DAO, LP, fluidEpochs, epoch, rewardTicker, uniPrices, dollarPrice, unstakedDollar) {
    const stakeToken = new ethers.Contract(LP.address, UNI_ABI, App.provider);
    const baseToken = new ethers.Contract(LP.baseCoin, ERC20_ABI, App.provider);

    let [unstaked, totalBonded, totalStaged, staged, bonded, claimable, status, baseAmount, res, token0] = await Promise.all([
        stakeToken.balanceOf(App.YOUR_ADDRESS),
        DAO.totalBonded(LP.address),
        DAO.totalStaged(LP.address),
        DAO.balanceOfStaged(LP.address, App.YOUR_ADDRESS),
        DAO.balanceOfBonded(LP.address, App.YOUR_ADDRESS),
        DAO.pendingReward(LP.address),
        DAO.statusOf(LP.address, App.YOUR_ADDRESS),
        baseToken.balanceOf(App.YOUR_ADDRESS),
        stakeToken.getReserves(),
        stakeToken.token0(),
    ]);
    unstaked /= 1e18;
    totalBonded /= 1e18;
    totalStaged /= 1e18;
    staged /= 1e18;
    bonded /= 1e18;
    claimable /= 1e18;
    status = status ? "Fluid" : "Frozen";
    baseAmount /= 10 ** LP.baseDecimals
    const lpPrice = uniPrices.price;
    uniPrices.print_price();
    _print(`${LP.ticker} Total Staged: ${totalStaged.toFixed(2)}, $${formatMoney(totalStaged * lpPrice)}`);
    _print(`${LP.ticker} Total Bonded: ${totalBonded.toFixed(2)}, $${formatMoney(totalBonded * lpPrice)}`);
    _print(`Your LP status is ${status}`);
    _print(`You have ${unstaked.toFixed(8)} unstaked ${LP.ticker}, $${formatMoney(unstaked * lpPrice)}`);
    if (unstaked > 0) uniPrices.print_contained_price(unstaked);
    _print(`You have ${staged.toFixed(8)} staged ${LP.ticker}, $${formatMoney(staged * lpPrice)}, ${(staged / (totalStaged || 1) * 100).toFixed(4)}% of the pool`);
    if (staged > 0) uniPrices.print_contained_price(staged);
    _print(`You have ${bonded.toFixed(8)} bonded ${LP.ticker}, $${formatMoney(bonded * lpPrice)}, ${(bonded / (totalBonded || 1) * 100).toFixed(4)}% of the pool`);
    if (bonded > 0) uniPrices.print_contained_price(bonded);

    const decimals = 2;
    _print(`You have ${claimable.toFixed(decimals)} claimable ${rewardTicker} ($${formatMoney(claimable * dollarPrice)})`);
    let vsdToDep = unstakedDollar + claimable;
    const TokenToVSDRatio = token0.toLowerCase() === LP.baseCoin.toLowerCase() ?
        (res._reserve0 / 10 ** LP.baseDecimals) / (res._reserve1 / 1e18) :
        (res._reserve1 / 10 ** LP.baseDecimals) / (res._reserve0 / 1e18)
    let baseToDep = vsdToDep * TokenToVSDRatio;
    if (baseAmount < baseToDep) {
        baseToDep = baseAmount;
        vsdToDep = baseToDep / TokenToVSDRatio;
    }
    const approveAndDeposit = async () => vsd_deposit(DAO, App, stakeToken);
    const withdraw = async () => vsd_withdraw(DAO, App, stakeToken);
    const bond = async () => vsd_bond(DAO, App, stakeToken);
    const unbond = async () => vsd_unbond(DAO, App, stakeToken);
    const claim = async () => vsd_claim(DAO, App, stakeToken);
    const provide = async () => vsd_provide(DAO, App, LP, vsdToDep);

    _print_link(`Deposit ${unstaked.toFixed(8)} ${LP.ticker}`, approveAndDeposit)
    _print_link(`Withdraw ${staged.toFixed(8)} ${LP.ticker}`, withdraw);
    _print_link(`Bond ${staged.toFixed(8)} ${LP.ticker}`, bond);
    _print_link(`Unbond ${bonded.toFixed(8)} ${LP.ticker}`, unbond);
    _print_link(`Claim ${claimable.toFixed(decimals)} ${rewardTicker}`, claim);
    _print_link(`Provide ${(vsdToDep).toFixed(decimals)} ${rewardTicker} + ${baseToDep} ${LP.baseCoinTicker}`, provide);
    _print('');
}

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const DAO = new ethers.Contract(Contracts.VSD.DAO.address,
        Contracts.VSD.DAO.abi, App.provider);
    const DOLLAR = new ethers.Contract(Contracts.VSD.Dollar.address,
        ERC20_ABI, App.provider);
    var prices = {};
    var tokens = {};

    const unstakedDollar = await DOLLAR.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const [epoch, totalBonded, price] = await loadVSDDAO(App, DAO, DOLLAR);

    await Promise.all(Contracts.VSD.Pools.map(async pool => {
        const uniPool = await getToken(App, pool.address, Contracts.VSD.DAO.address);
        var newPrices = await lookUpTokenPrices(uniPool.tokens);
        for (const key in newPrices) {
            prices[key] = newPrices[key];
        }
        await Promise.all(uniPool.tokens.map(async (address) => {
            tokens[address] = await getToken(App, address, uniPool.address);
        }));
        let uniPrices = getPoolPrices(tokens, prices, uniPool);
        // if (!uniPrices) {
        //     uniPrices = {}
        //     uniPrices.print_contained_price = () => { }
        //     uniPrices.print_price = () => { }
        //     uniPrices.price = 0;
        // }
        await loadValueSetLP(App, DAO, pool, 5, epoch, "VSD", uniPrices, price, unstakedDollar);
    }));

    const ORACLE = new ethers.Contract(Contracts.VSD.Oracle.address, Contracts.VSD.Oracle.abi, App.provider);
    const twaps = await ORACLE.getPrice();
    const twap = twaps[0] / 1e18;
    _print(`TWAP: ${twap.toFixed(3)}\n`);
    const monthAPY = await compute30DayYieldRate(App, DAO, twap, epoch);
    const daily = Math.pow(monthAPY + 1, 1 / 30) - 1;
    _print(`DAO APY: Day ${(daily * 100).toFixed(2)}% Month ${(monthAPY * 100).toFixed(2)}% `)
    _print(`\nDAO Unbonds`)
    await printDaoUnbonds(App.provider, DAO, epoch + 1, 15, 8 * 60 * 60);
    hideLoading();
}



const getReserves = async (App, addr) => {
    const pool = new ethers.Contract(addr, UNI_ABI, App.provider);
    const [res, token0] = await Promise.all([pool.getReserves(), pool.token0()]);
    return [res, token0];
}

const getSpotPrice = async (App) => {
    let priceReserves = 0;
    let reserves = 0;
    for (const pool of Contracts.VSD.Pools) {
        if (pool.ticker === 'VSD-WETH LP') {
            continue;
        }
        const [res, token0] = await getReserves(App, pool.address);
        const token0IsVsd = token0.toLowerCase() !== pool.baseCoin.toLowerCase();
        const price = token0IsVsd ?
            (res._reserve1 / 10 ** pool.baseDecimals) / (res._reserve0 / 1e18) :
            (res._reserve0 / 10 ** pool.baseDecimals) / (res._reserve1 / 1e18);
        const reserve = (token0IsVsd ? res._reserve0 : res._reserve1) / 1e18;
        priceReserves += price * reserve;
        reserves += reserve;
    }
    return priceReserves / reserves;
}

const vsd_provide = async (DAO, App, LP, vsdToDep) => {
    const signer = App.provider.getSigner();
    const baseToken = new ethers.Contract(LP.baseCoin, ERC20_ABI, App.provider);
    const balance = await baseToken.balanceOf(App.YOUR_ADDRESS);
    const allowed = await baseToken.allowance(App.YOUR_ADDRESS, DAO.address);
    if (allowed / 1e18 < balance / 1e18) {
        showLoading();
        const tx = await baseToken.connect(signer).approve(DAO.address, ethers.constants.MaxUint256);
        await tx.wait();
    }
    if (vsdToDep > 0) {
        showLoading()
        DAO.connect(signer).provide(LP.address, Contracts.VSD.Dollar.address, LP.baseCoin, vsdToDep, { gasLimit: 500000 })
            .then(function (t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function () {
                hideLoading()
            })
    }
}


const vsd_redeem = async (DAO, App, DOLLAR) => {
    const signer = App.provider.getSigner();
    const balance = await DOLLAR.balanceOf(App.YOUR_ADDRESS);
    const allowed = await DOLLAR.allowance(App.YOUR_ADDRESS, DAO.address);
    if (allowed < balance) {
        showLoading();
        const tx = await DOLLAR.connect(signer).approve(DAO.address, ethers.constants.MaxUint256);
        await tx.wait();
    }
    if (balance > 0) {
        try {
            await DAO.connect(signer).redeem(balance, { gasLimit: 500000 });
            hideLoading();
        }
        catch (ex) {
            hideLoading();
            console.log(ex);
            _print('Something went wrong.');
        }
    } else {
        alert(`You have no tokens to redeem!`);
    }
}


const vsd_deposit = async (DAO, App, LP) => {
    const signer = App.provider.getSigner();
    const balance = await LP.balanceOf(App.YOUR_ADDRESS);
    const allowed = await LP.allowance(App.YOUR_ADDRESS, DAO.address);
    if (allowed < balance) {
        showLoading();
        const tx = await LP.connect(signer).approve(DAO.address, ethers.constants.MaxUint256);
        await tx.wait();
    }
    if (balance > 0) {
        try {
            await DAO.connect(signer).deposit(LP.address, balance, { gasLimit: 500000 });
            hideLoading();
        }
        catch (ex) {
            hideLoading();
            console.log(ex);
            _print('Something went wrong.');
        }
    } else {
        alert(`You have no tokens to deposit!`);
    }
}


const vsd_withdraw = async function (DAO, App, LP) {
    const signer = App.provider.getSigner()

    const REWARD_POOL = DAO.connect(signer);
    const currentStakedAmount = await REWARD_POOL.balanceOfStaged(LP.address, App.YOUR_ADDRESS)

    if (currentStakedAmount > 0) {
        showLoading()
        REWARD_POOL.withdraw(LP.address, currentStakedAmount, { gasLimit: 500000 })
            .then(function (t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function () {
                hideLoading()
            })
    }
}

const vsd_claim = async function (DAO, App, LP) {
    const signer = App.provider.getSigner()

    const claimable = await DAO.connect(signer).pendingReward(LP.address)

    if (claimable > 0) {
        showLoading()
        DAO.connect(signer).claim(LP.address, claimable, { gasLimit: 500000 })
            .then(function (t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function () {
                hideLoading()
            })
    }
}

const vsd_unbond = async function (DAO, App, LP) {
    const signer = App.provider.getSigner()

    const REWARD_POOL = DAO.connect(signer);
    const currentStakedAmount = await REWARD_POOL.balanceOfBonded(LP.address, App.YOUR_ADDRESS)

    if (currentStakedAmount > 0) {
        showLoading()
        REWARD_POOL.unbond(LP.address, currentStakedAmount, { gasLimit: 500000 })
            .then(function (t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function () {
                hideLoading()
            })
    }
}

const vsd_bond = async function (DAO, App, LP) {
    const signer = App.provider.getSigner()

    const REWARD_POOL = DAO.connect(signer);
    const currentStakedAmount = await REWARD_POOL.balanceOfStaged(LP.address, App.YOUR_ADDRESS)

    if (currentStakedAmount > 0) {
        showLoading()
        REWARD_POOL.bond(LP.address, currentStakedAmount, { gasLimit: 500000 })
            .then(function (t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function () {
                hideLoading()
            })
    }
}

async function printDaoUnbonds(provider, DAO, epoch, fluidEpochs, epochTimeSec, price, displayDecimals) {
    const fluidBlocks = Math.round(fluidEpochs * epochTimeSec / 13.5 * 1.1); //10% leeway
    const blockNumber = await provider.getBlockNumber();
    const unbonds = await DAO.queryFilter(DAO.filters.Unbond(), blockNumber - fluidBlocks, blockNumber);
    for (let i = 0; i < fluidEpochs; i++) {
        let filtered = unbonds.filter(u => epoch + i + 1 - fluidEpochs == u.args?.start / 1);
        let unbonding = filtered.map(u => u.args?.value / 1e18).reduce((x, y) => x + y, 0);
        _print(`Unbonding at epoch ${epoch + i}: ${unbonding.toFixed(displayDecimals ?? 2)} ($${formatMoney(unbonding * price)})`)
    }
}

async function getTotalCollateral(App, DAO) {
    const ethPrice = await lookUpPrices(['ethereum']);
    let balance = 0;
    for (const pool of Contracts.VSD.Pools) {
        const baseToken = new ethers.Contract(pool.baseCoin, ERC20_ABI, App.provider);
        let collateral = await baseToken.balanceOf(DAO.address) / 10 ** pool.baseDecimals;
        if (pool.baseCoinTicker === 'WETH') {
            collateral = collateral * ethPrice.ethereum.usd;
        }
        balance += collateral;
    }
    return balance;
}

const zip = rows => rows[0].map((_, c) => rows.map(row => row[c]));

async function compute30DayYieldRate(App, DAO, twap, epoch) {
    const supplyIncrease = DAO.filters.SupplyIncrease();
    const increases = await DAO.queryFilter(supplyIncrease);
    let filtered = increases.filter(prop => prop.args.epoch >= epoch - 89)
        .filter(prop => prop.args.newReward != "0")
        .map((event) => { return { newReward: event.args.newReward, blockNumber: event.blockNumber }; })
        .sort((a, b) => b.blockNumber - a.blockNumber);
    let totals = await Promise.all(filtered.map(async e => {
        return await DAO.totalSupply({ blockTag: e.blockNumber });
    }));
    totals = totals.map(e => e / 1e18);
    const newBonds = filtered.map(e => e.newReward / 1e18);
    const tuple = zip([newBonds, totals]);
    const accumulated = tuple.reduce((a, [b, t]) => {
        console.log("b=" + b + ", t=" + t + ", r=" + b / t);
        return a * (b / t + 1);
    }, 1);
    let last90EpochRate = accumulated;
    if (twap > 1.05) {
        const currBondedTotal = await DAO.totalSupply() / 1e18;
        const currNewBonded = await computeEpochYield(App, DAO, twap) / 1e18;
        console.log("bond=" + currNewBonded + ", total=" + currBondedTotal + ", rate=" + currNewBonded / currBondedTotal)
        if (currNewBonded > 0 && currBondedTotal > 0) {
            last90EpochRate *= currNewBonded / currBondedTotal + 1;
        }
    }
    return (last90EpochRate - 1) / 2;
}

async function computeEpochYield(App, DAO, price) {
    const reserve = await getVSDReserveInPools(App);
    console.log("reserve", reserve)
    let sellAmount = (Math.sqrt(price / 1.05) - 1) * reserve;
    const returnAmount = (price - Math.sqrt(price * 1.05)) * reserve;
    if (sellAmount > returnAmount) {
        sellAmount = returnAmount;
    }
    let newSupply = returnAmount / 0.9 - sellAmount;
    const rewards = newSupply * 0.15;
    if (newSupply > rewards) {
        newSupply -= rewards;
    }
    const coupons = await DAO.totalCoupons() / 1e18;
    const redeemable = await DAO.totalRedeemable() / 1e18;
    console.log("coupons", coupons)
    console.log("redeemable", redeemable)
    if (redeemable < coupons) {
        let newRedeemable = coupons - redeemable;
        if (newRedeemable > newSupply) {
            newRedeemable = newSupply;
        }
        newSupply -= newRedeemable;
    }
    return newSupply;
}



const getVSDReserveInPools = async (App) => {
    let reserves = 0;
    for (const pool of Contracts.VSD.Pools) {
        const [res, token0] = await getReserves(App, pool.address);
        const token0IsVsd = token0.toLowerCase() !== pool.baseCoin.toLowerCase();
        const reserve = (token0IsVsd ? res._reserve0 : res._reserve1) / 1;
        reserves += reserve;
    }
    return reserves;
}



