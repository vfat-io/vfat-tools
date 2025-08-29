$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"vfat.io Projects Map",
    "heading":["Project", "Type", "Link"],
    "rows": [
      ["Aerodrome             ", "CL ", `<a href='/base/aerodrome'           >/base/aerodrome</a>`],
      ["Blackhole             ", "CL ", `<a href='/avax/sickle'                 >/avax/sickle</a>`],
      ["                      ", "V2 ", `<a href='/avax/blackhole'           >/avax/blackhole</a>`],
      ["Velodrome             ", "CL ", `<a href='/base/aerodrome'       >/optimism/velodrome</a>`],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();

}