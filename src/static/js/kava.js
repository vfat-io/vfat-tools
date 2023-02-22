$(function() {
  main()
})

const main = async () => {
  let tableData = {
    title: 'Kava Network',
    heading: ["Pool Provider", "LP", "Reward Tokens", "INFO"],
    rows: [
      ['Kefir Swap      ', `<a href="kefir"            >Various</a>`,'KEFIR         ','https://kefirswap.net'],
      ['KSwap           ', `<a href="kswap"            >Various</a>`,'KSWAP         ','https://kswap.network']
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'
  hideLoading()
}
