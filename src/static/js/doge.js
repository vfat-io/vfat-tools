$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Doge Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["DogeCorn",          `<a href="dogecorn"       >Various</a>`,      "DOGECORN",          "https://dogecorntestapp.netlify.app"],
        ["DragonFruit",       `<a href="dragonfruit"    >Various</a>`,      "DFRUIT",            "https://dragonfruit.cash"],
        ["FruitsOfRyoshi",    `<a href="fruitsofryoshi" >Various</a>`,      "NONI",              "https://fruitsofryoshi.com"],
        ["YodeSwap",          `<a href="yodeswap"       >Various</a>`,      "YODE",              "https://yodeswap.dog"],
        ["DogePup",           `<a href="dogepup"        >Various</a>`,      "DOGEPUP",           "https://dogepup.dog"],
        ["Cowaii",            `<a href="cowaii"         >Various</a>`,      "MILK / COWAII",     "https://cowaii.cash"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
