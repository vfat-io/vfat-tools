$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Meter Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Voltswap               ", `<a href="voltswap"         >Various</a>`,"VOLT            ","https://farm.voltswap.finance"]
    ]}

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}

