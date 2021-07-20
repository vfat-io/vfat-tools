
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
  [{
    stakingRewardAddress: "0x35A3a9DF5F0E2dFf08FBA3ece64Ea5faeD7D3b18"
  }, {
    stakingRewardAddress: "0x8555b37C21F78F0B73d905b9c2923EB3A3efe7bc"
  }, {
    stakingRewardAddress: "0xF2BaEc3ECA845A6762863C6159b223E871f5ceAe"
  }, {
    stakingRewardAddress: "0x9Eabb8DcBFc062E3fD445E4028D617C0b6F3eaf1"
  }, {
    stakingRewardAddress: "0x98D7c004C54C47b7e65320Bd679CB897Aae6a6D6"
  }, {
  //tokens: [Oe, ce],
  //baseToken: ce,
  //startTime: 1624550400,
  stakingRewardAddress: "0xeee84F55F493c6ea89b655FFF09F2a2f9C2D1Dd8",
  //version: "v2"
}, {
  //tokens: [Oe, he],
  //baseToken: he,
  //startTime: 1624550400,
  stakingRewardAddress: "0x17e8732E2f0f6c35a794e9db4e63AeaDa9ce927C",
  //version: "v2"
}, {
  //tokens: [Ee, he],
  //baseToken: he,
  //startTime: 1624550400,
  stakingRewardAddress: "0xA51aF13F630489eE77B4489844041031e4e36824",
  //version: "v2"
}, {
  //tokens: [se, ce],
  //baseToken: ce,
  //startTime: 1624550400,
  stakingRewardAddress: "0xa55D1729eF64755D44640C67feA6D18A44EE9326",
  //version: "v2"
}, {
  //tokens: [ue, se],
  //baseToken: se,
  //startTime: 1624550400,
  stakingRewardAddress: "0xf01adB0eF728D4544E9a1E3543FC98F0C1CAE7FD",
  //version: "v2"
}, {
  //tokens: [ue, ce],
  //baseToken: ce,
  //startTime: 1624550400,
  stakingRewardAddress: "0xbd7BD38EC111A1789158b25240B5DaAE043113aE",
  //version: "v2"
}, {
  //tokens: [he, ce],
  //baseToken: ce,
  //startTime: 1624550400,
  stakingRewardAddress: "0x12286A4a13FCAFB77f08c48A00e6963A0ca6d917",
  //version: "v2"
}, {
  //tokens: [pe, ce],
  //baseToken: ce,
  //startTime: 1624550400,
  stakingRewardAddress: "0x39a7733e5F418a5F4c11A2212f085F0a776Ac7D3",
  //version: "v2"
}, {
  //tokens: [pe, he],
  //baseToken: he,
  //startTime: 1624550400,
  stakingRewardAddress: "0xCf32aF39BC10BAd0E193630E4E49b0Fa44867E7B",
  //version: "v2"
}, {
  //tokens: [ge, he],
  //baseToken: he,
  //startTime: 1624550400,
  stakingRewardAddress: "0xC79FC48EC33038e80531B14b1efE0C8cAb50747A",
  //version: "v2"
}, {
  //tokens: [Fe, he],
  //baseToken: he,
  //startTime: 1624550400,
  stakingRewardAddress: "0xbE6D6BA111E459610646FD4234005331af49179F",
  //version: "v2"
}, {
  //tokens: [Ae, he],
  //baseToken: he,
  //startTime: 1624550400,
  stakingRewardAddress: "0xC9091079b96fc51df933720b5071c0B0d18EF785",
  //version: "v2"
}, {
  //tokens: [Ae, ce],
  //baseToken: ce,
  //startTime: 1624550400,
  stakingRewardAddress: "0xf8f7F41BC59f37cfC19794CB41Ec37073fc98E5f",
  //version: "v2"
}, {
  //tokens: [ve, ge],
  //baseToken: ge,
  //startTime: 1624550400,
  stakingRewardAddress: "0x9b0E341661E8A993BBe3dd4b1d2484f100A55BB4",
  //version: "v2"
}, {
  //tokens: [xe, he],
  //baseToken: he,
  //startTime: 1624550400,
  stakingRewardAddress: "0xE504196B11dE48Da00872697f4683F5596dc8E8E",
  //version: "v2"
}, {
  //tokens: [xe, ce],
  //baseToken: ce,
  //startTime: 1624550400,
  stakingRewardAddress: "0xF4B0Dfe49aa35463D40d2FFAe47006990Ae10465",
  //version: "v2"
}, {
  //tokens: [Ue, ce],
  //baseToken: ce,
  //startTime: 1624550400,
  stakingRewardAddress: "0x6aa7f7cD7185905948951ab10E5FAE65d4Ab883D",
  //version: "v2"
}]

