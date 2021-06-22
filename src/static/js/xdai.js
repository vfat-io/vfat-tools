$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"XDAI Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Bao"        ,`<a href="bao">Various</a>`         ,"BAO"       ,"https://farms.baoswap.xyz"],
        ["Levin"      ,`<a href="levin">Various</a>`       ,"LEVIN"     ,"https://farm.levinswap.org"]
      ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
