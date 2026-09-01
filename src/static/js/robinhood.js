$(function () {
  main()
});

const main = async () => {

  let tableData = {
    "title": "Robinhood",
    "heading": ["Pool Provider", "LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Ripe                  ", `<a href="ripe"           >Community farms</a>`, "RIPE          ", ""],
      ["Sickle                ", `<a href="sickle"         >Various</a>`, "              ", ""],
      ["Up33                  ", `<a href="up33"           >Concentrated liquidity</a>`, "UP            ", "Wallet-only"],
      ["GIGA                  ", `<a href="giga"           >Classic + CL farms</a>`, "GIGA          ", "Wallet-only"],
      ["Alandale              ", `<a href="alandale"       >Voter farms</a>`, "LUTE          ", "Wallet-only"],
      ["Catnip                ", `<a href="catnip"         >Alley + MasterProwl farms</a>`, "NIP           ", "Wallet-only"]
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
