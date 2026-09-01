$(function () {
  main()
});

const main = async () => {

  let tableData = {
    "title": "Robinhood",
    "heading": ["Pool Provider", "LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Ripe                  ", `<a href="ripe"           >Community farms</a>`, "RIPE          ", ""],
      ["Sickle                ", `<a href="sickle"         >Various</a>`, "              ", ""]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
