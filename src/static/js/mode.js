$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Mode Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Velodrome             ", `<a href="velodrome"      >Various</a>`,"XVELO         ","https://app.velodrome.finance"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
