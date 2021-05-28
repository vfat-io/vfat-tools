$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"AVALANCHE Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO", `<a href="https://forms.gle/xjUdSmBNfT1CZASF8">waterfallbotlink</a>`],
    "rows": [
        ["Pangolin ",`<a href="png"     >Various</a>`,"PNG   ","https://app.pangolin.exchange/#/png",         `<a href="https://bit.ly/PNGwaterfall">PNGwaterfall</a>`],
        ["Complus  ",`<a href="complus" >Various</a>`,"COM   ","https://avax.complus.exchange"],
        ["Zero     ",`<a href="zero"    >Various</a>`,"ZERO  ","https://app.0.exchange"],
        ["Yeti     ",`<a href="yeti"    >Various</a>`,"YTS   ","https://exchange.yetiswap.app"],
        ["Pandaswap",`<a href="panda"   >Various</a>`,"BAMBOO","https://pandaswap.exchange",                  `<a href="https://bit.ly/BAMBOOwaterfall">BAMBOOwaterfall</a>`],
        ["Pefi     ",`<a href="pefi"    >Various</a>`,"PEFI  ","https://penguinfinance.org",                  `<a href="https://bit.ly/PEFIwaterfall">PEFIwaterfall</a>`],
        ["Elk *    ",`<a href="elk"     >Various</a>`,"ELK   ","https://elk.finance",                  		`<a href="https://t.me/ELKwaterfall">ELKwaterfall</a>`],
        ["Snowball ",`<a href="snowball">Various</a>`,"SNOB  ","https://snowball.network/earn",                  `<a href="https://bit.ly/SNOBwaterfall">SNOBwaterfall</a>`],
        ["Olive    ",`<a href="olive"   >Various</a>`,"OLIVE ","https://avax.olive.cash",                  `<a href="https://bit.ly/OLIVEwaterfall">OLIVEwaterfall</a>`],
        ["Lydia    ",`<a href="lydia"   >Various</a>`,"LYD   ","https://www.lydia.finance",                  `<a href="https://bit.ly/LYDwaterfall">LYDwaterfall</a>`],
        ["Baguette ",`<a href="baguette">Various</a>`,"BAG   ","https://app.baguette.exchange",                  `<a href="https://bit.ly/BAGwaterfall">BAGwaterfall</a>`],
        ["Gondola  ",`<a href="gondola" >Various</a>`,"GDL   ","https://app.gondola.finance",                  `<a href="https://bit.ly/GDLwaterfall">GDLwaterfall</a>`],
        ["Birdy    ",`<a href="birdy"   >Various</a>`,"BIRD  ","https://birdy.finance"],
      ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
