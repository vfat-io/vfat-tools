
$(function() {
  consoleInit(main)
});

const MASTER_CHARGE_ABI =[{"inputs":[{"internalType":"contract IERC20Metadata","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerSecond","type":"uint256"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_bonusEndTime","type":"uint256"},{"internalType":"contract IPancakeRouter02","name":"_router","type":"address"},{"internalType":"address[]","name":"_rewardToStablePath","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakedToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"strategy","type":"address"}],"name":"AddSentryStrategy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenRecovered","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AdminTokenRecovery","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"NewDevAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"point","type":"uint256"}],"name":"NewDevRewardPoint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"NewProjectAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"point","type":"uint256"}],"name":"NewProjectRewardPoint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerSecond","type":"uint256"}],"name":"NewRewardPerSecond","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endTime","type":"uint256"}],"name":"NewStartAndEndTime","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"strategy","type":"address"}],"name":"RemoveSentryStrategy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"RewardsStop","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"UpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sanctionsList","type":"address"}],"name":"UpdateSanctionsList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"APR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRECISION_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"TVL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"addAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_stakedToken","type":"address"},{"internalType":"contract IStrategy","name":"_strategy","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISentryStrategy","name":"strategy","type":"address"}],"name":"addSentryStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bonusEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"delAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devRewardPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAddressLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"isAddressOf","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"numPools","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"stakedToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accTokenPerShare","type":"uint256"},{"internalType":"contract IStrategy","name":"strategy","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"projectAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"projectRewardPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"recoverWrongTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISentryStrategy","name":"strategy","type":"address"}],"name":"removeSentryStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardToStablePath","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20Metadata","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"contract IPancakeRouter02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sanctionsList","outputs":[{"internalType":"contract ISanctionsList","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"sentryStrategies","outputs":[{"internalType":"contract ISentryStrategy","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"stakedLockedTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"stakedTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stopReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_devAddress","type":"address"}],"name":"updateDevAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_devRewardPoint","type":"uint256"}],"name":"updateDevRewardPoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_projectAddress","type":"address"}],"name":"updateProjectAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectRewardPoint","type":"uint256"}],"name":"updateProjectRewardPoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerSecond","type":"uint256"}],"name":"updateRewardPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISanctionsList","name":"_sanctionsList","type":"address"}],"name":"updateSanctionsList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_bonusEndTime","type":"uint256"}],"name":"updateStartAndEndTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whitelisterRole","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const STRAT_ABI = [{"inputs":[{"internalType":"address","name":"_masterCharge","type":"address"},{"internalType":"contract IERC20","name":"_stakedToken","type":"address"},{"internalType":"contract IERC20","name":"_earnedToken","type":"address"},{"internalType":"address","name":"_farm","type":"address"},{"internalType":"address","name":"_earner","type":"address"},{"internalType":"contract IPancakeRouter02","name":"_router","type":"address"},{"internalType":"address[]","name":"_stakingTokenOrLP0ToStable","type":"address[]"},{"internalType":"address[]","name":"_stakingLP1ToStable","type":"address[]"},{"internalType":"bool","name":"_stakedIsLp","type":"bool"},{"internalType":"uint256","name":"_poolId","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenRecovered","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AdminTokenRecovery","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"earner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Earn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earnedToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"earnerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"earnerRole","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterCharge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"recoverWrongTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"contract IPancakeRouter02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakedIsLp","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakedLockedTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakedToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakedTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakingLP1ToStable","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakingTokenOrLP0ToStable","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]
const CHARGE_DEFI_TREASURY_ABI = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "seigniorage", "type": "uint256" } ], "name": "BoardroomFunded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "BoughtBonds", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "executor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "at", "type": "uint256" } ], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "target", "type": "address" } ], "name": "Migration", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "RedeemedBonds", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" } ], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" } ], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" } ], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "seigniorage", "type": "uint256" } ], "name": "TreasuryFunded", "type": "event" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "PERIOD", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "boardroomAllocation", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "bond", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "bondDepletionFloorPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "bondRepayPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "contractionIndex", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "devAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "devPercentage", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "dollar", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "dollarOracle", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "dollarPriceCeiling", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "dollarPriceOne", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "epoch", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "epochSupplyContractionLeft", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "epochsUnderPeg", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "expansionIndex", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" } ], "name": "getRoleAdmin", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "getRoleMember", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" } ], "name": "getRoleMemberCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" } ], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" } ], "name": "hasRole", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "initialized", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "maxDeptRatioPercent", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "migrated", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" } ], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" } ], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "seigniorageSaved", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "share", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "startTime", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "triggerRebaseNumEpochFloor", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "triggerRebasePriceCeiling", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "isMigrated", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "isInitialized", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "nextEpochPoint", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getDollarPrice", "outputs": [ { "internalType": "uint256", "name": "dollarPrice", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getReserve", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "address", "name": "_dollar", "type": "address" }, { "internalType": "address", "name": "_bond", "type": "address" }, { "internalType": "address", "name": "_share", "type": "address" }, { "internalType": "uint256", "name": "_startTime", "type": "uint256" }, { "internalType": "address", "name": "_devAddress", "type": "address" }, { "internalType": "address", "name": "_boardroomAllocation", "type": "address" }, { "internalType": "address", "name": "_dollarOracle", "type": "address" } ], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "int256", "name": "_contractionIndex", "type": "int256" } ], "name": "setContractionIndex", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "int256", "name": "_expansionIndex", "type": "int256" } ], "name": "setExpansionIndex", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_bondRepayPercent", "type": "uint256" } ], "name": "setBondRepayPercent", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_devPercentage", "type": "uint256" } ], "name": "setDevPercentage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_devAddress", "type": "address" } ], "name": "setDevAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_dollarOracle", "type": "address" } ], "name": "setDollarOracle", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_dollarPriceCeiling", "type": "uint256" } ], "name": "setDollarPriceCeiling", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_triggerRebasePriceCeiling", "type": "uint256" } ], "name": "setTriggerRebasePriceCeiling", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_triggerRebaseNumEpochFloor", "type": "uint256" } ], "name": "setTriggerRebaseNumEpochFloor", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "target", "type": "address" } ], "name": "migrate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "buyBonds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "redeemBonds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "allocateSeigniorage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract IERC20", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "address", "name": "_to", "type": "address" } ], "name": "governanceRecoverUnsupported", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
const CHARGE_DEFI_BOARDROOM_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_cash","type":"address"},{"internalType":"contract IERC20","name":"_share","type":"address"},{"internalType":"contract IERC20","name":"_wantToken","type":"address"},{"internalType":"contract ITreasury","name":"_treasury","type":"address"},{"internalType":"contract IPancakeRouter02","name":"_router","type":"address"},{"internalType":"contract IZapper","name":"_zapper","type":"address"},{"internalType":"address[]","name":"_cashToStablePath","type":"address[]"},{"internalType":"address[]","name":"_shareToStablePath","type":"address[]"},{"internalType":"address[]","name":"_shareToCashPath","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"cashRewards","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shareRewards","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BoardroomCompound","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"executor","type":"address"},{"indexed":false,"internalType":"uint256","name":"at","type":"uint256"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldTreasury","type":"address"},{"indexed":true,"internalType":"address","name":"newTreasury","type":"address"}],"name":"NewTreasury","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldZapper","type":"address"},{"indexed":true,"internalType":"address","name":"newZapper","type":"address"}],"name":"NewZapper","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"cashReward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shareReward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"cashReward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shareReward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"cashAmount","type":"uint256"},{"internalType":"uint256","name":"shareAmount","type":"uint256"}],"name":"allocateSeigniorage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"allocatorRole","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"boardHistory","outputs":[{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"cashRewardReceived","type":"uint256"},{"internalType":"uint256","name":"cashRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"shareRewardReceived","type":"uint256"},{"internalType":"uint256","name":"shareRewardPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"director","type":"address"}],"name":"canClaimReward","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"director","type":"address"}],"name":"canWithdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cash","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cashToStablePath","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"compound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"directors","outputs":[{"internalType":"uint256","name":"lastSnapshotIndex","type":"uint256"},{"internalType":"uint256","name":"cashRewardEarned","type":"uint256"},{"internalType":"uint256","name":"shareRewardEarned","type":"uint256"},{"internalType":"uint256","name":"epochTimerStart","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"director","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"epoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getDollarPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"director","type":"address"}],"name":"getLastSnapshotIndexOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestSnapshotIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextEpochPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardLockupEpochs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"contract IPancakeRouter02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawLockupEpochs","type":"uint256"},{"internalType":"uint256","name":"_rewardLockupEpochs","type":"uint256"}],"name":"setLockUp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ITreasury","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IZapper","name":"_zapper","type":"address"}],"name":"setZapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"share","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"shareToCashPath","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"shareToStablePath","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"contract ITreasury","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wantToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawLockupEpochs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"zapper","outputs":[{"internalType":"contract IZapper","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
const CHARGE_ABI = [ { "inputs": [ { "internalType": "uint256", "name": "_maxCap", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "mintLimit", "type": "uint256" } ], "name": "MinterRegistered", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "account", "type": "address" } ], "name": "MinterRemoved", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "oldLimit", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "mintLimit", "type": "uint256" } ], "name": "MinterUpdated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "newMaxCap", "type": "uint256" } ], "name": "NewMaxCap", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" } ], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" } ], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" } ], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "minter_", "type": "address" }, { "internalType": "uint256", "name": "amount_", "type": "uint256" } ], "name": "canMint", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" } ], "name": "getRoleAdmin", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "getRoleMember", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" } ], "name": "getRoleMemberCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" } ], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" } ], "name": "hasRole", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "maxCap", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient_", "type": "address" }, { "internalType": "uint256", "name": "amount_", "type": "uint256" } ], "name": "mint", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "minter_", "type": "address" } ], "name": "mintLimitOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "minter_", "type": "address" } ], "name": "mintedAmountOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "minter_", "type": "address" }, { "internalType": "uint256", "name": "amount_", "type": "uint256" } ], "name": "registerMinter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "minter_", "type": "address" } ], "name": "removeMinter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" } ], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" } ], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "maxCap_", "type": "uint256" } ], "name": "updateMaxCap", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "minter_", "type": "address" }, { "internalType": "uint256", "name": "amount_", "type": "uint256" } ], "name": "updateMinter", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const CHARGE_STATIC_USDC_CHEF_ADDRESS = "0xa6928d38b7aec7f0e5be63e29e38172a07fcdd5f";
  const CHARGE_CHARGE_USDC_CHEF_ADDRESS = "0xc8f6170eeff4d92b773fc8018ee8562f45864301";
  const CHARGE_ADDRESS = "0xe74621a75c6ada86148b62eef0894e05444eae69";
  const STATIC_ADDRESS = "0x27182c8b647fd83603bb442c0e450de7445ccfb8";
  const USDC_ADDRESS = "0x04068da6c83afcfa0e13ba15a6696662335d5b75";
  const STATIC_LP_ADDRESS = "0x34011465A924C554220E768dcB27d59124Ce3Fa6";
  const CHARGE_LP_ADDRESS = "0x5d2e8a24028F5749eC58b053B38D5aaFa57c2691";

  const usdcToken = new ethers.Contract(USDC_ADDRESS, CHARGE_ABI, App.provider.getSigner());



  const tokens = {};
  //bscTokens.push({ "id": "bolt-true-share", "symbol": "BTS", "contract": "0xc2e1acef50ae55661855e8dcb72adb182a3cc259" })
  const prices = await getFantomPrices();


  const staticToken = new ethers.Contract(STATIC_ADDRESS, CHARGE_ABI, App.provider.getSigner());
  const staticBalance = (await staticToken.balanceOf(App.YOUR_ADDRESS)) / 1e18;
  const staticTotalSupply = (await staticToken.totalSupply()) / 1e18;
  const staticPrice = ((await usdcToken.balanceOf(STATIC_LP_ADDRESS))/(await staticToken.balanceOf(STATIC_LP_ADDRESS)));


  const chargeToken = new ethers.Contract(CHARGE_ADDRESS, CHARGE_ABI, App.provider.getSigner());
  const chargeBalance = (await chargeToken.balanceOf(App.YOUR_ADDRESS)) / 1e18;
  const chargeTotalSupply = (await chargeToken.totalSupply()) / 1e18;
  const chargeMaxSupply = (await chargeToken.maxCap()) / 1e18;
  const chargePrice = ((await usdcToken.balanceOf(CHARGE_LP_ADDRESS))/(await chargeToken.balanceOf(CHARGE_LP_ADDRESS)));


  let table = `<table style="width:400px"><tbody><tr>`
      +`<td style="width:100px"><img src="https://www.chargedefi.fi/static/media/static-wb.110b300e.png" style="height:64px"/></td>`
      +`<td style="width:300px">Current Supply: ${parseFloat(staticTotalSupply).toFixed(0)} Static`
      +`<br>Fully diluted marketcap: $${formatMoney(staticPrice * staticTotalSupply)}`
      +`<br><b>Price: 1 Static = $${parseFloat(staticPrice).toFixed(4)}</b>`
      +`<br>Your balance: <b>${parseFloat(staticBalance).toFixed(2)} Static = $${formatMoney(staticBalance*staticPrice)}</b>`
      +`</td></tr></tbody></table>`;
  _print(table)

  table = `<table style="width:400px"><tbody><tr>`
      +`<td style="width:100px"><img src="https://www.chargedefi.fi/static/media/charge-wb.2725bf56.png" style="height:64px"/></td>`
      +`<td style="width:300px">Current Supply: ${parseFloat(chargeTotalSupply).toFixed(0)} Charge`
      +`<br>Max Supply: ${parseFloat(chargeMaxSupply).toFixed(0)} Charge`
      +`<br>Fully diluted marketcap: $${formatMoney(chargePrice * chargeMaxSupply)}`
      +`<br><b>Price: 1 Charge = $${parseFloat(chargePrice).toFixed(4)}</b>`
      +`<br>Your balance: <b>${parseFloat(chargeBalance).toFixed(4)} Charge = $${formatMoney(chargeBalance*chargePrice)}</b>`
      +`</td></tr></tbody></table>`;
  _print(table)

  _print()
  _print()

  // TREASURY
  const treasuryContract = new ethers.Contract("0x5bbd7aa3cb2300b0b316b1844983bc717256db26", CHARGE_DEFI_TREASURY_ABI, App.provider.getSigner())
  const period = (await treasuryContract.PERIOD()) / 3600;
  const current_epoch = await treasuryContract.epoch();
  const next_epoch = await treasuryContract.nextEpochPoint();
  const now = Math.floor(Date.now() / 1000);
  var seconds_until_next_epoch = next_epoch - now;
  var hours_until_next_epoch = Math.floor(seconds_until_next_epoch / 3600); seconds_until_next_epoch = seconds_until_next_epoch - hours_until_next_epoch * 3600;
  var minutes_until_next_epoch = Math.floor(seconds_until_next_epoch / 60); seconds_until_next_epoch = seconds_until_next_epoch - minutes_until_next_epoch * 60;

  _print(`***************************************************`);
  _print(`                TREASURY INFORMATION`);
  _print(`***************************************************`);
  _print(`Epoch duration = ${period} hours`)
  _print(`Current epoch = ${current_epoch}`)
  _print(`Next epoch in ${hours_until_next_epoch}h ${minutes_until_next_epoch}m ${seconds_until_next_epoch}s`)
  _print('')
  _print('')

  _print(`***************************************************`);
  _print(`                CHARGE BOARDROOM`);
  _print(`***************************************************`);
  await printBoardroom(App, "0x7e8ecc1671e01788ec2fe9090c71e54cb6ad0110", CHARGE_DEFI_BOARDROOM_ABI, current_epoch, period, false, staticPrice, chargePrice, chargePrice, chargeToken, chargeBalance, "Charge");
  _print('')
  _print('')

  _print(`***************************************************`);
  _print(`                STATIC-USDC BOARDROOM`);
  _print(`***************************************************`);

  const lpContract = new ethers.Contract(STATIC_LP_ADDRESS, ABI.UNI_V2, App.provider.getSigner());
  const tokensInPool = (await staticToken.balanceOf(STATIC_LP_ADDRESS)) / 1e18;
  const usdcInPool = (await usdcToken.balanceOf(STATIC_LP_ADDRESS)) / 1e18;
  const totalLPtokens = (await lpContract.totalSupply()) / 1e18;
  const tokenPerLP = tokensInPool / totalLPtokens;
  const usdcPerLP = usdcInPool / totalLPtokens;
  var token_price = staticPrice;
  var usdc_price = 1;
  var pricePerLP = tokenPerLP * token_price + usdcPerLP * usdc_price;
  const staticUsdcBalance = (await lpContract.balanceOf(App.YOUR_ADDRESS)) / 1e18
  await printBoardroom(App, "0xf6dfee99a7f2ce4431b641d1154b6c1b192a839c", CHARGE_DEFI_BOARDROOM_ABI, current_epoch, period, true, staticPrice, chargePrice, pricePerLP, lpContract, staticUsdcBalance, "Static-USDC");
  _print('')
  _print('')

  await printFarms(App, tokens, prices, CHARGE_STATIC_USDC_CHEF_ADDRESS, CHARGE_CHARGE_USDC_CHEF_ADDRESS, MASTER_CHARGE_ABI);

  hideLoading();
}

