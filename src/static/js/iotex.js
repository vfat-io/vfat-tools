$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"IoTeX Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Parrotdefi          ", `<a href="parrotdefi"    >Various</a>`,"iPEGG            ","https://iotex.parrotdefi.com"],
        ["Cyclone             ", `<a href="cyclone"       >Various</a>`,"CYC              ","https://cyclone.xyz"],
        ["Magicland           ", `<a href="magicland"     >Various</a>`,"MAGIC            ","https://magicland.fi"],
        ["ZoomSwap            ", `<a href="zoomswap"      >Various</a>`,"ZOOM             ","https://zoomswap.io"],
        ["IotxCloudSwapFinance", `<a href="cloudswap"     >Various</a>`,"CLOUD            ","https://iotxcloudswap.finance"],
        ["Seagull Finance     ", `<a href="seagull"       >Various</a>`,"FISH             ","https://seagull.finance"],
        ["MinMax              ", `<a href="minmax"        >Various</a>`,"MAX / iMAGIC     ","https://minmax.finance"],
        ["Mermaidswap         ", `<a href="mermaidswap"   >Various</a>`,"MERD             ","https://mermaidswap.com"],
        ["Elk                 ", `<a href="elk"           >Various</a>`,"ELK              ","https://app.elk.finance"],
        ["SkaSwap             ", `<a href="skaswap"       >Various</a>`,"SKA              ","https://skaswap.finance"],
        ["WOWswap             ", `<a href="wowswap"       >Various</a>`,"WOW              ","https://wowswap.io"],
        ].reverse()
    }
  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
