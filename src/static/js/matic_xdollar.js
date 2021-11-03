
$(function() {
consoleInit(main)
});

const XDO_STAKING_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newActivePoolAddress","type":"address"}],"name":"ActivePoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newBorrowerOperationsAddress","type":"address"}],"name":"BorrowerOperationsAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newCommunityIssuanceAddress","type":"address"}],"name":"CommunityIssuanceAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newDefaultPoolAddress","type":"address"}],"name":"DefaultPoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_depositor","type":"address"},{"indexed":false,"internalType":"uint256","name":"_P","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_S","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_G","type":"uint256"}],"name":"DepositSnapshotUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_depositor","type":"address"},{"indexed":false,"internalType":"uint256","name":"_ETH","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_LUSDLoss","type":"uint256"}],"name":"ETHGainWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"_currentEpoch","type":"uint128"}],"name":"EpochUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"EtherSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_frontEnd","type":"address"},{"indexed":false,"internalType":"uint256","name":"_kickbackRate","type":"uint256"}],"name":"FrontEndRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_frontEnd","type":"address"},{"indexed":false,"internalType":"uint256","name":"_P","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_G","type":"uint256"}],"name":"FrontEndSnapshotUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_frontEnd","type":"address"},{"indexed":false,"internalType":"uint256","name":"_newFrontEndStake","type":"uint256"},{"indexed":false,"internalType":"address","name":"_depositor","type":"address"}],"name":"FrontEndStakeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_depositor","type":"address"},{"indexed":true,"internalType":"address","name":"_frontEnd","type":"address"}],"name":"FrontEndTagSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_G","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"_epoch","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"_scale","type":"uint128"}],"name":"G_Updated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_depositor","type":"address"},{"indexed":false,"internalType":"uint256","name":"_LQTY","type":"uint256"}],"name":"LQTYPaidToDepositor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_frontEnd","type":"address"},{"indexed":false,"internalType":"uint256","name":"_LQTY","type":"uint256"}],"name":"LQTYPaidToFrontEnd","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newLUSDTokenAddress","type":"address"}],"name":"LUSDTokenAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_P","type":"uint256"}],"name":"P_Updated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newPriceFeedAddress","type":"address"}],"name":"PriceFeedAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_S","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"_epoch","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"_scale","type":"uint128"}],"name":"S_Updated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"_currentScale","type":"uint128"}],"name":"ScaleUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newSortedTrovesAddress","type":"address"}],"name":"SortedTrovesAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_newBalance","type":"uint256"}],"name":"StabilityPoolETHBalanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_newBalance","type":"uint256"}],"name":"StabilityPoolLUSDBalanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newTroveManagerAddress","type":"address"}],"name":"TroveManagerAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_depositor","type":"address"},{"indexed":false,"internalType":"uint256","name":"_newDeposit","type":"uint256"}],"name":"UserDepositChanged","type":"event"},{"inputs":[],"name":"BORROWING_FEE_FLOOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DECIMAL_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LUSD_GAS_COMPENSATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_NET_DEBT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"P","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENT_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SCALE_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_100pct","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activePool","outputs":[{"internalType":"contract IActivePool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowerOperations","outputs":[{"internalType":"contract IBorrowerOperations","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"communityIssuance","outputs":[{"internalType":"contract ICommunityIssuance","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentEpoch","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentScale","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"defaultPool","outputs":[{"internalType":"contract IDefaultPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"depositSnapshots","outputs":[{"internalType":"uint256","name":"S","type":"uint256"},{"internalType":"uint256","name":"P","type":"uint256"},{"internalType":"uint256","name":"G","type":"uint256"},{"internalType":"uint128","name":"scale","type":"uint128"},{"internalType":"uint128","name":"epoch","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deposits","outputs":[{"internalType":"uint256","name":"initialValue","type":"uint256"},{"internalType":"address","name":"frontEndTag","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"","type":"uint128"},{"internalType":"uint128","name":"","type":"uint128"}],"name":"epochToScaleToG","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"","type":"uint128"},{"internalType":"uint128","name":"","type":"uint128"}],"name":"epochToScaleToSum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"frontEndSnapshots","outputs":[{"internalType":"uint256","name":"S","type":"uint256"},{"internalType":"uint256","name":"P","type":"uint256"},{"internalType":"uint256","name":"G","type":"uint256"},{"internalType":"uint128","name":"scale","type":"uint128"},{"internalType":"uint128","name":"epoch","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"frontEndStakes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"frontEnds","outputs":[{"internalType":"uint256","name":"kickbackRate","type":"uint256"},{"internalType":"bool","name":"registered","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_frontEnd","type":"address"}],"name":"getCompoundedFrontEndStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositor","type":"address"}],"name":"getCompoundedLUSDDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositor","type":"address"}],"name":"getDepositorETHGain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositor","type":"address"}],"name":"getDepositorLQTYGain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEntireSystemColl","outputs":[{"internalType":"uint256","name":"entireSystemColl","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEntireSystemDebt","outputs":[{"internalType":"uint256","name":"entireSystemDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_frontEnd","type":"address"}],"name":"getFrontEndLQTYGain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalLUSDDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastETHError_Offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastLQTYError","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastLUSDLossError_Offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lusdToken","outputs":[{"internalType":"contract ILUSDToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_debtToOffset","type":"uint256"},{"internalType":"uint256","name":"_collToAdd","type":"uint256"}],"name":"offset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceFeed","outputs":[{"internalType":"contract IPriceFeed","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_frontEndTag","type":"address"}],"name":"provideToSP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_kickbackRate","type":"uint256"}],"name":"registerFrontEnd","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_borrowerOperationsAddress","type":"address"},{"internalType":"address","name":"_troveManagerAddress","type":"address"},{"internalType":"address","name":"_activePoolAddress","type":"address"},{"internalType":"address","name":"_lusdTokenAddress","type":"address"},{"internalType":"address","name":"_sortedTrovesAddress","type":"address"},{"internalType":"address","name":"_priceFeedAddress","type":"address"},{"internalType":"address","name":"_communityIssuanceAddress","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sortedTroves","outputs":[{"internalType":"contract ISortedTroves","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"troveManager","outputs":[{"internalType":"contract ITroveManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"withdrawETHGainToTrove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawFromSP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const XDO_UNIPOOL_STAKING_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lqtyTokenAddress","type":"address"}],"name":"LQTYTokenAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_uniTokenAddress","type":"address"}],"name":"UniTokenAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqtyToken","outputs":[{"internalType":"contract ILQTYToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lqtyTokenAddress","type":"address"},{"internalType":"address","name":"_uniTokenAddress","type":"address"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"setParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAndClaim","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const XDO_STAKING_ABI2 = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_activePoolAddress","type":"address"}],"name":"ActivePoolAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_borrowerOperationsAddress","type":"address"}],"name":"BorrowerOperationsAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_account","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"EtherSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_F_ETH","type":"uint256"}],"name":"F_ETHUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_F_LUSD","type":"uint256"}],"name":"F_LUSDUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lqtyTokenAddress","type":"address"}],"name":"LQTYTokenAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lusdTokenAddress","type":"address"}],"name":"LUSDTokenAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"newStake","type":"uint256"}],"name":"StakeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_F_ETH","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_F_LUSD","type":"uint256"}],"name":"StakerSnapshotsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"LUSDGain","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ETHGain","type":"uint256"}],"name":"StakingGainsWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_totalLQTYStaked","type":"uint256"}],"name":"TotalLQTYStakedUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_troveManager","type":"address"}],"name":"TroveManagerAddressSet","type":"event"},{"inputs":[],"name":"DECIMAL_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"F_ETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"F_LUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activePoolAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowerOperationsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getPendingETHGain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getPendingLUSDGain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_ETHFee","type":"uint256"}],"name":"increaseF_ETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_LUSDFee","type":"uint256"}],"name":"increaseF_LUSD","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqtyToken","outputs":[{"internalType":"contract ILQTYToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lusdToken","outputs":[{"internalType":"contract ILUSDToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lqtyTokenAddress","type":"address"},{"internalType":"address","name":"_lusdTokenAddress","type":"address"},{"internalType":"address","name":"_troveManagerAddress","type":"address"},{"internalType":"address","name":"_borrowerOperationsAddress","type":"address"},{"internalType":"address","name":"_activePoolAddress","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"snapshots","outputs":[{"internalType":"uint256","name":"F_ETH_Snapshot","type":"uint256"},{"internalType":"uint256","name":"F_LUSD_Snapshot","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_LQTYamount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLQTYStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"troveManagerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_LQTYamount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const GYSR_POOL_ABI = [{"inputs":[{"internalType":"address","name":"staking_","type":"address"},{"internalType":"address","name":"reward_","type":"address"},{"internalType":"address","name":"gysr_","type":"address"},{"internalType":"address","name":"factory_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousController","type":"address"},{"indexed":true,"internalType":"address","name":"newController","type":"address"}],"name":"ControlTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GysrSpent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GysrVested","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GysrWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"RewardsDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"RewardsExpired","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"RewardsFunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"RewardsUnlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[],"name":"DECIMALS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"stakingdata","type":"bytes"},{"internalType":"bytes","name":"rewarddata","type":"bytes"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"clean","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gysrBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardBalances","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardModule","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardTokens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"stakingdata","type":"bytes"},{"internalType":"bytes","name":"rewarddata","type":"bytes"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"stakingBalances","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingModule","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingTokens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingTotals","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newController","type":"address"}],"name":"transferControl","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"stakingdata","type":"bytes"},{"internalType":"bytes","name":"rewarddata","type":"bytes"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const IRON_LP_ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swap","outputs":[{"internalType":"contract IIronSwap","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const IRON_SWAP_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"invariant","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenSupply","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"CollectProtocolFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newController","type":"address"}],"name":"FeeControllerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newController","type":"address"}],"name":"FeeDistributorChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"adminFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"withdrawFee","type":"uint256"}],"name":"NewFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"initialTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"futureTime","type":"uint256"}],"name":"RampA","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"tokenSupply","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"tokenAmounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"fees","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"invariant","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenSupply","type":"uint256"}],"name":"RemoveLiquidityImbalance","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"coinAmount","type":"uint256"}],"name":"RemoveLiquidityOne","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"A","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"StopRampA","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"soldId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensSold","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"boughtId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensBought","type":"uint256"}],"name":"TokenExchange","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"MAX_A","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_ADMIN_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_A_CHANGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_SWAP_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_WITHDRAW_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_RAMP_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256","name":"minMintAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"calculateCurrentWithdrawFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"calculateRemoveLiquidity","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint8","name":"index","type":"uint8"}],"name":"calculateRemoveLiquidityOneToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"inIndex","type":"uint8"},{"internalType":"uint8","name":"outIndex","type":"uint8"},{"internalType":"uint256","name":"inAmount","type":"uint256"}],"name":"calculateSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bool","name":"deposit","type":"bool"}],"name":"calculateTokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeController","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeDistributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAPrecise","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getAdminBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAdminBalances","outputs":[{"internalType":"uint256[]","name":"adminBalances","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLpToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"name":"getTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenBalances","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getTokenIndex","outputs":[{"internalType":"uint8","name":"index","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenPrecisionMultipliers","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokens","outputs":[{"internalType":"contract IERC20[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVirtualPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_coins","type":"address[]"},{"internalType":"uint8[]","name":"_decimals","type":"uint8[]"},{"internalType":"string","name":"lpTokenName","type":"string"},{"internalType":"string","name":"lpTokenSymbol","type":"string"},{"internalType":"uint256","name":"_A","type":"uint256"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"uint256","name":"_adminFee","type":"uint256"},{"internalType":"uint256","name":"_withdrawFee","type":"uint256"},{"internalType":"address","name":"_feeDistributor","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"futureA","type":"uint256"},{"internalType":"uint256","name":"futureATime","type":"uint256"}],"name":"rampA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"lpAmount","type":"uint256"},{"internalType":"uint256[]","name":"minAmounts","type":"uint256[]"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"uint256","name":"maxBurnAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityImbalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"lpAmount","type":"uint256"},{"internalType":"uint8","name":"index","type":"uint8"},{"internalType":"uint256","name":"minAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityOneToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newSwapFee","type":"uint256"},{"internalType":"uint256","name":"newAdminFee","type":"uint256"},{"internalType":"uint256","name":"newWithdrawFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeController","type":"address"}],"name":"setFeeController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeDistributor","type":"address"}],"name":"setFeeDistributor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stopRampA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"fromIndex","type":"uint8"},{"internalType":"uint8","name":"toIndex","type":"uint8"},{"internalType":"uint256","name":"inAmount","type":"uint256"},{"internalType":"uint256","name":"minOutAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapStorage","outputs":[{"internalType":"contract LPToken","name":"lpToken","type":"address"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"adminFee","type":"uint256"},{"internalType":"uint256","name":"initialA","type":"uint256"},{"internalType":"uint256","name":"futureA","type":"uint256"},{"internalType":"uint256","name":"initialATime","type":"uint256"},{"internalType":"uint256","name":"futureATime","type":"uint256"},{"internalType":"uint256","name":"defaultWithdrawFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenIndexes","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"transferAmount","type":"uint256"}],"name":"updateUserWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAdminFee","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const GYSR_REWARD_ABI = [{"inputs":[{"internalType":"address","name":"token_","type":"address"},{"internalType":"uint256","name":"vestingStart_","type":"uint256"},{"internalType":"uint256","name":"vestingPeriod_","type":"uint256"},{"internalType":"address","name":"factory_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousController","type":"address"},{"indexed":true,"internalType":"address","name":"newController","type":"address"}],"name":"ControlTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GysrSpent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GysrVested","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"GysrWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"RewardsDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"RewardsExpired","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"RewardsFunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"RewardsUnlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[],"name":"DECIMALS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FULL_VESTING","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"INITIAL_SHARES_PER_TOKEN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_ACTIVE_FUNDINGS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balances","outputs":[{"internalType":"uint256[]","name":"balances_","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"claim","outputs":[{"internalType":"uint256","name":"spent","type":"uint256"},{"internalType":"uint256","name":"vested","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"clean","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"}],"name":"fund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"name":"fund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"fundingCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"fundings","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"locked","type":"uint256"},{"internalType":"uint256","name":"updated","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"lockedShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardDust","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsPerStakedShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"stake","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"stakeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"gysr","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"},{"internalType":"uint256","name":"rewardTally","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"timeVestingCoefficient","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokens","outputs":[{"internalType":"address[]","name":"tokens_","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLocked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRawStakingShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"totalShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakingShares","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUnlocked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newController","type":"address"}],"name":"transferControl","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"idx","type":"uint256"}],"name":"unlockable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"unstake","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vestingPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vestingStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const Addresses = [
  "0x449c42BE87Bb77533c749964fD7C3b1145Cac151"
]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};

  const prices = await getMaticPrices();

  const rewardTokenAddresses = [
    "0x3Dc7B06dD0B1f08ef9AcBbD2564f8605b4868EEA",
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
  ]

  const rewardTokenAddresses2 = [
    "0x3A3e7650f8B9f667dA98F236010fBf44Ee4B2975",
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
  ]

  const pools = Addresses.map(a => { return {
    address: a,
    abi: XDO_STAKING_ABI,
    stakeTokenFunction: "lusdToken",
    rewardTokenAddresses: rewardTokenAddresses
  }})

  const uniPool = {
    address: "0xa00493d324cD342834eB657228c59d63b5EB2E89",
    abi: XDO_UNIPOOL_STAKING_ABI,
    stakeTokenFunction: "uniToken",
    rewardTokenFunction: "lqtyToken"
  }

  const xusdUsdcPoolPhase1 = {
    address: "0x7A421C2E1fAb82Da0259582F1821e7bEB5D42233",
    abi: XDO_UNIPOOL_STAKING_ABI,
    stakeTokenFunction: "uniToken",
    rewardTokenFunction: "lqtyToken"
  }

  const xusdUsdcPoolPhase2 = {
    address: "0x1e49892c0d0D4455bbbA633EeDaDd6d26224369e",
    abi: XDO_UNIPOOL_STAKING_ABI,
    stakeTokenFunction: "uniToken",
    rewardTokenFunction: "lqtyToken"
  }

  const daiUniPool = {
    address: "0xFe8A6D437808FFD7fb4c01587947E3E5DaA33c4B",
    abi: XDO_UNIPOOL_STAKING_ABI,
    stakeTokenFunction: "uniToken",
    rewardTokenFunction: "lqtyToken"
  }

  const xdoPool = {
    address: "0x3509f19581aFEDEff07c53592bc0Ca84e4855475",
    abi: XDO_STAKING_ABI2,
    stakeTokenFunction: "lqtyToken",
    rewardTokenAddresses: rewardTokenAddresses2
  }

  const ironGysrPool = {
      address: "0xDec7670a2CeFC1828da009057c509D77b4A6E76F",
      abi: GYSR_POOL_ABI,
      stakeTokenFunction: "stakingTokens",
      rewardTokenFunction: "rewardTokens"
  }

  const kyberGysrPool = {
    address: "0xfaE7272e953d889169f13d8fdc0e730B6C61429D",
    abi: GYSR_POOL_ABI,
    stakeTokenFunction: "stakingTokens",
    rewardTokenFunction: "rewardTokens"
  }

  const kyberRainmaker = {
    "Pool": {
      token0: 'USDC',
      token1: 'XUSD',
      pool: '0x2616f7285bDCb9C3D0422745b1C8A5751e0EA204',
      farming: '0xc0601973451d9369252Aee01397c0270CD2Ecd60',
      pid: 0,
    },
    "RewardLocker":'0x063DD8b5a42AaE93a014ce5FAbB5B70474667961',
    "Rewards": {
      'KNC': {
        address: '0x1C954E8fe737F99f68Fa1CCda3e51ebDB291948C',
        price: await getCoinGeckoPrice(COINGECKO_IDS['KNC']),
        rewardsPerBlock: 0,
      },
      'XDO': {
        address: '0x3Dc7B06dD0B1f08ef9AcBbD2564f8605b4868EEA',
        price: await getCoinGeckoPrice(COINGECKO_IDS['XDO']),
        rewardsPerBlock: 0,
      }
    },
    "Tokens": {
      USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      XUSD: '0x3A3e7650f8B9f667dA98F236010fBf44Ee4B2975',
    }
  } 

  let p5 = await loadKyberRainmakerPool(App, kyberRainmaker["Tokens"], kyberRainmaker["Pool"], kyberRainmaker["RewardLocker"], kyberRainmaker["Rewards"]);
  let p3 = await loadIronGysrPool(App, tokens, prices, ironGysrPool);
  let p = await loadXDollarSynthetixPools(App, tokens, prices, pools);
  let p1 = await loadXdoPools(App, tokens, prices, [xdoPool]);
  let p0 = await loadMultipleMaticSynthetixPools(App, tokens, prices, [uniPool, xusdUsdcPoolPhase1, xusdUsdcPoolPhase2]);
  let p2 = await loadKyberDMMPools(App, tokens, prices, [daiUniPool]);
  let p4 = await loadKyberGysrPool(App, tokens, prices, kyberGysrPool);
  let totalPStaked = formatMoney(p.totalUserStaked + p0.totalUserStaked + p1.totalUserStaked + p2.totalUserStaked + p3.totalUserStaked + p4.totalUserStaked + p5.totalUserStaked);
  let totalPAPR = ((p.totalUserStaked * p.totalAPR + p0.totalUserStaked * p0.totalAPR + p2.totalUserStaked * p2.totalAPR + p3.totalUserStaked * p3.totalAPR + p4.totalUserStaked * p4.totalAPR + p5.totalUserStaked * p5.totalAPR)
        / (p.totalUserStaked + p0.totalUserStaked + p2.totalUserStaked + p3.totalUserStaked + p4.totalUserStaked + p5.totalUserStaked) * 100).toFixed(2)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl + p0.staked_tvl + p1.staked_tvl + p2.staked_tvl + p3.staked_tvl + p4.staked_tvl + p5.staked_tvl)}`);
  if (p.totalUserStaked > 0 || p0.totalUserStaked > 0 || p1.totalUserStaked > 0 || p2.totalUserStaked > 0 || p3.totalUserStaked > 0 || p4.totalUserStaked > 0 || p5.totalUserStaked > 0) {
    _print(`You are staking a total of $${totalPStaked} at an APR of ${totalPAPR}%\n`);
  }

  hideLoading();
}

async function loadKyberRainmakerPool(App, tokens, pool, rewardLocker, rewards) {
  const info = await loadLiquidityMiningInfo(App, pool, 2, rewardLocker, tokens, [], rewards)
  printLiquidityMiningInfo(App, info, 2, {url: 'polygonscan.com', name: 'Polygon Explorer', info: 'polygon-info'}, tokens, rewards)

  totalStaked = info.lpStakedPrice || 0;
  totalUserStaked = info.userStakedUSD || 0;
  totalAPR = info.apr / 100 || 0;

  return { staked_tvl: totalStaked, totalUserStaked , totalAPR };
}


async function loadKyberGysrPool(App, tokens, prices, pool, customURLs) {
  let totalStaked  = 0,
      totalUserStaked = 0;
  const info = await loadKyberGysrPoolInfo(App, tokens, prices, pool.abi, pool.address, pool.rewardTokenFunction, pool.stakeTokenFunction);
  let p = await printKyberGysrPool(App, info, customURLs);

  totalStaked = p.staked_tvl || 0;
  totalUserStaked = p.userStaked || 0;
  totalAPR = p.apr / 100 || 0;

  return { staked_tvl: totalStaked, totalUserStaked, totalAPR};
}

async function loadKyberGysrPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, rewardTokenFunction,
  stakeTokenFunction) {
   try {
        const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

        const [stakeTokenAddress] = await STAKING_POOL.callStatic[stakeTokenFunction]();
        let stakeToken = await getKyberDMMToken(App, stakeTokenAddress, stakingAddress);

        let newTokenAddresses = stakeToken.tokens.filter(x =>
          !getParameterCaseInsensitive(tokens,x));
        
          for (const address of newTokenAddresses) {
            tokens[address] = await getMaticToken(App, address, stakingAddress);
        }

        const poolPrices = await getPoolPrices(tokens, prices, stakeToken, "matic");
        
        if (!poolPrices)
        {
          console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
          return null;
        }
        
        stakeToken.token0_symbol = poolPrices.t0.symbol
        stakeToken.token1_symbol = poolPrices.t1.symbol
        stakeToken.token0_price = poolPrices.p0
        stakeToken.token1_price = poolPrices.p1
        stakeToken.price = poolPrices.price
        stakeToken.reserve0 = poolPrices.q0
        stakeToken.reserve1 = poolPrices.q1       
        stakeToken.stakeTokenTicker = poolPrices.stakeTokenTicker;

        stakeToken.stakeTokenPrice = poolPrices.price

        stakeToken.stakeTokenAddress= stakeTokenAddress;
        stakeToken.stakingAddress = stakingAddress;
        stakeToken.poolUrl = "https://dmm.exchange/#/add/0x3A3e7650f8B9f667dA98F236010fBf44Ee4B2975/0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063/0xAAAe5aabDB7db627c58dfEeBa27bA2933A39c592"


        const [rewardTokenAddress] = await STAKING_POOL.callStatic[rewardTokenFunction]();
        const rewardToken = new ethers.Contract(rewardTokenAddress, ERC20_ABI, App.provider);
        stakeToken.rewardTokenTicker = await rewardToken.symbol();

        const rewardModuleAddress = await STAKING_POOL.callStatic["rewardModule"]();
        const reward = new ethers.Contract(rewardModuleAddress, GYSR_REWARD_ABI, App.provider);

        stakeToken.staked = await reward.totalRawStakingShares() / 1e24;
        stakeToken.pool_share = await STAKING_POOL.stakingBalances(App.YOUR_ADDRESS);
        stakeToken.rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

        let fundingCount =  await reward.fundingCount(rewardTokenAddress);
        let funding = {}
        let weeklyRewards = 0
        let unlocked_updated = 0;
        for (let i = 0; i < fundingCount; i++) {
            funding = await reward.fundings(rewardTokenAddress, i);
            weeklyRewards += funding.locked != 0? funding.shares / funding.duration / 1e24 * 3600 * 24 * 7 : Number(0);
            unlocked_updated = await reward.unlockable(rewardTokenAddress, i);
        }

        stakeToken.weeklyRewards = weeklyRewards
        stakeToken.usdPerWeek = weeklyRewards * stakeToken.rewardTokenPrice

        let totalStakingShares = await reward.totalStakingShares();
        let totalRawStakingShares = await reward.totalRawStakingShares();
        stakeToken.gysrAvgPoolBouns = totalStakingShares / totalRawStakingShares
        let userStakeCount = await reward.stakeCount(App.YOUR_ADDRESS);
        let rewardRate = await reward.rewardsPerStakedShare();
        let updated_rewardRate =  parseInt(rewardRate) + parseInt(unlocked_updated) * 1e18 / totalStakingShares

        let userRawStakeShare = 0;
        let userStakeShare = 0;
        let userStaked = {};
        let userShare = 0;
        let preVestingRewards = 0;
        for (let i = 0; i < userStakeCount; i++) {
            userStaked = await reward.stakes(App.YOUR_ADDRESS , i) ?? 0;
            userRawStakeShare += Number(userStaked.shares)
            userStakeShare += userStaked.shares * userStaked.bonus

            preVestingRewards += ((((updated_rewardRate - userStaked.rewardTally) * userStaked.shares) / 1e18) * userStaked.bonus) / 1e18;
        }
        
        userShare = userStakeShare / totalStakingShares / 1e18
        stakeToken.userGysrBouns = userRawStakeShare > 0? userStakeShare / userRawStakeShare : 1;

        let locked = await reward.totalLocked();
        let remaining_rewards = 0;
        let remaining_period = funding.duration ? parseInt(funding.duration) - (parseInt(Math.floor(Date.now()/1000)) - parseInt(funding.start)) : 0;
        if (remaining_period > 0) {
          remaining_rewards = parseInt(locked) * 1e6 - parseInt(unlocked_updated);
          stakeToken.userDailyRewards = userShare * remaining_rewards / (remaining_period / 3600 / 24) / 1e24
        } else {
          stakeToken.userDailyRewards = 0;
        }

        stakeToken.userWeeklyRewards = stakeToken.userDailyRewards * 7
        stakeToken.userYearlyRewards = stakeToken.userDailyRewards * 365

        if (userRawStakeShare > 0) {
          stakeToken.dailyAPR = stakeToken.userDailyRewards * stakeToken.rewardTokenPrice / (userRawStakeShare * stakeToken.stakeTokenPrice / 1e24) * 100
          stakeToken.lp_share = userRawStakeShare / totalRawStakingShares;
        } else {
          stakeToken.dailyAPR = remaining_period > 0 ? remaining_rewards / (remaining_period / 3600 / 24) * stakeToken.rewardTokenPrice / (totalRawStakingShares * stakeToken.stakeTokenPrice) * 100: 0;
          stakeToken.lp_share = 0;
        }

        stakeToken.weeklyAPR = stakeToken.dailyAPR * 7
        stakeToken.yearlyAPR = stakeToken.dailyAPR * 365

        let coeff = userStaked.timestamp ? await reward.timeVestingCoefficient(userStaked.timestamp) : 0;
        stakeToken.rewardAmount = preVestingRewards * coeff / 1e18 / 1e18 / 1e6;


        return stakeToken


   } catch (err) {
        console.log(err.message)
   }
}

async function printKyberGysrPool(App, info, customURLs) {
  _print(`<a href='${info.poolUrl}' target='_blank'>${info.stakeTokenTicker}</a> Price: $${formatMoney(info.price)} TVL: $${formatMoney(info.totalSupply * info.price)}`);
  _print(`${info.token0_symbol} Price: $${displayPrice(info.token0_price)}`);
  _print(`${info.token1_symbol} Price: $${displayPrice(info.token1_price)}`);
  _print(`Staked: ${formatMoney(info.staked)} ${info.stakeTokenTicker} ($${formatMoney(info.totalSupply * info.price)})`);
  _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
  const weeklyAPR = info.weeklyAPR;
  const dailyAPR = info.dailyAPR;
  const yearlyAPR = info.yearlyAPR;
  const userStakedUsd = info.pool_share / 1e18 * info.price;
  const userStakedPct = info.staked > 0 ? info.pool_share / info.staked / 1e18 : 0;
  if (info.pool_share > 0) {
      _print(`APR (GYSR multipliers ${(info.userGysrBouns / 1e18).toFixed(2)}x): Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
      _print(`Your LP token comprise of ${(info.reserve0 * info.lp_share).toFixed(2)} ${info.token0_symbol} + ${(info.reserve1 * info.lp_share).toFixed(2)} ${info.token1_symbol}`)
      _print(`You are staking ${(info.pool_share / 1e18).toFixed(6)} ${info.stakeTokenTicker} ` +
      `$${formatMoney(userStakedUsd)} (${(userStakedPct * 100).toFixed(2)}% of the pool).`);
      const userWeeklyRewards = info.userWeeklyRewards
      const userDailyRewards = info.userDailyRewards
      const userYearlyRewards = info.userYearlyRewards;
      _print(`Estimated ${info.rewardTokenTicker} earnings:`
          + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
          + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
  } else {
    _print(`APR (avg. GYSR multipliers ${info.gysrAvgPoolBouns.toFixed(2)}x): Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);     
    _print(`APR (w/o GYSR multipliers 1x): Day ${(dailyAPR / info.gysrAvgPoolBouns).toFixed(2)}% Week ${(weeklyAPR / info.gysrAvgPoolBouns).toFixed(2)}% Year ${(yearlyAPR / info.gysrAvgPoolBouns).toFixed(2)}%`);
    _print(`You are staking ${(info.pool_share / 1e18).toFixed(6)} ${info.stakeTokenTicker} ` +
          `$${formatMoney(userStakedUsd)} (${(userStakedPct * 100).toFixed(2)}% of the pool).`);

  }

  const exit = async function() {
      return gysrPool_rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Polygon Explorer</a>`);
  let gysrPoolLink = `target="_blank" href="https://app.gysr.io/pool/${info.stakingAddress}">`
  if (info.stakeTokenTicker != "ETH") {
      _print_link(`<a ${gysrPoolLink}Stake ${info.unstaked.toFixed(6)} ${info.stakeTokenTicker}</a>`)
  }
  else {
      _print("Please use the official website to stake ETH.");
  }

  _print_link(`<a ${gysrPoolLink}Unstake ${(info.pool_share / 1e18).toFixed(6)} ${info.stakeTokenTicker}</a>`)
  _print_link(`<a ${gysrPoolLink}Claim ${info.rewardAmount.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.rewardAmount*info.rewardTokenPrice)})</a>`)
  if (info.stakeTokenTicker != "ETH") {
      _print_link(`Revoke (set approval to 0)`, revoke)
  }
  _print_link(`Exit`, exit)
  _print("");

  return {
      staked_tvl: info.totalSupply,
      userStaked: info.pool_share / 1e18 * info.price,
      apr: info.yearlyAPR
  }
}


async function loadIronGysrPool(App, tokens, prices, pool, customURLs) {
  let totalStaked  = 0,
      totalUserStaked = 0;
  const info = await loadGysrPoolInfo(App, tokens, prices, pool.abi, pool.address, pool.rewardTokenFunction, pool.stakeTokenFunction);

  let p = await printGysrPool(App, info, customURLs);

  totalStaked = p.staked_tvl || 0;
  totalUserStaked = p.userStaked || 0;
  totalAPR = p.apr / 100 || 0;

  return { staked_tvl: totalStaked, totalUserStaked, totalAPR};
}

async function printGysrPool(App, info, customURLs) {
    _print(`<a href='${info.poolUrl}' target='_blank'>${info.stakeTokenTicker}</a> Price: $${formatMoney(info.price)} TVL: $${formatMoney(info.totalSupply * info.price)}`);
    _print(`${info.token0_symbol} Price: $1.00`);
    _print(`${info.token1_symbol} Price: $${displayPrice(info.stakeTokenPrice)}`);
    _print(`Staked: ${formatMoney(info.staked)} ${info.stakeTokenTicker} ($${formatMoney(info.totalSupply * info.price)})`);
    _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    const weeklyAPR = info.weeklyAPR;
    const dailyAPR = info.dailyAPR;
    const yearlyAPR = info.yearlyAPR;
    const userStakedUsd = info.pool_share / 1e18 * info.price;
    const userStakedPct = info.staked > 0 ? info.pool_share / info.staked / 1e18 : 0;
    if (info.pool_share > 0) {
        _print(`APR (GYSR multipliers ${(info.userGysrBouns / 1e18).toFixed(2)}x): Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
        _print(`Your LP token comprise of ${(info.reserve0 * info.lp_share / 1e18).toFixed(2)} ${info.token0_symbol} + ${(info.reserve1 * info.lp_share / 1e18).toFixed(2)} ${info.token1_symbol}`)
        _print(`You are staking ${(info.pool_share / 1e18).toFixed(6)} ${info.stakeTokenTicker} ` +
        `$${formatMoney(userStakedUsd)} (${(userStakedPct * 100).toFixed(2)}% of the pool).`);
        const userWeeklyRewards = info.userWeeklyRewards
        const userDailyRewards = info.userDailyRewards
        const userYearlyRewards = info.userYearlyRewards;
        _print(`Estimated ${info.rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
    } else {
      _print(`APR (avg. GYSR multipliers ${info.gysrAvgPoolBouns.toFixed(2)}x): Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);     
      _print(`APR (w/o GYSR multipliers 1x): Day ${(dailyAPR / info.gysrAvgPoolBouns).toFixed(2)}% Week ${(weeklyAPR / info.gysrAvgPoolBouns).toFixed(2)}% Year ${(yearlyAPR / info.gysrAvgPoolBouns).toFixed(2)}%`);
      _print(`You are staking ${(info.pool_share / 1e18).toFixed(6)} ${info.stakeTokenTicker} ` +
            `$${formatMoney(userStakedUsd)} (${(userStakedPct * 100).toFixed(2)}% of the pool).`);

    }

    const exit = async function() {
        return gysrPool_rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
        return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Polygon Explorer</a>`);
    let gysrPoolLink = `target="_blank" href="https://app.gysr.io/pool/${info.stakingAddress}">`
    if (info.stakeTokenTicker != "ETH") {
        _print_link(`<a ${gysrPoolLink}Stake ${info.unstaked.toFixed(6)} ${info.stakeTokenTicker}</a>`)
    }
    else {
        _print("Please use the official website to stake ETH.");
    }

    _print_link(`<a ${gysrPoolLink}Unstake ${(info.pool_share / 1e18).toFixed(6)} ${info.stakeTokenTicker}</a>`)
    _print_link(`<a ${gysrPoolLink}Claim ${info.rewardAmount.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.rewardAmount*info.rewardTokenPrice)})</a>`)
    if (info.stakeTokenTicker != "ETH") {
        _print_link(`Revoke (set approval to 0)`, revoke)
    }
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.totalSupply,
        userStaked: info.pool_share / 1e18 * info.price,
        apr: info.yearlyAPR
    }
}

const gysrPool_rewardsContract_exit = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, GYSR_POOL_ABI, signer)
  const currentStakedAmount = (await REWARD_POOL.stakingBalances(App.YOUR_ADDRESS)) / 1e18

  if (currentStakedAmount > 0) {
    // Todo: check if gysr pool has exit function
    showLoading()
  }
}

const gysrPool_rewardsContract_resetApprove = async function(stakeTokenAddr, rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, IRON_LP_ABI, signer)

  showLoading()

  STAKING_TOKEN.approve(rewardPoolAddr, 0)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {
      hideLoading()
    })
}


async function loadGysrPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, rewardTokenFunction,
  stakeTokenFunction) {
   try {
        const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

        const [stakeTokenAddress] = await STAKING_POOL.callStatic[stakeTokenFunction]();
        let stakeToken = await getIronLPToken(App, stakeTokenAddress, stakingAddress);
        stakeToken.stakeTokenAddress= stakeTokenAddress;
        stakeToken.stakingAddress = stakingAddress;
        stakeToken.poolUrl = "https://app.iron.finance/swap/pools/isxusd/deposit"

        const [rewardTokenAddress] = await STAKING_POOL.callStatic[rewardTokenFunction]();
        const rewardToken = new ethers.Contract(rewardTokenAddress, ERC20_ABI, App.provider);
        stakeToken.rewardTokenTicker = await rewardToken.symbol();

        const rewardModuleAddress = await STAKING_POOL.callStatic["rewardModule"]();
        const reward = new ethers.Contract(rewardModuleAddress, GYSR_REWARD_ABI, App.provider);

        stakeToken.staked = await reward.totalRawStakingShares() / 1e24;
        stakeToken.pool_share = await STAKING_POOL.stakingBalances(App.YOUR_ADDRESS);
        stakeToken.stakeTokenPrice = prices["0x3A3e7650f8B9f667dA98F236010fBf44Ee4B2975"]?.usd ?? getParameterCaseInsensitive(prices, "0x3A3e7650f8B9f667dA98F236010fBf44Ee4B2975")?.usd;
        stakeToken.rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

        let fundingCount =  await reward.fundingCount(rewardTokenAddress);
        let funding = {}
        let weeklyRewards = 0
        let unlocked_updated = 0;
        for (let i = 0; i < fundingCount; i++) {
            funding = await reward.fundings(rewardTokenAddress, i);
            weeklyRewards += funding.locked != 0? funding.shares / funding.duration / 1e24 * 3600 * 24 * 7 : Number(0);
            unlocked_updated = await reward.unlockable(rewardTokenAddress, i);
        }

        stakeToken.weeklyRewards = weeklyRewards
        stakeToken.usdPerWeek = weeklyRewards * stakeToken.rewardTokenPrice

        let totalStakingShares = await reward.totalStakingShares();
        let totalRawStakingShares = await reward.totalRawStakingShares();
        stakeToken.gysrAvgPoolBouns = totalStakingShares / totalRawStakingShares
        let userStakeCount = await reward.stakeCount(App.YOUR_ADDRESS);
        let rewardRate = await reward.rewardsPerStakedShare();
        let updated_rewardRate =  parseInt(rewardRate) + parseInt(unlocked_updated) * 1e18 / totalStakingShares

        let userRawStakeShare = 0;
        let userStakeShare = 0;
        let userStaked = {};
        let userShare = 0;
        let preVestingRewards = 0;
        for (let i = 0; i < userStakeCount; i++) {
            userStaked = await reward.stakes(App.YOUR_ADDRESS , i) ?? 0;
            userRawStakeShare += userStaked.shares
            userStakeShare += userStaked.shares * userStaked.bonus
            userShare = userStakeShare / totalStakingShares / 1e18
            preVestingRewards += ((((updated_rewardRate - userStaked.rewardTally) * userStaked.shares) / 1e18) * userStaked.bonus) / 1e18;
        }
        stakeToken.userGysrBouns = userRawStakeShare > 0? userStakeShare / userRawStakeShare : 1;

        let locked = await reward.totalLocked();
        let remaining_rewards = 0;
        let remaining_period = funding.duration ? parseInt(funding.duration) - (parseInt(Math.floor(Date.now()/1000)) - parseInt(funding.start)) : 0;
        if (remaining_period > 0) {
          remaining_rewards = parseInt(locked) * 1e6 - parseInt(unlocked_updated);
          stakeToken.userDailyRewards = userShare * remaining_rewards / (remaining_period / 3600 / 24) / 1e24
        } else {
          stakeToken.userDailyRewards = 0;
        }
        stakeToken.userWeeklyRewards = stakeToken.userDailyRewards * 7
        stakeToken.userYearlyRewards = stakeToken.userDailyRewards * 365

        if (userRawStakeShare > 0) {
          stakeToken.dailyAPR = stakeToken.userDailyRewards * stakeToken.rewardTokenPrice / (userRawStakeShare * stakeToken.stakeTokenPrice / 1e24) * 100
          stakeToken.lp_share = userRawStakeShare / totalRawStakingShares;
        } else {
          stakeToken.dailyAPR = remaining_period > 0 ? remaining_rewards / (remaining_period / 3600 / 24) * stakeToken.rewardTokenPrice / (totalRawStakingShares * stakeToken.stakeTokenPrice) * 100: 0;
          stakeToken.lp_share = 0;
        }
        stakeToken.weeklyAPR = stakeToken.dailyAPR * 7
        stakeToken.yearlyAPR = stakeToken.dailyAPR * 365

        let coeff = userStaked.timestamp ? await reward.timeVestingCoefficient(userStaked.timestamp) : 0;
        stakeToken.rewardAmount = preVestingRewards * coeff / 1e18 / 1e18 / 1e6;


        return stakeToken


   } catch (err) {
        console.log(err.message)
   }
}

async function getIronLPToken(App, tokenAddress, stakingAddress) {
    try {
        const iron = new ethers.Contract(tokenAddress, IRON_LP_ABI, App.provider);
        let symbol = await iron.symbol()
        let name = await iron.name()
        let decimals = await iron.decimals()
        let totalSupply = await iron.totalSupply() / 10 ** decimals
        let staked = await iron.balanceOf(stakingAddress) / 10 ** decimals
        let unstaked = await iron.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals

        let swapAddress = await iron.swap();
        const swap = new ethers.Contract(swapAddress, IRON_SWAP_ABI, App.provider);
        let price = await swap.getVirtualPrice() / 10 ** decimals;
        let token0 = await swap.getToken(0);
        const token0_contract = new ethers.Contract(token0, ERC20_ABI, App.provider);
        let token1 = await swap.getToken(1);
        const token1_contract = new ethers.Contract(token1, ERC20_ABI, App.provider);

        let token0_symbol = await token0_contract.symbol();
        let token1_symbol = await token1_contract.symbol();
        let stakeTokenTicker = `[${token0_symbol}]-[${token1_symbol}] IRON-LP`
        let reserve0 = await swap.getTokenBalance(0);
        let reserve1 = await swap.getTokenBalance(1);

    return {
        symbol,
        name,
        totalSupply,
        staked,
        decimals,
        unstaked,
        price,
        stakeTokenTicker,
        token0_symbol,
        token1_symbol,
        reserve0,
        reserve1
    };
  }
  catch(err) {
    console.log(err.message);
    console.log(`Couldn't match ${tokenAddress} to any known token type.`);
  }
}


async function loadKyberDMMPools(App, tokens, prices, pools, customURLs) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadKyberDMMPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos.filter(i => i?.poolPrices)) {
    let p = await printUniPool(App, i, "matic", customURLs);

    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}


async function loadKyberDMMPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, rewardTokenFunction,
  stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    let stakeToken = await getKyberDMMToken(App, stakeTokenAddress, stakingAddress);

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getMaticToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
      tokens[rewardTokenAddress] = await getMaticToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "matic");

    if (!poolPrices)
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const periodFinish = await STAKING_POOL.periodFinish();
    const rewardRate = await STAKING_POOL.rewardRate();
    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      weeklyRewards,
      usdPerWeek,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned
    }
}

