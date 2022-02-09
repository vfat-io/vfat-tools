
$(function() {
consoleInit(main)
  });

const CoffinMakerV2_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_pid","type":"uint256"},{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"_first","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_last","type":"uint256"}],"name":"DepositTimeRevised","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"EventDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"_to","type":"address"}],"name":"EventHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dev_fund","type":"address"}],"name":"EventSetDev","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_marketing_fund","type":"address"}],"name":"EventSetMarketingFund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"profit_sharing_fund","type":"address"}],"name":"EventSetProfitSharingFund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"to","type":"address"}],"name":"EventWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_withdrawLockupTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_startRate","type":"uint256"}],"name":"PoolSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"MAXIMUM_HARVEST_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAXIMUM_LOCKUP_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"STARTING_WITHIN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"uint256","name":"_withdrawLockupTime","type":"uint256"},{"internalType":"bool","name":"withUpdateAllPool","type":"bool"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"canHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"canWithdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"address","name":"referral","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dev_fund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"enWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"endTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"fromWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"fund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startRate","type":"uint256"},{"internalType":"uint256","name":"timeDelta","type":"uint256"}],"name":"getFeeRate","outputs":[{"internalType":"uint256","name":"feeRate","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startRate","type":"uint256"},{"internalType":"uint256","name":"_timeDelta","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getWithdrawable","outputs":[{"internalType":"uint256","name":"_feeAmount","type":"uint256"},{"internalType":"uint256","name":"_withdrawable","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_rewardPerSecond","type":"uint256"},{"internalType":"address","name":"_fund","type":"address"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"marketing_fund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolExistence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"harvestInterval","type":"uint256"},{"internalType":"uint256","name":"withdrawLockupTime","type":"uint256"},{"internalType":"uint256","name":"startRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"poolTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"profit_sharing_fund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referrals","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referralsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referralsLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_first","type":"uint256"},{"internalType":"uint256","name":"_last","type":"uint256"}],"name":"reviseDepositTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract ReverseToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_dev_fund","type":"address"}],"name":"setDevFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_marketing_fund","type":"address"}],"name":"setMarketingFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"uint256","name":"_withdrawLockupTime","type":"uint256"},{"internalType":"uint256","name":"_startRate","type":"uint256"},{"internalType":"bool","name":"withUpdate","type":"bool"}],"name":"setPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_profit_sharing_fund","type":"address"}],"name":"setProfitSharingFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerSecond","type":"uint256"}],"name":"setRewardPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startTime","type":"uint256"}],"name":"setStartTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"untilHarvest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"untilWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[{"components":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"harvestInterval","type":"uint256"},{"internalType":"uint256","name":"withdrawLockupTime","type":"uint256"},{"internalType":"uint256","name":"startRate","type":"uint256"}],"internalType":"struct CoffinMakerV2.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"updatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"int256","name":"rewardDebt","type":"int256"},{"internalType":"uint256","name":"nextHarvestUntil","type":"uint256"},{"internalType":"uint256","name":"depositTimerStart","type":"uint256"},{"internalType":"uint256","name":"firstDepositTime","type":"uint256"},{"internalType":"uint256","name":"lastDepositTime","type":"uint256"},{"internalType":"uint256","name":"lastWithdrawTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"withdrawLockup","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const ExtinctionPoolV2_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_BondToken","type":"address"},{"internalType":"contract IERC20","name":"_REWARD","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_lockBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"address","name":"_reverseum","type":"address"},{"internalType":"uint256","name":"_burnRate","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReverseumDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BURN_RATE_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BondToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"activateEmergency","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"burnRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reverseum","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakedBondTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transact","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"}]

const CrystalMine_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"contract IMasterChef","name":"masterchef","type":"address"},{"internalType":"address","name":"admin","type":"address"},{"internalType":"address","name":"treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastDepositedTime","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"performanceFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"callFee","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"MAX_CALL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PERFORMANCE_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_WITHDRAW_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_WITHDRAW_FEE_PERIOD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"calculateHarvestCrystalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"calculateTotalPendingCrystalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"callFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"inCaseTokensGetStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastHarvestedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterchef","outputs":[{"internalType":"contract IMasterChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"performanceFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_callFee","type":"uint256"}],"name":"setCallFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_performanceFee","type":"uint256"}],"name":"setPerformanceFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawFee","type":"uint256"}],"name":"setWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawFeePeriod","type":"uint256"}],"name":"setWithdrawFeePeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"lastDepositedTime","type":"uint256"},{"internalType":"uint256","name":"crystalAtLastUserAction","type":"uint256"},{"internalType":"uint256","name":"lastUserActionTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"wantLockedTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawFeePeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const EXTINCTION_POOLS = [
  '0xA144063168d7d08B61D1870eC1AA1030Cb9fC4E8',
  '0xc5caf6e573ccc93df52bba0a86593281200780db',
  '0xec7826201c7fcadbd048c0226c861e1df2759f8d',
  '0x37b380c2593a172e92a5f0bbaca3bcfc9091060b',
]

