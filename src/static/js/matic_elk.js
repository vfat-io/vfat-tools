
$(function() {
consoleInit(main)
});

const ELK_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMaticPrices();

  const pools = ELKStakingContracts.map(c => { return {
    address: c.stakingRewardAddress,
    abi: ELK_STAKING_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardsToken"
  }})

  await loadMaticSynthetixPoolInfo(App, tokens, prices, pools[1].abi, pools[1].address,
    pools[1].rewardTokenFunction, pools[1].stakeTokenFunction)

  let p = await loadMultipleMaticSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

const ELKStakingContracts = [
{
  //tokens: [f.p[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0xa11d266e9f9ED8eDCF4215a6B4de868121725112"
}, {
  //tokens: [we[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x6888F980057626Fd978974012e0C13bB3542D2eA"
}, {
  //tokens: [ke[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x697Bd6B3bD203ced4dbBA11a8A9218d03b2A2000"
}, {
  //tokens: [je[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x55e30bCdce0f973eBB4a0781f7aeE442eAd6Ae2c"
}, {
  //tokens: [Ce[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x411c3B40FEE09Be56fB894ca68A8D9784FB9fa16"
}, {
  //tokens: [Ie[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x552F7f21226ecD695245E1f149acA63361a88199"
}, {
  //tokens: [Te[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0xEFC017fb96401F72626f6C6709517f53A7b68641"
}, {
  //tokens: [Me[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0xe89362B911C567D14844F9372E649B823F4b5bBc"
}, {
  //tokens: [Ue[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x5C7628D53E11b018eF5f6654323e927414D52Aa7"
}, {
  //tokens: [Be[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x6DBDFC9f5DbAE52e8f9D8730187ae5516B84DEb8"
}, {
  //tokens: [Re[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x83155dd485b2DA438a5341091102F9d8ce2816C9"
}, {
  //tokens: [Le[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x9AA68E54C52AF5E31359AB56572372fB7f023364"
}, {
  //tokens: [De[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x04c25Ab761F9518C6c43d6835e76736f06696DfE"
}, {
  //tokens: [Fe[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x64a27f4D1ed590D6fb68F6364b2Ff07DD51FCB11"
}, {
  //tokens: [ze[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0x3d6d982a91d94C6AD3F7dcA04EB94e7eeCce5fA4"
}, {
  //tokens: [Pe[f.c.MATIC], xe[f.c.MATIC]],
  stakingRewardAddress: "0xCa29fB67bbb8F16B7eFB986EBe91CB9490842560"
}]