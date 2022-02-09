$(function () {
  consoleInit(main)
  });
  
  const CZD_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_usdcCurrency",
          "type": "address"
        },
        {
          "internalType": "contract DarksideToolBox",
          "name": "_darksideToolBox",
          "type": "address"
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
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "router",
          "type": "address"
        }
      ],
      "name": "DarksideSwapRouterUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "inputToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "inputAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "usdcOutput",
          "type": "uint256"
        }
      ],
      "name": "DepositFeeConvertedToUSDC",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "CZDiamondAmount",
          "type": "uint256"
        }
      ],
      "name": "DistributeCZDiamond",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOperator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOperator",
          "type": "address"
        }
      ],
      "name": "OperatorTransferred",
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
          "indexed": false,
          "internalType": "uint256",
          "name": "distributionTimeFrameBlocks",
          "type": "uint256"
        }
      ],
      "name": "SetUSDCDistributionTimeFrame",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "usdcAmount",
          "type": "uint256"
        }
      ],
      "name": "USDCTransferredToUser",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "BURN_ADDRESS",
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
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
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
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenType",
          "type": "uint256"
        }
      ],
      "name": "convertDepositFeesToUSDC",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "darksideSwapRouter",
      "outputs": [
        {
          "internalType": "contract IUniswapV2Router02",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "darksideToolBox",
      "outputs": [
        {
          "internalType": "contract DarksideToolBox",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "distribute",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "distributionTimeFrameBlocks",
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
      "name": "getUSDCDrip",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUSDCDripRate",
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
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastUSDCDistroBlock",
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
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "operator",
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
      "name": "ownershipIsTransferred",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pendingUSDC",
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
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_usdcDistributionTimeFrame",
          "type": "uint256"
        }
      ],
      "name": "setUSDCDistributionTimeFrame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
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
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOperator",
          "type": "address"
        }
      ],
      "name": "transferOperator",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferUSDCToUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_router",
          "type": "address"
        }
      ],
      "name": "updateDarksideSwapRouter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "usdcRewardCurrency",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "usdcSwapThreshold",
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
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
  
  const MCHEF_ABI = [
    {
      "inputs": [
        {
          "internalType": "contract NFTChef",
          "name": "_nftChef",
          "type": "address"
        },
        {
          "internalType": "contract CZDiamondToken",
          "name": "_CZDiamond",
          "type": "address"
        },
        {
          "internalType": "contract DarksideToken",
          "name": "_darkside",
          "type": "address"
        },
        {
          "internalType": "contract DarksideToolBox",
          "name": "_darksideToolBox",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_startBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_czdReleaseHalfLife",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_initialCZDReleaseRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_beginningDarksideEmission",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_endDarksideEmission",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_gradient1EndBlock",
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
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenType",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "allocPoint",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "lpToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "depositFeeBPOrNFTMaticFee",
          "type": "uint256"
        }
      ],
      "name": "AddPool",
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
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
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
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "EmergencyWithdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newEndGoalDarksideEmmission",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newEndDarksideEmmissionBlock",
          "type": "uint256"
        }
      ],
      "name": "GradientUpdated",
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
          "indexed": false,
          "internalType": "address",
          "name": "darksideAddress",
          "type": "address"
        }
      ],
      "name": "SetDarksideReferral",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "allocPoint",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "depositFeeBPOrNFTMaticFee",
          "type": "uint256"
        }
      ],
      "name": "SetPool",
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
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "CZDiamond",
      "outputs": [
        {
          "internalType": "contract CZDiamondToken",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "CZDiamondShareOfBurn",
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
      "name": "FOUNDER1_ADDRESS",
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
      "name": "FOUNDER2_ADDRESS",
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
      "name": "accDepositUSDCRewardPerShare",
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
          "internalType": "uint256",
          "name": "_tokenType",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_lpToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_depositFeeBPOrNFTMaticFee",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_withUpdate",
          "type": "bool"
        }
      ],
      "name": "add",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "czdReleaseHalfLife",
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
      "name": "darkside",
      "outputs": [
        {
          "internalType": "contract DarksideToken",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "darksideReleaseGradient",
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
      "name": "darksideToolBox",
      "outputs": [
        {
          "internalType": "contract DarksideToolBox",
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
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amountOrId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isNFTHarvest",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "_referrer",
          "type": "address"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "emergencyWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endDarksideGradientBlock",
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
      "name": "endGoalDarksideEmission",
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
      "name": "initialCZDReleaseRate",
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
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "isFounder",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isIncreasingGradient",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "isNativeToken",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lastDarksideBurnBalance",
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
      "name": "massUpdatePools",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nftChef",
      "outputs": [
        {
          "internalType": "contract NFTChef",
          "name": "",
          "type": "address"
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "pendingCZDiamond",
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
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "pendingDarkside",
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
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "pendingUSDC",
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
          "name": "",
          "type": "address"
        }
      ],
      "name": "poolExistence",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "poolInfo",
      "outputs": [
        {
          "internalType": "address",
          "name": "lpToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastRewardBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "accDarksidePerShare",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "accCZDiamondPerShare",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "depositFeeBPOrNFTMaticFee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tokenType",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalLocked",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "poolLength",
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
      "name": "referralCommissionRate",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
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
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_allocPoint",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_depositFeeBPOrNFTMaticFee",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_withUpdate",
          "type": "bool"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IDarksideReferral",
          "name": "_darksideReferral",
          "type": "address"
        }
      ],
      "name": "setDarksideReferral",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startBlock",
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
      "name": "totalAllocPoint",
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
      "name": "totalUSDCCollected",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "endBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endDarksideEmission",
          "type": "uint256"
        }
      ],
      "name": "updateDarksideRelease",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "updatePool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "usdcCurrencyAddress",
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
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "darksideRewardDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "CZDiamondRewardDebt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "usdcRewardDebt",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amountOrId",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
  
  
  const getDarkRelease = (
    blocknumber,
    startBlock,
    isIncreasing,
    endEmission,
    gradientE24,
    endBlock
  ) => {
    let blocknum = ethers.BigNumber.from(blocknumber.toString())
    const startBlockBN = ethers.BigNumber.from(startBlock.toString())
    const endEmissionBN = ethers.BigNumber.from(endEmission.toString())
    const gradientE24BN = ethers.BigNumber.from(gradientE24.toString())
    const endBlockBN = ethers.BigNumber.from(endBlock.toString())

    if (blocknum.lte(startBlockBN)) blocknum = startBlockBN
  
    if (blocknum.gte(endBlock)) return endEmissionBN
  
    if (gradientE24.isZero()) return ethers.BigNumber.from(0)
    let currentArcadiumEmission = endEmissionBN
    const deltaHeight = gradientE24BN.mul(endBlockBN.sub(blocknum)).div(ethers.BigNumber.from('10').pow(24))
  
    if (isIncreasing) currentArcadiumEmission = endEmissionBN.sub(deltaHeight)
    else currentArcadiumEmission = endEmissionBN.add(deltaHeight)
  
    if (isIncreasing)
      currentArcadiumEmission = currentArcadiumEmission.gte(endEmissionBN) ? endEmissionBN : currentArcadiumEmission
    else currentArcadiumEmission = currentArcadiumEmission.lte(endEmissionBN) ? endEmissionBN : currentArcadiumEmission
  
    return currentArcadiumEmission
  }
  
  async function main() {

      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");
  
      const CZD_ADDR = "0x6664C64C8582e62dA861Fcac33a627b0f92fF0F8";
      const MCHEF_ADDR = "0x767580F1B2aF12b7267cE33Ba2678addA7388403";
      const rewardTokenTicker1 = "DARK";
      const rewardTokenTicker2 = "CZDIAMOND";
      const rewardTokenTicker3 = "USDC";
  
      const CZD = new ethers.Contract(CZD_ADDR, CZD_ABI, App.provider);
      const MCHEF = new ethers.Contract(MCHEF_ADDR, MCHEF_ABI, App.provider);
  
      const usdcDripRate = await CZD.getUSDCDripRate()

      const startBlock = await MCHEF.startBlock();

      const currentBlock = await App.provider.getBlockNumber();
  
      let darkRelease = 0
  
      const isIncreasing = await MCHEF.isIncreasingGradient();
      const endGoalDarkEmission = await MCHEF.endGoalDarksideEmission();
      const darkReleaseGradient = await MCHEF.darksideReleaseGradient();
      const endDarkGradientBlock = await MCHEF.endDarksideGradientBlock();

      darkRelease = getDarkRelease(currentBlock, startBlock, isIncreasing, endGoalDarkEmission, darkReleaseGradient, endDarkGradientBlock)

      const rewardsPerWeek1 = darkRelease.mul(604800).div(2)

      const numberOfHalvings = Math.floor(((currentBlock - startBlock) / 1250000))

      const czdReleaseRate = numberOfHalvings == 0 ? 0.016534 : 0.016534 / (2 * numberOfHalvings)
  
      const rewardsPerWeek2 = czdReleaseRate * 604800 / 2;
  
   
      const rewardsPerWeek3 = (usdcDripRate *
              604800 / 2);
 
  
      const tokens = {};
      const prices = await getMaticPrices();
  
      await loadDarksideFinanceContract(App, tokens, prices, MCHEF, MCHEF_ADDR, MCHEF_ABI, rewardTokenTicker1, rewardTokenTicker2, rewardTokenTicker3,
          "darkside", "CZDiamond", "usdcCurrencyAddress", rewardsPerWeek1, rewardsPerWeek2, rewardsPerWeek3, "pendingDarkside", "pendingCZDiamond", "pendingUSDC");
  
      hideLoading();
  }
  
  async function loadDarksideFinanceContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker1, rewardTokenTicker2, rewardTokenTicker3,
    rewardTokenFunction1, rewardTokenFunction2, rewardTokenFunction3, rewardsPerWeekFixed1, rewardsPerWeekFixed2, rewardsPerWeekFixed3, pendingRewardsFunction1, pendingRewardsFunction2, pendingRewardsFunction3) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
 
    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();
 
    _print(`Found ${poolCount} pools.\n`)
 
    _print(`Showing incentivized pools only.\n`);
 
    var tokens = {};
 
    const rewardTokenAddress1 = await chefContract.callStatic[rewardTokenFunction1]();
    const rewardsPerWeek1 = rewardsPerWeekFixed1

    const rewardTokenAddress2 = await chefContract.callStatic[rewardTokenFunction2]();
    const rewardsPerWeek2 = rewardsPerWeekFixed2

    const rewardTokenAddress3 = await chefContract.callStatic[rewardTokenFunction3]();
    const rewardsPerWeek3 = rewardsPerWeekFixed3

    const poolInfos1 = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getMaticPoolInfoSkipNFTs(App, chefContract, chefAddress, x, pendingRewardsFunction1)));

    const poolInfos2 = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getMaticPoolInfoSkipNFTs(App, chefContract, chefAddress, x, pendingRewardsFunction2)));

    const poolInfo3 = await chefContract.callStatic[pendingRewardsFunction3](App.YOUR_ADDRESS);
  
    var tokenAddresses = [].concat.apply([], poolInfos1.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  
    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getMaticToken(App, address, chefAddress);
    }));
  
    _print(`Showing incentivized pools only6.\n`);
    //first pass is just to populate prices
    poolInfos1.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);

    const poolPrices = poolInfos1.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);
  
    _print("Finished reading smart contracts.\n");
  
    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const aprList = printDarksideFinancePool(App, chefAbi, chefAddress, prices, tokens, poolInfos1[i], poolInfos2[i], poolInfo3, i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek1, rewardsPerWeek2, rewardsPerWeek3, rewardTokenTicker1, rewardTokenTicker2, rewardTokenTicker3,
          rewardTokenAddress1, rewardTokenAddress2, rewardTokenAddress3,
          null, null, "matic", poolInfos1[i].depositFee, poolInfos1[i].withdrawFee, poolInfos1[0].allocPoints)
        aprs.push(aprList);
      }
    }
    let totalUserStaked=0, totalStaked=0, averageApr=0;
    for (const a of aprs) {
      if (!isNaN(a[0].totalStakedUsd)) {
        totalStaked += a[0].totalStakedUsd;
      }
      if (a.userStakedUsd > 0) {
        totalUserStaked += a[0].userStakedUsd;
        averageApr += a[0].userStakedUsd * ((a[0] != null ? a[0].yearlyAPR : 0) + (a[1] != null ? a[1].yearlyAPR : 0) + (a[2] != null ? a[2].yearlyAPR : 0)) / 100;
      }
    }
    averageApr = averageApr / totalUserStaked;
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    if (totalUserStaked > 0) {
      _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
      _print(`Estimated earnings:`
          + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
          + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
          + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
    }
    return { prices, totalUserStaked, totalStaked, averageApr }
  }
  
  function printDarksideFinancePool(App, chefAbi, chefAddr, prices, tokens, poolInfo1, poolInfo2, poolInfo3, poolIndex, poolPrices,
                         totalAllocPoints, rewardsPerWeek1, rewardsPerWeek2, rewardsPerWeek3,
                         rewardTokenTicker1, rewardTokenTicker2, rewardTokenTicker3,
                         rewardTokenAddress1, rewardTokenAddress2, rewardTokenAddress3,
                         fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0, myFriendsPoints) {
    fixedDecimals = fixedDecimals ?? 2;
    const sp = (poolInfo1.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo1.stakedToken, chain);
    
    const poolRewardsPerWeek1 = (poolInfo1.allocPoints.toNumber() / totalAllocPoints.toNumber()) * (rewardsPerWeek1.div(ethers.BigNumber.from(10).pow(12)).toNumber() / 1000000);
    const poolRewardsPerWeek2 = (totalAllocPoints.toNumber() > myFriendsPoints.toNumber()) ? rewardsPerWeek2 * (poolInfo1.allocPoints.toNumber() / (totalAllocPoints.toNumber() - myFriendsPoints.toNumber())) : 0
    const poolRewardsPerWeek3 = rewardsPerWeek3;

    if (poolRewardsPerWeek1 == 0 && rewardsPerWeek1 != 0 && poolRewardsPerWeek2 == 0 && rewardsPerWeek2 != 0 && poolRewardsPerWeek3 == 0 && rewardsPerWeek3 != 0) return;

    const userStaked = poolInfo1.userLPStaked ?? poolInfo1.userStaked;
    const rewardPrice1 = getParameterCaseInsensitive(prices, rewardTokenAddress1)?.usd;
    const rewardPrice2 = getParameterCaseInsensitive(prices, rewardTokenAddress2)?.usd;
    const rewardPrice3 = getParameterCaseInsensitive(prices, rewardTokenAddress3)?.usd;
  

    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    _print_inline(`${poolIndex} - `);
    poolPrices.print_price(chain);
    sp?.print_price(chain);
  
    const apr1 = printAPR(rewardTokenTicker1, rewardPrice1, poolRewardsPerWeek1, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  
    const apr2 = (poolIndex !== 0) ? printAPR(rewardTokenTicker2, rewardPrice2, poolRewardsPerWeek2, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals) : null
    const apr3 = (poolIndex === 0) ?  printAPR(rewardTokenTicker3, rewardPrice3, poolRewardsPerWeek3 / 1000000, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals) : null
  
    if (poolInfo1.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo1.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printDarksideFinanceContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo1.address,
      rewardTokenTicker1, rewardTokenTicker2, rewardTokenTicker3, poolPrices.stakeTokenTicker, poolInfo1.poolToken.unstaked,
      poolInfo1.userStaked, poolInfo1.pendingRewardTokens, poolInfo2.pendingRewardTokens, poolInfo3.pendingRewardTokens, fixedDecimals,
      claimFunction, rewardPrice1, rewardPrice2, rewardPrice3, chain, depositFee, withdrawFee);
    return [apr1, apr2, apr3];
  }
  
  
  function printDarksideFinanceContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress,
      rewardTokenTicker1, rewardTokenTicker2, rewardTokenTicker3, stakeTokenTicker, unstaked,
      userStaked, pendingRewardTokens1, pendingRewardTokens2, pendingRewardTokens3, fixedDecimals,
      claimFunction, rewardTokenPrice1, rewardTokenPrice2, rewardTokenPrice3, chain, depositFee, withdrawFee) {
    fixedDecimals = fixedDecimals ?? 2;
    const approveAndStake = async function() {
      return darksideFinanceContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
    }
    const unstake = async function() {
      return darksideFinanceContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardTokens1)
    }
    const claim = async function() {
      if (pendingRewardTokens1 > 0 || pendingRewardTokens2 > 0 || pendingRewardTokens3 > 0)
        return darksideFinanceContract_claim(chefAbi, chefAddr, poolIndex, App, claimFunction)
    }
    if(depositFee > 0){
      _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
    }else{
      _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
    }
    if(withdrawFee > 0){
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
    }else{
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
    }
    if (pendingRewardTokens1 > 0)
      _print_link(`Claim ${pendingRewardTokens1.toFixed(fixedDecimals)} ${rewardTokenTicker1} ($${formatMoney(pendingRewardTokens1*rewardTokenPrice1)})`, claim)
    if (pendingRewardTokens2 > 0)
      _print_link(`Claim ${pendingRewardTokens2.toFixed(fixedDecimals)} ${rewardTokenTicker2} ($${formatMoney(pendingRewardTokens2*rewardTokenPrice2)})`, claim)
    if (pendingRewardTokens3 > 0)
      _print_link(`Claim ${pendingRewardTokens3.toFixed(fixedDecimals)} ${rewardTokenTicker3} ($${formatMoney(pendingRewardTokens3*rewardTokenPrice3)})`, claim)
    if (pendingRewardTokens1 === 0 && pendingRewardTokens2 === 0 && pendingRewardTokens3 === 0)
      _print(`No pending rewards at the moment!`)
    _print(`Staking or unstaking also claims rewards.`)
    _print("");
  }
  
  const darksideFinanceContract_unstake = async function(chefAbi, chefAddress, poolIndex, App) {
    const signer = App.provider.getSigner()
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
  
    showLoading()
    CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
  
  const darksideFinanceContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
    const signer = App.provider.getSigner()
  
    const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  
    const refAddress = "0x0000000000000000000000000000000000000000"
  
    let allow = Promise.resolve()
  
    if (allowedTokens / 1e18 < currentTokens / 1e18) {
      showLoading()
      allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }
  
    if (currentTokens / 1e18 > 0) {
      showLoading()
      allow
        .then(async function() {
            CHEF_CONTRACT.deposit(poolIndex, currentTokens, refAddress, false, {gasLimit: 500000})
            .then(function(t) {
              App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
              })
            })
            .catch(function() {
              hideLoading()
              _print('Something went wrong.')
            })
        })
        .catch(function() {
          hideLoading()
          _print('Something went wrong.')
        })
    } else {
      alert('You have no tokens to stake!!')
    }
  }
  
  const darksideFinanceContract_claim = async function(chefAbi, chefAddress, poolIndex, App, claimFunction) {
    const signer = App.provider.getSigner()
  
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    const refAddress = "0x0000000000000000000000000000000000000000"
  
      showLoading()
      if (claimFunction) {
        claimFunction(poolIndex, {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
      }
      else {
        CHEF_CONTRACT.deposit(poolIndex, 0, true, refAddress, {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
      }
  }

  async function getMaticPoolInfoSkipNFTs(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {  
    const poolInfo = await chefContract.poolInfo(poolIndex);  
    if (poolInfo.allocPoint == 0 || poolInfo.tokenType == 2) {
      return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
      };
    }
    const poolToken = await getMaticToken(app, poolInfo.lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
        withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
    };
  }