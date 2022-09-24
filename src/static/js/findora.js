$(function() {
    main()
  });
  
  const main = async() => {
  
    let tableData = {
      title:"Findora EVM Mainnet",
      heading: ['Pool Provider', 'LP', 'Reward Tokens', 'INFO'],
      rows: [
        ['FairySwap           ', `<a href='fairyswap'     >Various</a>`, 'FAIRY          ', 'https://fairyswap.finance'],
        ['Forlend             ', `<a href='forlend'       >Various</a>`, 'FLD          ', 'https://forlend.io'],
      ]
    }
  
    let table = new AsciiTable().fromJSON(tableData);
    document.getElementById('log').innerHTML += table + '<br />';
    hideLoading();
  }
  