$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"MANTLE Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Merchant Moe         ", `<a href='merchantmoe'        >Various</a>`,"MOE        ","https://merchantmoe.com"],
      ["Sickle               ", `<a href='sickle'             >Various</a>`,"           ",""]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
