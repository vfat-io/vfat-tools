$(function() {
consoleInit(main)
});

const MCN_CHEF_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"lpToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint48","name":"_startTime","type":"uint48"},{"internalType":"uint256","name":"_weeklyRewards","type":"uint256"},{"internalType":"uint256","name":"_transferAmount","type":"uint256"}],"name":"addBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"},{"internalType":"address[]","name":"_bonusTokenAddrs","type":"address[]"},{"internalType":"address[]","name":"_authorizers","type":"address[]"}],"name":"addPoolsAndAllowBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"}],"name":"claimRewardsForPools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_poolBonusId","type":"uint256"}],"name":"collectDust","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_lpTokens","type":"address[]"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_poolBonusId","type":"uint256"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint256","name":"_transferAmount","type":"uint256"}],"name":"extendBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"}],"name":"getAuthorizers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"}],"name":"getPool","outputs":[{"components":[{"components":[{"internalType":"address","name":"bonusTokenAddr","type":"address"},{"internalType":"uint48","name":"startTime","type":"uint48"},{"internalType":"uint48","name":"endTime","type":"uint48"},{"internalType":"uint256","name":"weeklyRewards","type":"uint256"},{"internalType":"uint256","name":"accRewardsPerToken","type":"uint256"},{"internalType":"uint256","name":"remBonus","type":"uint256"}],"internalType":"struct IBonusRewards.Bonus[]","name":"bonuses","type":"tuple[]"},{"internalType":"uint256","name":"lastUpdatedAt","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct IBonusRewards.Pool","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPoolList","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getResponders","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_account","type":"address"}],"name":"getUser","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"rewardsWriteoffs","type":"uint256[]"}],"internalType":"struct IBonusRewards.User","name":"","type":"tuple"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_responders","type":"address[]"}],"name":"setResponders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_bonusTokenAddr","type":"address"},{"internalType":"uint256","name":"_weeklyRewards","type":"uint256"},{"internalType":"uint48","name":"_startTime","type":"uint48"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"viewRewards","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  var tokens = {};
  var prices = {};

  const MCN_CHEF_ADDR = "0x15dEd15fE32EBac0b6cFb08cdAB112cca8380423";
  const MCN_CHEF = new ethers.Contract(MCN_CHEF_ADDR, MCN_CHEF_ABI, App.provider);

  const poolAddresses = await MCN_CHEF.getPoolList();

  let pools = []

  for(poolAddress of poolAddresses){
      let pool = await MCN_CHEF.getPool(poolAddress);
      let rewards = []
      let pendingRewards = await MCN_CHEF.viewRewards(poolAddress, App.YOUR_ADDRESS);
      const stakedAmount = pool.amount / 1e18;
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
          abi : MCN_CHEF_ABI,
          address : MCN_CHEF_ADDR,
          stakedToken : poolAddress,
          rewards : rewards,
          stakedAmount : stakedAmount
      });
      }
  }

  await loadMcnSynthetixPoolInfo(App, tokens, prices, MCN_CHEF_ABI, MCN_CHEF_ADDR,
    "0xD91E9a0fEf7C0fa4EBdAF4d0aCF55888949A2a9b", "0x2Ef2cb6af83de4171A69EE2f7C677079fFD9BcD0")

  let p = await loadMcnprotocolContracts(App, tokens, prices, pools, MCN_CHEF)
  const claimAll = async function() {
    return rewardsMcnContract_claim(p.stakeTokenAddresses, MCN_CHEF_ADDR, App)
  }
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    _print_link(`Claim All`, claimAll);
  }

  hideLoading();
}

