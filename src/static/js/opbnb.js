$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"opBNB",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      // ["OmniDex             ", `<a href="omnidex"       >Various</a>`,"CHARM            ","https://omnidex.finance"]
    ].reverse()}  

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
