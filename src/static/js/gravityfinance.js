
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
        "inputs": [],
        "name": "totalStakedAmount",
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
    "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", //WETH
    "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", //Link
    "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a" //Sushi
]

const pool_addresses = ["nothing", // These are where ppl add liquidity
    "0xb1f3555A7c3753AB4E6DF1d66CFDB25477a36Ce7", // GFI/USDC
    "0x1587663E8F475E69eA2DBb38482C8c4EE9F388Fb" // GFI/WETH
]

const farm_addresses = ["0xf9FBfA8Fd7568D39E1b2091379499B48EA2F4c72", //GFI
    "0xE6584E2432ef0b82A39C383e895E7e031655F2Bf", // GFI/USDC
    "0xEf943A1B9A5E697Eb26B1cfc5e9225D2Aa00395a", // GFI/WETH
    "0x2b1966652Aa0c09a2f34cE3FbeB19d945dEB8FA3", //Link farm
    "0x0Dbe8999Cde32164340411897a7DD73654F82571" //Sushi farm
] //array of farming contracts, 1 contract per farm */


async function main() {

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const prices = await getMaticPrices();

    let FarmVar0 = await loadFarmDetails(App, farm_addresses[1], pool_addresses[1], base_tokens_addresses[0], base_tokens_addresses[1], BASE_ERC20_ABI, FARM_ABI, 6, prices, -1);
    let GFIprice = FarmVar0[0];
    let FarmVar1 = await loadFarmDetails(App, farm_addresses[2], pool_addresses[2], base_tokens_addresses[0], base_tokens_addresses[2], BASE_ERC20_ABI, FARM_ABI, 18, prices, GFIprice);
    let FarmVar2 = await loadFarmDetails(App, farm_addresses[0], pool_addresses[1], base_tokens_addresses[0], 0, BASE_ERC20_ABI, FARM_ABI, 6, prices, GFIprice);
    let FarmVar3 = await loadFarmOtherDetails(App, farm_addresses[4], base_tokens_addresses[0], base_tokens_addresses[4], BASE_ERC20_ABI, FARM_ABI, 18, prices, GFIprice);
    let FarmVar4 = await loadFarmOtherDetails(App, farm_addresses[3], base_tokens_addresses[0], base_tokens_addresses[3], BASE_ERC20_ABI, FARM_ABI, 18, prices, GFIprice);
    let APRavg = (Number(FarmVar0[1]) + Number(FarmVar1[1]) + Number(FarmVar2[1]) + Number(FarmVar3[0]) + Number(FarmVar4[0])) / 5;
    let TVL = FarmVar0[2] + FarmVar1[2] + FarmVar2[2] + FarmVar3[1] + FarmVar4[1]; 
    _print_bold(`Farm Avg. APR Year: ${Number(APRavg).toFixed(2)}%  Total Farm TVL: $${formatMoney(TVL)}`);
    hideLoading();
}

