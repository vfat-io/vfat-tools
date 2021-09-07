$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Arbitrum Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["GMX                 ", `<a href="/arbitrum/gmx"      >Various</a>`,"ETH,Escrowed GMX   ","https://gmx.financial"],
      ["Sushi               ", `<a href="/arbitrum/sushi"    >Various</a>`,"SUSHI              ","https://app.sushi.com"],
      ["DODO                ", `<a href="/arbitrum/dodo"     >Various</a>`,"DODO               ","https://app.dodoex.io"]
     ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}