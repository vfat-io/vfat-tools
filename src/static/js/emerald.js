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
      ["Lizard Exchange   ", `<a href='lizardexchange'>Various</a>`,"LIZ       ","https://lizard.exchange"],
      ["WePiggy           ", `<a href='wepiggy'     >Various</a>`,"WPC         ","https://app.wepiggy.com"],
      ["Valley Swap       ", `<a href='valleyswap'  >Various</a>`,"VS          ","https://valleyswap.com"],
      ["GemKeeper Finance ", `<a href='gemkeeper'   >Various</a>`,"BLING       ","https://app.gemkeeper.finance"],
      ["Yuzu Swap         ", `<a href='yuzu'        >Various</a>`,"YUZU        ","https://app.yuzu-swap.com"]

    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
