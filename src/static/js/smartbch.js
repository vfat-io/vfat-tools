$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"SmartBCH Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["BenSwap             ", `<a href="benswap"       >Various</a>`,"EBEN             ","https://benswap.cash"],
      ["MistSwap            ", `<a href="mistswap"      >Various</a>`,"MIST             ","https://mistswap.fi"],
      ["MuesliSwap BCH      ", `<a href="muesliswap"    >Various</a>`,"MILK             ","<a href=\"https://muesli.cash\">https://muesli.cash</a>"],
      ["TangoSwap           ", `<a href="tangoswap"     >Various</a>`,"TANGO            ","https://tangoswap.cash"]
    ]}

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
