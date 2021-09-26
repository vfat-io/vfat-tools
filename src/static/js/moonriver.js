$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Moonriver Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Moonfarm                 ", `<a href="moonfarm"      >Various</a>`,"MOON   ","https://app.moonfarm.in"],
      ["Solarbeam                ", `<a href="solarbeam"     >Various</a>`,"SOLAR  ","https://solarbeam.io"],
      ["Moonkafe                ", `<a href="moonkafe"     >Various</a>`,"KAFE  ","https://moon.kafe.finance"],
      ["MoonEngine              ", `<a href="moonengine"     >Various</a>`,"MOONENGINE  ","https://www.moonengine.info"],
      ["Bcharity              ", `<a href="bcharity"     >Various</a>`,"GIVE  ","https://moongive.netlify.app/"],
      ["MoonLake              ", `<a href="moonlake"     >Various</a>`,"MOONLAKE  ","https://moonlake.finance/"],
      ["1Swap              ", `<a href="1swap"     >Various</a>`,"1SWAP  ","https://1swap.fi/"],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}
