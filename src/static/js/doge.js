$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Doge Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        //["test",                `<a href="trisolaris"       >Various</a>`,      "TRI",          "https://www.trisolaris.io" ],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
