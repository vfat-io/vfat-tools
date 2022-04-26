const CHARM_VAULT_ABI = [{"inputs": [{"internalType": "contract IERC20","name": "_token","type": "address"},{"internalType": "contract IERC20","name": "_receiptToken","type": "address"},{"internalType": "contract IZenMaster","name": "_zenmaster","type": "address"},{"internalType": "address","name": "_admin","type": "address"},{"internalType": "address","name": "_treasury","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "sender","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shares","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "lastDepositedTime","type": "uint256"}],"name": "Deposit","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "sender","type": "address"},{"indexed": false,"internalType": "uint256","name": "performanceFee","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "callFee","type": "uint256"}],"name": "Harvest","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [],"name": "Pause","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "account","type": "address"}],"name": "Paused","type": "event"},{"anonymous": false,"inputs": [],"name": "Unpause","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "account","type": "address"}],"name": "Unpaused","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "sender","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "shares","type": "uint256"}],"name": "Withdraw","type": "event"},{"inputs": [],"name": "MAX_CALL_FEE","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "MAX_PERFORMANCE_FEE","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "MAX_WITHDRAW_FEE","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "MAX_WITHDRAW_FEE_PERIOD","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "available","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "calculateHarvestCharmRewards","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "calculateTotalPendingCharmRewards","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "callFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "deposit","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "emergencyWithdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getPricePerFullShare","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "harvest","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_token","type": "address"}],"name": "inCaseTokensGetStuck","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "lastHarvestedTime","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "pause","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "paused","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "performanceFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "receiptToken","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"}],"name": "setAdmin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_callFee","type": "uint256"}],"name": "setCallFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_performanceFee","type": "uint256"}],"name": "setPerformanceFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_treasury","type": "address"}],"name": "setTreasury","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_withdrawFee","type": "uint256"}],"name": "setWithdrawFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_withdrawFeePeriod","type": "uint256"}],"name": "setWithdrawFeePeriod","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "token","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalShares","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "treasury","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "unpause","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "userInfo","outputs": [{"internalType": "uint256","name": "shares","type": "uint256"},{"internalType": "uint256","name": "lastDepositedTime","type": "uint256"},{"internalType": "uint256","name": "charmAtLastUserAction","type": "uint256"},{"internalType": "uint256","name": "lastUserActionTime","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_shares","type": "uint256"}],"name": "withdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdrawAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdrawFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "withdrawFeePeriod","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "zenmaster","outputs": [{"internalType": "contract IZenMaster","name": "","type": "address"}],"stateMutability": "view","type": "function"}]


