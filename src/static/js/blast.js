$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Velas Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Uniswap                 ",`<a href="uniswap"          >Various</a>`,"             ","https://app.uniswap.org"],
      ["Sickle                ", `<a href="sickle"            >Various</a>`,"             ",""]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
