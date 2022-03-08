$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Cronos Network",
    "heading":["Pool Provider","MCN","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Croblanc",        `<a href="https://twitter.com/MCNVentures/status/1476907800726892544?cxt=HHwWgMCjxbv0g_8oAAAA" target="_blank" class="mcn-reviewed">REVIEW</a>`, `<a href="croblanc"  >Various</a>`,"CROBLANC              ","https://app.croblanc.com"],
      ["CrodexSwap           ","", `<a href='crodex'       >Various</a>`,"CRX          ","https://swap.crodex.app"],
      ["VVS Finance          ","", `<a href='vvs'          >Various</a>`,"VVS          ","https://vvs.finance"],
      ["CroFarm              ","", `<a href='crofarm'      >Various</a>`,"CRF          ","https://crofarm.app"],
      ["CronaSwap            ","", `<a href='crona'        >Various</a>`,"CRONA        ","https://app.cronaswap.org"],
      ["Crystl               ","", `<a href='crystl'       >Various</a>`,"Various      ","https://cronos.crystl.finance"],
      ["CronosYield          ","", `<a href='cronosyield'  >Various</a>`,"CPY          ","https://www.cronosyield.finance"],
      ["StormSwap            ","", `<a href='stormswap'    >Various</a>`,"WIND         ","https://cronos.stormswap.finance"],
      ["Genesis Finance      ","", `<a href='genesis'      >Various</a>`,"GENESIS      ","https://genesisfinance.app"],
      ["Zeus Finance         ","", `<a href='zeusfinance'  >Various</a>`,"ZEUS         ","https://www.zeusfinance.app"],
      ["Meso Finance         ","", `<a href='meso'         >Various</a>`,"croMESO      ","https://cro.meso.finance"],
      ["BlackBird Finance    ","", `<a href='bird'         >Various</a>`,"BIRD         ","https://croblackbird.finance"],
      ["SmolSwap             ","", `<a href='smolswap'     >Various</a>`,"SMOL         ","https://smolswap.com"],
      ["Autofarm             ","", `<a href='autofarm'     >Various</a>`,"Various      ","https://autofarm.network/cronos"],
      ["CroSwap              ","", `<a href='croswap'      >Various</a>`,"CSP          ","https://croswapdefi.com"],
      ["MetaCrono Finance    ","", `<a href='metacrono'    >Various</a>`,"METACRONO    ","https://www.metacrono.finance"],
      ["CyberDog Finance     ","", `<a href='cbrdog'       >Various</a>`,"CBRDOG       ","https://cyberdog.finance"],
      ["Salem Finance        ","", `<a href='salem'        >Various</a>`,"SALEM        ","https://cronos.salem.finance"],
      ["CronArena            ","", `<a href='cronarena'    >Various</a>`,"CRA          ","https://cronarena.com"],
      ["CROTerra             ","", `<a href='croterra'     >Various</a>`,"CROTerra     ","https://croterra.finance"],
      ["BetaCrono Finance    ","", `<a href='betacrono'    >Various</a>`,"BETACRONO    ","https://beta.metacrono.finance"],
      ["DnaDollar            ","", `<a href='dnadollar'    >Various</a>`,"DNA          ","https://dnadollar.com"],
      ["MM Finance           ","", `<a href='mm'           >Various</a>`,"MMF          ","https://mm.finance"],
      ["Elk                  ","", `<a href='elk'          >Various</a>`,"ELK          ","https://app.elk.finance"],
      ["CROLuan              ","", `<a href='croluan'      >Various</a>`,"LUAN         ","https://luan.croterra.finance/"],
      ["Matrix Finance       ","", `<a href='matrix'       >Various</a>`,"MTX          ","https://www.matrixfinance.io/"],
      ["DarkCrypto Finance   ","", `<a href='darkcrypto'   >Various</a>`,"DARK/SKY     ","https://www.darkcrypto.finance/"],
      ["Cronos Cougar        ","", `<a href='cougar'       >Various</a>`,"CGS          ","https://cronosapp.cougarswap.io/"],
      ["Gaur                 ","", `<a href='gaur'         >Various</a>`,"GSHARE/GAUR  ","https://gaur.money"],
      ["ChronoSwap           ","", `<a href='chronoswap'   >Various</a>`,"CNO          ","https://chronoswap.org"],
      ["Agilefi              ","", `<a href='agilefi'      >Various</a>`,"AGL          ","https://app.agilefi.org"],
      ["1Beam                ","", `<a href='1beam'        >Various</a>`,"1CRO         ","https://1beam.io"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
