$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"CELO Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Ubeswap  ",     `<a href="ubeswap"       >Various</a>`,      "UBE ",     "https://app.ubeswap.org" ],
        ["Harem  ",     `<a href="harem"       >Various</a>`,      "HAREM ",     "https://harem.farm/" ]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
