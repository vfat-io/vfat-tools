async function loadFluidStatus(App, LP, fluidEpochs, epoch) {  
  const unbondFilter = LP.filters.Unbond(App.YOUR_ADDRESS);
  const unbonds = await LP.queryFilter(unbondFilter);
  const bondFilter = LP.filters.Bond(App.YOUR_ADDRESS);
  const bonds = await LP.queryFilter(bondFilter);
  if (unbonds.length + bonds.length > 0) {
      const lastUnbond = Math.max(...unbonds.map(u => u.args.start / 1));
      const lastBond = Math.max(...bonds.map(d => d.args.start / 1));
      const fluidEpoch = Math.max(lastUnbond, lastBond) - 1;
      _print(`You last bonded or unbonded at epoch ${fluidEpoch}.`)
      _print(`You will become Frozen in ${fluidEpoch + fluidEpochs - epoch} epochs.`);
  }
}

const loadDAO = async (App, DAO, DOLLAR, uniswapAddress, liquidityPoolAddress, tokens, prices, fluidEpochs,
  isBuggyDAO, displayDecimals, epochSec, stakingPoolAddress) => {
    const unstaked = await DOLLAR.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const totalSupply = await DOLLAR.totalSupply() / 1e18;
    const dollar = await DOLLAR.symbol();

    const uniPool = await getToken(App, uniswapAddress, liquidityPoolAddress ?? stakingPoolAddress);  
    var newPrices = await lookUpTokenPrices(uniPool.tokens.filter(t => 
      t.toLowerCase() != "0x5cf9242493be1411b93d064ca2e468961bbb5924"
      && t.toLowerCase() != "0xf0e3543744afced8042131582f2a19b6aeb82794")); //Exceptions for ESG and VTD due to coingecko bug
    for (const key in newPrices) {
        prices[key] = newPrices[key];
    }
    await Promise.all(uniPool.tokens.map(async (address) => {
        tokens[address] = await getToken(App, address, uniPool.address);
    }));
    const uniPrices = getPoolPrices(tokens, prices, uniPool);

    const zaiPrice = getParameterCaseInsensitive(prices, DOLLAR.address).usd;

    const decimals = displayDecimals ?? 2;

    const totalBonded = await DAO.totalBonded() / 1e18;
    const totalStaged = await DAO.totalStaged() / 1e18;
    const bonded = await DAO.balanceOfBonded(App.YOUR_ADDRESS) / 1e18;
    const staged = await DAO.balanceOfStaged(App.YOUR_ADDRESS) / 1e18;
    const status = await DAO.statusOf(App.YOUR_ADDRESS) ? "Fluid" : "Frozen";
    const epoch = await DAO.epoch() / 1;
    _print(`Current Epoch: ${epoch}`);
    if (epochSec) {
      _print(`Epoch Period: ${new Date(epochSec * 1000).toISOString().substr(11, 8)}`)
    } 
    if (DAO.callStatic["nextEpochStart"]) _print(`Next Epoch at: ${new Date(await DAO.nextEpochStart() * 1000).toString()}`);
    _print(`${dollar} Price: $${formatMoney(zaiPrice)}\n`);
    
    _print(`${dollar} Total Supply: ${totalSupply.toFixed(decimals)}, $${formatMoney(totalSupply * zaiPrice)}`);
    _print(`${dollar} Total Staged: ${totalStaged.toFixed(decimals)}, $${formatMoney(totalStaged * zaiPrice)}`);
    _print(`${dollar} Total Bonded: ${totalBonded.toFixed(decimals)}, $${formatMoney(totalBonded * zaiPrice)}`);
    _print(`Your DAO status is ${status}`);
    _print(`You have ${unstaked.toFixed(decimals)} unstaked ${dollar}, $${formatMoney(unstaked*zaiPrice)}`);
    _print(`You have ${staged.toFixed(decimals)} staged ${dollar}, $${formatMoney(staged*zaiPrice)}, ${(staged/totalStaged*100).toFixed(4)}% of the pool`);
    _print(`You have ${bonded.toFixed(decimals)} bonded ${dollar}, $${formatMoney(bonded*zaiPrice)}, ${(bonded/totalBonded*100).toFixed(4)}% of the pool`);
    if (status == "Fluid") await loadFluidStatus(App, DAO, fluidEpochs, epoch);
    
    const approveAndDeposit = async () => dao_deposit(App, DAO, DOLLAR);
    const withdraw = async () => esd_withdraw(DAO, App); 
    const bond = async () => esd_bond(DAO, App); 
    const unbond = async () => isBuggyDAO ? buggy_dao_unbond(DAO,App) : esd_unbond(DAO, App); 

    _print_link(`Deposit ${unstaked.toFixed(decimals)} ${dollar}`, approveAndDeposit)
    _print_link(`Withdraw ${staged.toFixed(decimals)} ${dollar}`, withdraw);
    _print_link(`Bond ${staged.toFixed(decimals)} ${dollar}`, bond);
    _print_link(`Unbond ${bonded.toFixed(decimals)} ${dollar}`, unbond);
    _print(''); 

    if (DAO.filters.CouponPurchase) {
      const couponFilter = DAO.filters.CouponPurchase(App.YOUR_ADDRESS);
      const coupons = await DAO.queryFilter(couponFilter);
      for (const c of coupons) {
          const dollarAmount = c.args.dollarAmount / 1e18;
          const couponCount = c.args.couponAmount / 1e18;
          const couponEpoch = c.args.epoch / 1;
          _print(`You purchased ${couponCount} coupons worth $${dollarAmount} at epoch ${couponEpoch}`)
      }
    }
    _print('');

    return [epoch, uniPrices, totalBonded];
}

