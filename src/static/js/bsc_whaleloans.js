$(function () {
    consoleInit(main);
});

const HUMP_STAKING_ABI = [{ "inputs": [{ "internalType": "address", "name": "_HUMP", "type": "address" }, { "internalType": "address", "name": "_sHUMP", "type": "address" }, { "internalType": "uint256", "name": "_epochLength", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochNumber", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochTime", "type": "uint256" }, { "internalType": "address", "name": "_authority", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contractIWhaleAuthority", "name": "authority", "type": "address" }], "name": "AuthorityUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "distributor", "type": "address" }], "name": "DistributorSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "warmup", "type": "uint256" }], "name": "WarmupSet", "type": "event" }, { "inputs": [], "name": "HUMP", "outputs": [{ "internalType": "contractIERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "authority", "outputs": [{ "internalType": "contractIWhaleAuthority", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }], "name": "claim", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "distributor", "outputs": [{ "internalType": "contractIDistributor", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "epoch", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }, { "internalType": "uint256", "name": "number", "type": "uint256" }, { "internalType": "uint256", "name": "end", "type": "uint256" }, { "internalType": "uint256", "name": "distribute", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "forfeit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "index", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rebase", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "sHUMP", "outputs": [{ "internalType": "contractIsHUMP", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "secondsToNextEpoch", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contractIWhaleAuthority", "name": "_newAuthority", "type": "address" }], "name": "setAuthority", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_distributor", "type": "address" }], "name": "setDistributor", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_warmupPeriod", "type": "uint256" }], "name": "setWarmupLength", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "bool", "name": "_claim", "type": "bool" }], "name": "stake", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "supplyInWarmup", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "toggleLock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "bool", "name": "_trigger", "type": "bool" }], "name": "unstake", "outputs": [{ "internalType": "uint256", "name": "amount_", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "warmupInfo", "outputs": [{ "internalType": "uint256", "name": "deposit", "type": "uint256" }, { "internalType": "uint256", "name": "gons", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "bool", "name": "lock", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "warmupPeriod", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const sHUMP_ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "epoch", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "rebase", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "LogRebase", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "stakingContract", "type": "address" }], "name": "LogStakingContractUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "epoch", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "totalSupply", "type": "uint256" }], "name": "LogSupply", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner_", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "gons", "type": "uint256" }], "name": "balanceForGons", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "who", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address", "name": "debtor", "type": "address" }, { "internalType": "bool", "name": "add", "type": "bool" }], "name": "changeDebt", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "circulatingSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "debtBalances", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "gonsForBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "index", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_stakingContract", "type": "address" }, { "internalType": "address", "name": "_treasury", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "profit_", "type": "uint256" }, { "internalType": "uint256", "name": "epoch_", "type": "uint256" }], "name": "rebase", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "rebases", "outputs": [{ "internalType": "uint256", "name": "epoch", "type": "uint256" }, { "internalType": "uint256", "name": "rebase", "type": "uint256" }, { "internalType": "uint256", "name": "totalStakedBefore", "type": "uint256" }, { "internalType": "uint256", "name": "totalStakedAfter", "type": "uint256" }, { "internalType": "uint256", "name": "amountRebased", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "blockNumberOccured", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }], "name": "setIndex", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "stakingContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "treasury", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]
const HUMP_ABI = [{"inputs":[{"internalType":"address","name":"_authority","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contractIWhaleAuthority","name":"authority","type":"address"}],"name":"AuthorityUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"authority","outputs":[{"internalType":"contractIWhaleAuthority","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account_","type":"address"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account_","type":"address"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contractIWhaleAuthority","name":"_newAuthority","type":"address"}],"name":"setAuthority","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
const BOBA_CHEF_ABI = [{"inputs":[{"internalType":"contract BobaToken","name":"_boba","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"address","name":"_feeAddress","type":"address"},{"internalType":"uint256","name":"_bobaPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"boba","outputs":[{"internalType":"contract BobaToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bobaPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBoba","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accBobaPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bobaPerBlock","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const HUMP_ADDRESS = "0xfAAec9f866Fa7f34a2c31c2B11D1723Ad4a46446";
const DISTRIBUTOR_ADDRESS = "0x451b58a6AEA8F89f7e3891B6c1Bd057A33bfD99C";
const BOND_ADDRESS = '0x1220A95DAb05318d5F4a6Ceb805B490c221D16Bd';
const sHUMP_ADDRESS = '0xdFC4C68867EF7d279dE2BEbc0341Da85217a98Ac';
const STAKING_ADDRESS = '0x5132e14a2673DA61581364d792E90B926F10bC8e';

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const HUMP_CONTRACT = new ethers.Contract(HUMP_ADDRESS, HUMP_ABI, App.provider);
    const STAKING_HUMP_CONTRACT = new ethers.Contract(STAKING_ADDRESS, HUMP_STAKING_ABI, App.provider);
    const SHUMP_CONTRACT = new ethers.Contract(sHUMP_ADDRESS, sHUMP_ABI, App.provider);
    const humpTotalSupply = await HUMP_CONTRACT.totalSupply();
    const humpDecimals = await HUMP_CONTRACT.decimals();
    const distributorBalance = await HUMP_CONTRACT.balanceOf(DISTRIBUTOR_ADDRESS);

    let userHumpBalance = await HUMP_CONTRACT.balanceOf(App.YOUR_ADDRESS);
    let userStakingBalance = await SHUMP_CONTRACT.balanceOf(App.YOUR_ADDRESS);
    let totalStakingBalance = await HUMP_CONTRACT.balanceOf(STAKING_ADDRESS);

    userHumpBalance = userHumpBalance / 10 ** 9;
    userStakingBalance = userStakingBalance / 10 ** 9;
    totalStakingBalance = totalStakingBalance / 10 ** 9;

    const humpCircSupply = (humpTotalSupply - distributorBalance) / 10 ** humpDecimals;

    const rewardTokenTicker = "HUMP";

    const prices = await getBscPrices();
    const userBalance = await SHUMP_CONTRACT.balanceOf(App.YOUR_ADDRESS);;
    const rewardPrice = getParameterCaseInsensitive(prices, HUMP_ADDRESS)?.usd;
    const userStaked = userBalance / 10 ** 9;
    const userUnstaked = userHumpBalance / 10 ** 9;

    let shumpCircSupply = await SHUMP_CONTRACT.circulatingSupply();
    let _stakingReward = await STAKING_HUMP_CONTRACT.epoch()
    let stakingReward = _stakingReward.distribute;
    let stakingRebase = stakingReward / shumpCircSupply;

    let nextEpochRewards = userStakingBalance * stakingRebase;

    let dayRate = (Math.pow(1 + stakingRebase, 1 * 4) - 1) * 100;
    //let weekRate = (Math.pow(1 + stakingRebase, 7 * 4) - 1) * 100;
    let weekRate = dayRate * 7
    //let stakingAPY = Math.pow(1 + stakingRebase, 365 * 4) * 100;
    let stakingAPY =  dayRate * 365

    const approveAndStakeHUMP = async function () {
        return humpDaoContract_stake(App, HUMP_STAKING_ABI, STAKING_ADDRESS, HUMP_ADDRESS)
    }
    const unstakeHUMP = async function () {
        return humpDaoContract_unstake(App, HUMP_STAKING_ABI, STAKING_ADDRESS)
    }

    const usdHumpStaking = userStakingBalance * rewardPrice;
    const apyDay = parseFloat(dayRate.toString()).toFixed(2);
    const apyWeek = parseFloat(weekRate.toString()).toFixed(2)
    const apyYear = parseFloat(stakingAPY.toString()).toFixed(2);
    const amountHumpDay = ((userStakingBalance) * (dayRate / 100)).toFixed(4);
    const amountHumpWeek = ((userStakingBalance) * (weekRate / 100)).toFixed(4);
    const amountHumpYear = ((userStakingBalance) * (stakingAPY / 100)).toFixed(4);
    const dexguruTokenlink = `<a href='https://dex.guru/token/${HUMP_ADDRESS.toLowerCase()}-bsc' rel='noopener' target='_blank'>[%]</a>`;
    _print(`<a href='https://bscscan.com/address/${HUMP_ADDRESS}' target='_blank'>${rewardTokenTicker}</a> Price: $${formatMoney(rewardPrice)} Circulating Market Cap: $${formatMoney(rewardPrice * humpCircSupply)} ${dexguruTokenlink}`);
    _print(`Staked: ${parseFloat(totalStakingBalance.toString()).toFixed(4)} ${rewardTokenTicker} ($${formatMoney(totalStakingBalance * rewardPrice)})`)
    _print(`You are staking ${parseFloat(userStakingBalance.toString()).toFixed(4)} ${rewardTokenTicker} ($${formatMoney(usdHumpStaking)})`)
    _print(`APR: Day ${apyDay}% (${amountHumpDay} HUMP) Week ${apyWeek}% (${amountHumpWeek} HUMP) Year ${apyYear}% (${amountHumpYear} HUMP)`)
    _print_link(`Stake ${parseFloat(userHumpBalance.toString()).toFixed(4)} ${rewardTokenTicker}`, approveAndStakeHUMP)
    _print_link(`Unstake ${parseFloat(userStakingBalance.toString()).toFixed(4)} ${rewardTokenTicker}`, unstakeHUMP)
    _print(`\n`);

    hideLoading();
}

const humpDaoContract_stake = async function (App, humpDaoAbi, humpDaoAddress, humpAddress) {
    const signer = App.provider.getSigner()

    const STAKING_TOKEN = new ethers.Contract(humpAddress, sHUMP_ABI, signer)
    const HUMP_DAO_CONTRACT = new ethers.Contract(humpDaoAddress, humpDaoAbi, signer)

    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, humpDaoAddress)

    let allow = Promise.resolve()

    if (allowedTokens / 1 < currentTokens / 1) {
        showLoading()
        allow = STAKING_TOKEN.approve(humpDaoAddress, ethers.constants.MaxUint256)
            .then(function (t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function () {
                hideLoading()
                alert('Try resetting your approval to 0 first')
            })
    }

    if (currentTokens / 1 > 0) {
        showLoading()
        allow
            .then(async function () {
                HUMP_DAO_CONTRACT.stakeHUMP(currentTokens, { gasLimit: 500000 })
                    .then(function (t) {
                        App.provider.waitForTransaction(t.hash).then(function () {
                            hideLoading()
                        })
                    })
                    .catch(function () {
                        hideLoading()
                        _print('Something went wrong.')
                    })
            })
            .catch(function () {
                hideLoading()
                _print('Something went wrong.')
            })
    } else {
        alert('You have no tokens to stake!!')
    }
}

const humpDaoContract_unstake = async function (App, humpDaoAbi, humpDaoAddress) {
    const signer = App.provider.getSigner()

    const HUMP_DAO_CONTRACT = new ethers.Contract(humpDaoAddress, humpDaoAbi, signer);
    const SHUMP_CONTRACT = new ethers.Contract(sHUMP_ADDRESS, sHUMP_ABI, signer);

    const currentStakedAmount = await SHUMP_CONTRACT.balanceOf(App.YOUR_ADDRESS)

    if (parseFloat(currentStakedAmount.toString()) > 0) {
        showLoading()
        HUMP_DAO_CONTRACT.unstakeHUMP(currentStakedAmount, { gasLimit: 500000 })
            .then(function (t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function () {
                hideLoading()
            })
    }
}

const humpDaoContract_claim = async function (App, humpDaoAbi, humpDaoAddress) {
    const signer = App.provider.getSigner()

    const HUMP_DAO_CONTRACT = new ethers.Contract(humpDaoAddress, humpDaoAbi, signer)

    const currentEarnedAmount = await HUMP_DAO_CONTRACT.pendingRewards(App.YOUR_ADDRESS)

    if (currentEarnedAmount > 0) {
        showLoading()
        HUMP_DAO_CONTRACT.claimRewards({ gasLimit: 500000 })
            .then(function (t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function () {
                hideLoading()
            })
    }
}