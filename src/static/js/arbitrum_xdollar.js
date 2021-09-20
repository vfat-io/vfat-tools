$(function() {
  consoleInit(main)
    });
  
  const XDO_STAKING_ABI2 = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_activePoolAddress","type":"address"}],"name":"ActivePoolAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_borrowerOperationsAddress","type":"address"}],"name":"BorrowerOperationsAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_account","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"EtherSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_F_ETH","type":"uint256"}],"name":"F_ETHUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_F_LUSD","type":"uint256"}],"name":"F_LUSDUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lqtyTokenAddress","type":"address"}],"name":"LQTYTokenAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lusdTokenAddress","type":"address"}],"name":"LUSDTokenAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"newStake","type":"uint256"}],"name":"StakeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_F_ETH","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_F_LUSD","type":"uint256"}],"name":"StakerSnapshotsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"LUSDGain","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ETHGain","type":"uint256"}],"name":"StakingGainsWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_totalLQTYStaked","type":"uint256"}],"name":"TotalLQTYStakedUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_troveManager","type":"address"}],"name":"TroveManagerAddressSet","type":"event"},{"inputs":[],"name":"DECIMAL_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"F_ETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"F_LUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activePoolAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowerOperationsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getPendingETHGain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getPendingLUSDGain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_ETHFee","type":"uint256"}],"name":"increaseF_ETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_LUSDFee","type":"uint256"}],"name":"increaseF_LUSD","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqtyToken","outputs":[{"internalType":"contract ILQTYToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lusdToken","outputs":[{"internalType":"contract ILUSDToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lqtyTokenAddress","type":"address"},{"internalType":"address","name":"_lusdTokenAddress","type":"address"},{"internalType":"address","name":"_troveManagerAddress","type":"address"},{"internalType":"address","name":"_borrowerOperationsAddress","type":"address"},{"internalType":"address","name":"_activePoolAddress","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"snapshots","outputs":[{"internalType":"uint256","name":"F_ETH_Snapshot","type":"uint256"},{"internalType":"uint256","name":"F_LUSD_Snapshot","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_LQTYamount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLQTYStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"troveManagerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_LQTYamount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

  const XDO_STABLE_STAKING_ABI = [{"type":"event","name":"ActivePoolAddressChanged","inputs":[{"type":"address","name":"_newActivePoolAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"BorrowerOperationsAddressChanged","inputs":[{"type":"address","name":"_newBorrowerOperationsAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"CommunityIssuanceAddressChanged","inputs":[{"type":"address","name":"_newCommunityIssuanceAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"DefaultPoolAddressChanged","inputs":[{"type":"address","name":"_newDefaultPoolAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"DepositSnapshotUpdated","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_P","internalType":"uint256","indexed":false},{"type":"uint256","name":"_S","internalType":"uint256","indexed":false},{"type":"uint256","name":"_G","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"ETHGainWithdrawn","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_ETH","internalType":"uint256","indexed":false},{"type":"uint256","name":"_LUSDLoss","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EpochUpdated","inputs":[{"type":"uint128","name":"_currentEpoch","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"EtherSent","inputs":[{"type":"address","name":"_to","internalType":"address","indexed":false},{"type":"uint256","name":"_amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndRegistered","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_kickbackRate","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndSnapshotUpdated","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_P","internalType":"uint256","indexed":false},{"type":"uint256","name":"_G","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndStakeChanged","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_newFrontEndStake","internalType":"uint256","indexed":false},{"type":"address","name":"_depositor","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"FrontEndTagSet","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"address","name":"_frontEnd","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"G_Updated","inputs":[{"type":"uint256","name":"_G","internalType":"uint256","indexed":false},{"type":"uint128","name":"_epoch","internalType":"uint128","indexed":false},{"type":"uint128","name":"_scale","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"LQTYPaidToDepositor","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_LQTY","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"LQTYPaidToFrontEnd","inputs":[{"type":"address","name":"_frontEnd","internalType":"address","indexed":true},{"type":"uint256","name":"_LQTY","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"LUSDTokenAddressChanged","inputs":[{"type":"address","name":"_newLUSDTokenAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"P_Updated","inputs":[{"type":"uint256","name":"_P","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"PriceFeedAddressChanged","inputs":[{"type":"address","name":"_newPriceFeedAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"S_Updated","inputs":[{"type":"uint256","name":"_S","internalType":"uint256","indexed":false},{"type":"uint128","name":"_epoch","internalType":"uint128","indexed":false},{"type":"uint128","name":"_scale","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"ScaleUpdated","inputs":[{"type":"uint128","name":"_currentScale","internalType":"uint128","indexed":false}],"anonymous":false},{"type":"event","name":"SortedTrovesAddressChanged","inputs":[{"type":"address","name":"_newSortedTrovesAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"StabilityPoolETHBalanceUpdated","inputs":[{"type":"uint256","name":"_newBalance","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"StabilityPoolLUSDBalanceUpdated","inputs":[{"type":"uint256","name":"_newBalance","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TroveManagerAddressChanged","inputs":[{"type":"address","name":"_newTroveManagerAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"UserDepositChanged","inputs":[{"type":"address","name":"_depositor","internalType":"address","indexed":true},{"type":"uint256","name":"_newDeposit","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BORROWING_FEE_FLOOR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"CCR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DECIMAL_PRECISION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"LUSD_GAS_COMPENSATION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MCR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MIN_NET_DEBT","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"NAME","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"P","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PERCENT_DIVISOR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"SCALE_FACTOR","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"_100pct","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IActivePool"}],"name":"activePool","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IBorrowerOperations"}],"name":"borrowerOperations","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ICommunityIssuance"}],"name":"communityIssuance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"","internalType":"uint128"}],"name":"currentEpoch","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint128","name":"","internalType":"uint128"}],"name":"currentScale","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IDefaultPool"}],"name":"defaultPool","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"S","internalType":"uint256"},{"type":"uint256","name":"P","internalType":"uint256"},{"type":"uint256","name":"G","internalType":"uint256"},{"type":"uint128","name":"scale","internalType":"uint128"},{"type":"uint128","name":"epoch","internalType":"uint128"}],"name":"depositSnapshots","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"initialValue","internalType":"uint256"},{"type":"address","name":"frontEndTag","internalType":"address"}],"name":"deposits","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"epochToScaleToG","inputs":[{"type":"uint128","name":"","internalType":"uint128"},{"type":"uint128","name":"","internalType":"uint128"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"epochToScaleToSum","inputs":[{"type":"uint128","name":"","internalType":"uint128"},{"type":"uint128","name":"","internalType":"uint128"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"S","internalType":"uint256"},{"type":"uint256","name":"P","internalType":"uint256"},{"type":"uint256","name":"G","internalType":"uint256"},{"type":"uint128","name":"scale","internalType":"uint128"},{"type":"uint128","name":"epoch","internalType":"uint128"}],"name":"frontEndSnapshots","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"frontEndStakes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"kickbackRate","internalType":"uint256"},{"type":"bool","name":"registered","internalType":"bool"}],"name":"frontEnds","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCompoundedFrontEndStake","inputs":[{"type":"address","name":"_frontEnd","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCompoundedLUSDDeposit","inputs":[{"type":"address","name":"_depositor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getDepositorETHGain","inputs":[{"type":"address","name":"_depositor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getDepositorLQTYGain","inputs":[{"type":"address","name":"_depositor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getETH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"entireSystemColl","internalType":"uint256"}],"name":"getEntireSystemColl","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"entireSystemDebt","internalType":"uint256"}],"name":"getEntireSystemDebt","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getFrontEndLQTYGain","inputs":[{"type":"address","name":"_frontEnd","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getTotalLUSDDeposits","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isOwner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastETHError_Offset","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastLQTYError","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastLUSDLossError_Offset","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ILUSDToken"}],"name":"lusdToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"offset","inputs":[{"type":"uint256","name":"_debtToOffset","internalType":"uint256"},{"type":"uint256","name":"_collToAdd","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IPriceFeed"}],"name":"priceFeed","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"provideToSP","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"},{"type":"address","name":"_frontEndTag","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"registerFrontEnd","inputs":[{"type":"uint256","name":"_kickbackRate","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setAddresses","inputs":[{"type":"address","name":"_borrowerOperationsAddress","internalType":"address"},{"type":"address","name":"_troveManagerAddress","internalType":"address"},{"type":"address","name":"_activePoolAddress","internalType":"address"},{"type":"address","name":"_lusdTokenAddress","internalType":"address"},{"type":"address","name":"_sortedTrovesAddress","internalType":"address"},{"type":"address","name":"_priceFeedAddress","internalType":"address"},{"type":"address","name":"_communityIssuanceAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ISortedTroves"}],"name":"sortedTroves","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ITroveManager"}],"name":"troveManager","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawETHGainToTrove","inputs":[{"type":"address","name":"_upperHint","internalType":"address"},{"type":"address","name":"_lowerHint","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawFromSP","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"receive","stateMutability":"payable"}]
  
  const XDO_UNIPOOL_STAKING_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lqtyTokenAddress","type":"address"}],"name":"LQTYTokenAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_uniTokenAddress","type":"address"}],"name":"UniTokenAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"duration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqtyToken","outputs":[{"internalType":"contract ILQTYToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lqtyTokenAddress","type":"address"},{"internalType":"address","name":"_uniTokenAddress","type":"address"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"setParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAndClaim","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  async function main() {
      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");
  
      const rewardTokenAddresses2 = [
        "0x3509f19581aFEDEff07c53592bc0Ca84e4855475",
        "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
      ]
      const xdoPool = {
        address: "0xc3fbc4056689cFAb3f23809Aa25004899Ff4D75a",
        abi: XDO_STAKING_ABI2,
        stakeTokenFunction: "lqtyToken",
        rewardTokenAddresses: rewardTokenAddresses2
      }
  
     const rewardTokenAddresses = [
      "0x9ef758ac000a354479e538b8b2f01b917b8e89e7",
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
    ]
    const XusdPool = {
      address : "0x573d2505a7ee69D136A8667b4Cd915f039AC54e5",
      abi : XDO_STABLE_STAKING_ABI,
      stakeTokenFunction : "lusdToken",
      rewardTokenAddresses : rewardTokenAddresses
    }
  
    const uniPool = {
      address: "0x727207a6DA8Be18D3b2bAccC81EF9b7D853151C9",
      abi: XDO_UNIPOOL_STAKING_ABI,
      stakeTokenFunction: "uniToken",
      rewardTokenFunction: "lqtyToken"
    }
  
      const tokens = {};
      const prices = await getArbitrumPrices();
  
      let p = await loadXdoPools(App, tokens, prices, [xdoPool]);
  
      await loadArbitrumSynthetixPoolInfo(App, tokens, prices, uniPool.abi, uniPool.address,
        uniPool.rewardTokenFunction, uniPool.stakeTokenFunction)
      //let p1 = await loadMultipleArbitrumSynthetixPools(App, tokens, prices, [uniPool]);
      
      const p0 = await loadXDollarPool(App, tokens, prices, XusdPool.abi, 
                                                            XusdPool.address, 
                                                            XusdPool.rewardTokenAddresses, 
                                                            XusdPool.stakeTokenFunction);
      
      let totalPStaked = formatMoney(p.totalUserStaked+p0.totalUserStaked/*+p1.totalUserStaked*/);
      let totalPAPR = ((p.totalUserStaked * p.totalAPR + p0.totalUserStaked * p0.totalAPR/* + p1.totalUserStaked * p1.totalAPR*/) / (p.totalUserStaked + p0.totalUserStaked/* + p1.totalUserStaked*/) * 100).toFixed(2)
      _print_bold(`Total staked: $${formatMoney(p.staked_tvl+p0.staked_tvl/*+p1.staked_tvl*/)}`);
      if (p.totalUserStaked > 0 || p0.totalUserStaked > 0/* || p1.totalUserStaked > 0*/) {
        _print(`You are staking a total of $${totalPStaked} at an APR of ${totalPAPR}%\n`);
      }
  
      hideLoading();
    }
  
  async function loadXDollarPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
      const info = await loadXDollarPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
      if (!info) return null;
      return await printXDollarPool(App, info, "arbitrum");
  }
  
  async function loadXDollarPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, rewardTokenAddresses,
    stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
      const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
      let stakeToken = await getArbitrumToken(App, stakeTokenAddress, stakeTokenAddress);
      stakeToken.staked = await STAKING_POOL.getTotalLUSDDeposits() / 10 ** stakeToken.decimals;
  
      var newTokenAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(tokens,x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getArbitrumToken(App, address, stakingAddress);
      }
      for(rewardTokenAddress of rewardTokenAddresses){
        if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getArbitrumToken(App, rewardTokenAddress, stakingAddress);
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
  
  
      const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");
  
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
    _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}#code">Arbitrum Explorer</a>`);
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

async function loadXdoPools(App, tokens, prices, pools, customURLs) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadXdoPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenAddresses, p.stakeTokenFunction)));
  for (const i of infos.filter(i => i?.poolPrices)) {
    let p = await printXdoPool(App, i, "arbitrum", customURLs);
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

    let stakeToken = await getArbitrumToken(App, stakeTokenAddress, stakeTokenAddress);
    stakeToken.staked = await STAKING_POOL.totalLQTYStaked() / 10 ** stakeToken.decimals;

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getArbitrumToken(App, address, stakingAddress);
    }
    for(rewardTokenAddress of rewardTokenAddresses){
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getArbitrumToken(App, rewardTokenAddress, stakingAddress);
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

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

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
  _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}#code">Polygon Explorer</a>`);
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