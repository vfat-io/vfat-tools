$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"EMERALD OASIS Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Dune Swap         ", `<a href='duneswap'    >Various</a>`,"DUNE        ","https://www.duneswap.com"],
      ["Sahara Exchange   ", `<a href='sahara'      >Various</a>`,"ANKH        ","https://sahara.exchange"],
      ["WePiggy           ", `<a href='wepiggy'     >Various</a>`,"WPC         ","https://app.wepiggy.com"],
      ["Lizard Exchange   ", `<a href='lizardexchange'      >Various</a>`,"LIZ         ","https://lizard.exchange"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
