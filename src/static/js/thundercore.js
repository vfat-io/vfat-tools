$(function() {
  main()
})

const main = async () => {
  let tableData = {
    title: 'ThundeCore Network',
    heading: ['Pool Provider', 'LP', 'Reward Tokens', 'INFO'],
    rows: [['Ram Protocol', `<a href="ram">Various</a>`, 'RAM', 'https://rammer.finance/']],
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'
  hideLoading()
}
