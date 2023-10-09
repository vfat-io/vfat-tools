$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Tenet Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Tenx ",      `<a href="tenx"       >Various</a>`,      "TENX",       "https://www.tenx.exchange" ]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
