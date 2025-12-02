$(function () {
  consoleInit(main)
});

const CAKE_V3_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_CAKE","type":"address"},{"internalType":"contract INonfungiblePositionManager","name":"_nonfungiblePositionManager","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"DuplicatedPool","type":"error"},{"inputs":[],"name":"InconsistentAmount","type":"error"},{"inputs":[],"name":"InsufficientAmount","type":"error"},{"inputs":[],"name":"InvalidNFT","type":"error"},{"inputs":[],"name":"InvalidPeriodDuration","type":"error"},{"inputs":[],"name":"InvalidPid","type":"error"},{"inputs":[],"name":"NoBalance","type":"error"},{"inputs":[],"name":"NoLMPool","type":"error"},{"inputs":[],"name":"NoLiquidity","type":"error"},{"inputs":[],"name":"NotEmpty","type":"error"},{"inputs":[],"name":"NotOwner","type":"error"},{"inputs":[],"name":"NotOwnerOrOperator","type":"error"},{"inputs":[],"name":"NotPancakeNFT","type":"error"},{"inputs":[],"name":"WrongReceiver","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IPancakeV3Pool","name":"v3Pool","type":"address"},{"indexed":true,"internalType":"contract ILMPool","name":"lmPool","type":"address"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"},{"indexed":false,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":false,"internalType":"int24","name":"tickUpper","type":"int24"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"deployer","type":"address"}],"name":"NewLMPoolDeployerAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"}],"name":"NewOperatorAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"periodDuration","type":"uint256"}],"name":"NewPeriodDuration","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"}],"name":"NewReceiver","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"periodNumber","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cakePerSecond","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cakeAmount","type":"uint256"}],"name":"NewUpkeepPeriod","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"emergency","type":"bool"}],"name":"SetEmergency","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"SetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"farmBoostContract","type":"address"}],"name":"UpdateFarmBoostContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"int128","name":"liquidity","type":"int128"},{"indexed":false,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":false,"internalType":"int24","name":"tickUpper","type":"int24"}],"name":"UpdateLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"periodNumber","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"oldEndTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newEndTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"remainingCake","type":"uint256"}],"name":"UpdateUpkeepPeriod","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BOOST_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CAKE","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FARM_BOOSTER","outputs":[{"internalType":"contract IFarmBooster","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LMPoolDeployer","outputs":[{"internalType":"contract ILMPoolDeployer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_BOOST_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERIOD_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IPancakeV3Pool","name":"_v3Pool","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cakeAmountBelongToMC","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Max","type":"uint128"},{"internalType":"uint128","name":"amount1Max","type":"uint128"}],"internalType":"struct INonfungiblePositionManagerStruct.CollectParams","name":"params","type":"tuple"}],"name":"collect","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Max","type":"uint128"},{"internalType":"uint128","name":"amount1Max","type":"uint128"}],"internalType":"struct INonfungiblePositionManagerStruct.CollectParams","name":"params","type":"tuple"},{"internalType":"address","name":"to","type":"address"}],"name":"collectTo","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManagerStruct.DecreaseLiquidityParams","name":"params","type":"tuple"}],"name":"decreaseLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergency","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_v3Pool","type":"address"}],"name":"getLatestPeriodInfo","outputs":[{"internalType":"uint256","name":"cakePerSecond","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getLatestPeriodInfoByPid","outputs":[{"internalType":"uint256","name":"cakePerSecond","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"harvest","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManagerStruct.IncreaseLiquidityParams","name":"params","type":"tuple"}],"name":"increaseLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"latestPeriodCakePerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestPeriodEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestPeriodNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestPeriodStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"nonfungiblePositionManager","outputs":[{"internalType":"contract INonfungiblePositionManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"operatorAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"pendingCake","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"contract IPancakeV3Pool","name":"v3Pool","type":"address"},{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"uint256","name":"totalLiquidity","type":"uint256"},{"internalType":"uint256","name":"totalBoostLiquidity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"receiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_emergency","type":"bool"}],"name":"setEmergency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ILMPoolDeployer","name":"_LMPoolDeployer","type":"address"}],"name":"setLMPoolDeployer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operatorAddress","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_periodDuration","type":"uint256"}],"name":"setPeriodDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"}],"name":"setReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_newMultiplier","type":"uint256"}],"name":"updateBoostMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newFarmBoostContract","type":"address"}],"name":"updateFarmBoostContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"updateLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"updatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"upkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userPositionInfos","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint128","name":"boostLiquidity","type":"uint128"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"rewardGrowthInside","type":"uint256"},{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"boostMultiplier","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"v3PoolAddressPid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const SICKLE_FACTORY_ABI = [{"inputs":[{"internalType":"address","name":"admin_","type":"address"},{"internalType":"address","name":"sickleRegistry_","type":"address"},{"internalType":"address","name":"sickleImplementation_","type":"address"},{"internalType":"address","name":"previousFactory_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"caller","type":"address"}],"name":"CallerNotWhitelisted","type":"error"},{"inputs":[],"name":"NotActive","type":"error"},{"inputs":[],"name":"NotAdminError","type":"error"},{"inputs":[],"name":"SickleAlreadyDeployed","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"},{"indexed":false,"internalType":"address","name":"sickle","type":"address"}],"name":"Deploy","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_referralCodes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sickle","type":"address"}],"name":"admins","outputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"deploy","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"},{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"getOrDeploy","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"name":"predict","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"previousFactory","outputs":[{"internalType":"contract SickleFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sickle","type":"address"}],"name":"referralCodes","outputs":[{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract SickleRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"active","type":"bool"}],"name":"setActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"name":"sickles","outputs":[{"internalType":"address","name":"sickle","type":"address"}],"stateMutability":"view","type":"function"}]

const NFT_FARM_STRATEGY_ABI = [{"inputs":[{"internalType":"contract SickleFactory","name":"factory_","type":"address"},{"internalType":"contract FeesLib","name":"feesLib_","type":"address"},{"internalType":"contract ConnectorRegistry","name":"connectorRegistry_","type":"address"},{"internalType":"address","name":"wrappedNativeAddress_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ETHTransferFailed","type":"error"},{"inputs":[],"name":"IncorrectMsgValue","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"NotOwner","type":"error"},{"inputs":[],"name":"NotOwnerOrApproved","type":"error"},{"inputs":[],"name":"NotOwnerOrApprovedOrInternal","type":"error"},{"inputs":[],"name":"NotOwnerOrInternal","type":"error"},{"inputs":[],"name":"NotRegisteredSickle","type":"error"},{"inputs":[],"name":"SickleNotDeployed","type":"error"},{"inputs":[],"name":"TransferFailed","type":"error"},{"inputs":[],"name":"TransferFromFailed","type":"error"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"wrappedNative","type":"address"},{"internalType":"uint256","name":"amountToCharge","type":"uint256"}],"name":"_sickle_chargeTransactionCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeDescriptor","type":"bytes4"},{"internalType":"address","name":"tokenOut","type":"address"}],"name":"_sickle_charge_fees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"_sickle_transfer_erc1155_from_user","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"_sickle_transfer_erc1155_to_user","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeSelector","type":"bytes4"}],"name":"_sickle_transfer_from_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"_sickle_transfer_nft_from_user","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"_sickle_transfer_nft_to_user","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"_sickle_transfer_to_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"connectorRegistry","outputs":[{"internalType":"contract ConnectorRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"},{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"depositErc721","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract SickleFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesLib","outputs":[{"internalType":"contract FeesLib","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftContractAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"},{"internalType":"address[]","name":"sweepTokens","type":"address[]"}],"name":"withdrawErc721","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wrappedNativeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

const FARM_STRATEGY_ABI = [{"inputs":[{"internalType":"contract SickleFactory","name":"factory_","type":"address"},{"internalType":"contract FeesLib","name":"feesLib_","type":"address"},{"internalType":"contract ConnectorRegistry","name":"connectorRegistry_","type":"address"},{"internalType":"address","name":"wrappedNativeAddress_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ArrayLengthMismatch","type":"error"},{"inputs":[],"name":"ETHTransferFailed","type":"error"},{"inputs":[],"name":"IncorrectMsgValue","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"NotOwner","type":"error"},{"inputs":[],"name":"NotOwnerOrApproved","type":"error"},{"inputs":[],"name":"NotOwnerOrApprovedOrInternal","type":"error"},{"inputs":[],"name":"NotOwnerOrInternal","type":"error"},{"inputs":[],"name":"NotRegisteredSickle","type":"error"},{"inputs":[],"name":"SickleNotDeployed","type":"error"},{"inputs":[],"name":"TokenInRequired","type":"error"},{"inputs":[],"name":"TransferFailed","type":"error"},{"inputs":[],"name":"TransferFromFailed","type":"error"},{"inputs":[{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeDescriptor","type":"bytes4"},{"internalType":"address","name":"feeToken","type":"address"}],"name":"_sickle_charge_fee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeDescriptor","type":"bytes4"},{"internalType":"address[]","name":"feeTokens","type":"address[]"}],"name":"_sickle_charge_fees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"wrappedNative","type":"address"},{"internalType":"uint256","name":"amountToCharge","type":"uint256"}],"name":"_sickle_charge_transaction_cost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeSelector","type":"bytes4"}],"name":"_sickle_transfer_token_from_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"_sickle_transfer_token_to_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokensIn","type":"address[]"},{"internalType":"uint256[]","name":"amountsIn","type":"uint256[]"},{"internalType":"address","name":"strategy","type":"address"},{"internalType":"bytes4","name":"feeSelector","type":"bytes4"}],"name":"_sickle_transfer_tokens_from_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"_sickle_transfer_tokens_to_user","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct SimpleFarmStrategy.DepositParams","name":"params","type":"tuple"},{"internalType":"address","name":"approved","type":"address"},{"internalType":"bytes32","name":"referralCode","type":"bytes32"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address[]","name":"tokensOut","type":"address[]"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct SimpleFarmStrategy.HarvestParams","name":"harvestParams","type":"tuple"},{"components":[{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct SimpleFarmStrategy.WithdrawParams","name":"withdrawParams","type":"tuple"}],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract SickleFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesLib","outputs":[{"internalType":"contract FeesLib","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address[]","name":"tokensOut","type":"address[]"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct SimpleFarmStrategy.HarvestParams","name":"params","type":"tuple"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"lpToken","type":"address"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address","name":"stakingContractAddress","type":"address"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"internalType":"struct SimpleFarmStrategy.WithdrawParams","name":"params","type":"tuple"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wrappedNativeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

const NFT_POSITION_MANAGER_ABI = [{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"positions","outputs":[{"internalType":"uint96","name":"nonce","type":"uint96"},{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"}]

const NFT_TOKEN_ADDRESS = "0x46A15B0b27311cedF172AB29E4f4766fbE7F4364";
const NFT_FARM_STRATEGY_ADDRESS = "0xFfF75D099baeE29F447866bC5299Cd67C04761C8";
const FARM_STRATEGY_ADDRESS = "0x71D234A3e1dfC161cc1d081E6496e76627baAc31";

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");
  
  const CAKE_V3_CHEF_ADDR = "0x22e2f236065b780fa33ec8c4e58b99ebc8b55c57";
  const rewardTokenTicker = "CAKE";
  const CAKE_V3_CHEF = new ethers.Contract(CAKE_V3_CHEF_ADDR, CAKE_V3_CHEF_ABI, App.provider);

  const SICKLE_FACTORY_ADDR = "0x0F6aBc6B808B377d6AeD8dA1FAD5E135C99C81a3";
  const SICKLE_FACTORY = new ethers.Contract(SICKLE_FACTORY_ADDR, SICKLE_FACTORY_ABI, App.provider);
  const sickle_account_address = await SICKLE_FACTORY.sickles(App.YOUR_ADDRESS);
  const has_sickle_account = sickle_account_address === "0x0000000000000000000000000000000000000000" ? false : true;
  const owner_sickle_address = App.YOUR_ADDRESS;
  if(has_sickle_account){
    App.YOUR_ADDRESS = sickle_account_address;
  }

  const prices = await getLineaPrices();

  await loadPancakeV3Contract(App, prices, CAKE_V3_CHEF, CAKE_V3_CHEF_ADDR, CAKE_V3_CHEF_ABI, rewardTokenTicker, "0x0D1E753a25eBda689453309112904807625bEFBe", sickle_account_address, has_sickle_account, owner_sickle_address);

  hideLoading();
}

async function loadPancakeV3Contract(App, prices, chefContract, chefAddress, chefAbi, rewardTokenTicker, rewardTokenAddress, sickle_account_address, has_sickle_account, owner_sickle_address) {
  const totalUsersStakedNfts = await chefContract.balanceOf(App.YOUR_ADDRESS) / 1;
  const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const nftManager = new ethers.Contract(NFT_TOKEN_ADDRESS, NFT_POSITION_MANAGER_ABI, App.provider);
  
  let userPositionInfos = [];
  for(let i = 0; i < totalUsersStakedNfts; i++){
    const userNftId = await chefContract.tokenOfOwnerByIndex(App.YOUR_ADDRESS, i);
    const pendingCakes = await chefContract.pendingCake(userNftId);
    const userPositionInfo = await chefContract.userPositionInfos(userNftId);
    const pid = userPositionInfo.pid;
    const poolInfo = await chefContract.poolInfo(pid);
    const token0Address = poolInfo.token0;
    const token1Address = poolInfo.token1;
    const token0Contract = new ethers.Contract(token0Address, ERC20_ABI, App.provider);
    const token1Contract = new ethers.Contract(token1Address, ERC20_ABI, App.provider);
    const token0Symbol = await token0Contract.symbol();
    const token1Symbol = await token1Contract.symbol();
    const token0Decimals = await token0Contract.decimals();
    const token1Decimals = await token1Contract.decimals();
    
    // Query NFT position to get position data and calculate token amounts
    const positionData = await nftManager.positions(userNftId);
    
    // Get the actual V3 pool address from poolInfo
    const poolAddress = poolInfo.v3Pool;
    
    const poolContract = new ethers.Contract(poolAddress, ['function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)', 'function tickSpacing() view returns (int24)'], App.provider);
    const [poolSlot0, poolTickSpacing] = await Promise.all([
      poolContract.slot0(),
      poolContract.tickSpacing()
    ]);
    
    let amount0 = 0;
    let amount1 = 0;
    
    // Calculate token amounts from position using UniswapV3 helper
    if (window.UniswapV3?.calculateUserLiquidity) {
      const { liquidity0, liquidity1 } = window.UniswapV3.calculateUserLiquidity(poolSlot0.sqrtPriceX96, {
        tickLow: positionData.tickLower,
        tickUp: positionData.tickUpper,
        liquidity: positionData.liquidity
      });
      
      // Divide as BigInt first, then convert to Number to avoid precision issues
      const decimals0BigInt = BigInt(Math.pow(10, Number(token0Decimals)));
      const decimals1BigInt = BigInt(Math.pow(10, Number(token1Decimals)));
      
      amount0 = Number(liquidity0 / decimals0BigInt) + Number(liquidity0 % decimals0BigInt) / Number(decimals0BigInt);
      amount1 = Number(liquidity1 / decimals1BigInt) + Number(liquidity1 % decimals1BigInt) / Number(decimals1BigInt);
    }
    
    userPositionInfos.push({
      userPositionInfo: userPositionInfo, 
      userNftId: userNftId, 
      pid: Number(pid),  // Pool ID from MasterChef (convert BigNumber to number)
      pendingCakes: pendingCakes / 1e18,
      pendingCakesRaw: pendingCakes,  // Keep raw BigNumber for SDK
      token0Symbol: token0Symbol, 
      token1Symbol: token1Symbol, 
      token0Address: token0Address, 
      token1Address: token1Address,
      token0Decimals: token0Decimals,
      token1Decimals: token1Decimals,
      positionData: positionData,
      poolAddress: poolAddress,
      poolSlot0: poolSlot0,
      poolTickSpacing: poolTickSpacing,
      amount0: amount0,
      amount1: amount1
    });
  }
  if(userPositionInfos.length <= 0){
    _print("You have no positions");
  }else{
    if(has_sickle_account){
      _print_bold(`You have connected with your sickle account: ${sickle_account_address}`);
      _print("");
    }
    _print(`<a href='https://lineascan.build/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print("");
    printPancakePool(App, chefAbi, chefAddress, userPositionInfos, rewardTokenTicker, rewardTokenPrice, has_sickle_account, owner_sickle_address, prices);
  }
}

function printPancakePool(App, chefAbi, chefAddr, userPositionInfos, rewardTokenTicker, rewardTokenPrice, has_sickle_account, owner_sickle_address, prices) {
  for(let i = 0; i < userPositionInfos.length; i++){
    _print(`Pool: ${userPositionInfos[i].token0Symbol} - ${userPositionInfos[i].token1Symbol}`);
    _print(`Nft ID: ${userPositionInfos[i].userNftId} (${userPositionInfos[i].amount0.toFixed(4)} ${userPositionInfos[i].token0Symbol} - ${userPositionInfos[i].amount1.toFixed(4)} ${userPositionInfos[i].token1Symbol})`);
    printCakeV3ContractLinks(
      App, 
      chefAbi, 
      chefAddr, 
      userPositionInfos[i],
      rewardTokenTicker, 
      rewardTokenPrice, 
      has_sickle_account, 
      owner_sickle_address, 
      prices
    );
  }
}

function printCakeV3ContractLinks(App, chefAbi, chefAddr, positionInfo, rewardTokenTicker, rewardTokenPrice, has_sickle_account, owner_sickle_address, prices) {
  const fixedDecimals = 2;
  const userNftId = positionInfo.userNftId;
  const pendingCakes = positionInfo.pendingCakes;
  const token0Address = positionInfo.token0Address;
  const token1Address = positionInfo.token1Address;
  const token0Symbol = positionInfo.token0Symbol;
  const token1Symbol = positionInfo.token1Symbol;
  const amount0 = positionInfo.amount0;
  const amount1 = positionInfo.amount1;
  
  const unstake = async function() {
    return pancakeV3Contract_unstake(chefAbi, chefAddr, userNftId, App, owner_sickle_address);
  }
  const sickle_unstake = async function() {
    return sickle_pancakeV3Contract_unstake(userNftId, App, token0Address, token1Address);
  }
  const claim = async function() {
    return pancakeV3Contract_claim(chefAbi, chefAddr, userNftId, App, owner_sickle_address);
  }
  const sickle_claim = async function() {
    return sickle_pancakeV3Contract_claim(userNftId, App, token0Address, token1Address);
  }
  
  if(has_sickle_account){
    _print_link(`Withdraw Nft ID: ${userNftId}`, sickle_unstake);
  }else{
    _print_link(`Withdraw Nft ID: ${userNftId}`, unstake);
  }
  
  // Sickle SDK - Withdraw to Underlying Tokens
  if (has_sickle_account && window.Sickle?.withdraw) {
    _print_link(
      `Exit NFT #${userNftId} to Underlying (${amount0.toFixed(4)} ${token0Symbol} + ${amount1.toFixed(4)} ${token1Symbol})`,
      async () => {
        try {
          const poolData = {
            stakingAddress: chefAddr,
            poolAddress: positionInfo.poolAddress,
            pid: positionInfo.pid
          }
          
          await window.Sickle.withdraw.withdrawToUnderlying(poolData, userNftId)
        } catch (error) {
          console.error('Withdraw to underlying failed:', error)
          alert(`Withdraw failed: ${error.message}`)
        }
      }
    )
  }
  
  // Sickle SDK - Withdraw to Native Token
  if (has_sickle_account && window.Sickle?.withdraw) {
    // Get native token symbol dynamically (Linea chain ID is 59144)
    const nativeSymbol = window.Sickle?.SickleUtils?.getNativeTokenSymbol?.(59144) || 'ETH'
    
    _print_link(
      `Exit NFT #${userNftId} to ${nativeSymbol}`,
      async () => {
        try {
          const poolData = {
            stakingAddress: chefAddr,
            poolAddress: positionInfo.poolAddress,
            pid: positionInfo.pid
          }
          
          await window.Sickle.withdraw.withdrawToToken(poolData, userNftId)
        } catch (error) {
          console.error('Withdraw to token failed:', error)
          alert(`Withdraw failed: ${error.message}`)
        }
      }
    )
  }
  if(has_sickle_account){
    _print_link(`Claim ${pendingCakes.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingCakes*rewardTokenPrice)})`, sickle_claim)
  }else{
    _print_link(`Claim ${pendingCakes.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingCakes*rewardTokenPrice)})`, claim)
  }
  
  // Sickle SDK - Rebalance functionality
  if (has_sickle_account && window.Sickle?.rebalance && positionInfo.positionData) {
    const positionData = positionInfo.positionData;
    const tickLower = positionData.tickLower;
    const tickUpper = positionData.tickUpper;
    const currentTick = positionInfo.poolSlot0.tick;
    const isInRange = currentTick >= tickLower && currentTick < tickUpper;
    const rangeStatus = isInRange ? '✅ In Range' : '⚠️ Out of Range';
    
    _print_link(
      `Rebalance NFT ID: ${userNftId} (${rangeStatus})`,
      async () => {
        try {
          const tickSpacing = Number(positionInfo.poolTickSpacing) || 1;
          
          if (!tickSpacing || isNaN(tickSpacing)) {
            alert('Unable to determine pool tick spacing. Cannot rebalance.');
            return;
          }
        
          const poolData = {
            stakingAddress: chefAddr,
            poolAddress: positionInfo.poolAddress,
            tickSpacing: tickSpacing,
            pid: positionInfo.pid  // Pool ID from MasterChef
          };
          
          console.log('Rebalance poolData:', poolData);
          console.log('chefAddr:', chefAddr);
          console.log('positionInfo.poolAddress:', positionInfo.poolAddress);
          
          await window.Sickle.rebalance.rebalance(
            poolData,
            userNftId,
            tickLower,
            tickUpper,
            currentTick
          );
        } catch (error) {
          console.error('Rebalance failed:', error);
          alert(`Rebalance failed: ${error.message}`);
        }
      }
    );
  }
  
  // Sickle SDK - Compound functionality
  if (has_sickle_account && window.Sickle?.compound && pendingCakes > 0) {
    const earningsUsd = pendingCakes * rewardTokenPrice;
    
    _print_link(
      `Compound NFT ID: ${userNftId} ${pendingCakes.toFixed(6)} ($${formatMoney(earningsUsd)})`,
      async () => {
        try {
          const poolData = {
            stakingAddress: chefAddr,
            poolAddress: positionInfo.poolAddress,
            pid: positionInfo.pid
          };
          
          // Pass the raw BigNumber amount (not divided by 1e18)
          await window.Sickle.compound.compound(poolData, userNftId, positionInfo.pendingCakesRaw);
        } catch (error) {
          console.error('Compound failed:', error);
          alert(`Compound failed: ${error.message}`);
        }
      }
    );
  }
  
  _print("");
}

function sickle_pancakeV3Contract_unstake(nft_id, App, token0Address, token1Address){
  const signer = App.provider.getSigner();
  const NFT_FARM_STRATEGY_CONTRACT = new ethers.Contract(NFT_FARM_STRATEGY_ADDRESS, NFT_FARM_STRATEGY_ABI, signer);

  const decodedExtraData = {
    tokenId: +nft_id,
    isIncrease: false,
    tokenBalance: 0,
    maxAmount0: "340282366920938463463374607431768211455",
    maxAmount1: "340282366920938463463374607431768211455",
  }

  const extraData = ethers.utils.defaultAbiCoder.encode(["tuple(uint256 tokenId, bool isIncrease, uint256 tokenBalance, uint128 maxAmount0, uint128 maxAmount1)"],[decodedExtraData]);

  const masterchef_address = "0x22e2f236065b780fa33ec8c4e58b99ebc8b55c57";
  const reward_token_address = "0x0D1E753a25eBda689453309112904807625bEFBe";

  const sweepTokens = [reward_token_address, token0Address, token1Address];

  showLoading()
  NFT_FARM_STRATEGY_CONTRACT.withdrawErc721(NFT_TOKEN_ADDRESS, nft_id, masterchef_address, extraData, sweepTokens)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {
      hideLoading()
    })
}

function sickle_pancakeV3Contract_claim(nft_id, App, token0Address, token1Address){
  const signer = App.provider.getSigner()

  const decodedExtraData = {
    tokenId: +nft_id,
    isIncrease: false,
    tokenBalance: 0,
    maxAmount0: "340282366920938463463374607431768211455",
    maxAmount1: "340282366920938463463374607431768211455",
  }

  const extraData = ethers.utils.defaultAbiCoder.encode(["tuple(uint256 tokenId, bool isIncrease, uint256 tokenBalance, uint128 maxAmount0, uint128 maxAmount1)"],[decodedExtraData]);

  const masterchef_address = "0x22e2f236065b780fa33ec8c4e58b99ebc8b55c57";
  const reward_token_address = "0x0D1E753a25eBda689453309112904807625bEFBe";

  const params = {
    tokensOut: [reward_token_address, token0Address, token1Address],
    stakingContractAddress: masterchef_address,
    extraData: extraData
  }

  const FARM_STRATEGY_CONTRACT = new ethers.Contract(FARM_STRATEGY_ADDRESS, FARM_STRATEGY_ABI, signer)

    showLoading()
    FARM_STRATEGY_CONTRACT.harvest(params)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
}

function pancakeV3Contract_unstake(abi, address, token_id, App, owner_sickle_address){
  const signer = App.provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  showLoading();

  contract.withdraw(token_id, owner_sickle_address).then(function(t) {
    return App.provider.waitForTransaction(t.hash);
  }).catch(function() {
    hideLoading();
  });
}

function pancakeV3Contract_claim(abi, address, token_id, App, owner_sickle_address){
  const signer = App.provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);

  showLoading();

  contract.harvest(token_id, owner_sickle_address).then(function(t) {
    return App.provider.waitForTransaction(t.hash);
  })
  .catch(function() {
    hideLoading();
  });
}
