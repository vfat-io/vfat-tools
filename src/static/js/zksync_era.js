$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"zkSync Era Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Nexon Finance",                `<a href="nexon"        >Various</a>`,      "NXN",         "https://app.nexon.finance" ]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
