
$(function() {
    consoleInit(main)
      });
    
    const BSWAP_CHEF_ABI = [{"inputs":[{"internalType":"address","name":"_treasury","type":"address"},{"internalType":"contract BswapToken","name":"_bswap","type":"address"},{"internalType":"uint256","name":"_rewardPerSec","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bswap","outputs":[{"internalType":"contract BswapToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bswapPerSec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accPerShare","type":"uint256"},{"internalType":"uint256","name":"totalDeposit","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardsStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startTime","type":"uint256"}],"name":"setStartTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"teamRewardPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"multiplierNumber","type":"uint256"}],"name":"updateMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerSec","type":"uint256"}],"name":"updateRewardPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const DOUBLE_BSWAP_CHEF_ABI = [{"inputs":[{"internalType":"contract IProtocolToken","name":"_mainToken","type":"address"},{"internalType":"address","name":"_treasury","type":"address"},{"internalType":"address","name":"_weth","type":"address"},{"internalType":"uint256","name":"_wethPerSecond","type":"uint256"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"contract IYieldBooster","name":"_boost","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"InvalidStartTime","type":"error"},{"inputs":[],"name":"PoolAlreadyExists","type":"error"},{"inputs":[],"name":"PoolNotExists","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountWETH","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"PoolAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPointsWETH","type":"uint256"}],"name":"PoolSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"reserve","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reserveWETH","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastRewardTime","type":"uint256"}],"name":"PoolUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"emergencyUnlock","type":"bool"}],"name":"SetEmergencyUnlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousYieldBooster","type":"address"},{"indexed":false,"internalType":"address","name":"newYieldBooster","type":"address"}],"name":"SetYieldBooster","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"treasury","type":"address"}],"name":"TreasuryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"}],"name":"WethRateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"weth","type":"address"}],"name":"WethUpdated","type":"event"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activePoolsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract INFTPool","name":"nftPool","type":"address"},{"internalType":"uint256","name":"allocPoints","type":"uint256"},{"internalType":"uint256","name":"allocPointsWETH","type":"uint256"},{"internalType":"bool","name":"withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addUnlockOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[{"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"internalType":"uint256","name":"amountWETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dummyToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyUnlock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyWithdrawFromPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emissionRates","outputs":[{"internalType":"uint256","name":"mainRate","type":"uint256"},{"internalType":"uint256","name":"wethRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getActivePoolAddressByIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getPoolAddressByIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_poolAddress","type":"address"}],"name":"getPoolInfo","outputs":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"uint256","name":"allocPoints","type":"uint256"},{"internalType":"uint256","name":"allocPointsWETH","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"reserve","type":"uint256"},{"internalType":"uint256","name":"reserveWETH","type":"uint256"},{"internalType":"uint256","name":"poolEmissionRate","type":"uint256"},{"internalType":"uint256","name":"poolEmissionRateWETH","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isUnlockOperator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mainChef","outputs":[{"internalType":"contract IBaseswapMasterChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mainChefPoolId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"removeUnlockOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"uint256","name":"allocPoints","type":"uint256"},{"internalType":"uint256","name":"allocPointsWETH","type":"uint256"},{"internalType":"bool","name":"withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"emergencyUnlock_","type":"bool"}],"name":"setEmergencyUnlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_weth","type":"address"}],"name":"setWethReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wethRate","type":"uint256"}],"name":"setWethRewardRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IYieldBooster","name":"yieldBooster_","type":"address"}],"name":"setYieldBooster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_dummyToken","type":"address"},{"internalType":"contract IBaseswapMasterChef","name":"_oldChef","type":"address"},{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"start","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPointsWETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftPool","type":"address"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"updateTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wethPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wethToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawFromPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"yieldBooster","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
    const NFT_POOL_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AddToPosition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"CreatePosition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"pending","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"pendingWETH","type":"uint256"}],"name":"HarvestPosition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"LockPosition","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accRewardsPerShare","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accRewardsPerShareWETH","type":"uint256"}],"name":"PoolUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"boostPoints","type":"uint256"}],"name":"SetBoost","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"maxGlobalMultiplier","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maxBoostMultiplier","type":"uint256"}],"name":"SetBoostMultiplierSettings","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"emergencyUnlock","type":"bool"}],"name":"SetEmergencyUnlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"maxLockDuration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maxLockMultiplier","type":"uint256"}],"name":"SetLockMultiplierSettings","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"}],"name":"SetOperator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"isAdded","type":"bool"}],"name":"SetUnlockOperator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"xTokenRewardsShare","type":"uint256"}],"name":"SetXTokenRewardsShare","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromPosition","type":"event"},{"inputs":[],"name":"MAX_BOOST_MULTIPLIER_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_GLOBAL_MULTIPLIER_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_LOCK_MULTIPLIER_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amountToAdd","type":"uint256"}],"name":"addToPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"boost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"createPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyUnlock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"exists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"boostPoints","type":"uint256"}],"name":"getMultiplierByBoostPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"getMultiplierByLockDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMultiplierSettings","outputs":[{"internalType":"uint256","name":"maxGlobalMultiplier","type":"uint256"},{"internalType":"uint256","name":"maxLockDuration","type":"uint256"},{"internalType":"uint256","name":"maxLockMultiplier","type":"uint256"},{"internalType":"uint256","name":"maxBoostMultiplier","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPoolInfo","outputs":[{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"address","name":"protocolToken","type":"address"},{"internalType":"address","name":"xToken","type":"address"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accRewardsPerShare","type":"uint256"},{"internalType":"uint256","name":"accRewardsPerShareWETH","type":"uint256"},{"internalType":"uint256","name":"lpSupply","type":"uint256"},{"internalType":"uint256","name":"lpSupplyWithMultiplier","type":"uint256"},{"internalType":"uint256","name":"allocPoints","type":"uint256"},{"internalType":"uint256","name":"allocPointsWETH","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getStakingPosition","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"amountWithMultiplier","type":"uint256"},{"internalType":"uint256","name":"startLockTime","type":"uint256"},{"internalType":"uint256","name":"lockDuration","type":"uint256"},{"internalType":"uint256","name":"lockMultiplier","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"rewardDebtWETH","type":"uint256"},{"internalType":"uint256","name":"boostPoints","type":"uint256"},{"internalType":"uint256","name":"totalMultiplier","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"harvestPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"harvestPositionTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"address","name":"to","type":"address"}],"name":"harvestPositionsTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hasDeposits","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IMasterChef","name":"master_","type":"address"},{"internalType":"contract IERC20Metadata","name":"token","type":"address"},{"internalType":"contract IXToken","name":"xToken","type":"address"},{"internalType":"contract IERC20Metadata","name":"lpToken","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isUnlocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"lockDuration","type":"uint256"}],"name":"lockPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"master","outputs":[{"internalType":"contract IMasterChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"mainAmount","type":"uint256"},{"internalType":"uint256","name":"wethAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"renewLockPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxGlobalMultiplier","type":"uint256"},{"internalType":"uint256","name":"maxBoostMultiplier","type":"uint256"}],"name":"setBoostMultiplierSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"emergencyUnlock_","type":"bool"}],"name":"setEmergencyUnlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxLockDuration","type":"uint256"},{"internalType":"uint256","name":"maxLockMultiplier","type":"uint256"}],"name":"setLockMultiplierSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator_","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"xTokenRewardsShare_","type":"uint256"}],"name":"setXTokenRewardsShare","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unboost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"}],"name":"withdrawFromPosition","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"xTokenRewardsShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"yieldBooster","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

    async function main() {
        const App = await init_ethers();
    
        _print(`Initialized ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts...\n");
    
       const BSWAP_CHEF_ADDR = "0x2b0a43dccbd7d42c18f6a83f86d1a19fa58d541a";
       const DOUBLE_BSWAP_CHEF_ADDR = "0x6fc0f134a1f20976377b259687b1c15a5d422b47";
       const rewardTokenTicker = "BSWAP";
       const bsxRewardTokenTicker = "BSX";
       const BSWAP_CHEF = new ethers.Contract(BSWAP_CHEF_ADDR, BSWAP_CHEF_ABI, App.provider);
       const DOUBLE_BSWAP_CHEF = new ethers.Contract(DOUBLE_BSWAP_CHEF_ADDR, DOUBLE_BSWAP_CHEF_ABI, App.provider);

       const currentBlock = await App.provider.getBlockNumber();

       const multiplier = await BSWAP_CHEF.getMultiplier(currentBlock, currentBlock+1);
    
       const rewardsPerWeek = await BSWAP_CHEF.bswapPerSec() / 1e18 * 604800 * multiplier;

       const rewardsPerWeekData = await DOUBLE_BSWAP_CHEF.emissionRates();
       const rewardsPerWeekBsx = rewardsPerWeekData.mainRate / 1e18 * 604800;
       const rewardsPerWeekBswap = rewardsPerWeekData.wethRate / 1e18 * 604800;
    
        const tokens = {};
        const prices = await getBasePrices();

        await loadBaseSwapContract(App, tokens, prices, DOUBLE_BSWAP_CHEF, DOUBLE_BSWAP_CHEF_ADDR, DOUBLE_BSWAP_CHEF_ABI, 
          rewardTokenTicker, bsxRewardTokenTicker, rewardsPerWeekBsx, rewardsPerWeekBswap, [], "base");

        _print("")
        _print_bold("Old farms")
        _print("")
    
         await loadGeneralChefContract(App, tokens, prices, BSWAP_CHEF, BSWAP_CHEF_ADDR, BSWAP_CHEF_ABI, rewardTokenTicker,
             "bswap", null, rewardsPerWeek, "pendingReward", [1,2,7,10,12], "base");
    
        hideLoading();
      }

async function getBaseSwapPoolInfo(app, chefContract, chefAddress, poolIndex) {
  const poolAddress = await chefContract.getActivePoolAddressByIndex(poolIndex);
  const poolInfo = await chefContract.getPoolInfo(poolAddress);
  if(/*poolIndex == 0 || poolIndex == 1 || poolIndex == 2 || poolIndex == 3 || poolIndex == 4 || poolIndex == 5 || poolIndex == 6 || poolIndex == 7 || poolIndex == 8 || poolIndex == 9 || poolIndex == 10 || poolIndex == 11 || poolIndex == 12 || poolIndex == 13
     || */poolIndex == 23 || poolIndex == 24 || poolIndex == 25 || poolIndex == 26 || poolIndex == 27){
    return {
      address: poolInfo.lpToken ?? poolInfo.stakingToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  const nftAddress = poolInfo.poolAddress;
  const nftContract = new ethers.Contract(nftAddress, NFT_POOL_ABI, app.provider);
  const nftPoolInfo = await nftContract.getPoolInfo();
  const poolToken = await getGeneralToken(app, nftPoolInfo.lpToken, chefAddress);
  poolToken.staked = nftPoolInfo.lpSupply / 10 ** poolToken.decimals;
  return {
    address: poolInfo.lpToken ?? poolInfo.stakingToken ?? poolInfo.token,
    allocPoints: poolInfo.allocPoints,
    allocPointsBswap: poolInfo.allocPointsWETH,
    poolToken: poolToken,
  };
}

async function loadBaseSwapContract(App, tokens, prices, chef, chefAddress, chefAbi, bswapRewardTokenTicker,
  bsxRewardTokenTicker, rewardsPerWeekFixedBsx, rewardsPerWeekFixedBswap, deathPoolIndices, chain) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.activePoolsLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoints();
  const totalAllocPointsBswap = await chefContract.totalAllocPointsWETH();

  _print(`<a href='https://basescan.org/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddressBsx = "0xd5046b976188eb40f6de40fb527f89c05b323385";
  const rewardTokenAddressBswap = "0x78a087d713be963bf307b18f2ff8122ef9a63ae9";
  const rewardTokenBsx = await getGeneralToken(App, rewardTokenAddressBsx, chefAddress);
  const rewardTokenBswap = await getGeneralToken(App, rewardTokenAddressBswap, chefAddress);
  const rewardsPerWeekBsx = rewardsPerWeekFixedBsx;
  const rewardsPerWeekBswap = rewardsPerWeekFixedBswap;

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBaseSwapPoolInfo(App, chefContract, chefAddress, x)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getGeneralToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, chain) : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, chain) : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printBaseSwapPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, totalAllocPointsBswap, rewardsPerWeekBsx, rewardsPerWeekBswap, 
        bsxRewardTokenTicker, bswapRewardTokenTicker, rewardTokenAddressBsx, rewardTokenAddressBswap, 
        null, null, chain)
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

function printBaseSwapPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       totalAllocPoints, totalAllocPointsBswap, rewardsPerWeekBsx, rewardsPerWeekBswap,
                       bsxRewardTokenTicker, bswapRewardTokenTicker, 
                       rewardTokenAddressBsx, rewardTokenAddressBswap, fixedDecimals, claimFunction, chain="eth") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsBsxPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeekBsx;
  var poolRewardsBswapPerWeek = poolInfo.allocPointsBswap / totalAllocPointsBswap * rewardsPerWeekBswap;
  const rewardPriceBsx = getParameterCaseInsensitive(prices, rewardTokenAddressBsx)?.usd;
  const rewardPriceBswap = getParameterCaseInsensitive(prices, rewardTokenAddressBswap)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printBaseSwapAPR(bsxRewardTokenTicker, bswapRewardTokenTicker, rewardPriceBsx, rewardPriceBswap, 
    poolRewardsBsxPerWeek, poolRewardsBswapPerWeek, poolPrices.stakeTokenTicker, staked_tvl, poolPrices.price, fixedDecimals);
  prinBaseSwapContractLinks(App, chefAbi, chefAddr);
  return apr;
}

function prinBaseSwapContractLinks(App, chefAbi, chefAddr) {
  const claim = async function() {
    return bsxContract_claim(chefAbi, chefAddr, App)
  }
  _print_link(`Harvest`, claim)
  _print("");
}

