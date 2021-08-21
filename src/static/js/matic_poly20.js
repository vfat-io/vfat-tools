$(function () { consoleInit(main) });
  async function main() {
    ///------------------------------------------------------------------------
    init();
    ///------------------------------------------------------------------------
    const abi =
    [
      {
        "constant": true,
        "inputs": [],
        "name": "PERCENTS_DIVIDER",
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
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserDownlineCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          },
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
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserDividends",
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
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserAvailable",
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
        "name": "getStartTimeAnd8Pm",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          },
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
        "name": "TIME_STEP",
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
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserReferrer",
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
        "name": "devAddress",
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
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "DEV_FEE",
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
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserReferralTotalBonus",
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
        "name": "PERCENT_STEP",
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
            "name": "plan",
            "type": "uint8"
          },
          {
            "name": "deposit",
            "type": "uint256"
          }
        ],
        "name": "getResult",
        "outputs": [
          {
            "name": "percent",
            "type": "uint256"
          },
          {
            "name": "profit",
            "type": "uint256"
          },
          {
            "name": "finish",
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
            "type": "uint256"
          }
        ],
        "name": "REFERRAL_PERCENTS",
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
        "name": "totalRefBonus",
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
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserReferralWithdrawn",
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
        "name": "refhand",
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
        "name": "getContractBalance",
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
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserTotalDeposits",
        "outputs": [
          {
            "name": "amount",
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
        "name": "totalStaked",
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
            "name": "referrer",
            "type": "address"
          },
          {
            "name": "reffPlan",
            "type": "uint8"
          },
          {
            "name": "plan",
            "type": "uint8"
          }
        ],
        "name": "invest",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "timePointer",
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
            "name": "plan",
            "type": "uint8"
          }
        ],
        "name": "getPercent",
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
        "name": "users",
        "outputs": [
          {
            "name": "checkpoint",
            "type": "uint256"
          },
          {
            "name": "referrer",
            "type": "address"
          },
          {
            "name": "bonus",
            "type": "uint256"
          },
          {
            "name": "totalBonus",
            "type": "uint256"
          },
          {
            "name": "latestWithdrawal",
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
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserAmountOfDeposits",
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
        "name": "mover",
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
            "name": "plan",
            "type": "uint8"
          }
        ],
        "name": "getPlanInfo",
        "outputs": [
          {
            "name": "time",
            "type": "uint256"
          },
          {
            "name": "percent",
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
        "name": "playerWithdrawAmount",
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
            "name": "userAddress",
            "type": "address"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getUserDepositInfo",
        "outputs": [
          {
            "name": "plan",
            "type": "uint8"
          },
          {
            "name": "percent",
            "type": "uint256"
          },
          {
            "name": "amount",
            "type": "uint256"
          },
          {
            "name": "profit",
            "type": "uint256"
          },
          {
            "name": "start",
            "type": "uint256"
          },
          {
            "name": "finish",
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
        "name": "startUNIX",
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
        "name": "START_TIME_11GMT",
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
        "name": "insuranceContract",
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
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserCheckpoint",
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
        "name": "INSURANCE_CONTRACT",
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
        "name": "INVEST_MIN_AMOUNT",
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
            "name": "userAddress",
            "type": "address"
          }
        ],
        "name": "getUserReferralBonus",
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
        "name": "reinvest",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "user",
            "type": "address"
          }
        ],
        "name": "Newbie",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "plan",
            "type": "uint8"
          },
          {
            "indexed": false,
            "name": "percent",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "profit",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "start",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "finish",
            "type": "uint256"
          }
        ],
        "name": "NewDeposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Withdrawn",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "referrer",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "referral",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "level",
            "type": "uint256"
          },
          {
            "indexed": false,
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
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "totalAmount",
            "type": "uint256"
          }
        ],
        "name": "FeePayed",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "duration_",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "referral_",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "amount_",
            "type": "uint256"
          }
        ],
        "name": "Performances",
        "type": "event"
      }
    ];

    ///------------------------------------------------------------------------
    const app      = await init_ethers();
    const addr     = "0xFF6d923D6b73970BD9B93777e5b418D80CD9Efb7";
    const addrLink = "https://polygonscan.com/address/0xFF6d923D6b73970BD9B93777e5b418D80CD9Efb7";
    const contract = new ethers.Contract(addr, abi, app.provider);
    ///------------------------------------------------------------------------
    const logo = "██████████████████████████████████" + "\n" +
                 "█▄─▄▄─█─▄▄─█▄─▄███▄─█─▄█▀▄▄▀█─▄▄─█" + "\n" +
                 "██─▄▄▄█─██─██─██▀██▄─▄███▀▄██─██─█" + "\n" +
                 "▀▄▄▄▀▀▀▄▄▄▄▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▄▄▀▄▄▄▄▀" + "\n";

    _print(logo);
    prettyTable("Welcome",
      [{ k:"SEP"       , v:""          , l: null                                                                  },
      { k:""          , v:"Website"    , l:"https://poly20.finance/"                                              },
      { k:""          , v:"Telegram"   , l:"https://t.me/poly20"                                                  }
      ]);
    ///------------------------------------------------------------------------
    const start         = new Date((await contract.startUNIX()).toNumber() * 1000);
    const staked        = fromEther(await contract.totalStaked());
    const minAmount     = fromEther(await contract.INVEST_MIN_AMOUNT());
    const devFee        = (await contract.DEV_FEE()).toNumber() / 10;
    const dailyIncrInfo = "20% per day";
    prettyTable("Contract",
      [{ k:"Start date"            , v:prettyDatetime(start)       , l:null     },
       { k:"Address"               , v:addr                        , l:addrLink },
       { k:"SEP"                   , v:""                          , l:null     },
       { k:"Total staked"          , v:prettyMatic(staked)         , l:null     },
       { k:"Min. investment"       , v:prettyMatic(minAmount)      , l:null     },
       { k:"Daily profit"		   , v:dailyIncrInfo               , l:null     }
      ]);
    ///------------------------------------------------------------------------
    
    function init() {
      document.title = "Poly20";
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
      _print(`${str}\n`);
    }

}

function prettyMatic(raw) {
  return prettyDouble(raw) + " Matic";
}

function prettyDouble(raw) {
  const pieces = raw.toFixed(2).toString().split(".");
  return pieces[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + pieces[1];

}
function prettyDatetime(raw) {
  const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return raw.toLocaleDateString("en-US", opts);
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