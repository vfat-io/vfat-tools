$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Cronos Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["CrodexSwap           ", `<a href='crodex'       >Various</a>`,"CRX          ","https://swap.crodex.app"],
      ["VVS Finance          ", `<a href='vvs'          >Various</a>`,"VVS          ","https://vvs.finance"],
      ["CroFarm              ", `<a href='crofarm'      >Various</a>`,"CRF          ","https://crofarm.app"],
      ["CronaSwap            ", `<a href='crona'        >Various</a>`,"CRONA        ","https://app.cronaswap.org"],
      ["Crystl               ", `<a href='crystl'       >Various</a>`,"Various      ","https://cronos.crystl.finance"],
      ["CronosYield          ", `<a href='cronosyield'  >Various</a>`,"CPY          ","https://www.cronosyield.finance"],
      ["StormSwap            ", `<a href='stormswap'    >Various</a>`,"WIND         ","https://cronos.stormswap.finance"],
      ["Genesis Finance      ", `<a href='genesis'      >Various</a>`,"GENESIS      ","https://genesisfinance.app"],
      ["Zeus Finance         ", `<a href='zeusfinance'  >Various</a>`,"ZEUS         ","https://www.zeusfinance.app"],
      ["Meso Finance         ", `<a href='meso'         >Various</a>`,"croMESO      ","https://cro.meso.finance"],
      ["BlackBird Finance    ", `<a href='bird'         >Various</a>`,"BIRD         ","https://croblackbird.finance"],
      ["SmolSwap             ", `<a href='smolswap'     >Various</a>`,"SMOL         ","https://smolswap.com"],
      ["Autofarm             ", `<a href='autofarm'     >Various</a>`,"Various      ","https://autofarm.network/cronos"],
      ["CroSwap              ", `<a href='croswap'      >Various</a>`,"CSP          ","https://croswapdefi.com"],
      ["MetaCrono Finance    ", `<a href='metacrono'    >Various</a>`,"METACRONO    ","https://www.metacrono.finance/"],
      ["CyberDog Finance     ", `<a href='cbrdog'       >Various</a>`,"CBRDOG       ","https://cyberdog.finance"],
      ["Salem Finance        ", `<a href='salem'        >Various</a>`,"SALEM        ","https://cronos.salem.finance"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
