$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Velas Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      // NO FARMINGS YET TO ADD
        //["WagyuSwap",     `<a href="wagyuswap"       >Various</a>`,      "WAG",       "https://exchange.wagyuswap.app" ]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
