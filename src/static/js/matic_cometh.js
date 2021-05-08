
$(function() {
consoleInit(main)
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
    //tokens: [MAUSDC, MATIC_USDC],
    stakingRewardAddress: '0x9512080848be125Bd900cBBa3B0454742D11FA93'
  },
  {
    //tokens: [JULIEN, MUST],
    stakingRewardAddress: '0x83bb796fBc69E013726129f768069e456CaDeA2b'
  },
  {
    //tokens: [SDT, MUST],
    stakingRewardAddress: '0x8e0dc90E432c3F234d24aa2CB47dD31cF2Ad8429'
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
    //tokens: [GHST, MUST],
    stakingRewardAddress: '0x03A2C998A05B544B236fd51A44EFe6505eb33a9a'
  },
  {
    //tokens: [AAVE, MUST],
    stakingRewardAddress: '0x642A056F790af3eDa4F5639aDc54083285186D90'
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
    //tokens: [NDR, MUST],
    stakingRewardAddress: '0x26FFeB3452a8D5B507cB6dcc4EcA05d33D926AF7'
  },
  {
    //tokens: [AZUKI, MATIC_WETH],
    stakingRewardAddress: '0x461CB0b067eBD1A402f0ed32caE1b89d42796E94'
  },
  {
    //tokens: [AZUKI, MUST],
    stakingRewardAddress: '0x6c99E24FcC6C6a3511057B5655369245A2298106'
  },
  {
    //tokens: [PICKLE, MUST],
    stakingRewardAddress: '0x52f68A09AEe9503367bc0cda0748C4D81807Ae9a'
  },
  {
    //tokens: [MATIC_WETH, WBTC],
    stakingRewardAddress: '0xd6161AdBf80602f0ecf74F92ce0271556ddbf98B'
  },
  {
    //tokens: [BBADGER, MUST],
    stakingRewardAddress: '0x363d359B3B165E9cBF85088cB6C4EfF4d4338B73'
  },
  {
    //tokens: [BDIGG, MUST],
    stakingRewardAddress: '0x3268BD010Ec504e6CFfB349009Ec1AFCA868d292'
  },
  {
    //tokens: [XSDT, MUST],
    stakingRewardAddress: '0x67659dF49823f026E98afB2e9703C4D616EDB168'
  },
  {
    //tokens: [XSDT, SDT],
    stakingRewardAddress: '0xfb23843D3561a3bC73BB14855286Bd4b0b3E15C6'
  },
  {
    //tokens: [SDEURSCRV, XSDT],
    stakingRewardAddress: '0x3Bda027733d5f1F2664583ab5FB3B9097eB38F12'
  },
  {
    //tokens: [SD3CRV, XSDT],
    stakingRewardAddress: '0xd3753dD9686549Ca458C5AFA7079C7Cf834396FE'
  },
  {
    //tokens: [SDCRVRENWSBTC, XSDT],
    stakingRewardAddress: '0xf5d2E95D90bf8959cdEF08628bafA0D7d0bfc8F7'
  },
  {
    //tokens: [MATIC_USDC, MUST],
    stakingRewardAddress: '0x1C678EA856B368CC361A3389734fe451fEC8CEea'
  },
  {
    //tokens: [WBTC, MUST],
    stakingRewardAddress: '0x449A45A2Db94Fb4cD14f7Af4FD2322649492225A'
  },
  {
    //tokens: [AMUSDC, MUST],
    stakingRewardAddress: '0x05cd83A952DF784Fc7856241822d2f109678Df72'
  },
  {
    //tokens: [WMATIC, AMUSDC],
    stakingRewardAddress: '0x6633195293eCE07274Ff8641E732c50625DD67Ee'
  },
  {
    //tokens: [AMWMATIC, WMATIC],
    stakingRewardAddress: '0x9477D5496ee5f758b26FFAb540a0F5cc4C48D157'
  },
  {
    //tokens: [AMWMATIC, MUST],
    stakingRewardAddress: '0xc363539ce034E61Ec6D4d913313AabC628E9A848'
  },
  {
    //tokens: [WMATIC, AMUSDT],
    stakingRewardAddress: '0xf624aFd0F01417A53c99C5E9bD7E7462DFc0a22d'
  },
  {
    //tokens: [AMUSDT, MUST],
    stakingRewardAddress: '0x303cAb00442D517D3a2b5d39649E931E21011790'
  },
  {
    //tokens: [WMATIC, AMDAI],
    stakingRewardAddress: '0x9FC212f2c2e4A8C9946aCA414aB96d7f02eB3094'
  },
  {
    //tokens: [AMDAI, MUST],
    stakingRewardAddress: '0xd0C5cCB10AA58DaADb1E49773DEF3Be399d6210D'
  },
  {
    //tokens: [WMATIC, AMWBTC],
    stakingRewardAddress: '0x604E15beDe79e02458b5eF63891c1A70E42D12a2'
  },
  {
    //tokens: [AMWBTC, MUST],
    stakingRewardAddress: '0x7D0ef2867Eb5CCfd3D38A66BAa6e372D43c6e8B9'
  },
  {
    //tokens: [AMWETH, MUST],
    stakingRewardAddress: '0x992C4Ba9C63730e3B4B3B45Cb90a837D1649fcB6'
  },
  {
    //tokens: [WMATIC, AMWETH],
    stakingRewardAddress: '0xC6043B364BCB4A7df78b6d244C763dE8380c8AA8'
  },
  {
    //tokens: [AMAAVE, WMATIC],
    stakingRewardAddress: '0x030ABe63Fcc1c0a86769553222B3cC648D44980e'
  },
  {
    //tokens: [AMAAVE, MUST],
    stakingRewardAddress: '0x06FE1A75D2C8dAb828a61c5D87bb6f5bb3D41Ec0'
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
    //tokens: [SDEURSCRV, SDT],
    stakingRewardAddress: '0x80190aF6c79f654cC5c05038b14c4BE1685f4544'
  }
]
