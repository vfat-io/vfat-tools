$(function() {
    consoleInit();
    start(main);
  });
  
  async function main() {  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const HOLY_KNIGHT_ADDR = "0x5D33dE3E540b289f9340D059907ED648c9E7AaDD";
    const HOLY_KNIGHT = new ethers.Contract(HOLY_KNIGHT_ADDR, HOLY_KNIGHT_ABI, App.provider);

    const poolCount = await HOLY_KNIGHT.poolLength();
    const totalAllocPoints = await HOLY_KNIGHT.totalAllocPoint();

    _print(`Found ${poolCount} pools.\n`)

    var prices = {};
    var tokens = {};

    const rewardTokenPoolIndex = 9;
    const rewardTokenTicker = "HOLY";
    const rewardTokenAddress = await HOLY_KNIGHT.holytoken();
    const rewardsPerWeek = await HOLY_KNIGHT.holyPerBlock() / 1e18 * 604800 / 13.5;

    await loadPool(App, prices, tokens, rewardTokenPoolIndex, 
             HOLY_KNIGHT_ABI, HOLY_KNIGHT, HOLY_KNIGHT_ADDR, totalAllocPoints, 
             rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, "pendingHoly");

    for (i = 0; i < poolCount; i++) {
        if (i != rewardTokenPoolIndex) {
            await loadPool(App, prices, tokens, i,
                HOLY_KNIGHT_ABI, HOLY_KNIGHT, HOLY_KNIGHT_ADDR, totalAllocPoints, 
                rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, "pendingHoly");
        }
    }
  
    hideLoading();  
  }