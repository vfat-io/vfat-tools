$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Shimmer Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["ShimmerSea         ", `<a href='shimmersea'        >Various</a>`,"LUM        ","https://shimmersea.finance"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