async function loadMcnprotocolContracts(App, tokens, prices, pools, mcnContract) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [], stakeTokenAddresses = [];
  const infos = await Promise.all(pools.map(p =>
    loadMcnprotocolPoolInfo(App, tokens, p.address, p.stakedToken, p.rewards, mcnContract, p.stakedAmount)));
  let tokenAddresses = []
  for (const info of infos) {
    info.stakeToken.tokens.forEach(t => tokenAddresses.push(t));
    info.rewardTokens.forEach(r => r.rewardToken.tokens.forEach(rt => tokenAddresses.push(rt)));
  }
  await getNewPricesAndTokens(App, tokens, prices, tokenAddresses, mcnContract.address);
  const magicPrice = await getPriceByID("magic-token");
  prices["0xA384Bc7Cdc0A93e686da9E7B8C0807cD040F4E0b"] = magicPrice["magic-token"];
  const xDollarPrice = await getPriceByID("xdollar");
  prices["0x173fd7434B8B50dF08e3298f173487ebDB35FD14"] = xDollarPrice.xdollar;
  const iotexPrice = await getPriceByID("iotex");
  prices["0x6fB3e0A217407EFFf7Ca062D46c26E5d60a14d69"] = iotexPrice.iotex;
  for (const info of infos) {
    let p = await printMcnSynthetixPool(App, tokens, prices, info);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    stakeTokenAddresses.push(p.stakeTokenAddresses)
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR, stakeTokenAddresses };
}

