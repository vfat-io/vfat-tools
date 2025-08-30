$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"vfat.io Projects Map",
    "heading":["Project", "Type", "Link"],
    "rows": [
      ["Aerodrome             ", "CL ", `<a href='/base/aerodrome'           >/base/aerodrome</a>`],
      ["Blackhole             ", "CL ", `<a href='/avax/sickle'              >/avax/sickle</a>`],
      ["Blackhole             ", "V2 ", `<a href='/avax/blackhole'           >/avax/blackhole</a>`],
      ["Etherex               ", "CL ", `<a href='/linea/sickle'             >/linea/sickle</a>`],
      ["Etherex               ", "V2 ", `<a href='/linea/etherex'            >/linea/etherex</a>`],
      ["Uniswap               ", "CL ", `<a href='/arbitrum/uniswap'         >/arbitrum/uniswap</a>`],
      ["Uniswap               ", "CL ", `<a href='/avax/uniswap'             >/avax/uniswap</a>`],
      ["Uniswap               ", "CL ", `<a href='/base/uniswap'             >/base/uniswap</a>`],
      ["Uniswap               ", "CL ", `<a href='/bnb/uniswap'              >/bnb/uniswap</a>`],
      ["Uniswap               ", "CL ", `<a href='/hemi/uniswap'             >/hemi/uniswap</a>`],
      ["Uniswap               ", "CL ", `<a href='/optimism/uniswap'         >/optimism/uniswap</a>`],
      ["Uniswap               ", "CL ", `<a href='/polygon/uniswap'          >/polygon/uniswap</a>`],
      ["Uniswap               ", "CL ", `<a href='/unichain/uniswap'         >/unichain/uniswap</a>`],
      ["Velodrome             ", "CL ", `<a href='/fraxtal/sickle'           >/fraxtal/sickle</a>`],
      ["Velodrome             ", "CL ", `<a href='/ink/sickle'               >/ink/sickle</a>`],
      ["Velodrome             ", "CL ", `<a href='/mode/sickle'              >/mode/sickle</a>`],
      ["Velodrome             ", "CL ", `<a href='/optimism/sickle'          >/optimism/sickle</a>`],
      ["Velodrome             ", "CL ", `<a href='/unichain/sickle'          >/unichain/sickle</a>`],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}