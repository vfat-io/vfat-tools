$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Function X Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Fx-Swap",          `<a href="fxswap"       >Various</a>`,      "FX",          "https://fx-swap.io"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