const FIXED_DECIMALS = 2;

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const rewardTokenTicker = "RVRS";
  const blockNumber = await App.provider.getBlockNumber();

  _print("\n============= farms ==============\n");

  const CoffinMakerV2_ADDR = "0xeea71889c062c135014ec34825a1958c87a2ac61";
  const CoffinMakerV2 = new ethers.Contract(CoffinMakerV2_ADDR, CoffinMakerV2_ABI, App.provider);

  const farmsRewardPerSecond = await CoffinMakerV2.rewardPerSecond();
  const farmsRewardsPerWeek = farmsRewardPerSecond / 1e18 * 604800;

  const tokens = {};
  const prices = await getHarmonyPrices();

  await loadHarmonyChefContract(App, tokens, prices, CoffinMakerV2, CoffinMakerV2_ADDR, CoffinMakerV2_ABI, rewardTokenTicker,
      "rewardToken", null, farmsRewardsPerWeek, "pendingReward", [1, 3]);

  _print("\n======== reverseum pools =========\n");

  await loadExtinctionPoolContracts(App, tokens, prices, EXTINCTION_POOLS, blockNumber);

  _print("\n========== single stake ==========\n");

  const CrystalMine_ADDR = "0xC9ED8bfb89F5B5ca965AA8cEAacF75576C06211E";
  const CrystalMine = new ethers.Contract(CrystalMine_ADDR, CrystalMine_ABI, App.provider);

  await loadCrystalMineContract(App, tokens, prices, CrystalMine, CrystalMine_ADDR);

  hideLoading();
}

async function getCrystalMineInfo(app, mineContract, mineAddress) {
  const address = await mineContract.token();
  const mineToken = await getHarmonyToken(app, address, mineAddress);
  const userShares = (await mineContract.userInfo(app.YOUR_ADDRESS)).shares;
  const totalShares = await mineContract.totalShares();
  const userStaked = await mineContract.wantLockedTotal(app.YOUR_ADDRESS);
  const totalStaked = await mineContract.balanceOf();
  return {
      address,
      symbol: mineToken.symbol,
      totalSupply: mineToken.totalSupply,
      decimals: mineToken.decimals,
      userShares: userShares / 10 ** mineToken.decimals,
      totalShares: totalShares / 10 ** mineToken.decimals,
      userStaked: userStaked / 10 ** mineToken.decimals,
      staked: totalStaked / 10 ** mineToken.decimals,
  };
}

async function loadCrystalMineContract(App, tokens, prices, mine, mineAddress) {
  const mineInfo = await getCrystalMineInfo(App, mine, mineAddress);
  const minePrice = getPoolPrices(tokens, prices, mineInfo, "Harmony");

  _print("Finished reading smart contracts.\n");

  const apr = printCrystalMine(mineInfo, minePrice, "harmony");
  let totalUserStaked=0, totalStaked=0;
  if (!isNaN(apr.totalStakedUsd)) {
    totalStaked += apr.totalStakedUsd;
  }
  if (apr.userStakedUsd > 0) {
    totalUserStaked += apr.userStakedUsd;
  }
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)}`)
  }
  return { prices, totalUserStaked, totalStaked }
}

function printCrystalMine(mineInfo, minePrice, chain="eth") {
  const userStaked = mineInfo.userStaked;
  const staked_tvl = minePrice.staked_tvl;
  _print_inline(`0 - `);
  minePrice.print_price(chain);
  const apr = printCrystalMineAPR(minePrice.stakeTokenTicker, staked_tvl, userStaked, minePrice.price);
  if (mineInfo.userStaked > 0) minePrice.print_contained_price(userStaked);
  _print("");
  return apr;
}

function printCrystalMineAPR(stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice) {
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(2)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl
  }
}

async function loadExtinctionPoolContracts(App, tokens, prices, poolAddresses, blockNumber) {
  const poolCount = parseInt(poolAddresses.length, 10);

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const poolInfos = await Promise.all(poolAddresses.map(async (x) =>
    await getExtinctionPoolInfo(App, x, blockNumber)));

  await Promise.all(poolInfos.filter(x => x.stakedToken).map(async (x) => {
    if (!(x.stakedToken.address in tokens)) tokens[x.stakedToken.address] = x.stakedToken;
    if (!(x.rewardToken.address in tokens)) tokens[x.rewardToken.address] = x.rewardToken;
    if(x.stakedToken.tokens) {
      await Promise.all(x.stakedToken.tokens.map(async (x) => {
        if (!(x in tokens)) tokens[x] = await getHarmonyToken(App, x, "0x0000000000000000000000000000000000000000");
      }));
    }
  }));

  const poolPrices = poolInfos.map(poolInfo => poolInfo.stakedToken ? getPoolPrices(tokens, prices, poolInfo.stakedToken, "Harmony") : undefined);

  _print("Finished reading smart contracts.\n");

  _print_bold("ROI assumes you deposit in the current block using the formula below.");
  _print_bold("ROI = (blocks remaining * current APR per block) - 100");
  _print_bold("If you have deposited prior to current block your ROI would be higher.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolInfos[i].rewardPerBlock && poolPrices[i]) {
      const apr = printExtinctionPool(App, poolAddresses[i], prices, poolInfos[i], i, poolPrices[i], blockNumber)
      aprs.push(apr);
    }
    else console.log([i, poolAddresses[i], poolInfos[i].stakedToken, poolInfos[i].rewardToken])
  }
  let totalUserStaked=0, totalStaked=0;
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
    }
  }

  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)}`);
  }

  return { prices, totalUserStaked, totalStaked }
}


