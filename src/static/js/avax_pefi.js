
$(function() {
    consoleInit(main)
  });

const PEFI_CHEF_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_pefi","internalType":"contract PenguinToken"},{"type":"address","name":"_devaddr","internalType":"address"},{"type":"address","name":"_feeAddress","internalType":"address"},{"type":"uint256","name":"_pefiPerBlock","internalType":"uint256"},{"type":"uint256","name":"_startBlock","internalType":"uint256"}]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"SetDevAddress","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"address","name":"newAddress","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"SetFeeAddress","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"address","name":"newAddress","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"UpdateEmissionRate","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pefiPerBlock","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BONUS_MULTIPLIER","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IERC20"},{"type":"uint16","name":"_withdrawFeeBP","internalType":"uint16"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"dev","inputs":[{"type":"address","name":"_devaddr","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devaddr","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"feeAddress","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract PenguinToken"}],"name":"pefi","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pefiPerBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingPEFI","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"poolExistence","inputs":[{"type":"address","name":"","internalType":"contract IERC20"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"accPEFIPerShare","internalType":"uint256"},{"type":"uint16","name":"withdrawFeeBP","internalType":"uint16"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"uint16","name":"_withdrawFeeBP","internalType":"uint16"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setFeeAddress","inputs":[{"type":"address","name":"_feeAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateEmissionRate","inputs":[{"type":"uint256","name":"_pefiPerBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]
const xPEFI_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_pefi","internalType":"contract PenguinToken"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"LOCK_PERIOD","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MAX_EARLY_WITHDRAW_FEE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earlyWithdrawalFee","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"enter","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"leave","inputs":[{"type":"uint256","name":"_share","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract PenguinToken"}],"name":"pefi","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setEarlyWithdrawalFee","inputs":[{"type":"uint256","name":"_earlyWithdrawalFee","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"unlockDate","inputs":[]}]
const PEFI_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_minterAddress","internalType":"address"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"DelegateChanged","inputs":[{"type":"address","name":"delegator","internalType":"address","indexed":true},{"type":"address","name":"fromDelegate","internalType":"address","indexed":true},{"type":"address","name":"toDelegate","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"DelegateVotesChanged","inputs":[{"type":"address","name":"delegate","internalType":"address","indexed":true},{"type":"uint256","name":"previousBalance","internalType":"uint256","indexed":false},{"type":"uint256","name":"newBalance","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DELEGATION_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"burnOwnTokens","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint32","name":"fromBlock","internalType":"uint32"},{"type":"uint256","name":"votes","internalType":"uint256"}],"name":"checkpoints","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"uint32","name":"","internalType":"uint32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"delegate","inputs":[{"type":"address","name":"delegatee","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"delegateBySig","inputs":[{"type":"address","name":"delegatee","internalType":"address"},{"type":"uint256","name":"nonce","internalType":"uint256"},{"type":"uint256","name":"expiry","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"delegates","inputs":[{"type":"address","name":"delegator","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCurrentVotes","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getPriorVotes","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"mint","inputs":[{"type":"address","name":"_to","internalType":"address"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonces","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint32","name":"","internalType":"uint32"}],"name":"numCheckpoints","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMinter","inputs":[{"type":"address","name":"_minterAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]}]
const PEFI_VAULT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"string","name":"_name","internalType":"string"},{"type":"address[8]","name":"_initAddressArray","internalType":"address[8]"},{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_minTokensToReinvest","internalType":"uint256"},{"type":"uint256[4]","name":"_initFeeStructure","internalType":"uint256[4]"},{"type":"address[]","name":"_pathRewardToToken0","internalType":"address[]"},{"type":"address[]","name":"_pathRewardToToken1","internalType":"address[]"},{"type":"address","name":"_pefiGlobalVariables","internalType":"address"},{"type":"bool","name":"_USE_GLOBAL_PEFI_VARIABLES","internalType":"bool"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"ClaimedxPEFI","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"DepositsEnabled","inputs":[{"type":"bool","name":"newValue","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"FeeStructureUpdated","inputs":[{"type":"uint256","name":"newPOOL_CREATOR_FEE_BIPS","internalType":"uint256","indexed":false},{"type":"uint256","name":"newNEST_FEE_BIPS","internalType":"uint256","indexed":false},{"type":"uint256","name":"newDEV_FEE_BIPS","internalType":"uint256","indexed":false},{"type":"uint256","name":"newALTERNATE_FEE_BIPS","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"NestStakingBipsChanged","inputs":[{"type":"uint256","name":"oldNEST_STAKING_BIPS","internalType":"uint256","indexed":false},{"type":"uint256","name":"newNEST_STAKING_BIPS","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Reinvest","inputs":[{"type":"uint256","name":"newTotalDeposits","internalType":"uint256","indexed":false},{"type":"uint256","name":"newTotalSupply","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"StakedPEFI","inputs":[{"type":"uint256","name":"amountPefiSentToNest","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateAlternateAddress","inputs":[{"type":"address","name":"oldValue","internalType":"address","indexed":false},{"type":"address","name":"newValue","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateDevAddress","inputs":[{"type":"address","name":"oldValue","internalType":"address","indexed":false},{"type":"address","name":"newValue","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateMaxTokensToDepositWithoutReinvest","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateMinTokensToReinvest","inputs":[{"type":"uint256","name":"oldValue","internalType":"uint256","indexed":false},{"type":"uint256","name":"newValue","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpdateNestAddress","inputs":[{"type":"address","name":"oldValue","internalType":"address","indexed":false},{"type":"address","name":"newValue","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"UpdatePoolCreatorAddress","inputs":[{"type":"address","name":"oldValue","internalType":"address","indexed":false},{"type":"address","name":"newValue","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"UseGlobalVariablesUpdated","inputs":[{"type":"bool","name":"newValue","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"ALTERNATE_FEE_BIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"ALTERNATE_FEE_BIPS_LOCAL","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"DEPOSITS_ENABLED","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DEV_FEE_BIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"DEV_FEE_BIPS_LOCAL","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MAX_TOKENS_TO_DEPOSIT_WITHOUT_REINVEST","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MAX_TOTAL_FEE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MIN_TOKENS_TO_REINVEST","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"NEST_FEE_BIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"NEST_FEE_BIPS_LOCAL","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"NEST_STAKING_BIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"PERMIT_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PID","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"POOL_CREATOR_FEE_BIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"POOL_CREATOR_FEE_BIPS_LOCAL","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"USE_GLOBAL_PEFI_VARIABLES","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"VERSION_HASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"alternateAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"alternateAddressLocal","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"checkReward","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimXPEFI","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositFor","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"depositToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositWithPermit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devAddressLocal","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"estimateDeployedBalance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"estimateReinvestReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getDepositTokensForShares","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"getDomainSeparator","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getSharesForDepositTokens","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"impromptuTokenAggregation","inputs":[{"type":"uint256","name":"minReturnAmountAccepted","internalType":"uint256"},{"type":"bool","name":"disableDeposits","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"nestAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"nestAddressLocal","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonces","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract PenguinStrategyGlobalVariables"}],"name":"pefiGlobalVariableContract","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingXPefi","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"permit","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"poolCreatorAddress","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverAVAX","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverERC20","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reinvest","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeAllowance","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IRouter"}],"name":"router","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setAllowances","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"stakingContract","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token0","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token1","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalDeposits","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"src","internalType":"address"},{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateAlternateAddress","inputs":[{"type":"address","name":"newValue","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateDepositsEnabled","inputs":[{"type":"bool","name":"newValue","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateDevAddress","inputs":[{"type":"address","name":"newValue","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateFeeStructure","inputs":[{"type":"uint256","name":"newPOOL_CREATOR_FEE_BIPS","internalType":"uint256"},{"type":"uint256","name":"newNEST_FEE_BIPS","internalType":"uint256"},{"type":"uint256","name":"newDEV_FEE_BIPS","internalType":"uint256"},{"type":"uint256","name":"newALTERNATE_FEE_BIPS","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateMaxTokensToDepositWithoutReinvest","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateMinTokensToReinvest","inputs":[{"type":"uint256","name":"newValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateNestAddress","inputs":[{"type":"address","name":"newValue","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateNestStakingBips","inputs":[{"type":"uint256","name":"newNEST_STAKING_BIPS","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePoolCreatorAddress","inputs":[{"type":"address","name":"newValue","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateUseGlobalVariables","inputs":[{"type":"bool","name":"newValue","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"xPefiDebt","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"xPefiPerShare","inputs":[]}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const PEFI_CHEF_ADDR = "0x8AC8ED5839ba269Be2619FfeB3507baB6275C257";
   const rewardTokenTicker = "PEFI";
   const PEFI_CHEF = new ethers.Contract(PEFI_CHEF_ADDR, PEFI_CHEF_ABI, App.provider);

   const blocksPerSeconds = await getAverageBlockTime(App);

   const rewardsPerWeek = await PEFI_CHEF.pefiPerBlock() /1e18
        * 604800 / blocksPerSeconds;

    const tokens = {};
    const prices = await getAvaxPrices();

    await loadAvaxChefContract(App, tokens, prices, PEFI_CHEF, PEFI_CHEF_ADDR, PEFI_CHEF_ABI, rewardTokenTicker,
        "pefi", null, rewardsPerWeek, "pendingPEFI", [1]);
    await loadXPefi(App, prices);

    _print("");
    await loadPefiVaultInfo(App, tokens, prices, pefiVaults[0].abi, pefiVaults[0].vaultAddress,
      pefiVaults[0].rewardTokenFunction, pefiVaults[0].stakeTokenFunction)

    await loadPefiVaults(App, tokens, prices, pefiVaults);

    hideLoading();
  }

async function loadXPefi(App, prices){
  const xPEFI_ADDR = "0xD79A36056c271B988C5F1953e664E61416A9820F";
  const PEFI_ADDR = "0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c";
  const xPEFI_CONTRACT = new ethers.Contract(xPEFI_ADDR, xPEFI_ABI, App.provider);
  const PEFI_CONTRACT = new ethers.Contract(PEFI_ADDR, PEFI_ABI, App.provider);
  const totalDepositedPefis = await PEFI_CONTRACT.balanceOf(xPEFI_ADDR) / 1e18;
  const totalXpefiTokens = await xPEFI_CONTRACT.totalSupply() / 1e18;
  const virtualPrice = totalDepositedPefis / totalXpefiTokens;
  const pefiPrice = getParameterCaseInsensitive(prices, PEFI_ADDR).usd;
  const xPefiPrice = pefiPrice * virtualPrice;
  const rewardTicker = await xPEFI_CONTRACT.symbol();
  const stakeTicker = await PEFI_CONTRACT.symbol();
  const totalOwnedXPefi = await xPEFI_CONTRACT.balanceOf(App.YOUR_ADDRESS) / 1e18;
  const totalOwnedPefi = totalOwnedXPefi * virtualPrice;
  const tvl = totalDepositedPefis * pefiPrice
  const usersPercentage = totalOwnedXPefi / totalXpefiTokens * 100;
  const usersXPefiUsd = totalOwnedXPefi * pefiPrice;
  _print(`\n${rewardTicker} Price: $${toFixed(xPefiPrice, 2)} Total Supply: ${toFixed(totalXpefiTokens, 4)} TVL: $${formatMoney(tvl)}`);
  _print(`${stakeTicker} Price: $${toFixed(pefiPrice, 2)}`);
  _print(`There is a total of ${toFixed(totalDepositedPefis, 2)} PEFI staked in xPEFI`);
  _print(`Your balance is ${totalOwnedXPefi.toFixed(2)} ${rewardTicker} (${totalOwnedPefi.toFixed(2)} ${stakeTicker}), $${formatMoney(usersXPefiUsd)}, ${usersPercentage.toFixed(2)}% of the pool`);
  const approveAndStake = async function() {
    return contract_stake(xPEFI_ABI, xPEFI_ADDR, App, PEFI_ADDR)
  }
  const unstake = async function() {
    return contract_unstake(xPEFI_ABI, xPEFI_ADDR, totalOwnedXPefi, App)
  }
  _print_link(`Stake ${totalOwnedPefi.toFixed(2)} ${stakeTicker}`, approveAndStake)
  _print_link(`*** Paper hands penalty ***`);
  _print_link(`Unstaking currently incurs a 25% fee.`);
  _print_link(`Unstake ${totalOwnedXPefi.toFixed(2)} ${rewardTicker}`, unstake)
}

const contract_stake = async function(abi, contractAddress, App, stakeTokenAddr) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(contractAddress, abi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, contractAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(contractAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
          CHEF_CONTRACT.enter(currentTokens, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const contract_unstake = async function(abi, contractAddress, stakedAmount, App) {
  const signer = App.provider.getSigner()
  const xPEFI_WRITE_CONTRACT = new ethers.Contract(contractAddress, abi, signer)
  showLoading()
  xPEFI_WRITE_CONTRACT.leave(stakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
}

const pefiVaults = [
  "0xdF5fb3FA0161a8508599a6dFC9d6C004Cb58652b",
  "0xbE42a57f4A08636C26457475e94409516fA39b3B",
  "0xaB6eEd788BEed09D1279b21B6C91F9750242E0f5",
  "0x9acBcA2315a517a3Dab8e857f5921A8B3435891A",
  "0x323c5CC630c0ce1F2823D1A3D48260f770b5669B",
  "0x1AD8FF956247F87de904F31B0322843F32F19A5C",
  "0xBbd9DD1f15c729745eDFFD8E46253463D40A7d84",
  "0xb6Cd0569563549033c129769dbC58d1843ed98cb",
  "0xB4558486cd8fd2DD5E3B078E7822c1Bb66C782d0",
  "0xd6Da9D000FfA1ea6D3939fCD80f4d473f2027567",
  "0x4EC41D1E25925c57876885c34Fe0b323D7CC3846",
  "0x7dD48db5372539d01Ed4b6cC525403d98BC61Bdd",
  "0xFC8deac2f93E5B4739ECe2802e5c5e05106fd872",
  "0xc90b9A965c800A0318ec4282A86E387BeeEF0ffE"
].map(a => {
  return {
    vaultAddress         : a,
    abi                  : PEFI_VAULT_ABI,
    stakeTokenFunction   : "depositToken",
    rewardTokenFunction  : "rewardToken"
  }
})

async function loadPefiVaults(App, tokens, prices, pools) {
  const infos = await Promise.all(pools.map(p => 
    loadPefiVaultInfo(App, tokens, prices, p.abi, p.vaultAddress, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos.filter(i => i?.poolPrices)) {
    printPefiVault(i, "matic");
  }
}

async function loadPefiVaultInfo(App, tokens, prices, stakingAbi, stakingAddress,
    rewardTokenFunction, stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
      const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
      const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();
  
      let stakeToken = await getMaticToken(App, stakeTokenAddress, stakingAddress);
      stakeToken.staked = await STAKING_POOL.totalDeposits() / 10 ** stakeToken.decimals
  
      if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
      }
  
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
  
      const staked_tvl = poolPrices.staked_tvl;
  
      const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;
  
      const userUnstaked = stakeToken.unstaked;
  
      return  {
        stakingAddress,
        poolPrices,
        stakeTokenAddress,
        rewardTokenAddress,
        stakeTokenTicker,
        rewardTokenTicker,
        stakeTokenPrice,
        rewardTokenPrice,
        staked_tvl,
        userStaked,
        userUnstaked
      }
}

function printPefiVault(info, chain="eth") {
    info.poolPrices.print_price(chain, 4);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    _print("");
}