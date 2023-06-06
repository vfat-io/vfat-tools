$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Goerli Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Fire                ", `<a href="/goerli/fire"        >Various</a>`,"wFIRE          ","https://twitter.com/promethios_fire"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
