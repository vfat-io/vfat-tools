$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Fraxtal Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Velodrome             ", `<a href="velodrome"      >Various</a>`,"XVELO         ","https://app.velodrome.finance"],
      ["Velodrome Bridge      ", `<a href="velo_bridge"    >Various</a>`,"XVELO -> VELO ",""],
      ["Sickle                ", `<a href="sickle"         >Various</a>`,"              ",""]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
