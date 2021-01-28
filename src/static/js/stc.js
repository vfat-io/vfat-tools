$(function() {
    consoleInit();
    start(main);
  });

  async function main() {
  
    const Contracts = {
        Tokens: {
            STS : "0x469d79214fd0a141731c6596eecc0362e5b184a0",
            STC : "0xF768Ab9cB203cE01030888605Ef024E040c91f66"
        },
        Staking : {
          STCUSDC: "0x4738Eea9a63473F1eC74a6e45fB8eE1725Fd26eD",
          STCSTS: "0x7D0A6Cc8EB391B0ecc3bd0b802929851bbabaE26",
          STCDAI: "0xEBe431ecB917a4e44E762F43D92e8B01AeD5fA1A"
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