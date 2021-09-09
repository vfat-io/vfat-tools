$(function() {
  consoleInit(main)
});

const COBRA_SMARTCHEF_FACTORY_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"smartChef","type":"address"}],"name":"NewSmartChefContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"contract ICustomERC20","name":"_stakedToken","type":"address"},{"internalType":"contract ICustomERC20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_poolLimitPerUser","type":"uint256"},{"internalType":"address","name":"_admin","type":"address"}],"name":"deployPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const COBRA_SMARTCHEF_INITIALIZABLE_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenRecovered","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AdminTokenRecovery","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"poolLimitPerUser","type":"uint256"}],"name":"NewPoolLimit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"NewRewardPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"}],"name":"NewStartAndEndBlocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"RewardsStop","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"PRECISION_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SMART_CHEF_FACTORY","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTokenPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyRewardWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hasUserLimit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ICustomERC20","name":"_stakedToken","type":"address"},{"internalType":"contract ICustomERC20","name":"_rewardToken","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_poolLimitPerUser","type":"uint256"},{"internalType":"address","name":"_admin","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLimitPerUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"recoverWrongTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract ICustomERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakedToken","outputs":[{"internalType":"contract ICustomERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stopReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasUserLimit","type":"bool"},{"internalType":"uint256","name":"_poolLimitPerUser","type":"uint256"}],"name":"updatePoolLimitPerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"updateRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"}],"name":"updateStartAndEndBlocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const COBRA_PIT_ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"contract IERC20","name":"_govToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"enter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"govToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"leave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

const COBRA_SMARTCHEF_FACTORY_ADDR = "0x966d796d7eb685Cd1011260429FA9F23edBdEf6C";

const COBRA_ADDR = "0x2C449bA613873e7B980FaF2b686207d7bd205541";
const XCOBRA_ADDR = "0x45f785581e0787D3C0C62676ABc6f17783e021f0";

const EXTRACTED_POOLS = [
  '0x236b5b57DDEE971AB5EBeA618B05d86210FE9323', // 0x61e8281418edaa0a7459648ae828379014af4cdf119719f4e3b2be2d183bbccb
];

const PRELOAD_PRICES_POOL = [
  '0xb6d16EDa39d85Ea24b538f9200eB0dbAf9b87020', // BNB-COBRA
]

const PRELOAD_TOKEN_INDICES = [
  COBRA_ADDR,
  '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // BNB
  '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
]

const LAST_EXTRACTED_BLOCK = 9905480;
const BLOCKS_TO_EXTRACT = 1000;

const FIXED_DECIMALS = 2;

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const blockNumber = await App.provider.getBlockNumber();
  let pools = EXTRACTED_POOLS;

  if (LAST_EXTRACTED_BLOCK + BLOCKS_TO_EXTRACT < blockNumber) {
    _print(`Pools was last extracted on block ${LAST_EXTRACTED_BLOCK}.`);
    _print(`Not querying for new pools for performance reasons.\n`);
    _print_bold(`Some newer pools may not show up.\n`);
  }
  else {
    const COBRA_SMARTCHEF_FACTORY = new ethers.Contract(COBRA_SMARTCHEF_FACTORY_ADDR, COBRA_SMARTCHEF_FACTORY_ABI, App.provider);
    const smartchefFilter = COBRA_SMARTCHEF_FACTORY.filters.NewSmartChefContract();

    try {
      const poolsDynExtracted = (await COBRA_SMARTCHEF_FACTORY.queryFilter(
        smartchefFilter, 
        Math.max(blockNumber - BLOCKS_TO_EXTRACT, LAST_EXTRACTED_BLOCK)
      )).map(log => ethers.utils.hexDataSlice(log.topics[1], 12));
  
      if(poolsDynExtracted.length > 0) {
        _print_bold(`Found additional pools after last extracted.`);
        _print_bold(`Those pool might disappear from vfat in the future until it is added to vfat manually`);
      }
  
      console.log(poolsDynExtracted);
      pools = [].concat(pools, poolsDynExtracted);

    } catch (error) {
      console.error(error);
      _print(`Pools was last extracted on block ${LAST_EXTRACTED_BLOCK}.`);
      _print_bold(`Some newer pools may not show up.\n`);
    }
  }

  const basePrices = await getBscPrices();

  await loadCobraSmartChefContracts(App, basePrices, pools, blockNumber);

  hideLoading();
}

function getCobraUniPair(token0, token1) {
  if (ethers.utils.hexlify(token0) > ethers.utils.hexlify(token1)) [token0, token1] = [token1, token0];
  return ethers.utils.hexDataSlice(
    ethers.utils.solidityKeccak256(['bytes', 'address', 'bytes', 'bytes'], [
      '0xff',
      '0x3165d94dD2F71381495Cb897832dE02710A0DCE5',
      ethers.utils.solidityKeccak256(['address', 'address'], [token0, token1]),
      '0x2bb3e5195d9a143594fb6ad515c4c134a8c69b8232783ec65e8eca38733fe57e'
    ]),
    12
  )
}

