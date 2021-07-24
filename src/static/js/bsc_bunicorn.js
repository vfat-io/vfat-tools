$(function() {
consoleInit(main)
});

async function main() {
  let tableData = {
    "title":"BUNI FARMS",
    "heading":["Farm","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Pre-staking Farm             ",`<a href="../bunicorn/pre-staking/"    >Various</a>`,"BUNI              ","https://bunicorn.exchange/#/pre-staking"],
      ["NFT Farm                     ",`<a href="../bunicorn/farms/"          >Various</a>`,"NFT/BUNI          ","https://bunicorn.exchange/#/farms"],
    ]};


  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();  
}

  
