$(function() {
  main()
});

const main = async() => {

  /*if (!ARBITRUM_LAUNCHED) {
    _print('*** Arbitrum Mainnet is not live yet ***')
    _print('*** Only whitelisted users can interact with dApps at the moment ***')
    _print('')
  }*/

  let tableData = {
    "title":"Arbitrum Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["GMX                 ", `<a href="/arbitrum/gmx"      >Various</a>`,"ETH,Escrowed GMX   ","https://gmx.financial"],
      ["Sushi               ", `<a href="/arbitrum/sushi"    >Various</a>`,"SUSHI              ","https://app.sushi.com"]
     ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}