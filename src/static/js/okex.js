$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"OKEX Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Sakeswap",   `<a href='sakeswap'>Various</a>`,  "SAKE",    "https://okapp.sakeswap.fi"],
      ["WePiggy",    `<a href='wepiggy' >Various</a>`,  "WPC ",    "https://okexchain.wepiggy.com/markets"],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
