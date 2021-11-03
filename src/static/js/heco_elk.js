
$(function() {
consoleInit(main)
  });

const ELK_HECO_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const ElkAddresses = [
  "0x8778d529239226F54CE4b2Ce06430D5D66297310",
  "0x52314cA8E9132fDa1A9fdCe4bebed45915A7E92b",
  "0x0a3762671C70263b074cA549280e320aC6e7805f",
  "0x312a719aE947bBbaD1CB9efB46141e4E1b6D709A",
  "0xA38b6da2d3a6064B3eDB624F5b0Def8Ab8E8526d",
  "0x02F4e833Eb4a07918416CDc7A19fA03CFfB77e04",
  "0x41EE76C8e649a8426B02d4d1A3B28D473bCB825A",
  "0xb07fd47ae776377cf39dbeF6c244Ad019a31dD8C",
  "0xc7BFaDe56efAeC48fA015b1dF473654b35Ea0737",
  "0xe8817638869856D1F577Dc2A7cbAD6E05aFD9E8b",
  "0x9161F14c57350E4c859AFBCdc942E4cEEa6b85e1",
  "0x38cef38B71D98c8e13ADB887e0623FFE93a828a5",
  "0xB2f0a8E62A1AdAf04AD7A899679aC88C5134A1C4",
  "0xf587968165975A716c26C56aFd6ecBf6AA2D2738",
  "0x4A49c43634761767460CcE8Cb0B56718821626dC",
  "0xeDfceB2E6495914326002436Df07C7358C55888f",
  "0x1f4598DF4d31f03f3f93bA420848d35D933C54b2",
  "0x3604408271b5d326BD4Ac13e64850BFcc0702B12",
  "0xc1b68510Ab04eE7181aad79a4fd73B96653Ef008"
];

const ElkPools = ElkAddresses.map(a => {
  return {
    address: a,
    abi: ELK_HECO_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardsToken"
  }; }
)
async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = await getHecoPrices();

  await loadHecoSynthetixPoolInfo(App, tokens, prices, ElkPools[3].abi, ElkPools[3].address,
    ElkPools[3].rewardTokenFunction, ElkPools[3].stakeTokenFunction);

  let p0 = await loadMultipleHecoSynthetixPools(App, tokens, prices, ElkPools)
  _print_bold(`Total staked: $${formatMoney(p0.staked_tvl)}`);
  if (p0.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p0.totalUserStaked)} at an APR of ${(p0.totalApr * 100).toFixed(2)}%\n`);
  }

  hideLoading();
  }