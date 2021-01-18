$(function() {
    consoleInit();
    start(main);
  });

  async function main() {
  
    const Contracts = {
        Tokens: {
            FXS : "0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0",
            FRAX : "0x853d955acef822db058eb8505911ed77f175b99e"
        },
        Pools : {
            USDC : "0x3C2982CA260e870eee70c423818010DfeF212659",
            USDT : "0x7d3fcd3825ae54e8e8ffd3d0ce95882330d54968"
        },
        Staking : {
            FXS_WETH  : "0xDc65f3514725206Dd83A8843AAE2aC3D99771C88",
            FRAX_WETH : "0xD875628B942f8970De3CcEaf6417005F68540d4f",
            FRAX_USDC : "0xa29367a3f057F3191b62bd4055845a33411892b6",
            FRAX_FXS  : "0xda2c338350a0E59Ce71CDCED9679A3A590Dd9BEC"
        }
    }
    
  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");
  
    var tokens = {};
    var prices = {};
  
    for (const [,address] of Object.entries(Contracts.Staking)) {
      await loadSynthetixPool(App, tokens, prices, FRAX_STAKING_POOL_ABI, address, "rewardsToken", "stakingToken");
    }
  
    hideLoading();
  }