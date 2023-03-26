$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Core Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Shadow Swap",                `<a href="shadowswap"        >Various</a>`,      "SHDW",         "https://shadowswap.xyz" ],
        ["Archer Swap",                `<a href="archerswap"        >Various</a>`,      "BOW",          "https://archerswap.finance" ]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
