$(function() {
consoleInit(main)
});

const bUniContract_stake = async function (stakingTokenAddr, rewardPoolAddr, App, maxAllowance) {
    const signer = App.provider.getSigner()

    const TEND_TOKEN = new ethers.Contract(stakingTokenAddr, ERC20_ABI, signer)
    const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, BADGER_UNI_ABI, signer)

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
          WEEBTEND_V2_TOKEN.deposit(currentTEND, {gasLimit: 500000})
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

  const bUniContract_unstake = async function(rewardPoolAddr, App) {
    const signer = App.provider.getSigner()

    const REWARD_POOL = new ethers.Contract(rewardPoolAddr, BADGER_UNI_ABI, signer)
    const currentStakedAmount = await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)
    if (currentStakedAmount > 0) {
      showLoading()
      REWARD_POOL.withdraw(currentStakedAmount, {gasLimit: 250000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }else {
        alert('You have no tokens to unstake!!')
      }
  }

async function getSettRewards(settAddress, prices, poolPrices, App) {
  // get Rewards Logger from registry
  const REGISTRY_CONTRACT = new ethers.Contract(registry, BADGER_REGISTRY_ABI, App.provider);
  const rewardsLoggerAddress = await REGISTRY_CONTRACT.addresses('rewardsLogger');
  // get unlock schedules for sett
  const REWARDS_LOGGER = new ethers.Contract(rewardsLoggerAddress, BADGER_REWARDS_LOGGER_ABI, App.provider);
  const schedules = await REWARDS_LOGGER.getAllUnlockSchedulesFor(settAddress);
  if(schedules.length <= 0) {
    return null;
  }
  /**
   * The schedules are return in the below format
   * [0]: Beneficiary (sett)
   * [1]: Token being distributed
   * [2]: Amount being distributed
   * [3]: Start time
   * [4]: End time
   * [5]: Duration
   * We check to see if the end time is after the current time to see if there 
   * is a valid distribution
   */
  const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;
  const now = Date.now();
  const nowTimestamp = parseInt((now / 1000).toString());
  var index = 0;
  var paginatedIndex = index * 6;
  var paginatedSchedule;
  var token;
  var amount;
  var endTime;
  var validTokens = {};
  // check if there is a valid distribution
  while (index < schedules.length) {
    paginatedSchedule = schedules[index];
    beneficiary = paginatedSchedule[paginatedIndex];
    token = paginatedSchedule[paginatedIndex + 1];
    amount = ethers.BigNumber.from(paginatedSchedule[paginatedIndex + 2]);
    startTime = ethers.BigNumber.from(paginatedSchedule[paginatedIndex + 3]);
    endTime = ethers.BigNumber.from(paginatedSchedule[paginatedIndex + 4]);
    duration = ethers.BigNumber.from(paginatedSchedule[paginatedIndex + 5]);

    if (endTime.gte(nowTimestamp) && startTime.lte(nowTimestamp)) {
      validTokens[token]= {
          amount: amount,
          duration: duration,
        };
    }
    index += 1;
  }

  // Calculate BADGER per week
  const validBadgerAmount = validTokens[badgerAddress].amount.div(1e18.toString()).toNumber();
  const validBadgerDuration = validTokens[badgerAddress].duration;
  const durationScalar = ONE_YEAR_SECONDS / validBadgerDuration.toNumber();

  const yearlyEmissionsTokens = validBadgerAmount * durationScalar;
  const yearlyEmissionsUsd = prices[badgerAddress].usd * yearlyEmissionsTokens;

  const yearlyApr = (yearlyEmissionsUsd / poolPrices.staked_tvl) * 100;
  const weeklyApr = yearlyApr / 52;
  const dailyApr = yearlyApr / 365;

  const weeklyTokens = yearlyEmissionsTokens / 52;

  // Display APR (day week year)
  _print(`BADGER Per Week: ${weeklyTokens.toFixed(0)} ($${formatMoney((yearlyEmissionsUsd / 52))})`)
  _print(`APR: Day ${dailyApr.toFixed(2)}% Week: ${weeklyApr.toFixed(2)}% Year: ${yearlyApr.toFixed(2)}%`)
}


function getBadgerPoolPrices(prices, pool, chain="eth") {
  const price = prices[pool.address].usd;
  var tvl = pool.totalSupply * price / 10 ** pool.decimals;
  var staked_tvl = pool.staked * price;
  const poolUrl = chain === 'arbitrum' ? `https://arbiscan.io/token/${pool.address}` : `https://etherscan.io/token/${pool.address}`;
  const name = `<a href='${poolUrl}' target='_blank'>${pool.symbol}</a>`;
  const getDexguruTokenlink =  function() {
    const network = window.location.pathname.split("/")[1]
    let dexguruTokenlink = '';
    if (tvl > 0) {
      if (network && (network.toLowerCase() === 'bsc' || network.toLowerCase() === 'eth' || network.toLowerCase() === 'polygon')) {
        dexguruTokenlink =   `<a href='https://dex.guru/token/${pool.address.toLowerCase()}-${network.toLowerCase()}' rel='noopener' target='_blank'>[%]</a>`;
      }
    }
    return dexguruTokenlink
  }
  return {
    staked_tvl : staked_tvl,
    price : price,
    stakeTokenTicker : pool.symbol,
    print_price() {
      _print(`${name} Price: $${formatMoney(price)} Market Cap: $${formatMoney(tvl)} ${getDexguruTokenlink()}`);
      _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
    },
    print_contained_price() {
    }
  }
}


async function printNonGeyserPool(App, tokens, prices, pool) {
  const tokenUrl = `<a href='https://arbiscan.io/address/${pool.tokenAddress}' target='_blank'>Underlying</a>`;
  const settUrl = `<a href='https://arbiscan.io/address/${pool.settAddress}' target='_blank'>Sett</a>`;
  _print(`${pool.name} - ${tokenUrl} - ${settUrl}`);


  const settAddress = pool.settAddress;
  const SETT_CONTRACT = new ethers.Contract(settAddress, BADGER_UNI_ABI, App.provider);
  const tokenAddress = pool.tokenAddress ?? await SETT_CONTRACT.token();
  const strategyAddress = pool.strategyAddress;
  const TOKEN_CONTRACT = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
  const userTotallyUnstaked = await TOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS) / 1e18;
  const lpToken = await getArbitrumToken(App, tokenAddress, strategyAddress ?? settAddress);
  _print(`You have ${userTotallyUnstaked} ${lpToken.symbol}`);


  var newTokenAddresses = lpToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
  for (const address of newTokenAddresses) {
      tokens[address] = await getArbitrumToken(App, address, tokenAddress);
  }
  const userUnstaked = await SETT_CONTRACT.balanceOf(App.YOUR_ADDRESS) / 1e18;
  const settToken = await getArbitrumToken(App, settAddress, strategyAddress ?? settAddress);
  _print(`You have ${userUnstaked} ${settToken.symbol}`);

  if (lpToken.staked == 0) {
    lpToken.staked = await SETT_CONTRACT.balance() / 1e18;
  }
  let poolPrices = getBadgerPoolPrices(prices, lpToken, "arbitrum");

  poolPrices.print_price();

  const ratio = await SETT_CONTRACT.getPricePerFullShare() / 1e18;

  const stakeTokenPrice = poolPrices.price * ratio;
  prices[settAddress] = stakeTokenPrice;

  if (userUnstaked > 0) poolPrices.print_contained_price(userUnstaked * ratio);

  await getSettRewards(settAddress, prices, poolPrices, App);

  const approveUNIAndStake = async () => bUniContract_stake(tokenAddress, settAddress, App);
  const unstakeUNI = async () => bUniContract_unstake(settAddress, App);

  _print_link(`Stake ${userTotallyUnstaked.toFixed(12)} ${lpToken.symbol}`, approveUNIAndStake)
  _print_link(`Unstake ${userUnstaked.toFixed(12)} ${lpToken.symbol}`, unstakeUNI)
  _print(`\n`);
}

