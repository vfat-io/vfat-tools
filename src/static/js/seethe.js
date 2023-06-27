$(function() {
consoleInit(main)
  });

  const SEETHE_STAKING_ABI = [{"inputs":[{"internalType":"uint256","name":"initialTokens","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"}],"name":"LpFreeze","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"}],"name":"LpUnfreeze","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TokenBurn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TokenStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TokenUnstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"BurnSeethe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ClaimStakeInterest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"uint256","name":"_lpIndex","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"FreezeLP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lpIndex","type":"uint256"}],"name":"HarvestSeethe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"NewHalvening","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"RollStakeInterest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"StakeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lpIndex","type":"uint256"}],"name":"UnfreezeLP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"UnstakeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnAdjust","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cakeSEETHEETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_lpIndex","type":"uint256"}],"name":"calcHarvestRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"calcStakingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"distributeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"donate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"farmer","outputs":[{"internalType":"uint256","name":"stakedBalance","type":"uint256"},{"internalType":"uint256","name":"stakeStartTimestamp","type":"uint256"},{"internalType":"uint256","name":"totalStakingInterest","type":"uint256"},{"internalType":"uint256","name":"totalFarmedSeethe","type":"uint256"},{"internalType":"uint256","name":"totalBurnt","type":"uint256"},{"internalType":"uint256","name":"totalReferralBonus","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"bool","name":"activeUser","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"globalApy","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"halvening","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"halveningDays","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"halveningTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_lpIndex","type":"uint256"}],"name":"isHarvestable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isLocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isPoolActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"isStakeFinished","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lpApy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpAddress","type":"address"}],"name":"lpBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpFreezeStartTimes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"lpFrozenBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_lpIndex","type":"uint256"}],"name":"minsPastFreezeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"minsPastStakeTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"seetheBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_apy","type":"uint32"},{"internalType":"address","name":"_lpAddress","type":"address"}],"name":"setApy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_v","type":"uint256"}],"name":"setBurnAdjust","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setForeverLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_apy","type":"uint32"}],"name":"setGlobalApy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpAddress","type":"address"},{"internalType":"bool","name":"_active","type":"bool"}],"name":"setPoolActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpAddress","type":"address"}],"name":"setSEETHEETHpool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingApyDecrease","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingApyLimiter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lpIndex","type":"uint256"}],"name":"totalFrozenLpBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalLpFrozen","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

  async function main() {

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    const stakingAddress = "0xc451595446b770a029c9663b9a4297fa3a1f299c";

    var tokens = {};
    var prices = {};

    let p = await loadSeethePoolInfo(App, tokens, prices, SEETHE_STAKING_ABI, stakingAddress);
    _print_bold(`Total staked: $${formatMoney(p.totalStaked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)}\n`);
  }

  hideLoading();
}

async function loadSeethePoolInfo(App, tokens, prices, stakingAbi, stakingAddress) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    let stakeTokenAddresses = [], totalStaked_tvl = 0, totalUserStaked = 0;
    for(let i = 0; i < 3; i++){
      const stakeTokenAddress = await STAKING_POOL.lpAddresses(i)
      stakeTokenAddresses.push(stakeTokenAddress);
    }

    //const balance = "???"
    const balance = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS);

    const rewardTokenAddress = "0xc451595446b770a029c9663b9a4297fa3a1f299c";

    for(let i = 0; i < stakeTokenAddresses.length; i++){

      const stakeToken = await getToken(App, stakeTokenAddresses[i], stakingAddress);

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
          tokens[address] = await getToken(App, address, stakingAddress);
      }
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
      }
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

      const rewardTokenTicker = rewardToken.symbol;

      const poolPrices = getPoolPrices(tokens, prices, stakeToken);
  
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  
      const staked_tvl = poolPrices.staked_tvl;
      totalStaked_tvl += staked_tvl;
  
      const userStaked = balance / 10 ** stakeToken.decimals;

      const farmer = await STAKING_POOL.farmer(App.YOUR_ADDRESS);

      const earned_ = farmer.activeUser ? await STAKING_POOL.calcHarvestRewards(App.YOUR_ADDRESS, i) : 0;
  
      const earned = earned_ / 10 ** rewardToken.decimals;
  
      const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
      const stakeTokenPrice =
          prices[stakeTokenAddresses[i]]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddresses[i])?.usd;

      poolPrices.print_price("eth", 4, null);
      const userStakedUsd = userStaked * stakeTokenPrice;
      const userStakedPct = userStakedUsd / staked_tvl * 100;

      totalUserStaked += userStakedUsd;

      // _print(`You are staking ${userStaked.toFixed(6)} ${stakeTokenTicker} ` +
      //    `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
      _print(`Claim ${earned.toFixed(6)} ${rewardTokenTicker} ($${formatMoney(earned*rewardTokenPrice)})`)
      _print(`<a target="_blank" href="https://etherscan.io/address/${stakingAddress}#code">Etherscan</a>`);
      _print("");

    }

    return {
      totalStaked_tvl,
      totalUserStaked
  }
}