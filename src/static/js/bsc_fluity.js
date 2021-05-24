$(function() {
consoleInit(main)
});

const FLTY_STAKING_ABI = ""
const Pools = [
  "",
  "",
  ""
].map(a => {
  return {
    address: a,
    abi: FLTY_STAKING_ABI,
    stakeTokenFunction: "",
    rewardTokenFunction: ""
  }; })

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = await getBscPrices();

  let p = await loadMultipleBscSynthetixPools(App, tokens, prices, Pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}
