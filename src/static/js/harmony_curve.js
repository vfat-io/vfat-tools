
$(function() {
consoleInit(main)
  });

const CURVE_STAKING_ABI = [{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_owner","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"add_reward","inputs":[{"name":"_token","type":"address"},{"name":"_distributor","type":"address"},{"name":"_duration","type":"uint256"}],"outputs":[],"gas":147850},{"stateMutability":"nonpayable","type":"function","name":"remove_reward","inputs":[{"name":"_token","type":"address"}],"outputs":[],"gas":898282},{"stateMutability":"nonpayable","type":"function","name":"set_receiver","inputs":[{"name":"_receiver","type":"address"}],"outputs":[],"gas":37605},{"stateMutability":"nonpayable","type":"function","name":"get_reward","inputs":[],"outputs":[],"gas":496490},{"stateMutability":"nonpayable","type":"function","name":"notify_reward_amount","inputs":[{"name":"_token","type":"address"}],"outputs":[],"gas":1502780},{"stateMutability":"nonpayable","type":"function","name":"set_reward_duration","inputs":[{"name":"_token","type":"address"},{"name":"_duration","type":"uint256"}],"outputs":[],"gas":40303},{"stateMutability":"nonpayable","type":"function","name":"set_reward_distributor","inputs":[{"name":"_token","type":"address"},{"name":"_distributor","type":"address"}],"outputs":[],"gas":38012},{"stateMutability":"nonpayable","type":"function","name":"commit_transfer_ownership","inputs":[{"name":"_owner","type":"address"}],"outputs":[],"gas":37755},{"stateMutability":"nonpayable","type":"function","name":"accept_transfer_ownership","inputs":[],"outputs":[],"gas":37700},{"stateMutability":"view","type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2658},{"stateMutability":"view","type":"function","name":"future_owner","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2688},{"stateMutability":"view","type":"function","name":"reward_receiver","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2718},{"stateMutability":"view","type":"function","name":"reward_tokens","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":2857},{"stateMutability":"view","type":"function","name":"reward_count","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2778},{"stateMutability":"view","type":"function","name":"reward_data","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"distributor","type":"address"},{"name":"period_finish","type":"uint256"},{"name":"rate","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"received","type":"uint256"},{"name":"paid","type":"uint256"}],"gas":14685},{"stateMutability":"view","type":"function","name":"last_update_time","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2838}]
const REWARD_RECEIVER_ABI = [{"name":"Deposit","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Withdraw","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"CommitOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"ApplyOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"Transfer","inputs":[{"name":"_from","type":"address","indexed":true},{"name":"_to","type":"address","indexed":true},{"name":"_value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"name":"_owner","type":"address","indexed":true},{"name":"_spender","type":"address","indexed":true},{"name":"_value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_admin","type":"address"},{"name":"_lp_token","type":"address"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":288},{"stateMutability":"view","type":"function","name":"reward_contract","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2628},{"stateMutability":"view","type":"function","name":"last_claim","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2454},{"stateMutability":"view","type":"function","name":"claimed_reward","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":2976},{"stateMutability":"view","type":"function","name":"claimable_reward","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":2944},{"stateMutability":"nonpayable","type":"function","name":"claimable_reward_write","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":2067617},{"stateMutability":"nonpayable","type":"function","name":"set_rewards_receiver","inputs":[{"name":"_receiver","type":"address"}],"outputs":[],"gas":35643},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[{"name":"_addr","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[{"name":"_addr","type":"address"},{"name":"_receiver","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"},{"name":"_addr","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"},{"name":"_addr","type":"address"},{"name":"_claim_rewards","type":"bool"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"_value","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"_value","type":"uint256"},{"name":"_claim_rewards","type":"bool"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"transfer","inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":8092597},{"stateMutability":"nonpayable","type":"function","name":"transferFrom","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":8130547},{"stateMutability":"nonpayable","type":"function","name":"approve","inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":38091},{"stateMutability":"nonpayable","type":"function","name":"increaseAllowance","inputs":[{"name":"_spender","type":"address"},{"name":"_added_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":40635},{"stateMutability":"nonpayable","type":"function","name":"decreaseAllowance","inputs":[{"name":"_spender","type":"address"},{"name":"_subtracted_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":40659},{"stateMutability":"nonpayable","type":"function","name":"set_rewards","inputs":[{"name":"_reward_contract","type":"address"},{"name":"_claim_sig","type":"bytes32"},{"name":"_reward_tokens","type":"address[8]"}],"outputs":[],"gas":4442660},{"stateMutability":"nonpayable","type":"function","name":"commit_transfer_ownership","inputs":[{"name":"addr","type":"address"}],"outputs":[],"gas":39375},{"stateMutability":"nonpayable","type":"function","name":"accept_transfer_ownership","inputs":[],"outputs":[],"gas":39320},{"stateMutability":"view","type":"function","name":"lp_token","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2928},{"stateMutability":"view","type":"function","name":"balanceOf","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3173},{"stateMutability":"view","type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2988},{"stateMutability":"view","type":"function","name":"allowance","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3448},{"stateMutability":"view","type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":13350},{"stateMutability":"view","type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":11103},{"stateMutability":"view","type":"function","name":"reward_tokens","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":3217},{"stateMutability":"view","type":"function","name":"reward_balances","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3353},{"stateMutability":"view","type":"function","name":"rewards_receiver","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"address"}],"gas":3383},{"stateMutability":"view","type":"function","name":"claim_sig","inputs":[],"outputs":[{"name":"","type":"bytes"}],"gas":11223},{"stateMutability":"view","type":"function","name":"reward_integral","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3443},{"stateMutability":"view","type":"function","name":"reward_integral_for","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3688},{"stateMutability":"view","type":"function","name":"admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3288},{"stateMutability":"view","type":"function","name":"future_admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3318}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const Pools = [
      "0xf2Cde8c47C20aCbffC598217Ad5FE6DB9E00b163"
    ]
    
    const tokens = {};
    const prices = await getHarmonyPrices();

    let p = await loadMultipleCurveHarmonyPools(App, tokens, prices, Pools, CURVE_STAKING_ABI)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    }

    hideLoading();
  }

  async function loadMultipleCurveHarmonyPools(App, tokens, prices, pools, abi) {
    let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
    const infos = await Promise.all(pools.map(p =>
        loadHarmonyCurvePoolInfo(App, tokens, prices, p, abi)));
    for (const i of infos) {
      let p = await printCurvePool(App, i, "harmony");
      totalStaked += p.staked_tvl || 0;
      totalUserStaked += p.userStaked || 0;
      if (p.userStaked > 0) {
        individualAPRs.push(p.userStaked * p.apr / 100);
      }
    }
    let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
    return { staked_tvl : totalStaked, totalUserStaked, totalApr };
  }

  async function loadHarmonyCurvePoolInfo(App, tokens, prices, stakingAddress, stakingAbi) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
      const rewardReceiver = await STAKING_POOL.reward_receiver();
      let rewardTokenAddresses = [], rewardTokens = [], rewardTokenTickers = [], rewardTokenPrices = [], rewardData = [], weeklyRewards = [], usdCoinsPerWeek = [];
      const numberOfRewards = await STAKING_POOL.reward_count();

      for(let i = 0; i < numberOfRewards; i++){
        const rewardTokenAddress = await STAKING_POOL.reward_tokens(i);
        rewardTokenAddresses.push(rewardTokenAddress);
      }

      const rewardReceiverContract = new ethers.Contract(rewardReceiver, REWARD_RECEIVER_ABI, App.provider);

      const stakeTokenAddress = await rewardReceiverContract.lp_token();

      let stakeToken = await getHarmonyToken(App, stakeTokenAddress, rewardReceiver);

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
          tokens[address] = await getHarmonyToken(App, address, stakingAddress);
      }
      for(const rewardTokenAddress of rewardTokenAddresses){
        if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getHarmonyToken(App, rewardTokenAddress, stakingAddress);
        }
        const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
        const rewardTokenTicker = rewardToken.symbol;
        const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
        const reward_data = await STAKING_POOL.reward_data(rewardTokenAddress);
        rewardTokens.push(rewardToken);
        rewardTokenTickers.push(rewardTokenTicker);
        rewardTokenPrices.push(rewardTokenPrice);
        rewardData.push(reward_data);
      }

      const poolPrices = getPoolPrices(tokens, prices, stakeToken, "harmony");

      if (!poolPrices)
      {
        console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
        return null;
      }

      const stakeTokenTicker = poolPrices.stakeTokenTicker;

      const stakeTokenPrice =
          prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

      for(let i = 0; i < rewardData.length; i++){
        const weeklyReward = (Date.now() / 1000 > rewardData[i].period_finish) ? 0 : rewardData[i].rate / 10 ** rewardTokens[i].decimals * 604800;
        const usdPerWeek = weeklyReward * rewardTokenPrices[i];
        weeklyRewards.push(weeklyReward);
        usdCoinsPerWeek.push(usdPerWeek);
      }

      const staked_tvl = poolPrices.staked_tvl;

      const userStaked = await rewardReceiverContract.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;

      const userUnstaked = stakeToken.unstaked;

      let earnings = []
      for(const rewardToken of rewardTokens){
        const earned = await rewardReceiverContract.claimable_reward(App.YOUR_ADDRESS, rewardToken.address) / 10 ** rewardToken.decimals;
        earnings.push(earned);
      }

      return  {
        stakingAddress,
        poolPrices,
        stakeTokenAddress,
        rewardTokenAddresses,
        stakeTokenTicker,
        rewardTokenTickers,
        stakeTokenPrice,
        rewardTokenPrices,
        weeklyRewards,
        usdCoinsPerWeek,
        staked_tvl,
        userStaked,
        userUnstaked,
        earnings
      }
}

