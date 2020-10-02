$(function() {
  consoleInit();
  start(main);
});

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...");

  const USDT_YFVAULT = new ethers.Contract(USDT_YFVAULT_ADDR, YFVAULT_ABI, App.provider);
  const USDT_YFPOOL = new ethers.Contract(USDT_YFPOOL_ADDR, YFPOOL_ABI, App.provider);
  
  const totalYFUSDT = await USDT_YFVAULT.totalSupply() / 1e6;
  const totalStakedYFUSDT = await USDT_YFVAULT.balanceOf(USDT_YFPOOL_ADDR) / 1e6;
  const yourStakedYFUSDT = await USDT_YFPOOL.balanceOf(App.YOUR_ADDRESS) / 1e6;

  // Find out reward rate
  const weekly_reward = await get_synth_weekly_rewards(USDT_YFPOOL);
  const yfBETARewardPerYFUSDT = weekly_reward / totalStakedYFUSDT;

  _print("Finished reading smart contracts... Looking up prices... \n")

  // Look up prices
  const prices = await lookUpPrices(["tether", "yfbeta"]);
  const USDTPrice = prices["tether"].usd * 1.028 * 1.005;
  const YFBetaPrice = prices["yfbeta"].usd;

  // Finished. Start printing

  _print("========== PRICES ==========")
  _print(`1 YFBeta = $${YFBetaPrice}`);
  _print(`1 yUSDT  = $${USDTPrice}\n`);

  _print("========== STAKING =========")
  _print(`There are total   : ${totalYFUSDT} yfUSDT issued yfBeta USDT Vault.`);
  _print(`                  = ${toDollar(totalYFUSDT * USDTPrice)}`);
  _print(`There are total   : ${totalStakedYFUSDT} yfUSDT staked.`);
  _print(`                  = ${toDollar(totalStakedYFUSDT * USDTPrice)}\n`);
  _print(`You are staking   : ${yourStakedYFUSDT} yfUSDT (${toFixed(yourStakedYFUSDT * 100 / totalStakedYFUSDT, 3)}% of the pool)`);
  _print(`                  = ${toDollar(yourStakedYFUSDT * USDTPrice)}\n`);

  // yfBETA REWARDS
  _print("======== yfBETA REWARDS ========")
  const weeklyEstimate = yfBETARewardPerYFUSDT * yourStakedYFUSDT;

  _print(`Daily estimate    : ${toFixed(weeklyEstimate / 7, 2)} yfBETA = ${toDollar(weeklyEstimate * (1/7) * YFBetaPrice)} (out of total ${toFixed(weekly_reward / 7, 2)} yfBETA)`)
  _print(`Weekly estimate   : ${toFixed(weeklyEstimate, 2)} yfBETA = ${toDollar(weeklyEstimate * YFBetaPrice)} (out of total ${weekly_reward} yfBETA)\n`)
  const YFIWeeklyROI = (yfBETARewardPerYFUSDT * YFBetaPrice) * 100 / (USDTPrice);
  _print(`Daily ROI in USD  : ${toFixed(YFIWeeklyROI / 7, 4)}%`)
  _print(`Weekly ROI in USD : ${toFixed(YFIWeeklyROI, 4)}%`)
  _print(`APY (unstable)    : ${toFixed(YFIWeeklyROI * 52, 4)}% \n`)

await _print24HourPrice("yfbeta", "yfBETA");

  hideLoading();

}
