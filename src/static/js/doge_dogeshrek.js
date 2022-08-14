
$(function() {
consoleInit(main)
  });

/*const KEFIR_CHEF_ABI = 

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const KEFIR_MC_ADDR = "0x578C6c8dd1dA9082F136634FCCEBa830A35D32Dc";
   const rewardTokenTicker = "KEFIR";
   const KEFIR_MC = new ethers.Contract(KEFIR_MC_ADDR, KEFIR_CHEF_ABI, App.provider);

   //kava blocks per second 6.3
   const rewardsPerWeek = await KEFIR_MC.REWARD_PER_BLOCK() / 1e18 * 604800 / 6.3;

    const tokens = {};
    const prices = await getKavaPrices();

    await loadGeneralChefContract(App, tokens, prices, KEFIR_MC, KEFIR_MC_ADDR, KEFIR_CHEF_ABI, rewardTokenTicker,
        "govToken", null, rewardsPerWeek, "pendingReward", [0,1,2,3,4], "kava");

    hideLoading();
  }
*/