$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"SmartBCH Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["BenSwap             ", `<a href="benswap"       >Various</a>`,"EBEN             ","<a href=\"https://benswap.cash\">https://benswap.cash</a>"],
      ["MistSwap            ", `<a href="mistswap"      >Various</a>`,"MIST, xMIST      ","<a href=\"https://app.mistswap.fi\">https://app.mistswap.fi</a>"],
      ["MuesliSwap BCH      ", `<a href="muesliswap"    >Various</a>`,"MILK             ","<a href=\"https://muesli.cash\">https://muesli.cash</a>"],
      ["TangoSwap           ", `<a href="tangoswap"     >Various</a>`,"TANGO            ","<a href=\"https://tangoswap.cash\">https://tangoswap.cash</a>"]
    ]}

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
