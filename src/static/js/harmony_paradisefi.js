$(function() {
  consoleInit(main)
})

const PARADISEFI_ABI = [
  {
    inputs: [
      {internalType: 'contract IERC20', name: '_rewardToken', type: 'address'},
      {internalType: 'contract IERC20', name: '_stakedToken', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'previousOwner', type: 'address'},
      {indexed: true, internalType: 'address', name: 'newOwner', type: 'address'},
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{indexed: false, internalType: 'uint256', name: 'reward', type: 'uint256'}],
    name: 'RewardAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'reward', type: 'uint256'},
    ],
    name: 'RewardPaid',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'Staked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'user', type: 'address'},
      {indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'Withdrawn',
    type: 'event',
  },
  {
    inputs: [{internalType: 'address', name: 'account', type: 'address'}],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'account', type: 'address'}],
    name: 'earned',
    outputs: [{internalType: 'uint128', name: '', type: 'uint128'}],
    stateMutability: 'view',
    type: 'function',
  },
  {inputs: [], name: 'exit', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {inputs: [], name: 'getReward', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [],
    name: 'lastTimeRewardApplicable',
    outputs: [{internalType: 'uint64', name: '', type: 'uint64'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastUpdateTime',
    outputs: [{internalType: 'uint64', name: '', type: 'uint64'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'periodFinish',
    outputs: [{internalType: 'uint64', name: '', type: 'uint64'}],
    stateMutability: 'view',
    type: 'function',
  },
  {inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function'},
  {
    inputs: [],
    name: 'rewardPerToken',
    outputs: [{internalType: 'uint128', name: '', type: 'uint128'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardPerTokenStored',
    outputs: [{internalType: 'uint128', name: '', type: 'uint128'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardRate',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardToken',
    outputs: [{internalType: 'contract IERC20', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint128', name: 'reward', type: 'uint128'},
      {internalType: 'uint64', name: 'duration', type: 'uint64'},
    ],
    name: 'setRewardParams',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint128', name: 'amount', type: 'uint128'}],
    name: 'stake',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'forWhom', type: 'address'},
      {internalType: 'uint128', name: 'amount', type: 'uint128'},
    ],
    name: 'stakeFor',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakedToken',
    outputs: [{internalType: 'contract IERC20', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'userRewards',
    outputs: [
      {internalType: 'uint128', name: 'userRewardPerTokenPaid', type: 'uint128'},
      {internalType: 'uint128', name: 'rewards', type: 'uint128'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint128', name: 'amount', type: 'uint128'}],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {inputs: [], name: 'withdrawReward', outputs: [], stateMutability: 'nonpayable', type: 'function'},
]

const Pools = [
  '0x2763b976F5e789DD94fB414bb886a0D76689453E', // eden-one
  '0xbCaeFC4cfd15989e7Db5B659FfE472ac20cdc843', // one
  '0xF98cb1CFC9A9F657A047003620fE85481BE57E28', // eden
  '0x33C9D8F6E4498cFb58841b0571876990f000d3A1', // eden-jewel
  '0xce38E6658936630502c1e61a4493B46E6508149F' // jewel
].map(a => ({
  address: a,
  abi: PARADISEFI_ABI,
  stakeTokenFunction: 'stakedToken',
  rewardTokenFunction: 'rewardToken',
}))

const FeePools = [
  '0xbCaeFC4cfd15989e7Db5B659FfE472ac20cdc843', // eth
].map(a => ({
  address: a,
  abi: PARADISEFI_ABI,
  stakeTokenFunction: 'stakedToken',
  rewardTokenFunction: 'rewardToken',
}))

async function main() {
  const App = await init_ethers()

  _print_bold("There is a withdraw fee of 10% in ONE pool");
  _print("");
  _print(`Initialized ${App.YOUR_ADDRESS}\n`)
  _print('Reading smart contracts...\n')

  var tokens = {}
  const prices = await getHarmonyPrices()

  prices['0x0000000000000000000000000000000000000000'] = prices['0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a']

  await loadHarmonySynthetixPoolInfo(App, tokens, prices, Pools[0].abi, Pools[0].address, Pools[0].rewardTokenFunction, Pools[0].stakeTokenFunction)
  await loadParadiseSynthetixPools(App, tokens, prices, FeePools)

  let p = await loadMultipleHarmonySynthetixPools(App, tokens, prices, Pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`)
  if (p.totalUserStaked > 0) {
    _print(
      `You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`
    )
  }

  hideLoading()
}

async function loadParadiseSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
      loadParadiseSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printFeeParadiseSynthetixPool(App, i, "Harmony");
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalApr };
}

async function loadParadiseSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    var stakeToken = await getHarmonyToken(App, stakeTokenAddress, stakingAddress);
    stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getHarmonyToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getHarmonyToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "harmony");

    if (!poolPrices)
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const calls = [STAKING_MULTI.periodFinish(), STAKING_MULTI.rewardRate(),
      STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(App.YOUR_ADDRESS)]
    const [periodFinish, rewardRate, balance, earned_] = await App.ethcallProvider.all(calls);

    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 10 ** rewardToken.decimals * 604800;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = earned_ / 10 ** rewardToken.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      weeklyRewards,
      usdPerWeek,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned
    }
}

async function printFeeParadiseSynthetixPool(App, info, chain="eth", customURLs) {
    info.poolPrices.print_price(chain, 4, customURLs);
    _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
        const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${info.rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
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
    _print(`<a target="_blank" href="https://explorer.harmony.one/address/${info.stakingAddress}#code">Harmony Explorer</a>`);
    if (info.stakeTokenAddress != "0x0000000000000000000000000000000000000000") {
      _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    }
    else {
      _print(`Please use the official website to stake ${info.stakeTokenTicker}.`);
    }
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} + 10% FEE`, unstake)
    _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`, claim)
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Revoke (set approval to 0)`, revoke)
    }
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : yearlyAPR
    }
}