$(function () {
  consoleInit(main)
});

const TRANQ_ABI = {
  comptroller: [
      {
          inputs: [],
          name: 'getAllMarkets',
          outputs: [{ internalType: 'contract PToken[]', name: '', type: 'address[]' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
       "constant": true,
        "inputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "rewardSpeeds",
        "payable": false,
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ] 
    },
  ],
  pToken: [
    {
        "inputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": "underlying_"
            },
            {
                "name": "comptroller_",
                "internalType": "contract ComptrollerInterface",
                "type": "address"
            },
            {
                "name": "interestRateModel_",
                "internalType": "contract InterestRateModel",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "initialExchangeRateMantissa_",
                "type": "uint256"
            },
            {
                "name": "name_",
                "type": "string",
                "internalType": "string"
            },
            {
                "type": "string",
                "internalType": "string",
                "name": "symbol_"
            },
            {
                "name": "decimals_",
                "internalType": "uint8",
                "type": "uint8"
            },
            {
                "internalType": "address payable",
                "name": "admin_",
                "type": "address"
            },
            {
                "internalType": "address",
                "type": "address",
                "name": "implementation_"
            },
            {
                "type": "bytes",
                "name": "becomeImplementationData",
                "internalType": "bytes"
            }
        ],
        "type": "constructor",
        "payable": false,
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "AccrueInterest",
        "inputs": [
            {
                "name": "cashPrior",
                "type": "uint256",
                "internalType": "uint256",
                "indexed": false
            },
            {
                "indexed": false,
                "type": "uint256",
                "name": "interestAccumulated",
                "internalType": "uint256"
            },
            {
                "indexed": false,
                "type": "uint256",
                "name": "borrowIndex",
                "internalType": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalBorrows",
                "type": "uint256",
                "indexed": false
            }
        ]
    },
    {
        "anonymous": false,
        "type": "event",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address",
                "internalType": "address"
            },
            {
                "internalType": "uint256",
                "type": "uint256",
                "indexed": false,
                "name": "amount"
            }
        ],
        "name": "Approval"
    },
    {
        "anonymous": false,
        "type": "event",
        "name": "Borrow",
        "inputs": [
            {
                "type": "address",
                "indexed": false,
                "internalType": "address",
                "name": "borrower"
            },
            {
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256",
                "name": "borrowAmount"
            },
            {
                "name": "accountBorrows",
                "internalType": "uint256",
                "indexed": false,
                "type": "uint256"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "indexed": false,
                "name": "totalBorrows"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "indexed": false,
                "name": "error"
            },
            {
                "internalType": "uint256",
                "name": "info",
                "type": "uint256",
                "indexed": false
            },
            {
                "indexed": false,
                "type": "uint256",
                "name": "detail",
                "internalType": "uint256"
            }
        ],
        "anonymous": false,
        "name": "Failure",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "liquidator",
                "indexed": false
            },
            {
                "internalType": "address",
                "indexed": false,
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "indexed": false,
                "name": "repayAmount",
                "type": "uint256"
            },
            {
                "name": "tqTokenCollateral",
                "type": "address",
                "internalType": "address",
                "indexed": false
            },
            {
                "indexed": false,
                "name": "seizeTokens",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "name": "LiquidateBorrow",
        "type": "event"
    },
    {
        "anonymous": false,
        "name": "Mint",
        "inputs": [
            {
                "internalType": "address",
                "indexed": false,
                "name": "minter",
                "type": "address"
            },
            {
                "type": "uint256",
                "name": "mintAmount",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "mintTokens",
                "type": "uint256",
                "indexed": false
            }
        ],
        "type": "event"
    },
    {
        "type": "event",
        "inputs": [
            {
                "indexed": false,
                "name": "oldAdmin",
                "type": "address",
                "internalType": "address"
            },
            {
                "type": "address",
                "indexed": false,
                "name": "newAdmin",
                "internalType": "address"
            }
        ],
        "anonymous": false,
        "name": "NewAdmin"
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "NewComptroller",
        "inputs": [
            {
                "name": "oldComptroller",
                "internalType": "contract ComptrollerInterface",
                "type": "address",
                "indexed": false
            },
            {
                "name": "newComptroller",
                "indexed": false,
                "type": "address",
                "internalType": "contract ComptrollerInterface"
            }
        ]
    },
    {
        "name": "NewImplementation",
        "type": "event",
        "inputs": [
            {
                "name": "oldImplementation",
                "internalType": "address",
                "indexed": false,
                "type": "address"
            },
            {
                "internalType": "address",
                "indexed": false,
                "name": "newImplementation",
                "type": "address"
            }
        ],
        "anonymous": false
    },
    {
        "anonymous": false,
        "type": "event",
        "inputs": [
            {
                "name": "oldInterestRateModel",
                "type": "address",
                "internalType": "contract InterestRateModel",
                "indexed": false
            },
            {
                "internalType": "contract InterestRateModel",
                "name": "newInterestRateModel",
                "type": "address",
                "indexed": false
            }
        ],
        "name": "NewMarketInterestRateModel"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "type": "address",
                "indexed": false,
                "name": "oldPendingAdmin"
            },
            {
                "name": "newPendingAdmin",
                "internalType": "address",
                "indexed": false,
                "type": "address"
            }
        ],
        "type": "event",
        "anonymous": false,
        "name": "NewPendingAdmin"
    },
    {
        "name": "NewProtocolSeizeShare",
        "inputs": [
            {
                "name": "oldProtocolSeizeShareMantissa",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "newProtocolSeizeShareMantissa",
                "internalType": "uint256",
                "indexed": false
            }
        ],
        "anonymous": false,
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "indexed": false,
                "name": "oldReserveFactorMantissa"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "indexed": false,
                "name": "newReserveFactorMantissa"
            }
        ],
        "type": "event",
        "name": "NewReserveFactor"
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Redeem",
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "type": "address",
                "name": "redeemer"
            },
            {
                "internalType": "uint256",
                "indexed": false,
                "name": "redeemAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "redeemTokens",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "event",
        "name": "RepayBorrow",
        "inputs": [
            {
                "name": "payer",
                "type": "address",
                "internalType": "address",
                "indexed": false
            },
            {
                "type": "address",
                "internalType": "address",
                "indexed": false,
                "name": "borrower"
            },
            {
                "internalType": "uint256",
                "name": "repayAmount",
                "indexed": false,
                "type": "uint256"
            },
            {
                "name": "accountBorrows",
                "type": "uint256",
                "internalType": "uint256",
                "indexed": false
            },
            {
                "type": "uint256",
                "indexed": false,
                "name": "totalBorrows",
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "anonymous": false,
        "name": "ReservesAdded",
        "type": "event",
        "inputs": [
            {
                "internalType": "address",
                "name": "benefactor",
                "type": "address",
                "indexed": false
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "indexed": false,
                "name": "addAmount"
            },
            {
                "indexed": false,
                "type": "uint256",
                "internalType": "uint256",
                "name": "newTotalReserves"
            }
        ]
    },
    {
        "type": "event",
        "inputs": [
            {
                "name": "admin",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "indexed": false,
                "type": "uint256",
                "name": "reduceAmount",
                "internalType": "uint256"
            },
            {
                "indexed": false,
                "name": "newTotalReserves",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "anonymous": false,
        "name": "ReservesReduced"
    },
    {
        "type": "event",
        "name": "Transfer",
        "inputs": [
            {
                "type": "address",
                "name": "from",
                "indexed": true,
                "internalType": "address"
            },
            {
                "internalType": "address",
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "fallback",
        "payable": true,
        "stateMutability": "payable"
    },
    {
        "stateMutability": "view",
        "name": "accrualBlockTimestamp",
        "type": "function",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "inputs": [],
        "constant": true,
        "signature": "0xcfa99201"
    },
    {
        "payable": false,
        "inputs": [],
        "type": "function",
        "constant": true,
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "name": "admin",
        "signature": "0xf851a440"
    },
    {
        "type": "function",
        "constant": true,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "name": "borrowIndex",
        "payable": false,
        "stateMutability": "view",
        "signature": "0xaa5af0fd"
    },
    {
        "payable": false,
        "type": "function",
        "inputs": [],
        "constant": true,
        "stateMutability": "view",
        "name": "comptroller",
        "outputs": [
            {
                "type": "address",
                "internalType": "contract ComptrollerInterface",
                "name": ""
            }
        ],
        "signature": "0x5fe3b567"
    },
    {
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "name": "decimals",
        "type": "function",
        "stateMutability": "view",
        "constant": true,
        "inputs": [],
        "payable": false,
        "signature": "0x313ce567"
    },
    {
        "inputs": [],
        "payable": false,
        "constant": true,
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "name": "implementation",
        "stateMutability": "view",
        "type": "function",
        "signature": "0x5c60da1b"
    },
    {
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "contract InterestRateModel"
            }
        ],
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "type": "function",
        "name": "interestRateModel",
        "signature": "0xf3fdb15a"
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "type": "bool",
                "internalType": "bool",
                "name": ""
            }
        ],
        "inputs": [],
        "type": "function",
        "payable": false,
        "name": "isTqToken",
        "constant": true,
        "signature": "0x427671eb"
    },
    {
        "payable": false,
        "name": "name",
        "constant": true,
        "type": "function",
        "outputs": [
            {
                "name": "",
                "internalType": "string",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "inputs": [],
        "signature": "0x06fdde03"
    },
    {
        "type": "function",
        "payable": false,
        "name": "pendingAdmin",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "constant": true,
        "inputs": [],
        "signature": "0x26782247"
    },
    {
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "constant": true,
        "name": "protocolSeizeShareMantissa",
        "inputs": [],
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "signature": "0x6752e702"
    },
    {
        "inputs": [],
        "payable": false,
        "name": "reserveFactorMantissa",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "type": "function",
        "stateMutability": "view",
        "constant": true,
        "signature": "0x173b9904"
    },
    {
        "constant": true,
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "internalType": "string",
                "name": ""
            }
        ],
        "name": "symbol",
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "signature": "0x95d89b41"
    },
    {
        "type": "function",
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "constant": true,
        "stateMutability": "view",
        "name": "totalBorrows",
        "payable": false,
        "inputs": [],
        "signature": "0x47bd3718"
    },
    {
        "name": "totalReserves",
        "type": "function",
        "constant": true,
        "inputs": [],
        "stateMutability": "view",
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "payable": false,
        "signature": "0x8f840ddd"
    },
    {
        "type": "function",
        "name": "totalSupply",
        "payable": false,
        "stateMutability": "view",
        "constant": true,
        "inputs": [],
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "signature": "0x18160ddd"
    },
    {
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": ""
            }
        ],
        "type": "function",
        "constant": true,
        "name": "underlying",
        "inputs": [],
        "signature": "0x6f307dc3"
    },
    {
        "payable": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "implementation_",
                "type": "address"
            },
            {
                "type": "bool",
                "internalType": "bool",
                "name": "allowResign"
            },
            {
                "name": "becomeImplementationData",
                "internalType": "bytes",
                "type": "bytes"
            }
        ],
        "name": "_setImplementation",
        "type": "function",
        "outputs": [],
        "stateMutability": "nonpayable",
        "constant": false
    },
    {
        "name": "mint",
        "payable": false,
        "constant": false,
        "type": "function",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "internalType": "uint256",
                "name": "mintAmount",
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "redeem",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "redeemTokens",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "payable": false,
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ],
        "constant": false
    },
    {
        "constant": false,
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "redeemAmount"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "name": "redeemUnderlying",
        "type": "function",
        "payable": false
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "borrowAmount",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "constant": false,
        "type": "function",
        "name": "borrow",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "repayBorrow",
        "payable": false,
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "repayAmount"
            }
        ]
    },
    {
        "type": "function",
        "inputs": [
            {
                "name": "borrower",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "repayAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "constant": false,
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "repayBorrowBehalf",
        "payable": false
    },
    {
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "borrower",
                "type": "address",
                "internalType": "address"
            },
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "repayAmount"
            },
            {
                "type": "address",
                "name": "tqTokenCollateral",
                "internalType": "contract TqTokenInterface"
            }
        ],
        "name": "liquidateBorrow",
        "payable": false,
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "constant": false,
        "type": "function"
    },
    {
        "stateMutability": "nonpayable",
        "payable": false,
        "name": "transfer",
        "inputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": "dst"
            },
            {
                "name": "amount",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "type": "function",
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "constant": false
    },
    {
        "name": "transferFrom",
        "type": "function",
        "inputs": [
            {
                "internalType": "address",
                "name": "src",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "dst",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "constant": false,
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ]
    },
    {
        "payable": false,
        "name": "approve",
        "type": "function",
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "constant": false,
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "constant": true,
        "payable": false,
        "stateMutability": "view",
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "name": "spender",
                "internalType": "address",
                "type": "address"
            }
        ],
        "type": "function"
    },
    {
        "payable": false,
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "name": "balanceOf",
        "constant": true
    },
    {
        "payable": false,
        "type": "function",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "owner"
            }
        ],
        "constant": false,
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "name": "balanceOfUnderlying"
    },
    {
        "payable": false,
        "stateMutability": "view",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "account"
            }
        ],
        "name": "getAccountSnapshot",
        "type": "function",
        "constant": true,
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "inputs": [],
        "payable": false,
        "stateMutability": "view",
        "name": "borrowRatePerTimestamp",
        "constant": true,
        "signature": "0xcd91801c"
    },
    {
        "type": "function",
        "inputs": [],
        "payable": false,
        "constant": true,
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "name": "supplyRatePerTimestamp",
        "signature": "0xd3bd2c72"
    },
    {
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ],
        "inputs": [],
        "type": "function",
        "constant": false,
        "name": "totalBorrowsCurrent",
        "payable": false,
        "stateMutability": "nonpayable"
    },
    {
        "name": "borrowBalanceCurrent",
        "type": "function",
        "inputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": "account"
            }
        ],
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "constant": false
    },
    {
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "borrowBalanceStored",
        "payable": false,
        "constant": true,
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "account"
            }
        ]
    },
    {
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "exchangeRateCurrent",
        "payable": false,
        "inputs": [],
        "stateMutability": "nonpayable",
        "constant": false,
        "type": "function"
    },
    {
        "constant": true,
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "payable": false,
        "type": "function",
        "name": "exchangeRateStored",
        "inputs": [],
        "stateMutability": "view",
        "signature": "0x182df0f5"
    },
    {
        "constant": true,
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "name": "getCash",
        "type": "function",
        "payable": false,
        "inputs": [],
        "signature": "0x3b1d21a2"
    },
    {
        "stateMutability": "nonpayable",
        "name": "accrueInterest",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function",
        "inputs": [],
        "constant": false
    },
    {
        "type": "function",
        "constant": false,
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "address",
                "name": "liquidator",
                "internalType": "address"
            },
            {
                "internalType": "address",
                "type": "address",
                "name": "borrower"
            },
            {
                "name": "seizeTokens",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "seize"
    },
    {
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "payable": false,
        "inputs": [
            {
                "name": "token",
                "internalType": "contract EIP20NonStandardInterface",
                "type": "address"
            }
        ],
        "constant": false,
        "name": "sweepToken"
    },
    {
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "inputs": [
            {
                "internalType": "address payable",
                "name": "newPendingAdmin",
                "type": "address"
            }
        ],
        "type": "function",
        "stateMutability": "nonpayable",
        "constant": false,
        "payable": false,
        "name": "_setPendingAdmin"
    },
    {
        "name": "_setComptroller",
        "inputs": [
            {
                "name": "newComptroller",
                "internalType": "contract ComptrollerInterface",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "payable": false,
        "constant": false,
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "payable": false,
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "type": "uint256",
                "name": "newReserveFactorMantissa",
                "internalType": "uint256"
            }
        ],
        "name": "_setReserveFactor"
    },
    {
        "inputs": [],
        "payable": false,
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "type": "function",
        "name": "_acceptAdmin",
        "stateMutability": "nonpayable",
        "constant": false
    },
    {
        "payable": false,
        "name": "_addReserves",
        "type": "function",
        "constant": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "addAmount",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "payable": false,
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "constant": false,
        "type": "function",
        "inputs": [
            {
                "internalType": "uint256",
                "name": "reduceAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "name": "_reduceReserves"
    },
    {
        "type": "function",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "inputs": [
            {
                "type": "address",
                "internalType": "contract InterestRateModel",
                "name": "newInterestRateModel"
            }
        ],
        "constant": false,
        "stateMutability": "nonpayable",
        "name": "_setInterestRateModel"
    },
    {
        "name": "_setProtocolSeizeShare",
        "inputs": [
            {
                "name": "newProtocolSeizeShareMantissa",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "payable": false,
        "constant": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "name": "delegateToImplementation",
        "payable": false,
        "inputs": [
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "constant": false,
        "type": "function"
    },
    {
        "name": "delegateToViewImplementation",
        "inputs": [
            {
                "internalType": "bytes",
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": [
            {
                "type": "bytes",
                "internalType": "bytes",
                "name": ""
            }
        ],
        "constant": true,
        "stateMutability": "view",
        "type": "function",
        "payable": false
    }
],
  erc20: [
    {
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "_ethTokenAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "name": "symbol",
                "internalType": "string",
                "type": "string"
            },
            {
                "type": "uint8",
                "internalType": "uint8",
                "name": "decimals"
            }
        ],
        "type": "constructor",
        "payable": false
    },
    {
        "name": "Approval",
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "indexed": true,
                "name": "owner"
            },
            {
                "internalType": "address",
                "type": "address",
                "indexed": true,
                "name": "spender"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "value",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "type": "address",
                "name": "account",
                "internalType": "address"
            }
        ],
        "name": "MinterAdded"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "internalType": "address",
                "indexed": true,
                "type": "address",
                "name": "account"
            }
        ],
        "name": "MinterRemoved",
        "type": "event"
    },
    {
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "indexed": true,
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "value",
                "indexed": false,
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "name": "Transfer",
        "anonymous": false,
        "type": "event"
    },
    {
        "name": "addMinter",
        "stateMutability": "nonpayable",
        "type": "function",
        "outputs": [],
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "payable": false
    },
    {
        "name": "allowance",
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "type": "function",
        "payable": false,
        "stateMutability": "view",
        "outputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            }
        ],
        "constant": true
    },
    {
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "payable": false,
        "constant": false,
        "type": "function",
        "inputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": "spender"
            },
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "name": "approve"
    },
    {
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "type": "function",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "account"
            }
        ],
        "name": "balanceOf",
        "payable": false,
        "constant": true,
        "stateMutability": "view"
    },
    {
        "payable": false,
        "type": "function",
        "outputs": [],
        "constant": false,
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "name": "burn"
    },
    {
        "name": "burnFrom",
        "type": "function",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            },
            {
                "name": "amount",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "outputs": [],
        "constant": false,
        "stateMutability": "nonpayable",
        "payable": false
    },
    {
        "constant": true,
        "inputs": [],
        "type": "function",
        "payable": false,
        "stateMutability": "view",
        "outputs": [
            {
                "internalType": "uint8",
                "type": "uint8",
                "name": ""
            }
        ],
        "name": "decimals",
        "signature": "0x313ce567"
    },
    {
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "type": "bool",
                "name": ""
            }
        ],
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "spender",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "subtractedValue",
                "internalType": "uint256"
            }
        ],
        "constant": false,
        "type": "function",
        "stateMutability": "nonpayable"
    },
    {
        "constant": true,
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "inputs": [],
        "type": "function",
        "name": "ethTokenAddr",
        "payable": false,
        "signature": "0x11c9adc8"
    },
    {
        "constant": false,
        "stateMutability": "nonpayable",
        "payable": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "type": "uint256",
                "name": "addedValue",
                "internalType": "uint256"
            }
        ],
        "type": "function",
        "name": "increaseAllowance",
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ]
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "type": "bool",
                "internalType": "bool",
                "name": ""
            }
        ],
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "account"
            }
        ],
        "name": "isMinter",
        "constant": true,
        "payable": false,
        "type": "function"
    },
    {
        "payable": false,
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "constant": false,
        "name": "mint",
        "type": "function",
        "inputs": [
            {
                "name": "account",
                "internalType": "address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "amount"
            }
        ]
    },
    {
        "name": "name",
        "stateMutability": "view",
        "type": "function",
        "payable": false,
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "inputs": [],
        "constant": true,
        "signature": "0x06fdde03"
    },
    {
        "constant": false,
        "stateMutability": "nonpayable",
        "payable": false,
        "inputs": [],
        "name": "renounceMinter",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [],
        "type": "function",
        "payable": false,
        "constant": true,
        "stateMutability": "view",
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "signature": "0x95d89b41"
    },
    {
        "type": "function",
        "name": "totalSupply",
        "inputs": [],
        "constant": true,
        "payable": false,
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view",
        "signature": "0x18160ddd"
    },
    {
        "constant": false,
        "type": "function",
        "payable": false,
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "name": "",
                "internalType": "bool",
                "type": "bool"
            }
        ],
        "inputs": [
            {
                "name": "recipient",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "amount",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "transfer"
    },
    {
        "outputs": [
            {
                "name": "",
                "internalType": "bool",
                "type": "bool"
            }
        ],
        "type": "function",
        "name": "transferFrom",
        "payable": false,
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "sender"
            },
            {
                "type": "address",
                "name": "recipient",
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "constant": false
    }
],
  oracle: [
      {
          inputs: [{ internalType: 'address', name: '_pToken', type: 'address' }],
          name: 'getUnderlyingPrice',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
  ],
  rate: [
      {
          inputs: [],
          name: 'blocksPerYear',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
  ],
}

//I have to pass an uint as a parameter here [comptroller.rewardSpeeds(???, token)]
//this is the code https://explorer.harmony.one/address/0xB7ca41496DfEDDBC5eEb655215dA4b845047bE13?activeTab=7
const contracts = {
  comptroller: '0x6a82a17b48ef6be278bbc56138f35d04594587e3',
  oracle: '0x0c99e05cd2dcb52a583a3694f4d91813efb5b071',
  gas: {
      p_address: '0xbb93C7F378B9b531216f9aD7b5748be189A55807',
      symbol: 'ONE',
      decimals: 18,
  },
};

async function main() {
  const App = await init_ethers();
  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getHarmonyPrices();

  const COMPTROLLER = new ethcall.Contract(contracts.comptroller, TRANQ_ABI.comptroller, App.provider);

  const [allMarkets] = await App.ethcallProvider.all([COMPTROLLER.getAllMarkets()]);

  // console.log(allMarkets);

  const data = await Promise.all(allMarkets.map(token => loadData(App, token, COMPTROLLER, prices)));

  // console.log(data);

  let [totalSupply, totalBorrow, totalCash] = [0, 0, 0];

  for (const market of data) {
      totalSupply += market.totalSupply * market.underlyingPrice;
      totalBorrow += market.totalBorrows * market.underlyingPrice;
      totalCash += market.cash * market.underlyingPrice;
  }
  _print_bold(`Deposit Market Size : $${formatMoney(totalSupply)}`);
  _print_bold(`Borrow Market Size : $${formatMoney(totalBorrow)}`);
  _print_bold(`TVL : $${formatMoney(totalCash)}`);
  _print("");

  for (const market of data) {
      printData(market);
  }

  _print("");

  hideLoading();
}

async function loadData(App, token, comptroller, prices) {

  const PTOKEN_CONTRACT = new ethcall.Contract(token, TRANQ_ABI.pToken, App.provider);

  const [
      totalReserves_,
      totalSupply_,
      supply_,
      exchangeRate_,
      supplyRatePerTimestamp_,
      totalBorrows_,
      borrowBalanceOf_,
      borrowRatePerTimestamp_,
      cash_,
      interestRateModel,
  ] = await App.ethcallProvider.all([
      PTOKEN_CONTRACT.totalReserves(),
      PTOKEN_CONTRACT.totalSupply(),
      PTOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS),
      PTOKEN_CONTRACT.exchangeRateStored(),
      PTOKEN_CONTRACT.supplyRatePerTimestamp(),
      PTOKEN_CONTRACT.totalBorrows(),
      PTOKEN_CONTRACT.borrowBalanceStored(App.YOUR_ADDRESS),
      PTOKEN_CONTRACT.borrowRatePerTimestamp(),
      PTOKEN_CONTRACT.getCash(),
      PTOKEN_CONTRACT.interestRateModel(),
  ]);

  //let underlyingSymbol, underlyingDecimals;

  if (token.toLowerCase() === contracts.gas.p_address.toLowerCase()) {
      let underlyingSymbol_ = contracts.gas.symbol;
      let underlyingDecimals_ = contracts.gas.decimals;
  } else {
      const [underlying] = await App.ethcallProvider.all([PTOKEN_CONTRACT.underlying()]);
      //const UNDERLYING_CONTRACT = new ethcall.Contract(underlying, TRANQ_ABI.erc20, App.provider);
      //[underlyingSymbol] = await App.ethcallProvider.all([UNDERLYING_CONTRACT.symbol()]);
      //[underlyingDecimals] = await App.ethcallProvider.all([UNDERLYING_CONTRACT.decimals()]);
      const UNDERLYING_CONTRACT = new ethers.Contract(underlying, TRANQ_ABI.erc20, App.provider)
      let underlyingSymbol = await UNDERLYING_CONTRACT.symbol();
      let underlyingDecimals = await UNDERLYING_CONTRACT.decimals();
  }

  const ORACLE_CONTRACT = new ethcall.Contract(contracts.oracle, TRANQ_ABI.oracle, App.provider);
  const [underlyingPrice_] = await App.ethcallProvider.all([ORACLE_CONTRACT.getUnderlyingPrice(token)]);
  const underlyingPrice = underlyingPrice_ / 10 ** (18 + 18 - underlyingDecimals);

  const totalReserves = totalReserves_ / 10 ** underlyingDecimals;

  const exchangeRate = exchangeRate_ / 1e18;
  const totalSupply = totalSupply_ * exchangeRate / 10 ** underlyingDecimals;
  const supply = supply_ * exchangeRate / 10 ** underlyingDecimals;
  const supplyPct = supply / totalSupply * 100;

  const totalBorrows = totalBorrows_ / 10 ** underlyingDecimals;
  const borrow = borrowBalanceOf_ / 10 ** underlyingDecimals;
  const borrowPct = borrow / totalBorrows * 100;

  const cash = cash_ / 10 ** underlyingDecimals;

  const supplyAPY = ((1 + supplyRatePerTimestamp_ / 1e18) ** 31536000 - 1) * 100;
  const borrowAPY = ((1 + borrowRatePerTimestamp_ / 1e18) ** 31536000 - 1) * 100;

  let supplyFarmingAPY = 0;
  const [farmingRewards_] = await App.ethcallProvider.all([comptroller.rewardSpeeds(0, "0xc63AB8c72e636C9961c5e9288b697eC5F0B8E1F7")])
  const farmingRewards = farmingRewards_ / 1e18;
  const blocksPerYear_ = blocksPerYear * 1
  const tvl = totalSupply * underlyingPrice;
  const rewardPrice = getParameterCaseInsensitive(prices, "0xcf1709ad76a79d5a60210f23e81ce2460542a836")?.usd;
  if(farmingRewards > 0){
    supplyFarmingAPY = farmingRewards * blocksPerYear_ * rewardPrice / tvl * 100
  }
  const borrowFarmingAPY = 0;

  const supplyNetAPY = supplyAPY + supplyFarmingAPY
  const borrowNetAPY = borrowFarmingAPY - borrowAPY

  const supplyUsdPerYear = supply * underlyingPrice * supplyNetAPY / 100;
  const supplyUsdPerWeek = supplyUsdPerYear / 52;
  const supplyUsdPerDay = supplyUsdPerYear / 365;

  const borrowUsdPerYear = borrow * underlyingPrice * borrowNetAPY / 100;
  const borrowUsdPerWeek = borrowUsdPerYear / 52;
  const borrowUsdPerDay = borrowUsdPerYear / 365;


  return {
      underlyingSymbol,
      underlyingPrice,
      totalSupply,
      totalBorrows,
      totalReserves,
      cash,
      supplyAPY,
      borrowAPY,
      supplyFarmingAPY,
      borrowFarmingAPY,
      supplyNetAPY,
      borrowNetAPY,
      supply,
      supplyUsdPerDay,
      supplyUsdPerWeek,
      supplyUsdPerYear,
      borrow,
      borrowUsdPerDay,
      borrowUsdPerWeek,
      borrowUsdPerYear,
      supplyPct,
      borrowPct
  }
}

