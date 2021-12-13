
$(function() {
    consoleInit(main)
  });

const GMI_CHEF_ABI = [
  {
      "stateMutability": "nonpayable",
      "type": "constructor",
      "inputs": [
          {
              "name": "_wagmi",
              "type": "address",
              "internalType": "contract IWagmiToken"
          },
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_wagmiPerBlock"
          },
          {
              "name": "_startBlock",
              "type": "uint256",
              "internalType": "uint256"
          }
      ]
  },
  {
      "name": "Add",
      "anonymous": false,
      "type": "event",
      "inputs": [
          {
              "indexed": false,
              "internalType": "uint256",
              "type": "uint256",
              "name": "allocPoint"
          },
          {
              "type": "address",
              "indexed": false,
              "name": "lpToken",
              "internalType": "contract IERC20"
          }
      ]
  },
  {
      "anonymous": false,
      "type": "event",
      "name": "Claim",
      "inputs": [
          {
              "name": "user",
              "indexed": true,
              "type": "address",
              "internalType": "address"
          },
          {
              "indexed": true,
              "name": "pid",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "internalType": "uint256",
              "indexed": false,
              "type": "uint256",
              "name": "amount"
          }
      ]
  },
  {
      "name": "Deposit",
      "inputs": [
          {
              "name": "user",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "internalType": "uint256",
              "indexed": true,
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "indexed": false,
              "name": "amount",
              "type": "uint256"
          }
      ],
      "type": "event",
      "anonymous": false
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "type": "address",
              "indexed": true,
              "name": "user"
          },
          {
              "type": "uint256",
              "indexed": true,
              "name": "pid",
              "internalType": "uint256"
          },
          {
              "name": "amount",
              "internalType": "uint256",
              "type": "uint256",
              "indexed": false
          }
      ],
      "name": "EmergencyWithdraw",
      "type": "event",
      "anonymous": false
  },
  {
      "anonymous": false,
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
          {
              "internalType": "address",
              "type": "address",
              "indexed": true,
              "name": "previousOwner"
          },
          {
              "indexed": true,
              "internalType": "address",
              "type": "address",
              "name": "newOwner"
          }
      ]
  },
  {
      "type": "event",
      "name": "Set",
      "anonymous": false,
      "inputs": [
          {
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256",
              "name": "pid"
          },
          {
              "type": "uint256",
              "name": "oldAllocPoint",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "type": "uint256",
              "name": "newAllocPoint",
              "internalType": "uint256",
              "indexed": false
          }
      ]
  },
  {
      "name": "SetWagmiPerBlock",
      "type": "event",
      "anonymous": false,
      "inputs": [
          {
              "name": "oldWagmiPerBlock",
              "internalType": "uint256",
              "type": "uint256",
              "indexed": false
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "type": "uint256",
              "name": "newWagmiPerBlock"
          }
      ]
  },
  {
      "name": "Withdraw",
      "inputs": [
          {
              "internalType": "address",
              "type": "address",
              "indexed": true,
              "name": "user"
          },
          {
              "internalType": "uint256",
              "name": "pid",
              "indexed": true,
              "type": "uint256"
          },
          {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false,
      "type": "event"
  },
  {
      "inputs": [],
      "name": "owner",
      "stateMutability": "view",
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "type": "function",
      "constant": true,
      "signature": "0x8da5cb5b"
  },
  {
      "stateMutability": "view",
      "inputs": [
          {
              "type": "uint256",
              "name": "",
              "internalType": "uint256"
          }
      ],
      "name": "poolInfo",
      "type": "function",
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
              "name": "lastRewardBlock",
              "internalType": "uint256"
          },
          {
              "name": "accWagmiPerShare",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "lpSupply"
          }
      ]
  },
  {
      "stateMutability": "view",
      "name": "startBlock",
      "outputs": [
          {
              "internalType": "uint256",
              "type": "uint256",
              "name": ""
          }
      ],
      "type": "function",
      "inputs": [],
      "constant": true,
      "signature": "0x48cd4cb1"
  },
  {
      "name": "totalAllocPoint",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "internalType": "uint256",
              "type": "uint256"
          }
      ],
      "type": "function",
      "stateMutability": "view",
      "constant": true,
      "signature": "0x17caf6f1"
  },
  {
      "outputs": [],
      "inputs": [
          {
              "type": "address",
              "internalType": "address",
              "name": "newOwner"
          }
      ],
      "type": "function",
      "stateMutability": "nonpayable",
      "name": "transferOwnership"
  },
  {
      "name": "userInfo",
      "stateMutability": "view",
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
          },
          {
              "name": "pendingRewards",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "type": "function",
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "type": "address",
              "internalType": "address",
              "name": ""
          }
      ]
  },
  {
      "name": "wagmi",
      "type": "function",
      "stateMutability": "view",
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IWagmiToken"
          }
      ],
      "inputs": [],
      "constant": true,
      "signature": "0xd7535706"
  },
  {
      "name": "wagmiPerBlock",
      "type": "function",
      "stateMutability": "view",
      "outputs": [
          {
              "internalType": "uint256",
              "type": "uint256",
              "name": ""
          }
      ],
      "inputs": [],
      "constant": true,
      "signature": "0xa2049a72"
  },
  {
      "name": "poolLength",
      "inputs": [],
      "type": "function",
      "stateMutability": "view",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "constant": true,
      "signature": "0x081e3eda"
  },
  {
      "stateMutability": "pure",
      "type": "function",
      "inputs": [
          {
              "name": "_from",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "_to",
              "internalType": "uint256",
              "type": "uint256"
          }
      ],
      "name": "getMultiplier",
      "outputs": [
          {
              "name": "",
              "internalType": "uint256",
              "type": "uint256"
          }
      ]
  },
  {
      "outputs": [],
      "name": "add",
      "type": "function",
      "inputs": [
          {
              "name": "_allocPoint",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "_lpToken",
              "type": "address",
              "internalType": "contract IERC20"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "inputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_pid"
          },
          {
              "name": "_allocPoint",
              "internalType": "uint256",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "outputs": [],
      "type": "function",
      "name": "set"
  },
  {
      "name": "pendingWagmi",
      "type": "function",
      "stateMutability": "view",
      "inputs": [
          {
              "name": "_pid",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "internalType": "address",
              "name": "_user",
              "type": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ]
  },
  {
      "outputs": [],
      "name": "massUpdatePools",
      "type": "function",
      "inputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "stateMutability": "nonpayable",
      "inputs": [
          {
              "name": "_pid",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "type": "function",
      "name": "updatePool"
  },
  {
      "outputs": [],
      "stateMutability": "nonpayable",
      "inputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_pid"
          },
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_amount"
          },
          {
              "name": "_withdrawRewards",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "name": "deposit",
      "type": "function"
  },
  {
      "name": "withdraw",
      "inputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_pid"
          },
          {
              "name": "_amount",
              "internalType": "uint256",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "_withdrawRewards",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function",
      "outputs": []
  },
  {
      "stateMutability": "nonpayable",
      "name": "emergencyWithdraw",
      "type": "function",
      "inputs": [
          {
              "internalType": "uint256",
              "type": "uint256",
              "name": "_pid"
          }
      ],
      "outputs": []
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "type": "uint256",
              "name": "_pid"
          }
      ],
      "name": "claim",
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable"
  },
  {
      "outputs": [],
      "name": "setWagmiPerBlock",
      "type": "function",
      "inputs": [
          {
              "type": "uint256",
              "internalType": "uint256",
              "name": "_wagmiPerBlock"
          }
      ],
      "stateMutability": "nonpayable"
  }
]

async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const GMI_CHEF_ADDR = "0xf046e84439813bb0a26fb26944001c7bb4490771";
   const rewardTokenTicker = "GMI";
   const GMI_CHEF = new ethers.Contract(GMI_CHEF_ADDR, GMI_CHEF_ABI, App.provider);

   
  const blockNumber = await App.provider.getBlockNumber();
  const multiplier = await GMI_CHEF.getMultiplier(blockNumber, blockNumber+1);
  const rewardPerBlock = await GMI_CHEF.wagmiPerBlock();
  const rewardsPerWeek = rewardPerBlock / 1e18 * multiplier * 604800 / 2

    const tokens = {};
    const prices = await getHarmonyPrices();

    await loadHarmonyChefContract(App, tokens, prices, GMI_CHEF, GMI_CHEF_ADDR, GMI_CHEF_ABI, rewardTokenTicker,
        "wagmi", null, rewardsPerWeek, "pendingWagmi", [4,5]);

    hideLoading();  
  }