async function printBoardroom(App, boardroomAddress, abi, current_epoch, period, doubleReward, reward0Price, reward1Price, stakedTokenPrice, stakedToken, stakedTokenBalance, stakedTokenName) {
  const boardRoomContract = new ethers.Contract(boardroomAddress, abi, App.provider.getSigner())
  const inRoomBalance = await boardRoomContract.balanceOf(App.YOUR_ADDRESS)
  const inBoardRoom = (inRoomBalance) / 10 ** 18
  const boardRoomEarned = await boardRoomContract.earned(App.YOUR_ADDRESS);
  const reward0Earned = boardRoomEarned[0]/ 10 ** 18
  const reward1Earned = boardRoomEarned[1]/ 10 ** 18
  const boardRoomTotalSupply = (await boardRoomContract.totalSupply()) / 10 ** 18
  const latestSnapshotIndex = (await boardRoomContract.latestSnapshotIndex())
  const directors = await boardRoomContract.directors(App.YOUR_ADDRESS)
  const last_action_epoch = directors[0];
  const epochs_since_last_action = current_epoch - last_action_epoch;
  const lastHistory = (await boardRoomContract.boardHistory(latestSnapshotIndex));
  const lastRewards0PerShare = lastHistory[2];
  const lastRewards1PerShare = lastHistory[4];

  const prevHistory = (await boardRoomContract.boardHistory(latestSnapshotIndex-1));
  const prevRewards0PerShare = prevHistory[2];
  const prevRewards1PerShare = prevHistory[4];
  const epochRewards0PerShare = (lastRewards0PerShare - prevRewards0PerShare) / 1e18;
  const epochRewards1PerShare = (lastRewards1PerShare - prevRewards1PerShare) / 1e18;

  const rewards0PerYear = epochRewards0PerShare*(24/period)*365*reward0Price;
  const rewards1PerYear = epochRewards1PerShare*(24/period)*365*reward1Price;
  const apr = (rewards0PerYear + rewards1PerYear) *100 / stakedTokenPrice;

  const claimBoardRoomReward = async function() {
      return harvestBoardRoom(boardRoomContract, App)
  }
  const exitBR = async function() {
      return exitBoardRoom(boardRoomContract, App)
  }
  const approveFunc = async function() {
      return approve(stakedToken, boardroomAddress, ethers.utils.parseEther(`${stakedTokenBalance}`), App)
  }
  const revokeFunc = async function() {
      return revoke(stakedToken, boardroomAddress, App)
  }
  const stakeFunc = async function() {
      return stakeBR(boardRoomContract, ethers.utils.parseEther(`${stakedTokenBalance}`), App)
  }
  const unstakeFunc = async function() {
      return unstakeBR(boardRoomContract, inRoomBalance, App)
  }

  _print(`There are ${parseFloat(boardRoomTotalSupply).toFixed(0)} tokens staked in the boardroom`);
  _print(`(Total Value Locked: $${formatMoney(boardRoomTotalSupply * stakedTokenPrice)})`)

  const reward0PerTokenStr = `Static/${stakedTokenName}`;
  const reward1PerTokenStr = `Charge/${stakedTokenName}`;


  if(!doubleReward) {
      table = `<table style="width:800px"><thead><th style="width:30px;text-align:left"></th><th style="width:20px;text-align:left">Epoch (${period} hours)</th><th style="width:20px;text-align:left">Day</th><th style="width:20px;text-align:left">Week</th><th style="width:20px;text-align:left">Month</th><th style="width:20px;text-align:left">Year</th></thead>`
          + `<tbody>`

          + `<tr><td>APR</td>`
          + `<td>${parseFloat(apr / 365 / (24 / period)).toFixed(2)}%</td>`
          + `<td>${parseFloat(apr / 365).toFixed(2)}%</td>`
          + `<td>${parseFloat(apr / 52).toFixed(2)}%</td>`
          + `<td>${parseFloat(apr / 12).toFixed(2)}%</td>`
          + `<td>${parseFloat(apr).toFixed(2)}%</td>`
          + `</tr>`

          + `<tr><td>${reward0PerTokenStr}</td>`
          + `<td>${parseFloat(epochRewards0PerShare).toFixed(2)}</td>`
          + `<td>${parseFloat(epochRewards0PerShare * (24 / period)).toFixed(2)}</td>`
          + `<td>${parseFloat(epochRewards0PerShare * (24 / period) * 7).toFixed(2)}</td>`
          + `<td>${parseFloat(epochRewards0PerShare * (24 / period) * 365 / 12).toFixed(2)}</td>`
          + `<td>${parseFloat(epochRewards0PerShare * (24 / period) * 365).toFixed(2)}</td>`
          + `</tr>`

          + `<tr><td>Static Yield for<br><b>${inBoardRoom.toFixed(2)} ${stakedTokenName}</b></td>`
          + `<td>${parseFloat(inBoardRoom * epochRewards0PerShare).toFixed(2)}   ($${formatMoney(reward0Price * inBoardRoom * epochRewards0PerShare)})</td>`
          + `<td>${parseFloat(inBoardRoom * epochRewards0PerShare * (24 / period)).toFixed(2)}   ($${formatMoney(reward0Price * inBoardRoom * epochRewards0PerShare * (24 / period))})</td>`
          + `<td>${parseFloat(inBoardRoom * epochRewards0PerShare * (24 / period) * 7).toFixed(2)}   ($${formatMoney(reward0Price * inBoardRoom * epochRewards0PerShare * (24 / period) * 7)})</td>`
          + `<td>${parseFloat(inBoardRoom * epochRewards0PerShare * (24 / period) * 365 / 12).toFixed(2)}   ($${formatMoney(reward0Price * inBoardRoom * epochRewards0PerShare * (24 / period) * 365 / 12)})</td>`
          + `<td>${parseFloat(inBoardRoom * epochRewards0PerShare * (24 / period) * 365).toFixed(2)}   ($${formatMoney(reward0Price * inBoardRoom * epochRewards0PerShare * (24 / period) * 365)})</td>`
          + `</tr>`

          + `</tbody></table>`;
      _print(table);
  } else {
      table = `<table style="width:800px"><thead><th style="width:30px;text-align:left"></th><th style="width:20px;text-align:left">Epoch (${period} hours)</th><th style="width:20px;text-align:left">Day</th><th style="width:20px;text-align:left">Week</th><th style="width:20px;text-align:left">Month</th><th style="width:20px;text-align:left">Year</th></thead>`
          + `<tbody>`

          + `<tr><td>APR</td>`
          + `<td>${parseFloat(apr / 365 / (24 / period)).toFixed(2)}%</td>`
          + `<td>${parseFloat(apr / 365).toFixed(2)}%</td>`
          + `<td>${parseFloat(apr / 52).toFixed(2)}%</td>`
          + `<td>${parseFloat(apr / 12).toFixed(2)}%</td>`
          + `<td>${parseFloat(apr).toFixed(2)}%</td>`
          + `</tr>`

          + `<tr><td>${reward0PerTokenStr}</td>`
          + `<td>${parseFloat(epochRewards0PerShare).toFixed(2)}</td>`
          + `<td>${parseFloat(epochRewards0PerShare * (24 / period)).toFixed(2)}</td>`
          + `<td>${parseFloat(epochRewards0PerShare * (24 / period) * 7).toFixed(2)}</td>`
          + `<td>${parseFloat(epochRewards0PerShare * (24 / period) * 365 / 12).toFixed(2)}</td>`
          + `<td>${parseFloat(epochRewards0PerShare * (24 / period) * 365).toFixed(2)}</td>`
          + `</tr>`

          + `<tr><td>Static Yield for<br><b>${inBoardRoom.toFixed(2)} ${stakedTokenName}</b></td>`
          + `<td>${parseFloat(inBoardRoom * epochRewards0PerShare).toFixed(2)}   ($${formatMoney(reward0Price * inBoardRoom * epochRewards0PerShare)})</td>`
          + `<td>${parseFloat(inBoardRoom * epochRewards0PerShare * (24 / period)).toFixed(2)}   ($${formatMoney(reward0Price * inBoardRoom * epochRewards0PerShare * (24 / period))})</td>`
          + `<td>${parseFloat(inBoardRoom * epochRewards0PerShare * (24 / period) * 7).toFixed(2)}   ($${formatMoney(reward0Price * inBoardRoom * epochRewards0PerShare * (24 / period) * 7)})</td>`
          + `<td>${parseFloat(inBoardRoom * epochRewards0PerShare * (24 / period) * 365 / 12).toFixed(2)}   ($${formatMoney(reward0Price * inBoardRoom * epochRewards0PerShare * (24 / period) * 365 / 12)})</td>`
          + `<td>${parseFloat(inBoardRoom * epochRewards0PerShare * (24 / period) * 365).toFixed(2)}   ($${formatMoney(reward0Price * inBoardRoom * epochRewards0PerShare * (24 / period) * 365)})</td>`
          + `</tr>`


          +`<tr><td>${reward1PerTokenStr}</td>`
          + `<td>${parseFloat(epochRewards1PerShare).toFixed(4)}</td>`
          + `<td>${parseFloat(epochRewards1PerShare * (24 / period)).toFixed(4)}</td>`
          + `<td>${parseFloat(epochRewards1PerShare * (24 / period) * 7).toFixed(4)}</td>`
          + `<td>${parseFloat(epochRewards1PerShare * (24 / period) * 365 / 12).toFixed(4)}</td>`
          + `<td>${parseFloat(epochRewards1PerShare * (24 / period) * 365).toFixed(4)}</td>`
          + `</tr>`

          +`<tr><td>Charge Yield for<br><b>${inBoardRoom.toFixed(2)} ${stakedTokenName}</b></td>`
          +`<td>${parseFloat(inBoardRoom*epochRewards1PerShare).toFixed(2)}   ($${formatMoney(reward1Price*inBoardRoom*epochRewards1PerShare)})</td>`
          +`<td>${parseFloat(inBoardRoom*epochRewards1PerShare*(24/period)).toFixed(2)}   ($${formatMoney(reward1Price*inBoardRoom*epochRewards1PerShare*(24/period))})</td>`
          +`<td>${parseFloat(inBoardRoom*epochRewards1PerShare*(24/period)*7).toFixed(2)}   ($${formatMoney(reward1Price*inBoardRoom*epochRewards1PerShare*(24/period)*7)})</td>`
          +`<td>${parseFloat(inBoardRoom*epochRewards1PerShare*(24/period)*365/12).toFixed(2)}   ($${formatMoney(reward1Price*inBoardRoom*epochRewards1PerShare*(24/period)*365/12)})</td>`
          +`<td>${parseFloat(inBoardRoom*epochRewards1PerShare*(24/period)*365).toFixed(2)}   ($${formatMoney(reward1Price*inBoardRoom*epochRewards1PerShare*(24/period)*365)})</td>`
          +`</tr>`

          + `</tbody></table>`;
      _print(table);
  }

  _print(`You have staked <b>${parseFloat(inBoardRoom).toFixed(4)} ${stakedTokenName} ($${formatMoney(stakedTokenPrice*inBoardRoom)})</b>`)
  if (epochs_since_last_action<3) {
      _print(`You have to wait ${3-epochs_since_last_action} more epochs to be able to claim rewards!`)
  }
  _print(`Your claimable static rewards: <b>${parseFloat(reward0Earned).toFixed(2)} Static ($${formatMoney(reward0Earned * reward0Price)})</b>`)

  if(doubleReward) {
      _print(`Your claimable charge rewards: <b>${parseFloat(reward1Earned).toFixed(2)} Charge ($${formatMoney(reward1Earned * reward1Price)})</b>`)
  }
  if (epochs_since_last_action<6) {
      _print(`You have to wait ${6-epochs_since_last_action} more epochs to be able to unstake from boardroom!`)
  }
  _print('')

  _print_link(`Approve ${parseFloat(stakedTokenBalance).toFixed(2)} tokens`, approveFunc)
  _print_link(`Stake ${parseFloat(stakedTokenBalance).toFixed(2)} tokens`, stakeFunc)
  _print_link(`Unstake ${parseFloat(inBoardRoom).toFixed(2)}  tokens`, unstakeFunc)
  if(!doubleReward) {
      _print_link(`Claim ${reward0Earned.toFixed(2)} Static`, claimBoardRoomReward)
  } else {
      _print_link(`Claim ${reward0Earned.toFixed(2)} Static & ${reward1Earned.toFixed(2)} Charge`, claimBoardRoomReward)
  }
  _print_link(`Revoke approval`, revokeFunc)
  _print_link(`Exit`, exitBR)
}

