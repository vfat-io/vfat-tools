$(function() {
consoleInit(main)
  });

const VIPER_SMARTCHEF_FACTORY_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"smartChef","type":"address"}],"name":"NewSmartChefContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract ICustomERC20","name":"_stakedToken","type":"address"},{"internalType":"contract ICustomERC20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_poolLimitPerUser","type":"uint256"},{"internalType":"address","name":"_admin","type":"address"}],"name":"deployPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const VIPER_SMARTCHEF_INITIALIZABLE_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenRecovered","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AdminTokenRecovery","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"poolLimitPerUser","type":"uint256"}],"name":"NewPoolLimit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"NewRewardPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"NewStartAndEndBlocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"RewardsStop","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"PRECISION_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SMART_CHEF_FACTORY","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTokenPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyRewardWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hasUserLimit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ICustomERC20","name":"_stakedToken","type":"address"},{"internalType":"contract ICustomERC20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_poolLimitPerUser","type":"uint256"},{"internalType":"address","name":"_admin","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLimitPerUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"recoverWrongTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract ICustomERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakedToken","outputs":[{"internalType":"contract ICustomERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stopReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasUserLimit","type":"bool"},{"internalType":"uint256","name":"_poolLimitPerUser","type":"uint256"}],"name":"updatePoolLimitPerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"updateRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"}],"name":"updateStartAndEndBlocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const VIPER_SMARTCHEF_FACTORY_ADDR = "0x410ce9879d14919cbc9693406d5950a60d3b0f48";

const EXTRACTED_POOLS = [
  '0x5c84935da00817c167b3e2e857d9269f9e211334', 
  // '0xfd93797ef7154650314d1e820071f145504eea83', 
  // '0xe8bf74b6062f633c35e9ea4879538192ab817c0c', 
  // '0xd21863ffc3ee64dc4e5bfc147e226791f88c9561', 
  // '0x1ab9074e61fc816c2741f89caf4379b9d85c6563', 
  // '0xccf3b92c18edf3ee66398af25cdb523db86c8240', 
  // '0xbff7711839f5afafe79e6eae9fe1298c3092d686', 
  // '0x7bb4479cabcf7246bce45b90ccbff07eab0ff79f', 
  // '0x5a1488ef677addf07fbf09b8b3dc542755a42480', 
  // '0x09d240553d7df155d45557adcec16ae60f2d3821', 
  // '0x23c3d5540d5eaf2b71f7f005215c293d979c8943', 
  '0xae2d26605c293d0c8b68c905f0dc81f1d3ac2ac1', 
  '0xf37d2132c358cc51386fae9f8485d38d42be21a5', 
  '0xf2ac00a3ba3e04cca11a1b62cf366b1c3fa2f196', 
  '0xbd19b4af9e4a03575d92d127708b0c142a7ec1b7', 
  '0x9b37d0017eae7a5027b1536f8c9f4b5cdbb971e2', 
  // '0x54496b3a08d93adbe59047b7d2b41d0d7744e2e0', 
  '0x6cf157a593de05026b691dcd850c472c8cb75b89', 
  // '0xb9ca09a6d85644dca941bb2ea1df8a6a55cc9123', 
  '0xf33e9c1ad490d760e9a1ea9e24e56bdcdc87f279'
];

const PRELOAD_PRICES_POOL = [
  '0x96025483bd32c645b822a5a08004b84d674537cb', // ONE-VIPER
  '0x54918b8ca826659cc8aa8d4524ee5ac71ba104bd', // NFT-ONE
]

const LAST_EXTRACTED_BLOCK = 15774660;

const FIXED_DECIMALS = 2;

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const blockNumber = await App.provider.getBlockNumber();
  let pools = EXTRACTED_POOLS;

  const VIPER_SMARTCHEF_FACTORY = new ethers.Contract(VIPER_SMARTCHEF_FACTORY_ADDR, VIPER_SMARTCHEF_FACTORY_ABI, App.provider);
  const smartchefFilter = VIPER_SMARTCHEF_FACTORY.filters.NewSmartChefContract();
  const poolsDynExtracted = (await VIPER_SMARTCHEF_FACTORY.queryFilter(
    smartchefFilter, 
    Math.max(blockNumber - 500000, LAST_EXTRACTED_BLOCK)
  )).map(log => ethers.utils.hexDataSlice(log.topics[1], 12));

  console.log(poolsDynExtracted);
  pools = [].concat(pools, poolsDynExtracted);

  if (LAST_EXTRACTED_BLOCK + 500000 < blockNumber) {
    _print(`Too many blocks have passed after the pool was last extracted manually.`);
    _print(`Not querying for all of the pools for performance reasons.\n`);
    _print_bold(`Some newer pools may not show up.\n`);
  }

  const basePrices = await getHarmonyPrices();

  await loadViperSmartChefContracts(App, basePrices, pools, blockNumber);

  hideLoading();
}

