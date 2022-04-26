$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Fuse Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Fuse                      ",`<a href="fuseio"                 >Various</a>`,"FUSE               ","https://fuse.io"],
      ["Elk                       ",`<a href="elk"                    >Various</a>`,"ELK                ","https://app.elk.finance"],
      ["Beefy                     ",`<a href="beefy"                  >Various</a>`,"BIFI               ","https://app.beefy.finance/#/fuse"],
      ["Sushi                     ",`<a href="sushi"                  >Various</a>`,"FUSE               ","https://app.sushi.com"],
      ["Nextgen                   ",`<a href="nextgen"                >Various</a>`,"NGEN               ","https://app.next-gen.finance"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