async function printCurvePool(App, info, chain="harmony", customURLs) {
    info.poolPrices.print_price(chain, 4, customURLs);
    let totalYearlyAPR = 0, totalWeeklyRewards = 0, totalRewardPrices = 0
    for(let i =0; i < info.rewardTokenTickers.length; i++){
      _print(`${info.rewardTokenTickers[i]} Per Week: ${info.weeklyRewards[i].toFixed(2)} ($${formatMoney(info.usdCoinsPerWeek[i])})`);
      const weeklyAPR = info.usdCoinsPerWeek[i] / info.staked_tvl * 100;
      const dailyAPR = weeklyAPR / 7;
      const yearlyAPR = weeklyAPR * 52;
      _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
      totalYearlyAPR += yearlyAPR;
      totalWeeklyRewards += info.weeklyRewards[i]
      totalRewardPrices += info.rewardTokenPrices[i]
    }
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
        const userWeeklyRewards = userStakedPct * totalWeeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${info.rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*totalRewardPrices)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*totalRewardPrices)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*totalRewardPrices)})`);
    }
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(info.stakingAddress, App)
    }
    const claim = async function() {
      return rewardsContract_claim(info.stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    _print(`<a target="_blank" href="https://explorer.harmony.one/address/${info.stakingAddress}#code">HARMONY Explorer</a>`);
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    _print_link(`Claim ${info.earnings[0].toFixed(6)} ${info.rewardTokenTickers[0]} ($${formatMoney(info.earnings[0]*info.rewardTokenPrices[0])}) + ${info.earnings[1].toFixed(6)} ${info.rewardTokenTickers[1]} ($${formatMoney(info.earnings[1]*info.rewardTokenPrices[1])})`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : totalYearlyAPR
    }
}