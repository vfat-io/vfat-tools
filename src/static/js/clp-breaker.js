$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"CLP Breaker Tool",
    "heading":["Chain", "Type", "Link"],
    "rows": [
      ["Arbitrum",    "CL",   `<a href='/arbitrum/clp_breaker'      >/arbitrum/clp_breaker</a>`],
      ["Base",        "CL",   `<a href='/base/clp_breaker'          >/base/clp_breaker</a>`],
      ["Bnb",         "CL",   `<a href='/bnb/clp_breaker'           >/bnb/clp_breaker</a>`],
      ["HyperEVM",    "CL",   `<a href='/hyperevm/clp_breaker'      >/hyperevm/clp_breaker</a>`],
      ["Linea",       "CL",   `<a href='/linea/clp_breaker'         >/linea/clp_breaker</a>`],
      ["Mainnet",     "CL",   `<a href='/clp_breaker'               >/clp_breaker</a>`],
      ["Mode",        "CL",   `<a href='/mode/clp_breaker'          >/mode/clp_breaker</a>`],
      ["Optimism",    "CL",   `<a href='/optimism/clp_breaker'      >/optimism/clp_breaker</a>`],
      ["Sonic",       "CL",   `<a href='/sonic/clp_breaker'         >/sonic/clp_breaker</a>`],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}