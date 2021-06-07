
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

const DFYNtakingContracts =  [
  {
	// tokens: [DFYN, USDC],
	// baseToken: USDC,
	stakingRewardAddress: "0x24a5256589126a0eb73a1a011e22C1c838890Ced"
  },
  {
	// tokens: [DFYN, ETHER],
	// baseToken: ETHER,
	stakingRewardAddress: "0xE4F8C4722Aa44bFf5c99ba64c0bC39C6d883CcB6"
  },
  {
	// tokens: [WBTC, ETHER],
	// baseToken: ETHER,
	stakingRewardAddress: "0x370737D328cf8DfD830fFFf51Dd9c972345e6Fee"
  },
  {
	// tokens: [USDT, USDC],
	// baseToken: USDC,
	stakingRewardAddress: "0xf786Ba582AbbE846B35E6e7089a25B761eA54113"
  },
  {
	// tokens: [DAI, USDT],
	// baseToken: USDT,
	stakingRewardAddress: "0x32B73E973057d309d22EC98B50a8311C0F583Ad3"
  },
  {
	// tokens: [ETHER, USDC],
	// baseToken: USDC,
	stakingRewardAddress: "0x694351F6dAfe5F2e92857e6a3C0578b68A8C1435"
  },
  {
	// tokens: [ROUTE, ETHER],
	// baseToken: ETHER,
	stakingRewardAddress: "0xf162a26aCc064B88a0150a36d7B38996723E94D7"
  },
  {
	// tokens: [WMATIC, DFYN],
	// baseToken: DFYN,
	stakingRewardAddress: "0x376920095Ae17e12BC114D4E33D30DFda83f8EfB"
  },
  {
	// tokens: [WMATIC, ETHER],
	// baseToken: ETHER,
	stakingRewardAddress: "0x0BADA377367f4937bdf6A17FdaeeB0b798051c91"
  },
  {
	// tokens: [UNI, ETHER],
	// baseToken: ETHER,
	stakingRewardAddress: "0x3cA3f35b081CD7c47990e0Ef5Eed763b54F22874"
  },
  {
	// tokens: [AAVE, ETHER],
	// baseToken: ETHER,
	stakingRewardAddress: "0x80dF5A040E045817AB75A4214e29Dc95D83f1118"
  }
]