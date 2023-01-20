$(function() {
consoleInit(main)
});

const MONOLITH_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pool","type":"address"},{"indexed":false,"internalType":"address[]","name":"rewradsToken","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"reward","type":"uint256[]"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pool","type":"address"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"rewardsToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pool","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pool","type":"address"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pool","type":"address"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARDER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SETTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UNPAUSER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"defaultRewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"NFTHolder","type":"address"},{"internalType":"address","name":"admin","type":"address"},{"internalType":"address","name":"setter","type":"address"},{"internalType":"address","name":"pauser","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"isRewardToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"address[]","name":"_rewardsTokens","type":"address[]"},{"internalType":"uint256[]","name":"_rewards","type":"uint256[]"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewardData","outputs":[{"internalType":"uint256","name":"rewardsDuration","type":"uint256"},{"internalType":"uint256","name":"periodFinish","type":"uint256"},{"internalType":"uint256","name":"rewardRate","type":"uint256"},{"internalType":"uint256","name":"lastUpdateTime","type":"uint256"},{"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"}],"name":"rewardTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stakeFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pool","type":"address"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const SOLIDLY_FACTORY_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"state","type":"bool"}],"name":"OperatorStatus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"bool","name":"stable","type":"bool"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"childInterfaceAddress","outputs":[{"internalType":"address","name":"_childInterface","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"childSubImplementationAddress","outputs":[{"internalType":"address","name":"_childSubImplementation","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"createFees","outputs":[{"internalType":"address","name":"fees","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"bool","name":"stable","type":"bool"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feesFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"bool","name":"","type":"bool"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governanceAddress","outputs":[{"internalType":"address","name":"_governanceAddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_feesFactory","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"interfaceSourceAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isOperator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isPair","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pairCodeHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolSpecificFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolSpecificFeesEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"state","type":"bool"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setPause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"},{"internalType":"uint256","name":"_fees","type":"uint256"},{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setPoolSpecificFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_stableFees","type":"uint256"}],"name":"setStableFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_volatileFees","type":"uint256"}],"name":"setVolatileFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stableFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_childInterfaceAddress","type":"address"}],"name":"updateChildInterfaceAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_childSubImplementationAddress","type":"address"}],"name":"updateChildSubImplementationAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"volatileFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

async function main() {

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");

  const SOLIDLY_FACTORY_ADDR = "0x777de5Fe8117cAAA7B44f396E93a401Cf5c9D4d6";

  const SOLIDLY_FACTORY = new ethers.Contract(SOLIDLY_FACTORY_ADDR, SOLIDLY_FACTORY_ABI, App.provider);

  const poolsLength = await SOLIDLY_FACTORY.allPairsLength();
  let stakingTokens = []

  for(let i = 0; i < poolsLength; i++){
    const stakingToken = await SOLIDLY_FACTORY.allPairs(i);
    stakingTokens.push(stakingToken);
  }

  const pools = stakingTokens.map(stakingToken => {
    return {
      address: "0x64A07ac478367245f4A84b96d5EcB8DF1691E425",
      abi: MONOLITH_ABI,
      stakeTokenAddress: stakingToken,
    }
  })

  let tokens = {};
  let prices = {};

  let p = await loadMonolithSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

async function loadMonolithSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadMonolithPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenAddress)));
  for (const i of infos) {
    let p = await printSynthetixPool(App, i);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadMonolithPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, stakeTokenAddress) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    const rewardTokensLength_ = await STAKING_POOL.rewardTokensLength(stakeTokenAddress);
    const rewardTokensLength = rewardTokensLength_ / 1;
    let rewardTokenAddresses = [],rewardTokens = [],rewardTokenTickers = [],rewardTokenPrices = [],weeklyRewards = [],usdCoinsPerWeek = [];
    let earnings = [];

    for(let i = 0; i < rewardTokensLength; i++){
      const rewardTokenAddress = await STAKING_POOL.rewardTokens(stakeTokenAddress, i);
      rewardTokenAddresses.push(rewardTokenAddress);

      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getGeneralEthcallToken(App, rewardTokenAddress, stakingAddress);
      }
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
      rewardTokens.push(rewardToken);

      const rewardTokenTicker = rewardToken.symbol;
      rewardTokenTickers.push(rewardTokenTicker);

      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      rewardTokenPrices.push(rewardTokenPrice);

      const calls = [
        STAKING_MULTI.rewardData(stakeTokenAddress, rewardTokenAddress),
        STAKING_MULTI.earned(stakeTokenAddress, App.YOUR_ADDRESS, rewardTokenAddress)]
      const [rewardData, earned_] = await App.ethcallProvider.all(calls);

      const weeklyReward = (Date.now() / 1000 > rewardData.periodFinish) ? 0 : rewardData.rewardRate / 1e18 * 604800;
      weeklyRewards.push(weeklyReward)

      const usdPerWeek = weeklyReward * rewardTokenPrice;
      usdCoinsPerWeek.push(usdPerWeek);

      const earned = earned_ / 10 ** rewardToken.decimals;
      earnings.push(earned);
    }

    var stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress);

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(prices, x));
    newPriceAddresses.push("0x777172d858dc1599914a1c4c6c9fc48c99a60990");
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getGeneralEthcallToken(App, address, stakingAddress);
    }

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

    const [balance] = await App.ethcallProvider.all([STAKING_MULTI.balanceOf(stakeTokenAddress, App.YOUR_ADDRESS)]);

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddresses,
      stakeTokenTicker,
      rewardTokenTickers,
      stakeTokenPrice,
      rewardTokenPrices,
      weeklyRewards,
      usdCoinsPerWeek,
      staked_tvl,
      userStaked,
      userUnstaked,
      earnings
    }
}