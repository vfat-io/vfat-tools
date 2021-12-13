
$(function() {
	consoleInit(main)
	  });
	
	const ABI_RBCH_CHEF =
	[
		{
			"inputs": [
				{
					"internalType": "contract CakeToken",
					"name": "_cake",
					"type": "address"
				},
				{
					"internalType": "contract SyrupBar",
					"name": "_syrup",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_devaddr",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_cakePerBlock",
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
			"name": "cake",
			"outputs": [
				{
					"internalType": "contract CakeToken",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "cakePerBlock",
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
			"name": "devshare",
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
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "enterStaking",
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
			"name": "leaveStaking",
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
			"inputs": [
				{
					"internalType": "address",
					"name": "_controller",
					"type": "address"
				}
			],
			"name": "migrateControl",
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
			"name": "pendingCake",
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
					"name": "accCakePerShare",
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
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_devshare",
					"type": "uint256"
				}
			],
			"name": "setDevShare",
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
					"internalType": "address",
					"name": "_shareto",
					"type": "address"
				}
			],
			"name": "setShareTo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "shareto",
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
					"name": "_cakePerBlock",
					"type": "uint256"
				}
			],
			"name": "updateRewardPerBlock",
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
	];
	
	async function main() {
		const App = await init_ethers();
	
		_print(`Initialized ${App.YOUR_ADDRESS}\n`);
		_print("Reading smart contracts...\n");
	
	   const RBCH_ADDRESS = "0xeC0A7496e66a206181034F86B261DDDC1A2c406E";
	   const rewardTokenTicker = "RBCH";
	   const RBCH_MASTERCHEF = new ethers.Contract(RBCH_ADDRESS, ABI_RBCH_CHEF, App.provider);
	
	   const rewardsPerWeek = await RBCH_MASTERCHEF.cakePerBlock() /1e18
			* 604800 / 6;
	
	   const tokens = {}
	   const prices = await getSmartbchPrices();
	
		await loadSmartbchChefContract(App, tokens, prices, RBCH_MASTERCHEF, RBCH_ADDRESS, ABI_RBCH_CHEF, rewardTokenTicker,
			"cake", null, rewardsPerWeek, "pendingCake", [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]);
	
		hideLoading();
	}