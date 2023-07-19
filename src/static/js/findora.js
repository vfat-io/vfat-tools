$(function() {
    main()
  });
  
  const main = async() => {
  
    let tableData = {
      title:"Findora EVM Mainnet",
      heading: ['Pool Provider', 'LP', 'Reward Tokens', 'INFO'],
      rows: [
        ['SonicSwap           ', `<a href='sonicswap'       >Various</a>`, 'SONIC          ', 'https://sonicswap.io'],
        ['FairySwap           ', `<a href='fairyswap'     >Various</a>`, 'FAIRY          ', 'https://fairyswap.finance'],
        ['Forlend             ', `<a href='forlend'       >Various</a>`, 'FLD          ', 'https://forlend.io'],
      ].reverse()
    }
  
    let table = new AsciiTable().fromJSON(tableData);
    document.getElementById('log').innerHTML += table + '<br />';
    hideLoading();
  }
  