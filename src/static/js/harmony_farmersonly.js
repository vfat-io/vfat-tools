
$(function() {
consoleInit(main)
  });

const FOX_CHEF_ABI = [{"inputs": [{"internalType": "contract FoxToken", "name": "_fox", "type": "address"}, {"internalType": "uint256", "name": "_startBlock", "type": "uint256"}, {"internalType": "address", "name": "_devAddress", "type": "address"}, {"internalType": "address", "name": "_feeAddress", "type": "address"}, {"internalType": "address", "name": "_vaultAddress", "type": "address"}], "stateMutability": "nonpayable", "type": "constructor", "name": "constructor"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {"indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256"}, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "Deposit", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {"indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256"}, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "EmergencyWithdraw", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"}, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}], "name": "OwnershipTransferred", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {"indexed": true, "internalType": "address", "name": "referrer", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "commissionAmount", "type": "uint256"}], "name": "ReferralCommissionPaid", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {"indexed": true, "internalType": "address", "name": "newAddress", "type": "address"}], "name": "SetDevAddress", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {"indexed": true, "internalType": "address", "name": "newAddress", "type": "address"}], "name": "SetFeeAddress", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {"indexed": true, "internalType": "contract IReferral", "name": "newAddress", "type": "address"}], "name": "SetReferralAddress", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {"indexed": true, "internalType": "address", "name": "newAddress", "type": "address"}], "name": "SetVaultAddress", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "foxPerBlock", "type": "uint256"}], "name": "UpdateEmissionRate", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {"indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256"}, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "Withdraw", "type": "event"}, {"inputs": [], "name": "MAXIMUM_REFERRAL_COMMISSION_RATE", "outputs": [{"internalType": "uint16", "name": "", "type": "uint16"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_allocPoint", "type": "uint256"}, {"internalType": "contract IERC20", "name": "_lpToken", "type": "address"}, {"internalType": "uint16", "name": "_depositFeeBP", "type": "uint16"}], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_pid", "type": "uint256"}, {"internalType": "uint256", "name": "_amount", "type": "uint256"}, {"internalType": "address", "name": "_referrer", "type": "address"}], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "name": "devAddress", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_pid", "type": "uint256"}], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "name": "feeAddress", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "fox", "outputs": [{"internalType": "contract FoxToken", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "foxPerBlock", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_from", "type": "uint256"}, {"internalType": "uint256", "name": "_to", "type": "uint256"}], "name": "getMultiplier", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "pure", "type": "function"}, {"inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "name": "owner", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_pid", "type": "uint256"}, {"internalType": "address", "name": "_user", "type": "address"}], "name": "pendingFox", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}], "name": "poolExistence", "outputs": [{"internalType": "bool", "name": "", "type": "bool"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "name": "poolInfo", "outputs": [{"internalType": "contract IERC20", "name": "lpToken", "type": "address"}, {"internalType": "uint256", "name": "allocPoint", "type": "uint256"}, {"internalType": "uint256", "name": "lastRewardBlock", "type": "uint256"}, {"internalType": "uint256", "name": "accFoxPerShare", "type": "uint256"}, {"internalType": "uint16", "name": "depositFeeBP", "type": "uint16"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "poolLength", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "referral", "outputs": [{"internalType": "contract IReferral", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "referralCommissionRate", "outputs": [{"internalType": "uint16", "name": "", "type": "uint16"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_pid", "type": "uint256"}, {"internalType": "uint256", "name": "_allocPoint", "type": "uint256"}, {"internalType": "uint16", "name": "_depositFeeBP", "type": "uint16"}], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_devAddress", "type": "address"}], "name": "setDevAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_feeAddress", "type": "address"}], "name": "setFeeAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "contract IReferral", "name": "_referral", "type": "address"}], "name": "setReferralAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint16", "name": "_referralCommissionRate", "type": "uint16"}], "name": "setReferralCommissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "_vaultAddress", "type": "address"}], "name": "setVaultAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "name": "startBlock", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "totalAllocPoint", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_foxPerBlock", "type": "uint256"}], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_pid", "type": "uint256"}], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_startBlock", "type": "uint256"}], "name": "updateStartBlock", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}, {"internalType": "address", "name": "", "type": "address"}], "name": "userInfo", "outputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}, {"internalType": "uint256", "name": "rewardDebt", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "vaultAddress", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "uint256", "name": "_pid", "type": "uint256"}, {"internalType": "uint256", "name": "_amount", "type": "uint256"}], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function"}]
const STRAT_ABI = [{"inputs":[{"internalType":"address","name":"_govAddress","type":"address"},{"internalType":"address","name":"_autoFarmAddress","type":"address"},{"internalType":"address","name":"_AUTOAddress","type":"address"},{"internalType":"bool","name":"_isCAKEStaking","type":"bool"},{"internalType":"bool","name":"_isAutoComp","type":"bool"},{"internalType":"address","name":"_farmContractAddress","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_wantAddress","type":"address"},{"internalType":"address","name":"_token0Address","type":"address"},{"internalType":"address","name":"_token1Address","type":"address"},{"internalType":"address","name":"_earnedAddress","type":"address"},{"internalType":"address","name":"_uniRouterAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"AUTOAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"autoFarmAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackRateMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBackRateUL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controllerFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controllerFeeMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controllerFeeUL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"convertDustToEarned","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"uint256","name":"_wantAmt","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earnedAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"earnedToAUTOPath","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"earnedToToken0Path","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"earnedToToken1Path","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"entranceFeeFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"entranceFeeFactorLL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"entranceFeeFactorMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"farmContractAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"govAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"inCaseTokensGetStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isAutoComp","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isCAKEStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEarnBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"onlyGov","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_controllerFee","type":"uint256"}],"name":"setControllerFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_entranceFeeFactor","type":"uint256"}],"name":"setEntranceFeeFactor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_govAddress","type":"address"}],"name":"setGov","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_onlyGov","type":"bool"}],"name":"setOnlyGov","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_buyBackRate","type":"uint256"}],"name":"setbuyBackRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sharesTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0Address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"token0ToEarnedPath","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1Address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"token1ToEarnedPath","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniRouterAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wantAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wantLockedTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbnbAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"uint256","name":"_wantAmt","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]
const FARMERSONLY_VAULTS_ABI = [
  {
      "anonymous": false,
      "name": "AddPool",
      "type": "event",
      "inputs": [
          {
              "name": "strat",
              "internalType": "address",
              "type": "address",
              "indexed": true
          }
      ]
  },
  {
      "type": "event",
      "inputs": [
          {
              "type": "address",
              "internalType": "address",
              "indexed": true,
              "name": "user"
          },
          {
              "indexed": true,
              "type": "uint256",
              "name": "pid",
              "internalType": "uint256"
          },
          {
              "type": "uint256",
              "internalType": "uint256",
              "indexed": false,
              "name": "amount"
          }
      ],
      "anonymous": false,
      "name": "Deposit"
  },
  {
      "name": "EmergencyWithdraw",
      "type": "event",
      "anonymous": false,
      "inputs": [
          {
              "type": "address",
              "name": "user",
              "internalType": "address",
              "indexed": true
          },
          {
              "indexed": true,
              "name": "pid",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ]
  },
  {
      "name": "OperatorUpdated",
      "inputs": [
          {
              "name": "operator",
              "internalType": "address",
              "indexed": true,
              "type": "address"
          },
          {
              "name": "status",
              "type": "bool",
              "internalType": "bool",
              "indexed": true
          }
      ],
      "anonymous": false,
      "type": "event"
  },
  {
      "inputs": [
          {
              "name": "previousOwner",
              "internalType": "address",
              "indexed": true,
              "type": "address"
          },
          {
              "indexed": true,
              "name": "newOwner",
              "internalType": "address",
              "type": "address"
          }
      ],
      "anonymous": false,
      "type": "event",
      "name": "OwnershipTransferred"
  },
  {
      "anonymous": false,
      "name": "Withdraw",
      "type": "event",
      "inputs": [
          {
              "name": "user",
              "internalType": "address",
              "indexed": true,
              "type": "address"
          },
          {
              "internalType": "uint256",
              "type": "uint256",
              "name": "pid",
              "indexed": true
          },
          {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256",
              "indexed": false
          }
      ]
  },
  {
      "type": "function",
      "stateMutability": "view",
      "name": "operators",
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "inputs": [
          {
              "name": "",
              "internalType": "address",
              "type": "address"
          }
      ]
  },
  {
      "name": "owner",
      "stateMutability": "view",
      "outputs": [
          {
              "type": "address",
              "name": "",
              "internalType": "address"
          }
      ],
      "type": "function",
      "inputs": [],
      "constant": true,
      "signature": "0x8da5cb5b"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "outputs": [
          {
              "type": "address",
              "name": "want",
              "internalType": "contract IERC20"
          },
          {
              "name": "strat",
              "internalType": "address",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function",
      "name": "poolInfo"
  },
  {
      "stateMutability": "nonpayable",
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": []
  },
  {
      "stateMutability": "nonpayable",
      "name": "transferOwnership",
      "inputs": [
          {
              "type": "address",
              "internalType": "address",
              "name": "newOwner"
          }
      ],
      "type": "function",
      "outputs": []
  },
  {
      "name": "updateOperator",
      "stateMutability": "nonpayable",
      "outputs": [],
      "type": "function",
      "inputs": [
          {
              "name": "_operator",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "_status",
              "type": "bool",
              "internalType": "bool"
          }
      ]
  },
  {
      "name": "userInfo",
      "stateMutability": "view",
      "inputs": [
          {
              "type": "uint256",
              "name": "",
              "internalType": "uint256"
          },
          {
              "name": "",
              "internalType": "address",
              "type": "address"
          }
      ],
      "outputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "shares"
          }
      ],
      "type": "function"
  },
  {
      "inputs": [],
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "type": "function",
      "stateMutability": "view",
      "name": "poolLength",
      "constant": true,
      "signature": "0x081e3eda"
  },
  {
      "inputs": [
          {
              "type": "address",
              "name": "_strat",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable",
      "name": "addPool",
      "type": "function"
  },
  {
      "name": "stakedWantTokens",
      "stateMutability": "view",
      "inputs": [
          {
              "type": "uint256",
              "name": "_pid",
              "internalType": "uint256"
          },
          {
              "name": "_user",
              "type": "address",
              "internalType": "address"
          }
      ],
      "type": "function",
      "outputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": ""
          }
      ]
  },
  {
      "name": "deposit",
      "stateMutability": "nonpayable",
      "outputs": [],
      "type": "function",
      "inputs": [
          {
              "name": "_pid",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "type": "uint256",
              "name": "_wantAmt",
              "internalType": "uint256"
          },
          {
              "name": "_to",
              "type": "address",
              "internalType": "address"
          }
      ]
  },
  {
      "type": "function",
      "outputs": [],
      "name": "deposit",
      "stateMutability": "nonpayable",
      "inputs": [
          {
              "name": "_pid",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_wantAmt",
              "type": "uint256"
          }
      ]
  },
  {
      "name": "withdraw",
      "type": "function",
      "stateMutability": "nonpayable",
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "type": "uint256",
              "name": "_wantAmt"
          },
          {
              "name": "_to",
              "internalType": "address",
              "type": "address"
          }
      ],
      "outputs": []
  },
  {
      "type": "function",
      "stateMutability": "nonpayable",
      "inputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_pid"
          },
          {
              "name": "_wantAmt",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "name": "withdraw",
      "outputs": []
  },
  {
      "type": "function",
      "stateMutability": "nonpayable",
      "inputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_pid"
          }
      ],
      "name": "withdrawAll",
      "outputs": []
  },
  {
      "stateMutability": "nonpayable",
      "outputs": [],
      "inputs": [],
      "name": "resetAllowances",
      "type": "function"
  },
  {
      "type": "function",
      "stateMutability": "nonpayable",
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_pid",
              "type": "uint256"
          }
      ],
      "name": "resetSingleAllowance",
      "outputs": []
  }
]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const FOX_CHEF_ADDR = "0x15e04418d328c39ba747690f6dae9bbf548cd358";
    const FARMERSONLY_VAULTS_ADDR = "0x2914646e782cc36297c6639734892927b3b6fe56";
    const rewardTokenTicker = "FOX";
    const FOX_CHEF = new ethers.Contract(FOX_CHEF_ADDR, FOX_CHEF_ABI, App.provider);
    const FARMERSONLY_VAULTS = new ethers.Contract(FARMERSONLY_VAULTS_ADDR, FARMERSONLY_VAULTS_ABI, App.provider);

    const rewardPerBlock = await FOX_CHEF.foxPerBlock();
    const rewardsPerWeek = rewardPerBlock / 1e18 * 604800 / 2

    const tokens = {};
    const prices = await getHarmonyPrices();

    await loadHarmonyChefContract(App, tokens, prices, FOX_CHEF, FOX_CHEF_ADDR, FOX_CHEF_ABI, rewardTokenTicker,
        "fox", null, rewardsPerWeek, "pendingFox", [1]);

    _print("");

    await loadFarmersonlyVaultsContract(App, tokens, prices, FARMERSONLY_VAULTS, FARMERSONLY_VAULTS_ADDR);

    hideLoading();
  }

