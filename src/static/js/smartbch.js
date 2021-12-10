$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"SmartBCH Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["BenSwap             ", `<a href="benswap"       >Various</a>`,"EBEN             ","https://benswap.cash"],
      ["MistSwap            ", `<a href="mistswap"      >Various</a>`,"MIST, xMIST      ","https://app.mistswap.fi"],
      ["MuesliSwap BCH      ", `<a href="muesliswap"    >Various</a>`,"MILK             ","https://muesli.cash"],
      ["TangoSwap           ", `<a href="tangoswap"     >Various</a>`,"TANGO            ","https://tangoswap.cash"]
    ]}

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
