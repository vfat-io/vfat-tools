
$(function() {
consoleInit(main)
  });

const TRI_CHEF_ABI = 
async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const TRI_CHEF_ADDR = "";
   const rewardTokenTicker = "TRI";
   const TRI_CHEF = new ethers.Contract(TRI_CHEF_ADDR, TRI_CHEF_ABI, App.provider);

   const rewardsPerWeek = await TRI_CHEF.triPerBlock() /1e18
        * 604800 / 1.1;

    const tokens = {};
    const prices = await getAuroraPrices();

    await loadAuroraChefContract(App, tokens, prices, TRI_CHEF, TRI_CHEF_ADDR, TRI_CHEF_ABI, rewardTokenTicker,
        "tri", null, rewardsPerWeek, "pendingTri");

    hideLoading();
  }
