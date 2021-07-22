$(function() {
consoleInit(main)
});

const BUNI_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_rewardDistributor","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_rewardDuration","type":"uint256"},{"internalType":"uint256","name":"_vestingPeriod","type":"uint256"},{"internalType":"uint256","name":"_splits","type":"uint256"},{"internalType":"uint256","name":"_claimable","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"availableReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimedSplits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getDomainSeperator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"receiver","type":"address"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardDistributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"splitWindow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"splits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalEarnedReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalVestedRewardForUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const BUNI_CHEF_ABI = [
    {
      "inputs": [
        {
          "internalType": "contract BuniToken",
          "name": "_buni",
          "type": "address"
        },
        {
          "internalType": "contract IERC721",
          "name": "_vBuni",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_devaddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_buniPerBlock",
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
      "name": "Harvest",
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
          "name": "endInvestAt",
          "type": "uint256"
        }
      ],
      "name": "Vesting",
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
      "name": "BONUS_MULTIPLIER",
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
      "name": "MAX_MINT",
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
          "internalType": "contract IBEP20",
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
      "inputs": [],
      "name": "buni",
      "outputs": [
        {
          "internalType": "contract BuniToken",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "buniPerBlock",
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
        },
        {
          "internalType": "uint256",
          "name": "_amount",
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
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "getWithdrawFee",
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
      "name": "harvest",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "migrate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "migrator",
      "outputs": [
        {
          "internalType": "contract IMigratorChef",
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
      "name": "penaltyTime",
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
      "name": "pendingBuni",
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
      "name": "platformFeeRate",
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
          "name": "accBuniPerShare",
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
          "internalType": "uint256[]",
          "name": "_tokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "redeemBatchBuni",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "redeemBuni",
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
          "name": "_buniPerBlock",
          "type": "uint256"
        }
      ],
      "name": "setBuniPerBlock",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_maxMint",
          "type": "uint256"
        }
      ],
      "name": "setMaxMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IMigratorChef",
          "name": "_migrator",
          "type": "address"
        }
      ],
      "name": "setMigrator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newPenalty",
          "type": "uint256"
        }
      ],
      "name": "setPenaltyFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_penaltyIn",
          "type": "uint256"
        }
      ],
      "name": "setPenaltyTime",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_lockedIn",
          "type": "uint256"
        }
      ],
      "name": "setTimeLock",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_treasury",
          "type": "address"
        }
      ],
      "name": "setTreasury",
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
      "name": "totalMint",
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
      "name": "treasury",
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
          "name": "multiplierNumber",
          "type": "uint256"
        }
      ],
      "name": "updateMultiplier",
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
          "name": "lastDeposit",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "vBuni",
      "outputs": [
        {
          "internalType": "contract IERC721",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "vestTimeLock",
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
      "name": "withdrawDecimals",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

const Pools = [
  "0x08c19bdA7964A5a953765e7CC6E04FEF504C5389",
  "0xe02877C2914983E16e96418Cd29109e3B027D095",
  "0x936ed835E72B7F9B0DD908F46344B89EC4e23058",
  "0x9f2515135453f9485b2aE91ef48e92e0fEd0D2AE",
  "0x772759eEa5111286B3Fc2c808FB3DE6F73c37050",
  "0x3FD9017D28fDbb6E429bCC6AAeE2a0Fa991159Fc",
  "0x621Cb28f4719AcB815E35dd2BF804A9Be2307548",
  "0x71F39E16e3ef8DAf6e85ec30C56CDf0baFD251b2",
  "0xc0B6171ccd2Eb5Cf0dfCAABC5e1BE3ab671BE445",
  "0x9f61780d91F2C125EB3C49fE74df7b40183Fb4df",
  "0xb6c9e17B77257ae7F1cff43D2A02c6bE760A7e9e",
  "0xD0a00bc14C150e6F8F0B0dFfee2e1944C73B8A05"
].map(a => {
  return {
    address: a,
    abi: BUNI_STAKING_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardToken"
  }; })

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  const BUNI_CHEF_ADDR = "0xE2d84D292d014E589d1F6d4eAc6DdE0181C3CfBB";
  const rewardTokenTicker = "BUNI";
  const BUNI_CHEF = new ethers.Contract(BUNI_CHEF_ADDR, BUNI_CHEF_ABI, App.provider);
  const rewardsPerWeek = await BUNI_CHEF.buniPerBlock() /1e18
  * 604800 / 3;
  var tokens = {};
  var prices = await getBscPrices();
  _print('FARMS..........\n');
  await loadBscChefContract(App, tokens, prices, BUNI_CHEF, BUNI_CHEF_ADDR, BUNI_CHEF_ABI, rewardTokenTicker,
    "buni", null, rewardsPerWeek, "pendingBuni");
  _print('PRE-STAKING..........\n');

  await loadBscSynthetixPoolInfo(App, tokens, prices,
                                 Pools[0].abi,
                                 Pools[0].address,
                                 Pools[0].rewardTokenFunction,
                                 Pools[0].stakeTokenFunction)

  let p = await loadMultipleBscSynthetixPools(App, tokens, prices, Pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

function printChefPool(
    App,
    chefAbi,
    chefAddr,
    prices,
    tokens,
    poolInfo,
    poolIndex,
    poolPrices,
    totalAllocPoints,
    rewardsPerWeek,
    rewardTokenTicker,
    rewardTokenAddress,
    pendingRewardsFunction,
    fixedDecimals,
    claimFunction,
    chain = "eth",
    depositFee = 0,
    withdrawFee = 0
  ) {
    fixedDecimals = fixedDecimals ?? 2;
    const sp =
      poolInfo.stakedToken == null
        ? null
        : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
    var poolRewardsPerWeek =
      (poolInfo.allocPoints / totalAllocPoints) * rewardsPerWeek;
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice =
      getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd || 0.11365833;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    _print_inline(`${poolIndex} - `);
    poolPrices.print_price(chain);
    sp?.print_price(chain);
    const apr = printAPR(
      rewardTokenTicker,
      rewardPrice,
      poolRewardsPerWeek,
      poolPrices.stakeTokenTicker,
      staked_tvl,
      userStaked,
      poolPrices.price,
      fixedDecimals
    );
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printChefContractLinks(
      App,
      chefAbi,
      chefAddr,
      poolIndex,
      poolInfo.address,
      pendingRewardsFunction,
      rewardTokenTicker,
      poolPrices.stakeTokenTicker,
      poolInfo.poolToken.unstaked,
      poolInfo.userStaked,
      poolInfo.pendingRewardTokens,
      fixedDecimals,
      claimFunction,
      rewardPrice,
      chain,
      depositFee,
      withdrawFee
    );
    return apr;
  }
  async function loadBscChefContract(
    App,
    tokens,
    prices,
    chef,
    chefAddress,
    chefAbi,
    rewardTokenTicker,
    rewardTokenFunction,
    rewardsPerBlockFunction,
    rewardsPerWeekFixed,
    pendingRewardsFunction,
    deathPoolIndices
  ) {
    const chefContract =
      chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    // _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    // _print(`Found ${poolCount} pools.\n`)
  
    // _print(`Showing incentivized pools only.\n`);
  
    var tokens = {};
  
    const rewardTokenAddress = await chefContract.callStatic[
      rewardTokenFunction
    ]();
    const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek =
      rewardsPerWeekFixed ??
      (((await chefContract.callStatic[rewardsPerBlockFunction]()) /
        10 ** rewardToken.decimals) *
        604800) /
        3;
  
    const poolInfos = await Promise.all(
      [...Array(poolCount).keys()].map(
        async (x) =>
          await getBscPoolInfo(
            App,
            chefContract,
            chefAddress,
            x,
            pendingRewardsFunction
          )
      )
    );
  
    var tokenAddresses = [].concat.apply(
      [],
      poolInfos.filter((x) => x.poolToken).map((x) => x.poolToken.tokens)
    );
  
    await Promise.all(
      tokenAddresses.map(async (address) => {
        tokens[address] = await getBscToken(App, address, chefAddress);
      })
    );
  
    if (deathPoolIndices) {
      //load prices for the deathpool assets
      deathPoolIndices
        .map((i) => poolInfos[i])
        .map((poolInfo) =>
          poolInfo.poolToken
            ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc")
            : undefined
        );
    }
  
    const poolPrices = poolInfos.map((poolInfo) =>
      poolInfo.poolToken
        ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc")
        : undefined
    );
  
    // _print("Finished reading smart contracts.\n");
  
    let aprs = [];
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printChefPool(
          App,
          chefAbi,
          chefAddress,
          prices,
          tokens,
          poolInfos[i],
          i,
          poolPrices[i],
          totalAllocPoints,
          rewardsPerWeek,
          rewardTokenTicker,
          rewardTokenAddress,
          pendingRewardsFunction,
          null,
          null,
          "bsc",
          poolInfos[i].depositFee,
          poolInfos[i].withdrawFee
        );
        aprs.push(apr);
      }
    }
    let totalUserStaked = 0,
      totalStaked = 0,
      averageApr = 0;
    for (const a of aprs) {
      if (!isNaN(a.totalStakedUsd)) {
        totalStaked += a.totalStakedUsd;
      }
      if (a.userStakedUsd > 0) {
        totalUserStaked += a.userStakedUsd;
        averageApr += (a.userStakedUsd * a.yearlyAPR) / 100;
      }
    }
    averageApr = averageApr / totalUserStaked;
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    if (totalUserStaked > 0) {
      _print_bold(
        `\nYou are staking a total of $${formatMoney(
          totalUserStaked
        )} at an average APR of ${(averageApr * 100).toFixed(2)}%`
      );
      _print(
        `Estimated earnings:` +
          ` Day $${formatMoney((totalUserStaked * averageApr) / 365)}` +
          ` Week $${formatMoney((totalUserStaked * averageApr) / 52)}` +
          ` Year $${formatMoney(totalUserStaked * averageApr)}\n`
      );
    }
    return { prices, totalUserStaked, totalStaked, averageApr };
  }
  function printAPR(
    rewardTokenTicker,
    rewardPrice,
    poolRewardsPerWeek,
    stakeTokenTicker,
    staked_tvl,
    userStaked,
    poolTokenPrice,
    fixedDecimals
  ) {
    var usdPerWeek = poolRewardsPerWeek * rewardPrice;
    fixedDecimals = fixedDecimals ?? 2;
    _print(
      `${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(
        fixedDecimals
      )} ($${formatMoney(usdPerWeek)})`
    );
    var weeklyAPR = 0;
    var userStakedPct = 0;
    if (staked_tvl) {
      weeklyAPR = (usdPerWeek / staked_tvl) * 100;
    }
    var dailyAPR = weeklyAPR / 7;
    var yearlyAPR = weeklyAPR * 52;
    _print(
      `APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(
        2
      )}% Year ${yearlyAPR.toFixed(2)}%`
    );
    var userStakedUsd = userStaked * poolTokenPrice;
    if (staked_tvl) {
      userStakedPct = (userStakedUsd / staked_tvl) * 100;
    }
  
    _print(
      `You are staking ${userStaked.toFixed(
        fixedDecimals
      )} ${stakeTokenTicker} ($${formatMoney(
        userStakedUsd
      )}), ${userStakedPct.toFixed(2)}% of the pool.`
    );
    var userWeeklyRewards = (userStakedPct * poolRewardsPerWeek) / 100;
    var userDailyRewards = userWeeklyRewards / 7;
    var userYearlyRewards = userWeeklyRewards * 52;
    if (userStaked > 0) {
      _print(
        `Estimated ${rewardTokenTicker} earnings:` +
          ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(
            userDailyRewards * rewardPrice
          )})` +
          ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(
            userWeeklyRewards * rewardPrice
          )})` +
          ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(
            userYearlyRewards * rewardPrice
          )})`
      );
    }
    return {
      userStakedUsd,
      totalStakedUsd: staked_tvl,
      userStakedPct,
      yearlyAPR,
      userYearlyUsd: userYearlyRewards * rewardPrice,
    };
  }
  
async function printSynthetixPool(App, info, chain="eth", customURLs) {
    info.poolPrices.print_price(chain, 4, customURLs);
    _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;

    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
        `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (info.userStaked > 0) {
        info.poolPrices.print_contained_price(info.userStaked);
        const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;

        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${info.rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
    }

    info.availableEarned = 0;
    if (Pools.indexOf(info.stakeTokenAddress) !== -1) {
        const STAKING_POOL = new ethers.Contract(info.stakeTokenAddress, BUNI_STAKING_ABI, App.provider);
        info.availableEarned = await STAKING_POOL.availableReward(App.YOUR_ADDRESS) / 10 ** 18;
    }

    const approveTENDAndStake = async function() {
        return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
        return rewardsContract_unstake(info.stakingAddress, App)
    }
    const claim = async function() {
        if (info.availableEarned === 0) {
            alert('You have no unlock token to harvest!!')
            return;
        }
        return rewardsContract_claim(info.stakingAddress, App)
    }
    const exit = async function() {
        return rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
        return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    switch (chain) {
        case "eth":
            _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
            break;
        case "avax":
            _print(`<a target="_blank" href="https://cchain.explorer.avax.network/address/${info.stakingAddress}#code">Explorer</a>`);
            break;
        case "bsc":
            _print(`<a target="_blank" href="https://bscscan.com/address/${info.stakingAddress}#code">BSC Scan</a>`);
            break;
        case "heco":
            _print(`<a target="_blank" href="https://hecoinfo.com/address/${info.stakingAddress}#code">Heco Scan</a>`);
            break;
        case "matic":
            _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Polygon Explorer</a>`);
            break;
        case "okex":
            _print(`<a target="_blank" href="https://www.oklink.com/okexchain/address/${info.stakingAddress}#code">Okex Explorer</a>`);
            break;
        case "kcc":
            _print(`<a target="_blank" href="https://explorer.kcc.io/en/address/${info.stakingAddress}#code">KUCOIN Explorer</a>`);
            break;
        case "fantom":
            _print(`<a target="_blank" href="https://ftmscan.com/address/${info.stakingAddress}#code">FTM Scan</a>`);
            break;
        case "fuse":
            _print(`<a target="_blank" href="https://explorer.fuse.io/address/${info.stakingAddress}#code">FUSE Scan</a>`);
            break;
        case "xdai":
            _print(`<a target="_blank" href="https://blockscout.com/xdai/mainnet/address/${info.stakingAddress}/contracts">Explorer</a>`);
            break;
    }
    _print(`Earned ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`)
    if (info.stakeTokenTicker != "ETH") {
        _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    }
    else {
        _print("Please use the official website to stake ETH.");
    }
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    _print_link(`Claim ${info.availableEarned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.availableEarned*info.rewardTokenPrice)})`, claim)
    if (info.stakeTokenTicker != "ETH") {
        _print_link(`Revoke (set approval to 0)`, revoke)
    }
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : yearlyAPR
    }
}

async function getBscBalancerPool(App, pool, poolAddress, stakingAddress, tokens, smartToken) {
    let decimals = await pool.decimals();
    let symbol = await pool.symbol();
    let name = await pool.name();
    let totalSupply = await pool.totalSupply();
    let staked = await pool.balanceOf(stakingAddress);
    const unstaked = await pool.balanceOf(App.YOUR_ADDRESS);
    let poolTokens = [];
    for (const t of tokens) {
        poolTokens.push({ address: t, weight: await pool.getNormalizedWeight(t) / 1e18, balance: await pool.getBalance(t) })
    };
    if (smartToken) {
        totalSupply = await smartToken.totalSupply();
        staked = await smartToken.balanceOf(stakingAddress);
        unstaked = await smartToken.balanceOf(App.YOUR_ADDRESS);
    }
    return {
        symbol,
        name,
        address: poolAddress,
        poolTokens, //address, weight and balance
        totalSupply: totalSupply / 10 ** decimals,
        buniPoolTokens: poolTokens,
        stakingAddress,
        staked: staked / 10 ** decimals,
        decimals: decimals,
        unstaked: unstaked / 10 ** decimals,
        contract: pool,
        tokens
    };
}
