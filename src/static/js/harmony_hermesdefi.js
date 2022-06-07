
$(function() {
consoleInit(main)
  });

const HERMESDEFI_CHEF_ABI = [
    {
        "inputs": [
            {
                "type": "address",
                "internalType": "contract IHermesToken",
                "name": "_hermes"
            },
            {
                "internalType": "address",
                "name": "_devAddr",
                "type": "address"
            },
            {
                "type": "address",
                "internalType": "address",
                "name": "_treasuryAddr"
            },
            {
                "internalType": "address",
                "name": "_investorAddr",
                "type": "address"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_hermesPerSec"
            },
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "_startTimestamp"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_devPercent"
            },
            {
                "type": "uint256",
                "name": "_treasuryPercent",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_investorPercent"
            }
        ],
        "type": "constructor",
        "stateMutability": "nonpayable"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "name": "pid",
                "type": "uint256",
                "internalType": "uint256",
                "indexed": true
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "allocPoint",
                "indexed": false
            },
            {
                "indexed": true,
                "internalType": "contract IERC20",
                "name": "lpToken",
                "type": "address"
            },
            {
                "internalType": "contract IRewarder",
                "indexed": true,
                "type": "address",
                "name": "rewarder"
            }
        ],
        "type": "event",
        "name": "Add"
    },
    {
        "type": "event",
        "name": "Deposit",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "user",
                "indexed": true
            },
            {
                "internalType": "uint256",
                "indexed": true,
                "name": "pid",
                "type": "uint256"
            },
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256",
                "indexed": false
            }
        ],
        "anonymous": false
    },
    {
        "name": "EmergencyWithdraw",
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "indexed": true,
                "type": "address"
            },
            {
                "type": "uint256",
                "name": "pid",
                "internalType": "uint256",
                "indexed": true
            },
            {
                "indexed": false,
                "name": "amount",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "name": "Harvest",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "pid",
                "type": "uint256",
                "internalType": "uint256",
                "indexed": true
            },
            {
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256",
                "name": "amount"
            }
        ],
        "type": "event",
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OnBlockDeltaEndStageChanged",
        "anonymous": false,
        "inputs": [
            {
                "name": "_blockEnds",
                "type": "uint256[]",
                "indexed": true,
                "internalType": "uint256[]"
            }
        ]
    },
    {
        "inputs": [
            {
                "type": "uint256[]",
                "indexed": true,
                "name": "_blockStarts",
                "internalType": "uint256[]"
            }
        ],
        "anonymous": false,
        "type": "event",
        "name": "OnBlockDeltaStartStageChanged"
    },
    {
        "name": "OnDevFeeStageChanged",
        "anonymous": false,
        "type": "event",
        "inputs": [
            {
                "indexed": true,
                "type": "uint256[]",
                "internalType": "uint256[]",
                "name": "_devFees"
            }
        ]
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "indexed": true,
                "name": "_newPercent"
            }
        ],
        "type": "event",
        "name": "OnDevPercentChanged"
    },
    {
        "inputs": [
            {
                "type": "address",
                "indexed": true,
                "name": "_investorAddr",
                "internalType": "address"
            }
        ],
        "type": "event",
        "anonymous": false,
        "name": "OnInvestorAddrChanged"
    },
    {
        "anonymous": false,
        "type": "event",
        "name": "OnInvestorPercentChanged",
        "inputs": [
            {
                "type": "uint256",
                "name": "_newInvestorPercent",
                "indexed": true,
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "internalType": "address",
                "indexed": true,
                "type": "address",
                "name": "_treasuryAddr"
            }
        ],
        "name": "OnTreasuryAddrChanged"
    },
    {
        "name": "OnTreasuryPercentChanged",
        "anonymous": false,
        "inputs": [
            {
                "name": "_newPercent",
                "indexed": true,
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "type": "event"
    },
    {
        "inputs": [
            {
                "type": "uint256[]",
                "indexed": true,
                "name": "_userFees",
                "internalType": "uint256[]"
            }
        ],
        "name": "OnUserFeeStageChanged",
        "anonymous": false,
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": "previousOwner",
                "indexed": true
            },
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address",
                "indexed": true
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "name": "Set",
        "anonymous": false,
        "type": "event",
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "pid",
                "indexed": true
            },
            {
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256",
                "name": "allocPoint"
            },
            {
                "internalType": "contract IRewarder",
                "name": "rewarder",
                "indexed": true,
                "type": "address"
            },
            {
                "name": "overwrite",
                "type": "bool",
                "internalType": "bool",
                "indexed": false
            }
        ]
    },
    {
        "anonymous": false,
        "type": "event",
        "name": "SetDevAddress",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "indexed": true,
                "name": "oldAddress"
            },
            {
                "internalType": "address",
                "name": "newAddress",
                "type": "address",
                "indexed": true
            }
        ]
    },
    {
        "name": "UpdateEmissionRate",
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "indexed": true,
                "type": "address"
            },
            {
                "indexed": false,
                "type": "uint256",
                "internalType": "uint256",
                "name": "_hermesPerSec"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "pid",
                "type": "uint256",
                "indexed": true
            },
            {
                "internalType": "uint256",
                "name": "lastRewardTimestamp",
                "type": "uint256",
                "indexed": false
            },
            {
                "name": "lpSupply",
                "indexed": false,
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "accHermesPerShare",
                "type": "uint256",
                "indexed": false
            }
        ],
        "name": "UpdatePool",
        "type": "event",
        "anonymous": false
    },
    {
        "name": "Withdraw",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "internalType": "uint256",
                "name": "pid",
                "type": "uint256",
                "indexed": true
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
                "indexed": false
            }
        ],
        "type": "event",
        "anonymous": false
    },
    {
        "anonymous": false,
        "name": "hermesTransfer",
        "inputs": [
            {
                "type": "address",
                "name": "to",
                "indexed": false,
                "internalType": "address"
            },
            {
                "internalType": "uint256",
                "indexed": false,
                "name": "request",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "sent",
                "indexed": false,
                "type": "uint256"
            }
        ],
        "type": "event"
    },
    {
        "type": "function",
        "stateMutability": "view",
        "inputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "blockDeltaEndStage"
    },
    {
        "type": "function",
        "inputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "name": "blockDeltaStartStage"
    },
    {
        "name": "devAddr",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "constant": true,
        "signature": "0xda09c72c"
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "type": "function",
        "name": "devFeeStage",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "name": "devPercent",
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "constant": true,
        "signature": "0xfc3c28af"
    },
    {
        "type": "function",
        "name": "hermes",
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "internalType": "contract IHermesToken",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "constant": true,
        "signature": "0xd8092c92"
    },
    {
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "type": "function",
        "stateMutability": "view",
        "name": "hermesPerSec",
        "inputs": [],
        "constant": true,
        "signature": "0xaa3448ab"
    },
    {
        "name": "investorAddr",
        "type": "function",
        "stateMutability": "view",
        "inputs": [],
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "constant": true,
        "signature": "0xacc4cc50"
    },
    {
        "stateMutability": "view",
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "name": "investorPercent",
        "inputs": [],
        "type": "function",
        "constant": true,
        "signature": "0x0735b208"
    },
    {
        "inputs": [],
        "name": "owner",
        "stateMutability": "view",
        "type": "function",
        "outputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": ""
            }
        ],
        "constant": true,
        "signature": "0x8da5cb5b"
    },
    {
        "name": "poolInfo",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "lpToken",
                "type": "address",
                "internalType": "contract IERC20"
            },
            {
                "type": "uint256",
                "name": "allocPoint",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "lastRewardTimestamp"
            },
            {
                "name": "accHermesPerShare",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "type": "address",
                "internalType": "contract IRewarder",
                "name": "rewarder"
            }
        ],
        "type": "function",
        "stateMutability": "view"
    },
    {
        "stateMutability": "nonpayable",
        "inputs": [],
        "outputs": [],
        "type": "function",
        "name": "renounceOwnership"
    },
    {
        "inputs": [],
        "type": "function",
        "name": "startTimestamp",
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "constant": true,
        "signature": "0xe6fd48bc"
    },
    {
        "type": "function",
        "name": "totalAllocPoint",
        "stateMutability": "view",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "constant": true,
        "signature": "0x17caf6f1"
    },
    {
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "outputs": [],
        "type": "function"
    },
    {
        "type": "function",
        "inputs": [],
        "stateMutability": "view",
        "name": "treasuryAddr",
        "outputs": [
            {
                "internalType": "address",
                "type": "address",
                "name": ""
            }
        ],
        "constant": true,
        "signature": "0x30d9a62a"
    },
    {
        "type": "function",
        "inputs": [],
        "name": "treasuryPercent",
        "stateMutability": "view",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "constant": true,
        "signature": "0x04ef9d58"
    },
    {
        "stateMutability": "view",
        "name": "userFeeStage",
        "inputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": ""
            }
        ],
        "type": "function"
    },
    {
        "type": "function",
        "name": "userInfo",
        "inputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": ""
            },
            {
                "type": "address",
                "internalType": "address",
                "name": ""
            }
        ],
        "stateMutability": "view",
        "outputs": [
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "rewardDebt",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "lastWithdrawBlock",
                "internalType": "uint256"
            },
            {
                "name": "firstDepositBlock",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "blockdelta"
            },
            {
                "type": "uint256",
                "name": "lastDepositBlock",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "inputs": [],
        "stateMutability": "view",
        "name": "poolLength",
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "constant": true,
        "signature": "0x081e3eda"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "_allocPoint"
            },
            {
                "type": "address",
                "internalType": "contract IERC20",
                "name": "_lpToken"
            },
            {
                "internalType": "contract IRewarder",
                "name": "_rewarder",
                "type": "address"
            }
        ],
        "name": "add",
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": []
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "_pid",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "_allocPoint",
                "internalType": "uint256"
            },
            {
                "name": "_rewarder",
                "internalType": "contract IRewarder",
                "type": "address"
            },
            {
                "internalType": "bool",
                "type": "bool",
                "name": "overwrite"
            }
        ],
        "name": "set",
        "outputs": []
    },
    {
        "name": "pendingTokens",
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "name": "pendingHermes",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "internalType": "address",
                "name": "bonusTokenAddress"
            },
            {
                "internalType": "string",
                "name": "bonusTokenSymbol",
                "type": "string"
            },
            {
                "type": "uint256",
                "name": "pendingBonusToken",
                "internalType": "uint256"
            }
        ],
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "internalType": "address",
                "name": "_user"
            }
        ]
    },
    {
        "name": "rewarderBonusTokenInfo",
        "type": "function",
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_pid"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "bonusTokenAddress"
            },
            {
                "name": "bonusTokenSymbol",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "massUpdatePools",
        "stateMutability": "nonpayable",
        "type": "function",
        "outputs": [],
        "inputs": []
    },
    {
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_pid"
            }
        ],
        "stateMutability": "nonpayable",
        "name": "updatePool",
        "outputs": [],
        "type": "function"
    },
    {
        "name": "deposit",
        "type": "function",
        "inputs": [
            {
                "internalType": "uint256",
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_amount"
            }
        ],
        "stateMutability": "nonpayable",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "name": "_pid",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "type": "function",
        "name": "withdraw",
        "outputs": []
    },
    {
        "name": "userDelta",
        "type": "function",
        "stateMutability": "view",
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_pid",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "type": "address",
                "name": "_user"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ]
    },
    {
        "name": "emergencyWithdraw",
        "stateMutability": "nonpayable",
        "outputs": [],
        "type": "function",
        "inputs": [
            {
                "name": "_pid",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "outputs": [],
        "name": "dev",
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "_devAddr"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_newDevPercent"
            }
        ],
        "outputs": [],
        "name": "setDevPercent"
    },
    {
        "outputs": [],
        "inputs": [
            {
                "type": "address",
                "internalType": "address",
                "name": "_treasuryAddr"
            }
        ],
        "type": "function",
        "stateMutability": "nonpayable",
        "name": "setTreasuryAddr"
    },
    {
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_newTreasuryPercent"
            }
        ],
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "setTreasuryPercent",
        "type": "function"
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "outputs": [],
        "name": "setInvestorAddr",
        "inputs": [
            {
                "name": "_investorAddr",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "setInvestorPercent",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "uint256",
                "name": "_newInvestorPercent",
                "internalType": "uint256"
            }
        ],
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "uint256",
                "internalType": "uint256",
                "name": "_hermesPerSec"
            }
        ],
        "name": "updateEmissionRate",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "type": "uint256[]",
                "internalType": "uint256[]",
                "name": "_blockStarts"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "setStageStarts",
        "outputs": []
    },
    {
        "name": "setStageEnds",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "uint256[]",
                "internalType": "uint256[]",
                "name": "_blockEnds"
            }
        ],
        "outputs": [],
        "type": "function"
    }
]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const HERMESDEFI_CHEF_ADDR = "0x62d94f852798a2f352813bd0de2dc32a518ea803";
    const HERMESDEFI_CHEF = new ethers.Contract(HERMESDEFI_CHEF_ADDR, HERMESDEFI_CHEF_ABI, App.provider);

    const rewardTokenTicker = "HRMS";
    const rewardsPerWeek = await HERMESDEFI_CHEF.hermesPerSec() / 1e9 * 604800;

    const tokens = {};
    const prices = await getHarmonyPrices();

    await loadHarmonyChefContract(App, tokens, prices, HERMESDEFI_CHEF, HERMESDEFI_CHEF_ADDR, HERMESDEFI_CHEF_ABI, rewardTokenTicker,
        "hermes", null, rewardsPerWeek, "pendingTokens");

    hideLoading();
  }