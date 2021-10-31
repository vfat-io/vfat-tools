$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"SmartBCH Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["BenSwap             ", `<a href="benswap"       >Various</a>`,"EBEN             ","https://benswap.cash"]
    ]}

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
