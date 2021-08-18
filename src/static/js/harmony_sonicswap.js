$(function() {
consoleInit(main)
  });

const SONIC_CHEF_ABI = [
  {
    "inputs": [
      {
        "internalType": "contract GovernanceToken",
        "name": "_govToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_devaddr",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_liquidityaddr",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_comfundaddr",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_founderaddr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_rewardPerBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_startBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_halvingAfterBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_userDepFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_devDepFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "_rewardMultiplier",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_blockDeltaStartStage",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_blockDeltaEndStage",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_userFeeStage",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_devFeeStage",
        "type": "uint256[]"
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
        "internalType": "uint256",
        "name": "lockAmount",
        "type": "uint256"
      }
    ],
    "name": "SendGovernanceTokenReward",
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
    "name": "FINISH_BONUS_AT_BLOCK",
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
    "name": "HALVING_AT_BLOCK",
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
    "name": "PERCENT_FOR_COM",
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
    "name": "PERCENT_FOR_DEV",
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
    "name": "PERCENT_FOR_FOUNDERS",
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
    "name": "PERCENT_FOR_LP",
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
    "name": "PERCENT_LOCK_BONUS_REWARD",
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
    "name": "REWARD_MULTIPLIER",
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
    "name": "REWARD_PER_BLOCK",
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
    "name": "START_BLOCK",
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
        "internalType": "address",
        "name": "_toAdd",
        "type": "address"
      }
    ],
    "name": "addAuthorized",
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
    "name": "authorized",
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
    "name": "blockDeltaEndStage",
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
    "name": "blockDeltaStartStage",
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
        "name": "_newFinish",
        "type": "uint256"
      }
    ],
    "name": "bonusFinishUpdate",
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
    "name": "claimReward",
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
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newCom",
        "type": "address"
      }
    ],
    "name": "comUpdate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "comfundaddr",
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
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_ref",
        "type": "address"
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
        "internalType": "address",
        "name": "_devaddr",
        "type": "address"
      }
    ],
    "name": "dev",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "devDepFee",
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
    "name": "devFeeStage",
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
        "internalType": "address",
        "name": "_newFounder",
        "type": "address"
      }
    ],
    "name": "founderUpdate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "founderaddr",
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
    "name": "getGlobalAmount",
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
    "name": "getGlobalRefAmount",
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
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pid1",
        "type": "uint256"
      }
    ],
    "name": "getNewRewardPerBlock",
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
        "name": "_from",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_to",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_allocPoint",
        "type": "uint256"
      }
    ],
    "name": "getPoolReward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "forDev",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "forFarmer",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "forLP",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "forCom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "forFounders",
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
      },
      {
        "internalType": "address",
        "name": "_user2",
        "type": "address"
      }
    ],
    "name": "getRefValueOf",
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
    "name": "getTotalRefs",
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
    "name": "govToken",
    "outputs": [
      {
        "internalType": "contract GovernanceToken",
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
        "internalType": "uint256[]",
        "name": "_newHalving",
        "type": "uint256[]"
      }
    ],
    "name": "halvingUpdate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isPoolBurnEnabled",
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
    "name": "liquidityaddr",
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
        "name": "_newlock",
        "type": "uint256"
      }
    ],
    "name": "lockUpdate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newcomlock",
        "type": "uint256"
      }
    ],
    "name": "lockcomUpdate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newdevlock",
        "type": "uint256"
      }
    ],
    "name": "lockdevUpdate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newfounderlock",
        "type": "uint256"
      }
    ],
    "name": "lockfounderUpdate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newlplock",
        "type": "uint256"
      }
    ],
    "name": "locklpUpdate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newLP",
        "type": "address"
      }
    ],
    "name": "lpUpdate",
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
    "inputs": [
      {
        "internalType": "bool",
        "name": "_onoff",
        "type": "bool"
      }
    ],
    "name": "poolBurnEnabled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
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
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "poolId1",
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
        "name": "accGovTokenPerShare",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "reclaimTokenOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_toRemove",
        "type": "address"
      }
    ],
    "name": "removeAuthorized",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_block",
        "type": "uint256"
      }
    ],
    "name": "reviseDeposit",
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
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_block",
        "type": "uint256"
      }
    ],
    "name": "reviseWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_newMulReward",
        "type": "uint256[]"
      }
    ],
    "name": "rewardMulUpdate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newReward",
        "type": "uint256"
      }
    ],
    "name": "rewardUpdate",
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
        "internalType": "uint256",
        "name": "_devDepFees",
        "type": "uint256"
      }
    ],
    "name": "setDevDepFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_devFees",
        "type": "uint256[]"
      }
    ],
    "name": "setDevFeeStage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_blockEnds",
        "type": "uint256[]"
      }
    ],
    "name": "setStageEnds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_blockStarts",
        "type": "uint256[]"
      }
    ],
    "name": "setStageStarts",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_usrDepFees",
        "type": "uint256"
      }
    ],
    "name": "setUserDepFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_userFees",
        "type": "uint256[]"
      }
    ],
    "name": "setUserFeeStage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newstarblock",
        "type": "uint256"
      }
    ],
    "name": "starblockUpdate",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "totalBurnedFromPools",
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
    "name": "usdOracle",
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
    "name": "userDelta",
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
    "name": "userDepFee",
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
    "name": "userFeeStage",
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
    "name": "userGlobalInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "globalAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalReferals",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "globalRefAmount",
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
      },
      {
        "internalType": "uint256",
        "name": "rewardDebtAtBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastWithdrawBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "firstDepositBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "blockdelta",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastDepositBlock",
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
      },
      {
        "internalType": "address",
        "name": "_ref",
        "type": "address"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const SONIC_CITY_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
      },
      {
        "internalType": "contract IERC20",
        "name": "_govToken",
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
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "enter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "govToken",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_share",
        "type": "uint256"
      }
    ],
    "name": "leave",
    "outputs": [],
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

