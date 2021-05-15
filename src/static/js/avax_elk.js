$(function() {
consoleInit(main)
});

const ELK_CONTRACT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_rewardsToken","internalType":"address"},{"type":"address","name":"_stakingToken","internalType":"address"}]},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardsDurationUpdated","inputs":[{"type":"uint256","name":"newDuration","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverERC20","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardsToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardsDuration","inputs":[{"type":"uint256","name":"_rewardsDuration","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stakeWithPermit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakingToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePeriodFinish","inputs":[{"type":"uint256","name":"timestamp","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]

const Pools = [
  {
    //tokens: [xe[f.c.AVALANCHE], f.p[f.c.AVALANCHE]],
    stakingRewardAddress: "0x9080Bd46a55f8A32DB2B609C74f8125a08DafbC3"
  }, {
    //tokens: [xe[f.c.AVALANCHE], we[f.c.AVALANCHE]],
    stakingRewardAddress: "0x4235F9bE035541A69525Fa853e2369fe493BA936"
  }, {
    //tokens: [xe[f.c.AVALANCHE], je[f.c.AVALANCHE]],
    stakingRewardAddress: "0x777e391521a542430bDD59Be48b1eAc00117427c"
  }, {
    //tokens: [xe[f.c.AVALANCHE], Ce[f.c.AVALANCHE]],
    stakingRewardAddress: "0x2D9C1e87595c6ED24CfEC114549A955b7023E1a9"
  }, {
    //tokens: [xe[f.c.AVALANCHE], Ie[f.c.AVALANCHE]],
    stakingRewardAddress: "0xE18ae29256ee2d31f7A4AA72567fde1FF7d9895e"
  }, {
    //tokens: [xe[f.c.AVALANCHE], Te[f.c.AVALANCHE]],
    stakingRewardAddress: "0xfeeFf2fcb7fE9f3211abE643c3f49f3a4F04063A"
  }, {
    //tokens: [xe[f.c.AVALANCHE], Oe[f.c.AVALANCHE]],
    stakingRewardAddress: "0xC1E72BF3F97505537AdAd52639F3Bbf2DF5E5736"
  }, {
    //tokens: [xe[f.c.AVALANCHE], Qe[f.c.AVALANCHE]],
    stakingRewardAddress: "0x9bC04d39a721b48Ca33700214961aC5cC3622f76"
  }, {
    //tokens: [xe[f.c.AVALANCHE], Ve[f.c.AVALANCHE]],
    stakingRewardAddress: "0x99Ef222dBA70eb0A396115D3ad0633C88bc73582"
  }, {
    //tokens: [xe[f.c.AVALANCHE], We[f.c.AVALANCHE]],
    stakingRewardAddress: "0xA8d91C6093b700897e4654a71BE67fE017f10098"
  }, {
    //tokens: [xe[f.c.AVALANCHE], Ge[f.c.AVALANCHE]],
    stakingRewardAddress: "0x621B5aDC58ccE0F1EfA0c51007Ab9A923213f759"
  }, {
    //tokens: [xe[f.c.AVALANCHE], Ne[f.c.AVALANCHE]],
    stakingRewardAddress: "0xb961966caE73a66E96D22965dE8D253c0FcBcf04"
  }, {
    //tokens: [xe[f.c.AVALANCHE], Ye[f.c.AVALANCHE]],
    stakingRewardAddress: "0xec4676aAAE8B958464d087d4FaaA6731F0596ae9"
  }, {
    //tokens: [xe[f.c.AVALANCHE], He[f.c.AVALANCHE]],
    stakingRewardAddress: "0x325d72D3d0806fD2A45a6C44E3e51D18D8187117"
  }, {
    //tokens: [xe[f.c.AVALANCHE], qe[f.c.AVALANCHE]],
    stakingRewardAddress: "0x0DA14647cc52cD93cD5c57Bb67dC45de4CD12EF1"
  }
].map(p => {
  return {
    address: p.stakingRewardAddress,
    abi: ELK_CONTRACT_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardsToken"
  }; }
)

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  let tokens = {};
  let prices = await getAvaxPrices();

  await loadAvaxSynthetixPoolInfo(App, tokens, prices, Pools[0].abi, Pools[0].address, Pools[0].rewardTokenFunction, Pools[0].stakeTokenFunction);

  let p = await loadMultipleAvaxSynthetixPools(App, tokens, prices, Pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}