async function loadViperSmartChefContracts(App, prices, chefAddresses, blockNumber) {
  const poolCount = parseInt(chefAddresses.length, 10);

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const poolInfos = await Promise.all(chefAddresses.map(async (x) =>
    await getViperSmartChefPoolInfo(App, x, blockNumber)));

  await Promise.all(poolInfos.filter(x => x.stakedToken).map(async (x) => {
    tokens[x.stakedToken.address] = x.stakedToken;
    tokens[x.rewardToken.address] = x.rewardToken;
    if(x.stakedToken.tokens) {
      tokens[x.stakedToken.tokens[0]] = await getHarmonyToken(App, x.stakedToken.tokens[0], "0x0000000000000000000000000000000000000000");
      tokens[x.stakedToken.tokens[1]] = await getHarmonyToken(App, x.stakedToken.tokens[1], "0x0000000000000000000000000000000000000000");
    }
  }));

  await Promise.all(PRELOAD_PRICES_POOL.map(async (x) => {
    const pool = await getHarmonyToken(App, x, "0x0000000000000000000000000000000000000000");
    getPoolPrices(tokens, prices, pool, "Harmony");
  }));

  const poolPrices = poolInfos.map(poolInfo => poolInfo.stakedToken ? getPoolPrices(tokens, prices, poolInfo.stakedToken, "Harmony") : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    console.log([poolInfos[i], poolPrices[i]])
    if (poolPrices[i]) {
      const apr = printViperSmartChefPool(App, chefAddresses[i], prices, poolInfos[i], i, poolPrices[i])
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


async function getViperSmartChefPoolInfo(App, chefAddress, blockNumber) {
  const chefContract = new ethers.Contract(chefAddress, VIPER_SMARTCHEF_INITIALIZABLE_ABI, App.provider);
  const poolInfo = {
    stakedToken: await chefContract.stakedToken(),
    rewardToken: await chefContract.rewardToken(),
    rewardPerBlock: await chefContract.rewardPerBlock(),
    startBlock: await chefContract.startBlock(),
    endBlock: await chefContract.endBlock(),
  }
  if (poolInfo.rewardPerBlock == 0 || blockNumber < poolInfo.startBlock || blockNumber > poolInfo.endBlock) {
    return {
      stakedToken: null,
      rewardToken: null,
      rewardPerBlock: 0,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  const stakedToken = await getHarmonyToken(App, poolInfo.stakedToken, chefAddress);
  const rewardToken = await getHarmonyToken(App, poolInfo.rewardToken, chefAddress);
  const userInfo = await chefContract.userInfo(App.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.pendingReward(App.YOUR_ADDRESS);
  const userStaked = userInfo.amount / 10 ** stakedToken.decimals;
  return {
    stakedToken,
    rewardToken,
    rewardPerBlock: poolInfo.rewardPerBlock / 10 ** rewardToken.decimals,
    userStaked,
    pendingRewardTokens : pendingRewardTokens / 10 ** rewardToken.decimals,
  };
}


function printViperSmartChefPool(App, chefAddr, prices, poolInfo, poolIndex, poolPrices) {
  const poolRewardsPerWeek = poolInfo.rewardPerBlock * 604800 / 2;
  if (poolRewardsPerWeek == 0) return;
  const userStaked = poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, poolInfo.rewardToken.address)?.usd;
  const staked_tvl = poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price('harmony');
  const apr = printAPR(poolInfo.rewardToken.symbol, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
  staked_tvl, userStaked, poolPrices.price, FIXED_DECIMALS);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printViperSmartChefContractLinks(App, chefAddr, poolInfo, rewardPrice);
  return apr;
}

function printViperSmartChefContractLinks(App, chefAddr, poolInfo, rewardTokenPrice) {
  const approveAndStake = async function() {
    return viperSmartChefContract_stake(chefAddr, poolInfo.stakedToken.address, App)
  }
  const unstake = async function() {
    return viperSmartChefContract_unstake(chefAddr, App)
  }
  const claim = async function() {
    return viperSmartChefContract_claim(chefAddr, App)
  }
  _print_link(`Stake ${poolInfo.stakedToken.unstaked.toFixed(FIXED_DECIMALS)} ${poolInfo.stakedToken.symbol}`, approveAndStake)
  
  _print_link(`Unstake ${poolInfo.userStaked.toFixed(FIXED_DECIMALS)} ${poolInfo.stakedToken.symbol}`, unstake)

  _print_link(`Claim ${poolInfo.pendingRewardTokens.toFixed(FIXED_DECIMALS)} ${poolInfo.rewardToken.symbol} ($${formatMoney(poolInfo.pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const viperSmartChefContract_stake = async function(chefAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, VIPER_SMARTCHEF_INITIALIZABLE_ABI, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
          CHEF_CONTRACT.deposit(currentTokens, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const viperSmartChefContract_unstake = async function(chefAddress, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, VIPER_SMARTCHEF_INITIALIZABLE_ABI, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount > 0) {
    showLoading()
    CHEF_CONTRACT.withdraw(currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const viperSmartChefContract_claim = async function(chefAddress, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, VIPER_SMARTCHEF_INITIALIZABLE_ABI, signer)

  const earnedTokenAmount = await CHEF_CONTRACT.pendingReward(App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    CHEF_CONTRACT.deposit(0, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}
