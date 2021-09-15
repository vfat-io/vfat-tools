$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"IoTeX Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Cyclone             ", `<a href="cyclone"       >Various</a>`,"CYC             ","https://cyclone.xyz"]
        ]
    }
  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