async function getBep20(App, token, address, stakingAddress) {
    if (address == "0x0000000000000000000000000000000000000000") {
      return {
        address,
        name : "Telos",
        symbol : "TLOS",
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

async function getCharmVault(App, vault, address, stakingAddress) {
  const decimals = await vault.decimals();
  const token_ = await vault.token();
  const token = await getBscToken(App, token_, address);
  return {
    address,
    name : await vault.name(),
    symbol : await vault.symbol(),
    totalSupply : await vault.totalSupply(),
    decimals : decimals,
    staked: await vault.balanceOf(stakingAddress) / 10 ** decimals,
    unstaked: await vault.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
    token: token,
    balance : await vault.balance(),
    contract: vault,
    tokens : [address].concat(token.tokens),
  }
}

async function getTelosUniPool(App, pool, poolAddress, stakingAddress) {
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

async function getTelosStoredToken(App, tokenAddress, stakingAddress, type) {
  switch (type) {
    case "uniswap":
      const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
      return await getTelosUniPool(App, pool, tokenAddress, stakingAddress);
    case "erc20":
      const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
      return await getBep20(App, erc20, tokenAddress, stakingAddress);
    case "charmVault":
      const vault = new ethers.Contract(tokenAddress, CHARM_VAULT_ABI, App.provider);
      return await getCharmVault(App, vault, tokenAddress, stakingAddress);
  }
}

async function getTelosToken(App, tokenAddress, stakingAddress) {

    if (tokenAddress == "0x0000000000000000000000000000000000000000") {
      return getBep20(App, null, tokenAddress, "")
    }

    const type = window.localStorage.getItem(tokenAddress);
    if (type) return getTelosStoredToken(App, tokenAddress, stakingAddress, type);

    try {
      const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
      const _token0 = await pool.token0();
      const uniPool = await getTelosUniPool(App, pool, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "uniswap");
      return uniPool;
    }
    catch(err) {
    }

    try {
      const VAULT = new ethers.Contract(tokenAddress, CHARM_VAULT_ABI, App.provider);
      const _token = await VAULT.token();
      
      const vault = await getCharmVault(App, VAULT, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "charmVault");
      return vault;
    }
    catch(err) {
    }

    try {
      const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
      const _name = await erc20.name();
      const erc20tok = await getBep20(App, erc20, tokenAddress, stakingAddress);
      window.localStorage.setItem(tokenAddress, "erc20");
      return erc20tok;
    }
    catch(err) {
      console.log(`Couldn't match ${tokenAddress} to any known token type.`);
    }
  }

async function getTelosPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  
  if (poolInfo.allocPoint == 0 || poolIndex == 105) {
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
  
  const poolToken = await getTelosToken(App, poolInfo.lpToken ?? poolInfo.token, chefAddress);
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

async function loadTelosChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://www.teloscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getTelosToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 * 2; // Telos block time: 0.5s = 2 blocks/s

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getTelosPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getTelosToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "telos") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "telos") : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    
    if(poolInfos[i].address == "0x389A833f83aAF096C6D3a550624C26151AaddcDC" || poolInfos[i].address == "0x4942fc8b88dF31349d384Bb24455C1Ba42c5B1d7") {
      continue;
    }
    
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, "telos", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
      aprs.push(apr);
    }
  }
  
  let totalUserStaked=0, totalStaked=0, averageApr=0;
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a.userStakedUsd > 0) {
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


const telosTokens = [
  { "id": "telos", "symbol": "WTLOS","contract": "0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E" },
  { "id": "zappy", "symbol": "ZAP","contract": "0x9A271E3748F59222f5581BaE2540dAa5806b3F77" },
  { "id": "charm", "symbol": "CHARM","contract": "0xd2504a02fABd7E546e41aD39597c377cA8B0E1Df" },
  { "id": "charm", "symbol": "xCHARM","contract": "0x65a5f4636233B7B4c4B134BA414c6EaB9fF79594" },
  { "id": "douge", "symbol": "DOUGE", "contract": "0xc6BC7A8dfA0f57Fe7746Ac434c01cD39679b372c"  },
  { "id": "wrapped-bitcoin", "symbol": "WBTC", "contract": "0xf390830df829cf22c53c8840554b98eafc5dcbc2"  },
  { "id": "weth", "symbol": "WETH", "contract": "0xfa9343c3897324496a05fc75abed6bac29f8a40f" },
  { "id": "usd-coin", "symbol": "USDC", "contract": "0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b"  },
  { "id": "tether","symbol": "USDT", "contract": "0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73" },
  { "id": "elk-finance","symbol": "ELK","contract":"0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C" },
  { "id": "wrapped-avax","symbol": "AVAX", "contract": "0x7c598c96d02398d89fbcb9d41eab3df0c16f227d" },
  { "id": "wbnb","symbol": "BNB", "contract": "0x2c78f1b70ccf63cdee49f9233e9faa99d43aa07e" },
  { "id": "wrapped-fantom","symbol": "FTM", "contract": "0xc1be9a4d5d45beeacae296a7bd5fadbfc14602c4" },
  { "id": "wmatic","symbol": "MATIC", "contract": "0x332730a4f6e03d9c55829435f10360e13cfa41ff" },
  { "id": "sushi","symbol": "SUSHI", "contract": "0x922d641a426dcffaef11680e5358f34d97d112e1" }
];

async function getTelosPrices() {
  const idPrices = await lookUpPrices(telosTokens.map(x => x.id));
  const prices = {}
  for (const tt of telosTokens)
      if (idPrices[tt.id])
          prices[tt.contract] = idPrices[tt.id];
  return prices;
}
