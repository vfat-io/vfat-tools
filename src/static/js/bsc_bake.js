
$(function() {
consoleInit(main)
});

const BAKE_CHEF_ABI = [{"inputs":[{"internalType":"contract BakeryToken","name":"_bake","type":"address"},{"internalType":"address","name":"_devAddr","type":"address"},{"internalType":"uint256","name":"_bakeStartBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusBeforeBulkBlockSize","type":"uint256"},{"internalType":"uint256","name":"_bonusBeforeCommonDifference","type":"uint256"},{"internalType":"uint256","name":"_bonusEndCommonDifference","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accBakePerShareMultiple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"address","name":"_pair","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bake","outputs":[{"internalType":"contract BakeryToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bakeBonusEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bakeStartBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusBeforeBulkBlockSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusBeforeCommonDifference","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusEndBulkBlockSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusEndCommonDifference","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devAddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"existsPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getTotalRewardInfo","outputs":[{"internalType":"uint256","name":"totalReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"},{"internalType":"uint256","name":"_bakeInitBlock","type":"uint256"},{"internalType":"uint256","name":"_bulkBlockSize","type":"uint256"},{"internalType":"uint256","name":"_commonDifference","type":"uint256"}],"name":"getTotalRewardInfoInSameCommonDifference","outputs":[{"internalType":"uint256","name":"totalReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxRewardBlockNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolInfoMap","outputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accBakePerShare","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"poolUserInfoMap","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

 const TOKEN_REWARD_CHEF_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyUnstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenPerBlock","type":"uint256"}],"name":"SetTokenPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"oldTotalToBeMintAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newTotalToBeMintAmount","type":"uint256"}],"name":"SetTotalToBeMintAmount","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstake","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTokenPerShareMultiple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"address","name":"_pair","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyUnstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getTotalReward","outputs":[{"internalType":"uint256","name":"totalReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"},{"internalType":"uint256","name":"_totalToBeMintAmount","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauseStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolInfoMap","outputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accTokenPerShare","type":"uint256"},{"internalType":"bool","name":"exists","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"poolUserInfoMap","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"}],"name":"setTokenPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_totalToBeMintAmount","type":"uint256"}],"name":"setTotalToBeMintAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalToBeMintAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpauseStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"}]
 const DOUBLE_REWARDS_ABI0 = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"bethRoi","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bakeRoi","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardStartBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardEndBlock","type":"uint256"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyUnstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"HarvestBake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"bethAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"HarvestBeth","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"bethRoi","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bakeRoi","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardStartBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardEndBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RemovePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"bethRoi","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bakeRoi","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardStartBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardEndBlock","type":"uint256"}],"name":"SetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstake","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TEN_THOUSANDTH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"YEARLY_BLOCKS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTokenPerShareMultiple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bethRoi","type":"uint256"},{"internalType":"uint256","name":"_bakeRoi","type":"uint256"},{"internalType":"uint256","name":"_rewardStartBlock","type":"uint256"},{"internalType":"uint256","name":"_rewardEndBlock","type":"uint256"},{"internalType":"address","name":"_pair","type":"address"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bake","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bakerySwapFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beth","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_roi","type":"uint256"}],"name":"calculateBakeRoi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_roi","type":"uint256"}],"name":"calculateBakeValueRoi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_roi","type":"uint256"}],"name":"calculateBethRoi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_roi","type":"uint256"}],"name":"calculateBethValueRoi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"convertToBakePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"convertUseMarketPrice","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyUnstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBethBakePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"harvestBake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"harvestBeth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_bake","type":"address"},{"internalType":"address","name":"_beth","type":"address"},{"internalType":"address","name":"_bakerySwapFactory","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pauseStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingToken","outputs":[{"internalType":"uint256","name":"bakeReward","type":"uint256"},{"internalType":"uint256","name":"bethReward","type":"uint256"},{"internalType":"uint256","name":"bethRewardNow","type":"uint256"},{"internalType":"uint256","name":"convertToBakeReward","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"priceMultiple","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolAddresses","outputs":[{"internalType":"address[]","name":"pools","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolInfoMap","outputs":[{"internalType":"uint256","name":"bethRoi","type":"uint256"},{"internalType":"uint256","name":"bakeRoi","type":"uint256"},{"internalType":"uint256","name":"rewardStartBlock","type":"uint256"},{"internalType":"uint256","name":"rewardEndBlock","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"poolUserInfoMap","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"bethRewardDebt","type":"uint256"},{"internalType":"uint256","name":"bethRewardPending","type":"uint256"},{"internalType":"uint256","name":"bakeRewardDebt","type":"uint256"},{"internalType":"uint256","name":"bakeRewardPending","type":"uint256"},{"internalType":"uint256","name":"lastUpdateBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pools","outputs":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"components":[{"internalType":"uint256","name":"bethRoi","type":"uint256"},{"internalType":"uint256","name":"bakeRoi","type":"uint256"},{"internalType":"uint256","name":"rewardStartBlock","type":"uint256"},{"internalType":"uint256","name":"rewardEndBlock","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ETH2Master.PoolInfo[]","name":"poolInfos","type":"tuple[]"},{"internalType":"uint256[]","name":"bethValueRois","type":"uint256[]"},{"internalType":"uint256[]","name":"bakeValueRois","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"removePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_convertToBakePrice","type":"uint256"}],"name":"setConvertToBakePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_convertUseMarketPrice","type":"bool"}],"name":"setConvertUseMarketPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bethRoi","type":"uint256"},{"internalType":"uint256","name":"_bakeRoi","type":"uint256"},{"internalType":"uint256","name":"_rewardStartBlock","type":"uint256"},{"internalType":"uint256","name":"_rewardEndBlock","type":"uint256"},{"internalType":"address","name":"_pair","type":"address"}],"name":"setPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpauseStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}]
 const DOUBLE_REWARDS_ABI1 = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"}],"name":"AddOtherRewardToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardStartBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardEndBlock","type":"uint256"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyUnstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"HarvestToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardStartBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardEndBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RemovePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardStartBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardEndBlock","type":"uint256"}],"name":"SetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"roi","type":"uint256"}],"name":"SetPoolTokenRoi","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstake","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TEN_THOUSANDTH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"YEARLY_BLOCKS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTokenPerShareMultiple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"addOtherRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_otherRois","type":"uint256[]"},{"internalType":"uint256","name":"_bakeRoi","type":"uint256"},{"internalType":"uint256","name":"_rewardStartBlock","type":"uint256"},{"internalType":"uint256","name":"_rewardEndBlock","type":"uint256"},{"internalType":"address","name":"_pool","type":"address"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bake","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bakerySwapFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"convertToBakePriceMap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"convertUseMarketPriceMap","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyUnstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getTokenBakePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"harvestAllOther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"harvestBake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"address","name":"_token","type":"address"}],"name":"harvestOther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_bake","type":"address"},{"internalType":"address","name":"_bakerySwapFactory","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"otherRewardTokens","outputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauseStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingToken","outputs":[{"internalType":"uint256","name":"bakeReward","type":"uint256"},{"internalType":"uint256[]","name":"otherRewards","type":"uint256[]"},{"internalType":"uint256[]","name":"nowOtherRewards","type":"uint256[]"},{"internalType":"uint256[]","name":"otherConvertToBakeRewards","type":"uint256[]"},{"internalType":"uint256[]","name":"otherConvertToBakePrices","type":"uint256[]"},{"internalType":"uint256","name":"priceMultiple","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolAddresses","outputs":[{"internalType":"address[]","name":"pools","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"poolInfoMap","outputs":[{"components":[{"internalType":"uint256[]","name":"otherRois","type":"uint256[]"},{"internalType":"uint256","name":"bakeRoi","type":"uint256"},{"internalType":"uint256","name":"rewardStartBlock","type":"uint256"},{"internalType":"uint256","name":"rewardEndBlock","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct BakeBaseMaster.PoolInfoView","name":"poolInfoView","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"poolUserInfoMap","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"otherRewardDebts","type":"uint256[]"},{"internalType":"uint256[]","name":"otherRewardPendings","type":"uint256[]"},{"internalType":"uint256","name":"bakeRewardDebt","type":"uint256"},{"internalType":"uint256","name":"bakeRewardPending","type":"uint256"},{"internalType":"uint256","name":"lastUpdateBlock","type":"uint256"}],"internalType":"struct BakeBaseMaster.UserInfoView","name":"userInfoView","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pools","outputs":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"address[]","name":"tokens","type":"address[]"},{"components":[{"internalType":"uint256[]","name":"otherRois","type":"uint256[]"},{"internalType":"uint256","name":"bakeRoi","type":"uint256"},{"internalType":"uint256","name":"rewardStartBlock","type":"uint256"},{"internalType":"uint256","name":"rewardEndBlock","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct BakeBaseMaster.PoolInfoView[]","name":"poolInfos","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"removePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_convertToBakePrice","type":"uint256"}],"name":"setConvertToBakePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"bool","name":"_convertUseMarketPrice","type":"bool"}],"name":"setConvertUseMarketPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"uint256","name":"_rewardStartBlock","type":"uint256"},{"internalType":"uint256","name":"_rewardEndBlock","type":"uint256"}],"name":"setPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"uint256[]","name":"_rois","type":"uint256[]"}],"name":"setPoolTokenRoi","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpauseStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}]

 const DOUBLE_REWARDS_ADDR0 = "0xe627f00D5a5bfcE0640E771Af573C41e9a278A20"
 const DOUBLE_REWARDS_ADDR1 = "0xed8732d98ADb5591e9FC9a15BbA7a345B78B3e0E"

 const DOUBLE_REWARDS_CHEF = new ethers.Contract(DOUBLE_REWARDS_ADDR0, DOUBLE_REWARDS_ABI0, App.provider);

 const secondRewardTokenTicker = "BETH"

 const BAKE_CHEF_ADDR = "0x20eC291bB8459b6145317E7126532CE7EcE5056f";
 const TOKEN_REWARD_0_CHEF_ADDR = "0xE3677Db1767E67c45052edF16D665D3C5263abdf";
 const TOKEN_REWARD_1_CHEF_ADDR = "0x4127f84f2B9F922259a10bfb8d32C56428A4E885";
 const TOKEN_REWARD_2_CHEF_ADDR = "0x7a7e491FD948B4c9d4C8A4c6D9A04Efb88dF2b93";
 const TOKEN_REWARD_3_CHEF_ADDR = "0xE4379Fc68a6e91Cb05F917B7De3F9E069C0e9161";
 const TOKEN_REWARD_4_CHEF_ADDR = "0x0c2fC172c822B923f92A17aD9EA5c15aD7332624";
 const rewardTokenTicker = "BAKE";
 const rewardToken0Ticker = "TLM";
 const rewardToken1Ticker = "PET";
 const rewardToken2Ticker = "ALICE";
 const rewardToken3Ticker = "WEAPON";
 const BAKE_CHEF = new ethers.Contract(BAKE_CHEF_ADDR, BAKE_CHEF_ABI, App.provider);
 const TOKEN_REWARD_0_CHEF = new ethers.Contract(TOKEN_REWARD_0_CHEF_ADDR, TOKEN_REWARD_CHEF_ABI, App.provider);
 const TOKEN_REWARD_1_CHEF = new ethers.Contract(TOKEN_REWARD_1_CHEF_ADDR, TOKEN_REWARD_CHEF_ABI, App.provider);
 const TOKEN_REWARD_2_CHEF = new ethers.Contract(TOKEN_REWARD_2_CHEF_ADDR, TOKEN_REWARD_CHEF_ABI, App.provider);
 const TOKEN_REWARD_3_CHEF = new ethers.Contract(TOKEN_REWARD_3_CHEF_ADDR, TOKEN_REWARD_CHEF_ABI, App.provider);
 const TOKEN_REWARD_4_CHEF = new ethers.Contract(TOKEN_REWARD_4_CHEF_ADDR, TOKEN_REWARD_CHEF_ABI, App.provider);

 const currentBlock = await App.provider.getBlockNumber();
 const nextBlock = currentBlock + 1;

 const rewardsPerWeek = 60 * 604800 / 3;
 const rewardsToken0PerWeek = await TOKEN_REWARD_0_CHEF.getTotalReward(currentBlock, nextBlock) / 1e4 * 604800 / 3;
 const rewardsToken1PerWeek = await TOKEN_REWARD_1_CHEF.getTotalReward(currentBlock, nextBlock) / 1e4 * 604800 / 3;
 const rewardsToken2PerWeek = await TOKEN_REWARD_2_CHEF.getTotalReward(currentBlock, nextBlock) / 1e18 * 604800 / 3;
 const rewardsToken3PerWeek = await TOKEN_REWARD_3_CHEF.getTotalReward(currentBlock, nextBlock) / 1e6 * 604800 / 3;
 //const rewardsToken4PerWeek = await TOKEN_REWARD_4_CHEF.tokenPerBlock() * 604800 / 3;

  const tokens = {};
  const prices = await getBscPrices();

  //await loadBakeContract(App, tokens, prices, TOKEN_REWARD_4_CHEF, TOKEN_REWARD_4_CHEF_ADDR, TOKEN_REWARD_CHEF_ABI,
    //rewardToken3Ticker, "token", null, rewardsToken4PerWeek, "pendingToken"); //I have a bug, this is not a verified contract to read

  await loadBakeContract(App, tokens, prices, BAKE_CHEF, BAKE_CHEF_ADDR, BAKE_CHEF_ABI, rewardTokenTicker,
      "bake", null, rewardsPerWeek, "pendingBake");

  await loadBakeContract(App, tokens, prices, TOKEN_REWARD_0_CHEF, TOKEN_REWARD_0_CHEF_ADDR, TOKEN_REWARD_CHEF_ABI,
    rewardToken0Ticker, "token", null, rewardsToken0PerWeek, "pendingToken");

  await loadBakeContract(App, tokens, prices, TOKEN_REWARD_1_CHEF, TOKEN_REWARD_1_CHEF_ADDR, TOKEN_REWARD_CHEF_ABI,
    rewardToken0Ticker, "token", null, rewardsToken1PerWeek, "pendingToken");

  await loadBakeContract(App, tokens, prices, TOKEN_REWARD_2_CHEF, TOKEN_REWARD_2_CHEF_ADDR, TOKEN_REWARD_CHEF_ABI,
    rewardToken1Ticker, "token", null, rewardsToken2PerWeek, "pendingToken");

  await loadBakeContract(App, tokens, prices, TOKEN_REWARD_3_CHEF, TOKEN_REWARD_3_CHEF_ADDR, TOKEN_REWARD_CHEF_ABI,
    rewardToken2Ticker, "token", null, rewardsToken3PerWeek, "pendingToken");

  //await loadDoubleRewardsBakeContract(App, tokens, prices, DOUBLE_REWARDS_CHEF, DOUBLE_REWARDS_ADDR0, DOUBLE_REWARDS_ABI0,
    //rewardTokenTicker, secondRewardTokenTicker);

  hideLoading();
}

