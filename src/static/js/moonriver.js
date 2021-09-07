$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Moonriver Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Moonfarm                 ", `<a href="moonfarm"      >Various</a>`,"MOON   ","https://app.moonfarm.in"]
     ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}