async function loadMcnprotocolPoolInfo(App, tokens, stakingAddress, stakeTokenAddress,
  rewards, mcnContract, stakedAmount) {
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
    stakeToken.staked = stakedAmount;

    const userInfos = await mcnContract.getUser(stakeTokenAddress, App.YOUR_ADDRESS);

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

async function printMcnSynthetixPool(App, tokens, prices, info, chain="eth") {
    info.poolPrices = getPoolPrices(tokens, prices, info.stakeToken);
    info.stakeTokenPrice = getParameterCaseInsensitive(prices, info.stakeTokenAddress)?.usd;
    info.stakeTokenTicker = info.poolPrices.stakeTokenTicker;
    info.staked_tvl = info.poolPrices.staked_tvl;
    info.rewardTokenPrice = getParameterCaseInsensitive
    info.poolPrices.print_price(chain);
    let stakeTokenAddresses = [];
    let weeklyAPRs = 0
    let rewardTokenPrices = [];
    for(const rewardToken of info.rewardTokens){
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardToken.address)?.usd ?? 0;
      rewardToken.usdPerWeek = rewardToken.weeklyRewards * rewardTokenPrice;
      _print(`${rewardToken.rewardTokenTicker} Per Week: ${rewardToken.weeklyRewards.toFixed(2)} ($${formatMoney(rewardToken.usdPerWeek)})`);
      weeklyAPRs += rewardToken.usdPerWeek;
      rewardTokenPrices.push(rewardTokenPrice);
    }
    const weeklyAPR = weeklyAPRs / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
      let totalUserWeeklyRewards = 0;
      let totalUserDailyRewards = 0;
      let totalUserYearlyRewards = 0;
      let totalRewardPrices = 0;
      for(let i = 0; i < info.rewardTokens.length; i++){
        const userWeeklyReward = userStakedPct * info.rewardTokens[i].weeklyRewards / 100;
        const userDailyReward = userWeeklyReward / 7;
        const userYearlyReward = userWeeklyReward * 52;
        totalUserWeeklyRewards += userWeeklyReward;
        totalUserDailyRewards += userDailyReward;
        totalUserYearlyRewards += userYearlyReward;
        totalRewardPrices += rewardTokenPrices[i];
      }
      switch(info.rewardTokens.length){
        case 1 :
          _print(`Estimated ${info.rewardTokens[0].rewardTokenTicker} earnings:`
          + ` Day ($${formatMoney(totalUserDailyRewards*totalRewardPrices)})`
          + ` Week ($${formatMoney(totalUserWeeklyRewards*totalRewardPrices)})`
          + ` Year ($${formatMoney(totalUserYearlyRewards*totalRewardPrices)})`);
          break;
        case 2 :
          _print(`Estimated ${info.rewardTokens[0].rewardTokenTicker} + ${info.rewardTokens[1].rewardTokenTicker} earnings:`
          + ` Day ($${formatMoney(totalUserDailyRewards*totalRewardPrices)})`
          + ` Week ($${formatMoney(totalUserWeeklyRewards*totalRewardPrices)})`
          + ` Year ($${formatMoney(totalUserYearlyRewards*totalRewardPrices)})`);
          break;
        case 3 :
          _print(`Estimated ${info.rewardTokens[0].rewardTokenTicker} + ${info.rewardTokens[1].rewardTokenTicker} + ${info.rewardTokens[2].rewardTokenTicker} earnings:`
          + ` Day ($${formatMoney(totalUserDailyRewards*totalRewardPrices)})`
          + ` Week ($${formatMoney(totalUserWeeklyRewards*totalRewardPrices)})`
          + ` Year ($${formatMoney(totalUserYearlyRewards*totalRewardPrices)})`);
          break;
        case 4 :
          _print(`Estimated ${info.rewardTokens[0].rewardTokenTicker} + ${info.rewardTokens[1].rewardTokenTicker} + ${info.rewardTokens[2].rewardTokenTicker} + ${info.rewardTokens[3].rewardTokenTicker} earnings:`
          + ` Day ($${formatMoney(totalUserDailyRewards*totalRewardPrices)})`
          + ` Week ($${formatMoney(totalUserWeeklyRewards*totalRewardPrices)})`
          + ` Year ($${formatMoney(totalUserYearlyRewards*totalRewardPrices)})`);
          break;
        case 5 :
          _print(`Estimated ${info.rewardTokens[0].rewardTokenTicker} + ${info.rewardTokens[1].rewardTokenTicker} + ${info.rewardTokens[2].rewardTokenTicker} + ${info.rewardTokens[3].rewardTokenTicker} + ${info.rewardTokens[4].rewardTokenTicker} earnings:`
          + ` Day ($${formatMoney(totalUserDailyRewards*totalRewardPrices)})`
          + ` Week ($${formatMoney(totalUserWeeklyRewards*totalRewardPrices)})`
          + ` Year ($${formatMoney(totalUserYearlyRewards*totalRewardPrices)})`);
          break;
      }
      stakeTokenAddresses.push(info.stakeTokenAddress);
  }
    const approveTENDAndStake = async function() {
      return rewardsMcnContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsMcnContract_unstake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const claim = async function() {
      return rewardsMcnContract_claim([info.stakeTokenAddress], info.stakingAddress, App)
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
    switch (info.rewardTokens.length){
      case 1 :
        _print_link(`Claim ${info.rewardTokens[0].earned.toFixed(6)} ${info.rewardTokens[0].rewardTokenTicker} ($${formatMoney(info.rewardTokens[0].earned*rewardTokenPrices[0])})`, claim)
        break;
      case 2 :
        _print_link(`Claim ${info.rewardTokens[0].earned.toFixed(6)} ${info.rewardTokens[0].rewardTokenTicker} ($${formatMoney(info.rewardTokens[0].earned*rewardTokenPrices[0])}) + ${info.rewardTokens[1].earned.toFixed(6)} ${info.rewardTokens[1].rewardTokenTicker} ($${formatMoney(info.rewardTokens[1].earned*rewardTokenPrices[1])})`, claim)
        break;
      case 3 :
        _print_link(`Claim ${info.rewardTokens[0].earned.toFixed(6)} ${info.rewardTokens[0].rewardTokenTicker} ($${formatMoney(info.rewardTokens[0].earned*rewardTokenPrices[0])}) + ${info.rewardTokens[1].earned.toFixed(6)} ${info.rewardTokens[1].rewardTokenTicker} ($${formatMoney(info.rewardTokens[1].earned*rewardTokenPrices[1])}) + ${info.rewardTokens[2].earned.toFixed(6)} ${info.rewardTokens[2].rewardTokenTicker} ($${formatMoney(info.rewardTokens[2].earned*rewardTokenPrices[2])})`, claim)
        break;
      case 4 :
        _print_link(`Claim ${info.rewardTokens[0].earned.toFixed(6)} ${info.rewardTokens[0].rewardTokenTicker} ($${formatMoney(info.rewardTokens[0].earned*rewardTokenPrices[0])}) + ${info.rewardTokens[1].earned.toFixed(6)} ${info.rewardTokens[1].rewardTokenTicker} ($${formatMoney(info.rewardTokens[1].earned*rewardTokenPrices[1])}) + ${info.rewardTokens[2].earned.toFixed(6)} ${info.rewardTokens[2].rewardTokenTicker} ($${formatMoney(info.rewardTokens[2].earned*rewardTokenPrices[2])}) + ${info.rewardTokens[3].earned.toFixed(6)} ${info.rewardTokens[3].rewardTokenTicker} ($${formatMoney(info.rewardTokens[3].earned*rewardTokenPrices[3])})`, claim)
        break;
      case 5 :
        _print_link(`Claim ${info.rewardTokens[0].earned.toFixed(6)} ${info.rewardTokens[0].rewardTokenTicker} ($${formatMoney(info.rewardTokens[0].earned*rewardTokenPrices[0])}) + ${info.rewardTokens[1].earned.toFixed(6)} ${info.rewardTokens[1].rewardTokenTicker} ($${formatMoney(info.rewardTokens[1].earned*rewardTokenPrices[1])}) + ${info.rewardTokens[2].earned.toFixed(6)} ${info.rewardTokens[2].rewardTokenTicker} ($${formatMoney(info.rewardTokens[2].earned*rewardTokenPrices[2])}) + ${info.rewardTokens[3].earned.toFixed(6)} ${info.rewardTokens[3].rewardTokenTicker} ($${formatMoney(info.rewardTokens[3].earned*rewardTokenPrices[3])}) + ${info.rewardTokens[4].earned.toFixed(6)} ${info.rewardTokens[4].rewardTokenTicker} ($${formatMoney(info.rewardTokens[4].earned*rewardTokenPrices[4])})`, claim)
        break;
    }
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : yearlyAPR,
        stakeTokenAddresses : stakeTokenAddresses
    }
}

