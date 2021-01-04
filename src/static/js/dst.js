$(function() {
    consoleInit();
    start(main);
});
  
async function loadPool(App, tokens, prices, stakingAbi, stakingAddress, 
        rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
    
    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();
    
    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);
  
    if (stakeTokenAddress.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }
  
    var newPriceAddresses = stakeToken.tokens.filter(x => 
        !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        if (newPrices[key])
            prices[key] = newPrices[key];
    }
    if (stakeTokenFunction == "SUSD") {
        prices[stakeTokenAddress] = { usd : 1 }; //...
    }
    var newTokenAddresses = stakeToken.tokens.filter(x => 
        !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  
    const rewardTokenTicker = rewardToken.symbol;
    
    const poolPrices = getPoolPrices(tokens, prices, stakeToken);
  
    const stakingTokenTicker = poolPrices.stakingTokenTicker;
  
    const stakeTokenPrice = 
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd; 
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  
    // Find out reward rate
    const weeklyRewards = await get_synth_weekly_rewards(STAKING_POOL);
  
    const usdPerWeek = weeklyRewards * rewardTokenPrice;
  
    const staked_tvl = poolPrices.staked_tvl;
    
    const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;
  
    const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
  
    poolPrices.print_price();
    _print(`${rewardTokenTicker} Per Week: ${weeklyRewards.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
    const weeklyAPY = usdPerWeek / staked_tvl * 100;
    const dailyAPY = weeklyAPY / 7;
    const yearlyAPY = weeklyAPY * 52;
    _print(`APY: Day ${dailyAPY.toFixed(2)}% Week ${weeklyAPY.toFixed(2)}% Year ${yearlyAPY.toFixed(2)}%`);
    const userStakedUsd = userStaked * stakeTokenPrice;
    const userStakedPct = userStakedUsd / staked_tvl * 100;
    _print(`You are staking ${userStaked.toFixed(6)} ${stakingTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (userStaked > 0) {
        poolPrices.print_contained_price(userStaked);
        const userWeeklyRewards = userStakedPct * weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
    }
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(stakeTokenAddress, stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(stakingAddress, App)
    }
    const claim = async function() {
      return rewardsContract_claim(stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(stakeTokenAddress, stakingAddress, App)
    }
    _print_link(`Stake ${stakeToken.unstaked.toFixed(6)} ${stakingTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(6)} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker}`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print(`\n`);
}

async function loadBoardroom(App, prices) {
    const BOARDROOM_ADDRESS = "0x4c8C0F47CA9A1888539Bbb59DdeF8550F329f866";
    const DAI_DST_ADDRESS = "0x706b21bf60adb79d2326d39086e4c27766193185"
    const REWARD_TOKEN_ADDRESS = "0xfa9c3dc54baa9eefbe9453b1f3b3b93ad2af0a77";
    const BOARDROOM = new ethers.Contract(BOARDROOM_ADDRESS, DYNAMIC_BOARDROOM_ABI, App.provider);
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
    _print(`There is a total ${totalStaked.toFixed(2)} DSTR ($${formatMoney(totalStakedUsd)}) staked in the Boardroom.`)
    _print(`You are staking ${userStaked} DSTR ($${formatMoney(userStakedUsd)}), ${userPct.toFixed(2)}% of the pool.`);

    const resp = await fetch('https://api.vfat.tools/twap/' + DAI_DST_ADDRESS);
    const text = await resp.text();
    const array = text.split("\n");
    if (array.length > 0 && array[0][0] != '<') {
        const [, oldPrice1, oldTimestamp] = array[array.length - 2].split(' ') //last line is blank
        const [, price1 , timestamp] = await getCurrentPriceAndTimestamp(App, DAI_DST_ADDRESS);
        const twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, 0);
        _print(`TWAP: ${twap}`);
        if (twap > 1.05) {
            const REWARD_TOKEN = new ethers.Contract(REWARD_TOKEN_ADDRESS, ERC20_ABI, App.provider);
            const totalSupply = await REWARD_TOKEN.totalSupply() / 1e18;
            const newTokens = totalSupply *  Math.min(twap - 1, 0.1);
            _print(`The following figures are approximate as they are not using the official TWAP.`);
            _print(`There will be ${newTokens.toFixed(2)} ONC issued at next expansion.`);
            const rewardPrice = getParameterCaseInsensitive(prices, REWARD_TOKEN_ADDRESS).usd;
            const boardReturn = newTokens * rewardPrice / totalStakedUsd * 100 * 3; //3 times a day
            _print(`Boardroom APR: Day ${(boardReturn).toFixed(2)}% Week ${(boardReturn * 7).toFixed(2)}% Year ${(boardReturn * 365).toFixed(2)}%`)
        }
    }
        
    const approveTENDAndStake = async () => rewardsContract_stake(share, BOARDROOM_ADDRESS, App);
    const unstake = async () => rewardsContract_unstake(BOARDROOM_ADDRESS, App);
    const claim = async () => boardroom_claim(BOARDROOM_ADDRESS, App);
    const exit = async () =>  rewardsContract_exit(BOARDROOM_ADDRESS, App);
    const revoke = async () => rewardsContract_resetApprove(share, BOARDROOM_ADDRESS, App);

    _print_link(`Stake ${userUnstaked.toFixed(2)} DSTR`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(2)} DSTR`, unstake)
    _print_link(`Claim ${earned.toFixed(2)} DST`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print(`\n`);
}
/*
Dynamic Supply Token (DST): 0xfa9C3dC54baA9eefBe9453B1f3B3B93aD2AF0A77
Dynamic Supply Tracker (DSTR): 0x55696EfC7c9779d868Ac34aC6b4a4C5FeD61aC12
Dynamic Supply Note (DSN): 0xc03a5f41a22e970686f980e6669c6a882e20c262
DST-DAI LP Farm: 0x030cF06D8A39d5Ef4b169EAc0D4D5B0c51b42194
DSTR-DAI LP Farm: 0xCdB0c60EA5bF50641A570E25875EAB6c889E949d
Boardroom: 0x4c8C0F47CA9A1888539Bbb59DdeF8550F329f866
Seignoriage Oracle (6h): 0x3a9A1CEC3546b4FB810756Cd3aD072a3d6345A8a
Note Oracle (30m): 0xa709A321b7684A4dBB9B0023f2e50Bc37A258f02
*/

async function main() {

    const CONTRACTS = [      
        { address: "0xCdB0c60EA5bF50641A570E25875EAB6c889E949d", abi : DYNAMIC_FARM_ABI, rewardToken: "dynamicTracker", stakeToken: "lpt"},
        { address: "0x030cF06D8A39d5Ef4b169EAc0D4D5B0c51b42194", abi : DYNAMIC_FARM_ABI, rewardToken: "dynamicTracker", stakeToken: "lpt"}
    ];
  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");
  
    var tokens = {};
    var prices = {};
  
    for (const c of CONTRACTS) {
        try {
            await loadPool(App, tokens, prices, c.abi, c.address, c.rewardToken, c.stakeToken);
        }
        catch (ex) {
            console.error(ex);
        }
    }

    await loadBoardroom(App, prices);
  
    hideLoading();
  }