async function loadBakeContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();
    
  _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getBscToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBakePoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBscToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo => 
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);


  _print("Finished reading smart contracts.\n");    

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, "bsc", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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

async function getBakePoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const lpToken = await chefContract.poolAddresses(poolIndex);
  const poolInfo = await chefContract.poolInfoMap(lpToken);
  if (poolInfo.allocPoint == 0) {
    return {
      address: lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
      stakedToken : null,
      userLPStaked : 0,
      lastRewardBlock : poolInfo.lastRewardBlock
    };
  }
  const poolToken = await getBscToken(app, lpToken, chefAddress);
  const userInfo = await chefContract.poolUserInfoMap(lpToken, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](lpToken, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  var stakedToken;
  var userLPStaked;
  if (poolInfo.stakedHoldableToken != null &&
    poolInfo.stakedHoldableToken != "0x0000000000000000000000000000000000000000") {
    stakedToken = await getBscToken(app, poolInfo.stakedHoldableToken, chefAddress);
    userLPStaked = userInfo.stakedLPAmount / 10 ** poolToken.decimals
  }
  return {
      address: lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      stakedToken : stakedToken,
      userLPStaked : userLPStaked,
      lastRewardBlock : poolInfo.lastRewardBlock
  };
}

/*async function loadDoubleRewardsBakeContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker1,
  rewardTokenTicker2) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolAddresses = await chefContract.poolAddresses();

  const poolCount = poolAddresses.length;
    
  _print(`<a href='https://bscscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getDoubleRewardBakePoolInfo(App, chefContract, chefAddress, poolAddresses, x)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getBscToken(App, address, chefAddress);
  }));

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "bsc") : undefined);


  _print("Finished reading smart contracts.\n");    

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printDoubleRewardsBakePool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].rewardsPerWeek1, poolInfos[i].rewardsPerWeek2, rewardTokenTicker1, rewardTokenTicker2, poolInfos[i].rewardTokenAddress1, poolInfos[i].rewardTokenAddress2,
        poolInfos[i].pendingRewards1, poolInfos[i].pendingRewards2, null, null, "bsc")
      aprs.push(apr);
    }
  }
  let totalUserStaked=0, totalStaked=0, averageApr1=0, averageApr2=0;
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
      averageApr1 += a.userStakedUsd * a.yearlyAPR1 / 100;
      averageApr2 += a.userStakedUsd * a.yearlyAPR2 / 100;
    }
  }
  averageApr1 = averageApr1 / totalUserStaked;
  averageApr2 = averageApr2 / totalUserStaked;
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
    _print(`Estimated earnings:`
        + ` Day $${formatMoney(totalUserStaked*averageApr1/365)}`
        + ` Week $${formatMoney(totalUserStaked*averageApr1/52)}`
        + ` Year $${formatMoney(totalUserStaked*averageApr1)}\n`);
    _print(`Estimated earnings:`
        + ` Day $${formatMoney(totalUserStaked*averageApr2/365)}`
        + ` Week $${formatMoney(totalUserStaked*averageApr2/52)}`
        + ` Year $${formatMoney(totalUserStaked*averageApr2)}\n`);
  }
  return { prices, totalUserStaked, totalStaked, averageApr1,  averageApr2}

}

async function getDoubleRewardBakePoolInfo(app, chefContract, chefAddress, poolAddresses, poolIndex) {
  const lpToken = poolAddresses[poolIndex];
  const poolInfo = await chefContract.poolInfoMap(lpToken);

  const rewardTokenAddress1 = await chefContract.bake();
  const rewardTokenAddress2 = await chefContract.beth();
  const rewardToken1 = await getBscToken(app, rewardTokenAddress1, chefAddress);
  const rewardToken2 = await getBscToken(app, rewardTokenAddress2, chefAddress);
  const rewardsPerWeek1 = poolInfo.bakeRoi / 10 ** rewardToken1.decimals * 604800 / 3
  const rewardsPerWeek2 = poolInfo.bethRoi / 10 ** rewardToken2.decimals * 604800 / 3

  const poolToken = await getBscToken(app, lpToken, chefAddress);
  const userInfo = await chefContract.poolUserInfoMap(lpToken, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.pendingToken(lpToken, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: lpToken,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewards1 : pendingRewardTokens.bakeReward / 10 ** rewardToken1.decimals,
      pendingRewards2 : pendingRewardTokens.bethReward / 10 ** rewardToken2.decimals,
      rewardsPerWeek1 : rewardsPerWeek1,
      rewardsPerWeek2 : rewardsPerWeek2,
      lastRewardBlock : poolInfo.rewardEndBlock,
      rewardTokenAddress1 : rewardTokenAddress1,
      rewardTokenAddress2 : rewardTokenAddress2
  };
}

function printDoubleRewardsBakePool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
  rewardsPerWeek1, rewardsPerWeek2, rewardTokenTicker1, rewardTokenTicker2, rewardTokenAddress1, rewardTokenAddress2,
  pendingRewards1, pendingRewards2, fixedDecimals, claimFunction, chain="bsc") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
  var poolRewardsPerWeek1 = rewardsPerWeek1;
  var poolRewardsPerWeek2 = rewardsPerWeek2;
  if (poolRewardsPerWeek1 == 0 && rewardsPerWeek1 != 0) return;
  if (poolRewardsPerWeek2 == 0 && rewardsPerWeek2 != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice1 = getParameterCaseInsensitive(prices, rewardTokenAddress1)?.usd;
  const rewardPrice2 = getParameterCaseInsensitive(prices, rewardTokenAddress2)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printDoubleRewardsBakeAPR(rewardTokenTicker1, rewardTokenTicker2, rewardPrice1, rewardPrice2, poolRewardsPerWeek1, poolRewardsPerWeek2, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printDoubleRewardsBakeContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewards1, pendingRewards2,
    rewardTokenTicker1, rewardTokenTicker2, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, pendingRewards1, pendingRewards2, fixedDecimals, claimFunction, rewardPrice1, rewardPrice2, chain);
  return apr;
}

function printDoubleRewardsBakeContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewards1, pendingRewards2,
  rewardTokenTicker1, rewardTokenTicker2, stakeTokenTicker, unstaked, userStaked, pendingRewards1, pendingRewards2, fixedDecimals,
    claimFunction, rewardPrice1, rewardPrice2, chain) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewards1)
  }
  const claim = async function() {
    return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewards1, claimFunction)
  }
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewards1.toFixed(fixedDecimals)} ${rewardTokenTicker1} ($${formatMoney(pendingRewards1*rewardPrice1)}) + ${pendingRewards2.toFixed(fixedDecimals)} ${rewardTokenTicker2} ($${formatMoney(pendingRewards2*rewardPrice2)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

function printDoubleRewardsBakeAPR(rewardTokenTicker1, rewardTokenTicker2, rewardPrice1, rewardPrice2, poolRewardsPerWeek1,
                  poolRewardsPerWeek2, stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  var usdPerWeek1 = poolRewardsPerWeek1 * rewardPrice1;
  var usdPerWeek2 = poolRewardsPerWeek2 * rewardPrice2;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker1} Per Week: ${poolRewardsPerWeek1.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek1)})`);
  _print(`${rewardTokenTicker2} Per Week: ${poolRewardsPerWeek2.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek2)})`);
  var weeklyAPR1 = usdPerWeek1 / staked_tvl * 100;
  var weeklyAPR2 = usdPerWeek2 / staked_tvl * 100;
  var dailyAPR1 = weeklyAPR1 / 7;
  var dailyAPR2 = weeklyAPR2 / 7;
  var yearlyAPR1 = weeklyAPR1 * 52;
  var yearlyAPR2 = weeklyAPR2 * 52;
  _print(`APR: Day ${dailyAPR1.toFixed(2)}% Week ${weeklyAPR1.toFixed(2)}% Year ${yearlyAPR1.toFixed(2)}%`);
  _print(`APR: Day ${dailyAPR2.toFixed(2)}% Week ${weeklyAPR2.toFixed(2)}% Year ${yearlyAPR2.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  var userWeeklyRewards1 = userStakedPct * poolRewardsPerWeek1 / 100;
  var userWeeklyRewards2 = userStakedPct * poolRewardsPerWeek2 / 100;
  var userDailyRewards1 = userWeeklyRewards1 / 7;
  var userDailyRewards2 = userWeeklyRewards2 / 7;
  var userYearlyRewards1 = userWeeklyRewards1 * 52;
  var userYearlyRewards2 = userWeeklyRewards2 * 52;
  if (userStaked > 0) {
    _print(`Estimated ${rewardTokenTicker1} earnings:`
        + ` Day ${userDailyRewards1.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards1*rewardPrice1)})`
        + ` Week ${userWeeklyRewards1.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards1*rewardPrice1)})`
        + ` Year ${userYearlyRewards1.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards1*rewardPrice1)})`);
    _print(`Estimated ${rewardTokenTicker2} earnings:`
        + ` Day ${userDailyRewards2.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards2*rewardPrice2)})`
        + ` Week ${userWeeklyRewards2.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards2*rewardPrice2)})`
        + ` Year ${userYearlyRewards2.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards2*rewardPrice2)})`);
  }
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
    yearlyAPR1,
    yearlyAPR2,
    userYearlyUsd : userYearlyRewards1 * rewardPrice1 + userYearlyRewards2* rewardPrice2
  }
}*/