async function getExtinctionPoolInfo(App, poolAddress, blockNumber) {
  const poolContract = new ethers.Contract(poolAddress, ExtinctionPoolV2_ABI, App.provider);
  const poolInfo = {
    stakedToken: await poolContract.BondToken(),
    rewardToken: await poolContract.REWARD(),
    rewardPerBlock: await poolContract.rewardPerBlock(),
    startBlock: (await poolContract.startBlock()).toNumber(),
    endBlock: (await poolContract.endBlock()).toNumber(),
    lockBlock: (await poolContract.lockBlock()).toNumber(),
  }
  
  const stakedToken = await getHarmonyToken(App, poolInfo.stakedToken, poolAddress);
  const rewardToken = await getHarmonyToken(App, poolInfo.rewardToken, poolAddress);

  stakedToken.staked = await poolContract.stakedBondTokens() / 10 ** rewardToken.decimals;

  const emptyPool = {
    stakedToken,
    rewardToken,
    rewardPerBlock: 0,
    userStaked : 0,
    pendingRewardTokens : 0,
    startBlock: poolInfo.startBlock,
    endBlock: poolInfo.endBlock,
    lockBlock: poolInfo.lockBlock,
  }

  if (rewardToken.staked === 0 || poolInfo.rewardPerBlock === 0 || blockNumber < poolInfo.startBlock || blockNumber > poolInfo.endBlock) return emptyPool;

  const userInfo = await poolContract.userInfo(App.YOUR_ADDRESS);
  const pendingRewardTokens = await poolContract.pendingReward(App.YOUR_ADDRESS);
  const userStaked = userInfo.amount / 10 ** stakedToken.decimals;
  return {
    stakedToken,
    rewardToken,
    rewardPerBlock: poolInfo.rewardPerBlock / 10 ** rewardToken.decimals,
    userStaked,
    pendingRewardTokens : pendingRewardTokens / 10 ** rewardToken.decimals,
    startBlock: poolInfo.startBlock,
    endBlock: poolInfo.endBlock,
    lockBlock: poolInfo.lockBlock,
  };
}


function printExtinctionPool(App, poolAddr, prices, poolInfo, poolIndex, poolPrices, blockNumber) {
  const poolRewardsPerWeek = poolInfo.rewardPerBlock * 604800 / 2;
  if (poolRewardsPerWeek == 0) return;
  const userStaked = poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, poolInfo.rewardToken.address)?.usd;
  const staked_tvl = poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price('harmony');
  const apr = printROI(poolInfo.rewardToken.symbol, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, blockNumber, poolInfo.endBlock, FIXED_DECIMALS);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  _print("");
  // printExtinctionPoolContractLinks(App, poolAddr, poolInfo, rewardPrice);
  return apr;
}

function printROI(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
  blockNumber, endBlock, fixedDecimals
) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPR = usdPerWeek / staked_tvl * 100;
  var blocklyAPR = weeklyAPR / 604800 * 2;
  var ROINow = (blocklyAPR * (endBlock - blockNumber)) - 100;
  _print(`APR: Day ${(weeklyAPR / 7).toFixed(2)}%`);
  _print(`Blocks left: ${(endBlock - blockNumber)} (${Math.ceil((endBlock - blockNumber) / 86400 * 2)} Days)`);
  _print(`ROI: Now ${ROINow.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
  }
}