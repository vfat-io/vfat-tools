$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Pulse Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Pulsex                 ", `<a href="pulsex"      >Various</a>`,"INC               ","https://app.pulsex.com"],
      ["Daytona Finance        ", `<a href="daytona"     >Various</a>`,"TONI              ","https://www.daytona.finance"],
      ["ColaFactory            ", `<a href="colaFactory" >Various</a>`,"COLAFACTORY       ","https://colafactory.com/"]
      ["Velocimeter            ", `<a href="velocimeter" >Various</a>`,"FLOW              ","https://pulse.velocimeter.xyz"],
      ["Pulserate              ", `<a href="pulserate"   >Various</a>`,"PSHARE / PRATE    ","https://pulserate.io"],
      ["YieldPulse Finance     ", `<a href="yieldx"      >Various</a>`,"YIELDX            ","https://yieldpulse.finance/"]

    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}