async function loadEmptySetLP(App, LP, stakeTokenAddress, stakeTokenTicker, fluidEpochs, epoch, rewardTicker, uniPrices, 
    baseTokenAddress, dollarPrice, displayDecimals, lpDecimals_) {
  const stakeToken = new ethers.Contract(stakeTokenAddress, ERC20_ABI, App.provider);
  const unstaked = await stakeToken.balanceOf(App.YOUR_ADDRESS) / 1e18;

  const totalBonded = await LP.totalBonded() / 1e18;
  const totalStaged = await LP.totalStaged() / 1e18;

  const staged = await LP.balanceOfStaged(App.YOUR_ADDRESS) / 1e18;
  const bonded = await LP.balanceOfBonded(App.YOUR_ADDRESS) / 1e18;
  const claimable = await LP.balanceOfClaimable(App.YOUR_ADDRESS) / 1e18;
  const rewarded = 
    ((rewardTicker == "ESG" || rewardTicker == "ESB")
      ? await LP.balanceOfRewarded(App.YOUR_ADDRESS, Dollars[rewardTicker].Dollar.address)
      : await LP.balanceOfRewarded(App.YOUR_ADDRESS))
     / 1e18;
  const status =
    ((rewardTicker == "ESG" || rewardTicker == "ESB")
      ? await LP.statusOf(App.YOUR_ADDRESS, epoch) 
      : await LP.statusOf(App.YOUR_ADDRESS)) 
        ? "Fluid" : "Frozen";
  
  const lpPrice = uniPrices.price;
  uniPrices.print_price();    
  //_print(`${stakeTokenTicker} Total Supply: ${uniPrices.totalSupply.toFixed(2)}, $${formatMoney(uniPrices.totalSupply * zaiPrice)}`);
  _print(`${stakeTokenTicker} Total Staged: ${totalStaged.toFixed(2)}, $${formatMoney(totalStaged * lpPrice)}`);
  _print(`${stakeTokenTicker} Total Bonded: ${totalBonded.toFixed(2)}, $${formatMoney(totalBonded * lpPrice)}`);
  _print(`Your LP status is ${status}`);
  _print(`You have ${unstaked.toFixed(8)} unstaked ${stakeTokenTicker}, $${formatMoney(unstaked * lpPrice)}`);
  if (unstaked > 0) uniPrices.print_contained_price(unstaked);
  _print(`You have ${staged.toFixed(8)} staged ${stakeTokenTicker}, $${formatMoney(staged * lpPrice)}, ${(staged/totalStaged*100).toFixed(4)}% of the pool`);
  if (staged > 0) uniPrices.print_contained_price(staged);
  _print(`You have ${bonded.toFixed(8)} bonded ${stakeTokenTicker}, $${formatMoney(bonded * lpPrice)}, ${(bonded/totalBonded*100).toFixed(4)}% of the pool`);
  if (bonded > 0) uniPrices.print_contained_price(bonded);

  const decimals = displayDecimals ?? 2;
  _print(`You have ${rewarded.toFixed(decimals)} rewarded ${rewardTicker} ($${formatMoney(rewarded*dollarPrice)})`);
  _print(`You have ${claimable.toFixed(decimals)} claimable ${rewardTicker} ($${formatMoney(claimable*dollarPrice)})`);
  
  if (status == "Fluid") await loadFluidStatus(App, LP, fluidEpochs, epoch);
  const approveAndDeposit = async () => dao_deposit(App, LP, stakeToken);
  const withdraw = async () => esd_withdraw(LP, App); 
  const bond = async () => esd_bond(LP, App); 
  const unbond = async () => esd_unbond_pool(LP, App); 
  const claim = async () => esd_claim(LP, App);
  const provide = (rewardTicker == "ESG" || rewardTicker == "ESB") ? 
    (async () => esd_provide(LP, App, baseTokenAddress, Dollars[rewardTicker].Dollar.address)) :
    (async () => esd_provide(LP, App, baseTokenAddress));

  const lpDecimals = lpDecimals_ ?? 6;
  _print_link(`Deposit ${unstaked.toFixed(lpDecimals)} ${stakeTokenTicker}`, approveAndDeposit)
  _print_link(`Withdraw ${staged.toFixed(lpDecimals)} ${stakeTokenTicker}`, withdraw);
  _print_link(`Bond ${staged.toFixed(lpDecimals)} ${stakeTokenTicker}`, bond);
  _print_link(`Unbond ${bonded.toFixed(lpDecimals)} ${stakeTokenTicker}`, unbond);
  _print_link(`Claim ${claimable.toFixed(decimals)} ${rewardTicker}`, claim);
  _print_link(`Provide ${rewarded.toFixed(decimals)} ${rewardTicker}`, provide);
  _print('');   
}

