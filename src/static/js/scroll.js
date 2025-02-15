$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"SCROLL Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Dodo         ", `<a href='dodo'        >Various</a>`,"DODO        ","https://app.dodoex.io"],
      ["Nuri         ", `<a href='nuri'        >Various</a>`,"NURI        ","https://www.nuri.exchange"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
