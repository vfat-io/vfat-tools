
$(function() {
    consoleInit(main)
      });
    
    const STATIX_CHEF_ABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_allocPoint",
                    "type": "uint256"
                },
                {
                    "internalType": "contract IBEP20",
                    "name": "_lpToken",
                    "type": "address"
                },
                {
                    "internalType": "uint16",
                    "name": "_depositFeeBP",
                    "type": "uint16"
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_pid",
                    "type": "uint256"
                },
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
            "inputs": [
                {
                    "internalType": "contract StatixToken",
                    "name": "_statix",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_devaddr",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_feeAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_StatixPerSecond",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_startBlock",
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
            "inputs": [],
            "name": "massUpdatePools",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
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
                    "internalType": "uint16",
                    "name": "_depositFeeBP",
                    "type": "uint16"
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
                    "internalType": "address",
                    "name": "_devaddr",
                    "type": "address"
                }
            ],
            "name": "setDevAddress",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
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
                    "internalType": "address",
                    "name": "newAddress",
                    "type": "address"
                }
            ],
            "name": "SetDevAddress",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_feeAddress",
                    "type": "address"
                }
            ],
            "name": "setFeeAddress",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
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
                    "internalType": "address",
                    "name": "newAddress",
                    "type": "address"
                }
            ],
            "name": "SetFeeAddress",
            "type": "event"
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
                    "name": "_StatixPerSecond",
                    "type": "uint256"
                }
            ],
            "name": "updateEmissionRate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
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
                    "name": "StatixPerSecond",
                    "type": "uint256"
                }
            ],
            "name": "UpdateEmissionRate",
            "type": "event"
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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "newStartBlock",
                    "type": "uint256"
                }
            ],
            "name": "UpdateStartBlock",
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
                    "internalType": "address",
                    "name": "lpToken",
                    "type": "address"
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
                    "name": "depositFeeBP",
                    "type": "uint256"
                }
            ],
            "name": "addPool",
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
                    "internalType": "address",
                    "name": "lpToken",
                    "type": "address"
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
                    "name": "depositFeeBP",
                    "type": "uint256"
                }
            ],
            "name": "setPool",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_newStartBlock",
                    "type": "uint256"
                }
            ],
            "name": "updateStartBlock",
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
            "inputs": [],
            "name": "devaddr",
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
            "name": "feeAddress",
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
                    "name": "_from",
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
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "MAX_EMISSION_RATE",
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
            "name": "pendingStatix",
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
                    "internalType": "contract IBEP20",
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
                    "internalType": "contract IBEP20",
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
                    "name": "accStatixPerShare",
                    "type": "uint256"
                },
                {
                    "internalType": "uint16",
                    "name": "depositFeeBP",
                    "type": "uint16"
                },
                {
                    "internalType": "uint256",
                    "name": "lpSupply",
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
            "name": "statix",
            "outputs": [
                {
                    "internalType": "contract StatixToken",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "StatixPerSecond",
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
                    "name": "rewardDebt",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    async function main() {
        const App = await init_ethers();
    
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts...\n");
    
       const STATIX_CHEF_ADDR = "0x32EeEd558c72Da99524E3b0176BCcbEd528cDFB2";
       const rewardTokenTicker = "STATIX";
       const STATIX_CHEF = new ethers.Contract(STATIX_CHEF_ADDR, STATIX_CHEF_ABI, App.provider);
    
       const rewardsPerWeek = await STATIX_CHEF.StatixPerSecond() / 1e18 * 604800;
    
        const tokens = {};
        const prices = await getBasePrices();
    
        await loadGeneralChefContract(App, tokens, prices, STATIX_CHEF, STATIX_CHEF_ADDR, STATIX_CHEF_ABI, rewardTokenTicker,
            "statix", null, rewardsPerWeek, "pendingStatix", [], "base");
    
        hideLoading();
      }
