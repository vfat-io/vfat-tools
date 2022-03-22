const FANTOM_VAULT_TOKEN_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_strategy","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_approvalDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"NewStratCandidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"UpgradeStrat","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approvalDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"name":"proposeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stratCandidate","outputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"proposedTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const FANTOM_VAULT_WANT_ABI = [{"inputs":[{"internalType":"contract IStrategy","name":"_strategy","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_approvalDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"NewStratCandidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"UpgradeStrat","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approvalDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"inCaseTokensGetStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"name":"proposeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stratCandidate","outputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"proposedTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"contract IStrategy","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const SPOON_VAULT_ABI = [{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address[]","name":"_path0","type":"address[]"},{"internalType":"address[]","name":"_path1","type":"address[]"},{"internalType":"uint256","name":"_spookyChefPid","type":"uint256"},{"internalType":"address","name":"_feeReceiver","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_dev","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyOperator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyStop","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exitFeeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"freePeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDepositTimes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"path0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"path1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setDevRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_op","type":"address"}],"name":"setEmergencyOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setExitFeeRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setFeeRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"setFeeReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_period","type":"uint256"}],"name":"setFreePeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_path0","type":"address[]"},{"internalType":"address[]","name":"_path1","type":"address[]"}],"name":"setPath","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"shareBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spookyFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spookyMasterChef","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spookyMasterChefPid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spookyRouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spookyToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"start","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"tokenBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalShareBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wantToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"shareAmount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const FANTOM_YEARN_VAULT_ABI = [{"name":"Transfer","inputs":[{"name":"sender","type":"address","indexed":true},{"name":"receiver","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true},{"name":"spender","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyAdded","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"debtRatio","type":"uint256","indexed":false},{"name":"minDebtPerHarvest","type":"uint256","indexed":false},{"name":"maxDebtPerHarvest","type":"uint256","indexed":false},{"name":"performanceFee","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyReported","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"gain","type":"uint256","indexed":false},{"name":"loss","type":"uint256","indexed":false},{"name":"debtPaid","type":"uint256","indexed":false},{"name":"totalGain","type":"uint256","indexed":false},{"name":"totalLoss","type":"uint256","indexed":false},{"name":"totalDebt","type":"uint256","indexed":false},{"name":"debtAdded","type":"uint256","indexed":false},{"name":"debtRatio","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateGovernance","inputs":[{"name":"governance","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateManagement","inputs":[{"name":"management","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateRewards","inputs":[{"name":"rewards","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateDepositLimit","inputs":[{"name":"depositLimit","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdatePerformanceFee","inputs":[{"name":"performanceFee","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateManagementFee","inputs":[{"name":"managementFee","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateGuardian","inputs":[{"name":"guardian","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"EmergencyShutdown","inputs":[{"name":"active","type":"bool","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateWithdrawalQueue","inputs":[{"name":"queue","type":"address[20]","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdateDebtRatio","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"debtRatio","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdateMinDebtPerHarvest","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"minDebtPerHarvest","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdateMaxDebtPerHarvest","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"maxDebtPerHarvest","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdatePerformanceFee","inputs":[{"name":"strategy","type":"address","indexed":true},{"name":"performanceFee","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyMigrated","inputs":[{"name":"oldVersion","type":"address","indexed":true},{"name":"newVersion","type":"address","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyRevoked","inputs":[{"name":"strategy","type":"address","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyRemovedFromQueue","inputs":[{"name":"strategy","type":"address","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyAddedToQueue","inputs":[{"name":"strategy","type":"address","indexed":true}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"function","name":"initialize","inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"initialize","inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"},{"name":"guardian","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"initialize","inputs":[{"name":"token","type":"address"},{"name":"governance","type":"address"},{"name":"rewards","type":"address"},{"name":"nameOverride","type":"string"},{"name":"symbolOverride","type":"string"},{"name":"guardian","type":"address"},{"name":"management","type":"address"}],"outputs":[]},{"stateMutability":"pure","type":"function","name":"apiVersion","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":5946},{"stateMutability":"nonpayable","type":"function","name":"setName","inputs":[{"name":"name","type":"string"}],"outputs":[],"gas":108344},{"stateMutability":"nonpayable","type":"function","name":"setSymbol","inputs":[{"name":"symbol","type":"string"}],"outputs":[],"gas":73194},{"stateMutability":"nonpayable","type":"function","name":"setGovernance","inputs":[{"name":"governance","type":"address"}],"outputs":[],"gas":37665},{"stateMutability":"nonpayable","type":"function","name":"acceptGovernance","inputs":[],"outputs":[],"gas":38937},{"stateMutability":"nonpayable","type":"function","name":"setManagement","inputs":[{"name":"management","type":"address"}],"outputs":[],"gas":39075},{"stateMutability":"nonpayable","type":"function","name":"setRewards","inputs":[{"name":"rewards","type":"address"}],"outputs":[],"gas":39626},{"stateMutability":"nonpayable","type":"function","name":"setLockedProfitDegradation","inputs":[{"name":"degradation","type":"uint256"}],"outputs":[],"gas":37789},{"stateMutability":"nonpayable","type":"function","name":"setDepositLimit","inputs":[{"name":"limit","type":"uint256"}],"outputs":[],"gas":39065},{"stateMutability":"nonpayable","type":"function","name":"setPerformanceFee","inputs":[{"name":"fee","type":"uint256"}],"outputs":[],"gas":39199},{"stateMutability":"nonpayable","type":"function","name":"setManagementFee","inputs":[{"name":"fee","type":"uint256"}],"outputs":[],"gas":39229},{"stateMutability":"nonpayable","type":"function","name":"setGuardian","inputs":[{"name":"guardian","type":"address"}],"outputs":[],"gas":41773},{"stateMutability":"nonpayable","type":"function","name":"setEmergencyShutdown","inputs":[{"name":"active","type":"bool"}],"outputs":[],"gas":41844},{"stateMutability":"nonpayable","type":"function","name":"setWithdrawalQueue","inputs":[{"name":"queue","type":"address[20]"}],"outputs":[],"gas":1090134},{"stateMutability":"nonpayable","type":"function","name":"transfer","inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":79308},{"stateMutability":"nonpayable","type":"function","name":"transferFrom","inputs":[{"name":"sender","type":"address"},{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":121671},{"stateMutability":"nonpayable","type":"function","name":"approve","inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":38241},{"stateMutability":"nonpayable","type":"function","name":"increaseAllowance","inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":42882},{"stateMutability":"nonpayable","type":"function","name":"decreaseAllowance","inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":42906},{"stateMutability":"nonpayable","type":"function","name":"permit","inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"},{"name":"amount","type":"uint256"},{"name":"expiry","type":"uint256"},{"name":"signature","type":"bytes"}],"outputs":[{"name":"","type":"bool"}],"gas":91494},{"stateMutability":"view","type":"function","name":"totalAssets","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":8698},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_amount","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_amount","type":"uint256"},{"name":"recipient","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"maxAvailableShares","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":1576655},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"maxShares","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"maxShares","type":"uint256"},{"name":"recipient","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"maxShares","type":"uint256"},{"name":"recipient","type":"address"},{"name":"maxLoss","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"pricePerShare","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":77734},{"stateMutability":"nonpayable","type":"function","name":"addStrategy","inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"performanceFee","type":"uint256"}],"outputs":[],"gas":1523989},{"stateMutability":"nonpayable","type":"function","name":"updateStrategyDebtRatio","inputs":[{"name":"strategy","type":"address"},{"name":"debtRatio","type":"uint256"}],"outputs":[],"gas":124263},{"stateMutability":"nonpayable","type":"function","name":"updateStrategyMinDebtPerHarvest","inputs":[{"name":"strategy","type":"address"},{"name":"minDebtPerHarvest","type":"uint256"}],"outputs":[],"gas":47611},{"stateMutability":"nonpayable","type":"function","name":"updateStrategyMaxDebtPerHarvest","inputs":[{"name":"strategy","type":"address"},{"name":"maxDebtPerHarvest","type":"uint256"}],"outputs":[],"gas":47641},{"stateMutability":"nonpayable","type":"function","name":"updateStrategyPerformanceFee","inputs":[{"name":"strategy","type":"address"},{"name":"performanceFee","type":"uint256"}],"outputs":[],"gas":42854},{"stateMutability":"nonpayable","type":"function","name":"migrateStrategy","inputs":[{"name":"oldVersion","type":"address"},{"name":"newVersion","type":"address"}],"outputs":[],"gas":1190208},{"stateMutability":"nonpayable","type":"function","name":"revokeStrategy","inputs":[],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"revokeStrategy","inputs":[{"name":"strategy","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"addStrategyToQueue","inputs":[{"name":"strategy","type":"address"}],"outputs":[],"gas":1255644},{"stateMutability":"nonpayable","type":"function","name":"removeStrategyFromQueue","inputs":[{"name":"strategy","type":"address"}],"outputs":[],"gas":23636673},{"stateMutability":"view","type":"function","name":"debtOutstanding","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"debtOutstanding","inputs":[{"name":"strategy","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"creditAvailable","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"creditAvailable","inputs":[{"name":"strategy","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"availableDepositLimit","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":21381},{"stateMutability":"view","type":"function","name":"expectedReturn","inputs":[],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"view","type":"function","name":"expectedReturn","inputs":[{"name":"strategy","type":"address"}],"outputs":[{"name":"","type":"uint256"}]},{"stateMutability":"nonpayable","type":"function","name":"report","inputs":[{"name":"gain","type":"uint256"},{"name":"loss","type":"uint256"},{"name":"_debtPayment","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":1239256},{"stateMutability":"nonpayable","type":"function","name":"sweep","inputs":[{"name":"token","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"sweep","inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":13920},{"stateMutability":"view","type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":11673},{"stateMutability":"view","type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3678},{"stateMutability":"view","type":"function","name":"balanceOf","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3923},{"stateMutability":"view","type":"function","name":"allowance","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":4168},{"stateMutability":"view","type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3768},{"stateMutability":"view","type":"function","name":"token","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3798},{"stateMutability":"view","type":"function","name":"governance","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3828},{"stateMutability":"view","type":"function","name":"management","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3858},{"stateMutability":"view","type":"function","name":"guardian","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3888},{"stateMutability":"view","type":"function","name":"strategies","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"performanceFee","type":"uint256"},{"name":"activation","type":"uint256"},{"name":"debtRatio","type":"uint256"},{"name":"minDebtPerHarvest","type":"uint256"},{"name":"maxDebtPerHarvest","type":"uint256"},{"name":"lastReport","type":"uint256"},{"name":"totalDebt","type":"uint256"},{"name":"totalGain","type":"uint256"},{"name":"totalLoss","type":"uint256"}],"gas":22641},{"stateMutability":"view","type":"function","name":"withdrawalQueue","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":4057},{"stateMutability":"view","type":"function","name":"emergencyShutdown","inputs":[],"outputs":[{"name":"","type":"bool"}],"gas":3978},{"stateMutability":"view","type":"function","name":"depositLimit","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4008},{"stateMutability":"view","type":"function","name":"debtRatio","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4038},{"stateMutability":"view","type":"function","name":"totalDebt","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4068},{"stateMutability":"view","type":"function","name":"lastReport","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4098},{"stateMutability":"view","type":"function","name":"activation","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4128},{"stateMutability":"view","type":"function","name":"lockedProfit","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4158},{"stateMutability":"view","type":"function","name":"lockedProfitDegradation","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4188},{"stateMutability":"view","type":"function","name":"rewards","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":4218},{"stateMutability":"view","type":"function","name":"managementFee","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4248},{"stateMutability":"view","type":"function","name":"performanceFee","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4278},{"stateMutability":"view","type":"function","name":"nonces","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":4523},{"stateMutability":"view","type":"function","name":"DOMAIN_SEPARATOR","inputs":[],"outputs":[{"name":"","type":"bytes32"}],"gas":4338}]
const FANTOM_OXDAO_TOKENS_ABI = [{"inputs":[{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"string","name":"_tokenSymbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allowedTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bribeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bribeNotifySyncIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bribeOrFeesIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bribeSyncIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bribeTokensAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bribeTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositLp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gaugeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"indexByRewardToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_oxPoolFactoryAddress","type":"address"},{"internalType":"address","name":"_solidPoolAddress","type":"address"},{"internalType":"address","name":"_stakingAddress","type":"address"},{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"string","name":"_tokenSymbol","type":"string"},{"internalType":"address","name":"_bribeAddress","type":"address"},{"internalType":"address","name":"_tokensAllowlistAddress","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nextClaimBribeTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextClaimFeeTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextClaimSolidTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"notifyBribeOrFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"notifyBribeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"notifyFeeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"oxPoolAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oxPoolFactoryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokenByIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"solidPoolAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"solidPoolInfo","outputs":[{"components":[{"internalType":"address","name":"id","type":"address"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"bool","name":"stable","type":"bool"},{"internalType":"address","name":"token0Address","type":"address"},{"internalType":"address","name":"token1Address","type":"address"},{"internalType":"address","name":"gaugeAddress","type":"address"},{"internalType":"address","name":"bribeAddress","type":"address"},{"internalType":"address[]","name":"bribeTokensAddresses","type":"address[]"},{"internalType":"address","name":"fees","type":"address"}],"internalType":"struct ISolidlyLens.Pool","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"syncBribeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"syncBribeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokensAllowlistAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"bribeTokenAddress","type":"address"}],"name":"updateTokenAllowedState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"bribeTokensAddresses","type":"address[]"}],"name":"updateTokensAllowedStates","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawLp","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const FantomTokens = [
  { "id": "tether", "symbol": "USDT", "contract": "0x049d68029688eAbF473097a2fC38ef61633A3C7A" },
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75" },
  { "id": "fantom", "symbol": "FTM", "contract": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83" },
  { "id": "ethereum", "symbol": "ETH", "contract": "0x74b23882a30290451A17c44f4F05243b6b58C76d" },
  { "id": "yearn-finance", "symbol": "YFI", "contract": "0x29b0Da86e484E1C0029B56e817912d778aC0EC69" },
  { "id": "chainlink", "symbol": "LINK", "contract": "0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8" },
  { "id": "cream", "symbol": "CREAM", "contract": "0x657A1861c15A3deD9AF0B6799a195a249ebdCbc6" },
  { "id": "dai", "symbol": "DAI", "contract": "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E" },
  { "id": "synthetix-network-token", "symbol": "SNX", "contract": "0x56ee926bD8c72B2d5fa1aF4d9E4Cbb515a1E3Adc" },
  { "id": "sushi", "symbol": "SUSHI", "contract": "0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC" },
  { "id": "ice-token", "symbol": "ICE", "contract": "0xf16e81dce15b08f326220742020379b855b87df9" },
  { "id": "spookyswap", "symbol": "BOO", "contract": "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE" },
  { "id": "binancecoin", "symbol": "BNB", "contract": "0xD67de0e0a0Fd7b15dC8348Bb9BE742F3c5850454" },
  { "id": "tomb-shares", "symbol": "TSHARE", "contract": "0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37" },
  { "id": "tomb", "symbol": "TOMB", "contract": "0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7" },
  { "id": "frax-share", "symbol": "FXS", "contract": "0x82F8Cb20c14F134fe6Ebf7aC3B903B2117aAfa62" },
  { "id": "frax", "symbol": "FRAX", "contract": "0xaf319E5789945197e365E7f7fbFc56B130523B33" },
  { "id": "spiritswap", "symbol": "SPIRIT", "contract": "0x5cc61a78f164885776aa610fb0fe1257df78e59b" },
  { "id": "grimcoin", "symbol": "GRIM", "contract": "0x7eC94C4327dC757601B4273cD67014d7760Be97E" },
  { "id": "galaxy-triton", "symbol": "TRITON", "contract": "0x9cf4009e62429Db3F57Aa9e7e8E898427cF6865f" },
  { "id": "galaxy-oberon", "symbol": "OBERON", "contract": "0xc979E70611D997Aa109528c6A9aa73D82Eaa2881" },
  { "id": "pumpkins", "symbol": "KINS", "contract": "0x6eced8e16eda61e65292f019b165542a5906ecd6" },
  { "id": "wraithswap", "symbol": "WRA", "contract": "0x4CF098d3775Bd78a4508a13E126798Da5911b6cd" },
  { "id": "geist-finance", "symbol": "GEIST", "contract": "0xd8321aa83fb0a4ecd6348d4577431310a6e0814d" },
  { "id": "bitcoin", "symbol": "BTC", "contract": "0x321162Cd933E2Be498Cd2267a90534A804051b11" },
  { "id": "curve-dao-token", "symbol": "CRV", "contract": "0x1e4f97b9f9f913c46f1632781732927b9019c68b" },
  { "id": "coffin-finance", "symbol": "COFFIN", "contract": "0x593Ab53baFfaF1E821845cf7080428366F030a9c" },
  { "id": "coffin-dollar", "symbol": "CoUSD", "contract": "0x0DeF844ED26409C5C46dda124ec28fb064D90D27" },
  { "id": "beethoven-x", "symbol": "BEETS", "contract": "0xf24bcf4d1e507740041c9cfd2dddb29585adce1e" },
  { "id": "synapse-2", "symbol": "SYN", "contract": "0xE55e19Fb4F2D85af758950957714292DAC1e25B2" },
  { "id": "spell-token", "symbol": "SPELL", "contract": "0x468003B688943977e6130F4F68F23aad939a1040" },
  { "id": "joe", "symbol": "JOE", "contract": "0x9F47F313ACFd4bdC52F4373b493EaE7d5aC5b765" },
  { "id": "true-usd", "symbol": "TUSD", "contract": "0x9879aBDea01a879644185341F7aF7d8343556B7a" },
  { "id": "magic-internet-money", "symbol": "MIM", "contract": "0x82f0B8B456c1A451378467398982d4834b6829c1" },
  { "id": "frax", "symbol": "FRAX", "contract": "0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355" },
  { "id": "hundred-finance", "symbol": "HND", "contract": "0x10010078a54396f62c96df8532dc2b4847d47ed3" },
  { "id": "topshelf-finance", "symbol": "LIQR", "contract": "0x33333ee26a7d02e41c33828b42fb1e0889143477" },
  { "id": "blockchain-adventurers-guild", "symbol": "BAG", "contract":"0xB1d82666384bE5F8C59AA18e650493ABb8A614Ad" },
  { "id": "beluga-fi", "symbol": "BELUGA", "contract":"0x4A13a2cf881f5378DEF61E430139Ed26d843Df9A" },
  { "id": "liquiddriver", "symbol": "LQDR", "contract":"0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9" },
  { "id": "tarot", "symbol": "TAROT", "contract":"0xc5e2b037d30a390e62180970b3aa4e91868764cd" },
  { "id": "creditum", "symbol": "CREDIT", "contract":"0x77128dfdd0ac859b33f44050c6fa272f34872b5e" },
  { "id": "scream", "symbol": "SCREAM", "contract":"0xe0654c8e6fd4d733349ac7e09f6f23da256bf475" },
  { "id": "governance-ohm", "symbol": "GOHM", "contract":"0x91fa20244Fb509e8289CA630E5db3E9166233FDc" },
  { "id": "partial-share", "symbol": "PSHARE", "contract": "0x8C64D18E9d4A7b8e8c10C5c5a4b8D6D83cb15002" },
  { "id": "partial", "symbol": "PARTIAL", "contract": "0x9486fDA4C1192db69a08CA7235E2E6bAf31B467B" },
  { "id": "beefy-finance", "symbol": "BIFI", "contract": "0xd6070ae98b8069de6B494332d1A1a81B6179D960" },
  { "id": "linspirit", "symbol": "LINSPIRIT", "contract": "0xc5713b6a0f26bf0fdc1c52b90cd184d950be515c" },
  { "id": "solidsex-tokenized-vesolid", "symbol": "SOLIDSEX", "contract": "0x41adac6c1ff52c5e27568f27998d747f7b69795b" },
  { "id": "pdollar", "symbol": "PDO", "contract": "0xb9D62c829fbF7eAff1EbA4E50F3D0480b66c1748"},
  { "id": "pdollar-share", "symbol": "sPDO", "contract": "0x1D3918043d22de2D799a4d80f72Efd50Db90B5Af"},
  { "id": "solidly", "symbol": "SOLID", "contract": "0x888ef71766ca594ded1f0fa3ae64ed2941740a20"},
  { "id": "mooncoin", "symbol": "MOON", "contract": "0x7FB5c0A098Fbea90D254861979c321493E18da84"},
  { "id": "scarab-finance", "symbol": "SCARAB", "contract": "0x2e79205648b85485731cfe3025d66cf2d3b059c4"},
  { "id": "gscarab", "symbol": "GSCARAB", "contract": "0x6ab5660f0b1f174cfa84e9977c15645e4848f5d6"},
  { "id": "solidex", "symbol": "SEX", "contract": "0xd31fcd1f7ba190dbc75354046f6024a9b86014d7"},
  { "id": "dei-token", "symbol": "DEI", "contract": "0xde12c7959e1a72bbe8a5f7a1dc8f8eef9ab011b3"},
  { "id": "cre8r-dao", "symbol": "CRE8R", "contract": "0x2aD402655243203fcfa7dCB62F8A08cc2BA88ae0"},
  { "id": "fbomb", "symbol": "BOMB", "contract": "0x8503eb4a136bdbeb323e37aa6e0fa0c772228378"},
  { "id": "charm", "symbol": "CHARM", "contract": "0x248cb87dda803028dfead98101c9465a2fbda0d4"},
  { "id": "ginspirit", "symbol": "GINSPIRIT", "contract": "0x2787bea3366335068bf8b4a253044d09ea4e1c96"},
  { "id": "0xdao", "symbol": "OXD", "contract": "0xc165d941481e68696f43ee6e99bfb2b23e0e3114"}, //this is v1
  { "id": "30mb-token", "symbol": "3OMB", "contract": "0x14def7584a6c52f470ca4f4b9671056b22f4ffde"},
  { "id": "vedao", "symbol": "WEVE", "contract": "0x911da02c1232a3c3e1418b834a311921143b04d7"},
  { "id": "terrausd", "symbol": "UST", "contract": "0xe2d27f06f63d98b8e11b38b5b08a75d0c8dd62b9"},
  { "id": "stargate-finance", "symbol": "STG", "contract": "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590"}
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

async function getFantom0xdao(App, pool, address, stakingAddress) {
  const calls = [pool.decimals(), pool.solidPoolAddress(), pool.name(), pool.symbol(),
    pool.totalSupply(), pool.balanceOf(stakingAddress), pool.balanceOf(App.YOUR_ADDRESS)]
  const [decimals, token_, name, symbol, totalSupply, staked, unstaked] =
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
    balance : totalSupply,
    contract: pool,
    tokens : [address].concat(token.tokens),
  }
}

async function getFantomYearnVault(App, yearn, address, stakingAddress) {
  const calls = [yearn.decimals(), yearn.token(), yearn.name(), yearn.symbol(), yearn.totalSupply(),
    yearn.balanceOf(stakingAddress), yearn.balanceOf(App.YOUR_ADDRESS), yearn.totalAssets(), yearn.pricePerShare()];
  const [decimals, token_, name, symbol, totalSupply, staked, unstaked, balance, ppfs] =
    await App.ethcallProvider.all(calls);
  const token = await getToken(App, token_, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals : decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance : staked / 10 ** decimals,
    contract: yearn,
    tokens : [address].concat(token.tokens),
    ppfs : ppfs / 10 ** decimals,
    yearn : true
  }
}

async function getFantomBasicVault(App, vault, address, stakingAddress) {
  const calls = [vault.decimals(), vault.underlying(), vault.name(), vault.symbol(),
    vault.totalSupply(), vault.balanceOf(stakingAddress), vault.balanceOf(App.YOUR_ADDRESS),
    vault.underlyingBalanceWithInvestment()];
  const [ decimals, underlying, name, symbol, totalSupply, staked, unstaked, balance] =
    await App.ethcallProvider.all(calls);
  const token = await getFantomToken(App, underlying, address);
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

async function getCFantomToken(App, cToken, address, stakingAddress) {
  const calls = [cToken.decimals(), cToken.underlying(), cToken.totalSupply(),
    cToken.name(), cToken.symbol(), cToken.balanceOf(stakingAddress),
    cToken.balanceOf(App.YOUR_ADDRESS), cToken.exchangeRateStored()];
  const [decimals, underlying, totalSupply, name, symbol, staked, unstaked, exchangeRate] =
    await App.ethcallProvider.all(calls);
  const token = await getFantomToken(App, underlying, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance: totalSupply * exchangeRate / 1e18,
    contract: cToken,
    tokens : [address].concat(token.tokens)
  }
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
    case "yearn":
      const yearnVault = new ethcall.Contract(tokenAddress, FANTOM_YEARN_VAULT_ABI);
      return await getFantomYearnVault(App, yearnVault, tokenAddress, stakingAddress);
    case "0xdao":
      const oxdao = new ethcall.Contract(tokenAddress, FANTOM_OXDAO_TOKENS_ABI);
      return await getFantom0xdao(App, oxdao, tokenAddress, stakingAddress);
    case "cToken":
      const cFantomToken = new ethcall.Contract(tokenAddress, CTOKEN_ABI);
      return await getCFantomToken(App, cFantomToken, tokenAddress, stakingAddress);
    case "uniswap":
      const pool = new ethcall.Contract(tokenAddress, UNI_ABI);
      return await getFantomUniPool(App, pool, tokenAddress, stakingAddress);
    case "fantomVault":
      const vault = new ethcall.Contract(tokenAddress, FANTOM_VAULT_TOKEN_ABI);
      return await getFantomVault(App, vault, tokenAddress, stakingAddress);
    case "basicFantomVault":
      const basicFantomVault = new ethcall.Contract(tokenAddress, HARVEST_VAULT_ABI);
      return await getFantomBasicVault(App, basicFantomVault, tokenAddress, stakingAddress);
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
      const oxdaoContract = new ethcall.Contract(tokenAddress, FANTOM_OXDAO_TOKENS_ABI);
      const [token] = await App.ethcallProvider.all([oxdaoContract.solidPoolAddress()]);
      const oxdao = await getFantom0xdao(App, oxdaoContract, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "0xdao");
      return oxdao;
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
      const yearnVault = new ethcall.Contract(tokenAddress, FANTOM_YEARN_VAULT_ABI);
      const _domainSep = await App.ethcallProvider.all([yearnVault.DOMAIN_SEPARATOR()]);
      const yearn = await getFantomYearnVault(App, yearnVault, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "yearn");
      return yearn;
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
      const cToken = new ethcall.Contract(tokenAddress, CTOKEN_ABI);
      const _totalBorrows = await App.ethcallProvider.all([cToken.totalBorrows()]);
      const res = await getCFantomToken(App, cToken, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "cToken");
      return res;
    }
    catch(err) {
    }
    try {
      const basicVault = new ethcall.Contract(tokenAddress, HARVEST_VAULT_ABI);
      const _token = await App.ethcallProvider.all([basicVault.underlying()]);
      const res = await getFantomBasicVault(App, basicVault, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "basicFantomVault");
      return res;
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
      depositFee : (poolInfo.depositFeeBP ?? poolInfo.depositFee ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? poolInfo.withdrawalFee ?? 0) / 100
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
