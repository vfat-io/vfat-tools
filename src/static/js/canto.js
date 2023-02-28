$(function () {
  main()
});

const main = async () => {

  let tableData = {
    "title": "CANTO Network",
    "heading": ["Pool Provider", "LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Encanto       ",  `<a href='encanto'       >Various</a>`, "ENCANTO          ", "https://encantowetrust.com"],
      ["Canto DEX     ",  `<a href='cantodex'      >Various</a>`, "WCANTO           ", "https://canto.io/         "],
      ["Velocimeter   ",  `<a href='velocimeter'   >Various</a>`, "FLOW             ", "https://www.velocimeter.xyz"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
