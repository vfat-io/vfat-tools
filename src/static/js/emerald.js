$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"EMERALD OASIS Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Dune Swap         ", `<a href='duneswap'    >Various</a>`,"DUNE        ","https://www.duneswap.com"],
      ["Sahara Exchange   ", `<a href='sahara'      >Various</a>`,"ANKH        ","https://sahara.exchange"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}