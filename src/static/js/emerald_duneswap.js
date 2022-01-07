
$(function() {
  consoleInit(main)
    });

  const DUNE_CHEF_ABI = []//BLOCKS prepei na to kanw me to average block opws sto avax giati allazei sunexia...
  async function main() {
      const App = await init_ethers();

      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");

     const DUNE_CHEF_ADDR = "0xF69E3c9E83612A2F3Ba69020cE57b3b700E8D70d";

     const rewardTokenTicker = "DUNE";
     const DUNE_CHEF = new ethers.Contract(DUNE_CHEF_ADDR, DUNE_CHEF_ABI, App.provider);

     let rewardsPerWeek = 0
     const startTime = await DUNE_CHEF.startTime();
     const currentTime = Date.now();

     if(currentTime < startTime){
      _print(`Rewards has not started yet\n`);
     }else{
      rewardsPerWeek = await DUNE_CHEF.DUNEPerSecond() /1e18 * 604800 ;
     }

      const tokens = {};
      const prices = await getEmeraldPrices();

      await loadEmeraldChefContract(App, tokens, prices, DUNE_CHEF, DUNE_CHEF_ADDR, DUNE_CHEF_ABI, rewardTokenTicker,
        "DUNE", null, rewardsPerWeek, "pendingDUNE");

      hideLoading();
    }
