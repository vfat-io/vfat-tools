$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Polygon zkEVM",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["QuickSwap                      ",`<a href="quickswap"                 >Various</a>`,"QUICK               ","https://quickswap.gamma.xyz"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
