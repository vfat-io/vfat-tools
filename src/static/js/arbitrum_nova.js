$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Arbitrum Nova Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Sushi                     ",`<a href="sushi"                  >Various</a>`,"SUSHI               ","https://www.sushi.com"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
