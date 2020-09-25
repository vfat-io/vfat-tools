$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const PICKLE_CHEF_ADDR = "0xbD17B1ce622d73bD438b9E658acA5996dc394b0d";
    const PICKLE_CHEF = new ethers.Contract(PICKLE_CHEF_ADDR, PICKLE_CHEF_ABI, App.provider);

    const poolCount = await PICKLE_CHEF.poolLength();
    const totalAllocPoints = await PICKLE_CHEF.totalAllocPoint();

    _print(`Found ${poolCount} pools.\n`)

    var prices = {};
    var tokens = {};

    const rewardTokenPoolIndex = 0;
    const rewardTokenTicker = "PICKLE";
    const rewardTokenAddress = await PICKLE_CHEF.pickle();
    const rewardsPerWeek = await PICKLE_CHEF.picklePerBlock() * await PICKLE_CHEF.BONUS_MULTIPLIER() / 1e18
        * 604800 / 13.5;

    await loadPool(App, prices, tokens, rewardTokenPoolIndex, 
             PICKLE_CHEF_ABI, PICKLE_CHEF, PICKLE_CHEF_ADDR, totalAllocPoints, 
             rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, "pendingPickle");

    for (i = 0; i < poolCount; i++) {
        if (i != rewardTokenPoolIndex) {
            await loadPool(App, prices, tokens, i,
                PICKLE_CHEF_ABI, PICKLE_CHEF, PICKLE_CHEF_ADDR, totalAllocPoints, 
                rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, "pendingPickle");
        }
    }
  
    hideLoading();  
  }