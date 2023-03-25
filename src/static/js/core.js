$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Core Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        //["MIND Games",                `<a href="mindgames"        >Various</a>`,      "CELL",         "https://play.mindgames.io" ]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
