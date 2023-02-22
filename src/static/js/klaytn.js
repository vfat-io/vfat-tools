$(function () {
  main()
})

const main = async () => {
  let tableData = {
    title: 'Klaytn Network',
    heading: ['Pool Provider', 'LP', 'Reward Tokens', 'INFO'],
    rows: [
      ['Defikingdoms           ', `<a href='defikingdoms'     >Various</a>`, 'JADE          ', 'https://game.defikingdoms.com'],
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'
  hideLoading()
}
