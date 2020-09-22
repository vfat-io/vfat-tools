$(function() {
  consoleInit();
  start(main);
});

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...");

  const DAI_SAFE_BALANCER_POOL = new ethers.Contract(DAI_SAFE_BPT_TOKEN_ADDR, BALANCER_POOL_ABI, App.provider);
  const DAI_SAFE_BPT_TOKEN_CONTRACT = new ethers.Contract(DAI_SAFE_BPT_TOKEN_ADDR, ERC20_ABI, App.provider);
  const BPT_STAKING_POOL = new ethers.Contract(DAI_SAFE_TOKEN_STAKING_ADDR, SAFE_REWARDS_POOL_ABI, App.provider);
  
  const totalBPTAmount = await DAI_SAFE_BALANCER_POOL.totalSupply() / 1e18;
  const totalStakedBPTAmount = await DAI_SAFE_BPT_TOKEN_CONTRACT.balanceOf(DAI_SAFE_TOKEN_STAKING_ADDR) / 1e18;
  const yourBPTAmount = await BPT_STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 1e18;

  const totalDAIAmount = await DAI_SAFE_BALANCER_POOL.getBalance(DAI_TOKEN_ADDR) / 1e18;
  const totalSafeAmount = await DAI_SAFE_BALANCER_POOL.getBalance(SAFE_TOKEN_ADDR) / 1e18;

  const DAIPerBPT = totalDAIAmount / totalBPTAmount;
  const SafePerBPT = totalSafeAmount / totalBPTAmount;

  // Find out reward rate
  const weekly_reward = await get_synth_weekly_rewards(BPT_STAKING_POOL);
  const SafeRewardPerBPT = weekly_reward / totalStakedBPTAmount;

  _print("Finished reading smart contracts... Looking up prices... \n")

  // Look up prices
  const prices = await lookUpPrices(["dai", "yieldfarming-insure"]);
  const DAIPrice = prices["dai"].usd;
  const SAFEPrice = prices["yieldfarming-insure"].usd;

  const BPTPrice = DAIPerBPT * DAIPrice + SafePerBPT * SAFEPrice;

  // Finished. Start printing

  _print("========== PRICES ==========")
  _print(`1 SAFE = $${SAFEPrice}`);
  _print(`1 DAI  = $${DAIPrice}\n`);
  _print(`1 BPT  = [${DAIPerBPT} DAI, ${SafePerBPT} SAFE]`);
  _print(`       = ${toDollar(BPTPrice)}\n`);

  _print("========== STAKING =========")
  _print(`There are total   : ${totalBPTAmount} BPT issued by DAI-SAFE (98/2) Balancer Pool.`);
  _print(`                  = ${toDollar(totalBPTAmount * BPTPrice)}`);
  _print(`There are total   : ${totalStakedBPTAmount} BPT staked.`);
  _print(`                  = ${toDollar(totalStakedBPTAmount * BPTPrice)}\n`);
  _print(`You are staking   : ${yourBPTAmount} BPT (${toFixed(yourBPTAmount * 100 / totalStakedBPTAmount, 3)}% of the pool)`);
  _print(`                  = [${DAIPerBPT * yourBPTAmount} SAFE, ${SafePerBPT * yourBPTAmount} DAI]`);
  _print(`                  = ${toDollar(yourBPTAmount * BPTPrice)}\n`);

  // SAFE REWARDS
  _print("======== SAFE REWARDS ========")
  const weeklyEstimate = SafeRewardPerBPT * yourBPTAmount;

  _print(`Daily estimate    : ${toFixed(weeklyEstimate / 7, 2)} SAFE = ${toDollar(weeklyEstimate * (1/7) * SAFEPrice)} (out of total ${toFixed(weekly_reward / 7, 2)} SAFE)`)
  _print(`Weekly estimate   : ${toFixed(weeklyEstimate, 2)} SAFE = ${toDollar(weeklyEstimate * SAFEPrice)} (out of total ${weekly_reward} SAFE)\n`)
  const YFIWeeklyROI = (SafeRewardPerBPT * SAFEPrice) * 100 / (BPTPrice);
  _print(`Daily ROI in USD  : ${toFixed(YFIWeeklyROI / 7, 4)}%`)
  _print(`Weekly ROI in USD : ${toFixed(YFIWeeklyROI, 4)}%`)
  _print(`APY (unstable)    : ${toFixed(YFIWeeklyROI * 52, 4)}% \n`)

  // BAL REWARDS
  _print("======== BAL REWARDS ========")
  _print_href(`Check http://www.predictions.exchange/balancer/ for accurate %`, "https://www.predictions.exchange/balancer/")

await _print24HourPrice("yieldfarming-insure", "SAFE");

  hideLoading();

}
