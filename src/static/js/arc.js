$(function () {
  main()
});

const main = async () => {

  let tableData = {
    "title": "Arc Network",
    "heading": ["Pool Provider", "LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Arc Sickle              ", `<a href="/arc/sickle"      >Various</a>`, "                   ", ""],
      ["Uniswap-V3              ", `<a href="/arc/uniswap"     >Various</a>`, "                   ", "https://app.uniswap.org"],
      ["Uniswap-V4              ", `<a href="/arc/uniswap-v4"  >Various</a>`, "                   ", "https://app.uniswap.org"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
