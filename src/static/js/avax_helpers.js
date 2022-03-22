const YIELDYAK_VAULT_UNDERLYING_ABI = [{"inputs":[{"internalType":"address","name":"_nyanToken","type":"address"},{"internalType":"address","name":"_stakingContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newTotalDeposits","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newTotalSupply","type":"uint256"}],"name":"Reinvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldValue","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"UpdateAdminFee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldValue","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"UpdateMinTokensToReinvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldValue","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"UpdateReinvestReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"ADMIN_FEE_BIPS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_TOKENS_TO_REINVEST","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REINVEST_REWARD_BIPS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"arbi","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"estimateReinvestReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getSharesPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getTokensPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnderlying","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nyanToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reapproveStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"recoverETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"arbiAddress","type":"address"}],"name":"setArbi","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingContract","outputs":[{"internalType":"contract NyanRewards","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"updateAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"updateAdminFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"updateMinTokensToReinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"updateReinvestReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const YIELDYAK_VAULT_UNDERLYING_ABI2 = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"string","name":"_name","internalType":"string"},{"type":"address","name":"_depositToken","internalType":"address"},{"type":"address","name":"_poolRewardToken","internalType":"address"},{"type":"address","name":"_rewardToken","internalType":"address"},{"type":"address","name":"_stakingContract","internalType":"address"},{"type":"address","name":"_swapPairWAVAXJoe","internalType":"address"},{"type":"address","name":"_swapPairToken0","internalType":"address"},{"type":"address","name":"_swapPairToken1","internalType":"address"},{"type":"address","name":"_extraTokenSwapPair","internalType":"address"},{"type":"uint256","name":"pid","internalType":"uint256"},{"type":"address","name":"_timelock","internalType":"address"},{"type":"uint256","name":"_minTokensToReinvest","internalType":"uint256"},{"type":"uint256","name":"_adminFeeBips","internalType":"uint256"},{"type":"uint256","name":"_devFeeBips","internalType":"uint256"},{"type":"uint256","name":"_reinvestRewardBips","internalType":"uint256"}]},{"type":"event","name":"AllowDepositor","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"DepositsEnabled","inputs":[{"type":"bool","name":"newValue","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Reinvest","inputs":[{"type":"uint256","name":"newTotalDeposits","internalType":"uint256","indexed":false},{"type":"uint256","name":"newTotalSupply","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RemoveDepositor","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateAdminFee","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateDevAddr","inputs":[{"type":"address","name":"oldValue","internalType":"address","indexed":false},{"type":"address","name":"newValue","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateDevFee","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateMaxTokensToDepositWithoutReinvest","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateMinTokensToReinvest","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateReinvestReward","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"ADMIN_FEE_BIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"DEPOSITS_ENABLED","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DEV_FEE_BIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MAX_TOKENS_TO_DEPOSIT_WITHOUT_REINVEST","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MIN_TOKENS_TO_REINVEST","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"PERMIT_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PID","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"REINVEST_REWARD_BIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"VERSION_HASH","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"allowDepositor","inputs":[{"type":"address","name":"depositor","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"allowedDepositors","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"checkReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositFor","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"depositToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositWithPermit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devAddr","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"estimateDeployedBalance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"estimateReinvestReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getDepositTokensForShares","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"getDomainSeparator","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getSharesForDepositTokens","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonces","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"numberOfAllowedDepositors","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"permit","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverAVAX","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverERC20","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reinvest","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeDepositor","inputs":[{"type":"address","name":"depositor","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"rescueDeployedFunds","inputs":[{"type":"uint256","name":"minReturnAmountAccepted","internalType":"uint256"},{"type":"bool","name":"disableDeposits","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeAllowance","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setAllowances","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setExtraRewardSwapPair","inputs":[{"type":"address","name":"swapPair","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IJoeChef"}],"name":"stakingContract","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalDeposits","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"src","internalType":"address"},{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateAdminFee","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateDepositsEnabled","inputs":[{"type":"bool","name":"newValue","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateDevAddr","inputs":[{"type":"address","name":"newValue","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateDevFee","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateMaxTokensToDepositWithoutReinvest","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateMinTokensToReinvest","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateReinvestReward","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]
const AVAX_REGISTRY_ABI = [{"name":"PoolAdded","inputs":[{"name":"pool","type":"address","indexed":true},{"name":"rate_method_id","type":"bytes","indexed":false}],"anonymous":false,"type":"event"},{"name":"PoolRemoved","inputs":[{"name":"pool","type":"address","indexed":true}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_address_provider","type":"address"},{"name":"_gauge_controller","type":"address"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"find_pool_for_coins","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"}],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"find_pool_for_coins","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"i","type":"uint256"}],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"get_n_coins","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[2]"}],"gas":2764},{"stateMutability":"view","type":"function","name":"get_coins","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"address[8]"}],"gas":22642},{"stateMutability":"view","type":"function","name":"get_underlying_coins","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"address[8]"}],"gas":22734},{"stateMutability":"view","type":"function","name":"get_decimals","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":10154},{"stateMutability":"view","type":"function","name":"get_underlying_decimals","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":10246},{"stateMutability":"view","type":"function","name":"get_rates","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":89988},{"stateMutability":"view","type":"function","name":"get_gauges","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"address[10]"},{"name":"","type":"int128[10]"}],"gas":52730},{"stateMutability":"view","type":"function","name":"get_balances","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":43603},{"stateMutability":"view","type":"function","name":"get_underlying_balances","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":377350},{"stateMutability":"view","type":"function","name":"get_virtual_price_from_lp_token","inputs":[{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":5287},{"stateMutability":"view","type":"function","name":"get_A","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3105},{"stateMutability":"view","type":"function","name":"get_parameters","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"A","type":"uint256"},{"name":"future_A","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"admin_fee","type":"uint256"},{"name":"future_fee","type":"uint256"},{"name":"future_admin_fee","type":"uint256"},{"name":"future_owner","type":"address"},{"name":"initial_A","type":"uint256"},{"name":"initial_A_time","type":"uint256"},{"name":"future_A_time","type":"uint256"}],"gas":28133},{"stateMutability":"view","type":"function","name":"get_fees","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[2]"}],"gas":5601},{"stateMutability":"view","type":"function","name":"get_admin_balances","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":87486},{"stateMutability":"view","type":"function","name":"get_coin_indices","inputs":[{"name":"_pool","type":"address"},{"name":"_from","type":"address"},{"name":"_to","type":"address"}],"outputs":[{"name":"","type":"int128"},{"name":"","type":"int128"},{"name":"","type":"bool"}],"gas":45755},{"stateMutability":"view","type":"function","name":"estimate_gas_used","inputs":[{"name":"_pool","type":"address"},{"name":"_from","type":"address"},{"name":"_to","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":57665},{"stateMutability":"view","type":"function","name":"is_meta","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"bool"}],"gas":3128},{"stateMutability":"view","type":"function","name":"get_pool_name","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"string"}],"gas":13379},{"stateMutability":"view","type":"function","name":"get_coin_swap_count","inputs":[{"name":"_coin","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3179},{"stateMutability":"view","type":"function","name":"get_coin_swap_complement","inputs":[{"name":"_coin","type":"address"},{"name":"_index","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":3254},{"stateMutability":"view","type":"function","name":"get_pool_asset_type","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3239},{"stateMutability":"nonpayable","type":"function","name":"add_pool","inputs":[{"name":"_pool","type":"address"},{"name":"_n_coins","type":"uint256"},{"name":"_lp_token","type":"address"},{"name":"_rate_info","type":"bytes32"},{"name":"_decimals","type":"uint256"},{"name":"_underlying_decimals","type":"uint256"},{"name":"_has_initial_A","type":"bool"},{"name":"_is_v1","type":"bool"},{"name":"_name","type":"string"}],"outputs":[],"gas":63063473},{"stateMutability":"nonpayable","type":"function","name":"add_pool_without_underlying","inputs":[{"name":"_pool","type":"address"},{"name":"_n_coins","type":"uint256"},{"name":"_lp_token","type":"address"},{"name":"_rate_info","type":"bytes32"},{"name":"_decimals","type":"uint256"},{"name":"_use_rates","type":"uint256"},{"name":"_has_initial_A","type":"bool"},{"name":"_is_v1","type":"bool"},{"name":"_name","type":"string"}],"outputs":[],"gas":32098992},{"stateMutability":"nonpayable","type":"function","name":"add_metapool","inputs":[{"name":"_pool","type":"address"},{"name":"_n_coins","type":"uint256"},{"name":"_lp_token","type":"address"},{"name":"_decimals","type":"uint256"},{"name":"_name","type":"string"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"add_metapool","inputs":[{"name":"_pool","type":"address"},{"name":"_n_coins","type":"uint256"},{"name":"_lp_token","type":"address"},{"name":"_decimals","type":"uint256"},{"name":"_name","type":"string"},{"name":"_base_pool","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"remove_pool","inputs":[{"name":"_pool","type":"address"}],"outputs":[],"gas":799397478975},{"stateMutability":"nonpayable","type":"function","name":"set_pool_gas_estimates","inputs":[{"name":"_addr","type":"address[5]"},{"name":"_amount","type":"uint256[2][5]"}],"outputs":[],"gas":393460},{"stateMutability":"nonpayable","type":"function","name":"set_coin_gas_estimates","inputs":[{"name":"_addr","type":"address[10]"},{"name":"_amount","type":"uint256[10]"}],"outputs":[],"gas":394687},{"stateMutability":"nonpayable","type":"function","name":"set_gas_estimate_contract","inputs":[{"name":"_pool","type":"address"},{"name":"_estimator","type":"address"}],"outputs":[],"gas":75989},{"stateMutability":"nonpayable","type":"function","name":"set_liquidity_gauges","inputs":[{"name":"_pool","type":"address"},{"name":"_liquidity_gauges","type":"address[10]"}],"outputs":[],"gas":447195},{"stateMutability":"nonpayable","type":"function","name":"set_pool_asset_type","inputs":[{"name":"_pool","type":"address"},{"name":"_asset_type","type":"uint256"}],"outputs":[],"gas":75955},{"stateMutability":"nonpayable","type":"function","name":"batch_set_pool_asset_type","inputs":[{"name":"_pools","type":"address[32]"},{"name":"_asset_types","type":"uint256[32]"}],"outputs":[],"gas":1174503},{"stateMutability":"view","type":"function","name":"address_provider","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3348},{"stateMutability":"view","type":"function","name":"gauge_controller","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3378},{"stateMutability":"view","type":"function","name":"pool_list","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":3453},{"stateMutability":"view","type":"function","name":"pool_count","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3438},{"stateMutability":"view","type":"function","name":"coin_count","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3468},{"stateMutability":"view","type":"function","name":"get_coin","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":3543},{"stateMutability":"view","type":"function","name":"get_pool_from_lp_token","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"address"}],"gas":3743},{"stateMutability":"view","type":"function","name":"get_lp_token","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"address"}],"gas":3773},{"stateMutability":"view","type":"function","name":"last_updated","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3588}]
const AVAX_VAULT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_governance","internalType":"address"},{"type":"address","name":"_timelock","internalType":"address"},{"type":"address","name":"_controller","internalType":"address"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"available","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"controller","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"earn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRatio","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"harvest","inputs":[{"type":"address","name":"reserve","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"max","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"min","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setController","inputs":[{"type":"address","name":"_controller","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMin","inputs":[{"type":"uint256","name":"_min","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTimelock","inputs":[{"type":"address","name":"_timelock","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"timelock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"token","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_shares","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
const AVAX_VAULT_WANT_ABI = [{"inputs":[{"internalType":"contract IStrategy","name":"_strategy","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_approvalDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"NewStratCandidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"UpgradeStrat","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approvalDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"inCaseTokensGetStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"name":"proposeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stratCandidate","outputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"proposedTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"contract IStrategy","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const avaxTokens = [
    { "id": "avalanche-2","symbol": "AVAX","contract": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" },
    { "id": "pangolin","symbol": "PNG", "contract": "0x60781C2586D68229fde47564546784ab3fACA982" },
    { "id": "weth","symbol": "WETH", "contract": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" },
    { "id": "weth","symbol": "WETH.e", "contract": "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab" },
    { "id": "dai","symbol": "DAI", "contract": "0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a" },
    { "id": "dai","symbol": "DAI.e", "contract": "0xd586e7f844cea2f87f50152665bcbc2c279d8d70" },
    { "id": "snowball-token","symbol": "SNOB", "contract": "0xc38f41a296a4493ff429f1238e030924a1542e50" },
    { "id": "sushi","symbol": "SUSHI", "contract": "0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc" },
    { "id": "benqi","symbol": "QI", "contract": "0x8729438eb15e2c8b576fcc6aecda6a148776c0f5" },
    { "id": "joe","symbol": "JOE", "contract": "0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd" },
    { "id": "tether", "symbol": "USDT.e", "contract": "0xc7198437980c041c805a1edcba50c1ce5db95118" },
    { "id": 'uniswap', "symbol": 'UNI', "contract": '0x8eBAf22B6F053dFFeaf46f4Dd9eFA95D89ba8580' },
    { "id": 'chainlink', "symbol": 'LINK', "contract": '0x5947BB275c521040051D82396192181b413227A3' },
    { "id": 'aave', "symbol": 'AAVE', "contract": '0x63a72806098Bd3D9520cC43356dD78afe5D386D9' },
    { "id": 'yearn-finance', "symbol": 'YFI', "contract": '0x9eAaC1B23d935365bD7b542Fe22cEEe2922f52dc' },
    { "id": 'usd-coin', "symbol": 'USDC', "contract": '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664' },
    { "id": 'avalaunch', "symbol": 'XAVA', "contract": '0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4' },
    { "id": 'yield-yak', "symbol": 'YAK', "contract": '0x59414b3089ce2AF0010e7523Dea7E2b35d776ec7' },
    { "id": 'sherpa', "symbol": 'SHERPA', "contract": '0xa5E59761eBD4436fa4d20E1A27cBa29FB2471Fc6' },
    { "id": 'bitcoin', "symbol": 'WBTC', "contract": '0x50b7545627a5162F82A992c33b87aDc75187B218' },
    { "id": 'sushi', "symbol": 'SUSHI.e', "contract": '0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76' },
    { "id": 'penguin-finance', "symbol": 'PEFI', "contract": '0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c' },
    { "id": 'xdollar', "symbol": 'XDO', "contract": '0x9ef758ac000a354479e538b8b2f01b917b8e89e7' },
    { "id": 'xdollar-stablecoin', "symbol": 'xUSD', "contract": '0x3509f19581afedeff07c53592bc0ca84e4855475' },
    { "id": 'wrapped-avax', "symbol": 'WAVAX', "contract": '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7' },
    { "id": "galaxy-oberon", "symbol": "OBERON", "contract": "0xc979E70611D997Aa109528c6A9aa73D82Eaa2881"},
    { "id": "frax", "symbol": "FRAX", "contract": "0xDC42728B0eA910349ed3c6e1c9Dc06b5FB591f98"},
    { "id": "zabu-token", "symbol": "ZABU", "contract": "0xDd453dBD253fA4E5e745047d93667Ce9DA93bbCF"},
    { "id": "tundra-token", "symbol": "TUNDRA", "contract": "0x21c5402C3B7d40C89Cc472C9dF5dD7E51BbAb1b1"},
    { "id": "verso", "symbol": "VSO", "contract": "0x846D50248BAf8b7ceAA9d9B53BFd12d7D7FBB25a"},
    { "id": "elk-finance", "symbol": "ELK", "contract": "0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C"},
    { "id": "gondola-finance", "symbol": "GDL", "contract": "0xD606199557c8Ab6F4Cc70bD03FaCc96ca576f142"},
    { "id": "lydia-finance", "symbol": "LYD", "contract": "0x4C9B4E1AC6F24CdE3660D5E4Ef1eBF77C710C084"},
    { "id": "canary", "symbol": "CNR", "contract": "0x8D88e48465F30Acfb8daC0b3E35c9D6D7d36abaf"},
    { "id": "magic-internet-money", "symbol": "MIM", "contract": "0x130966628846BFd36ff31a822705796e8cb8C18D"},
    { "id": "wonderland", "symbol": "TIME", "contract": "0xb54f16fB19478766A268F172C9480f8da1a7c9C3"},
    { "id": "eleven-finance", "symbol": "ELE", "contract": "0xAcD7B3D9c10e97d0efA418903C0c7669E702E4C0"},
    { "id": "allianceblock", "symbol": "WALBT", "contract": "0x9E037dE681CaFA6E661e6108eD9c2bd1AA567Ecd"},
    { "id": "avme", "symbol": "AVME", "contract": "0x1ECd47FF4d9598f89721A2866BFEb99505a413Ed"},
    { "id": "yetiswap", "symbol": "YTS", "contract": "0x488F73cddDA1DE3664775fFd91623637383D6404"},
    { "id": "cycle-token", "symbol": "CYCLE", "contract": "0x81440C939f2C1E34fc7048E518a637205A632a74"},
    { "id": "storm-token", "symbol": "STORM", "contract": "0x6AFD5A1ea4b793CC1526d6Dc7e99A608b356eF7b"},
    { "id": "baguette", "symbol": "BAG", "contract": "0xa1144a6A1304bd9cbb16c800F7a867508726566E"},
    { "id": "olivecash", "symbol": "OLIVE", "contract": "0x617724974218A18769020A70162165A539c07E8a"},
    { "id": "yay-games", "symbol": "YAY", "contract": "0x01C2086faCFD7aA38f69A6Bd8C91BEF3BB5adFCa"},
    { "id": "aave", "symbol": "AAVE.e", "contract": "0x63a72806098Bd3D9520cC43356dD78afe5D386D9"},
    { "id": "orcadao", "symbol": "ORCA", "contract": "0x8B1d98A91F853218ddbb066F20b8c63E782e2430"},
    { "id": "orca-avai", "symbol": "AVAI", "contract": "0x346a59146b9b4a77100d369a3d18e8007a9f46a6"},
    { "id": "synapse-2", "symbol": "SYN", "contract": "0x1f1E7c893855525b303f99bDF5c3c05Be09ca251"},
    { "id": "sonic-token", "symbol": "SONIC", "contract": "0x4Aca0ad6357b918e3d06BB1a0BCC403619177523"},
    { "id": "topshelf-finance", "symbol": "LIQR", "contract": "0x33333ee26a7d02e41c33828b42fb1e0889143477"},
    { "id": "gmx", "symbol": "GMX", "contract": "0x62edc0692BD897D2295872a9FFCac5425011c661"},
    { "id": "avaware-usd", "symbol": "AUSD", "contract": "0x783C08b5F26E3daf8C4681F3bf49844e425b6393"},
    { "id": "embr", "symbol": "EMBR", "contract": "0xD81D45E7635400dDD9c028839e9a9eF479006B28"},
    { "id": "avaware", "symbol": "AVE", "contract": "0x78ea17559B3D2CF85a7F9C2C704eda119Db5E6dE"},
    { "id": "usd-coin", "symbol": "USDC", "contract": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"},
    { "id": "beefy-finance", "symbol": "BIFI", "contract": "0xd6070ae98b8069de6b494332d1a1a81b6179d960"},
    { "id": "stargate-finance", "symbol": "STG", "contract": "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590"}
]

async function getAvaxPrices() {
    const idPrices = await lookUpPrices(avaxTokens.map(x => x.id));
    const prices = {}
    for (const bt of avaxTokens)
        if (idPrices[bt.id])
            prices[bt.contract] = idPrices[bt.id];
    return prices;
}

async function getAvaxUniPool(App, pool, poolAddress, stakingAddress) {
    let q0, q1;
    const reserves = await pool.getReserves();
    q0 = reserves._reserve0;
    q1 = reserves._reserve1;
    const decimals = await pool.decimals();
    const token0 = await pool.token0();
    const token1 = await pool.token1();
    return {
        symbol : await pool.symbol(),
        name : await pool.name(),
        address: poolAddress,
        token0,
        q0,
        token1,
        q1,
        totalSupply: await pool.totalSupply() / 10 ** decimals,
        stakingAddress: stakingAddress,
        staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
        decimals: decimals,
        unstaked: await pool.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
        contract: pool,
        tokens : [token0, token1],
        is1inch : false
    };
}

async function getAvaxYieldyakVault(App, vault, address, stakingAddress) {
  const decimals = await vault.decimals()
  const token_ = await vault.getUnderlying()
  const name = await vault.name()
  const symbol = await vault.symbol()
  const totalSupply = await vault.totalSupply()
  const staked = await vault.balanceOf(stakingAddress)
  const unstaked = await vault.balanceOf(App.YOUR_ADDRESS)
  const balance = await vault.totalDeposits()
  const token = await getAvaxToken(App, token_, address);
  return {
    address,
    name : name,
    symbol : symbol,
    totalSupply : totalSupply,
    decimals : decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance : balance,
    contract: vault,
    tokens : [address].concat(token.tokens),
  }
}

async function getAvaxYieldyakVault2(App, vault, address, stakingAddress) {
  const decimals = await vault.decimals()
  const token_ = await vault.depositToken()
  const name = await vault.name()
  const symbol = await vault.symbol()
  const totalSupply = await vault.totalSupply()
  const staked = await vault.balanceOf(stakingAddress)
  const unstaked = await vault.balanceOf(App.YOUR_ADDRESS)
  const balance = await vault.totalDeposits()
  const token = await getAvaxToken(App, token_, address);
  return {
    address,
    name : name,
    symbol : symbol,
    totalSupply : totalSupply,
    decimals : decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance : balance,
    contract: vault,
    tokens : [address].concat(token.tokens),
  }
}

async function getAvax20(App, token, address, stakingAddress) {
    if (address == "0x0000000000000000000000000000000000000000") {
      return {
        address,
        name : "Avax",
        symbol : "AVAX",
        totalSupply: 1e8,
        decimals: 18,
        staked: 0,
        unstaked: 0,
        contract: null,
        tokens:[address]
      }
    }
    const decimals = await token.decimals()
    return {
        address,
        name : await token.name(),
        symbol : await token.symbol(),
        totalSupply : await token.totalSupply(),
        decimals : decimals,
        staked:  await token.balanceOf(stakingAddress) / 10 ** decimals,
        unstaked: await token.balanceOf(App.YOUR_ADDRESS)  / 10 ** decimals,
        contract: token,
        tokens : [address]
    };
}

async function getAvaxVault(App, vault, address, stakingAddress) {
  const decimals = await vault.decimals();
  const token_ = await vault.token();
  const token = await getAvaxToken(App, token_, address);
  return {
    address,
    name : await vault.name(),
    symbol : await vault.symbol(),
    totalSupply : await vault.totalSupply(),
    decimals : decimals,
    staked: await vault.balanceOf(stakingAddress) / 10 ** decimals,
    unstaked: await vault.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
    token: token,
    balance : await vault.balance(),
    contract: vault,
    tokens : [address].concat(token.tokens),
  }
}

async function getAvaxBalancerV2Pool(App, pool, poolAddress, stakingAddress, tokens, smartToken) {
  const calls = [pool.decimals(), pool.symbol(), pool.name(), pool.totalSupply(),
    pool.balanceOf(stakingAddress), pool.balanceOf(App.YOUR_ADDRESS), pool.getNormalizedWeights()]
  const results = await App.ethcallProvider.all(calls);
  let [decimals, symbol, name, totalSupply, staked, unstaked, weights] = results

  let poolTokens = [];
  let j = 0;
  for (let i = 0; i < tokens.balances.length; i++) {
    poolTokens.push({
      address : tokens.tokens[i],
      weight: weights[i] / 1e18,
      balance : tokens.balances[i]
    })
  };
  if (smartToken) {
    [totalSupply, staked, unstaked] = await App.ethcallProvider.all([smartToken.totalSupply(),
      smartToken.balanceOf(stakingAddress), smartToken.balanceOf(App.YOUR_ADDRESS)]);
  }
  return {
      symbol,
      name,
      address: poolAddress,
      poolTokens, //address, weight and balance
      totalSupply: totalSupply / 10 ** decimals,
      stakingAddress,
      staked: staked / 10 ** decimals,
      decimals: decimals,
      unstaked: unstaked / 10 ** decimals,
      contract: pool,
      tokens : tokens.tokens
  };
}

async function getAvaxCurveToken(App, curve, address, stakingAddress, minterAddress) {
  const minter = new ethcall.Contract(minterAddress, MINTER_ABI)
  const [virtualPrice, coin0] = await App.ethcallProvider.all([minter.get_virtual_price(), minter.coins(0)]);
  const token = await getAvaxToken(App, coin0, address);
  const calls = [curve.decimals(), curve.balanceOf(stakingAddress), curve.balanceOf(App.YOUR_ADDRESS),
    curve.name(), curve.symbol(), curve.totalSupply()];
  const [decimals, staked, unstaked, name, symbol, totalSupply] = await App.ethcallProvider.all(calls);
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals : decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: curve,
      tokens : [address, coin0],
      token,
      virtualPrice : virtualPrice / 1e18
  };
}

async function getAvaxTriCryptoToken(App, curve, address, stakingAddress, minterAddress) {
  const minter = new ethcall.Contract(minterAddress, TRITOKEN_MINTER_ABI)
  const registryAddress = "0x445FE580eF8d70FF569aB36e80c647af338db351";
  const registry = new ethcall.Contract(registryAddress, AVAX_REGISTRY_ABI);
  let coins = [];
  const [coinAddresses, coinsCount, balances] =
    await App.ethcallProvider.all([registry.get_coins(minterAddress),
                                   registry.get_n_coins(minterAddress),
                                   registry.get_balances(minterAddress)]);
  for(let i = 0; i < coinsCount[1]; i++){
      const token = await getAvaxToken(App, coinAddresses[i], address);
      coins.push(
        {address : coinAddresses[i],
         token   : token,
         balance : balances[i] / 10 ** token.decimals}
      )
    }
  const [virtualPrice, xcp_profit] = await App.ethcallProvider.all([minter.get_virtual_price(), minter.xcp_profit()]);
  const calls = [curve.decimals(), curve.balanceOf(stakingAddress), curve.balanceOf(App.YOUR_ADDRESS),
    curve.name(), curve.symbol(), curve.totalSupply()];
  const [decimals, staked, unstaked, name, symbol, totalSupply] = await App.ethcallProvider.all(calls);
  const tokens = coins.map(c => c.address).concat([address]);
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals : decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: curve,
      tokens,
      coins,
      virtualPrice : virtualPrice / 1e18,
      xcp_profit : xcp_profit / 10 ** decimals
  };
}

async function getAvaxWantVault(App, vault, address, stakingAddress) {
  const calls = [vault.decimals(), vault.want(), vault.name(), vault.symbol(),
    vault.totalSupply(), vault.balanceOf(stakingAddress), vault.balanceOf(App.YOUR_ADDRESS), vault.balance()]
  const [decimals, token_, name, symbol, totalSupply, staked, unstaked, balance] =
    await App.ethcallProvider.all(calls);
  const token = await getAvaxToken(App, token_, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance,
    contract: vault,
    tokens : [address].concat(token.tokens),
  }
}

async function getAvaxBasicVault(App, vault, address, stakingAddress) {
  const calls = [vault.decimals(), vault.underlying(), vault.name(), vault.symbol(),
    vault.totalSupply(), vault.balanceOf(stakingAddress), vault.balanceOf(App.YOUR_ADDRESS),
    vault.underlyingBalanceWithInvestment()];
  const [ decimals, underlying, name, symbol, totalSupply, staked, unstaked, balance] =
    await App.ethcallProvider.all(calls);
  const token = await getAvaxToken(App, underlying, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance,
    contract: vault,
    tokens : token.tokens
  }
}

async function getAvaxStoredToken(App, tokenAddress, stakingAddress, type) {
  switch (type) {
    case "uniswap":
      const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
      return await getAvaxUniPool(App, pool, tokenAddress, stakingAddress);
    case "erc20":
      const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
      return await getAvax20(App, erc20, tokenAddress, stakingAddress);
    case "triToken":
      const tri = new ethcall.Contract(tokenAddress, TRITOKEN_ABI);
      const [triMinter] = await App.ethcallProvider.all([tri.minter()]);
      return await getAvaxTriCryptoToken(App, tri, tokenAddress, stakingAddress, triMinter);
    case "curve":
      const crv = new ethcall.Contract(tokenAddress, CURVE_ABI);
      const [minter] = await App.ethcallProvider.all([crv.minter()]);
      return await getAvaxCurveToken(App, crv, tokenAddress, stakingAddress, minter);
    case "avaxYieldyakVault":
      const yieldyakVault = new ethers.Contract(tokenAddress, YIELDYAK_VAULT_UNDERLYING_ABI, App.provider);
      return await getAvaxYieldyakVault(App, yieldyakVault, tokenAddress, stakingAddress);
    case "avaxYieldyakVault2":
      const yieldyakVault2 = new ethers.Contract(tokenAddress, YIELDYAK_VAULT_UNDERLYING_ABI2, App.provider);
      return await getAvaxYieldyakVault2(App, yieldyakVault2, tokenAddress, stakingAddress);
    case "avaxWantVault":
      const wantVault = new ethcall.Contract(tokenAddress, AVAX_VAULT_WANT_ABI);
      return await getAvaxWantVault(App, wantVault, tokenAddress, stakingAddress);
    case "basicAvaxVault":
      const basicAvaxVault = new ethcall.Contract(tokenAddress, HARVEST_VAULT_ABI);
      return await getAvaxBasicVault(App, basicAvaxVault, tokenAddress, stakingAddress);
    case "vault":
      const vault = new ethers.Contract(tokenAddress, AVAX_VAULT_ABI, App.provider);
      return await getAvaxVault(App, vault, tokenAddress, stakingAddress);
    case "avaxBalancer":
      const bal = new ethcall.Contract(tokenAddress, BALANCER_V2_POOL_ABI);
      const [vaultAddress, poolId] = await App.ethcallProvider.all([bal.getVault(), bal.getPoolId()]);
      const vaultBal = new ethcall.Contract(vaultAddress, BALANCER_VAULT_ABI);
      const [tokens] = await App.ethcallProvider.all([vaultBal.getPoolTokens(poolId)]);
      return await getAvaxBalancerV2Pool(App, bal, tokenAddress, stakingAddress, tokens);
  }
}

async function getAvaxToken(App, tokenAddress, stakingAddress) {
    if (tokenAddress == "0x0000000000000000000000000000000000000000") {
      return getAvax20(App, null, tokenAddress, "")
    }
    const type = window.localStorage.getItem(tokenAddress);
    if (type) return getAvaxStoredToken(App, tokenAddress, stakingAddress, type);
    try {
      const YIELDYAK_VAULT2 = new ethers.Contract(tokenAddress, YIELDYAK_VAULT_UNDERLYING_ABI2, App.provider);
      const _token = await YIELDYAK_VAULT2.depositToken();
      const yieldyakVault2 = await getAvaxYieldyakVault2(App, YIELDYAK_VAULT2, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "avaxYieldyakVault2");
      return yieldyakVault2;
    }
    catch(err) {
    }
    try {
      const tri = new ethcall.Contract(tokenAddress, CURVE_ABI);
      const [triMinter] = await App.ethcallProvider.all([tri.minter()]);
      const minterContract = new ethcall.Contract(triMinter, TRITOKEN_MINTER_ABI);
      const [xcp_profit] = await App.ethcallProvider.all([minterContract.xcp_profit()]);
      const res = await getAvaxTriCryptoToken(App, tri, tokenAddress, stakingAddress, triMinter);
      window.localStorage.setItem(tokenAddress, "triToken");
      return res;
    }
    catch(err) {
    }
    try {
      const crv = new ethcall.Contract(tokenAddress, CURVE_ABI);
      const [minter] = await App.ethcallProvider.all([crv.minter()]);
      const res = await getAvaxCurveToken(App, crv, tokenAddress, stakingAddress, minter);
      window.localStorage.setItem(tokenAddress, "curve");
      return res;
    }
    catch(err) {
    }
    try {
      const WANT_VAULT = new ethcall.Contract(tokenAddress, AVAX_VAULT_WANT_ABI);
      const _want = await App.ethcallProvider.all([WANT_VAULT.want()]);
      const wantVault = await getAvaxWantVault(App, WANT_VAULT, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "avaxWantVault");
      return wantVault;
    }
    catch(err) {
    }
    try {
      const basicVault = new ethcall.Contract(tokenAddress, HARVEST_VAULT_ABI);
      const _token = await App.ethcallProvider.all([basicVault.underlying()]);
      const res = await getAvaxBasicVault(App, basicVault, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "basicAvaxVault");
      return res;
    }
    catch(err) {
    }
    try {
      const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
      const _token0 = await pool.token0();
      const uniPool = await getAvaxUniPool(App, pool, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "uniswap");
      return uniPool;
    }
    catch(err) {
    }
    try {
      const VAULT = new ethers.Contract(tokenAddress, AVAX_VAULT_ABI, App.provider);
      const _token = await VAULT.token();
      const vault = await getAvaxVault(App, VAULT, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "vault");
      return vault;
    }
    catch(err) {
    }
    try {
      const YIELDYAK_VAULT = new ethers.Contract(tokenAddress, YIELDYAK_VAULT_UNDERLYING_ABI, App.provider);
      const _token = await YIELDYAK_VAULT.getUnderlying();
      const yieldyakVault = await getAvaxYieldyakVault(App, YIELDYAK_VAULT, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "avaxYieldyakVault");
      return yieldyakVault;
    }
    catch(err) {
    }
    try {
      const bal = new ethcall.Contract(tokenAddress, BALANCER_V2_POOL_ABI);
      const [vaultAddress, poolId] = await App.ethcallProvider.all([bal.getVault(), bal.getPoolId()]);
      const vault = new ethcall.Contract(vaultAddress, BALANCER_VAULT_ABI);
      const [tokens] = await App.ethcallProvider.all([vault.getPoolTokens(poolId)]);
      const balPool = await getAvaxBalancerV2Pool(App, bal, tokenAddress, stakingAddress, tokens);
      window.localStorage.setItem(tokenAddress, "avaxBalancer");
      return balPool;
    }
    catch(err) {
    }
    try {
      const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
      const _name = await erc20.name();
      const erc20tok = await getAvax20(App, erc20, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "erc20");
      return erc20tok;
    }
    catch(err) {
      console.log(err);
      console.log(`Couldn't match ${tokenAddress} to any known token type.`);
    }
  }

async function loadAvaxSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    rewardTokenFunction, stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
      const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

      const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

      var stakeToken = await getAvaxToken(App, stakeTokenAddress, stakingAddress);

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

async function loadAvaxSynthetixPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
    const info = await loadAvaxSynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
    if (!info) return null;
    return await printSynthetixPool(App, info, "avax");
}

async function loadAvaxBasisFork(data) {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};
    var totalStaked = 0;

    let p1 = await loadAvaxSynthetixPool(App, tokens, prices, data.PoolABI,
        data.SharePool.address, data.SharePool.rewardToken, data.SharePool.stakeToken);
    totalStaked += p1.staked_tvl;

    if (data.SharePool2) {
      let p3 = await loadAvaxSynthetixPool(App, tokens, prices, data.PoolABI,
          data.SharePool2.address, data.SharePool2.rewardToken, data.SharePool2.stakeToken);
      totalStaked += p3.staked_tvl;
    }

    let p2 = await loadAvaxSynthetixPool(App, tokens, prices, data.PoolABI,
        data.CashPool.address, data.CashPool.rewardToken, data.CashPool.stakeToken);
    totalStaked += p2.staked_tvl;

    if (data.SeedBanks) {
      let p = await loadMultipleAvaxSynthetixPools(App, tokens, prices, data.SeedBanks)
      totalStaked += p.staked_tvl;
      if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
      }
    }

    if (!data.SeedBanks)
    {
      if (data.Boardrooms) {
        for (const boardroom of data.Boardrooms) {
          let br = await loadBoardroom(App, prices, boardroom.address, data.Oracle, data.UniswapLP, data.Cash,
              data.ShareTicker, data.CashTicker, data.ExpansionsPerDay, data.MaximumExpansion,
              data.Decimals, boardroom.ratio, data.TargetMantissa);
          totalStaked += br.staked_tvl;
        }
      }
      else {
        let br = await loadBoardroom(App, prices, data.Boardroom, data.Oracle, data.UniswapLP, data.Cash,
            data.ShareTicker, data.CashTicker, data.ExpansionsPerDay, data.MaximumExpansion,
            data.Decimals, 1, data.TargetMantissa);
        totalStaked += br.staked_tvl;
      }
    }

    _print_bold(`Total staked: $${formatMoney(totalStaked)}`)

    hideLoading();
}

async function getAvaxPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return {
      address: poolInfo.lpToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  const poolToken = await getAvaxToken(app, poolInfo.lpToken ?? poolInfo.token, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolInfo.lpToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}

async function loadAvaxChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices, ignoredPools) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getAvaxToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    ignoredPools?.includes(x) ? null :
    await getAvaxPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getAvaxToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "avax") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "avax") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, "avax", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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

async function loadMultipleAvaxSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadAvaxSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printSynthetixPool(App, i, "avax");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalApr };
}

async function loadMultipleAvaxSynthetixPoolsSequential(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  for (const p of pools) {
    let res = await loadAvaxSynthetixPool(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction);
    if (!res) continue;
    totalStaked += res.staked_tvl || 0;
    totalUserStaked += res.userStaked || 0;
    if (res.userStaked > 0) {
      individualAPRs.push(res.userStaked * res.apr / 100);
    }
  }
  let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalApr };
}
