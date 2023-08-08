$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Base Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["SwapBased Finance              ",`<a href="swapbased"            >Various</a>`,"BASE            ","https://swapbased.finance"],
      ["Chz Finance                    ",`<a href="chz"                  >Various</a>`,"CHZ             ","https://chz.finance"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
