
$(function() {
  consoleInit(main)
    });
  
  const TOP_STABLE_STAKING_ABI = [{"type":"event","name":"ActivePoolAddressChanged","inputs":[{"type":"address","name":"_newActivePoolAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"BorrowerOperationsAddressChanged","inputs":[{"type":"address","name":"_newBorrowerOperationsAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"CommunityIssuanceAddressChanged","inputs":[{"type":"address","name":"_newCommunityIssuanceAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"DefaultPoolAddressChanged","inputs":[{"type":"address","name":"_newDefaultPoolAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"DepositSnapshotUpdated","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_P","internalType":"uint256","indexed":false},{"type":"uint256","name":"_S","internalType":"uint256","indexed":false},{"type":"uint256","name":"_G","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"ETHGainWithdrawn","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_ETH","internalType":"uint256","indexed":false},{"type":"uint256","name":"_LUSDLoss","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EpochUpdated","inputs":[{"type":"uint128","name":"_currentEpoch","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"EtherSent","inputs":[{"type":"address","name":"_to","internalType":"address","indexed":false},{"type":"uint256","name":"_amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndRegistered","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_kickbackRate","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndSnapshotUpdated","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_P","internalType":"uint256","indexed":false},{"type":"uint256","name":"_G","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndStakeChanged","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_newFrontEndStake","internalType":"uint256","indexed":false},{"type":"address","name":"_depositor","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndTagSet","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"address","name":"_frontEnd","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"G_Updated","inputs":[{"type":"uint256","name":"_G","internalType":"uint256","indexed":false},{"type":"uint128","name":"_epoch","internalType":"uint128","indexed":false},{"type":"uint128","name":"_scale","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"LQTYPaidToDepositor","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_LQTY","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"LQTYPaidToFrontEnd","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_LQTY","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"LUSDTokenAddressChanged","inputs":[{"type":"address","name":"_newLUSDTokenAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"P_Updated","inputs":[{"type":"uint256","name":"_P","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"PriceFeedAddressChanged","inputs":[{"type":"address","name":"_newPriceFeedAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"S_Updated","inputs":[{"type":"uint256","name":"_S","internalType":"uint256","indexed":false},{"type":"uint128","name":"_epoch","internalType":"uint128","indexed":false},{"type":"uint128","name":"_scale","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"ScaleUpdated","inputs":[{"type":"uint128","name":"_currentScale","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"SortedTrovesAddressChanged","inputs":[{"type":"address","name":"_newSortedTrovesAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"StabilityPoolETHBalanceUpdated","inputs":[{"type":"uint256","name":"_newBalance","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"StabilityPoolLUSDBalanceUpdated","inputs":[{"type":"uint256","name":"_newBalance","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TroveManagerAddressChanged","inputs":[{"type":"address","name":"_newTroveManagerAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"UserDepositChanged","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_newDeposit","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BORROWING_FEE_FLOOR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"CCR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DECIMAL_PRECISION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"LUSD_GAS_COMPENSATION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MCR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MIN_NET_DEBT","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"NAME","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"P","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PERCENT_DIVISOR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"SCALE_FACTOR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"_100pct","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IActivePool"}],"name":"activePool","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IBorrowerOperations"}],"name":"borrowerOperations","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ICommunityIssuance"}],"name":"communityIssuance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"","internalType":"uint128"}],"name":"currentEpoch","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"","internalType":"uint128"}],"name":"currentScale","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IDefaultPool"}],"name":"defaultPool","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"S","internalType":"uint256"},{"type":"uint256","name":"P","internalType":"uint256"},{"type":"uint256","name":"G","internalType":"uint256"},{"type":"uint128","name":"scale","internalType":"uint128"},{"type":"uint128","name":"epoch","internalType":"uint128"}],"name":"depositSnapshots","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"initialValue","internalType":"uint256"},{"type":"address","name":"frontEndTag","internalType":"address"}],"name":"deposits","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"epochToScaleToG","inputs":[{"type":"uint128","name":"","internalType":"uint128"},{"type":"uint128","name":"","internalType":"uint128"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"epochToScaleToSum","inputs":[{"type":"uint128","name":"","internalType":"uint128"},{"type":"uint128","name":"","internalType":"uint128"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"S","internalType":"uint256"},{"type":"uint256","name":"P","internalType":"uint256"},{"type":"uint256","name":"G","internalType":"uint256"},{"type":"uint128","name":"scale","internalType":"uint128"},{"type":"uint128","name":"epoch","internalType":"uint128"}],"name":"frontEndSnapshots","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"frontEndStakes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"kickbackRate","internalType":"uint256"},{"type":"bool","name":"registered","internalType":"bool"}],"name":"frontEnds","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCompoundedFrontEndStake","inputs":[{"type":"address","name":"_frontEnd","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCompoundedLUSDDeposit","inputs":[{"type":"address","name":"_depositor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getDepositorETHGain","inputs":[{"type":"address","name":"_depositor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getDepositorLQTYGain","inputs":[{"type":"address","name":"_depositor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getETH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"entireSystemColl","internalType":"uint256"}],"name":"getEntireSystemColl","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"entireSystemDebt","internalType":"uint256"}],"name":"getEntireSystemDebt","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getFrontEndLQTYGain","inputs":[{"type":"address","name":"_frontEnd","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getTotalLUSDDeposits","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isOwner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastETHError_Offset","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastLQTYError","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastLUSDLossError_Offset","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ILUSDToken"}],"name":"lusdToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"offset","inputs":[{"type":"uint256","name":"_debtToOffset","internalType":"uint256"},{"type":"uint256","name":"_collToAdd","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IPriceFeed"}],"name":"priceFeed","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"provideToSP","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"},{"type":"address","name":"_frontEndTag","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"registerFrontEnd","inputs":[{"type":"uint256","name":"_kickbackRate","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setAddresses","inputs":[{"type":"address","name":"_borrowerOperationsAddress","internalType":"address"},{"type":"address","name":"_troveManagerAddress","internalType":"address"},{"type":"address","name":"_activePoolAddress","internalType":"address"},{"type":"address","name":"_lusdTokenAddress","internalType":"address"},{"type":"address","name":"_sortedTrovesAddress","internalType":"address"},{"type":"address","name":"_priceFeedAddress","internalType":"address"},{"type":"address","name":"_communityIssuanceAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ISortedTroves"}],"name":"sortedTroves","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ITroveManager"}],"name":"troveManager","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawETHGainToTrove","inputs":[{"type":"address","name":"_upperHint","internalType":"address"},{"type":"address","name":"_lowerHint","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawFromSP","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"receive","stateMutability":"payable"}]
  
  const LP_STAKING_ABI = [{"inputs":[{"internalType":"contract IUniswapV2Pair","name":"_stakingToken","type":"address"},{"internalType":"contract IERC20","name":"_wantToken","type":"address"},{"internalType":"address","name":"_burnToken","type":"address"},{"internalType":"address","name":"_feeReceiver","type":"address"},{"internalType":"contract ICommunityIssuance","name":"_rewardIssuer","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"lpTokensWithdrawn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"burnAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardAmount","type":"uint256"}],"name":"FeeProcessed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"feeAmount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"withdrawAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"feeAmount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositFeeOnAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardIssuer","outputs":[{"internalType":"contract ICommunityIssuance","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsUpdateFrequency","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IUniswapV2Pair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"userDeposits","outputs":[{"components":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct StakingRewardsPenalty.Deposit[]","name":"deposits","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wantToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFeeOnAmount","outputs":[{"internalType":"uint256","name":"feeAmount","type":"uint256"}],"stateMutability":"view","type":"function"}]
  
  const LIQR_STAKING_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"rewardsToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address[]","name":"_rewardsDistributor","type":"address[]"}],"name":"addReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardData","outputs":[{"internalType":"uint256","name":"periodFinish","type":"uint256"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"lastUpdateTime","type":"uint256"},{"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_rewardsDistributor","type":"address"},{"internalType":"bool","name":"_isDistributor","type":"bool"}],"name":"setRewardsDistributor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_stakingToken","type":"address"}],"name":"setStakingToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
  async function main() {
      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");
  
    const LpStakingPool = {
      address : "0xEF7815Bf149aea53811384D3A6f1705145FD50Ac",
      abi : LP_STAKING_ABI,
      stakeTokenFunction : "stakingToken",
      rewardTokenAddress : "0x33333ee26a7d02e41c33828b42fb1e0889143477"
    }
  
    const LiqrStakingPool = {
      address : "0x11B0303034fdB52D4e53B4E4202B49681DF9ae82",
      abi : LIQR_STAKING_ABI,
      stakeTokenFunction : "stakingToken"
    }
  
     const rewardTokenAddresses1 = [
      "0x33333ee26a7d02e41c33828b42fb1e0889143477",
      "0xd02a30d33153877bc20e5721ee53dedee0422b2f"
    ]
    const StablePool1 = {
      address : "0xB345a75fEc95b381287F71A2eBbF094791433008",
      abi : TOP_STABLE_STAKING_ABI,
      stakeTokenFunction : "lusdToken",
      rewardTokenAddresses : rewardTokenAddresses1
    }
  
    const rewardTokenAddresses2 = [
      "0x33333ee26a7d02e41c33828b42fb1e0889143477",
      "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83"
    ]
    const StablePool2 = {
      address : "0xc0e133D2bb669df10eC147C31694eF88Ef0dB8Ec",
      abi : TOP_STABLE_STAKING_ABI,
      stakeTokenFunction : "lusdToken",
      rewardTokenAddresses : rewardTokenAddresses2
    }
  
      const tokens = {};
      const prices = await getFantomPrices();

      prices["0xC0d9784FDba39746919Bbf236eB73bc015fD351D"] = { usd : 1 }
      prices["0x4A89338A2079A01eDBF5027330EAC10B615024E5"] = { usd : 1 }
      prices["0xd02a30d33153877bc20e5721ee53dedee0422b2f"] = { usd : 1 }
  
      const p2 = await loadLpStakingPool(App, tokens, prices, LpStakingPool.abi, 
                                                              LpStakingPool.address, 
                                                              LpStakingPool.rewardTokenAddress, 
                                                              LpStakingPool.stakeTokenFunction);
  
      const p3 = await loadLiqrPool(App, tokens, prices, LiqrStakingPool.abi, 
                                                         LiqrStakingPool.address,
                                                         LiqrStakingPool.stakeTokenFunction);

      const p0 = await loadStablePool(App, tokens, prices, StablePool1.abi, 
                                                           StablePool1.address, 
                                                           StablePool1.rewardTokenAddresses, 
                                                           StablePool1.stakeTokenFunction);

      const p1 = await loadStablePool(App, tokens, prices, StablePool2.abi, 
                                                           StablePool2.address, 
                                                           StablePool2.rewardTokenAddresses, 
                                                           StablePool2.stakeTokenFunction);
  
      let totalPStaked = formatMoney(p0.userStaked+p1.userStaked+p2.userStaked+p3.userStaked);
      let totalPAPR = ((p2.userStaked * p2.apr + p3.userStaked * p3.apr) / (p2.userStaked + p3.userStaked) * 100).toFixed(2)
      _print_bold(`Total staked: $${formatMoney(p0.staked_tvl+p1.staked_tvl+p2.staked_tvl+p3.staked_tvl)}`);
  
      if (p2.userStaked > 0 || p3.userStaked > 0){
        _print(`You are staking a total of $${totalPStaked} at an APR of ${totalPAPR}%\n`);
      }else if(p0.userStaked > 0 || p1.userStaked > 0){
        _print(`You are staking a total of $${totalPStaked}\n`);
      }
  
      hideLoading();
    }
  
  async function loadStablePool(App, tokens, prices, abi, address, rewardTokenAddresses, stakeTokenFunction) {
      const info = await loadStablePoolInfo(App, tokens, prices, abi, address, rewardTokenAddresses, stakeTokenFunction);
      if (!info) return null;
      return await printStablePool(App, info, "fantom");
  }
  
  async function loadLpStakingPool(App, tokens, prices, abi, address, rewardTokenAddress, stakeTokenFunction) {
    const info = await loadLpStakingPoolInfo(App, tokens, prices, abi, address, rewardTokenAddress, stakeTokenFunction);
    if (!info) return null;
    return await printLpStakingPool(App, info, "fantom");
  }
  
  async function loadLiqrPool(App, tokens, prices, abi, address, stakeTokenFunction) {
    const info = await loadloadLiqrPoolInfo(App, tokens, prices, abi, address, stakeTokenFunction);
    if (!info) return null;
    return await printloadLiqrPool(App, info, "fantom");
  }
  
  async function loadloadLiqrPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
      stakeTokenFunction) {
        const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
        if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
          console.log("Couldn't find stake function ", stakeTokenFunction);
        }
        const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
        let rewardTokenAddresses = []
        for(let i = 0; i < 4; i++){
          const rewardTokenAddress = await STAKING_POOL.rewardTokens(i);
          rewardTokenAddresses.push(rewardTokenAddress);
        }
  
        var stakeToken = await getFantomToken(App, stakeTokenAddress, stakingAddress);
  
        var newPriceAddresses = stakeToken.tokens.filter(x =>
          !getParameterCaseInsensitive(prices, x));
        var newPrices = await lookUpTokenPrices(newPriceAddresses);
        for (const key in newPrices) {
          if (newPrices[key]?.usd)
              prices[key] = newPrices[key];
        }
        var newTokenAddresses = stakeToken.tokens.filter(x =>
          !getParameterCaseInsensitive(tokens,x));
        for (const address of newTokenAddresses) {
            tokens[address] = await getFantomToken(App, address, stakingAddress);
        }
        for(const rewardTokenAddress of rewardTokenAddresses){
          if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
            tokens[rewardTokenAddress] = await getFantomToken(App, rewardTokenAddress, stakingAddress);
          }
        }
        let rewardTokens = [];
        let rewardTokenTickers = [];
        let rewardTokenPrices = [];
        let weeklyRewards = [];
        let usdCoinsPerWeek = [];
        let earnings = [];
        for(const rewardTokenAddress of rewardTokenAddresses){
          const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
          const rewardTokenTicker = rewardToken.symbol;
          const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
          rewardTokens.push(rewardToken);
          rewardTokenTickers.push(rewardTokenTicker);
          rewardTokenPrices.push(rewardTokenPrice);
          const rewardData = await STAKING_POOL.rewardData(rewardTokenAddress);
          const periodFinish = rewardData.periodFinish;
          const rewardRate = rewardData.rewardRate / 10 ** rewardToken.decimals
          const weeklyReward = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / rewardToken.decimals * 604800;
          const usdPerWeek = weeklyReward * rewardTokenPrice;
          weeklyRewards.push(weeklyReward);
          usdCoinsPerWeek.push(usdPerWeek);
          const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS, rewardTokenAddress) / 10 ** rewardToken.decimals;
          earnings.push(earned);
        }
  
        const poolPrices = getPoolPrices(tokens, prices, stakeToken, "fantom");
  
        if (!poolPrices)
        {
          console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
          return null;
        }
  
        const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
        const stakeTokenPrice =
            prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
  
        const staked_tvl = poolPrices.staked_tvl;
  
        const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;
  
        const userUnstaked = stakeToken.unstaked;
  
        return  {
          stakingAddress,
          poolPrices,
          stakeTokenAddress,
          rewardTokenAddresses,
          stakeTokenTicker,
          rewardTokenTickers,
          stakeTokenPrice,
          rewardTokenPrices,
          weeklyRewards,
          usdCoinsPerWeek,
          staked_tvl,
          userStaked,
          userUnstaked,
          earnings
        }
  }
  
  async function loadLpStakingPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    rewardTokenAddress, stakeTokenFunction) {
        const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
        if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
          console.log("Couldn't find stake function ", stakeTokenFunction);
        }
        const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
        var stakeToken = await getFantomToken(App, stakeTokenAddress, stakingAddress);
  
        if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
          stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
        }
  
        var newPriceAddresses = stakeToken.tokens.filter(x =>
          !getParameterCaseInsensitive(prices, x));
        var newPrices = await lookUpTokenPrices(newPriceAddresses);
        for (const key in newPrices) {
          if (newPrices[key]?.usd)
              prices[key] = newPrices[key];
        }
        var newTokenAddresses = stakeToken.tokens.filter(x =>
          !getParameterCaseInsensitive(tokens,x));
        for (const address of newTokenAddresses) {
            tokens[address] = await getFantomToken(App, address, stakingAddress);
        }
        if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
            tokens[rewardTokenAddress] = await getFantomToken(App, rewardTokenAddress, stakingAddress);
        }
        const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  
        const rewardTokenTicker = rewardToken.symbol;
  
        const poolPrices = getPoolPrices(tokens, prices, stakeToken, "fantom");
  
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
  
        const depositFee = await STAKING_POOL.depositFee() / 100;
  
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
          earned,
          depositFee
        }
  }
  
  async function printLpStakingPool(App, info, chain="eth", customURLs) {
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
        return rewardsContract_claim(info.stakingAddress, App)
      }
      const exit = async function() {
        return rewardsContract_exit(info.stakingAddress, App)
      }
      const revoke = async function() {
        return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
      }
      _print(`<a target="_blank" href="https://ftmscan.com/address/${info.stakingAddress}#code">Explorer</a>`);
      _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker} Fee-${info.depositFee}%`, approveTENDAndStake)
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
  
  async function loadStablePoolInfo(App, tokens, prices, stakingAbi, stakingAddress, rewardTokenAddresses,
    stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
      const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
      let stakeToken = await getFantomToken(App, stakeTokenAddress, stakeTokenAddress);
      stakeToken.staked = await STAKING_POOL.getTotalLUSDDeposits() / 10 ** stakeToken.decimals;
  
      var newTokenAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(tokens,x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getFantomToken(App, address, stakingAddress);
      }
      for(const rewardTokenAddress of rewardTokenAddresses){
        if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getFantomToken(App, rewardTokenAddress, stakingAddress);
        }
      }
      let rewardTokens = [];
      for(const rewardTokenAddress of rewardTokenAddresses){
        const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
        rewardTokens.push(rewardToken);
      }
  
      let rewardTokenTickers = [];
      for(const rewardToken of rewardTokens){
        const rewardTokenTicker = rewardToken.symbol;
        rewardTokenTickers.push(rewardTokenTicker);
      }
  
  
      const poolPrices = getPoolPrices(tokens, prices, stakeToken, "fantom");
  
      if (!poolPrices)
      {
        console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
        return null;
      }
  
      const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
      const stakeTokenPrice =
          prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
      let rewardTokenPrices = [];
      for(const rewardTokenAddress of rewardTokenAddresses){
        const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
        rewardTokenPrices.push(rewardTokenPrice);
      }
  
      const staked_tvl = poolPrices.staked_tvl;
  
      const usersStakeInfo = await STAKING_POOL.deposits(App.YOUR_ADDRESS);
      const userStaked = usersStakeInfo.initialValue / 10 ** stakeToken.decimals;
  
      const userUnstaked = stakeToken.unstaked;
  
      let earnings = [];
      const earned0 = await STAKING_POOL.getDepositorLQTYGain(App.YOUR_ADDRESS) / 10 ** rewardTokens[0].decimals;
      const earned1 = await STAKING_POOL.getDepositorETHGain(App.YOUR_ADDRESS) / 10 ** rewardTokens[1].decimals;
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
      }
  }
  
  async function printStablePool(App, info, chain="eth", customURLs) {
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
    _print(`<a target="_blank" href="https://ftmscan.com/address/${info.stakingAddress}/contracts">Fantom Explorer</a>`);
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
  
  async function printloadLiqrPool(App, info, chain="fantom", customURLs) {
      info.poolPrices.print_price(chain, 4, customURLs);
      for(let i = 0; i < info.rewardTokenTickers; i++){
        _print(`${info.rewardTokenTickers[i]} Per Week: ${info.weeklyRewards[i].toFixed(2)} ($${formatMoney(info.usdCoinsPerWeek[i])})`);
      }
      let totalYearlyAPR = 0;
      let totalWeeklyAPR = 0;
      let totalDailyAPR = 0;
      let totalusdCoinsPerDay = 0;
      let totalusdCoinsPerWeek = 0;
      let totalusdCoinsPerYear = 0;
      let totalUSDPerWeek = 0;
      for(let i = 0; i < info.rewardTokenTickers.length; i++){
        let weeklyAPR = info.usdCoinsPerWeek[i] / info.staked_tvl * 100;
        let dailyAPR = weeklyAPR / 7;
        yearlyAPR = weeklyAPR * 52;
        totalYearlyAPR += yearlyAPR;
        totalWeeklyAPR += weeklyAPR;
        totalDailyAPR += dailyAPR;
        totalUSDPerWeek += info.usdCoinsPerWeek[i];
        _print(`${info.rewardTokenTickers[i]} Per Week: ${info.weeklyRewards[i].toFixed(2)} ($${formatMoney(info.usdCoinsPerWeek[i])}) APR: Year ${yearlyAPR.toFixed(2)}%`);
      }
      _print(`Total Per Week: $${formatMoney(totalUSDPerWeek)}`);
      _print(`Total APR: Day ${totalDailyAPR.toFixed(4)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);
      const userStakedUsd = info.userStaked * info.stakeTokenPrice;
      const userStakedPct = userStakedUsd / info.staked_tvl * 100;
      _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
             `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
      if (info.userStaked > 0) {
        info.poolPrices.print_contained_price(info.userStaked);
        for(let i = 0; i < info.rewardTokenTickers.length; i++){
          let userWeeklyRewards = userStakedPct * info.weeklyRewards[i] / 100;
          let userDailyRewards = userWeeklyRewards / 7;
          let userYearlyRewards = userWeeklyRewards * 52;
    
          totalusdCoinsPerDay += userDailyRewards;
          totalusdCoinsPerWeek += userWeeklyRewards;
          totalusdCoinsPerYear += userYearlyRewards;
        }
        _print(`Total Earnings: Day ${totalusdCoinsPerDay.toFixed(4)}% Week ${totalusdCoinsPerWeek.toFixed(2)}% Year ${totalusdCoinsPerYear.toFixed(2)}%`);
      }
      const approveTENDAndStake = async function() {
        return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
      }
      const unstake = async function() {
        return rewardsContract_unstake(info.stakingAddress,info.userStakedWei, App)
      }
      const claim = async function() {
        return claimTopshelf(info.stakingAddress, App)
      }
      const exit = async function() {
        return rewardsContract_exit(info.stakingAddress, App)
      }
      const revoke = async function() {
        return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
      }
      _print(`<a target="_blank" href="https://ftmscan.com/address/${info.stakingAddress}#code">Fantom Explorer</a>`);
      if (info.stakeTokenTicker != "ETH") {
        _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
      }
      else {
        _print("Please use the official website to stake ETH.");
      }
      _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
      let claimLink = "";
      for(let i = 0; i < info.earnings.length; i++){
        claimLink += `${info.earnings[i].toFixed(6)} ${info.rewardTokenTickers[i]} ($${formatMoney(info.earnings[i]*info.rewardTokenPrices[i])}) `
      }
      _print_link(`Claim ${claimLink}`, claim)
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

const claimTopshelf = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, DRAX_STAKING_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  const earnedYFFI = (await REWARD_POOL.totalEarnedRewardToken1(App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
    showLoading()
    REWARD_POOL.getReward({gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
  else alert("Nothing to claim");
}