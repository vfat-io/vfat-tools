$(function() {
    consoleInit(main);
  });

const COMFI_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_reservoir","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositd","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"migrator","type":"address"}],"name":"MigratorSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"RewardPerBlockSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"TokenAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldtoken","type":"address"},{"indexed":true,"internalType":"address","name":"newToken","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"}],"name":"TokenMigrated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"TokenSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"calcUnlocked","outputs":[{"internalType":"uint256","name":"claimable","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllPools","outputs":[{"components":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"}],"internalType":"struct LiquidityMining.PoolInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllUnlocks","outputs":[{"components":[{"internalType":"uint256","name":"block","type":"uint256"},{"internalType":"uint256","name":"quota","type":"uint256"}],"internalType":"struct LiquidityMining.UnlockInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"getPendingReward","outputs":[{"internalType":"uint256","name":"total","type":"uint256"},{"internalType":"uint256","name":"unlocked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"}],"name":"isTokenAdded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract IMigrator","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolPidByAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"reallocatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reservoir","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IMigrator","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"setRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_blocks","type":"uint256[]"},{"internalType":"uint256[]","name":"_quotas","type":"uint256[]"}],"name":"setUnlocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unlockCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"unlocks","outputs":[{"internalType":"uint256","name":"block","type":"uint256"},{"internalType":"uint256","name":"quota","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unlocksTotalQuotation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userPoolInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"accruedReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"withdrawEmergency","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const PROXY_ABI = [{"constant":false,"inputs":[],"name":"build","outputs":[{"name":"proxy","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"proxies","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"build","outputs":[{"name":"proxy","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"factory_","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
const COMPLIFI_POOL_ABI = [{"inputs":[{"internalType":"address","name":"_derivativeVault","type":"address"},{"internalType":"address","name":"_dynamicFee","type":"address"},{"internalType":"address","name":"_repricer","type":"address"},{"internalType":"uint256","name":"_baseFee","type":"uint256"},{"internalType":"uint256","name":"_maxFee","type":"uint256"},{"internalType":"uint256","name":"_feeAmp","type":"uint256"},{"internalType":"address","name":"_controller","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"amt","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LOG_CALL","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"tokenOut","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmountOut","type":"uint256"}],"name":"LOG_EXIT","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"tokenIn","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmountIn","type":"uint256"}],"name":"LOG_JOIN","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"repricingBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"balancePrimary","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"balanceComplement","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"leveragePrimary","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"leverageComplement","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newLeveragePrimary","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newLeverageComplement","type":"uint256"},{"indexed":false,"internalType":"int256","name":"estPricePrimary","type":"int256"},{"indexed":false,"internalType":"int256","name":"estPriceComplement","type":"int256"},{"indexed":false,"internalType":"int256","name":"liveUnderlingValue","type":"int256"}],"name":"LOG_REPRICE","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"tokenIn","type":"address"},{"indexed":true,"internalType":"address","name":"tokenOut","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenAmountOut","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenBalanceIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenBalanceOut","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenLeverageIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenLeverageOut","type":"uint256"}],"name":"LOG_SWAP","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"amt","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"BONE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BOUND_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_IN_RATIO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_OUT_RATIO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_POW_BASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_POW_BASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"POW_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"whom","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenBalanceIn","type":"uint256"},{"internalType":"uint256","name":"tokenBalanceOut","type":"uint256"},{"internalType":"uint256","name":"tokenAmountOut","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"}],"name":"calcInGivenOut","outputs":[{"internalType":"uint256","name":"tokenAmountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenBalanceIn","type":"uint256"},{"internalType":"uint256","name":"tokenBalanceOut","type":"uint256"},{"internalType":"uint256","name":"tokenAmountIn","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"}],"name":"calcOutGivenIn","outputs":[{"internalType":"uint256","name":"tokenAmountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenBalanceIn","type":"uint256"},{"internalType":"uint256","name":"tokenBalanceOut","type":"uint256"},{"internalType":"uint256","name":"swapFee","type":"uint256"}],"name":"calcSpotPrice","outputs":[{"internalType":"uint256","name":"spotPrice","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"decreaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"derivativeVault","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dynamicFee","outputs":[{"internalType":"contract IDynamicFee","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exposureLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeAmp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getColor","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"iBONE","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"increaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pMin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"qMin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"repricer","outputs":[{"internalType":"contract IRepricer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"repricingBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"volatility","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isFinalized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokens","outputs":[{"internalType":"address[2]","name":"tokens","type":"address[2]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getLeverage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_primaryBalance","type":"uint256"},{"internalType":"uint256","name":"_primaryLeverage","type":"uint256"},{"internalType":"uint256","name":"_complementBalance","type":"uint256"},{"internalType":"uint256","name":"_complementLeverage","type":"uint256"},{"internalType":"uint256","name":"_exposureLimit","type":"uint256"},{"internalType":"uint256","name":"_volatility","type":"uint256"},{"internalType":"uint256","name":"_pMin","type":"uint256"},{"internalType":"uint256","name":"_qMin","type":"uint256"}],"name":"finalize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolAmountOut","type":"uint256"},{"internalType":"uint256[2]","name":"maxAmountsIn","type":"uint256[2]"}],"name":"joinPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"poolAmountIn","type":"uint256"},{"internalType":"uint256[2]","name":"minAmountsOut","type":"uint256[2]"}],"name":"exitPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"uint256","name":"tokenAmountIn","type":"uint256"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint256","name":"minAmountOut","type":"uint256"}],"name":"swapExactAmountIn","outputs":[{"internalType":"uint256","name":"tokenAmountOut","type":"uint256"},{"internalType":"uint256","name":"spotPriceAfter","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}];
const COMPLIFI_VAULT_ABI =  [{"inputs":[{"internalType":"uint256","name":"_liveTime","type":"uint256"},{"internalType":"uint256","name":"_protocolFee","type":"uint256"},{"internalType":"address","name":"_feeWallet","type":"address"},{"internalType":"address","name":"_derivativeSpecification","type":"address"},{"internalType":"address","name":"_collateralToken","type":"address"},{"internalType":"address[]","name":"_oracles","type":"address[]"},{"internalType":"address[]","name":"_oracleIterators","type":"address[]"},{"internalType":"address","name":"_collateralSplit","type":"address"},{"internalType":"address","name":"_tokenBuilder","type":"address"},{"internalType":"address","name":"_feeLogger","type":"address"},{"internalType":"uint256","name":"_authorFeeLimit","type":"uint256"},{"internalType":"uint256","name":"_settlementDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"primaryToken","type":"address"},{"indexed":false,"internalType":"address","name":"complementToken","type":"address"}],"name":"LiveStateSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minted","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateral","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"conversion","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateral","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isPrimary","type":"bool"}],"name":"Redeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateral","type":"uint256"}],"name":"Refunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"int256[]","name":"underlyingStarts","type":"int256[]"},{"indexed":false,"internalType":"int256[]","name":"underlyingEnds","type":"int256[]"},{"indexed":false,"internalType":"uint256","name":"primaryConversion","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"complementConversion","type":"uint256"}],"name":"SettledStateSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enum Vault.State","name":"oldState","type":"uint8"},{"indexed":false,"internalType":"enum Vault.State","name":"newState","type":"uint8"}],"name":"StateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"FRACTION_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"authorFeeLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collateralSplit","outputs":[{"internalType":"contract ICollateralSplit","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collateralToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"complementConversion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"complementToken","outputs":[{"internalType":"contract IERC20MintedBurnable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"derivativeSpecification","outputs":[{"internalType":"contract IDerivativeSpecification","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeLogger","outputs":[{"internalType":"contract IFeeLogger","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liveTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"oracleIterators","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"oracles","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"primaryConversion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"primaryToken","outputs":[{"internalType":"contract IERC20MintedBurnable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"settleTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"settlementDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"state","outputs":[{"internalType":"enum Vault.State","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenBuilder","outputs":[{"internalType":"contract ITokenBuilder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"underlyingEnds","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"underlyingStarts","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256[]","name":"_underlyingStarts","type":"int256[]"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_underlyingEndRoundHints","type":"uint256[]"}],"name":"settle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_split","type":"uint256"}],"name":"range","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_collateralAmount","type":"uint256"}],"name":"mintTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_collateralAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"refund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"refundTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_primaryTokenAmount","type":"uint256"},{"internalType":"uint256","name":"_complementTokenAmount","type":"uint256"},{"internalType":"uint256[]","name":"_underlyingEndRoundHints","type":"uint256[]"}],"name":"redeemTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_primaryTokenAmount","type":"uint256"},{"internalType":"uint256","name":"_complementTokenAmount","type":"uint256"},{"internalType":"uint256[]","name":"_underlyingEndRoundHints","type":"uint256[]"}],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const COMFI_CHEF_ADDR = "0x8a5827Ad1f28d3f397B748CE89895e437b8ef90D";
const PROXY_REGISTRY_ADDR = "0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4";
const PROXY_ACTIONS_ADDR = "0xcA01acea706D1Bf58722bE72284e933a9Dd3d69A";

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const rewardTokenTicker = "COMFI";
    const COMFI_CHEF_CONTRACT = new ethers.Contract(COMFI_CHEF_ADDR, COMFI_CHEF_ABI, App.provider);
    const PROXY_REGISTRY_CONTRACT = new ethers.Contract(PROXY_REGISTRY_ADDR, PROXY_ABI, App.provider);
    const rewardsPerWeek = await COMFI_CHEF_CONTRACT.rewardPerBlock() / 1e18
        * 604800 / 13.2;

    const USERS_PROXY_ADDR = await PROXY_REGISTRY_CONTRACT.proxies(App.YOUR_ADDRESS);

    _print(`User DsProxy found at ${USERS_PROXY_ADDR}`);
    _print("");
    await loadComplifiContract(App, COMFI_CHEF_CONTRACT, COMFI_CHEF_ADDR, COMFI_CHEF_ABI, rewardTokenTicker,
        "rewardToken", null, rewardsPerWeek, "getPendingReward", USERS_PROXY_ADDR, PROXY_ACTIONS_ADDR);

    hideLoading();
}

async function loadComplifiContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    userProxyAddress, proxyActionsAddress) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolCount(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();

    _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    var tokens = {};

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 13.5

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
        try {
          return await getComplifiPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, userProxyAddress);
        }
        catch (ex) {
          console.log(`Error loading pool ${x}: ${ex}`);
          return null;
        }
    }))

    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));

    var prices = await lookUpTokenPrices(tokenAddresses);

    await Promise.all(poolInfos.filter(x => x?.poolToken.complifiPool).map(async (poolInfo) => {
        const pool = new ethers.Contract(poolInfo.address, COMPLIFI_POOL_ABI, App.provider)
        const vaultAddress = await pool.derivativeVault();
        const vault = new ethers.Contract(vaultAddress, COMPLIFI_VAULT_ABI, App.provider);
        const primaryAddress = await vault.primaryToken();
        const complementAddress = await vault.complementToken();

        const primaryLeverage = (await pool.getLeverage(primaryAddress)) / 10 ** 18;
        const primaryAmount = (await pool.getBalance(primaryAddress)) / 10 ** 6;

        const complementLeverage = (await pool.getLeverage(complementAddress)) / 10 ** 18;
        const complementAmount = (await pool.getBalance(complementAddress)) / 10 ** 6;

        const derivativeDenomination = 2;
        const poolTotalSupply = (await pool.totalSupply()) / 10 ** 18;

        const primaryLeveragedBalance = primaryLeverage * primaryAmount;
        const complementLeveragedBalance = complementLeverage * complementAmount;
        const sumOfLeveragedBalances =
            (primaryLeveragedBalance + complementLeveragedBalance) /
            derivativeDenomination;

        prices[primaryAddress] = {usd: trunc6(complementLeveragedBalance / sumOfLeveragedBalances)};

        prices[complementAddress] = {usd: trunc6(primaryLeveragedBalance / sumOfLeveragedBalances)};

        prices[poolInfo.address] =  {usd: trunc6((primaryAmount / poolTotalSupply) * prices[primaryAddress].usd +
            (complementAmount / poolTotalSupply) * prices[complementAddress].usd)};
    }));

    await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, chefAddress);
    }));

    const poolPrices = poolInfos.map(poolInfo => {
        if(!poolInfo?.poolToken) {
            return;
        }
        if (poolInfo.poolToken.token0 != null) return getUniPrices(tokens, prices, poolInfo.poolToken);
        return getErc20Prices(prices, poolInfo.poolToken, "eth");
    });

    _print("Finished reading smart contracts.\n");

    const totalAccruedReward = (await chefContract.callStatic["rewards"](userProxyAddress));
    const totalClaimedReward = (await chefContract.callStatic["claimedRewards"](userProxyAddress)) / 10 ** 18;
    const unlockedAccruedReward = (await chefContract.callStatic["calcUnlocked"](totalAccruedReward)) / 10 ** 18;

    let totalUnlocked = unlockedAccruedReward - totalClaimedReward;
    let totalLocked = totalAccruedReward / 10 ** 18 - unlockedAccruedReward;

    let aprs = []
    for (let i = 0; i < poolCount; i++) {
        if (poolPrices[i]) {
          const apr = await printComplifiPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
            totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
            poolInfos[i].pendingLockedRewardTokens, poolInfos[i].pendingUnlockedRewardTokens, 2, userProxyAddress)
          totalLocked += poolInfos[i].pendingLockedRewardTokens;
          totalUnlocked += poolInfos[i].pendingUnlockedRewardTokens;
          aprs.push(apr);
        }
    }
    let totalUserStaked=0, totalStaked=0, averageApr=0;
    for (const a of aprs) {
        if (a && !isNaN(a.totalStakedUsd)) {
          totalStaked += a.totalStakedUsd;
        }
        if (a && a.userStakedUsd > 0) {
          totalUserStaked += a.userStakedUsd;
          averageApr += a.userStakedUsd * a.yearlyAPR / 100;
        }
    }
    averageApr = averageApr / totalUserStaked;

    printPendingRewards(totalLocked, totalUnlocked, aprs[0].rewardPrice, App, userProxyAddress, proxyActionsAddress, chefAddress, rewardTokenTicker);
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

