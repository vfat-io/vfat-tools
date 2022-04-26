$(function () {
  main()
})

const main = async () => {
  let tableData = {
    title: 'Astar Network',
    heading: ['Pool Provider', 'LP', 'Reward Tokens', 'INFO'],
    rows: [
      ['FunBeast           ', `<a href='funbeast'     >Various</a>`, 'BEAST          ', 'https://funbeast.xyz']
    ],
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'
  hideLoading()
}
