$(function() {
  consoleInit();
  start(main);
});

async function main() {
  const CONTRACTS = [
    "0x23b53026187626Ed8488e119767ACB2Fe5F8de4e",
    "0xfAe0ADb2d30E2a63730AC927E4e15e96D69B4aDd",
    "0xed41F2b444D72648647d6f5a124Ad15574963706",
    "0xa40d04a73d6E00049d8A72623Ef8b75879059F70",
    "0x5859D111210dd9FE6F11502b65C1BF26a46018d2",
    "0xf49A20407b92332704B5FE4942c95D7d134b843b",
    "0x8124502fB129eB1B0052725CfD126e8EB0975ab1",
    "0x0190bF688fF57B935e99487AaceBAccf450C5D4f"
  ];

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...");

  const ETH_TOKEN_ADDR = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  const PCT_TOKEN_ADDR = "0xbc16da9df0a22f01a16bc0620a27e7d6d6488550";
  const PCT_ETH_BPT_TOKEN_ADDR = "0xeb85b2e12320a123d447ca0da26b49e666b799db";
  const PCT_ETH_TOKEN_STAKING_ADDR = "0x23b53026187626Ed8488e119767ACB2Fe5F8de4e";
  const PCT_ETH_BALANCER_POOL = new ethers.Contract(PCT_ETH_BPT_TOKEN_ADDR, BALANCER_POOL_ABI, App.provider);
  const PCT_ETH_BPT_TOKEN_CONTRACT = new ethers.Contract(PCT_ETH_BPT_TOKEN_ADDR, ERC20_ABI, App.provider);
  const BPT_STAKING_POOL = new ethers.Contract(PCT_ETH_TOKEN_STAKING_ADDR, PCT_POOL_ABI, App.provider);
  
  const totalBPTAmount = await PCT_ETH_BALANCER_POOL.totalSupply() / 1e18;
  const totalStakedBPTAmount = await PCT_ETH_BPT_TOKEN_CONTRACT.balanceOf(PCT_ETH_TOKEN_STAKING_ADDR) / 1e18;
  const yourBPTAmount = await BPT_STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 1e18;

  const totalETHAmount = await PCT_ETH_BALANCER_POOL.getBalance(ETH_TOKEN_ADDR) / 1e18;
  const totalPercentAmount = await PCT_ETH_BALANCER_POOL.getBalance(PCT_TOKEN_ADDR) / 1e18;

  const ETHPerBPT = totalETHAmount / totalBPTAmount;
  const PercentPerBPT = totalPercentAmount / totalBPTAmount;

  // Find out reward rate
  const weekly_reward = await get_synth_weekly_rewards(BPT_STAKING_POOL);
  const PercentRewardPerBPT = weekly_reward / totalStakedBPTAmount;

  _print("Finished reading smart contracts... Looking up prices... \n")

  // Look up prices
  const prices = await lookUpPrices(["ethereum", "percent"]);
  const ETHPrice = prices["ethereum"].usd;
  const PCTPrice = prices["percent"].usd;

  const BPTPrice = ETHPerBPT * ETHPrice + PercentPerBPT * PCTPrice;

  // Finished. Start printing

  _print("========== PRICES ==========")
  _print(`1 PCT = $${PCTPrice}`);
  _print(`1 ETH  = $${ETHPrice}\n`);
  _print(`1 BPT  = [${ETHPerBPT} ETH, ${PercentPerBPT} PCT]`);
  _print(`       = ${toDollar(BPTPrice)}\n`);

  _print("========== STAKING =========")
  _print(`There are total   : ${totalBPTAmount} BPT issued by ETH-PCT Balancer Pool.`);
  _print(`                  = ${toDollar(totalBPTAmount * BPTPrice)}`);
  _print(`There are total   : ${totalStakedBPTAmount} BPT staked.`);
  _print(`                  = ${toDollar(totalStakedBPTAmount * BPTPrice)}\n`);
  _print(`You are staking   : ${yourBPTAmount} BPT (${toFixed(yourBPTAmount * 100 / totalStakedBPTAmount, 3)}% of the pool)`);
  _print(`                  = [${(ETHPerBPT * yourBPTAmount).toFixed(2)} ETH, ${(PercentPerBPT * yourBPTAmount).toFixed(2)} PCT]`);
  _print(`                  = ${toDollar(yourBPTAmount * BPTPrice)}\n`);

  // PCT REWARDS
  _print("======== PCT REWARDS ========")
  const weeklyEstimate = PercentRewardPerBPT * yourBPTAmount;

  _print(`Daily estimate    : ${toFixed(weeklyEstimate / 7, 2)} PCT = ${toDollar(weeklyEstimate * (1/7) * PCTPrice)} (out of total ${toFixed(weekly_reward / 7, 2)} PCT)`)
  _print(`Weekly estimate   : ${toFixed(weeklyEstimate, 2)} PCT = ${toDollar(weeklyEstimate * PCTPrice)} (out of total ${weekly_reward} PCT)\n`)
  const YFIWeeklyROI = (PercentRewardPerBPT * PCTPrice) * 100 / (BPTPrice);
  _print(`Daily ROI in USD  : ${toFixed(YFIWeeklyROI / 7, 4)}%`)
  _print(`Weekly ROI in USD : ${toFixed(YFIWeeklyROI, 4)}%`)
  _print(`APY (unstable)    : ${toFixed(YFIWeeklyROI * 52, 4)}% \n`)

  // BAL REWARDS
  _print("======== BAL REWARDS ========")
  _print_href(`Check http://www.predictions.exchange/balancer/ for accurate %`, "https://www.predictions.exchange/balancer/")

  await _print24HourPrice("percent", "PCT");

  hideLoading();
}