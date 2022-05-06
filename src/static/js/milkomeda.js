$(function() {
  main()
})

const main = async () => {
  let tableData = {
    title: 'Milkomeda Network',
    heading: ["Pool Provider","MCN", "LP", "Reward Tokens", "INFO"],
    rows: [
      ['MilkySwap           ',"", `<a href="milkyswap"            >Various</a>`,'MILKY         ','https://www.milkyswap.exchange'],
      ['Occam-x             ',"", `<a href="occam-x"              >Various</a>`,'OCX           ','https://app.occam-x.fi']
    ],
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'
  hideLoading()
}