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
      ]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
