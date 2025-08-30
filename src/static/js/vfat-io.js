$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"vfat.io Projects Map",
    "heading":["Project", "Type", "Link"],
    "rows": [
      ["Aerodrome             ", "CL ", `<a href='/base/aerodrome'           >Base</a>`],
      ["Blackhole             ", "CL ", `<a href='/avax/sickle'              >Avax</a>`],
      ["Blackhole             ", "V2 ", `<a href='/avax/blackhole'           >Avax</a>`],
      ["Etherex               ", "CL ", `<a href='/linea/sickle'             >Linea</a>`],
      ["Etherex               ", "V2 ", `<a href='/linea/etherex'            >Linea</a>`],
      ["Uniswap               ", "CL ", `<a href='/arbitrum/uniswap'         >Arbitrum</a>`],
      ["Uniswap               ", "CL ", `<a href='/avax/uniswap'             >Avax</a>`],
      ["Uniswap               ", "CL ", `<a href='/base/uniswap'             >Base</a>`],
      ["Uniswap               ", "CL ", `<a href='/bnb/uniswap'              >Bnb</a>`],
      ["Uniswap               ", "CL ", `<a href='/hemi/uniswap'             >Hemi</a>`],
      ["Uniswap               ", "CL ", `<a href='/optimism/uniswap'         >Optimism</a>`],
      ["Uniswap               ", "CL ", `<a href='/polygon/uniswap'          >Polygon</a>`],
      ["Uniswap               ", "CL ", `<a href='/unichain/uniswap'         >Unichain</a>`],
      ["Velodrome             ", "CL ", `<a href='/fraxtal/sickle'           >Fraxtal</a>`],
      ["Velodrome             ", "CL ", `<a href='/ink/sickle'               >Ink</a>`],
      ["Velodrome             ", "CL ", `<a href='/mode/sickle'              >Mode</a>`],
      ["Velodrome             ", "CL ", `<a href='/optimism/sickle'          >Optimism</a>`],
      ["Velodrome             ", "CL ", `<a href='/unichain/sickle'          >Unichain</a>`],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}