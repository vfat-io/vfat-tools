$(function () {
    consoleInit(main)
});

const BEEFY_VAULT_ABI = [{
    "inputs": [{
        "internalType": "address",
        "name": "_token",
        "type": "address"
    }, {"internalType": "address", "name": "_strategy", "type": "address"}, {
        "internalType": "string",
        "name": "_name",
        "type": "string"
    }, {"internalType": "string", "name": "_symbol", "type": "string"}, {
        "internalType": "uint256",
        "name": "_approvalDelay",
        "type": "uint256"
    }], "stateMutability": "nonpayable", "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "implementation", "type": "address"}],
    "name": "NewStratCandidate",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
    "name": "Transfer",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "implementation", "type": "address"}],
    "name": "UpgradeStrat",
    "type": "event"
}, {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "approvalDelay",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "available",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "balance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
    }],
    "name": "decreaseAllowance",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "depositAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {"inputs": [], "name": "earn", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {
    "inputs": [],
    "name": "getPricePerFullShare",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
    }],
    "name": "increaseAllowance",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_implementation", "type": "address"}],
    "name": "proposeStrat",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "stratCandidate",
    "outputs": [{"internalType": "address", "name": "implementation", "type": "address"}, {
        "internalType": "uint256",
        "name": "proposedTime",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "strategy",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "token",
    "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "recipient", "type": "address"}, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "sender", "type": "address"}, {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
    }, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "transferFrom",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "upgradeStrat",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_shares", "type": "uint256"}],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {"inputs": [], "name": "withdrawAll", "outputs": [], "stateMutability": "nonpayable", "type": "function"}]
const BEEFY_STRATEGY_ABI = [{
    "inputs": [{
        "internalType": "address",
        "name": "_lpPair",
        "type": "address"
    }, {"internalType": "uint8", "name": "_poolId", "type": "uint8"}, {
        "internalType": "address",
        "name": "_vault",
        "type": "address"
    }, {"internalType": "address", "name": "_unirouter", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "account", "type": "address"}],
    "name": "Paused",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "harvester", "type": "address"}],
    "name": "StratHarvest",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "address", "name": "account", "type": "address"}],
    "name": "Unpaused",
    "type": "event"
}, {
    "inputs": [],
    "name": "CALL_FEE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "HYPER_FEE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "MAX_FEE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "WITHDRAWAL_FEE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "WITHDRAWAL_MAX",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "alloy",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "alloyToLp0Route",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "alloyToLp1Route",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "alloyToWbnbRoute",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "balanceOfLpPair",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "balanceOfPool",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {"inputs": [], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {
    "inputs": [],
    "name": "harvest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "hypercity",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "hyperdao",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "hypr",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "lpPair",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "lpToken0",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "lpToken1",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {"inputs": [], "name": "panic", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "paused",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "poolId",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "retireStrat",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "unirouter",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {"inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {
    "inputs": [],
    "name": "vault",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "wbnb",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "wbnbToHyprRoute",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]

const Address = [
    "0x11ae409debb169097f984e6bff2e4c2b6e2f2cab",
    "0x19164be31a34e94f1bb25d8ad6042af950b89d2b",
    "0x666c0b9d37a20235c232081c1c6b2edc70ecc7f3",
    "0x945b2379e29f503a78dbcab2feeffe74a6c31e2b",
    "0x044e87f30bd9bd961c04028ac69155493e1b9ed0",
    "0x5c2197149ce7cab038ab09c45087a09070e32c73",
    "0x56fb7da3025f76d2128ef1b0d2eea47dd45e7c2a",
    "0xdf68bf80d427a5827ff2c06a9c70d407e17dc041",
    "0xbf7421bd2f79643a671b70d1dde57d452c110cf8",
    "0x2a30c5e0d577108f694d2a96179cd73611ee069b",
    "0xd34a51815892368fe96d9730376b2cede99f83d8",
    "0x1ff05e1fb13931ebe19363441bf10f8c5dcc963e",
    "0x1433c4a55449c8b96cf5ac0cf395cbd8dc8e5f60",
    "0x8b1ca7f3f0838dcd23da8cfe223ea313739193cb",
    "0x7a670e849db824364d1031deafb4cd603144f23d",
    "0x2f536facbc780b9cca02545d2aa71021d7308c5e",
    "0x6169551074826724cacd8deb452bf133403c2036",
    "0x41d44b276904561ac51855159516fd4cb2c90968",
    "0xd93a86bbf40454a7bcd339614fb46c67be31b908",
    "0x951120891258a9f2a6f3c5764e6eb21a948ab99c",
    "0xc422261edc5db679cad9bc403e886351de540e77",
    "0xfdafea4529d609901e6e6cc65b3e2c1c822e223d",
    "0x688724fb44cd7eabf209ca2b225880033e9563d2",
    "0x07ad2c13a0d735fa4f8788dc0b6355aaab2f3407",
    "0x1658c01f9c4d76c80e65fa6ed4d1f3099f6cdf00",
    "0xe6cce165aa3e52b2cc55f17b1dbc6a8fe5d66610",
    "0x9be8485ff97257aea98a3a9fcfffd9799f76deee",
    "0xfabdb29a8c1ae335bc65a7505311f8a48223efaa",
    "0xd7c6e2425be8aee964793c6a192f8cb953fe49ca"
]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const prices = await getHecoPrices();
    prices["0x11ae409debb169097f984e6bff2e4c2b6e2f2cab"] = prices["0x8f67854497218043e1f72908ffe38d0ed7f24721"]/["0x6f259637dcd74c767781e37bc6133cd6a68aa161"];
    prices["0x19164be31a34e94f1bb25d8ad6042af950b89d2b"] = prices["0x8f67854497218043e1f72908ffe38d0ed7f24721"]/["0xa71edc38d189767582c38a3145b5873052c3e47a"];
    prices["0x666c0b9d37a20235c232081c1c6b2edc70ecc7f3"] = prices["0x8f67854497218043e1f72908ffe38d0ed7f24721"]/["0xa71edc38d189767582c38a3145b5873052c3e47a"];
    prices["0x945b2379e29f503a78dbcab2feeffe74a6c31e2b"] = prices["0x8f67854497218043e1f72908ffe38d0ed7f24721"]/["0xa71edc38d189767582c38a3145b5873052c3e47a"];
    prices["0x044e87f30bd9bd961c04028ac69155493e1b9ed0"] = prices["0x514910771af9ca656af840dff83e8264ecf986ca"]/["0xa71edc38d189767582c38a3145b5873052c3e47a"];
    prices["0x5c2197149ce7cab038ab09c45087a09070e32c73"] = prices["0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c"]/["0xa71edc38d189767582c38a3145b5873052c3e47a"];
    prices["0x56fb7da3025f76d2128ef1b0d2eea47dd45e7c2a"] = prices["0xb55569893b397324c0d048c9709f40c23445540e"]/["0xa71edc38d189767582c38a3145b5873052c3e47a"];
    prices["0xbf7421bd2f79643a671b70d1dde57d452c110cf8"] = prices["0xB4F019bEAc758AbBEe2F906033AAa2f0F6Dacb35"]/["0xa71edc38d189767582c38a3145b5873052c3e47a"];
    prices["0x2a30c5e0d577108f694d2a96179cd73611ee069b"] = prices["0x9ffc3bcde7b68c46a6dc34f0718009925c1867cb"]/["0xa71edc38d189767582c38a3145b5873052c3e47a"];
    prices["0x1ff05e1fb13931ebe19363441bf10f8c5dcc963e"] = prices["0x0316eb71485b0ab14103307bf65a021042c6d380"]/["0xa71edc38d189767582c38a3145b5873052c3e47a"];


    prices["0xfdafea4529d609901e6e6cc65b3e2c1c822e223d"] = prices["0x0316eb71485b0ab14103307bf65a021042c6d380"]/["0x105E11915B80dD8aa59aC3d58f10303C75606d46"];
    prices["0x07ad2c13a0d735fa4f8788dc0b6355aaab2f3407"] = prices["0x64FF637fB478863B7468bc97D30a5bF3A428a1fD"]/["0x105E11915B80dD8aa59aC3d58f10303C75606d46"];
    prices["0x1658c01f9c4d76c80e65fa6ed4d1f3099f6cdf00"] = prices["0x9ffc3bcde7b68c46a6dc34f0718009925c1867cb"];
    prices["0xe6cce165aa3e52b2cc55f17b1dbc6a8fe5d66610"] = {usd: 1};
    prices["0x9be8485ff97257aea98a3a9fcfffd9799f76deee"] = prices["0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c"];
    prices["0xfabdb29a8c1ae335bc65a7505311f8a48223efaa"] = prices["0xb55569893b397324c0d048c9709f40c23445540e"];
    prices["0xd7c6e2425be8aee964793c6a192f8cb953fe49ca"] = prices["0x0316eb71485b0ab14103307bf65a021042c6d380"];


    const tokens = {};
    const poolInfos = await Promise.all(Address.map(address => loadBeefyPoolInfo(App, tokens, prices, address)));
    let tvl = 0, userTvl = 0
    for (const p of poolInfos.filter(p => p)) {
        printBeefyContract(p);
        if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
        if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
    if (userTvl > 0) {
        _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }

    hideLoading();
}

async function loadBeefyPoolInfo(App, tokens, prices, contractAddress) {
    try {
        const contract = await new ethers.Contract(contractAddress, BEEFY_VAULT_ABI, App.provider);
        const vault = await getHecoToken(App, contractAddress, App.YOUR_ADDRESS);
        var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
        for (const address of newTokenAddresses) {
            tokens[address] = await getHecoToken(App, address, contractAddress);
        }
        const totalSupply = await contract.totalSupply() / 1e18;
        const ppfs = await contract.getPricePerFullShare() / 1e18;
        const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
        const poolPrices = getPoolPrices(tokens, prices, vault, "heco");
        return {vault, poolPrices, userStaked, ppfs, totalSupply}
    } catch (err) {
        console.log(contractAddress, err);
        return null;
    }
}

async function printBeefyContract(poolInfo) {
    const poolPrices = poolInfo.poolPrices;
    _print(`${poolPrices.stakeTokenTicker} Price: $${formatMoney(poolPrices.price)} TVL: $${formatMoney(poolPrices.tvl)}`);
    var userStakedUsd = poolInfo.userStaked * poolPrices.price;
    var userStakedPct = userStakedUsd / poolPrices.tvl * 100;
    _print(`You are staking ${poolInfo.userStaked.toFixed(4)} ${poolPrices.name} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    if (poolInfo.userStaked > 0) {
        _print(`Your stake comprises of ${poolInfo.userStaked * poolInfo.ppfs} ${poolInfo.vault.token.symbol}.`)
    }
    _print("");
}
