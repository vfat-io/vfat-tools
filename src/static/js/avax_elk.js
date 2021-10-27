$(function() {
consoleInit(main)
});

const ELK_CONTRACT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_rewardsToken","internalType":"address"},{"type":"address","name":"_stakingToken","internalType":"address"}]},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardAdded","inputs":[{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"reward","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RewardsDurationUpdated","inputs":[{"type":"uint256","name":"newDuration","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"exit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"getReward","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRewardForDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastTimeRewardApplicable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"notifyRewardAmount","inputs":[{"type":"uint256","name":"reward","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"periodFinish","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverERC20","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenStored","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewards","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardsDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"rewardsToken","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardsDuration","inputs":[{"type":"uint256","name":"_rewardsDuration","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stakeWithPermit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"stakingToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePeriodFinish","inputs":[{"type":"uint256","name":"timestamp","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userRewardPerTokenPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}]

const Pools = [
  "0x9ec3ca469F415a7e55A21Dc662D427d59e8De8F6",
  "0xAfdb3f79ac7DE9d8E95C6e774F222959Cc99E889",
  "0xa4F5447cE95Fe4Cdb7eCD023d6Ea0274b85A27fF",
  "0xD3641c0EbE0361DE44d0298e165943B6B0422D98",
  "0x482dCc1B2477D44aF818d7A9b0d1F545356CB58a",
  "0x6609B69a3EA9f8239dce55E99Ff349517525326d",
  "0x5cC7B78432140b7a8dD955D51F3d9ba4E707b65e",
  "0xAD7185FE19EF6607ab7631749373A261461ADf7C",
  "0xc2c8944B0c66EcA1b55dC9f9c959c1D6ac77F70E",
  "0x676f108f321585d3194b9bda29698BbAE277f3cD",
  "0x1DD9D03da8D3Fc3Af45ad57D75FA99E97CA9ABC6",
  "0xb17A476e045B47185D1a28720429965da110E247",
  "0x54D434c6688986b24A2D01df8E0c116744FcA5F6",
  "0xcF025C16C9cD72EEBf0513A1ed8f588F99d1Bcd9",
  "0x1f03e53401eC22fBd125D61Aa194741D46cC3bcf",
  "0x84EcAB09c480121Cf0b94726D6230901886F97ef",
  "0x598AcF0E3AF1b81891403167E9ecd4744a1E6f9f",
  "0xF2C55153b408B5030E62617861a15AA99727FF3F",
  "0xd1e8Ee19F4501987468891a5505e596031610f86",
  "0x1a9292dE525231f377B59B982Fa1BbE16B83e166",
  "0x29C06e6a797FEf985290E71A819F49619153E129",
  "0x4280492c441C3Ed592a6537Bd428fEcbE4BC3787",
  "0x3b7AEb242f55204DC31Ce09cc31d0315cAEaD638"
  ].map(p => {
  return {
    address: p,
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
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}