async function loadCobraSmartChefContracts(App, prices, chefAddresses, blockNumber) {
  const poolCount = parseInt(chefAddresses.length, 10);

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const poolInfos = await Promise.all(chefAddresses.map(async (x) =>
    await getCobraSmartChefPoolInfo(App, x, blockNumber)));

  await Promise.all(poolInfos.filter(x => x.stakedToken).map(async (x) => {
    tokens[x.stakedToken.address] = x.stakedToken;
    tokens[x.rewardToken.address] = x.rewardToken;
    if(x.stakedToken.tokens) {
      await Promise.all(x.stakedToken.tokens.map(async (x) => {
        tokens[x] = await getBscToken(App, x, "0x0000000000000000000000000000000000000000");
      }));
    }
  }));

  await Promise.all(PRELOAD_TOKEN_INDICES.map(async (x) => {
    if(!tokens[x]) tokens[x] = await getBscToken(App, x, "0x0000000000000000000000000000000000000000");
  }));

  await Promise.all(PRELOAD_PRICES_POOL.map(async (x) => {
    const pool = await getBscToken(App, x, "0x0000000000000000000000000000000000000000");
    getPoolPrices(tokens, prices, pool, "bsc");
  }));

  // find XCOBRA price
  tokens[XCOBRA_ADDR] = await getBscToken(App, XCOBRA_ADDR, "0x0000000000000000000000000000000000000000");

  const COBRA = new ethers.Contract(COBRA_ADDR, ERC20_ABI, App.provider);
  const COBRA_PIT = new ethers.Contract(XCOBRA_ADDR, COBRA_PIT_ABI, App.provider);
  getPoolPrices(tokens, prices, {
    symbol: '',
    name: '',
    token0: COBRA_ADDR,
    q0: await COBRA.balanceOf(XCOBRA_ADDR),
    token1: XCOBRA_ADDR,
    q1: await COBRA_PIT.totalSupply(),
    totalSupply: 1,
    staked: 0,
  }, "bsc");

  // TODO: multicall?
  await Promise.all(Object.keys(tokens).filter(x => (x !== 'undefined' && !x.tokens && !prices[x])).map(x =>
    Promise.all(PRELOAD_TOKEN_INDICES.map(
      async (index) => {
        const poolAddr = getCobraUniPair(index, x)
        if(await App.provider.getCode(poolAddr) === ethers.utils.hexlify("0x")) return;
        const pool = await getBscToken(App, poolAddr, "0x0000000000000000000000000000000000000000");
        if (pool) getPoolPrices(tokens, prices, pool, "bsc");
      }
    ))
  ));

  const poolPrices = poolInfos.map(poolInfo => poolInfo.stakedToken ? getPoolPrices(tokens, prices, poolInfo.stakedToken, "bsc") : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolInfos[i].rewardPerBlock && poolPrices[i]) {
      const apr = printCobraSmartChefPool(App, chefAddresses[i], prices, poolInfos[i], i, poolPrices[i])
      aprs.push(apr);
    }
    else console.log([i, chefAddresses[i], poolInfos[i].stakedToken, poolInfos[i].rewardToken])
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


async function getCobraSmartChefPoolInfo(App, chefAddress, blockNumber) {
  const chefContract = new ethers.Contract(chefAddress, COBRA_SMARTCHEF_INITIALIZABLE_ABI, App.provider);
  const poolInfo = {
    stakedToken: await chefContract.stakedToken(),
    rewardToken: await chefContract.rewardToken(),
    rewardPerBlock: await chefContract.rewardPerBlock(),
    startBlock: await chefContract.startBlock(),
    endBlock: await chefContract.endBlock(),
  }
  
  const stakedToken = await getBscToken(App, poolInfo.stakedToken, chefAddress);
  const rewardToken = await getBscToken(App, poolInfo.rewardToken, chefAddress);

  const emptyPool = {
    stakedToken,
    rewardToken,
    rewardPerBlock: 0,
    userStaked : 0,
    pendingRewardTokens : 0,
  }

  if (rewardToken.staked === 0 || poolInfo.rewardPerBlock === 0 || blockNumber < poolInfo.startBlock || blockNumber > poolInfo.endBlock) return emptyPool;

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


function printCobraSmartChefPool(App, chefAddr, prices, poolInfo, poolIndex, poolPrices) {
  const poolRewardsPerWeek = poolInfo.rewardPerBlock * 604800 / 3;
  if (poolRewardsPerWeek == 0) return;
  const userStaked = poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, poolInfo.rewardToken.address)?.usd;
  const staked_tvl = poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price('harmony');
  const apr = printAPR(poolInfo.rewardToken.symbol, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
  staked_tvl, userStaked, poolPrices.price, FIXED_DECIMALS);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printCobraSmartChefContractLinks(App, chefAddr, poolInfo, rewardPrice);
  return apr;
}

function printCobraSmartChefContractLinks(App, chefAddr, poolInfo, rewardTokenPrice) {
  const approveAndStake = async function() {
    return cobraSmartChefContract_stake(chefAddr, poolInfo.stakedToken.address, App)
  }
  const unstake = async function() {
    return cobraSmartChefContract_unstake(chefAddr, App)
  }
  const claim = async function() {
    return cobraSmartChefContract_claim(chefAddr, App)
  }
  _print_link(`Stake ${poolInfo.stakedToken.unstaked.toFixed(FIXED_DECIMALS)} ${poolInfo.stakedToken.symbol}`, approveAndStake)
  
  _print_link(`Unstake ${poolInfo.userStaked.toFixed(FIXED_DECIMALS)} ${poolInfo.stakedToken.symbol}`, unstake)

  _print_link(`Claim ${poolInfo.pendingRewardTokens.toFixed(FIXED_DECIMALS)} ${poolInfo.rewardToken.symbol} ($${formatMoney(poolInfo.pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

const cobraSmartChefContract_stake = async function(chefAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, COBRA_SMARTCHEF_INITIALIZABLE_ABI, signer)

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

const cobraSmartChefContract_unstake = async function(chefAddress, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, COBRA_SMARTCHEF_INITIALIZABLE_ABI, signer)

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

const cobraSmartChefContract_claim = async function(chefAddress, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, COBRA_SMARTCHEF_INITIALIZABLE_ABI, signer)

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
  