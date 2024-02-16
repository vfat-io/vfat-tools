$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"SCROLL Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      //["Merchant Moe         ", `<a href='merchantmoe'        >Various</a>`,"MOE        ","https://merchantmoe.com"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
