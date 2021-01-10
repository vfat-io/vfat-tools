$(function() {
    consoleInit();
    start(main);
});

const getDollars = async (App) => {
    const basePrices = await lookUpTokenPrices(Object.entries(Dollars).map(([,v])=>v.UniswapLP.baseCoin));
    const results = await Promise.all(Object.entries(Dollars).map(async ([,v]) => {
        const uni = new ethcall.Contract(v.UniswapLP.address, ABI.UNI_V2);
        const dol = new ethers.Contract(v.Dollar.address, ABI.ERC20, App.provider);
        const [t0, res] = await App.ethcallProvider.all([uni.token0(), uni.getReserves()]);
        return [t0, res, await dol.totalSupply()]
    }));
    let dollars = []
    let i = 0;
    for (const [,v] of Object.entries(Dollars)) {
        const t0 = results[i][0];
        const { _reserve0, _reserve1 } = results[i][1];
        const basePrice = getParameterCaseInsensitive(basePrices, v.UniswapLP.baseCoin).usd;
        let price;
        if (t0.toLowerCase() == v.Dollar.address.toLowerCase()) {
            //will need changing if any dollar token doesnt have 18 decimals
            price = _reserve1 / 10 ** v.UniswapLP.baseDecimals * basePrice / (_reserve0 / 1e18)
        }
        else {            
            price = _reserve0 / 10 ** v.UniswapLP.baseDecimals * basePrice / (_reserve1 / 1e18)
        }
        const marketCap = results[i][2] / 1e18 * price;
        const result = {
            page : v.Page,
            name : v.Dollar.ticker,
            lpToken : v.UniswapLP.ticker,
            price,            
            marketCap
        }
        dollars.push(result);
        i++;
    }
    return dollars;
}

const main = async() => {
    const App = await init_ethers();
    const dollars = await getDollars(App);
    
    var tableData = {
        "title":"Seigniorage Tokens",
        "heading":["Ticker","Pool", "Price", "Market Cap"],
        "rows": []
    }
    dollars.sort((a, b) => b.marketCap - a.marketCap);
    for (const d of dollars) {
        tableData.rows.push( [
            //`<a href='/${d.page}/'>${d.name}</a>`,
            d.name,
            d.lpToken,
            `$${formatMoney(d.price)}`,
            `$${formatMoney(d.marketCap)}`
        ] )
    }
    var table = new AsciiTable().fromJSON(tableData);
    logger.innerHTML += table + '<br />';    
    _print_bold(`\nTotal Market Cap: $${formatMoney(dollars.reduce((v1, d2)=>v1+d2.marketCap, 0))}`);
    hideLoading();
}