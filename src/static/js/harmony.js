$(function() {
  main()
})

const main = async () => {
  let tableData = {
    "title":"Harmony Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Parrotdefi",             `<a href="https://twitter.com/MCNVentures/status/1440498902688358402?s=20" target="_blank" class="mcn-reviewed">REVIEW</a>`, `<a href="parrotdefi"  >Various</a>`,"1PEGG              ","https://harmony.parrotdefi.com"],
      ["Mochi",                  "",`<a href='mochi'>Various</a>`,          "hMOCHI",        "https://harmony.mochiswap.io"],
      ["Viper",                  "",`<a href='viper'>Various</a>`,          "VIPER",         "https://viper.exchange"],
      ["CopyPasta",              "",`<a href='copypasta'>Various</a>`,      "PASTA",         "https://copypasta.one"],
      ["Viper (smartchef)",      "",`<a href='viper/smartchef'>Various</a>`,"Various",       "https://viper.exchange"],
      ["OpenSwap",               "",`<a href='oswap'>Various</a>`,          "oSWAP",         "https://app.v1.openswap.one"],
      ["Loot",                   "",`<a href='loot'>Various</a>`,           "LOOT",          "https://lootswap.finance"],
      ["Daikiri",                "",`<a href='daikiri'>Various</a>`,        "DAIKI",         "https://daikiri.finance/#"],
      ["Sushi",                  "",`<a href='sushi'>Various</a>`,          "SUSHI",         "https://app.sushi.com"],
      ["Piggybank",              "",`<a href='piggybank'>Various</a>`,      "COINK",         "https://piggybank.farm/#/"],
      ["Troll",                  "",`<a href='troll'>Various</a>`,          "TROLL",         "https://lootswap.finance/guilds/troll"],
      ["Arbiter",                "",`<a href='arbiter'>Various</a>`,        "ARB",           "https://lootswap.finance/guilds/arb"],
      ["Bard",                   "",`<a href='bard'>Various</a>`,           "BARD",          "https://lootswap.finance/guilds/bard"],
      ["Cosmic",                 "",`<a href='cosmic'>Various</a>`,         "MAGIC",         "https://lootswap.finance/guilds/cosmic"],
      ["Sonicswap",              "",`<a href='sonicswap'>Various</a>`,      "SONIC",         "https://sonicswap.io/#/staking"],
      ["Defi Kingdoms",          "",`<a href='defikingdoms'>Various</a>`,   "JEWEL",         "https://game.defikingdoms.com"],
      ["FATExDAO",               "",`<a href='fatex'>Various</a>`,          "FATE",          "https://app.fatex.io"],
      ["TheValleys",             "",`<a href='thevalleys'>Various</a>`,     "AME",           "https://thevalleys.one"],
      ["FarmersOnlyFi",          "",`<a href='farmersonly'>Various</a>`,    "FOX",           "https://app.farmersonly.fi"],
      ["Fuzz Finance",           "",`<a href='fuzz'>Various</a>`,           "FUZZ",          "https://swap.fuzz.fi"],
      ["Artemis Protocol",       "",`<a href='artemisprotocol'>Various</a>`,"MIS",           "https://app.artemisprotocol.one"],
      ["Harmony Cougar",         "",`<a href='cougar'>Various</a>`,         "CGS",           "https://harmonyapp.cougarswap.io"],
      ["Elephant Exchange",      "",`<a href='elephant'>Various</a>`,       "ELEPHANT",      "https://elephant.ac"],
      ["Curve",                  "",`<a href='curve'>Various</a>`,          "CRV/ONE",       "https://harmony.curve.fi"],
      ["HarmoNYAN",              "",`<a href='harmonyan'>Various</a>`,      "HNYAN",         "https://harmonyan.one"],
      ["BossSwap",               "",`<a href='bossswap'>Various</a>`,       "BOSS",          "https://www.bossswap.finance"],
      ["ParadiseFi",             "","<a href='paradisefi'>Various</a>",     "EDEN",          "https://paradisefi.io"],
      ["Elk *",                  "",`<a href='elk'>Various</a>`,            "ELK",           "https://elk.finance"],
      ["Eggtart",                "",`<a href='eggtart'>Various</a>`,        "EGGT",          "https://eggtartswap.com"],
      ["OpenSwap",               "",`<a href='openx'>Various</a>`,          "OpenX",         "https://app.openswap.one"],
      ["Fool",                   "",`<a href='fool'>Various</a>`,           "FOOL",          "https://lootswap.finance/guilds/fool"],
      ["SmugSwap",               "",`<a href='smugdoge'>Various</a>`,       "BABYSMUG",      "https://smugswap.com"],
      ["Reverse Protocol",       "",`<a href='reverse'>Various</a>`,        "RVRS",          "https://beta.reverseprotocol.one"],
      ["Synapse",                "",`<a href='synapse'>Various</a>`,        "SYN",           "https://synapseprotocol.com"],
      ["Wagmidao",               "",`<a href='wagmidao'>Various</a>`,       "GMI",           "https://app.wagmidao.io"],
      ["Chad Finance",           "",`<a href='chadfinance'>Various</a>`,    "CHAD",          "https://chadfinance.one"],
      ["Hermes",                 "",`<a href='hermes'>Various</a>`,         "PLTS",          "https://plutus.hermesdefi.io"],
      ["Hundred",                "",`<a href='hundred'>Various</a>`,        "HND",           "https://hundred.finance"],
      ["Unite Finance",          "",`<a href='unite'>Various</a>`,          "USHARE",        "https://unitefinance.io"],
      ["WePiggy",                "",`<a href='wepiggy'>Various</a>`,        "WPC",           "https://app.wepiggy.com"],
      ["Greedy Merchants Guild","", `<a href='gmg'>Various</a>`,            "GMG",           "https://gmg.money"],
      ["Comfy Money",            "",`<a href='comfymoney'>Various</a>`,     "COMFY & CSHARE","https://comfy.money"],
      ["Quartz Defi",            "",`<a href='quartzdefi'>Various</a>`,     "QUARTZ",        "https://quartz-defi.one"],
      ["HolyGrail",              "",`<a href='holygrail'>Various</a>`,      "HLY",           "https://holygrail.one"],
      ["Tranquil",               "",`<a href='tranquil'>Various</a>`,       "TRANQ",         "https://app.tranquil.finance"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'
  hideLoading()
}
