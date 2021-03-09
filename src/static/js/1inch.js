$(function() {
  consoleInit();
  start(main);
});
const ONEINCH=  [{
  token1: "1INCH",
  token2: "ETH",
  poolAddress: "0x0ef1b8a0e726fc3948e15b23993015eb1627f210",
  farmingAddress: "0xeb7dbc5a64d2d083d774595e560b147c5021eacd",
}, {
  token1: "1INCH",
  token2: "VSP",
  poolAddress: "0xd471b6755eba924ad94dd9144ea50022010efccc",
  farmingAddress: "0xc84dcdaff87f9b5639db82f434c8ba1c2023f6eb",
}, {
  token1: "ETH",
  token2: "TORN",
  poolAddress: "0x9696d4999a25766719d0e80294f93bb62a5a3178",
  farmingAddress: "0x7cb203834ce6792756541d722d94296f4c1ca356",
}, {
  token1: "ETH",
  token2: "OPIUM",
  poolAddress: "0x822e00a929f5a92f3565a16f92581e54af2b90ea",
  farmingAddress: "0x18d410f651289bb978fc32f90d2d7e608f4f4560",
}, {
  token1: "stETH",
  token2: "LDO",
  poolAddress: "0x1f629794b34ffb3b29ff206be5478a52678b47ae",
  farmingAddress: "0x8acdb3bcc5101b1ba8a5070f003a77a2da376fe8",
}, {
  token1: "ETH",
  token2: "WBTC",
  poolAddress: "0x6a11f3e5a01d129e566d783a7b6e8862bfd66cca",
  farmingAddress: "0x2ede375d73d81dbd19ef58a75ba359dd28d25de8",
}, {
  token1: "ETH",
  token2: "USDC",
  poolAddress: "0xb4db55a20e0624edd82a0cf356e3488b4669bd27",
  farmingAddress: "0xc7c42eccac0d4bb790a32bc86519ac362e01d388",
}, {
  token1: "ETH",
  token2: "DAI",
  poolAddress: "0x7566126f2fd0f2dddae01bb8a6ea49b760383d5a",
  farmingAddress: "0xca6e3ebf4ac8c3e84bccdf5cd89aece74d69f2a7",
}, {
  token1: "ETH",
  token2: "USDT",
  poolAddress: "0xbba17b81ab4193455be10741512d0e71520f43cb",
  farmingAddress: "0xe22f6a5dd9e491dfab49faefdb32d01aaf99703e",
}]

const Pools = ONEINCH.map(a => { 
  return {
    address: a.farmingAddress,
    abi: _1INCH_FARMING_ABI,
    stakeTokenFunction: "mooniswap",
    rewardTokenFunction: "gift"
  }; }
)

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = {};

  let p = await loadMultipleSynthetixPools(App, tokens, prices, Pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }
  
  hideLoading();
}