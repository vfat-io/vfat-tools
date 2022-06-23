$(function() {
  main()
})

const main = async () => {
  let tableData = {
    title: 'Kava Network',
    heading: ["Pool Provider","MCN", "LP", "Reward Tokens", "INFO"],
    rows: [
      ['Kefir Swap      ',"", `<a href="kefir"            >Various</a>`,'KEFIR         ','https://kefirswap.net']
    ],
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'
  hideLoading()
}
