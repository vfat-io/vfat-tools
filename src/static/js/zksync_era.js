$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"zkSync Era Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Nexon Finance",                 `<a href="nexon"         >Various</a>`,      "NXN",         "https://app.nexon.finance" ],
        ["Gem Swap",                      `<a href="gem"           >Various</a>`,      "ZGEM",        "https://zks.gemswap.online" ],
        ["zkSwap",                        `<a href="zkswap"        >Various</a>`,      "ZKS",         "https://zkswap.biz" ],
        ["zkSwap Finance",                `<a href="zkswapfinance" >Various</a>`,      "ZF",          "https://zkswap.finance" ]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
