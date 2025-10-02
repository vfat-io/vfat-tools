$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Telos EVM Mainnet",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Sickle                ", `<a href="sickle"         >Various</a>`,"              ",""]
    ].reverse()}  

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
