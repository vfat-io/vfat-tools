
$(function() {
consoleInit(main)
});

const ELK_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getFantomPrices();

  const pools = ELKStakingContracts.map(c => { return {
    address: c.stakingRewardAddress,
    abi: ELK_STAKING_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardsToken"
  }})

  await loadFantomSynthetixPoolInfo(App, tokens, prices, pools[0].abi, pools[0].address,
    pools[0].rewardTokenFunction, pools[0].stakeTokenFunction)

  let p = await loadMultipleFantomSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

const ELKStakingContracts = [
{
  stakingRewardAddress: "0xAd2d1A5e796E258E9d902aE3813e9f78021104d7"
}, {
  stakingRewardAddress: "0xC5B1b19eCddFb45e63B7EE26935a1fd60a1148C3"
}, {
  stakingRewardAddress: "0x820c054E577127D65C849897375FD920B727E0Bb"
}, {
  stakingRewardAddress: "0x76021Efff7590f4A9FAeD556a859D9c6F966b040"
}, {
  stakingRewardAddress: "0x7Ebf324850582216b4c73134a2AF65f5C798A0Ec"
}, {
  stakingRewardAddress: "0x4857d9B73120e576d72214b26929d8dFD2994527"
}, {
  stakingRewardAddress: "0x0CF7C54992a5DDd0F962353C495E41e39a471585"
}, {
  stakingRewardAddress: "0xDe4188B49CC678423852ca3Ba72c7Ecbaa460175"
}, {
  stakingRewardAddress: "0x2851d24DB37473DE13069FE65945D97281A92fa6"
}, {
  stakingRewardAddress: "0x37dA89749d0b89871Cff41D5494d1FA903bE9965"
},{
  stakingRewardAddress: "0xb02d9C58909c137d7499aC9c437908b700FE6492"
},{
  stakingRewardAddress: "0x85eFeB1056ED4914d67B669Ea9A60c4b784ebf1b"
},{
  stakingRewardAddress: "0x3Ad0Fae59C820331c9792d8e1dCfcDBcC235129B"
},{
  stakingRewardAddress: "0x0D36840b0907661825f44a29B0eFa54fb42c6DED"
},{
  stakingRewardAddress: "0xdB402b5Ecc13714C9B8b212216FF87ee99f76EE3"
},{
  stakingRewardAddress: "0xB684705f5Fbc0419C5d5230BCDF9af80f62837Ee"
},{
  stakingRewardAddress: "0xD8E26639A330d6FF4DE21CE4463E43beaE2eFAD3"
},{
  stakingRewardAddress: "0x713dC6952838b65BD3F9a0D220b7EdA942FEF8b9"
},{
  stakingRewardAddress: "0x81FadCec2c11A27439E5cfE43252E116c0c2a5fD"
},{
  stakingRewardAddress: "0x70bC37397C53B6e0B245f161D52ee588aa498c7E"
},{
  stakingRewardAddress: "0x646c6144937FCE037D55087b3Eb3D7C5bfa155eF"
},{
  stakingRewardAddress: "0x91b5b88afDE684E495Db3C24294801cfdd1fefB7"
}]