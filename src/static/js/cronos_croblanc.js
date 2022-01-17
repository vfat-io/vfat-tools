$(function () {		
    consoleInit(main)		
});

const CROBLANC_CHEF_ABI = [{"inputs":[{"internalType":"address","name":"_treasury","type":"address"},{"internalType":"address","name":"_dividends","type":"address"},{"internalType":"uint256","name":"_croblancPerSecond","type":"uint256"},{"internalType":"uint256","name":"_emissionMultiplier","type":"uint256"},{"internalType":"uint256","name":"_performanceFeePerThousand","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"NewDividendsDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"unlockTime","type":"uint256"}],"name":"NewDividendsProposed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"NewTreasuryDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"unlockTime","type":"uint256"}],"name":"NewTreasuryProposed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"},{"internalType":"uint256","name":"_allocationPoints","type":"uint256"}],"name":"addFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"},{"internalType":"uint256","name":"_allocationPoints","type":"uint256"}],"name":"amendAllocationPoints","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"croblancPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deployNewDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deployNewTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"}],"name":"disableFarming","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dividends","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emissionMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"},{"internalType":"uint256","name":"_allocationPoints","type":"uint256"}],"name":"enableFarming","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"farmInfos","outputs":[{"internalType":"bool","name":"registered","type":"bool"},{"internalType":"bool","name":"farmingEnabled","type":"bool"},{"internalType":"uint256","name":"allocationPoints","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farms","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"}],"name":"getFarmIndexByAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFarms","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"},{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isFullMoon","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"massUpdateFarmsPartly","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"newDividends","outputs":[{"internalType":"address","name":"newAddress","type":"address"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"newTreasury","outputs":[{"internalType":"address","name":"newAddress","type":"address"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"performanceFeePerThousand","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newDividendsAddress","type":"address"}],"name":"proposeNewDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newTreasuryAddress","type":"address"}],"name":"proposeNewTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"}],"name":"removeFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_croblancPerSecond","type":"uint256"},{"internalType":"bool","name":"_updateFarms","type":"bool"}],"name":"setCroblancPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_emissionMultiplier","type":"uint256"},{"internalType":"bool","name":"_updateFarms","type":"bool"}],"name":"setEmissionMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_performanceFeePerThousand","type":"uint256"}],"name":"setPerformanceFeePerThousand","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAllocationPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

async function main() {
    const App = await init_ethers();		
        
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);		
    _print("Reading smart contracts...\n");		
        
    const CROBLANC_CHEF_ADDR = "0x52a87ef19e4a0E8cc70aE69D22bc8254bc6fa0F9";		
    const rewardTokenTicker = "CROBLANC";		
    const CROBLANC_CHEF = new ethers.Contract(CROBLANC_CHEF_ADDR, CROBLANC_CHEF_ABI, App.provider);

    const rewardsPerWeek = await CROBLANC_CHEF.croblancPerSecond() / 1e18 * 604800;
            
    const tokens = {};
    const prices = await getCronosPrices();		
        
    await loadCroblancContract(App, tokens, prices, CROBLANC_CHEF, CROBLANC_CHEF_ADDR, CROBLANC_CHEF_ABI, rewardTokenTicker,		
        "0xd3cecbe5639d05aed446da11f08d495ca6bf359f", rewardsPerWeek);
        
    hideLoading();
}

async function loadCroblancContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenAddress, rewardsPerWeekFixed, deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const farms = await chefContract.getFarms();

  const poolCount = farms.length;
  const totalAllocPoints = await chefContract.totalAllocationPoints();

  _print(`<a href='https://cronos.crypto.org/explorer/address/${chefAddress}' target='_blank'>Staking Vaults</a>`);
  _print(`Found ${poolCount} vaults.\n`)

  const rewardToken = await getCronosToken(App, rewardTokenAddress, chefAddress);

  const rewardsPerWeek = rewardsPerWeekFixed;

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getCroblancPoolInfo(App, chefContract, chefAddress, farms[x])));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getCronosToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "cronos") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "cronos") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printCroblancPool(prices, tokens, poolInfos[i], poolPrices[i], totalAllocPoints, rewardsPerWeek, 
        rewardTokenTicker, rewardTokenAddress, 2, "cronos")
      aprs.push(apr);
    }
  }

  let totalStaked = 0;
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
  }
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  return { prices, totalStaked }
}
    	
async function getCroblancPoolInfo(app, chefContract, chefAddress, farmToken) {
  const poolInfo = await chefContract.farmInfos(farmToken);
  if (poolInfo.allocationPoints == 0 || poolInfo.farmingEnabled == false) {
    return {
      address: farmToken,
      allocPoints: poolInfo.allocationPoints ?? 1,
      poolToken: null
    };
  }
  const poolToken = await getCronosToken(app, farmToken, chefAddress);
  return {
      address : farmToken,
      allocPoints: poolInfo.allocationPoints ?? 1,
      poolToken: poolToken
  };
}

function printCroblancPool(prices, tokens, poolInfo, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       fixedDecimals, chain="eth") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printCroblancAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, poolPrices.price, fixedDecimals);
  _print("")
  return apr;
}

function printCroblancAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
                  stakeTokenTicker, staked_tvl, poolTokenPrice,
                  fixedDecimals) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPR = usdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  return {
    totalStakedUsd : staked_tvl,
    yearlyAPR
  }
}