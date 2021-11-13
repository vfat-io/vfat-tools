$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"CRONOS Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["CroFarm                 ",`<a href="crofarm"              >Various</a>`,"CRF          ","https://crofarm.app"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
