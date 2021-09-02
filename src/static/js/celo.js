$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"AVALANCHE Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Ubeswap  ",     `<a href="ubeswap"       >Various</a>`,      "UBE ",     "https://app.ubeswap.org" ]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
