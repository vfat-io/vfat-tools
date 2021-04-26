
$(function() {
  consoleInit();
  start(main);
});

const GALAXY_STAKING_ABI = [{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[{"type":"address","name":"_rewardsDistribution","internalType":"address"},{"type":"address[]","name":"_rewardTokens","internalType":"address[]"},{"type":"address","name":"_stakingToken","internalType":"address"}]},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"address","name":"rewardToken","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"exit","inputs":[],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"getReward","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[{"type":"address","name":"rewardToken","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"address","name":"rewardToken","internalType":"address"},{"type":"uint256","name":"reward","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"rescueFunds","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"address","name":"receiver","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardLastUpdatedTime","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[{"type":"address","name":"rewardToken","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"rewardTokens","inputs":[{"type":"uint256","name":"","internalType":"uint256"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"rewardsDistribution","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsDuration","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsPerTokenMap","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"stakeWithPermit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address[]","name":"","internalType":"address[]"},{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"stakerBalances","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakingToken","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenRewardRate","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}],"constant":false}]

async function main() {  
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMaticPrices();

  const pools = GALAXY_POOLS.map(c => { return {
    address: c,
    abi: GALAXY_STAKING_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardTokens"
  }})

  //There are more than one rewards, rewardTokens function needs a parameter

  //await loadMaticSynthetixPoolInfo(App, tokens, prices, pools[1].abi, pools[1].address,
    //pools[1].rewardTokenFunction, pools[1].stakeTokenFunction)

  let p = await loadMultipleMaticSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }
  
  hideLoading();
}

const GALAXY_POOLS = [
  "0x1ef43d468D8Be2771646D7582e0d8A96DC64CAe8",
  "0xba847Ca5a3D361F0902FbE13526B68e78E70Daf5",
  "0x29028198437136DDfcF00D0a0365202a51BB00A4",
  "0xfE7FfA5E1d645F8e95b9A7D2d5895515A18ebC5F",
  "0xd6098C3Fb1b425D1016C779bAd675abeE74576B8",
  "0x2F859D249C2BB59c0278E21CcbaC1C46a32A380f",
  "0xaeE8E3edeFf09eB6b24051114974cEcb8b8422e4",
  "0x1C8cC4822def4f0f14Bd3C8A26a150c1B0BFd89D",
  "0x7E53eCAaeeCb5d4c0A1F33884aeb6E1Bd25E6fdf",
  "0x3Cc167eFA281f1a6120f96aF2F2537d6DdD469ac",
  "0xB3a2bA62802dF29e32Bb78Ff58f0dED8a36c321d"
]

/*const GALAXY_POOLS = [
  "0x20f0ea9fe25efd3ae5cd73b0f010c57dd38a2e46",
  "0x1ef5f6248bd4f7b54fdc9ff35ce9479b702add9b",
  "0x1b25321cb3cdfbfd86cae2249a38365a498dc036",
  "0x47192bbfded719ecdda66790d841c3cac91ada46",
  "0xe0bd98181c73cdb22ccaeb8016d8a92700c8843d",
  "0x1ef43d468D8Be2771646D7582e0d8A96DC64CAe8",
  "0xba847Ca5a3D361F0902FbE13526B68e78E70Daf5",
  "0x29028198437136DDfcF00D0a0365202a51BB00A4",
  "0xfE7FfA5E1d645F8e95b9A7D2d5895515A18ebC5F",
  "0xd6098C3Fb1b425D1016C779bAd675abeE74576B8",
  "0x2F859D249C2BB59c0278E21CcbaC1C46a32A380f",
  "0xaeE8E3edeFf09eB6b24051114974cEcb8b8422e4",
  "0x1C8cC4822def4f0f14Bd3C8A26a150c1B0BFd89D",
  "0x7E53eCAaeeCb5d4c0A1F33884aeb6E1Bd25E6fdf",
  "0x3Cc167eFA281f1a6120f96aF2F2537d6DdD469ac",
  "0xB3a2bA62802dF29e32Bb78Ff58f0dED8a36c321d"
]*/