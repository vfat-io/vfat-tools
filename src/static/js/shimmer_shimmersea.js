
$(function() {
consoleInit(main)
  });

const LUM_CHEF_ABI = [
  {
      "inputs": [
          {
              "internalType": "contract IRewardToken",
              "name": "_rewardToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "_opsInfraAddr",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "_feeaddr",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "_rewardsPerSec",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_startTime",
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
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "to",
              "type": "address"
          }
      ],
      "name": "Deposit",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "oldFee",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "newFee",
              "type": "uint256"
          }
      ],
      "name": "DevRewardFeeUpdated",
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
              "internalType": "address",
              "name": "_old",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "_new",
              "type": "address"
          }
      ],
      "name": "FeeAddrUpdated",
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
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "to",
              "type": "address"
          }
      ],
      "name": "Harvest",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "rewardsPerSec",
              "type": "uint256"
          }
      ],
      "name": "Init",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "address",
              "name": "_old",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "_new",
              "type": "address"
          }
      ],
      "name": "OpsInfraAddrUpdated",
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
              "internalType": "address",
              "name": "lpToken",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "depositFeeBP",
              "type": "uint256"
          }
      ],
      "name": "PoolAdded",
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
              "internalType": "address",
              "name": "lpToken",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "depositFeeBP",
              "type": "uint256"
          }
      ],
      "name": "PoolConfigUpdated",
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
              "name": "lastRewardTime",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "lpSupply",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "accRewardPerShare",
              "type": "uint256"
          }
      ],
      "name": "PoolUpdated",
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
              "name": "_rewardsPerSec",
              "type": "uint256"
          }
      ],
      "name": "UpdateEmissionRate",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "address",
              "name": "_old",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "_new",
              "type": "address"
          }
      ],
      "name": "UpdateTrustee",
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
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "to",
              "type": "address"
          }
      ],
      "name": "Withdraw",
      "type": "event"
  },
  {
      "inputs": [],
      "name": "MAX_DEPOSIT_FEE_BP",
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
      "name": "MAX_DEV_REWARD_FEE",
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
      "name": "MAX_EMISSION_RATE_PER_SEC",
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
      "name": "PRECISION_FACTOR",
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
              "name": "_allocPoint",
              "type": "uint256"
          },
          {
              "internalType": "contract IERC20",
              "name": "_lpToken",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "_depositFeeBP",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "_withUpdate",
              "type": "bool"
          },
          {
              "internalType": "contract IRewarder",
              "name": "_rewarder",
              "type": "address"
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
              "internalType": "uint256[]",
              "name": "_pids",
              "type": "uint256[]"
          }
      ],
      "name": "chunkUpdatePools",
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
          },
          {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "_to",
              "type": "address"
          }
      ],
      "name": "depositOnBehalf",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "devRewardFee",
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
          }
      ],
      "name": "emergencyWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "feeaddr",
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
          }
      ],
      "name": "getPoolInfo",
      "outputs": [
          {
              "internalType": "address",
              "name": "lpToken",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "lpSupply",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "allocPoint",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "lastRewardTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "accRewardPerShare",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "depositFeeBP",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "rewarder",
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
          }
      ],
      "name": "harvest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256[]",
              "name": "_pids",
              "type": "uint256[]"
          }
      ],
      "name": "harvestAll",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "opsInfraAddr",
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
      "name": "pendingRewards",
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
          }
      ],
      "name": "poolInfo",
      "outputs": [
          {
              "internalType": "contract IERC20",
              "name": "lpToken",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "lpSupply",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "allocPoint",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "lastRewardTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "accRewardPerShare",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "depositFeeBP",
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
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "rewardToken",
      "outputs": [
          {
              "internalType": "contract IRewardToken",
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
          }
      ],
      "name": "rewarders",
      "outputs": [
          {
              "internalType": "contract IRewarder",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "rewardsPerSec",
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
              "internalType": "uint256",
              "name": "_allocPoint",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_depositFeeBP",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "_withUpdate",
              "type": "bool"
          },
          {
              "internalType": "contract IRewarder",
              "name": "_rewarder",
              "type": "address"
          },
          {
              "internalType": "bool",
              "name": "_overwrite",
              "type": "bool"
          }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "startTime",
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
      "name": "trustee",
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
              "name": "_newFee",
              "type": "uint256"
          }
      ],
      "name": "updateDevRewardFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_rewardsPerSec",
              "type": "uint256"
          }
      ],
      "name": "updateEmissionRate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_feeAddr",
              "type": "address"
          }
      ],
      "name": "updateFeeAddr",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_opsInfraAddr",
              "type": "address"
          }
      ],
      "name": "updateOpsInfraAddr",
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
      "inputs": [
          {
              "internalType": "address",
              "name": "_trustee",
              "type": "address"
          }
      ],
      "name": "updateTrustee",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "withdrawAndHarvest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const LUM_CHEF_ADDR = "0x686eAd3Fee35C811684E6158408B49220d912dD4";
   const rewardTokenTicker = "LUM";
   const LUM_CHEF = new ethers.Contract(LUM_CHEF_ADDR, LUM_CHEF_ABI, App.provider);

   const rewardsPerWeek = await LUM_CHEF.rewardsPerSec() /1e18 * 604800;

    const tokens = {};
    const prices = await getShimmerPrices();

    await loadGeneralChefContract(App, tokens, prices, LUM_CHEF, LUM_CHEF_ADDR, LUM_CHEF_ABI, rewardTokenTicker,
        "rewardToken", null, rewardsPerWeek, "pendingRewards", [1], "shimmer");

    hideLoading();
  }