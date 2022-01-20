$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"CELO Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Ubeswap ",     `<a href="ubeswap"       >Various</a>`,      "UBE",       "https://app.ubeswap.org" ],
        ["Harem  ",       `<a href="harem"         >Various</a>`,      "HAREM",     "https://harem.farm" ],
        ["Mobius  ",      `<a href="mobius"        >Various</a>`,      "MOBI",      "https://www.mobius.money" ],
        ["Sushi   ",      `<a href="sushi"         >Various</a>`,      "SUSHI/CELO","https://app.sushi.com" ],
        ["Cellular   ",      `<a href="cellular"         >Various</a>`,      "CELL","https://cellular.finance" ],
        ["CeloDex   ",      `<a href="celodex"         >Various</a>`,      "CLX","https://www.celodex.org" ]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
