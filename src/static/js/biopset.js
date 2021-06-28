$(function() {
  consoleInit(main)
    });
  
    const POOL_CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_farmGenerator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract IFarmFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmGenerator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"contract IERC20","name":"rewardToken","type":"address"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"blockReward","type":"uint256"},{"internalType":"uint256","name":"bonusEndBlock","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"},{"internalType":"uint256","name":"endBlock","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"uint256","name":"farmableSupply","type":"uint256"},{"internalType":"uint256","name":"numFarmers","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmType","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from_block","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_blockReward","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"},{"internalType":"uint256","name":"_bonus","type":"uint256"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
    async function main() {
      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");
  
      const Pools = [
        "0x481aA5BF38f0bC96741d8183cc93542f3A7a16D1",
      ].map(a => {
        return {
          address : a,
          abi : POOL_CONTRACT_ABI
        }
      })
  
      let tokens = {};
      let prices = {};
  
      const currentBlockNumber = await App.provider.getBlockNumber();
  
      await loadMultipleUnicryptPools(App, tokens, prices, Pools, currentBlockNumber);
  
      hideLoading();
    }
  
  async function loadMultipleUnicryptPools(App, tokens, prices, pools, currentBlockNumber) {
    let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
    const infos = await Promise.all(pools.map(p =>
      loadUnicryptPoolInfo(App, tokens, prices, p.abi, p.address)));
    let tokenAddresses = [].concat.apply([], infos.filter(x => x.stakeToken).map(x => x.stakeToken.tokens));
    let newPrices = await lookUpTokenPrices(tokenAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    const poolPrices = infos.map(poolInfo => poolInfo.stakeToken ? getPoolPrices(tokens, prices, poolInfo.stakeToken) : undefined);
    for (let i = 0; i < infos.length; i++) {
      if(currentBlockNumber < infos[i].endBlockNumber){
        const rewardTokenPrice = getParameterCaseInsensitive(prices, infos[i].rewardTokenAddress)?.usd;
        const usdPerWeek = infos[i].weeklyRewards * rewardTokenPrice;
        const stakeTokenTicker = poolPrices[i].stakeTokenTicker;
        const staked_tvl = poolPrices[i].staked_tvl;
        const stakeTokenPrice = getParameterCaseInsensitive(prices, infos[i].stakeTokenAddress)?.usd;
        let p = await printUnicryptPool(App, infos[i], poolPrices[i], stakeTokenTicker, staked_tvl, stakeTokenPrice, rewardTokenPrice,
          usdPerWeek);
        totalStaked += p.staked_tvl || 0;
        totalUserStaked += p.userStaked || 0;
        if (p.userStaked > 0) {
          individualAPRs.push(p.userStaked * p.apr / 100);
        }
      }
    }
    let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
    return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
  }
  
  async function loadUnicryptPoolInfo(App, tokens, prices, stakingAbi, stakingAddress) {
    const UNCX_CONTRACT = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const farmInfos = await UNCX_CONTRACT.farmInfo();
    const bonus = farmInfos.bonus;
    const weeklyRewards = farmInfos.blockReward / 1e18 * 604800 / 13.5 * bonus;
    const stakeTokenAddress = farmInfos.lpToken;
    const rewardTokenAddress = farmInfos.rewardToken;
    const pendingRewards = await UNCX_CONTRACT.pendingReward(App.YOUR_ADDRESS);
    const userInfo = await UNCX_CONTRACT.userInfo(App.YOUR_ADDRESS);
  
    let stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);
  
    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await UNCX_CONTRACT.totalSupply() / 10 ** stakeToken.decimals;
    }
  
    let newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
    }
  
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  
    const rewardTokenTicker = rewardToken.symbol;
  
    const userStaked = userInfo.amount / 10 ** stakeToken.decimals;
  
    const userUnstaked = stakeToken.unstaked;
  
    const earned = pendingRewards / 10 ** rewardToken.decimals;
  
    const endBlockNumber = await farmInfos.endBlock * 1;
  
    return  {
      stakingAddress,
      stakeTokenAddress,
      rewardTokenAddress,
      rewardTokenTicker,
      weeklyRewards,
      userStaked,
      userUnstaked,
      earned,
      endBlockNumber,
      stakeToken
    }
  }
  
  async function printUnicryptPool(App, info, poolPrices, stakeTokenTicker, staked_tvl, stakeTokenPrice, rewardTokenPrice,
    usdPerWeek) {
      poolPrices.print_price("eth", 8);
      _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
      const weeklyAPR = usdPerWeek / staked_tvl * 100;
      const dailyAPR = weeklyAPR / 7;
      const yearlyAPR = weeklyAPR * 52;
      _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
      const userStakedUsd = info.userStaked * stakeTokenPrice;
      const userStakedPct = userStakedUsd / staked_tvl * 100;
      _print(`You are staking ${info.userStaked.toFixed(8)} ${stakeTokenTicker} ` +
             `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
      if (info.userStaked > 0) {
        info.poolPrices.print_contained_price(info.userStaked);
          const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
          const userDailyRewards = userWeeklyRewards / 7;
          const userYearlyRewards = userWeeklyRewards * 52;
          _print(`Estimated ${info.rewardTokenTicker} earnings:`
              + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
              + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
              + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
      }
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
      if (stakeTokenTicker != "ETH") {
        _print_link(`Stake ${info.userUnstaked.toFixed(8)} ${stakeTokenTicker}`, approveTENDAndStake)
      }
      else {
        _print("Please use the official website to stake ETH.");
      }
      _print_link(`Unstake ${info.userStaked.toFixed(8)} ${stakeTokenTicker}`, unstake)
      _print_link(`Claim ${info.earned.toFixed(8)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*rewardTokenPrice)})`, claim)
      if (stakeTokenTicker != "ETH") {
        _print_link(`Revoke (set approval to 0)`, revoke)
      }
      _print_link(`Exit`, exit)
      _print("");
  
      return {
          staked_tvl: poolPrices.staked_tvl,
          userStaked : userStakedUsd,
          apr : yearlyAPR
      }
  }
  