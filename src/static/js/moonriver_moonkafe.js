$(function () {		
    consoleInit(main)		
    });		
    		
    		
    const CHEF_ABI = [
        {
          "inputs": [
            {
              "internalType": "contract IKafeToken",
              "name": "_kafe",
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
              "name": "_kafePerBlock",
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
              "internalType": "address",
              "name": "newAddress",
              "type": "address"
            }
          ],
          "name": "SetDevAddress",
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
              "internalType": "address",
              "name": "newAddress",
              "type": "address"
            }
          ],
          "name": "SetFeeAddress",
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
              "name": "goosePerBlock",
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
          "name": "DEV_FEE_DIVIDER",
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
          "inputs": [],
          "name": "depositedKafe",
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
            }
          ],
          "name": "emergencyWithdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
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
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "feeFactor",
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
          "inputs": [],
          "name": "kafe",
          "outputs": [
            {
              "internalType": "contract IKafeToken",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "kafePerBlock",
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
          "name": "masterChefCircuitBreak",
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
          "name": "pendingKafe",
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
              "name": "accKafePerShare",
              "type": "uint256"
            },
            {
              "internalType": "uint16",
              "name": "depositFeeBP",
              "type": "uint16"
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "rewardMultipliers",
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
          "name": "rewardTimePerMultiplierTier",
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
              "name": "_a",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_poolId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_bps",
              "type": "uint256"
            }
          ],
          "name": "setFactor",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
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
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_multipliers",
              "type": "uint256[]"
            },
            {
              "internalType": "bool",
              "name": "update",
              "type": "bool"
            }
          ],
          "name": "setRewardMultipliers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_numBlocks",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "update",
              "type": "bool"
            }
          ],
          "name": "setRewardTimePerMultiplierTier",
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
          "inputs": [
            {
              "internalType": "bool",
              "name": "_b",
              "type": "bool"
            }
          ],
          "name": "toggleCircuitBreaker",
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
              "name": "_kafePerBlock",
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
        }
      ]

    async function main() {		
        const App = await init_ethers();		
    		
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);		
        _print("Reading smart contracts...\n");		
    		
        const CHEF_ADDR = "0x91aD62286cb69d2C6abdB952564e0EFEA082869c";		
        const rewardTokenTicker = "KAFE";		
        const CHEF = new ethers.Contract(CHEF_ADDR, CHEF_ABI, App.provider);		

        const blocksPerSeconds = await getAverageBlockTime(App);
    		
       const startBlock = await CHEF.startBlock();
       const currentBlock = await App.provider.getBlockNumber();
       const currMultiplier = await CHEF.getMultiplier(currentBlock, currentBlock+1)
       let rewardsPerWeek = 0
       if(currentBlock < startBlock){
         _print(`REWARDS HAVE NOT YET STARTED!\n\tRewards start at block ${startBlock}\n`);
       }else{
        rewardsPerWeek = await CHEF.kafePerBlock() * currMultiplier / 1e18 *		
                604800 / blocksPerSeconds;
       }
        		
    		
        const tokens = {};		
        const prices = await getMoonriverPrices();
    		
        await loadMoonriverChefContract(App, tokens, prices, CHEF, CHEF_ADDR, CHEF_ABI, rewardTokenTicker,		
            "kafe", null, rewardsPerWeek, "pendingKafe");		
    		

            // (App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
            //     rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
            //     deathPoolIndices, claimFunction)


        hideLoading();		
    }		
    	
