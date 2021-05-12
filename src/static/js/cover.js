
$(function() {
consoleInit(main)
});

const COVER_CONTRACT_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint48","name":"_startTime","type":"uint48"},{"internalType":"uint256","name":"_weeklyRewards","type":"uint256"},{"internalType":"uint256","name":"_transferAmount","type":"uint256"}],"name":"addBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"},{"internalType":"address[]","name":"_bonusTokenAddrs","type":"address[]"},{"internalType":"address[]","name":"_authorizers","type":"address[]"}],"name":"addPoolsAndAllowBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"}],"name":"claimRewardsForPools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_poolBonusId","type":"uint256"}],"name":"collectDust","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_poolBonusId","type":"uint256"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint256","name":"_transferAmount","type":"uint256"}],"name":"extendBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"}],"name":"getAuthorizers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"}],"name":"getPool","outputs":[{"components":[{"components":[{"internalType":"address","name":"bonusTokenAddr","type":"address"},{"internalType":"uint48","name":"startTime","type":"uint48"},{"internalType":"uint48","name":"endTime","type":"uint48"},{"internalType":"uint256","name":"weeklyRewards","type":"uint256"},{"internalType":"uint256","name":"accRewardsPerToken","type":"uint256"},{"internalType":"uint256","name":"remBonus","type":"uint256"}],"internalType":"struct IBonusRewards.Bonus[]","name":"bonuses","type":"tuple[]"},{"internalType":"uint256","name":"lastUpdatedAt","type":"uint256"}],"internalType":"struct IBonusRewards.Pool","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPoolList","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getResponders","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_account","type":"address"}],"name":"getUser","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"rewardsWriteoffs","type":"uint256[]"}],"internalType":"struct IBonusRewards.User","name":"","type":"tuple"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_responders","type":"address[]"}],"name":"setResponders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint256","name":"_weeklyRewards","type":"uint256"},{"internalType":"uint48","name":"_startTime","type":"uint48"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"viewRewards","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

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
      for(let i = 0; i < pool.bonuses.length; i++){
        if(Date.now() / 1000 < pool.bonuses[i].endTime){
          rewards.push({
            rewardToken: pool.bonuses[i].bonusTokenAddr,
            weeklyRewards: pool.bonuses[i].weeklyRewards,
            pendingRewards : pendingRewards[i]
        });
        }
      }
      if(rewards.length > 0){
        pools.push({
          abi : COVER_CONTRACT_ABI,
          address : COVER_CONTRACT_ADDR,
          stakedToken : poolAddress,
          rewards : rewards
      });
      }
  }


  let p = await loadCoverprotocolContracts(App, tokens, prices, pools, COVER_CONTRACT)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

async function loadCoverprotocolContracts(App, tokens, prices, pools, coverContract) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadCoverprotocolPoolInfo(App, tokens, p.address, p.stakedToken, p.rewards, coverContract)));
  let tokenAddresses = []
  for (const info of infos) {
    info.stakeToken.tokens.forEach(t => tokenAddresses.push(t));
    info.rewardTokens.forEach(r => r.rewardToken.tokens.forEach(rt => tokenAddresses.push(rt)));
  }
  await getNewPricesAndTokens(App, tokens, prices, tokenAddresses, coverContract.address)
  for (const info of infos) {
    let p = await printCoverSynthetixPool(App, tokens, prices, info);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadCoverprotocolPoolInfo(App, tokens, stakingAddress, stakeTokenAddress,
  rewards, coverContract) {
    const rewardTokens = await Promise.all(rewards.map(async r => {
      if (!getParameterCaseInsensitive(tokens, r.rewardToken)) {
        tokens[r.rewardToken] = await getToken(App, r.rewardToken, stakingAddress);
      }
      const rewardToken = getParameterCaseInsensitive(tokens, r.rewardToken);
      const rewardTokenTicker = rewardToken.symbol;
      const earned = r.pendingRewards / 10 ** rewardToken.decimals;
      const _weeklyRewards = r.weeklyRewards / 10 ** rewardToken.decimals;
      return {
        address : r.rewardToken,
        weeklyRewards : _weeklyRewards,
        rewardToken : rewardToken,
        rewardTokenTicker : rewardTokenTicker,
        earned : earned
      }
    }));

    const stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    const userInfos = await coverContract.getUser(stakeTokenAddress, App.YOUR_ADDRESS);

    const userStaked = userInfos[0].amount / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    return {
      stakingAddress,
      stakeTokenAddress,
      rewardTokens,
      userStaked,
      userUnstaked,
      stakeToken
    }
}

async function printCoverSynthetixPool(App, tokens, prices, info, chain="eth") {
    info.poolPrices = getPoolPrices(tokens, prices, info.stakeToken);
    info.stakeTokenPrice = getParameterCaseInsensitive(prices, info.stakeTokenAddress)?.usd;
    info.stakeTokenTicker = info.poolPrices.stakeTokenTicker;
    info.staked_tvl = info.poolPrices.staked_tvl;
    info.rewardTokenPrice = getParameterCaseInsensitive
    info.poolPrices.print_price(chain);
    let weeklyAPRs = 0
    for(const rewardToken of info.rewardTokens){
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardToken.address)?.usd ?? 0;
      rewardToken.usdPerWeek = rewardToken.weeklyRewards * rewardTokenPrice;
      _print(`${rewardToken.rewardTokenTicker} Per Week: ${rewardToken.weeklyRewards.toFixed(2)} ($${formatMoney(rewardToken.usdPerWeek)})`);
      weeklyAPRs += rewardToken.usdPerWeek;
    }
    const weeklyAPR = weeklyAPRs / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(info.stakingAddress, App)
    }
    const claim = async function() {
      return rewardsContract_claim(info.stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    for(const rewardToken of info.rewardTokens){
      _print_link(`Claim ${rewardToken.earned.toFixed(6)} ${rewardToken.rewardTokenTicker} ($${formatMoney(rewardToken.earned*rewardToken.rewardTokenPrice)})`, claim)
    }
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : yearlyAPR
    }
}
