$(function() {
  main()
})

const main = async () => {
  let tableData = {
    title: 'DFK Network',
    heading: ["Pool Provider", "LP", "Reward Tokens", "INFO"],
    rows: [
      ['Crystalvale           ', `<a href="crystalvale"            >Various</a>`,'CRYSTAL         ','https://defikingdoms.com/crystalvale'],
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'
  hideLoading()
}
