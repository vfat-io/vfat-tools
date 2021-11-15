$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Aurora Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Trisolaris ",     `<a href="trisolaris"       >Various</a>`,      "TRI",       "https://www.trisolaris.io" ]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
