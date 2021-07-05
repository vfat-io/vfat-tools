$(function() {
consoleInit(main)
  });

  async function main() {
    const Contracts = {
      Tokens: {
          PUSD : "0x412e5a36BDE71AA2c38e1c0E26BAAf7F2f0Bc24a",
          PEGS : "0x88bd6eFe33bc82860278c044eFA33364c6285032"
      },
      Pools : {
          USDC : "0xd707ee369ff628e58c31597bd70fc68012618650"
      },
      Staking : {
          PUSD_PEGS : "0x7b956219B28B909812dD15AdD1F8584218aE4f79",
          PUSD_USDC : "0x6E222C95dD4f7346582cDdc02845138a92aF59DC"
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
