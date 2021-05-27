
$(function () {
    consoleInit(main)
});

const BASE_ERC20_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name_",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol_",
                "type": "string"
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
    }
]

const POOL_ABI = [
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
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount1",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "Burn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount1",
                "type": "uint256"
            }
        ],
        "name": "Mint",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0In",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount1In",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0Out",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount1Out",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "Swap",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint112",
                "name": "reserve0",
                "type": "uint112"
            },
            {
                "indexed": false,
                "internalType": "uint112",
                "name": "reserve1",
                "type": "uint112"
            }
        ],
        "name": "Sync",
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
        "constant": true,
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "MINIMUM_LIQUIDITY",
        "outputs": [
            {
                "internalType": "uint256",
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
        "name": "PERMIT_TYPEHASH",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
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
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
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
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
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
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
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
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount0",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount1",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "factory",
        "outputs": [
            {
                "internalType": "address",
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
        "name": "getReserves",
        "outputs": [
            {
                "internalType": "uint112",
                "name": "_reserve0",
                "type": "uint112"
            },
            {
                "internalType": "uint112",
                "name": "_reserve1",
                "type": "uint112"
            },
            {
                "internalType": "uint32",
                "name": "_blockTimestampLast",
                "type": "uint32"
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
                "internalType": "address",
                "name": "_token0",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_token1",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "kLast",
        "outputs": [
            {
                "internalType": "uint256",
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
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "mint",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
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
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "nonces",
        "outputs": [
            {
                "internalType": "uint256",
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
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "permit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "price0CumulativeLast",
        "outputs": [
            {
                "internalType": "uint256",
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
        "name": "price1CumulativeLast",
        "outputs": [
            {
                "internalType": "uint256",
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
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "skim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount0Out",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount1Out",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "swap",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "sync",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "token0",
        "outputs": [
            {
                "internalType": "address",
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
        "name": "token1",
        "outputs": [
            {
                "internalType": "address",
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
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
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
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
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
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
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
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const FARM_ABI = [
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
        "name": "Withdraw",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "emergencyWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "farmInfo",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "lpToken",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "rewardToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "startBlock",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "blockReward",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "bonusEndBlock",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "bonus",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endBlock",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastRewardBlock",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "accRewardPerShare",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "farmableSupply",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "numFarmers",
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
                "name": "_from_block",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_to",
                "type": "uint256"
            }
        ],
        "name": "getMultiplier",
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
                "internalType": "contract IERC20",
                "name": "_rewardToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "contract IERC20",
                "name": "_lpToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_blockReward",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_startBlock",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_endBlock",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_bonusEndBlock",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_bonus",
                "type": "uint256"
            }
        ],
        "name": "init",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "pendingReward",
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
        "name": "updatePool",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "userInfo",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rewardDebt",
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
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const base_tokens_addresses = [
    "0x874e178A2f3f3F9d34db862453Cd756E7eAb0381", //GFI
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // USDC
    "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" //WETH
]

const pool_addresses = ["nothing", // These are where ppl add liquidity
    "0xb1f3555A7c3753AB4E6DF1d66CFDB25477a36Ce7", // GFI/USDC
    "0x1587663E8F475E69eA2DBb38482C8c4EE9F388Fb" // GFI/WETH
]

const farm_addresses = ["0xFa56a0f01863c034b55e904C9c39213E44D92Af7", //GFI
    "0xE6584E2432ef0b82A39C383e895E7e031655F2Bf", // GFI/USDC
    "0xEf943A1B9A5E697Eb26B1cfc5e9225D2Aa00395a" // GFI/WETH
] //array of farming contracts, 1 contract per farm */


async function main() {

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const prices = await getMaticPrices();
    await loadFarmDetails(App, farm_addresses[0], pool_addresses[1], base_tokens_addresses[0], 0, BASE_ERC20_ABI, FARM_ABI, 6, prices);
    await loadFarmDetails(App, farm_addresses[1], pool_addresses[1], base_tokens_addresses[0], base_tokens_addresses[1], BASE_ERC20_ABI, FARM_ABI, 6, prices);
    await loadFarmDetails(App, farm_addresses[2], pool_addresses[2], base_tokens_addresses[0], base_tokens_addresses[2], BASE_ERC20_ABI, FARM_ABI, 18, prices);
    hideLoading();
}

async function loadFarmDetails(App, farmAddress, poolAddress, aTokenAddress, bTokenAddress, ERC20ABI, FARMABI, Bzereos, prices) {

    const unstake = async function () {
        return token_unstake(FARM_ABI, farmAddress, App, "pendingReward")
    }

    const claim = async function () {
        return token_claim(FARM_ABI, farmAddress, App, "pendingReward")
    }

    const ATOKEN_CONTRACT = new ethers.Contract(aTokenAddress, ERC20ABI, App.provider); //GFI
    const FARM_CONTRACT = new ethers.Contract(farmAddress, FARMABI, App.provider);
    let farmInfo = await FARM_CONTRACT.farmInfo();
    const uSymbol = await ATOKEN_CONTRACT.symbol();
    if (bTokenAddress != 0) {
        const BTOKEN_CONTRACT = new ethers.Contract(bTokenAddress, ERC20ABI, App.provider); //Other
        const underlyingPrice = getParameterCaseInsensitive(prices, bTokenAddress)?.usd;

        const LP_TOKEN = new ethers.Contract(farmInfo["lpToken"], ERC20ABI, App.provider);
        let lpTokenAddress = LP_TOKEN.address;

        const otherSymbol = await BTOKEN_CONTRACT.symbol();
        let reservesA = await ATOKEN_CONTRACT.balanceOf(poolAddress) / 10 ** 18;
        let reservesB = await BTOKEN_CONTRACT.balanceOf(poolAddress) / 10 ** Bzereos;
        let GFIprice = reservesB / reservesA;
        let poolLiquidity = (reservesB + (reservesA * GFIprice)) * underlyingPrice;


        _print_bold(`${uSymbol}-${otherSymbol}`)
        _print(`${uSymbol} (${Number(GFIprice).toFixed(8)})[${otherSymbol}]`);
        _print(`Liquidity in Pool: $${formatMoney(poolLiquidity)}`);
        get_pool_APR(App, reservesA * 10 ** 18, farmInfo, ERC20ABI, farmAddress);

        const approveAndStake = async function () {
            return token_stake(FARM_ABI, farmAddress, lpTokenAddress, App)
        }

        _print_link(`Deposit ${uSymbol}-${otherSymbol}`, approveAndStake)
        _print_link(`Withdraw ${uSymbol}-${otherSymbol}`, unstake)
        _print_link(`Harvest ${uSymbol}`, claim)
    }
    else {
        let GFI_balance_farm = await ATOKEN_CONTRACT.balanceOf(farmAddress);
        var startFarmBlock = farmInfo["startBlock"];
        var blockNumber = await App.provider.getBlockNumber();
        let reservesA = (GFI_balance_farm - 100e6 * 1e18 + (blockNumber - startFarmBlock) * blockNumber) / 1e18;
        _print_bold(`${uSymbol}`);
        _print(`Liquidity in Pool: ${formatMoney(reservesA)}[${uSymbol}]`);
        get_APR_GFI_pool(App, GFI_balance_farm, farmInfo);

        const approveAndStake = async function () {
            return token_stake(FARM_ABI, farmAddress, aTokenAddress, App)
        }

        _print_link(`Deposit ${uSymbol}`, approveAndStake)
        _print_link(`Withdraw ${uSymbol}`, unstake)
        _print_link(`Harvest ${uSymbol}`, claim)
    }

}

const token_stake = async function (farmAbi, farmAddress, stakeTokenAddr, App) {
    const signer = App.provider.getSigner()

    const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
    const FARM_CONTRACT = new ethers.Contract(farmAddress, farmAbi, signer)

    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, farmAddress)

    let allow = Promise.resolve()

    if (allowedTokens / 1e18 < currentTokens / 1e18) {
        showLoading()
        allow = STAKING_TOKEN.approve(farmAddress, ethers.constants.MaxUint256)
            .then(function (t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function () {
                hideLoading()
                alert('Try resetting your approval to 0 first')
            })
    }

    if (currentTokens / 1e18 > 0) {
        showLoading()
        allow
            .then(async function () {
                FARM_CONTRACT.deposit(currentTokens, { gasLimit: 500000 })
                    .then(function (t) {
                        App.provider.waitForTransaction(t.hash).then(function () {
                            hideLoading()
                        })
                    })
                    .catch(function () {
                        hideLoading()
                        _print('Something went wrong.')
                    })
            })
            .catch(function () {
                hideLoading()
                _print('Something went wrong.')
            })
    } else {
        alert('You have no tokens to stake!!')
    }
}

const token_unstake = async function (farmAbi, farmAddress, App, pendingRewardsFunction) { // pass in "pendingReward" for pendingRewardsFunction
    const signer = App.provider.getSigner()
    const FARM_CONTRACT = new ethers.Contract(farmAddress, farmAbi, signer)

    const currentStakedAmount = (await FARM_CONTRACT.userInfo(App.YOUR_ADDRESS)).amount
    const earnedTokenAmount = await FARM_CONTRACT.callStatic[pendingRewardsFunction](App.YOUR_ADDRESS) / 1e18

    if (earnedTokenAmount > 0) {
        showLoading()
        FARM_CONTRACT.withdraw(currentStakedAmount, { gasLimit: 500000 })
            .then(function (t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function () {
                hideLoading()
            })
    }
}

const token_claim = async function (farmAbi, farmAddress, App,
    pendingRewardsFunction) {
    const signer = App.provider.getSigner()

    const FARM_CONTRACT = new ethers.Contract(farmAddress, farmAbi, signer)

    const earnedTokenAmount = await FARM_CONTRACT.callStatic[pendingRewardsFunction](App.YOUR_ADDRESS) / 1e18

    if (earnedTokenAmount > 0) {
        showLoading()
        FARM_CONTRACT.deposit(0, { gasLimit: 500000 })
            .then(function (t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function () {
                hideLoading()
            })
    }
}

async function get_pool_APR(App, GFI_in_pool, farm_info, ERC20ABI, farm_address) {
    const blocks_per_year = 1.5019e7;

    const LP_TOKEN = new ethers.Contract(farm_info["lpToken"], ERC20ABI, App.provider);
    var farm_LP_balance = await LP_TOKEN.balanceOf(farm_address); //Get the amount of LP tokens in the farm

    var totalLPSupply = await LP_TOKEN.totalSupply(); // Is this the total supply of LP tokens for a specific pool?

    var farm_GFI_worth = farm_LP_balance * GFI_in_pool * 2 / totalLPSupply //fraction of LP supply that is in the farming contract x2 is GFI worth of LP tokens in farm

    var blockReward = farm_info["blockReward"];

    var blockNumber = await App.provider.getBlockNumber();

    if (blockNumber <= 14998366) {
        var APR = blockReward * blocks_per_year / farm_GFI_worth * 100 * 2; //bonus time
    } else {
        var APR = blockReward * blocks_per_year / farm_GFI_worth * 100; //blockreward * blocks_per_year = total GFI rewarded in 1 year. Divide by total staked worth * 100 to get APR in %
    }

    var final_APR = Number(APR).toFixed(2).toString();
    _print(`APR: ${final_APR}%`);
    _print("\n");
}

async function get_APR_GFI_pool(App, GFI_in_farm, farm_info) {
    const blocks_per_year = 1.5019e7;

    var startFarmBlock = farm_info["startBlock"];
    var blockReward = farm_info["blockReward"];
    var blockNumber = await App.provider.getBlockNumber();

    var total_GFI_staked = GFI_in_farm - 100e6 * 1e18 + (blockNumber - startFarmBlock) * blockNumber

    APR = blockReward * blocks_per_year / total_GFI_staked * 100 / 10;

    var final_APR = Number(APR).toFixed(2).toString();
    _print(`APR: ${final_APR}%`);
    _print("\n");
}