function printBaseSwapAPR(bsxRewardTokenTicker, bswapRewardTokenTicker, rewardPriceBsx, rewardPriceBswap, 
  poolRewardsBsxPerWeek, poolRewardsBswapPerWeek, stakeTokenTicker, staked_tvl, poolTokenPrice, fixedDecimals) {
  var usdBsxPerWeek = poolRewardsBsxPerWeek * rewardPriceBsx;
  var usdBswapPerWeek = poolRewardsBswapPerWeek * rewardPriceBswap;
  fixedDecimals = fixedDecimals ?? 2;
  var weeklyBsxAPR = usdBsxPerWeek / staked_tvl * 100;
  var dailyBsxAPR = weeklyBsxAPR / 7;
  var yearlyBsxAPR = weeklyBsxAPR * 52;
  var weeklyBswapAPR = usdBswapPerWeek / staked_tvl * 100;
  var dailyBswapAPR = weeklyBswapAPR / 7;
  var yearlyBswapAPR = weeklyBswapAPR * 52;

  const totalDailyAPR = dailyBsxAPR + dailyBswapAPR;
  const totalWeeklyAPR = weeklyBsxAPR + weeklyBswapAPR;
  const totalYearlyAPR = yearlyBsxAPR + yearlyBswapAPR;

  if(weeklyBswapAPR > 0){
    _print(`${bsxRewardTokenTicker} Per Week: ${poolRewardsBsxPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdBsxPerWeek)})`);
    _print(`APR ${bsxRewardTokenTicker}: Day ${dailyBsxAPR.toFixed(2)}% Week ${weeklyBsxAPR.toFixed(2)}% Year ${yearlyBsxAPR.toFixed(2)}%`);
    _print(`${bswapRewardTokenTicker} Per Week: ${poolRewardsBswapPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdBswapPerWeek)})`);
    _print(`APR ${bswapRewardTokenTicker}: Day ${dailyBswapAPR.toFixed(2)}% Week ${weeklyBswapAPR.toFixed(2)}% Year ${yearlyBswapAPR.toFixed(2)}%`);
    _print(`Total APR: Day ${totalDailyAPR.toFixed(2)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`)
  }else{
    _print(`${bsxRewardTokenTicker} Per Week: ${poolRewardsBsxPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdBsxPerWeek)})`);
    _print(`APR: Day ${dailyBsxAPR.toFixed(2)}% Week ${weeklyBsxAPR.toFixed(2)}% Year ${yearlyBsxAPR.toFixed(2)}%`);
  }
  return {
    totalStakedUsd : staked_tvl,
    yearlyAPR : yearlyBsxAPR + yearlyBswapAPR,
  }
}

const bsxContract_claim = async function(chefAbi, chefAddress, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  CHEF_CONTRACT.claimRewards({gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })

  }