const rewardsMcnContract_claim = async function(lpTokenAddresses, rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  const earnedYFFI = (await REWARD_POOL.earned(App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
    showLoading()
    REWARD_POOL.claimRewardsForPools(lpTokenAddresses, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const rewardsMcnContract_unstake = async function(lpTokenAddress, rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)
  const currentStakedAmount = await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.withdraw(lpTokenAddress, currentStakedAmount, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const rewardsMcnContract_stake = async function(stakeTokenAddr, rewardPoolAddr, App, maxAllowance) {
  const signer = App.provider.getSigner()

  const TEND_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, YFFI_REWARD_CONTRACT_ABI, signer)

  const balanceOf = await TEND_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentTEND =  maxAllowance ? (maxAllowance / 1e18 < balanceOf / 1e18
    ? maxAllowance : balanceOf) : balanceOf
  const allowedTEND = await TEND_TOKEN.allowance(App.YOUR_ADDRESS, rewardPoolAddr)

  let allow = Promise.resolve()

  if (allowedTEND / 1e18 < currentTEND / 1e18) {
    showLoading()
    allow = TEND_TOKEN.approve(rewardPoolAddr, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTEND / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
        WEEBTEND_V2_TOKEN.deposit(stakeTokenAddr, currentTEND, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(x => {
            hideLoading()
            console.log(x);
            _print('Something went wrong.')
          })
      })
      .catch(x => {
        hideLoading()
        console.log(x);
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

async function loadMcnSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    const stakeTokenAddress = stakeTokenFunction

    const rewardTokenAddress = rewardTokenFunction

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      x.toLowerCase() !=  "0xb34ab2f65c6e4f764ffe740ab83f982021faed6d" && //BSG can't be retrieved from Coingecko
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice
    }
}

async function getPriceByID(apiID){
  let url = 'https://api.coingecko.com/api/v3/simple/price?ids=' + apiID + '&vs_currencies=usd'
  let res = await $.ajax({
    url : url,
    type : "GET"
  })
  return res;
}