$(function() {
    consoleInit();
    start(main);
});

const BSG_ORACLE_ABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_tokenA","type":"address"},{"internalType":"address","name":"_tokenB","type":"address"},{"internalType":"uint256","name":"_period","type":"uint256"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"contract ILinkOracle","name":"_linkOracle","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOperator","type":"address"},{"indexed":true,"internalType":"address","name":"newOperator","type":"address"}],"name":"OperatorTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"price0CumulativeLast","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price1CumulativeLast","type":"uint256"}],"name":"Updated","type":"event"},{"inputs":[],"name":"blockTimestampLast","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"goldPriceOne","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOperator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"linkOracle","outputs":[{"internalType":"contract ILinkOracle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextEpochPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pair","outputs":[{"internalType":"contract IUniswapV2Pair","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"factory","type":"address"},{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"pairFor","outputs":[{"internalType":"address","name":"lpt","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price0Current","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price0Last","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1Current","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1Last","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceData","outputs":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint256","name":"price0CumulativeLast","type":"uint256"},{"internalType":"uint256","name":"price1CumulativeLast","type":"uint256"},{"internalType":"uint32","name":"blockTimestampLast","type":"uint32"},{"internalType":"uint256","name":"price0Average","type":"uint256"},{"internalType":"uint256","name":"price1Average","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_period","type":"uint256"}],"name":"setPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOperator_","type":"address"}],"name":"transferOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"}];


//ratio is used for multi-boardroom setups
async function loadBoardroom_(App, prices, boardroomAddress, oracleAddress, lptAddress, rewardTokenAddress, stakeTicker, rewardTicker,
        epochsPerDay, maxSupplyIncrease, decimals, ratio, targetMantissa) {
    const BOARDROOM = new ethers.Contract(boardroomAddress, BOARDROOM_ABI, App.provider);
    const ORACLE = new ethers.Contract(oracleAddress, BSG_ORACLE_ABI, App.provider);
    const share = await BOARDROOM.share();
    const SHARE = new ethers.Contract(share, ERC20_ABI, App.provider);
    const userUnstaked = await SHARE.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const sharePrice = getParameterCaseInsensitive(prices, share)?.usd;
    const userStaked = await BOARDROOM.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const userStakedUsd = userStaked * sharePrice;
    const totalStaked = await BOARDROOM.totalSupply() / 1e18;
    const totalStakedUsd = totalStaked * sharePrice;
    const userPct = userStaked / totalStaked * 100;
    const earned = await BOARDROOM.earned(App.YOUR_ADDRESS) / 1e18;
    _print(`Boardroom`);
    _print(`There is a total ${totalStaked.toFixed(2)} ${stakeTicker} ($${formatMoney(totalStakedUsd)}) staked in the Boardroom.`)
    _print(`You are staking ${userStaked} ${stakeTicker} ($${formatMoney(userStakedUsd)}), ${userPct.toFixed(2)}% of the pool.`);

    const oldTimestamp = await ORACLE.blockTimestampLast();
    const pair = await ORACLE.pair();
    const LPT = new ethers.Contract(pair, UNI_ABI, App.provider);
    const token0 = await LPT.token0();
    const token1 = await LPT.token1();
    let twap;
    if (token0.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        const oldPrice0 = await ORACLE.price0CumulativeLast();
        const [price0, , timestamp] = await getCurrentPriceAndTimestamp(App, lptAddress);
        twap = await calculateTwap(oldPrice0, oldTimestamp, price0, timestamp, targetMantissa);
    } 
    else if (token1.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        const oldPrice1 = await ORACLE.price1CumulativeLast();
        const [, price1, timestamp] = await getCurrentPriceAndTimestamp(App, lptAddress);
        twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, targetMantissa);
    }
    //if (twap > 1) {
    if (false) {
        const REWARD_TOKEN = new ethers.Contract(rewardTokenAddress, ERC20_ABI, App.provider);
        const totalSupply = await REWARD_TOKEN.totalSupply() / (10 ** await REWARD_TOKEN.decimals());
        const newTokens = totalSupply *  Math.min(twap - 1, maxSupplyIncrease)  * ratio;
        _print(`There will be ${newTokens.toFixed(decimals)} ${rewardTicker} issued at next expansion.`);
        const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress).usd;
        const boardReturn = newTokens * rewardPrice / totalStakedUsd * 100 * epochsPerDay;
        _print(`Boardroom APR: Day ${(boardReturn).toFixed(2)}% Week ${(boardReturn * 7).toFixed(2)}% Year ${(boardReturn * 365).toFixed(2)}%`)
    }

    const approveTENDAndStake = async () => rewardsContract_stake(share, boardroomAddress, App);
    const unstake = async () => rewardsContract_unstake(boardroomAddress, App);
    const claim = async () => boardroom_claim(boardroomAddress, App);
    const exit = async () =>  rewardsContract_exit(boardroomAddress, App);
    const revoke = async () => rewardsContract_resetApprove(share, boardroomAddress, App);

    _print_link(`Stake ${userUnstaked.toFixed(decimals)} ${stakeTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(decimals)} ${stakeTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(decimals)} ${rewardTicker}`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print(`\n`);

    return { staked_tvl : totalStakedUsd };
}

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};
    var totalStaked = 0;
    const data = Basis.BSG;

    let p1 = await loadSynthetixPool(App, tokens, prices, data.PoolABI, 
        data.SharePool.address, data.SharePool.rewardToken, data.SharePool.stakeToken);
    totalStaked += p1.staked_tvl;

    let p2 = await loadSynthetixPool(App, tokens, prices, data.PoolABI, 
        data.CashPool.address, data.CashPool.rewardToken, data.CashPool.stakeToken);
    totalStaked += p2.staked_tvl;

    let br = await loadBoardroom_(App, prices, data.Boardroom, data.Oracle, data.UniswapLP, data.Cash,
        data.ShareTicker, data.CashTicker, data.ExpansionsPerDay, data.MaximumExpansion, 
        data.Decimals, 1, data.TargetMantissa);
    totalStaked += br.staked_tvl;

    _print_bold(`Total staked: $${formatMoney(totalStaked)}`)

    hideLoading();
  }