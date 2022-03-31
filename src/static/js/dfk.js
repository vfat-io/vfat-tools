$(function() {
  main()
})

const main = async () => {
  let tableData = {
    title: 'DFK Network',
    heading: ["Pool Provider","MCN", "LP", "Reward Tokens", "INFO"],
    rows: [
      //['Quickswap           ',"", `<a href="quick"            >Various</a>`,'QUICK         ','https://quickswap.exchange/#/quick'],
    ],
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'
  hideLoading()
}
