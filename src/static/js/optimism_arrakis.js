$(function () {
  consoleInit(main)
});

const ARRAKIS_ABI = [{"name":"Deposit","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Withdraw","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateLiquidityLimit","inputs":[{"name":"user","type":"address","indexed":false},{"name":"original_balance","type":"uint256","indexed":false},{"name":"original_supply","type":"uint256","indexed":false},{"name":"working_balance","type":"uint256","indexed":false},{"name":"working_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"CommitOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"ApplyOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"Transfer","inputs":[{"name":"_from","type":"address","indexed":true},{"name":"_to","type":"address","indexed":true},{"name":"_value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"name":"_owner","type":"address","indexed":true},{"name":"_spender","type":"address","indexed":true},{"name":"_value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"RewardDataUpdate","inputs":[{"name":"_token","type":"address","indexed":true},{"name":"_amount","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"initialize","inputs":[{"name":"_staking_token","type":"address"},{"name":"_admin","type":"address"},{"name":"_SPICE","type":"address"},{"name":"_voting_escrow","type":"address"},{"name":"_veBoost_proxy","type":"address"},{"name":"_distributor","type":"address"}],"outputs":[],"gas":546150},{"stateMutability":"view","type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2418},{"stateMutability":"nonpayable","type":"function","name":"user_checkpoint","inputs":[{"name":"addr","type":"address"}],"outputs":[{"name":"","type":"bool"}],"gas":3493693},{"stateMutability":"view","type":"function","name":"claimed_reward","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":2976},{"stateMutability":"view","type":"function","name":"claimable_reward","inputs":[{"name":"_user","type":"address"},{"name":"_reward_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":26704},{"stateMutability":"nonpayable","type":"function","name":"set_rewards_receiver","inputs":[{"name":"_receiver","type":"address"}],"outputs":[],"gas":35613},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[{"name":"_addr","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[{"name":"_addr","type":"address"},{"name":"_receiver","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"kick","inputs":[{"name":"addr","type":"address"}],"outputs":[],"gas":3514457},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"},{"name":"_addr","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"},{"name":"_addr","type":"address"},{"name":"_claim_rewards","type":"bool"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"_value","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"_value","type":"uint256"},{"name":"_claim_rewards","type":"bool"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"transfer","inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":14116306},{"stateMutability":"nonpayable","type":"function","name":"transferFrom","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":14154256},{"stateMutability":"nonpayable","type":"function","name":"approve","inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":39391},{"stateMutability":"nonpayable","type":"function","name":"increaseAllowance","inputs":[{"name":"_spender","type":"address"},{"name":"_added_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":41935},{"stateMutability":"nonpayable","type":"function","name":"decreaseAllowance","inputs":[{"name":"_spender","type":"address"},{"name":"_subtracted_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":41959},{"stateMutability":"nonpayable","type":"function","name":"add_reward","inputs":[{"name":"_reward_token","type":"address"},{"name":"_distributor","type":"address"}],"outputs":[],"gas":112973},{"stateMutability":"nonpayable","type":"function","name":"set_reward_distributor","inputs":[{"name":"_reward_token","type":"address"},{"name":"_distributor","type":"address"}],"outputs":[],"gas":40723},{"stateMutability":"nonpayable","type":"function","name":"deposit_reward_token","inputs":[{"name":"_reward_token","type":"address"},{"name":"_amount","type":"uint256"}],"outputs":[],"gas":3585370},{"stateMutability":"nonpayable","type":"function","name":"commit_transfer_ownership","inputs":[{"name":"addr","type":"address"}],"outputs":[],"gas":40082},{"stateMutability":"nonpayable","type":"function","name":"accept_transfer_ownership","inputs":[],"outputs":[],"gas":39930},{"stateMutability":"view","type":"function","name":"SPICE","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2988},{"stateMutability":"view","type":"function","name":"voting_escrow","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3018},{"stateMutability":"view","type":"function","name":"veBoost_proxy","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3048},{"stateMutability":"view","type":"function","name":"staking_token","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3078},{"stateMutability":"view","type":"function","name":"decimal_staking_token","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3108},{"stateMutability":"view","type":"function","name":"balanceOf","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3353},{"stateMutability":"view","type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3168},{"stateMutability":"view","type":"function","name":"allowance","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3628},{"stateMutability":"view","type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":13458},{"stateMutability":"view","type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":11211},{"stateMutability":"view","type":"function","name":"working_balances","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3503},{"stateMutability":"view","type":"function","name":"working_supply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3318},{"stateMutability":"view","type":"function","name":"integrate_checkpoint_of","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3563},{"stateMutability":"view","type":"function","name":"reward_count","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3378},{"stateMutability":"view","type":"function","name":"reward_tokens","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":3453},{"stateMutability":"view","type":"function","name":"reward_data","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"token","type":"address"},{"name":"distributor","type":"address"},{"name":"period_finish","type":"uint256"},{"name":"rate","type":"uint256"},{"name":"last_update","type":"uint256"},{"name":"integral","type":"uint256"}],"gas":14883},{"stateMutability":"view","type":"function","name":"rewards_receiver","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"address"}],"gas":3683},{"stateMutability":"view","type":"function","name":"reward_integral_for","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3928},{"stateMutability":"view","type":"function","name":"admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3528},{"stateMutability":"view","type":"function","name":"future_admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3558},{"stateMutability":"view","type":"function","name":"initialized","inputs":[],"outputs":[{"name":"","type":"bool"}],"gas":3588}]

const Pools = [
  "0xBeE2b73493F342b1abEE4c747be6Ad53E02C071e", //WETH/UNIDX
  "0x7E232AEed14446d427579B4f77251552B065dF00", //wstETH/WBTC
  "0x1535eC8C7477d38066326189f5b1C695c2846479", //WETH/WBTC
  "0xDedD02E7Da507Fe2aC09C509DA10B94483e80Aa5", //wstETH/USDT
  "0x68F51d2AEb485CA3A65A7Ff54e9266Dd5EA4C58B", //wstETH/USDC
  "0x24C95f333755bbeDBaE14B461770c9ec3F6E9d0D", //wstETH/USDC
  "0x43667563725040fEBE9BF5164a38B7258105a210", //WETH/USDC
  "0x212F71bFF67E5b7795952a916598c4b64bA48741", //WETH/cbETH
  "0x8D1C480Bca1439AE5D5A81a75D53f9Bf6eC513f1", //USDC/LUSD
  "0xC36681303c7A41b045636aF915486b22214B6292", //wstETH/WETH
  "0x8b24d44772A27030353bEe0f252844602AbbB0F1", //WETH/rETH
  "0xF78daF7A425098D255bD142D71bBdD8dCf43Ee6c", //USDC/USDT
  "0x499B7CBd0f84318feE1edDeD7B5458f6F4500AB3", //USDC/DAI

].map(a => ({
      address: a,
      abi: ARRAKIS_ABI,
      stakeTokenFunction: "staking_token",
      rewardTokenAddress: "0x4200000000000000000000000000000000000042"
  }))

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  const prices = await getOptimisticPrices();

  let p = await loadMultipleArrakisSynthetixPools(App, tokens, prices, Pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
  _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();

}

async function loadMultipleArrakisSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadArrakisSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenAddress, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printSynthetixPool(App, i, "optimism");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalApr };
}

async function loadArrakisSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenAddress, stakeTokenFunction) {
    //const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    const calls = [STAKING_MULTI.staking_token(), STAKING_MULTI.reward_data(rewardTokenAddress),
      STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.claimable_reward(App.YOUR_ADDRESS, rewardTokenAddress)]
    const [stakeTokenAddress, rewardData, balance, earned_] = await App.ethcallProvider.all(calls);

    //const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
    //const stakeTokenAddress = await STAKING_POOL.staking_token();

    var stakeToken = await getOptimisticToken(App, stakeTokenAddress, stakingAddress);

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
        tokens[address] = await getOptimisticToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getOptimisticToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "optimistic");

    if (!poolPrices)
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const periodFinish = rewardData.period_finish;
    const rewardRate = rewardData.rate;

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