async function getFarmersonlyVaultInfo(app, chefContract, chefAddress, poolIndex) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  const poolToken = await getHarmonyToken(app, poolInfo.want, chefAddress);
  const staked = await chefContract.stakedWantTokens(poolIndex, app.YOUR_ADDRESS) / 10 ** poolToken.decimals;
  const strat = new ethers.Contract(poolInfo.strat, STRAT_ABI, app.provider);
  poolToken.staked = await strat.wantLockedTotal() / 1e18;
  const totalShares = await strat.sharesTotal();
  const userStaked = staked / totalShares * poolToken.staked;
  return {
      address: poolInfo.want,
      poolToken: poolToken,
      userStaked : userStaked//staked
  };
}

async function loadFarmersonlyVaultsContract(App, tokens, prices, chef, chefAddress) {

  const poolCount = parseInt(await chef.poolLength(), 10);

  _print(`Found ${poolCount} vaults.\n`)

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getFarmersonlyVaultInfo(App, chef, chefAddress, x)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getHarmonyToken(App, address, chefAddress);
  }));

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "Harmony") : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printFarmersonlyPool(prices, tokens, poolInfos[i], i, poolPrices[i], "harmony")
      aprs.push(apr);
    }
  }
  let totalUserStaked=0, totalStaked=0;
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
    }
  }
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    if (totalUserStaked > 0) {
      _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)}`)
    }
  return { prices, totalUserStaked, totalStaked }
}

function printFarmersonlyPool(prices, tokens, poolInfo, poolIndex, poolPrices, chain="eth") {
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printFarmersonlyAPR(poolPrices.stakeTokenTicker, staked_tvl, userStaked, poolPrices.price);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  _print("");
  return apr;
}

function printFarmersonlyAPR(stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice) {
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(2)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl
  }
}