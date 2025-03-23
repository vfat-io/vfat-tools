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
      ["Balancer                       ",`<a href="balancer"             >Various</a>`,"Various         ","https://app.balancer.fi/#/base"],
      ["velocimeter                    ",`<a href="velocimeter"          >Various</a>`,"BVM             ","https://base.velocimeter.xyz"],
      ["Alienbase                      ",`<a href="alienbase"            >Various</a>`,"ALB             ","https://app.alienbase.xyz"],
      ["CookieBase                     ",`<a href="cookiebase"           >Various</a>`,"COOKIE          ","https://cookiebase.xyz"],
      ["Aerodrome Finance *            ",`<a href="aerodrome"            >Various</a>`,"AERO            ","https://aerodrome.finance"],
      ["Curve Finance                  ",`<a href="curve"                >Various</a>`,"CRV             ","https://curve.fi/#/base"],
      ["Redemption Finance             ",`<a href="redemptionfi"         >Various</a>`,"RDMP            ","https://rdmp.finance"],
      ["NanoSwap                       ",`<a href="nanoswap"             >Various</a>`,"NANO            ","https://nanoswap.xyz"],
      ["Statix Farm                    ",`<a href="statix"               >Various</a>`,"STATIX          ","https://statix.farm"],
      ["Toupee Tech                    ",`<a href="toupee"               >Various</a>`,"oWIG            ","https://www.toupee.tech"],
      ["Ajna                           ",`<a href="ajna"                 >Various</a>`,"AJNA            ","https://app.ajna.finance"],
      ["Pancake Swap V3                ",`<a href="pancakev3"            >Various</a>`,"CAKE            ","https://pancakeswap.finance"],
      ["Base Stuck                     ",`<a href="stuck"                >Various</a>`,"                ","https://vfat.tools/base/stuck"],
      ["Uniswap                        ",`<a href="uniswap"              >Various</a>`,"                ","https://app.uniswap.org"],
      ["Base Sickle                    ",`<a href="sickle"               >Various</a>`,"                ",""]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
