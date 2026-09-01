$(function () {
  main()
});

const main = async () => {

  let tableData = {
    "title": "Robinhood",
    "heading": ["Pool Provider", "LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Sickle                ", `<a href="sickle"         >Various</a>`, "              ", ""],
      ["Up33                  ", `<a href="up33"           >Concentrated liquidity</a>`, "UP            ", "Wallet-only"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