const SONIC_TOKEN_ADDR = "0x1e05C8B69e4128949FcEf16811a819eF2f55D33E";
const SONIC_CHEF_ADDR = "0x65bFeeC6E0679EB5913b25063Aab228ccab43161";
const SONIC_CITY_ADDR = "0xaCACe56593f5Db262BAfFD05Ef105c383d778020";
const REWARD_TOKEN_TICKER = "SONIC";
const CITY_NAME = "SonicCity";

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const SONIC_CHEF = new ethers.Contract(SONIC_CHEF_ADDR, SONIC_CHEF_ABI, App.provider);

  const blockNumber = await App.provider.getBlockNumber();
  const multiplier = await SONIC_CHEF.getMultiplier(blockNumber, blockNumber+1);
  const rewardPerBlock = await SONIC_CHEF.REWARD_PER_BLOCK();
  const rewardsPerWeek = rewardPerBlock / 1e18 * multiplier * 604800 / 2

  const tokens = {};
  const basePrices = await getHarmonyPrices();

  const { prices, totalUserStaked, totalStaked, averageApr } = await loadHarmonyChefContract(
    App,
    tokens,
    basePrices,
    SONIC_CHEF,
    SONIC_CHEF_ADDR,
    SONIC_CHEF_ABI,
    REWARD_TOKEN_TICKER,
    "govToken",
    null,
    rewardsPerWeek,
    "pendingReward",
    [0,1,2,3,4,5],
    true
  );

  const SONIC = new ethers.Contract(SONIC_TOKEN_ADDR, ERC20_ABI, App.provider.getSigner());
  const SONIC_CITY = new ethers.Contract(SONIC_CITY_ADDR, SONIC_CITY_ABI, App.provider.getSigner());
  const sonicCity = await sonicCityData(SONIC, SONIC_CITY, App, prices);

  const totalStakedInclSonicCity = totalStaked + sonicCity.totalBalanceUSD

  _print_bold(`Total Staked: $${formatMoney(totalStakedInclSonicCity)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}% in LP staking pools.`);
    _print(`Estimated earnings:`
        + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
        + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
        + ` Year $${formatMoney(totalUserStaked*averageApr)}`);
  }

  if (sonicCity.userBalanceUSD > 0) {
    _print(`You are staking a total of $${formatMoney(sonicCity.userBalanceUSD)} in the ${CITY_NAME} single staking pool.`);
  }

  hideLoading();
}

