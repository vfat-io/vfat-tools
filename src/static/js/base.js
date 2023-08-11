$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Base Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["SwapBased Finance              ",`<a href="swapbased"            >Various</a>`,"BASE            ","https://swapbased.finance"],
      ["Chz Finance                    ",`<a href="chz"                  >Various</a>`,"CHZ             ","https://chz.finance"],
      ["BaseSwap Finance               ",`<a href="baseswap"             >Various</a>`,"BSWAP           ","https://baseswap.fi"],
      ["SynthSwap                      ",`<a href="synthswap"            >Various</a>`,"SYNTH           ","https://www.synthswap.io"],
      ["Balancer                       ",`<a href="balancer"             >Various</a>`,"Various         ","https://app.balancer.fi/#/base"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