async function printData(data) {
  _print_bold(`${data.underlyingSymbol} ($${formatMoney(data.underlyingPrice)})`);
  _print(`Supplied : ${formatMoney(data.totalSupply)} ($${formatMoney(data.totalSupply * data.underlyingPrice)}) at ${data.supplyAPY.toFixed(2)}% APY`)
  _print(`Borrowed : ${formatMoney(data.totalBorrows)} ($${formatMoney(data.totalBorrows * data.underlyingPrice)}) at ${data.borrowAPY.toFixed(2)}% APY`)
  _print(`Reserves : ${formatMoney(data.totalReserves)} ($${formatMoney(data.totalReserves * data.underlyingPrice)})`);
  _print(`Farming APR Supply ${data.supplyFarmingAPY.toFixed(2)}% Borrow ${data.borrowFarmingAPY.toFixed(2)}%`);
  _print(`Net APY Supply ${data.supplyNetAPY.toFixed(2)}% Borrow ${data.borrowNetAPY.toFixed(2)}%`);
  if (data.supply > 0) {
      _print(`You are supplying ${formatMoney(data.supply)} ${data.underlyingSymbol} ($${formatMoney(data.supply * data.underlyingPrice)}), ${(data.supplyPct).toFixed(2)}% of the pool.`)
      _print(`Estimated Supply earnings: Day ($${formatMoney(data.supplyUsdPerDay)}) Week ($${formatMoney(data.supplyUsdPerWeek)}) Year: ($${formatMoney(data.supplyUsdPerYear)})`);
  }
  if (data.borrow > 0) {
      _print(`You are borrowing ${formatMoney(data.borrow)} ${data.underlyingSymbol} ($${formatMoney(data.borrow * data.underlyingPrice)}), ${(data.borrowPct).toFixed(2)}% of the pool.`)
      _print(`Estimated Borrow earnings: Day ($${formatMoney(data.borrowUsdPerDay)}) Week ($${formatMoney(data.borrowUsdPerWeek)}) Year: ($${formatMoney(data.borrowUsdPerYear)})`);
  }
  _print("");
}