async function printFarms(App, tokens, prices, CHARGE_STATIC_USDC_CHEF_ADDRESS, CHARGE_CHARGE_USDC_CHEF_ADDRESS, MASTER_CHARGE_ABI) {
  const chargeRewardTokenTicker = "Charge";
  const CHARGE_STATIC_USDC_CHEF = new ethers.Contract(CHARGE_STATIC_USDC_CHEF_ADDRESS, MASTER_CHARGE_ABI, App.provider);
  const CHARGE_CHARGE_USDC_CHEF = new ethers.Contract(CHARGE_CHARGE_USDC_CHEF_ADDRESS, MASTER_CHARGE_ABI, App.provider);


  _print('')
  _print('')
  _print(`***************************************************`);
  _print(`                CHARGE FARMS - CHARGE-USDC`);
  _print(`***************************************************`);
  rewardsPerWeek = await CHARGE_CHARGE_USDC_CHEF.rewardPerSecond() /1e18
      * 604800;
  await loadFantomChefContract(App, tokens, prices, CHARGE_CHARGE_USDC_CHEF, CHARGE_CHARGE_USDC_CHEF_ADDRESS, MASTER_CHARGE_ABI, chargeRewardTokenTicker,
      "rewardToken", null, rewardsPerWeek, "pendingReward", [0], 1);


  _print('')
  _print('')

  _print(`***************************************************`);
  _print(`                CHARGE FARMS - STATIC-USDC`);
  _print(`***************************************************`);
  rewardsPerWeek = await CHARGE_STATIC_USDC_CHEF.rewardPerSecond() /1e18
      * 604800;

  await loadFantomChefContract(App, tokens, prices, CHARGE_STATIC_USDC_CHEF, CHARGE_STATIC_USDC_CHEF_ADDRESS, MASTER_CHARGE_ABI, chargeRewardTokenTicker,
      "rewardToken", null, rewardsPerWeek, "pendingReward", [0]);

}

