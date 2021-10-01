$(function () { consoleInit(main) });

async function main() {
  const abi =
  [
    {
      "constant": true,
      "inputs": [],
      "name": "ceoAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getMyMiners",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "initialized",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "rt",
          "type": "uint256"
        },
        {
          "name": "rs",
          "type": "uint256"
        },
        {
          "name": "bs",
          "type": "uint256"
        }
      ],
      "name": "calculateTrade",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "eth",
          "type": "uint256"
        },
        {
          "name": "contractBalance",
          "type": "uint256"
        }
      ],
      "name": "calculateEggBuy",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "marketEggs",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "sellEggs",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "seedMarket",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "devFee",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "ref",
          "type": "address"
        }
      ],
      "name": "hatchEggs",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getMyEggs",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "ref",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "buyEggs",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "lastHatch",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "claimedEggs",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "hatcheryMiners",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "EGGS_TO_HATCH_1MINERS",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "eth",
          "type": "uint256"
        }
      ],
      "name": "calculateEggBuySimple",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "eggs",
          "type": "uint256"
        }
      ],
      "name": "calculateEggSell",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "referrals",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ceoAddress2",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        }
      ],
      "name": "getEggsSinceLastHatch",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
    ]
  const app  = await init_ethers();
  const signer = app.provider.getSigner();
  const addr = "0xD5d38f1815b4555527DE075a584268E08c5909EA";
  const contract = new ethers.Contract(addr, abi, app.provider);
  const contractSend = new ethers.Contract(addr, abi, signer);
  const prices = await getBscPrices();
  const cakeUsd = prices["0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"]["usd"];

  const miners = await contract.getMyMiners({ from: app.YOUR_ADDRESS });
  const production = Number(miners * 60 * 60).toFixed(2);
  const eggs = await contract.getMyEggs({ from: app.YOUR_ADDRESS });
  const sell = eggs > 0 ? await contract.calculateEggSell(eggs) : 0;
  const devFee = eggs > 0 ? await contract.devFee(sell) : 0;
  const barrel = eggs > 0 ? Number(ethers.utils.formatEther(sell) - ethers.utils.formatEther(devFee)).toFixed(2) : 0.00;
  const balance = ethers.utils.formatEther(await contract.getBalance());
  const balanceStr = numberWithCommas(Number(balance).toFixed(2));
  const balanceUsd = numberWithCommas(Number(cakeUsd * balance).toFixed(2));

  const compound = async function() {
    let allow = Promise.resolve();
      showLoading();
      allow
        .then(async function() {
          contractSend.hatchEggs("0x0000000000000000000000000000000000000000")({ from: app.YOUR_ADDRESS })
            .then(function(t) {
              app.provider.waitForTransaction(t.hash).then(function() {
                hideLoading();
              })
            })
            .catch(function() {
              hideLoading();
            })
        })
        .catch(function() {
          hideLoading();
        });
  }
  const sellEggs = async function() {
    let allow = Promise.resolve();
    showLoading();
    allow
      .then(async function() {
        contractSend.sellEggs()({ from: app.YOUR_ADDRESS })
          .then(function(t) {
            app.provider.waitForTransaction(t.hash).then(function() {
              hideLoading();
            })
          })
          .catch(function() {
            hideLoading();
          })
      })
      .catch(function() {
        hideLoading();
      });
  }

  _print("\n");
  _print("                          .........................                           ");
  _print("                        .........................                             ");
  _print("                       .....#####((((((((((((((((((((.....,,,,,*****          ");
  _print("                       .....#####((((((((((((((((((((.....,,,,,*****          ");
  _print("                            ....................((((((((((/////.....          ");
  _print("                            ....................((((((((((/////.....          ");
  _print("                                                ,,,,,((((((((((.....          ");
  _print("      C A K E                                   ,,,,,((((((((((.....          ");
  _print("                                           ,,,,,*****.....((((((((((.....     ");
  _print("                                           ,,,,,*****.....((((((((((.....     ");
  _print("                                      ,,,,,/////.....     .....(((((.....     ");
  _print("                                      ,,,,,/////.....     .....(((((.....     ");
  _print("                                 ,,,,,*****.....          .....(((((.....     ");
  _print("                                 ,,,,,*****.....          .....(((((.....     ");
  _print("                            ,,,,,/////.....               .....(((((.....     ");
  _print("                            ,,,,,/////.....               .....(((((.....     ");
  _print("                       ,,,,,*****.....                    .....#####.....     ");
  _print("                       ,,,,,*****.....                    .....#####.....     ");
  _print("                  ,,,,,/////.....                              .....          ");
  _print("                  ,,,,,/////.....                              .....          ");
  _print("             ,,,,,*****.....                                                  ");
  _print("             ,,,,,*****.....             M I N E R                            ");
  _print("        ,,,,,/////.....                                                       ");
  _print("        ,,,,,/////.....                                                       ");
  _print("       *****.....                                                             ");
  _print("       *****.....                                                             ");

  _print("\n");
  _print("Miners: " + translateQuantity(miners));
  _print("Digging: " + formatEggs(production) + " feet per hour");
  _print("Barrel: " + barrel + " CAKE");
  _print("");
  _print_link("Hire more miners", compound);
  _print_link("Pocket your CAKE", sellEggs);
  _print("");
  _print("Contract balance: " + balanceStr + " CAKE ($" + balanceUsd + ")");

  hideLoading();
}

