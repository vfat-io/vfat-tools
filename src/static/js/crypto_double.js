$(function () { consoleInit(main) });
  async function main() {
    ///------------------------------------------------------------------------
    init();
    ///------------------------------------------------------------------------
    const abi =
    [
      {
        "inputs": [
          {
            "internalType": "address payable",
            "name": "_dev1",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_dev2",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_startUNIX",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "finish",
            "type": "uint256"
          }
        ],
        "name": "NewStake",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "referrer",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "referral",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "RefBonus",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Withdrawn",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "DEV_FEE_PERCENT",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "MIN_AMOUNT",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "PERCENTS_DIVIDER",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "REFERRAL_PERCENT",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "dev1",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "dev2",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserNumberOfStakes",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserReferralBonus",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserReferrer",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getUserStakeInfo",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "finish",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserTotalStakes",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "random",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "requestId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "randomness",
            "type": "uint256"
          }
        ],
        "name": "rawFulfillRandomness",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "referrer",
            "type": "address"
          }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "startUNIX",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalDoubled",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalStaked",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
      ];
    ///------------------------------------------------------------------------
    const app = await init_ethers();
    const addr = getAddress();
    const addrLink = "https://polygonscan.com/address/" + addr + "#readContract";
    const contract = new ethers.Contract(addr, abi, app.provider);
    ///------------------------------------------------------------------------
    const start = new Date((await contract.startUNIX()).toNumber() * 1000);
    const staked = fromEther(await contract.totalStaked());
    const doubles = parseInt(await contract.totalDoubled(), 10);
    const minAmount = fromEther(await contract.MIN_AMOUNT());
    const refLink = "https://vfat.tools/polygon/poly_crypto_double/?ref=" + app.YOUR_ADDRESS.toString();
    _print("<hr>")
    _print(header(2, "CryptoDouble"));
    const telegramLink = "https://t.me/cryptodoublecrypto";
    const twitterLink = "https://twitter.com/CryptoDouble11";
    const redditLink = "https://www.reddit.com/user/cryptoschemedouble";
    _print("<a href='https://ibb.co/Z81KTPJ'><img src='https://i.ibb.co/J7F2k4d/cryptodouble.jpg' width=200px></a>");
    prettyTable("Socials",
      [{ k:"Telegram", v:telegramLink , l:telegramLink },
       { k:"Twitter" , v:twitterLink  , l:twitterLink  },
       { k:"Reddit"  , v:redditLink   , l:redditLink   }
      ]);

    _print(header(2,"Stake"));
    _print(para("MATIC Amount <input type='text' id='maticInput' value=''></input></br><a href='javascript:stake()'>Double my MATIC</a>"));

    _print(header(2,"Contract Info"));
    prettyTable("Contract",
      [{ k:"Start date"       , v:prettyDatetime(start) , l:null       },
       { k:"Address"          , v:addr                  , l:addrLink   },
       { k:"SEP"              , v:""                    , l:null       },
       { k:"Total staked"     , v:prettyMatic(staked)   , l:null       },
       { k:"Total doubles"    , v:prettyInt(doubles)    , l:null       },
       { k:"Min. stake"       , v:prettyMatic(minAmount), l:null       },
       { k:"SEP"              , v:""                    , l:null       },
       { k:"Referal scheme"   , v:"10%"                 , l:null       },
       { k:"Your referal link", v:refLink               , l:refLink    },
       { k:"SEP"              , v:""                    , l:null       },
       { k:"Dev fee"          , v:"5%"                  , l:null       },
       { k:"Promo fee"        , v:"5%"                  , l:null       },
       { k:"SEP"              , v:""                    , l:null       },


      ]);
    ///------------------------------------------------------------------------
    _print(header(2,"User Info"));
    const userOverview = await getUserOverview();
    const allStakes = await getAllStakes();
    var activeStakes = [];
    var oldStakes = [];
    for (var i = 0; i < allStakes.length; ++i) {
      if (allStakes[i].old) {
        oldStakes.push(allStakes[i]);
      } else {
        activeStakes.push(allStakes[i]);
      }
    }
    console.log(activeStakes);
    console.log(oldStakes);
    prettyUserOverview(userOverview, allStakes);
    _print(header(2,"Active Stakes"));
    if(activeStakes.length > 0) {
      prettyStakes("Active stakes", activeStakes);
    } else {
      _print(para("No active stakes"));
    }
    _print(header(2,"Old Stakes"));
    if (oldStakes.length > 0) {
      prettyStakes("Old stakes", oldStakes);
    } else {
      _print(para("No old stakes"));
    }

    hideLoading();
    //---------------------------------------------------------------------------
    function init() {
      document.title = "CryptoDouble -- Polygon";
    }
    async function getAllStakes() {
      var allStakes = [];
      const numStakes = parseInt(await contract.getUserNumberOfStakes(app.YOUR_ADDRESS), 10);
      for (var i = 0; i < numStakes; ++i) {
        const stake = await contract.getUserStakeInfo(app.YOUR_ADDRESS, i);
        const start = new Date(stake.start.toNumber() * 1000);
        const end = new Date(stake.finish.toNumber() * 1000);
        const amount = fromEther(stake.amount);
        const now = new Date();
        const old = end <= now;
        allStakes.push({ start:start, end:end, amount:amount, idx:i, old:old });
      }
      return allStakes;
    }
    async function getUserOverview() {
      var referral = await contract.getUserReferrer(app.YOUR_ADDRESS);
      if (referral == 0x0) {
        referral = null;
      }
      const refBonus = fromEther(await contract.getUserReferralBonus(app.YOUR_ADDRESS));
      return { ref:referral, refBonus:refBonus };
    }
    function prettyUserOverview(userOverview, allStakes) {
      const userLink = "https://polygonscan.com/address/" + app.YOUR_ADDRESS;
      var numStakes = 0;
      var totalStakes = 0;

      for(var i = 0; i < allStakes.length; ++i) {
        ++numStakes;
        const amount = allStakes[i].amount;
        totalStakes += amount;
      }
      const totalExpectedReturn = 2.0 * totalStakes;
      var rows =
        [{ k:"Address"               , v:app.YOUR_ADDRESS.toString()       , l:userLink },
         { k:"Number of stakes"      , v:prettyInt(numStakes)              , l:null     },
         { k:"Total staked"          , v:prettyMatic(totalStakes)          , l:null     },
         { k:"SEP"                   , v:""                                , l:null     },
         { k:"Rewards pending"       , v:prettyMatic(totalExpectedReturn)  , l:null     },
         { k:"Referral bonus pending", v:prettyMatic(userOverview.refBonus), l:null     }
        ];
      if (userOverview.ref != null) {
        const refLink = "https://polygonscan.com/address/" + userOverview.ref.toString();
        rows = rows.concat([{ k:"Referrer", v:userOverview.ref.toString(), l:refLink }]);
      }
      const claimLink = "javascript:claim()";
      rows = rows.concat([{ k:"SEP", v:""                       , l:null      },
                          { k:""   , v:"Claim available rewards", l:claimLink }
                        ]);
      prettyTable("User", rows);
    }

    function prettyStakes(title, stakes) {
      var allRows = [];

      for(var i = 0; i < stakes.length; ++i) {
        const progress = getProgress(stakes[i].start, stakes[i].end);
        const amountStr = stakes[i].amount == 0 ? "CLAIMED" : prettyMatic(stakes[i].amount);
        const profitStr = stakes[i].amount == 0 ? "CLAIMED" : prettyMatic(stakes[i].amount * 2.0);
        var rows =
          [{ k:"Stake ID"  , v:prettyInt(stakes[i].idx)       , l:null },
           { k:"Amount"    , v:amountStr                      , l:null },
           { k:"Profit"    , v:profitStr                      , l:null },
           { k:"Start date", v:prettyDatetime(stakes[i].start), l:null },
           { k:"End date"  , v:prettyDatetime(stakes[i].end)  , l:null },
           { k:"Progress"  , v:progress                       , l:null }
          ];

        if (i == 0) {
          allRows = allRows.concat(rows);
        } else {
          allRows = allRows.concat([{k:"SEP", v:"", l:null}]).concat(rows);
        }
      }
      console.log(allRows);
      prettyTable(title, allRows);
    }

    function prettyTable(header, rows, tsl = "+", tsr = "+", bsl = "+",
      bsr = "+", msl = "+", msr = "+", msd = "+", msu = "+", msi = "+",
      hs = "─", ls = "|", ms = "|", rs = "|") {
      var maxk = 0;
      var maxv = 0;
      for (var row of rows) {
        maxk = Math.max(maxk, row.k.length);
        maxv = Math.max(maxv, row.v.length);
      }
      maxv = Math.max(maxv, header.length - maxk);
      const hdiff       = maxk + maxv - header.length + 3;
      const ksep        = hs.repeat(maxk + 2);
      const vsep        = hs.repeat(maxv + 2);
      const sep         = msl + ksep + hs + vsep + msr;
      const splitSep    = msl + ksep + msi + vsep + msr;
      const splitSepUp  = msl + ksep + msu + vsep + msr;
      const splitSepDwn = msl + ksep + msd + vsep + msr;
      const topSep      = tsl + ksep + hs + vsep + tsr;
      const botSep      = bsl + ksep + hs + vsep + bsr;
      const botSplitSep = bsl + ksep + msu + vsep + bsr;
      const top         = ls + " " + header + " ".repeat(hdiff) + " " + rs;
      var str           = topSep + "\n" + top;
      var prevNullKey   = true;
      var nullKey       = true;
      var withSep       = true;
      for (var row of rows) {
        const kdiff = maxk - row.k.length;
        const vdiff = maxv - row.v.length;
        const key = row.k
        var value = row.v
        var line;
        if (key == "SEP") {
          withSep = true;
        } else {
          if (row.l != null) {
            value = "<a href=\"" + row.l + "\">" + value + "</a>";
          }
          if (key == "") {
            prevNullKey = nullKey;
            nullKey = true;
            line = ls + " " + value + " ".repeat(kdiff + vdiff + 3) + " " + rs;
          } else {
            prevNullKey = nullKey;
            nullKey = false;
            line = ls + " " + row.k + " ".repeat(kdiff) + " " + ms + " " + value + " ".repeat(vdiff) + " " + rs;
          }
          if (withSep) {
            withSep = false;
            var s;
            if (prevNullKey && nullKey) {
              s = sep;
            } else if (prevNullKey & !nullKey) {
              s = splitSepDwn;
            } else if (!prevNullKey && nullKey) {
              s = splitSepUp;
            } else {
              s = splitSep;
            }
            str = str + "\n" + s + "\n" + line;
          } else {
            str = str + "\n" + line;
          }
        }
      }
      var s;
      if (nullKey) {
        s = botSep;
      } else {
        s = botSplitSep;
      }
      str = str + "\n" + s;
      const str2 = "<p style='font-size:16px;text-align:left'>" + str + "</p>"
      _print(`${str2}\n`);
    }

}
async function stake() {
  try {
    const refURL = window.location.search.substr(1).split("=")[1];
    if (refURL.substring(0, 2) == "0x") {
      ref = refURL
    }
  } catch (err) {
      ref = null;
  }
  try {
    const amount = parseInt(document.getElementById('maticInput').value, 10);
    if (isNaN(amount) || amount < 5) {
      throw "Invalid amount";
    }
    const refStr  = ref == null ? "" : "\n    Referrer: " + ref;
    const details = "\n    Stake: " + prettyMatic(amount)
                  + refStr;
    if (confirm("Confirm your stake:\n" + details)) {
      const zero = "0x0000000000000000000000000000000000000000";
      ref = ref == null ? zero : ref;
      const amountBN = toEther(amount);
      ///----------------------------------------------------------------------
      const abi =
    [
      {
        "inputs": [
          {
            "internalType": "address payable",
            "name": "_dev1",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_dev2",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_startUNIX",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "finish",
            "type": "uint256"
          }
        ],
        "name": "NewStake",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "referrer",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "referral",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "RefBonus",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Withdrawn",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "DEV_FEE_PERCENT",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "MIN_AMOUNT",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "PERCENTS_DIVIDER",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "REFERRAL_PERCENT",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "dev1",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "dev2",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserNumberOfStakes",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserReferralBonus",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserReferrer",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getUserStakeInfo",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "start",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "finish",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserTotalStakes",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "random",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "requestId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "randomness",
            "type": "uint256"
          }
        ],
        "name": "rawFulfillRandomness",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "referrer",
            "type": "address"
          }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "startUNIX",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalDoubled",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalStaked",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
        ];
      ///----------------------------------------------------------------------
      const app  = await init_ethers();
      const addr = getAddress();
      const signer = app.provider.getSigner();
      const contract = new ethers.Contract(addr, abi, signer);
      const pot = fromEther(await app.provider.getBalance(app.YOUR_ADDRESS));
      let allow = Promise.resolve();
      if (pot < amount) {
        alert("You don't have " + prettyMatic(amount) + " in your wallet");
        return;
      }
      showLoading();
      allow
        .then(async function() {
            contract.stake(ref, { value:amountBN, gasPrice:3000000000, gasLimit:500000 })
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
  }
  catch (err) {
    alert("Something went wrong, maybe an invalid amount?");
  }
}
async function claim() {
  const abi =
    [
      {
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
  ///--------------------------------------------------------------------------
  const app      = await init_ethers();
  const addr     = getAddress();
  const signer   = app.provider.getSigner();
  const contract = new ethers.Contract(addr, abi, signer);
  let allow      = Promise.resolve();
  showLoading();
  allow
    .then(async function() {
      contract.withdraw({ gasPrice:3000000000, gasLimit:500000 })
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
function getAddress() {
  return "0x1Ee5BDD695bBAF8FCF3F85eDA4469aeE264BD186";
}
function prettyMatic(raw) {
  return prettyDouble(raw) + " Matic";
}
function prettyInt(raw) {
  return Math.round(raw).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function prettyDouble(raw) {
  const pieces = raw.toFixed(2).toString().split(".");
  return pieces[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + pieces[1];

}
function prettyDatetime(raw) {
  return raw.toString();
}
function toEther(raw) {
  return ethers.BigNumber.from(raw).mul("1000000000000000000");
}
function fromEther(big) {
  const str = big.toString();
  if (str.length <= 18) {
    const pad = 18 - str.length
    return parseFloat ("0." + "0".repeat(pad) + str);
  } else {
    const cut = str.length - 18;
    const w = str.substring(0, cut);
    const f = str.substring(cut);

    return parseFloat(w + "." + f);
  }
}
function getProgress(start, end) {
  const now      = new Date();
  const durMs    = end.getTime() - start.getTime();
  const durDs    = Math.round(durMs / 1000 * 60 * 60 * 24);
  const proMs    = now.getTime() - start.getTime();
  const proDs    = Math.round(proMs / 1000 * 60 * 60 * 24);
  const progress = (proDs / durDs).toFixed(2);
  const percent  = Math.min(100.00, (progress * 100).toFixed(2));
  const blocks   = 40;
  const filled   = Math.min(blocks, Math.round(progress * blocks));
  const empty    = blocks - filled;
  return "#".repeat(filled) + "_".repeat(empty) + " " + percent.toString() + "%";
}
function then(now, days) {
  var date = new Date(now.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
function para(raw){
  return "<p style='font-size:16px;text-align:left'>" + raw + "</p>";
}
function header(level, raw) {
  var fontSize = 0;
  if(level == 1) {
    fontSize = 40
  } else if (level == 2) {
    fontSize = 30
  } else {
    fontSize = 20
  }
  return "<h" + level.toString()
              + " style='font-size:"
              + fontSize.toString()
              + "px;margin-bottom:-10px'>"
              + raw
              + "</h"
              + level.toString()
              + ">";
}