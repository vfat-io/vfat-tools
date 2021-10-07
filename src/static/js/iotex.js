$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"IoTeX Network",
    "heading":["Pool Provider","MCN","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Parrotdefi          ",`<a href="https://twitter.com/MCNVentures/status/1440498902688358402?s=20" target="_blank" class="mcn-reviewed">REVIEW</a>`, `<a href="parrotdefi"  >Various</a>`,"iPEGG              ","https://iotex.parrotdefi.com"],
        ["Cyclone             ","", `<a href="cyclone"       >Various</a>`,"CYC              ","https://cyclone.xyz"],
        ["Magicland           ","", `<a href="magicland"     >Various</a>`,"MAGIC            ","https://magicland.fi"],
        ["ZoomSwap            ","", `<a href="zoomswap"      >Various</a>`,"ZOOM             ","https://zoomswap.io"],
        ["IotxCloudSwapFinance","", `<a href="cloudswap"     >Various</a>`,"CLOUD            ","https://iotxcloudswap.finance"],
        ["Seagull Finance     ","", `<a href="seagull"       >Various</a>`,"FISH             ","https://seagull.finance"],

        ]
    }
  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
