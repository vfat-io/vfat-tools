$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Telos EVM Mainnet",
    "heading":["Pool Provider","MCN","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["OmniDex             ","", `<a href="omnidex"       >Various</a>`,"CHARM            ","https://omnidex.finance"],
      ["Zappy               ","", `<a href="zappy"         >Various</a>`,"ZAP              ","https://zappy.finance"]
    ]}

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
