$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"AVALANCHE Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Pangolin    ",`<a href="png"        >Various</a>`,"PNG      ","https://app.pangolin.exchange/#/png"],
        ["Complus     ",`<a href="complus"    >Various</a>`,"COM      ","https://avax.complus.exchange"],
        ["Zero        ",`<a href="zero"       >Various</a>`,"ZERO     ","https://app.0.exchange"],
        ["Yeti        ",`<a href="yeti"       >Various</a>`,"YTS      ","https://exchange.yetiswap.app"],
        ["Pandaswap   ",`<a href="panda"      >Various</a>`,"BAMBOO   ","https://pandaswap.exchange"],
        ["Pefi        ",`<a href="pefi"       >Various</a>`,"PEFI     ","https://penguinfinance.org"],
        ["Elk *       ",`<a href="elk"        >Various</a>`,"ELK      ","https://elk.finance"],
        ["Snowball    ",`<a href="snowball"   >Various</a>`,"SNOB     ","https://snowball.network/earn"],
        ["Olive       ",`<a href="olive"      >Various</a>`,"OLIVE    ","https://avax.olive.cash"],
        ["Lydia       ",`<a href="lydia"      >Various</a>`,"LYD      ","https://www.lydia.finance"],
        ["Baguette    ",`<a href="baguette"   >Various</a>`,"BAG      ","https://app.baguette.exchange"],
        ["Gondola     ",`<a href="gondola"    >Various</a>`,"GDL      ","https://app.gondola.finance"],
        ["Birdy       ",`<a href="birdy"      >Various</a>`,"BIRD     ","https://birdy.finance"],
        ["Canary      ",`<a href="canary"     >Various</a>`,"CNR      ","https://app.canary.exchange"],
        ["Avalaunch   ",`<a href="avalaunch"  >Various</a>`,"XAVA     ","https://farm.avalaunch.app"],
        ["Avme        ",`<a href="avme"       >Various</a>`,"AVME     ","https://avme.io"]
      ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
