$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Polis Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["HadesSwap             ", `<a href="hadesswap"       >Various</a>`,"SOUL             ","https://hadesswap.finance"]
    ]}

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
