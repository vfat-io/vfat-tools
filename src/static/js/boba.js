$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Boba Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Oolong Swap           ", `<a href='oolong'        >Various</a>`,"OLO          ","https://oolongswap.com"],
      ["Synapse               ", `<a href='synapse'       >Various</a>`,"SYN          ","https://synapseprotocol.com"],
      ["SwapperChan           ", `<a href='swapperchan'   >Various</a>`,"WAIFU        ","https://swapperchan.com"],
      ["Autofarm              ", `<a href='autofarm'      >Various</a>`,"Various      ","https://autofarm.network/boba"]
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