async function loadFantomChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
                                 rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
                                 deathPoolIndices, forcePoolLength) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = forcePoolLength ?? parseInt(await chefContract.numPools(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://ftmscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getFantomToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getChargeDefiPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  const tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getFantomToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
          .map(poolInfo =>
              poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "fantom") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "fantom") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
          const apr = printChargeChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
              totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
              pendingRewardsFunction, null, null, "fantom")
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

async function getChargeDefiPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0 || poolInfo.accTokenPerShare == 0) {
      return {
          address: poolInfo.stakedToken,
          allocPoints: poolInfo.allocPoint ?? 1,
          poolToken: null,
          userStaked : 0,
          pendingRewardTokens : 0,
          stakedToken : null,
          userLPStaked : 0,
          lastRewardBlock : poolInfo.lastRewardBlock
      };
  }
  const poolToken = await getFantomToken(App, poolInfo.stakedToken, poolInfo.strategy);
  const strat = new ethers.Contract(poolInfo.strategy, STRAT_ABI, App.provider);
  poolToken.staked = await strat.stakedLockedTotal() / 1e18;
  const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](App.YOUR_ADDRESS, poolIndex);
  const userStaked = userInfo.amount /1e18;
  return {
      address: poolInfo.stakedToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken,
      userStaked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      stakedToken : null,
      userLPStaked : null,
      lastRewardBlock : poolInfo.lastRewardBlock
  };
}

function printChargeChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                           totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                           pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChargeChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}

function printChargeChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
                                    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
                                    claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
      return chargeChefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
      return chargeChefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  const claim = async function() {
      return chargeChefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  if(depositFee > 0){
      _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
  }else{
      _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  }
  if(withdrawFee > 0){
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
  }else{
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  }
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const chargeChefContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
      showLoading()
      allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
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
              CHEF_CONTRACT.deposit(currentTokens, poolIndex, {gasLimit: 500000})
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

const chargeChefContract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](App.YOUR_ADDRESS, poolIndex) / 1e18

  if (earnedTokenAmount > 0) {
      showLoading()
      CHEF_CONTRACT.withdraw(currentStakedAmount, poolIndex, {gasLimit: 500000})
          .then(function(t) {
              return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
              hideLoading()
          })
  }
}

const chargeChefContract_claim = async function(chefAbi, chefAddress, poolIndex, App,
                                              pendingRewardsFunction, claimFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](App.YOUR_ADDRESS, poolIndex) / 1e18

  if (earnedTokenAmount > 0) {
      showLoading()
      if (claimFunction) {
          claimFunction(poolIndex, {gasLimit: 500000})
              .then(function(t) {
                  return App.provider.waitForTransaction(t.hash)
              })
      }
      else {
          CHEF_CONTRACT.deposit(0, poolIndex, {gasLimit: 500000})
              .then(function(t) {
                  return App.provider.waitForTransaction(t.hash)
              })
              .catch(function() {
                  hideLoading()
              })
      }
  }
}

const chargeChefContract_emergencyWithdraw = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount > 0) {
      showLoading()
      CHEF_CONTRACT.emergencyWithdraw(poolIndex, {gasLimit: 500000})
          .then(function(t) {
              return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
              hideLoading()
          })
  }
}

const stakeBR = async (contract, amount, App) => {
  contract.stake(amount, {
      gasLimit: 250000
  })
      .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
          hideLoading();
      })
}

const unstakeBR = async (contract, amount, App) => {
  contract.withdraw(amount, {
      gasLimit: 250000
  })
      .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
          hideLoading();
      })
}

const harvestBoardRoom = async (contract, App) => {
  contract.claimReward({
      gasLimit: 250000
  })
      .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
          hideLoading();
      })
}

const exitBoardRoom = async (contract, App) => {
  contract.exit({
      gasLimit: 250000
  })
      .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
          hideLoading();
      })
}

const approve = async (contract, spender, amount, App) => {
  contract.approve(spender, amount, {
      gasLimit: 250000
  })
      .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
      })
      .catch(function(e) {
          hideLoading();
      })
}

const revoke = async (contract, spender, App) => {
  contract.approve(spender, 0, {
      gasLimit: 250000
  })
      .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
          hideLoading();
      })
}
