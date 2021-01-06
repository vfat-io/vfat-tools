$(function() {
    consoleInit();
    start(main);
});

async function main() {  
    
    const App = await init_ethers()
    //_print(`Initialized ${App.YOUR_ADDRESS}`)

    let newurl = getUrlParameter('url')
    const url = newurl ? newurl : "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"

    const query = `
    {
        pairs(first:75 orderBy:createdAtTimestamp orderDirection:desc) {
            id
            createdAtTimestamp
            token0 {
                symbol
            }
            token1 {
                symbol
            }
            reserveUSD
        }
    }
    `
    //const url = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2" 
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      };
      /*
     fetch(url, opts)
        .then(res => res.json())
        .then(console.log)
        .catch(console.error);
        */
    const rez = await fetch(url, opts);
    const rezz = await rez.json();

    function convertTimestamptoTime(unixTimestamp) { 
        //unixTimestamp = 10637282; 
        // convert to milliseconds and  
        // then create a new Date object 
        dateObj = new Date(unixTimestamp * 1000); 
        utcString = dateObj.toUTCString(); 
        time = utcString; //.slice(-11, -4); 
        return time 
    } 
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

    var asdf = {
        "title":"new uni pools",
        "heading":["timestamp","pair", "liquidity in usd", "pair addr"],
        "rows": []
    }
    //https://info.uniswap.org/pair/0xffd5045bd5139bd2865c126391a7ff3c06916051
    rezz.data.pairs.map(x => 
        asdf.rows.push( [
            convertTimestamptoTime(x.createdAtTimestamp),
            `${x.token0.symbol}-${x.token1.symbol}`,
            formatter.format(x.reserveUSD.substr(0,10)),
            `<a href='https://info.uniswap.org/pair/${x.id}'>${x.id}</a>` ] )
    ) 
    
    var table2 = new AsciiTable().fromJSON(asdf);
    logger.innerHTML += table2 + '<br />';

}
