const FANTOM_VAULT_TOKEN_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_strategy","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_approvalDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"NewStratCandidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"UpgradeStrat","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approvalDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"name":"proposeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stratCandidate","outputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"proposedTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const FANTOM_VAULT_WANT_ABI = [{"inputs":[{"internalType":"contract IStrategy","name":"_strategy","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_approvalDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"NewStratCandidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"UpgradeStrat","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approvalDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"inCaseTokensGetStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"name":"proposeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stratCandidate","outputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"proposedTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"contract IStrategy","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const SPOON_VAULT_ABI = [{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address[]","name":"_path0","type":"address[]"},{"internalType":"address[]","name":"_path1","type":"address[]"},{"internalType":"uint256","name":"_spookyChefPid","type":"uint256"},{"internalType":"address","name":"_feeReceiver","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_dev","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyOperator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyStop","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exitFeeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"freePeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDepositTimes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"path0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"path1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setDevRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_op","type":"address"}],"name":"setEmergencyOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setExitFeeRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setFeeRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"setFeeReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_period","type":"uint256"}],"name":"setFreePeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_path0","type":"address[]"},{"internalType":"address[]","name":"_path1","type":"address[]"}],"name":"setPath","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"shareBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spookyFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spookyMasterChef","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spookyMasterChefPid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spookyRouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spookyToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"start","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"tokenBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShareBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wantToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shareAmount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const BALANCER_V2_POOL_ABI = [{"inputs":[{"components":[{"internalType":"contract IVault","name":"vault","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"contract IERC20","name":"token0","type":"address"},{"internalType":"contract IERC20","name":"token1","type":"address"},{"internalType":"uint256","name":"normalizedWeight0","type":"uint256"},{"internalType":"uint256","name":"normalizedWeight1","type":"uint256"},{"internalType":"uint256","name":"swapFeePercentage","type":"uint256"},{"internalType":"uint256","name":"pauseWindowDuration","type":"uint256"},{"internalType":"uint256","name":"bufferPeriodDuration","type":"uint256"},{"internalType":"bool","name":"oracleEnabled","type":"bool"},{"internalType":"address","name":"owner","type":"address"}],"internalType":"struct WeightedPool2Tokens.NewPoolParams","name":"params","type":"tuple"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"OracleEnabledChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"paused","type":"bool"}],"name":"PausedStateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"swapFeePercentage","type":"uint256"}],"name":"SwapFeePercentageChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"decreaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"selector","type":"bytes4"}],"name":"getActionId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAuthorizer","outputs":[{"internalType":"contract IAuthorizer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInvariant","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLargestSafeQueryWindow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getLastInvariant","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum IPriceOracle.Variable","name":"variable","type":"uint8"}],"name":"getLatest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMiscData","outputs":[{"internalType":"int256","name":"logInvariant","type":"int256"},{"internalType":"int256","name":"logTotalSupply","type":"int256"},{"internalType":"uint256","name":"oracleSampleCreationTimestamp","type":"uint256"},{"internalType":"uint256","name":"oracleIndex","type":"uint256"},{"internalType":"bool","name":"oracleEnabled","type":"bool"},{"internalType":"uint256","name":"swapFeePercentage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNormalizedWeights","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"enum IPriceOracle.Variable","name":"variable","type":"uint8"},{"internalType":"uint256","name":"ago","type":"uint256"}],"internalType":"struct IPriceOracle.OracleAccumulatorQuery[]","name":"queries","type":"tuple[]"}],"name":"getPastAccumulators","outputs":[{"internalType":"int256[]","name":"results","type":"int256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPausedState","outputs":[{"internalType":"bool","name":"paused","type":"bool"},{"internalType":"uint256","name":"pauseWindowEndTime","type":"uint256"},{"internalType":"uint256","name":"bufferPeriodEndTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPoolId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getSample","outputs":[{"internalType":"int256","name":"logPairPrice","type":"int256"},{"internalType":"int256","name":"accLogPairPrice","type":"int256"},{"internalType":"int256","name":"logBptPrice","type":"int256"},{"internalType":"int256","name":"accLogBptPrice","type":"int256"},{"internalType":"int256","name":"logInvariant","type":"int256"},{"internalType":"int256","name":"accLogInvariant","type":"int256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSwapFeePercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"enum IPriceOracle.Variable","name":"variable","type":"uint8"},{"internalType":"uint256","name":"secs","type":"uint256"},{"internalType":"uint256","name":"ago","type":"uint256"}],"internalType":"struct IPriceOracle.OracleAverageQuery[]","name":"queries","type":"tuple[]"}],"name":"getTimeWeightedAverage","outputs":[{"internalType":"uint256[]","name":"results","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalSamples","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getVault","outputs":[{"internalType":"contract IVault","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"increaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256[]","name":"balances","type":"uint256[]"},{"internalType":"uint256","name":"lastChangeBlock","type":"uint256"},{"internalType":"uint256","name":"protocolSwapFeePercentage","type":"uint256"},{"internalType":"bytes","name":"userData","type":"bytes"}],"name":"onExitPool","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256[]","name":"balances","type":"uint256[]"},{"internalType":"uint256","name":"lastChangeBlock","type":"uint256"},{"internalType":"uint256","name":"protocolSwapFeePercentage","type":"uint256"},{"internalType":"bytes","name":"userData","type":"bytes"}],"name":"onJoinPool","outputs":[{"internalType":"uint256[]","name":"amountsIn","type":"uint256[]"},{"internalType":"uint256[]","name":"dueProtocolFeeAmounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"enum IVault.SwapKind","name":"kind","type":"uint8"},{"internalType":"contract IERC20","name":"tokenIn","type":"address"},{"internalType":"contract IERC20","name":"tokenOut","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"uint256","name":"lastChangeBlock","type":"uint256"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"userData","type":"bytes"}],"internalType":"struct IPoolSwapStructs.SwapRequest","name":"request","type":"tuple"},{"internalType":"uint256","name":"balanceTokenIn","type":"uint256"},{"internalType":"uint256","name":"balanceTokenOut","type":"uint256"}],"name":"onSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256[]","name":"balances","type":"uint256[]"},{"internalType":"uint256","name":"lastChangeBlock","type":"uint256"},{"internalType":"uint256","name":"protocolSwapFeePercentage","type":"uint256"},{"internalType":"bytes","name":"userData","type":"bytes"}],"name":"queryExit","outputs":[{"internalType":"uint256","name":"bptIn","type":"uint256"},{"internalType":"uint256[]","name":"amountsOut","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256[]","name":"balances","type":"uint256[]"},{"internalType":"uint256","name":"lastChangeBlock","type":"uint256"},{"internalType":"uint256","name":"protocolSwapFeePercentage","type":"uint256"},{"internalType":"bytes","name":"userData","type":"bytes"}],"name":"queryJoin","outputs":[{"internalType":"uint256","name":"bptOut","type":"uint256"},{"internalType":"uint256[]","name":"amountsIn","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"swapFeePercentage","type":"uint256"}],"name":"setSwapFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
const BALANCER_VAULT_ABI = [{"inputs":[{"internalType":"contract IAuthorizer","name":"authorizer","type":"address"},{"internalType":"contract IWETH","name":"weth","type":"address"},{"internalType":"uint256","name":"pauseWindowDuration","type":"uint256"},{"internalType":"uint256","name":"bufferPeriodDuration","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IAuthorizer","name":"newAuthorizer","type":"address"}],"name":"AuthorizerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ExternalBalanceTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IFlashLoanRecipient","name":"recipient","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"feeAmount","type":"uint256"}],"name":"FlashLoan","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"int256","name":"delta","type":"int256"}],"name":"InternalBalanceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"paused","type":"bool"}],"name":"PausedStateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"poolId","type":"bytes32"},{"indexed":true,"internalType":"address","name":"liquidityProvider","type":"address"},{"indexed":false,"internalType":"contract IERC20[]","name":"tokens","type":"address[]"},{"indexed":false,"internalType":"int256[]","name":"deltas","type":"int256[]"},{"indexed":false,"internalType":"uint256[]","name":"protocolFeeAmounts","type":"uint256[]"}],"name":"PoolBalanceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"poolId","type":"bytes32"},{"indexed":true,"internalType":"address","name":"assetManager","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"int256","name":"cashDelta","type":"int256"},{"indexed":false,"internalType":"int256","name":"managedDelta","type":"int256"}],"name":"PoolBalanceManaged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"poolId","type":"bytes32"},{"indexed":true,"internalType":"address","name":"poolAddress","type":"address"},{"indexed":false,"internalType":"enum IVault.PoolSpecialization","name":"specialization","type":"uint8"}],"name":"PoolRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"relayer","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"RelayerApprovalChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"poolId","type":"bytes32"},{"indexed":true,"internalType":"contract IERC20","name":"tokenIn","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"tokenOut","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"poolId","type":"bytes32"},{"indexed":false,"internalType":"contract IERC20[]","name":"tokens","type":"address[]"}],"name":"TokensDeregistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"poolId","type":"bytes32"},{"indexed":false,"internalType":"contract IERC20[]","name":"tokens","type":"address[]"},{"indexed":false,"internalType":"address[]","name":"assetManagers","type":"address[]"}],"name":"TokensRegistered","type":"event"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"contract IWETH","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum IVault.SwapKind","name":"kind","type":"uint8"},{"components":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"uint256","name":"assetInIndex","type":"uint256"},{"internalType":"uint256","name":"assetOutIndex","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"userData","type":"bytes"}],"internalType":"struct IVault.BatchSwapStep[]","name":"swaps","type":"tuple[]"},{"internalType":"contract IAsset[]","name":"assets","type":"address[]"},{"components":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"bool","name":"fromInternalBalance","type":"bool"},{"internalType":"address payable","name":"recipient","type":"address"},{"internalType":"bool","name":"toInternalBalance","type":"bool"}],"internalType":"struct IVault.FundManagement","name":"funds","type":"tuple"},{"internalType":"int256[]","name":"limits","type":"int256[]"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"batchSwap","outputs":[{"internalType":"int256[]","name":"assetDeltas","type":"int256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"contract IERC20[]","name":"tokens","type":"address[]"}],"name":"deregisterTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"address payable","name":"recipient","type":"address"},{"components":[{"internalType":"contract IAsset[]","name":"assets","type":"address[]"},{"internalType":"uint256[]","name":"minAmountsOut","type":"uint256[]"},{"internalType":"bytes","name":"userData","type":"bytes"},{"internalType":"bool","name":"toInternalBalance","type":"bool"}],"internalType":"struct IVault.ExitPoolRequest","name":"request","type":"tuple"}],"name":"exitPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IFlashLoanRecipient","name":"recipient","type":"address"},{"internalType":"contract IERC20[]","name":"tokens","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"userData","type":"bytes"}],"name":"flashLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"selector","type":"bytes4"}],"name":"getActionId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAuthorizer","outputs":[{"internalType":"contract IAuthorizer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDomainSeparator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"contract IERC20[]","name":"tokens","type":"address[]"}],"name":"getInternalBalance","outputs":[{"internalType":"uint256[]","name":"balances","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNextNonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPausedState","outputs":[{"internalType":"bool","name":"paused","type":"bool"},{"internalType":"uint256","name":"pauseWindowEndTime","type":"uint256"},{"internalType":"uint256","name":"bufferPeriodEndTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"poolId","type":"bytes32"}],"name":"getPool","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"enum IVault.PoolSpecialization","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"contract IERC20","name":"token","type":"address"}],"name":"getPoolTokenInfo","outputs":[{"internalType":"uint256","name":"cash","type":"uint256"},{"internalType":"uint256","name":"managed","type":"uint256"},{"internalType":"uint256","name":"lastChangeBlock","type":"uint256"},{"internalType":"address","name":"assetManager","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"poolId","type":"bytes32"}],"name":"getPoolTokens","outputs":[{"internalType":"contract IERC20[]","name":"tokens","type":"address[]"},{"internalType":"uint256[]","name":"balances","type":"uint256[]"},{"internalType":"uint256","name":"lastChangeBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getProtocolFeesCollector","outputs":[{"internalType":"contract ProtocolFeesCollector","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"relayer","type":"address"}],"name":"hasApprovedRelayer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"components":[{"internalType":"contract IAsset[]","name":"assets","type":"address[]"},{"internalType":"uint256[]","name":"maxAmountsIn","type":"uint256[]"},{"internalType":"bytes","name":"userData","type":"bytes"},{"internalType":"bool","name":"fromInternalBalance","type":"bool"}],"internalType":"struct IVault.JoinPoolRequest","name":"request","type":"tuple"}],"name":"joinPool","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"enum IVault.PoolBalanceOpKind","name":"kind","type":"uint8"},{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct IVault.PoolBalanceOp[]","name":"ops","type":"tuple[]"}],"name":"managePoolBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"enum IVault.UserBalanceOpKind","name":"kind","type":"uint8"},{"internalType":"contract IAsset","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sender","type":"address"},{"internalType":"address payable","name":"recipient","type":"address"}],"internalType":"struct IVault.UserBalanceOp[]","name":"ops","type":"tuple[]"}],"name":"manageUserBalance","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"enum IVault.SwapKind","name":"kind","type":"uint8"},{"components":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"uint256","name":"assetInIndex","type":"uint256"},{"internalType":"uint256","name":"assetOutIndex","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"userData","type":"bytes"}],"internalType":"struct IVault.BatchSwapStep[]","name":"swaps","type":"tuple[]"},{"internalType":"contract IAsset[]","name":"assets","type":"address[]"},{"components":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"bool","name":"fromInternalBalance","type":"bool"},{"internalType":"address payable","name":"recipient","type":"address"},{"internalType":"bool","name":"toInternalBalance","type":"bool"}],"internalType":"struct IVault.FundManagement","name":"funds","type":"tuple"}],"name":"queryBatchSwap","outputs":[{"internalType":"int256[]","name":"","type":"int256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum IVault.PoolSpecialization","name":"specialization","type":"uint8"}],"name":"registerPool","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"contract IERC20[]","name":"tokens","type":"address[]"},{"internalType":"address[]","name":"assetManagers","type":"address[]"}],"name":"registerTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IAuthorizer","name":"newAuthorizer","type":"address"}],"name":"setAuthorizer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"relayer","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setRelayerApproval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"poolId","type":"bytes32"},{"internalType":"enum IVault.SwapKind","name":"kind","type":"uint8"},{"internalType":"contract IAsset","name":"assetIn","type":"address"},{"internalType":"contract IAsset","name":"assetOut","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"userData","type":"bytes"}],"internalType":"struct IVault.SingleSwap","name":"singleSwap","type":"tuple"},{"components":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"bool","name":"fromInternalBalance","type":"bool"},{"internalType":"address payable","name":"recipient","type":"address"},{"internalType":"bool","name":"toInternalBalance","type":"bool"}],"internalType":"struct IVault.FundManagement","name":"funds","type":"tuple"},{"internalType":"uint256","name":"limit","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swap","outputs":[{"internalType":"uint256","name":"amountCalculated","type":"uint256"}],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const FantomTokens = [
  { "id": "tether", "symbol": "USDT", "contract": "0x049d68029688eAbF473097a2fC38ef61633A3C7A"},
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75"},
  { "id": "fantom", "symbol": "FTM", "contract": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"},
  { "id": "ethereum", "symbol": "ETH", "contract": "0x74b23882a30290451A17c44f4F05243b6b58C76d"},
  { "id": "yearn-finance", "symbol": "YFI", "contract": "0x29b0Da86e484E1C0029B56e817912d778aC0EC69"},
  { "id": "chainlink", "symbol": "LINK", "contract": "0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8"},
  { "id": "cream", "symbol": "CREAM", "contract": "0x657A1861c15A3deD9AF0B6799a195a249ebdCbc6"},
  { "id": "dai", "symbol": "DAI", "contract": "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E"},
  { "id": "synthetix-network-token", "symbol": "SNX", "contract": "0x56ee926bD8c72B2d5fa1aF4d9E4Cbb515a1E3Adc"},
  { "id": "sushi", "symbol": "SUSHI", "contract": "0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC"},
  { "id": "ice-token", "symbol": "ICE", "contract": "0xf16e81dce15b08f326220742020379b855b87df9"},
  { "id": "spookyswap", "symbol": "BOO", "contract": "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE"},
  { "id": "binancecoin", "symbol": "BNB", "contract": "0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454"},
  { "id": "tomb-shares", "symbol": "TSHARE", "contract": "0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37"},
  { "id": "tomb", "symbol": "TOMB", "contract": "0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7"},
  { "id": "frax-share", "symbol": "FXS", "contract": "0x82F8Cb20c14F134fe6Ebf7aC3B903B2117aAfa62"},
  { "id": "frax", "symbol": "FRAX", "contract": "0xaf319E5789945197e365E7f7fbFc56B130523B33"},
  { "id": "spiritswap", "symbol": "SPIRIT", "contract": "0x5cc61a78f164885776aa610fb0fe1257df78e59b"},
  { "id": "grimcoin", "symbol": "GRIM", "contract": "0x7eC94C4327dC757601B4273cD67014d7760Be97E"},
  { "id": "galaxy-triton", "symbol": "TRITON", "contract": "0x9cf4009e62429Db3F57Aa9e7e8E898427cF6865f"},
  { "id": "galaxy-oberon", "symbol": "OBERON", "contract": "0xc979E70611D997Aa109528c6A9aa73D82Eaa2881"},
  { "id": "pumpkins", "symbol": "KINS", "contract": "0x6eced8e16eda61e65292f019b165542a5906ecd6"},
  { "id": "wraithswap", "symbol": "WRA", "contract": "0x4CF098d3775Bd78a4508a13E126798Da5911b6cd"},    
  { "id": "geist-finance", "symbol": "GEIST", "contract": "0xd8321aa83fb0a4ecd6348d4577431310a6e0814d"},
  { "id": "bitcoin", "symbol": "BTC", "contract": "0x321162Cd933E2Be498Cd2267a90534A804051b11"},
  { "id": "curve-dao-token", "symbol": "CRV", "contract": "0x1e4f97b9f9f913c46f1632781732927b9019c68b"}
];

async function getFantomPrices() {
    const idPrices = await lookUpPrices(FantomTokens.map(x => x.id));
    const prices = {}
    for (const bt of FantomTokens)
        if (idPrices[bt.id])
            prices[bt.contract] = idPrices[bt.id];
    return prices;
}

async function getFantomBalancerV2Pool(App, pool, poolAddress, stakingAddress, tokens, smartToken) {
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

async function getFantomUniPool(App, pool, poolAddress, stakingAddress) {
  const calls = [
    pool.decimals(), pool.token0(), pool.token1(), pool.symbol(), pool.name(),
    pool.totalSupply(), pool.balanceOf(stakingAddress), pool.balanceOf(App.YOUR_ADDRESS)
  ];
  const [decimals, token0, token1, symbol, name, totalSupply, staked, unstaked]
    = await App.ethcallProvider.all(calls);
  let q0, q1, is1inch;
  try {
    const [reserves] = await App.ethcallProvider.all([pool.getReserves()]);
    q0 = reserves._reserve0;
    q1 = reserves._reserve1;
    is1inch = false;
  }
  catch { //for 1inch
    if (token0 == "0x0000000000000000000000000000000000000000") {
      q0 = await App.provider.getBalance(poolAddress);
    }
    else {
      const c0 = new ethers.Contract(token0, ERC20_ABI, App.provider);
      q0 = await c0.balanceOf(poolAddress);
    }
    if (token1 == "0x0000000000000000000000000000000000000000") {
      q1 = await App.provider.getBalance(poolAddress);
    }
    else {
      const c1 = new ethers.Contract(token1, ERC20_ABI, App.provider);
      q1 = await c1.balanceOf(poolAddress);
    }
    is1inch = true;
  }
  return {
      symbol,
      name,
      address: poolAddress,
      token0: token0,
      q0,
      token1: token1,
      q1,
      totalSupply: totalSupply / 10 ** decimals,
      stakingAddress: stakingAddress,
      staked: staked / 10 ** decimals,
      decimals: decimals,
      unstaked: unstaked / 10 ** decimals,
      contract: pool,
      tokens : [token0, token1],
      is1inch
  };
}

async function getFantomErc20(App, token, address, stakingAddress) {
    if (address == "0x0000000000000000000000000000000000000000") {
      return {
        address,
        name : "fantom",
        symbol : "fantom",
        totalSupply: 1e8,
        decimals: 18,
        staked: 0,
        unstaked: 0,
        contract: null,
        tokens:[address]
      }
    }
    const calls = [token.decimals(), token.balanceOf(stakingAddress), token.balanceOf(App.YOUR_ADDRESS),
      token.name(), token.symbol(), token.totalSupply()];
    const [decimals, staked, unstaked, name, symbol, totalSupply] = await App.ethcallProvider.all(calls);
    return {
        address,
        name,
        symbol,
        totalSupply,
        decimals : decimals,
        staked:  staked / 10 ** decimals,
        unstaked: unstaked  / 10 ** decimals,
        contract: token,
        tokens : [address]
    };
}

async function getFantomVault(App, vault, address, stakingAddress) {
  const calls = [vault.decimals(), vault.token(), vault.name(), vault.symbol(),
    vault.totalSupply(), vault.balanceOf(stakingAddress), vault.balanceOf(App.YOUR_ADDRESS), vault.balance()]
  const [decimals, token_, name, symbol, totalSupply, staked, unstaked, balance] = 
    await App.ethcallProvider.all(calls);
  const token = await getFantomToken(App, token_, address);
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

async function getFantomWantVault(App, vault, address, stakingAddress) {
  const calls = [vault.decimals(), vault.want(), vault.name(), vault.symbol(),
    vault.totalSupply(), vault.balanceOf(stakingAddress), vault.balanceOf(App.YOUR_ADDRESS), vault.balance()]
  const [decimals, token_, name, symbol, totalSupply, staked, unstaked, balance] = 
    await App.ethcallProvider.all(calls);
  const token = await getFantomToken(App, token_, address);
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

async function getFantomSpoonVault(App, vault, address, stakingAddress) {
  const calls = [vault.decimals(), vault.wantToken(), vault.name(), vault.symbol(),
    vault.totalSupply(), vault.balanceOf(stakingAddress), vault.balanceOf(App.YOUR_ADDRESS), vault.totalTokenBalance()]
  const [decimals, token_, name, symbol, totalSupply, staked, unstaked, balance] = 
    await App.ethcallProvider.all(calls);
  const token = await getFantomToken(App, token_, address);
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

async function getFantomCurveToken(App, curve, address, stakingAddress, minterAddress) {
  const minter = new ethcall.Contract(minterAddress, MINTER_ABI)
  const [virtualPrice, coin0] = await App.ethcallProvider.all([minter.get_virtual_price(), minter.coins(0)]);
  const token = await getToken(App, coin0, address);
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

async function getFantomStableswapToken(App, stable, address, stakingAddress) {
  const calls = [stable.decimals(), stable.balanceOf(stakingAddress), stable.balanceOf(App.YOUR_ADDRESS),
    stable.name(), stable.symbol(), stable.totalSupply(), stable.get_virtual_price(), stable.coins(0)];
  const [decimals, staked, unstaked, name, symbol, totalSupply, virtualPrice, coin0]
    = await App.ethcallProvider.all(calls);
  const token = await getToken(App, coin0, address);
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals : decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: stable,
      tokens : [address, coin0],
      token,
      virtualPrice : virtualPrice / 1e18
  };
}

async function getFantomStoredToken(App, tokenAddress, stakingAddress, type) {
  switch (type) {
    case "fantomSpoonVault":
      const spoonVault = new ethcall.Contract(tokenAddress, SPOON_VAULT_ABI);
      return await getFantomSpoonVault(App, spoonVault, tokenAddress, stakingAddress);
    case "curve":
      const crv = new ethcall.Contract(tokenAddress, CURVE_ABI);
      const [minter] = await App.ethcallProvider.all([crv.minter()]);
      return await getFantomCurveToken(App, crv, tokenAddress, stakingAddress, minter);
    case "stableswap":
      const stable = new ethcall.Contract(tokenAddress, STABLESWAP_ABI);
      return await getFantomStableswapToken(App, stable, tokenAddress, stakingAddress);
    case "uniswap":
      const pool = new ethcall.Contract(tokenAddress, UNI_ABI);
      return await getFantomUniPool(App, pool, tokenAddress, stakingAddress);
    case "fantomVault":
      const vault = new ethcall.Contract(tokenAddress, FANTOM_VAULT_TOKEN_ABI);
      return await getFantomVault(App, vault, tokenAddress, stakingAddress);
    case "fantomWantVault":
      const wantVault = new ethcall.Contract(tokenAddress, FANTOM_VAULT_WANT_ABI);
      return await getFantomWantVault(App, wantVault, tokenAddress, stakingAddress);
    case "fantomBalancer":
      const bal = new ethcall.Contract(tokenAddress, BALANCER_V2_POOL_ABI);
      const [vaultAddress, poolId] = await App.ethcallProvider.all([bal.getVault(), bal.getPoolId()]);
      const vaultBal = new ethcall.Contract(vaultAddress, BALANCER_VAULT_ABI);
      const [tokens] = await App.ethcallProvider.all([vaultBal.getPoolTokens(poolId)]);
      return await getFantomBalancerV2Pool(App, bal, tokenAddress, stakingAddress, tokens);
    case "erc20":
      const erc20 = new ethcall.Contract(tokenAddress, ERC20_ABI);
      return await getFantomErc20(App, erc20, tokenAddress, stakingAddress);
  }
}

async function getFantomToken(App, tokenAddress, stakingAddress) {
    if (tokenAddress == "0x0000000000000000000000000000000000000000") {
      return getFantomErc20(App, null, tokenAddress, "")
    }
    const type = window.localStorage.getItem(tokenAddress);
    if (type) return getFantomStoredToken(App, tokenAddress, stakingAddress, type);
    try {
      const SPOON_VAULT = new ethcall.Contract(tokenAddress, SPOON_VAULT_ABI);
      const _spoonVault = await App.ethcallProvider.all([SPOON_VAULT.wantToken()]);
      const spoonVault = await getFantomSpoonVault(App, SPOON_VAULT, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "fantomSpoonVault");
      return spoonVault;
    }
    catch(err) {
    }
    try {
      const crv = new ethcall.Contract(tokenAddress, CURVE_ABI);
      const [minter] = await App.ethcallProvider.all([crv.minter()]);
      const res = await getFantomCurveToken(App, crv, tokenAddress, stakingAddress, minter);
      window.localStorage.setItem(tokenAddress, "curve");
      return res;
    }
    catch(err) {
    }
    try {
      const stable = new ethcall.Contract(tokenAddress, STABLESWAP_ABI);
      const _coin0 = await App.ethcallProvider.all([stable.coins(0)]);
      window.localStorage.setItem(tokenAddress, "stableswap");
      return await getFantomStableswapToken(App, stable, tokenAddress, stakingAddress);
    }
    catch (err) {
    }
    try {
      const pool = new ethcall.Contract(tokenAddress, UNI_ABI);
      const _token0 = await App.ethcallProvider.all([pool.token0()]);
      const uniPool = await getFantomUniPool(App, pool, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "uniswap");
      return uniPool;
    }
    catch(err) {
    }
    try {
      const VAULT = new ethcall.Contract(tokenAddress, FANTOM_VAULT_TOKEN_ABI);
      const _token = App.ethcallProvider.all([VAULT.token()]);
      const vault = await getFantomVault(App, VAULT, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "fantomVault");
      return vault;
    }
    catch(err) {
    }
    try {
      const bal = new ethcall.Contract(tokenAddress, BALANCER_V2_POOL_ABI);
      const [vaultAddress, poolId] = await App.ethcallProvider.all([bal.getVault(), bal.getPoolId()]);
      const vault = new ethcall.Contract(vaultAddress, BALANCER_VAULT_ABI);
      const [tokens] = await App.ethcallProvider.all([vault.getPoolTokens(poolId)]);
      const balPool = await getFantomBalancerV2Pool(App, bal, tokenAddress, stakingAddress, tokens);
      window.localStorage.setItem(tokenAddress, "fantomBalancer");
      return balPool;
    }
    catch(err) {
    }
    try {
      const WANT_VAULT = new ethcall.Contract(tokenAddress, FANTOM_VAULT_WANT_ABI);
      const _want = await App.ethcallProvider.all([WANT_VAULT.want()]);
      const wantVault = await getFantomWantVault(App, WANT_VAULT, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "fantomWantVault");
      return wantVault;
    }
    catch(err) {
    }
    try {
      const erc20 = new ethcall.Contract(tokenAddress, ERC20_ABI);
      const _name = await App.ethcallProvider.all([erc20.name()]);
      const erc20tok = await getFantomErc20(App, erc20, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "erc20");
      return erc20tok;
    }
    catch(err) {
      console.log(err);
      console.log(`Couldn't match ${tokenAddress} to any known token type.`);
    }
  }

async function loadFantomSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    rewardTokenFunction, stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
      const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
      const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

      const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

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

      const calls = [STAKING_MULTI.periodFinish(), STAKING_MULTI.rewardRate(),
        STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(App.YOUR_ADDRESS)]
      const [periodFinish, rewardRate, balance, earned_] = await App.ethcallProvider.all(calls);

      const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 10 ** rewardToken.decimals * 604800;

      const usdPerWeek = weeklyRewards * rewardTokenPrice;

      const staked_tvl = poolPrices.staked_tvl;

      const userStaked = balance / 10 ** stakeToken.decimals;

      const userUnstaked = stakeToken.unstaked;

      const earned = earned_ / 10 ** rewardToken.decimals;

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

async function loadFantomSynthetixPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
    const info = await loadFantomSynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
    if (!info) return null;
    return await printSynthetixPool(App, info, "fantom");
}

async function loadFantomBasisFork(data) {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};
    var totalStaked = 0;

    let p1 = await loadFantomSynthetixPool(App, tokens, prices, data.PoolABI,
        data.SharePool.address, data.SharePool.rewardToken, data.SharePool.stakeToken);
    totalStaked += p1.staked_tvl;

    if (data.SharePool2) {
      let p3 = await loadFantomSynthetixPool(App, tokens, prices, data.PoolABI,
          data.SharePool2.address, data.SharePool2.rewardToken, data.SharePool2.stakeToken);
      totalStaked += p3.staked_tvl;
    }

    let p2 = await loadFantomSynthetixPool(App, tokens, prices, data.PoolABI,
        data.CashPool.address, data.CashPool.rewardToken, data.CashPool.stakeToken);
    totalStaked += p2.staked_tvl;

    if (data.SeedBanks) {
      let p = await loadMultipleFantomSynthetixPools(App, tokens, prices, data.SeedBanks)
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

async function getFantomPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  const poolToken = await getFantomToken(app, poolInfo.lpToken ?? poolInfo.token ?? poolInfo.stakingToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address : poolInfo.lpToken ?? poolInfo.token ?? poolInfo.stakingToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}

async function loadFantomChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices, claimFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://ftmscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getFantomToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getFantomPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getFantomToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "fantom") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "fantom") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, claimFunction, "fantom", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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

async function loadMultipleFantomSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadFantomSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printSynthetixPool(App, i, "fantom");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalApr };
}

async function loadMultipleFantomSynthetixPoolsSequential(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  for (const p of pools) {
    let res = await loadFantomSynthetixPool(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction);
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
