$(function() {
    consoleInit(main)
});

const FATE_REWARD_CONTROLLER_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_fate","type":"address"},{"internalType":"contract IRewardScheduleV3","name":"_rewardSchedule","type":"address"},{"internalType":"address","name":"_vault","type":"address"},{"internalType":"contract IFateRewardController[]","name":"_oldControllers","type":"address[]"},{"internalType":"contract IMockLpTokenFactory","name":"_mockLpTokenFactory","type":"address"},{"internalType":"uint256","name":"_startTimestamp","type":"uint256"},{"internalType":"address","name":"_fateFeeTo","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"allowEmergencyWithdrawal","type":"bool"}],"name":"EmergencyWithdrawalAllowedSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_account","type":"address"},{"indexed":false,"internalType":"bool","name":"_status","type":"bool"}],"name":"ExcludedAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_fateFeeTo","type":"address"}],"name":"FateFeeToSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"_lpWithdrawPeriodTimestamps","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"_lpWithdrawFeePercent","type":"uint256[]"}],"name":"LPWithdrawDataSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"_lockedRewardsPeriodTimestamps","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"_lockedRewardsFeePercents","type":"uint256[]"}],"name":"LockedRewardsDataSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"migrator","type":"address"}],"name":"MigratorSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"PoolAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"PoolAllocPointSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"rewardSchedule","type":"address"}],"name":"RewardScheduleSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"rewardSchedule","type":"address"}],"name":"VaultSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"POINTS_PER_SECOND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"_getUserInfo","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"lockedRewardDebt","type":"uint256"}],"internalType":"struct IFateRewardControllerV3.UserInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20[]","name":"_lpTokens","type":"address[]"}],"name":"addMany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"allLockedFate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"allPendingLockedFate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"allPendingUnlockedFate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"allUserPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allowEmergencyWithdrawal","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_pids","type":"uint256[]"}],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fate","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fateFeeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"feeReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getEffectiveAmountAfterLpFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_reward","type":"uint256"}],"name":"getEffectiveRewardAfterRewardFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getFeeReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"getLPWithdrawFeePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"getLockedRewardsFeePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid1","type":"uint256"}],"name":"getNewRewardPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"}],"name":"getPoolInfoId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isExcludedAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockedRewardsFeePercents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockedRewardsPeriodTimestamps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpWithdrawFeePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpWithdrawPeriodTimestamps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"}],"name":"migrate","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrateLpToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract IMigratorChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mockLpTokenFactory","outputs":[{"internalType":"contract IMockLpTokenFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"oldControllers","outputs":[{"internalType":"contract IFateRewardController","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingLockedFate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingUnlockedFate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTimestamp","type":"uint256"},{"internalType":"uint256","name":"accumulatedFatePerShare","type":"uint256"},{"internalType":"uint256","name":"accumulatedLockedFatePerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardSchedule","outputs":[{"internalType":"contract IRewardScheduleV3","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_allowEmergencyWithdrawal","type":"bool"}],"name":"setAllowEmergencyWithdrawal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"bool[]","name":"status","type":"bool[]"}],"name":"setExcludedAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_fateFeeTo","type":"address"}],"name":"setFateFeeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_lpWithdrawPeriodTimestamps","type":"uint256[]"},{"internalType":"uint256[]","name":"_lpWithdrawFeePercent","type":"uint256[]"}],"name":"setLPWithdrawData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_lockedRewardsPeriodTimestamps","type":"uint256[]"},{"internalType":"uint256[]","name":"_lockedRewardsFeePercents","type":"uint256[]"}],"name":"setLockedRewardsData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_pids","type":"uint256[]"},{"internalType":"uint256[]","name":"_allocPoints","type":"uint256[]"}],"name":"setMany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[][]","name":"_pidsAndAllocPoints","type":"uint256[][]"}],"name":"setManyWith2dArray","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMigratorChef","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IRewardScheduleV3","name":"_rewardSchedule","type":"address"}],"name":"setRewardSchedule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startTimestamp","type":"uint256"}],"name":"setStartTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vault","type":"address"}],"name":"setVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"trackedPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userLockedRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userMembershipInfo","outputs":[{"internalType":"uint256","name":"firstDepositTimestamp","type":"uint256"},{"internalType":"uint256","name":"lastWithdrawTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"userPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const FATE_X_FATE_ABI = [{"inputs":[{"internalType":"contract FateToken","name":"_fate","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint96","name":"votes","type":"uint96"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"enter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fate","outputs":[{"internalType":"contract FateToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"leave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

