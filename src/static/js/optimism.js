$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Optimistic Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ["Synapse               ", `<a href='synapse'    >Various</a>`,"SYN          ","https://synapseprotocol.com"],
      ["WePiggy               ", `<a href='wepiggy'    >Various</a>`,"WPC          ","https://app.wepiggy.com"]
     ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}
