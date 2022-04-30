
$(function() {
consoleInit(main)
});

const OCX_STAKING_ABI = [{"type":"event","name":"FeeBurned","inputs":[{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"FeeCollected","inputs":[{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Unstaked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"changeUnstakingFeeRatio","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"checkPoints","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"feeBurn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getCheckPoints","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getRewardPerSecond","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getRewardThenStake","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"}],"name":"getTotalEmittedTokens","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"},{"type":"uint256","name":"_startingCheckPoint","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address","name":"_rewardsToken","internalType":"address"},{"type":"address","name":"_stakingToken","internalType":"address"},{"type":"uint256","name":"emissionStart","internalType":"uint256"},{"type":"uint256","name":"firstCheckPoint","internalType":"uint256"},{"type":"uint256","name":"_rewardPerSecond","internalType":"uint256"},{"type":"address","name":"admin","internalType":"address"},{"type":"bool","name":"_feeBurn","internalType":"bool"},{"type":"uint256","name":"_unstakingFeeRatio","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"initialized","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"newUnstakingFeeRatio","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"pendingOwner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerSecond","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardsToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setFeeBurn","inputs":[{"type":"bool","name":"_feeBurn","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setNewUnstakingFeeRatio","inputs":[{"type":"uint256","name":"_newUnstakingFeeRatio","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"showPendingReward","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"stakes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20Burnable"}],"name":"stakingToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startingCheckPoint","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalStake","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"},{"type":"bool","name":"direct","internalType":"bool"},{"type":"bool","name":"renounce","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferStake","inputs":[{"type":"address","name":"_recipient","internalType":"address"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unstake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"maximumFee","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"unstakingFeeDenominator","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"unstakingFeeRatio","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"unstakingFeeRatioTimelock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"unstakingFeeRatioTimelockPeriod","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateSchedule","inputs":[{"type":"uint256","name":"checkPoint","internalType":"uint256"},{"type":"uint256","name":"_rewardPerSecond","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawFee","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]

const Addresses = [
  "0x52e5ab28e0e1ae31F47E641232E555E45aA1B633",
  "0xE2a525Ac8b8d69A0Bd28fb45e9DFE52E96c85b32",
  "0x7862cb7000219b7b6EDB3f19Be6146ac71f1bfeE",
  "0x64fF2DAf1c408194997eE9667c180e3Be253E92E",
  "0xD858B37Bc72A999D761d7F02C455Af33889527e3",
  "0xd6edD59554c35B5365d6440ECe932d0B2EBEfddA",
  "0xAc6b993a6048Bda3e3D6A5B7F82aD343Fc02448a",
  "0x9c8A8D86ad3d903cE8FD064f3AfBAE3404a8D69C",
  "0x53E6A863E32F2C8d0b21e063A449E4E5071240b5",
  "0x1c2777D143f16d6D599c49333A83F49fFc9202Ae",
  "0x08DEF7C0a36d9caDF83580aa8c5a4aACCdeF2C89",
  "0x699338D863C36a06F2078d58a4b4e8795D79dfC3",
  "0xB9B5e91641eb2Ad40140F4aB4D1e919F40Ac9E70",
  "0x13a28a2516835B1b67bC04c55aC59330543c22e0",
  "0xFD3B0c0ed76A577b31254c21c6dFfB017024F8E9",
  "0x4Ba4eA12411fa62456C64AF8a2B2F7E3A35Ec258",
  "0x067395D2532BA849130a9ce96A21ED3E236e6584",
  "0x74E151B2841D9D92cE5e8aeBA1a6592239b799bc",
  "0x99a59791ec2EaB94EE10aD2fA5979B4beCD2c676",
  "0x723bfe4565bb027c04C828B5752a1420b94cacF1",
  "0x3Cef1c1e05F0F2f3504Cd09FaD5bB2c046EBf4E1",
  "0x43e2b34ebd7690e3208a0406e06BD8060D090703",
  "0xF00751d22AF56c0A20856B465c3AB5bDf7B84Ac2"
]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMilkomedaPrices();

  const pools = Addresses.map(a => { return {
    address: a,
    abi: OCX_STAKING_ABI,
    stakeTokenFunction: "uniToken",
    rewardTokenFunction: "lqtyToken"
  }})

  let p = await loadMultipleMilkomedaSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}
