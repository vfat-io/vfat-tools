$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const YAXIS_CHEF_ADDR = "0xc330e7e73717cd13fb6ba068ee871584cf8a194f";
    const YAXIS_CHEF = new ethers.Contract(YAXIS_CHEF_ADDR, YAXIS_CHEF_ABI, App.provider);

    const poolCount = await YAXIS_CHEF.poolLength();
    const totalAllocPoints = await YAXIS_CHEF.totalAllocPoint();

    _print(`Found ${poolCount} pools.\n`)

    var prices = {};
    var tokens = {};

    const rewardTokenPoolIndex = 6;
    const rewardTokenTicker = "YAX";
    const rewardTokenAddress = "0xb1dc9124c395c1e97773ab855d66e879f053a289"
    const rewardsPerWeek = 200000 * 0.9;

    await loadPool(App, prices, tokens, rewardTokenPoolIndex, 
             YAXIS_CHEF_ABI, YAXIS_CHEF, YAXIS_CHEF_ADDR, totalAllocPoints, 
             rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, "pendingYaxis");

    for (i = 0; i < poolCount; i++) {
        if (i != rewardTokenPoolIndex) {
            await loadPool(App, prices, tokens, i, 
                YAXIS_CHEF_ABI, YAXIS_CHEF, YAXIS_CHEF_ADDR, totalAllocPoints, 
                rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, "pendingYaxis");
        }
    }
  
    hideLoading();  
  }