async function getKyberDMMToken(App, tokenAddress, stakingAddress) {
  try {
    const kyber = new ethers.Contract(tokenAddress, DMM_POOL_ABI, App.provider);
    return await getMaticUniPool(App, kyber, tokenAddress, stakingAddress);
  }
  catch(err) {
    console.log(err);
    console.log(`Couldn't match ${tokenAddress} to any known token type.`);
  }
}


async function loadXdoPools(App, tokens, prices, pools, customURLs) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadXdoPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenAddresses, p.stakeTokenFunction)));
  for (const i of infos.filter(i => i?.poolPrices)) {
    let p = await printXdoPool(App, i, "matic", customURLs);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadXdoPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, rewardTokenAddresses,
  stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    let stakeToken = await getMaticToken(App, stakeTokenAddress, stakeTokenAddress);
    stakeToken.staked = await STAKING_POOL.totalLQTYStaked() / 10 ** stakeToken.decimals;

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getMaticToken(App, address, stakingAddress);
    }
    for(rewardTokenAddress of rewardTokenAddresses){
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getMaticToken(App, rewardTokenAddress, stakingAddress);
      }
    }
    let rewardTokens = [];
    for(rewardTokenAddress of rewardTokenAddresses){
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
      rewardTokens.push(rewardToken);
    }

    let rewardTokenTickers = [];
    for(rewardToken of rewardTokens){
      const rewardTokenTicker = rewardToken.symbol;
      rewardTokenTickers.push(rewardTokenTicker);
    }

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "matic");

    if (!poolPrices)
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    let rewardTokenPrices = [];
    for(rewardTokenAddress of rewardTokenAddresses){
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      rewardTokenPrices.push(rewardTokenPrice);
    }

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = await STAKING_POOL.stakes(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    let earnings = [];
    const earned0 = await STAKING_POOL.getPendingLUSDGain(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
    const earned1 = await STAKING_POOL.getPendingETHGain(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
    earnings.push(earned0);
    earnings.push(earned1);

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddresses,
      stakeTokenTicker,
      rewardTokenTickers,
      stakeTokenPrice,
      rewardTokenPrices,
      staked_tvl,
      userStaked,
      userUnstaked,
      earnings
    }
}

async function printXdoPool(App, info, chain="eth", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  const approveTENDAndStake = async function() {
    return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function() {
    return rewardsContract_unstake(info.stakingAddress, App)
  }
  const claim = async function() {
    return rewardsContract_claim(info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Polygon Explorer</a>`);
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  }
  else {
    _print("Please use the official website to stake ETH.");
  }
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${info.earnings[0].toFixed(6)} ${info.rewardTokenTickers[0]} ($${formatMoney(info.earnings[0]*info.rewardTokenPrices[0])}) + ${info.earnings[1].toFixed(6)} ${info.rewardTokenTickers[1]} ($${formatMoney(info.earnings[1]*info.rewardTokenPrices[1])})`, claim)
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Revoke (set approval to 0)`, revoke)
  }
  _print_link(`Exit`, exit)
  _print("");

  return {
    staked_tvl: info.poolPrices.staked_tvl,
    userStaked : userStakedUsd
  }
}

async function loadXDollarSynthetixPools(App, tokens, prices, pools, customURLs) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadXDollarPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenAddresses, p.stakeTokenFunction)));
  for (const i of infos.filter(i => i?.poolPrices)) {
    let p = await printXDollarPool(App, i, "matic", customURLs);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadXDollarPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, rewardTokenAddresses,
  stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    let stakeToken = await getMaticToken(App, stakeTokenAddress, stakeTokenAddress);
    stakeToken.staked = await STAKING_POOL.getTotalLUSDDeposits() / 10 ** stakeToken.decimals;

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getMaticToken(App, address, stakingAddress);
    }
    for(rewardTokenAddress of rewardTokenAddresses){
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getMaticToken(App, rewardTokenAddress, stakingAddress);
      }
    }
    let rewardTokens = [];
    for(rewardTokenAddress of rewardTokenAddresses){
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
      rewardTokens.push(rewardToken);
    }

    let rewardTokenTickers = [];
    for(rewardToken of rewardTokens){
      const rewardTokenTicker = rewardToken.symbol;
      rewardTokenTickers.push(rewardTokenTicker);
    }


    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "matic");

    if (!poolPrices)
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    let rewardTokenPrices = [];
    for(rewardTokenAddress of rewardTokenAddresses){
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      rewardTokenPrices.push(rewardTokenPrice);
    }
    const weeklyRewards = 5000000 / 54;

    const usdPerWeek = weeklyRewards * rewardTokenPrices[0];

    const staked_tvl = poolPrices.staked_tvl;

    const usersStakeInfo = await STAKING_POOL.deposits(App.YOUR_ADDRESS);
    const userStaked = usersStakeInfo.initialValue / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    let earnings = [];
    const earned0 = await STAKING_POOL.getDepositorLQTYGain(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
    const earned1 = await STAKING_POOL.getDepositorETHGain(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
    earnings.push(earned0);
    earnings.push(earned1);

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddresses,
      stakeTokenTicker,
      rewardTokenTickers,
      stakeTokenPrice,
      rewardTokenPrices,
      staked_tvl,
      userStaked,
      userUnstaked,
      earnings,
      weeklyRewards,
      usdPerWeek
    }
}

async function printXDollarPool(App, info, chain="eth", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  _print(`${info.rewardTokenTickers[0]} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
  const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
  const dailyAPR = weeklyAPR / 7;
  const yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
        const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${info.rewardTokenTickers[0]} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrices[0])})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrices[0])})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrices[0])})`);
    }
  const approveTENDAndStake = async function() {
    return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function() {
    return rewardsContract_unstake(info.stakingAddress, App)
  }
  const claim = async function() {
    return rewardsContract_claim(info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Polygon Explorer</a>`);
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  }
  else {
    _print("Please use the official website to stake ETH.");
  }
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${info.earnings[0].toFixed(6)} ${info.rewardTokenTickers[0]} ($${formatMoney(info.earnings[0]*info.rewardTokenPrices[0])}) + ${info.earnings[1].toFixed(6)} ${info.rewardTokenTickers[1]} ($${formatMoney(info.earnings[1]*info.rewardTokenPrices[1])})`, claim)
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Revoke (set approval to 0)`, revoke)
  }
  _print_link(`Exit`, exit)
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd,
      apr : yearlyAPR
  }
}

async function printUniPool(App, info, chain="matic", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
  const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
  const dailyAPR = weeklyAPR / 7;
  const yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  if (info.userStaked > 0) {
    info.poolPrices.print_contained_price(info.userStaked);
      const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
      const userDailyRewards = userWeeklyRewards / 7;
      const userYearlyRewards = userWeeklyRewards * 52;
      _print(`Estimated ${info.rewardTokenTicker} earnings:`
          + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
          + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
  }
  const approveTENDAndStake = async function() {
    return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function() {
    return rewardsContract_unstake(info.stakingAddress, App)
  }
  const claim = async function() {
    return uniPool_rewardsContract_claim(info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Polygon Explorer</a>`);
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  }
  else {
    _print("Please use the official website to stake ETH.");
  }
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`, claim)
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Revoke (set approval to 0)`, revoke)
  }
  _print_link(`Exit`, exit)
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd,
      apr : yearlyAPR
  }
}


const uniPool_rewardsContract_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, XDO_UNIPOOL_STAKING_ABI, signer)

  const earnedYFFI = (await REWARD_POOL.earned(App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
  showLoading()
  REWARD_POOL.claimReward({gasLimit: 250000})
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {
      hideLoading()
      })
  }
}
