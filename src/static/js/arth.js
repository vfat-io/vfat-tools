$(function() {
    consoleInit();
    start(main);
});

async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");
  
    var tokens = {};
    var prices = {};
  
    const c2 = ARTHContracts[1];
    const p2 = await loadSynthetixPool(App, tokens, prices, c2.abi, c2.address, c2.rewardTokenFunction, c2.stakeTokenFunction);
    const c1 = ARTHContracts[0];
    const p1 = await loadSynthetixPool(App, tokens, prices, c1.abi, c1.address, c1.rewardTokenFunction, c1.stakeTokenFunction);
    const p = await loadMultipleSynthetixPools(App, tokens, prices, ARTHContracts.slice(2));

    if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APY of ${(p.totalApy * 100).toFixed(2)}%\n`);
    }

    _print_bold(`Total staked: $${formatMoney(p.staked_tvl + p1.staked_tvl + p2.staked_tvl)}`)
  
    hideLoading();
  }