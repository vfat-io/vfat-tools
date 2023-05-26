
$(function() {
consoleInit(main)
  });

const KYBER_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC721","name":"_nft","type":"address"},{"internalType":"contract IKSElasticLMHelper","name":"_helper","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pId","type":"uint256"},{"indexed":false,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"uint32","name":"startTime","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"endTime","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"feeTarget","type":"uint256"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[],"name":"EmergencyEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"reward","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdrawForOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"nftId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"pId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"liq","type":"uint256"}],"name":"Exit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nftId","type":"uint256"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"address","name":"reward","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nftId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"pId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"liq","type":"uint256"}],"name":"Join","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IKSElasticLMHelper","name":"helper","type":"address"}],"name":"LMHelperUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint32","name":"startTime","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"endTime","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"feeTarget","type":"uint256"}],"name":"RenewPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nftId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"pId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"liq","type":"uint256"}],"name":"SyncLiq","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"TransferAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"grantOrRevoke","type":"bool"}],"name":"UpdateOperator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enableOrDisable","type":"bool"}],"name":"UpdateSpecialFeatureEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"uint32","name":"startTime","type":"uint32"},{"internalType":"uint32","name":"endTime","type":"uint32"},{"internalType":"address[]","name":"rewardTokens","type":"address[]"},{"internalType":"uint256[]","name":"rewardAmounts","type":"uint256[]"},{"internalType":"uint256","name":"feeTarget","type":"uint256"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"nftIds","type":"uint256[]"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"bool","name":"isReceiveNative","type":"bool"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"claimFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"nftIds","type":"uint256[]"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pId","type":"uint256"},{"internalType":"uint256[]","name":"nftIds","type":"uint256[]"}],"name":"depositAndJoin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyEnable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"nftIds","type":"uint256[]"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"rewards","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"emergencyWithdrawForOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pId","type":"uint256"},{"internalType":"uint256[]","name":"nftIds","type":"uint256[]"},{"internalType":"uint256[]","name":"liqs","type":"uint256[]"}],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getDepositedNFTs","outputs":[{"internalType":"uint256[]","name":"listNFTs","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getJoinedPools","outputs":[{"internalType":"uint256[]","name":"poolIds","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"fromIndex","type":"uint256"},{"internalType":"uint256","name":"toIndex","type":"uint256"}],"name":"getJoinedPoolsInRange","outputs":[{"internalType":"uint256[]","name":"poolIds","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pId","type":"uint256"}],"name":"getPoolInfo","outputs":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"uint32","name":"startTime","type":"uint32"},{"internalType":"uint32","name":"endTime","type":"uint32"},{"internalType":"uint256","name":"totalSecondsClaimed","type":"uint256"},{"internalType":"uint256","name":"feeTarget","type":"uint256"},{"internalType":"uint256","name":"numStakes","type":"uint256"},{"internalType":"address[]","name":"rewardTokens","type":"address[]"},{"internalType":"uint256[]","name":"rewardUnclaimeds","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"pId","type":"uint256"}],"name":"getRewardCalculationData","outputs":[{"components":[{"internalType":"uint128","name":"secondsPerLiquidityNow","type":"uint128"},{"internalType":"int256","name":"feeNow","type":"int256"},{"internalType":"uint256","name":"vestingVolume","type":"uint256"},{"internalType":"uint256","name":"totalSecondsUnclaimed","type":"uint256"},{"internalType":"uint256","name":"secondsPerLiquidity","type":"uint256"},{"internalType":"uint256","name":"secondsClaim","type":"uint256"}],"internalType":"struct IKyberSwapElasticLM.RewardCalculationData","name":"data","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"pId","type":"uint256"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256[]","name":"rewardPending","type":"uint256[]"},{"internalType":"uint256[]","name":"rewardLast","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"nftIds","type":"uint256[]"},{"internalType":"bytes[]","name":"datas","type":"bytes[]"}],"name":"harvestMultiplePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"isEmergencyWithdrawnNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pId","type":"uint256"},{"internalType":"uint256[]","name":"nftIds","type":"uint256[]"},{"internalType":"uint256[]","name":"liqs","type":"uint256[]"}],"name":"join","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nft","outputs":[{"internalType":"contract IERC721","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"operators","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pools","outputs":[{"internalType":"address","name":"poolAddress","type":"address"},{"internalType":"uint32","name":"startTime","type":"uint32"},{"internalType":"uint32","name":"endTime","type":"uint32"},{"internalType":"uint256","name":"totalSecondsClaimed","type":"uint256"},{"internalType":"uint256","name":"feeTarget","type":"uint256"},{"internalType":"uint256","name":"numStakes","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"positions","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"isReceiveNative","type":"bool"},{"internalType":"bool[2]","name":"claimFeeAndRewards","type":"bool[2]"}],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pId","type":"uint256"},{"internalType":"uint32","name":"startTime","type":"uint32"},{"internalType":"uint32","name":"endTime","type":"uint32"},{"internalType":"uint256[]","name":"rewardAmounts","type":"uint256[]"},{"internalType":"uint256","name":"feeTarget","type":"uint256"}],"name":"renewPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"specialFeatureEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakes","outputs":[{"internalType":"uint128","name":"secondsPerLiquidityLast","type":"uint128"},{"internalType":"int256","name":"feeFirst","type":"int256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"}],"name":"transferAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IKSElasticLMHelper","name":"_helper","type":"address"}],"name":"updateHelper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bool","name":"grantOrRevoke","type":"bool"}],"name":"updateOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"enableOrDisable","type":"bool"}],"name":"updateSpecialFeatureEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"weth","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"nftIds","type":"uint256[]"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const KYBER_NFT_ABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"},{"internalType":"address","name":"_descriptor","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"additionalRTokenOwed","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"BurnPosition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rTokenBurn","type":"uint256"}],"name":"BurnRToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint80","name":"poolId","type":"uint80"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"MintPosition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"additionalRTokenOwed","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"additionalRTokenOwed","type":"uint256"}],"name":"SyncFeeGrowth","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"int24[2]","name":"ticksPrevious","type":"int24[2]"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct IBasePositionManager.IncreaseLiquidityParams","name":"params","type":"tuple"}],"name":"addLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"uint256","name":"additionalRTokenOwed","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressToPoolId","outputs":[{"internalType":"uint80","name":"","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"antiSnipAttackData","outputs":[{"internalType":"uint32","name":"lastActionTime","type":"uint32"},{"internalType":"uint32","name":"lockTime","type":"uint32"},{"internalType":"uint32","name":"unlockTime","type":"uint32"},{"internalType":"uint256","name":"feesLocked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct IBasePositionManager.BurnRTokenParams","name":"params","type":"tuple"}],"name":"burnRTokens","outputs":[{"internalType":"uint256","name":"rTokenQty","type":"uint256"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"uint160","name":"currentSqrtP","type":"uint160"}],"name":"createAndUnlockPoolIfNecessary","outputs":[{"internalType":"address","name":"pool","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isRToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"int24[2]","name":"ticksPrevious","type":"int24[2]"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct IBasePositionManager.MintParams","name":"params","type":"tuple"}],"name":"mint","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"deltaQty0","type":"uint256"},{"internalType":"uint256","name":"deltaQty1","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"mintCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextPoolId","outputs":[{"internalType":"uint80","name":"","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextTokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"positions","outputs":[{"components":[{"internalType":"uint96","name":"nonce","type":"uint96"},{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint80","name":"poolId","type":"uint80"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"rTokenOwed","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInsideLast","type":"uint256"}],"internalType":"struct IBasePositionManager.Position","name":"pos","type":"tuple"},{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"address","name":"token1","type":"address"}],"internalType":"struct IBasePositionManager.PoolInfo","name":"info","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refundEth","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct IBasePositionManager.RemoveLiquidityParams","name":"params","type":"tuple"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"uint256","name":"additionalRTokenOwed","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"syncFeeGrowth","outputs":[{"internalType":"uint256","name":"additionalRTokenOwed","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"minAmount","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"transferAllTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minAmount","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWeth","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const KYBER_CHEF_ADDR = "0x7D5ba536ab244aAA1EA42aB88428847F25E3E676";
   const KYBER_CHEF = new ethers.Contract(KYBER_CHEF_ADDR, KYBER_CHEF_ABI, App.provider);

    const tokens = {};
    const prices = await getArbitrumPrices();

    await loadKyberChefContract(App, tokens, prices, KYBER_CHEF, KYBER_CHEF_ADDR, KYBER_CHEF_ABI);

    hideLoading();
  }

