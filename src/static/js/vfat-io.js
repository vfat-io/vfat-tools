$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"vfat.io Projects Map",
    "heading":["Project", "Chain", "Type", "Link"],
    "rows": [
      ["Aerodrome             ", "Base",      "CL / V2", `<a href='/base/aerodrome'           >/base/aerodrome</a>`],
      ["Blackhole             ", "Avax",      "CL ",     `<a href='/avax/sickle'              >/avax/sickle</a>`],
      ["Blackhole             ", "Avax",      "V2 ",     `<a href='/avax/blackhole'           >/avax/blackhole</a>`],
      ["Etherex               ", "Linea",     "CL ",     `<a href='/linea/sickle'             >/linea/sickle</a>`],
      ["Etherex               ", "Linea",     "V2 ",     `<a href='/linea/etherex'            >/linea/etherex</a>`],
      ["Uniswap               ", "Arbitrum",  "CL ",     `<a href='/arbitrum/sickle'          >/arbitrum/uniswap</a>`],
      ["Uniswap               ", "Avax",      "CL ",     `<a href='/avax/sickle'              >/avax/sickle</a>`],
      ["Uniswap               ", "Base",      "CL ",     `<a href='/base/sickle'              >/base/sickle</a>`],
      ["Uniswap               ", "Bnb",       "CL ",     `<a href='/bnb/sickle'               >/bnb/sickle</a>`],
      ["Uniswap               ", "Hemi",      "CL ",     `<a href='/hemi/sickle'              >/hemi/sickle</a>`],
      ["Uniswap               ", "Optimism",  "CL ",     `<a href='/optimism/sickle'          >/optimism/sickle</a>`],
      ["Uniswap               ", "Polygon",   "CL ",     `<a href='/polygon/sickle'           >/polygon/sickle</a>`],
      ["Uniswap               ", "Unichain",  "CL ",     `<a href='/unichain/uniswap'         >/unichain/uniswap</a>`],
      ["Velodrome             ", "Fraxtal",   "CL ",     `<a href='/fraxtal/sickle'           >/fraxtal/sickle</a>`],
      ["Velodrome             ", "Ink",       "CL ",     `<a href='/ink/sickle'               >/ink/sickle</a>`],
      ["Velodrome             ", "Mode",      "CL ",     `<a href='/mode/sickle'              >/mode/sickle</a>`],
      ["Velodrome             ", "Optimism",  "CL / V2", `<a href='/optimism/sickle'          >/optimism/sickle</a>`],
      ["Velodrome             ", "Unichain",  "CL ",     `<a href='/unichain/sickle'          >/unichain/sickle</a>`],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}