async function loadFarmDetails(App, farmAddress, poolAddress, aTokenAddress, bTokenAddress, ERC20ABI, FARMABI, Bzereos, prices, GFIusdc) {

    const unstake = async function () {
        return token_unstake(FARM_ABI, farmAddress, App, "pendingReward")
    }

    const claim = async function () {
        return token_claim(FARM_ABI, farmAddress, App, "pendingReward")
    }
    let yearAPR;
    let farmTVL;
    const ATOKEN_CONTRACT = new ethers.Contract(aTokenAddress, ERC20ABI, App.provider); //GFI
    const FARM_CONTRACT = new ethers.Contract(farmAddress, FARMABI, App.provider);
    let farmInfo = await FARM_CONTRACT.farmInfo();
    const uSymbol = await ATOKEN_CONTRACT.symbol();
    let userGFIBalance = await ATOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS);
    let GFIprice;
    let userInfo = await FARM_CONTRACT.userInfo(App.YOUR_ADDRESS);
    let userAmount = userInfo["amount"] / 10**18;
    let userReward = await FARM_CONTRACT.pendingReward(App.YOUR_ADDRESS) / 10**18;
    if (bTokenAddress != 0) {

        const BTOKEN_CONTRACT = new ethers.Contract(bTokenAddress, ERC20ABI, App.provider); //Other
        const underlyingPrice = getParameterCaseInsensitive(prices, bTokenAddress)?.usd;

        let LP_TOKEN = new ethers.Contract(farmInfo["lpToken"], ERC20ABI, App.provider);
        let lpTokenAddress = LP_TOKEN.address;
        let LPsymbol = await LP_TOKEN.symbol();

        let LPStakedinFarm = await LP_TOKEN.balanceOf(farmAddress) / 10**18;
        
        const otherSymbol = await BTOKEN_CONTRACT.symbol();
        let reservesA = await ATOKEN_CONTRACT.balanceOf(poolAddress) / 10 ** 18;
        let reservesB = await BTOKEN_CONTRACT.balanceOf(poolAddress) / 10 ** Bzereos;
        GFIprice = reservesB / reservesA;
        let poolTVL = (reservesB + (reservesA * GFIprice)) * underlyingPrice;
        let LPprice = 10**18 * poolTVL / await LP_TOKEN.totalSupply();
        let LPsupply = await LP_TOKEN.totalSupply();
        farmTVL = 10**18 * poolTVL * LPStakedinFarm / LPsupply; 
        var userLPBalance = await LP_TOKEN.balanceOf(App.YOUR_ADDRESS); //Get the amount of LP tokens in the users wallet
        let userShare = 100 * userAmount / LPStakedinFarm;
        let GFIinUSD;
        if (GFIusdc == -1){
            GFIinUSD = GFIprice;
        }
        else{
            GFIinUSD = GFIusdc;
        }

        let LPurl;
        let SWAPurl;
        let ADDurl;
        let SUBurl;
        if (otherSymbol == 'USDC'){
            LPurl = "https://info.quickswap.exchange/pair/0xb1f3555a7c3753ab4e6df1d66cfdb25477a36ce7";
            SWAPurl = "https://quickswap.exchange/#/swap?inputCurrency=0x2791bca1f2de4661ed88a30c99a7a9449aa84174&outputCurrency=0x874e178a2f3f3f9d34db862453cd756e7eab0381";
            ADDurl = "https://quickswap.exchange/#/add/0x2791bca1f2de4661ed88a30c99a7a9449aa84174/0x874e178a2f3f3f9d34db862453cd756e7eab0381";
            SUBurl = "https://quickswap.exchange/#/remove/0x2791bca1f2de4661ed88a30c99a7a9449aa84174/0x874e178a2f3f3f9d34db862453cd756e7eab0381";
        }
        else {
            LPurl = "https://info.quickswap.exchange/pair/0x1587663e8f475e69ea2dbb38482c8c4ee9f388fb";
            SWAPurl = "https://quickswap.exchange/#/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x874e178a2f3f3f9d34db862453cd756e7eab0381";
            ADDurl = "https://quickswap.exchange/#/add/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0x874e178a2f3f3f9d34db862453cd756e7eab0381";
            SUBurl = "https://quickswap.exchange/#/remove/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0x874e178a2f3f3f9d34db862453cd756e7eab0381";
        }

        _print_bold(`<a href='${LPurl}' target='_blank'>${uSymbol}-${otherSymbol} Quick LP</a> <a href='${ADDurl}' target='_blank'>[+]</a> <a href='${SUBurl}' target='_blank'>[-]</a> <a href='${SWAPurl}' target='_blank'>[<=>]</a> Price: $${formatMoney(LPprice)} TVL: $${formatMoney(poolTVL)}`)
        _print(`${uSymbol} Price: $${Number(GFIinUSD).toFixed(4)}`);
        _print(`${otherSymbol} Price: $${formatMoney(underlyingPrice)}`);
        _print(`Total Staked in Farm: ${Number(LPStakedinFarm).toFixed(8)} [${LPsymbol}] ($${formatMoney(farmTVL)})`);
        let GFIperWeek = await get_weekly_emission(farmInfo) / 10**18;
        _print(`GFI Emitted Per Week: ${formatMoney(GFIperWeek)} ($${formatMoney(GFIinUSD * GFIperWeek)})`);

        yearAPR = await get_pool_APR(App, reservesA * 10 ** 18, farmInfo, ERC20ABI, farmAddress);
        let weekAPR = yearAPR / 52;
        let dayAPR = yearAPR / 365;

        _print(`APR: Day ${Number(dayAPR).toFixed(2)}% Week ${Number(weekAPR).toFixed(2)}% Year ${Number(yearAPR).toFixed(2)}%`);
        _print(`You are staking ${Number(userAmount).toFixed(8)} [${uSymbol}-${otherSymbol}] ($${formatMoney(userAmount*LPprice)}), ${Number(userShare).toFixed(4)}% of the pool`);
        let weeklyEarnings = userShare * GFIperWeek / 100;
        let dailyEarnings = weeklyEarnings / 7;
        let yearlyEarnings = weeklyEarnings * 52;
        _print(`Estimated GFI earnings: Day ${Number(dailyEarnings).toFixed(4)} ($${formatMoney(dailyEarnings * GFIinUSD)}) Week ${Number(weeklyEarnings).toFixed(4)} ($${formatMoney(weeklyEarnings * GFIinUSD)}) Year ${Number(yearlyEarnings).toFixed(4)} ($${formatMoney(yearlyEarnings * GFIinUSD)})`);
        const approveAndStake = async function () {
            return token_stake(FARM_ABI, farmAddress, lpTokenAddress, App)
        }
        
        let LPinMain = 10**18 * reservesA * userAmount / LPsupply;
        let LPinOther = 10**18 * reservesB * userAmount / LPsupply;
        _print(`Your LP tokens comprise of ${Number(LPinMain).toFixed(8)} ${uSymbol} + ${Number(LPinOther).toFixed(8)} ${otherSymbol}`);

        _print_link(`Stake ${Number(userLPBalance/10**18).toFixed(8)} [${uSymbol}-${otherSymbol}]`, approveAndStake);
        _print_link(`Unstake ${Number(userAmount).toFixed(8)} [${uSymbol}-${otherSymbol}]`, unstake);
        _print_link(`Claim ${Number(userReward).toFixed(8)} [${uSymbol}]`, claim);
        _print(`Staking or unstaking also claims rewards.\n`);
    }
    else {
        let GFIstakedInFarm = await FARM_CONTRACT.totalStakedAmount() / 10**18;
        let userShare = 100 * userAmount / GFIstakedInFarm;
        farmTVL = GFIstakedInFarm * GFIusdc;
        let url = "https://explorer-mainnet.maticvigil.com/tokens/0x874e178A2f3f3F9d34db862453Cd756E7eAb0381/token-transfers";
        let quickURL = "https://info.quickswap.exchange/token/0x874e178a2f3f3f9d34db862453cd756e7eab0381";
        _print_bold(`<a href='${url}' target='_blank'>${uSymbol}</a> <a href='${quickURL}' target='_blank'>QuickSwap Listing</a> Price: $${Number(GFIusdc).toFixed(4)}`);
        _print(`Staked in Farm: ${formatMoney(GFIstakedInFarm)}[${uSymbol}] ($${formatMoney(farmTVL)})`);
        let GFIperWeek = await get_weekly_emission(farmInfo) / 10**18;
        _print(`GFI Emitted Per Week: ${formatMoney(GFIperWeek)} ($${formatMoney(GFIusdc*GFIperWeek)})`);
        yearAPR = await get_APR_GFI_pool(App, GFIstakedInFarm, farmInfo);
        let weekAPR = yearAPR / 52;
        let dayAPR = yearAPR / 365;
        _print(`APR: Day ${Number(dayAPR).toFixed(2)}% Week ${Number(weekAPR).toFixed(2)}% Year ${Number(yearAPR).toFixed(2)}%`);

        _print(`You are staking ${Number(userAmount).toFixed(8)} [${uSymbol}] ($${formatMoney(userAmount*GFIusdc)}), ${Number(userShare).toFixed(4)}% of the pool`);
        let weeklyEarnings = userShare * GFIperWeek / 100;
        let dailyEarnings = weeklyEarnings / 7;
        let yearlyEarnings = weeklyEarnings * 52;
        _print(`Estimated GFI earnings: Day ${Number(dailyEarnings).toFixed(4)} ($${formatMoney(dailyEarnings * GFIusdc)}) Week ${Number(weeklyEarnings).toFixed(4)} ($${formatMoney(weeklyEarnings * GFIusdc)}) Year ${Number(yearlyEarnings).toFixed(4)} ($${formatMoney(yearlyEarnings * GFIusdc)})`);

        const approveAndStake = async function () {
            return token_stake(FARM_ABI, farmAddress, aTokenAddress, App)
        }
        userGFIBalance = userGFIBalance / 10**18;
        _print_link(`Stake ${Number(userGFIBalance).toFixed(8)} [${uSymbol}]`, approveAndStake);
        _print_link(`Unstake ${Number(userAmount).toFixed(8)} [${uSymbol}]`, unstake);
        _print_link(`Claim ${Number(userReward).toFixed(8)} [${uSymbol}]`, claim);
        _print(`Staking or unstaking also claims rewards.\n`);
    }
    return [GFIprice, yearAPR, farmTVL];
}