async function getComplifiPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction, userProxyAddress) {
  // // Info of each pool.
  // struct PoolInfo {
  //     IERC20 token; // Address of token contract.
  //     uint256 accRewardPerShare; // Accumulated reward token per share, times 1e12. See below.
  //     uint256 allocPoint; // How many allocation points assigned to this pool.
  //     uint256 lastRewardBlock; // Last block number that reward token distribution occurs.
  // }
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint === 0) {
    return {
      address: poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked: 0,
      userUnstaked: 0,
      pendingRewardTokens : 0,
      pendingUnlockedRewardTokens: 0,
      lastRewardBlock : poolInfo.lastRewardBlock
    };
  }

  let poolToken;
  try {
     const pool = new ethcall.Contract(poolInfo.token, COMPLIFI_POOL_ABI);
     await app.ethcallProvider.all([pool.qMin()]);
     window.localStorage.setItem(poolInfo.token, "complifi_pool");
     poolToken = await getErc20(app, pool, poolInfo.token, chefAddress);
     poolToken["complifiPool"] = true;
  } catch(e) {}
  poolToken = poolToken ?? (await getToken(app, poolInfo.token, chefAddress));
  const userInfo = await chefContract.userPoolInfo(poolIndex, userProxyAddress);
  const pendingRewards = await chefContract.callStatic[pendingRewardsFunction](poolIndex, userProxyAddress);
  const totalPendingRewardTokens = pendingRewards.total / 10 ** 18;
  const pendingUnlockedRewardTokens = pendingRewards.unlocked / 10 ** 18;
  const pendingLockedRewardTokens = totalPendingRewardTokens - pendingUnlockedRewardTokens;
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  const unstaked = poolToken.unstaked;

  return {
    address: poolInfo.token,
    allocPoints: poolInfo.allocPoint ?? 1,
    poolToken: poolToken,
    userStaked : staked,
    userUnstaked : unstaked,
    pendingLockedRewardTokens : pendingLockedRewardTokens,
    pendingUnlockedRewardTokens : pendingUnlockedRewardTokens,
    lastRewardBlock : poolInfo.lastRewardBlock
  };
}

