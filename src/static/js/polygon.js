$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"POLYGON Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Quickswap    ",`<a href="quick"         >Various</a>`,"QUICK  ","https://quickswap.exchange/#/quick"],
        ["Cometh *     ",`<a href="cometh"        >Various</a>`,"MUST   ","https://swap.cometh.io/#/stake"],
        ["Dark         ",`<a href="dark"          >Various</a>`,"DB     ","https://www.dark.build"],
        ["Smartdex     ",`<a href="smartdex"      >Various</a>`,"NIOX   ","https://swap.smartdex.app"],
        ["Elk          ",`<a href="elk"           >Various</a>`,"ELK    ","https://app.elk.finance"],
        ["Polywhale    ",`<a href="polywhale"     >Various</a>`,"KRILL  ","https://polywhale.finance"],
        ["Aave         ",`<a href="aave"          >Various</a>`,"MATIC  ","https://aave.com"],
        ["Polyfox      ",`<a href="polyfox"       >Various</a>`,"FOX    ","https://polyfox.finance"],
        ["Hawkdex      ",`<a href="hawk"          >Various</a>`,"HAWK   ","https://hawkdex.com"],
        ["Polycat      ",`<a href="polycat"       >Various</a>`,"FISH   ","https://polycat.finance"],
        ["BoughtThe.top",`<a href="boughtthetop"  >Various</a>`,"BTT    ","https://farm.BoughtThe.top"],
        ["PolyStarter  ",`<a href="polystarter"   >Various</a>`,"STARTER","https://www.polystarter.fi"],
        ["Polyvolve    ",`<a href="polyvolve"     >Various</a>`,"SPEAR  ","https://polyvolve.finance"],
        ["Polygaj      ",`<a href="polygaj"       >Various</a>`,"GAJ    ","https://polygaj.finance"],
        ["Galaxy       ",`<a href="galaxy"        >Various</a>`,"Various","https://galaxyfarm.routerprotocol.com"],
        ["Zenko        ",`<a href="zenko"         >Various</a>`,"ZENKO  ","https://app.zenko.finance"],
        ["GameSwap     ",`<a href="gameswap"      >Various</a>`,"STONK  ","https://gameswapfinance.com"],
        ["Blackswap    ",`<a href="blackswap"     >Various</a>`,"AURORA ","https://www.blackswap.finance"],
        ["Polycake     ",`<a href="polycake"      >Various</a>`,"PCAKE  ","https://www.polycake.finance"],
        ["Polyrangers  ",`<a href="polyrangers"   >Various</a>`,"RNG    ","https://polyrangers.finance"],
        ["Sushi        ",`<a href="sushi"         >Various</a>`,"SUSHI  ","https://app.sushi.com"],
        ["Mai          ",`<a href="mai"           >Various</a>`,"Qi     ","https://www.mai.finance"],
        ["Polyshark    ",`<a href="polyshark"     >Various</a>`,"SHARK  ","https://www.polyshark.finance"],
        ["Polyfi       ",`<a href="polyfi"        >Various</a>`,"PolyFi ","https://polyfi.io"],
        ["Polyape      ",`<a href="polyape"       >Various</a>`,"Ape    ","https://www.polyape.online"],
        ["Polyzap      ",`<a href="polyzap"       >Various</a>`,"PZAP   ","https://farm.polyzap.finance"],
      ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