const esd_withdraw = async function(DAO, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = DAO.connect(signer);
  const currentStakedAmount = await REWARD_POOL.balanceOfStaged(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.withdraw(currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const esd_claim = async function(LP, App) {
  const signer = App.provider.getSigner()

  const claimable = await LP.balanceOfClaimable(App.YOUR_ADDRESS)

  if (claimable > 0) {
    showLoading()
    LP.connect(signer).claim(claimable, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const esd_provide = async (LP, App, baseTokenAddress, extraParam) => {
  const signer = App.provider.getSigner();
  const baseToken = new ethers.Contract(baseTokenAddress, ERC20_ABI, App.provider);
  const balance = await baseToken.balanceOf(App.YOUR_ADDRESS);
  const allowed = await baseToken.allowance(App.YOUR_ADDRESS, LP.address);
  if (allowed / 1e18 < balance / 1e18) {
    showLoading();
    const tx = await baseToken.connect(signer).approve(LP.address, ethers.constants.MaxUint256);
    await tx.wait();
  }
  const rewarded = extraParam 
    ? await LP.balanceOfRewarded(App.YOUR_ADDRESS, extraParam)
    : await LP.balanceOfRewarded(App.YOUR_ADDRESS);
  if (rewarded > 0) {
    showLoading()
    LP.connect(signer).provide(rewarded, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const esd_unbond = async function(DAO, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = DAO.connect(signer);
  const currentStakedAmount = await REWARD_POOL.balanceOfBonded(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.unbondUnderlying(currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const esd_unbond_pool = async function(DAO, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = DAO.connect(signer);
  const currentStakedAmount = await REWARD_POOL.balanceOfBonded(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.unbond(currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const esd_bond = async function(DAO, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = DAO.connect(signer);
  const currentStakedAmount = await REWARD_POOL.balanceOfStaged(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.bond(currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const buggy_dao_unbond = async function(DAO, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = DAO.connect(signer);
  const currentStakedAmount = await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.unbond(currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

///targetMantissa should be 12 for USDC based, 0 for DAI based
const calculateTwap = async (oldPrice0, oldTimestamp, price0, timestamp, targetMantissa) => {
    // Convert Prices to BN
    const price0CumulativeLast = ethers.BigNumber.from(oldPrice0)
    let price0Cumulative = ethers.BigNumber.from(price0)
  
    // Convert timestamps to BN
    const latest = ethers.BigNumber.from(timestamp) // Current Uniswap contract timestamp
    const blockTimestamp = latest.mod(ethers.BigNumber.from(2).pow(32))
    const blockTimestampLast = ethers.BigNumber.from(oldTimestamp) // Saved Uniswap timestamp
  
    // Sub the timestamps to get distance
    const timeElapsed = blockTimestamp.sub(blockTimestampLast)
  
    // If subbing timestamps equals 0: no new trades have happened so use the Spot Price
    // Returning 0 here so it can be handled else where
    if (timeElapsed.toNumber() === 0) return 0
  
    // Do the TWAP calc
    const price0Average = price0Cumulative
      .sub(price0CumulativeLast)
      .div(timeElapsed)
  
    // Shifting the base to match the right numbers
    // Adjust the number of 0s as necessary.
    const exchangeRate0 = price0Average
    .mul(ethers.BigNumber.from(10).pow(18))
    .mul(ethers.BigNumber.from(10).pow(targetMantissa))
    .div(ethers.BigNumber.from(2).pow(112))

    // Returnthe Float of the TWAP 
    return exchangeRate0 / 1e18;
}

const getCurrentPriceAndTimestamp = async (App, address) => {
    const UNI = new ethers.Contract(address, UNI_ABI, App.provider);
    const price0 = await UNI.price0CumulativeLast();
    const price1 = await UNI.price1CumulativeLast();
    const { _blockTimestampLast } = await UNI.getReserves()
    const token0 = await UNI.token0();
    return [ price0, price1, _blockTimestampLast, token0 ]
}

const getBasisCurrentPriceAndTimestamp = async (App, address) => {
    const ORACLE = new ethers.Contract(address, BASIS_ORACLE_ABI, App.provider);
    const price0 = await ORACLE.price0CumulativeLast();
    const price1 = await ORACLE.price1CumulativeLast();
    const blockTimestampLast = await ORACLE.blockTimestampLast()
    return [ price0, price1, blockTimestampLast ]
}

async function printDaoUnbonds(provider, DAO, epoch, fluidEpochs, epochTimeSec, price, displayDecimals) {
    const fluidBlocks = Math.round(fluidEpochs * epochTimeSec / 13.5 * 1.1); //10% leeway
    const blockNumber = await provider.getBlockNumber();
    const unbonds = await DAO.queryFilter(DAO.filters.Unbond(), blockNumber-fluidBlocks, blockNumber);
    for (let i = 0; i < fluidEpochs; i++) {
        let filtered = unbonds.filter(u => epoch + i + 1 - fluidEpochs == u.args?.start / 1);
        let unbonding = filtered.map(u => u.args?.valueUnderlying / 1e18).reduce((x, y) => x+y,0);
        _print(`Unbonding at epoch ${epoch+i}: ${unbonding.toFixed(displayDecimals ?? 2)} ($${formatMoney(unbonding*price)})`)
    }
}

async function printLPUnbonds(provider, LP, epoch, fluidEpochs, epochTimeSec, price, rewardTicker, 
    displayDecimals, lpDisplayDecimals) {
    const fluidBlocks = Math.round(fluidEpochs * epochTimeSec / 13.5 * 1.1); //10% leeway
    const blockNumber = await provider.getBlockNumber();
    const unbonds = await LP.queryFilter(LP.filters.Unbond(), blockNumber-fluidBlocks, blockNumber);
    const bonds = await LP.queryFilter(LP.filters.Bond(), blockNumber-fluidBlocks, blockNumber);
    for (let i = 0; i < fluidEpochs; i++) {
        let filtered = unbonds.filter(u => epoch + i + 1 - fluidEpochs == u.args?.start / 1);
        let filteredBonds = bonds.filter(u => epoch + i + 1 - fluidEpochs == u.args?.start / 1);
        let cycling=0, unbonding=0, claimable=0;
        for (var u of filtered) {
          unbonding += u.args.value / 1e18;
          claimable += u.args.newClaimable / 1e18;
          for (const b of filteredBonds.filter(b => b.args.account == u.args.account)) {
            unbonding -= b.args.value / 1e18;
            cycling += b.args.value / 1e18;
          }
        }
        unbonding = Math.max(unbonding, 0);
        const lpDecimals = lpDisplayDecimals ?? 4;
        _print(`Unbonding at epoch ${epoch+i}: ${unbonding.toFixed(lpDecimals)} LPT - Cycling: ${cycling.toFixed(lpDecimals)} LPT - Claimable: ${claimable.toFixed(displayDecimals ?? 2)} ${rewardTicker} ($${formatMoney(claimable*price)})`);
    }
}

const SecondsPerDay = 86400;

//If the epochPeriod is dynamic, it has to be passed in
async function calculateDollarAPR(DAO, parameters, twap, dollarPrice, uniPrices, totalBonded, calculateChange, epochPeriod_, epoch) {
    const totalCoupons = DAO.totalCoupons ? (await DAO.totalCoupons() / 1e18) : 0;
    const totalRedeemable = DAO.totalRedeemable ? await DAO.totalRedeemable() / 1e18 : 0;
    const totalNet = await DAO.totalNet() / 1e18;

    const lpReward = parameters.PoolRatio;
    const daoReward = parameters.DaoRatio;
    // Get price
    const calcPrice = calculateChange(twap, totalCoupons, totalRedeemable, epoch)

    // Calulcate the outstanding commitments so we can remove it from the rewards
    const totalOutstanding = totalCoupons - totalRedeemable

    const maxRewards = totalNet * calcPrice * daoReward;

    const daoRewards = maxRewards - totalOutstanding

    const epochPeriod = parameters.EpochPeriod ?? epochPeriod_;
    if (daoRewards > 0) {
        const bondedReturn = daoRewards / totalBonded * 100 * SecondsPerDay / epochPeriod;
        const apr = ((1 + daoRewards / totalBonded) ** (SecondsPerDay / epochPeriod) - 1) * 100;
        _print(`DAO APY: Day ${bondedReturn.toFixed(2)}% Week ${(bondedReturn * 7).toFixed(2)}% Year ${(bondedReturn * 365).toFixed(2)}%`)
        _print(`DAO APY: Day ${apr.toFixed(2)}%`);

    } else {
        _print(`DAO APY: Day 0% Week 0% Year 0%`)
    }

    // Calculate total rewards allocated to LP
    const lpRewards = totalNet * calcPrice * lpReward
    const lpReturn = lpRewards * dollarPrice / uniPrices.staked_tvl * 100 * SecondsPerDay / epochPeriod;

    _print(`LP  APR: Day ${lpReturn.toFixed(2)}% Week ${(lpReturn * 7).toFixed(2)}% Year ${(lpReturn * 365).toFixed(2)}%`)  
}

async function getTWAP(App, lpAddress, dollarAddress, baseTokenDecimals) {  
  const resp = await fetch('https://api.vfat.tools/twap/' + lpAddress);
  const text = await resp.text();
  const array = text.split("\n");
  let twap;
  if (array.length > 0) {
      const [oldPrice0, oldPrice1, oldTimestamp] = array[array.length - 2].split(' ') //last line is blank
      const [price0, price1, timestamp, token0] = await getCurrentPriceAndTimestamp(App, lpAddress);
      const targetMantissa = 18 - (baseTokenDecimals ?? 6); //default USDC
      if (token0.toLowerCase() == dollarAddress.toLowerCase()) {
        twap = await calculateTwap(oldPrice0, oldTimestamp, price0, timestamp, targetMantissa);
      }
      else {
        twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, targetMantissa);
      }
  }
  return twap;
}

async function loadDollar(contractInfo, calcPrice, getEpochPeriod, getTwap) {
  const params = contractInfo.Parameters;
  
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const DAO = new ethers.Contract(contractInfo.DAO.address, contractInfo.DAO.abi, App.provider);
  const DOLLAR = new ethers.Contract(contractInfo.Dollar.address, ERC20_ABI, App.provider);
  var prices = {};
  var tokens = {};

  const poolInfo = contractInfo.LPIncentivizationPool ?? contractInfo.Pool;

  let epochPeriod = params.EpochPeriod;
  if (!epochPeriod) epochPeriod = await getEpochPeriod(DAO);
  const [epoch, uniPrices, totalBonded] = await loadDAO(App, DAO, DOLLAR, contractInfo.UniswapLP.address,
    poolInfo?.address, tokens, prices, params.DaoLockupPeriods, false,
      contractInfo.Dollar.displayDecimals, epochPeriod, contractInfo.StakingPool?.address);
  
  const dollarPrice = getParameterCaseInsensitive(prices, DOLLAR.address).usd;

  const baseTokenAddress = Object.entries(tokens).filter(([k,])=>k.toLowerCase() !== DOLLAR.address.toLowerCase())[0][1].address

  let LP;
  if (poolInfo) {
    LP = new ethers.Contract(poolInfo.address, poolInfo.abi, App.provider);
    await loadEmptySetLP(App, LP, contractInfo.UniswapLP.address, 
        poolInfo.ticker ?? contractInfo.UniswapLP.ticker, params.PoolLockupPeriods, 
        epoch, contractInfo.Dollar.ticker, uniPrices, baseTokenAddress,
        dollarPrice, contractInfo.Dollar.displayDecimals, 
        contractInfo.UniswapLP.displayDecimals);
  }
  if (contractInfo.StakingPool) {
    const sp = contractInfo.StakingPool;
    await loadSynthetixPool(App, tokens, prices, sp.abi, sp.address, sp.rewardTokenFunction, sp.stakeTokenFunction);
  }
  if (epoch < params.BootstrappingPeriod) { 
      const twap = params.BootstrappingPrice;      
      await calculateDollarAPR(DAO, params, twap, dollarPrice, uniPrices, totalBonded, calcPrice, epochPeriod, epoch);
  }
  else {
    let twap;
    try {
      twap = getTwap ? await getTwap(DAO, epoch) :
                       await getTWAP(App, contractInfo.UniswapLP.address, DOLLAR.address, params.BaseTokenDecimals);
    }
    catch {}
    if (twap) {
        _print(`TWAP (using vfat oracle): ${twap}\n`);

        if (twap > (params.GrowthThreshold ?? 1)) {
            await calculateDollarAPR(DAO, contractInfo.Parameters, twap, dollarPrice, uniPrices, totalBonded, calcPrice, epochPeriod, epoch);
        }
        else {
            _print(`DAO APY: Day 0% Week 0% Year 0%`)
            if (poolInfo) _print(`LP APR: Day 0% Week 0% Year 0%`)
        }        
    }
    else {
      _print(`DAO APY: Day 0% Week 0% Year 0%`)
      if (poolInfo) _print(`LP APR: Day 0% Week 0% Year 0%`)
    }   
  }
  _print(`\nDAO Unbonds`)
  await printDaoUnbonds(App.provider, DAO, epoch + 1, params.DaoLockupPeriods, epochPeriod, dollarPrice, contractInfo.Dollar.displayDecimals);
  if (poolInfo) {
    _print(`\nLP Unbonds`)
    await printLPUnbonds(App.provider, LP, epoch + 1, params.PoolLockupPeriods, epochPeriod, dollarPrice, contractInfo.Dollar.ticker, 
      contractInfo.UniswapLP.displayDecimals);
  }
  hideLoading();  
}

const calculateEmptySetChange = (params, totalCoupons, totalRedeemable, price) => {
  if (price > 1 + params.CouponSupplychangeLimit && totalCoupons > totalRedeemable) {
      return params.CouponSupplychangeLimit
  } else if (
      1 + params.CouponSupplychangeLimit >= price &&
      price > 1 + params.SupplyChangeLimit &&
      totalCoupons > totalRedeemable
  ) {
      return Math.abs(price - 1)
  } else if (price > 1 + params.SupplyChangeLimit) {
      return params.SupplyChangeLimit
  } else if (price < 1 - params.SupplyChangeLimit) {
      return params.SupplyChangeLimit
  } else {
      return Math.abs(price - 1)
  }
}

const getVTDtwap = async (DAO) => {
    const supplyIncrease = DAO.filters.SupplyIncrease();
    const supplyDecrease = DAO.filters.SupplyDecrease();
    const supplyNeutral  = DAO.filters.SupplyNeutral();
    const increases = await DAO.queryFilter(supplyIncrease, -10000);
    const decreases = await DAO.queryFilter(supplyDecrease, -10000);
    const neutral = await DAO.queryFilter(supplyNeutral, -10000);
    const events = increases.concat(decreases, neutral);
    events.sort((e1, e2) => e2.args.epoch - e1.args.epoch);
    return events[0].args.price / 1e18;
}