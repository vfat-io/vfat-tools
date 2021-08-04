
$(function() {
consoleInit(main)
});

const DFYN_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMaticPrices();

  const pools = DFYNtakingContracts.map(c => { return {
    address: c.stakingRewardAddress,
    abi: DFYN_STAKING_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardsToken"
  }})

  const customURLs = 
  {
    add: "https://exchange.dfyn.network/#/add",
    remove: "https://exchange.dfyn.network/#/remove",
    swap: "https://exchange.dfyn.network/#/swap",
    info: "https://info.dfyn.network/pair"
  }

  let p = await loadMultipleMaticSynthetixPools(App, tokens, prices, pools, customURLs)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

const DFYNtakingContracts = 
  [
    {
      //[Ue, ve],
      //ve,
      //1627142400,
      stakingRewardAddress: "0xbFE8679551Ee2CBA6A0FFDBa48AC29Ab89421A1F",
      //"v3",
      //"35"
  }, {
      //[Me, ye],
      //ye,
      //1627142400,
      stakingRewardAddress: "0x5661681563003189a02a21Ca352a08f4D2B7dc6b",
      //"v3",
      //"35"
  }, {
      //[Me, je],
      //je,
      //1627142400,
      stakingRewardAddress: "0xAE3b7B761FA5d19330E7b70f982e82a8514097F1",
      //"v3",
      //"35"
  }, {
      //[Ce, je],
      //je,
      //1627142400,
      stakingRewardAddress: "0xAA1c6DE472eE563Bc2D5c9414db0ab80C3D0B53e",
      //"v3",
      //"35"
  }, {
      //[ve, ye],
      //ye,
      //1627142400,
      stakingRewardAddress: "0x015a19cb6279F2c50fB197e1D83fA35C239521Bc",
      //"v3",
      //"35"
  }, {
      //[ve, be],
      //ve,
      //1627142400,
      stakingRewardAddress: "0x41b03D6146222C2EF99C4af4Bc54Ad879DDE65B4",
      //"v3",
      //"35"
  }, {
      //[be, ye],
      //ye,
      //1627142400,
      stakingRewardAddress: "0xF01261a698cd6331521CE6e1f9b17A011bf1c22E",
      //"v3",
      //"35"
  }, {
      //[ye, je],
      //ye,
      //1627142400,
      stakingRewardAddress: "0x83bF2d48626b86c11389BF1B38942Caf31B57149",
      //"v3",
      //"35"
  }, {
      //[ye, he],
      //ye,
      //1627142400,
      stakingRewardAddress: "0x0D11c2Be47cE813D72D5Ae5C94BE669DBD76BB35",
      //"v3",
      //"35"
  }, {
      //[je, he],
      //je,
      //1627142400,
      stakingRewardAddress: "0xe38298301670DEBbd10FdB350569D7984458F482",
      //"v3",
      //"35"
  }, {
      //[ke, je],
      //ke,
      //1627142400,
      stakingRewardAddress: "0x9C1f078085FEB02849edDE18bd28Aa688D20a7Ce",
      //"v3",
      //"35"
  }, {
      //[Ye, je],
      //je,
      //1627142400,
      stakingRewardAddress: "0xC20D2f5b9d2FD9E89f33aa0b400A8070f1008B50",
      //"v3",
      //"35"
  }, {
      //[Se, je],
      //je,
      //1627142400,
      stakingRewardAddress: "0x797fEd94a3865df1c2096a0e9a1cDfd194fe7150",
      //"v3",
      //"35"
  }, {
      //[Se, ye],
      //ye,
      //1627142400,
      stakingRewardAddress: "0x8FA2e1ae0180f42c7b39EB91C018879E55918145",
      //"v3",
      //"35"
  }, {
      //[Oe, ke],
      //ke,
      //1627142400,
      stakingRewardAddress: "0xc721F5d5BE5DDa564D9daC501757976F21ae8210",
      //"v3",
      //"35"
  }, {
      //[Ie, je],
      //je,
      //1627142400,
      stakingRewardAddress: "0x3481fd816CE3C1418bcDB1105F6D1b4c6B3a9823",
      //"v3",
      //"35"
  }, {
      //[Ie, ye],
      //ye,
      //1627142400,
      stakingRewardAddress: "0xcCf0565d6B15560eE0Bcaad6361CD565905CdcFa",
      //"v3",
      //"35"
  }, {
      //[He, ye],
      //ye,
      //1627142400,
      stakingRewardAddress: "0xDC87882BCb8A3F15DDEbCE9023bc4661FEa4dbA5",
      //"v3",
      //"35"
  }
]

