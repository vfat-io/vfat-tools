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
      ["                      ", "Avax",      "V2 ",     `<a href='/avax/blackhole'           >/avax/blackhole</a>`],
      ["Etherex               ", "Linea",     "CL ",     `<a href='/linea/sickle'             >/linea/sickle</a>`],
      ["                      ", "Linea",     "V2 ",     `<a href='/linea/etherex'            >/linea/etherex</a>`],
      ["Uniswap               ", "Arbitrum",  "CL ",     `<a href='/arbitrum/sickle'          >/arbitrum/uniswap</a>`],
      ["                      ", "Avax",      "CL ",     `<a href='/avax/sickle'              >/avax/sickle</a>`],
      ["                      ", "Base",      "CL ",     `<a href='/base/sickle'              >/base/sickle</a>`],
      ["                      ", "Bnb",       "CL ",     `<a href='/bnb/sickle'               >/bnb/sickle</a>`],
      ["                      ", "Hemi",      "CL ",     `<a href='/hemi/sickle'              >/hemi/sickle</a>`],
      ["                      ", "Optimism",  "CL ",     `<a href='/optimism/sickle'          >/optimism/sickle</a>`],
      ["                      ", "Polygon",   "CL ",     `<a href='/polygon/sickle'           >/polygon/sickle</a>`],
      ["                      ", "Unichain",  "CL ",     `<a href='/unichain/uniswap'         >/unichain/uniswap</a>`],
      ["Velodrome             ", "Fraxtal",   "CL ",     `<a href='/fraxtal/sickle'           >/fraxtal/sickle</a>`],
      ["                      ", "Ink",       "CL ",     `<a href='/ink/sickle'               >/ink/sickle</a>`],
      ["                      ", "Mode",      "CL ",     `<a href='/mode/sickle'              >/mode/sickle</a>`],
      ["                      ", "Optimism",  "CL / V2", `<a href='/optimism/sickle'          >/optimism/sickle</a>`],
      ["                      ", "Unichain",  "CL ",     `<a href='/unichain/sickle'          >/unichain/sickle</a>`],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}