function formatEggs(eggs) {
  eggstohatch1 = 2592000;
  return translateQuantity(eggs/eggstohatch1,3)
}

function translateQuantity(quantity, precision) {
    quantity=Number(quantity)
    finalquantity=quantity
    modifier=''

    if (quantity < 1e6) {
      return numberWithCommas((quantity).toFixed(2));
    }

    //console.log('??quantity ',typeof quantity)
    if(quantity>1000000){
        modifier=' Million'
        finalquantity=quantity/1000000
    }
    if(quantity>1000000000){
        modifier=' Billion'
        finalquantity=quantity/1000000000
    }
    if(quantity>1000000000000){
        modifier=' Trillion'
        finalquantity=quantity/1000000000000
    }
    if(quantity>1000000000000000){
        modifier=' Quadrillion'
        finalquantity=quantity/1000000000000000
    }
    if(quantity>1000000000000000000){
        modifier=' Quintillion'
        finalquantity=quantity/1000000000000000000
    }
    if(quantity>1000000000000000000000){
        modifier=' Sextillion'
        finalquantity=quantity/1000000000000000000000
    }
    if(quantity>1000000000000000000000000){
        modifier=' Septillion'
        finalquantity=quantity/1000000000000000000000000
    }
    if(quantity>1000000000000000000000000000){
        modifier=' Octillion'
        finalquantity=quantity/1000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000){
        modifier=' Nonillion'
        finalquantity=quantity/1000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000){
        modifier=' Decillion'
        finalquantity=quantity/1000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000){
        modifier = ' Undecillion'
        finalquantity=quantity/1000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000){
        modifier = ' Duodecillion'
        finalquantity=quantity/1000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000){
        modifier = ' Tredecillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000){
        modifier = ' Quattuordecillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000){
        modifier = ' Quindecillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000){
        modifier = ' Sexdecillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000){
        modifier = ' Septendecillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000){
        modifier = ' Octodecillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000000){
        modifier = ' Novemdecillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000000000){
        modifier = ' Vigintillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000000000000){
        modifier = ' Unvigintillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000000000000000){
        modifier = ' Duovigintillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000000000000000000){
        modifier = ' Trevigintillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000000000000000000000){
        modifier = ' Quattuorvigintillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000000000000000000000000){
        modifier = ' Quinvigintillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000000000000000000000000000){
        modifier = ' Sexvigintillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000000000000000000000000000000){
        modifier = ' Septenvigintillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000){
        modifier = ' Octovigintillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    }
    if(quantity>1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000){
        modifier = ' Novemvigintillion'
        finalquantity=quantity/1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    }
    if(precision == undefined){
        precision=0
        if(finalquantity<10000){
            precision=1
        }
        if(finalquantity<1000){
            precision=2
        }
        if(finalquantity<100){
            precision=3
        }
        if(finalquantity<10){
            precision=4
        }
    }
    if(precision==0){
        finalquantity=Math.floor(finalquantity)
    }
    return finalquantity.toFixed(precision)+modifier;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}