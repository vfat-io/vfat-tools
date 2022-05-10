$(function() {
  main()
})

const main = async () => {
  let tableData = {
    title: 'Hoo Network',
    heading: ["Pool Provider","MCN", "LP", "Reward Tokens", "INFO"],
    rows: [
      ['Pudding Swap      ',"", `<a href="pudding"            >Various</a>`,'PUD         ','https://puddingswap.finance'],
      ['Elk               ',"", `<a href="elk"                >Various</a>`,'ELK         ','https://app.elk.finance']
    ],
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'
  hideLoading()
}