async function loadFarmOtherDetails(App, farmAddress, aTokenAddress, bTokenAddress, ERC20ABI, FARMABI, Bzereos, prices, GFIprice) {

    const ATOKEN_CONTRACT = new ethers.Contract(aTokenAddress, ERC20ABI, App.provider); //GFI
    const FARM_CONTRACT = new ethers.Contract(farmAddress, FARMABI, App.provider);
    let farmInfo = await FARM_CONTRACT.farmInfo();
    const uSymbol = await ATOKEN_CONTRACT.symbol();
    const BTOKEN_CONTRACT = new ethers.Contract(bTokenAddress, ERC20ABI, App.provider); //Other
    const underlyingPrice = getParameterCaseInsensitive(prices, bTokenAddress)?.usd;
    let GFI_balance_farm = await ATOKEN_CONTRACT.balanceOf(farmAddress);
    const otherSymbol = await BTOKEN_CONTRACT.symbol();
    let reservesB = await BTOKEN_CONTRACT.balanceOf(farmAddress) / 10 ** Bzereos; //How much of the other asset is in the farm
    let TV_Other = reservesB * underlyingPrice;
    let userInfo = await FARM_CONTRACT.userInfo(App.YOUR_ADDRESS);
    let userAmount = userInfo["amount"] / 10**18;
    let userReward = await FARM_CONTRACT.pendingReward(App.YOUR_ADDRESS) / 10**18;
    let otherTotalSupply = await BTOKEN_CONTRACT.totalSupply() / 10**18;
    let marketCap = underlyingPrice * otherTotalSupply;
    let userShare = 100 * userAmount / reservesB;
    let userOtherBalance = await BTOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS);
    let url;
    if (otherSymbol == 'LINK'){
        url = "https://explorer-mainnet.maticvigil.com/address/0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39/transactions";
    }
    else {
        url = "https://explorer-mainnet.maticvigil.com/address/0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a/transactions";
    }
    _print_bold(`<a href='${url}' target='_blank'>${otherSymbol}</a> Price: $${formatMoney(underlyingPrice)} Market Cap: $${formatMoney(marketCap)}`);
    _print(`Staked in Farm: ${reservesB} [${otherSymbol}] ($${formatMoney(TV_Other)})`);
    let GFIperWeek = await get_weekly_emission(farmInfo) / 10**18;
    _print(`GFI Emitted Per Week: ${formatMoney(GFIperWeek)} ($${formatMoney(GFIprice*GFIperWeek)})`);
    let yearAPR = await get_pool_APR_other_single(App, GFI_balance_farm, farmInfo, ERC20ABI, farmAddress, bTokenAddress, GFIprice, TV_Other);
    let weekAPR = yearAPR / 52;
    let dayAPR = yearAPR / 365;
    _print(`APR: Day ${Number(dayAPR).toFixed(2)}% Week ${Number(weekAPR).toFixed(2)}% Year ${Number(yearAPR).toFixed(2)}%`);
    _print(`You are staking ${Number(userAmount).toFixed(8)} [${otherSymbol}] ($${formatMoney(userAmount*underlyingPrice)}), ${Number(userShare).toFixed(4)}% of the pool`);
    let weeklyEarnings = userShare * GFIperWeek / 100;
    let dailyEarnings = weeklyEarnings / 7;
    let yearlyEarnings = weeklyEarnings * 52;
    _print(`Estimated GFI earnings: Day ${Number(dailyEarnings).toFixed(4)} ($${formatMoney(dailyEarnings * GFIprice)}) Week ${Number(weeklyEarnings).toFixed(4)} ($${formatMoney(weeklyEarnings * GFIprice)}) Year ${Number(yearlyEarnings).toFixed(4)} ($${formatMoney(yearlyEarnings * GFIprice)})`);
    const approveAndStake = async function () {
        return token_stake(FARM_ABI, farmAddress, bTokenAddress, App)
    }

    const unstake = async function () {
        return token_unstake(FARM_ABI, farmAddress, App, "pendingReward");
    }

    const claim = async function () {
        return token_claim(FARM_ABI, farmAddress, App, "pendingReward");
    }

    _print_link(`Stake ${Number(userOtherBalance/10**18).toFixed(8)} [${otherSymbol}]`, approveAndStake);
    _print_link(`Unstake ${Number(userAmount).toFixed(8)} [${otherSymbol}]`, unstake);
    _print_link(`Claim ${Number(userReward).toFixed(8)} [${uSymbol}]`, claim);
    _print(`Staking or unstaking also claims rewards.\n`);
    return [yearAPR, TV_Other];
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

    showLoading()
    FARM_CONTRACT.withdraw(currentStakedAmount, { gasLimit: 500000 })
        .then(function (t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function () {
            hideLoading()
        })

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

async function get_weekly_emission(farm_info) {
    const blocks_in_a_week = 288000;
    var blockReward = farm_info["blockReward"];
    return (blocks_in_a_week * blockReward);
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
    return final_APR;
}

async function get_pool_APR_other_single(App, GFI_in_pool, farm_info, ERC20ABI, farm_address, otherAssetAddress, GFIprice, TV_Other) {
    const blocks_per_year = 1.5019e7;

    var blockReward = farm_info["blockReward"];

    var total_GFI_distributed = blockReward * blocks_per_year ;

    var total_GFI_distributed_USD = total_GFI_distributed * GFIprice / 10**18 ;

    var APR = total_GFI_distributed_USD / TV_Other * 100 ;

    var final_APR = Number(APR).toFixed(2).toString();
    return final_APR;
}

async function get_APR_GFI_pool(App, GFIstakedInFarm, farm_info) {
    const blocks_per_year = 1.5019e7;

    var blockReward = farm_info["blockReward"];

    APR = blockReward * blocks_per_year / GFIstakedInFarm * 100;

    APR = APR / 10**18;
    var final_APR = Number(APR).toFixed(2).toString();
    return final_APR;
}