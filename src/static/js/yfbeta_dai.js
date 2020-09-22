$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {
  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...");
  
    const DAI_YFVAULT = new ethers.Contract(DAI_YFVAULT_ADDR, YFVAULT_ABI, App.provider);
    const DAI_YFPOOL = new ethers.Contract(DAI_YFPOOL_ADDR, YFPOOL_ABI, App.provider);
    
    const totalYFDAI = await DAI_YFVAULT.totalSupply() / 1e18;
    const totalStakedYFDAI = await DAI_YFVAULT.balanceOf(DAI_YFPOOL_ADDR) / 1e18;
    const yourStakedYFDAI = await DAI_YFPOOL.balanceOf(App.YOUR_ADDRESS) / 1e18;
  
    // Find out reward rate
    const weekly_reward = await get_synth_weekly_rewards(DAI_YFPOOL);
    const yfBETARewardPerYFDAI = weekly_reward / totalStakedYFDAI;
  
    _print("Finished reading smart contracts... Looking up prices... \n")
  
    // Look up prices
    const prices = await lookUpPrices(["dai", "yfbeta"]);
    const DAIPrice = prices["dai"].usd * 1.05;
    const YFBetaPrice = prices["yfbeta"].usd;
  
    // Finished. Start printing
  
    _print("========== PRICES ==========")
    _print(`1 YFBeta = $${YFBetaPrice}`);
    _print(`1 yDAI  = $${DAIPrice}\n`);
  
    _print("========== STAKING =========")
    _print(`There are total   : ${totalYFDAI} yfDAI issued yfBeta DAI Vault.`);
    _print(`                  = ${toDollar(totalYFDAI * DAIPrice)}`);
    _print(`There are total   : ${totalStakedYFDAI} yfDAI staked.`);
    _print(`                  = ${toDollar(totalStakedYFDAI * DAIPrice)}\n`);
    _print(`You are staking   : ${yourStakedYFDAI} yfDAI (${toFixed(yourStakedYFDAI * 100 / totalStakedYFDAI, 3)}% of the pool)`);
    _print(`                  = ${toDollar(yourStakedYFDAI * DAIPrice)}\n`);
  
    // yfBETA REWARDS
    _print("======== yfBETA REWARDS ========")
    const weeklyEstimate = yfBETARewardPerYFDAI * yourStakedYFDAI;
  
    _print(`Daily estimate    : ${toFixed(weeklyEstimate / 7, 2)} yfBETA = ${toDollar(weeklyEstimate * (1/7) * YFBetaPrice)} (out of total ${toFixed(weekly_reward / 7, 2)} yfBETA)`)
    _print(`Weekly estimate   : ${toFixed(weeklyEstimate, 2)} yfBETA = ${toDollar(weeklyEstimate * YFBetaPrice)} (out of total ${weekly_reward} yfBETA)\n`)
    const YFIWeeklyROI = (yfBETARewardPerYFDAI * YFBetaPrice) * 100 / (DAIPrice);
    _print(`Daily ROI in USD  : ${toFixed(YFIWeeklyROI / 7, 4)}%`)
    _print(`Weekly ROI in USD : ${toFixed(YFIWeeklyROI, 4)}%`)
    _print(`APY (unstable)    : ${toFixed(YFIWeeklyROI * 52, 4)}% \n`)
  
  await _print24HourPrice("yfbeta", "yfBETA");
  
    hideLoading();
  
  }
  