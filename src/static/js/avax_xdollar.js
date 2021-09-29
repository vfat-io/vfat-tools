
$(function() {
consoleInit(main)
  });

const XDO_STAKING_ABI = [{"type":"event","name":"LQTYTokenAddressChanged","inputs":[{"type":"address","name":"_lqtyTokenAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UniTokenAddressChanged","inputs":[{"type":"address","name":"_uniTokenAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"NAME","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"duration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isOwner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ILQTYToken"}],"name":"lqtyToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setParams","inputs":[{"type":"address","name":"_lqtyTokenAddress","internalType":"address"},{"type":"address","name":"_uniTokenAddress","internalType":"address"},{"type":"uint256","name":"_duration","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"uniToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAndClaim","inputs":[]}]

const XDO_STABLE_STAKING_ABI = [{"type":"event","name":"ActivePoolAddressChanged","inputs":[{"type":"address","name":"_newActivePoolAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"BorrowerOperationsAddressChanged","inputs":[{"type":"address","name":"_newBorrowerOperationsAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"CommunityIssuanceAddressChanged","inputs":[{"type":"address","name":"_newCommunityIssuanceAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"DefaultPoolAddressChanged","inputs":[{"type":"address","name":"_newDefaultPoolAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"DepositSnapshotUpdated","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_P","internalType":"uint256","indexed":false},{"type":"uint256","name":"_S","internalType":"uint256","indexed":false},{"type":"uint256","name":"_G","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"ETHGainWithdrawn","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_ETH","internalType":"uint256","indexed":false},{"type":"uint256","name":"_LUSDLoss","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EpochUpdated","inputs":[{"type":"uint128","name":"_currentEpoch","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"EtherSent","inputs":[{"type":"address","name":"_to","internalType":"address","indexed":false},{"type":"uint256","name":"_amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndRegistered","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_kickbackRate","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndSnapshotUpdated","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_P","internalType":"uint256","indexed":false},{"type":"uint256","name":"_G","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndStakeChanged","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_newFrontEndStake","internalType":"uint256","indexed":false},{"type":"address","name":"_depositor","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndTagSet","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"address","name":"_frontEnd","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"G_Updated","inputs":[{"type":"uint256","name":"_G","internalType":"uint256","indexed":false},{"type":"uint128","name":"_epoch","internalType":"uint128","indexed":false},{"type":"uint128","name":"_scale","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"LQTYPaidToDepositor","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_LQTY","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"LQTYPaidToFrontEnd","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_LQTY","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"LUSDTokenAddressChanged","inputs":[{"type":"address","name":"_newLUSDTokenAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"P_Updated","inputs":[{"type":"uint256","name":"_P","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"PriceFeedAddressChanged","inputs":[{"type":"address","name":"_newPriceFeedAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"S_Updated","inputs":[{"type":"uint256","name":"_S","internalType":"uint256","indexed":false},{"type":"uint128","name":"_epoch","internalType":"uint128","indexed":false},{"type":"uint128","name":"_scale","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"ScaleUpdated","inputs":[{"type":"uint128","name":"_currentScale","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"SortedTrovesAddressChanged","inputs":[{"type":"address","name":"_newSortedTrovesAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"StabilityPoolETHBalanceUpdated","inputs":[{"type":"uint256","name":"_newBalance","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"StabilityPoolLUSDBalanceUpdated","inputs":[{"type":"uint256","name":"_newBalance","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TroveManagerAddressChanged","inputs":[{"type":"address","name":"_newTroveManagerAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"UserDepositChanged","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_newDeposit","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BORROWING_FEE_FLOOR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"CCR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DECIMAL_PRECISION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"LUSD_GAS_COMPENSATION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MCR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MIN_NET_DEBT","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"NAME","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"P","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PERCENT_DIVISOR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"SCALE_FACTOR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"_100pct","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IActivePool"}],"name":"activePool","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IBorrowerOperations"}],"name":"borrowerOperations","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ICommunityIssuance"}],"name":"communityIssuance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"","internalType":"uint128"}],"name":"currentEpoch","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"","internalType":"uint128"}],"name":"currentScale","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IDefaultPool"}],"name":"defaultPool","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"S","internalType":"uint256"},{"type":"uint256","name":"P","internalType":"uint256"},{"type":"uint256","name":"G","internalType":"uint256"},{"type":"uint128","name":"scale","internalType":"uint128"},{"type":"uint128","name":"epoch","internalType":"uint128"}],"name":"depositSnapshots","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"initialValue","internalType":"uint256"},{"type":"address","name":"frontEndTag","internalType":"address"}],"name":"deposits","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"epochToScaleToG","inputs":[{"type":"uint128","name":"","internalType":"uint128"},{"type":"uint128","name":"","internalType":"uint128"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"epochToScaleToSum","inputs":[{"type":"uint128","name":"","internalType":"uint128"},{"type":"uint128","name":"","internalType":"uint128"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"S","internalType":"uint256"},{"type":"uint256","name":"P","internalType":"uint256"},{"type":"uint256","name":"G","internalType":"uint256"},{"type":"uint128","name":"scale","internalType":"uint128"},{"type":"uint128","name":"epoch","internalType":"uint128"}],"name":"frontEndSnapshots","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"frontEndStakes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"kickbackRate","internalType":"uint256"},{"type":"bool","name":"registered","internalType":"bool"}],"name":"frontEnds","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCompoundedFrontEndStake","inputs":[{"type":"address","name":"_frontEnd","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCompoundedLUSDDeposit","inputs":[{"type":"address","name":"_depositor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getDepositorETHGain","inputs":[{"type":"address","name":"_depositor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getDepositorLQTYGain","inputs":[{"type":"address","name":"_depositor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getETH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"entireSystemColl","internalType":"uint256"}],"name":"getEntireSystemColl","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"entireSystemDebt","internalType":"uint256"}],"name":"getEntireSystemDebt","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getFrontEndLQTYGain","inputs":[{"type":"address","name":"_frontEnd","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getTotalLUSDDeposits","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isOwner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastETHError_Offset","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastLQTYError","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastLUSDLossError_Offset","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ILUSDToken"}],"name":"lusdToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"offset","inputs":[{"type":"uint256","name":"_debtToOffset","internalType":"uint256"},{"type":"uint256","name":"_collToAdd","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IPriceFeed"}],"name":"priceFeed","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"provideToSP","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"},{"type":"address","name":"_frontEndTag","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"registerFrontEnd","inputs":[{"type":"uint256","name":"_kickbackRate","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setAddresses","inputs":[{"type":"address","name":"_borrowerOperationsAddress","internalType":"address"},{"type":"address","name":"_troveManagerAddress","internalType":"address"},{"type":"address","name":"_activePoolAddress","internalType":"address"},{"type":"address","name":"_lusdTokenAddress","internalType":"address"},{"type":"address","name":"_sortedTrovesAddress","internalType":"address"},{"type":"address","name":"_priceFeedAddress","internalType":"address"},{"type":"address","name":"_communityIssuanceAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ISortedTroves"}],"name":"sortedTroves","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ITroveManager"}],"name":"troveManager","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawETHGainToTrove","inputs":[{"type":"address","name":"_upperHint","internalType":"address"},{"type":"address","name":"_lowerHint","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawFromSP","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"receive","stateMutability":"payable"}]

const XDO_STAKING_ABI2 = [{"type":"event","name":"ActivePoolAddressSet","inputs":[{"type":"address","name":"_activePoolAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"BorrowerOperationsAddressSet","inputs":[{"type":"address","name":"_borrowerOperationsAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"EtherSent","inputs":[{"type":"address","name":"_account","internalType":"address","indexed":false},{"type":"uint256","name":"_amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"F_ETHUpdated","inputs":[{"type":"uint256","name":"_F_ETH","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"F_LUSDUpdated","inputs":[{"type":"uint256","name":"_F_LUSD","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"LQTYTokenAddressSet","inputs":[{"type":"address","name":"_lqtyTokenAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"LUSDTokenAddressSet","inputs":[{"type":"address","name":"_lusdTokenAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"StakeChanged","inputs":[{"type":"address","name":"staker","internalType":"address","indexed":true},{"type":"uint256","name":"newStake","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"StakerSnapshotsUpdated","inputs":[{"type":"address","name":"_staker","internalType":"address","indexed":false},{"type":"uint256","name":"_F_ETH","internalType":"uint256","indexed":false},{"type":"uint256","name":"_F_LUSD","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"StakingGainsWithdrawn","inputs":[{"type":"address","name":"staker","internalType":"address","indexed":true},{"type":"uint256","name":"LUSDGain","internalType":"uint256","indexed":false},{"type":"uint256","name":"ETHGain","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TotalLQTYStakedUpdated","inputs":[{"type":"uint256","name":"_totalLQTYStaked","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TroveManagerAddressSet","inputs":[{"type":"address","name":"_troveManager","internalType":"address","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DECIMAL_PRECISION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"F_ETH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"F_LUSD","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"NAME","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"activePoolAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"borrowerOperationsAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getPendingETHGain","inputs":[{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getPendingLUSDGain","inputs":[{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"increaseF_ETH","inputs":[{"type":"uint256","name":"_ETHFee","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"increaseF_LUSD","inputs":[{"type":"uint256","name":"_LUSDFee","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isOwner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ILQTYToken"}],"name":"lqtyToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ILUSDToken"}],"name":"lusdToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setAddresses","inputs":[{"type":"address","name":"_lqtyTokenAddress","internalType":"address"},{"type":"address","name":"_lusdTokenAddress","internalType":"address"},{"type":"address","name":"_troveManagerAddress","internalType":"address"},{"type":"address","name":"_borrowerOperationsAddress","internalType":"address"},{"type":"address","name":"_activePoolAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"F_ETH_Snapshot","internalType":"uint256"},{"type":"uint256","name":"F_LUSD_Snapshot","internalType":"uint256"}],"name":"snapshots","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"_LQTYamount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"stakes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalLQTYStaked","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"troveManagerAddress","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unstake","inputs":[{"type":"uint256","name":"_LQTYamount","internalType":"uint256"}]},{"type":"receive","stateMutability":"payable"}]

const XDO_UNIPOOL_STAKING_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lqtyTokenAddress","type":"address"}],"name":"LQTYTokenAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_uniTokenAddress","type":"address"}],"name":"UniTokenAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqtyToken","outputs":[{"internalType":"contract ILQTYToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lqtyTokenAddress","type":"address"},{"internalType":"address","name":"_uniTokenAddress","type":"address"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"setParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAndClaim","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const KYBER_DMM_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"feeInPrecision","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"vReserve0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"vReserve1","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reserve0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reserve1","type":"uint256"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"shortEMA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"longEMA","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"lastBlockVolume","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"skipBlock","type":"uint256"}],"name":"UpdateEMA","type":"event"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ampBps","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"domainSeparator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract IDMMFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTradeInfo","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint112","name":"_vReserve0","type":"uint112"},{"internalType":"uint112","name":"_vReserve1","type":"uint112"},{"internalType":"uint256","name":"feeInPrecision","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVolumeTrendData","outputs":[{"internalType":"uint128","name":"_shortEMA","type":"uint128"},{"internalType":"uint128","name":"_longEMA","type":"uint128"},{"internalType":"uint128","name":"_currentBlockVolume","type":"uint128"},{"internalType":"uint128","name":"_lastTradeBlock","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token0","type":"address"},{"internalType":"contract IERC20","name":"_token1","type":"address"},{"internalType":"uint32","name":"_ampBps","type":"uint32"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"callbackData","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const xusdWAVAXPool = {
     address : "0x65724E3e3dF3A51fEA5d4d8DB838eECfc5391aC4",
     abi : XDO_STAKING_ABI,
     stakeTokenFunction : "uniToken",
     rewardTokenFunction : "lqtyToken"
   }

   const rewardTokenAddresses = [
    "0x9ef758ac000a354479e538b8b2f01b917b8e89e7",
    "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
  ]
  const XusdPool = {
    address : "0x22Bd1a65c3cB136a8314efa6b20971e3Ffa9eD8a",
    abi : XDO_STABLE_STAKING_ABI,
    stakeTokenFunction : "lusdToken",
    rewardTokenAddresses : rewardTokenAddresses
  }

  const rewardTokenAddresses2 = [
    "0x3509f19581afedeff07c53592bc0ca84e4855475",
    "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
  ]
  const XdoPool = {
    address: "0x68738A47d40C34d890168aB7B612A6f649f395e4",
    abi: XDO_STAKING_ABI2,
    stakeTokenFunction: "lqtyToken",
    rewardTokenAddresses: rewardTokenAddresses2
  }

  const xusdUsdcPool = {
    address: "0x651DeBB76d72A8bB9eF936D5ff2E327f9FfD98cC",
    abi: XDO_UNIPOOL_STAKING_ABI,
    stakeTokenFunction: "uniToken",
    rewardTokenFunction: "lqtyToken"
  }

    const tokens = {};
    const prices = await getAvaxPrices();

    const p = await loadMultipleAvaxSynthetixPools(App, tokens, prices, [xusdWAVAXPool]);

    const p2 = await loadKyberDMMPools(App, tokens, prices, [xusdUsdcPool]);

    const p0 = await loadXDollarPool(App, tokens, prices, XusdPool.abi, 
                                                          XusdPool.address, 
                                                          XusdPool.rewardTokenAddresses, 
                                                          XusdPool.stakeTokenFunction);

    const p1 = await loadXdoPool(App, tokens, prices, XdoPool.abi, 
                                                      XdoPool.address, 
                                                      XdoPool.rewardTokenAddresses,
                                                      XdoPool.stakeTokenFunction);

    let totalPStaked = formatMoney(p.totalUserStaked+p0.userStaked+p1.userStaked+p2.totalUserStaked);
    let totalPAPR = ((p.totalUserStaked * p.totalApr + p0.userStaked * p0.apr + p2.totalUserStaked * p2.totalAPR) / (p.totalUserStaked + p0.userStaked + p2.totalUserStaked) * 100).toFixed(2)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl+p0.staked_tvl+p1.staked_tvl+p2.staked_tvl)}`);

    if (p.totalUserStaked > 0 || p0.userStaked > 0 || p1.userStaked > 0 || p2.totalUserStaked > 0) {
      _print(`You are staking a total of $${totalPStaked} at an APR of ${totalPAPR}%\n`);
    }

    hideLoading();
  }

async function loadXDollarPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
    const info = await loadXDollarPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
    if (!info) return null;
    return await printXDollarPool(App, info, "avax");
}

async function loadXdoPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
  const info = await loadXdoPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
  if (!info) return null;
  return await printXdoPool(App, info, "avax");
}

async function loadXdoPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, rewardTokenAddresses,
  stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    let stakeToken = await getAvaxToken(App, stakeTokenAddress, stakeTokenAddress);
    stakeToken.staked = await STAKING_POOL.totalLQTYStaked() / 10 ** stakeToken.decimals;

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getAvaxToken(App, address, stakingAddress);
    }
    for(rewardTokenAddress of rewardTokenAddresses){
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getAvaxToken(App, rewardTokenAddress, stakingAddress);
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

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "avax");

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

async function loadXDollarPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, rewardTokenAddresses,
  stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    let stakeToken = await getAvaxToken(App, stakeTokenAddress, stakeTokenAddress);
    stakeToken.staked = await STAKING_POOL.getTotalLUSDDeposits() / 10 ** stakeToken.decimals;

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getAvaxToken(App, address, stakingAddress);
    }
    for(rewardTokenAddress of rewardTokenAddresses){
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getAvaxToken(App, rewardTokenAddress, stakingAddress);
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


    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "avax");

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
    const weeklyRewards = 3000000 / 52

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
  _print(`<a target="_blank" href="https://cchain.explorer.avax.network/address/${info.stakingAddress}/contracts">Avax Explorer</a>`);
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
  _print(`<a target="_blank" href="https://cchain.explorer.avax.network/address/${info.stakingAddress}/contracts">Avax Explorer</a>`);
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

async function loadKyberDMMPools(App, tokens, prices, pools, customURLs) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadKyberDMMPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos.filter(i => i?.poolPrices)) {
    let p = await printUniPool(App, i, "avax", customURLs);

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
        tokens[address] = await getAvaxToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
      tokens[rewardTokenAddress] = await getAvaxToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "avax");

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
    const kyber = new ethers.Contract(tokenAddress, KYBER_DMM_ABI, App.provider);
    return await getAvaxUniPool(App, kyber, tokenAddress, stakingAddress);
  }
  catch(err) {
    console.log(err);
    console.log(`Couldn't match ${tokenAddress} to any known token type.`);
  }
}

async function printUniPool(App, info, chain="avax", customURLs) {
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
  _print(`<a target="_blank" href="https://cchain.explorer.avax.network/address/${info.stakingAddress}/read-contract">Avax Explorer</a>`);
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