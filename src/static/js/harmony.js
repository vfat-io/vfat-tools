$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Harmony Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      [
        "Mochi",
        `<a href='mochi'>Various</a>`,
        "hMOCHI",
        "https://harmony.mochiswap.io"
      ],
      [
        "Viper",
        `<a href='viper'>Various</a>`,
        "VIPER",
        "https://viper.exchange"
      ],
      [
        "CopyPasta",
        `<a href='copypasta'>Various</a>`,
        "PASTA",
        "https://copypasta.one"
      ],
      [
        "Viper (smartchef)",
        `<a href='viper/smartchef'>Various</a>`,
        "Various",
        "https://viper.exchange"
      ],
      [
        "Open Swap",
        `<a href='oswap'>Various</a>`,
        "oSWAP",
        "https://app.openswap.one"
      ],
      [
        "Loot",
        `<a href='loot'>Various</a>`,
        "LOOT",
        "https://lootswap.finance"
      ],
      [
        "Daikiri",
        `<a href='daikiri'>Various</a>`,
        "DAIKI",
        "https://daikiri.finance/#"
      ],
      [
        "Sushi",
        `<a href='sushi'>Various</a>`,
        "SUSHI",
        "https://app.sushi.com"
      ],
      [
        "Piggybank",
        `<a href='piggybank'>Various</a>`,
        "COINK",
        "https://piggybank.farm/#/"
      ],
      [
        "Troll",
        `<a href='troll'>Various</a>`,
        "TROLL",
        "https://lootswap.finance/guilds/troll"
      ],
      [
        "Arbiter",
        `<a href='arbiter'>Various</a>`,
        "ARB",
        "https://lootswap.finance/guilds/arb"
      ],
      [
        "Bard",
        `<a href='bard'>Various</a>`,
        "BARD",
        "https://lootswap.finance/guilds/bard"
      ],
      [
        "Cosmic",
        `<a href='cosmic'>Various</a>`,
        "MAGIC",
        "https://lootswap.finance/guilds/cosmic"
      ],
      [
        "Sonicswap",
        `<a href='sonicswap'>Various</a>`,
        "SONIC",
        "https://sonicswap.io/#/staking"
      ],
      [
        "Defi Kingdoms",
        `<a href='defikingdoms'>Various</a>`,
        "JEWEL",
        "https://game.defikingdoms.com"
      ],
      [
        "Rain",
        `<a href='rain'>Various</a>`,
        "RAIN",
        "https://rainfinance.one"
      ],
      [
        "FATExDAO",
        `<a href='fatex'>Various</a>`,
        "FATE",
        "https://app.fatex.io"
      ],
      [
        "TheValleys",
        `<a href='thevalleys'>Various</a>`,
        "AME",
        "https://thevalleys.one"
      ],
      [
        "FarmersOnlyFi",
        `<a href='farmersonly'>Various</a>`,
        "FOX",
        "https://app.farmersonly.fi"
      ],
      [
        "Fuzz Finance",
        `<a href='fuzz'>Various</a>`,
        "FUZZ",
        "https://fuzz.fi"
      ],
      [
        "Artemis Protocol",
        `<a href='artemisprotocol'>Various</a>`,
        "MIS",
        "https://app.artemisprotocol.one"
      ],
      [
        "Harmony Cougar",
        `<a href='cougar'>Various</a>`,
        "CGS",
        "https://harmonyapp.cougarswap.io"
      ],
      [
        "ADENA Finance",
        `<a href='adena'>Various</a>`,
        "ADENA",
        "https://adena.finance"
      ],
      [
        "Elephant Exchange",
        `<a href='elephant'>Various</a>`,
        "ELEPHANT",
        "https://elephant.ac"
      ],
      [
        "Curve",
        `<a href='curve'>Various</a>`,
        "CRV/ONE",
        "https://harmony.curve.fi"
      ],
      [
        "HarmoNYAN",
        `<a href='harmonyan'>Various</a>`,
        "HNYAN",
        "https://harmonyan.one"
      ],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
