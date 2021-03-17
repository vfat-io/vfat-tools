
$(function() {
  consoleInit();
  start(main);
});

const COVER_CONTRACT_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint48","name":"_startTime","type":"uint48"},{"internalType":"uint256","name":"_weeklyRewards","type":"uint256"},{"internalType":"uint256","name":"_transferAmount","type":"uint256"}],"name":"addBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"},{"internalType":"address[]","name":"_bonusTokenAddrs","type":"address[]"},{"internalType":"address[]","name":"_authorizers","type":"address[]"}],"name":"addPoolsAndAllowBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"}],"name":"claimRewardsForPools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_poolBonusId","type":"uint256"}],"name":"collectDust","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_poolBonusId","type":"uint256"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint256","name":"_transferAmount","type":"uint256"}],"name":"extendBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"}],"name":"getAuthorizers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"}],"name":"getPool","outputs":[{"components":[{"components":[{"internalType":"address","name":"bonusTokenAddr","type":"address"},{"internalType":"uint48","name":"startTime","type":"uint48"},{"internalType":"uint48","name":"endTime","type":"uint48"},{"internalType":"uint256","name":"weeklyRewards","type":"uint256"},{"internalType":"uint256","name":"accRewardsPerToken","type":"uint256"},{"internalType":"uint256","name":"remBonus","type":"uint256"}],"internalType":"struct IBonusRewards.Bonus[]","name":"bonuses","type":"tuple[]"},{"internalType":"uint256","name":"lastUpdatedAt","type":"uint256"}],"internalType":"struct IBonusRewards.Pool","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPoolList","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getResponders","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_account","type":"address"}],"name":"getUser","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"rewardsWriteoffs","type":"uint256[]"}],"internalType":"struct IBonusRewards.User","name":"","type":"tuple"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_responders","type":"address[]"}],"name":"setResponders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint256","name":"_weeklyRewards","type":"uint256"},{"internalType":"uint48","name":"_startTime","type":"uint48"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"viewRewards","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
//const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/nWdyYF9wjUbn7KIwVnh3r571aIq0A6kq");
async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = {};

  const COVER_CONTRACT_ADDR = "0x8FC8551dd5E2Dc5d2B04f2957E543D7d53a79f1e";
  const COVER_CONTRACT = new ethers.Contract(COVER_CONTRACT_ADDR, COVER_CONTRACT_ABI, App.provider);

  const poolAddresses = await COVER_CONTRACT.getPoolList();

  let pools = []

  for(poolAddress of poolAddresses){
      let pool = await COVER_CONTRACT.getPool(poolAddress);
      let rewards = []
      let pendingRewards = await COVER_CONTRACT.viewRewards(poolAddress, App.YOUR_ADDRESS);
      for(reward of pool.bonuses){
          rewards.push({
              rewardToken: reward.bonusTokenAddr,
              weeklyRewards: reward.weeklyRewards
          });
      }
      pools.push({
          stakedToken: poolAddress,
          rewards : rewards,
          pendingRewards : pendingRewards
      });
  }


  /*let p = await loadMultipleSynthetixPools(App, tokens, prices, Pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  _print_bold(`\n*** Participant Rewards ***`)
  _print(`By validating your profile you will earn 1 UBI/hr.`)
  const dailyUBI = getParameterCaseInsensitive(prices, "0xDd1Ad9A21Ce722C151A836373baBe42c868cE9a4").usd * 24
  _print(`Estimated earnings: Day $${formatMoney(dailyUBI)}, Week $${formatMoney(dailyUBI*7)}, Year $${formatMoney(dailyUBI*365)}`)*/
  hideLoading();
}