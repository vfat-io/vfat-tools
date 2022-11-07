
$(function() {
consoleInit(main)
  });

const LFG_CHEF_ABI = "" //cant read the code of the contract

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const LFG_MC_ADDR = "0x0cd5bB382De57d92088E79da2ed3893A6326C112";
   const rewardTokenTicker = "LFG";
   const LFG_MC = new ethers.Contract(LFG_MC_ADDR, LFG_CHEF_ABI, App.provider);

   const currentBlock = await App.provider.getBlockNumber();

   const multiplier = await LFG_MC.getMultiplier(currentBlock, currentBlock+1);

   const blocksPerSeconds = await getAverageBlockTime(App);

   const rewardsPerWeek = await LFG_MC.tokenPerBlock() / 1e18 * 604800 * multiplier / blocksPerSeconds;

    const tokens = {};
    const prices = await getEthwPrices();

    await loadGeneralChefContract(App, tokens, prices, LFG_MC, LFG_MC_ADDR, LFG_CHEF_ABI, rewardTokenTicker,
        "token", null, rewardsPerWeek, "pendingToken", [], "ethw");

    hideLoading();
  }
