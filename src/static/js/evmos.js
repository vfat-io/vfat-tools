$(function() {
  main()
})

const main = async () => {
  let tableData = {
    title: 'EVMOS Network',
    heading: ["Pool Provider","LP", "Reward Tokens", "INFO"],
    rows: [
      ['Diffusion           ',`<a href="diffusion"            >Various</a>`,'DIFF         ','https://app.diffusion.fi'],
    ].reverse()
  }

  let table = new AsciiTable().fromJSON(tableData)
  document.getElementById('log').innerHTML += table + '<br />'
  hideLoading()
}
