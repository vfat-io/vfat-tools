$(function () {
consoleInit(main)
});

const FIRE_CHEF_ABI = [{
    "type": "constructor",
    "stateMutability": "nonpayable",
    "inputs": [{
        "type": "address",
        "name": "_fire",
        "internalType": "contract FireBall"
    }, {
        "type": "address",
        "name": "_devaddr",
        "internalType": "address"
    }, {
        "type": "address",
        "name": "_feeAddress",
        "internalType": "address"
    }, {
        "type": "uint256",
        "name": "_firePerBlock",
        "internalType": "uint256"
    }, {
        "type": "uint256",
        "name": "_startBlock",
        "internalType": "uint256"
    }]
}, {
    "type": "event",
    "name": "Deposit",
    "inputs": [{
        "type": "address",
        "name": "user",
        "internalType": "address",
        "indexed": true
    }, {
        "type": "uint256",
        "name": "pid",
        "internalType": "uint256",
        "indexed": true
    }, {
        "type": "uint256",
        "name": "amount",
        "internalType": "uint256",
        "indexed": false
    }],
    "anonymous": false
}, {
    "type": "event",
    "name": "EmergencyWithdraw",
    "inputs": [{
        "type": "address",
        "name": "user",
        "internalType": "address",
        "indexed": true
    }, {
        "type": "uint256",
        "name": "pid",
        "internalType": "uint256",
        "indexed": true
    }, {
        "type": "uint256",
        "name": "amount",
        "internalType": "uint256",
        "indexed": false
    }],
    "anonymous": false
}, {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [{
        "type": "address",
        "name": "previousOwner",
        "internalType": "address",
        "indexed": true
    }, {
        "type": "address",
        "name": "newOwner",
        "internalType": "address",
        "indexed": true
    }],
    "anonymous": false
}, {
    "type": "event",
    "name": "SetDevAddress",
    "inputs": [{
        "type": "address",
        "name": "user",
        "internalType": "address",
        "indexed": true
    }, {
        "type": "address",
        "name": "newAddress",
        "internalType": "address",
        "indexed": true
    }],
    "anonymous": false
}, {
    "type": "event",
    "name": "SetFeeAddress",
    "inputs": [{
        "type": "address",
        "name": "user",
        "internalType": "address",
        "indexed": true
    }, {
        "type": "address",
        "name": "newAddress",
        "internalType": "address",
        "indexed": true
    }],
    "anonymous": false
}, {
    "type": "event",
    "name": "UpdateEmissionRate",
    "inputs": [{
        "type": "address",
        "name": "user",
        "internalType": "address",
        "indexed": true
    }, {
        "type": "uint256",
        "name": "goosePerBlock",
        "internalType": "uint256",
        "indexed": false
    }],
    "anonymous": false
}, {
    "type": "event",
    "name": "Withdraw",
    "inputs": [{
        "type": "address",
        "name": "user",
        "internalType": "address",
        "indexed": true
    }, {
        "type": "uint256",
        "name": "pid",
        "internalType": "uint256",
        "indexed": true
    }, {
        "type": "uint256",
        "name": "amount",
        "internalType": "uint256",
        "indexed": false
    }],
    "anonymous": false
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
    }],
    "name": "BONUS_MULTIPLIER",
    "inputs": []
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "add",
    "inputs": [{
        "type": "uint256",
        "name": "_allocPoint",
        "internalType": "uint256"
    }, {
        "type": "address",
        "name": "_lpToken",
        "internalType": "contract IERC20"
    }, {
        "type": "uint16",
        "name": "_depositFeeBP",
        "internalType": "uint16"
    }, {
        "type": "bool",
        "name": "_withUpdate",
        "internalType": "bool"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "deposit",
    "inputs": [{
        "type": "uint256",
        "name": "_pid",
        "internalType": "uint256"
    }, {
        "type": "uint256",
        "name": "_amount",
        "internalType": "uint256"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "dev",
    "inputs": [{
        "type": "address",
        "name": "_devaddr",
        "internalType": "address"
    }]
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "address",
        "name": "",
        "internalType": "address"
    }],
    "name": "devaddr",
    "inputs": []
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "emergencyRewards",
    "inputs": [{
        "type": "uint256",
        "name": "amount",
        "internalType": "uint256"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "emergencyWithdraw",
    "inputs": [{
        "type": "uint256",
        "name": "_pid",
        "internalType": "uint256"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "excludeFromFee",
    "inputs": [{
        "type": "address",
        "name": "account",
        "internalType": "address"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "excludeFromReward",
    "inputs": [{
        "type": "address",
        "name": "account",
        "internalType": "address"
    }]
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "address",
        "name": "",
        "internalType": "address"
    }],
    "name": "feeAddress",
    "inputs": []
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "address",
        "name": "",
        "internalType": "contract FireBall"
    }],
    "name": "fire",
    "inputs": []
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
    }],
    "name": "firePerBlock",
    "inputs": []
}, {
    "type": "function",
    "stateMutability": "pure",
    "outputs": [{
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
    }],
    "name": "getMultiplier",
    "inputs": [{
        "type": "uint256",
        "name": "_from",
        "internalType": "uint256"
    }, {
        "type": "uint256",
        "name": "_to",
        "internalType": "uint256"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "includeInFee",
    "inputs": [{
        "type": "address",
        "name": "account",
        "internalType": "address"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "includeInReward",
    "inputs": [{
        "type": "address",
        "name": "account",
        "internalType": "address"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "massUpdatePools",
    "inputs": []
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "address",
        "name": "",
        "internalType": "address"
    }],
    "name": "owner",
    "inputs": []
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
    }],
    "name": "pendingFire",
    "inputs": [{
        "type": "uint256",
        "name": "_pid",
        "internalType": "uint256"
    }, {
        "type": "address",
        "name": "_user",
        "internalType": "address"
    }]
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "bool",
        "name": "",
        "internalType": "bool"
    }],
    "name": "poolExistence",
    "inputs": [{
        "type": "address",
        "name": "",
        "internalType": "contract IERC20"
    }]
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "address",
        "name": "lpToken",
        "internalType": "contract IERC20"
    }, {
        "type": "uint256",
        "name": "allocPoint",
        "internalType": "uint256"
    }, {
        "type": "uint256",
        "name": "lastRewardBlock",
        "internalType": "uint256"
    }, {
        "type": "uint256",
        "name": "accFirePerShare",
        "internalType": "uint256"
    }, {
        "type": "uint16",
        "name": "depositFeeBP",
        "internalType": "uint16"
    }],
    "name": "poolInfo",
    "inputs": [{
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
    }]
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
    }],
    "name": "poolLength",
    "inputs": []
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "renounceOwnership",
    "inputs": []
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "set",
    "inputs": [{
        "type": "uint256",
        "name": "_pid",
        "internalType": "uint256"
    }, {
        "type": "uint256",
        "name": "_allocPoint",
        "internalType": "uint256"
    }, {
        "type": "uint16",
        "name": "_depositFeeBP",
        "internalType": "uint16"
    }, {
        "type": "bool",
        "name": "_withUpdate",
        "internalType": "bool"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "setFeeAddress",
    "inputs": [{
        "type": "address",
        "name": "_feeAddress",
        "internalType": "address"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "setLiquidityFeePercent",
    "inputs": [{
        "type": "uint256",
        "name": "liquidityFee",
        "internalType": "uint256"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "setMaxTxPercent",
    "inputs": [{
        "type": "uint256",
        "name": "maxTxPercent",
        "internalType": "uint256"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "setRouter",
    "inputs": [{
        "type": "address",
        "name": "router",
        "internalType": "address"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "setSwapAndLiquifyEnabled",
    "inputs": [{
        "type": "bool",
        "name": "_enabled",
        "internalType": "bool"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "setTaxFeePercent",
    "inputs": [{
        "type": "uint256",
        "name": "taxFee",
        "internalType": "uint256"
    }]
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
    }],
    "name": "startBlock",
    "inputs": []
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
    }],
    "name": "totalAllocPoint",
    "inputs": []
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "transferOwnership",
    "inputs": [{
        "type": "address",
        "name": "newOwner",
        "internalType": "address"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "updateEmissionRate",
    "inputs": [{
        "type": "uint256",
        "name": "_firePerBlock",
        "internalType": "uint256"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "updatePool",
    "inputs": [{
        "type": "uint256",
        "name": "_pid",
        "internalType": "uint256"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "updateStartBlock",
    "inputs": [{
        "type": "uint256",
        "name": "_startBlock",
        "internalType": "uint256"
    }]
}, {
    "type": "function",
    "stateMutability": "view",
    "outputs": [{
        "type": "uint256",
        "name": "amount",
        "internalType": "uint256"
    }, {
        "type": "uint256",
        "name": "rewardDebt",
        "internalType": "uint256"
    }],
    "name": "userInfo",
    "inputs": [{
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
    }, {
        "type": "address",
        "name": "",
        "internalType": "address"
    }]
}, {
    "type": "function",
    "stateMutability": "nonpayable",
    "outputs": [],
    "name": "withdraw",
    "inputs": [{
        "type": "uint256",
        "name": "_pid",
        "internalType": "uint256"
    }, {
        "type": "uint256",
        "name": "_amount",
        "internalType": "uint256"
    }]
}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const FIRE_CHEF_ADDR = "0xCEd39CF6221a10331e2349224BB1Eeb03A5c146f";
    const rewardTokenTicker = "FIRE";
    const FIRE_CHEF = new ethers.Contract(FIRE_CHEF_ADDR, FIRE_CHEF_ABI, App.provider);

    const startBlock = await FIRE_CHEF.startBlock();
    const currentBlock = await App.provider.getBlockNumber();

    let rewardsPerWeek = 0
    if (currentBlock < startBlock) {
        _print(`Rewards start at block ${startBlock}\n`);
    } else {
        rewardsPerWeek = await FIRE_CHEF.firePerBlock() / 1e9 *
            604800 / 2.0;
    }

    const tokens = {};
    const prices = await getMaticPrices();

    await loadMaticChefContract(App, tokens, prices, FIRE_CHEF, FIRE_CHEF_ADDR, FIRE_CHEF_ABI, rewardTokenTicker,
        "fire", null, rewardsPerWeek, "pendingFire");

    hideLoading();
}
