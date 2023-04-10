$(function () {
    consoleInit(main)
});

const NEXON_ABI = {
    comptroller: [
        {
            inputs: [],
            name: 'getAllMarkets',
            outputs: [{ internalType: 'contract PToken[]', name: '', type: 'address[]' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{"internalType":"address","name":"","type":"address"}],
            name: 'compSpeeds',
            outputs: [{"internalType":"uint256","name":"","type":"uint256"}],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'oracle',
            outputs: [{"internalType":"address","name":"","type":"address"}],
            stateMutability: 'view',
            type: 'function',
        }
    ],
    pToken: [
        {
            inputs: [],
            name: 'totalReserves',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'totalSupply',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'exchangeRateStored',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'supplyRatePerBlock',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'totalBorrows',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'borrowBalanceStored',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'borrowRatePerBlock',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getCash',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'interestRateModel',
            outputs: [{ internalType: 'contract IInterestRateModel', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'underlying',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
    ],
    erc20: [
        {
            constant: true,
            inputs: [],
            name: 'symbol',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: true,
            inputs: [],
            name: 'decimals',
            outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
    ],
    oracle: [
        {
            inputs: [{ internalType: 'address', name: '_pToken', type: 'address' }],
            name: 'getUnderlyingPrice',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
    ],
    rate: [
        {
            inputs: [],
            name: 'blocksPerYear',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
    ],
}

const contracts = {
    comptroller: '0x0171cA5b372eb510245F5FA214F5582911934b3D',  //or 0x63CA82910a3e1Fd9dfe093E04982907addFacdE1
    gas: {
        p_address: '0x1BbD33384869b30A323e15868Ce46013C82B86FB',  //NETH
        symbol: 'ETH',
        decimals: 18,
    },
};

async function main() {
    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const tokens = {};
    const prices = await getZkSyncEraPrices();

    const COMPTROLLER = new ethers.Contract(contracts.comptroller, NEXON_ABI.comptroller, App.provider);

    const oracle = await COMPTROLLER.oracle();

    const allMarkets = await COMPTROLLER.getAllMarkets();

    // console.log(allMarkets);

    const data = await Promise.all(allMarkets.map(token => loadData(App, token, COMPTROLLER, prices, oracle)));

    // console.log(data);

    let [totalSupply, totalBorrow, totalCash] = [0, 0, 0];

    for (const market of data) {
        totalSupply += market.totalSupply * market.underlyingPrice;
        totalBorrow += market.totalBorrows * market.underlyingPrice;
        totalCash += market.cash * market.underlyingPrice;
    }
    _print_bold(`Deposit Market Size : $${formatMoney(totalSupply)}`);
    _print_bold(`Borrow Market Size : $${formatMoney(totalBorrow)}`);
    _print_bold(`TVL : $${formatMoney(totalCash)}`);
    _print("");

    for (const market of data) {
        printData(market);
    }

    hideLoading();
}

async function loadData(App, token, comptroller, prices, oracle) {

    const PTOKEN_CONTRACT = new ethers.Contract(token, NEXON_ABI.pToken, App.provider);

    const totalReserves_ = await PTOKEN_CONTRACT.totalReserves()
    const totalSupply_ = await PTOKEN_CONTRACT.totalSupply()
    const supply_ = await PTOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS)
    const exchangeRate_ = await PTOKEN_CONTRACT.exchangeRateStored()
    const supplyRatePerBlock_ = await PTOKEN_CONTRACT.supplyRatePerBlock()
    const totalBorrows_ = await PTOKEN_CONTRACT.totalBorrows()
    const borrowBalanceOf_ = await PTOKEN_CONTRACT.borrowBalanceStored(App.YOUR_ADDRESS)
    const borrowRatePerBlock_ = await PTOKEN_CONTRACT.borrowRatePerBlock()
    const cash_ = await PTOKEN_CONTRACT.getCash()
    const interestRateModel = await PTOKEN_CONTRACT.interestRateModel()

    let underlyingSymbol, underlyingDecimals;

    if (token.toLowerCase() === contracts.gas.p_address.toLowerCase()) {
        underlyingSymbol = contracts.gas.symbol;
        underlyingDecimals = contracts.gas.decimals;
    } else {
        const underlying = await PTOKEN_CONTRACT.underlying();
        const UNDERLYING_CONTRACT = new ethers.Contract(underlying, NEXON_ABI.erc20, App.provider);
        underlyingSymbol = await UNDERLYING_CONTRACT.symbol();
        underlyingDecimals = await UNDERLYING_CONTRACT.decimals();
    }

    const ORACLE_CONTRACT = new ethers.Contract(oracle, NEXON_ABI.oracle, App.provider);
    const underlyingPrice_ = await ORACLE_CONTRACT.getUnderlyingPrice(token);
    const underlyingPrice = underlyingPrice_ / 10 ** (18 + 18 - underlyingDecimals);

    const totalReserves = totalReserves_ / 10 ** underlyingDecimals;

    const exchangeRate = exchangeRate_ / 1e18;
    const totalSupply = totalSupply_ * exchangeRate / 10 ** underlyingDecimals;
    const supply = supply_ * exchangeRate / 10 ** underlyingDecimals;
    const supplyPct = supply / totalSupply * 100;

    const totalBorrows = totalBorrows_ / 10 ** underlyingDecimals;
    const borrow = borrowBalanceOf_ / 10 ** underlyingDecimals;
    const borrowPct = borrow / totalBorrows * 100;

    const cash = cash_ / 10 ** underlyingDecimals;

    const RATE_CONTRACT = new ethers.Contract(interestRateModel, NEXON_ABI.rate, App.provider);
    const blocksPerYear = await RATE_CONTRACT.blocksPerYear();

    const supplyAPY = ((1 + supplyRatePerBlock_ / 1e18) ** blocksPerYear - 1) * 100;
    const borrowAPY = ((1 + borrowRatePerBlock_ / 1e18) ** blocksPerYear - 1) * 100;

    let supplyFarmingAPY = 0;
    const farmingRewards_ = await comptroller.compSpeeds(token);
    const farmingRewards = farmingRewards_ / 1e18;
    const blocksPerYear_ = blocksPerYear * 1
    const tvl = totalSupply * underlyingPrice;
    //missing this address. token contract is not ready
    const rewardPrice = getParameterCaseInsensitive(prices, "")?.usd;
    if(farmingRewards > 0){
      supplyFarmingAPY = farmingRewards * blocksPerYear_ * rewardPrice / tvl * 100
    }
    const borrowFarmingAPY = 0;

    const supplyNetAPY = supplyAPY + supplyFarmingAPY
    const borrowNetAPY = borrowFarmingAPY - borrowAPY

    const supplyUsdPerYear = supply * underlyingPrice * supplyNetAPY / 100;
    const supplyUsdPerWeek = supplyUsdPerYear / 52;
    const supplyUsdPerDay = supplyUsdPerYear / 365;

    const borrowUsdPerYear = borrow * underlyingPrice * borrowNetAPY / 100;
    const borrowUsdPerWeek = borrowUsdPerYear / 52;
    const borrowUsdPerDay = borrowUsdPerYear / 365;


    return {
        underlyingSymbol,
        underlyingPrice,
        totalSupply,
        totalBorrows,
        totalReserves,
        cash,
        supplyAPY,
        borrowAPY,
        supplyFarmingAPY,
        borrowFarmingAPY,
        supplyNetAPY,
        borrowNetAPY,
        supply,
        supplyUsdPerDay,
        supplyUsdPerWeek,
        supplyUsdPerYear,
        borrow,
        borrowUsdPerDay,
        borrowUsdPerWeek,
        borrowUsdPerYear,
        supplyPct,
        borrowPct
    }
}

async function printData(data) {
    _print_bold(`${data.underlyingSymbol} ($${data.underlyingPrice.toFixed(5)})`);
    _print(`Supplied : ${formatMoney(data.totalSupply)} ($${formatMoney(data.totalSupply * data.underlyingPrice)}) at ${data.supplyAPY.toFixed(2)}% APY`)
    _print(`Borrowed : ${formatMoney(data.totalBorrows)} ($${formatMoney(data.totalBorrows * data.underlyingPrice)}) at ${data.borrowAPY.toFixed(2)}% APY`)
    _print(`Reserves : ${formatMoney(data.totalReserves)} ($${(data.totalReserves * data.underlyingPrice).toFixed(4)})`);
    _print(`Farming APR Supply ${data.supplyFarmingAPY.toFixed(2)}% Borrow ${data.borrowFarmingAPY.toFixed(2)}%`);
    _print(`Net APY Supply ${data.supplyNetAPY.toFixed(2)}% Borrow ${data.borrowNetAPY.toFixed(2)}%`);
    if (data.supply > 0) {
        _print(`You are supplying ${formatMoney(data.supply)} ${data.underlyingSymbol} ($${formatMoney(data.supply * data.underlyingPrice)}), ${(data.supplyPct).toFixed(2)}% of the pool.`)
        _print(`Estimated Supply earnings: Day ($${formatMoney(data.supplyUsdPerDay)}) Week ($${formatMoney(data.supplyUsdPerWeek)}) Year: ($${formatMoney(data.supplyUsdPerYear)})`);
    }
    if (data.borrow > 0) {
        _print(`You are borrowing ${formatMoney(data.borrow)} ${data.underlyingSymbol} ($${formatMoney(data.borrow * data.underlyingPrice)}), ${(data.borrowPct).toFixed(2)}% of the pool.`)
        _print(`Estimated Borrow earnings: Day ($${formatMoney(data.borrowUsdPerDay)}) Week ($${formatMoney(data.borrowUsdPerWeek)}) Year: ($${formatMoney(data.borrowUsdPerYear)})`);
    }
    _print("");
}