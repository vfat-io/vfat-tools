
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
    stakingRewardAddress: "0xB5dd5B9b4D1998Ee5BCe686e37c4Dd70CBc18978"
  },{
    stakingRewardAddress: "0xB268B2934E9EE98aa4F00c78719e287414A45826"
  },{
    stakingRewardAddress: "0xDA88DBfb6D4547e82049Cef4dBe6107C3F2A6b24"
  },{
    stakingRewardAddress: "0xBCb71316552f1eD37641b05376c938570d424d13"
  },{
    stakingRewardAddress: "0x940010EFFc31830355ECA48A621eeBBBE00B965c"
  },{
    stakingRewardAddress: "0xA6AF5f32F889E062240536EC04A32d36e6F68027"
  },{
    stakingRewardAddress: "0x1D03AA1ae2De91eAAe30995ED29aAceE99C98348"
  },{
    stakingRewardAddress: "0x6FA9b8b80E15CB1E67A7Fd0414a21955254CDf83"
  },{
    stakingRewardAddress: "0x20d9176eb6756b629ba7E8F4446ac3029bdd086d"
  },{
    stakingRewardAddress: "0x7ad73fDD84b44F974C6ed2c682F82b614d1fE545"
  },{
    stakingRewardAddress: "0x47Bd0382eBD06f80AFa9F8d17660e7F9f3c5AdaB"
  },{
    stakingRewardAddress: "0x5c6a3b0F8855f2D2d853A5f445745F03AD9a15Dc"
  },{
    stakingRewardAddress: "0x77f1746DdfefDc766E2d688ec720451664B3C611"
  },{
    stakingRewardAddress: "0x542fF835fa2Af9d484F534D32cb981E1451d4a13"
  },{
    stakingRewardAddress: "0x646b5e8e317ce1c15b97a9B3679071894D44d4a3"
  },{
    stakingRewardAddress: "0x7e848a4ABd9b5F73f7354d8e72A5e244370e26e1"
  },{
    stakingRewardAddress: "0xe434251BbcD5736C018d3fFbE7A323ed913B65D8"
  },{
    stakingRewardAddress: "0x7E0b5724e136EB142e8459448AFD3EB5643875d9"
  },{
    stakingRewardAddress: "0x47aa625B1F72B3eb80F0CA3423A3BfF1daFD7E09"
  },{
    stakingRewardAddress: "0xF506d6925CE39755cc43ecF56A6f79B598Fa28Cc"
  },{
    stakingRewardAddress: "0x562F54F87179E6aC462920721f7fa1d1258fEA32"
  },{
    stakingRewardAddress: "0xA8888b5c465A34Df61837db9FDfb413fB6d8558B"
  },{
    stakingRewardAddress: "0xC0BAb0b3725f0423Faa65549f6E517480f2bEa02"
  },{
    stakingRewardAddress: "0x6c87dC1FeB36FCDfEd3dD93c8F61eeC305A0f366"
  },{
    stakingRewardAddress: "0x9C5b03827a212e013C79C76d42aC714C0C1F3184"
  },{
    stakingRewardAddress: "0xe1D3F9F9047313C3970271C1ceb8cf20604d71B4"
  }]