
$(function() {
consoleInit(main)
  });

const ABI_MASTERBREEDER = [ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Withdraw", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IBEP20", "name": "_lpToken", "type": "address" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" } ], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_devaddr", "type": "address" } ], "name": "dev", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" } ], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_feeAddress", "type": "address" } ], "name": "setFeeAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_emissionPerBlock", "type": "uint256" } ], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "newStartBlock", "type": "uint256" } ], "name": "updateStartBlock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract GreenBen", "name": "_eben", "type": "address" }, { "internalType": "address", "name": "_devaddr", "type": "address" }, { "internalType": "address", "name": "_feeAddress", "type": "address" }, { "internalType": "uint256", "name": "_emissionPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "devaddr", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "eben", "outputs": [ { "internalType": "contract GreenBen", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "emissionPerBlock", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feeAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" } ], "name": "getMultiplier", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" } ], "name": "pendingGreenBen", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "poolInfo", "outputs": [ { "internalType": "contract IBEP20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accGreenBenPerShare", "type": "uint256" }, { "internalType": "uint16", "name": "depositFeeBP", "type": "uint16" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "userInfo", "outputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ];

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const MASTERBREEDERADDRESS = "0xDEa721EFe7cBC0fCAb7C8d65c598b21B6373A2b6";
   const rewardTokenTicker = "EBEN";
   const BENSWAP_MASTERBREEDER = new ethers.Contract(MASTERBREEDERADDRESS, ABI_MASTERBREEDER, App.provider);

   const rewardsPerWeek = await BENSWAP_MASTERBREEDER.emissionPerBlock() /1e18
        * 604800 / 6;

    await loadMasterBreederContract(App, BENSWAP_MASTERBREEDER, MASTERBREEDERADDRESS, ABI_MASTERBREEDER, rewardTokenTicker,
        "eben", null, rewardsPerWeek, "pendingGreenBen");

    hideLoading();
}

const SmartBchTokens = [
  { "id": "bitcoin-cash","symbol": "WBCH", "contract": "0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04" }
];

async function getSmartBchPrices() {
  const idPrices = await lookUpPrices(SmartBchTokens.map(x => x.id));
  const prices = {}
  for (const bt of SmartBchTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function getSep20(App, token, address, stakingAddress) {
  if (address == "0x0000000000000000000000000000000000000000") {
    return {
      address,
      name : "Bitcoin Cash",
      symbol : "BCH",
      totalSupply: 1e8,
      decimals: 18,
      staked: 0,
      unstaked: 0,
      contract: null,
      tokens:[address]
    }
  }
  const decimals = await token.decimals()
  return {
      address,
      name : await token.name(),
      symbol : await token.symbol(),
      totalSupply : await token.totalSupply(),
      decimals : decimals,
      staked:  await token.balanceOf(stakingAddress) / 10 ** decimals,
      unstaked: await token.balanceOf(App.YOUR_ADDRESS)  / 10 ** decimals,
      contract: token,
      tokens : [address]
  };
}

async function getValuePool(App, pool, poolAddress, stakingAddress, tokenWeights) {
  let q0, q1;
  const reserves = await pool.getReserves();
  q0 = reserves._reserve0;
  q1 = reserves._reserve1;
  const decimals = await pool.decimals();
  const token0 = await pool.token0();
  const token1 = await pool.token1();
  return {
      symbol : await pool.symbol(),
      name : await pool.name(),
      address: poolAddress,
      token0,
      q0,
      w0 : tokenWeights._tokenWeight0,
      token1,
      q1,
      w1 : tokenWeights._tokenWeight1,
      totalSupply: await pool.totalSupply() / 10 ** decimals,
      stakingAddress: stakingAddress,
      staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
      decimals: decimals,
      unstaked: await pool.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
      contract: pool,
      tokens : [token0, token1],
      is1inch : false
  };
}

async function getUniPool(App, pool, poolAddress, stakingAddress) {
  let q0, q1;
  const reserves = await pool.getReserves();
  q0 = reserves._reserve0;
  q1 = reserves._reserve1;
  const decimals = await pool.decimals();
  const token0 = await pool.token0();
  const token1 = await pool.token1();
  return {
      symbol : await pool.symbol(),
      name : await pool.name(),
      address: poolAddress,
      token0,
      q0,
      token1,
      q1,
      totalSupply: await pool.totalSupply() / 10 ** decimals,
      stakingAddress: stakingAddress,
      staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
      decimals: decimals,
      unstaked: await pool.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
      contract: pool,
      tokens : [token0, token1],
      is1inch : false
  };
}


async function getSmartBchStoredToken(App, tokenAddress, stakingAddress, type) {
  switch (type) {
    case "uniswap":
      const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
      return await getUniPool(App, pool, tokenAddress, stakingAddress);
    case "erc20":
      const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
      return await getBep20(App, erc20, tokenAddress, stakingAddress);
  }
}

async function getBenSwapPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0) {
    return {
      address: poolInfo.lpToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
      stakedToken : null,
      userLPStaked : 0,
      lastRewardBlock : poolInfo.lastRewardBlock
    };
  }
  const poolToken = await getSmartBchToken(App, poolInfo.lpToken ?? poolInfo.token, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolInfo.lpToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}

async function getSmartBchToken(App, tokenAddress, stakingAddress) {
  if (tokenAddress == "0x0000000000000000000000000000000000000000") {
    return getSep20(App, null, tokenAddress, "")
  }
  const type = window.localStorage.getItem(tokenAddress);
  if (type) return getSmartBchStoredToken(App, tokenAddress, stakingAddress, type);
  try {
    const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
    const _token0 = await pool.token0();
    const uniPool = await getUniPool(App, pool, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "uniswap");
    return uniPool;
  }
  catch(err) {
  }
  try {
    const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
    const _name = await erc20.name();
    const erc20tok = await getSep20(App, erc20, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "erc20");
    return erc20tok;
  }
  catch(err) {
    console.log(`Couldn't match ${tokenAddress} to any known token type.`);
  }
}

function printBenSwapPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="smartbch") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
  var poolRewardsPerWeek = rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  poolPrices.print_price();
  sp?.print_price();
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain);
  return apr;
}

async function loadMasterBreederContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    extraPrices, showAll) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = 1;

  _print(`<a href='https://smartscan.cash/address/${chefAddress}' target='_blank'>Staking Contract</a>`);

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getSmartBchToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 6

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBenSwapPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var prices = await getSmartBchPrices();
  if (extraPrices) {
    for (const [k,v] of Object.entries(extraPrices)) {
      if (v.usd) {
        prices[k] = v
      }
    }
  }

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getSmartBchToken(App, address, chefAddress);
  }));

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "smartbch") : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (let i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printBenSwapPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction)
      aprs.push(apr);
    }
  }
  let totalUserStaked=0, totalStaked=0, averageApr=0;
  for (const a of aprs) {
    if (a && !isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a && a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
      averageApr += a.userStakedUsd * a.yearlyAPR / 100;
    }
  }
  averageApr = averageApr / totalUserStaked;
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
    _print(`Estimated earnings:`
        + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
        + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
        + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
  }
  return { prices, totalUserStaked, totalStaked, averageApr }
}


