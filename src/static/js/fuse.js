$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Fuse Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Fuseswap                       ",`<a href="fuseswap"               >Various</a>`,"FUSE               ","https://fuseswap.com"],
      ["Elk                            ",`<a href="elk"                    >Various</a>`,"ELK                ","https://app.elk.finance"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
