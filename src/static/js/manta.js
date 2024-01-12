$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Manta Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["QuickSwap         ", `<a href='quickswap'        >Various</a>`,"QUICK        ","https://quickswap.exchange"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