async function loadKyberChefContract(App, tokens, prices, chef, chefAddress, chefAbi, deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  // const poolCount = parseInt(await chefContract.poolLength(), 10);
  const poolCount = 20

  _print(`<a href='https://arbiscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);
  _print(`Calculating the total staked for each pool... This may take more than 5 minutes please be patient\n`);

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getKyberPoolInfo(App, chefContract, chefAddress, x)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getArbitrumToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
      .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printKyberChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        poolInfos[i].rewardsPerWeek1, poolInfos[i].rewardsPerWeek2, poolInfos[i].rewardTokenTicker1, poolInfos[i].rewardTokenTicker2, poolInfos[i].rewardTokenAddress1, poolInfos[i].rewardTokenAddress2,
        poolInfos[i].pendingRewards1, poolInfos[i].pendingRewards2, null, "arbitrum", poolInfos[i].userNftIds)
      aprs.push(apr);
    }
  }
  let totalUserStaked = 0, totalStaked = 0, averageApr = 0;
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
      + ` Day $${formatMoney(totalUserStaked * averageApr / 365)}`
      + ` Week $${formatMoney(totalUserStaked * averageApr / 52)}`
      + ` Year $${formatMoney(totalUserStaked * averageApr)}\n`);
  }
  return { prices, totalUserStaked, totalStaked, averageApr }
}

function printKyberChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
  rewardsPerWeek1, rewardsPerWeek2, rewardTokenTicker1, rewardTokenTicker2, rewardTokenAddress1, rewardTokenAddress2,
  pendingRewards1, pendingRewards2, fixedDecimals, chain = "eth", userNftIds) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek1 = rewardsPerWeek1;
  var poolRewardsPerWeek2 = rewardsPerWeek2;
  if (poolRewardsPerWeek1 == 0 && rewardsPerWeek1 != 0) return;
  if (poolRewardsPerWeek2 == 0 && rewardsPerWeek2 != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice1 = getParameterCaseInsensitive(prices, rewardTokenAddress1)?.usd;
  const rewardPrice2 = getParameterCaseInsensitive(prices, rewardTokenAddress2)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  const pendingRewardTokens1 = pendingRewards1 / 1e18;
  const pendingRewardTokens2 = pendingRewards2 / 1e18;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printKyberAPR(rewardTokenTicker1, rewardTokenTicker2, rewardPrice1, rewardPrice2, poolRewardsPerWeek1, poolRewardsPerWeek2, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printKyberChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewards1, pendingRewards2,
    rewardTokenTicker1, rewardTokenTicker2, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, pendingRewardTokens1, pendingRewardTokens2, fixedDecimals, rewardPrice1, rewardPrice2, chain, userNftIds);
  return apr;
}

function printKyberChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewards1, pendingRewards2,
  rewardTokenTicker1, rewardTokenTicker2, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens1, pendingRewardTokens2,fixedDecimals, rewardTokenPrice1, rewardTokenPrice2, chain, userNftIds) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function () {
    return kyberArbitrumContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App, userNftIds)
  }
  const unstake = async function () {
    return kyberArbitrumContract_unstake(chefAbi, chefAddr, poolIndex, App, userNftIds)
  }
  const claim = async function () {
    return chefArbitrumContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens1.toFixed(fixedDecimals)} ${rewardTokenTicker1} ($${formatMoney(pendingRewardTokens1 * rewardTokenPrice1)}) + ${pendingRewardTokens2.toFixed(fixedDecimals)} ${rewardTokenTicker2} ($${formatMoney(pendingRewardTokens2 * rewardTokenPrice2)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

function printKyberAPR(rewardTokenTicker1, rewardTokenTicker2, rewardPrice1, rewardPrice2, poolRewardsPerWeek1, poolRewardsPerWeek2,
                  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  var usdPerWeek1 = poolRewardsPerWeek1 * rewardPrice1;
  var usdPerWeek2 = poolRewardsPerWeek2 * rewardPrice2;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker1} Per Week: ${poolRewardsPerWeek1.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek1)})`);
  _print(`${rewardTokenTicker2} Per Week: ${poolRewardsPerWeek2.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek2)})`);
  var weeklyAPR1 = usdPerWeek1 / staked_tvl * 100;
  var dailyAPR1 = weeklyAPR1 / 7;
  var yearlyAPR1 = weeklyAPR1 * 52;
  _print(`KNC APR: Day ${dailyAPR1.toFixed(2)}% Week ${weeklyAPR1.toFixed(2)}% Year ${yearlyAPR1.toFixed(2)}%`);
  var weeklyAPR2 = usdPerWeek2 / staked_tvl * 100;
  var dailyAPR2 = weeklyAPR2 / 7;
  var yearlyAPR2 = weeklyAPR2 * 52;
  _print(`ARB APR: Day ${dailyAPR2.toFixed(2)}% Week ${weeklyAPR2.toFixed(2)}% Year ${yearlyAPR2.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  var userWeeklyRewards1 = userStakedPct * poolRewardsPerWeek1 / 100;
  var userDailyRewards1 = userWeeklyRewards1 / 7;
  var userYearlyRewards1 = userWeeklyRewards1 * 52;
  var userWeeklyRewards2 = userStakedPct * poolRewardsPerWeek2 / 100;
  var userDailyRewards2 = userWeeklyRewards2 / 7;
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
    yearlyAPR : yearlyAPR1 + yearlyAPR2,
    userYearlyUsd : userYearlyRewards1 * rewardPrice1 + userYearlyRewards2 * rewardPrice2
  }
}

async function getKyberPoolInfo(app, chefContract, chefAddress, poolIndex) {
  const nftContractAddr = "0xe222fbe074a436145b255442d919e4e3a6c6a480";
  // const nftContract = new ethers.Contract(nftContractAddr, KYBER_NFT_ABI, app.provider);
  // const totalSupplyNfts = await nftContract.totalSupply() / 1;
  const poolInfo = await chefContract.getPoolInfo(poolIndex);
  const poolToken = await getArbitrumToken(app, poolInfo.poolAddress, nftContractAddr);
  // let totalStaked = 0;
  // for(let i = 1; i <= totalSupplyNfts; i++){
  //   try{
  //     const userInfo = await chefContract.getUserInfo(i, poolIndex);
  //     totalStaked += userInfo.liquidity / 10 ** poolToken.decimals;
  //   }catch(err){
  //     console.log(err);
  //   }
  // }
  const userNftIds = await chefContract.getDepositedNFTs(app.YOUR_ADDRESS);
  poolToken.staked = totalStaked;
  let pendingRewardTokens1 = 0;
  let pendingRewardTokens2 = 0;
  let staked = 0;
  if(userNftIds.length > 0){
    try{
      for(const userNftId of userNftIds){
        const userInfo = await chefContract.getUserInfo(userNftId, poolIndex);
        pendingRewardTokens1 += userInfo.rewardPending[0] //may have more than one NFT
        pendingRewardTokens2 += userInfo.rewardPending[1]
        staked = userInfo.liquidity / 10 ** poolToken.decimals;
      }
    }catch(err){
      pendingRewardTokens1 = 0
      pendingRewardTokens2 = 0
      staked = 0
    }
  }
  const rewardTokenAddress1 = "0xe4DDDfe67E7164b0FE14E218d80dC4C08eDC01cB"; //KNC
  const rewardTokenAddress2 = "0x912CE59144191C1204E64559FE8253a0e49E6548"; //ARB
  const rewardTokenTicker1 = "KNC";
  const rewardTokenTicker2 = "ARB";
  const rewardsPerWeek1 = poolInfo.rewardUnclaimeds[0] / 1e18;
  const rewardsPerWeek2 = poolInfo.rewardUnclaimeds[1] / 1e18;
  return {
    address: poolInfo.poolAddress,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewards1: pendingRewardTokens1,
    pendingRewards2: pendingRewardTokens2,
    rewardTokenAddress1: rewardTokenAddress1,
    rewardTokenAddress2: rewardTokenAddress2,
    rewardTokenTicker1: rewardTokenTicker1,
    rewardTokenTicker2: rewardTokenTicker2,
    rewardsPerWeek1: rewardsPerWeek1,
    rewardsPerWeek2: rewardsPerWeek2,
    userNftIds: userNftIds
  };
}

const kyberArbitrumContract_stake = async function (chefAbi, chefAddress, poolIndex, stakeTokenAddr, App, userNftIds) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract("0xe222fbe074a436145b255442d919e4e3a6c6a480", KYBER_NFT_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  let allow = Promise.resolve()

  if (userNftIds.length > 0) {
    showLoading()
    for(const userNftId of userNftIds){
      allow = STAKING_TOKEN.approve(chefAddress, userNftId, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
    }
  }

  if (userNftIds.length > 0) {
    showLoading()
    allow
      .then(async function () {
        CHEF_CONTRACT.depositAndJoin(poolIndex, userNftIds)
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
    alert('You have no nft to stake!!')
  }
}

const kyberArbitrumContract_unstake = async function (chefAbi, chefAddress, poolIndex, App, userNftIds) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  showLoading()
    CHEF_CONTRACT.withdraw(userNftIds)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
      })
}