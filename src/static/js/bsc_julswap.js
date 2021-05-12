$(function() {
consoleInit(main)
});

const JUL_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerNominated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"min","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"nominateNewOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nominatedOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Pools = [
  "0xf9d55665Db906bfFE65F83B59EA76256CEa52B89",
  "0x8a46d8d3c66094e2889f9564f164dca16ec6b5dd",
  "0x46e25c6c76a9434587bbf78ce6559aeb1e3bb1b2",
  "0xd832a99b3c789edb680ab80ecdaec6c3535d2f15",
  "0x5a04a1cb64a1a5b8c15e6f1e73992bf6c603bc00",
  "0x6b9ba09ebdd23becc9b43953990783a4eb841dc8",
  "0x4bf05da8ad08f7a7dfd1b3d4a8fd61e0cd9518e0",
  "0x54abc44a4bc364a06ada6408f3de57bc073abe91",
  "0x7d16d68f9bc4b5881a3c261a4ff473910bb28ba2",
  "0xad107b57d5488f330dfeaa8700fbe667386bb44f",
  "0xea08e442b862e4505370be2367b49f5cb620378e",
  "0x0647bb38cc2eb93b6a482e308cf264806f209bc7",
  "0x8417c58f7d128781d892c6e054ece64d9d8f6d1f",
  "0x266a8d094fdaa4292a288407302ab527812eca07",
  "0x40673dcf80ff7be9808ae474ceda1ebb0453565f",
  "0xc976c5f9b9fbf2f876f04049d6719251599b9bc1",
  "0x753950497ace062c0051f83b9a02c79cad5baae9",
  "0x966d7053337bfe74b23c2e8c053f96134070d301",
  "0xbbca189356cc0cbfbe8c2d08dd58cf40e75057df",
  "0x42b0cb1c9a2955d5b26977a6cbd6d0209b21f930",
  "0x7d191a5c86cff000a6b183c767f703ef1750b3c4",
  "0x258ca2c3ed8dcb04a2553100075ba4405072a404",
  "0xc08fa1d120e83e13b28d77be3b2837bc3e07127f",
  "0x0b57e79a3e3d6e6ca5766efecba3d4224b670a2e",
  "0x95fbad16d57aceb172ad659a8c34df32385b0445",
  "0x214692168f5c8a48ffe0d2e895844b0c0bf5139b",
  "0x371cce38b26f6a06dd61fabd50ba9d74ea2d58cc",
  "0x24adc534eb39d3b672018e6575c0c4b700cf9322",
  "0x2d57ca4358cfc05fbf57a02383b9c95240ff3bc3",
  "0x5c2c1befef358ec2c8b5422845c61a40cb479e2b",
  "0x497536e41e2baaa2dd2a8f4043806f36063c019b",
  "0xc33ba917e6a2a18f42d6e84e90131ead2604d2ee",
  "0xc9126462ea1c6934c0e1d1d45ffa6bfb6a7c6c25",
  "0x42ccb22f182db6154cda9e54029c33f8bd2dd6a2",
  "0x3e8d7f2147e0a0865625009e737bb5e9cc00b616",
  "0x6299ec1197a1196d78089af4ba053aaee28e16d0",
  "0x35edf72f4811c459082f5e20b772d27710bb2591",
  "0x76f2928925e0db48f8b17328813243fd8b4900ce",
  "0xfe9579e3c925f3baeed3b4f0e1e6ac486e76993f",
  "0xbe2d076d18bdcb8063c429a141884d3a1ac7711f",
  "0x1cbfb6f4451b2f1ad2e27ce77a35be6832938eb1",
  "0x572373d7394dfe6a37f42c62e7a4fd8f410853aa",
  "0xdfd298926d65b3bf049cccf886fe6e50103d9f28",
  "0x47bbee8249c2c67f75a9b1185bcc4c000c75d2ea"
  //"0x1a8f2f7e27257015926751aa447bee2862e0aa12", does not work
  //"0xf3aedbf38426ece22031a6d0b48e75cd0066d438"  does not work
  //"0xc48cb9e1b8993efc798d5368a8d84be172af51e9"  does not work
].map(a => {
  return {
    address: a,
    abi: JUL_STAKING_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardsToken"
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
