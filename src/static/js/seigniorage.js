$(function() {
    consoleInit();
    start(main);
});

const getPriceFromUniswap = async (App, basePrices, lpAddress, tokenAddress, baseTokenAddress, baseDecimals) => {
    const uni = new ethcall.Contract(lpAddress, ABI.UNI_V2);
    const [token0,  { _reserve0, _reserve1 }] = await App.ethcallProvider.all([uni.token0(), uni.getReserves()]);
    const basePrice = getParameterCaseInsensitive(basePrices, baseTokenAddress).usd;
    if (token0.toLowerCase() == tokenAddress.toLowerCase()) {
        //will need changing if any dollar token doesnt have 18 decimals
        return _reserve1 / 10 ** baseDecimals * basePrice / (_reserve0 / 1e18)
    }
    else {            
        return _reserve0 / 10 ** baseDecimals * basePrice / (_reserve1 / 1e18)
    }
}

const getDollar = async (App, basePrices, v) => {    
    const price = await getPriceFromUniswap(App, basePrices, v.UniswapLP.address, v.Dollar.address, 
        v.UniswapLP.baseCoin, v.UniswapLP.baseDecimals);
    const dol = new ethers.Contract(v.Dollar.address, ABI.ERC20, App.provider);
    const dao = new ethers.Contract(v.DAO.address, v.DAO.abi, App.provider);
    const marketCap = await dol.totalSupply() / 1e18 * price;
    const epoch = await dao.epoch();
    let twap; 
    try {
        twap = await getTWAP(App, v.UniswapLP.address, v.Dollar.address, v.UniswapLP.baseDecimals);
    }
    catch {}
    const status =
        epoch <= (v.Parameters?.BootstrappingPeriod ?? 0) ? "Bootstrap" 
            : (twap > 1 ? "Expansion" : "Contraction");
    return {
        page : v.Page,
        name : v.Dollar.ticker,
        lpToken : v.UniswapLP.ticker,
        epoch,
        price,       
        twap,   
        status,  
        marketCap
    }
}

const getBasisFork = async (App, basePrices, v) => {
    const getPrice = (lp, token) => getPriceFromUniswap(App, basePrices, lp, token, v.CashPool.baseCoin, v.CashPool.baseDecimals)
    const sharePrice = await getPrice(v.ShareLP, v.Share);
    const cashPrice = await getPrice(v.UniswapLP, v.Cash);
    const share = new ethcall.Contract(v.Share, ABI.ERC20);
    const [totalSupply, pool1, pool2] = await App.ethcallProvider.all([share.totalSupply(),
        share.balanceOf(v.CashPool.address), share.balanceOf(v.SharePool.address)]);
    const cash = new ethers.Contract(v.Cash, ABI.ERC20, App.provider);
    const shareMarketCap = (totalSupply - pool1 - pool2) / 1e18 * sharePrice;
    const cashMarketCap = await cash.totalSupply() / 1e18 * cashPrice;
    return { 
        page : v.Page,
        cash : v.CashTicker,
        share : v.ShareTicker,
        cashPrice,
        sharePrice,
        marketCap : cashMarketCap + shareMarketCap
    }
}

const main = async() => {
    const App = await init_ethers();
    const dollarBaseCoins = Object.entries(Dollars).map(([,v])=>v.UniswapLP.baseCoin);
    const basisBaseCoins = Object.entries(Basis).map(([,v])=>v.CashPool.baseCoin);
    const uniqueBaseCoins = dollarBaseCoins.concat(basisBaseCoins).filter((v, i, a) => a.indexOf(v) === i);
    const basePrices = await lookUpTokenPrices(uniqueBaseCoins);
    const dollars = await Promise.all(Object.entries(Dollars).map(([,v]) => getDollar(App, basePrices, v)));
    const basisForks = await Promise.all(Object.entries(Basis).map(([,v]) => getBasisFork(App, basePrices, v)));
    
    var tableData = {
        "title":"Self-Stabilizing Dollars",
        "heading":["Ticker","Pool", "Epoch", "Price", "TWAP", "Status", "Combined Market Cap"],
        "rows": []
    }
    dollars.sort((a, b) => b.marketCap - a.marketCap);
    for (const d of dollars) {
        tableData.rows.push( [
            //`<a href='/${d.page}/'>${d.name}</a>`,
            d.name,
            d.lpToken,
            d.epoch,
            `$${formatMoney(d.price)}`,
            d.twap?.toFixed(2),
            d.status,
            `$${formatMoney(d.marketCap)}`
        ] )
    }
    var table = new AsciiTable().fromJSON(tableData);
    logger.innerHTML += table + '<br />';    
    
    _print_bold(`\nTotal Market Cap: $${formatMoney(dollars.reduce((v1, d2)=>v1+d2.marketCap, 0))}\n`);

    var table2Data = {
        "title":"Seigniorage Shares",
        "heading":["Cash","Share", "Cash Price", "Share Price", "Market Cap"],
        "rows": basisForks.sort((a, b) => b.marketCap - a.marketCap).map(b => [
            b.cash, 
            b.share, 
            `$${formatMoney(b.cashPrice)}`,
            `$${formatMoney(b.sharePrice)}`,
            `$${formatMoney(b.marketCap)}`
        ])
    };
    var table2 = new AsciiTable().fromJSON(table2Data);
    logger.innerHTML += '<br />' + table2 + '<br />';
    
    _print_bold(`\nTotal Market Cap: $${formatMoney(basisForks.reduce((v1, d2)=>v1+d2.marketCap, 0))}\n`);

    hideLoading();
}