const FATE_TOKEN_ADDRESS = "0x4853365bC81f8270D902076892e13F27c27e7266";
const FATE_REWARD_CONTROLLER_ADDRESS = "0x7a8B2780189fa8758bf212321DabDbd3856D1155";
const X_FATE_ADDRESS = "0x56BE76031A4614370fA1f188e01e18a1CF16E642";
const REWARD_TOKEN_TICKER = "FATE";
const X_FATE_NAME = "xFATE";

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
    _print("Note, there are withdrawal fees when unstaking LP tokens.\n");

    const tokens = {};
    const basePrices = await getMaticPrices();

    const { prices, totalUserStaked, totalStaked, averageApr } = await loadFateRewardControllerContract(
        App,
        tokens,
        basePrices,
        FATE_REWARD_CONTROLLER_ADDRESS,
        FATE_REWARD_CONTROLLER_ABI,
        REWARD_TOKEN_TICKER,
        FATE_TOKEN_ADDRESS,
        "getNewRewardPerSecond",
        null,
        "pendingUnlockedFate",
        [0, 1],
        true
    );

    const FATE = new ethers.Contract(FATE_TOKEN_ADDRESS, ERC20_ABI, App.provider.getSigner());
    const X_FATE = new ethers.Contract(X_FATE_ADDRESS, FATE_X_FATE_ABI, App.provider.getSigner());
    const xFateData = await getXFateData(FATE, X_FATE, App, prices);

    const totalStakedInclXFate = totalStaked + xFateData.totalBalanceUSD

    _print_bold(`Total Staked: $${formatMoney(totalStakedInclXFate)}`);
    if (totalUserStaked > 0) {
        _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}% in LP staking pools.`);
        _print(`Estimated earnings:`
            + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
            + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
            + ` Year $${formatMoney(totalUserStaked*averageApr)}`);
    }

    if (xFateData.userBalanceUSD > 0) {
        _print(`You are staking a total of $${formatMoney(xFateData.userBalanceUSD)} in the ${X_FATE_NAME} single staking pool.`);
    }

    hideLoading();
}

async function loadFateRewardControllerContract(
    App,
    tokens,
    prices,
    rewardControllerAddress,
    rewardControllerAbi,
    fateTicker,
    fateTokenAddress,
    rewardsPerSecondFunctionName,
    rewardsPerWeekOrNull,
    pendingRewardsFunctionName,
    deathPoolIndices,
    hideFooter
) {
    const rewardControllerContract = new ethers.Contract(rewardControllerAddress, rewardControllerAbi, App.provider);

    const poolCount = parseInt(await rewardControllerContract.poolLength(), 10);
    const totalAllocPoints = await rewardControllerContract.totalAllocPoint();

    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    const startTimestamp = await rewardControllerContract.startTimestamp()
    const currentTimestamp = window.ethers.BigNumber.from(Math.floor(new Date().getTime() / 1000))
    const SECONDS_PER_WEEK = window.ethers.BigNumber.from('604800')
    const index = parseInt((currentTimestamp.sub(startTimestamp)).div(SECONDS_PER_WEEK).toString())
    const EPOCH_0 = 52

    let multiplier;
    if (index < EPOCH_0) {
        multiplier = 125
    } else {
        // default to the last known epoch's data
        multiplier = 125
    }

    let divisor;
    if (index < EPOCH_0) {
        divisor = 10
    } else {
        // default to the last known epoch's data
        divisor = 10
    }

    const rewardsPerWeek = rewardsPerWeekOrNull ??
        await rewardControllerContract.callStatic[rewardsPerSecondFunctionName](0) / 1e18 * SECONDS_PER_WEEK.toNumber() * multiplier / divisor

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
        const poolInfo = await getMaticPoolInfo(App, rewardControllerContract, rewardControllerContract.address, x, pendingRewardsFunctionName);
        const feePercent = await rewardControllerContract.getLPWithdrawFeePercent(x, App.YOUR_ADDRESS);
        return {
            ...poolInfo,
            withdrawFee: parseInt(feePercent) / 10000,
        }
    }));

    const tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getMaticToken(App, address, rewardControllerContract.address);
    }));

    if (deathPoolIndices) {
        // load prices for the deathPool assets
        deathPoolIndices.map(i => poolInfos[i])
            .map(poolInfo =>
                poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);

    _print("Finished reading smart contracts.\n");

    const aprs = []
    for (i = 0; i < poolCount; i++) {
        if (poolPrices[i]) {
            const apr = printFateRewardControllerPool(
                App,
                rewardControllerAbi,
                rewardControllerContract.address,
                prices,
                tokens,
                poolInfos[i],
                i,
                poolPrices[i],
                totalAllocPoints,
                rewardsPerWeek,
                fateTicker,
                fateTokenAddress,
                pendingRewardsFunctionName,
                null,
                null,
                "matic",
                0,
                Math.round(poolInfos[i].withdrawFee * 10000) / 100,
            )
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

    if (!hideFooter) {
        _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
        if (totalUserStaked > 0) {
            _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
            _print(`Estimated earnings:`
                + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
                + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
                + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
        }
    }

    return { prices, totalUserStaked, totalStaked, averageApr }
}


function printFateRewardControllerPool(
    App,
    chefAbi,
    chefAddr,
    prices,
    tokens,
    poolInfo,
    poolIndex,
    poolPrices,
    totalAllocPoints,
    rewardsPerWeek,
    rewardTokenTicker,
    rewardTokenAddress,
    pendingRewardsFunction,
    fixedDecimals,
    claimFunction,
    chain= "matic",
    depositFee= 0,
    withdrawFee= 0
) {
    fixedDecimals = fixedDecimals ?? 2;
    const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
    var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
    if (poolRewardsPerWeek === 0 && rewardsPerWeek !== 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    _print_inline(`${poolIndex} - `);
    poolPrices.print_price(chain);
    sp?.print_price(chain);
    const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
        staked_tvl, userStaked, poolPrices.price, fixedDecimals);
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printFatexChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
        rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
        poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
    return apr;
}

function printFatexChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
                                     rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
                                     claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
    fixedDecimals = fixedDecimals ?? 2;
    const approveAndStake = async function() {
        return fateRewardContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
    }
    const unstake = async function() {
        return fateRewardContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
    }
    const claim = async function() {
        return fateRewardContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
    }
    if (depositFee > 0){
        _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
    } else{
        _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
    }
    if (withdrawFee > 0){
        _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
    } else{
        _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
    }
    _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
    _print(`Staking or unstaking also claims rewards.`)
    _print("");
}

const fateRewardContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
    const signer = App.provider.getSigner()

    const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

    let allow = Promise.resolve()

    if (allowedTokens / 1e18 < currentTokens / 1e18) {
        showLoading()
        allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
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
                CHEF_CONTRACT.deposit(poolIndex, currentTokens, {gasLimit: 500000})
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

const fateRewardContract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
    const signer = App.provider.getSigner()
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

    const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
    const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

    if (earnedTokenAmount > 0) {
        showLoading()
        CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, {gasLimit: 500000})
            .then(function(t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function() {
                hideLoading()
            })
    }
}

const fateRewardContract_claim = async function(chefAbi, chefAddress, poolIndex, App,
                                           pendingRewardsFunction, claimFunction) {
    const signer = App.provider.getSigner()

    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

    const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

    if (earnedTokenAmount > 0) {
        CHEF_CONTRACT.claimReward(poolIndex, {gasLimit: 500000})
            .then(function(t) {
                return App.provider.waitForTransaction(t.hash)
            })
            .catch(function() {
                hideLoading()
            })
    }
}

async function getXFateData(FATE, X_FATE, App, prices) {
    const xFateTotalBalance = await FATE.balanceOf(X_FATE_ADDRESS) / 1e18;
    const xFateTotalSupply = await X_FATE.totalSupply() / 1e18;
    const xFateRatio = xFateTotalBalance / xFateTotalSupply;

    const xFateUserBalanceBigNum = await X_FATE.balanceOf(App.YOUR_ADDRESS);
    const xFateUserBalance = (xFateUserBalanceBigNum / 1e18) * xFateRatio;
    const xFateShare = xFateUserBalance / xFateTotalBalance;
    const fateBalanceBigNum = await FATE.balanceOf(App.YOUR_ADDRESS);
    const fateBalance = fateBalanceBigNum / 1e18;

    const fatePrice = prices[FATE_TOKEN_ADDRESS];

    let xFateTotalBalanceUSD;
    let xFateUserBalanceUSD;

    if (fatePrice && fatePrice.usd) {
        xFateTotalBalanceUSD = xFateTotalBalance * fatePrice.usd;
        xFateUserBalanceUSD = xFateUserBalance * fatePrice.usd;

        _print(`${X_FATE_NAME} TVL: $${formatMoney(xFateTotalBalanceUSD)}`);
        _print(`${REWARD_TOKEN_TICKER} Price: $${formatMoney(fatePrice.usd, 5)}`);
        _print(`Staked: ${(xFateTotalBalance).toFixed(2)} ${REWARD_TOKEN_TICKER} ($${formatMoney(xFateTotalBalanceUSD)})`);
        _print(`You are staking ${(xFateUserBalance).toFixed(2)} ${REWARD_TOKEN_TICKER} ($${formatMoney(xFateUserBalanceUSD)}), ${(xFateShare * 100).toFixed(2)}% of the pool.`);

        const approveAndEnter = async function() {
            return xFateApproveAndEnter(FATE, X_FATE, fateBalanceBigNum, App);
        }

        const leave = async function() {
            return xFateLeave(X_FATE, xFateUserBalanceBigNum, App);
        }

        _print_link(`Stake ${(fateBalance).toFixed(2)} ${REWARD_TOKEN_TICKER}`, approveAndEnter);

        if (xFateUserBalance > 0) {
            _print_link(`Unstake ${xFateUserBalance.toFixed(2)} ${REWARD_TOKEN_TICKER}`, leave);
        }

        _print(`${X_FATE_NAME} rewards are visible after unstaking / exiting the pool.`)
        _print('');
    }

    hideLoading()

    return {
        totalBalance: xFateTotalBalance,
        totalBalanceUSD: xFateTotalBalanceUSD,
        userBalance: xFateUserBalance,
        userBalanceUSD: xFateUserBalanceUSD
    }
}

async function xFateApproveAndEnter(FATE, X_FATE, currentTokens, App) {
    const allowedTokens = await FATE.allowance(App.YOUR_ADDRESS, X_FATE_ADDRESS)
    let allow = Promise.resolve()

    if (allowedTokens / 1e18 < currentTokens / 1e18) {
        showLoading()
        allow = FATE.approve(X_FATE_ADDRESS, ethers.constants.MaxUint256)
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
                X_FATE.enter(currentTokens, {gasLimit: 500000})
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

async function xFateLeave(X_FATE, currentStakedAmount, App) {
    showLoading()
    X_FATE.leave(currentStakedAmount, {gasLimit: 500000})
        .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
            })
        })
        .catch(function() {
            hideLoading()
        })
}
