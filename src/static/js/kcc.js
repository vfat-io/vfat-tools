$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"KCC Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      [ "KuSwap",     `<a href="kuswap"       >Various</a>`,     "KUS",      "https://kuswap.io" ]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
