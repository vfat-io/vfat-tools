$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Front Page",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["1inch               ",`<a href="1inch/"             >Various</a>`,"1INCH     ","https://1inch.exchange/#/dao/farming"],
      ["Aave                ",`<a href="aave"               >Various</a>`,"stkAAVE   ","https://aave.com"],
      ["Alchemix            ",`<a href="alcx/"              >Various</a>`,"ALCX      ","https://app.alchemix.fi/farms"],
      ["Alpha DEX           ",`<a href="alphadex/"          >Various</a>`,"DEX       ","https://kitten.finance"],
      ["Armor               ",`<a href="armor/"             >Various</a>`,"ARMOR     ","https://armor.fi"],
      ["Badger              ",`<a href="badger/"            >Various</a>`,"BADGER    ","https://app.badger.finance"],
      ["Bao                 ",`<a href="bao"                >Various</a>`,"BAO       ","https://www.bao.finance"],
      ["Basis               ",`<a href="basis/"             >Various</a>`,"BAS,BAC   ","https://basis.cash"],
      ["Basket DAO          ",`<a href="basketdao"          >Various</a>`,"BASK      ","https://basketdao.org"],
      ["Benchmark           ",`<a href="benchmark/"         >Various</a>`,"MARK      ","https://launchpad.benchmarkprotocol.finance/pools"],
      ["Bella Protocol      ",`<a href="bella/"             >Various</a>`,"BEL       ","https://bella.fi"],
      ["Big Data Protocol   ",`<a href="bdp/"               >Various</a>`,"BDP,bALPHA","https://www.bigdataprotocol.com/datavault"],
      ["Cover Protocol      ",`<a href="cover/"             >Various</a>`,"Various   ","https://app.coverprotocol.com"],
      ["Cryptex             ",`<a href="cryptex"            >Various</a>`,"CTX       ","https://app.cryptex.finance"],
      ["DFX                 ",`<a href="dfx/"               >Various</a>`,"DFX       ","https://v0.dfx.finance/"],
      ["Dynamic Set Dollar  ",`<a href="dsd/"               >Various</a>`,"DSD       ","https://dsd.finance/app"],
      ["Elena               ",`<a href="elena"              >Various</a>`,"ELENA     ","https://app.elena.finance"],
      ["Empty Set Dollar    ",`<a href="esd/"               >Various</a>`,"ESD       ","https://app.emptyset.finance/"],
      ["Fei                 ",`<a href="fei"                >Various</a>`,"FEI       ","https://fei.money"],
      ["Float               ",`<a href="float/"             >Various</a>`,"BANK      ","https://floatprotocol.com/#/stake"],
      ["Force DAO           ",`<a href="forcedao/"          >Various</a>`,"FORCE     ","https://forcedao.com/"],
      ["Frax Finance        ",`<a href="frax/"              >Various</a>`,"FXS       ","https://app.frax.finance/"],
      ["Harvest Finance     ",`<a href="harvest-finance/"   >Various</a>`,"FARM      ","https://harvest.finance"],
      ["Ichi                ",`<a href="ichi/"              >Various</a>`,"Ichi      ","https://ichi.farm"],
      ["Inverse             ",`<a href="inverse/"           >Various</a>`,"INV       ","https://inverse.finance/stake"],
      ["Keep                ",`<a href="keep"               >Various</a>`,"KEEP      ","https://dashboard.keep.network/liquidity"],
      ["Lift.Kitchen        ",`<a href="liftkitchen/"       >Various</a>`,"LIFT      ","https://lift.kitchen"],
      ["Launchpool          ",`<a href="lpool/"             >Various</a>`,"LPOOL     ","https://staking.launchpool.xyz/"],
      ["MITH Cash           ",`<a href="mithcash/"          >Various</a>`,"MIS,MIC   ","https://mith.cash"],
      ["Optionroom          ",`<a href="optionroom"         >Various</a>`,"COURT     ","https://app.optionroom.finance"],
      ["Pickle              ",`<a href="pickle/"            >Various</a>`,"Pickle    ","https://pickle.finance/farms"],
      ["PowerIndex          ",`<a href="powerindex/"        >Various</a>`,"CVP       ","https://powerindex.io"],
      ["Ruler Protocol      ",`<a href="ruler/"             >Various</a>`,"RULER     ","https://app.rulerprotocol.com/app/farms"],
      ["Siren               ",`<a href="siren/"             >Various</a>`,"SI        ","https://sirenmarkets.com/"],
      ["Stabilize           ",`<a href="stabilize/"         >Various</a>`,"STBZ      ","https://stabilize.finance"],
      ["StakeDAO            ",`<a href="stakedao/"          >Various</a>`,"SDT       ","https://stakedao.org"],
      ["Sushiswap           ",`<a href="sushi/"             >Various</a>`,"SUSHI     ","https://app.sushi.com/farms"],
      ["Synthetix           ",`<a href="snx"                >Various</a>`,"SNX       ","https://staking.synthetix.io"],
      ["TrueFi              ",`<a href="truefi/"            >Various</a>`,"TRU       ","https://app.truefi.io/farm"],
      ["Typhoon Cash        ",`<a href="typhoon/"           >Various</a>`,"PHOON     ","https://typhoon.cash"],
      ["Unicly              ",`<a href="unicly/"            >Various</a>`,"UNIC      ","https://www.app.unic.ly/#/farm"],
      ["* Universe *        ",`<a href="universe"           >Various</a>`,"XYZ       ","https://dao.universe.xyz/yield-farming"],
      ["Unslashed           ",`<a href="usf/"               >Various</a>`,"USF       ","https://app.unslashed.finance/"],
      ["Wasabix             ",`<a href="wasabix/"           >Various</a>`,"WASABI    ","https://wasabix.finance/#/app/pool"],
      ["xSigma              ",`<a href="xsigma/"            >Various</a>`,"SIG       ","https://app.xsigma.fi/stake"],
      ["xToken              ",`<a href="xtoken/"            >Various</a>`,"XTK       ","https://xtoken.cafe/app/dashboard"],
      ["Yam                 ",`<a href="yam/"               >YAM-ETH SLP</a>`,"YAM   ","https://yam.finance/farm"],
      ["yAxis               ",`<a href="yaxis/"             >Various</a>`,"yAxis     ","https://yaxis.io/farms"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
