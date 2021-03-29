
$(function() {
  consoleInit();
  start(main);
});

const MATIC_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

async function main() {  
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMaticPrices();

  const pools = ComethStakingContracts.map(c => { return {
    address: c.stakingRewardAddress,
    abi: MATIC_STAKING_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardsToken"
  }})


  let p = await loadMultipleMaticSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }
  
  hideLoading();
}

const ComethStakingContracts =  [
  {
    //tokens: [MATIC_WETH, MATIC_USDC],
    stakingRewardAddress: '0x1c30Cfe08506BA215c02bc2723C6D310671BAb62'
  },
  {
    //tokens: [MATIC_WETH, MUST],
    stakingRewardAddress: '0x2cc6a7A06B32E0796D8f9225E2e33ae51C93d715'
  },
  {
    //tokens: [WMATIC, MUST],
    stakingRewardAddress: '0x2328c83431a29613b1780706E0Af3679E3D04afd'
  },
  {
    //tokens: [SDCRVRENWSBTC, SDT],
    stakingRewardAddress: '0xBfa28f54682678cFc4B71C0a9430fb3EEc5b90Bf'
  },
  {
    //tokens: [SD3CRV, SDT],
    stakingRewardAddress: '0x38ce9B00cfFab9Ff6070a454A7603D77B88675bF'
  },
  {
    //tokens: [MAUSDC, MATIC_USDC],
    stakingRewardAddress: '0x9512080848be125Bd900cBBa3B0454742D11FA93'
  },
  {
    //tokens: [SDT, MUST],
    stakingRewardAddress: '0x8e0dc90E432c3F234d24aa2CB47dD31cF2Ad8429'
  },
  {
    //tokens: [AAVE, MUST],
    stakingRewardAddress: '0x642A056F790af3eDa4F5639aDc54083285186D90'
  },
  {
    //tokens: [GHST, MUST],
    stakingRewardAddress: '0x03A2C998A05B544B236fd51A44EFe6505eb33a9a'
  },
  {
    //tokens: [SDCRVRENWSBTC, WBTC],
    stakingRewardAddress: '0x90261B5B1Bf708EA264A60556e31d6b4eA481E48'
  },
  {
    //tokens: [MAUSDC, MUST],
    stakingRewardAddress: '0x31a8fCe4d069191900E91B4Ba4bF3F3E7d1c7338'
  },
  {
    //tokens: [JULIEN, MUST],
    stakingRewardAddress: '0x83bb796fBc69E013726129f768069e456CaDeA2b'
  },
  {
    //tokens: [SDEURSCRV, SDT],
    stakingRewardAddress: '0x80190aF6c79f654cC5c05038b14c4BE1685f4544'
  },
  {
    //tokens: [SDT, MATIC_USDC],
    stakingRewardAddress: '0x19aA3B72aC5423D8e3675372b4C5B89785Ed0896'
  },
  {
    //tokens: [SUSHI, MUST],
    stakingRewardAddress: '0xFAd897402C0A70440e79A9Da6aAfb8a19D94D5eA'
  },
  {
    //tokens: [WETH, WBTC],
    stakingRewardAddress: '0xd6161AdBf80602f0ecf74F92ce0271556ddbf98B'
  },
  {
    //tokens: [MUST, MATIC],
    stakingRewardAddress: '0x449A45A2Db94Fb4cD14f7Af4FD2322649492225A'
  }
]