async function sonicCityData(SONIC, SONIC_CITY, App, prices) {
  const sonicCityTotalBalance = await SONIC.balanceOf(SONIC_CITY_ADDR) / 1e18;
  const sonicCityTotalSupply = await SONIC_CITY.totalSupply() / 1e18;
  const aSonicRatio = sonicCityTotalBalance / sonicCityTotalSupply;

  const sonicCityUserBalanceBigNum = await SONIC_CITY.balanceOf(App.YOUR_ADDRESS);
  const sonicCityUserBalance = (sonicCityUserBalanceBigNum / 1e18) * aSonicRatio;
  const sonicCityShare = sonicCityUserBalance / sonicCityTotalBalance;
  const sonicBalanceBigNum = await SONIC.balanceOf(App.YOUR_ADDRESS);
  const sonicBalance = sonicBalanceBigNum / 1e18;

  const sonicPrice = prices[SONIC_TOKEN_ADDR];

  let sonicCityTotalBalanceUSD;
  let sonicCityUserBalanceUSD;

  if (sonicPrice && sonicPrice.usd) {
    sonicCityTotalBalanceUSD = sonicCityTotalBalance * sonicPrice.usd;
    sonicCityUserBalanceUSD = sonicCityUserBalance * sonicPrice.usd;

    _print(`${CITY_NAME} TVL: $${formatMoney(sonicCityTotalBalanceUSD)}`);
    _print(`${REWARD_TOKEN_TICKER} Price: $${formatMoney(sonicPrice.usd)}`);
    _print(`Staked: ${(sonicCityTotalBalance).toFixed(2)} ${REWARD_TOKEN_TICKER} ($${formatMoney(sonicCityTotalBalanceUSD)})`);
    _print(`You are staking ${(sonicCityUserBalance).toFixed(2)} ${REWARD_TOKEN_TICKER} ($${formatMoney(sonicCityUserBalanceUSD)}), ${(sonicCityShare * 100).toFixed(2)}% of the pool.`);

    const approveAndEnter = async function() {
      return sonicCityApproveAndEnter(SONIC, SONIC_CITY, sonicBalanceBigNum, App);
    }

    const leave = async function() {
      return sonicCityLeave(SONIC_CITY, sonicCityUserBalanceBigNum, App);
    }

    _print_link(`Stake ${(sonicBalance).toFixed(2)} ${REWARD_TOKEN_TICKER}`, approveAndEnter);

    if (sonicCityUserBalance > 0) {
      _print_link(`Unstake ${sonicCityUserBalance.toFixed(2)} ${REWARD_TOKEN_TICKER}`, leave);
    }

    _print(`${CITY_NAME} rewards are visible after unstaking / exiting the pool.`)
    _print('');
  }

  hideLoading()

  return {
    totalBalance: sonicCityTotalBalance,
    totalBalanceUSD: sonicCityTotalBalanceUSD,
    userBalance: sonicCityUserBalance,
    userBalanceUSD: sonicCityUserBalanceUSD
  }
}

async function sonicCityApproveAndEnter(SONIC, SONIC_CITY, currentTokens, App) {
  const allowedTokens = await SONIC.allowance(App.YOUR_ADDRESS, SONIC_CITY_ADDR)
  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = SONIC.approve(SONIC_CITY_ADDR, ethers.constants.MaxUint256)
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
      SONIC_CITY.enter(currentTokens, {gasLimit: 500000})
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

async function sonicCityLeave(SONIC_CITY, currentStakedAmount, App) {
  showLoading()
  SONIC_CITY.leave(currentStakedAmount, {gasLimit: 500000})
  .then(function(t) {
    App.provider.waitForTransaction(t.hash).then(function() {
      hideLoading()
    })
  })
  .catch(function() {
    hideLoading()
  })
}
