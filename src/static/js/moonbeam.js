$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Moonbeam Network",
    "heading":["Pool Provider","MCN","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["BeamSwap           ","", `<a href='beamswap'       >Various</a>`,"GLINT          ","https://beamswap.io"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
