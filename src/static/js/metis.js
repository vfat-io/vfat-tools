$(function() {
    main()
  });
  
  const main = async() => {
  
    let tableData = {
      "title":"Metis Network",
      "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
      "rows": [
        ["Tethys",          `<a href="tethys"         >Various</a>`,        "TETHYS",              "https://tethys.finance"]
      ]
    }
  
    let table = new AsciiTable().fromJSON(tableData);
    document.getElementById('log').innerHTML += table + '<br />';
    hideLoading();
  }
  