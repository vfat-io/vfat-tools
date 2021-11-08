$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"HECO Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Lavaswap  ",`<a href="lava"      >Various</a>`,"LAVA    ","https://lavaswap.com"],
      ["Mousse    ",`<a href="mousse"    >Various</a>`,"MOUSSE  ","https://mousse.finance"],
      ["Mdex      ",`<a href="mdex"      >Various</a>`,"MDX     ","https://ht.mdex.com"],
      ["Complus   ",`<a href="complus"   >Various</a>`,"COM     ","https://heco.complus.exchange"],
      ["Hecostable",`<a href="hecostable">Various</a>`,"HSS     ","https://hecostable.finance"],
      ["Booster   ",`<a href="booster"   >Various</a>`,"BOO     ","https://booster.farm"],
      ["Mdis      ",`<a href="mdis"      >Various</a>`,"MDIS    ","https://mdis.finance"],
      ["Pippi     ",`<a href="pippi"     >Various</a>`,"PIPI    ","https://app.pippi.finance"],
      ["Nut       ",`<a href="nut"       >Various</a>`,"NUT     ","https://nut.money"],
      ["Maki      ",`<a href="maki"      >Various</a>`,"MAKI    ","https://app.makiswap.com"],
      ["Elk       ",`<a href="elk"       >Various</a>`,"ELK     ","https://app.elk.finance"],
      ["Ninja     ",`<a href="ninja"     >Various</a>`,"NINJA   ","https://www.heco-ninja.com"],
      ["Butter    ",`<a href="butter"    >Various</a>`,"BUTTER  ","https://butterswap.me/"],
      ["WePiggy   ",`<a href="wepiggy"   >Various</a>`,"WPC     ","https://heco.wepiggy.com/markets"],
      ["Galaxy Finance One", `<a href="galaxy_triton" >Various</a>`, "TRITON  ","https://heco-triton.galaxyfinance.one/"],
      ["OberonFinance",      `<a href="galaxy_oberon" >Various</a>`, "OBERON  ","https://heco-oberon.galaxyfinance.one/"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