async function printComplifiPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingLockedRewardTokens, pendingUnlockedRewardTokens, fixedDecimals, userProxyAddress) {
  fixedDecimals = fixedDecimals ?? 2;
  let poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userStaked;
  const userUnstaked = poolInfo.userUnstaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = poolPrices.staked_tvl;
  poolPrices.print_price("eth");
  const apr = printComplifiAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals, pendingLockedRewardTokens, pendingUnlockedRewardTokens);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);

  const STAKING_TOKEN = new ethers.Contract(poolInfo.address, ERC20_ABI, App.provider);
  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)

  const approveAndStake = async () => deposit(App, userProxyAddress, PROXY_ACTIONS_ADDR, chefAddr, poolInfo.poolToken.address, currentTokens);
  const unstake = async () => withdraw(App, userProxyAddress, PROXY_ACTIONS_ADDR, chefAddr, poolInfo.poolToken.address, userStaked);

  _print_link(`Stake ${userUnstaked.toFixed(fixedDecimals)} ${poolPrices.stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${poolPrices.stakeTokenTicker}`, unstake)

  _print("")
  return apr;
}

function printComplifiAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
                  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPR = usdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
  var userDailyRewards = userWeeklyRewards / 7;
  var userYearlyRewards = userWeeklyRewards * 52;
  if (userStaked > 0) {
    _print(`Estimated ${rewardTokenTicker} earnings:`
        + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrice)})`
        + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
        + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
  }
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
    yearlyAPR,
    userYearlyUsd : userYearlyRewards * rewardPrice,
    rewardPrice
  }
}

function printPendingRewards(totalLocked, totalUnlocked, rewardPrice, App, userProxyAddress, proxyActionsAddress, miningAddress, rewardTokenTicker){
  _print(`You have ${totalUnlocked.toFixed(2)} unlocked and ${totalLocked.toFixed(2)} locked rewards (${(totalUnlocked + totalLocked).toFixed(2)} total).`)

  const claimable = async () => await claim(App, userProxyAddress, proxyActionsAddress, miningAddress);
  _print_link(
      `Claim ${totalUnlocked.toFixed(2)} ${rewardTokenTicker} ($${formatMoney(totalUnlocked*rewardPrice)})`,
      claimable)
  _print("");
}

async function deposit(App, userProxyAddress, proxyActionsAddress, miningAddress, tokenAddress, tokenAmount) {
    const functionName = 'deposit';
    const functionParams = [
        {
            name: 'liquidityMiningAddress',
            type: 'address',
            value: miningAddress,
        },
        {
            name: 'tokenAddress',
            type: 'address',
            value: tokenAddress,
        },
        {
            name: 'tokenAmount',
            type: 'uint256',
            value: tokenAmount.toString(),
        },
    ];

    return executeProxyAction(
        App,
        userProxyAddress,
        proxyActionsAddress,
        functionName,
        functionParams,
        250000,
    );

}

async function withdraw(App, userProxyAddress, proxyActionsAddress, miningAddress, tokenAddress, tokenAmount) {
    const functionName = 'withdraw';
    const functionParams = [
        {
            name: 'liquidityMiningAddress',
            type: 'address',
            value: miningAddress,
        },
        {
            name: 'tokenAddress',
            type: 'address',
            value: tokenAddress,
        },
        {
            name: 'tokenAmount',
            type: 'uint256',
            value: tokenAmount.toString(),
        },
    ];

    return executeProxyAction(
        App,
        userProxyAddress,
        proxyActionsAddress,
        functionName,
        functionParams,
        200000,
    );
}

async function claim(App, userProxyAddress, proxyActionsAddress, miningAddress) {
    const functionName = 'claim';
    const functionParams = [
        {
            name: 'liquidityMiningAddress',
            type: 'address',
            value: miningAddress,
        },
    ];

    return executeProxyAction(
        App,
        userProxyAddress,
        proxyActionsAddress,
        functionName,
        functionParams,
        500000,
    );
}

async function executeProxyAction(App, userProxyAddress, proxyActionsAddress, functionName, functionParams, gasLimit){
    const signer = App.provider.getSigner();

    const PROXY_ABI = [{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_target","type":"address"},{"name":"_data","type":"bytes"}],"name":"execute","outputs":[{"name":"response","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_code","type":"bytes"},{"name":"_data","type":"bytes"}],"name":"execute","outputs":[{"name":"target","type":"address"},{"name":"response","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"cache","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_cacheAddr","type":"address"}],"name":"setCache","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_cacheAddr","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"}];
    const proxyContract = new ethers.Contract(userProxyAddress, PROXY_ABI, signer);

    const PROXY_ACTIONS_ABI = [{"inputs":[{"internalType":"address","name":"_liquidityMining","type":"address"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_liquidityMining","type":"address"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_liquidityMining","type":"address"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const targetContract = new ethers.Contract(proxyActionsAddress, PROXY_ACTIONS_ABI, signer);
    const callData = targetContract.interface.encodeFunctionData(functionName, functionParams.map((fp) => fp.value));

    showLoading();

    try {
        const gasEstimation = (await proxyContract.estimateGas['execute(address,bytes)'](proxyActionsAddress, callData)) * 1;
        if (gasEstimation) {
            gasLimit = Math.max(gasLimit || 0, gasEstimation);
        }
        console.log('Gas estimate: %s', gasEstimation);
    } catch (error) {
        console.log(error);
    }
    console.log('Gas limit: %s', gasLimit);

    proxyContract['execute(address,bytes)'](proxyActionsAddress, callData, {
        gasLimit: gasLimit || undefined,
    })
    .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
    })
    .catch(x => {
        hideLoading()
        console.log(x);
        _print('Something went wrong.')
    });
}

function truncN(value, n) {
    return Math.trunc(value * Math.pow(10, n)) / Math.pow(10, n);
}

function trunc6(value) {
    return truncN(value, 6);
}
