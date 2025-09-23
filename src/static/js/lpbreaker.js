$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"LP Breaker Tool",
    "heading":["Chain", "Type", "Link"],
    "rows": [
      ["Arbitrum",                "V2",   `<a href='/arbitrum/lp_breaker'      >/arbitrum/lp_breaker</a>`],
      ["Aurora",                  "V2",   `<a href='/aurora/lp_breaker'        >/aurora/lp_breaker</a>`],
      ["Avalanche",               "V2",   `<a href='/avax/lp_breaker'          >/avax/lp_breaker</a>`],
      ["Base",                    "V2",   `<a href='/base/lp_breaker'          >/base/lp_breaker</a>`],
      ["Blast",                   "V2",   `<a href='/blast/lp_breaker'         >/blast/lp_breaker</a>`],
      ["Bnb",                     "V2",   `<a href='/bnb/lp_breaker'           >/bnb/lp_breaker</a>`],
      ["Cronos",                  "V2",   `<a href='/cronos/lp_breaker'        >/cronos/lp_breaker</a>`],
      ["Emerald",                 "V2",   `<a href='/emerald/lp_breaker'       >/emerald/lp_breaker</a>`],
      ["ETHW",                    "V2",   `<a href='/ethw/lp_breaker'          >/ethw/lp_breaker</a>`],
      ["Fantom",                  "V2",   `<a href='/fantom/lp_breaker'        >/fantom/lp_breaker</a>`],
      ["Fuse",                    "V2",   `<a href='/fuse/lp_breaker'          >/fuse/lp_breaker</a>`],
      ["Gnosis",                  "V2",   `<a href='/gnosis/lp_breaker'        >/gnosis/lp_breaker</a>`],
      ["Harmony",                 "V2",   `<a href='/harmony/lp_breaker'       >/harmony/lp_breaker</a>`],
      ["Heco",                    "V2",   `<a href='/heco/lp_breaker'          >/heco/lp_breaker</a>`],
      ["Hoo",                     "V2",   `<a href='/hoo/lp_breaker'           >/hoo/lp_breaker</a>`],
      ["HyperEVM",                "V2",   `<a href='/hyperevm/lp_breaker'      >/hyperevm/lp_breaker</a>`],
      ["KuCoin",                  "V2",   `<a href='/kcc/lp_breaker'           >/kcc/lp_breaker</a>`],
      ["Linea",                   "V2",   `<a href='/linea/lp_breaker'         >/linea/lp_breaker</a>`],
      ["Mainnet",                 "V2",   `<a href='/lp_breaker'               >/lp_breaker</a>`],
      ["Mode",                    "V2",   `<a href='/mode/lp_breaker'          >/mode/lp_breaker</a>`],
      ["Moonbeam",                "V2",   `<a href='/moonbeam/lp_breaker'      >/moonbeam/lp_breaker</a>`],
      ["Moonriver",               "V2",   `<a href='/moonriver/lp_breaker'     >/moonriver/lp_breaker</a>`],
      ["Okex",                    "V2",   `<a href='/okex/lp_breaker'          >/okex/lp_breaker</a>`],
      ["opBNB",                   "V2",   `<a href='/opbnb/lp_breaker'         >/opbnb/lp_breaker</a>`],
      ["Optimism",                "V2",   `<a href='/optimism/lp_breaker'      >/optimism/lp_breaker</a>`],
      ["Polygon",                 "V2",   `<a href='/polygon/lp_breaker'       >/polygon/lp_breaker</a>`],
      ["Pulse",                   "V2",   `<a href='/pulse/lp_breaker'         >/pulse/lp_breaker</a>`],
      ["Smart Bitcoin Cash",      "V2",   `<a href='/smartbch/lp_breaker'      >/smartbch/lp_breaker</a>`],
      ["Sonic",                   "V2",   `<a href='/sonic/lp_breaker'         >/sonic/lp_breaker</a>`],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}