$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Optimistic Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      //There is no any project for optimistic yet.
     ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}
