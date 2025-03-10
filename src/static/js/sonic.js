$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"Sonic Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      ['Equalizer          ', `<a href='equalizer'    >Various</a>`, 'EQUAL         ', 'https://equalizer.exchange'],
      ['Shadow             ', `<a href='shadow'       >Various</a>`, 'SHADOW        ', 'https://www.shadow.so'],
      ['Sickle             ', `<a href='sickle'       >Various</a>`, '              ', '']
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
