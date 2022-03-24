$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Aurora Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["Trisolaris",                `<a href="trisolaris"       >Various</a>`,      "TRI",          "https://www.trisolaris.io" ],
        ["NearPad",                   `<a href="nearpad"          >Various</a>`,      "NearPad",      "https://nearpad.io" ],
        ["WannaSwap",                 `<a href="wannaswap"        >Various</a>`,      "WANNA",        "https://wannaswap.finance" ],
        ["Polaris",                   `<a href="polaris"          >Various</a>`,      "PLRS",         "https://polaristoken.fi" ],
        ["YellowSun",                 `<a href="yellowsun"        >Various</a>`,      "YELLOWSUN",    "https://aurora.yellowsun.live" ],
        ["Cocoon",                    `<a href="cocoon"           >Various</a>`,      "COCOON",       "https://cocoon.farm" ],
        ["AuroraSwap",                `<a href="auroraswap"       >Various</a>`,      "BRL",          "https://app.auroraswap.finance" ],
        ["Polaris (AuroraPunks)",     `<a href="polaristoken"     >Various</a>`,      "PLRS",         "https://polaristoken.io" ],
        ["FlippySwap",                `<a href="flippyswap"       >Various</a>`,      "FLIPPY",       "https://flippyswap.com" ],
        ["MoonFlowerFarmers",         `<a href="moonflowerfarmers">Various</a>`,      "MFF",          "https://moonflowerfarmers.com" ],
        ["Polaris Finance *",         `<a href="polarisfinance"   >Various</a>`,      "SPOLAR / POLAR","https://polarisfinance.io" ],
        ["Auroratag",                 `<a href="auroratag"        >Various</a>`,      "AURORATAG",    "https://auroratag.com" ],
        ["WePiggy",                   `<a href="wepiggy"          >Various</a>`,      "WPC",          "https://app.wepiggy.com" ],
        ["Rose",                      `<a href="rose"             >Various</a>`,      "ROSE",         "https://app.rose.fi" ]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
