$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Katana Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Sickle                ", `<a href="sickle"         >Various</a>`,"              ",""],
      ["vKAT Claim            ", `<a href="claim"          >vKAT</a>`,   "avKAT         ",""]

    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}
