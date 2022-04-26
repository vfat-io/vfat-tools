$(function() {
    main()
  });

  const main = async() => {

    let tableData = {
      "title":"Metis Network",
      "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
      "rows": [
        ["Tethys",           `<a href="tethys"         >Various</a>`,        "TETHYS",              "https://tethys.finance"],
        ["Netswap",          `<a href="netswap"        >Various</a>`,        "NETT",                "https://netswap.io"],
        ["Andro",            `<a href="andro"          >Various</a>`,        "ANDRO",               "https://androfinance.com"],
        ["WOWswap",          `<a href="wowswap"        >Various</a>`,        "WOW",                 "https://wowswap.io"],
        ["Hermes (MaiaDAO)", `<a href="hermes"         >Various</a>`,        "HERMES",              "https://hermes.maiadao.io"]
      ]
    }

    let table = new AsciiTable().fromJSON(tableData);
    document.getElementById('log').innerHTML += table + '<br />';
    hideLoading();
  }
