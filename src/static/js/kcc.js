$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"KCC Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      [ "Kudex",      `<a href="kudex"        >Various</a>`,     "KUD",       "https://kudex.finance" ],
      [ "KuSwap",     `<a href="kuswap"       >Various</a>`,     "KUS",       "https://kuswap.io" ],
      [ "KuCat",      `<a href="kucat"        >Various</a>`,     "CAT",       "https://kucat.finance" ],
      [ "KuBeans",    `<a href="kubeans"      >Various</a>`,     "KUBEANS",   "https://kubeans.club" ],
      [ "KandySwap",  `<a href="kandyswap"    >Various</a>`,     "KANDY",     "https://www.kandyswap.com" ],
      [ "Shibance",   `<a href="shibance"     >Various</a>`,     "KWOOF",     "https://kcc.shibance.com" ],
      [ "BoneSwap",   `<a href="boneswap"     >Various</a>`,     "BONE",      "https://farm-kcc.boneswap.finance" ],
      [ "SafeDex",    `<a href="safedex"      >Various</a>`,     "TREATS",    "https://safedexkcc.com/info" ],
      [ "KuBone",     `<a href="kubone"       >Various</a>`,     "KUBONE",    "https://kubone.finance" ],
      [ "GemSwap",    `<a href="gemswap"      >Various</a>`,     "GEM",       "https://farm.gemswap.exchange" ],
      [ "Kukaburra",  `<a href="kukaburra"    >Various</a>`,     "🐦KUKA",    "https://kukaburra.io/" ],
      [ "KuCow",      `<a href="kucow"        >Various</a>`,     "KUCOW",     "https://kucow.finance" ],
      [ "Kukafe",     `<a href="kukafe"       >Various</a>`,     "KAFE",      "https://kukafe.finance" ],
      [ "Kuulaid",    `<a href="kuulaid"      >Various</a>`,     "KUUL",      "https://kuulaid.finance" ],
      [ "KsfSwap",    `<a href="ksfswap"      >Various</a>`,     "KSF",       "https://ksfswap.finance" ]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
