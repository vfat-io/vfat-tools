
$(function() {
consoleInit(main)
  });

const BASE_CHEF_ABI = 
async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const BASE_CHEF_ADDR = "";

   const rewardTokenTicker = "BASE";
   const BASE_CHEF = new ethers.Contract(BASE_CHEF_ADDR, BASE_CHEF_ABI, App.provider);

    const rewardsPerWeek = await BASE_CHEF.BASEPerSec() /1e18 * 604800;

    const tokens = {};
    const prices = await getBasePrices();

    await loadGeneralChefContract(App, tokens, prices, BASE_CHEF, BASE_CHEF_ADDR, BASE_CHEF_ABI, rewardTokenTicker,
      "rewardsToken", null, rewardsPerWeek, "pendingTokens", [], "base");

    hideLoading();
  }
