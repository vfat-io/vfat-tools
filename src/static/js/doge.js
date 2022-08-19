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
        ["FruitsOfRyoshi",    `<a href="fruitsofryoshi" >Various</a>`,      "NONI",              "https://fruitsofryoshi.com"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
