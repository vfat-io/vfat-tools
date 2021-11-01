$(function () {
	consoleInit(main)
	});

const ANGLE_CHEF_ABI = [
	{
	  "inputs": [
		{
		  "internalType": "contract AngleToken",
		  "name": "_angle",
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
		  "name": "_anglePerBlock",
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
	  "type": "function",
	  "constant": true
	},
	{
	  "inputs": [],
	  "name": "angle",
	  "outputs": [
		{
		  "internalType": "contract AngleToken",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function",
	  "constant": true
	},
	{
	  "inputs": [],
	  "name": "anglePerBlock",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function",
	  "constant": true
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
	  "type": "function",
	  "constant": true
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
	  "type": "function",
	  "constant": true
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
	  "type": "function",
	  "constant": true
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
	  "type": "function",
	  "constant": true
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
		  "name": "accAnglePerShare",
		  "type": "uint256"
		},
		{
		  "internalType": "uint16",
		  "name": "depositFeeBP",
		  "type": "uint16"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function",
	  "constant": true
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
	  "name": "startBlock",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function",
	  "constant": true
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
	  "type": "function",
	  "constant": true
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
	  "type": "function",
	  "constant": true
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
	  "type": "function",
	  "constant": true
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
	  "type": "function",
	  "constant": true
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
	  "name": "pendingAngle",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function",
	  "constant": true
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
	  "name": "updatePool",
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
		  "internalType": "uint256",
		  "name": "_anglePerBlock",
		  "type": "uint256"
		}
	  ],
	  "name": "updateEmissionRate",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	}
]

async function main() {
	const App = await init_ethers();

	_print(`Initialized ${App.YOUR_ADDRESS}\n`);
	_print("Reading smart contracts...\n");

	const ANGLE_CHEF_ADDR = "0xD3c0466DA04c1843a99479A202Fa5bf2A2b6F5E0";
	const rewardTokenTicker = "Angle";
	const ANGLE_CHEF = new ethers.Contract(ANGLE_CHEF_ADDR, ANGLE_CHEF_ABI, App.provider);

	const rewardsPerWeek = await ANGLE_CHEF.anglePerBlock() / 1e18 * 604800 / 2;
	const tokens = {};
	const prices = await getMaticPrices();

	await loadMaticChefContract(App, tokens, prices, ANGLE_CHEF, ANGLE_CHEF_ADDR, ANGLE_CHEF_ABI, rewardTokenTicker,
		"angle", null, rewardsPerWeek, "pendingAngle");

	hideLoading();
}
