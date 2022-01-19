$(function () {		
    consoleInit(main)		
});

const CROBLANC_CHEF_ABI = [{"inputs":[{"internalType":"address","name":"_treasury","type":"address"},{"internalType":"address","name":"_dividends","type":"address"},{"internalType":"uint256","name":"_croblancPerSecond","type":"uint256"},{"internalType":"uint256","name":"_emissionMultiplier","type":"uint256"},{"internalType":"uint256","name":"_performanceFeePerThousand","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"NewDividendsDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"unlockTime","type":"uint256"}],"name":"NewDividendsProposed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"NewTreasuryDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"unlockTime","type":"uint256"}],"name":"NewTreasuryProposed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"},{"internalType":"uint256","name":"_allocationPoints","type":"uint256"}],"name":"addFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"},{"internalType":"uint256","name":"_allocationPoints","type":"uint256"}],"name":"amendAllocationPoints","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"croblancPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deployNewDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deployNewTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"}],"name":"disableFarming","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dividends","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emissionMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"},{"internalType":"uint256","name":"_allocationPoints","type":"uint256"}],"name":"enableFarming","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"farmInfos","outputs":[{"internalType":"bool","name":"registered","type":"bool"},{"internalType":"bool","name":"farmingEnabled","type":"bool"},{"internalType":"uint256","name":"allocationPoints","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"farms","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"}],"name":"getFarmIndexByAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFarms","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"},{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isFullMoon","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"massUpdateFarmsPartly","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"newDividends","outputs":[{"internalType":"address","name":"newAddress","type":"address"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"newTreasury","outputs":[{"internalType":"address","name":"newAddress","type":"address"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"performanceFeePerThousand","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newDividendsAddress","type":"address"}],"name":"proposeNewDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newTreasuryAddress","type":"address"}],"name":"proposeNewTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_farm","type":"address"}],"name":"removeFarm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_croblancPerSecond","type":"uint256"},{"internalType":"bool","name":"_updateFarms","type":"bool"}],"name":"setCroblancPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_emissionMultiplier","type":"uint256"},{"internalType":"bool","name":"_updateFarms","type":"bool"}],"name":"setEmissionMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_performanceFeePerThousand","type":"uint256"}],"name":"setPerformanceFeePerThousand","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAllocationPoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
const FARMTOKEN_ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address","name":"_alpha","type":"address"},{"internalType":"address","name":"_croblanc","type":"address"},{"internalType":"address","name":"_feeRecipient","type":"address"},{"internalType":"address","name":"_want","type":"address"},{"internalType":"address","name":"_wheat","type":"address"},{"internalType":"address","name":"_masterChef","type":"address"},{"internalType":"uint256","name":"_masterChefPoolId","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accCroblancPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accWheatPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"alpha","outputs":[{"internalType":"contract CroblancAlpha","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"croblanc","outputs":[{"internalType":"contract CroblancToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"disableMasterChef","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"enableMasterChef","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeRecipient","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"harvestOnBehalfOf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastRewardTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterChef","outputs":[{"internalType":"contract IGenericMasterChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterChefEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterChefPoolId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"panic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingCroblanc","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingRewardInMasterChef","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingWheat","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"rescueToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_alpha","type":"address"}],"name":"setAlpha","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeRecipient","type":"address"}],"name":"setFeeRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakedWant","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_harvestMasterchef","type":"bool"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"wheatRewardDebt","type":"uint256"},{"internalType":"uint256","name":"croblancRewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wcro","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wcroAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wheat","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const GENERAL_CHEF_ABI = [
  {"inputs" : [{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],
   "name" : "userInfo",
   "outputs" : [{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],
   "stateMutability" : "view",
   "type" : "function"}
]
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

  _print(`<a href='https://cronoscan.com/address/${chefAddress}' target='_blank'>Staking Vaults</a>`);
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
      const apr = printCroblancPool(App, prices, tokens, poolInfos[i], poolPrices[i], totalAllocPoints, rewardsPerWeek, 
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
  const vaultContract = new ethers.Contract(farmToken, FARMTOKEN_ABI, app.provider);
  const poolTokenAddress = await vaultContract.want();
  const stakingAddress = await vaultContract.masterChef();
  if (poolInfo.allocationPoints == 0 || poolInfo.farmingEnabled == false) {
    return {
      address: poolTokenAddress,
      allocPoints: poolInfo.allocationPoints ?? 1,
      poolToken: null
    };
  }
  const poolToken = await getCronosToken(app, farmToken, stakingAddress);
  const croblancAddress = await vaultContract.croblanc();
  const wheatAddress = await vaultContract.wheat();
  const croblanc = await getCronosToken(app, croblancAddress, chefAddress);
  const wheat = await getCronosToken(app, wheatAddress, chefAddress);
  const pendingCroblanc = await vaultContract.pendingCroblanc(app.YOUR_ADDRESS) / 10 ** croblanc.decimals;
  const pendingWheat = await vaultContract.pendingCroblanc(app.YOUR_ADDRESS) / 10 ** wheat.decimals;
  const CHEF_CONTRACT = new ethers.Contract(stakingAddress, GENERAL_CHEF_ABI, app.provider)
  const poolIndex = await vaultContract.masterChefPoolId();
  const staked = (await CHEF_CONTRACT.userInfo(poolIndex, app.YOUR_ADDRESS)).amount / 10 ** poolToken.decimals;
  return {
      address : poolTokenAddress,
      allocPoints: poolInfo.allocationPoints ?? 1,
      poolToken: poolToken,
      userStaked : staked, //poolToken.unstaked / 10 ** poolToken.decimals,
      croblanc : croblanc,
      wheat : wheat,
      pendingCroblanc : pendingCroblanc,
      pendingWheat : pendingWheat,
      vaultAddress : farmToken,
      masterChefAddress : stakingAddress
  };
}

function printCroblancPool(App, prices, tokens, poolInfo, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       fixedDecimals, chain="eth") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const rewardWheatPrice = getParameterCaseInsensitive(prices, poolInfo.wheat.address)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printCroblancAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printCroblancContractLinks(App, FARMTOKEN_ABI, poolInfo.vaultAddress, poolInfo.address,
    rewardTokenTicker, poolInfo.wheat.symbol, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingCroblanc, poolInfo.pendingWheat, fixedDecimals, rewardPrice, rewardWheatPrice, poolInfo.masterChefAddress);
  return apr;
}

function printCroblancContractLinks(App, vaultAbi, vaultAddr, poolAddress,
    rewardTokenTicker, wheatTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingCroblanc, pendingWheat, fixedDecimals,
    rewardTokenPrice, rewardWheatPrice, chefAddress) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return croblancContract_stake(vaultAbi, vaultAddr, poolAddress, App)
  }
  const unstake = async function() {
    return croblancContract_unstake(vaultAbi, vaultAddr, App, chefAddress)
  }
  const claim = async function() {
    return croblancContract_claim(vaultAbi, vaultAddr, App, pendingWheat)
  }
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingCroblanc.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingCroblanc*rewardTokenPrice)}) + ${pendingWheat.toFixed(fixedDecimals)} ${wheatTokenTicker} ($${formatMoney(pendingWheat*rewardWheatPrice)})`, claim)
  _print("");
}

const croblancContract_claim = async function(vaultAbi, vaultAddress, App, earnedTokenAmount) {
  const signer = App.provider.getSigner()

  const VAULT_CONTRACT = new ethers.Contract(vaultAddress, vaultAbi, signer)

  if (earnedTokenAmount > 0) {
    showLoading()
    VAULT_CONTRACT.harvest({gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
  }
}

const croblancContract_unstake = async function(vaultAbi, vaultAddress, App, chefAddress) {
  const signer = App.provider.getSigner()
  const VAULT_CONTRACT = new ethers.Contract(vaultAddress, vaultAbi, signer)

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, GENERAL_CHEF_ABI, App.provider)
  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    VAULT_CONTRACT.withdraw(currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const croblancContract_stake = async function(vaultAbi, vaultAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const VAULT_CONTRACT = new ethers.Contract(vaultAddress, vaultAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, vaultAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(vaultAddress, ethers.constants.MaxUint256)
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
          VAULT_CONTRACT.deposit(currentTokens, {gasLimit: 500000})
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

function printCroblancAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
                  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice, fixedDecimals) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPR = usdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  return {
    totalStakedUsd : staked_tvl,
    yearlyAPR
  }
}