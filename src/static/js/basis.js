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
  
    const userUnstaked = stakeToken.unstaked;
  
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
    const allowance = 
        stakeTokenFunction == "lpt" ? userUnstaked : Math.min(20000 - userStaked, userUnstaked);
    const maxAllowance = 
        stakeTokenFunction == "lpt" ? null : ethers.BigNumber.from(20000).pow(stakeToken.decimals);
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(stakeTokenAddress, stakingAddress, App, maxAllowance)
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
    _print_link(`Stake ${allowance.toFixed(6)} ${stakingTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(6)} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker}`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print(`\n`);
}

async function loadBoardroom(App, tokens, prices) {
    const BOARDROOM_ADDRESS = "0x4B182469337d46E6603ed7e26BA60c56930a342c";
    //const ORACLE_ADDRESS = "0x8a573cb5234657c8bf054da2ebe63b66fb1f9502";
    const REWARD_TOKEN_ADDRESS = "0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a";
    const BAC_DAI_ADDRESS = "0xd4405F0704621DBe9d4dEA60E128E0C3b26bddbD"
    const BOARDROOM = new ethers.Contract(BOARDROOM_ADDRESS, BOARDROOM_ABI, App.provider);
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
    _print(`There is a total ${totalStaked.toFixed(2)} BAS ($${formatMoney(totalStakedUsd)}) staked in the Boardroom.`)
    _print(`You are staking ${userStaked} BAS ($${formatMoney(userStakedUsd)}), ${userPct.toFixed(2)}% of the pool.`);

    const resp = await fetch('https://api.vfat.tools/twap/' + BAC_DAI_ADDRESS);
    const text = await resp.text();
    const array = text.split("\n");
    if (array.length > 0 && array[0][0] != '<') {
        const [oldPrice0, , oldTimestamp] = array[array.length - 2].split(' ') //last line is blank
        const [price0, , timestamp] = await getCurrentPriceAndTimestamp(App, BAC_DAI_ADDRESS);
        const twap = await calculateTwap(oldPrice0, oldTimestamp, price0, timestamp, 0);
        _print(`TWAP: ${twap}`);
        if (twap > 1.05) {
            const REWARD_TOKEN = new ethers.Contract(REWARD_TOKEN_ADDRESS, ERC20_ABI, App.provider);
            const totalSupply = await REWARD_TOKEN.totalSupply() / 1e18;
            const newTokens = totalSupply * (twap - 1);
            _print(`The following figures are approximate as they are not using the official TWAP.`);
            _print(`There will be ${newTokens.toFixed(2)} BAC issued at next expansion.`);
            const rewardPrice = getParameterCaseInsensitive(prices, REWARD_TOKEN_ADDRESS).usd;
            const boardReturn = newTokens * rewardPrice / totalStakedUsd * 100; 
            _print(`Boardroom APR: Day ${(boardReturn).toFixed(2)}% Week ${(boardReturn * 7).toFixed(2)}% Year ${(boardReturn * 365).toFixed(2)}%`)
        }
    }
    const approveTENDAndStake = async () => rewardsContract_stake(share, BOARDROOM_ADDRESS, App);
    const unstake = async () => rewardsContract_unstake(BOARDROOM_ADDRESS, App);
    const claim = async () => rewardsContract_claim(BOARDROOM_ADDRESS, App);
    const exit = async () =>  rewardsContract_exit(BOARDROOM_ADDRESS, App);
    const revoke = async () => rewardsContract_resetApprove(share, BOARDROOM_ADDRESS, App);

    _print_link(`Stake ${userUnstaked.toFixed(2)} BAS`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(2)} BAS`, unstake)
    _print_link(`Claim ${earned.toFixed(2)} BAC`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print(`\n`);
}

async function main() {

    const CONTRACTS = [      
        { address: "0x9569d4CD7AC5B010DA5697E952EFB1EC0Efb0D0a", abi : BASIS_DAIBAC_ABI, rewardToken: "basisShare", stakeToken: "lpt"},
        { address: "0x067d4D3CE63450E74F880F86b5b52ea3edF9Db0f", abi : BASIS_DAIBAC_ABI, rewardToken: "basisShare", stakeToken: "lpt"},
        //{ address: "0xEBd12620E29Dc6c452dB7B96E1F190F3Ee02BDE8", abi : BASIS_DAI_ABI, rewardToken: "basisCash", stakeToken: "dai"},
        //{ address: "0xDc42a21e38C3b8028b01A6B00D8dBC648f93305C", abi : BASIS_SUSD_ABI, rewardToken: "basisCash", stakeToken: "SUSD"},
        //{ address: "0x51882184b7F9BEEd6Db9c617846140DA1d429fD4", abi : BASIS_USDC_ABI, rewardToken: "basisCash", stakeToken: "usdc"},
        //{ address: "0x2833bdc5B31269D356BDf92d0fD8f3674E877E44", abi : BASIS_USDT_ABI, rewardToken: "basisCash", stakeToken: "usdt"},
        //{ address: "0xC462d8ee54953E7d7bF276612b75387Ea114c3bf", abi : BASIS_YCRV_ABI, rewardToken: "basisCash", stakeToken: "ycrv"}
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

    await loadBoardroom(App, tokens, prices);
  
    hideLoading();
  }