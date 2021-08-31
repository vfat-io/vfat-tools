$(function () {
  consoleInit(main)
  });
    
  async function main() {
      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");

      const SUSHI_CHEF_ABI = [
        {
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "_sushi",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "name": "Deposit",
            "inputs": [
                {
                    "type": "address",
                    "name": "user",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "indexed": true,
                    "name": "pid",
                    "internalType": "uint256"
                },
                {
                    "internalType": "uint256",
                    "indexed": false,
                    "type": "uint256",
                    "name": "amount"
                },
                {
                    "internalType": "address",
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                }
            ],
            "type": "event"
        },
        {
            "name": "EmergencyWithdraw",
            "anonymous": false,
            "inputs": [
                {
                    "name": "user",
                    "type": "address",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "internalType": "uint256",
                    "indexed": true,
                    "name": "pid",
                    "type": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "amount",
                    "internalType": "uint256",
                    "indexed": false
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address",
                    "indexed": true
                }
            ],
            "type": "event"
        },
        {
            "type": "event",
            "inputs": [
                {
                    "type": "address",
                    "name": "user",
                    "internalType": "address",
                    "indexed": true
                },
                {
                    "indexed": true,
                    "type": "uint256",
                    "internalType": "uint256",
                    "name": "pid"
                },
                {
                    "name": "amount",
                    "indexed": false,
                    "internalType": "uint256",
                    "type": "uint256"
                }
            ],
            "name": "Harvest",
            "anonymous": false
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "type": "uint256",
                    "internalType": "uint256",
                    "indexed": true,
                    "name": "pid"
                },
                {
                    "type": "uint256",
                    "indexed": false,
                    "name": "allocPoint",
                    "internalType": "uint256"
                },
                {
                    "name": "lpToken",
                    "internalType": "contract IERC20",
                    "indexed": true,
                    "type": "address"
                },
                {
                    "name": "rewarder",
                    "indexed": true,
                    "type": "address",
                    "internalType": "contract IRewarder"
                }
            ],
            "type": "event",
            "name": "LogPoolAddition"
        },
        {
            "type": "event",
            "inputs": [
                {
                    "type": "uint256",
                    "indexed": true,
                    "name": "pid",
                    "internalType": "uint256"
                },
                {
                    "name": "allocPoint",
                    "indexed": false,
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "internalType": "contract IRewarder",
                    "indexed": true,
                    "type": "address",
                    "name": "rewarder"
                },
                {
                    "type": "bool",
                    "indexed": false,
                    "name": "overwrite",
                    "internalType": "bool"
                }
            ],
            "name": "LogSetPool",
            "anonymous": false
        },
        {
            "name": "LogSushiPerSecond",
            "inputs": [
                {
                    "name": "sushiPerSecond",
                    "type": "uint256",
                    "internalType": "uint256",
                    "indexed": false
                }
            ],
            "anonymous": false,
            "type": "event"
        },
        {
            "anonymous": false,
            "type": "event",
            "name": "LogUpdatePool",
            "inputs": [
                {
                    "type": "uint256",
                    "internalType": "uint256",
                    "name": "pid",
                    "indexed": true
                },
                {
                    "type": "uint64",
                    "internalType": "uint64",
                    "name": "lastRewardTime",
                    "indexed": false
                },
                {
                    "type": "uint256",
                    "indexed": false,
                    "name": "lpSupply",
                    "internalType": "uint256"
                },
                {
                    "name": "accSushiPerShare",
                    "type": "uint256",
                    "indexed": false,
                    "internalType": "uint256"
                }
            ]
        },
        {
            "name": "OwnershipTransferred",
            "anonymous": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address",
                    "indexed": true
                },
                {
                    "internalType": "address",
                    "type": "address",
                    "indexed": true,
                    "name": "newOwner"
                }
            ],
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "type": "address",
                    "internalType": "address",
                    "name": "user",
                    "indexed": true
                },
                {
                    "type": "uint256",
                    "name": "pid",
                    "indexed": true,
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "name": "amount",
                    "indexed": false,
                    "internalType": "uint256"
                },
                {
                    "internalType": "address",
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "Withdraw",
            "type": "event"
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "SUSHI",
            "inputs": [],
            "outputs": [
                {
                    "type": "address",
                    "internalType": "contract IERC20",
                    "name": ""
                }
            ],
            "constant": true,
            "signature": "0xab560e10"
        },
        {
            "type": "function",
            "outputs": [
                {
                    "type": "bool[]",
                    "name": "successes",
                    "internalType": "bool[]"
                },
                {
                    "type": "bytes[]",
                    "name": "results",
                    "internalType": "bytes[]"
                }
            ],
            "name": "batch",
            "stateMutability": "payable",
            "inputs": [
                {
                    "type": "bytes[]",
                    "name": "calls",
                    "internalType": "bytes[]"
                },
                {
                    "internalType": "bool",
                    "name": "revertOnFail",
                    "type": "bool"
                }
            ]
        },
        {
            "inputs": [],
            "type": "function",
            "stateMutability": "nonpayable",
            "name": "claimOwnership",
            "outputs": []
        },
        {
            "outputs": [
                {
                    "internalType": "contract IERC20",
                    "type": "address",
                    "name": ""
                }
            ],
            "name": "lpToken",
            "stateMutability": "view",
            "inputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "type": "function"
        },
        {
            "stateMutability": "view",
            "type": "function",
            "inputs": [],
            "name": "migrator",
            "outputs": [
                {
                    "type": "address",
                    "internalType": "contract IMigratorChef",
                    "name": ""
                }
            ],
            "constant": true,
            "signature": "0x7cd07e47"
        },
        {
            "outputs": [
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "name": "owner",
            "inputs": [],
            "type": "function",
            "stateMutability": "view",
            "constant": true,
            "signature": "0x8da5cb5b"
        },
        {
            "outputs": [
                {
                    "internalType": "address",
                    "type": "address",
                    "name": ""
                }
            ],
            "name": "pendingOwner",
            "stateMutability": "view",
            "inputs": [],
            "type": "function",
            "constant": true,
            "signature": "0xe30c3978"
        },
        {
            "name": "permitToken",
            "stateMutability": "nonpayable",
            "outputs": [],
            "inputs": [
                {
                    "name": "token",
                    "type": "address",
                    "internalType": "contract IERC20"
                },
                {
                    "name": "from",
                    "type": "address",
                    "internalType": "address"
                },
                {
                    "name": "to",
                    "type": "address",
                    "internalType": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "type": "uint256",
                    "internalType": "uint256",
                    "name": "deadline"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "type": "bytes32",
                    "name": "r"
                },
                {
                    "name": "s",
                    "type": "bytes32",
                    "internalType": "bytes32"
                }
            ],
            "type": "function"
        },
        {
            "stateMutability": "view",
            "type": "function",
            "name": "poolInfo",
            "outputs": [
                {
                    "type": "uint128",
                    "name": "accSushiPerShare",
                    "internalType": "uint128"
                },
                {
                    "type": "uint64",
                    "internalType": "uint64",
                    "name": "lastRewardTime"
                },
                {
                    "type": "uint64",
                    "name": "allocPoint",
                    "internalType": "uint64"
                }
            ],
            "inputs": [
                {
                    "type": "uint256",
                    "name": "",
                    "internalType": "uint256"
                }
            ]
        },
        {
            "name": "rewarder",
            "stateMutability": "view",
            "inputs": [
                {
                    "name": "",
                    "internalType": "uint256",
                    "type": "uint256"
                }
            ],
            "outputs": [
                {
                    "internalType": "contract IRewarder",
                    "name": "",
                    "type": "address"
                }
            ],
            "type": "function"
        },
        {
            "type": "function",
            "inputs": [],
            "stateMutability": "view",
            "outputs": [
                {
                    "internalType": "uint256",
                    "type": "uint256",
                    "name": ""
                }
            ],
            "name": "sushiPerSecond",
            "constant": true,
            "signature": "0xa06e408b"
        },
        {
            "name": "totalAllocPoint",
            "type": "function",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view",
            "inputs": [],
            "constant": true,
            "signature": "0x17caf6f1"
        },
        {
            "type": "function",
            "stateMutability": "nonpayable",
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                },
                {
                    "name": "direct",
                    "internalType": "bool",
                    "type": "bool"
                },
                {
                    "type": "bool",
                    "internalType": "bool",
                    "name": "renounce"
                }
            ],
            "name": "transferOwnership",
            "outputs": []
        },
        {
            "stateMutability": "view",
            "inputs": [
                {
                    "type": "uint256",
                    "internalType": "uint256",
                    "name": ""
                },
                {
                    "type": "address",
                    "name": "",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "type": "uint256",
                    "name": "amount",
                    "internalType": "uint256"
                },
                {
                    "name": "rewardDebt",
                    "internalType": "int256",
                    "type": "int256"
                }
            ],
            "name": "userInfo",
            "type": "function"
        },
        {
            "name": "poolLength",
            "outputs": [
                {
                    "type": "uint256",
                    "internalType": "uint256",
                    "name": "pools"
                }
            ],
            "type": "function",
            "stateMutability": "view",
            "inputs": [],
            "constant": true,
            "signature": "0x081e3eda"
        },
        {
            "outputs": [],
            "stateMutability": "nonpayable",
            "name": "add",
            "inputs": [
                {
                    "name": "allocPoint",
                    "type": "uint256",
                    "internalType": "uint256"
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
            "type": "function"
        },
        {
            "outputs": [],
            "name": "set",
            "type": "function",
            "stateMutability": "nonpayable",
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_pid",
                    "type": "uint256"
                },
                {
                    "name": "_allocPoint",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "_rewarder",
                    "internalType": "contract IRewarder",
                    "type": "address"
                },
                {
                    "type": "bool",
                    "internalType": "bool",
                    "name": "overwrite"
                }
            ]
        },
        {
            "name": "setSushiPerSecond",
            "stateMutability": "nonpayable",
            "type": "function",
            "inputs": [
                {
                    "internalType": "uint256",
                    "type": "uint256",
                    "name": "_sushiPerSecond"
                }
            ],
            "outputs": []
        },
        {
            "inputs": [
                {
                    "name": "_migrator",
                    "internalType": "contract IMigratorChef",
                    "type": "address"
                }
            ],
            "name": "setMigrator",
            "stateMutability": "nonpayable",
            "type": "function",
            "outputs": []
        },
        {
            "outputs": [],
            "inputs": [
                {
                    "type": "uint256",
                    "internalType": "uint256",
                    "name": "_pid"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function",
            "name": "migrate"
        },
        {
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
            "type": "function",
            "stateMutability": "view",
            "name": "pendingSushi",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "pending",
                    "type": "uint256"
                }
            ]
        },
        {
            "name": "massUpdatePools",
            "outputs": [],
            "type": "function",
            "inputs": [
                {
                    "name": "pids",
                    "type": "uint256[]",
                    "internalType": "uint256[]"
                }
            ],
            "stateMutability": "nonpayable"
        },
        {
            "outputs": [
                {
                    "internalType": "struct MiniChefV2.PoolInfo",
                    "components": [
                        {
                            "name": "accSushiPerShare",
                            "internalType": "uint128",
                            "type": "uint128"
                        },
                        {
                            "name": "lastRewardTime",
                            "type": "uint64",
                            "internalType": "uint64"
                        },
                        {
                            "type": "uint64",
                            "internalType": "uint64",
                            "name": "allocPoint"
                        }
                    ],
                    "name": "pool",
                    "type": "tuple"
                }
            ],
            "inputs": [
                {
                    "name": "pid",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "name": "updatePool",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "type": "uint256",
                    "internalType": "uint256",
                    "name": "pid"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "type": "address",
                    "name": "to"
                }
            ],
            "outputs": [],
            "name": "deposit",
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "name": "withdraw",
            "inputs": [
                {
                    "name": "pid",
                    "internalType": "uint256",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": []
        },
        {
            "name": "harvest",
            "stateMutability": "nonpayable",
            "type": "function",
            "inputs": [
                {
                    "internalType": "uint256",
                    "type": "uint256",
                    "name": "pid"
                },
                {
                    "name": "to",
                    "internalType": "address",
                    "type": "address"
                }
            ],
            "outputs": []
        },
        {
            "type": "function",
            "name": "withdrawAndHarvest",
            "outputs": [],
            "stateMutability": "nonpayable",
            "inputs": [
                {
                    "type": "uint256",
                    "internalType": "uint256",
                    "name": "pid"
                },
                {
                    "type": "uint256",
                    "internalType": "uint256",
                    "name": "amount"
                },
                {
                    "name": "to",
                    "type": "address",
                    "internalType": "address"
                }
            ]
        },
        {
            "name": "emergencyWithdraw",
            "inputs": [
                {
                    "type": "uint256",
                    "internalType": "uint256",
                    "name": "pid"
                },
                {
                    "type": "address",
                    "internalType": "address",
                    "name": "to"
                }
            ],
            "type": "function",
            "stateMutability": "nonpayable",
            "outputs": []
        }
    ]
    const ONE_REWARDS_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_rewardToken","internalType":"contract IERC20"},{"type":"uint256","name":"_rewardPerSecond","internalType":"uint256"},{"type":"address","name":"_MASTERCHEF_V2","internalType":"address"}]},{"type":"event","name":"LogInit","inputs":[],"anonymous":false},{"type":"event","name":"LogOnReward","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false},{"type":"address","name":"to","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"LogPoolAddition","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"allocPoint","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"LogRewardPerSecond","inputs":[{"type":"uint256","name":"rewardPerSecond","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"LogSetPool","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"allocPoint","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"LogUpdatePool","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint64","name":"lastRewardTime","internalType":"uint64","indexed":false},{"type":"uint256","name":"lpSupply","internalType":"uint256","indexed":false},{"type":"uint256","name":"accSushiPerShare","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[{"type":"uint256[]","name":"pids","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"onSushiReward","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"lpToken","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"pendingOwner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"pending","internalType":"uint256"}],"name":"pendingToken","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address[]","name":"rewardTokens","internalType":"contract IERC20[]"},{"type":"uint256[]","name":"rewardAmounts","internalType":"uint256[]"}],"name":"pendingTokens","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"},{"type":"address","name":"user","internalType":"address"},{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolIds","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"accSushiPerShare","internalType":"uint128"},{"type":"uint64","name":"lastRewardTime","internalType":"uint64"},{"type":"uint64","name":"allocPoint","internalType":"uint64"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"pools","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerSecond","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardPerSecond","inputs":[{"type":"uint256","name":"_rewardPerSecond","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"},{"type":"bool","name":"direct","internalType":"bool"},{"type":"bool","name":"renounce","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"tuple","name":"pool","internalType":"struct ComplexRewarderTime.PoolInfo","components":[{"type":"uint128","name":"accSushiPerShare","internalType":"uint128"},{"type":"uint64","name":"lastRewardTime","internalType":"uint64"},{"type":"uint64","name":"allocPoint","internalType":"uint64"}]}],"name":"updatePool","inputs":[{"type":"uint256","name":"pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]}]

  
      const SUSHI_CHEF_ADDR = "0x67da5f2ffaddff067ab9d5f025f8810634d84287";
      const rewardTokenTicker = "SUSHI";
      const rewardOneTicker = "WONE";
      const SUSHI_CHEF = new ethers.Contract(SUSHI_CHEF_ADDR, SUSHI_CHEF_ABI, App.provider);
      const ONE_REWARDS_ADDR = await SUSHI_CHEF.rewarder(0);
      const ONE_REWARDS_CONTRACT = new ethers.Contract(ONE_REWARDS_ADDR, ONE_REWARDS_ABI, App.provider);
  
      const oneTokenAddress = "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a";
  
      const rewardsPerWeek = await SUSHI_CHEF.sushiPerSecond() / 1e18 * 604800;
      const oneRewardsPerWeek = await ONE_REWARDS_CONTRACT.rewardPerSecond() / 1e18 * 604800;
  
      const tokens = {};
      const prices = await getHarmonyPrices();
  
      await loadHarmonySushiContract(App, tokens, prices, SUSHI_CHEF, SUSHI_CHEF_ADDR, SUSHI_CHEF_ABI, rewardTokenTicker,
          "SUSHI", null, rewardsPerWeek, "pendingSushi", [0], ONE_REWARDS_CONTRACT, ONE_REWARDS_ADDR, ONE_REWARDS_ABI,
          rewardOneTicker, oneTokenAddress, oneRewardsPerWeek);
  
      hideLoading();
  }
  
  async function loadHarmonySushiContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    deathPoolIndices, chefOneRewardsContract, chefOneRewardsAddress, chefOneRewardsAbi, rewardOneTicker, oneTokenAddress,
    oneRewardsPerWeek) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    _print(`Found ${poolCount} pools.\n`)
  
    _print(`Showing incentivized pools only.\n`);
  
    var tokens = {};
  
    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getHarmonyToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 3
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getSushiPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, chefOneRewardsContract,
          chefOneRewardsAddress)));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  
    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getHarmonyToken(App, address, chefAddress);
    }));
  
    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
                       .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "harmony") : undefined);
    }
  
    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "harmony") : undefined);
  
  
    _print("Finished reading smart contracts.\n");
  
    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printSushiPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, null, "harmony", chefOneRewardsAbi, chefOneRewardsAddress, oneRewardsPerWeek,
          rewardOneTicker, oneTokenAddress, poolInfos[i].pendingOneTokens)
        aprs.push(apr);
      }
    }
    let totalUserStaked=0, totalStaked=0, averageApr=0;
    for (const a of aprs) {
      if (!isNaN(a.totalStakedUsd)) {
        totalStaked += a.totalStakedUsd;
      }
      if (a.userStakedUsd > 0) {
        totalUserStaked += a.userStakedUsd;
        averageApr += a.userStakedUsd * a.yearlyAPR / 100;
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
  
  async function getSushiPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction, chefOneRewardsContract,
      chefOneRewardsAddress) {
      const poolInfo = await chefContract.poolInfo(poolIndex);
      const lpToken = await chefContract.lpToken(poolIndex);
      if (poolInfo.allocPoint == 0) {
        return {
          address: lpToken,
          allocPoints: poolInfo.allocPoint ?? 1,
          poolToken: null,
          userStaked : 0,
          pendingRewardTokens : 0,
        };
      }
      const poolToken = await getHarmonyToken(app, lpToken, chefAddress);
      const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
      //const userInfoMatic = await chefMaticRewardsContract.userInfo(poolIndex, app.YOUR_ADDRESS);
      const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
      const pendingOneTokens = await chefOneRewardsContract.pendingToken(poolIndex, app.YOUR_ADDRESS);
      const staked = userInfo.amount / 10 ** poolToken.decimals;
      return {
          address: lpToken,
          allocPoints: poolInfo.allocPoint ?? 1,
          poolToken: poolToken,
          userStaked : staked,
          pendingRewardTokens : pendingRewardTokens / 10 ** 18,
          pendingOneTokens : pendingOneTokens / 10 ** 18,
      };
    }
  
  function printSushiPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                         totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                         pendingRewardsFunction, fixedDecimals, claimFunction, chain="harmony",
                         chefOneRewardsAbi, chefOneRewardsAddress, oneRewardsPerWeek,
                         rewardOneTicker, oneTokenAddress, pendingOneTokens) {
    fixedDecimals = fixedDecimals ?? 2;
    const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
    var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
    let poolOneRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * oneRewardsPerWeek;
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const rewardOnePrice = getParameterCaseInsensitive(prices, oneTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    poolPrices.print_price(chain);
    sp?.print_price(chain);
    const apr = printSushiAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals, poolOneRewardsPerWeek, rewardOnePrice, rewardOneTicker);
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printSushiContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, rewardPrice, pendingOneTokens, rewardOneTicker, rewardOnePrice);
    _print("");
    return apr;
  }
  
  function printSushiAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
                    stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                    fixedDecimals, poolOneRewardsPerWeek, rewardOnePrice, rewardOneTicker) {
    var usdPerWeek = poolRewardsPerWeek * rewardPrice;
    var usdOnePerWeek = poolOneRewardsPerWeek * rewardOnePrice;
    fixedDecimals = fixedDecimals ?? 2;
    _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
    _print(`${rewardOneTicker} Per Week: ${poolOneRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdOnePerWeek)})`);
    var weeklyAPR = usdPerWeek / staked_tvl * 100;
    var dailyAPR = weeklyAPR / 7;
    var yearlySushiAPR = weeklyAPR * 52;
    var weeklyOneAPR = usdOnePerWeek / staked_tvl * 100;
    var dailyOneAPR = weeklyOneAPR / 7;
    var yearlyOneAPR = weeklyOneAPR * 52;
    let totalDailyAPR = dailyAPR + dailyOneAPR;
    let totalWeeklyAPR = weeklyAPR + weeklyOneAPR;
    let totalYearlyAPR = yearlySushiAPR + yearlyOneAPR;
    let totalUSDPerWeek = usdPerWeek + usdOnePerWeek;
    _print(`APR SUSHI: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlySushiAPR.toFixed(2)}%`);
    _print(`APR WONE: Day ${dailyOneAPR.toFixed(2)}% Week ${weeklyOneAPR.toFixed(2)}% Year ${yearlyOneAPR.toFixed(2)}%`);
    var userStakedUsd = userStaked * poolTokenPrice;
    var userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`Total Per Week: $${formatMoney(totalUSDPerWeek)}`);
    _print(`Total APR: Day ${totalDailyAPR.toFixed(4)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);
    _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
    var userOneWeeklyRewards = userStakedPct * poolOneRewardsPerWeek / 100;
    var userDailyRewards = userWeeklyRewards / 7;
    var userOneDailyRewards = userOneWeeklyRewards / 7;
    var userYearlyRewards = userWeeklyRewards * 52;
    var userOneYearlyRewards = userOneWeeklyRewards * 52;
    if (userStaked > 0) {
      _print(`Estimated Total earnings:`
          + ` Day ($${formatMoney(userDailyRewards*rewardPrice+userOneDailyRewards*rewardOnePrice)})`
          + ` Week ($${formatMoney(userWeeklyRewards*rewardPrice+userOneWeeklyRewards*rewardOnePrice)})`
          + ` Year ($${formatMoney(userYearlyRewards*rewardPrice+userOneYearlyRewards*rewardOnePrice)})`);
    }
    return {
      userStakedUsd,
      totalStakedUsd : staked_tvl,
      userStakedPct,
      yearlyAPR : totalYearlyAPR,
      userYearlyUsd : userYearlyRewards * rewardPrice + userOneYearlyRewards * rewardOnePrice
    }
  }

function printSushiContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals, rewardTokenPrice, pendingOneTokens,
    rewardOneTicker, rewardOnePrice) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return sushiContract_unstake(chefAbi, chefAddr, poolIndex, App)
  }
  const claim = async function() {
    return sushiContract_claim(chefAbi, chefAddr, poolIndex, App)
  }
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)}) + ${pendingOneTokens.toFixed(fixedDecimals)} ${rewardOneTicker} ($${formatMoney(pendingOneTokens*rewardOnePrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
}

const sushiContract_unstake = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
  const earnedTokenAmount = await CHEF_CONTRACT.pendingSushi(poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    CHEF_CONTRACT.withdrawAndHarvest(poolIndex, currentStakedAmount, App.YOUR_ADDRESS, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const sushiContract_claim = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = await CHEF_CONTRACT.pendingSushi(poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    CHEF_CONTRACT.harvest(poolIndex, App.YOUR_ADDRESS, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
  }
}