const formatBadgerPrices = obj =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key] = {"usd": obj[key]};
    return acc;
  }, {});

const getBadgerPrices = async function(chain = "eth") {
  const pricesReturn = await $.ajax({
      url: `https://api.badger.finance/v2/prices?chain=${chain}`,
      type: 'GET',
    });
  return formatBadgerPrices(pricesReturn);
}

const pools = [
  {
    name : "Wrapped Ether / Sushi Helper",
    tokenAddress : "0x3221022e37029923aCe4235D812273C5A42C322d",
    settAddress : "0xe774D1FB3133b037AA17D39165b8F45f444f632d",
  },
  {
    name: "Wrapped BTC/Wrapped ETH",
    tokenAddress: "0x515e252b2b5c22b4b2b6Df66c2eBeeA871AA4d69",
    settAddress: "0xFc13209cAfE8fb3bb5fbD929eC9F11a39e8Ac041",
  },
  {
    name: "Curve.fi renBTC/wBTC LP",
    tokenAddress: "0x3E01dD8a5E1fb3481F0F589056b428Fc308AF0Fb",
    settAddress: "0xBA418CDdd91111F5c1D1Ac2777Fa8CEa28D71843",
  },
  {
    name: "Curve.fi tricrypto LP",
    tokenAddress: "0x8e0B8c8BB9db49a46697F3a5Bb8A308e744821D2",
    settAddress: "0x4591890225394BF66044347653e112621AF7DDeb",
  },
];

const registry = "0xfda7eb6f8b7a9e9fcfd348042ae675d1d652454f";
const badgerAddress = "0xBfa641051Ba0a0Ad1b0AcF549a89536A0D76472E";

async function main() {
    var tokens = {};
    const prices = await getBadgerPrices("arbitrum");

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    for (const p of pools) {
      await printNonGeyserPool(App, tokens, prices, p);
    }
    hideLoading();
}
