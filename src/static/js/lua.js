$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const MASTER_FARMER_ADDR = "0xb67d7a6644d9e191cac4da2b88d6817351c7ff62";

    const MASTER_FARMER = new ethers.Contract(MASTER_FARMER_ADDR, MASTER_FARMER_ABI, App.provider);

    const poolCount = await MASTER_FARMER.poolLength();
    const totalAllocPoints = await MASTER_FARMER.totalAllocPoint();

    _print(`Found ${poolCount} pools.\n`)

    var prices = {};
    var tokens = {};

    const rewardMultiplier = 128;
    const rewardTokenTicker = "LUA";
    const rewardTokenAddress = await MASTER_FARMER.lua();
    const rewardsPerWeek = await MASTER_FARMER.REWARD_PER_BLOCK() / 1e18 * 604800 / 13.5 * rewardMultiplier;

    for (i = poolCount-1; i >= 0; i--) { //LUA is the last pool
      await loadChefPool(App, prices, tokens, i,
          MASTER_FARMER_ABI, MASTER_FARMER, MASTER_FARMER_ADDR, totalAllocPoints, 
          rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, "pendingReward");    
    }
  
    hideLoading();  
  }