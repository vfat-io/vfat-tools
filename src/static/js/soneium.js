$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Soneium Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Velodrome Bridge      ", `<a href="bridge"         >Various</a>`,"XVELO -> VELO ",""]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
