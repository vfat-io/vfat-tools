$(function () { consoleInit(main) });
  async function main() {
    ///------------------------------------------------------------------------
    init();
    ///------------------------------------------------------------------------
    const abi =

      [{"inputs":[{"internalType":"address payable","name":"_dev","type":"address"},{"internalType":"address payable","name":"_pro","type":"address"},{"internalType":"uint256","name":"startDate","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"totalAmount","type":"uint256"}],"name":"FeePayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penaltyAmount","type":"uint256"}],"name":"ForceWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"plan","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"percent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"start","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"finish","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Newbie","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":true,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RefBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"INVEST_MIN_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PENALTY_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENT_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"REFERRAL_PERCENTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TIME_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dev","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"forceWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPlanInfo","outputs":[{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"percent","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"},{"internalType":"uint256","name":"deposit","type":"uint256"}],"name":"getResult","outputs":[{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAmountOfDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAvailable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserCheckpoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getUserDepositInfo","outputs":[{"internalType":"uint8","name":"plan","type":"uint8"},{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralTotalBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferrer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalDeposits","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"pro","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startUNIX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

   ///------------------------------------------------------------------------
    const app      = await init_ethers();
    const addr     = getAddress();
    const addrLink = "https://polygonscan.com/address/" + addr + "#readContract";
    const contract = new ethers.Contract(addr, abi, app.provider);
    ///------------------------------------------------------------------------
    _print_bold("*** The below project is in no way affiliated with vfat.tools, just like all other projects listed here. ***")
    _print("TELEGRAM: https://t.me/hypematicv1")
    const plannames = ["PLAN 1", "PLAN 2", "PLAN 3", "PLAN 4", "PLAN 5", "PLAN 6", "PLAN 7", "PLAN 8"]

    ///------------------------------------------------------------------------
    const start         = new Date((await contract.startUNIX()).toNumber() * 1000);
    const staked        = fromEther(await contract.totalStaked());
    const dailyIncr     = (await contract.PERCENT_STEP()).toNumber() / 10;
    const minAmount     = fromEther(await contract.INVEST_MIN_AMOUNT());
    const earlyFee      = (await contract.PENALTY_STEP()).toNumber() / 10;
    const dailyIncrInfo = dailyIncr.toString() + "% per day";
    const earlyFeeInfo  = prettyInt(earlyFee)  + "% (plans 5-8 only)";
    _print("<hr>")
    const contr = "<h1 style='font-size:40px'>CONTRACT</h3>"
    _print(contr)
    prettyTable("Contract",
      [{ k:"Start date"        , v:prettyDatetime(start)       , l:null     },
       { k:"Address"               , v:addr                        , l:addrLink },
       { k:"SEP"                   , v:""                          , l:null     },
       { k:"Total staked"          , v:prettyMatic(staked)         , l:null     },
       { k:"Min. stake"       , v:prettyMatic(minAmount)      , l:null     },
       { k:"Interest rate increase", v:dailyIncrInfo               , l:null     },
       { k:"SEP"                   , v:""                          , l:null     },
       { k:"Development fee"       , v:"6%", l:null     },
       { k:"Contract fee"          , v:"6%", l:null     },
       { k:"Early exit fee"        , v:earlyFeeInfo                , l:null     }
      ]);
    ///------------------------------------------------------------------------
    const planInfos       = await getPlanInfos();
    const userInvestments = await getUserInvestments();
    const userOverview    = await getUserOverview();
    _print("<hr>")
    const user = "<h1 style='font-size:40px'>USER</h3>"
    _print(user)
    prettyUserOverview(userInvestments, userOverview);
    _print("<hr>")
    const plans = "<h1 style='font-size:40px'>HIGH YIELD INVESTMENT PLANS</h3>"
    _print(plans)
    prettyPlanInfos(userInvestments, planInfos);
    hideLoading();
    //---------------------------------------------------------------------------
    function init() {
      document.title = "HYPEMATIC HYIP.";
    }
    async function getPlanInfos() {
      var planInfos = [];
      for (var i = 0; i < 8; ++i) {
        const info       = await contract.getPlanInfo(i);
        const days       = info.time.toNumber();
        const dailyPct   = info.percent.toNumber() / 10;
        const roiPct     = (i < 4 ? ((dailyPct / 100) * days * 100) : (((1 + (dailyPct / 100)) ** days) - 1) * 100).toFixed(2);
        planInfos.push({ plan:i, days:days, daily:dailyPct, roi:roiPct });
      }
      return planInfos;
    }
    async function getUserInvestments() {
      var userInvestments  = [[], [], [], [], [], [], [], []];
      const numInvestments = parseInt(await contract.getUserAmountOfDeposits(app.YOUR_ADDRESS), 10);
      for (var i = 0; i < numInvestments; ++i) {
        const investment = await contract.getUserDepositInfo(app.YOUR_ADDRESS, i);
        const plan       = parseInt(investment.plan, 10);
        const start      = new Date(investment.start.toNumber() * 1000);
        const end        = new Date(investment.finish.toNumber() * 1000);
        const dailyPct   = investment.percent.toNumber() / 10;
        const staked     = fromEther(investment.amount);
        const expReturn  = fromEther(investment.profit);
        userInvestments[plan].push({ start:start, end:end, dailyPct:dailyPct, staked:staked,
          expReturn:expReturn, idx:i });
      }
      return userInvestments;
    }
    async function getUserOverview() {
      var referrer = await contract.getUserReferrer(app.YOUR_ADDRESS);
      if (referrer == 0x0) {
        referrer = null;
      }
      const refBonusTotal       = fromEther(await contract.getUserReferralTotalBonus(app.YOUR_ADDRESS));
      const refBonusOutstanding = fromEther(await contract.getUserReferralBonus(app.YOUR_ADDRESS));
      const balancePending      = fromEther(await contract.getUserDividends(app.YOUR_ADDRESS));
      return { ref:referrer, refBonusOutstanding:refBonusOutstanding, refBonusTotal:refBonusTotal,
        balancePending:balancePending };
    }
    function prettyUserOverview(userInvestments, userOverview) {
      var expOutstanding = 0;
      var numDeposits = 0;
      var totalStaked = 0;
      var avgDailyPct = 0;
      for (var i = 0; i < userInvestments.length; ++i) {
        for (var j = 0; j < userInvestments[i].length; ++j) {
          ++numDeposits;
          const staked    = userInvestments[i][j].staked;
          totalStaked    += staked;
          avgDailyPct    += userInvestments[i][j].dailyPct * staked;
          expOutstanding += userInvestments[i][j].expReturn;
        }
      }
      avgDailyPct = totalStaked == 0 ? 0 : (avgDailyPct / totalStaked).toFixed(2);
      const refPending = userOverview.balancePending > 0 ? userOverview.refBonusOutstanding : 0;
      var rows =
        [{ k:"Number staked"      , v:prettyInt(numDeposits)                       , l:null },
         { k:"Total staked"             , v:prettyMatic(totalStaked)                     , l:null },
         { k:"Average daily interest rate", v:avgDailyPct.toString() + "%"                 , l:null },
         { k:"SEP"                        , v:""                                           , l:null },
         { k:"Rewards outstanding"        , v:prettyMatic(expOutstanding)                  , l:null },
         { k:"Rewards pending"            , v:prettyMatic(userOverview.balancePending)     , l:null },
         { k:"Referral bonus outstanding" , v:prettyMatic(userOverview.refBonusOutstanding), l:null },
         { k:"Referral bonus pending"     , v:prettyMatic(refPending)                      , l:null }
        ];
      if (userOverview.ref != null) {
        const refLink = "https://polygonscan.com/address/" + userOverview.ref.toString();
        rows = [{ k:"Referrer", v:userOverview.ref.toString(), l:refLink }].concat(rows);
      }
      if (userOverview.balancePending > 0) {
        const withdrawLink = "javascript:withdraw()";
        rows = rows.concat([{ k:"SEP", v:""                        , l:null         },
                            { k:""   , v:"Withdraw pending rewards", l:withdrawLink }
                           ]);
      }
      const addrLink = "https://polygonscan.com/address/" + app.YOUR_ADDRESS;
      rows = [{ k:"Address", v:app.YOUR_ADDRESS.toString(), l:addrLink }].concat(rows);
      prettyTable("Your account", rows);
    }
    function prettyPlanInfos(userInvestments, planInfos) {
      for (var i = 0; i < 8; ++i) {
        const planInfo = planInfos[i];
        const ret1k    = 1000 * (planInfo.roi / 100);
        var overview =
          [{ k:"Length"             , v:planInfo.days.toString()    + " days", l:null },
           { k:"Daily interest rate", v:planInfo.daily.toString()   + "%"    , l:null },
           { k:"Total ROI"          , v:planInfo.roi.toString()     + "%"    , l:null },
           ];
        if (i > 3) {
          overview = overview.concat([{ k:"Early exit fee", v:prettyInt(earlyFee) + "%", l:null }]);
        }
        const now = new Date();
        const thn = then(now, planInfo.days);
        const investLink = "javascript:invest(" + (i + 1).toString() + ")";
        const example =
          [{ k:"SEP"           , v:""                  , l:null       },
           { k:""              , v:"Example stake", l:null       },
           { k:"SEP"           , v:""                  , l:null       },
           { k:"Start date", v:prettyDatetime(now) , l:null       },
           { k:"End date"  , v:prettyDatetime(thn) , l:null       },
           { k:"Invest"        , v:prettyMatic(1000)   , l:null       },
           { k:"Earn"          , v:prettyMatic(ret1k)  , l:null       },
           { k:"SEP"           , v:""                  , l:null       },
           { k:""              , v:"Stake"            , l:investLink }
           ];
        var rows = [];
        if (userInvestments[i].length == 0) {
          rows = overview.concat(example);
        } else {
          var investment;
          var investmentInfo;
          var investmentsInfo = [];
          for (var j = 0; j < userInvestments[i].length; ++j) {
            investment = userInvestments[i][j];
            const progress = getProgress(investment.start, investment.end);
            investmentInfo =
              [{ k:"SEP"                , v:""                                  , l:null },
               { k:""                   , v:"Stake " + (j + 1).toString()  , l:null },
               { k:"SEP"                , v:""                                  , l:null },
               { k:"Start date"     , v:prettyDatetime(investment.start)    , l:null },
               { k:"End date"       , v:prettyDatetime(investment.end)      , l:null },
               { k:"Progress"           , v:progress                            , l:null },
               { k:"Staked"           , v:prettyMatic(investment.staked)      , l:null },
               { k:"Expected return"    , v:prettyMatic(investment.expReturn)   , l:null },
               { k:"Daily interest rate", v:investment.dailyPct.toString() + "%", l:null },
               { k:"SEP"                , v:""                                  , l:null }
               ];
            if (i > 3) {
              const terminationInfo = "Terminate " + (j + 1).toString() + " (incurs 50% penalty)";
              const terminationLink = "javascript:terminate(" + investment.idx.toString() + ")";
              investmentInfo = investmentInfo.concat([{ k:"", v:terminationInfo, l:terminationLink }]);
            }
            investmentsInfo = investmentsInfo.concat(investmentInfo);
          }
          const reinvestInfo =
            [{ k:"SEP", v:""                             , l:null       },
             { k:""   , v:"Stake x" + (j + 1).toString(), l:investLink }
            ];
          rows = overview.concat(investmentsInfo, reinvestInfo);
        }
        prettyTable("Stake plan " + (i + 1).toString() + " = " + plannames[i], rows);
      }
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
async function invest(plan) {
  var ref = null;
  try {
    const refURL = window.location.search.substr(1).split("=")[1];
    if (refURL.substring(0, 2) == "0x") {
      ref = refURL
    }
  } catch (err) {
      ref = null;
  }
  try {
    var amountStr = prompt("How much matic would you like to stake in Plan " + plan.toString() + "?", "");
    if (amountStr == null) {
      return;
    }
    const amount = parseInt(amountStr, 10);
    if (isNaN(amount) || amount < 10) {
      throw "Invalid amount";
    }
    const refStr  = ref == null ? "" : "\n    Referrer: " + ref;
    const details = "    Plan:       " + plan.toString()
                  + "\n    Amount: " + prettyMatic(amount)
                  + refStr;
    if (confirm("Confirm your stake:\n" + details)) {
      const zero = "0x0000000000000000000000000000000000000000";
      ref = ref == null ? zero : ref;
      const amountBN = toEther(amount);
      ///----------------------------------------------------------------------
      const abi =
        [
          {
            "constant": false,
            "inputs": [
              {
                "name": "referrer",
                "type": "address"
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
          }
        ];
      ///----------------------------------------------------------------------
      const app      = await init_ethers();
      const addr     = getAddress();
      const signer   = app.provider.getSigner();
      const contract = new ethers.Contract(addr, abi, signer);
      const pot      = fromEther(await app.provider.getBalance(app.YOUR_ADDRESS));
      let allow      = Promise.resolve();
      if (pot < amount) {
        alert("You don't have " + prettyMatic(amount) + " in your wallet");
        return;
      }
      showLoading();
      allow
        .then(async function() {
            contract.invest(ref, plan - 1, { value:amountBN, gasPrice:5000000000, gasLimit:500000 })
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
    alert("Something went wrong, perhaps an invalid amount");
  }
}
async function terminate(investment) {
  const abi =
    [
      {
        "constant": false,
        "inputs": [
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "forceWithdraw",
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
      contract.forceWithdraw(investment, { gasPrice:5000000000, gasLimit:500000 })
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
async function withdraw() {
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
      contract.withdraw({ gasPrice:5000000000, gasLimit:500000 })
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
  return "0xf4F6142df38289e90C055F6727dEf3D66E874fc8";
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
  const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return raw.toLocaleDateString("en-US", opts);
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
