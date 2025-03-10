$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Ink Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Velodrome Bridge      ", `<a href="bridge"         >Various</a>`,"XVELO -> VELO ",""],
      ["Sickle                ", `<a href="sickle"         >Various</a>`,"              ",""]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
