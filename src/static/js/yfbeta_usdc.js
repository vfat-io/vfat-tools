$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {
  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...");
  
    const USDC_YFVAULT = new ethers.Contract(USDC_YFVAULT_ADDR, YFVAULT_ABI, App.provider);
    const USDC_YFPOOL = new ethers.Contract(USDC_YFPOOL_ADDR, YFPOOL_ABI, App.provider);
    
    const totalYFUSDC = await USDC_YFVAULT.totalSupply() / 1e6;
    const totalStakedYFUSDC = await USDC_YFVAULT.balanceOf(USDC_YFPOOL_ADDR) / 1e6;
    const yourStakedYFUSDC = await USDC_YFPOOL.balanceOf(App.YOUR_ADDRESS) / 1e6;
  
    // Find out reward rate
    const weekly_reward = await get_synth_weekly_rewards(USDC_YFPOOL);
    const yfBETARewardPerYFUSDC = weekly_reward / totalStakedYFUSDC;
  
    _print("Finished reading smart contracts... Looking up prices... \n")
  
    // Look up prices
    const prices = await lookUpPrices(["usd-coin", "yfbeta"]);
    const USDCPrice = prices["usd-coin"].usd * 1.0259 * 1.005;
    const YFBetaPrice = prices["yfbeta"].usd;
  
    // Finished. Start printing
  
    _print("========== PRICES ==========")
    _print(`1 YFBeta = $${YFBetaPrice}`);
    _print(`1 yUSDC  = $${USDCPrice}\n`);
  
    _print("========== STAKING =========")
    _print(`There are total   : ${totalYFUSDC} yfUSDC issued yfBeta USDC Vault.`);
    _print(`                  = ${toDollar(totalYFUSDC * USDCPrice)}`);
    _print(`There are total   : ${totalStakedYFUSDC} yfUSDC staked.`);
    _print(`                  = ${toDollar(totalStakedYFUSDC * USDCPrice)}\n`);
    _print(`You are staking   : ${yourStakedYFUSDC} yfUSDC (${toFixed(yourStakedYFUSDC * 100 / totalStakedYFUSDC, 3)}% of the pool)`);
    _print(`                  = ${toDollar(yourStakedYFUSDC * USDCPrice)}\n`);
  
    // yfBETA REWARDS
    _print("======== yfBETA REWARDS ========")
    const weeklyEstimate = yfBETARewardPerYFUSDC * yourStakedYFUSDC;
  
    _print(`Daily estimate    : ${toFixed(weeklyEstimate / 7, 2)} yfBETA = ${toDollar(weeklyEstimate * (1/7) * YFBetaPrice)} (out of total ${toFixed(weekly_reward / 7, 2)} yfBETA)`)
    _print(`Weekly estimate   : ${toFixed(weeklyEstimate, 2)} yfBETA = ${toDollar(weeklyEstimate * YFBetaPrice)} (out of total ${weekly_reward} yfBETA)\n`)
    const YFIWeeklyROI = (yfBETARewardPerYFUSDC * YFBetaPrice) * 100 / (USDCPrice);
    _print(`Daily ROI in USD  : ${toFixed(YFIWeeklyROI / 7, 4)}%`)
    _print(`Weekly ROI in USD : ${toFixed(YFIWeeklyROI, 4)}%`)
    _print(`APY (unstable)    : ${toFixed(YFIWeeklyROI * 52, 4)}% \n`)
  
  await _print24HourPrice("yfbeta", "yfBETA");
  
    hideLoading();
  
  }
  