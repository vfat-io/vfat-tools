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
        ["Elk         ",`<a href="elk"        >Various</a>`,"ELK      ","https://elk.finance"],
        ["Snowball    ",`<a href="snowball"   >Various</a>`,"SNOB     ","https://snowball.network/earn"],
        ["Olive       ",`<a href="olive"      >Various</a>`,"OLIVE    ","https://avax.olive.cash"],
        ["Lydia       ",`<a href="lydia"      >Various</a>`,"LYD      ","https://www.lydia.finance"],
        ["Baguette    ",`<a href="baguette"   >Various</a>`,"BAG      ","https://app.baguette.exchange"],
        ["Gondola     ",`<a href="gondola"    >Various</a>`,"GDL      ","https://app.gondola.finance"],
        ["Birdy       ",`<a href="birdy"      >Various</a>`,"BIRD     ","https://birdy.finance"],
        ["Canary      ",`<a href="canary"     >Various</a>`,"CNR      ","https://app.canary.exchange"],
        ["Avalaunch   ",`<a href="avalaunch"  >Various</a>`,"XAVA     ","https://farm.avalaunch.app"],
        ["Avme        ",`<a href="avme"       >Various</a>`,"AVME     ","https://avme.io"],
        ["TraderJoe   ",`<a href="traderjoe"  >Various</a>`,"JOE      ","https://www.traderjoexyz.com"],
        ["Frost       ",`<a href="tundra"     >Various</a>`,"TUNDRA   ","https://frostfinance.farm" ],
        ["Zabu        ",`<a href="zabu"       >Various</a>`,"ZABU     ","https://zabu.finance" ],
        ["DutchFinance",`<a href="dutch"      >Various</a>`,"DUTCH    ","https://avax.theflyingdutchman.finance" ],
        ["Xdollar     ",`<a href="xdollar"    >Various</a>`,"XDO      ","https://xdollar-avax.mcn.ventures" ],
        ["CrabFinance ",`<a href="crab   "    >Various</a>`,"CRAB     ","https://crabfinance.live" ],
        ["Eskimo      ",`<a href="eskimo"     >Various</a>`,"ESKI     ","https://eskimo.farm" ],
        ['Bcharity    ',`<a href="bcharity"   >Various</a>`,'Give     ', 'https://avaxgive.netlify.app'],
        ["EternalFinance" ,`<a href="ikaris"  >Various</a>`,"IKARIS   ","https://avax.eternalfinance.live" ],
        ["Sphereswap  ",`<a href="sphereswap" >Various</a>`,"SPHERE.e ","https://avax.sphereswap.app" ],
        ["LittleFarmer",`<a href="littlefarmer" >Various</a>`,"AFARMER","https://avax.littlefarmer.finance" ],
        ["BerryFactory-Trifle",`<a href="trifle" >Various</a>`,"TRIFLE","https://avaxtrifleberry.world" ],
        ["Crypto Yield Focus",`<a href="cryptoyieldfocus" >Various</a>`,"CYF","https://www.cryptoyieldfocus.com" ],
        ["StormSwap   ",`<a href="stormswap"  >Various</a>`,"STORM    ","https://stormswap.finance" ],
        ["OberonFinance", `<a href="galaxy_oberon" >Various</a>`,"OBERON","https://avalanche-oberon.galaxyfinance.one"],
        ["TheDragonsLair" ,`<a href="dregg"   >Various</a>`,"DREGG    ","https://thedragonslair.farm" ]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
