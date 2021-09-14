$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Arbitrum Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["GMX                 ", `<a href="/arbitrum/gmx"      >Various</a>`,"ETH,Escrowed GMX   ","https://gmx.financial"],
      ["Sushi               ", `<a href="/arbitrum/sushi"    >Various</a>`,"SUSHI              ","https://app.sushi.com"],
      ["DODO                ", `<a href="/arbitrum/dodo"     >Various</a>`,"DODO               ","https://app.dodoex.io"],
      ["NYAN                ", `<a href="/arbitrum/nyan"     >Various</a>`,"NYAN               ","https://arbinyan.xyz"],
      ["TheHoneyPot         ", `<a href="/arbitrum/honeypot" >Various</a>`,"HONEY              ","https://thehoneypot.finance"],
      ["ArbiFarm            ", `<a href="/arbitrum/arbifarm" >Various</a>`,"AFARM              ","https://www.arbifarm.fi"],
      ["Marvin              ", `<a href="/arbitrum/marvin"   >Various</a>`,"MARVIN             ","https://marvinfarms.info"],
      ["Arballz             ", `<a href="/arbitrum/arballz"  >Various</a>`,"ARB                ","https://arballz.finance"],
      ["ArbiKiwi            ", `<a href="/arbitrum/arbikiwi" >Various</a>`,"AKIWI              ","http://arbikiwi.finance"],
      //["Arbis               ", `<a href="/arbitrum/arbis"    >Various</a>`,"Various            ","https://arbis.finance"]
     ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}