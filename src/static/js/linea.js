$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Linea Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Nile",                `<a href="nile"                 >Various</a>`,      "NILE",          "https://www.nile.build"],
        ["Pancake Swap V3",     `<a href="pancakev3"            >Various</a>`,      "CAKE",          "https://pancakeswap.finance"],
        ["Etherex V2 Positions",`<a href="etherex"              >Various</a>`,      "",              "https://www.etherex.finance"],
        ["Sickle",              `<a href="sickle"               >Various</a>`,      "",              ""]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
